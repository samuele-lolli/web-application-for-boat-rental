import React from 'react';
import "../../css/App/tabs.css"
import "../../css/App/app.css"
import AppBar from '@material-ui/core/AppBar';
import {Tabs, Tab, makeStyles} from '@material-ui/core';

//stili per material ui
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "transparent",
    },
});
export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0); //state che memorizza la scelta della tab

    //funzione che setta value alla scelta della tab appena fatta
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className="backtabss">
                <Tabs className="tabss" TabIndicatorProps={{style: {background: '#7B68EE'}}} value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable"
                      scrollButtons="off">
                    <Tab className="tabb" disableRipple label="Barche a motore" onClick={() => props.selectButtonGroup("Barche a motore")} {...a11yProps(0)} />
                    <Tab className="tabb" label="Barche a vela" onClick={() => props.selectButtonGroup("Barche a vela")} {...a11yProps(1)} />
                    <Tab className="tabb" label="Barche non alimentate" onClick={() => props.selectButtonGroup("Barche non alimentate")} {...a11yProps(2)} />
                    <Tab className="tabb" label="Accessori" onClick={() => props.selectButtonGroup("Accessori")} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <br/>
        </div>
    );
}