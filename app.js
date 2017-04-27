var questions = [

    {
    question: "Warhammer Space Marines are inspired by which book?",
    answers: [  "Starship Troopers by Robert Heinlein",
                "Armor by John Steakley",
                "Dune by Frank Herbert",
                "The Forever War by Joe Haldeman"],
    correct: 0
    },{
    question: "How does Ork technology work?",
    answers: [  "They steal other races technology.",
                "They don't use technology.",
                "Because they believe it does.",
                "Because captured slaves provide them technology."],
    correct: 2
    },{
    question: "Where do the Dark Gods come from?",
    answers: [  "From another galaxy close to the Milky Way.",
                "The Warp.",
                "Hell.",
                "From people's beliefs."],
    correct: 1
    },{
    question: "What is the symbol of the Imperium of Man?",
    answers: [  "The Lion.",
                "The Dragon.",
                "A skull on black crossed by two swords.",
                "The Aquila."],
    correct: 3
    },{
    question: "What is the standard ranged weapon of the Space Marines?",
    answers: [  "The chainsword.",
                "The lasgun.",
                "The beamgun",
                "The boltgun."],
    correct: 3
    }

]

//Global variables
var index = 0
var correctAnswersCounter = 0
var questionTemplate = `<div class="questionBox"> \
    <h2 class="js-questionTitle"></h2> \

    <form id="question" class="js-question"> \
        <input type="radio" name="answer" class="js-answer0" required> <label id="js-label0"></label></br> \
        <input type="radio" name="answer" class="js-answer1" required> <label id="js-label1"></label></br> \
        <input type="radio" name="answer" class="js-answer2" required> <label id="js-label2"></label></br> \
        <input type="radio" name="answer" class="js-answer3" required> <label id="js-label3"></label></br> \
        <input class="submit" type="submit" name="answer"> \
    </form> \
</div>`

function render(questions, questionTemplate, index) {
    var template = $(questionTemplate)
    template.find('.js-questionTitle').text(questions[index].question)
    for (i=0; i < 4; i++) {
        var label = "#js-label" + i
        var classLabel = '.js-answer' + i
        template.find(label).text(questions[index].answers[i])
        template.find(classLabel).val(i)
    }
    $('.mainContainer').html(template)
}

function renderCorrect(index, correctAnswersCounter) {
    var questionNumber = index + 1
    var correct = "Correct Anwers: " + correctAnswersCounter + " out of " + questionNumber
    var countersTemplate =
    `<h2 class="js-correctAnswers">${correct}</h2>`
    $('.scoreContainer').html(countersTemplate)
}

function renderResults(correctAnswersCounter) {
    var correct = "You finished and got " + correctAnswersCounter + " correct answers out of " + index
    var countersTemplate =
    `<h2 class="js-correctAnswers">${correct}</h2>`
    $('.mainContainer').html(countersTemplate)
}

//Event listeners
function submitForm() {
    $('#question').submit(function(event) {
        event.preventDefault()
        var userAnswer = $('#question input:checked').val()

        if (userAnswer == questions[index].correct) {
            alert("You are correct!")
            correctAnswersCounter += 1
            renderCorrect(index, correctAnswersCounter)
        } else {
            alert("Sorry, you got it wrong!")
            renderCorrect(index, correctAnswersCounter)
        }

        index += 1

        if (index < questions.length) {
            render(questions, questionTemplate, index)
            submitForm()
        } else {
            renderResults(correctAnswersCounter)
        }

        })

}

$(document).ready(function() {
    render(questions, questionTemplate, index)
    renderCorrect(index, correctAnswersCounter)
    submitForm()
})
