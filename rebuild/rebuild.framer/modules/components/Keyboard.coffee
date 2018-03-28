# Capture keyboard events

keyHandlers = {}
enabled = false

enable = ->
	window.addEventListener 'keydown', (event) ->
		event.preventDefault() if exports.preventDefault 
		try keyHandlers[event.key]()

	enabled = true

_.assign exports,
	on: (key, handler, throttleTime) ->
		enable() unless enabled
		keyHandlers[key] = Utils.throttle throttleTime, handler

	off: (key, handler, throttleTime) ->
		enable() unless enabled
		delete keyHandlers[key]

	printKey: (event) -> print event.key

	preventDefault: false