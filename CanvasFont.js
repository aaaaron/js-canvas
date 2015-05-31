/**
 *  CanvasFont class
 *   - Initial concept and 0-9 % . by http://www.netzgesta.de/S5/canvas-text.html
 *   - Class & Alphabet by Aaron Abelard
 */
var CanvasFont = CanvasFont ? CanvasFont : new Object();

CanvasFont.deg2rad = function(degrees) {
	return Math.PI *degrees/180;
}
CanvasFont.drawString = function( ctx, txt, col, fh, tx, ty )
{
	var fw = fh*0.666666; 
	var lw = fh*0.125;  
	var ls = lw/2; 
	var xp = 0; 
	var cr = lw; 
	var ascii;
	var symbol;
	var offsetX, offsetY;
	var ch,cw,cy,cx;
	var charWidth = fw; // default width

	ctx.lineCap = "round"; 
	ctx.lineJoin = "round"
	ctx.lineWidth = lw; 
	ctx.strokeStyle = col;

	for (var i = 0; i < txt.length; i++) {
		fc = ls;
		cx = tx+xp;
		cy = ty;
		cw = fw;
		ch = fh;
		// Shrink lower case 
		lower = false;
		symbol = txt[i];	
		ascii = symbol.charCodeAt(0);
		if( ascii >= 97 && ascii <= 122 )
		{
			offsetY = ch * 0.2;
			offsetX = cw * 0.2;
			ch = fh * 0.8;
			cw = fw * 0.8;
			cx = xp + tx + offsetX;
			cy = ty + offsetY;
		}
		charWidth = CanvasFont.drawSymbol( ctx, txt[i], fc, cx, cy, cw, ch);
		xp = xp + ( charWidth )+5;
	}

	// For debugging, red = top, green = center, blue=bottom
	/*
	   ctx.fillStyle="rgb(255,0,0)";
	   ctx.fillRect(tx,ty,xp,1);
	   ctx.fillStyle="rgb(0,255,0)";
	   ctx.fillRect(tx,ty+(fh/2),xp,1);
	   ctx.fillStyle="rgb(0,0,255)";
	   ctx.fillRect(tx,ty+fh,xp,1);
	 */
	
}
CanvasFont.drawSymbol = function( ctx, symbol, fc, cx, cy, cw, ch )
{
	var fcOffset = 1.17; // This is a fudge factor to prevent antialiased portions being "thickened"

	var width = cw; // normal width = full char width, results in fixed width unless we override it

	// This will show the bounding box for each letter
	//ctx.fillStyle="rgba(255,0,0,0.3)";
	//ctx.fillRect( cx,cy,cw,ch );

	ctx.beginPath();
	switch (symbol) {
		case 'A':
			ctx.moveTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+fc,cy+(ch*0.66666));
			ctx.lineTo(cx+(cw/2),cy+fc);
			ctx.lineTo(cx+cw-fc,cy+(ch*0.66666));
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
			ctx.moveTo(cx+cw-fc,cy+(ch*0.66666)+fc);
			ctx.lineTo(cx+fc,cy+(ch*0.66666)+fc);
			ctx.closePath();
		break;
		case 'B':
			ctx.moveTo(cx+(fc*fcOffset),cy+fc);
			ctx.arc(cx+(cw/2)+fc,cy+(ch*0.25)+(fc/2),((ch-(fc*2))/4),CanvasFont.deg2rad(270),CanvasFont.deg2rad(90), false);
			ctx.arc(cx+(cw/2)+fc,cy+(ch*0.75)-(fc/2),((ch-(fc*2))/4),CanvasFont.deg2rad(270),CanvasFont.deg2rad(90), false);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+fc,cy+fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch/2));
			ctx.lineTo(cx+(cw/1.5),cy+(ch/2));
		break;
		case 'C':
			ctx.moveTo(cx+cw-fc,cy+(ch*0.333333));
			ctx.arc(cx+(cw/2),cy+(cw/2),(cw/2)-fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(180), true);
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(180),CanvasFont.deg2rad(0), true);
		break;
		case 'D':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(90),CanvasFont.deg2rad(0), true);
			ctx.arc(cx+(cw/2),cy+(cw/2),(cw/2)-fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(270), true);
			ctx.lineTo(cx+fc,cy+fc);
		break;
		case 'E':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch/2));
			ctx.lineTo(cx+(cw*0.66666),cy+(ch/2));
			ctx.moveTo(cx+(fc*fcOffset),cy+fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
		break;
		case 'F':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch/2));
			ctx.lineTo(cx+(cw*0.66666),cy+(ch/2));
			ctx.moveTo(cx+(fc*fcOffset),cy+fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
		break;
		case 'G':
			ctx.moveTo(cx+cw-fc,cy+(ch*0.333333));
			ctx.arc(cx+(cw/2),cy+(cw/2),(cw/2)-fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(180), true);
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(180),CanvasFont.deg2rad(0), true);
			ctx.moveTo(cx+cw-fc,cy+(ch*0.63));
			ctx.lineTo(cx+(cw/2)+fc,cy+(ch*0.63));
		break;
		case 'H':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch/2));
			ctx.lineTo(cx+cw-(fc*fcOffset),cy+(ch/2));
			ctx.moveTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'I':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
			ctx.moveTo(cx+(cw/2),cy+fc);
			ctx.lineTo(cx+(cw/2),cy+ch-fc);
			ctx.moveTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'J':
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(180),CanvasFont.deg2rad(0), true);
			ctx.lineTo(cx+cw-fc,cy+fc);
		break;
		case 'K':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch/2));
			ctx.lineTo(cx+cw-fc,cy+fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch/2));
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'L':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'M':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+(cw/2),cy+(ch/2));
			ctx.lineTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'N':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
		break;
		case 'O':
			ctx.moveTo(cx+fc,cy+(ch*0.333333));
			ctx.arc(cx+(cw/2),cy+(cw/2),(cw/2)-fc,CanvasFont.deg2rad(180),0, false);
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,0,CanvasFont.deg2rad(180), false);
			ctx.closePath();
		break;
		case 'P':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+fc);
			ctx.lineTo(cx+(cw/2),cy+fc);
			ctx.arc(cx+(cw/2)+fc,cy+((ch-(fc*2))*0.30000),(ch/5),CanvasFont.deg2rad(270),CanvasFont.deg2rad(90), false);
			ctx.lineTo(cx+(fc*fcOffset),cy+(ch/2)-(fc/2));
		break;
		case 'Q':
			ctx.moveTo(cx+fc,cy+(ch*0.333333));
			ctx.arc(cx+(cw/2),cy+(cw/2),(cw/2)-fc,CanvasFont.deg2rad(180),0, false);
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,0,CanvasFont.deg2rad(180), false);
			ctx.closePath();
			ctx.moveTo(cx+(cw*0.5),cy+(ch*0.66666));
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'R':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+fc);
			ctx.lineTo(cx+(cw/2),cy+fc);
			ctx.arc(cx+(cw/2)+fc,cy+((ch-(fc*2))*0.30000),(ch/5),CanvasFont.deg2rad(270),CanvasFont.deg2rad(90), false);
			ctx.lineTo(cx+(fc*fcOffset),cy+(ch/2)-(fc/2));
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;	
		case 'S':
			ctx.moveTo(cx+cw-fc,cy+fc);
			ctx.arc(cx+(cw/2)-fc,cy+(ch*0.25)+(fc/2),((ch-(fc*2))/4),CanvasFont.deg2rad(270),CanvasFont.deg2rad(90), true);
			ctx.arc(cx+(cw/2)+fc,cy+(ch*0.75)-(fc/2),((ch-(fc*2))/4),CanvasFont.deg2rad(270),CanvasFont.deg2rad(90), false);
			ctx.lineTo(cx+fc,cy+ch-fc);
		break;
		case 'T':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
			ctx.moveTo(cx+(cw/2),cy+fc);
			ctx.lineTo(cx+(cw/2),cy+ch-fc);
		break;
		case 'U':
			ctx.moveTo(cx+cw-fc,cy+fc);
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,0,CanvasFont.deg2rad(180), false);
			ctx.lineTo(cx+fc,cy+fc);
		break;
		case 'V':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+(cw/2),cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
		break;
		case 'W':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+(cw*0.25),cy+ch-fc);
			ctx.lineTo(cx+(cw*0.5),cy+fc);
			ctx.lineTo(cx+(cw*0.75),cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
		break;
		case 'X':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
			ctx.moveTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
		break;
		case 'Y':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+(cw/2),cy+(ch/2));
			ctx.lineTo(cx+cw-fc,cy+fc);
			ctx.moveTo(cx+(cw/2),cy+(ch/2));
			ctx.lineTo(cx+(cw/2),cy+ch-fc);
		break;
		case 'Z':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'a':
			ctx.arc(cx+(cw/2),(cy+(ch/2)+(fc*3)),(cw/2.5)-fc,CanvasFont.deg2rad(30),CanvasFont.deg2rad(330), false);
			ctx.moveTo(cx+cw-(fc*2),cy+ch-fc);
			ctx.lineTo(cx+cw-(fc*2),cy+(ch*0.5)-(fc));
			ctx.arc(cx+(cw/2)-(fc/4),(cy+(ch/2)+((fc*fcOffset)*3))-(cw/2),(cw/2.5)-fc,CanvasFont.deg2rad(360),CanvasFont.deg2rad(270), true);
		break;
		case 'b':
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(150),CanvasFont.deg2rad(210), true);
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
		break;
		case 'c':
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(310),CanvasFont.deg2rad(50), true);
		break;
		case 'd':
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(330),CanvasFont.deg2rad(30), true);
			ctx.moveTo(cx+cw-fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
		break;
		case 'e':
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(50),CanvasFont.deg2rad(330), false);
			ctx.lineTo(cx+cw-fc,cy+(ch/2)+(fc*1.75));
			ctx.lineTo(cx+(fc*fcOffset),cy+(ch/2)+(fc*1.75));
		break;
		case 'f':
			width = (cw / 1.4);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.arc(cx+(cw/2),(cy+(ch*0.666666))-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(180),CanvasFont.deg2rad(270), false);
			ctx.lineTo(cx+(cw/2)+fc,cy+fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(cw*0.66666))
			ctx.lineTo(cx+(cw/2)+fc,cy+(cw*0.66666));
		break;
		case 'g':
			cy=cy+(ch*0.35); // Push this character down 
			ctx.arc(cx+(cw/2)+(fc/(2*fcOffset)),(cy+(ch*0.65))-(cw/2),(cw/2)-(fc*fcOffset),CanvasFont.deg2rad(330),CanvasFont.deg2rad(30), true);
			ctx.moveTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+(ch*0.5));
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(360),CanvasFont.deg2rad(140), false);
		break;
		case 'h':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.arc(cx+(cw/2),(cy+(ch))-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(190),CanvasFont.deg2rad(0), false);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'i':
			width = (cw / 3);
			ctx.moveTo(cx+fc,cy+(ch/2));
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+fc,cy+(ch*0.25));
			ctx.lineTo(cx+fc,cy+(ch*0.26));
		break;
		case 'j':
			cy=cy+(ch*0.35); // Push this character down 
			ctx.lineTo(cx+cw-fc,cy+(cw*0.25));
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(360),CanvasFont.deg2rad(140), false);
			ctx.moveTo(cx+cw-fc,cy-fc);
			ctx.lineTo(cx+cw-fc,cy-(fc*fcOffset));
		break;
		case 'k':
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch*0.66666));
			ctx.lineTo(cx+cw-fc,cy+(ch/2)-fc);
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch*0.66666));
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'l':
			width = (cw / 2.5);
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);	
		break;
		case 'm':
			ctx.moveTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+fc,cy+(ch/2)-fc);
			ctx.arc(cx+(cw/3),(cy+(ch))-(cw/1.5),(cw/3.2)-fc,CanvasFont.deg2rad(190),CanvasFont.deg2rad(20), false);
			ctx.arc(cx+((cw/3)*2.1),(cy+(ch))-(cw/1.5),(cw/3.2)-fc,CanvasFont.deg2rad(190),CanvasFont.deg2rad(0), false);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'n':
			ctx.moveTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+fc,cy+(ch/2)-fc);
			ctx.arc(cx+(cw/2),(cy+(ch))-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(190),CanvasFont.deg2rad(0), false);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'o':
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(360), true);
		break;
		case 'p':
			cy=cy+(ch*0.35); // Push this character down 
			ctx.arc(cx+(cw/2),(cy+(ch*0.65))-(cw/2),(cw/2)-(fc*fcOffset),CanvasFont.deg2rad(210),CanvasFont.deg2rad(150), false);
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
		break;
		case 'q':
			cy=cy+(ch*0.35); // Push this character down 
			ctx.arc(cx+(cw/2),(cy+(ch*0.65))-(cw/2),(cw/2)-(fc*fcOffset),CanvasFont.deg2rad(340),CanvasFont.deg2rad(40), true);
			ctx.moveTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case 'r':
			width = (cw / 1.8);
			ctx.moveTo(cx+fc,cy+(cw/2));
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.arc(cx+(cw/2),(cy+(ch))-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(190),CanvasFont.deg2rad(290), false);
		break;
		case 's':
			width = (cw / 1.3);
			ctx.arc(cx+(cw/2),cy+(ch*0.48),((ch-(fc*2))/6),CanvasFont.deg2rad(310),CanvasFont.deg2rad(110), true);
			ctx.arc(cx+(cw/2.2),cy+(ch*0.78),((ch-(fc*2))/6),CanvasFont.deg2rad(290),CanvasFont.deg2rad(160), false);
		break;
		case 't':
			width = (cw / 1.5);
			ctx.arc(cx+(cw/3),cy+(ch*0.78),((ch-(fc*2))/6),CanvasFont.deg2rad(40),CanvasFont.deg2rad(160), false);
			ctx.lineTo(cx+fc,cy+(ch*0.33333));
			ctx.moveTo(cx+(fc*fcOffset),cy+(ch*0.5));
			ctx.lineTo(cx+(cw*0.5),cy+(ch*0.5));
		break;
		case 'u':
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,CanvasFont.deg2rad(20),CanvasFont.deg2rad(180), false);
			ctx.lineTo(cx+fc,cy+(ch/2)-fc);
			ctx.moveTo(cx+cw-fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+(ch/2)-fc);
		break;
		case 'v':
			ctx.moveTo(cx+fc,cy+(ch/2)-fc);
			ctx.lineTo(cx+(cw/2),cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+(ch/2)-fc);
		break;
		case 'w':
			ctx.moveTo(cx+fc,cy+(ch/2)-fc);
			ctx.lineTo(cx+(cw*0.25),cy+ch-fc);
			ctx.lineTo(cx+(cw*0.5),cy+(ch/2)-fc);
			ctx.lineTo(cx+(cw*0.75),cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+(ch/2)-fc);
		break;
		case 'x':
			ctx.moveTo(cx+fc,cy+(cw/2)+fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
			ctx.moveTo(cx+cw-fc,cy+(cw/2)+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
		break;
		case 'y':
			cy=cy+(ch*0.35); // Push this character down 
			ctx.moveTo(cx+fc,cy+fc);
			ctx.lineTo(cx+(cw/2),cy+(ch/2));
			ctx.moveTo(cx+cw-(fc*2),cy+fc);
			ctx.lineTo(cx+(cw*0.3),cy+ch-fc);
		break;
		case 'z':
			ctx.moveTo(cx+fc,cy+(cw/2)+fc);
			ctx.lineTo(cx+cw-fc,cy+(cw/2)+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
		break;
		case "0":
			ctx.moveTo(cx+fc,cy+(ch*0.333333));
			ctx.arc(cx+(cw/2),cy+(cw/2),(cw/2)-fc,CanvasFont.deg2rad(180),0, false);
			ctx.arc(cx+(cw/2),(cy+ch)-(cw/2),(cw/2)-fc,0,CanvasFont.deg2rad(180), false);
			ctx.closePath();
			ctx.moveTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
		break;
		case "1":
			ctx.moveTo(cx+(cw*0.1)+fc,cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
			ctx.moveTo(cx+(cw*0.666666),cy+ch-fc);
			ctx.lineTo(cx+(cw*0.666666),cy+fc);
			ctx.lineTo(cx+(cw*0.25),cy+(ch*0.25));
		break;
		case "2":
			ctx.moveTo(cx+cw-fc,cy+(ch*0.8));
			ctx.lineTo(cx+cw-fc,cy+ch-fc);
			ctx.lineTo(cx+fc,cy+ch-fc);
			ctx.arc(cx+(cw/2),cy+(cw*0.425),(cw*0.425)-fc,CanvasFont.deg2rad(45),CanvasFont.deg2rad(-180), true);
		break;
		case "3":
			ctx.moveTo(cx+(cw*0.1)+fc,cy+fc);
			ctx.lineTo(cx+(cw*0.9)-fc,cy+fc);
			ctx.arc(cx+(cw/2),cy+ch-(cw*0.5),(cw*0.5)-fc,CanvasFont.deg2rad(-90),CanvasFont.deg2rad(180), false);
		break;
		case "4":
			ctx.moveTo(cx+(cw*0.75),cy+ch-fc);
			ctx.lineTo(cx+(cw*0.75),cy+fc);
			ctx.moveTo(cx+cw-fc,cy+(ch*0.666666));
			ctx.lineTo(cx+fc,cy+(ch*0.666666));
			ctx.lineTo(cx+(cw*0.75),cy+fc);
			ctx.moveTo(cx+cw-fc,cy+ch-fc);
			ctx.lineTo(cx+(cw*0.5),cy+ch-fc);
		break;
		case "5":
			ctx.moveTo(cx+(cw*0.9)-fc,cy+fc);
			ctx.lineTo(cx+(cw*0.1)+fc,cy+fc);
			ctx.lineTo(cx+(cw*0.1)+fc,cy+(ch*0.333333));
			ctx.arc(cx+(cw/2),cy+ch-(cw*0.5),(cw*0.5)-fc,CanvasFont.deg2rad(-80),CanvasFont.deg2rad(180), false);
		break;
		case "6":
			ctx.moveTo(cx+fc,cy+ch-(cw*0.5)-fc);
			ctx.arc(cx+(cw/2),cy+ch-(cw*0.5),(cw*0.5)-fc,CanvasFont.deg2rad(-180),CanvasFont.deg2rad(180), false);
			ctx.bezierCurveTo(cx+fc,cy+fc,cx+fc,cy+fc,cx+(cw*0.9)-fc,cy+fc);
			ctx.moveTo(cx+(cw*0.9)-fc,cy+fc);
		break;
		case "7":
			ctx.moveTo(cx+(cw*0.5),cy+ch-fc);
			ctx.lineTo(cx+cw-fc,cy+fc);
			ctx.lineTo(cx+(cw*0.1)+fc,cy+fc);
			ctx.lineTo(cx+(cw*0.1)+fc,cy+(ch*0.25)-fc);
		break;
		case "8":
			ctx.moveTo(cx+(cw*0.92)-fc,cy+(cw*0.59));
			ctx.arc(cx+(cw/2),cy+(cw*0.45),(cw*0.45)-fc,CanvasFont.deg2rad(25),CanvasFont.deg2rad(-205), true);
			ctx.arc(cx+(cw/2),cy+ch-(cw*0.5),(cw*0.5)-fc,CanvasFont.deg2rad(-135),CanvasFont.deg2rad(-45), true);
			ctx.closePath();
			ctx.moveTo(cx+(cw*0.79),cy+(ch*0.47));
			ctx.lineTo(cx+(cw*0.21),cy+(ch*0.47));
		break;
		case "9":
			ctx.moveTo(cx+cw-fc,cy+(cw*0.5));
			ctx.arc(cx+(cw/2),cy+(cw*0.5),(cw*0.5)-fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(360), false);
			ctx.bezierCurveTo(cx+cw-fc,cy+ch-fc,cx+cw-fc,cy+ch-fc,cx+(cw*0.1)+fc,cy+ch-fc);
		break;
		case "%":
			ctx.moveTo(cx+fc,cy+(ch*0.75));
			ctx.lineTo(cx+cw-fc,cy+(ch*0.25));
			ctx.moveTo(cx+(cw*0.505),cy+(cw*0.3));
			ctx.arc(cx+(cw*0.3),cy+(cw*0.3),(cw*0.3)-fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(360), false);
			ctx.moveTo(cx+(cw*0.905),cy+ch-(cw*0.3));
			ctx.arc(cx+(cw*0.7),cy+ch-(cw*0.3),(cw*0.3)-fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(360), false);
		break;
		case ".":
			ctx.moveTo(cx+(cw*0.25),cy+ch-fc-fc);
			ctx.arc(cx+(cw*0.25),cy+ch-fc-fc,fc,CanvasFont.deg2rad(0),CanvasFont.deg2rad(360), false);
			ctx.closePath();
		case ' ':
			width = (cw/2);
		break;
	}	
	ctx.stroke();

	return width;
}

