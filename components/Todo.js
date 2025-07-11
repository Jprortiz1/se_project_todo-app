export default class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._name = data.name;
    this._id = data.id;
    this._completed = data.completed;
    this._due = data.date || null;
    this._templateSelector = templateSelector;

    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._checkboxLabel.classList.toggle("todo__label_checked");
      this._handleCheck(this._checkbox.checked); // ✅ actualizado
    });

    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
      this._handleDelete(this._checkbox.checked); // ✅ actualizado
    });
  }

  getView() {
    this._element = this._getTemplate();

    this._checkbox = this._element.querySelector(".todo__completed");
    this._checkboxLabel = this._element.querySelector(".todo__label");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");
    const nameEl = this._element.querySelector(".todo__name");
    const dateEl = this._element.querySelector(".todo__date");

    this._checkbox.id = `todo-${this._id}`;
    this._checkboxLabel.setAttribute("for", this._checkbox.id);
    nameEl.textContent = this._name;
    this._checkbox.checked = this._completed;

    if (this._completed) {
      this._checkboxLabel.classList.add("todo__label_checked");
    }

    if (this._due) {
      const dueDate = new Date(this._due);
      if (!isNaN(dueDate)) {
        dateEl.textContent = `Due: ${dueDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }

    this._setEventListeners();

    return this._element;
  }
}
