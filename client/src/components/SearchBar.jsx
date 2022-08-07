import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGameName } from '../redux/actions';
import s from '../styles/home.module.css'
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    function handleSearchSubmit(e) {
        e.preventDefault();
        dispatch(getGameName(name));
        setName("");
    }
    return(
        <form className={s.searchbar} onSubmit={handleSearchSubmit}>
            <input className={s.searchInput} onChange={(e) => handleInputChange(e)} value= {name} type= 'text' placeholder='Find your videogame...'></input>
            <button className={s.button} type='submit'>Search</button>
        </form>
    )
};