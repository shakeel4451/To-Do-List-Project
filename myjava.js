// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event listener
addTaskBtn.addEventListener('click', addTask);

// Clear all tasks event listener
clearAllBtn.addEventListener('click', clearAllTasks);

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskElement(task.text, task.completed));
}

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskElement(taskText);
        saveTask(taskText);
        taskInput.value = ''; // Clear input field
    }
}

// Function to create and add a task element to the DOM
// Function to create and add a task element to the DOM
function addTaskElement(text, completed = false) {
  const li = document.createElement('li');
  li.className = completed ? 'completed' : '';
  
  // Create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed; // Set the checkbox based on task completion status
  checkbox.addEventListener('change', () => {
      toggleComplete(li, text); // Toggle completion status on checkbox change
  });
  
  // Create task text span
  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = text;

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', (e) => deleteTask(e, li, text));

  // Append checkbox, task text, and delete button to the list item
  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  
  taskList.appendChild(li);
}


// Function to toggle task completion
function toggleComplete(li, text) {
  li.classList.toggle('completed');
  const completed = li.classList.contains('completed');
  updateTaskStatus(text, completed);
  
  // Update checkbox state
  const checkbox = li.querySelector('input[type="checkbox"]');
  if (checkbox) {
      checkbox.checked = completed;
  }
}


// Function to delete a task
function deleteTask(e, li, text) {
    e.stopPropagation(); // Prevent toggleComplete from running
    taskList.removeChild(li);
    removeTask(text);
}

// Function to save task to local storage
function saveTask(text) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update task status in local storage
function updateTaskStatus(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.text === text);
    if (task) {
        task.completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Function to remove task from local storage
function removeTask(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to clear all tasks
function clearAllTasks() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}
