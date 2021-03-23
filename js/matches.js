function generateMatch(element, data) {
  for (let i = 0; i < data.length; i++) {
    var date = element[i].getElementsByClassName("date-dinamic")[0];
    date.textContent = data[i].Fecha;

    var score1 = element[i].getElementsByClassName("score-dinamic")[0];
    if (data[i].Resultado == "Victoria") {
      score1.classList.add("win-dinamic")
      score1.textContent = "Victoria";
    } else if (data[i].Resultado == "Derrota") {
      score1.classList.add("lost-dinamic")
      score1.textContent = "Derrota";
    } else {
      score1.textContent = "-"
    }
    var teamName1 = element[i].getElementsByClassName("team-name-dinamic")[0];
    teamName1.textContent = data[i].Equipo1;

    var teamLogo1 = element[i].getElementsByClassName("match-logo-presentation-dinamic")[0];
    teamLogo1.srcset = data[i].Logo1;

    var score2 = element[i].getElementsByClassName("score-dinamic")[1];
    if (data[i].Resultado == "Victoria") {
      score2.classList.add("lost-dinamic")
      score2.textContent = "Derrota";
    } else if (data[i].Resultado == "Derrota") {
      score2.classList.add("win-dinamic")
      score2.textContent = "Victoria";
    } else {
      score2.textContent = "-"
    }
    var teamName2 = element[i].getElementsByClassName("team-name-dinamic")[1];
    teamName2.textContent = data[i].Equipo2;

    var teamLogo2 = element[i].getElementsByClassName("match-logo-presentation-dinamic")[1];
    teamLogo2.srcset = data[i].Logo2;
  }
}

var scoreboardContainer = document.getElementsByClassName("scoreboard-container")[0];

var scoreboard = document.getElementsByClassName("scoreboard-dinamic")[0];
var scoreboard_arr = [];
scoreboard_arr.push(scoreboard);

var data;
$.ajax({
  type: "GET",
  url: "data/ResumenJornada.csv",
  dataType: "text",
  success: function(response) {
    data = $.csv.toObjects(response);
    for (let i = 1; i < data.length; i++) {
      clone = scoreboard.cloneNode(true);
      scoreboardContainer.append(clone);
      scoreboard_arr.push(clone);
    }
    generateMatch(scoreboard_arr, data);
  }
});
