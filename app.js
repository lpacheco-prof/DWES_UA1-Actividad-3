/*
    Desarrollo de Aplicaciones Wen Entorno Servidor
    Nombre: Luis Miguel
    Apellidos: Pacheco Donayre
*/

// Clave API de Flickr
const apiKey = '3afe652c68e6fc2dba0e53c40146534c';
// Secreto: d1851a66f91e6a29

function cargarSeccion(seccion) {
    let contenido = document.getElementById('contenido');

    if (seccion === 'inicio') {
        contenido.innerHTML = `
            <h2>Bienvenido a nuestra SPA conectada a la API de Flickr</h2>
            <p>Esta es la sección de inicio. ¡Gracias por visitarnos!</p>
        `;
    } else if (seccion === 'galeria') {
        contenido.innerHTML = `
            <h2>Galería de Imágenes</h2>
            <input type="text" id="termino" placeholder="Buscar imágenes...">
            <button onclick="buscarImagenes()">Buscar</button>
            <div id="imagenes"></div>
        `;
    } else if (seccion === 'contacto') {
        contenido.innerHTML = `
            <h2>Contacto</h2>
            <p>Puedes contactarnos a través del formulario o llamarnos al 987654321.</p>
        `;
    }
}

function buscarImagenes() {
    let termino = document.getElementById('termino').value;
    let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${termino}&format=json&nojsoncallback=1&per_page=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarImagenes(data.photos.photo))
        .catch(error => console.log('Error:', error));
}

function mostrarImagenes(fotos) {
    let imagenesDiv = document.getElementById('imagenes');
    imagenesDiv.innerHTML = ''; // Limpiar resultados anteriores

    fotos.forEach(foto => {
        let urlFoto = `https://live.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_q.jpg`;
        imagenesDiv.innerHTML += `<img src="${urlFoto}" alt="${foto.title}">`;
    });
}
