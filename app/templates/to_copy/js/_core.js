;(function (window) {

    'use strict';

    //
    // Export app to the global namespace
    // 
    window.app = window.app || {};

    //
    // Shorthand reference to jQuery wrapped <html>
    //
		var $html = $('html'),

	 //
	 // Set a baseline for our inputs to keep the Backbone View events hashes
	 // consistent and avoid duplicate code
	 //
	 setInputTriggers = function () {
	   if (typeof(window.Modernizr) === 'undefined') {
	     Modernizr = {touch: false};
	   }
	   return {
	     'click' : Modernizr.touch ? 'touchstart' : 'click',
	     'move' : Modernizr.touch ? 'touchmove' : 'mousemove',
	     'end' : Modernizr.touch ? 'touchend' : 'mouseup'
	   };
	 };

    //
    // Augment our main application settings with those set serverside
    //
    app = _.extend(app, {
      views: {},

      //
      // Default templates written to DOM
      //
      templates: {},

      //
      // Attach interface for input detection to main app
      //
      inputTriggers: setInputTriggers(),

      touch: Modernizr.touch,

      $scrollEl: navigator.userAgent.toLowerCase().indexOf('webkit') !== -1 ? $('body') : $('html'),

      browser: {
	 isOldIE: $html.hasClass('is-ie9') || $html.hasClass('lt-ie9'),
	 ie9: $html.hasClass('is-ie9') && !$html.hasClass('lt-ie9'),
	 ie8: $html.hasClass('lt-ie9'),
	 ff: navigator.userAgent.toLowerCase().indexOf('firefox') !== -1
      }
    }, Backbone.Events);

    /**
     * Fetch and return DOM templates. Either compiled or raw
     * @param  {Object} req
     * @return {String}
     */
    app.fetchTemplate = function(req) {
      // Allow tempaltes to be retireved from predefined selectors || DOM query
      var template = this.templates[req.template] || $(req.template).html();

      // Return raw template or compiled Handlebars templlate
      return req.compile ? Handlebars.compile(template) : template;
    };


    /**
     * Returns a compiled and rendered Handlebars template
     * @param  {Object} req
     * @return {String}
     */
    app.fetchRenderedTemplate = function(req) {
      // Grab template from predefined templates hash or lookup in DOM
      var template = this.templates[req.template] || $(req.template).html();

      // Compile template
      template = Handlebars.compile(template);

      // Return compiled and populated template
      return( template(req.data) );
    };  

})(window);
