(function() {

    const Gameboard  = (() => {
        let gameboard = []
        const getGameboard = () => {
            console.log(gameboard)
        }
        return {getGameboard}
    })();
    
    const displayController = (() => {
        
        
        const initiatePlayer = () => {
            
        }
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
})();
    
    
    
    
    
    
    
    
    
    
// This is for when I implement the MiniMax Algorithm
// const AIPlayer = () => {
//     const prototype = Player(playerName,playerSymbol)
//     const playTurn = () => {

//     }
//     const returnObj = {playTurn}
//     return Object.assign({},prototype,returnObj)
// };
