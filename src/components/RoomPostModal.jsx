
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';

export default function RoomPostModal() {
  return (
    <Card style={{ width: '18rem' }} >
      <Carousel slide={false} >
      <Carousel.Item >
        <Image src="https://picsum.photos/300/300?random=1" />
      </Carousel.Item>
      <Carousel.Item>
        <Image text="Second slide" src="https://picsum.photos/300/300?random=2" />
        
      </Carousel.Item>
      <Carousel.Item>
        <Image text="Third slide" src="https://picsum.photos/300/300?random=3" />
      </Carousel.Item>
    </Carousel>
      <Card.Body>
        <Card.Title>Room Title</Card.Title>
        <Card.Text>
          Room decription
        </Card.Text>
        <Card.Text>
          Room Price
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

