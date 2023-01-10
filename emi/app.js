
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
        var div = document.createElement('div');
        div.style.width = '12px';
        div.style.height = '12px';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.animationDelay = j * i + 'ms';
        div.style.animationName = 'scale-animation';
        div.style.animationDuration = '2s';
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
      updateDivs();
      updateDivs(); // Start the loop after two seconds
      document.body.appendChild(canvas);
    };
    video.onerror = reject;
    function startVideo() {
      video.loop = false;
      video.play();
      //schedule the first animation transition
      timer = setTimeout(updateAnimation, animationStates[currentState].duration);
    }
    startVideo();


  });
}

// testing 
let animationStates = [
  {
    columns: 44,
    duration: 10800,
    next: 1
  },
  {
    columns: 55,
    duration: 6000,
    next: 2
  },
  {
    columns: 66,
    duration: 10800,
    next: 3
  },
  {
    columns: 77,
    duration: 6000,
    next: 4
  },
  {
    columns: 88,
    duration: 10800,
    next: 5
  },
  {
    columns: 99,
    duration: 6000,
    next: 6
  },
  {
    columns: 110,
    duration: 10800,
    next: 7
  },
  {
    columns: 121,
    duration: 6000,
    next: 8
  },
  {
    columns: 132,
    duration: 10800,
    next: 9
  },
  {
    columns: 143,
    duration: 6000,
    next: 0
  }
];

let currentState = 0;
let transitionDuration = 2;
let timer;

function updateAnimation() {
  // update the number of columns and schedule the next animation
  gsap.to(divContainer, {
    duration: transitionDuration,
    onUpdate: function () {
      divContainer.style.setProperty('--columns', `repeat(${animationStates[currentState].columns}, 1fr)`);
      document.getElementById("divContainer").style.marginLeft = (44 - animationStates[currentState].columns) * 12 + "px";
      // while the value is 44 or less and decreasing, div should move up by 12px for each column
      if (animationStates[currentState].columns <= 44) {
        document.getElementById("divContainer").style.marginTop = (44 - animationStates[currentState].columns) * -24 + "px";
      }
    },
    onComplete: function () {
      currentState = animationStates[currentState].next;
      timer = setTimeout(updateAnimation, animationStates[currentState].duration);
    }
  });
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


// creata a button that will start the process
var button = document.createElement('button');
button.innerHTML = 'Start';
// style the button and plase it in the DOM, plase it in the top right corner
button.style.position = 'absolute';
button.style.top = '0';
button.style.right = '0';
button.style.zIndex = '100';
document.body.appendChild(button);
// add an event listener to the button, on click start the process
button.addEventListener('click', async function () {
  convertVideoToSVG('https://nftstorage.link/ipfs/bafybeie4jrftpqz2jhpkfuqtnrowrezm4whrpsnzhw4cmwrwdpli7ytgwa');
});

// var slider = document.getElementById("columnsSlider");
// // Update the grid when the slider value changes
// // make it a log scale from 0 to 4096
// slider.max = 4096;
// slider.min = 0;
// slider.value = 44;
// slider.step = 11;

// slider.oninput = function () {
//   console.log(this.value);
//   if (this.value == 0) {
//     this.value = 1;
//   }
//   document.getElementById("divContainer").style.gridTemplateColumns = "repeat(" + this.value + ", 1fr)";
//   // move the div left as the number of columns increases to keep the grid centered in the window: when the number of columns is 1, the grid is centered, when the number of columns is higher then 44 it starts to grow to the right until then it should move slightly to the left. after 44 is should move by the width of a column
//   document.getElementById("divContainer").style.marginLeft = (44 - this.value) * 12 + "px";
//   // while the value is 44 or less and decreasing, div should move up by 12px for each column
//   if (this.value <= 44) {
//     document.getElementById("divContainer").style.marginTop = (44 - this.value) * -24 + "px";
//   }
// } 