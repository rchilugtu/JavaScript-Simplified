// Thought process when planning/creating a project
// 1. Think about different user interactions of the applications
//    - Add Todos
//      * User will type in todo and click add todo button. This should then add the todo to the list above.
//    - Delete Todos
//    - Complete Todos
// 2. Think about behind the scenes operations of the application which are triggered by the user actions
//    - Save Todos
//    - Load Todos
// 3. Figure out what are the steps for those different actions listed above

// Add Todos
// User will type in todo and click add todo button.
const form = document.querySelector('#new-todo-form')
const todoInput = document.querySelector('#todo-input')
const list = document.querySelector('#list')
const template = document.querySelector('#list-item-template')
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST' // this is used as a prefix whenever we add something to local storage. Reason: local storage is site-dependent. Every data in local storage is shared with different websites. So have a prefix to make id unique!
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()

todos.forEach(renderTodo) // this is simplification of: todos.forEach(todo => renderTodo(todo))

// Complete Todos
// Change listens for any elements that's been changed  within the List Element
list.addEventListener('change', e => {

    // This checks if the checkbox is not clicked, then we don't do anything
    if (!e.target.matches('[data-list-item-checkbox]')) return

    // Get the todo that is clicked on
    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId // use of data attributes!
    const todo = todos.find(t => t.id === todoId) // NOTE: this object is being referenced inside the todos array!! So any changesa to this objefct is reflected in the todos array!!

    // Toggle complete property of todo to be equal the checkbox value
    todo.complete = e.target.checked

    // Save our updated todo
    saveTodos()
})

// Delete Todos
list.addEventListener('click', e => {
    if (!e.target.matches('[data-button-delete]')) return

    // Get the todo that is clicked on
    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId // use of data attributes!
    const todo = todos.find(t => t.id === todoId) // NOTE: this object is being referenced inside the todos array!! So any changesa to this objefct is reflected in the todos array!!

    // Remove the todo from the screen
    parent.remove()

    // Remove the todo from the global todos list
    todos = todos.filter(t => t.id !== todoId) // Returns a new list based on the predicate

    // Save global todos list
    saveTodos()
})

// This should then add the todo to the list above.
form.addEventListener('submit', e => {
    e.preventDefault()
    // Create list item based on user input and <template> tag
    const todoName = todoInput.value
    if (todoName === "") return

    const newTodo = {
        name: todoName,
        complete: false,
        id: new Date().valueOf().toString() // this essentially generates the ID as it gives the exact ms the todo was created
    }

    todos.push(newTodo)
    renderTodo(newTodo)
    saveTodos(newTodo)
    todoInput.value = ''
})


function renderTodo({ name, complete, id }) {
    const templateClone = template.content.cloneNode(true) // Gets all the content in the template and return it
    const listItem = templateClone.querySelector('.list-item')
    listItem.dataset.todoId = id // use of data attributes!
    const textElement = templateClone.querySelector('[data-list-item-text')
    const checkboxElement = templateClone.querySelector('[data-list-item-checkbox]')

    textElement.innerText = name
    checkboxElement.checked = complete

    // Add templateClone to list 
    list.appendChild(templateClone)
}

// Load todos
function loadTodos() {
    const todoString = localStorage.getItem(TODOS_STORAGE_KEY)
    return JSON.parse(todoString) || [] // Short circuit! If JSON.parse returns falsey then we return []
}

// Save todos
function saveTodos() {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}
