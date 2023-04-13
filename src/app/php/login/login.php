<?php
header ('Access-Control-Allow-Origin: *');
header ("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//$user = $_GET['user'];
//$cla = $_GET['clave'];
$json = file_get_contents('php://input');

$params = json_decode($json);

require("../conexion.php");

if (!is_null($params)) {
  $con= "SELECT * from usuario WHERE Correo='$params->Correo' AND Clave='$params->Clave'";
  $res = mysqli_query($conexion, $con) or die ('No consultó usuarios');

  $vec=[];
  while ($reg=mysqli_fetch_array($res))
  {
      $vec[]=$reg;
  }

  if($vec==[]){
    $vec[0]= array("validar" => "usuario o correo inválido");
  }else{
    $vec[0]['validar'] = "valida";
  // array_push($vec[0],"valida");
  }

  $cad=json_encode($vec);
  echo $cad;
  header ('Content-Type: application/json');
}



?>
