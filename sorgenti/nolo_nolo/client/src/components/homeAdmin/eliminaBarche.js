import {Button,InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {useEffect, useState} from "react";

import {useToasts} from "react-toast-notifications";
import Axios from "axios";

export default function EliminaBarche(props) {
    const { addToast } = useToasts();

    //state per la selezione della barca da eliminare
    const[barcaMotoreDelete, setBarcaMotoreDelete] = useState("")
    const[barcaVelaDelete, setBarcaVelaDelete] = useState("")
    const[barcaNonAlimentataDelete, setBarcaNonAlimentataDelete] = useState("")
    const[accessoriDelete, setAccessoriDelete] = useState("")

    //settano gli state sopra
    const handleChangeMotore = (e) => {
        setBarcaMotoreDelete(e.target.value)
    }
    const handleChangeVela = (e) => {
        setBarcaVelaDelete(e.target.value)
    }
    const handleChangeNonAlimentata = (e) => {
        setBarcaNonAlimentataDelete(e.target.value)
    }
    const handleChangeAccessori = (e) => {
        setAccessoriDelete(e.target.value)
    }

    // 4 useffect per popolare i 4 menu a tendina
    useEffect(() => {
        Axios.get("http://localhost:3001/tuttelebarcheMotore")
            .then((response) => {
                if (response.status === 400) {
                    addToast('Errore nella richiesta al server, riprova più tardi!', {appearance: 'error'})
                } else {
                    let barche = []
                    for (let i = 0; i < response.data.length; i++) {
                        barche[i] = response.data[i]["nome"]
                    }
                    props.setBarcheMotore(barche)
                }
            });

    }, [props.tipoOperazione]);

    useEffect(() => {
        Axios.get("http://localhost:3001/tuttelebarcheVela")
            .then((response) => {
                if(response.status === 400){
                    addToast('Errore nella richiesta al server, riprova più tardi!', { appearance: 'error'})
                }
                else {
                    let barche = []
                    for(let i=0;i<response.data.length; i++) {
                        barche[i] = response.data[i]["nome"]
                    }
                    props.setBarcheVela(barche)
                }
            });
    }, [props.tipoOperazione]);

    useEffect(() => {
        Axios.get("http://localhost:3001/tuttelebarcheNonAlimentate")
            .then((response) => {
                if(response.status === 400){
                    addToast('Errore nella richiesta al server, riprova più tardi!', { appearance: 'error'})
                }
                else {
                    let barche = []
                    for(let i=0;i<response.data.length; i++) {
                        barche[i] = response.data[i]["nome"]
                    }
                    props.setBarcheNonAlimentata(barche)
                }
            });
    }, [props.tipoOperazione]);

    useEffect(() => {
        Axios.get("http://localhost:3001/tuttelebarcheAccessori")
            .then((response) => {
                if(response.status === 400){
                    addToast('Errore nella richiesta al server, riprova più tardi!', { appearance: 'error'})
                }
                else {
                    let barche = []
                    for(let i=0;i<response.data.length; i++) {
                        barche[i] = response.data[i]["nome"]
                    }
                    props.setAccessori(barche)
                }
            });
    }, [props.tipoOperazione]);

    //funzione per eliminare la barca selezionata
    const deleteBarca = async () => {
        if (barcaMotoreDelete !== "") {
            let barcaDaEliminare = barcaMotoreDelete
            try {
                await Axios.post('http://localhost:3001/deleteMotore', {
                    nomeBarca: barcaDaEliminare,
                }).then((response) => {
                    if(response.data.message){
                        addToast('Non è possibile eliminare una barca che ha avuto almeno una prenotazione, è stata settata come "Non disponibile"!', { appearance: 'error'})
                    }
                    else{
                        let filtrato = props.barcheMotore.filter(function (valore) {
                            return valore !== barcaDaEliminare;
                        });
                        props.setBarcheMotore(filtrato)
                        setBarcaMotoreDelete('')
                        addToast('La cancellazione è avvenuta con successo!', {appearance: 'success'});
                    }
                });
            } catch (e) {
                addToast('Errore', {appearance: 'error'});
            }
        }
        if (barcaNonAlimentataDelete !== "") {
            let barcaDaEliminare = barcaNonAlimentataDelete
            try {
                await Axios.post('http://localhost:3001/deleteNonAlimentata', {
                    nomeBarca: barcaDaEliminare,
                }).then((response) => {
                    if(response.data.message){
                        addToast('Non è possibile eliminare una barca che ha avuto almeno una prenotazione, è stata settata come "Non disponibile"!', { appearance: 'error'})
                    }
                    else{
                        let filtrato2 = props.barcheNonAlimentata.filter(function (valore) {
                            return valore !== barcaDaEliminare;
                        });
                        props.setBarcheNonAlimentata(filtrato2)
                        setBarcaNonAlimentataDelete('')
                        addToast('La cancellazione è avvenuta con successo!', {appearance: 'success'});
                    }
                });
            } catch (e) {
                addToast('Errore', {appearance: 'error'});
            }
        }
        if (barcaVelaDelete !== "") {
            let barcaDaEliminare = barcaVelaDelete
            try {
                await Axios.post('http://localhost:3001/deleteVela', {
                    nomeBarca: barcaDaEliminare,
                }).then((response) => {
                    if(response.data.message){
                        addToast('Non è possibile eliminare una barca che ha avuto almeno una prenotazione, è stata settata come "Non disponibile"!', { appearance: 'error'})
                    }
                    else{
                        let filtrato3 = props.barcheVela.filter(function (valore) {
                            return valore !== barcaDaEliminare;
                        });
                        props.setBarcheVela(filtrato3)
                        setBarcaVelaDelete('')
                        addToast('La cancellazione è avvenuta con successo!', {appearance: 'success'});
                    }
                });
            } catch (e) {
                addToast('Errore', {appearance: 'error'});
            }
        }
        if (accessoriDelete !== "") {
            let barcaDaEliminare = accessoriDelete
            try {
                await Axios.post('http://localhost:3001/deleteAccessori', {
                    nomeBarca: barcaDaEliminare,
                }).then((response) => {
                    if(response.data.message){
                        addToast('Non è possibile eliminare una barca che ha avuto almeno una prenotazione, è stata settata come "Non disponibile"!', { appearance: 'error'})
                    }
                    else{
                        let filtrato4 = props.accessori.filter(function (valore) {
                            return valore !== barcaDaEliminare;
                        });
                        props.setAccessori(filtrato4)
                        setAccessoriDelete('')
                        addToast('La cancellazione è avvenuta con successo!', {appearance: 'success'});
                    }
                });
            } catch (e) {
                addToast('Errore', {appearance: 'error'});
            }
        }
    }

    return(
        <>
            {props.tipoOperazione==="cancellazione" ?
                <div>
                    <br/>
                    <InputLabel id="demo-controlled-open-select-label">Seleziona la barca a motore che vuoi eliminare:</InputLabel>
                    <Select value={barcaMotoreDelete} onChange={handleChangeMotore}>
                        <MenuItem value={""}>Nessuna</MenuItem>
                        {props.barcheMotore.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>)}
                    </Select>
                    <br/>
                    <InputLabel id="demo-controlled-open-select-label">Seleziona la barca a vela che vuoi eliminare:</InputLabel>
                    <Select value={barcaVelaDelete} onChange={handleChangeVela}>
                        <MenuItem value={""}>Nessuna </MenuItem>
                        {props.barcheVela.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>)}
                    </Select>
                    <br/>
                    <InputLabel id="demo-controlled-open-select-label">Seleziona la barca non alimentata che vuoi eliminare:</InputLabel>
                    <Select value={barcaNonAlimentataDelete} onChange={handleChangeNonAlimentata}>
                        <MenuItem value={""}>Nessuna</MenuItem>
                        {props.barcheNonAlimentata.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>)}
                    </Select>
                    <br/>
                    <InputLabel id="demo-controlled-open-select-label">Seleziona l'accessorio che vuoi eliminare:</InputLabel>
                    <Select value={accessoriDelete} onChange={handleChangeAccessori}>
                        <MenuItem value={""}>Nessuna </MenuItem>
                        {props.accessori.map((barca,index) => <MenuItem key={index} value={barca}>{barca}</MenuItem>)}
                    </Select>
                    <br/>
                    <Button id="bottoneDelete" onClick={deleteBarca}>Elimina</Button>
                </div>
                : null }
        </>
    )
}