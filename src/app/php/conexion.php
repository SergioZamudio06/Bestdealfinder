<?php

$servidor = "localhost";
$usuario = "root";
$clave = "";
$bd = "bestdealfider";

$conexion = mysqli_connect ($servidor, $usuario, $clave) or die ("No se conectó a MYSQL");
mysqli_select_db($conexion, $bd) or die ("No se encontró la base de datos");
?>
