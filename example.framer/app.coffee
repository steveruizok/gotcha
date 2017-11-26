# Gotcha Demo
# @steveruizok

{ gotcha } = require "gotcha"
gotcha.onlyVisible = true

Screen.backgroundColor = '#000'

# BulletItem
class BulletItem extends Layer
	constructor: (options = {}) ->
		
		_.defaults options,
			name: 'Bullet Item'
			backgroundColor: null
			height: 15
		
		super options
		
		@bullet = new Layer
			parent: @
			name: 'Bullet'
			y: Align.center(4)
			height: 12
			width: 12
			borderRadius: 16
			backgroundColor: '#FFF'
		
		@textLayer = new TextLayer
			name: 'Label'
			parent: @
			x: @bullet.width + 16
			y: 0
			fontFamily: 'Helvetica'
			text: 'Gotcha'
			color: '#fff'
			fontWeight: 600
			fontSize: 18
			width: 300
			lineHeight: 1.2
			text: options.text ? 'Bullet point'
			
		@height = @textLayer.height
		@width = 320

# CTA
class CTA extends Layer
	constructor: (options = {}) ->
		
		_.defaults options,
			backgroundColor: null
			borderRadius: 4
			height: 44
			width: 128
			text: 'Click Me'
			gradient:
				start: '#0070ff'
				end: '#00aaff'
				angle: 15
			borderWidth: 1
			borderColor: '#00aaff'
		
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
		
		spin = new Animation @,
			saturate: 150
			gradient: 
				start: '#0050fa'
				end: '#00aaff'
				angle: 50
			options:
				time: 3
				
		spinBack = spin.reverse()
		
		spin.onAnimationEnd -> spinBack.start()
		spinBack.onAnimationEnd -> spin.start()
		
		spin.start()

# layers


title = new TextLayer
	name: 'Title'
	x: 32
	y: 64
	color: '#FFF'
	fontSize: 56
	fontWeight: 600
	fontFamily: 'Helvetica'
	text: 'Gotcha'
	letterSpacing: 1.5

ok_hand.props =
	x: title.maxX + 16
	midY: title.midY - 12
	scale: 2.5
	rotation: -10
	padding: {top: 8}
	opacity: 0
	
subtitle = new TextLayer
	name: 'Subtitle'
	x: title.x
	y: title.maxY + 8
	width: 320
	fontSize: 24
	color: '#FFF'
	fontWeight: 600
	fontFamily: 'Helvetica'
	text: 'A developer handoff tool for Framer'

b1 = new BulletItem
	x: 16
	y: subtitle.maxY + 32
	text: 'Press ` or < to enable or disable'
	opacity: 0

b2 = new BulletItem
	x: 16
	y: b1.maxY + 32
	text: 'Tap a layer to select or deselect it'
	opacity: 0

b3 = new BulletItem
	x: 16
	y: b2.maxY + 32
	text: '... or press / or > while hovering'
	opacity: 0
	
b4 = new BulletItem
	x: 16
	y: b3.maxY + 32
	text: 'Select an animating layer to see its animations'
	opacity: 0

b5 = new BulletItem
	x: 16
	y: b4.maxY + 32
	text: 'Tap a value on the panel to copy'
	opacity: 0

b6 = new BulletItem
	x: 16
	y: b5.maxY + 32
	text: 'Works in Framer Cloud, too!'
	opacity: 0

getStarted = new CTA
	name: 'Get Started CTA'
	x: 16
	y: subtitle.maxY + 16
	opacity: 0
	text: 'Get Started'

slides.brightness = 0

lowscrim.gradient =
	start: 'rgba(0,0,0,.7)'
	end: 'rgba(0,0,0,0)'

# animation toy

loader = new Layer
	width: 64
	height: 64
	x: Align.right(-32)
	y: Align.bottom(-32)
	backgroundColor: null
	borderWidth: 16
	borderRadius: 64
	borderColor: '0070ff'
	blending: Blending.colorDodge
	opacity: 0
	scale: .7

loaderSplit = new Layer
	parent: loader
	height: 18, width: 18
	x: Align.center
	y: -2
	backgroundColor: '#0070ff'
	borderRadius: 8

loading = new Animation loader,
	rotation: 365
	options:
		time: 12
		looping: true
		curve: 'linear'
	
loading.start()
loader.draggable.enabled = true
loader.draggable.constraints = 
	width: Screen.width
	height: Screen.height

# Functions

# start
start = ->
	title.opacity = 0
	subtitle.opacity = 0
	
	title.animate
		opacity: 1
		options:
			time: 2
			delay: 1.5
			
	ok_hand.animate
		opacity: 1
		rotation: 10
		options:
			curve: Spring
			delay: 2.2
	
	subtitle.animate
		opacity: 1
		options:
			time: .8
			delay: 3.2

		
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
	
	
	getStarted.once Events.AnimationEnd, ->
		getStarted.action = showSteps1
		
	getStarted.animate
		x: 32
		opacity: 1
		options:
			time: .75
			delay: 4.5
			
	

# Show Step 1

showSteps1 = ->
	slides.animate
		blur: 6
		scale: 1.03
		brightness: 50
		options:
			time: .7
	
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
			time: .5
			delay: .5
	
	getStarted.action = showSteps2

# Show Step 2

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

# Show Step 3

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

# Show Step 4

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
			
	loader.animate
		opacity: 1
		scale: 1
		options:
			delay: 1.25
			curve: Spring
			time: .25
	
	getStarted.action = showSteps5

# Show Step 5

showSteps5 = ->
	
	getStarted.animate
		y: b5.maxY + 32
		options:
			time: .35
				
	b5.animate
		opacity: 1
		x: 32
		options:
			time: .5
			delay: .5
			
	loader.animate
		scale: .5
		options:
			time: .6
	
	getStarted.action = showSteps6
	

# Show Step 6

showSteps6 = ->
	
	getStarted.animate
		y: b6.maxY + 32
		opacity: 0
		options:
			time: .35
				
	b6.animate
		opacity: 1
		x: 32
		options:
			time: .5
			delay: .5
	
	getStarted.action = -> null
	

# Kickoff

start()
