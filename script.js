url = window.location.href;

if (url.includes('history')) {
    fetchAddr = 'https://opentdb.com/api.php?amount=5&category=23&difficulty=easy&type=multiple'
} else if (url.includes('general')) {
    fetchAddr = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
} else if (url.includes('mythology')) {
    fetchAddr = 'https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple'
}
else {
    fetchAddr = 'https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple'
}

isMenu = false

questionText = document.querySelector('#question-text')
answer1 = document.getElementById('answer1')
answer2 = document.getElementById('answer2')
answer3 = document.getElementById('answer3')
answer4 = document.getElementById('answer4')
let = AnswerButtons = document.getElementsByClassName('answer')

let greatAnswers = 0;
let wrongAnswers = 0;

questionNumbers = document.getElementsByClassName('question-number')

window.onload = fetchQuestions

async function fetchQuestions() {
    greatAnswers = 0;
    wrongAnswers = 0;
    let response = await fetch(fetchAddr)
    console.log(response)
    let data = await response.json()
    console.log(data)
    resetColors()
    for (let z = 0; z < 5; z++) {
        questionNumbers[z].classList = 'question-number'
    }
    useApiData(data, 0)
}

function useApiData(data, num) {

    for (let z = 0; z < 5; z++) {
        if (questionNumbers[z].innerHTML == num + 1) {
            questionNumbers[z].classList.add('current')
        }
    }
    document.getElementById('question-category').innerText = data.results[1].category;

    questionText.innerHTML = data.results[num].question
    answers = []
    answers.push(data.results[num].correct_answer)
    correctAnswer = data.results[num].correct_answer;
    for (let i = 0; i < 3; i++) {
        answers.push(data.results[num].incorrect_answers[i])
    }
    shuffleArray(answers)

    answer1.innerHTML = answers[0]
    answer2.innerHTML = answers[1]
    answer3.innerHTML = answers[2]
    answer4.innerHTML = answers[3]

    console.log(AnswerButtons[1])
    for (let y = 0; y < 4; y++) {
        btn = AnswerButtons[y]
        btn.onclick = function () {
            AnswerCheck(this.innerHTML)
        }
    }

    function AnswerCheck(userAnswer) {

        colorButtons()

        if (num == 4) {
            setTimeout(() => {
                document.getElementById('finalScreen').classList.add('visible');
                document.getElementById('scorePoints').innerText = greatAnswers + '/5'

                if (greatAnswers < 4) {
                    document.getElementById('scoreComment').innerHTML = "It seems like you need some practice."
                } else {
                    document.getElementById('scoreComment').innerHTML = "WOW! You are really smart."
                }
            }, 2000);


        } else {
            setTimeout(() => {
                resetColors()
                useApiData(data, num + 1)
            }, 2000);

            if (String(userAnswer) == String(correctAnswer)) {
                greatAnswers += 1
            } else {
                wrongAnswers += 1
            }
        }


    }
}

function restart() {
    document.getElementById('finalScreen').classList.remove('visible');
    fetchQuestions()
}

function colorButtons() {
    for (let y = 0; y < 4; y++) {
        btn = AnswerButtons[y]
        btn.onclick = ''
        if (btn.innerHTML == correctAnswer) {
            btn.classList.add('great')
        } else {
            btn.classList.add('wrong')
        }

    }
}
function resetColors() {
    for (let y = 0; y < 4; y++) {
        btn = AnswerButtons[y]
        btn.classList = 'answer'
    }
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function openMenu() {
    burger = document.getElementById('burger');
    mobileMenu = document.getElementById('mobile-menu')

    isMenu = !isMenu
    if (isMenu) {
        burger.classList.add('active')
        mobileMenu.classList.remove('closed')
        mobileMenu.classList.add('opened')
    } else {
        burger.classList.remove('active')
        mobileMenu.classList.remove('opened')
        mobileMenu.classList.add('closed')
    }
}

window.addEventListener('load', (event) => {
    mobileMenu = document.getElementById('mobile-menu')
    isMenu = false
    if (isMenu) {
        burger.classList.add('active')
        mobileMenu.classList.remove('closed')
        mobileMenu.classList.add('opened')
    } else {
        burger.classList.remove('active')
        mobileMenu.classList.remove('opened')
        mobileMenu.classList.add('closed')
    }
})
window.addEventListener('resize', (event) => {
    mobileMenu = document.getElementById('mobile-menu')
    isMenu = false
    if (isMenu) {
        burger.classList.add('active')
        mobileMenu.classList.remove('closed')
        mobileMenu.classList.add('opened')
    } else {
        burger.classList.remove('active')
        mobileMenu.classList.remove('opened')
        mobileMenu.classList.add('closed')
    }
})
