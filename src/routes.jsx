import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home"
import Login from "./auth/Login/Login"
import Register from "./auth/Register/Register"
import Cart from "./pages/Cart/Cart"
import Brands from "./pages/Brands/Brands"
import Categories from "./pages/Categories/Categories"
import VerfiyEmail from "./pages/VerfiyEmail/VerfiyEmail"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import CheckOut from "./pages/CheckOut/CheckOut"
import Orders from "./pages/Orders/Orders"
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword"
import WishList from "./pages/WishList/WishList"
import SearshProducts from "./pages/SearshProducts/SearshProducts"
import Favorites from "./pages/Favorites/Favorites"
import NotFound from "./pages/NotFound/NotFound"

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/brands',
                element: <Brands />,
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/verfiyEmail',
                element: <VerfiyEmail />,
            },
            {
                path: '/product/:id',
                element: <ProductDetails />,
            },
            {
                path: '/checkOut',
                element: <CheckOut />,
            },
            {
                path: '/orders',
                element: <Orders />,
            },
            {
                path: '/forgetPassword',
                element: <ForgetPassword />,
            },
            {
                path: '/wishList',
                element: <WishList />,
            },
            {
                path: '/searshProducts',
                element: <SearshProducts />,
            },
            {
                path: '/favorites',
                element: <Favorites />,
            },
            {
                path: '/notFound',
                element: <NotFound />,
            },
        ],
    },
];