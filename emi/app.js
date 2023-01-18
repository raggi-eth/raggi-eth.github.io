
function getRandomDelay() {
  return Math.random() * 6 + 's';
}

function removeClickListeners() {
  container.querySelectorAll('.block').forEach(function (div) {
    div.removeEventListener('click', handleClick);
  });
}

let handleClick = function (e) {
  removeClickListeners();
  // convertVideoToSVG('https://nftstorage.link/ipfs/bafybeie4jrftpqz2jhpkfuqtnrowrezm4whrpsnzhw4cmwrwdpli7ytgwa' );
  convertVideoToSVG('https://nftstorage.link/ipfs/bafybeidykexajzvtx5ptscv6ehutikrlv7u5b24cr5vhdxsoullenuokea')
  // convertVideoToSVG('https://nftstorage.link/ipfs/bafybeifigcc6xv2wq6mzxmdroas7h2f5o5dihd5v3oz6wfyzcskhwpvhk4')


}

function createDivs() {
  var container = document.getElementById('divContainer');

  // Create the grid of divs
  for (var i = 0; i < 44 ; i++) {
    for (var j = 0; j < 44; j++) {
      var div = document.createElement('div');
      // give each div the same class name
      div.className = 'block';
      div.style.animationDelay = j * i + 'ms';
      div.style.animationName = 'scale-animation';
      div.style.animationDuration = '3s';
      div.style.animationIterationCount = 'infinite';
      div.style.animationTimingFunction = 'ease-in-out';
      container.appendChild(div);
      div.addEventListener('click', handleClick);
      div.addEventListener('mouseenter', function () {
        this.classList.add('mouse-over');
      });
      div.addEventListener('mouseleave', function () {
        this.classList.remove('mouse-over');
      });
    }
  }
}

function convertVideoToSVG(videoUrl) {


  // TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
  // container.querySelectorAll('block').forEach(function (div) {
  //   div.removeEventListener('click', arguments.callee);
  // });
  return new Promise(function (resolve, reject) {
    // Create a container element for the grid of divs

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
        if (!lastFrame || currentTimestamp - lastFrame > (1000 / 12)) {
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
    setTimeout(startVideo, 10);



  });
}

// testing 


let animationStates44 = [
  {
    transitionDuration: 5000,
    TriggerTime: 1000,
    next: 1,
    scale: .7,
    rowGap: 0,
    columnGap: 10,
    columns: 1353,
    scaleAnimation: 1
  },
  {
    transitionDuration: 10000,
    TriggerTime: 0,
    next: 2,
    scale: 0.3,
    rowGap: 50,
    columnGap: 20,
    columns: 88,
    scaleAnimation: 0.5
  },
  {
    transitionDuration: 2000,
    TriggerTime: 6500,
    next: 2,
    scale: 0.2,
    rowGap: 0,
    columnGap: 50,
    columns: 188,
    scaleAnimation: 1
  },
  {
    transitionDuration: 2000,
    TriggerTime: 0,
    next: 2,
    scale: 0.3,
    rowGap: 20,
    columnGap: 20,
    columns: 44,
    scaleAnimation: 1.43
  },
  {
    transitionDuration: 10000,
    TriggerTime: 0,
    next: 3,
    scale: 0.66,
    rowGap: 0,
    columnGap: 0,
    columns: 44,
    scaleAnimation: 1.43
  },
  {
    transitionDuration: 3000,
    TriggerTime: 10000,
    next: 4,
    scale: 0.33,
    rowGap: 7,
    columnGap: 32,
    columns: 22,
    scaleAnimation: 4
  },
  {
    transitionDuration: 10000,
    TriggerTime: 10000,
    next: 5,
    scale: 0.66,
    rowGap: 20,
    columnGap: 3,
    columns: 88,
    scaleAnimation: 3
  },
  {
    transitionDuration: 5000,
    TriggerTime: 100,
    next: 6,
    scale: 0.66,
    rowGap: 15,
    columnGap: 0,
    columns: 110,
    scaleAnimation: 3
  }
];

let animationStates = [
  {
    transitionDuration: 5000,
    TriggerTime: 1000,
    next: 1,
    scale: .7,
    rowGap: 0,
    columnGap: 10,
    columns: 1353,
    scaleAnimation: 1
  },
  {
    transitionDuration: 10000,
    TriggerTime: 0,
    next: 2,
    scale: 0.3,
    rowGap: 50,
    columnGap: 20,
    columns: 88,
    scaleAnimation: 0.5
  },
  {
    transitionDuration: 2000,
    TriggerTime: 6500,
    next: 2,
    scale: 0.2,
    rowGap: 0,
    columnGap: 50,
    columns: 188,
    scaleAnimation: 1
  },
  {
    transitionDuration: 2000,
    TriggerTime: 0,
    next: 2,
    scale: 0.3,
    rowGap: 20,
    columnGap: 20,
    columns: 44,
    scaleAnimation: 1.43
  },
  {
    transitionDuration: 10000,
    TriggerTime: 0,
    next: 3,
    scale: 0.66,
    rowGap: 0,
    columnGap: 0,
    columns: 44,
    scaleAnimation: 1.43
  },
  {
    transitionDuration: 3000,
    TriggerTime: 10000,
    next: 4,
    scale: 0.33,
    rowGap: 7,
    columnGap: 32,
    columns: 22,
    scaleAnimation: 4
  },
  {
    transitionDuration: 10000,
    TriggerTime: 10000,
    next: 5,
    scale: 0.66,
    rowGap: 20,
    columnGap: 3,
    columns: 88,
    scaleAnimation: 3
  },
  {
    transitionDuration: 5000,
    TriggerTime: 100,
    next: 6,
    scale: 0.66,
    rowGap: 15,
    columnGap: 0,
    columns: 110,
    scaleAnimation: 3
  }
];

let currentState = 0;
let timer;
let startTime;
let lastAnimationEndTime = 0;
let elapsedTime;
// animation states
let animating = false;
let animationStartTime = 0;
let animationEndTime = 0;
let animationDuration = 0;





function animate() {

  let currentTime = Date.now()
  elapsedTime = currentTime - startTime;
  // let seconds = Math.floor(elapsedTime / 1000);
  div.innerHTML = 'State: ' + currentState + '<br>Elapsed Time: ' + elapsedTime;
  // get the current state
  let state = animationStates[currentState];
  if (!animating) {
  // compare the current time with the trigger time of the current state
  if (elapsedTime >= lastAnimationEndTime + state.TriggerTime) {
    console.log("triggered")
    // if the current time is greater than the trigger time, trigger the animation
    triggerAnimation(state);
    animating = true;
    animationStartTime = currentTime - startTime;
    // set the current state to the next state
    if (currentState < animationStates.length - 1) {
    currentState++;
    } else {
    currentState = 0;
    }
    
    // set lastAnimationEndTime to to the current time + the transition duration
    //
    // lastAnimationEndTime = elapsedTime + state.transitionDuration;
    //
    // populate the info div with the current state and the elapsed time
    div.innerHTML = 'State: ' + currentState + '<br>Elapsed Time: ' + elapsedTime;

  }
}
  requestAnimationFrame(animate);
}

const container = document.getElementById('divContainer');

function triggerAnimation(state) {
  if (!animateOn) return;

  let currentColumns = window.getComputedStyle(container).gridTemplateColumns.split(' ').length;
  let currentScale = parseFloat(window.getComputedStyle(container).scale);
  let currentRowGap = parseFloat(window.getComputedStyle(container).rowGap);
  let currentColumnGap = parseFloat(window.getComputedStyle(container).columnGap);
  let currentScaleAnimation = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue("--scaleAnimation"));


  let targetColumns = (state.columns / 2);
  let targetScale = state.scale;
  let targetRowGap = state.rowGap;
  let targetColumnGap = state.columnGap;
  let targetScaleAnimation = state.scaleAnimation;
  let increment = 0.5;
  let incementedColumns = currentColumns;
  let incementedScale = currentScale;
  let incementedRowGap = currentRowGap;
  let incementedColumnGap = currentColumnGap;
  let incementedScaleAnimation = currentScaleAnimation;

  if (currentColumns > targetColumns) {
    increment = -0.5;
  }
  // we will use a timer to increment the number of columns
  let aniStartTime;

  function animate() {
    // calculate the time elapsed since the animation began
    const timeElapsed = Date.now() - aniStartTime;
    // calculate the progress of the animation as a value between 0 and 1
    const progress = timeElapsed / state.transitionDuration;
    // if the progress is greater than 1, the animation is complete, so clear the interval
    if (progress > 0.49 && progress < 0.51) {
      document.documentElement.style.setProperty('--scaleAnimation', targetScaleAnimation);
    }
    if (progress >= 1) {
      animating = false;
      animationEndTime = Date.now() - startTime;
      animationDuration = animationEndTime - animationStartTime;
      console.log("actual animationDuration: " + animationDuration);
      console.log("set animationDuration: " + state.transitionDuration)

      lastAnimationEndTime = animationStartTime + animationDuration;
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
    incementedColumns = currentColumns + (targetColumns - currentColumns) * easedProgress;
    incementedScale = currentScale + (targetScale - currentScale) * easedProgress;
    incementedRowGap = currentRowGap + (targetRowGap - currentRowGap) * easedProgress;
    incementedColumnGap = currentColumnGap + (targetColumnGap - currentColumnGap) * easedProgress;
    incementedScaleAnimation = currentScaleAnimation + (targetScaleAnimation - currentScaleAnimation) * easedProgress;
    container.style.gridTemplateColumns = 'repeat(' + Math.round(incementedColumns) + ', 1fr)';
    container.style.rowGap = incementedRowGap + "px";
    container.style.columnGap = incementedColumnGap + "px";
    container.style.scale = incementedScale;
    // 
  }
  // start the animation by setting the start time and starting the interval
  aniStartTime = Date.now();
  timer = setInterval(animate, 1000 / 24);
}



function easeInOutQuad(t) {
  // return t < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  // return t === 0 ? 0 : Math.pow(2, 10 * (t - 1))
  // return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  // return t === 0 ? 0 : t === 1 ? 1 : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2
  // return 1 - Math.sqrt(1 - (t * t))
  // return Math.sqrt(1 - Math.pow(t - 1, 2))
  // nice
  // return t < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  // bounce
  // return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3)
  //  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1
  // return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  // return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  //smoothstep
  return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t

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
slider.max = 500;
slider.min = 1;
slider.value = 100;
slider.step = 0.5;
slider.oninput = function () {
  console.log(this.value);

  document.getElementById("divContainer").style.scale = this.value / 100;
  scale = this.value / 100;

}
var slider2 = document.getElementById("columnsSlider2");
slider2.max = 1000;
slider2.min = 0;
slider2.value = 0;
slider2.step = 0.1;
slider2.oninput = function () {
  console.log(this.value);

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

  document.getElementById("divContainer").style.gridTemplateColumns = 'repeat(' + this.value + ', 1fr)';
  columns = this.value;

}

var slider4 = document.getElementById("columnsSlider4");
slider4.max = 1000;
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
scaleAnimationSlider.max = 100;
scaleAnimationSlider.min = 0;
scaleAnimationSlider.value = 1;
scaleAnimationSlider.step = 0.01;
scaleAnimationSlider.oninput = function () {
  console.log(this.value);

  scaleAnimation = this.value;
  document.documentElement.style.setProperty('--scaleAnimation', this.value);
}

// every 100ms update the sliderInfoDisplay
setInterval(function () {
  sliderInfoDisplay.innerHTML = '{' + '</br>' + 'transitionDuration: 0,</br> TriggerTime: 0, </br> next: 0,</br>' + 'scale: ' + scale + ',' + '</br>' + ' rowGap: ' + rowGap + ',' + '</br>' + ' columnGap: ' + columnGap + ',' + '</br>' + ' columns: ' + columns + '</br>' + 'scaleAnimation: ' + scaleAnimation + '</br>' + '}';
}, 100);




// a button that is a boolean, if true the animation function will run/ plase it in the top of the sliderContainer. it should be darker when on and lighter when off
var animateOn = true;
var animateButton = document.createElement('button');
animateButton.innerHTML = 'Animate is on';
animateButton.style.backgroundColor = 'rgb(255,255,255)';
animateButton.style.color = 'rgb(0,0,0)';
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
startButton.style.position = 'fixed';
// plase it in the top of the #sliderContainer
startButton.style.top = '0';
startButton.style.left = '0';
startButton.style.zIndex = '100';
startButton.style.marginTop = '-100px';

document.getElementById('sliderContainer').appendChild(startButton);
// add an event listener to the button, on click start the process
startButton.addEventListener('click', async function () {
  // convertVideoToSVG('https://nftstorage.link/ipfs/bafybeie4jrftpqz2jhpkfuqtnrowrezm4whrpsnzhw4cmwrwdpli7ytgwa');
  createDivs();
});

createDivs();



// add a toggle button that will hide and show the sliderContainer
var toggleButton = document.createElement('button');
toggleButton.innerHTML = 'Show/Hide';
document.getElementById('sliderContainer').style.display = 'none';
// style the button and plase it in the DOM, plase it in the top right corner
toggleButton.style.position = 'absolute';
// plase it in the top of the #sliderContainer
toggleButton.style.top = '0';
toggleButton.style.left = '0';
toggleButton.style.zIndex = '100';
// apend the button to the body 
document.body.appendChild(toggleButton);
// add an event listener to the button, on click start the process
toggleButton.addEventListener('click', function () {
  if (document.getElementById('sliderContainer').style.display == 'none') {
    document.getElementById('sliderContainer').style.display = 'grid';
  } else {
    document.getElementById('sliderContainer').style.display = 'none';
  }
}
);

// create a div in the top right corner of the screen to display the current state + the elapsed time
let div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = '0';
div.style.right = '0';
div.style.color = 'white';
div.style.padding = '10px';
div.style.backgroundColor = 'rgba(0,0,0,0.5)';
// give it the id 'infoDiv'
div.id = 'infoDiv';
document.body.appendChild(div);








