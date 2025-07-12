import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// DOM
const addTodoButton = document.querySelector(".button_action_add");
const counterSelector = ".counter__text";
const formElement = document.forms["add-todo-form"];
const formValidator = new FormValidator(validationConfig, formElement);
formValidator.enableValidation();

// Contador
const todoCounter = new TodoCounter(initialTodos, counterSelector);

// Funciones para mantener separación
function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

// Crear tarea visual
const createTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

// Función reutilizable para renderizar un todo
const renderTodo = (item) => {
  const todoElement = createTodo(item);
  todoSection.addItem(todoElement);
};

// Sección de tareas
const todoSection = new Section(
  {
    items: initialTodos,
    renderer: renderTodo,
  },
  ".todos__list"
);

todoSection.renderItems();

// Popup
const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const name = formData["name"];
  const dateInput = formData["date"];
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const newTodo = {
    name,
    date,
    completed: false,
    id: uuidv4(),
  };

  renderTodo(newTodo);
  todoCounter.updateTotal(true); // ✅ sumar nueva tarea
  addTodoPopup.close();
  formValidator.resetValidation(); // ✅ desactiva botón, limpia errores
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
