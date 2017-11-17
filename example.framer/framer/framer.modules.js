require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var Fraplin, Label, SVGContext, SVGShape, SpecBox, SpecColorValueBox, SpecDivider, SpecElement, SpecLabel, SpecPanel, SpecValueBox, SpecWideValueBox, ctx, panel, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

svgContext = void 0;

ctx = void 0;

startOpen = false;

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(30, 30, 30, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n");

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
    this.frameLayer = new Layer({
      size: Screen.size,
      name: '.',
      visible: false
    });
    this.frameElement = this.frameLayer._element;
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


/*
	,        .       .
	|        |       |
	|    ,-: |-. ,-. |
	|    | | | | |-' |
	`--' `-` `-' `-' '
 */

Label = (function(superClass) {
  extend(Label, superClass);

  function Label(options) {
    var w;
    if (options == null) {
      options = {};
    }
    this.__constructor = true;
    _.assign(options, {
      name: '.',
      fontSize: 12,
      fontWeight: 500,
      color: '#777',
      fontFamily: 'Menlo'
    });
    _.defaults(options, {
      text: 'x',
      value: 0
    });
    w = options.width;
    delete options.width;
    Label.__super__.constructor.call(this, options);
    this.valueLayer = new TextLayer({
      parent: this.parent,
      name: '.',
      fontSize: this.fontSize,
      fontWeight: 500,
      color: '#333',
      fontFamily: this.fontFamily,
      x: this.x + w,
      y: this.y,
      text: '{value}'
    });
    delete this.__constructor;
    this.value = options.value;
  }

  Label.define("value", {
    get: function() {
      return this._value;
    },
    set: function(value) {
      if (this.__constructor) {
        return;
      }
      this._value = value;
      return this.valueLayer.template = value;
    }
  });

  return Label;

})(TextLayer);

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
        return this.valueLabel.element.textContent = value;
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
    var col0x, col1x, col2x, colorProps, i, j, len, len1, prop, props, row;
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
    this.githubIcon = document.createElement('a');
    this.githubIcon.href = "http://github.com/steveruizok";
    this.githubIcon.innerHTML = '<svg height="20px" width="20px" id="github_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>';
    panel.appendChild(this.githubIcon);
    this.twitterIcon = document.createElement('a');
    this.twitterIcon.href = "http://twitter.com/steveruizok";
    this.twitterIcon.innerHTML = '<svg height="28px" width="28px" id="twitter_logo" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>';
    panel.appendChild(this.twitterIcon);
    props = [['x', this.xValueBox], ['y', this.yValueBox], ['width', this.wValueBox], ['height', this.hValueBox], ['opacity', this.opacityValueBox, true], ['borderWidth', this.borderValueBox], ['borderRadius', this.radiusValueBox], ['shadowSpread', this.shadowSpreadValueBox], ['shadowX', this.shadowXValueBox], ['shadowY', this.shadowYValueBox], ['shadowBlur', this.shadowBlurValueBox], ['fontFamily', this.fontFamilyValueBox], ['fontSize', this.fontSizeValueBox], ['fontWeight', this.fontWeightValueBox], ['lineHeight', this.lineHeightValueBox], ['fontStyle', this.fontStyleValueBox], ['componentName', this.componentValueBox]];
    colorProps = [['backgroundColor', this.bgColorValueBox], ['borderColor', this.borderColorValueBox], ['shadowColor', this.shadowColorValueBox], ['color', this.colorValueBox]];
    for (i = 0, len = props.length; i < len; i++) {
      prop = props[i];
      this.defineCustomProperty(prop[0], prop[1], prop[2]);
      this.addCopyEvent(prop[0], prop[1]);
    }
    for (j = 0, len1 = colorProps.length; j < len1; j++) {
      prop = colorProps[j];
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
          if (value == null) {
            layer.value = '';
            return;
          }
          if (float) {
            if (value === '0') {
              layer.value = '';
              return;
            }
            layer.value = parseFloat(value != null ? value : '0').toFixed(2);
            return;
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
	 88888888b                            dP oo
	 88                                   88
	a88aaaa    88d888b. .d8888b. 88d888b. 88 dP 88d888b.
	 88        88'  `88 88'  `88 88'  `88 88 88 88'  `88
	 88        88       88.  .88 88.  .88 88 88 88    88
	 dP        dP       `88888P8 88Y888P' dP dP dP    dP
	                             88
	                             dP
 */

Fraplin = (function() {
  function Fraplin(options) {
    if (options == null) {
      options = {};
    }
    this.unfocus = bind(this.unfocus, this);
    this.focus = bind(this.focus, this);
    this.setPanelProperties = bind(this.setPanelProperties, this);
    this.makeBoundingRects = bind(this.makeBoundingRects, this);
    this.showDistances = bind(this.showDistances, this);
    this.makeLabel = bind(this.makeLabel, this);
    this.makeLine = bind(this.makeLine, this);
    this.getDimensions = bind(this.getDimensions, this);
    this.deselect = bind(this.deselect, this);
    this.select = bind(this.select, this);
    this.clickHoveredElement = bind(this.clickHoveredElement, this);
    this.getLayerFromElement = bind(this.getLayerFromElement, this);
    this.disable = bind(this.disable, this);
    this.enable = bind(this.enable, this);
    this.resetLayers = bind(this.resetLayers, this);
    this.toggle = bind(this.toggle, this);
    this.specPanel = new SpecPanel;
    _.defaults(options, {
      color: 'red',
      secondaryColor: 'white',
      fontFamily: 'Arial',
      fontSize: '10',
      fontWeight: '600',
      borderRadius: 4,
      padding: {
        top: 2,
        bottom: 2,
        left: 4,
        right: 4
      }
    });
    _.assign(this, {
      color: options.color,
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
      viewport: document.getElementsByClassName('DeviceComponentPort')[0],
      layers: []
    });
    document.addEventListener('keyup', this.toggle);
    document.addEventListener('click', this.clickHoveredElement);
    this.context = document.getElementsByClassName('framerLayer DeviceScreen')[0];
    this.context.classList.add('hoverContext');
    this.context.childNodes[2].classList.add('IgnorePointerEvents');
    this.context.addEventListener("mouseover", this.focus);
    this.context.addEventListener("mouseout", this.unfocus);
    Utils.insertCSS(".framerLayer { \n	pointer-events: all !important; \n	} \n\n.DeviceContent {\n	pointer-events: none !important; \n	}\n\n.DeviceBackground {\n	pointer-events: none !important; \n	}\n\n.DeviceHands {\n	pointer-events: none !important; \n	}\n\n.DeviceComponentPort {\n	pointer-events: none !important; \n}\n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}");
  }

  Fraplin.prototype.toggle = function(event) {
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
      if (this.hoveredElement === this.selectedElement) {
        this.deselect();
      } else {
        this.select();
      }
    }
  };

  Fraplin.prototype.resetLayers = function() {
    var i, layer, len, ref, results;
    this.layers = [];
    ref = Framer.CurrentContext._layers;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      results.push(this.layers.push(layer));
    }
    return results;
  };

  Fraplin.prototype.enable = function() {
    this.resetLayers();
    this.enabled = true;
    this.specPanel.panel.style.opacity = '1';
    return this.focus();
  };

  Fraplin.prototype.disable = function() {
    this.enabled = false;
    this.specPanel.panel.style.opacity = '0';
    return this.unfocus();
  };

  Fraplin.prototype.getLayerFromElement = function(element) {
    var layer, ref, ref1;
    if (element.classList.contains('framerLayer')) {
      layer = _.find(this.layers, ['_element', element]);
    } else {
      element = (ref = element.parentNode) != null ? (ref1 = ref.parentNode) != null ? ref1.parentNode : void 0 : void 0;
      layer = _.find(this.layers, ['_element', element]);
    }
    return layer;
  };

  Fraplin.prototype.clickHoveredElement = function(event) {
    if (!this.enabled) {
      return;
    }
    if (this.hoveredElement === this.selectedElement) {
      return this.deselect();
    } else {
      this.deselect();
      return Utils.delay(0, (function(_this) {
        return function() {
          return _this.select();
        };
      })(this));
    }
  };

  Fraplin.prototype.select = function(event) {
    this.selectedElement = this.hoveredElement;
    return this.focus();
  };

  Fraplin.prototype.deselect = function(event) {
    this.selectedElement = void 0;
    return this.focus();
  };

  Fraplin.prototype.getDimensions = function(element) {
    var d, dimensions;
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

  Fraplin.prototype.makeLine = function(pointA, pointB, label) {
    var capA, capB, line;
    if (label == null) {
      label = true;
    }
    line = new SVGShape({
      type: 'path',
      d: "M " + pointA[0] + " " + pointA[1] + " L " + pointB[0] + " " + pointB[1],
      stroke: this.color,
      'stroke-width': '1px'
    });
    if (pointA[0] === pointB[0]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + (pointA[0] - 4) + " " + pointA[1] + " L " + (pointA[0] + 5) + " " + pointA[1],
        stroke: this.color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + (pointB[0] - 4) + " " + pointB[1] + " L " + (pointB[0] + 5) + " " + pointB[1],
        stroke: this.color,
        'stroke-width': '1px'
      });
    } else if (pointA[1] === pointB[1]) {
      capA = new SVGShape({
        type: 'path',
        d: "M " + pointA[0] + " " + (pointA[1] - 4) + " L " + pointA[0] + " " + (pointA[1] + 5),
        stroke: this.color,
        'stroke-width': '1px'
      });
      return capB = new SVGShape({
        type: 'path',
        d: "M " + pointB[0] + " " + (pointB[1] - 4) + " L " + pointB[0] + " " + (pointB[1] + 5),
        stroke: this.color,
        'stroke-width': '1px'
      });
    }
  };

  Fraplin.prototype.makeLabel = function(x, y, text) {
    var box, l, label;
    label = new SVGShape({
      type: 'text',
      parent: ctx,
      x: x,
      y: y,
      'font-family': this.fontFamily,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      fill: this.secondaryColor,
      text: (text / this.ratio).toFixed()
    });
    l = this.getDimensions(label.element);
    label.x = x - l.width / 2;
    label.y = y + l.height / 4;
    box = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: label.x - this.padding.left,
      y: label.y - l.height,
      width: l.width + this.padding.left + this.padding.right,
      height: l.height + this.padding.top + this.padding.bottom,
      rx: this.borderRadius,
      ry: this.borderRadius,
      fill: this.color
    });
    return label.show();
  };

  Fraplin.prototype.showDistances = function(selected, hovered) {
    var d, h, m, s;
    s = this.getDimensions(this.selectedElement);
    h = this.getDimensions(this.hoveredElement);
    this.ratio = this.screenElement.getBoundingClientRect().width / Screen.width;
    if (this.selectedElement === this.hoveredElement) {
      h = this.getDimensions(this.screenElement);
    }
    if (s.x < h.x && s.maxX > h.maxX && s.y < h.y && s.maxY > h.maxY) {
      d = Math.abs(s.y - h.y).toFixed();
      m = s.y + d / 2;
      this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.maxX - h.maxX).toFixed();
      m = h.maxX + (d / 2);
      this.makeLine([h.maxX + 5, h.midY], [s.maxX - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      d = Math.abs(s.maxY - h.maxY).toFixed();
      m = h.maxY + (d / 2);
      this.makeLine([h.midX, h.maxY + 5], [h.midX, s.maxY - 4]);
      this.makeLabel(h.midX, m, d);
      d = Math.abs(s.x - h.x).toFixed();
      m = s.x + d / 2;
      this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
      this.makeLabel(m, h.midY, d);
      this.makeBoundingRects(s, h);
      return;
    }
    if (s.x > h.x && s.maxX < h.maxX && s.y > h.y && s.maxY < h.maxY) {
      d = Math.abs(h.y - s.y).toFixed();
      m = h.y + d / 2;
      this.makeLine([s.midX, h.y + 5], [s.midX, s.y - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.maxX - s.maxX).toFixed();
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, s.midY], [h.maxX - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      d = Math.abs(h.maxY - s.maxY).toFixed();
      m = s.maxY + (d / 2);
      this.makeLine([s.midX, s.maxY + 5], [s.midX, h.maxY - 4]);
      this.makeLabel(s.midX, m, d);
      d = Math.abs(h.x - s.x).toFixed();
      m = h.x + d / 2;
      this.makeLine([h.x + 5, s.midY], [s.x - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
      this.makeBoundingRects(s, h);
      return;
    }
    if (s.y > h.maxY) {
      d = Math.abs(s.y - h.maxY).toFixed();
      m = s.y - (d / 2);
      this.makeLine([s.midX, h.maxY + 5], [s.midX, s.y - 4]);
      this.makeLabel(s.midX, m, d);
    } else if (s.y > h.y) {
      d = Math.abs(s.y - h.y).toFixed();
      m = s.y - (d / 2);
      if (h.x < s.x) {
        this.makeLine([s.midX, h.y + 5], [s.midX, s.y - 4]);
        this.makeLabel(s.midX, m, d);
      } else {
        this.makeLine([s.midX, h.y + 5], [s.midX, s.y - 4]);
        this.makeLabel(s.midX, m, d);
      }
    }
    if (s.x > h.maxX) {
      d = Math.abs(s.x - h.maxX).toFixed();
      m = s.x - (d / 2);
      this.makeLine([h.maxX + 5, s.midY], [s.x - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
    } else if (s.x > h.x) {
      d = Math.abs(s.x - h.x).toFixed();
      m = s.x - (d / 2);
      if (s.y > h.maxY) {
        this.makeLine([h.x + 5, s.midY], [s.x - 4, s.midY]);
        this.makeLabel(m, s.midY, d);
      } else {
        this.makeLine([h.x + 5, s.midY], [s.x - 4, s.midY]);
        this.makeLabel(m, s.midY, d);
      }
    }
    if (s.maxX < h.x) {
      d = Math.abs(h.x - s.maxX).toFixed();
      m = s.maxX + (d / 2);
      this.makeLine([s.maxX + 5, s.midY], [h.x - 4, s.midY]);
      this.makeLabel(m, s.midY, d);
    } else if (s.x < h.x) {
      d = Math.abs(h.x - s.x).toFixed();
      m = s.x + (d / 2);
      if (s.y > h.maxY) {
        this.makeLine([s.x + 5, h.midY], [h.x - 4, h.midY]);
        this.makeLabel(m, h.midY, d);
      } else {
        this.makeLine([s.x + 5, s.midY], [h.x - 4, s.midY]);
        this.makeLabel(m, s.midY, d);
      }
    }
    if (s.maxY < h.y) {
      d = Math.abs(h.y - s.maxY).toFixed();
      m = s.maxY + (d / 2);
      this.makeLine([s.midX, s.maxY + 5], [s.midX, h.y - 4]);
      this.makeLabel(s.midX, m, d);
    } else if (s.y < h.y) {
      d = Math.abs(h.y - s.y).toFixed();
      m = s.y + (d / 2);
      if (h.x < s.x) {
        this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
        this.makeLabel(h.midX, m, d);
      } else {
        this.makeLine([h.midX, s.y + 5], [h.midX, h.y - 4]);
        this.makeLabel(h.midX, m, d);
      }
    }
    return this.makeBoundingRects(s, h);
  };

  Fraplin.prototype.makeBoundingRects = function(s, h) {
    var hoveredRect, selectedRect;
    hoveredRect = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: h.x + 1,
      y: h.y + 1,
      width: h.width - 2,
      height: h.height - 2,
      stroke: 'blue',
      fill: 'none',
      'stroke-width': '1px'
    });
    return selectedRect = new SVGShape({
      type: 'rect',
      parent: ctx,
      x: s.x + 1,
      y: s.y + 1,
      width: s.width - 2,
      height: s.height - 2,
      stroke: 'red',
      fill: 'none',
      'stroke-width': '1px'
    });
  };

  Fraplin.prototype.setPanelProperties = function() {
    var h, he, s, se;
    h = this.hoveredLayer;
    he = this.hoveredElement;
    s = this.selectedLayer;
    se = this.selectedElement;
    if ((s == null) && (h == null)) {
      this.specPanel.clearProps();
      return;
    }
    if ((h != null) && (s == null)) {
      _.assign(this.specPanel, {
        x: h.x,
        y: h.y,
        width: h.screenFrame.width,
        height: h.screenFrame.height,
        backgroundColor: h.backgroundColor,
        opacity: h.opacity,
        borderColor: h.borderColor,
        borderWidth: h.borderWidth,
        borderRadius: h.borderRadius,
        shadowColor: h.shadowColor,
        shadowSpread: h.shadowSpread,
        shadowX: h.shadowX,
        shadowY: h.shadowY,
        shadowBlur: h.shadowBlur,
        color: h.color,
        fontFamily: h.fontFamily,
        fontStyle: h.fontStyle,
        fontSize: h.fontSize,
        fontWeight: h.fontWeight,
        lineHeight: h.lineHeight,
        componentName: h.constructor.name
      });
      this.specPanel.setTextStyles(h.fontFamily);
    }
  };

  Fraplin.prototype.focus = function(event) {
    var ref;
    if (this.enabled === false) {
      return;
    }
    this.unfocus();
    if (this.selectedElement == null) {
      this.selectedElement = this.screenElement;
    }
    this.hoveredElement = (ref = event != null ? event.target : void 0) != null ? ref : this.hoveredElement;
    if (!this.hoveredElement) {
      return;
    }
    this.selectedLayer = this.getLayerFromElement(this.selectedElement);
    this.hoveredLayer = this.getLayerFromElement(this.hoveredElement);
    this.setPanelProperties();
    this.showDistances(this.selectedElement, this.hoveredElement);
    if (this.screenElement === this.hoveredElement) {

    }
  };

  Fraplin.prototype.unfocus = function(event) {
    return ctx.removeAll();
  };

  return Fraplin;

})();

exports.fraplin = new Fraplin;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuY3R4ID0gdW5kZWZpbmVkXG5cbnN0YXJ0T3BlbiA9IGZhbHNlXG5cblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDMwLCAzMCwgMzAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0fVxuXG5cdC5TcGVjTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0fVxuXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93Q29waWVkIHtcblx0XHQwJSB7IFxuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApO1xuXHRcdH1cblxuXHRcdDEwMCUge1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEuMDAwKTtcblx0XHR9XG5cdH1cblxuXHQuY29waWVkIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG5cdH1cblx0XG5cdCN0d2l0dGVyX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDRweDtcblx0XHRyaWdodDogNHB4O1xuXHR9XG5cblx0I2dpdGh1Yl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDM2cHg7XG5cdH1cblxuXG5cIlwiXCJcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4jIFx0IDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhcbiMgXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG4jIFx0IDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcbiMgXHRcbiMgXHRcblxuXG5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5wYW5lbC5pZCA9ICdTcGVjQ29udGFpbmVyJ1xudmlld0MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtRGVmYXVsdCcpXG5VdGlscy5kZWxheSAwLCA9PiB2aWV3Qy5hcHBlbmRDaGlsZChwYW5lbClcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiMgXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUCAgICA4ODg4ODhiYVxuIyBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICA4OCAgICBgOGJcbiMgXHRgWTg4ODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gZDg4ODhQIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gZFAuICAuZFBcbiMgXHQgICAgICBgOGIgODhvb29vZDggODgnICBgXCJcIiA4OCcgIGA4OCA4OG9vb29kOCAgIDg4ICAgIDg4ICAgYDhiLiA4OCcgIGA4OCAgYDhiZDgnXG4jIFx0ZDgnICAgLjhQIDg4LiAgLi4uIDg4LiAgLi4uIDg4ICAgICAgIDg4LiAgLi4uICAgODggICAgODggICAgLjg4IDg4LiAgLjg4ICAuZDg4Yi5cbiMgXHQgWTg4ODg4UCAgYDg4ODg4UCcgYDg4ODg4UCcgZFAgICAgICAgYDg4ODg4UCcgICBkUCAgICA4ODg4ODg4OFAgYDg4ODg4UCcgZFAnICBgZFBcbiMgXHRcbiMgXHRcblxuc2VjcmV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWNyZXRCb3gpXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAjIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICMgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICMgXHRgWTg4ODg4Yi4gODggICAgLjhQIDg4ICAgICAgICAgICA4OCAgICAgICAgLmQ4ODg4Yi4gODhkOGIuZDhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiBkODg4OFAgLmQ4ODg4Yi5cbiAjIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIyBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICMgXHQgWTg4ODg4UCAgODg4ODg4JyAgICBgODg4ODgnICAgICAgWTg4ODg4UCcgYDg4ODg4UCcgZFAgIGRQICBkUCA4OFk4ODhQJyBgODg4ODhQJyBkUCAgICBkUCBgODg4ODhQJyBkUCAgICBkUCAgIGRQICAgYDg4ODg4UCdcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAjIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuXG4jIyNcblx0ICwtLiAgLiAgICwgICwtLiAgLC0uICAgICAgICAgLiAgICAgICAgICAgLlxuXHQoICAgYCB8ICAvICAvICAgIC8gICAgICAgICAgICB8ICAgICAgICAgICB8XG5cdCBgLS4gIHwgLyAgIHwgLS4gfCAgICAsLS4gOy0uIHwtICAsLS4gLiAsIHwtXG5cdC4gICApIHwvICAgIFxcICB8IFxcICAgIHwgfCB8IHwgfCAgIHwtJyAgWCAgfFxuXHQgYC0nICAnICAgICAgYC0nICBgLScgYC0nICcgJyBgLScgYC0nICcgYCBgLSdcblx0XG4jIyNcblxuXG5jbGFzcyBTVkdDb250ZXh0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBzaGFwZXMgPSBbXVxuXG5cdFx0c3ZnQ29udGV4dCA9IEBcblxuXHRcdCMgbmFtZXNwYWNlXG5cdFx0c3ZnTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcblx0XHRcblx0XHQjIHNldCBhdHRyaWJ1dGVzIFxuXHRcdHNldEF0dHJpYnV0ZXMgPSAoZWxlbWVudCwgYXR0cmlidXRlcyA9IHt9KSAtPlxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdFx0QGZyYW1lTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdHZpc2libGU6IGZhbHNlXG5cblx0XHRAZnJhbWVFbGVtZW50ID0gQGZyYW1lTGF5ZXIuX2VsZW1lbnRcblxuXHRcdEBsRnJhbWUgPSBAZnJhbWVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XG5cdFx0Y29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGcmFtZXJDb250ZXh0Um9vdC1Ub3VjaEVtdWxhdG9yJylcblx0XHRjb250ZXh0LmFwcGVuZENoaWxkKEBzdmcpXG5cblx0XHRAc2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckNvbnRleHQnKVswXVxuXHRcdHNGcmFtZSA9IEBzY3JlZW5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdGFkZFNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHNoYXBlcy5wdXNoKHNoYXBlKVxuXHRcdEBzaG93U2hhcGUoc2hhcGUpXG5cdFx0XG5cdHJlbW92ZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QGhpZGVTaGFwZShzaGFwZSlcblx0XHRfLnB1bGwoQHNoYXBlcywgc2hhcGUpXG5cdFx0XG5cdGhpZGVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XG5cdHNob3dTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRcblx0YWRkRGVmOiAoZGVmKSAtPlxuXHRcdEBzdmdEZWZzLmFwcGVuZENoaWxkKGRlZilcblxuXHRyZW1vdmVBbGw6ID0+XG5cdFx0Zm9yIHNoYXBlIGluIEBzaGFwZXNcblx0XHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRAc2hhcGVzID0gW11cblxuXG4jIyNcblx0ICwtLiAgLiAgICwgICwtLiAgLC0uICAuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuIDstLlxuXHQoICAgYCB8ICAvICAvICAgICggICBgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgfCAgKVxuXHQgYC0uICB8IC8gICB8IC0uICBgLS4gIHwtLiAsLTogOy0uICwtLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsLXwgfC0nXG5cdC4gICApIHwvICAgIFxcICB8IC4gICApIHwgfCB8IHwgfCB8IHwtJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHwgfFxuXHQgYC0nICAnICAgICAgYC0nICBgLScgICcgJyBgLWAgfC0nIGAtJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgLScgJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU1ZHU2hhcGVcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge3R5cGU6ICdjaXJjbGUnfSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAcGFyZW50ID0gc3ZnQ29udGV4dFxuXHRcdFxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuXHRcdFx0XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcblx0XHRcdG9wdGlvbnMudHlwZVxuXHRcdFx0KVxuXG5cdFx0QHNldEN1c3RvbVByb3BlcnR5KCd0ZXh0JywgJ3RleHRDb250ZW50JywgJ3RleHRDb250ZW50Jywgb3B0aW9ucy50ZXh0KVxuXHRcdFx0XHRcblx0XHQjIGFzc2lnbiBhdHRyaWJ1dGVzIHNldCBieSBvcHRpb25zXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb3B0aW9uc1xuXHRcdFx0QHNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdFx0QHBhcmVudC5hZGRTaGFwZShAKVxuXHRcdFxuXHRcdEBzaG93KClcblx0XHRcdFxuXHRzZXRBdHRyaWJ1dGU6IChrZXksIHZhbHVlKSA9PlxuXHRcdHJldHVybiBpZiBrZXkgaXMgJ3RleHQnXG5cdFx0aWYgbm90IEBba2V5XT9cblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdGdldDogPT5cblx0XHRcdFx0XHRyZXR1cm4gQGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSlcblx0XHRcdFx0c2V0OiAodmFsdWUpID0+IFxuXHRcdFx0XHRcdEBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXHRcdFxuXHRcdEBba2V5XSA9IHZhbHVlXG5cdFxuXHRzZXRDdXN0b21Qcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgcmV0dXJuVmFsdWUsIHNldFZhbHVlLCBzdGFydFZhbHVlKSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiAtPlxuXHRcdFx0XHRyZXR1cm4gcmV0dXJuVmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAZWxlbWVudFtzZXRWYWx1ZV0gPSB2YWx1ZVxuXG5cdFx0QFt2YXJpYWJsZU5hbWVdID0gc3RhcnRWYWx1ZVxuXG5cdGhpZGU6IC0+IFxuXHRcdEBwYXJlbnQuaGlkZVNoYXBlKEApXG5cdFxuXHRzaG93OiAtPiBcblx0XHRAcGFyZW50LnNob3dTaGFwZShAKVxuXHRcdFxuXHRyZW1vdmU6IC0+XG5cdFx0QHBhcmVudC5yZW1vdmVTaGFwZShAKVxuXG4jIyNcblx0LCAgICAgICAgLiAgICAgICAuXG5cdHwgICAgICAgIHwgICAgICAgfFxuXHR8ICAgICwtOiB8LS4gLC0uIHxcblx0fCAgICB8IHwgfCB8IHwtJyB8XG5cdGAtLScgYC1gIGAtJyBgLScgJ1xuXHRcbiMjI1xuXG5cbmNsYXNzIExhYmVsIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiAnIzc3Nydcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRleHQ6ICd4J1xuXHRcdFx0dmFsdWU6IDBcblxuXHRcdHcgPSBvcHRpb25zLndpZHRoXG5cdFx0ZGVsZXRlIG9wdGlvbnMud2lkdGhcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEB2YWx1ZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAcGFyZW50XG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRTaXplOiBAZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6ICcjMzMzJ1xuXHRcdFx0Zm9udEZhbWlseTogQGZvbnRGYW1pbHlcblx0XHRcdHg6IEB4ICsgd1xuXHRcdFx0eTogQHlcblx0XHRcdHRleHQ6ICd7dmFsdWV9J1xuXG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlXG5cdFx0XG5cblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0cmV0dXJuIGlmIEBfX2NvbnN0cnVjdG9yXG5cdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdEB2YWx1ZUxheWVyLnRlbXBsYXRlID0gdmFsdWVcblxuXG5jdHggPSBuZXcgU1ZHQ29udGV4dFxuXG5cblxuICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuIyBcdCA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyBcdCA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODggICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4jIFx0IDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCAgICA4OCAgICAgICAgODgnICBgODggODgnYDg4J2A4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGA4OCAgIDg4ICAgWThvb29vby5cbiMgXHQgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuIyBcdCBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4jIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIyBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblxuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS0uIC4gICAgICAgICAgICAgICAgICAgLlxuXHQoICAgYCAgICAgICAgICAgICB8ICAgIHwgICAgICAgICAgICAgICAgICAgfFxuXHQgYC0uICA7LS4gLC0uICwtLiB8LSAgIHwgLC0uIDstLi0uICwtLiA7LS4gfC1cblx0LiAgICkgfCB8IHwtJyB8ICAgfCAgICB8IHwtJyB8IHwgfCB8LScgfCB8IHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0tJyAnIGAtJyAnICcgJyBgLScgJyAnIGAtJ1xuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKGNsYXNzTmFtZSwgb3B0aW9ucyA9IHt9LCB0ZXh0KSAtPlxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkIGNsYXNzTmFtZVxuXG5cdFx0Xy5hc3NpZ24gQGVsZW1lbnQuc3R5bGUsIG9wdGlvbnNcblxuXHRcdHBhbmVsLmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsICAgICAgICAuICAgICAgIC5cblx0KCAgIGAgICAgICAgICAgICAgfCAgICAgICAgfCAgICAgICB8XG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgICAgLC06IHwtLiAsLS4gfFxuXHQuICAgKSB8IHwgfC0nIHwgICB8ICAgIHwgfCB8IHwgfC0nIHxcblx0IGAtJyAgfC0nIGAtJyBgLScgYC0tJyBgLWAgYC0nIGAtJyAnXG5cdCAgICAgICdcbiMjI1xuXG5cbmNsYXNzIFNwZWNMYWJlbCBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICdub25lJ1xuXHRcdFx0J2ZvbnQtZmFtaWx5JzogJ0hlbHZldGljYSBOZXVlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcxZW0nXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnNDAwJ1xuXHRcdFx0J2NvbG9yJzogJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgJ1NwZWNMYWJlbCcsIG9wdGlvbnNcblxuXHRcdEB0ZXh0TGF5ZXIgPSBuZXcgU3BlY0VsZW1lbnQgJ1NwZWNMYWJlbCcsXG5cdFx0XHQnZm9udC1mYW1pbHknOiBvcHRpb25zWydmb250LWZhbWlseSddID8gJ0hlbHZldGljYSBOZXVlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6IG9wdGlvbnNbJ2ZvbnQtc2l6ZSddID8gJzFlbSdcblx0XHRcdCdmb250LXdlaWdodCc6IG9wdGlvbnNbJ2ZvbnQtd2VpZ2h0J10gPyAnNTAwJ1xuXHRcdFx0J2NvbG9yJzogb3B0aW9uc1snY29sb3InXSA/ICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEuMDAwKSdcblx0XHRcdCdsZWZ0Jzogb3B0aW9ucy5sZWZ0XG5cdFx0XHQncmlnaHQnOiBvcHRpb25zLnJpZ2h0XG5cblx0XHRAZWxlbWVudC5hcHBlbmRDaGlsZCBAdGV4dExheWVyLmVsZW1lbnRcblxuXHRcdG9wdGlvbnMucGFyZW50Py5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd0ZXh0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEB0ZXh0TGF5ZXIuZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+IEB0ZXh0TGF5ZXIuZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cblx0XHRAdGV4dCA9IG9wdGlvbnMudGV4dCA/ICcnXG5cbiMjI1xuXHQgLC0uICAgICAgICAgICAgICAsLS4gICAgICAgICAgICAuXG5cdCggICBgICAgICAgICAgICAgIHwgIFxcIG8gICAgIG8gICB8XG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgIHwgLiAuICwgLiAsLXwgLC0uIDstLlxuXHQuICAgKSB8IHwgfC0nIHwgICB8ICAvIHwgfC8gIHwgfCB8IHwtJyB8XG5cdCBgLScgIHwtJyBgLScgYC0nIGAtJyAgJyAnICAgJyBgLScgYC0nICdcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY0RpdmlkZXIgZXh0ZW5kcyBTcGVjRWxlbWVudFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2xlZnQnOiAnOHB4J1xuXHRcdFx0J3dpZHRoJzogJzIwOHB4J1xuXHRcdFx0J2hlaWdodCc6ICcxcHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICcjMDAwJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXG5cdFx0c3VwZXIgJ1NwZWNEaXZpZGVyJywgb3B0aW9uc1xuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLC0uXG5cdCggICBgICAgICAgICAgICAgIHwgIClcblx0IGAtLiAgOy0uICwtLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwgICkgfCB8ICBYXG5cdCBgLScgIHwtJyBgLScgYC0nIGAtJyAgYC0nICcgYFxuXHQgICAgICAnXG4jIyNcblxuXG5jbGFzcyBTcGVjQm94IGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IHVuZGVmaW5lZFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnbGVmdCc6ICc5NnB4J1xuXHRcdFx0J3dpZHRoJzogJzY0cHgnXG5cdFx0XHQnaGVpZ2h0JzogJzI0cHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblx0XHRcdCdib3gtc2hhZG93JzogJ2luc2V0IDBweCAwcHggMHB4IDRweCByZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblxuXHRcdHN1cGVyICdTcGVjTGFiZWwnLCBvcHRpb25zXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICAsLS4gICAgIC4gICAgICAgICAuICAgLCAgICAgLiAgICAgICAgICwtLlxuXHQoICAgYCAgICAgICAgICAgICAvICAgICAgICB8ICAgICAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgICAgLC0uIHwgLC0uIDstLiB8IC8gICAsLTogfCAuIC4gLC0uIHwtPCAgLC0uIC4gLFxuXHQuICAgKSB8IHwgfC0nIHwgICBcXCAgICB8IHwgfCB8IHwgfCAgIHwvICAgIHwgfCB8IHwgfCB8LScgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgIGAtJyBgLScgJyBgLScgJyAgICcgICAgIGAtYCAnIGAtYCBgLScgYC0nICBgLScgJyBgXG5cdCAgICAgICdcbiMjI1xuXG5jbGFzcyBTcGVjQ29sb3JWYWx1ZUJveCBleHRlbmRzIFNwZWNCb3hcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzk2cHgnXG5cdFx0XHQnd2lkdGgnOiAnNjRweCdcblx0XHRcdCdoZWlnaHQnOiAnMjRweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2JveC1zaGFkb3cnOiAnaW5zZXQgMHB4IDBweCAwcHggNHB4IHJnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEBlbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2YWx1ZSA/ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblxuXHRcdEB2YWx1ZSA9IG9wdGlvbnMudmFsdWVcblxuXG4jIyNcblx0ICwtLiAgICAgICAgICAgICAgLiAgICwgICAgIC4gICAgICAgICAsLS5cblx0KCAgIGAgICAgICAgICAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgLyAgICwtOiB8IC4gLiAsLS4gfC08ICAsLS4gLiAsXG5cdC4gICApIHwgfCB8LScgfCAgIHwvICAgIHwgfCB8IHwgfCB8LScgfCAgKSB8IHwgIFhcblx0IGAtJyAgfC0nIGAtJyBgLScgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY1ZhbHVlQm94IGV4dGVuZHMgU3BlY0JveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdmb250LWZhbWlseSc6ICdIZWx2ZXRpY2EgTmV1ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjQyZW0nXG5cdFx0XHQncGFkZGluZy10b3AnOiAnNXB4J1xuXHRcdFx0J3BhZGRpbmctbGVmdCc6ICc4cHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2xpbmUtaGVpZ2h0JzogJzFlbSdcblx0XHRcdCdvdmVyZmxvdyc6ICdoaWRkZW4nXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAdmFsdWVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJzFlbSdcblx0XHRcdCdsZWZ0JzogJzZweCdcblx0XHRcdCd0b3AnOiAnNnB4J1xuXHRcdFx0J2NvbG9yJzogJyNGRkYnXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnNTAwJ1xuXG5cdFx0QHVuaXRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdCA/ICcnXG5cdFx0XHRwYXJlbnQ6IEBlbGVtZW50XG5cdFx0XHQnZm9udC1zaXplJzogJy45ZW0nXG5cdFx0XHQncmlnaHQnOiAnMnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQndGV4dC1hbGlnbic6ICdyaWdodCdcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEB2YWx1ZUxhYmVsLmVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cdFx0QHZhbHVlID0gb3B0aW9ucy52YWx1ZSA/ICcnXG5cblxuIyMjXG5cdCAsLS4gICAgICAgICAgICAgICwgICAuICAgICAuICAgICAuICAgLCAgICAgLiAgICAgICAgICwtLlxuXHQoICAgYCAgICAgICAgICAgICB8IC4gfCBvICAgfCAgICAgfCAgLyAgICAgIHwgICAgICAgICB8ICApXG5cdCBgLS4gIDstLiAsLS4gLC0uIHwgKSApIC4gLC18ICwtLiB8IC8gICAsLTogfCAuIC4gLC0uIHwtPCAgLC0uIC4gLFxuXHQuICAgKSB8IHwgfC0nIHwgICB8L3wvICB8IHwgfCB8LScgfC8gICAgfCB8IHwgfCB8IHwtJyB8ICApIHwgfCAgWFxuXHQgYC0nICB8LScgYC0nIGAtJyAnICcgICAnIGAtJyBgLScgJyAgICAgYC1gICcgYC1gIGAtJyBgLScgIGAtJyAnIGBcblx0ICAgICAgJ1xuIyMjXG5cblxuY2xhc3MgU3BlY1dpZGVWYWx1ZUJveCBleHRlbmRzIFNwZWNWYWx1ZUJveFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAZWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMzZweCdcblxuXG4gIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuIyMjXG5cdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG5cdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuXHQgICAgICBgOGIgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG5cdGQ4JyAgIC44UCA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC4uLiAgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG5cdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG5cdCAgICAgICAgICA4OFxuXHQgICAgICAgICAgZFBcbiMjI1xuXG5cbmNsYXNzIFNwZWNQYW5lbFxuXHRjb25zdHJ1Y3RvcjogLT5cblxuXHRcdEBwYW5lbCA9IHBhbmVsXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdwcm9wcycsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiBAX3Byb3BzXG5cdFx0XHRzZXQ6IChvYmopIC0+XG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdFx0XHRcdGlmIF8uaGFzKEBwcm9wcywga2V5KVxuXHRcdFx0XHRcdFx0QHByb3BzW2tleV0gPSB2YWx1ZVxuXG5cdFx0QHBhbmVsLnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblxuXHRcdGNvbDB4ID0gJzRweCdcblx0XHRjb2wxeCA9ICc4NHB4J1xuXHRcdGNvbDJ4ID0gJzE1NnB4J1xuXG5cdFx0cm93ID0gKG51bSwgb2Zmc2V0ID0gMCkgLT4gcmV0dXJuICgxNiArICgzNSAqIG51bSkgLSBvZmZzZXQpICsgJ3B4J1xuXG5cdFx0IyBwb3NcblxuXHRcdEBwb3NMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDAsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1Bvc2l0aW9uJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEB4VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygwKVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcyNTgnXG5cdFx0XHR1bml0OiAneCdcblxuXHRcdEB5VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygwKVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcyNTgnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgc2l6ZVxuXG5cdFx0QHNpemVMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDEsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1NpemUnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHdWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0QGhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICdoJ1xuXG5cdFx0IyBiYWNrZ3JvdW5kXG5cblx0XHRAYmdDb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMiwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnQmFja2dyb3VuZCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAYmdDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygyKVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgb3BhY2l0eVxuXG5cdFx0QG9wYWNpdHlMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDMsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ09wYWNpdHknXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QG9wYWNpdHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDMpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzEuMCdcblx0XHRcdHVuaXQ6ICdhJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjEgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDQuMjUsIDIpXG5cblx0XHQjIGJvcmRlclxuXG5cdFx0QGJvcmRlckNvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdyg0Ljc1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGJvcmRlckNvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDQuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0QGJvcmRlclZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMSdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyByYWRpdXNcblxuXHRcdEByYWRpdXNMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDUuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1JhZGl1cydcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAcmFkaXVzVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg1Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXG5cdFx0IyBzaGFkb3dcblxuXHRcdEBzaGFkb3dMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDYuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1NoYWRvdydcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAc2hhZG93Q29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNi43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAc2hhZG93U3ByZWFkVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2Ljc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3MnXG5cblx0XHRAc2hhZG93WFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNoYWRvd1lWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDcuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzAnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdEBzaGFkb3dCbHVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg4Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdibHVyJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDEwLCAyKVxuXG5cdFx0IyBGb250XG5cblx0XHRAZm9udExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTAuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGZvbnRGYW1pbHlWYWx1ZUJveCA9IG5ldyBTcGVjV2lkZVZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMC4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHQjIENvbG9yXG5cblx0XHRAY29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDExLjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb2xvcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAY29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTEuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0QGZvbnRTdHlsZVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTEuMjUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXG5cdFx0IyBGb250IFNpemVcblxuXHRcdEBmb250U2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTIuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ1NpemUnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGZvbnRTaXplVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMi4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBmb250V2VpZ2h0VmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMi4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR1bml0OiAndydcblxuXHRcdCMgTGluZSBIZWlnaHRcblxuXHRcdEBsaW5lSGlnaHRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDEzLjI1LCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdIZWlnaHQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGxpbmVIZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEzLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdsaCdcblxuXHRcdCMgRGl2aWRlciAjIC0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAc3BlY0RpdmlkZXIyID0gbmV3IFNwZWNEaXZpZGVyXG5cdFx0XHR0b3A6IHJvdygxNC41LCAyKVxuXHRcdFxuXHRcdCMgQ29tcG9uZW50ICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBjb21wb25lbnRMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QGNvbXBvbmVudFZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDE1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXG5cdFx0IyBMaW5rc1xuXG5cdFx0QGdpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAZ2l0aHViSWNvbi5ocmVmID0gXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0QGdpdGh1Ykljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjBweFwiIHdpZHRoPVwiMjBweFwiIGlkPVwiZ2l0aHViX2xvZ29cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIj48cGF0aCBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiBkPVwiTTUxMiAwQzIyOS4yNSAwIDAgMjI5LjI1IDAgNTEyYzAgMjI2LjI1IDE0Ni42ODggNDE4LjEyNSAzNTAuMTU2IDQ4NS44MTIgMjUuNTk0IDQuNjg4IDM0LjkzOC0xMS4xMjUgMzQuOTM4LTI0LjYyNSAwLTEyLjE4OC0wLjQ2OS01Mi41NjItMC43MTktOTUuMzEyQzI0MiA5MDguODEyIDIxMS45MDYgODE3LjUgMjExLjkwNiA4MTcuNWMtMjMuMzEyLTU5LjEyNS01Ni44NDQtNzQuODc1LTU2Ljg0NC03NC44NzUtNDYuNTMxLTMxLjc1IDMuNTMtMzEuMTI1IDMuNTMtMzEuMTI1IDUxLjQwNiAzLjU2MiA3OC40NyA1Mi43NSA3OC40NyA1Mi43NSA0NS42ODggNzguMjUgMTE5Ljg3NSA1NS42MjUgMTQ5IDQyLjUgNC42NTQtMzMgMTcuOTA0LTU1LjYyNSAzMi41LTY4LjM3NUMzMDQuOTA2IDcyNS40MzggMTg1LjM0NCA2ODEuNSAxODUuMzQ0IDQ4NS4zMTJjMC01NS45MzggMTkuOTY5LTEwMS41NjIgNTIuNjU2LTEzNy40MDYtNS4yMTktMTMtMjIuODQ0LTY1LjA5NCA1LjA2Mi0xMzUuNTYyIDAgMCA0Mi45MzgtMTMuNzUgMTQwLjgxMiA1Mi41IDQwLjgxMi0xMS40MDYgODQuNTk0LTE3LjAzMSAxMjguMTI1LTE3LjIxOSA0My41IDAuMTg4IDg3LjMxMiA1Ljg3NSAxMjguMTg4IDE3LjI4MSA5Ny42ODgtNjYuMzEyIDE0MC42ODgtNTIuNSAxNDAuNjg4LTUyLjUgMjggNzAuNTMxIDEwLjM3NSAxMjIuNTYyIDUuMTI1IDEzNS41IDMyLjgxMiAzNS44NDQgNTIuNjI1IDgxLjQ2OSA1Mi42MjUgMTM3LjQwNiAwIDE5Ni42ODgtMTE5Ljc1IDI0MC0yMzMuODEyIDI1Mi42ODggMTguNDM4IDE1Ljg3NSAzNC43NSA0NyAzNC43NSA5NC43NSAwIDY4LjQzOC0wLjY4OCAxMjMuNjI1LTAuNjg4IDE0MC41IDAgMTMuNjI1IDkuMzEyIDI5LjU2MiAzNS4yNSAyNC41NjJDODc3LjQzOCA5MzAgMTAyNCA3MzguMTI1IDEwMjQgNTEyIDEwMjQgMjI5LjI1IDc5NC43NSAwIDUxMiAwelwiIC8+PC9zdmc+J1xuXHRcdHBhbmVsLmFwcGVuZENoaWxkKEBnaXRodWJJY29uKVxuXG5cdFx0QHR3aXR0ZXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0QHR3aXR0ZXJJY29uLmhyZWYgPSBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0QHR3aXR0ZXJJY29uLmlubmVySFRNTCA9ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblx0XHRwYW5lbC5hcHBlbmRDaGlsZChAdHdpdHRlckljb24pXG5cblxuXHRcdCMgLS0tLVxuXG5cdFx0IyBwcm9wZXJ0aWVzXG5cblx0XHRwcm9wcyA9IFtcblx0XHRcdFsneCcsIEB4VmFsdWVCb3hdLFxuXHRcdFx0Wyd5JywgQHlWYWx1ZUJveF0sXG5cdFx0XHRbJ3dpZHRoJywgQHdWYWx1ZUJveF1cblx0XHRcdFsnaGVpZ2h0JywgQGhWYWx1ZUJveF1cblx0XHRcdFsnb3BhY2l0eScsIEBvcGFjaXR5VmFsdWVCb3gsIHRydWVdXG5cdFx0XHRbJ2JvcmRlcldpZHRoJywgQGJvcmRlclZhbHVlQm94XVxuXHRcdFx0Wydib3JkZXJSYWRpdXMnLCBAcmFkaXVzVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1NwcmVhZCcsIEBzaGFkb3dTcHJlYWRWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WCcsIEBzaGFkb3dYVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd1knLCBAc2hhZG93WVZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dCbHVyJywgQHNoYWRvd0JsdXJWYWx1ZUJveF1cblx0XHRcdFsnZm9udEZhbWlseScsIEBmb250RmFtaWx5VmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRTaXplJywgQGZvbnRTaXplVmFsdWVCb3hdXG5cdFx0XHRbJ2ZvbnRXZWlnaHQnLCBAZm9udFdlaWdodFZhbHVlQm94XVxuXHRcdFx0WydsaW5lSGVpZ2h0JywgQGxpbmVIZWlnaHRWYWx1ZUJveF1cblx0XHRcdFsnZm9udFN0eWxlJywgQGZvbnRTdHlsZVZhbHVlQm94XVxuXHRcdFx0Wydjb21wb25lbnROYW1lJywgQGNvbXBvbmVudFZhbHVlQm94XVxuXHRcdF1cblxuXHRcdGNvbG9yUHJvcHMgPSBbXG5cdFx0XHRbJ2JhY2tncm91bmRDb2xvcicsIEBiZ0NvbG9yVmFsdWVCb3hdXG5cdFx0XHRbJ2JvcmRlckNvbG9yJywgQGJvcmRlckNvbG9yVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd0NvbG9yJywgQHNoYWRvd0NvbG9yVmFsdWVCb3hdXG5cdFx0XHRbJ2NvbG9yJywgQGNvbG9yVmFsdWVCb3hdXG5cdFx0XVxuXG5cdFx0Zm9yIHByb3AgaW4gcHJvcHNcblx0XHRcdEBkZWZpbmVDdXN0b21Qcm9wZXJ0eShwcm9wWzBdLCBwcm9wWzFdLCBwcm9wWzJdKVxuXHRcdFx0QGFkZENvcHlFdmVudChwcm9wWzBdLCBwcm9wWzFdKVxuXG5cdFx0Zm9yIHByb3AgaW4gY29sb3JQcm9wc1xuXHRcdFx0QGRlZmluZUN1c3RvbUNvbG9yUHJvcGVydHkocHJvcFswXSwgcHJvcFsxXSwgcHJvcFsyXSlcblx0XHRcdEBhZGRDb3B5RXZlbnQocHJvcFswXSwgcHJvcFsxXSlcblxuXHRkZWZpbmVDdXN0b21Qcm9wZXJ0eTogKHZhcmlhYmxlTmFtZSwgbGF5ZXIsIGZsb2F0KSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiA9PiByZXR1cm4gQHByb3BzW3ZhcmlhYmxlTmFtZV1cblx0XHRcdHNldDogKHZhbHVlKSA9PlxuXHRcdFx0XHRAcHJvcHNbdmFyaWFibGVOYW1lXSA9IHZhbHVlXG5cblx0XHRcdFx0aWYgbm90IHZhbHVlP1xuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gJydcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRpZiBmbG9hdFxuXHRcdFx0XHRcdGlmIHZhbHVlIGlzICcwJ1xuXHRcdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0XHRsYXllci52YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUgPyAnMCcpLnRvRml4ZWQoMilcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdFxuXHRkZWZpbmVDdXN0b21Db2xvclByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllcikgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogPT4gcmV0dXJuIEBwcm9wc1t2YXJpYWJsZU5hbWVdXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgPT5cblx0XHRcdFx0QHByb3BzW3ZhcmlhYmxlTmFtZV0gPSB2YWx1ZVxuXHRcdFx0XHRsYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRcblxuXHRhZGRDb3B5RXZlbnQ6ICh2YXJpYWJsZU5hbWUsIGxheWVyKSAtPlxuXHRcdGRvICh2YXJpYWJsZU5hbWUsIGxheWVyKSA9PlxuXHRcdFx0bGF5ZXIuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRcdEBjb3B5Q29udGVudChAW3ZhcmlhYmxlTmFtZV0pXG5cdFx0XHRcdEBoaWdobGlnaHQobGF5ZXIpXG5cblx0Y29weUNvbnRlbnQ6IChjb250ZW50KSA9PlxuXHRcdHNlY3JldEJveC52YWx1ZSA9IGNvbnRlbnRcblx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdGhpZ2hsaWdodDogKGxheWVyKSA9PlxuXHRcdHN0YXJ0Qm9yZGVyQ29sb3IgPSBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXVxuXHRcdGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddID0gJ3JnYmEoMTE4LCAyMzcsIDkzLCAxLjAwMCknXG5cdFx0cmVzZXQgPSA9PiBsYXllci5lbGVtZW50LnN0eWxlWydib3JkZXItY29sb3InXSA9IHN0YXJ0Qm9yZGVyQ29sb3JcblxuXHRcdF8uZGVsYXkocmVzZXQsIDI1MClcblxuXG5cdGNsZWFyUHJvcHM6ID0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgQHByb3BzXG5cdFx0XHRAW2tleV0gPSB1bmRlZmluZWRcblx0XHRAc2V0VGV4dFN0eWxlcygpXG5cblx0c2V0VGV4dFN0eWxlczogKHZhbHVlKSA9PlxuXG5cdFx0Zm9yIGxheWVyIGluIFtcblx0XHRcdEBmb250TGFiZWwsXG5cdFx0XHRAZm9udFNpemVMYWJlbCxcblx0XHRcdEBjb2xvckxhYmVsLFxuXHRcdFx0QGxpbmVIaWdodExhYmVsLFxuXHRcdFx0QGZvbnRGYW1pbHlWYWx1ZUJveCwgXG5cdFx0XHRAY29sb3JWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFNpemVWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFdlaWdodFZhbHVlQm94LCBcblx0XHRcdEBsaW5lSGVpZ2h0VmFsdWVCb3gsIFxuXHRcdFx0QGZvbnRTdHlsZVZhbHVlQm94XG5cdFx0XVxuXHRcdFx0bGF5ZXIuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaWYgdmFsdWU/IHRoZW4gJzEnIGVsc2UgJzAnXG5cblxuXG5cbiAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIyMjXG5cdCA4ODg4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFAgb29cblx0IDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuXHRhODhhYWFhICAgIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIDg4IGRQIDg4ZDg4OGIuXG5cdCA4OCAgICAgICAgODgnICBgODggODgnICBgODggODgnICBgODggODggODggODgnICBgODhcblx0IDg4ICAgICAgICA4OCAgICAgICA4OC4gIC44OCA4OC4gIC44OCA4OCA4OCA4OCAgICA4OFxuXHQgZFAgICAgICAgIGRQICAgICAgIGA4ODg4OFA4IDg4WTg4OFAnIGRQIGRQIGRQICAgIGRQXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyMjXG5cblxuY2xhc3MgRnJhcGxpblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBzcGVjUGFuZWwgPSBuZXcgU3BlY1BhbmVsXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb2xvcjogJ3JlZCdcblx0XHRcdHNlY29uZGFyeUNvbG9yOiAnd2hpdGUnXG5cdFx0XHRmb250RmFtaWx5OiAnQXJpYWwnXG5cdFx0XHRmb250U2l6ZTogJzEwJ1xuXHRcdFx0Zm9udFdlaWdodDogJzYwMCdcblx0XHRcdGJvcmRlclJhZGl1czogNFxuXHRcdFx0cGFkZGluZzoge3RvcDogMiwgYm90dG9tOiAyLCBsZWZ0OiA0LCByaWdodDogNH1cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5jb2xvclxuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6IG9wdGlvbnMuc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6IG9wdGlvbnMuZm9udEZhbWlseVxuXHRcdFx0Zm9udFNpemU6IG9wdGlvbnMuZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IG9wdGlvbnMuZm9udFdlaWdodFxuXHRcdFx0c2hhcGVzOiBbXVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBvcHRpb25zLmJvcmRlclJhZGl1c1xuXHRcdFx0cGFkZGluZzogb3B0aW9ucy5wYWRkaW5nXG5cdFx0XHRmb2N1c2VkRWxlbWVudDogdW5kZWZpbmVkXG5cdFx0XHRlbmFibGVkOiBmYWxzZVxuXHRcdFx0c2NyZWVuRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XHR2aWV3cG9ydDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XHRsYXllcnM6IFtdXG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIEB0b2dnbGUpXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBAY2xpY2tIb3ZlcmVkRWxlbWVudClcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXG5cdFx0QGNvbnRleHQuY2hpbGROb2Rlc1syXS5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXHRcdEBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgQGZvY3VzKVxuXHRcdEBjb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBAdW5mb2N1cylcblxuXHRcdFV0aWxzLmluc2VydENTUyBcIlwiXCIgXG5cdFx0XHQuZnJhbWVyTGF5ZXIgeyBcblx0XHRcdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHRcdFx0fSBcblxuXHRcdFx0LkRldmljZUNvbnRlbnQge1xuXHRcdFx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0XHRcdFx0fVxuXG5cdFx0XHQuRGV2aWNlQmFja2dyb3VuZCB7XG5cdFx0XHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHRcdFx0XHR9XG5cblx0XHRcdC5EZXZpY2VIYW5kcyB7XG5cdFx0XHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHRcdFx0XHR9XG5cblx0XHRcdC5EZXZpY2VDb21wb25lbnRQb3J0IHtcblx0XHRcdFx0cG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgXG5cdFx0XHR9XG5cblx0XHRcdC5JZ25vcmVQb2ludGVyRXZlbnRzIHtcblx0XHRcdFx0cG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgXG5cdFx0XHR9XG5cdFx0XHRcIlwiXCJcblxuXHR0b2dnbGU6IChldmVudCkgPT5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJgXCJcblx0XHRcdGlmIEBlbmFibGVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIlxuXHRcdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0XHRpZiBAaG92ZXJlZEVsZW1lbnQgaXMgQHNlbGVjdGVkRWxlbWVudFxuXHRcdFx0XHRAZGVzZWxlY3QoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2VsZWN0KClcblxuXHRcdFx0cmV0dXJuXG5cblxuXHRyZXNldExheWVyczogPT5cblx0XHRAbGF5ZXJzID0gW11cblxuXHRcdGZvciBsYXllciBpbiBGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVyc1xuXHRcdFx0QGxheWVycy5wdXNoIGxheWVyXG5cblx0ZW5hYmxlOiA9PlxuXG5cdFx0QHJlc2V0TGF5ZXJzKClcblxuXHRcdEBlbmFibGVkID0gdHJ1ZVxuXHRcdEBzcGVjUGFuZWwucGFuZWwuc3R5bGUub3BhY2l0eSA9ICcxJ1xuXHRcdEBmb2N1cygpXG5cblx0ZGlzYWJsZTogPT5cblxuXHRcdEBlbmFibGVkID0gZmFsc2Vcblx0XHRAc3BlY1BhbmVsLnBhbmVsLnN0eWxlLm9wYWNpdHkgPSAnMCdcblx0XHRAdW5mb2N1cygpXG5cblxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRpZiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnJhbWVyTGF5ZXInKVxuXHRcdFx0bGF5ZXIgPSBfLmZpbmQoQGxheWVycywgWydfZWxlbWVudCcsIGVsZW1lbnRdKVxuXHRcdGVsc2Vcblx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU/LnBhcmVudE5vZGU/LnBhcmVudE5vZGVcblx0XHRcdGxheWVyID0gXy5maW5kKEBsYXllcnMsIFsnX2VsZW1lbnQnLCBlbGVtZW50XSlcblxuXHRcdHJldHVybiBsYXllciBcblxuXHRjbGlja0hvdmVyZWRFbGVtZW50OiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0aWYgQGhvdmVyZWRFbGVtZW50IGlzIEBzZWxlY3RlZEVsZW1lbnRcblx0XHRcdEBkZXNlbGVjdCgpXG5cdFx0ZWxzZVxuXHRcdFx0QGRlc2VsZWN0KClcblx0XHRcdFV0aWxzLmRlbGF5IDAsID0+IEBzZWxlY3QoKVxuXG5cdHNlbGVjdDogKGV2ZW50KSA9PlxuXHRcdEBzZWxlY3RlZEVsZW1lbnQgPSBAaG92ZXJlZEVsZW1lbnRcblx0XHRAZm9jdXMoKVxuXG5cdGRlc2VsZWN0OiAoZXZlbnQpID0+XG5cdFx0QHNlbGVjdGVkRWxlbWVudCA9IHVuZGVmaW5lZFxuXHRcdEBmb2N1cygpXG5cblx0Z2V0RGltZW5zaW9uczogKGVsZW1lbnQpID0+XG5cdFx0ZCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdGRpbWVuc2lvbnMgPSB7XG5cdFx0XHR4OiBkLmxlZnRcblx0XHRcdHk6IGQudG9wXG5cdFx0XHR3aWR0aDogZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBkLmhlaWdodFxuXHRcdFx0bWlkWDogZC5sZWZ0ICsgKGQud2lkdGggLyAyKVxuXHRcdFx0bWlkWTogZC50b3AgKyAoZC5oZWlnaHQgLyAyKVxuXHRcdFx0bWF4WDogZC5sZWZ0ICsgZC53aWR0aFxuXHRcdFx0bWF4WTogZC50b3AgKyBkLmhlaWdodFxuXHRcdFx0ZnJhbWU6IGRcblx0XHR9XG5cblx0XHRyZXR1cm4gZGltZW5zaW9uc1xuXG5cdG1ha2VMaW5lOiAocG9pbnRBLCBwb2ludEIsIGxhYmVsID0gdHJ1ZSkgPT5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IEBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRpZiBwb2ludEFbMF0gaXMgcG9pbnRCWzBdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXSAtIDR9ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRBWzBdICsgNX0gI3twb2ludEFbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXSAtIDR9ICN7cG9pbnRCWzFdfSBMICN7cG9pbnRCWzBdICsgNX0gI3twb2ludEJbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDR9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IEBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSAtIDR9IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IEBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRtYWtlTGFiZWw6ICh4LCB5LCB0ZXh0KSA9PlxuXHRcdGxhYmVsID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAndGV4dCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiB4XG5cdFx0XHR5OiB5XG5cdFx0XHQnZm9udC1mYW1pbHknOiBAZm9udEZhbWlseVxuXHRcdFx0J2ZvbnQtc2l6ZSc6IEBmb250U2l6ZVxuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogQGZvbnRXZWlnaHRcblx0XHRcdGZpbGw6IEBzZWNvbmRhcnlDb2xvclxuXHRcdFx0dGV4dDogKHRleHQgLyBAcmF0aW8pLnRvRml4ZWQoKVxuXG5cdFx0bCA9IEBnZXREaW1lbnNpb25zKGxhYmVsLmVsZW1lbnQpXG5cblx0XHRsYWJlbC54ID0geCAtIGwud2lkdGggLyAyXG5cdFx0bGFiZWwueSA9IHkgKyBsLmhlaWdodCAvIDRcblxuXHRcdGJveCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogbGFiZWwueCAtIEBwYWRkaW5nLmxlZnRcblx0XHRcdHk6IGxhYmVsLnkgLSBsLmhlaWdodFxuXHRcdFx0d2lkdGg6IGwud2lkdGggKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogbC5oZWlnaHQgKyBAcGFkZGluZy50b3AgKyBAcGFkZGluZy5ib3R0b21cblx0XHRcdHJ4OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRyeTogQGJvcmRlclJhZGl1c1xuXHRcdFx0ZmlsbDogQGNvbG9yXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWQsIGhvdmVyZWQpID0+XG5cblx0XHRzID0gQGdldERpbWVuc2lvbnMoQHNlbGVjdGVkRWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoQGhvdmVyZWRFbGVtZW50KVxuXG5cdFx0QHJhdGlvID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyBTY3JlZW4ud2lkdGhcblxuXHRcdGlmIEBzZWxlY3RlZEVsZW1lbnQgaXMgQGhvdmVyZWRFbGVtZW50XG5cdFx0XHRoID0gQGdldERpbWVuc2lvbnMoQHNjcmVlbkVsZW1lbnQpXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBjb250YWlucyBob3ZlcmVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA8IGgueCBhbmQgcy5tYXhYID4gaC5tYXhYIGFuZCBzLnkgPCBoLnkgYW5kIHMubWF4WSA+IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WCkudG9GaXhlZCgpXG5cdFx0XHRtID0gaC5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWF4WCArIDUsIGgubWlkWV0sIFtzLm1heFggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFkgLSBoLm1heFkpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IGgubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueCkudG9GaXhlZCgpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRAbWFrZUJvdW5kaW5nUmVjdHMocywgaClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gaG92ZXJlZCBlbGVtZW50IGNvbnRhaW5zIHNlbGVjdGVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA+IGgueCBhbmQgcy5tYXhYIDwgaC5tYXhYIGFuZCBzLnkgPiBoLnkgYW5kIHMubWF4WSA8IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KS50b0ZpeGVkKClcblx0XHRcdG0gPSBoLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WCAtIHMubWF4WCkudG9GaXhlZCgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIHMubWF4WSArIDVdLCBbcy5taWRYLCBoLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueCkudG9GaXhlZCgpXG5cdFx0XHRtID0gaC54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0XHRAbWFrZUJvdW5kaW5nUmVjdHMocywgaClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gaG92ZXJlZCBlbGVtZW50XG5cdFx0XG5cdFx0IyB0b3BcblxuXHRcdGlmIHMueSA+IGgubWF4WVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC5tYXhZKS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBoLm1heFkgKyA1XSwgW3MubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55ID4gaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0aWYgaC54IDwgcy54XG5cdFx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBoLnkgKyA1XSwgW3MubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdCMgbGVmdFxuXG5cdFx0aWYgcy54ID4gaC5tYXhYXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLm1heFgpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnggPiBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueCkudG9GaXhlZCgpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRpZiBzLnkgPiBoLm1heFlcblx0XHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0IyByaWdodFxuXG5cdFx0aWYgcy5tYXhYIDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLm1heFgpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBzLm1pZFldLCBbaC54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueCkudG9GaXhlZCgpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRpZiBzLnkgPiBoLm1heFlcblx0XHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgcy5taWRZXSwgW2gueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0IyBib3R0b21cblxuXHRcdGlmIHMubWF4WSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy5tYXhZKS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBzLm1heFkgKyA1XSwgW3MubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55IDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0aWYgaC54IDwgcy54XG5cdFx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdEBtYWtlQm91bmRpbmdSZWN0cyhzLCBoKVxuXG5cdG1ha2VCb3VuZGluZ1JlY3RzOiAocywgaCkgPT5cblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogY3R4XG5cdFx0XHR4OiBoLnggKyAxXG5cdFx0XHR5OiBoLnkgKyAxXG5cdFx0XHR3aWR0aDogaC53aWR0aCAtIDJcblx0XHRcdGhlaWdodDogaC5oZWlnaHQgLSAyXG5cdFx0XHRzdHJva2U6ICdibHVlJ1xuXHRcdFx0ZmlsbDogJ25vbmUnXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdHNlbGVjdGVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogcy54ICsgMVxuXHRcdFx0eTogcy55ICsgMVxuXHRcdFx0d2lkdGg6IHMud2lkdGggLSAyXG5cdFx0XHRoZWlnaHQ6IHMuaGVpZ2h0IC0gMlxuXHRcdFx0c3Ryb2tlOiAncmVkJ1xuXHRcdFx0ZmlsbDogJ25vbmUnXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cdFx0aCA9IEBob3ZlcmVkTGF5ZXJcblx0XHRoZSA9IEBob3ZlcmVkRWxlbWVudFxuXHRcdHMgPSBAc2VsZWN0ZWRMYXllclxuXHRcdHNlID0gQHNlbGVjdGVkRWxlbWVudFxuXG5cdFx0aWYgbm90IHM/IGFuZCBub3QgaD9cblx0XHRcdEBzcGVjUGFuZWwuY2xlYXJQcm9wcygpXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGg/IGFuZCBub3Qgcz9cblx0XHRcdF8uYXNzaWduIEBzcGVjUGFuZWwsXG5cdFx0XHRcdHg6IGgueFxuXHRcdFx0XHR5OiBoLnlcblx0XHRcdFx0d2lkdGg6IGguc2NyZWVuRnJhbWUud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBoLnNjcmVlbkZyYW1lLmhlaWdodFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGguYmFja2dyb3VuZENvbG9yXG5cdFx0XHRcdG9wYWNpdHk6IGgub3BhY2l0eVxuXHRcdFx0XHRib3JkZXJDb2xvcjogaC5ib3JkZXJDb2xvclxuXHRcdFx0XHRib3JkZXJXaWR0aDogaC5ib3JkZXJXaWR0aFxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IGguYm9yZGVyUmFkaXVzXG5cdFx0XHRcdHNoYWRvd0NvbG9yOiBoLnNoYWRvd0NvbG9yXG5cdFx0XHRcdHNoYWRvd1NwcmVhZDogaC5zaGFkb3dTcHJlYWRcblx0XHRcdFx0c2hhZG93WDogaC5zaGFkb3dYXG5cdFx0XHRcdHNoYWRvd1k6IGguc2hhZG93WVxuXHRcdFx0XHRzaGFkb3dCbHVyOiBoLnNoYWRvd0JsdXJcblx0XHRcdFx0Y29sb3I6IGguY29sb3Jcblx0XHRcdFx0Zm9udEZhbWlseTogaC5mb250RmFtaWx5XG5cdFx0XHRcdGZvbnRTdHlsZTogaC5mb250U3R5bGVcblx0XHRcdFx0Zm9udFNpemU6IGguZm9udFNpemVcblx0XHRcdFx0Zm9udFdlaWdodDogaC5mb250V2VpZ2h0XG5cdFx0XHRcdGxpbmVIZWlnaHQ6IGgubGluZUhlaWdodFxuXHRcdFx0XHRjb21wb25lbnROYW1lOiBoLmNvbnN0cnVjdG9yLm5hbWVcblxuXHRcdFx0QHNwZWNQYW5lbC5zZXRUZXh0U3R5bGVzKGguZm9udEZhbWlseSlcblxuXHRcdFx0cmV0dXJuXG5cblxuXHRmb2N1czogKGV2ZW50KSA9PlxuXHRcdGlmIEBlbmFibGVkIGlzIGZhbHNlXG5cdFx0XHRyZXR1cm4gXG5cblx0XHRAdW5mb2N1cygpXG5cblx0XHRAc2VsZWN0ZWRFbGVtZW50ID89IEBzY3JlZW5FbGVtZW50XG5cdFx0QGhvdmVyZWRFbGVtZW50ID0gKGV2ZW50Py50YXJnZXQgPyBAaG92ZXJlZEVsZW1lbnQpXG5cdFx0XG5cdFx0aWYgbm90IEBob3ZlcmVkRWxlbWVudFxuXHRcdFx0cmV0dXJuXG5cblx0XHRAc2VsZWN0ZWRMYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KEBzZWxlY3RlZEVsZW1lbnQpXG5cdFx0QGhvdmVyZWRMYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KEBob3ZlcmVkRWxlbWVudClcblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKClcblxuXHRcdEBzaG93RGlzdGFuY2VzKEBzZWxlY3RlZEVsZW1lbnQsIEBob3ZlcmVkRWxlbWVudClcblxuXHRcdGlmIEBzY3JlZW5FbGVtZW50IGlzIEBob3ZlcmVkRWxlbWVudFxuXHRcdFx0cmV0dXJuXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdGN0eC5yZW1vdmVBbGwoKVxuXG5cbmV4cG9ydHMuZnJhcGxpbiA9IG5ldyBGcmFwbGluXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBRGNBLElBQUEscU1BQUE7RUFBQTs7OztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBRUEsVUFBQSxHQUFhOztBQUNiLEdBQUEsR0FBTTs7QUFFTixTQUFBLEdBQVk7O0FBR1osS0FBSyxDQUFDLFNBQU4sQ0FBZ0IseW1CQUFoQjs7QUEyREEsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCOztBQUNSLEtBQUssQ0FBQyxFQUFOLEdBQVc7O0FBQ1gsS0FBQSxHQUFRLFFBQVEsQ0FBQyxjQUFULENBQXdCLDJCQUF4Qjs7QUFDUixLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBZSxDQUFBLFNBQUEsS0FBQTtTQUFBLFNBQUE7V0FBRyxLQUFLLENBQUMsV0FBTixDQUFrQixLQUFsQjtFQUFIO0FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFmOztBQWNBLFNBQUEsR0FBWSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2Qjs7QUFDWixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsU0FBMUI7OztBQWdCQTs7Ozs7Ozs7QUFVTTtFQUNRLG9CQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7OztJQUN2QixJQUFDLENBQUEsYUFBRCxHQUFpQjtJQUVqQixJQUFDLENBQUEsTUFBRCxHQUFVO0lBRVYsVUFBQSxHQUFhO0lBR2IsS0FBQSxHQUFRO0lBR1IsYUFBQSxHQUFnQixTQUFDLE9BQUQsRUFBVSxVQUFWO0FBQ2YsVUFBQTs7UUFEeUIsYUFBYTs7QUFDdEM7V0FBQSxpQkFBQTs7cUJBQ0MsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsR0FBckIsRUFBMEIsS0FBMUI7QUFERDs7SUFEZTtJQUloQixJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLEtBQUEsQ0FDakI7TUFB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
