import React, { Component } from 'react';


// Router
import { Link } from 'react-router-dom'

// Assets
import leftArrow from './../assets/wLeftArrow.svg'

// CSS
import './headerBar.scss'

class HeaderBar extends Component {
    render() {
        return(
            <header className = "headerBar">
                <Link to = "/home">
                    <button><img src = {leftArrow} alt = "Voltar à página principal"/></button>
                </Link>
                <strong>{this.props.title}</strong>
            </header>
        )
    }
}

export default HeaderBar;