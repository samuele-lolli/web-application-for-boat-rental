import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import "../../css/home/modali.css";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import moment from "moment";
import {useToasts} from "react-toast-notifications";

function CancellaModal(props){

    const idUtente = localStorage.getItem("idUser");
    const { addToast } = useToasts();

    const [montato, setMontato] = useState(false);//state fittizzo per far partire la useffect dopo aver cancellato una prenotazione

    //useffect per aggiornare le prenotazioni nella homeUtente
    useEffect(() => {
        Axios.post("http://localhost:3001/dropdown", {
            idUtente: localStorage.getItem("idUser"),
        }).then((response) => {
            if(response.data.message==="ERR") {
                console.log("error")
            } else{
                props.convert(response);
                let inizio=[];
                let fine=[];
                let ids=[];
                props.getRange(response, inizio, fine, ids);
                props.attuali(inizio, fine, ids, response)
                props.passate(inizio, fine, ids, response)
                props.future(inizio, fine, ids, response)
            }
        });
    }, [montato]);

    //funzione per cancellare una prenotazione
    function cancella(){
        props.onHide();
        let date=getDates(moment(props.inizio), moment(props.fine));
        for (let i = 0; i < date.length; i ++ ) {
            date[i]=props.convertDate(date[i]);
        }
        for(let i=0;i<date.length;i++){
            Axios.post("http://localhost:3001/eliminaPrenotazione", {
                id: props.id,
                idU: idUtente,
                data: date[i],
            }).then((response) => {
                if(response.data.message==="OK" && i===(date.length-1)) {
                    addToast("Prenotazione annullata con successo, l'accredito e' stato effettuato sulla carta usata precedentemente.",
                        { appearance: "success"})
                    console.log("cancella")
                    setMontato(!montato)
                }
            });
        }
    }

    //funzione per aggiungere un giorno ad un giorno dato in input
    Date.prototype.addDays = function(days) {
        //non togliere il commento sotto, serve per togliere un warning
        /*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
        let dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
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

    return (
        <Modal className="my-modal" show={props.show} onHide={props.onHide} dialogClassName="modal-m modal-full" centered>
            <Modal.Body>
                <Modal.Header>
                    <Modal.Title id="cancella">
                        <div>
                            E' sicuro di voler disdire questa prenotazione?
                        </div>
                        <div id="info">
                            <small>Le verranno direttamente accreditate le spese che aveva versato per tale noleggio.</small>
                        </div>
                    </Modal.Title>
                    <button type="button" className="close" onClick={props.onHide}>×</button>
                </Modal.Header>
                <div className="canc2" align="center">
                    <Button className="canc1" onClick={cancella}><span>Conferma</span></Button>&nbsp;&nbsp;
                    <Button className="canc1" onClick={props.onHide}><span>Annulla</span></Button>
                </div>

            </Modal.Body>
        </Modal>
    )
}
export default CancellaModal