import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'
import Loading from './Loading'
import imgGame from '../img/game.png'
import s from '../styles/detail.module.css'
import h from '../styles/home.module.css'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Created(){
    const game = useSelector(state=>state.created)
    return(
    <Fragment>
        <div className={s.title}>
            <h2>VideoGame Created:</h2>
        </div>
        <div className={s.c}>
            {game?(
                    <div className={s.card}>
                <img className={s.image} src={game.img?game.img:imgGame} alt="game" />
                <div className={s.detail}><h2>{game.name}</h2>
                <p><label>Updated: </label>{game.updated?game.updated:"No Data"}</p>
                <label>Description: </label><p dangerouslySetInnerHTML={{__html: game.description}}></p>
                <p><label>Genres: </label>{game.genres?.join(" - ")?game.genres?.join(" - "):"No Data"}</p>
                <p><label>Rating: </label>{game.rating?game.rating:"No Data"}</p>
                <p><label>Platforms: </label>{game.platforms?.join(" - ")?(game.platforms?.join(" - ")):"No Data"} </p>
                <br />
                <Link to='/home'><button className={h.button}>back</button></Link>
                </div>
              </div>):<Loading/>}
            </div>    
    </Fragment>
    )
}