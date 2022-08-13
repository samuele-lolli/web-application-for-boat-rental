import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import "../../css/home/modali.css";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import {useToasts} from "react-toast-notifications";

function RestituisciModalAdmin(props){

    const { addToast } = useToasts();

    //funzione per accettare la restituzione di una barca
    function restituisci(){
        Axios.post("http://localhost:3001/restituisciUpdate", {
            idBarca: props.id,
            inizio: props.inizio,
            fine: props.fine,
            idUtente: props.idUtente,
        }).then((response) => {
            if(response){
                addToast(props.nome+" restituita!",
                    { appearance: "success"});
            } else{
                console.log("ERRORE RESTITUZIONE")
            }
        });
        props.onHide();
    }

    //useffect per controllare se una prenotazione e' restituita/non restituita/in ritardo
    useEffect(() => {
        Axios.post("http://localhost:3001/controllaRestituzione", {
            idBarca: props.id,
            inizio: props.inizio,
            fine: props.fine,
            idUtente: props.idUtente,
        }).then((response) => {
            if(response.data.message==="ERR"){
                props.setCheck(false); //barca ancora da restituire entrambi i lati
                props.setCheck1(false); //barca ancora da restituire entrambi i lati
            } else{
                props.setCheck(true); //barca restituita, ma ancora da accettare la restituzione lato admin
                if(response["data"][0]["restituito"]===0){
                    props.setCheck1(false); //ancora da accettare la restituzione lato admin
                } else{
                    props.setCheck1(true); //barca restituita e accettata dall'admin
                }
            }
        });
    }, [props.show]);

    return (
        <Modal className="my-modal" show={props.show} onHide={props.onHide} dialogClassName="modal-sm modal-full" centered>
            <Modal.Body>
                <Modal.Header>
                    <Modal.Title id="cancella">
                        <div>
                            E' sicuro di voler accettare la restituzione di {props.nome}?
                        </div>
                    </Modal.Title>
                    <button type="button" className="close" onClick={props.onHide}>×</button>
                </Modal.Header>
                {props.check1===false ? null : <div align="center"><span id="restituz">Hai gia' accettato la restituzione di questa barca!</span></div>}
                <div className="canc2" align="center">
                    {props.check===false ?
                        <Button className="canc1" disabled="disabled"><span>Aspetta la restituzione!</span></Button>
                        :
                        <Button className="canc1" disabled={props.check1===false ? "" : "disabled"} onClick={restituisci}><span>Accetta</span></Button>}
                    <Button className="canc1" onClick={props.onHide}><span>Annulla</span></Button>
                </div>

            </Modal.Body>
        </Modal>
    )
}
export default RestituisciModalAdmin