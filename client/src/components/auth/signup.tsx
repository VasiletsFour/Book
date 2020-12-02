import React, { Component, ComponentState } from 'react'

class Signup extends Component<any, { username: any, email: string, password: string, dispatch: any }> {

    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            dispatch: this.props.dispatch
        }
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this);
    }

    handleChange(event: any) {
        this.setState({[event.target.name]: event.target.value}as ComponentState)
    }

    login = (event: any) => {
        event.preventDefault()
        
        if (this.state.username.trim() == "" || this.state.email.trim() == "" || this.state.password.trim() == "") {
            alert("Empty input")
        }

        if (this.state.username.trim() != "" && this.state.email.trim() != "" && this.state.password.trim() != "") {

            const data: object = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                role: false
            }

            fetch('http://localhost:8800/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    this.props.closeSignUp()
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    render() {
        return (
            <div>
                <div className='auth-conteiner'>
                    <div className="opacity"></div>
                    <div className="auth">
                        <button onClick={this.props.closeSignUp}>X</button>
                        <div className='create-user'>
                            <h1>Sign up</h1>
                            <form>
                                <p>Username</p>
                                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Your email" />
                                <p>Email</p>
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Your email" />
                                <p>Password</p>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Your password" />
                                <button onClick={this.login}>Signin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup