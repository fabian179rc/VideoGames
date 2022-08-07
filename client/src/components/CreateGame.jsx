/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useHistory } from 'react-router-dom';
import { getGenres, postCreateGame } from '../redux/actions';
import s from '../styles/create.module.css'
import h from '../styles/home.module.css'
// import Loading from '../components/Loading'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let platforms = [
    "PC",
    "PlayStation 5",
    "Xbox One",
    "PlayStation 4",
    "Xbox Series S/X",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo 3DS",
    "Nintendo DS",
    "Nintendo DSi",
    "macOS",
    "Linux",
    "Xbox 360",
    "Xbox",
    "PlayStation 3",
    "PlayStation 2",
    "PlayStation",
    "PS Vita",
    "PSP",
    "Wii U",
    "Wii",
    "GameCube",
    "Nintendo 64",
    "Game Boy Advance",
    "Game Boy Color",
    "Game Boy",
    "SNES",
    "NES",
    "Classic Macintosh",
    "Apple II",
    "Commodore / Amiga",
    "Atari 7800",
    "Atari 5200",
    "Atari 2600",
    "Atari Flashback",
    "Atari 8-bit",
    "Atari ST",
    "Atari Lynx",
    "Atari XEGS",
    "Genesis",
    "SEGA Saturn",
    "SEGA CD",
    "SEGA 32X",
    "SEGA Master System",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
];

export default function CreateGame() {

const dispatch = useDispatch()
const genres = useSelector(state=>state.genres) 
const history = useHistory()
const [errors, setErrors] = useState({})
const [state, setState] = useState({
        name: "",
        description: "",
        img: "",
        updated: "",
        rating: "",
        platforms: [],
        genres: []
});

const genresarr =[]
for (const property in genres) {
    genresarr.push(genres[property])
};

useEffect(()=>{
    if(Object.entries(genres).length === 0)dispatch(getGenres())
},[genres])


function validate(state) {
let errors = {};
if (state.name.length < 3) {
    errors.name = "Check the length of your name. Must contain at least 3 characters"
} else if (state.description.length < 20) {
    errors.description = "The description must exceed 20 characters"
}
return errors;
};

function handleChange(e) {
e.preventDefault();
setState({
    ...state,
    [e.target.name]: e.target.value
})
setErrors(validate({
    ...state,
    [e.target.name]: e.target.value
}));
};

function handleChangeGenres(e) {
e.preventDefault();
if (!state.genres.includes(e.target.value)) {
    setState({
        ...state,
        genres: [...state.genres, e.target.value]
    })
}
};

function handleDeleteGenres(e,s) {
e.preventDefault()
    setState({
    ...state,
    genres: state.genres.filter(g => g !== s)
    })
};

function handleChangePlatforms(e) {
e.preventDefault();
if (!state.platforms.includes(e.target.value)) {
    setState({
        ...state,
        platforms: [...state.platforms, e.target.value]
    })
}
};

function handleDeletePlatforms(e,s) {
    e.preventDefault()
    setState({
        ...state,
        platforms: state.platforms.filter(p => p !== s)
    })
};

function handleSubmit(e) {
    if (!state.name || !state.description || !state.updated || !state.rating || state.platforms.length < 1 || state.genres.length < 1) {
        e.preventDefault();
    }
    else {
        dispatch(postCreateGame(state));
        alert("Videogame created succesfully!");
        setState({
            name: "",
            description: "",
            img: "",
            released: "",
            rating: "",
            platforms: [],
            genres: []
        })
        history.push('/home')
    }
};

return(
    <Fragment>

    <div className={s.create}>
        <h1>Create your videogame</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className={s.label}>
                <label >Name: </label>
                <input type="text" required name="name" minLength="3" placeholder="3 characters at least" value={state.name} onChange={(e)=>handleChange(e)}></input>
                <br />
                <div>{errors.name && (<p>{errors.name}</p>)}</div>
            </div>
            <div className={s.label}>
                <label >Description: </label>
                <input type="text" required name="description" minLength="20" value={state.description} onChange={(e) => handleChange(e)}></input>
                <br />
                <div>{errors.description && (<p>{errors.description}</p>)}</div>
            </div>
            <div className={s.label}>
                <label >Release Date: </label>
                <input type="date" required name="updated" value={state.updated} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className={s.label}>
                <label >Rating: </label>
                <input type="number" required name="rating" min="1" max="5" placeholder="Rate between 1-5" value={state.rating} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className={s.label}>
                <label >Image: </label>
                <input type="url" name="img" value={state.img} onChange={(e) => handleChange(e)}></input>
            </div>
            <div className={s.label}>
                <label >Platforms: </label>
                <select required name="platforms" onChange={(e) => handleChangePlatforms(e)}>
                    <option value="" hidden={true}>Select platforms</option>
                    {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {state.platforms.map(p =>
                        <div key={p}>
                            <button type="button" onClick={(e) => handleDeletePlatforms(e,p)}>{p}</button>
                        </div>
                    )}
            </div>
            <div className={s.label}>
                <label >Genres:</label>
                    <select required name="genres"  onChange={(e) => handleChangeGenres(e)}>
                        <option value ="" hidden={true}>Select genres</option>
                        {genresarr.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                    </select>
                    {state.genres.map(g =>
                        <div key={g}>
                            <button type="button" onClick={(e) => handleDeleteGenres(e,g)}>{g}</button>
                        </div>
                    )}
            </div>
            <div>
                <button className={h.button} type="submit">Create</button>
                <Link to='/home'><button className={h.button}>back</button></Link>
            </div>
            <div>
            </div>
        </form>
    </div>
    </Fragment>
)}