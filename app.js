const introductionDiv = document.getElementById("introduction-page");
const questionDiv = document.getElementById("question-page");
const question1 = document.getElementById("question-div");
const option1Div = document.getElementById("option1");
const option2Div = document.getElementById("option2");
const option3Div = document.getElementById("option3");
const option4Div = document.getElementById("option4");
const resultDiv = document.getElementById("result-page");
const previousButton = document.getElementById("previous");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
let radios = document.getElementsByName("flexRadioDefault");
const scoreDiv = document.getElementById("scoreDivSpan");
let username = document.getElementById("username");
let password = document.getElementById("password");

//data variable is an array which contains objects of respective questions in quiz along with options and correct answer index of the same question.
const data = [
  {
    q: "In which year did Maradona scored goal with 'Hand of God'?",
    answer: [1986, 1980, 1990, 1982],
    correctIndex: 1,
  },
  {
    q: "How matches did Mohammed Ali lose in his career?",
    answer: [1, 2, 3, 4],
    correctIndex: 1,
  },
  {
    q: "Which car won Fernando Alonso his first title in Formula 1 with?",
    answer: ["Ferarri", "Alfa Romeo", "Mercedes AMG", "Renault"],
    correctIndex: 4,
  },
  {
    q: "Which country operationalized world’s largest radio telescope?",
    answer: ["India", "France", "United States of America", "Russia"],
    correctIndex: 3,
  },
  {
    q: "Which one among the following radiations carries maximum energy?",
    answer: ["Ultra-voilet", "Gamma", "X-Ray", "Infra-red"],
    correctIndex: 2,
  },
  {
    q: "The head quarters of world trade organization is in?",
    answer: ["Montreal", "Seattle", "Geneva", "The Hague"],
    correctIndex: 3,
  },
  {
    q: "The Second Indian Satellite launched from Soviet Union was?",
    answer: ["Rohini", "Aryabhata", "Bhaskar-1", "Apsara"],
    correctIndex: 3,
  },
  {
    q: "The metal whose salts are sensitive to light is?",
    answer: ["Silver", "Zinc", "Copper", "Gold"],
    correctIndex: 1,
  },
  {
    q: "Who is the father of geometry?",
    answer: ["Aristotle", "Euclid", "Pythagoras", "Kepler"],
    correctIndex: 2,
  },
  {
    q: "In which field is the B.C. Roy Award given?",
    answer: ["Medicine", "Journalism", "Music", "Environment"],
    correctIndex: 1,
  },
];

// answersByUsers array is of length of number of questions and is completely filled with 0. (filling zero is not necessary, i did it because i was trying different approaches.)
let answersByUsers = Array(data.length - 1).fill(0);

//Question that is currently displayed on the screen
let currentQuestion = 0;

// functions that are used in this project starts here


//this function is evoked on pressing the start button on intro screen
function startTest() {
  if (!validateEmail(username.value) || password.value == "") {
    alert("Enter correct credentials!!");
  } else {
    unchecked();
    introductionDiv.remove();
    document.getElementById("timer").style.display = "block";
    displayQuestions();
  }
}

//this function decides which button would be displayed on bottom of the questions according to the question number. Also question data is being put to screen here.
function displayQuestions() {
  if (currentQuestion == data.length - 1) {
    submitButton.style.visibility = "visible";
    nextButton.style.visibility = "hidden";
  } else {
    submitButton.style.visibility = "hidden";
    nextButton.style.visibility = "visible";
  }
  if (currentQuestion > 0) {
    previousButton.style.visibility = "visible";
  } else {
    previousButton.style.visibility = "hidden";
  }
  questionDiv.style.display = "block";
  question1.innerHTML = data[currentQuestion].q;
  option1Div.innerHTML = data[currentQuestion].answer[0];
  option2Div.innerHTML = data[currentQuestion].answer[1];
  option3Div.innerHTML = data[currentQuestion].answer[2];
  option4Div.innerHTML = data[currentQuestion].answer[3];

  if(currentQuestion != data.length - 1 && answersByUsers[currentQuestion]>0){
    nextButton.disabled=false;
  }else{
    nextButton.disabled = true;
  }
  
}

//nextQuestion displays the next question
function nextQuestion() {
  currentQuestion++;
  if(answersByUsers[currentQuestion]>0){
    var select = 'option'+answersByUsers[currentQuestion]+'Div';
    document.getElementById(select).checked=true;
  }
  else{
    unchecked();
  }
  displayQuestions();
}

//previousQuestion takes you to previous question
function previousQuestion() {
  // answersByUsers.pop();
  currentQuestion--;
  var select = 'option'+answersByUsers[currentQuestion]+'Div';
  document.getElementById(select).checked=true;
  displayQuestions();
}

//this is evoked on pressing the submit button
function submitTest() {
  questionDiv.remove();
  resultDiv.style.display = "block";
  var result = 0;
  for (var i = 0; i < data.length; i++) {
    if (answersByUsers[i] == data[i].correctIndex) {
      result++;
    }
  }
  scoreDiv.innerHTML = result + " out of " + data.length;
}

//it marks all the radios as unchecked
function unchecked() {
  document.getElementById("option1Div").checked = false;
  document.getElementById("option2Div").checked = false;
  document.getElementById("option3Div").checked = false;
  document.getElementById("option4Div").checked = false;
}

//it enables the next button under the question on selecting the any given answer.
function check() {
  var flag = 0;
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) flag = 1;
  }
  if (flag == 1) nextButton.disabled = false;

  for (var radio of radios) {
    if (radio.checked) {
      answersByUsers[currentQuestion] = radio.value;
    }
  }
}

//this is timer function manages the timer data
function timer(distance) {
  var x = setInterval(function () {
    distance -= 1000;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer-body").innerHTML =
      minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(x);
      submitTest();
    }
  }, 1000);
}

//this validates if the given email is valid
function validateEmail(emailID) {
  atpos = emailID.indexOf("@");
  dotpos = emailID.lastIndexOf(".");
  if (atpos < 1 || dotpos - atpos < 2) {
    return false;
  }
  return true;
}

function reload() {
  window.location.reload();
}

// Java to khamkha badnaam hai, asli dard to JavaScript deti hai
