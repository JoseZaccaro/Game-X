import { connect } from 'react-redux';
import hardwareActions from '../../redux/actions/hardwareActions';
import gamesActions from '../../redux/actions/gamesActions';
import CardProduct from "./CardProduct";
import { useEffect, useState } from 'react';
const StoreGame = (props) => {
    useEffect(() => {
        props.filterGames('All', false)
        // eslint-disable-next-line
    }, [])
    let genres = ['All', 'Action', 'Action-adventure', 'Adventure', 'Multiplayer', 'RPG', 'Strategy']

    const filterGamesEvent = async (genre) => {
        props.filterGames(genre, false)
    }
    console.log(props.gamesFiltered);
    const searchGame = (e) => {
        let valueSearch = e.target.value.trim().toLowerCase()
        console.log(valueSearch);
        props.filterGames(valueSearch, true)

    }
    return (
        <div >
            <h2 style={{ fontSize: '3rem', textAlign: 'center', color: 'white' }}>The World is in Play</h2>
            <div className="containerFilters">
                <div><input type="text" placeholder="What video game do you want?" onChange={searchGame} /></div>
                <div className="tagsContainer">
                    <h4>Filter by:</h4>
                    <div className="tagsFilter">
                        {genres.map((genre, i) => {
                            return <p key={i} onClick={(e) => filterGamesEvent(genre)} className='tag tagFilter'>{genre}</p>
                        })}
                    </div>
                </div>
            </div>
            <div className="cards containerCards">
                {props.gamesFiltered.map((game, index) => {
                    return (
                        <CardProduct key={game._id} idGame={game._id} image={game.imageBanner} title={game.title} />
                    )
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        preLoader: state.hardwareReducer.preLoader,
        allGames: state.gamesReducer.allGames,
        gamesFiltered: state.gamesReducer.gamesFiltered,
        preLoaderGames: state.gamesReducer.preLoader
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames,
    filterGames: gamesActions.filterGames
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreGame)