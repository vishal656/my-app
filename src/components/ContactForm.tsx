import { useState, type FormEvent, type ChangeEvent } from 'react';

const ContactForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(
      `Thank You ${name} for Contacting Us.\n\nEmail: ${email}\nMessage: ${message}`
    );

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <h3 className="text-[26px] font-semibold mb-[40px]">Get In Touch</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
          className="p-[15px] border-2 border-gray-200 text-[#272727] focus:outline-black"
        />

        <input
          type="email"
          placeholder="Email address *"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
          className="p-[15px] border-2 border-gray-200 text-[#272727] focus:outline-black"
        />

        <textarea
          rows={10}
          placeholder="Your Message"
          value={message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          className="p-[15px] border-2 border-gray-200 text-[14px] text-[#272727] focus:outline-black"
        />

        <button
          type="submit"
          className="w-1/5 bg-black text-white border-none py-[20px] px-[5px] uppercase font-medium text-[14px] cursor-pointer
                     max-[450px]:w-1/2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
