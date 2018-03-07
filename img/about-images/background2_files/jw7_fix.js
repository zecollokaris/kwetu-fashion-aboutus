/**
 * jw7_fix client-side code
 *
 * $Id: jw7_fix.js 8591 2017-02-10 15:14:24Z yannick $
 *
 * @package   Freecaster Engine
 * @author    Yannick Delwiche
 * @copyright (c) 2017 Freecaster SPRL
 */
Function.prototype.bind = function(oThis)
{
	if (typeof this !== "function")
	{
		// closest thing possible to the ECMAScript 5
		// internal IsCallable function
		throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	}

	var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function()
	{
	}, fBound = function()
	{
		return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
	};

	if (this.prototype)
	{
		// native functions don't have a prototype
		fNOP.prototype = this.prototype;
	}
	fBound.prototype = new fNOP();

	return fBound;
};
