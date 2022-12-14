import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './utils/reportWebVitals';
import  "bootstrap/dist/css/bootstrap.min.css" ;
import RouteFile from "./routing/RouteFile";

//con avviso FindDomNode dovuto a librerie di terze parti
/*ReactDOM.render(
    <React.StrictMode>
        <RouteFile />
    </React.StrictMode>,
    document.getElementById("root")
);*/

//senza avviso FindDomNode
ReactDOM.render(
    <RouteFile />,
     document.getElementById("root")
 );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
