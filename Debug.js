/**
 *  Debug window
 */
var Debug = Debug ? Debug : new Object();

Debug.setup = function( id ) 
{
	Debug.dw = window.open( "", "debugWin"+id, "toolbar=no,scrollbars,width=1000,height=600" );
	Debug.dw.document.clear();
	Debug.dw.document.writeln( "<title>Debug Window: "+id+"</title>" );
	Debug.dw.document.writeln( "<font face=monospace>" );
	Debug.dw.document.writeln( "<hr noshadow size=1>" );
	Debug.dw.moveTo(0,0);
	parent.focus();
}

Debug.message = function( text )
{
	if( Debug.dw === undefined ) Debug.setup();

	Debug.dw.document.writeln( text+'<br>' );
	Debug.dw.scrollBy( 0,10000 );
	self.focus();
}

/* http://www.brandnewbox.co.uk/logbook/article/a_print_r_equivalent_for_javascript/ */
Debug.print_r = function( theObj, context )
{
	if( Debug.dw === undefined ) Debug.setup();

	if( theObj == null ) 
	{
		Debug.dw.document.writeln( 'Object/Array is NULL' );
	}
	else
	{
		if( theObj.constructor == Array || theObj.constructor == Object)
		{
			Debug.dw.document.writeln("<ul>");
			for( var p in theObj )
			{
				if( typeof( theObj[p] ) == 'array' || typeof( theObj[p] ) == 'object' )
				{
					Debug.dw.document.writeln( "<li> [" + p + "] => " + typeof(theObj) + "</li>" );
					Debug.dw.document.writeln( "<ul>" );
					Debug.print_r( theObj[p] );
					Debug.dw.document.writeln( "</ul>" );
				} else {
					Debug.dw.document.writeln( "<li> [" + p + "] => " + theObj[p] + "</li>" );
				}
			}
			Debug.dw.document.writeln( "</ul>" );
			Debug.dw.scrollBy( 0,10000 );
		}
	}
}
