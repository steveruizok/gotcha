require 'framework'
require "gotcha"

app = new App

# View

view = new View
	contentInset:
		bottom: 128

view.onLoad ->

	for i in _.range(3)
		container = new Layer
			name: "Container"
			parent: @content
			backgroundColor: null
		
		label = new Label
			name: "Label"
			parent: container
			text: "Label for this photo"
			
		new Layer
			name: "Photo"
# 			image: Utils.randomImage()
			parent: container
			width: @width - 32
			
		Utils.offsetY(container.children)
		Utils.contain(container)
	
	Utils.offsetY(@content.children, 32)

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
