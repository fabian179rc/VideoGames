import {
    GET_GAME_DETAIL,GET_VIDEOGAMES,GET_GAME_NAME,GET_GENRES,POST_CREATE_GAME,CLEAN_GET_DETAIL
} from '../actions'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//el id que le pasas al key en Users.jsx debe ser definido en algún lado, 
//por ejemplo aquí
// let index = 1; 

const initialState = {
    videoGames: [],
    videoGamesName: [],
    gameDetail: {},
    loadedGameDetail: false,
    genres: [],
    loaded: false
}

export default function rootReducer(state=initialState, action){
    switch (action.type) {
        case GET_VIDEOGAMES:
            return{
                ...state,
                videoGames: action.payload,
                loaded: true
            };
        case GET_GAME_NAME:
            return{
                ...state,
                videoGamesName: action.payload,
            };
        case GET_GAME_DETAIL:
            return{
                ...state,
                gameDetail: action.payload,
                loadedGameDetail: true

            };
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            };
        case POST_CREATE_GAME:
            return{
                ...state,
                videoGames: state.videoGames.push(action.payload)
            };
        case CLEAN_GET_DETAIL:
            return{
                ...state,
                gameDetail: {},
                loadedGameDetail:false
            }
        default:
            return state;
    }
}