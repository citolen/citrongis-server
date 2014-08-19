<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
  </head>

<body>
	<table class="table table-bordered">
	<tr> 
		<td>Name</td>
		<td>Comment</td>
		<td>Version</td>
		<td>Path On Server</td>
		<td>Dependency</td>
		<td>Action</td>
	</tr>

	<?php
		include("send.php");
		$jsondata = sendToApi("list_file", "");
		$array = json_decode($jsondata, TRUE);
		echo $jsondata;
		foreach ($array as $value) {
			$path = "../" . $value["path"] . $value["filename"];
			echo '<tr>
			<td>'. $value["name"] .'</td>
			<td>'. $value["comment"] .'</td>
			<td>'. $value["version"] .'</td>
			<td>'. $path .'</td>
			<td><a href="'. $path .'"><button type="button" class="btn btn-success">Download</button></a></td></tr>';
		}
	?>
	</table>
	<a href="index.php"><button type="button" class="btn btn-primary">Return</button></a>
</body>