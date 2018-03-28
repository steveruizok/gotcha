# Circular Progress

class exports.ProgressComponent extends Layer
	
	constructor: (options={}) ->
		@__instancing = true
		
		_.defaults options,
			borderRadius: '50%'
			clip: true
			backgroundColor: null
			strokeWidth: 8
			progressColor: blue
			railsColor: grey40
			strokeLinecap: 'round'
			min: 0
			max: 100
			value: 42
			
		super options
		
		@rails = new SVGLayer 
			parent: @
			size: @size
			svg: "<svg><circle name='rails' id='rails' cx='#{@width / 2}' cy='#{@width / 2}' r='#{@width / 2}'></svg>"
			strokeWidth: 4
			stroke: "red"
			fill: "none"
		
		@circle = new SVGLayer 
			parent: @
			size: @size
			svg: "<svg><circle name='circle' id='circle' cx='#{@width / 2}' cy='#{@width / 2}' r='#{@width / 2}'></svg>"
			strokeWidth: 4
			stroke: "#000"
			fill: "none"
		
		@elements =
			rails: @rails.svg.childNodes[0]
			circle: @circle.svg.childNodes[0]

		Utils.define @, "min", options.min, @_setProgress
		Utils.define @, "max", options.max, @_setProgress
		Utils.define @, "value", null, @_setProgress
		Utils.define @, "progressColor", options.progressColor, @_setSVGs
		Utils.define @, "railsColor", options.railsColor, @_setSVGs
		Utils.define @, "strokeWidth", options.strokeWidth, @_setSVGs
		Utils.define @, "strokeLinecap", options.strokeLinecap, @_setSVGs
		
		@on("change:size", @_setSize)
		
		delete @__instancing
		
		@_setSVGs()
		@_setSize()

		@value = options.value
		
	_setSVGs: =>
		return if @__instancing

		[@elements.circle, @elements.rails].forEach (svg) =>
			Utils.setAttributes svg,
				'stroke-width': @strokeWidth
				'stroke-linecap': @strokeLinecap

		Utils.setAttributes @elements.circle,
			stroke: @progressColor
		
		Utils.setAttributes @elements.rails,
			stroke: @railsColor
	
	_setSize: =>
		return if @__instancing

		[@elements.circle, @elements.rails].forEach (svg) =>
			Utils.setAttributes svg,
				'r': @width / 2
				'cx': @width / 2
				'cy': @width / 2
	
	_setProgress: (value) =>
		return if @__instancing
		
		radius = @width / 2
		progress = _.clamp(@value / @max, 0, 1)
		circum = (radius * Math.PI * 2)

		Utils.setAttributes @elements.circle,
			"stroke-dasharray": circum
			"stroke-dashoffset": (1 - progress) * circum
			'transform': "rotate(-90 #{radius} #{radius})"