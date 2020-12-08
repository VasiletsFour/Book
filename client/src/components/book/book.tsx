import React, { Component } from "react";
import "./style.css";
import Order from "../order/order";
import Baner from "../search-input/search-bar";
import Bar from "../side-bar/side-bar";

import { connect } from "react-redux";
import { book } from "../../redux/actions";

// const Book

// class Book extends Component<any, { token: any, err: any, isLoaded: any, bookOrder: any, showOrder: boolean, pageCount: any, dispatch: any }>{
//     constructor(props: any) {
//         super(props)
//         this.state = {
//             token: localStorage.getItem("authToken"),
//             err: null,
//             isLoaded: false,
//             bookOrder: '',
//             showOrder: false,
//             pageCount: 1,
//             dispatch: this.props.dispatch
//         }
//         this.handleChangeOpen = this.handleChangeOpen.bind(this)
//         this.dispatchBook = this.dispatchBook.bind(this)
//         this.pagination = this.pagination.bind(this)
//     }

//     objLenght(obj: any) {
//         let i = 0
//         for (let key in obj) {
//             i++
//         }
//         return i - 1
//     }

//     fetchBook(page: number) {
//         fetch("http://localhost:8800/books/" + page, {
//             headers: {
//                 "auth-token": this.state.token
//             }
//         })
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     this.state.dispatch(book(result.books))

//                     this.setState({
//                         isLoaded: true,
//                         pageCount: result.count
//                     })

//                 },
//                 (err) => {
//                     this.setState({
//                         isLoaded: true,
//                         err
//                     })
//                 }
//             )
//     }

//     componentDidMount() {
//         this.fetchBook(1)
//     }

//     toggleOrder() {
//         this.setState({
//             showOrder: !this.state.showOrder
//         });
//     }

//     handleChangeOpen(event: any) {
//         let book = event.target.closest("a").className[5]

//         this.setState({
//             showOrder: !this.state.showOrder,
//             bookOrder: this.props.books[book]
//         })
//     }

//     dispatchBook(arg: any) {
//         this.state.dispatch(book(arg))
//     }

//     skip(int: number) {
//         if (int == 1) {
//             return 1
//         }

//         if (int != 1) {
//             return Number(6 * (int - 1))
//         }
//     }

//     pagination(event: any) {
//         let page: any = this.skip(event.target.innerHTML)
//         this.fetchBook(page)
//     }

//     render() {
//         const { error, isLoaded, items }: any = this.state

//         if (error) {
//             return <div>Error: {error.message}</div>;
//         }

//         if (!isLoaded) {
//             return <div>Loading...</div>;
//         }

//         if (!error && isLoaded) {
//             const listBook: any = []
//             const listButton: any = []

//             for (let i = 0; i <= this.objLenght(this.props.books); i++) {

//                 listBook.push(

//                     <a key={this.props.books[i]?._id} className={"cart" + " " + [i]} onClick={this.handleChangeOpen} >
//                         <div className="img-conteiner">
//                             {/* <img /> */}
//                         </div>
//                         <p className="name" id='bookName'>{this.props.books[i]?.name}</p>
//                         <p className="author" id="bookAuthor">{this.props.books[i]?.author}</p>
//                         <p className="price" id="bookPrice">{this.props.books[i]?.price}<span>Грн</span></p>
//                     </a>)

//             }

//             for (let i = 0; i <= this.state.pageCount - 1; i++) {
//                 listButton.push(
//                     <button key={i}>{i + 1}</button>
//                 )
//             }

//             return (
//                 <div>

//                     <Baner url={"http://localhost:8800/books/sort"} page={"Book Catalog"} dataFoo={this.dispatchBook} />
//                     <div className="wraperr">

//                         {!this.state.showOrder ?
//                             <div>
//                                 <Bar />
//                                 <div className="book-conteiner">
//                                     {listBook}
//                                 </div>
//                                 {listBook.length <= 6 ?
//                                     < div onClick={this.pagination}>
//                                         {listButton}
//                                     </div> : null}
//                             </div> : null}
//                         {this.state.showOrder ?
//                             <Order closeOrder={this.toggleOrder.bind(this)} book={this.state.bookOrder} /> : null}
//                     </div>
//                 </div >
//             )
//         }
//     }
// }

// const mapStateToProps = (state: any) => ({
//   books: state.books,
//   count: state.count,
//   role: state.role,
// });
// const mapDispatchToProps = (dispatch: any) => ({
//   dispatch,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Book);
