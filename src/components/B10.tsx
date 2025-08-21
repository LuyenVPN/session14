// src/component/exercise9.tsx
import { Component, type ChangeEvent, createRef } from "react";
import TodoItem, { type Todo } from "./todoItem";
import ConfirmModal from "./confirmModal";
import EditModal from "./editModal";
import "./todo.css";

type State = {
  todos: Todo[];
  input: string;
  error: string;


  modalOpen: boolean;
  willDeleteId: number | null;


  editOpen: boolean;
  editId: number | null;
  editError: string;
  editValue: string; 
};

const LS_KEY = "todos";

export default class B10 extends Component<object, State> {
  state: State = {
    todos: [],
    input: "",
    error: "",
    modalOpen: false,
    willDeleteId: null,
    editOpen: false,
    editId: null,
    editError: "",
    editValue: "",
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
      (t) => t.title.toLowerCase() === title.toLowerCase()
    );
    if (exists) {
      this.setState({ error: "Tên công việc không được phép trùng" });
      return;
    }
    const next: Todo = { id: Date.now(), title, done: false };
    const todos = [...this.state.todos, next];
    this.save(todos);
    this.setState({ input: "", error: "" }, () => this.inputRef.current?.focus());
  };

  handleToggle = (id: number) => {
    const todos = this.state.todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    this.save(todos);
  };

  openEdit = (id: number) => {
    const t = this.state.todos.find((x) => x.id === id);
    if (!t) return;
    this.setState({
      editOpen: true,
      editId: id,
      editValue: t.title,
      editError: "",
    });
  };

  closeEdit = () => this.setState({ editOpen: false, editId: null, editError: "" });

  confirmEdit = (newTitle: string) => {
    if (!newTitle) {
      this.setState({ editError: "Tên công việc không được để trống" });
      return;
    }
    const { editId, todos } = this.state;
    if (editId == null) return;

    const dup = todos.some(
      (t) => t.id !== editId && t.title.toLowerCase() === newTitle.toLowerCase()
    );
    if (dup) {
      this.setState({ editError: "Tên công việc không được phép trùng" });
      return;
    }

    const next = todos.map((t) =>
      t.id === editId ? { ...t, title: newTitle } : t
    );
    this.save(next);
    this.setState({ editOpen: false, editId: null, editError: "" });
  };

  requestDelete = (id: number) =>
    this.setState({ modalOpen: true, willDeleteId: id });

  confirmDelete = () => {
    const id = this.state.willDeleteId;
    if (id == null) return;
    const todos = this.state.todos.filter((t) => t.id !== id);
    this.save(todos);
    this.setState({ modalOpen: false, willDeleteId: null });
  };

  cancelDelete = () => this.setState({ modalOpen: false, willDeleteId: null });

  render() {
    const {
      todos,
      input,
      error,
      modalOpen,
      willDeleteId,
      editOpen,
      editValue,
      editError,
    } = this.state;

    const doneCount = todos.filter((t) => t.done).length;
    const total = todos.length;
    const willDelete = todos.find((t) => t.id === willDeleteId);

    const allDone = total > 0 && doneCount === total;

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
          <button className="btn primary" onClick={this.handleAdd}>
            Thêm
          </button>
        </div>

        {error && <div className="error-text">{error}</div>}

        <div className="list">
          {todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={this.handleToggle}
              onEdit={this.openEdit}
              onDelete={this.requestDelete}
            />
          ))}
        </div>

        {allDone ? (
          <div className="success-bar">
            <span className="check">✔</span>
            <span>Hoàn thành công việc</span>
          </div>
        ) : (
          <div className="summary">
            Công việc đã hoàn thành: <b>{doneCount}</b> / {total}
          </div>
        )}

        <ConfirmModal
          open={modalOpen}
          title="Xác nhận"
          message={`Bạn có xác nhận xoá công việc < ${willDelete?.title ?? ""} > không?`}
          onCancel={this.cancelDelete}
          onConfirm={this.confirmDelete}
        />

        <EditModal
          open={editOpen}
          value={editValue}
          error={editError}
          onCancel={this.closeEdit}
          onConfirm={this.confirmEdit}
        />
      </div>
    );
  }
}