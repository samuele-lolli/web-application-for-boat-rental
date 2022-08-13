import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import "../../css/home/modali.css";
import Form from "react-bootstrap/Form";
import MaskInput from "react-maskinput";
import {useToasts} from "react-toast-notifications";

function PagamentoModal(props){

    //states per il pagamento
    const [expiry, setExpiry] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [cvc, setCvc] = useState(null);

    const { addToast } = useToasts();

    //funzione che verifica che le info date siano corrette e in caso positivo procede alla prenotazione
    function paymentDone(e){
        e.preventDefault();
        let todayMonth = new Date().getMonth()
        let todayYear = new Date().getFullYear()
        let expirMonth = new Date(expiry).getMonth()
        let expirYear = new Date(expiry).getFullYear()

        if(cardNumber.length === 19){
            if(cvc.length===3) {
                if (todayYear === expirYear) {
                    if (todayMonth <= expirMonth) {
                       props.prenota();
                       props.onHide();
                    } else (addToast('Data di scadenza non valida!',
                        {appearance: "error"}))
                } else if (todayYear < expirYear) {
                    props.prenota();
                    props.onHide();
                } else if (todayYear > expirYear) {
                    addToast('Data di scadenza non valida!',
                        {appearance: "error"})
                }
            } else {addToast('CVC non valido! Il CVC è il codice di sicurezza che si trova sul retro della carta.',
                {appearance: "error"}) }
        }else { addToast('Numero di carta errato! Inserire un numero valido!',
            {appearance: "error"}) }
    }

        return (
            <Modal className="my-modal" show={props.show} onHide={props.onHide} dialogClassName="modal-m modal-full" centered>
                <Modal.Body>
                    <div className="p-3">
                        <Modal.Header>
                                <h5>Compila i campi richiesti:</h5>
                            <button type="button" className="close" onClick={props.onHide}>×</button>
                        </Modal.Header>
                        <Form onSubmit={paymentDone}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome intestatario </Form.Label>
                                <Form.Control name="intestatario" type="text" required size="sm"/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Numero carta</Form.Label>&nbsp;
                                <MaskInput maskChar="_"
                                           className="cardNumber"
                                           mask="0000-0000-0000-0000" size={31.5}
                                           value={cardNumber}
                                           onChange={(e)=>{setCardNumber(e.target["value"])}}
                                           style={{color: "black", height:"5.7vh"}}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicBirthDate">
                                <Form.Label>Data di scadenza</Form.Label>
                                <Form.Control name="dataScadenza" type="month" required size="sm"
                                              onChange={(e) => {setExpiry(e.target.value);}}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicCVC">
                                <Form.Label>CVC</Form.Label>
                                <Form.Control name="dataScadenza" type="text" maxLength="3" required size="sm"
                                              onChange={(e) => {setCvc(e.target.value)}}
                                />
                            </Form.Group>
                            <div align="center"><Button type="submit"> Conferma </Button></div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    export default PagamentoModal