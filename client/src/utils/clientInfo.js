const getUserAgent = () => {
    return navigator.userAgent
}

const getIp = async () => {
    try {
        const res = await fetch("https://api.ipify.org?format=json")
        const data = await res.json()
        return data.ip
    } catch (err) {
        console.error("Error fetching IP: ", err)
        return null
    }
}

export const getClientInfo = async () => {
    const ip = await getIp()
    const userAgent = getUserAgent()
    return { ip, userAgent}
}