import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
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
import axios, { AxiosResponse } from "axios";
import clsx from "clsx";
import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  getInvoicesFailure,
  getInvoicesRequest,
  getInvoicesSuccess,
  patchInvoicesFailure,
  patchInvoicesRequest,
  patchInvoicesSuccess
} from "../actions/invoices";
import { IReduxState } from "../reducers";
import invoices from "../reducers/invoices";
import { ENDPOINT } from "../utils/environmentVariables";
import { IInvoice } from "../utils/serverTypes";
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
  invoice?: IInvoice;
}

interface IDispatchProps {
  patchInvoicesRequest: () => any;
  patchInvoicesSuccess: (data: IInvoice) => any;
  patchInvoicesFailure: (error: any) => any;

  getInvoicesRequest: () => any;
  getInvoicesSuccess: (data: IInvoice[]) => any;
  getInvoicesFailure: (error: any) => any;
}

interface IState {
  description: string;
  purchasedDate: Date | null;
  purchasedPrice: number | null;
}

type IProps = IOwnProps & IMappedProps & IDispatchProps & WithStyles;

class InvoiceDetails extends Component<IProps, IState> {
  public state = {
    description: this.props.invoice ? this.props.invoice.description : "",
    purchasedDate: this.props.invoice ? this.props.invoice.purchasedDate : null,
    purchasedPrice: this.props.invoice
      ? this.props.invoice.purchasedPrice
      : null
  };

  public render() {
    const { description, purchasedDate, purchasedPrice } = this.state;
    const { classes, invoice } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    if (!invoice) {
      return <div>no invoice matches that id!</div>;
    } else {
      return (
        <>
          <Typography variant="h5" align="center" color="textSecondary">
            {`Edit invoice ${invoice.description}`}
          </Typography>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container={true} spacing={3}>
              <Grid item={true} xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <form onSubmit={this.handleSubmit}>
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
                      <InputLabel htmlFor="component-simple">
                        Purchase Price
                      </InputLabel>
                      <Input
                        id="component-simple"
                        value={purchasedPrice}
                        onChange={e => {
                          return this.setState({
                            purchasedPrice: parseFloat(e.currentTarget.value)
                          });
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
                          id="purchased-date"
                          label="Purchased Date"
                          value={purchasedDate}
                          onChange={date => {
                            return this.setState({ purchasedDate: date });
                          }}
                          KeyboardButtonProps={{
                            "aria-label": "created date"
                          }}
                        />
                      </MuiPickersUtilsProvider>
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

  private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { description, purchasedDate, purchasedPrice } = this.state;
    this.props.patchInvoicesRequest();
    axios
      .patch(`${ENDPOINT}/invoices/${this.props.match.params.id}`, {
        description,
        purchasedDate,
        purchasedPrice
      })
      .then(res => {
        this.props.patchInvoicesSuccess(res.data);
        this.props.getInvoicesRequest();
        return axios.get(`${ENDPOINT}/invoices`);
      })
      .catch(error => {
        this.props.patchInvoicesFailure(error);
      })
      .then(result => {
        this.props.getInvoicesSuccess((result as AxiosResponse).data);
      })
      .catch(error => {
        this.props.getInvoicesFailure(error);
      });
  };
}

export default connect(
  (state: IReduxState, ownProps: IOwnProps) => {
    const invoiceForThisPage = state.invoices.list.find(
      invoice => invoice.id === ownProps.match.params.id
    );
    return {
      invoice: invoiceForThisPage
    };
  },
  {
    patchInvoicesRequest,
    patchInvoicesSuccess,
    patchInvoicesFailure,
    getInvoicesRequest,
    getInvoicesSuccess,
    getInvoicesFailure
  }
)(withStyles(styles)(withRouter(InvoiceDetails)));
