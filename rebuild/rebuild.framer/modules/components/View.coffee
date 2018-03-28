Theme = require "components/Theme"
theme = undefined

class exports.View extends ScrollComponent
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			backgroundColor: '#FFF'
			contentInset:
				bottom: 64
				
			padding: {}
			title: ''
			key: null
			clip: false
			preserveContent: false
			oneoff: false

		_.assign options,
			width: @app.contentWidth
			height: @app.windowFrame.height
			scrollHorizontal: false

		super options

		@key = options.key

		# ---------------
		# Layers

		@app.views.push(@)
		@content.backgroundColor = @backgroundColor
		@sendToBack()

		# ---------------
		# Definitions
		
		delete @__constructor

		preload = new Promise( (resolve) -> resolve() )
		
		isPromise = (value) -> _.isObject(value) and _.isFunction(value.then)
		
		# 				Property			Initial value 			Callback 	Validation		Error
		Utils.define @, 'title', 			options.title, 			undefined, 	_.isString, 	'View.title must be a string.'
		Utils.define @, 'padding',			options.padding, 		undefined, 	_.isObject, 	'View.padding must be an object.'
		Utils.define @, 'oneoff', 			options.oneoff, 		undefined, 	_.isBoolean, 	'View.oneoff must be a boolean (true or false).'
		Utils.define @, 'preserveContent', options.preserveContent, undefined,	_.isBoolean, 	'View.preserveContent must be a boolean (true or false).'
		Utils.define @, 'load', 			undefined, 				undefined,	_.isFunction, 	'View.load must be a Function.'
		Utils.define @, 'preload', 			preload, 				undefined, 	isPromise, 		'View.preload must be a Promise.'
		Utils.define @, 'unload', 			undefined, 				undefined, 	_.isFunction, 	'View.unload must be a Function.'
		Utils.define @, 'postload', 		undefined, 				undefined, 	_.isFunction, 	'View.unload must be a Function.'
		
		delete @__instancing

		# unless padding is specifically null, set padding defaults
		if @padding?
			_.defaults @padding,
				left: 0,
				right: 0,
				top: 32,

		# ---------------
		# Events
		
		@content.on "change:children", @_fitChildrenToPadding

		@content.on "change:point", (value) =>
			return unless @app.current is @
			@app.viewPoint = {x: -@content.x, y: -@content.y}


	# ---------------
	# Private Methods

			
	_fitChildrenToPadding: (children) =>
		return if not @padding

		w = @width - @padding.right - @padding.left

		for child in children.added
			if child.x < @padding.left then child.x = @padding.left
			if child.y < @padding.top then child.y = @padding.top
			if child.width > w 
				Utils.delay 0, -> child.width = w

	
	_unloadView: (app, next, prev, direction) =>
		try @unload(app, next, prev, direction)
		
		return if @preserveContent

		@app.modal?.destroy()
		child.destroy() for child in _.without(@children, @content)
		child.destroy() for child in @content.children

		@updateContent()

		if @oneoff and direction is 'back'
			@destroy()
			return

	# ---------------
	# Public Methods
	
	pad: (left = 16, right = 16) =>
		width = @width - (right + left)

		for layer in @content.children
			x = layer.x ? 0
			maxX = layer.maxX ? (x + layer.width)

			layer.width = Math.min(width, layer.width)
			
			if maxX > (@width - right)
				layer.x = Align.right(-right)

			layer.x = Math.max(left, x)


	refresh: (loadingTime) =>
		loadingTime ?= _.random(.3, .5)

		@app.loading = true
		
		Utils.delay loadingTime, => 
			@_unloadView()
			@app.showNext(@)

	
	onPreload: (callback) =>
		@preload = new Promise callback

	
	onLoad: (callback) =>
		@load = callback

	
	onPostload: (callback) =>
		@postload = callback

	
	onUnload: (callback) -> 
		@unload = callback

	
	# ---------------
	# Special Definitions