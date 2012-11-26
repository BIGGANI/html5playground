<?php
function getexamples() {
	$return = array();	
	$criteria = array('categories'=> array('$exists'=>true));
	$fields = array('title', 'description', 'categories','tags');
	$ret = db_get($criteria, $fields, true);
	foreach($ret as $r) {
		$r["id"] = $r["_id"]->{'$id'};
		$r["categories"] = array($r["categories"]);
		$return[] = $r;
	}
	return json_encode(array("TYPE"=>"SUCCESS", "examples"=>$return));
}
function getcontent($ispost = true, $json = true) {
	if($ispost && !isset($_POST)) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	else if(!isset($_GET)) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	if($ispost && !isset($_POST["id"])) {
		return geterror("INVALID_ID",$GLOBALS["lang"],$json);
	}
	else if(!isset($_GET["id"])) {
		return geterror("INVALID_ID",$GLOBALS["lang"],$json);
	}
	if($ispost) {
		$id = new MongoId($_POST["id"]);
	}
	else {
		$id = new MongoId($_GET["id"]);
	}
	$criteria = array('_id'=> $id);
	$fields = array('title', 'description', 'categories','tags', 'content');
	$ret = db_get($criteria, $fields, true);
	foreach($ret as $r) {
		$ret = $r;
	}
	$frt = array("TYPE"=>"SUCCESS", "RESULT" => $ret);
	if($json) {
		return json_encode($frt);
	}
	return $frt;
}
function setcontent($json = true) {
	$title = "";
	$description = "";
	$content = "";
	$categories = array();
	$tags = array();
	
	if(!isset($_POST)) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	if(!isset($_POST["title"])) {
		return geterror("INVALID_TITLE",$GLOBALS["lang"],$json);
	}
	$title = $_POST["title"];
	if(!isset($_POST["description"])) {
		return geterror("INVALID_DESC",$GLOBALS["lang"],$json);
	}
	$description = $_POST["description"];
	if(!isset($_POST["content"])) {
		return geterror("INVALID_CONTENT",$GLOBALS["lang"],$json);
	}
	$content = $_POST["content"];
	if(isset($_POST["categories"])) {
		$categories = json_decode($_POST["categories"]);
	}
	if(isset($_POST["tags"])) {
		$tags = json_decode($_POST["tags"]);
	}
	$item = array(
		'title' => $title,
		'description' => $description,
		'categories' => $categories,
		'tags' => $tags,
		'content' => $content
		);
	$ret = db_set($item);
	if($ret) {
		return json_encode(array("TYPE"=>"SUCCESS", "RESULT" => $ret->{'$id'}));
	}
	return json_encode(geterror("INVALID_DB_RESULT", $GLOBALS["lang"], $json));
}

function geterror($error_key, $lang="en-US", $json = true) {
	$error = array("TYPE"=>"ERROR", "RESULT" => array("ERROR"=>$error_key, "MESSAGE"=>$GLOBALS["error"][$lang][$error_key] ,"LANG"=>$lang));
	if($json) {
		return json_encode($error);
	}
	return $error;
}