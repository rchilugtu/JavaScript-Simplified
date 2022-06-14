// 1. Select all elements
const form = document.querySelector("#new-item-form")
const listItems = document.querySelector("#list")
const input = document.querySelector("#item-input")

// 2. When I submit the form add a new element
form.addEventListener('submit', e => {
    e.preventDefault()

    // 1. Create new item
    let newItem = document.createElement('div')
    newItem.classList.add('list-item')
    newItem.innerText = input.value

    // 2. Add new item to the list
    listItems.appendChild(newItem)

    // 3. Clear input field
    input.value = ""

    // 4. Add event listener to delete item when clicked
    newItem.addEventListener('click', () => {
        newItem.remove()
    })
});


