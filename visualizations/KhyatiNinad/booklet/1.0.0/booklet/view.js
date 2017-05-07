var map;
var ContainerId, Schedule, Handlers, Settings;

function getSupportedTransform() {
    debugger;
    var bd = document.getElementsByTagName("body")[0];
    //if (document.getElementsByTagName("body")[0].className.match(/ui-mobile-viewport/))
      //  return false;
    var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    var div = document.createElement('div');
    for (var i = 0; i < prefixes.length; i++) {
        if (div && div.style[prefixes[i]] !== undefined) {
            return prefixes[i];
        }
    }
    return false;
}

var VISUALIZATION = (function (visualization, window, document) {
    'use strict';

    visualization.config = {
        // Define CSS & JS resources for visualization
    	styles: [
            'https://fonts.googleapis.com/css?family=Cairo:400,300',
            'https://fonts.googleapis.com/css?family=Open+Sans:300',
            'booklet/css/jquery.ui.css',
            'booklet/css/bootstrap.min.css',
			'booklet/css/leaflet.css',
			'booklet/css/MarkerCluster.css',
			'booklet/css/MarkerCluster.Default.css',
    	    'booklet/css/jquery.ui.html4.css', 
            'booklet/css/booklet-html4.css',
			'booklet/css/styles.css',
			'booklet/css/booklet.css'
    	],

        scripts: [
    'booklet/js/jquery.1.9.1.min.js',
    'booklet/js/jquery-ui-1.8.20.custom.min.js', 
    'booklet/js/jquery.mousewheel.min.js', 
    'booklet/js/modernizr.2.5.3.min.js', 
    'booklet/js/hash.js',
    'booklet/js/turn.html4.min.js',
    'booklet/js/booklet.js',
    'booklet/js/jsrender.min.js',
            'booklet/js/bootstrap.min.js',
            'booklet/js/leaflet.js',
            'booklet/js/leaflet-dvf.js',
            'booklet/js/leaflet.markercluster.js',
            'booklet/js/moment.min.js',
            'booklet/js/stamen.js',
            'booklet/js/booklet.js',
        ]
    };

    if (getSupportedTransform())
    {
        visualization.config = {
            // Define CSS & JS resources for visualization
            styles: [
                'https://fonts.googleapis.com/css?family=Cairo:400,300',
                'https://fonts.googleapis.com/css?family=Open+Sans:300',
                'booklet/css/jquery.ui.css',
                'booklet/css/bootstrap.min.css',
                'booklet/css/leaflet.css',
                'booklet/css/MarkerCluster.css',
                'booklet/css/MarkerCluster.Default.css',
                'booklet/css/jquery.ui.css',
    //            'booklet/css/booklet-html4.css',
                'booklet/css/styles.css',
                'booklet/css/booklet.css'
            ],

            scripts: [
        'booklet/js/jquery.1.9.1.min.js',
        'booklet/js/jquery-ui-1.8.20.custom.min.js',
        'booklet/js/jquery.mousewheel.min.js',
        'booklet/js/modernizr.2.5.3.min.js',
        'booklet/js/hash.js',
        'booklet/js/turn.min.js',
        'booklet/js/booklet.js',
        'booklet/js/jsrender.min.js',
                'booklet/js/bootstrap.min.js',
                'booklet/js/leaflet.js',
                'booklet/js/leaflet-dvf.js',
                'booklet/js/leaflet.markercluster.js',
                'booklet/js/moment.min.js',
                'booklet/js/stamen.js',
                'booklet/js/booklet.js',
            ]
        };

    }
    visualization.navigate = function (index) {
        // Add functionality to navigate events via Player controls if desired
    };

    visualization.start = function (containerId, schedule, handlers, settings) {
        // Set defaults 
        var defaults = {
            // default setting value used to hide or show images for event
            showImage: true,
            paperStyle: 'gray'

        }
        var options = _.assign({}, defaults, settings);
        debugger;

        schedule.options = options;
        // Add properties for formatted date and resized image leveraging wcHelper methods
        for (var i = 0; i < schedule.events.length; i++) {
            // set event date - wcHelper.formatDateRange(type=event, event and timeOnly=false)
            schedule.events[i].date = wcHelper.formatDateRange('event', schedule.events[i], false);

            // set event image - wcHelper.getImage(event, size=sm)
            schedule.events[i].image = options.showImage ? wcHelper.getImage(schedule.events[i], 'sm') : '';
            schedule.events[i].paperStyle = options.paperStyle;
            if (i % 2 == 0)
                schedule.events[i].pageClass = 'oddPage';
            else
                schedule.events[i].pageClass = 'evenPage';

        }
        var tmpl = $.templates("#mainTemplate");    // Get compiled template
        var html = tmpl.render(schedule);    // Render template using data - as HTML string
        $("#mainPageDiv").html(html);                  // Insert HTML string into DOM

        var tmpl = $.templates("#firstTemplate");    // Get compiled template
        var html = tmpl.render(schedule);    // Render template using data - as HTML string
        $("#thirdPageDiv").html(html);                  // Insert HTML string into DOM
        setTimeout(
        ellipsizeTitle, 100, $("#mainPageDiv"));

        setTimeout(
        ellipsizeTitle, 100, $("#thirdPageDiv"));
        $("#fourthPage").addClass(options.paperStyle);
/*        var tmpl = $.templates("#itemTemplate");    // Get compiled template
        var html = tmpl.render(schedule.events);    // Render template using data - as HTML string
        $("#itemList").html(html);                  // Insert HTML string into DOM
        */
        // Call handlers.ready for visualization to load
        ContainerId = containerId;
        Schedule = schedule;
        Handlers = handlers;
        Settings = settings;
        loadApp();
        
        //handlers.ready();

        // Add detail view link after view is loaded
/*        $(function() {
            $('.details-link').on('click', function(e){
                e.preventDefault();

                // Get event id that was set in eventTemplate
                var id = $(this).parents('.item').attr('data-id');

                // Call showDetail method with event id passed to display built in player detail window
                handlers.showDetail(id);
            });
        });
        */
    };

    return visualization;

})(VISUALIZATION || {}, window, document);