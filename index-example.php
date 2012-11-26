<html>
<title>Test Page for services</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script src="js/service.js"></script>
<script language="javascript">
$(function() {
	$("#btngetexamples").click(function() {
		var pg = new playground();
		pg.getexamples(function(data, status) {alert(data.examples.length);}, function(xhr, options, error) {alert(error);});
	});
	$("#btngetcontent").click(function() {
		var pg = new playground();
		pg.getcontent("4f3c20585b39c3c818000001",function(data, status) { if (data.TYPE == "SUCCESS") {
        alert(
                data.RESULT.title + "\n" +
                data.RESULT.description + "\n" +
                data.RESULT.categories.length + "\n" +
                data.RESULT.tags.length + "\n" +
                data.RESULT.content
             );
    }
    else {
        alert("ERROR " + data.RESULT.MESSAGE);
    }
	});
	});
	$("#btnsave").click(function() {
		var pg = new playground();
//		pg.setcontent("some html5 sample test", "some sample desc", "<html><head></head><body><h1>test</h1></body></html>", '"html5","video","media","sound","visual"', '"html5","sub","video"',true, function(data,status) {alert(data.RESULT);},function(xhr,options,error) { alert(error);});		
pg.setcontent("", "", "<html><head></head><body><h1>test</h1></body></html>", '', '', true, function(data,status) {alert(data.RESULT);},function(xhr,options,error) { alert(error);});
	});
});
</script>
<h1>Samples</h1>
<input type="button" id="btnsave" value="save sample"/><br />
<input type="button" id="btngetexamples" value="alert all examples" /> <br />
<input type="button" id="btngetcontent" value="alert content for a given id" />

</html>
