require 'components/moreutils'
theme = require 'components/Theme'
colors = require 'components/Colors'
typography = require 'components/Typography'
{ loadWebFonts } = require 'components/fontloader'
{ loadLocalFonts } = require 'components/fontloader'

colors.updateColors()

# disable hints
Framer.Extras.Hints.disable()

# get rid of dumb thing that blocks events in the upper left-hand corner
dumbthing = document.getElementById("FramerContextRoot-TouchEmulator")?.childNodes[0]
dumbthing?.style.width = "0px"

# require in everything else
{ Button } = require 'components/Button'
{ Radiobox } = require 'components/Radiobox'
{ Checkbox } = require 'components/Checkbox'
{ DocComponent } = require 'components/DocComponent'
{ Footer } = require 'components/Footer'
{ Header } = require 'components/Header'
{ Segment } = require 'components/Segment'
{ Toggle } = require 'components/Toggle'
{ Tooltip } = require 'components/Tooltip'
{ Icon } = require 'components/Icon'
{ Link } = require 'components/Link'
{ Separator } = require 'components/Separator'
{ Select } = require 'components/Select'
{ Stepper } = require 'components/Stepper'
{ TextInput } = require 'components/TextInput'
{ Template } = require 'components/Template'
{ View } = require 'components/View'
{ CarouselComponent } = require 'components/CarouselComponent'
{ PageTransitionComponent } = require 'components/PageTransitionComponent'
{ SortableComponent } = require 'components/SortableComponent'
{ TabComponent } = require 'components/TabComponent'
{ TransitionPage } = require 'components/PageTransitionComponent'

# Exports for theme support 
_.assign exports,
	defaultTitle: "www.framework.com"
	app: undefined
	components: [
		'Button', 
		'Header', 
		'Radiobox',
		'Checkbox',
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
		'TransitionPage', 
		'View',
		'Template',
		'CarouselComponent', 
		'SortableComponent'
		'PageTransitionComponent'
		'TabComponent'
		]
	theme: theme
	typography: typography
	colors: colors

# Add components to window
exports.components.forEach (componentName) ->
	window[componentName] = class FrameworkComponent extends eval(componentName)
		constructor: (options = {}) ->
			@app = exports.app
			super options


# ... and finally, the App class
class window.App extends FlowComponent
	constructor: (options = {}) ->

		exports.app = @

		_.defaults options,
			backgroundColor: white
			title: exports.defaultTitle
			chrome: 'ios'
			contentWidth: Screen.width
			showKeys: true
			perspective: 1000

		super options

		@_wrapLayer = (flowLayer) ->

			flowLayer._flowLayer = flowLayer

			return flowLayer if flowLayer instanceof ScrollComponent
			return flowLayer if flowLayer._flowWrapped

			# Make the layer at least match the device size
			flowLayer.width = Math.max(flowLayer.width, @width)
			flowLayer.height = Math.max(flowLayer.height, @height)

			size = @size
			# Save the parent so we can clean up when we re-wrap this layer
			if @ in flowLayer.ancestors()
				content = flowLayer?.parent
				scroll = content?.parent
				if scroll instanceof ScrollComponent
					previousWrappingScroll = scroll
					previousWrappingContent = content
			layer = layoutPage(flowLayer, size)
			layer = layoutScroll(layer, size)
			if flowLayer isnt layer and
			   previousWrappingContent?.children.length is 0 and
			   previousWrappingScroll?.children.length is 1 and
			   previousWrappingScroll?.children[0] is previousWrappingContent
				# we wrapped the layer
				previousWrappingScroll.destroy()

			# Mark the layer so we don't layout it twice'
			layer._flowLayer = flowLayer

			# Forward the scroll events from created scroll components
			for scroll in [layer, layer.children...]

				@_forwardScrollEvents(scroll)

				if scroll instanceof ScrollComponent
					inset = {}
					inset.top = @header?.height or 0 if scroll.y is 0
					inset.bottom = @footer?.height or 0 if scroll.maxY is @height
					scroll.contentInset = inset
					flowLayer._flowScroll = scroll

			# Set the background color for he created scroll component
			if layer instanceof ScrollComponent
				layer.backgroundColor = @backgroundColor

			return layer

		_.assign @,
			chrome: options.chrome
			showKeys: options.showKeys
			contentWidth: options.contentWidth
			_windowFrame: {}
			views: []

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
		
		# when transition starts, update the header
		@onTransitionStart @_updateHeader

		# when transition ends, reset the previous view
		@onTransitionEnd @_updatePrevious

		Screen.on Events.EdgeSwipeLeftEnd, @showPrevious

	# ---------------
	# Private Methods

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
			(response) =>
				new Promise( (resolve) => 
					Utils.bind( layer, -> layer.load(response) )
					resolve()
				)

			).then( =>
				# transition to new View
				if loadingTime?
					Utils.delay loadingTime, =>
						@_transitionToNext(layer, options)
					return

				@_transitionToNext(layer, options)
				)

	# show previous view
	showPrevious: (options={}) =>
		return unless @previous
		return if @isTransitioning

		# prepare to load

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
			(response) =>
				new Promise( (resolve) => 
					Utils.bind( layer, -> layer.load(response) )
					resolve()
				)

			).then( =>
				# transition to new View
				if loadingTime?
					Utils.delay loadingTime, =>
						@_transitionToPrevious(previous?.transition, options.animate, current, layer)
					return

				@_transitionToPrevious(previous?.transition, options.animate, current, layer)
				)

	getScreenshot: (layer, options = {}) =>
		unless @_isDomToImageLoaded?
			Utils.domLoadScript(
				"https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.js", 
				=> 
					@_isDomToImageLoaded = true
					@getScreenshot(layer, options)
				)
			return
		
		_.defaults options,
			layer: @
			name: "screenshot"
			type: "png"
			style:
				height: '100%'
				width: '100%'

		node = options.layer._element
		func = domtoimage['to' + _.startCase(options.type)]
		
		func(node, {cacheBust: true, style: options.style}).then( 
			(d) ->
				link = document.createElement('a')
				link.download = options.name + '.' + options.type
				link.href = d
				link.click()
		).catch( 
			(error) -> 
				throw "Screenshot failed."
			)
	
	@define "windowFrame",
		get: -> return @_windowFrame


	