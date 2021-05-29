import React from "react"
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
            <Header />
            <div className='containPageHome' style={{backgroundImage:"url(../assets/fondo.png)"}}>
                <div className='parallaxRigthHome'>
                    <div className='contentMove'>
                        <div className='alignContentMove'>
                            <h2 className='titleContentMove'>Primer Titulo</h2>
                            <p className='textContentMove'>Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos</p>
                            <p className='buttonContenMove'>Explore</p>
                        </div>
                    </div>
                    <div className='contentMove'>
                        <div className='alignContentMove'>
                            <h1 className='titleTwoContentMove'>Titulo Dos</h1>
                            <div className='contentVideoMove'>
                                <div className='videoContent' style={{backgroundImage: 'url("https://i.pinimg.com/originals/d7/bc/c2/d7bcc2453615d29323237d93a1e988a3.gif")'}}></div>
                                <h3 className='titleVideoMove'>Titulo Video</h3>
                                <p className='descriptionVideoMove'>Mira como anda ese parallax papá!</p>
                                <p className='btnHoverPlay'>Buy now</p>
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
                            <h2 className='titleContentMove'>Primer Titulo</h2>
                            <p className='textContentMove'>Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos</p>
                            <p className='buttonContenMove'>Explore</p>
                        </div>   
                    </div>
                    <div className='contentMoveDos'>
                        <div className='alignContentMove'>
                        <h1 className='titleTwoContentMove'>Titulo Dos</h1>
                        <div className='contentVideoMove'>
                            <div className='videoContent' style={{backgroundImage: 'url("https://i.pinimg.com/originals/d7/bc/c2/d7bcc2453615d29323237d93a1e988a3.gif")'}}></div>
                            <h3 className='titleVideoMove'>Titulo Video</h3>
                            <p className='descriptionVideoMove'>Mira como anda ese parallax papá!</p>
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
