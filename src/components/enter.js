import React, { Component } from 'react';

// Assets
import logo from './../assets/githubMarkYellow.svg'
import rightArrow from './../assets/rightArrow.svg'

// CSS
import './enter.scss'

const Logo = () => (<img src = {logo} alt = "Logo do GitHub"/>)

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyField: true,
            username: "",
        };
    }

    handleField = (event) => {
        if (!event.target.value.length) {
            this.setState({emptyField: true});
            this.setState({username: ""});
        } 
        else {
            this.setState({emptyField: false});
            this.setState({username: event.target.value.trim()});
        }   

        if (event.keyCode === 13) {
            this.authenticate();
        }

        return (false);
    };

    authenticate = () => {
        if (!this.state.emptyField) {
            this.props.authenticate(this.state.username, false, "");
        }
    }

    render() {
        return(
            <form onSubmit = {(e) => { e.preventDefault(); }}>
                <small className = {this.state.emptyField ? "hide label" : "label"}>Usuário</small>
                
                <fieldset>
                    <label>
                        <input 
                            type = "text" 
                            name = "ghUsername"
                            placeholder = "Usuário"
                            onKeyUp = {(event) => {this.handleField(event)}}
                            autoComplete = "off"
                        />
                        <small className = {this.state.emptyField ? "errorMessage" : "errorMessage hide"}>Campo obrigatório</small>
                    </label>
                </fieldset>

                <button 
                    type = "button" 
                    onClick = {this.authenticate}
                >
                    <span>Entrar</span> <img src = {rightArrow} alt = "Entrar"/>
                </button>
                
                {this.props.error ? (<small className = "errorMessage">{this.props.errorMessage}</small>) : ""}
            </form>
        );
    }
}

class Enter extends Component {
    render() {
        return (
            <div className = "enter">
                <Logo/>
                
                <Form 
                    authenticate = {this.props.authenticate}
                    error = {this.props.logInError}
                    errorMessage = {this.props.logInErrorMessage}
                />
            </div>
        )
    }
}

export default Enter;