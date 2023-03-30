import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import {
  getlocalStorageData,
  setlocalStorageData,
  LSItem,
} from '../utils/local-storage';

const INIT_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(
    getlocalStorageData(LSItem) ?? INIT_CONTACTS
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setlocalStorageData(LSItem, contacts);
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const isNameAlreadyExist = contacts.some(contact => contact.name === name);

    if (isNameAlreadyExist) {
      alert(`'${name}' is in contacts already.`);

      return;
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const deleteContactHandler = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilterHandler = filterValue => {
    setFilter(filterValue);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm onSubmitData={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter onChangeFilter={changeFilterHandler} />
      <ContactList
        contacts={filteredContacts()}
        onDelete={deleteContactHandler}
      />
    </div>
  );
};

export default App;
