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
                        <div className='alignContentMove'>
                            <h2 className='titleContentMove'>Dive in Game-X-State </h2>
                            <p className='textContentMove'>With our environment of immersive state, your games feels different, with the best quality of downloading speed, and our social Net to chat with your friends!</p>
                            <NavLink to='/store'><p className='buttonContenMove'>Explore Our Shop</p></NavLink>
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
                            <NavLink to='/store'><p className='buttonContenMove'>Try it!</p></NavLink>
                        </div>   
                    </div>
                    <div className='contentMoveDos'>
                        <div className='alignContentMove'>
                        <h1 className='titleTwoContentMove'>Available Now!</h1>
                        <div className='contentVideoMove'>
                            <div className='videoContent' style={{backgroundImage: 'url("https://media.giphy.com/media/aGbJy4rPT9Nsz9wEjr/giphy.gif")'}}></div>
                            <h3 className='titleVideoMove'>Resident Evil: Village</h3>
                            <p className='descriptionVideoMove'>Experience survival horror like never before in the 8th major installment in the Resident Evil franchise - Resident Evil Village. With detailed graphics, intense first-person action and masterful storytelling, the terror has never felt more realistic.</p>
                            <p className='btnHoverPlay'>Buy now</p>
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
            <div className='contentHomeCall'>
                <div className="divHardHome">
                    <div className="tarjetaHomeHard content">
                        <div className="tarjetaHomeHard-content">
                        <div className="tarjetaHomeHard-img">
                            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="Gamer"/>
                        </div>
                        <div className="tarjetaHomeHard-label">Hardware</div>
                        <div className="tarjetaHomeHard-title">
                            descripcion de hardwares
                        </div>
                        </div>
                    </div>
                    <div className="tarjetaHomeHard content">
                        <div className="tarjetaHomeHard-content">
                        <div className="tarjetaHomeHard-img">
                            <img src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="keyboard"/>
                        </div>
                        <div className="tarjetaHomeHard-label">
                            Accesorios
                        </div>
                        <div className="tarjetaHomeHard-title">
                            The Future of Gaming
                        </div>
                        </div>
                    </div>
                    <div className="tarjetaHomeHard content">
                        <div className="tarjetaHomeHard-content">
                        <div className="tarjetaHomeHard-img">
                            <img src="https://images.unsplash.com/photo-1519326844852-704caea5679e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2034&q=80" alt="Controller"/>
                        </div>
                        <div className="tarjetaHomeHard-label">
                            Consoles
                        </div>
                        <div className="tarjetaHomeHard-title">
                            PS5 la mejor de las consolas
                        </div>
                        </div>
                    </div>
                    <div className="tarjetaHomeHard form">
                        <div className="form-title">Sign Up</div>
                    </div>
                </div>
            </div>
            <Footer />
            </>   
        )
    }
}

export default Home
