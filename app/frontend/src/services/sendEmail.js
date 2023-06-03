import mailgun from 'mailgun-js';

const sendEmail = (event, body, func) => {
  event.preventDefault()
  
  if (body.name === '' || body.email === '' || body.message === '') {
    func.setError('Por favor, preencha todos os campos.');
    return;
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(body.email)) {
    func.setError('Por favor, insira um endereço de e-mail válido.');
    return;
  }

  const data = {
    from: `${body.name} <${body.email}>`,
    to: 'italo@linuxmail.org',
    subject: 'Contato do portifolio',
    text: body.message
  };
  const apiKey = process.env.REACT_APP_MAILGUN_API_KEY;
  const domain = process.env.REACT_APP_MAILGUN_DOMAIN;
  const mg = mailgun({ apiKey: apiKey, domain: domain });

  mg.messages().send(data, (error) => {
    if (error) {
      func.setError('Tente novamente mais tarde')
      return;
    } else {
      func.setSucess('Mensagem enviada com sucesso! Obrigado pelo contato!');
      func.setName('')
      func.setEmail('')
      func.setMessage('')
    }
  });
  func.setError(false);
};

export default sendEmail;