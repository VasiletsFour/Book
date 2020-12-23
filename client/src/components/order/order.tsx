import React, { Component } from "react";

import { connect } from "react-redux";
import "./style.css";

class Order extends Component<
  any,
  { book: any; qunity: number; dispatch: any }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      book: this.props.book,
      qunity: 1,
      dispatch: this.props.dispatch,
    };

    this.handleChangeQunity = this.handleChangeQunity.bind(this);
    this.handeleClickAdd = this.handeleClickAdd.bind(this);
  }

  handleChangeQunity(event: any) {
    event.preventDefault();

    this.setState({ qunity: event.target.value });
  }

  handeleClickAdd(event: any) {
    event.preventDefault();

    if (this.props.role === "empty") {
      alert("error");
    }

    if (this.props.role === "user") {
      let data: any = {
        name: this.state.book["name"],
        author: this.state.book["author"],
        type: this.state.book["type"],
        price: this.props.book["price"],
        id: this.state.book["_id"],
      };

      this.props.shoping.push(JSON.stringify(data));

      localStorage.setItem("book", JSON.stringify(this.props.shoping));
    }

    this.props.closeOrder();
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <img src="" alt="book" />
          </div>
          <div>
            <h1>{this.state.book["name"]}</h1>
            <h3>{this.state.book["type"]}</h3>
            <p>author</p>
            <div>
              <p>QTY:</p>
              <form action="">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={this.state.qunity}
                  onChange={this.handleChangeQunity}
                  placeholder="Your email"
                />
              </form>
              <p>{this.props.book["price"] * this.state.qunity}</p>
              {this.props.role === "user" ? (
                <button onClick={this.handeleClickAdd}>add to cart</button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  role: state.role,
  shoping: state.shoping,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
