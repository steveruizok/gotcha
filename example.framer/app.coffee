# @steveruizok
require "gotcha"

# Press ` to enable mode; press ` again to disable it.

Screen.backgroundColor = '#000'

class Bullet extends Layer
	constructor: (options = {}) ->
		
		_.defaults options,
			height: 12
			width: 12
			borderRadius: 16
			backgroundColor: '#FFF'
		
		super options
		
		@textLayer = new TextLayer
			parent: @
			x: @width + 16
			y: Align.center
			fontFamily: 'Helvetica'
			text: 'Gotcha'
			color: '#fff'
			fontWeight: 600
			fontSize: 20
			width: 300
			lineHeight: 1
			text: options.text ? 'Bullet point'

class CTA extends Layer
	constructor: (options = {}) ->
		
		_.defaults options,
			backgroundColor: null
			borderRadius: 4
			height: 44
			width: 128
			text: 'Click Me'
			backgroundColor: 'rgba(0, 170, 255, 1.000)'
		
		@action = -> null
		
		super options
		
		@textLayer = new TextLayer
			parent: @
			name: 'CTA Label'
			y: Align.center
			textAlign: 'center'
			width: @width
			fontFamily: 'Helvetica'
			fontWeight: 600
			fontSize: 16
			shadowY: 1
			shadowBlur: 3
			shadowColor: 'rgba(0,0,0,.26)'
			color: 'rgba(255, 255, 255, 1.000)'
			text: 'Get Started'
		
		@onTap => @action()

# furniture

lowscrim.gradient =
	start: 'rgba(0,0,0,.7)'
	end: 'rgba(0,0,0,0)'

subtitle.y = title.maxY + 8
subtitle.width = 320
subtitle.x = 32

slides.brightness = 0

b1 = new Bullet
	x: 16
	y: subtitle.maxY + 32
	text: 'Press ` to enable or disable'
	opacity: 0

b2 = new Bullet
	x: 16
	y: b1.maxY + 32
	text: 'Tap to select or deselect Layers'
	opacity: 0

b3 = new Bullet
	x: 16
	y: b2.maxY + 32
	text: '... or press / while hovering'
	opacity: 0
	
b4 = new Bullet
	x: 16
	y: b3.maxY + 32
	text: 'Tap a value on the panel to copy'
	opacity: 0

b5 = new Bullet
	x: 16
	y: b4.maxY + 32
	text: 'Works in Framer Cloud, too'
	opacity: 0


getStarted = new CTA
	name: 'Get Started CTA'
	x: 16
	y: subtitle.maxY + 16
	opacity: 0
	text: 'Get Started'
	
start = ->
	title.opacity = 0
	subtitle.opacity = 0
	
	title.animate
		opacity: 1
		options:
			time: 2
			delay: 1.5
	
	subtitle.animate
		opacity: 1
		options:
			time: 1.5
			delay: 2.5

		
	slides.animate
		brightness: 60
		options:
			time: 4
			delay: .4
			curve: 'ease-out'
	
	slides.animate
		y: -80
		options:
			time: 4
			curve: 'ease-out'
		
	getStarted.animate
		x: 32
		opacity: 1
		options:
			time: .75
			delay: 4.25
	
showSteps1 = ->
	slides.animate
		blur: 4
		brightness: 55
		options:
			time: .35
	
	getStarted.textLayer.animate
		opacity: 0
		options:
			time: .25
	
	getStarted.once Events.AnimationEnd,->
		getStarted.textLayer.text = 'Next'
		getStarted.textLayer.animate
			opacity: 1
			options:
				time: .25

	getStarted.animate
		y: b1.maxY + 32
		options:
			time: .35
	
		
	b1.animate
		opacity: 1
		x: 32
		options:
			time: 1.5
			delay: .3
	
	getStarted.action = showSteps2

showSteps2 = ->
	
	getStarted.animate
		y: b2.maxY + 32
		options:
			time: .35
	
	b2.animate
		opacity: 1
		x: 32
		options:
			time: .5
			delay: .5
	
	getStarted.action = showSteps3

showSteps3 = ->
	
	getStarted.animate
		y: b3.maxY + 32
		options:
			time: .35
				
	b3.animate
		opacity: 1
		x: 32
		options:
			time: .5
			delay: .5
	
	getStarted.action = showSteps4
	
showSteps4 = ->
	
	getStarted.animate
		y: b4.maxY + 32
		options:
			time: .35
				
	b4.animate
		opacity: 1
		x: 32
		options:
			time: .5
			delay: .5
	
	getStarted.action = showSteps5
	
showSteps5 = ->
	
	getStarted.animate
		y: b5.maxY + 32
		opacity: 0
		options:
			time: .35
				
	b5.animate
		opacity: 1
		x: 32
		options:
			time: .5
			delay: .5
	
	getStarted.action = showSteps4



getStarted.action = showSteps1
start()