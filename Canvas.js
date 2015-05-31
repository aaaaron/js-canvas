/**
 *  Canvas class
 */
var Canvas = Canvas ? Canvas : new Object();

Canvas.scheduleArray = new Array;

Canvas.run = function( id, tick, interval, expression )
{
	// Keep track of the start time for each of our animation
	Canvas.scheduleArray[id] = new Date();
	// Begin this animation
	Canvas.scheduler( id, tick, interval, expression );
}

// id = this animation id (in case we're running many at once)
// tick = time in milliseconds between frames
// interval = time in milliseconds to run
// expression = command to run
// iteration = loop counter
Canvas.scheduler = function( id, tick, interval, expression, iteration )
{
	if( iteration === undefined )
	{
		var iteration = 0;
	}
	var now = new Date();
	var nowTime = now.getTime();
	var startTime = Canvas.scheduleArray[id].getTime();
	// First, see if we're still running
	if(( startTime + interval ) > nowTime )
	{
		iteration = iteration + tick;
		// We're still in our interval, so reschedule us to fire again in tick ms
		setTimeout( 'Canvas.scheduler( '+id+','+tick+','+interval+',"'+expression+'",'+iteration+' )', tick );
		// And then do what we were told to do 
		eval( expression );
	}
}

Canvas.resizeCanvas = function( canvas, x, y, coordinateArray )
{
	if( coordinateArray !== undefined )
	{
		[ x, y ] = coordinateArray;
	}

	canvas.style.width = x + "px";
	canvas.width = x;
	canvas.style.height = y + "px";
	canvas.height = y;
}

Canvas.getBrowserSize = function()
{
        if( Common.browser() == 'I' )
        {
                var x = document.documentElement.clientWidth;
                var y = document.documentElement.clientHeight;
        }
        else
        {
                var x = document.body.clientWidth;
                var y = document.body.clientHeight;
        }

	return new Array( x, y );
}

Canvas.fullScreen = function( canvas )
{
	if( canvas === undefined )
	{
		Common.error( 'Canvas is not defined in Canvas.fullScreen()' );
	}

	[ x, y ] = Canvas.getBrowserSize();
	
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

	Canvas.resizeCanvas( canvas, x, y );

	return new Array( x, y );
}

Canvas.resize = function( canvas, redo )
{
	// Make the canvas fit that size
	[ canvasX, canvasY ] = Canvas.fullScreen( canvas );

	c = canvas.getContext("2d");

	// Why are we running this twice again?
	if( redo === undefined ) Canvas.resize( canvas, true );

	Canvas.blank();
}

Canvas.blank = function()
{
	c.fillStyle = "rgb(0,0,0)";
	c.fillRect( 0, 0, canvasX, canvasY );
}

