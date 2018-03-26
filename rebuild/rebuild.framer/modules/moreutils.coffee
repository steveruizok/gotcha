# A collection for helper methods.
#
# @author steveruizok


###
Pin a layer to another layer. When the second layer moves, the first one will too.

@param {Layer} layer The layer to pin.
@param {Layer} target The layer to pin to. 
@param {...String} directions Which sides of the layer to pin to.

	Utils.pin(layerA, layerB, 'left')

###
Utils.pin = (layer, target, directions...) ->
	if directions.length > 2 
		throw 'Utils.pin can only take two direction arguments (e.g. "left", "top"). Any more would conflict!'
	
	for direction in directions
		do (layer, target, direction) ->
			switch direction
				when "left"
					props = ['x']
					lProp = 'maxX'
					distance = target.x - (layer.maxX)
					getDifference = -> target.x - distance
				when "right"
					props = ['x', 'width']
					lProp = 'x'
					distance = layer.x - (target.maxX)
					getDifference = -> target.maxX + distance
				when "top"
					props = ['y']
					lProp = 'maxY'
					distance = target.y - (layer.maxY)
					getDifference = -> target.y - distance
				when "bottom"
					props = ['y', 'height']
					lProp = 'y'
					distance = layer.y - (target.maxY)
					getDifference = -> target.maxY + distance
				else
					throw 'Utils.pin - directions can only be top, right, bottom or left.'
			
			for prop in props
				setPin =
					targetLayer: target
					direction: direction
					event: "change:#{prop}"
					func: -> layer[lProp] = getDifference()
			
				layer.pins ?= []
				layer.pins.push(setPin)
				
				target.on(setPin.event, setPin.func)
	

###
Remove all of a layer's pins, or pins from a certain target layer and/or direction.

@param {Layer} layer The layer to unpin.
@param {Layer} [target] The layer to unpin from. 
@param {...String} [directions] The directions to unpin.

	Utils.unpin(layerA)

###
Utils.unpin = (layer, target, direction) ->
	
	setPins = _.filter layer.pins, (p) ->
		isLayer = if target? then p.target is target else true
		isDirection = if direction? then p.direction is direction else true
		
		return isLayer and isDirection
	
	for setPin in setPins
		setPin.target.off(setPin.event, setPin.func)


###
Pin layer to another layer, based on the first layer's origin.

@param {Layer} layer The layer to pin.
@param {Layer} [target] The layer to pin to. 
@param {Boolean} [undo] Remove, rather than create, this pin. 

	Utils.pinOrigin(layerA, layerB)

###
Utils.pinOrigin = (layer, target, undo = false) ->
	if undo
		target.off "change:size", layer.setPosition 
		return

	layer.setPosition = ->
		layer.x = (target.width - layer.width) * layer.originX
		layer.y = (target.height - layer.height) * layer.originY
	
	layer.setPosition()
	
	target.on "change:size", layer.setPosition


###
Pin layer to another layer, based on the first layer's originX.

@param {Layer} layer The layer to pin.
@param {Layer} [target] The layer to pin to. 
@param {Boolean} [undo] Remove, rather than create, this pin. 

	Utils.pinOriginX(layerA, layerB)

###
Utils.pinOriginX = (layer, target, undo = false) ->
	if undo
		target.off "change:size", layer.setPosition 
		return

	layer.setPosition = ->
		layer.x = (target.width - layer.width) * layer.originX
	
	layer.setPosition()
	
	target.on "change:size", layer.setPosition


###
Pin layer to another layer, based on the first layer's originY.

@param {Layer} layer The layer to pin.
@param {Layer} [target] The layer to pin to. 
@param {Boolean} [undo] Remove, rather than create, this pin. 

	Utils.pinOriginY(layerA, layerB)

###
Utils.pinOriginY = (layer, target, undo = false) ->
	if undo
		target.off "change:size", layer.setPosition 
		return

	layer.setPosition = ->
		layer.y = (target.height - layer.height) * layer.originY
	
	layer.setPosition()
	
	target.on "change:size", layer.setPosition


###
Set a layer's contraints to its parent

@param {Layer} layer The layer to constrain.
@param {...String} options The constraint options to use.

Valid options are: 'left', 'top', 'right', 'bottom', 'height', 'width', and 'aspectRatio'.

	Utils.constrain(layer, 'left', 'top', 'apectRatio')

###
Utils.constrain = (layer, options...) ->
	if not layer.parent? then throw 'Utils.constrain requires a layer with a parent.'
	
	opts =
		left: false, 
		top: false, 
		right: false, 
		bottom: false,
		height: false
		width: false
		aspectRatio: false

	for opt in options
		opts[opt] = true
	
	values = 
		left: if opts.left then layer.x else null
		height: layer.height
		centerAnchorX: layer.midX / layer.parent?.width
		width: layer.width
		right: if opts.right then layer.parent?.width - layer.maxX else null
		top: if opts.top then layer.y else null
		centerAnchorY: layer.midY / layer.parent?.height
		bottom: if opts.bottom then layer.parent?.height - layer.maxY else null
		widthFactor: null
		heightFactor: null
		aspectRatioLocked: opts.aspectRatio
	
	unless opts.top and opts.bottom
		if opts.height
			values.heightFactor = layer.height / layer.parent?.height
			
	unless opts.left and opts.right 
		if opts.width
			values.widthFactor = layer.width / layer.parent?.width
	
	layer.constraintValues = values


###
Immediately execute a function that is bound to the target.

@param {Object} object The object to bind the callback to.
@param {Function} callback The callback to run.

	Utils.bind(myLayer, -> this.name = "My Layer")

###
Utils.bind = (object, callback) ->
	do _.bind(callback, object)


###
Alias for Utils.bind.
###
Utils.build = (object, callback) -> @bind(object, callback)


###
Define a property on a Layer that will emit a change event when that property changes. Also, optionally give the property an initial value and a callback to run when the property changes.

@param {Layer} layer The layer on which to define the property.
@param {String} property The name of the property.
@param {Object} [value] The initial value of the property.
@param {Function} [callback] The callback to run when this property changes. Executed with two arguments: the property's new value and the Layer itself.
@param {Function} [validation] A function to validate the property's new value.
@param {String} [error] An error to throw if the validation function returned false.

	Utils.define(myLayer, "toggled")
	Utils.define(myLayer, "toggled", false)
	Utils.define(myLayer, "toggled", false, myLayer.showToggled)
	Utils.define(myLayer, "toggled", false, null, _.isBoolean, "Layer.toggled must be true or false.")

###
Utils.define = (layer, property, value, callback, validation, error) ->
	validation ?= -> true
	error ?= "Layer #{layer.id}'s property '#{property}' was given the wrong value type."
	
	Object.defineProperty layer,
		property,
		get: -> return layer["_#{property}"]
		set: (value) ->
			if value?
				if not validation(value) then throw error
				return if value is layer["_#{property}"]

			layer["_#{property}"] = value
			layer.emit("change:#{property}", value, layer)
		configurable: true
			
	if callback? and typeof callback is 'function'
		layer.on("change:#{property}", callback)
	
	layer[property] = value

###
Set all layers in an array to the same property or properties.

@param {Array} layers The array of layers to align.
@param {Object} options The properties to set.
@param {Boolean} [minimum] Whether to use average values or minimum values for middle / center.
@param {Boolean} [animate] Whether to animate to the new property.
@param {Object} [animationOptions] The animation options to use.

	Utils.align [layerA, layerB],
		x: 200

	Utils.align [layerA, layerB],
		x: 200
		true
		time: .5
###
Utils.align = (layers = [], direction, minimum = true, animate, animationOptions = {}) -> 
	minX = _.minBy(layers, 'x').x
	maxX = _.maxBy(layers, 'maxX').maxX
	minY = _.minBy(layers, 'y').y
	maxY = _.maxBy(layers, 'maxY').maxY


	options = switch direction
		when "top" then {y: minY}
		when "middle"
			if minimum
				{midY: _.minBy(layers, 'y').midY}
			else 
				{midY: (maxY - minY)/2 + minY}
		when "bottom" then {maxY: maxY}
		when "left" then {x: minY}
		when "center"
			if minimum 
				{midX: _.minBy(layers, 'x').midX}
			else
				{midX: (maxX - minX)/2 + minX}
		when "right" then {maxX: maxX}
		else {}

	for layer, i in layers
		if animate
			layer.animate options, animationOptions
		else
			_.assign layer, options

###
Distribute an array of layers between two values.

@param {Array} layers The array of layers to distribute.
@param {String} property The property to distribute.
@param {Object} [start] The value to start from. By default, the lowest value of the given property among the layers array.
@param {Object} [end] The value to distribute to. By default, the highest value of the given property among the layers array.
@param {Boolean} [animate] Whether to animate to the new property.
@param {Object} [animationOptions] The animation options to use.

	Utils.align [layerA, layerB], 'x'

	Utils.align [layerA, layerB], 'x', 32, 200

	Utils.align [layerA, layerB], 'x', 32, 200, true, {time: .5}

Also works with 'horizontal' and 'vertical', (alias to 'midX' and 'midY').

	Utils.align [layerA, layerB], 'horizontal'

###
Utils.distribute = (layers = [], property, start, end, animate = false, animationOptions = {}) ->
	
	property = 'midX' if property is 'horizontal'
	property = 'midY' if property is 'vertical'

	layers = _.sortBy(layers, [property])

	if _.isUndefined(start) or typeof start is 'boolean'
		animate = start ? false
		animationOptions = end ? {}
		start = layers[0][property]
		end = _.last(layers)[property]

	distance = (end - start) / (layers.length - 1)

	values = layers.map (layer, i) ->
		return {"#{property}": start + (distance * i)}
	
	for layer, i in layers
		if animate
			layer.animate values[i], animationOptions
			continue
		
		_.assign layer, values[i]

###
Stack layers.

@param {Array} layers The array of layers to offset.
@param {Number} distance The distance between each layer.
@param {String} axis Whether to stack on the x or y axis.
@param {Boolean} [animate] Whether to animate layers to the new position.
@param {Object} [animationOptions] The animation options to use.

###
Utils.stack = (layers = [], distance = 0, axis = "vertical", animate = false, animationOptions = {}) ->
	return if layers.length <= 1

	if axis is "vertical" or axis is "y"
		Utils.offsetY(layers, distance, animate, animationOptions)
	else if axis is "horizontal" or axis is "x"
		Utils.offsetX(layers, distance, animate, animationOptions)

	return layers


###
Offset an array of layers vertically.

@param {Array} layers The array of layers to offset.
@param {Number} distance The distance between each layer.
@param {Boolean} [animate] Whether to animate layers to the new position.
@param {Object} [animationOptions] The animation options to use.

	Utils.align [layerA, layerB],
		x: 200

	Utils.align [layerA, layerB],
		x: 200
		true
		time: .5
###
Utils.offsetY = (layers = [], distance = 0, animate = false, animationOptions = {}) -> 
	return if layers.length <= 1

	startY = layers[0].y
	values = []
	values = layers.map (layer, i) ->
		v = {y: startY}
		startY += layer.height + distance
		return v
		
	for layer, i in layers
		if animate
			layer.animate values[i], animationOptions
		else
			_.assign layer, values[i]

	return layers

###
Offset an array of layers horizontally.

@param {Array} array The array of layers to offset.
@param {Number} distance The distance between each layer.
@param {Boolean} [animate] Whether to animate layers to the new position.
@param {Object} [animationOptions] The animation options to use.

	Utils.align [layerA, layerB],
		x: 200

	Utils.align [layerA, layerB],
		x: 200
		true
		time: .5
###
Utils.offsetX = (layers = [], distance = 0, animate = false, animationOptions = {}) -> 
	return if layers.length <= 1

	startX = layers[0].x
	values = []
	values = layers.map (layer, i) ->
		v = {x: startX}
		startX += layer.width + distance
		return v
		
	for layer, i in layers
		if animate
			layer.animate values[i], animationOptions
		else
			_.assign layer, values[i]

	return layers

# Create a timer instance to simplify intervals.
# Thanks to https://github.com/marckrenn.
#
# @example
#
# timer = new Utils.timer(1, -> print 'hello world!')
# Utils.delay 5, -> timer.pause()
# Utils.delay 8, -> timer.resume()
# Utils.delay 10, -> timer.restart()
#
Utils.Timer = class Timer
	constructor: (time, f) ->
		@paused = false
		@saveTime = null
		@saveFunction = null

		if time? and f?
			@start(time, f)
	
	start: (time, f) =>
		@saveTime = time
		@saveFunction = f

		f()
		proxy = => f() unless @paused
		unless @paused
			@_id = timer = Utils.interval(time, proxy)
		else return
	
	pause:   => @paused = true
	resume:  => @paused = false
	reset:   => clearInterval(@_id)
	restart: => 
		clearInterval(@_id)
		Utils.delay 0, => @start(@saveTime, @saveFunction)


###
A class to manage states of multiple TextLayers, which "observe" the state. 
When the state changes, the StateManager will update all "observer" TextLayers,
applying the new state to each TextLayer's template property.

@param {Array} [layers] The layers to observe the state.
@param {Object} [state] The initial state.

	stateMgr = new Utils.StateManager, myLayers
		firstName: "David"
		lastName: "Attenborough"

	stateMgr.setState
		firstName: "Sir David"

###
Utils.StateManager = class StateManager
	constructor: (layers = [], state = {}) ->
		
		@_state = state
		@_observers = layers
		
		Object.defineProperty @,
			"observers",
			get: -> return @_observers
		
		Object.defineProperty @,
			"state",
			get: -> return @_state
			set: (obj) ->
				if typeof obj isnt "object"
					throw "State must be an object."
				
				@setState(obj)

		@_updateState()

	_updateState: =>
		@observers.forEach (layer) =>
			layer.template = @state
	
	addObserver: (layer) ->
		@_observers.push(layer)
		layer.template = @state
		
	removeObserver: (layer) ->
		_.pull(@_observers, layer)
	
	setState: (options = {}) -> 
		_.merge(@_state, options)
		@_updateState()
		
		return @_state

# arrange layers in an array into a grid, using a set number of columns and row/column margins
# @example    Utils.grid(layers, 4)
Utils.grid = (array = [], cols = 4, rowMargin = 16, colMargin) ->
	
	g =
		x: array[0].x
		y: array[0].y
		cols: cols
		height: _.maxBy(array, 'height')?.height
		width: _.maxBy(array, 'width')?.width
		rowMargin: rowMargin ? 0
		columnMargin: colMargin ? rowMargin ? 0
		rows: []
		columns: []
		layers: []

		apply: (func) ->
			for layer in @layers
				Utils.build(layer, func)

		# get a specified column
		getColumn: (layer) -> 
			return @columns.indexOf(_.find(@columns, (c) -> _.includes(c, layer)))

		# get a specified row
		getRow: (layer) -> 
			return @rows.indexOf(_.find(@rows, (r) -> _.includes(r, layer)))

		# get a layer at a specified grid positions
		getLayer: (row, col) -> 
			return @rows[row][col]

		# return a random layer from the grid
		getRandom: -> 
			return _.sample(_.sample(@rows))

		# add a new layer to the grid, optionally at a specified position
		add: (layer, i = @layers.length, animate = false) ->

			if not layer?
				layer = @layers[0].copySingle()
			
			layer.parent = @layers[0].parent

			@layers.splice(i, 0, layer)
			
			@_refresh(@layers, animate)

			return layer
		
		# remove a layer from the grid
		remove: (layer, animate) ->
			@_refresh(_.without(@layers, layer), animate)
			layer.destroy()

			return @

		# clear and re-fill arrays, then build
		_refresh: (layers, animate) ->
			@rows = []
			@columns = []
			@layers = layers

			@_build(animate)

		# put together the grid
		_build: (animate = false) ->
			for layer, i in @layers
				col = i % cols
				row = Math.floor(i / cols)
				
				@rows[row] ?= [] 
				@rows[row].push(layer)
				
				@columns[col] ?= []
				@columns[col].push(layer)
				
				if animate
					layer.animate
						x: @x + (col * (@width + @columnMargin))
						y: @y + (row * (@height + @rowMargin))
					continue

				_.assign layer,
					x: @x + (col * (@width + @columnMargin))
					y: @y + (row * (@height + @rowMargin))
	
	g._refresh(array)

	return g


# make a grid out of a layer, copying the layer to fill rows
# @example    Utils.makeGrid(layer, 2, 4, 8, 8)
Utils.makeGrid = (layer, cols = 4, rows = 1, rowMargin, colMargin) ->
	layers = [layer]
	
	for i in _.range((cols * rows) - 1)
		layers[i + 1] = layer.copy()
		layers[i + 1].parent = layer.parent
		
	g = Utils.grid(layers, cols, rowMargin, colMargin)
	
	return g



###
Change a layer's size to fit around the layer's children.

@param {Layer} layer The parent layer to change.osition.
@param {Object} [padding] The padding to use for the hug.

	Utils.hug(layerA)

	Utils.hug(layerA, 32)

	Utils.hug(layerA, {top: 16, bottom: 24})
###
Utils.hug = (layer, padding) ->

	def = 0
	defStack = undefined

	if typeof padding is "number" 
		def = padding
		defStack = padding
		padding = {}

	_.defaults padding,
		top: def
		bottom: def
		left: def
		right: def
		stack: defStack

	Utils.bind layer, ->
		for child, i in @children

			child.y += @padding.top

			child.x += @padding.left

			if @padding.right? > 0
				@width = _.maxBy(@children, 'maxY')?.maxY + @padding.right

		if @padding.stack? >= 0
			Utils.offsetY(@children, @padding.stack)
			Utils.delay 0, =>
				Utils.contain(@, false, @padding.right, @padding.bottom)
			return

		Utils.contain(@, false, @padding.right, @padding.bottom)


###
Increase or decrease a layer's size to contain its layer's children.

@param {Layer} layer The parent layer to change size.
@param {Boolean} fit Whether to limit size change to increase only.
@param {Number} paddingX Extra space to add to the right side of the new size.
@param {Number} paddingY Extra space to add to the bottom of the new size.

	Utils.contain(layerA)
###
Utils.contain = (layer, fit = false, paddingX = 0, paddingY = 0) ->
	return if layer.children.length is 0

	maxChildX = _.maxBy(layer.children, 'maxX')?.maxX + paddingX
	maxChildY = _.maxBy(layer.children, 'maxY')?.maxY + paddingY

	if fit
		layer.props = 
			width: Math.max(layer.width, maxChildX)
			height: Math.max(layer.height, maxChildY)
		return 

	layer.props = 
		width: maxChildX
		height: maxChildY

	return layer

# get a status color based on a standard deviation
# @example    Utils.getStatusColor(.04, false)
Utils.getStatusColor = (dev, lowerBetter = false) ->
	
	colors = ['#ec4741', '#f48847', '#ffc84a', '#a7c54b', '#4fbf4f']
	
	if lowerBetter then dev = -dev
	
	color = Utils.modulate(dev, [-.1, 0.1], [0, colors.length - 1], false)
	
	return colors[color.toFixed()]


# Chain an array of animations, optionally looping them
# @example    Utils.chainAnimations([arrayOfAnimations], false)
Utils.chainAnimations = (animations...) ->
	looping = true
	
	if typeof _.last(animations) is "boolean"
		looping = animations.pop()
	
	j = animations.length - 1
	for anim, i in animations
		do (i, animations) ->
			if anim is animations[j] and looping
				anim.onAnimationEnd ->
					animations[0]?.reset()
					Utils.delay 0, -> animations[0]?.start()
			
			anim.onAnimationEnd ->
				animations[i + 1]?.restart()
		
	Utils.delay 0, -> animations[0].restart()


# Check whether a point exists within a polygon, defined by an array of points
# Note: this replaces Framer's existing (but broken) Utils.pointInPolygon method.
# @example	Utils.pointInPolgygon({x: 2, y: 12}, [])
Utils.pointInPolygon = (point, vs = []) ->

	if vs[0].x? then vs = _.map vs, (p) -> [p.x, p.y]

	# determine whether to analyze points in counterclockwise order
	ccw = (A,B,C) -> return (C[1]-A[1])*(B[0]-A[0]) > (B[1]-A[1])*(C[0]-A[0])

	# determine whether two lines intersect
	intersect = (A,B,C,D) -> return (ccw(A,C,D) isnt ccw(B,C,D)) and (ccw(A,B,C) isnt ccw(A,B,D))
	
	inside = false
	i = 0
	j = vs.length - 1
	
	while i < vs.length
	
		if intersect([-999999, point.y], [point.x, point.y], vs[i], vs[j])
			inside = !inside
		j = i++
	
	return inside

# Checks whether a point is within a Layer's frame. Works best with event.contextPoint!
#
# @example	
#
# layer.onMouseMove (event) -> 
#	for buttonLayer in buttonLayers
#		print Utils.pointInLayer(buttonLayer)
#
Utils.pointInLayer = (point, layer) ->
	return Utils.pointInPolygon(point, Utils.pointsFromFrame(layer))


# Get the layer under a screen point. If multiple layers overlap, layers overlapped
# by their children will be ignored, and the layer with the highest index will be
# returned. Works best with event.contextPoint!
#
# @example	
#
# myLayer.onMouseMove (event) -> 
#	print Utils.getLayerAtPoint(event.contextPoint)
#
Utils.getLayerAtPoint = (point, array = Framer.CurrentContext._layers) ->
	under = Utils.getLayersAtPoint(event.point, array)
	
	valid = []

	for layer in under
		if _.intersection(under, layer.children).length > 0
			continue
		valid.push(layer)

	return _.maxBy(valid, 'index') ? null

# Get an array of all layers under a screen point. By default, it will check 
# all layers in the current Framer context; but you can specify your own array of
# layers instead. Works best with event.contextPoint!
#
# @example	
#
# myLayer.onMouseMove (event) -> 
#	print Utils.getLayersAtPoint(event.contextPoint)
#
Utils.getLayersAtPoint = (point, array = Framer.CurrentContext._layers) ->
	
	return array.filter (layer) -> Utils.pointInPolygon(point, Utils.pointsFromFrame(layer))
	

# Try to find the layer that owns a given HTML element. By default, it will check 
# all layers in the current Framer context; but you can specify your own array of
# layers instead.
#
# @example	
#
# document.addEventListener "mousemove", (event) -> 
#	print Utils.getLayerFromElement(event.target)
#
Utils.getLayerFromElement = (element, array = Framer.CurrentContext._layers) =>
	return if not element
	
	findLayerElement = (element) ->
		return if not element?.classList
		
		if element.classList.contains('framerLayer')
			return element
			
		findLayerElement(element.parentNode)
	
	layerElement = findLayerElement(element)
	return _.find(array, (l) -> l._element is layerElement) ? null

# Get an ordinal for a date
#
# @example	
#
# num = 2
# date.text = num + Utils.getOrdinal(num)
#
Utils.getOrdinal = (number) ->
	switch number % 10	
		when 1 then return 'st'	
		when 2 then return 'nd'	
		when 3 then return 'rd'	
		else return 'th'

# Convert a number to the right number of pixels.
#
# @example	
#
# layer._element.style.borderWidth = Utils.px(4)
#
Utils.px = (num) ->
	return (num * Framer.Device.context.scale) + 'px'

# Link layerB's property to always match layerA's property.
#
# @example	
#
# Utils.linkProperties(layerA, layerB, 'x')
#
Utils.linkProperties = (layerA, layerB, props...) ->
	props.forEach (prop) ->
		update = -> layerB[prop] = layerA[prop]
		layerA.on "change:#{prop}", update
		update()





# Copy text to the clipboard.
#
# @example
# Utils.copyTextToClipboard(myTextLayer.text)
#
Utils.copyTextToClipboard = (text) ->
	copyElement = document.createElement "textarea"
	copyElement.style.opacity = 0

	ctx = document.getElementsByClassName("framerContext")[0]
	ctx.appendChild(copyElement)

	copyElement.value = text
	copyElement.select()
	document.execCommand('copy')
	copyElement.blur()

	ctx.removeChild(copyElement)

# Run a URL through Framer's CORSproxy, to prevent cross-origin issues.
# Thanks to @marckrenn: https://goo.gl/UhFw9y
#
# @example
# fetch(Utils.CORSproxy(url)).then(callback)
#
Utils.CORSproxy = (url) ->

	# Detect local IPv4/IvP6 addresses
	# https://stackoverflow.com/a/11327345
	regexp = /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/

	if regexp.test(window.location.hostname)
		return "http://#{window.location.host}/_server/proxy/#{url}"
	
	return "https://cors-anywhere.herokuapp.com/#{url}"

# Set the attributes of a DOM element.
#
# @example
# Utils.setAttributes myHTMLInput, {autocorrect: 'off'}
#
Utils.setAttributes = (element, attributes = {}) ->
	for key, value of attributes
		element.setAttribute(key, value)

# Use inline styles with a TextLayer.
#
# @example
# myTextLayer.text = "This is a **bold** statement."
# Utils.toMarkdown(myTextLayer)
#
Utils.toMarkdown = (textLayer) ->
	
	if not textLayer instanceof TextLayer
		throw "Utils.toMarkdown only works with TextLayers."

	loopString = (string, reg) ->
		if not string.match(reg[0])
			return string 

		loopString(string.replace(reg[0], reg[1]), reg)

	regexes = [
		[/\[([^\[]+)\]\(([^\)]+)\)/, '<a href=\'$2\'>$1</a>']
		[/(\*\*|__)(.*?)\1/, '<b>$2</b>']
		[/(\*|_)(.*?)\1/, '<i>$2</i>']
		[/\~\~(.*?)\~\~/, '<del>$1</del>']
		[/`(.*?)`/, '<code>$1</code>']
		]

	for el in textLayer._element.children[1].childNodes
		el.childNodes[0].innerHTML = _.reduce(regexes, loopString, el.childNodes[0].innerHTML)
	
	do _.bind( ->
		forceRender = false
		@_updateHTMLScale()
		if not @autoSize
			if @width < @_elementHTML.clientWidth or @height < @_elementHTML.clientHeight
				@clip = true
		return unless forceRender or @autoHeight or @autoWidth or @textOverflow isnt null
		parentWidth = if @parent? then @parent.width else Screen.width
		constrainedWidth = if @autoWidth then parentWidth else @size.width
		padding = Utils.rectZero(Utils.parseRect(@padding))
		constrainedWidth -= (padding.left + padding.right)
		if @autoHeight
			constrainedHeight = null
		else
			constrainedHeight = @size.height - (padding.top + padding.bottom)
		constraints =
			width: constrainedWidth
			height: constrainedHeight
			multiplier: @context.pixelMultiplier

		calculatedSize = @_styledText.measure constraints
		@disableAutosizeUpdating = true
		if calculatedSize.width?
			@width = calculatedSize.width + padding.left + padding.right
		if calculatedSize.height?
			@height = calculatedSize.height + padding.top + padding.bottom
		@disableAutosizeUpdating = false
	, textLayer)
		
	textLayer.emit "change:text", textLayer.text, textLayer

# Make an asyncronous request
#
# @example Fetch and return a Response object.
#	Utils.fetch 'http://example.com/answer', (d) -> print d
#
# @param [String] url the url to fetch, returns a Response
# @param [Function] callback the callback to run with the returned data
#
Utils.fetch = (url, callback) ->
	unless url.includes 'cors-anywhere'
		url = Utils.CORSproxy(url)
	
	fetch(url, {'method': 'GET', 'mode': 'cors'}).then( callback )


# Make an asyncronous request and return JSON.
#
# @example Fetch and return a JSON object.
#	Utils.fetchJSON 'http://example.com/answer', (d) -> print d
#
# @param [String] url the url to fetch, returns JSON object
# @param [Function] callback the callback to run with the returned data
#
Utils.fetchJSON = (url, callback) ->
	unless url.includes 'cors-anywhere'
		url = Utils.CORSproxy(url)
	
	fetch(url, {'method': 'GET', 'mode': 'cors'}).then( 
		(r) -> r.json().then( callback )
		)


# Return a random text string.
#
# @example Generate plain text.
#	Utils.randomText(4) 
#	» "aut expedita aut fugit"
#
# @example Generate sentences.
#	Utils.randomText(4, true)
#	» "Soluta dolor tempore pariatur."
#
# @ param [Integer] words The number of words to return
# @ param [Boolean] [sentences] Whether to split the words into sentences
# @ param [Boolean] [paragraphs] Whether to split the words into paragraphs
#
Utils.randomText = (words = 12, sentences = false, paragraphs = false) ->
	text = Array.from({length: words}, -> _.sample(loremSource))

	unless sentences 
		return text.join(' ')

	if words <= 3
		return _.capitalize( _.sampleSize(text, 3).join(' ') ) + '.'

	# make sentences

	sentences = []

	while text.length > 0
		if text.length <= 3
			_.sample(sentences).push(text.pop())
			continue 

		length = _.clamp(_.random(3, 6), 0, text.length)
		sentences.push(_.pullAt(text, [0...length]))

	if sentences.length < 3
		paragraphs = false
	
	unless paragraphs
		return sentences.map( (a) ->
			_.capitalize( a.join(' ') ) + '.'
			).join(' ')

	# make paragraphs

	paragraphs = []

	while sentences.length > 0
		if sentences.length <= 3 and paragraphs.length > 0
			_.sample(paragraphs).push(sentences.pop())
			continue 

		length = _.clamp(_.random(3, 6), 0, sentences.length)
		paragraphs.push(_.pullAt(sentences, [0...length]))

	# Make text

	text = ''

	for paragraph in paragraphs
		text += _.reduce(
			paragraph,
			(string, sentence) ->
				string += _.capitalize( sentence.join(' ') ) + '. '
			'').trim() + '\n\n'

	return text.trim()

# Check whether a string is a valid email.
#
# @param {String} string The string to check.
Utils.isEmail = (string) ->
    return string.toLowerCase().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)


# Source words for Utils.randomText()
#
loremSource = ["alias", "consequatur", "aut", "perferendis", "sit",
"voluptatem", "accusantium", "doloremque", "aperiam", "eaque", "ipsa", "quae",
"ab", "illo", "inventore", "veritatis", "et", "quasi", "architecto", "beatae",
"vitae", "dicta", "sunt", "explicabo", "aspernatur", "aut", "odit", "aut",
"fugit", "sed", "quia", "consequuntur", "magni", "dolores", "eos", "qui",
"ratione", "voluptatem", "sequi", "nesciunt", "neque", "dolorem", "ipsum",
"quia", "dolor", "sit", "amet", "consectetur", "adipisci", "velit", "sed",
"quia", "non", "numquam", "eius", "modi", "tempora", "incidunt", "ut", "labore",
"et", "dolore", "magnam", "aliquam", "quaerat", "voluptatem", "ut", "enim",
"ad", "minima", "veniam", "quis", "nostrum", "exercitationem", "ullam",
"corporis", "nemo", "enim", "ipsam", "voluptatem", "quia", "voluptas", "sit",
"suscipit", "laboriosam", "nisi", "ut", "aliquid", "ex", "ea", "commodi",
"consequatur", "quis", "autem", "vel", "eum", "iure", "reprehenderit", "qui",
"in", "ea", "voluptate", "velit", "esse", "quam", "nihil", "molestiae", "et",
"iusto", "odio", "dignissimos", "ducimus", "qui", "blanditiis", "praesentium",
"laudantium", "totam", "rem", "voluptatum", "deleniti", "atque", "corrupti",
"quos", "dolores", "et", "quas", "molestias", "excepturi", "sint", "occaecati",
"cupiditate", "non", "provident", "sed", "ut", "perspiciatis", "unde", "omnis",
"iste", "natus", "error", "similique", "sunt", "in", "culpa", "qui", "officia",
"deserunt", "mollitia", "animi", "id", "est", "laborum", "et", "dolorum",
"fuga", "et", "harum", "quidem", "rerum", "facilis", "est", "et", "expedita",
"distinctio", "nam", "libero", "tempore", "cum", "soluta", "nobis", "est",
"eligendi", "optio", "cumque", "nihil", "impedit", "quo", "porro", "quisquam",
"est", "qui", "minus", "id", "quod", "maxime", "placeat", "facere", "possimus",
"omnis", "voluptas", "assumenda", "est", "omnis", "dolor", "repellendus",
"temporibus", "autem", "quibusdam", "et", "aut", "consequatur", "vel", "illum",
"qui", "dolorem", "eum", "fugiat", "quo", "voluptas", "nulla", "pariatur", "at",
"vero", "eos", "et", "accusamus", "officiis", "debitis", "aut", "rerum",
"necessitatibus", "saepe", "eveniet", "ut", "et", "voluptates", "repudiandae",
"sint", "et", "molestiae", "non", "recusandae", "itaque", "earum", "rerum",
"hic", "tenetur", "a", "sapiente", "delectus", "ut", "aut", "reiciendis",
"voluptatibus", "maiores", "doloribus", "asperiores", "repellat"]
