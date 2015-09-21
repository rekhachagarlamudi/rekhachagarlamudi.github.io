/*
 * main.js
 *
 * Contains a collection of global functions and methods we can use throughout
 * the website, as well as all the calls to the plugins.
 *
 * @author  Machine Agency
 *          hello@machine-agency.com
 *          http://machine-agency.com
 */
jQuery(document).ready(function($) {

    // Scroll Anchor Navigation
    $('.nav__item a').scrollto();

    // Equal content block heights
    updateContentHeights();

    $(window).bind('resizeEnd', function() {
        updateContentHeights();
    });

    // Handle Content Flipper click events
    $('.flipper__item .flipper__link').on('click touchend', function(e) {

        e.preventDefault();

        if( $(this).parents('.flipper__item:not(.is-active)').length ) {
            var context = $(this).parents('.section--flipper');
            var target  = $(this).attr('href');

            // Clear all 'is-actives', and set current link to 'is-active'
            context.find('.flipper__item, .flipper__content').removeClass('is-active');
            $(this).parents('.flipper__item').addClass('is-active');

            // Show the corresponding content block
            $(target).addClass('is-active');
        }
    });


});

/**
 * Content Flipper should equate to the height
 * of the tallest content block
 */
function updateContentHeights() {

    if( Modernizr.mq('only screen and (min-width: 40em)')) {
        $('.section--flipper').each(function() {

            /**
             * Keep a tab on the tallest block. Use the left column (.flipper__nav) as a base
             * @type {[type]}
             */
            $contentBlocks = $(this).find('.flipper__content');
            $tallest = $(this).find('.flipper__nav').height();

            // Clear previously assigned heights
            $contentBlocks.removeAttr('style');

            // Cycle through the blocks, updating if height is greater than $tallest
            $contentBlocks.each(function() {
                $tallest = ( $(this).height() > $tallest ) ? $(this).innerHeight() : $tallest;
            });

            // Set all the blocks to the tallest within this flipper object
            $contentBlocks.height( $tallest );

        });
    }
}

/*
 * ResizeEnd
 *
 * Example:
 * $(window).bind('resizeEnd', function() {
 *  console.log('resize ended 500ms ago');
 * });
 */
$(window).resize(function() {

    if(this.resizeTO) clearTimeout(this.resizeTO);

    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);

});