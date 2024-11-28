INSERT INTO Servicios (Ser_Nombre, Ser_Descripcion) VALUES
('Limpieza', 'Servicio de limpieza general'),
('Jardinería', 'Cuidado de jardines y plantas'),
('Transporte', 'Servicios de mudanza y transporte'),
('Plomería', 'Reparaciones de fontanería'),
('Electricidad', 'Servicios eléctricos y reparaciones'),
('Pintura', 'Pintura de interiores y exteriores'),
('Mantenimiento', 'Servicios de mantenimiento general');

INSERT INTO Manzanas (Man_Nombre, Man_Direccion) VALUES
('Bosa', 'Calle Falsa 123'),
('Suba', 'Avenida Principal 456'),
('Chapinero', 'Boulevard de la Paz 789'),
('Soacha', 'se logro');

INSERT INTO servicios_manzanas (FK_ID_Servicios, FK_ID_Manzanas) VALUES
(1, 1),  -- Limpieza en Bosa
(1, 2),  -- Limpieza en Suba
(2, 1),  -- Jardinería en Bosa
(2, 3),  -- Jardinería en Chapinero
(3, 1),  -- Transporte en Bosa
(3, 2),  -- Transporte en Suba
(4, 1),  -- Plomería en Bosa
(5, 3),  -- Electricidad en Chapinero
(6, 2),  -- Pintura en Suba
(7, 3);  -- Mantenimiento en Chapinero


DELETE from usuario

ALTER TABLE usuario AUTO_INCREMENT = 0;

SELECT servicios.Ser_Nombre, Solicitudes.Sol_FechaHora, Solicitudes.ID_Solicitudes FROM servicios INNER JOIN  servicios_manzanas ON servicios_manzanas.FK_ID_Servicios = servicios.ID_Servicios INNER JOIN manzanas ON servicios_manzanas.FK_ID_Manzanas = manzanas.ID_Manzanas INNER JOIN usuario ON manzanas.ID_Manzanas = usuario.FK_ID_Manzanas INNER JOIN solicitudes ON usuario.ID_Usuario = solicitudes.FK_ID_Usuario WHERE solicitudes.FK_ID_Usuario = 1 AND servicios.ID_Servicios = solicitudes.Sol_CodigoServicio;


INSERT INTO Usuario (
    Usu_TipoDocumento, 
    Usu_NumeroDocumento, 
    Usu_NombreCompleto, 
    Usu_Rol, 
    Usu_Telefono, 
    Usu_CorreoElectronico, 
    Usu_Direccion, 
    Usu_Ocupacion, 
    FK_ID_Manzanas
) 
VALUES
('CC', 1234567892, 'Juan Pérez', 'Administrador', '3001234567', 'juan.perez@email.com', 'Calle 123 #45-67', 'Ingeniero', 1),
('TI', 987654325, 'Ana Gómez', 'Usuario', '3017654321', 'ana.gomez@email.com', 'Carrera 45 #67-89', 'Estudiante', 2),
('CC', 1122334487, 'Carlos López', 'Usuario', '3023456789', 'carlos.lopez@email.com', 'Avenida 67 #12-34', 'Contador', 3),
('TI', 5566778894, 'Lucía Ramírez', 'Administrador', '3039876543', 'lucia.ramirez@email.com', 'Calle 89 #23-45', 'Médica', 4),
('CC', 998877663, 'Mariana Torres', NULL, '3046543210', 'mariana.torres@email.com', 'Transversal 10 #56-78', 'Diseñadora', 4),
('CC', 1000851035, 'Brian Fernando Vargas Tapias', NULL, '3046543210', 'mariana.torres@email.com', 'Transversal 10 #56-78', 'Diseñadora', 4);



INSERT INTO Usuario (
    Usu_TipoDocumento, 
    Usu_NumeroDocumento, 
    Usu_NombreCompleto, 
    Usu_Rol, 
    Usu_Telefono, 
    Usu_CorreoElectronico, 
    Usu_Direccion, 
    Usu_Ocupacion, 
    FK_ID_Manzanas
) 
VALUES
('CC', 1000851035, 'Brian Fernando Vargas Tapias', NULL, '3046543210', 'mariana.torres@email.com', 'Transversal 10 #56-78', 'Diseñadora', 4);


DELETE FROM usuario;

SELECT Usu_NumeroDocumento FROM Usuario WHERE Usu_NumeroDocumento IN (1234567890, 9876543210, 1122334455, 5566778899, 9988776655);


INSERT INTO Manzanas (Man_Nombre, Man_Direccion) VALUES
('Soacha', 'Calle Falsa 124'),

SELECT * FROM usuario

SELECT manzanas.Man_Nombre FROM manzanas INNER JOIN usuario ON usuario.FK_ID_Manzanas = manzanas.ID_Manzanas WHERE FK_ID_Manzanas = 1;

SELECT * FROM Usuario WHERE ID_Usuario = 1

SELECT manzanas.ID_Manzanas FROM manzanas WHERE Man_Nombre = "bosa"