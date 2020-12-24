import React, { Component } from "react";
import { Baner } from "../../";

class User extends Component<
  any,
  { token: any; err: any; isLoaded: any; users: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem("authToken"),
      err: null,
      isLoaded: false,
      users: [],
    };
    this.handleUser = this.handleUser.bind(this);
  }

  objLenght(obj: any) {
    let i = 0;
    for (let key in obj) {
      i++;
    }

    return i - 1;
  }

  componentDidMount() {
    fetch("http://localhost:8800/admin/user", {
      headers: {
        "auth-token": this.state.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result,
          });
        },
        (err) => {
          this.setState({
            isLoaded: true,
            err,
          });
        }
      );
  }

  handleUser(arg: any) {
    this.setState({
      users: arg,
    });
  }

  render() {
    const { error, isLoaded }: any = this.state;
    const list: any = [];

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    if (!error && isLoaded) {
      for (let i = 0; i <= this.objLenght(this.state.users); i++) {
        list.push(
          <tr className="tr" key={this.state.users[i]._id}>
            <td className="td">{i + 1}</td>
            <td className="td">{this.state.users[i].username}</td>
            <td className="td">{this.state.users[i].email}</td>
            <td className="td">{this.state.users[i]._id}</td>
          </tr>
        );
      }
    }
    return (
      <div>
        <Baner page={"User"} callBack={this.handleUser} />
        <table className="table table-dark">
          <thead>
            <tr>
              <th className="title">Number</th>
              <th className="title">Username</th>
              <th className="title">Email</th>
              <th className="title">Id</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}

export default User;
