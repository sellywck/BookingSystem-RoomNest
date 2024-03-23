import Button from "react-bootstrap/Button";
import UpdateRoomModal from "./UpdateRoomModal";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRoom } from "../features/rooms/roomsSlice";
// import { AuthContext } from "./AuthProvider";
// import { useContext } from "react";

export default function RoomPostCard({
  roomId,
  title,
  description,
  price,
  photo,
  currentUser,
  isAdmin,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const {currentUser, identity} = useContext(AuthContext)

  const dispatch = useDispatch();


  const handleDelete = () => {
    dispatch(deleteRoom(roomId))
  }

  return (
    <Card className="mb-4">
      <Image
        style={{
          width: "100%",
          height: "240px",
          backgroundSize: "cover",
          backgroundPosition: "cover",
        }}
        src={photo}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Price: RM{price}</Card.Text>
        {currentUser ? (
          isAdmin === true ? (
            <>
              <Button variant="primary" onClick={handleShow}>
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </>
          ) : (
            <>
              <Button variant="primary">Book appointment</Button>{" "}
            </>
          )
        ) : (
          <></>
        )}
        <UpdateRoomModal
          show={show}
          handleClose={handleClose}
          originalRoomContent={{ title, description, price, photo }}
          isAdmin={isAdmin}
          currentUser={currentUser}
          roomId={roomId}
        />
      </Card.Body>
    </Card>
  );
}
