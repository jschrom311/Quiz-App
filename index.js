'use strict';

const questionSet = [
  {
    number: 1,
    text: `Who is Morty's love interest at Anatomy Park?`,
    ans1: `Amy`,
    ans2: `Annie`,
    ans3: `Amanda`,
    ans4: `Jamie`
  },
  
  {
    number: 2,
    text: `What do the guards in the embassy call Pickle Rick?`,
    ans1: `Pickle-man`,
    ans2: `Crazy Dill`,
    ans3: `Keyser Soze`,
    ans4: `Solenya`
  },
  
  {
    number: 3,
    text: `What does Rick use to travel through time and space?`,
    ans1: `Portal Gun`,
    ans2: `Time-machine`,
    ans3: `A secret element`,
    ans4: `Witch-craft`
  },
  
  {
    number: 4,
    text: `Who is Morty's crush at school?`,
    ans1: `Jordan`,
    ans2: `Jenny`,
    ans3: `Sidney`,
    ans4: `Jessica`
  },
  
  {
    number: 5,
    text: `What is Mr. Poopybutthole's catchphrase?`,
    ans1: `Hasta la vista, baby!`,
    ans2: `Wubba lubba dub dub`,
    ans3: `Oooohhh Weee`,
    ans4: `My man!`
  },
  
  {
    number: 6,
    text: `What does Mr. Meeseeks try to teach Jerry?`,
    ans1: `Math`,
    ans2: `Golf`,
    ans3: `How to dance`,
    ans4: `The guitar`
  },
  
  {
    number: 7,
    text: `Morty's son is half of what non-human species?`,
    ans1: `Plumbus`,
    ans2: `Gazorpazorp`,
    ans3: `Traflorkian`,
    ans4: `Cronenberg`
  },
  
  {
    number: 8,
    text: `Who are Rick's best friends?`,
    ans1: `Birdman and Squanchy`,
    ans2: `Krombopulous Michael and Birdman`,
    ans3: `Noob-noob and Crocubot`,
    ans4: `Tom and Jerry`
  },
  
  {
    number: 9,
    text: `What name does Morty's dog want to be called?`,
    ans1: `Snowball`,
    ans2: `Snuffles`,
    ans3: `Snoopy`,
    ans4: `Puppers McDoge`
  },
  
  {
    number: 10,
    text: `What Earth is the main Rick from?`,
    ans1: `C-139`,
    ans2: `C-138`,
    ans3: `C-137`,
    ans4: `C-238`
  }
];

const ANSWERS = [
  `Annie`,
  `Solenya`,
  `Portal Gun`,
  `Jessica`,
  `Oooohhh Weee`,
  `Golf`,
  `Gazorpazorp`,
  `Birdman and Squanchy`,
  `Snowball`,
  `C-137`
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question"> Rick and Morty Quiz </h2>
    
    <form>
      <legend> ${question.text} </legend>
        <fieldset>
          <label>
            <input class="answer" type="radio" name="option" checked></input>
            <span>${question.ans1}</span>
          </label>
    
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.ans2}</span>
          </label>
    
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.ans3}</span>
          </label>
    
          <label>
            <input class="answer" type="radio" name="option"></input>
            <span>${question.ans4}</span>
          </label>
        </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Whoops! The correct answer was ${ANSWERS[questionNum - 1]}!</h2>
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Try Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
