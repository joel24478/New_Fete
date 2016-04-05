/*
  File:  Fete/public/javascripts/auto_scroll.js
  Joel Cruz, UMass Lowell Computer Science, jcruz@student.uml.edu
  Copyright (c) 2016 by Joel Cruz.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author.
  updated by JC on March 27, 2016
*/

//allows automated smooth scrolling to target on page
//https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 400);
                return false;
            }
        }
    });
});