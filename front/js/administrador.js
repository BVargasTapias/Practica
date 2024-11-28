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
                    containermodificar.style.display = "none";
                    containerServicios.style.display = "none";
                    containerUsuarios.style.display = "block";
                    containerCrear.style.display = "none";
                } else {
                    console.error("Error al obtener servicios guardados");
                }
            }
        };
        xhrobtenerUsuarios.send();
    });



    const btnServicios = document.getElementById("btnServicios")
    btnServicios.addEventListener("click", () => {
        const xhrobtenerServicios = new XMLHttpRequest();
        xhrobtenerServicios.open("get", "/servicios", true);
        xhrobtenerServicios.onreadystatechange = function () {
            if (xhrobtenerServicios.readyState === 4) {
                if (xhrobtenerServicios.status === 200) {
                    const data = JSON.parse(xhrobtenerServicios.responseText);
                    listaServicios.innerHTML = data.serviciosGuardados
                        .map((servicios) => `
                <tr>
                  <td>${servicios.Nombre}</td>
                  <td>${servicios.Descripcion}</td>
                  <td>
                    <button onclick="eliminarServicio(${servicios.IDS})">Eliminar</button>
                  </td>
                </tr>
                `).join('');
                    containerCrear.style.display = "none";
                    containermodificar.style.display = "none";
                    containerUsuarios.style.display = "none";
                    containerServicios.style.display = "block";
                } else {
                    console.error("Error al obtener servicios guardados");
                }
            }
        };
        xhrobtenerServicios.send();
    });

    const btncrearServicios = document.getElementById("crearServicio")
    btncrearServicios.addEventListener("click", () => {
        containerServicios.style.display = "none";
        containerCrear.style.display = "block";
    });

    const enviarServicio = document.getElementById("enviarServicio");
    enviarServicio.addEventListener("click", () => {

        const nombreServicio = document.getElementById("nombreServicio").value;
        const descripcionServicio = document.getElementById("descripcionServicio").value;

        const datos = {
            nombreServicio,
            descripcionServicio
        };


        const xhrenviarServicioCreado = new XMLHttpRequest();
        xhrenviarServicioCreado.open("POST", "/crear-servicio", true);
        xhrenviarServicioCreado.setRequestHeader("Content-Type", "application/json");
        xhrenviarServicioCreado.onreadystatechange = function () {
            if (xhrenviarServicioCreado.readyState === 4) {
                if (xhrenviarServicioCreado.status === 200) {
                    alert("Servicio agregado");
                    window.location.reload();
                } else {
                    console.error("Error al guardar el servicio");
                }
            }
        };

        xhrenviarServicioCreado.send(JSON.stringify(datos));
    });

});

function modificarUsuario(IDU) {
    const containermodificar = document.getElementById("containermodificar");
    const formModificar = document.getElementById("formModificar");

    containerUsuarios.style.display = "none";
    containermodificar.style.display = "block";

    const xhrmodificarUsuario = new XMLHttpRequest();
    xhrmodificarUsuario.open("GET", `/modificar-usuario/${IDU}`, true);

    xhrmodificarUsuario.onreadystatechange = function () {
        if (xhrmodificarUsuario.readyState === 4) {
            if (xhrmodificarUsuario.status === 200) {
                const data = JSON.parse(xhrmodificarUsuario.responseText).modificarDatos[0];
                const data2 = JSON.parse(xhrmodificarUsuario.responseText).modificarManzana[0];
                if (data, data2) {
                    document.getElementById("nombre").value = data.Nombre;
                    document.getElementById("email").value = data.Correo;
                    document.getElementById("rol").value = data.Rol;
                    document.getElementById("telefono").value = data.Telefono;
                    document.getElementById("direccion").value = data.Direccion;
                    document.getElementById("ocupacion").value = data.Ocupacion;
                    document.getElementById("manzana").value = data2.Manzana;

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
        manzana: document.getElementById("manzana").value
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
            } else {
                console.error("Error al actualizar los datos del usuario.");
            }
        }
    };

    xhrActualizar.send(JSON.stringify(datosActualizados));
});


function eliminarServicio(IDS) {
    const xhrEliminarServicioBase = new XMLHttpRequest();
    xhrEliminarServicioBase.open(
        "delete",
        `/eliminar-servicio-base/${IDS}`,
        true
    );
    xhrEliminarServicioBase.setRequestHeader('Content-Type', 'application/json');
    xhrEliminarServicioBase.onreadystatechange = function () {
        if (
            xhrEliminarServicioBase.readyState === 4) {
            if (xhrEliminarServicioBase.status === 200) {
                alert("Servicio Eliminadp");
                window.location.reload();
            }

        } else {
            console.error("Error al eliminar el servicio");
        }
    };
    xhrEliminarServicioBase.send();
}

function eliminarUsuario(IDU) {
    const xhrEliminarServicioBase = new XMLHttpRequest();
    xhrEliminarServicioBase.open(
        "delete",
        `/eliminar-usuario/${IDU}`,
        true
    );
    xhrEliminarServicioBase.setRequestHeader('Content-Type', 'application/json');
    xhrEliminarServicioBase.onreadystatechange = function () {
        if (
            xhrEliminarServicioBase.readyState === 4) {
            if (xhrEliminarServicioBase.status === 200) {
                alert("Usuario eliminado");
                window.location.reload();
            }

        } else {
            console.error("Error al eliminar el servicio");
        }
    };
    xhrEliminarServicioBase.send();
}