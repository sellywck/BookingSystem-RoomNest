import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, addDays } from "date-fns";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveBooking } from "../../features/bookings/bookingsSlice";

export default function CreateBookingModal({ roomId, show, handleClose }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();

  const startDate = setHours(setMinutes(new Date(), 0), 9);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const dispatch = useDispatch();
  const handleSaveBooking = async () => {
    try {
      const bookingData = {
        room_id: roomId,
        name,
        booking_date: selectedDate.toISOString().split("T")[0],
        booking_time: selectedDate.toISOString().split("T")[1].split(".")[0],
        phone_number: phoneNumber,
      };

      const response = await dispatch(saveBooking(bookingData));
      console.log(response);
      handleClose();
      toast.success("Booking created successfully", {
        autoClose: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error creating booking", {
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
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>New appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="room_title">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="room_title">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="+60 123456789"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Due date</Form.Label> <br />
            <DatePicker
              style={{ width: "auto" }}
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              filterTime={filterPassedTime}
              timeIntervals={60}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText={"MMMM d, yyyy h:mm aa"}
              minDate={addDays(currentDate, 1)}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 30), 20)}
            />
          </Form.Group>
          <Button variant="danger" onClick={handleSaveBooking}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
