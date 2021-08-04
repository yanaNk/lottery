import React, {Component} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import Typography from '@material-ui/core/Typography';
import { getUser } from '../Utils/Common';


function MenuToolBar(props) {
    const useStyles = makeStyles((theme) => ({
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
              <NotificationImportantIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        </div>
        )
    
}
        
export default MenuToolBar;