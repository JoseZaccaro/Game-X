import { useEffect } from 'react';
import Header from './Header'

const Game = () =>{
    const harcodeo = {
        title: 'Ciberpunk',
        year: '2021',
        genre:['Action', 'Tag', 'Otra'],
        price: '9.99',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        plataform: ['PS4', 'Xbox-One','PC'],
        pegi: 13,
        developer: 'grupo tres',
        language: ['español', 'ingles', 'turco'],
        multiplayer: true,
        valoration:'muy malo'
    }
    return(
        <>
            <Header />
            <div className='containGameComp'>
                <div className='containBoxGame'>
                   <div className='imgBanerBkGame' style={{backgroundImage: "url('https://i.pinimg.com/originals/74/15/fe/7415fe1ffbd98ce92b3d63c4709e140f.jpg')"}}></div>
                   <div className='imgPortadaBkGame' style={{backgroundImage: "url('https://smartcdkeys.com/image/cache/data/products/Cyberpunk-2077/cover/cyberpunk-2077-pc-smartcdkeys-cheap-cd-key-cover-390x580.png')"}}></div>
                   <div className='infoFastGame'>
                        <h2 className='titleGameCard'>{harcodeo.title}</h2>
                        <p className='yearGameCard'>({harcodeo.year})</p>
                   </div>
                   <div className='divTagsGame'>
                       {harcodeo.genre.map((genero,i) => {
                           return <p key={i} className='tag'>{genero}</p>
                       })}
                    </div>
                    <div className='descriptionPrice'>
                        <div className='divAddCart'>
                            <p className='priceGame'>${harcodeo.price}</p>
                            <p className='addToCartGame'>Add To Cart</p>
                        </div>
                        <div className='divDescriptionGameCard'>
                            <p className='pDescriptionTitle'>Description:</p>
                            <p className='pDescriptionContent'>{harcodeo.description}</p>
                        </div>
                    </div>
                    <div className='divInfoSecondCardGame'>
                        <div className='cadaDivInfoSec'>
                            <p className='pTituloInfoSec'>Plataform:</p>
                            {harcodeo.plataform.map((plataforma,i) => {
                                return <p key={i} className='tagPlataform'>{plataforma}</p>
                            })}
                        </div>
                        <div className='cadaDivInfoSec'>
                            <p className='pTituloInfoSec'>Pegi:</p>
                            <p>{harcodeo.pegi}</p>
                        </div>
                        <div className='cadaDivInfoSec'>
                            <p className='pTituloInfoSec'>Developer:</p>
                            <p>{harcodeo.developer}</p>
                        </div>
                        <div className='cadaDivInfoSec'>
                            <p className='pTituloInfoSec'>Language:</p>
                            {harcodeo.language.map(lenguaje =>{
                                return <p>{lenguaje}</p>
                            })}
                        </div>
                        <div className='cadaDivInfoSec'>
                            <p className='pTituloInfoSec'>Multiplayer:</p>
                            {harcodeo.multiplayer ? <p>Yes</p> : <p>No</p>}
                        </div>
                        <div className='cadaDivInfoSec'>
                            <p className='pTituloInfoSec'>Valoration:</p>
                            <p>{harcodeo.valoration}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Game