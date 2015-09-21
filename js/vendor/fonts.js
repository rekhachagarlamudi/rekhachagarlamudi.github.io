/*!
 * fonts.js
 *
 * Google Webfont Loader, used for asynchronous loading of webfonts.
 * The classes '.wf-loading', '.wf-active', and '.wf-inactive' can be used to
 * hide/display content to prevent the FOUT.
 */


// Configure the webfonts in this object,
WebFontConfig = {
  google: {
    families: ['Open+Sans:400italic,400,300,700:latin']
  }
};


// Google's loading script.
(function(d) {
  var wf = d.createElement('script'), s = d.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
  s.parentNode.insertBefore(wf, s);
})(document);