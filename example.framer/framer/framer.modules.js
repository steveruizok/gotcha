require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecBox, SpecColorValueBox, SpecDivider, SpecElement, SpecLabel, SpecPanel, SpecValueBox, SpecWideValueBox, ctx, i, layer, len, name, panel, ref, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

svgContext = void 0;

ctx = void 0;

startOpen = false;

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n.SpecSelectable {\n	cursor: pointer;\n	-webkit-box-sizing: border-box;\n	-moz-box-sizing: border-box;\n	box-sizing: border-box;\n}\n\n.SpecSelectable:hover {\n	outline: 1px solid rgba(72, 207, 255, 1.000) !important;\n}\n\n.SpecSelectable:active {\n	outline: 1px solid rgba(255, 1, 255, 1.000) !important;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n\n.mememeLink {\n	opacity: .4;\n}\n\n.mememeLink:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}");

ref = ['screenBackground', 'phone', 'screen', 'handsImageLayer', 'screenMask', 'content'];
for (i = 0, len = ref.length; i < len; i++) {
  name = ref[i];
  layer = Framer.Device[name];
  if (!layer) {
    return;
  }
  layer._element.classList.add('IgnorePointerEvents');
}

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
    var context, sFrame, setAttributes, svgNS;
    if (options == null) {
      options = {};
    }
    this.removeAll = bind(this.removeAll, this);
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
    this.frameElement = Framer.Device.screenBackground._element;
    this.lFrame = this.frameElement.getBoundingClientRect();
    _.assign(this, {
      width: this.lFrame.width.toFixed(),
      height: this.lFrame.height.toFixed(),
      x: this.lFrame.left.toFixed(),
      y: this.lFrame.top.toFixed()
    });
    this.svg = document.createElementNS(svgNS, 'svg');
    context = document.getElementById('FramerContextRoot-TouchEmulator');
    context.appendChild(this.svg);
    this.screenElement = document.getElementsByClassName('framerContext')[0];
    sFrame = this.screenElement.getBoundingClientRect();
    setAttributes(this.svg, {
      x: 0,
      y: 0,
      width: sFrame.width,
      height: sFrame.height,
      viewBox: "0 0 " + sFrame.width + " " + sFrame.height
    });
    _.assign(this.svg.style, {
      position: "absolute",
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      'pointer-events': 'none'
    });
    this.svgDefs = document.createElementNS(svgNS, 'defs');
    this.svg.appendChild(this.svgDefs);
    delete this.__constructor;
  }

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
    var j, len1, ref1, shape;
    ref1 = this.shapes;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
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
    var col0x, col1x, col2x, colorProps, element, j, k, len1, len2, len3, n, prop, props, ref1, row;
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
    ref1 = [this.linkedinIcon, this.githubIcon, this.twitterIcon];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      element = ref1[j];
      panel.appendChild(element);
      element.classList.add('mememeLink');
    }
    props = [['x', this.xValueBox], ['y', this.yValueBox], ['width', this.wValueBox], ['height', this.hValueBox], ['opacity', this.opacityValueBox, true], ['borderWidth', this.borderValueBox], ['borderRadius', this.radiusValueBox], ['shadowSpread', this.shadowSpreadValueBox], ['shadowX', this.shadowXValueBox], ['shadowY', this.shadowYValueBox], ['shadowBlur', this.shadowBlurValueBox], ['fontFamily', this.fontFamilyValueBox], ['fontSize', this.fontSizeValueBox], ['fontWeight', this.fontWeightValueBox], ['lineHeight', this.lineHeightValueBox], ['fontStyle', this.fontStyleValueBox], ['componentName', this.componentValueBox], ['componentNames', this.parentComponentValueBox], ['name', this.nameValueBox]];
    colorProps = [['backgroundColor', this.bgColorValueBox], ['borderColor', this.borderColorValueBox], ['shadowColor', this.shadowColorValueBox], ['color', this.colorValueBox]];
    for (k = 0, len2 = props.length; k < len2; k++) {
      prop = props[k];
      this.defineCustomProperty(prop[0], prop[1], prop[2]);
      this.addCopyEvent(prop[0], prop[1]);
    }
    for (n = 0, len3 = colorProps.length; n < len3; n++) {
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
    var j, len1, ref1, results;
    ref1 = [this.fontLabel, this.fontSizeLabel, this.colorLabel, this.lineHightLabel, this.fontFamilyValueBox, this.colorValueBox, this.fontSizeValueBox, this.fontWeightValueBox, this.lineHeightValueBox, this.fontStyleValueBox];
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
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
    var throttledShowTransition;
    if (options == null) {
      options = {};
    }
    this.unfocus = bind(this.unfocus, this);
    this.focus = bind(this.focus, this);
    this.tryFocus = bind(this.tryFocus, this);
    this.setPanelProperties = bind(this.setPanelProperties, this);
    this.showDistances = bind(this.showDistances, this);
    this.makeDashedLines = bind(this.makeDashedLines, this);
    this.makeBoundingRects = bind(this.makeBoundingRects, this);
    this.makeLabel = bind(this.makeLabel, this);
    this.makeLine = bind(this.makeLine, this);
    this.getDimensions = bind(this.getDimensions, this);
    this.getLayerDimensions = bind(this.getLayerDimensions, this);
    this.deselect = bind(this.deselect, this);
    this.select = bind(this.select, this);
    this.clickHoveredElement = bind(this.clickHoveredElement, this);
    this.getComponentFromLayer = bind(this.getComponentFromLayer, this);
    this.getLayerFromElement = bind(this.getLayerFromElement, this);
    this.resetLayers = bind(this.resetLayers, this);
    this.update = bind(this.update, this);
    this.showTransition = bind(this.showTransition, this);
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
    document.addEventListener('click', this.clickHoveredElement);
    Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this.update);
    this.context = document.getElementsByClassName('framerLayer DeviceScreen')[0];
    this.context.classList.add('hoverContext');
    this.context.childNodes[2].classList.add('IgnorePointerEvents');
    this.context.addEventListener("mouseover", this.tryFocus);
    this.context.addEventListener("mouseout", this.unfocus);
    throttledShowTransition = Utils.throttle(.1, this.showTransition);
    Framer.Device.hands.on("change:x", throttledShowTransition);
  }

  Gotcha.prototype.toggle = function(event) {
    if (event.key === "`" || event.key === "<") {
      if (this.opened) {
        this.disable();
      } else {
        this.enable();
      }
      return;
    }
    if (event.key === "/" || event.key === ">") {
      if (!this.enabled) {
        return;
      }
      if (this.hoveredLayer === this.selectedLayer) {
        this.deselect();
      } else {
        this.select();
      }
    }
  };

  Gotcha.prototype.enable = function() {
    this.opened = true;
    this.resetLayers();
    this._canvasColor = Canvas.backgroundColor;
    this._deviceImage = Framer.Device.deviceImage;
    this._startPosition = Framer.Device.hands.x;
    Framer.Device.hands.animate({
      x: this._startPosition - 122,
      options: {
        time: .4
      }
    });
    return Framer.Device.hands.once(Events.AnimationEnd, (function(_this) {
      return function() {
        _this.focus();
        return _this.enabled = true;
      };
    })(this));
  };

  Gotcha.prototype.disable = function() {
    this.unfocus();
    this.enabled = false;
    Framer.Device.hands.animate({
      x: this._startPosition,
      options: {
        time: .35
      }
    });
    return Framer.Device.hands.once(Events.AnimationEnd, (function(_this) {
      return function() {
        return _this.opened = false;
      };
    })(this));
  };

  Gotcha.prototype.showTransition = function(xPos) {
    var factor, opacity;
    opacity = Utils.modulate(xPos, [this._startPosition - 56, this._startPosition - 112], [0, 1], true);
    this.specPanel.panel.style.opacity = opacity;
    factor = Utils.modulate(xPos, [this._startPosition, this._startPosition - 112], [0, 1], true);
    return Canvas.backgroundColor = Color.mix(this._canvasColor, 'rgba(30, 30, 30, 1.000)', factor);
  };

  Gotcha.prototype.update = function() {
    if (!this.opened) {
      return;
    }
    this._startPosition = Framer.Device.hands.x;
    return Framer.Device.hands.x = this._startPosition - 122;
  };

  Gotcha.prototype.findLayer = function(element) {
    if (!element) {
      return;
    }
    if (!element.classList) {
      return;
    }
    if (element.classList.contains('framerLayer')) {
      return element;
    }
    return this.findLayer(element.parentNode);
  };

  Gotcha.prototype.resetLayers = function() {
    var j, len1, ref1, results;
    this.layers = [];
    ref1 = Framer.CurrentContext._layers;
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      layer = ref1[j];
      results.push(this.layers.push(layer));
    }
    return results;
  };

  Gotcha.prototype.getLayerFromElement = function(element) {
    if (!element) {
      return;
    }
    element = this.findLayer(element);
    layer = _.find(this.layers, ['_element', element]);
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

  Gotcha.prototype.clickHoveredElement = function(event) {
    var e, element, ref1;
    if (!this.enabled) {
      return;
    }
    if (!event) {
      return;
    }
    if (!event.target) {
      return;
    }
    if (event.target.classList.contains('SpecElement')) {
      return;
    }
    if (event.target.classList.contains('mememeLink')) {
      return;
    }
    e = (ref1 = event != null ? event.target : void 0) != null ? ref1 : this.hoveredElement;
    layer = this.getLayerFromElement(e);
    if (!layer) {
      return;
    }
    element = layer._element;
    if (element === this.selectedElement) {
      return this.deselect(element, layer);
    } else {
      return this.select(element, layer);
    }
  };

  Gotcha.prototype.select = function(element) {
    this.selectedElement = element != null ? element : this.hoveredLayer._element;
    return Utils.delay(0, this.focus);
  };

  Gotcha.prototype.deselect = function(element) {
    this.selectedElement = void 0;
    return Utils.delay(0, this.focus);
  };

  Gotcha.prototype.getLayerDimensions = function(layer) {
    var frame;
    frame = Utils.boundingFrame(layer);
    frame = this.framify(frame);
    return frame;
  };

  Gotcha.prototype.framify = function(frame) {
    frame.maxX = frame.x + frame.width;
    frame.midX = Utils.round(frame.x + frame.width / 2);
    frame.maxY = frame.y + frame.height;
    frame.midY = Utils.round(frame.y + frame.height / 2);
    return frame;
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

  Gotcha.prototype.makeBoundingRects = function(s, h) {
    var hoverFill, hoveredRect, selectFill, selectedRect;
    if (!s || !h) {
      return;
    }
    hoverFill = new Color(this.color).alpha(.2);
    if (this.hoveredElement === this.screenElement) {
      hoverFill = new Color(this.color).alpha(0);
    }
    selectFill = new Color(this.selectedColor).alpha(.2);
    if (this.selectedElement === this.screenElement) {
      selectFill = new Color(this.selectedColor).alpha(0);
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
    var d, f, h, m, ref1, ref2, s;
    s = this.getDimensions(this.selectedElement);
    h = this.getDimensions(this.hoveredElement);
    f = this.getDimensions(this.screenElement);
    if (!s || !h) {
      return;
    }
    if (((ref1 = this.hoveredLayer) != null ? ref1.visible : void 0) === false) {
      return;
    }
    if (((ref2 = this.hoveredLayer) != null ? ref2.opacity : void 0) === 0) {
      return;
    }
    this.makeDashedLines(s, f, this.selectedColor, 5);
    this.makeBoundingRects(s, h);
    this.ratio = this.screenElement.getBoundingClientRect().width / Screen.width;
    if (this.selectedElement === this.hoveredElement) {
      h = f;
    }
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
    var h, he, props, ref1, s, se;
    h = this.hoveredLayer;
    he = this.hoveredElement;
    s = this.selectedLayer;
    se = this.selectedElement;
    layer = s != null ? s : h;
    if (layer == null) {
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

  Gotcha.prototype.tryFocus = function(event) {
    this.currentHovered = event.target;
    return (function(_this) {
      return function(event) {
        return Utils.delay(.04, function() {
          if (_this.currentHovered === event.target) {
            return _this.focus(event);
          }
        });
      };
    })(this)(event);
  };

  Gotcha.prototype.focus = function(event) {
    var hoveredElement, ref1, ref2, ref3, ref4;
    if (this.enabled === false) {
      return;
    }
    this.unfocus();
    if (this.selectedElement == null) {
      this.selectedElement = this.screenElement;
    }
    this.selectedLayer = this.getLayerFromElement(this.selectedElement);
    hoveredElement = (ref1 = (ref2 = event != null ? event.target : void 0) != null ? ref2 : this.hoveredElement) != null ? ref1 : this.screenElement;
    this.hoveredLayer = this.getLayerFromElement(hoveredElement);
    this.hoveredElement = (ref3 = (ref4 = this.hoveredLayer) != null ? ref4._element : void 0) != null ? ref3 : Framer.Device.backgroundLayer;
    this.setPanelProperties();
    return this.showDistances(this.selectedElement, this.hoveredElement);
  };

  Gotcha.prototype.unfocus = function() {
    ctx.removeAll();
    if (!this.selectedLayer) {
      return this.specPanel.clearProps();
    }
  };

  return Gotcha;

})();

exports.gotcha = new Gotcha;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuY3R4ID0gdW5kZWZpbmVkXG5cbnN0YXJ0T3BlbiA9IGZhbHNlXG5cblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdH1cblxuXHQuU3BlY0xhYmVsIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGUge1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHQtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGU6aG92ZXIge1xuXHRcdG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApICFpbXBvcnRhbnQ7XG5cdH1cblxuXHQuU3BlY1NlbGVjdGFibGU6YWN0aXZlIHtcblx0XHRvdXRsaW5lOiAxcHggc29saWQgcmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApICFpbXBvcnRhbnQ7XG5cdH1cblxuXHRALXdlYmtpdC1rZXlmcmFtZXMgc2hvd0NvcGllZCB7XG5cdFx0MCUgeyBcblx0XHRcdGJvcmRlci1jb2xvcjogcmdiYSgxMTgsIDIzNywgOTMsIDEuMDAwKTtcblx0XHR9XG5cblx0XHQxMDAlIHtcblx0XHRcdGJvcmRlci1jb2xvcjogcmdiYSgwLCAwLCAwLCAxLjAwMCk7XG5cdFx0fVxuXHR9XG5cblx0LmNvcGllZCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmVkO1xuXHR9XG5cblx0Lm1lbWVtZUxpbmsge1xuXHRcdG9wYWNpdHk6IC40O1xuXHR9XG5cblx0Lm1lbWVtZUxpbms6aG92ZXIge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0XG5cdCNsaW5rZWRpbl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDY4cHg7XG5cdH1cblxuXHRcblx0I3R3aXR0ZXJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogNHB4O1xuXHRcdHJpZ2h0OiA0cHg7XG5cdH1cblxuXHQjZ2l0aHViX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogMzZweDtcblx0fVxuXG5cdC5mcmFtZXJMYXllciB7IFxuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGwgIWltcG9ydGFudDsgXG5cdFx0fSBcblx0XG5cdC5JZ25vcmVQb2ludGVyRXZlbnRzIHtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0fVxuXCJcIlwiXG5cbmZvciBuYW1lIGluIFsnc2NyZWVuQmFja2dyb3VuZCcsICdwaG9uZScsICdzY3JlZW4nLCAnaGFuZHNJbWFnZUxheWVyJywgJ3NjcmVlbk1hc2snLCAnY29udGVudCddXG5cdGxheWVyID0gRnJhbWVyLkRldmljZVtuYW1lXVxuXHRyZXR1cm4gaWYgbm90IGxheWVyXG5cblx0bGF5ZXIuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OFxuIyBcdCA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcbiMgXHQgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG4jIFx0XG4jIFx0XG5cblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAnU3BlY0NvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4jIFx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgODg4ODg4YmFcbiMgXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgODggICAgYDhiXG4jIFx0YFk4ODg4OGIuIC5kODg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIGQ4ODg4UCBhODhhYWFhOFAnIC5kODg4OGIuIGRQLiAgLmRQXG4jIFx0ICAgICAgYDhiIDg4b29vb2Q4IDg4JyAgYFwiXCIgODgnICBgODggODhvb29vZDggICA4OCAgICA4OCAgIGA4Yi4gODgnICBgODggIGA4YmQ4J1xuIyBcdGQ4JyAgIC44UCA4OC4gIC4uLiA4OC4gIC4uLiA4OCAgICAgICA4OC4gIC4uLiAgIDg4ICAgIDg4ICAgIC44OCA4OC4gIC44OCAgLmQ4OGIuXG4jIFx0IFk4ODg4OFAgIGA4ODg4OFAnIGA4ODg4OFAnIGRQICAgICAgIGA4ODg4OFAnICAgZFAgICAgODg4ODg4ODhQIGA4ODg4OFAnIGRQJyAgYGRQXG4jIFx0XG4jIFx0XG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gIyBcdC5kODg4ODhiICBkUCAgICAgZFAgIC44ODg4OC4gICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiAjIFx0ODguICAgIFwiJyA4OCAgICAgODggZDgnICAgYDg4ICAgIGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAjIFx0YFk4ODg4OGIuIDg4ICAgIC44UCA4OCAgICAgICAgICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4gIyBcdCAgICAgIGA4YiA4OCAgICBkOCcgODggICBZUDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuICMgXHRkOCcgICAuOFAgODggIC5kOFAgIFk4LiAgIC44OCAgICBZOC4gICAuODggODguICAuODggODggIDg4ICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICA4OCAgIDg4ICAgICAgICAgODhcbiAjIFx0IFk4ODg4OFAgIDg4ODg4OCcgICAgYDg4ODg4JyAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4gIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cblxuIyMjXG5cdCAsLS4gIC4gICAsICAsLS4gICwtLiAgICAgICAgIC4gICAgICAgICAgIC5cblx0KCAgIGAgfCAgLyAgLyAgICAvICAgICAgICAgICAgfCAgICAgICAgICAgfFxuXHQgYC0uICB8IC8gICB8IC0uIHwgICAgLC0uIDstLiB8LSAgLC0uIC4gLCB8LVxuXHQuICAgKSB8LyAgICBcXCAgfCBcXCAgICB8IHwgfCB8IHwgICB8LScgIFggIHxcblx0IGAtJyAgJyAgICAgIGAtJyAgYC0nIGAtJyAnICcgYC0nIGAtJyAnIGAgYC0nXG5cdFxuIyMjXG5cblxuY2xhc3MgU1ZHQ29udGV4dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAc2hhcGVzID0gW11cblxuXHRcdHN2Z0NvbnRleHQgPSBAXG5cblx0XHQjIG5hbWVzcGFjZVxuXHRcdHN2Z05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG5cdFx0XG5cdFx0IyBzZXQgYXR0cmlidXRlcyBcblx0XHRzZXRBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRcdGZvciBrZXksIHZhbHVlIG9mIGF0dHJpYnV0ZXNcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbkJhY2tncm91bmQuX2VsZW1lbnRcblxuXHRcdEBsRnJhbWUgPSBAZnJhbWVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0d2lkdGg6IEBsRnJhbWUud2lkdGgudG9GaXhlZCgpXG5cdFx0XHRoZWlnaHQ6IEBsRnJhbWUuaGVpZ2h0LnRvRml4ZWQoKVxuXHRcdFx0eDogQGxGcmFtZS5sZWZ0LnRvRml4ZWQoKVxuXHRcdFx0eTogQGxGcmFtZS50b3AudG9GaXhlZCgpXG5cblx0XHQjIENyZWF0ZSBTVkcgZWxlbWVudFxuXG5cdFx0QHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOUywgJ3N2ZycpXG5cdFxuXHRcdGNvbnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtVG91Y2hFbXVsYXRvcicpXG5cdFx0Y29udGV4dC5hcHBlbmRDaGlsZChAc3ZnKVxuXG5cdFx0QHNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJDb250ZXh0JylbMF1cblx0XHRzRnJhbWUgPSBAc2NyZWVuRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0c2V0QXR0cmlidXRlcyBAc3ZnLFxuXHRcdFx0eDogMFxuXHRcdFx0eTogMFxuXHRcdFx0d2lkdGg6IHNGcmFtZS53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzRnJhbWUuaGVpZ2h0XG5cdFx0XHR2aWV3Qm94OiBcIjAgMCAje3NGcmFtZS53aWR0aH0gI3tzRnJhbWUuaGVpZ2h0fVwiXG5cblx0XHRfLmFzc2lnbiBAc3ZnLnN0eWxlLFxuXHRcdFx0cG9zaXRpb246IFwiYWJzb2x1dGVcIlxuXHRcdFx0bGVmdDogMFxuXHRcdFx0dG9wOiAwXG5cdFx0XHR3aWR0aDogJzEwMCUnXG5cdFx0XHRoZWlnaHQ6ICcxMDAlJ1xuXHRcdFx0J3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG5cblx0XHQjIGRlZnNcblx0XHRcblx0XHRAc3ZnRGVmcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOUywgJ2RlZnMnKVxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQgQHN2Z0RlZnNcblx0XHRcblx0XHRkZWxldGUgQF9fY29uc3RydWN0b3JcblxuXHRhZGRTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzaGFwZXMucHVzaChzaGFwZSlcblx0XHRAc2hvd1NoYXBlKHNoYXBlKVxuXHRcdFxuXHRyZW1vdmVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBoaWRlU2hhcGUoc2hhcGUpXG5cdFx0Xy5wdWxsKEBzaGFwZXMsIHNoYXBlKVxuXHRcdFxuXHRoaWRlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFxuXHRzaG93U2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLmFwcGVuZENoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0XG5cdGFkZERlZjogKGRlZikgLT5cblx0XHRAc3ZnRGVmcy5hcHBlbmRDaGlsZChkZWYpXG5cblx0cmVtb3ZlQWxsOiA9PlxuXHRcdGZvciBzaGFwZSBpbiBAc2hhcGVzXG5cdFx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0QHNoYXBlcyA9IFtdXG5cblxuIyMjXG5cdCAsLS4gIC4gICAsICAsLS4gICwtLiAgLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLiA7LS5cblx0KCAgIGAgfCAgLyAgLyAgICAoICAgYCB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHwgIClcblx0IGAtLiAgfCAvICAgfCAtLiAgYC0uICB8LS4gLC06IDstLiAsLS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLC18IHwtJ1xuXHQuICAgKSB8LyAgICBcXCAgfCAuICAgKSB8IHwgfCB8IHwgfCB8LScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8IHxcblx0IGAtJyAgJyAgICAgIGAtJyAgYC0nICAnICcgYC1gIHwtJyBgLScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYC0nICdcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt0eXBlOiAnY2lyY2xlJ30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHBhcmVudCA9IHN2Z0NvbnRleHRcblx0XHRcblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXG5cdFx0XHRvcHRpb25zLnR5cGVcblx0XHRcdClcblxuXHRcdEBzZXRDdXN0b21Qcm9wZXJ0eSgndGV4dCcsICd0ZXh0Q29udGVudCcsICd0ZXh0Q29udGVudCcsIG9wdGlvbnMudGV4dClcblx0XHRcdFx0XG5cdFx0IyBhc3NpZ24gYXR0cmlidXRlcyBzZXQgYnkgb3B0aW9uc1xuXHRcdGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdEBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBwYXJlbnQuYWRkU2hhcGUoQClcblx0XHRcblx0XHRAc2hvdygpXG5cdFx0XHRcblx0c2V0QXR0cmlidXRlOiAoa2V5LCB2YWx1ZSkgPT5cblx0XHRyZXR1cm4gaWYga2V5IGlzICd0ZXh0J1xuXHRcdGlmIG5vdCBAW2tleV0/XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRnZXQ6ID0+XG5cdFx0XHRcdFx0cmV0dXJuIEBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXG5cdFx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0XHRAZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcblx0XHRAW2tleV0gPSB2YWx1ZVxuXHRcblx0c2V0Q3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIHJldHVyblZhbHVlLCBzZXRWYWx1ZSwgc3RhcnRWYWx1ZSkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIHJldHVyblZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGVsZW1lbnRbc2V0VmFsdWVdID0gdmFsdWVcblxuXHRcdEBbdmFyaWFibGVOYW1lXSA9IHN0YXJ0VmFsdWVcblxuXHRoaWRlOiAtPiBcblx0XHRAcGFyZW50LmhpZGVTaGFwZShAKVxuXHRcblx0c2hvdzogLT4gXG5cdFx0QHBhcmVudC5zaG93U2hhcGUoQClcblx0XHRcblx0cmVtb3ZlOiAtPlxuXHRcdEBwYXJlbnQucmVtb3ZlU2hhcGUoQClcblxuXG5jbGFzcyBEYXNoZWRMaW5lIGV4dGVuZHMgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChwb2ludEEsIHBvaW50QiwgY29sb3IgPSAnIzAwMCcsIG9mZnNldCA9IDAsIG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIG9wdGlvbnMsXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QS54fSAje3BvaW50QS55fSBMICN7cG9pbnRCLnh9ICN7cG9pbnRCLnl9XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXHRcdFx0J3N0cm9rZS1kYXNoYXJyYXknOiBcIjUsIDVcIlxuXHRcdFx0J3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0XG5cblx0XHRzdXBlciBvcHRpb25zXG5cblxuY3R4ID0gbmV3IFNWR0NvbnRleHRcblxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGQ4JyAgIGA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHRhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuIyBcdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICBZOC4gICAuODggODguICAuODggODggIDg4ICA4OCA4OC4gIC44OCA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OCAgICA4OCAgIDg4ICAgICAgICAgODhcbiMgXHQgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLC0tLiAuICAgICAgICAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgICB8ICAgICAgICAgICAgICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfC0gICB8ICwtLiA7LS4tLiAsLS4gOy0uIHwtXG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8LScgfCB8IHwgfC0nIHwgfCB8XG5cdCBgLScgIHwtJyBgLScgYC0nIGAtLScgJyBgLScgJyAnICcgYC0nICcgJyBgLSdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChjbGFzc05hbWUsIG9wdGlvbnMgPSB7fSwgdGV4dCkgLT5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCBjbGFzc05hbWVcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkICdTcGVjRWxlbWVudCdcblxuXHRcdF8uYXNzaWduIEBlbGVtZW50LnN0eWxlLCBvcHRpb25zXG5cblx0XHRwYW5lbC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdEByb290RWxlbWVudCA9IEBlbGVtZW50XG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwgICAgICAgIC4gICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgICAgICB8ICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLTogfC0uICwtLiB8XG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8IHwgfCB8LScgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLS0nIGAtYCBgLScgYC0nICdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0xhYmVsIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ25vbmUnXG5cdFx0XHQnZm9udC1mYW1pbHknOiAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdmb250LXdlaWdodCc6ICc0MDAnXG5cdFx0XHQnY29sb3InOiAncmdiYSgxMzYsIDEzNiwgMTM2LCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5cdFx0QHRleHRMYXllciA9IG5ldyBTcGVjRWxlbWVudCAnU3BlY0xhYmVsJyxcblx0XHRcdCdmb250LWZhbWlseSc6IG9wdGlvbnNbJ2ZvbnQtZmFtaWx5J10gPyAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogb3B0aW9uc1snZm9udC1zaXplJ10gPyAnMWVtJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0Jzogb3B0aW9uc1snZm9udC13ZWlnaHQnXSA/ICc1MDAnXG5cdFx0XHQnY29sb3InOiBvcHRpb25zWydjb2xvciddID8gJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMS4wMDApJ1xuXHRcdFx0J2xlZnQnOiBvcHRpb25zLmxlZnRcblx0XHRcdCdyaWdodCc6IG9wdGlvbnMucmlnaHRcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0TGF5ZXIuZWxlbWVudFxuXG5cdFx0b3B0aW9ucy5wYXJlbnQ/LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3RleHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInIHRoZW4gdmFsdWUgPSB2YWx1ZS50b0ZpeGVkKClcblx0XHRcdFx0QHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblxuXHRcdEB0ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJydcblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLiAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgXFwgbyAgICAgbyAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgfCAuIC4gLCAuICwtfCAsLS4gOy0uXG5cdC4gICApIHwgfCB8LScgfCAgIHwgIC8gfCB8LyAgfCB8IHwgfC0nIHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICAnICcgICAnIGAtJyBgLScgJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRGl2aWRlciBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc4cHgnXG5cdFx0XHQnd2lkdGgnOiAnMjA4cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzFweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAnXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cblx0XHRzdXBlciAnU3BlY0RpdmlkZXInLCBvcHRpb25zXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICBgLScgJyBgXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNCb3ggZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogdW5kZWZpbmVkXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzk2cHgnXG5cdFx0XHQnd2lkdGgnOiAnNjRweCdcblx0XHRcdCdoZWlnaHQnOiAnMjRweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2JveC1zaGFkb3cnOiAnaW5zZXQgMHB4IDBweCAwcHggNHB4IHJnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgJ1NwZWNMYWJlbCcsIG9wdGlvbnNcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgICwtLiAgICAgLiAgICAgICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIC8gICAgICAgIHwgICAgICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLS4gfCAsLS4gOy0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIFxcICAgIHwgfCB8IHwgfCB8ICAgfC8gICAgfCB8IHwgfCB8IHwtJyB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyAgYC0nIGAtJyAnIGAtJyAnICAgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cbmNsYXNzIFNwZWNDb2xvclZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2xlZnQnOiAnOTZweCdcblx0XHRcdCd3aWR0aCc6ICc2NHB4J1xuXHRcdFx0J2hlaWdodCc6ICcyNHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnYm94LXNoYWRvdyc6ICdpbnNldCAwcHggMHB4IDBweCA0cHggcmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpID0+IFxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHZhbHVlID8gJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRcdFx0ZWxzZSBpZiBAZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNTZWxlY3RhYmxlJylcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgIC8gICAgICB8ICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8IC8gICAsLTogfCAuIC4gLC0uIHwtPCAgLC0uIC4gLFxuXHQuICAgKSB8IHwgfC0nIHwgICB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICcgICAgIGAtYCAnIGAtYCBgLScgYC0nICBgLScgJyBgXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNWYWx1ZUJveCBleHRlbmRzIFNwZWNCb3hcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQnZm9udC1mYW1pbHknOiAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogJy40MmVtJ1xuXHRcdFx0J3BhZGRpbmctdG9wJzogJzVweCdcblx0XHRcdCdwYWRkaW5nLWxlZnQnOiAnOHB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblx0XHRcdCdsaW5lLWhlaWdodCc6ICcxZW0nXG5cdFx0XHQnb3ZlcmZsb3cnOiAnaGlkZGVuJ1xuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QHZhbHVlTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHQgPyAnJ1xuXHRcdFx0cGFyZW50OiBAZWxlbWVudFxuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcxZW0nXG5cdFx0XHQnbGVmdCc6ICc2cHgnXG5cdFx0XHQndG9wJzogJzZweCdcblx0XHRcdCdjb2xvcic6ICcjRkZGJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogJzUwMCdcblxuXHRcdEB1bml0TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnVuaXQgPyAnJ1xuXHRcdFx0cGFyZW50OiBAZWxlbWVudFxuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuOWVtJ1xuXHRcdFx0J3JpZ2h0JzogJzJweCdcblx0XHRcdCd0b3AnOiAnNnB4J1xuXHRcdFx0J3RleHQtYWxpZ24nOiAncmlnaHQnXG5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAdmFsdWVMYWJlbC5lbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAdmFsdWVMYWJlbC5lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblxuXHRcdFx0XHRpZiB2YWx1ZT8gYW5kIHZhbHVlIGlzbnQgJydcblx0XHRcdFx0XHRpZiBAZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNTZWxlY3RhYmxlJylcblx0XHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnU3BlY1NlbGVjdGFibGUnKVxuXG5cdFx0XHRcdGVsc2UgaWYgQGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTcGVjU2VsZWN0YWJsZScpXG5cdFx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnU3BlY1NlbGVjdGFibGUnKVxuXG5cdFx0QHZhbHVlID0gb3B0aW9ucy52YWx1ZSA/ICcnXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwgICAuICAgICAuICAgICAuICAgLCAgICAgLiAgICAgICAgICwtLlxuXHQoICAgYCAgICAgICAgICAgICB8IC4gfCBvICAgfCAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgKSApIC4gLC18ICwtLiB8IC8gICAsLTogfCAuIC4gLC0uIHwtPCAgLC0uIC4gLFxuXHQuICAgKSB8IHwgfC0nIHwgICB8L3wvICB8IHwgfCB8LScgfC8gICAgfCB8IHwgfCB8IHwtJyB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyAnICcgICAnIGAtJyBgLScgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY1dpZGVWYWx1ZUJveCBleHRlbmRzIFNwZWNWYWx1ZUJveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMzZweCdcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuIyMjXG5cdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuXHQgICAgICBgOGIgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG5cdGQ4JyAgIC44UCA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC4uLiAgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG5cdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG5cdCAgICAgICAgICA4OFxuXHQgICAgICAgICAgZFBcbiMjI1xuXG5cbmNsYXNzIFNwZWNQYW5lbFxuXHRjb25zdHJ1Y3RvcjogLT5cblxuXHRcdEBwYW5lbCA9IHBhbmVsXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdwcm9wcycsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiBAX3Byb3BzXG5cdFx0XHRzZXQ6IChvYmopIC0+XG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdFx0XHRcdGlmIF8uaGFzKEBwcm9wcywga2V5KVxuXHRcdFx0XHRcdFx0QHByb3BzW2tleV0gPSB2YWx1ZVxuXG5cdFx0QHBhbmVsLnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblxuXHRcdGNvbDB4ID0gJzRweCdcblx0XHRjb2wxeCA9ICc4NHB4J1xuXHRcdGNvbDJ4ID0gJzE1NnB4J1xuXG5cdFx0cm93ID0gKG51bSwgb2Zmc2V0ID0gMCkgLT4gcmV0dXJuICgxNiArICgzNSAqIG51bSkgLSBvZmZzZXQpICsgJ3B4J1xuXG5cdFx0IyBwb3NcblxuXHRcdEBwb3NMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDAsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1Bvc2l0aW9uJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEB4VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygwKVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcyNTgnXG5cdFx0XHR1bml0OiAneCdcblxuXHRcdEB5VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygwKVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcyNTgnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgc2l6ZVxuXG5cdFx0QHNpemVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDEsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1NpemUnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHdWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0QGhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICdoJ1xuXG5cdFx0IyBiYWNrZ3JvdW5kXG5cblx0XHRAYmdDb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMiwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnQmFja2dyb3VuZCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAYmdDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygyKVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgb3BhY2l0eVxuXG5cdFx0QG9wYWNpdHlMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDMsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ09wYWNpdHknXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QG9wYWNpdHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDMpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzEuMCdcblx0XHRcdHVuaXQ6ICdhJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjEgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDQuMjUsIDIpXG5cblx0XHQjIGJvcmRlclxuXG5cdFx0QGJvcmRlckNvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdyg0Ljc1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGJvcmRlckNvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDQuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0QGJvcmRlclZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMSdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyByYWRpdXNcblxuXHRcdEByYWRpdXNMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDUuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1JhZGl1cydcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAcmFkaXVzVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg1Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXG5cdFx0IyBzaGFkb3dcblxuXHRcdEBzaGFkb3dMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDYuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1NoYWRvdydcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAc2hhZG93Q29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNi43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAc2hhZG93U3ByZWFkVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2Ljc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3MnXG5cblx0XHRAc2hhZG93WFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNoYWRvd1lWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDcuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzAnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdEBzaGFkb3dCbHVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg4Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdibHVyJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDEwLCAyKVxuXG5cdFx0IyBGb250XG5cblx0XHRAZm9udExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTAuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGZvbnRGYW1pbHlWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMC4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHQjIENvbG9yXG5cblx0XHRAY29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDExLjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb2xvcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAY29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTEuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0QGZvbnRTdHlsZVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTEuMjUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXG5cdFx0IyBGb250IFNpemVcblxuXHRcdEBmb250U2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTIuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1NpemUnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGZvbnRTaXplVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMi4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBmb250V2VpZ2h0VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMi4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR1bml0OiAndydcblxuXHRcdCMgTGluZSBIZWlnaHRcblxuXHRcdEBsaW5lSGlnaHRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDEzLjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdIZWlnaHQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGxpbmVIZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEzLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdsaCdcblxuXHRcdCMgRGl2aWRlciAjIC0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAc3BlY0RpdmlkZXIyID0gbmV3IFNwZWNEaXZpZGVyXG5cdFx0XHR0b3A6IHJvdygxNC41LCAyKVxuXHRcdFxuXHRcdCMgTmFtZVxuXHRcdEBuYW1lTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxNSlcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbmFtZVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgQ29tcG9uZW50XG5cblx0XHRAY29tcG9uZW50TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxNilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnQ29tcG9uZW50J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBjb21wb25lbnRWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxNilcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHQjIFBhcmVudCBDb21wb25lbnRcblxuXHRcdEBwYXJlbnRDb21wb25lbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE3KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdQYXJ0IG9mJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBwYXJlbnRDb21wb25lbnRWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxNylcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblxuXHRcdCMgTGlua3NcblxuXHRcdEBsaW5rZWRpbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAbGlua2VkaW5JY29uLmhyZWYgPSBcImh0dHA6Ly93d3cubGlua2VkaW4uY29tL2luL3N0ZXZlcnVpem9rXCJcblx0XHRAbGlua2VkaW5JY29uLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBpZD1cImxpbmtlZGluX2xvZ29cIiBjbGFzcz1cIm1lbWVtZUxpbmtcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSAwaC0xNGMtMi43NjEgMC01IDIuMjM5LTUgNXYxNGMwIDIuNzYxIDIuMjM5IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOSA1LTV2LTE0YzAtMi43NjEtMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTFoM3YxMXptLTEuNS0xMi4yNjhjLS45NjYgMC0xLjc1LS43OS0xLjc1LTEuNzY0cy43ODQtMS43NjQgMS43NS0xLjc2NCAxLjc1Ljc5IDEuNzUgMS43NjQtLjc4MyAxLjc2NC0xLjc1IDEuNzY0em0xMy41IDEyLjI2OGgtM3YtNS42MDRjMC0zLjM2OC00LTMuMTEzLTQgMHY1LjYwNGgtM3YtMTFoM3YxLjc2NWMxLjM5Ni0yLjU4NiA3LTIuNzc3IDcgMi40NzZ2Ni43NTl6XCIvPjwvc3ZnPidcblxuXHRcdEBnaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0QGdpdGh1Ykljb24uaHJlZiA9IFwiaHR0cDovL2dpdGh1Yi5jb20vc3RldmVydWl6b2svZ290Y2hhXCJcblx0XHRAZ2l0aHViSWNvbi5pbm5lckhUTUwgPSAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIGNsYXNzPVwibWVtZW1lTGlua1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAdHdpdHRlckljb24uaHJlZiA9IFwiaHR0cDovL3R3aXR0ZXIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRAdHdpdHRlckljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiIGlkPVwidHdpdHRlcl9sb2dvXCIgY2xhc3M9XCJtZW1lbWVMaW5rXCIgZGF0YS1uYW1lPVwiTG9nbyDigJQgRklYRURcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOnJnYmEoOTEsIDkxLCA5MSwgMS4wMDApO308L3N0eWxlPjwvZGVmcz48dGl0bGU+VHdpdHRlcl9Mb2dvX0JsdWU8L3RpdGxlPjxyZWN0IGNsYXNzPVwiY2xzLTFcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiLz48cGF0aCBjbGFzcz1cImNscy0yXCIgZD1cIk0xNTMuNjIsMzAxLjU5Yzk0LjM0LDAsMTQ1Ljk0LTc4LjE2LDE0NS45NC0xNDUuOTQsMC0yLjIyLDAtNC40My0uMTUtNi42M0ExMDQuMzYsMTA0LjM2LDAsMCwwLDMyNSwxMjIuNDdhMTAyLjM4LDEwMi4zOCwwLDAsMS0yOS40Niw4LjA3LDUxLjQ3LDUxLjQ3LDAsMCwwLDIyLjU1LTI4LjM3LDEwMi43OSwxMDIuNzksMCwwLDEtMzIuNTcsMTIuNDUsNTEuMzQsNTEuMzQsMCwwLDAtODcuNDEsNDYuNzhBMTQ1LjYyLDE0NS42MiwwLDAsMSw5Mi40LDEwNy44MWE1MS4zMyw1MS4zMywwLDAsMCwxNS44OCw2OC40N0E1MC45MSw1MC45MSwwLDAsMSw4NSwxNjkuODZjMCwuMjEsMCwuNDMsMCwuNjVhNTEuMzEsNTEuMzEsMCwwLDAsNDEuMTUsNTAuMjgsNTEuMjEsNTEuMjEsMCwwLDEtMjMuMTYuODgsNTEuMzUsNTEuMzUsMCwwLDAsNDcuOTIsMzUuNjIsMTAyLjkyLDEwMi45MiwwLDAsMS02My43LDIyQTEwNC40MSwxMDQuNDEsMCwwLDEsNzUsMjc4LjU1YTE0NS4yMSwxNDUuMjEsMCwwLDAsNzguNjIsMjNcIi8+PC9zdmc+J1xuXG5cdFx0Zm9yIGVsZW1lbnQgaW4gW0BsaW5rZWRpbkljb24sIEBnaXRodWJJY29uLCBAdHdpdHRlckljb25dXG5cdFx0XHRwYW5lbC5hcHBlbmRDaGlsZChlbGVtZW50KVxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZW1lbWVMaW5rJylcblxuXG5cdFx0IyAtLS0tXG5cblx0XHQjIHByb3BlcnRpZXNcblxuXHRcdHByb3BzID0gW1xuXHRcdFx0Wyd4JywgQHhWYWx1ZUJveF0sXG5cdFx0XHRbJ3knLCBAeVZhbHVlQm94XSxcblx0XHRcdFsnd2lkdGgnLCBAd1ZhbHVlQm94XVxuXHRcdFx0WydoZWlnaHQnLCBAaFZhbHVlQm94XVxuXHRcdFx0WydvcGFjaXR5JywgQG9wYWNpdHlWYWx1ZUJveCwgdHJ1ZV1cblx0XHRcdFsnYm9yZGVyV2lkdGgnLCBAYm9yZGVyVmFsdWVCb3hdXG5cdFx0XHRbJ2JvcmRlclJhZGl1cycsIEByYWRpdXNWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93U3ByZWFkJywgQHNoYWRvd1NwcmVhZFZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dYJywgQHNoYWRvd1hWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WScsIEBzaGFkb3dZVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd0JsdXInLCBAc2hhZG93Qmx1clZhbHVlQm94XVxuXHRcdFx0Wydmb250RmFtaWx5JywgQGZvbnRGYW1pbHlWYWx1ZUJveF1cblx0XHRcdFsnZm9udFNpemUnLCBAZm9udFNpemVWYWx1ZUJveF1cblx0XHRcdFsnZm9udFdlaWdodCcsIEBmb250V2VpZ2h0VmFsdWVCb3hdXG5cdFx0XHRbJ2xpbmVIZWlnaHQnLCBAbGluZUhlaWdodFZhbHVlQm94XVxuXHRcdFx0Wydmb250U3R5bGUnLCBAZm9udFN0eWxlVmFsdWVCb3hdXG5cdFx0XHRbJ2NvbXBvbmVudE5hbWUnLCBAY29tcG9uZW50VmFsdWVCb3hdXG5cdFx0XHRbJ2NvbXBvbmVudE5hbWVzJywgQHBhcmVudENvbXBvbmVudFZhbHVlQm94XVxuXHRcdFx0WyduYW1lJywgQG5hbWVWYWx1ZUJveF1cblx0XHRdXG5cblx0XHRjb2xvclByb3BzID0gW1xuXHRcdFx0WydiYWNrZ3JvdW5kQ29sb3InLCBAYmdDb2xvclZhbHVlQm94XVxuXHRcdFx0Wydib3JkZXJDb2xvcicsIEBib3JkZXJDb2xvclZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dDb2xvcicsIEBzaGFkb3dDb2xvclZhbHVlQm94XVxuXHRcdFx0Wydjb2xvcicsIEBjb2xvclZhbHVlQm94XVxuXHRcdF1cblxuXHRcdGZvciBwcm9wIGluIHByb3BzXG5cdFx0XHRAZGVmaW5lQ3VzdG9tUHJvcGVydHkocHJvcFswXSwgcHJvcFsxXSwgcHJvcFsyXSlcblx0XHRcdEBhZGRDb3B5RXZlbnQocHJvcFswXSwgcHJvcFsxXSlcblxuXHRcdGZvciBwcm9wIGluIGNvbG9yUHJvcHNcblx0XHRcdEBkZWZpbmVDdXN0b21Db2xvclByb3BlcnR5KHByb3BbMF0sIHByb3BbMV0sIHByb3BbMl0pXG5cdFx0XHRAYWRkQ29weUV2ZW50KHByb3BbMF0sIHByb3BbMV0pXG5cblx0ZGVmaW5lQ3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIGxheWVyLCBmbG9hdCkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogPT4gcmV0dXJuIEBwcm9wc1t2YXJpYWJsZU5hbWVdXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT5cblx0XHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXG5cdFx0XHRcdGlmIG5vdCB2YWx1ZT8gb3IgdmFsdWUgaXMgJzAnXG5cdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGlmIGZsb2F0XG5cdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlID8gJzAnKS50b0ZpeGVkKDIpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInXG5cdFx0XHRcdFx0dmFsdWUgPSBwYXJzZUludCh2YWx1ZSkudG9GaXhlZCgpXG5cdFx0XHRcdFxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdFxuXHRkZWZpbmVDdXN0b21Db2xvclByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllcikgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogPT4gcmV0dXJuIEBwcm9wc1t2YXJpYWJsZU5hbWVdXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT5cblx0XHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcblxuXHRhZGRDb3B5RXZlbnQ6ICh2YXJpYWJsZU5hbWUsIGxheWVyKSAtPlxuXHRcdGRvICh2YXJpYWJsZU5hbWUsIGxheWVyKSA9PlxuXHRcdFx0bGF5ZXIuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRcdEBjb3B5Q29udGVudChAW3ZhcmlhYmxlTmFtZV0pXG5cdFx0XHRcdEBoaWdobGlnaHQobGF5ZXIpXG5cblx0Y29weUNvbnRlbnQ6IChjb250ZW50KSA9PlxuXHRcdHNlY3JldEJveC52YWx1ZSA9IGNvbnRlbnRcblx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdGhpZ2hsaWdodDogKGxheWVyKSA9PlxuXHRcdHN0YXJ0Qm9yZGVyQ29sb3IgPSBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXVxuXHRcdGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddID0gJ3JnYmEoMTE4LCAyMzcsIDkzLCAxLjAwMCknXG5cdFx0cmVzZXQgPSA9PiBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXSA9IHN0YXJ0Qm9yZGVyQ29sb3JcblxuXHRcdF8uZGVsYXkocmVzZXQsIDEyMClcblxuXHRjbGVhclByb3BzOiA9PlxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEBwcm9wc1xuXHRcdFx0QFtrZXldID0gdW5kZWZpbmVkXG5cdFx0QHNldFRleHRTdHlsZXMoKVxuXG5cdHNldFRleHRTdHlsZXM6ICh2YWx1ZSkgPT5cblxuXHRcdGZvciBsYXllciBpbiBbXG5cdFx0XHRAZm9udExhYmVsLFxuXHRcdFx0QGZvbnRTaXplTGFiZWwsXG5cdFx0XHRAY29sb3JMYWJlbCxcblx0XHRcdEBsaW5lSGlnaHRMYWJlbCxcblx0XHRcdEBmb250RmFtaWx5VmFsdWVCb3gsIFxuXHRcdFx0QGNvbG9yVmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRTaXplVmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCwgXG5cdFx0XHRAbGluZUhlaWdodFZhbHVlQm94LCBcblx0XHRcdEBmb250U3R5bGVWYWx1ZUJveFxuXHRcdF1cblx0XHRcdGxheWVyLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGlmIHZhbHVlPyB0aGVuICcxJyBlbHNlICcwJ1xuXG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMjI1xuXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG5cdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcblx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcblx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG5cdFxuXHRcbiMjI1xuXG5cbmNsYXNzIEdvdGNoYVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBzcGVjUGFuZWwgPSBuZXcgU3BlY1BhbmVsXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb2xvcjogJ3JnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWxlY3RlZENvbG9yOiAncmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6ICcjRkZGRkZGJ1xuXHRcdFx0Zm9udEZhbWlseTogJ01lbmxvJ1xuXHRcdFx0Zm9udFNpemU6ICcxMCdcblx0XHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDRcblx0XHRcdHBhZGRpbmc6IHt0b3A6IDEsIGJvdHRvbTogMSwgbGVmdDogMywgcmlnaHQ6IDN9XG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y29sb3I6IG9wdGlvbnMuY29sb3Jcblx0XHRcdHNlbGVjdGVkQ29sb3I6IG9wdGlvbnMuc2VsZWN0ZWRDb2xvclxuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6IG9wdGlvbnMuc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6IG9wdGlvbnMuZm9udEZhbWlseVxuXHRcdFx0Zm9udFNpemU6IG9wdGlvbnMuZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IG9wdGlvbnMuZm9udFdlaWdodFxuXHRcdFx0c2hhcGVzOiBbXVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBvcHRpb25zLmJvcmRlclJhZGl1c1xuXHRcdFx0cGFkZGluZzogb3B0aW9ucy5wYWRkaW5nXG5cdFx0XHRmb2N1c2VkRWxlbWVudDogdW5kZWZpbmVkXG5cdFx0XHRlbmFibGVkOiBmYWxzZVxuXHRcdFx0c2NyZWVuRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XHRsYXllcnM6IFtdXG5cdFx0XHRjb250YWluZXJzOiBbXVxuXHRcdFx0dGltZXI6IHVuZGVmaW5lZFxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQGNsaWNrSG92ZXJlZEVsZW1lbnQpXG5cdFx0RnJhbWVyLkN1cnJlbnRDb250ZXh0LmRvbUV2ZW50TWFuYWdlci53cmFwKHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBAdXBkYXRlKVxuXG5cdFx0QGNvbnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VTY3JlZW4nKVswXVxuXHRcdEBjb250ZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdmVyQ29udGV4dCcpXG5cblx0XHRAY29udGV4dC5jaGlsZE5vZGVzWzJdLmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG5cdFx0QGNvbnRleHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBAdHJ5Rm9jdXMpXG5cdFx0QGNvbnRleHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIEB1bmZvY3VzKVxuXG5cdFx0dGhyb3R0bGVkU2hvd1RyYW5zaXRpb24gPSBVdGlscy50aHJvdHRsZSAuMSwgQHNob3dUcmFuc2l0aW9uXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5vbiBcImNoYW5nZTp4XCIsIHRocm90dGxlZFNob3dUcmFuc2l0aW9uXG5cblx0dG9nZ2xlOiAoZXZlbnQpID0+XG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiYFwiIG9yIGV2ZW50LmtleSBpcyBcIjxcIlxuXHRcdFx0aWYgQG9wZW5lZCB0aGVuIEBkaXNhYmxlKCkgZWxzZSBAZW5hYmxlKClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCIvXCIgb3IgZXZlbnQua2V5IGlzIFwiPlwiXG5cdFx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRcdGlmIEBob3ZlcmVkTGF5ZXIgaXMgQHNlbGVjdGVkTGF5ZXJcblx0XHRcdFx0QGRlc2VsZWN0KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNlbGVjdCgpXG5cblx0XHRcdHJldHVyblxuXG5cdGVuYWJsZTogPT5cblx0XHRAb3BlbmVkID0gdHJ1ZVxuXHRcdEByZXNldExheWVycygpXG5cdFx0QF9jYW52YXNDb2xvciA9IENhbnZhcy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAX2RldmljZUltYWdlID0gRnJhbWVyLkRldmljZS5kZXZpY2VJbWFnZVxuXHRcdEBfc3RhcnRQb3NpdGlvbiA9IEZyYW1lci5EZXZpY2UuaGFuZHMueFxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5hbmltYXRlIFxuXHRcdFx0eDogQF9zdGFydFBvc2l0aW9uIC0gMTIyLCBcblx0XHRcdG9wdGlvbnM6IHt0aW1lOiAuNH1cblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PiBcblx0XHRcdEBmb2N1cygpXG5cdFx0XHRAZW5hYmxlZCA9IHRydWVcblxuXHRkaXNhYmxlOiA9PlxuXHRcdEB1bmZvY3VzKClcblx0XHRAZW5hYmxlZCA9IGZhbHNlXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGUgXG5cdFx0XHR4OiBAX3N0YXJ0UG9zaXRpb24sXG5cdFx0XHRvcHRpb25zOiB7dGltZTogLjM1fVxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+IFxuXHRcdFx0QG9wZW5lZCA9IGZhbHNlXG5cblx0c2hvd1RyYW5zaXRpb246ICh4UG9zKSA9PlxuXHRcdG9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdHhQb3MsXG5cdFx0XHRbQF9zdGFydFBvc2l0aW9uIC0gNTYsIEBfc3RhcnRQb3NpdGlvbiAtIDExMl0sIFxuXHRcdFx0WzAsIDFdLCBcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRAc3BlY1BhbmVsLnBhbmVsLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5XG5cblx0XHRmYWN0b3IgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdHhQb3MsIFxuXHRcdFx0W0Bfc3RhcnRQb3NpdGlvbiwgQF9zdGFydFBvc2l0aW9uIC0gMTEyXSxcblx0XHRcdFswLCAxXSxcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gQ29sb3IubWl4IEBfY2FudmFzQ29sb3IsJ3JnYmEoMzAsIDMwLCAzMCwgMS4wMDApJywgZmFjdG9yXG5cblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQG9wZW5lZFxuXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy54ID0gQF9zdGFydFBvc2l0aW9uIC0gMTIyXG5cblx0ZmluZExheWVyOiAoZWxlbWVudCkgLT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnQuY2xhc3NMaXN0XG5cblx0XHRpZiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnJhbWVyTGF5ZXInKVxuXHRcdFx0cmV0dXJuIGVsZW1lbnRcblxuXHRcdEBmaW5kTGF5ZXIoZWxlbWVudC5wYXJlbnROb2RlKVxuXG5cdHJlc2V0TGF5ZXJzOiA9PlxuXHRcdEBsYXllcnMgPSBbXVxuXG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzXG5cdFx0XHRAbGF5ZXJzLnB1c2ggbGF5ZXJcblxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGVsZW1lbnQgPSBAZmluZExheWVyKGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoQGxheWVycywgWydfZWxlbWVudCcsIGVsZW1lbnRdKVxuXG5cdFx0cmV0dXJuIGxheWVyXG5cblx0Z2V0Q29tcG9uZW50RnJvbUxheWVyOiAobGF5ZXIsIG5hbWVzID0gW10pID0+XG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gbmFtZXMuam9pbignLCAnKVxuXG5cdFx0aWYgbm90IF8uaW5jbHVkZXMoW1wiTGF5ZXJcIiwgXCJUZXh0TGF5ZXJcIiwgXCJTY3JvbGxDb21wb25lbnRcIl0sIGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cdFx0XHRuYW1lcy5wdXNoKGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cblx0XHRAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudCwgbmFtZXMpXG5cblx0Y2xpY2tIb3ZlcmVkRWxlbWVudDogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblx0XHRyZXR1cm4gaWYgbm90IGV2ZW50XG5cdFx0cmV0dXJuIGlmIG5vdCBldmVudC50YXJnZXRcblx0XHRyZXR1cm4gaWYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnU3BlY0VsZW1lbnQnKVxuXHRcdHJldHVybiBpZiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW1lbWVMaW5rJylcblxuXHRcdGUgPSAoZXZlbnQ/LnRhcmdldCA/IEBob3ZlcmVkRWxlbWVudClcblxuXHRcdGxheWVyID0gQGdldExheWVyRnJvbUVsZW1lbnQoZSlcblx0XHRyZXR1cm4gaWYgbm90IGxheWVyXG5cblx0XHRlbGVtZW50ID0gbGF5ZXIuX2VsZW1lbnRcblxuXHRcdGlmIGVsZW1lbnQgaXMgQHNlbGVjdGVkRWxlbWVudFxuXHRcdFx0QGRlc2VsZWN0KGVsZW1lbnQsIGxheWVyKVxuXHRcdGVsc2Vcblx0XHRcdEBzZWxlY3QoZWxlbWVudCwgbGF5ZXIpXG5cblx0c2VsZWN0OiAoZWxlbWVudCkgPT5cblx0XHRAc2VsZWN0ZWRFbGVtZW50ID0gZWxlbWVudCA/IEBob3ZlcmVkTGF5ZXIuX2VsZW1lbnRcblx0XHRVdGlscy5kZWxheSAwLCBAZm9jdXNcblxuXHRkZXNlbGVjdDogKGVsZW1lbnQpID0+XG5cdFx0QHNlbGVjdGVkRWxlbWVudCA9IHVuZGVmaW5lZFxuXHRcdFV0aWxzLmRlbGF5IDAsIEBmb2N1c1xuXG5cdGdldExheWVyRGltZW5zaW9uczogKGxheWVyKSA9PlxuXHRcdGZyYW1lID0gVXRpbHMuYm91bmRpbmdGcmFtZShsYXllcilcblx0XHRmcmFtZSA9IEBmcmFtaWZ5KGZyYW1lKVxuXHRcdHJldHVybiBmcmFtZVxuXG5cdGZyYW1pZnk6IChmcmFtZSkgLT5cblx0XHRmcmFtZS5tYXhYID0gZnJhbWUueCArIGZyYW1lLndpZHRoXG5cdFx0ZnJhbWUubWlkWCA9IFV0aWxzLnJvdW5kKGZyYW1lLnggKyBmcmFtZS53aWR0aC8yKVxuXG5cdFx0ZnJhbWUubWF4WSA9IGZyYW1lLnkgKyBmcmFtZS5oZWlnaHRcblx0XHRmcmFtZS5taWRZID0gVXRpbHMucm91bmQoZnJhbWUueSArIGZyYW1lLmhlaWdodC8yKVxuXG5cdFx0cmV0dXJuIGZyYW1lXG5cblx0Z2V0RGltZW5zaW9uczogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0ZCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdGRpbWVuc2lvbnMgPSB7XG5cdFx0XHR4OiBkLmxlZnRcblx0XHRcdHk6IGQudG9wXG5cdFx0XHR3aWR0aDogZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBkLmhlaWdodFxuXHRcdFx0bWlkWDogZC5sZWZ0ICsgKGQud2lkdGggLyAyKVxuXHRcdFx0bWlkWTogZC50b3AgKyAoZC5oZWlnaHQgLyAyKVxuXHRcdFx0bWF4WDogZC5sZWZ0ICsgZC53aWR0aFxuXHRcdFx0bWF4WTogZC50b3AgKyBkLmhlaWdodFxuXHRcdFx0ZnJhbWU6IGRcblx0XHR9XG5cblx0XHRyZXR1cm4gZGltZW5zaW9uc1xuXG5cdG1ha2VMaW5lOiAocG9pbnRBLCBwb2ludEIsIGxhYmVsID0gdHJ1ZSkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxpbmUgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV19XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgcG9pbnRBWzBdIGlzIHBvaW50QlswXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF0gLSA1fSAje3BvaW50QVsxXX0gTCAje3BvaW50QVswXSArIDV9ICN7cG9pbnRBWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXSAtIDV9ICN7cG9pbnRCWzFdfSBMICN7cG9pbnRCWzBdICsgNX0gI3twb2ludEJbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGVsc2UgaWYgcG9pbnRBWzFdIGlzIHBvaW50QlsxXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdIC0gNX0gTCAje3BvaW50QVswXX0gI3twb2ludEFbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXX0gI3twb2ludEJbMV0gLSA1fSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRtYWtlTGFiZWw6ICh4LCB5LCB0ZXh0KSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGFiZWwgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICd0ZXh0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHhcblx0XHRcdHk6IHlcblx0XHRcdCdmb250LWZhbWlseSc6IEBmb250RmFtaWx5XG5cdFx0XHQnZm9udC1zaXplJzogQGZvbnRTaXplXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBAZm9udFdlaWdodFxuXHRcdFx0ZmlsbDogQHNlY29uZGFyeUNvbG9yXG5cdFx0XHR0ZXh0OiBNYXRoLmZsb29yKHRleHQgLyBAcmF0aW8pXG5cblx0XHRsID0gQGdldERpbWVuc2lvbnMobGFiZWwuZWxlbWVudClcblxuXHRcdGxhYmVsLnggPSB4IC0gbC53aWR0aCAvIDJcblx0XHRsYWJlbC55ID0geSArIGwuaGVpZ2h0IC8gNCAtIDFcblxuXHRcdGJveCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogbGFiZWwueCAtIEBwYWRkaW5nLmxlZnRcblx0XHRcdHk6IGxhYmVsLnkgLSBsLmhlaWdodCArIDFcblx0XHRcdHdpZHRoOiBsLndpZHRoICsgQHBhZGRpbmcubGVmdCArIEBwYWRkaW5nLnJpZ2h0XG5cdFx0XHRoZWlnaHQ6IGwuaGVpZ2h0ICsgQHBhZGRpbmcudG9wICsgQHBhZGRpbmcuYm90dG9tICsgMVxuXHRcdFx0cng6IEBib3JkZXJSYWRpdXNcblx0XHRcdHJ5OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRmaWxsOiBuZXcgQ29sb3IoY29sb3IpLmRhcmtlbig0MClcblx0XHRcdCMgZmlsbDogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHRtYWtlQm91bmRpbmdSZWN0czogKHMsIGgpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBzIG9yIG5vdCBoXG5cblx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGlmIEBob3ZlcmVkRWxlbWVudCBpcyBAc2NyZWVuRWxlbWVudFxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblxuXHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKC4yKVxuXG5cdFx0aWYgQHNlbGVjdGVkRWxlbWVudCBpcyBAc2NyZWVuRWxlbWVudFxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoMClcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWQsIGhvdmVyZWQpID0+XG5cblx0XHRzID0gQGdldERpbWVuc2lvbnMoQHNlbGVjdGVkRWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoQGhvdmVyZWRFbGVtZW50KVxuXHRcdGYgPSBAZ2V0RGltZW5zaW9ucyhAc2NyZWVuRWxlbWVudClcblxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXHRcdHJldHVybiBpZiBAaG92ZXJlZExheWVyPy52aXNpYmxlIGlzIGZhbHNlXG5cdFx0cmV0dXJuIGlmIEBob3ZlcmVkTGF5ZXI/Lm9wYWNpdHkgaXMgMFxuXHRcdFxuXHRcdCMgQG1ha2VEYXNoZWRMaW5lcyhoLCBmLCBAY29sb3IsIDApXG5cdFx0QG1ha2VEYXNoZWRMaW5lcyhzLCBmLCBAc2VsZWN0ZWRDb2xvciwgNSlcblxuXHRcdEBtYWtlQm91bmRpbmdSZWN0cyhzLCBoKVxuXG5cdFx0QHJhdGlvID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyBTY3JlZW4ud2lkdGhcblxuXHRcdGlmIEBzZWxlY3RlZEVsZW1lbnQgaXMgQGhvdmVyZWRFbGVtZW50XG5cdFx0XHRoID0gZlxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdHNldFBhbmVsUHJvcGVydGllczogKCkgPT5cblx0XHRoID0gQGhvdmVyZWRMYXllclxuXHRcdGhlID0gQGhvdmVyZWRFbGVtZW50XG5cdFx0cyA9IEBzZWxlY3RlZExheWVyXG5cdFx0c2UgPSBAc2VsZWN0ZWRFbGVtZW50XG5cblx0XHRsYXllciA9IHMgPyBoXG5cblx0XHRpZiBub3QgbGF5ZXI/XG5cdFx0XHRAc3BlY1BhbmVsLmNsZWFyUHJvcHMoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRwcm9wcyA9IGxheWVyLnByb3BzXG5cblx0XHRfLmFzc2lnbiBwcm9wcyxcblx0XHRcdHg6IGxheWVyLnNjcmVlbkZyYW1lLnhcblx0XHRcdHk6IGxheWVyLnNjcmVlbkZyYW1lLnlcblx0XHRcdGNvbXBvbmVudE5hbWU6IGxheWVyLmNvbnN0cnVjdG9yLm5hbWVcblx0XHRcdGNvbXBvbmVudE5hbWVzOiBAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudClcblx0XHRcdHBhcmVudE5hbWU6IGxheWVyLnBhcmVudD8ubmFtZVxuXG5cdFx0Xy5hc3NpZ24gQHNwZWNQYW5lbCwgcHJvcHNcblxuXHRcdEBzcGVjUGFuZWwuc2V0VGV4dFN0eWxlcyhsYXllci5mb250RmFtaWx5KVxuXG5cdHRyeUZvY3VzOiAoZXZlbnQpID0+XG5cdFx0QGN1cnJlbnRIb3ZlcmVkID0gZXZlbnQudGFyZ2V0XG5cdFx0ZG8gKGV2ZW50KSA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgLjA0LCA9PlxuXHRcdFx0XHRpZiBAY3VycmVudEhvdmVyZWQgaXMgZXZlbnQudGFyZ2V0XG5cdFx0XHRcdFx0QGZvY3VzKGV2ZW50KVxuXG5cdGZvY3VzOiAoZXZlbnQpID0+XG5cdFx0aWYgQGVuYWJsZWQgaXMgZmFsc2Vcblx0XHRcdHJldHVybiBcblxuXHRcdEB1bmZvY3VzKClcblxuXHRcdEBzZWxlY3RlZEVsZW1lbnQgPz0gQHNjcmVlbkVsZW1lbnRcblx0XHRAc2VsZWN0ZWRMYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KEBzZWxlY3RlZEVsZW1lbnQpXG5cblx0XHRob3ZlcmVkRWxlbWVudCA9IChldmVudD8udGFyZ2V0ID8gQGhvdmVyZWRFbGVtZW50ID8gQHNjcmVlbkVsZW1lbnQpXG5cblx0XHRAaG92ZXJlZExheWVyID0gQGdldExheWVyRnJvbUVsZW1lbnQoaG92ZXJlZEVsZW1lbnQpXG5cblx0XHRAaG92ZXJlZEVsZW1lbnQgPSBAaG92ZXJlZExheWVyPy5fZWxlbWVudCA/IEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZExheWVyXG5cblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKClcblxuXHRcdEBzaG93RGlzdGFuY2VzKEBzZWxlY3RlZEVsZW1lbnQsIEBob3ZlcmVkRWxlbWVudClcblxuXHR1bmZvY3VzOiAoKSA9PlxuXHRcdGN0eC5yZW1vdmVBbGwoKVxuXHRcdGlmIG5vdCBAc2VsZWN0ZWRMYXllciB0aGVuIEBzcGVjUGFuZWwuY2xlYXJQcm9wcygpXG5cblxuZXhwb3J0cy5nb3RjaGEgPSBuZXcgR290Y2hhXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBRGNBLElBQUEsbU9BQUE7RUFBQTs7OztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBRUEsVUFBQSxHQUFhOztBQUNiLEdBQUEsR0FBTTs7QUFFTixTQUFBLEdBQVk7O0FBR1osS0FBSyxDQUFDLFNBQU4sQ0FBZ0Isb3NDQUFoQjs7QUFvRkE7QUFBQSxLQUFBLHFDQUFBOztFQUNDLEtBQUEsR0FBUSxNQUFNLENBQUMsTUFBTyxDQUFBLElBQUE7RUFDdEIsSUFBVSxDQUFJLEtBQWQ7QUFBQSxXQUFBOztFQUVBLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQXpCLENBQTZCLHFCQUE3QjtBQUpEOztBQWtCQSxLQUFBLEdBQVEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkI7O0FBQ1IsS0FBSyxDQUFDLEVBQU4sR0FBVzs7QUFDWCxLQUFBLEdBQVEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsMkJBQXhCOztBQUNSLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLENBQUEsU0FBQSxLQUFBO1NBQUEsU0FBQTtXQUFHLEtBQUssQ0FBQyxXQUFOLENBQWtCLEtBQWxCO0VBQUg7QUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWY7O0FBY0EsU0FBQSxHQUFZLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCOztBQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixTQUExQjs7O0FBZ0JBOzs7Ozs7OztBQVVNO0VBQ1Esb0JBQUMsT0FBRDtBQUNaLFFBQUE7O01BRGEsVUFBVTs7O0lBQ3ZCLElBQUMsQ0FBQSxhQUFELEdBQWlCO0lBRWpCLElBQUMsQ0FB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
