import React, {useEffect, useState} from "react";
import {Button, Checkbox, FormControl, FormGroup, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import Axios from "axios";
import {useToasts} from "react-toast-notifications";

export default function FormAdminClienti() {
    //tipo di operazione
    const [tipoOperazione, setTipoOperazione] = useState("inserimento")

    //campi info cliente
    const[emailUtente, setEmailUtente] = useState("")
    const[passwordUtente, setPasswordUtente] = useState("")
    const[nomeUtente, setNomeUtente] = useState("")
    const[cognomeUtente, setCognomeUtente] = useState("")
    const[telefonoUtente, setTelefonoUtente] = useState("")
    const[dataNascita, setDataNascita] = useState("")
    const[patente, setPatente] = useState(false)

    const { addToast } = useToasts();

    //lista utenti e utente selezionato
    const[utenti, setUtenti] = useState([])
    const[utenteDelete, setUtenteDelete] = useState("")
    const[utenteUpdate, setUtenteUpdate] = useState(utenti[0])

    const[nomeUtenteU, setNomeUtenteU] = useState("")
    const[cognomeUtenteU, setCognomeUtenteU] = useState("")
    const[telefonoUtenteU, setTelefonoUtenteU] = useState("")
    const[passwordUtenteU, setPasswordUtenteU] = useState("")

    //per settare utente e tipo operazione
    const handleChangeUpdate = (event) => {
        setNomeUtenteU("")
        setCognomeUtenteU("")
        setTelefonoUtenteU("")
        setPasswordUtenteU("")
        setUtenteUpdate(event.target.value);
    };
    const handleChangeUtente = (event) => {
        setUtenteDelete(event.target.value);
    };
    const handleChangeOperazione = (event) => {
        setTipoOperazione(event.target.value);
    };

    //funzione per eliminare utente
    const deleteUser = async () => {
        if (utenteDelete !== "") {
            let userDaEliminare = utenteDelete
            try {
                await Axios.post('http://localhost:3001/deleteUser', {
                    nomeUser: userDaEliminare,
                }).then((response) => {
                    if(response.data.message){
                        addToast('Non è possibile eliminare utente che ha effettuato almeno una prenotazione!', { appearance: 'error'})
                    }
                    else{
                        let filtrato = utenti.filter(function (valore) {
                            return valore !== userDaEliminare;
                        });
                        setUtenti(filtrato)
                        setUtenteDelete('')
                        addToast('La cancellazione è avvenuta con successo!', {appearance: 'success'});
                    }
                });
            } catch (e) {
                addToast('Errore', {appearance: 'error'});
            }
        }
    }

    //funzione per aggiungere un utente
    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/nuovoUtente", {
            email: emailUtente,
            password: passwordUtente,
            nome: nomeUtente,
            cognome: cognomeUtente,
            telefono: telefonoUtente,
            dataNascita: dataNascita,
            patente: patente,
        }).then((response) => {
            if(response.data.message){
                addToast('Email già associata ad un account!', { appearance: 'error'})
            }
            else {
                addToast("L'inserimento è avvenuto con successo!", { appearance: 'success'})
            }
        });
    };

    //useffect per popolare la lista degli utenti
    useEffect(() => {
        Axios.get("http://localhost:3001/tuttiGliUtenti")
            .then((response) => {
                if(response.status === 400){
                    addToast('Errore nella richiesta al server, riprova più tardi!', { appearance: 'error'})
                }
                else {
                    let users = []
                    for(let i=0;i<response.data.length; i++) {
                        users[i] = response.data[i]["email"]
                    }
                    setUtenti(users)
                }
            });
    }, [tipoOperazione]);

    //funzione di aggiornamento info utente
    const update = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:3001/updateUtenti", {
            email: utenteUpdate,
            nome: nomeUtenteU,
            cognome: cognomeUtenteU,
            password: passwordUtenteU,
            telefono: telefonoUtenteU,
            patente: patente,
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

    //useffect per placeholder patente si/no
    useEffect(() => {
        Axios.post("http://localhost:3001/placeholderUtenti", {
            email:utenteUpdate
        }).then((response) => {
            if(response) {
                console.log(response.data[0])
                setNomeUtente(response.data[0]["nome"])
                setCognomeUtente(response.data[0]["cognome"])
                setTelefonoUtente(response.data[0]["telefono"])
                setPasswordUtente(response.data[0]["password"])
                if(response.data[0]["patente"]===0){
                    setPatente(false)
                } else {
                    setPatente(true)
                }
            }

        })
    },[utenteUpdate]);

    return (
        <>
            <h2 id="titoloInserimento" style={{width: "70%"}}>Operazioni riguardanti i clienti della piattaforma</h2>
            <InputLabel> Seleziona il tipo di operazione che intendi eseguire: </InputLabel>
            <Select name="operazione" className="select" required onChange={handleChangeOperazione} value={tipoOperazione}>
                <MenuItem value="inserimento">Inserimento</MenuItem>
                <MenuItem value="aggiornamento">Aggiornamento</MenuItem>
                <MenuItem value="cancellazione">Cancellazione</MenuItem>
            </Select>
            {tipoOperazione==="inserimento" ? <form style={{width: "77%"}} onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input1">Email</InputLabel>
                        <Input id="my-input2" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {setEmailUtente(e.target["value"]);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input3">Password</InputLabel>
                        <Input id="my-input4" autoComplete="on" pattern=".{8,12}" className="inputForm" aria-describedby="my-helper-text" type="password" onChange={(e) => {setPasswordUtente(e.target["value"]);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input5">Nome</InputLabel>
                        <Input id="my-input6" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {setNomeUtente(e.target["value"]);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input7">Cognome</InputLabel>
                        <Input id="my-input8" className="inputForm" aria-describedby="my-helper-text" type="text" onChange={(e) => {setCognomeUtente(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <InputLabel className="inputLabel" htmlFor="my-input9" >Telefono</InputLabel>
                        <Input id="my-input5" className="inputForm" aria-describedby="my-helper-text" type="number" onChange={(e) => {setTelefonoUtente(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                        <Input id="my-input10" className="inputForm" aria-describedby="my-helper-text" type="date" onChange={(e) => {setDataNascita(e.target.value);}} required/>
                    </FormControl>
                </FormGroup>
                <br/>
                <div>
                    <InputLabel className="labelCheck" htmlFor="my-input11"> Patente nautica </InputLabel>
                    <Checkbox
                        className="checkcheck"
                        checked={patente}
                        onChange={(e) => {setPatente(e.target.checked);}}
                        name="checkedB"
                        color="primary"
                    /> </div>
                <Button id="buttonOpera" type="submit" >
                    Aggiungi
                </Button>
            </form> : null}
            {tipoOperazione==="cancellazione" ?
                <div>
                    <br/>
                    <InputLabel id="demo-controlled-open-select-label">Seleziona l'utente che desideri eliminare:</InputLabel>
                    <Select value={utenteDelete} onChange={handleChangeUtente}>
                        <MenuItem value={""}>Nessuno</MenuItem>
                        {utenti.map((user,index) => <MenuItem key={index} value={user}>{user}</MenuItem>)}
                    </Select>
                    <br/>
                    <Button id="bottoneDelete" onClick={deleteUser}>Elimina</Button>
                </div>
                : null }
            {tipoOperazione==="aggiornamento" ?
                <form style={{width: "50%"}}>
                    <br/>
                    <InputLabel id="demo-controlled-open-select-label">Seleziona l'utente che vuoi aggiornare:</InputLabel>
                    <Select defaultValue={""} onChange={handleChangeUpdate}>
                        <MenuItem> Nessuna </MenuItem>
                        {utenti.map((user,index) => <MenuItem key={index} value={user}>{user}</MenuItem>)}
                    </Select>
                    <br/>
                    <div>
                        <FormGroup>
                            <FormControl>
                                <InputLabel className="inputLabel" htmlFor="my-input17">Nome</InputLabel>
                                <Input id="my-input18" value={nomeUtenteU} className="inputForm" aria-describedby="my-helper-text" type="text" placeholder={nomeUtente} onChange={(e) => {setNomeUtenteU(e.target.value);}} required/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormControl>
                                <InputLabel className="inputLabel" htmlFor="my-input17">Cognome</InputLabel>
                                <Input id="my-input18" value={cognomeUtenteU} className="inputForm" aria-describedby="my-helper-text" type="text" placeholder={cognomeUtente} onChange={(e) => {setCognomeUtenteU(e.target.value);}} required/>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormGroup>
                                <FormControl>
                                    <InputLabel className="inputLabel" htmlFor="my-input17">Password</InputLabel>
                                    <Input id="my-input18" value={passwordUtenteU} className="inputForm" aria-describedby="my-helper-text" type="password" placeholder={"*********"} onChange={(e) => {setPasswordUtenteU(e.target.value);}} required/>
                                </FormControl>
                            </FormGroup>
                            <FormControl>
                                <InputLabel className="inputLabel" htmlFor="my-input17">Telefono</InputLabel>
                                <Input id="my-input18" value={telefonoUtenteU} className="inputForm" aria-describedby="my-helper-text" type="text" placeholder={telefonoUtente} onChange={(e) => {setTelefonoUtenteU(e.target.value);}} required/>
                            </FormControl>
                        </FormGroup>
                        <br/>
                        <InputLabel className="labelCheck" htmlFor="my-input12"> Patente </InputLabel>
                        <Checkbox
                            className="checkcheck"
                            checked={patente}
                            onChange={(e) => {setPatente(e.target.checked);}}
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
    );
}