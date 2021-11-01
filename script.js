/* global $ */
// 1. load external json, wait for it and then...
loadJSON();
draw();
twoTriangles();

function loadJSON() {

  console.log('hello');
  // use jquery's getJSON()
  // 1: the path to the external json file
  // 2: a function to run a give the json data jquery loaded
  $.getJSON("data.json",
    function (dataReturn) {
      // console.log( dataReturned );
      myBars(dataReturn);
    }
  );
}

// 2. render bar chart into canvas
function myBars(data) {
  //console.log(data);

  // get refrence to html canvas element
  let art1 = document.getElementById('chartBar');
  // get ref to 2d drawing context inside the canvas
  let context1 = art1.getContext('2d');

  // now can establish some useful values
  let startX = art1.width;
  let bottomY = art1.height;
  let maxVal = getMax(data);
  let scaleY = bottomY / maxVal;
  let scaleX = startX / (data.length);
  let i, height, lastX = 0;

  // loop thru and draw some axis scale lines
  for (i = 0; i <= maxVal; i = i + maxVal / 10) {
    context1.beginPath();
    context1.moveTo(0, i * scaleY);
    context1.lineTo(startX, i * scaleY);
    context1.strokeStyle = "blue";
    context1.stroke();

    // draw text for each axis scale line
    context1.fillStyle = "dark green";
    context1.font = "bold 20px sans-serif";
    context1.fillText(maxVal - i, 0, (i * scaleY) - 2);
  }

  // loop thru each data array element and draw rect scaled
  for (i = 0; i < data.length; i++) {
    // set fill color
    context1.fillStyle = data[i].color;
    context1.globalAlpha = 0.7;
    // calc height of rect using scale
    height = data[i].info * scaleY;
    // draw rect
    context1.fillRect(lastX, bottomY - height, scaleX, height);
    lastX += scaleX;
  }
}

// 3. loops thru json array and finds biggest val property value
function getMax(data) {
  var max = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].info > max) {
      max = data[i].info;
    }
  }
  return max;
}


//drawing triangle
function draw() {
  let canvas1 = document.getElementById('art2');
  if (canvas1.getContext) {
    let context1 = canvas1.getContext('2d')

    context1.beginPath();
    context1.moveTo(75, 75);
    context1.lineTo(10, 75);
    context1.lineTo(10, 25);
    //add color
    context1.fillStyle = 'rgba(160, 217, 175,0.8)';
    context1.fill();

  }
}

function twoTriangles() {
  var canvas2 = document.getElementById('art3');
  if (canvas2.getContext) {
    var ctx = canvas2.getContext('2d');

    // Fill triangle
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fillStyle = 'rgba(194, 134, 235)';
    ctx.fill();

    // Stroke triangle
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.strokeStyle = '#401f57';
    ctx.stroke();
  }
}