import {Navbar,Nav} from "react-bootstrap";
import React, {useState} from "react";
import RegisterModal from "./registerModal";
import LoginModal from "./loginModal";
import Toggle from '../../darkmode/Toggle';
import "../../../css/App/dropdownMenu.css";
import AdminLoginModal from "./adminLoginModal";

export default function BarNav(props) {
    const [showModLog, setShowModLog] = useState(false);  //HOOKS STATE
    const [showModReg, setShowModReg] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const isAuthenticated = localStorage.getItem("auth")
    const isAuthenticatedAdmin = localStorage.getItem("authAdmin")
    const idUser = localStorage.getItem("idUser")
    const idAdmin = localStorage.getItem("idAdmin")

    // funzioni per aprire i modali
    const toggleModalLog = () => {
        setShowModLog(!showModLog)
    };
    const toggleModalReg = () => {
        setShowModReg(!showModReg)
    };
    const toggleModalAdmin = () => {
        setShowAdmin(!showAdmin)
    };

    //funzioni per tornare dalla home alla pagina personale
    const backYourPage = () => {
        window.location.href = "http://localhost:3000/home/userID=" +idUser
    };
    const backYourPageAdmin = () => {
        window.location.href = "http://localhost:3000/admin/adminID=" + idAdmin
    };
    return (
        <Navbar id="navbar" collapseOnSelect fixed="top">
            <Nav>
                <Nav.Link href="#layout"> </Nav.Link>
                <a href={"#layout"} className="menu-item" style={{textDecoration: 'none'}}>
                    <i className="fas fa-ship"> </i>&nbsp;Home
                </a>
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <a id="chisiamo" href={"#jumbo1"} className="menu-item" style={{textDecoration: 'none'}}>
                        Chi siamo?
                    </a>
                    <a id="dovesiamo" href={"#jumbo2"} className="menu-item" style={{textDecoration: 'none'}}>
                        Dove operiamo?
                    </a>
                </Nav>
                <Nav>
                    <Toggle />
                    {isAuthenticated || isAuthenticatedAdmin ? null :
                        <span className="menu-item" style={{textDecoration: 'none'}} onClick={toggleModalLog}>
                        Login
                    </span>}
                    {isAuthenticated || isAuthenticatedAdmin ? null :
                        <span className="menu-item" style={{textDecoration: 'none'}} onClick={toggleModalReg}>
                        Register
                    </span>}
                    {isAuthenticated ?
                        <span className="menu-item" style={{textDecoration: 'none'}} onClick={backYourPage}>
                        Torna alla tua pagina.
                    </span> : null}
                    {isAuthenticatedAdmin ?
                        <span className="menu-item" style={{textDecoration: 'none'}} onClick={backYourPageAdmin}>
                        Torna alla tua pagina.
                    </span> : null}
                </Nav>
            </Navbar.Collapse>
            <div>
                <RegisterModal show={showModReg}
                               onHide={toggleModalReg}
                               showLog={toggleModalLog}
                               showToast={props.showToast}
                />

                <LoginModal show={showModLog}
                            onHide={toggleModalLog}
                            showReg={toggleModalReg}
                            showAdmin={toggleModalAdmin}
                />
                <AdminLoginModal
                    show={showAdmin}
                    onHide={toggleModalAdmin}
                />
            </div>
        </Navbar>
    )
};