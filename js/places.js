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

// Verificar si el navegador soporta geolocalización
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    // Inicializar el mapa en la ubicación del usuario
    const map = L.map('map').setView([userLat, userLon], 13);

    // Añadir capa de mapa con OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añadir un marcador en la ubicación del usuario
    L.marker([userLat, userLon]).addTo(map)
      .bindPopup("<b>Estás aquí</b>")
      .openPopup();

    // Datos de ejemplo para lugares cercanos (parques, gimnasios, etc.)
    const nearbyPlaces = [
      { name: "Parque Central", type: "parque", lat: userLat + 0.01, lon: userLon + 0.01 },
      { name: "Gimnasio Fitness", type: "gimnasio", lat: userLat - 0.01, lon: userLon - 0.02 },
      { name: "Ruta Senderismo", type: "ruta", lat: userLat + 0.02, lon: userLon - 0.03 }
    ];

    // Función para crear un marcador personalizado según el tipo de lugar
    function createMarker(place) {
      let icon;

      // Definir los iconos según el tipo de lugar
      if (place.type === "parque") {
        icon = L.icon({
          iconUrl: '../src/parque.png',  
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
      } else if (place.type === "gimnasio") {
        icon = L.icon({
          iconUrl: '../src/gym.png', 
          iconSize: [25, 25],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
      } else if (place.type === "ruta") {
        icon = L.icon({
          iconUrl: '../src/camino.png', 
          iconSize: [28, 28],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });
      }

      // Crear el marcador y añadirlo al mapa
      L.marker([place.lat, place.lon], { icon: icon }).addTo(map)
        .bindPopup(`<b>${place.name}</b><br>Tipo: ${place.type}`);
    }

    // Añadir los marcadores para los lugares cercanos
    nearbyPlaces.forEach(place => createMarker(place));

  }, function(error) {
    alert("No se pudo obtener tu ubicación. Por favor, habilita los servicios de ubicación.");
  });
} else {
  alert("Geolocalización no soportada por tu navegador.");
}
