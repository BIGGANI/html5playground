<?php
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
function db_collection_get() {
	try {
		$mongo = db_connection();
		if(!$mongo) {
			return false;
		}
		return $mongo->items;	
	}
	catch(MongoConnectionException $e) {
		return false;
		//log exception
	}
}
function db_set($item) {
	$ret = -1;
	try {
		$mongo = db_collection_get();
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
function db_get($criteria, $fields, $findone = true) {
	$ret = null;
	try {
		$mongo = db_collection_get();
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

