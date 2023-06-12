const players = (name, token) => {
    token ? mark='O' : mark="X";
    const score=0;
    return {name,token,mark, score};
};

function startGame(){
    let name1=document.getElementById('firstPlayerName').value;
    let name2=document.getElementById('secondPlayerName').value;
    name1 === '' ? name1='player1' : 0 ;
    name2 === '' ? name2='player2' : 0 ;
    const player1 = players(name1, true);
    const player2 = players(name2, false);
    document.getElementById("menuScreen").style.display='none';
    document.getElementById("currentPlayer").innerText=player1.name + ': '+ player1.mark;
    document.getElementById('playerOneScore').innerText= player1.name + ' score: ' + player1.score;
    document.getElementById('playerTwoScore').innerText= player2.name + ' score: ' + player2.score;
    return game = gameLogic(player1,player2);
}

const gameLogic =(player1,player2) => {

    let _gameBoard = [0,0,0,0,0,0,0,0,0];

    const _wincoditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    let _currentPlayer =  player1.token ? player1 : player2;

    const _displayBoard = (()=>{
        _gameBoard.forEach((element, index) => {
            let elementToDisplay = element == 0 ? '' : element ;
            document.getElementById(index).innerText= elementToDisplay;
            if(element==='X'){
                document.getElementById(index).classList.add('blackText');
            }else if(element==='O'){
                document.getElementById(index).classList.add('whiteText');
            }
        })
    });

    const _change_currentPlayer = () => _currentPlayer=player1.token ? player1 : player2;

    const _checkResult = (() => {
        
        _wincoditions.forEach(condition=>{
            const compareBoard = 
            _gameBoard[condition[0]] ==_currentPlayer.mark && 
            _gameBoard[condition[1]] ==_currentPlayer.mark && 
            _gameBoard[condition[2]] ==_currentPlayer.mark ;
            if(compareBoard){
                _currentPlayer==player1?player1.score++:player2.score++;
                _showResult('win');
            }
        })

        let draw=0;
        _gameBoard.forEach(element => {
            if(element!==0){
                draw++;
            }
        });
        if(draw==9){
            _showResult('draw')
        }
    });

    const _showResult = ((result)=>{
        const winnerDisplay = document.getElementById('resultScreen');
        winnerDisplay.style.display='flex';
        if(result==='win'){
            document.getElementById('resultScreenWinner').innerText=_currentPlayer.name + ' won';
        }else if(result==='draw'){
            document.getElementById('resultScreenWinner').innerText= "it's a draw";
        }
        let cleanAfter = () => winnerDisplay.style.display='none';
        document.getElementById('playerOneScore').innerText= player1.name + ' score: ' + player1.score;
        document.getElementById('playerTwoScore').innerText= player2.name + ' score: ' + player2.score;
        setTimeout(cleanAfter,2000)
        setTimeout(reset(),2000)
    });

    const _colorToggle = (()=>{

        const playerDisplay=document.getElementById("currentPlayer");
        if(playerDisplay.classList.contains('whiteText')){

            playerDisplay.classList.add('blackText');
            playerDisplay.classList.remove('whiteText');
            
        }else if(playerDisplay.classList.contains('blackText')){
            
            playerDisplay.classList.remove('blackText');
            playerDisplay.classList.add('whiteText');
        }

        const gameBcg=document.getElementById("gameBoard");
        if(gameBcg.classList.contains('whiteBackground')){

            gameBcg.classList.add('blackBackground');
            gameBcg.classList.remove('whiteBackground');
            
        }else if(gameBcg.classList.contains('blackBackground')){
            
            gameBcg.classList.remove('blackBackground');
            gameBcg.classList.add('whiteBackground');

        }

    });

    const _showPlayer = (()=> {
        const playerDisplay=document.getElementById("currentPlayer");
        playerDisplay.innerText = _currentPlayer.name + ': ' + _currentPlayer.mark;
    });

    const _resetgameBoard = () => {
        _gameBoard=_gameBoard.map(element=>element=0);
        for(i=0;i<9;i++){
            let element= document.getElementById(i);
            element.classList.remove(...element.classList);
        }
    }

    const reset = (() => {
        _resetgameBoard();
        _displayBoard();
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
        _checkResult();
        _change_currentPlayer();
        _showPlayer();
        _colorToggle();
    });
    return {
        play,
        reset
    }
};
