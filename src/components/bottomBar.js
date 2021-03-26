import React, { Component } from 'react';

// Router
import { Link, withRouter } from 'react-router-dom'

// Assets
import homeIcon from './../assets/homeIcon.svg'
import reposIcon from './../assets/reposIcon.svg'
import peopleIcon from './../assets/peopleIcon.svg'

// CSS
import './bottomBar.scss'

function BottomLink(props) {
    return (
        <Link to = {props.linkTo}>
            <button className = {"bottomLink" + (props.active ? " active" : "")}>
                <img 
                    src = {props.imgAddr}
                    alt = {props.imgAlt}
                />
                <span>{props.name}</span>
            </button>
        </Link>
    );
}

class BottomBar extends Component {
    render() {
        let bottomLinks = [
            {linkTo: '/home', imgAddr: homeIcon, imgAlt: 'Página inicial', name: 'Home'},
            {linkTo: '/repos', imgAddr: reposIcon, imgAlt: 'Repositórios', name: 'Repos'},
            {linkTo: '/followers', imgAddr: peopleIcon, imgAlt: 'Seguidores', name: 'Seguidores'},
            {linkTo: '/following', imgAddr: peopleIcon, imgAlt: 'Seguindo', name: 'Seguindo'},
        ];
        
        return (
            <div className = "bottomBar">
                {bottomLinks.map((bottomLink) => {
                    let active = false;
                    if (this.props.location.pathname === bottomLink.linkTo)
                        active = true;
                    if ("/" + this.props.visitingUserClass === bottomLink.linkTo)
                        active = true;

                    return (
                        <BottomLink
                            key = {bottomLink.linkTo}
                            linkTo = {bottomLink.linkTo}
                            active = {active}
                            imgAddr = {bottomLink.imgAddr} 
                            imgAlt = {bottomLink.imgAlt}  
                            name = {bottomLink.name}
                        />
                    );
                })}        
            </div>
        )
    }
}

export default withRouter(BottomBar);