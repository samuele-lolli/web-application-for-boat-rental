import React, {useEffect, useState} from 'react';
import { DatePicker, Space } from 'antd';
import "antd/dist/antd.css";
import moment from "moment";
import "../../css/App/calendario.css"
import Axios from "axios";
import {useToasts} from "react-toast-notifications";

const { RangePicker } = DatePicker;

export default function Calendario(props) {

    const { addToast } = useToasts();

    //tariffa barca
    const[tariffa, setTariffa]=useState();

    //useffect per settare la tariffa
    const idBarca=props.idBarca
    useEffect(() => {
        Axios.post("http://localhost:3001/dropdown2", {
            idBarca: idBarca,
        }).then((response) => {
            if(response) {
                setTariffa(response["data"][0]["tariffa"]);
            }
        });
    }, [idBarca]);

    //funzione per controllo selezione date
    const controlla = async (date) => {
        if(!props.click){
            let h=0;
            if(date!==null) {
                let controllo = getDates(date[0], date[1])
                for (let i = 0; i < controllo.length; i++) {
                    controllo[i] = props.convertDate(controllo[i]);
                }
                console.log(controllo)
                for (let i = 0; i < props.carrello.length; i++) {
                    if (props.carrello[i].value["id"] === props.idBarca) {
                        let difference = props.carrello[i].value["date"].filter(x => !controllo.includes(x));
                        console.log(difference)
                        if (difference.length !== props.carrello[i].value["date"].length) {
                            props.disattiva()
                            addToast('Per cortesia, non comprendere nella selezione date non disponibili.',
                                {appearance: "error"});
                            h = 1;
                        }
                    }
                }
            }
            if(date!==null && h===0){
                let dateArray = getDates(date[0], date[1]);
                for (let i = 0; i < dateArray.length; i ++ ) {
                    dateArray[i]=props.convertDate(dateArray[i]);
                }
                await Axios.post("http://localhost:3001/controlla", {
                    dateArray: dateArray,
                    idBarca: props.idBarca,
                }).then((response) => {
                    //date selezionate non corrette
                    if(response.data.message==="ERR") {
                        addToast('Per cortesia, non comprendere nella selezione date non disponibili.',
                            { appearance: "error"});
                    }
                    //date selezionate corrette e quindi viene attivato il bottone aggiungi al carrello e settato il totale e periodo selezionato
                    if(response.data.message==="OK"){
                        props.attiva();
                        props.settaTot(dateArray.length*tariffa, dateArray);
                    }
                });
            } else{
                props.disattiva();
            }
        }
    }

    //funzione per aggiungere un giorno ad un giorno dato in input
    Date.prototype.addDays = function(days) {
        //non togliere il commento sotto, serve per togliere un warning
        /*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
        let dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    //da data inizio e fine, a range delle date
    function getDates(startDate, stopDate) {
        let dateArray = [];
        let currentDate = new Date(startDate);
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    //funzione che disabilita le date passate e quelle non disponibili(disp)
    function disabledDate(current) {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        if(!props.admin){
            if(current.isBefore(yesterday)){
                return true;
            }
        }
        for (let i = 0; i < props.disp["data"].length; i++) {
            if(current.date() === moment(props.disp["data"][i]).date() && current.month() === moment(props.disp["data"][i]).month()){
                return true;
            }
        }
        return false;
    }

    return (
        <Space direction="vertical" size={12}>
            <RangePicker
                dropdownClassName="calendario"
                size="middle"
                onChange={controlla}
                disabledDate={disabledDate}
            />
        </Space>
        //per cambiare mese basta clickare sul mese in alto
    );
}