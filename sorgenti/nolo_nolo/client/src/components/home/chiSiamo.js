import React from "react";
import {Jumbotron, Media} from "react-bootstrap";
import barca from "../../images/barca.png";
import "../../css/home/jumbotron.css";

export default function ChiSiamo(){
    return(
        <Jumbotron id="jumbo1">
            <Media>
                <Media.Body>
                    <h1 id="titoloJumbo" className="titoloCard text-center">Chi siamo?</h1>
                    <p className="lead text-center">Ciao! Siamo Nolo Nolo. Siamo una società di noleggio barche di
                        vario tipo. Ti accompagneremo nella
                        tua vacanza da sogno in mezzo al mare. Offriamo numerosi servizi:
                    </p>
                    <ul className="lead ">
                        <li>Noleggio barche a vela</li>
                        <li>Noleggio barche non alimentate</li>
                        <li>Noleggio barche a motore</li>
                        <li>Noleggio accessori nautici di vario tipo</li>
                        <li>Promozioni e punti fedeltà per i nosti clienti più fidati</li>
                    </ul>
                    <p className="lead text-center"> <br/>
                        <img id="idImmagine1"
                             width={150}
                             height={150}
                             src={barca}
                             alt="Generic placeholder"
                        />
                    </p>
                    <p className="lead"><b> Visita il nostro sito e scopri le barche più adatte a te!</b></p>
                </Media.Body>
            </Media>
        </Jumbotron>
    )
}