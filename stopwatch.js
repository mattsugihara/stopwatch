var timerRunning = false;
var duration = 0;
var previousTime = 0;
var digits = new Array(0,0,0,0);
var tapTimer = null;

// this should be called by tap detection, single/double

function tap () {
  startStop();
  if (tapTimer == null) {
        tapTimer = setTimeout(function () {
            tapTimer = null;
        }, 200)
    } else {
        clearTimeout(tapTimer);
        tapTimer = null;
        resetTheClock();
        alert('double tap');
    }
}

function startStop() {
  // if the timer is running, stop it, otherwise start it.
  if (timerRunning){
    stopTheClock()
;  } else {
    startTheClock();
  }
}


function startTheClock() {
    timerRunning = true;

    startTime = howLongHasItBeenSinceEpoc();
    previousTime = duration;
    runIt = window.setInterval(function(){ runTheClock(previousTime) }, 10);
}


function stopTheClock() {
    window.clearInterval(runIt);
    timerRunning = false;
    body = document.getElementsByTagName('body');
}


function runTheClock() {
  currentTime = howLongHasItBeenSinceEpoc();
  duration = (currentTime - startTime) + previousTime;

  digits[0] = Math.floor((duration / (1000*60*60)) % 24);
  digits[1] = Math.floor((duration / (1000*60)) % 60);
  digits[2] = Math.floor((duration / 1000) % 60);
  digits[3] = Math.floor(duration / (10));

  //prevents the display from getting too wide. Deciseconds aren't userful on the hour scale
  if(1<=digits[0]){
    document.getElementById('hours-section').style.display='inline';
    document.getElementById('deciseconds-section').style.display='none';
  }

  // force numbers to appear as two digits
  for (var i = digits.length - 1; i >= 0; i--) {
    digits[i] = ('0' + digits[i]).slice(-2);
  };

  writeTime();
}


function resetTheClock() {
  
  stopTheClock();

  timerRunning = false;
  duration = 0;
  previousTime = 0;
  
  // reset to zero
  for (var i = digits.length - 1; i >= 0; i--) {
    digits[i] = '00';
  };
  
  writeTime();
}


function writeTime(){
  document.getElementById('hours').innerHTML= digits[0];
  document.getElementById('minutes').innerHTML = digits[1];
  document.getElementById('seconds').innerHTML = digits[2];
  document.getElementById('deciseconds').innerHTML = digits[3];
}


function howLongHasItBeenSinceEpoc() {
  var date = new Date();
  var t = date.getTime();

  return t;
}