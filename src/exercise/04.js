// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import BoardHistoryList from './04-extra/BoardHistoryList'

function Board() {
  const blankBoardSquares = Array(9).fill(null)
  
  // const [squares, setSquares] = React.useState(() => {
  //   return (getPropertyFromLocalStorage('boardSquares') || blankBoardSquares)
  // })
  
  const [boardHistory, setBoardHistory] = React.useState(() => {
    return (getPropertyFromLocalStorage('boardHistory') || [blankBoardSquares])
  })

 const [currentBoardMove, setCurrentBoardMove] = React.useState(() => {
    return (getPropertyFromLocalStorage('currentBoardMove') || 1)
 })
  
  // render history moves as ordered list with number followed by text as button,
  // current one is always inactive

  // save board state at time of each prev move
  // need awareness of new move from prev move state -> clear Hx of future moves

  // 1. Go to game start 
  // ^^ greyed out if no moves yet
  // 2. Go to move #1
  // 3. Go to move #2 (current)

  const handleRevertToPreviousBoardState = ((historyIdx) => {
    console.log(historyIdx);
    setCurrentBoardMove(historyIdx + 1)
  })

  const getCurrentBoardState = () => {
    const boardHistoryCopy = [...boardHistory]
    const currentBoardStateCopy = boardHistoryCopy[currentBoardMove - 1]

    return [...currentBoardStateCopy]
  }

  React.useEffect(() => {
    setInLocalStorage('boardHistory', boardHistory)
  }, [boardHistory, setBoardHistory])

  // ('X', 'O')
  const nextValue = calculateNextValue(getCurrentBoardState())

  // ('X', 'O', or null)
  const winner = calculateWinner(getCurrentBoardState()) 

  // (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  const status = calculateStatus(winner, getCurrentBoardState(), nextValue) 

  // if there's already winner or there's already a value at the given square index
  function selectSquare(squareIndex) {
    console.log(squareIndex);
    if (winner || getCurrentBoardState()[squareIndex]) {
      return
    }

    const currentBoardStateCopy = getCurrentBoardState()
    console.log('currentBoardStateCopy', currentBoardStateCopy);
    currentBoardStateCopy[squareIndex] = nextValue
    
    const boardHistoryCopy = [...boardHistory]

    // the 1st part of this conditional can be used to match desired solution
    // but this allows to keep playing at a given early stage of the game while
    // still preserving forward moving history
    if (currentBoardMove === boardHistoryCopy.length) {
      boardHistoryCopy.push(currentBoardStateCopy)
    } else {
      boardHistoryCopy[currentBoardMove] = currentBoardStateCopy
    }
    
    setBoardHistory(boardHistoryCopy)
    setCurrentBoardMove(currentBoardMove + 1)
  }

  function restart() { 
    setBoardHistory([blankBoardSquares])
    setCurrentBoardMove(1)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {getCurrentBoardState()[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <BoardHistoryList 
        squaresHistory={boardHistory}
        currentBoardMove={currentBoardMove}
        revertToPreviousBoardState={handleRevertToPreviousBoardState}/>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function getPropertyFromLocalStorage(propertyName) {
  let storedPropertyVal = window.localStorage.getItem(propertyName)
  return JSON.parse(storedPropertyVal)
}

function setInLocalStorage(propertyName, propertyValue) {
  window.localStorage.setItem(propertyName, JSON.stringify(propertyValue))
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
