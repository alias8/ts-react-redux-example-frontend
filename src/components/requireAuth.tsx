import React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import { IReduxState } from "../reducers";
import { IAuthState } from "../reducers/auth";

export default <P extends object>(
  WrappedComponent: React.ComponentType<P> | any
) => {
  interface IMappedProps {
    auth: IAuthState;
  }
  type IProps = RouteComponentProps & IMappedProps;

  class RequireAuth extends React.Component<IProps> {
    public componentDidMount() {
      if (!this.props.auth.loggedIn) {
        this.props.history.push("/");
      }
    }
    public componentDidUpdate(
      prevProps: Readonly<IProps>,
      prevState: Readonly<{}>,
      snapshot?: any
    ) {
      if (!this.props.auth.loggedIn) {
        this.props.history.push("/");
      }
    }

    public render() {
      const { ...props } = this.props;
      return <WrappedComponent {...(props as P)} />;
    }
  }

  return connect((state: IReduxState) => {
    return {
      auth: state.auth
    };
  })(withRouter(RequireAuth));
};
