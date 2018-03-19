Theme = require "components/Theme"
theme = undefined


class PageTransitionComponent extends PageComponent
	constructor: (options = {}) ->
		theme = Theme.theme
		
		_.defaults options,
			direction: 'bottom'
			originY: 0
		
		super options

		
		# -----------------
		# Settings
		
		_.assign @,
			edge: options.direction
			velocityThreshold: 2.5
		
		_.assign @content.draggable,
			momentum: true
			momentumOptions:
				friction: 6
				tolerance: 100
		
		# Desktop options
		# enabled when the device is not a touch device
		
		# @mouseWheelEnabled = Utils.isTouch() 
		# if @mouseWheelEnabled
		# 	_.assign @content.draggable, 
		# 		enabled: false
		#
		# breaks mobile

		# remove default listeners
		@content.off(Events.DragSessionEnd, @_scrollEnd)
		
		# -----------------
		# definitions
		
		Utils.define @, 'transitioning', false
		
		# -----------------
		# Events
		
		@onScrollEnd @_checkGestureEnd
		
		@content.on "change:y", @_setChildLayerFactors
		
		# timer for checking interstitial deadpoints
		
		@timer = undefined
		
		@time = 0
		
		@timer = Utils.interval .016, =>
			@time += .016
			if @time >= .15
				@content.animateStop()
				@time = 0
				@_checkScrollEnd()
	
	
	# A custom function for handling flick gestures, where a scroll's velocity
	# is high enough to suggest a page change intent. Since pages can be taller
	# than the window, this dynamically sets originY depending on the direction
	_checkGestureEnd: (event) =>
		return if @mouseWheelEnabled
	

		# if we have an event, a gesture just ended. New question is:
		# was that gesture fast enough to suggest a page change intent?
		
		# If it's fast for a page turn, it's a page change intent
		if Math.abs(event.velocity.y) > @velocityThreshold
			if event.offsetDirection is "up" and @nextPage('down')?
				@originY = 0
				@snapToNextPage("down")

			else if @nextPage('up')?
				@originY = 0
				@snapToNextPage("up")
				# @originY = 0 # should this snap to the top on swipe up?

			return
	
	
	# Every .2 seconds, run this function to check whether a scroll
	# ended in a transition (between two pages)
	_checkScrollEnd: (event) =>
		transitioning = _.some(@content.children, 'transitioning')
		# if we're still in the page, or if the content is still scrolling
		# do nothing and behave like a scroll
		return if @isMoving or not transitioning or @content.draggable.isDragging
			
		# if we're between pages and the content isnt moving...
		
		# if the current page is just a little out of bounds,
		# snap either to the top or bottom of the current page, 
		# depending on which edge is out of bounds
		
		yCloseEnough = @scrollY < @currentPage.y < (@scrollY + @height * .2)
		maxYCloseEnough = (@scrollY + @height * .8) < @currentPage.maxY < @scrollMaxY
		
		# snap to the top of the current page
		if yCloseEnough
			@originY = 0
			@snapToPage(@currentPage)
			return true
	
		# snap to the bottom of the current page
		if maxYCloseEnough
			@originY = 1
			@snapToPage(@currentPage)
			return true
		
		# If we're too far to stay, move back a page or down a page, 
		# depending on where the current page's edges are
		
		yInside = @scrollY < @currentPage.y < @scrollMaxY
		maxYInside = @scrollY < @currentPage.maxY < @scrollMaxY
		
		if yInside and not yCloseEnough
			@originY = 1
			@snapToNextPage("up")
		else if maxYInside and not maxYCloseEnough
			@originY = 0
			@snapToNextPage("down")


		
		# if nothing's close enough... do nothing
		# (but something should be close enough)
		return false

	
	# Set a factor for each child layer:
	# 0, layer is out of the window (higher up in the scroll)
	# 0-1, layer's progress into the current window
	# 1-2, layer's progress within the current window
	# 2-3, layer's progress out of the current window
	# 3, layer is out of the window (lower down in the scroll)
	
	# This factor can be used to set listeners (layer.on "change:factor")
	# that control how a layer (and any other layers) appear as a 
	# given layer is scrolled
	
	_setChildLayerFactors: =>
			# reset interval time
			@time = 0
			
			@scrollMidY = @scrollY + (@height/2)
			@scrollMaxY = @scrollY + @height
			
			# set child factors
			for layer in @content.children

				# edge relationships
				yBelow = layer.y > @scrollMaxY
				yAbove = layer.y < @scrollY
				yInside = @scrollY <= layer.y < @scrollMaxY
				maxYAbove = layer.maxY < @scrollY
				maxYInside = @scrollY < layer.maxY < @scrollMaxY
				maxYBelow = layer.maxY > @scrollMaxY

				# if layer.name is 'special'
				# 	print 'y: ' + layer.y + ' maxY: ' + layer.maxY
				# 	print 'y + scrollY: ' + (layer.y + @scrollY)
				# 	print 'scrollY: ' + @scrollY + ' scrollMaxY: ' + @scrollMaxY
				# 	print layer.factor

				# entering
				if yInside and maxYBelow
					layer.transitioning = true
					layer.factor = Utils.modulate(
						layer.y,
						[@scrollMidY, @scrollY]
						[0, 1]
					)
				# inside
				else if yAbove and maxYBelow
					layer.transitioning = false
					layer.factor = Utils.modulate(
						@scrollY,
						[layer.y, layer.maxY - @height]
						[1, 2]
					)
				# exiting
				else if maxYInside and yAbove
					layer.transitioning = true
					layer.factor = Utils.modulate(
						layer.maxY,
						[@scrollMaxY, @scrollMidY]
						[2, 3]
					)
				else if maxYAbove
					layer.transitioning = false
					layer.factor = 3
				else if yBelow
					layer.factor = 0
					layer.transitioning = false

	# add a TransitionPage to this component
	newPage: (options = {}) =>
		_.defaults options,
			width: @width
			height: @height * 2
			
		page = new TransitionPage(options)
		
		@addPage(page, options.direction ? @edge)
			
		return page


# Transition Page

class TransitionPage extends Layer
	constructor: (options = {}) ->
		
		_.defaults options,
			grid: false
		
		super options

		@transitionStates = {}
		
		# layers
		
		if options.grid
			Utils.delay .5, =>
				lines = Math.floor(@height / 100)
				for i in _.range(lines)

					y = i * (@height / lines)
						
					label = new TextLayer
						name: '.'
						parent: @
						fontSize: 12
						padding: {left: 8, right: 8}
						textAlign: 'center'
						color: '#000'
						text: (@y + y).toFixed()


					line = new Layer
						name: '.'
						parent: @
						height: 1
						x: label.maxX
						width: @width - label.width
						backgroundColor: '#000'

					label.midY = y
					line.midY = y
		
		# definition
		
		Utils.define @, 'factor', 0, @setFactor
		
		# events
		
	
	setFactor: (factor) =>
		for layerName, props of @transitionStates
			layer = Layer.select(layerName)
			start = Math.floor(factor % 3)
			end = start + 1
			newProps = {}

			for prop, array of props
				if factor <= 0
					newProps[prop] = array[0]
					continue
				if factor >= 3
					newProps[prop] = array[3]
					continue

				newProps[prop] = Utils.modulate(
					factor, 
					[start, end], 
					[array[start], array[end]],
					true
					)

			layer.props = newProps




# setFactorProps = (props = {}, startF, endF) ->
# 	do (props) =>
# 		@on "change:factor", (factor) ->
# 			# have manual factor values been provided?
# 			if startF? and endF?
# 				for k, v of props
# 					@[k] = Utils.modulate (factor), [startF, endF], [v[0], v[1]], true
# 				return
			
# 			# get the correct factorProps.points to modulate between
# 			start = Math.floor(factor % 3)
# 			end = start + 1
			
# 			# modulate just between 0 and 1, regardless of factor
# 			modf = factor % 1
			
# 			for k, v of props
# 				@[k] = Utils.modulate (modf), [0, 1], [v[start], v[end]], true


exports.TransitionPage = TransitionPage
exports.PageTransitionComponent = PageTransitionComponent