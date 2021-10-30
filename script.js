/* Students: Please use this week's project for Week 11: Assignment 9: Basic Data Visualization. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */


// 1. load external json, wait for it and then...
function loadJSON() {
  // use jquery's getJSON()
  // 1: the path to the external json file
  // 2: a function to run a give the json data jquery loaded
  $.getJSON("data.json",
    function (dataReturn) {
      
      marsBar(dataReturn);
    }
    
      );
}

//rendr bar chart into Canvas
function marsBar(data) {
  console.log(data);

  //get ref to html id canvas element
  let art1 = document.getElementById('chartBar');
  //get ref to 2d drawing context inside the canvas

  let context1 = art1.getContext('2d');

  //establish some useful values
  let startX = art1.width;
  let bottomY = art1.height;
  let maxVal = getMax(data);
  let scaleY = bottomY / maxVal;
  let scaleX = startX / (data.length);
  let i, height, lastX = 0;

  //loop through and draw some axis scale lines
  for (i = 0; i <= maxVal; i = i = maxVal / 10) {
    context1.beginPath();
    context1.moveTo(0, i * scaleY);
    context1.lineTo(startX, i * scaleY);
    context1.strokeStyle = "blue";
    context1.stroke;

    //draw text for each axis scale lines
    context1.fillStyle = "green";
    context1.font = "bold 20px monospace";
    context1.fillText(maxVal - i, 0, (i * scaleY) - 2);

  }

  //loop through ea. data array element and draw rectangle scaled
  for (i = 0; i < data.length; i++) {
    context1.fillStyle = data[i].color;
    context1.globalAlpha = 0.7;
    //calc height of rectangle using scale
    height = data[i].info * scaleY;
    //draw rectangle
    context1.fillRect(lastX, bottomY - height, scaleX, height);
    lastX += scaleX;
  }

}

// loops through json array and finds biggest info property values
function getMax(data) {
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].info > max) {
      max = data[i].info;
    }
  }
  return max;
}

