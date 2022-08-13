import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import BarNav from "./navbar/barNav";
import Carosello from "./carosello";
import ChiSiamo from "./chiSiamo";
import DoveOperiamo from "./doveOperiamo";
import {useToasts} from "react-toast-notifications";
import {useEffect} from "react";
import '../../css/home/home.css';
import '../../css/home/footer.css';
import '../../css/App/navbarUtente.css';
import {setMode} from "../darkmode/themes";
import {ReactComponent as Up} from "../homeUtente/navbarUtente/icons/up.svg";

export default function Home(){
    const { addToast } = useToasts();

    //useffect che setta il tema e mostra un toast di benvenuto
    useEffect(() => {
        setMode();
        setTimeout(() =>
            addToast('Effettua subito la registrazione o il login alla piattaforma per iniziare subito!',
                { appearance: 'info'}), 2000);
        }, [addToast]);

    return(
        <Container fluid id="layout">
            <Row>
                <Col> <BarNav/> </Col>
            </Row>
            <Row>
                <Col>
                    <p id="titolo" className="text-center">NoloBoats</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p id="sottotitolo" className="lead"> Concediti una favolosa giornata a bordo di uno dei nostri
                        mezzi. Forza, che aspetti?
                    </p>
                </Col>
            </Row>
            <Row>
                <Col> <Carosello/> </Col>
            </Row>
            <Row>
                <Col className="col-lg-6 col-md-12 col-sm-12" id="siamo">
                    <ChiSiamo/>
                </Col>
                <Col className="col-lg-6 col-md-12 col-sm-12">
                    <DoveOperiamo/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <footer id="footer" className="text-center text-white align-bottom" >
                        <a className="btn btn-outline-light btn-floating m-1" id="copyright" href={"#siamo"} role="button">© 2021 Copyright: <b>NoloBoats</b>   </a>
                        <a className="btn btn-outline-light btn-floating m-1" id="tornaSu" href={"#layout"} role="button"><Up/></a>
                    </footer>
                </Col>
            </Row>
        </Container>
    )
}