/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import s from '../styles/landing.module.css'
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Landing() {
    return(   
        <Fragment >
            <div >
                <div className={s.landing}>
                    <h2>Welcome to VideoGamesPro!</h2>
                    <p>Looking for the best game? You have already found it!</p>
                    <div className={s.svgwrapper}>
                        <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                            <rect className={s.shape} height="60" width="320" />
                        </svg>
                         <a href='/home'className={s.text}>Let's GO !</a>
                    </div>
                    </div>
                </div>
        </Fragment>
    )
}