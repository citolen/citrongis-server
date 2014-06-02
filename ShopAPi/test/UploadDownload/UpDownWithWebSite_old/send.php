<?php
$Url = "http://192.168.56.101:8080/";

function sendToApi($path, $phpData)
{
  $jsonData = json_encode($phpData);
  $ch = getCurlInstance($path, $jsonData);
  $response = curl_exec($ch);
  if($response === FALSE){
   echo curl_error($ch);
  }
  return ($response);
}

function getCurlInstance($path, $jsonData)
{
  global $Url;
  $ch = curl_init($Url . $path);
  curl_setopt_array($ch, array(
  			       CURLOPT_POST => TRUE,
  			       CURLOPT_RETURNTRANSFER => TRUE,
  			       CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
  			       CURLOPT_POSTFIELDS => $jsonData
  			       ));
  return ($ch);
}

?>