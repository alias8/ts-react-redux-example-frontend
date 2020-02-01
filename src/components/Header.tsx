import React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { logoutSuccess } from "../actions/auth";
import { IReduxState } from "../reducers";
import { IAuthState } from "../reducers/auth";

interface IMappedProps {
  auth: IAuthState;
}

interface IDispatchProps {
  logoutSuccess: (user: string | null) => any;
}

type IProps = IMappedProps & IDispatchProps & RouteComponentProps;

class Header extends React.Component<IProps> {
  public render() {
    return (
      <nav>
        <div className={"nav-wrapper"}>
          <Link to="/" className={"brand-logo left"}>
            Home
          </Link>
          <ul className={"right"}>{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }

  private onLogoutClick = () => {
    // todo: use api call here to logout
    this.props.logoutSuccess(this.props.auth.username);
  };

  private renderButtons = () => {
    if (this.props.auth.loggedIn) {
      return (
        <li>
          <a onClick={this.onLogoutClick}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </div>
      );
    }
  };
}

export default connect(
  (state: IReduxState) => {
    return {
      auth: state.auth
    };
  },
  { logoutSuccess }
)(withRouter(Header));
