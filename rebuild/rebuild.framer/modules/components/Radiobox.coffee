Theme = require "components/Theme"
theme = undefined

MODEL = 'checkbox'

class exports.Radiobox extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			name: 'Radiobox'
			height: 32
			width: 32
			animationOptions:
				time: .2

			checked: false
			disabled: false

		_.assign options,
			backgroundColor: null

		@customOptions =
			color: options.color

		super options

		if @parent?
			if not @parent.radioboxes?
				@parent.radioboxes = []

				Utils.define @parent, "selectedIndex", -1, (num) =>
					@parent.radioboxes[num]?.checked = true

			unless _.includes(@parent.radioboxes, @)
				@parent.radioboxes.push(@)

		@props =
			x: @x - 4
			y: @y - 4

		# ---------------
		# Layers
		
		@iconLayer = new Icon
			parent: @
			x: 0
			y: Align.center()
			icon: 'radiobox-blank'
			color: options.color

		Utils.linkProperties @, @iconLayer, "color"


		# ---------------
		# Events
		if Utils.isMobile()
			@onTapEnd  => 
				return if @disabled
				@checked = true
		else
			@onTap => 
				return if @disabled
				@checked = true

			@onMouseOver =>
				return if @disabled
				@hovered = true

			@onMouseOut =>
				return if @disabled
				@hovered = false


		# ---------------
		# Definitions
		
		delete @__constructor

		isLayer = (value) -> return value.on?
		
		Utils.define @, 'theme', 'default', @_setTheme
		Utils.define @, 'checked', options.checked, @_showChecked, _.isBoolean, 'Radiobox.checked must be a boolean (true or false)'
		Utils.define @, 'hovered', false, @_showHovered, _.isBoolean, "Radiobox.hovered must be a boolean (true or false)."
		Utils.define @, 'error', options.disabled, @_showError, _.isBoolean, "Radiobox.error must be a boolean (true or false)."
		Utils.define @, 'disabled', options.disabled, @_showDisabled, _.isBoolean, "Radiobox.disabled must be a boolean (true or false)."
	
		delete @__instancing
		
		# ---------------
		# Cleanup
		
		child.name = '.' for child in @children unless options.showSublayers


	# ---------------
	# Private Methods

	_setTheme: (value) =>
		@animateStop()
		props = @customTheme?[value] ? _.defaults(
			_.clone(@customOptions), 
			theme[MODEL][value]
			)

		if @__instancing then @props = props 
		else @animate props

	_showChecked: (bool) =>
		if not bool
			@iconLayer.icon = 'radiobox-blank'
			return

		if @parent?
			@parent.selectedIndex = _.indexOf(@parent.radioboxes, @)
			@parent.emit "change:selectedIndex", @parent.selectedIndex, @parent

		for sib in @siblings
			sib.checked = false

		@iconLayer.icon = 'radiobox-marked'
		return

	_showError: (bool) =>
		return if @disabled
		@theme = if bool then "error" else "default"

	_showHovered: (bool) =>
		return if @disabled
		@theme = if bool then "hovered" else "default"

	_setLabelLayer: (layer) =>
		return if not layer
		layer.onTap => @checked = true

	_showDisabled: (bool) =>
		if bool
			# show disabled
			@theme = 'disabled'
			@ignoreEvents = true
			return

		# show not disabled
		@theme = 'default'
		@ignoreEvents = false

	# ---------------
	# Public Methods


	# ---------------
	# Special Definitions