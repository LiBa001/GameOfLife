
var gridsize;
var xy;

function create() {
  gridsize = document.getElementById("gridsize").value;
  xy = new Array(gridsize);
  for (x = 0; x < gridsize; x++) {
    xy[x] = new Array(gridsize);
    for (y = 0; y < gridsize; y++) {
      xy[x][y] = false;
    }
  }

  var grid = document.getElementById("grid");
  grid.innerHTML = "";
  var xclass;
  var counter = 0;

  for (x in xy) {
    //xy[x] = new Array(0,1,2,3,4,5,6,7,8,9);
    grid.innerHTML = grid.innerHTML + "<div class='x'></div>";
    for (y in xy[x]) {
      //xy[x][y] = false
      element = document.getElementsByClassName("x")[x];
      element.innerHTML = element.innerHTML + "<div class='y' onclick='changeStatus("+x+","+y+")'></div>";
      cells = document.getElementsByClassName("y");
      if (xy[x][y]) {
        cells[counter].style.background = "blue";
      }
    }
    counter++;
  }
}

function makeRandom() {
  for (xpos in xy) {
    for (ypos in xy[xpos]) {
      randnum = Math.round(Math.random());
      if (randnum == 1) {
        alive(xpos, ypos, true)
      }
    }
  }
}


function get(xpos, ypos) {
  var xrow = document.getElementsByClassName("x")[xpos]
  object = xrow.getElementsByClassName("y")[ypos]

  return object
}

function alive(xpos, ypos, set=null) {
  xpos = Number(xpos);
  ypos = Number(ypos);
  if (set == null) {
    //if (xpos==5 && ypos==3) {
    //}
    return xy[Number(xpos)][Number(ypos)];

  }else if (set) {
    if (xpos == 0 || ypos == 0 || xpos == gridsize-1 || ypos == gridsize-1) {
      return false
    }
    xy[xpos][ypos] = set
    get(xpos, ypos).style.background = "blue"
    return set;

  }else if (!set) {
    xy[xpos][ypos] = set
    get(xpos, ypos).style.background = "grey"
    return set;
  }
}

function changeStatus(xpos, ypos) {
  var status = alive(xpos, ypos);

  if (status) {
    status = false;
  }else if (!status) {
    status = true;
  }
  return alive(xpos, ypos, status);
}

function livingNeighbours(xpos, ypos) {
  var livings = 0;
  var xcombs = [xpos,xpos-1,xpos+1];
  var ycombs = [ypos,ypos-1,ypos+1];

  for (xcomb in xcombs) {
    for (ycomb in ycombs) {
      if (xcombs[xcomb] < 0 || xcombs[xcomb] > gridsize-1) {
        livings = livings;
      }else if (ycombs[ycomb] < 0 || ycombs[ycomb] > gridsize-1) {
        livings = livings;
      }else if ( alive(xcombs[xcomb], ycombs[ycomb]) && (xcomb!=0 || ycomb!=0)) {
        livings++;
      }
    }
  }
  return livings;
}

function stepForward() {
  var livings;
  var nextXY = [];
  for(var i = 0, len = xy.length; i < len; ++i)
     nextXY[i] = xy[i].slice();

  for (xpos in xy) {
    for (ypos in xy[xpos]) {
      livings = Number(livingNeighbours(Number(xpos), Number(ypos)));
      if (livings == 3) {
        nextXY[xpos][ypos] = true;
      }else if (livings > 3) {
        nextXY[xpos][ypos] = false;
      }else if (livings < 2) {
        nextXY[xpos][ypos] = false;
      }
    }
  }
  for (xpos in nextXY) {
    for (ypos in nextXY[xpos]) {
      alive(xpos, ypos, nextXY[xpos][ypos]);
    }
  }
}

function clearall() {
  for (xpos in xy) {
    for (ypos in xy[xpos]) {
      alive(xpos, ypos, false);
    }
  }
}

var playing = false
function play() {
  playing = !playing;
  playbutton = document.getElementById("playbutton");

  if (playing) {
    playbutton.innerHTML = "Pause";
    loop();
  }else if (!playing) {
    playbutton.innerHTML = "Play";
  }
}

function loop() {
  stepForward()
  if (playing) {
    speed = document.getElementById("speed");
    window.setTimeout(loop, 505-speed.value);
  }
}

create();
