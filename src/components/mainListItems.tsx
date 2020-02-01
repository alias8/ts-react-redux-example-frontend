import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LayersIcon from "@material-ui/icons/Layers";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const MainListItems = (props: RouteComponentProps) => {
  return (
    <div>
      <ListItem button={true}>
        <ListItemIcon>
          <DashboardIcon onClick={() => props.history.push("/dashboard")} />
        </ListItemIcon>
        <ListItemText
          primary="Dashboard"
          onClick={() => props.history.push("/dashboard")}
        />
      </ListItem>
      <ListItem button={true}>
        <ListItemIcon>
          <ShoppingCartIcon onClick={() => props.history.push("/accounts")} />
        </ListItemIcon>
        <ListItemText
          primary="Accounts"
          onClick={() => props.history.push("/accounts")}
        />
      </ListItem>
      <ListItem button={true}>
        <ListItemIcon>
          <PeopleIcon onClick={() => props.history.push("/customers")} />
        </ListItemIcon>
        <ListItemText
          primary="Customers"
          onClick={() => props.history.push("/customers")}
        />
      </ListItem>
    </div>
  );
};

export default withRouter(MainListItems);
