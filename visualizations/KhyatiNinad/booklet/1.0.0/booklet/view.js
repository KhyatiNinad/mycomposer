var map;
var choroplethLayer;
var trafficLayer;
var pedLayer;


var VISUALIZATION = (function (visualization, window, document) {
    'use strict';

    visualization.config = {
        // Define CSS & JS resources for visualization
    	styles: [
            'https://fonts.googleapis.com/css?family=Cairo:400,300',
            'https://fonts.googleapis.com/css?family=Open+Sans:300',
			'memorymap/css/styles.css',
            'memorymap/css/bootstrap.min.css',
			'memorymap/css/leaflet.css',
			'memorymap/css/MarkerCluster.css',
			'memorymap/css/MarkerCluster.Default.css',
    	],

        scripts: [
            '~/jquery/1.11.1/jquery-1.11.1.min',
            'memorymap/js/jsrender.min.js',
            'memorymap/js/bootstrap.min.js',
            'memorymap/js/leaflet.js',
            'memorymap/js/leaflet-dvf.js',
            'memorymap/js/leaflet.markercluster.js',
            'memorymap/js/moment.min.js',
            'memorymap/js/stamen.js',
        ]
    };

    visualization.navigate = function (index) {
        // Add functionality to navigate events via Player controls if desired
    };

    visualization.start = function (containerId, schedule, handlers, settings) {
        // Set defaults 
        var defaults = {
            // default setting value used to hide or show images for event
            showImage: false
        }
        var options = _.assign({}, defaults, settings);
        debugger;

        // create a map in the "map" div, set the view to a given place and zoom
        map = L.map('map').setView([0,0], 2);

        /*
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
          .addTo(map);
        */
        var baseLayer = new L.StamenTileLayer('watercolor', {
            detectRetina: true
        });
        
        baseLayer.addTo(map);
        
        var layerControl = new L.Control.Layers();
        //var legendControl = new L.Control.Legend();

        layerControl.addTo(map);
        //legendControl.addTo(map);


        var resize = function () {
            var $map = $('#map');

            //$map.height($(window).height() - $('div.navbar').outerHeight());

            if (map) {
                map.invalidateSize();
            }
        };

        $(window).on('resize', function () {
            resize();
        });

        resize();



        // Add properties for formatted date and resized image leveraging wcHelper methods
/*        for (var i = 0; i < schedule.events.length; i++) {
            // set event date - wcHelper.formatDateRange(type=event, event and timeOnly=false)
            schedule.events[i].date = wcHelper.formatDateRange('event', schedule.events[i], false);

            // set event image - wcHelper.getImage(event, size=sm)
            schedule.events[i].image = options.showImage ? wcHelper.getImage(schedule.events[i], 'sm') : '';
        }
        */
/*        var tmpl = $.templates("#itemTemplate");    // Get compiled template
        var html = tmpl.render(schedule.events);    // Render template using data - as HTML string
        $("#itemList").html(html);                  // Insert HTML string into DOM
        */
        // Call handlers.ready for visualization to load
        handlers.ready();

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