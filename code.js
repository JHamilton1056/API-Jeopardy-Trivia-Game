let score = 0;
let questionIndex = 0;
let currentAnswer = "";

let button = document.querySelector("button");

let runGame = button.addEventListener('click', () => {

    button.style.visibility = "hidden";
    let buttonDiv = document.querySelector("button_div");
    
    
    let scoreSpan = document.getElementById("score");
    scoreSpan.style.color = "white";


    let scoreValue = document.getElementById("score_value");
    scoreValue.innerText = score;
    scoreValue.style.color = "white";

    getClues();

    
    let answerInput = document.createElement("input");
    let gameDiv = document.querySelector("#game_div");
    gameDiv.append(answerInput);
    answerInput.id = "answer_input";
    answerInput.type = "text";
    

    let submitButton = document.createElement("button");
    gameDiv.append(submitButton);
    submitButton.innerText = "Submit";
    submitButton.id = "submit_button";

    submitButton.addEventListener('click', () => {
       let finalAnswer = answerInput.value.trim();
       finalAnswer = finalAnswer.toLowerCase();
       console.log(finalAnswer);
       
       if (finalAnswer === currentAnswer.toLowerCase()) {
           score += 1;
           scoreValue.innerText = score;
           answerInput.value = "";

           let correctDiv = document.createElement("div");
           correctDiv.id = "correct_div";
           let correctMessage = document.createElement("p");
           let text = `Correct!`;
           correctMessage.innerText = text;
           correctDiv.append(correctMessage);
           gameDiv.append(correctDiv);

           function eraseDiv() {
               correctDiv.style.display = "none";
           }
           window.setTimeout(eraseDiv,2000);


           getClues();
       }
       else {
           let questionP = document.getElementById("question")
           questionP.innerHTML = `Correct Answer: ${currentAnswer}`;
           submitButton.disabled = "true";
           answerInput.value = "";
           let gameOverDiv = document.createElement('div');
           gameOverDiv.id = "game_over_div";
           gameDiv.append(gameOverDiv);

           let text = `GAME OVER --- Would you like to play again?`;

            let gameOverP = document.createElement('p');
            gameOverP.innerText = text;
            gameOverP.id = "game_over_p";
            gameOverDiv.append(gameOverP);

            let replayDiv = document.createElement('div');
            replayDiv.id = "replay_div";

            gameDiv.append(replayDiv);

            let noReplayButton = document.createElement('button');
            noReplayButton.id = "no_replay";
            noReplayButton.innerText = "NO";
            replayDiv.append(noReplayButton);

            noReplayButton.addEventListener('click', () => {
                gameOverP.style.display = "none";
                replayDiv.style.display = "none";
                submitButton.style.display = "none";
                answerInput.style.display = "none";
                scoreSpan.style.display = "none";

                let quesionP = document.getElementById("question");
                quesionP.innerHTML = "Thank You For Playing";
            })


            let yesReplayButton = document.createElement('button');
            yesReplayButton.id = "yes_replay";
            yesReplayButton.innerText = "YES";
            replayDiv.append(yesReplayButton);

            yesReplayButton.addEventListener('click', () => {
                score = 0;
                scoreValue.innerText = score;
                getClues();
                submitButton.disabled = false;
                gameOverP.style.display = "none";
                replayDiv.style.display = "none";
            })
       }
    })

})



let getClues = () => {
    let neededId = "";
    fetch("https://jservice.io/api/random")
    .then((response) => response.json())
    .then((data) => {
     console.log(data);   
     neededId = data[0].id;

        fetch(`https://jservice.io/api/clues?category?id=${neededId}`)
        .then((response) => response.json())
        .then((data) => {
            let clueArray = data;
            let questionP = document.getElementById("question");
            let randomIndex = Math.random() * 100;
            randomIndex = Math.floor(randomIndex);
            questionIndex = randomIndex;
            questionP.innerHTML = `${clueArray[questionIndex].question}?`

            currentAnswer = clueArray[questionIndex].answer;

            console.log(clueArray[questionIndex]);
        })
    })
}