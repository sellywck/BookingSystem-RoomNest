import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateRoom } from "../../features/rooms/roomsSlice";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

export default function UpdateRoomModal({
  show,
  handleClose,
  originalRoomContent,
  roomId,
}) {
  const [newTitle, setNewTitle] = useState(originalRoomContent.title);
  const [newDescription, setNewDescription] = useState(
    originalRoomContent.description
  );
  const [newPrice, setNewPrice] = useState(originalRoomContent.price);
  const [newFile, setNewFile] = useState(null);
  const dispatch = useDispatch();

  const handleNewFile = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      let imageUrl = originalRoomContent.photo;
      if (newFile) {
        const imageRef = ref(storage, `roomImages/${newFile.name}`);
        await uploadBytes(imageRef, newFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const updatedRoomData = {
        id: roomId,
        title: newTitle,
        description: newDescription,
        price: newPrice,
        photo: imageUrl,
      };

      const response = await dispatch(updateRoom(updatedRoomData));
      handleClose();
      toast.success(response.payload.message, {
        autoClose: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error creating room", {
        autoClose: 2000,
        position: "top-center",
      });
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Room Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="room_title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Master Room with Queen Bed and Window"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as ="textarea"
              rows={4}
              placeholder={`1. Room with own bathroom\n2. Fully Furnished\n3. Rental Negotiable`}
              required
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Rental Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="800 "
              required
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              placeholder="Upload photos "
              onChange={handleNewFile}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
