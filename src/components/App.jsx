import css from './App.module.css';

import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './contacnform/ContactForm';
import ContactList from './contactlist/ContactList';
import Filter from './filter/Filter';

import { LS_CONTACTS_KEY } from '../constants/localStorageKeys';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  onInputChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };

  handleAddContact = (event, name, number) => {
    event.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter name and telephone number!');
      return;
    };

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };


    if (this.state.contacts.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts!`);
        return;
      };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact], 
      name: ``,
      number: ``,
    }));
  };

  filterByName = event => {
    this.setState({ filter: event.target.value });
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem(LS_CONTACTS_KEY);
    const parsedContacts = JSON.parse(stringifiedContacts) || [];
    
    if (parsedContacts.length > 0) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      const stringifieldContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem(LS_CONTACTS_KEY, stringifieldContacts);
    }
  }


  render() {
    
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={css.container}>
        <h2 className={css.title}>Phonebook</h2>

        <ContactForm
          contacts={this.state.contacts}
          onInputChange={this.onInputChange}
          handleAddContact={this.handleAddContact}
        />  

        <h2 className={css.title}>Contacts</h2>

        <Filter filter={this.state.filter} filterByName={this.filterByName}/>

        <ContactList contacts={filteredContacts} onDelete={this.handleDeleteContact}/> 


      </div>
    );
  }
}
