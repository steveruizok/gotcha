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
# A Framer module for handoff. It works kind of like that other tool.

deviceType = window.localStorage.deviceType

if deviceType? 
	device = Framer.DeviceComponent.Devices[deviceType]
	Framer.Device._context.devicePixelRatio = device.devicePixelRatio

	Framer.Device.deviceType = deviceType
	window.localStorage.device = undefined

Framer.Extras.Hints.disable()

svgContext = undefined
startOpen = false
accordionsOpen = false

# debugging

document.getElementsByClassName('DevicePhone')[0]?.classList.add('IgnorePointerEvents')


### -------------------------------------------

  	.d88888b  dP     dP  .88888.      a88888b.                                                                    dP
  	88.    "' 88     88 d8'   `88    d8'   `88                                                                    88
  	`Y88888b. 88    .8P 88           88        .d8888b. 88d8b.d8b. 88d888b. .d8888b. 88d888b. .d8888b. 88d888b. d8888P .d8888b.
  	      `8b 88    d8' 88   YP88    88        88'  `88 88'`88'`88 88'  `88 88'  `88 88'  `88 88ooood8 88'  `88   88   Y8ooooo.
  	d8'   .8P 88  .d8P  Y8.   .88    Y8.   .88 88.  .88 88  88  88 88.  .88 88.  .88 88    88 88.  ... 88    88   88         88
  	 Y88888P  888888'    `88888'      Y88888P' `88888P' dP  dP  dP 88Y888P' `88888P' dP    dP `88888P' dP    dP   dP   `88888P'
  	                                                               88
  	                                                               dP
###


# ---------------------
# SVG Context

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

# ---------------------
# SVG Shape

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

# ---------------------
# Dashed Line

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


# ----------------------------------------
# Panel Components

Utils.insertCSS """

	.logo {
		opacity: .4;
	}

	.logo:hover {
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

	#pContainer {
		position: fixed;
		right: 0;
		width: 224px;
		height: 100%;
		font-family: 'Helvetica Neue';
		font-size: 11px;
		background-color: rgba(20, 20, 20, 1.000);
		border-left: 1px solid rgba(45, 45, 45, 1.000);
		pointer-events: all;
		white-space: nowrap;
		cursor: default;
		overflow: scroll;
		padding-top: 8px;
	}

	.pDiv {
		display: block;
		width: 100%;
	}

	.hidden {
		display: none;
	}

	.pRow {
		width: 100%;
		height: 32px;
	}

	.pSpan {
		position: absolute;
		color: #888888;
		font-weight: 400;
		letter-spacing: .5px;
		padding-left: 8px;
		margin-top: 2px;
	}

	.pLabel {
		position: absolute;
		text-align: right;
		font-size: 10px;
		width: none;
		margin-top: 2px;
		margin-right: 8px;
		z-index: 10;
		pointer-events: none;
	}

	.pRange {
		position: absolute;
		border-radius: 4px;
		margin-top: 15px;
		margin-right: 4px;
		border: 1px solid #000;
		-webkit-appearance: none;  /* Override default CSS styles */
		appearance: none;
		width: 100%; 
		height: 4px;
		background: #323232;
		outline: none;
		opacity: 1;
	}


	.pRange::-webkit-slider-thumb {
		border-radius: 8px;
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		background: #888888;
		border: 1px solid #000;
		cursor: pointer;
	}

	.pRange::-moz-range-thumb {
		border-radius: 8px;
		width: 16px;
		height: 16px;
		background: #888888;
		border: 1px solid #000;
		cursor: pointer;
	}

	.pInput {
		background-color: #292929;
		border: 1px solid #000;
		color: #555555;
		padding: 4px;
		position: absolute;
		border-radius: 4px;
		outline: none;
		margin-top: 4px;
	}

	.pInput:hover {
		border: 1px solid #48cfff;
		color: #48cfff;
	}

	.right {
		right: 8px;
		width: 48px;
	}

	.left {
		right: 72px;
		width: 48px;
	}

	.alignLeft {
		text-align: left;
	}

	.full {
		right: 8px;
		width: 112px;
	}

	.pImage {
		display: block;
		margin-left: 8px;
		height: auto;
		width: 196px;
		overflow: hidden;
		background-color: #292929;
		border: 1px solid #000;
		border-radius: 4px;
		outline: 4px solid #292929;
		outline-offset: -4px;
		padding: 4px;
	}

	.pImage:hover {
		border: 1px solid #48cfff;
		color: #48cfff;
		outline: 2px solid #292929;
	}

	.pColor {
		outline: 4px solid #292929;
		outline-offset: -4px;
	}

	.pColor:hover {
		outline: 2px solid #292929;
		color: #48cfff;
	}

	.pSelect {
		position: absolute;
		right: 8px;
		width: 122px;
		color: #555555;
		background-color: #292929;
		-webkit-appearance: none;
		border: 1px solid #000;
		padding: 4px;
		border-radius: 4px;
		outline: none;
	}

	.pDivider {
		height: 1px;
		background-color: #000;
		margin: 16px 8px 16px 8px;
	}

	.pAccordian {
		border-top: 1px solid #141414;
		border-bottom: 1px solid #141414;
		height: auto;
		min-height: 32px;
		background-color: #1D1D1D;
		margin-top: 16px;
	}

	.pAccordianBody {
		display: none;
		height: auto;
		margin-top: 32px;
		padding-top: 4px;
		background-color: #141414;
	}

	.active {
		display: block;
		height: auto;
	}

	.hasValue {
		color: #FFF;
	}

	.socialLinks {
		background-color: #141414;
		position: fixed;
		bottom: 0px;
		right: 0px;
		padding-top: 4px;
		z-index: 100;
	}

	.strong {
		font-weight: 600;
	}

"""

# ---------------------
# Div

class pDiv
	constructor: (options = {}) ->

		_.defaults options,
			parent: undefined

		@properties = []

		@element = document.createElement('div')
		@element.classList.add("pDiv")
		parent = options.parent?.element ? panel
		parent.appendChild(@element)


		Object.defineProperty @,
			"visible",
			get: -> return @_visible
			set: (bool) ->
				return if bool is @_visible

				@_visible = bool

				if bool
					@element.classList.remove('hidden')
					return

				@element.classList.add('hidden')


# ---------------------
# Row

class pRow extends pDiv
	constructor: (options = {}) ->

		_.defaults options,
			text: 'Label'
			bold: false

		_.assign @,
			children: []

		super options

		@element.classList.remove("pDiv")
		@element.classList.add("pRow")

		@label = new pSpan
			parent: @
			text: options.text
			bold: options.bold

		Object.defineProperty @, 'color',
			get: -> return @label.style.color
			set: (value) ->
				@label.element.style.color = value

# ---------------------
# Divider

class pDivider
	constructor: (options = {}) ->

		_.defaults options,
			parent: undefined

		@element = document.createElement('div')
		@element.classList.add("pDivider")

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

# ---------------------
# Span

class pSpan
	constructor: (options = {}) ->

		_.defaults options,
			parent: undefined
			text: 'hello world'
			bold: false

		@element = document.createElement('span')
		@element.classList.add("pSpan")
		@element.textContent = options.text

		if options.bold
			@element.classList.add("strong")

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

		Object.defineProperty @, 
			'text',
			get: -> return @element.textContent
			set: (value) -> @element.textContent = value


# ---------------------
# Range

class pRange
	constructor: (options = {}) ->

		_.defaults options,
			parent: null
			className: 'full'
			value: ''
			min: '0'
			max: '100'
			value: '100'
			action: (value) => null

		@element = document.createElement('input')
		_.assign @element,
			type: 'range'
			min: options.min
			max: options.max
			value: options.value
			action: options.action

		@element.classList.add("pRange")
		@element.classList.add(options.className)

		@element.oninput = => @action(@value)

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

		propLayers.push(@)

		Object.defineProperty @, 
			'value',
			get: -> return @element.value

		_.assign @,
			action: options.action

# ---------------------
# Label

class pLabel
	constructor: (options = {}) ->

		_.defaults options,
			parent: undefined
			className: null
			text: 'x'
			for: undefined

		@element = document.createElement('label')
		@element.classList.add("pLabel")
		@element.classList.add(options.className)
		
		_.assign @element,
			textContent: options.text
			for: options.for

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

# ---------------------
# Input

class pInput
	constructor: (options = {}) ->

		_.defaults options,
			parent: null
			className: 'left'
			value: ''
			unit: 'x'
			default: ''
			isDefault: true
			section: undefined

		@element = document.createElement('input')
		@element.classList.add("pInput")
		@element.classList.add(options.className)

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

		options.section?.properties.push(@)

		@unit = new pLabel
			parent: options.parent
			className: options.className
			text: options.unit
			for: @element

		propLayers.push(@)

		Object.defineProperty @, 
			'default',
			get: -> return @_default
			set: (value) ->
				@_default = value

		@default = options.default ? ''

		Object.defineProperty @, 
			'value',
			get: -> return @_value
			set: (value) ->
				@_value = value
				if not value? or value is "" or value is "undefined"
					value = String(@default)

				@element.value = value ? ""

				if value? and not @isDefault and value isnt ""
					# @section?.color = '#FFF'
					@section?.visible = true

		Object.defineProperty @, 
			'isDefault',
			get: -> return @_isDefault
			set: (bool) ->
				@_isDefault = bool

				if bool
					@element.classList.remove('hasValue')
					return

				@.element.classList.add('hasValue')


		@element.addEventListener 'click', =>
			if not secretBox
				return

			secretBox.value = @value
			secretBox.select()
			document.execCommand('copy')
			secretBox.blur()

		_.assign @,
			value: options.value
			default: options.default
			section: options.section
			isDefault: options.isDefault

# ---------------------
# Image

class pImage
	constructor: (options = {}) ->

		_.defaults options,
			parent: null
			value: ''
			unit: ''
			section: undefined

		@element = document.createElement('img')
		@element.classList.add("pImage")

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

		options.section?.properties.push(@)

		propLayers.push(@)

		Object.defineProperty @, 
			'value',
			get: -> return @_value
			set: (value = '') ->
				@_value = value
				@element.src = value
				@section?.visible = value isnt ''


		@element.addEventListener 'click', =>
			if not secretBox
				return

			secretBox.value = @value
			secretBox.select()
			document.execCommand('copy')
			secretBox.blur()

		_.assign @,
			value: options.value
			section: options.section

# ---------------------
# Color Box

class pColor
	constructor: (options = {}) ->

		_.defaults options,
			parent: null
			value: '#292929'

		@element = document.createElement('input')
		@element.classList.add("pInput")
		@element.classList.add('pColor')
		@element.classList.add(options.className)

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

		options.section?.properties.push(@)

		propLayers.push(@)

		Object.defineProperty @, 
			'value',
			get: -> return @_value
			set: (value) ->

				if value?.color is 'transparent'
					value = null

				if value? and value isnt ''
					@section?.visible = true

				@_value = value ? ''
				@element.style['background-color'] = value ? 'none'

		@element.addEventListener 'click', =>
			if not secretBox
				return

			secretBox.value = @value
			secretBox.select()
			document.execCommand('copy')
			secretBox.blur()

		_.assign @,
			value: options.value
			section: options.section

# ---------------------
# Select

class pSelect
	constructor: (options = {}) ->

		_.defaults options,
			parent: undefined
			selected: 0
			options: ['red', 'white', 'blue']
			callback: (value) -> null

		@element = document.createElement('select')
		@element.classList.add("pSelect")
		@element.classList.add('hasValue')

		@unit = new pLabel
			parent: options.parent
			className: 'right'
			text: '▾'
			for: @element

		parent = options.parent?.element ? panel
		parent.appendChild(@element)

		Object.defineProperty @,
			'options',
			get: -> return @_options
			set: (array) ->
				@_options = array
				@makeOptions()

		Object.defineProperty @,
			'selected',
			get: -> return @_selected
			set: (num) ->
				@_selected = num

		_.assign @,
			_options: []
			_optionElements: []
			options: options.options
			callback: options.callback
			selected: options.selected

		@element.selectedIndex = options.selected

		@element.onchange = => 
			@selected = @element.selectedIndex
			@callback(@element.selectedIndex)
		

	makeOptions: =>
		for option, i in @_optionElements
			@element.removeChild(option)

		@_optionElements = []

		for option, i in @options
			o = document.createElement('option')
			o.value = option
			o.label = option
			o.innerHTML = option
			@element.appendChild(o)

			@_optionElements.push(o)

			if i is @selected
				@value = @element.options[@element.selectedIndex].label

# ---------------------
# Accordian

class pAccordian extends pRow
	constructor: (options = {}) ->

		super options
		@element.classList.add('pAccordian')
		@element.addEventListener "click", @toggle

		_.assign @,
			toggled: false

		@unit = new pLabel
			parent: @
			className: 'right'
			text: '▿'
			for: @element

		@body = new pRow
			parent: @
			text: ''
		@body.element.removeChild(@body.label.element)

		@element.appendChild(@body.element)
		@body.element.classList.add('pAccordianBody')

		@body.element.addEventListener 'click', (event) -> 
			event.stopPropagation()

		if accordionsOpen then @toggle() # start open

	toggle: =>
		@toggled = !@toggled

		if @toggled
			@body.element.classList.add('active')
			@unit.element.textContent = '▾'
			return

		if @body.element.classList.contains('active')
			@body.element.classList.remove('active')
			@unit.element.textContent = '▿'


### -------------------------------------------

 	.d88888b                                 888888ba                             dP
 	88.    "'                                88    `8b                            88
 	`Y88888b. 88d888b. .d8888b. .d8888b.    a88aaaa8P' .d8888b. 88d888b. .d8888b. 88
 	      `8b 88'  `88 88ooood8 88'  `""     88        88'  `88 88'  `88 88ooood8 88
 	d8'   .8P 88.  .88 88.  ... 88.  ...     88        88.  .88 88    88 88.  ... 88
 	 Y88888P  88Y888P' `88888P' `88888P'     dP        `88888P8 dP    dP `88888P' dP
 	          88
 	          dP

###

class SpecPanel
	constructor: ->

		@element = panel
		@propLayers = []
		@_props = {}
		@frame = @element.getBoundingClientRect()
		@defaults = Framer.Device.screen._propertyList()

		Object.defineProperty @,
			'props',
			get: ->
				return @_props
			set: (obj) ->
				for key, value of obj
					if _.has(@props, key)
						@props[key] = value

		@element.style.opacity = if startOpen then '1' else '0'
		@canvas = document.createElement('canvas')


		# ------------------
		# device

		# Set Device Options

		deviceOptions = ['fullscreen']
		currentSelected = undefined

		for key, value of Framer.DeviceComponent.Devices
			if _.endsWith(key, 'hand')
				continue

			if not value.minStudioVersion?
				continue

			if Utils.framerStudioVersion() > value.maxStudioVersion
				continue 

			if Utils.framerStudioVersion() < value.minStudioVersion
				continue

			deviceOptions.push (key)

			if key is Framer.Device.deviceType
				currentSelected = deviceOptions.length - 1

		# ------------------------------------
		# framer settings

		# ------------------
		# device

		row = new pRow
			text: 'Device'

		@deviceBox = new pSelect
			parent: row
			unit: ''
			options: deviceOptions
			selected: currentSelected
			callback: (index) =>
				deviceType = deviceOptions[index]
				device = Framer.DeviceComponent.Devices[deviceType]
				
				_.assign window.localStorage,
					deviceType: deviceType
					device: device
					bg: Screen.backgroundColor

				window.location.reload()

		# ------------------
		# animation speed

		@speedRow = new pRow
			text: 'Speed 100%'

		minp = parseInt(0, 10)
		maxp = parseInt(100, 10)
		
		minv = Math.log(0.00001)
		maxv = Math.log(0.01666666667)

		vScale = (maxv-minv) / (maxp-minp)

		@speedBox = new pRange
			parent: @speedRow
			className: 'full'
			unit: ''
			action: (value) =>

				delta = Math.exp(minv + vScale*(value-minp))
				rate = (delta/(1/60))*100
				spaces = if rate < 1 then 2 else if rate < 10 then 1 else 0

				@speedRow.label.text = 'Speed ' + rate.toFixed(spaces) + '%'

				Framer.Loop.delta = delta

		# ------------------------------------
		# layer details

		new pDivider

		row = new pRow
			text: 'Name'

		@nameBox = new pInput
			parent: row
			className: 'full'
			unit: ''

		row = new pRow
			text: 'Component'

		@componentNameBox = new pInput
			parent: row
			className: 'full'
			unit: ''

		@componentNamesRow = new pRow
			text: 'Part of'

		@componentNamesBox = new pInput
			parent: @componentNamesRow
			className: 'full'
			unit: ''

		# ------------------------------------
		# position details

		new pDivider

		# ------------------
		# position

		row = new pRow
			text: 'Position'

		@xBox = new pInput
			parent: row, 
			className: 'left'
			unit: 'x'

		@yBox = new pInput
			parent: row, 
			className: 'right'
			unit: 'y'

		# ------------------
		# size

		row = new pRow
			text: 'Size'

		@widthBox = new pInput
			parent: row, 
			className: 'left'
			unit: 'w'

		@heightBox = new pInput
			parent: row, 
			className: 'right'
			unit: 'h'

		# ------------------
		# background color

		row = new pRow
			text: 'Background'

		@backgroundColorBox = new pColor
			parent: row, 
			className: 'left'

		# ----------------------------------------
		# gradient

		@gradientPropertiesDiv = new pDiv

		row = new pRow
			parent: @gradientPropertiesDiv
			text: 'Gradient'

		@gradientStartBox = new pColor
			parent: row
			className: 'left'
			section: @gradientPropertiesDiv
			default: null

		@gradientEndBox = new pColor
			parent: row
			className: 'right'
			section: @gradientPropertiesDiv
			default: null

		# ------------------
		# gradient angle

		row = new pRow
			parent: @gradientPropertiesDiv
			text: ''

		@gradientAngleBox = new pInput
			parent: row
			className: 'left'
			unit: 'a'
			section: @gradientPropertiesDiv
			default: null

		# ------------------
		# opacity

		row = new pRow
			text: 'Opacity'

		@opacityBox = new pInput
			parent: row
			className: 'left'
			unit: ''


		new pDivider
			parent: @filtersDiv

		# ------------------------------------
		# border properties

		@borderPropertiesDiv = new pDiv

		# ------------------
		# border

		row = new pRow
			text: 'Border'
			parent: @borderPropertiesDiv

		@borderColorBox = new pColor
			parent: row
			className: 'left'

		@borderWidthBox = new pInput
			parent: row
			className: 'right'
			unit: 'w'
			section: @borderPropertiesDiv

		# ------------------
		# radius

		row = new pRow
			text: 'Radius'
			parent: @borderPropertiesDiv

		@borderRadiusBox = new pInput
			parent: row
			className: 'left'
			unit: ''
			section: @borderPropertiesDiv

		# ------------------
		# shadow


		@shadowPropertiesDiv = new pDiv

		row = new pRow
			parent: @shadowPropertiesDiv
			text: 'Shadow'

		@shadowColorBox = new pColor
			parent: row
			section: @shadowPropertiesDiv
			className: 'left'

		@shadowSpreadBox = new pInput
			parent: row
			section: @shadowPropertiesDiv
			className: 'right'
			unit: 's'
			default: '0'

		row = new pRow
			parent: @shadowPropertiesDiv
			text: ''

		@shadowXBox = new pInput
			parent: row
			section: @shadowPropertiesDiv
			className: 'left'
			unit: 'x'
			default: '0'

		@shadowYBox = new pInput
			parent: row
			section: @shadowPropertiesDiv
			className: 'right'
			unit: 'y'
			default: '0'

		row = new pRow
			parent: @shadowPropertiesDiv
			text: ''

		@shadowBlurBox = new pInput
			parent: row
			section: @shadowPropertiesDiv
			className: 'left'
			unit: 'b'
			default: '0'

		# ------------------------------------
		# text styles

		@textPropertiesDiv = new pDiv

		# ------------------
		# font family

		row = new pRow
			parent: @textPropertiesDiv
			text: 'Font'

		@fontFamilyBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'full'
			unit: ''

		# ------------------
		# color

		row = new pRow
			parent: @textPropertiesDiv
			text: 'Color'

		@colorBox = new pColor
			parent: row
			className: 'left'

		@fontSizeBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'right'
			unit: ''

		# ------------------
		# weight

		row = new pRow
			parent: @textPropertiesDiv
			text: 'Style'

		@fontStyleBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'left'
			unit: ''

		@fontWeightBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'right'
			unit: 'w'

		# ------------------
		# align

		row = new pRow
			parent: @textPropertiesDiv
			text: 'Align'

		@textAlignBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'full'
			unit: ''
			default: 'left'

		# ------------------
		# spacing

		row = new pRow
			parent: @textPropertiesDiv
			text: 'Spacing'

		@letterSpacingBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'left'
			unit: 'lt'
			default: '1'

		@lineHeightBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'right'
			unit: 'ln'

		# ------------------
		# text

		row = new pRow
			parent: @textPropertiesDiv
			text: 'Text'

		@textBox = new pInput
			parent: row
			section: @textPropertiesDiv
			className: 'full'
			unit: ''


		# ------------------------------------
		# transform properties


		@transformsDiv = new pDiv

		@transformsAcco = new pAccordian
			text: 'Transforms'
			parent: @transformsDiv


		# ------------------
		# scale

		row = new pRow
			parent: @transformsAcco.body
			text: 'Scale'

		@scaleBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: ''
			default: '1'

		row = new pRow
			parent: @transformsAcco.body
			text: ''

		@scaleXBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: 'x'
			default: '1'

		@scaleYBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'right'
			unit: 'y'
			default: '1'

		# ------------------
		# rotation

		row = new pRow
			parent: @transformsAcco.body
			text: 'Rotate'

		@rotationBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: ''
			default: '0'

		row = new pRow
			parent: @transformsAcco.body
			text: ''

		@rotationXBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: 'x'
			default: '0'

		@rotationYBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'right'
			unit: 'y'
			default: '0'


		# ------------------
		# origin

		row = new pRow
			parent: @transformsAcco.body
			text: 'Origin'

		@originXBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: 'x'
			default: '0.50'

		@originYBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'right'
			unit: 'y'
			default: '0.50'

		# ------------------
		# skew

		row = new pRow
			parent: @transformsAcco.body
			text: 'Skew'

		@skewBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: ''
			default: '0'

		row = new pRow
			parent: @transformsAcco.body
			text: ''

		@skewXBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: 'x'
			default: '0'

		@skewYBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'right'
			unit: 'y'
			default: '0'

		# ------------------
		# perspective

		row = new pRow
			parent: @transformsAcco.body
			text: 'Perspective'

		@perspectiveBox = new pInput
			parent: row
			section: @transformsDiv
			className: 'left'
			unit: ''
			default: '0'


		# ------------------------------------
		# filters properties

		@filtersDiv = new pDiv

		@filtersAcco = new pAccordian
			parent: @filtersDiv
			text: 'Filters'

		# ------------------
		# blur

		row = new pRow
			parent: @filtersAcco.body
			text: 'Blur'

		@blurBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '0'

		# ------------------
		# brightness

		row = new pRow
			parent: @filtersAcco.body
			text: 'Brightness'

		@brightnessBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '100'

		# ------------------
		# contrast

		row = new pRow
			parent: @filtersAcco.body
			text: 'Contrast'

		@contrastBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '100'

		# ------------------
		# grayscale

		row = new pRow
			parent: @filtersAcco.body
			text: 'Grayscale'

		@grayscaleBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '0'

		# ------------------
		# huerotate

		row = new pRow
			parent: @filtersAcco.body
			text: 'hueRotate'

		@hueRotateBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '0'

		# ------------------
		# invert

		row = new pRow
			parent: @filtersAcco.body
			text: 'Invert'

		@invertBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '0'

		# ------------------
		# saturate

		row = new pRow
			parent: @filtersAcco.body
			text: 'Saturate'

		@saturateBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '100'

		# ------------------
		# sepia

		row = new pRow
			parent: @filtersAcco.body
			text: 'Sepia'

		@sepiaBox = new pInput
			parent: row
			section: @filtersDiv
			className: 'left'
			unit: ''
			default: '0'

		# -------------------------- end filters


		# ------------------------------------
		# effects properties


		@effectsDiv = new pDiv

		@effectsAcco = new pAccordian
			text: 'Effects'
			parent: @effectsDiv


		# ------------------
		# background filters

		row = new pRow
			parent: @effectsAcco.body
			text: 'Blending'

		@blendingBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'full'
			unit: ''
			default: 'normal'

		row = new pRow
			parent: @effectsAcco.body
			text: 'Blur'

		@backgroundBlurBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '0'


		row = new pRow
			parent: @effectsAcco.body
			text: 'Brightness'

		@backgroundBrightnessBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '100'


		row = new pRow
			parent: @effectsAcco.body
			text: 'Saturate'

		@backgroundSaturateBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '100'


		row = new pRow
			parent: @effectsAcco.body
			text: 'hueRotate'

		@backgroundHueRotateBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '0'


		row = new pRow
			parent: @effectsAcco.body
			text: 'Contrast'

		@backgroundContrastBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '100'


		row = new pRow
			parent: @effectsAcco.body
			text: 'Invert'

		@backgroundInvertBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '0'


		row = new pRow
			parent: @effectsAcco.body
			text: 'Grayscale'

		@backgroundGrayscaleBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '0'


		row = new pRow
			parent: @effectsAcco.body
			text: 'Sepia'

		@backgroundSepiaBox = new pInput
			parent: row
			section: @effectsDiv
			className: 'left'
			unit: ''
			default: '0'



		# ------------------------------------
		# animation properties


		@animsDiv = new pDiv

		@animsAcco = new pAccordian
			text: 'Animations'
			parent: @animsDiv



		# ------------------------------------
		# event listener properties


		@eventListenersDiv = new pDiv

		@eventListenersAcco = new pAccordian
			text: 'Event Listeners'
			parent: @eventListenersDiv



		# image --------------------------------

		@imagePropertiesDiv = new pDiv

		new pDivider
			parent: @imagePropertiesDiv

		# ------------------
		# image

		@imageBox = new pImage
			parent: @imagePropertiesDiv
			section: @imagePropertiesDiv


		# screenshot ---------------------------

		@screenshotDiv = new pDiv

		# ------------------
		# screenshot

		@screenshotBox = new pImage
			parent: @screenshotDiv
			section: @screenshotDiv


		# ------------------
		# placeholders

		row = new pRow
			text: ''
		row.element.style.height = '64px'

		# ------------------
		# social media links

		@socialMediaRow = new pRow
			parent: @textPropertiesDiv.body
			text: ''

		@linkedinIcon = document.createElement('a')
		_.assign @linkedinIcon,
			href: "http://www.linkedin.com/in/steveruizok"
			innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" id="linkedin_logo" class="logo" width="20" height="20" fill="rgba(91, 91, 91, 1.000)" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'

		@githubIcon = document.createElement('a')
		_.assign @githubIcon,
			href: "http://github.com/steveruizok/gotcha"
			innerHTML: '<svg height="20px" width="20px" id="github_logo" class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>'

		@twitterIcon = document.createElement('a')
		_.assign @twitterIcon,
			href: "http://twitter.com/steveruizok"
			innerHTML: '<svg height="28px" width="28px" id="twitter_logo" class="logo" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>'

		for element in [@linkedinIcon, @githubIcon, @twitterIcon]
			@socialMediaRow.element.appendChild(element)
			@socialMediaRow.element.classList.add('socialLinks')

		@hideDivs()

	clearChildrenThenShowAnimations: (animations) =>
		child = @animsAcco.body.element.childNodes[0]

		if not child?
			@showAnimations(animations)
			return

		@animsAcco.body.element.removeChild(child)
		@clearChildrenThenShowAnimations(animations)

	clearChildrenThenShowEventListeners: (eventListeners) =>

		child = @eventListenersAcco.body.element.childNodes[0]

		if not child?
			@showEventListeners(eventListeners)
			return

		@eventListenersAcco.body.element.removeChild(child)
		@clearChildrenThenShowEventListeners(eventListeners)

	showEventListeners: (eventListeners = []) =>

		defaults = [
			"function (){return fn.apply(me,arguments)}", 
			"function (){return fn.apply(me, arguments)}", 
			"function (event){return event.preventDefault()}",
			"function (){ return fn.apply(me, arguments); }",
			'function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(timerId===undefined)return leadingEdge(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return timerId===undefined&&(timerId=setTimeout(timerExpired,wait)),result}',
			'function (value){if(null!==value)return"fontSize"!==property&&"font"!==property&&_this._styledText.resetStyle(property),_this.renderText()}',
		]

		realListeners = 0

		for listener, i in eventListeners

			continue if _.every(listener.events, (e) -> _.includes(defaults, e.function))

			# --------------------------------
			# listener

			row = new pRow
				parent: @eventListenersAcco.body
				text: '"' + listener.listener + '"'
				bold: true

			# --------------------------------
			# events

			for event, e in listener.events

				continue if _.includes(defaults, event.function)

				realListeners++

				# name

				row = new pRow
					parent: @eventListenersAcco.body
					text: 'Name'
				
				box = new pInput
					parent: row
					className: 'full'
					unit: ''
					value: event.name ? ''
					isDefault: event.name isnt 'undefined'

				# function

				row = new pRow
					parent: @eventListenersAcco.body
					text: 'Function'
				
				box = new pInput
					parent: row
					className: 'full'
					unit: ''
					value: event.function
					isDefault: false

				# Once

				row = new pRow
					parent: @eventListenersAcco.body
					text: 'Once'
				
				box = new pInput
					parent: row
					className: 'left'
					unit: ''
					value: event.once
					isDefault: event.name isnt 'false'

				unless e is listener.events.length - 1
					new pDivider
						parent: @eventListenersAcco.body

			unless i is eventListeners.length - 1
				new pDivider
					parent: @eventListenersAcco.body


		# set color

		if realListeners is 0
			@eventListenersAcco.color = '#888888'
			return

		@eventListenersAcco.color = '#FFFFFF'

	showAnimations: (animations) =>
		
		@animsAcco.color = if animations.length > 0 then '#FFF' else '#888888'
	
		for anim, i in animations

			properties = anim.properties
			options = anim.options
			stateA = anim._stateA
			stateB = anim._stateB

			# --------------------------------

			# animation

			row = new pRow
				parent: @animsAcco.body
				text: 'Animation ' + (i + 1)
				bold: true

			fromUnit = new pLabel
				parent: row 
				className: 'left'
				text: 'from'

			toUnit = new pLabel
				parent: row 
				className: 'right'
				text: 'to'

			for element in [fromUnit.element, toUnit.element]
				element.classList.add('alignLeft')

			# ---------------
			# properties

			for key, value of properties

				if Color.isColorObject(value) or Color.isColor(value)

					row = new pRow
						parent: @animsAcco.body
						text: _.startCase(key)

					# from
					box = new pColor
						parent: row
						className: 'left'
						unit: ''
						value: stateA?[key]
						isDefault: false

					# to
					box = new pColor
						parent: row
						className: 'right'
						unit: ''
						value: stateB?[key]
						isDefault: false

				else if key is 'gradient'

					# start
					row = new pRow
						parent: @animsAcco.body
						text: 'Grad Start'
				
					# from
					box = new pColor
						parent: row
						className: 'left'
						unit: ''
						value: stateA?[key]?.start
						isDefault: false

					# to
					box = new pColor
						parent: row
						className: 'right'
						unit: ''
						value: stateB?[key]?.start
						isDefault: false

					# end
					row = new pRow
						parent: @animsAcco.body
						text: 'Grad End'
				
					# from
					box = new pColor
						parent: row
						className: 'left'
						unit: ''
						value: stateA?[key]?.end
						isDefault: false

					# to
					box = new pColor
						parent: row
						className: 'right'
						unit: ''
						value: stateB?[key]?.end
						isDefault: false

					# angle
					row = new pRow
						parent: @animsAcco.body
						text: 'Grad Angle'
				
					# from 
					box = new pInput
						parent: row
						className: 'left'
						unit: ''
						value: stateA?[key]?.angle
						isDefault: false

					# to
					box = new pInput
						parent: row
						className: 'right'
						unit: ''
						value: stateB?[key]?.angle
						isDefault: false

				else

					row = new pRow
						parent: @animsAcco.body
						text: _.startCase(key)

					# from
					box = new pInput
						parent: row
						className: 'left'
						unit: ''
						value: stateA?[key]
						isDefault: false

					# to
					box = new pInput
						parent: row
						className: 'right'
						unit: ''
						value: stateB?[key]
						isDefault: false

			# ---------------
			# options

			row = new pRow
				parent: @animsAcco.body
				text: 'Options'

			# time
			box = new pInput
				parent: row
				className: 'left'
				unit: 's'
				value: options.time
				isDefault: false

			# time
			box = new pInput
				parent: row
				className: 'right'
				unit: 'd'
				value: options.delay
				isDefault: false

			row = new pRow
				parent: @animsAcco.body
				text: ''

			# repeat
			box = new pInput
				parent: row
				className: 'left'
				unit: 'r'
				value: options.repeat
				isDefault: false

			# time
			box = new pInput
				parent: row
				className: 'right'
				unit: 'l'
				value: options.looping
				isDefault: false

			unless i is animations.length - 1
				new pDivider
					parent: @animsAcco.body

		
	showProperties: (layer, customProps) =>

		@scrollTop = @element.scrollTop

		props = layer.props
		_.assign props, customProps

		defaults = layer._propertyList()

		_.assign defaults,
			rotation: defaults.rotationZ
			blending: {default: 'normal'}

		@hideDivs()

		for key, value of _.merge(layer.props, customProps)

			propLayer = @[key + 'Box']

			if not propLayer
				continue

			def = defaults[key]?.default
			
			@showProperty(key, value, propLayer, def)

		@showOverrideInAcco(@effectsDiv, @effectsAcco)
		@showOverrideInAcco(@filtersDiv, @filtersAcco)
		@showOverrideInAcco(@transformsDiv, @transformsAcco)
				
		@element.scrollTop = @scrollTop

	showOverrideInAcco: (div, acco) ->
		acco.color = '#888888'
		for propLayer in div.properties
			if propLayer.value? and propLayer.value isnt propLayer.default
				acco.color = '#FFF'

	showProperty: (key, value, propLayer, def) =>

		return if value is propLayer.value

		propLayer.isDefault = false

		if not value? or _.isNaN(value) or value is def
			value = def ? ''
			propLayer.isDefault = true

		# color
		if Color.isColorObject(value)
			value = value.toHslString()

		# gradient
		if value?.constructor?.name is 'Gradient'
			propLayer.value = ''
			return

		# string
		if typeof value is 'string'
			propLayer.value = value
			return

		value = value.toString()

		# float
		if value.indexOf('.') isnt -1
			propLayer.value = parseFloat(value).toFixed(2)
			return

		# numer
		propLayer.value = parseInt(value, 10).toFixed()

	hideDivs: =>
		for div in [
			@gradientPropertiesDiv,
			@textPropertiesDiv,
			@shadowPropertiesDiv,
			@borderPropertiesDiv,
			@imagePropertiesDiv,
			@screenshotDiv
		]
			div.visible = false








propLayers = []

### -------------------------------------------

	 .88888.             dP            dP
	d8'   `88            88            88
	88        .d8888b. d8888P .d8888b. 88d888b. .d8888b.
	88   YP88 88'  `88   88   88'  `"" 88'  `88 88'  `88
	Y8.   .88 88.  .88   88   88.  ... 88    88 88.  .88
	 `88888'  `88888P'   dP   `88888P' dP    dP `8888888

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
			_onlyVisible: true

		document.addEventListener('keyup', @toggle)
		Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", @update)

		@context = document.getElementsByClassName('framerLayer DeviceScreen')[0]
		@context.classList.add('hoverContext')
		@context.childNodes[2].classList.add('IgnorePointerEvents')

		Object.defineProperty @,
			"onlyVisible",
			get: -> return @_onlyVisible
			set: (bool) ->
				return if typeof bool isnt 'boolean'
				@_onlyVisible = bool

		Framer.Device.on "change:deviceType", =>
			Utils.delay 0, @update

	toggle: (event, open) =>
		# return if Framer.Device.hands.isAnimating

		if event.key is "`" or event.key is "<" or open is true
			if @opened then @disable() else @enable()
			@opened = !@opened
			return

		return if not @enabled

		if event.key is "/" or event.key is ">"
			@setSelectedLayer()
			return

		if event.key is "."
			@hoveredLayer?.emit Events.Tap
			return

		if event.key is "\\"
			@_lastSpeed ?= 1
			thisSpeed = @specPanel.speedBox.element.value

			if thisSpeed is "0"
				@specPanel.speedBox.element.value = @_lastSpeed
				@specPanel.speedBox.action(@_lastSpeed)
			else 
				@specPanel.speedBox.element.value = 0
				Framer.Loop.delta = .000000000000000000001
				@_lastSpeed = thisSpeed

	# open the panel, start listening for events
	enable: =>
		@_canvasColor = Canvas.backgroundColor
		svgContext.setContext()

		@transition(true)

		if @timer? then clearInterval @timer
		@timer = Utils.interval 1/15, @focus

	disable: =>
		@unfocus()
		@enabled = false

		@transition(false)

		if @timer? then clearInterval @timer

	transition: (open = true, seconds = .5) =>
		hands = Framer.Device.hands

		hands.on "change:x", @showTransition

		hands.once Events.AnimationEnd, =>
			hands.off "change:x", @showTransition
			@enabled = @opened = open

			if open
				Framer.Device.screen.on Events.MouseOver, @setHoveredLayer
				Framer.Device.screen.on Events.MouseOut, @unsetHoveredLayer
				Framer.Device.background.on Events.MouseOver, @unsetHoveredLayer
				Framer.Device.screen.on Events.Click, @setSelectedLayer

			else
				Framer.Device.screen.off Events.MouseOver, @setHoveredLayer
				Framer.Device.screen.off Events.MouseOut, @unsetHoveredLayer
				Framer.Device.background.off Events.MouseOver, @unsetHoveredLayer
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

		@specPanel.element.style.opacity = opacity
		Canvas.backgroundColor = Color.mix @_canvasColor,'rgba(30, 30, 30, 1.000)', factor

	# update when screen size changes
	update: =>
		return if not @opened

		Framer.Device.hands.midX -= 122

		svgContext.setContext()
		@focus()

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
			parent: svgContext
			x: x
			y: y + 4
			'font-family': @fontFamily
			'font-size': @fontSize
			'font-weight': @fontWeight
			'text-anchor': "middle"
			fill: @secondaryColor
			text: Math.floor(text / @ratio)

		w = label.element.textLength.baseVal.value

		box = new SVGShape
			type: 'rect'
			parent: svgContext
			x: x - (w / 2) - @padding.left
			y: y - 7
			width: w + @padding.left + @padding.right
			height: 15
			rx: @borderRadius
			ry: @borderRadius
			fill: new Color(color).darken(40)
			stroke: color
			'stroke-width': '1px'

		label.show()

	# make the bounding rectangle for selected / hovered elements
	makeRectOverlays: (selectedLayer, s, hoveredLayer, h) =>
		if not s or not h
			return

		if hoveredLayer is selectedLayer
			hoveredLayer = Framer.Device.screen

		hoverFill = new Color(@color).alpha(.2)

		if hoveredLayer is Framer.Device.screen
			hoverFill = new Color(@color).alpha(0)

		hoveredRect = new SVGShape
			type: 'rect'
			parent: svgContext
			x: h.x
			y: h.y
			width: h.width
			height: h.height
			stroke: @color
			fill: hoverFill
			'stroke-width': '1px'

		selectFill = new Color(@selectedColor).alpha(.2)
		
		if selectedLayer is Framer.Device.screen
			selectFill = new Color(@selectedColor).alpha(0)

		selectedRect = new SVGShape
			type: 'rect'
			parent: svgContext
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

	showDistances: (selectedLayer, hoveredLayer) =>

		return if not selectedLayer or not hoveredLayer

		s = @getDimensions(selectedLayer._element)
		h = @getDimensions(hoveredLayer._element)
		f = @getDimensions(Framer.Device.screen._element)

		@makeDashedLines(s, f, @selectedColor, 5)

		@makeRectOverlays(selectedLayer, s, hoveredLayer, h)

		# When selected element contains hovered element

		@ratio = Framer.Device.screen._element.getBoundingClientRect().width / Screen.width

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

		layer = @selectedLayer ? @hoveredLayer

		if layer is @lastLayer and layer.isAnimating is false
			return

		@lastLayer = layer
		@lastProps = layer.props
		
		# properties to assigned to layer.props
		customProps =
			x: layer.screenFrame.x
			y: layer.screenFrame.y
			componentName: layer.constructor.name
			componentNames: @getComponentFromLayer(layer.parent)
			parentName: layer.parent?.name
			rotation: layer.rotationZ
			# textAlign: layer.props.styledTextOptions?.alignment
			blending: layer.blending
			# screenshot: @getScreenshot(layer._element)
		
		if layer.gradient?
			_.assign customProps,
				gradientStart: layer.gradient.start
				gradientEnd: layer.gradient.end
				gradientAngle: layer.gradient.angle

		if layer.shadows?
			_.assign customProps,
				shadowX: layer.shadows[0]?.x
				shadowY: layer.shadows[0]?.y
				shadowSpread: layer.shadows[0]?.spread
				shadowColor: layer.shadows[0]?.color
				shadowType: layer.shadows[0]?.type
				shadowBlur: layer.shadows[0]?.blur

		@specPanel.showProperties(layer, customProps)
		
		eventListeners = @getLayerEventListeners(layer)
		@specPanel.clearChildrenThenShowEventListeners(eventListeners)

		animations = layer.animations()
		@specPanel.clearChildrenThenShowAnimations(animations)


	setHoveredLayer: (event) =>
		return if not @enabled

		layer = @getLayerFromElement(event?.target)
		return if not @getLayerIsVisible(layer)

		@hoveredLayer = layer

		@tryFocus(event)

		return false

	unsetHoveredLayer: (event) =>
		@hoveredLayer = undefined
		Utils.delay .05, =>
			if not @hoveredLayer then @focus()

	setSelectedLayer: =>
		return if not @hoveredLayer

		if @selectedLayer is @hoveredLayer
			@unsetSelectedLayer()
			return

		@selectedLayer = @hoveredLayer
		@focus()

	unsetSelectedLayer: =>
		@selectedLayer = undefined
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

	getLayerIsVisible: (layer) =>
		if not @_onlyVisible
			return true

		if not layer
			return true

		if layer.opacity is 0 or layer.visible is false or layer.gotchaIgnore
			return false

		@getLayerIsVisible(layer.parent)

	getLayerEventListeners: (layer) =>

		listeners = _.map(layer._events, (evs, listener, c) ->
			if not _.isArray(evs) then evs = [evs]
			
			{
				listener: listener
				events: _.map evs, (ev) ->
					{
						name: ev.fn.name
						function: ev.fn.toString()
						context: ev.context 
						once: ev.once
					}
			}
		)

		return listeners

	getScreenshot: (element) =>

		foreignObject = new SVGShape
			type: 'foreignObject'

		# element = document.getElementsByClassName('framerLayer DeviceComponentPort')[0]
		
		rect = element.getBoundingClientRect()
		ctx = @specPanel.canvas.getContext('2d');

		data = "<svg xmlns='http://www.w3.org/2000/svg' width='#{rect.width}' height='#{rect.height}'>" +
			'<foreignObject width="100%" height="100%">' +
			'<div xmlns="http://www.w3.org/1999/xhtml">' +
			element.innerHTML +
			'</div>' +
			'</foreignObject>' +
			'</svg>'

		DOMURL = window.URL or window.webkitURL or window

		svg = new Blob([data], {type: 'image/svg+xml'})
		url = DOMURL.createObjectURL(svg)
		@specPanel.screenshotBox.value = url


	# Find a non-standard Component that includes a Layer
	getComponentFromLayer: (layer, names = []) =>
		if not layer
			return names.join(', ')

		if not _.includes(["Layer", "TextLayer", "ScrollComponent"], layer.constructor.name)
			names.push(layer.constructor.name)

		@getComponentFromLayer(layer.parent, names)


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

		# @selectedLayer ?= Framer.Device.screen
		@hoveredLayer ?= Framer.Device.screen

		hoveredLayer = @hoveredLayer ? Framer.Device.screen
		selectedLayer = @selectedLayer ? Framer.Device.screen

		if selectedLayer is hoveredLayer
			hoveredLayer = Framer.Device.screen

		if hoveredLayer is selectedLayer
			return

		@showDistances(selectedLayer, hoveredLayer)
		@setPanelProperties(selectedLayer, hoveredLayer)

	unfocus: (event) =>
		svgContext.removeAll()


# kickoff

panel = document.createElement('div')
panel.id = 'pContainer'
viewC = document.getElementById('FramerContextRoot-Default')
Utils.delay 0, => viewC.appendChild(panel)

secretBox = document.createElement('input')
document.body.appendChild(secretBox)


svgContext = new SVGContext

exports.gotcha = gotcha = new Gotcha
