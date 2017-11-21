require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecBox, SpecColorValueBox, SpecDivider, SpecElement, SpecLabel, SpecPanel, SpecValueBox, SpecWideValueBox, ctx, panel, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

svgContext = void 0;

ctx = void 0;

startOpen = false;

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n.SpecSelectable {\n	cursor: pointer;\n	-webkit-box-sizing: border-box;\n	-moz-box-sizing: border-box;\n	box-sizing: border-box;\n}\n\n.SpecSelectable:hover {\n	outline: 1px solid rgba(72, 207, 255, 1.000) !important;\n}\n\n.SpecSelectable:active {\n	outline: 1px solid rgba(255, 1, 255, 1.000) !important;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n\n.mememeLink {\n	opacity: .4;\n}\n\n.mememeLink:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}");

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
    var context, setAttributes, svgNS;
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
    context = document.getElementById('FramerContextRoot-TouchEmulator');
    context.appendChild(this.svg);
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
    var i, len, ref, shape;
    ref = this.shapes;
    for (i = 0, len = ref.length; i < len; i++) {
      shape = ref[i];
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
    var ref, ref1, ref2, ref3, ref4, ref5;
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
      'font-family': (ref = options['font-family']) != null ? ref : 'Helvetica Neue',
      'font-size': (ref1 = options['font-size']) != null ? ref1 : '1em',
      'font-weight': (ref2 = options['font-weight']) != null ? ref2 : '500',
      'color': (ref3 = options['color']) != null ? ref3 : 'rgba(136, 136, 136, 1.000)',
      'left': options.left,
      'right': options.right
    });
    this.element.appendChild(this.textLayer.element);
    if ((ref4 = options.parent) != null) {
      ref4.appendChild(this.element);
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
    this.text = (ref5 = options.text) != null ? ref5 : '';
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
    var ref, ref1, ref2;
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
      text: (ref = options.text) != null ? ref : '',
      parent: this.element,
      'font-size': '1em',
      'left': '6px',
      'top': '6px',
      'color': '#FFF',
      'font-weight': '500'
    });
    this.unitLabel = new SpecLabel({
      text: (ref1 = options.unit) != null ? ref1 : '',
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
    this.value = (ref2 = options.value) != null ? ref2 : '';
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
    var col0x, col1x, col2x, colorProps, element, i, j, k, len, len1, len2, prop, props, ref, row;
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
    this.posLabel = new SpecLabel({
      top: row(0, 2),
      left: col0x,
      text: 'Position',
      'font-size': '.65em'
    });
    this.xValueBox = new SpecValueBox({
      top: row(0),
      left: col1x,
      text: '258',
      unit: 'x'
    });
    this.yValueBox = new SpecValueBox({
      top: row(0),
      left: col2x,
      text: '258',
      unit: 'y'
    });
    this.sizeLabel = new SpecLabel({
      top: row(1, 2),
      left: col0x,
      text: 'Size',
      'font-size': '.65em'
    });
    this.wValueBox = new SpecValueBox({
      top: row(1),
      left: col1x,
      text: '258',
      unit: 'w'
    });
    this.hValueBox = new SpecValueBox({
      top: row(1),
      left: col2x,
      text: '258',
      unit: 'h'
    });
    this.bgColorLabel = new SpecLabel({
      top: row(2, 2),
      left: col0x,
      text: 'Background',
      'font-size': '.65em'
    });
    this.bgColorValueBox = new SpecColorValueBox({
      top: row(2),
      left: col1x
    });
    this.opacityLabel = new SpecLabel({
      top: row(3, 2),
      left: col0x,
      text: 'Opacity',
      'font-size': '.65em'
    });
    this.opacityValueBox = new SpecValueBox({
      top: row(3),
      left: col1x,
      text: '1.0',
      unit: 'a'
    });
    this.specDivider1 = new SpecDivider({
      top: row(4.25, 2)
    });
    this.borderColorLabel = new SpecLabel({
      top: row(4.75, 2),
      left: col0x,
      text: 'Border',
      'font-size': '.65em'
    });
    this.borderColorValueBox = new SpecColorValueBox({
      top: row(4.75),
      left: col1x
    });
    this.borderValueBox = new SpecValueBox({
      top: row(4.75),
      left: col2x,
      text: '1',
      unit: 'w'
    });
    this.radiusLabel = new SpecLabel({
      top: row(5.75, 2),
      left: col0x,
      text: 'Radius',
      'font-size': '.65em'
    });
    this.radiusValueBox = new SpecValueBox({
      top: row(5.75),
      left: col1x,
      text: '0'
    });
    this.shadowLabel = new SpecLabel({
      top: row(6.75, 2),
      left: col0x,
      text: 'Shadow',
      'font-size': '.65em'
    });
    this.shadowColorValueBox = new SpecColorValueBox({
      top: row(6.75),
      left: col1x
    });
    this.shadowSpreadValueBox = new SpecValueBox({
      top: row(6.75),
      left: col2x,
      text: '1',
      unit: 's'
    });
    this.shadowXValueBox = new SpecValueBox({
      top: row(7.75),
      left: col1x,
      text: '0',
      unit: 'x'
    });
    this.shadowYValueBox = new SpecValueBox({
      top: row(7.75),
      left: col2x,
      text: '0',
      unit: 'y'
    });
    this.shadowBlurValueBox = new SpecValueBox({
      top: row(8.75),
      left: col1x,
      unit: 'blur'
    });
    this.specDivider2 = new SpecDivider({
      top: row(10, 2)
    });
    this.fontLabel = new SpecLabel({
      top: row(10.25, 2),
      left: col0x,
      text: 'Font',
      'font-size': '.65em'
    });
    this.fontFamilyValueBox = new SpecWideValueBox({
      top: row(10.25),
      left: col1x
    });
    this.colorLabel = new SpecLabel({
      top: row(11.25, 2),
      left: col0x,
      text: 'Color',
      'font-size': '.65em'
    });
    this.colorValueBox = new SpecColorValueBox({
      top: row(11.25),
      left: col1x
    });
    this.fontStyleValueBox = new SpecValueBox({
      top: row(11.25),
      left: col2x
    });
    this.fontSizeLabel = new SpecLabel({
      top: row(12.25, 2),
      left: col0x,
      text: 'Size',
      'font-size': '.65em'
    });
    this.fontSizeValueBox = new SpecValueBox({
      top: row(12.25),
      left: col1x,
      unit: 's'
    });
    this.fontWeightValueBox = new SpecValueBox({
      top: row(12.25),
      left: col2x,
      unit: 'w'
    });
    this.lineHightLabel = new SpecLabel({
      top: row(13.25, 2),
      left: col0x,
      text: 'Height',
      'font-size': '.65em'
    });
    this.lineHeightValueBox = new SpecValueBox({
      top: row(13.25),
      left: col1x,
      unit: 'lh'
    });
    this.specDivider2 = new SpecDivider({
      top: row(14.5, 2)
    });
    this.nameLabel = new SpecLabel({
      top: row(15),
      left: col0x,
      text: 'Name',
      'font-size': '.65em'
    });
    this.nameValueBox = new SpecWideValueBox({
      top: row(15),
      left: col1x
    });
    this.componentLabel = new SpecLabel({
      top: row(16),
      left: col0x,
      text: 'Component',
      'font-size': '.65em'
    });
    this.componentValueBox = new SpecWideValueBox({
      top: row(16),
      left: col1x
    });
    this.parentComponentLabel = new SpecLabel({
      top: row(17),
      left: col0x,
      text: 'Part of',
      'font-size': '.65em'
    });
    this.parentComponentValueBox = new SpecWideValueBox({
      top: row(17),
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
    ref = [this.linkedinIcon, this.githubIcon, this.twitterIcon];
    for (i = 0, len = ref.length; i < len; i++) {
      element = ref[i];
      panel.appendChild(element);
      element.classList.add('mememeLink');
    }
    props = [['x', this.xValueBox], ['y', this.yValueBox], ['width', this.wValueBox], ['height', this.hValueBox], ['opacity', this.opacityValueBox, true], ['borderWidth', this.borderValueBox], ['borderRadius', this.radiusValueBox], ['shadowSpread', this.shadowSpreadValueBox], ['shadowX', this.shadowXValueBox], ['shadowY', this.shadowYValueBox], ['shadowBlur', this.shadowBlurValueBox], ['fontFamily', this.fontFamilyValueBox], ['fontSize', this.fontSizeValueBox], ['fontWeight', this.fontWeightValueBox], ['lineHeight', this.lineHeightValueBox], ['fontStyle', this.fontStyleValueBox], ['componentName', this.componentValueBox], ['componentNames', this.parentComponentValueBox], ['name', this.nameValueBox]];
    colorProps = [['backgroundColor', this.bgColorValueBox], ['borderColor', this.borderColorValueBox], ['shadowColor', this.shadowColorValueBox], ['color', this.colorValueBox]];
    for (j = 0, len1 = props.length; j < len1; j++) {
      prop = props[j];
      this.defineCustomProperty(prop[0], prop[1], prop[2]);
      this.addCopyEvent(prop[0], prop[1]);
    }
    for (k = 0, len2 = colorProps.length; k < len2; k++) {
      prop = colorProps[k];
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
    var key, ref, value;
    ref = this.props;
    for (key in ref) {
      value = ref[key];
      this[key] = void 0;
    }
    return this.setTextStyles();
  };

  SpecPanel.prototype.setTextStyles = function(value) {
    var i, layer, len, ref, results;
    ref = [this.fontLabel, this.fontSizeLabel, this.colorLabel, this.lineHightLabel, this.fontFamilyValueBox, this.colorValueBox, this.fontSizeValueBox, this.fontWeightValueBox, this.lineHeightValueBox, this.fontStyleValueBox];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
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
    var layer, props, ref;
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
      parentName: (ref = layer.parent) != null ? ref.name : void 0
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

exports.gotcha = new Gotcha;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuY3R4ID0gdW5kZWZpbmVkXG5cbnN0YXJ0T3BlbiA9IGZhbHNlXG5cblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdH1cblxuXHQuU3BlY0xhYmVsIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGUge1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHQtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGU6aG92ZXIge1xuXHRcdG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApICFpbXBvcnRhbnQ7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGU6YWN0aXZlIHtcblx0XHRvdXRsaW5lOiAxcHggc29saWQgcmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApICFpbXBvcnRhbnQ7XG5cdH1cblxuXHRALXdlYmtpdC1rZXlmcmFtZXMgc2hvd0NvcGllZCB7XG5cdFx0MCUgeyBcblx0XHRcdGJvcmRlci1jb2xvcjogcmdiYSgxMTgsIDIzNywgOTMsIDEuMDAwKTtcblx0XHR9XG5cblx0XHQxMDAlIHtcblx0XHRcdGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAxLjAwMCk7XG5cdFx0fVxuXHR9XG5cblx0LmNvcGllZCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmVkO1xuXHR9XG5cblx0Lm1lbWVtZUxpbmsge1xuXHRcdG9wYWNpdHk6IC40O1xuXHR9XG5cblx0Lm1lbWVtZUxpbms6aG92ZXIge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0XG5cdCNsaW5rZWRpbl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDY4cHg7XG5cdH1cblxuXHRcblx0I3R3aXR0ZXJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogNHB4O1xuXHRcdHJpZ2h0OiA0cHg7XG5cdH1cblxuXHQjZ2l0aHViX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogMzZweDtcblx0fVxuXG5cdC5mcmFtZXJMYXllciB7IFxuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGwgIWltcG9ydGFudDsgXG5cdFx0fSBcblx0XG5cdC5JZ25vcmVQb2ludGVyRXZlbnRzIHtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0fVxuXCJcIlwiXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OFxuIyBcdCA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcbiMgXHQgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG4jIFx0XG4jIFx0XG5cblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAnU3BlY0NvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4jIFx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgODg4ODg4YmFcbiMgXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgODggICAgYDhiXG4jIFx0YFk4ODg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIGQ4ODg4UCBhODhhYWFhOFAnIC5kODg4OGIuIGRQLiAgLmRQXG4jIFx0ICAgICAgYDhiIDg4b29vb2Q4IDg4JyAgYFwiXCIgODgnICBgODggODhvb29vZDggICA4OCAgICA4OCAgIGA4Yi4gODgnICBgODggIGA4YmQ4J1xuIyBcdGQ4JyAgIC44UCA4OC4gIC4uLiA4OC4gIC4uLiA4OCAgICAgICA4OC4gIC4uLiAgIDg4ICAgIDg4ICAgIC44OCA4OC4gIC44OCAgLmQ4OGIuXG4jIFx0IFk4ODg4OFAgIGA4ODg4OFAnIGA4ODg4OFAnIGRQICAgICAgIGA4ODg4OFAnICAgZFAgICAgODg4ODg4ODhQIGA4ODg4OFAnIGRQJyAgYGRQXG4jIFx0XG4jIFx0XG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gIyBcdC5kODg4ODhiICBkUCAgICAgZFAgIC44ODg4OC4gICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiAjIFx0ODguICAgIFwiJyA4OCAgICAgODggZDgnICAgYDg4ICAgIGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAjIFx0YFk4ODg4OGIuIDg4ICAgIC44UCA4OCAgICAgICAgICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4gIyBcdCAgICAgIGA4YiA4OCAgICBkOCcgODggICBZUDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuICMgXHRkOCcgICAuOFAgODggIC5kOFAgIFk4LiAgIC44OCAgICBZOC4gICAuODggODguICAuODggODggIDg4ICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICA4OCAgIDg4ICAgICAgICAgODhcbiAjIFx0IFk4ODg4OFAgIDg4ODg4OCcgICAgYDg4ODg4JyAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4gIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cblxuXG4jIyNcblx0ICwtLiAgLiAgICwgICwtLiAgLC0uICAgICAgICAgLiAgICAgICAgICAgLlxuXHQoICAgYCB8ICAvICAvICAgIC8gICAgICAgICAgICB8ICAgICAgICAgICB8XG5cdCBgLS4gIHwgLyAgIHwgLS4gfCAgICAsLS4gOy0uIHwtICAsLS4gLiAsIHwtXG5cdC4gICApIHwvICAgIFxcICB8IFxcICAgIHwgfCB8IHwgfCAgIHwtJyAgWCAgfFxuXHQgYC0nICAnICAgICAgYC0nICBgLScgYC0nICcgJyBgLScgYC0nICcgYCBgLSdcblx0XG4jIyNcblxuXG5jbGFzcyBTVkdDb250ZXh0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBzaGFwZXMgPSBbXVxuXG5cdFx0c3ZnQ29udGV4dCA9IEBcblxuXHRcdCMgbmFtZXNwYWNlXG5cdFx0c3ZnTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcblx0XHQjIHNldCBhdHRyaWJ1dGVzIFxuXHRcdHNldEF0dHJpYnV0ZXMgPSAoZWxlbWVudCwgYXR0cmlidXRlcyA9IHt9KSAtPlxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cblx0XHQjIENyZWF0ZSBTVkcgZWxlbWVudFxuXG5cdFx0QHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOUywgJ3N2ZycpXG5cdFxuXHRcdGNvbnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtVG91Y2hFbXVsYXRvcicpXG5cdFx0Y29udGV4dC5hcHBlbmRDaGlsZChAc3ZnKVxuXG5cdFx0QGZyYW1lRWxlbWVudCA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuQmFja2dyb3VuZC5fZWxlbWVudFxuXG5cdFx0QHNldENvbnRleHQoKVxuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0c2V0QXR0cmlidXRlczogKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdHNldENvbnRleHQ6ID0+XG5cblx0XHRAbEZyYW1lID0gQGZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0QHNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJDb250ZXh0JylbMF1cblx0XHRzRnJhbWUgPSBAc2NyZWVuRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0QHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdGFkZFNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHNoYXBlcy5wdXNoKHNoYXBlKVxuXHRcdEBzaG93U2hhcGUoc2hhcGUpXG5cdFx0XG5cdHJlbW92ZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QGhpZGVTaGFwZShzaGFwZSlcblx0XHRfLnB1bGwoQHNoYXBlcywgc2hhcGUpXG5cdFx0XG5cdGhpZGVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XG5cdHNob3dTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRcblx0YWRkRGVmOiAoZGVmKSAtPlxuXHRcdEBzdmdEZWZzLmFwcGVuZENoaWxkKGRlZilcblxuXHRyZW1vdmVBbGw6ID0+XG5cdFx0Zm9yIHNoYXBlIGluIEBzaGFwZXNcblx0XHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRAc2hhcGVzID0gW11cblxuXG4jIyNcblx0ICwtLiAgLiAgICwgICwtLiAgLC0uICAuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuIDstLlxuXHQoICAgYCB8ICAvICAvICAgICggICBgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgfCAgKVxuXHQgYC0uICB8IC8gICB8IC0uICBgLS4gIHwtLiAsLTogOy0uICwtLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsLXwgfC0nXG5cdC4gICApIHwvICAgIFxcICB8IC4gICApIHwgfCB8IHwgfCB8IHwtJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHwgfFxuXHQgYC0nICAnICAgICAgYC0nICBgLScgICcgJyBgLWAgfC0nIGAtJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgLScgJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge3R5cGU6ICdjaXJjbGUnfSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAcGFyZW50ID0gc3ZnQ29udGV4dFxuXHRcdFxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuXHRcdFx0XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcblx0XHRcdG9wdGlvbnMudHlwZVxuXHRcdFx0KVxuXG5cdFx0QHNldEN1c3RvbVByb3BlcnR5KCd0ZXh0JywgJ3RleHRDb250ZW50JywgJ3RleHRDb250ZW50Jywgb3B0aW9ucy50ZXh0KVxuXHRcdFx0XHRcblx0XHQjIGFzc2lnbiBhdHRyaWJ1dGVzIHNldCBieSBvcHRpb25zXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuXHRcdFx0QHNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdFx0QHBhcmVudC5hZGRTaGFwZShAKVxuXHRcdFxuXHRcdEBzaG93KClcblx0XHRcdFxuXHRzZXRBdHRyaWJ1dGU6IChrZXksIHZhbHVlKSA9PlxuXHRcdHJldHVybiBpZiBrZXkgaXMgJ3RleHQnXG5cdFx0aWYgbm90IEBba2V5XT9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdGdldDogPT5cblx0XHRcdFx0XHRyZXR1cm4gQGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSlcblx0XHRcdFx0c2V0OiAodmFsdWUpID0+IFxuXHRcdFx0XHRcdEBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXHRcdFxuXHRcdEBba2V5XSA9IHZhbHVlXG5cdFxuXHRzZXRDdXN0b21Qcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgcmV0dXJuVmFsdWUsIHNldFZhbHVlLCBzdGFydFZhbHVlKSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiAtPlxuXHRcdFx0XHRyZXR1cm4gcmV0dXJuVmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAZWxlbWVudFtzZXRWYWx1ZV0gPSB2YWx1ZVxuXG5cdFx0QFt2YXJpYWJsZU5hbWVdID0gc3RhcnRWYWx1ZVxuXG5cdGhpZGU6IC0+IFxuXHRcdEBwYXJlbnQuaGlkZVNoYXBlKEApXG5cdFxuXHRzaG93OiAtPiBcblx0XHRAcGFyZW50LnNob3dTaGFwZShAKVxuXHRcdFxuXHRyZW1vdmU6IC0+XG5cdFx0QHBhcmVudC5yZW1vdmVTaGFwZShAKVxuXG5cbmNsYXNzIERhc2hlZExpbmUgZXh0ZW5kcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKHBvaW50QSwgcG9pbnRCLCBjb2xvciA9ICcjMDAwJywgb2Zmc2V0ID0gMCwgb3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBLnh9ICN7cG9pbnRBLnl9IEwgI3twb2ludEIueH0gI3twb2ludEIueX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cdFx0XHQnc3Ryb2tlLWRhc2hhcnJheSc6IFwiNSwgNVwiXG5cdFx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQnOiBvZmZzZXRcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXG5jdHggPSBuZXcgU1ZHQ29udGV4dFxuXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODggICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCAgICA4OCAgICAgICAgODgnICBgODggODgnYDg4J2A4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OCAgIDg4ICAgWThvb29vby5cbiMgXHQgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS0uIC4gICAgICAgICAgICAgICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgIHwgICAgICAgICAgICAgICAgICAgfFxuXHQgYC0uICA7LS4gLC0uICwtLiB8LSAgIHwgLC0uIDstLi0uICwtLiA7LS4gfC1cblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgICB8IHwtJyB8IHwgfCB8LScgfCB8IHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0tJyAnIGAtJyAnICcgJyBgLScgJyAnIGAtJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKGNsYXNzTmFtZSwgb3B0aW9ucyA9IHt9LCB0ZXh0KSAtPlxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkIGNsYXNzTmFtZVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQgJ1NwZWNFbGVtZW50J1xuXG5cdFx0Xy5hc3NpZ24gQGVsZW1lbnQuc3R5bGUsIG9wdGlvbnNcblxuXHRcdHBhbmVsLmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0QHJvb3RFbGVtZW50ID0gQGVsZW1lbnRcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgICAgICAgLiAgICAgICAuXG5cdCggICBgICAgICAgICAgICAgIHwgICAgICAgIHwgICAgICAgfFxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICAgICwtOiB8LS4gLC0uIHxcblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgICB8IHwgfCB8IHwtJyB8XG5cdCBgLScgIHwtJyBgLScgYC0nIGAtLScgYC1gIGAtJyBgLScgJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjTGFiZWwgZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAnbm9uZSdcblx0XHRcdCdmb250LWZhbWlseSc6ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiAnMWVtJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogJzQwMCdcblx0XHRcdCdjb2xvcic6ICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEuMDAwKSdcblxuXHRcdHN1cGVyICdTcGVjTGFiZWwnLCBvcHRpb25zXG5cblx0XHRAdGV4dExheWVyID0gbmV3IFNwZWNFbGVtZW50ICdTcGVjTGFiZWwnLFxuXHRcdFx0J2ZvbnQtZmFtaWx5Jzogb3B0aW9uc1snZm9udC1mYW1pbHknXSA/ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiBvcHRpb25zWydmb250LXNpemUnXSA/ICcxZW0nXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBvcHRpb25zWydmb250LXdlaWdodCddID8gJzUwMCdcblx0XHRcdCdjb2xvcic6IG9wdGlvbnNbJ2NvbG9yJ10gPyAncmdiYSgxMzYsIDEzNiwgMTM2LCAxLjAwMCknXG5cdFx0XHQnbGVmdCc6IG9wdGlvbnMubGVmdFxuXHRcdFx0J3JpZ2h0Jzogb3B0aW9ucy5yaWdodFxuXG5cdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQgQHRleHRMYXllci5lbGVtZW50XG5cblx0XHRvcHRpb25zLnBhcmVudD8uYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndGV4dCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAdGV4dExheWVyLmVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ251bWJlcicgdGhlbiB2YWx1ZSA9IHZhbHVlLnRvRml4ZWQoKVxuXHRcdFx0XHRAdGV4dExheWVyLmVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cdFx0QHRleHQgPSBvcHRpb25zLnRleHQgPyAnJ1xuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLC0uICAgICAgICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICBcXCBvICAgICBvICAgfFxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICB8IC4gLiAsIC4gLC18ICwtLiA7LS5cblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgLyB8IHwvICB8IHwgfCB8LScgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLScgICcgJyAgICcgYC0nIGAtJyAnXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNEaXZpZGVyIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzhweCdcblx0XHRcdCd3aWR0aCc6ICcyMDhweCdcblx0XHRcdCdoZWlnaHQnOiAnMXB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAnIzAwMCdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblxuXHRcdHN1cGVyICdTcGVjRGl2aWRlcicsIG9wdGlvbnNcblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLlxuXHQoICAgYCAgICAgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwtPCAgLC0uIC4gLFxuXHQuICAgKSB8IHwgfC0nIHwgICB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0JveCBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiB1bmRlZmluZWRcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2xlZnQnOiAnOTZweCdcblx0XHRcdCd3aWR0aCc6ICc2NHB4J1xuXHRcdFx0J2hlaWdodCc6ICcyNHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnYm94LXNoYWRvdyc6ICdpbnNldCAwcHggMHB4IDBweCA0cHggcmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAgLC0uICAgICAuICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgLyAgICAgICAgfCAgICAgICAgIHwgIC8gICAgICB8ICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICAgICwtLiB8ICwtLiA7LS4gfCAvICAgLC06IHwgLiAuICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgXFwgICAgfCB8IHwgfCB8IHwgICB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICBgLScgYC0nICcgYC0nICcgICAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuY2xhc3MgU3BlY0NvbG9yVmFsdWVCb3ggZXh0ZW5kcyBTcGVjQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc5NnB4J1xuXHRcdFx0J3dpZHRoJzogJzY0cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzI0cHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblx0XHRcdCdib3gtc2hhZG93JzogJ2luc2V0IDBweCAwcHggMHB4IDRweCByZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdmFsdWUgPyAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0aWYgQGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTcGVjU2VsZWN0YWJsZScpXG5cdFx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdFx0XHRlbHNlIGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdEB2YWx1ZSA9IG9wdGlvbnMudmFsdWVcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvICAgIHwgfCB8IHwgfCB8LScgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY1ZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdmb250LWZhbWlseSc6ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjQyZW0nXG5cdFx0XHQncGFkZGluZy10b3AnOiAnNXB4J1xuXHRcdFx0J3BhZGRpbmctbGVmdCc6ICc4cHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2xpbmUtaGVpZ2h0JzogJzFlbSdcblx0XHRcdCdvdmVyZmxvdyc6ICdoaWRkZW4nXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAdmFsdWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdsZWZ0JzogJzZweCdcblx0XHRcdCd0b3AnOiAnNnB4J1xuXHRcdFx0J2NvbG9yJzogJyNGRkYnXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnNTAwJ1xuXG5cdFx0QHVuaXRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJy45ZW0nXG5cdFx0XHQncmlnaHQnOiAnMnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQndGV4dC1hbGlnbic6ICdyaWdodCdcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRcdFx0ZWxzZSBpZiBAZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNTZWxlY3RhYmxlJylcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gJydcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgIC4gICAgIC4gICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgLiB8IG8gICB8ICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCApICkgLiAsLXwgLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvfC8gIHwgfCB8IHwtJyB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICcgJyAgICcgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjV2lkZVZhbHVlQm94IGV4dGVuZHMgU3BlY1ZhbHVlQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEzNnB4J1xuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIyNcblx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG5cdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG5cdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcblx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcblx0IFk4ODg4OFAgIDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4OFAnICBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcblx0ICAgICAgICAgIDg4XG5cdCAgICAgICAgICBkUFxuIyMjXG5cblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QHBhbmVsID0gcGFuZWxcblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAcGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAcGFuZWwuc3R5bGUub3BhY2l0eSA9IGlmIHN0YXJ0T3BlbiB0aGVuICcxJyBlbHNlICcwJ1xuXG5cdFx0Y29sMHggPSAnNHB4J1xuXHRcdGNvbDF4ID0gJzg0cHgnXG5cdFx0Y29sMnggPSAnMTU2cHgnXG5cblx0XHRyb3cgPSAobnVtLCBvZmZzZXQgPSAwKSAtPiByZXR1cm4gKDE2ICsgKDM1ICogbnVtKSAtIG9mZnNldCkgKyAncHgnXG5cblx0XHQjIHBvc1xuXG5cdFx0QHBvc0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMCwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyBzaXplXG5cblx0XHRAc2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAd1ZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIGJhY2tncm91bmRcblxuXHRcdEBiZ0NvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygyLCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBiZ0NvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDIpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBvcGFjaXR5XG5cblx0XHRAb3BhY2l0eUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMywgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAb3BhY2l0eVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMylcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMS4wJ1xuXHRcdFx0dW5pdDogJ2EnXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMSA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coNC4yNSwgMilcblxuXHRcdCMgYm9yZGVyXG5cblx0XHRAYm9yZGVyQ29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDQuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0JvcmRlcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAYm9yZGVyQ29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAYm9yZGVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg0Ljc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIHJhZGl1c1xuXG5cdFx0QHJhZGl1c0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNS43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEByYWRpdXNWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDUuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzAnXG5cblx0XHQjIHNoYWRvd1xuXG5cdFx0QHNoYWRvd0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNi43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBzaGFkb3dDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdEBzaGFkb3dTcHJlYWRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDYuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzEnXG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBzaGFkb3dYVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg3Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAc2hhZG93WVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0QHNoYWRvd0JsdXJWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDguNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2JsdXInXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMiA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coMTAsIDIpXG5cblx0XHQjIEZvbnRcblxuXHRcdEBmb250TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMC4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnRm9udCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udEZhbWlseVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEwLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgQ29sb3JcblxuXHRcdEBjb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTEuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBjb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAZm9udFN0eWxlVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cblx0XHQjIEZvbnQgU2l6ZVxuXG5cdFx0QGZvbnRTaXplTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMi4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udFNpemVWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdzJ1xuXG5cdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyBMaW5lIEhlaWdodFxuXG5cdFx0QGxpbmVIaWdodExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTMuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0hlaWdodCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbGluZUhlaWdodFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTMuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2xoJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDE0LjUsIDIpXG5cdFx0XG5cdFx0IyBOYW1lXG5cdFx0QG5hbWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdOYW1lJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBuYW1lVmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBDb21wb25lbnRcblxuXHRcdEBjb21wb25lbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE2KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGNvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE2KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgUGFyZW50IENvbXBvbmVudFxuXG5cdFx0QHBhcmVudENvbXBvbmVudExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTcpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1BhcnQgb2YnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHBhcmVudENvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE3KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXG5cdFx0IyBMaW5rc1xuXG5cdFx0QGxpbmtlZGluSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdEBsaW5rZWRpbkljb24uaHJlZiA9IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vaW4vc3RldmVydWl6b2tcIlxuXHRcdEBsaW5rZWRpbkljb24uaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGlkPVwibGlua2VkaW5fbG9nb1wiIGNsYXNzPVwibWVtZW1lTGlua1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5IDBoLTE0Yy0yLjc2MSAwLTUgMi4yMzktNSA1djE0YzAgMi43NjEgMi4yMzkgNSA1IDVoMTRjMi43NjIgMCA1LTIuMjM5IDUtNXYtMTRjMC0yLjc2MS0yLjIzOC01LTUtNXptLTExIDE5aC0zdi0xMWgzdjExem0tMS41LTEyLjI2OGMtLjk2NiAwLTEuNzUtLjc5LTEuNzUtMS43NjRzLjc4NC0xLjc2NCAxLjc1LTEuNzY0IDEuNzUuNzkgMS43NSAxLjc2NC0uNzgzIDEuNzY0LTEuNzUgMS43NjR6bTEzLjUgMTIuMjY4aC0zdi01LjYwNGMwLTMuMzY4LTQtMy4xMTMtNCAwdjUuNjA0aC0zdi0xMWgzdjEuNzY1YzEuMzk2LTIuNTg2IDctMi43NzcgNyAyLjQ3NnY2Ljc1OXpcIi8+PC9zdmc+J1xuXG5cdFx0QGdpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAZ2l0aHViSWNvbi5ocmVmID0gXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpvay9nb3RjaGFcIlxuXHRcdEBnaXRodWJJY29uLmlubmVySFRNTCA9ICc8c3ZnIGhlaWdodD1cIjIwcHhcIiB3aWR0aD1cIjIwcHhcIiBpZD1cImdpdGh1Yl9sb2dvXCIgY2xhc3M9XCJtZW1lbWVMaW5rXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCI+PHBhdGggZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgZD1cIk01MTIgMEMyMjkuMjUgMCAwIDIyOS4yNSAwIDUxMmMwIDIyNi4yNSAxNDYuNjg4IDQxOC4xMjUgMzUwLjE1NiA0ODUuODEyIDI1LjU5NCA0LjY4OCAzNC45MzgtMTEuMTI1IDM0LjkzOC0yNC42MjUgMC0xMi4xODgtMC40NjktNTIuNTYyLTAuNzE5LTk1LjMxMkMyNDIgOTA4LjgxMiAyMTEuOTA2IDgxNy41IDIxMS45MDYgODE3LjVjLTIzLjMxMi01OS4xMjUtNTYuODQ0LTc0Ljg3NS01Ni44NDQtNzQuODc1LTQ2LjUzMS0zMS43NSAzLjUzLTMxLjEyNSAzLjUzLTMxLjEyNSA1MS40MDYgMy41NjIgNzguNDcgNTIuNzUgNzguNDcgNTIuNzUgNDUuNjg4IDc4LjI1IDExOS44NzUgNTUuNjI1IDE0OSA0Mi41IDQuNjU0LTMzIDE3LjkwNC01NS42MjUgMzIuNS02OC4zNzVDMzA0LjkwNiA3MjUuNDM4IDE4NS4zNDQgNjgxLjUgMTg1LjM0NCA0ODUuMzEyYzAtNTUuOTM4IDE5Ljk2OS0xMDEuNTYyIDUyLjY1Ni0xMzcuNDA2LTUuMjE5LTEzLTIyLjg0NC02NS4wOTQgNS4wNjItMTM1LjU2MiAwIDAgNDIuOTM4LTEzLjc1IDE0MC44MTIgNTIuNSA0MC44MTItMTEuNDA2IDg0LjU5NC0xNy4wMzEgMTI4LjEyNS0xNy4yMTkgNDMuNSAwLjE4OCA4Ny4zMTIgNS44NzUgMTI4LjE4OCAxNy4yODEgOTcuNjg4LTY2LjMxMiAxNDAuNjg4LTUyLjUgMTQwLjY4OC01Mi41IDI4IDcwLjUzMSAxMC4zNzUgMTIyLjU2MiA1LjEyNSAxMzUuNSAzMi44MTIgMzUuODQ0IDUyLjYyNSA4MS40NjkgNTIuNjI1IDEzNy40MDYgMCAxOTYuNjg4LTExOS43NSAyNDAtMjMzLjgxMiAyNTIuNjg4IDE4LjQzOCAxNS44NzUgMzQuNzUgNDcgMzQuNzUgOTQuNzUgMCA2OC40MzgtMC42ODggMTIzLjYyNS0wLjY4OCAxNDAuNSAwIDEzLjYyNSA5LjMxMiAyOS41NjIgMzUuMjUgMjQuNTYyQzg3Ny40MzggOTMwIDEwMjQgNzM4LjEyNSAxMDI0IDUxMiAxMDI0IDIyOS4yNSA3OTQuNzUgMCA1MTIgMHpcIiAvPjwvc3ZnPidcblxuXHRcdEB0d2l0dGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdEB0d2l0dGVySWNvbi5ocmVmID0gXCJodHRwOi8vdHdpdHRlci5jb20vc3RldmVydWl6b2tcIlxuXHRcdEB0d2l0dGVySWNvbi5pbm5lckhUTUwgPSAnPHN2ZyBoZWlnaHQ9XCIyOHB4XCIgd2lkdGg9XCIyOHB4XCIgaWQ9XCJ0d2l0dGVyX2xvZ29cIiBjbGFzcz1cIm1lbWVtZUxpbmtcIiBkYXRhLW5hbWU9XCJMb2dvIOKAlCBGSVhFRFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9LmNscy0ye2ZpbGw6cmdiYSg5MSwgOTEsIDkxLCAxLjAwMCk7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Ud2l0dGVyX0xvZ29fQmx1ZTwvdGl0bGU+PHJlY3QgY2xhc3M9XCJjbHMtMVwiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiNDAwXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTJcIiBkPVwiTTE1My42MiwzMDEuNTljOTQuMzQsMCwxNDUuOTQtNzguMTYsMTQ1Ljk0LTE0NS45NCwwLTIuMjIsMC00LjQzLS4xNS02LjYzQTEwNC4zNiwxMDQuMzYsMCwwLDAsMzI1LDEyMi40N2ExMDIuMzgsMTAyLjM4LDAsMCwxLTI5LjQ2LDguMDcsNTEuNDcsNTEuNDcsMCwwLDAsMjIuNTUtMjguMzcsMTAyLjc5LDEwMi43OSwwLDAsMS0zMi41NywxMi40NSw1MS4zNCw1MS4zNCwwLDAsMC04Ny40MSw0Ni43OEExNDUuNjIsMTQ1LjYyLDAsMCwxLDkyLjQsMTA3LjgxYTUxLjMzLDUxLjMzLDAsMCwwLDE1Ljg4LDY4LjQ3QTUwLjkxLDUwLjkxLDAsMCwxLDg1LDE2OS44NmMwLC4yMSwwLC40MywwLC42NWE1MS4zMSw1MS4zMSwwLDAsMCw0MS4xNSw1MC4yOCw1MS4yMSw1MS4yMSwwLDAsMS0yMy4xNi44OCw1MS4zNSw1MS4zNSwwLDAsMCw0Ny45MiwzNS42MiwxMDIuOTIsMTAyLjkyLDAsMCwxLTYzLjcsMjJBMTA0LjQxLDEwNC40MSwwLDAsMSw3NSwyNzguNTVhMTQ1LjIxLDE0NS4yMSwwLDAsMCw3OC42MiwyM1wiLz48L3N2Zz4nXG5cblx0XHRmb3IgZWxlbWVudCBpbiBbQGxpbmtlZGluSWNvbiwgQGdpdGh1Ykljb24sIEB0d2l0dGVySWNvbl1cblx0XHRcdHBhbmVsLmFwcGVuZENoaWxkKGVsZW1lbnQpXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lbWVtZUxpbmsnKVxuXG5cblx0XHQjIC0tLS1cblxuXHRcdCMgcHJvcGVydGllc1xuXG5cdFx0cHJvcHMgPSBbXG5cdFx0XHRbJ3gnLCBAeFZhbHVlQm94XSxcblx0XHRcdFsneScsIEB5VmFsdWVCb3hdLFxuXHRcdFx0Wyd3aWR0aCcsIEB3VmFsdWVCb3hdXG5cdFx0XHRbJ2hlaWdodCcsIEBoVmFsdWVCb3hdXG5cdFx0XHRbJ29wYWNpdHknLCBAb3BhY2l0eVZhbHVlQm94LCB0cnVlXVxuXHRcdFx0Wydib3JkZXJXaWR0aCcsIEBib3JkZXJWYWx1ZUJveF1cblx0XHRcdFsnYm9yZGVyUmFkaXVzJywgQHJhZGl1c1ZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dTcHJlYWQnLCBAc2hhZG93U3ByZWFkVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1gnLCBAc2hhZG93WFZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dZJywgQHNoYWRvd1lWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93Qmx1cicsIEBzaGFkb3dCbHVyVmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRGYW1pbHknLCBAZm9udEZhbWlseVZhbHVlQm94XVxuXHRcdFx0Wydmb250U2l6ZScsIEBmb250U2l6ZVZhbHVlQm94XVxuXHRcdFx0Wydmb250V2VpZ2h0JywgQGZvbnRXZWlnaHRWYWx1ZUJveF1cblx0XHRcdFsnbGluZUhlaWdodCcsIEBsaW5lSGVpZ2h0VmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRTdHlsZScsIEBmb250U3R5bGVWYWx1ZUJveF1cblx0XHRcdFsnY29tcG9uZW50TmFtZScsIEBjb21wb25lbnRWYWx1ZUJveF1cblx0XHRcdFsnY29tcG9uZW50TmFtZXMnLCBAcGFyZW50Q29tcG9uZW50VmFsdWVCb3hdXG5cdFx0XHRbJ25hbWUnLCBAbmFtZVZhbHVlQm94XVxuXHRcdF1cblxuXHRcdGNvbG9yUHJvcHMgPSBbXG5cdFx0XHRbJ2JhY2tncm91bmRDb2xvcicsIEBiZ0NvbG9yVmFsdWVCb3hdXG5cdFx0XHRbJ2JvcmRlckNvbG9yJywgQGJvcmRlckNvbG9yVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd0NvbG9yJywgQHNoYWRvd0NvbG9yVmFsdWVCb3hdXG5cdFx0XHRbJ2NvbG9yJywgQGNvbG9yVmFsdWVCb3hdXG5cdFx0XVxuXG5cdFx0Zm9yIHByb3AgaW4gcHJvcHNcblx0XHRcdEBkZWZpbmVDdXN0b21Qcm9wZXJ0eShwcm9wWzBdLCBwcm9wWzFdLCBwcm9wWzJdKVxuXHRcdFx0QGFkZENvcHlFdmVudChwcm9wWzBdLCBwcm9wWzFdKVxuXG5cdFx0Zm9yIHByb3AgaW4gY29sb3JQcm9wc1xuXHRcdFx0QGRlZmluZUN1c3RvbUNvbG9yUHJvcGVydHkocHJvcFswXSwgcHJvcFsxXSwgcHJvcFsyXSlcblx0XHRcdEBhZGRDb3B5RXZlbnQocHJvcFswXSwgcHJvcFsxXSlcblxuXHRkZWZpbmVDdXN0b21Qcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgbGF5ZXIsIGZsb2F0KSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiA9PiByZXR1cm4gQHByb3BzW3ZhcmlhYmxlTmFtZV1cblx0XHRcdHNldDogKHZhbHVlKSA9PlxuXHRcdFx0XHRAcHJvcHNbdmFyaWFibGVOYW1lXSA9IHZhbHVlXG5cblx0XHRcdFx0aWYgbm90IHZhbHVlPyBvciB2YWx1ZSBpcyAnMCdcblx0XHRcdFx0XHRsYXllci52YWx1ZSA9ICcnXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0aWYgZmxvYXRcblx0XHRcdFx0XHRsYXllci52YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUgPyAnMCcpLnRvRml4ZWQoMilcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ251bWJlcidcblx0XHRcdFx0XHR2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKS50b0ZpeGVkKClcblx0XHRcdFx0XG5cdFx0XHRcdGxheWVyLnZhbHVlID0gdmFsdWVcblx0XHRcdFx0XG5cdGRlZmluZUN1c3RvbUNvbG9yUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIGxheWVyKSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiA9PiByZXR1cm4gQHByb3BzW3ZhcmlhYmxlTmFtZV1cblx0XHRcdHNldDogKHZhbHVlKSA9PlxuXHRcdFx0XHRAcHJvcHNbdmFyaWFibGVOYW1lXSA9IHZhbHVlXG5cdFx0XHRcdGxheWVyLnZhbHVlID0gdmFsdWVcblx0XHRcdFxuXG5cdGFkZENvcHlFdmVudDogKHZhcmlhYmxlTmFtZSwgbGF5ZXIpIC0+XG5cdFx0ZG8gKHZhcmlhYmxlTmFtZSwgbGF5ZXIpID0+XG5cdFx0XHRsYXllci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdFx0QGNvcHlDb250ZW50KEBbdmFyaWFibGVOYW1lXSlcblx0XHRcdFx0QGhpZ2hsaWdodChsYXllcilcblxuXHRjb3B5Q29udGVudDogKGNvbnRlbnQpID0+XG5cdFx0c2VjcmV0Qm94LnZhbHVlID0gY29udGVudFxuXHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0aGlnaGxpZ2h0OiAobGF5ZXIpID0+XG5cdFx0c3RhcnRCb3JkZXJDb2xvciA9IGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddXG5cdFx0bGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSAncmdiYSgxMTgsIDIzNywgOTMsIDEuMDAwKSdcblx0XHRyZXNldCA9ID0+IGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddID0gc3RhcnRCb3JkZXJDb2xvclxuXG5cdFx0Xy5kZWxheShyZXNldCwgMTIwKVxuXG5cdGNsZWFyUHJvcHM6ID0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgQHByb3BzXG5cdFx0XHRAW2tleV0gPSB1bmRlZmluZWRcblx0XHRAc2V0VGV4dFN0eWxlcygpXG5cblx0c2V0VGV4dFN0eWxlczogKHZhbHVlKSA9PlxuXG5cdFx0Zm9yIGxheWVyIGluIFtcblx0XHRcdEBmb250TGFiZWwsXG5cdFx0XHRAZm9udFNpemVMYWJlbCxcblx0XHRcdEBjb2xvckxhYmVsLFxuXHRcdFx0QGxpbmVIaWdodExhYmVsLFxuXHRcdFx0QGZvbnRGYW1pbHlWYWx1ZUJveCwgXG5cdFx0XHRAY29sb3JWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFNpemVWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFdlaWdodFZhbHVlQm94LCBcblx0XHRcdEBsaW5lSGVpZ2h0VmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRTdHlsZVZhbHVlQm94XG5cdFx0XVxuXHRcdFx0bGF5ZXIuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaWYgdmFsdWU/IHRoZW4gJzEnIGVsc2UgJzAnXG5cblxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyMjXG5cdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcblx0ZDgnICAgYDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuXHQ4OCAgICAgICAgLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuXG5cdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuXHRZOC4gICAuODggODguICAuODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4XG5cdCBgODg4ODgnICBgODg4ODhQJyAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UDhcblx0XG5cdFxuIyMjXG5cblxuY2xhc3MgR290Y2hhXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QHNwZWNQYW5lbCA9IG5ldyBTcGVjUGFuZWxcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGNvbG9yOiAncmdiYSg3MiwgMjA3LCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlbGVjdGVkQ29sb3I6ICdyZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogJyNGRkZGRkYnXG5cdFx0XHRmb250RmFtaWx5OiAnTWVubG8nXG5cdFx0XHRmb250U2l6ZTogJzEwJ1xuXHRcdFx0Zm9udFdlaWdodDogJzUwMCdcblx0XHRcdGJvcmRlclJhZGl1czogNFxuXHRcdFx0cGFkZGluZzoge3RvcDogMSwgYm90dG9tOiAxLCBsZWZ0OiAzLCByaWdodDogM31cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5jb2xvclxuXHRcdFx0c2VsZWN0ZWRDb2xvcjogb3B0aW9ucy5zZWxlY3RlZENvbG9yXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogb3B0aW9ucy5zZWNvbmRhcnlDb2xvclxuXHRcdFx0Zm9udEZhbWlseTogb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0XHRmb250U2l6ZTogb3B0aW9ucy5mb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogb3B0aW9ucy5mb250V2VpZ2h0XG5cdFx0XHRzaGFwZXM6IFtdXG5cdFx0XHRib3JkZXJSYWRpdXM6IG9wdGlvbnMuYm9yZGVyUmFkaXVzXG5cdFx0XHRwYWRkaW5nOiBvcHRpb25zLnBhZGRpbmdcblx0XHRcdGZvY3VzZWRFbGVtZW50OiB1bmRlZmluZWRcblx0XHRcdGVuYWJsZWQ6IGZhbHNlXG5cdFx0XHRzY3JlZW5FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcdGxheWVyczogW11cblx0XHRcdGNvbnRhaW5lcnM6IFtdXG5cdFx0XHR0aW1lcjogdW5kZWZpbmVkXG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIEB0b2dnbGUpXG5cdFx0RnJhbWVyLkN1cnJlbnRDb250ZXh0LmRvbUV2ZW50TWFuYWdlci53cmFwKHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBAdXBkYXRlKVxuXG5cdFx0QGNvbnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VTY3JlZW4nKVswXVxuXHRcdEBjb250ZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdmVyQ29udGV4dCcpXG5cdFx0QGNvbnRleHQuY2hpbGROb2Rlc1syXS5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG5cdHRvZ2dsZTogKGV2ZW50LCBvcGVuKSA9PlxuXHRcdCMgcmV0dXJuIGlmIEZyYW1lci5EZXZpY2UuaGFuZHMuaXNBbmltYXRpbmdcblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcImBcIiBvciBldmVudC5rZXkgaXMgXCI8XCIgb3Igb3BlbiBpcyB0cnVlXG5cdFx0XHRpZiBAb3BlbmVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXHRcdFx0QG9wZW5lZCA9ICFAb3BlbmVkXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIiBvciBldmVudC5rZXkgaXMgXCI+XCJcblx0XHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdFx0aWYgQGhvdmVyZWRMYXllciBpcyBAc2VsZWN0ZWRMYXllclxuXHRcdFx0XHRAdW5zZXRTZWxlY3RlZExheWVyKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNldFNlbGVjdGVkTGF5ZXIoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHQjIG9wZW4gdGhlIHBhbmVsLCBzdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuXHRlbmFibGU6ID0+XG5cdFx0QF9jYW52YXNDb2xvciA9IENhbnZhcy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRjdHguc2V0Q29udGV4dCgpXG5cblx0XHRAdHJhbnNpdGlvbih0cnVlKVxuXG5cdGRpc2FibGU6ID0+XG5cdFx0QHVuZm9jdXMoKVxuXHRcdEBlbmFibGVkID0gZmFsc2VcblxuXHRcdEB0cmFuc2l0aW9uKGZhbHNlKVxuXG5cdHRyYW5zaXRpb246IChvcGVuID0gdHJ1ZSwgc2Vjb25kcyA9IC41KSA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXG5cdFx0aGFuZHMub24gXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblxuXHRcdGhhbmRzLm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdGhhbmRzLm9mZiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXHRcdFx0QGVuYWJsZWQgPSBAb3BlbmVkID0gb3BlblxuXG5cdFx0XHRpZiBvcGVuXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU92ZXIsIEBzZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0QGZvY3VzKClcblxuXHRcdEBfc3RhcnRQb3NpdGlvbiA9IEZyYW1lci5EZXZpY2UuaGFuZHMueFxuXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGVcblx0XHRcdG1pZFg6IGlmIG9wZW4gdGhlbiBtaWRYIC0gMTEyIGVsc2UgbWlkWFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogc2Vjb25kc1xuXHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEwKVxuXG5cdHNob3dUcmFuc2l0aW9uOiA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXHRcdG1pZFggPSBoYW5kcy5fY29udGV4dC5pbm5lcldpZHRoIC8gMlxuXG5cdFx0b3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0aGFuZHMubWlkWCxcblx0XHRcdFttaWRYIC0gNTYsIG1pZFggLSAxMTJdLCBcblx0XHRcdFswLCAxXSwgXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0ZmFjdG9yID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFgsIG1pZFggLSAxMTJdLFxuXHRcdFx0WzAsIDFdLFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdEBzcGVjUGFuZWwucGFuZWwuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHlcblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gQ29sb3IubWl4IEBfY2FudmFzQ29sb3IsJ3JnYmEoMzAsIDMwLCAzMCwgMS4wMDApJywgZmFjdG9yXG5cblx0IyB1cGRhdGUgd2hlbiBzY3JlZW4gc2l6ZSBjaGFuZ2VzXG5cdHVwZGF0ZTogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBvcGVuZWRcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMubWlkWCAtPSAxMjJcblxuXHRcdGN0eC5zZXRDb250ZXh0KClcblx0XHRAZm9jdXMoKVxuXG5cdCMgRmluZCBhbiBlbGVtZW50IHRoYXQgYmVsb25ncyB0byBhIEZyYW1lciBMYXllclxuXHRmaW5kTGF5ZXJFbGVtZW50OiAoZWxlbWVudCkgLT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnQuY2xhc3NMaXN0XG5cblx0XHRpZiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnJhbWVyTGF5ZXInKVxuXHRcdFx0cmV0dXJuIGVsZW1lbnRcblxuXHRcdEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQucGFyZW50Tm9kZSlcblxuXHQjIEZpbmQgYSBGcmFtZXIgTGF5ZXIgdGhhdCBtYXRjaGVzIGEgRnJhbWVyIExheWVyIGVsZW1lbnRcblx0Z2V0TGF5ZXJGcm9tRWxlbWVudDogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cblx0XHRlbGVtZW50ID0gQGZpbmRMYXllckVsZW1lbnQoZWxlbWVudClcblx0XHRsYXllciA9IF8uZmluZChGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVycywgWydfZWxlbWVudCcsIGVsZW1lbnRdKVxuXG5cdFx0cmV0dXJuIGxheWVyXG5cblx0IyBGaW5kIGEgbm9uLXN0YW5kYXJkIENvbXBvbmVudCB0aGF0IGluY2x1ZGVzIGEgTGF5ZXJcblx0Z2V0Q29tcG9uZW50RnJvbUxheWVyOiAobGF5ZXIsIG5hbWVzID0gW10pID0+XG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gbmFtZXMuam9pbignLCAnKVxuXG5cdFx0aWYgbm90IF8uaW5jbHVkZXMoW1wiTGF5ZXJcIiwgXCJUZXh0TGF5ZXJcIiwgXCJTY3JvbGxDb21wb25lbnRcIl0sIGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cdFx0XHRuYW1lcy5wdXNoKGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cblx0XHRAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudCwgbmFtZXMpXG5cblx0IyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudFxuXHRnZXREaW1lbnNpb25zOiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRkID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0ZGltZW5zaW9ucyA9IHtcblx0XHRcdHg6IGQubGVmdFxuXHRcdFx0eTogZC50b3Bcblx0XHRcdHdpZHRoOiBkLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGQuaGVpZ2h0XG5cdFx0XHRtaWRYOiBkLmxlZnQgKyAoZC53aWR0aCAvIDIpXG5cdFx0XHRtaWRZOiBkLnRvcCArIChkLmhlaWdodCAvIDIpXG5cdFx0XHRtYXhYOiBkLmxlZnQgKyBkLndpZHRoXG5cdFx0XHRtYXhZOiBkLnRvcCArIGQuaGVpZ2h0XG5cdFx0XHRmcmFtZTogZFxuXHRcdH1cblxuXHRcdHJldHVybiBkaW1lbnNpb25zXG5cblx0IyBtYWtlIGEgcmVsYXRpdmUgZGlzdGFuY2UgbGluZVxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIHBvaW50QVswXSBpcyBwb2ludEJbMF1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdIC0gNX0gI3twb2ludEFbMV19IEwgI3twb2ludEFbMF0gKyA1fSAje3BvaW50QVsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA1fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDV9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF19ICN7cG9pbnRCWzFdIC0gNX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIHRoZSBsYWJlbCBib3ggZm9yIGRpc3RhbmNlIGxpbmVzXG5cdG1ha2VMYWJlbDogKHgsIHksIHRleHQpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogeFxuXHRcdFx0eTogeVxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogQGZvbnRGYW1pbHlcblx0XHRcdCdmb250LXNpemUnOiBAZm9udFNpemVcblx0XHRcdCdmb250LXdlaWdodCc6IEBmb250V2VpZ2h0XG5cdFx0XHRmaWxsOiBAc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdHRleHQ6IE1hdGguZmxvb3IodGV4dCAvIEByYXRpbylcblxuXHRcdGwgPSBAZ2V0RGltZW5zaW9ucyhsYWJlbC5lbGVtZW50KVxuXG5cdFx0bGFiZWwueCA9IHggLSBsLndpZHRoIC8gMlxuXHRcdGxhYmVsLnkgPSB5ICsgbC5oZWlnaHQgLyA0IC0gMVxuXG5cdFx0Ym94ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBsYWJlbC54IC0gQHBhZGRpbmcubGVmdFxuXHRcdFx0eTogbGFiZWwueSAtIGwuaGVpZ2h0ICsgMVxuXHRcdFx0d2lkdGg6IGwud2lkdGggKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogbC5oZWlnaHQgKyBAcGFkZGluZy50b3AgKyBAcGFkZGluZy5ib3R0b20gKyAxXG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IG5ldyBDb2xvcihjb2xvcikuZGFya2VuKDQwKVxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHQjIG1ha2UgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBmb3Igc2VsZWN0ZWQgLyBob3ZlcmVkIGVsZW1lbnRzXG5cdG1ha2VSZWN0T3ZlcmxheXM6IChzLCBoKSA9PlxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXG5cdFx0aWYgQGhvdmVyZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblx0XHRlbHNlXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKDApXG5cdFx0ZWxzZVxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoLjIpXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIGRhc2hlZCBsaW5lcyBmcm9tIGJvdW5kaW5nIHJlY3QgdG8gc2NyZWVuIGVkZ2Vcblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWQsIGhvdmVyZWQpID0+XG5cblx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRAaG92ZXJlZExheWVyID0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdHMgPSBAZ2V0RGltZW5zaW9ucyhAc2VsZWN0ZWRMYXllci5fZWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoQGhvdmVyZWRMYXllci5fZWxlbWVudClcblx0XHRmID0gQGdldERpbWVuc2lvbnMoRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQpXG5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblxuXHRcdEByYXRpbyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRAbWFrZURhc2hlZExpbmVzKHMsIGYsIEBzZWxlY3RlZENvbG9yLCA1KVxuXG5cdFx0QG1ha2VSZWN0T3ZlcmxheXMocywgaClcblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdCMgc2V0IHRoZSBwYW5lbCB3aXRoIGN1cnJlbnQgcHJvcGVydGllc1xuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXI/IGFuZCBAc2VsZWN0ZWRMYXllciBpc250IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRsYXllciA9IEBzZWxlY3RlZExheWVyXG5cdFx0ZWxzZSBpZiBAaG92ZXJlZExheWVyP1xuXHRcdFx0bGF5ZXIgPSBAaG92ZXJlZExheWVyXG5cdFx0ZWxzZVxuXHRcdFx0QHNwZWNQYW5lbC5jbGVhclByb3BzKClcblx0XHRcdHJldHVyblxuXG5cdFx0cHJvcHMgPSBsYXllci5wcm9wc1xuXG5cdFx0Xy5hc3NpZ24gcHJvcHMsXG5cdFx0XHR4OiBsYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHR5OiBsYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHRjb21wb25lbnROYW1lOiBsYXllci5jb25zdHJ1Y3Rvci5uYW1lXG5cdFx0XHRjb21wb25lbnROYW1lczogQGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQpXG5cdFx0XHRwYXJlbnROYW1lOiBsYXllci5wYXJlbnQ/Lm5hbWVcblxuXHRcdF8uYXNzaWduIEBzcGVjUGFuZWwsIHByb3BzXG5cblx0XHRAc3BlY1BhbmVsLnNldFRleHRTdHlsZXMobGF5ZXIuZm9udEZhbWlseSlcblxuXHRzZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cdFx0cmV0dXJuIGlmIG5vdCBldmVudFxuXHRcdHJldHVybiBpZiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTcGVjRWxlbWVudCcpXG5cdFx0cmV0dXJuIGlmIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbWVtZUxpbmsnKVxuXHRcdFxuXHRcdEBob3ZlcmVkTGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChldmVudD8udGFyZ2V0KVxuXHRcdEB0cnlGb2N1cyhldmVudClcblxuXHR1bnNldEhvdmVyZWRMYXllcjogPT5cblx0XHRAaG92ZXJlZExheWVyID0gdW5kZWZpbmVkXG5cdFx0aWYgbm90IEBzZWxlY3RlZExheWVyPyB0aGVuIEB1bmZvY3VzKClcblxuXHRzZXRTZWxlY3RlZExheWVyOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQGhvdmVyZWRMYXllclxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSBAaG92ZXJlZExheWVyXG5cdFx0QGZvY3VzKClcblxuXHR1bnNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSB1bmRlZmluZWRcblxuXHQjIERlbGF5IGZvY3VzIGJ5IGEgc21hbGwgYW1vdW50IHRvIHByZXZlbnQgZmxhc2hpbmdcblx0dHJ5Rm9jdXM6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRAZm9jdXNFbGVtZW50ID0gZXZlbnQudGFyZ2V0XG5cdFx0ZG8gKGV2ZW50KSA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgLjA1LCA9PlxuXHRcdFx0XHRpZiBAZm9jdXNFbGVtZW50IGlzbnQgZXZlbnQudGFyZ2V0XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFxuXHRcdFx0XHRAZm9jdXMoKVxuXG5cdCMgQ2hhbmdlIGZvY3VzIHRvIGEgbmV3IGhvdmVyZWQgb3Igc2VsZWN0ZWQgZWxlbWVudFxuXHRmb2N1czogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRAdW5mb2N1cygpXG5cblx0XHRAc2VsZWN0ZWRMYXllciA/PSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdEBob3ZlcmVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdEBzZXRQYW5lbFByb3BlcnRpZXMoKVxuXHRcdEBzaG93RGlzdGFuY2VzKClcblxuXHR1bmZvY3VzOiAoZXZlbnQpID0+XG5cdFx0Y3R4LnJlbW92ZUFsbCgpXG5cblxuZXhwb3J0cy5nb3RjaGEgPSBuZXcgR290Y2hhXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBRGNBLElBQUEseU1BQUE7RUFBQTs7OztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBRUEsVUFBQSxHQUFhOztBQUNiLEdBQUEsR0FBTTs7QUFFTixTQUFBLEdBQVk7O0FBR1osS0FBSyxDQUFDLFNBQU4sQ0FBZ0Isb3NDQUFoQjs7QUFnR0EsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCOztBQUNSLEtBQUssQ0FBQyxFQUFOLEdBQVc7O0FBQ1gsS0FBQSxHQUFRLFFBQVEsQ0FBQyxjQUFULENBQXdCLDJCQUF4Qjs7QUFDUixLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBZSxDQUFBLFNBQUEsS0FBQTtTQUFBLFNBQUE7V0FBRyxLQUFLLENBQUMsV0FBTixDQUFrQixLQUFsQjtFQUFIO0FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmOztBQWNBLFNBQUEsR0FBWSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2Qjs7QUFDWixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsU0FBMUI7OztBQWlCQTs7Ozs7Ozs7QUFVTTtFQUNRLG9CQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7Ozs7SUFDdkIsSUFBQyxDQUFBLGFBQUQsR0FBaUI7SUFFakIsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUVWLFVBQUEsR0FBYTtJQUdiLEtBQUEsR0FBUTtJQUdSLGFBQUEsR0FBZ0IsU0FBQyxPQUFELEVBQVUsVUFBVjtBQUNmLFVBQUE7O1FBRHlC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
