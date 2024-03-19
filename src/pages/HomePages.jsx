import { Col, Container, Row } from "react-bootstrap";
import RoomPostModal from "../components/RoomPostModal";

export default function HomePages() {
  return (
    <div>
      <Container className="mainView">
        <Row>
          <Col>
            <RoomPostModal />
          </Col>
          <Col>
            <RoomPostModal />
          </Col>
          <Col>
            <RoomPostModal />
          </Col>
          <Col>
            <RoomPostModal />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
