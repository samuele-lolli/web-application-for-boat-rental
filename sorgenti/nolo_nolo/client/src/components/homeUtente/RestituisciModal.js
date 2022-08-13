import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import "../../css/home/modali.css"
import Button from "react-bootstrap/Button";
import Axios from "axios";
import {useToasts} from "react-toast-notifications";
import moment from "moment";
import PagamentoModal from "./PagamentoModal";
import {Alert} from "@material-ui/lab";

function RestituisciModal(props){

    const { addToast } = useToasts();
    const idUtente=localStorage.getItem("idUser");

    const[differenza, setDifferenza]=useState(); //state per penale da pagare

    //funzione per restituire una barca, con controllo per restituzioni in ritardo
    function restituisci(){
        if(moment(props.fine).isBefore(moment().startOf('day'))){
            props.chiudiPagamento();
        } else{
            Axios.post("http://localhost:3001/restituisci", {
                idBarca: props.id,
                inizio: props.inizio,
                fine: props.fine,
                idUtente: idUtente,
            }).then((response) => {
                if(response){
                    addToast(props.nome+" restituita con successo.",
                        { appearance: "success"});
                    props.onHide();
                } else{
                    console.log("ERRORE RESTITUZIONE")
                }
            });
        }
    }

    //funzione per restituire una barca dopo aver pagato la penale
    function restituisciP(){
        Axios.post("http://localhost:3001/restituisci", {
            idBarca: props.id,
            inizio: props.inizio,
            fine: props.fine,
            idUtente: idUtente,
        }).then((response) => {
            if(response){
                addToast(props.nome+" restituita con successo.",
                    { appearance: "success"});
                props.onHide();
            } else{
                console.log("ERRORE RESTITUZIONE")
            }
        });
    }

    //useffect per verificare la restituzione della barca
    useEffect(() => {
        Axios.post("http://localhost:3001/controllaRestituzione", {
            idBarca: props.id,
            inizio: props.inizio,
            fine: props.fine,
            idUtente: idUtente,
        }).then((response) => {
            if(response.data.message==="ERR"){
                props.setCheck(false);
            } else{
                props.setCheck(true);
            }
        });
        setDifferenza(moment().startOf('day').diff(moment(props.fine), 'days'));
    }, [props.onHide]);

    const[luogo, setLuogo]=useState("");
    //useffect per settare il luogo di restituzione
    useEffect(() => {
        Axios.post("http://localhost:3001/luogoRestituzione", {
            idBarca: props.id,
        }).then((response) => {
            if(response.data.message==="ERR"){
                console.log("luogo di restituzione non trovato!")
            } else{
                setLuogo(response["data"][0]["luogo"]);
            }
        });
    }, [props.show]);

    //funzione che in caso ci sia da pagare una penale fa notare al cliente la multa
    function Attenzione(){
        if(props.check===false && differenza<=0){
            return null;
        }
        if(props.check===true && differenza<=0){
            return null;
        }
        if(props.check===false && differenza>0){
            return <div id="multaa"><Alert severity="error">Restituzione in ritardo di <b>{differenza} giorni</b>.
                Dovra' versare una penale pari a <b>{differenza*150},00€</b>.</Alert></div>;
        }
        if(props.check===true && differenza>0){
            return null;
        }
    }

    return (
        <>
            <Modal className="my-modal" show={props.show} onHide={props.onHide} dialogClassName="modal-sm modal-full" centered>
                <Modal.Body>
                    <Modal.Header>
                        <Modal.Title id="cancella">
                            {props.check===true ?
                                <div>Ha gia' restituito questa barca al Porto di {luogo}.</div>
                                :
                                <div>E' sicuro di voler restituire {props.nome}?</div>}
                        </Modal.Title>
                        <button type="button" className="close" onClick={props.onHide}>×</button>
                    </Modal.Header>
                    <div><Attenzione/></div>
                    {props.check===true ? null : <div align="center"><br/><span id="restituz">Luogo di restituzione: <b>Porto di {luogo}.</b></span><br/><br/></div>}
                    <div className="canc2" align="center">
                        <Button className="canc1" disabled={props.check===false ? "" : "disabled"} onClick={restituisci}><span>Conferma</span></Button>&nbsp;&nbsp;
                        <Button className="canc1" onClick={props.onHide}><span>Annulla</span></Button>
                    </div>

                </Modal.Body>

            </Modal>
            <div>
                <PagamentoModal show={props.showP}
                                onHide={props.chiudiPagamento}
                                prenota={restituisciP}
                                differenza={differenza}
                />
            </div>
        </>
    )
}
export default RestituisciModal