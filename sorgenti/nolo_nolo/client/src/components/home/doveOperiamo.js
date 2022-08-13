import React from "react";
import {Jumbotron, Media} from "react-bootstrap";
import italia from "../../images/italia.jpg";
import "../../css/home/jumbotron.css";

export default function DoveOperiamo(){
    return(
        <Jumbotron id="jumbo2">
            <Media>
                <Media.Body>
                    <h1 id="titoloJumbo" className="titoloCard text-center">Dove operiamo?</h1>
                    <p className="lead text-center">
                        Le nostre barche situano prettamente nei porti delle città turistiche lungo la costa italiana e nelle nostre isole. Visitando il sito vedrai che
                        ogni barca ubica in una città, ti basterà filtrare il tuo luogo di interesse e scegliere ciò che fa per te!
                        <br/>
                        <img id="idImmagine2"
                             width={250}
                             height={250}
                             src={italia}
                             alt="Generic placeholder"
                        />
                    </p>
                    <p className="lead"><br/><br/><b>Ti aspettiamo!</b> <i className="far fa-laugh-wink"> </i></p>
                </Media.Body>
            </Media>
        </Jumbotron>
    )
}