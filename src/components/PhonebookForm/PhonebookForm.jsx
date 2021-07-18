import { useState } from 'react';
import { Form, BtnAddContact, Input } from './PhonebookForm.styles';

function PhonebookForm({ handleSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSetUserInfo = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleAddContact = e => {
    e.preventDefault();
    handleSubmit({ name, number });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form autocomplete="off" onSubmit={handleAddContact}>
      <label>
        <p>Name</p>
        <Input
          onChange={handleSetUserInfo}
          value={name}
          type="text"
          name="name"
          autocomplete="off"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label>
        <p>Number</p>
        <Input
          onChange={handleSetUserInfo}
          value={number}
          type="tel"
          name="number"
          autocomplete="off"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <BtnAddContact type="submit">Add contact</BtnAddContact>
    </Form>
  );
}

export default PhonebookForm;
