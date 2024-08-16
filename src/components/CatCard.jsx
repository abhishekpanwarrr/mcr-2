import React from 'react'

const CatCard = ({ cat }) => {
    return (
        <section className='catCart_container'>
            <div className='top' style={{
                backgroundImage: `url(${cat.image})`
            }}>
            </div>
            <div className='bottom'>
                <h2>{cat?.name}</h2>
                <p>{cat?.description}</p>
                <div>
                    <span>Origin</span>
                    <span>{cat?.origin}</span>
                </div>
                <div className='bottom-termperment'>
                    <span>Temperment</span>
                    <div>
                        {cat?.temperament.split(",").map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <span>Life span</span>
                    <span>{cat?.life_span}</span>
                </div>

            </div>
            <a className='cat-learnMore_button' href={cat?.wikipedia_url} target='_blank'>Learn more</a>
        </section>
    )
}

export default CatCard