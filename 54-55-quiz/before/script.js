/*
  TODO: 2. Select all elements needed
    * The form element (has the id `quiz-form`)
    * The answer inputs (have the class `answer`)
    * BONUS: The questions (have the class `question-item`)
    * BONUS: The alert (has the id `alert`)
*/

// TODO: 3. Create a submit event listener for the form that does the following.
//    1. Prevent the default behaviour
//    2. Get all selected answers (use the `checked` property on the input to determine if it is selected or not)
//    3. Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
//    4. For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
//    5. For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
//    6. BONUS: Make sure unanswered questions show up as incorrect. The easiest way to do this is to add the incorrect class and removing the correct class from all question items before checking the correct answers
//    7. BONUS: If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)

const form = document.querySelector("#quiz-form")
const answerInputs = Array.from(document.querySelectorAll(".answer"))
const alert = document.querySelector("#alert")
const questionItems = document.querySelectorAll(".question-item")

form.addEventListener('submit', e => {
  e.preventDefault()

  const selectedAnswers = answerInputs.filter(a => a.checked === true)
  selectedAnswers.forEach(a => {
    if (a.value === 'true') {
      a.closest(".question-item").classList.add("correct")
      a.closest(".question-item").classList.remove("incorrect")
    } else {
      a.closest(".question-item").classList.add("incorrect")
      a.closest(".question-item").classList.remove("correct")
    }
  })

  const allTrue = selectedAnswers.every(a => a.value === 'true')
  const allAnswered = selectedAnswers.length === questionItems.length
  if (allAnswered && allTrue) {
    alert.classList.add("active")
    setTimeout(() => {
      alert.classList.remove("active")
    }, "2000")
  }
})

