import "../../css/admin/bookings.css"
import React, {useEffect, useState} from 'react';
import {Col, Container, NavDropdown, Row} from "react-bootstrap";
import Axios from "axios";
import Accordion from 'react-bootstrap/Accordion';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import moment from "moment";
import ModificaModal from "../homeUtente/ModificaModal";
import RestituisciModalAdmin from "./RestituisciModalAdmin";

export default function PrenotazioniAdminGetter(props) {

    const[noResp, setNoResp] = useState(false) //per gestire la possibilita' che l'utente non abbia prenotazioni

    //useffect principale, recupera le prenotazioni relative ad un utente.
    //filtra le prenotazioni tra attuali, passate e future.
    useEffect(() => {
        Axios.post("http://localhost:3001/dropdown", {
            idUtente: props.id,
        }).then((response) => {
            if(response.data.message==="ERR") {
                console.log("error")
                setNoResp(true)
            } else{
                setNoResp(false)
                convert(response);
                let inizio=[];
                let fine=[];
                let ids=[];
                getRange(response, inizio, fine, ids);
                attuali(inizio, fine, ids, response)
                passate(inizio, fine, ids, response)
                future(inizio, fine, ids, response)
            }
        });
    }, [props.id]);
    //ATTUALI////////////////////////////////////////////////////////////////////////////////////////////////////
    const[nomiBarche, setNomiBarche]=useState([]);
    const[inizioA, setInizioA]=useState([]);
    const[fineA, setFineA]=useState([]);
    const[costoA, setCostoA]=useState([]);
    function attuali(inizio, fine, ids, response){
        let nGiorni=[],inizio1 = [], fine1 = [], ids1 = [], nomi = [], totale = []
        const format = "YYYY-MM-DD"
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
        setAttuali(ids1, nomi,response, inizio1, fine1, filtered, totale);
    }
    //ricavo i nomi delle barche e setto gli state delle prenotazioni attuali
    function setAttuali(ids1, nomi, response, inizio1, fine1, filtered, totale) {
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
    const[costoP, setCostoP]=useState([]);
    function passate(inizio, fine, ids, response){
        let inizio1 = [], fine1 = [], ids1 = [], nomi = [], totale = [], nGiorni = []
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
        setPassate(ids1, nomi, response, inizio1, fine1,filtered, totale);
    }
    //ricavo i nomi delle barche e setto gli state delle prenotazioni passate
    function setPassate(ids1, nomi, response, inizio1, fine1, filtered, totale){
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
            setIdP(ids1);
        });
    }
    //FUTURE////////////////////////////////////////////////////////////////////////////////////////////////////
    const[nomiF, setNomiF]=useState([]);
    const[inizioF, setInizioF]=useState([]);
    const[fineF, setFineF]=useState([]);
    const[costoF, setCostoF]=useState([]);
    const[idA, setIdA]=useState([]);
    function future(inizio, fine, ids, response) {
        let inizio1 = [], fine1 = [], ids1 = [], nomi = [], totale = [], nGiorni = []
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
        getNomiFuturi(ids1, nomi, response, inizio1, fine1, filtered, totale);
    }
    //ricavo i nomi delle barche e setto gli state delle prenotazioni future
    function getNomiFuturi(ids1, nomi, response, inizio1, fine1, filtered, totale){
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
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////

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

    //states per il modale di modifica prenotazione
    const [showModifica, setShowModifica] =useState(false);
    const[prima, setPrima]=useState("");
    const[seconda, setSeconda]=useState("");
    const[idModifica, setIdModifica]=useState("");
    const[nomeModifica, setNomeModifica]=useState("");
    const [periodo, setPeriodo] =useState([]);
    const [carrello, setCarrello] = useState([]);
    const[bottoniModifica, setBottoniModifica]=useState(false);

    //id delle prenotazioni passate
    const[idP, setIdP]=useState([]);

    //per settare il bottone del modifica prenotazione
    function setBottonii(boool){
        setBottoniModifica(boool);
    }

    //onHide del modale modifica prenotazione
    const chiudiModaleModifica = () => {
        setBottoniModifica(false);
        setDiff(null);
        setDisable(true);
        setShowModifica(!showModifica);
    }

    //per aprire il modale modifica prenotazione
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
        setNomeModifica(nomi);
    };

    //state per la differenza di prezzo tra le prenotazioni(inutile lato admin)
    const[diff, setDiff]=useState()
    //state per settare il warning della selezione della data prima della conferma
    const[disabled, setDisable] = useState(true);

    //funzioni per settare gli state dichiarati sopra
    function setDifff(num){
        setDiff(num);
    }
    function setDisablee(boool){
        setDisable(boool);
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
            if(nomiP[nomiP.length-1]===nome && inizioP[inizioP.length-1]===inizio){
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

    //states per il modale restituzioni
    const[idR, setIdR]=useState();
    const[inizioR, setIninzioR]=useState();
    const[fineR, setFineR]=useState();
    const[nomeR, setNomeR]=useState();
    const[showR, setShowR]=useState(false);

    //funzione per aprire il modale restituzione
    function modaleRestituisci(inizioA, fineA, idA, nomi){
        setIdR(idA);
        setIninzioR(inizioA);
        setFineR(fineA);
        setNomeR(nomi);
        setShowR(!showR);
    }

    //states per settare le prenotazioni a restituita/ non restituita/in ritardo
    const[check, setCheck]=useState(false);
    const[check1, setCheck1]=useState(false);

    //funzione onHide del modale restituzione
    function chiudiModaleR(){
        setShowR(!showR);
        setCheck(false);
        setCheck1(false);
    }

    return (
        <Container fluid id="body">
            <Row>
                <Col>
                    {noResp===false ?<Accordion>
                        <Card className="accordionCard1">
                            <Card.Header id="accordionLink1" >
                                <Accordion.Toggle id="titoloP1" className="accordionLink" as={Button} variant="link" eventKey="0">
                                    Prenotazioni attuali
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="accordionLink1">
                                    {/*controllo su array barche attuali*/}
                                    {nomiBarche.length>0 ? nomiBarche.map((nomi, index) => (
                                        <div key={index}>
                                            <span className="menu-itemP" style={{ textDecoration: 'none' }}>
                                                <b>{nomi}</b>
                                            </span>
                                            <Button className="canc" onClick={() => apriModaleModifica(inizioA[index], fineA[index], idA[index], nomi)}><span>Modifica</span></Button>
                                            <Button className="canc" onClick={() => modaleRestituisci(inizioA[index], fineA[index], idA[index], nomi)}><span>Restituzione</span></Button>
                                            <small>{Math.floor(costoA[index]*100)/100} €</small>
                                            <br/>
                                            &nbsp;&nbsp;Dal: <small>{inizioA[index]}</small> Al: <small>{fineA[index]}</small>
                                            <div>{Separatore("attuali", nomi, inizioA[index])}</div>
                                        </div>
                                    )) : <span>Non ci sono noleggi in corso!</span>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordionCard1">
                            <Card.Header className="accordionLink1">
                                <Accordion.Toggle id="titoloP" className="accordionLink" as={Button} variant="link" eventKey="1">
                                    Prenotazioni passate
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body className="accordionLink1">
                                    {/*controllo su array barche passate*/}
                                    {nomiP.length>0 ? nomiP.map((nomi, index) => (
                                        <div key={index}>
                                            <span className="menu-itemP" style={{ textDecoration: 'none' }}>
                                                <b>{nomi}</b>
                                            </span>
                                            <Button className="canc" onClick={() => modaleRestituisci(inizioP[index], fineP[index], idP[index], nomi)}><span>Restituzione</span></Button>
                                            <small>{Math.floor(costoP[index]*100)/100} €</small>
                                            <br/>
                                            &nbsp;&nbsp;Dal: <small>{inizioP[index]}</small> Al: <small>{fineP[index]}</small>
                                            <div>{Separatore("passate", nomi, inizioP[index])}</div>
                                        </div>
                                    )) : <span>Non ci sono noleggi passati!</span>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card className="accordionCard1">
                            <Card.Header className="accordionLink1">
                                <Accordion.Toggle id="titoloP" className="accordionLink" as={Button} variant="link" eventKey="2">
                                    Prenotazioni future
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body className="accordionLink1">
                                    {/*controllo su array barche future*/}
                                    {nomiF.length>0 ? nomiF.map((nomi, index) => (
                                        <div key={index}>
                                            <span className="menu-itemP" style={{ textDecoration: 'none' }}>
                                                <b>{nomi}</b>
                                            </span>
                                            <small>{Math.floor(costoF[index]*100)/100} €</small>
                                            <br/>
                                            &nbsp;&nbsp;Dal: <small>{inizioF[index]}</small> Al: <small>{fineF[index]}</small>
                                            <div>{Separatore("future", nomi, inizioF[index])}</div>
                                        </div>
                                    )) : <span>Non ci sono noleggi futuri!</span>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion> : <h5> Nessuna prenotazione associata a questo utente! </h5>}
                </Col>
            </Row>
            <div>
                <ModificaModal show={showModifica}
                               onHide={chiudiModaleModifica}
                               inizio={prima}
                               fine={seconda}
                               id={idModifica}
                               nomee={nomeModifica}
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
                               bottoni={bottoniModifica}
                               attuali={attuali}
                               passate={passate}
                               future={future}
                               convert={convert}
                               getRange={getRange}
                               idUtente={props.id}
                               admin={true}
                />
            </div>
            <div>
                <RestituisciModalAdmin show={showR}
                                  onHide={chiudiModaleR}
                                  inizio={inizioR}
                                  fine={fineR}
                                  id={idR}
                                  nome={nomeR}
                                  idUtente={props.id}
                                   check={check}
                                   check1={check1}
                                   setCheck={setCheck}
                                   setCheck1={setCheck1}
                />
            </div>
        </Container>
    );
}