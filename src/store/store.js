import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    userData: {},
    userRepos: [],
    userFollowers: [],
    userFollows: [],
    visitingUserData: {},
}

function userInfoReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USER_DATA": {
            return ({
                ...state,
                userData: action.payload,
            });
        }
        case "SET_USER_REPOS": {
            return ({
                ...state,
                userRepos: action.payload,
            });
        }
        case "SET_USER_FOLLOWERS": {
            return ({
                ...state,
                userFollowers: action.payload,
            });
        }
        case "SET_USER_FOLLOWS": {
            return ({
                ...state,
                userFollows: action.payload,
            });
        }
        case "CLEAN_UP": {
            return({
                userData: [],
                userRepos: [],
                userFollowers: [],
                userFollows: [],
            })
        }
        case "SET_VISITING_USER_DATA": {
            return ({
                ...state,
                visitingUserData: action.payload,
            });
        }
        default: 
            return (state);
    }
}

export default configureStore({
  reducer: userInfoReducer,
});
