'use strict';

(function () { // eslint-disable-line func-names

	/**
	 * Detect ES6 support
	 */
	 
	function isES6() {
		"use strict";
		if (typeof Symbol == "undefined") return false;
		try {
			eval("class Foo {}");
			eval("var bar = (x) => x+1");
		} catch (e) { return false; }
		return true;
	}

	/**
	 * Preview compatibility
	 */

	var animationTemplate;
	if (DigitalServices.env.domainName === '.') {
		DigitalServices.env.animationId = DigitalServices.env.animationResourcePath.substring(DigitalServices.env.animationResourcePath.indexOf('/') + 1);
		DigitalServices.env.animationResourcePath = DigitalServices.env.animationResourcePath.replace(DigitalServices.env.animationId, '');
		animationTemplate = document.title.replace('.zip', '.html');
	} else {
		animationTemplate = DigitalServices.env.animationId.replace('/jcr:content', '');
	}

	/**
	 * Load global components
	 */

	var base = DigitalServices.env.animationResourcePath;
	var folder = 'dam/lv/online/animation/';
	if (base.indexOf(folder) !== -1) base = base.substring(0, base.indexOf(folder) + folder.length);
	base += 'Technical/';
	base += (/\/(uat|restricted)\//i.test(document.location.href) || DigitalServices.env.domainName === '.') ? 'uat/' : '';

	var components = document.createElement('link');
	components.setAttribute('rel', 'import');
	components.setAttribute('href', base + (isES6() ? 'animation.htm' : 'animation-es5.htm'));
	document.head.appendChild(components);

	/**
	 * Load animation components
	 */

	var animationPath = DigitalServices.env.animationResourcePath + DigitalServices.env.animationId;

	components = document.createElement('link');
	components.setAttribute('rel', 'import');
	components.setAttribute('href', animationPath + '/' + (isES6() ? 'components.htm' : 'components-es5.htm'));
	document.head.appendChild(components);

	function load() {
		var httpRequest = new XMLHttpRequest();
		httpRequest.addEventListener('readystatechange', function() {
			if (httpRequest.readyState === 4) {
				if (httpRequest.status === 200) {
					var container = document.getElementById('animationContent');
					var fragment = document.createDocumentFragment();
					fragment.appendChild(document.createElement('div'));
					fragment.childNodes[0].innerHTML = httpRequest.responseText;
					var animation = fragment.childNodes[0].querySelector('section');
					var template = document.createElement('template');
					template.innerHTML = animation.innerHTML;
					animation.innerHTML = '';
					animation.appendChild(template);
					container.appendChild(document.importNode(animation, true));
				}
			}
		});
		httpRequest.open('GET', animationPath + '/' + animationTemplate);
		httpRequest.send();
	}

	/**
	 * Load Web components polyfill (without Shadow DOM) if required
	 */

	if ('import' in document.createElement('link')) {
		load(true);
	} else {
		window.addEventListener('WebComponentsReady', load);
		var webcomponents = document.createElement('script');
		webcomponents.src = base + 'vendor/webcomponents-lite.js';
		document.head.appendChild(webcomponents);
	}

}());
