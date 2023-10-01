import React from 'react';
import { Component } from 'react';
import SectionForm from './Form.styled';

class Form extends Component {
  state = {
    // id: '',
    number: '',
    name: '',
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.createUser(this.state);
    this.setState({
      number: '',
      name: '',
    });
  };

  render() {
    return (
      <SectionForm>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name"> Name </label>
            <input
              id="name"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="phone"> Number </label>
            <input
              id="phone"
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
              value={this.state.number}
            />
          </div>

          <button type="submit"> Add contact </button>
        </form>
      </SectionForm>
    );
  }
}

export default Form;
