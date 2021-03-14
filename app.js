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

const data = [
  {
    q: "who is lushly?",
    answer: [1, "helo", 3, 4],
    correctIndex: 3,
  },
  {
    q: "who is modi?",
    answer: [1, 2, 3, 4],
    correctIndex: 3,
  },
  {
    q: "who is mota?",
    answer: [1, 2, 3, 4],
    correctIndex: 3,
  },
];

// answers
let answersByUsers = Array(2).fill(0);

//-----------------------------------

let currentQuestion = 0;
// functions
function startTest() {
  unchecked();
  introductionDiv.remove();
  document.getElementById("timer").style.display = "block";
  displayQuestions();
}

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
  nextButton.disabled = true;
}

function nextQuestion() {
  currentQuestion++;
  unchecked();
  displayQuestions();
}

function previousQuestion() {
  answersByUsers.pop();
  currentQuestion--;
  unchecked();
  displayQuestions();
}

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

function unchecked() {
  document.getElementById("option1Div").checked = false;
  document.getElementById("option2Div").checked = false;
  document.getElementById("option3Div").checked = false;
  document.getElementById("option4Div").checked = false;
}

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

function timer(distance){
  var x = setInterval(function() {
      distance -=1000; 
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("timer-body").innerHTML = minutes + "m " + seconds + "s "; 
      if (distance < 0) {
        clearInterval(x);
        submitTest();
      }
    }, 1000);
}