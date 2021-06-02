import { NavLink } from 'react-router-dom'
const HeroStore = (props) => {
    const { heroGames } = props
    return (
        <>
            {
                heroGames.length > 0
                    ? (
                        <div className="parent">
                            <div className="div1">
                                <NavLink to={`/game/${heroGames[0]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${heroGames[0].imagesBackground[0]}")` }}></div>
                                </NavLink>
                            </div>
                            <div className="div2">
                                <NavLink to={`/game/${heroGames[1]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${heroGames[1].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                            <div className="div3">
                                <NavLink to={`/game/${heroGames[2]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${heroGames[2].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                            <div className="div4">
                                <NavLink to={`/game/${heroGames[3]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${heroGames[3].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                            <div className="div5">
                                <NavLink to={`/game/${heroGames[4]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${heroGames[4].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                            <div className="div6">
                                <NavLink to={`/game/${heroGames[5]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${heroGames[5].imageBanner}")` }}>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="div7">
                                <NavLink to={`/game/${heroGames[6]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${heroGames[6].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                        </div>
                    )
                    : null

            }
        </>
    );
}

export default HeroStore;