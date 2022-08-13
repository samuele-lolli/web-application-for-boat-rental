import React, {useState} from 'react';
import {Button, Modal, Row, Col,InputGroup} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Axios from "axios";
import "../../../css/home/modali.css";
import {useToasts} from "react-toast-notifications";

function AdminLoginModal(props){
    Axios.defaults.withCredentials = true;
    const [emailLog, setEmailLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");
    const { addToast } = useToasts();

    //login per l'admin
    const loginAdmin = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/loginAdmin", {
            emailLog: emailLog,
            passwordLog: passwordLog,
        }).then((response) => {
            console.log(response.data)
            if(response.status===200) {
                if (response.data.message) {
                    addToast(response.data.message, { appearance: 'warning'})
                } else {
                    let idAdmin = response.data[0].id;
                    localStorage.setItem("authAdmin", "true");
                    localStorage.setItem("idAdmin", idAdmin);
                    window.location.href = "http://localhost:3000/admin/adminID=" +idAdmin;
                }
            }
        });
    };


    return (
        <Modal className="modals" show={props.show} onHide={props.onHide} dialogClassName="modal-lg modal-full" centered>
            <Modal.Body>
                <Row className="d-flex align-items-stretch">
                    <Col className="col-12 col-lg-6 order-2 order-lg-1 bg-primary" id="sfondoLogin">
                        <Row className="align-items-center" id="testoLogin">
                            <Col>

                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-12 col-lg-6 order-1 order-lg-2 bg-white">
                        <div className="p-4">
                            <Modal.Header>
                                <Modal.Title >
                                    NoloBoats Login Admin
                                </Modal.Title>
                                <button type="button" className="close" onClick={props.onHide}>×</button>
                            </Modal.Header>
                            <Form onSubmit={loginAdmin}>
                                <Form.Group className="mt-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="far fa-envelope"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control name="email" type="email" placeholder="Enter email" required
                                                      onChange={(e) => {
                                                          setEmailLog(e.target.value);
                                                      }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fas fa-lock"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control className="cc-number" name="password" type="password" pattern=".{8,12}" placeholder="Password" required
                                                      autoComplete="on"
                                                      onChange={(e) => {
                                                          setPasswordLog(e.target.value);
                                                      }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <br/>
                                <Button type="submit" id="bottoneLogin" block>
                                    Loggati
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default AdminLoginModal