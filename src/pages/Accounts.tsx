import {
  createStyles,
  makeStyles,
  WithStyles,
  withStyles
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import {
  getCustomersFailure,
  getCustomersRequest,
  getCustomersSuccess
} from "../actions/customers";
import AccountsTable from "../components/AccountsTable";
import CustomerTable from "../components/CustomerTable";
import { IReduxState } from "../reducers";
import { IAccountsState } from "../reducers/accounts";
import { ICustomersState } from "../reducers/customers";
import { accountsOfCurrentUser } from "../utils";
import { IAccount } from "../utils/serverTypes";

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

interface IMappedProps {
  accounts?: IAccount[];
}

type IProps = WithStyles & IMappedProps;

export default class Accounts extends React.Component<IProps> {
  public render() {
    return <AccountsTable />;
  }
}
