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
    const getPlayerName = () => {
        return name;
    };
};

const HumanPlayer = (playerName, playerSymbol) => {    
    const prototype = Player(playerName,playerSymbol)
    const playTurn = () => {

    }
    const returnObj = {playTurn}
    return Object.assign({},prototype,returnObj)
};

const AIPlayer = () => {
    const prototype = Player(playerName,playerSymbol)
    const playTurn = () => {

    }
    const returnObj = {playTurn}
    return Object.assign({},prototype,returnObj)
};
