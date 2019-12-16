const STORE = [
  {
    question: 'Texting or tweeting while driving slows your reaction time by ____, which is more than drinking or smoking pot.',
    answers: [
      '15%',
      '24%',
      '38%',
      '47%'
    ],
    correct: '38%'
  },
  {
    question: '45% of people feel _____________ when not able to access their social networks.',
    answers: [
      'Relieved',
      'Worried and uncomfortable',
      'Happy',
      'Confused'
    ],
    correct: 'Worried and uncomfortable'
  },
  {
    question: '66% of people have difficulty __________ after using social media.',
    answers: [
      'Sleeping',
      'Socializing',
      'Refocusing',
      'Making relationships'
    ],
    correct: 'Sleeping'
  },
  {
    question: '______ have accepted a friend request from a stranger.',
    answers: [
      '19%',
      '32%',
      '47%',
      '64%'
    ],
    correct: '64%'
  },
  {
    question: 'The average daily time spent on social media is _________.',
    answers: [
      '62 minutes',
      '93 minutes',
      '142 minutes',
      '220 minutes'
    ],
    correct: '142 minutes'
  },
  {
    question: 'Results from a study from the University of Pittsburgh School of Medicine showed that the more time young adults spent on social media, the more likely they were to ____________.',
    answers: [
      'Build relationships outside of their normal circles',
      'Be more active and live a healthy lifestyle',
      'Have problems sleeping and report symptoms of depression',
      'Increase conginitive ability'
    ],
    correct: 'Have problems sleeping and report symptoms of depression'
  },
  {
    question: 'On average, people have _____ social media accounts.',
    answers: [
      '2',
      '3',
      '5',
      '7'
    ],
    correct: '7'
  },
  {
    question: 'When asked, ______ of teenagers felt social media has a positive effect on their lives.',
    answers: [
      '24%',
      '45%',
      '58%',
      '81%'
    ],
    correct: '81%'
  }, 
  {
    question: '______ of Facebook users check it every day.',
    answers: [
      '45%',
      '59%',
      '74%',
      '82%'
    ],
    correct: '74%'
  },
  {
    question: 'There are __________ active social media accounts.',
    answers: [
      '1.4 billion',
      '2.4 billion',
      '3.5 billion',
      '4.6 billion'
    ],
    correct: '3.5 billion'
  }
];

//setting variables for score count and question count
let currentQuestion = 0;
let score = 0;
$('.questions').hide();
$('.response').hide();
$('.finish').hide();

//increase score count
function updateScore() {
  score++
  $('.scoreCount').text(score);
}

//increase question count
function updateQuestion() {
  currentQuestion++;
  $('.questionCount').text(currentQuestion + 1);
}

//initiates the start button and begins Quiz
function beginQuiz() {
  $('.mainContainer').on('click', '.startButton', function (event) {
    $('.firstPhase').hide();
    $('.questions').show();
    $('.questions').prepend(createQuestionForm(currentQuestion));
    $('.questionCount').text(1);
  });
}

//generates questions and answers to Quiz
function createQuestionForm(itemIndex) {
  let questionForm =  $(`
  <form class="questionForm">  
    <fieldset class="fieldset">
      <legend class="questionText">${STORE[itemIndex].question}</legend>
    </fieldset><br><br>
    `);

  $('.questions').append(questionForm);
 
  //creating a div outside of the question to attach answers and submit button
  const answerDiv = document.createElement('div');
  answerDiv.setAttribute('class', 'answers');

  $('.fieldset').append(answerDiv);

  for (let i=0; i<STORE[itemIndex].answers.length; i++) {
    let questionChoice = $(`
    <label class="answerText" for="r${[i]}">
      <input type="radio" name="choices" value="${STORE[itemIndex].answers[i]}" 
      id="r${[i]}" required />
      <span>${STORE[itemIndex].answers[i]}</span><br>
    </label><br>`);
    $('.answers').append(questionChoice);
  }
  
  let submitButton = $(`<br><button class="submitButton" type="button">Submit</button></form>`);
  $(answerDiv).append(submitButton);
  
  submitAnswer();
}

//initiates submit button after an answer is chosen
function submitAnswer() {
  $('.mainContainer').one('click', '.submitButton', function (event) {
    $('.questions').hide();
    $('.firstPhase').hide();
    $('.response').show();

    let currentSelection = $('input:checked');
    let answer = $(currentSelection).val();
    let correct = STORE[currentQuestion].correct;

    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }

    $('.questionForm').remove();
  });
  generateNextQuestion();
}

//response if the answer is correct
function correctAnswer() {
  $('.response').html(`
    <h3>You got the answer correct!</h3><br>
    <img src="images/thumbs-up.png" alt="facebook thumbs up"><br>
    <button type="button" class="nextButton">Next</button>`
  );
  updateScore();
}

//response when the answer is wrong with correct answer
function wrongAnswer() {
  $('.response').html(`
    <h3>Oh no! You got it wrong!</h3><br>
    <img src="images/thumbs-down.png" alt="facebook thumbs down"><br>
    <p>The correct answer is: <br>${STORE[currentQuestion].correct}</p><br>
    <button type="button" class="nextButton">Next</button>`
  );
}

//determines and outputs the score
function outputScore() {
  const bad = [
    "Maybe not your best work. On the bright side, you can retake it!",
    "Aww, don't be sad. You can do this!",
    "images/sad.png",
    "sad emoji face"
  ]

  const average = [
    "You're definitely smarter than you look. Good job!",
    "Go DM someone or post this later",
    "images/neutral.png",
    "neutral emoji face"
  ]

  const great = [
    "Wow, maybe it's time to start investing in Facebook stock. You know so much!",
    "You must have at least 40 followers",
    "images/happy.png",
    "happy emoji face"
  ]

  if (score >= 7) {
    array = great;
  } else if (score >= 4 && score < 7 ) {
    array = average;
  } else {
    array = bad;
  }

  $('.finish').html(`
    <h2>You scored a ${score} out of 10!</h2><br>
    <h3>${array[0]}</h3><br>
    <h4>${array[1]}</h4><br>
    <img src="${array[2]}" alt="${array[3]}">
    <br>
    <button type="button" class="restartButton">Restart Quiz</button>
  `);

  restartQuiz();
}

//determine if the final score should be calculated
function determineQuestion() {
  if (currentQuestion < STORE.length) {
    return createQuestionForm(currentQuestion);
  } else {
    $('.questions').hide();
    $('.finish').show();
    $('.counters').hide();
    return outputScore();
  }
}

//generates next set of questions in quiz sequence
function generateNextQuestion() {
  $('.mainContainer').one('click', '.nextButton', function (event) {
    $('.firstPhase').hide();
    $('.response').hide();
    updateQuestion();
    $('.questions').show();
    determineQuestion();
  });
}

//starts the entire quiz sequence over
function restartQuiz() {
  $('.mainContainer').on('click', '.restartButton', function (event) {
    location.reload();
    });
}

beginQuiz();