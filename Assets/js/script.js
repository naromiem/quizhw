var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    
  ];
  
  // define all HTML elements;
  var currentQuestionIndex = 0;
  var time = questions.length * 5;
  var timerId;

  var timeEl= document.getElementById('time');
  var introEl = document.getElementById('start-screen');
  var startBtnEl = document.getElementById('start');
  var questionsEl = document.getElementById('questions');
  var questionsTitleEl = document.getElementById('question-title');
  var choicesEl = document.getElementById('choices');
  var endScreenEl = document.getElementById('end-screen');
  var finalScoreEl = document.getElementById('final-score');
  var initialsEl = document.getElementById('initials');
  var submitEl = document.getElementById('submit'); 
  var feedbackEl = document.getElementById('feedback');

  function startQuiz() {
    introEl.setAttribute('class', 'hide');
    questionsEl.removeAttribute('class');
    timerId = setInterval(startTime, 1000);
    timeEl.textContent = time;

    getQuestion()



  }

  function getQuestion() {
    var currentQuestion= questions[currentQuestionIndex];
    questionsTitleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {

      var btn = document.createElement("button");
      btn.setAttribute("class", "choice");
      btn.setAttribute("value", choice);

      btn.textContent = index + 1 + ". " + choice;
      btn.onclick= checkAnswer;
      choicesEl.appendChild(btn);
    

    })
      
  }

  function startTime(){
    time--;
    timeEl.textContent = time;
    if(time <=0){
      endQuiz();
    }
  }

  function checkAnswer(){
    if(this.value !== questions[currentQuestionIndex].answer){
      time -= 2;
      if(time < 0){
        time = 0;
      }

      timeEl.textContent =  time;
      feedbackEl.textContent = 'Wrong Answer!';
    } else {
      feedbackEl.textContent = 'Correct Answer';
    }


    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function(){
      feedbackEl.setAttribute('class', 'feedback hide')
    }, 1000)

    
    currentQuestionIndex++;
    if(currentQuestionIndex === questions.length){
      endQuiz();
    } else {
      getQuestion();
    }
    

  }

function endQuiz() {
  clearInterval(timerId);
  endScreenEl.removeAttribute('class');
  finalScoreEl.textContent = time;
  questionsEl.setAttribute('class', 'hide');


}


function getInitials() {
  var name = initialsEl.value.trim();
  localStorage.setItem('highscore', JSON.stringify({
    initial: name,
    score: time
  }))
}

  startBtnEl.onclick = startQuiz;
  submitEl.onclick = getInitials;
