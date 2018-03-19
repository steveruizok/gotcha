Theme = require "components/Theme"

{ Link } = require 'components/Link'
framework = require 'framework'

updateTypography = () ->
	theme = Theme.theme

	for className, style of theme.typography
		do (className, style) =>

			window[className] = class FrameworkComponent extends TextLayer 
				constructor: (options = {}) ->
					@app = framework.app

					theme = Theme.theme 

					defaults = _.defaults(_.clone(theme.typography[className]), theme.typography[style.style])
					_.defaults options, defaults

					super options

			window[className + 'Link'] = class FrameworkComponent extends Link 
				constructor: (options = {}) ->
					@app = framework.app

					theme = Theme.theme 

					defaults = _.defaults(_.clone(theme.typography[className]), theme.typography[style.style])
					_.defaults options, defaults

					super options

exports.updateTypography = updateTypography
updateTypography()