const sound = require("sound-play");
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
    let main = document.getElementById('main-content');
    let settings = document.getElementById("global-settings");
    let regular = document.getElementById('regular-pva');
    let random = document.getElementById("random-pva")


settings.addEventListener('click', function() {
    main.innerHTML = `
    <div class="flex flex-wrap justify-center h-screen">
        <h1 class="text-4xl font-bold ">Global Settings</h1>
        <div class="container mx-auto p-4">
        <form class="bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2">
            Sound Selection
          </label>
          <div class="relative">
            <select id="sound-choice"
              class="block appearance-none w-full text-gray-600 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="sound" required>
              <option value="" disabled selected>Select a sound</option>
              <option value="alarm">Alarm Clock</option>
              <option value="eas">EAS Alarm</option>
              <option value="ketamine">Unicorn on Ketamine</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M6 8l4 4 4-4z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          
        </div>
        <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="harshness">
              Harshness Level
            </label>
            <div class="flex items-center">
              <input class="mr-2 leading-tight" type="radio" name="harshness" value="1" id="harshness1" required>
              <label class="text-sm" for="harshness1">
                1
              </label>
            </div>
            <div class="flex items-center">
              <input class="mr-2 leading-tight" type="radio" name="harshness" value="2" id="harshness2">
              <label class="text-sm" for="harshness2">
                2
              </label>
            </div>
            <div class="flex items-center">
              <input class="mr-2 leading-tight" type="radio" name="harshness" value="3" id="harshness3">
              <label class="text-sm" for="harshness3">
                3
              </label>
            </div>
          </div>
      </form>
  </div>
  </div>
    `
    const soundChoice = document.getElementById('sound-choice');

// Add event listener to the <select> element
soundChoice.addEventListener('change', function(event) {
  const selectedSound = event.target.value;
  localStorage.setItem('sound', selectedSound);
});

})
    regular.addEventListener('click', function() {
        main.innerHTML = `
        <div class="flex flex-wrap justify-center h-screen">
        <h1 class="text-4xl font-bold ">Regular PVA</h1></ br>
        
        <div class="container mx-auto p-4">
        <form id="form-regular" class="bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="interval">
              Interval (minutes)
            </label>
            <input class="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              id="interval" type="number" min="1" step="1" required>
          </div>
          
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2">
              Sound
            </label>
            <div class="flex items-center">
            <input id="sound-toggle" type="checkbox" class="toggle" checked />

            </div>
          </div>
          <div class="flex items-center justify-between">
            <button id="start"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Start
            </button>
          </div>
        </form>
      </div>
        </div>
        `
        function saveIntervalValue(value) {
            localStorage.setItem("interval", value);
          }
                    document.getElementById("interval").addEventListener("input", function () {
            const intervalValue = this.value;
            saveIntervalValue(intervalValue);
          });
          document.getElementById('start').addEventListener('click', function() {
            event.preventDefault();
            appendCountdown()
          })
const soundToggle = document.getElementById('sound-toggle');
localStorage.setItem('sound-on', true);

// Add event listener to the input element
soundToggle.addEventListener('change', function(event) {
  const isChecked = event.target.checked;
  const soundOnValue = isChecked ? 'true' : 'false';
  localStorage.setItem('sound-on', soundOnValue);
});


let countdownIntervalId; // Declare the countdownIntervalId variable globally
let isPaused = false; // Track whether the countdown is paused or not

function appendCountdown() {
  const interval = localStorage.getItem('interval');
  const totalTime = parseInt(interval) * 60;

  const pauseButton = document.getElementById('pause');
  const clearButton = document.getElementById('clear');
  pauseButton.addEventListener('click', pauseResumeCountdown);
  clearButton.addEventListener('click', clearCountdown);

  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
  }

  const countdownContainer = document.getElementById('countdown-container');
  countdownContainer.innerHTML = '';
  const countdownElement = document.createElement('div');
  countdownElement.className = 'countdown font-mono text-2xl p-5';
  countdownContainer.appendChild(countdownElement);

  let remainingTime = totalTime;
  countdownIntervalId = setInterval(() => {
    if (!isPaused) {
      remainingTime--;
      const remainingMinutes = Math.floor(remainingTime / 60);
      const remainingSeconds = remainingTime % 60;
      countdownElement.innerHTML = `
        <span style="--value:${remainingMinutes};"></span>m
        <span style="--value:${remainingSeconds};"></span>s
      `;
      if (remainingTime <= 0) {
        clearInterval(countdownIntervalId);
        timerDone();
        appendCountdown(); // Re-run the countdown
      }
    }
  }, 1000);
}

function clearCountdown() {
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
  }
  const countdownContainer = document.getElementById('countdown-container');
  countdownContainer.innerHTML = '';
}

function pauseResumeCountdown() {
  isPaused = !isPaused;
  const pauseButton = document.getElementById('pause');
  if (isPaused) {
    pauseButton.innerHTML = 'Resume';
  } else {
    pauseButton.innerHTML = 'Pause';
  }
}

let harshness1 = document.getElementById('harshness1');
let harshness2 = document.getElementById('harshness2');
let harshness3 = document.getElementById('harshness3');

harshness1.addEventListener('input', function() {
    localStorage.setItem('harshness', '1');
})
harshness2.addEventListener('input', function() {
    localStorage.setItem('harshness', '2');
})
harshness3.addEventListener('input', function() {
    localStorage.setItem('harshness', '3');
})

const form = document.getElementById('form-regular');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  appendCountdown();
});

function timerDone() {
  if (localStorage.getItem('sound') == 'eas' && localStorage.getItem('sound-on') == 'true') {
    sound.play('sounds/eas.mp3');
    ipcRenderer.send('open-alerts')
  } else if (localStorage.getItem('sound') == 'alarm' && localStorage.getItem('sound-on') == 'true') {
    sound.play('sounds/alarm.mp3');
    ipcRenderer.send('open-alerts')
  } else if (localStorage.getItem('sound') == 'ketamine' && localStorage.getItem('sound-on') == 'true') {
    sound.play('sounds/ketamine.mp3');
    ipcRenderer.send('open-alerts')
  } else {
    console.log('Invalid or no sound value');
    ipcRenderer.send('open-alerts')
  }

// remove later, instead check harshness from alerts.html and display accordingly

  if (localStorage.getItem('harshness') == "1") {
    sound.play('sounds/harshness1');
} else if (localStorage.getItem('harshness') == "2") {
    sound.play('sounds/harshness2');
} else if (localStorage.getItem('harshness') == "3") {
    sound.play('sounds/harshness3');
} else {
    console.log('invalid or no harshness level selected')
}
}


    
})
random.addEventListener('click', function() {
  /*
    main.innerHTML = `
    <div class="flex flex-wrap justify-center h-screen">
    <h1 class="text-4xl font-bold ">Random PVA</h1><br>
    <div class="container mx-auto p-4">
    <form id="form-regular" class="bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
    
  <div class="mb-4">
    <label id="interval-min-label" class="block text-white text-sm font-bold mb-2" for="interval-min">
      Minimum Interval (min): <span id="interval-min-value"></span>
    </label>
    <input type="range" id="interval-min" name="interval-min" class="range w-full h-3 appearance-none rounded-lg"
      min="1" max="59" step="1" required>

      <label id="interval-max-label" class="block text-white text-sm font-bold mb-2" for="interval-max">
      Maximum Interval (min): <span id="interval-max-value"></span>
    </label>
    <input type="range" id="interval-max" name="interval-max" class="range w-full h-3 appearance-none rounded-lg"
      min="1" max="59" step="1" required>
  </div>

  <button id="start-random"class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit">
    Start
  </button>
</form>

    </div>
    `*/
    main.innerHTML = `
    <div class="w-3/4 bg-gray-450 p-4" id="main-content">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Hang in there!</h1>
            <p class="py-6">This feature is still in development.</p>
          </div>
      </div>
    </div>
    `
    const intervalMinInput = document.getElementById('interval-min');
  const intervalMinValue = document.getElementById('interval-min-value');
  const intervalMaxInput = document.getElementById('interval-max');
  const intervalMaxValue = document.getElementById('interval-max-value');

  intervalMinInput.addEventListener('input', () => {
    intervalMinValue.innerText = intervalMinInput.value;
    localStorage.setItem('intervalMin', intervalMinInput.value)
  });
  intervalMaxInput.addEventListener('input', () => {
    intervalMaxValue.innerText = intervalMaxInput.value;
    localStorage.setItem('intervalMax', intervalMaxInput.value)

  });
  let harshness1 = document.getElementById('harshness1');
let harshness2 = document.getElementById('harshness2');
let harshness3 = document.getElementById('harshness3');

harshness1.addEventListener('input', function() {
    localStorage.setItem('harshness', '1');
})
harshness2.addEventListener('input', function() {
    localStorage.setItem('harshness', '2');
})
harshness3.addEventListener('input', function() {
    localStorage.setItem('harshness', '3');
})
  document.getElementById('start-random').addEventListener('click', (event) => {
    if (parseInt(intervalMinInput.value) > parseInt(intervalMaxInput.value)) {
      event.preventDefault();
      alert('Minimum interval cannot be greater than the maximum interval.');
    }
  });
})
});
console.log('preload.js is working fine probably')