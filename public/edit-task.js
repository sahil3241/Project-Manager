const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const taskDeadlineDOM = document.querySelector('.task-edit-deadline');
const taskTaskDOM = document.querySelector('.task-edit-task');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName, tempDeadline, tempTask;

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id: taskID, completed, name, deadline, task: taskDescription } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    taskDeadlineDOM.value = deadline ? new Date(deadline).toISOString().split('T')[0] : '';
    tempDeadline = deadline;
    taskTaskDOM.value = taskDescription;
    tempTask = taskDescription;

    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...';
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    const taskDeadline = taskDeadlineDOM.value;
    const taskTask = taskTaskDOM.value;

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
      deadline: taskDeadline,
      task: taskTask,
    });

    const { _id: taskID, completed, name, deadline, task: taskDescription } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    taskDeadlineDOM.value = deadline ? new Date(deadline).toISOString().split('T')[0] : '';
    tempDeadline = deadline;
    taskTaskDOM.value = taskDescription;
    tempTask = taskDescription;

    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `Success, edited task`;
    formAlertDOM.classList.add('text-success');
  } catch (error) {
    console.error(error);
    taskNameDOM.value = tempName;
    taskDeadlineDOM.value = tempDeadline ? new Date(tempDeadline).toISOString().split('T')[0] : '';
    taskTaskDOM.value = tempTask;
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = `Error, please try again`;
  }
  editBtnDOM.textContent = 'Edit';
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
