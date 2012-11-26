<?php
require "../config.php";
?>
<!doctype html>
<html>
<head>
	<title>Admin</title>
	<link href="/Html5Playground/css/admin.css" rel="stylesheet" type="text/css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script src="/Html5Playground/js/service.js" type="text/javascript"></script>
	<script src="/Html5Playground/js/local.js" type="text/javascript"></script>
</head>
<div id="container">
	<div class="holder" style="color:red"><b>There is no field validation on this form, please fill all the items with (*)</b></div>
	<div class="holder">
		<div class="text">*Title</div>
		<input type="text" id="txttitle" placeholder="Title" />
	</div>
	<div class="holder">
		<div class="text">*Description</div>
		<textarea id="txtdesc" rows="2" cols="150"></textarea>
	</div>
	<div class="holder">
		<div class="text">*Content</div>
		<textarea id="txtcontent" rows="18" cols="150"></textarea>
	</div>
	<div class="holder">
		<div class="text">*Categories (comma seperated please example: 'Audio','Media')</div>
		<input type="text" id="txtcat" placeholder="Categories" />
	</div>
	<div class="holder">
		<div class="text">*Tags (comma seperated please example: 'Audio','Media')</div>
		<input type="text" id="txttags" placeholder="Tags" />
	</div>
	<div class="holder">
	<input type="button" value="Submit" id="btnsubmit" />
	</div>
</div>
</html>
