fetch('data/datos.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('titulo_pagina').textContent = data.titulo_pagina;

        document.getElementById('datos_tienda').innerHTML = `
            <p><strong>Nombre:</strong> ${data.datos_tienda.nombre}</p>
            <p><strong>Correo:</strong> ${data.datos_tienda.correo}</p>
            <p><strong>Teléfono:</strong> ${data.datos_tienda.telefono}</p>
            <p><strong>Dirección:</strong> ${data.datos_tienda.direccion}</p>
        `;

        document.getElementById('horario_atencion').innerHTML = `
            <p><strong>Lunes a Viernes:</strong> ${data.datos_tienda.horario_atencion.lunes_a_viernes}</p>
            <p><strong>Sábados:</strong> ${data.datos_tienda.horario_atencion.sabados}</p>
            <p><strong>Domingos:</strong> ${data.datos_tienda.horario_atencion.domingos}</p>
        `;

        const productosContainer = document.getElementById('productos');
        productosContainer.innerHTML = '';
        data.productos.forEach(producto => {
            let productoHTML = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${producto.imagenes[0]}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text"><strong>Precio:</strong> $${producto.precio.toFixed(2)}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            ${producto.reseñas.map(reseña => `
                                <li class="list-group-item">
                                    <strong>${reseña.usuario}</strong>: ${reseña.comentario} <br>
                                    <small>Calificación: ${reseña.calificacion} - Fecha: ${reseña.fecha}</small>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
            productosContainer.innerHTML += productoHTML;
        });

        const reseñasContainer = document.getElementById('reseñas');
        reseñasContainer.innerHTML = '';
        data.reseñas_destacadas.forEach(reseña => {
            let reseñaHTML = `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${reseña.usuario}</h5>
                            <p class="card-text">${reseña.comentario}</p>
                            <p class="card-text"><strong>Producto:</strong> ${reseña.producto}</p>
                            <p class="card-text"><strong>Calificación:</strong> ${reseña.calificacion}</p>
                        </div>
                    </div>
                </div>
            `;
            reseñasContainer.innerHTML += reseñaHTML;
        });
    })
    .catch(error => console.error('Error cargando los datos:', error));
