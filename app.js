const introduction = document.getElementById('start-page');
const questions = document.getElementById('question-page');
const ending = document.getElementById('result-page');
function start(){
  alert('Fill anything in username and password');
}

function startTest(){
  introduction.remove();
  questions.style.visibility='visible';
}