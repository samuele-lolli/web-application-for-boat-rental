import {CSSTransition} from "react-transition-group";
import {ReactComponent as ArrowIcon} from "../../../icons/arrow.svg";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import Axios from "axios";
import {Button} from "@material-ui/core";

export default function Profilo(props) {

    //state per contenere i placeholder nel profilo utente
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [data, setData] = useState("");
    const [telefono, setTelefono] = useState("");

    //useEffect per settare i placeholder nel profilo utente
    useEffect(() => {
        Axios.post("http://localhost:3001/placeholder", {
            id: props.id,
        }).then((response) => {
            console.log(response.data.user[0]);
            setEmail(response.data.user[0]["email"]);
            setNome(response.data.user[0]["nome"]);
            setCognome(response.data.user[0]["cognome"]);
            let nascita = new Date(response.data.user[0]["dataNascita"]);
            setData(nascita.toString());
            setTelefono(response.data.user[0]["telefono"]);
        })
    },[props.id]);

    return (
        <CSSTransition
            in={props.activeMenu === 'profilo'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={props.calcHeight}>
            <div className="menu">
                <props.ItemDropdown goToMenu="main" leftIcon={<ArrowIcon />}>
                    <h4>Il mio profilo</h4>
                </props.ItemDropdown>
                <Form>
                    <Form.Group controlId="formBasicPassword0">
                        <b>Inserisci la password per modificare i tuoi dati:</b>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control className="cc-number" name="password0" type="password" required pattern=".{8,12}"
                                          placeholder="********" autoComplete="on" disabled = {(props.disabledOld)? "disabled" : ""}
                                          onChange={(e) => {props.setPassword0(e.target.value);}}
                            />
                            {props.disabledOld===true ? null : <Button id="bottoneOldPass" onClick={props.update}> <i className="fas fa-sign-in-alt"> </i> </Button>}
                        </InputGroup>
                    </Form.Group>
                    <h4>I tuoi dati:</h4>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Indirizzo email</Form.Label>
                        <Form.Control name="emailU" type="email"
                                      placeholder={email}  disabled = {(props.disabled)? "disabled" : ""}
                                      onChange={(e) => {props.setEmailU(e.target.value);}}
                        />
                    </Form.Group>
                    {props.disabledOld && <Form.Group controlId="formBasicPassword">
                        <Form.Label>Nuova Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control className="cc-number" name="password" type="password" required pattern=".{8,12}"
                                          placeholder="********" autoComplete="on" disabled = {(props.disabled)? "disabled" : ""}
                                          onChange={(e) => {props.setPassword(e.target.value);}}
                            />
                        </InputGroup>
                    </Form.Group>}
                    {props.disabledOld && <Form.Group controlId="formBasicPassword2">
                        <Form.Label>Conferma Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control className="cc-number" name="password1" required type="password"
                                          placeholder="********" autoComplete="on" pattern=".{8,12}" disabled = {(props.disabled)? "disabled" : ""}
                                          onChange={(e) => {props.setPassword1(e.target.value);}}
                            />
                        </InputGroup>
                    </Form.Group>}
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="nomeU" type="text"
                                      placeholder={nome} disabled = {(props.disabled)? "disabled" : ""}
                                      onChange={(e) => {props.setNomeU(e.target.value);}}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control name="cognomeU" type="text"
                                      placeholder={cognome} disabled = {(props.disabled)? "disabled" : ""}
                                      onChange={(e) => {props.setCognomeU(e.target.value);}}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicBirthDate">
                        <Form.Label>Data di nascita</Form.Label>
                        {props.disabled && <Form.Control name="data" type="text" disabled={"disabled"}
                                                         placeholder={data.substring(0, 15)}
                        />}
                        {!props.disabled && <Form.Control name={data} type="date"
                                                          onChange={(e) => {props.setDataNascitaU(e.target.value);}}
                        />}

                    </Form.Group>
                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Cellulare</Form.Label>
                        <Form.Control name="telefonoReg" type="number"
                                      placeholder={telefono} disabled = {(props.disabled)? "disabled" : ""}
                                      onChange={(e) => {props.setTelefonoU(e.target.value);}}
                        />
                    </Form.Group>
                </Form>
                {props.disabledOld && <props.ItemDropdownSalva> <b>Salva modifiche</b> </props.ItemDropdownSalva>}
            </div>
        </CSSTransition>
    )
}