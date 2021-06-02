import { connect } from 'react-redux';
import hardwareActions from '../../redux/actions/hardwareActions';
import gamesActions from '../../redux/actions/gamesActions';
import CardProduct from "./CardProduct";
import { useEffect } from 'react';

const StoreGame = (props) => {
    useEffect(() => {
        props.filterGames('All','games', false)
        // eslint-disable-next-line
    }, [])
    let genres = ['All', 'Action', 'Action-adventure', 'Adventure', 'Multiplayer', 'RPG', 'Strategy']
    let consolas = ['All','PS3','PS4','PS5','PC','Xbox One','Xbox 360']
    const filterGamesEvent = async (filterBy, product) => {
        props.filterGames(filterBy, product, false)
    }
    const searchGame = (e) => {
        let valueSearch = e.target.value.trim().toLowerCase()
        props.filterGames(valueSearch,'games', true)

    }
    return (
        <div >
            <h2 style={{ fontSize: '3rem', textAlign: 'center', color: 'white' }}>Leaders and heroes don't choose themselves</h2>
            <h4 style={{ fontSize: '2rem', textAlign: 'center', color: 'white' }}>But you can choose your Game to be a Hero!</h4>
            <div className="containerFilters">
                <div><input type="text" placeholder="What video game do you want?" onChange={searchGame} /></div>
                <div className="tagsContainer">
                    <h4>Filter by Categories:</h4>
                    <div className="tagsFilter">
                        {genres.map((genre, i) => {
                            return <p key={i} onClick={(e) => filterGamesEvent(genre,'games')} className='tag tagFilter'>{genre}</p>
                        })}
                    </div>
                    <h4>Filter by Consoles:</h4>
                    <div className="tagsFilter">
                        {consolas.map((console, i) => {
                            return <p key={i} onClick={(e) => filterGamesEvent(console, 'console')} className='tag tagFilter'>{console}</p>
                        })}
                    </div>
                </div>
            </div>
            <div className="cards containerCards">
                {props.gamesFiltered.map((game, index) => {
                    return (
                        <div key ={game._id} className='divCardProduct'>
                            <CardProduct key={game._id} discount={game.discount} idGame={game._id} image={game.imageBanner} title={game.title} props={props.props} />
                        </div>
                        
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