//SETTING UP A FORM VALIDATION

// First i attach a variable to each HTML element that i want to be able to validate:
const form = document.getElementById("form");
const name1 = document.getElementById("name"); // For some reason 'name' get depricated later in the program. Thats why i added 1 at the end.
const email = document.getElementById("email");
const message = document.getElementById("message");
const errorDiv = document.getElementById("error");
const contactBtn = document.getElementById("inputBtn");
const contactBtnBox = document.getElementById("inputBtnBox");
// const content = document.getElementById('')

//  The eventlistner below will have different outcomes depending on value.
// But the the overall options is a Success or a Error within the input fields. So when CORRECT = Green and when ERROR = red (Simplyfied)
form.addEventListener("submit", (e) => {
  let displayMessage = [];
  let successMessage = [];

  // NAME IF
  if (name1.value === "" || name1.value == null) {
    displayMessage.push("Missing your name.");

    errorDiv.classList.add("errorstyle");
    name1.classList.add("errorStyleInput");
    errorDiv.classList.remove("succesStyle");
  } else {
    name1.classList.add("succesStyleInput");
  }

  // EMAIL IF
  if (email.value === "" || email.value == null || !email.value.includes("@")) {
    displayMessage.push("Missing Email and/or '@'.");
    errorDiv.classList.add("errorstyle");
    email.classList.add("errorStyleInput");
    errorDiv.classList.remove("succesStyle");
  } else {
    email.classList.add("succesStyleInput");
  }

  // MESSAGE IF
  if (message.value === "" || message.value == null) {
    displayMessage.push("Missing a message.");
    errorDiv.classList.add("errorstyle");
    message.classList.add("errorStyleInput");
    errorDiv.classList.remove("succesStyle"); // Remove the green that stayed if user first write a correct input, but later change it to something incorrect.
  } else {
    message.classList.add("succesStyleInput");
  }

  //USER MESSAGE IF
  if (displayMessage.length > 0) {
    e.preventDefault();
    errorDiv.innerText = displayMessage.join("\n");
  }
  if (displayMessage.length == 0) {
    e.preventDefault();
    errorDiv.classList.add("succesStyle");

    successMessage.push("Email sent!");
    errorDiv.innerText = successMessage;
  }

  e.preventDefault(); //Stopping the message from getting sent.
});

// Adding a animation for the klick of submit. So when Submit is klicked, the button will flash green to give a sense of feedback.
contactBtn.addEventListener("click", clicked);

function clicked() {
  contactBtn.classList.add("submitClick");
  contactBtnBox.classList.add("submitClick");
}

// ANIMATION FOR ABOUT TEXT
// While scanning the internet for a JS solution to make a animation load when in viewport i ran into this
// 'intersection observer'. After doing some research, i concoluded that this is most likly what i was
// looking for in order to fix this issue.
//

// useing a built-in constructor function in JavaScript called "intersectionObserver"
// the observer will then use the callback function when it detects a change in "veiwport/display"
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const aboutText = entry.target.querySelector(".about-textbox");
    console.log(entry);
    if (entry.isIntersecting) {
      aboutText.classList.add("about-animation");
      return;
    }
    aboutText.classList.remove("about-animation");
  });
});
observer.observe(document.querySelector(".about"));

// DARKMODE
// This darkmode will feature both a Switch btn to change the theme. but also a setInterval that will automaticly
// change the theme dependning of the current time. This feature will also take check if the theme was changed
// manually, if so -> it wont change based on time for this session.

const html = document.getElementById("web-page");

//This variable (onOff) will decide if the outcome of timeChanger function will apply or not.
//So if its 'on', the program will let the timeChanger decide appropriate theme depending on time of day.
//If its 'off' that means that the user has made a preference and this should not be overruled regardless of on time.
let onOff = "on";
// I've set a 'setInterval" to check the current time once per minute. This might be overkill, and perhaps use more data
// than wanted. In that case, just turn it up to say every fifth or 10th minute.
//In my head this website i fairly "light"(?) so doing this should be fine - data wise
setInterval(timeChanger, 60000);

function changeTheme() {
  onOff = "off";
  // So main function. onklick, If HTML element does not contain the class Darkmode, add it and swap the icons. And reverse if i does contain darkmode.
  if (!html.classList.contains("darkmode")) {
    html.classList.add("darkmode");
    document.getElementById("moon-icon").classList.remove("bx-moon");
    document.getElementById("moon-icon").classList.add("bx-sun");
  } else {
    html.classList.remove("darkmode");
    document.getElementById("moon-icon").classList.remove("bx-sun");
    document.getElementById("moon-icon").classList.add("bx-moon");
  }
}

// This next part is basicly the same thing as above, but this time i use the setInterval from above in order to decide the theme.

function timeChanger() {
  let time = new Date().getHours(); // via 'new Date' ill pick out todays date, and further check the current hour.
  console.log(time);
  console.log("timeChanger is ..." + onOff);

  //The first IF will check if the onOff is 'on'. If its 'off', it means the user has made a preference and the rest of this
  // function should be ignored. If its still left at 'on' - lets go to the next if.
  if (onOff == "on") {
    if (time >= 6 && time < 17) {
      // check the current time, after 6 in the morning, and before 18 at evening.

      html.classList.remove("darkmode");
      document.getElementById("moon-icon").classList.remove("bx-sun");
      document.getElementById("moon-icon").classList.add("bx-moon");
    } else {
      html.classList.add("darkmode");
      document.getElementById("moon-icon").classList.remove("bx-moon");
      document.getElementById("moon-icon").classList.add("bx-sun");
    }
  }
}
