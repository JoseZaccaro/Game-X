import React from "react"
import { connect } from 'react-redux';
import Header from "../components/Header";
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import Loader from '../components/Loader';
import Hardware from "../components/Hardware";


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
                                <div className='heroHardwarePage' style={{backgroundImage:"url('https://www.rockandpop.cl/wp-content/uploads/2020/06/43dff437d7f6998f083727c512c4f509.jpg')"}}>
                                    <div className='shadowHeaderHardUno'></div>
                                    <div className='shadowHeaderHardDos'></div>
                                </div>
                                <div style={{ marginTop: '2rem' }} className="containerStoreHardwares">
                                <div className="cube"></div>
                                <div className="cube"></div>
                                <div className="cube"></div>
                                <div className="cube"></div>
                                <div className="cube"></div>
                                <div className="cube"></div>
                                    {this.props.allHardwares.map(hardware=><Hardware key={hardware._id} hardware={hardware}/>)}
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
        userLogged:state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames
}
export default connect(mapStateToProps, mapDispatchToProps)(HardwareStore)
