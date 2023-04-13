<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');

$params = json_decode($json);
$id = $_GET['id'];

require("../conexion.php");
if (!is_null($params)) {
  $editar= "UPDATE usuario SET Tipo_usuario='$params->Tipo_usuario', Nombre='$params->Nombre',Correo='$params->Correo', Clave=$params->Clave, Celular= '$params->Celular', Direccion= '$params->Direccion' WHERE id_usuario= $id";

  mysqli_query($conexion, $editar) or die ('No editó');
}


class result {}

$response = new Result ();
$response -> resultado = 'OK';
$response -> mensaje = 'Datos modificados';

header('Content-Type: application/json');
echo json_encode($response);

?>
