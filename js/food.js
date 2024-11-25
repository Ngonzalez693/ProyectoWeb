const accountBtn = document.getElementById('account-btn');
const accountDropdown = document.getElementById('account-dropdown');

// Mostrar/ocultar el menú de la cuenta
accountBtn.addEventListener('click', () => {
  accountDropdown.classList.toggle('hidden');
});

// Cerrar el menú al hacer clic fuera
document.addEventListener('click', (event) => {
  if (!accountBtn.contains(event.target) && !accountDropdown.contains(event.target)) {
    accountDropdown.classList.add('hidden');
  }
});

// Obtener el nombre del usuario desde localStorage
const firstName = localStorage.getItem('firstName');
const userEmail = localStorage.getItem('userEmail');

// Verificar si el nombre y email están disponibles en localStorage
if (firstName && userEmail) {
  // Mostrar el nombre del usuario en el menú
  const nameElement = document.querySelector('.account-dropdown p');
  nameElement.textContent = firstName;
} else {
  console.log('No se encontró el nombre o email del usuario en el almacenamiento local.');
}

// Función para cargar comidas almacenadas y mostrarlas en la tabla
function loadMeals() {
  const userMeals = JSON.parse(localStorage.getItem(userEmail)) || [];
  const foodList = document.getElementById('foods-list');

  // Limpiar la tabla para evitar duplicados
  foodList.innerHTML = '';

  // Agregar cada comida como una fila en la tabla
  userMeals.forEach((meal) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${meal.mealName}</td>
      <td>${meal.mealType}</td>
      <td>${meal.calories}</td>
    `;
    foodList.appendChild(newRow);
  });
}

// Llamar a la función para cargar las comidas al cargar la página
window.addEventListener('DOMContentLoaded', loadMeals);

// Manejar el envío del formulario de comidas
document.getElementById('food-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los valores del formulario de comida
  const mealName = document.getElementById('meal-name').value;
  const mealType = document.getElementById('meal-type').value;
  const calories = document.getElementById('calories').value;

  // Crear una nueva fila en la tabla de comidas
  const foodList = document.getElementById('foods-list');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${mealName}</td>
    <td>${mealType}</td>
    <td>${calories}</td>
  `;

  foodList.appendChild(newRow);

  // Obtener las comidas almacenadas en localStorage
  let userMeals = JSON.parse(localStorage.getItem(userEmail)) || [];

  // Agregar la nueva comida al arreglo
  userMeals.push({
    mealName: mealName,
    mealType: mealType,
    calories: calories,
  });

  // Guardar las comidas actualizadas en localStorage
  localStorage.setItem(userEmail, JSON.stringify(userMeals));

  // Limpiar el formulario
  document.getElementById('food-form').reset();
});
