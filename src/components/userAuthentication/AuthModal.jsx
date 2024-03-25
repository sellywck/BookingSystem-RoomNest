import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button, Modal, Form } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const googleIcon =
  "https://cdn.pgimgs.com/hive-ui/static/v0.1.99/logo/google.svg";
const facebookIcon =
  "https://cdn.pgimgs.com/hive-ui/static/v0.1.99/logo/facebook.svg";
const BASE_URL =
  "https://c35179b3-44c4-45df-a8e9-b8ebe482257d-00-ieq5cbuud5mv.spock.replit.dev";

export default function AuthModal({ show, onHide }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const { handleIdentityUpdate } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (show === "signup") {
        await handleSignUp(e);
      } else {
        await handleLogin(e);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log({res})
      
      if (res.user) {
        const { uid, email } = res.user;
        const response = await axios.post(`${BASE_URL}/v1/signup`, {
          uid,
          email,
        });

        handleAuthenticationResponse(response);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log({res})
      if (res.user) {
        const { uid, email } = res.user;
        const response = await axios.post(`${BASE_URL}/v1/login`, {
          uid,
          email,
        });
        handleAuthenticationResponse(response);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handlePasswordReset = () => {
    const email = prompt("Please enter your email");
    if (email !== null) {
      sendPasswordResetEmail(auth, email);
      alert("Email sent! Check your inbox for password reset instructions");
    }
  };

  const GoogleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      console.log({res})
      if (res.user) {
        const { uid, email } = res.user;
        const response = await axios.post(`${BASE_URL}/v1/login/sso`, {
          uid,
          email,
        });
        handleAuthenticationResponse(response);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const FacebookProvider = new FacebookAuthProvider();
  const handleFacebookSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, FacebookProvider);
      console.log({res})
      if (res.user) {
        const { uid, email } = res.user;
        const response = await axios.post(`${BASE_URL}/v1/login/sso`, {
          uid,
          email,
        });
        handleAuthenticationResponse(response);
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  function handleAuthenticationResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      const token = response.data.token;
      if (token) {
        localStorage.setItem("jwt_token", token);
        handleIdentityUpdate();
      }
      toast.success(response.data.message, {
        autoClose: 2000,
        position: "top-center",
      });
      onHide();
    } else {
      toast.error(response.data.message, {
        autoClose: 2000,
        position: "top-center",
      });
    }
  }

  function handleAuthError(error) {
    console.error("Authentication error: ", error);

    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("Email already registered. Please proceed to login!", {
          autoClose: 3000,
          position: "top-center",
        });
        break;

      case "auth/weak-password":
        toast.error("Password is weak!!", {
          autoClose: 3000,
          position: "top-center",
        });
        break;

      case "auth/too-many-requests":
        toast.error(
          "Access to this account has been temporarily disabled due to many failed login attempts..",
          {
            autoClose: 3000,
            position: "top-center",
          }
        );
        break;
      case "auth/wrong-password":
        toast.error("Incorrect email or password.", {
          autoClose: 3000,
          position: "top-center",
        });
        break;

      case "auth/account-exists-with-different-credential":
        toast.error(
          "An account already exists with a different credential for this email address.",
          {
            autoClose: 3000,
            position: "top-center",
          }
        );
        break;
      case "auth/user-not-found":
        toast.error(
          "User not registered. Please proceed to sign up a new account.",
          {
            autoClose: 3000,
            position: "top-center",
          }
        );
        break;

      default:
        toast.error("An error occurred. Please try again later.", {
          autoClose: 3000,
          position: "top-center",
        });
        break;
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {show === "signup"
              ? "Create your account"
              : "Log in to you account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <i
            className="bi bi-houses"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              color: "red",
              fontSize: "25px",
              marginBottom: "0px",
            }}
          ></i>
          <br />
          <h3 className="mb-3 text-center">
            Welcome to RoomNest <span></span>
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {show === "login" && (
              <p onClick={handlePasswordReset}>
                Forgot password?{" "}
                <a href="#" style={{ color: "red", cursor: "pointer" }}>
                  Click here to reset.{" "}
                </a>
              </p>
            )}

            <Button
              className="mb-3 rounded-pill"
              style={{ width: "100%", border: "none" }}
              variant="danger"
              type="submit"
            >
              Continue
            </Button>
            <br />
            <p
              className="mb-3"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                fontSize: "15px",
                marginBottom: "0px",
              }}
            >
              or
            </p>
            <Button
              className="mb-3 rounded-pill"
              variant="outline-dark"
              style={{ width: "100%" }}
              onClick={handleGoogleSignIn}
            >
              <img alt="Continue with Google" src={googleIcon} /> Continue with
              Google
            </Button>

            <Button
              className="mb-3 rounded-pill"
              variant="outline-dark"
              style={{ width: "100%" }}
              onClick={handleFacebookSignIn}
            >
              <img alt="Continue with Facebook" src={facebookIcon} /> Continue
              with Facebook
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p style={{ fontSize: "12px" }}>
            I agree to RoomNest Terms of Service and Privacy Policy including
            the collection, use and disclosure of my personal information.
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}
