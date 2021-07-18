import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';
import ContactList from 'components/ContactList/ContactList';
import SearchContact from 'components/SearchContact/SearchContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: uuidv4(),
    };
    if (contacts.find(savedContact => savedContact.name === name)) {
      toast.error(`${name} is already in contacts`);
    } else {
      setContacts(contacts => [...contacts, contact]);
      toast.success('New contact added successfully!');
    }
  };

  const handleSearch = e => {
    setFilter(e.target.value);
  };

  const handleDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <PhonebookForm handleSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <SearchContact value={filter} inputChange={handleSearch} />
      <ContactList
        contacts={getFiltredContacts()}
        handleDelete={handleDelete}
      />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
