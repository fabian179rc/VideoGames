import axios from 'axios'; 
import dotenv from 'dotenv'

export const GET_GAME_DETAIL="GET_GAME_DETAIL", CLEAN_GET_DETAIL="CLEAN_GET_DETAIL", GET_VIDEOGAMES="GET_VIDEOGAMES", GET_GAME_NAME="GET_GAME_NAME", GET_GENRES="GET_GENRES", POST_CREATE_GAME="POST_CREATE_GAME"
dotenv.config();
const url = process.env.REACT_APP_API || "http://localhost:3001";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getVideogames (){
    return function(dispatch){
        return fetch(`${url}/videogames`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_VIDEOGAMES, payload: data}))
    }
};
export function getGameName (name){
        return function(dispatch){
            return fetch(`${url}/videogames?name=${name}`)
            .then(response => response.json())
            .then(data => dispatch({type: GET_GAME_NAME, payload: data}))
        }
}
export function getGamedetail (id){
    return function(dispatch){
        return fetch(`${url}/videogame/${id}`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_GAME_DETAIL, payload: data}))
        .catch(err=>console.log(err))
    }

};

export function getGenres (){
    return function(dispatch){
        return fetch(`${url}/genres`)
        .then(response => response.json())
        .then(data => dispatch({type: GET_GENRES, payload: data}))
    }
};
export function postCreateGame (game){
    return function(dispatch){
        return axios.post(`${url}/videogames`, game)
        .then(response => response.data)
        .then(data => dispatch({type: POST_CREATE_GAME, payload: data}))
    }
};
export function cleanDetail(){
    return {type:CLEAN_GET_DETAIL}
}
