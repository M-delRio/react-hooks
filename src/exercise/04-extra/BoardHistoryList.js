import * as React from 'react'
import BoardHistoryButton from './BoardHistoryButton';

function BoardHistoryList({squaresHistory, currentBoardMove, revertToPreviousBoardState}) {
    let boardHistoryButtons = []

    for (let idx = 0; idx < squaresHistory.length; idx +=1) {
        let isCurrentBoardMove = false
        const boardSnapshot = squaresHistory[idx]

        if (idx === currentBoardMove - 1) {
            isCurrentBoardMove = true
        }

        boardHistoryButtons.push(<BoardHistoryButton 
            key={idx}
            boardSnapshot={boardSnapshot}
            historyIdx={idx}
            isCurrentBoardState={isCurrentBoardMove}
            handleRevertToPreviousBoardState={revertToPreviousBoardState}
            />)
    }

    return(
        <ul>{boardHistoryButtons}</ul>   
    )
}

export default BoardHistoryList