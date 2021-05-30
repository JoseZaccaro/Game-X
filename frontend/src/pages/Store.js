import React from "react"
import { connect } from 'react-redux';
import Header from "../components/Header";
import CardProduct from "../components/Store/CardProduct";
import SliderProductCard from "../components/Store/SliderProductCard";
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import HeroStore from "../components/Store/HeroStore";


class Store extends React.Component {

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    state={
        games:[],
        hardware:[],
    }
    componentDidMount() {
        this.toTop()
        this.props.loadHardwares()
        
        this.props.loadGames()
    }
    heroGames =this.props.allGames.splice(0,(6))
    render() {

        return (
            <>
                <Header />
                <div className="containerStore">
                    <HeroStore heroGames={this.heroGames} />
                    <div >
                        {console.log(this.heroGames)}
                        <h2 style={{ fontSize: '3rem', textAlign: 'center', color: 'white' }}>Days of play</h2>
                        <div className="cards containerCards">
                            {this.props.allGames.map((game, index) => {
                                return (
                                    <CardProduct key={game._id} idGame={game._id} image={game.imageBanner} />
                                )
                            })}
                        </div>
                    </div>
                    {/* <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', color: 'white' }}>New games</h3>
                        <div className="containerSlider" style={{ overflowX: 'auto' }}>
                            {this.state.products.map((product, index) => {
                                return (
                                    <SliderProductCard image={product.src} id={product.id} />
                                )
                            })}
                        </div>
                    </div> */}
                </div>
            </>
        )
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(Store)
