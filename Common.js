/**
 *  Common javascript functions for all apps
 */
var Common = Common ? Common : new Object();

Common.setup = function( canvas )

Common.setMessage = function( target, message, color )
{
	$( target ).html( message );
	if( color != 'undefined' )	
	{
		$( target ).css( 'color', color );
	}
}

Common.error = function( message )
{
	if( Debug !== undefined )
	{
		Debug.message( message );
	}
	stop();
}
	
Common.redirect = function( url )
{
	if( url.substring(0,4) == 'http' )
	{
		window.location = url;
	}

	if( url.substring(0,1) != '/' )
	{
		url = '/'+url;
	}

	var target = jQuery.url.attr('protocol')+'://';
	target += jQuery.url.attr('host');
	target += url;

	window.location = target;
}

// TODO this one seems shitty
Common.browser = function()
{
        var browser = navigator.appName;

        if( browser == 'Netscape' )
	{
                return 'F';
	}

        return 'I';
}

Common.openWin = function( page, width, height )
{
	var opts = "menubar=no,history=no,resizable=yes,scrollbars=yes,toolbar=no,width="+width+",height="+height;
	var w = window.open( page, "_blank", opts );
}

Common.go = function( url )
{
	document.location.href = url;
	return true;
}

Common.setClass = function( element, myclass )
{
	element.setAttribute( "class", myclass );
	element.setAttribute( "className", myclass );
	return false;
}

Common.confirmation = function( msg, url )
{
	var answer = confirm( msg );
	if( answer )
	{
		window.location = url;
	}
}

// number_format(number, decimals, comma, formatSeparator)
// copied from http://mathiasbynens.be/archive/2006/01/js-number-format
Common.number_format = function( a, b, c, d )
{
	var k = '';
	if(a.indexOf('-') == 0) {
		k = '-';
		a = a * -1;
	}
	a = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
	var e = a + '';
	var f = e.split('.');
	if(!f[0]) f[0] = '0';
	if(!f[1]) f[1] = '';
	if(f[1].length < b) {
		var g = f[1];
		for(var i = f[1].length + 1; i <= b; i++) {
			g += '0';
		}
		f[1] = g;
	}
	if(d != '' && f[0].length > 3) {
		var h = f[0];
		f[0] = '';
		for(var j = 3; j < h.length; j += 3) {
			i = h.slice(h.length - j, h.length - j + 3);
			f[0] = d + i +  f[0] + '';
		}
		j = h.substr(0, (h.length % 3 == 0) ? 3 : (h.length % 3));
		f[0] = j + f[0];
	}
	c = (b <= 0) ? '': c;
	return k + f[0] + c + f[1];
}

// copied from http://www.quirksmode.org/js/events_properties.html
Common.mousePosition = function( e )
{
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	return new Array( posx, posy );
}

