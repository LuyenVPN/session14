import React, { Component } from "react";

type State = {
  email: string;
  password: string;
  message: string;
};

type Student = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export default class B8 extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value, message: "" });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email.trim() || !password.trim()) {
      this.setState({ message: "Vui long nhap day du thong tin" });
      return;
    }
    const students: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
    const matched = students.find(
      (s) => s.email === email.trim() && s.password === password
    );

    if (matched) {
      this.setState({ message: "Dang nhap thanh cong" });
    } else {
      this.setState({ message: "Dang nhap that bai" });
    }
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Dang nhap tai khoan</h1>
        <label>Email</label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          placeholder="Nhap email"
        />
        <br />
        <label>Mat khau</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
          placeholder="Nhap mat khau"
        />
        <br />
        <button type="submit">Dang nhap</button>
        <br />
        {message && <div>{message}</div>}
      </form>
    );
  }
}
