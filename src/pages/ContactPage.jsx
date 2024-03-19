import { Card, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
export default function ContactPage() {
  return (
    <>
      <Container>
        <motion.div whileHover={{ scale: 1.2 }}>
          <h1 className="title">CONTACT US</h1>
        </motion.div>
        <div>
          <Row>
            <Col md={6} className="d-flex contactInformation">
              <div className="row d-flex justify-content-between ">
                <Row className="mb-4 mx-2">
                  <Col className="mb-4">
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <div>
                        <i
                          className="bi bi-geo-alt-fill"
                          style={{ fontSize: "40px" }}
                        ></i>
                        <Card.Title>ADDRESS:</Card.Title>
                        <Card.Text>
                          B-1-11, IOI Boulevard, Jalan Kenari 5, 47100 Puchong,
                          Selangor, Malaysia
                        </Card.Text>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <div>
                        <i
                          className="bi bi-envelope"
                          style={{ fontSize: "40px" }}
                        ></i>
                        <Card.Title>EMAIL:</Card.Title>
                        <Card.Text>
                          <a href="mailto:support@sigmaschool.co" style={{color: "black", textDecoration: "none"}}>support@sigmaschool.co</a>
                          </Card.Text>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-4 mx-2">
                  <Col className="mb-4">
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <Card.Body>
                        <i
                          className="bi bi-telephone"
                          style={{ fontSize: "40px" }}
                        ></i>
                        <Card.Title>CALL US </Card.Title>
                        <Card.Text>
                          <a href="tel:+60178782935" style={{color: "black", textDecoration: "none"}}> +60178782935</a>
                         </Card.Text>
                      </Card.Body>
                    </div>
                  </Col>
                  <Col className="mb-4">
                    <div
                      className="d-flex justify-content-center align-items-center text-center"
                      style={{ width: "18rem", height: "200px" }}
                    >
                      <Card.Body>
                        <Card.Title>CONNECT WITH US</Card.Title>
                        <Card.Text>
                          <a href="https://www.instagram.com/joinsigma/?hl=en">
                            <i
                              className="bi bi-instagram "
                              style={{
                                fontSize: "40px",
                                padding: "8px",
                                color: "black",
                              }}
                            ></i>
                          </a>
                          <a href="https://wa.me/+60178782935">
                          <i
                            className="bi bi-whatsapp"
                            style={{ fontSize: "40px", padding: "8px", color: "black" }}
                          ></i>
                          </a>
                          <a href="https://sigmaschool.co/">
                          <i
                            className="bi bi-link"
                            style={{ fontSize: "40px", padding: "8px" , color: "black"}}
                          ></i>

                          </a>
                        </Card.Text>
                      </Card.Body>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* google Map */}
            <Col md={6} className="fluid">
              <div style={{ width: "100%" }}>
                <iframe
                  width="100%"
                  height={600}
                  src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Sigma%20School,%20B-1-11,%20IOI%20Boulevard,%20Jalan%20Kenari%205,%2047100%20Puchong,%20Selangor,%20Malaysia+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                >
                  &lt;a href="https://www.gps.ie/"&gt;gps vehicle
                  tracker&lt;/a&gt;
                </iframe>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
