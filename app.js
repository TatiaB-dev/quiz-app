/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateStartHtml() {
  console.log('generateStartHtml ran');
  return `
  <section class='center-container'>
    <div class='container'>
      <p>Test your knowledge of nursing-level pharmacology</p>
      <button type='button' id='js-start-quiz'>Start Quiz</button>
    </div>
  </section>
  `
}

function generateQuestionScoreNumHtml() {
  console.log('generateQuestionScoreNumHtml ran');
}

function generateQuestionsHtml() {
  console.log('generateQuestionHtml ran');
}

function generateResultHtml() {
  console.log('generateResultHtml ran ran');
}

function generateFinalScreenHtml() {
  console.log('generateFinalScreenHtml ran');
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  console.log('renderQuiz ran')

  if (store.quizStarted === false) {
    $('main').html(generateStartHtml());
    return;
  } else if (store.questionNumber <= store.questions.length) {
    $('main').html(generateQuestionsHtml());
    return;
  } else {
    $('main').html(generateFinalScreenHtml());
    return;
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuizClick() {
  $('main').on('click', '#js-start-quiz', function() {
    console.log('handleStartQuizClick ran');
    store.quizStarted = true;
    renderQuiz();
  })
}

function handleSubmitQuestionClick() {
  console.log('handleSubmitQuestionClick ran')
}

function handleNextQuestionClick() {
  console.log('handleNextQuestionClick ran')
}

/********** Quiz **********/

function handleQuizApp() {
  renderQuiz();
  handleStartQuizClick();
  handleSubmitQuestionClick();
  handleNextQuestionClick();
}

$(handleQuizApp)