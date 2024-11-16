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

INSERT INTO Manzanas (Man_Nombre, Man_Direccion) 
VALUES 
    ('Manzana A', 'Calle 1'),
    ('Manzana B', 'Calle 2'),
    ('Manzana C', 'Calle 3');

DELETE FROM MANZANAS WHERE Man_Nombre = 'Manzana C'