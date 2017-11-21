# 	 .88888.             dP            dP
# 	d8'   `88            88            88
# 	88        .d8888b. d8888P .d8888b. 88d888b. .d8888b.
# 	88   YP88 88'  `88   88   88'  `"" 88'  `88 88'  `88
# 	Y8.   .88 88.  .88   88   88.  ... 88    88 88.  .88
# 	 `88888'  `88888P'   dP   `88888P' dP    dP `88888P8
# 	
# 	
# by @steveruizok
#
#
# A Framer module for handoff. It works kind of like that other tool.


Framer.Extras.Hints.disable()

svgContext = undefined
ctx = undefined

startOpen = false

# debugging

# document.addEventListener 'click', (event) -> print event.target.classList
document.getElementsByClassName('DevicePhone')[0]?.classList.add('IgnorePointerEvents')


Utils.insertCSS """
	
	#SpecContainer {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 224px;
		background-color: rgba(20, 20, 20, 1.000);
		border-left: 1px solid rgba(45, 45, 45, 1.000);
		pointer-events: all;
		white-space: nowrap;
		cursor: default;
	}

	.SpecLabel {
		position: absolute;
	}

	.SpecSelectable {
		cursor: pointer;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.SpecSelectable:hover {
		outline: 1px solid rgba(72, 207, 255, 1.000) !important;
	}

	.SpecSelectable:active {
		outline: 1px solid rgba(255, 1, 255, 1.000) !important;
	}

	@-webkit-keyframes showCopied {
		0% { 
			border-color: rgba(118, 237, 93, 1.000);
		}

		100% {
			border-color: rgba(0, 0, 0, 1.000);
		}
	}

	.copied {
		background-color: red;
	}

	.mememeLink {
		opacity: .4;
	}

	.mememeLink:hover {
		opacity: 1;
	}
	
	#linkedin_logo {
		position: absolute;
		bottom: 8px;
		right: 68px;
	}

	
	#twitter_logo {
		position: absolute;
		bottom: 4px;
		right: 4px;
	}

	#github_logo {
		position: absolute;
		bottom: 8px;
		right: 36px;
	}

	.framerLayer { 
		pointer-events: all !important; 
		} 
	
	.IgnorePointerEvents {
		pointer-events: none !important; 
	}

	.dropdown {
		opacity: 0;
	}
"""

# -------------------------------------------

# 	 888888ba                             dP
# 	 88    `8b                            88
# 	a88aaaa8P' .d8888b. 88d888b. .d8888b. 88
# 	 88        88'  `88 88'  `88 88ooood8 88
# 	 88        88.  .88 88    88 88.  ... 88
# 	 dP        `88888P8 dP    dP `88888P' dP
# 	
# 	


panel = document.createElement('div')
panel.id = 'SpecContainer'
viewC = document.getElementById('FramerContextRoot-Default')
Utils.delay 0, => viewC.appendChild(panel)


 # -------------------------------------------

# 	.d88888b                                        dP    888888ba
# 	88.    "'                                       88    88    `8b
# 	`Y88888b. .d8888b. .d8888b. 88d888b. .d8888b. d8888P a88aaaa8P' .d8888b. dP.  .dP
# 	      `8b 88ooood8 88'  `"" 88'  `88 88ooood8   88    88   `8b. 88'  `88  `8bd8'
# 	d8'   .8P 88.  ... 88.  ... 88       88.  ...   88    88    .88 88.  .88  .d88b.
# 	 Y88888P  `88888P' `88888P' dP       `88888P'   dP    88888888P `88888P' dP'  `dP
# 	
# 	

secretBox = document.createElement('input')
document.body.appendChild(secretBox)


 # -------------------------------------------


 # 	.d88888b  dP     dP  .88888.      a88888b.                                                                    dP
 # 	88.    "' 88     88 d8'   `88    d8'   `88                                                                    88
 # 	`Y88888b. 88    .8P 88           88        .d8888b. 88d8b.d8b. 88d888b. .d8888b. 88d888b. .d8888b. 88d888b. d8888P .d8888b.
 # 	      `8b 88    d8' 88   YP88    88        88'  `88 88'`88'`88 88'  `88 88'  `88 88'  `88 88ooood8 88'  `88   88   Y8ooooo.
 # 	d8'   .8P 88  .d8P  Y8.   .88    Y8.   .88 88.  .88 88  88  88 88.  .88 88.  .88 88    88 88.  ... 88    88   88         88
 # 	 Y88888P  888888'    `88888'      Y88888P' `88888P' dP  dP  dP 88Y888P' `88888P' dP    dP `88888P' dP    dP   dP   `88888P'
 # 	                                                               88
 # 	                                                               dP



###
	 ,-.  .   ,  ,-.  ,-.         .           .
	(   ` |  /  /    /            |           |
	 `-.  | /   | -. |    ,-. ;-. |-  ,-. . , |-
	.   ) |/    \  | \    | | | | |   |-'  X  |
	 `-'  '      `-'  `-' `-' ' ' `-' `-' ' ` `-'
	
###


class SVGContext
	constructor: (options = {}) ->
		@__constructor = true
		
		@shapes = []

		svgContext = @

		# namespace
		svgNS = "http://www.w3.org/2000/svg"
		
		# set attributes 
		setAttributes = (element, attributes = {}) ->
			for key, value of attributes
				element.setAttribute(key, value)


		# Create SVG element

		@svg = document.createElementNS(svgNS, 'svg')
		document.body.appendChild(@svg)
		@svg.style['z-index'] = '999'

		@frameElement = Framer.Device.screenBackground._element

		@setContext()

		# defs
		
		@svgDefs = document.createElementNS(svgNS, 'defs')
		@svg.appendChild @svgDefs
		
		delete @__constructor

	setAttributes: (element, attributes = {}) ->
		for key, value of attributes
			element.setAttribute(key, value)

	setContext: =>

		@lFrame = @frameElement.getBoundingClientRect()

		_.assign @,
			width: @lFrame.width.toFixed()
			height: @lFrame.height.toFixed()
			x: @lFrame.left.toFixed()
			y: @lFrame.top.toFixed()

		@screenElement = document.getElementsByClassName('framerContext')[0]
		sFrame = @screenElement.getBoundingClientRect()

		@setAttributes @svg,
			x: 0
			y: 0
			width: sFrame.width
			height: sFrame.height
			viewBox: "0 0 #{sFrame.width} #{sFrame.height}"

		_.assign @svg.style,
			position: "absolute"
			left: 0
			top: 0
			width: '100%'
			height: '100%'
			'pointer-events': 'none'

	addShape: (shape) ->
		@shapes.push(shape)
		@showShape(shape)
		
	removeShape: (shape) ->
		@hideShape(shape)
		_.pull(@shapes, shape)
		
	hideShape: (shape) ->
		@svg.removeChild(shape.element)
	
	showShape: (shape) ->
		@svg.appendChild(shape.element)
		
	addDef: (def) ->
		@svgDefs.appendChild(def)

	removeAll: =>
		for shape in @shapes
			@svg.removeChild(shape.element)
		@shapes = []


###
	 ,-.  .   ,  ,-.  ,-.  .                                                                                                                             . ;-.
	(   ` |  /  /    (   ` |                                                                                                                             | |  )
	 `-.  | /   | -.  `-.  |-. ,-: ;-. ,-.                                                                                                             ,-| |-'
	.   ) |/    \  | .   ) | | | | | | |-'                                                                                                             | | |
	 `-'  '      `-'  `-'  ' ' `-` |-' `-'                                                                                                             `-' '
	                               '
###


class SVGShape
	constructor: (options = {type: 'circle'}) ->
		@__constructor = true
		
		@parent = svgContext
		
		@element = document.createElementNS(
			"http://www.w3.org/2000/svg", 
			options.type
			)

		@setCustomProperty('text', 'textContent', 'textContent', options.text)
				
		# assign attributes set by options
		for key, value of options
			@setAttribute(key, value)

		@parent.addShape(@)
		
		@show()
			
	setAttribute: (key, value) =>
		return if key is 'text'
		if not @[key]?
			Object.defineProperty @,
				key,
				get: =>
					return @element.getAttribute(key)
				set: (value) => 
					@element.setAttribute(key, value)
		
		@[key] = value
	
	setCustomProperty: (variableName, returnValue, setValue, startValue) ->
		Object.defineProperty @,
			variableName,
			get: ->
				return returnValue
			set: (value) ->
				@element[setValue] = value

		@[variableName] = startValue

	hide: -> 
		@parent.hideShape(@)
	
	show: -> 
		@parent.showShape(@)
		
	remove: ->
		@parent.removeShape(@)


class DashedLine extends SVGShape
	constructor: (pointA, pointB, color = '#000', offset = 0, options = {}) ->

		_.assign options,
			type: 'path'
			d: "M #{pointA.x} #{pointA.y} L #{pointB.x} #{pointB.y}"
			stroke: color
			'stroke-width': '1px'
			'stroke-dasharray': "5, 5"
			'stroke-dashoffset': offset

		super options


ctx = new SVGContext



 # -------------------------------------------



# 	 888888ba                             dP     a88888b.                                                                    dP
# 	 88    `8b                            88    d8'   `88                                                                    88
# 	a88aaaa8P' .d8888b. 88d888b. .d8888b. 88    88        .d8888b. 88d8b.d8b. 88d888b. .d8888b. 88d888b. .d8888b. 88d888b. d8888P .d8888b.
# 	 88        88'  `88 88'  `88 88ooood8 88    88        88'  `88 88'`88'`88 88'  `88 88'  `88 88'  `88 88ooood8 88'  `88   88   Y8ooooo.
# 	 88        88.  .88 88    88 88.  ... 88    Y8.   .88 88.  .88 88  88  88 88.  .88 88.  .88 88    88 88.  ... 88    88   88         88
# 	 dP        `88888P8 dP    dP `88888P' dP     Y88888P' `88888P' dP  dP  dP 88Y888P' `88888P' dP    dP `88888P' dP    dP   dP   `88888P'
# 	                                                                          88
# 	                                                                          dP



###
	 ,-.              ,--. .                   .
	(   `             |    |                   |
	 `-.  ;-. ,-. ,-. |-   | ,-. ;-.-. ,-. ;-. |-
	.   ) | | |-' |   |    | |-' | | | |-' | | |
	 `-'  |-' `-' `-' `--' ' `-' ' ' ' `-' ' ' `-'
	      '
###


class SpecElement
	constructor: (className, options = {}, text) ->
		@element = document.createElement('div')
		@element.classList.add className
		@element.classList.add 'SpecElement'

		_.assign @element.style, options

		panel.appendChild(@element)

		@rootElement = @element


###
	 ,-.              ,        .       .
	(   `             |        |       |
	 `-.  ;-. ,-. ,-. |    ,-: |-. ,-. |
	.   ) | | |-' |   |    | | | | |-' |
	 `-'  |-' `-' `-' `--' `-` `-' `-' '
	      '
###


class SpecLabel extends SpecElement
	constructor: (options = {}) ->

		_.defaults options,
			'position': 'absolute'
			'top': '8px'
			'background-color': 'none'
			'font-family': 'Helvetica Neue'
			'font-size': '1em'
			'font-weight': '400'
			'color': 'rgba(136, 136, 136, 1.000)'

		super 'SpecLabel', options

		@textLayer = new SpecElement 'SpecLabel',
			'font-family': options['font-family'] ? 'Helvetica Neue'
			'font-size': options['font-size'] ? '1em'
			'font-weight': options['font-weight'] ? '500'
			'color': options['color'] ? 'rgba(136, 136, 136, 1.000)'
			'left': options.left
			'right': options.right

		@element.appendChild @textLayer.element

		options.parent?.appendChild(@element)

		Object.defineProperty @, 
			'text',
			get: -> return @textLayer.element.textContent
			set: (value) ->
				if typeof value is 'number' then value = value.toFixed()
				@textLayer.element.textContent = value

		@text = options.text ? ''

###
	 ,-.              ,-.            .
	(   `             |  \ o     o   |
	 `-.  ;-. ,-. ,-. |  | . . , . ,-| ,-. ;-.
	.   ) | | |-' |   |  / | |/  | | | |-' |
	 `-'  |-' `-' `-' `-'  ' '   ' `-' `-' '
	      '
###


class SpecDivider extends SpecElement
	constructor: (options = {}) ->

		_.defaults options,
			'position': 'absolute'
			'top': '8px'
			'left': '8px'
			'width': '208px'
			'height': '1px'
			'background-color': '#000'
			'border': '.5px solid #000'
			'border-radius': '2px'
			'box-sizing': 'border-box'

		super 'SpecDivider', options

###
	 ,-.              ,-.
	(   `             |  )
	 `-.  ;-. ,-. ,-. |-<  ,-. . ,
	.   ) | | |-' |   |  ) | |  X
	 `-'  |-' `-' `-' `-'  `-' ' `
	      '
###


class SpecBox extends SpecElement
	constructor: (options = {}) ->

		_.assign @,
			value: undefined

		_.defaults options,
			'position': 'absolute'
			'top': '8px'
			'left': '96px'
			'width': '64px'
			'height': '24px'
			'background-color': 'rgba(41, 41, 41, 1.000)'
			'border': '.5px solid #000'
			'border-radius': '2px'
			'box-sizing': 'border-box'
			'box-shadow': 'inset 0px 0px 0px 4px rgba(41, 41, 41, 1.000)'

		super 'SpecLabel', options


###

	 ,-.               ,-.     .         .   ,     .         ,-.
	(   `             /        |         |  /      |         |  )
	 `-.  ;-. ,-. ,-. |    ,-. | ,-. ;-. | /   ,-: | . . ,-. |-<  ,-. . ,
	.   ) | | |-' |   \    | | | | | |   |/    | | | | | |-' |  ) | |  X
	 `-'  |-' `-' `-'  `-' `-' ' `-' '   '     `-` ' `-` `-' `-'  `-' ' `
	      '
###

class SpecColorValueBox extends SpecBox
	constructor: (options = {}) ->

		_.defaults options,
			'position': 'absolute'
			'top': '8px'
			'left': '96px'
			'width': '64px'
			'height': '24px'
			'background-color': 'rgba(41, 41, 41, 1.000)'
			'border': '.5px solid #000'
			'border-radius': '2px'
			'box-sizing': 'border-box'
			'box-shadow': 'inset 0px 0px 0px 4px rgba(41, 41, 41, 1.000)'

		super options

		Object.defineProperty @, 
			'value',
			get: -> return @_value
			set: (value) => 
				@_value = value
				@element.style['background-color'] = value ? 'rgba(41, 41, 41, 1.000)'

				if value? and value isnt ''
					if @element.classList.contains('SpecSelectable')
						return

					@element.classList.add('SpecSelectable')

				else if @element.classList.contains('SpecSelectable')
					@element.classList.remove('SpecSelectable')

		@value = options.value


###
	 ,-.              .   ,     .         ,-.
	(   `             |  /      |         |  )
	 `-.  ;-. ,-. ,-. | /   ,-: | . . ,-. |-<  ,-. . ,
	.   ) | | |-' |   |/    | | | | | |-' |  ) | |  X
	 `-'  |-' `-' `-' '     `-` ' `-` `-' `-'  `-' ' `
	      '
###


class SpecValueBox extends SpecBox
	constructor: (options = {}) ->

		_.defaults options,
			'font-family': 'Helvetica Neue'
			'font-size': '.42em'
			'padding-top': '5px'
			'padding-left': '8px'
			'box-sizing': 'border-box'
			'line-height': '1em'
			'overflow': 'hidden'

		super options

		@valueLabel = new SpecLabel
			text: options.text ? ''
			parent: @element
			'font-size': '1em'
			'left': '6px'
			'top': '6px'
			'color': '#FFF'
			'font-weight': '500'

		@unitLabel = new SpecLabel
			text: options.unit ? ''
			parent: @element
			'font-size': '.9em'
			'right': '2px'
			'top': '6px'
			'text-align': 'right'


		Object.defineProperty @, 
			'value',
			get: -> return @valueLabel.element.textContent
			set: (value) -> 
				@_value = value
				@valueLabel.element.textContent = value

				if value? and value isnt ''
					if @element.classList.contains('SpecSelectable')
						return

					@element.classList.add('SpecSelectable')

				else if @element.classList.contains('SpecSelectable')
					@element.classList.remove('SpecSelectable')

		@value = options.value ? ''


###
	 ,-.              ,   .     .     .   ,     .         ,-.
	(   `             | . | o   |     |  /      |         |  )
	 `-.  ;-. ,-. ,-. | ) ) . ,-| ,-. | /   ,-: | . . ,-. |-<  ,-. . ,
	.   ) | | |-' |   |/|/  | | | |-' |/    | | | | | |-' |  ) | |  X
	 `-'  |-' `-' `-' ' '   ' `-' `-' '     `-` ' `-` `-' `-'  `-' ' `
	      '
###


class SpecWideValueBox extends SpecValueBox
	constructor: (options = {}) ->
		super options

		@element.style.width = '136px'

# Spec Dropdown Box

class SpecDropdownBox extends SpecWideValueBox
	constructor: (options = {}) ->

		_.defaults options,
			options: [
				{name: 'Blue', value: 'blue'}, 
				{name: 'Red', value: 'red'}
				{name: 'Green', value: 'green'}
			]
			callback: (value) -> null
			selected: 0

		super options

		@callback = options.callback

		@element.style.width = '136px'

		@select = document.createElement('select')
		@select.classList.add('dropdown')
		@element.appendChild(@select)
		@select.onchange = @setSelectValue

		for option, i in options.options
			o = document.createElement('option')
			o.value = option.value
			o.label = option.name
			o.innerHTML = o.name
			@select.appendChild(o)

			if i is options.selected
				o.selected = true
				@value = @select.options[@select.selectedIndex].label

	setSelectValue: =>
		@value = @select.options[@select.selectedIndex].label
		do _.bind(@callback, @select)



 # -------------------------------------------


###
	.d88888b                              888888ba                             dP
	88.    "'                             88    `8b                            88
	`Y88888b. 88d888b. .d8888b. .d8888b. a88aaaa8P' .d8888b. 88d888b. .d8888b. 88
	      `8b 88'  `88 88ooood8 88'  `""  88        88'  `88 88'  `88 88ooood8 88
	d8'   .8P 88.  .88 88.  ... 88.  ...  88        88.  .88 88    88 88.  ... 88
	 Y88888P  88Y888P' `88888P' `88888P'  dP        `88888P8 dP    dP `88888P' dP
	          88
	          dP
###


class SpecPanel
	constructor: ->

		@panel = panel
		@_props = {}
		@frame = @panel.getBoundingClientRect()

		Object.defineProperty @,
			'props',
			get: ->
				return @_props
			set: (obj) ->
				for key, value of obj
					if _.has(@props, key)
						@props[key] = value

		@panel.style.opacity = if startOpen then '1' else '0'

		col0x = '4px'
		col1x = '84px'
		col2x = '156px'

		row = (num, offset = 0) -> return (16 + (35 * num) - offset) + 'px'


		# Device

		@deviceLabel = new SpecLabel
			top: row(0)
			left: col0x
			text: 'Device'
			'font-size': '.65em'

		deviceOptions = []
		currentKey = undefined

		for key, value of Framer.DeviceComponent.Devices
			if _.endsWith(key, 'hand')
				continue


			if not value.minStudioVersion?
				continue

			if Utils.framerStudioVersion() > value.maxStudioVersion
				continue 

			if Utils.framerStudioVersion() < value.minStudioVersion
				continue

			deviceOptions.push
				name: key, 
				value: value

			if key is Framer.Device.deviceType
				currentKey = _.indexOf(
					_.keys(Framer.DeviceComponent.Devices), 
					key
					)

		@deviceSelect = new SpecDropdownBox
			top: row(0)
			left: col1x
			options: _.uniq(deviceOptions) 
			selected: currentKey
			callback: (event) ->
				device = deviceOptions[@selectedIndex]
				selected = @options[@selectedIndex]
				Framer.Device.deviceType = device.name

				# silly fix
				Framer.Device._context.devicePixelRatio = 0
				Utils.delay 0, => 
					Framer.Device._context.devicePixelRatio = device.value.devicePixelRatio

		@specDivider1 = new SpecDivider
			top: row(1.25, 2)

		# pos

		@posLabel = new SpecLabel
			top: row(1.75, 2)
			left: col0x
			text: 'Position'
			'font-size': '.65em'

		@xValueBox = new SpecValueBox
			top: row(1.75)
			left: col1x
			text: '258'
			unit: 'x'

		@yValueBox = new SpecValueBox
			top: row(1.75)
			left: col2x
			text: '258'
			unit: 'y'

		# size

		@sizeLabel = new SpecLabel
			top: row(2.75, 2)
			left: col0x
			text: 'Size'
			'font-size': '.65em'

		@wValueBox = new SpecValueBox
			top: row(2.75)
			left: col1x
			text: '258'
			unit: 'w'

		@hValueBox = new SpecValueBox
			top: row(2.75)
			left: col2x
			text: '258'
			unit: 'h'

		# background

		@bgColorLabel = new SpecLabel
			top: row(3.75, 2)
			left: col0x
			text: 'Background'
			'font-size': '.65em'

		@bgColorValueBox = new SpecColorValueBox
			top: row(3.75)
			left: col1x

		# opacity

		@opacityLabel = new SpecLabel
			top: row(4.75, 2)
			left: col0x
			text: 'Opacity'
			'font-size': '.65em'

		@opacityValueBox = new SpecValueBox
			top: row(4.75)
			left: col1x
			text: '1.0'
			unit: 'a'

		# Divider # -----------------

		@specDivider1 = new SpecDivider
			top: row(6, 2)

		# border

		@borderColorLabel = new SpecLabel
			top: row(6.5, 2)
			left: col0x
			text: 'Border'
			'font-size': '.65em'

		@borderColorValueBox = new SpecColorValueBox
			top: row(6.5)
			left: col1x

		@borderValueBox = new SpecValueBox
			top: row(6.5)
			left: col2x
			text: '1'
			unit: 'w'

		# radius

		@radiusLabel = new SpecLabel
			top: row(7.5, 2)
			left: col0x
			text: 'Radius'
			'font-size': '.65em'

		@radiusValueBox = new SpecValueBox
			top: row(7.5)
			left: col1x
			text: '0'

		# shadow

		@shadowLabel = new SpecLabel
			top: row(8.5, 2)
			left: col0x
			text: 'Shadow'
			'font-size': '.65em'

		@shadowColorValueBox = new SpecColorValueBox
			top: row(8.5)
			left: col1x

		@shadowSpreadValueBox = new SpecValueBox
			top: row(8.5)
			left: col2x
			text: '1'
			unit: 's'

		@shadowXValueBox = new SpecValueBox
			top: row(9.5)
			left: col1x
			text: '0'
			unit: 'x'

		@shadowYValueBox = new SpecValueBox
			top: row(9.5)
			left: col2x
			text: '0'
			unit: 'y'

		@shadowBlurValueBox = new SpecValueBox
			top: row(10.5)
			left: col1x
			unit: 'blur'

		# Divider # -----------------

		@specDivider2 = new SpecDivider
			top: row(11.75, 2)

		# Font

		@fontLabel = new SpecLabel
			top: row(12.25, 2)
			left: col0x
			text: 'Font'
			'font-size': '.65em'

		@fontFamilyValueBox = new SpecWideValueBox
			top: row(12.25)
			left: col1x

		# Color

		@colorLabel = new SpecLabel
			top: row(13.25, 2)
			left: col0x
			text: 'Color'
			'font-size': '.65em'

		@colorValueBox = new SpecColorValueBox
			top: row(13.25)
			left: col1x

		@fontStyleValueBox = new SpecValueBox
			top: row(13.25)
			left: col2x

		# Font Size

		@fontSizeLabel = new SpecLabel
			top: row(14.25, 2)
			left: col0x
			text: 'Size'
			'font-size': '.65em'

		@fontSizeValueBox = new SpecValueBox
			top: row(14.25)
			left: col1x
			unit: 's'

		@fontWeightValueBox = new SpecValueBox
			top: row(14.25)
			left: col2x
			unit: 'w'

		# Line Height

		@lineHightLabel = new SpecLabel
			top: row(15.25, 2)
			left: col0x
			text: 'Height'
			'font-size': '.65em'

		@lineHeightValueBox = new SpecValueBox
			top: row(15.25)
			left: col1x
			unit: 'lh'

		# Divider # -----------------

		@specDivider2 = new SpecDivider
			top: row(16.5, 2)
		
		# Name
		@nameLabel = new SpecLabel
			top: row(17)
			left: col0x
			text: 'Name'
			'font-size': '.65em'

		@nameValueBox = new SpecWideValueBox
			top: row(17)
			left: col1x

		# Component

		@componentLabel = new SpecLabel
			top: row(18)
			left: col0x
			text: 'Component'
			'font-size': '.65em'

		@componentValueBox = new SpecWideValueBox
			top: row(18)
			left: col1x

		# Parent Component

		@parentComponentLabel = new SpecLabel
			top: row(19)
			left: col0x
			text: 'Part of'
			'font-size': '.65em'

		@parentComponentValueBox = new SpecWideValueBox
			top: row(19)
			left: col1x


		# Links

		@linkedinIcon = document.createElement('a')
		@linkedinIcon.href = "http://www.linkedin.com/in/steveruizok"
		@linkedinIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="linkedin_logo" class="mememeLink" width="20" height="20" fill="rgba(91, 91, 91, 1.000)" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'

		@githubIcon = document.createElement('a')
		@githubIcon.href = "http://github.com/steveruizok/gotcha"
		@githubIcon.innerHTML = '<svg height="20px" width="20px" id="github_logo" class="mememeLink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>'

		@twitterIcon = document.createElement('a')
		@twitterIcon.href = "http://twitter.com/steveruizok"
		@twitterIcon.innerHTML = '<svg height="28px" width="28px" id="twitter_logo" class="mememeLink" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>'

		for element in [@linkedinIcon, @githubIcon, @twitterIcon]
			panel.appendChild(element)
			element.classList.add('mememeLink')


		# ----

		# properties

		props = [
			['x', @xValueBox],
			['y', @yValueBox],
			['width', @wValueBox]
			['height', @hValueBox]
			['opacity', @opacityValueBox, true]
			['borderWidth', @borderValueBox]
			['borderRadius', @radiusValueBox]
			['shadowSpread', @shadowSpreadValueBox]
			['shadowX', @shadowXValueBox]
			['shadowY', @shadowYValueBox]
			['shadowBlur', @shadowBlurValueBox]
			['fontFamily', @fontFamilyValueBox]
			['fontSize', @fontSizeValueBox]
			['fontWeight', @fontWeightValueBox]
			['lineHeight', @lineHeightValueBox]
			['fontStyle', @fontStyleValueBox]
			['componentName', @componentValueBox]
			['componentNames', @parentComponentValueBox]
			['name', @nameValueBox]
		]

		colorProps = [
			['backgroundColor', @bgColorValueBox]
			['borderColor', @borderColorValueBox]
			['shadowColor', @shadowColorValueBox]
			['color', @colorValueBox]
		]

		for prop in props
			@defineCustomProperty(prop[0], prop[1], prop[2])
			@addCopyEvent(prop[0], prop[1])

		for prop in colorProps
			@defineCustomColorProperty(prop[0], prop[1], prop[2])
			@addCopyEvent(prop[0], prop[1])

	defineCustomProperty: (variableName, layer, float) ->
		Object.defineProperty @,
			variableName,
			get: => return @props[variableName]
			set: (value) =>
				@props[variableName] = value

				if not value? or value is '0'
					layer.value = ''
					return

				if float
					layer.value = parseFloat(value ? '0').toFixed(2)
					return

				if typeof value is 'number'
					value = parseInt(value).toFixed()
				
				layer.value = value
				
	defineCustomColorProperty: (variableName, layer) ->
		Object.defineProperty @,
			variableName,
			get: => return @props[variableName]
			set: (value) =>
				@props[variableName] = value
				layer.value = value
			

	addCopyEvent: (variableName, layer) ->
		do (variableName, layer) =>
			layer.element.addEventListener 'click', =>
				@copyContent(@[variableName])
				@highlight(layer)

	copyContent: (content) =>
		secretBox.value = content
		secretBox.select()
		document.execCommand('copy')
		secretBox.blur()

	highlight: (layer) =>
		startBorderColor = layer.element.style['border-color']
		layer.element.style['border-color'] = 'rgba(118, 237, 93, 1.000)'
		reset = => layer.element.style['border-color'] = startBorderColor

		_.delay(reset, 120)

	clearProps: =>
		for key, value of @props
			@[key] = undefined
		@setTextStyles()

	setTextStyles: (value) =>

		for layer in [
			@fontLabel,
			@fontSizeLabel,
			@colorLabel,
			@lineHightLabel,
			@fontFamilyValueBox, 
			@colorValueBox, 
			@fontSizeValueBox, 
			@fontWeightValueBox, 
			@lineHeightValueBox, 
			@fontStyleValueBox
		]
			layer.element.style.opacity = if value? then '1' else '0'




 # -------------------------------------------

###
	 .88888.             dP            dP
	d8'   `88            88            88
	88        .d8888b. d8888P .d8888b. 88d888b. .d8888b.
	88   YP88 88'  `88   88   88'  `"" 88'  `88 88'  `88
	Y8.   .88 88.  .88   88   88.  ... 88    88 88.  .88
	 `88888'  `88888P'   dP   `88888P' dP    dP `88888P8
	
	
###


class Gotcha
	constructor: (options = {}) ->

		@specPanel = new SpecPanel

		_.defaults options,
			color: 'rgba(72, 207, 255, 1.000)'
			selectedColor: 'rgba(255, 1, 255, 1.000)'
			secondaryColor: '#FFFFFF'
			fontFamily: 'Menlo'
			fontSize: '10'
			fontWeight: '500'
			borderRadius: 4
			padding: {top: 1, bottom: 1, left: 3, right: 3}

		_.assign @,
			color: options.color
			selectedColor: options.selectedColor
			secondaryColor: options.secondaryColor
			fontFamily: options.fontFamily
			fontSize: options.fontSize
			fontWeight: options.fontWeight
			shapes: []
			borderRadius: options.borderRadius
			padding: options.padding
			focusedElement: undefined
			enabled: false
			screenElement: document.getElementsByClassName('DeviceComponentPort')[0]
			layers: []
			containers: []
			timer: undefined

		document.addEventListener('keyup', @toggle)
		Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", @update)

		@context = document.getElementsByClassName('framerLayer DeviceScreen')[0]
		@context.classList.add('hoverContext')
		@context.childNodes[2].classList.add('IgnorePointerEvents')



		Framer.Device.on "change:deviceType", =>
			Utils.delay 0, @update

	toggle: (event, open) =>
		# return if Framer.Device.hands.isAnimating

		if event.key is "`" or event.key is "<" or open is true
			if @opened then @disable() else @enable()
			@opened = !@opened
			return

		if event.key is "/" or event.key is ">"
			return if not @enabled

			if @hoveredLayer is @selectedLayer
				@unsetSelectedLayer()
			else
				@setSelectedLayer()

			return

	# open the panel, start listening for events
	enable: =>
		@_canvasColor = Canvas.backgroundColor
		ctx.setContext()

		@transition(true)

	disable: =>
		@unfocus()
		@enabled = false

		@transition(false)

	transition: (open = true, seconds = .5) =>
		hands = Framer.Device.hands

		hands.on "change:x", @showTransition

		hands.once Events.AnimationEnd, =>
			hands.off "change:x", @showTransition
			@enabled = @opened = open

			if open
				Framer.Device.screen.on Events.MouseOver, @setHoveredLayer
				Framer.Device.screen.on Events.MouseOut, @unsetHoveredLayer
				Framer.Device.screen.on Events.Click, @setSelectedLayer
			else
				Framer.Device.screen.off Events.MouseOver, @setHoveredLayer
				Framer.Device.screen.off Events.MouseOut, @unsetHoveredLayer
				Framer.Device.screen.off Events.Click, @setSelectedLayer

			@focus()

		@_startPosition = Framer.Device.hands.x

		midX = hands._context.innerWidth / 2

		Framer.Device.hands.animate
			midX: if open then midX - 112 else midX
			options:
				time: seconds
				curve: Spring(damping: 10)

	showTransition: =>
		hands = Framer.Device.hands
		midX = hands._context.innerWidth / 2

		opacity = Utils.modulate(
			hands.midX,
			[midX - 56, midX - 112], 
			[0, 1], 
			true
		)

		factor = Utils.modulate(
			hands.midX,
			[midX, midX - 112],
			[0, 1],
			true
		)

		@specPanel.panel.style.opacity = opacity
		Canvas.backgroundColor = Color.mix @_canvasColor,'rgba(30, 30, 30, 1.000)', factor

	# update when screen size changes
	update: =>
		return if not @opened

		Framer.Device.hands.midX -= 122

		ctx.setContext()
		@focus()

	# Find an element that belongs to a Framer Layer
	findLayerElement: (element) ->
		return if not element
		return if not element.classList

		if element.classList.contains('framerLayer')
			return element

		@findLayerElement(element.parentNode)

	# Find a Framer Layer that matches a Framer Layer element
	getLayerFromElement: (element) =>
		return if not element

		element = @findLayerElement(element)
		layer = _.find(Framer.CurrentContext._layers, ['_element', element])

		return layer

	# Find a non-standard Component that includes a Layer
	getComponentFromLayer: (layer, names = []) =>
		if not layer
			return names.join(', ')

		if not _.includes(["Layer", "TextLayer", "ScrollComponent"], layer.constructor.name)
			names.push(layer.constructor.name)

		@getComponentFromLayer(layer.parent, names)

	# get the dimensions of an element
	getDimensions: (element) =>
		return if not element
		d = element.getBoundingClientRect()

		dimensions = {
			x: d.left
			y: d.top
			width: d.width
			height: d.height
			midX: d.left + (d.width / 2)
			midY: d.top + (d.height / 2)
			maxX: d.left + d.width
			maxY: d.top + d.height
			frame: d
		}

		return dimensions

	# make a relative distance line
	makeLine: (pointA, pointB, label = true) =>

		color = if @selectedLayer? then @selectedColor else @color

		line = new SVGShape
			type: 'path'
			d: "M #{pointA[0]} #{pointA[1]} L #{pointB[0]} #{pointB[1]}"
			stroke: color
			'stroke-width': '1px'

		if pointA[0] is pointB[0]

			capA = new SVGShape
				type: 'path'
				d: "M #{pointA[0] - 5} #{pointA[1]} L #{pointA[0] + 5} #{pointA[1]}"
				stroke: color
				'stroke-width': '1px'

			capB = new SVGShape
				type: 'path'
				d: "M #{pointB[0] - 5} #{pointB[1]} L #{pointB[0] + 5} #{pointB[1]}"
				stroke: color
				'stroke-width': '1px'

		else if pointA[1] is pointB[1]

			capA = new SVGShape
				type: 'path'
				d: "M #{pointA[0]} #{pointA[1] - 5} L #{pointA[0]} #{pointA[1] + 5}"
				stroke: color
				'stroke-width': '1px'

			capB = new SVGShape
				type: 'path'
				d: "M #{pointB[0]} #{pointB[1] - 5} L #{pointB[0]} #{pointB[1] + 5}"
				stroke: color
				'stroke-width': '1px'

	# make the label box for distance lines
	makeLabel: (x, y, text) =>

		color = if @selectedLayer? then @selectedColor else @color

		label = new SVGShape
			type: 'text'
			parent: ctx
			x: x
			y: y
			'font-family': @fontFamily
			'font-size': @fontSize
			'font-weight': @fontWeight
			fill: @secondaryColor
			text: Math.floor(text / @ratio)

		l = @getDimensions(label.element)

		label.x = x - l.width / 2
		label.y = y + l.height / 4 - 1

		box = new SVGShape
			type: 'rect'
			parent: ctx
			x: label.x - @padding.left
			y: label.y - l.height + 1
			width: l.width + @padding.left + @padding.right
			height: l.height + @padding.top + @padding.bottom + 1
			rx: @borderRadius
			ry: @borderRadius
			fill: new Color(color).darken(40)
			stroke: color
			'stroke-width': '1px'

		label.show()

	# make the bounding rectangle for selected / hovered elements
	makeRectOverlays: (s, h) =>
		return if not s or not h

		if @hoveredLayer is Framer.Device.screen
			hoverFill = new Color(@color).alpha(0)
		else
			hoverFill = new Color(@color).alpha(.2)

		hoveredRect = new SVGShape
			type: 'rect'
			parent: ctx
			x: h.x
			y: h.y
			width: h.width
			height: h.height
			stroke: @color
			fill: hoverFill
			'stroke-width': '1px'

		if @selectedLayer is Framer.Device.screen
			selectFill = new Color(@selectedColor).alpha(0)
		else
			selectFill = new Color(@selectedColor).alpha(.2)

		selectedRect = new SVGShape
			type: 'rect'
			parent: ctx
			x: s.x
			y: s.y
			width: s.width
			height: s.height
			stroke: @selectedColor
			fill: selectFill
			'stroke-width': '1px'

	# make dashed lines from bounding rect to screen edge
	makeDashedLines: (e, f, color, offset) =>
		return if not e
		return if e is f

		color = new Color(color).alpha(.8)

		new DashedLine(
			{x: e.x, y: f.y},
			{x: e.x, y: f.maxY}
			color,
			offset
			)

		new DashedLine(
			{x: e.maxX, y: f.y},
			{x: e.maxX, y: f.maxY},
			color,
			offset
			)

		new DashedLine(
			{x: f.x, 	y: e.y},
			{x: f.maxX, y: e.y},
			color,
			offset
			)

		new DashedLine(
			{x: f.x, 	y: e.maxY},
			{x: f.maxX, y: e.maxY},
			color,
			offset
			)

	showDistances: (selected, hovered) =>

		if @hoveredLayer is @selectedLayer
			@hoveredLayer = Framer.Device.screen

		s = @getDimensions(@selectedLayer._element)
		h = @getDimensions(@hoveredLayer._element)
		f = @getDimensions(Framer.Device.screen._element)

		return if not s or not h

		@ratio = Framer.Device.screen._element.getBoundingClientRect().width / Screen.width

		@makeDashedLines(s, f, @selectedColor, 5)

		@makeRectOverlays(s, h)


		# When selected element contains hovered element

		if s.x < h.x and s.maxX > h.maxX and s.y < h.y and s.maxY > h.maxY
			
			# top

			d = Math.abs(s.y - h.y)
			m = s.y + d / 2

			@makeLine([h.midX, s.y + 5], [h.midX, h.y - 4])
			@makeLabel(h.midX, m, d)

			# right

			d = Math.abs(s.maxX - h.maxX)
			m = h.maxX + (d / 2)

			@makeLine([h.maxX + 5, h.midY], [s.maxX - 4, h.midY])
			@makeLabel(m, h.midY, d)

			# bottom

			d = Math.abs(s.maxY - h.maxY)
			m = h.maxY + (d / 2)

			@makeLine([h.midX, h.maxY + 5], [h.midX, s.maxY - 4])
			@makeLabel(h.midX, m, d)

			# left

			d = Math.abs(s.x - h.x)
			m = s.x + d / 2

			@makeLine([s.x + 5, h.midY], [h.x - 4, h.midY])
			@makeLabel(m, h.midY, d)

			return

		# When hovered element contains selected element

		if s.x > h.x and s.maxX < h.maxX and s.y > h.y and s.maxY < h.maxY
			
			# top

			d = Math.abs(h.y - s.y)
			m = h.y + d / 2

			@makeLine([s.midX, h.y + 5], [s.midX, s.y - 4])
			@makeLabel(s.midX, m, d)

			# right

			d = Math.abs(h.maxX - s.maxX)
			m = s.maxX + (d / 2)

			@makeLine([s.maxX + 5, s.midY], [h.maxX - 4, s.midY])
			@makeLabel(m, s.midY, d)

			# bottom

			d = Math.abs(h.maxY - s.maxY)
			m = s.maxY + (d / 2)

			@makeLine([s.midX, s.maxY + 5], [s.midX, h.maxY - 4])
			@makeLabel(s.midX, m, d)

			# left

			d = Math.abs(h.x - s.x)
			m = h.x + d / 2

			@makeLine([h.x + 5, s.midY], [s.x - 4, s.midY])
			@makeLabel(m, s.midY, d)


			return

		# When selected element doesn't contain hovered element
		
		# top

		if s.y > h.maxY

			d = Math.abs(s.y - h.maxY)
			m = s.y - (d / 2)

			@makeLine([h.midX, h.maxY + 5], [h.midX, s.y - 4])
			@makeLabel(h.midX, m, d)

		else if s.y > h.y

			d = Math.abs(s.y - h.y)
			m = s.y - (d / 2)

			@makeLine([h.midX, h.y + 5], [h.midX, s.y - 4])
			@makeLabel(h.midX, m, d)

		# left

		if h.maxX < s.x

			d = Math.abs(s.x - h.maxX)
			m = s.x - (d / 2)

			@makeLine([h.maxX + 5, h.midY], [s.x - 4, h.midY])
			@makeLabel(m, h.midY, d)

		else if h.x < s.x

			d = Math.abs(s.x - h.x)
			m = s.x - (d / 2)

			@makeLine([h.x + 5, h.midY], [s.x - 4, h.midY])
			@makeLabel(m, h.midY, d)

		# right

		if s.maxX < h.x

			d = Math.abs(h.x - s.maxX)
			m = s.maxX + (d / 2)

			@makeLine([s.maxX + 5, h.midY], [h.x - 4, h.midY])
			@makeLabel(m, h.midY, d)

		else if s.x < h.x

			d = Math.abs(h.x - s.x)
			m = s.x + (d / 2)

			@makeLine([s.x + 5, h.midY], [h.x - 4, h.midY])
			@makeLabel(m, h.midY, d)

		# bottom

		if s.maxY < h.y

			d = Math.abs(h.y - s.maxY)
			m = s.maxY + (d / 2)

			@makeLine([h.midX, s.maxY + 5], [h.midX, h.y - 4])
			@makeLabel(h.midX, m, d)

		else if s.y < h.y

			d = Math.abs(h.y - s.y)
			m = s.y + (d / 2)

			@makeLine([h.midX, s.y + 5], [h.midX, h.y - 4])
			@makeLabel(h.midX, m, d)

	# set the panel with current properties
	setPanelProperties: () =>
		if @selectedLayer? and @selectedLayer isnt Framer.Device.screen
			layer = @selectedLayer
		else if @hoveredLayer?
			layer = @hoveredLayer
		else
			@specPanel.clearProps()
			return

		props = layer.props

		_.assign props,
			x: layer.screenFrame.x
			y: layer.screenFrame.y
			componentName: layer.constructor.name
			componentNames: @getComponentFromLayer(layer.parent)
			parentName: layer.parent?.name

		_.assign @specPanel, props

		@specPanel.setTextStyles(layer.fontFamily)

	setHoveredLayer: (event) =>
		return if not @enabled
		return if not event
		return if event.target.classList.contains('SpecElement')
		return if event.target.classList.contains('mememeLink')
		
		@hoveredLayer = @getLayerFromElement(event?.target)
		@tryFocus(event)

	unsetHoveredLayer: =>
		@hoveredLayer = undefined
		if not @selectedLayer? then @unfocus()

	setSelectedLayer: =>
		return if not @hoveredLayer

		@selectedLayer = @hoveredLayer
		@focus()

	unsetSelectedLayer: =>
		@selectedLayer = undefined

	# Delay focus by a small amount to prevent flashing
	tryFocus: (event) =>
		return if not @enabled

		@focusElement = event.target
		do (event) =>
			Utils.delay .05, =>
				if @focusElement isnt event.target
					return
				
				@focus()

	# Change focus to a new hovered or selected element
	focus: =>
		return if not @enabled

		@unfocus()

		@selectedLayer ?= Framer.Device.screen
		@hoveredLayer ?= Framer.Device.screen

		@setPanelProperties()
		@showDistances()

	unfocus: (event) =>
		ctx.removeAll()


exports.gotcha = gotcha = new Gotcha
