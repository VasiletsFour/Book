import React, { useState, Component } from "react"
import "./style.css"

import { connect } from "react-redux";
import { book } from "../../redux/actions";

class Bar extends Component<any, { min: number, max: number, dispatch:any }> {

    constructor(props: any) {
        super(props)
        this.state = {
            min: 0,
            max: 3000,
            dispatch: this.props.dispatch
        }
        this.search = this.search.bind(this)
    }

    search(event: any) {
     
        const token: any = localStorage.getItem("authToken")
        let data: object = {
            "word": "",
            "type": "price",
            "int": 1,
            "min": this.state.min,
            "max": this.state.max
        }

        fetch("http://localhost:8800/books/sort", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(data),
        })
            .then((response: any) => response.json())
            .then((data: any) => {
                console.log(data)
                this.state.dispatch(book(data))
            })
            .catch((error: any) => {
                console.log(error)
            });
    }
    render() {
        return (
            <div className="bar">
                <form>
                    <div className="radi-input">
                        <div className="radio-conteiner">
                            <input type="radio" name="cind" value="book" />
                            <p>Book</p>
                        </div>
                        <div className="radio-conteiner">
                            <input type="radio" name="cind" value="NewsPaper" />
                            <p>News Paper</p>
                        </div>
                        <div className="radio-conteiner">
                            <input type="radio" name="cind" value="Magazine" />
                            <p>Magazine</p>
                        </div>
                    </div>
                    <section className="range-slider">
                        <input value={this.state.min} min={0} max={3000} type="range" step={100} onChange={(event: any) => this.setState({ min: event.target.value })} />
                        <input value={this.state.max} min={0} max={3000} step={100} type="range" onChange={(event: any) => this.setState({ max: event.target.value })} />
                    </section>
                    <p>{this.state.min}</p>
                    <p>{this.state.max}</p>
                </form>
                <button onClick={this.search}>ok</button>
            </div>
        )
    }
}
const mapStateToProps = (state: any) => ({
    books: state.books
});
const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bar);

