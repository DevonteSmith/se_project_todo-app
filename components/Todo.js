class Todo {
  constructor(data, selector, { handleDelete, handleCompletedChange }) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleDelete = handleDelete;
    this._handleCompletedChange = handleCompletedChange;
  }

  _setEventListeners() {
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    const checkbox = this._todoElement.querySelector(".todo__completed");

    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._data.completed);
    });

    checkbox.addEventListener("change", (event) => {
      const wasCompleted = this._data.completed;
      this._data.completed = event.target.checked;
      this._handleCompletedChange(this._data.completed, wasCompleted);
    });
  }

  _generateCheckboxEl() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");

    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._generateCheckboxEl();
    this._setEventListeners();
    return this._todoElement;
  }
}

export default Todo;
