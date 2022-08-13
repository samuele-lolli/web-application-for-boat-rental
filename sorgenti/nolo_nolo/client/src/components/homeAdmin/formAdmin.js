import React, {useState} from "react";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import "../../css/admin/formAdmin.css"
import InserisciBarche from "./inserisciBarche";
import EliminaBarche from "./eliminaBarche";
import AggiornaBarche from "./aggiornaBarche";

export default function FormAdmin() {
    //proprieta' delle barche
    const[nomeBarca, setNomeBarca] = useState("")
    const[descrizioneBarca, setDescrizioneBarca] = useState("")
    const[metratura, setMetratura] = useState("")
    const[posti, setPosti] = useState("")
    const[cavalli, setCavalli] = useState("")
    const[immagine, setImmagine] = useState("")
    const[patente, setPatente] = useState(false)
    const[disponibilita, setDisponibilita] = useState(false)
    const[prezzo, setPrezzo] = useState("")
    const[luogo, setLuogo] = useState("")
    const[condizioni, setCondizioni] = useState("")

    //tipo di barche e operazione
    const [tipoOperazione, setTipoOperazione] = useState("inserimento")
    const [tipoBarca, setTipoBarca] = useState("motore")

    //array per mostrare le categorie di barche
    const[barcheMotore, setBarcheMotore] = useState([])
    const[barcheVela, setBarcheVela] = useState([])
    const[barcheNonAlimentata, setBarcheNonAlimentata] = useState([])
    const[accessori, setAccessori] = useState([])

    //per cambiare l'operazione nella select
    const handleChangeOperazione = (event) => {
        setTipoBarca("motore")
        setDisponibilita(false)
        setPatente(false)
        setTipoOperazione(event.target.value);
    };

    //per cambiare la categoria di barca
    const handleChangeCategoria = (event) => {
        setTipoBarca(event.target.value);
    };

    return (
        <>
            <h2 id="titoloInserimento" style={{width: "77%"}}>Operazioni sulle barche e accessori della piattaforma</h2>
            <InputLabel id="inserimento"> Seleziona il tipo di operazione che intendi eseguire: </InputLabel>
            <Select name="operazione" className="select" required onChange={handleChangeOperazione} value={tipoOperazione}>
                <MenuItem value="inserimento">Inserimento</MenuItem>
                <MenuItem value="aggiornamento">Aggiornamento</MenuItem>
                <MenuItem value="cancellazione">Cancellazione</MenuItem>
            </Select>
            <InserisciBarche
                tipoOperazione={tipoOperazione}
                tipoBarca = {tipoBarca}
                nomeBarca = {nomeBarca}
                setNomeBarca = {setNomeBarca}
                descrizione = {descrizioneBarca}
                setDescrizioneBarca = {setDescrizioneBarca}
                metratura = {metratura}
                setMetratura = {setMetratura}
                posti = {posti}
                setPosti = {setPosti}
                cavalli = {cavalli}
                setCavalli = {setCavalli}
                immagine = {immagine}
                setImmagine = {setImmagine}
                prezzo = {prezzo}
                setPrezzo = {setPrezzo}
                luogo = {luogo}
                setLuogo={setLuogo}
                condizioni = {condizioni}
                setCondizioni = {setCondizioni}
                patente = {patente}
                setPatente = {setPatente}
                disponibilita = {disponibilita}
                setDisponibilita = {setDisponibilita}
                handleChangeCategoria = {handleChangeCategoria}
            />

            <EliminaBarche
                tipoOperazione = {tipoOperazione}
                barcheMotore = {barcheMotore}
                setBarcheMotore = {setBarcheMotore}
                barcheVela = {barcheVela}
                setBarcheVela = {setBarcheVela}
                barcheNonAlimentata = {barcheNonAlimentata}
                setBarcheNonAlimentata = {setBarcheNonAlimentata}
                accessori = {accessori}
                setAccessori = {setAccessori}
            />

            <AggiornaBarche
                tipoOperazione={tipoOperazione}
                tipoBarca = {tipoBarca}
                barcheMotore = {barcheMotore}
                setBarcheMotore = {setBarcheMotore}
                barcheVela = {barcheVela}
                setBarcheVela = {setBarcheVela}
                barcheNonAlimentata = {barcheNonAlimentata}
                setBarcheNonAlimentata = {setBarcheNonAlimentata}
                accessori = {accessori}
                setAccessori = {setAccessori}
                nomeBarca = {nomeBarca}
                setNomeBarca = {setNomeBarca}
                descrizioneBarca = {descrizioneBarca}
                setDescrizioneBarca = {setDescrizioneBarca}
                metratura = {metratura}
                setMetratura = {setMetratura}
                posti = {posti}
                setPosti = {setPosti}
                cavalli = {cavalli}
                setCavalli = {setCavalli}
                immagine = {immagine}
                setImmagine = {setImmagine}
                prezzo = {prezzo}
                setPrezzo = {setPrezzo}
                setLuogo={setLuogo}
                condizioni = {condizioni}
                setCondizioni = {setCondizioni}
                patente = {patente}
                setPatente = {setPatente}
                disponibilita = {disponibilita}
                setDisponibilita = {setDisponibilita}
                handleChangeCategoria = {handleChangeCategoria}
            />
        </>
    );
}