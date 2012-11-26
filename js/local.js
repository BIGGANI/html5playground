$(function () {
    $("#btnsubmit").click(function () {
        var pg = new playground();
        pg.setcontent($("#txttitle").val(), $("#txtdesc").val(), $("#txtcontent").val(), $("#txttags").val(), $("#txtcat").val(), true
        , function (data, status) {
            if (data.TYPE == "SUCCESS") {
                alert("Example created in the DB, the ID: " + data.RESULT);
                reset();
            }
            else {
                alert("ERROR " + data.RESULT.MESSAGE);
            }
        },
        function (xhr, options, error) {
            alert(xhr + " " + error);
        }
        );
    });
});

function reset() {
    $("#txttitle").val('');
    $("#txtdesc").val('');
    $("#txtcontent").val('');
    $("#txttags").val('');
    $("#txtcat").val('');
}