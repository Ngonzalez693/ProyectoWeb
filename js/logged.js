const accountBtn = document.getElementById('account-btn');
const accountDropdown = document.getElementById('account-dropdown');

accountBtn.addEventListener('click', () => {
  accountDropdown.classList.toggle('hidden'); // Toggle visibility
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!accountBtn.contains(event.target) && !accountDropdown.contains(event.target)) {
    accountDropdown.classList.add('hidden');
  }
});

// Obtener el nombre del usuario desde localStorage
const firstName = localStorage.getItem('firstName');

// Verificar si el nombre está disponible en localStorage
if (firstName) {
  // Mostrar el nombre en el lugar indicado
  const nameElement = document.querySelector('.account-dropdown p');
  nameElement.textContent = firstName; // Cambia el texto por el nombre del usuario
} else {
  console.log('No se encontró el nombre del usuario en el almacenamiento local.');
}