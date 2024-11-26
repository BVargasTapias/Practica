document.addEventListener("DOMContentLoaded", () => {

    const xhrNombreUsuario = new XMLHttpRequest();
    xhrNombreUsuario.open("post", "/obtener-usuario", true);
    xhrNombreUsuario.onreadystatechange = function () {
        if (xhrNombreUsuario.readyState === 4) {
            if (xhrNombreUsuario.status === 200) {
                const usuario = JSON.parse(xhrNombreUsuario.responseText);
                document.getElementById(
                    "nombreUsuario"
                ).textContent = `${usuario.Usu_NombreCompleto}`;
            } else {
                console.error("No se pudo poner el usario");
            }
        }
    };
    xhrNombreUsuario.send();


    const btnUsuarios = document.getElementById("btnUsuarios")
    btnUsuarios.addEventListener("click", () => {
        const xhrobtenerUsuarios = new XMLHttpRequest();
        xhrobtenerUsuarios.open("get", "/usuarios", true);
        xhrobtenerUsuarios.onreadystatechange = function () {
            if (xhrobtenerUsuarios.readyState === 4) {
                if (xhrobtenerUsuarios.status === 200) {
                    const data = JSON.parse(xhrobtenerUsuarios.responseText);
                    listaUsuarios.innerHTML = data.usuariosGuardados
                        .map((usuario) => `
            <tr>
              <td>${usuario.Nombre}</td>
              <td>
                <button onclick="modificarUsuario(${usuario.IDU})">Modificar</button>
                <button onclick="eliminarUsuario(${usuario.IDU})">Eliminar</button>
              </td>
            </tr>
            `).join('');
                    containerUsuarios.style.display = "block";
                } else {
                    console.error("Error al obtener servicios guardados");
                }
            }
        };
        xhrobtenerUsuarios.send();
    });


})

function modificarUsuario(IDU) {
    const containermodificar = document.getElementById("containermodificar");
    const formModificar = document.getElementById("formModificar");

    // Ocultar la lista de usuarios y mostrar el formulario de edición
    containerUsuarios.style.display = "none";
    containermodificar.style.display = "block";

    const xhrmodificarUsuario = new XMLHttpRequest();
    xhrmodificarUsuario.open("GET", `/modificar-usuario/${IDU}`, true);

    xhrmodificarUsuario.onreadystatechange = function () {
        if (xhrmodificarUsuario.readyState === 4) {
            if (xhrmodificarUsuario.status === 200) {
                const data = JSON.parse(xhrmodificarUsuario.responseText).modificarDatos[0];
                if (data) {
                    // Rellenar los campos del formulario
                    document.getElementById("nombre").value = data.Nombre;
                    document.getElementById("email").value = data.Correo;
                    document.getElementById("rol").value = data.Rol;
                    document.getElementById("telefono").value = data.Telefono;
                    document.getElementById("direccion").value = data.Direccion;
                    document.getElementById("ocupacion").value = data.Ocupacion;

                    // Guardar el ID del usuario en el formulario para referencia
                    formModificar.dataset.id = IDU;
                } else {
                    console.error("No se encontraron datos para este usuario.");
                }
            } else {
                console.error("Error al obtener los datos del usuario.");
            }
        }
    };

    xhrmodificarUsuario.send();
}


document.getElementById("btnGuardarCambios").addEventListener("click", function () {
    const formModificar = document.getElementById("formModificar");
    const IDU = formModificar.dataset.id;

    const datosActualizados = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("email").value,
        rol: document.getElementById("rol").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        ocupacion: document.getElementById("ocupacion").value,
    };

    const xhrActualizar = new XMLHttpRequest();
    xhrActualizar.open("PUT", `/modificar-usuario/${IDU}`, true);
    xhrActualizar.setRequestHeader("Content-Type", "application/json");

    xhrActualizar.onreadystatechange = function () {
        if (xhrActualizar.readyState === 4) {
            if (xhrActualizar.status === 200) {
                alert("Usuario actualizado con éxito");
                containermodificar.style.display = "none";
                containerUsuarios.style.display = "block";
                // Puedes recargar la lista de usuarios aquí
            } else {
                console.error("Error al actualizar los datos del usuario.");
            }
        }
    };

    xhrActualizar.send(JSON.stringify(datosActualizados));
});
