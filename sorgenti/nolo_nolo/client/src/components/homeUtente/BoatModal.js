import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import "../../css/home/modali.css";
import {useToasts} from "react-toast-notifications";
import {ReactComponent as Cart} from "./navbarUtente/icons/cart.svg";
import Calendario from "./Calendario"
import Axios from "axios";

function BoatModal(props){

    const { addToast } = useToasts();

    //states per disponibilita' barca, totale prenotazione e date prenotate
    const[disp, setDisp]=useState();
    const[tot, setTot]=useState();
    const[date,setDate]=useState([]);

    //useffect per verificare la disponibilita' della barca selezionata
    useEffect(() => {
        Axios.post("http://localhost:3001/disponibilita", {
            idBarca: props.datiModale["id"],
        }).then((response) => {
            if(!response.data.message){
                for(let y = 0; y < response["data"].length; y++){
                    let data= new Date(JSON.stringify(response["data"][y]).slice(9, 19))
                    response["data"][y]= data.addDays(1);
                    response["data"][y]= props.convertDate(response["data"][y]);
                }
                setDisp(response);
            }
        });
    },[props.datiModale, props.convertDate]);

    //funzione che ritorna html per patente barca
    function Patente() {
        if (props.datiModale["patente"] === 1) {
            return <span className="descrizione"> Per poter navigare con questa barca è necessario possedere la patente nautica. </span>
        } else if(props.datiModale["patente"] === 0){
            return <span className="descrizione"> Per poter navigare con questa barca NON è necessario possedere la patente nautica. </span>
        } else{
            return null;
        }
    }

    //per settare il totale della prenotazione e le date selezionate
    function settaTot(numero, array){
        setTot(numero);
        setDate(array);
    }

    //funzione per aggiungere al carrello la barca selezionata
    function addCarrello(){
        let flag=false;
        for(let i=0; i<props.carrello.length;i++){
            if(props.carrello[i].value["nome"] === props.datiModale["nome"]){
                flag=true
            }
        }
        if(flag===true){
            addToast('Hai già una prenotazione nel carrello con questa barca, effettua prima il ' +
                'pagamento per poter fare un ulteriore prenotazione con questo mezzo!', {appearance: 'info'})
        } else {
            console.log(flag)
            props.aggiungi(tot, date);
            localStorage.setItem("cart", JSON.stringify(props.carrello))
            addToast('Aggiunto al carrello!', {appearance: 'success'})
            props.onHide();
        }
    }

    //avviso
    function attento(){
        addToast('Prima seleziona il periodo di noleggio!', { appearance: 'warning'})
    }

    //funzioni per attivare o disattivare il bottone 'aggiungi al carrello'
    function attiva(){
        props.setDisable(false);
    }
    function disattiva(){
        props.setDisable(true);
    }

    return (
        <Modal className="my-modal" show={props.show} onHide={props.onHide} dialogClassName="modal-m modal-full" centered>
            <div className="p-4">
                <Modal.Header>
                    <Modal.Title >
                        {props.datiModale["nome"]}
                    </Modal.Title>
                    <button type="button" className="close" onClick={props.onHide}>×</button>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.datiModale["descrizione"]}</p>
                    {props.datiModale["metratura"] && <Modal.Body><span className="descrizione"> Lunghezza: </span>{props.datiModale["metratura"]}m</Modal.Body>}
                    {props.datiModale["cavalli"] && <Modal.Body> <span className="descrizione"> Cavalli: </span> {props.datiModale["cavalli"]}cv </Modal.Body>}
                    {props.datiModale["posti"] && <Modal.Body><span className="descrizione"> Capacita': </span>{props.datiModale["posti"]} persone</Modal.Body>}
                    <Modal.Body><span className="descrizione"> Locazione: </span>{props.datiModale["luogo"]}</Modal.Body>
                    <p><span className="descrizione"> Stato e Condizioni: </span>{props.datiModale["stato"]}</p>
                    <p> <Patente/> </p>
                    <p><span className="descrizione"> Tariffa giornaliera: </span>{props.datiModale["tariffa"]} €</p>
                </Modal.Body>
                <Modal.Header>
                    <h6 id="barcabottoneScritta">Seleziona il periodo:</h6>
                    <Calendario
                        idBarca={props.datiModale["id"]}
                        disp={disp}
                        convertDate={props.convertDate}
                        attiva={attiva}
                        settaTot={settaTot}
                        disattiva={disattiva}
                        carrello={props.carrello}
                    />
                </Modal.Header>
                <div onClick={(props.disabled)? attento : addCarrello}>
                    <span className="menu-itemBarca" style={{ textDecoration: 'none' }}>
                        <span className="icon-button">{<Cart />}</span>
                        <h6 id="barcabottoneScritta">Aggiungi al carrello</h6>
                    </span>
                </div>
            </div>
            <img
                src={props.datiModale["immagine"]}
                alt="display"
                id="fotoBarca"
            />
        </Modal>
    )
}
export default BoatModal