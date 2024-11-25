const form = document.getElementById('registration-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission
  
  // Get form data
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate inputs (basic example)
  if (!firstName || !lastName || !email || !password) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Simulate sending data to a server
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (response.ok) {
      alert('¡Cuenta creada exitosamente!');

      localStorage.setItem('firstName', firstName);
      localStorage.setItem('userEmail', email);

      window.location.href = 'login.html';
      form.reset(); // Reset form fields
    } else {
      alert('Ocurrió un error al crear la cuenta. Intenta nuevamente.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo conectar con el servidor.');
  }
});