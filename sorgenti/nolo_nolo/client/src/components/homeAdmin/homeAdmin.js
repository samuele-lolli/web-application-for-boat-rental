import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles} from '@material-ui/core/styles';
import Axios from "axios";
import FormAdmin from "./formAdmin";
import FormAdminClienti from "./formAdminClienti";
import PrenotazioniAdmin from "./prenotazioniAdmin";
import SidebarAdmin from "./sidebarAdmin";
import AppBarAdmin from "./appBarAdmin";
import {Grid} from "@material-ui/core";

//stili per material ui
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function HomeAdmin() {
    Axios.defaults.withCredentials = true;
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();

    //visualizzazione navbar pc e tablet/mobile
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
      <>
          <div className={classes.root}>
              <CssBaseline/>
              <AppBarAdmin
                  handleDrawerToggle = {handleDrawerToggle}
              />
             <SidebarAdmin
                handleDrawerToggle = {handleDrawerToggle}
                mobileOpen = {mobileOpen}
             />
              <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Grid container spacing={3}>
                      <Grid item xs>
                          <FormAdmin />
                      </Grid>
                      <Grid item xs>
                          <FormAdminClienti />
                      </Grid>
                  </Grid>
                  <br/>
                <PrenotazioniAdmin/>

              </main>
          </div>
      </>
    );
};