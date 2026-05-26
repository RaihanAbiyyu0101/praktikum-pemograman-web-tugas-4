// 1. Ambil elemen dari HTML
const todoInput = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const todoList = document.getElementById('todo-list')

const errorText = document.getElementById('error-text')

const allBtn = document.getElementById('all-btn')
const activeBtn = document.getElementById('active-btn')
const completedBtn = document.getElementById('completed-btn')


let todos = JSON.parse(localStorage.getItem('todos')) || []

let currentFilter = 'all'


function renderTodos() {

    todoList.innerHTML = ''

    let filteredTodos = todos

  
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed)
    }

    // Filter Completed
    if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed)
    }

    filteredTodos.forEach((todo) => {

        const li = document.createElement('li')

        li.className =
            'flex justify-between items-center p-3 border rounded'

        li.innerHTML = `
            <div class="flex items-center gap-3">

                <span
                    onclick="toggleTodo(${todo.id})"
                    style="
                        cursor:pointer;
                        ${todo.completed
                            ? 'text-decoration: line-through; color:gray'
                            : ''}
                    "
                >
                    ${todo.text}
                </span>

            </div>

            <div class="flex gap-2">

                <button
                    onclick="editTodo(${todo.id})"
                    style="color:blue"
                >
                    Edit
                </button>

                <button
                    onclick="deleteTodo(${todo.id})"
                    style="color:red"
                >
                    Hapus
                </button>

            </div>
        `

        todoList.appendChild(li)

    })

   
    localStorage.setItem('todos', JSON.stringify(todos))
}


function addTodo() {

    const value = todoInput.value.trim()

    
    if (value === '') {

        todoInput.classList.add('border-red-500')
        errorText.classList.remove('hidden')

        return
    }

    const todoBaru = {
        id: Date.now(),
        text: value,
        completed: false
    }

    todos = [...todos, todoBaru]

    renderTodos()

   
    todoInput.value = ''
}


addBtn.addEventListener('click', addTodo)


todoInput.addEventListener('keypress', (e) => {

    if (e.key === 'Enter') {
        addTodo()
    }

})


todoInput.addEventListener('input', () => {

    todoInput.classList.remove('border-red-500')
    errorText.classList.add('hidden')

})


window.toggleTodo = (id) => {

    todos = todos.map((todo) => {

        if (todo.id === id) {

            return {
                ...todo,
                completed: !todo.completed
            }

        }

        return todo

    })

    renderTodos()
}


window.deleteTodo = (id) => {

    todos = todos.filter(todo => todo.id !== id)

    renderTodos()
}


window.editTodo = (id) => {

    const todo = todos.find(todo => todo.id === id)

    const newText = prompt('Edit tugas:', todo.text)

    if (newText === null) return

    if (newText.trim() === '') return

    todo.text = newText.trim()

    renderTodos()
}


allBtn.addEventListener('click', () => {

    currentFilter = 'all'

    renderTodos()
})

activeBtn.addEventListener('click', () => {

    currentFilter = 'active'

    renderTodos()
})

completedBtn.addEventListener('click', () => {

    currentFilter = 'completed'

    renderTodos()
})


renderTodos()