document.addEventListener('DOMContentLoaded', function() {
    fetch('https://script.google.com/macros/s/AKfycbx0DQU0RDqy2xTA8vzCrcBmL4HTS4ml3yHoVmqhWpkISoP3V_AtZBrmaIcZM07EYGo/exec')
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data); // Log fetched data to debug

        let taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear current list

        if (!Array.isArray(data)) {
            console.error('Unexpected data format:', data);
            return;
        }

        data.forEach((task, index) => {
            let li = document.createElement('li');
            let isChecked = localStorage.getItem(`task_${index}`) === 'true';

            li.innerHTML = `
                <input type="checkbox" id="task_${index}" ${isChecked ? 'checked' : ''}> 
                <label for="task_${index}"><strong>${task.task}</strong></label>
                <p class="task-description">${task.description || ''}</p>
            `;
            
            taskList.appendChild(li);

            li.querySelector('input').addEventListener('change', (e) => {
                localStorage.setItem(`task_${index}`, e.target.checked);
            });
        });
    })
    .catch(error => console.error('Error fetching tasks:', error));
});
