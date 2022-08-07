import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/invalid.module.css'
import h from '../styles/home.module.css'
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function InvalidPage() {
    return(
        <Fragment>
            <div className={s.invalid}>
                <div className={s.invalid2}>
            <h1>Did you access the correct page? 🤔</h1>
            <p>Go back to home and try again...</p>
            <Link to='/home'><button className={h.button}>Back</button></Link>
            </div>
            </div>
        </Fragment>
    )
}
