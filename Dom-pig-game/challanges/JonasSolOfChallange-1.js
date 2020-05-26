/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;

var lastDice;

init();
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent ;
// console.log(x);


document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying){
         //1. Random number
   var dice = Math.floor(Math.random() * 6) + 1;

   //2.Display the result
   var diceDom = document.querySelector('.dice'); // To select the dice class of html

   diceDom.style.display = 'block';

   diceDom.src = 'dice-' + dice + '.png';


   //3. Update the round score IF the roll number is not 1.
   if(dice === 6 && lastDice === 6 ){
       //Player looses score
       scores[activePlayer] = 0;
       document.getElementById('score-' + activePlayer).textContent = '0';
       nextPlayer();
       console.log(lastDice);
   }
  else if(dice !== 1){
       // Add Scroe to the current activePlayer
       roundScores += dice;
       document.getElementById('current-' + activePlayer).textContent = roundScores;
   }
   else if(dice === 1){
       // Second Player to turn to roll a dice

       // it clear means if(dice === 1){
           // and activeplayer 0 ? then it pass to 1 
           // and if activeplayer is 1 then it pass to 0
       //}

       nextPlayer() ;

   }
   lastDice = dice;

    }
   

});

document.querySelector('.btn-hold').addEventListener('click', function(){


    if(gamePlaying){
        // Add CURRENT Score to GLOBAL Score
    scores[activePlayer] += roundScores;

    //Update the UI
    document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

    //Check if player won the game
    if(scores[activePlayer] >= 100){  
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!'   
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
        gamePlaying = false;
    }
    else{
         //Next Player
    nextPlayer();
    }

    }
    
   
});

function nextPlayer(){
    activePlayer === 0? activePlayer = 1 : activePlayer = 0;

    roundScores = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
       
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
scores = [0,0];
roundScores = 0;
activePlayer = 0;
gamePlaying = true;


document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.querySelector('#name-0').textContent = 'Player 1'   
document.querySelector('#name-1').textContent = 'Player 2'   
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');


}