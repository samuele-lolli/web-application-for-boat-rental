import "../../css/App/app.css";
import React, {useEffect, useState} from 'react';
import NavbarUtente from "./navbarUtente/navbarUtente";
import {Col, Container, NavDropdown, Row} from "react-bootstrap";
import Axios from "axios";
import BoatModal from "./BoatModal";
import CancellaModal from "./CancellaModal";
import CaroselloCards from "./CaroselloCards";
import Accordion from 'react-bootstrap/Accordion';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import moment from "moment";
import ModificaModal from "./ModificaModal";
import RestituisciModal from "./RestituisciModal";
import {useToasts} from "react-toast-notifications";
import {ReactComponent as Up} from "./navbarUtente/icons/up.svg";

export default function App() {
    Axios.defaults.withCredentials = true;
    const [cards, setCards] = useState([]); //cards delle barche
    const [datiModale, setDatiModale] = useState([]);
    const [carrello, setCarrello] = useState([]);
    const [patente, setPatente] = useState([]);
    const idUtente = localStorage.getItem("idUser");

    //useffect per verificare la patente dell'utente e recupera le prenotazioni relative ad un utente.
    //filtra le prenotazioni tra attuali, passate e future.
    useEffect(() => {
       Axios.post("http://localhost:3001/patente", {
            idUtente: idUtente,
        }).then((response) => {
            if(response){
                setPatente(response["data"][0]["patente"]);
            }
        });
        Axios.post("http://localhost:3001/dropdown", {
            idUtente: localStorage.getItem("idUser"),
        }).then((response) => {
            if(response.data.message==="ERR") {
                console.log("Errore server")
            } else{
                convert(response);
                let inizio=[];
                let fine=[];
                let ids=[];
                getRange(response, inizio, fine, ids);
                attuali(inizio, fine, ids)
                passate(inizio, fine, ids)
                future(inizio, fine, ids)
                //per far partire la seconda useffect dopo che gli array sulle prenotazioni sono stati popolati
                setTimeout(function(){setAlertRitardo(true)},2000)
            }
        });
    }, [carrello, idUtente]);

    const[alertRitardo, setAlertRitardo]=useState(false);
    const { addToast } = useToasts();

    //useffect che verifica la presenza di prenotazioni attuali in scadenza e ne avvisa la presenza all'utente
    useEffect(() => {
            for(let i=0;i<fineA.length;i++){
            if(moment(fineA[i]).startOf('day').isSame(moment().startOf('day'))){
                i=fineA.length;
                addToast("Si ricordi che entro la mezzanotte dovra'" +
                    " restituire gli articoli in scadenza attraverso la sezione 'Le tue prenotazioni' → 'Prenotazioni attuali'" +
                    " nella sua home personale. Allo scoccare della mezzanotte, in caso di mancata restituzione, dovra' recarsi nella" +
                    " sezione 'Prenotazioni passate' per concludere il noleggio.",
                    { appearance: "warning", autoDismiss : false})
            }
        }
    }, [alertRitardo]);

    //ATTUALI////////////////////////////////////////////////////////////////////////////////////////////////////
    const[nomiBarche, setNomiBarche]=useState([]);
    const[inizioA, setInizioA]=useState([]);
    const[fineA, setFineA]=useState([]);
    const[idA, setIdA]=useState([]);
    const[costoA, setCostoA]=useState([]);
    function attuali(inizio, fine, ids){
        let inizio1 = [], fine1 = [], ids1 = [], totale = [], nGiorni = []
        const format = "YYYY-MM-DD";
        let oggi = moment().format(format)
        //filtra le prenotazioni attuali per ogni id delle barche
        for(let i=0; i<ids.length; i++){
            if(JSON.stringify(inizio[i]).slice(1,11)===oggi || (inizio[i]<moment() && fine[i]>=moment()) || JSON.stringify(fine[i]).slice(1,11)===oggi){
                inizio1[inizio1.length]=JSON.stringify(inizio[i]).slice(1,11);
                fine1[fine1.length]=JSON.stringify(fine[i]).slice(1,11);
                ids1[ids1.length]=ids[i];
                nGiorni[i] = getDates(inizio[i], fine[i])
            }
        }
        //pulisco nGiorni dai valori null
        let filtered = nGiorni.filter(function (valore) {
            return valore != null;
        });
        //ricavo i nomi delle barche e setto gli state delle prenotazioni attuali
        Promise.all(
            ids1.map((idBarca) => Axios.post("http://localhost:3001/dropdown2", {
                    idBarca
                })
            )
        ).then((responses) => {
            let nomi = responses.map((response) => response.data[0].nome)
            let tariffe1 = responses.map((response) => response.data[0].tariffa)
            for(let u=0; u<tariffe1.length; u++) {
                totale[u]=tariffe1[u]*filtered[u].length;
            }
            setCostoA(totale)
            setNomiBarche(nomi)
            setInizioA(inizio1)
            setFineA(fine1)
            setIdA(ids1)
        });
    }
    //PASSATE////////////////////////////////////////////////////////////////////////////////////////////////////
    const[nomiP, setNomiP]=useState([]);
    const[inizioP, setInizioP]=useState([]);
    const[fineP, setFineP]=useState([]);
    const[idP, setIdP]=useState([]);
    const[costoP, setCostoP]=useState([]);
    function passate(inizio, fine, ids){
        let inizio1 = [], fine1 = [], ids1 = [], totale = [], nGiorni = []
        //filtra le prenotazioni passate per ogni id delle barche
        for(let i=0; i<ids.length; i++){
            if(fine[i]<moment().startOf('day')){
                inizio1[inizio1.length]=JSON.stringify(inizio[i]).slice(1,11);
                fine1[fine1.length]=JSON.stringify(fine[i]).slice(1,11);
                ids1[ids1.length]=ids[i];
                nGiorni[i] = getDates(inizio[i], fine[i])
            }
        }
        //pulisco nGiorni dai valori null
        let filtered = nGiorni.filter(function (valore) {
            return valore != null;
        });
        //ricavo i nomi delle barche e setto gli state delle prenotazioni passate
        Promise.all(
            ids1.map((idBarca) => Axios.post("http://localhost:3001/dropdown2", {
                    idBarca
                })
            )
        ).then((responses) => {
            let nomi = responses.map((response) => response.data[0].nome)
            let tariffe1 = responses.map((response) => response.data[0].tariffa)
            for(let u=0; u<tariffe1.length; u++) {
                totale[u]=tariffe1[u]*filtered[u].length;
            }
            setCostoP(totale)
            setNomiP(nomi)
            setInizioP(inizio1)
            setFineP(fine1)
            setIdP(ids1)
        });
    }
    //FUTURE////////////////////////////////////////////////////////////////////////////////////////////////////
    const[nomiF, setNomiF]=useState([]);
    const[inizioF, setInizioF]=useState([]);
    const[fineF, setFineF]=useState([]);
    const[idF, setIdF]=useState([]);
    const[costoF, setCostoF]=useState([]);
    function future(inizio, fine, ids) {
        let inizio1 = [], fine1 = [], ids1 = [], totale = [], nGiorni = []
        //filtra le prenotazioni future per ogni id delle barche
        for(let i=0; i<ids.length; i++){
            if(inizio[i]>moment().endOf('day')){
                inizio1[inizio1.length]=JSON.stringify(inizio[i]).slice(1,11);
                fine1[fine1.length]=JSON.stringify(fine[i]).slice(1,11);
                ids1[ids1.length]=ids[i];
                nGiorni[i] = getDates(inizio[i], fine[i])
            }
        }
        //pulisco nGiorni dai valori null
        let filtered = nGiorni.filter(function (valore) {
            return valore != null;
        });
        //ricavo i nomi delle barche e setto gli state delle prenotazioni future
        Promise.all(
            ids1.map((idBarca) => Axios.post("http://localhost:3001/dropdown2", {
                    idBarca
                })
            )
        ).then((responses) => {
            let nomi = responses.map((response) => response.data[0].nome)
            let tariffe1 = responses.map((response) => response.data[0].tariffa)
            for(let u=0; u<tariffe1.length; u++) {
                totale[u]=tariffe1[u]*filtered[u].length;
            }
            setCostoF(totale)
            setNomiF(nomi)
            setInizioF(inizio1)
            setFineF(fine1)
            setIdF(ids1)
        });
    }

    //da data inizio e fine, a range delle date
    function getDates(startDate, stopDate) {
        let dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    //converto le date del database in formato moment()
    function convert(response){
        for(let y = 0; y < response["data"].length; y++){
            let data= new Date(JSON.stringify(response["data"][y]).slice(9, 19))
            response["data"][y]["data"]= data.addDays(1);
        }
        return response;
    }

    //prendendo le prenotazioni dell'utente dal database, popolo inizio, fine e ids con date di inizio e di fine delle prenotazioni
    function getRange(response, inizio, fine, ids){
        let index=0;
        for(let u=0; u<response["data"].length; u++){
            //se e' la prima barca del response, setto subito la data di inizio
            if(u===0){
                inizio[index]=response["data"][u]["data"];
                ids[index]=response["data"][u]["idBarca"];
                //se il response e' costituito da solo un giorno, setto la fine allo stesso giorno di quella di inizio
                if(response["data"].length===1){
                    fine[index]=response["data"][u]["data"];
                }
            }
            //se e' l'ultimo giorno del response, setto la data di fine
            if(u===(response["data"].length-1)){
                fine[index]=response["data"][u]["data"];
            }
                //PRIMO CASO: se la prossima iterazione del response contiene un idbarca diverso da quello della iterazione attuale,
                // setto la data di fine e la data di inizio della prossima prenotazione.
                //SECONDO CASO(stessa barca, ma periodo diverso): se la prossima iterazione del giorno e' diversa dal giorno successivo dell'iterazione attuale,
            // e il giorno attuale non e' l'1 novembre(gestione del bug dell'1 novembre), setto la data di fine attuale e data inizio della prossima prenotazione.
            else if(response["data"][u]["idBarca"]!==response["data"][u+1]["idBarca"] ||
                (JSON.stringify(response["data"][u]["data"].addDays(1))!==JSON.stringify(response["data"][u+1]["data"]) &&
                    JSON.stringify(response["data"][u]["data"]).slice(1,11)!=="2021-11-01")){
                fine[index]=response["data"][u]["data"];
                inizio[index+1]=response["data"][u+1]["data"];
                ids[index+1]=response["data"][u+1]["idBarca"];
                index++;
            }
        }
        return response && inizio && fine && ids;
    }

    //funzione per aggiungere un giorno ad un giorno dato in input
    Date.prototype.addDays = function(days) {
        /*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
        let dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    //per modificare la data da moment a semplice stringa
    function convertDate(d){
        let parts = d.toString().split(" ");
        const months = {
            Jan: "01",            Feb: "02",            Mar: "03",            Apr: "04",
            May: "05",            Jun: "06",            Jul: "07",            Aug: "08",
            Sep: "09",            Oct: "10",            Nov: "11",            Dec: "12"
        };
        return parts[3]+"-"+months[parts[1]]+"-"+parts[2];
    }

    //per aprire BoatModal
    const toggleModalBoat = (card) => {
        setDatiModale(card);
        setShowBoat(!showBoat);
    };

    const [showBoat, setShowBoat] = useState(false); //state per apertura e chiusura BoatModal
    const [showCancella, setShowCancella] = useState(false); //state per apertura e chiusura CancellaModal
    const [showModifica, setShowModifica] =useState(false); //state per apertura e chiusura ModificaModal

    //per onHide di BoatModal
    const chiudiModaleBoat = () => {
        setShowBoat(!showBoat);
        setDisable(true);
    };

    //per onHide CancellaModal
    const chiudiModaleCancella = () => {
        setShowCancella(!showCancella);
    };

    const [periodo, setPeriodo] =useState([]); //state che contiene il periodo di date da modificare nel ModificaModal
    const[idModifica, setIdModifica] =useState(""); //state per id della barca per ModificaModal

    //funzione per aprire il ModificaModal e settare le informazioni relative alla modifica
    const apriModaleModifica = (inizio, fine, id, nomi) => {
        setShowModifica(!showModifica);
        let date1=getDates(moment(inizio), moment(fine));
        for (let i = 0; i < date1.length; i ++ ) {
            date1[i]=convertDate(date1[i]);
        }
        setPeriodo(date1);
        setPrima(inizio);
        setSeconda(fine);
        setIdModifica(id);
        setNomeBarca(nomi);
    };

    const[diff, setDiff]=useState(); //state per la differenza di prezzo tra le prenotazioni
    const[disabled, setDisable] = useState(true); //state per settare il warning della selezione della data prima della conferma

    //funzioni per settare gli state dichiarati sopra
    function setDifff(num){
        setDiff(num);
    }
    function setDisablee(boool){
        setDisable(boool);
    }

    //funzione per onHide ModificaModal
    const chiudiModaleModifica = () => {
        setBottoni(false);
        setDiff(null);
        setDisable(true);
        setShowModifica(!showModifica);
    }

    //state per periodo di inizio e fine
    const[prima, setPrima]=useState("");
    const[seconda, setSeconda]=useState("");

    const[idC, setIdC]=useState(""); //state per id barca per il CancellaModal
    const[nomeBarca, setNomeBarca]=useState(""); //state per nome barca ModificaModal e CancellaModal

    //funzione per aprire CancellaModal e settare gli state ad esso associati
    const apriModaleCancella = (inizio, fine, id, nomi) => {
        setShowCancella(!showCancella);
        setPrima(inizio);
        setSeconda(fine);
        setIdC(id);
        setNomeBarca(nomi);
    };

    //per settare il bottone del modifica prenotazione
    const[bottoni, setBottoni]=useState(false);
    function setBottonii(boool){
        setBottoni(boool);
    }

    //funzione per aggiungere una prenotazione al carrello
    function aggiungi(tot, date){
        datiModale["tot"]=tot;
        datiModale["date"]=date;
        datiModale["inizio"]=date[0];
        datiModale["fine"]=date[date.length-1];
        carrello.push({ value: datiModale });
        setCarrello(carrello);
    }

    //funzione che restituisce un NavDropdown.Divider secondo certe condizioni
    function Separatore(tipo, nome, inizio){
        if(tipo==="attuali"){
            if(nomiBarche[nomiBarche.length-1]===nome && inizioA[inizioA.length-1]===inizio){
                return null;
            } else{
                return <NavDropdown.Divider/>
            }
        } else if(tipo==="passate"){
            if(nomiP[nomiP.length-1]===nome && fineP[fineP.length-1]===inizio){
                return null;
            } else{
                return <NavDropdown.Divider/>
            }
        } else{
            if(nomiF[nomiF.length-1]===nome && inizioF[inizioF.length-1]===inizio){
                return null;
            } else{
                return <NavDropdown.Divider/>
            }
        }
    }

    //states per informazioni associate al RestituisciModal, e per aprirlo e chiuderlo
    const[idR, setIdR]=useState();
    const[inizioR, setIninzioR]=useState();
    const[fineR, setFineR]=useState();
    const[nomeR, setNomeR]=useState(".");
    const[showR, setShowR]=useState(false);

    //funzione per aprire il RestituisciModal e settarne gli states associati
    function modaleRestituisci(inizioA, fineA, idA, nomi){
        setIdR(idA);
        setIninzioR(inizioA);
        setFineR(fineA);
        setNomeR(nomi);
        setShowR(true);
    }

    const[check, setCheck]=useState(false); //state per controlli nel RestituisciModal

    //per onHide RestituisciModal
    function chiudiModaleR(){
        setShowR(false);
    }

    //per aprire e chiudere il PagamentoModal dal RestituisciModal
    const [showP, setShowP] =useState(false);
    const chiudiPagamento = () => {
        setShowP(!showP);
    }

    return (
        <Container fluid id="body">
            <Row>
                <Col>
                    <NavbarUtente setCarrello={setCarrello} carrello={carrello}/>
                </Col>
            </Row>
            <Row>
                <Col> <p id="testoNoleggio"> Seleziona la categoria e prenota subito! </p> </Col>
            </Row>
            <Row>
                <Col>
                    <CaroselloCards
                        cards={cards}
                        toggleModalBoat={toggleModalBoat}
                        setCards={setCards}
                        patente={patente}
                    />
                </Col>
            </Row>
            <Row>
                <Col> <p id="testoNoleggio1"> Le tue prenotazioni </p> </Col>
            </Row>
            <Row>
                <Col>
                    <Accordion>
                        <Card className="accordionCard">
                            <Card.Header id="accordionLink" >
                                <Accordion.Toggle id="titoloP" className="accordionLink" as={Button} variant="link" eventKey="0">
                                    Prenotazioni attuali
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="accordionLink">
                                    {nomiBarche.length>0 ? nomiBarche.map((nomi, index) => (
                                        <div key={index}>
                                            <span className="menu-itemP" style={{ textDecoration: 'none' }}>
                                                <b>{nomi.substring(0,12)}</b>
                                            </span>
                                            <small>{Math.floor(costoA[index]*100)/100} €</small>
                                            <Button className="restituisci" onClick={() => modaleRestituisci(inizioA[index], fineA[index], idA[index], nomi)}><span>Restituisci</span></Button>
                                            <br/>
                                            <small className="dateAccordion">Dal:{inizioA[index]}</small>  <small className="dateAccordion2">Al:{fineA[index]}</small>
                                            <div>{Separatore("attuali", nomi, inizioA[index])}</div>
                                        </div>
                                    )) : <span>Non ci sono noleggi in corso!</span>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordionCard">
                            <Card.Header className="accordionLink">
                                <Accordion.Toggle id="titoloP" className="accordionLink" as={Button} variant="link" eventKey="1">
                                    Prenotazioni passate
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body className="accordionLink">
                                    {nomiP.length>0 ? nomiP.map((nomi, index) => (
                                        <div key={index}>
                                            <span className="menu-itemP" style={{ textDecoration: 'none' }}>
                                               <b>{nomi.substring(0,12)}</b>
                                            </span>
                                            <small>{Math.floor(costoP[index]*100)/100} €</small>
                                            <Button className="restituisci" onClick={() => modaleRestituisci(inizioP[index], fineP[index], idP[index], nomi)}><span>Restituisci</span></Button>
                                            <br/>
                                            <small className="dateAccordion">Dal:{inizioP[index]}</small>  <small className="dateAccordion2">Al:{fineP[index]}</small>
                                            <div>{Separatore("passate", nomi, fineP[index])}</div>
                                        </div>
                                    )) : <span>Non ci sono noleggi passati!</span>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordionCard">
                            <Card.Header className="accordionLink">
                                <Accordion.Toggle id="titoloP" className="accordionLink" as={Button} variant="link" eventKey="2">
                                    Prenotazioni future
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body className="accordionLink">
                                    {nomiF.length>0 ? nomiF.map((nomi, index) => (
                                        <div key={index}>
                                            <span className="menu-itemP" style={{ textDecoration: 'none' }}>
                                                <b>{nomi.substring(0,12)}</b>
                                            </span>
                                            <small>{Math.floor(costoF[index]*100)/100} €</small>
                                            <Button className="canc" onClick={() => apriModaleModifica(inizioF[index], fineF[index], idF[index], nomi)}><span>Modifica</span></Button>
                                            <br/>
                                            {inizioF[index] !== null && fineF[index] !== null ? <small className="dateAccordion">Dal:{inizioF[index]}</small> : null}
                                            {inizioF[index] !== null && fineF[index] !== null ? <small className="dateAccordion2">Al:{fineF[index]}</small> : null}
                                            <Button className="canc" onClick={() => apriModaleCancella(inizioF[index], fineF[index], idF[index], nomi)}><span>Cancella</span></Button>
                                            <div>{Separatore("future", nomi, inizioF[index])}</div>
                                        </div>
                                    )) : <span>Non ci sono noleggi futuri!</span>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            </Row>
            <Row>
                <Col>
                    <footer id="footer" className="text-center text-white align-bottom" >
                        <a className="btn btn-outline-light btn-floating m-1" id="copyright" href={"#body"} role="button">© 2021 Copyright: <b>NoloBoats</b></a>
                        <a className="btn btn-outline-light btn-floating m-1" id="tornaSu" href={"#body"} role="button"><Up/></a>
                    </footer>
                </Col>
            </Row>
            <div>
                <BoatModal show={showBoat}
                           onHide={chiudiModaleBoat}
                           datiModale={datiModale}
                           setCarrello={setCarrello}
                           carrello={carrello}
                           aggiungi={aggiungi}
                           convertDate={convertDate}
                           setDisable={setDisablee}
                           disabled={disabled}
                />
            </div>
            <div>
                <CancellaModal show={showCancella}
                               onHide={chiudiModaleCancella}
                               inizio={prima}
                               fine={seconda}
                               id={idC}
                               idF={idF}
                               inizioF={inizioF}
                               fineF={fineF}
                               nomee={nomeBarca}
                               nomiF={nomiF}
                               attuali={attuali}
                               passate={passate}
                               future={future}
                               convert={convert}
                               getRange={getRange}
                               convertDate={convertDate}
                />
            </div>
            <div>
                <ModificaModal show={showModifica}
                               onHide={chiudiModaleModifica}
                               inizio={prima}
                               fine={seconda}
                               id={idModifica}
                               nomee={nomeBarca}
                               inizioF={inizioF}
                               fineF={fineF}
                               periodo={periodo}
                               convertDate={convertDate}
                               setDiff={setDifff}
                               diff={diff}
                               setDisable={setDisablee}
                               disabled={disabled}
                               carrello={carrello}
                               setBottoni={setBottonii}
                               bottoni={bottoni}
                               attuali={attuali}
                               passate={passate}
                               future={future}
                               convert={convert}
                               getRange={getRange}
                               idUtente={localStorage.getItem("idUser")}
                               admin={false}
                />
            </div>
            <div>
                <RestituisciModal show={showR}
                                    onHide={chiudiModaleR}
                                    inizio={inizioR}
                                    fine={fineR}
                                    id={idR}
                                    nome={nomeR}
                                  check={check}
                                  setCheck={setCheck}
                                  showP={showP}
                                  setShowP={setShowP}
                                  chiudiPagamento={chiudiPagamento}
                />
            </div>
        </Container>
    );
}