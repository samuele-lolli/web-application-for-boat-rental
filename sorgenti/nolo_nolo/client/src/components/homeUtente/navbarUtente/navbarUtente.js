import React, {useEffect, useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import Axios from "axios";
import DropdownContatti from "./itemNavbar/dropdownContatti";
import {ReactComponent as Cart} from "./icons/cart.svg";
import DropdownCarrello from "./itemNavbar/dropdownCarrello";
import {ReactComponent as CaretIcon} from "./icons/caret.svg";
import DropdownMenu from "./itemNavbar/dropdownMenu/dropdownMenu";
import {ClickAwayListener} from "@material-ui/core";

export default function NavbarUtente(props) {
    const [emailN, setEmailN] = useState("");
    const idUser = localStorage.getItem("idUser");

    const[openContatti, setOpenContatti]=useState(false);
    const[openCarrello, setOpenCarrello]=useState(false);
    const[openMenu, setOpenMenu]=useState(false);

    Axios.defaults.withCredentials = true;

    //useEffect per settare la mail quando il componente navbar viene montato la prima volta
    useEffect(() => {     //HOOKS EFFECT
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                setEmailN(response.data.user[0]["email"]);
            }
        });
    }, []);

    //per aggiornare il carrello coi dati del localStorage quando si aggiorna LA PRIMA VOLTA la pagina.
    useEffect(() => {
        let localCart = localStorage.getItem("cart");
        localCart = JSON.parse(localCart);
        if (localCart)
            props.setCarrello(localCart)
    }, [])

    //funzione per gestire il clic esterno al dropdown contatti della navbar
    const handleBlurContatti = (e) => {
        const currentTarget = e.currentTarget;
        if (!currentTarget.contains(document.activeElement)) {
            setOpenContatti(true);
        }else{
            setOpenContatti(false);
        }
    };

    //funzione per gestire il clic esterno al dropdown carrello della navbar
    const handleBlurCarrello = (e) => {
        const currentTarget = e.currentTarget;
        if (!currentTarget.contains(document.activeElement)) {
            setOpenCarrello(true);
        }else{
            setOpenCarrello(false);
        }
    };

    //funzione per gestire il clic esterno al dropdown menu della navbar
    const handleBlurMenu = (e) => {
        const currentTarget = e.currentTarget;
        if (!currentTarget.contains(document.activeElement)) {
            setOpenMenu(true);
        }else{
            setOpenMenu(false);
        }
    };

    return (
        <Navbar id="diocane" fixed="top">
            <Navbar.Brand href={"/home/userID=" + idUser} id="titolo1"> <i className="fas fa-ship"> </i> NoloBoats</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                >
                    <NavItemContatti
                        handleBlurContatti={handleBlurContatti}
                        openContatti={openContatti}
                        setOpenContatti={setOpenContatti}
                    >
                        <DropdownContatti> </DropdownContatti>
                    </NavItemContatti>
                </Nav>
                <Navbar.Text id="emaill">
                    Signed in as: <span id="a"> {emailN}&nbsp;</span>
                </Navbar.Text>
                <NavItemCarrello icon={<Cart />}
                                 handleBlurCarrello={handleBlurCarrello}
                                 openCarrello={openCarrello}
                                 setOpenCarrello={setOpenCarrello}>
                    <DropdownCarrello
                        setOpenCarrello={setOpenCarrello}
                        carrello={props.carrello}
                        setCarrello={props.setCarrello}
                    > </DropdownCarrello>
                </NavItemCarrello>
                <NavItemMenu icon={<CaretIcon />}
                             handleBlurMenu={handleBlurMenu}
                             openMenu={openMenu}
                             setOpenMenu={setOpenMenu}
                >
                    <DropdownMenu> </DropdownMenu>
                </NavItemMenu>
            </Navbar.Collapse>
        </Navbar>
    );
}

//funzione per costruire l'item dei contatti contenuto nella navbar
function NavItemContatti(props) {  //wrapper
    return (
        <ClickAwayListener onClickAway={props.handleBlurContatti}>
            <li className="nav-item">
                <span className="icon-buttonContatti" style={{ textDecoration: 'none' }} onClick={() => props.setOpenContatti(!props.openContatti)}>
                    Contatti
                </span>
                {props.openContatti && props.children}
            </li>
        </ClickAwayListener>
    );
}

//funzione per costruire l'item del carrello contenuto nella navbar
function NavItemCarrello(props) {  //wrapper
    return (
        <ClickAwayListener onClickAway={props.handleBlurCarrello} >
            <li className="nav-item">
                <span className="icon-button" onClick={() => props.setOpenCarrello(!props.openCarrello)}>
                    {props.icon}
                </span>
                {props.openCarrello && props.children}
            </li>
        </ClickAwayListener>

    );
}

//funzione per costruire l'item del menu contenuto nella navbar
function NavItemMenu(props) {  //wrapper
    return (
        <ClickAwayListener onClickAway={props.handleBlurMenu}>
            <li className="nav-item">
                <span className="icon-button" onClick={() => props.setOpenMenu(!props.openMenu)}>
                    {props.icon}
                </span>
                {props.openMenu && props.children}
            </li>
        </ClickAwayListener>
    );
}