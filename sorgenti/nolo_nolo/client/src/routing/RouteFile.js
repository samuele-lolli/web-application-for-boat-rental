import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "../components/home/home.js";
import App from "../components/homeUtente/App.js";
import {ToastProvider} from "react-toast-notifications";
import HomeAdmin from "../components/homeAdmin/homeAdmin";

export default function RouteFile() {
    const auth = localStorage.getItem("auth")
    const authAdmin = localStorage.getItem("authAdmin")
    return (
        <BrowserRouter>
            <Switch>
                <ToastProvider
                    placement="bottom-right"
                    autoDismiss
                    autoDismissTimeout={6000}
                >
                    <Route exact path = '/' component={Home}/>
                    {auth ? <Route exact path='/home/:userID' component={App}/> : null /*<p className="text-center">Effettua l'accesso per poter noleggiare una barca! </p>*/}
                    {authAdmin ? <Route exact path="/admin/:adminID" component={HomeAdmin}/> : null}
                </ToastProvider>
            </Switch>
        </BrowserRouter>
    );
}

