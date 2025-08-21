import React, { Component } from 'react'

type StateType = {
  gender: string
}

export default class B6 extends Component<object, StateType> {
  constructor(props: object) {
    super(props)
    this.state = {
      gender: ""
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ gender: e.target.value })
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("gioi tinh duoc chon:", this.state.gender)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Gioi tinh: {this.state.gender}</label>
        <br />
        <input
          type="radio"
          name="gender"
          value="Nam"
          checked={this.state.gender === "Nam"}
          onChange={this.handleChange}
        /> Nam
        <br />
        <input
          type="radio"
          name="gender"
          value="Nu"
          checked={this.state.gender === "Nu"}
          onChange={this.handleChange}
        /> Nu
        <br />
        <input
          type="radio"
          name="gender"
          value="Khac"
          checked={this.state.gender === "Khac"}
          onChange={this.handleChange}
        /> Khac
        <br />
        <button>Submit</button>
      </form>
    )
  }
}
