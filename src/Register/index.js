import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import LogoHeader from '../Header'



class Register extends Component {
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

		const register = await fetch('http://localhost:9000/auth/register', {
			method: 'POST', 
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedRegister = await register.json();
		console.log(parsedRegister, 'response from register');
		if(parsedRegister.status.message === 'User Logged In') {
			console.log('logged in');
			this.props.history.push('/home');

			//
		}
	}

	render() {
		return (
		

	<div>
	

	<div className="login-box">
		<form onSubmit={this.handleSubmit} className="ui form">
		<h1 className="white"> Register </h1>
				<div className="white field">
					<h5 className="white">Username</h5>
					<input type='text' name='username' onChange={this.handleChange}/>
				</div>
				<div className="white field">
					<h5 className="white">Password</h5>
					<input type='password' name='password' onChange={this.handleChange}/>
				</div>
				<div className="white field">
					<h5 className="white">Location</h5>
					<input type='text' name='location' onChange={this.handleChange}/>
				</div>
			
				<div className="reg-login-btn">
					<Button.Group>
						<Button basic inverted color="pink" className="ui color1 button" className="reg-login-btn" type="submit">
						Make Account
					</Button>
					<Button basic inverted color="orange" className="ui color1 button" className="reg-login-btn"  href="/">
						Back
					</Button>
					</Button.Group>
				</div>
	</form>
</div>
</div>
			)
	}
}

export default Register;


// <div>
// <h3>Register</h3>
// 	<form onSubmit={this.handleSubmit} className="ui form">
// 		<div className="two fields">
// 			<div class="field">
// 				<label>Username</label>
// 				<input type='text' name='username' onChange={this.handleChange}/>
// 			</div>
// 			<div class="field">
// 				<label>Password</label>
// 				<input type='password' name='password' onChange={this.handleChange}/>
// 			</div>
// 		</div>
// 		<div className="centerme">
// 			<Button class="teal " type="submit">
// 				Register
// 			</Button>
// 		</div>
// 	</form>
// </div>






