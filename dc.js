
// The main canvas in the global scope
var canvas;

// All the objects on the canvas
var drawObject = new Array();

// Setup
function start() 
{
	// Setup our canvas
	canvas = document.getElementById("canvas");

        // Make the canvas fill the  browser
        [ canvasX, canvasY ] = Canvas.fullScreen( canvas );

	// Establish C as the canvas variable
	c = canvas.getContext("2d");

	// Blank the canvas
	Canvas.blank();

	// Setup our application
	Application.setup( c );

	// Define the default line width
	c.lineWidth = 1;

	handlers();

	// - Start the application
	Application.start();
}

// Setup the default handler configuration -- in case we change the handlers in a function (menus active)
function handlers()
{
	// Add the handlers
	// - Main content handler
	Application.addHandler( 0, 'draw( x, y, mode )', 150, 150, canvasX, canvasY );
	// - Toolbox handler
	Application.addHandler( 1, 'toolbox( x, y, mode )', 0, 300, 150, canvasY );

	Application.addHandler( 2, 'menubar( x, y, mode )', 0, 0, canvasX, 15 );

}

// Main work area
function draw( x, y, mode )
{
	if( mode == 'start' || mode == 'redraw' )
	{
		c.strokeStyle = "rgb(255,255,255)";
		c.strokeRect( 150, 150, (canvasX-150), (canvasY-150));
	}

	if( Application.isMousedown() )
	{
		drawObject[0] = x;
		drawObject[1] = y;
	}

	// Blank this area
	c.fillStyle = "rgb(0,0,0)";
	c.fillRect( 150, 150, (canvasX - 150), (canvasY-150) );

/*
	c.strokeStyle = "rgb(255,255,255)";
	c.lineWidth = 1;
	c.strokeRect( drawBox[0], drawBox[1], 100, 100 );
*/

	// Draw a boundary box
//	c.strokeRect( 150, 150, (canvasX - 150), (canvasY-150) );

/*
	c.strokeStyle = "rgb(0,255,0)";
	c.beginPath();
	c.moveTo( 150, 150 );
	c.lineTo( x, y );
	c.stroke();
*/
}

function toolbox( x, y, mode )
{
	if( mode == 'start' || mode == 'redraw' )
	{
		// Clear the area
		c.strokeStyle = "rgb(255,255,255)";
		c.strokeRect( 0, 300, 150, (canvasY-150));

		// Draw our default tools
		c.strokeRect( 10, 310, 130, 30 );
		return;
	}

/*
	// This does the curved yellow line
	c.fillStyle = "rbg(0,0,0)";
	c.fillRect( 0, 300, 150, (canvasY-150) );
	c.lineWidth = 1;
	c.strokeStyle = "rgb(255,255,255)";
	c.strokeRect( 0, 300, 150, (canvasY-150) );

	c.strokeStyle = "rgb(255,255,0)";
	c.beginPath();
	c.moveTo( 0, 300 );
	c.quadraticCurveTo( 50, 300, x, y );
	c.stroke();
*/
}

var Dropdown = Dropdown ? Dropdown : new Object();

Dropdown.menuData = new Array();

Dropdown.menuData[0] = new Array();
Dropdown.menuData[0]['name'] = 'FILE';
Dropdown.menuData[0]['x'] = 10;
Dropdown.menuData[0]['s'] = new Array();
Dropdown.menuData[0]['s'][0] = new Array();
Dropdown.menuData[0]['s'][0]['name'] = 'SAVE';
Dropdown.menuData[0]['s'][0]['callback'] = 'save';
Dropdown.menuData[0]['s'][1] = new Array();
Dropdown.menuData[0]['s'][1]['name'] = 'LOAD';
Dropdown.menuData[0]['s'][1]['callback'] = 'load';

Dropdown.menuData[1] = new Array();
Dropdown.menuData[1]['name'] = 'TOOLS';
Dropdown.menuData[1]['x'] = 80;
Dropdown.menuData[1]['s'] = new Array();
Dropdown.menuData[1]['s'][0] = new Array();
Dropdown.menuData[1]['s'][0]['name'] = 'SELECT';
Dropdown.menuData[1]['s'][0]['callback'] = 'select';

Dropdown.active = 'false';

function menubar( x, y, mode )
{
	if( mode == 'start' || mode == 'redraw' )
	{
		c.fillStyle = "rgb(128,128,128)";
		c.fillRect( 0, 0, canvasX, 15 );
		menuDropdownLabels();
	}

	if( Application.isMousedown() )
	{
		// Figure out which menu they've selected
		for( var i in Dropdown.menuData )
		{
			var thismenu = Dropdown.menuData[i];
			if( Dropdown.menuData[i+1] != undefined )
			{
				var nextmenu = Dropdown.menuData[i+1];
			
Debug.message( 'Current X '+x+' Nextmenu X '+Dropdown.nextmenu['x'] );
				if( x < nextmenu['x'] )
				{
					Dropdown.active = i;
Debug.message( 'Menu '+Dropdown.active+' is open' );
				}
			}
		}
	} 

}

Debug.print_r( Dropdown.menuData );

function menuDropdownLabels()
{
	for( var i in Dropdown.menuData )
	{		
		var thismenu = Dropdown.menuData[i];
		CanvasFont.drawString( c, thismenu['name'], "#000", 8, thismenu['x'], 4 );
	}
}


