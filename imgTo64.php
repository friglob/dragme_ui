<?php

$path = $_FILES['file']['tmp_name'];
$tmp = "tmp/test.jpg";
$type = pathinfo($path, PATHINFO_EXTENSION);

// Get sizes
list($width, $height) = getimagesize($path);
//obtain ratio
$imageratio = $width/$height;
$newwidth = 600;
$newheight = 600 / $imageratio; 
// Load
$thumb = imagecreatetruecolor($newwidth, $newheight);
$source = imagecreatefromjpeg($path);
// Resize
imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
// Output
imagejpeg($thumb, $tmp, 100);
imagedestroy($thumb);

$data = file_get_contents( $tmp );

$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);


$arr = getimagesize( $path );
$arr['base64'] = $base64;
$arr['ratio'] = $arr[0]/$arr[1];
$arr['colors'] = ["color1", "color2", "color3"];
$arr['filename'] = $_FILES['file']['name'];

if( $arr[0] == $arr[1] ){
	$arr['orientation'] = 'square';
}else if( $arr[0] > $arr[1] ){
	$arr['orientation'] = 'landscape';
}else{
	$arr['orientation'] = 'portrait';
}

unset($arr[0]);
unset($arr[1]);
unset($arr[2]);
unset($arr[3]);
unset($arr['mime']);
unset($arr['bits']);
unset($arr['channels']);

unlink( $tmp );

header('Content-Type: application/json');
echo json_encode($arr);




?>