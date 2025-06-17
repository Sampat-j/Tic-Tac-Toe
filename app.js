let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGamebtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;  //playerX,PlayerO
const winningPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
   
];

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");

};
boxes.forEach((box)=>{
    // box.addEventListener("click",()=>{
    //     if(turnO===true){
    //         //PlayerO
    //       box.innerText="0";
    //       turnO=false;
    //     }else{
    //         //PlayerX
    //         box.innerText="X";
    //         turnO=true;
    //     }
    //     box.disabled=true;

    //     checkWinner();
    // })
    box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
        box.innerText = "O";
    } else {
        box.innerText = "X";
    }
    box.disabled = true;

    checkWinner();
    turnO = !turnO;

    if (isVsAI() && !turnO) {
        setTimeout(aiMove, 500); // Delay AI move slightly
    }
});

});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

};

checkWinner=()=>{
    for(let pattern of winningPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    
    }
};

newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);

//ai
const modeSelect = document.getElementById("mode");

function isVsAI() {
  return modeSelect.value === "ai";
};

function aiMove() {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return;

    let randIndex = Math.floor(Math.random() * emptyBoxes.length);
    let aiBox = emptyBoxes[randIndex];

    aiBox.innerText = "X";
    aiBox.disabled = true;

    checkWinner();
    turnO = !turnO;
}



