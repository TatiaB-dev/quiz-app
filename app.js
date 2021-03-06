/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Which of the following is an ACE inhibitor?',
      answers: [
        'Furosemide',
        'Metformin',
        'Metoprolol',
        'Lisinopril'
      ],
      correctAnswer: 'Lisinopril'
    },
    {
      question: 'Which mediciation can cause hypokalemia, and should be taken with potassium?',
      answers: [
        'Spironolactone',
        'Furosemide',
        'Levetiracetam',
        'Allopurinol'
      ],
      correctAnswer: 'Furosemide'
    },
    {
      question: 'When is the best time to take Levothyroxine?',
      answers: [
        'At bedtime',
        'First thing in the morning, with breakfast',
        'First thing in the morning, at least 30 minutes before eating',
        'It does not matter'
      ],
      correctAnswer: 'First thing in the morning, at least 30 minutes before eating'
    },
    {
      question: 'What is not a symptom of Digoxin toxicity?',
      answers: [
        'Vomiting',
        'Hallucinations',
        'Palpitations',
        'Hypertension'
      ],
      correctAnswer: 'Hypertension'
    },
    {
      question: 'What lab value is often elevated in people who are taking prednisone?',
      answers: [
        'Blood glucose',
        'Potassium',
        'Red Blood Cell Count',
        'Erythrocyte Sedimentation Rate (Sed rate)'
      ],
      correctAnswer: 'Blood glucose'
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
  <section class='container'>
    <div class='standout'>
      <p>Test your knowledge of nursing-level pharmacology</p>
      <button type='button' id='js-start-quiz'>Start Quiz</button>
    </div>
  </section>
  `
}

function generateQuestionsHtml() {
  console.log('generateQuestionHtml ran');
  return `
  <section class='container'>
    <p class='js-question-counter counter'>Question ${store.questionNumber + 1}/5</p>
    <form id='js-question-form'>
      <fieldset class='standout'>
        <div class='question-head'>
          <legend>${store.questions[store.questionNumber].question}</legend>
        </div>
        <div>
          <div class='questions'> 
            <input type='radio' name='answers' id='answer-1' value='${store.questions[store.questionNumber].answers[0]}' required tabindex='0'></input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[0]}</label>
          </div>
          <div class='questions'> 
            <input type='radio' name='answers' id='answer-1' value='${store.questions[store.questionNumber].answers[1]}' required tabindex='0'></input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[1]}</label>
          </div>
          <div class='questions'> 
            <input type='radio' name='answers' id='answer-1' value='${store.questions[store.questionNumber].answers[2]}' required tabindex='0'></input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[2]}</label>
          </div>
          <div class='questions'> 
            <input type='radio' name='answers' id='answer-1' value='${store.questions[store.questionNumber].answers[3]}' required tabindex='0'></input>
            <label for='answer-1'>${store.questions[store.questionNumber].answers[3]}</label>
          </div>
        </div>
        <button type='submit' id='js-submit-btn'>Submit</button> 
        <button type='button' id='js-next-btn' style='display: none;'>Next</button>
      </fieldset>
    </form>
    <p class='js-score-counter counter'>Score ${store.score}/5</p>
    <p class='js-results results'></p>
  </section>
  `
}

function generateFinalScreenHtml() {
  console.log('generateFinalScreenHtml ran');
  return `
  <section class='container'>
    <div class='standout'>
      <p>You finished the quiz! Here is your final score: </p>
      <p> Score: ${store.score}/5</p>
      <button type='button' id='js-restart-btn'>Restart Quiz</button>
    </div>
  </section>
  `
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  console.log('renderQuiz ran')

  if (store.quizStarted === false) {
    $('main').html(generateStartHtml());
    return;
  } else if (store.questionNumber < store.questions.length) {
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
    $('#js-submit-btn').hide();
    $('#js-next-btn').show();
    let userAnswer = $('input[name=answers]:checked').val();
    console.log(userAnswer);

    if (userAnswer === store.questions[store.questionNumber].correctAnswer) {
      store.score++;
      $('.js-results').html( $("input:checked").val() + " is correct!");

    } else {
      $('.js-results').html( $("input:checked").val() + ` is incorrect. The correct answer is: ${store.questions[store.questionNumber].correctAnswer}.`);
    }
    store.questionNumber++;
  })
}

function handleNextQuestionClick() {
  console.log('handleNextQuestionClick ran')
  $('main').on('click', '#js-next-btn', function() {
    renderQuiz();
  })
}

function handleRestartQuizClick() {
  $('main').on('click', '#js-restart-btn', function() {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    renderQuiz();
  })
}

/********** Quiz **********/

function handleQuizApp() {
  renderQuiz();
  handleStartQuizClick();
  handleSubmitQuestionClick();
  handleNextQuestionClick();
  handleRestartQuizClick();
}

$(handleQuizApp)