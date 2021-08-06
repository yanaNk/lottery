import React, {useEffect, useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import Typography from '@material-ui/core/Typography';
import { getUser } from '../Utils/Common';
import Badge from '@material-ui/core/Badge';
import socketIOClient  from "socket.io-client";
const ENDPOINT = "http://localhost:3000";

function MenuToolBar() {
  const [notfication,setNotfication] = useState(0);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("fromServer",data => {
      setNotfication(data);
      console.log(data);
      console.log(Object.entries(notfication));
    })
  },[])
    const useStyles = makeStyles(() => ({
      root: {
        flexGrow: 1,
      },
      title: {
        flexGrow: 1,
      },
    }));
      const classes = useStyles();
      const user = getUser();
    
        return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
           
            <Typography variant="h6" className={classes.title}>
              Welcome {user.name}
            </Typography>
            <IconButton edge="start" color="inherit" aria-label="bell">
            <Badge badgeContent={notfication} color="secondary">
              <NotificationImportantIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        </div>
        )
    
}
        
export default MenuToolBar;