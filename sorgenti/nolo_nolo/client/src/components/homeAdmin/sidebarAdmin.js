import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import "../../css/admin/sidebarAdmin.css"
import {Link} from "@material-ui/core";

//larghezza sidebar
const drawerWidth = 240;
//stili material ui
const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

export default function SidebarAdmin(props) {
    const classes = useStyles();
    const theme = useTheme();

    //items della sidebar
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                <ListItem className="list-item" button key={1}>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <Link className="list-text" href={"#titoloInserimento"}>Operazioni oggetti </Link>
                </ListItem>
                <ListItem className="list-item" button key={2}>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <Link className="list-text" href={"#titoloInserimento"}>Operazioni clienti </Link>
                </ListItem>
                <Divider />
                <ListItem className="list-item" button key={3}>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <Link className="list-text" href={"#prenotazioni"}>Visualizza prenotazioni </Link>
                </ListItem>
                <ListItem className="list-item" button key={4}>
                    <ListItemIcon> <InboxIcon/> </ListItemIcon>
                    <Link className="list-text" href={"#prenotazioni"}>Gestione restituzioni </Link>
                </ListItem>
            </List>
        </div>
    );

    //hidden per i tipi di dispositivi mobili(smUp e xsDown)
    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}