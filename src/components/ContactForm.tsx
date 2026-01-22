import React, { useState } from 'react';
import styled from 'styled-components';

/* FORM STYLES */
const FormWrapper = styled.div`
  h3 {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e4e4e4;
  color: #272727;
  outline-color: black;
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #e4e4e4;
  font-size: 14px;
  color: #272727;
  outline-color: black;
`;

const Button = styled.button`
  width: 20%;
  background-color: black;
  color: white;
  border: none;
  padding: 20px 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 450px) {
    width: 50%;
  }
`;

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      `Thank You ${name} for Contacting Us.\n\nEmail: ${email}\nMessage: ${message}`
    );

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <FormWrapper>
      <h3>Get In Touch</h3>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          placeholder="Email address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextArea
          rows={10}
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button type="submit">Submit</Button>
      </Form>
    </FormWrapper>
  );
};

export default ContactForm;
