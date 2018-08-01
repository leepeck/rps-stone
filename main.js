$(document).ready(function() {
  $("button").click(function(){
        alert("The paragraph was clicked.");
    });

  $("#playButton").click(function() {
    console.log("TEST");
    runExperiment();
  });
});

function runExperiment() {
  var results = new Array(25).fill().map(()=>new Array(6).fill(0));
  for (i = 0; i < $("#iterations").val(); i++) {
    var rankStarsPair = runSimulation(
        $("#initialRank").val(),
        $("#initialStars").val(),
        $("#gamesPlayed").val());
    results[rankStarsPair[0]][rankStarsPair[1]]++;
  }
  
  for (i = 0; i <= 25; i++) {
    var rankCount = 0;
    for (j = 0; j <= 5; j++) {
      rankCount += results[i][j];
    }
    console.log("rank = " + i + " outcomes = " + rankCount);
  }
}

function runSimulation(rank, stars, gamesPlayed) {
  var consecutiveWins = 0;
  //if (rank % 5) console.log(rank % 5);
  console.log("gamesPlayed = "+ gamesPlayed + "rank = " + rank + "stars = " + stars);
  for (i = 0; i < gamesPlayed && rank != 0; i++) {
    var isGameWon = playGame();
    if (isGameWon) {
      consecutiveWins++;
      // Extra star for consecutive win.
      if (consecutiveWins >= 3 && rank > 5) {
        stars = stars % 5 + 1;
        rank -= stars == 1;
      }
      stars = stars % 5 + 1;
      rank -= stars == 1;
    } else {
      consecutiveWins = 0;
      // Subract stars only if there are stars or ranks that can be decreased.
      if (stars != 0 || (rank % 5) != 0) {
        if (stars) {
          stars--;
        } else {
          rank++;
          stars = 4;
        }
      }
    }
  }
  
  console.log("rank = " + rank + " stars = " + stars);
  return [rank, stars];
}

function playGame() {
  return Math.random() >= 0.5;
}
