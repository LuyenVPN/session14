import React, { Component } from "react";

type Props = {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default class confirmModal extends Component<Props> {
  render() {
    const { open, title = "Xác nhận", message, onCancel, onConfirm } = this.props;
    if (!open) return null;
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <b>{title}</b>
            <button className="icon-btn close" onClick={onCancel}>×</button>
          </div>
          <div className="modal-body">
            <span className="danger">!</span>
            <span>{message}</span>
          </div>
          <div className="modal-footer">
            <button className="btn" onClick={onCancel}>Hủy</button>
            <button className="btn primary" onClick={onConfirm}>Đồng ý</button>
          </div>
        </div>
      </div>
    );
  }
}