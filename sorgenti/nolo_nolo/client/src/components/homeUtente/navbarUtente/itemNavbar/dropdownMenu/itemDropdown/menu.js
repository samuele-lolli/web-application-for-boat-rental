import {CSSTransition} from "react-transition-group";
import React from "react";
import {ReactComponent as ChevronIcon} from "../../../icons/chevron.svg";
import {ReactComponent as Avatar} from "../../../icons/user.svg";
import {NavDropdown} from "react-bootstrap";
import {ReactComponent as Out} from "../../../icons/out.svg";
import {ReactComponent as Prenotazione} from "../../../icons/prenotazione.svg";
import {ReactComponent as Stats} from "../../../icons/stats.svg";
import Toggle from "../../../../../darkmode/Toggle";

export default function Menu(props) {

    return (
        <CSSTransition
            in={props.activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={props.calcHeight}>
            <div className="menu">
                <props.ItemDropdown
                    rightIcon={<ChevronIcon />}
                    goToMenu="profilo"
                    leftIcon={<Avatar/>}>
                    Il mio Profilo
                </props.ItemDropdown>
                <props.ItemDropdown
                    leftIcon={<Prenotazione />}
                    rightIcon={<ChevronIcon />}
                    goToMenu="book">
                    Prenotazioni
                </props.ItemDropdown>
                <props.ItemDropdown
                    leftIcon={<Stats />}
                    rightIcon={<ChevronIcon />}
                    goToMenu="stats">
                    Statistiche
                </props.ItemDropdown>
                <Toggle dropdown={true}/>
                <NavDropdown.Divider />
                <props.ItemDropdownLogout leftIcon={<Out/>}>Esci</props.ItemDropdownLogout>
            </div>
        </CSSTransition>
    )
}