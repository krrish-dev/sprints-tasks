const tasks = [];
let editedTaskIndex = null;

const addTask = function () {
  const taskNameInput = document.getElementById('taskName');
  const priorityInput = document.getElementById('priority');

  const taskName = taskNameInput.value.trim();
  const priority = parseInt(priorityInput.value);

  if (!isValidTaskName(taskName)) {
    alert('Please enter a valid task name.');
    return;
  }

  if (!isValidPriority(priority)) {
    alert('Please enter a valid priority greater than 0.');
    return;
  }

  const task = {
    name: taskName,
    priority: priority
  };

  tasks.push(task);
  renderTaskList();
  clearInputFields();
};

const removeTask = function (index) {
  tasks.splice(index, 1);
  renderTaskList();
};

const editTask = function (index) {
  if (editedTaskIndex !== null) {
//    return ; // Exit the function if there is an active editing task
  }

  editedTaskIndex = index;
  renderTaskList();
};

const saveTask = function (index) {
  const row = document.getElementById('taskRow_' + index);
  const nameInput = row.querySelector('.edit-task-name');
  const priorityInput = row.querySelector('.edit-task-priority');

  const newTaskName = nameInput.value.trim();
  const newPriority = parseInt(priorityInput.value);

  if (!isValidTaskName(newTaskName)) {
    alert('Please enter a valid task name.');
    return;
  }

  if (!isValidPriority(newPriority)) {
    alert('Please enter a valid priority greater than 0.');
    return;
  }

  tasks[index].name = newTaskName;
  tasks[index].priority = newPriority;

  editedTaskIndex = null; // Reset the edited task index
  renderTaskList();
};

const cancelEditTask = function (index) {
  editedTaskIndex = null; // Reset the edited task index
  renderTaskList();
};

const getHighestPriority = function () {
  if (tasks.length === 0) {
    alert('No tasks available.');
    return;
  }

  let highestPriority = tasks[0].priority;
  for (let i = 1; i < tasks.length; i++) {
    if (tasks[i].priority < highestPriority) {
      highestPriority = tasks[i].priority;
    }
  }

  const highestPriorityTasks = tasks.filter(task => task.priority === highestPriority);
  const taskNames = highestPriorityTasks.map(task => task.name);
  const message = `Tasks with highest priority (${highestPriority}): ${taskNames.join(', ')}`;
  alert(message);
};

const renderTaskList = function () {
  const tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const row = document.createElement('tr');
    row.id = 'taskRow_' + i;
    row.innerHTML = `
      <td>${i + 1}</td>
      <td class="task-name">${i === editedTaskIndex ? createEditableInput('edit-task-name', task.name) : task.name}</td>
      <td class="task-priority">${i === editedTaskIndex ? createEditableInput('edit-task-priority', task.priority) : task.priority}</td>
      <td class="task-action">
        ${i === editedTaskIndex ? createSaveCancelButton(i) : createEditButton(i)}
        <button onclick="removeTask(${i})" class="btn btn-danger">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  }
};

const createEditableInput = function (className, value) {
  return `<input type="text" class="${className}" value="${value}">`;
};

const createEditButton = function (index) {
  return `<button onclick="editTask(${index})" class="btn btn-primary">Edit</button>`;
};

const createSaveCancelButton = function (index) {
  return `
    <button onclick="saveTask(${index})" class="btn btn-success">Save</button>
    <button onclick="cancelEditTask(${index})" class="btn btn-secondary">Cancel</button>
  `;
};

const clearInputFields = function () {
  document.getElementById('taskName').value = '';
  document.getElementById('priority').value = '';
};

const isValidTaskName = function (name) {
  return name.trim() !== '' && !Number(name);
};

const isValidPriority = function (priority) {
  return !isNaN(priority) && priority > 0;
};

renderTaskList();
