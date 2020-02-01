import {
  createStyles,
  makeStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  getAccountsFailure,
  getAccountsRequest,
  getAccountsSuccess
} from "../actions/accounts";
import { logoutSuccess } from "../actions/auth";
import {
  getCustomersFailure,
  getCustomersRequest,
  getCustomersSuccess
} from "../actions/customers";
import {
  getInvoicesFailure,
  getInvoicesRequest,
  getInvoicesSuccess
} from "../actions/invoices";
import {
  getUsersFailure,
  getUsersRequest,
  getUsersSuccess
} from "../actions/users";
import { IReduxState } from "../reducers";
import { IAccountsState } from "../reducers/accounts";
import { ICustomersState } from "../reducers/customers";
import { ENDPOINT } from "../utils/environmentVariables";
import { IAccount, ICustomer, IInvoice, IUser } from "../utils/serverTypes";

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
interface IOwnProps extends RouteComponentProps {}

interface IMappedProps {
  accounts: IAccountsState;
  customers: ICustomersState;
}

interface IDispatchProps {
  logoutSuccess: () => void;
  getAccountsRequest: () => any;
  getAccountsSuccess: (data: IAccount[]) => any;
  getAccountsFailure: (error: any) => any;

  getCustomersRequest: () => any;
  getCustomersSuccess: (data: ICustomer[]) => any;
  getCustomersFailure: (error: any) => any;

  getUsersRequest: () => any;
  getUsersSuccess: (data: IUser[]) => any;
  getUsersFailure: (error: any) => any;

  getInvoicesRequest: () => any;
  getInvoicesSuccess: (data: IInvoice[]) => any;
  getInvoicesFailure: (error: any) => any;
}

type IProps = IOwnProps & IDispatchProps & IMappedProps & WithStyles;

interface IState {
  open: boolean;
}

class Dashboard extends Component<IProps, IState> {
  public state = {
    open: true
  };
  public componentDidMount() {
    this.props.getAccountsRequest();
    axios
      .get(`${ENDPOINT}/accounts`)
      .then(result => {
        this.props.getAccountsSuccess(result.data);
      })
      .catch(error => {
        this.props.getAccountsFailure(error);
      });

    this.props.getCustomersRequest();
    axios
      .get(`${ENDPOINT}/customers`)
      .then(result => {
        this.props.getCustomersSuccess(result.data);
      })
      .catch(error => {
        this.props.getCustomersFailure(error);
      });

    this.props.getUsersRequest();
    axios
      .get(`${ENDPOINT}/users`)
      .then(result => {
        this.props.getUsersSuccess(result.data);
      })
      .catch(error => {
        this.props.getUsersFailure(error);
      });

    this.props.getInvoicesRequest();
    axios
      .get(`${ENDPOINT}/invoices`)
      .then(result => {
        this.props.getInvoicesSuccess(result.data);
      })
      .catch(error => {
        this.props.getInvoicesFailure(error);
      });
  }

  public render() {
    const { classes, customers, accounts } = this.props;
    const { open } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return <div className={classes.root}>dashboard</div>;
  }
}

export default connect(
  (state: IReduxState) => {
    return {
      accounts: state.accounts,
      customers: state.customers
    };
  },
  {
    getAccountsRequest,
    getAccountsSuccess,
    getAccountsFailure,
    getCustomersRequest,
    getCustomersSuccess,
    getCustomersFailure,
    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
    getInvoicesRequest,
    getInvoicesSuccess,
    getInvoicesFailure,
    logoutSuccess
  }
)(withStyles(styles)(withRouter(Dashboard)));
