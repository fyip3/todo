const taskForm = document.querySelector('form');
const taskList = document.querySelector('#task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
  e.preventDefault();
  
  const taskName = document.querySelector('#task').value;
  const taskTime = document.querySelector('#time').value;
  
  if (taskName && taskTime) {
    const task = document.createElement('li');
    const taskText = document.createElement('span');
    const taskTimeText = document.createElement('span');
    const taskDelete = document.createElement('button');
    
    taskText.textContent = taskName;
    taskTimeText.textContent = taskTime;
    taskDelete.textContent = 'Delete';
    
    task.appendChild(taskText);
    task.appendChild(taskTimeText);
    task.appendChild(taskDelete);
    taskList.appendChild(task);
    
    taskDelete.addEventListener('click', () => {
      task.remove();
    });
    
    const taskDateTime = new Date();
    const taskDate = taskDateTime.toDateString();
    const taskTimeSplit = taskTime.split(':');
    taskDateTime.setHours(taskTimeSplit[0], taskTimeSplit[1], 0, 0);
    
    if (taskDateTime > Date.now()) {
      const notificationOptions = {
        body: taskName,
        icon: 'https://example.com/notification-icon.png',
        timestamp: taskDateTime.getTime()
      };
      
      const notification = new Notification(taskDate, notificationOptions);
      
      notification.addEventListener('click', () => {
        window.focus();
        notification.close();
      });
    }
  }
  
  taskForm.reset();
}
