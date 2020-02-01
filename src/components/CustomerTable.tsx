import { Button, Typography, withStyles } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { deleteCustomer } from "../actions/customers";
import { IReduxState } from "../reducers";
import { getCustomersOfCurrentUser } from "../utils";
import { ENDPOINT } from "../utils/environmentVariables";
import { ICustomer } from "../utils/serverTypes";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

interface IMappedProps {
  customers?: ICustomer[];
  state: IReduxState;
}

interface IDispatchProps {
  deleteCustomer: (id: string) => any;
}

type IProps = IMappedProps & IDispatchProps & RouteComponentProps;

function CustomerTable({ ...props }: IProps) {
  const classes = useStyles();
  const { history, customers, state } = props;
  const customerIDsOfCurrentUser = new Set(getCustomersOfCurrentUser(state));

  const onClick = (id: string) => {
    history.push(`/customer-details/${id}`);
  };

  const onDelete = (id: string) => {
    axios
      .delete(`${ENDPOINT}/customers/${id}`)
      .then(result => {
        props.deleteCustomer(id);
      })
      .catch(error => {
        return error;
      });
  };

  return (
    <div>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={true}
      >
        Customers
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Edit/Details</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers &&
            customers.map(customer => {
              const disabled = !customerIDsOfCurrentUser!.has(customer.id);
              return (
                <TableRow key={customer.name}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.createdDate}</TableCell>
                  <TableCell>
                    <Button
                      disabled={disabled}
                      onClick={() => onClick(customer.id)}
                    >
                      Edit/Details
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={disabled}
                      onClick={() => onDelete(customer.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default connect(
  (state: IReduxState) => {
    return {
      customers: state.customers.list,
      loaded: state.customers.loaded,
      state
    };
  },
  {
    deleteCustomer
  }
)(withRouter(CustomerTable));
