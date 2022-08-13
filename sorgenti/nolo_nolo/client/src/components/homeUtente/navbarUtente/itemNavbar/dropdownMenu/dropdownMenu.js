import React, {useEffect, useRef, useState} from "react";
import Axios from "axios";
import Profilo from "./itemDropdown/profilo";
import Menu from "./itemDropdown/menu";
import Prenotazioni from "./itemDropdown/prenotazioni";
import Statistiche from "./itemDropdown/statistiche";
import {useToasts} from "react-toast-notifications";
import "../../../../../css/App/dropdownMenu.css"
import Toggle from "../../../../darkmode/Toggle";


export default function DropdownMenu() {
    //state per gestire la navigazione con le CSS transition
    const [activeMenu, setActiveMenu] = useState('main');

    //state per settare (in modo dinamico) l'altezza del dropdown menu con le CSS transition
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    //state per disabilitare la modifica dei campi nel profilo utente, prima dell'inserimento password
    const[disabled, setDisable] = useState(true);
    const[disabledOld, setDisableOld]=useState(false);

    const id = localStorage.getItem("idUser");

    Axios.defaults.withCredentials = true;

    // state necessari all'aggiornamento dei dati del profilo utente
    const [password0, setPassword0] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [emailU, setEmailU] = useState("");
    const [nomeU, setNomeU] = useState("");
    const [cognomeU, setCognomeU] = useState("");
    const [dataNascitaU, setDataNascitaU] = useState("");
    const [telefonoU, setTelefonoU] = useState("");

    const { addToast } = useToasts();

    //funzione per verificare se la password è corretta, per la modifica dei dati del profilo utente
    const update = async (e) => {
        e.preventDefault();
            await Axios.post("http://localhost:3001/passwordVecchia", {
                id: id,
                password0: password0,
                password: password,
            }).then((response) => {
                if(response.data.message==="NO") {
                    addToast('Password errata',
                        { appearance: "warning"});
                } else{
                    setDisable(false);
                    setDisableOld(true);
                    addToast('Password corretta, sei libero di modificare le tue credenziali.',
                        { appearance: "success"});
                }
            });
    }

    //funzione che permette l'aggiornamento dei vari dati relativi al profilo dell'utente.
    const update2 = async (e) => {
        e.preventDefault();
        //controllo se la nuova password coincide con il conferma password.
        if (password !== password1) {
            addToast('Le password non coincidono!',
                { appearance: 'warning'});
        } else if( ( password.length<8 || password.length>12 ) && password!=="" ){
            addToast('La password deve essere compresa tra gli 8 e i 12 caratteri.',
                { appearance: 'warning'});
        } else {
            await Axios.post("http://localhost:3001/update", {
                id: id,
                emailU: emailU,
                password: password,
                nomeU: nomeU,
                cognomeU: cognomeU,
                telefonoU: telefonoU,
                dataNascitaU: dataNascitaU,
            }).then((response) => {
                if (response.data.message === "siModifiche" || response.data.message === "siModificheEmailErr") {
                    addToast('Modifiche effettuate!',
                        {appearance: "success"});
                }
                if (response.data.message === "noModifiche") {
                    addToast('Non hai compilato nessun campo, nessuna modifica effettuata.',
                        {appearance: "warning"});
                }
                if (response.data.message === "noModificheEmailErr" || response.data.message === "siModificheEmailErr") {
                    addToast('Email non modificata, poichè già presente sul sistema.',
                        {appearance: "error"});
                }
            })
        }
    }

    //funzione per effettuare il logout dalla pagina utente per i noleggi e tornare alla home.
    const logout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('auth');
        localStorage.removeItem('idUser');
        localStorage.removeItem('cart');
        await Axios.post('http://localhost:3001/logout', {id: id}, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    window.location.href = "/";
                }
            })
    }

    //useEffect per settare l'altezza dropdown in maniera dinamica
    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    //funzione richiamata quando i componenti dropdown vengono montati per calcolare e settare altezza.
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    //funzione per creare vari item all'interno del dropdown menu.
    function DropdownItem(props) {
        return (
            <span className="menu-item" style={{ textDecoration: 'none' }} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </span>
        );
    }

    //funzione per creare l'item relativo al salvataggio dati account utente, nel dropdown menu.
    function DropdownItemSalva(props) {
        return (
            <span className="menu-itemProfilo" style={{ textDecoration: 'none' }} onClick = {update2}>
                {props.children}
            </span>
        );
    }

    //funzione per creare l'item relativo al logout, nel dropdown menu.
    function DropdownItemEsci(props) {
        return (
            <span className="menu-item" style={{ textDecoration: 'none' }} onClick={logout}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </span>
        );
    }

    return (
        <div id="dropp" style={{ height: menuHeight+35 }} ref={dropdownRef}>
            <Menu
                activeMenu={activeMenu}
                calcHeight={calcHeight}
                ItemDropdown={DropdownItem}
                ItemDropdownLogout={DropdownItemEsci}
            />
            <Profilo
                activeMenu={activeMenu}
                calcHeight={calcHeight}
                ItemDropdown={DropdownItem}
                ItemDropdownSalva={DropdownItemSalva}
                disabled={disabled}
                setDisable={setDisable}
                disabledOld={disabledOld}
                setDisableOld={setDisableOld}
                id={id}
                update={update}
                setPassword0={setPassword0}
                setPassword={setPassword}
                setPassword1={setPassword1}
                setEmailU={setEmailU}
                setNomeU={setNomeU}
                setCognomeU={setCognomeU}
                setDataNascitaU={setDataNascitaU}
                setTelefonoU={setTelefonoU}
            />
            <Prenotazioni
                activeMenu={activeMenu}
                calcHeight={calcHeight}
                ItemDropdown={DropdownItem}
            />
            <Statistiche
                activeMenu={activeMenu}
                calcHeight={calcHeight}
                ItemDropdown={DropdownItem}
            />
        </div>

    );
}