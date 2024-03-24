import Button from "react-bootstrap/Button";
import UpdateRoomModal from "./UpdateRoomModal";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRoom } from "../../features/rooms/roomsSlice";
import CreateBookingModal from "../bookings/CreateBookingModal";
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
  //create room modal
  const [showRoom, setShowRoom] = useState(false);
  const handleCloseRoom = () => setShowRoom(false);
  const handleShowRoom = () => setShowRoom(true);


  //create booking modal
  const [showBooking, setShowBooking] = useState (false);
  const handleCloseBooking = () => setShowBooking(false);
  const handleShowBooking = () => setShowBooking(true)
  // const {currentUser, identity} = useContext(AuthContext)

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRoom(roomId));
  };

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
        <Card.Title className="mb-2">RM{price}</Card.Title>
        <Card.Title className="mb-2">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {currentUser ? (
          isAdmin === true ? (
            <>
              <Button variant="dark"  onClick={handleShowRoom}>
                <span><i className="bi bi-pencil"></i></span>
              </Button>
              <Button variant="danger" className="mx-1" onClick={handleDelete}>
               <span><i className="bi bi-trash"></i></span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="danger" onClick={handleShowBooking}>Book appointment</Button>{" "}
            </>
          )
        ) : (
          <></>
        )}
        <UpdateRoomModal
          show={showRoom}
          handleClose={handleCloseRoom}
          originalRoomContent={{ title, description, price, photo }}
          isAdmin={isAdmin}
          currentUser={currentUser}
          roomId={roomId}
        />

        <CreateBookingModal
          roomId={roomId}
          show={showBooking}
          handleClose={handleCloseBooking}
        />
      </Card.Body>
    </Card>
  );
}
