import { Link } from 'react-router-dom'
import h from '../styles/home.module.css'
import React from "react";
import html from '../Assets/html.svg'
import css from '../Assets/css.svg'
import js from '../Assets/JS.svg'
import react from '../Assets/react.svg'
import redux from '../Assets/redux.svg'
import styledComponents from '../Assets/styled-components.svg'
import express from '../Assets/expressjs.svg'
import postgresql from '../Assets/postgresql.svg'
import nodejs from '../Assets/node.svg'
import {Container,ContainerText,ContainerTech,ContainerAllTech,ContainerTextArea
    ,ContainerEnd,TextEnd,Title,ImgTech,TitleTech} from '../styles/About'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const frontend = [{
        name: 'JavaScript',
        link: 'https://www.javascript.com/',
        img: js
    },{
        name: 'HTML',
        link: 'https://en.wikipedia.org/wiki/HTML',
        img: html
    },{
        name: 'CSS',
        link: 'https://www.w3.org/Style/CSS/Overview.en.html',
        img: css 
    },{
        name: 'React Js',
        link: 'https://es.reactjs.org/',
        img: react 
    },{
        name: 'Redux',
        link: 'https://es.redux.js.org/',
        img: redux 
    },{
        name: 'Styled Components',
        link: 'https://styled-components.com/',
        img: styledComponents 
    }
]

const backend = [{
    name: 'Node Js',
    link: 'https://nodejs.org/es/',
    img: nodejs
},{
    name: 'Express',
    link: 'https://expressjs.com/',
    img: express
},{
    name: 'Sequelize',
    link: 'https://sequelize.org/',
    img: 'https://www.vectorlogo.zone/logos/sequelizejs/sequelizejs-icon.svg'
},{
    name: 'Postgresql',
    link: 'https://www.postgresql.org/',
    img: postgresql
}
]

function About (props){
    return (
        <Container>
            <ContainerText>
                <ContainerTextArea>
                    <Title>About</Title>

					<p>Bienvenid@! Soy Fabian Santos, un Desarrollador FullStack que esta buscando despegar en su carrera 🤩</p>
					
					<p>Te comento que este es un proyecto Individual del Bootcamp de Henry, donde tuve 2,5 semanas para desarrollarlo, utilizando los nuevos conocimientos aprendidos hasta el momento.</p>
					
					<p>Debo admitir que no fue facil...fueron dias de programar 10-12 horas, pero a como quedo el proyecto, se que valio la pena y me siento totalmente satisfecho.</p>

                    <p>Utilizamos una Api Rest <a href="https://rawg.io" target="_blank" rel="noopener noreferrer">rawg.io</a> la cual nos proporciona 600.000 juegos, y varios metodos de busqueda y filtros, aunque no se nos permitio utilizar estos filtros, para poner en practica y desarrollar aun mas la logica por nosotros mismos.</p> 
					
					<p>Las tecnologias utilizadas fueron las siguientes:</p>

                </ContainerTextArea>
                <div>
                    <ContainerEnd>
                        <TextEnd>Front-End</TextEnd>
                        <ContainerAllTech>
                        {frontend.map(t=>(
                            <ContainerTech key={t.link} href={t.link} target="_blank" rel="noopener noreferrer">
                                <ImgTech src={t.img}/>
                                <TitleTech>{t.name}</TitleTech>
                            </ContainerTech>
                        ))}
                        </ContainerAllTech>
                    </ContainerEnd>
                    <ContainerEnd>
                        <TextEnd>Back-End</TextEnd>
                        <ContainerAllTech>
                            {backend.map(t=>(
                                <ContainerTech key={t.link} href={t.link} target="_blank" rel="noopener noreferrer">
                                    <ImgTech src={t.img}/>
                                    <TitleTech>{t.name}</TitleTech>
                                </ContainerTech>
                            ))}
                        </ContainerAllTech>
                            
                    </ContainerEnd>
					<Link to='/home'><button className={h.button}>back</button></Link>
                </div>
            </ContainerText>
        </Container>
    ) 
}

export default About ;
