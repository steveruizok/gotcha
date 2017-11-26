require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecPanel, accordionsOpen, device, deviceType, gotcha, pAccordian, pColor, pDiv, pDivider, pImage, pInput, pLabel, pRow, pSelect, pSpan, panel, ref, secretBox, startOpen, svgContext, viewC,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

deviceType = window.localStorage.deviceType;

if (deviceType != null) {
  device = Framer.DeviceComponent.Devices[deviceType];
  Framer.Device._context.devicePixelRatio = device.devicePixelRatio;
  Framer.Device.deviceType = deviceType;
  window.localStorage.device = void 0;
}

Framer.Extras.Hints.disable();

svgContext = void 0;

startOpen = false;

accordionsOpen = false;

if ((ref = document.getElementsByClassName('DevicePhone')[0]) != null) {
  ref.classList.add('IgnorePointerEvents');
}


/* -------------------------------------------

  	.d88888b  dP     dP  .88888.      a88888b.                                                                    dP
  	88.    "' 88     88 d8'   `88    d8'   `88                                                                    88
  	`Y88888b. 88    .8P 88           88        .d8888b. 88d8b.d8b. 88d888b. .d8888b. 88d888b. .d8888b. 88d888b. d8888P .d8888b.
  	      `8b 88    d8' 88   YP88    88        88'  `88 88'`88'`88 88'  `88 88'  `88 88'  `88 88ooood8 88'  `88   88   Y8ooooo.
  	d8'   .8P 88  .d8P  Y8.   .88    Y8.   .88 88.  .88 88  88  88 88.  .88 88.  .88 88    88 88.  ... 88    88   88         88
  	 Y88888P  888888'    `88888'      Y88888P' `88888P' dP  dP  dP 88Y888P' `88888P' dP    dP `88888P' dP    dP   dP   `88888P'
  	                                                               88
  	                                                               dP
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

Utils.insertCSS("\n.logo {\n	opacity: .4;\n}\n\n.logo:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}\n\n.dropdown {\n	opacity: 0;\n}\n\n#pContainer {\n	position: fixed;\n	right: 0;\n	width: 224px;\n	height: 100%;\n	font-family: 'Helvetica Neue';\n	font-size: 11px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n	overflow: scroll;\n	padding-top: 8px;\n}\n\n.pDiv {\n	display: block;\n	width: 100%;\n}\n\n.hidden {\n	display: none;\n}\n\n.pRow {\n	width: 100%;\n	height: 32px;\n}\n\n.pSpan {\n	position: absolute;\n	color: #888888;\n	font-weight: 400;\n	letter-spacing: .5px;\n	padding-left: 8px;\n	margin-top: 2px;\n}\n\n.pLabel {\n	position: absolute;\n	text-align: right;\n	font-size: 10px;\n	width: none;\n	margin-top: 2px;\n	margin-right: 8px;\n	z-index: 10;\n	pointer-events: none;\n}\n\n.pInput {\n	background-color: #292929;\n	border: 1px solid #000;\n	color: #555555;\n	padding: 4px;\n	position: absolute;\n	border-radius: 4px;\n	outline: none;\n	margin-top: 4px;\n}\n\n.pInput:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n}\n\n.right {\n	right: 8px;\n	width: 48px;\n}\n\n.left {\n	right: 72px;\n	width: 48px;\n}\n\n.alignLeft {\n	text-align: left;\n}\n\n.full {\n	right: 8px;\n	width: 112px;\n}\n\n.pImage {\n	display: block;\n	margin-left: 8px;\n	height: auto;\n	width: 196px;\n	overflow: hidden;\n	background-color: #292929;\n	border: 1px solid #000;\n	border-radius: 4px;\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n	padding: 4px;\n}\n\n.pImage:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n	outline: 2px solid #292929;\n}\n\n.pColor {\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n}\n\n.pColor:hover {\n	outline: 2px solid #292929;\n	color: #48cfff;\n}\n\n.pSelect {\n	position: absolute;\n	right: 8px;\n	width: 122px;\n	color: #555555;\n	background-color: #292929;\n	-webkit-appearance: none;\n	border: 1px solid #000;\n	padding: 4px;\n	border-radius: 4px;\n	outline: none;\n}\n\n.pDivider {\n	height: 1px;\n	background-color: #000;\n	margin: 16px 8px 16px 8px;\n}\n\n.pAccordian {\n	border-top: 1px solid #141414;\n	border-bottom: 1px solid #141414;\n	height: auto;\n	min-height: 32px;\n	background-color: #1D1D1D;\n	margin-top: 16px;\n}\n\n.pAccordianBody {\n	display: none;\n	height: auto;\n	margin-top: 32px;\n	padding-top: 4px;\n	background-color: #141414;\n}\n\n.active {\n	display: block;\n	height: auto;\n}\n\n.hasValue {\n	color: #FFF;\n}\n\n.socialLinks {\n	background-color: #141414;\n	position: fixed;\n	bottom: 0px;\n	right: 0px;\n	padding-top: 4px;\n	z-index: 100;\n}\n");

pDiv = (function() {
  function pDiv(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0
    });
    this.element = document.createElement('div');
    this.element.classList.add("pDiv");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, "visible", {
      get: function() {
        return this._visible;
      },
      set: function(bool) {
        if (bool === this._visible) {
          return;
        }
        this._visible = bool;
        if (bool) {
          this.element.classList.remove('hidden');
          return;
        }
        return this.element.classList.add('hidden');
      }
    });
  }

  return pDiv;

})();

pRow = (function(superClass) {
  extend(pRow, superClass);

  function pRow(options) {
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      text: 'Label'
    });
    pRow.__super__.constructor.call(this, options);
    this.element.classList.remove("pDiv");
    this.element.classList.add("pRow");
    this.label = new pSpan({
      parent: this,
      text: options.text
    });
  }

  return pRow;

})(pDiv);

pDivider = (function() {
  function pDivider(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0
    });
    this.element = document.createElement('div');
    this.element.classList.add("pDivider");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pDivider;

})();

pSpan = (function() {
  function pSpan(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0,
      text: 'hello world'
    });
    this.element = document.createElement('span');
    this.element.classList.add("pSpan");
    this.element.textContent = options.text;
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pSpan;

})();

pLabel = (function() {
  function pLabel(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: void 0,
      className: null,
      text: 'x',
      "for": void 0
    });
    this.element = document.createElement('label');
    this.element.classList.add("pLabel");
    this.element.classList.add(options.className);
    _.assign(this.element, {
      textContent: options.text,
      "for": options["for"]
    });
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pLabel;

})();

pInput = (function() {
  function pInput(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      className: 'left',
      value: '',
      unit: 'x',
      "default": '',
      isDefault: true,
      section: void 0
    });
    this.element = document.createElement('input');
    this.element.classList.add("pInput");
    this.element.classList.add(options.className);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    this.unit = new pLabel({
      parent: options.parent,
      className: options.className,
      text: options.unit,
      "for": this.element
    });
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        this._value = value;
        if ((value == null) || value === "") {
          value = String(this["default"]);
        }
        this.element.value = value;
        return Utils.delay(0, (function(_this) {
          return function() {
            var ref3;
            if ((value != null) && !_this.isDefault && value !== "") {
              return (ref3 = _this.section) != null ? ref3.visible = true : void 0;
            }
          };
        })(this));
      }
    });
    Object.defineProperty(this, 'isDefault', {
      get: function() {
        return this._isDefault;
      },
      set: function(bool) {
        this._isDefault = bool;
        if (bool) {
          this.element.classList.remove('hasValue');
          return;
        }
        return this.element.classList.add('hasValue');
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      "default": options["default"],
      section: options.section,
      isDefault: options.isDefault
    });
  }

  return pInput;

})();

pImage = (function() {
  function pImage(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      value: '',
      unit: '',
      section: void 0
    });
    this.element = document.createElement('img');
    this.element.classList.add("pImage");
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref3;
        this._value = value;
        this.element.src = value;
        return (ref3 = this.section) != null ? ref3.visible = value !== '' : void 0;
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      section: options.section
    });
  }

  return pImage;

})();

pColor = (function() {
  function pColor(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      value: '#292929'
    });
    this.element = document.createElement('input');
    this.element.classList.add("pInput");
    this.element.classList.add('pColor');
    this.element.classList.add(options.className);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref3;
        if ((value != null ? value.color : void 0) === 'transparent') {
          value = null;
        }
        if ((value != null) && value !== '') {
          if ((ref3 = this.section) != null) {
            ref3.visible = true;
          }
        }
        this._value = value;
        return this.element.style['background-color'] = value;
      }
    });
    this.element.addEventListener('click', (function(_this) {
      return function() {
        if (!secretBox) {
          return;
        }
        secretBox.value = _this.value;
        secretBox.select();
        document.execCommand('copy');
        return secretBox.blur();
      };
    })(this));
    _.assign(this, {
      value: options.value,
      section: options.section
    });
  }

  return pColor;

})();

pSelect = (function() {
  function pSelect(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    this.makeOptions = bind(this.makeOptions, this);
    _.defaults(options, {
      parent: void 0,
      selected: 0,
      options: ['red', 'white', 'blue'],
      callback: function(value) {
        return null;
      }
    });
    this.element = document.createElement('select');
    this.element.classList.add("pSelect");
    this.element.classList.add('hasValue');
    this.unit = new pLabel({
      parent: options.parent,
      className: 'right',
      text: '▾',
      "for": this.element
    });
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'options', {
      get: function() {
        return this._options;
      },
      set: function(array) {
        this._options = array;
        return this.makeOptions();
      }
    });
    Object.defineProperty(this, 'selected', {
      get: function() {
        return this._selected;
      },
      set: function(num) {
        return this._selected = num;
      }
    });
    _.assign(this, {
      _options: [],
      _optionElements: [],
      options: options.options,
      callback: options.callback,
      selected: options.selected
    });
    this.element.selectedIndex = options.selected;
    this.element.onchange = (function(_this) {
      return function() {
        _this.selected = _this.element.selectedIndex;
        return _this.callback(_this.element.selectedIndex);
      };
    })(this);
  }

  pSelect.prototype.makeOptions = function() {
    var i, j, k, len, len1, o, option, ref1, ref2, results;
    ref1 = this._optionElements;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      option = ref1[i];
      this.element.removeChild(option);
    }
    this._optionElements = [];
    ref2 = this.options;
    results = [];
    for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
      option = ref2[i];
      o = document.createElement('option');
      o.value = option;
      o.label = option;
      o.innerHTML = option;
      this.element.appendChild(o);
      this._optionElements.push(o);
      if (i === this.selected) {
        results.push(this.value = this.element.options[this.element.selectedIndex].label);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return pSelect;

})();

pAccordian = (function(superClass) {
  extend(pAccordian, superClass);

  function pAccordian(options) {
    if (options == null) {
      options = {};
    }
    this.toggle = bind(this.toggle, this);
    pAccordian.__super__.constructor.call(this, options);
    this.element.classList.add('pAccordian');
    this.element.addEventListener("click", this.toggle);
    _.assign(this, {
      toggled: false
    });
    this.unit = new pLabel({
      parent: this,
      className: 'right',
      text: '▿',
      "for": this.element
    });
    this.body = new pRow({
      parent: this,
      text: ''
    });
    this.body.element.removeChild(this.body.label.element);
    this.element.appendChild(this.body.element);
    this.body.element.classList.add('pAccordianBody');
    this.body.element.addEventListener('click', function(event) {
      return event.stopPropagation();
    });
    if (accordionsOpen) {
      this.toggle();
    }
  }

  pAccordian.prototype.toggle = function() {
    this.toggled = !this.toggled;
    if (this.toggled) {
      this.body.element.classList.add('active');
      this.unit.element.textContent = '▾';
      return;
    }
    if (this.body.element.classList.contains('active')) {
      this.body.element.classList.remove('active');
      return this.unit.element.textContent = '▿';
    }
  };

  return pAccordian;

})(pRow);


/* -------------------------------------------

 	.d88888b                                 888888ba                             dP
 	88.    "'                                88    `8b                            88
 	`Y88888b. 88d888b. .d8888b. .d8888b.    a88aaaa8P' .d8888b. 88d888b. .d8888b. 88
 	      `8b 88'  `88 88ooood8 88'  `""     88        88'  `88 88'  `88 88ooood8 88
 	d8'   .8P 88.  .88 88.  ... 88.  ...     88        88.  .88 88    88 88.  ... 88
 	 Y88888P  88Y888P' `88888P' `88888P'     dP        `88888P8 dP    dP `88888P' dP
 	          88
 	          dP
 */

SpecPanel = (function() {
  function SpecPanel() {
    this.clearProps = bind(this.clearProps, this);
    this.hideDivs = bind(this.hideDivs, this);
    this.showProperty = bind(this.showProperty, this);
    this.showProperties = bind(this.showProperties, this);
    this.showAnimations = bind(this.showAnimations, this);
    var currentSelected, deviceOptions, element, j, key, len, ref1, ref2, row, value;
    this.element = panel;
    this.propLayers = [];
    this._props = {};
    this.frame = this.element.getBoundingClientRect();
    this.defaults = Framer.Device.screen._propertyList();
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
    this.element.style.opacity = startOpen ? '1' : '0';
    this.canvas = document.createElement('canvas');
    deviceOptions = [];
    currentSelected = void 0;
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
      deviceOptions.push(key);
      if (key === Framer.Device.deviceType) {
        currentSelected = deviceOptions.length - 1;
      }
    }
    row = new pRow({
      text: 'Device'
    });
    this.deviceBox = new pSelect({
      parent: row,
      unit: '',
      options: deviceOptions,
      selected: currentSelected,
      callback: (function(_this) {
        return function(index) {
          deviceType = deviceOptions[index];
          device = Framer.DeviceComponent.Devices[deviceType];
          _.assign(window.localStorage, {
            deviceType: deviceType,
            device: device,
            bg: Screen.backgroundColor
          });
          return window.location.reload();
        };
      })(this)
    });
    row = new pRow({
      text: 'Name'
    });
    this.nameBox = new pInput({
      parent: row,
      className: 'full',
      unit: ''
    });
    row = new pRow({
      text: 'Component'
    });
    this.componentNameBox = new pInput({
      parent: row,
      className: 'full',
      unit: ''
    });
    this.componentNamesRow = new pRow({
      text: 'Part of'
    });
    this.componentNamesBox = new pInput({
      parent: this.componentNamesRow,
      className: 'full',
      unit: ''
    });
    new pDivider;
    row = new pRow({
      text: 'Position'
    });
    this.xBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'x'
    });
    this.yBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      text: 'Size'
    });
    this.widthBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'w'
    });
    this.heightBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'h'
    });
    row = new pRow({
      text: 'Background'
    });
    this.backgroundColorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.gradientPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.gradientPropertiesDiv,
      text: 'Gradient'
    });
    this.gradientStartBox = new pColor({
      parent: row,
      className: 'left',
      section: this.gradientPropertiesDiv,
      "default": null
    });
    this.gradientEndBox = new pColor({
      parent: row,
      className: 'right',
      section: this.gradientPropertiesDiv,
      "default": null
    });
    row = new pRow({
      parent: this.gradientPropertiesDiv,
      text: ''
    });
    this.gradientAngleBox = new pInput({
      parent: row,
      className: 'left',
      unit: 'a',
      section: this.gradientPropertiesDiv,
      "default": null
    });
    row = new pRow({
      text: 'Opacity'
    });
    this.opacityBox = new pInput({
      parent: row,
      className: 'left',
      unit: ''
    });
    new pDivider({
      parent: this.filtersDiv
    });
    this.borderPropertiesDiv = new pDiv;
    row = new pRow({
      text: 'Border',
      parent: this.borderPropertiesDiv
    });
    this.borderColorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.borderWidthBox = new pInput({
      parent: row,
      className: 'right',
      unit: 'w',
      section: this.borderPropertiesDiv
    });
    row = new pRow({
      text: 'Radius',
      parent: this.borderPropertiesDiv
    });
    this.borderRadiusBox = new pInput({
      parent: row,
      className: 'left',
      unit: '',
      section: this.borderPropertiesDiv
    });
    this.shadowPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: 'Shadow'
    });
    this.shadowColorBox = new pColor({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left'
    });
    this.shadowSpreadBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'right',
      unit: 's',
      "default": '0'
    });
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: ''
    });
    this.shadowXBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left',
      unit: 'x',
      "default": '0'
    });
    this.shadowYBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'right',
      unit: 'y',
      "default": '0'
    });
    row = new pRow({
      parent: this.shadowPropertiesDiv,
      text: ''
    });
    this.shadowBlurBox = new pInput({
      parent: row,
      section: this.shadowPropertiesDiv,
      className: 'left',
      unit: 'b',
      "default": '0'
    });
    this.textPropertiesDiv = new pDiv;
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Font'
    });
    this.fontFamilyBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: ''
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Color'
    });
    this.colorBox = new pColor({
      parent: row,
      className: 'left'
    });
    this.fontSizeBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: ''
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Style'
    });
    this.fontStyleBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'left',
      unit: ''
    });
    this.fontWeightBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: 'w'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Align'
    });
    this.textAlignBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: '',
      "default": 'left'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Spacing'
    });
    this.letterSpacingBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'left',
      unit: 'lt',
      "default": '1'
    });
    this.lineHeightBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'right',
      unit: 'ln'
    });
    row = new pRow({
      parent: this.textPropertiesDiv,
      text: 'Text'
    });
    this.textBox = new pInput({
      parent: row,
      section: this.textPropertiesDiv,
      className: 'full',
      unit: ''
    });
    this.transformsDiv = new pDiv;
    this.transformsAcco = new pAccordian({
      text: 'Transforms',
      parent: this.transformsDiv
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Scale'
    });
    this.scaleBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.scaleXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x'
    });
    this.scaleYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Rotate'
    });
    this.rotationBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.rotationXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x'
    });
    this.rotationYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Origin'
    });
    this.originXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x'
    });
    this.originYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Skew'
    });
    this.skewBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.skewXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x'
    });
    this.skewYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Perspective'
    });
    this.perspectiveBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: '',
      "default": ''
    });
    this.filtersDiv = new pDiv;
    this.filtersAcco = new pAccordian({
      parent: this.filtersDiv,
      text: 'Filters'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Blur'
    });
    this.blurBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Brightness'
    });
    this.brightnessBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Contrast'
    });
    this.contrastBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Grayscale'
    });
    this.grayscaleBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'hueRotate'
    });
    this.hueRotateBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Invert'
    });
    this.invertBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Saturate'
    });
    this.saturateBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Sepia'
    });
    this.sepiaBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: ''
    });
    this.effectsDiv = new pDiv;
    this.effectsAcco = new pAccordian({
      text: 'Effects',
      parent: this.effectsDiv
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Blending'
    });
    this.blendingBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'full',
      unit: '',
      "default": 'normal'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Blur'
    });
    this.backgroundBlurBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Brightness'
    });
    this.backgroundBrightnessBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Saturate'
    });
    this.backgroundSaturateBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'hueRotate'
    });
    this.backgroundHueRotateBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Contrast'
    });
    this.backgroundContrastBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Invert'
    });
    this.backgroundInvertBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Grayscale'
    });
    this.backgroundGrayscaleBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Sepia'
    });
    this.backgroundSepiaBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: ''
    });
    this.animsDiv = new pDiv;
    this.animsAcco = new pAccordian({
      text: 'Animations',
      parent: this.animsDiv
    });
    this.imagePropertiesDiv = new pDiv;
    new pDivider({
      parent: this.imagePropertiesDiv
    });
    this.imageBox = new pImage({
      parent: this.imagePropertiesDiv,
      section: this.imagePropertiesDiv
    });
    this.screenshotDiv = new pDiv;
    this.screenshotBox = new pImage({
      parent: this.screenshotDiv,
      section: this.screenshotDiv
    });
    row = new pRow({
      text: ''
    });
    row.element.style.height = '64px';
    this.socialMediaRow = new pRow({
      parent: this.textPropertiesDiv.body,
      text: ''
    });
    this.linkedinIcon = document.createElement('a');
    _.assign(this.linkedinIcon, {
      href: "http://www.linkedin.com/in/steveruizok",
      innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" id="linkedin_logo" class="logo" width="20" height="20" fill="rgba(91, 91, 91, 1.000)" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
    });
    this.githubIcon = document.createElement('a');
    _.assign(this.githubIcon, {
      href: "http://github.com/steveruizok/gotcha",
      innerHTML: '<svg height="20px" width="20px" id="github_logo" class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="rgba(91, 91, 91, 1.000)" d="M512 0C229.25 0 0 229.25 0 512c0 226.25 146.688 418.125 350.156 485.812 25.594 4.688 34.938-11.125 34.938-24.625 0-12.188-0.469-52.562-0.719-95.312C242 908.812 211.906 817.5 211.906 817.5c-23.312-59.125-56.844-74.875-56.844-74.875-46.531-31.75 3.53-31.125 3.53-31.125 51.406 3.562 78.47 52.75 78.47 52.75 45.688 78.25 119.875 55.625 149 42.5 4.654-33 17.904-55.625 32.5-68.375C304.906 725.438 185.344 681.5 185.344 485.312c0-55.938 19.969-101.562 52.656-137.406-5.219-13-22.844-65.094 5.062-135.562 0 0 42.938-13.75 140.812 52.5 40.812-11.406 84.594-17.031 128.125-17.219 43.5 0.188 87.312 5.875 128.188 17.281 97.688-66.312 140.688-52.5 140.688-52.5 28 70.531 10.375 122.562 5.125 135.5 32.812 35.844 52.625 81.469 52.625 137.406 0 196.688-119.75 240-233.812 252.688 18.438 15.875 34.75 47 34.75 94.75 0 68.438-0.688 123.625-0.688 140.5 0 13.625 9.312 29.562 35.25 24.562C877.438 930 1024 738.125 1024 512 1024 229.25 794.75 0 512 0z" /></svg>'
    });
    this.twitterIcon = document.createElement('a');
    _.assign(this.twitterIcon, {
      href: "http://twitter.com/steveruizok",
      innerHTML: '<svg height="28px" width="28px" id="twitter_logo" class="logo" data-name="Logo — FIXED" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><style>.cls-1{fill:none;}.cls-2{fill:rgba(91, 91, 91, 1.000);}</style></defs><title>Twitter_Logo_Blue</title><rect class="cls-1" width="400" height="400"/><path class="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"/></svg>'
    });
    ref2 = [this.linkedinIcon, this.githubIcon, this.twitterIcon];
    for (j = 0, len = ref2.length; j < len; j++) {
      element = ref2[j];
      this.socialMediaRow.element.appendChild(element);
      this.socialMediaRow.element.classList.add('socialLinks');
    }
    this.hideDivs();
    this.clearProps();
  }

  SpecPanel.prototype.showAnimations = function(animations) {
    var child, j, len, ref1;
    this.animsDiv.visible = animations.length > 0;
    ref1 = this.animsAcco.body.element.childNodes;
    for (j = 0, len = ref1.length; j < len; j++) {
      child = ref1[j];
      if (!child) {
        continue;
      }
      this.animsAcco.body.element.removeChild(child);
    }
    return Utils.delay(0, (function(_this) {
      return function() {
        var anim, box, element, fromUnit, i, k, key, len1, len2, n, options, properties, ref2, results, row, stateA, stateB, toUnit, value;
        results = [];
        for (i = k = 0, len1 = animations.length; k < len1; i = ++k) {
          anim = animations[i];
          properties = anim.properties;
          options = anim.options;
          stateA = anim._stateA;
          stateB = anim._stateB;
          row = new pRow({
            parent: _this.animsAcco.body,
            text: 'Animation ' + (i + 1)
          });
          fromUnit = new pLabel({
            parent: row,
            className: 'left',
            text: 'from'
          });
          toUnit = new pLabel({
            parent: row,
            className: 'right',
            text: 'to'
          });
          ref2 = [fromUnit.element, toUnit.element];
          for (n = 0, len2 = ref2.length; n < len2; n++) {
            element = ref2[n];
            element.classList.add('alignLeft');
          }
          for (key in properties) {
            value = properties[key];
            switch (key) {
              case 'gradient':
                row = new pRow({
                  parent: _this.animsAcco.body,
                  text: 'Grad Start'
                });
                box = new pInput({
                  parent: row,
                  className: 'left',
                  unit: '',
                  value: stateA[key].start,
                  isDefault: false
                });
                box = new pInput({
                  parent: row,
                  className: 'right',
                  unit: '',
                  value: stateB[key].start,
                  isDefault: false
                });
                row = new pRow({
                  parent: _this.animsAcco.body,
                  text: 'Grad End'
                });
                box = new pInput({
                  parent: row,
                  className: 'left',
                  unit: '',
                  value: stateA[key].end,
                  isDefault: false
                });
                box = new pInput({
                  parent: row,
                  className: 'right',
                  unit: '',
                  value: stateB[key].end,
                  isDefault: false
                });
                row = new pRow({
                  parent: _this.animsAcco.body,
                  text: 'Grad Angle'
                });
                box = new pInput({
                  parent: row,
                  className: 'left',
                  unit: '',
                  value: stateA[key].angle,
                  isDefault: false
                });
                box = new pInput({
                  parent: row,
                  className: 'right',
                  unit: '',
                  value: stateB[key].angle,
                  isDefault: false
                });
                break;
              default:
                row = new pRow({
                  parent: _this.animsAcco.body,
                  text: _.startCase(key)
                });
                box = new pInput({
                  parent: row,
                  className: 'left',
                  unit: '',
                  value: stateA[key],
                  isDefault: false
                });
                box = new pInput({
                  parent: row,
                  className: 'right',
                  unit: '',
                  value: stateB[key],
                  isDefault: false
                });
            }
          }
          row = new pRow({
            parent: _this.animsAcco.body,
            text: 'Options'
          });
          box = new pInput({
            parent: row,
            className: 'left',
            unit: 's',
            value: options.time,
            isDefault: false
          });
          box = new pInput({
            parent: row,
            className: 'right',
            unit: 'd',
            value: options.delay,
            isDefault: false
          });
          row = new pRow({
            parent: _this.animsAcco.body,
            text: ''
          });
          box = new pInput({
            parent: row,
            className: 'left',
            unit: 'r',
            value: options.repeat,
            isDefault: false
          });
          box = new pInput({
            parent: row,
            className: 'right',
            unit: 'l',
            value: options.looping,
            isDefault: false
          });
          if (i !== animations.length - 1) {
            results.push(new pDivider({
              parent: _this.animsAcco.body
            }));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
    })(this));
  };

  SpecPanel.prototype.showProperties = function(layer, customProps) {
    var def, defaults, key, propLayer, props, ref1, ref2, results, value;
    props = layer.props;
    _.assign(props, customProps);
    defaults = layer._propertyList();
    _.assign(defaults, {
      rotation: defaults.rotationZ,
      blending: {
        "default": 'normal'
      }
    });
    this.hideDivs();
    ref1 = _.merge(layer.props, customProps);
    results = [];
    for (key in ref1) {
      value = ref1[key];
      propLayer = this[key + 'Box'];
      if (!propLayer) {
        continue;
      }
      def = (ref2 = defaults[key]) != null ? ref2["default"] : void 0;
      results.push(this.showProperty(key, value, propLayer, def));
    }
    return results;
  };

  SpecPanel.prototype.showProperty = function(key, value, propLayer, def) {
    var ref1;
    propLayer.isDefault = false;
    if ((value == null) || _.isNaN(value) || value === def) {
      value = def != null ? def : '';
      propLayer.isDefault = true;
    }
    if (Color.isColor(value)) {
      value = value.toHslString();
    }
    if ((value != null ? (ref1 = value.constructor) != null ? ref1.name : void 0 : void 0) === 'Gradient') {
      propLayer.value = '';
      return;
    }
    if (typeof value === 'string') {
      propLayer.value = value;
      return;
    }
    value = value.toString();
    if (value.indexOf('.') !== -1) {
      propLayer.value = parseFloat(value).toFixed(2);
      return;
    }
    return propLayer.value = parseInt(value, 10).toFixed();
  };

  SpecPanel.prototype.hideDivs = function() {
    var div, j, len, ref1, results;
    ref1 = [this.gradientPropertiesDiv, this.textPropertiesDiv, this.shadowPropertiesDiv, this.imagePropertiesDiv, this.filtersDiv, this.transformsDiv, this.borderPropertiesDiv, this.effectsDiv, this.screenshotDiv];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      div = ref1[j];
      results.push(div.visible = false);
    }
    return results;
  };

  SpecPanel.prototype.clearProps = function() {
    var j, len, prop, ref1, results;
    ref1 = this.propLayers;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      prop = ref1[j];
      results.push(prop.value = void 0);
    }
    return results;
  };

  return SpecPanel;

})();


/* -------------------------------------------

	 .88888.             dP            dP
	d8'   `88            88            88
	88        .d8888b. d8888P .d8888b. 88d888b. .d8888b.
	88   YP88 88'  `88   88   88'  `"" 88'  `88 88'  `88
	Y8.   .88 88.  .88   88   88.  ... 88    88 88.  .88
	 `88888'  `88888P'   dP   `88888P' dP    dP `8888888
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
    this.getScreenshot = bind(this.getScreenshot, this);
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
    svgContext.setContext();
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
    this.specPanel.element.style.opacity = opacity;
    return Canvas.backgroundColor = Color.mix(this._canvasColor, 'rgba(30, 30, 30, 1.000)', factor);
  };

  Gotcha.prototype.update = function() {
    if (!this.opened) {
      return;
    }
    Framer.Device.hands.midX -= 122;
    svgContext.setContext();
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
      parent: svgContext,
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
      parent: svgContext,
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
      parent: svgContext,
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
      parent: svgContext,
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
    var animations, customProps, layer, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
    if ((this.selectedLayer != null) && this.selectedLayer !== Framer.Device.screen) {
      layer = this.selectedLayer;
    } else if (this.hoveredLayer != null) {
      layer = this.hoveredLayer;
    } else {
      this.specPanel.clearProps();
      return;
    }
    if (layer === this.lastLayer) {
      return;
    }
    this.lastLayer = layer;
    customProps = {
      x: layer.screenFrame.x,
      y: layer.screenFrame.y,
      componentName: layer.constructor.name,
      componentNames: this.getComponentFromLayer(layer.parent),
      parentName: (ref1 = layer.parent) != null ? ref1.name : void 0,
      rotation: layer.rotationZ,
      textAlign: (ref2 = layer.props.styledTextOptions) != null ? ref2.alignment : void 0,
      blending: layer.blending
    };
    if (layer.gradient != null) {
      _.assign(customProps, {
        gradientStart: layer.gradient.start,
        gradientEnd: layer.gradient.end,
        gradientAngle: layer.gradient.angle
      });
    }
    if (layer.shadows != null) {
      _.assign(customProps, {
        shadowX: (ref3 = layer.shadows[0]) != null ? ref3.x : void 0,
        shadowY: (ref4 = layer.shadows[0]) != null ? ref4.y : void 0,
        shadowSpread: (ref5 = layer.shadows[0]) != null ? ref5.spread : void 0,
        shadowColor: (ref6 = layer.shadows[0]) != null ? ref6.color : void 0,
        shadowType: (ref7 = layer.shadows[0]) != null ? ref7.type : void 0,
        shadowBlur: (ref8 = layer.shadows[0]) != null ? ref8.blur : void 0
      });
    }
    this.specPanel.showProperties(layer, customProps);
    animations = layer.animations();
    return this.specPanel.showAnimations(animations);
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

  Gotcha.prototype.getScreenshot = function(element) {
    var DOMURL, ctx, data, foreignObject, rect, svg, url;
    foreignObject = new SVGShape({
      type: 'foreignObject'
    });
    rect = element.getBoundingClientRect();
    ctx = this.specPanel.canvas.getContext('2d');
    data = ("<svg xmlns='http://www.w3.org/2000/svg' width='" + rect.width + "' height='" + rect.height + "'>") + '<foreignObject width="100%" height="100%">' + '<div xmlns="http://www.w3.org/1999/xhtml">' + element.innerHTML + '</div>' + '</foreignObject>' + '</svg>';
    DOMURL = window.URL || window.webkitURL || window;
    svg = new Blob([data], {
      type: 'image/svg+xml'
    });
    url = DOMURL.createObjectURL(svg);
    return this.specPanel.screenshotBox.value = url;
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
    return svgContext.removeAll();
  };

  return Gotcha;

})();

panel = document.createElement('div');

panel.id = 'pContainer';

viewC = document.getElementById('FramerContextRoot-Default');

Utils.delay(0, (function(_this) {
  return function() {
    return viewC.appendChild(panel);
  };
})(this));

secretBox = document.createElement('input');

document.body.appendChild(secretBox);

svgContext = new SVGContext;

exports.gotcha = gotcha = new Gotcha;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuZGV2aWNlVHlwZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZGV2aWNlVHlwZVxuXG5pZiBkZXZpY2VUeXBlPyBcblx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdEZyYW1lci5EZXZpY2UuX2NvbnRleHQuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZS5kZXZpY2VQaXhlbFJhdGlvXG5cblx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gZGV2aWNlVHlwZVxuXHR3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZSA9IHVuZGVmaW5lZFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5zdmdDb250ZXh0ID0gdW5kZWZpbmVkXG5zdGFydE9wZW4gPSBmYWxzZVxuYWNjb3JkaW9uc09wZW4gPSBmYWxzZVxuXG4jIGRlYnVnZ2luZ1xuXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VQaG9uZScpWzBdPy5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICBcdDg4LiAgICBcIicgODggICAgIDg4IGQ4JyAgIGA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0YFk4ODg4OGIuIDg4ICAgIC44UCA4OCAgICAgICAgICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4gIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIFx0ZDgnICAgLjhQIDg4ICAuZDhQICBZOC4gICAuODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4gIFx0IFk4ODg4OFAgIDg4ODg4OCcgICAgYDg4ODg4JyAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyMjXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIENvbnRleHRcblxuY2xhc3MgU1ZHQ29udGV4dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAc2hhcGVzID0gW11cblxuXHRcdHN2Z0NvbnRleHQgPSBAXG5cblx0XHQjIG5hbWVzcGFjZVxuXHRcdHN2Z05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG5cdFx0XG5cdFx0IyBzZXQgYXR0cmlidXRlcyBcblx0XHRzZXRBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRcdGZvciBrZXksIHZhbHVlIG9mIGF0dHJpYnV0ZXNcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXG5cdFx0IyBDcmVhdGUgU1ZHIGVsZW1lbnRcblxuXHRcdEBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKVxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoQHN2Zylcblx0XHRAc3ZnLnN0eWxlWyd6LWluZGV4J10gPSAnOTk5J1xuXG5cdFx0QGZyYW1lRWxlbWVudCA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuQmFja2dyb3VuZC5fZWxlbWVudFxuXG5cdFx0QHNldENvbnRleHQoKVxuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0c2V0QXR0cmlidXRlczogKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdHNldENvbnRleHQ6ID0+XG5cblx0XHRAbEZyYW1lID0gQGZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0QHNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJDb250ZXh0JylbMF1cblx0XHRzRnJhbWUgPSBAc2NyZWVuRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0QHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdGFkZFNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHNoYXBlcy5wdXNoKHNoYXBlKVxuXHRcdEBzaG93U2hhcGUoc2hhcGUpXG5cdFx0XG5cdHJlbW92ZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QGhpZGVTaGFwZShzaGFwZSlcblx0XHRfLnB1bGwoQHNoYXBlcywgc2hhcGUpXG5cdFx0XG5cdGhpZGVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XG5cdHNob3dTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRcblx0YWRkRGVmOiAoZGVmKSAtPlxuXHRcdEBzdmdEZWZzLmFwcGVuZENoaWxkKGRlZilcblxuXHRyZW1vdmVBbGw6ID0+XG5cdFx0Zm9yIHNoYXBlIGluIEBzaGFwZXNcblx0XHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRAc2hhcGVzID0gW11cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIFNoYXBlXG5cbmNsYXNzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt0eXBlOiAnY2lyY2xlJ30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHBhcmVudCA9IHN2Z0NvbnRleHRcblx0XHRcblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXG5cdFx0XHRvcHRpb25zLnR5cGVcblx0XHRcdClcblxuXHRcdEBzZXRDdXN0b21Qcm9wZXJ0eSgndGV4dCcsICd0ZXh0Q29udGVudCcsICd0ZXh0Q29udGVudCcsIG9wdGlvbnMudGV4dClcblx0XHRcdFx0XG5cdFx0IyBhc3NpZ24gYXR0cmlidXRlcyBzZXQgYnkgb3B0aW9uc1xuXHRcdGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdEBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBwYXJlbnQuYWRkU2hhcGUoQClcblx0XHRcblx0XHRAc2hvdygpXG5cdFx0XHRcblx0c2V0QXR0cmlidXRlOiAoa2V5LCB2YWx1ZSkgPT5cblx0XHRyZXR1cm4gaWYga2V5IGlzICd0ZXh0J1xuXHRcdGlmIG5vdCBAW2tleV0/XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRnZXQ6ID0+XG5cdFx0XHRcdFx0cmV0dXJuIEBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXG5cdFx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0XHRAZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcblx0XHRAW2tleV0gPSB2YWx1ZVxuXHRcblx0c2V0Q3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIHJldHVyblZhbHVlLCBzZXRWYWx1ZSwgc3RhcnRWYWx1ZSkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIHJldHVyblZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGVsZW1lbnRbc2V0VmFsdWVdID0gdmFsdWVcblxuXHRcdEBbdmFyaWFibGVOYW1lXSA9IHN0YXJ0VmFsdWVcblxuXHRoaWRlOiAtPiBcblx0XHRAcGFyZW50LmhpZGVTaGFwZShAKVxuXHRcblx0c2hvdzogLT4gXG5cdFx0QHBhcmVudC5zaG93U2hhcGUoQClcblx0XHRcblx0cmVtb3ZlOiAtPlxuXHRcdEBwYXJlbnQucmVtb3ZlU2hhcGUoQClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGFzaGVkIExpbmVcblxuY2xhc3MgRGFzaGVkTGluZSBleHRlbmRzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAocG9pbnRBLCBwb2ludEIsIGNvbG9yID0gJyMwMDAnLCBvZmZzZXQgPSAwLCBvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmFzc2lnbiBvcHRpb25zLFxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEEueH0gI3twb2ludEEueX0gTCAje3BvaW50Qi54fSAje3BvaW50Qi55fVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblx0XHRcdCdzdHJva2UtZGFzaGFycmF5JzogXCI1LCA1XCJcblx0XHRcdCdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBQYW5lbCBDb21wb25lbnRzXG5cblV0aWxzLmluc2VydENTUyBcIlwiXCJcblxuXHQubG9nbyB7XG5cdFx0b3BhY2l0eTogLjQ7XG5cdH1cblxuXHQubG9nbzpob3ZlciB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHRcblx0I2xpbmtlZGluX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogNjhweDtcblx0fVxuXG5cdFxuXHQjdHdpdHRlcl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA0cHg7XG5cdFx0cmlnaHQ6IDRweDtcblx0fVxuXG5cdCNnaXRodWJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiAzNnB4O1xuXHR9XG5cblx0LmZyYW1lckxheWVyIHsgXG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHR9IFxuXHRcblx0Lklnbm9yZVBvaW50ZXJFdmVudHMge1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHR9XG5cblx0LmRyb3Bkb3duIHtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cblx0I3BDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRyaWdodDogMDtcblx0XHR3aWR0aDogMjI0cHg7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnO1xuXHRcdGZvbnQtc2l6ZTogMTFweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdFx0b3ZlcmZsb3c6IHNjcm9sbDtcblx0XHRwYWRkaW5nLXRvcDogOHB4O1xuXHR9XG5cblx0LnBEaXYge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0LmhpZGRlbiB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuXG5cdC5wUm93IHtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDMycHg7XG5cdH1cblxuXHQucFNwYW4ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRjb2xvcjogIzg4ODg4ODtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdGxldHRlci1zcGFjaW5nOiAuNXB4O1xuXHRcdHBhZGRpbmctbGVmdDogOHB4O1xuXHRcdG1hcmdpbi10b3A6IDJweDtcblx0fVxuXG5cdC5wTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcblx0XHRmb250LXNpemU6IDEwcHg7XG5cdFx0d2lkdGg6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogMnB4O1xuXHRcdG1hcmdpbi1yaWdodDogOHB4O1xuXHRcdHotaW5kZXg6IDEwO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHR9XG5cblx0LnBJbnB1dCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGNvbG9yOiAjNTU1NTU1O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogNHB4O1xuXHR9XG5cblx0LnBJbnB1dDpob3ZlciB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzQ4Y2ZmZjtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5yaWdodCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5sZWZ0IHtcblx0XHRyaWdodDogNzJweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5hbGlnbkxlZnQge1xuXHRcdHRleHQtYWxpZ246IGxlZnQ7XG5cdH1cblxuXHQuZnVsbCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogMTEycHg7XG5cdH1cblxuXHQucEltYWdlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRtYXJnaW4tbGVmdDogOHB4O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHR3aWR0aDogMTk2cHg7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IDRweCBzb2xpZCAjMjkyOTI5O1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAtNHB4O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0fVxuXG5cdC5wSW1hZ2U6aG92ZXIge1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICM0OGNmZmY7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdFx0b3V0bGluZTogMnB4IHNvbGlkICMyOTI5Mjk7XG5cdH1cblxuXHQucENvbG9yIHtcblx0XHRvdXRsaW5lOiA0cHggc29saWQgIzI5MjkyOTtcblx0XHRvdXRsaW5lLW9mZnNldDogLTRweDtcblx0fVxuXG5cdC5wQ29sb3I6aG92ZXIge1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCAjMjkyOTI5O1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHR9XG5cblx0LnBTZWxlY3Qge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiAxMjJweDtcblx0XHRjb2xvcjogIzU1NTU1NTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0fVxuXG5cdC5wRGl2aWRlciB7XG5cdFx0aGVpZ2h0OiAxcHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzAwMDtcblx0XHRtYXJnaW46IDE2cHggOHB4IDE2cHggOHB4O1xuXHR9XG5cblx0LnBBY2NvcmRpYW4ge1xuXHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRtaW4taGVpZ2h0OiAzMnB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxRDFEMUQ7XG5cdFx0bWFyZ2luLXRvcDogMTZweDtcblx0fVxuXG5cdC5wQWNjb3JkaWFuQm9keSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0bWFyZ2luLXRvcDogMzJweDtcblx0XHRwYWRkaW5nLXRvcDogNHB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG5cdH1cblxuXHQuYWN0aXZlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblxuXHQuaGFzVmFsdWUge1xuXHRcdGNvbG9yOiAjRkZGO1xuXHR9XG5cblx0LnNvY2lhbExpbmtzIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRib3R0b206IDBweDtcblx0XHRyaWdodDogMHB4O1xuXHRcdHBhZGRpbmctdG9wOiA0cHg7XG5cdFx0ei1pbmRleDogMTAwO1xuXHR9XG5cblwiXCJcIlxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBEaXZcblxuY2xhc3MgcERpdlxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBEaXZcIilcblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFwidmlzaWJsZVwiLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92aXNpYmxlXG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX3Zpc2libGVcblxuXHRcdFx0XHRAX3Zpc2libGUgPSBib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBSb3dcblxuY2xhc3MgcFJvdyBleHRlbmRzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0ZXh0OiAnTGFiZWwnXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwicERpdlwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUm93XCIpXG5cblx0XHRAbGFiZWwgPSBuZXcgcFNwYW5cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0XG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdmlkZXJcblxuY2xhc3MgcERpdmlkZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2aWRlclwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU3BhblxuXG5jbGFzcyBwU3BhblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHR0ZXh0OiAnaGVsbG8gd29ybGQnXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwU3BhblwiKVxuXHRcdEBlbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9ucy50ZXh0XG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBMYWJlbFxuXG5jbGFzcyBwTGFiZWxcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0Y2xhc3NOYW1lOiBudWxsXG5cdFx0XHR0ZXh0OiAneCdcblx0XHRcdGZvcjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicExhYmVsXCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblx0XHRcblx0XHRfLmFzc2lnbiBAZWxlbWVudCxcblx0XHRcdHRleHRDb250ZW50OiBvcHRpb25zLnRleHRcblx0XHRcdGZvcjogb3B0aW9ucy5mb3JcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIElucHV0XG5cbmNsYXNzIHBJbnB1dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnJ1xuXHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRzZWN0aW9uOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25zLmNsYXNzTmFtZVxuXHRcdFx0dGV4dDogb3B0aW9ucy51bml0XG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRpZiBub3QgdmFsdWU/IG9yIHZhbHVlIGlzIFwiXCJcblx0XHRcdFx0XHR2YWx1ZSA9IFN0cmluZyhAZGVmYXVsdClcblxuXHRcdFx0XHRAZWxlbWVudC52YWx1ZSA9IHZhbHVlXG5cblx0XHRcdFx0VXRpbHMuZGVsYXkgMCwgPT5cblx0XHRcdFx0XHRpZiB2YWx1ZT8gYW5kIG5vdCBAaXNEZWZhdWx0IGFuZCB2YWx1ZSBpc250IFwiXCJcblx0XHRcdFx0XHRcdEBzZWN0aW9uPy52aXNpYmxlID0gdHJ1ZVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J2lzRGVmYXVsdCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX2lzRGVmYXVsdFxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0QF9pc0RlZmF1bHQgPSBib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hhc1ZhbHVlJylcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRALmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzVmFsdWUnKVxuXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRkZWZhdWx0OiBvcHRpb25zLmRlZmF1bHRcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXHRcdFx0aXNEZWZhdWx0OiBvcHRpb25zLmlzRGVmYXVsdFxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBJbWFnZVxuXG5jbGFzcyBwSW1hZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW1hZ2VcIilcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zcmMgPSB2YWx1ZVxuXHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHZhbHVlIGlzbnQgJydcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIENvbG9yIEJveFxuXG5jbGFzcyBwQ29sb3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnIzI5MjkyOSdcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQ29sb3InKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXG5cdFx0XHRcdGlmIHZhbHVlPy5jb2xvciBpcyAndHJhbnNwYXJlbnQnXG5cdFx0XHRcdFx0dmFsdWUgPSBudWxsXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB0cnVlXG5cblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEBlbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2YWx1ZVxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNlbGVjdFxuXG5jbGFzcyBwU2VsZWN0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblx0XHRcdHNlbGVjdGVkOiAwXG5cdFx0XHRvcHRpb25zOiBbJ3JlZCcsICd3aGl0ZScsICdibHVlJ11cblx0XHRcdGNhbGxiYWNrOiAodmFsdWUpIC0+IG51bGxcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFNlbGVjdFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhc1ZhbHVlJylcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa+J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J29wdGlvbnMnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9vcHRpb25zXG5cdFx0XHRzZXQ6IChhcnJheSkgLT5cblx0XHRcdFx0QF9vcHRpb25zID0gYXJyYXlcblx0XHRcdFx0QG1ha2VPcHRpb25zKClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3NlbGVjdGVkJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfc2VsZWN0ZWRcblx0XHRcdHNldDogKG51bSkgLT5cblx0XHRcdFx0QF9zZWxlY3RlZCA9IG51bVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdF9vcHRpb25zOiBbXVxuXHRcdFx0X29wdGlvbkVsZW1lbnRzOiBbXVxuXHRcdFx0b3B0aW9uczogb3B0aW9ucy5vcHRpb25zXG5cdFx0XHRjYWxsYmFjazogb3B0aW9ucy5jYWxsYmFja1xuXHRcdFx0c2VsZWN0ZWQ6IG9wdGlvbnMuc2VsZWN0ZWRcblxuXHRcdEBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBvcHRpb25zLnNlbGVjdGVkXG5cblx0XHRAZWxlbWVudC5vbmNoYW5nZSA9ID0+IFxuXHRcdFx0QHNlbGVjdGVkID0gQGVsZW1lbnQuc2VsZWN0ZWRJbmRleFxuXHRcdFx0QGNhbGxiYWNrKEBlbGVtZW50LnNlbGVjdGVkSW5kZXgpXG5cdFx0XG5cblx0bWFrZU9wdGlvbnM6ID0+XG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBAX29wdGlvbkVsZW1lbnRzXG5cdFx0XHRAZWxlbWVudC5yZW1vdmVDaGlsZChvcHRpb24pXG5cblx0XHRAX29wdGlvbkVsZW1lbnRzID0gW11cblxuXHRcdGZvciBvcHRpb24sIGkgaW4gQG9wdGlvbnNcblx0XHRcdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuXHRcdFx0by52YWx1ZSA9IG9wdGlvblxuXHRcdFx0by5sYWJlbCA9IG9wdGlvblxuXHRcdFx0by5pbm5lckhUTUwgPSBvcHRpb25cblx0XHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKG8pXG5cblx0XHRcdEBfb3B0aW9uRWxlbWVudHMucHVzaChvKVxuXG5cdFx0XHRpZiBpIGlzIEBzZWxlY3RlZFxuXHRcdFx0XHRAdmFsdWUgPSBAZWxlbWVudC5vcHRpb25zW0BlbGVtZW50LnNlbGVjdGVkSW5kZXhdLmxhYmVsXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIEFjY29yZGlhblxuXG5jbGFzcyBwQWNjb3JkaWFuIGV4dGVuZHMgcFJvd1xuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuJylcblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgQHRvZ2dsZVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHRvZ2dsZWQ6IGZhbHNlXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa/J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0QGJvZHkgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdEBib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoQGJvZHkubGFiZWwuZWxlbWVudClcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKEBib2R5LmVsZW1lbnQpXG5cdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuQm9keScpXG5cblx0XHRAYm9keS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2ZW50KSAtPiBcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBhY2NvcmRpb25zT3BlbiB0aGVuIEB0b2dnbGUoKSAjIHN0YXJ0IG9wZW5cblxuXHR0b2dnbGU6ID0+XG5cdFx0QHRvZ2dsZWQgPSAhQHRvZ2dsZWRcblxuXHRcdGlmIEB0b2dnbGVkXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvidcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgQGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvydcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gICAgYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuIFx0ICAgICAgYDhiIDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYFwiXCIgICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OFxuIFx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICAgICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcbiBcdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgICAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG4gXHQgICAgICAgICAgODhcbiBcdCAgICAgICAgICBkUFxuXG4jIyNcblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QGVsZW1lbnQgPSBwYW5lbFxuXHRcdEBwcm9wTGF5ZXJzID0gW11cblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdEBkZWZhdWx0cyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9wcm9wZXJ0eUxpc3QoKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQncHJvcHMnLFxuXHRcdFx0Z2V0OiAtPlxuXHRcdFx0XHRyZXR1cm4gQF9wcm9wc1xuXHRcdFx0c2V0OiAob2JqKSAtPlxuXHRcdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmpcblx0XHRcdFx0XHRpZiBfLmhhcyhAcHJvcHMsIGtleSlcblx0XHRcdFx0XHRcdEBwcm9wc1trZXldID0gdmFsdWVcblxuXHRcdEBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblx0XHRAY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGRldmljZVxuXG5cdFx0IyBTZXQgRGV2aWNlIE9wdGlvbnNcblxuXHRcdGRldmljZU9wdGlvbnMgPSBbXVxuXHRcdGN1cnJlbnRTZWxlY3RlZCA9IHVuZGVmaW5lZFxuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzXG5cdFx0XHRpZiBfLmVuZHNXaXRoKGtleSwgJ2hhbmQnKVxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRpZiBub3QgdmFsdWUubWluU3R1ZGlvVmVyc2lvbj9cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpID4gdmFsdWUubWF4U3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZSBcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpIDwgdmFsdWUubWluU3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZXZpY2VPcHRpb25zLnB1c2ggKGtleSlcblxuXHRcdFx0aWYga2V5IGlzIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQgPSBkZXZpY2VPcHRpb25zLmxlbmd0aCAtIDFcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnRGV2aWNlJ1xuXG5cdFx0QGRldmljZUJveCA9IG5ldyBwU2VsZWN0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0dW5pdDogJydcblx0XHRcdG9wdGlvbnM6IGRldmljZU9wdGlvbnNcblx0XHRcdHNlbGVjdGVkOiBjdXJyZW50U2VsZWN0ZWRcblx0XHRcdGNhbGxiYWNrOiAoaW5kZXgpID0+XG5cdFx0XHRcdGRldmljZVR5cGUgPSBkZXZpY2VPcHRpb25zW2luZGV4XVxuXHRcdFx0XHRkZXZpY2UgPSBGcmFtZXIuRGV2aWNlQ29tcG9uZW50LkRldmljZXNbZGV2aWNlVHlwZV1cblx0XHRcdFx0XG5cdFx0XHRcdF8uYXNzaWduIHdpbmRvdy5sb2NhbFN0b3JhZ2UsXG5cdFx0XHRcdFx0ZGV2aWNlVHlwZTogZGV2aWNlVHlwZVxuXHRcdFx0XHRcdGRldmljZTogZGV2aWNlXG5cdFx0XHRcdFx0Ymc6IFNjcmVlbi5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblxuXHRcdEBuYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cblx0XHRAY29tcG9uZW50TmFtZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBjb21wb25lbnROYW1lc1JvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUGFydCBvZidcblxuXHRcdEBjb21wb25lbnROYW1lc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogQGNvbXBvbmVudE5hbWVzUm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBkaXZpZGVyXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdQb3NpdGlvbidcblxuXHRcdEB4Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNpemVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblxuXHRcdEB3aWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdEBoZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdoJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJhY2tncm91bmQgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnQmFja2dyb3VuZCdcblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmFkaWVudFxuXG5cdFx0QGdyYWRpZW50UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnR3JhZGllbnQnXG5cblx0XHRAZ3JhZGllbnRTdGFydEJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0QGdyYWRpZW50RW5kQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50IGFuZ2xlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGdyYWRpZW50QW5nbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdhJ1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIG9wYWNpdHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblxuXHRcdEBvcGFjaXR5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRuZXcgcERpdmlkZXJcblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBib3JkZXIgcHJvcGVydGllc1xuXG5cdFx0QGJvcmRlclByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHRwYXJlbnQ6IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHRAYm9yZGVyQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBib3JkZXJXaWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXHRcdFx0c2VjdGlvbjogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByYWRpdXNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0cGFyZW50OiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0QGJvcmRlclJhZGl1c0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2hhZG93XG5cblxuXHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXG5cdFx0QHNoYWRvd0NvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QHNoYWRvd1NwcmVhZEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAncydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAc2hhZG93WUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93Qmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdiJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdGV4dCBzdHlsZXNcblxuXHRcdEB0ZXh0UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZm9udCBmYW1pbHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cblx0XHRAZm9udEZhbWlseUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGNvbG9yXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdDb2xvcidcblxuXHRcdEBjb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGZvbnRTaXplQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHdlaWdodFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3R5bGUnXG5cblx0XHRAZm9udFN0eWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRAZm9udFdlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYWxpZ25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0FsaWduJ1xuXG5cdFx0QHRleHRBbGlnbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJ2xlZnQnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc3BhY2luZ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3BhY2luZydcblxuXHRcdEBsZXR0ZXJTcGFjaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdsdCdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0QGxpbmVIZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdsbidcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdUZXh0J1xuXG5cdFx0QHRleHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRyYW5zZm9ybSBwcm9wZXJ0aWVzXG5cblxuXHRcdEB0cmFuc2Zvcm1zRGl2ID0gbmV3IHBEaXZcblxuXHRcdEB0cmFuc2Zvcm1zQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnVHJhbnNmb3Jtcydcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNEaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNjYWxlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NjYWxlJ1xuXG5cdFx0QHNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNjYWxlWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNjYWxlWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByb3RhdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdSb3RhdGUnXG5cblx0XHRAcm90YXRpb25Cb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAcm90YXRpb25YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAcm90YXRpb25ZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgb3JpZ2luXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ09yaWdpbidcblxuXHRcdEBvcmlnaW5YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAb3JpZ2luWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBza2V3XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NrZXcnXG5cblx0XHRAc2tld0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBza2V3WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNrZXdZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBlcnNwZWN0aXZlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1BlcnNwZWN0aXZlJ1xuXG5cdFx0QHBlcnNwZWN0aXZlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcnXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmaWx0ZXJzIHByb3BlcnRpZXNcblxuXG5cdFx0QGZpbHRlcnNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGZpbHRlcnNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblx0XHRcdHRleHQ6ICdGaWx0ZXJzJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJsdXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQmx1cidcblxuXHRcdEBibHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBicmlnaHRuZXNzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYnJpZ2h0bmVzc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29udHJhc3RcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQ29udHJhc3QnXG5cblx0XHRAY29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYXlzY2FsZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdHcmF5c2NhbGUnXG5cblx0XHRAZ3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBodWVyb3RhdGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGh1ZVJvdGF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW52ZXJ0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0ludmVydCdcblxuXHRcdEBpbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNhdHVyYXRlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QHNhdHVyYXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzZXBpYVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBzZXBpYUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZCBmaWx0ZXJzXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBlZmZlY3RzIHByb3BlcnRpZXNcblxuXG5cdFx0QGVmZmVjdHNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGVmZmVjdHNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdFZmZlY3RzJ1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmFja2dyb3VuZCBmaWx0ZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsZW5kaW5nJ1xuXG5cdFx0QGJsZW5kaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICdub3JtYWwnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsdXInXG5cblx0XHRAYmFja2dyb3VuZEJsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYmFja2dyb3VuZEJyaWdodG5lc3NCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QGJhY2tncm91bmRTYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGJhY2tncm91bmRIdWVSb3RhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0NvbnRyYXN0J1xuXG5cdFx0QGJhY2tncm91bmRDb250cmFzdEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnSW52ZXJ0J1xuXG5cdFx0QGJhY2tncm91bmRJbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0dyYXlzY2FsZSdcblxuXHRcdEBiYWNrZ3JvdW5kR3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBiYWNrZ3JvdW5kU2VwaWFCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBhbmltYXRpb24gcHJvcGVydGllc1xuXG5cblx0XHRAYW5pbXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyBuZXcgcERpdmlkZXJcblx0XHQjIFx0cGFyZW50OiBAYW5pbXNEaXZcblxuXHRcdEBhbmltc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ0FuaW1hdGlvbnMnXG5cdFx0XHRwYXJlbnQ6IEBhbmltc0RpdlxuXG5cblxuXHRcdCMgaW1hZ2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBpbWFnZVByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRwYXJlbnQ6IEBpbWFnZVByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBpbWFnZVxuXG5cdFx0QGltYWdlQm94ID0gbmV3IHBJbWFnZVxuXHRcdFx0cGFyZW50OiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cdFx0XHRzZWN0aW9uOiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cblxuXHRcdCMgc2NyZWVuc2hvdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzY3JlZW5zaG90RGl2ID0gbmV3IHBEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzY3JlZW5zaG90XG5cblx0XHRAc2NyZWVuc2hvdEJveCA9IG5ldyBwSW1hZ2Vcblx0XHRcdHBhcmVudDogQHNjcmVlbnNob3REaXZcblx0XHRcdHNlY3Rpb246IEBzY3JlZW5zaG90RGl2XG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwbGFjZWhvbGRlcnNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdHJvdy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICc2NHB4J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNvY2lhbCBtZWRpYSBsaW5rc1xuXG5cdFx0QHNvY2lhbE1lZGlhUm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2LmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAbGlua2VkaW5JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQGxpbmtlZGluSWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vaW4vc3RldmVydWl6b2tcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaWQ9XCJsaW5rZWRpbl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMTEgMTloLTN2LTExaDN2MTF6bS0xLjUtMTIuMjY4Yy0uOTY2IDAtMS43NS0uNzktMS43NS0xLjc2NHMuNzg0LTEuNzY0IDEuNzUtMS43NjQgMS43NS43OSAxLjc1IDEuNzY0LS43ODMgMS43NjQtMS43NSAxLjc2NHptMTMuNSAxMi4yNjhoLTN2LTUuNjA0YzAtMy4zNjgtNC0zLjExMy00IDB2NS42MDRoLTN2LTExaDN2MS43NjVjMS4zOTYtMi41ODYgNy0yLjc3NyA3IDIuNDc2djYuNzU5elwiLz48L3N2Zz4nXG5cblx0XHRAZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEBnaXRodWJJY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpvay9nb3RjaGFcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAdHdpdHRlckljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblxuXHRcdGZvciBlbGVtZW50IGluIFtAbGlua2VkaW5JY29uLCBAZ2l0aHViSWNvbiwgQHR3aXR0ZXJJY29uXVxuXHRcdFx0QHNvY2lhbE1lZGlhUm93LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudClcblx0XHRcdEBzb2NpYWxNZWRpYVJvdy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvY2lhbExpbmtzJylcblxuXHRcdEBoaWRlRGl2cygpXG5cdFx0QGNsZWFyUHJvcHMoKVxuXG5cdHNob3dBbmltYXRpb25zOiAoYW5pbWF0aW9ucykgPT5cblx0XHRcblx0XHRAYW5pbXNEaXYudmlzaWJsZSA9IGFuaW1hdGlvbnMubGVuZ3RoID4gMFxuXHRcblx0XHRmb3IgY2hpbGQgaW4gQGFuaW1zQWNjby5ib2R5LmVsZW1lbnQuY2hpbGROb2Rlc1xuXHRcdFx0aWYgbm90IGNoaWxkXG5cdFx0XHQgXHRjb250aW51ZVxuXG5cdFx0XHRAYW5pbXNBY2NvLmJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZClcblxuXHRcdFV0aWxzLmRlbGF5IDAsID0+XG5cdFx0XHRmb3IgYW5pbSwgaSBpbiBhbmltYXRpb25zXG5cblx0XHRcdFx0cHJvcGVydGllcyA9IGFuaW0ucHJvcGVydGllc1xuXHRcdFx0XHRvcHRpb25zID0gYW5pbS5vcHRpb25zXG5cdFx0XHRcdHN0YXRlQSA9IGFuaW0uX3N0YXRlQVxuXHRcdFx0XHRzdGF0ZUIgPSBhbmltLl9zdGF0ZUJcblxuXHRcdFx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdCMgYW5pbWF0aW9uXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdBbmltYXRpb24gJyArIChpICsgMSlcblxuXHRcdFx0XHRmcm9tVW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdHRleHQ6ICdmcm9tJ1xuXG5cdFx0XHRcdHRvVW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHR0ZXh0OiAndG8nXG5cblx0XHRcdFx0Zm9yIGVsZW1lbnQgaW4gW2Zyb21Vbml0LmVsZW1lbnQsIHRvVW5pdC5lbGVtZW50XVxuXHRcdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWxpZ25MZWZ0JylcblxuXG5cdFx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdCMgcHJvcGVydGllc1xuXG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIHByb3BlcnRpZXNcblxuXHRcdFx0XHRcdHN3aXRjaCBrZXlcblx0XHRcdFx0XHRcdHdoZW4gJ2dyYWRpZW50J1xuXG5cdFx0XHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBTdGFydCdcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUFba2V5XS5zdGFydFxuXHRcdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQltrZXldLnN0YXJ0XG5cdFx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBFbmQnXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBW2tleV0uZW5kXG5cdFx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCW2tleV0uZW5kXG5cdFx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBBbmdsZSdcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUFba2V5XS5hbmdsZVxuXHRcdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQltrZXldLmFuZ2xlXG5cdFx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0XHRcdHRleHQ6IF8uc3RhcnRDYXNlKGtleSlcblxuXHRcdFx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUFba2V5XVxuXHRcdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQltrZXldXG5cdFx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRcdCMgb3B0aW9uc1xuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnT3B0aW9ucydcblxuXHRcdFx0XHQjIHRpbWVcblx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHR1bml0OiAncydcblx0XHRcdFx0XHR2YWx1ZTogb3B0aW9ucy50aW1lXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdCMgdGltZVxuXHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHR1bml0OiAnZCdcblx0XHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5kZWxheVxuXHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0dGV4dDogJydcblxuXHRcdFx0XHQjIHJlcGVhdFxuXHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdHVuaXQ6ICdyJ1xuXHRcdFx0XHRcdHZhbHVlOiBvcHRpb25zLnJlcGVhdFxuXHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHQjIHRpbWVcblx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0dW5pdDogJ2wnXG5cdFx0XHRcdFx0dmFsdWU6IG9wdGlvbnMubG9vcGluZ1xuXHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHR1bmxlc3MgaSBpcyBhbmltYXRpb25zLmxlbmd0aCAtIDFcblx0XHRcdFx0XHRuZXcgcERpdmlkZXJcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cblx0XHRcblx0c2hvd1Byb3BlcnRpZXM6IChsYXllciwgY3VzdG9tUHJvcHMpID0+XG5cblx0XHRwcm9wcyA9IGxheWVyLnByb3BzXG5cdFx0Xy5hc3NpZ24gcHJvcHMsIGN1c3RvbVByb3BzXG5cblx0XHRkZWZhdWx0cyA9IGxheWVyLl9wcm9wZXJ0eUxpc3QoKVxuXG5cdFx0Xy5hc3NpZ24gZGVmYXVsdHMsXG5cdFx0XHRyb3RhdGlvbjogZGVmYXVsdHMucm90YXRpb25aXG5cdFx0XHRibGVuZGluZzoge2RlZmF1bHQ6ICdub3JtYWwnfVxuXG5cdFx0QGhpZGVEaXZzKClcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIF8ubWVyZ2UobGF5ZXIucHJvcHMsIGN1c3RvbVByb3BzKVxuXG5cdFx0XHRwcm9wTGF5ZXIgPSBAW2tleSArICdCb3gnXVxuXG5cdFx0XHRpZiBub3QgcHJvcExheWVyXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGRlZiA9IGRlZmF1bHRzW2tleV0/LmRlZmF1bHRcblx0XHRcdFxuXHRcdFx0QHNob3dQcm9wZXJ0eShrZXksIHZhbHVlLCBwcm9wTGF5ZXIsIGRlZilcblxuXHRzaG93UHJvcGVydHk6IChrZXksIHZhbHVlLCBwcm9wTGF5ZXIsIGRlZikgPT5cblxuXHRcdHByb3BMYXllci5pc0RlZmF1bHQgPSBmYWxzZVxuXG5cdFx0aWYgbm90IHZhbHVlPyBvciBfLmlzTmFOKHZhbHVlKSBvciB2YWx1ZSBpcyBkZWZcblx0XHRcdHZhbHVlID0gZGVmID8gJydcblx0XHRcdHByb3BMYXllci5pc0RlZmF1bHQgPSB0cnVlXG5cblx0XHQjIGNvbG9yXG5cdFx0aWYgQ29sb3IuaXNDb2xvcih2YWx1ZSlcblx0XHRcdHZhbHVlID0gdmFsdWUudG9Ic2xTdHJpbmcoKVxuXG5cdFx0IyBncmFkaWVudFxuXHRcdGlmIHZhbHVlPy5jb25zdHJ1Y3Rvcj8ubmFtZSBpcyAnR3JhZGllbnQnXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0cmV0dXJuXG5cblx0XHQjIHN0cmluZ1xuXHRcdGlmIHR5cGVvZiB2YWx1ZSBpcyAnc3RyaW5nJ1xuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVyblxuXG5cdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpXG5cblx0XHQjIGZsb2F0XG5cdFx0aWYgdmFsdWUuaW5kZXhPZignLicpIGlzbnQgLTFcblx0XHRcdHByb3BMYXllci52YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMilcblx0XHRcdHJldHVyblxuXG5cdFx0IyBudW1lclxuXHRcdHByb3BMYXllci52YWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCkudG9GaXhlZCgpXG5cblx0aGlkZURpdnM6ID0+XG5cdFx0Zm9yIGRpdiBpbiBbXG5cdFx0XHRAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHRleHRQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHNoYWRvd1Byb3BlcnRpZXNEaXYsXG5cdFx0XHRAaW1hZ2VQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QGZpbHRlcnNEaXYsXG5cdFx0XHRAdHJhbnNmb3Jtc0Rpdixcblx0XHRcdEBib3JkZXJQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QGVmZmVjdHNEaXYsXG5cdFx0XHRAc2NyZWVuc2hvdERpdlxuXHRcdF1cblx0XHRcblx0XHRcdGRpdi52aXNpYmxlID0gZmFsc2VcblxuXHRjbGVhclByb3BzOiA9PlxuXHRcdGZvciBwcm9wIGluIEBwcm9wTGF5ZXJzXG5cdFx0XHRwcm9wLnZhbHVlID0gdW5kZWZpbmVkXG5cblxuXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG5cdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcblx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcblx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4ODg4XG5cbiMjIyBcblxuXG5jbGFzcyBHb3RjaGFcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAc3BlY1BhbmVsID0gbmV3IFNwZWNQYW5lbFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2VsZWN0ZWRDb2xvcjogJ3JnYmEoMjU1LCAxLCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlY29uZGFyeUNvbG9yOiAnI0ZGRkZGRidcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblx0XHRcdGZvbnRTaXplOiAnMTAnXG5cdFx0XHRmb250V2VpZ2h0OiAnNTAwJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0XG5cdFx0XHRwYWRkaW5nOiB7dG9wOiAxLCBib3R0b206IDEsIGxlZnQ6IDMsIHJpZ2h0OiAzfVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGNvbG9yOiBvcHRpb25zLmNvbG9yXG5cdFx0XHRzZWxlY3RlZENvbG9yOiBvcHRpb25zLnNlbGVjdGVkQ29sb3Jcblx0XHRcdHNlY29uZGFyeUNvbG9yOiBvcHRpb25zLnNlY29uZGFyeUNvbG9yXG5cdFx0XHRmb250RmFtaWx5OiBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGZvbnRTaXplOiBvcHRpb25zLmZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBvcHRpb25zLmZvbnRXZWlnaHRcblx0XHRcdHNoYXBlczogW11cblx0XHRcdGJvcmRlclJhZGl1czogb3B0aW9ucy5ib3JkZXJSYWRpdXNcblx0XHRcdHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZ1xuXHRcdFx0Zm9jdXNlZEVsZW1lbnQ6IHVuZGVmaW5lZFxuXHRcdFx0ZW5hYmxlZDogZmFsc2Vcblx0XHRcdHNjcmVlbkVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0bGF5ZXJzOiBbXVxuXHRcdFx0Y29udGFpbmVyczogW11cblx0XHRcdHRpbWVyOiB1bmRlZmluZWRcblx0XHRcdF9vbmx5VmlzaWJsZTogdHJ1ZVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdEZyYW1lci5DdXJyZW50Q29udGV4dC5kb21FdmVudE1hbmFnZXIud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgQHVwZGF0ZSlcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXHRcdEBjb250ZXh0LmNoaWxkTm9kZXNbMl0uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XCJvbmx5VmlzaWJsZVwiLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9vbmx5VmlzaWJsZVxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0cmV0dXJuIGlmIHR5cGVvZiBib29sIGlzbnQgJ2Jvb2xlYW4nXG5cdFx0XHRcdEBfb25seVZpc2libGUgPSBib29sXG5cblx0XHRGcmFtZXIuRGV2aWNlLm9uIFwiY2hhbmdlOmRldmljZVR5cGVcIiwgPT5cblx0XHRcdFV0aWxzLmRlbGF5IDAsIEB1cGRhdGVcblxuXHR0b2dnbGU6IChldmVudCwgb3BlbikgPT5cblx0XHQjIHJldHVybiBpZiBGcmFtZXIuRGV2aWNlLmhhbmRzLmlzQW5pbWF0aW5nXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJgXCIgb3IgZXZlbnQua2V5IGlzIFwiPFwiIG9yIG9wZW4gaXMgdHJ1ZVxuXHRcdFx0aWYgQG9wZW5lZCB0aGVuIEBkaXNhYmxlKCkgZWxzZSBAZW5hYmxlKClcblx0XHRcdEBvcGVuZWQgPSAhQG9wZW5lZFxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCIvXCIgb3IgZXZlbnQua2V5IGlzIFwiPlwiXG5cdFx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRcdGlmIEBob3ZlcmVkTGF5ZXIgaXMgQHNlbGVjdGVkTGF5ZXJcblx0XHRcdFx0QHVuc2V0U2VsZWN0ZWRMYXllcigpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzZXRTZWxlY3RlZExheWVyKClcblxuXHRcdFx0cmV0dXJuXG5cblx0IyBvcGVuIHRoZSBwYW5lbCwgc3RhcnQgbGlzdGVuaW5nIGZvciBldmVudHNcblx0ZW5hYmxlOiA9PlxuXHRcdEBfY2FudmFzQ29sb3IgPSBDYW52YXMuYmFja2dyb3VuZENvbG9yXG5cdFx0c3ZnQ29udGV4dC5zZXRDb250ZXh0KClcblxuXHRcdEB0cmFuc2l0aW9uKHRydWUpXG5cblx0ZGlzYWJsZTogPT5cblx0XHRAdW5mb2N1cygpXG5cdFx0QGVuYWJsZWQgPSBmYWxzZVxuXG5cdFx0QHRyYW5zaXRpb24oZmFsc2UpXG5cblx0dHJhbnNpdGlvbjogKG9wZW4gPSB0cnVlLCBzZWNvbmRzID0gLjUpID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cblx0XHRoYW5kcy5vbiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXG5cdFx0aGFuZHMub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0aGFuZHMub2ZmIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cdFx0XHRAZW5hYmxlZCA9IEBvcGVuZWQgPSBvcGVuXG5cblx0XHRcdGlmIG9wZW5cblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmJhY2tncm91bmQub24gRXZlbnRzLk1vdXNlT3ZlciwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5iYWNrZ3JvdW5kLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0QGZvY3VzKClcblxuXHRcdEBfc3RhcnRQb3NpdGlvbiA9IEZyYW1lci5EZXZpY2UuaGFuZHMueFxuXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGVcblx0XHRcdG1pZFg6IGlmIG9wZW4gdGhlbiBtaWRYIC0gMTEyIGVsc2UgbWlkWFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogc2Vjb25kc1xuXHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEwKVxuXG5cdHNob3dUcmFuc2l0aW9uOiA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXHRcdG1pZFggPSBoYW5kcy5fY29udGV4dC5pbm5lcldpZHRoIC8gMlxuXG5cdFx0b3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0aGFuZHMubWlkWCxcblx0XHRcdFttaWRYIC0gNTYsIG1pZFggLSAxMTJdLCBcblx0XHRcdFswLCAxXSwgXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0ZmFjdG9yID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFgsIG1pZFggLSAxMTJdLFxuXHRcdFx0WzAsIDFdLFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdEBzcGVjUGFuZWwuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eVxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBDb2xvci5taXggQF9jYW52YXNDb2xvciwncmdiYSgzMCwgMzAsIDMwLCAxLjAwMCknLCBmYWN0b3JcblxuXHQjIHVwZGF0ZSB3aGVuIHNjcmVlbiBzaXplIGNoYW5nZXNcblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQG9wZW5lZFxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5taWRYIC09IDEyMlxuXG5cdFx0c3ZnQ29udGV4dC5zZXRDb250ZXh0KClcblx0XHRAZm9jdXMoKVxuXG5cdCMgZ2V0IHRoZSBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnRcblx0Z2V0RGltZW5zaW9uczogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0ZCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdGRpbWVuc2lvbnMgPSB7XG5cdFx0XHR4OiBkLmxlZnRcblx0XHRcdHk6IGQudG9wXG5cdFx0XHR3aWR0aDogZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBkLmhlaWdodFxuXHRcdFx0bWlkWDogZC5sZWZ0ICsgKGQud2lkdGggLyAyKVxuXHRcdFx0bWlkWTogZC50b3AgKyAoZC5oZWlnaHQgLyAyKVxuXHRcdFx0bWF4WDogZC5sZWZ0ICsgZC53aWR0aFxuXHRcdFx0bWF4WTogZC50b3AgKyBkLmhlaWdodFxuXHRcdFx0ZnJhbWU6IGRcblx0XHR9XG5cblx0XHRyZXR1cm4gZGltZW5zaW9uc1xuXG5cdCMgbWFrZSBhIHJlbGF0aXZlIGRpc3RhbmNlIGxpbmVcblx0bWFrZUxpbmU6IChwb2ludEEsIHBvaW50QiwgbGFiZWwgPSB0cnVlKSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGluZSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRpZiBwb2ludEFbMF0gaXMgcG9pbnRCWzBdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXSAtIDV9ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRBWzBdICsgNX0gI3twb2ludEFbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdIC0gNX0gI3twb2ludEJbMV19IEwgI3twb2ludEJbMF0gKyA1fSAje3BvaW50QlsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0ZWxzZSBpZiBwb2ludEFbMV0gaXMgcG9pbnRCWzFdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV0gLSA1fSBMICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSAtIDV9IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdCMgbWFrZSB0aGUgbGFiZWwgYm94IGZvciBkaXN0YW5jZSBsaW5lc1xuXHRtYWtlTGFiZWw6ICh4LCB5LCB0ZXh0KSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGFiZWwgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICd0ZXh0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiB4XG5cdFx0XHR5OiB5XG5cdFx0XHQnZm9udC1mYW1pbHknOiBAZm9udEZhbWlseVxuXHRcdFx0J2ZvbnQtc2l6ZSc6IEBmb250U2l6ZVxuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogQGZvbnRXZWlnaHRcblx0XHRcdGZpbGw6IEBzZWNvbmRhcnlDb2xvclxuXHRcdFx0dGV4dDogTWF0aC5mbG9vcih0ZXh0IC8gQHJhdGlvKVxuXG5cdFx0bCA9IEBnZXREaW1lbnNpb25zKGxhYmVsLmVsZW1lbnQpXG5cblx0XHRsYWJlbC54ID0geCAtIGwud2lkdGggLyAyXG5cdFx0bGFiZWwueSA9IHkgKyBsLmhlaWdodCAvIDQgLSAxXG5cblx0XHRib3ggPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBsYWJlbC54IC0gQHBhZGRpbmcubGVmdFxuXHRcdFx0eTogbGFiZWwueSAtIGwuaGVpZ2h0ICsgMVxuXHRcdFx0d2lkdGg6IGwud2lkdGggKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogbC5oZWlnaHQgKyBAcGFkZGluZy50b3AgKyBAcGFkZGluZy5ib3R0b20gKyAxXG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IG5ldyBDb2xvcihjb2xvcikuZGFya2VuKDQwKVxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHQjIG1ha2UgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBmb3Igc2VsZWN0ZWQgLyBob3ZlcmVkIGVsZW1lbnRzXG5cdG1ha2VSZWN0T3ZlcmxheXM6IChzLCBoKSA9PlxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXG5cdFx0aWYgQGhvdmVyZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblx0XHRlbHNlXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogaC54XG5cdFx0XHR5OiBoLnlcblx0XHRcdHdpZHRoOiBoLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGguaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBjb2xvclxuXHRcdFx0ZmlsbDogaG92ZXJGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIEBzZWxlY3RlZExheWVyIGlzIEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRzZWxlY3RGaWxsID0gbmV3IENvbG9yKEBzZWxlY3RlZENvbG9yKS5hbHBoYSgwKVxuXHRcdGVsc2Vcblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKC4yKVxuXG5cdFx0c2VsZWN0ZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogcy54XG5cdFx0XHR5OiBzLnlcblx0XHRcdHdpZHRoOiBzLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHMuaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBzZWxlY3RlZENvbG9yXG5cdFx0XHRmaWxsOiBzZWxlY3RGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHQjIG1ha2UgZGFzaGVkIGxpbmVzIGZyb20gYm91bmRpbmcgcmVjdCB0byBzY3JlZW4gZWRnZVxuXHRtYWtlRGFzaGVkTGluZXM6IChlLCBmLCBjb2xvciwgb2Zmc2V0KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZVxuXHRcdHJldHVybiBpZiBlIGlzIGZcblxuXHRcdGNvbG9yID0gbmV3IENvbG9yKGNvbG9yKS5hbHBoYSguOClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUueCwgeTogZi55fSxcblx0XHRcdHt4OiBlLngsIHk6IGYubWF4WX1cblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYueX0sXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLnl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS55fSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS5tYXhZfSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdHNob3dEaXN0YW5jZXM6IChzZWxlY3RlZCwgaG92ZXJlZCkgPT5cblxuXHRcdGlmIEBob3ZlcmVkTGF5ZXIgaXMgQHNlbGVjdGVkTGF5ZXJcblx0XHRcdEBob3ZlcmVkTGF5ZXIgPSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0cyA9IEBnZXREaW1lbnNpb25zKEBzZWxlY3RlZExheWVyLl9lbGVtZW50KVxuXHRcdGggPSBAZ2V0RGltZW5zaW9ucyhAaG92ZXJlZExheWVyLl9lbGVtZW50KVxuXHRcdGYgPSBAZ2V0RGltZW5zaW9ucyhGcmFtZXIuRGV2aWNlLnNjcmVlbi5fZWxlbWVudClcblxuXHRcdHJldHVybiBpZiBub3QgcyBvciBub3QgaFxuXG5cdFx0QHJhdGlvID0gRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyBTY3JlZW4ud2lkdGhcblxuXHRcdEBtYWtlRGFzaGVkTGluZXMocywgZiwgQHNlbGVjdGVkQ29sb3IsIDUpXG5cblx0XHRAbWFrZVJlY3RPdmVybGF5cyhzLCBoKVxuXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBjb250YWlucyBob3ZlcmVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA8IGgueCBhbmQgcy5tYXhYID4gaC5tYXhYIGFuZCBzLnkgPCBoLnkgYW5kIHMubWF4WSA+IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhYIC0gaC5tYXhYKVxuXHRcdFx0bSA9IGgubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy5tYXhYIC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhZIC0gaC5tYXhZKVxuXHRcdFx0bSA9IGgubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIGhvdmVyZWQgZWxlbWVudCBjb250YWlucyBzZWxlY3RlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPiBoLnggYW5kIHMubWF4WCA8IGgubWF4WCBhbmQgcy55ID4gaC55IGFuZCBzLm1heFkgPCBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBoLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgcy5taWRZXSwgW2gubWF4WCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBzLm1heFkgKyA1XSwgW3MubWlkWCwgaC5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gaC54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGhvdmVyZWQgZWxlbWVudFxuXHRcdFxuXHRcdCMgdG9wXG5cblx0XHRpZiBzLnkgPiBoLm1heFlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgubWF4WSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55ID4gaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC55ICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHQjIGxlZnRcblxuXHRcdGlmIGgubWF4WCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC5tYXhYKVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBoLnggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgcmlnaHRcblxuXHRcdGlmIHMubWF4WCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBzLnggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgYm90dG9tXG5cblx0XHRpZiBzLm1heFkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLm1heFkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55IDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gcy55ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0IyBzZXQgdGhlIHBhbmVsIHdpdGggY3VycmVudCBwcm9wZXJ0aWVzXG5cdHNldFBhbmVsUHJvcGVydGllczogKCkgPT5cblxuXHRcdCMgZGVjaWRlIHdoaWNoIGxheWVyIHRvIHVzZSBmb3IgcGFuZWwgcHJvcHNcblx0XHRpZiBAc2VsZWN0ZWRMYXllcj8gYW5kIEBzZWxlY3RlZExheWVyIGlzbnQgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdGxheWVyID0gQHNlbGVjdGVkTGF5ZXJcblx0XHRlbHNlIGlmIEBob3ZlcmVkTGF5ZXI/XG5cdFx0XHRsYXllciA9IEBob3ZlcmVkTGF5ZXJcblx0XHRlbHNlXG5cdFx0XHRAc3BlY1BhbmVsLmNsZWFyUHJvcHMoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQGxhc3RMYXllclxuXHRcdEBsYXN0TGF5ZXIgPSBsYXllclxuXHRcdFxuXHRcdCMgcHJvcGVydGllcyB0byBhc3NpZ25lZCB0byBsYXllci5wcm9wc1xuXHRcdGN1c3RvbVByb3BzID1cblx0XHRcdHg6IGxheWVyLnNjcmVlbkZyYW1lLnhcblx0XHRcdHk6IGxheWVyLnNjcmVlbkZyYW1lLnlcblx0XHRcdGNvbXBvbmVudE5hbWU6IGxheWVyLmNvbnN0cnVjdG9yLm5hbWVcblx0XHRcdGNvbXBvbmVudE5hbWVzOiBAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudClcblx0XHRcdHBhcmVudE5hbWU6IGxheWVyLnBhcmVudD8ubmFtZVxuXHRcdFx0cm90YXRpb246IGxheWVyLnJvdGF0aW9uWlxuXHRcdFx0dGV4dEFsaWduOiBsYXllci5wcm9wcy5zdHlsZWRUZXh0T3B0aW9ucz8uYWxpZ25tZW50XG5cdFx0XHRibGVuZGluZzogbGF5ZXIuYmxlbmRpbmdcblx0XHRcdCMgc2NyZWVuc2hvdDogQGdldFNjcmVlbnNob3QobGF5ZXIuX2VsZW1lbnQpXG5cdFx0XG5cdFx0aWYgbGF5ZXIuZ3JhZGllbnQ/XG5cdFx0XHRfLmFzc2lnbiBjdXN0b21Qcm9wcyxcblx0XHRcdFx0Z3JhZGllbnRTdGFydDogbGF5ZXIuZ3JhZGllbnQuc3RhcnRcblx0XHRcdFx0Z3JhZGllbnRFbmQ6IGxheWVyLmdyYWRpZW50LmVuZFxuXHRcdFx0XHRncmFkaWVudEFuZ2xlOiBsYXllci5ncmFkaWVudC5hbmdsZVxuXG5cdFx0aWYgbGF5ZXIuc2hhZG93cz9cblx0XHRcdF8uYXNzaWduIGN1c3RvbVByb3BzLFxuXHRcdFx0XHRzaGFkb3dYOiBsYXllci5zaGFkb3dzWzBdPy54XG5cdFx0XHRcdHNoYWRvd1k6IGxheWVyLnNoYWRvd3NbMF0/Lnlcblx0XHRcdFx0c2hhZG93U3ByZWFkOiBsYXllci5zaGFkb3dzWzBdPy5zcHJlYWRcblx0XHRcdFx0c2hhZG93Q29sb3I6IGxheWVyLnNoYWRvd3NbMF0/LmNvbG9yXG5cdFx0XHRcdHNoYWRvd1R5cGU6IGxheWVyLnNoYWRvd3NbMF0/LnR5cGVcblx0XHRcdFx0c2hhZG93Qmx1cjogbGF5ZXIuc2hhZG93c1swXT8uYmx1clxuXG5cdFx0QHNwZWNQYW5lbC5zaG93UHJvcGVydGllcyhsYXllciwgY3VzdG9tUHJvcHMpXG5cblx0XHRhbmltYXRpb25zID0gbGF5ZXIuYW5pbWF0aW9ucygpXG5cblx0XHRAc3BlY1BhbmVsLnNob3dBbmltYXRpb25zKGFuaW1hdGlvbnMpXG5cblxuXHRzZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRsYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGV2ZW50Py50YXJnZXQpXG5cdFx0cmV0dXJuIGlmIG5vdCBAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIpXG5cblx0XHRAaG92ZXJlZExheWVyID0gbGF5ZXJcblxuXHRcdEB0cnlGb2N1cyhldmVudClcblx0XHRyZXR1cm4gZmFsc2VcblxuXHR1bnNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdEBob3ZlcmVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRpZiBub3QgQGhvdmVyZWRMYXllciB0aGVuIEBmb2N1cygpXG5cblx0c2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBob3ZlcmVkTGF5ZXJcblxuXHRcdEBzZWxlY3RlZExheWVyID0gQGhvdmVyZWRMYXllclxuXHRcdEBmb2N1cygpXG5cblx0dW5zZXRTZWxlY3RlZExheWVyOiA9PlxuXHRcdEBzZWxlY3RlZExheWVyID0gdW5kZWZpbmVkXG5cblxuXHQjIEZpbmQgYW4gZWxlbWVudCB0aGF0IGJlbG9uZ3MgdG8gYSBGcmFtZXIgTGF5ZXJcblx0ZmluZExheWVyRWxlbWVudDogKGVsZW1lbnQpIC0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50LmNsYXNzTGlzdFxuXG5cdFx0aWYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyYW1lckxheWVyJylcblx0XHRcdHJldHVybiBlbGVtZW50XG5cblx0XHRAZmluZExheWVyRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUpXG5cblx0IyBGaW5kIGEgRnJhbWVyIExheWVyIHRoYXQgbWF0Y2hlcyBhIEZyYW1lciBMYXllciBlbGVtZW50XG5cdGdldExheWVyRnJvbUVsZW1lbnQ6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXG5cdFx0ZWxlbWVudCA9IEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnMsIFsnX2VsZW1lbnQnLCBlbGVtZW50XSlcblxuXHRcdHJldHVybiBsYXllclxuXG5cdGdldExheWVySXNWaXNpYmxlOiAobGF5ZXIpID0+XG5cdFx0aWYgbm90IEBfb25seVZpc2libGVcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBsYXllci5vcGFjaXR5IGlzIDAgb3IgbGF5ZXIudmlzaWJsZSBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIucGFyZW50KVxuXG5cdGdldFNjcmVlbnNob3Q6IChlbGVtZW50KSA9PlxuXG5cdFx0Zm9yZWlnbk9iamVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ2ZvcmVpZ25PYmplY3QnXG5cblx0XHQjIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcblx0XHRyZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdGN0eCA9IEBzcGVjUGFuZWwuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRkYXRhID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JyN7cmVjdC53aWR0aH0nIGhlaWdodD0nI3tyZWN0LmhlaWdodH0nPlwiICtcblx0XHRcdCc8Zm9yZWlnbk9iamVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+JyArXG5cdFx0XHQnPGRpdiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj4nICtcblx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MICtcblx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdCc8L2ZvcmVpZ25PYmplY3Q+JyArXG5cdFx0XHQnPC9zdmc+J1xuXG5cdFx0RE9NVVJMID0gd2luZG93LlVSTCBvciB3aW5kb3cud2Via2l0VVJMIG9yIHdpbmRvd1xuXG5cdFx0c3ZnID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogJ2ltYWdlL3N2Zyt4bWwnfSlcblx0XHR1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zylcblx0XHRAc3BlY1BhbmVsLnNjcmVlbnNob3RCb3gudmFsdWUgPSB1cmxcblxuXG5cdCMgRmluZCBhIG5vbi1zdGFuZGFyZCBDb21wb25lbnQgdGhhdCBpbmNsdWRlcyBhIExheWVyXG5cdGdldENvbXBvbmVudEZyb21MYXllcjogKGxheWVyLCBuYW1lcyA9IFtdKSA9PlxuXHRcdGlmIG5vdCBsYXllclxuXHRcdFx0cmV0dXJuIG5hbWVzLmpvaW4oJywgJylcblxuXHRcdGlmIG5vdCBfLmluY2x1ZGVzKFtcIkxheWVyXCIsIFwiVGV4dExheWVyXCIsIFwiU2Nyb2xsQ29tcG9uZW50XCJdLCBsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXHRcdFx0bmFtZXMucHVzaChsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXG5cdFx0QGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQsIG5hbWVzKVxuXG5cblx0IyBEZWxheSBmb2N1cyBieSBhIHNtYWxsIGFtb3VudCB0byBwcmV2ZW50IGZsYXNoaW5nXG5cdHRyeUZvY3VzOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QGZvY3VzRWxlbWVudCA9IGV2ZW50LnRhcmdldFxuXHRcdGRvIChldmVudCkgPT5cblx0XHRcdFV0aWxzLmRlbGF5IC4wNSwgPT5cblx0XHRcdFx0aWYgQGZvY3VzRWxlbWVudCBpc250IGV2ZW50LnRhcmdldFxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcblx0XHRcdFx0QGZvY3VzKClcblxuXHQjIENoYW5nZSBmb2N1cyB0byBhIG5ldyBob3ZlcmVkIG9yIHNlbGVjdGVkIGVsZW1lbnRcblx0Zm9jdXM6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QHVuZm9jdXMoKVxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRAaG92ZXJlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKClcblx0XHRAc2hvd0Rpc3RhbmNlcygpXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdHN2Z0NvbnRleHQucmVtb3ZlQWxsKClcblxuXG4jIGtpY2tvZmZcblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAncENvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbnN2Z0NvbnRleHQgPSBuZXcgU1ZHQ29udGV4dFxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEYUEsSUFBQSxzT0FBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRWpDLElBQUcsa0JBQUg7RUFDQyxNQUFBLEdBQVMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFRLENBQUEsVUFBQTtFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEs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
