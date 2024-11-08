
//obtener el nombre del usuario
document.addEventListener('DOMContentLoaded', () => {

    const xhrNombreUsuario = new XMLHttpRequest();
    xhrNombreUsuario.open('post', '/obtener-usuario', true);
    xhrNombreUsuario.onreadystatechange = function () {
        if (xhrNombreUsuario.readyState === 4) {
            if (xhrNombreUsuario.status === 200) {
                const usuario = JSON.parse(xhrNombreUsuario.responseText);
                document.getElementById('nombreUsuario').textContent = `${usuario.Usu_NombreCompleto}`;
            }
            else {
                console.error('No se pudo poner el usario');
            }
        }
    }
    xhrNombreUsuario.send();

    const containerServicios = document.getElementById('containerServicios')
    const tablaServicios = document.getElementById('tablaServicios')
    const listaServicios = document.getElementById('listaServicios')
    const btndesplegarservicios = document.getElementById('btndesplegarservicios')

    btndesplegarservicios.addEventListener('click', () => {
        const xhrServicio = new XMLHttpRequest();
        xhrServicio.open('POST', 'obtener-servicios', true);
        xhrServicio.setRequestHeader('Content-Type', 'application/json');
        xhrServicio.onreadystatechange = function () {
            if (xhrServicio.readyState === 4) {
                if (xhrServicio.status === 200) {
                    // Corrige la J mayúscula en JSON
                    const data = JSON.parse(xhrServicio.responseText);
    
                    listaServicios.innerHTML = '';
                    data.servicios.forEach(servicio => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${servicio}</td>
                            <td><input type="checkbox" name="servicios" value="${servicio}"></td>
                        `;
                        listaServicios.appendChild(row);
                    });
    
                    containerServicios.style.display = 'block';
                } else {
                    // Mensaje de error solo si falla la solicitud
                    console.error('No se pueden cargar los servicios. Estado:', xhrServicio.status);
                }
            }
        };
        xhrServicio.send();
    });
})
