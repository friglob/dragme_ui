<?php

$path = $_FILES['file']['tmp_name'];
$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents( $path );
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

$arr = getimagesize( $path );
$arr['base64'] = $base64;
$arr['ratio'] = $arr[0]/$arr[1];
$arr['colors'] = ["color1", "color2", "color3"];

unset($arr[0]);
unset($arr[1]);
unset($arr[2]);
unset($arr[3]);
unset($arr['mime']);
unset($arr['bits']);
unset($arr['channels']);

header('Content-Type: application/json');
echo json_encode($arr);




?>