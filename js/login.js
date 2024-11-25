// JavaScript for handling login
const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission
  
  // Get input values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Basic validation
  if (!email || !password) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Simulate login request
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      console.log('Inicio de sesión exitoso.');
      window.location.href = 'logged.html'; // Redirect to a dashboard or main page
    } else {
      alert('Credenciales incorrectas. Intenta nuevamente.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo conectar con el servidor.');
  }
});