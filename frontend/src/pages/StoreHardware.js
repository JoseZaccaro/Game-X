import React from "react"
import { connect } from 'react-redux';
import Header from "../components/Header";
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import HeroStoreHardware from "../components/Store/HeroStoreHardware";
import Loader from '../components/Loader';
import StoreGame from "../components/Store/StoreGame";



class HardwareStore extends React.Component {

    

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    state = {
        hardware: [],
    }

    componentDidMount() {
        this.toTop()
        this.props.loadHardwares()
        this.props.loadGames()
    }



    render() {
        return (
            <>
                {!this.props.allHardwares.length
                    ? (
                        <Loader />
                    )
                    : (
                        <>
                        <Header props={this.props.history}/>
                            <div className="containerStore">
                                <HeroStoreHardware heroHardware={this.props.allHardwares.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 6)} />
                                {/* <StoreHardware /> */}
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 style={{ fontSize: '2rem', color: 'white' }}>New games</h3>
                                    <div className="containerSlider" >
                                        {/* <CarruselStore games={this.props.allGames.splice(0, 8)} /> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        allGames: state.gamesReducer.allGames,
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames
}
export default connect(mapStateToProps, mapDispatchToProps)(HardwareStore)
