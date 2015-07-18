var RS = require('./RS');

var todosLoaded = false;
var nextId = new Date().getTime();
var TODO_LOAD_DELAY = 2000;

module.exports =  {
    getTodos() {
        todosLoaded || setTimeout(() => (RS.get('todos') && RS.get('todos').length > 0) || RS.set('todos', [{id:1, description: 'Do something'}, {id:2, description: 'Do something else'}]), TODO_LOAD_DELAY);
        todosLoaded = true;
        return RS.get('todos');
    },

    getIncompleteTodos() {
        return RS.get('todos').filter(todo => todo.complete !== true);
    },

    addTodo(data) {
        var tempId = nextId++;
        RS.set('todos', RS.get('todos').concat(_.extend(data, {tempId: tempId})));
        setTimeout(() => RS.set('todos', RS.get('todos').map(todo => todo.tempId === tempId ? _.extend(todo, {id: todo.tempId}) : todo)), 2000);
    },
    deleteTodo(id) {
        RS.set('todos', RS.get('todos').filter(todo => todo.id !== id));
    },

    toggleTodoComplete(id) {
        RS.set('todos', RS.get('todos').map(todo => todo.id === id ? _.extend(todo, {complete:!todo.complete}) : todo));
    }
};