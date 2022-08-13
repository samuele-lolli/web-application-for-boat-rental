import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {ReactComponent as Avatar} from "../icons/user.svg";
import {ReactComponent as CogIcon} from "../icons/cog.svg";
import {ReactComponent as ArrowIcon} from "../icons/arrow.svg";
import "../../../../css/App/dropdownContatti.css"

export default function DropdownContatti() {
    //state per gestire la navigazione con le CSS transition
    const [activeMenu, setActiveMenu] = useState('main');

    //state per settare (in modo dinamico) l'altezza del dropdown contatti con le CSS transition
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    //useEffect per settare l'altezza dropdown in maniera dinamica
    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    //funzione richiamata quando i componenti dropdown vengono montati per calcolare e settare altezza.
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    //funzione per creare vari item all'interno del dropdown menu.
    function DropdownItem(props) {
        return (
            <span className="menu-item" style={{ textDecoration: 'none' }} onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </span>
        );
    }

    return (
        <div className="dropdown" id="droppContatti" style={{ height: menuHeight+35 }} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={400}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem
                        goToMenu="tecnica"
                        leftIcon={<Avatar/>}>
                        Assistenza Tecnica
                    </DropdownItem>
                    <DropdownItem
                        leftIcon={<CogIcon />}
                        goToMenu="amministrativa">
                        Assistenza Amministrativa
                    </DropdownItem>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'tecnica'}
                timeout={400}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h6>Assistenza Tecnica</h6>
                    </DropdownItem>
                    <ul>
                        <li><b>Samuele Lolli</b>: samuele.lolli@gmail.com</li>
                    </ul>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'amministrativa'}
                timeout={400}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h6>Assistenza Amministrativa</h6>
                    </DropdownItem>
                    <ul>
                        <li><b>Marco Dal Pian</b>: marco.dalpian@gmail.com</li>
                    </ul>
                </div>
            </CSSTransition>
        </div>
    );
}