import ContactItems from 'components/ContactItem/ContactItem';
import FindName from 'components/Find/find';
import Form from 'components/Form/Form';
import { Component } from 'react';
import { nanoid } from 'nanoid';

class UserList extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const storedData = localStorage.getItem('contacts');
    if (storedData) {
      this.setState({ contacts: JSON.parse(storedData) });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createUser = body => {
    const isExistContact = this.state.contacts.find(
      el => el.name.toLowerCase() === body.name.toLowerCase()
    );

    if (isExistContact) return alert('Existing Contact');

    const newUserElement = {
      ...body,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newUserElement],
    }));
  };

  changeFilterValue = filterQuery => {
    this.setState({ filter: filterQuery });
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filtered = this.getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <Form createUser={this.createUser} />

        <h2>Contacts</h2>
        <FindName
          changeFilterValue={this.changeFilterValue}
          value={this.state.filter}
        />
        {filtered.length > 0 && (
          <ContactItems contacts={filtered} handleDelete={this.handleDelete} />
        )}
      </div>
    );
  }
}

export default UserList;
