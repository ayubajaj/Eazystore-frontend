import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { productsLoader } from "./components/Home.jsx";
import { contactAction } from "./components/Contact.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import { CartProvider } from "./store/cart-context.jsx";
import { AuthProvider } from "./store/auth-context.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import Profile from "./components/Profile.jsx";
import Orders from "./components/Orders.jsx";
import Message from "./components/admin/Message.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Register from "./components/Register.jsx";
import { registerAction } from "./components/Register.jsx";
import { profileLoader, profileAction } from "./components/Profile.jsx";


const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />}  />
    <Route path="/login" element={<Login />} action={loginAction} />
     <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
   
    <Route element={<ProtectedRoute />} >
     <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/profile" element={<Profile/>} loader={profileLoader} action={profileAction}
      shouldRevalidate={({actionResult})=>{
        return !actionResult?.success;
      }}/>
      <Route path="/orders" element={<Orders/>} />
      <Route path="/admin/messages" element={<Message/>} />
      <Route path="/admin/orders" element={<AdminOrders/>} />

    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={appRouter} />
    </CartProvider>
    </AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>
);
