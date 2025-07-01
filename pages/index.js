import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";

// Elementos del DOM
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// Abrir popup
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

// Cerrar popup
const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Generar una tarjeta de tarea usando la clase Todo
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Instancia de la clase FormValidator y activación de la validación
const validator = new FormValidator(validationConfig, addTodoForm);
validator.enableValidation();

// Escuchar botón de agregar tarea
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

// Escuchar botón de cerrar el popup
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Escuchar el envío del formulario para agregar un nuevo to-do
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Ajuste de la fecha por zona horaria
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const newTodo = {
    name,
    date,
    completed: false,
    id: uuidv4(), // ID único para nuevos to-dos
  };

  const todoElement = generateTodo(newTodo);
  todosList.prepend(todoElement);

  closeModal(addTodoPopup);
  addTodoForm.reset(); // Limpia campos
  validator.resetValidation(); // Limpia errores y desactiva el botón
});

// Renderizar los to-dos iniciales al cargar la página
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
