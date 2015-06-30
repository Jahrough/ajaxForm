;(function ($) {
	'use strict';
	$.fn.ajaxForm = function (options) {
		var isForm = (this.prop('tagName') === 'FORM');

		return ({

			init: function ($elements, options) {
				if ($elements.length) {
					var eventType = (isForm) ? 'submit.ajaxForm' : 'click.ajaxForm',
						settings = this.validate(options);

					return $elements.off('.ajaxForm').on(eventType, {
						options: settings
					}, this.eventHandler.bind(this));
				}
			},

			validate: function (options) {
				var settings = {};

				try {
					if (typeof options === 'object') {
						settings = options;
					} else if (typeof options === 'function') {
						settings.success = options;
					} else {
						throw new Error(options + ' is not a valid object or function. Please make sure pass a valid argument.');
					}

				} catch (e) {
					console.log('$.ajaxForm()', e.message);

				} finally {
					return settings;
				}
			},

			eventHandler: function (e) {
				e.preventDefault();
				var formData = this.getFormData(e.currentTarget) || {},
					settings = $.extend({}, formData, e.data.options) || {};

				$.ajax(settings);
			},

			getFormData: function (element) {
				var $form = (isForm) ? $(element) : $(element).closest('form'),
					charset = $form.prop('accept-charset') || 'UTF-8',
					enctype = $form.prop('enctype') || 'application/x-www-form-urlencoded';

				return {
					contentType: enctype + '; charset=' + charset,
					method: $form.prop('method') || 'GET',
					url: $form.prop('action') || '',
					data: $form.serialize() || ''
				};
			}

		}.init(this, options));
		
	};
	
}(jQuery));