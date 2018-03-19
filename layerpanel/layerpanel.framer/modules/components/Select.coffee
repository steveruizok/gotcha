Theme = require "components/Theme"
theme = undefined

MODEL = "select"
OPTION_MODEL = "option"

class exports.Select extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			name: 'Select'
			height: theme[MODEL]['default'].height ? 48
			clip: false
			animationOptions:
				time: .2
				colorModel: 'husl'

			options: ['Rafael', 'Michelangelo', 'Donatello', 'Leonardo']
			selectedIndex: -1
			disabled: false

		@customTheme = undefined
		@customOptions = {}

		super options

		_.assign @,
			options: options.options
			optionElements: []
			optionLayers: []


		# ---------------
		# Layers

		# SelectedContent

		@textLayer = new Body1
			name: '.'
			parent: @
			width: @width# - ((theme[MODEL].default.padding ? 12) * 2)
			x: theme[MODEL].default.padding ? 12
			y: Align.center()
			backgroundColor: null
			fontFamily: theme[MODEL].default.fontFamily ? "Helvetica"
			fontSize: options.fontSize ? theme[MODEL].default.fontSize ? 13
			textAlign: options.textAlign ? theme[MODEL].default.textAlign ? "left"
			textTransform: options.textTransform ? theme[MODEL].default.textTransform ? "none"
			

		# Input
		
		@_input = document.createElement 'select'
		@_element.appendChild @_input

		_.assign @_input.style,
			width: Utils.px(@width)
			height: Utils.px(@height)
			color: theme[MODEL].default.backgroundColor
			backgroundColor: theme[MODEL].default.backgroundColor
			'-webkit-appearance': 'none'

		# Option Container

		@optionContainer = new Layer
			name: '.'
			parent: @
			width: @width
			y: @height
			visible: false
			clip: true
			animationOptions:
				time: .2

		@optionContainer.props = @customTheme?["default"] ? _.defaults(
			_.clone(@customOptions), 
			theme[MODEL]["default"]
			)


		# Option Layers


		# options

		@optionLayers = _.map options.options, (option, i) =>


			opElement = document.createElement "option"

			Utils.setAttributes opElement,
				value: option

			_.assign opElement.style,
				padding: "0 #{Utils.px(theme[MODEL].default.padding ? 12)}"
				color: theme[MODEL].default.backgroundColor
				backgroundColor: theme[MODEL].default.backgroundColor
				'-webkit-appearance': 'none'

			opElement.innerHTML = _.startCase(option)

			unless Utils.isDesktop()
				@_input.appendChild(opElement)

			# debugging
			# @_input.appendChild(opElement)


			opLayer = new Option
				name: '.'
				handler: @
				parent: @optionContainer
				element: opElement
				index: i
				value: option

			return opLayer

		if @optionLayers.length > 0
			Utils.offsetY(@optionLayers, -1)

		_.assign @optionContainer,
			minHeight: 1
			maxHeight: _.maxBy(@optionLayers, 'maxY')?.maxY

		# create icon layer
		@iconLayer = new Icon
			name: '.'
			parent: @
			x: Align.right(-8)
			y: Align.center
			icon: theme[MODEL].default.icon ? 'menu-down'

		# must be set before theme changes

		Utils.linkProperties @, @textLayer, "color"
		Utils.linkProperties @, @iconLayer, "color"

		@_setTheme('default')

		# ---------------
		# Definitions
		
		delete @__constructor

		Utils.define @, 'opened', false, @_setOpened, _.isBoolean, "Select.opened must be a boolean (true or false)."
		Utils.define @, 'theme', 'default', @_setTheme, _.isString, 'Select.theme must be a string.'
		Utils.define @, 'hovered', false, @_showHovered, _.isBoolean, 'Select.hovered must be a boolean.'
		Utils.define @, 'focused', false, @_showFocused, _.isBoolean, 'Select.focused must be a boolean.'
		Utils.define @, 'disabled', options.disabled, @_showDisabled, _.isBoolean, 'Select.disabled must be a boolean.'
		Utils.define @, 'selectedIndex', options.selectedIndex, @_setSelected, _.isNumber, "Select.selectedIndex must be a number."

		delete @__instancing

		# ---------------
		# Events
		
		@onMouseOver => @hovered = true
		@onMouseOut => @hovered = false
		
		# wash me
		@_input.oninput = => @selectedIndex = @_input.selectedIndex
		
		@_input.onblur = => @focused = false; @opened = false
		@_input.onfocus = => @focused = true; @opened = true

		@onPan (event) =>
			if Math.abs(event.offset.y) > 4
				@_input.blur()
		
		# ---------------
		# Cleanup
		
		child.name = '.' for child in @children unless options.showSublayers

	# ---------------
	# Private Methods

	_setOpened: (bool) =>
		return if not Utils.isDesktop()

		if bool
			# opened is true
			_.assign @optionContainer,
				parent: @app
				y: @screenFrame.y + @height + 2
				x: @screenFrame.x
				visible: true

			@app.modal = @optionContainer

			@optionContainer.placeBehind(@app.header)

			@optionContainer.animate
				height: @optionContainer.maxHeight
			return

		# opened is false

		@app.modal = undefined

		@optionContainer.once Events.AnimationEnd, =>
			_.assign @optionContainer,
				parent: @
				y: 0
				x: 0
				visible: false

		@optionContainer.animate
			height: @optionContainer.minHeight

	_setSelected: (selectedIndex) =>

		if -1 > selectedIndex > @optionLayers.length
			throw 'Selected.selectedIndex must be more than -1 or less than its number of options.'
		
		@_input.selectedIndex = selectedIndex
		@_setValue(selectedIndex)


	_setValue: (index) =>
		value = @optionLayers[index]?.value
		@textLayer.text = _.startCase(value)
		@emit "change:value", value, @

	# generic

	_getCustomTheme: (color, backgroundColor) ->
		color = new Color(color)
		bg = new Color(backgroundColor)

		return {
			default:
				color: color
				borderColor: bg.darken(10)
				backgroundColor: bg
				shadowColor: 'rgba(0,0,0,.16)'
			disabled:
				color: color.alpha(.15)
				borderColor: color.alpha(.15)
				backgroundColor: bg.alpha(0)
				shadowColor: 'rgba(0,0,0,0)'
			touched:
				color: color
				borderColor: bg.darken(20)
				backgroundColor: bg.darken(20)
				shadowColor: 'rgba(0,0,0,0)'
			hovered:
				color: color
				borderColor: bg.darken(20)
				backgroundColor: bg.darken(10)
				shadowColor: 'rgba(0,0,0,.16)'
			}
	

	_setTheme: (value) =>
		@animateStop()
		props = @customTheme?[value] ? _.defaults(
			_.clone(@customOptions), 
			theme[MODEL][value]
			)

		if @__instancing then @props = props else @animate props
	

	_showHovered: (bool) =>
		return if @disabled or @focused

		if bool # hovered is true
			@theme = "hovered"
			return

		# hovered is false
		@theme = "default"
	

	_showFocused: (bool) =>
		return if @disabled

		if bool # focused is true
			@theme = "focused"
			return

		# focused is false
		@theme = "default"


	_showDisabled: (bool) =>
		if bool # disabled is true
			@theme = "disabled"
			@ignoreEvents = true
			@_input.disabled = true
			return

		# focused is false
		@theme = "default"
		@ignoreEvents = false
		@_input.disabled = false

	# ---------------
	# Public Methods


	# ---------------
	# Special Definitions

	@define "value",
		get: -> return @textLayer.text


class Option extends Layer
	constructor: (options = {}) ->

		_.defaults options, _.merge(
			theme[OPTION_MODEL].default, {
				name: '.'
				animationOptions:
					time: .2
				}
			)

		super options

		_.assign @,
			handler: options.handler
			element: options.element
			index: options.index
			value: options.value
		
		
		# ---------------
		# Layers

		@textLayer = new Body1
			x: 0
			y: 0
			text: _.startCase(@value)
			padding: theme[MODEL].default.padding ? 12
			fontFamily: theme[MODEL].default.fontFamily ? "Helvetica"
			fontSize: options.fontSize ? theme[MODEL].default.fontSize ? 13
			textAlign: options.textAlign ? theme[MODEL].default.textAlign ? "left"
			textTransform: options.textTransform ? theme[MODEL].default.textTransform ? "none"
			
		_.assign @,
			height: @textLayer.maxY
			width: @parent.width

		@textLayer.parent = @

		
		# ---------------
		# Definitions
		
		Utils.define @, 'theme', 'default', @_setTheme, _.isString, 'Select.theme must be a string.'
		Utils.define @, 'hovered', false, @_showHovered, _.isBoolean, 'Select.hovered must be a boolean.'
		
		# ---------------
		# Events

		@onMouseOver => @hovered = true
		@onMouseOut => @hovered = false
		
		@onTap (event) =>
			event.stopPropagation()
			return if Math.abs(event.offset.x > 12) or Math.abs(event.offset.y > 12)
			@handler.selectedIndex = @index
	
	# ---------------
	# Private Methods

	_setTheme: (value) =>
		@animateStop()
		props = theme[OPTION_MODEL][value]

		if @__instancing then @props = props else @animate props

	_showHovered: (bool) =>
		if bool # hovered is true
			@theme = "hovered"
			return

		# hovered is false
		@theme = "default"