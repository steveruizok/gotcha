class exports.Container extends Layer
	constructor: (options = {}) ->

		# ---------------
		# Options

		_.defaults options,
			name: 'Container'
			animationOptions:
				time: .2
				colorModel: 'rgb'
			height: 8
			width: 300
			backgroundColor: null

			padding: {}

		super options

		defaultPadding = _.assign(
			{
				top: 0, 
				bottom: 0, 
				left: 0, 
				right: 0, 
				stack: undefined
			}
			, options.padding)

		# ---------------
		# Properties

		# ---------------
		# Layers

		# ---------------
		# Cleanup
		
		# ---------------
		# Events

		@on "change:children", @_setPadding

		# ---------------
		# Definitions

		#				Property	Initial value 		Callback 		Validation		Error
		Utils.define @, 'padding', 	defaultPadding,		@_setPadding,	_.isObject,		'Container.padding must be an object.'
		


	# ---------------
	# Private Methods

	_setPadding: () =>
		for child, i in @children

			if i is 0
				child.y = _.max([@padding.top, child.y])

			child.x = _.max([@padding.left, child.x])

			if @padding.right? > 0
				paddedWidth = (@width - (@padding.right)) - @padding.left
				if child.x + child.width > paddedWidth
					child.width = paddedWidth

		unless _.isUndefined(@padding.stack)
			Utils.offsetY(@children, @padding.stack)

		Utils.delay 0, =>
			Utils.contain(@, true, @padding.right, @padding.bottom)


	# ---------------
	# Public Methods

	# updateContent: => @_setPadding()