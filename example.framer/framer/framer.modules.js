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
    this.githubIcon = document.createElement('a');
    this.githubIcon.href = "http://github.com/steveruizok";
    this.githubIcon.innerHTML = '<svg height="20px" width="20px" id="github_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>';
    panel.appendChild(this.githubIcon);
    this.twitterIcon = document.createElement('a');
    this.twitterIcon.href = "http://twitter.com/steveruizok";
    this.twitterIcon.innerHTML = '<svg height="28px" width="28px" id="twitter_logo" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>';
    panel.appendChild(this.twitterIcon);
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
    return _.delay(reset, 100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuY3R4ID0gdW5kZWZpbmVkXG5cbnN0YXJ0T3BlbiA9IGZhbHNlXG5cblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0fVxuXG5cdC5TcGVjTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0fVxuXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93Q29waWVkIHtcblx0XHQwJSB7IFxuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApO1xuXHRcdH1cblxuXHRcdDEwMCUge1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEuMDAwKTtcblx0XHR9XG5cdH1cblxuXHQuY29waWVkIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG5cdH1cblx0XG5cdCN0d2l0dGVyX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDRweDtcblx0XHRyaWdodDogNHB4O1xuXHR9XG5cblx0I2dpdGh1Yl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDM2cHg7XG5cdH1cblxuXHQuZnJhbWVyTGF5ZXIgeyBcblx0XHRwb2ludGVyLWV2ZW50czogYWxsICFpbXBvcnRhbnQ7IFxuXHRcdH0gXG5cdFxuXHQuSWdub3JlUG9pbnRlckV2ZW50cyB7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgXG5cdH1cblwiXCJcIlxuXG5mb3IgbmFtZSBpbiBbJ3NjcmVlbkJhY2tncm91bmQnLCAncGhvbmUnLCAnc2NyZWVuJywgJ2hhbmRzSW1hZ2VMYXllcicsICdzY3JlZW5NYXNrJywgJ2NvbnRlbnQnXVxuXHRsYXllciA9IEZyYW1lci5EZXZpY2VbbmFtZV1cblx0cmV0dXJuIGlmIG5vdCBsYXllclxuXG5cdGxheWVyLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMgXHQgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuIyBcdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcbiMgXHQgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG4jIFx0IGRQICAgICAgICBgODg4ODhQOCBkUCAgICBkUCBgODg4ODhQJyBkUFxuIyBcdFxuIyBcdFxuXG5cbnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbnBhbmVsLmlkID0gJ1NwZWNDb250YWluZXInXG52aWV3QyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGcmFtZXJDb250ZXh0Um9vdC1EZWZhdWx0JylcblV0aWxzLmRlbGF5IDAsID0+IHZpZXdDLmFwcGVuZENoaWxkKHBhbmVsKVxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyBcdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQICAgIDg4ODg4OGJhXG4jIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIDg4ICAgIGA4YlxuIyBcdGBZODg4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiBkODg4OFAgYTg4YWFhYThQJyAuZDg4ODhiLiBkUC4gIC5kUFxuIyBcdCAgICAgIGA4YiA4OG9vb29kOCA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4b29vb2Q4ICAgODggICAgODggICBgOGIuIDg4JyAgYDg4ICBgOGJkOCdcbiMgXHRkOCcgICAuOFAgODguICAuLi4gODguICAuLi4gODggICAgICAgODguICAuLi4gICA4OCAgICA4OCAgICAuODggODguICAuODggIC5kODhiLlxuIyBcdCBZODg4ODhQICBgODg4ODhQJyBgODg4ODhQJyBkUCAgICAgICBgODg4ODhQJyAgIGRQICAgIDg4ODg4ODg4UCBgODg4ODhQJyBkUCcgIGBkUFxuIyBcdFxuIyBcdFxuXG5zZWNyZXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3JldEJveClcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICMgXHQuZDg4ODg4YiAgZFAgICAgIGRQICAuODg4ODguICAgICAgYTg4ODg4Yi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4gIyBcdDg4LiAgICBcIicgODggICAgIDg4IGQ4JyAgIGA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIyBcdGBZODg4ODhiLiA4OCAgICAuOFAgODggICAgICAgICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuICMgXHQgICAgICBgOGIgODggICAgZDgnIDg4ICAgWVA4OCAgICA4OCAgICAgICAgODgnICBgODggODgnYDg4J2A4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OCAgIDg4ICAgWThvb29vby5cbiAjIFx0ZDgnICAgLjhQIDg4ICAuZDhQICBZOC4gICAuODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4gIyBcdCBZODg4ODhQICA4ODg4ODgnICAgIGA4ODg4OCcgICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuICMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuXG5cbiMjI1xuXHQgLC0uICAuICAgLCAgLC0uICAsLS4gICAgICAgICAuICAgICAgICAgICAuXG5cdCggICBgIHwgIC8gIC8gICAgLyAgICAgICAgICAgIHwgICAgICAgICAgIHxcblx0IGAtLiAgfCAvICAgfCAtLiB8ICAgICwtLiA7LS4gfC0gICwtLiAuICwgfC1cblx0LiAgICkgfC8gICAgXFwgIHwgXFwgICAgfCB8IHwgfCB8ICAgfC0nICBYICB8XG5cdCBgLScgICcgICAgICBgLScgIGAtJyBgLScgJyAnIGAtJyBgLScgJyBgIGAtJ1xuXHRcbiMjI1xuXG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAZnJhbWVFbGVtZW50ID0gRnJhbWVyLkRldmljZS5zY3JlZW5CYWNrZ3JvdW5kLl9lbGVtZW50XG5cblx0XHRAbEZyYW1lID0gQGZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0IyBDcmVhdGUgU1ZHIGVsZW1lbnRcblxuXHRcdEBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKVxuXHRcblx0XHRjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LVRvdWNoRW11bGF0b3InKVxuXHRcdGNvbnRleHQuYXBwZW5kQ2hpbGQoQHN2ZylcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0YWRkU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc2hhcGVzLnB1c2goc2hhcGUpXG5cdFx0QHNob3dTaGFwZShzaGFwZSlcblx0XHRcblx0cmVtb3ZlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAaGlkZVNoYXBlKHNoYXBlKVxuXHRcdF8ucHVsbChAc2hhcGVzLCBzaGFwZSlcblx0XHRcblx0aGlkZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcblx0c2hvd1NoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5hcHBlbmRDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdFxuXHRhZGREZWY6IChkZWYpIC0+XG5cdFx0QHN2Z0RlZnMuYXBwZW5kQ2hpbGQoZGVmKVxuXG5cdHJlbW92ZUFsbDogPT5cblx0XHRmb3Igc2hhcGUgaW4gQHNoYXBlc1xuXHRcdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdEBzaGFwZXMgPSBbXVxuXG5cbiMjI1xuXHQgLC0uICAuICAgLCAgLC0uICAsLS4gIC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4gOy0uXG5cdCggICBgIHwgIC8gIC8gICAgKCAgIGAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8ICApXG5cdCBgLS4gIHwgLyAgIHwgLS4gIGAtLiAgfC0uICwtOiA7LS4gLC0uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwtfCB8LSdcblx0LiAgICkgfC8gICAgXFwgIHwgLiAgICkgfCB8IHwgfCB8IHwgfC0nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgfCB8XG5cdCBgLScgICcgICAgICBgLScgIGAtJyAgJyAnIGAtYCB8LScgYC0nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAtJyAnXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7dHlwZTogJ2NpcmNsZSd9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBwYXJlbnQgPSBzdmdDb250ZXh0XG5cdFx0XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFxuXHRcdFx0b3B0aW9ucy50eXBlXG5cdFx0XHQpXG5cblx0XHRAc2V0Q3VzdG9tUHJvcGVydHkoJ3RleHQnLCAndGV4dENvbnRlbnQnLCAndGV4dENvbnRlbnQnLCBvcHRpb25zLnRleHQpXG5cdFx0XHRcdFxuXHRcdCMgYXNzaWduIGF0dHJpYnV0ZXMgc2V0IGJ5IG9wdGlvbnNcblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cdFx0XHRAc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAcGFyZW50LmFkZFNoYXBlKEApXG5cdFx0XG5cdFx0QHNob3coKVxuXHRcdFx0XG5cdHNldEF0dHJpYnV0ZTogKGtleSwgdmFsdWUpID0+XG5cdFx0cmV0dXJuIGlmIGtleSBpcyAndGV4dCdcblx0XHRpZiBub3QgQFtrZXldP1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0Z2V0OiA9PlxuXHRcdFx0XHRcdHJldHVybiBAZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdFx0QGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XG5cdFx0QFtrZXldID0gdmFsdWVcblx0XG5cdHNldEN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCByZXR1cm5WYWx1ZSwgc2V0VmFsdWUsIHN0YXJ0VmFsdWUpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBlbGVtZW50W3NldFZhbHVlXSA9IHZhbHVlXG5cblx0XHRAW3ZhcmlhYmxlTmFtZV0gPSBzdGFydFZhbHVlXG5cblx0aGlkZTogLT4gXG5cdFx0QHBhcmVudC5oaWRlU2hhcGUoQClcblx0XG5cdHNob3c6IC0+IFxuXHRcdEBwYXJlbnQuc2hvd1NoYXBlKEApXG5cdFx0XG5cdHJlbW92ZTogLT5cblx0XHRAcGFyZW50LnJlbW92ZVNoYXBlKEApXG5cblxuY2xhc3MgRGFzaGVkTGluZSBleHRlbmRzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAocG9pbnRBLCBwb2ludEIsIGNvbG9yID0gJyMwMDAnLCBvZmZzZXQgPSAwLCBvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmFzc2lnbiBvcHRpb25zLFxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEEueH0gI3twb2ludEEueX0gTCAje3BvaW50Qi54fSAje3BvaW50Qi55fVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblx0XHRcdCdzdHJva2UtZGFzaGFycmF5JzogXCI1LCA1XCJcblx0XHRcdCdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cbmN0eCA9IG5ldyBTVkdDb250ZXh0XG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG4jIFx0IDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICAgYTg4ODg4Yi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0YTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OCAgICA4OCAgICAgICAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFAgLmQ4ODg4Yi5cbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuIyBcdCA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4jIFx0IGRQICAgICAgICBgODg4ODhQOCBkUCAgICBkUCBgODg4ODhQJyBkUCAgICAgWTg4ODg4UCcgYDg4ODg4UCcgZFAgIGRQICBkUCA4OFk4ODhQJyBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgIGRQICAgYDg4ODg4UCdcbiMgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLS4gLiAgICAgICAgICAgICAgICAgICAuXG5cdCggICBgICAgICAgICAgICAgIHwgICAgfCAgICAgICAgICAgICAgICAgICB8XG5cdCBgLS4gIDstLiAsLS4gLC0uIHwtICAgfCAsLS4gOy0uLS4gLC0uIDstLiB8LVxuXHQuICAgKSB8IHwgfC0nIHwgICB8ICAgIHwgfC0nIHwgfCB8IHwtJyB8IHwgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLS0nICcgYC0nICcgJyAnIGAtJyAnICcgYC0nXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAoY2xhc3NOYW1lLCBvcHRpb25zID0ge30sIHRleHQpIC0+XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQgY2xhc3NOYW1lXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCAnU3BlY0VsZW1lbnQnXG5cblx0XHRfLmFzc2lnbiBAZWxlbWVudC5zdHlsZSwgb3B0aW9uc1xuXG5cdFx0cGFuZWwuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwgICAgICAgIC4gICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgICAgICB8ICAgICAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLTogfC0uICwtLiB8XG5cdC4gICApIHwgfCB8LScgfCAgIHwgICAgfCB8IHwgfCB8LScgfFxuXHQgYC0nICB8LScgYC0nIGAtJyBgLS0nIGAtYCBgLScgYC0nICdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0xhYmVsIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ25vbmUnXG5cdFx0XHQnZm9udC1mYW1pbHknOiAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdmb250LXdlaWdodCc6ICc0MDAnXG5cdFx0XHQnY29sb3InOiAncmdiYSgxMzYsIDEzNiwgMTM2LCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5cdFx0QHRleHRMYXllciA9IG5ldyBTcGVjRWxlbWVudCAnU3BlY0xhYmVsJyxcblx0XHRcdCdmb250LWZhbWlseSc6IG9wdGlvbnNbJ2ZvbnQtZmFtaWx5J10gPyAnSGVsdmV0aWNhIE5ldWUnXG5cdFx0XHQnZm9udC1zaXplJzogb3B0aW9uc1snZm9udC1zaXplJ10gPyAnMWVtJ1xuXHRcdFx0J2ZvbnQtd2VpZ2h0Jzogb3B0aW9uc1snZm9udC13ZWlnaHQnXSA/ICc1MDAnXG5cdFx0XHQnY29sb3InOiBvcHRpb25zWydjb2xvciddID8gJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMS4wMDApJ1xuXHRcdFx0J2xlZnQnOiBvcHRpb25zLmxlZnRcblx0XHRcdCdyaWdodCc6IG9wdGlvbnMucmlnaHRcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0TGF5ZXIuZWxlbWVudFxuXG5cdFx0b3B0aW9ucy5wYXJlbnQ/LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3RleHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdudW1iZXInIHRoZW4gdmFsdWUgPSB2YWx1ZS50b0ZpeGVkKClcblx0XHRcdFx0QHRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblxuXHRcdEB0ZXh0ID0gb3B0aW9ucy50ZXh0ID8gJydcblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwtLiAgICAgICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgXFwgbyAgICAgbyAgIHxcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgfCAuIC4gLCAuICwtfCAsLS4gOy0uXG5cdC4gICApIHwgfCB8LScgfCAgIHwgIC8gfCB8LyAgfCB8IHwgfC0nIHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICAnICcgICAnIGAtJyBgLScgJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRGl2aWRlciBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc4cHgnXG5cdFx0XHQnd2lkdGgnOiAnMjA4cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzFweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJyMwMDAnXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cblx0XHRzdXBlciAnU3BlY0RpdmlkZXInLCBvcHRpb25zXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgKVxuXHQgYC0uICA7LS4gLC0uICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0nICBgLScgJyBgXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNCb3ggZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogdW5kZWZpbmVkXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzk2cHgnXG5cdFx0XHQnd2lkdGgnOiAnNjRweCdcblx0XHRcdCdoZWlnaHQnOiAnMjRweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2JveC1zaGFkb3cnOiAnaW5zZXQgMHB4IDBweCAwcHggNHB4IHJnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgJ1NwZWNMYWJlbCcsIG9wdGlvbnNcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgICwtLiAgICAgLiAgICAgICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIC8gICAgICAgIHwgICAgICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAgICAsLS4gfCAsLS4gOy0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIFxcICAgIHwgfCB8IHwgfCB8ICAgfC8gICAgfCB8IHwgfCB8IHwtJyB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyAgYC0nIGAtJyAnIGAtJyAnICAgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cbmNsYXNzIFNwZWNDb2xvclZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2xlZnQnOiAnOTZweCdcblx0XHRcdCd3aWR0aCc6ICc2NHB4J1xuXHRcdFx0J2hlaWdodCc6ICcyNHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnYm94LXNoYWRvdyc6ICdpbnNldCAwcHggMHB4IDBweCA0cHggcmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpID0+IFxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHZhbHVlID8gJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0QHZhbHVlID0gb3B0aW9ucy52YWx1ZVxuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAuICAgLCAgICAgLiAgICAgICAgICwtLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCAvICAgLC06IHwgLiAuICwtLiB8LTwgICwtLiAuICxcblx0LiAgICkgfCB8IHwtJyB8ICAgfC8gICAgfCB8IHwgfCB8IHwtJyB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjVmFsdWVCb3ggZXh0ZW5kcyBTcGVjQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogJ0hlbHZldGljYSBOZXVlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNDJlbSdcblx0XHRcdCdwYWRkaW5nLXRvcCc6ICc1cHgnXG5cdFx0XHQncGFkZGluZy1sZWZ0JzogJzhweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnbGluZS1oZWlnaHQnOiAnMWVtJ1xuXHRcdFx0J292ZXJmbG93JzogJ2hpZGRlbidcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEB2YWx1ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0ID8gJydcblx0XHRcdHBhcmVudDogQGVsZW1lbnRcblx0XHRcdCdmb250LXNpemUnOiAnMWVtJ1xuXHRcdFx0J2xlZnQnOiAnNnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQnY29sb3InOiAnI0ZGRidcblx0XHRcdCdmb250LXdlaWdodCc6ICc1MDAnXG5cblx0XHRAdW5pdExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dGV4dDogb3B0aW9ucy51bml0ID8gJydcblx0XHRcdHBhcmVudDogQGVsZW1lbnRcblx0XHRcdCdmb250LXNpemUnOiAnLjllbSdcblx0XHRcdCdyaWdodCc6ICcycHgnXG5cdFx0XHQndG9wJzogJzZweCdcblx0XHRcdCd0ZXh0LWFsaWduJzogJ3JpZ2h0J1xuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHZhbHVlTGFiZWwuZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QHZhbHVlTGFiZWwuZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gJydcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLCAgIC4gICAgIC4gICAgIC4gICAsICAgICAuICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgLiB8IG8gICB8ICAgICB8ICAvICAgICAgfCAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfCApICkgLiAsLXwgLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvfC8gIHwgfCB8IHwtJyB8LyAgICB8IHwgfCB8IHwgfC0nIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nICcgJyAgICcgYC0nIGAtJyAnICAgICBgLWAgJyBgLWAgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjV2lkZVZhbHVlQm94IGV4dGVuZHMgU3BlY1ZhbHVlQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEzNnB4J1xuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4jIyNcblx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG5cdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG5cdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcblx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcblx0IFk4ODg4OFAgIDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4OFAnICBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcblx0ICAgICAgICAgIDg4XG5cdCAgICAgICAgICBkUFxuIyMjXG5cblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QHBhbmVsID0gcGFuZWxcblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAcGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAcGFuZWwuc3R5bGUub3BhY2l0eSA9IGlmIHN0YXJ0T3BlbiB0aGVuICcxJyBlbHNlICcwJ1xuXG5cdFx0Y29sMHggPSAnNHB4J1xuXHRcdGNvbDF4ID0gJzg0cHgnXG5cdFx0Y29sMnggPSAnMTU2cHgnXG5cblx0XHRyb3cgPSAobnVtLCBvZmZzZXQgPSAwKSAtPiByZXR1cm4gKDE2ICsgKDM1ICogbnVtKSAtIG9mZnNldCkgKyAncHgnXG5cblx0XHQjIHBvc1xuXG5cdFx0QHBvc0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMCwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyBzaXplXG5cblx0XHRAc2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAd1ZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIGJhY2tncm91bmRcblxuXHRcdEBiZ0NvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygyLCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBiZ0NvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDIpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBvcGFjaXR5XG5cblx0XHRAb3BhY2l0eUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMywgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAb3BhY2l0eVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMylcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMS4wJ1xuXHRcdFx0dW5pdDogJ2EnXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMSA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coNC4yNSwgMilcblxuXHRcdCMgYm9yZGVyXG5cblx0XHRAYm9yZGVyQ29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDQuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0JvcmRlcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAYm9yZGVyQ29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAYm9yZGVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg0Ljc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIHJhZGl1c1xuXG5cdFx0QHJhZGl1c0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNS43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEByYWRpdXNWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDUuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzAnXG5cblx0XHQjIHNoYWRvd1xuXG5cdFx0QHNoYWRvd0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNi43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBzaGFkb3dDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdEBzaGFkb3dTcHJlYWRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDYuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzEnXG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBzaGFkb3dYVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg3Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAc2hhZG93WVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0QHNoYWRvd0JsdXJWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDguNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2JsdXInXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMiA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coMTAsIDIpXG5cblx0XHQjIEZvbnRcblxuXHRcdEBmb250TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMC4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnRm9udCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udEZhbWlseVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEwLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgQ29sb3JcblxuXHRcdEBjb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTEuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBjb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAZm9udFN0eWxlVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cblx0XHQjIEZvbnQgU2l6ZVxuXG5cdFx0QGZvbnRTaXplTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMi4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udFNpemVWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdzJ1xuXG5cdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyBMaW5lIEhlaWdodFxuXG5cdFx0QGxpbmVIaWdodExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTMuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0hlaWdodCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbGluZUhlaWdodFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTMuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2xoJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDE0LjUsIDIpXG5cdFx0XG5cdFx0IyBOYW1lXG5cdFx0QG5hbWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdOYW1lJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBuYW1lVmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBDb21wb25lbnRcblxuXHRcdEBjb21wb25lbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE2KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGNvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE2KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgUGFyZW50IENvbXBvbmVudFxuXG5cdFx0QHBhcmVudENvbXBvbmVudExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTcpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1BhcnQgb2YnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHBhcmVudENvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE3KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXG5cdFx0IyBMaW5rc1xuXG5cdFx0QGdpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAZ2l0aHViSWNvbi5ocmVmID0gXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0QGdpdGh1Ykljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjBweFwiIHdpZHRoPVwiMjBweFwiIGlkPVwiZ2l0aHViX2xvZ29cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIj48cGF0aCBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiBkPVwiTTUxMiAwQzIyOS4yNSAwIDAgMjI5LjI1IDAgNTEyYzAgMjI2LjI1IDE0Ni42ODggNDE4LjEyNSAzNTAuMTU2IDQ4NS44MTIgMjUuNTk0IDQuNjg4IDM0LjkzOC0xMS4xMjUgMzQuOTM4LTI0LjYyNSAwLTEyLjE4OC0wLjQ2OS01Mi41NjItMC43MTktOTUuMzEyQzI0MiA5MDguODEyIDIxMS45MDYgODE3LjUgMjExLjkwNiA4MTcuNWMtMjMuMzEyLTU5LjEyNS01Ni44NDQtNzQuODc1LTU2Ljg0NC03NC44NzUtNDYuNTMxLTMxLjc1IDMuNTMtMzEuMTI1IDMuNTMtMzEuMTI1IDUxLjQwNiAzLjU2MiA3OC40NyA1Mi43NSA3OC40NyA1Mi43NSA0NS42ODggNzguMjUgMTE5Ljg3NSA1NS42MjUgMTQ5IDQyLjUgNC42NTQtMzMgMTcuOTA0LTU1LjYyNSAzMi41LTY4LjM3NUMzMDQuOTA2IDcyNS40MzggMTg1LjM0NCA2ODEuNSAxODUuMzQ0IDQ4NS4zMTJjMC01NS45MzggMTkuOTY5LTEwMS41NjIgNTIuNjU2LTEzNy40MDYtNS4yMTktMTMtMjIuODQ0LTY1LjA5NCA1LjA2Mi0xMzUuNTYyIDAgMCA0Mi45MzgtMTMuNzUgMTQwLjgxMiA1Mi41IDQwLjgxMi0xMS40MDYgODQuNTk0LTE3LjAzMSAxMjguMTI1LTE3LjIxOSA0My41IDAuMTg4IDg3LjMxMiA1Ljg3NSAxMjguMTg4IDE3LjI4MSA5Ny42ODgtNjYuMzEyIDE0MC42ODgtNTIuNSAxNDAuNjg4LTUyLjUgMjggNzAuNTMxIDEwLjM3NSAxMjIuNTYyIDUuMTI1IDEzNS41IDMyLjgxMiAzNS44NDQgNTIuNjI1IDgxLjQ2OSA1Mi42MjUgMTM3LjQwNiAwIDE5Ni42ODgtMTE5Ljc1IDI0MC0yMzMuODEyIDI1Mi42ODggMTguNDM4IDE1Ljg3NSAzNC43NSA0NyAzNC43NSA5NC43NSAwIDY4LjQzOC0wLjY4OCAxMjMuNjI1LTAuNjg4IDE0MC41IDAgMTMuNjI1IDkuMzEyIDI5LjU2MiAzNS4yNSAyNC41NjJDODc3LjQzOCA5MzAgMTAyNCA3MzguMTI1IDEwMjQgNTEyIDEwMjQgMjI5LjI1IDc5NC43NSAwIDUxMiAwelwiIC8+PC9zdmc+J1xuXHRcdHBhbmVsLmFwcGVuZENoaWxkKEBnaXRodWJJY29uKVxuXG5cdFx0QHR3aXR0ZXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0QHR3aXR0ZXJJY29uLmhyZWYgPSBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0QHR3aXR0ZXJJY29uLmlubmVySFRNTCA9ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblx0XHRwYW5lbC5hcHBlbmRDaGlsZChAdHdpdHRlckljb24pXG5cblxuXHRcdCMgLS0tLVxuXG5cdFx0IyBwcm9wZXJ0aWVzXG5cblx0XHRwcm9wcyA9IFtcblx0XHRcdFsneCcsIEB4VmFsdWVCb3hdLFxuXHRcdFx0Wyd5JywgQHlWYWx1ZUJveF0sXG5cdFx0XHRbJ3dpZHRoJywgQHdWYWx1ZUJveF1cblx0XHRcdFsnaGVpZ2h0JywgQGhWYWx1ZUJveF1cblx0XHRcdFsnb3BhY2l0eScsIEBvcGFjaXR5VmFsdWVCb3gsIHRydWVdXG5cdFx0XHRbJ2JvcmRlcldpZHRoJywgQGJvcmRlclZhbHVlQm94XVxuXHRcdFx0Wydib3JkZXJSYWRpdXMnLCBAcmFkaXVzVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1NwcmVhZCcsIEBzaGFkb3dTcHJlYWRWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WCcsIEBzaGFkb3dYVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1knLCBAc2hhZG93WVZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dCbHVyJywgQHNoYWRvd0JsdXJWYWx1ZUJveF1cblx0XHRcdFsnZm9udEZhbWlseScsIEBmb250RmFtaWx5VmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRTaXplJywgQGZvbnRTaXplVmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRXZWlnaHQnLCBAZm9udFdlaWdodFZhbHVlQm94XVxuXHRcdFx0WydsaW5lSGVpZ2h0JywgQGxpbmVIZWlnaHRWYWx1ZUJveF1cblx0XHRcdFsnZm9udFN0eWxlJywgQGZvbnRTdHlsZVZhbHVlQm94XVxuXHRcdFx0Wydjb21wb25lbnROYW1lJywgQGNvbXBvbmVudFZhbHVlQm94XVxuXHRcdFx0Wydjb21wb25lbnROYW1lcycsIEBwYXJlbnRDb21wb25lbnRWYWx1ZUJveF1cblx0XHRcdFsnbmFtZScsIEBuYW1lVmFsdWVCb3hdXG5cdFx0XVxuXG5cdFx0Y29sb3JQcm9wcyA9IFtcblx0XHRcdFsnYmFja2dyb3VuZENvbG9yJywgQGJnQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnYm9yZGVyQ29sb3InLCBAYm9yZGVyQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93Q29sb3InLCBAc2hhZG93Q29sb3JWYWx1ZUJveF1cblx0XHRcdFsnY29sb3InLCBAY29sb3JWYWx1ZUJveF1cblx0XHRdXG5cblx0XHRmb3IgcHJvcCBpbiBwcm9wc1xuXHRcdFx0QGRlZmluZUN1c3RvbVByb3BlcnR5KHByb3BbMF0sIHByb3BbMV0sIHByb3BbMl0pXG5cdFx0XHRAYWRkQ29weUV2ZW50KHByb3BbMF0sIHByb3BbMV0pXG5cblx0XHRmb3IgcHJvcCBpbiBjb2xvclByb3BzXG5cdFx0XHRAZGVmaW5lQ3VzdG9tQ29sb3JQcm9wZXJ0eShwcm9wWzBdLCBwcm9wWzFdLCBwcm9wWzJdKVxuXHRcdFx0QGFkZENvcHlFdmVudChwcm9wWzBdLCBwcm9wWzFdKVxuXG5cdGRlZmluZUN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllciwgZmxvYXQpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6ID0+IHJldHVybiBAcHJvcHNbdmFyaWFibGVOYW1lXVxuXHRcdFx0c2V0OiAodmFsdWUpID0+XG5cdFx0XHRcdEBwcm9wc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVcblxuXHRcdFx0XHRpZiBub3QgdmFsdWU/IG9yIHZhbHVlIGlzICcwJ1xuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gJydcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRpZiBmbG9hdFxuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSA/ICcwJykudG9GaXhlZCgyKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGlmIHR5cGVvZiB2YWx1ZSBpcyAnbnVtYmVyJ1xuXHRcdFx0XHRcdHZhbHVlID0gcGFyc2VJbnQodmFsdWUpLnRvRml4ZWQoKVxuXHRcdFx0XHRcblx0XHRcdFx0bGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRcblx0ZGVmaW5lQ3VzdG9tQ29sb3JQcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgbGF5ZXIpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6ID0+IHJldHVybiBAcHJvcHNbdmFyaWFibGVOYW1lXVxuXHRcdFx0c2V0OiAodmFsdWUpID0+XG5cdFx0XHRcdEBwcm9wc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVcblx0XHRcdFx0bGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0XG5cblx0YWRkQ29weUV2ZW50OiAodmFyaWFibGVOYW1lLCBsYXllcikgLT5cblx0XHRkbyAodmFyaWFibGVOYW1lLCBsYXllcikgPT5cblx0XHRcdGxheWVyLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0XHRAY29weUNvbnRlbnQoQFt2YXJpYWJsZU5hbWVdKVxuXHRcdFx0XHRAaGlnaGxpZ2h0KGxheWVyKVxuXG5cdGNvcHlDb250ZW50OiAoY29udGVudCkgPT5cblx0XHRzZWNyZXRCb3gudmFsdWUgPSBjb250ZW50XG5cdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRoaWdobGlnaHQ6IChsYXllcikgPT5cblx0XHRzdGFydEJvcmRlckNvbG9yID0gbGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ11cblx0XHRsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXSA9ICdyZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApJ1xuXHRcdHJlc2V0ID0gPT4gbGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSBzdGFydEJvcmRlckNvbG9yXG5cblx0XHRfLmRlbGF5KHJlc2V0LCAxMDApXG5cblxuXHRjbGVhclByb3BzOiA9PlxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEBwcm9wc1xuXHRcdFx0QFtrZXldID0gdW5kZWZpbmVkXG5cdFx0QHNldFRleHRTdHlsZXMoKVxuXG5cdHNldFRleHRTdHlsZXM6ICh2YWx1ZSkgPT5cblxuXHRcdGZvciBsYXllciBpbiBbXG5cdFx0XHRAZm9udExhYmVsLFxuXHRcdFx0QGZvbnRTaXplTGFiZWwsXG5cdFx0XHRAY29sb3JMYWJlbCxcblx0XHRcdEBsaW5lSGlnaHRMYWJlbCxcblx0XHRcdEBmb250RmFtaWx5VmFsdWVCb3gsIFxuXHRcdFx0QGNvbG9yVmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRTaXplVmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCwgXG5cdFx0XHRAbGluZUhlaWdodFZhbHVlQm94LCBcblx0XHRcdEBmb250U3R5bGVWYWx1ZUJveFxuXHRcdF1cblx0XHRcdGxheWVyLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGlmIHZhbHVlPyB0aGVuICcxJyBlbHNlICcwJ1xuXG5cblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMjI1xuXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG5cdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcblx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcblx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG5cdFxuXHRcbiMjI1xuXG5cbmNsYXNzIEdvdGNoYVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBzcGVjUGFuZWwgPSBuZXcgU3BlY1BhbmVsXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb2xvcjogJ3JnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWxlY3RlZENvbG9yOiAncmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6ICcjRkZGRkZGJ1xuXHRcdFx0Zm9udEZhbWlseTogJ01lbmxvJ1xuXHRcdFx0Zm9udFNpemU6ICcxMCdcblx0XHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDRcblx0XHRcdHBhZGRpbmc6IHt0b3A6IDEsIGJvdHRvbTogMSwgbGVmdDogMywgcmlnaHQ6IDN9XG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y29sb3I6IG9wdGlvbnMuY29sb3Jcblx0XHRcdHNlbGVjdGVkQ29sb3I6IG9wdGlvbnMuc2VsZWN0ZWRDb2xvclxuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6IG9wdGlvbnMuc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6IG9wdGlvbnMuZm9udEZhbWlseVxuXHRcdFx0Zm9udFNpemU6IG9wdGlvbnMuZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IG9wdGlvbnMuZm9udFdlaWdodFxuXHRcdFx0c2hhcGVzOiBbXVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBvcHRpb25zLmJvcmRlclJhZGl1c1xuXHRcdFx0cGFkZGluZzogb3B0aW9ucy5wYWRkaW5nXG5cdFx0XHRmb2N1c2VkRWxlbWVudDogdW5kZWZpbmVkXG5cdFx0XHRlbmFibGVkOiBmYWxzZVxuXHRcdFx0c2NyZWVuRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XHRsYXllcnM6IFtdXG5cdFx0XHRjb250YWluZXJzOiBbXVxuXHRcdFx0dGltZXI6IHVuZGVmaW5lZFxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQGNsaWNrSG92ZXJlZEVsZW1lbnQpXG5cblx0XHRAY29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckxheWVyIERldmljZVNjcmVlbicpWzBdXG5cdFx0QGNvbnRleHQuY2xhc3NMaXN0LmFkZCgnaG92ZXJDb250ZXh0JylcblxuXHRcdEBjb250ZXh0LmNoaWxkTm9kZXNbMl0uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblx0XHRAY29udGV4dC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIEB0cnlGb2N1cylcblx0XHRAY29udGV4dC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgQHVuZm9jdXMpXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLm9uIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cblx0dG9nZ2xlOiAoZXZlbnQpID0+XG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiYFwiXG5cdFx0XHRpZiBAb3BlbmVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIlxuXHRcdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRcdEBkZXNlbGVjdCgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzZWxlY3QoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRlbmFibGU6ID0+XG5cdFx0QG9wZW5lZCA9IHRydWVcblx0XHRAcmVzZXRMYXllcnMoKVxuXHRcdEBfY2FudmFzQ29sb3IgPSBDYW52YXMuYmFja2dyb3VuZENvbG9yXG5cdFx0QF9kZXZpY2VJbWFnZSA9IEZyYW1lci5EZXZpY2UuZGV2aWNlSW1hZ2Vcblx0XHRAX3N0YXJ0UG9zaXRpb24gPSBGcmFtZXIuRGV2aWNlLmhhbmRzLnhcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMuYW5pbWF0ZSBcblx0XHRcdHg6IEBfc3RhcnRQb3NpdGlvbiAtIDEyMiwgXG5cdFx0XHRvcHRpb25zOiB7dGltZTogLjR9XG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT4gXG5cdFx0XHRAZm9jdXMoKVxuXHRcdFx0QGVuYWJsZWQgPSB0cnVlXG5cblx0ZGlzYWJsZTogPT5cblx0XHRAdW5mb2N1cygpXG5cdFx0QGVuYWJsZWQgPSBmYWxzZVxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5hbmltYXRlIFxuXHRcdFx0eDogQF9zdGFydFBvc2l0aW9uLFxuXHRcdFx0b3B0aW9uczoge3RpbWU6IC4zNX1cblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PiBcblx0XHRcdEBvcGVuZWQgPSBmYWxzZVxuXG5cdHNob3dUcmFuc2l0aW9uOiAoeFBvcykgPT5cblx0XHRvcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHR4UG9zLFxuXHRcdFx0W0Bfc3RhcnRQb3NpdGlvbiAtIDU2LCBAX3N0YXJ0UG9zaXRpb24gLSAxMTJdLCBcblx0XHRcdFswLCAxXSwgXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0QHNwZWNQYW5lbC5wYW5lbC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eVxuXG5cdFx0ZmFjdG9yID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHR4UG9zLCBcblx0XHRcdFtAX3N0YXJ0UG9zaXRpb24sIEBfc3RhcnRQb3NpdGlvbiAtIDExMl0sXG5cdFx0XHRbMCwgMV0sXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IENvbG9yLm1peCBAX2NhbnZhc0NvbG9yLCdyZ2JhKDMwLCAzMCwgMzAsIDEuMDAwKScsIGZhY3RvclxuXG5cdGZpbmRMYXllcjogKGVsZW1lbnQpIC0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cblx0XHRpZiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnJhbWVyTGF5ZXInKVxuXHRcdFx0cmV0dXJuIGVsZW1lbnRcblxuXHRcdEBmaW5kTGF5ZXIoZWxlbWVudC5wYXJlbnROb2RlKVxuXG5cdHJlc2V0TGF5ZXJzOiA9PlxuXHRcdEBsYXllcnMgPSBbXVxuXG5cdFx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzXG5cdFx0XHRAbGF5ZXJzLnB1c2ggbGF5ZXJcblxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGVsZW1lbnQgPSBAZmluZExheWVyKGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoQGxheWVycywgWydfZWxlbWVudCcsIGVsZW1lbnRdKVxuXG5cdFx0cmV0dXJuIGxheWVyXG5cblx0Z2V0Q29tcG9uZW50RnJvbUxheWVyOiAobGF5ZXIsIG5hbWVzID0gW10pID0+XG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gbmFtZXMuam9pbignLCAnKVxuXG5cdFx0aWYgbm90IF8uaW5jbHVkZXMoW1wiTGF5ZXJcIiwgXCJUZXh0TGF5ZXJcIiwgXCJTY3JvbGxDb21wb25lbnRcIl0sIGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cdFx0XHRuYW1lcy5wdXNoKGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cblx0XHRAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudCwgbmFtZXMpXG5cblx0Y2xpY2tIb3ZlcmVkRWxlbWVudDogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblx0XHRyZXR1cm4gaWYgbm90IGV2ZW50XG5cblx0XHRyZXR1cm4gaWYgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnU3BlY0VsZW1lbnQnKVxuXG5cdFx0ZSA9IChldmVudD8udGFyZ2V0ID8gQGhvdmVyZWRFbGVtZW50KVxuXG5cdFx0bGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChlKVxuXHRcdHJldHVybiBpZiBub3QgbGF5ZXJcblxuXHRcdGVsZW1lbnQgPSBsYXllci5fZWxlbWVudFxuXG5cdFx0aWYgZWxlbWVudCBpcyBAc2VsZWN0ZWRFbGVtZW50XG5cdFx0XHRAZGVzZWxlY3QoZWxlbWVudCwgbGF5ZXIpXG5cdFx0ZWxzZVxuXHRcdFx0QHNlbGVjdChlbGVtZW50LCBsYXllcilcblxuXHRzZWxlY3Q6IChlbGVtZW50KSA9PlxuXHRcdEBzZWxlY3RlZEVsZW1lbnQgPSBlbGVtZW50ID8gQGhvdmVyZWRMYXllci5fZWxlbWVudFxuXHRcdFV0aWxzLmRlbGF5IDAsIEBmb2N1c1xuXG5cdGRlc2VsZWN0OiAoZWxlbWVudCkgPT5cblx0XHRAc2VsZWN0ZWRFbGVtZW50ID0gdW5kZWZpbmVkXG5cdFx0VXRpbHMuZGVsYXkgMCwgQGZvY3VzXG5cblx0Z2V0TGF5ZXJEaW1lbnNpb25zOiAobGF5ZXIpID0+XG5cdFx0ZnJhbWUgPSBVdGlscy5ib3VuZGluZ0ZyYW1lKGxheWVyKVxuXHRcdGZyYW1lID0gQGZyYW1pZnkoZnJhbWUpXG5cdFx0cmV0dXJuIGZyYW1lXG5cblx0ZnJhbWlmeTogKGZyYW1lKSAtPlxuXHRcdGZyYW1lLm1heFggPSBmcmFtZS54ICsgZnJhbWUud2lkdGhcblx0XHRmcmFtZS5taWRYID0gVXRpbHMucm91bmQoZnJhbWUueCArIGZyYW1lLndpZHRoLzIpXG5cblx0XHRmcmFtZS5tYXhZID0gZnJhbWUueSArIGZyYW1lLmhlaWdodFxuXHRcdGZyYW1lLm1pZFkgPSBVdGlscy5yb3VuZChmcmFtZS55ICsgZnJhbWUuaGVpZ2h0LzIpXG5cblx0XHRyZXR1cm4gZnJhbWVcblxuXHRnZXREaW1lbnNpb25zOiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRkID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0ZGltZW5zaW9ucyA9IHtcblx0XHRcdHg6IGQubGVmdFxuXHRcdFx0eTogZC50b3Bcblx0XHRcdHdpZHRoOiBkLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGQuaGVpZ2h0XG5cdFx0XHRtaWRYOiBkLmxlZnQgKyAoZC53aWR0aCAvIDIpXG5cdFx0XHRtaWRZOiBkLnRvcCArIChkLmhlaWdodCAvIDIpXG5cdFx0XHRtYXhYOiBkLmxlZnQgKyBkLndpZHRoXG5cdFx0XHRtYXhZOiBkLnRvcCArIGQuaGVpZ2h0XG5cdFx0XHRmcmFtZTogZFxuXHRcdH1cblxuXHRcdHJldHVybiBkaW1lbnNpb25zXG5cblx0bWFrZUxpbmU6IChwb2ludEEsIHBvaW50QiwgbGFiZWwgPSB0cnVlKSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGluZSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRpZiBwb2ludEFbMF0gaXMgcG9pbnRCWzBdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXSAtIDV9ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRBWzBdICsgNX0gI3twb2ludEFbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdIC0gNX0gI3twb2ludEJbMV19IEwgI3twb2ludEJbMF0gKyA1fSAje3BvaW50QlsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0ZWxzZSBpZiBwb2ludEFbMV0gaXMgcG9pbnRCWzFdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV0gLSA1fSBMICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSAtIDV9IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdG1ha2VMYWJlbDogKHgsIHksIHRleHQpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogeFxuXHRcdFx0eTogeVxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogQGZvbnRGYW1pbHlcblx0XHRcdCdmb250LXNpemUnOiBAZm9udFNpemVcblx0XHRcdCdmb250LXdlaWdodCc6IEBmb250V2VpZ2h0XG5cdFx0XHRmaWxsOiBAc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdHRleHQ6IE1hdGguZmxvb3IodGV4dCAvIEByYXRpbylcblxuXHRcdGwgPSBAZ2V0RGltZW5zaW9ucyhsYWJlbC5lbGVtZW50KVxuXG5cdFx0bGFiZWwueCA9IHggLSBsLndpZHRoIC8gMlxuXHRcdGxhYmVsLnkgPSB5ICsgbC5oZWlnaHQgLyA0IC0gMVxuXG5cdFx0Ym94ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBsYWJlbC54IC0gQHBhZGRpbmcubGVmdFxuXHRcdFx0eTogbGFiZWwueSAtIGwuaGVpZ2h0ICsgMVxuXHRcdFx0d2lkdGg6IGwud2lkdGggKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogbC5oZWlnaHQgKyBAcGFkZGluZy50b3AgKyBAcGFkZGluZy5ib3R0b20gKyAxXG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IG5ldyBDb2xvcihjb2xvcikuZGFya2VuKDQwKVxuXHRcdFx0IyBmaWxsOiAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGxhYmVsLnNob3coKVxuXG5cdG1ha2VCb3VuZGluZ1JlY3RzOiAocywgaCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblxuXHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKC4yKVxuXG5cdFx0aWYgQGhvdmVyZWRFbGVtZW50IGlzIEBzY3JlZW5FbGVtZW50XG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSgwKVxuXG5cdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoLjIpXG5cblx0XHRpZiBAc2VsZWN0ZWRFbGVtZW50IGlzIEBzY3JlZW5FbGVtZW50XG5cdFx0XHRzZWxlY3RGaWxsID0gbmV3IENvbG9yKEBzZWxlY3RlZENvbG9yKS5hbHBoYSgwKVxuXG5cdFx0aG92ZXJlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IGgueFxuXHRcdFx0eTogaC55XG5cdFx0XHR3aWR0aDogaC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBoLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdGZpbGw6IGhvdmVyRmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblxuXHRcdHNlbGVjdGVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogcy54XG5cdFx0XHR5OiBzLnlcblx0XHRcdHdpZHRoOiBzLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHMuaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBzZWxlY3RlZENvbG9yXG5cdFx0XHRmaWxsOiBzZWxlY3RGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRtYWtlRGFzaGVkTGluZXM6IChlLCBmLCBjb2xvciwgb2Zmc2V0KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZVxuXHRcdHJldHVybiBpZiBlIGlzIGZcblxuXHRcdGNvbG9yID0gbmV3IENvbG9yKGNvbG9yKS5hbHBoYSguOClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUueCwgeTogZi55fSxcblx0XHRcdHt4OiBlLngsIHk6IGYubWF4WX1cblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYueX0sXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLnl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS55fSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS5tYXhZfSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdHNob3dEaXN0YW5jZXM6IChzZWxlY3RlZCwgaG92ZXJlZCkgPT5cblxuXHRcdHMgPSBAZ2V0RGltZW5zaW9ucyhAc2VsZWN0ZWRFbGVtZW50KVxuXHRcdGggPSBAZ2V0RGltZW5zaW9ucyhAaG92ZXJlZEVsZW1lbnQpXG5cdFx0ZiA9IEBnZXREaW1lbnNpb25zKEBzY3JlZW5FbGVtZW50KVxuXG5cdFx0cmV0dXJuIGlmIG5vdCBzIG9yIG5vdCBoXG5cdFx0cmV0dXJuIGlmIEBob3ZlcmVkTGF5ZXI/LnZpc2libGUgaXMgZmFsc2Vcblx0XHRyZXR1cm4gaWYgQGhvdmVyZWRMYXllcj8ub3BhY2l0eSBpcyAwXG5cdFx0XG5cdFx0IyBAbWFrZURhc2hlZExpbmVzKGgsIGYsIEBjb2xvciwgMClcblx0XHRAbWFrZURhc2hlZExpbmVzKHMsIGYsIEBzZWxlY3RlZENvbG9yLCA1KVxuXG5cdFx0QG1ha2VCb3VuZGluZ1JlY3RzKHMsIGgpXG5cblx0XHRAcmF0aW8gPSBAc2NyZWVuRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAvIFNjcmVlbi53aWR0aFxuXG5cdFx0aWYgQHNlbGVjdGVkRWxlbWVudCBpcyBAaG92ZXJlZEVsZW1lbnRcblx0XHRcdGggPSBmXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBjb250YWlucyBob3ZlcmVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA8IGgueCBhbmQgcy5tYXhYID4gaC5tYXhYIGFuZCBzLnkgPCBoLnkgYW5kIHMubWF4WSA+IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhYIC0gaC5tYXhYKVxuXHRcdFx0bSA9IGgubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy5tYXhYIC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhZIC0gaC5tYXhZKVxuXHRcdFx0bSA9IGgubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIGhvdmVyZWQgZWxlbWVudCBjb250YWlucyBzZWxlY3RlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPiBoLnggYW5kIHMubWF4WCA8IGgubWF4WCBhbmQgcy55ID4gaC55IGFuZCBzLm1heFkgPCBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBoLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgcy5taWRZXSwgW2gubWF4WCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBzLm1heFkgKyA1XSwgW3MubWlkWCwgaC5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gaC54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGhvdmVyZWQgZWxlbWVudFxuXHRcdFxuXHRcdCMgdG9wXG5cblx0XHRpZiBzLnkgPiBoLm1heFlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgubWF4WSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55ID4gaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC55ICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHQjIGxlZnRcblxuXHRcdGlmIGgubWF4WCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC5tYXhYKVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBoLnggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgcmlnaHRcblxuXHRcdGlmIHMubWF4WCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBzLnggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgYm90dG9tXG5cblx0XHRpZiBzLm1heFkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLm1heFkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55IDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gcy55ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0c2V0UGFuZWxQcm9wZXJ0aWVzOiAoKSA9PlxuXHRcdGggPSBAaG92ZXJlZExheWVyXG5cdFx0aGUgPSBAaG92ZXJlZEVsZW1lbnRcblx0XHRzID0gQHNlbGVjdGVkTGF5ZXJcblx0XHRzZSA9IEBzZWxlY3RlZEVsZW1lbnRcblxuXHRcdGxheWVyID0gcyA/IGhcblxuXHRcdGlmIG5vdCBsYXllcj9cblx0XHRcdEBzcGVjUGFuZWwuY2xlYXJQcm9wcygpXG5cdFx0XHRyZXR1cm5cblxuXHRcdHByb3BzID0gbGF5ZXIucHJvcHNcblxuXHRcdF8uYXNzaWduIHByb3BzLFxuXHRcdFx0eDogbGF5ZXIuc2NyZWVuRnJhbWUueFxuXHRcdFx0eTogbGF5ZXIuc2NyZWVuRnJhbWUueVxuXHRcdFx0Y29tcG9uZW50TmFtZTogbGF5ZXIuY29uc3RydWN0b3IubmFtZVxuXHRcdFx0Y29tcG9uZW50TmFtZXM6IEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50KVxuXHRcdFx0cGFyZW50TmFtZTogbGF5ZXIucGFyZW50Py5uYW1lXG5cblx0XHRfLmFzc2lnbiBAc3BlY1BhbmVsLCBwcm9wc1xuXG5cdFx0QHNwZWNQYW5lbC5zZXRUZXh0U3R5bGVzKGxheWVyLmZvbnRGYW1pbHkpXG5cblx0dHJ5Rm9jdXM6IChldmVudCkgPT5cblx0XHRAY3VycmVudEhvdmVyZWQgPSBldmVudC50YXJnZXRcblx0XHRkbyAoZXZlbnQpID0+XG5cdFx0XHRVdGlscy5kZWxheSAuMDQsID0+XG5cdFx0XHRcdGlmIEBjdXJyZW50SG92ZXJlZCBpcyBldmVudC50YXJnZXRcblx0XHRcdFx0XHRAZm9jdXMoZXZlbnQpXG5cblx0Zm9jdXM6IChldmVudCkgPT5cblx0XHRpZiBAZW5hYmxlZCBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuIFxuXG5cdFx0QHVuZm9jdXMoKVxuXG5cdFx0QHNlbGVjdGVkRWxlbWVudCA/PSBAc2NyZWVuRWxlbWVudFxuXHRcdEBzZWxlY3RlZExheWVyID0gQGdldExheWVyRnJvbUVsZW1lbnQoQHNlbGVjdGVkRWxlbWVudClcblxuXHRcdGhvdmVyZWRFbGVtZW50ID0gKGV2ZW50Py50YXJnZXQgPyBAaG92ZXJlZEVsZW1lbnQgPyBAc2NyZWVuRWxlbWVudClcblxuXHRcdEBob3ZlcmVkTGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChob3ZlcmVkRWxlbWVudClcblxuXHRcdEBob3ZlcmVkRWxlbWVudCA9IEBob3ZlcmVkTGF5ZXI/Ll9lbGVtZW50ID8gRnJhbWVyLkRldmljZS5iYWNrZ3JvdW5kTGF5ZXJcblxuXHRcdEBzZXRQYW5lbFByb3BlcnRpZXMoKVxuXG5cdFx0QHNob3dEaXN0YW5jZXMoQHNlbGVjdGVkRWxlbWVudCwgQGhvdmVyZWRFbGVtZW50KVxuXG5cdHVuZm9jdXM6ICgpID0+XG5cdFx0Y3R4LnJlbW92ZUFsbCgpXG5cdFx0aWYgbm90IEBzZWxlY3RlZExheWVyIHRoZW4gQHNwZWNQYW5lbC5jbGVhclByb3BzKClcblxuXG5leHBvcnRzLmdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEY0EsSUFBQSxtT0FBQTtFQUFBOzs7O0FBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcEIsQ0FBQTs7QUFFQSxVQUFBLEdBQWE7O0FBQ2IsR0FBQSxHQUFNOztBQUVOLFNBQUEsR0FBWTs7QUFHWixLQUFLLENBQUMsU0FBTixDQUFnQixpdUJBQWhCOztBQXFEQTtBQUFBLEtBQUEscUNBQUE7O0VBQ0MsS0FBQSxHQUFRLE1BQU0sQ0FBQyxNQUFPLENBQUEsSUFBQTtFQUN0QixJQUFVLENBQUksS0FBZDtBQUFBLFdBQUE7O0VBRUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBekIsQ0FBNkIscUJBQTdCO0FBSkQ7O0FBa0JBLEtBQUEsR0FBUSxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2Qjs7QUFDUixLQUFLLENBQUMsRUFBTixHQUFXOztBQUNYLEtBQUEsR0FBUSxRQUFRLENBQUMsY0FBVCxDQUF3QiwyQkFBeEI7O0FBQ1IsS0FBSyxDQUFDLEtBQU4sQ0FB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
