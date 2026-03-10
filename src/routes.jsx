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
import Account from "./pages/Account/Account"
import RecentlyAdded from "./pages/RecentlyAdded/RecentlyAdded"
import FeaturedProducts from "./pages/FeaturedProducts/FeaturedProducts"
import Offers from "./pages/Offers/Offers"
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail"
import PlaceholderPage from "./pages/Placeholder/Placeholder"

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Register /> }, // Matched Navbar /signup
            { path: '/register', element: <Register /> }, // Keep fallback
            { path: '/cart', element: <Cart /> },
            { path: '/brands', element: <Brands /> },
            { path: '/recently-added', element: <RecentlyAdded /> },
            { path: '/featured-products', element: <FeaturedProducts /> },
            { path: '/offers', element: <Offers /> },
            { path: '/categories', element: <Categories /> },
            { path: '/categories/:categoryName', element: <CategoryDetail /> },
            { path: '/verfiyEmail', element: <VerfiyEmail /> },
            { path: '/product/:id', element: <ProductDetails /> },
            { path: '/checkOut', element: <CheckOut /> },
            { path: '/orders', element: <Orders /> },
            { path: '/forgetPassword', element: <ForgetPassword /> },
            { path: '/wishlist', element: <WishList /> }, // Lowercase to match Navbar
            { path: '/wishList', element: <WishList /> }, // Keep fallback
            { path: '/searshProducts', element: <SearshProducts /> },
            { path: '/favorites', element: <Favorites /> },
            { path: '/account', element: <Account /> },
            { path: '/logout', element: <PlaceholderPage /> }, // Added logout placeholder
            // Info & Customer Service Placeholders
            { path: '/track-order', element: <PlaceholderPage /> },
            { path: '/about', element: <PlaceholderPage /> },
            { path: '/contact', element: <PlaceholderPage /> },
            { path: '/privacy', element: <PlaceholderPage /> },
            { path: '/terms', element: <PlaceholderPage /> },
            { path: '/shipping', element: <PlaceholderPage /> },
            { path: '/returns', element: <PlaceholderPage /> },
            { path: '/help', element: <PlaceholderPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];