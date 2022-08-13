import React, {useEffect, useState} from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import Axios from "axios";
import PrenotazioniAdminGetter from "./prenotazioniAdminGetter";

export default function PrenotazioniAdmin() {
    const [ids, setIds] = useState([]) //popola la select con gli id utente
    const [idU, setIdU] = useState("") //id selezionato che viene passato come props alle prenotazioni

    //useffect che setta gli id utente
    useEffect(() => {
        Axios.get("http://localhost:3001/getIdUsers",)
            .then((response) => {
            if(response.data.message==="ERR") {
                console.log("nessun utente")
            } else{
                console.log(response)
                  setIds(response.data.map((response) => response["id"]))
            }
        });
    }, []);


    const handleChangeIdUser = (event) => {
        setIdU(event.target.value);
    };

    const utenti= ids.map((id, index)=>
        <MenuItem key={index} value={id}>{id}</MenuItem>);

    return (
        <>
            <h2 id="titoloInserimento">Prenotazioni barche utenti</h2>
            <InputLabel id={"prenotazioni"}> Seleziona l'utente tramite il codice id e verranno mostrate le prenotazioni: </InputLabel>
            <Select name="operazione" className="select" required onChange={handleChangeIdUser} value={idU}>
                {utenti}
            </Select>
            <br/>
            <br/>
            {idU==="" ? null : <PrenotazioniAdminGetter id={idU} />}
        </>
    );
}