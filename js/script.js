'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

if (!localStorage.toDoList){
  localStorage.toDoList = JSON.stringify([]);
}

let readTodoLIst = function () {
  return JSON.parse(localStorage.toDoList);
};

let writeTodoList = function (data) {
  localStorage.toDoList = JSON.stringify(data);
};

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent  = '';

  JSON.parse(localStorage.toDoList).forEach(function(item, index){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function(){
      let data = readTodoLIst();
      data[index].completed = !item.completed;
      writeTodoList(data);
      render();
      return;
    });

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function(){
      let data = readTodoLIst();
      data.splice(index, 1);
      writeTodoList(data);
      li.remove();
      render();
      return;
    });
  });

};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  if (headerInput.value === '') {
      return;
  }
  const newTodo = {

    value: headerInput.value,
    completed: false
  };
  let result = readTodoLIst();
  result.push(newTodo);
  writeTodoList(result);
  render();

  headerInput.value = '';
});

render();
