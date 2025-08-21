import React, { Component, type ChangeEvent, createRef } from "react";
import TodoItem,{type Todo} from './todoItem';
import ConfirmModal from "./confirmModal";
import "./todo.css";

type State = {
  todos: Todo[];
  input: string;
  error: string;
  modalOpen: boolean;
  willDeleteId: number | null;
};

const LS_KEY = "todos";

export default class B9 extends Component<object, State> {
  state: State = {
    todos: [],
    input: "",
    error: "",
    modalOpen: false,
    willDeleteId: null,
  };

  private inputRef = createRef<HTMLInputElement>();

  componentDidMount() {
    const saved: Todo[] = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    this.setState({ todos: saved });
    this.inputRef.current?.focus();
  }

  save = (todos: Todo[]) => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
    this.setState({ todos });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value, error: "" });
  };

  handleAdd = () => {
    const title = this.state.input.trim();
    if (!title) {
      this.setState({ error: "Tên công việc không được để trống" });
      return;
    }
    const exists = this.state.todos.some(
      t => t.title.toLowerCase() === title.toLowerCase()
    );
    if (exists) {
      this.setState({ error: "Tên công việc không được phép trùng" });
      return;
    }
    const next: Todo = { id: Date.now(), title, done: false };
    const todos = [ ...this.state.todos, next ];
    this.save(todos);
    this.setState({ input: "", error: "" }, () => this.inputRef.current?.focus());
  };

  handleToggle = (id: number) => {
    const todos = this.state.todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    this.save(todos);
  };

  handleEdit = (id: number) => {
    const current = this.state.todos.find(t => t.id === id);
    if (!current) return;
    const newTitle = prompt("Sửa tên công việc:", current.title)?.trim();
    if (newTitle == null) return; // cancel
    if (!newTitle) {
      alert("Tên công việc không được để trống");
      return;
    }
    const dup = this.state.todos.some(
      t => t.id !== id && t.title.toLowerCase() === newTitle.toLowerCase()
    );
    if (dup) {
      alert("Tên công việc không được phép trùng");
      return;
    }
    const todos = this.state.todos.map(t => t.id === id ? { ...t, title: newTitle } : t);
    this.save(todos);
  };

  requestDelete = (id: number) => {
    this.setState({ modalOpen: true, willDeleteId: id });
  };

  confirmDelete = () => {
    const id = this.state.willDeleteId;
    if (id == null) return;
    const todos = this.state.todos.filter(t => t.id !== id);
    this.save(todos);
    this.setState({ modalOpen: false, willDeleteId: null });
  };

  cancelDelete = () => this.setState({ modalOpen: false, willDeleteId: null });

  render() {
    const { todos, input, error, modalOpen, willDeleteId } = this.state;
    const doneCount = todos.filter(t => t.done).length;
    const total = todos.length;
    const willDelete = todos.find(t => t.id === willDeleteId);

    return (
      <div className="card">
        <h3 className="card-title">Danh sách công việc</h3>

        <div className="input-row">
          <input
            ref={this.inputRef}
            type="text"
            className={`text-input ${error ? "invalid" : ""}`}
            placeholder="Nhập tên công việc"
            value={input}
            onChange={this.handleChange}
            onKeyDown={(e) => e.key === "Enter" && this.handleAdd()}
          />
          <button className="btn primary" onClick={this.handleAdd}>Thêm</button>
        </div>

        {error && <div className="error-text">{error}</div>}

        <div className="list">
          {todos.map(t => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={this.handleToggle}
              onEdit={this.handleEdit}
              onDelete={this.requestDelete}
            />
          ))}
        </div>

        <div className="summary">Công việc đã hoàn thành: <b>{doneCount}</b> / {total}</div>

        <ConfirmModal
          open={modalOpen}
          title="Xác nhận"
          message={`Bạn có xác nhận xoá công việc < ${willDelete?.title ?? ""} > không?`}
          onCancel={this.cancelDelete}
          onConfirm={this.confirmDelete}
        />
      </div>
    );
  }
}