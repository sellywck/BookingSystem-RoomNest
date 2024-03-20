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
import { useState } from "react";
// import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthProvider";

const googleIcon =
  "https://cdn.pgimgs.com/hive-ui/static/v0.1.99/logo/google.svg";
const facebookIcon =
  "https://cdn.pgimgs.com/hive-ui/static/v0.1.99/logo/facebook.svg";
const BASE_URL =
  "https://c35179b3-44c4-45df-a8e9-b8ebe482257d-00-ieq5cbuud5mv.spock.replit.dev";

export default function AuthModal({ show, onHide }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const auth = getAuth();
  // const {userLoggedIn} = useContext(AuthContext)
  // const {currentUser} = useContext(AuthContext)

  // useEffect(()=> {
  //   if(currentUser) navigate("/")
  // }, [currentUser, navigate])

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
      await handleUserCreation(res);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      handleUserAuth(res);
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

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      handleUserAuth(res);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      handleUserCreation(res);
      console.log(res);
    } catch (error) {
      handleAuthError;
    }
  };

  const FacebookProvider = new FacebookAuthProvider();
  const handleFacebookSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, FacebookProvider);
      handleUserCreation(res);
    } catch (error) {
      console.log(error)
      handleAuthError(error);
    }
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, FacebookProvider);
      handleUserAuth(res);
    } catch (error) {
      console.log(error)
      handleAuthError(error);
    }
  };

  async function handleUserCreation(res) {
    console.log("handleUserCreation", res);
    if (res.user) {
      const { uid, email } = res.user;

      await axios.post(`${BASE_URL}/v1/signup`, { uid, email });

      toast.success("Account registered successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
      onHide();
    }
  }
  async function handleUserAuth(res) {
    console.log("handleUserAuth", res);
    if (res.user) {
      const { uid, email } = res.user;

      await axios.post(`${BASE_URL}/v1/login`, { uid, email });

      toast.success("Account login successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
      onHide();
    }
  }



  function handleAuthError(error) {
    console.error("Authentication error: ", error);

    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("Email already registered. Please proceed to login!", {
          autoClose: 5000,
          position: "bottom-right",
        });
        break;

      case "auth/weak-password":
        toast.error("Password is weak!!", {
          autoClose: 5000,
          position: "bottom-right",
        });
        break;

      case "auth/too-many-requests":
        toast.error(
          "Access to this account has been temporarily disabled due to many failed login attempts..",
          {
            autoClose: 5000,
            position: "bottom-right",
          }
        );
        break;
      case "auth/wrong-password":
        toast.error("Incorrect email or password.", {
          autoClose: 5000,
          position: "bottom-right",
        });
        break;

      default:
        toast.error("An error occurred. Please try again later.", {
          autoClose: 5000,
          position: "bottom-right",
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
            {show === "signup" ? (
              <Button
                className="mb-3 rounded-pill"
                variant="outline-dark"
                style={{ width: "100%" }}
                onClick={handleGoogleSignUp}
              >
                <img alt="Continue with Google" src={googleIcon} /> Continue
                with Google
              </Button>
            ) : (
              <Button
                className="mb-3 rounded-pill"
                variant="outline-dark"
                style={{ width: "100%" }}
                onClick={handleGoogleLogin}
              >
                <img alt="Continue with Google" src={googleIcon} /> Continue
                with Google
              </Button>
            )}
            {show === "signup" ? (
              <Button
              className="mb-3 rounded-pill"
              variant="outline-dark"
              style={{ width: "100%" }}
              onClick={handleFacebookSignUp}
            >
              <img alt="Continue with Facebook" src={facebookIcon} /> Continue
              with Facebook
            </Button>
            ) : (<Button
              className="mb-3 rounded-pill"
              variant="outline-dark"
              style={{ width: "100%" }}
              onClick={handleFacebookLogin}
            >
              <img alt="Continue with Facebook" src={facebookIcon} /> Continue
              with Facebook
            </Button>)}
            
            {/* <Button
              className="mb-3 rounded-pill"
              variant="outline-dark"
              style={{ width: "100%" }}
            >
              Continue with email
            </Button> */}
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
