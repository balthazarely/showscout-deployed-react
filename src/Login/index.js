import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import LogoHeader from '../Header'
import LogoutPlaceholder from '../LogoutPlaceholder';


class Login extends Component {
	constructor() {
		super();

		this.state = {
			username: '', 
			password: '',
			location: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const login = await fetch('http://localhost:9000/auth/', {
			method: 'POST', 
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedLogin = await login.json();
		console.log(parsedLogin, 'response from login');
		if(parsedLogin.status.message === 'User Logged In') {
			console.log('logged in');
			this.props.history.push('home')
		}
	}

	render() {
		return (
			<div>
				{/* <LogoutPlaceholder /> */}
				{/* <LogoHeader /> */}
				<div className="login-box">
					<form onSubmit={this.handleSubmit} className="ui form">
					<h1 className="white"> Login </h1>
							<div className="white field">
								<h5 className="white">Username</h5>
								<input type='text' name='username' onChange={this.handleChange}/>
							</div>
							<div className="white field">
								<h5 className="white">Password</h5>
								<input type='password' name='password' onChange={this.handleChange}/>
							</div>
							<div className="reg-login-btn">
							<Button.Group>
								<Button basic inverted color="pink" className="ui color1 button" className="reg-login-btn" type="submit">
									Login
								</Button>
								<Button basic inverted color="orange" className="ui color1 button" className="reg-login-btn" href="/register">
									Register
								</Button> 
							</Button.Group>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Login;



