require "components/moreutils"

_.assign exports,
	name: "Gotcha"

_isDomToImageLoaded = false
Utils.domLoadScript "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js", => 
	_isDomToImageLoaded = true

# --------------------
# Global Variables

context = undefined
gotcha_container = undefined
leftPanel = undefined
layerTree = undefined
rightPanel = undefined
layerSpecs = undefined
currentLayers = undefined
specPanel = undefined
overlay = undefined
svgContext = undefined
hoveredLayerTreeRow = undefined
selectedLayerTreeRow = undefined
layerTreeRows = []
tintAlpha = .3
hoveredColor = "rgba(72, 207, 255, 1.000)"
selectedColor = "rgba(255, 1, 255, 1.000)"
selectedTint = new Color(selectedColor).alpha(tintAlpha)
hoveredTint = new Color(hoveredColor).alpha(tintAlpha)

# --------------------
# Helpers

defineToggleProperty = (obj, property, trueCallback, falseCallback) ->
	trueCallback ?= -> obj.element.classList.add(property)
	falseCallback ?= -> obj.element.classList.remove(property)

	Object.defineProperty obj, 
		property,
		get: -> return obj["_#{property}"]
		set: (value) -> 
			return if obj["_#{property}"] is value
			obj["_#{property}"] = value

			if value
				trueCallback()
			else
				falseCallback()

createElementId = (type, id, parent, assigns = {}) ->
	el = document.createElement(type)
	el.id = id
	parent.appendChild(el)
	_.assign(el, assigns)
	return el

createElement = (type, className, parent, assigns = {}) ->
	el = document.createElement(type)
	el.classList.add(className)
	parent.appendChild(el)
	_.assign(el, assigns)
	return el


getScreenshot = ( options = {}) =>
	unless options.layer then throw "getScreenshot requires a layer option. {layer: myLayer}"
	return new Promise (resolve, reject) =>
	
		# getParentCx = (layer, x = 0, y = 0) ->

		# 	if not layer.parent?
		# 		return {x: x, y: y}
			
		# 	getParentCx(layer.parent, layer.x + x, layer.y + y)
		
		# layerCx = getParentCx(options.layer)

		layer = options.layer

		savedProps =
			parent: layer.parent
			point: layer.point

		_.assign layer,
			parent: null
			x: 0
			y: 0

		_.defaults options,
			name: layer.name ? "Screenshot"
			type: "png"
			height: layer.height + layer.screenFrame.x
			width: layer.width
			style:
				height: '100%'
				width: '100%'


		load = new Promise (rs, rj) ->
			if _isDomToImageLoaded?
				rs()
				return
		
			domtoimageCDN = "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js"

			Utils.domLoadScript domtoimageCDN, => 
				_isDomToImageLoaded = true
				rs()

		load.then( ->

			node = options.layer._element
			func = domtoimage['to' + _.startCase(options.type)]
			
			func(node, {cacheBust: true, style: options.style})
			.then( (url) ->
				link = document.createElement('a')
				link.download = options.name + '.' + options.type
				link.href = url
				link.click()
				layer.props = savedProps

				resolve()

			).catch (error) -> 
				console.log(error)
		)

# --------------------
# CSS

rowBackground = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAABCAIAAAA5A5tKAAAAP0lEQVR4AWLQ09PV09EFlDAHJhBEMRBCezj191/qDVlIHiAwCL2Yqeg41R8W8rQ7fYuYTVJG9z5Rm8G4+O3/AQncCQaKES72AAAAAElFTkSuQmCC')"


Utils.insertCSS """

#gotcha_container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 7;
}

#left_panel {
	min-height: 200px;
	height: 100%;
	width: 224px;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	background-color: #141413;
 	overflow-x: hidden;
 	overflow-y: scroll;
 	white-space: nowrap;
 	pointer-events: all !important;
 	border-left: 1px solid #2d2d2d;
 	border-right: 1px solid #2d2d2d;
	z-index: 5;
}

#export_control {
	position: fixed;
	bottom: 0;
	width: 224px;
	min-height: 28px;
	background-color: #1d1d1d;
	font-size: 12px;
	font-family: Helvetica;
	color: #888888;
	border-top: 1px solid #000;
	padding: 4px 8xp;
	z-index: 8;
}

#layer_tree {
	display: inline-block;
	min-height: 100px;
	height: auto;
	width: 100%;
 	pointer-events: all !important;
	background-image: #{rowBackground};
	background-repeat: repeat;
	background-size: 16px;
	background-position: -1px 0;
	z-index: 7;
}

.layer_tree_row {
	position: relative;
	min-height: 28px;
	background-color: #141413;
	font-size: 12px;
	font-family: Helvetica;
	color: #727272;
	padding: 4px 0;
}


.checkbox {
	position: absolute;
	top: 8px;
	right: 12px;
	height: 14px;
	width: 14px;
	border: 1px solid #555555;
	background-color: #1d1d1d;
	border-radius: 4px;
	cursor: pointer;
}



.checked {
	border: 1px solid #ccc;
	background-color: #aaa;
}

.selected {
	color: #{selectedColor};
}

.hovered {
	color: #{hoveredColor};
}

.layer_tree_row:hover {
	color: #FFFFFF;
}

.layer_name {
}




#right_panel {
	min-height: 200px;
	height: 100%;
	width: 224px;
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: #141413;
 	overflow-x: hidden;
 	overflow-y: scroll;
 	white-space: nowrap;
 	pointer-events: all !important;
 	border-left: 1px solid #2d2d2d;
 	border-right: 1px solid #2d2d2d;
	z-index: 6;
}


#layer_specs {
	display: inline-block;
	min-height: 100px;
	height: auto;
	width: 100%;
 	pointer-events: all !important;
}

.layer_spec_group {
	width: 100%;
	padding: 16px 0;
	border-bottom: 1px solid #000000;
}

.layer_spec_group_header {
	width: 100%;
	background-color: #1d1d1d;
	font-size: 12px;
	font-family: Helvetica;
	color: #888888;
	padding: 2px 8px;
	border-bottom: 1px solid #000;
}

.glyph {
	position: absolute;
	right: 16px;
}

.hidden {
	display: none !important;
}

.layer_spec_row {
	width: 100%;
	min-height: 28px;
	padding: 2px 8px;
	background-color: #141413;
	font-size: 12px;
	font-family: Helvetica;
	color: #888888;
}

.spec_container {
	position: absolute;
	right: 8px;
	margin-top: 4px;
	border-radius: 4px;
	background-color: #292929;
	border: 1px solid #000;
	padding: 4px;
	width: 48px;
	color: #CCC;
}

.wide {
	width: 112px;
}

.left {
	right: 72px;
}

.color {
}

.copy {
	border-color: #7dddff !important;
}

.spec_container:hover {
	color: #FFF;
	border: 1px solid #08baff;
}

.spec_detail {
	font-size: 10px;
	color: #777;
	position: absolute;
	right: 16px;
}

.default_value {
	color: #555 !important;
}

.link {
	color: #CCC;
}

.link:hover {
	color: #21ccff;
}

"""



# --------------------
# Classes

# LAYER TREE

class LayerTree
	constructor: (options = {}) ->

		@element = createElementId('div', 'layer_tree', leftPanel)

		@layers = []

	makeLayers: =>
		rootLayers = currentLayers.filter( (layer) -> !layer.parent? )
		rootLayers = _.sortBy(rootLayers, 'index')

		rootLayers.forEach (layer, i) =>
			@addToLayerTree(layer)

	addToLayerTree: (layer, indent = 0) =>
		@layers.push new LayerTreeRow
			layer: layer
			indent: indent

		layer.children.forEach (child) =>
			@addToLayerTree(child, indent + 1)

	toggleCheckboxes: (bool) =>
		@layers.forEach (layer) ->
			if bool
				layer.checkbox.classList.remove('hidden')
				return

			layer.checkbox.classList.add('hidden')

	screenshotSelected: =>
		@layers.forEach (layer) ->
			if layer.checked
				getScreenshot(layer)

# EXPORT CONTROL

class ExportControl
	constructor: (options = {}) ->

		_.assign @,
			leftCallback: => @enabled = false
			rightCallback: => 
				if Utils.isFramerStudio()
					window.open("http://127.0.0.1:8000/")
					return

				if @enabled
					layerTree.screenshotSelected()
					return

				@enabled = true


		@element = createElementId('div', 'export_control', leftPanel)

		@leftLabel = createElementId('span', 'spec_detail', @element, {
			textContent: 'Export Layers'
			})

		_.assign @leftLabel.style,
			position: 'absolute'
			left: '16px'

		@rightLabel = createElementId('span', 'spec_detail', @element, {
			textContent: if Utils.isFramerStudio() then 'Open in Browser' else 'Select'
			})

		_.assign @rightLabel.style,
			position: 'absolute'
			right: '16px'

		@rightLabel.classList.add 'link'

		@rightLabel.addEventListener "click", @rightCallback
		@leftLabel.addEventListener "click", @leftCallback

		Object.defineProperty @, 
			"enabled",
			get: -> return @_enabled
			set: (bool) ->
				return if @_enabled is bool
				@_enabled = bool

				layerTree.toggleCheckboxes(bool)

				if bool
					@leftLabel.textContent = "Cancel"

					if Utils.isFramerStudio()
						@rightLabel.textContent = "Open in Browser"
						return

					@rightLabel.textContent = "Export Selected"
					return

				@leftLabel.textContent = "Export Layers"	
				@rightLabel.textContent = "Select"
				

# LAYER TREE ROW

class LayerTreeRow
	constructor: (options = {}) ->

		_.defaults options,
			layer: undefined
			indent: 0
			layerName: options.layer?.name

		_.assign @, options

		layerTreeRows.push(@)

		if not @layer.name or @layer.name is ""
			@layerName = 'Untitled'
		if @layer.name is '.'
			@layerName = "(hidden)"

		@element = createElement('div', 'layer_tree_row', layerTree.element)
		@element.style.marginLeft = (8 + (16 * @indent)) + 'px'

		@layerName = createElement('span', 'layer_name', @element, {
			textContent: @layerName
			})

		@checkbox = createElement('div', 'checkbox', @element)
		@checkbox.classList.add('hidden')

		# events
		
		@checkbox.addEventListener "click", =>
			event.stopPropagation()
			@checked = !@checked

		@element.addEventListener "mouseenter", =>
			specPanel.handleHovered(@layer)

		@element.addEventListener "click", =>
			specPanel.handleSelected(@layer)


		# definitions
		defineToggleProperty(@, "hovered")
		defineToggleProperty(@, "selected")
		defineToggleProperty(@, "checked")


# LAYER SPEC GROUP

class LayerSpecGroup
	constructor: (options = {}) ->

		_.defaults options,
			accordion: false
			title: undefined
			closed: false

		_.assign @, options

		if @title

			@titleElement = createElement('div', 'layer_spec_group_header', layerSpecs)

			@label = createElement('span', 'layer_spec_label', @titleElement, {
				textContent: @title
				})

			if @accordion
				@glyph = createElement('span', 'glyph', @titleElement, {
					textContent: "▿"
					})

				@titleElement.addEventListener "click", => 
					@open = !@open
					@glyph.textContent = if @open then "▾" else "▿"


		@element = createElement('div', 'layer_spec_group', layerSpecs)

		defineToggleProperty(@, "visible",
			(=> 
				return if !@open
				@element.classList.remove "hidden")
			(=>
				return if !@open
				@element.classList.add "hidden")
			)
		
		defineToggleProperty(@, "open",
			(=> @element.classList.remove "hidden")
			(=> @element.classList.add "hidden")
			)

		defineToggleProperty(@, "special",
			(=> @titleElement?.classList.add "special")
			(=> @titleElement?.classList.remove "special")
			)

		@open = !@closed
		@special = false

# LAYER SPEC ROW

class LayerSpecRow
	constructor: (options = {}) ->

		_.defaults options,
			label: "Label"
			type: "wide"
			parent: layerSpecs
			containers: []

		_.assign @, options

		@element = createElement('div', 'layer_spec_row', @parent)
		
		@label = createElement('span', 'layer_spec_label', @element, {
			textContent: @label
			})

		i = 0
		_.forIn @containers, (value, key) =>
			value.parent = @element
			if i is 0 then value.left = true
			specPanel.props[key] = new Container(value) # <-- the magic
			i++


# CONTAINER

class Container
	constructor: (options = {}) ->

		_.defaults options,
			parent: layerSpecs
			type: "text"
			wide: false
			left: false
			detail: ""
			defaultValue: "0"
			template: undefined

		_.assign @, options

		@element = createElement('input', 'spec_container', @parent, {
			type: "text"
			value: ""
			})

		@detail = createElement('span', 'spec_detail', @parent, {
			textContent: @detail
			})

		if @type is "color"
			@element.classList.add('color')

		if @wide
			@element.classList.add('wide')
		else if @left
			@element.classList.add('left')
			@detail.style.right = '80px'

		# definitions

		Object.defineProperty @, 
			"value",
			get: -> return @element.value
			set: (value) -> 
				if @template? and value?
					value = @template(value)

				if @type is "color"
					@element.style.backgroundColor = value ? '#292929'
					return

				@element.value = value ? @defaultValue
				@default = @element.value is @defaultValue

		defineToggleProperty(@, "default",
			(=> 
				@element.classList.add "default_value")
			(=>
				@element.classList.remove "default_value")
			)

		# events

		@element.addEventListener "click", => 
			@element.classList.add('copy')
			
			if @type is "color"
				value = @element.style.backgroundColor
			else
				value = @element.value

			Utils.copyTextToClipboard(value)

			Utils.delay .15, =>
				@element.classList.remove('copy')
















# ----------------------------
# SVG Overlay

class Overlay
	constructor: (options = {}) ->

		overlay = @


		# ----------------
		# Elements

		# svg element

		svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
		svg.style['z-index'] = '999'
		gotcha_container.appendChild(svg)

		_.assign @,
			frameElement: Framer.Device.screen._element
			svg: svg

		# Lines

		@lines = {}

		['top', 'right', 'bottom', 'left'].forEach (dir) =>
			line = document.createElementNS("http://www.w3.org/2000/svg", 'line')
			@svg.appendChild(line)
			Utils.setAttributes line, 
				'stroke-width': '1px'
				stroke: hoveredColor

			caps = _.range(2).map (i) =>
				cap = document.createElementNS("http://www.w3.org/2000/svg", 'line')
				@svg.appendChild(cap)
				Utils.setAttributes cap, 
					'stroke-width': '1px'
					stroke: hoveredColor

				return cap

			@lines[dir] =
				line: line
				caps: caps

		# Selected Lines

		@selectedLines = {}

		['top', 'right', 'bottom', 'left'].forEach (dir) =>
			line = document.createElementNS("http://www.w3.org/2000/svg", 'line')
			@svg.appendChild(line)
			Utils.setAttributes line, 
				'stroke-width': '1px'
				stroke: selectedColor
				'stroke-dasharray': '4 4'

			@selectedLines[dir] =
				line: line

		# Rects

		@rects = {}
		['hovered', 'selected'].forEach (state, i) =>
			rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
			@svg.appendChild(rect)
			Utils.setAttributes rect, 
				height: 0
				width: 0
				x: 0
				y: 0
				strokeWidth: 1
				fill: if i is 0 then hoveredTint else selectedTint
				stroke: if i is 0 then hoveredColor else selectedColor

			@rects[state] = rect


		# ----------------
		# Events

		window.addEventListener "resize", @setContext


		# ----------------
		# Kickoff

		@setContext()


	# ----------------
	# Public Methods

	setContext: =>

		@lFrame = @frameElement.getBoundingClientRect()

		Utils.setAttributes @svg,
			x: 0
			y: 0
			width: '100%'
			height: '100%'
			viewBox: "0 0 #{Screen.width} #{Screen.height}"
			fill: "#CCC"

		_.assign @svg.style,
			position: "absolute"
			left: @lFrame.left
			top: @lFrame.top
			width: @lFrame.width
			height: @lFrame.height
			'pointer-events': 'none'
			backgroundColor: "rgba(255,255,255,.12"

		@screen = _.clone(Screen.frame)
		@screen.screenFrame = Screen.frame


	styleLines: (style) =>
		for line in _.values(@lines)
			@styleLine(line, style)
	

	styleLine: (line, style) =>
		Utils.setAttributes(line.line, style)
		
		return unless line.caps?

		for cap in line.caps
			Utils.setAttributes(cap, style)


	clearLines: =>
		@styleLines
			opacity: 0

		for rect in _.values(@rects)
			Utils.setAttributes rect,
				opacity: 0


	clearSelected: =>
		for line in _.values(@selectedLines)
			Utils.setAttributes(line.line, {opacity: 0})


	setLine: (line, pointA, pointB) =>

		@styleLine line,
			opacity: 1

		Utils.setAttributes line.line, 
			x1: pointA.x
			y1: pointA.y
			x2: pointB.x
			y2: pointB.y

		return unless line.caps?

		if pointA.x is pointB.x
			Utils.setAttributes line.caps[0], @getCapCX(pointA, [-4, 0, 4, 0])
			Utils.setAttributes line.caps[1], @getCapCX(pointB, [-4, 0, 4, 0])
		else if pointA.y is pointB.y
			Utils.setAttributes line.caps[0], @getCapCX(pointA, [0, -4, 0, 4])
			Utils.setAttributes line.caps[1], @getCapCX(pointB, [0, -4, 0, 4])


	getCapCX: (point, offsets = []) ->
		if 0 > point.x > Screen.width
			fX = point.x
		
		if 0 > point.y > Screen.height
			fY = point.y

		return {
			x1: fX ? (point.x + (offsets[0] ? 0))
			y1: fY ? (point.y + (offsets[1] ? 0))
			x2: fX ? (point.x + (offsets[2] ? 0))
			y2: fY ? (point.y + (offsets[3] ? 0))
		}


	getFrame: (layer) ->
		frame = layer.screenFrame
		_.assign frame,
			midX: frame.x + (frame.width / 2)
			midY: frame.y + (frame.height / 2)
			maxX: frame.x + frame.width
			maxY: frame.y + frame.height

		return frame


	targetToLayer: (layer, selected = false) =>
		color = if selected then selectedColor else hoveredColor

		frame = @getFrame(layer)
		selected = @getFrame(@selectedLayer)

		if frame.y > selected.maxY
			@setLine(@lines.top,	{x: frame.midX, y: selected.maxY + 4}, {x: frame.midX, y: frame.y - 4})
		if frame.maxY < selected.y
			@setLine(@lines.bottom,	{x: frame.midX, y: frame.maxY + 4}, {x: frame.midX, y: selected.y - 4})
		if frame.x > selected.maxX
			@setLine(@lines.right,	{x: selected.maxX + 4, y: frame.midY}, {x: frame.x - 4, y: frame.midY})
		if frame.maxX < selected.x	
			@setLine(@lines.left,	{x: frame.maxX + 4, y: frame.midY}, {x: selected.x - 4, y: frame.midY})


	showHovered: () =>
		layer = specPanel.hovered
		return if not layer

		Utils.setAttributes @rects.hovered,
			width: layer.width
			height: layer.height
			x: layer.screenFrame.x
			y: layer.screenFrame.y
			opacity: 1

		@targetToLayer(layer)


	showSelected: () =>
		layer = specPanel.selected
		if not layer
			@clearSelected()
			return

		selected = @getFrame(@selectedLayer)

		Utils.setAttributes @rects.selected,
			width: selected.width
			height: selected.height
			x: selected.x
			y: selected.y
			opacity: 1

		@setLine(@selectedLines.top,	{x: 0, y: selected.y}, {x: @screen.width, y: selected.y})
		@setLine(@selectedLines.bottom,	{x: 0, y: selected.maxY}, {x: @screen.width, y: selected.maxY})
		@setLine(@selectedLines.right,	{x: selected.maxX, y: 0}, {x: selected.maxX, y: @screen.height})
		@setLine(@selectedLines.left,	{x: selected.x, y: 0}, {x: selected.x, y: @screen.height})


	refresh: =>
		@clearLines()

		@hoveredLayer = specPanel.hovered ? @screen
		@selectedLayer = specPanel.selected ? @screen
		
		@showHovered()
		@showSelected()











# ----------------------------
# Spec Panel

class SpecPanel
	constructor: (options = {}) ->

		specPanel = @

		# ----------------
		# Elements

		layerSpecs = createElementId('div', 'layer_specs', rightPanel)

		_.assign @,
			element: layerSpecs
			_selected: undefined
			_hovered: undefined
			pixelratio: Framer.Device._context.devicePixelRatio
			props: {}
			timer: undefined

		# ----------------
		# Structure

		structure =
			title:
				"_group": 
					visible: (l) -> true
				"Name":
				 	'name': {wide: true}
				 "Class":
				 	"constructor.name": {type: 'text', wide: true} #l.constructor.name}
			position:
				"_group": 
					visible: (l) -> true
				"Relative":
					"y": {detail: "x"},
					"x": {detail: "y"}
				"Screen":
					"screenFrame.y": {detail: "x"},
					"screenFrame.x": {detail: "y"}
				"Size":
					'width': {detail: "w"}
					'height': {detail: "h"}
				"Background":
					"backgroundColor": {type: 'color'}
				"Opacity":
					"opacity": {defaultValue: "1"}
			shadow:
				"_group": 
					visible: (l) -> (l.shadowX + l.shadowY) > 0
				"Shadow":
					"shadowColor": {type: 'color'}
					"shadowSpread": {detail: "s"}
				"_0":
					"shadowX": {detail: "x"}
					"shadowY": {detail: "y"}
				"_1":
					"shadowBlur": {detail: "b"}
			font:
				"_group": 
					visible: (l) -> l.fontFamily?
				"Font":
					"fontFamily": {wide: true},
				"Color":
					"color": {type: "color"},
					"fontSize": {}
				"Style":
					"fontStyle": {},
					"fontWeight": {detail: "w"}
				"Align":
					"textAlign": {wide: true, default: "left"},
				"Spacing":
					"letterSpacing": {detail: 'l'}
					"wordSpacing": {detail: 'w'}
				"Text":
					"text": {wide: true}
			transforms:
				"_group": 
					visible: (l) -> true
					accordion: true
					title: "Transforms"
					closed: true
				"Scale":
					"scale": {defaultValue: "1"},
				"_0":
					"scaleX": {detail: "x", defaultValue: "1"},
					"scaleY": {detail: "y", defaultValue: "1"},
				"Rotate":
					"rotation": {},
				"_1":
					"rotationX": {detail: "x"},
					"rotationY": {detail: "y"},
				"Origin":
					"originX": {detail:"x", defaultValue: "0.5"}
					"originY": {detail: "y", defaultValue: "0.5"},
				"Skew":
					"skew": {},
				"_2":
					"skewX": {detail: "x"},
					"skewY": {detail: "y"},
				"Perspective":
					"Perspective": {}
			filters:
				"_group": 
					visible: (l) -> true
					accordion: true
					title: "Filters"
					closed: true
				"Blur":
					"blur": {},
				"Brightness":
					"brightness": {defaultValue: "100"},
				"Contrast":
					"contrast": {defaultValue: "100"},
				"Grayscale":
					"grayscale": {},
				"hueRotate":
					"hueRotate": {},
				"Invert":
					"invert": {},
				"Saturate":
					"saturate": {defaultValue: "100"},
				"Sepia":
					"sepia": {},
			animations:
				"_group": 
					visible: (l) -> true
					accordion: true
					title: "Animations"
					closed: true
			event_listeners:
				"_group": 
					visible: (l) -> true
					accordion: true
					title: "Event Listeners"
					closed: true
			

		# Make rows and containers

		@specGroups = _.map structure, (specRows, groupName) =>
			specGroup = new LayerSpecGroup
				name: groupName
				accordion: specRows._group?.accordion
				title: specRows._group?.title
				closed: specRows._group?.closed

			group = 
				element: specGroup
				options: undefined

			_.forIn specRows, (value, key) =>
				if key is "_group"
					group.options = value
					return

				new LayerSpecRow
					label: if key[0] is "_" then " " else key
					containers: value
					parent: specGroup.element


			return group

		# ----------------
		# Events

		# set hovered on mouse move
		Framer.Device.screen.on "mousemove", (event) =>
			
			point =
				x: event.point.x / @pixelratio
				y: event.point.y / @pixelratio
			
			hovered = currentLayers.filter (layer) ->
				Utils.pointInFrame(point, layer.screenFrame)

			@handleHovered(_.last(hovered))


		Framer.Device.screen.onTap (event) =>
			return if Math.abs(event.offset.x) > 10 or Math.abs(event.offset.y) > 10

			@handleSelected(@actuallyHovered)
		
		# clear hovered when background is entered
		Framer.Device.background.on Events.MouseEnter, (event) =>
			@hovered = null

		# clear hovered when panel is entered
		leftPanel.addEventListener 'mouseenter', (event) =>
			@hovered = null

		# clear hovered when panel is entered
		rightPanel.addEventListener 'mouseenter', (event) =>
			@hovered = null


		# ----------------
		# Kickoff

		# refresh every 1/15 seconds
		Utils.delay .5, => @timer = new Utils.Timer(.0667, @_refresh)


		# ----------------
		# Definitions

		Object.defineProperty @, 
			"selected",
			get: -> return @_selected
			set: (layer) -> 
				@_selected = layer
				@_showSelectedInLayerTree()


		Object.defineProperty @, 
			"hovered",
			get: -> return @_hovered
			set: (layer) -> 
				@_hovered = layer
				@_showHoveredInLayerTree()

	
	# ----------------
	# Methods

	_refresh: () =>
		layer = @selected ? @hovered

		overlay.refresh()

		_.forIn @props, (value, key) =>
			@props[key].value = undefined

		return if not layer

		@specGroups.forEach (group) =>
			group.element.visible = group.options.visible(layer)

		_.forIn @props, (value, key) =>
			@props[key].value = _.at(layer, key)

	_showHoveredInLayerTree: =>
		hoveredLayerTreeRow?.hovered = false
		return if not @hovered

		hoveredLayerTreeRow = _.find layerTreeRows, (row) =>
			row.layer is @hovered

		hoveredLayerTreeRow.hovered = true

	_showSelectedInLayerTree: =>
		selectedLayerTreeRow?.selected = false
		return if not @selected

		selectedLayerTreeRow = _.find layerTreeRows, (row) => 
			row.layer is @selected
		
		selectedLayerTreeRow.selected = true


	# ----------------
	# Public Methods

	handleHovered: (layer) =>
		@actuallyHovered = layer

		if @actuallyHovered is @selected
			@hovered = undefined
			return

		@hovered = @actuallyHovered

	handleSelected: (layer) =>
		if layer is @selected
			@selected = undefined
			return

		@selected = @hovered


# --------------------
# Kickoff



Utils.domComplete ->
	context = document.getElementById('FramerContextRoot-Default')
	
	Utils.delay 1, ->
		Canvas.backgroundColor = '#1e1e1e'

		currentLayers = Framer.CurrentContext._layers
	
		gotcha_container = createElementId('div', 'gotcha_container', context)

		# ----------
		# left panel

		leftPanel = createElementId('div', 'left_panel', gotcha_container)
		
		exportControl = new ExportControl

		layerTree = new LayerTree
		layerTree.makeLayers()

		# ----------
		# right panel

		rightPanel = createElementId('div', 'right_panel', gotcha_container)
		
		specPanel = new SpecPanel

		overlay = new Overlay
