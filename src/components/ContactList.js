import React, { useEffect, useState } from 'react';
import { getContacts } from '../api';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getContacts();
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            <h3>{contact.name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Subject: {contact.subject}</p>
            <p>Message: {contact.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
