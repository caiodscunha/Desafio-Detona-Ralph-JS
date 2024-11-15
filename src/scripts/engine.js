const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes")
    },
    values:{
        //timerId: null,
        lifes: 3,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 20,
        bestScore: 0,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),  //null caso use move enemy
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function playSound(audioname){
    let audio = new Audio(`./src/audios/${audioname}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if (state.values.currentTime <= 0) {
        state.values.lifes--;
        updateLivesDisplay();

        if (state.values.lifes > 0) {
            restartRound();
        } else {
            alert(`Game Over! Sua melhor pontuação foi: ${state.values.bestScore}`);
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            state.values.hitPosition = null;
        }
    }
}

function restartRound() {
    alert(`Pontuação da rodada: ${state.values.result}`);
    if (state.values.result > state.values.bestScore) {
        state.values.bestScore = state.values.result;
    }

    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.values.currentTime = 20;
    state.view.timeLeft.textContent = state.values.currentTime;
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

/*function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}*/

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                playSound("hit");
                state.values.hitPosition = null;
            }
        });
    })
}

function updateLivesDisplay() {
    state.view.lifes.textContent = `X${state.values.lifes}`;
}

function init(){
    //moveEnemy();
    updateLivesDisplay();
    addListenerHitBox();
}

init();