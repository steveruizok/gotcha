require "moreutils"

_.assign exports,
	name: "Gotcha"

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

# --------------------
# Helpers

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


addToLayerTree = (layer, indent = 0) ->
	new LayerTreeRow
		layer: layer
		indent: indent

	layer.children.forEach (child) ->
		addToLayerTree(child, indent + 1)


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
}


.layer_tree_row {
	width: 100%;
	background-color: #141413;
	font-size: 12px;
	font-family: Helvetica;
	color: #727272;
	padding: 4px 0;
}

.selected {
	color: rgba(255, 1, 255, 1.000);
}

.hovered {
	color: rgba(72, 207, 255, 1.000);
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

.layer_spec_row {
	width: 100%;
	background-color: #141413;
	font-size: 12px;
	font-family: Helvetica;
	color: #888888;
	padding: 2px 8px;
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
	border: 1px solid #555;
}

.spec_detail {
	font-size: 10px;
	color: #777;
	position: absolute;
	right: 16px;
}


"""



# --------------------
# Classes

# Layer Tree Row

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

		@element = createElement('div', 'layer_tree_row', layerTree)
		
		@element.style.marginLeft = (8 + (16 * @indent)) + 'px'

		@layerName = createElement('span', 'layer_name', @element, {
			textContent: @layerName
			})

		@element.addEventListener "mouseenter", =>
			specPanel.handleHovered(@layer)

		@element.addEventListener "click", =>
			specPanel.handleSelected(@layer)


		# definitions

		Object.defineProperty @, 
			"hovered",
			get: -> return @_hovered
			set: (bool) -> 
				@_hovered = bool

				if bool
					@element.classList.add('hovered')
				else
					@element.classList.remove('hovered')
		
		Object.defineProperty @, 
			"selected",
			get: -> return @_selected
			set: (bool) -> 
				@_selected = bool

				if bool
					@element.classList.add('selected')
				else
					@element.classList.remove('selected')



# Layer Spec Group
class LayerSpecGroup
	constructor: (options = {}) ->

		_.defaults options,
			accordion: false
		
		_.assign @, options

		@element = createElement('div', 'layer_spec_group', layerSpecs)
		

# Layer Spec Row

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
			specPanel.props[key] = new Container(value)
			i++


# String Container

class Container
	constructor: (options = {}) ->

		_.defaults options,
			parent: layerSpecs
			type: "text"
			wide: false
			left: false
			value: ""
			detail: ""
			template: undefined

		_.assign @, options

		@element = createElement('input', 'spec_container', @parent, {
			type: "text"
			value: @value
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

				@element.value = value ? " "

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


		@hoveredRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
		@svg.appendChild(@hoveredRect)

		@selectedRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
		@svg.appendChild(@selectedRect)


	showHovered: () =>
		layer = specPanel.hovered

		if not layer
			Utils.setAttributes @hoveredRect,
				opacity: 0
			return

		Utils.setAttributes @hoveredRect,
			width: layer.width
			height: layer.height
			x: layer.screenFrame.x
			y: layer.screenFrame.y
			fill: "#7dddff"
			opacity: .5

	showSelected: () =>
		layer = specPanel.selected

		if not layer
			Utils.setAttributes @selectedRect,
				opacity: 0
			return

		Utils.setAttributes @selectedRect,
			width: layer.width
			height: layer.height
			x: layer.screenFrame.x
			y: layer.screenFrame.y
			fill: "#ff62b0"
			opacity: .5


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

		structure = [
			{
				"Name":
				 	'name': {type: 'text', wide: true, detail: ""}
				 "Class":
				 	"constructor.name": {type: 'text', wide: true, detail: ""} #l.constructor.name}
			},{
				"Position":
					"screenFrame.y": {type: 'text', wide: false, detail: "x"},
					"screenFrame.x": {type: 'text', wide: false, detail: "y"}
				"Size":
					'width': {type: 'text', wide: false, detail: "w"}
					'height': {type: 'text', wide: false, detail: "h"}
				"Background":
					"backgroundColor": {type: 'color', wide: false, detail: ""}
				"Opacity":
					"opacity": {type: 'text', wide: false, detail: ""}
			}
		]

		# Make rows and containers

		structure.forEach (group, i) =>
			groupDiv = new LayerSpecGroup
			
			_.forIn group, (value, key) =>
				new LayerSpecRow
					label: key
					containers: value
					parent: groupDiv.element


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

		overlay.showHovered()
		overlay.showSelected()

		_.forIn @props, (value, key) =>
			@props[key].value = undefined

		return if not layer

		_.forIn @props, (value, key) =>
			@props[key].value = eval("layer.#{key}")

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

		# left panel

		leftPanel = createElementId('div', 'left_panel', gotcha_container)
		layerTree = createElementId('div', 'layer_tree', leftPanel)

		# make layer rows (create a class of this)

		rootLayers = currentLayers.filter( (layer) -> !layer.parent? )
		rootLayers = _.sortBy(rootLayers, 'index')

		rootLayers.forEach (layer, i) ->
			addToLayerTree(layer, 0)

		# right panel

		rightPanel = createElementId('div', 'right_panel', gotcha_container)
		
		specPanel = new SpecPanel

		overlay = new Overlay
