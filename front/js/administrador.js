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
        containerCrearManzana.style.display = "none";
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
        xhrenviarServicioCreado.open("POST", "/asignar-servicio-manzana", true);
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









    // Evento Crear Manzana
    const btnCrearManzana = document.getElementById("btnCrearManzana")
    btnCrearManzana.addEventListener("click", () => {
        containerServicios.style.display = "none";
        containerManzanas.style.display = "block";
        containerUsuarios.style.display = "none";
        containerCrearManzana.style.display = "none";
        agregarServicio.style.display = "none";

        const xhrobtenerManzanas = new XMLHttpRequest();
        xhrobtenerManzanas.open("get", "/obtener-manzanas", true);
        xhrobtenerManzanas.onreadystatechange = function () {
            if (xhrobtenerManzanas.readyState === 4) {
                if (xhrobtenerManzanas.status === 200) {
                    const data = JSON.parse(xhrobtenerManzanas.responseText);
                    listaManzanas.innerHTML = data.manzanasGuardadas
                        .map((manzana) => `
            <tr>
              <td>${manzana.Nombre}</td>
              <td>
                <button onclick="agregarManzana(${manzana.IDM})">Agregar Servicio</button>
                <button onclick="eliminarManzana(${manzana.IDM})">Eliminar</button>
              </td>
            </tr>
            `).join('');
                    containerServicios.style.display = "none";
                    containerCrear.style.display = "none";
                } else {
                    console.error("Error al obtener servicios guardados");
                }
            }
        };
        xhrobtenerManzanas.send();
    });





    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    btnCerrarSesion.addEventListener("click", async () => {
        try {
            const response = await fetch("/cerrar-sesion", {
                method: "POST",
            });

            if (response.ok) {
                alert("Sesión cerrada con éxito.");
                window.location.href = "./inicio.html";
            } else {
                alert("Error al cerrar la sesión. Intente de nuevo.");
            }
        } catch (error) {
            console.error("Error al cerrar la sesión:", error);
            alert("Ocurrió un error. Intente más tarde.");
        }
    });


    //Evento para enviar servicio a la base de datos
    /*document.getElementById("servicioAgregado").addEventListener("click", function() {
        const selectedServicios = [];
        const checkboxes = document.querySelectorAll('input[name="servicios"]:checked');
        
        checkboxes.forEach((checkbox) => {
            selectedServicios.push(checkbox.value);
        });
    
        if (selectedServicios.length > 0) {
            const IDManzana = IDM; // Aquí tomamos el ID de la manzana de la variable IDM
            
            const data = {
                servicios: selectedServicios,
                manzana: IDManzana
            };
    
            const xhrAgregar = new XMLHttpRequest();
            xhrAgregar.open("POST", "/agregar-servicio-manzana", true);
            xhrAgregar.setRequestHeader("Content-Type", "application/json");
    
            xhrAgregar.onreadystatechange = function () {
                if (xhrAgregar.readyState === 4) {
                    if (xhrAgregar.status === 200) {
                        alert("Servicios agregados correctamente.");
                        // Aquí puedes actualizar la UI si es necesario
                    } else {
                        console.error("Error al agregar los servicios.");
                    }
                }
            };
    
            xhrAgregar.send(JSON.stringify(data));
        } else {
            alert("Por favor, selecciona al menos un servicio.");
        }
    });*/
    






});

const CrearManzana = document.getElementById("CrearManzana")
CrearManzana.addEventListener("click", () => {
    containerCrearManzana.style.display = "block";
    containerManzanas.style.display = "none";
});



const enviarManzana = document.getElementById("enviarManzana");
enviarManzana.addEventListener("click", () => {

    const nombreManzana = document.getElementById("nombreManzana").value;
    const ubicacionManzana = document.getElementById("ubicacionManzana").value;

    const datos = {
        nombreManzana,
        ubicacionManzana
    };


    const xhrenviarManzanaCreada = new XMLHttpRequest();
    xhrenviarManzanaCreada.open("POST", "/crear-manzana", true);
    xhrenviarManzanaCreada.setRequestHeader("Content-Type", "application/json");
    xhrenviarManzanaCreada.onreadystatechange = function () {
        if (xhrenviarManzanaCreada.readyState === 4) {
            if (xhrenviarManzanaCreada.status === 200) {
                alert("Manzana Agregada");
                window.location.reload();
            } else {
                console.error("Error al agreagar la manzana");
            }
        }
    };

    xhrenviarManzanaCreada.send(JSON.stringify(datos));
});

//Evento para traer los servicios
function agregarManzana(IDM) {
    // Guardamos el ID de la manzana para usarlo más adelante
    const manzanaID = IDM;

    agregarServicio.style.display = "block";
    containerManzanas.style.display = "none";
    const servicioAgregar = document.getElementById("servicioAgregar");

    // Llamamos al backend para obtener los servicios
    const xhrAgregarServicio = new XMLHttpRequest();
    xhrAgregarServicio.open("post", "/agregar-servicio", true);
    xhrAgregarServicio.setRequestHeader("Content-Type", "application/json");

    xhrAgregarServicio.onreadystatechange = function () {
        if (xhrAgregarServicio.readyState === 4) {
            if (xhrAgregarServicio.status === 200) {
                const servicios = JSON.parse(xhrAgregarServicio.responseText);
                console.log(servicios); // Aquí verás los servicios obtenidos del backend

                const listaServicios2 = document.getElementById("listaServicios2");
                listaServicios2.innerHTML = ""; // Limpiar lista antes de agregar los servicios

                servicios.forEach((servicio) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${servicio.Ser_Nombre}</td>
                        <td><input type="checkbox" name="servicios" value="${servicio.ID_Servicios}"></td>
                        <td style="display: none;">${servicio.ID_Servicios}</td>
                    `;
                    listaServicios2.appendChild(row);
                });

            } else {
                console.error("No se pudieron cargar los servicios de la base de datos");
            }
        }
    };

    xhrAgregarServicio.send(); // No necesitas enviar nada en este caso, solo obtienes los servicios

    // Aquí agregamos el evento para enviar los servicios seleccionados
    document.getElementById("servicioAgregado").addEventListener("click", function() {
        const selectedServicios = [];
        const checkboxes = document.querySelectorAll('input[name="servicios"]:checked');
        
        checkboxes.forEach((checkbox) => {
            selectedServicios.push(checkbox.value);
        });

        if (selectedServicios.length > 0) {
            // Aquí tomamos el ID de la manzana desde la variable manzanaID
            const data = {
                servicios: selectedServicios,
                manzana: manzanaID // Usamos la variable manzanaID aquí
            };

            const xhrAgregar = new XMLHttpRequest();
            xhrAgregar.open("POST", "/agregar-servicio-manzana", true);
            xhrAgregar.setRequestHeader("Content-Type", "application/json");

            xhrAgregar.onreadystatechange = function () {
                if (xhrAgregar.readyState === 4) {
                    if (xhrAgregar.status === 200) {
                        alert("Servicios agregados correctamente.");
                        window.location.reload();
                        // Aquí puedes actualizar la UI si es necesario
                    } else {
                        console.error("Error al agregar los servicios.");
                    }
                }
            };

            xhrAgregar.send(JSON.stringify(data));
        } else {
            alert("Por favor, selecciona al menos un servicio.");
        }
    });
}






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

