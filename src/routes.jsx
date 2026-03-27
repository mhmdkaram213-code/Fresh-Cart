import Layout from "./components/Layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import PublicOnlyRoute from "./components/PublicOnlyRoute/PublicOnlyRoute"
import Home from "./pages/Home/Home"
import Login from "./auth/Login/Login"
import Register from "./auth/Register/Register"
import Cart from "./pages/Cart/Cart"
import Brands from "./pages/Brands/Brands"
import BrandDetails from "./pages/BrandDetails/BrandDetails"
import Categories from "./pages/Categories/Categories"
import CategoryDetails from "./pages/CategoryDetail/CategoryDetail"
import VerfiyEmail from "./pages/VerfiyEmail/VerfiyEmail"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import CheckOut from "./pages/CheckOut/CheckOut"
import Orders from "./pages/Orders/Orders"
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword"
import VerifyResetCode from "./pages/ForgetPassword/VerifyResetCode"
import ResetPassword from "./pages/ForgetPassword/ResetPassword"
import WishList from "./pages/WishList/WishList"
import SearshProducts from "./pages/SearshProducts/SearshProducts"
import Favorites from "./pages/Favorites/Favorites"
import NotFound from "./pages/NotFound/NotFound"
import Account from "./pages/Account/Account"
import SubCategories from "./pages/SubCategories/SubCategories"
import SubCategoryDetails from "./pages/SubCategories/SubCategoryDetails"
import CheckoutCash from "./pages/CheckoutCash"
import CheckoutOnline from "./pages/CheckoutOnline"
import OrderSuccess from "./pages/OrderSuccess"
import AllOrders from "./pages/AllOrders"
import PlaceholderPage from "./pages/Placeholder/Placeholder"

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'home', element: <Home /> },
            { path: 'login', element: <PublicOnlyRoute><Login /></PublicOnlyRoute> },
            { path: 'signup', element: <PublicOnlyRoute><Register /></PublicOnlyRoute> },
            { path: 'register', element: <PublicOnlyRoute><Register /></PublicOnlyRoute> },
            { path: 'forgot-password', element: <PublicOnlyRoute><ForgetPassword /></PublicOnlyRoute> },
            { path: 'forgetPassword', element: <PublicOnlyRoute><ForgetPassword /></PublicOnlyRoute> },
            { path: 'verify-reset-code', element: <PublicOnlyRoute><VerifyResetCode /></PublicOnlyRoute> },
            { path: 'reset-password', element: <PublicOnlyRoute><ResetPassword /></PublicOnlyRoute> },
            
            // Checkout & Orders
            { path: 'checkout/cash', element: <ProtectedRoute><CheckoutCash /></ProtectedRoute> },
            { path: 'checkout/online', element: <ProtectedRoute><CheckoutOnline /></ProtectedRoute> },
            { path: 'order-success', element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },
            { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
            
            { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
            { path: 'brands', element: <Brands /> },
            { path: 'brands/:id', element: <BrandDetails /> },
            { path: 'categories', element: <Categories /> },
            { path: 'categories/:id', element: <CategoryDetails /> },
            { path: 'subcategories', element: <SubCategories /> },
            { path: 'subcategories/:id', element: <SubCategoryDetails /> },
            { path: 'products/:id', element: <ProductDetails /> },
            { path: 'product/:id', element: <ProductDetails /> }, // Fallback
            
            // Protected other pages
            { path: 'account', element: <ProtectedRoute><Account /></ProtectedRoute> },
            { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
            { path: 'orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
            { path: 'checkOut', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
            
            // Public other pages
            { path: 'verfiyEmail', element: <PublicOnlyRoute><VerfiyEmail /></PublicOnlyRoute> },
            { path: 'searshProducts', element: <SearshProducts /> },
            { path: 'favorites', element: <ProtectedRoute><Favorites /></ProtectedRoute> },
            
            // Placeholders
            { path: 'track-order', element: <PlaceholderPage /> },
            { path: 'about', element: <PlaceholderPage /> },
            { path: 'contact', element: <PlaceholderPage /> },
            { path: 'logout', element: <PlaceholderPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];