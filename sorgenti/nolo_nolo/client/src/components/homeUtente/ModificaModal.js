import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import "../../css/home/modali.css";
import {useToasts} from "react-toast-notifications";
import {ReactComponent as Cash} from "./navbarUtente/icons/cash.svg";
import Calendario from "./Calendario"
import Axios from "axios";
import PagamentoModal from "./PagamentoModal";
import {ReactComponent as Confirm} from "./navbarUtente/icons/confirm.svg";
import SicuroModal from "./SicuroModal";

function ModificaModal(props){

    const[disp, setDisp]=useState();
    //useffect che verifica la disponibilita' della barca selezionata
    useEffect(() => {
        Axios.post("http://localhost:3001/disponibilita", {
            idBarca: props.id,
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
    },[props.show, props.bottoni, props.onHide]);

    const [showP, setShowP] =useState(false); //state per mostrare il pagamento modal
    const [montato, setMontato] = useState(false) //state fittizio per far partire la useffect quando viene cancellata o prenotata una barca

    //useffect che aggiorna le prenotazioni nella homeUtente
    useEffect(() => {
        Axios.post("http://localhost:3001/dropdown", {
            idUtente: props.idUtente,
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

    //onHide del pagamento modal
    const chiudiPagamento = () => {
        setShowP(!showP);
    }

    //funzione per cancellare una prenotazione
    function cancella(){
        for(let i=0;i<props.periodo.length;i++){
            Axios.post("http://localhost:3001/eliminaPrenotazione", {
                id: props.id,
                idU: props.idUtente,
                data: props.periodo[i],
            }).then((response) => {
                if(response.data.message==="OK" && i===(props.periodo.length-1)) {
                    setMontato(!montato);
                }
            });
        }
        props.setBottoni(true);
    }

    //funzione per inserire nel db una nuova prenotazione
    function prenota(){
        Axios.post("http://localhost:3001/prenota", {
            idUtente: props.idUtente,
            idBarca: props.id,
            datePrenotate: date,
        }).then((response) => {
            if (response.data.message === "OK") {
                addToast("Prenotazione modificata con successo.",
                    { appearance: "success"});
                setMontato(!montato);
                props.onHide();
            } else{
                addToast('Errore sconosciuto!',
                    { appearance: "error"});
            }
        });
    }

    const { addToast } = useToasts();

    //per settare il totale da pagare e le date prenotate
    const[date, setDate]=useState([]);
    function settaTot(numero, array){
        Axios.post("http://localhost:3001/dropdown2", {
            idBarca: props.id,
        }).then((response) => {
            if(response) {
                props.setDiff((response["data"][0]["tariffa"]*props.periodo.length)-numero)
            }
        });
        setDate(array);
    }

    //funzione che in base alla differenza di costo delle prenotazioni(o admin) restituisce differenti bottoni
    function Bottone(){
        if(props.admin){
            return <div onClick={(props.disabled)? attento : prenota}>
                        <span className="menu-itemBarca" style={{ textDecoration: 'none' }}>
                            <span className="icon-button">{<Cash />}</span>
                            <h6 id="barcabottoneScritta">Conferma modifica</h6>
                        </span>
                    </div>
        }
        if(props.diff>0){
            return <div onClick={(props.disabled)? attento : chiudiPagamento}>
                        <span className="menu-itemBarca" style={{ textDecoration: 'none' }}>
                            <span className="icon-button">{<Cash />}</span>
                            <h6 id="barcabottoneScritta">Procedi all'accredito di {(props.diff).toFixed(2)}€</h6>
                        </span>
                    </div>
        } else if(props.diff<0){
            return <div onClick={(props.disabled)? attento : chiudiPagamento}>
                        <span className="menu-itemBarca" style={{ textDecoration: 'none' }}>
                            <span className="icon-button">{<Cash />}</span>
                            <h6 id="barcabottoneScritta">Procedi al pagamento di {(props.diff-props.diff*2).toFixed(2)}€</h6>
                        </span>
                    </div>
        } else if(props.diff===0){
            return <div onClick={(props.disabled)? attento : prenota}>
                        <span className="menu-itemBarca" style={{ textDecoration: 'none' }}>
                            <span className="icon-button">{<Cash />}</span>
                            <h6 id="barcabottoneScritta">Conferma modifica</h6>
                        </span>
                    </div>
        } else{
            return null;
        }
    }

    //funzione che restituisce un bottone per confermare la cancellazione di una prenotazione
    function BottoneCancella(){
        return <div onClick={cancella}>
                    <span className="menu-itemBarca" style={{ textDecoration: 'none' }}>
                        <span className="icon-button">{<Confirm />}</span>
                        <h6 id="barcabottoneScritta">Conferma</h6>
                    </span>
                </div>
    }

    //funzione di warning per utente
    function attento(){
        addToast('Prima seleziona il periodo di noleggio!', { appearance: 'warning'})
    }

    //per settare il bottone attivo/disattivato
    function attiva(){
        props.setDisable(false);
    }
    function disattiva(){
        props.setDisable(true);
    }

    //per aprire il sicuromodal in base a condizioni
    const [showSicuro, setShowSicuro] = useState(false);
    function youSure(){
        if(props.bottoni===true){
            setShowSicuro(true);
        } else{
            props.onHide();
        }
    }

    //onHide sicuro modal
    function toggleSicuro(){
        setShowSicuro(!showSicuro);
    }

    return (
        <Modal className="my-modal" show={props.show} onHide={() => props.onHide} dialogClassName="modal-m modal-full" centered>{/*lasciare cosi' la onHide*/}
            <Modal.Body>
                <div className="p-3">
                    <Modal.Header>
                        <Modal.Title >
                            {props.nomee}
                            <br/>
                            <small>{props.inizio}<b>/</b></small>
                            <small>{props.fine}</small>
                        </Modal.Title>
                        <button type="button" className="close" onClick={youSure}>×</button>
                    </Modal.Header>
                    {!props.bottoni ? <div align="center">
                            <h6 id="barcabottoneScritta">Visualizza la disponibilita' della barca:</h6>
                            <Calendario
                                idBarca={props.id}
                                disp={disp}
                                convertDate={props.convertDate}
                                attiva={attiva}
                                settaTot={settaTot}
                                disattiva={disattiva}
                                carrello={props.carrello}
                                click={true}
                            />
                            <br/>
                            <small>N.B.: Nel calendario viene visualizzata anche la prenotazione attuale.</small>
                            <br/>
                            <Modal.Header>
                            <h6 id="barcabottoneScritta">Sei sicuro di voler annullare la vecchia
                                prenotazione per poi selezionare un nuovo periodo?</h6><br/>
                            </Modal.Header>
                            <div align="left"><BottoneCancella/></div>
                        </div>
                        :
                        <div>
                            <span className="descrizione">Una volta scelto il nuovo periodo le verra' chiesto di pagare,
                            o le verra' accreditato, l'importo dato dalla differenza delle prenotazioni.</span>
                            <Modal.Header>
                            <h6 id="barcabottoneScritta">Seleziona il nuovo periodo:</h6>
                            <Calendario
                                idBarca={props.id}
                                disp={disp}
                                convertDate={props.convertDate}
                                attiva={attiva}
                                settaTot={settaTot}
                                disattiva={disattiva}
                                carrello={props.carrello}
                                date={date}
                                admin={props.admin}
                            />
                        </Modal.Header>
                            <div><Bottone/></div>
                        </div>
                    }
                </div>
            </Modal.Body>
            <div>
                <PagamentoModal show={showP}
                                onHide={chiudiPagamento}
                                prenota={prenota}
                                differenza={false}
                />
            </div>
            <div>
                <SicuroModal show={showSicuro}
                                onHide={toggleSicuro}
                                onHideTutto={props.onHide}
                />
            </div>
        </Modal>
    )
}
export default ModificaModal