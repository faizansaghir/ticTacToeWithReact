import Player from './components/Player'
import GameBoard from './components/GameBoard'
import { useState } from 'react'
import Log from './components/Log'

import {WINNING_COMBINATIONS} from './winning-combinations'
import GameOver from './components/GameOver'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length>0 && gameTurns[0].player === 'X')
    currentPlayer = 'O';
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => (
      {
        ...prevPlayers,
        [symbol]: newName
      }
    ))
  }

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

  for(const turn of gameTurns){
      const {square, player} = {...turn}
      const {row, col} = {...square}
      gameBoard[row][col] = player
  }

  let winner = null

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const SecondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol==SecondSquareSymbol && firstSquareSymbol==thirdSquareSymbol)
      winner = players[firstSquareSymbol]
  }

  const hasDraw = !winner && gameTurns.length==9

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{square: {row: rowIndex, col:colIndex}, player: currentPlayer}, ...prevTurns]
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onNameChange={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
