import React, {useState} from 'react';
import {Button, Modal, Row, Col, InputGroup} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Axios from "axios";
import "../../../css/home/modali.css";
import {useToasts} from "react-toast-notifications";

function RegisterModal(props) {

    Axios.defaults.withCredentials = true;
    const [emailReg, setEmailReg] = useState("");   //HOOKS STATE
    const [passwordReg, setPasswordReg] = useState("");
    const [passwordReg1, setPasswordReg1] = useState("");
    const [nomeReg, setNomeReg] = useState("");
    const [cognomeReg, setCognomeReg] = useState("");
    const [telefonoReg, setTelefonoReg] = useState("");
    const [dataNascitaReg, setDataNascitaReg] = useState("");
    const [patenteReg, setPatenteReg] = useState(false);

    const { addToast } = useToasts();

    //funzione per inserire la registrazione utente
    const onRegFormSubmit = async (e) => {
        e.preventDefault();
        if (passwordReg !== passwordReg1) {
            addToast('Le password non corrispondono.', { appearance: 'warning'})
        } else {
            Axios.post("http://localhost:3001/register", {
                emailReg: emailReg,
                passwordReg: passwordReg,
                passwordReg1: passwordReg1,
                nomeReg: nomeReg,
                cognomeReg: cognomeReg,
                telefonoReg: telefonoReg,
                dataNascitaReg: dataNascitaReg,
                patenteReg: patenteReg,
            }).then((response) => {
                if(response.data.message){
                    addToast('Questa email è gia associata ad un account!', { appearance: 'warning'})
                }
                else {
                    props.showLog();
                    props.onHide();
                    addToast('La registrazione è avvenuta con successo! Accedi ora.', { appearance: 'success'})
                }
            });

        }};

    //per andare al login modal
    const switchModal = () => {
        props.onHide()
        props.showLog();
    }

    return (
        <Modal className="modals" show={props.show} onHide={props.onHide} dialogClassName="modal-lg modal-full" centered>
            <Modal.Body>
                <Row className="d-flex align-items-stretch">
                    <Col className="col-12 col-lg-6 order-2 order-lg-1 " id="sfondoRegistrazione">
                        <Row className="align-items-center" id="testoRegistrazione">
                            <Col>
                                <p className="text-light text-center testoModaleReg">
                                    Sei già registrato sul nostro sito?
                                </p>
                                <div className="p-4">
                                    <button id="botton" onClick={switchModal} className="btn btn-outline-light btn-block">
                                        Accedi al tuo account.
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col className="col-12 col-lg-6 order-1 order-lg-2 bg-white">
                        <div className="p-4">
                            <Modal.Header>
                                <Modal.Title>Registrati!</Modal.Title>
                                <button type="button" className="close" onClick={props.onHide}>×</button>
                            </Modal.Header>
                            <Form onSubmit={onRegFormSubmit}>
                                <Row>
                                    <Form.Group className="col-6" controlId="formBasicName">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control name="nomeReg" type="text" required
                                                      placeholder="Inserisci il nome"
                                                      onChange={(e) => {setNomeReg(e.target.value);}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-6" controlId="formBasicLastName">
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control name="cognomeReg" type="text" required
                                                      placeholder="Inserisci il cognome"
                                                      onChange={(e) => {setCognomeReg(e.target.value);}}
                                        />
                                    </Form.Group>
                                </Row>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Indirizzo email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="far fa-envelope"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control name="emailReg" type="email" required
                                                      placeholder="Inserisci l'email"
                                                      onChange={(e) => {setEmailReg(e.target.value);}}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control className="cc-number" name="passwordReg" type="password" pattern=".{8,12}" required
                                                      placeholder="Password" autoComplete="on"
                                                      onChange={(e) => {setPasswordReg(e.target.value);}}
                                        />
                                    </InputGroup>
                                    <small id="smallPassword" className="text-muted">La password deve essere compresa tra gli <span id="condizioni">8 e i 12 caratteri.</span></small><br/>

                                </Form.Group>
                                <Form.Group controlId="formBasicPassword2">
                                    <Form.Label>Conferma Password</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control className="cc-number" name="passwordReg1" type="password" required
                                                      placeholder="Password" autoComplete="on" pattern=".{8,12}"
                                                      onChange={(e) => {setPasswordReg1(e.target.value);}}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicBirthDate">
                                    <Form.Label>Data di nascita</Form.Label>
                                    <Form.Control name="dataNascitaReg" type="date" required
                                                  onChange={(e) => {setDataNascitaReg(e.target.value);}}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone">
                                    <Form.Label>Cellulare</Form.Label>
                                    <Form.Control name="telefonoReg" type="number" required
                                                  placeholder="xxx-xxx-xxxx"
                                                  onChange={(e) => {setTelefonoReg(e.target.value);}}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicLicense">
                                    <Form.Check
                                        name="patenteReg"
                                        type='checkbox'
                                        label="Possiedi una Patente Nautica?"
                                        checked={patenteReg}
                                        onChange={(e) => {setPatenteReg(e.target.checked);}}
                                    />
                                </Form.Group>
                                <Button id="bottoneRegistrazione" type="submit" onClick={props.showToast} block>
                                    Registrati
                                </Button>
                                <br/>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default RegisterModal