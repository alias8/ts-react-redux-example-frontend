import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Accounts from "../pages/Accounts";
import { IReduxState } from "../reducers";
import { getRevenueOfAccount } from "../utils";
import { IAccount, ICustomer, IUser } from "../utils/serverTypes";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

interface IMappedProps {
  accounts?: IAccount[];
  loggedInUserID: string | null;
  users: IUser[];
  state: IReduxState;
}

type IProps = IMappedProps & RouteComponentProps;

function AccountsTable({ ...props }: IProps) {
  const { history, accounts, loggedInUserID, users, state } = props;

  const onClick = (id: string) => {
    history.push(`/account-details/${id}`);
  };

  const classes = useStyles();
  return (
    <div>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={true}
      >
        Accounts
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Owned By</TableCell>
            <TableCell>Revenue</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts &&
            accounts!.map(account => (
              <TableRow key={account.name}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.description}</TableCell>
                <TableCell>
                  {users.filter(u => u.id === account.ownedBy)[0].username}
                </TableCell>
                <TableCell>{getRevenueOfAccount(account, state)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onClick(account.id)}
                    disabled={loggedInUserID !== account.ownedBy}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default connect((state: IReduxState) => {
  return {
    accounts: state.accounts.list,
    loggedInUserID: state.auth.id,
    users: state.users.list,
    state
  };
}, {})(withRouter(AccountsTable));
