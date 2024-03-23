import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AuthProvider from "./components/userAuthentication/AuthProvider";
import ContactPage from "./pages/ContactPage";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
import Booking from "./pages/Booking";
import HomePages from "./pages/HomePages"

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePages />} />
              <Route path="booking" element={<Booking />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </AuthProvider>
  );
}
