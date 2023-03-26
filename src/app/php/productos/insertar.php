<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');

$params = json_decode($json);

require("../conexion.php");

//$ins = "insert into usuario (Tipo_usuario, Nombre, Correo, Clave, Celular, Direccion, Historial, Fo_Ciudad) values('preuba', 'prueba', 'prueba', sha1 ('12345'), '123', 'invitado', 'prueba', 'prueba')";

$ins= "insert into productos (nombre, cantidad, valor)values ('$params->nombre', '$params->cantidad', '$params->valor')";

mysqli_query($conexion, $ins) or die ('No inserto');

class result {}

$response = new Result ();
$response -> resultado = 'Ok';
$response -> mensaje = 'Datos grabados';

header('Content-Type: application/json');
echo json_encode($response);

?>
