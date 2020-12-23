import React, { Component } from "react"
import "./style.css"

class Shoping extends Component<any, { books: any }> {
    constructor(props: any) {
        super(props)
        this.state = {
            books: localStorage.getItem('book')
        }
    }
    objLenght(obj: any) {
        let i = 0
        for (let key in obj) {
            i++
        }
        return i - 1
    }

    handleBuy() {
        console.log("buy")
    }

    render() {
        const list: any = []
        let booksJson = JSON.parse(this.state.books)
        for (let i = 0; i <= this.objLenght(booksJson); i++) {
            let book: any = JSON.parse(booksJson[i])
            list.push(
                <div className="cart">
                    <div className="img-conteiner">
                        {/* <img /> */}
                    </div>
                    <p className="name">{book.name}</p>
                    <p className="author">{book.author}</p>
                    <p className="price">{book.price}</p>
                    <button onClick={this.handleBuy}>BUY</button>
                </div>
            )
        }
        return (
            <div>
                {list}
            </div>
        )
    }

}

export default Shoping