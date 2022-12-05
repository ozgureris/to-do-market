const newTask = document.querySelector('.input-item');
const addButton = document.querySelector('.btn-add');
const taskList = document.querySelector('.task-list');

addButton.addEventListener('click', addTask);
taskList.addEventListener('click', taskDeleteComplete);
document.addEventListener('DOMContentLoaded', readLocal);


function taskDeleteComplete(e){
    e.preventDefault();

    const tiklananBtn = e.target;
    const gonnaDelete = tiklananBtn.parentElement.children[0].innerText;

    deleteLocalStorage(gonnaDelete);

    if(tiklananBtn.classList.contains('btn-done')){
        tiklananBtn.parentElement.classList.toggle('task-completed')
    }
    else if(tiklananBtn.classList.contains('btn-delete')){

        tiklananBtn.parentElement.classList.toggle('fade');
        
        tiklananBtn.parentElement.addEventListener('transitionend', function(){
            tiklananBtn.parentElement.remove();
        });
    }
}

function addTask(e){ 
    e.preventDefault();

    if(newTask.value.length > 0){
        createTaskItem(newTask.value);
        savetoLocal(newTask.value);

        newTask.value = '';
    }else{
        alert('Boş görev tanımı!')
    }
};

function localtoArray(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function savetoLocal (newTask){
    let tasks = localtoArray();

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function readLocal (){
    let tasks = localtoArray();

    tasks.forEach(function(task){
        createTaskItem(task);
    });
}

function createTaskItem(task){
    // div oluşturma
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');

    // li oluştırma
    const taskLi = document.createElement('li');
    taskLi.classList.add('task-desc');
    taskLi.innerText = task;
    taskDiv.appendChild(taskLi);

    //buttonların oluşturulması
    const taskCompletedBtn = document.createElement('button');
    taskCompletedBtn.classList.add('btn');
    taskCompletedBtn.classList.add('btn-done');
    taskCompletedBtn.innerHTML = '<i class="fa-solid fa-check-to-slot">';
    taskDiv.appendChild(taskCompletedBtn);


    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.classList.add('btn');
    taskDeleteBtn.classList.add('btn-delete');
    taskDeleteBtn.innerHTML = '<i class="fa-solid fa-broom"></i>';
    taskDiv.appendChild(taskDeleteBtn);

    taskList.appendChild(taskDiv);
}

function deleteLocalStorage(task){
    let tasks = localtoArray();

    const gonnaDeleteIndex = tasks.indexOf(task);

    tasks.splice(gonnaDeleteIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}