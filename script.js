// (function() {

    const Gameboard  = (() => {
        let gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
        const getGameboard = () => {
            console.log(gameboard);
            return gameboard;
        }
        const resetGameBoard = () => {
            gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
        }

        return {getGameboard}
    })();
    
    const displayController = (() => {
        let turn = 1
        const pregameDisplay = document.querySelector("#pregame-display");
        const gameDisplay = document.querySelector("#game-display");
        const playBtn = document.querySelector(".play-btn");

        const reset = () => {
            Gameboard.resetGameBoard()
        }
        const beginGame = () => {
            pregameDisplay.classList.toggle('inactive')
            gameDisplay.classList.toggle('inactive')
        }

        const checkForWinner = () => {
            const boardLayout = Gameboard.getGameboard()
            for (let i = 0; i < 3; i++) {
                if (boardLayout[0][i] === boardLayout[1][i] & boardLayout[0][i] === boardLayout[2][i]) {
                    console.log(boardLayout[0][i])
                    return boardLayout[0][i]
                } else if (boardLayout[i][0] === boardLayout[i][1] & boardLayout[i][0] === boardLayout[i][2]) {
                    console.log(boardLayout[i][0]) 
                    return boardLayout[i][0]
                }
            }
            if (boardLayout[0][0] === boardLayout[1][1] & boardLayout[0][0] === boardLayout[2][2]){
                console.log(boardLayout[0][0])
                return boardLayout[0][0]
            } else if (boardLayout[0][2] === boardLayout[1][1] & boardLayout[0][2] === boardLayout[2][0]) {
                console.log(boardLayout[0][2])
                return boardLayout[0][2]
            }
            
            if (turn===9) {
                return "tie"
            } else {

            }
        }

        const initiatePlayer = () => {
            
        }

        playBtn.addEventListener('click', beginGame)

        return {checkForWinner}
        
    })(); 
    
    const Player = (playerName, playerSymbol) => {
        const name = playerName;
        const symbol = playerSymbol;
        const getPlayerName = () => name;
        const getPlayerSymbol = () => symbol;
        
        return {
            getPlayerName, 
            getPlayerSymbol
        }
    };
    
    const HumanPlayer = (playerName, playerSymbol) => {    
        const prototype = Player(playerName,playerSymbol)
        const playTurn = () => {
            
        }
        const returnObj = {playTurn}
        return Object.assign({},prototype,returnObj)
    };
    console.log("Hello")



// })();
    
displayController.checkForWinner()
    
    
    
    
    
    
    
    
// This is for when I implement the MiniMax Algorithm
// const AIPlayer = () => {
//     const prototype = Player(playerName,playerSymbol)
//     const playTurn = () => {

//     }
//     const returnObj = {playTurn}
//     return Object.assign({},prototype,returnObj)
// };
