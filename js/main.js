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
    $('.nav__item a').scrollto({
        headerSelector: '.site-header',
        headerSubtract: true
    });

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


    $('.flipper__contents h3').on('click touchend', function(e) {
        e.preventDefault();
        if( Modernizr.mq('only screen and (max-width: 40em)')) {

            var clicked = $(this);
            var parent = $(this).parent('.flipper__content');

            // If parent is the active one, simply close it & mark as not active
            if( parent.hasClass('is-active') ) {

                $(this).siblings('.accordion-content').slideUp();
                parent.removeClass('is-active');

            } else {

                // Clear is-actives, we need this for the chevrons
                $(this).parents('.flipper__contents').find('.flipper__content').removeClass('is-active');

                // Toggle content
                $(this).closest('.flipper__contents').find('.flipper__content').not(parent).find('.accordion-content').slideUp();
                $(this).next('.accordion-content').slideToggle();

                // Mark this one as active
                parent.addClass('is-active');

            }
        } // if Modernizr
    });

    // On Resize, if a content flipper has no is-actives, add them in
    checkIsActives();
    $(window).bind('resizeEnd', checkIsActives);
});

/**
 * Check is-active states of content flippers on resize. If there
 * are none, add them in
 */
function checkIsActives() {
    $('.flipper__contents').each(function() {
        if( Modernizr.mq('only screen and (min-width: 40em)') && !$(this).find('.flipper__content.is-active').length ) {
            $(this).find('.flipper__content').removeClass('is-active');
            $(this).find('.flipper__content:first-child').addClass('is-active');

            // Reset content box to first active item

        } else if( Modernizr.mq('only screen and (max-width: 40em)')) {
            $(this).find('.accordion-content').slideUp();
            $(this).find('.flipper__content').removeClass('is-active');
        }
    });
}

/**
 * Content Flipper should equate to the height. Same with Bio Image
 * of the tallest content block
 */
function updateContentHeights() {
    if( Modernizr.mq('only screen and (min-width: 50em)')) {
        textImageHeight = $('.section--text-with-image').height();
        $('.bio-photo').height(textImageHeight);
    } else if( Modernizr.mq('only screen and (max-width: 49em)')) {
        $('.bio-photo').removeAttr('style');
    }

    if( Modernizr.mq('only screen and (min-width: 40em)')) {

        $('.flipper__content, .accordion-content').removeAttr('style');

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
            $contentBlocks.height( $tallest - 35 );

        });
    } else {
        $('.flipper__content').css('height', 'auto');
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