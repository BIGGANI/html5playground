var example_data = {
    examples : [
	{
	    id: "audio_tag"
	    , title: "Audio Tag"
	    , description: "Example of a HTML5 Audio Tag"
	    , categories: [
		["HTML5"]
	    ]
	    , tags: [
		"HTML5","audio"
	    ]
	},
	{
	    id: "canvas_tag"
	    , title: "Canvas Tag"
	    , description: "Example of a HTML5 Canvas Tag"
	    , categories: [
		["HTML5"]
	    ]
	    , tags: [
		"HTML5","canvas"
	    ]
	},
	{
	    id: "html5-doctype"
	    , title: "HTML5 Doctype"
	    , description: "HTML5 simplifies the DOCTYPE"
	    , categories: [
		["HTML5"]
	    ]
	    , tags: [
		"HTML5", "form"
	    ]
	},
	{
	    id: "html5-form"
	    , title: "HTML5 Form"
	    , description: "Demo of HTML5 forms elements and attributes"
	    , categories: [
		["HTML5"]
	    ]
	    , tags: [
		"HTML5", "form"
	    ]
	},
	{
	    id: "html5-localstorage"
	    , title: "HTML5 Local Storage"
	    , description: "Demo of HTML5 key-value local storage"
	    , categories: [
		["HTML5"]
	    ]
	    , tags: [
		"HTML5", "localstorage", "storage", "key", "value"
	    ]
	},
	{
	    id: "canvas-air-water-gravity"
	    , title: "Canvas: Air, Water, Gravity"
	    , description: "Example of a basic physics engine on canvas"
	    , categories: [
		["CSS3"]
	    ]
	    , tags: [
		"HTML5", "canvas", "physics"
	    ]
	}
	,
        {
	    id: "canvas-rotateship"
	    , title: "Rotate Gaming Character"
	    , description: "Example of a basic physics engine on canvas"
	    , categories: [
		["HTML5"]
	    ]
	    , tags: [
		"HTML5", "canvas", "physics"
	    ]
	},
        { 
	    id: "canvas-click-rotate"
	    , title: "Rotate and Click Handling for Game Character"
	    , description: "Example of a game character with rotation and click handling"
	    , categories: [
		["HTML5"]
	    ]
	    , tags: [
		"HTML5", "canvas", "physics"
	    ]
	},
	{
	    id: "simple-css-animations"
	    , title: "Simple CSS Animations"
	    , description: "Examples of animations and transforms in CSS"
	    , categories: [
		["CSS3"]
	    ]
	    , tags: [
		"CSS3","animation", "transforms"
	    ]
	},
	{
	    id: "css3-text-transforms"
	    , title: "CSS3 Text Transforms"
	    , description: "Example of a CSS3 Text Transformation"
	    , categories: [
		["CSS3"]
	    ]
	    , tags: [
		"CSS3","text", "transforms"
	    ]
	}
	,
	{
	    id: "css3-inset-text"
	    , title: "CSS3 Inset Text"
	    , description: "Example of a CSS3 Inset Text"
	    , categories: [
		["CSS3"]
	    ]
	    , tags: [
		"CSS3","text", "transforms", "inset"
	    ]
	}
    ]
};


(function () {
    var layoutSettings = {
	defaults: {
	    size		        : "auto"
	    ,	togglerTip_open		: "Close This Pane"
	    ,	togglerTip_closed	: "Open This Pane"
	    ,	resizerTip		: "Resize This Pane"

	    ,	fxName			: "slide"
	    ,	fxSpeed_open		: 750
	    ,	fxSpeed_close		: 1500
	    ,	fxSettings_open		: { easing: "easeInQuint" }
	    ,	fxSettings_close	: { easing: "easeOutQuint" }
	    ,	resizeWhileDragging:	true
	},

	north: {
	    size			: 65
	    , spacing_open		: 0
	    ,	togglerLength_open	: 0
	    ,	togglerLength_closed	: 0
	    ,	resizable		: false
	    ,	slidable		: false
	}, 

	west: {
	    size: "25%"
	},
	
	south: {
	    size	: "20%"
	    ,	fxName			: "slide"
	    ,	fxSpeed_open		: 500
	    ,	fxSpeed_close		: 500
	    ,	fxSettings_open		: { easing: "easeInQuint" }
	    ,	fxSettings_close	: { easing: "easeOutQuint" }
        ,   onresize : function() {updatePreview();}
            ,   onshow_end              : function () { alert("END South pane show \n\n onshow_end callback"); }
	},

	center: {
	    minWidth:				300
	    ,	minHeight:				200
	}
    };

    layout = $("body").layout( layoutSettings );
})();


/* --|--------------------------------------------------------------------------------------
   Routines for accessing backend storage
   ----------------------------------------------------------------------------------------- */
playground = function () {
    this.url = "/html5playground/service/index.php";
    //this.url = "/service/index.php";
    this.type = "POST";
    this.alt = "json";
    this.data = "";
}
playground.prototype.doAJAX = function (successCB, errorCB) {
    $.ajax({
        url: this.url,
        type: this.type,
        dataType: this.alt,
        crossDomain: false,
        success: successCB,
        error: errorCB,
        cache: false,
        data: this.data, 
	statusCode: {
	     404: function() {
		 console.log('Request for nonexistant URL:' + this.url);
	     }
	 }
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
playground.prototype.setcontent = function (title, desc, content, tags, cats, isexample, successCB, errorCB) {
    this.url += "?f=setcontent";
    this.data = "title=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(desc) + "&content=" + encodeURIComponent(content) + "&tags=" + encodeURIComponent(tags) + "&categories=" + encodeURIComponent(cats) + "&isexample=" + isexample;
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

playground.prototype.setcontactus = function (n, e, r) {
    $(n).val($.trim($(n).val()));
    $(e).val($.trim($(e).val()));
    $(r).val($.trim($(r).val()));
    if (!$(n).val()) {
        $(n).css("background-color", "#ccc");
        $(n).attr("placeholder", "Name is a required field");
        return false;
    }
    if (!$(e).val()) {
        $(e).css("background-color", "#ccc");
        $(e).attr("placeholder", "Email is a required field");
        return false;
    }
    if (!$(r).val()) {
        $(r).css("background-color", "#ccc");
        $(r).attr("placeholder", "Response is a required field");
        return false;
    }
    this.url += "?f=setcontact";
    this.data = "name=" + escape($(n).val()) + "&email=" + escape($(e).val()) + "&resp=" + escape($(r).val());
    this.doAJAX(function (data, status) {
        if (data.TYPE == "SUCCESS") {
            $("#contactmsg").html("Message sent successfully").toggle(3000);
            $(n).val("");
            $(n).removeAttr("placeholder");
            $(n).css("background-color", "#fff");
            $(e).val("");
            $(e).removeAttr("placeholder");
            $(e).css("background-color", "#fff");
            $(r).val("");
            $(r).removeAttr("placeholder");
            $(r).css("background-color", "#fff");

        }
        else {
            $("#contactmsg").html("Name, Email, Response are required fields").toggle(3000);
        }
    },
                 function (xhr, options, error)
                 { $("#contactmsg").html("Something bad happened, please try again").toggle(3000); }
                );
}

/* --|--------------------------------------------------------------------------------------
   JavaScript App Router
   ----------------------------------------------------------------------------------------- */
    var AppRouter = Backbone.Router.extend({
        routes: {
            ":id": "getExample",
            "*actions": "defaultRoute" 
        },
        defaultRoute: function( actions ){
            console.log("URL: " + window.location.href);
        }, 
        getExample: function( id ) {
            // alert( "Get post number " + id );   
	    // AppRouter.navigate(id);
	    navigate(id);
        }
    });
    // Initiate the router
    var app_router = new AppRouter;
    // Start Backbone history a neccesary step for bookmarkable URL's
    Backbone.history.start();

/* --|--------------------------------------------------------------------------------------
   JavaScript helper function
   ----------------------------------------------------------------------------------------- */

jQuery.expr[':'].Contains = function(a,b,c){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(c[3].toUpperCase())>=0;
};


/* --|--------------------------------------------------------------------------------------
   Application specific jQuery
   ----------------------------------------------------------------------------------------- */
$(document).ready(function ($) {
    $("#btncontactus").click(function () {
        var p = new playground();
        p.setcontactus("#txtname", "#txtemail", "#txtresp");
    });
    $('#searchbox').searchize(example_data);

    $('.example_link').click(function (ex) {
        ex.preventDefault();
        console.log("Clicked on an example");
        load_example($(this).attr("data-title"));
    });

    // When the shadow is clicked on then it and the dialog box will disappear
    $('#shadow-overlay').click(function (e) {
        if ($(e.target).is($(".dialog *")) || $(e.target).is($(".dialog"))) {
            return false;
        }
        $('#shadow-overlay').fadeOut("slow");
        $('#keyboardHelp').addClass("hidden");
        $('.dialog').fadeOut("slow");

        return false;
    });

    $('.btn_close').click(function (e) {
        $('#shadow-overlay').fadeOut("slow");
        $('#keyboardHelp').addClass("hidden");
        $('.dialog').fadeOut("slow");

        return false;
    });

    $('#about-link').click(function () {
        $('.dialog').addClass("hidden");
        $('#shadow-overlay').hide().removeClass("hidden").fadeIn("slow");
        $('#dialog-about').hide().removeClass("hidden").fadeIn("slow");
        $('#dialog-box-share').addClass("hidden");
        $('#dialog-contact').addClass("hidden");
        return false;
    });

    $('#contact-link').click(function () {
        $('.dialog').addClass("hidden");
        $('#shadow-overlay').hide().removeClass("hidden").fadeIn("slow");
        $('#dialog-contact').hide().removeClass("hidden").fadeIn("slow");
        $('#contactmsg').hide();
        return false;
    });

    $('#sharebutton').click(function () {
        $('.dialog').addClass("hidden");
        $('#shadow-overlay').hide().removeClass("hidden").fadeIn("slow");
        $('#dialog-box-share').hide().removeClass("hidden").fadeIn("slow");


        var pg = new playground();

        var htmlContent = editorHTML.getValue();
        var notesContent = editorNotes.getValue();
        pg.setcontent(
	      ""  // Title
	    , notesContent // Description
	    , htmlContent  // Content
	    , ""
	    , ""
	    , false
	    , function (data, status) {
	        var url = exampleUrl(data)
	        $("input#url_input").val(url);
	        addthis.update('share', 'url', url);
	        $("div.addthis_toolbox").attr("addthis:url", url);
	        changed = false;
	    }
	    , function (xhr, options, error) {
	        console.log("Unable to Synchronize HTML snippet to the cloud.");
	    }
	);

    });

    $('#cancel-dialog-button').click(function () {
        console.log("cancel-dialog-button pressed");
    });

    $('#share-dialog-button').click(function () {
        console.log("share-dialog-button pressed");
    });

    $('#tabs a').click(function (e) {
        e.preventDefault();
        $(".ui-layout-center .paneBody div.tab").addClass("hidden").removeClass("invisible");
        $("#tabs li").attr("id", "");
        $(this)
	    .parent()
	    .attr("id", "current");
        $('#' + $(this).attr('data-tab')).removeClass("hidden");
    });

    var list = $("ul#example-list");

    $("#example-search input")
      .change(function () {
          var filter = $(this).val();
          if (filter) {
              $(list).find("h3:not(:Contains(" + filter + "))").parents("li").slideUp();
              $(list).find("h3:Contains(" + filter + ")").parents("li").slideDown();
          } else {
              $("ul#example-list li").slideDown();
          }
          return false;
      })
    .keyup(function () {
        // fire the above change event after every letter
        $(this).change();
    });

    $("#browser section h1").click(function (e) {
        if ($(this).parents("section").hasClass("ac_hidden")) {
            $(this).parents().siblings("section").addClass("ac_hidden");
            $(this).parents("section").removeClass("ac_hidden");
        } else {
            $(this).parents("section").addClass("ac_hidden");
        }
        e.preventDefault();
    });
    $("#downloadButton").click(function () {
        download_file();
    });
    $("#target").submit(function () {
        alert("downloading.....");
    });
});

function download_file() {
    $("#hdncontent").val(editorHTML.getValue());
    $("#download_form").submit();
}
function load_example(example_name) {
    // Find the information associated with this example
    if (changed) {
        if (!confirm("Your changes will be lost, please click on share button to save your changes\n do you want to continue?")) {
            return false;
        }
        changed = false;
    }
    var exampleJSON = $.grep(example_data.examples, function (ex) { 
				 return ex.id === example_name; 
			     })[0];
    
    // If exampleJSON is undefined, it means that an example was 
    // requested that was not defined in the example_data variable.
    if (exampleJSON != undefined) {
	fetch_and_render_example(exampleJSON);
    }
}

function fetch_and_render_example(exampleJSON) { 
    var url =  "examples/" + exampleJSON.id + ".html";
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        // If the example is found then put it in the editor
        success: function (data) {
            editorHTML.setValue(data);
            changed = false;
        },
        statusCode: {
            404: function () {
                console.log('example not found:' + url);
            }
        }
    });
}

// Load an example into the editor
function navigate(id) {
    var pg = new playground();
    pg.getcontent(
	id
	, function(data, status) {
	    if (data.TYPE == "SUCCESS") {
		editorHTML.setValue(data.RESULT.content);
                editorNotes.setValue(data.RESULT.notes);
	    }
	}
	, function (data, status) {
	    if (data.TYPE != "SUCCESS") {
	//	console.log("Request for a nonexistant example.");
	    }
	}
    )
}


// TODO: Need to generate a URL based on the hash of the html and notes
function exampleUrl(example) {
    var protocol = window.location.protocol;
    var host     = window.location.host;
    var pathname = window.location.pathname;
    var url      =  protocol + "//" + [host.replace(/\//, ""), pathname.replace(/\/index\.html/, ""), "#" + example.RESULT].join("");
    return url;
}