import React, { Component } from 'react';
import Header from '../header/header'
import Book from '../book/book'
import Bar from '../side-bar/side-bar'
import Order from "../order/order";
import AdminBook from '../admin/admin-book/admin-book';
import CreateBook from "../admin/admin-book/create-book";
import Author from '../admin/authors/admin-author';
import CreateAuthor from "../admin/authors/create-author";
import User from '../admin/users/admin-users'
import AdminOrder from '../admin/orders/admin-orders'
import Shoping from "../printing-shoping/shoping";
import "./style.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import jwt, { verify } from 'jsonwebtoken'
import { connect } from "react-redux";
import { role } from "../../redux/actions"

class App extends Component<any, { dispatch: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      dispatch: this.props.dispatch
    };
  }

  componentDidMount() {
    if (localStorage.getItem("authToken") !== null) {
      let storageAuth: any = localStorage.getItem("authToken")
      let storageRef: any = localStorage.getItem("refToken")
      let token: any

      try {
        token = jwt.verify(storageAuth, "secretKey")
      } catch (error) {

        fetch("http://localhost:8800/api/auth/profile", {
          headers: {
            'Content-Type': 'application/json',
            "auth-token": storageAuth,
            "ref-token": storageRef
          }
        })
          .then(res => res.json())
          .then(
            (data: any) => {

              localStorage.setItem('authToken', data.authToken)
              localStorage.setItem('refToken', data.refToken)
              token = jwt.verify(data.authToken, "secretKey")

              if (token.role === true || token.role === "true") {
                this.state.dispatch(role("admin"))
              }

              if (token.role === false || token.role === "false") {
                this.state.dispatch(role("user"))
              }
            },
            (err) => {
              console.log(err)
            }
          )
      }
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <PrivateRoute path="/adminBook" component={AdminBook} />
            <PrivateRoute path="/adminAuthor" component={Author}/>
            <PrivateRoute path="/adminUser" component={User}/>
            <Route path="/adminOrder" component={AdminOrder}/>
            <PrivateRoute path="/order" component={Order}/>
            <Route path="/shoping">
              <Shoping />
            </Route>
            <PrivateRoute path="/adminCreateAuthor" component={CreateAuthor} />
            <PrivateRoute path="/adminCreateBook" component={CreateBook}/>
            <Route path="/book" component={Book}>
              <Book book={this.props.books} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

function PrivateRoute({ component: AdminBook, ...rest }: any) {
  let storageAuth: any = localStorage.getItem("authToken")
  let token: any = jwt.verify(storageAuth, "secretKey")
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token.role === true || token.role === "true" ? (
          
          <AdminBook />
        ) : (
            <Redirect
              to={{
                pathname: "/book",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

const mapStateToProps = (state: any) => ({
  count: state.count,
  role: state.role,
  shopping: state.shoping
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);