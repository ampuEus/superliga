function generateCalendar(carouselItem, indicatorItem, data) {
  var jornada_ant = ""
  var count1 = 0
  var count2 = 0
  for (let i = 0; i < data.length; i++) {
    if (jornada_ant !== data[i].Jornada) {
      indicatorItem[count1].setAttribute("data-bs-slide-to", count1);

      var jornada = carouselItem[count1].getElementsByClassName("jordana-name-dinamic")[0];
      jornada.textContent = data[i].Jornada;

      // var col3 = carouselItem[i].getElementsByClassName("col-desc")[0];
      // var childs = col3.childNodes;
      // childs[3].textContent = data[i].Descanso;

      count1 += 1;
      count2 = 0;
    }


    var scoreItem = carouselItem[count1 - 1].getElementsByClassName("scoreboard-dinamic")[count2]


    var date = scoreItem.getElementsByClassName("date-dinamic")[0];
    date.textContent = data[i].Fecha;

    var score1 = scoreItem.getElementsByClassName("score-dinamic")[0];
    if (data[i].Resultado == "Victoria") {
      score1.classList.add("win-dinamic")
      score1.textContent = "Victoria";
    } else if (data[i].Resultado == "Derrota") {
      score1.classList.add("lost-dinamic")
      score1.textContent = "Derrota";
    } else {
      score1.textContent = "-"
    }
    var teamName1 = scoreItem.getElementsByClassName("team-name-dinamic")[0];
    teamName1.textContent = data[i].Equipo1;

    var teamLogo1 = scoreItem.getElementsByClassName("match-logo-presentation-dinamic")[0];
    teamLogo1.srcset = data[i].Logo1;

    var score2 = scoreItem.getElementsByClassName("score-dinamic")[1];
    if (data[i].Resultado == "Victoria") {
      score2.classList.add("lost-dinamic")
      score2.textContent = "Derrota";
    } else if (data[i].Resultado == "Derrota") {
      score2.classList.add("win-dinamic")
      score2.textContent = "Victoria";
    } else {
      score2.textContent = "-"
    }
    var teamName2 = scoreItem.getElementsByClassName("team-name-dinamic")[1];
    teamName2.textContent = data[i].Equipo2;

    var teamLogo2 = scoreItem.getElementsByClassName("match-logo-presentation-dinamic")[1];
    teamLogo2.srcset = data[i].Logo2;

    var btnWatch = scoreItem.getElementsByClassName("btn-ver")[0];
    if (data[i].Ver !== "") {
      btnWatch.setAttribute("href", data[i].Ver);
    } else {
      btnWatch.remove();
    }

    if (data[i].Fecha == "Descanso") {
      score1.remove();
      score2.remove();
      teamName2.remove();
      teamLogo2.remove();
      btnWatch.remove();
    }

    count2 += 1;
    jornada_ant = data[i].Jornada
  }
}


var scoreboardContainer = document.getElementsByClassName("scoreboard-container-dinamic")[0];
var scoreboardItem = document.getElementsByClassName("scoreboard-dinamic")[0];
var scoreItem_arr = [];
scoreboardItem.remove();

var calendarIndicators = document.getElementsByClassName("calendar-indicators-dinamic")[0];
var indicatorItem = calendarIndicators.children[0];
var indItem_arr = [];
indicatorItem.remove();

var calendarContainer = document.getElementsByClassName("calendar-container-dinamic")[0];
var carouselItem = document.getElementsByClassName("carousel-item")[0];
var carItem_arr = [];
carouselItem.remove();


var data;
$.ajax({
  type: "GET",
  url: "data/Jornadas.csv",
  dataType: "text",
  success: function(response) {
    data = $.csv.toObjects(response);
    var jornada_ant = "";

    // Esto cuando está primero que lo demás para que lo demás se clone con los
    // 7 scoreboards
    for (let i = 0; i < 7; i++) {
      clone = scoreboardItem.cloneNode(true);
      scoreboardContainer.append(clone);
      scoreItem_arr.push(clone);
    }

    for (let i = 0; i < data.length; i++) {
      if (jornada_ant !== data[i].Jornada) {
        clone = indicatorItem.cloneNode(true);
        calendarIndicators.append(clone);
        indItem_arr.push(clone);

        clone = carouselItem.cloneNode(true);
        calendarContainer.append(clone);
        carItem_arr.push(clone);
      }

      jornada_ant = data[i].Jornada;
    }

    indItem_arr[0].classList.add("active");
    indItem_arr[0].setAttribute("aria-current", "true");
    carItem_arr[0].classList.add("active");
    generateCalendar(carItem_arr, indItem_arr, data);
  }
});
