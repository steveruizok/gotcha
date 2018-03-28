require 'components/moreutils'
theme = require 'components/Theme'
colors = require 'components/Colors'
typography = require 'components/Typography'
Keyboard = require 'components/Keyboard'

colors.updateColors()

# disable hints
Framer.Extras.Hints.disable()

# get rid of dumb thing that blocks events in the upper left-hand corner
dumbthing = document.getElementById("FramerContextRoot-TouchEmulator")?.childNodes[0]
dumbthing?.style.width = "0px"

# Exports for theme support 
_.assign exports,
	defaultTitle: "www.framework.com"
	app: undefined
	components: [
		'Button', 
		'Footer'
		'Header', 
		'Radiobox',
		'Checkbox',
		'Container',
		'DocComponent',
		'Toggle',
		'Tooltip',
		'Select',
		'Icon', 
		'Stepper', 
		'Segment',
		'TextInput',
		'Link', 
		'Separator', 
		'View',
		'Template',
		'FormComponent'
		"ProgressComponent"
		'CarouselComponent', 
		'SortableComponent'
		'TabComponent'
		]
	theme: theme
	typography: typography
	colors: colors

# Add components to window
exports.components.forEach (componentName) ->
	mod = require "components/#{componentName}"
	component = mod[componentName]

	window[componentName] = class FrameworkComponent extends component
		constructor: (options = {}) ->
			@app = exports.app
			super options

# ... and finally, the App class
class window.App extends FlowComponent
	constructor: (options = {}) ->

		exports.app = @
		window.app = @

		_.defaults options,
			backgroundColor: white
			title: exports.defaultTitle
			chrome: 'ios'
			contentWidth: Screen.width
			showKeys: true
			perspective: 1000
			screenshot: true

		super options

		_.assign @,
			chrome: options.chrome
			showKeys: options.showKeys
			contentWidth: options.contentWidth
			_windowFrame: {}
			views: []
			keyboard: Keyboard
			preload: new Promise (resolve, reject) -> _.defer resolve
	

		# Transition
		 
		@_platformTransition = switch @chrome
			when "safari"
				@_safariTransition
			when "ios"
				@_iosTransition
			else
				@_safariTransition

		# layers

		@loadingLayer = new Layer 
			name: '.'
			size: Screen.size
			backgroundColor: if @chrome is "safari" then 'rgba(0,0,0,0)' else 'rgba(0,0,0,.14)'
			visible: false

		@loadingLayer._element.style["pointer-events"] = "all"
		@loadingLayer.sendToBack()

		# By this point, these should be different classes...
		unless @chrome is "safari"
			Utils.bind @loadingLayer, ->
				
				@loadingContainer = new Layer
					name: '.'
					parent: @
					x: Align.center()
					y: Align.center()
					size: 48
					backgroundColor: 'rgba(0,0,0,.64)'
					borderRadius: 8
					opacity: .8
					backgroundBlur: 30

				@iconLayer = new Icon 
					parent: @loadingContainer
					height: 32
					width: 32
					point: Align.center()
					style:
						lineHeight: 1
					color: white
					icon: "loading"

				anim = new Animation @iconLayer,
					rotation: 360
					options:
						curve: "linear"
						looping: true

				anim.start()


		# header

		if @chrome
			# don't show safari bar when opening this project on mobile web
			# ... but this might require a lot of app.header?.etc
			if @chrome is 'safari' and Utils.isSafari()
				@chrome = null

			@header = new Header
				app: @
				safari: @chrome is 'safari'
				title: options.title
		
			if @chrome is 'safari'
				@footer = new Footer 
					app: @

				@onSwipeUpEnd =>
					return unless @current.isMoving 

					@header._collapse()
					@footer._collapse()

				@onSwipeDownEnd =>
					return unless @current.isMoving

					@header._expand()
					@footer._expand()

		@header?.on "change:height", @_setWindowFrame
		@footer?.on "change:height", @_setWindowFrame

		@_setWindowFrame()

		# definitions
		Utils.define @, 'focused', 		null, 		@_showFocused,	_.isObject,		"App.focused must be an html element."
		Utils.define @, 'loading', 		false, 		@_showLoading, 	_.isBoolean,	"App.loading must be a boolean (true or false)."
		Utils.define @, 'viewPoint',	{x:0, y:0}, undefined,		_.isObject, 	'App.viewPoint must be an point object (e.g. {x: 0, y: 0}).'
		Utils.define @, 'chromeOpacity', options.chromeOpacity, @_setChromeOpacity, _.isNumber, "App.chromeOpacity must be a number between 0 and 1."

		# when transition starts, update the header
		@onTransitionStart @_updateHeader

		# when transition ends, reset the previous view
		@onTransitionEnd @_updatePrevious

		Screen.on Events.EdgeSwipeLeftEnd, @showPrevious

	# ---------------
	# Private Methods

	_setChromeOpacity: (num) =>
		num = _.clamp(num, 0, 1)
		for layer in [@header, @footer]
			continue if not layer
			layer.opacity = num

	_showFocused: (el) =>
		# possibly... an app state dealing with an on-screen keyboard
		return

	_safariTransition: (nav, layerA, layerB, overlay) =>
		options = {time: 0.01}
		transition =
			layerA:
				show: {options: options, x: Align.center(), brightness: 100, y: @windowFrame.y}
				hide: {options: options, x: Align.center(), brightness: 101, y: @windowFrame.y}
			layerB:
				show: {options: options, x: Align.center(), brightness: 100, y: @windowFrame.y}
				hide: {options: options, x: Align.center(), brightness: 101, y: @windowFrame.y}

	_iosTransition: (nav, layerA, layerB, overlay) =>
		options = {curve: "spring(300, 35, 0)"}
		transition =
			layerA:
				show: {options: options, x: Align.center(), y: @windowFrame.y}
				hide: {options: options, x: 0 - layerA?.width / 2, y: @windowFrame.y}
			layerB:
				show: {options: options, x: Align.center(), y: @windowFrame.y}
				hide: {options: options, x: @width + layerB.width / 2, y: @windowFrame.y}

	_defaultTransition: (nav, layerA, layerB, overlay) =>
		options = {curve: "spring(300, 35, 0)"}
		transition =
			layerA:
				show: {options: options, x: Align.center(), y: @windowFrame.y}
				hide: {options: options, x: 0 - layerA?.width / 2, y: @windowFrame.y}
			layerB:
				show: {options: options, x: Align.center(), y: @windowFrame.y}
				hide: {options: options, x: @width + layerB.width / 2, y: @windowFrame.y}

	_setWindowFrame: =>
		@_windowFrame = {
			y: (@header?.height ? 0)
			x: @x
			maxX: @maxX
			maxY: @height - (@footer?.height ? 0)
			height: @height - (@footer?.height ? 0) - (@header?.height ? 0)
			width: @width
			size: {
				height: @height - (@footer?.height ? 0) - (@header?.height ? 0)
				width: @width
			}
		}

		@emit "change:windowFrame", @_windowFrame, @

	_updateHeader: (prev, next, direction) =>
		# header changes
		return if not @header

		# update the header's 'viewKey' using the next View's 'key'
		if @showKeys then @header.viewKey = next?.key

		# is there a previous layer? (and is the next layer the initial layer?)
		hasPrevious = prev? and next isnt @_initial

		# safari changes
		if @header.safari
			@footer.hasPrevious = hasPrevious
			return

		# ios changes
		@header.backIcon.visible = hasPrevious
		@header.backText.visible = hasPrevious
		
		if next.title 
			@header.updateTitle(next.title)

	_showLoading: (bool) =>
		if bool
			@focused?.blur()
			@loadingLayer.visible = true
			@loadingLayer.bringToFront()

			# show safari loading
			if @chrome is "safari"
				@footer._expand()
				@header._expand()
				@header._showLoading(true)
				return

			# show ios loading
			return

		@loadingLayer.visible = false
		@loadingLayer.sendToBack()

		# show safari loading ended
		if @chrome is "safari"
			@footer._expand()
			@header._expand()
			@header._showLoading(false)
			return
	
	# Reset the previous View after transitioning
	_updatePrevious: (prev, next, direction) =>
		@isTransitioning = false
		return unless prev? and prev instanceof View

		prev.sendToBack()
		prev._unloadView(@, next, prev, direction)


	_transitionToNext: (layer, options) =>
		@loading = false
		@isTransitioning = false
		@transition(layer, @_platformTransition, options)


	_transitionToPrevious: (transition, animate, current, previous) =>
		@loading = false
		@isTransitioning = false
		@_runTransition(transition, "back", animate, current, previous)

		

	# ---------------
	# Public Methods
	
	# show next view
	showNext: (layer, loadingTime, options={}) ->
		return if @isTransitioning
		return if layer is @current

		# prepare to load

		try @header._expand()
		try @footer._expand()

		@_initial ?= true	

		if @chrome is "safari" and not @_initial 
			loadingTime ?= _.random(.5, .75)

		# prepare to load

		@focused?.blur()

		@isTransitioning = true

		Utils.delay .25, => @loading = @isTransitioning

		# preload the new View
		layer.preload.then(

			# load up the new View with the response data
			(response) => new Promise( 

				(resolve) => 
					Utils.bind( layer, -> 
						try 
							layer.load(response) 
						catch error
							console.error(error)
						)
					resolve(response)
		
			).then( 
				(response) =>
					layer.updateContent()
					
					Utils.delay 0, =>
						try 
							layer.postload(response)
						catch error
							console.error(error)

						# transition to new View
						if loadingTime?
							Utils.delay loadingTime, =>
								@_transitionToNext(layer, options)
							return

						@_transitionToNext(layer, options)
				
			).catch( (reason) -> throw new Error(reason) )
		).catch( (reason) -> throw new Error(reason) )

	# show previous view
	showPrevious: (options={}) =>
		return unless @previous
		return if @isTransitioning

		# prepare to load

		try @header._expand()
		try @footer._expand()

		@focused?.blur()

		@isTransitioning = true

		Utils.delay .25, => @loading = @isTransitioning

		# Maybe people (Jorn, Steve for sure) pass in a layer accidentally
		options = {} if options instanceof(Framer._Layer)
		options = _.defaults({}, options, {count: 1, animate: true})

		if options.count > 1
			count = options.count
			@showPrevious(animate: false, count: 1) for n in [2..count]

		previous = @_stack.pop()
		current = @current
		layer = current
		

		# force loading time on safari

		if @chrome is "safari"
			@loading = true
			loadingTime = _.random(.3, .75)

		# preload the new View
		layer.preload.then(

			# load up the new View with the response data
			(response) => new Promise( 

				(resolve) => 
					Utils.bind( layer, -> 
						try 
							layer.load(response) 
						catch error
							console.error(error)
						)
					resolve(response)
		
			).then( 
				(response) =>
					layer.updateContent()
					
					Utils.delay 0, =>
						try 
							layer.postload(response)
						catch error
							console.error(error)
							
						# transition to new View
						if loadingTime?
							Utils.delay loadingTime, =>
								@_transitionToPrevious(previous?.transition, options.animate, current, layer)
							return

						@_transitionToPrevious(previous?.transition, options.animate, current, layer)

			).catch( (reason) -> throw new Error(reason) )
		).catch( (reason) -> throw new Error(reason) )

	getScreenshot: (options = {}) =>
		return new Promise (resolve, reject) =>
				
			_.defaults options,
				layer: @
				name: "screenshot"
				type: "png"
				style:
					height: '100%'
					width: '100%'

			load = new Promise (rs, rj) ->
				if @_isDomToImageLoaded?
					rs()
					return
			
				domtoimageCDN = "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js"

				Utils.domLoadScript domtoimageCDN, => 
					@_isDomToImageLoaded = true
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
					resolve()
				).catch (error) -> 
					console.log(error)
			)

	screenshotViews: (views, options = {}) =>
		i = 0
			
		loadNext = =>
			view = views[i]
			return if not view

			@showNext(view)
			i++
			
		@onTransitionEnd =>
			Utils.delay 2.5, =>
				o = _.clone(options)
				o.name = @current?.key
				@getScreenshot(o).then loadNext
		
		loadNext()
	
	@define "windowFrame",
		get: -> return @_windowFrame


	