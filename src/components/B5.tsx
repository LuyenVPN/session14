import React, { Component } from 'react'
type Product={
    productCode:number
    producName:string
    price:number
    quantity:number
}
type InitiaState={
    product: Product
}
export default class B5 extends Component <object, InitiaState>{
    constructor(props: object){
        super(props)
        this.state={
            product:{
                productCode:"",
                producName:"",
                price:"",
                quantity:""
            }
        }
    }
    handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(this.state.product);
        this.setState({
            product:{
                productCode:"",
                producName:"",
                price:"",
                quantity:""
            }
        })
    }
    handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target
        this.setState({
            product:{...this.state.product,[name]:value}
        })
    }
    render() {
    return (
      <div>
        <h1>Them Moi San Pham</h1>
        <form action="" onSubmit={this.handleSubmit}>
            <label htmlFor="">Ma San Pham</label>
            <br />
            <input 
            type="text" 
            onChange={this.handleChange}
            name="productCode"
            value={this.state.product.productCode}
            placeholder='SP001' />
            <br />
            <label htmlFor="">Ten San Pham</label>
            <br />
            <input 
            type="text" 
            onChange={this.handleChange}
            name="producName"
            value={this.state.product.producName}
            placeholder='Cam da xanh' />
            <br />
            <label htmlFor="">Gia</label>
            <br />
            <input 
            type="text" 
            onChange={this.handleChange}
            name="price"
            value={this.state.product.price}
            placeholder='20000' />
            <br />
            <label htmlFor="">So Luong</label>
            <br />
            <input type="number"
            onChange={this.handleChange}
            name="quantity"
            value={this.state.product.quantity}
             max={10} min={1} placeholder='10' />
            <br />
            <button>Dang ky</button>
        </form>
      </div>
    )
  }
}
