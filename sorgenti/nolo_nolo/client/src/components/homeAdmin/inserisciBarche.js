import {Button, Checkbox, FormControl, FormGroup, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";
import Axios from "axios";
import {useToasts} from "react-toast-notifications";

export default function InserisciBarche(props) {
    const { addToast } = useToasts();

    const metratura1=parseFloat(props.metratura);
    const prezzo1=parseFloat(props.prezzo);

    //funzione per inserire la barca coi dati relativi
    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/nuovabarca", {
            tipoBarca: props.tipoBarca,
            nomeBarca: props.nomeBarca,
            descrizione: props.descrizione,
            metratura: metratura1,
            posti: props.posti,
            cavalli: props.cavalli,
            immagine: props.immagine,
            prezzo: props.prezzo,
            luogo: props.luogo,
            condizioni: props.condizioni,
            patente: props.patente,
            disponibilita: props.disponibilita,
        }).then((response) => {
            if(response.data.message){
                alert(props.tipoBarca)
                addToast('Nome già presente nel database! Utilizza un nome diverso o elimina la barca già presente per continuare!!', { appearance: 'error'})
            }
            else {
                alert(props.tipoBarca)
                addToast("L'inserimento è avvenuto con successo!", { appearance: 'success'})
            }
        });
    };

    //a seconda della barca selezionata vengono mostrati o meno dei campi:
    return(
        <>
            {props.tipoOperazione==="inserimento" ? <form style={{width: "77%"}} onSubmit={handleSubmit}>
                <InputLabel className="inputLabel"> Inserisci la categoria di barca. </InputLabel>
                <Select name="categoriaBarca" className="select" form="formInserimento" defaultValue={"motore"} onChange={props.handleChangeCategoria} required>
                    <MenuItem value="motore">Barche a motore</MenuItem>
                    <MenuItem value="vela">Barche a vela</MenuItem>
                    <MenuItem value="nonalimentata">Barche non alimentate</MenuItem>
                    <MenuItem value="accessori">Accessori</MenuItem>
                </Select>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input20">Nome</InputLabel>
                        <Input id="my-input21" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {props.setNomeBarca(e.target["value"]);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input22">Descrizione</InputLabel>
                        <Input id="my-input23" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {props.setDescrizioneBarca(e.target["value"]);}} required/>
                    </FormControl>
                </FormGroup>
                {props.tipoBarca==="accessori" ? null : <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input24">Metratura</InputLabel>
                        <Input id="my-input25" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {props.setMetratura(e.target["value"]);}} required/>
                    </FormControl>
                </FormGroup>}
                {props.tipoBarca==="accessori" ? null : <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input26">Posti disponibili</InputLabel>
                        <Input id="my-input27" className="inputForm" aria-describedby="my-helper-text" type="number" onChange={(e) => {props.setPosti(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>}
                {props.tipoBarca==="nonalimentata" || props.tipoBarca==="accessori" ? null : <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input28" >Cavalli motore</InputLabel>
                        <Input id="my-input29" className="inputForm" aria-describedby="my-helper-text" type="number" onChange={(e) => {props.setCavalli(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>}
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input30">Immagine</InputLabel>
                        <Input id="my-input31" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {props.setImmagine(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input32">Prezzo/Tariffa</InputLabel>
                        <Input id="my-input33" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {props.setPrezzo(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input34">Posizione attuale</InputLabel>
                        <Input id="my-input35" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {props.setLuogo(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input36">Stato/Condizioni</InputLabel>
                        <Input id="my-input37" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {props.setCondizioni(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>
                <br/>
                <div>
                    <InputLabel className="labelCheck" htmlFor="my-input38"> Disponibilità </InputLabel>
                    <Checkbox
                        className="checkcheck"
                        checked={props.disponibilita}
                        onChange={(e) => {props.setDisponibilita(e.target.checked);}}
                        name="checkedA"
                        color="primary"
                    />
                </div>
                {props.tipoBarca==="nonalimentata" || props.tipoBarca==="accessori" ? null : <div>
                    <InputLabel className="labelCheck" htmlFor="my-input39"> Patente nautica </InputLabel>
                    <Checkbox
                        className="checkcheck"
                        checked={props.patente}
                        onChange={(e) => {props.setPatente(e.target.checked);}}
                        name="checkedB"
                        color="primary"
                    /> </div>}
                <Button id="buttonOpera1" type="submit" >
                    Aggiungi
                </Button>
            </form> : null}
        </>
    )
}