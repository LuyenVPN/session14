import React, { Component } from 'react'
type InitiaState={
    user: User
}
type User={
    email:string,
    password:string
}
export default class Demo extends Component<object, InitiaState> {
  constructor(props:object){
    super(props)
    this.state={
        user:{
            email:"",
            password:""
        }
    }
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // In ra gia tri nhap khong dau
  console.log("gia tri nhap", this.state.user)
  // Reset form dung setState
  this.setState({
    user: {
      email: "",
      password: ""
    }
  })
}
  handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=e.target;
    this.setState({
        user:{...this.state.user,[name]:value}
    })
  }
    render() {
    return (
      <div>
        form dung ki thuat controll
        <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="">Email</label>
            <input 
            type="text" 
            onChange={this.handleChange}
            name="email"
            value={this.state.user.email}
             />
            <br />
            <label htmlFor="">PassWord</label>
            <input 
            type="text" 
            onChange={this.handleChange} 
            name="password"
            value={this.state.user.password}/>
            
            <button>Dang nhap</button>
        </form>
      </div>
    )
  }
}
