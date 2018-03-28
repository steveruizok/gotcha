class exports.FormComponent extends Layer
	constructor: (options = {}) ->
		@__constructor = true
		
		_.defaults options,
			name: "Form Component"
			color: black
			backgroundColor: null
			x: 0
			height: 32
			width: Screen.width
			padding: {x: 16, y: 16}
			target: {}
			data: exampleData
			warn: false
			indicators: true
		
		super options
		
		_.assign @,
			indicators: options.indicators
			padding: options.padding
			target: options.target
			results: {}
			layers: []
			
		_.defaults @padding,
			x: 0
			y: 0
			bottom: 0
			top: 0

		@_createLayers()

		# EVENTS

		@on "change:size", =>
			return if @__building
			@_createLayers()
		
		# KICKOFF
		
		delete @__constructor
		
		_.assign @,
			warn: options.warn
			data: options.data


	
	# ###############
	# PRIVATE METHODS

	_createLayers: =>
		@__building = true

		layer.destroy() for layer in @children
		@layers = []

		startY = @padding.top
		
		_.forIn @data, (v, k) =>
		
			startX = -@padding.x
			
			_.forIn v, (input, key) =>
				
				_.defaults input,
					field: TextInput
					password: false
					placeholder: ""
					y: 0
					x: undefined
					label: undefined
					required: undefined
					width: undefined
					microText: undefined
					errorText: undefined
				
				label = undefined
				indicator = undefined
				layer = undefined
				micro = undefined
			
				# Label
				
				if input.label?
					label = new Label
						parent: @
						y: startY
						x: startX + @padding.x
						text: input.label
					
					# Indicator
					
					if input.required and @indicators
						indicator = new FormIndicator
							parent: label
							x: if input.label is "" then 0
											
				if key is '_label'
					layer = new Body2
						parent: @
						y: label?.maxY ? (startY + input.y)
						x: input.x ? (startX + @padding.x)
						text: input.text
						width: if input.width then @width * (input.width / 100)
					
					startX = layer.maxX
					if key is _.last(_.keys(v))
						startY = @padding.y + (if micro? then micro else layer).maxY
					
					return
					
				# Input
				
				layer = new input['field']
					parent: @
					x: input.x ? (startX + @padding.x)
					y: label?.maxY ? (startY + input.y)
					placeholder: input.placeholder
					options: input.options
					width: if input.width then @width * (input.width / 100)
					value: null
					password: input.password
					
				if input.label is "" then label?.x = layer.x + layer.width - 16
					
				# Microtext
				if input.microText? or input.errorText?
					micro = new Micro
						parent: @
						y: layer.maxY
						x: layer.x
						text: ""
						width: layer.width
				
				# set form data
				
				layer._formData =
					required: input.required
					referenceValue: key
					micro: micro
					indicator: indicator
					valid: undefined
					microText: input.microText
					errorText: input.errorText
				
				switch input['field']
					when Toggle 
						_.assign layer._formData,
							value: 'toggled'
							validation: input.validation ? (v) -> v?
					when TextInput 
						_.assign layer._formData,
							value: 'value'
							validation: input.validation ? (v) -> v? and v isnt ""
					when Select	 
						_.assign layer._formData,
							value: 'value'
							validation: input.validation ? (v) -> v? and v isnt ""
				
				# set listeners
				
				layer.on "change:#{layer._formData.value}", (v, layer) =>
					Utils.delay .2, =>
						if v is layer[layer._formData.value]
							@_updateStatus()
				
				# update positions
				startX = layer.maxX
				if key is _.last(_.keys(v))
					startY = @padding.y + (if micro? then micro else layer).maxY
				
				# add to layers
				
				@layers.push(layer)
		
		Utils.contain(@, true, 0, @padding.bottom)
		delete @__building

		@_updateLayers()
	

	_updateTarget: =>
		@layers.forEach (layer) =>
			_.set(
				@target, 
				layer._formData.referenceValue, 
				layer[layer._formData.value] ? null
				)
	
	
	_updateLayers: =>
		@layers.forEach (layer) =>
			targetValue = @target[layer._formData.referenceValue] ? null
			layer[layer._formData.value] = targetValue
	
	
	_updateStatus: =>
		@layers.forEach (layer) =>
			value = layer[layer._formData.value]
			valid = layer._formData.validation(value)

			empty = _.isUndefined(value) or value is ""
			
			layer._formData.valid = valid 
			layer._formData.indicator?.status = if valid then 'valid' else if @warn then 'warn' 
			
			layer._formData.micro?.text = if valid then "" else if empty then (layer._formData.microText ? "") else layer._formData.errorText
			layer._formData.micro?.color = if !valid and !empty and @warn then red else new Color(@color).alpha(.8)
		
		required = _.filter(@layers, (l) -> l._formData.required)
		matches = _.map(required, (l) -> l._formData.valid)
		
		@_complete = _.filter(matches).length is required.length
		
		@emit "change:complete", @complete, @
		@emit "change:status", @status, @
	
	
	# ###############
	# PUBLIC METHODS
	
	refresh: =>
		@_createLayers()
		@_updateLayers()
		@_updateStatus()
	
	post: =>
		@_updateTarget()
		return @target
	
	# ###############
	# DEFINITIONS
	
	@define "warn",
		get: -> return @_warn
		set: (bool) ->
			throw 'FormComponent.warn must be an boolean (true or false).' unless _.isBoolean(bool) 
			@_warn = bool
			return if @__constructor
			@_updateStatus()
	
	
	@define "complete",
		get: -> return @_complete
	
	
	@define "status",
		get: -> if @_complete then 'complete' else 'incomplete'
	
	
	@define "data",
		get: -> return @_data
		set: (data) ->
			throw 'FormComponent.data must be an object.' unless _.isObject(data) 
			return if @__constructor
			@_data = data
			@refresh()


# Form Indicator
class FormIndicator extends Icon
	constructor: (options = {}) ->

		parent = options.parent

		_.defaults options,
			name: "Indicator"
			x: Align.right(24)
			y: 8
			height: 16
			width: 16
			icon: 'checkbox-blank-circle-outline'
	
			status: undefined
	
		super options
	
		Utils.define @, "status", options.status, @_setStatus
	
	_setStatus: (status) =>
		switch status
			when "warn"
				_.assign @, 
					icon: 'checkbox-blank-circle-outline'
					color: red
					scale: .7
			when "valid"
				_.assign @, 
					icon: 'checkbox-marked-circle'
					color: blue
					scale: 1
			when "hidden"
				_.assign @, 
					icon: 'checkbox-blank-circle-outline'
					color: null
					scale: .7
			else
				_.assign @, 
					icon: 'checkbox-blank-circle-outline'
					color: blue
					scale: .7

exampleData = 
	0:
		name:
			label: "Name"
			field: TextInput
			placeholder: ""
			width: 100
			required: true
	1:
		email: 
			label: "Email address"
			field: TextInput
			placeholder: "you@email.com"
			width: 100
			required: true
			validation: Utils.isEmail
			microText: "Please enter a valid email address."
			errorText: "The email you've entered is not valid."
	2:
		_label:
			label: "Background"
			text: "Have you registered before?"
			width: 60
		verified:
			label: ""
			required: true
			field: Toggle
			options: ['No', 'Yes']
			errorText: "Please select."