import { Button, Container, Spinner } from "react-bootstrap";
import RoomPostCard from "./RoomPostCard";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { fetchRooms } from "../features/rooms/roomsSlice";
import AddNewRoomModal from "./AddNewRoomModal";

export default function RoomPostHome() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const loading = useSelector((state) => state.rooms.loading);

  const { currentUser, identity } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [currentUser, dispatch]);

  return (
    <>
      {currentUser && identity && identity.is_admin && (
        <>
          <span className="d-flex flex-row-reverse">
            <Button
              className="d-flex flex-row-reverse mb-3 rounded-pill"
              variant="danger"
              onClick={handleShow}
            >
              <i className="bi bi-plus-lg"></i> Add New Room
            </Button>
          </span>
          {loading && (
            <Spinner
              animation="border"
              className="ms-3 mt-3"
              variant="danger"
            />
          )}
          <AddNewRoomModal show={show} handleClose={handleClose} />
        </>
      )}

      <Container className="d-flex-row items-align-center" style={{width: "60%", justifyContent: "center"}} >
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <>
                  <RoomPostCard
                    key={room.id}
                    roomId={room.id}
                    title={room.title}
                    description={room.description}
                    price={room.price}
                    photo={room.photo}
                    currentUser={currentUser}
                    isAdmin={identity && identity.is_admin}
                  />
            </>
          ))
        ) : (
          <div>No rooms found...</div>
        )}
      </Container>
    </>
  );
}
