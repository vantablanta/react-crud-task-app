import React from 'react'
import Button from './Button'


function Header({title, onAdd, showAdd}) {
    return (
        <header className='header'>
            <h3>{title}</h3>
            <Button color={showAdd ? "red":"green"} onAdd={onAdd} text={showAdd? "Close": "Add"}/>
        </header>
    )
}

export default Header