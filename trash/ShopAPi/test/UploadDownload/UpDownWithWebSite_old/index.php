<?
include("send.php");

// GET FILE LIST
$jsondata = sendToApi("list_file", "");
$array = json_decode($jsondata, TRUE);
echo "<ul>";
foreach ($array as $value) {
	echo '<li><a href="http://'.$value["url"].'">'.$value["name"].'</a></li>';
}
echo "</ul>";

//UPLOAD FILE
if (isset($_FILES['my_file']) AND $_FILES['my_file']['error'] == 0)
{
    if ($_FILES['my_file']['size'] <= 1000000)
    {
		$file_name_with_full_path = realpath($_FILES['my_file']['tmp_name']);
		echo $file_name_with_full_path;
        //$post = array('name' => $_FILES['my_file']['name'],'file_contents'=>'@'."/var/www/store_api/");
        $post = array("name" => $_FILES['my_file']['name'],"file_contents"=>file_get_contents($file_name_with_full_path));
        sendToApi("upload_file", $post);
    }
} 
else 
{
	 echo "j'ai pas de file";
}
?>

<form name="input" action="http://192.168.56.101:8080/upload_file" method="post" enctype="multipart/form-data">
	<input type="file" name="my_file"/>
	<input type="submit" value="Upload">
</form> 