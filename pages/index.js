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

// Contador
const todoCounter = new TodoCounter(initialTodos, counterSelector);

// Crear tarea visual
const createTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Sección de tareas
const todoSection = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todoElement = createTodo(item);
      todoSection.addItem(todoElement);
    },
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

  const todoElement = createTodo(newTodo);
  todoSection.addItem(todoElement);
  updateCounter();
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const formElement = document.forms["add-todo-form"];
const formValidator = new FormValidator(validationConfig, formElement);
formValidator.enableValidation();

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("todo__completed")) {
    updateCounter();
  }
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo__delete-btn")) {
    setTimeout(updateCounter, 0);
  }
});

// Counter
function updateCounter() {
  const total = document.querySelectorAll(".todo").length;
  const completed = document.querySelectorAll(
    ".todo__completed:checked"
  ).length;
  todoCounter.render(total, completed);
}
