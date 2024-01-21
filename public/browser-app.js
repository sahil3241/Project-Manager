const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible';
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks');
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No projects in your list</h5>';
      loadingDOM.style.visibility = 'hidden';
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name, deadline, task: taskDescription } = task;
        return `<div class="single-task ${completed && 'task-completed'}">
          <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
          <p><strong>Deadline:</strong> ${new Date(deadline).toLocaleDateString()}</p>
          <p><strong>Task:</strong> ${taskDescription}</p>
          <div class="task-links">
            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">
              <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
      })
      .join('');
    tasksDOM.innerHTML = allTasks;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = 'hidden';
};

showTasks()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;
  const deadlineInput = document.querySelector('.deadline-input'); // replace with the actual class or ID of your deadline input field
  const taskDescriptionInput = document.querySelector('.task-description-input'); // replace with the actual class or ID of your task description input field

  const deadline = deadlineInput.value;
  const taskDescription = taskDescriptionInput.value;
  const completed = false;

  try {
    // Submit the task with additional properties
    await axios.post('/api/v1/tasks', { name, deadline, task: taskDescription, completed });

    // Refresh the list of tasks
    showTasks();

    // Clear the input fields
    taskInputDOM.value = '';
    deadlineInput.value = ''; // Clear the deadline input field
    taskDescriptionInput.value = ''; // Clear the task description input field

    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Success, Project added';
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = 'Error, please try again';
  }

  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 300);
});