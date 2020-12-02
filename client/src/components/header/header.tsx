import React, { Component } from "react"
import "./style.css"
import logo from './img/Book_Logo_svg.png'
import user from './img/User.png'
import shopping from './img/shopping cart.png'
import Signin from '../auth/auth'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { connect } from "react-redux";
import { role } from "../../redux/actions";

class Header extends Component<any, { showPopup: any, url: any, countBook: any, dispatch: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            showPopup: false,
            url: 'http://localhost:8800/books/sort',
            countBook: localStorage.getItem('book'),
            dispatch: this.props.dispatch
        };
        this.handleClick = this.handleClick.bind(this)
    }

    objLenght(obj: any) {
        let i = 0
        for (let key in obj) {
            i++
        }
        return i
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    
    handleLogout = (event: any) => {
        event.preventDefault()

        localStorage.clear();
    }

    handleClick = (event: any) => {
        this.props.updateData(event.target.innerHTML)
    }

    render() {
        let bookStorage: any = localStorage.getItem('book')
        let bookJson = JSON.parse(bookStorage)

        return (
            <div>
                {this.state.showPopup ?
                    <Signin closePopup={this.togglePopup.bind(this)} /> : null}
                <div className="header">
                    <div className="logotype">
                        <img src={logo} alt="logo" />
                    </div>
                    {this.props.role == "admin" ?
                        <div className="admin-root"  >
                            <nav>
                                <ul>
                                    <li><Link to="/adminBook" >Book</Link></li>
                                    <li><Link to="/adminAuthor">Author</Link></li>
                                    <li><Link to="/adminUser">Users</Link></li>
                                    <li><Link to="/adminOrder">Orders</Link></li>
                                </ul>
                            </nav>
                        </div> : null}
                    <div className="for-user">
                        <button onClick={this.togglePopup.bind(this)} >
                            <a >Login</a>
                        </button>
                        <button onClick={this.handleLogout}>
                            <img src={user} alt="user" />
                        </button>
                        <Link to="/shoping" >
                            {bookJson === null ?
                            <div className="count">0</div>:
                            <div className="count">{bookJson?.length}</div>
                            }
                            <img src={shopping} alt="shooping" />
                        </Link>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state: any) => ({
    count: state.count,
    role: state.role,
    shopping: state.shoping
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);