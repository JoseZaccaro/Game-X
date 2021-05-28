import React from "react"
import { connect } from 'react-redux';
import CardProduct from "../components/Store/CardProduct";
import SliderProductCard from "../components/Store/SliderProductCard";
import hardwareProductsActions from '../redux/actions/hardwareProductsActions';


class Store extends React.Component {

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    state = {
        products: [
            {
                src: 'https://www.gamespot.com/a/uploads/screen_kubrick/1406/14063904/3476994-9383307504-337761.jpeg',
                header: 'Ushuaia',
                id: 1,
                price: 250
            },
            {
                src: 'https://cdn.gamer-network.net/2021/articles/2021-03-18-22-24/best-ps5-games-20261-1616106266172.jpg/EG11/thumbnail/1920x1078/format/jpg/quality/80',
                header: 'London',
                id: 3,
                price: 350
            },
            {
                src: 'https://i.pinimg.com/originals/9f/a2/b8/9fa2b8f49b4bb41fbcd0ef6a651b0c98.jpg',
                header: 'New York',
                id: 5,
                price: 150
            },
            {
                src: 'https://tagmag.news/assets/artikels/_height350/God-of-War-2.jpg',
                header: 'Sydney',
                id: 6,
                price: 650
            },
            {
                src: 'https://i.imgur.com/7CApOUG.jpg',
                header: 'Shanghai',
                id: 8,
                price: 550
            },
            {
                src: 'https://i.imgur.com/sBrjv2i.jpg',
                header: 'Seattle',
                id: 7,
                price: 250
            },
            {
                src: 'https://i.imgur.com/8OXZEVs.jpg',
                header: 'Sydney',
                id: 6,
                price: 650
            },
            {
                src: 'https://i.imgur.com/7CApOUG.jpg',
                header: 'Shanghai',
                id: 8,
                price: 550
            },
            {
                src: 'https://i.imgur.com/7CApOUG.jpg',
                header: 'Shanghai',
                id: 8,
                price: 550
            },
            {
                src: 'https://i.imgur.com/sBrjv2i.jpg',
                header: 'Seattle',
                id: 7,
                price: 250
            },
            {
                src: 'https://i.imgur.com/8OXZEVs.jpg',
                header: 'Sydney',
                id: 6,
                price: 650
            },
            {
                src: 'https://i.imgur.com/7CApOUG.jpg',
                header: 'Shanghai',
                id: 8,
                price: 550
            },
        ]
    }

    componentDidMount() {
        this.toTop()
        this.props.loadHardwareProducts()
    }

    render() {

        return (
            <div className="containerStore">
                <div className="parent">
                    <div className="div1" style={{ backgroundImage: `url("${this.state.products[0].src}")` }}> </div>
                    <div className="div2" style={{ backgroundImage: `url("${this.state.products[2].src}")` }}> </div>
                    <div className="div3" style={{ backgroundImage: `url("${this.state.products[3].src}")` }}> </div>
                    <div className="div4" style={{ backgroundImage: `url("${this.state.products[4].src}")` }}> </div>
                    <div className="div5" style={{ backgroundImage: `url("${this.state.products[5].src}")` }}> </div>
                </div>

                <div >
                    <h2 style={{ fontSize: '3rem', textAlign: 'center', color: 'white' }}>Days of play</h2>
                    <div className="cards containerCards">
                        {this.state.products.map((product, index) => {
                            return (
                                <CardProduct image={product.src} title={product.header} id={product.id} />
                            )
                        })}
                    </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '2rem',  color: 'white' }}>New games</h3>
                    <div className="containerSlider" style={{ overflowX: 'auto' }}>
                        {this.state.products.map((product, index) => {
                            return (
                                <SliderProductCard image={product.src} id={product.id} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        hardwareProducts: state.hardwareProductsReducer.hardwareProducts,
        preLoader: state.hardwareProductsReducer.preLoader,
    }
}
const mapDispatchToProps = {
    loadHardwareProducts: hardwareProductsActions.loadHardwareProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)
