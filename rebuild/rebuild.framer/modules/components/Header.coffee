Theme = require "components/Theme"
theme = undefined

class exports.Header extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options

		_.defaults options,
			title: ' '
			viewKey: ' '
		
		_.assign options,
			width: Screen.width
			height: 72
			shadowY: 1
			shadowBlur: 6
			shadowColor: 'rgba(0,0,0,.16)'
			backgroundColor: "rgba(255, 255, 255, 1)"

			name: 'Header'

		_.assign @,
			safari: options.safari
			app: options.app
		
		super options

		# ---------------
		# Layers

		if options.safari
			_.assign @,
				height: 64
				backgroundColor: '#FFF'#if Utils.isChrome() then '#FFF' else 'rgba(255,255,255,.65)'
				# backgroundBlur: 30
				shadowBlur: 0
		
		@statusBar = new Layer
			name: unless options.showLayers then '.' else 'Status Bar'
			parent: @
			height: 20
			width: @width
			backgroundColor: 'null'
			
		Utils.build @statusBar, ->
			@leftContent = new Layer
				name: unless options.showLayers then '.' else 'left'
				parent: @
				x: 8
				y: Align.center(3)
				width: 57
				height: 15
				html: leftContent
				backgroundColor: null
				style:
					lineHeight: '0px'
			

			@rightContent = new Layer
				name: unless options.showLayers then '.' else 'right'
				parent: @
				x: Align.right(-8)
				y: Align.center(3)
				width: 72
				height: 15
				html: rightContent
				backgroundColor: null
				style:
					lineHeight: '0px'
				

			@timeLayer = new TextLayer
				name: unless options.showLayers then '.' else 'time'
				parent: @
				width: @width
				y: Align.center(1)
				fontFamily: "Helvetica Neue"
				fontSize: 12
				fontWeight: 500
				letterSpacing: 0.3
				textAlign: "center"
				color: '#000'
				text: new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})
				

			@viewKeyLayer = new TextLayer
				parent: @
				y: Align.center(1)
				x: 52
				fontFamily: "Helvetica Neue"
				fontSize: 12
				fontWeight: 500
				letterSpacing: 0.3
				color: '#000'
				text: "{viewKey}"
				

		if @app.chrome is "safari"

			@addressContainer = new Layer
				name: unless options.showLayers then '.' else 'Address'
				parent: @
				width: @width - 20
				height: 29
				x: Align.center()
				y: Align.center(10)
				borderRadius: 8
				backgroundColor: 'rgba(0,0,0,.09)'
				clip: true

			@refreshIcon = new Icon
				name: unless options.showLayers then '.' else 'Menu Icon'
				parent: @addressContainer
				y: Align.center(1)
				x: Align.right(-6)
				icon: 'refresh'
				rotation: -45
				color: '#333'
				height: 18
				width: 18

			@refreshIcon.onTap -> window.location.reload()

			@loadingLayer = new Layer
				name: '.'
				parent: @addressContainer
				x: 0
				y: Align.bottom()
				height: 2
				width: 1
				backgroundColor: "#007AFF"
				visible: false
		
			@urlLayer = new TextLayer
				name: unless options.showLayers then '.' else 'Title'
				parent: @addressContainer
				y: Align.center()
				width: @addressContainer.width
				textAlign: 'center'
				text: ' '
				fontFamily: "Helvetica Neue"
				fontSize: 15
				fontWeight: 400
				color: '#000'

			# store props for expand

			@_expandProps =
				height: @height
				addressContainer:
					y: @addressContainer.y
					backgroundColor: @addressContainer.backgroundColor

		else
		
			@titleLayer = new TextLayer
				name: unless options.showLayers then '.' else 'Title'
				parent: @
				y: Align.center(10)
				fontSize: 16
				fontFamily: "Helvetica"
				color: "#000"
				width: Screen.width
				textAlign: 'center'
				text: ' '
			
			@backIcon = new Icon
				name: unless options.showLayers then '.' else 'Back Icon'
				parent: @
				y: Align.center(12)
				x: 8
				icon: 'ios-back'
				visible: false

			@backText = new TextLayer
				name: unless options.showLayers then '.' else 'Back Text'
				parent: @
				y: Align.center(10)
				x: @backIcon.maxX
				fontSize: 16
				fontFamily: "Helvetica"
				color: "#000"
				visible: false
				text: 'Back'
				
			# @menuIcon = new Icon
			# 	name: unless options.showLayers then '.' else 'Menu Icon'
			# 	parent: @
			# 	y: Align.center(10)
			# 	x: Align.right(if options.safari then -16 else -8)
			# 	icon: 'dots-vertical'
			# 	rotation: 90

			@hitArea = new Layer
				name: unless options.showLayers then '.' else 'Hit Area'
				parent: @
				height: @height - 20
				width: @width / 3
				x: 0
				y: 20
				backgroundColor: null

			# events
			
			@hitArea.onTouchEnd @_showPrevious

		# update time
		@_setTime()
		
		# ... and update time every sixty seconds
		Utils.delay (60 - new Date().getSeconds()), =>
			@_setTime()
			Utils.interval 60, @_setTime

		# ---------------
		# Definitions
		
		delete @__constructor
			
		Utils.define @, 'title', options.title, @_setTitle, _.isString, 'View.title must be a string.'
		Utils.define @, 'viewKey', options.viewKey, @_setViewKey

		delete @__instancing
		
		# ---------------
		# Events

		@on "change:color", => 
			Utils.align @children,
				color: @color

		# ---------------
		# Cleanup

		if not options.showSublayers then child.name = '.' for child in @children

	# ---------------
	# Private Methods

	_showLoading: (bool, time) =>
		if bool
			# loading is true
			_.assign @loadingLayer,
				width: 1
				visible: true

			@loadingLayer.animate
				width: @addressContainer.width
				options:
					time: time ? 2
					curve: "linear"
			return

		# loading is false
		_.assign @loadingLayer,
			width: 1
			visible: false


	_setViewKey: (value) =>
		@statusBar.viewKeyLayer.template = value ? ''


	_setTime: =>
		d = new Date()
		@statusBar.timeLayer.text = d.toLocaleTimeString(['en-US'], {hour: 'numeric', minute: '2-digit'})


	_showPrevious: =>
		return if not @backIcon.visible
		@app.showPrevious()


	_setTitle: (value) =>

		if @app.chrome is "safari"
			value = _.truncate(value, {length: 28})
			@urlLayer.text = value
			return

		value = _.truncate(value, {length: 22})
		@titleLayer.text = value


	_collapse: =>
		if @app.chrome isnt "safari"
			return

		options = {time: .25}

		@animate
			height: 40
			options: options

		@addressContainer.animate
			y: 15
			backgroundColor: 'rgba(0,0,0,0)'
			options: options

		@refreshIcon.animate
			opacity: 0
			options: options

		@urlLayer.animate
			scale: .75
			options: options


	_expand: =>
		if @app.chrome isnt "safari"
			return

		options = {time: .25}

		@animate
			height: @_expandProps.height
			options: options

		@addressContainer.animate
			y: @_expandProps.addressContainer.y
			backgroundColor: @_expandProps.addressContainer.backgroundColor
			options: options

		@refreshIcon.animate
			opacity: 1
			options: options

		@urlLayer.animate
			scale: 1
			options: options

	# ---------------
	# Public Methods


	updateTitle: (title) =>
		if @app.chrome is "safari"
			return

		@titleLayer.animateStop()
		
		do (title) =>
			@titleLayer.once Events.AnimationEnd, =>
				@title = title
				
				@titleLayer.animate
					opacity: 1
					options:
						time: .3
						delay: .15
	
		@titleLayer.animate
			opacity: 0
			options:
				time: .2

	# ---------------
	# Special Definitions


leftContent = """<svg width="57px" height="11px" viewBox="0 0 57 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-6.000000, -5.000000)">
		<g transform="translate(6.000000, 3.000000)">
			<path d="M1,7.5 L2,7.5 C2.55228475,7.5 3,7.94771525 3,8.5 L3,11 C3,11.5522847 2.55228475,12 2,12 L1,12 C0.44771525,12 6.76353751e-17,11.5522847 0,11 L0,8.5 C-6.76353751e-17,7.94771525 0.44771525,7.5 1,7.5 Z M5.5,6 L6.5,6 C7.05228475,6 7.5,6.44771525 7.5,7 L7.5,11 C7.5,11.5522847 7.05228475,12 6.5,12 L5.5,12 C4.94771525,12 4.5,11.5522847 4.5,11 L4.5,7 C4.5,6.44771525 4.94771525,6 5.5,6 Z M10,4 L11,4 C11.5522847,4 12,4.44771525 12,5 L12,11 C12,11.5522847 11.5522847,12 11,12 L10,12 C9.44771525,12 9,11.5522847 9,11 L9,5 C9,4.44771525 9.44771525,4 10,4 Z M14.5,2 L15.5,2 C16.0522847,2 16.5,2.44771525 16.5,3 L16.5,11 C16.5,11.5522847 16.0522847,12 15.5,12 L14.5,12 C13.9477153,12 13.5,11.5522847 13.5,11 L13.5,3 C13.5,2.44771525 13.9477153,2 14.5,2 Z" id="Mobile-Signal" fill="#000000"></path>
		</g>
		<g transform="translate(-15, 3)">
			<path d="M42,4.82956276 C43.8767533,3.07441257 46.398124,2 49.1704372,2 C51.9427505,2 54.4641212,3.07441257 56.3408745,4.82956276 L54.9256756,6.24476162 C53.4116936,4.85107918 51.3904555,4 49.1704372,4 C46.9504189,4 44.9291808,4.85107918 43.4151989,6.24476162 L42,4.82956276 Z M44.4769681,7.30653087 C45.7185598,6.18377399 47.3646465,5.5 49.1704372,5.5 C50.976228,5.5 52.6223147,6.18377399 53.8639064,7.30653087 L52.4471757,8.72326155 C51.5696364,7.96124278 50.4239013,7.5 49.1704372,7.5 C47.9169731,7.5 46.7712381,7.96124278 45.8936988,8.72326155 L44.4769681,7.30653087 Z M46.9581461,9.78770884 C47.5610912,9.29532392 48.3312759,9 49.1704372,9 C50.0095985,9 50.7797832,9.29532392 51.3827284,9.78770884 L49.1704372,12 L46.9581461,9.78770884 Z" id="Wifi" fill="#000000"></path>
		</g>
	</g>
</svg>"""

rightContent = """
<svg width="72px" height="12px" viewBox="0 0 72 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-298.000000, -4.000000)">
		<g transform="translate(298.000000, 3.000000)">
			<g transform="translate(9.000000, 0.000000)">
				<g transform="translate(36.000000, 1.500000)">
					<path d="M3.2048565,0.5 C2.26431807,0.5 1.89540921,0.571239588 1.5147423,0.774822479 C1.19446913,0.946106445 0.946106445,1.19446913 0.774822479,1.5147423 C0.571239588,1.89540921 0.5,2.26431807 0.5,3.2048565 L0.5,8.2951435 C0.5,9.23568193 0.571239588,9.60459079 0.774822479,9.9852577 C0.946106445,10.3055309 1.19446913,10.5538936 1.5147423,10.7251775 C1.89540921,10.9287604 2.26431807,11 3.2048565,11 L22.0738202,11 C22.8614775,11 23.5,10.3614775 23.5,9.57382015 L23.5,3.2048565 C23.5,2.26431807 23.4287604,1.89540921 23.2251775,1.5147423 C23.0538936,1.19446913 22.8055309,0.946106445 22.4852577,0.774822479 C22.1045908,0.571239588 21.7356819,0.5 20.7951435,0.5 L3.2048565,0.5 Z" id="Border" stroke="#000000" opacity="0.400000006"></path>
					<path d="M25,4 C25.8626136,4.2220214 26.5,5.00507154 26.5,5.93699126 C26.5,6.86891097 25.8626136,7.65196112 25,7.87398251 L25,4 Z" id="Nub" fill="#000000" opacity="0.400000006"></path>
					<rect fill="#000000" x="2" y="2" width="20" height="7.5" rx="0.5"></rect>
				</g>
				<text font-family="Arial" font-size="12" font-weight="normal" fill="#030303">
					<tspan x="2.85351562" y="11.5">100%</tspan>
				</text>
			</g>
			<polyline stroke="#000000" points="0.5 4 6.5 9.5 3.5 12 3.5 2 6.5 4.5 0.5 10"></polyline>
		</g>
	</g>
</svg>
"""