import { useEffect, useState } from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import Loader from '../components/Loader';


const Game = (props) => {
    const [gameDetails, setGameDetails] = useState(null)

    useEffect(() => {
        if (props.allGames.length === 0) {
            props.history.push('/store')
        }
        if (!gameDetails) {
            let idGame = props.match.params.id
            let gameFilter = props.allGames.find(game => game._id === idGame)
            setGameDetails({
               ...gameFilter
            })
        }
    }, [])
    if (gameDetails) {
        console.log(gameDetails);
        
    }
    const harcodeo = {
        title: 'Ciberpunk',
        year: '2021',
        genre: ['Action', 'Tag', 'Otra'],
        price: '9.99',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        plataform: ['PS4', 'Xbox-One', 'PC'],
        pegi: 13,
        developer: 'grupo tres',
        language: ['español', 'ingles', 'turco'],
        multiplayer: true,
        valoration: 'muy malo'
    }
    return (
        <>
            {!gameDetails
                ? <Loader />
                : (
                    <>
                        <Header />
                        <div className='containGameComp'>
                            <div className='containBoxGame'>
                                <div className='imgBanerBkGame' style={{ backgroundImage: `url('${gameDetails.imagesBackground[0]}')` }}></div>
                                <div className='imgPortadaBkGame' style={{ backgroundImage: `url('${gameDetails.imageBanner}')` }}></div>
                                <div className='infoFastGame'>
                                    <h2 className='titleGameCard'>{gameDetails.title}</h2>
                                    <p className='yearGameCard'>({gameDetails.year})</p>
                                </div>
                                <div className='divTagsGame'>
                                    {gameDetails.genre.map((genero, i) => {
                                        return <p key={i} className='tag'>{genero}</p>
                                    })}
                                </div>
                                <div className='descriptionPrice'>
                                    <div className='divAddCart'>
                                        <p className='priceGame'>${gameDetails.price}</p>
                                        <p className='addToCartGame'>Add To Cart</p>
                                    </div>
                                    <div className='divDescriptionGameCard'>
                                        <p className='pDescriptionTitle'>Description:</p>
                                        <p className='pDescriptionContent'>{gameDetails.description}</p>
                                    </div>
                                </div>
                                <div className='divInfoSecondCardGame'>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Plataform:</p>
                                        {gameDetails.platform.map((plataform, i) => {
                                            return <p key={i} className='tagPlataform'>{plataform}</p>
                                        })}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Pegi:</p>
                                        <p>{gameDetails.PEGI}</p>
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Developer:</p>
                                        <p>{gameDetails.developer}</p>
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Language:</p>
                                        {gameDetails.language.map(lenguaje => {
                                            return <p>{lenguaje}</p>
                                        })}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Multiplayer:</p>
                                        {gameDetails.multiplayer ? <p>Yes</p> : <p>No</p>}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Valoration:</p>
                                        <p>{gameDetails.valoration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        preLoader: state.hardwareReducer.preLoader,
        allGames: state.gamesReducer.allGames,
        preLoaderGames: state.gamesReducer.preLoader
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames
}
export default connect(mapStateToProps, mapDispatchToProps)(Game)