import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Redux
import store from './store/store.js';

// Router
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'

// Transições animadas
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import Enter from './components/enter.js'
import Home from './components/home.js'
import Followship from './components/followship.js'
import Repos from './components/repos.js'

// CSS
import './index.scss'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logInErrorMessage: "",
            logInError: false,
            userData: null,
            userRepos: null,
            userFollowers: null,
            userFollows: null,
            vistingUserData: null,
            visitingUser: false,
            visitingUserClass: "",
        };

        const updateUserData = () => {
            this.setState({
                userData: store.getState().userData
            });
        };

        const updateUserRepos = () => {
            this.setState({
                userRepos: store.getState().userRepos
            });
        }

        const updateUserFollowers = () => {
            this.setState({
                userFollowers: store.getState().userFollowers
            });
        }

        const updateUserFollows = () => {
            this.setState({
                userFollows: store.getState().userFollows
            });
        }

        const updateVisitingUserData = () => {
            this.setState({
                visitingUserData: store.getState().visitingUserData,
                visitingUser: (store.getState().visitingUserData ? true : false),
            });
        }
        
        store.subscribe(updateUserData);
        store.subscribe(updateUserRepos);
        store.subscribe(updateUserFollowers);
        store.subscribe(updateUserFollows);
        store.subscribe(updateVisitingUserData);
    }

    authenticateUser = (username, visiting, userClass) => {
        if (!visiting)
            store.dispatch({type: "CLEAN_UP"});

        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (response.status === 404) {
                    return (null);
                }
                else {
                    return (response.json());
                }
            })
            .then((data) => {
                if (data) {
                    let userData = {
                        login: data.login,
                        name: data.name,
                        location: data.location,
                        company: data.company,
                        bio: data.bio,
                        avatar_url: data.avatar_url,
                        followers_url: data.followers_url,
                        following_url: data.following_url,
                        organizations_url: data.organizations_url,
                        starred_url: data.starred_url,
                        public_repos: data.public_repos,
                        public_gists: data.public_gists,
                        followers: data.followers,
                        following: data.following,
                    };

                    store.dispatch({
                        type: (visiting ? "SET_VISITING_USER_DATA" : "SET_USER_DATA"),
                        payload: userData,
                    });

                    this.setState({
                        logInError: false,
                        logInErrorMessage: "",
                        visiting: visiting,
                        visitingUserClass: userClass,
                    });

                    this.props.history.push((this.state.visiting ? "/visitingUser" : "/home"));
                }
                else {
                    this.setState({
                        logInError: true,
                        logInErrorMessage: "O usuário inserido não existe."
                    });
                }   
            });
    }
    
    retrieveUserRepos = async () => {
        console.log("Obtendo repositórios do usuário");
        if(!this.state.userRepos || !this.state.userRepos.length) {
            await fetch("https://api.github.com/users/" + this.state.userData.login + "/repos")
                .then((response) => {
                    return (response.json());
                })
                .then((data) => {
                    console.log(data);
                    store.dispatch({
                        type: "SET_USER_REPOS",
                        payload: data,
                    });

                    this.setState({
                        logInError: false,
                        logInErrorMessage: "",
                    });
                });
        }
    }

    retrieveUserFollowers = async () => {
        if(!this.state.userFollowers || !this.state.userFollowers.length)
            await fetch("https://api.github.com/users/" + this.state.userData.login + "/followers")
                .then((response) => {
                    return (response.json());
                })
                .then((data) => {
                    store.dispatch({
                        type: "SET_USER_FOLLOWERS",
                        payload: data,
                    });

                    this.setState({
                        logInError: false,
                        logInErrorMessage: "",
                    });
                });
    }

    retrieveUserFollows = async () => {
        if(!this.state.userFollows || !this.state.userFollows.length)
            await fetch("https://api.github.com/users/" + this.state.userData.login + "/following")
                .then((response) => {
                    return (response.json());
                })
                .then((data) => {
                    console.log(data);
                    store.dispatch({
                        type: "SET_USER_FOLLOWS",
                        payload: data,
                    });

                    this.setState({
                        logInError: false,
                        logInErrorMessage: "",
                    });
                });
    }

    setVisitingUserAsMain = (userClass) => {
        let newMainUserData = this.state.visitingUserData;
        
        store.dispatch({type: "CLEAN_UP"});
        store.dispatch({
            type: "SET_USER_DATA",
            payload: newMainUserData,
        });
        
        this.setState({
            userData: newMainUserData,
            visitingUser: false
        });
        
        this.props.history.push("/home");
        console.log("definindo usuário visitado como principal");
    }
    
    render() {
        return (
            <TransitionGroup>
                <CSSTransition
                    key = {this.props.location.key}
                    timeout = {300}
                    classNames = "fade"
                >
                    <Switch location = {this.props.location}>
                        <Route exact path = "/">
                            <Enter 
                                authenticate = {this.authenticateUser} 
                                logInError = {this.state.logInError}
                                logInErrorMessage = {this.state.logInErrorMessage}
                            />
                        </Route>
                        <Route exact path = "/home">
                            {this.state.userData ? 
                                <Home 
                                    userData = {this.state.userData}
                                    visiting = {false}
                                /> :
                                <Redirect to = "/"/>
                            }
                        </Route>
                        <Route exact path = "/followers">
                            {this.state.userData ? 
                                <Followship 
                                    type = "followers" 
                                    data = {this.state.userFollowers}
                                    getUserFollowers = {this.retrieveUserFollowers}
                                    authenticate = {this.authenticateUser}
                                /> : 
                                <Redirect to = "/"/>
                            }
                        </Route>
                        <Route exact path = "/following">
                            {this.state.userData ? 
                                <Followship 
                                    type = "following" 
                                    data = {this.state.userFollows}
                                    getUserFollows = {this.retrieveUserFollows}
                                    authenticate = {this.authenticateUser}
                                /> : 
                                <Redirect to = "/"/>
                            }
                        </Route>
                        <Route exact path = "/repos">
                            {this.state.userData ? 
                                <Repos 
                                    userRepos = {this.state.userRepos}
                                    getUserRepos = {this.retrieveUserRepos}    
                                /> : 
                                <Redirect to = "/"/>
                            }
                        </Route>
                        <Route exact path = "/visitingUser">
                            {this.state.userData ? 
                                <Home 
                                    userData = {this.state.visitingUserData}
                                    visiting = {true}
                                    setVisitingUserAsMain = {this.setVisitingUserAsMain}
                                    visitingUserClass = {this.state.visitingUserClass}
                                /> :
                                <Redirect to = "/"/>
                            }
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route path = "*" component = {withRouter(App)}>
                </Route>
            </Switch>
        </Router>
    )
    , document.getElementById("root")
);
