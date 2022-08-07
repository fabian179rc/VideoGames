/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { cleanDetail, getGamedetail } from '../redux/actions';
import imgGame from '../img/game.png'
import Loading from './Loading';
import s from '../styles/detail.module.css'
import h from '../styles/home.module.css'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function GameDetail() {

const game = useSelector(state=>state.gameDetail) //traigo el estadod el reducer.
const loaded = useSelector(state=>state.loadedGameDetail) //traigo el estadod el reducer.
const dispatch = useDispatch()
const history= useHistory()
const {id} = useParams();

useEffect(() => {
    dispatch(getGamedetail(id));
}, [id])

useEffect(() => {
    if(!game.id && loaded) return history.push('/invalidpage')
}, [loaded])

useEffect(()=>{
   return ()=>{dispatch(cleanDetail())} 
},[])


    return (
        <div className={s.c}>
        {loaded?(
                <div className={s.card}>
            <img className={s.image} src={game.img?game.img:imgGame} alt="game" />
            <div className={s.detail}><h2>{game.name}</h2>
            <p><label>Updated: </label>{game.updated?game.updated:"No Data"}</p>
            <label>Description: </label><p dangerouslySetInnerHTML={game.description?{__html: game.description}:"No Data"}></p>
            <p><label>Genres: </label>{game.genres?.join(" - ")?game.genres?.join(" - "):"No Data"}</p>
            <p><label>Rating: </label>{game.rating?game.rating:"No Data"}</p>
            <p><label>Platforms: </label>{game.platforms?.join(" - ")?(game.platforms?.join(" - ")):"No Data"} </p>
            <br />
            <Link to='/home'><button className={h.button}>back</button></Link>
            </div>
          </div>):<Loading/>}
        </div>
    )}