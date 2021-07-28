import React from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//drawer
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
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

function DrawerContent({ activeIndex, handleSectionChange }) {
  const classes = useStyles();

  const listItems = ["Clients", "Campaigns", "Assosiates", "Personal Stats"];

  return (
    <div>
      <div className={classes.toolbar}>
        <List component="nav" aria-label={listItems.join(" ")}>
          {listItems.map((text, index) => (
            <ListItem
              button
              key={text + index}
              selected={activeIndex === index}
              onClick={() => handleSectionChange(index)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

function Panel() {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  //section
  const [activeSection, setActiveSection] = React.useState(0);
  const handleSectionChange = (index: number) => {
    setActiveSection(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Campaigns Dashboard</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* Open on demand variant */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <DrawerContent
              activeIndex={activeSection}
              handleSectionChange={handleSectionChange}
            />
          </Drawer>
        </Hidden>
        {/* Always open variant */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <DrawerContent
              activeIndex={activeSection}
              handleSectionChange={handleSectionChange}
            />
          </Drawer>
        </Hidden>
      </nav>
      <main>
        <div className={classes.toolbar} />
        <Typography color="primary">{activeSection}</Typography>
      </main>
    </div>
  );
}

export default Panel;
