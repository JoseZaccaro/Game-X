
import React from 'react';
import { NavLink } from 'react-router-dom'
import InfiniteCarousel from 'react-leaf-carousel';
class CarruselStore extends React.Component {
    render() {
        return (
            <InfiniteCarousel
                breakpoints={[
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                ]}
                showSides={true}
                sidesOpacity={.5}
                sideSize={.1}
                slidesToScroll={4}
                slidesToShow={3}
                scrollOnDevice={true}
            >
                {this.props.games.map(game => {
                    return (
                        <NavLink to={`/game/${game._id}`}>
                            <figure className="image-block">
                                <div className="imageCarrusel" style={{backgroundImage:`url("${game.imageBanner}")`}} ></div>
                                <figcaption>
                                    <h3>{game.title.toUpperCase()}</h3>
                                    <p>DEVELOPER: {game.developer.toUpperCase()}</p>
                                    <p>YEAR: {game.year}</p>
                                    <p>PRICE: ${game.price}</p>
                                </figcaption>
                            </figure>
                        </NavLink>
                    )
                })}
            </InfiniteCarousel>
        )
    }
}
export default CarruselStore