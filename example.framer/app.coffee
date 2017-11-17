# @steveruizok
require "gotcha"


# Press ` to enable mode; press ` again to disable it.


Screen.backgroundColor= '#FFF'
layer = new Layer
	height: 100
	width: 64, y: 328, backgroundColor: "rgba(131,72,23,0.5)", x: 24

layer = new Layer
	height: 100
	width: 100, y: 258, x: 257
	shadowX: 1
	shadowY: 1
	shadowColor: '#000'

layer = new Layer
	height: 100
	width: 100, y: 38, x: 24

class SpecialButton extends Layer
	constructor: (options = {}) ->
		
		_.defaults options,
			height: 64, width: 320
			borderRadius: 4
			backgroundColor: 'rgba(137, 221, 255, 1.000)'
			borderColor: 'rgba(0, 160, 226, 1.000)'
			shadowY: 2
			shadowColor: '#aaa'
			shadowBlur: 4

		super options	
		
		@textLayer = new TextLayer
			parent: @
			point: Align.center
			text: 'Click Here Now!'
			fontSize: 16
			color: '#000'



layer = new Layer
	height: 100
	width: 100, y: 82, x: 60
layer = new Layer
	height: 100
	width: 100, y: 82, x: 238
layer = new Layer
	height: 100
	width: 100, y: 38, x: 257


text = new TextLayer
	fontSize: 48
	fontFamily: 'Helvetica'
	fontWeight: 500
	color: '#000'
	x: 10
	y: 152
	text: 'Vampires'

text = new TextLayer
	fontSize: 32
	fontFamily: 'Helvetica'
	fontWeight: 500
	color: '#000'
	x: 60
	y: 212
	text: 'in the'
	fontStyle: 'italic'
	
text = new TextLayer
	fontSize: 56
	fontFamily: 'Helvetica'
	fontWeight: 500
	x: 24
	y: 258
	text: 'Lemon Grove'
	color: 'orange'
	shadowY: 3


layer = new Layer
	name: 'big border'
	height: 47
	width: 114
	x: 124, y: 373
	borderRadius: 4
	borderWidth: 10

layer = new Layer
	name: 'square'
	height: 100
	width: 100
	x: 60, y: 439
	borderRadius: 4


layerB = new Layer
	height: 60
	width: 48
	x: 259, y: 440, scale: 1.05
	shadowX: 1
	shadowY: 3
	shadowBlur: 6
	shadowColor: 'rgba(0,0,0,.30)'


button = new SpecialButton
	x: Align.center
	y: Align.bottom(-12)