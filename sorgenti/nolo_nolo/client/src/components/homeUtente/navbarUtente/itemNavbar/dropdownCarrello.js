import React, {useEffect, useRef, useState} from "react";
import {Button, NavDropdown} from "react-bootstrap";
import {ReactComponent as Sinistra} from "../icons/right-arrow.svg";
import {ReactComponent as Boat} from "../icons/ferry.svg";
import {ReactComponent as Euro} from "../icons/euro.svg";
import {Container} from "react-bootstrap";
import "../../../../css/App/dropdownCarrello.css"
import {CSSTransition} from "react-transition-group";
import Form from "react-bootstrap/Form";
import MaskInput from 'react-maskinput';
import {useToasts} from "react-toast-notifications";
import Axios from "axios";

export default function DropdownCarrello(props) {
    //state per gestire la navigazione con le CSS transition
    const [activeMenu, setActiveMenu] = useState('main');

    //state per settare (in modo dinamico) l'altezza del dropdown menu con le CSS transition
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    //state per la gestione del totale nel carrello e per i campi del pagamento.
    const [totale, setTotale] = useState(0);
    const [nomeUtente, setNomeUtente] = useState("")
    const [cardNumber, setCardNumber] = useState(null)
    const [expiry, setExpiry] = useState("")
    const [cvc, setCvc] = useState(null)
    const { addToast } = useToasts();
    let tot=totale.toFixed(2);

    //useEffect per settare:
    //1) l'altezza dropdown in maniera dinamica
    //2) il totale del carrello ogni volta che viene aggiunto/tolto un elemento
    //3) controllo che un altro utente non abbia gia' prenotato una barca che interferisca con le date presenti nel carrello
    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
        let totaleParziale = 0;
        for(let i=0; i<props.carrello.length; i++){
            totaleParziale += props.carrello[i].value["tot"];
        }
        setTotale(totaleParziale);
        localStorage.removeItem("cart")
        localStorage.setItem("cart", JSON.stringify(props.carrello))

        for(let i=0; i<props.carrello.length; i++){
            let idBarca = props.carrello[i].value["id"];
            let datePrenotate=props.carrello[i].value["date"];
            Axios.post("http://localhost:3001/controlla", {
                dateArray: datePrenotate,
                idBarca: idBarca,
            }).then((response) => {
                if(response.data.message==="ERR") {
                    pagamentoERR();
                    localStorage.removeItem("cart")
                    props.setCarrello([]);
                    props.setOpenCarrello(false)
                }
            });
        }
    },[props.carrello])

    //useEffect per settare l'altezza dropdown in maniera dinamica al variare dei campi di pagamento
    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    },[cardNumber,expiry,cvc,totale])

    //costante che contiene tutti gli elementi del carrello con relativi dati
    const items = props.carrello.map((card, index) =>
        <Container key={index}>
            <DropdownItemCarrello leftIcon={<Boat/>} index={index} carrello={props.carrello}>
                {props.carrello[index].value["nome"].substring(0,12)} &nbsp;&nbsp;&nbsp;
                {props.carrello[index].value["tot"].toFixed(2)}€ &nbsp;&nbsp;&nbsp;
                <span>Dal: {props.carrello[index].value["inizio"]}<br/> Al: {props.carrello[index].value["fine"]} </span>
            </DropdownItemCarrello>
        </Container>
    );

    //funzione per rimuovere gli elementi dal carrello
    function onRemove(index){
        let list = [...props.carrello];
        list.splice(index, 1);
        props.setCarrello( list );
    }

    //funzione richiamata quando i componenti dropdown vengono montati per calcolare e settare altezza.
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    //funzione per controllare che il pagamento vada a buon fine, con i dati giusti
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
                        pagamento();
                    } else (addToast('Data di scadenza non valida!',
                        {appearance: "error"}))
                } else if (todayYear < expirYear) {
                    pagamento();
                } else if (todayYear > expirYear) {
                    addToast('Data di scadenza non valida!',
                        {appearance: "error"})
                }
            } else {addToast('CVC non valido! Il CVC è il codice di sicurezza che si trova sul retro della carta.',
                {appearance: "error"}) }
        }else { addToast('Numero di carta errato! Inserire un numero valido!',
            {appearance: "error"}) }
    }

    //funzione richiamata solo quando il pagamento va a buon fine.
    function pagamento(){
        addToast('Pagamento effettuato con successo! Controlla la sezione delle prenotazioni' +
            ' per tenerti aggiornato su tempi, modalità e restituzione del mezzo!',
            { appearance: "success", autoDismiss : false})
        addToast("Si ricordi che entro la mezzanotte dell'ultimo giorno di prenotazione dovra'" +
            " restituire gli articoli prenotati attraverso la sezione 'Le tue prenotazioni' → 'Prenotazioni passate' nella sua home personale.",
            { appearance: "warning", autoDismiss : false})
        pagamentoOK();
    }

    //funzione richiamata quando qualcuno ha già effettuato una prenotazione in quel periodo.
    function pagamentoERR() {
        addToast('Errore! Qualcuno ha effettuato una prenotazione prima di te nello stesso periodo,' +
            ' per favore seleziona degli altri giorni.',
            {appearance: "error"});
    }

    //funzione richiamata dopo che il pagamento è stato accettato, per effettuare le insert sul db
    //e per svuotare il carrello dopo il pagamento.
    function pagamentoOK(){
        for(let i=0; i<props.carrello.length; i++) {
            let idBarca = props.carrello[i].value["id"];
            let datePrenotate = props.carrello[i].value["date"];
            Axios.post("http://localhost:3001/prenota", {
                idUtente: localStorage.getItem("idUser"),
                idBarca: idBarca,
                datePrenotate: datePrenotate,
            }).then((response) => {
                if (response.data.message === "OK") {
                    console.log(props.carrello[i].value["nome"]+' PRENOTATA');
                    localStorage.removeItem("cart")
                    props.setCarrello([]);
                    props.setOpenCarrello(false)
                } else{
                    addToast('Errore sconosciuto!',
                        { appearance: "error"});
                }
            });
        }

    }

    //funzione per creare l'item relativo al pagamento dentro al dropdown carrello.
    function DropdownItemPagamento(props) {
        return (
            <small className="menu-item" id="itemPagamento" style={{ textDecoration: 'none' }} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </small>
        );
    }

    //funzione per creare l'item relativo al totale dentro al dropdown carrello.
    function DropdownItemTotale(props) {
        return (
            <small className="menu-item" id="itemTotale" style={{ textDecoration: 'none' }}>
                <span className="icon-button" >{props.leftIcon}</span>
                {props.children}
            </small>
        );
    }

    //funzione per creare l'item relativo agli elementi del carrello dentro al dropdown carrello.
    function DropdownItemCarrello(props) {
        return (
            <>
                <small id="cart" className="menu-item" style={{ textDecoration: 'none' }}>
                    <span className="icon-button">{props.leftIcon}</span>
                    {props.children}
                </small>
                <Button onClick={() => onRemove(props.index)} className="remove"> X </Button>
            </>
        );
    }

    return (
        <div id="dropp" style={{ height: menuHeight+35 }} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={400}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    { props.carrello.length < 1 ? <div className="text-center">Il carrello è vuoto. </div> : items}
                    <NavDropdown.Divider />
                    <DropdownItemTotale leftIcon={<Euro/>}><b>Totale: {tot} €</b> </DropdownItemTotale>
                    {totale>0 ? <NavDropdown.Divider /> : null}
                    {totale>0 ? <DropdownItemPagamento leftIcon={<Sinistra/>} goToMenu="pagamento" > Procedi al pagamento</DropdownItemPagamento>: null}
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'pagamento'}
                timeout={400}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu2">
                    <Form onSubmit={paymentDone}>
                        <p className="lead">Compila i campi richiesti per effettuare il pagamento:</p>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome intestatario </Form.Label>
                            <Form.Control name="intestatario" type="text" required size="sm"
                                          onChange={(e) => {setNomeUtente(e.target.value);}}
                                          value={nomeUtente}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Numero carta</Form.Label>
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
                        <Button type="submit"> Paga ora! </Button>
                    </Form>
                </div>
            </CSSTransition>
        </div>

    );
}