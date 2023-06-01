import React, { useEffect, useState } from 'react';
import sendEmail from '../services/sendEmail';

const MessageForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);

  const body = { name, email, message }
  const func = { setName, setEmail, setMessage, setError, setSucess }

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [error, setError]);

  useEffect(() => {
    if (sucess) {
      const timeout = setTimeout(() => {
        setSucess(false);
      }, 7000);

      return () => clearTimeout(timeout);
    }
  }, [sucess, setSucess]);

  return (
    <div className="message-form-container">
      <div className="message-form-bg" />
      <form className="message-form">
        <div>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            name="message"
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            className="submmit-message-btn"
            type="submit"
            onClick={
              (event) => sendEmail(event, body, func)
            }>
            Enviar ✉
          </button>
          {error && <p className='error-message shake-error'>{error}</p>}
          {sucess && <p className='sucess-message fade-in'>{sucess}</p>}
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
