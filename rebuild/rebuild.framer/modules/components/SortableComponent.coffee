Theme = require "components/Theme"
theme = undefined

class exports.SortableComponent extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options
		
		_.defaults options,
			name: 'Sortable Component'
			defaultState: 
				scale: 1
				shadowY: 0
				shadowBlur: 0
			draggingState: 
				scale: 1.07
				shadowY: 2
				shadowBlur: 16
			animationOptions:
				time: .31
			clip: false
			closeGaps: true
		
		super options
		
		_.assign @,
			positions: []
			closeGaps: options.closeGaps
			defaultState: options.defaultState
			draggingState: options.draggingState


		# ---------------
		# Layers


		# ---------------
		# Events
			
		@on "change:children", @_updateChildren
		@_context.on "layer:destroy", @_checkForLostChildren


		# ---------------
		# Definitions

		delete @__constructor
		delete @__instancing


	# ---------------
	# Private Methods
		
	_checkForLostChildren: (layer) =>
		if layer.parent is @
			@emit "change:children", {added: [], removed: [layer]}
	

	_updateChildren: (layers) =>
		# scrub up layers that were removed as children
		@_removeEvents(layer) for layer in layers.removed

		if @closeGaps and layers.removed.length > 0 and @positions.length > 0
			_.last(@children).once Events.AnimationEnd, @_makePositions
			
			for child, i in @children
				child._takePosition(@positions[i])
			return
		
		Utils.delay 0, @_makePositions
		
	
	_makePositions: =>
		# make positions based on current child arrangements
		@positions = _.map @children, (layer, i) =>
		
			position =
				index: i
				layer: layer
				midY: layer.midY
		
			layer.position = position
			
			@_setEvents(layer)
				
			return position

		@emit "change:current", @current, @
	

	_setEvents: (layer) =>
		# skip if this layer already has suffered the treatment
		return if layer._hasSortableEvents

		# assign layer states
		layer.states =
			default: @defaultState
			dragging: @draggingState
		
		# switch to default state
		layer.stateSwitch('default')
		
		# pass on own animation options as defaults
		_.defaults layer.animationOptions, @animationOptions

		# enable draggable
		_.assign layer.draggable,
			enabled: true
			momentum: false
			horizontal: false
			propagateEvents: false
		
		# give layer a "take position" property
		layer._takePosition = ( position, animate = true ) ->	

			@position = position
			position.layer = @
			if animate
				@animate { midY: position.midY }
		
		# pass events
		layer.on Events.DragStart, @_startSearch
		layer.on Events.Drag, @_duringSearch
		layer.on Events.DragEnd, @_endSearch

		layer.handle?.on Events.Tap, (event) -> event.stopPropagation()
		
		# make a note that this layer has already been treated
		layer._hasSortableEvents = true


	# clear events when a layer is lost as a child
	_removeEvents: (layer) ->
		delete layer._takePosition
		delete layer._hasSortableEvents
		
		layer.off Events.TouchStart, @_startSearch
		layer.off Events.Drag, @_duringSearch
		layer.off Events.DragEnd, @_endSearch
		

	# when the user starts dragging...
	_startSearch: (event) ->
		return if @handle? and not Utils.pointInLayer(event.point, @handle)

		@_isSorting = true
		@bringToFront()
		@animate "dragging"
	

	# while the user is dragging...
	_duringSearch: ->
		if not @_isSorting
			@midY = @position.midY
			return

		above = @parent.positions[ @position.index + 1 ]
		below = @parent.positions[ @position.index - 1 ]

		if below?.midY < @midY < above?.midY
			return 

		if @midY > above?.midY
			above.layer._takePosition( @position, true )
			@_takePosition( above, false )
			
		else if @midY < below?.midY
			below.layer._takePosition( @position, true )
			@_takePosition( below, false )
	
	
	# ... and when the user ends the drag
	_endSearch: ->
		return if not @_isSorting

		delete @_isSorting

		_.defer =>
			@_takePosition(@position)
			@animate 'default'
			@parent.emit "change:current", @parent.current, @parent


	# ---------------
	# Public Methods


	# ---------------
	# Special Definitions

	@define "current",
		get: -> return @positions.map (p) -> return p.layer
