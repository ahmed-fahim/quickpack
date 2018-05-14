import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';



class TopHome extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			uid:this.props.uid			
		}
	}
	render(){
		if(this.state.auth===0){
			return (
				<div>
					<div className="w3-bar w3-top w3-black w3-padding-16">
						<button className="w3-btn w3-left-margin logoFont w3-xxlarge">MawaBD</button>
						
						<div className="w3-hide-small w3-right">
							// <Link to={'/login'} className="w3-button w3-right barFont w3-large"> LOG IN </Link>
							// <Link to={'/registration'} className="w3-button w3-right barFont w3-large"> Register </Link>							
						
						</div>
					</div>
					<br/><br/><br/><br/><br/>

				</div>

			);
			
		}
		else if(this.state.auth===1){
		
		}
	}
}
class TopLogin extends Component{
	
	
}
class TopRegister extends Component{
	
}

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			uid:this.props.uid,
			token:this.props.token,
			name:this.props.name,
			ky:0
		};
		this.provideKey=this.provideKey.bind(this);
	}
	provideKey(){
		var kk=this.state.ky;
		this.setState({
			ky:kk+1
		});
		return kk;
	}	
	render(){
		return(
		<div>
		{'login'}
		</div>
		);
		
	}
}
class Registration extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			uid:this.props.uid,
			token:this.props.token,
			name:this.props.name,
			ky:0
		};
		this.provideKey=this.provideKey.bind(this);
	}	
	provideKey(){
		var kk=this.state.ky;
		this.setState({
			ky:kk+1
		});
		return kk;
	}	
}
class FlightReg extends Component{
	
	
}
class Flight extends Component{
	
	
}
class FlightSearch extends Component{
	render(){
		return(
			<h1>FlightSearchITEM</h1>
		);
		
	}
}
class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			uid:this.props.uid,
			token:this.props.token,
			name:this.props.name,
			ky:0
		};
		
	}
	
	render(){
		return(
			<div>
				<h1> Some sanity </h1>
			</div>
		);
	}
	
}
class App extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:0,
			uid:0,
			token:0,
			name:0,
			curr:0,
			ky:0
		};
		//this.viewController=this.viewController.bind(this);
		this.preRender=this.preRender.bind(this);
		this.handle_Home=this.handle_Home.bind(this);
	}
	
	
	handle_Home(){
		return(
			<Home key={this.state.ky+1} auth={this.state.auth} />
		);
		
	}
	preRender(){
		var layer1=[];
		var layer2=[];
		var layer3=[];
		if(this.state.curr === 0){
			layer3.push(
				<div>
					<Redirect to = {'/'} />
					<Route exact path={'/'} render={this.handle_Home.bind(this)} />
				</div>
			);

		}
		return layer3;
		
	}
	
	render(){
		return(
			<Router>
				<div>
				{this.preRender()}
				</div>
			</Router>
		
		);
	}
	
	
}

export default App;
