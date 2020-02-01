import {
  Avatar,
  Button,
  Checkbox,
  Container,
  createStyles,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
// tslint:disable-next-line:no-submodule-imports
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { loginSuccess } from "../actions/auth";
import { IReduxState } from "../reducers";
import { ENDPOINT } from "../utils/environmentVariables";
import { IUser } from "../utils/serverTypes";

interface IState {
  username: string;
  password: string;
}

interface IMappedProps {
  loggedIn: boolean;
}

interface IDispatchProps {
  loginSuccess: (user: IUser) => any;
}

type IProps = IDispatchProps & IMappedProps & RouteComponentProps & WithStyles;

const styles = (theme: any) =>
  createStyles({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  });

class LoginForm extends React.Component<IProps, IState> {
  public state = {
    username: "",
    password: ""
  };

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ) {
    // user now signed in when they weren't before
    if (this.props.loggedIn && !prevProps.loggedIn) {
      // redirect to dashboard
      this.props.history.push("/dashboard");
    }
  }

  public render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate={true}>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth={true}
              id="username"
              label="Username"
              name="username"
              autoFocus={true}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth={true}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }

  private onSubmit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .get(`${ENDPOINT}/users?username=${username}&password=${password}`)
      .then(result => {
        if (result.data.length === 1) {
          this.props.loginSuccess(result.data[0]);
        }
      });
  };
}

export default connect(
  (state: IReduxState) => {
    return {
      loggedIn: state.auth.loggedIn
    };
  },
  { loginSuccess }
)(withStyles(styles)(LoginForm));
