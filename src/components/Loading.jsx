import React from 'react'
import { FiLoader } from 'react-icons/fi'

const Loading = ({ fontSize }) => {
    return (
        <FiLoader style={{
            fontSize: fontSize ? fontSize : ""
        }} className="loader-rotate" />
    )
}

export default Loading