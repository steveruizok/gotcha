# Gotcha Demo
# @steveruizok

{ gotcha } = require "gotcha"
gotcha.onlyVisible = true

Framer.Extras.Preloader.enable()

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
				curve: 'linear'
				
		spinBack = spin.reverse()
		
		spin.onAnimationEnd -> spinBack.start()
		spinBack.onAnimationEnd -> spin.start()
		
		spin.start()

# Step

class Step extends Layer
	constructor: (options = {}) ->
		
		_.defaults options,
			name: 'Step'
			icons: []
			text: 'Example Text'
			height: 44
			backgroundColor: null
			opacity: 0
		
		super options
		
		last = 0
		
		for icon, i in options.icons
			_.assign icon, 
				parent: @
				x: last
				y: 0
			
			if i is 0 and options.icons.length > 1
				textLayer = new TextLayer
					name: 'or'
					parent: @
					x: icon.maxX + 16
					y: Align.center()
					text: 'or'
					fontSize: 18
					fontWeight: 600
					color: '#FFF'
					
				last = textLayer.maxX + 16
			
			else
				last = icon.maxX + 16
				
		textLayer = new TextLayer
			parent: @
			name: 'body'
			x: last
			y: Align.center()
			width: (Screen.width - last) - 48
			text: options.text
			fontSize: 22
			fontWeight: 600
			color: '#FFF'
			
	show: =>
		y = @y
		
		_.assign @,
			opacity: 0
			y: y - 16
			
		@animate
			opacity: 1
			y: y
			options:
				time: .35

# --

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


# Step 1

step1 = new Step
	x: 32
	y: subtitle.maxY + 32
	icons: [open_key, open_key_alt]
	text: 'to enable or disable'

# Step 2

step2 = new Step
	x: 32
	y: step1.maxY + 32
	icons: [select_key_alt, select_key]
	text: 'to select a hovered layer'
	
# Step 3

step3 = new Step
	x: 32
	y: step2.maxY + 32
	icons: [tap_key]
	text: 'to send a tap'

# Step 4

step4 = new Step
	x: 32
	y: step3.maxY + 32
	icons: [pause_key]
	text: 'to pause or unpause'

# Step 5

step5 = new Step
	x: 32
	y: step4.maxY + 32
	text: 'Works in Framer Cloud, too.'

# CTA

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
	borderColor: '#0070f0'
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
		brightness: 35
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
		y: step1.maxY + 32
		options:
			time: .35
	
	step1.show()
	
	getStarted.action = showSteps2

# Show Step 2

showSteps2 = ->
	
	getStarted.animate
		y: step2.maxY + 32
		options:
			time: .35
	
	step2.show()
	
	getStarted.action = showSteps3

# Show Step 3

showSteps3 = ->
	
	getStarted.animate
		y: step3.maxY + 32
		options:
			time: .35
	
	step3.show()
	
	getStarted.action = showSteps3
	
	getStarted.action = showSteps4

# Show Step 4

showSteps4 = ->

	getStarted.animate
		y: step4.maxY + 32
		options:
			time: .35
	
	step4.show()
	
	loader.animate
		scale: 1
		opacity: 1
		options:
			time: .6

	getStarted.action = showSteps5

# Show Step 5

showSteps5 = ->

	getStarted.once Events.AnimationEnd, ->
		@visible = false

	getStarted.animate
		y: step5.maxY + 32
		opacity: 0
		options:
			time: .35
	
	step5.show()
			
	loader.animate
		scale: .5
		options:
			time: .6


# Kickoff

start()