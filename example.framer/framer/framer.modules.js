require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecBox, SpecColorValueBox, SpecDivider, SpecDropdownBox, SpecElement, SpecLabel, SpecPanel, SpecValueBox, SpecWideValueBox, ctx, gotcha, panel, ref, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

svgContext = void 0;

ctx = void 0;

startOpen = false;

if ((ref = document.getElementsByClassName('DevicePhone')[0]) != null) {
  ref.classList.add('IgnorePointerEvents');
}

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n.SpecSelectable {\n	cursor: pointer;\n	-webkit-box-sizing: border-box;\n	-moz-box-sizing: border-box;\n	box-sizing: border-box;\n}\n\n.SpecSelectable:hover {\n	outline: 1px solid rgba(72, 207, 255, 1.000) !important;\n}\n\n.SpecSelectable:active {\n	outline: 1px solid rgba(255, 1, 255, 1.000) !important;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n\n.mememeLink {\n	opacity: .4;\n}\n\n.mememeLink:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}\n\n.dropdown {\n	opacity: 0;\n}");

panel = document.createElement('div');

panel.id = 'SpecContainer';

viewC = document.getElementById('FramerContextRoot-Default');

Utils.delay(0, (function(_this) {
  return function() {
    return viewC.appendChild(panel);
  };
})(this));

secretBox = document.createElement('input');

document.body.appendChild(secretBox);


/*
	 ,-.  .   ,  ,-.  ,-.         .           .
	(   ` |  /  /    /            |           |
	 `-.  | /   | -. |    ,-. ;-. |-  ,-. . , |-
	.   ) |/    \  | \    | | | | |   |-'  X  |
	 `-'  '      `-'  `-' `-' ' ' `-' `-' ' ` `-'
 */

SVGContext = (function() {
  function SVGContext(options) {
    var setAttributes, svgNS;
    if (options == null) {
      options = {};
    }
    this.removeAll = bind(this.removeAll, this);
    this.setContext = bind(this.setContext, this);
    this.__constructor = true;
    this.shapes = [];
    svgContext = this;
    svgNS = "http://www.w3.org/2000/svg";
    setAttributes = function(element, attributes) {
      var key, results, value;
      if (attributes == null) {
        attributes = {};
      }
      results = [];
      for (key in attributes) {
        value = attributes[key];
        results.push(element.setAttribute(key, value));
      }
      return results;
    };
    this.svg = document.createElementNS(svgNS, 'svg');
    document.body.appendChild(this.svg);
    this.svg.style['z-index'] = '999';
    this.frameElement = Framer.Device.screenBackground._element;
    this.setContext();
    this.svgDefs = document.createElementNS(svgNS, 'defs');
    this.svg.appendChild(this.svgDefs);
    delete this.__constructor;
  }

  SVGContext.prototype.setAttributes = function(element, attributes) {
    var key, results, value;
    if (attributes == null) {
      attributes = {};
    }
    results = [];
    for (key in attributes) {
      value = attributes[key];
      results.push(element.setAttribute(key, value));
    }
    return results;
  };

  SVGContext.prototype.setContext = function() {
    var sFrame;
    this.lFrame = this.frameElement.getBoundingClientRect();
    _.assign(this, {
      width: this.lFrame.width.toFixed(),
      height: this.lFrame.height.toFixed(),
      x: this.lFrame.left.toFixed(),
      y: this.lFrame.top.toFixed()
    });
    this.screenElement = document.getElementsByClassName('framerContext')[0];
    sFrame = this.screenElement.getBoundingClientRect();
    this.setAttributes(this.svg, {
      x: 0,
      y: 0,
      width: sFrame.width,
      height: sFrame.height,
      viewBox: "0 0 " + sFrame.width + " " + sFrame.height
    });
    return _.assign(this.svg.style, {
      position: "absolute",
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    });
  };

  SVGContext.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    return this.showShape(shape);
  };

  SVGContext.prototype.removeShape = function(shape) {
    this.hideShape(shape);
    return _.pull(this.shapes, shape);
  };

  SVGContext.prototype.hideShape = function(shape) {
    return this.svg.removeChild(shape.element);
  };

  SVGContext.prototype.showShape = function(shape) {
    return this.svg.appendChild(shape.element);
  };

  SVGContext.prototype.addDef = function(def) {
    return this.svgDefs.appendChild(def);
  };

  SVGContext.prototype.removeAll = function() {
    var j, len, ref1, shape;
    ref1 = this.shapes;
    for (j = 0, len = ref1.length; j < len; j++) {
      shape = ref1[j];
      this.svg.removeChild(shape.element);
    }
    return this.shapes = [];
  };

  return SVGContext;

})();


/*
	 ,-.  .   ,  ,-.  ,-.  .                                                                                                                             . ;-.
	(   ` |  /  /    (   ` |                                                                                                                             | |  )
	 `-.  | /   | -.  `-.  |-. ,-: ;-. ,-.                                                                                                             ,-| |-'
	.   ) |/    \  | .   ) | | | | | | |-'                                                                                                             | | |
	 `-'  '      `-'  `-'  ' ' `-` |-' `-'                                                                                                             `-' '
	                               '
 */

SVGShape = (function() {
  function SVGShape(options) {
    var key, value;
    if (options == null) {
      options = {
        type: 'circle'
      };
    }
    this.setAttribute = bind(this.setAttribute, this);
    this.__constructor = true;
    this.parent = svgContext;
    this.element = document.createElementNS("http://www.w3.org/2000/svg", options.type);
    this.setCustomProperty('text', 'textContent', 'textContent', options.text);
    for (key in options) {
      value = options[key];
      this.setAttribute(key, value);
    }
    this.parent.addShape(this);
    this.show();
  }

  SVGShape.prototype.setAttribute = function(key, value) {
    if (key === 'text') {
      return;
    }
    if (this[key] == null) {
      Object.defineProperty(this, key, {
        get: (function(_this) {
          return function() {
            return _this.element.getAttribute(key);
          };
        })(this),
        set: (function(_this) {
          return function(value) {
            return _this.element.setAttribute(key, value);
          };
        })(this)
      });
    }
    return this[key] = value;
  };

  SVGShape.prototype.setCustomProperty = function(variableName, returnValue, setValue, startValue) {
    Object.defineProperty(this, variableName, {
      get: function() {
        return returnValue;
      },
      set: function(value) {
        return this.element[setValue] = value;
      }
    });
    return this[variableName] = startValue;
  };

  SVGShape.prototype.hide = function() {
    return this.parent.hideShape(this);
  };

  SVGShape.prototype.show = function() {
    return this.parent.showShape(this);
  };

  SVGShape.prototype.remove = function() {
    return this.parent.removeShape(this);
  };

  return SVGShape;

})();

DashedLine = (function(superClass) {
  extend(DashedLine, superClass);

  function DashedLine(pointA, pointB, color, offset, options) {
    if (color == null) {
      color = '#000';
    }
    if (offset == null) {
      offset = 0;
    }
    if (options == null) {
      options = {};
    }
    _.assign(options, {
      type: 'path',
      d: "M " + pointA.x + " " + pointA.y + " L " + pointB.x + " " + pointB.y,
      stroke: color,
      'stroke-width': '1px',
      'stroke-dasharray': "5, 5",
      'stroke-dashoffset': offset
    });
    DashedLine.__super__.constructor.call(this, options);
  }

  return DashedLine;

})(SVGShape);

ctx = new SVGContext;


/*
	 ,-.              ,--. .                   .
	(   `             |    |                   |
	 `-.  ;-. ,-. ,-. |-   | ,-. ;-.-. ,-. ;-. |-
	.   ) | | |-' |   |    | |-' | | | |-' | | |
	 `-'  |-' `-' `-' `--' ' `-' ' ' ' `-' ' ' `-'
	      '
 */

SpecElement = (function() {
  function SpecElement(className, options, text) {
    if (options == null) {
      options = {};
    }
    this.element = document.createElement('div');
    this.element.classList.add(className);
    this.element.classList.add('SpecElement');
    _.assign(this.element.style, options);
    panel.appendChild(this.element);
    this.rootElement = this.element;
  }

  return SpecElement;

})();


/*
	 ,-.              ,        .       .
	(   `             |        |       |
	 `-.  ;-. ,-. ,-. |    ,-: |-. ,-. |
	.   ) | | |-' |   |    | | | | |-' |
	 `-'  |-' `-' `-' `--' `-` `-' `-' '
	      '
 */

SpecLabel = (function(superClass) {
  extend(SpecLabel, superClass);

  function SpecLabel(options) {
    var ref1, ref2, ref3, ref4, ref5, ref6;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      'position': 'absolute',
      'top': '8px',
      'background-color': 'none',
      'font-family': 'Helvetica Neue',
      'font-size': '1em',
      'font-weight': '400',
      'color': 'rgba(136, 136, 136, 1.000)'
    });
    SpecLabel.__super__.constructor.call(this, 'SpecLabel', options);
    this.textLayer = new SpecElement('SpecLabel', {
      'font-family': (ref1 = options['font-family']) != null ? ref1 : 'Helvetica Neue',
      'font-size': (ref2 = options['font-size']) != null ? ref2 : '1em',
      'font-weight': (ref3 = options['font-weight']) != null ? ref3 : '500',
      'color': (ref4 = options['color']) != null ? ref4 : 'rgba(136, 136, 136, 1.000)',
      'left': options.left,
      'right': options.right
    });
    this.element.appendChild(this.textLayer.element);
    if ((ref5 = options.parent) != null) {
      ref5.appendChild(this.element);
    }
    Object.defineProperty(this, 'text', {
      get: function() {
        return this.textLayer.element.textContent;
      },
      set: function(value) {
        if (typeof value === 'number') {
          value = value.toFixed();
        }
        return this.textLayer.element.textContent = value;
      }
    });
    this.text = (ref6 = options.text) != null ? ref6 : '';
  }

  return SpecLabel;

})(SpecElement);


/*
	 ,-.              ,-.            .
	(   `             |  \ o     o   |
	 `-.  ;-. ,-. ,-. |  | . . , . ,-| ,-. ;-.
	.   ) | | |-' |   |  / | |/  | | | |-' |
	 `-'  |-' `-' `-' `-'  ' '   ' `-' `-' '
	      '
 */

SpecDivider = (function(superClass) {
  extend(SpecDivider, superClass);

  function SpecDivider(options) {
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      'position': 'absolute',
      'top': '8px',
      'left': '8px',
      'width': '208px',
      'height': '1px',
      'background-color': '#000',
      'border': '.5px solid #000',
      'border-radius': '2px',
      'box-sizing': 'border-box'
    });
    SpecDivider.__super__.constructor.call(this, 'SpecDivider', options);
  }

  return SpecDivider;

})(SpecElement);


/*
	 ,-.              ,-.
	(   `             |  )
	 `-.  ;-. ,-. ,-. |-<  ,-. . ,
	.   ) | | |-' |   |  ) | |  X
	 `-'  |-' `-' `-' `-'  `-' ' `
	      '
 */

SpecBox = (function(superClass) {
  extend(SpecBox, superClass);

  function SpecBox(options) {
    if (options == null) {
      options = {};
    }
    _.assign(this, {
      value: void 0
    });
    _.defaults(options, {
      'position': 'absolute',
      'top': '8px',
      'left': '96px',
      'width': '64px',
      'height': '24px',
      'background-color': 'rgba(41, 41, 41, 1.000)',
      'border': '.5px solid #000',
      'border-radius': '2px',
      'box-sizing': 'border-box',
      'box-shadow': 'inset 0px 0px 0px 4px rgba(41, 41, 41, 1.000)'
    });
    SpecBox.__super__.constructor.call(this, 'SpecLabel', options);
  }

  return SpecBox;

})(SpecElement);


/*

	 ,-.               ,-.     .         .   ,     .         ,-.
	(   `             /        |         |  /      |         |  )
	 `-.  ;-. ,-. ,-. |    ,-. | ,-. ;-. | /   ,-: | . . ,-. |-<  ,-. . ,
	.   ) | | |-' |   \    | | | | | |   |/    | | | | | |-' |  ) | |  X
	 `-'  |-' `-' `-'  `-' `-' ' `-' '   '     `-` ' `-` `-' `-'  `-' ' `
	      '
 */

SpecColorValueBox = (function(superClass) {
  extend(SpecColorValueBox, superClass);

  function SpecColorValueBox(options) {
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      'position': 'absolute',
      'top': '8px',
      'left': '96px',
      'width': '64px',
      'height': '24px',
      'background-color': 'rgba(41, 41, 41, 1.000)',
      'border': '.5px solid #000',
      'border-radius': '2px',
      'box-sizing': 'border-box',
      'box-shadow': 'inset 0px 0px 0px 4px rgba(41, 41, 41, 1.000)'
    });
    SpecColorValueBox.__super__.constructor.call(this, options);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: (function(_this) {
        return function(value) {
          _this._value = value;
          _this.element.style['background-color'] = value != null ? value : 'rgba(41, 41, 41, 1.000)';
          if ((value != null) && value !== '') {
            if (_this.element.classList.contains('SpecSelectable')) {
              return;
            }
            return _this.element.classList.add('SpecSelectable');
          } else if (_this.element.classList.contains('SpecSelectable')) {
            return _this.element.classList.remove('SpecSelectable');
          }
        };
      })(this)
    });
    this.value = options.value;
  }

  return SpecColorValueBox;

})(SpecBox);


/*
	 ,-.              .   ,     .         ,-.
	(   `             |  /      |         |  )
	 `-.  ;-. ,-. ,-. | /   ,-: | . . ,-. |-<  ,-. . ,
	.   ) | | |-' |   |/    | | | | | |-' |  ) | |  X
	 `-'  |-' `-' `-' '     `-` ' `-` `-' `-'  `-' ' `
	      '
 */

SpecValueBox = (function(superClass) {
  extend(SpecValueBox, superClass);

  function SpecValueBox(options) {
    var ref1, ref2, ref3;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      'font-family': 'Helvetica Neue',
      'font-size': '.42em',
      'padding-top': '5px',
      'padding-left': '8px',
      'box-sizing': 'border-box',
      'line-height': '1em',
      'overflow': 'hidden'
    });
    SpecValueBox.__super__.constructor.call(this, options);
    this.valueLabel = new SpecLabel({
      text: (ref1 = options.text) != null ? ref1 : '',
      parent: this.element,
      'font-size': '1em',
      'left': '6px',
      'top': '6px',
      'color': '#FFF',
      'font-weight': '500'
    });
    this.unitLabel = new SpecLabel({
      text: (ref2 = options.unit) != null ? ref2 : '',
      parent: this.element,
      'font-size': '.9em',
      'right': '2px',
      'top': '6px',
      'text-align': 'right'
    });
    Object.defineProperty(this, 'value', {
      get: function() {
        return this.valueLabel.element.textContent;
      },
      set: function(value) {
        this._value = value;
        this.valueLabel.element.textContent = value;
        if ((value != null) && value !== '') {
          if (this.element.classList.contains('SpecSelectable')) {
            return;
          }
          return this.element.classList.add('SpecSelectable');
        } else if (this.element.classList.contains('SpecSelectable')) {
          return this.element.classList.remove('SpecSelectable');
        }
      }
    });
    this.value = (ref3 = options.value) != null ? ref3 : '';
  }

  return SpecValueBox;

})(SpecBox);


/*
	 ,-.              ,   .     .     .   ,     .         ,-.
	(   `             | . | o   |     |  /      |         |  )
	 `-.  ;-. ,-. ,-. | ) ) . ,-| ,-. | /   ,-: | . . ,-. |-<  ,-. . ,
	.   ) | | |-' |   |/|/  | | | |-' |/    | | | | | |-' |  ) | |  X
	 `-'  |-' `-' `-' ' '   ' `-' `-' '     `-` ' `-` `-' `-'  `-' ' `
	      '
 */

SpecWideValueBox = (function(superClass) {
  extend(SpecWideValueBox, superClass);

  function SpecWideValueBox(options) {
    if (options == null) {
      options = {};
    }
    SpecWideValueBox.__super__.constructor.call(this, options);
    this.element.style.width = '136px';
  }

  return SpecWideValueBox;

})(SpecValueBox);

SpecDropdownBox = (function(superClass) {
  extend(SpecDropdownBox, superClass);

  function SpecDropdownBox(options) {
    var i, j, len, o, option, ref1;
    if (options == null) {
      options = {};
    }
    this.setSelectValue = bind(this.setSelectValue, this);
    _.defaults(options, {
      options: [
        {
          name: 'Blue',
          value: 'blue'
        }, {
          name: 'Red',
          value: 'red'
        }, {
          name: 'Green',
          value: 'green'
        }
      ],
      callback: function(value) {
        return null;
      },
      selected: 0
    });
    SpecDropdownBox.__super__.constructor.call(this, options);
    this.callback = options.callback;
    this.element.style.width = '136px';
    this.select = document.createElement('select');
    this.select.classList.add('dropdown');
    this.element.appendChild(this.select);
    this.select.onchange = this.setSelectValue;
    ref1 = options.options;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      option = ref1[i];
      o = document.createElement('option');
      o.value = option.value;
      o.label = option.name;
      o.innerHTML = o.name;
      this.select.appendChild(o);
      if (i === options.selected) {
        o.selected = true;
        this.value = this.select.options[this.select.selectedIndex].label;
      }
    }
  }

  SpecDropdownBox.prototype.setSelectValue = function() {
    this.value = this.select.options[this.select.selectedIndex].label;
    return _.bind(this.callback, this.select)();
  };

  return SpecDropdownBox;

})(SpecWideValueBox);


/*
	.d88888b                              888888ba                             dP
	88.    "'                             88    `8b                            88
	`Y88888b. 88d888b. .d8888b. .d8888b. a88aaaa8P' .d8888b. 88d888b. .d8888b. 88
	      `8b 88'  `88 88ooood8 88'  `""  88        88'  `88 88'  `88 88ooood8 88
	d8'   .8P 88.  .88 88.  ... 88.  ...  88        88.  .88 88    88 88.  ... 88
	 Y88888P  88Y888P' `88888P' `88888P'  dP        `88888P8 dP    dP `88888P' dP
	          88
	          dP
 */

SpecPanel = (function() {
  function SpecPanel() {
    this.setTextStyles = bind(this.setTextStyles, this);
    this.clearProps = bind(this.clearProps, this);
    this.highlight = bind(this.highlight, this);
    this.copyContent = bind(this.copyContent, this);
    var col0x, col1x, col2x, colorProps, currentKey, deviceOptions, element, j, k, key, len, len1, len2, n, prop, props, ref1, ref2, row, value;
    this.panel = panel;
    this._props = {};
    this.frame = this.panel.getBoundingClientRect();
    Object.defineProperty(this, 'props', {
      get: function() {
        return this._props;
      },
      set: function(obj) {
        var key, results, value;
        results = [];
        for (key in obj) {
          value = obj[key];
          if (_.has(this.props, key)) {
            results.push(this.props[key] = value);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    });
    this.panel.style.opacity = startOpen ? '1' : '0';
    col0x = '4px';
    col1x = '84px';
    col2x = '156px';
    row = function(num, offset) {
      if (offset == null) {
        offset = 0;
      }
      return (16 + (35 * num) - offset) + 'px';
    };
    this.deviceLabel = new SpecLabel({
      top: row(0),
      left: col0x,
      text: 'Device',
      'font-size': '.65em'
    });
    deviceOptions = [];
    currentKey = void 0;
    ref1 = Framer.DeviceComponent.Devices;
    for (key in ref1) {
      value = ref1[key];
      if (_.endsWith(key, 'hand')) {
        continue;
      }
      if (value.minStudioVersion == null) {
        continue;
      }
      if (Utils.framerStudioVersion() > value.maxStudioVersion) {
        continue;
      }
      if (Utils.framerStudioVersion() < value.minStudioVersion) {
        continue;
      }
      deviceOptions.push({
        name: key,
        value: value
      });
      if (key === Framer.Device.deviceType) {
        currentKey = _.indexOf(_.keys(Framer.DeviceComponent.Devices), key);
      }
    }
    this.deviceSelect = new SpecDropdownBox({
      top: row(0),
      left: col1x,
      options: _.uniq(deviceOptions),
      selected: currentKey,
      callback: function(event) {
        var device, screenBg, selected;
        device = deviceOptions[this.selectedIndex];
        selected = this.options[this.selectedIndex];
        screenBg = Screen.backgroundColor;
        Framer.Device.deviceType = device.name;
        Framer.Device._context.devicePixelRatio = 0;
        return Utils.delay(0, (function(_this) {
          return function() {
            Framer.Device._context.devicePixelRatio = device.value.devicePixelRatio;
            return Screen.backgroundColor = screenBg;
          };
        })(this));
      }
    });
    this.specDivider1 = new SpecDivider({
      top: row(1.25, 2)
    });
    this.posLabel = new SpecLabel({
      top: row(1.75, 2),
      left: col0x,
      text: 'Position',
      'font-size': '.65em'
    });
    this.xValueBox = new SpecValueBox({
      top: row(1.75),
      left: col1x,
      text: '258',
      unit: 'x'
    });
    this.yValueBox = new SpecValueBox({
      top: row(1.75),
      left: col2x,
      text: '258',
      unit: 'y'
    });
    this.sizeLabel = new SpecLabel({
      top: row(2.75, 2),
      left: col0x,
      text: 'Size',
      'font-size': '.65em'
    });
    this.wValueBox = new SpecValueBox({
      top: row(2.75),
      left: col1x,
      text: '258',
      unit: 'w'
    });
    this.hValueBox = new SpecValueBox({
      top: row(2.75),
      left: col2x,
      text: '258',
      unit: 'h'
    });
    this.bgColorLabel = new SpecLabel({
      top: row(3.75, 2),
      left: col0x,
      text: 'Background',
      'font-size': '.65em'
    });
    this.bgColorValueBox = new SpecColorValueBox({
      top: row(3.75),
      left: col1x
    });
    this.opacityLabel = new SpecLabel({
      top: row(4.75, 2),
      left: col0x,
      text: 'Opacity',
      'font-size': '.65em'
    });
    this.opacityValueBox = new SpecValueBox({
      top: row(4.75),
      left: col1x,
      text: '1.0',
      unit: 'a'
    });
    this.specDivider1 = new SpecDivider({
      top: row(6, 2)
    });
    this.borderColorLabel = new SpecLabel({
      top: row(6.5, 2),
      left: col0x,
      text: 'Border',
      'font-size': '.65em'
    });
    this.borderColorValueBox = new SpecColorValueBox({
      top: row(6.5),
      left: col1x
    });
    this.borderValueBox = new SpecValueBox({
      top: row(6.5),
      left: col2x,
      text: '1',
      unit: 'w'
    });
    this.radiusLabel = new SpecLabel({
      top: row(7.5, 2),
      left: col0x,
      text: 'Radius',
      'font-size': '.65em'
    });
    this.radiusValueBox = new SpecValueBox({
      top: row(7.5),
      left: col1x,
      text: '0'
    });
    this.shadowLabel = new SpecLabel({
      top: row(8.5, 2),
      left: col0x,
      text: 'Shadow',
      'font-size': '.65em'
    });
    this.shadowColorValueBox = new SpecColorValueBox({
      top: row(8.5),
      left: col1x
    });
    this.shadowSpreadValueBox = new SpecValueBox({
      top: row(8.5),
      left: col2x,
      text: '1',
      unit: 's'
    });
    this.shadowXValueBox = new SpecValueBox({
      top: row(9.5),
      left: col1x,
      text: '0',
      unit: 'x'
    });
    this.shadowYValueBox = new SpecValueBox({
      top: row(9.5),
      left: col2x,
      text: '0',
      unit: 'y'
    });
    this.shadowBlurValueBox = new SpecValueBox({
      top: row(10.5),
      left: col1x,
      unit: 'blur'
    });
    this.specDivider2 = new SpecDivider({
      top: row(11.75, 2)
    });
    this.fontLabel = new SpecLabel({
      top: row(12.25, 2),
      left: col0x,
      text: 'Font',
      'font-size': '.65em'
    });
    this.fontFamilyValueBox = new SpecWideValueBox({
      top: row(12.25),
      left: col1x
    });
    this.colorLabel = new SpecLabel({
      top: row(13.25, 2),
      left: col0x,
      text: 'Color',
      'font-size': '.65em'
    });
    this.colorValueBox = new SpecColorValueBox({
      top: row(13.25),
      left: col1x
    });
    this.fontStyleValueBox = new SpecValueBox({
      top: row(13.25),
      left: col2x
    });
    this.fontSizeLabel = new SpecLabel({
      top: row(14.25, 2),
      left: col0x,
      text: 'Size',
      'font-size': '.65em'
    });
    this.fontSizeValueBox = new SpecValueBox({
      top: row(14.25),
      left: col1x,
      unit: 's'
    });
    this.fontWeightValueBox = new SpecValueBox({
      top: row(14.25),
      left: col2x,
      unit: 'w'
    });
    this.lineHightLabel = new SpecLabel({
      top: row(15.25, 2),
      left: col0x,
      text: 'Height',
      'font-size': '.65em'
    });
    this.lineHeightValueBox = new SpecValueBox({
      top: row(15.25),
      left: col1x,
      unit: 'lh'
    });
    this.specDivider2 = new SpecDivider({
      top: row(16.5, 2)
    });
    this.nameLabel = new SpecLabel({
      top: row(17),
      left: col0x,
      text: 'Name',
      'font-size': '.65em'
    });
    this.nameValueBox = new SpecWideValueBox({
      top: row(17),
      left: col1x
    });
    this.componentLabel = new SpecLabel({
      top: row(18),
      left: col0x,
      text: 'Component',
      'font-size': '.65em'
    });
    this.componentValueBox = new SpecWideValueBox({
      top: row(18),
      left: col1x
    });
    this.parentComponentLabel = new SpecLabel({
      top: row(19),
      left: col0x,
      text: 'Part of',
      'font-size': '.65em'
    });
    this.parentComponentValueBox = new SpecWideValueBox({
      top: row(19),
      left: col1x
    });
    this.linkedinIcon = document.createElement('a');
    this.linkedinIcon.href = "http://www.linkedin.com/in/steveruizok";
    this.linkedinIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="linkedin_logo" class="mememeLink" width="20" height="20" fill="rgba(91, 91, 91, 1.000)" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>';
    this.githubIcon = document.createElement('a');
    this.githubIcon.href = "http://github.com/steveruizok/gotcha";
    this.githubIcon.innerHTML = '<svg height="20px" width="20px" id="github_logo" class="mememeLink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>';
    this.twitterIcon = document.createElement('a');
    this.twitterIcon.href = "http://twitter.com/steveruizok";
    this.twitterIcon.innerHTML = '<svg height="28px" width="28px" id="twitter_logo" class="mememeLink" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>';
    ref2 = [this.linkedinIcon, this.githubIcon, this.twitterIcon];
    for (j = 0, len = ref2.length; j < len; j++) {
      element = ref2[j];
      panel.appendChild(element);
      element.classList.add('mememeLink');
    }
    props = [['x', this.xValueBox], ['y', this.yValueBox], ['width', this.wValueBox], ['height', this.hValueBox], ['opacity', this.opacityValueBox, true], ['borderWidth', this.borderValueBox], ['borderRadius', this.radiusValueBox], ['shadowSpread', this.shadowSpreadValueBox], ['shadowX', this.shadowXValueBox], ['shadowY', this.shadowYValueBox], ['shadowBlur', this.shadowBlurValueBox], ['fontFamily', this.fontFamilyValueBox], ['fontSize', this.fontSizeValueBox], ['fontWeight', this.fontWeightValueBox], ['lineHeight', this.lineHeightValueBox], ['fontStyle', this.fontStyleValueBox], ['componentName', this.componentValueBox], ['componentNames', this.parentComponentValueBox], ['name', this.nameValueBox]];
    colorProps = [['backgroundColor', this.bgColorValueBox], ['borderColor', this.borderColorValueBox], ['shadowColor', this.shadowColorValueBox], ['color', this.colorValueBox]];
    for (k = 0, len1 = props.length; k < len1; k++) {
      prop = props[k];
      this.defineCustomProperty(prop[0], prop[1], prop[2]);
      this.addCopyEvent(prop[0], prop[1]);
    }
    for (n = 0, len2 = colorProps.length; n < len2; n++) {
      prop = colorProps[n];
      this.defineCustomColorProperty(prop[0], prop[1], prop[2]);
      this.addCopyEvent(prop[0], prop[1]);
    }
  }

  SpecPanel.prototype.defineCustomProperty = function(variableName, layer, float) {
    return Object.defineProperty(this, variableName, {
      get: (function(_this) {
        return function() {
          return _this.props[variableName];
        };
      })(this),
      set: (function(_this) {
        return function(value) {
          _this.props[variableName] = value;
          if ((value == null) || value === '0') {
            layer.value = '';
            return;
          }
          if (float) {
            layer.value = parseFloat(value != null ? value : '0').toFixed(2);
            return;
          }
          if (typeof value === 'number') {
            value = parseInt(value).toFixed();
          }
          return layer.value = value;
        };
      })(this)
    });
  };

  SpecPanel.prototype.defineCustomColorProperty = function(variableName, layer) {
    return Object.defineProperty(this, variableName, {
      get: (function(_this) {
        return function() {
          return _this.props[variableName];
        };
      })(this),
      set: (function(_this) {
        return function(value) {
          _this.props[variableName] = value;
          return layer.value = value;
        };
      })(this)
    });
  };

  SpecPanel.prototype.addCopyEvent = function(variableName, layer) {
    return (function(_this) {
      return function(variableName, layer) {
        return layer.element.addEventListener('click', function() {
          _this.copyContent(_this[variableName]);
          return _this.highlight(layer);
        });
      };
    })(this)(variableName, layer);
  };

  SpecPanel.prototype.copyContent = function(content) {
    secretBox.value = content;
    secretBox.select();
    document.execCommand('copy');
    return secretBox.blur();
  };

  SpecPanel.prototype.highlight = function(layer) {
    var reset, startBorderColor;
    startBorderColor = layer.element.style['border-color'];
    layer.element.style['border-color'] = 'rgba(118, 237, 93, 1.000)';
    reset = (function(_this) {
      return function() {
        return layer.element.style['border-color'] = startBorderColor;
      };
    })(this);
    return _.delay(reset, 120);
  };

  SpecPanel.prototype.clearProps = function() {
    var key, ref1, value;
    ref1 = this.props;
    for (key in ref1) {
      value = ref1[key];
      this[key] = void 0;
    }
    return this.setTextStyles();
  };

  SpecPanel.prototype.setTextStyles = function(value) {
    var j, layer, len, ref1, results;
    ref1 = [this.fontLabel, this.fontSizeLabel, this.colorLabel, this.lineHightLabel, this.fontFamilyValueBox, this.colorValueBox, this.fontSizeValueBox, this.fontWeightValueBox, this.lineHeightValueBox, this.fontStyleValueBox];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      layer = ref1[j];
      results.push(layer.element.style.opacity = value != null ? '1' : '0');
    }
    return results;
  };

  return SpecPanel;

})();


/*
	 .88888.             dP            dP
	d8'   `88            88            88
	88        .d8888b. d8888P .d8888b. 88d888b. .d8888b.
	88   YP88 88'  `88   88   88'  `"" 88'  `88 88'  `88
	Y8.   .88 88.  .88   88   88.  ... 88    88 88.  .88
	 `88888'  `88888P'   dP   `88888P' dP    dP `88888P8
 */

Gotcha = (function() {
  function Gotcha(options) {
    if (options == null) {
      options = {};
    }
    this.unfocus = bind(this.unfocus, this);
    this.focus = bind(this.focus, this);
    this.tryFocus = bind(this.tryFocus, this);
    this.getComponentFromLayer = bind(this.getComponentFromLayer, this);
    this.getLayerIsVisible = bind(this.getLayerIsVisible, this);
    this.getLayerFromElement = bind(this.getLayerFromElement, this);
    this.unsetSelectedLayer = bind(this.unsetSelectedLayer, this);
    this.setSelectedLayer = bind(this.setSelectedLayer, this);
    this.unsetHoveredLayer = bind(this.unsetHoveredLayer, this);
    this.setHoveredLayer = bind(this.setHoveredLayer, this);
    this.setPanelProperties = bind(this.setPanelProperties, this);
    this.showDistances = bind(this.showDistances, this);
    this.makeDashedLines = bind(this.makeDashedLines, this);
    this.makeRectOverlays = bind(this.makeRectOverlays, this);
    this.makeLabel = bind(this.makeLabel, this);
    this.makeLine = bind(this.makeLine, this);
    this.getDimensions = bind(this.getDimensions, this);
    this.update = bind(this.update, this);
    this.showTransition = bind(this.showTransition, this);
    this.transition = bind(this.transition, this);
    this.disable = bind(this.disable, this);
    this.enable = bind(this.enable, this);
    this.toggle = bind(this.toggle, this);
    this.specPanel = new SpecPanel;
    _.defaults(options, {
      color: 'rgba(72, 207, 255, 1.000)',
      selectedColor: 'rgba(255, 1, 255, 1.000)',
      secondaryColor: '#FFFFFF',
      fontFamily: 'Menlo',
      fontSize: '10',
      fontWeight: '500',
      borderRadius: 4,
      padding: {
        top: 1,
        bottom: 1,
        left: 3,
        right: 3
      }
    });
    _.assign(this, {
      color: options.color,
      selectedColor: options.selectedColor,
      secondaryColor: options.secondaryColor,
      fontFamily: options.fontFamily,
      fontSize: options.fontSize,
      fontWeight: options.fontWeight,
      shapes: [],
      borderRadius: options.borderRadius,
      padding: options.padding,
      focusedElement: void 0,
      enabled: false,
      screenElement: document.getElementsByClassName('DeviceComponentPort')[0],
      layers: [],
      containers: [],
      timer: void 0,
      _onlyVisible: true
    });
    document.addEventListener('keyup', this.toggle);
    Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this.update);
    this.context = document.getElementsByClassName('framerLayer DeviceScreen')[0];
    this.context.classList.add('hoverContext');
    this.context.childNodes[2].classList.add('IgnorePointerEvents');
    Object.defineProperty(this, "onlyVisible", {
      get: function() {
        return this._onlyVisible;
      },
      set: function(bool) {
        if (typeof bool !== 'boolean') {
          return;
        }
        return this._onlyVisible = bool;
      }
    });
    Framer.Device.on("change:deviceType", (function(_this) {
      return function() {
        return Utils.delay(0, _this.update);
      };
    })(this));
  }

  Gotcha.prototype.toggle = function(event, open) {
    if (event.key === "`" || event.key === "<" || open === true) {
      if (this.opened) {
        this.disable();
      } else {
        this.enable();
      }
      this.opened = !this.opened;
      return;
    }
    if (event.key === "/" || event.key === ">") {
      if (!this.enabled) {
        return;
      }
      if (this.hoveredLayer === this.selectedLayer) {
        this.unsetSelectedLayer();
      } else {
        this.setSelectedLayer();
      }
    }
  };

  Gotcha.prototype.enable = function() {
    this._canvasColor = Canvas.backgroundColor;
    ctx.setContext();
    return this.transition(true);
  };

  Gotcha.prototype.disable = function() {
    this.unfocus();
    this.enabled = false;
    return this.transition(false);
  };

  Gotcha.prototype.transition = function(open, seconds) {
    var hands, midX;
    if (open == null) {
      open = true;
    }
    if (seconds == null) {
      seconds = .5;
    }
    hands = Framer.Device.hands;
    hands.on("change:x", this.showTransition);
    hands.once(Events.AnimationEnd, (function(_this) {
      return function() {
        hands.off("change:x", _this.showTransition);
        _this.enabled = _this.opened = open;
        if (open) {
          Framer.Device.screen.on(Events.MouseOver, _this.setHoveredLayer);
          Framer.Device.screen.on(Events.MouseOut, _this.unsetHoveredLayer);
          Framer.Device.background.on(Events.MouseOver, _this.unsetHoveredLayer);
          Framer.Device.screen.on(Events.Click, _this.setSelectedLayer);
        } else {
          Framer.Device.screen.off(Events.MouseOver, _this.setHoveredLayer);
          Framer.Device.screen.off(Events.MouseOut, _this.unsetHoveredLayer);
          Framer.Device.background.off(Events.MouseOver, _this.unsetHoveredLayer);
          Framer.Device.screen.off(Events.Click, _this.setSelectedLayer);
        }
        return _this.focus();
      };
    })(this));
    this._startPosition = Framer.Device.hands.x;
    midX = hands._context.innerWidth / 2;
    return Framer.Device.hands.animate({
      midX: open ? midX - 112 : midX,
      options: {
        time: seconds,
        curve: Spring({
          damping: 10
        })
      }
    });
  };

  Gotcha.prototype.showTransition = function() {
    var factor, hands, midX, opacity;
    hands = Framer.Device.hands;
    midX = hands._context.innerWidth / 2;
    opacity = Utils.modulate(hands.midX, [midX - 56, midX - 112], [0, 1], true);
    factor = Utils.modulate(hands.midX, [midX, midX - 112], [0, 1], true);
    this.specPanel.panel.style.opacity = opacity;
    return Canvas.backgroundColor = Color.mix(this._canvasColor, 'rgba(30, 30, 30, 1.000)', factor);
  };

  Gotcha.prototype.update = function() {
    if (!this.opened) {
      return;
    }
    Framer.Device.hands.midX -= 122;
    ctx.setContext();
    return this.focus();
  };

  Gotcha.prototype.getDimensions = function(element) {
    var d, dimensions;
    if (!element) {
      return;
    }
    d = element.getBoundingClientRect();
    dimensions = {
      x: d.left,
      y: d.top,
      width: d.width,
      height: d.height,
      midX: d.left + (d.width / 2),
      midY: d.top + (d.height / 2),
      maxX: d.left + d.width,
      maxY: d.top + d.height,
      frame: d
    };
    return dimensions;
  };

  Gotcha.prototype.makeLine = function(pointA, pointB, label) {
    var capA, capB, color, line;
    if (label == null) {
      label = true;
    }
    color = this.selectedLayer != null ? this.selectedColor : this.color;
    line = new SVGShape({
      type: 'path',
      d: "M " + pointA[0] + " " + pointA[1] + " L " + pointB[0] + " " + pointB[1],
      stroke: color,
      'stroke-width': '1px'
    });
    if (pointA[0] === pointB[0]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + (pointA[0] - 5) + " " + pointA[1] + " L " + (pointA[0] + 5) + " " + pointA[1],
        stroke: color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + (pointB[0] - 5) + " " + pointB[1] + " L " + (pointB[0] + 5) + " " + pointB[1],
        stroke: color,
        'stroke-width': '1px'
      });
    } else if (pointA[1] === pointB[1]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + pointA[0] + " " + (pointA[1] - 5) + " L " + pointA[0] + " " + (pointA[1] + 5),
        stroke: color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + pointB[0] + " " + (pointB[1] - 5) + " L " + pointB[0] + " " + (pointB[1] + 5),
        stroke: color,
        'stroke-width': '1px'
      });
    }
  };

  Gotcha.prototype.makeLabel = function(x, y, text) {
    var box, color, l, label;
    color = this.selectedLayer != null ? this.selectedColor : this.color;
    label = new SVGShape({
      type: 'text',
      parent: ctx,
      x: x,
      y: y,
      'font-family': this.fontFamily,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      fill: this.secondaryColor,
      text: Math.floor(text / this.ratio)
    });
    l = this.getDimensions(label.element);
    label.x = x - l.width / 2;
    label.y = y + l.height / 4 - 1;
    box = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: label.x - this.padding.left,
      y: label.y - l.height + 1,
      width: l.width + this.padding.left + this.padding.right,
      height: l.height + this.padding.top + this.padding.bottom + 1,
      rx: this.borderRadius,
      ry: this.borderRadius,
      fill: new Color(color).darken(40),
      stroke: color,
      'stroke-width': '1px'
    });
    return label.show();
  };

  Gotcha.prototype.makeRectOverlays = function(s, h) {
    var hoverFill, hoveredRect, selectFill, selectedRect;
    if (!s || !h) {
      return;
    }
    if (this.hoveredLayer === Framer.Device.screen) {
      hoverFill = new Color(this.color).alpha(0);
    } else {
      hoverFill = new Color(this.color).alpha(.2);
    }
    hoveredRect = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: h.x,
      y: h.y,
      width: h.width,
      height: h.height,
      stroke: this.color,
      fill: hoverFill,
      'stroke-width': '1px'
    });
    if (this.selectedLayer === Framer.Device.screen) {
      selectFill = new Color(this.selectedColor).alpha(0);
    } else {
      selectFill = new Color(this.selectedColor).alpha(.2);
    }
    return selectedRect = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height,
      stroke: this.selectedColor,
      fill: selectFill,
      'stroke-width': '1px'
    });
  };

  Gotcha.prototype.makeDashedLines = function(e, f, color, offset) {
    if (!e) {
      return;
    }
    if (e === f) {
      return;
    }
    color = new Color(color).alpha(.8);
    new DashedLine({
      x: e.x,
      y: f.y
    }, {
      x: e.x,
      y: f.maxY
    }, color, offset);
    new DashedLine({
      x: e.maxX,
      y: f.y
    }, {
      x: e.maxX,
      y: f.maxY
    }, color, offset);
    new DashedLine({
      x: f.x,
      y: e.y
    }, {
      x: f.maxX,
      y: e.y
    }, color, offset);
    return new DashedLine({
      x: f.x,
      y: e.maxY
    }, {
      x: f.maxX,
      y: e.maxY
    }, color, offset);
  };

  Gotcha.prototype.showDistances = function(selected, hovered) {
    var d, f, h, m, s;
    if (this.hoveredLayer === this.selectedLayer) {
      this.hoveredLayer = Framer.Device.screen;
    }
    s = this.getDimensions(this.selectedLayer._element);
    h = this.getDimensions(this.hoveredLayer._element);
    f = this.getDimensions(Framer.Device.screen._element);
    if (!s || !h) {
      return;
    }
    this.ratio = Framer.Device.screen._element.getBoundingClientRect().width / Screen.width;
    this.makeDashedLines(s, f, this.selectedColor, 5);
    this.makeRectOverlays(s, h);
    if (s.x < h.x && s.maxX > h.maxX && s.y < h.y && s.maxY > h.maxY) {
      d = Math.abs(s.y - h.y);
      m = s.y + d / 2;
      this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.maxX - h.maxX);
      m = h.maxX + (d / 2);
      this.makeLine([h.maxX + 5, h.midY], [s.maxX - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      d = Math.abs(s.maxY - h.maxY);
      m = h.maxY + (d / 2);
      this.makeLine([h.midX, h.maxY + 5], [h.midX, s.maxY - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.x - h.x);
      m = s.x + d / 2;
      this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      return;
    }
    if (s.x > h.x && s.maxX < h.maxX && s.y > h.y && s.maxY < h.maxY) {
      d = Math.abs(h.y - s.y);
      m = h.y + d / 2;
      this.makeLine([s.midX, h.y + 5], [s.midX, s.y - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.maxX - s.maxX);
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, s.midY], [h.maxX - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      d = Math.abs(h.maxY - s.maxY);
      m = s.maxY + (d / 2);
      this.makeLine([s.midX, s.maxY + 5], [s.midX, h.maxY - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.x - s.x);
      m = h.x + d / 2;
      this.makeLine([h.x + 5, s.midY], [s.x - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      return;
    }
    if (s.y > h.maxY) {
      d = Math.abs(s.y - h.maxY);
      m = s.y - (d / 2);
      this.makeLine([h.midX, h.maxY + 5], [h.midX, s.y - 4]);
      this.makeLabel(h.midX, m, d);
    } else if (s.y > h.y) {
      d = Math.abs(s.y - h.y);
      m = s.y - (d / 2);
      this.makeLine([h.midX, h.y + 5], [h.midX, s.y - 4]);
      this.makeLabel(h.midX, m, d);
    }
    if (h.maxX < s.x) {
      d = Math.abs(s.x - h.maxX);
      m = s.x - (d / 2);
      this.makeLine([h.maxX + 5, h.midY], [s.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    } else if (h.x < s.x) {
      d = Math.abs(s.x - h.x);
      m = s.x - (d / 2);
      this.makeLine([h.x + 5, h.midY], [s.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    }
    if (s.maxX < h.x) {
      d = Math.abs(h.x - s.maxX);
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    } else if (s.x < h.x) {
      d = Math.abs(h.x - s.x);
      m = s.x + (d / 2);
      this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
    }
    if (s.maxY < h.y) {
      d = Math.abs(h.y - s.maxY);
      m = s.maxY + (d / 2);
      this.makeLine([h.midX, s.maxY + 5], [h.midX, h.y - 4]);
      return this.makeLabel(h.midX, m, d);
    } else if (s.y < h.y) {
      d = Math.abs(h.y - s.y);
      m = s.y + (d / 2);
      this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
      return this.makeLabel(h.midX, m, d);
    }
  };

  Gotcha.prototype.setPanelProperties = function() {
    var layer, props, ref1;
    if ((this.selectedLayer != null) && this.selectedLayer !== Framer.Device.screen) {
      layer = this.selectedLayer;
    } else if (this.hoveredLayer != null) {
      layer = this.hoveredLayer;
    } else {
      this.specPanel.clearProps();
      return;
    }
    props = layer.props;
    _.assign(props, {
      x: layer.screenFrame.x,
      y: layer.screenFrame.y,
      componentName: layer.constructor.name,
      componentNames: this.getComponentFromLayer(layer.parent),
      parentName: (ref1 = layer.parent) != null ? ref1.name : void 0
    });
    _.assign(this.specPanel, props);
    return this.specPanel.setTextStyles(layer.fontFamily);
  };

  Gotcha.prototype.setHoveredLayer = function(event) {
    var layer;
    if (!this.enabled) {
      return;
    }
    layer = this.getLayerFromElement(event != null ? event.target : void 0);
    if (!this.getLayerIsVisible(layer)) {
      return;
    }
    this.hoveredLayer = layer;
    this.tryFocus(event);
    return false;
  };

  Gotcha.prototype.unsetHoveredLayer = function(event) {
    this.hoveredLayer = void 0;
    return Utils.delay(.05, (function(_this) {
      return function() {
        if (!_this.hoveredLayer) {
          return _this.focus();
        }
      };
    })(this));
  };

  Gotcha.prototype.setSelectedLayer = function() {
    if (!this.hoveredLayer) {
      return;
    }
    this.selectedLayer = this.hoveredLayer;
    return this.focus();
  };

  Gotcha.prototype.unsetSelectedLayer = function() {
    return this.selectedLayer = void 0;
  };

  Gotcha.prototype.findLayerElement = function(element) {
    if (!element) {
      return;
    }
    if (!element.classList) {
      return;
    }
    if (element.classList.contains('framerLayer')) {
      return element;
    }
    return this.findLayerElement(element.parentNode);
  };

  Gotcha.prototype.getLayerFromElement = function(element) {
    var layer;
    if (!element) {
      return;
    }
    element = this.findLayerElement(element);
    layer = _.find(Framer.CurrentContext._layers, ['_element', element]);
    return layer;
  };

  Gotcha.prototype.getLayerIsVisible = function(layer) {
    if (!this._onlyVisible) {
      return true;
    }
    if (!layer) {
      return true;
    }
    if (layer.opacity === 0 || layer.visible === false) {
      return false;
    }
    return this.getLayerIsVisible(layer.parent);
  };

  Gotcha.prototype.getComponentFromLayer = function(layer, names) {
    if (names == null) {
      names = [];
    }
    if (!layer) {
      return names.join(', ');
    }
    if (!_.includes(["Layer", "TextLayer", "ScrollComponent"], layer.constructor.name)) {
      names.push(layer.constructor.name);
    }
    return this.getComponentFromLayer(layer.parent, names);
  };

  Gotcha.prototype.tryFocus = function(event) {
    if (!this.enabled) {
      return;
    }
    this.focusElement = event.target;
    return (function(_this) {
      return function(event) {
        return Utils.delay(.05, function() {
          if (_this.focusElement !== event.target) {
            return;
          }
          return _this.focus();
        });
      };
    })(this)(event);
  };

  Gotcha.prototype.focus = function() {
    if (!this.enabled) {
      return;
    }
    this.unfocus();
    if (this.selectedLayer == null) {
      this.selectedLayer = Framer.Device.screen;
    }
    if (this.hoveredLayer == null) {
      this.hoveredLayer = Framer.Device.screen;
    }
    this.setPanelProperties();
    return this.showDistances();
  };

  Gotcha.prototype.unfocus = function(event) {
    return ctx.removeAll();
  };

  return Gotcha;

})();

exports.gotcha = gotcha = new Gotcha;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3dvcmsvR2l0SHViL2dvdGNoYS9leGFtcGxlLmZyYW1lci9tb2R1bGVzL2dvdGNoYS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG4jIFx0ZDgnICAgYDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcbiMgXHRZOC4gICAuODggODguICAuODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4XG4jIFx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQOFxuIyBcdFxuIyBcdFxuIyBieSBAc3RldmVydWl6b2tcbiNcbiNcbiMgQSBGcmFtZXIgbW9kdWxlIGZvciBoYW5kb2ZmLiBJdCB3b3JrcyBraW5kIG9mIGxpa2UgdGhhdCBvdGhlciB0b29sLlxuXG5cbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbnN2Z0NvbnRleHQgPSB1bmRlZmluZWRcbmN0eCA9IHVuZGVmaW5lZFxuXG5zdGFydE9wZW4gPSBmYWxzZVxuXG4jIGRlYnVnZ2luZ1xuIyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldmVudCkgLT4gcHJpbnQgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdFxuXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VQaG9uZScpWzBdPy5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG5VdGlscy5pbnNlcnRDU1MgXCJcIlwiXG5cdFxuXHQjU3BlY0NvbnRhaW5lciB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHJpZ2h0OiAwO1xuXHRcdHRvcDogMDtcblx0XHRib3R0b206IDA7XG5cdFx0d2lkdGg6IDIyNHB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjAsIDIwLCAyMCwgMS4wMDApO1xuXHRcdGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSg0NSwgNDUsIDQ1LCAxLjAwMCk7XG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbDtcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHRcdGN1cnNvcjogZGVmYXVsdDtcblx0fVxuXG5cdC5TcGVjTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZSB7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHQtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZTpob3ZlciB7XG5cdFx0b3V0bGluZTogMXB4IHNvbGlkIHJnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCkgIWltcG9ydGFudDtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZTphY3RpdmUge1xuXHRcdG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCkgIWltcG9ydGFudDtcblx0fVxuXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93Q29waWVkIHtcblx0XHQwJSB7IFxuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApO1xuXHRcdH1cblxuXHRcdDEwMCUge1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEuMDAwKTtcblx0XHR9XG5cdH1cblxuXHQuY29waWVkIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG5cdH1cblxuXHQubWVtZW1lTGluayB7XG5cdFx0b3BhY2l0eTogLjQ7XG5cdH1cblxuXHQubWVtZW1lTGluazpob3ZlciB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHRcblx0I2xpbmtlZGluX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogNjhweDtcblx0fVxuXG5cdFxuXHQjdHdpdHRlcl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA0cHg7XG5cdFx0cmlnaHQ6IDRweDtcblx0fVxuXG5cdCNnaXRodWJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiAzNnB4O1xuXHR9XG5cblx0LmZyYW1lckxheWVyIHsgXG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHR9IFxuXHRcblx0Lklnbm9yZVBvaW50ZXJFdmVudHMge1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHR9XG5cblx0LmRyb3Bkb3duIHtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cIlwiXCJcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhcbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcbiMgXHRcbiMgXHRcblxuXG5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5wYW5lbC5pZCA9ICdTcGVjQ29udGFpbmVyJ1xudmlld0MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtRGVmYXVsdCcpXG5VdGlscy5kZWxheSAwLCA9PiB2aWV3Qy5hcHBlbmRDaGlsZChwYW5lbClcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICA4ODg4ODhiYVxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICA4OCAgICBgOGJcbiMgXHRgWTg4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gZDg4ODhQIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAuICAuZFBcbiMgXHQgICAgICBgOGIgODhvb29vZDggODgnICBgXCJcIiA4OCcgIGA4OCA4OG9vb29kOCAgIDg4ICAgIDg4ICAgYDhiLiA4OCcgIGA4OCAgYDhiZDgnXG4jIFx0ZDgnICAgLjhQIDg4LiAgLi4uIDg4LiAgLi4uIDg4ICAgICAgIDg4LiAgLi4uICAgODggICAgODggICAgLjg4IDg4LiAgLjg4ICAuZDg4Yi5cbiMgXHQgWTg4ODg4UCAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICAgICAgYDg4ODg4UCcgICBkUCAgICA4ODg4ODg4OFAgYDg4ODg4UCcgZFAnICBgZFBcbiMgXHRcbiMgXHRcblxuc2VjcmV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWNyZXRCb3gpXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAjIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICMgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICMgXHRgWTg4ODg4Yi4gODggICAgLjhQIDg4ICAgICAgICAgICA4OCAgICAgICAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFAgLmQ4ODg4Yi5cbiAjIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIyBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICMgXHQgWTg4ODg4UCAgODg4ODg4JyAgICBgODg4ODgnICAgICAgWTg4ODg4UCcgYDg4ODg4UCcgZFAgIGRQICBkUCA4OFk4ODhQJyBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgIGRQICAgYDg4ODg4UCdcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuXG5cbiMjI1xuXHQgLC0uICAuICAgLCAgLC0uICAsLS4gICAgICAgICAuICAgICAgICAgICAuXG5cdCggICBgIHwgIC8gIC8gICAgLyAgICAgICAgICAgIHwgICAgICAgICAgIHxcblx0IGAtLiAgfCAvICAgfCAtLiB8ICAgICwtLiA7LS4gfC0gICwtLiAuICwgfC1cblx0LiAgICkgfC8gICAgXFwgIHwgXFwgICAgfCB8IHwgfCB8ICAgfC0nICBYICB8XG5cdCBgLScgICcgICAgICBgLScgIGAtJyBgLScgJyAnIGAtJyBgLScgJyBgIGAtJ1xuXHRcbiMjI1xuXG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKEBzdmcpXG5cdFx0QHN2Zy5zdHlsZVsnei1pbmRleCddID0gJzk5OSdcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbkJhY2tncm91bmQuX2VsZW1lbnRcblxuXHRcdEBzZXRDb250ZXh0KClcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdHNldEF0dHJpYnV0ZXM6IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRzZXRDb250ZXh0OiA9PlxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdEBzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRhZGRTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzaGFwZXMucHVzaChzaGFwZSlcblx0XHRAc2hvd1NoYXBlKHNoYXBlKVxuXHRcdFxuXHRyZW1vdmVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBoaWRlU2hhcGUoc2hhcGUpXG5cdFx0Xy5wdWxsKEBzaGFwZXMsIHNoYXBlKVxuXHRcdFxuXHRoaWRlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFxuXHRzaG93U2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLmFwcGVuZENoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0XG5cdGFkZERlZjogKGRlZikgLT5cblx0XHRAc3ZnRGVmcy5hcHBlbmRDaGlsZChkZWYpXG5cblx0cmVtb3ZlQWxsOiA9PlxuXHRcdGZvciBzaGFwZSBpbiBAc2hhcGVzXG5cdFx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0QHNoYXBlcyA9IFtdXG5cblxuIyMjXG5cdCAsLS4gIC4gICAsICAsLS4gICwtLiAgLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLiA7LS5cblx0KCAgIGAgfCAgLyAgLyAgICAoICAgYCB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHwgIClcblx0IGAtLiAgfCAvICAgfCAtLiAgYC0uICB8LS4gLC06IDstLiAsLS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLC18IHwtJ1xuXHQuICAgKSB8LyAgICBcXCAgfCAuICAgKSB8IHwgfCB8IHwgfCB8LScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8IHxcblx0IGAtJyAgJyAgICAgIGAtJyAgYC0nICAnICcgYC1gIHwtJyBgLScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYC0nICdcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt0eXBlOiAnY2lyY2xlJ30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHBhcmVudCA9IHN2Z0NvbnRleHRcblx0XHRcblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXG5cdFx0XHRvcHRpb25zLnR5cGVcblx0XHRcdClcblxuXHRcdEBzZXRDdXN0b21Qcm9wZXJ0eSgndGV4dCcsICd0ZXh0Q29udGVudCcsICd0ZXh0Q29udGVudCcsIG9wdGlvbnMudGV4dClcblx0XHRcdFx0XG5cdFx0IyBhc3NpZ24gYXR0cmlidXRlcyBzZXQgYnkgb3B0aW9uc1xuXHRcdGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdEBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBwYXJlbnQuYWRkU2hhcGUoQClcblx0XHRcblx0XHRAc2hvdygpXG5cdFx0XHRcblx0c2V0QXR0cmlidXRlOiAoa2V5LCB2YWx1ZSkgPT5cblx0XHRyZXR1cm4gaWYga2V5IGlzICd0ZXh0J1xuXHRcdGlmIG5vdCBAW2tleV0/XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRnZXQ6ID0+XG5cdFx0XHRcdFx0cmV0dXJuIEBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXG5cdFx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0XHRAZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcblx0XHRAW2tleV0gPSB2YWx1ZVxuXHRcblx0c2V0Q3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIHJldHVyblZhbHVlLCBzZXRWYWx1ZSwgc3RhcnRWYWx1ZSkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIHJldHVyblZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGVsZW1lbnRbc2V0VmFsdWVdID0gdmFsdWVcblxuXHRcdEBbdmFyaWFibGVOYW1lXSA9IHN0YXJ0VmFsdWVcblxuXHRoaWRlOiAtPiBcblx0XHRAcGFyZW50LmhpZGVTaGFwZShAKVxuXHRcblx0c2hvdzogLT4gXG5cdFx0QHBhcmVudC5zaG93U2hhcGUoQClcblx0XHRcblx0cmVtb3ZlOiAtPlxuXHRcdEBwYXJlbnQucmVtb3ZlU2hhcGUoQClcblxuXG5jbGFzcyBEYXNoZWRMaW5lIGV4dGVuZHMgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChwb2ludEEsIHBvaW50QiwgY29sb3IgPSAnIzAwMCcsIG9mZnNldCA9IDAsIG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIG9wdGlvbnMsXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QS54fSAje3BvaW50QS55fSBMICN7cG9pbnRCLnh9ICN7cG9pbnRCLnl9XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXHRcdFx0J3N0cm9rZS1kYXNoYXJyYXknOiBcIjUsIDVcIlxuXHRcdFx0J3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0XG5cblx0XHRzdXBlciBvcHRpb25zXG5cblxuY3R4ID0gbmV3IFNWR0NvbnRleHRcblxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuIyBcdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICBZOC4gICAuODggODguICAuODggODggIDg4ICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICA4OCAgIDg4ICAgICAgICAgODhcbiMgXHQgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLC0tLiAuICAgICAgICAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgICB8ICAgICAgICAgICAgICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfC0gICB8ICwtLiA7LS4tLiAsLS4gOy0uIHwtXG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8LScgfCB8IHwgfC0nIHwgfCB8XG5cdCBgLScgIHwtJyBgLScgYC0nIGAtLScgJyBgLScgJyAnICcgYC0nICcgJyBgLSdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChjbGFzc05hbWUsIG9wdGlvbnMgPSB7fSwgdGV4dCkgLT5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCBjbGFzc05hbWVcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkICdTcGVjRWxlbWVudCdcblxuXHRcdF8uYXNzaWduIEBlbGVtZW50LnN0eWxlLCBvcHRpb25zXG5cblx0XHRwYW5lbC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdEByb290RWxlbWVudCA9IEBlbGVtZW50XG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwgICAgICAgIC4gICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgICAgICB8ICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLTogfC0uICwtLiB8XG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8IHwgfCB8LScgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLS0nIGAtYCBgLScgYC0nICdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0xhYmVsIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ25vbmUnXG5cdFx0XHQnZm9udC1mYW1pbHknOiAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdmb250LXdlaWdodCc6ICc0MDAnXG5cdFx0XHQnY29sb3InOiAncmdiYSgxMzYsIDEzNiwgMTM2LCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5cdFx0QHRleHRMYXllciA9IG5ldyBTcGVjRWxlbWVudCAnU3BlY0xhYmVsJyxcblx0XHRcdCdmb250LWZhbWlseSc6IG9wdGlvbnNbJ2ZvbnQtZmFtaWx5J10gPyAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogb3B0aW9uc1snZm9udC1zaXplJ10gPyAnMWVtJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0Jzogb3B0aW9uc1snZm9udC13ZWlnaHQnXSA/ICc1MDAnXG5cdFx0XHQnY29sb3InOiBvcHRpb25zWydjb2xvciddID8gJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMS4wMDApJ1xuXHRcdFx0J2xlZnQnOiBvcHRpb25zLmxlZnRcblx0XHRcdCdyaWdodCc6IG9wdGlvbnMucmlnaHRcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0TGF5ZXIuZWxlbWVudFxuXG5cdFx0b3B0aW9ucy5wYXJlbnQ/LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3RleHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInIHRoZW4gdmFsdWUgPSB2YWx1ZS50b0ZpeGVkKClcblx0XHRcdFx0QHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblxuXHRcdEB0ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJydcblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLiAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgXFwgbyAgICAgbyAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgfCAuIC4gLCAuICwtfCAsLS4gOy0uXG5cdC4gICApIHwgfCB8LScgfCAgIHwgIC8gfCB8LyAgfCB8IHwgfC0nIHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICAnICcgICAnIGAtJyBgLScgJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRGl2aWRlciBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc4cHgnXG5cdFx0XHQnd2lkdGgnOiAnMjA4cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzFweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAnXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cblx0XHRzdXBlciAnU3BlY0RpdmlkZXInLCBvcHRpb25zXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICBgLScgJyBgXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNCb3ggZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogdW5kZWZpbmVkXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzk2cHgnXG5cdFx0XHQnd2lkdGgnOiAnNjRweCdcblx0XHRcdCdoZWlnaHQnOiAnMjRweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2JveC1zaGFkb3cnOiAnaW5zZXQgMHB4IDBweCAwcHggNHB4IHJnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgJ1NwZWNMYWJlbCcsIG9wdGlvbnNcblxuXG4jIyNcblxuXHQgLC0uICAgICAgICAgICAgICAgLC0uICAgICAuICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgLyAgICAgICAgfCAgICAgICAgIHwgIC8gICAgICB8ICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICAgICwtLiB8ICwtLiA7LS4gfCAvICAgLC06IHwgLiAuICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgXFwgICAgfCB8IHwgfCB8IHwgICB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICBgLScgYC0nICcgYC0nICcgICAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuY2xhc3MgU3BlY0NvbG9yVmFsdWVCb3ggZXh0ZW5kcyBTcGVjQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc5NnB4J1xuXHRcdFx0J3dpZHRoJzogJzY0cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzI0cHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblx0XHRcdCdib3gtc2hhZG93JzogJ2luc2V0IDBweCAwcHggMHB4IDRweCByZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdmFsdWUgPyAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0aWYgQGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTcGVjU2VsZWN0YWJsZScpXG5cdFx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdFx0XHRlbHNlIGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdEB2YWx1ZSA9IG9wdGlvbnMudmFsdWVcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvICAgIHwgfCB8IHwgfCB8LScgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY1ZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdmb250LWZhbWlseSc6ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjQyZW0nXG5cdFx0XHQncGFkZGluZy10b3AnOiAnNXB4J1xuXHRcdFx0J3BhZGRpbmctbGVmdCc6ICc4cHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2xpbmUtaGVpZ2h0JzogJzFlbSdcblx0XHRcdCdvdmVyZmxvdyc6ICdoaWRkZW4nXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAdmFsdWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdsZWZ0JzogJzZweCdcblx0XHRcdCd0b3AnOiAnNnB4J1xuXHRcdFx0J2NvbG9yJzogJyNGRkYnXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnNTAwJ1xuXG5cdFx0QHVuaXRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJy45ZW0nXG5cdFx0XHQncmlnaHQnOiAnMnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQndGV4dC1hbGlnbic6ICdyaWdodCdcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRcdFx0ZWxzZSBpZiBAZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNTZWxlY3RhYmxlJylcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gJydcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgIC4gICAgIC4gICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgLiB8IG8gICB8ICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCApICkgLiAsLXwgLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvfC8gIHwgfCB8IHwtJyB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICcgJyAgICcgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjV2lkZVZhbHVlQm94IGV4dGVuZHMgU3BlY1ZhbHVlQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEzNnB4J1xuXG4jIFNwZWMgRHJvcGRvd24gQm94XG5cbmNsYXNzIFNwZWNEcm9wZG93bkJveCBleHRlbmRzIFNwZWNXaWRlVmFsdWVCb3hcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHtuYW1lOiAnQmx1ZScsIHZhbHVlOiAnYmx1ZSd9LCBcblx0XHRcdFx0e25hbWU6ICdSZWQnLCB2YWx1ZTogJ3JlZCd9XG5cdFx0XHRcdHtuYW1lOiAnR3JlZW4nLCB2YWx1ZTogJ2dyZWVuJ31cblx0XHRcdF1cblx0XHRcdGNhbGxiYWNrOiAodmFsdWUpIC0+IG51bGxcblx0XHRcdHNlbGVjdGVkOiAwXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrXG5cblx0XHRAZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMzZweCdcblxuXHRcdEBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKVxuXHRcdEBzZWxlY3QuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24nKVxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKEBzZWxlY3QpXG5cdFx0QHNlbGVjdC5vbmNoYW5nZSA9IEBzZXRTZWxlY3RWYWx1ZVxuXG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBvcHRpb25zLm9wdGlvbnNcblx0XHRcdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuXHRcdFx0by52YWx1ZSA9IG9wdGlvbi52YWx1ZVxuXHRcdFx0by5sYWJlbCA9IG9wdGlvbi5uYW1lXG5cdFx0XHRvLmlubmVySFRNTCA9IG8ubmFtZVxuXHRcdFx0QHNlbGVjdC5hcHBlbmRDaGlsZChvKVxuXG5cdFx0XHRpZiBpIGlzIG9wdGlvbnMuc2VsZWN0ZWRcblx0XHRcdFx0by5zZWxlY3RlZCA9IHRydWVcblx0XHRcdFx0QHZhbHVlID0gQHNlbGVjdC5vcHRpb25zW0BzZWxlY3Quc2VsZWN0ZWRJbmRleF0ubGFiZWxcblxuXHRzZXRTZWxlY3RWYWx1ZTogPT5cblx0XHRAdmFsdWUgPSBAc2VsZWN0Lm9wdGlvbnNbQHNlbGVjdC5zZWxlY3RlZEluZGV4XS5sYWJlbFxuXHRcdGRvIF8uYmluZChAY2FsbGJhY2ssIEBzZWxlY3QpXG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuIyMjXG5cdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuXHQgICAgICBgOGIgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG5cdGQ4JyAgIC44UCA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC4uLiAgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG5cdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG5cdCAgICAgICAgICA4OFxuXHQgICAgICAgICAgZFBcbiMjI1xuXG5cbmNsYXNzIFNwZWNQYW5lbFxuXHRjb25zdHJ1Y3RvcjogLT5cblxuXHRcdEBwYW5lbCA9IHBhbmVsXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdwcm9wcycsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiBAX3Byb3BzXG5cdFx0XHRzZXQ6IChvYmopIC0+XG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdFx0XHRcdGlmIF8uaGFzKEBwcm9wcywga2V5KVxuXHRcdFx0XHRcdFx0QHByb3BzW2tleV0gPSB2YWx1ZVxuXG5cdFx0QHBhbmVsLnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblxuXHRcdGNvbDB4ID0gJzRweCdcblx0XHRjb2wxeCA9ICc4NHB4J1xuXHRcdGNvbDJ4ID0gJzE1NnB4J1xuXG5cdFx0cm93ID0gKG51bSwgb2Zmc2V0ID0gMCkgLT4gcmV0dXJuICgxNiArICgzNSAqIG51bSkgLSBvZmZzZXQpICsgJ3B4J1xuXG5cblx0XHQjIERldmljZVxuXG5cdFx0QGRldmljZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMClcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnRGV2aWNlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdGRldmljZU9wdGlvbnMgPSBbXVxuXHRcdGN1cnJlbnRLZXkgPSB1bmRlZmluZWRcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1xuXHRcdFx0aWYgXy5lbmRzV2l0aChrZXksICdoYW5kJylcblx0XHRcdFx0Y29udGludWVcblxuXG5cdFx0XHRpZiBub3QgdmFsdWUubWluU3R1ZGlvVmVyc2lvbj9cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpID4gdmFsdWUubWF4U3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZSBcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpIDwgdmFsdWUubWluU3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZXZpY2VPcHRpb25zLnB1c2hcblx0XHRcdFx0bmFtZToga2V5LCBcblx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cblx0XHRcdGlmIGtleSBpcyBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblx0XHRcdFx0Y3VycmVudEtleSA9IF8uaW5kZXhPZihcblx0XHRcdFx0XHRfLmtleXMoRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzKSwgXG5cdFx0XHRcdFx0a2V5XG5cdFx0XHRcdFx0KVxuXG5cdFx0QGRldmljZVNlbGVjdCA9IG5ldyBTcGVjRHJvcGRvd25Cb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0b3B0aW9uczogXy51bmlxKGRldmljZU9wdGlvbnMpIFxuXHRcdFx0c2VsZWN0ZWQ6IGN1cnJlbnRLZXlcblx0XHRcdGNhbGxiYWNrOiAoZXZlbnQpIC0+XG5cdFx0XHRcdGRldmljZSA9IGRldmljZU9wdGlvbnNbQHNlbGVjdGVkSW5kZXhdXG5cdFx0XHRcdHNlbGVjdGVkID0gQG9wdGlvbnNbQHNlbGVjdGVkSW5kZXhdXG5cblx0XHRcdFx0c2NyZWVuQmcgPSBTY3JlZW4uYmFja2dyb3VuZENvbG9yXG5cblx0XHRcdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gZGV2aWNlLm5hbWVcblxuXHRcdFx0XHQjIHNpbGx5IGZpeFxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLl9jb250ZXh0LmRldmljZVBpeGVsUmF0aW8gPSAwXG5cdFx0XHRcdFV0aWxzLmRlbGF5IDAsID0+IFxuXHRcdFx0XHRcdEZyYW1lci5EZXZpY2UuX2NvbnRleHQuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZS52YWx1ZS5kZXZpY2VQaXhlbFJhdGlvXG5cblx0XHRcdFx0XHRTY3JlZW4uYmFja2dyb3VuZENvbG9yID0gc2NyZWVuQmdcblxuXHRcdEBzcGVjRGl2aWRlcjEgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDEuMjUsIDIpXG5cblx0XHQjIHBvc1xuXG5cdFx0QHBvc0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMS43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyBzaXplXG5cblx0XHRAc2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMi43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAd1ZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMi43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMi43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIGJhY2tncm91bmRcblxuXHRcdEBiZ0NvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygzLjc1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBiZ0NvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDMuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBvcGFjaXR5XG5cblx0XHRAb3BhY2l0eUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNC43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAb3BhY2l0eVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMS4wJ1xuXHRcdFx0dW5pdDogJ2EnXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMSA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coNiwgMilcblxuXHRcdCMgYm9yZGVyXG5cblx0XHRAYm9yZGVyQ29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDYuNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnQm9yZGVyJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBib3JkZXJDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2LjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0QGJvcmRlclZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNi41KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIHJhZGl1c1xuXG5cdFx0QHJhZGl1c0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNy41LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdSYWRpdXMnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHJhZGl1c1ZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy41KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXG5cdFx0IyBzaGFkb3dcblxuXHRcdEBzaGFkb3dMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDguNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBzaGFkb3dDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg4LjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0QHNoYWRvd1NwcmVhZFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coOC41KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3MnXG5cblx0XHRAc2hhZG93WFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coOS41KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAc2hhZG93WVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coOS41KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcwJ1xuXHRcdFx0dW5pdDogJ3knXG5cblx0XHRAc2hhZG93Qmx1clZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTAuNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR1bml0OiAnYmx1cidcblxuXHRcdCMgRGl2aWRlciAjIC0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAc3BlY0RpdmlkZXIyID0gbmV3IFNwZWNEaXZpZGVyXG5cdFx0XHR0b3A6IHJvdygxMS43NSwgMilcblxuXHRcdCMgRm9udFxuXG5cdFx0QGZvbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDEyLjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdGb250J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBmb250RmFtaWx5VmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTIuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBDb2xvclxuXG5cdFx0QGNvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMy4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnQ29sb3InXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGNvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEzLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdEBmb250U3R5bGVWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEzLjI1KVxuXHRcdFx0bGVmdDogY29sMnhcblxuXHRcdCMgRm9udCBTaXplXG5cblx0XHRAZm9udFNpemVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE0LjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdTaXplJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBmb250U2l6ZVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTQuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ3MnXG5cblx0XHRAZm9udFdlaWdodFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTQuMjUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIExpbmUgSGVpZ2h0XG5cblx0XHRAbGluZUhpZ2h0TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxNS4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnSGVpZ2h0J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBsaW5lSGVpZ2h0VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxNS4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR1bml0OiAnbGgnXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMiA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coMTYuNSwgMilcblx0XHRcblx0XHQjIE5hbWVcblx0XHRAbmFtZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTcpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ05hbWUnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QG5hbWVWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxNylcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHQjIENvbXBvbmVudFxuXG5cdFx0QGNvbXBvbmVudExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTgpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0NvbXBvbmVudCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAY29tcG9uZW50VmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTgpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBQYXJlbnQgQ29tcG9uZW50XG5cblx0XHRAcGFyZW50Q29tcG9uZW50TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxOSlcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUGFydCBvZidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAcGFyZW50Q29tcG9uZW50VmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTkpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cblx0XHQjIExpbmtzXG5cblx0XHRAbGlua2VkaW5JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0QGxpbmtlZGluSWNvbi5ocmVmID0gXCJodHRwOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9zdGV2ZXJ1aXpva1wiXG5cdFx0QGxpbmtlZGluSWNvbi5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaWQ9XCJsaW5rZWRpbl9sb2dvXCIgY2xhc3M9XCJtZW1lbWVMaW5rXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMTEgMTloLTN2LTExaDN2MTF6bS0xLjUtMTIuMjY4Yy0uOTY2IDAtMS43NS0uNzktMS43NS0xLjc2NHMuNzg0LTEuNzY0IDEuNzUtMS43NjQgMS43NS43OSAxLjc1IDEuNzY0LS43ODMgMS43NjQtMS43NSAxLjc2NHptMTMuNSAxMi4yNjhoLTN2LTUuNjA0YzAtMy4zNjgtNC0zLjExMy00IDB2NS42MDRoLTN2LTExaDN2MS43NjVjMS4zOTYtMi41ODYgNy0yLjc3NyA3IDIuNDc2djYuNzU5elwiLz48L3N2Zz4nXG5cblx0XHRAZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdEBnaXRodWJJY29uLmhyZWYgPSBcImh0dHA6Ly9naXRodWIuY29tL3N0ZXZlcnVpem9rL2dvdGNoYVwiXG5cdFx0QGdpdGh1Ykljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjBweFwiIHdpZHRoPVwiMjBweFwiIGlkPVwiZ2l0aHViX2xvZ29cIiBjbGFzcz1cIm1lbWVtZUxpbmtcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIj48cGF0aCBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiBkPVwiTTUxMiAwQzIyOS4yNSAwIDAgMjI5LjI1IDAgNTEyYzAgMjI2LjI1IDE0Ni42ODggNDE4LjEyNSAzNTAuMTU2IDQ4NS44MTIgMjUuNTk0IDQuNjg4IDM0LjkzOC0xMS4xMjUgMzQuOTM4LTI0LjYyNSAwLTEyLjE4OC0wLjQ2OS01Mi41NjItMC43MTktOTUuMzEyQzI0MiA5MDguODEyIDIxMS45MDYgODE3LjUgMjExLjkwNiA4MTcuNWMtMjMuMzEyLTU5LjEyNS01Ni44NDQtNzQuODc1LTU2Ljg0NC03NC44NzUtNDYuNTMxLTMxLjc1IDMuNTMtMzEuMTI1IDMuNTMtMzEuMTI1IDUxLjQwNiAzLjU2MiA3OC40NyA1Mi43NSA3OC40NyA1Mi43NSA0NS42ODggNzguMjUgMTE5Ljg3NSA1NS42MjUgMTQ5IDQyLjUgNC42NTQtMzMgMTcuOTA0LTU1LjYyNSAzMi41LTY4LjM3NUMzMDQuOTA2IDcyNS40MzggMTg1LjM0NCA2ODEuNSAxODUuMzQ0IDQ4NS4zMTJjMC01NS45MzggMTkuOTY5LTEwMS41NjIgNTIuNjU2LTEzNy40MDYtNS4yMTktMTMtMjIuODQ0LTY1LjA5NCA1LjA2Mi0xMzUuNTYyIDAgMCA0Mi45MzgtMTMuNzUgMTQwLjgxMiA1Mi41IDQwLjgxMi0xMS40MDYgODQuNTk0LTE3LjAzMSAxMjguMTI1LTE3LjIxOSA0My41IDAuMTg4IDg3LjMxMiA1Ljg3NSAxMjguMTg4IDE3LjI4MSA5Ny42ODgtNjYuMzEyIDE0MC42ODgtNTIuNSAxNDAuNjg4LTUyLjUgMjggNzAuNTMxIDEwLjM3NSAxMjIuNTYyIDUuMTI1IDEzNS41IDMyLjgxMiAzNS44NDQgNTIuNjI1IDgxLjQ2OSA1Mi42MjUgMTM3LjQwNiAwIDE5Ni42ODgtMTE5Ljc1IDI0MC0yMzMuODEyIDI1Mi42ODggMTguNDM4IDE1Ljg3NSAzNC43NSA0NyAzNC43NSA5NC43NSAwIDY4LjQzOC0wLjY4OCAxMjMuNjI1LTAuNjg4IDE0MC41IDAgMTMuNjI1IDkuMzEyIDI5LjU2MiAzNS4yNSAyNC41NjJDODc3LjQzOCA5MzAgMTAyNCA3MzguMTI1IDEwMjQgNTEyIDEwMjQgMjI5LjI1IDc5NC43NSAwIDUxMiAwelwiIC8+PC9zdmc+J1xuXG5cdFx0QHR3aXR0ZXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0QHR3aXR0ZXJJY29uLmhyZWYgPSBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0QHR3aXR0ZXJJY29uLmlubmVySFRNTCA9ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGNsYXNzPVwibWVtZW1lTGlua1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblxuXHRcdGZvciBlbGVtZW50IGluIFtAbGlua2VkaW5JY29uLCBAZ2l0aHViSWNvbiwgQHR3aXR0ZXJJY29uXVxuXHRcdFx0cGFuZWwuYXBwZW5kQ2hpbGQoZWxlbWVudClcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVtZW1lTGluaycpXG5cblxuXHRcdCMgLS0tLVxuXG5cdFx0IyBwcm9wZXJ0aWVzXG5cblx0XHRwcm9wcyA9IFtcblx0XHRcdFsneCcsIEB4VmFsdWVCb3hdLFxuXHRcdFx0Wyd5JywgQHlWYWx1ZUJveF0sXG5cdFx0XHRbJ3dpZHRoJywgQHdWYWx1ZUJveF1cblx0XHRcdFsnaGVpZ2h0JywgQGhWYWx1ZUJveF1cblx0XHRcdFsnb3BhY2l0eScsIEBvcGFjaXR5VmFsdWVCb3gsIHRydWVdXG5cdFx0XHRbJ2JvcmRlcldpZHRoJywgQGJvcmRlclZhbHVlQm94XVxuXHRcdFx0Wydib3JkZXJSYWRpdXMnLCBAcmFkaXVzVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1NwcmVhZCcsIEBzaGFkb3dTcHJlYWRWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WCcsIEBzaGFkb3dYVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1knLCBAc2hhZG93WVZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dCbHVyJywgQHNoYWRvd0JsdXJWYWx1ZUJveF1cblx0XHRcdFsnZm9udEZhbWlseScsIEBmb250RmFtaWx5VmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRTaXplJywgQGZvbnRTaXplVmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRXZWlnaHQnLCBAZm9udFdlaWdodFZhbHVlQm94XVxuXHRcdFx0WydsaW5lSGVpZ2h0JywgQGxpbmVIZWlnaHRWYWx1ZUJveF1cblx0XHRcdFsnZm9udFN0eWxlJywgQGZvbnRTdHlsZVZhbHVlQm94XVxuXHRcdFx0Wydjb21wb25lbnROYW1lJywgQGNvbXBvbmVudFZhbHVlQm94XVxuXHRcdFx0Wydjb21wb25lbnROYW1lcycsIEBwYXJlbnRDb21wb25lbnRWYWx1ZUJveF1cblx0XHRcdFsnbmFtZScsIEBuYW1lVmFsdWVCb3hdXG5cdFx0XVxuXG5cdFx0Y29sb3JQcm9wcyA9IFtcblx0XHRcdFsnYmFja2dyb3VuZENvbG9yJywgQGJnQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnYm9yZGVyQ29sb3InLCBAYm9yZGVyQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93Q29sb3InLCBAc2hhZG93Q29sb3JWYWx1ZUJveF1cblx0XHRcdFsnY29sb3InLCBAY29sb3JWYWx1ZUJveF1cblx0XHRdXG5cblx0XHRmb3IgcHJvcCBpbiBwcm9wc1xuXHRcdFx0QGRlZmluZUN1c3RvbVByb3BlcnR5KHByb3BbMF0sIHByb3BbMV0sIHByb3BbMl0pXG5cdFx0XHRAYWRkQ29weUV2ZW50KHByb3BbMF0sIHByb3BbMV0pXG5cblx0XHRmb3IgcHJvcCBpbiBjb2xvclByb3BzXG5cdFx0XHRAZGVmaW5lQ3VzdG9tQ29sb3JQcm9wZXJ0eShwcm9wWzBdLCBwcm9wWzFdLCBwcm9wWzJdKVxuXHRcdFx0QGFkZENvcHlFdmVudChwcm9wWzBdLCBwcm9wWzFdKVxuXG5cdGRlZmluZUN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllciwgZmxvYXQpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6ID0+IHJldHVybiBAcHJvcHNbdmFyaWFibGVOYW1lXVxuXHRcdFx0c2V0OiAodmFsdWUpID0+XG5cdFx0XHRcdEBwcm9wc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVcblxuXHRcdFx0XHRpZiBub3QgdmFsdWU/IG9yIHZhbHVlIGlzICcwJ1xuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gJydcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRpZiBmbG9hdFxuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSA/ICcwJykudG9GaXhlZCgyKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGlmIHR5cGVvZiB2YWx1ZSBpcyAnbnVtYmVyJ1xuXHRcdFx0XHRcdHZhbHVlID0gcGFyc2VJbnQodmFsdWUpLnRvRml4ZWQoKVxuXHRcdFx0XHRcblx0XHRcdFx0bGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRcblx0ZGVmaW5lQ3VzdG9tQ29sb3JQcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgbGF5ZXIpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6ID0+IHJldHVybiBAcHJvcHNbdmFyaWFibGVOYW1lXVxuXHRcdFx0c2V0OiAodmFsdWUpID0+XG5cdFx0XHRcdEBwcm9wc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVcblx0XHRcdFx0bGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0XG5cblx0YWRkQ29weUV2ZW50OiAodmFyaWFibGVOYW1lLCBsYXllcikgLT5cblx0XHRkbyAodmFyaWFibGVOYW1lLCBsYXllcikgPT5cblx0XHRcdGxheWVyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0XHRAY29weUNvbnRlbnQoQFt2YXJpYWJsZU5hbWVdKVxuXHRcdFx0XHRAaGlnaGxpZ2h0KGxheWVyKVxuXG5cdGNvcHlDb250ZW50OiAoY29udGVudCkgPT5cblx0XHRzZWNyZXRCb3gudmFsdWUgPSBjb250ZW50XG5cdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRoaWdobGlnaHQ6IChsYXllcikgPT5cblx0XHRzdGFydEJvcmRlckNvbG9yID0gbGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ11cblx0XHRsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXSA9ICdyZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApJ1xuXHRcdHJlc2V0ID0gPT4gbGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSBzdGFydEJvcmRlckNvbG9yXG5cblx0XHRfLmRlbGF5KHJlc2V0LCAxMjApXG5cblx0Y2xlYXJQcm9wczogPT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBAcHJvcHNcblx0XHRcdEBba2V5XSA9IHVuZGVmaW5lZFxuXHRcdEBzZXRUZXh0U3R5bGVzKClcblxuXHRzZXRUZXh0U3R5bGVzOiAodmFsdWUpID0+XG5cblx0XHRmb3IgbGF5ZXIgaW4gW1xuXHRcdFx0QGZvbnRMYWJlbCxcblx0XHRcdEBmb250U2l6ZUxhYmVsLFxuXHRcdFx0QGNvbG9yTGFiZWwsXG5cdFx0XHRAbGluZUhpZ2h0TGFiZWwsXG5cdFx0XHRAZm9udEZhbWlseVZhbHVlQm94LCBcblx0XHRcdEBjb2xvclZhbHVlQm94LCBcblx0XHRcdEBmb250U2l6ZVZhbHVlQm94LCBcblx0XHRcdEBmb250V2VpZ2h0VmFsdWVCb3gsIFxuXHRcdFx0QGxpbmVIZWlnaHRWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFN0eWxlVmFsdWVCb3hcblx0XHRdXG5cdFx0XHRsYXllci5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpZiB2YWx1ZT8gdGhlbiAnMScgZWxzZSAnMCdcblxuXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4jIyNcblx0IC44ODg4OC4gICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG5cdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cblx0ODggICBZUDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG5cdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcblx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQOFxuXHRcblx0XG4jIyNcblxuXG5jbGFzcyBHb3RjaGFcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAc3BlY1BhbmVsID0gbmV3IFNwZWNQYW5lbFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2VsZWN0ZWRDb2xvcjogJ3JnYmEoMjU1LCAxLCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlY29uZGFyeUNvbG9yOiAnI0ZGRkZGRidcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblx0XHRcdGZvbnRTaXplOiAnMTAnXG5cdFx0XHRmb250V2VpZ2h0OiAnNTAwJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0XG5cdFx0XHRwYWRkaW5nOiB7dG9wOiAxLCBib3R0b206IDEsIGxlZnQ6IDMsIHJpZ2h0OiAzfVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGNvbG9yOiBvcHRpb25zLmNvbG9yXG5cdFx0XHRzZWxlY3RlZENvbG9yOiBvcHRpb25zLnNlbGVjdGVkQ29sb3Jcblx0XHRcdHNlY29uZGFyeUNvbG9yOiBvcHRpb25zLnNlY29uZGFyeUNvbG9yXG5cdFx0XHRmb250RmFtaWx5OiBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGZvbnRTaXplOiBvcHRpb25zLmZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBvcHRpb25zLmZvbnRXZWlnaHRcblx0XHRcdHNoYXBlczogW11cblx0XHRcdGJvcmRlclJhZGl1czogb3B0aW9ucy5ib3JkZXJSYWRpdXNcblx0XHRcdHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZ1xuXHRcdFx0Zm9jdXNlZEVsZW1lbnQ6IHVuZGVmaW5lZFxuXHRcdFx0ZW5hYmxlZDogZmFsc2Vcblx0XHRcdHNjcmVlbkVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0bGF5ZXJzOiBbXVxuXHRcdFx0Y29udGFpbmVyczogW11cblx0XHRcdHRpbWVyOiB1bmRlZmluZWRcblx0XHRcdF9vbmx5VmlzaWJsZTogdHJ1ZVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdEZyYW1lci5DdXJyZW50Q29udGV4dC5kb21FdmVudE1hbmFnZXIud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgQHVwZGF0ZSlcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXHRcdEBjb250ZXh0LmNoaWxkTm9kZXNbMl0uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XCJvbmx5VmlzaWJsZVwiLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9vbmx5VmlzaWJsZVxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0cmV0dXJuIGlmIHR5cGVvZiBib29sIGlzbnQgJ2Jvb2xlYW4nXG5cdFx0XHRcdEBfb25seVZpc2libGUgPSBib29sXG5cblx0XHRGcmFtZXIuRGV2aWNlLm9uIFwiY2hhbmdlOmRldmljZVR5cGVcIiwgPT5cblx0XHRcdFV0aWxzLmRlbGF5IDAsIEB1cGRhdGVcblxuXHR0b2dnbGU6IChldmVudCwgb3BlbikgPT5cblx0XHQjIHJldHVybiBpZiBGcmFtZXIuRGV2aWNlLmhhbmRzLmlzQW5pbWF0aW5nXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJgXCIgb3IgZXZlbnQua2V5IGlzIFwiPFwiIG9yIG9wZW4gaXMgdHJ1ZVxuXHRcdFx0aWYgQG9wZW5lZCB0aGVuIEBkaXNhYmxlKCkgZWxzZSBAZW5hYmxlKClcblx0XHRcdEBvcGVuZWQgPSAhQG9wZW5lZFxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCIvXCIgb3IgZXZlbnQua2V5IGlzIFwiPlwiXG5cdFx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRcdGlmIEBob3ZlcmVkTGF5ZXIgaXMgQHNlbGVjdGVkTGF5ZXJcblx0XHRcdFx0QHVuc2V0U2VsZWN0ZWRMYXllcigpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzZXRTZWxlY3RlZExheWVyKClcblxuXHRcdFx0cmV0dXJuXG5cblx0IyBvcGVuIHRoZSBwYW5lbCwgc3RhcnQgbGlzdGVuaW5nIGZvciBldmVudHNcblx0ZW5hYmxlOiA9PlxuXHRcdEBfY2FudmFzQ29sb3IgPSBDYW52YXMuYmFja2dyb3VuZENvbG9yXG5cdFx0Y3R4LnNldENvbnRleHQoKVxuXG5cdFx0QHRyYW5zaXRpb24odHJ1ZSlcblxuXHRkaXNhYmxlOiA9PlxuXHRcdEB1bmZvY3VzKClcblx0XHRAZW5hYmxlZCA9IGZhbHNlXG5cblx0XHRAdHJhbnNpdGlvbihmYWxzZSlcblxuXHR0cmFuc2l0aW9uOiAob3BlbiA9IHRydWUsIHNlY29uZHMgPSAuNSkgPT5cblx0XHRoYW5kcyA9IEZyYW1lci5EZXZpY2UuaGFuZHNcblxuXHRcdGhhbmRzLm9uIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cblx0XHRoYW5kcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRoYW5kcy5vZmYgXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblx0XHRcdEBlbmFibGVkID0gQG9wZW5lZCA9IG9wZW5cblxuXHRcdFx0aWYgb3BlblxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU91dCwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZC5vbiBFdmVudHMuTW91c2VPdmVyLCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmJhY2tncm91bmQub2ZmIEV2ZW50cy5Nb3VzZU92ZXIsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRAZm9jdXMoKVxuXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cblx0XHRtaWRYID0gaGFuZHMuX2NvbnRleHQuaW5uZXJXaWR0aCAvIDJcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMuYW5pbWF0ZVxuXHRcdFx0bWlkWDogaWYgb3BlbiB0aGVuIG1pZFggLSAxMTIgZWxzZSBtaWRYXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiBzZWNvbmRzXG5cdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMTApXG5cblx0c2hvd1RyYW5zaXRpb246ID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRvcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFggLSA1NiwgbWlkWCAtIDExMl0sIFxuXHRcdFx0WzAsIDFdLCBcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRmYWN0b3IgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdGhhbmRzLm1pZFgsXG5cdFx0XHRbbWlkWCwgbWlkWCAtIDExMl0sXG5cdFx0XHRbMCwgMV0sXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0QHNwZWNQYW5lbC5wYW5lbC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eVxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBDb2xvci5taXggQF9jYW52YXNDb2xvciwncmdiYSgzMCwgMzAsIDMwLCAxLjAwMCknLCBmYWN0b3JcblxuXHQjIHVwZGF0ZSB3aGVuIHNjcmVlbiBzaXplIGNoYW5nZXNcblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQG9wZW5lZFxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5taWRYIC09IDEyMlxuXG5cdFx0Y3R4LnNldENvbnRleHQoKVxuXHRcdEBmb2N1cygpXG5cblx0IyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudFxuXHRnZXREaW1lbnNpb25zOiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRkID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0ZGltZW5zaW9ucyA9IHtcblx0XHRcdHg6IGQubGVmdFxuXHRcdFx0eTogZC50b3Bcblx0XHRcdHdpZHRoOiBkLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGQuaGVpZ2h0XG5cdFx0XHRtaWRYOiBkLmxlZnQgKyAoZC53aWR0aCAvIDIpXG5cdFx0XHRtaWRZOiBkLnRvcCArIChkLmhlaWdodCAvIDIpXG5cdFx0XHRtYXhYOiBkLmxlZnQgKyBkLndpZHRoXG5cdFx0XHRtYXhZOiBkLnRvcCArIGQuaGVpZ2h0XG5cdFx0XHRmcmFtZTogZFxuXHRcdH1cblxuXHRcdHJldHVybiBkaW1lbnNpb25zXG5cblx0IyBtYWtlIGEgcmVsYXRpdmUgZGlzdGFuY2UgbGluZVxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIHBvaW50QVswXSBpcyBwb2ludEJbMF1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdIC0gNX0gI3twb2ludEFbMV19IEwgI3twb2ludEFbMF0gKyA1fSAje3BvaW50QVsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA1fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDV9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF19ICN7cG9pbnRCWzFdIC0gNX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIHRoZSBsYWJlbCBib3ggZm9yIGRpc3RhbmNlIGxpbmVzXG5cdG1ha2VMYWJlbDogKHgsIHksIHRleHQpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogeFxuXHRcdFx0eTogeVxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogQGZvbnRGYW1pbHlcblx0XHRcdCdmb250LXNpemUnOiBAZm9udFNpemVcblx0XHRcdCdmb250LXdlaWdodCc6IEBmb250V2VpZ2h0XG5cdFx0XHRmaWxsOiBAc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdHRleHQ6IE1hdGguZmxvb3IodGV4dCAvIEByYXRpbylcblxuXHRcdGwgPSBAZ2V0RGltZW5zaW9ucyhsYWJlbC5lbGVtZW50KVxuXG5cdFx0bGFiZWwueCA9IHggLSBsLndpZHRoIC8gMlxuXHRcdGxhYmVsLnkgPSB5ICsgbC5oZWlnaHQgLyA0IC0gMVxuXG5cdFx0Ym94ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBsYWJlbC54IC0gQHBhZGRpbmcubGVmdFxuXHRcdFx0eTogbGFiZWwueSAtIGwuaGVpZ2h0ICsgMVxuXHRcdFx0d2lkdGg6IGwud2lkdGggKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogbC5oZWlnaHQgKyBAcGFkZGluZy50b3AgKyBAcGFkZGluZy5ib3R0b20gKyAxXG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IG5ldyBDb2xvcihjb2xvcikuZGFya2VuKDQwKVxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHQjIG1ha2UgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBmb3Igc2VsZWN0ZWQgLyBob3ZlcmVkIGVsZW1lbnRzXG5cdG1ha2VSZWN0T3ZlcmxheXM6IChzLCBoKSA9PlxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXG5cdFx0aWYgQGhvdmVyZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblx0XHRlbHNlXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKDApXG5cdFx0ZWxzZVxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoLjIpXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIGRhc2hlZCBsaW5lcyBmcm9tIGJvdW5kaW5nIHJlY3QgdG8gc2NyZWVuIGVkZ2Vcblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWQsIGhvdmVyZWQpID0+XG5cblx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRAaG92ZXJlZExheWVyID0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdHMgPSBAZ2V0RGltZW5zaW9ucyhAc2VsZWN0ZWRMYXllci5fZWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoQGhvdmVyZWRMYXllci5fZWxlbWVudClcblx0XHRmID0gQGdldERpbWVuc2lvbnMoRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQpXG5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblxuXHRcdEByYXRpbyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRAbWFrZURhc2hlZExpbmVzKHMsIGYsIEBzZWxlY3RlZENvbG9yLCA1KVxuXG5cdFx0QG1ha2VSZWN0T3ZlcmxheXMocywgaClcblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdCMgc2V0IHRoZSBwYW5lbCB3aXRoIGN1cnJlbnQgcHJvcGVydGllc1xuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXI/IGFuZCBAc2VsZWN0ZWRMYXllciBpc250IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRsYXllciA9IEBzZWxlY3RlZExheWVyXG5cdFx0ZWxzZSBpZiBAaG92ZXJlZExheWVyP1xuXHRcdFx0bGF5ZXIgPSBAaG92ZXJlZExheWVyXG5cdFx0ZWxzZVxuXHRcdFx0QHNwZWNQYW5lbC5jbGVhclByb3BzKClcblx0XHRcdHJldHVyblxuXG5cdFx0cHJvcHMgPSBsYXllci5wcm9wc1xuXG5cdFx0Xy5hc3NpZ24gcHJvcHMsXG5cdFx0XHR4OiBsYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHR5OiBsYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHRjb21wb25lbnROYW1lOiBsYXllci5jb25zdHJ1Y3Rvci5uYW1lXG5cdFx0XHRjb21wb25lbnROYW1lczogQGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQpXG5cdFx0XHRwYXJlbnROYW1lOiBsYXllci5wYXJlbnQ/Lm5hbWVcblxuXHRcdF8uYXNzaWduIEBzcGVjUGFuZWwsIHByb3BzXG5cblx0XHRAc3BlY1BhbmVsLnNldFRleHRTdHlsZXMobGF5ZXIuZm9udEZhbWlseSlcblxuXHRzZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRsYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGV2ZW50Py50YXJnZXQpXG5cdFx0cmV0dXJuIGlmIG5vdCBAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIpXG5cblx0XHRAaG92ZXJlZExheWVyID0gbGF5ZXJcblx0XHRAdHJ5Rm9jdXMoZXZlbnQpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0dW5zZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRAaG92ZXJlZExheWVyID0gdW5kZWZpbmVkXG5cdFx0VXRpbHMuZGVsYXkgLjA1LCA9PlxuXHRcdFx0aWYgbm90IEBob3ZlcmVkTGF5ZXIgdGhlbiBAZm9jdXMoKVxuXG5cdHNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAaG92ZXJlZExheWVyXG5cblx0XHRAc2VsZWN0ZWRMYXllciA9IEBob3ZlcmVkTGF5ZXJcblx0XHRAZm9jdXMoKVxuXG5cdHVuc2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRAc2VsZWN0ZWRMYXllciA9IHVuZGVmaW5lZFxuXG5cblx0IyBGaW5kIGFuIGVsZW1lbnQgdGhhdCBiZWxvbmdzIHRvIGEgRnJhbWVyIExheWVyXG5cdGZpbmRMYXllckVsZW1lbnQ6IChlbGVtZW50KSAtPlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudC5jbGFzc0xpc3RcblxuXHRcdGlmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcmFtZXJMYXllcicpXG5cdFx0XHRyZXR1cm4gZWxlbWVudFxuXG5cdFx0QGZpbmRMYXllckVsZW1lbnQoZWxlbWVudC5wYXJlbnROb2RlKVxuXG5cdCMgRmluZCBhIEZyYW1lciBMYXllciB0aGF0IG1hdGNoZXMgYSBGcmFtZXIgTGF5ZXIgZWxlbWVudFxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGVsZW1lbnQgPSBAZmluZExheWVyRWxlbWVudChlbGVtZW50KVxuXHRcdGxheWVyID0gXy5maW5kKEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzLCBbJ19lbGVtZW50JywgZWxlbWVudF0pXG5cblx0XHRyZXR1cm4gbGF5ZXJcblxuXHRnZXRMYXllcklzVmlzaWJsZTogKGxheWVyKSA9PlxuXHRcdGlmIG5vdCBAX29ubHlWaXNpYmxlXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdFx0aWYgbGF5ZXIub3BhY2l0eSBpcyAwIG9yIGxheWVyLnZpc2libGUgaXMgZmFsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdFx0QGdldExheWVySXNWaXNpYmxlKGxheWVyLnBhcmVudClcblxuXG5cdCMgRmluZCBhIG5vbi1zdGFuZGFyZCBDb21wb25lbnQgdGhhdCBpbmNsdWRlcyBhIExheWVyXG5cdGdldENvbXBvbmVudEZyb21MYXllcjogKGxheWVyLCBuYW1lcyA9IFtdKSA9PlxuXHRcdGlmIG5vdCBsYXllclxuXHRcdFx0cmV0dXJuIG5hbWVzLmpvaW4oJywgJylcblxuXHRcdGlmIG5vdCBfLmluY2x1ZGVzKFtcIkxheWVyXCIsIFwiVGV4dExheWVyXCIsIFwiU2Nyb2xsQ29tcG9uZW50XCJdLCBsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXHRcdFx0bmFtZXMucHVzaChsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXG5cdFx0QGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQsIG5hbWVzKVxuXG5cblx0IyBEZWxheSBmb2N1cyBieSBhIHNtYWxsIGFtb3VudCB0byBwcmV2ZW50IGZsYXNoaW5nXG5cdHRyeUZvY3VzOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QGZvY3VzRWxlbWVudCA9IGV2ZW50LnRhcmdldFxuXHRcdGRvIChldmVudCkgPT5cblx0XHRcdFV0aWxzLmRlbGF5IC4wNSwgPT5cblx0XHRcdFx0aWYgQGZvY3VzRWxlbWVudCBpc250IGV2ZW50LnRhcmdldFxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcblx0XHRcdFx0QGZvY3VzKClcblxuXHQjIENoYW5nZSBmb2N1cyB0byBhIG5ldyBob3ZlcmVkIG9yIHNlbGVjdGVkIGVsZW1lbnRcblx0Zm9jdXM6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QHVuZm9jdXMoKVxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRAaG92ZXJlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKClcblx0XHRAc2hvd0Rpc3RhbmNlcygpXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdGN0eC5yZW1vdmVBbGwoKVxuXG5cbmV4cG9ydHMuZ290Y2hhID0gZ290Y2hhID0gbmV3IEdvdGNoYVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURjQSxJQUFBLHVPQUFBO0VBQUE7Ozs7QUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUFB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
