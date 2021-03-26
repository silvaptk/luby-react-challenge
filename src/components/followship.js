import React, { Component } from 'react';

// Components
import HeaderBar from './headerBar.js'
import BottomBar from './bottomBar.js'
import ScrollToTop from './scrollToTop.js'

// Assets
import rightArrow from './../assets/wRightArrow.svg'

// CSS
import './followship.scss'

class Follow extends Component {
    render() {
        return(<section onClick = {this.props.authenticate}>
            <div></div>

            <div className = "avatarContainer">
                <img src = {this.props.userPic} alt = "Avatar do seguidor" title = "Avatar do seguidor"/>
            </div>
            
            <strong title = "Nome de usuário">#{this.props.username}</strong>
            
            <button><img 
                src = {rightArrow} 
                alt = "Visitar perfil"
                title = "Visitar perfil"
            /></button>
        </section>);
    }
}

class Followship extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followships: this.props.data,
            propIsReady: false,
        }

        if (!this.props.data || !this.props.data.length) {
            if (this.props.type === "followers")
                this.props.getUserFollowers();
            else 
                this.props.getUserFollows();
        }

    }

    componentDidMount() {
        this.setState({followships: this.props.data});
    }

    getData = () => {
        this.setState({
            followships: this.props.data,
            propIsReady: true,
        });
    }

    componentDidUpdate() {
        if (!this.state.propIsReady) {
            if (this.props.data && this.props.data.length) {
                this.getData();
            }
        }
    }
    
    render() {
        return (
            <div className = "followship">
                <ScrollToTop/>
                <HeaderBar 
                    title = {
                        this.props.type === "followers" ? 
                            (this.state.followships.length + " seguidores") : 
                            ("Seguindo " + this.state.followships.length + " pessoas")
                    }
                />
                <main>
                    {this.state.followships.map((follow, index) => (
                        <Follow
                            key = {index}
                            userPic = {follow.avatar_url}
                            username = {follow.login}
                            authenticate = {() => {this.props.authenticate(follow.login, true, this.props.type)}}
                        />
                    ))}
                </main>
                <BottomBar visitingUserType = {this.visitingUserType}/>
            </div>
        );
    }
}

export default Followship;
