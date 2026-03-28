
emailjs.init({
        publicKey: "Ui0tbnmMyenB9dz2E",
      });

const form = document.querySelector('#subscribe-form');
const emailInput = document.querySelector('#email');
const submitButton = form.querySelector('button[type="submit"]');
const message = document.querySelector('#message');

const showMessage = (text, isError = false) => {
  message.textContent = text;
  message.style.color = isError ? '#c33' : '#2a7';
};

const isValidEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
};

const sendEmail = async (email) => {
  const response = await emailjs.send('service_nycuokb', 'template_tvg8r9n', { email})
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    showMessage('Please enter your email address.', true);
    emailInput.focus();
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('Please enter a valid email address (e.g. you@example.com).', true);
    emailInput.focus();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  showMessage('');

  try {
    await sendEmail(email);
    showMessage('Thanks! You will be notified when we launch.');
    form.reset();
  } catch (error) {
    console.error(error);
    showMessage('Oops! Something went wrong. Please try again later.', true);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Notify Me';
  }
});
