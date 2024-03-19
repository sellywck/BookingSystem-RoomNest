import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePages from "./pages/HomePages";
import AuthProvider from "./components/AuthProvider";
import Appointment from "./pages/Appointment";
import ContactPage from "./pages/ContactPage";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePages />} />
            <Route path="appointment" element={<Appointment/>}/>
            <Route path="contact" element={<ContactPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </AuthProvider>
  );
}