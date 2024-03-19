import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { Outlet, useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";

export default function RootLayout() {
  const [modalShow, setModalShow] = useState(null);

  const handleShowSignUp = () => setModalShow("signup");
  const handleShowLogin = () => setModalShow("login");
  const handleClose = () => setModalShow(null);
  const navigate = useNavigate();

  const auth = getAuth();
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary mb-3">
        <Container fluid>
          <motion.div whileHover={{ scale: 0.9 }}>
            <Navbar.Brand href="/" style={{ fontSize: "30px" }}>
              RoomNest{" "}
              <span>
                <i
                  className="bi bi-houses"
                  style={{ color: "red", fontSize: "35px" }}
                ></i>
              </span>{" "}
            </Navbar.Brand>
          </motion.div>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                RoomNest{" "}
                <span>
                  <i
                    className="bi bi-houses"
                    style={{ color: "red", fontSize: "35px" }}
                  ></i>
                </span>{" "}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-end flex-grow-1 pe-3"
                style={{ fontSize: "16px" }}
              >
                <Nav.Link
                  href="/"
                  style={{ fontWeight: "500", fontStyle: "bold" }}
                >
                  {currentUser ? `Welcome ${currentUser.email}!` : ""}
                </Nav.Link>
                <Nav.Link className="navlink" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="navlink" onClick={handleShowSignUp}>
                  Sign Up
                </Nav.Link>
                <Nav.Link className="navlink" onClick={handleShowLogin}>
                  Login
                </Nav.Link>
                <Nav.Link className="navlink" href="contact">
                  Contact Us
                </Nav.Link>
                <Nav.Link className="navlink" href="appointment">
                  Appointment
                </Nav.Link>

                <Button
                  style={{ fontSize: "16px" }}
                  variant="danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
      <AuthModal show={modalShow} onHide={handleClose} />
    </>
  );
}
