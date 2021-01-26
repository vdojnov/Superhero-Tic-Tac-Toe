(function() {

    const Gameboard  = (() => {
        let gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
        // let gameboard =  [
        // [ 'x', 'x', 'o' ], 
        // [ 'o', 'x', 'o' ], 
        // [ '7', '8', '9' ] 
        // ]
        const getGameboard = () => {
            // console.log(gameboard);
            return gameboard;
        }
        const resetGameBoard = () => {
            gameboard = [['1','2','3'],['4','5','6'],['7','8','9']]
        }
        const setGameboardVal = (i,j, val) => {
            gameboard[i][j] = val;
        }
        return {getGameboard, resetGameBoard, setGameboardVal}
    })();
    
    const displayController = (() => {
        const _pregameDisplay = document.querySelector("#pregame-display");
        const _gameDisplay = document.querySelector("#game-display");
        const _playBtn = document.querySelector("#play-btn");
        
        let _turn = 1;
        let gameOver = false;
        const _gameBoxes = document.querySelectorAll(".game-box");
        
        let playerOne;
        const _playerOneChars = document.querySelectorAll(".char-box-x");
        const playerOneNameP = document.querySelector("#player1-choice-text");
        
        let playerTwo;
        const _playerTwoChars = document.querySelectorAll(".char-box-o");
        const playerTwoNameP = document.querySelector("#player2-choice-text");
        let _isPlayerTwoBot = false;

        const _resultsText = document.querySelector("#results-text");
        const _playAgainBtn = document.querySelector("#play-again-btn");
        const _selectionRequiredText = document.querySelector("#selection-required-text")
        
        
        let countLogs = 0;
        
        
        const initGame = () => {
            _playBtn.addEventListener('click', _beginGame);
            _playerOneChars.forEach(box => {
                box.addEventListener('click', _setPlayerChar);
            });
            _playerTwoChars.forEach(box => {
                box.addEventListener('click', _setPlayerChar);
            });



            setPlayerTwoToBot()
            let gameboard =  [
                [ 'x', 'o', 'x' ], 
                [ 'o', 'o', 'x' ], 
                [ 'x', '8', '9' ] 
            ]
            console.log(gameboard)
            console.log(_minimax(gameboard,3,false))
            console.log(_getbestMove(gameboard))

        }

        function _setPlayerChar() {
            const playerObj = _getPlayerObjFromID(this.id);
            if (this.classList.contains('char-box-x')) {      
                _unselectChars(_playerOneChars);
                this.classList.add('selected-player');      
                playerOne = Player(playerObj.name, playerObj.url);
                playerOneNameP.textContent = playerObj.name;
            } else if (this.classList.contains('char-box-o')) {
                _unselectChars(_playerTwoChars);
                this.classList.add('selected-player'); 
                playerTwo = Player(playerObj.name, playerObj.url);
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
            gameOver = false;
            _playAgainBtn.classList.toggle("inactive");
            _resultsText.textContent = "";
            _changeDisplays();
            _unhighLightSelection();
            _clearCharsfromboard();
            _turn = 1;
            _isPlayerTwoBot = false;
        }
        const _unhighLightSelection = () => {
            _unselectChars(_playerOneChars)
            _unselectChars(_playerTwoChars)
            playerOneNameP.textContent = "Waiting for Player 1"
            playerTwoNameP.textContent = "Waiting for Player 2"
        }

        const _changeDisplays = () => {
            _pregameDisplay.classList.toggle('inactive')
            _gameDisplay.classList.toggle('inactive')
        }

        const _clearCharsfromboard = () => {
            _gameBoxes.forEach(element => {
                element.innerHTML = "";
            })
        }

        const _beginGame = () => {
            if (playerOne!=null & playerTwo!=null) {
                _changeDisplays()
                _gameBoxes.forEach(box => {
                    box.addEventListener('click', _applyPlayerImg)
                });
                _selectionRequiredText.classList.add('inactive')

                _playAgainBtn.addEventListener('click', reset)
            } else {
                console.log("here")
                _selectionRequiredText.classList.remove('inactive')
            }   
        }

        const _applyPlayerImg = function() {
            if (this.children.length === 0 & gameOver === false) {
                const x = +this.dataset.x;
                const y = +this.dataset.y;
                const img = document.createElement('img');
                if (_isPlayerOneTurn()) {
                    img.src = playerOne.getPlayerImgUrl();
                    Gameboard.setGameboardVal(x,y,"x")
                    this.appendChild(img);
                    let winSign = _checkForWinner(Gameboard.getGameboard());
                    _declareWinner(winSign)
                    if(_isPlayerTwoBot & _turn < 9 & gameOver===false) {
                        let arr = _getbestMove(Gameboard.getGameboard())
                        console.log(arr)
                        Gameboard.setGameboardVal(arr[0],arr[1],"o")
                        _gameBoxes.forEach(box => { 
                            if (+box.dataset.x === arr[0] & +box.dataset.y === arr[1]){
                                const img = document.createElement('img');
                                img.src = playerTwo.getPlayerImgUrl();
                                box.appendChild(img)
                            }                            
                        });
                        _turn++;
                        console.log(Gameboard.getGameboard())
                    };

                } else {
                    img.src = playerTwo.getPlayerImgUrl();
                    Gameboard.setGameboardVal(x,y,"o");
                    this.appendChild(img);
                };
                // console.log(Gameboard.getGameboard());
                if (gameOver===false){
                    winSign = _checkForWinner(Gameboard.getGameboard());
                    _declareWinner(winSign)
                    _turn++;
                }
            }
            
        }

        function _getbestMove(currentBoard) {
            let bestVal = +Infinity
            let bestMove = [-1,-1]

            for (let i = 0; i<3;i++){
                for (let j = 0;j<3;j++){
                    if (currentBoard[i][j] !== "x" & currentBoard[i][j] !== "o"){
                        let temp = currentBoard[i][j]
                        console.log(temp)
                        currentBoard[i][j] = 'o'
                        let moveVal = _minimax(currentBoard, 9-_turn, true)
                        // console.log("move val", moveVal, bestVal)
                        currentBoard[i][j] = temp
                        if (moveVal < bestVal){
                            bestMove = [i,j]
                            bestVal = moveVal
                        }
                    }
                }
            }
            console.log("best Val:", bestVal)
            
            return bestMove
        }


        function _minimax(currentBoard, depth, isMaximixingPlayer) {
            // console.log(currentBoard, depth, isMaximixingPlayer)
            let winSymbol = _checkForWinner(currentBoard)
            if (depth === 0 | winSymbol === "x" | winSymbol === "o" | winSymbol === "tie") {
                let gameOutcome = _checkForWinner(currentBoard)
                if (gameOutcome === 'x') {
                    return 10
                } else if (gameOutcome === 'o') {
                    return -10
                } else {
                    return 0
                }
            } 
                       
            if (isMaximixingPlayer) {
                let maxEval = -Infinity
                for (let i = 0; i<3;i++){
                    for (let j = 0;j<3;j++){
                        if (currentBoard[i][j] !== "x" & currentBoard[i][j] !== "o"){
                            let temp = currentBoard[i][j]
                            currentBoard[i][j] = 'x'
                            let val = _minimax(currentBoard, depth-1, false)
                            console.log(val)
                            currentBoard[i][j] = temp
    
                            if (val > maxEval){    
                                maxEval = val;
                            }
                        }
                    }
                }
                return maxEval



                // let maxEval = -Infinity
                // for (let i = 0; i<3;i++) {
                //     if (currentBoard[i][0] !== "x" & currentBoard[i][0] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][0] = 'o'
                //         let eval = _minimax(tempBoard,depth-1,false)
                //         maxEval = Math.max(maxEval, eval)
                                            
                //     }

                //     if (currentBoard[i][1] !== "x" & currentBoard[i][1] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][1] = 'o'
                //         let eval = _minimax(tempBoard,depth-1,false)
                //         maxEval = Math.max(maxEval, eval)                        
                //     }

                //     if (currentBoard[i][2] !== "x" & currentBoard[i][2] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][2] = 'o'
                //         let eval = _minimax(tempBoard,depth-1,false)
                //         maxEval = Math.max(maxEval, eval)                        
                //     }
                // }
                // // console.log(countLogs, maxEval, currentBoard)
                // // countLogs++; 
                // return maxEval
            } else {
                let minEval = +Infinity
                for (let i = 0; i<3;i++){
                    for (let j = 0;j<3;j++){
                        if (currentBoard[i][j] !== "x" & currentBoard[i][j] !== "o"){
                            let temp = currentBoard[i][j]
                            currentBoard[i][j] = 'o'
                            let val = _minimax(currentBoard, depth-1, true)
                            currentBoard[i][j] = temp
    
                            if (val < minEval){    
                                minEval = val;
                            }
                        }
                    }
                }
                return minEval

                // let minVal = +Infinity
                // for (let i = 0; i<3;i++) {
                //     if (currentBoard[i][0] !== "x" & currentBoard[i][0] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][0] = 'x'
                //         let eval = _minimax(tempBoard,depth-1,true)
                //         minVal = Math.min(minVal, eval)                        
                //     }

                //     if (currentBoard[i][1] !== "x" & currentBoard[i][1] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][1] = 'x'
                //         let eval = _minimax(tempBoard,depth-1,true)
                //         minVal = Math.min(minVal, eval)                        
                //     }

                //     if (currentBoard[i][2] !== "x" & currentBoard[i][2] !== "o") {
                //         let tempBoard = JSON.parse(JSON.stringify(currentBoard));
                //         tempBoard[i][2] = 'x'
                //         let eval = _minimax(tempBoard,depth-1,true)
                //         minVal = Math.min(minVal, eval)                        
                //     }
                // }
                // // console.log(countLogs, minVal, currentBoard)
                // // countLogs++;
                // return minVal
            }

        }

        function _isPlayerOneTurn() {
            return (_turn % 2 === 1);
        }

        const setPlayerTwoToBot = () => {
            _isPlayerTwoBot = true;
        }
        
        const _clearPlayers = () => {
            playerTwo = null;
            playerOne = null;
        }
        
        const testConsoleLog = () => {
            console.log("test passed");
            console.log(this);
        }

        const _declareWinner = (winningSymbol) => {
            if (winningSymbol === 'x') {
                _displayWinner(playerOne)
                gameOver = true;
                _playAgainBtn.classList.toggle("inactive")
            } else if (winningSymbol === 'o'){
                _displayWinner(playerTwo)
                gameOver = true;
                _playAgainBtn.classList.toggle("inactive")
            } else if (winningSymbol === 'tie') {
                _displayTie()
                gameOver = true;
                _playAgainBtn.classList.toggle("inactive")
            }
        }

        const _displayWinner = (playerObj) => {
            _resultsText.textContent = 'The Winner is: ' + playerObj.getPlayerName()
        }

        const _displayTie = () => {
            _resultsText.textContent = "It's a tie" 
        }

        const _checkForWinner = (boardLayout) => {
            for (let i = 0; i < 3; i++) {
                if (boardLayout[0][i] === boardLayout[1][i] & boardLayout[0][i] === boardLayout[2][i]) {
                    // _declareWinner(boardLayout[0][i]);
                    return boardLayout[0][i];
                } else if (boardLayout[i][0] === boardLayout[i][1] & boardLayout[i][0] === boardLayout[i][2]) {
                    // _declareWinner(boardLayout[i][0]); 
                    return boardLayout[i][0];
                }
            }
            if (boardLayout[0][0] === boardLayout[1][1] & boardLayout[0][0] === boardLayout[2][2]){
                // _declareWinner(boardLayout[0][0])
                return boardLayout[0][0];
            } else if (boardLayout[0][2] === boardLayout[1][1] & boardLayout[0][2] === boardLayout[2][0]) {
                // _declareWinner(boardLayout[0][2]);
                return boardLayout[0][2];
            }
            
            if (_turn===9 & gameOver === false) {
                // _declareWinner('tie')
                return "tie"
            } else {
                let count = 0;
                for (let i = 0; i<3;i++){
                    for (let j = 0;j<3;j++){
                        if (boardLayout[i][j] === 'x' | boardLayout[i][j] === 'o'){
                            count++;
                        }
                    }
                }
                if (count === 9){
                    return "tie"
                }

            }
        }

        return { 
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
