import React, { Component } from "react";
import Baner from "../../SearchInput/search-bar";
import Header from "../../Header/header";
import { Link } from "react-router-dom";

class Author extends Component<
  any,
  {
    token: any;
    err: any;
    isLoaded: any;
    authors: any;
    renameAuthor: boolean;
    author_id: string;
    author_name: string;
    newAuthor: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem("authToken"),
      err: null,
      isLoaded: false,
      authors: [],
      renameAuthor: false,
      author_id: "",
      author_name: "",
      newAuthor: "",
    };
    this.appAuthor = this.appAuthor.bind(this);
    this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
  }

  objLenght(obj: any) {
    let i = 0;
    for (let key in obj) {
      i++;
    }
    return i - 1;
  }

  componentDidMount() {
    fetch("http://localhost:8800/admin/author", {
      headers: {
        "auth-token": this.state.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            authors: result,
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

  appAuthor(event: any) {
    event.preventDefault();

    this.setState({
      renameAuthor: true,
      author_id: event.target.parentNode.querySelectorAll("td")[2].innerHTML,
      author_name: event.target.parentNode.querySelectorAll("td")[1].innerHTML,
    });
  }

  handleChangeAuthor(event: any) {
    this.setState({
      newAuthor: event.target.value,
    });
  }

  handleRename(event: any) {
    event.preventDefault();

    const data: object = {
      name: this.state.newAuthor,
    };

    fetch("http://localhost:8800/admin/appAuthor/" + this.state.author_name, {
      method: "POST",
      headers: {
        "auth-token": this.state.token,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
          });
          console.log("done" + result);
        },
        (err) => {
          this.setState({
            isLoaded: true,
            err,
          });

          console.log(err);
        }
      );
  }
  handleAuthor(arg: any) {
    this.setState({
      authors: arg,
    });
  }
  handleDeleate(event: any) {
    event.preventDefault();
    console.log("done");
    // fetch("http://localhost:8800/admin/delAuthor/" + this.state.author_name, {
    //     method: 'POST',
    //     headers: {
    //         "auth-token": this.state.token
    //     },
    // })
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             this.setState({
    //                 isLoaded: true,
    //             })
    //             console.log("done")

    //         },
    //         (err) => {
    //             this.setState({
    //                 isLoaded: true,
    //                 err
    //             })

    //             console.log(err)
    //         }
    //     )
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
      for (let i = 0; i <= this.objLenght(this.state.authors); i++) {
        list.push(
          <tr className="tr" key={i} onClick={this.appAuthor}>
            <td className="td">{i + 1}</td>
            <td className="td">{this.state.authors[i].name}</td>
            <td className="td">{this.state.authors[i]._id}</td>
          </tr>
        );
      }
    }
    return (
      <div>
        <Baner page={"Authors"} callBack={this.handleAuthor} />
        {!this.state.renameAuthor ? (
          <div>
            <Link to="/adminCreateAuthor">CreateAuthor</Link>
            {/* <button>Create newAuthor</button> */}
            <table className="table table-dark">
              <thead>
                <tr>
                  <th className="title">Number</th>
                  <th className="title">Author</th>
                  <th className="title">Id</th>
                </tr>
              </thead>
              <tbody>{list}</tbody>
            </table>
          </div>
        ) : null}

        {this.state.renameAuthor ? (
          <div>
            <button onClick={this.handleDeleate}>Deleate authors</button>
            <form action="">
              <p>{this.state.author_name}</p>
              <input
                type="text"
                name="email"
                value={this.state.newAuthor}
                onChange={this.handleChangeAuthor}
                placeholder="Rename"
              />
              <button onClick={this.handleRename}></button>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Author;
