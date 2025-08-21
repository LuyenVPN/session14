import { Component, type ChangeEvent } from "react";

type Props = {
  open: boolean;
  value: string;                
  onCancel: () => void;
  onConfirm: (newValue: string) => void; 
  error?: string;                           
};

type State = { value: string };

export default class editModal extends Component<Props, State> {
  state: State = { value: this.props.value };

  componentDidUpdate(prev: Props) {
    if ((prev.open !== this.props.open && this.props.open) || prev.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleOK = () => {
    this.props.onConfirm(this.state.value.trim());
  };

  render() {
    const { open, onCancel, error } = this.props;
    if (!open) return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <b>Cập nhật công việc</b>
            <button className="icon-btn close" onClick={onCancel}>×</button>
          </div>

          <div className="modal-body" style={{ display: "block" }}>
            <div className="field-label">Tên công việc</div>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            {error && <div className="modal-error">{error}</div>}
          </div>

          <div className="modal-footer">
            <button className="btn" onClick={onCancel}>Hủy</button>
            <button className="btn primary" onClick={this.handleOK}>Đồng ý</button>
          </div>
        </div>
      </div>
    );
  }
}