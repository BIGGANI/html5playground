<?php
//sanitize please
function setcontact() {
	if(!isset($_POST)) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	if(!isset($_POST["name"]) || empty($_POST["name"])) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	if(!isset($_POST["email"]) || empty($_POST["email"])) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	if(!isset($_POST["resp"]) || empty($_POST["resp"])) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	$item = array(
		'name' => $_POST["name"],
		'email' => $_POST["email"],
		'response' => $_POST["resp"]
		);
	$ret = db_set($item, "contactus");
	if($ret) {
		return json_encode(array("TYPE"=>"SUCCESS", "RESULT" => $ret->{'$id'}));
	}
}
function downloadfile() {
	if(!isset($_POST)) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	if(!isset($_POST["hdncontent"]) || empty($_POST["hdncontent"])) {
		return geterror("INVALID_PARAMS",$GLOBALS["lang"],$json);
	}
	header("Content-disposition: attachment; filename=AppUp_".uniqid().".html");
	header("Content-type: text/html");
	echo $_POST["hdncontent"];
}
function getexamples() {
	$return = array();	
	$criteria = array('isexample'=> 'true');
	$fields = array('title', 'description', 'categories','tags');
	$ret = db_get($criteria, $fields, true, "content");
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
	if($ispost && !isset($_POST["id"])) {
		return geterror("INVALID_ID",$GLOBALS["lang"],$json);
	}
	$id = $_POST["id"];
	/*if($ispost) {
		$id = new MongoId($_POST["id"]);
	}
	else {
		$id = new MongoId($_GET["id"]);
	}*/
	$criteria = array("unqid" => $id);
	$ret = getcontent_criteria($criteria);
	$frt = array("TYPE"=>"SUCCESS", "RESULT" => $ret);
	if($json) {
		return json_encode($frt);
	}
	return $frt;
}
function getcontent_criteria($criteria) {
	$fields = array('unqid','title', 'description', 'categories','tags', 'content', 'md5');
	$ret = db_get($criteria, $fields, true, 'content');
	foreach($ret as $r) {
		return $r;
	}
	return false;
}
function setcontent($json = true) {
	$title = "";
	$description = "";
	$content = "";
	$categories = array();
	$tags = array();
	$isexample = false;
		
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
		$categories = explode(',',$_POST["categories"]);
	}
	if(isset($_POST["tags"])) {
		$tags = explode(',',$_POST["tags"]);
	}
	if(isset($_POST["isexample"])) {
		$isexample = $_POST["isexample"];
	}
	$uid = "";
	$md5 = md5($content);
	$row = getcontent_criteria(array("md5"=>$md5));
	if($row && isset($row['unqid'])) {
		$uid = $row["unqid"];	
	}
	else {
		$uid = uniqid(rand(),false);
		$item = array(
			'unqid' => $uid,
			'title' => $title,
			'description' => $description,
			'categories' => $categories,
			'tags' => $tags,
			'content' => $content,
			'isexample' => $isexample,
			'md5' => $md5
			);
		$ret = db_set($item, "content");
		if(!$ret) {
			return json_encode(geterror("INVALID_DB_RESULT", $GLOBALS["lang"], $json));
		}
	}
	if($uid) {
		return json_encode(array("TYPE"=>"SUCCESS", "RESULT" => $uid));
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

/* DB FUNCTIONS NEED TO GO TO A DIFFERENT FILE */


$m_connection = null;
function db_connection() {
	try {
		$GLOBALS["m_connection"] = new Mongo($GLOBALS["db_connection_string"]);
		return $GLOBALS["m_connection"]->selectDB($GLOBALS["db_name"]);
	}
	catch(MongoConnectionException $e) {
		return false;
		//log this $e
	}
}
function db_close() {
	return $GLOBALS["m_connection"]->close();
}
function db_collection_get($name) {
	try {
		$mongo = db_connection();
		if(!$mongo) {
			return false;
		}
		//very bad code need to fix, may be bson will help 
		if($name == "contactus") {
			return $mongo->contactus;	
		}
		return $mongo->content;
	}
	catch(MongoConnectionException $e) {
		return false;
		//log exception
	}
}
function db_set($item, $name = "content") {
	$ret = -1;
	try {
		$mongo = db_collection_get($name);
		if(!$mongo) {
			return false;
		}
		$mongo->insert($item);
		$ret = $item['_id'];
		db_close();
	}
	catch(exception $e) {
		return false;
		//log exception
	}
	return $ret;
}
function db_get($criteria, $fields, $findone = true, $name) {
	$ret = null;
	try {
		$mongo = db_collection_get($name);
		if(!$mongo) {
			return false;
		} 
		if(!$findone) {
			$ret = $mongo->findOne($criteria,$fields);
		}
		else {
			$ret = $mongo->find($criteria,$fields);
		}
		db_close();	
	}
	catch(exception $e) {
		//log $e
		return false;
	}
	return $ret;
}

