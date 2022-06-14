const form = document.querySelector("#form")
const errors = document.querySelector(".errors")
const errorsList = document.querySelector(".errors-list")

const usernameInput = document.querySelector("#username")
const password = document.querySelector("#password")
const passwordConfirm = document.querySelector("#password-confirmation")
const checkbox = document.querySelector("#terms")

form.addEventListener("submit", e => {

  const errorMessages = []
  clearErrors()

  if (usernameInput.value.length < 6) {
    errorMessages.push("Username must be at least 6 characters long")
  }

  if (password.value.length < 10) {
    errorMessages.push("Password must be at least 10 characters long")
  }

  if (password.value !== passwordConfirm.value) {
    errorMessages.push("Passwords must match")
  }

  if (!checkbox.checked) {
    errorMessages.push("You must accept the terms")
  }

  if (errorMessages.length > 0) {
    e.preventDefault()
    showErrors(errorMessages)
    return
  }

})

function clearErrors() {

  while (errorsList.children[0] != null) {
    errorsList.removeChild(errorsList.children[0])
  }

  errors.classList.remove("show")
}

function showErrors(errorMessages) {
  errorMessages.forEach(e => {
    const li = document.createElement("li")
    li.innerText = e
    errorsList.appendChild(li)
  })

  errors.classList.add("show")
}