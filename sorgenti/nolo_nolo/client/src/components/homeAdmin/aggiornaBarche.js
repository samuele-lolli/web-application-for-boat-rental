import React, {useEffect, useState} from "react";
import {Button, Checkbox, FormControl, FormGroup, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import Axios from "axios";
import {useToasts} from "react-toast-notifications";

export default function AggiornaBarche(props) {
    //campi aggiornabili della barca
    const[descrizioneBarcaU, setDescrizioneBarcaU] = useState("")
    const[prezzoU, setPrezzoU] = useState("")
    const[condizioniU, setCondizioniU] = useState("")

    const { addToast } = useToasts();

    //barca selezionata per l'aggiornamento
    const[barcaUpdate, setBarcaUpdate] = useState(props.barcheMotore[0])

    //per settare la barca selezionata
    const handleChangeUpdate = (event) => {
        setDescrizioneBarcaU("")
        setPrezzoU("")
        setCondizioniU("")
        setBarcaUpdate(event.target.value);
    };

    //funzione per aggiornare la barca
    const update = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:3001/updateBarche", {
            nomeBarcaIniziale: props.nomeBarca,
            tipoBarca: props.tipoBarca,
            descrizione: descrizioneBarcaU,
            disponibilita: props.disponibilita,
            prezzo: prezzoU,
            condizioni: condizioniU
        }).then((response) => {
            if (response.data.message === "siModifiche") {
                addToast('Modifiche effettuate!',
                    {appearance: "success"});
            }
            if (response.data.message === "noModifiche") {
                addToast('Non hai compilato nessun campo, tuttavia puoi modificare/hai modificato la disponibilità della barca.',
                    {appearance: "warning"});
            }
        })
    }

    //per settare i placeholder con i valori precedenti all'aggiornamento
    useEffect(() => {
        Axios.post("http://localhost:3001/placeholderBarche", {
            nomeBarca: barcaUpdate,
            tipoBarca: props.tipoBarca
        }).then((response) => {
            if(response) {
                props.setNomeBarca(response.data[0]["nome"]);
                props.setDescrizioneBarca(response.data[0]["descrizione"]);
                props.setMetratura(response.data[0]["metratura"]);
                props.setPatente(response.data[0]["patente"]);
                props.setPosti(response.data[0]["posti"]);
                props.setCavalli(response.data[0]["cavalli"]);
                if(response.data[0]["disponibilita"]===0){
                    props.setDisponibilita(false)
                } else {
                    props.setDisponibilita(true)
                }
                props.setImmagine(response.data[0]["immagine"]);
                props.setPrezzo(response.data[0]["tariffa"]);
                props.setLuogo(response.data[0]["luogo"]);
                props.setCondizioni(response.data[0]["stato"]);
            }

        })
    },[barcaUpdate]);

    return(
        <>
            {props.tipoOperazione==="aggiornamento" ?
                <form style={{width: "77%"}}>
                    <InputLabel className="inputLabel"> Inserisci la categoria di barca. </InputLabel>
                    <Select name="categoriaBarca" className="select" form="formInserimento" defaultValue={""} onChange={props.handleChangeCategoria} required>
                        <MenuItem value={""}>Nessuna </MenuItem>
                        <MenuItem value="motore">Barche a motore</MenuItem>
                        <MenuItem value="vela">Barche a vela</MenuItem>
                        <MenuItem value="nonalimentata">Barche non alimentate</MenuItem>
                        <MenuItem value="accessori">Accessori</MenuItem>
                    </Select>
                    <InputLabel id="demo-controlled-open-select-label">Seleziona la barca che vuoi aggiornare:</InputLabel>
                    <Select defaultValue={""} onChange={handleChangeUpdate}>
                        <MenuItem> Nessuna </MenuItem>
                        {/*a seconda del tipo di barca selezionata popola la select con le barche del tipo giusto*/}
                        {props.tipoBarca==="motore" ? props.barcheMotore.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>) : null}
                        {props.tipoBarca==="vela" ? props.barcheVela.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>) : null}
                        {props.tipoBarca==="nonalimentata" ? props.barcheNonAlimentata.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>) : null}
                        {props.tipoBarca==="accessori" ? props.accessori.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>) : null}
                    </Select>

                    <FormGroup>
                        <FormControl>
                            <InputLabel className="inputLabel" htmlFor="my-input13">Descrizione </InputLabel>
                            <Input id="my-input14" value={descrizioneBarcaU} className="inputForm" aria-describedby="my-helper-text" type="text" placeholder={props.descrizioneBarca} onChange={(e) => {setDescrizioneBarcaU(e.target["value"]);}} required/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel className="inputLabel" htmlFor="my-input15">Tariffa</InputLabel>
                            <Input id="my-input16" value={prezzoU} className="inputForm" aria-describedby="my-helper-text" type="number" placeholder={props.prezzo.toString()} onChange={(e) => {setPrezzoU(e.target.value);}} required/>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <FormControl>
                            <InputLabel className="inputLabel" htmlFor="my-input17">Condizioni</InputLabel>
                            <Input id="my-input18" value={condizioniU} className="inputForm" aria-describedby="my-helper-text" type="text" placeholder={props.condizioni} onChange={(e) => {setCondizioniU(e.target.value);}} required/>
                        </FormControl>
                    </FormGroup>
                    <br/>
                    <div>
                        <InputLabel className="labelCheck" htmlFor="my-input19"> Disponibilità </InputLabel>
                        <Checkbox
                            className="checkcheck"
                            checked={props.disponibilita}
                            onChange={(e) => {props.setDisponibilita(e.target.checked);}}
                            name="checkedB"
                            color="primary"
                        />
                    </div>
                    <Button id="buttonOpera" type="submit" onClick={update} >
                        Aggiorna
                    </Button>
                </form>
                : null }
        </>
    )
}