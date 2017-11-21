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
        var device, selected;
        device = deviceOptions[this.selectedIndex];
        selected = this.options[this.selectedIndex];
        Framer.Device.deviceType = device.name;
        Framer.Device._context.devicePixelRatio = 0;
        return Utils.delay(0, (function(_this) {
          return function() {
            return Framer.Device._context.devicePixelRatio = device.value.devicePixelRatio;
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
    this.getComponentFromLayer = bind(this.getComponentFromLayer, this);
    this.getLayerFromElement = bind(this.getLayerFromElement, this);
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
      timer: void 0
    });
    document.addEventListener('keyup', this.toggle);
    Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this.update);
    this.context = document.getElementsByClassName('framerLayer DeviceScreen')[0];
    this.context.classList.add('hoverContext');
    this.context.childNodes[2].classList.add('IgnorePointerEvents');
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
          Framer.Device.screen.on(Events.Click, _this.setSelectedLayer);
        } else {
          Framer.Device.screen.off(Events.MouseOver, _this.setHoveredLayer);
          Framer.Device.screen.off(Events.MouseOut, _this.unsetHoveredLayer);
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
    if (!this.enabled) {
      return;
    }
    if (!event) {
      return;
    }
    if (event.target.classList.contains('SpecElement')) {
      return;
    }
    if (event.target.classList.contains('mememeLink')) {
      return;
    }
    this.hoveredLayer = this.getLayerFromElement(event != null ? event.target : void 0);
    return this.tryFocus(event);
  };

  Gotcha.prototype.unsetHoveredLayer = function() {
    this.hoveredLayer = void 0;
    if (this.selectedLayer == null) {
      return this.unfocus();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3dvcmsvR2l0SHViL2dvdGNoYS9leGFtcGxlLmZyYW1lci9tb2R1bGVzL2dvdGNoYS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG4jIFx0ZDgnICAgYDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuIyBcdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cbiMgXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcbiMgXHRZOC4gICAuODggODguICAuODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4XG4jIFx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQOFxuIyBcdFxuIyBcdFxuIyBieSBAc3RldmVydWl6b2tcbiNcbiNcbiMgQSBGcmFtZXIgbW9kdWxlIGZvciBoYW5kb2ZmLiBJdCB3b3JrcyBraW5kIG9mIGxpa2UgdGhhdCBvdGhlciB0b29sLlxuXG5cbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbnN2Z0NvbnRleHQgPSB1bmRlZmluZWRcbmN0eCA9IHVuZGVmaW5lZFxuXG5zdGFydE9wZW4gPSBmYWxzZVxuXG4jIGRlYnVnZ2luZ1xuXG4jIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2ZW50KSAtPiBwcmludCBldmVudC50YXJnZXQuY2xhc3NMaXN0XG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VQaG9uZScpWzBdPy5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG5VdGlscy5pbnNlcnRDU1MgXCJcIlwiXG5cdFxuXHQjU3BlY0NvbnRhaW5lciB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHJpZ2h0OiAwO1xuXHRcdHRvcDogMDtcblx0XHRib3R0b206IDA7XG5cdFx0d2lkdGg6IDIyNHB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjAsIDIwLCAyMCwgMS4wMDApO1xuXHRcdGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSg0NSwgNDUsIDQ1LCAxLjAwMCk7XG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbDtcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHRcdGN1cnNvcjogZGVmYXVsdDtcblx0fVxuXG5cdC5TcGVjTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZSB7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHQtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZTpob3ZlciB7XG5cdFx0b3V0bGluZTogMXB4IHNvbGlkIHJnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCkgIWltcG9ydGFudDtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZTphY3RpdmUge1xuXHRcdG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCkgIWltcG9ydGFudDtcblx0fVxuXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93Q29waWVkIHtcblx0XHQwJSB7IFxuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApO1xuXHRcdH1cblxuXHRcdDEwMCUge1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEuMDAwKTtcblx0XHR9XG5cdH1cblxuXHQuY29waWVkIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG5cdH1cblxuXHQubWVtZW1lTGluayB7XG5cdFx0b3BhY2l0eTogLjQ7XG5cdH1cblxuXHQubWVtZW1lTGluazpob3ZlciB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHRcblx0I2xpbmtlZGluX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogNjhweDtcblx0fVxuXG5cdFxuXHQjdHdpdHRlcl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA0cHg7XG5cdFx0cmlnaHQ6IDRweDtcblx0fVxuXG5cdCNnaXRodWJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiAzNnB4O1xuXHR9XG5cblx0LmZyYW1lckxheWVyIHsgXG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHR9IFxuXHRcblx0Lklnbm9yZVBvaW50ZXJFdmVudHMge1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHR9XG5cblx0LmRyb3Bkb3duIHtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cIlwiXCJcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhcbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcbiMgXHRcbiMgXHRcblxuXG5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5wYW5lbC5pZCA9ICdTcGVjQ29udGFpbmVyJ1xudmlld0MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtRGVmYXVsdCcpXG5VdGlscy5kZWxheSAwLCA9PiB2aWV3Qy5hcHBlbmRDaGlsZChwYW5lbClcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICA4ODg4ODhiYVxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICA4OCAgICBgOGJcbiMgXHRgWTg4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gZDg4ODhQIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAuICAuZFBcbiMgXHQgICAgICBgOGIgODhvb29vZDggODgnICBgXCJcIiA4OCcgIGA4OCA4OG9vb29kOCAgIDg4ICAgIDg4ICAgYDhiLiA4OCcgIGA4OCAgYDhiZDgnXG4jIFx0ZDgnICAgLjhQIDg4LiAgLi4uIDg4LiAgLi4uIDg4ICAgICAgIDg4LiAgLi4uICAgODggICAgODggICAgLjg4IDg4LiAgLjg4ICAuZDg4Yi5cbiMgXHQgWTg4ODg4UCAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICAgICAgYDg4ODg4UCcgICBkUCAgICA4ODg4ODg4OFAgYDg4ODg4UCcgZFAnICBgZFBcbiMgXHRcbiMgXHRcblxuc2VjcmV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWNyZXRCb3gpXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAjIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICMgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICMgXHRgWTg4ODg4Yi4gODggICAgLjhQIDg4ICAgICAgICAgICA4OCAgICAgICAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFAgLmQ4ODg4Yi5cbiAjIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIyBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICMgXHQgWTg4ODg4UCAgODg4ODg4JyAgICBgODg4ODgnICAgICAgWTg4ODg4UCcgYDg4ODg4UCcgZFAgIGRQICBkUCA4OFk4ODhQJyBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgIGRQICAgYDg4ODg4UCdcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuXG5cbiMjI1xuXHQgLC0uICAuICAgLCAgLC0uICAsLS4gICAgICAgICAuICAgICAgICAgICAuXG5cdCggICBgIHwgIC8gIC8gICAgLyAgICAgICAgICAgIHwgICAgICAgICAgIHxcblx0IGAtLiAgfCAvICAgfCAtLiB8ICAgICwtLiA7LS4gfC0gICwtLiAuICwgfC1cblx0LiAgICkgfC8gICAgXFwgIHwgXFwgICAgfCB8IHwgfCB8ICAgfC0nICBYICB8XG5cdCBgLScgICcgICAgICBgLScgIGAtJyBgLScgJyAnIGAtJyBgLScgJyBgIGAtJ1xuXHRcbiMjI1xuXG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKEBzdmcpXG5cdFx0QHN2Zy5zdHlsZVsnei1pbmRleCddID0gJzk5OSdcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbkJhY2tncm91bmQuX2VsZW1lbnRcblxuXHRcdEBzZXRDb250ZXh0KClcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdHNldEF0dHJpYnV0ZXM6IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRzZXRDb250ZXh0OiA9PlxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdEBzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRhZGRTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzaGFwZXMucHVzaChzaGFwZSlcblx0XHRAc2hvd1NoYXBlKHNoYXBlKVxuXHRcdFxuXHRyZW1vdmVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBoaWRlU2hhcGUoc2hhcGUpXG5cdFx0Xy5wdWxsKEBzaGFwZXMsIHNoYXBlKVxuXHRcdFxuXHRoaWRlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFxuXHRzaG93U2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLmFwcGVuZENoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0XG5cdGFkZERlZjogKGRlZikgLT5cblx0XHRAc3ZnRGVmcy5hcHBlbmRDaGlsZChkZWYpXG5cblx0cmVtb3ZlQWxsOiA9PlxuXHRcdGZvciBzaGFwZSBpbiBAc2hhcGVzXG5cdFx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0QHNoYXBlcyA9IFtdXG5cblxuIyMjXG5cdCAsLS4gIC4gICAsICAsLS4gICwtLiAgLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLiA7LS5cblx0KCAgIGAgfCAgLyAgLyAgICAoICAgYCB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHwgIClcblx0IGAtLiAgfCAvICAgfCAtLiAgYC0uICB8LS4gLC06IDstLiAsLS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLC18IHwtJ1xuXHQuICAgKSB8LyAgICBcXCAgfCAuICAgKSB8IHwgfCB8IHwgfCB8LScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8IHxcblx0IGAtJyAgJyAgICAgIGAtJyAgYC0nICAnICcgYC1gIHwtJyBgLScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYC0nICdcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt0eXBlOiAnY2lyY2xlJ30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHBhcmVudCA9IHN2Z0NvbnRleHRcblx0XHRcblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXG5cdFx0XHRvcHRpb25zLnR5cGVcblx0XHRcdClcblxuXHRcdEBzZXRDdXN0b21Qcm9wZXJ0eSgndGV4dCcsICd0ZXh0Q29udGVudCcsICd0ZXh0Q29udGVudCcsIG9wdGlvbnMudGV4dClcblx0XHRcdFx0XG5cdFx0IyBhc3NpZ24gYXR0cmlidXRlcyBzZXQgYnkgb3B0aW9uc1xuXHRcdGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdEBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBwYXJlbnQuYWRkU2hhcGUoQClcblx0XHRcblx0XHRAc2hvdygpXG5cdFx0XHRcblx0c2V0QXR0cmlidXRlOiAoa2V5LCB2YWx1ZSkgPT5cblx0XHRyZXR1cm4gaWYga2V5IGlzICd0ZXh0J1xuXHRcdGlmIG5vdCBAW2tleV0/XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRnZXQ6ID0+XG5cdFx0XHRcdFx0cmV0dXJuIEBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXG5cdFx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0XHRAZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcblx0XHRAW2tleV0gPSB2YWx1ZVxuXHRcblx0c2V0Q3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIHJldHVyblZhbHVlLCBzZXRWYWx1ZSwgc3RhcnRWYWx1ZSkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIHJldHVyblZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGVsZW1lbnRbc2V0VmFsdWVdID0gdmFsdWVcblxuXHRcdEBbdmFyaWFibGVOYW1lXSA9IHN0YXJ0VmFsdWVcblxuXHRoaWRlOiAtPiBcblx0XHRAcGFyZW50LmhpZGVTaGFwZShAKVxuXHRcblx0c2hvdzogLT4gXG5cdFx0QHBhcmVudC5zaG93U2hhcGUoQClcblx0XHRcblx0cmVtb3ZlOiAtPlxuXHRcdEBwYXJlbnQucmVtb3ZlU2hhcGUoQClcblxuXG5jbGFzcyBEYXNoZWRMaW5lIGV4dGVuZHMgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChwb2ludEEsIHBvaW50QiwgY29sb3IgPSAnIzAwMCcsIG9mZnNldCA9IDAsIG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIG9wdGlvbnMsXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QS54fSAje3BvaW50QS55fSBMICN7cG9pbnRCLnh9ICN7cG9pbnRCLnl9XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXHRcdFx0J3N0cm9rZS1kYXNoYXJyYXknOiBcIjUsIDVcIlxuXHRcdFx0J3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0XG5cblx0XHRzdXBlciBvcHRpb25zXG5cblxuY3R4ID0gbmV3IFNWR0NvbnRleHRcblxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuIyBcdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICBZOC4gICAuODggODguICAuODggODggIDg4ICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICA4OCAgIDg4ICAgICAgICAgODhcbiMgXHQgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLC0tLiAuICAgICAgICAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgICB8ICAgICAgICAgICAgICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfC0gICB8ICwtLiA7LS4tLiAsLS4gOy0uIHwtXG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8LScgfCB8IHwgfC0nIHwgfCB8XG5cdCBgLScgIHwtJyBgLScgYC0nIGAtLScgJyBgLScgJyAnICcgYC0nICcgJyBgLSdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChjbGFzc05hbWUsIG9wdGlvbnMgPSB7fSwgdGV4dCkgLT5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCBjbGFzc05hbWVcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkICdTcGVjRWxlbWVudCdcblxuXHRcdF8uYXNzaWduIEBlbGVtZW50LnN0eWxlLCBvcHRpb25zXG5cblx0XHRwYW5lbC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdEByb290RWxlbWVudCA9IEBlbGVtZW50XG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwgICAgICAgIC4gICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgICAgICB8ICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLTogfC0uICwtLiB8XG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8IHwgfCB8LScgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLS0nIGAtYCBgLScgYC0nICdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0xhYmVsIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ25vbmUnXG5cdFx0XHQnZm9udC1mYW1pbHknOiAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdmb250LXdlaWdodCc6ICc0MDAnXG5cdFx0XHQnY29sb3InOiAncmdiYSgxMzYsIDEzNiwgMTM2LCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5cdFx0QHRleHRMYXllciA9IG5ldyBTcGVjRWxlbWVudCAnU3BlY0xhYmVsJyxcblx0XHRcdCdmb250LWZhbWlseSc6IG9wdGlvbnNbJ2ZvbnQtZmFtaWx5J10gPyAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogb3B0aW9uc1snZm9udC1zaXplJ10gPyAnMWVtJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0Jzogb3B0aW9uc1snZm9udC13ZWlnaHQnXSA/ICc1MDAnXG5cdFx0XHQnY29sb3InOiBvcHRpb25zWydjb2xvciddID8gJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMS4wMDApJ1xuXHRcdFx0J2xlZnQnOiBvcHRpb25zLmxlZnRcblx0XHRcdCdyaWdodCc6IG9wdGlvbnMucmlnaHRcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0TGF5ZXIuZWxlbWVudFxuXG5cdFx0b3B0aW9ucy5wYXJlbnQ/LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3RleHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInIHRoZW4gdmFsdWUgPSB2YWx1ZS50b0ZpeGVkKClcblx0XHRcdFx0QHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblxuXHRcdEB0ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJydcblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLiAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgXFwgbyAgICAgbyAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgfCAuIC4gLCAuICwtfCAsLS4gOy0uXG5cdC4gICApIHwgfCB8LScgfCAgIHwgIC8gfCB8LyAgfCB8IHwgfC0nIHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICAnICcgICAnIGAtJyBgLScgJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRGl2aWRlciBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc4cHgnXG5cdFx0XHQnd2lkdGgnOiAnMjA4cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzFweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAnXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cblx0XHRzdXBlciAnU3BlY0RpdmlkZXInLCBvcHRpb25zXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICBgLScgJyBgXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNCb3ggZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogdW5kZWZpbmVkXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzk2cHgnXG5cdFx0XHQnd2lkdGgnOiAnNjRweCdcblx0XHRcdCdoZWlnaHQnOiAnMjRweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2JveC1zaGFkb3cnOiAnaW5zZXQgMHB4IDBweCAwcHggNHB4IHJnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgJ1NwZWNMYWJlbCcsIG9wdGlvbnNcblxuXG4jIyNcblxuXHQgLC0uICAgICAgICAgICAgICAgLC0uICAgICAuICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgLyAgICAgICAgfCAgICAgICAgIHwgIC8gICAgICB8ICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICAgICwtLiB8ICwtLiA7LS4gfCAvICAgLC06IHwgLiAuICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgXFwgICAgfCB8IHwgfCB8IHwgICB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICBgLScgYC0nICcgYC0nICcgICAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuY2xhc3MgU3BlY0NvbG9yVmFsdWVCb3ggZXh0ZW5kcyBTcGVjQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc5NnB4J1xuXHRcdFx0J3dpZHRoJzogJzY0cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzI0cHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblx0XHRcdCdib3gtc2hhZG93JzogJ2luc2V0IDBweCAwcHggMHB4IDRweCByZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdmFsdWUgPyAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0aWYgQGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTcGVjU2VsZWN0YWJsZScpXG5cdFx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdFx0XHRlbHNlIGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdEB2YWx1ZSA9IG9wdGlvbnMudmFsdWVcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvICAgIHwgfCB8IHwgfCB8LScgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY1ZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdmb250LWZhbWlseSc6ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjQyZW0nXG5cdFx0XHQncGFkZGluZy10b3AnOiAnNXB4J1xuXHRcdFx0J3BhZGRpbmctbGVmdCc6ICc4cHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2xpbmUtaGVpZ2h0JzogJzFlbSdcblx0XHRcdCdvdmVyZmxvdyc6ICdoaWRkZW4nXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAdmFsdWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdsZWZ0JzogJzZweCdcblx0XHRcdCd0b3AnOiAnNnB4J1xuXHRcdFx0J2NvbG9yJzogJyNGRkYnXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnNTAwJ1xuXG5cdFx0QHVuaXRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJy45ZW0nXG5cdFx0XHQncmlnaHQnOiAnMnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQndGV4dC1hbGlnbic6ICdyaWdodCdcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRcdFx0ZWxzZSBpZiBAZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNTZWxlY3RhYmxlJylcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gJydcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgIC4gICAgIC4gICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgLiB8IG8gICB8ICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCApICkgLiAsLXwgLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvfC8gIHwgfCB8IHwtJyB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICcgJyAgICcgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjV2lkZVZhbHVlQm94IGV4dGVuZHMgU3BlY1ZhbHVlQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEzNnB4J1xuXG4jIFNwZWMgRHJvcGRvd24gQm94XG5cbmNsYXNzIFNwZWNEcm9wZG93bkJveCBleHRlbmRzIFNwZWNXaWRlVmFsdWVCb3hcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRvcHRpb25zOiBbXG5cdFx0XHRcdHtuYW1lOiAnQmx1ZScsIHZhbHVlOiAnYmx1ZSd9LCBcblx0XHRcdFx0e25hbWU6ICdSZWQnLCB2YWx1ZTogJ3JlZCd9XG5cdFx0XHRcdHtuYW1lOiAnR3JlZW4nLCB2YWx1ZTogJ2dyZWVuJ31cblx0XHRcdF1cblx0XHRcdGNhbGxiYWNrOiAodmFsdWUpIC0+IG51bGxcblx0XHRcdHNlbGVjdGVkOiAwXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrXG5cblx0XHRAZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMzZweCdcblxuXHRcdEBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKVxuXHRcdEBzZWxlY3QuY2xhc3NMaXN0LmFkZCgnZHJvcGRvd24nKVxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKEBzZWxlY3QpXG5cdFx0QHNlbGVjdC5vbmNoYW5nZSA9IEBzZXRTZWxlY3RWYWx1ZVxuXG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBvcHRpb25zLm9wdGlvbnNcblx0XHRcdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuXHRcdFx0by52YWx1ZSA9IG9wdGlvbi52YWx1ZVxuXHRcdFx0by5sYWJlbCA9IG9wdGlvbi5uYW1lXG5cdFx0XHRvLmlubmVySFRNTCA9IG8ubmFtZVxuXHRcdFx0QHNlbGVjdC5hcHBlbmRDaGlsZChvKVxuXG5cdFx0XHRpZiBpIGlzIG9wdGlvbnMuc2VsZWN0ZWRcblx0XHRcdFx0by5zZWxlY3RlZCA9IHRydWVcblx0XHRcdFx0QHZhbHVlID0gQHNlbGVjdC5vcHRpb25zW0BzZWxlY3Quc2VsZWN0ZWRJbmRleF0ubGFiZWxcblxuXHRzZXRTZWxlY3RWYWx1ZTogPT5cblx0XHRAdmFsdWUgPSBAc2VsZWN0Lm9wdGlvbnNbQHNlbGVjdC5zZWxlY3RlZEluZGV4XS5sYWJlbFxuXHRcdGRvIF8uYmluZChAY2FsbGJhY2ssIEBzZWxlY3QpXG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuIyMjXG5cdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuXHQgICAgICBgOGIgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG5cdGQ4JyAgIC44UCA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC4uLiAgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG5cdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG5cdCAgICAgICAgICA4OFxuXHQgICAgICAgICAgZFBcbiMjI1xuXG5cbmNsYXNzIFNwZWNQYW5lbFxuXHRjb25zdHJ1Y3RvcjogLT5cblxuXHRcdEBwYW5lbCA9IHBhbmVsXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdwcm9wcycsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiBAX3Byb3BzXG5cdFx0XHRzZXQ6IChvYmopIC0+XG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdFx0XHRcdGlmIF8uaGFzKEBwcm9wcywga2V5KVxuXHRcdFx0XHRcdFx0QHByb3BzW2tleV0gPSB2YWx1ZVxuXG5cdFx0QHBhbmVsLnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblxuXHRcdGNvbDB4ID0gJzRweCdcblx0XHRjb2wxeCA9ICc4NHB4J1xuXHRcdGNvbDJ4ID0gJzE1NnB4J1xuXG5cdFx0cm93ID0gKG51bSwgb2Zmc2V0ID0gMCkgLT4gcmV0dXJuICgxNiArICgzNSAqIG51bSkgLSBvZmZzZXQpICsgJ3B4J1xuXG5cblx0XHQjIERldmljZVxuXG5cdFx0QGRldmljZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMClcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnRGV2aWNlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdGRldmljZU9wdGlvbnMgPSBbXVxuXHRcdGN1cnJlbnRLZXkgPSB1bmRlZmluZWRcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1xuXHRcdFx0aWYgXy5lbmRzV2l0aChrZXksICdoYW5kJylcblx0XHRcdFx0Y29udGludWVcblxuXG5cdFx0XHRpZiBub3QgdmFsdWUubWluU3R1ZGlvVmVyc2lvbj9cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpID4gdmFsdWUubWF4U3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZSBcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpIDwgdmFsdWUubWluU3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZXZpY2VPcHRpb25zLnB1c2hcblx0XHRcdFx0bmFtZToga2V5LCBcblx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cblx0XHRcdGlmIGtleSBpcyBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblx0XHRcdFx0Y3VycmVudEtleSA9IF8uaW5kZXhPZihcblx0XHRcdFx0XHRfLmtleXMoRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzKSwgXG5cdFx0XHRcdFx0a2V5XG5cdFx0XHRcdFx0KVxuXG5cdFx0QGRldmljZVNlbGVjdCA9IG5ldyBTcGVjRHJvcGRvd25Cb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0b3B0aW9uczogXy51bmlxKGRldmljZU9wdGlvbnMpIFxuXHRcdFx0c2VsZWN0ZWQ6IGN1cnJlbnRLZXlcblx0XHRcdGNhbGxiYWNrOiAoZXZlbnQpIC0+XG5cdFx0XHRcdGRldmljZSA9IGRldmljZU9wdGlvbnNbQHNlbGVjdGVkSW5kZXhdXG5cdFx0XHRcdHNlbGVjdGVkID0gQG9wdGlvbnNbQHNlbGVjdGVkSW5kZXhdXG5cdFx0XHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IGRldmljZS5uYW1lXG5cblx0XHRcdFx0IyBzaWxseSBmaXhcblx0XHRcdFx0RnJhbWVyLkRldmljZS5fY29udGV4dC5kZXZpY2VQaXhlbFJhdGlvID0gMFxuXHRcdFx0XHRVdGlscy5kZWxheSAwLCA9PiBcblx0XHRcdFx0XHRGcmFtZXIuRGV2aWNlLl9jb250ZXh0LmRldmljZVBpeGVsUmF0aW8gPSBkZXZpY2UudmFsdWUuZGV2aWNlUGl4ZWxSYXRpb1xuXG5cdFx0QHNwZWNEaXZpZGVyMSA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coMS4yNSwgMilcblxuXHRcdCMgcG9zXG5cblx0XHRAcG9zTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxLjc1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdQb3NpdGlvbidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAeFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMS43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAeVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMS43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3knXG5cblx0XHQjIHNpemVcblxuXHRcdEBzaXplTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygyLjc1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdTaXplJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEB3VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygyLjc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcyNTgnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdEBoVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygyLjc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcyNTgnXG5cdFx0XHR1bml0OiAnaCdcblxuXHRcdCMgYmFja2dyb3VuZFxuXG5cdFx0QGJnQ29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDMuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0JhY2tncm91bmQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGJnQ29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMy43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHQjIG9wYWNpdHlcblxuXHRcdEBvcGFjaXR5TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdyg0Ljc1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdPcGFjaXR5J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBvcGFjaXR5VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg0Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcxLjAnXG5cdFx0XHR1bml0OiAnYSdcblxuXHRcdCMgRGl2aWRlciAjIC0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAc3BlY0RpdmlkZXIxID0gbmV3IFNwZWNEaXZpZGVyXG5cdFx0XHR0b3A6IHJvdyg2LCAyKVxuXG5cdFx0IyBib3JkZXJcblxuXHRcdEBib3JkZXJDb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNi41LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGJvcmRlckNvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDYuNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAYm9yZGVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2LjUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzEnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdCMgcmFkaXVzXG5cblx0XHRAcmFkaXVzTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdyg3LjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1JhZGl1cydcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAcmFkaXVzVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg3LjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzAnXG5cblx0XHQjIHNoYWRvd1xuXG5cdFx0QHNoYWRvd0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coOC41LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdTaGFkb3cnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHNoYWRvd0NvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDguNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAc2hhZG93U3ByZWFkVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg4LjUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzEnXG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBzaGFkb3dYVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg5LjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzAnXG5cdFx0XHR1bml0OiAneCdcblxuXHRcdEBzaGFkb3dZVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg5LjUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzAnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdEBzaGFkb3dCbHVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMC41KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdibHVyJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDExLjc1LCAyKVxuXG5cdFx0IyBGb250XG5cblx0XHRAZm9udExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTIuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGZvbnRGYW1pbHlWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMi4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHQjIENvbG9yXG5cblx0XHRAY29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDEzLjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb2xvcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAY29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTMuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0QGZvbnRTdHlsZVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTMuMjUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXG5cdFx0IyBGb250IFNpemVcblxuXHRcdEBmb250U2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTQuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1NpemUnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGZvbnRTaXplVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxNC4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBmb250V2VpZ2h0VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxNC4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR1bml0OiAndydcblxuXHRcdCMgTGluZSBIZWlnaHRcblxuXHRcdEBsaW5lSGlnaHRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE1LjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdIZWlnaHQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGxpbmVIZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE1LjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdsaCdcblxuXHRcdCMgRGl2aWRlciAjIC0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAc3BlY0RpdmlkZXIyID0gbmV3IFNwZWNEaXZpZGVyXG5cdFx0XHR0b3A6IHJvdygxNi41LCAyKVxuXHRcdFxuXHRcdCMgTmFtZVxuXHRcdEBuYW1lTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxNylcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbmFtZVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE3KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgQ29tcG9uZW50XG5cblx0XHRAY29tcG9uZW50TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxOClcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnQ29tcG9uZW50J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBjb21wb25lbnRWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxOClcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHQjIFBhcmVudCBDb21wb25lbnRcblxuXHRcdEBwYXJlbnRDb21wb25lbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE5KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdQYXJ0IG9mJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBwYXJlbnRDb21wb25lbnRWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxOSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblxuXHRcdCMgTGlua3NcblxuXHRcdEBsaW5rZWRpbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAbGlua2VkaW5JY29uLmhyZWYgPSBcImh0dHA6Ly93d3cubGlua2VkaW4uY29tL2luL3N0ZXZlcnVpem9rXCJcblx0XHRAbGlua2VkaW5JY29uLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBpZD1cImxpbmtlZGluX2xvZ29cIiBjbGFzcz1cIm1lbWVtZUxpbmtcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSAwaC0xNGMtMi43NjEgMC01IDIuMjM5LTUgNXYxNGMwIDIuNzYxIDIuMjM5IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOSA1LTV2LTE0YzAtMi43NjEtMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTFoM3YxMXptLTEuNS0xMi4yNjhjLS45NjYgMC0xLjc1LS43OS0xLjc1LTEuNzY0cy43ODQtMS43NjQgMS43NS0xLjc2NCAxLjc1Ljc5IDEuNzUgMS43NjQtLjc4MyAxLjc2NC0xLjc1IDEuNzY0em0xMy41IDEyLjI2OGgtM3YtNS42MDRjMC0zLjM2OC00LTMuMTEzLTQgMHY1LjYwNGgtM3YtMTFoM3YxLjc2NWMxLjM5Ni0yLjU4NiA3LTIuNzc3IDcgMi40NzZ2Ni43NTl6XCIvPjwvc3ZnPidcblxuXHRcdEBnaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0QGdpdGh1Ykljb24uaHJlZiA9IFwiaHR0cDovL2dpdGh1Yi5jb20vc3RldmVydWl6b2svZ290Y2hhXCJcblx0XHRAZ2l0aHViSWNvbi5pbm5lckhUTUwgPSAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIGNsYXNzPVwibWVtZW1lTGlua1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAdHdpdHRlckljb24uaHJlZiA9IFwiaHR0cDovL3R3aXR0ZXIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRAdHdpdHRlckljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiIGlkPVwidHdpdHRlcl9sb2dvXCIgY2xhc3M9XCJtZW1lbWVMaW5rXCIgZGF0YS1uYW1lPVwiTG9nbyDigJQgRklYRURcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOnJnYmEoOTEsIDkxLCA5MSwgMS4wMDApO308L3N0eWxlPjwvZGVmcz48dGl0bGU+VHdpdHRlcl9Mb2dvX0JsdWU8L3RpdGxlPjxyZWN0IGNsYXNzPVwiY2xzLTFcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiLz48cGF0aCBjbGFzcz1cImNscy0yXCIgZD1cIk0xNTMuNjIsMzAxLjU5Yzk0LjM0LDAsMTQ1Ljk0LTc4LjE2LDE0NS45NC0xNDUuOTQsMC0yLjIyLDAtNC40My0uMTUtNi42M0ExMDQuMzYsMTA0LjM2LDAsMCwwLDMyNSwxMjIuNDdhMTAyLjM4LDEwMi4zOCwwLDAsMS0yOS40Niw4LjA3LDUxLjQ3LDUxLjQ3LDAsMCwwLDIyLjU1LTI4LjM3LDEwMi43OSwxMDIuNzksMCwwLDEtMzIuNTcsMTIuNDUsNTEuMzQsNTEuMzQsMCwwLDAtODcuNDEsNDYuNzhBMTQ1LjYyLDE0NS42MiwwLDAsMSw5Mi40LDEwNy44MWE1MS4zMyw1MS4zMywwLDAsMCwxNS44OCw2OC40N0E1MC45MSw1MC45MSwwLDAsMSw4NSwxNjkuODZjMCwuMjEsMCwuNDMsMCwuNjVhNTEuMzEsNTEuMzEsMCwwLDAsNDEuMTUsNTAuMjgsNTEuMjEsNTEuMjEsMCwwLDEtMjMuMTYuODgsNTEuMzUsNTEuMzUsMCwwLDAsNDcuOTIsMzUuNjIsMTAyLjkyLDEwMi45MiwwLDAsMS02My43LDIyQTEwNC40MSwxMDQuNDEsMCwwLDEsNzUsMjc4LjU1YTE0NS4yMSwxNDUuMjEsMCwwLDAsNzguNjIsMjNcIi8+PC9zdmc+J1xuXG5cdFx0Zm9yIGVsZW1lbnQgaW4gW0BsaW5rZWRpbkljb24sIEBnaXRodWJJY29uLCBAdHdpdHRlckljb25dXG5cdFx0XHRwYW5lbC5hcHBlbmRDaGlsZChlbGVtZW50KVxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZW1lbWVMaW5rJylcblxuXG5cdFx0IyAtLS0tXG5cblx0XHQjIHByb3BlcnRpZXNcblxuXHRcdHByb3BzID0gW1xuXHRcdFx0Wyd4JywgQHhWYWx1ZUJveF0sXG5cdFx0XHRbJ3knLCBAeVZhbHVlQm94XSxcblx0XHRcdFsnd2lkdGgnLCBAd1ZhbHVlQm94XVxuXHRcdFx0WydoZWlnaHQnLCBAaFZhbHVlQm94XVxuXHRcdFx0WydvcGFjaXR5JywgQG9wYWNpdHlWYWx1ZUJveCwgdHJ1ZV1cblx0XHRcdFsnYm9yZGVyV2lkdGgnLCBAYm9yZGVyVmFsdWVCb3hdXG5cdFx0XHRbJ2JvcmRlclJhZGl1cycsIEByYWRpdXNWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93U3ByZWFkJywgQHNoYWRvd1NwcmVhZFZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dYJywgQHNoYWRvd1hWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WScsIEBzaGFkb3dZVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd0JsdXInLCBAc2hhZG93Qmx1clZhbHVlQm94XVxuXHRcdFx0Wydmb250RmFtaWx5JywgQGZvbnRGYW1pbHlWYWx1ZUJveF1cblx0XHRcdFsnZm9udFNpemUnLCBAZm9udFNpemVWYWx1ZUJveF1cblx0XHRcdFsnZm9udFdlaWdodCcsIEBmb250V2VpZ2h0VmFsdWVCb3hdXG5cdFx0XHRbJ2xpbmVIZWlnaHQnLCBAbGluZUhlaWdodFZhbHVlQm94XVxuXHRcdFx0Wydmb250U3R5bGUnLCBAZm9udFN0eWxlVmFsdWVCb3hdXG5cdFx0XHRbJ2NvbXBvbmVudE5hbWUnLCBAY29tcG9uZW50VmFsdWVCb3hdXG5cdFx0XHRbJ2NvbXBvbmVudE5hbWVzJywgQHBhcmVudENvbXBvbmVudFZhbHVlQm94XVxuXHRcdFx0WyduYW1lJywgQG5hbWVWYWx1ZUJveF1cblx0XHRdXG5cblx0XHRjb2xvclByb3BzID0gW1xuXHRcdFx0WydiYWNrZ3JvdW5kQ29sb3InLCBAYmdDb2xvclZhbHVlQm94XVxuXHRcdFx0Wydib3JkZXJDb2xvcicsIEBib3JkZXJDb2xvclZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dDb2xvcicsIEBzaGFkb3dDb2xvclZhbHVlQm94XVxuXHRcdFx0Wydjb2xvcicsIEBjb2xvclZhbHVlQm94XVxuXHRcdF1cblxuXHRcdGZvciBwcm9wIGluIHByb3BzXG5cdFx0XHRAZGVmaW5lQ3VzdG9tUHJvcGVydHkocHJvcFswXSwgcHJvcFsxXSwgcHJvcFsyXSlcblx0XHRcdEBhZGRDb3B5RXZlbnQocHJvcFswXSwgcHJvcFsxXSlcblxuXHRcdGZvciBwcm9wIGluIGNvbG9yUHJvcHNcblx0XHRcdEBkZWZpbmVDdXN0b21Db2xvclByb3BlcnR5KHByb3BbMF0sIHByb3BbMV0sIHByb3BbMl0pXG5cdFx0XHRAYWRkQ29weUV2ZW50KHByb3BbMF0sIHByb3BbMV0pXG5cblx0ZGVmaW5lQ3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIGxheWVyLCBmbG9hdCkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogPT4gcmV0dXJuIEBwcm9wc1t2YXJpYWJsZU5hbWVdXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT5cblx0XHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXG5cdFx0XHRcdGlmIG5vdCB2YWx1ZT8gb3IgdmFsdWUgaXMgJzAnXG5cdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGlmIGZsb2F0XG5cdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlID8gJzAnKS50b0ZpeGVkKDIpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInXG5cdFx0XHRcdFx0dmFsdWUgPSBwYXJzZUludCh2YWx1ZSkudG9GaXhlZCgpXG5cdFx0XHRcdFxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdFxuXHRkZWZpbmVDdXN0b21Db2xvclByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllcikgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogPT4gcmV0dXJuIEBwcm9wc1t2YXJpYWJsZU5hbWVdXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT5cblx0XHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcblxuXHRhZGRDb3B5RXZlbnQ6ICh2YXJpYWJsZU5hbWUsIGxheWVyKSAtPlxuXHRcdGRvICh2YXJpYWJsZU5hbWUsIGxheWVyKSA9PlxuXHRcdFx0bGF5ZXIuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRcdEBjb3B5Q29udGVudChAW3ZhcmlhYmxlTmFtZV0pXG5cdFx0XHRcdEBoaWdobGlnaHQobGF5ZXIpXG5cblx0Y29weUNvbnRlbnQ6IChjb250ZW50KSA9PlxuXHRcdHNlY3JldEJveC52YWx1ZSA9IGNvbnRlbnRcblx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdGhpZ2hsaWdodDogKGxheWVyKSA9PlxuXHRcdHN0YXJ0Qm9yZGVyQ29sb3IgPSBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXVxuXHRcdGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddID0gJ3JnYmEoMTE4LCAyMzcsIDkzLCAxLjAwMCknXG5cdFx0cmVzZXQgPSA9PiBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXSA9IHN0YXJ0Qm9yZGVyQ29sb3JcblxuXHRcdF8uZGVsYXkocmVzZXQsIDEyMClcblxuXHRjbGVhclByb3BzOiA9PlxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEBwcm9wc1xuXHRcdFx0QFtrZXldID0gdW5kZWZpbmVkXG5cdFx0QHNldFRleHRTdHlsZXMoKVxuXG5cdHNldFRleHRTdHlsZXM6ICh2YWx1ZSkgPT5cblxuXHRcdGZvciBsYXllciBpbiBbXG5cdFx0XHRAZm9udExhYmVsLFxuXHRcdFx0QGZvbnRTaXplTGFiZWwsXG5cdFx0XHRAY29sb3JMYWJlbCxcblx0XHRcdEBsaW5lSGlnaHRMYWJlbCxcblx0XHRcdEBmb250RmFtaWx5VmFsdWVCb3gsIFxuXHRcdFx0QGNvbG9yVmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRTaXplVmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCwgXG5cdFx0XHRAbGluZUhlaWdodFZhbHVlQm94LCBcblx0XHRcdEBmb250U3R5bGVWYWx1ZUJveFxuXHRcdF1cblx0XHRcdGxheWVyLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGlmIHZhbHVlPyB0aGVuICcxJyBlbHNlICcwJ1xuXG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMjI1xuXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG5cdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcblx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcblx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG5cdFxuXHRcbiMjI1xuXG5cbmNsYXNzIEdvdGNoYVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBzcGVjUGFuZWwgPSBuZXcgU3BlY1BhbmVsXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb2xvcjogJ3JnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWxlY3RlZENvbG9yOiAncmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6ICcjRkZGRkZGJ1xuXHRcdFx0Zm9udEZhbWlseTogJ01lbmxvJ1xuXHRcdFx0Zm9udFNpemU6ICcxMCdcblx0XHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDRcblx0XHRcdHBhZGRpbmc6IHt0b3A6IDEsIGJvdHRvbTogMSwgbGVmdDogMywgcmlnaHQ6IDN9XG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y29sb3I6IG9wdGlvbnMuY29sb3Jcblx0XHRcdHNlbGVjdGVkQ29sb3I6IG9wdGlvbnMuc2VsZWN0ZWRDb2xvclxuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6IG9wdGlvbnMuc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6IG9wdGlvbnMuZm9udEZhbWlseVxuXHRcdFx0Zm9udFNpemU6IG9wdGlvbnMuZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IG9wdGlvbnMuZm9udFdlaWdodFxuXHRcdFx0c2hhcGVzOiBbXVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBvcHRpb25zLmJvcmRlclJhZGl1c1xuXHRcdFx0cGFkZGluZzogb3B0aW9ucy5wYWRkaW5nXG5cdFx0XHRmb2N1c2VkRWxlbWVudDogdW5kZWZpbmVkXG5cdFx0XHRlbmFibGVkOiBmYWxzZVxuXHRcdFx0c2NyZWVuRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XHRsYXllcnM6IFtdXG5cdFx0XHRjb250YWluZXJzOiBbXVxuXHRcdFx0dGltZXI6IHVuZGVmaW5lZFxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdEZyYW1lci5DdXJyZW50Q29udGV4dC5kb21FdmVudE1hbmFnZXIud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgQHVwZGF0ZSlcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXHRcdEBjb250ZXh0LmNoaWxkTm9kZXNbMl0uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblxuXG5cdFx0RnJhbWVyLkRldmljZS5vbiBcImNoYW5nZTpkZXZpY2VUeXBlXCIsID0+XG5cdFx0XHRVdGlscy5kZWxheSAwLCBAdXBkYXRlXG5cblx0dG9nZ2xlOiAoZXZlbnQsIG9wZW4pID0+XG5cdFx0IyByZXR1cm4gaWYgRnJhbWVyLkRldmljZS5oYW5kcy5pc0FuaW1hdGluZ1xuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiYFwiIG9yIGV2ZW50LmtleSBpcyBcIjxcIiBvciBvcGVuIGlzIHRydWVcblx0XHRcdGlmIEBvcGVuZWQgdGhlbiBAZGlzYWJsZSgpIGVsc2UgQGVuYWJsZSgpXG5cdFx0XHRAb3BlbmVkID0gIUBvcGVuZWRcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiL1wiIG9yIGV2ZW50LmtleSBpcyBcIj5cIlxuXHRcdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRcdEB1bnNldFNlbGVjdGVkTGF5ZXIoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2V0U2VsZWN0ZWRMYXllcigpXG5cblx0XHRcdHJldHVyblxuXG5cdCMgb3BlbiB0aGUgcGFuZWwsIHN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG5cdGVuYWJsZTogPT5cblx0XHRAX2NhbnZhc0NvbG9yID0gQ2FudmFzLmJhY2tncm91bmRDb2xvclxuXHRcdGN0eC5zZXRDb250ZXh0KClcblxuXHRcdEB0cmFuc2l0aW9uKHRydWUpXG5cblx0ZGlzYWJsZTogPT5cblx0XHRAdW5mb2N1cygpXG5cdFx0QGVuYWJsZWQgPSBmYWxzZVxuXG5cdFx0QHRyYW5zaXRpb24oZmFsc2UpXG5cblx0dHJhbnNpdGlvbjogKG9wZW4gPSB0cnVlLCBzZWNvbmRzID0gLjUpID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cblx0XHRoYW5kcy5vbiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXG5cdFx0aGFuZHMub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0aGFuZHMub2ZmIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cdFx0XHRAZW5hYmxlZCA9IEBvcGVuZWQgPSBvcGVuXG5cblx0XHRcdGlmIG9wZW5cblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuQ2xpY2ssIEBzZXRTZWxlY3RlZExheWVyXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRAZm9jdXMoKVxuXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cblx0XHRtaWRYID0gaGFuZHMuX2NvbnRleHQuaW5uZXJXaWR0aCAvIDJcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMuYW5pbWF0ZVxuXHRcdFx0bWlkWDogaWYgb3BlbiB0aGVuIG1pZFggLSAxMTIgZWxzZSBtaWRYXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiBzZWNvbmRzXG5cdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMTApXG5cblx0c2hvd1RyYW5zaXRpb246ID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRvcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFggLSA1NiwgbWlkWCAtIDExMl0sIFxuXHRcdFx0WzAsIDFdLCBcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRmYWN0b3IgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdGhhbmRzLm1pZFgsXG5cdFx0XHRbbWlkWCwgbWlkWCAtIDExMl0sXG5cdFx0XHRbMCwgMV0sXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0QHNwZWNQYW5lbC5wYW5lbC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eVxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBDb2xvci5taXggQF9jYW52YXNDb2xvciwncmdiYSgzMCwgMzAsIDMwLCAxLjAwMCknLCBmYWN0b3JcblxuXHQjIHVwZGF0ZSB3aGVuIHNjcmVlbiBzaXplIGNoYW5nZXNcblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQG9wZW5lZFxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5taWRYIC09IDEyMlxuXG5cdFx0Y3R4LnNldENvbnRleHQoKVxuXHRcdEBmb2N1cygpXG5cblx0IyBGaW5kIGFuIGVsZW1lbnQgdGhhdCBiZWxvbmdzIHRvIGEgRnJhbWVyIExheWVyXG5cdGZpbmRMYXllckVsZW1lbnQ6IChlbGVtZW50KSAtPlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudC5jbGFzc0xpc3RcblxuXHRcdGlmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcmFtZXJMYXllcicpXG5cdFx0XHRyZXR1cm4gZWxlbWVudFxuXG5cdFx0QGZpbmRMYXllckVsZW1lbnQoZWxlbWVudC5wYXJlbnROb2RlKVxuXG5cdCMgRmluZCBhIEZyYW1lciBMYXllciB0aGF0IG1hdGNoZXMgYSBGcmFtZXIgTGF5ZXIgZWxlbWVudFxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGVsZW1lbnQgPSBAZmluZExheWVyRWxlbWVudChlbGVtZW50KVxuXHRcdGxheWVyID0gXy5maW5kKEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzLCBbJ19lbGVtZW50JywgZWxlbWVudF0pXG5cblx0XHRyZXR1cm4gbGF5ZXJcblxuXHQjIEZpbmQgYSBub24tc3RhbmRhcmQgQ29tcG9uZW50IHRoYXQgaW5jbHVkZXMgYSBMYXllclxuXHRnZXRDb21wb25lbnRGcm9tTGF5ZXI6IChsYXllciwgbmFtZXMgPSBbXSkgPT5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiBuYW1lcy5qb2luKCcsICcpXG5cblx0XHRpZiBub3QgXy5pbmNsdWRlcyhbXCJMYXllclwiLCBcIlRleHRMYXllclwiLCBcIlNjcm9sbENvbXBvbmVudFwiXSwgbGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblx0XHRcdG5hbWVzLnB1c2gobGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblxuXHRcdEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50LCBuYW1lcylcblxuXHQjIGdldCB0aGUgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50XG5cdGdldERpbWVuc2lvbnM6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdGQgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRkaW1lbnNpb25zID0ge1xuXHRcdFx0eDogZC5sZWZ0XG5cdFx0XHR5OiBkLnRvcFxuXHRcdFx0d2lkdGg6IGQud2lkdGhcblx0XHRcdGhlaWdodDogZC5oZWlnaHRcblx0XHRcdG1pZFg6IGQubGVmdCArIChkLndpZHRoIC8gMilcblx0XHRcdG1pZFk6IGQudG9wICsgKGQuaGVpZ2h0IC8gMilcblx0XHRcdG1heFg6IGQubGVmdCArIGQud2lkdGhcblx0XHRcdG1heFk6IGQudG9wICsgZC5oZWlnaHRcblx0XHRcdGZyYW1lOiBkXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpbWVuc2lvbnNcblxuXHQjIG1ha2UgYSByZWxhdGl2ZSBkaXN0YW5jZSBsaW5lXG5cdG1ha2VMaW5lOiAocG9pbnRBLCBwb2ludEIsIGxhYmVsID0gdHJ1ZSkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxpbmUgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV19XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgcG9pbnRBWzBdIGlzIHBvaW50QlswXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF0gLSA1fSAje3BvaW50QVsxXX0gTCAje3BvaW50QVswXSArIDV9ICN7cG9pbnRBWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXSAtIDV9ICN7cG9pbnRCWzFdfSBMICN7cG9pbnRCWzBdICsgNX0gI3twb2ludEJbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGVsc2UgaWYgcG9pbnRBWzFdIGlzIHBvaW50QlsxXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdIC0gNX0gTCAje3BvaW50QVswXX0gI3twb2ludEFbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXX0gI3twb2ludEJbMV0gLSA1fSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHQjIG1ha2UgdGhlIGxhYmVsIGJveCBmb3IgZGlzdGFuY2UgbGluZXNcblx0bWFrZUxhYmVsOiAoeCwgeSwgdGV4dCkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxhYmVsID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAndGV4dCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiB4XG5cdFx0XHR5OiB5XG5cdFx0XHQnZm9udC1mYW1pbHknOiBAZm9udEZhbWlseVxuXHRcdFx0J2ZvbnQtc2l6ZSc6IEBmb250U2l6ZVxuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogQGZvbnRXZWlnaHRcblx0XHRcdGZpbGw6IEBzZWNvbmRhcnlDb2xvclxuXHRcdFx0dGV4dDogTWF0aC5mbG9vcih0ZXh0IC8gQHJhdGlvKVxuXG5cdFx0bCA9IEBnZXREaW1lbnNpb25zKGxhYmVsLmVsZW1lbnQpXG5cblx0XHRsYWJlbC54ID0geCAtIGwud2lkdGggLyAyXG5cdFx0bGFiZWwueSA9IHkgKyBsLmhlaWdodCAvIDQgLSAxXG5cblx0XHRib3ggPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IGxhYmVsLnggLSBAcGFkZGluZy5sZWZ0XG5cdFx0XHR5OiBsYWJlbC55IC0gbC5oZWlnaHQgKyAxXG5cdFx0XHR3aWR0aDogbC53aWR0aCArIEBwYWRkaW5nLmxlZnQgKyBAcGFkZGluZy5yaWdodFxuXHRcdFx0aGVpZ2h0OiBsLmhlaWdodCArIEBwYWRkaW5nLnRvcCArIEBwYWRkaW5nLmJvdHRvbSArIDFcblx0XHRcdHJ4OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRyeTogQGJvcmRlclJhZGl1c1xuXHRcdFx0ZmlsbDogbmV3IENvbG9yKGNvbG9yKS5kYXJrZW4oNDApXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGxhYmVsLnNob3coKVxuXG5cdCMgbWFrZSB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlIGZvciBzZWxlY3RlZCAvIGhvdmVyZWQgZWxlbWVudHNcblx0bWFrZVJlY3RPdmVybGF5czogKHMsIGgpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBzIG9yIG5vdCBoXG5cblx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSgwKVxuXHRcdGVsc2Vcblx0XHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKC4yKVxuXG5cdFx0aG92ZXJlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IGgueFxuXHRcdFx0eTogaC55XG5cdFx0XHR3aWR0aDogaC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBoLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdGZpbGw6IGhvdmVyRmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRpZiBAc2VsZWN0ZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoMClcblx0XHRlbHNlXG5cdFx0XHRzZWxlY3RGaWxsID0gbmV3IENvbG9yKEBzZWxlY3RlZENvbG9yKS5hbHBoYSguMilcblxuXHRcdHNlbGVjdGVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogcy54XG5cdFx0XHR5OiBzLnlcblx0XHRcdHdpZHRoOiBzLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHMuaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBzZWxlY3RlZENvbG9yXG5cdFx0XHRmaWxsOiBzZWxlY3RGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHQjIG1ha2UgZGFzaGVkIGxpbmVzIGZyb20gYm91bmRpbmcgcmVjdCB0byBzY3JlZW4gZWRnZVxuXHRtYWtlRGFzaGVkTGluZXM6IChlLCBmLCBjb2xvciwgb2Zmc2V0KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZVxuXHRcdHJldHVybiBpZiBlIGlzIGZcblxuXHRcdGNvbG9yID0gbmV3IENvbG9yKGNvbG9yKS5hbHBoYSguOClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUueCwgeTogZi55fSxcblx0XHRcdHt4OiBlLngsIHk6IGYubWF4WX1cblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYueX0sXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLnl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS55fSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS5tYXhZfSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdHNob3dEaXN0YW5jZXM6IChzZWxlY3RlZCwgaG92ZXJlZCkgPT5cblxuXHRcdGlmIEBob3ZlcmVkTGF5ZXIgaXMgQHNlbGVjdGVkTGF5ZXJcblx0XHRcdEBob3ZlcmVkTGF5ZXIgPSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0cyA9IEBnZXREaW1lbnNpb25zKEBzZWxlY3RlZExheWVyLl9lbGVtZW50KVxuXHRcdGggPSBAZ2V0RGltZW5zaW9ucyhAaG92ZXJlZExheWVyLl9lbGVtZW50KVxuXHRcdGYgPSBAZ2V0RGltZW5zaW9ucyhGcmFtZXIuRGV2aWNlLnNjcmVlbi5fZWxlbWVudClcblxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXG5cdFx0QHJhdGlvID0gRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyBTY3JlZW4ud2lkdGhcblxuXHRcdEBtYWtlRGFzaGVkTGluZXMocywgZiwgQHNlbGVjdGVkQ29sb3IsIDUpXG5cblx0XHRAbWFrZVJlY3RPdmVybGF5cyhzLCBoKVxuXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBjb250YWlucyBob3ZlcmVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA8IGgueCBhbmQgcy5tYXhYID4gaC5tYXhYIGFuZCBzLnkgPCBoLnkgYW5kIHMubWF4WSA+IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhYIC0gaC5tYXhYKVxuXHRcdFx0bSA9IGgubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy5tYXhYIC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhZIC0gaC5tYXhZKVxuXHRcdFx0bSA9IGgubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIGhvdmVyZWQgZWxlbWVudCBjb250YWlucyBzZWxlY3RlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPiBoLnggYW5kIHMubWF4WCA8IGgubWF4WCBhbmQgcy55ID4gaC55IGFuZCBzLm1heFkgPCBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBoLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgcy5taWRZXSwgW2gubWF4WCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBzLm1heFkgKyA1XSwgW3MubWlkWCwgaC5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gaC54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGhvdmVyZWQgZWxlbWVudFxuXHRcdFxuXHRcdCMgdG9wXG5cblx0XHRpZiBzLnkgPiBoLm1heFlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgubWF4WSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55ID4gaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC55ICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHQjIGxlZnRcblxuXHRcdGlmIGgubWF4WCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC5tYXhYKVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBoLnggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgcmlnaHRcblxuXHRcdGlmIHMubWF4WCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBzLnggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgYm90dG9tXG5cblx0XHRpZiBzLm1heFkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLm1heFkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55IDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gcy55ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0IyBzZXQgdGhlIHBhbmVsIHdpdGggY3VycmVudCBwcm9wZXJ0aWVzXG5cdHNldFBhbmVsUHJvcGVydGllczogKCkgPT5cblx0XHRpZiBAc2VsZWN0ZWRMYXllcj8gYW5kIEBzZWxlY3RlZExheWVyIGlzbnQgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdGxheWVyID0gQHNlbGVjdGVkTGF5ZXJcblx0XHRlbHNlIGlmIEBob3ZlcmVkTGF5ZXI/XG5cdFx0XHRsYXllciA9IEBob3ZlcmVkTGF5ZXJcblx0XHRlbHNlXG5cdFx0XHRAc3BlY1BhbmVsLmNsZWFyUHJvcHMoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRwcm9wcyA9IGxheWVyLnByb3BzXG5cblx0XHRfLmFzc2lnbiBwcm9wcyxcblx0XHRcdHg6IGxheWVyLnNjcmVlbkZyYW1lLnhcblx0XHRcdHk6IGxheWVyLnNjcmVlbkZyYW1lLnlcblx0XHRcdGNvbXBvbmVudE5hbWU6IGxheWVyLmNvbnN0cnVjdG9yLm5hbWVcblx0XHRcdGNvbXBvbmVudE5hbWVzOiBAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudClcblx0XHRcdHBhcmVudE5hbWU6IGxheWVyLnBhcmVudD8ubmFtZVxuXG5cdFx0Xy5hc3NpZ24gQHNwZWNQYW5lbCwgcHJvcHNcblxuXHRcdEBzcGVjUGFuZWwuc2V0VGV4dFN0eWxlcyhsYXllci5mb250RmFtaWx5KVxuXG5cdHNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblx0XHRyZXR1cm4gaWYgbm90IGV2ZW50XG5cdFx0cmV0dXJuIGlmIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNFbGVtZW50Jylcblx0XHRyZXR1cm4gaWYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVtZW1lTGluaycpXG5cdFx0XG5cdFx0QGhvdmVyZWRMYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGV2ZW50Py50YXJnZXQpXG5cdFx0QHRyeUZvY3VzKGV2ZW50KVxuXG5cdHVuc2V0SG92ZXJlZExheWVyOiA9PlxuXHRcdEBob3ZlcmVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRpZiBub3QgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHVuZm9jdXMoKVxuXG5cdHNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAaG92ZXJlZExheWVyXG5cblx0XHRAc2VsZWN0ZWRMYXllciA9IEBob3ZlcmVkTGF5ZXJcblx0XHRAZm9jdXMoKVxuXG5cdHVuc2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRAc2VsZWN0ZWRMYXllciA9IHVuZGVmaW5lZFxuXG5cdCMgRGVsYXkgZm9jdXMgYnkgYSBzbWFsbCBhbW91bnQgdG8gcHJldmVudCBmbGFzaGluZ1xuXHR0cnlGb2N1czogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEBmb2N1c0VsZW1lbnQgPSBldmVudC50YXJnZXRcblx0XHRkbyAoZXZlbnQpID0+XG5cdFx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRcdGlmIEBmb2N1c0VsZW1lbnQgaXNudCBldmVudC50YXJnZXRcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XG5cdFx0XHRcdEBmb2N1cygpXG5cblx0IyBDaGFuZ2UgZm9jdXMgdG8gYSBuZXcgaG92ZXJlZCBvciBzZWxlY3RlZCBlbGVtZW50XG5cdGZvY3VzOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEB1bmZvY3VzKClcblxuXHRcdEBzZWxlY3RlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0QGhvdmVyZWRMYXllciA/PSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0QHNldFBhbmVsUHJvcGVydGllcygpXG5cdFx0QHNob3dEaXN0YW5jZXMoKVxuXG5cdHVuZm9jdXM6IChldmVudCkgPT5cblx0XHRjdHgucmVtb3ZlQWxsKClcblxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEY0EsSUFBQSx1T0FBQTtFQUFBOzs7O0FBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcEIsQ0FBQTs7QUFFQSxVQUFBLEdBQWE7O0FBQ2IsR0FBQSxHQUFNOztBQUVOLFNBQUEsR0FBWTs7O0tBS3FDLENBQUUsU0FBUyxDQUFDLEdBQTdELENBQWlFLHFCQUFqRTs7O0FBR0EsS0FBSyxDQUFDLFNBQU4sQ0FBZ0Isb3VDQUFoQjs7QUFvR0EsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCOztBQUNSLEtBQUssQ0FBQyxFQUFOLEdBQVc7O0FBQ1gsS0FBQSxHQUFRLFFBQVEsQ0FBQyxjQUFULENBQXdCLDJCQUF4Qjs7QUFDUixLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBZSxDQUFBLFNBQUEsS0FBQTtTQUFBLFNBQUE7V0FBRyxLQUFLLENBQUMsV0FBTixDQUFrQixLQUFsQjtFQUFIO0FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmOztBQWNBLFNBQUEsR0FBWSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2Qjs7QUFDWixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsU0FBMUI7OztBQWlCQTs7Ozs7Ozs7QUFVTTtFQUNRLG9CQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7Ozs7SUFDdkIsSUFBQyxDQUFBLGFBQUQsR0FBaUI7SUFFakIsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUVWLFVBQUEsR0FBYTtJQUdiLEtBQUEsR0FBUTtJQUdSLGFBQUEsR0FBZ0IsU0FBQyxPQUFELEVBQVUsVUFBVjtBQUNmLFVBQUE7O1FBRHlCLGFBQWE7O0FBQ3RD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
