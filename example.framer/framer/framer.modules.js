require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecBox, SpecColorValueBox, SpecDivider, SpecElement, SpecLabel, SpecPanel, SpecValueBox, SpecWideValueBox, ctx, i, layer, len, name, panel, ref, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

svgContext = void 0;

ctx = void 0;

startOpen = false;

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n.SpecSelectable {\n	cursor: pointer;\n	-webkit-box-sizing: border-box;\n	-moz-box-sizing: border-box;\n	box-sizing: border-box;\n}\n\n.SpecSelectable:hover {\n	outline: 1px solid rgba(72, 207, 255, 1.000) !important;\n}\n\n.SpecSelectable:active {\n	outline: 1px solid rgba(255, 1, 255, 1.000) !important;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n\n.mememeLink {\n	opacity: .4;\n}\n\n.mememeLink:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}");

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
    this.githubIcon.href = "http://github.com/steveruizok";
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
    Framer.Device.hands.on("change:x", this.showTransition);
  }

  Gotcha.prototype.toggle = function(event) {
    if (event.key === "`") {
      if (this.opened) {
        this.disable();
      } else {
        this.enable();
      }
      return;
    }
    if (event.key === "/") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuY3R4ID0gdW5kZWZpbmVkXG5cbnN0YXJ0T3BlbiA9IGZhbHNlXG5cblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cblx0fVxuXG5cdC5TcGVjTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZSB7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHQtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZTpob3ZlciB7XG5cdFx0b3V0bGluZTogMXB4IHNvbGlkIHJnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCkgIWltcG9ydGFudDtcblx0fVxuXG5cdC5TcGVjU2VsZWN0YWJsZTphY3RpdmUge1xuXHRcdG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCkgIWltcG9ydGFudDtcblx0fVxuXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93Q29waWVkIHtcblx0XHQwJSB7IFxuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApO1xuXHRcdH1cblxuXHRcdDEwMCUge1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEuMDAwKTtcblx0XHR9XG5cdH1cblxuXHQuY29waWVkIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG5cdH1cblxuXHQubWVtZW1lTGluayB7XG5cdFx0b3BhY2l0eTogLjQ7XG5cdH1cblxuXHQubWVtZW1lTGluazpob3ZlciB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHRcblx0I2xpbmtlZGluX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogNjhweDtcblx0fVxuXG5cdFxuXHQjdHdpdHRlcl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA0cHg7XG5cdFx0cmlnaHQ6IDRweDtcblx0fVxuXG5cdCNnaXRodWJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiAzNnB4O1xuXHR9XG5cblx0LmZyYW1lckxheWVyIHsgXG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHR9IFxuXHRcblx0Lklnbm9yZVBvaW50ZXJFdmVudHMge1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHR9XG5cIlwiXCJcblxuZm9yIG5hbWUgaW4gWydzY3JlZW5CYWNrZ3JvdW5kJywgJ3Bob25lJywgJ3NjcmVlbicsICdoYW5kc0ltYWdlTGF5ZXInLCAnc2NyZWVuTWFzaycsICdjb250ZW50J11cblx0bGF5ZXIgPSBGcmFtZXIuRGV2aWNlW25hbWVdXG5cdHJldHVybiBpZiBub3QgbGF5ZXJcblxuXHRsYXllci5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhcbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcbiMgXHRcbiMgXHRcblxuXG5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5wYW5lbC5pZCA9ICdTcGVjQ29udGFpbmVyJ1xudmlld0MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtRGVmYXVsdCcpXG5VdGlscy5kZWxheSAwLCA9PiB2aWV3Qy5hcHBlbmRDaGlsZChwYW5lbClcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICA4ODg4ODhiYVxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICA4OCAgICBgOGJcbiMgXHRgWTg4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gZDg4ODhQIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAuICAuZFBcbiMgXHQgICAgICBgOGIgODhvb29vZDggODgnICBgXCJcIiA4OCcgIGA4OCA4OG9vb29kOCAgIDg4ICAgIDg4ICAgYDhiLiA4OCcgIGA4OCAgYDhiZDgnXG4jIFx0ZDgnICAgLjhQIDg4LiAgLi4uIDg4LiAgLi4uIDg4ICAgICAgIDg4LiAgLi4uICAgODggICAgODggICAgLjg4IDg4LiAgLjg4ICAuZDg4Yi5cbiMgXHQgWTg4ODg4UCAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICAgICAgYDg4ODg4UCcgICBkUCAgICA4ODg4ODg4OFAgYDg4ODg4UCcgZFAnICBgZFBcbiMgXHRcbiMgXHRcblxuc2VjcmV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWNyZXRCb3gpXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAjIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICMgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICMgXHRgWTg4ODg4Yi4gODggICAgLjhQIDg4ICAgICAgICAgICA4OCAgICAgICAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFAgLmQ4ODg4Yi5cbiAjIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIyBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICMgXHQgWTg4ODg4UCAgODg4ODg4JyAgICBgODg4ODgnICAgICAgWTg4ODg4UCcgYDg4ODg4UCcgZFAgIGRQICBkUCA4OFk4ODhQJyBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgIGRQICAgYDg4ODg4UCdcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuXG4jIyNcblx0ICwtLiAgLiAgICwgICwtLiAgLC0uICAgICAgICAgLiAgICAgICAgICAgLlxuXHQoICAgYCB8ICAvICAvICAgIC8gICAgICAgICAgICB8ICAgICAgICAgICB8XG5cdCBgLS4gIHwgLyAgIHwgLS4gfCAgICAsLS4gOy0uIHwtICAsLS4gLiAsIHwtXG5cdC4gICApIHwvICAgIFxcICB8IFxcICAgIHwgfCB8IHwgfCAgIHwtJyAgWCAgfFxuXHQgYC0nICAnICAgICAgYC0nICBgLScgYC0nICcgJyBgLScgYC0nICcgYCBgLSdcblx0XG4jIyNcblxuXG5jbGFzcyBTVkdDb250ZXh0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBzaGFwZXMgPSBbXVxuXG5cdFx0c3ZnQ29udGV4dCA9IEBcblxuXHRcdCMgbmFtZXNwYWNlXG5cdFx0c3ZnTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcblx0XHQjIHNldCBhdHRyaWJ1dGVzIFxuXHRcdHNldEF0dHJpYnV0ZXMgPSAoZWxlbWVudCwgYXR0cmlidXRlcyA9IHt9KSAtPlxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdFx0QGZyYW1lRWxlbWVudCA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuQmFja2dyb3VuZC5fZWxlbWVudFxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XG5cdFx0Y29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGcmFtZXJDb250ZXh0Um9vdC1Ub3VjaEVtdWxhdG9yJylcblx0XHRjb250ZXh0LmFwcGVuZENoaWxkKEBzdmcpXG5cblx0XHRAc2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckNvbnRleHQnKVswXVxuXHRcdHNGcmFtZSA9IEBzY3JlZW5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdGFkZFNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHNoYXBlcy5wdXNoKHNoYXBlKVxuXHRcdEBzaG93U2hhcGUoc2hhcGUpXG5cdFx0XG5cdHJlbW92ZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QGhpZGVTaGFwZShzaGFwZSlcblx0XHRfLnB1bGwoQHNoYXBlcywgc2hhcGUpXG5cdFx0XG5cdGhpZGVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XG5cdHNob3dTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRcblx0YWRkRGVmOiAoZGVmKSAtPlxuXHRcdEBzdmdEZWZzLmFwcGVuZENoaWxkKGRlZilcblxuXHRyZW1vdmVBbGw6ID0+XG5cdFx0Zm9yIHNoYXBlIGluIEBzaGFwZXNcblx0XHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRAc2hhcGVzID0gW11cblxuXG4jIyNcblx0ICwtLiAgLiAgICwgICwtLiAgLC0uICAuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuIDstLlxuXHQoICAgYCB8ICAvICAvICAgICggICBgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgfCAgKVxuXHQgYC0uICB8IC8gICB8IC0uICBgLS4gIHwtLiAsLTogOy0uICwtLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsLXwgfC0nXG5cdC4gICApIHwvICAgIFxcICB8IC4gICApIHwgfCB8IHwgfCB8IHwtJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHwgfFxuXHQgYC0nICAnICAgICAgYC0nICBgLScgICcgJyBgLWAgfC0nIGAtJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgLScgJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge3R5cGU6ICdjaXJjbGUnfSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAcGFyZW50ID0gc3ZnQ29udGV4dFxuXHRcdFxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuXHRcdFx0XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcblx0XHRcdG9wdGlvbnMudHlwZVxuXHRcdFx0KVxuXG5cdFx0QHNldEN1c3RvbVByb3BlcnR5KCd0ZXh0JywgJ3RleHRDb250ZW50JywgJ3RleHRDb250ZW50Jywgb3B0aW9ucy50ZXh0KVxuXHRcdFx0XHRcblx0XHQjIGFzc2lnbiBhdHRyaWJ1dGVzIHNldCBieSBvcHRpb25zXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuXHRcdFx0QHNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdFx0QHBhcmVudC5hZGRTaGFwZShAKVxuXHRcdFxuXHRcdEBzaG93KClcblx0XHRcdFxuXHRzZXRBdHRyaWJ1dGU6IChrZXksIHZhbHVlKSA9PlxuXHRcdHJldHVybiBpZiBrZXkgaXMgJ3RleHQnXG5cdFx0aWYgbm90IEBba2V5XT9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdGdldDogPT5cblx0XHRcdFx0XHRyZXR1cm4gQGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSlcblx0XHRcdFx0c2V0OiAodmFsdWUpID0+IFxuXHRcdFx0XHRcdEBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXHRcdFxuXHRcdEBba2V5XSA9IHZhbHVlXG5cdFxuXHRzZXRDdXN0b21Qcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgcmV0dXJuVmFsdWUsIHNldFZhbHVlLCBzdGFydFZhbHVlKSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiAtPlxuXHRcdFx0XHRyZXR1cm4gcmV0dXJuVmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAZWxlbWVudFtzZXRWYWx1ZV0gPSB2YWx1ZVxuXG5cdFx0QFt2YXJpYWJsZU5hbWVdID0gc3RhcnRWYWx1ZVxuXG5cdGhpZGU6IC0+IFxuXHRcdEBwYXJlbnQuaGlkZVNoYXBlKEApXG5cdFxuXHRzaG93OiAtPiBcblx0XHRAcGFyZW50LnNob3dTaGFwZShAKVxuXHRcdFxuXHRyZW1vdmU6IC0+XG5cdFx0QHBhcmVudC5yZW1vdmVTaGFwZShAKVxuXG5cbmNsYXNzIERhc2hlZExpbmUgZXh0ZW5kcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKHBvaW50QSwgcG9pbnRCLCBjb2xvciA9ICcjMDAwJywgb2Zmc2V0ID0gMCwgb3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBLnh9ICN7cG9pbnRBLnl9IEwgI3twb2ludEIueH0gI3twb2ludEIueX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cdFx0XHQnc3Ryb2tlLWRhc2hhcnJheSc6IFwiNSwgNVwiXG5cdFx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQnOiBvZmZzZXRcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXG5jdHggPSBuZXcgU1ZHQ29udGV4dFxuXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODggICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCAgICA4OCAgICAgICAgODgnICBgODggODgnYDg4J2A4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OCAgIDg4ICAgWThvb29vby5cbiMgXHQgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS0uIC4gICAgICAgICAgICAgICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgIHwgICAgICAgICAgICAgICAgICAgfFxuXHQgYC0uICA7LS4gLC0uICwtLiB8LSAgIHwgLC0uIDstLi0uICwtLiA7LS4gfC1cblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgICB8IHwtJyB8IHwgfCB8LScgfCB8IHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0tJyAnIGAtJyAnICcgJyBgLScgJyAnIGAtJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKGNsYXNzTmFtZSwgb3B0aW9ucyA9IHt9LCB0ZXh0KSAtPlxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkIGNsYXNzTmFtZVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQgJ1NwZWNFbGVtZW50J1xuXG5cdFx0Xy5hc3NpZ24gQGVsZW1lbnQuc3R5bGUsIG9wdGlvbnNcblxuXHRcdHBhbmVsLmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0QHJvb3RFbGVtZW50ID0gQGVsZW1lbnRcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgICAgICAgLiAgICAgICAuXG5cdCggICBgICAgICAgICAgICAgIHwgICAgICAgIHwgICAgICAgfFxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICAgICwtOiB8LS4gLC0uIHxcblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgICB8IHwgfCB8IHwtJyB8XG5cdCBgLScgIHwtJyBgLScgYC0nIGAtLScgYC1gIGAtJyBgLScgJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjTGFiZWwgZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAnbm9uZSdcblx0XHRcdCdmb250LWZhbWlseSc6ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiAnMWVtJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogJzQwMCdcblx0XHRcdCdjb2xvcic6ICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEuMDAwKSdcblxuXHRcdHN1cGVyICdTcGVjTGFiZWwnLCBvcHRpb25zXG5cblx0XHRAdGV4dExheWVyID0gbmV3IFNwZWNFbGVtZW50ICdTcGVjTGFiZWwnLFxuXHRcdFx0J2ZvbnQtZmFtaWx5Jzogb3B0aW9uc1snZm9udC1mYW1pbHknXSA/ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiBvcHRpb25zWydmb250LXNpemUnXSA/ICcxZW0nXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBvcHRpb25zWydmb250LXdlaWdodCddID8gJzUwMCdcblx0XHRcdCdjb2xvcic6IG9wdGlvbnNbJ2NvbG9yJ10gPyAncmdiYSgxMzYsIDEzNiwgMTM2LCAxLjAwMCknXG5cdFx0XHQnbGVmdCc6IG9wdGlvbnMubGVmdFxuXHRcdFx0J3JpZ2h0Jzogb3B0aW9ucy5yaWdodFxuXG5cdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQgQHRleHRMYXllci5lbGVtZW50XG5cblx0XHRvcHRpb25zLnBhcmVudD8uYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndGV4dCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAdGV4dExheWVyLmVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ251bWJlcicgdGhlbiB2YWx1ZSA9IHZhbHVlLnRvRml4ZWQoKVxuXHRcdFx0XHRAdGV4dExheWVyLmVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cdFx0QHRleHQgPSBvcHRpb25zLnRleHQgPyAnJ1xuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLC0uICAgICAgICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICBcXCBvICAgICBvICAgfFxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICB8IC4gLiAsIC4gLC18ICwtLiA7LS5cblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgLyB8IHwvICB8IHwgfCB8LScgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLScgICcgJyAgICcgYC0nIGAtJyAnXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNEaXZpZGVyIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzhweCdcblx0XHRcdCd3aWR0aCc6ICcyMDhweCdcblx0XHRcdCdoZWlnaHQnOiAnMXB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAnIzAwMCdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblxuXHRcdHN1cGVyICdTcGVjRGl2aWRlcicsIG9wdGlvbnNcblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLlxuXHQoICAgYCAgICAgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwtPCAgLC0uIC4gLFxuXHQuICAgKSB8IHwgfC0nIHwgICB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0JveCBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiB1bmRlZmluZWRcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2xlZnQnOiAnOTZweCdcblx0XHRcdCd3aWR0aCc6ICc2NHB4J1xuXHRcdFx0J2hlaWdodCc6ICcyNHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnYm94LXNoYWRvdyc6ICdpbnNldCAwcHggMHB4IDBweCA0cHggcmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAgLC0uICAgICAuICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgLyAgICAgICAgfCAgICAgICAgIHwgIC8gICAgICB8ICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8ICAgICwtLiB8ICwtLiA7LS4gfCAvICAgLC06IHwgLiAuICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgXFwgICAgfCB8IHwgfCB8IHwgICB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICBgLScgYC0nICcgYC0nICcgICAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuY2xhc3MgU3BlY0NvbG9yVmFsdWVCb3ggZXh0ZW5kcyBTcGVjQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc5NnB4J1xuXHRcdFx0J3dpZHRoJzogJzY0cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzI0cHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblx0XHRcdCdib3gtc2hhZG93JzogJ2luc2V0IDBweCAwcHggMHB4IDRweCByZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdmFsdWUgPyAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0aWYgQGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTcGVjU2VsZWN0YWJsZScpXG5cdFx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdFx0XHRlbHNlIGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ1NwZWNTZWxlY3RhYmxlJylcblxuXHRcdEB2YWx1ZSA9IG9wdGlvbnMudmFsdWVcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvICAgIHwgfCB8IHwgfCB8LScgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY1ZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdmb250LWZhbWlseSc6ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjQyZW0nXG5cdFx0XHQncGFkZGluZy10b3AnOiAnNXB4J1xuXHRcdFx0J3BhZGRpbmctbGVmdCc6ICc4cHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2xpbmUtaGVpZ2h0JzogJzFlbSdcblx0XHRcdCdvdmVyZmxvdyc6ICdoaWRkZW4nXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAdmFsdWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdsZWZ0JzogJzZweCdcblx0XHRcdCd0b3AnOiAnNnB4J1xuXHRcdFx0J2NvbG9yJzogJyNGRkYnXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnNTAwJ1xuXG5cdFx0QHVuaXRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJy45ZW0nXG5cdFx0XHQncmlnaHQnOiAnMnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQndGV4dC1hbGlnbic6ICdyaWdodCdcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdGlmIEBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnU3BlY1NlbGVjdGFibGUnKVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRcdFx0ZWxzZSBpZiBAZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ1NwZWNTZWxlY3RhYmxlJylcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdTcGVjU2VsZWN0YWJsZScpXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gJydcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgIC4gICAgIC4gICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgLiB8IG8gICB8ICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCApICkgLiAsLXwgLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvfC8gIHwgfCB8IHwtJyB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICcgJyAgICcgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjV2lkZVZhbHVlQm94IGV4dGVuZHMgU3BlY1ZhbHVlQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEzNnB4J1xuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIyNcblx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG5cdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG5cdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcblx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcblx0IFk4ODg4OFAgIDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4OFAnICBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcblx0ICAgICAgICAgIDg4XG5cdCAgICAgICAgICBkUFxuIyMjXG5cblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QHBhbmVsID0gcGFuZWxcblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAcGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAcGFuZWwuc3R5bGUub3BhY2l0eSA9IGlmIHN0YXJ0T3BlbiB0aGVuICcxJyBlbHNlICcwJ1xuXG5cdFx0Y29sMHggPSAnNHB4J1xuXHRcdGNvbDF4ID0gJzg0cHgnXG5cdFx0Y29sMnggPSAnMTU2cHgnXG5cblx0XHRyb3cgPSAobnVtLCBvZmZzZXQgPSAwKSAtPiByZXR1cm4gKDE2ICsgKDM1ICogbnVtKSAtIG9mZnNldCkgKyAncHgnXG5cblx0XHQjIHBvc1xuXG5cdFx0QHBvc0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMCwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyBzaXplXG5cblx0XHRAc2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAd1ZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIGJhY2tncm91bmRcblxuXHRcdEBiZ0NvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygyLCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBiZ0NvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDIpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBvcGFjaXR5XG5cblx0XHRAb3BhY2l0eUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMywgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAb3BhY2l0eVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMylcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMS4wJ1xuXHRcdFx0dW5pdDogJ2EnXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMSA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coNC4yNSwgMilcblxuXHRcdCMgYm9yZGVyXG5cblx0XHRAYm9yZGVyQ29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDQuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0JvcmRlcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAYm9yZGVyQ29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAYm9yZGVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg0Ljc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIHJhZGl1c1xuXG5cdFx0QHJhZGl1c0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNS43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEByYWRpdXNWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDUuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzAnXG5cblx0XHQjIHNoYWRvd1xuXG5cdFx0QHNoYWRvd0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNi43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBzaGFkb3dDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdEBzaGFkb3dTcHJlYWRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDYuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzEnXG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBzaGFkb3dYVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg3Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAc2hhZG93WVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0QHNoYWRvd0JsdXJWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDguNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2JsdXInXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMiA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coMTAsIDIpXG5cblx0XHQjIEZvbnRcblxuXHRcdEBmb250TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMC4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnRm9udCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udEZhbWlseVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEwLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgQ29sb3JcblxuXHRcdEBjb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTEuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBjb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAZm9udFN0eWxlVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cblx0XHQjIEZvbnQgU2l6ZVxuXG5cdFx0QGZvbnRTaXplTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMi4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udFNpemVWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdzJ1xuXG5cdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyBMaW5lIEhlaWdodFxuXG5cdFx0QGxpbmVIaWdodExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTMuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0hlaWdodCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbGluZUhlaWdodFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTMuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2xoJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDE0LjUsIDIpXG5cdFx0XG5cdFx0IyBOYW1lXG5cdFx0QG5hbWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdOYW1lJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBuYW1lVmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBDb21wb25lbnRcblxuXHRcdEBjb21wb25lbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE2KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGNvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE2KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgUGFyZW50IENvbXBvbmVudFxuXG5cdFx0QHBhcmVudENvbXBvbmVudExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTcpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1BhcnQgb2YnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHBhcmVudENvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE3KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXG5cdFx0IyBMaW5rc1xuXG5cdFx0QGxpbmtlZGluSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdEBsaW5rZWRpbkljb24uaHJlZiA9IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vaW4vc3RldmVydWl6b2tcIlxuXHRcdEBsaW5rZWRpbkljb24uaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGlkPVwibGlua2VkaW5fbG9nb1wiIGNsYXNzPVwibWVtZW1lTGlua1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5IDBoLTE0Yy0yLjc2MSAwLTUgMi4yMzktNSA1djE0YzAgMi43NjEgMi4yMzkgNSA1IDVoMTRjMi43NjIgMCA1LTIuMjM5IDUtNXYtMTRjMC0yLjc2MS0yLjIzOC01LTUtNXptLTExIDE5aC0zdi0xMWgzdjExem0tMS41LTEyLjI2OGMtLjk2NiAwLTEuNzUtLjc5LTEuNzUtMS43NjRzLjc4NC0xLjc2NCAxLjc1LTEuNzY0IDEuNzUuNzkgMS43NSAxLjc2NC0uNzgzIDEuNzY0LTEuNzUgMS43NjR6bTEzLjUgMTIuMjY4aC0zdi01LjYwNGMwLTMuMzY4LTQtMy4xMTMtNCAwdjUuNjA0aC0zdi0xMWgzdjEuNzY1YzEuMzk2LTIuNTg2IDctMi43NzcgNyAyLjQ3NnY2Ljc1OXpcIi8+PC9zdmc+J1xuXG5cdFx0QGdpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAZ2l0aHViSWNvbi5ocmVmID0gXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0QGdpdGh1Ykljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjBweFwiIHdpZHRoPVwiMjBweFwiIGlkPVwiZ2l0aHViX2xvZ29cIiBjbGFzcz1cIm1lbWVtZUxpbmtcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIj48cGF0aCBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiBkPVwiTTUxMiAwQzIyOS4yNSAwIDAgMjI5LjI1IDAgNTEyYzAgMjI2LjI1IDE0Ni42ODggNDE4LjEyNSAzNTAuMTU2IDQ4NS44MTIgMjUuNTk0IDQuNjg4IDM0LjkzOC0xMS4xMjUgMzQuOTM4LTI0LjYyNSAwLTEyLjE4OC0wLjQ2OS01Mi41NjItMC43MTktOTUuMzEyQzI0MiA5MDguODEyIDIxMS45MDYgODE3LjUgMjExLjkwNiA4MTcuNWMtMjMuMzEyLTU5LjEyNS01Ni44NDQtNzQuODc1LTU2Ljg0NC03NC44NzUtNDYuNTMxLTMxLjc1IDMuNTMtMzEuMTI1IDMuNTMtMzEuMTI1IDUxLjQwNiAzLjU2MiA3OC40NyA1Mi43NSA3OC40NyA1Mi43NSA0NS42ODggNzguMjUgMTE5Ljg3NSA1NS42MjUgMTQ5IDQyLjUgNC42NTQtMzMgMTcuOTA0LTU1LjYyNSAzMi41LTY4LjM3NUMzMDQuOTA2IDcyNS40MzggMTg1LjM0NCA2ODEuNSAxODUuMzQ0IDQ4NS4zMTJjMC01NS45MzggMTkuOTY5LTEwMS41NjIgNTIuNjU2LTEzNy40MDYtNS4yMTktMTMtMjIuODQ0LTY1LjA5NCA1LjA2Mi0xMzUuNTYyIDAgMCA0Mi45MzgtMTMuNzUgMTQwLjgxMiA1Mi41IDQwLjgxMi0xMS40MDYgODQuNTk0LTE3LjAzMSAxMjguMTI1LTE3LjIxOSA0My41IDAuMTg4IDg3LjMxMiA1Ljg3NSAxMjguMTg4IDE3LjI4MSA5Ny42ODgtNjYuMzEyIDE0MC42ODgtNTIuNSAxNDAuNjg4LTUyLjUgMjggNzAuNTMxIDEwLjM3NSAxMjIuNTYyIDUuMTI1IDEzNS41IDMyLjgxMiAzNS44NDQgNTIuNjI1IDgxLjQ2OSA1Mi42MjUgMTM3LjQwNiAwIDE5Ni42ODgtMTE5Ljc1IDI0MC0yMzMuODEyIDI1Mi42ODggMTguNDM4IDE1Ljg3NSAzNC43NSA0NyAzNC43NSA5NC43NSAwIDY4LjQzOC0wLjY4OCAxMjMuNjI1LTAuNjg4IDE0MC41IDAgMTMuNjI1IDkuMzEyIDI5LjU2MiAzNS4yNSAyNC41NjJDODc3LjQzOCA5MzAgMTAyNCA3MzguMTI1IDEwMjQgNTEyIDEwMjQgMjI5LjI1IDc5NC43NSAwIDUxMiAwelwiIC8+PC9zdmc+J1xuXG5cdFx0QHR3aXR0ZXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0QHR3aXR0ZXJJY29uLmhyZWYgPSBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0QHR3aXR0ZXJJY29uLmlubmVySFRNTCA9ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGNsYXNzPVwibWVtZW1lTGlua1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblxuXHRcdGZvciBlbGVtZW50IGluIFtAbGlua2VkaW5JY29uLCBAZ2l0aHViSWNvbiwgQHR3aXR0ZXJJY29uXVxuXHRcdFx0cGFuZWwuYXBwZW5kQ2hpbGQoZWxlbWVudClcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVtZW1lTGluaycpXG5cblxuXHRcdCMgLS0tLVxuXG5cdFx0IyBwcm9wZXJ0aWVzXG5cblx0XHRwcm9wcyA9IFtcblx0XHRcdFsneCcsIEB4VmFsdWVCb3hdLFxuXHRcdFx0Wyd5JywgQHlWYWx1ZUJveF0sXG5cdFx0XHRbJ3dpZHRoJywgQHdWYWx1ZUJveF1cblx0XHRcdFsnaGVpZ2h0JywgQGhWYWx1ZUJveF1cblx0XHRcdFsnb3BhY2l0eScsIEBvcGFjaXR5VmFsdWVCb3gsIHRydWVdXG5cdFx0XHRbJ2JvcmRlcldpZHRoJywgQGJvcmRlclZhbHVlQm94XVxuXHRcdFx0Wydib3JkZXJSYWRpdXMnLCBAcmFkaXVzVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1NwcmVhZCcsIEBzaGFkb3dTcHJlYWRWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WCcsIEBzaGFkb3dYVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1knLCBAc2hhZG93WVZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dCbHVyJywgQHNoYWRvd0JsdXJWYWx1ZUJveF1cblx0XHRcdFsnZm9udEZhbWlseScsIEBmb250RmFtaWx5VmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRTaXplJywgQGZvbnRTaXplVmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRXZWlnaHQnLCBAZm9udFdlaWdodFZhbHVlQm94XVxuXHRcdFx0WydsaW5lSGVpZ2h0JywgQGxpbmVIZWlnaHRWYWx1ZUJveF1cblx0XHRcdFsnZm9udFN0eWxlJywgQGZvbnRTdHlsZVZhbHVlQm94XVxuXHRcdFx0Wydjb21wb25lbnROYW1lJywgQGNvbXBvbmVudFZhbHVlQm94XVxuXHRcdFx0Wydjb21wb25lbnROYW1lcycsIEBwYXJlbnRDb21wb25lbnRWYWx1ZUJveF1cblx0XHRcdFsnbmFtZScsIEBuYW1lVmFsdWVCb3hdXG5cdFx0XVxuXG5cdFx0Y29sb3JQcm9wcyA9IFtcblx0XHRcdFsnYmFja2dyb3VuZENvbG9yJywgQGJnQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnYm9yZGVyQ29sb3InLCBAYm9yZGVyQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93Q29sb3InLCBAc2hhZG93Q29sb3JWYWx1ZUJveF1cblx0XHRcdFsnY29sb3InLCBAY29sb3JWYWx1ZUJveF1cblx0XHRdXG5cblx0XHRmb3IgcHJvcCBpbiBwcm9wc1xuXHRcdFx0QGRlZmluZUN1c3RvbVByb3BlcnR5KHByb3BbMF0sIHByb3BbMV0sIHByb3BbMl0pXG5cdFx0XHRAYWRkQ29weUV2ZW50KHByb3BbMF0sIHByb3BbMV0pXG5cblx0XHRmb3IgcHJvcCBpbiBjb2xvclByb3BzXG5cdFx0XHRAZGVmaW5lQ3VzdG9tQ29sb3JQcm9wZXJ0eShwcm9wWzBdLCBwcm9wWzFdLCBwcm9wWzJdKVxuXHRcdFx0QGFkZENvcHlFdmVudChwcm9wWzBdLCBwcm9wWzFdKVxuXG5cdGRlZmluZUN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllciwgZmxvYXQpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6ID0+IHJldHVybiBAcHJvcHNbdmFyaWFibGVOYW1lXVxuXHRcdFx0c2V0OiAodmFsdWUpID0+XG5cdFx0XHRcdEBwcm9wc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVcblxuXHRcdFx0XHRpZiBub3QgdmFsdWU/IG9yIHZhbHVlIGlzICcwJ1xuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gJydcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRpZiBmbG9hdFxuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSA/ICcwJykudG9GaXhlZCgyKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGlmIHR5cGVvZiB2YWx1ZSBpcyAnbnVtYmVyJ1xuXHRcdFx0XHRcdHZhbHVlID0gcGFyc2VJbnQodmFsdWUpLnRvRml4ZWQoKVxuXHRcdFx0XHRcblx0XHRcdFx0bGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRcblx0ZGVmaW5lQ3VzdG9tQ29sb3JQcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgbGF5ZXIpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6ID0+IHJldHVybiBAcHJvcHNbdmFyaWFibGVOYW1lXVxuXHRcdFx0c2V0OiAodmFsdWUpID0+XG5cdFx0XHRcdEBwcm9wc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVcblx0XHRcdFx0bGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0XG5cblx0YWRkQ29weUV2ZW50OiAodmFyaWFibGVOYW1lLCBsYXllcikgLT5cblx0XHRkbyAodmFyaWFibGVOYW1lLCBsYXllcikgPT5cblx0XHRcdGxheWVyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0XHRAY29weUNvbnRlbnQoQFt2YXJpYWJsZU5hbWVdKVxuXHRcdFx0XHRAaGlnaGxpZ2h0KGxheWVyKVxuXG5cdGNvcHlDb250ZW50OiAoY29udGVudCkgPT5cblx0XHRzZWNyZXRCb3gudmFsdWUgPSBjb250ZW50XG5cdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRoaWdobGlnaHQ6IChsYXllcikgPT5cblx0XHRzdGFydEJvcmRlckNvbG9yID0gbGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ11cblx0XHRsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXSA9ICdyZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApJ1xuXHRcdHJlc2V0ID0gPT4gbGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSBzdGFydEJvcmRlckNvbG9yXG5cblx0XHRfLmRlbGF5KHJlc2V0LCAxMjApXG5cblx0Y2xlYXJQcm9wczogPT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBAcHJvcHNcblx0XHRcdEBba2V5XSA9IHVuZGVmaW5lZFxuXHRcdEBzZXRUZXh0U3R5bGVzKClcblxuXHRzZXRUZXh0U3R5bGVzOiAodmFsdWUpID0+XG5cblx0XHRmb3IgbGF5ZXIgaW4gW1xuXHRcdFx0QGZvbnRMYWJlbCxcblx0XHRcdEBmb250U2l6ZUxhYmVsLFxuXHRcdFx0QGNvbG9yTGFiZWwsXG5cdFx0XHRAbGluZUhpZ2h0TGFiZWwsXG5cdFx0XHRAZm9udEZhbWlseVZhbHVlQm94LCBcblx0XHRcdEBjb2xvclZhbHVlQm94LCBcblx0XHRcdEBmb250U2l6ZVZhbHVlQm94LCBcblx0XHRcdEBmb250V2VpZ2h0VmFsdWVCb3gsIFxuXHRcdFx0QGxpbmVIZWlnaHRWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFN0eWxlVmFsdWVCb3hcblx0XHRdXG5cdFx0XHRsYXllci5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpZiB2YWx1ZT8gdGhlbiAnMScgZWxzZSAnMCdcblxuXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4jIyNcblx0IC44ODg4OC4gICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG5cdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cblx0ODggICBZUDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG5cdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcblx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQOFxuXHRcblx0XG4jIyNcblxuXG5jbGFzcyBHb3RjaGFcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAc3BlY1BhbmVsID0gbmV3IFNwZWNQYW5lbFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2VsZWN0ZWRDb2xvcjogJ3JnYmEoMjU1LCAxLCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlY29uZGFyeUNvbG9yOiAnI0ZGRkZGRidcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblx0XHRcdGZvbnRTaXplOiAnMTAnXG5cdFx0XHRmb250V2VpZ2h0OiAnNTAwJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0XG5cdFx0XHRwYWRkaW5nOiB7dG9wOiAxLCBib3R0b206IDEsIGxlZnQ6IDMsIHJpZ2h0OiAzfVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGNvbG9yOiBvcHRpb25zLmNvbG9yXG5cdFx0XHRzZWxlY3RlZENvbG9yOiBvcHRpb25zLnNlbGVjdGVkQ29sb3Jcblx0XHRcdHNlY29uZGFyeUNvbG9yOiBvcHRpb25zLnNlY29uZGFyeUNvbG9yXG5cdFx0XHRmb250RmFtaWx5OiBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGZvbnRTaXplOiBvcHRpb25zLmZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBvcHRpb25zLmZvbnRXZWlnaHRcblx0XHRcdHNoYXBlczogW11cblx0XHRcdGJvcmRlclJhZGl1czogb3B0aW9ucy5ib3JkZXJSYWRpdXNcblx0XHRcdHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZ1xuXHRcdFx0Zm9jdXNlZEVsZW1lbnQ6IHVuZGVmaW5lZFxuXHRcdFx0ZW5hYmxlZDogZmFsc2Vcblx0XHRcdHNjcmVlbkVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0bGF5ZXJzOiBbXVxuXHRcdFx0Y29udGFpbmVyczogW11cblx0XHRcdHRpbWVyOiB1bmRlZmluZWRcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgQHRvZ2dsZSlcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEBjbGlja0hvdmVyZWRFbGVtZW50KVxuXHRcdEZyYW1lci5DdXJyZW50Q29udGV4dC5kb21FdmVudE1hbmFnZXIud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgQHVwZGF0ZSlcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXG5cdFx0QGNvbnRleHQuY2hpbGROb2Rlc1syXS5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXHRcdEBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgQHRyeUZvY3VzKVxuXHRcdEBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBAdW5mb2N1cylcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMub24gXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblxuXHR0b2dnbGU6IChldmVudCkgPT5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJgXCJcblx0XHRcdGlmIEBvcGVuZWQgdGhlbiBAZGlzYWJsZSgpIGVsc2UgQGVuYWJsZSgpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiL1wiXG5cdFx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRcdGlmIEBob3ZlcmVkTGF5ZXIgaXMgQHNlbGVjdGVkTGF5ZXJcblx0XHRcdFx0QGRlc2VsZWN0KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNlbGVjdCgpXG5cblx0XHRcdHJldHVyblxuXG5cdGVuYWJsZTogPT5cblx0XHRAb3BlbmVkID0gdHJ1ZVxuXHRcdEByZXNldExheWVycygpXG5cdFx0QF9jYW52YXNDb2xvciA9IENhbnZhcy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAX2RldmljZUltYWdlID0gRnJhbWVyLkRldmljZS5kZXZpY2VJbWFnZVxuXHRcdEBfc3RhcnRQb3NpdGlvbiA9IEZyYW1lci5EZXZpY2UuaGFuZHMueFxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5hbmltYXRlIFxuXHRcdFx0eDogQF9zdGFydFBvc2l0aW9uIC0gMTIyLCBcblx0XHRcdG9wdGlvbnM6IHt0aW1lOiAuNH1cblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PiBcblx0XHRcdEBmb2N1cygpXG5cdFx0XHRAZW5hYmxlZCA9IHRydWVcblxuXHRkaXNhYmxlOiA9PlxuXHRcdEB1bmZvY3VzKClcblx0XHRAZW5hYmxlZCA9IGZhbHNlXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGUgXG5cdFx0XHR4OiBAX3N0YXJ0UG9zaXRpb24sXG5cdFx0XHRvcHRpb25zOiB7dGltZTogLjM1fVxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+IFxuXHRcdFx0QG9wZW5lZCA9IGZhbHNlXG5cblx0c2hvd1RyYW5zaXRpb246ICh4UG9zKSA9PlxuXHRcdG9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdHhQb3MsXG5cdFx0XHRbQF9zdGFydFBvc2l0aW9uIC0gNTYsIEBfc3RhcnRQb3NpdGlvbiAtIDExMl0sIFxuXHRcdFx0WzAsIDFdLCBcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRAc3BlY1BhbmVsLnBhbmVsLnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5XG5cblx0XHRmYWN0b3IgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdHhQb3MsIFxuXHRcdFx0W0Bfc3RhcnRQb3NpdGlvbiwgQF9zdGFydFBvc2l0aW9uIC0gMTEyXSxcblx0XHRcdFswLCAxXSxcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gQ29sb3IubWl4IEBfY2FudmFzQ29sb3IsJ3JnYmEoMzAsIDMwLCAzMCwgMS4wMDApJywgZmFjdG9yXG5cblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQG9wZW5lZFxuXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy54ID0gQF9zdGFydFBvc2l0aW9uIC0gMTIyXG5cblx0ZmluZExheWVyOiAoZWxlbWVudCkgLT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnQuY2xhc3NMaXN0XG5cblx0XHRpZiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnJhbWVyTGF5ZXInKVxuXHRcdFx0cmV0dXJuIGVsZW1lbnRcblxuXHRcdEBmaW5kTGF5ZXIoZWxlbWVudC5wYXJlbnROb2RlKVxuXG5cdHJlc2V0TGF5ZXJzOiA9PlxuXHRcdEBsYXllcnMgPSBbXVxuXG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzXG5cdFx0XHRAbGF5ZXJzLnB1c2ggbGF5ZXJcblxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGVsZW1lbnQgPSBAZmluZExheWVyKGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoQGxheWVycywgWydfZWxlbWVudCcsIGVsZW1lbnRdKVxuXG5cdFx0cmV0dXJuIGxheWVyXG5cblx0Z2V0Q29tcG9uZW50RnJvbUxheWVyOiAobGF5ZXIsIG5hbWVzID0gW10pID0+XG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gbmFtZXMuam9pbignLCAnKVxuXG5cdFx0aWYgbm90IF8uaW5jbHVkZXMoW1wiTGF5ZXJcIiwgXCJUZXh0TGF5ZXJcIiwgXCJTY3JvbGxDb21wb25lbnRcIl0sIGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cdFx0XHRuYW1lcy5wdXNoKGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cblx0XHRAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudCwgbmFtZXMpXG5cblx0Y2xpY2tIb3ZlcmVkRWxlbWVudDogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblx0XHRyZXR1cm4gaWYgbm90IGV2ZW50XG5cdFx0cmV0dXJuIGlmIG5vdCBldmVudC50YXJnZXRcblx0XHRyZXR1cm4gaWYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnU3BlY0VsZW1lbnQnKVxuXHRcdHJldHVybiBpZiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW1lbWVMaW5rJylcblxuXHRcdGUgPSAoZXZlbnQ/LnRhcmdldCA/IEBob3ZlcmVkRWxlbWVudClcblxuXHRcdGxheWVyID0gQGdldExheWVyRnJvbUVsZW1lbnQoZSlcblx0XHRyZXR1cm4gaWYgbm90IGxheWVyXG5cblx0XHRlbGVtZW50ID0gbGF5ZXIuX2VsZW1lbnRcblxuXHRcdGlmIGVsZW1lbnQgaXMgQHNlbGVjdGVkRWxlbWVudFxuXHRcdFx0QGRlc2VsZWN0KGVsZW1lbnQsIGxheWVyKVxuXHRcdGVsc2Vcblx0XHRcdEBzZWxlY3QoZWxlbWVudCwgbGF5ZXIpXG5cblx0c2VsZWN0OiAoZWxlbWVudCkgPT5cblx0XHRAc2VsZWN0ZWRFbGVtZW50ID0gZWxlbWVudCA/IEBob3ZlcmVkTGF5ZXIuX2VsZW1lbnRcblx0XHRVdGlscy5kZWxheSAwLCBAZm9jdXNcblxuXHRkZXNlbGVjdDogKGVsZW1lbnQpID0+XG5cdFx0QHNlbGVjdGVkRWxlbWVudCA9IHVuZGVmaW5lZFxuXHRcdFV0aWxzLmRlbGF5IDAsIEBmb2N1c1xuXG5cdGdldExheWVyRGltZW5zaW9uczogKGxheWVyKSA9PlxuXHRcdGZyYW1lID0gVXRpbHMuYm91bmRpbmdGcmFtZShsYXllcilcblx0XHRmcmFtZSA9IEBmcmFtaWZ5KGZyYW1lKVxuXHRcdHJldHVybiBmcmFtZVxuXG5cdGZyYW1pZnk6IChmcmFtZSkgLT5cblx0XHRmcmFtZS5tYXhYID0gZnJhbWUueCArIGZyYW1lLndpZHRoXG5cdFx0ZnJhbWUubWlkWCA9IFV0aWxzLnJvdW5kKGZyYW1lLnggKyBmcmFtZS53aWR0aC8yKVxuXG5cdFx0ZnJhbWUubWF4WSA9IGZyYW1lLnkgKyBmcmFtZS5oZWlnaHRcblx0XHRmcmFtZS5taWRZID0gVXRpbHMucm91bmQoZnJhbWUueSArIGZyYW1lLmhlaWdodC8yKVxuXG5cdFx0cmV0dXJuIGZyYW1lXG5cblx0Z2V0RGltZW5zaW9uczogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0ZCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdGRpbWVuc2lvbnMgPSB7XG5cdFx0XHR4OiBkLmxlZnRcblx0XHRcdHk6IGQudG9wXG5cdFx0XHR3aWR0aDogZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBkLmhlaWdodFxuXHRcdFx0bWlkWDogZC5sZWZ0ICsgKGQud2lkdGggLyAyKVxuXHRcdFx0bWlkWTogZC50b3AgKyAoZC5oZWlnaHQgLyAyKVxuXHRcdFx0bWF4WDogZC5sZWZ0ICsgZC53aWR0aFxuXHRcdFx0bWF4WTogZC50b3AgKyBkLmhlaWdodFxuXHRcdFx0ZnJhbWU6IGRcblx0XHR9XG5cblx0XHRyZXR1cm4gZGltZW5zaW9uc1xuXG5cdG1ha2VMaW5lOiAocG9pbnRBLCBwb2ludEIsIGxhYmVsID0gdHJ1ZSkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxpbmUgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV19XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgcG9pbnRBWzBdIGlzIHBvaW50QlswXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF0gLSA1fSAje3BvaW50QVsxXX0gTCAje3BvaW50QVswXSArIDV9ICN7cG9pbnRBWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXSAtIDV9ICN7cG9pbnRCWzFdfSBMICN7cG9pbnRCWzBdICsgNX0gI3twb2ludEJbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGVsc2UgaWYgcG9pbnRBWzFdIGlzIHBvaW50QlsxXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdIC0gNX0gTCAje3BvaW50QVswXX0gI3twb2ludEFbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXX0gI3twb2ludEJbMV0gLSA1fSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRtYWtlTGFiZWw6ICh4LCB5LCB0ZXh0KSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGFiZWwgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICd0ZXh0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHhcblx0XHRcdHk6IHlcblx0XHRcdCdmb250LWZhbWlseSc6IEBmb250RmFtaWx5XG5cdFx0XHQnZm9udC1zaXplJzogQGZvbnRTaXplXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBAZm9udFdlaWdodFxuXHRcdFx0ZmlsbDogQHNlY29uZGFyeUNvbG9yXG5cdFx0XHR0ZXh0OiBNYXRoLmZsb29yKHRleHQgLyBAcmF0aW8pXG5cblx0XHRsID0gQGdldERpbWVuc2lvbnMobGFiZWwuZWxlbWVudClcblxuXHRcdGxhYmVsLnggPSB4IC0gbC53aWR0aCAvIDJcblx0XHRsYWJlbC55ID0geSArIGwuaGVpZ2h0IC8gNCAtIDFcblxuXHRcdGJveCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogbGFiZWwueCAtIEBwYWRkaW5nLmxlZnRcblx0XHRcdHk6IGxhYmVsLnkgLSBsLmhlaWdodCArIDFcblx0XHRcdHdpZHRoOiBsLndpZHRoICsgQHBhZGRpbmcubGVmdCArIEBwYWRkaW5nLnJpZ2h0XG5cdFx0XHRoZWlnaHQ6IGwuaGVpZ2h0ICsgQHBhZGRpbmcudG9wICsgQHBhZGRpbmcuYm90dG9tICsgMVxuXHRcdFx0cng6IEBib3JkZXJSYWRpdXNcblx0XHRcdHJ5OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRmaWxsOiBuZXcgQ29sb3IoY29sb3IpLmRhcmtlbig0MClcblx0XHRcdCMgZmlsbDogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHRtYWtlQm91bmRpbmdSZWN0czogKHMsIGgpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBzIG9yIG5vdCBoXG5cblx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGlmIEBob3ZlcmVkRWxlbWVudCBpcyBAc2NyZWVuRWxlbWVudFxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblxuXHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKC4yKVxuXG5cdFx0aWYgQHNlbGVjdGVkRWxlbWVudCBpcyBAc2NyZWVuRWxlbWVudFxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoMClcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWQsIGhvdmVyZWQpID0+XG5cblx0XHRzID0gQGdldERpbWVuc2lvbnMoQHNlbGVjdGVkRWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoQGhvdmVyZWRFbGVtZW50KVxuXHRcdGYgPSBAZ2V0RGltZW5zaW9ucyhAc2NyZWVuRWxlbWVudClcblxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXHRcdHJldHVybiBpZiBAaG92ZXJlZExheWVyPy52aXNpYmxlIGlzIGZhbHNlXG5cdFx0cmV0dXJuIGlmIEBob3ZlcmVkTGF5ZXI/Lm9wYWNpdHkgaXMgMFxuXHRcdFxuXHRcdCMgQG1ha2VEYXNoZWRMaW5lcyhoLCBmLCBAY29sb3IsIDApXG5cdFx0QG1ha2VEYXNoZWRMaW5lcyhzLCBmLCBAc2VsZWN0ZWRDb2xvciwgNSlcblxuXHRcdEBtYWtlQm91bmRpbmdSZWN0cyhzLCBoKVxuXG5cdFx0QHJhdGlvID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyBTY3JlZW4ud2lkdGhcblxuXHRcdGlmIEBzZWxlY3RlZEVsZW1lbnQgaXMgQGhvdmVyZWRFbGVtZW50XG5cdFx0XHRoID0gZlxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdHNldFBhbmVsUHJvcGVydGllczogKCkgPT5cblx0XHRoID0gQGhvdmVyZWRMYXllclxuXHRcdGhlID0gQGhvdmVyZWRFbGVtZW50XG5cdFx0cyA9IEBzZWxlY3RlZExheWVyXG5cdFx0c2UgPSBAc2VsZWN0ZWRFbGVtZW50XG5cblx0XHRsYXllciA9IHMgPyBoXG5cblx0XHRpZiBub3QgbGF5ZXI/XG5cdFx0XHRAc3BlY1BhbmVsLmNsZWFyUHJvcHMoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRwcm9wcyA9IGxheWVyLnByb3BzXG5cblx0XHRfLmFzc2lnbiBwcm9wcyxcblx0XHRcdHg6IGxheWVyLnNjcmVlbkZyYW1lLnhcblx0XHRcdHk6IGxheWVyLnNjcmVlbkZyYW1lLnlcblx0XHRcdGNvbXBvbmVudE5hbWU6IGxheWVyLmNvbnN0cnVjdG9yLm5hbWVcblx0XHRcdGNvbXBvbmVudE5hbWVzOiBAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudClcblx0XHRcdHBhcmVudE5hbWU6IGxheWVyLnBhcmVudD8ubmFtZVxuXG5cdFx0Xy5hc3NpZ24gQHNwZWNQYW5lbCwgcHJvcHNcblxuXHRcdEBzcGVjUGFuZWwuc2V0VGV4dFN0eWxlcyhsYXllci5mb250RmFtaWx5KVxuXG5cdHRyeUZvY3VzOiAoZXZlbnQpID0+XG5cdFx0QGN1cnJlbnRIb3ZlcmVkID0gZXZlbnQudGFyZ2V0XG5cdFx0ZG8gKGV2ZW50KSA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgLjA0LCA9PlxuXHRcdFx0XHRpZiBAY3VycmVudEhvdmVyZWQgaXMgZXZlbnQudGFyZ2V0XG5cdFx0XHRcdFx0QGZvY3VzKGV2ZW50KVxuXG5cdGZvY3VzOiAoZXZlbnQpID0+XG5cdFx0aWYgQGVuYWJsZWQgaXMgZmFsc2Vcblx0XHRcdHJldHVybiBcblxuXHRcdEB1bmZvY3VzKClcblxuXHRcdEBzZWxlY3RlZEVsZW1lbnQgPz0gQHNjcmVlbkVsZW1lbnRcblx0XHRAc2VsZWN0ZWRMYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KEBzZWxlY3RlZEVsZW1lbnQpXG5cblx0XHRob3ZlcmVkRWxlbWVudCA9IChldmVudD8udGFyZ2V0ID8gQGhvdmVyZWRFbGVtZW50ID8gQHNjcmVlbkVsZW1lbnQpXG5cblx0XHRAaG92ZXJlZExheWVyID0gQGdldExheWVyRnJvbUVsZW1lbnQoaG92ZXJlZEVsZW1lbnQpXG5cblx0XHRAaG92ZXJlZEVsZW1lbnQgPSBAaG92ZXJlZExheWVyPy5fZWxlbWVudCA/IEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZExheWVyXG5cblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKClcblxuXHRcdEBzaG93RGlzdGFuY2VzKEBzZWxlY3RlZEVsZW1lbnQsIEBob3ZlcmVkRWxlbWVudClcblxuXHR1bmZvY3VzOiAoKSA9PlxuXHRcdGN0eC5yZW1vdmVBbGwoKVxuXHRcdGlmIG5vdCBAc2VsZWN0ZWRMYXllciB0aGVuIEBzcGVjUGFuZWwuY2xlYXJQcm9wcygpXG5cblxuZXhwb3J0cy5nb3RjaGEgPSBuZXcgR290Y2hhXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7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
