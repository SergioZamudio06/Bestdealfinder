<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$json = file_get_contents('php://input');

$params = json_decode($json);
$id = $_GET['id'];

require("../conexion.php");
if (!is_null($params)){
  $editar= "UPDATE usuario SET nombre='$params->nombre', cantidad='$params->cantidad',valor='$params->valor' WHERE id_productos= $id";

  mysqli_query($conexion, $editar) or die ('No editó');

}


class result {}

$response = new Result ();
$response -> resultado = 'Ok';
$response -> mensaje = 'Datos modificados';

header('Content-Type: application/json');
echo json_encode($response);

?>
