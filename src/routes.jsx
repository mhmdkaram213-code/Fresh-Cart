import Layout from "./components/Layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import PublicOnlyRoute from "./components/PublicOnlyRoute/PublicOnlyRoute"
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
import SubCategories from "./pages/SubCategories/SubCategories"
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail"
import PlaceholderPage from "./pages/Placeholder/Placeholder"

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/login', element: <PublicOnlyRoute><Login /></PublicOnlyRoute> },
            { path: '/signup', element: <PublicOnlyRoute><Register /></PublicOnlyRoute> }, // Matched Navbar /signup
            { path: '/register', element: <PublicOnlyRoute><Register /></PublicOnlyRoute> }, // Keep fallback
            { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
            { path: '/brands', element: <Brands /> },
            { path: '/subcategories', element: <SubCategories /> },
            { path: '/categories', element: <Categories /> },
            { path: '/categories/:categoryName', element: <CategoryDetail /> },
            { path: '/verfiyEmail', element: <PublicOnlyRoute><VerfiyEmail /></PublicOnlyRoute> },
            { path: '/product/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
            { path: '/checkOut', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
            { path: '/orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
            { path: '/forgetPassword', element: <PublicOnlyRoute><ForgetPassword /></PublicOnlyRoute> },
            { path: '/wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> }, // Lowercase to match Navbar
            { path: '/wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> }, // Keep fallback
            { path: '/searshProducts', element: <SearshProducts /> },
            { path: '/favorites', element: <ProtectedRoute><Favorites /></ProtectedRoute> },
            { path: '/account', element: <ProtectedRoute><Account /></ProtectedRoute> },
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