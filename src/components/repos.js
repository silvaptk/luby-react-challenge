import React, { Component } from 'react';


// Assets
import locked from './../assets/locked.svg'
import unlocked from './../assets/unlocked.svg'
import star from './../assets/star.svg'

// Components
import HeaderBar from './headerBar.js'
import BottomBar from './bottomBar.js'
import ScrollToTop from './scrollToTop.js'

// CSS
import './repos.scss'

class Repository extends Component {
    render() {
        return(<section>
            <strong title = "Nome do repositório"><div></div>{this.props.name}</strong>
            <small title = "Descrição do repositório">{this.props.desc}</small>
            <div>
                <div title = "Marcado como favorito">
                    <img src = {star} alt = "Favorito"/> {this.props.favs}
                </div>
                <div>
                    <button title = "Liberar"><img src = {unlocked} alt = "Desabilitar"/></button>
                    <button title = "Bloquear"><img src = {locked} alt = "Habilitar"/></button>
                </div>
            </div>
        </section>);
    }
}

class Repos extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userRepos: [],
            propsIsReady: false,
        }

        if (!this.state.userRepos || !this.state.userRepos.length) 
            this.props.getUserRepos();
    }

    componentDidMount() {
        this.setState({userRepos: this.props.userRepos});
    }

    componentDidUpdate() {
        if (!this.state.propsIsReady) {
            if (this.props.userRepos && this.props.userRepos.length) 
                this.setState({
                    userRepos: this.props.userRepos,
                    propsIsReady: true,
                });
        }
    }

    render() {
        return (
            <div className = "repos">
                <ScrollToTop/>
                <HeaderBar title = {this.state.userRepos ? this.state.userRepos.length + " repositórios" : "Nenhum repositório"}/>
                <main>
                    {this.state.userRepos.map((repo, index) => (
                        <Repository 
                            key = {repo.id}
                            name = {repo.name}
                            desc = {repo.description}
                            favs = {repo.stargazers_count}
                        />
                    ))}
                </main>
                <BottomBar/>
            </div>
        );
    }
}

export default Repos;
