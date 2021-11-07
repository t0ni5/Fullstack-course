import React from 'react'
import PersonForm from './PersonForm'

const Notification = ({ message }) => {
    const addedStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }
    const deletedStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }

    if (message === null) {
        return null
    } else if (message.includes("Added")) {
        return (
            <div style={addedStyle}>
                {message}
            </div>
        )
    } else {
        return (
            <div style={deletedStyle}>
                {message}
            </div>
        )
    }


}

export default Notification