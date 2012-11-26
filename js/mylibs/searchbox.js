;(function ( ) {
    var pluginName = 'searchize',
        defaults = {};

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;
	this.taglist = {};
        this.init();
    }

    Plugin.prototype.init = function () {
	var obj = this.element;

	// Build search form
	var $searchform = $('<form id="searchbox"/>')
	    .append('<input id="keyword" type="search" placeholder="Enter a keyword or tag">')
	    .submit(function () { 
		var $input = $("input#keyword");
		if ($input.val() === "") { return false; }
		_addtag($input.val());
		$input.val("");
		return false; 
	    })
	    .keyup(function() {
		$('#browser').fadeOut('fast', function() {
		    $('#searcher').fadeIn('fast');
		});
	    });
	
	var $tagCloud = $('<div id="taglist"/>');
	var $searchResults = $('<div id="search-results"/>');
        var $searcher = $('<div id="searcher"/>')
	    .append($tagCloud)
	    .append($searchResults);

//	var $example = _buildExample(this.options.examples[0]);
	
	var $browser = _buildBrowser(this.options);
	var $finder = $('<div id="finder"/>')
	    .append($searcher)
	    .append($browser);
	
	$(this.element)
	    .append($browser);
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

    // A private function that adds a tag to the dom
    function _addtag(text) {
	var $tag = $('<div class="tag"/>').attr("data-title", text);
	var $tagHead = $('<div class="tagHead"/>');
	var $tagSpan =  $('<span class="tagText"/>').text(text);

	var $tagBody = $('<div class="tagBody"/>')
	    .append($tagSpan);
	   
	var $ret =  $tag
	    .append($tagHead)
	    .append($tagBody);
	
	$ret.hide();
	$('div#taglist').append($ret);
	$ret.fadeIn(500);
    }
	      // <div class="tag" data-title="text">
	      // 	<div class="tagHead"></div>
	      // 	<div class="tagBody">
	      // 	  <span class="tagText">text</span>
	      // 	</div>
	      // </div>

    function _buildBrowser(options) {
	// return $('<div id="browser" class="browser"><section id="item1" class="ac_hidden"><p class="pointer">&#9654;</p><h1><a href="#">HTML5</a></h1><ul><li>Something</li><li>Something</li><li>Something</li><li>Something</li></ul></section><section id="item5" class="ac_hidden"><p class="pointer">&#9654;</p><h1><a href="#">JavaScript</a></h1><p>Pellentesque habitant... </p></section><section id="item6" class="ac_hidden"><p class="pointer">&#9654;</p><h1><a href="#">CSS3</a></h1><p>Pellentesque habitant... </p><p>Pellentesque habitant... </p></section></div>');

	var $browser = $('<ul id="example-list" data-role="listview" class="ui-listview"/>');

	// Add the browser examples to the DOM
	_.each(options.examples, function (ex) {
	    _.each(ex.categories, function (cat) {
		var $category;

		// Find all categories that match the current example 
		var $categories = $browser.children('li[data-role="list-divider"][data-category=' + cat[0] + ']');
		if (_.size($categories) > 0) {		   
		    $category = $(_.first($categories));
		} else { 
		    $category = $('<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-btn ui-bar-b ui-li-has-count ui-btn-hover-undefined ui-btn-up-undefined"/>')
			.attr("data-title", ex.title)
			.attr("data-category", cat[0])
			.text(cat[0]);

		    // Append the category to the example list
		    $browser
			.append($category);
		}

		var $example = _buildExample(ex);

		$browser.append($example);
	    });
	});
	return $browser;
    }

//   Example Category
//   <li data-role="list-divider" data-category="HTML5" role="heading" class="ui-li ui-li-divider ui-btn ui-bar-b ui-li-has-count ui-btn-hover-undefined ui-btn-up-undefined">HTML5</li>



    function _buildExample(ex) {
	// Create the shadow
	var $exampleShadow = $('<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"/>');

	// Create the example title
	var $exampleTitle = $('<h3 class="ui-li-heading"/>')
	    .text(ex.title);
	// Create the example description
	var $exampleDescription = $('<p class="ui-li-desc"/>')
	    .text(ex.description);

	// Create the example link
	var $exampleLink = $('<a class="ui-link-inherit example_link"/>')
	    .attr("href", "examples/" + ex.id + ".html")
	    .attr("data-title", ex.id);

	// Create example div container
	var $exampleDiv2 = $('<div class="ui-btn-text"/>');

	// Create example div container
	var $exampleDiv1 = $('<div class="ui-btn-inner ui-li"/>')
	    .append($exampleDiv2);

	// Create the list item for the example
	var $example = $('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"/>')
	    .append($exampleDiv1);

	$exampleLink
	    .append($exampleTitle)
	    .append($exampleDescription);

	$exampleDiv2
	    .append($exampleLink);

	$exampleDiv1
	    .append($exampleDiv2)
	    .append($exampleShadow);

	$example
	    .append($exampleDiv1);

	return $example;	
    }

// Example 
// <li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c">
//    <div class="ui-btn-inner ui-li">
//      <div class="ui-btn-text">
//        <a href="index.html" class="ui-link-inherit">		      
// 	    <h3 class="ui-li-heading">Audio Tag</h3>
// 	    <p class="ui-li-desc">An example of the HTML5 audio tag</p>	      
//        </a>
//      </div>
//      <span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>
//    </div>
// </li>

     
    function exampleCategory(category) {
	return '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-btn ui-bar-b ui-li-has-count ui-btn-hover-undefined ui-btn-up-undefined">' + category + '</li>';
    }

	  // <div class="accordion">
	  //   <section id="item1" class="ac_hidden">
	  //     <p class="pointer">&#9654;</p><h1><a href="#">HTML5</a></h1>
	  //     <ul>
	  // 	<li>Something</li>
	  // 	<li>Something</li>
	  // 	<li>Something</li>
	  // 	<li>Something</li>
	  //     </ul>
	  //   </section>
	  //   <section id="item5" class="ac_hidden">
	  //     <p class="pointer">&#9654;</p><h1><a href="#">JavaScript</a></h1>				
	  //     <p>Pellentesque habitant... </p>
	  //   </section>
	  //   <section id="item6" class="ac_hidden">
	  //     <p class="pointer">&#9654;</p><h1><a href="#">CSS3</a></h1>				
	  //     <p>Pellentesque habitant... </p>
	  //     <p>Pellentesque habitant... </p>		
	  //   </section>	
	  // </div>



})( jQuery, window, document );