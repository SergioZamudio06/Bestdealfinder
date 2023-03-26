<?php
header ('Access-Control-Allow-Origin: *');
header ("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");
if (isset($_GET['id'])) {
  $id = $_GET['id'];
  $del = "DELETE from usuario WHERE id_usuario=$id";
  mysqli_query($conexion,$del) or die ("No eliminó");
}



class Result {}

$response = new Result();
$response->resultado = 'OK';
$response->mensaje ='Usuario borrado';

header('Content-Type: application/json');
echo json_encode($response);

?>
