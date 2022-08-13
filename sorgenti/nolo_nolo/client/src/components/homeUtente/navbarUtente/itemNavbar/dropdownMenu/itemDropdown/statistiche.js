import {CSSTransition} from "react-transition-group";
import {ReactComponent as ArrowIcon} from "../../../icons/arrow.svg";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {NavDropdown} from "react-bootstrap";

export default function Statistiche(props) {

    //state necessari per la zona statistiche del menu
    const[nprenotazioni, setNprenotazioni]=useState("");
    const[nomeBarca,setNomeBarca]=useState("");
    const[userN, setUserN]=useState("");
    const[nome, setNome]=useState("");
    const[cognome, setCognome]=useState("");

    //state per visualizzare/non visualizzare le statistiche, a seconda sia troppo presto/tardi
    const[ERR, setERR]=useState(false);


    //useEffect per settare la barca piu prenotata e l'utente piu prenotato
    useEffect(() => {
        Axios.get("http://localhost:3001/barcaStat").then((response) => {
            if(response.data.message==="ERR"){
                setERR(true)
            } else{
                setNprenotazioni(response["data"][0]["value_occurrence"])
                nomeBarcaFunzione(response["data"][0]["idBarca"]);
            }
        })
        Axios.get("http://localhost:3001/utenteStat").then((response) => {
            if(response.data.message==="ERR"){
                setERR(true)
            } else{
                setUserN(response["data"][0]["value_occurrence"])
                nomeCognome(response["data"][0]["idUser"]);
            }
        })
    }, []);

    //funzione per estrarre i nomi delle barche
    function nomeBarcaFunzione(id){
        Axios.post("http://localhost:3001/dropdown2", {
            idBarca: id,
        }).then((res) => {
            if(res.data.message==="ERR"){
                setERR(true)
            } else{
                setNomeBarca(res["data"][0]["nome"]);
            }
        });
    }

    //funzione per estrarre nome e cognome dell'utente
    function nomeCognome(id){
        Axios.post("http://localhost:3001/nomeCognome", {
            idUser: id,
        }).then((response) => {
            if(response.data.message==="ERR"){
                setERR(true)
            } else{
                setNome(response["data"][0]["nome"])
                setCognome(response["data"][0]["cognome"]);
            }
        })
    }

    return (
        <CSSTransition
            in={props.activeMenu === 'stats'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={props.calcHeight}>
            <div className="menu">
                <props.ItemDropdown goToMenu="main" leftIcon={<ArrowIcon/>}>
                    <h5 id="statisticheTitolo">Statistiche di NoloBoats</h5>
                </props.ItemDropdown>
                {!ERR ? <div align="center">
                    <div>
                        <b>La barca piu' prenotata:</b>
                        <div align="center"><h6>{nomeBarca}</h6></div>
                        <span>Con {nprenotazioni} giorni prenotati.</span>
                    </div>
                    <NavDropdown.Divider />
                    <div>
                        <b>L'utente piu' attivo:</b><br/>
                        <span><h6>{nome} {cognome}</h6> Ha prenotato barche per {userN} giorni.</span>
                    </div>
                </div> : <div align="center"><span>E' ancora troppo presto per effettuare delle statistiche!</span></div>}
            </div>
        </CSSTransition>
    )
}