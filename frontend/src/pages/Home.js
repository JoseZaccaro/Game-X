import React from "react"
import { NavLink } from "react-router-dom"
import Footer from "../components/Footer"
import Header from '../components/Header'

class Home extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    componentDidMount(){
        this.toTop()
    }

    render() {
         
        return(
            <>
            <Header props={this.props.history}/>
            <div className='containPageHome' style={{backgroundImage:"url(../assets/fondo.png)"}}>
                <div className='parallaxRigthHome'>
                    <div className='contentMove'>
                        <div className='alignContentMove animate__animated animate__fadeIn animate__delay-4s'>
                            <h2 className='titleContentMove '>Dive in Game-X-State </h2>
                            <p className='textContentMove'>With our environment of immersive state, your games feels different, with the best quality of downloading speed, and our social Net to chat with your friends!</p>
                            <NavLink to='/store'>
                                <p class="effect1">
                                    Explore
                                    <span class="bg"></span>
                                </p>
                            </NavLink>
                        </div>
                    </div>
                    <div className='contentMove'>
                        <div className='alignContentMove'>
                            <h1 className='titleTwoContentMove'>Get Exclusive Content!</h1>
                            <div className='contentVideoMove'>
                                <div className='videoContent' style={{backgroundImage: 'url("https://steamuserimages-a.akamaihd.net/ugc/437237610885990141/4E2413375AB6BE813B7D3E31A792F4902E5E9A73/")'}}></div>
                                <h3 className='titleVideoMove'>StarCraft 2 - DLC Game-X!</h3>
                                <p className='descriptionVideoMove'>With your buy of $3250 or more, get the aditional Material!</p>
                                <NavLink to='/store'><p className='btnHoverPlay'>Buy now</p></NavLink>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className='shadowHeader'></div>    
            </div>
            
            <div className='containPageHomeDos' style={{backgroundImage:"url(../assets/fondoDos.png)"}}>
                <div className='shadowHeaderArriba'></div>
                <div className='parallaxRigthHome'>
                    <div className='contentMoveDos'>
                        <div className='alignContentMove'>
                            <h2 className='titleContentMove'>Link your favourite content</h2>
                            <p className='textContentMove'>Now you can add games to your Wish List, to recive an advice when is included in our offers! Just click the star icon and add go check your Wish List! </p>
                            <NavLink to='/store'>
                                <p class="effect1">
                                    Try it Now!
                                    <span class="bg"></span>
                                </p>
                            </NavLink>
                        </div>   
                    </div>
                    <div className='contentMoveDos'>
                        <div className='alignContentMove'>
                        <h1 className='titleTwoContentMove'>Available Now!</h1>
                        <div className='contentVideoMove'>
                            <div className='videoContent' style={{backgroundImage: 'url("https://media.giphy.com/media/aGbJy4rPT9Nsz9wEjr/giphy.gif")'}}></div>
                            <h3 className='titleVideoMove'>Resident Evil: Village</h3>
                            <p className='descriptionVideoMove'>Experience survival horror like never before in the 8th major installment in the Resident Evil franchise - Resident Evil Village. With detailed graphics, intense first-person action and masterful storytelling, the terror has never felt more realistic.</p>
                            <NavLink to='/game/60b1c6e2dddb7d5530551388'><p className='btnHoverPlay'>Buy now</p></NavLink>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='shadowBottom'></div>
            </div>  
            <div className='containHomeBottom'>
                <div className='imagenHomeBottom' style={{backgroundImage: "url('../assets/fondoTres.png')"}}>
                    <div className='contentImgHomeBottom'>
                        <h1 className='titleContentMove'>Titulo Tres</h1>
                        <p className='textContentMoveBottom'>Pequeña descripcion de algo</p>
                        <p className='buttonContenMove'>Open</p>
                    </div>
                </div>
            </div>
            <Footer />
            </>   
        )
    }
}

export default Home
