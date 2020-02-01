import DateFnsUtils from "@date-io/date-fns";
import {
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import clsx from "clsx";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IReduxState } from "../reducers";
import { ICustomer, IInvoice } from "../utils/serverTypes";
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
  customer?: ICustomer;
  invoices: IInvoice[];
}

interface IState {
  name: string;
  createdDate: Date | null;
}

type IProps = IOwnProps & IMappedProps & WithStyles;

class CustomerDetails extends Component<IProps, IState> {
  public state = {
    name: this.props.customer ? this.props.customer.name : "",
    createdDate: this.props.customer ? this.props.customer.createdDate : null
  };

  public render() {
    const { name, createdDate } = this.state;
    const { classes, customer, invoices } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    if (!customer) {
      return <div>no customer matches that id!</div>;
    } else {
      return (
        <>
          <Typography variant="h5" align="center" color="textSecondary">
            {`Edit customer ${customer.name}`}
          </Typography>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar={true}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="created-date"
                        label="Created Date"
                        value={createdDate}
                        onChange={date => {
                          return this.setState({ createdDate: date });
                        }}
                        KeyboardButtonProps={{
                          "aria-label": "created date"
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item={true} xs={12}>
                <Paper className={classes.paper}>
                  <InvoiceTable invoices={invoices} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      );
    }
  }
}

export default connect((state: IReduxState, ownProps: IOwnProps) => {
  const customerIDFromURL = ownProps.match.params.id;
  const customerForPage = state.customers.list.find(customer => {
    return customer.id === customerIDFromURL;
  });
  let invoices: IInvoice[] = [];
  if (customerForPage) {
    const invoiceIDs = new Set(customerForPage.invoiceIDs);

    invoices = state.invoices.list.filter(invoice => {
      return invoiceIDs.has(invoice.id);
    });
  }

  return {
    accounts: state.accounts,
    customer: state.customers.list.find(customer => {
      return customer.id === ownProps.match.params.id;
    }),
    invoices
  };
})(withStyles(styles)(withRouter(CustomerDetails)));
