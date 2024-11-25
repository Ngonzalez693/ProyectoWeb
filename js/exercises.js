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

// Obtener el correo del usuario actual desde localStorage
const userEmail = localStorage.getItem('userEmail');

// Si no hay correo, mostrar error (aunque esto no debería suceder si el usuario está logueado correctamente)
if (!userEmail) {
  console.log("No se encontró el correo del usuario en el almacenamiento local.");
}

// Cargar datos de actividades de usuarios desde localStorage
let userActivities = JSON.parse(localStorage.getItem('userActivities')) || {};

// Asegurar que el usuario actual tiene un registro
if (!userActivities[userEmail]) {
  userActivities[userEmail] = {
    activities: [], // Lista de actividades
    sleepData: {     // Datos de sueño
      Lunes: 0, Martes: 0, Miércoles: 0, Jueves: 0,
      Viernes: 0, Sábado: 0, Domingo: 0
    }
  };
}

// Referencias al usuario actual
const currentUserData = userActivities[userEmail];

// Mostrar actividades almacenadas en la tabla al cargar la página
const activitiesList = document.getElementById('activities-list');
currentUserData.activities.forEach((activity) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${activity.exerciseType}</td>
    <td>${activity.duration} min</td>
    <td>${activity.sleepHours} horas</td>
  `;
  activitiesList.appendChild(newRow);
});

// Mostrar gráfica de sueño al cargar la página
const sleepGraph = document.getElementById('sleep-graph');
updateGraph();

// Escuchar el evento de envío del formulario
const form = document.getElementById('activity-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const exerciseType = document.getElementById('exercise-type').value;
  const duration = document.getElementById('duration').value;
  const sleepHours = parseInt(document.getElementById('sleep-hours').value, 10);
  const dayOfWeek = document.getElementById('day-of-week').value;

  // Verificar que todos los campos estén completos
  if (!exerciseType || !duration || isNaN(sleepHours) || !dayOfWeek) {
    alert("Por favor, completa todos los campos antes de registrar.");
    return;
  }

  // Actualizar las actividades
  const activity = { exerciseType, duration, sleepHours };
  currentUserData.activities.push(activity);

  // Actualizar la tabla
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${exerciseType}</td>
    <td>${duration} min</td>
    <td>${sleepHours} horas</td>
  `;
  activitiesList.appendChild(newRow);

  // Actualizar los datos de sueño
  currentUserData.sleepData[dayOfWeek] = sleepHours;

  // Actualizar la gráfica
  updateGraph();

  // Guardar los datos en localStorage
  userActivities[userEmail] = currentUserData;
  localStorage.setItem('userActivities', JSON.stringify(userActivities));

  // Limpiar el formulario
  form.reset();
});

// Función para actualizar la gráfica
function updateGraph() {
  sleepGraph.innerHTML = ''; // Limpiar gráfico anterior

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  daysOfWeek.forEach((day) => {
    // Contenedor para la barra y la etiqueta
    const barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');

    // Crear la barra
    const bar = document.createElement('div');
    bar.classList.add('bar');

    // Altura de la barra basada en los datos, o 0 si no hay datos
    const hours = currentUserData.sleepData[day] || 0;
    bar.style.height = `${hours * 10}px`; // Escalar visualmente las barras
    bar.title = `${day}: ${hours} horas`;

    // Crear la etiqueta del día
    const label = document.createElement('span');
    label.classList.add('day-label');
    label.textContent = day;

    // Ensamblar barra y etiqueta
    barContainer.appendChild(bar);
    barContainer.appendChild(label);

    // Añadir el contenedor al gráfico
    sleepGraph.appendChild(barContainer);
  });
}