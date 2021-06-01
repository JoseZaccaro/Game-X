import React from 'react';
import Slider from 'infinite-react-carousel';
import { NavLink } from 'react-router-dom'

const CarruselStore = (props) => {
    props.games.map(game => {
        return console.log(game)
    });
    return (
        <Slider slidesToShow={6} arrowsScroll={2} autoplay={true} dots dotsScroll={6}>
 
               { props.games.map(game=>{
                   return(
                    <NavLink to={`/game/${game._id}`}>
                        <div className="cardSlider">
                            <div className="cardImgSlider" style={{ backgroundImage: `url("${game.imageBanner}")` }}></div>
                            <div className="contentSlider">
                                <p>{game.title}</p>
                                <p>price game</p>
                            </div>
                        </div>
                    </NavLink>
                   )})
            }

        </Slider>
    )
}
export default CarruselStore