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
	}
    };

    layout = $("body").layout( layoutSettings );
})();


jQuery.expr[':'].Contains = function(a,b,c){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(c[3].toUpperCase())>=0;
};

$(document).ready(function ($) {
    var examples = new playground();
    examples.getexamples(function (e_data, status) {
        load_init(e_data);
    }, function (xhr, options, error) { console.log(xhr + " " + error); });

});

function load_init(e_data) {
    example_data = e_data;
    $('#searchbox').searchize(example_data);
    $('.example_link').click(function (ex) {
        ex.preventDefault();
        console.log("Clicked on an example");
        load_example($(this).attr("data-title"));
        
    });


    $('#shadow-overlay').click(function (e) {
        if ($(e.target).is($("#dialog-box-share *")) || $(e.target).is($("#dialog-box-share"))) {
            return false;
        }
        $('#shadow-overlay').fadeOut("slow");
        $('#keyboardHelp').addClass("hidden");
        $('#dialog-box-share').fadeOut("slow");
        return false;
    });

    $('#sharebutton').click(function () {
        if (changed) {
            var p = new playground();
            p.setcontent("UGC", "UGC", editorHTML.getValue(), "[]", "[]", function (data, status) { $("#url_input").val(data.RESULT); }, function (xhr, options, error) {
                console.log(xhr + " " + error);
            });
        }
        $('#shadow-overlay').hide().removeClass("hidden").fadeIn("slow");
        $('#dialog-box-share').hide().removeClass("hidden").fadeIn("slow");
        $('#keyboardHelp').removeClass("hidden");
        return false;
    });

    $('#cancel-dialog-button').click(function () {
        console.log("cancel-dialog-button pressed");
    });

    $('#share-dialog-button').click(function () {
        console.log("share-dialog-button pressed");
    });



    //$("#content div").hide(); // Initially hide all content
    //$("#tabs li:first").attr("id","current"); // Activate first tab
    //$("#content div:first").fadeIn(); // Show first tab content

    $('#tabs a').click(function (e) {
        e.preventDefault();
        $(".ui-layout-center .paneBody div.tab").addClass("hidden"); //Hide all content
        $("#tabs li").attr("id", ""); //Reset id's
        $(this)
	    .parent()
	    .attr("id", "current"); // Activate this
        $('#' + $(this).attr('data-tab')).removeClass("hidden"); // Show content for current tab
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
}
function load_example(example_name) {
    // Find the information associated with this example
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
//    var url =  "examples/" + exampleJSON.id + ".html";
//     $.ajax({
//      type: "GET",
//	 url: url,
//      dataType: 'html',
//	 // If the example is found then put it in the editor
//	 success: function(data) {
//	     editorHTML.setValue(data);
//	 },
//	 statusCode: {
//	     404: function() {
//		 console.log('example not found:' + url );
//	     }
//	 }
    //     });
    var pground = new playground();
    pground.getcontent(exampleJSON.id, function (data, status) {
        editorHTML.setValue(data.RESULT.content);
    }, function (xhr, options, error) { console.log(xhr + " " + error); });

}