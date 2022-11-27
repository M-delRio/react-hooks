import * as React from 'react'

function BoardHistoryButton({boardSnapshot, historyIdx, isCurrentBoardState, handleRevertToPreviousBoardState}) {
    const getButtonText = (() => {
        let buttonText = ''
        
        if (historyIdx === 0) {
            buttonText = 'Go to game start' 
        } else {
            buttonText = `Go to move #${historyIdx}`
        }

        if (isCurrentBoardState === true) {
            buttonText += ' (Current)'
        }

        return buttonText
    }) 

    const restorePreviousBoardState = (() => {
        handleRevertToPreviousBoardState(historyIdx)
    })

    return (
        <li>
            <button disabled={isCurrentBoardState}
            onClick={restorePreviousBoardState}>
                {getButtonText()}
            </button>
        </li>
    )
}

export default BoardHistoryButton