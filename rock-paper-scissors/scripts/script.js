// Declare global variables
let playerScore = 0;
let compScore = 0;
let totalRounds = 5;
let playerSelection = '';
let compSelection = '';
const itemArr = ['rock', 'paper', 'scissor'];
const info = document.querySelector('.info');
let player = document.querySelector('#player');
let computer = document.querySelector('#computer');
const para = document.createElement('p');
const historyContent = document.querySelector('.historyContent');
let winner = '';

const buttons = document.querySelectorAll('button');
buttons.forEach(startEvent);
function startEvent(button){
  button.addEventListener('click', playGame);
  function playGame(e){
    if (e.target.id === 'newGame'){
      reset();
    } else if (playerScore < 5 && compScore < 5){
      playerSelection = this.id;
      let randomNum = Math.floor(Math.random() * 3);
      compSelection = itemArr[randomNum];
      getResults();
      displayScores();
      displayHistory();
    } else declareWinner();
  }
}
function getResults(){
  if ( (playerSelection === 'rock' && compSelection === 'paper') || 
            (playerSelection === 'scissor' && compSelection === 'rock') || 
            (playerSelection === 'paper' && compSelection === 'scissor') ){
    ++compScore;
    capitalizeStr();
    info.innerText = `Computer played ${compSelection}. ${compSelection} beats ${playerSelection}. Computer won this round.`;
    winner = 'Computer';
  } else if ( (playerSelection === 'rock' && compSelection === 'scissor') || 
            (playerSelection === 'scissor' && compSelection === 'paper') || 
            (playerSelection === 'paper' && compSelection === 'rock') ){
    ++playerScore;
    capitalizeStr();
    info.innerText = `Computer played ${compSelection}. ${playerSelection} beats ${compSelection}. You won this round.`;
    winner = 'Computer';
  } else {
    capitalizeStr();
    info.innerText = `Computer played ${compSelection}. Draw!`;
    winner = `None`;
  }
  if (playerScore === 5 || compScore === 5){
    para.innerText = declareWinner();
  }
}

function declareWinner(){
  if (playerScore < compScore){
    info.innerText = `Computer played ${compSelection}.
                      ${compSelection} beats ${playerSelection}.
                      Computer has won total ${totalRounds} rounds. 
                      Click 'New Game' button to start a new game.`;
    winner = 'Computer';
  } else {
    info.innerText = `Computer played ${compSelection}.
                      ${playerSelection} beats ${compSelection}.
                      You have won total ${totalRounds} rounds.
                      Click 'New Game' button to start a new game.`;
    winner = 'Player';
  }
}

function capitalizeStr(){
  playerSelection = playerSelection.toUpperCase();
  compSelection = compSelection.toUpperCase();
}

function displayScores(){
  player.innerText = playerScore;
  computer.innerText = compScore;
  
}

function displayHistory(){
  const node = document.createElement('li');
  let textNode = document.createTextNode(`Playe chose: ${playerSelection}. Computer chose: ${compSelection}. ${winner} won this round.`);
  node.appendChild(textNode);
  historyContent.appendChild(node);
}

function reset(){
  playerScore = 0;
  compScore = 0;
  info.innerText = `INFO BOX`;
  player.innerText = 'Score';
  computer.innerText = 'Score';
  while (historyContent.firstChild){
    historyContent.removeChild(historyContent.firstChild);
  }
}