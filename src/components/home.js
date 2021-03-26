import React, { Component } from 'react';

// Router
import { Link, withRouter } from 'react-router-dom'

// Assets
import exitIcon from './../assets/exit.svg'
import saveIcon from './../assets/save.svg'
import leftArrow from './../assets/wLeftArrow.svg'

// CSS
import './home.scss'

// Controlers
import BottomBar from './bottomBar.js'
import ScrollToTop from './scrollToTop.js'

class HomeHeader extends Component {
    render() {
        return (
            <header>
                {this.props.visiting ? <Link to = "home"><button><img src = {leftArrow} alt = "Voltar"/></button></Link> : ""}
                <strong className = {this.props.visiting ? "centralize" : ""}>{this.props.username}</strong>
                <button onClick = {this.props.exitOrSave}>
                    <span>{this.props.visiting ? "Salvar" : "Sair"}</span>
                    <img src = {this.props.visiting ? saveIcon : exitIcon} alt = "Sair"/>
                </button>
            </header>
        );
    }
}

class ProfilePhoto extends Component {
    render() {
        return (
            <div className = "profilePhotoContainer">
                <img src = {this.props.photo} alt = "Foto de perfil"/>
            </div>
        );
    }
}

class Section extends Component {
    render() {
        return (
            <section>
                <h2><div></div>{this.props.header}</h2>
                <div>{this.props.content}</div>
            </section>
        );
    }
}

class Card extends Component {
    render() {
        return(<div className = {"card" + (this.props.active ? " active" : "")}>
            <h1>{this.props.value}</h1>
            <p>{this.props.description}</p>
        </div>);
    }
}

class CardContainer extends Component {
    render() {
        if (this.props.active)
            return (
                <div className = "cardContainer">
                    {this.props.infos.map((info) => (
                        <Link to = {info.routeTo} key = {info.routeTo}>
                            <Card 
                                value = {info.value} 
                                description = {info.description}
                                active = {this.props.active}
                            />
                        </Link>
                    ))}
                </div>
            );
        
        return (
            <div className = "cardContainer">
                {this.props.infos.map((info) => (
                    <Card
                        key = {info.routeTo}
                        value = {info.value}
                        description = {info.description}
                        active = {this.props.active}
                    />
                ))}
            </div>
        );
    }
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardInfos: [
                {routeTo: '/followers', value: this.props.userData.followers, description: 'Seguidores'},
                {routeTo: '/following', value: this.props.userData.following, description: 'Seguindo'},
                {routeTo: '/repos', value: this.props.userData.public_repos, description: 'Repos'},
            ],
        }
    }

    exitOrSave = () => {
        if (this.props.visiting)
            this.props.setVisitingUserAsMain();
        else 
            this.props.history.push("/");
    }

    render() {
        return (
            <div className = "page">
                <ScrollToTop/>
                <HomeHeader 
                    location = {this.props.location} 
                    username = {"#" + this.props.userData.login}
                    exitOrSave = {this.exitOrSave}
                    visiting = {this.props.visiting}
                />
                <ProfilePhoto photo = {this.props.userData.avatar_url}/>
                <Section 
                    header = {this.props.userData.name}
                    content = {(
                        <span>
                            {this.props.userData.email || "Nenhum e-mail disponível"}
                            <br/>
                            {this.props.userData.location || "Nenhuma localização disponível"}
                        </span>
                    )}
                />
                <CardContainer infos = {this.state.cardInfos} active = {!this.props.visiting}/>
                <Section 
                    header = "Bio"
                    content = {this.props.userData.bio}
                />
                <BottomBar visitingUserClass = {this.props.visitingUserClass}/>
            </div>
        );
    }
}

export default withRouter(Home);
