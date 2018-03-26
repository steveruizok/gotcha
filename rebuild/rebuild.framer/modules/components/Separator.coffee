Theme = require "components/Theme"
theme = undefined

class exports.Separator extends Layer
	constructor: (options = {}) ->
		theme = Theme.theme
		@__constructor = true
		@__instancing = true

		# ---------------
		# Options
		
		_.defaults options,
			name: 'Separator'
			width: Screen.width
			height: 16
			backgroundColor: '#eee'
			clip: true
			shadowY: -1
			shadowColor: 'rgba(0,0,0,.41)'
	
		super options

		delete @__constructor
		delete @__instancing

		# ---------------
		# Cleanup
		
		child.name = '.' for child in @children unless options.showSublayers