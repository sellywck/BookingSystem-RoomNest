import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/userAuthentication/AuthProvider";
import AuthModal from "../components/userAuthentication/AuthModal";

export default function Booking() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <AuthModal show="login" onHide={() => navigate("/")} />;
  }

  return <div>check your appointment</div>;
}
