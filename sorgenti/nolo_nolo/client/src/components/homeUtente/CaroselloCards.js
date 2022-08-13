import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import Carousel from "react-elastic-carousel";
import Card from "react-bootstrap/Card";
import SimpleTabs from "./Tabs";
import "../../css/App/caroselloBarche.css";
import {setMode} from "../darkmode/themes";

export default function CaroselloCards(props){
    //costanti con link per chiamata al server relative al tipo di barca
    const nonalimentata = "http://localhost:3001/nonalimentata";
    const barchemotore = "http://localhost:3001/barchemotore";
    const barchevela = "http://localhost:3001/vela";
    const accessori = "http://localhost:3001/accessori";
    const [error, setError] = useState("")

    //misure carosello per vari dispositivi
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];

    //funzione che riceve json dal server per popolare il carosello
    const fetchCards = async (url) => {
        const response = await fetch(url);
        if(response.status === 400) {
            setError("Errore nel caricamento dei prodotti! Riprova più tardi!")
        } else {
            return (await response.json())

        }
    };

    //popolamento carosello
    const selectButtonGroup = (type) => {
        if(type==="Barche a motore"){
            fetchCards(barchemotore).then((response) => {props.setCards(response)})
        } else if(type==="Barche a vela"){
            fetchCards(barchevela).then((response) => {props.setCards(response)})
        } else if(type==="Barche non alimentate"){
            fetchCards(nonalimentata).then((response) => {props.setCards(response)
            })
        } else if(type==="Accessori"){
            fetchCards(accessori).then((response) => {props.setCards(response)})
        }
    }

    const setCardsAppoggio = props.setCards; //è necessario questo passaggio per settare la dipendenza dello useEffect
    //useffect che setta il tema del sito e popola il carosello
    useEffect(() => {
        setMode();
        fetchCards("http://localhost:3001/barchemotore").then((response) => {setCardsAppoggio(response)})
        },[setCardsAppoggio]
    )

    //costante che ritorna le cards per il carosello, contiene dei controlli sulla disponibilita' della barca e patente
    const carte = props.cards.map(function(card) {
        if(card["disponibilita"]===1){
            if(props.patente===0 && card["patente"]===1){
                return <Card id="cartenoleggio" key={card["id"].toString()}>
                    <div className="card-img-wrap">
                        <Card.Img id="fotoCard" className="imageCard" variant="top" src={card["immagine"]} />
                    </div>
                    <Card.Body>
                        <Card.Title id="titoloCard" className="lead text-center" ><b>{card["nome"]}</b></Card.Title>
                        <Card.Text className="lead text-center" >
                            <b>Prezzo</b>: {card["tariffa"]} €/al giorno
                        </Card.Text>
                        <Card.Text id="descrizioneCard" className="lead text-center" >
                            {card["descrizione"]}
                        </Card.Text>
                    </Card.Body>
                    <Button id="bottoneCards" disabled> Necessita di patente </Button>
                </Card>
            } else{
                return <Card id="cartenoleggio" key={card["id"].toString()}>
                    <div onClick={() => props.toggleModalBoat(card)} style={{cursor: 'pointer'}} className="card-img-wrap">
                        <Card.Img id="fotoCard" className="imageCard" variant="top" src={card["immagine"]} />
                    </div>
                    <Card.Body>
                        <Card.Title id="titoloCard" className="lead text-center" ><b>{card["nome"]}</b></Card.Title>
                        <Card.Text className="lead text-center" >
                            <b>Prezzo</b>: {card["tariffa"]} €/al giorno
                        </Card.Text>
                        <Card.Text id="descrizioneCard" className="lead text-center" >
                            {card["descrizione"]}
                        </Card.Text>
                    </Card.Body>
                    <Button id="bottoneCards" onClick={() => props.toggleModalBoat(card)}> Prenota </Button>
                </Card>
            }
        } else {
            return <Card id="cartenoleggio" key={card["id"].toString()}>
                <div className="card-img-wrap">
                    <Card.Img id="fotoCard" className="imageCard" variant="top" src={card["immagine"]} />
                </div>
                <Card.Body>
                    <Card.Title id="titoloCard" className="lead text-center" ><b>{card["nome"]}</b></Card.Title>
                    <Card.Text className="lead text-center" >
                        <b>Prezzo</b>: {card["tariffa"]} €/al giorno
                    </Card.Text>
                    <Card.Text id="descrizioneCard" className="lead text-center" >
                        {card["descrizione"]}
                    </Card.Text>
                </Card.Body>
                <Button id="bottoneCards" disabled> In manutenzione </Button>
            </Card>
        }
    })

    return (
        <div className="App">
            <Row>
                <Col>
                    <SimpleTabs selectButtonGroup={selectButtonGroup}/>
                </Col>
            </Row>
            <div className="carousel-wrapper" >
                <div className="testo-wrapper">
                    <h6 id="testoCarosello" className="">{props.active}
                    </h6>
                </div>

                {error === "" ? <Carousel id="carosello" isRTL={false} breakPoints={breakPoints} >
                    {carte}
                </Carousel> : <div className="text-center">{error}</div>}
            </div>
        </div>

    )
}