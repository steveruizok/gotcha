Theme = require "components/Theme"
theme = undefined

MODEL = 'segment'

class exports.Segment extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			name: 'Segment'
			height: 48
			borderRadius: 2
			clip: true
			animationOptions:
				time: .2

			options: ['Left', 'Center', 'Right']
			icon: false
			dark: false
			active: 0

		@customTheme = if options.backgroundColor and options.color then @_getCustomTheme(options.color, options.backgroundColor) else undefined
		@customOptions = {}

		@options = options.options
		@icon = options.icon

		@__instancing = true
		@__constructor = true

		super options

		# ---------------
		# Layers

		_.assign @,
			options: options.options
			buttons: []
			icon: options.icon
			backgroundColor: null

		@buttons = @options.map (option, i) =>
			button = new Button
				name: '.'
				parent: @
				x: 0
				y: 0
				width: if options.width? then options.width / @options.length
				dark: options.dark
				secondary: options.secondary
				text: if @icon then '' else option
				icon: if @icon then option

			radius = switch i
				when 0 then "#{Utils.px(button.borderRadius)} 0px 0px #{Utils.px(button.borderRadius)}"
				when @options.length - 1 then "0px #{Utils.px(button.borderRadius)} #{Utils.px(button.borderRadius)} 0px"
				else "0px 0px 0px 0px"
			
			button._element.childNodes[0].style['border-radius'] = radius

			return button

		# set positions

		for layer in @buttons
			layer.x = (last?.maxX ? 1) - 1
			last = layer

			layer.model = 'segment'
			layer.customTheme = @customTheme

			do (layer) =>
				layer.onSelect => @active = _.indexOf(@children, layer)

		_.assign @,
			backgroundColor: null
			height: _.maxBy(@children, 'maxY')?.maxY 
			width: last.maxX


		# ---------------
		# Events


		# ---------------
		# Definitions
		
		delete @__constructor
		button.__instancing = true for button in @buttons

		Utils.define @, 'activeLayer', undefined, @_showActive

		delete button.__instancing for button in @buttons
		delete @__instancing

		@active = options.active

		# ---------------
		# Cleanup
		
		child.name = '.' for child in @children unless options.showSublayers


	# ---------------
	# Private Methods

	_getCustomTheme: (color, backgroundColor) ->

		customTheme =
			active:
				default:
					color: color
					borderColor: new Color(backgroundColor).darken(10)
					backgroundColor: backgroundColor
					shadowColor: 'rgba(0,0,0,0)'
				disabled:
					color: new Color(color).alpha(.15)
					borderColor: new Color(color).alpha(.15)
					backgroundColor: new Color(backgroundColor).alpha(0)
					shadowColor: 'rgba(0,0,0,0)'
				touched:
					color: color
					borderColor: new Color(backgroundColor).darken(20)
					backgroundColor: new Color(backgroundColor).darken(20)
					shadowColor: 'rgba(0,0,0,0)'
				hovered:
					color: color
					borderColor: new Color(backgroundColor).darken(20)
					backgroundColor: new Color(backgroundColor).darken(10)
					shadowColor: 'rgba(0,0,0,0)'
			default:
				default:
					color: black
					borderColor: white.darken(10)
					backgroundColor: white
					shadowColor: 'rgba(0,0,0,0)'
				disabled:
					color: new Color(black).lighten(20)
					borderColor: grey40
					backgroundColor: grey30
					shadowColor: 'rgba(0,0,0,0)'
				touched:
					color: black
					borderColor: grey40
					backgroundColor: white
					shadowColor: 'rgba(0,0,0,0)'
				hovered:
					color: black
					borderColor: grey40
					backgroundColor: grey30
					shadowColor: 'rgba(0,0,0,0)'
		
		return customTheme


	_showActive: (button) =>
		if not button
			for button in @buttons
				button._forceTheme(@customTheme, "default", "default")
			return

		button._forceTheme(@customTheme, "active", "default")

		for sib in _.without(@buttons, button)
			sib._forceTheme(@customTheme, "default", "default")


	# ---------------
	# Public Methods


	# ---------------
	# Special Definitions

	@define "value",
		get: -> return @options[@active]

	@define "active",
		get: -> return @_active
		set: (num) ->
			return if @__constructor
			return if num is @_active

			if not _.isNumber(num)
				throw "Segment.active must be a number (the index of the active layer)."

			if num >= 0 and not @children[num]
				throw "Segment.active is out of range (no layer found at Toggle.children[#{num}])."

			@_active = num

			@activeLayer = @children[num]

			@emit "change:active", num, @options[num], @children[num]
			@emit "change:value", @value, @


