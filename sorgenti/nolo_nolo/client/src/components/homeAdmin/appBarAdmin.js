import React, {useEffect, useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Axios from "axios";

//stili material ui
const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer + 1,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
}));

export default function AppBarAdmin(props) {
    const classes = useStyles();
    const [emailAdmin, setEmailAdmin] = useState("")
    const adminID = localStorage.getItem("idAdmin")

    //per settare la mail dell'admin
    useEffect(() => {
        Axios.get("http://localhost:3001/loginAdmin").then((response) => {
            if (response.data.loggedIn === true) {
                setEmailAdmin(response.data.admin[0]["email"]);
            }
        });
    }, []);

    //logout admin, pulisce localstorage
    const logout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('authAdmin');
        localStorage.removeItem('idAdmin');
        await Axios.post('http://localhost:3001/logoutAdmin', {id: adminID}, {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    window.location.href = "/";
                }
            })
    }

   return(
       <AppBar position="fixed" className={classes.appBar}>
           <Toolbar>
               <IconButton
                   color="inherit"
                   aria-label="open drawer"
                   edge="start"
                   onClick={props.handleDrawerToggle}
                   className={classes.menuButton}
               >
                   <MenuIcon />
               </IconButton>
               <Typography style={{ flex: 1 }}  variant="h6" noWrap>
                   NoloBoats, il back-office.
               </Typography>
               <Typography  variant="caption" noWrap>
                   {emailAdmin}
               </Typography>
               <Button onClick={logout} color="inherit">Logout</Button>
           </Toolbar>
       </AppBar>
    );
}