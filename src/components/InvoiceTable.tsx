import { Button, Typography } from "@material-ui/core";
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
import { deleteInvoice } from "../actions/invoices";
import { ENDPOINT } from "../utils/environmentVariables";
import { IInvoice } from "../utils/serverTypes";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

interface IOwnProps {
  invoices: IInvoice[];
}

interface IDispatchProps {
  deleteInvoice: (id: string) => any;
}

type IProps = IOwnProps & IDispatchProps & RouteComponentProps;

function InvoiceTable({ invoices, ...props }: IProps) {
  const classes = useStyles();
  const { history } = props;

  const onClick = (id: string) => {
    history.push(`/invoice-details/${id}`);
  };

  const onDelete = (id: string) => {
    axios
      .delete(`${ENDPOINT}/invoices/${id}`)
      .then(result => {
        props.deleteInvoice(id);
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
        Related Invoices
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Invoice ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Purchased Date</TableCell>
            <TableCell>Purchased Price</TableCell>
            <TableCell>Edit/Details</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.purchasedDate}</TableCell>
              <TableCell>{row.purchasedPrice}</TableCell>
              <TableCell>
                <Button onClick={id => onClick(row.id)}>Edit/Details</Button>
              </TableCell>
              <TableCell>
                <Button onClick={id => onDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </div>
  );
}

export default connect(
  () => {
    return {};
  },
  {
    deleteInvoice
  }
)(withRouter(InvoiceTable));
