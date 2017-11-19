require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecBox, SpecColorValueBox, SpecDivider, SpecElement, SpecLabel, SpecPanel, SpecValueBox, SpecWideValueBox, ctx, i, layer, len, name, panel, ref, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

svgContext = void 0;

ctx = void 0;

startOpen = false;

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}");

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
          return _this.element.style['background-color'] = value != null ? value : 'rgba(41, 41, 41, 1.000)';
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
        return this.valueLabel.element.textContent = value;
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
    var col0x, col1x, col2x, colorProps, j, k, len1, len2, prop, props, row;
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
    this.componentLabel = new SpecLabel({
      top: row(15),
      left: col0x,
      text: 'Component',
      'font-size': '.65em'
    });
    this.componentValueBox = new SpecWideValueBox({
      top: row(15),
      left: col1x
    });
    this.nameLabel = new SpecLabel({
      top: row(16),
      left: col0x,
      text: 'Name',
      'font-size': '.65em'
    });
    this.nameValueBox = new SpecWideValueBox({
      top: row(16),
      left: col1x
    });
    this.parentNameLabel = new SpecLabel({
      top: row(17),
      left: col0x,
      text: 'Parent',
      'font-size': '.65em'
    });
    this.parentNameValueBox = new SpecWideValueBox({
      top: row(17),
      left: col1x
    });
    this.githubIcon = document.createElement('a');
    this.githubIcon.href = "http://github.com/steveruizok";
    this.githubIcon.innerHTML = '<svg height="20px" width="20px" id="github_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>';
    panel.appendChild(this.githubIcon);
    this.twitterIcon = document.createElement('a');
    this.twitterIcon.href = "http://twitter.com/steveruizok";
    this.twitterIcon.innerHTML = '<svg height="28px" width="28px" id="twitter_logo" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>';
    panel.appendChild(this.twitterIcon);
    props = [['x', this.xValueBox], ['y', this.yValueBox], ['width', this.wValueBox], ['height', this.hValueBox], ['opacity', this.opacityValueBox, true], ['borderWidth', this.borderValueBox], ['borderRadius', this.radiusValueBox], ['shadowSpread', this.shadowSpreadValueBox], ['shadowX', this.shadowXValueBox], ['shadowY', this.shadowYValueBox], ['shadowBlur', this.shadowBlurValueBox], ['fontFamily', this.fontFamilyValueBox], ['fontSize', this.fontSizeValueBox], ['fontWeight', this.fontWeightValueBox], ['lineHeight', this.lineHeightValueBox], ['fontStyle', this.fontStyleValueBox], ['componentName', this.componentValueBox], ['name', this.nameValueBox], ['parentName', this.parentNameValueBox]];
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
    return _.delay(reset, 250);
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
    this.getLayerFromElement = bind(this.getLayerFromElement, this);
    this.resetLayers = bind(this.resetLayers, this);
    this.disable = bind(this.disable, this);
    this.enable = bind(this.enable, this);
    this.showTransition = bind(this.showTransition, this);
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
    this.context = document.getElementsByClassName('framerLayer DeviceScreen')[0];
    this.context.classList.add('hoverContext');
    this.context.childNodes[2].classList.add('IgnorePointerEvents');
    this.context.addEventListener("mouseover", this.tryFocus);
    this.context.addEventListener("mouseout", this.unfocus);
    Framer.Device.hands.on("change:x", this.showTransition);
  }

  Gotcha.prototype.toggle = function(event) {
    if (event.key === "`") {
      if (this.enabled) {
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

  Gotcha.prototype.showTransition = function(xPos) {
    var factor, opacity;
    opacity = Utils.modulate(xPos, [this._startPosition - 56, this._startPosition - 112], [0, 1], true);
    this.specPanel.panel.style.opacity = opacity;
    factor = Utils.modulate(xPos, [this._startPosition, this._startPosition - 112], [0, 1], true);
    return Canvas.backgroundColor = Color.mix(this._canvasColor, 'rgba(30, 30, 30, 1.000)', factor);
  };

  Gotcha.prototype.enable = function() {
    this.enabled = true;
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
        return _this.focus();
      };
    })(this));
  };

  Gotcha.prototype.disable = function() {
    this.enabled = false;
    Framer.Device.hands.animate({
      x: this._startPosition,
      options: {
        time: .35
      }
    });
    return this.unfocus();
  };

  Gotcha.prototype.findLayer = function(element) {
    if (!element) {
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

  Gotcha.prototype.clickHoveredElement = function(event) {
    var e, element, ref1;
    if (!this.enabled) {
      return;
    }
    if (!event) {
      return;
    }
    if (event.target.classList.contains('SpecElement')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuY3R4ID0gdW5kZWZpbmVkXG5cbnN0YXJ0T3BlbiA9IGZhbHNlXG5cblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0fVxuXG5cdC5TcGVjTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0fVxuXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93Q29waWVkIHtcblx0XHQwJSB7IFxuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApO1xuXHRcdH1cblxuXHRcdDEwMCUge1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEuMDAwKTtcblx0XHR9XG5cdH1cblxuXHQuY29waWVkIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG5cdH1cblx0XG5cdCN0d2l0dGVyX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDRweDtcblx0XHRyaWdodDogNHB4O1xuXHR9XG5cblx0I2dpdGh1Yl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDM2cHg7XG5cdH1cblxuXHQuZnJhbWVyTGF5ZXIgeyBcblx0XHRwb2ludGVyLWV2ZW50czogYWxsICFpbXBvcnRhbnQ7IFxuXHRcdH0gXG5cdFxuXHQuSWdub3JlUG9pbnRlckV2ZW50cyB7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgXG5cdH1cblwiXCJcIlxuXG5mb3IgbmFtZSBpbiBbJ3NjcmVlbkJhY2tncm91bmQnLCAncGhvbmUnLCAnc2NyZWVuJywgJ2hhbmRzSW1hZ2VMYXllcicsICdzY3JlZW5NYXNrJywgJ2NvbnRlbnQnXVxuXHRsYXllciA9IEZyYW1lci5EZXZpY2VbbmFtZV1cblx0cmV0dXJuIGlmIG5vdCBsYXllclxuXG5cdGxheWVyLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuIyBcdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcbiMgXHQgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG4jIFx0IGRQICAgICAgICBgODg4ODhQOCBkUCAgICBkUCBgODg4ODhQJyBkUFxuIyBcdFxuIyBcdFxuXG5cbnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbnBhbmVsLmlkID0gJ1NwZWNDb250YWluZXInXG52aWV3QyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGcmFtZXJDb250ZXh0Um9vdC1EZWZhdWx0JylcblV0aWxzLmRlbGF5IDAsID0+IHZpZXdDLmFwcGVuZENoaWxkKHBhbmVsKVxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyBcdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgIDg4ODg4OGJhXG4jIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIDg4ICAgIGA4YlxuIyBcdGBZODg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiBkODg4OFAgYTg4YWFhYThQJyAuZDg4ODhiLiBkUC4gIC5kUFxuIyBcdCAgICAgIGA4YiA4OG9vb29kOCA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4b29vb2Q4ICAgODggICAgODggICBgOGIuIDg4JyAgYDg4ICBgOGJkOCdcbiMgXHRkOCcgICAuOFAgODguICAuLi4gODguICAuLi4gODggICAgICAgODguICAuLi4gICA4OCAgICA4OCAgICAuODggODguICAuODggIC5kODhiLlxuIyBcdCBZODg4ODhQICBgODg4ODhQJyBgODg4ODhQJyBkUCAgICAgICBgODg4ODhQJyAgIGRQICAgIDg4ODg4ODg4UCBgODg4ODhQJyBkUCcgIGBkUFxuIyBcdFxuIyBcdFxuXG5zZWNyZXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3JldEJveClcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICMgXHQuZDg4ODg4YiAgZFAgICAgIGRQICAuODg4ODguICAgICAgYTg4ODg4Yi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4gIyBcdDg4LiAgICBcIicgODggICAgIDg4IGQ4JyAgIGA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIyBcdGBZODg4ODhiLiA4OCAgICAuOFAgODggICAgICAgICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuICMgXHQgICAgICBgOGIgODggICAgZDgnIDg4ICAgWVA4OCAgICA4OCAgICAgICAgODgnICBgODggODgnYDg4J2A4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OCAgIDg4ICAgWThvb29vby5cbiAjIFx0ZDgnICAgLjhQIDg4ICAuZDhQICBZOC4gICAuODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4gIyBcdCBZODg4ODhQICA4ODg4ODgnICAgIGA4ODg4OCcgICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuICMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuXG5cbiMjI1xuXHQgLC0uICAuICAgLCAgLC0uICAsLS4gICAgICAgICAuICAgICAgICAgICAuXG5cdCggICBgIHwgIC8gIC8gICAgLyAgICAgICAgICAgIHwgICAgICAgICAgIHxcblx0IGAtLiAgfCAvICAgfCAtLiB8ICAgICwtLiA7LS4gfC0gICwtLiAuICwgfC1cblx0LiAgICkgfC8gICAgXFwgIHwgXFwgICAgfCB8IHwgfCB8ICAgfC0nICBYICB8XG5cdCBgLScgICcgICAgICBgLScgIGAtJyBgLScgJyAnIGAtJyBgLScgJyBgIGAtJ1xuXHRcbiMjI1xuXG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAZnJhbWVFbGVtZW50ID0gRnJhbWVyLkRldmljZS5zY3JlZW5CYWNrZ3JvdW5kLl9lbGVtZW50XG5cblx0XHRAbEZyYW1lID0gQGZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0IyBDcmVhdGUgU1ZHIGVsZW1lbnRcblxuXHRcdEBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKVxuXHRcblx0XHRjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LVRvdWNoRW11bGF0b3InKVxuXHRcdGNvbnRleHQuYXBwZW5kQ2hpbGQoQHN2ZylcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0YWRkU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc2hhcGVzLnB1c2goc2hhcGUpXG5cdFx0QHNob3dTaGFwZShzaGFwZSlcblx0XHRcblx0cmVtb3ZlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAaGlkZVNoYXBlKHNoYXBlKVxuXHRcdF8ucHVsbChAc2hhcGVzLCBzaGFwZSlcblx0XHRcblx0aGlkZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcblx0c2hvd1NoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5hcHBlbmRDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdFxuXHRhZGREZWY6IChkZWYpIC0+XG5cdFx0QHN2Z0RlZnMuYXBwZW5kQ2hpbGQoZGVmKVxuXG5cdHJlbW92ZUFsbDogPT5cblx0XHRmb3Igc2hhcGUgaW4gQHNoYXBlc1xuXHRcdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdEBzaGFwZXMgPSBbXVxuXG5cbiMjI1xuXHQgLC0uICAuICAgLCAgLC0uICAsLS4gIC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4gOy0uXG5cdCggICBgIHwgIC8gIC8gICAgKCAgIGAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8ICApXG5cdCBgLS4gIHwgLyAgIHwgLS4gIGAtLiAgfC0uICwtOiA7LS4gLC0uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwtfCB8LSdcblx0LiAgICkgfC8gICAgXFwgIHwgLiAgICkgfCB8IHwgfCB8IHwgfC0nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgfCB8XG5cdCBgLScgICcgICAgICBgLScgIGAtJyAgJyAnIGAtYCB8LScgYC0nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAtJyAnXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7dHlwZTogJ2NpcmNsZSd9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBwYXJlbnQgPSBzdmdDb250ZXh0XG5cdFx0XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFxuXHRcdFx0b3B0aW9ucy50eXBlXG5cdFx0XHQpXG5cblx0XHRAc2V0Q3VzdG9tUHJvcGVydHkoJ3RleHQnLCAndGV4dENvbnRlbnQnLCAndGV4dENvbnRlbnQnLCBvcHRpb25zLnRleHQpXG5cdFx0XHRcdFxuXHRcdCMgYXNzaWduIGF0dHJpYnV0ZXMgc2V0IGJ5IG9wdGlvbnNcblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cdFx0XHRAc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAcGFyZW50LmFkZFNoYXBlKEApXG5cdFx0XG5cdFx0QHNob3coKVxuXHRcdFx0XG5cdHNldEF0dHJpYnV0ZTogKGtleSwgdmFsdWUpID0+XG5cdFx0cmV0dXJuIGlmIGtleSBpcyAndGV4dCdcblx0XHRpZiBub3QgQFtrZXldP1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0Z2V0OiA9PlxuXHRcdFx0XHRcdHJldHVybiBAZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdFx0QGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XG5cdFx0QFtrZXldID0gdmFsdWVcblx0XG5cdHNldEN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCByZXR1cm5WYWx1ZSwgc2V0VmFsdWUsIHN0YXJ0VmFsdWUpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBlbGVtZW50W3NldFZhbHVlXSA9IHZhbHVlXG5cblx0XHRAW3ZhcmlhYmxlTmFtZV0gPSBzdGFydFZhbHVlXG5cblx0aGlkZTogLT4gXG5cdFx0QHBhcmVudC5oaWRlU2hhcGUoQClcblx0XG5cdHNob3c6IC0+IFxuXHRcdEBwYXJlbnQuc2hvd1NoYXBlKEApXG5cdFx0XG5cdHJlbW92ZTogLT5cblx0XHRAcGFyZW50LnJlbW92ZVNoYXBlKEApXG5cblxuY2xhc3MgRGFzaGVkTGluZSBleHRlbmRzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAocG9pbnRBLCBwb2ludEIsIGNvbG9yID0gJyMwMDAnLCBvZmZzZXQgPSAwLCBvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmFzc2lnbiBvcHRpb25zLFxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEEueH0gI3twb2ludEEueX0gTCAje3BvaW50Qi54fSAje3BvaW50Qi55fVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblx0XHRcdCdzdHJva2UtZGFzaGFycmF5JzogXCI1LCA1XCJcblx0XHRcdCdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cbmN0eCA9IG5ldyBTVkdDb250ZXh0XG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgYTg4ODg4Yi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OCAgICA4OCAgICAgICAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFAgLmQ4ODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuIyBcdCA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4jIFx0IGRQICAgICAgICBgODg4ODhQOCBkUCAgICBkUCBgODg4ODhQJyBkUCAgICAgWTg4ODg4UCcgYDg4ODg4UCcgZFAgIGRQICBkUCA4OFk4ODhQJyBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgIGRQICAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLS4gLiAgICAgICAgICAgICAgICAgICAuXG5cdCggICBgICAgICAgICAgICAgIHwgICAgfCAgICAgICAgICAgICAgICAgICB8XG5cdCBgLS4gIDstLiAsLS4gLC0uIHwtICAgfCAsLS4gOy0uLS4gLC0uIDstLiB8LVxuXHQuICAgKSB8IHwgfC0nIHwgICB8ICAgIHwgfC0nIHwgfCB8IHwtJyB8IHwgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLS0nICcgYC0nICcgJyAnIGAtJyAnICcgYC0nXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAoY2xhc3NOYW1lLCBvcHRpb25zID0ge30sIHRleHQpIC0+XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQgY2xhc3NOYW1lXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCAnU3BlY0VsZW1lbnQnXG5cblx0XHRfLmFzc2lnbiBAZWxlbWVudC5zdHlsZSwgb3B0aW9uc1xuXG5cdFx0cGFuZWwuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwgICAgICAgIC4gICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgICAgICB8ICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLTogfC0uICwtLiB8XG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8IHwgfCB8LScgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLS0nIGAtYCBgLScgYC0nICdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0xhYmVsIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ25vbmUnXG5cdFx0XHQnZm9udC1mYW1pbHknOiAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdmb250LXdlaWdodCc6ICc0MDAnXG5cdFx0XHQnY29sb3InOiAncmdiYSgxMzYsIDEzNiwgMTM2LCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5cdFx0QHRleHRMYXllciA9IG5ldyBTcGVjRWxlbWVudCAnU3BlY0xhYmVsJyxcblx0XHRcdCdmb250LWZhbWlseSc6IG9wdGlvbnNbJ2ZvbnQtZmFtaWx5J10gPyAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogb3B0aW9uc1snZm9udC1zaXplJ10gPyAnMWVtJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0Jzogb3B0aW9uc1snZm9udC13ZWlnaHQnXSA/ICc1MDAnXG5cdFx0XHQnY29sb3InOiBvcHRpb25zWydjb2xvciddID8gJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMS4wMDApJ1xuXHRcdFx0J2xlZnQnOiBvcHRpb25zLmxlZnRcblx0XHRcdCdyaWdodCc6IG9wdGlvbnMucmlnaHRcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0TGF5ZXIuZWxlbWVudFxuXG5cdFx0b3B0aW9ucy5wYXJlbnQ/LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3RleHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInIHRoZW4gdmFsdWUgPSB2YWx1ZS50b0ZpeGVkKClcblx0XHRcdFx0QHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblxuXHRcdEB0ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJydcblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLiAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgXFwgbyAgICAgbyAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgfCAuIC4gLCAuICwtfCAsLS4gOy0uXG5cdC4gICApIHwgfCB8LScgfCAgIHwgIC8gfCB8LyAgfCB8IHwgfC0nIHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICAnICcgICAnIGAtJyBgLScgJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRGl2aWRlciBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc4cHgnXG5cdFx0XHQnd2lkdGgnOiAnMjA4cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzFweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAnXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cblx0XHRzdXBlciAnU3BlY0RpdmlkZXInLCBvcHRpb25zXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICBgLScgJyBgXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNCb3ggZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogdW5kZWZpbmVkXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzk2cHgnXG5cdFx0XHQnd2lkdGgnOiAnNjRweCdcblx0XHRcdCdoZWlnaHQnOiAnMjRweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2JveC1zaGFkb3cnOiAnaW5zZXQgMHB4IDBweCAwcHggNHB4IHJnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgJ1NwZWNMYWJlbCcsIG9wdGlvbnNcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgICwtLiAgICAgLiAgICAgICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIC8gICAgICAgIHwgICAgICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLS4gfCAsLS4gOy0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIFxcICAgIHwgfCB8IHwgfCB8ICAgfC8gICAgfCB8IHwgfCB8IHwtJyB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyAgYC0nIGAtJyAnIGAtJyAnICAgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cbmNsYXNzIFNwZWNDb2xvclZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2xlZnQnOiAnOTZweCdcblx0XHRcdCd3aWR0aCc6ICc2NHB4J1xuXHRcdFx0J2hlaWdodCc6ICcyNHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnYm94LXNoYWRvdyc6ICdpbnNldCAwcHggMHB4IDBweCA0cHggcmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpID0+IFxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHZhbHVlID8gJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0QHZhbHVlID0gb3B0aW9ucy52YWx1ZVxuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAuICAgLCAgICAgLiAgICAgICAgICwtLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAvICAgLC06IHwgLiAuICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgfC8gICAgfCB8IHwgfCB8IHwtJyB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjVmFsdWVCb3ggZXh0ZW5kcyBTcGVjQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogJ0hlbHZldGljYSBOZXVlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNDJlbSdcblx0XHRcdCdwYWRkaW5nLXRvcCc6ICc1cHgnXG5cdFx0XHQncGFkZGluZy1sZWZ0JzogJzhweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnbGluZS1oZWlnaHQnOiAnMWVtJ1xuXHRcdFx0J292ZXJmbG93JzogJ2hpZGRlbidcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEB2YWx1ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0ID8gJydcblx0XHRcdHBhcmVudDogQGVsZW1lbnRcblx0XHRcdCdmb250LXNpemUnOiAnMWVtJ1xuXHRcdFx0J2xlZnQnOiAnNnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQnY29sb3InOiAnI0ZGRidcblx0XHRcdCdmb250LXdlaWdodCc6ICc1MDAnXG5cblx0XHRAdW5pdExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dGV4dDogb3B0aW9ucy51bml0ID8gJydcblx0XHRcdHBhcmVudDogQGVsZW1lbnRcblx0XHRcdCdmb250LXNpemUnOiAnLjllbSdcblx0XHRcdCdyaWdodCc6ICcycHgnXG5cdFx0XHQndG9wJzogJzZweCdcblx0XHRcdCd0ZXh0LWFsaWduJzogJ3JpZ2h0J1xuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHZhbHVlTGFiZWwuZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QHZhbHVlTGFiZWwuZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gJydcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgIC4gICAgIC4gICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgLiB8IG8gICB8ICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCApICkgLiAsLXwgLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvfC8gIHwgfCB8IHwtJyB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICcgJyAgICcgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjV2lkZVZhbHVlQm94IGV4dGVuZHMgU3BlY1ZhbHVlQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEzNnB4J1xuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIyNcblx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG5cdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG5cdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcblx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcblx0IFk4ODg4OFAgIDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4OFAnICBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcblx0ICAgICAgICAgIDg4XG5cdCAgICAgICAgICBkUFxuIyMjXG5cblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QHBhbmVsID0gcGFuZWxcblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAcGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAcGFuZWwuc3R5bGUub3BhY2l0eSA9IGlmIHN0YXJ0T3BlbiB0aGVuICcxJyBlbHNlICcwJ1xuXG5cdFx0Y29sMHggPSAnNHB4J1xuXHRcdGNvbDF4ID0gJzg0cHgnXG5cdFx0Y29sMnggPSAnMTU2cHgnXG5cblx0XHRyb3cgPSAobnVtLCBvZmZzZXQgPSAwKSAtPiByZXR1cm4gKDE2ICsgKDM1ICogbnVtKSAtIG9mZnNldCkgKyAncHgnXG5cblx0XHQjIHBvc1xuXG5cdFx0QHBvc0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMCwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyBzaXplXG5cblx0XHRAc2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAd1ZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIGJhY2tncm91bmRcblxuXHRcdEBiZ0NvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygyLCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBiZ0NvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDIpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBvcGFjaXR5XG5cblx0XHRAb3BhY2l0eUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMywgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAb3BhY2l0eVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMylcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMS4wJ1xuXHRcdFx0dW5pdDogJ2EnXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMSA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coNC4yNSwgMilcblxuXHRcdCMgYm9yZGVyXG5cblx0XHRAYm9yZGVyQ29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDQuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0JvcmRlcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAYm9yZGVyQ29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAYm9yZGVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg0Ljc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIHJhZGl1c1xuXG5cdFx0QHJhZGl1c0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNS43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEByYWRpdXNWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDUuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzAnXG5cblx0XHQjIHNoYWRvd1xuXG5cdFx0QHNoYWRvd0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNi43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBzaGFkb3dDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdEBzaGFkb3dTcHJlYWRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDYuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzEnXG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBzaGFkb3dYVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg3Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAc2hhZG93WVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0QHNoYWRvd0JsdXJWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDguNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2JsdXInXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMiA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coMTAsIDIpXG5cblx0XHQjIEZvbnRcblxuXHRcdEBmb250TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMC4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnRm9udCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udEZhbWlseVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEwLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgQ29sb3JcblxuXHRcdEBjb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTEuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBjb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAZm9udFN0eWxlVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cblx0XHQjIEZvbnQgU2l6ZVxuXG5cdFx0QGZvbnRTaXplTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMi4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udFNpemVWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdzJ1xuXG5cdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyBMaW5lIEhlaWdodFxuXG5cdFx0QGxpbmVIaWdodExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTMuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0hlaWdodCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbGluZUhlaWdodFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTMuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2xoJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDE0LjUsIDIpXG5cdFx0XG5cdFx0IyBDb21wb25lbnRcblxuXHRcdEBjb21wb25lbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGNvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgTmFtZVxuXHRcdEBuYW1lTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxNilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbmFtZVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE2KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgTmFtZVxuXHRcdEBwYXJlbnROYW1lTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxNylcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUGFyZW50J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBwYXJlbnROYW1lVmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTcpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cblx0XHQjIExpbmtzXG5cblx0XHRAZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdEBnaXRodWJJY29uLmhyZWYgPSBcImh0dHA6Ly9naXRodWIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRAZ2l0aHViSWNvbi5pbm5lckhUTUwgPSAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cdFx0cGFuZWwuYXBwZW5kQ2hpbGQoQGdpdGh1Ykljb24pXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAdHdpdHRlckljb24uaHJlZiA9IFwiaHR0cDovL3R3aXR0ZXIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRAdHdpdHRlckljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiIGlkPVwidHdpdHRlcl9sb2dvXCIgZGF0YS1uYW1lPVwiTG9nbyDigJQgRklYRURcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOnJnYmEoOTEsIDkxLCA5MSwgMS4wMDApO308L3N0eWxlPjwvZGVmcz48dGl0bGU+VHdpdHRlcl9Mb2dvX0JsdWU8L3RpdGxlPjxyZWN0IGNsYXNzPVwiY2xzLTFcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiLz48cGF0aCBjbGFzcz1cImNscy0yXCIgZD1cIk0xNTMuNjIsMzAxLjU5Yzk0LjM0LDAsMTQ1Ljk0LTc4LjE2LDE0NS45NC0xNDUuOTQsMC0yLjIyLDAtNC40My0uMTUtNi42M0ExMDQuMzYsMTA0LjM2LDAsMCwwLDMyNSwxMjIuNDdhMTAyLjM4LDEwMi4zOCwwLDAsMS0yOS40Niw4LjA3LDUxLjQ3LDUxLjQ3LDAsMCwwLDIyLjU1LTI4LjM3LDEwMi43OSwxMDIuNzksMCwwLDEtMzIuNTcsMTIuNDUsNTEuMzQsNTEuMzQsMCwwLDAtODcuNDEsNDYuNzhBMTQ1LjYyLDE0NS42MiwwLDAsMSw5Mi40LDEwNy44MWE1MS4zMyw1MS4zMywwLDAsMCwxNS44OCw2OC40N0E1MC45MSw1MC45MSwwLDAsMSw4NSwxNjkuODZjMCwuMjEsMCwuNDMsMCwuNjVhNTEuMzEsNTEuMzEsMCwwLDAsNDEuMTUsNTAuMjgsNTEuMjEsNTEuMjEsMCwwLDEtMjMuMTYuODgsNTEuMzUsNTEuMzUsMCwwLDAsNDcuOTIsMzUuNjIsMTAyLjkyLDEwMi45MiwwLDAsMS02My43LDIyQTEwNC40MSwxMDQuNDEsMCwwLDEsNzUsMjc4LjU1YTE0NS4yMSwxNDUuMjEsMCwwLDAsNzguNjIsMjNcIi8+PC9zdmc+J1xuXHRcdHBhbmVsLmFwcGVuZENoaWxkKEB0d2l0dGVySWNvbilcblxuXG5cdFx0IyAtLS0tXG5cblx0XHQjIHByb3BlcnRpZXNcblxuXHRcdHByb3BzID0gW1xuXHRcdFx0Wyd4JywgQHhWYWx1ZUJveF0sXG5cdFx0XHRbJ3knLCBAeVZhbHVlQm94XSxcblx0XHRcdFsnd2lkdGgnLCBAd1ZhbHVlQm94XVxuXHRcdFx0WydoZWlnaHQnLCBAaFZhbHVlQm94XVxuXHRcdFx0WydvcGFjaXR5JywgQG9wYWNpdHlWYWx1ZUJveCwgdHJ1ZV1cblx0XHRcdFsnYm9yZGVyV2lkdGgnLCBAYm9yZGVyVmFsdWVCb3hdXG5cdFx0XHRbJ2JvcmRlclJhZGl1cycsIEByYWRpdXNWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93U3ByZWFkJywgQHNoYWRvd1NwcmVhZFZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dYJywgQHNoYWRvd1hWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WScsIEBzaGFkb3dZVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd0JsdXInLCBAc2hhZG93Qmx1clZhbHVlQm94XVxuXHRcdFx0Wydmb250RmFtaWx5JywgQGZvbnRGYW1pbHlWYWx1ZUJveF1cblx0XHRcdFsnZm9udFNpemUnLCBAZm9udFNpemVWYWx1ZUJveF1cblx0XHRcdFsnZm9udFdlaWdodCcsIEBmb250V2VpZ2h0VmFsdWVCb3hdXG5cdFx0XHRbJ2xpbmVIZWlnaHQnLCBAbGluZUhlaWdodFZhbHVlQm94XVxuXHRcdFx0Wydmb250U3R5bGUnLCBAZm9udFN0eWxlVmFsdWVCb3hdXG5cdFx0XHRbJ2NvbXBvbmVudE5hbWUnLCBAY29tcG9uZW50VmFsdWVCb3hdXG5cdFx0XHRbJ25hbWUnLCBAbmFtZVZhbHVlQm94XVxuXHRcdFx0WydwYXJlbnROYW1lJywgQHBhcmVudE5hbWVWYWx1ZUJveF1cblx0XHRdXG5cblx0XHRjb2xvclByb3BzID0gW1xuXHRcdFx0WydiYWNrZ3JvdW5kQ29sb3InLCBAYmdDb2xvclZhbHVlQm94XVxuXHRcdFx0Wydib3JkZXJDb2xvcicsIEBib3JkZXJDb2xvclZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dDb2xvcicsIEBzaGFkb3dDb2xvclZhbHVlQm94XVxuXHRcdFx0Wydjb2xvcicsIEBjb2xvclZhbHVlQm94XVxuXHRcdF1cblxuXHRcdGZvciBwcm9wIGluIHByb3BzXG5cdFx0XHRAZGVmaW5lQ3VzdG9tUHJvcGVydHkocHJvcFswXSwgcHJvcFsxXSwgcHJvcFsyXSlcblx0XHRcdEBhZGRDb3B5RXZlbnQocHJvcFswXSwgcHJvcFsxXSlcblxuXHRcdGZvciBwcm9wIGluIGNvbG9yUHJvcHNcblx0XHRcdEBkZWZpbmVDdXN0b21Db2xvclByb3BlcnR5KHByb3BbMF0sIHByb3BbMV0sIHByb3BbMl0pXG5cdFx0XHRAYWRkQ29weUV2ZW50KHByb3BbMF0sIHByb3BbMV0pXG5cblx0ZGVmaW5lQ3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIGxheWVyLCBmbG9hdCkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogPT4gcmV0dXJuIEBwcm9wc1t2YXJpYWJsZU5hbWVdXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT5cblx0XHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXG5cdFx0XHRcdGlmIG5vdCB2YWx1ZT8gb3IgdmFsdWUgaXMgJzAnXG5cdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGlmIGZsb2F0XG5cdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlID8gJzAnKS50b0ZpeGVkKDIpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInXG5cdFx0XHRcdFx0dmFsdWUgPSBwYXJzZUludCh2YWx1ZSkudG9GaXhlZCgpXG5cdFx0XHRcdFxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdFxuXHRkZWZpbmVDdXN0b21Db2xvclByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllcikgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogPT4gcmV0dXJuIEBwcm9wc1t2YXJpYWJsZU5hbWVdXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT5cblx0XHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcblxuXHRhZGRDb3B5RXZlbnQ6ICh2YXJpYWJsZU5hbWUsIGxheWVyKSAtPlxuXHRcdGRvICh2YXJpYWJsZU5hbWUsIGxheWVyKSA9PlxuXHRcdFx0bGF5ZXIuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRcdEBjb3B5Q29udGVudChAW3ZhcmlhYmxlTmFtZV0pXG5cdFx0XHRcdEBoaWdobGlnaHQobGF5ZXIpXG5cblx0Y29weUNvbnRlbnQ6IChjb250ZW50KSA9PlxuXHRcdHNlY3JldEJveC52YWx1ZSA9IGNvbnRlbnRcblx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdGhpZ2hsaWdodDogKGxheWVyKSA9PlxuXHRcdHN0YXJ0Qm9yZGVyQ29sb3IgPSBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXVxuXHRcdGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddID0gJ3JnYmEoMTE4LCAyMzcsIDkzLCAxLjAwMCknXG5cdFx0cmVzZXQgPSA9PiBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXSA9IHN0YXJ0Qm9yZGVyQ29sb3JcblxuXHRcdF8uZGVsYXkocmVzZXQsIDI1MClcblxuXG5cdGNsZWFyUHJvcHM6ID0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgQHByb3BzXG5cdFx0XHRAW2tleV0gPSB1bmRlZmluZWRcblx0XHRAc2V0VGV4dFN0eWxlcygpXG5cblx0c2V0VGV4dFN0eWxlczogKHZhbHVlKSA9PlxuXG5cdFx0Zm9yIGxheWVyIGluIFtcblx0XHRcdEBmb250TGFiZWwsXG5cdFx0XHRAZm9udFNpemVMYWJlbCxcblx0XHRcdEBjb2xvckxhYmVsLFxuXHRcdFx0QGxpbmVIaWdodExhYmVsLFxuXHRcdFx0QGZvbnRGYW1pbHlWYWx1ZUJveCwgXG5cdFx0XHRAY29sb3JWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFNpemVWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFdlaWdodFZhbHVlQm94LCBcblx0XHRcdEBsaW5lSGVpZ2h0VmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRTdHlsZVZhbHVlQm94XG5cdFx0XVxuXHRcdFx0bGF5ZXIuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaWYgdmFsdWU/IHRoZW4gJzEnIGVsc2UgJzAnXG5cblxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyMjXG5cdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcblx0ZDgnICAgYDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuXHQ4OCAgICAgICAgLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuXG5cdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuXHRZOC4gICAuODggODguICAuODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4XG5cdCBgODg4ODgnICBgODg4ODhQJyAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UDhcblx0XG5cdFxuIyMjXG5cblxuY2xhc3MgR290Y2hhXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QHNwZWNQYW5lbCA9IG5ldyBTcGVjUGFuZWxcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGNvbG9yOiAncmdiYSg3MiwgMjA3LCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlbGVjdGVkQ29sb3I6ICdyZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogJyNGRkZGRkYnXG5cdFx0XHRmb250RmFtaWx5OiAnTWVubG8nXG5cdFx0XHRmb250U2l6ZTogJzEwJ1xuXHRcdFx0Zm9udFdlaWdodDogJzUwMCdcblx0XHRcdGJvcmRlclJhZGl1czogNFxuXHRcdFx0cGFkZGluZzoge3RvcDogMSwgYm90dG9tOiAxLCBsZWZ0OiAzLCByaWdodDogM31cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5jb2xvclxuXHRcdFx0c2VsZWN0ZWRDb2xvcjogb3B0aW9ucy5zZWxlY3RlZENvbG9yXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogb3B0aW9ucy5zZWNvbmRhcnlDb2xvclxuXHRcdFx0Zm9udEZhbWlseTogb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0XHRmb250U2l6ZTogb3B0aW9ucy5mb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogb3B0aW9ucy5mb250V2VpZ2h0XG5cdFx0XHRzaGFwZXM6IFtdXG5cdFx0XHRib3JkZXJSYWRpdXM6IG9wdGlvbnMuYm9yZGVyUmFkaXVzXG5cdFx0XHRwYWRkaW5nOiBvcHRpb25zLnBhZGRpbmdcblx0XHRcdGZvY3VzZWRFbGVtZW50OiB1bmRlZmluZWRcblx0XHRcdGVuYWJsZWQ6IGZhbHNlXG5cdFx0XHRzY3JlZW5FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcdGxheWVyczogW11cblx0XHRcdGNvbnRhaW5lcnM6IFtdXG5cdFx0XHR0aW1lcjogdW5kZWZpbmVkXG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIEB0b2dnbGUpXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBAY2xpY2tIb3ZlcmVkRWxlbWVudClcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXG5cdFx0QGNvbnRleHQuY2hpbGROb2Rlc1syXS5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXHRcdEBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgQHRyeUZvY3VzKVxuXHRcdEBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBAdW5mb2N1cylcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMub24gXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblxuXHR0b2dnbGU6IChldmVudCkgPT5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJgXCJcblx0XHRcdGlmIEBlbmFibGVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIlxuXHRcdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRcdEBkZXNlbGVjdCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzZWxlY3QoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRzaG93VHJhbnNpdGlvbjogKHhQb3MpID0+XG5cdFx0b3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0eFBvcyxcblx0XHRcdFtAX3N0YXJ0UG9zaXRpb24gLSA1NiwgQF9zdGFydFBvc2l0aW9uIC0gMTEyXSwgXG5cdFx0XHRbMCwgMV0sIFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdEBzcGVjUGFuZWwucGFuZWwuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHlcblxuXHRcdGZhY3RvciA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0eFBvcywgXG5cdFx0XHRbQF9zdGFydFBvc2l0aW9uLCBAX3N0YXJ0UG9zaXRpb24gLSAxMTJdLFxuXHRcdFx0WzAsIDFdLFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBDb2xvci5taXggQF9jYW52YXNDb2xvciwncmdiYSgzMCwgMzAsIDMwLCAxLjAwMCknLCBmYWN0b3JcblxuXHRlbmFibGU6ID0+XG5cdFx0QGVuYWJsZWQgPSB0cnVlXG5cdFx0QHJlc2V0TGF5ZXJzKClcblx0XHRAX2NhbnZhc0NvbG9yID0gQ2FudmFzLmJhY2tncm91bmRDb2xvclxuXHRcdEBfZGV2aWNlSW1hZ2UgPSBGcmFtZXIuRGV2aWNlLmRldmljZUltYWdlXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGUgXG5cdFx0XHR4OiBAX3N0YXJ0UG9zaXRpb24gLSAxMjIsIFxuXHRcdFx0b3B0aW9uczoge3RpbWU6IC40fVxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+IFxuXHRcdFx0QGZvY3VzKClcblxuXHRkaXNhYmxlOiA9PlxuXHRcdEBlbmFibGVkID0gZmFsc2VcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMuYW5pbWF0ZSBcblx0XHRcdHg6IEBfc3RhcnRQb3NpdGlvbixcblx0XHRcdG9wdGlvbnM6IHt0aW1lOiAuMzV9XG5cblx0XHRAdW5mb2N1cygpXG5cblx0ZmluZExheWVyOiAoZWxlbWVudCkgLT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGlmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcmFtZXJMYXllcicpXG5cdFx0XHRyZXR1cm4gZWxlbWVudFxuXG5cdFx0QGZpbmRMYXllcihlbGVtZW50LnBhcmVudE5vZGUpXG5cblx0cmVzZXRMYXllcnM6ID0+XG5cdFx0QGxheWVycyA9IFtdXG5cblx0XHRmb3IgbGF5ZXIgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnNcblx0XHRcdEBsYXllcnMucHVzaCBsYXllclxuXG5cdGdldExheWVyRnJvbUVsZW1lbnQ6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXG5cdFx0ZWxlbWVudCA9IEBmaW5kTGF5ZXIoZWxlbWVudClcblx0XHRsYXllciA9IF8uZmluZChAbGF5ZXJzLCBbJ19lbGVtZW50JywgZWxlbWVudF0pXG5cblx0XHRyZXR1cm4gbGF5ZXJcblxuXHRjbGlja0hvdmVyZWRFbGVtZW50OiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXHRcdHJldHVybiBpZiBub3QgZXZlbnRcblxuXHRcdHJldHVybiBpZiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdTcGVjRWxlbWVudCcpXG5cblx0XHRlID0gKGV2ZW50Py50YXJnZXQgPyBAaG92ZXJlZEVsZW1lbnQpXG5cblx0XHRsYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGUpXG5cdFx0cmV0dXJuIGlmIG5vdCBsYXllclxuXG5cdFx0ZWxlbWVudCA9IGxheWVyLl9lbGVtZW50XG5cblx0XHRpZiBlbGVtZW50IGlzIEBzZWxlY3RlZEVsZW1lbnRcblx0XHRcdEBkZXNlbGVjdChlbGVtZW50LCBsYXllcilcblx0XHRlbHNlXG5cdFx0XHRAc2VsZWN0KGVsZW1lbnQsIGxheWVyKVxuXG5cdHNlbGVjdDogKGVsZW1lbnQpID0+XG5cdFx0QHNlbGVjdGVkRWxlbWVudCA9IGVsZW1lbnQgPyBAaG92ZXJlZExheWVyLl9lbGVtZW50XG5cdFx0VXRpbHMuZGVsYXkgMCwgQGZvY3VzXG5cblx0ZGVzZWxlY3Q6IChlbGVtZW50KSA9PlxuXHRcdEBzZWxlY3RlZEVsZW1lbnQgPSB1bmRlZmluZWRcblx0XHRVdGlscy5kZWxheSAwLCBAZm9jdXNcblxuXHRnZXRMYXllckRpbWVuc2lvbnM6IChsYXllcikgPT5cblx0XHRmcmFtZSA9IFV0aWxzLmJvdW5kaW5nRnJhbWUobGF5ZXIpXG5cdFx0ZnJhbWUgPSBAZnJhbWlmeShmcmFtZSlcblx0XHRyZXR1cm4gZnJhbWVcblxuXHRmcmFtaWZ5OiAoZnJhbWUpIC0+XG5cdFx0ZnJhbWUubWF4WCA9IGZyYW1lLnggKyBmcmFtZS53aWR0aFxuXHRcdGZyYW1lLm1pZFggPSBVdGlscy5yb3VuZChmcmFtZS54ICsgZnJhbWUud2lkdGgvMilcblxuXHRcdGZyYW1lLm1heFkgPSBmcmFtZS55ICsgZnJhbWUuaGVpZ2h0XG5cdFx0ZnJhbWUubWlkWSA9IFV0aWxzLnJvdW5kKGZyYW1lLnkgKyBmcmFtZS5oZWlnaHQvMilcblxuXHRcdHJldHVybiBmcmFtZVxuXG5cdGdldERpbWVuc2lvbnM6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdGQgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRkaW1lbnNpb25zID0ge1xuXHRcdFx0eDogZC5sZWZ0XG5cdFx0XHR5OiBkLnRvcFxuXHRcdFx0d2lkdGg6IGQud2lkdGhcblx0XHRcdGhlaWdodDogZC5oZWlnaHRcblx0XHRcdG1pZFg6IGQubGVmdCArIChkLndpZHRoIC8gMilcblx0XHRcdG1pZFk6IGQudG9wICsgKGQuaGVpZ2h0IC8gMilcblx0XHRcdG1heFg6IGQubGVmdCArIGQud2lkdGhcblx0XHRcdG1heFk6IGQudG9wICsgZC5oZWlnaHRcblx0XHRcdGZyYW1lOiBkXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpbWVuc2lvbnNcblxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIHBvaW50QVswXSBpcyBwb2ludEJbMF1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdIC0gNX0gI3twb2ludEFbMV19IEwgI3twb2ludEFbMF0gKyA1fSAje3BvaW50QVsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA1fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDV9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF19ICN7cG9pbnRCWzFdIC0gNX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0bWFrZUxhYmVsOiAoeCwgeSwgdGV4dCkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxhYmVsID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAndGV4dCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiB4XG5cdFx0XHR5OiB5XG5cdFx0XHQnZm9udC1mYW1pbHknOiBAZm9udEZhbWlseVxuXHRcdFx0J2ZvbnQtc2l6ZSc6IEBmb250U2l6ZVxuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogQGZvbnRXZWlnaHRcblx0XHRcdGZpbGw6IEBzZWNvbmRhcnlDb2xvclxuXHRcdFx0dGV4dDogTWF0aC5mbG9vcih0ZXh0IC8gQHJhdGlvKVxuXG5cdFx0bCA9IEBnZXREaW1lbnNpb25zKGxhYmVsLmVsZW1lbnQpXG5cblx0XHRsYWJlbC54ID0geCAtIGwud2lkdGggLyAyXG5cdFx0bGFiZWwueSA9IHkgKyBsLmhlaWdodCAvIDQgLSAxXG5cblx0XHRib3ggPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IGxhYmVsLnggLSBAcGFkZGluZy5sZWZ0XG5cdFx0XHR5OiBsYWJlbC55IC0gbC5oZWlnaHQgKyAxXG5cdFx0XHR3aWR0aDogbC53aWR0aCArIEBwYWRkaW5nLmxlZnQgKyBAcGFkZGluZy5yaWdodFxuXHRcdFx0aGVpZ2h0OiBsLmhlaWdodCArIEBwYWRkaW5nLnRvcCArIEBwYWRkaW5nLmJvdHRvbSArIDFcblx0XHRcdHJ4OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRyeTogQGJvcmRlclJhZGl1c1xuXHRcdFx0ZmlsbDogbmV3IENvbG9yKGNvbG9yKS5kYXJrZW4oNDApXG5cdFx0XHQjIGZpbGw6ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0bGFiZWwuc2hvdygpXG5cblx0bWFrZUJvdW5kaW5nUmVjdHM6IChzLCBoKSA9PlxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXG5cdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoLjIpXG5cblx0XHRpZiBAaG92ZXJlZEVsZW1lbnQgaXMgQHNjcmVlbkVsZW1lbnRcblx0XHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKDApXG5cblx0XHRzZWxlY3RGaWxsID0gbmV3IENvbG9yKEBzZWxlY3RlZENvbG9yKS5hbHBoYSguMilcblxuXHRcdGlmIEBzZWxlY3RlZEVsZW1lbnQgaXMgQHNjcmVlbkVsZW1lbnRcblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKDApXG5cblx0XHRob3ZlcmVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogaC54XG5cdFx0XHR5OiBoLnlcblx0XHRcdHdpZHRoOiBoLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGguaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBjb2xvclxuXHRcdFx0ZmlsbDogaG92ZXJGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXG5cdFx0c2VsZWN0ZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBzLnhcblx0XHRcdHk6IHMueVxuXHRcdFx0d2lkdGg6IHMud2lkdGhcblx0XHRcdGhlaWdodDogcy5oZWlnaHRcblx0XHRcdHN0cm9rZTogQHNlbGVjdGVkQ29sb3Jcblx0XHRcdGZpbGw6IHNlbGVjdEZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdG1ha2VEYXNoZWRMaW5lczogKGUsIGYsIGNvbG9yLCBvZmZzZXQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlXG5cdFx0cmV0dXJuIGlmIGUgaXMgZlxuXG5cdFx0Y29sb3IgPSBuZXcgQ29sb3IoY29sb3IpLmFscGhhKC44KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS54LCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUueCwgeTogZi5tYXhZfVxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi55fSxcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUueX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLnl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLm1heFl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0c2hvd0Rpc3RhbmNlczogKHNlbGVjdGVkLCBob3ZlcmVkKSA9PlxuXG5cdFx0cyA9IEBnZXREaW1lbnNpb25zKEBzZWxlY3RlZEVsZW1lbnQpXG5cdFx0aCA9IEBnZXREaW1lbnNpb25zKEBob3ZlcmVkRWxlbWVudClcblx0XHRmID0gQGdldERpbWVuc2lvbnMoQHNjcmVlbkVsZW1lbnQpXG5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblx0XHRyZXR1cm4gaWYgQGhvdmVyZWRMYXllcj8udmlzaWJsZSBpcyBmYWxzZVxuXHRcdHJldHVybiBpZiBAaG92ZXJlZExheWVyPy5vcGFjaXR5IGlzIDBcblx0XHRcblx0XHQjIEBtYWtlRGFzaGVkTGluZXMoaCwgZiwgQGNvbG9yLCAwKVxuXHRcdEBtYWtlRGFzaGVkTGluZXMocywgZiwgQHNlbGVjdGVkQ29sb3IsIDUpXG5cblx0XHRAbWFrZUJvdW5kaW5nUmVjdHMocywgaClcblxuXHRcdEByYXRpbyA9IEBzY3JlZW5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRpZiBAc2VsZWN0ZWRFbGVtZW50IGlzIEBob3ZlcmVkRWxlbWVudFxuXHRcdFx0aCA9IGZcblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGNvbnRhaW5zIGhvdmVyZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54IDwgaC54IGFuZCBzLm1heFggPiBoLm1heFggYW5kIHMueSA8IGgueSBhbmQgcy5tYXhZID4gaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFggLSBoLm1heFgpXG5cdFx0XHRtID0gaC5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWF4WCArIDUsIGgubWlkWV0sIFtzLm1heFggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFkgLSBoLm1heFkpXG5cdFx0XHRtID0gaC5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC54KVxuXHRcdFx0bSA9IHMueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gaG92ZXJlZCBlbGVtZW50IGNvbnRhaW5zIHNlbGVjdGVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA+IGgueCBhbmQgcy5tYXhYIDwgaC5tYXhYIGFuZCBzLnkgPiBoLnkgYW5kIHMubWF4WSA8IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IGgueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBoLnkgKyA1XSwgW3MubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC5tYXhYIC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBzLm1pZFldLCBbaC5tYXhYIC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC5tYXhZIC0gcy5tYXhZKVxuXHRcdFx0bSA9IHMubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIHMubWF4WSArIDVdLCBbcy5taWRYLCBoLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBoLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIHMubWlkWV0sIFtzLnggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gaG92ZXJlZCBlbGVtZW50XG5cdFx0XG5cdFx0IyB0b3BcblxuXHRcdGlmIHMueSA+IGgubWF4WVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC5tYXhZKVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnkgPiBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLnkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdCMgbGVmdFxuXG5cdFx0aWYgaC5tYXhYIDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLm1heFgpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWF4WCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRlbHNlIGlmIGgueCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC54KVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0IyByaWdodFxuXG5cdFx0aWYgcy5tYXhYIDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRlbHNlIGlmIHMueCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IHMueCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0IyBib3R0b21cblxuXHRcdGlmIHMubWF4WSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy5tYXhZKVxuXHRcdFx0bSA9IHMubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMubWF4WSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBzLnkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cdFx0aCA9IEBob3ZlcmVkTGF5ZXJcblx0XHRoZSA9IEBob3ZlcmVkRWxlbWVudFxuXHRcdHMgPSBAc2VsZWN0ZWRMYXllclxuXHRcdHNlID0gQHNlbGVjdGVkRWxlbWVudFxuXG5cdFx0bGF5ZXIgPSBzID8gaFxuXG5cdFx0aWYgbm90IGxheWVyP1xuXHRcdFx0QHNwZWNQYW5lbC5jbGVhclByb3BzKClcblx0XHRcdHJldHVyblxuXG5cdFx0cHJvcHMgPSBsYXllci5wcm9wc1xuXG5cdFx0Xy5hc3NpZ24gcHJvcHMsXG5cdFx0XHR4OiBsYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHR5OiBsYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHRjb21wb25lbnROYW1lOiBsYXllci5jb25zdHJ1Y3Rvci5uYW1lXG5cdFx0XHRwYXJlbnROYW1lOiBsYXllci5wYXJlbnQ/Lm5hbWVcblxuXHRcdF8uYXNzaWduIEBzcGVjUGFuZWwsIHByb3BzXG5cblx0XHRAc3BlY1BhbmVsLnNldFRleHRTdHlsZXMobGF5ZXIuZm9udEZhbWlseSlcblxuXHR0cnlGb2N1czogKGV2ZW50KSA9PlxuXHRcdEBjdXJyZW50SG92ZXJlZCA9IGV2ZW50LnRhcmdldFxuXHRcdGRvIChldmVudCkgPT5cblx0XHRcdFV0aWxzLmRlbGF5IC4wNCwgPT5cblx0XHRcdFx0aWYgQGN1cnJlbnRIb3ZlcmVkIGlzIGV2ZW50LnRhcmdldFxuXHRcdFx0XHRcdEBmb2N1cyhldmVudClcblxuXHRmb2N1czogKGV2ZW50KSA9PlxuXHRcdGlmIEBlbmFibGVkIGlzIGZhbHNlXG5cdFx0XHRyZXR1cm4gXG5cblx0XHRAdW5mb2N1cygpXG5cblx0XHRAc2VsZWN0ZWRFbGVtZW50ID89IEBzY3JlZW5FbGVtZW50XG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChAc2VsZWN0ZWRFbGVtZW50KVxuXG5cdFx0aG92ZXJlZEVsZW1lbnQgPSAoZXZlbnQ/LnRhcmdldCA/IEBob3ZlcmVkRWxlbWVudCA/IEBzY3JlZW5FbGVtZW50KVxuXG5cdFx0QGhvdmVyZWRMYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGhvdmVyZWRFbGVtZW50KVxuXG5cdFx0QGhvdmVyZWRFbGVtZW50ID0gQGhvdmVyZWRMYXllcj8uX2VsZW1lbnQgPyBGcmFtZXIuRGV2aWNlLmJhY2tncm91bmRMYXllclxuXG5cdFx0QHNldFBhbmVsUHJvcGVydGllcygpXG5cblx0XHRAc2hvd0Rpc3RhbmNlcyhAc2VsZWN0ZWRFbGVtZW50LCBAaG92ZXJlZEVsZW1lbnQpXG5cblx0dW5mb2N1czogKCkgPT5cblx0XHRjdHgucmVtb3ZlQWxsKClcblx0XHRpZiBub3QgQHNlbGVjdGVkTGF5ZXIgdGhlbiBAc3BlY1BhbmVsLmNsZWFyUHJvcHMoKVxuXG5cbmV4cG9ydHMuZ290Y2hhID0gbmV3IEdvdGNoYVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURjQSxJQUFBLG1PQUFBO0VBQUE7Ozs7QUFBQSxN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
