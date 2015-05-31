var Application = Application ? Application : new Object();

Application.setup = function( canvas )
{
	Application.canvas = canvas;

	Application._handlers = new Array();

	Application._mouseDown = false;
}

Application.start = function()
{
	Application.allHandlers( 'start' );
}

Application.redraw = function()
{
	Application.allHandlers( 'redraw' );
}

Application.resize = function( canvas )
{
	Canvas.resize( canvas );

	Application.redraw();
}

Application.addHandler = function( id, callback, x1, y1, x2, y2 )
{
	Application._handlers[id] = new Application.handler( callback, x1, y1, x2, y2 );
}

Application.allHandlers = function( mode )
{
	for( var i in Application._handlers )
	{
		thisZone = Application._handlers[i];
		eval( thisZone.callback );
	}
}

Application.handler = function( callback, x1, y1, x2, y2 )
{
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.callback = callback;	
}

Application.findHandler = function( event, mode )
{
	[ x, y ] = Common.mousePosition( event );

	// Go through the list of handlers and see if we're inside one
	for( var i in Application._handlers )
	{
		thisZone = Application._handlers[i];
		if( thisZone.x1 <= x && thisZone.x2 >= x 
		 && thisZone.y1 <= y && thisZone.y2 >= y )
		{
			eval( thisZone.callback );
		}
	}
}

Application.mouseClick = function( event )
{
	Application.findHandler( event, 'click' );
}

Application.mouseMove = function( event )
{
	Application.findHandler( event, 'move' );
}

Application.mouseUp = function( event )
{
	Application._mouseDown = false;
	Application.findHandler( event, 'up' );
}

Application.mouseDown = function( event )
{
	Application._mouseDown = true;
	Application.findHandler( event, 'down' );
}

Application.isMousedown = function()
{
	return Application._mouseDown;
}

Application.drawButton = function( label, x1, y1, x2, y2, fontSize )
{
	if( fontSize === undefined ) fontSize = 20;

	Application.canvas.fillStyle = "rgb(128,128,128)";
	Application.canvas.fillRect( x1, y1, (x2 - x1), (y2 - y1) );

	var textX = x1 + ((x2 - x1)/12);
	var textY = y1 + ((y2 - y1)/4);
	CanvasFont.drawString( Application.canvas, label, "#FFF", fontSize, textX, textY );
}

