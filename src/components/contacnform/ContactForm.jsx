import React, { Component } from 'react';

import css from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.handleAddContact(event, name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const  name = this.state.name;
    const number = this.state.number;

    return (
      <form className={css.contactContainer} onSubmit={this.handleSubmit}>
       
        <label htmlFor="" className={css.InputContainer}>
          <span className={css.inputtitle}>Name</span>
          <input
            onChange={this.handleInputChange}
            name='name'
            value={name}
            className={css.inputFormStyle}
            type='text'
            required
          />
        </label>

        <label htmlFor="" className={css.InputContainer}>
          <span className={css.inputtitle}>Number</span>
          <input
            onChange={this.handleInputChange}
            name='number'
            value={number}
            className={css.inputFormStyle}
            type='tel'
            required
          />
        </label>

        <button
          className={css.btnAddContact}
          type="submit"
        >
          Add contact
        </button>
      </form>
    );
  }
}
