import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import axios, { AxiosResponse } from "axios";
import clsx from "clsx";
import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  getAccountsFailure,
  getAccountsRequest,
  getAccountsSuccess,
  patchAccountsFailure,
  patchAccountsRequest,
  patchAccountsSuccess
} from "../actions/accounts";
import { IReduxState } from "../reducers";
import { IAuthState } from "../reducers/auth";
import { getCustomersOfCurrentUser } from "../utils";
import { ENDPOINT } from "../utils/environmentVariables";
import {
  IAccount,
  ICustomer,
  ICustomerID,
  IUser,
  IUserID
} from "../utils/serverTypes";
import InvoiceTable from "./InvoiceTable";

const styles = (theme: Theme) => {
  return createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1)
    }
  });
};

interface IOwnProps extends RouteComponentProps<{ id: string }> {}

interface IMappedProps {
  account?: IAccount;
  users: IUser[];
  auth: IAuthState;
  allCustomers: ICustomer[];
  existingCustomerIDs: ICustomerID[];
}

interface IDispatchProps {
  getAccountsRequest: () => any;
  getAccountsSuccess: (data: IAccount[]) => any;
  getAccountsFailure: (error: any) => any;

  patchAccountsRequest: () => any;
  patchAccountsSuccess: (data: IAccount) => any;
  patchAccountsFailure: (error: any) => any;
}

interface IState {
  name: string;
  description: string;
  ownedBy: IUserID | null;
  updatedCustomerIDs: string[];
}

type IProps = IOwnProps & IMappedProps & IDispatchProps & WithStyles;

// todo: have the list of customers this account owns in a list that we can delete and add customers to
class AccountDetails extends Component<IProps, IState> {
  public state = {
    name: this.props.account ? this.props.account.name : "",
    description: this.props.account ? this.props.account.description : "",
    ownedBy: this.props.auth ? this.props.auth.id : null,
    updatedCustomerIDs: this.props.existingCustomerIDs
  };

  public render() {
    const { classes, account, users, auth, allCustomers } = this.props;
    const { name, description, ownedBy, updatedCustomerIDs } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    if (!account) {
      return <div>no account matches that id!</div>;
    } else {
      return (
        <>
          <Typography variant="h5" align="center" color="textSecondary">
            {`Edit account ${account.name}`}
          </Typography>
          <Container className={classes.container}>
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12}>
                <Paper className={fixedHeightPaper}>
                  <form onSubmit={this.handleSubmit}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="component-simple">Name</InputLabel>
                      <Input
                        id="component-simple"
                        value={name}
                        onChange={e => {
                          return this.setState({ name: e.currentTarget.value });
                        }}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="component-simple">
                        Description
                      </InputLabel>
                      <Input
                        id="component-simple"
                        value={description}
                        onChange={e => {
                          return this.setState({
                            description: e.currentTarget.value
                          });
                        }}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Owned By
                      </InputLabel>
                      <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={ownedBy}
                        onChange={e => {
                          return this.setState({
                            ownedBy: e.target.value as string
                          });
                        }}
                      >
                        {users.map(user => {
                          return (
                            <MenuItem key={user.id} value={user.id}>
                              {user.username}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Modify customers in this account
                      </FormLabel>
                      <FormGroup>
                        {allCustomers.map(customer => {
                          return (
                            <FormControlLabel
                              key={customer.id}
                              control={
                                <Checkbox
                                  checked={updatedCustomerIDs.includes(
                                    customer.id
                                  )}
                                  onChange={this.handleChange(customer.id)}
                                  value={customer.name}
                                />
                              }
                              label={customer.name}
                            />
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                    <Button type="submit">Submit</Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      );
    }
  }

  private handleChange = (customerID: ICustomerID) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { updatedCustomerIDs } = this.state;
    if (event.target.checked) {
      updatedCustomerIDs.push(customerID);
    } else {
      updatedCustomerIDs = updatedCustomerIDs.filter(c => c !== customerID);
    }
    this.setState({
      updatedCustomerIDs
    });
  };

  private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, ownedBy, updatedCustomerIDs } = this.state;
    this.props.patchAccountsRequest();
    axios
      .patch(`${ENDPOINT}/accounts/${this.props.match.params.id}`, {
        name,
        description,
        ownedBy,
        customerIDs: updatedCustomerIDs
      })
      .then(res => {
        this.props.patchAccountsSuccess(res.data);
        this.props.getAccountsRequest();
        return axios.get(`${ENDPOINT}/accounts`);
      })
      .catch(error => {
        this.props.patchAccountsFailure(error);
      })
      .then(result => {
        this.props.getAccountsSuccess((result as AxiosResponse<any>).data);
      })
      .catch(error => {
        this.props.getAccountsFailure(error);
      });
  };
}

export default connect(
  (state: IReduxState, ownProps: IOwnProps) => {
    return {
      account: state.accounts.list.find(account => {
        return account.id === ownProps.match.params.id;
      }),
      users: state.users.list,
      auth: state.auth,
      allCustomers: state.customers.list,
      existingCustomerIDs: getCustomersOfCurrentUser(state)
    };
  },
  {
    patchAccountsRequest,
    patchAccountsSuccess,
    patchAccountsFailure,
    getAccountsRequest,
    getAccountsSuccess,
    getAccountsFailure
  }
)(withStyles(styles)(withRouter(AccountDetails)));
