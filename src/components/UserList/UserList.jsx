import ContactItems from 'components/ContactItem/ContactItem';
import FindName from 'components/Find/find';
import Form from 'components/Form/Form';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const UserList = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createUser = UserParams => {
    const { number, name } = UserParams;
    const isExistContact = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistContact) return alert('Existing Contact');

    const newUserElement = {
      name: name,
      number: number,
      id: nanoid(),
    };

    setContacts(prevContacts => [...prevContacts, newUserElement]);
  };

  const changeFilterValue = filterQuery => setFilter(filterQuery);

  const handleDelete = id => {
    return setContacts(prevContacts => {
      return prevContacts.filter(el => el.id !== id);
    });
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form createUser={createUser} />

      <h2>Contacts</h2>
      <FindName changeFilterValue={changeFilterValue} value={filter} />
      {getFilteredContacts().length > 0 && (
        <ContactItems
          contacts={getFilteredContacts()}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserList;
