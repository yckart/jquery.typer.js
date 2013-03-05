/*!
 * jquery.typer.js 0.0.1 - https://github.com/yckart/jquery.typer.js
 * The typewriter effect
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/09
*/
$.fn.typer = function(text, options){
    options = $.extend({}, {
        char: '',
        delay: 1,
        duration: 1,
        endless: true,
        delaychar:1000,
        onType: $.noop,
        afterWord: $.noop
    }, options || text);

    text = $.isPlainObject(text) ? options.text : text;

    var elem = $(this),
        isTag = false,
        c = 0;

    (function typetext(i) {
        var e = ({string:1, number:1}[typeof text] ? text : text[i]) + '',
            char = e.substr(c++, 1);
        options.onType();

        if( char === '<' ){ isTag = true; }
        if( char === '>' ){ isTag = false; }
        elem.html(e.substr(0, c) + (options.char || ' '));
        if(c <= e.length){
            if( isTag ){
                typetext(i);
            } else {
                //the change
                setTimeout(typetext, options.duration*options.delaychar, i);
            }
        } else {
            c = 0;
            i++;

            if (i === text.length && !options.endless) {
                return;
            } else if (i === text.length) {
                i = 0;
            }
            options.afterWord();
            setTimeout(typetext, options.delay, i);
        }
    })(0);
};
