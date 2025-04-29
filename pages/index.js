import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todoTemplate = document.querySelector("#todo-template");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", {
    handleDelete: (wasCompleted) => {
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
      todoCounter.updateTotal(false);
    },
    handleCompletedChange: (isCompleted, wasCompleted) => {
      if (isCompleted && !wasCompleted) {
        todoCounter.updateCompleted(true);
      } else if (!isCompleted && wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  });
  return todo.getView();
};

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const popupWithForm = new PopupWithForm("#add-todo-popup", (formData) => {
  const date = new Date(formData.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = {
    id: uuidv4(),
    name: formData.name,
    date: date,
    completed: false,
  };

  const todo = generateTodo(values);
  section.addItem(todo, true);
  todoCounter.updateTotal(true);
  popupWithForm.close();
  formValidator.resetValidation();
});

popupWithForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});

const addTodoForm = document.forms["add-todo-form"];
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();
