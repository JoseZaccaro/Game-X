import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
 
export default class PaymentForm extends React.Component {
  state = {
      creditCardData:{
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        },
  };
 
  handleInputFocus = (e) => {
    this.setState({
        ...this.state,
        creditCardData:{
            ...this.state.creditCardData,
            focus: e.target.name }})
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target    
    this.setState({
        ...this.state,
        creditCardData:{
            ...this.state.creditCardData,
            [name]: value }})
  }

  
  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.creditCardData.cvc}
          expiry={this.state.creditCardData.expiry}
          focused={this.state.creditCardData.focus}
          name={this.state.creditCardData.name}
          number={this.state.creditCardData.number}
        />        
        <form>
        	<input
            type="tel"
            name="number"
            maxLength='16'
            placeholder="Card Number"
            autoComplete="false"
            autoFocus={true}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="tel"
            name="name"
            placeholder="Owner Name"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="tel"
            name="expiry"
            maxLength='4'
            placeholder="Valid Thru"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input
            type="tel"
            name="cvc"
            id="cvc"
            maxLength='3'
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />

        </form>
      </div>
    );
  }
}