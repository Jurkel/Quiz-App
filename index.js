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

function updateScore() {
  //increase score count
  score++
  $('.scoreCount').text(score);
}

function updateQuestion() {
  //increase question count
  currentQuestion++;
  $('.questionCount').text(currentQuestion + 1);
}

function determineQuestion() {
  //determine if the final score should be calculated
  if (currentQuestion < STORE.length) {
    return createQuestionForm(currentQuestion);
  } else {
    $('.questions').hide();
    $('.questionCount').text(10);
  }
}

function beginQuiz() {
  //initiates the start button and begins Quiz
  $('.mainContainer').on('click', '.startButton', function(event) {
    $('.firstPhase').hide();
    console.log('beginQuiz is on');
    $('.questions').show();
    $('.questions').prepend(createQuestionForm(currentQuestion));
    $('.questionCount').text(1);
  });
}

function createQuestionForm(itemIndex) {
  //generates questions and answers to Quiz
  //console.log("question >>> " + STORE[itemIndex].question);
  let questionForm =  $(`
  <form>  
    <fieldset>
      <legend class="questionText">${STORE[itemIndex].question}</legend>
    </fieldset>
    `)

  let fieldSelect = $('questionForm').find('fieldset');
  console.log("field select >>> " + fieldSelect);

  // STORE[itemIndex].answers.forEach(function(itemAnswer, newIndex) {
  //   $(`<label class="answerText" for="${newIndex}">
  //       <input class="radio" type="radio" value="${itemAnswer}" name="answer" required>
  //       <span>${itemAnswer}</span>
  //     </label>`)
  
  for (let i=0; i<STORE[itemIndex].answers.length; i++) {
    let questionChoice = $(`
    <label class="answerText" for="${STORE[itemIndex].answers.indexOf}">
      <input type="radio" name="choices" value="${STORE[itemIndex].answers[i]}" id="${STORE[itemIndex].answers.indexOf}" required>
      <span>${STORE[itemIndex].answers[i]}</span>
    </label>`);
    $('.questions').prepend(questionChoice);
  }
  
  console.log('createQuestionForm is on');
  

  let submitButton = $(`<button class="startButton" type="button">Submit</button></form>`);

  $(submitButton).prepend('.questions');

  return questionForm;
}

function correctAnswer() {
  //response if the answer is correct
  $('.response').html(`
    <h3>You got the answer correct!</h3>
    <button type="button" class="nextButton">Next</button>`
  );
  updateScore();
}

function wrongAnswer() {
  //response when the answer is wrong with correct answer
  $('.response').html(`
    <h3>Oh no! You got it wrong!</h3>
    <p>The correct answer is ${STORE[currentQuestion].correct}</p>
    <button type="button" class="nextButton">Next</button>`
  );
}

function submitAnswer() {
  //initiates submit button after an answer is chosen
  $('.mainContainer').on('click', '.startButton', function(event) {
    event.preventDefault();
    $('firstPhase').hide();
    
    console.log('submitAnswer is on');

    let currentSelection = $('input:checked');
    let answer = currentSelection.val();
    let correct = STORE[currentQuestion].correct;

    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

function generateNextQuestion() {
  //generates next set of questions in quiz sequence
  $('.mainContainer').on('click', '.nextButton', function(event) {
    $('.firstPhase').hide();
    
    console.log('generateNextQuestion is on');

    updateQuestion();
  });
}

function restartQuiz() {
  //starts the entire quiz sequence over
  let score = 0;
  let currentQuestion = 0;
  $('.scoreCount').text(0);
  $('.currentQuestion').text(0);
  
  console.log('restartQuiz is on');
}

function handleQuiz() {
  beginQuiz();
  createQuestionForm();
  submitAnswer();
  generateNextQuestion()
  restartQuiz();
}

handleQuiz();