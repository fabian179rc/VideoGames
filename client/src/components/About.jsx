// import s from '../styles/about.module.css'
import { Link } from 'react-router-dom'
import h from '../styles/home.module.css'
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function About(){
	return(
		<div>
		<h1>Aqui va el About</h1>
		<Link to='/home'><button className={h.button}>back</button></Link>

		</div>
	)
}