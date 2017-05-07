    var module = {
        ratio: 1.6,
        init: function (id) {
            var me = this;

            // if older browser then don't run javascript
            if (document.addEventListener) {
                this.el = document.getElementById(id);
                var size = this.resize();
                $(this.el).turn('size', size.width, size.height);

                // on window resize, update the plugin size
                window.addEventListener('resize', function (e) {
                    var size = me.resize();
                    $(me.el).turn('size', size.width, size.height);
                });
            }
        },
        resize: function () {
            // reset the width and height to the css defaults
            this.el.style.width = '';
            this.el.style.height = '';

            var width = this.el.clientWidth,
                height = Math.round(width / this.ratio),
                padded = Math.round(document.body.clientHeight * 0.9);

            // if the height is too big for the window, constrain it
            if (height > padded) {
                height = padded;
                width = Math.round(height * this.ratio);
            }

            // set the width and height matching the aspect ratio
            this.el.style.width = width + 'px';
            this.el.style.height = height + 'px';

            return {
                width: width,
                height: height
            };
        },
        plugins: function () {
            // run the plugin
            // hide the body overflow
            document.body.className = 'hide-overflow';
        }
    };
function updateDepth(book, newPage) {

	var page = book.turn('page'),
		pages = book.turn('pages'),
		depthWidth = 16*Math.min(1, page*2/pages);

		newPage = newPage || page;

	if (newPage>3)
		$('.sj-book .p2 .depth').css({
			width: depthWidth,
			left: 20 - depthWidth
		});
	else
		$('.sj-book .p2 .depth').css({width: 0});

		depthWidth = 16*Math.min(1, (pages-page)*2/pages);

		var last2 = pages - 1;
		debugger;
	if (newPage<pages-3)
		$('.sj-book .p' + last2 + ' .depth').css({
			width: depthWidth,
			right: 20 - depthWidth
		});
	else
	    $('.sj-book .p' + last2 + ' .depth').css({ width: 0 });

}

function ellipsizeTitle(div) {
    $('.mainTitle', div).fitText();
    $('.firstDesc', div).fitText();
}
function ellipsizeTextBox(div) {
    var data = $('.desc', div);
    var link = $('.details-link', div);
    var el = data[0];

    var keep = el.innerHTML;
    while (el.scrollHeight > el.offsetHeight) {
        el.innerHTML = keep;
        el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 10);
        keep = el.innerHTML;
        el.innerHTML = el.innerHTML + "...";
    }
    $('.details-link', div).on('click', function (e) {
        e.preventDefault();
        debugger;

        // Get event id that was set in eventTemplate
        var id = $(this).parents('.item').attr('data-id');

        // Call showDetail method with event id passed to display built in player detail window
        Handlers.showDetail(id);
    });
}
function loadPage(page) {
    var div = $('.sj-book .p' + page);
    var id = page - 5;
    if (id >= 0 && id < Schedule.events.length)
    {
        var tmpl = $.templates("#itemTemplate");    // Get compiled template
        var html = tmpl.render(Schedule.events[id]);    // Render template using data - as HTML string
        div.html(html);                  // Insert HTML string into DOM
        setTimeout(ellipsizeTextBox, 100, div );
    }
    else
    {
        var tmpl = $.templates("#itemTemplate");    // Get compiled template
        var html = tmpl.render({
            paperStyle: Schedule.options.paperStyle,
            pageClass : 'oddPage'
        });    // Render template using data - as HTML string
        div.html(html);                  // Insert HTML string into DOM
        setTimeout(ellipsizeTextBox, 100, div);
        //div.html('<div style="width:100%; height:100%; ">&nbsp;' + '</div>');
    }
    /*
	$.ajax({url: 'pages/page' + page + '.html'}).
		done(function(pageHtml) {
			$('.sj-book .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
		});
        */

}

function addPage(page, book) {

	var id, pages = book.turn('pages');
	if (!book.turn('hasPage', page)) {

		var element = $('<div />',
			{'class': 'own-size',
				css: {width: 460, height: 582}
			}).
			html('<div class="loader"></div>');

		if (book.turn('addPage', element, page)) {
		    setTimeout(loadPage, 100, page);
			//loadPage(page);
		}

	}
}

function numberOfViews(book) {

	return book.turn('pages') / 2 + 1;

}

function getViewNumber(book, page) {

	return parseInt((page || book.turn('page'))/2 + 1, 10);

}

function zoomHandle(e) {

	if ($('.sj-book').data().zoomIn)
		zoomOut();
	else if (e.target && $(e.target).hasClass('zoom-this')) {
		zoomThis($(e.target));
	}

}

function zoomThis(pic) {

	var	position, translate,
		tmpContainer = $('<div />', {'class': 'zoom-pic'}),
		transitionEnd = $.cssTransitionEnd(),
		tmpPic = $('<img />'),
		zCenterX = $('#book-zoom').width()/2,
		zCenterY = $('#book-zoom').height()/2,
		bookPos = $('#book-zoom').offset(),
		picPos = {
			left: pic.offset().left - bookPos.left,
			top: pic.offset().top - bookPos.top
		},
		completeTransition = function() {
			$('#book-zoom').unbind(transitionEnd);

			if ($('.sj-book').data().zoomIn) {
				tmpContainer.appendTo($('body'));

				$('body').css({'overflow': 'hidden'});
				
				tmpPic.css({
					margin: position.top + 'px ' + position.left+'px'
				}).
				appendTo(tmpContainer).
				fadeOut(0).
				fadeIn(500);
			}
		};

		$('.sj-book').data().zoomIn = true;

		$('.sj-book').turn('disable', true);

		$(window).resize(zoomOut);
		
		tmpContainer.click(zoomOut);

		tmpPic.load(function() {
			var realWidth = $(this)[0].width,
				realHeight = $(this)[0].height,
				zoomFactor = realWidth/pic.width(),
				picPosition = {
					top:  (picPos.top - zCenterY)*zoomFactor + zCenterY + bookPos.top,
					left: (picPos.left - zCenterX)*zoomFactor + zCenterX + bookPos.left
				};


			position = {
				top: ($(window).height()-realHeight)/2,
				left: ($(window).width()-realWidth)/2
			};

			translate = {
				top: position.top-picPosition.top,
				left: position.left-picPosition.left
			};

			$('.samples .bar').css({visibility: 'hidden'});
			$('#slider-bar').hide();
			
		
			$('#book-zoom').transform(
				'translate('+translate.left+'px, '+translate.top+'px)' +
				'scale('+zoomFactor+', '+zoomFactor+')');

			if (transitionEnd)
				$('#book-zoom').bind(transitionEnd, completeTransition);
			else
				setTimeout(completeTransition, 1000);

		});

		tmpPic.attr('src', pic.attr('src'));

}

function zoomOut() {

	var transitionEnd = $.cssTransitionEnd(),
		completeTransition = function(e) {
			$('#book-zoom').unbind(transitionEnd);
			$('.sj-book').turn('disable', false);
			$('body').css({'overflow': 'auto'});
			moveBar(false);
		};

	$('.sj-book').data().zoomIn = false;

	$(window).unbind('resize', zoomOut);

	moveBar(true);

	$('.zoom-pic').remove();
	$('#book-zoom').transform('scale(1, 1)');
	$('.samples .bar').css({visibility: 'visible'});
	$('#slider-bar').show();

	if (transitionEnd)
		$('#book-zoom').bind(transitionEnd, completeTransition);
	else
		setTimeout(completeTransition, 1000);
}


function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {
/*
	var previewWidth = 115,
		previewHeight = 73,
		previewSrc = '/pages/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
    */
}

function isChrome() {

	// Chrome's unsolved bug
	// http://code.google.com/p/chromium/issues/detail?id=128488

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function loadApp() {

    var flipbook = $('.sj-book');

    // Check if the CSS was already loaded

    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadApp, 10);
        return;
    }

    // Mousewheel

    $('#book-zoom').mousewheel(function (event, delta, deltaX, deltaY) {

        var data = $(this).data(),
			step = 30,
			flipbook = $('.sj-book'),
			actualPos = $('#slider').slider('value') * step;

        if (typeof (data.scrollX) === 'undefined') {
            data.scrollX = actualPos;
            data.scrollPage = flipbook.turn('page');
        }

        data.scrollX = Math.min($("#slider").slider('option', 'max') * step,
			Math.max(0, data.scrollX + deltaX));

        var actualView = Math.round(data.scrollX / step),
			page = Math.min(flipbook.turn('pages'), Math.max(1, actualView * 2 - 2));

        if ($.inArray(data.scrollPage, flipbook.turn('view', page)) == -1) {
            data.scrollPage = page;
            flipbook.turn('page', page);
        }

        if (data.scrollTimer)
            clearInterval(data.scrollTimer);

        data.scrollTimer = setTimeout(function () {
            data.scrollX = undefined;
            data.scrollPage = undefined;
            data.scrollTimer = undefined;
        }, 1000);

    });

    // Slider

    $("#slider").slider({
        min: 1,
        max: 100,

        start: function (event, ui) {
            /*
            if (!window._thumbPreview) {
                _thumbPreview = $('<div />', { 'class': 'thumbnail' }).html('<div></div>');
                setPreview(ui.value);
                _thumbPreview.appendTo($(ui.handle));
            } else
                setPreview(ui.value);
                */
            moveBar(false);

        },

        slide: function (event, ui) {

            //setPreview(ui.value);

        },

        stop: function () {

            if (window._thumbPreview)
                _thumbPreview.removeClass('show');

            $('.sj-book').turn('page', Math.max(1, $(this).slider('value') * 2 - 2));

        }
    });


    // URIs

    Hash.on('^page\/([0-9]*)$', {
        yep: function (path, parts) {

            var page = parts[1];

            if (page !== undefined) {
                if ($('.sj-book').turn('is'))
                    $('.sj-book').turn('page', page);
            }

        },
        nop: function (path) {

            if ($('.sj-book').turn('is'))
                $('.sj-book').turn('page', 1);
        }
    });

    // Arrows

    $(document).keydown(function (e) {

        var previous = 37, next = 39;

        switch (e.keyCode) {
            case previous:

                $('.sj-book').turn('previous');

                break;
            case next:

                $('.sj-book').turn('next');

                break;
        }

    });


    // Flipbook

//    flipbook.bind(($.isTouch) ? 'touchend' : 'click', zoomHandle);

    var totalEvents = Schedule.events.length + 6;

    if (totalEvents % 2 == 1)
        totalEvents++;

    $('.sj-book .p2last').addClass('p' + (totalEvents - 1));
    $('.sj-book .plast').addClass('p' + (totalEvents));

    flipbook.bind(($.isTouch) ? 'touchend' : 'click', zoomHandle);

    flipbook.turn({
        elevation: 50,
        acceleration: !isChrome(),
        autoCenter: true,
        gradients: true,
        duration: 1000,
        pages: totalEvents,
        when: {
            turning: function (e, page, view) {

                var book = $(this),
					currentPage = book.turn('page'),
					pages = book.turn('pages');

                if (currentPage > 3 && currentPage < pages - 3) {

                    if (page == 1) {
                        book.turn('page', 2).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    } else if (page == pages) {
                        book.turn('page', pages - 1).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    }
                } else if (page > 3 && page < pages - 3) {
                    if (currentPage == 1) {
                        book.turn('page', 2).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    } else if (currentPage == pages) {
                        book.turn('page', pages - 1).turn('stop').turn('page', page);
                        e.preventDefault();
                        return;
                    }
                }

                updateDepth(book, page);
                var last2 = pages - 1;

                if (page >= 2)
                    $('.sj-book .p2').addClass('fixed');
                else
                    $('.sj-book .p2').removeClass('fixed');

                if (page < book.turn('pages'))
                    $('.sj-book .p2last').addClass('fixed');
                else
                    $('.sj-book .p2last').removeClass('fixed');

                Hash.go('page/' + page).update();

            },

            turned: function (e, page, view) {

                var book = $(this);

                if (page == 2 || page == 3) {
                    book.turn('peel', 'br');
                }

                updateDepth(book);

                $('#slider').slider('value', getViewNumber(book, page));

                book.turn('center');

            },

            start: function (e, pageObj) {

                moveBar(true);

            },

            end: function (e, pageObj) {

                var book = $(this);

                updateDepth(book);

                setTimeout(function () {

                    $('#slider').slider('value', getViewNumber(book));

                }, 1);

                moveBar(false);

            },

            missing: function (e, pages) {
                for (var i = 0; i < pages.length; i++) {
                    addPage(pages[i], $(this));
                }

            }
        }
    });


    $('#slider').slider('option', 'max', numberOfViews(flipbook));

    flipbook.addClass('animated');

    // Show canvas

    $('#canvas').css({ visibility: '' });
    Handlers.ready();
    module.init('book');

//    setTimeout(setImageViewPointHeight, 500);

}

// Hide canvas

$('#canvas').css({ visibility: 'hidden' });

(function ($, undefined) {
    function resizeLoop(testTag, checkSize) {
        var fontSize = 10;
        var min = 10;
        var max = 0;
        var exceeded = false;

        for (var i = 0; i < 30; i++) {
            testTag.css('font-size', fontSize);
            if (checkSize(testTag)) {
                max = fontSize;
                fontSize = (fontSize + min) / 2;
            } else {
                if (max == 0) {
                    // Start by growing exponentially
                    min = fontSize;
                    fontSize *= 2;
                } else {
                    // If we're within 1px of max anyway, call it a day
                    if (max - fontSize < 2)
                        break;

                    // If we've seen a max, move half way to it
                    min = fontSize;
                    fontSize = (fontSize + max) / 2;
                }
            }
        }

        return fontSize;
    }

    function sizeText(tag) {
        var width = tag.width();
        var height = tag.height();
        tag.css('display', '').css('vertical-align', '');

        // Clone original tag and append to the same place so we keep its original styles, especially font
        var testTag = tag.clone(true)
		.appendTo(tag.parent())
		.css({
		    position: 'absolute',
		    left: 0, top: 0,
		    width: 'auto', height: 'auto'
		});

        var fontSize;

        // TODO: This decision of 10 characters is arbitrary. Come up
        // with a smarter decision basis.
        if (tag.text().length < 10) {
            fontSize = resizeLoop(testTag, function (t) {
                return t.width() > width || t.height() > height;
            });
        } else {
            testTag.css('width', width);
            fontSize = resizeLoop(testTag, function (t) {
                return t.height() > height;
            });
        }

        testTag.remove();
        tag.css('font-size', fontSize);
        tag.css('display', 'table-cell');
        tag.css('vertical-align', 'middle');

        $('#output').append('<div>' + fontSize + '</div>');
    };

    $.fn.fitText = function () {
        this.each(function (i, tag) {
            sizeText($(tag));
        });
    };
})(window.jQuery);

function setImageViewPointHeight() {
    debugger;
    var $el = $("#canvas");
    var elHeight = $el.outerHeight();
    var elWidth = $el.outerWidth();

    var $wrapper = $("#scaleable-wrapper");

    var starterData = {
        size: {
            width: $wrapper.width(),
            height: $wrapper.height()
        }
    }
    doResize(null, starterData);
}

function doResize(event, ui) {

    var scale, origin;
    var $el = $("#canvas");
    var elHeight = $el.outerHeight();
    var elWidth = $el.outerWidth();

    scale = Math.min(
      ui.size.width / elWidth,
      ui.size.height / elHeight
    );

    $el.css({
        transform: " " + "scale(" + scale + ")"
    });

}
$(document).ready(function () {
//    loadApp();
});

function getSize() {
    console.log('get size');
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    return {
        width: width,
        height: height
    }
}

function resize() {
    console.log('resize event triggered');

    var size = getSize();
    console.log(size);

    if (size.width > size.height) { // landscape
        $('.sj-book').turn('display', 'double');
    }
    else {
        $('.sj-book').turn('display', 'single');
    }

    $('.sj-book').turn('size', size.width, size.height);
}


