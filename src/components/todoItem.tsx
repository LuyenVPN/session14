import React, { Component} from "react";

export type Todo = { id: number; title: string; done: boolean };

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default class TodoItem extends Component<Props> {
  handleCheck = () => {
  this.props.onToggle(this.props.todo.id);
};


  render() {
    const { todo, onEdit, onDelete } = this.props;
    return (
      <div className="todo-row">
        <label className="todo-label">
          <input type="checkbox" checked={todo.done} onChange={this.handleCheck} />
          <span className={todo.done ? "done" : ""}>{todo.title}</span>
        </label>
        <div className="actions">
          <button className="icon-btn edit" title="Sửa" onClick={() => onEdit(todo.id)}>✏️</button>
          <button className="icon-btn delete" title="Xóa" onClick={() => onDelete(todo.id)}>🗑️</button>
        </div>
      </div>
    );
  }
}