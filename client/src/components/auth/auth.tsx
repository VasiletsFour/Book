import React, { Component, ComponentState } from "react"
import Signup from "./signup";
import jwt from "jsonwebtoken";

import "./style.css"

import { connect } from "react-redux";
import { role } from "../../redux/actions";

class Signin extends Component<any, { email: any, password: any, showSignup: any, dispatch: any, emailError: any, passError: any }> {

    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: '',
            showSignup: true,
            dispatch: this.props.dispatch,
            emailError: '',
            passError: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this);
    }
    toggleSignup() {
        this.setState({
            showSignup: !this.state.showSignup
        });
    }

    handleChange(event: any) {
        this.setState({ [event.target.name]: event.target.value } as ComponentState);
    }

    login = (event: any) => {
        event.preventDefault()

        const data: object = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.password.trim() == "" || this.state.email.trim() == "") {
            alert('error')
        }

        if (this.state.password.trim() != "" && this.state.email.trim() != "")


            fetch('http://localhost:8800/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((data) => {
                    if(data === "Invalid email"){
                        this.setState({
                            emailError:"red"
                        })
                    }
            
                    if(data === "Invalid Password"){
                        this.setState({
                            passError: "red"
                        })
                    }

                    if (data.authToken != undefined && data.refToken != undefined) {
                        localStorage.setItem('authToken', data.authToken)
                        localStorage.setItem('refToken', data.refToken)

                        let token: any = jwt.verify(data.authToken, "secretKey")

                        if (Boolean(token["role"]) === true || String(token["role"]) === "true") {
                            this.state.dispatch(role("admin"))
                        }

                        if (Boolean(token["role"]) === false || String(token["role"]) === "false") {
                            this.state.dispatch(role("user"))
                        }

                        this.props.closePopup()
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
    }

    render() {
        return (
            <div>
                <div className='auth-conteiner'>

                    <div className="opacity"></div>
                    {this.state.showSignup ?
                        <div className="auth">
                            <button onClick={this.props.closePopup}>X</button>
                            <div className='create-user'>
                                <h1>Sign in</h1>
                                <form>
                                    <p>Email</p>
                                    <input type="text" style={{borderColor: this.state.emailError}} name="email" value={this.state.email} onChange={this.handleChange} placeholder="Your email" />
                                    {this.state.emailError?
                                    <span style={{borderColor: this.state.emailError}} >Не верный емейл</span>:null}
                                    <p>Password</p>
                                    <input type="password" style={{borderColor: this.state.passError}} name="password" value={this.state.password} onChange={this.handleChange} placeholder="Your password" />
                                    {this.state.passError?<span style={{borderColor: this.state.passError}}>Не верный пароль</span>:null}
                                    <button onClick={this.login}>Signin</button>
                                </form>
                                <a onClick={this.toggleSignup.bind(this)}>Signup</a>
                            </div>

                        </div> : null}
                </div>
                {!this.state.showSignup ?
                    <Signup closeSignUp={this.toggleSignup.bind(this)} />
                    : null}
            </div>
        )
    }

}

const mapStateToProps = (state: any) => ({
    role: state.role
});

const mapDispatchToProps = (dispatch: any) => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);

