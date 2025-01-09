import { useState } from 'react'

export default function Player({name, symbol}){
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(name)

    function handleEditClick(){
        setIsEditing((editing) => !editing)
    }

    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    let playerNameContainer = <span className="player-name" readOnly>{playerName}</span>;

    if(isEditing){
        playerNameContainer = <input type='text' required value={playerName} onChange={handleChange}/>
    }
    
    return (
        <li>
            <span className="player">
                {playerNameContainer}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
        </li>
    )
}