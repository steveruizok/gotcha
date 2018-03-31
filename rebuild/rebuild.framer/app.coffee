require 'framework'
require "gotcha"

app = new App

# View

view = new View
	name: "View"
	key: "0.0.0"
	contentInset:
		bottom: 128

view.onLoad ->

	for i in _.range(10)
		container = new Container
			name: "Container"
			parent: @content
			width: @width - 32
			backgroundColor: null
		
		Utils.bind container, ->
			
			label = new Label
				parent: @
				name: "Label"
				text: "Label for these photos"
				
			pic0 = new Layer
				parent: container
				name: "Photo Left"
				y: label.maxY
				image: Utils.randomImage()
				width: (@width - 16) / 2
				
			pic1 = new Layer
				parent: container
				name: "Photo Right"
				y: label.maxY
				x: pic0.maxX + 16
				image: Utils.randomImage()
				width: (@width - 16) / 2
				
			animationThing = new Layer
				name: "Animation Thing"
				parent: container
				size: 32
				point: 40
				
			spin = new Animation animationThing,
				rotation: 360
				scale: 1.2
				options:
					curve: "linear"
					looping: true
					time: 10
				
			change = new Animation animationThing,
				backgroundColor: blue
				options:
					looping: true
					time: 10
			
			
			spin.start()
			change.start()
	
view.onPostload ->
	Utils.delay 0, =>
		@pad()
		Utils.stack(@content.children, 32)
		@updateContent()
	
# 	footerContainer = new Layer
# 		parent: @
# 		y: Align.bottom()
# 		width: @width
# 		height: 96
# 		backgroundColor: white
# 	
# 	# Screenshot FAB
# 	
# 	screenshotFab = new Layer
# 		parent: @
# 		size: 64
# 		borderRadius: "50%"
# 		x: 16
# 		y: Align.bottom(-16)
# 		backgroundColor: white
# 		borderWidth: 4
# 		borderColor: grey30
# 	
# 	new Icon
# 		parent: screenshotFab
# 		x: Align.center(4)
# 		y: Align.center(-2)
# 		icon: "camera"
# 		color: black
# 	
# 	label = new Label
# 		parent: screenshotFab
# 		text: "View"
# 		x: Align.center(4)
# 		y: Align.bottom(5)
# 	
# 	# Screenshot FAB
# 	
# 	screenshotFab1 = new Layer
# 		parent: @
# 		size: 64
# 		borderRadius: "50%"
# 		x: Align.right(-16)
# 		y: Align.bottom(-16)
# 		backgroundColor: white
# 		borderWidth: 4
# 		borderColor: grey30
# 	
# 	new Icon
# 		parent: screenshotFab1
# 		x: Align.center(4)
# 		y: Align.center(-2)
# 		icon: "camera"
# 		color: black
# 	
# 	label = new Label
# 		parent: screenshotFab1
# 		text: "App"
# 		x: Align.center(4)
# 		y: Align.bottom(5)
# 		
# 	# Type Selector
# 	
# 	screenshotTypeSelect = new Segment
# 		parent: @
# 		y: Align.bottom(-24)
# 		options: [
# 			'png'
# 			'jpeg'
# 		]
# 		
# 	screenshotTypeSelect.x = Align.center()
# 
# 	# events
# 	
# 	screenshotFab.onTap =>
# 		app.getScreenshot
# 			layer: @
# 			type: screenshotTypeSelect.value
# 	
# 	screenshotFab1.onTap =>
# 		app.getScreenshot
# 			type: screenshotTypeSelect.value

app.showNext(view)