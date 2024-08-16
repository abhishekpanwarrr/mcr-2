import React from 'react'

const Container = ({ imageUrl, children }) => {
    return (
        <div style={{
            backgroundImage: `url(${imageUrl})`
        }} className='container'>
            {children}
        </div>
    )
}

export default Container