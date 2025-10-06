const jwt = require("jsonwebtoken")

/**
 * Middleware to authenticate user via Access Token, with Refresh Token support
 * - Access Token: short-lived (15–30 minutes)
 * - Refresh Token: long-lived (7–30 days)
 */
const authenticate = (req, res, next) => {
	try {
		let accessToken
		let refreshToken

		// Get access token from Authorization header or cookies
		const authHeader = req.headers["authorization"]
		if (authHeader?.startsWith("Bearer ")) {
			accessToken = authHeader.split(" ")[1]
		} else if (req.cookies?.accessToken) {
			accessToken = req.cookies.accessToken
		}

		// Get refresh token from cookies or custom header
		if (req.cookies?.refreshToken) {
			refreshToken = req.cookies.refreshToken
		} else if (req.headers["x-refresh-token"]) {
			refreshToken = req.headers["x-refresh-token"]
		}

		if (!accessToken) {
			return res.status(401).json({
				success: false,
				message: "Access token is required",
			})
		}

		// Try verify Access Token
		jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
		if (!err && decoded) {
			// Token valid
			req.user = { id: decoded.user_id, role: decoded.role }
			return next()
		}

		// If token expired or invalid
		if (err?.name !== "TokenExpiredError") {
			return res.status(403).json({
				success: false,
				message: "Invalid access token",
			})
		}

		// Refresh Token
		if (!refreshToken) {
			return res.status(401).json({
				success: false,
				message: "Session expired. Please login again",
			})
		}

		jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (refreshErr, decodedRefresh) => {
			if (refreshErr || !decodedRefresh) {
			return res.status(403).json({
				success: false,
				message: "Invalid or expired refresh token",
			})
			}

			const newAccessToken = jwt.sign(
				{ id: decodedRefresh.id, role: decodedRefresh.role },
				process.env.JWT_SECRET,
				{ expiresIn: "15m" }
			)

			res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "none",
			maxAge: 15 * 60 * 1000, 
			})

			req.user = { id: decodedRefresh.id, role: decodedRefresh.role }
			return next()
		})
		})
	} catch (err) {
		console.error("Auth middleware error:", err)
		return res.status(500).json({
		success: false,
		message: "Internal authentication error",
		})
	}
}

/**
 * Middleware for role-based authorization
 * @param {string[]} roles - Allowed roles to access the route
 */
const authorize = (roles = []) => (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized: Please log in first",
		})
	}

	if (roles.length && !roles.includes(req.user.role)) {
		return res.status(403).json({
			success: false,
			message: "Forbidden: Insufficient role",
		})
	}

	next()
}

module.exports = {
	authenticate,
	authorize,
}
