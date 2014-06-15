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
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<form role="form" name="input" action="http://192.168.56.101:8080/upload_file" method="post" enctype="multipart/form-data">
  				<div class="form-group">
    				<label for="name">Name</label>
    				<input type="text" class="form-control" id="name" name="name" placeholder="Enter name">
 				</div>
 		 		<div class="form-group">
    				<label for="comment">Comment</label>
    				<input type="text" class="form-control" id="Comment" placeholder="Comment" name="comment">
				</div>
				<div class="form-group">
    				<label for="version">version</label>
    				<input type="text" class="form-control" id="version" placeholder="version" name="version">
				</div>
				<div class="form-group">
    				<label for="Dependency">Dependency</label>
    				<input type="text" class="form-control" id="Dependency" placeholder="Dependency" name="dependency">
				</div>
				<div class="form-group">
				    <label for="exampleInputFile">File</label>
				    <input type="file" id="exampleInputFile" name="my_file">
				</div>
				<button type="submit" class="btn btn-success">Submit</button>
			</form>
		</div>
	</div>
	<a href="index.php"><button type="button" class="btn btn-primary">Return</button></a>
</body>