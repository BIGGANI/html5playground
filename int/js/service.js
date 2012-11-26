    playground = function () {
    this.url = "/service/index.php";
    this.type = "POST";
    this.alt = "json";
    this.data = "";
}
playground.prototype.doAJAX = function(successCB, errorCB) {
    $.ajax({
        url: this.url,
        type: this.type,
        dataType: this.alt,
        crossDomain: false,
        success: successCB,
        error: errorCB,
        cache: false,
        data:this.data
    });
}
playground.prototype.getexamples = function (successCB, errorCB) {
    this.url += "?f=getexamples";
    this.doAJAX(successCB, errorCB);
}
playground.prototype.getexamplessuccessCB = function (data, status) {
    if (data.TYPE == "SUCCESS") {
        alert("SUCCESS" + data.RESULT.length);
    }
    else {
        alert("ERROR " + data.RESULT.MESSAGE);
    }
}
playground.prototype.getexampleserrorCB = function (xhr, options, error) {
    alert(xhr + " " + error);
}
playground.prototype.getcontent = function (id, successCB, errorCB) {
    this.url += "?f=getcontent";
    this.data = "id=" + id;
    this.doAJAX(successCB, errorCB);
}
playground.prototype.getcontentsuccessCB = function (data, status) {
    if (data.TYPE == "SUCCESS") {
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
}
playground.prototype.getcontenterrorCB = function (xhr, options, error) {
    alert(xhr + " " + error);
}
playground.prototype.setcontent = function (title, desc, content, tags, cats, successCB, errorCB) {
    this.url += "?f=setcontent";
    this.data = "title=" + title + "&description=" + desc + "&content=" + content + "&tags=" + tags + "&categories=" + cats;
    this.doAJAX(successCB, errorCB);
}
playground.prototype.setcontentsuccessCB = function (data, status) {
    if (data.TYPE == "SUCCESS") {
        alert(data.RESULT);
    }
    else {
        alert("ERROR " + data.RESULT.MESSAGE);
    }
}
playground.prototype.setcontenterrorCB = function (xhr, options, error) {
    alert(xhr + " " + error);
}