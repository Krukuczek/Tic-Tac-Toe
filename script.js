const players = (name, token) => {
    token ? mark='O' : mark="X";
    return {name,token,mark};
};
const player1 = players('Max', true);
const player2 = players("Jan", false);

const startGame =() => {
    const _gameBoard = [0,0,0,0,0,0,0,0,0];
    const _wincoditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let _currentPlayer =  player1.token ? player1 : player2;
    const _displayBoard = (()=>{
        for (let i = 0; i < 9; i += 3) {
            console.log(_gameBoard[i], _gameBoard[i + 1], _gameBoard[i + 2]);
        }
    });
    const _change_currentPlayer = () => _currentPlayer=player1.token ? player1 : player2;
    const _checkWin = (() => {
        
        _wincoditions.forEach(condition=>{
            const compareBoard = 
            _gameBoard[condition[0]] ==_currentPlayer.mark && 
            _gameBoard[condition[1]] ==_currentPlayer.mark && 
            _gameBoard[condition[2]] ==_currentPlayer.mark ;
            if(compareBoard){
                console.log(_currentPlayer.name + ' won');
            }
        })
    });
    const play = ((position)=>{
        if(_gameBoard[position] !== 0 ) { console.log('you can not place there'); return 0 }
        _gameBoard[position]=_currentPlayer.mark;
        if(_currentPlayer == player1) {
            player1.token=false;
            player2.token=true;
            
        }else{
            player1.token=true;
            player2.token=false;
        }
        _displayBoard();
        _checkWin();
        _change_currentPlayer();
        console.log('current player is '+ _currentPlayer.name);
    });
    return {
        play
    }
};





