<?php
require "../config.php";
ignore_user_abort();

if($_GET['f'] && in_array($_GET['f'], $GLOBALS["valid_functions"]))
{
	echo call_user_func($_GET['f']);
	exit();
}

echo geterror("INVALID_RPC", $GLOBALS["lang"], true);
