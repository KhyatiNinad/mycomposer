var map;
var ContainerId, Schedule, Handlers, Settings;
var mobileAndTabletcheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
function getSupportedTransform() {
    debugger;
    if (mobileAndTabletcheck())
        return false;
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
            'booklet/js/zoom.min.js',
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
            'booklet/js/zoom.min.js',
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