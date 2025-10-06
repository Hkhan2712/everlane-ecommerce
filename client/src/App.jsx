import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout"
import HomePage from "./pages/home"
import './App.css'
import About from "./pages/about"
import Shop from "./pages/shops"
import { UIProvider } from "./contexts/UIContext"
import ProductList from "./pages/products"
import ProductDetail from "./pages/products/ProductDetail"
import BlogIndex from "./pages/blogs"
import AuthLayout from "./layouts/AuthLayout"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import PrivateRoute from "./contexts/PrivateRoute.jsx"
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ShoppingCart from "./pages/cart/index.jsx";
import MyAccount from "./pages/account/index.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{ path: "about", element: <About/> },
			{ path: "stores", element: <Shop/> },
			{ path: "products", element: <ProductList /> },
			{
				path: "products/:slug",
				element: (
					<ProductDetail />
				)
			},
			{ path: "blog", element: <BlogIndex/> },
			{ path: "checkout", element: 
				<ShoppingCart />					
			},
			{
				path: "profile", 
				element: <MyAccount />
			},
		],
	},
	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{ path: "sign-in", element: <SignIn/> },
			{ path: "sign-up", element: <SignUp /> }
		],
	},
])

const App = () => {
	return (
		<UIProvider>
			<AuthProvider>
				<CartProvider>
					<RouterProvider router={router} />
					<ToastContainer 
						position="top-right"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
					/>
				</CartProvider>
			</AuthProvider>
		</UIProvider>
	)
}

export default App
