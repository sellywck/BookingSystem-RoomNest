import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { saveRoom } from "../../features/rooms/roomsSlice";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

export default function AddNewRoomModal({ show, handleClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      if (!file) {
        toast.error("Please select a file", {
          autoClose: 2000,
          position: "top-center",
        });
        return;
      }
      const imageRef = ref(storage, `roomImages/${file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      const roomData = {
        title,
        description,
        price,
        photo: imageUrl,
      };

      const response = await dispatch(saveRoom(roomData));
      console.log(response);
      handleClose();
      toast.success("Room created successfully", {
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
        <Modal.Title>New Room Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="room_title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Master Room with Queen Bed and Window"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder={`1. Room with own bathroom\n2. Fully Furnished\n3. Rental Negotiable`}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Rental Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="800 "
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="file">
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              placeholder="Upload photos "
              onChange={handleFile}
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
