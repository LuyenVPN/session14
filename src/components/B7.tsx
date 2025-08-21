import { Component, createRef } from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type State = {
  name: string;
  email: string;
  password: string;
  phone: string;
  errors: Partial<Record<"name" | "email" | "password", string>>;
};

export default class RegisterForm extends Component<object, State> {
  private static readonly LS_KEY = "students";
  private nameInputRef = createRef<HTMLInputElement>();

  constructor(props: object) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      errors: {},
    };
  }

  componentDidMount(): void {
    this.nameInputRef.current?.focus();
  }

  private loadStudents(): Student[] {
    try {
      return JSON.parse(localStorage.getItem(RegisterForm.LS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  private saveStudents(list: Student[]) {
    localStorage.setItem(RegisterForm.LS_KEY, JSON.stringify(list));
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((s) => ({
      ...s,
      [name]: value,
      errors: { ...s.errors, [name]: "" },
    }));
  };

  private validate(): boolean {
    const { name, email, password } = this.state;
    const errors: State["errors"] = {};

    if (!name.trim()) errors.name = "Ten sinh vien khong duoc de trong";
    if (!email.trim()) errors.email = "Email khong duoc de trong";
    if (!password.trim()) errors.password = "Mat khau khong duoc de trong";

    const existed = this.loadStudents().some(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );
    if (!errors.email && existed) {
      errors.email = "Email da ton tai";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.validate()) return;

    const { name, email, password, phone } = this.state;
    const newStudent: Student = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim() || undefined,
    };

    const students = this.loadStudents();
    students.push(newStudent);
    this.saveStudents(students);

    this.setState(
      {
        name: "",
        email: "",
        password: "",
        phone: "",
        errors: {},
      
      },
      () => this.nameInputRef.current?.focus()
    );
  };

  render() {
    const { name, email, password, phone, errors} = this.state;

    return (
      <div className="card form-md">
        <h2>Dang ky tai khoan</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Ten sinh vien</label>
          <input
            ref={this.nameInputRef}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Nhap ten sinh vien"
          />
          {errors.name && <p>{errors.name}</p>}
          <br />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="email@domain.com"
          />
          {errors.email && <p >{errors.email}</p>}
          <br />
          <label>Mat khau</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Mat khau"
          />
          {errors.password && <p>{errors.password}</p>}
          <br />
          <label>So dien thoai</label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={this.handleChange}
            placeholder="Tuy chon"
          />
          <br />
          <button type="submit">Dang ky</button>
        </form>
      </div>
    );
  }
}
