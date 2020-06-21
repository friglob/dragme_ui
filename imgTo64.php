<?php

$path = $_FILES['file']['tmp_name'];
$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents( $path );
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

$arr = getimagesize( $path );
$arr['base64'] = $base64;

header('Content-Type: application/json');
echo json_encode($arr);

?>