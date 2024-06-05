const taskKey = '@tasks'

let selectedTaskId = null

function addTask(event) {
  event.preventDefault()
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = `id-${taskId}`
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <button title="Editar tarefa" onClick="openEditDialog(${taskId})">✏️</button>
    <button title="Excluir tarefa" onClick="removeTask(${taskId})">❌</button>
  `

  taskList.appendChild(li)

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  const task = tasks[selectedTaskId]

  const dialog = document.querySelector('dialog')

  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')

  editTitle.value = task.title
  editDescription.value = task.description

  dialog.showModal()
}

function closeDialog() {
  const dialog = document.querySelector('dialog')
  dialog.close()
}

function removeTask(taskId) {
  const taskList = document.querySelector('#taskList')
  const liToRemove = document.getElementById(`id-${taskId}`)
  taskList.removeChild(liToRemove)

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const updatedTasks = tasks.filter((task) => task.id !== taskId)
  localStorage.setItem(taskKey, JSON.stringify(updatedTasks))
}

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')

  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <button title="Editar tarefa" onClick="openEditDialog(${task.id})">✏️</button>
        <button title="Excluir tarefa" onClick="removeTask(${task.id})">❌</button>
      </li>
    `
    )
    .join('')
})
