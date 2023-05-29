var tasks = [];

function addTask() {
  var taskNameInput = document.getElementById('taskName');
  var priorityInput = document.getElementById('priority');

  var taskName = taskNameInput.value.trim();
  var priority = parseInt(priorityInput.value);

  if (taskName === '') {
    alert('Please enter a task name.');
    return;
  }

  if (isNaN(priority) || priority <= 0) {
    alert('Please enter a valid priority greater than 0.');
    return;
  }

  var task = {
    name: taskName,
    priority: priority
  };

  tasks.push(task);
  renderTaskList();
  taskNameInput.value = '';
  priorityInput.value = '';
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTaskList();
}

function renderTaskList() {
  var tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var row = document.createElement('tr');
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${task.name}</td>
      <td>${task.priority}</td>
      <td><button onclick="removeTask(${i})" class="btn btn-danger">Remove</button></td>
    `;
    tableBody.appendChild(row);
  }
}