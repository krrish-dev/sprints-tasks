class Task {
  constructor(name, priority, status = 'pending') {
    this.name = name;
    this.priority = priority;
    this.status = status;
    this.selected = false;
  }

  toggleStatus() {
    this.status = this.status === 'done' ? 'pending' : 'done';
  }

  toggleSelected() {
    this.selected = !this.selected;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.editedTaskIndex = null;
    this.sortColumn = null;
    this.sortDirection = 'asc';
  }

  addTask(task) {
    this.tasks.push(task);
    this.renderTaskList();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.renderTaskList();
  }

  editTask(index) {
    if (this.editedTaskIndex !== null) {
      return;
    }

    this.editedTaskIndex = index;
    this.renderTaskList();
  }

  saveTask(index, newTaskName, newPriority) {
    this.tasks[index].name = newTaskName;
    this.tasks[index].priority = newPriority;

    this.editedTaskIndex = null;
    this.renderTaskList();
  }

  cancelEditTask() {
    this.editedTaskIndex = null;
    this.renderTaskList();
  }

  toggleTaskStatus(index) {
    this.tasks[index].toggleStatus();
    this.renderTaskList();
  }

  toggleTaskSelected(index) {
    this.tasks[index].toggleSelected();
    this.renderTaskList();
  }

  toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    this.tasks.forEach(task => task.selected = selectAllCheckbox.checked);
    this.renderTaskList();
  }

  deleteSelectedTasks() {
    this.tasks = this.tasks.filter(task => !task.selected);
    this.renderTaskList();
  }

  getStatusStyle(status) {
    if (status === 'done') {
      return 'color: green; cursor: pointer;';
    } else if (status === 'pending') {
      return 'color: red; cursor: pointer;';
    }
    return '';
  }

  getHighestPriority() {
    if (this.tasks.length === 0) {
      alert('No tasks available.');
      return;
    }

    let highestPriority = this.tasks[0].priority;
    for (let i = 1; i < this.tasks.length; i++) {
      if (this.tasks[i].priority < highestPriority) {
        highestPriority = this.tasks[i].priority;
      }
    }

    const highestPriorityTasks = this.tasks.filter(task => task.priority === highestPriority);
    const taskNames = highestPriorityTasks.map(task => task.name);
    const message = `Tasks with highest priority (${highestPriority}): ${taskNames.join(', ')}`;
    alert(message);
  }

  renderTaskList() {
    const tableBody = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const row = document.createElement('tr');
      row.id = 'taskRow_' + i;
      row.innerHTML = `
        <td><input type="checkbox" class="task-select" ${task.selected ? 'checked' : ''} onclick="taskManager.toggleTaskSelected(${i})"></td>
        <td>${i + 1}</td>
        <td class="task-name">${i === this.editedTaskIndex ? this.createEditableInput('edit-task-name', task.name) : task.name}</td>
        <td class="task-priority">${i === this.editedTaskIndex ? this.createEditableInput('edit-task-priority', task.priority) : task.priority}</td>
        <td class="task-status" onclick="taskManager.toggleTaskStatus(${i})" style="${this.getStatusStyle(task.status)}">${task.status}</td>
        <td class="task-action">
          ${i === this.editedTaskIndex ? this.createSaveCancelButton(i) : this.createEditButton(i)}
          <button onclick="taskManager.removeTask(${i})" class="btn btn-danger">Remove</button>
        </td>
      `;
      tableBody.appendChild(row);
    }

    this.updateSortIcons();
  }

  createEditableInput(className, value) {
    return `<input type="text" class="${className}" value="${value}">`;
  }

  createEditButton(index) {
    return `<button onclick="taskManager.editTask(${index})" class="btn btn-primary">Edit</button>`;
  }

  createSaveCancelButton(index) {
    return `
      <button onclick="taskManager.saveTask(${index}, document.querySelector('#taskRow_${index} .edit-task-name').value, parseInt(document.querySelector('#taskRow_${index} .edit-task-priority').value))" class="btn btn-success">Save</button>
      <button onclick="taskManager.cancelEditTask()" class="btn btn-secondary">Cancel</button>
    `;
  }

  isValidTaskName(name) {
    return name.trim() !== '' && !Number(name);
  }

  isValidPriority(priority) {
    return !isNaN(priority) && priority > 0;
  }

  sortTasks(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.tasks.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.renderTaskList();
  }

  updateSortIcons() {
    const nameSortIcon = document.getElementById('nameSortIcon');
    const prioritySortIcon = document.getElementById('prioritySortIcon');

    nameSortIcon.className = 'fas fa-sort';
    prioritySortIcon.className = 'fas fa-sort';

    if (this.sortColumn === 'name') {
      nameSortIcon.className = this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    } else if (this.sortColumn === 'priority') {
      prioritySortIcon.className = this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    }
  }
}

const taskManager = new TaskManager();
taskManager.renderTaskList();

function addTask() {
  const taskNameInput = document.getElementById('taskName');
  const priorityInput = document.getElementById('priority');

  const taskName = taskNameInput.value.trim();
  const priority = parseInt(priorityInput.value);

  if (!taskManager.isValidTaskName(taskName)) {
    alert('Please enter a valid task name.');
    return;
  }

  if (!taskManager.isValidPriority(priority)) {
    alert('Please enter a valid priority greater than 0.');
    return;
  }

  const task = new Task(taskName, priority);
  taskManager.addTask(task);
  taskNameInput.value = '';
  priorityInput.value = '';
}

 
