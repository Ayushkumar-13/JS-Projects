    let boxes = document.querySelectorAll(".box");
    let resetbtn = document.querySelector(".reset");
    let msgcontainer = document.querySelector(".msg-container");
    let msg = document.querySelector(".msg");
    let turnO = true;
    let container = document.querySelector(".container");

    container.insertBefore( msgcontainer, container.firstChild);

    const winPatterns = [
        [0, 1, 2], [0, 3, 6], [3, 4, 5], [6, 7, 8],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    let winSound = new Audio("sound/winsound.wav")
    let drawSound = new Audio("sound/drawsound.wav")
    let moveSound = new Audio("sound/movesound.wav");

    const resetGame = () => {
        turnO = true;
        enableBoxes();
        msgcontainer.classList.add("hide");
        winSound.pause()
    }

    const disableBoxes = () => {
        boxes.forEach(box => box.classList.add('disabled'));
    }

    const enableBoxes = () => {
        boxes.forEach(box => {
            box.classList.remove('disabled', 'win-pattern');
            box.innerText = "";
            box.style.color = "";
            box.style.backgroundColor = "";
        });
    }

    const showWinner = (winner) => {
        msg.innerText = `Player ${winner} Wins!`;
        msgcontainer.classList.remove("hide");
        stopAudio(winSound)

        for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;
            
            if (pos1Val === winner) {
                boxes[pattern[0]].classList.add('win-pattern');
                boxes[pattern[1]].classList.add('win-pattern');
                boxes[pattern[2]].classList.add('win-pattern');
            }
        }
        disableBoxes();
    }

    const showDraw = () => {
        msg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");
        drawSound.play();
        stopAudio(drawSound)
    }

    let winnerFound = false;
    const checkWinner = () => {

        for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    winnerFound = true;
                    
                    pattern.forEach(index => {
                        boxes[index].classList.add('win-pattern');
                        boxes[index].style.backgroundColor = "lightblue";
                    });
        
                    showWinner(pos1Val);
                    break;


                }
            }
        }

        if (!winnerFound) {
            let allFilled = Array.from(boxes).every(box => box.innerText !== "");
            if (allFilled) showDraw();
        }
    }
    // if (!winner){
    //   showDraw();
    //   if (!checkWinner() == " ") return
    // }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.classList.contains('disabled')) return;

            box.innerText = turnO ? "O" : "X";
            box.style.color = turnO ? "green" : "brown";
            turnO = !turnO;
            box.classList.add('disabled');
            checkWinner();
        });
    });

    // newGameBtn.addEventListener("click", resetGame);
    resetbtn.addEventListener("click", resetGame);

    const stopAudio= (audio) => {
        audio.play();
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0; 
        }, 5000); 
    };
