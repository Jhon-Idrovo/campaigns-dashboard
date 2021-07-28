import React from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

import IconButton from "@material-ui/icons/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//drawer
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

function Panel() {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };
  //Drawer
  const [selectedIndex, setSelectedIndex] = React.useState(undefined);
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const listItems = ["Clients", "Campaigns", "Assosiates", "Personal Stats"];

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <List>
          {listItems.map((text, index) => (
            <ListItem button key={text + index}>
              {" "}
              <ListItemText primary={text} />{" "}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuutton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Campaigns Dashboard</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Panel;

function SideBar() {
  return (
    <div>
      <ul></ul>
    </div>
  );
}
