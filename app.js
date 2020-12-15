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
  return `
  <section>
    <p class='js-question-counter'>Question ${store.questionNumber}/5</p>
    <form id='js-question-form'>
      <fieldset>
        <div class='question'>
          <legend>${store.questions[store.questionNumber].question}</legend>
        </div>
        <div class='answers'>
          <div> 
            <input type='radio' name='answers' id='answer-1' value='store.questions[store.questionNumber].answers[0]'</input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[0]}</label>
          </div>
          <div> 
            <input type='radio' name='answers' id='answer-1' value='store.questions[store.questionNumber].answers[1]'</input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[1]}</label>
          </div>
          <div> 
            <input type='radio' name='answers' id='answer-1' value='store.questions[store.questionNumber].answers[2]'</input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[2]}</label>
          </div>
          <div> 
            <input type='radio' name='answers' id='answer-1' value='store.questions[store.questionNumber].answers[3]'</input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[3]}</label>
          </div>
        </div>
        <button type='submit' id='js-submit-btn'>Submit</button> 
      </fieldset>
    </form>
    <p class='js-score-counter'>Score ${store.score}/5</p>
  </section>
  `
}

function generateResultHtml() {
  console.log('generateResultHtml ran');
  return `
    <h2>Hello</h2>
  `
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
  $('main').on('submit', '#js-question-form', function(event) {
    event.preventDefault();

    let userAnswer = $('input[name=answers]:checked').val();

    if (userAnswer === store.questions[store.questionNumber].correctAnswer) {
      store.score++;
    }
    store.questionNumber++;
    renderQuiz();
  })
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