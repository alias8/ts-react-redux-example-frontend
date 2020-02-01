import { LinearProgress } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { logoutSuccess } from "../actions/auth";
import { IReduxState } from "../reducers";
import MainListItems from "./mainListItems";

const drawerWidth = 240;
const styles = (theme: any) => {
  return createStyles({
    root: {
      display: "flex"
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    menuButtonHidden: {
      display: "none"
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto"
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    },
    fixedHeight: {
      height: 240
    }
  });
};

// tslint:disable-next-line:no-empty-interface
interface IOwnProps extends RouteComponentProps {
  children: ReactNode;
}

interface IMappedProps {
  loggedIn: boolean;
  loading: boolean;
}

interface IDispatchProps {
  logoutSuccess: () => void;
}

type IProps = IOwnProps & WithStyles & IDispatchProps & IMappedProps;

interface IState {
  open: boolean;
}

class App extends Component<IProps, IState> {
  public state = {
    open: false
  };
  public handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };

  public handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };

  public onLogoutClick = () => {
    // todo: use api call here to logout
    this.props.logoutSuccess();
  };

  public render() {
    const { classes, children, loggedIn, loading } = this.props;
    const { open } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className={clsx(classes.root, "james1")}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(
            classes.appBar,
            open && classes.appBarShift,
            "james2"
          )}
        >
          {loading && <LinearProgress />}
          {loggedIn && (
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit" onClick={this.onLogoutClick}>
                Logout
              </IconButton>
            </Toolbar>
          )}
        </AppBar>
        {loggedIn && (
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              )
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <MainListItems />
            </List>
          </Drawer>
        )}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12}>
                <Paper className={classes.paper}>{children}</Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default connect(
  (state: IReduxState) => {
    return {
      loggedIn: state.auth.loggedIn,
      loading:
        state.customers.loading ||
        state.invoices.loading ||
        state.users.loading ||
        state.accounts.loading
    };
  },
  {
    logoutSuccess
  }
)(withStyles(styles)(withRouter(App)));
