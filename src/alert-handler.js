let bg = document.getElementById('bg');
let content = document.getElementById('content');





function blinkStart() {
   bg.classList.add('blink');
};
function blinkStop() {
   bg.classList.remove('blink');
}


document.addEventListener('DOMContentLoaded', function() {
   if (localStorage.getItem('harshness') == "1") {
      content.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="max-w-md mx-auto bg-white border-2 border-black rounded-lg py-8 px-10">
          <h1 class="text-2xl font-bold mb-6">Hey, it's important to prioritize your studies right now. Remember the goals you've set for yourself and the value of education. Investing time in studying will help you succeed and reach your full potential. So, let's get back to studying and make progress toward your academic goals.
          </h1>
          <button onclick="window.close()" id="close"class="bg-red-600 text-white py-3 px-6 rounded-full inline-block font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-red-600 hover:border-red-600 border-2 border-red-600">Okay</button>
        </div>
      </div>
      `
      blinkStart()
   } else if (localStorage.getItem('harshness') == "2") {
      content.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="max-w-md mx-auto bg-white border-2 border-black rounded-lg py-8 px-10">
          <h1 class="text-2xl font-bold mb-6">Look, I've had enough of your procrastination. You need to stop messing around and get your sorry self back to studying. Time is ticking, and your grades won't improve magically. It's time to buckle down, set aside the distractions, and put in the hard work required to succeed. Quit making excuses and get your lazy ass back to studying before you regret it.
          </h1>
          <button onclick="window.close()" id="close"class="bg-red-600 text-white py-3 px-6 rounded-full inline-block font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-red-600 hover:border-red-600 border-2 border-red-600">Okay</button>
        </div>
      </div>
      `
      blinkStart()
   } else if (localStorage.getItem('harshness') == "3") {
      content.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="max-w-md mx-auto bg-white border-2 border-black rounded-lg py-8 px-10">
          <h1 class="text-2xl font-bold mb-6">Hey, you lazy piece of shit! Stop wasting your fucking time and get your ass back to studying, you pathetic excuse for a student! Quit being such a lazy bitch and start putting in some effort. You're just going to fail if you keep slacking off like this. So get off your ass and do some fucking studying!
          </h1>
          <button onclick="window.close()" id="close"class="bg-red-600 text-white py-3 px-6 rounded-full inline-block font-semibold transition duration-300 ease-in-out hover:bg-white hover:text-red-600 hover:border-red-600 border-2 border-red-600">Okay</button>
        </div>
      </div>
      `
      blinkStart()
   } else {
      console.log('Invalid harshness level found in Local Storage');
   }






})
