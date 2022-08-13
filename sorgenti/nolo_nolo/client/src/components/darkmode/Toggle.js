import React, {useEffect, useState} from 'react';
import '../../css/App/navbarUtente.css';
import {setTheme} from './themes';
import{ReactComponent as Sole} from "../homeUtente/navbarUtente/icons/luna.svg"
import{ReactComponent as Luna} from "../homeUtente/navbarUtente/icons/sole.svg"

function Toggle(props) {
    const [togClass, setTogClass] = useState('dark');

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light')
        } else {
            setTheme('theme-dark');
            setTogClass('dark')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark')
        } else {
            setTogClass('light')
        }
        },[]
    )

    return (
        <div >
            {
                togClass === "light" ?
                    <DropdownItem dropdown={props.dropdown} leftIcon={<Luna />} handleOnClick={handleOnClick}>Dark Mode</DropdownItem>
                    :
                    <DropdownItem dropdown={props.dropdown} leftIcon={<Sole />} handleOnClick={handleOnClick}>Light Mode</DropdownItem>
            }
        </div>
    )
}

export default Toggle;

function DropdownItem(props) {
    if(props.dropdown===true){
        return (
            <span className="menu-item" style={{ textDecoration: 'none' }} onClick={props.handleOnClick}>
            <span className="icon-button">{props.leftIcon}</span>
                {props.children}
        </span>
        );
    } else{
        return (
            <span id="darkmode" className="menu-item" style={{ textDecoration: 'none' }} onClick={props.handleOnClick}>
            <span className="icon-button">{props.leftIcon}</span>
                {props.children}
        </span>
        );
    }

}