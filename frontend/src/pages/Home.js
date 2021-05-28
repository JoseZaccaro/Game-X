import React from "react"

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
            <div className='containPageHome' style={{backgroundImage:"url(../assets/fondo.png)"}}>
                <div className='spaceLeftParallax'></div>
                <div className='parallaxRigthHome'>
                    <div className='contentMove'>
                        <h2 className='titleContentMove'>Primer Titulo</h2>
                        <p className='textContentMove'>Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos</p>
                        <p className='buttonContenMove'>Explore</p>
                    </div>
                    <div className='contentMove'>
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
            <div className='containPageHome' style={{backgroundImage:"url(../assets/fondoDos.png)"}}>
                <div className='parallaxRigthHome'>
                    <div className='contentMove'>
                        <h2 className='titleContentMove'>Primer Titulo</h2>
                        <p className='textContentMove'>Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos.Mati, aca le metes algun parrafo para vender mas jueguitos</p>
                        <p className='buttonContenMove'>Explore</p>
                    </div>
                    <div className='contentMove'>
                        <h1 className='titleTwoContentMove'>Titulo Dos</h1>
                        <div className='contentVideoMove'>
                            <div className='videoContent' style={{backgroundImage: 'url("https://i.pinimg.com/originals/d7/bc/c2/d7bcc2453615d29323237d93a1e988a3.gif")'}}></div>
                            <h3 className='titleVideoMove'>Titulo Video</h3>
                            <p className='descriptionVideoMove'>Mira como anda ese parallax papá!</p>
                            <p className='btnHoverPlay'>Buy now</p>
                        </div>
                    </div>
                </div>
                <div className='spaceLeftParallax'></div>
            </div>  
            </>   
        )
    }
}

export default Home
