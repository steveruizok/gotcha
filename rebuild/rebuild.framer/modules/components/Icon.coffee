Theme = require "components/Theme"
theme = undefined

class exports.Icon extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			name: 'Icon'
			size: 24
			icon: 'star'
			backgroundColor: null
			clip: true
			lineHeight: 0
			animationOptions:
				time: .25
				colorModel: 'husl'

		super options

		# ---------------
		# Layers

		svgNS = "http://www.w3.org/2000/svg"
		@ctx = document.createElementNS(svgNS, 'svg')
		@svgIcon = document.createElementNS(svgNS, 'path')
		
		@ctx.appendChild(@svgIcon)
		@_element.appendChild(@ctx)

		# ---------------
		# Events

		@on "change:color", @_refresh
		@on "change:size", @_setSize

		@color = options.color

		# ---------------
		# Definitions
		
		delete @__constructor
		
		Utils.define @, "icon", options.icon, @_refresh, _.isString, 'Icon.icon must be a string.'

		delete @__instancing
		
		# ---------------
		# Cleanup

		@_setSize()

		child.name = '.' for child in @children unless options.showSublayers

	# ---------------
	# Private Methods

	_setSize: =>
		Utils.setAttributes @ctx,
			width: '100%'
			height: '100%'
			viewBox: "0 0 512 512"

	_refresh: ->
		return if not @color? or not @icon?

		@_setSize()

		icon = @icon
		if @icon is 'random' then @icon = _.sample(_.keys(theme.icons))

		Utils.setAttributes @svgIcon,
			d: theme.icons[icon]
			fill: @color
			transform: "scale(1, -1), translate(0, -448)"


	# ---------------
	# Public Methods

	addIcon: (name, svg) ->
		iconObj = {}
		iconObj[name] = svg
		theme.icons = _.merge(theme.icons, iconObj)
		@icon = name

	# ---------------
	# Special Definitions
