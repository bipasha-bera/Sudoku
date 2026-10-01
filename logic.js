const cells=document.querySelectorAll(".cell");
const newGameBtn=document.querySelector("#newGame");
const solveBtn=document.querySelector("#solve");
const resetBtn=document.querySelector("#reset");
let currentBoard=[];
 async function getNewGame(difficulty="easy"){
   const URL= `https://sugoku.onrender.com/board?difficulty=${difficulty}`;
   const response=await fetch(URL);
   const data= await response.json();
  currentBoard=data.board;
  displayBoard(currentBoard);
}
function displayBoard(board){
  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      let value=board[i][j];
      let cell=cells[i*9+j];
      if(value!==0) {
       cell.value=value;
       cell.disabled=true;
      }
      else{
        cell.value="";
        cell.disabled=false;
      }
    }
  }
}
function getBoardFromUI(){
  let board=[];
  for(let i=0;i<9;i++){
    board[i]=[];
    for(let j=0;j<9;j++){
    let  value=cells[i*9+j].value;
    board[i][j]=value===""? 0:parseInt(value);
    }
  }
  return board;
}
function isValid(board,i,j,num){
  let n=board.length();
  for(let ind=0;ind<n;ind++){
    if(board[i][ind]== num || board[ind][j]==num){
      return false;
    }
  }
    let row=(i*3)/3;
    let col=(j*3)/3;
    for(let startrow=row;startrow<row+3;startrow++){
      for(let startcol=col;startcol<col+3;startcol++){
          if(board[startrow][startcol]==num){
            return false;
          }
      }
    }
  
  return true;
}
function solver(board){
 for(let row=0;row<9;row++){
  for(let col=0;col<9;col++){
    if(board[i][j]===0){
  for(let num=1;num<=9;num++){
  if(isValid(board,row,col,num)){
    board[row][col]=num;
    if(solver(board)){
      return true;
    }
    board[row][col]=0;
  }
  }
  return false;
  } 
  }
 }
 return false;
}
solveBtn.addEventListener("click",()=>{
  let board=getBoardFromUI;
  if(solver(board)){
    displayBoard(board);
  }
  else{
    alert("No solution exits");
  }
});
newGameBtn.addEventListener("click", () => {
  getNewGame();
});
resetBtn.addEventListener("click", () => {
  displayBoard(currentBoard);
});
getNewGame();