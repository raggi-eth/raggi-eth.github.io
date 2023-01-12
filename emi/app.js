
function getRandomDelay() {
  return Math.random() * 6 + 's';
}

function convertVideoToSVG(videoUrl) {
  return new Promise(function (resolve, reject) {
    // Create a container element for the grid of divs
    var container = document.getElementById('divContainer');

    // Create the grid of divs
    for (var i = 0; i < 44; i++) {
      for (var j = 0; j < 44; j++) {
        var div = document.createElement('block');
        div.style.width = '12px';
        div.style.height = '12px';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.display = 'flex';
        div.style.scale = '1.2';
        div.style.animationDelay = j * i + 'ms';
        div.style.animationName = 'scale-animation';
        div.style.animationDuration = '3s';
        div.style.animationIterationCount = 'infinite';
        div.style.animationTimingFunction = 'ease-in-out';
        container.appendChild(div);
      }

    }
    // Create a video element
    var video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.onloadeddata = function () {
      // Create a canvas element
      var canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.willReadFrequently = true; // set the 'willReadFrequently' attribute
      var ctx = canvas.getContext('2d', { willReadFrequently: true });
      // Create a loop that updates the divs at a rate of 60 frames per second
      let lastFrame;
      function updateDivs() {
        let currentTimestamp = Date.now();
        if (!lastFrame || currentTimestamp - lastFrame > (1000 / 24)) {
          lastFrame = currentTimestamp;
          //process the video frame
          // Draw the current frame of the video to the canvas
          ctx.drawImage(video, 0, 0);
          // Extract the pixel data from the canvas
          var imageData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
          // Iterate over the pixels and set the background color of the corresponding div
          var divIndex = 0;
          for (var i = 0; i < imageData.data.length; i += 4) {
            var r = imageData.data[i];
            var g = imageData.data[i + 1];
            var b = imageData.data[i + 2];
            var a = imageData.data[i + 3];
            var color = rgbToHex(r, g, b);
            if (a === 0) {
              continue;
            }
            container.children[divIndex].style.backgroundColor = color;
            divIndex++;
          }
        }
        requestAnimationFrame(updateDivs);
      }

      updateDivs(); // Start the loop after two seconds
      document.body.appendChild(canvas);
    };
    video.onerror = reject;
    function startVideo() {
      video.loop = false;
      video.play();
      //schedule the first animation transition
      startTime = Date.now();
      animate(startTime);
    }
    //wait for 100ms before starting the video
    setTimeout(startVideo, 10);



  });
}

// testing 


let animationStates = [
  {
    columns: 412,
    transitionDuration: 1000,
    TriggerTime: 2000,
    next: 1
  },
  {
    columns: 44,
    transitionDuration: 2000,
    TriggerTime: 8000,
    next: 2
  },
  {
    columns: 44,
    transitionDuration: 3000,
    TriggerTime: 12000,
    next: 3
  },
  {
    columns: 110,
    transitionDuration: 2000,
    TriggerTime: 18000,
    next: 4
  },
  {
    columns: 4094,
    transitionDuration: 3000,
    TriggerTime: 26000,
    next: 5
  },
  {
    columns: 176,
    transitionDuration: 3000,
    TriggerTime: 32000,
    next: 6
  },
  {
    columns: 198,
    transitionDuration: 3000,
    TriggerTime: 45000,
    next: 7
  },
  {
    columns: 220,
    transitionDuration: 3000,
    TriggerTime: 50000,
    next: 8
  },
  {
    columns: 242,
    transitionDuration: 3000,
    TriggerTime: 60000,
    next: 9
  },
  {
    columns: 264,
    transitionDuration: 3000,
    TriggerTime: 63000,
    next: 0
  }
];

let currentState = 0;
let timer;
let startTime;

function animate() {
  let currentTime = Date.now()
  let elapsedTime = currentTime - startTime;
  // let seconds = Math.floor(elapsedTime / 1000);

  // get the current state
  let state = animationStates[currentState];
  if (currentState.next === 0) return;
  // compare the current time with the trigger time of the current state
  if (elapsedTime > state.TriggerTime) {
    console.log("triggered")
    // if the current time is greater than the trigger time, trigger the animation
    triggerAnimation(state);
    // set the current state to the next state
    currentState = state.next;
  }
  requestAnimationFrame(animate);
}

function triggerAnimation(state,) {

  if (!animateOn) return;

  // get the container element
  let container = document.getElementById('divContainer');
  // get the current number of columns --columns: repeat(<this value>, 1fr);
  let currentColumns = window.getComputedStyle(container).gridTemplateColumns.split(' ').length;
  let targetColumns = state.columns;
  let increment = 1;
  let incementedColumns = currentColumns;

  if (currentColumns > targetColumns) {
    increment = -1;
  }
  // we will use a timer to increment the number of columns
  let startTime;

  function animate() {
    // calculate the time elapsed since the animation began
    const timeElapsed = Date.now() - startTime;
    // calculate the progress of the animation as a value between 0 and 1
    const progress = timeElapsed / state.transitionDuration;
    // if the progress is greater than 1, the animation is complete, so clear the interval
    if (progress >= 1) {
      clearInterval(timer);
      return;
    }
    // calculate the eased transition value using the easeInOutQuad function
    let easedProgress;
    if (increment > 0) {
      easedProgress = easeInOutQuad(progress);
    } else {
      easedProgress = 1 - easeInOutQuad(1 - progress);
    }
    // use the eased transition value to interpolate the number of columns
    const incementedColumns = currentColumns + (targetColumns - currentColumns) * easedProgress;
    container.style.gridTemplateColumns = 'repeat(' + Math.round(incementedColumns) + ', 1fr)';
    // document.getElementById("divContainer").style.marginLeft = (44 - incementedColumns) * 12 + "px";
    // if (incementedColumns <= 44) {
    //   document.getElementById("divContainer").style.marginTop = (44 - incementedColumns) * -24 + "px";
    // }
  }
  // start the animation by setting the start time and starting the interval
  startTime = Date.now();
  timer = setInterval(animate, 1000 / 24);
}



function easeInOutQuad(t) {
  return t < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  // return t === 0 ? 0 : Math.pow(2, 10 * (t - 1))
  // return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  // return t === 0 ? 0 : t === 1 ? 1 : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
  // return 1 - Math.sqrt(1 - (t * t))
  // return Math.sqrt(1 - Math.pow(t - 1, 2))
  // return t < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  // return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3)
  // return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1
  // return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  // return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  // return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  // return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
}


// testing end

function rgbToHex(r, g, b) {
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  // Pad the hex string with
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
}

function convertBitmapToSVG(bitmap) {
  var svg = '';
  for (var i = 0; i < bitmap.length; i++) {
    for (var j = 0; j < bitmap[i].length; j++) {
      svg += '<rect x="' + j + '" y="' + i + '" width="1" height="1" fill="' + bitmap[i][j] + '"/>';
    }
  }
  return svg;
}




let rowGap;
let columnGap;
let scale;
let columns;

var slider = document.getElementById("columnsSlider");
slider.max = 200;
slider.min = 1;
slider.value = 100;
slider.step = 0.5;
slider.oninput = function () {
  console.log(this.value);
  if (this.value == 0) {
    this.value = 1;
  }
  document.getElementById("divContainer").style.scale = this.value / 100;
  scale = this.value / 100;

}
var slider2 = document.getElementById("columnsSlider2");
slider2.max = 40;
slider2.min = 0;
slider2.value = 0;
slider2.step = 0.1;
slider2.oninput = function () {
  console.log(this.value);
  if (this.value == 0) {
    this.value = 1;
  }
  document.getElementById("divContainer").style.rowGap = this.value + "px";
  rowGap = this.value;

}

var slider3 = document.getElementById("columnsSlider3");
slider3.max = 1353;
slider3.min = 1;
slider3.value = 44;
slider3.step = 1;
slider3.oninput = function () {
  console.log(this.value);
  if (this.value == 0) {
    this.value = 1;
  }
  document.getElementById("divContainer").style.gridTemplateColumns = 'repeat(' + this.value + ', 1fr)';
  columns = this.value;

}

var slider4 = document.getElementById("columnsSlider4");
slider4.max = 40;
slider4.min = 0;
slider4.value = 0;
slider4.step = .1;
slider4.oninput = function () {
  console.log(this.value);

  document.getElementById("divContainer").style.columnGap = this.value + "px";
  columnGap = this.value;
}

// create a div that 
var sliderInfoDisplay = document.createElement('div');

sliderInfoDisplay.innerHTML = 'Slider info';
// style the button and plase it in the DOM, plase it in the top right corner
sliderInfoDisplay.style.position = 'relative';
sliderInfoDisplay.style.width = '400px';
sliderInfoDisplay.style.height = '200px';
sliderInfoDisplay.style.top = '0';
sliderInfoDisplay.style.left = '0';
sliderInfoDisplay.style.zIndex = '100';
// place it in the sliderContainer
document.getElementById("sliderContainer").appendChild(sliderInfoDisplay);

let scaleAnimation = 1;
var scaleAnimationSlider = document.getElementById("scaleAnimationSlider");
scaleAnimationSlider.max = 4;
scaleAnimationSlider.min = 0;
scaleAnimationSlider.value = 1;
scaleAnimationSlider.step = 0.01;
scaleAnimationSlider.oninput = function () {
  console.log(this.value);
  if (this.value == 0) {
    this.value = 1;
  }
  scaleAnimation = this.value;
  document.documentElement.style.setProperty('--scaleAnimation', this.value);
}

// every 100ms update the sliderInfoDisplay
setInterval(function () {
  sliderInfoDisplay.innerHTML = '{' + '</br>' + 'transitionDuration: 0,</br> TriggerTime: 0, </br> next: 0,</br>' + 'scale: ' + scale + ',' + '</br>' + ' rowGap: ' + rowGap + ',' + '</br>' + ' columnGap: ' + columnGap + ',' + '</br>' + ' columns: ' + columns + '</br>' +'scaleAnimation: ' + scaleAnimation + '</br>' + '}';
}, 100);




// a button that is a boolean, if true the animation function will run/ plase it in the top of the sliderContainer. it should be darker when on and lighter when off
var animateOn = false;
var animateButton = document.createElement('button');
animateButton.innerHTML = 'Animate is off';
animateButton.style.backgroundColor = 'rgb(0, 0, 0)';
animateButton.style.color = 'rgb(255, 255, 255)';
// style the button and plase it in the DOM, plase it in the top right corner
animateButton.style.position = 'absolute';
// plase it in the top of the #sliderContainer
animateButton.style.top = '0';
animateButton.style.left = '0';
animateButton.style.zIndex = '100';
animateButton.style.marginTop = '-50px';
document.getElementById('sliderContainer').appendChild(animateButton);
// add an event listener to the button, on click start the process
animateButton.addEventListener('click', function () {
  debugger;
  if (!animateOn) {
    animateOn = true;
    animateButton.style.backgroundColor = 'rgb(255, 255, 255)';
    animateButton.style.color = 'rgb(0, 0, 0)';
    animateButton.innerHTML = 'Animate is on';
  } else {
    animateOn = false;
    animateButton.style.backgroundColor = 'rgb(0, 0, 0)';
    animateButton.style.color = 'rgb(255, 255, 255)';
    animateButton.innerHTML = 'Animate is off';
  }
}
);

// creata a button that will start the process
var startButton = document.createElement('button');
startButton.innerHTML = 'Start';
// style the button and plase it in the DOM, plase it in the top of the sliderContainer
startButton.style.backgroundColor = 'rgb(0, 0, 0)';
startButton.style.color = 'rgb(255, 255, 255)';
// style the button and plase it in the DOM, plase it in the top right corner
startButton.style.position = 'absolute';
// plase it in the top of the #sliderContainer
startButton.style.top = '0';
startButton.style.left = '0';
startButton.style.zIndex = '100';
startButton.style.marginTop = '-100px';

document.getElementById('sliderContainer').appendChild(startButton);
// add an event listener to the button, on click start the process
startButton.addEventListener('click', async function () {
  convertVideoToSVG('https://nftstorage.link/ipfs/bafybeie4jrftpqz2jhpkfuqtnrowrezm4whrpsnzhw4cmwrwdpli7ytgwa');
});

// a slider to change @keyframes scale-animation {
  // variable in css
  // :root {
  //   --scaleAnimation: 0;
  // }






