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
]

//setting variables for score count and question count
let currentQuestion = 0;
let score = 0;

function beginQuiz() {
  //initiates the start button and begins Quiz
  $('.mainBox').on('click', '.startButton', function(event) {
    generateQuestion();
  });
  console.log('beginQuiz is on');
}

function generateQuestion(itemIndex) {
  //generates questions and answers to Quiz
  let questionForm =  $(`
  <form>  
    <fieldset>
      <legend class="questionText">${STORE[itemIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelect = $('questionForm').find('fieldset');

  STORE[itemIndex].answers.forEach(function(itemAnswer, itemIndex) {
    $(`<label class="answerText" for="${item.index}">
        <input class="radio" type="radio" value="${itemAnswer}" name="answer" required>
        <span>${itemAnswer}</span>
      </label>`).appendTo(fieldSelect);
  });

  let submitButton = $(`<button class="submitButton" type="submit">Submit</button>`);

  $('submitButton').appendTo('fieldSelect');

  console.log('generateQuestion is on');
}

function correctAnswer() {
  $('.response').html(`
    <h3>You got the answer correct!</h3>
    `)
}

function submitAnswer() {
  //initiates submit button after an answer is chosen
  $('.mainContainer').on('submit', function (event) {
    event.preventDefault();
    $('firstPhase').hide();

    let currentSelection = $('input:checked');
    let answer = currentSelection.val();
    let correct = STORE[currentQuestion].correct;

    if (answer === correct) {
      correctAnswer();
    }
    else {
        wrongAnswer();
      }
    

  });
  console.log('submitAnswer is on')
}

function generateNextQuestion() {
  //generates next set of questions in quiz sequence

  console.log('generateNextQuestion is on');
}

function restartQuiz() {
  //starts the entire quiz sequence over
  console.log('restartQuiz is on');
}

function handleQuiz() {
  beginQuiz();
  generateQuestion();
  submitAnswer();
  generateNextQuestion()
  restartQuiz();
}