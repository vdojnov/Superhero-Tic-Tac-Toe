(function() {

    const Gameboard  = (() => {
        let gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
        const getGameboard = () => {
            console.log(gameboard);
            return gameboard;
        }
        const resetGameBoard = () => {
            gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
        }

        return {getGameboard, resetGameBoard}
    })();
    
    const displayController = (() => {
        const _pregameDisplay = document.querySelector("#pregame-display");
        const _gameDisplay = document.querySelector("#game-display");
        const _playBtn = document.querySelector(".play-btn");
        
        let turn = 1
        const _gameBoxes = document.querySelectorAll(".game-box");
        
        let playerOne;
        const _playerOneChars = document.querySelectorAll(".char-box-x");
        const playerOneNameP = document.querySelector("#player1-choice-text");
        
        let playerTwo;
        const _playerTwoChars = document.querySelectorAll(".char-box-o");
        const playerTwoNameP = document.querySelector("#player2-choice-text");

        
        const initGame = () => {
            _playBtn.addEventListener('click', beginGame)
            _playerOneChars.forEach(box => {
                box.addEventListener('click', _setPlayerChar)
            });
            _playerTwoChars.forEach(box => {
                box.addEventListener('click', _setPlayerChar)
            });
        }

        function _setPlayerChar() {
            const playerObj = _getPlayerObjFromID(this.id)
            if (this.classList.contains('char-box-x')) {      
                _unselectChars(_playerOneChars)
                this.classList.add('selected-player')      
                playerOne = Player(playerObj.name, playerObj.url);
                playerOneNameP.textContent = playerObj.name;
            } else if (this.classList.contains('char-box-o')) {
                _unselectChars(_playerTwoChars)
                this.classList.add('selected-player') 
                playerTwo = Player(playerObj.name, playerObj.url)
                playerTwoNameP.textContent = playerObj.name;
            }
        }

        const _unselectChars = (...selections) => {
            selections.forEach(element => {
                element.forEach(function (box) {
                    box.classList.remove('selected-player')
                })
            });
        }

        function _getPlayerObjFromID(id) {
            switch(id) {
                case "hulk":
                  return {
                      name: "The Hulk",
                      url: "media/png/hulk.png"
                  }
                case "captainamerica":
                    return {
                        name: "Captain America",
                        url: "media/png/captainAmerica.png"
                    }
                case "nickfury":
                    return {
                        name: "Nick Fury",
                        url: "media/png/nickFury.png"
                    }
                case "spiderman":
                    return {
                        name: "Spiderman",
                        url: "media/png/spiderman.png"
                    }
                case "blackpanther":
                    return {
                        name: "Black Panther",
                        url: "media/png/blackPanther.png"
                    }
                    case "deadpool":
                        return {
                            name: "Deadpool",
                            url: "media/png/deadpool.png"
                        }
                    case "ironman":
                        return {
                            name: "Ironman",
                            url: "media/png/ironman.png"
                        }
                    case "thor":
                        return {
                            name: "Thor",
                            url: "media/png/thor.png"
                        }
              }
        }

        
        function reset() {
            Gameboard.resetGameBoard();
            _clearPlayers();
        }


        const beginGame = () => {
            if (playerOne!=null & playerTwo!=null) {
                _pregameDisplay.classList.toggle('inactive')
                _gameDisplay.classList.toggle('inactive')
                _gameBoxes.forEach(box => {
                    box.addEventListener('click', _applyPlayerImg)
                });
            }            
        }

        const _applyPlayerImg = function() {
            if (this.children.length === 0) {
                const img = document.createElement('img');
                if (_isPlayerOneTurn()) {
                    img.src = playerOne.getPlayerImgUrl();
                } else {
                    img.src = playerTwo.getPlayerImgUrl();
                }
                this.appendChild(img);
                turn++;
            }
            
        }

        const _isPlayerOneTurn = () => turn % 2 === 1;
        
        const _clearPlayers = () => {
            playerTwo = null;
            playerOne = null;
        }
        
        const testConsoleLog = () => {
            console.log("test passed")
            console.log(this)
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

        
        

        return {
            checkForWinner,
            initGame
        }
        
    })(); 
    
    const Player = (playerName, playerImgUrl) => {
        const name = playerName;
        const imgUrl = playerImgUrl;
        const getPlayerName = () => name;
        const getPlayerImgUrl = () => imgUrl;
        
        return {
             getPlayerName 
            ,getPlayerImgUrl
        }
    };
    
    const HumanPlayer = (playerName, playerImgUrl) => {    
        const prototype = Player(playerName,playerImgUrl)
        const returnObj = {}
        return Object.assign({},prototype,returnObj)
    };

    displayController.initGame()

})();
    
// displayController.checkForWinner()
    
    
    
    
    
// This is for when I implement the MiniMax Algorithm
// const AIPlayer = () => {
//     const prototype = Player(playerName,playerSymbol)
//     const playTurn = () => {

//     }
//     const returnObj = {playTurn}
//     return Object.assign({},prototype,returnObj)
// };
