import { Col, Container, Row } from "react-bootstrap";
import RoomPostHome from "../components/room/RoomPostHome";

export default function HomePages() {
  return (
    <div>
      <Container className="mainView">
        <Row>
          <Col>
            <RoomPostHome />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
