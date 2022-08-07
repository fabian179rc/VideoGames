import React from 'react';
import { Link} from 'react-router-dom';
import s from '../styles/card.module.css'

export default function CardGame({id, img, name, genres, rating}){
    return(
        <div className={s.card}>
            <img className={s.image} src={img} alt="" /> <br />
            <h2><Link className={s.link} to={`/videogame/${id}`}>{name}</Link></h2>
            <p className={s.p}>Generos: {genres}</p>
            <p className={s.p}>Rating: {rating}</p>
        </div>
    )
}
