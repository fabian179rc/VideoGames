/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useMemo, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getGenres, getVideogames } from '../redux/actions'
import CardGame from './CardGame'
import imgGame from '../img/game.png'
import s from '../styles/home.module.css'
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar'
import Paginado from '../components/Paginado'
import { Link, useHistory } from 'react-router-dom'
//////////////////////////////////////////////////////////////////

export function Home(){
const gameAll = useSelector(state=>state.videoGames) 
const getName = useSelector(state=>state.videoGamesName) 
const genres = useSelector(state=>state.genres)
const dispatch = useDispatch()
const byName = useRef(null)
const created = useRef(null)
const genres1 = useRef(null)
const history = useHistory()
const[card, setCard] = useState([])
const[orderName, setOrderName] = useState([])
const[orderRating, setOrderRating] = useState([])
const[filterBy, setFilterBy] = useState([])
const[pageNumber, setPageNumber] = useState(1)
const [limitCard, setLimitCard] = useState({max:14,min:0})

/////////////////////////////////////////////////////////

useMemo(()=>{
    if(!genres.lenght)dispatch(getGenres())
    if(!gameAll.lenght)dispatch(getVideogames())
},[])

useMemo(()=>{
    setCard(gameAll)
},[gameAll])

useMemo(()=>{
    setCard(getName)
},[getName])

useMemo(()=>{
    setCard(orderName)
    setLimitCard({max:14,min:0})
},[orderName])

useMemo(()=>{
    setCard(orderRating)
    setLimitCard({max:14,min:0})
},[orderRating])

useMemo(()=>{
    setCard(filterBy)
    setLimitCard({max:14,min:0})
},[filterBy])

function back (){
    setCard(gameAll)
    byName.current.selectedIndex=0
    created.current.selectedIndex=0
    genres1.current.selectedIndex=0
};

function filterSelect(e){
    let game = [...card]
    const gamesGenres = game.filter((g)=>g.genres.includes(e.target.value))
    if(gamesGenres.length===0)alert("No Games Found! Please try again by clearing the filters...")
    else {setCard(gamesGenres)
    setLimitCard({max:14,min:0})
    }
};

function orderByName(e){                    // Ordenamiento por Nombre
    let order = [...card]
if(e.target.value === "Ascendent"){
        order = order.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
                }
                return 0;
            })
            setOrderName(order)

}else{
        order = order.sort(function(b, a) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
                }
                return 0;
                })
            setOrderName(order)

        } 
};

function orderByRating(e){                    // Ordenamiento por rating
    let order = [...card]
if(e.target.value === "Ascendent"){
        order = order.sort(function(a, b) {
            if (a.rating > b.rating) {
                return 1;
                }
                if (a.rating < b.rating) {
                return -1;
                }
                return 0;
            })
            setOrderRating(order)

}else{
        order = order.sort(function(b, a) {
            if (a.rating > b.rating) {
                return 1;
                }
                if (a.rating < b.rating) {
                return -1;
                }
                return 0;
                })
                setOrderRating(order)
        } 
};

function filter (e){
    let filter=[...card]
    if(e.target.value === "Original"){
        let filterDb = filter.filter(c=> !(c.id.toString().includes("-")))
        filterDb.length?setFilterBy(filterDb):alert("No VideoGames Original! Please try again by clearing the filters...")
    }
    if(e.target.value === "Created"){
            let filterapi = filter.filter(c=> c.id.toString().includes("-"))
            filterapi.length?setFilterBy(filterapi):alert("No VideoGames Created by User! Please try again by clearing the filters...")
    }
}

function Cards(){
    if (card.length === 0 || Object.entries(card).length === 0 ) return <Loading/>
    else if(card.error) {
        return history.push('/invalidpage')
    }else{ 
        return card.map((g,index)=>{ 
                if(index <=limitCard.max && index >= limitCard.min){
                return(
                    <div key={g.id}>
                    <CardGame 
                        id={g.id}
                        img={g.img?g.img:imgGame}
                        name={g.name}
                        rating={g.rating}
                        genres={g.genres?.join(" - ")}
                        />
                    </div>
                )}
                return ""})}
}

    return(
    <Fragment>
        <div className={s.navbar}>{/* NavBar */}
                <button className={s.button}onClick={back}>Clean Filters</button> 
            <div className={s.orderBy}><label>Order By: </label>
                <select ref={byName} onChange={(e)=>orderByName(e)}> {/* Ordenamiento por Nombre*/}
                    <option hidden={true}>Name</option>
                    <option value="Ascendent">A ➜ Z</option>
                    <option value="Descendent">Z ➜ A</option>
                </select>

                <select onChange={(e)=>orderByRating(e)}> {/* Ordenamiento por Rating*/}
                    <option value="" hidden={true}>Rating</option>
                    <option value="Ascendent">Rating ⇓</option>
                    <option value="Descendent">Rating ⇑</option>
                </select>
            </div>
            <div className={s.filterBy}><label>Filter By: </label>
                <select ref={created} onChange={(e)=>filter(e)}> {/* FilterBy Created*/}
                    <option value="" hidden={true}>All Videogames</option>
                    <option value="Original">Original VideoGame</option>
                    <option value="Created">Created by User</option>
                </select>

                <select ref={genres1} onChange={(e)=>filterSelect(e)}>{/* Filtrado por Genero */}
                <option value="" hidden={true}>All Genres</option>
                    {genres.map((gen)=>(
                        <option key={gen.name}value={gen.name}>{gen.name}</option>))}
                </select>
            </div>
                <SearchBar />
            <div>
                        <Link to='/videogame'><button className={s.button}>Create videogame</button></Link>
                        <Link to='/About'><button className={s.button}>About</button></Link>
            </div>
        </div>           
        <div className={s.cards}>{/*Card VideoGames*/}
            {Cards()}
        </div>
            <div className={s.paginado}><Paginado
            card={card}
            setLimitCard={setLimitCard}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            /></div>Paginado
    </Fragment>
    )
}

export default Home;