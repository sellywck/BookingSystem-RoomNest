import { Button } from "react-bootstrap";
import RoomPostCard from "./RoomPostCard";

export default function RoomPostHome() {
  return (
    <>
      <Button className="mb-3 rounded-pill" variant="danger">
        <i className="bi bi-plus-lg"></i> Add New Room
      </Button>
      <RoomPostCard />
    </>
  );
}
