Theme = require "components/Theme"
theme = undefined

MODEL = "tab"

class exports.TabComponent extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			name: 'Tab Component'
			backgroundColor: null
			shadowBlur: 0
			shadowSpread: 0
			animationOptions:
				time: .2
				colorModel: 'husl'

			active: 0
			tabs: ["Tab 1", "Tab 2"]

		@customTheme = undefined
		@customOptions = {}

		super options

		if options.tabs is [] then throw "TabComponent can't have an empty array as tabs!"

		# ---------------
		# Layers

		@topLine = new Layer
			parent: @
			height: theme[MODEL].default.default.borderWidth
			backgroundColor: theme[MODEL].default.default.borderColor
			y: 40 - theme[MODEL].default.default.borderWidth
			width: @width

		Utils.linkProperties @, @topLine, 'width'
		
		@content = new Layer
			name: "Content"
			parent: @
			clip: true
			y: Align.bottom()
			width: @width
			height: @height - 40
		

		# tabs

		@tabs = (options.tabs).map (text, i) =>
			tab = new Layer
				name: text
				parent: @content
				size: @content.size
				backgroundColor: theme[MODEL].active.default.backgroundColor

			tab.on "change:size", =>
				return if _.eq(tab.size, @content.size)
				@content.size = tab.size

			@content.on "change:size", =>
				return if _.eq(tab.size, @content.size)
				tab.size = @content.size

			return tab

		# tab buttons

		@tabButtons = options.tabs.map (text, i) =>

			button = new Button
				parent: @
				name: "Tab Button " + i
				x: 10
				text: text
				height: 40
				select: => @active = i

			button.__instancing = true
			button.model = MODEL
			
			button._forceTheme(@customTheme, "default", "default")

			radius = switch i
				when 0 then "#{Utils.px(button.borderRadius)} 0px 0px 0px"
				when options.tabs.length - 1 then "0px #{Utils.px(button.borderRadius)} 0px 0px"
				else "0px 0px 0px 0px"

			button._element.childNodes[0].style['border-radius'] = radius
			
			button.blocker = new Layer
				name: "Blocker " + i
				parent: @
				width: button.width - 2
				x: button.x + 1
				height: 4
				backgroundColor: theme[MODEL].active.default.backgroundColor
				opacity: 0

			Utils.constrain button.blocker, 'left', 'right'	
			Utils.pin button.blocker, button, 'left'

			return button

		Utils.linkProperties @, @content, "width"

		@on "change:height", => 
			@content.height = (@height - 40)
			@content.y = Align.bottom()

		Utils.offsetX(@tabButtons, -1)
		w = 20 + _.sumBy(@tabButtons, 'width')
		@width = if _.gt(w, @width) then w else @width

		# ---------------
		# Cleanup
		
		child.name = '.' for child in @children unless options.showSublayers
		
		# ---------------
		# Events

		# ---------------
		# Definitions
		
		delete @__constructor
		
		#				Property	Initial value 		Callback 		Validation	Error
		# Utils.define @, 'theme', 	'default', 			@_setTheme
		Utils.define @, 'active',	options.active,		@_showActive,	_.isNumber,	'TabComponent.active must be a number.'

		for button in @tabButtons
			delete button.__instancing
		
		delete @__instancing


	# ---------------
	# Private Methods

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

		if @__instancing then @props = props 
		else @animate props

	_showActive: (num) =>
		@tabs[num].bringToFront()
		activeButton = @tabButtons[num]

		activeButton.blocker.opacity = 1
		activeButton.blocker.y = activeButton.maxY - 2
		activeButton._forceTheme(@customTheme, "active", "default")

		for sib in _.without(@tabButtons, activeButton)
			sib.blocker.opacity = 0
			sib._forceTheme(@customTheme, "default", "default")

		@emit "change:current", @current, @


	# ---------------
	# Public Methods


	# ---------------
	# Special Definitions
	
	@define "current",
		get: -> return @tabs[@active]