import React from 'react';
import {Modal} from 'react-bootstrap';
import "../../css/home/modali.css";
import Button from "react-bootstrap/Button";

function SicuroModal(props){

    //funzione che chiude il sicuro modal e il modifica modal
    function chiudiTutto(){
        props.onHide();
        props.onHideTutto();
    }

    return (
        <Modal className="my-modal" show={props.show} onHide={props.onHide} dialogClassName="modal-sm modal-full" centered>
            <Modal.Body>
                <div className="p-3">
                    <Modal.Header>
                        <h5 >
                            La prenotazione e' gia' stata annullata, e' sicuro di non voler selezionare un nuovo periodo?
                            <br/>
                        </h5>
                        </Modal.Header>
                    <div className="canc2" align="center">
                        <Button className="canc1" onClick={chiudiTutto}><span>Conferma</span></Button>&nbsp;&nbsp;
                        <Button className="canc1" onClick={props.onHide}><span>Annulla</span></Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default SicuroModal