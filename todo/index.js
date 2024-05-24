const taskKey = '@tasks';

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');
  const button = document.createElement('button');

  button.innerHTML = '✏️';
  button.style.backgroundColor = '#676767';
  button.style.borderRadius = '5px';
  button.title = 'Editar tarefa';

  button.addEventListener('click', () => {
    // Lógica para editar a tarefa
    console.log('Editar tarefa:', taskId);
  });

  li.id = taskId;
  li.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${taskDescription}</p>
  `;

  li.appendChild(button);
  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map((task) => `<li><h2>${task.title}</h2><p>${task.description}</p><button>✏️</button></li>`)
    .join('');
});

// Abrir modal de edição
function openEditModal(taskId, title, description) {
  const modal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const editTitleInput = document.getElementById('editTitle');
  const editDescriptionInput = document.getElementById('editDescription');

  editTitleInput.value = title;
  editDescriptionInput.value = description;
  document.getElementById('taskId').value = taskId;

  modal.style.display = 'block';

  // Fechar modal ao clicar no botão de cancelar
  document.querySelector('.cancel').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Fechar modal ao clicar fora do modal
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Submeter o formulário de edição
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const taskId = document.getElementById('taskId').value;
    const editedTask = {
      title: editTitleInput.value,
      description: editDescriptionInput.value
    };
    tasks[taskId] = editedTask;
    localStorage.setItem(taskKey, JSON.stringify(tasks));
    modal.style.display = 'none';
    // Atualizar a lista de tarefas exibidas
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = tasks
      .map((task, index) => `<li><h2>${task.title}</h2><p>${task.description}</p><button class="editBtn" data-task-id="${index}">✏️</button></li>`)
      .join('');
    // Adicionar evento de clique para cada botão de edição
    const editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const taskId = button.getAttribute('data-task-id');
        const task = tasks[taskId];
        openEditModal(taskId, task.title, task.description);
      });
    });
  });
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map((task, index) => `<li><h2>${task.title}</h2><p>${task.description}</p><button class="editBtn" data-task-id="${index}">✏️</button></li>`)
    .join('');

  // Adicionar evento de clique para cada botão de edição
  const editButtons = document.querySelectorAll('.editBtn');
  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const taskId = button.getAttribute('data-task-id');
      const task = tasks[taskId];
      openEditModal(taskId, task.title, task.description);
    });
  });
});
