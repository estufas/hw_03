$(document).ready(function() {
	 		
    $("#playerTbl1").hide();
    $("#playerTbl2").hide();

    $("#refreshButton").on( "click", function() {
            e.preventDefault();
            player1['moves'] = 0;
            player2['moves'] = 0;
            boardCmpleted = 0;
            startBoard("#playerTbl1");
            startBoard("#playerTbl2");
            boardOne("#playerTbl1", 1);
            boardOne("#playerTbl2", 2);
    })

    $("#onePlayer").on( "click", function(e) {
      e.preventDefault();
      singlePlayer = true
      $("#playerTbl1").show();
      startBoard("#playerTbl1");
      boardOne("#playerTbl1", 1);
      $("#twoPlayer").hide();
      $("#onePlayer").hide();
      $("#image").hide();
      $("#text").hide();
      $("#text2").hide();

    })

    $("#twoPlayer").on( "click", function(e) {
      e.preventDefault();
      singlePlayer = false
      $("#playerTbl1").show();
      startBoard("#playerTbl1");
      boardOne("#playerTbl1", 1);
      $("#onePlayer").hide();
      $("#twoPlayer").hide();
      $("#textBox").html("<h1>Player 1</h1>");
      $("#image").hide();
      $("#text").hide();
      $("#text2").hide();

    })
       		
});
 

var player1 = {
  moves : 0,
  winner : false
}

var player2 = {
  moves : 0,
  winner : false
}

// var singlePlayer = true;

// var showRefresh = function() {
//   if((boardCmpleted === 1) && (singlePlayer === true)) {
//     $("#refresh").show();
//   } else if ((boardCmpleted === 2) && (singlePlayer === false)) {
//     $("#refresh").show();
//   } else {
//     $("#refresh").hide();
//   }
// }

var secondPlayerTurn = function() {
  $("#playerTbl1").hide();
  $("#playerTbl2").show();
  startBoard("#playerTbl2");
  boardOne("#playerTbl2", 2);
  $("#textBox").html(' ');
  $("#textBox").html("<h1>Player 2</h1>");
  // comparePlayerMoves(player1['moves'], player2['moves']);
}

var boardOne = function(playerId, playerNum) {
        var currentPlayer = (playerNum === 1 ? player1 : player2);
        var moves = currentPlayer['moves'];

        $(playerId + ' td').mousedown(function() {

      // Where in the table did the user click?
          var col = $(this).index();
          var row = $(this).parent().index();
          // console.log("Clicked on row=" + row + " and col=" + col);

      // Where in the table is the empty cell?
          var empty = $(playerId + ' td:contains("_")');
          var emptycol = empty.index();
          var emptyrow = empty.parent().index();
          // console.log("Empty at row=" + emptyrow + " and col=" + emptycol);

      // If it's right next to the click, swap them.
          if (Math.abs(emptycol - col) + Math.abs(emptyrow - row) == 1) {
            empty.html($(this).html());
            $(this).html('_');
            moves++;
            currentPlayer['moves'] = moves;
            $("#textBox").html(' ');
            if(singlePlayer === true) {
              $("#textBox").html("<h1>Moves: " + moves + "</h1>");
            } else if (singlePlayer === false) {
              if(boardCmpleted === 0) {
                $("#textBox").html("<h1>Player 1 Moves: " + moves + "</h1>");
              } else if (boardCmpleted === 1) {
                $("#textBox").html("<h1>Player 2 Moves: " + moves + "</h1>");
              }
            }
            currentBoard(playerId);
            compareWinningBoard(playerId);
          }

  // Return false to avoid the default browser thing (selection) after click.

        });
    };


  Array.prototype.shuffle = function(){
    var currentIndex = this.length,
        temporaryValue,
        randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this[currentIndex];
            this[currentIndex] = this[randomIndex];
            this[randomIndex] = temporaryValue;
        }

        return this;
  }
  var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'_'];
  var currentBoardArray = [];
  console.log(currentBoardArray);

  var startBoard = function(player) {
    var newArray = numbers.shuffle();
    console.log($(player + " td"));
    $(player + " td").each(function(i){
        $(this).text(newArray[i]);
    });
  }

 var currentBoard = function(player) {
    currentBoardArray.length = 0;
    $(player + " td").each(function(i, val) {
        currentBoardArray.push(val.innerText);
        
    })
    console.log(currentBoardArray);
    return currentBoardArray;
 }
 
 var winningArray = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15", "_"];
 var boardCmpleted = 0;
 
 var compareWinningBoard = function(player) {
    var noWin = 0;
    for(var i = 0; i < 16; i++) {
        if(winningArray[i] !== currentBoardArray[i]) {
            noWin = 1
        }
    }
    if (noWin == 0){
        boardCmpleted++;
        console.log('boardCmpleted', boardCmpleted);
        if(boardCmpleted === 1 && singlePlayer === false) {
          secondPlayerTurn();
        } else if (boardCmpleted === 2) {
          // console.log('theMoves',player1['moves'], player2['moves']);
          comparePlayerMoves(player1['moves'], player2['moves']);
          showRefresh();
        } else if(boardCmpleted === 1 && singlePlayer === true) {
          $("#textBox").html(' ');
          $("#textBox").html("<h1>completed</h1>");
          $("#playerTbl1").hide();
           }
    } else {
        return;
    }
 }

 var comparePlayerMoves = function(moves1, moves2) {
  if((boardCmpleted > 1) && (moves1 < moves2)) {
    $("#playerTbl1").hide();
    $("#playerTbl2").hide();
    $("#textBox").html(' ');
    // $("#refresh").show();
    $("#textBox").html("<h1>Player 1 Wins</h1>" + moves1 + " vs " + moves2);
      
  } else if ((boardCmpleted > 1) && (moves1 > moves2)) {
    $("#playerTbl1").hide();
    $("#playerTbl2").hide();
    $("#textBox").html(' ');
    // $("#refresh").show();
    $("#textBox").html("<h1>Player 2 Wins</h1>" + moves1 + " vs " + moves2);
    
  } else {
    $("#playerTbl1").hide();
    $("#playerTbl2").hide();
    $("#textBox").html(' ');
    // $("#refresh").show();
    $("#textBox").html("<h1>Its a Tie</h1>");
    
  }
 }




