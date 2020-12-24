import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Baner } from "../../";

class AdminBook extends Component<
  any,
  { token: any; err: any; isLoaded: any; books: any; renameBook: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem("authToken"),
      err: null,
      isLoaded: false,
      books: "",
      renameBook: false,
    };
    this.appBook = this.appBook.bind(this);
  }

  objLenght(obj: any) {
    let i = 0;
    for (let key in obj) {
      i++;
    }

    return i - 1;
  }

  componentDidMount() {
    fetch("http://localhost:8800/books/1", {
      headers: {
        "auth-token": this.state.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            books: result.books,
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

  appBook(event: any) {
    event.preventDefault();

    this.setState({
      renameBook: true,

      // author_id: event.target.parentNode.querySelectorAll("td")[2].innerHTML,
      // author_name: event.target.parentNode.querySelectorAll("td")[1].innerHTML
    });
  }

  handleBook(arg: any) {
    console.log(arg);
  }

  bookDel(event: any) {
    event.preventDefault();

    console.log("book del");
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
      console.log(this.state.books);

      for (let i = 0; i <= this.objLenght(this.state.books); i++) {
        list.push(
          <tr className="tr" key={i} onClick={this.appBook}>
            <td className="td">{i + 1}</td>
            <td className="td">{this.state.books[i].name}</td>
            <td className="td">{this.state.books[i].price}</td>
            <td className="td">{this.state.books[i].author_id}</td>
          </tr>
        );
      }
      console.log(this.state.books);
    }
    return (
      <div>
        <Baner page={"Books"} callBack={this.handleBook} />
        <Link to="/adminCreateBook">Create book</Link>
        {!this.state.renameBook ? (
          <table className="table table-dark">
            <thead>
              <tr>
                <th className="title">Number</th>
                <th className="title">Book name</th>
                <th className="title">price</th>
                <th className="title">author Id</th>
                {/* <th className="title">payment info</th> */}
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
        ) : null}
        {this.state.renameBook ? (
          <div>
            <button onClick={this.bookDel}>Delete book</button>
            <form>
              <p>work</p>
              {/* <input type="text" name="email" value={this.state.newAuthor} onChange={this.handleChangeAuthor} placeholder="Rename" /> */}
              {/* <button onClick={this.handleRename}></button> */}
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AdminBook;
