import Header from './Header'

const Game = () =>{
    return(
        <>
            <Header />
            <div className='containGameComp'>
                <div className='containBoxGame'>
                   <div className='imgBanerBkGame' style={{backgroundImage: "url('https://i.pinimg.com/originals/74/15/fe/7415fe1ffbd98ce92b3d63c4709e140f.jpg')"}}></div>
                   <div className='imgPortadaBkGame' style={{backgroundImage: "url('https://smartcdkeys.com/image/cache/data/products/Cyberpunk-2077/cover/cyberpunk-2077-pc-smartcdkeys-cheap-cd-key-cover-390x580.png')"}}></div>
                   <div className='infoFastGame'>
                        <h2 className='titleGameCard'>Cyberpunk</h2>
                        <p className='yearGameCard'>(2021)</p>
                   </div>
                   <div className='divTagsGame'>
                       <p className='tag'>Action</p>
                       <p className='tag'>Tag</p>
                       <p className='tag'>Otra</p>
                    </div>
                    <div className='descriptionPrice'>
                        <div className='divAddCart'>
                            <p className='priceGame'>$9.99</p>
                            <p className='addToCartGame'>Add To Cart</p>
                        </div>
                        <div className='divDescriptionGameCard'>
                            <p className='pDescriptionTitle'>Description:</p>
                            <p className='pDescriptionContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                    </div>
                    <div className='otroDivCard'>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Game