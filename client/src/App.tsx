import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { BookPage, BooksPage, ShopingPage } from "../src/page";
import "./style.css";
import { BOOK, BOOKS, ROOT_URL, SHOPING } from "./utils/urls";
import "./style/global.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={BOOKS.urlTemplate} component={BooksPage} />
          <Route path={BOOK.urlTemplate} component={BookPage} />
          <Route path={SHOPING.urlTemplate} component={ShopingPage} />
          {window.location.pathname === ROOT_URL.urlTemplate && (
            <Redirect to={BOOKS.urlTemplate} />
          )}
          ;
          {/* <PrivateRoute path="/adminBook" component={AdminBook} />
            <PrivateRoute path="/adminAuthor" component={Author} />
            <PrivateRoute path="/adminUser" component={User} />
            <Route path="/adminOrder" component={AdminOrder} />
            <PrivateRoute path="/order" component={Order} />
            <Route path="/shoping">
              <Shoping />
            </Route>
            <PrivateRoute path="/adminCreateAuthor" component={CreateAuthor} />
            <PrivateRoute path="/adminCreateBook" component={CreateBook} /> */}
        </Switch>
      </Router>
    );
  }
}

// function PrivateRoute({ component: AdminBook, ...rest }: any) {
//   let storageAuth: any = localStorage.getItem("authToken");
//   let token: any = jwt.verify(storageAuth, "secretKey");

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         token.role === true || token.role === "true" ? (
//           <AdminBook />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/book",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// const mapStateToProps = (state: any) => ({
//   count: state.count,
//   role: state.role,
//   shopping: state.shoping,
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   dispatch,
// });

export default App;
// connect(mapStateToProps, mapDispatchToProps)(App);
