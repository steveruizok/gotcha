Theme = require "components/Theme"
theme = undefined

MODEL = "template"

class exports.Template extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			name: 'New Component'
			borderRadius: "50%"
			animationOptions:
				time: .2
				colorModel: 'husl'

		@customTheme = @_getCustomTheme(
			options.backgroundColor
			)

		@customOptions = {}

		super options

		# ---------------
		# Properties

		_.assign @,
			_isBlinking: false

		# ---------------
		# Layers

		@exampleLayer = new Layer
			parent: @
			name: "Disc"
			point: Align.center()
			size: @height / 2
			borderRadius: "50%"
			backgroundColor: white.alpha(.5)

		Utils.linkProperties(@, @exampleLayer, "borderColor", "borderWidth")

		# ---------------
		# Cleanup
		
		child.name = '.' for child in @children unless options.showSublayers
		
		# ---------------
		# Events

		@onTap -> @selected = !@selected

		# ---------------
		# Definitions
		
		delete @__constructor
		
		#				Property	Initial value 		Callback 		Validation		Error
		Utils.define @, 'theme', 	'default', 			@_setTheme
		Utils.define @, 'selected',	options.selected,	@_showSelected,	_.isBoolean,	'Template.selected must be a boolean (true or false).'
		
		
		delete @__instancing


	# ---------------
	# Private Methods

	_getCustomTheme: (backgroundColor) ->
		return if not backgroundColor

		bg = new Color(backgroundColor)

		return {
			default:
				borderColor: bg.darken(10)
				backgroundColor: bg
			selected:
				borderColor: bg.darken(20)
				backgroundColor: bg.darken(20)
			}


	_setTheme: (value) =>
		@animateStop()
		props = @customTheme?[value] ? _.defaults(
			_.clone(@customOptions), 
			theme[MODEL][value]
			)

		if @__instancing then @props = props 
		else @animate props


	_showSelected: (bool) ->
		if bool
			# show selected
			@theme = "selected"
			return

		# show not selected	
		@theme = "default"


	# ---------------
	# Public Methods

	blink: =>
		# store initial values
		start = 
			midY: @height / 2
			height: @exampleLayer.height

		# when the "close eye" animation ends... (Step 1)
		@exampleLayer.once Events.AnimationEnd, =>

			# ... and when "open eye" animation ends... (Step 3)
			@exampleLayer.once Events.AnimationEnd, =>
				@_isBlinking = false

			# run "open eye" animation (Step 2):
			@exampleLayer.animate
				midY: start.midY
				height: start.height

		# run "close eye" animation (Step 0):
		@exampleLayer.animate
			y: @height / 2
			height: @borderWidth

		@_isBlinking = true

	# ---------------
	# Special Definitions

	@define "isBlinking",
		get: -> @_isBlinking