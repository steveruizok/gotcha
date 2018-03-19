class exports.DocComponent extends Layer
	constructor: (options = {}) ->

		# ---------------
		# Options
		
		_.defaults options,
			name: "Documentation"
			width: Screen.width
			color: white
			# height: 128
			backgroundColor: black
			tabbed: true
			text: [
				"new Component"
				"status: {status}"
				]
			template: {}
		
		super options

		# ---------------
		# Layers
		
		if typeof options.text is 'string' then options.text = [options.text]
		

		copyBg = new Layer
			parent: @
			width: 40
			backgroundColor: black40

		Utils.constrain copyBg, 'height'


		@copyIcon = new Icon
			name: 'Copy Icon'
			parent: copyBg
			y: 14
			icon: 'content-copy'
			color: blue
		

		@copyLabel = new Label
			name: 'Copy Label'
			parent: copyBg
			y: @copyIcon.maxY
			width: copyBg.width
			textAlign: 'center'
			fontSize: 10
			text: 'COPY'
			color: blue
		
		@copyIcon.midX = @copyLabel.midX


		@codeBlock = new Code
			name: 'Label'
			parent: @
			padding: {top: 16, left: 56, bottom: 16}
			text: options.text.join(if options.tabbed then '\n\t' else '\n')
			color: @color
		
		Utils.toMarkdown(@codeBlock)
		

		template = {}
		formatter = {}
		
		_.entries(options.template).forEach (pair) =>
			key = pair[0]
			options = pair[1]
			layer = options[0]
			property = options[1]
			format = options[2]
			
			template[key] = layer[property] ? ''
			formatter[key] = format
			
			layer.onChange property, (value) =>
				@codeBlock.template = {"#{key}": value}
				@height = @codeBlock?.maxY + 16
				# Utils.contain(@children, true)


		@codeBlock.templateFormatter = formatter
		@codeBlock.template = template

		# ---------------
		# Cleanup
		
		child.name = '.' for child in @children unless options.showSublayers

		# ---------------
		# Definitions
			
		# ---------------
		# Events
		
		@copyIcon.onTap => 
			Utils.copyTextToClipboard(@codeBlock.text)
			
			@codeBlock.animate
				color: blue
				options: { time: .07 }
					
			Utils.delay .1, =>
				@codeBlock.animate
					color: @color
					options: { time: .5 }
					
		@height = @codeBlock?.maxY + 16