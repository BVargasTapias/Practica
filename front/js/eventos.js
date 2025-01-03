//obtener el nombre del usuario
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

  const containerServicios = document.getElementById("containerServicios");
  const tablaServicios = document.getElementById("tablaServicios");
  const listaServicios = document.getElementById("listaServicios");
  const btndesplegarservicios = document.getElementById(
    "btndesplegarservicios"
  );

  btndesplegarservicios.addEventListener("click", () => {
    const xhrServicio = new XMLHttpRequest();
    xhrServicio.open("POST", "obtener-servicios", true);
    xhrServicio.setRequestHeader("Content-Type", "application/json");
    xhrServicio.onreadystatechange = function () {
      if (xhrServicio.readyState === 4) {
        if (xhrServicio.status === 200) {
          // Corrige la J mayúscula en JSON
          const data = JSON.parse(xhrServicio.responseText);
          //console.log(data);

          listaServicios.innerHTML = "";
          data.forEach((servicio) => {
            //console.log(servicio);

            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${servicio.Ser_Nombre}</td>
            <td><input type="checkbox" name="servicios" value="${servicio.ID_Servicios}"></td>
            <td style= "display: none;">${servicio.ID_Servicios}</td>

                        `;
            listaServicios.appendChild(row);
          });

          containerServicios.style.display = "block";
        } else {
          // Mensaje de error solo si falla la solicitud
          console.error(
            "No se pueden cargar los servicios. Estado:",
            xhrServicio.status
          );
        }
      }
    };
    xhrServicio.send();
  });

  //Evento para enviar los servicios seleccionados

  const formularioSeleccionDeServicio = document.getElementById(
    "formularioSeleccionDeServicio"
  );

  formularioSeleccionDeServicio.addEventListener("submit", async (event) => {
    event.preventDefault();


    const serviciosSeleccionados = Array.from(
      formularioSeleccionDeServicio.elements["servicios"]
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

  
    const fh = formularioSeleccionDeServicio.elements["fecha_hora"].value;

   
    if (serviciosSeleccionados.length === 0 || !fh) {
      alert("Debe seleccionar al menos un servicio y especificar una fecha y hora.");
      return;
    }

    try {
      
      const response = await fetch("guardar-servicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          servicios: serviciosSeleccionados,
          fecha_hora: fh,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Servicios guardados con éxito.");
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error("Error al guardar los servicios:", response.status, errorText);
        alert("No se pudieron guardar los servicios. Intente de nuevo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al procesar la solicitud. Intente más tarde.");
    }
  });

  //Evento para enviar los servicios guardados
  const btnServiciosGuardados = document.getElementById(
    "btnserviciosguardados"
  );
  const serviciosGuardadosContainer = document.getElementById(
    "servicios-guardados-container"
  );
  const listaServiciosGuardados = document.getElementById(
    "lista-servicios-guardados"
  );
  btnServiciosGuardados.addEventListener("click", () => {

    const xhrobtenerServiciosGuardados = new XMLHttpRequest();
    xhrobtenerServiciosGuardados.open(
      "post",
      "/obtener-servicios-guardados",
      true
    );
    xhrobtenerServiciosGuardados.onreadystatechange = function () {
      if (
        xhrobtenerServiciosGuardados.readyState === 4 &&
        xhrobtenerServiciosGuardados.status === 200
      ) {
        const data = JSON.parse(xhrobtenerServiciosGuardados.responseText);
        listaServiciosGuardados.innerHTML = data.serviciosGuardados
          .map(
            (servicio) => `
          
          <tr>
      <td>${servicio.Nombre}</td>
      <td>${servicio.Fecha}</td>
      <td><button onclick="eliminarServicio(${servicio.ID})">Eliminar</button></td>
      </tr>
          
          `
          )
          .join('');
        serviciosGuardadosContainer.style.display = "block";
      } else {
        console.error("Error al obtener servicios guardados");
      }
    };
    xhrobtenerServiciosGuardados.send();
  });


  // Cerrar sesion
  const btnCerrarSesion = document.getElementById("btncerrarsesion");

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

  
  

});

function eliminarServicio(ID) {
  const xhrEliminarServicio = new XMLHttpRequest();
  xhrEliminarServicio.open(
    "delete",
    `/eliminar-servicio/${ID}`,
    true
  );
  xhrEliminarServicio.setRequestHeader('Content-Type', 'application/json');
  xhrEliminarServicio.onreadystatechange = function () {
    if (
      xhrEliminarServicio.readyState === 4) {
      if (xhrEliminarServicio.status === 200) {
        alert("Solicitud Eliminada");
        window.location.reload();
      }

    } else {
      console.error("Error al eliminar solicitud");
    }
  };
  xhrEliminarServicio.send();
}


const selectManzana = document.getElementById("manzana");

selectManzana.addEventListener("click", function () {
  console.log("Se le dio click al select");
  if (selectManzana.options.length > 1) {
    return; 
  }

  const xhrManzanas = new XMLHttpRequest();
  xhrManzanas.open("post", "/manzanas", true);
  xhrManzanas.onreadystatechange = function () {
    if (xhrManzanas.readyState === 4) {
      if (xhrManzanas.status === 200) {
        const manzanas = JSON.parse(xhrManzanas.responseText);
        console.log(manzanas);
        selectManzana.innerHTML = "";

      
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione una manzana";
        selectManzana.appendChild(defaultOption);

        manzanas.forEach((manzana) => {
          const option = document.createElement("option");
          option.value = manzana.ID_Manzanas;
          option.textContent = manzana.Man_Nombre;
          selectManzana.appendChild(option);
        });
      } else {
        console.error("No se pudieron cargar las manzanas desde la base de datos");
      }
    }
  };
  xhrManzanas.send();
});

