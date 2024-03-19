import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import AuthModal from "../components/AuthModal";

export default function Appointment() {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)

  if(!currentUser){
    return <AuthModal show="login" onHide={() => navigate("/")} />
  }

  return (
    <div>
      check your appointment
    </div>
  )
}
