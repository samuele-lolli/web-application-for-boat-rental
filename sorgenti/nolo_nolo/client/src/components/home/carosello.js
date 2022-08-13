import {Carousel, Container} from 'react-bootstrap';
import Immagine1 from "../../images/new1.jpg";
import Immagine2 from "../../images/new4.jpg";
import Immagine3 from "../../images/new3.jpg";
import Immagine4 from "../../images/new2.jpg";
import "../../css/home/carosello.css";

function Carosello() {
    return(
        <Container fluid>
            <Carousel >
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Immagine1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <p className="titolo">Barche a vela<br/> </p>
                        <p className="sottotitolo">Per veri appassionati</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Immagine2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <p className="titolo">Barche a motore<br/> </p>
                        <p className="sottotitolo">Passa le tue giornate in mezzo al mare</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Immagine3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <p className="titolo">Barche non motore<br/> </p>
                        <p className="sottotitolo">Regala una giornata da sogno alla tua famiglia</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Immagine4}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <p className="titolo">Accessori<br/> </p>
                        <p className="sottotitolo">Per una vacanza perfetta!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default Carosello;