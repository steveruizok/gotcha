require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var Fraplin, Label, SVGContext, SVGShape, SpecBox, SpecColorValueBox, SpecDivider, SpecElement, SpecLabel, SpecPanel, SpecValueBox, SpecWideValueBox, ctx, panel, secretBox, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

svgContext = void 0;

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
    this.panel.style.opacity = '1';
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

Utils.insertCSS("\n#SpecContainer {\n	position: absolute;\n	right: 0;\n	top: 0;\n	bottom: 0;\n	width: 224px;\n	background-color: rgba(30, 30, 30, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n}\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.SpecLabel {\n	position: absolute;\n}\n\n@-webkit-keyframes showCopied {\n	0% { \n		border-color: rgba(118, 237, 93, 1.000);\n	}\n\n	100% {\n		border-color: rgba(0, 0, 0, 1.000);\n	}\n}\n\n.copied {\n	background-color: red;\n}\n");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0Ryb3Bib3ggKENsZWFyU2NvcmUpL3Byb3RvdHlwZV9mcmFtZXdvcmtzL3V4LWtpdC9wcm9qZWN0cy9leHBlcmltZW50cy9GcmFwbGluLmZyYW1lci9tb2R1bGVzL2dvdGNoYS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgU1ZHQ29udGV4dFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5zdmdDb250ZXh0ID0gdW5kZWZpbmVkXG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAZnJhbWVMYXllciA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogU2NyZWVuLnNpemVcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0dmlzaWJsZTogZmFsc2VcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBAZnJhbWVMYXllci5fZWxlbWVudFxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0IyBDcmVhdGUgU1ZHIGVsZW1lbnRcblxuXHRcdEBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKVxuXHRcblx0XHRjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LVRvdWNoRW11bGF0b3InKVxuXHRcdGNvbnRleHQuYXBwZW5kQ2hpbGQoQHN2ZylcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0YWRkU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc2hhcGVzLnB1c2goc2hhcGUpXG5cdFx0QHNob3dTaGFwZShzaGFwZSlcblx0XHRcblx0cmVtb3ZlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAaGlkZVNoYXBlKHNoYXBlKVxuXHRcdF8ucHVsbChAc2hhcGVzLCBzaGFwZSlcblx0XHRcblx0aGlkZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcblx0c2hvd1NoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHN2Zy5hcHBlbmRDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdFxuXHRhZGREZWY6IChkZWYpIC0+XG5cdFx0QHN2Z0RlZnMuYXBwZW5kQ2hpbGQoZGVmKVxuXG5cdHJlbW92ZUFsbDogPT5cblx0XHRmb3Igc2hhcGUgaW4gQHNoYXBlc1xuXHRcdFx0QHN2Zy5yZW1vdmVDaGlsZChzaGFwZS5lbGVtZW50KVxuXHRcdEBzaGFwZXMgPSBbXVxuXG4jIFNWR1NoYXBlXG5jbGFzcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7dHlwZTogJ2NpcmNsZSd9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBwYXJlbnQgPSBzdmdDb250ZXh0XG5cdFx0XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFxuXHRcdFx0b3B0aW9ucy50eXBlXG5cdFx0XHQpXG5cblx0XHRAc2V0Q3VzdG9tUHJvcGVydHkoJ3RleHQnLCAndGV4dENvbnRlbnQnLCAndGV4dENvbnRlbnQnLCBvcHRpb25zLnRleHQpXG5cdFx0XHRcdFxuXHRcdCMgYXNzaWduIGF0dHJpYnV0ZXMgc2V0IGJ5IG9wdGlvbnNcblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cdFx0XHRAc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAcGFyZW50LmFkZFNoYXBlKEApXG5cdFx0XG5cdFx0QHNob3coKVxuXHRcdFx0XG5cdHNldEF0dHJpYnV0ZTogKGtleSwgdmFsdWUpID0+XG5cdFx0cmV0dXJuIGlmIGtleSBpcyAndGV4dCdcblx0XHRpZiBub3QgQFtrZXldP1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0Z2V0OiA9PlxuXHRcdFx0XHRcdHJldHVybiBAZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdFx0QGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XG5cdFx0QFtrZXldID0gdmFsdWVcblx0XG5cdHNldEN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCByZXR1cm5WYWx1ZSwgc2V0VmFsdWUsIHN0YXJ0VmFsdWUpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBlbGVtZW50W3NldFZhbHVlXSA9IHZhbHVlXG5cblx0XHRAW3ZhcmlhYmxlTmFtZV0gPSBzdGFydFZhbHVlXG5cblx0aGlkZTogLT4gXG5cdFx0QHBhcmVudC5oaWRlU2hhcGUoQClcblx0XG5cdHNob3c6IC0+IFxuXHRcdEBwYXJlbnQuc2hvd1NoYXBlKEApXG5cdFx0XG5cdHJlbW92ZTogLT5cblx0XHRAcGFyZW50LnJlbW92ZVNoYXBlKEApXG5cbmNsYXNzIExhYmVsIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdG5hbWU6ICcuJ1xuXHRcdFx0Zm9udFNpemU6IDEyXG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiAnIzc3Nydcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRleHQ6ICd4J1xuXHRcdFx0dmFsdWU6IDBcblxuXHRcdHcgPSBvcHRpb25zLndpZHRoXG5cdFx0ZGVsZXRlIG9wdGlvbnMud2lkdGhcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEB2YWx1ZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAcGFyZW50XG5cdFx0XHRuYW1lOiAnLidcblx0XHRcdGZvbnRTaXplOiBAZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6ICcjMzMzJ1xuXHRcdFx0Zm9udEZhbWlseTogQGZvbnRGYW1pbHlcblx0XHRcdHg6IEB4ICsgd1xuXHRcdFx0eTogQHlcblx0XHRcdHRleHQ6ICd7dmFsdWV9J1xuXG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlXG5cdFx0XG5cblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0cmV0dXJuIGlmIEBfX2NvbnN0cnVjdG9yXG5cdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdEB2YWx1ZUxheWVyLnRlbXBsYXRlID0gdmFsdWVcblxuXG5jdHggPSBuZXcgU1ZHQ29udGV4dFxuXG5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5wYW5lbC5pZCA9ICdTcGVjQ29udGFpbmVyJ1xudmlld0MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtRGVmYXVsdCcpXG5VdGlscy5kZWxheSAwLCA9PiB2aWV3Qy5hcHBlbmRDaGlsZChwYW5lbClcblxuc2VjcmV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWNyZXRCb3gpXG5cbmNsYXNzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAoY2xhc3NOYW1lLCBvcHRpb25zID0ge30sIHRleHQpIC0+XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQgY2xhc3NOYW1lXG5cblx0XHRfLmFzc2lnbiBAZWxlbWVudC5zdHlsZSwgb3B0aW9uc1xuXG5cdFx0cGFuZWwuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbmNsYXNzIFNwZWNMYWJlbCBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J3Bvc2l0aW9uJzogJ2Fic29sdXRlJ1xuXHRcdFx0J3RvcCc6ICc4cHgnXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6ICdub25lJ1xuXHRcdFx0J2ZvbnQtZmFtaWx5JzogJ0hlbHZldGljYSBOZXVlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcxZW0nXG5cdFx0XHQnZm9udC13ZWlnaHQnOiAnNDAwJ1xuXHRcdFx0J2NvbG9yJzogJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgJ1NwZWNMYWJlbCcsIG9wdGlvbnNcblxuXHRcdEB0ZXh0TGF5ZXIgPSBuZXcgU3BlY0VsZW1lbnQgJ1NwZWNMYWJlbCcsXG5cdFx0XHQnZm9udC1mYW1pbHknOiBvcHRpb25zWydmb250LWZhbWlseSddID8gJ0hlbHZldGljYSBOZXVlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6IG9wdGlvbnNbJ2ZvbnQtc2l6ZSddID8gJzFlbSdcblx0XHRcdCdmb250LXdlaWdodCc6IG9wdGlvbnNbJ2ZvbnQtd2VpZ2h0J10gPyAnNTAwJ1xuXHRcdFx0J2NvbG9yJzogb3B0aW9uc1snY29sb3InXSA/ICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEuMDAwKSdcblx0XHRcdCdsZWZ0Jzogb3B0aW9ucy5sZWZ0XG5cdFx0XHQncmlnaHQnOiBvcHRpb25zLnJpZ2h0XG5cblx0XHRAZWxlbWVudC5hcHBlbmRDaGlsZCBAdGV4dExheWVyLmVsZW1lbnRcblxuXHRcdG9wdGlvbnMucGFyZW50Py5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd0ZXh0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEB0ZXh0TGF5ZXIuZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+IEB0ZXh0TGF5ZXIuZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cblx0XHRAdGV4dCA9IG9wdGlvbnMudGV4dCA/ICcnXG5cbmNsYXNzIFNwZWNEaXZpZGVyIGV4dGVuZHMgU3BlY0VsZW1lbnRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzhweCdcblx0XHRcdCd3aWR0aCc6ICcyMDhweCdcblx0XHRcdCdoZWlnaHQnOiAnMXB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAnIzAwMCdcblx0XHRcdCdib3JkZXInOiAnLjVweCBzb2xpZCAjMDAwJ1xuXHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnMnB4J1xuXHRcdFx0J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCdcblxuXHRcdHN1cGVyICdTcGVjRGl2aWRlcicsIG9wdGlvbnNcblxuY2xhc3MgU3BlY0JveCBleHRlbmRzIFNwZWNFbGVtZW50XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiB1bmRlZmluZWRcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdCdwb3NpdGlvbic6ICdhYnNvbHV0ZSdcblx0XHRcdCd0b3AnOiAnOHB4J1xuXHRcdFx0J2xlZnQnOiAnOTZweCdcblx0XHRcdCd3aWR0aCc6ICc2NHB4J1xuXHRcdFx0J2hlaWdodCc6ICcyNHB4J1xuXHRcdFx0J2JhY2tncm91bmQtY29sb3InOiAncmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cdFx0XHQnYm9yZGVyJzogJy41cHggc29saWQgIzAwMCdcblx0XHRcdCdib3JkZXItcmFkaXVzJzogJzJweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnYm94LXNoYWRvdyc6ICdpbnNldCAwcHggMHB4IDBweCA0cHggcmdiYSg0MSwgNDEsIDQxLCAxLjAwMCknXG5cblx0XHRzdXBlciAnU3BlY0xhYmVsJywgb3B0aW9uc1xuXG5jbGFzcyBTcGVjQ29sb3JWYWx1ZUJveCBleHRlbmRzIFNwZWNCb3hcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHQncG9zaXRpb24nOiAnYWJzb2x1dGUnXG5cdFx0XHQndG9wJzogJzhweCdcblx0XHRcdCdsZWZ0JzogJzk2cHgnXG5cdFx0XHQnd2lkdGgnOiAnNjRweCdcblx0XHRcdCdoZWlnaHQnOiAnMjRweCdcblx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXHRcdFx0J2JvcmRlcic6ICcuNXB4IHNvbGlkICMwMDAnXG5cdFx0XHQnYm9yZGVyLXJhZGl1cyc6ICcycHgnXG5cdFx0XHQnYm94LXNpemluZyc6ICdib3JkZXItYm94J1xuXHRcdFx0J2JveC1zaGFkb3cnOiAnaW5zZXQgMHB4IDBweCAwcHggNHB4IHJnYmEoNDEsIDQxLCA0MSwgMS4wMDApJ1xuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEBlbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2YWx1ZSA/ICdyZ2JhKDQxLCA0MSwgNDEsIDEuMDAwKSdcblxuXHRcdEB2YWx1ZSA9IG9wdGlvbnMudmFsdWVcblxuXG5jbGFzcyBTcGVjVmFsdWVCb3ggZXh0ZW5kcyBTcGVjQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogJ0hlbHZldGljYSBOZXVlJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNDJlbSdcblx0XHRcdCdwYWRkaW5nLXRvcCc6ICc1cHgnXG5cdFx0XHQncGFkZGluZy1sZWZ0JzogJzhweCdcblx0XHRcdCdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnXG5cdFx0XHQnbGluZS1oZWlnaHQnOiAnMWVtJ1xuXHRcdFx0J292ZXJmbG93JzogJ2hpZGRlbidcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEB2YWx1ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0ID8gJydcblx0XHRcdHBhcmVudDogQGVsZW1lbnRcblx0XHRcdCdmb250LXNpemUnOiAnMWVtJ1xuXHRcdFx0J2xlZnQnOiAnNnB4J1xuXHRcdFx0J3RvcCc6ICc2cHgnXG5cdFx0XHQnY29sb3InOiAnI0ZGRidcblx0XHRcdCdmb250LXdlaWdodCc6ICc1MDAnXG5cblx0XHRAdW5pdExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dGV4dDogb3B0aW9ucy51bml0ID8gJydcblx0XHRcdHBhcmVudDogQGVsZW1lbnRcblx0XHRcdCdmb250LXNpemUnOiAnLjllbSdcblx0XHRcdCdyaWdodCc6ICcycHgnXG5cdFx0XHQndG9wJzogJzZweCdcblx0XHRcdCd0ZXh0LWFsaWduJzogJ3JpZ2h0J1xuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQHZhbHVlTGFiZWwuZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QHZhbHVlTGFiZWwuZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cblx0XHRAdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gJydcblxuXG5jbGFzcyBTcGVjV2lkZVZhbHVlQm94IGV4dGVuZHMgU3BlY1ZhbHVlQm94XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LnN0eWxlLndpZHRoID0gJzEzNnB4J1xuXG4jIyNcblx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcblx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG5cdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG5cdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcblx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcblx0IFk4ODg4OFAgIDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4OFAnICBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcblx0ICAgICAgICAgIDg4XG5cdCAgICAgICAgICBkUFxuIyMjXG5cblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QHBhbmVsID0gcGFuZWxcblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAcGFuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAcGFuZWwuc3R5bGUub3BhY2l0eSA9ICcxJ1xuXG5cdFx0Y29sMHggPSAnNHB4J1xuXHRcdGNvbDF4ID0gJzg0cHgnXG5cdFx0Y29sMnggPSAnMTU2cHgnXG5cblx0XHRyb3cgPSAobnVtLCBvZmZzZXQgPSAwKSAtPiByZXR1cm4gKDE2ICsgKDM1ICogbnVtKSAtIG9mZnNldCkgKyAncHgnXG5cblx0XHQjIHBvc1xuXG5cdFx0QHBvc0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMCwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUG9zaXRpb24nXG5cdFx0XHQnZm9udC1zaXplJzogJy42NWVtJ1xuXG5cdFx0QHhWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDApXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzI1OCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyBzaXplXG5cblx0XHRAc2l6ZUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAd1ZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHRAaFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMjU4J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIGJhY2tncm91bmRcblxuXHRcdEBiZ0NvbG9yTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygyLCAyKVxuXHRcdFx0bGVmdDogY29sMHhcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBiZ0NvbG9yVmFsdWVCb3ggPSBuZXcgU3BlY0NvbG9yVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDIpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cdFx0IyBvcGFjaXR5XG5cblx0XHRAb3BhY2l0eUxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMywgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAb3BhY2l0eVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMylcblx0XHRcdGxlZnQ6IGNvbDF4XG5cdFx0XHR0ZXh0OiAnMS4wJ1xuXHRcdFx0dW5pdDogJ2EnXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMSA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coNC4yNSwgMilcblxuXHRcdCMgYm9yZGVyXG5cblx0XHRAYm9yZGVyQ29sb3JMYWJlbCA9IG5ldyBTcGVjTGFiZWxcblx0XHRcdHRvcDogcm93KDQuNzUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0JvcmRlcidcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAYm9yZGVyQ29sb3JWYWx1ZUJveCA9IG5ldyBTcGVjQ29sb3JWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNC43NSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAYm9yZGVyVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg0Ljc1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHRleHQ6ICcxJ1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIHJhZGl1c1xuXG5cdFx0QHJhZGl1c0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNS43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEByYWRpdXNWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDUuNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dGV4dDogJzAnXG5cblx0XHQjIHNoYWRvd1xuXG5cdFx0QHNoYWRvd0xhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coNi43NSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBzaGFkb3dDb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg2Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdEBzaGFkb3dTcHJlYWRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDYuNzUpXG5cdFx0XHRsZWZ0OiBjb2wyeFxuXHRcdFx0dGV4dDogJzEnXG5cdFx0XHR1bml0OiAncydcblxuXHRcdEBzaGFkb3dYVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdyg3Ljc1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHRleHQ6ICcwJ1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAc2hhZG93WVZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coNy43NSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cdFx0XHR0ZXh0OiAnMCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0QHNoYWRvd0JsdXJWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDguNzUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2JsdXInXG5cblx0XHQjIERpdmlkZXIgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNwZWNEaXZpZGVyMiA9IG5ldyBTcGVjRGl2aWRlclxuXHRcdFx0dG9wOiByb3coMTAsIDIpXG5cblx0XHQjIEZvbnRcblxuXHRcdEBmb250TGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMC4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnRm9udCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udEZhbWlseVZhbHVlQm94ID0gbmV3IFNwZWNXaWRlVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEwLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblxuXHRcdCMgQ29sb3JcblxuXHRcdEBjb2xvckxhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTEuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXHRcdFx0J2ZvbnQtc2l6ZSc6ICcuNjVlbSdcblxuXHRcdEBjb2xvclZhbHVlQm94ID0gbmV3IFNwZWNDb2xvclZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDF4XG5cblx0XHRAZm9udFN0eWxlVmFsdWVCb3ggPSBuZXcgU3BlY1ZhbHVlQm94XG5cdFx0XHR0b3A6IHJvdygxMS4yNSlcblx0XHRcdGxlZnQ6IGNvbDJ4XG5cblx0XHQjIEZvbnQgU2l6ZVxuXG5cdFx0QGZvbnRTaXplTGFiZWwgPSBuZXcgU3BlY0xhYmVsXG5cdFx0XHR0b3A6IHJvdygxMi4yNSwgMilcblx0XHRcdGxlZnQ6IGNvbDB4XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAZm9udFNpemVWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMXhcblx0XHRcdHVuaXQ6ICdzJ1xuXG5cdFx0QGZvbnRXZWlnaHRWYWx1ZUJveCA9IG5ldyBTcGVjVmFsdWVCb3hcblx0XHRcdHRvcDogcm93KDEyLjI1KVxuXHRcdFx0bGVmdDogY29sMnhcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0IyBMaW5lIEhlaWdodFxuXG5cdFx0QGxpbmVIaWdodExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTMuMjUsIDIpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0hlaWdodCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAbGluZUhlaWdodFZhbHVlQm94ID0gbmV3IFNwZWNWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTMuMjUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXHRcdFx0dW5pdDogJ2xoJ1xuXG5cdFx0IyBEaXZpZGVyICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzcGVjRGl2aWRlcjIgPSBuZXcgU3BlY0RpdmlkZXJcblx0XHRcdHRvcDogcm93KDE0LjUsIDIpXG5cdFx0XG5cdFx0IyBDb21wb25lbnQgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QGNvbXBvbmVudExhYmVsID0gbmV3IFNwZWNMYWJlbFxuXHRcdFx0dG9wOiByb3coMTUpXG5cdFx0XHRsZWZ0OiBjb2wweFxuXHRcdFx0dGV4dDogJ0NvbXBvbmVudCdcblx0XHRcdCdmb250LXNpemUnOiAnLjY1ZW0nXG5cblx0XHRAY29tcG9uZW50VmFsdWVCb3ggPSBuZXcgU3BlY1dpZGVWYWx1ZUJveFxuXHRcdFx0dG9wOiByb3coMTUpXG5cdFx0XHRsZWZ0OiBjb2wxeFxuXG5cblx0XHQjIExpbmtzXG5cblx0XHRAZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdEBnaXRodWJJY29uLmhyZWYgPSBcImh0dHA6Ly9naXRodWIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRAZ2l0aHViSWNvbi5pbm5lckhUTUwgPSAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cdFx0cGFuZWwuYXBwZW5kQ2hpbGQoQGdpdGh1Ykljb24pXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRAdHdpdHRlckljb24uaHJlZiA9IFwiaHR0cDovL3R3aXR0ZXIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRAdHdpdHRlckljb24uaW5uZXJIVE1MID0gJzxzdmcgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiIGlkPVwidHdpdHRlcl9sb2dvXCIgZGF0YS1uYW1lPVwiTG9nbyDigJQgRklYRURcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOnJnYmEoOTEsIDkxLCA5MSwgMS4wMDApO308L3N0eWxlPjwvZGVmcz48dGl0bGU+VHdpdHRlcl9Mb2dvX0JsdWU8L3RpdGxlPjxyZWN0IGNsYXNzPVwiY2xzLTFcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiLz48cGF0aCBjbGFzcz1cImNscy0yXCIgZD1cIk0xNTMuNjIsMzAxLjU5Yzk0LjM0LDAsMTQ1Ljk0LTc4LjE2LDE0NS45NC0xNDUuOTQsMC0yLjIyLDAtNC40My0uMTUtNi42M0ExMDQuMzYsMTA0LjM2LDAsMCwwLDMyNSwxMjIuNDdhMTAyLjM4LDEwMi4zOCwwLDAsMS0yOS40Niw4LjA3LDUxLjQ3LDUxLjQ3LDAsMCwwLDIyLjU1LTI4LjM3LDEwMi43OSwxMDIuNzksMCwwLDEtMzIuNTcsMTIuNDUsNTEuMzQsNTEuMzQsMCwwLDAtODcuNDEsNDYuNzhBMTQ1LjYyLDE0NS42MiwwLDAsMSw5Mi40LDEwNy44MWE1MS4zMyw1MS4zMywwLDAsMCwxNS44OCw2OC40N0E1MC45MSw1MC45MSwwLDAsMSw4NSwxNjkuODZjMCwuMjEsMCwuNDMsMCwuNjVhNTEuMzEsNTEuMzEsMCwwLDAsNDEuMTUsNTAuMjgsNTEuMjEsNTEuMjEsMCwwLDEtMjMuMTYuODgsNTEuMzUsNTEuMzUsMCwwLDAsNDcuOTIsMzUuNjIsMTAyLjkyLDEwMi45MiwwLDAsMS02My43LDIyQTEwNC40MSwxMDQuNDEsMCwwLDEsNzUsMjc4LjU1YTE0NS4yMSwxNDUuMjEsMCwwLDAsNzguNjIsMjNcIi8+PC9zdmc+J1xuXHRcdHBhbmVsLmFwcGVuZENoaWxkKEB0d2l0dGVySWNvbilcblxuXG5cdFx0IyAtLS0tXG5cblx0XHQjIHByb3BlcnRpZXNcblxuXHRcdHByb3BzID0gW1xuXHRcdFx0Wyd4JywgQHhWYWx1ZUJveF0sXG5cdFx0XHRbJ3knLCBAeVZhbHVlQm94XSxcblx0XHRcdFsnd2lkdGgnLCBAd1ZhbHVlQm94XVxuXHRcdFx0WydoZWlnaHQnLCBAaFZhbHVlQm94XVxuXHRcdFx0WydvcGFjaXR5JywgQG9wYWNpdHlWYWx1ZUJveCwgdHJ1ZV1cblx0XHRcdFsnYm9yZGVyV2lkdGgnLCBAYm9yZGVyVmFsdWVCb3hdXG5cdFx0XHRbJ2JvcmRlclJhZGl1cycsIEByYWRpdXNWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93U3ByZWFkJywgQHNoYWRvd1NwcmVhZFZhbHVlQm94XVxuXHRcdFx0WydzaGFkb3dYJywgQHNoYWRvd1hWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93WScsIEBzaGFkb3dZVmFsdWVCb3hdXG5cdFx0XHRbJ3NoYWRvd0JsdXInLCBAc2hhZG93Qmx1clZhbHVlQm94XVxuXHRcdFx0Wydmb250RmFtaWx5JywgQGZvbnRGYW1pbHlWYWx1ZUJveF1cblx0XHRcdFsnZm9udFNpemUnLCBAZm9udFNpemVWYWx1ZUJveF1cblx0XHRcdFsnZm9udFdlaWdodCcsIEBmb250V2VpZ2h0VmFsdWVCb3hdXG5cdFx0XHRbJ2xpbmVIZWlnaHQnLCBAbGluZUhlaWdodFZhbHVlQm94XVxuXHRcdFx0Wydmb250U3R5bGUnLCBAZm9udFN0eWxlVmFsdWVCb3hdXG5cdFx0XHRbJ2NvbXBvbmVudE5hbWUnLCBAY29tcG9uZW50VmFsdWVCb3hdXG5cdFx0XVxuXG5cdFx0Y29sb3JQcm9wcyA9IFtcblx0XHRcdFsnYmFja2dyb3VuZENvbG9yJywgQGJnQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnYm9yZGVyQ29sb3InLCBAYm9yZGVyQ29sb3JWYWx1ZUJveF1cblx0XHRcdFsnc2hhZG93Q29sb3InLCBAc2hhZG93Q29sb3JWYWx1ZUJveF1cblx0XHRcdFsnY29sb3InLCBAY29sb3JWYWx1ZUJveF1cblx0XHRdXG5cblx0XHRmb3IgcHJvcCBpbiBwcm9wc1xuXHRcdFx0QGRlZmluZUN1c3RvbVByb3BlcnR5KHByb3BbMF0sIHByb3BbMV0sIHByb3BbMl0pXG5cdFx0XHRAYWRkQ29weUV2ZW50KHByb3BbMF0sIHByb3BbMV0pXG5cblx0XHRmb3IgcHJvcCBpbiBjb2xvclByb3BzXG5cdFx0XHRAZGVmaW5lQ3VzdG9tQ29sb3JQcm9wZXJ0eShwcm9wWzBdLCBwcm9wWzFdLCBwcm9wWzJdKVxuXHRcdFx0QGFkZENvcHlFdmVudChwcm9wWzBdLCBwcm9wWzFdKVxuXG5cdGRlZmluZUN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCBsYXllciwgZmxvYXQpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6ID0+IHJldHVybiBAcHJvcHNbdmFyaWFibGVOYW1lXVxuXHRcdFx0c2V0OiAodmFsdWUpID0+XG5cdFx0XHRcdEBwcm9wc1t2YXJpYWJsZU5hbWVdID0gdmFsdWVcblxuXHRcdFx0XHRpZiBub3QgdmFsdWU/XG5cdFx0XHRcdFx0bGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGlmIGZsb2F0XG5cdFx0XHRcdFx0aWYgdmFsdWUgaXMgJzAnXG5cdFx0XHRcdFx0XHRsYXllci52YWx1ZSA9ICcnXG5cdFx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRcdGxheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSA/ICcwJykudG9GaXhlZCgyKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdGxheWVyLnZhbHVlID0gdmFsdWVcblx0XHRcdFx0XG5cdGRlZmluZUN1c3RvbUNvbG9yUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIGxheWVyKSAtPlxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0dmFyaWFibGVOYW1lLFxuXHRcdFx0Z2V0OiA9PiByZXR1cm4gQHByb3BzW3ZhcmlhYmxlTmFtZV1cblx0XHRcdHNldDogKHZhbHVlKSA9PlxuXHRcdFx0XHRAcHJvcHNbdmFyaWFibGVOYW1lXSA9IHZhbHVlXG5cdFx0XHRcdGxheWVyLnZhbHVlID0gdmFsdWVcblx0XHRcdFxuXG5cdGFkZENvcHlFdmVudDogKHZhcmlhYmxlTmFtZSwgbGF5ZXIpIC0+XG5cdFx0ZG8gKHZhcmlhYmxlTmFtZSwgbGF5ZXIpID0+XG5cdFx0XHRsYXllci5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdFx0QGNvcHlDb250ZW50KEBbdmFyaWFibGVOYW1lXSlcblx0XHRcdFx0QGhpZ2hsaWdodChsYXllcilcblxuXHRjb3B5Q29udGVudDogKGNvbnRlbnQpID0+XG5cdFx0c2VjcmV0Qm94LnZhbHVlID0gY29udGVudFxuXHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0aGlnaGxpZ2h0OiAobGF5ZXIpID0+XG5cdFx0c3RhcnRCb3JkZXJDb2xvciA9IGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddXG5cdFx0bGF5ZXIuZWxlbWVudC5zdHlsZVsnYm9yZGVyLWNvbG9yJ10gPSAncmdiYSgxMTgsIDIzNywgOTMsIDEuMDAwKSdcblx0XHRyZXNldCA9ID0+IGxheWVyLmVsZW1lbnQuc3R5bGVbJ2JvcmRlci1jb2xvciddID0gc3RhcnRCb3JkZXJDb2xvclxuXG5cdFx0Xy5kZWxheShyZXNldCwgMjUwKVxuXG5cblx0Y2xlYXJQcm9wczogPT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBAcHJvcHNcblx0XHRcdEBba2V5XSA9IHVuZGVmaW5lZFxuXHRcdEBzZXRUZXh0U3R5bGVzKClcblxuXHRzZXRUZXh0U3R5bGVzOiAodmFsdWUpID0+XG5cblx0XHRmb3IgbGF5ZXIgaW4gW1xuXHRcdFx0QGZvbnRMYWJlbCxcblx0XHRcdEBmb250U2l6ZUxhYmVsLFxuXHRcdFx0QGNvbG9yTGFiZWwsXG5cdFx0XHRAbGluZUhpZ2h0TGFiZWwsXG5cdFx0XHRAZm9udEZhbWlseVZhbHVlQm94LCBcblx0XHRcdEBjb2xvclZhbHVlQm94LCBcblx0XHRcdEBmb250U2l6ZVZhbHVlQm94LCBcblx0XHRcdEBmb250V2VpZ2h0VmFsdWVCb3gsIFxuXHRcdFx0QGxpbmVIZWlnaHRWYWx1ZUJveCwgXG5cdFx0XHRAZm9udFN0eWxlVmFsdWVCb3hcblx0XHRdXG5cdFx0XHRsYXllci5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpZiB2YWx1ZT8gdGhlbiAnMScgZWxzZSAnMCdcblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXHRcblx0I1NwZWNDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogMDtcblx0XHR0b3A6IDA7XG5cdFx0Ym90dG9tOiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDMwLCAzMCwgMzAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0fVxuXHRcblx0I3R3aXR0ZXJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogNHB4O1xuXHRcdHJpZ2h0OiA0cHg7XG5cdH1cblxuXHQjZ2l0aHViX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogMzZweDtcblx0fVxuXG5cdC5TcGVjTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0fVxuXG5cdEAtd2Via2l0LWtleWZyYW1lcyBzaG93Q29waWVkIHtcblx0XHQwJSB7IFxuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDExOCwgMjM3LCA5MywgMS4wMDApO1xuXHRcdH1cblxuXHRcdDEwMCUge1xuXHRcdFx0Ym9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDEuMDAwKTtcblx0XHR9XG5cdH1cblxuXHQuY29waWVkIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG5cdH1cblxuXCJcIlwiXG5cbiMjI1xuXHQgODg4ODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQIG9vXG5cdCA4OCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcblx0YTg4YWFhYSAgICA4OGQ4ODhiLiAuZDg4ODhiLiA4OGQ4ODhiLiA4OCBkUCA4OGQ4ODhiLlxuXHQgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4IDg4IDg4JyAgYDg4XG5cdCA4OCAgICAgICAgODggICAgICAgODguICAuODggODguICAuODggODggODggODggICAgODhcblx0IGRQICAgICAgICBkUCAgICAgICBgODg4ODhQOCA4OFk4ODhQJyBkUCBkUCBkUCAgICBkUFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMjI1xuXG5cbmNsYXNzIEZyYXBsaW5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAc3BlY1BhbmVsID0gbmV3IFNwZWNQYW5lbFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29sb3I6ICdyZWQnXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogJ3doaXRlJ1xuXHRcdFx0Zm9udEZhbWlseTogJ0FyaWFsJ1xuXHRcdFx0Zm9udFNpemU6ICcxMCdcblx0XHRcdGZvbnRXZWlnaHQ6ICc2MDAnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDRcblx0XHRcdHBhZGRpbmc6IHt0b3A6IDIsIGJvdHRvbTogMiwgbGVmdDogNCwgcmlnaHQ6IDR9XG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y29sb3I6IG9wdGlvbnMuY29sb3Jcblx0XHRcdHNlY29uZGFyeUNvbG9yOiBvcHRpb25zLnNlY29uZGFyeUNvbG9yXG5cdFx0XHRmb250RmFtaWx5OiBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGZvbnRTaXplOiBvcHRpb25zLmZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBvcHRpb25zLmZvbnRXZWlnaHRcblx0XHRcdHNoYXBlczogW11cblx0XHRcdGJvcmRlclJhZGl1czogb3B0aW9ucy5ib3JkZXJSYWRpdXNcblx0XHRcdHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZ1xuXHRcdFx0Zm9jdXNlZEVsZW1lbnQ6IHVuZGVmaW5lZFxuXHRcdFx0ZW5hYmxlZDogZmFsc2Vcblx0XHRcdHNjcmVlbkVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0dmlld3BvcnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0bGF5ZXJzOiBbXVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgQGNsaWNrSG92ZXJlZEVsZW1lbnQpXG5cblx0XHRAY29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckxheWVyIERldmljZVNjcmVlbicpWzBdXG5cdFx0QGNvbnRleHQuY2xhc3NMaXN0LmFkZCgnaG92ZXJDb250ZXh0JylcblxuXHRcdEBjb250ZXh0LmNoaWxkTm9kZXNbMl0uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblx0XHRAY29udGV4dC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIEBmb2N1cylcblx0XHRAY29udGV4dC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgQHVuZm9jdXMpXG5cblx0XHRVdGlscy5pbnNlcnRDU1MgXCJcIlwiIFxuXHRcdFx0LmZyYW1lckxheWVyIHsgXG5cdFx0XHRcdHBvaW50ZXItZXZlbnRzOiBhbGwgIWltcG9ydGFudDsgXG5cdFx0XHRcdH0gXG5cblx0XHRcdC5EZXZpY2VDb250ZW50IHtcblx0XHRcdFx0cG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgXG5cdFx0XHRcdH1cblxuXHRcdFx0LkRldmljZUJhY2tncm91bmQge1xuXHRcdFx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0XHRcdFx0fVxuXG5cdFx0XHQuRGV2aWNlSGFuZHMge1xuXHRcdFx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0XHRcdFx0fVxuXG5cdFx0XHQuRGV2aWNlQ29tcG9uZW50UG9ydCB7XG5cdFx0XHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHRcdFx0fVxuXG5cdFx0XHQuSWdub3JlUG9pbnRlckV2ZW50cyB7XG5cdFx0XHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHRcdFx0fVxuXHRcdFx0XCJcIlwiXG5cblx0dG9nZ2xlOiAoZXZlbnQpID0+XG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiYFwiXG5cdFx0XHRpZiBAZW5hYmxlZCB0aGVuIEBkaXNhYmxlKCkgZWxzZSBAZW5hYmxlKClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCIvXCJcblx0XHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdFx0aWYgQGhvdmVyZWRFbGVtZW50IGlzIEBzZWxlY3RlZEVsZW1lbnRcblx0XHRcdFx0QGRlc2VsZWN0KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNlbGVjdCgpXG5cblx0XHRcdHJldHVyblxuXG5cblx0cmVzZXRMYXllcnM6ID0+XG5cdFx0QGxheWVycyA9IFtdXG5cblx0XHRmb3IgbGF5ZXIgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnNcblx0XHRcdEBsYXllcnMucHVzaCBsYXllclxuXG5cdGVuYWJsZTogPT5cblxuXHRcdEByZXNldExheWVycygpXG5cblx0XHRAZW5hYmxlZCA9IHRydWVcblx0XHRAc3BlY1BhbmVsLnBhbmVsLnN0eWxlLm9wYWNpdHkgPSAnMSdcblx0XHRAZm9jdXMoKVxuXG5cdGRpc2FibGU6ID0+XG5cblx0XHRAZW5hYmxlZCA9IGZhbHNlXG5cdFx0QHNwZWNQYW5lbC5wYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzAnXG5cdFx0QHVuZm9jdXMoKVxuXG5cblx0Z2V0TGF5ZXJGcm9tRWxlbWVudDogKGVsZW1lbnQpID0+XG5cdFx0aWYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyYW1lckxheWVyJylcblx0XHRcdGxheWVyID0gXy5maW5kKEBsYXllcnMsIFsnX2VsZW1lbnQnLCBlbGVtZW50XSlcblx0XHRlbHNlXG5cdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlPy5wYXJlbnROb2RlPy5wYXJlbnROb2RlXG5cdFx0XHRsYXllciA9IF8uZmluZChAbGF5ZXJzLCBbJ19lbGVtZW50JywgZWxlbWVudF0pXG5cblx0XHRyZXR1cm4gbGF5ZXIgXG5cblx0Y2xpY2tIb3ZlcmVkRWxlbWVudDogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdGlmIEBob3ZlcmVkRWxlbWVudCBpcyBAc2VsZWN0ZWRFbGVtZW50XG5cdFx0XHRAZGVzZWxlY3QoKVxuXHRcdGVsc2Vcblx0XHRcdEBkZXNlbGVjdCgpXG5cdFx0XHRVdGlscy5kZWxheSAwLCA9PiBAc2VsZWN0KClcblxuXHRzZWxlY3Q6IChldmVudCkgPT5cblx0XHRAc2VsZWN0ZWRFbGVtZW50ID0gQGhvdmVyZWRFbGVtZW50XG5cdFx0QGZvY3VzKClcblxuXHRkZXNlbGVjdDogKGV2ZW50KSA9PlxuXHRcdEBzZWxlY3RlZEVsZW1lbnQgPSB1bmRlZmluZWRcblx0XHRAZm9jdXMoKVxuXG5cdGdldERpbWVuc2lvbnM6IChlbGVtZW50KSA9PlxuXHRcdGQgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRkaW1lbnNpb25zID0ge1xuXHRcdFx0eDogZC5sZWZ0XG5cdFx0XHR5OiBkLnRvcFxuXHRcdFx0d2lkdGg6IGQud2lkdGhcblx0XHRcdGhlaWdodDogZC5oZWlnaHRcblx0XHRcdG1pZFg6IGQubGVmdCArIChkLndpZHRoIC8gMilcblx0XHRcdG1pZFk6IGQudG9wICsgKGQuaGVpZ2h0IC8gMilcblx0XHRcdG1heFg6IGQubGVmdCArIGQud2lkdGhcblx0XHRcdG1heFk6IGQudG9wICsgZC5oZWlnaHRcblx0XHRcdGZyYW1lOiBkXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpbWVuc2lvbnNcblxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cdFx0bGluZSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXX1cIlxuXHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgcG9pbnRBWzBdIGlzIHBvaW50QlswXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF0gLSA0fSAje3BvaW50QVsxXX0gTCAje3BvaW50QVswXSArIDV9ICN7cG9pbnRBWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA0fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0ZWxzZSBpZiBwb2ludEFbMV0gaXMgcG9pbnRCWzFdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV0gLSA0fSBMICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXX0gI3twb2ludEJbMV0gLSA0fSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0bWFrZUxhYmVsOiAoeCwgeSwgdGV4dCkgPT5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogeFxuXHRcdFx0eTogeVxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogQGZvbnRGYW1pbHlcblx0XHRcdCdmb250LXNpemUnOiBAZm9udFNpemVcblx0XHRcdCdmb250LXdlaWdodCc6IEBmb250V2VpZ2h0XG5cdFx0XHRmaWxsOiBAc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdHRleHQ6ICh0ZXh0IC8gQHJhdGlvKS50b0ZpeGVkKClcblxuXHRcdGwgPSBAZ2V0RGltZW5zaW9ucyhsYWJlbC5lbGVtZW50KVxuXG5cdFx0bGFiZWwueCA9IHggLSBsLndpZHRoIC8gMlxuXHRcdGxhYmVsLnkgPSB5ICsgbC5oZWlnaHQgLyA0XG5cblx0XHRib3ggPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IGxhYmVsLnggLSBAcGFkZGluZy5sZWZ0XG5cdFx0XHR5OiBsYWJlbC55IC0gbC5oZWlnaHRcblx0XHRcdHdpZHRoOiBsLndpZHRoICsgQHBhZGRpbmcubGVmdCArIEBwYWRkaW5nLnJpZ2h0XG5cdFx0XHRoZWlnaHQ6IGwuaGVpZ2h0ICsgQHBhZGRpbmcudG9wICsgQHBhZGRpbmcuYm90dG9tXG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IEBjb2xvclxuXG5cdFx0bGFiZWwuc2hvdygpXG5cblx0c2hvd0Rpc3RhbmNlczogKHNlbGVjdGVkLCBob3ZlcmVkKSA9PlxuXG5cdFx0cyA9IEBnZXREaW1lbnNpb25zKEBzZWxlY3RlZEVsZW1lbnQpXG5cdFx0aCA9IEBnZXREaW1lbnNpb25zKEBob3ZlcmVkRWxlbWVudClcblxuXHRcdEByYXRpbyA9IEBzY3JlZW5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRpZiBAc2VsZWN0ZWRFbGVtZW50IGlzIEBob3ZlcmVkRWxlbWVudFxuXHRcdFx0aCA9IEBnZXREaW1lbnNpb25zKEBzY3JlZW5FbGVtZW50KVxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSkudG9GaXhlZCgpXG5cdFx0XHRtID0gcy55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFggLSBoLm1heFgpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IGgubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy5tYXhYIC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhZIC0gaC5tYXhZKS50b0ZpeGVkKClcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0QG1ha2VCb3VuZGluZ1JlY3RzKHMsIGgpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIGhvdmVyZWQgZWxlbWVudCBjb250YWlucyBzZWxlY3RlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPiBoLnggYW5kIHMubWF4WCA8IGgubWF4WCBhbmQgcy55ID4gaC55IGFuZCBzLm1heFkgPCBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSkudG9GaXhlZCgpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBzLm1pZFldLCBbaC5tYXhYIC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC5tYXhZIC0gcy5tYXhZKS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBzLm1heFkgKyA1XSwgW3MubWlkWCwgaC5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdFx0QG1ha2VCb3VuZGluZ1JlY3RzKHMsIGgpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGhvdmVyZWQgZWxlbWVudFxuXHRcdFxuXHRcdCMgdG9wXG5cblx0XHRpZiBzLnkgPiBoLm1heFlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgubWF4WSkudG9GaXhlZCgpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC5tYXhZICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdGlmIGgueCA8IHMueFxuXHRcdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHQjIGxlZnRcblxuXHRcdGlmIHMueCA+IGgubWF4WFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC5tYXhYKS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54ID4gaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0aWYgcy55ID4gaC5tYXhZXG5cdFx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIHMubWlkWV0sIFtzLnggLSA0LCBzLm1pZFldKVxuXHRcdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdCMgcmlnaHRcblxuXHRcdGlmIHMubWF4WCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy5tYXhYKS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgcy5taWRZXSwgW2gueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpLnRvRml4ZWQoKVxuXHRcdFx0bSA9IHMueCArIChkIC8gMilcblxuXHRcdFx0aWYgcy55ID4gaC5tYXhZXG5cdFx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIHMubWlkWV0sIFtoLnggLSA0LCBzLm1pZFldKVxuXHRcdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdCMgYm90dG9tXG5cblx0XHRpZiBzLm1heFkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMubWF4WSkudG9GaXhlZCgpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KS50b0ZpeGVkKClcblx0XHRcdG0gPSBzLnkgKyAoZCAvIDIpXG5cblx0XHRcdGlmIGgueCA8IHMueFxuXHRcdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRAbWFrZUJvdW5kaW5nUmVjdHMocywgaClcblxuXHRtYWtlQm91bmRpbmdSZWN0czogKHMsIGgpID0+XG5cblx0XHRob3ZlcmVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IGN0eFxuXHRcdFx0eDogaC54ICsgMVxuXHRcdFx0eTogaC55ICsgMVxuXHRcdFx0d2lkdGg6IGgud2lkdGggLSAyXG5cdFx0XHRoZWlnaHQ6IGguaGVpZ2h0IC0gMlxuXHRcdFx0c3Ryb2tlOiAnYmx1ZSdcblx0XHRcdGZpbGw6ICdub25lJ1xuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBjdHhcblx0XHRcdHg6IHMueCArIDFcblx0XHRcdHk6IHMueSArIDFcblx0XHRcdHdpZHRoOiBzLndpZHRoIC0gMlxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodCAtIDJcblx0XHRcdHN0cm9rZTogJ3JlZCdcblx0XHRcdGZpbGw6ICdub25lJ1xuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0c2V0UGFuZWxQcm9wZXJ0aWVzOiAoKSA9PlxuXHRcdGggPSBAaG92ZXJlZExheWVyXG5cdFx0aGUgPSBAaG92ZXJlZEVsZW1lbnRcblx0XHRzID0gQHNlbGVjdGVkTGF5ZXJcblx0XHRzZSA9IEBzZWxlY3RlZEVsZW1lbnRcblxuXHRcdGlmIG5vdCBzPyBhbmQgbm90IGg/XG5cdFx0XHRAc3BlY1BhbmVsLmNsZWFyUHJvcHMoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBoPyBhbmQgbm90IHM/XG5cdFx0XHRfLmFzc2lnbiBAc3BlY1BhbmVsLFxuXHRcdFx0XHR4OiBoLnhcblx0XHRcdFx0eTogaC55XG5cdFx0XHRcdHdpZHRoOiBoLnNjcmVlbkZyYW1lLndpZHRoXG5cdFx0XHRcdGhlaWdodDogaC5zY3JlZW5GcmFtZS5oZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBoLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRvcGFjaXR5OiBoLm9wYWNpdHlcblx0XHRcdFx0Ym9yZGVyQ29sb3I6IGguYm9yZGVyQ29sb3Jcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IGguYm9yZGVyV2lkdGhcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOiBoLmJvcmRlclJhZGl1c1xuXHRcdFx0XHRzaGFkb3dDb2xvcjogaC5zaGFkb3dDb2xvclxuXHRcdFx0XHRzaGFkb3dTcHJlYWQ6IGguc2hhZG93U3ByZWFkXG5cdFx0XHRcdHNoYWRvd1g6IGguc2hhZG93WFxuXHRcdFx0XHRzaGFkb3dZOiBoLnNoYWRvd1lcblx0XHRcdFx0c2hhZG93Qmx1cjogaC5zaGFkb3dCbHVyXG5cdFx0XHRcdGNvbG9yOiBoLmNvbG9yXG5cdFx0XHRcdGZvbnRGYW1pbHk6IGguZm9udEZhbWlseVxuXHRcdFx0XHRmb250U3R5bGU6IGguZm9udFN0eWxlXG5cdFx0XHRcdGZvbnRTaXplOiBoLmZvbnRTaXplXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IGguZm9udFdlaWdodFxuXHRcdFx0XHRsaW5lSGVpZ2h0OiBoLmxpbmVIZWlnaHRcblx0XHRcdFx0Y29tcG9uZW50TmFtZTogaC5jb25zdHJ1Y3Rvci5uYW1lXG5cblx0XHRcdEBzcGVjUGFuZWwuc2V0VGV4dFN0eWxlcyhoLmZvbnRGYW1pbHkpXG5cblx0XHRcdHJldHVyblxuXG5cblx0Zm9jdXM6IChldmVudCkgPT5cblx0XHRpZiBAZW5hYmxlZCBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuIFxuXG5cdFx0QHVuZm9jdXMoKVxuXG5cdFx0QHNlbGVjdGVkRWxlbWVudCA/PSBAc2NyZWVuRWxlbWVudFxuXHRcdEBob3ZlcmVkRWxlbWVudCA9IChldmVudD8udGFyZ2V0ID8gQGhvdmVyZWRFbGVtZW50KVxuXHRcdFxuXHRcdGlmIG5vdCBAaG92ZXJlZEVsZW1lbnRcblx0XHRcdHJldHVyblxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChAc2VsZWN0ZWRFbGVtZW50KVxuXHRcdEBob3ZlcmVkTGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChAaG92ZXJlZEVsZW1lbnQpXG5cdFx0QHNldFBhbmVsUHJvcGVydGllcygpXG5cblx0XHRAc2hvd0Rpc3RhbmNlcyhAc2VsZWN0ZWRFbGVtZW50LCBAaG92ZXJlZEVsZW1lbnQpXG5cblx0XHRpZiBAc2NyZWVuRWxlbWVudCBpcyBAaG92ZXJlZEVsZW1lbnRcblx0XHRcdHJldHVyblxuXG5cdHVuZm9jdXM6IChldmVudCkgPT5cblx0XHRjdHgucmVtb3ZlQWxsKClcblxuXG5leHBvcnRzLmZyYXBsaW4gPSBuZXcgRnJhcGxpblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURFQSxJQUFBLDBMQUFBO0VBQUE7Ozs7QUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUFBOztBQUVBLFVBQUEsR0FBYTs7QUFFUDtFQUNRLG9CQUFDLE9BQUQ7QUFDWixRQUFBOztNQURhLFVBQVU7OztJQUN2QixJQUFDLENBQUEsYUFBRCxHQUFpQjtJQUVqQixJQUFDLENBQUEsTUFBRCxH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
