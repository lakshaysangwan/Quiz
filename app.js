const introduction = document.getElementById('start-page');
const questions = document.getElementById('question-page');
const ending = document.getElementById('result-page');
const username = document.getElementById('username');
const password = document.getElementById('password');

function start(){
  alert('Fill any valid email in username and password');
  
}

function checkMailAndPassword(){
  if(username.value != "" && password.value != ""){
    return true;
  }
}

function displayFirstQuestion(){
  let i = 97;
  for(i=97;i<107;i++){
    var question = String.fromCharCode(i);
    document.getElementById(question).style.display='block';
  }

}

function validateEmail(emailID) {
  atpos = emailID.indexOf("@");
  dotpos = emailID.lastIndexOf(".");
  if (atpos < 1 || ( dotpos - atpos < 2 )) {
    //  alert("Please enter correct email ID");
    //  document.myForm.EMail.focus() ;
     return false;
  }
  return( true );
}

function startTest(){
  if(!checkMailAndPassword() || !validateEmail(username.value)){
    alert('Itna aalas kis baat ka bina credentials ke kon test deta hai');
  }
  else{
    introduction.remove();
    displayFirstQuestion();
  }
}