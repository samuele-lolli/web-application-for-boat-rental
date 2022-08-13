import {CSSTransition} from "react-transition-group";
import {ReactComponent as ArrowIcon} from "../../../icons/arrow.svg";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import moment from "moment";

export default function Prenotazioni(props) {

    const[nomiBarche, setNomiBarche]=useState([]);
    const[vuoto,setVuoto]=useState(false);

    //useEffect per recuperare le prenotazioni sul db e filtrare solo quelle attive.
    useEffect(() => {
        //axios per recuperare le
        Axios.post("http://localhost:3001/dropdown", {
            idUtente: localStorage.getItem("idUser"),
        }).then((response) => {
            if(response.data.message==="ERR") {
                setVuoto(true);
            } else{
                let date=moment().subtract(1, 'days').format("YYYY-MM-DD");
                let ids=[];
                for(let i=0;i<response["data"].length;i++){
                    if(JSON.stringify(response["data"][i]["data"]).slice(1, 11)===date){
                        ids[ids.length]=JSON.stringify(response["data"][i]["idBarca"]);
                    }
                }
                if(ids.length===0){
                    setVuoto(true);
                }
                let nomi=[];
                for(let i=0;i<ids.length;i++){
                    //axios per recuperare i nomi delle barche con prenotazioni attive
                    Axios.post("http://localhost:3001/dropdown2", {
                        idBarca: ids[i],
                    }).then((response) => {
                        if(response) {
                            nomi[i]=response["data"][0]["nome"];
                        }
                    });
                }
                setNomiBarche(nomi);
            }
        });
    }, []);

    //costante per la .map function sui nomi barche con prenotazioni attive
    const barche = nomiBarche.map((nome, index) =>
        <DropdownItem key={index}>{nome}</DropdownItem>
    );

    return (
        <CSSTransition
            in={props.activeMenu === 'book'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={props.calcHeight}>
            <div className="menu">
                <props.ItemDropdown goToMenu="main" leftIcon={<ArrowIcon />}>
                    <h4>Prenotazioni Attive</h4>
                </props.ItemDropdown>
                {vuoto ? <div align="center"><span>Non hai nessuna prenotazione attiva al momento!</span></div> : <div>{barche}</div>}
            </div>
        </CSSTransition>
    )
}

//funzione per costruire gli item della sezione prenotazioni nel dropdown menu
function DropdownItem(props) {
    return (
        <b className="menu-item" style={{ textDecoration: 'none' }} >
            {props.children}
        </b>
    );
}