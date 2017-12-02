require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecPanel, accordionsOpen, device, deviceType, gotcha, pAccordian, pColor, pDiv, pDivider, pImage, pInput, pLabel, pRange, pRow, pSelect, pSpan, panel, ref, secretBox, startOpen, svgContext, viewC,
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

Utils.insertCSS("\n.logo {\n	opacity: .4;\n}\n\n.logo:hover {\n	opacity: 1;\n}\n\n#linkedin_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 68px;\n}\n\n\n#twitter_logo {\n	position: absolute;\n	bottom: 4px;\n	right: 4px;\n}\n\n#github_logo {\n	position: absolute;\n	bottom: 8px;\n	right: 36px;\n}\n\n.framerLayer { \n	pointer-events: all !important; \n	} \n\n.IgnorePointerEvents {\n	pointer-events: none !important; \n}\n\n.dropdown {\n	opacity: 0;\n}\n\n#pContainer {\n	position: fixed;\n	right: 0;\n	width: 224px;\n	height: 100%;\n	font-family: 'Helvetica Neue';\n	font-size: 11px;\n	background-color: rgba(20, 20, 20, 1.000);\n	border-left: 1px solid rgba(45, 45, 45, 1.000);\n	pointer-events: all;\n	white-space: nowrap;\n	cursor: default;\n	overflow: scroll;\n	padding-top: 8px;\n}\n\n.pDiv {\n	display: block;\n	width: 100%;\n}\n\n.hidden {\n	display: none;\n}\n\n.pRow {\n	width: 100%;\n	height: 32px;\n}\n\n.pSpan {\n	position: absolute;\n	color: #888888;\n	font-weight: 400;\n	letter-spacing: .5px;\n	padding-left: 8px;\n	margin-top: 2px;\n}\n\n.pLabel {\n	position: absolute;\n	text-align: right;\n	font-size: 10px;\n	width: none;\n	margin-top: 2px;\n	margin-right: 8px;\n	z-index: 10;\n	pointer-events: none;\n}\n\n.pRange {\n	position: absolute;\n	border-radius: 4px;\n	margin-top: 15px;\n	margin-right: 4px;\n	border: 1px solid #000;\n	-webkit-appearance: none;  /* Override default CSS styles */\n	appearance: none;\n	width: 100%; \n	height: 4px;\n	background: #323232;\n	outline: none;\n	opacity: 1;\n}\n\n\n.pRange::-webkit-slider-thumb {\n	border-radius: 8px;\n	-webkit-appearance: none;\n	appearance: none;\n	width: 16px;\n	height: 16px;\n	background: #888888;\n	border: 1px solid #000;\n	cursor: pointer;\n}\n\n.pRange::-moz-range-thumb {\n	border-radius: 8px;\n	width: 16px;\n	height: 16px;\n	background: #888888;\n	border: 1px solid #000;\n	cursor: pointer;\n}\n\n.pInput {\n	background-color: #292929;\n	border: 1px solid #000;\n	color: #555555;\n	padding: 4px;\n	position: absolute;\n	border-radius: 4px;\n	outline: none;\n	margin-top: 4px;\n}\n\n.pInput:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n}\n\n.right {\n	right: 8px;\n	width: 48px;\n}\n\n.left {\n	right: 72px;\n	width: 48px;\n}\n\n.alignLeft {\n	text-align: left;\n}\n\n.full {\n	right: 8px;\n	width: 112px;\n}\n\n.pImage {\n	display: block;\n	margin-left: 8px;\n	height: auto;\n	width: 196px;\n	overflow: hidden;\n	background-color: #292929;\n	border: 1px solid #000;\n	border-radius: 4px;\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n	padding: 4px;\n}\n\n.pImage:hover {\n	border: 1px solid #48cfff;\n	color: #48cfff;\n	outline: 2px solid #292929;\n}\n\n.pColor {\n	outline: 4px solid #292929;\n	outline-offset: -4px;\n}\n\n.pColor:hover {\n	outline: 2px solid #292929;\n	color: #48cfff;\n}\n\n.pSelect {\n	position: absolute;\n	right: 8px;\n	width: 122px;\n	color: #555555;\n	background-color: #292929;\n	-webkit-appearance: none;\n	border: 1px solid #000;\n	padding: 4px;\n	border-radius: 4px;\n	outline: none;\n}\n\n.pDivider {\n	height: 1px;\n	background-color: #000;\n	margin: 16px 8px 16px 8px;\n}\n\n.pAccordian {\n	border-top: 1px solid #141414;\n	border-bottom: 1px solid #141414;\n	height: auto;\n	min-height: 32px;\n	background-color: #1D1D1D;\n	margin-top: 16px;\n}\n\n.pAccordianBody {\n	display: none;\n	height: auto;\n	margin-top: 32px;\n	padding-top: 4px;\n	background-color: #141414;\n}\n\n.active {\n	display: block;\n	height: auto;\n}\n\n.hasValue {\n	color: #FFF;\n}\n\n.socialLinks {\n	background-color: #141414;\n	position: fixed;\n	bottom: 0px;\n	right: 0px;\n	padding-top: 4px;\n	z-index: 100;\n}\n\n.strong {\n	font-weight: 600;\n}\n");

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
      text: 'Label',
      bold: false
    });
    pRow.__super__.constructor.call(this, options);
    this.element.classList.remove("pDiv");
    this.element.classList.add("pRow");
    this.label = new pSpan({
      parent: this,
      text: options.text,
      bold: options.bold
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
      text: 'hello world',
      bold: false
    });
    this.element = document.createElement('span');
    this.element.classList.add("pSpan");
    this.element.textContent = options.text;
    if (options.bold) {
      this.element.classList.add("strong");
    }
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
  }

  return pSpan;

})();

pRange = (function() {
  function pRange(options) {
    var parent, ref1, ref2;
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      parent: null,
      className: 'full',
      value: '',
      min: '0',
      max: '100',
      value: '100',
      action: (function(_this) {
        return function(value) {
          return null;
        };
      })(this)
    });
    this.element = document.createElement('input');
    _.assign(this.element, {
      type: 'range',
      min: options.min,
      max: options.max,
      value: options.value,
      action: options.action
    });
    this.element.classList.add("pRange");
    this.element.classList.add(options.className);
    this.element.oninput = (function(_this) {
      return function() {
        return _this.action(_this.value);
      };
    })(this);
    parent = (ref1 = (ref2 = options.parent) != null ? ref2.element : void 0) != null ? ref1 : panel;
    parent.appendChild(this.element);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this.element.value;
      }
    });
    _.assign(this, {
      action: options.action
    });
  }

  return pRange;

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
    this.showEventListeners = bind(this.showEventListeners, this);
    this.clearChildrenThenShowEventListeners = bind(this.clearChildrenThenShowEventListeners, this);
    this.clearChildrenThenShowAnimations = bind(this.clearChildrenThenShowAnimations, this);
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
      text: 'Speed'
    });
    this.speedBox = new pRange({
      parent: row,
      className: 'full',
      unit: '',
      action: function(value) {
        var base;
        base = 0.016666666666666666;
        return Framer.Loop.delta = base * _.clamp(value / 100, .0000000001, 1);
      }
    });
    new pDivider;
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
    this.eventListenersDiv = new pDiv;
    this.eventListenersAcco = new pAccordian({
      text: 'Event Listeners',
      parent: this.eventListenersDiv
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

  SpecPanel.prototype.clearChildrenThenShowAnimations = function(animations) {
    var child;
    child = this.animsAcco.body.element.childNodes[0];
    if (!child) {
      this.showAnimations(animations);
      return;
    }
    this.animsAcco.body.element.removeChild(child);
    return this.clearChildrenThenShowAnimations(animations);
  };

  SpecPanel.prototype.clearChildrenThenShowEventListeners = function(eventListeners) {
    var child;
    child = this.eventListenersAcco.body.element.childNodes[0];
    if (!child) {
      this.showEventListeners(eventListeners);
      return;
    }
    this.eventListenersAcco.body.element.removeChild(child);
    return this.clearChildrenThenShowEventListeners(eventListeners);
  };

  SpecPanel.prototype.showEventListeners = function(eventListeners) {
    var box, e, event, i, j, k, len, len1, listener, ref1, ref2, results, row;
    if (eventListeners == null) {
      eventListeners = [];
    }
    this.eventListenersDiv.visible = eventListeners.length > 0;
    results = [];
    for (i = j = 0, len = eventListeners.length; j < len; i = ++j) {
      listener = eventListeners[i];
      if (listener.events.length === 1 && _.includes(["function (){return fn.apply(me,arguments)}", "function (){return fn.apply(me, arguments)}", "function (event){return event.preventDefault()}", "function (){ return fn.apply(me, arguments); }", 'function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(timerId===undefined)return leadingEdge(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return timerId===undefined&&(timerId=setTimeout(timerExpired,wait)),result}', 'function (value){if(null!==value)return"fontSize"!==property&&"font"!==property&&_this._styledText.resetStyle(property),_this.renderText()}'], listener.events[0]["function"])) {
        this.eventListenersDiv.visible = false;
        continue;
      }
      this.eventListenersDiv.visible = true;
      row = new pRow({
        parent: this.eventListenersAcco.body,
        text: '"' + listener.listener + '"',
        bold: true
      });
      ref1 = listener.events;
      for (e = k = 0, len1 = ref1.length; k < len1; e = ++k) {
        event = ref1[e];
        row = new pRow({
          parent: this.eventListenersAcco.body,
          text: 'Name'
        });
        box = new pInput({
          parent: row,
          className: 'full',
          unit: '',
          value: (ref2 = event.name) != null ? ref2 : '',
          isDefault: event.name !== 'undefined'
        });
        row = new pRow({
          parent: this.eventListenersAcco.body,
          text: 'Function'
        });
        box = new pInput({
          parent: row,
          className: 'full',
          unit: '',
          value: event["function"],
          isDefault: false
        });
        row = new pRow({
          parent: this.eventListenersAcco.body,
          text: 'Once'
        });
        box = new pInput({
          parent: row,
          className: 'left',
          unit: '',
          value: event.once,
          isDefault: event.name !== 'false'
        });
        if (e !== listener.events.length - 1) {
          new pDivider({
            parent: this.eventListenersAcco.body
          });
        }
      }
      if (i !== eventListeners.length - 1) {
        results.push(new pDivider({
          parent: this.eventListenersAcco.body
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SpecPanel.prototype.showAnimations = function(animations) {
    var anim, box, element, fromUnit, i, j, k, key, len, len1, options, properties, ref1, ref2, ref3, ref4, ref5, ref6, ref7, results, row, stateA, stateB, toUnit, value;
    this.animsDiv.visible = animations.length > 0;
    results = [];
    for (i = j = 0, len = animations.length; j < len; i = ++j) {
      anim = animations[i];
      properties = anim.properties;
      options = anim.options;
      stateA = anim._stateA;
      stateB = anim._stateB;
      row = new pRow({
        parent: this.animsAcco.body,
        text: 'Animation ' + (i + 1),
        bold: true
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
      ref1 = [fromUnit.element, toUnit.element];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        element = ref1[k];
        element.classList.add('alignLeft');
      }
      for (key in properties) {
        value = properties[key];
        if (Color.isColorObject(value) || Color.isColor(value)) {
          row = new pRow({
            parent: this.animsAcco.body,
            text: _.startCase(key)
          });
          box = new pColor({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? stateA[key] : void 0,
            isDefault: false
          });
          box = new pColor({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? stateB[key] : void 0,
            isDefault: false
          });
        } else if (key === 'gradient') {
          row = new pRow({
            parent: this.animsAcco.body,
            text: 'Grad Start'
          });
          box = new pColor({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? (ref2 = stateA[key]) != null ? ref2.start : void 0 : void 0,
            isDefault: false
          });
          box = new pColor({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? (ref3 = stateB[key]) != null ? ref3.start : void 0 : void 0,
            isDefault: false
          });
          row = new pRow({
            parent: this.animsAcco.body,
            text: 'Grad End'
          });
          box = new pColor({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? (ref4 = stateA[key]) != null ? ref4.end : void 0 : void 0,
            isDefault: false
          });
          box = new pColor({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? (ref5 = stateB[key]) != null ? ref5.end : void 0 : void 0,
            isDefault: false
          });
          row = new pRow({
            parent: this.animsAcco.body,
            text: 'Grad Angle'
          });
          box = new pInput({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? (ref6 = stateA[key]) != null ? ref6.angle : void 0 : void 0,
            isDefault: false
          });
          box = new pInput({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? (ref7 = stateB[key]) != null ? ref7.angle : void 0 : void 0,
            isDefault: false
          });
        } else {
          row = new pRow({
            parent: this.animsAcco.body,
            text: _.startCase(key)
          });
          box = new pInput({
            parent: row,
            className: 'left',
            unit: '',
            value: stateA != null ? stateA[key] : void 0,
            isDefault: false
          });
          box = new pInput({
            parent: row,
            className: 'right',
            unit: '',
            value: stateB != null ? stateB[key] : void 0,
            isDefault: false
          });
        }
      }
      row = new pRow({
        parent: this.animsAcco.body,
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
        parent: this.animsAcco.body,
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
          parent: this.animsAcco.body
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
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
    if (Color.isColorObject(value)) {
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
    this.getLayerEventListeners = bind(this.getLayerEventListeners, this);
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
    var animations, customProps, eventListeners, layer, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
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
    eventListeners = this.getLayerEventListeners(layer);
    this.specPanel.clearChildrenThenShowEventListeners(eventListeners);
    animations = layer.animations();
    return this.specPanel.clearChildrenThenShowAnimations(animations);
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

  Gotcha.prototype.getLayerEventListeners = function(layer) {
    var listeners;
    listeners = _.map(layer._events, function(evs, listener, c) {
      if (!_.isArray(evs)) {
        evs = [evs];
      }
      return {
        listener: listener,
        events: _.map(evs, function(ev) {
          return {
            name: ev.fn.name,
            "function": ev.fn.toString(),
            context: ev.context,
            once: ev.once
          };
        })
      };
    });
    return listeners;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuZGV2aWNlVHlwZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZGV2aWNlVHlwZVxuXG5pZiBkZXZpY2VUeXBlPyBcblx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdEZyYW1lci5EZXZpY2UuX2NvbnRleHQuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZS5kZXZpY2VQaXhlbFJhdGlvXG5cblx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gZGV2aWNlVHlwZVxuXHR3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZSA9IHVuZGVmaW5lZFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5zdmdDb250ZXh0ID0gdW5kZWZpbmVkXG5zdGFydE9wZW4gPSBmYWxzZVxuYWNjb3JkaW9uc09wZW4gPSBmYWxzZVxuXG4jIGRlYnVnZ2luZ1xuXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VQaG9uZScpWzBdPy5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICBcdDg4LiAgICBcIicgODggICAgIDg4IGQ4JyAgIGA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0YFk4ODg4OGIuIDg4ICAgIC44UCA4OCAgICAgICAgICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4gIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIFx0ZDgnICAgLjhQIDg4ICAuZDhQICBZOC4gICAuODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4gIFx0IFk4ODg4OFAgIDg4ODg4OCcgICAgYDg4ODg4JyAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyMjXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIENvbnRleHRcblxuY2xhc3MgU1ZHQ29udGV4dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAc2hhcGVzID0gW11cblxuXHRcdHN2Z0NvbnRleHQgPSBAXG5cblx0XHQjIG5hbWVzcGFjZVxuXHRcdHN2Z05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG5cdFx0XG5cdFx0IyBzZXQgYXR0cmlidXRlcyBcblx0XHRzZXRBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRcdGZvciBrZXksIHZhbHVlIG9mIGF0dHJpYnV0ZXNcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXG5cdFx0IyBDcmVhdGUgU1ZHIGVsZW1lbnRcblxuXHRcdEBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKVxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoQHN2Zylcblx0XHRAc3ZnLnN0eWxlWyd6LWluZGV4J10gPSAnOTk5J1xuXG5cdFx0QGZyYW1lRWxlbWVudCA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuQmFja2dyb3VuZC5fZWxlbWVudFxuXG5cdFx0QHNldENvbnRleHQoKVxuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0c2V0QXR0cmlidXRlczogKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdHNldENvbnRleHQ6ID0+XG5cblx0XHRAbEZyYW1lID0gQGZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0QHNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJDb250ZXh0JylbMF1cblx0XHRzRnJhbWUgPSBAc2NyZWVuRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0QHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdGFkZFNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHNoYXBlcy5wdXNoKHNoYXBlKVxuXHRcdEBzaG93U2hhcGUoc2hhcGUpXG5cdFx0XG5cdHJlbW92ZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QGhpZGVTaGFwZShzaGFwZSlcblx0XHRfLnB1bGwoQHNoYXBlcywgc2hhcGUpXG5cdFx0XG5cdGhpZGVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XG5cdHNob3dTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRcblx0YWRkRGVmOiAoZGVmKSAtPlxuXHRcdEBzdmdEZWZzLmFwcGVuZENoaWxkKGRlZilcblxuXHRyZW1vdmVBbGw6ID0+XG5cdFx0Zm9yIHNoYXBlIGluIEBzaGFwZXNcblx0XHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRAc2hhcGVzID0gW11cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIFNoYXBlXG5cbmNsYXNzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt0eXBlOiAnY2lyY2xlJ30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHBhcmVudCA9IHN2Z0NvbnRleHRcblx0XHRcblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXG5cdFx0XHRvcHRpb25zLnR5cGVcblx0XHRcdClcblxuXHRcdEBzZXRDdXN0b21Qcm9wZXJ0eSgndGV4dCcsICd0ZXh0Q29udGVudCcsICd0ZXh0Q29udGVudCcsIG9wdGlvbnMudGV4dClcblx0XHRcdFx0XG5cdFx0IyBhc3NpZ24gYXR0cmlidXRlcyBzZXQgYnkgb3B0aW9uc1xuXHRcdGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdEBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBwYXJlbnQuYWRkU2hhcGUoQClcblx0XHRcblx0XHRAc2hvdygpXG5cdFx0XHRcblx0c2V0QXR0cmlidXRlOiAoa2V5LCB2YWx1ZSkgPT5cblx0XHRyZXR1cm4gaWYga2V5IGlzICd0ZXh0J1xuXHRcdGlmIG5vdCBAW2tleV0/XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRnZXQ6ID0+XG5cdFx0XHRcdFx0cmV0dXJuIEBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXG5cdFx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0XHRAZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcblx0XHRAW2tleV0gPSB2YWx1ZVxuXHRcblx0c2V0Q3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIHJldHVyblZhbHVlLCBzZXRWYWx1ZSwgc3RhcnRWYWx1ZSkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIHJldHVyblZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGVsZW1lbnRbc2V0VmFsdWVdID0gdmFsdWVcblxuXHRcdEBbdmFyaWFibGVOYW1lXSA9IHN0YXJ0VmFsdWVcblxuXHRoaWRlOiAtPiBcblx0XHRAcGFyZW50LmhpZGVTaGFwZShAKVxuXHRcblx0c2hvdzogLT4gXG5cdFx0QHBhcmVudC5zaG93U2hhcGUoQClcblx0XHRcblx0cmVtb3ZlOiAtPlxuXHRcdEBwYXJlbnQucmVtb3ZlU2hhcGUoQClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGFzaGVkIExpbmVcblxuY2xhc3MgRGFzaGVkTGluZSBleHRlbmRzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAocG9pbnRBLCBwb2ludEIsIGNvbG9yID0gJyMwMDAnLCBvZmZzZXQgPSAwLCBvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmFzc2lnbiBvcHRpb25zLFxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEEueH0gI3twb2ludEEueX0gTCAje3BvaW50Qi54fSAje3BvaW50Qi55fVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblx0XHRcdCdzdHJva2UtZGFzaGFycmF5JzogXCI1LCA1XCJcblx0XHRcdCdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBQYW5lbCBDb21wb25lbnRzXG5cblV0aWxzLmluc2VydENTUyBcIlwiXCJcblxuXHQubG9nbyB7XG5cdFx0b3BhY2l0eTogLjQ7XG5cdH1cblxuXHQubG9nbzpob3ZlciB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHRcblx0I2xpbmtlZGluX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogNjhweDtcblx0fVxuXG5cdFxuXHQjdHdpdHRlcl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA0cHg7XG5cdFx0cmlnaHQ6IDRweDtcblx0fVxuXG5cdCNnaXRodWJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiAzNnB4O1xuXHR9XG5cblx0LmZyYW1lckxheWVyIHsgXG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHR9IFxuXHRcblx0Lklnbm9yZVBvaW50ZXJFdmVudHMge1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHR9XG5cblx0LmRyb3Bkb3duIHtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cblx0I3BDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRyaWdodDogMDtcblx0XHR3aWR0aDogMjI0cHg7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnO1xuXHRcdGZvbnQtc2l6ZTogMTFweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdFx0b3ZlcmZsb3c6IHNjcm9sbDtcblx0XHRwYWRkaW5nLXRvcDogOHB4O1xuXHR9XG5cblx0LnBEaXYge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0LmhpZGRlbiB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuXG5cdC5wUm93IHtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDMycHg7XG5cdH1cblxuXHQucFNwYW4ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRjb2xvcjogIzg4ODg4ODtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdGxldHRlci1zcGFjaW5nOiAuNXB4O1xuXHRcdHBhZGRpbmctbGVmdDogOHB4O1xuXHRcdG1hcmdpbi10b3A6IDJweDtcblx0fVxuXG5cdC5wTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcblx0XHRmb250LXNpemU6IDEwcHg7XG5cdFx0d2lkdGg6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogMnB4O1xuXHRcdG1hcmdpbi1yaWdodDogOHB4O1xuXHRcdHotaW5kZXg6IDEwO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHR9XG5cblx0LnBSYW5nZSB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRtYXJnaW4tdG9wOiAxNXB4O1xuXHRcdG1hcmdpbi1yaWdodDogNHB4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyAgLyogT3ZlcnJpZGUgZGVmYXVsdCBDU1Mgc3R5bGVzICovXG5cdFx0YXBwZWFyYW5jZTogbm9uZTtcblx0XHR3aWR0aDogMTAwJTsgXG5cdFx0aGVpZ2h0OiA0cHg7XG5cdFx0YmFja2dyb3VuZDogIzMyMzIzMjtcblx0XHRvdXRsaW5lOiBub25lO1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblxuXG5cdC5wUmFuZ2U6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcblx0XHRib3JkZXItcmFkaXVzOiA4cHg7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuXHRcdGFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0d2lkdGg6IDE2cHg7XG5cdFx0aGVpZ2h0OiAxNnB4O1xuXHRcdGJhY2tncm91bmQ6ICM4ODg4ODg7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdH1cblxuXHQucFJhbmdlOjotbW96LXJhbmdlLXRodW1iIHtcblx0XHRib3JkZXItcmFkaXVzOiA4cHg7XG5cdFx0d2lkdGg6IDE2cHg7XG5cdFx0aGVpZ2h0OiAxNnB4O1xuXHRcdGJhY2tncm91bmQ6ICM4ODg4ODg7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdH1cblxuXHQucElucHV0IHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Y29sb3I6ICM1NTU1NTU7XG5cdFx0cGFkZGluZzogNHB4O1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0XHRtYXJnaW4tdG9wOiA0cHg7XG5cdH1cblxuXHQucElucHV0OmhvdmVyIHtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjNDhjZmZmO1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHR9XG5cblx0LnJpZ2h0IHtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiA0OHB4O1xuXHR9XG5cblx0LmxlZnQge1xuXHRcdHJpZ2h0OiA3MnB4O1xuXHRcdHdpZHRoOiA0OHB4O1xuXHR9XG5cblx0LmFsaWduTGVmdCB7XG5cdFx0dGV4dC1hbGlnbjogbGVmdDtcblx0fVxuXG5cdC5mdWxsIHtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiAxMTJweDtcblx0fVxuXG5cdC5wSW1hZ2Uge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdG1hcmdpbi1sZWZ0OiA4cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdHdpZHRoOiAxOTZweDtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogNHB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IC00cHg7XG5cdFx0cGFkZGluZzogNHB4O1xuXHR9XG5cblx0LnBJbWFnZTpob3ZlciB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzQ4Y2ZmZjtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0XHRvdXRsaW5lOiAycHggc29saWQgIzI5MjkyOTtcblx0fVxuXG5cdC5wQ29sb3Ige1xuXHRcdG91dGxpbmU6IDRweCBzb2xpZCAjMjkyOTI5O1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAtNHB4O1xuXHR9XG5cblx0LnBDb2xvcjpob3ZlciB7XG5cdFx0b3V0bGluZTogMnB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdH1cblxuXHQucFNlbGVjdCB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHJpZ2h0OiA4cHg7XG5cdFx0d2lkdGg6IDEyMnB4O1xuXHRcdGNvbG9yOiAjNTU1NTU1O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0cGFkZGluZzogNHB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRvdXRsaW5lOiBub25lO1xuXHR9XG5cblx0LnBEaXZpZGVyIHtcblx0XHRoZWlnaHQ6IDFweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuXHRcdG1hcmdpbjogMTZweCA4cHggMTZweCA4cHg7XG5cdH1cblxuXHQucEFjY29yZGlhbiB7XG5cdFx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICMxNDE0MTQ7XG5cdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxNDE0MTQ7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdG1pbi1oZWlnaHQ6IDMycHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzFEMUQxRDtcblx0XHRtYXJnaW4tdG9wOiAxNnB4O1xuXHR9XG5cblx0LnBBY2NvcmRpYW5Cb2R5IHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRtYXJnaW4tdG9wOiAzMnB4O1xuXHRcdHBhZGRpbmctdG9wOiA0cHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcblx0fVxuXG5cdC5hY3RpdmUge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGhlaWdodDogYXV0bztcblx0fVxuXG5cdC5oYXNWYWx1ZSB7XG5cdFx0Y29sb3I6ICNGRkY7XG5cdH1cblxuXHQuc29jaWFsTGlua3Mge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG5cdFx0cG9zaXRpb246IGZpeGVkO1xuXHRcdGJvdHRvbTogMHB4O1xuXHRcdHJpZ2h0OiAwcHg7XG5cdFx0cGFkZGluZy10b3A6IDRweDtcblx0XHR6LWluZGV4OiAxMDA7XG5cdH1cblxuXHQuc3Ryb25nIHtcblx0XHRmb250LXdlaWdodDogNjAwO1xuXHR9XG5cblwiXCJcIlxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBEaXZcblxuY2xhc3MgcERpdlxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBEaXZcIilcblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFwidmlzaWJsZVwiLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92aXNpYmxlXG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX3Zpc2libGVcblxuXHRcdFx0XHRAX3Zpc2libGUgPSBib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBSb3dcblxuY2xhc3MgcFJvdyBleHRlbmRzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0ZXh0OiAnTGFiZWwnXG5cdFx0XHRib2xkOiBmYWxzZVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInBEaXZcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFJvd1wiKVxuXG5cdFx0QGxhYmVsID0gbmV3IHBTcGFuXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dFxuXHRcdFx0Ym9sZDogb3B0aW9ucy5ib2xkXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdmlkZXJcblxuY2xhc3MgcERpdmlkZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2aWRlclwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU3BhblxuXG5jbGFzcyBwU3BhblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHR0ZXh0OiAnaGVsbG8gd29ybGQnXG5cdFx0XHRib2xkOiBmYWxzZVxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFNwYW5cIilcblx0XHRAZWxlbWVudC50ZXh0Q29udGVudCA9IG9wdGlvbnMudGV4dFxuXG5cdFx0aWYgb3B0aW9ucy5ib2xkXG5cdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Ryb25nXCIpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFJhbmdlXG5cbmNsYXNzIHBSYW5nZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0bWluOiAnMCdcblx0XHRcdG1heDogJzEwMCdcblx0XHRcdHZhbHVlOiAnMTAwJ1xuXHRcdFx0YWN0aW9uOiAodmFsdWUpID0+IG51bGxcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdF8uYXNzaWduIEBlbGVtZW50LFxuXHRcdFx0dHlwZTogJ3JhbmdlJ1xuXHRcdFx0bWluOiBvcHRpb25zLm1pblxuXHRcdFx0bWF4OiBvcHRpb25zLm1heFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdGFjdGlvbjogb3B0aW9ucy5hY3Rpb25cblxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUmFuZ2VcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0QGVsZW1lbnQub25pbnB1dCA9ID0+IEBhY3Rpb24oQHZhbHVlKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAZWxlbWVudC52YWx1ZVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGFjdGlvbjogb3B0aW9ucy5hY3Rpb25cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgTGFiZWxcblxuY2xhc3MgcExhYmVsXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblx0XHRcdGNsYXNzTmFtZTogbnVsbFxuXHRcdFx0dGV4dDogJ3gnXG5cdFx0XHRmb3I6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBMYWJlbFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cdFx0XG5cdFx0Xy5hc3NpZ24gQGVsZW1lbnQsXG5cdFx0XHR0ZXh0Q29udGVudDogb3B0aW9ucy50ZXh0XG5cdFx0XHRmb3I6IG9wdGlvbnMuZm9yXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBJbnB1dFxuXG5jbGFzcyBwSW5wdXRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR2YWx1ZTogJydcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJydcblx0XHRcdGlzRGVmYXVsdDogdHJ1ZVxuXHRcdFx0c2VjdGlvbjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicElucHV0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogb3B0aW9ucy5wYXJlbnRcblx0XHRcdGNsYXNzTmFtZTogb3B0aW9ucy5jbGFzc05hbWVcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdFxuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0aWYgbm90IHZhbHVlPyBvciB2YWx1ZSBpcyBcIlwiXG5cdFx0XHRcdFx0dmFsdWUgPSBTdHJpbmcoQGRlZmF1bHQpXG5cblx0XHRcdFx0QGVsZW1lbnQudmFsdWUgPSB2YWx1ZVxuXG5cdFx0XHRcdFV0aWxzLmRlbGF5IDAsID0+XG5cdFx0XHRcdFx0aWYgdmFsdWU/IGFuZCBub3QgQGlzRGVmYXVsdCBhbmQgdmFsdWUgaXNudCBcIlwiXG5cdFx0XHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHRydWVcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCdpc0RlZmF1bHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9pc0RlZmF1bHRcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdEBfaXNEZWZhdWx0ID0gYm9vbFxuXG5cdFx0XHRcdGlmIGJvb2xcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoYXNWYWx1ZScpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0QC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhc1ZhbHVlJylcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0ZGVmYXVsdDogb3B0aW9ucy5kZWZhdWx0XG5cdFx0XHRzZWN0aW9uOiBvcHRpb25zLnNlY3Rpb25cblx0XHRcdGlzRGVmYXVsdDogb3B0aW9ucy5pc0RlZmF1bHRcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgSW1hZ2VcblxuY2xhc3MgcEltYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHR2YWx1ZTogJydcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRzZWN0aW9uOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicEltYWdlXCIpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQuc3JjID0gdmFsdWVcblx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB2YWx1ZSBpc250ICcnXG5cblxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdGlmIG5vdCBzZWNyZXRCb3hcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHNlY3JldEJveC52YWx1ZSA9IEB2YWx1ZVxuXHRcdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBDb2xvciBCb3hcblxuY2xhc3MgcENvbG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHR2YWx1ZTogJyMyOTI5MjknXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicElucHV0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncENvbG9yJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblxuXHRcdFx0XHRpZiB2YWx1ZT8uY29sb3IgaXMgJ3RyYW5zcGFyZW50J1xuXHRcdFx0XHRcdHZhbHVlID0gbnVsbFxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdEBzZWN0aW9uPy52aXNpYmxlID0gdHJ1ZVxuXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdmFsdWVcblxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdGlmIG5vdCBzZWNyZXRCb3hcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHNlY3JldEJveC52YWx1ZSA9IEB2YWx1ZVxuXHRcdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBTZWxlY3RcblxuY2xhc3MgcFNlbGVjdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHRzZWxlY3RlZDogMFxuXHRcdFx0b3B0aW9uczogWydyZWQnLCAnd2hpdGUnLCAnYmx1ZSddXG5cdFx0XHRjYWxsYmFjazogKHZhbHVlKSAtPiBudWxsXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBTZWxlY3RcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoYXNWYWx1ZScpXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogb3B0aW9ucy5wYXJlbnRcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dGV4dDogJ+KWvidcblx0XHRcdGZvcjogQGVsZW1lbnRcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdvcHRpb25zJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfb3B0aW9uc1xuXHRcdFx0c2V0OiAoYXJyYXkpIC0+XG5cdFx0XHRcdEBfb3B0aW9ucyA9IGFycmF5XG5cdFx0XHRcdEBtYWtlT3B0aW9ucygpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdzZWxlY3RlZCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3NlbGVjdGVkXG5cdFx0XHRzZXQ6IChudW0pIC0+XG5cdFx0XHRcdEBfc2VsZWN0ZWQgPSBudW1cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRfb3B0aW9uczogW11cblx0XHRcdF9vcHRpb25FbGVtZW50czogW11cblx0XHRcdG9wdGlvbnM6IG9wdGlvbnMub3B0aW9uc1xuXHRcdFx0Y2FsbGJhY2s6IG9wdGlvbnMuY2FsbGJhY2tcblx0XHRcdHNlbGVjdGVkOiBvcHRpb25zLnNlbGVjdGVkXG5cblx0XHRAZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gb3B0aW9ucy5zZWxlY3RlZFxuXG5cdFx0QGVsZW1lbnQub25jaGFuZ2UgPSA9PiBcblx0XHRcdEBzZWxlY3RlZCA9IEBlbGVtZW50LnNlbGVjdGVkSW5kZXhcblx0XHRcdEBjYWxsYmFjayhAZWxlbWVudC5zZWxlY3RlZEluZGV4KVxuXHRcdFxuXG5cdG1ha2VPcHRpb25zOiA9PlxuXHRcdGZvciBvcHRpb24sIGkgaW4gQF9vcHRpb25FbGVtZW50c1xuXHRcdFx0QGVsZW1lbnQucmVtb3ZlQ2hpbGQob3B0aW9uKVxuXG5cdFx0QF9vcHRpb25FbGVtZW50cyA9IFtdXG5cblx0XHRmb3Igb3B0aW9uLCBpIGluIEBvcHRpb25zXG5cdFx0XHRvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcblx0XHRcdG8udmFsdWUgPSBvcHRpb25cblx0XHRcdG8ubGFiZWwgPSBvcHRpb25cblx0XHRcdG8uaW5uZXJIVE1MID0gb3B0aW9uXG5cdFx0XHRAZWxlbWVudC5hcHBlbmRDaGlsZChvKVxuXG5cdFx0XHRAX29wdGlvbkVsZW1lbnRzLnB1c2gobylcblxuXHRcdFx0aWYgaSBpcyBAc2VsZWN0ZWRcblx0XHRcdFx0QHZhbHVlID0gQGVsZW1lbnQub3B0aW9uc1tAZWxlbWVudC5zZWxlY3RlZEluZGV4XS5sYWJlbFxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBBY2NvcmRpYW5cblxuY2xhc3MgcEFjY29yZGlhbiBleHRlbmRzIHBSb3dcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncEFjY29yZGlhbicpXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIEB0b2dnbGVcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR0b2dnbGVkOiBmYWxzZVxuXG5cdFx0QHVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dGV4dDogJ+KWvydcblx0XHRcdGZvcjogQGVsZW1lbnRcblxuXHRcdEBib2R5ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogJydcblx0XHRAYm9keS5lbGVtZW50LnJlbW92ZUNoaWxkKEBib2R5LmxhYmVsLmVsZW1lbnQpXG5cblx0XHRAZWxlbWVudC5hcHBlbmRDaGlsZChAYm9keS5lbGVtZW50KVxuXHRcdEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncEFjY29yZGlhbkJvZHknKVxuXG5cdFx0QGJvZHkuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldmVudCkgLT4gXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0aWYgYWNjb3JkaW9uc09wZW4gdGhlbiBAdG9nZ2xlKCkgIyBzdGFydCBvcGVuXG5cblx0dG9nZ2xlOiA9PlxuXHRcdEB0b2dnbGVkID0gIUB0b2dnbGVkXG5cblx0XHRpZiBAdG9nZ2xlZFxuXHRcdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuXHRcdFx0QHVuaXQuZWxlbWVudC50ZXh0Q29udGVudCA9ICfilr4nXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKVxuXHRcdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuXHRcdFx0QHVuaXQuZWxlbWVudC50ZXh0Q29udGVudCA9ICfilr8nXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIFx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIFx0YFk4ODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuICAgIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhcbiBcdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICAgICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcbiBcdGQ4JyAgIC44UCA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC4uLiAgICAgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG4gXHQgWTg4ODg4UCAgODhZODg4UCcgYDg4ODg4UCcgYDg4ODg4UCcgICAgIGRQICAgICAgICBgODg4ODhQOCBkUCAgICBkUCBgODg4ODhQJyBkUFxuIFx0ICAgICAgICAgIDg4XG4gXHQgICAgICAgICAgZFBcblxuIyMjXG5cbmNsYXNzIFNwZWNQYW5lbFxuXHRjb25zdHJ1Y3RvcjogLT5cblxuXHRcdEBlbGVtZW50ID0gcGFuZWxcblx0XHRAcHJvcExheWVycyA9IFtdXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRAZGVmYXVsdHMgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5fcHJvcGVydHlMaXN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaWYgc3RhcnRPcGVuIHRoZW4gJzEnIGVsc2UgJzAnXG5cdFx0QGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBkZXZpY2VcblxuXHRcdCMgU2V0IERldmljZSBPcHRpb25zXG5cblx0XHRkZXZpY2VPcHRpb25zID0gW11cblx0XHRjdXJyZW50U2VsZWN0ZWQgPSB1bmRlZmluZWRcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1xuXHRcdFx0aWYgXy5lbmRzV2l0aChrZXksICdoYW5kJylcblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgbm90IHZhbHVlLm1pblN0dWRpb1ZlcnNpb24/XG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGlmIFV0aWxzLmZyYW1lclN0dWRpb1ZlcnNpb24oKSA+IHZhbHVlLm1heFN0dWRpb1ZlcnNpb25cblx0XHRcdFx0Y29udGludWUgXG5cblx0XHRcdGlmIFV0aWxzLmZyYW1lclN0dWRpb1ZlcnNpb24oKSA8IHZhbHVlLm1pblN0dWRpb1ZlcnNpb25cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0ZGV2aWNlT3B0aW9ucy5wdXNoIChrZXkpXG5cblx0XHRcdGlmIGtleSBpcyBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblx0XHRcdFx0Y3VycmVudFNlbGVjdGVkID0gZGV2aWNlT3B0aW9ucy5sZW5ndGggLSAxXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZnJhbWVyIHNldHRpbmdzXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZGV2aWNlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0RldmljZSdcblxuXHRcdEBkZXZpY2VCb3ggPSBuZXcgcFNlbGVjdFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRvcHRpb25zOiBkZXZpY2VPcHRpb25zXG5cdFx0XHRzZWxlY3RlZDogY3VycmVudFNlbGVjdGVkXG5cdFx0XHRjYWxsYmFjazogKGluZGV4KSA9PlxuXHRcdFx0XHRkZXZpY2VUeXBlID0gZGV2aWNlT3B0aW9uc1tpbmRleF1cblx0XHRcdFx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdFx0XHRcdFxuXHRcdFx0XHRfLmFzc2lnbiB3aW5kb3cubG9jYWxTdG9yYWdlLFxuXHRcdFx0XHRcdGRldmljZVR5cGU6IGRldmljZVR5cGVcblx0XHRcdFx0XHRkZXZpY2U6IGRldmljZVxuXHRcdFx0XHRcdGJnOiBTY3JlZW4uYmFja2dyb3VuZENvbG9yXG5cblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYW5pbWF0aW9uIHNwZWVkXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1NwZWVkJ1xuXG5cdFx0QHNwZWVkQm94ID0gbmV3IHBSYW5nZVxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0YWN0aW9uOiAodmFsdWUpIC0+XG5cdFx0XHRcdGJhc2UgPSAwLjAxNjY2NjY2NjY2NjY2NjY2NlxuXHRcdFx0XHRGcmFtZXIuTG9vcC5kZWx0YSA9IGJhc2UgKiBfLmNsYW1wKHZhbHVlLzEwMCwgLjAwMDAwMDAwMDEsIDEpXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBsYXllciBkZXRhaWxzXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblxuXHRcdEBuYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cblx0XHRAY29tcG9uZW50TmFtZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBjb21wb25lbnROYW1lc1JvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUGFydCBvZidcblxuXHRcdEBjb21wb25lbnROYW1lc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogQGNvbXBvbmVudE5hbWVzUm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvbiBkZXRhaWxzXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdQb3NpdGlvbidcblxuXHRcdEB4Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNpemVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblxuXHRcdEB3aWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdEBoZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdoJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJhY2tncm91bmQgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnQmFja2dyb3VuZCdcblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmFkaWVudFxuXG5cdFx0QGdyYWRpZW50UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnR3JhZGllbnQnXG5cblx0XHRAZ3JhZGllbnRTdGFydEJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0QGdyYWRpZW50RW5kQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50IGFuZ2xlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGdyYWRpZW50QW5nbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdhJ1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIG9wYWNpdHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblxuXHRcdEBvcGFjaXR5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRuZXcgcERpdmlkZXJcblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBib3JkZXIgcHJvcGVydGllc1xuXG5cdFx0QGJvcmRlclByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHRwYXJlbnQ6IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHRAYm9yZGVyQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBib3JkZXJXaWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXHRcdFx0c2VjdGlvbjogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByYWRpdXNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0cGFyZW50OiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0QGJvcmRlclJhZGl1c0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2hhZG93XG5cblxuXHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXG5cdFx0QHNoYWRvd0NvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QHNoYWRvd1NwcmVhZEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAncydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAc2hhZG93WUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93Qmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdiJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdGV4dCBzdHlsZXNcblxuXHRcdEB0ZXh0UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZm9udCBmYW1pbHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cblx0XHRAZm9udEZhbWlseUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGNvbG9yXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdDb2xvcidcblxuXHRcdEBjb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGZvbnRTaXplQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHdlaWdodFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3R5bGUnXG5cblx0XHRAZm9udFN0eWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRAZm9udFdlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYWxpZ25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0FsaWduJ1xuXG5cdFx0QHRleHRBbGlnbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJ2xlZnQnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc3BhY2luZ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3BhY2luZydcblxuXHRcdEBsZXR0ZXJTcGFjaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdsdCdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0QGxpbmVIZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdsbidcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdUZXh0J1xuXG5cdFx0QHRleHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRyYW5zZm9ybSBwcm9wZXJ0aWVzXG5cblxuXHRcdEB0cmFuc2Zvcm1zRGl2ID0gbmV3IHBEaXZcblxuXHRcdEB0cmFuc2Zvcm1zQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnVHJhbnNmb3Jtcydcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNEaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNjYWxlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NjYWxlJ1xuXG5cdFx0QHNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNjYWxlWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNjYWxlWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByb3RhdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdSb3RhdGUnXG5cblx0XHRAcm90YXRpb25Cb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAcm90YXRpb25YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAcm90YXRpb25ZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgb3JpZ2luXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ09yaWdpbidcblxuXHRcdEBvcmlnaW5YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAb3JpZ2luWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBza2V3XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NrZXcnXG5cblx0XHRAc2tld0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBza2V3WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNrZXdZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBlcnNwZWN0aXZlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1BlcnNwZWN0aXZlJ1xuXG5cdFx0QHBlcnNwZWN0aXZlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcnXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmaWx0ZXJzIHByb3BlcnRpZXNcblxuXG5cdFx0QGZpbHRlcnNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGZpbHRlcnNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblx0XHRcdHRleHQ6ICdGaWx0ZXJzJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJsdXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQmx1cidcblxuXHRcdEBibHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBicmlnaHRuZXNzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYnJpZ2h0bmVzc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29udHJhc3RcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQ29udHJhc3QnXG5cblx0XHRAY29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYXlzY2FsZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdHcmF5c2NhbGUnXG5cblx0XHRAZ3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBodWVyb3RhdGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGh1ZVJvdGF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW52ZXJ0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0ludmVydCdcblxuXHRcdEBpbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNhdHVyYXRlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QHNhdHVyYXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzZXBpYVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBzZXBpYUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZCBmaWx0ZXJzXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBlZmZlY3RzIHByb3BlcnRpZXNcblxuXG5cdFx0QGVmZmVjdHNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGVmZmVjdHNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdFZmZlY3RzJ1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmFja2dyb3VuZCBmaWx0ZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsZW5kaW5nJ1xuXG5cdFx0QGJsZW5kaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICdub3JtYWwnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsdXInXG5cblx0XHRAYmFja2dyb3VuZEJsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYmFja2dyb3VuZEJyaWdodG5lc3NCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QGJhY2tncm91bmRTYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGJhY2tncm91bmRIdWVSb3RhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0NvbnRyYXN0J1xuXG5cdFx0QGJhY2tncm91bmRDb250cmFzdEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnSW52ZXJ0J1xuXG5cdFx0QGJhY2tncm91bmRJbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0dyYXlzY2FsZSdcblxuXHRcdEBiYWNrZ3JvdW5kR3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBiYWNrZ3JvdW5kU2VwaWFCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBhbmltYXRpb24gcHJvcGVydGllc1xuXG5cblx0XHRAYW5pbXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGFuaW1zQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnQW5pbWF0aW9ucydcblx0XHRcdHBhcmVudDogQGFuaW1zRGl2XG5cblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGV2ZW50IGxpc3RlbmVyIHByb3BlcnRpZXNcblxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzRGl2ID0gbmV3IHBEaXZcblxuXHRcdEBldmVudExpc3RlbmVyc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ0V2ZW50IExpc3RlbmVycydcblx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzRGl2XG5cblxuXG5cdFx0IyBpbWFnZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QGltYWdlUHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRuZXcgcERpdmlkZXJcblx0XHRcdHBhcmVudDogQGltYWdlUHJvcGVydGllc0RpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGltYWdlXG5cblx0XHRAaW1hZ2VCb3ggPSBuZXcgcEltYWdlXG5cdFx0XHRwYXJlbnQ6IEBpbWFnZVByb3BlcnRpZXNEaXZcblx0XHRcdHNlY3Rpb246IEBpbWFnZVByb3BlcnRpZXNEaXZcblxuXG5cdFx0IyBzY3JlZW5zaG90IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0QHNjcmVlbnNob3REaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNjcmVlbnNob3RcblxuXHRcdEBzY3JlZW5zaG90Qm94ID0gbmV3IHBJbWFnZVxuXHRcdFx0cGFyZW50OiBAc2NyZWVuc2hvdERpdlxuXHRcdFx0c2VjdGlvbjogQHNjcmVlbnNob3REaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBsYWNlaG9sZGVyc1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICcnXG5cdFx0cm93LmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJzY0cHgnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc29jaWFsIG1lZGlhIGxpbmtzXG5cblx0XHRAc29jaWFsTWVkaWFSb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXYuYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBsaW5rZWRpbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAbGlua2VkaW5JY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9zdGV2ZXJ1aXpva1wiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBpZD1cImxpbmtlZGluX2xvZ29cIiBjbGFzcz1cImxvZ29cIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PHBhdGggZD1cIk0xOSAwaC0xNGMtMi43NjEgMC01IDIuMjM5LTUgNXYxNGMwIDIuNzYxIDIuMjM5IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOSA1LTV2LTE0YzAtMi43NjEtMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTFoM3YxMXptLTEuNS0xMi4yNjhjLS45NjYgMC0xLjc1LS43OS0xLjc1LTEuNzY0cy43ODQtMS43NjQgMS43NS0xLjc2NCAxLjc1Ljc5IDEuNzUgMS43NjQtLjc4MyAxLjc2NC0xLjc1IDEuNzY0em0xMy41IDEyLjI2OGgtM3YtNS42MDRjMC0zLjM2OC00LTMuMTEzLTQgMHY1LjYwNGgtM3YtMTFoM3YxLjc2NWMxLjM5Ni0yLjU4NiA3LTIuNzc3IDcgMi40NzZ2Ni43NTl6XCIvPjwvc3ZnPidcblxuXHRcdEBnaXRodWJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQGdpdGh1Ykljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly9naXRodWIuY29tL3N0ZXZlcnVpem9rL2dvdGNoYVwiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIGhlaWdodD1cIjIwcHhcIiB3aWR0aD1cIjIwcHhcIiBpZD1cImdpdGh1Yl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCI+PHBhdGggZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgZD1cIk01MTIgMEMyMjkuMjUgMCAwIDIyOS4yNSAwIDUxMmMwIDIyNi4yNSAxNDYuNjg4IDQxOC4xMjUgMzUwLjE1NiA0ODUuODEyIDI1LjU5NCA0LjY4OCAzNC45MzgtMTEuMTI1IDM0LjkzOC0yNC42MjUgMC0xMi4xODgtMC40NjktNTIuNTYyLTAuNzE5LTk1LjMxMkMyNDIgOTA4LjgxMiAyMTEuOTA2IDgxNy41IDIxMS45MDYgODE3LjVjLTIzLjMxMi01OS4xMjUtNTYuODQ0LTc0Ljg3NS01Ni44NDQtNzQuODc1LTQ2LjUzMS0zMS43NSAzLjUzLTMxLjEyNSAzLjUzLTMxLjEyNSA1MS40MDYgMy41NjIgNzguNDcgNTIuNzUgNzguNDcgNTIuNzUgNDUuNjg4IDc4LjI1IDExOS44NzUgNTUuNjI1IDE0OSA0Mi41IDQuNjU0LTMzIDE3LjkwNC01NS42MjUgMzIuNS02OC4zNzVDMzA0LjkwNiA3MjUuNDM4IDE4NS4zNDQgNjgxLjUgMTg1LjM0NCA0ODUuMzEyYzAtNTUuOTM4IDE5Ljk2OS0xMDEuNTYyIDUyLjY1Ni0xMzcuNDA2LTUuMjE5LTEzLTIyLjg0NC02NS4wOTQgNS4wNjItMTM1LjU2MiAwIDAgNDIuOTM4LTEzLjc1IDE0MC44MTIgNTIuNSA0MC44MTItMTEuNDA2IDg0LjU5NC0xNy4wMzEgMTI4LjEyNS0xNy4yMTkgNDMuNSAwLjE4OCA4Ny4zMTIgNS44NzUgMTI4LjE4OCAxNy4yODEgOTcuNjg4LTY2LjMxMiAxNDAuNjg4LTUyLjUgMTQwLjY4OC01Mi41IDI4IDcwLjUzMSAxMC4zNzUgMTIyLjU2MiA1LjEyNSAxMzUuNSAzMi44MTIgMzUuODQ0IDUyLjYyNSA4MS40NjkgNTIuNjI1IDEzNy40MDYgMCAxOTYuNjg4LTExOS43NSAyNDAtMjMzLjgxMiAyNTIuNjg4IDE4LjQzOCAxNS44NzUgMzQuNzUgNDcgMzQuNzUgOTQuNzUgMCA2OC40MzgtMC42ODggMTIzLjYyNS0wLjY4OCAxNDAuNSAwIDEzLjYyNSA5LjMxMiAyOS41NjIgMzUuMjUgMjQuNTYyQzg3Ny40MzggOTMwIDEwMjQgNzM4LjEyNSAxMDI0IDUxMiAxMDI0IDIyOS4yNSA3OTQuNzUgMCA1MTIgMHpcIiAvPjwvc3ZnPidcblxuXHRcdEB0d2l0dGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEB0d2l0dGVySWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL3R3aXR0ZXIuY29tL3N0ZXZlcnVpem9rXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgaGVpZ2h0PVwiMjhweFwiIHdpZHRoPVwiMjhweFwiIGlkPVwidHdpdHRlcl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgZGF0YS1uYW1lPVwiTG9nbyDigJQgRklYRURcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA0MDAgNDAwXCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOnJnYmEoOTEsIDkxLCA5MSwgMS4wMDApO308L3N0eWxlPjwvZGVmcz48dGl0bGU+VHdpdHRlcl9Mb2dvX0JsdWU8L3RpdGxlPjxyZWN0IGNsYXNzPVwiY2xzLTFcIiB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiLz48cGF0aCBjbGFzcz1cImNscy0yXCIgZD1cIk0xNTMuNjIsMzAxLjU5Yzk0LjM0LDAsMTQ1Ljk0LTc4LjE2LDE0NS45NC0xNDUuOTQsMC0yLjIyLDAtNC40My0uMTUtNi42M0ExMDQuMzYsMTA0LjM2LDAsMCwwLDMyNSwxMjIuNDdhMTAyLjM4LDEwMi4zOCwwLDAsMS0yOS40Niw4LjA3LDUxLjQ3LDUxLjQ3LDAsMCwwLDIyLjU1LTI4LjM3LDEwMi43OSwxMDIuNzksMCwwLDEtMzIuNTcsMTIuNDUsNTEuMzQsNTEuMzQsMCwwLDAtODcuNDEsNDYuNzhBMTQ1LjYyLDE0NS42MiwwLDAsMSw5Mi40LDEwNy44MWE1MS4zMyw1MS4zMywwLDAsMCwxNS44OCw2OC40N0E1MC45MSw1MC45MSwwLDAsMSw4NSwxNjkuODZjMCwuMjEsMCwuNDMsMCwuNjVhNTEuMzEsNTEuMzEsMCwwLDAsNDEuMTUsNTAuMjgsNTEuMjEsNTEuMjEsMCwwLDEtMjMuMTYuODgsNTEuMzUsNTEuMzUsMCwwLDAsNDcuOTIsMzUuNjIsMTAyLjkyLDEwMi45MiwwLDAsMS02My43LDIyQTEwNC40MSwxMDQuNDEsMCwwLDEsNzUsMjc4LjU1YTE0NS4yMSwxNDUuMjEsMCwwLDAsNzguNjIsMjNcIi8+PC9zdmc+J1xuXG5cdFx0Zm9yIGVsZW1lbnQgaW4gW0BsaW5rZWRpbkljb24sIEBnaXRodWJJY29uLCBAdHdpdHRlckljb25dXG5cdFx0XHRAc29jaWFsTWVkaWFSb3cuZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KVxuXHRcdFx0QHNvY2lhbE1lZGlhUm93LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc29jaWFsTGlua3MnKVxuXG5cdFx0QGhpZGVEaXZzKClcblx0XHRAY2xlYXJQcm9wcygpXG5cblx0Y2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9uczogKGFuaW1hdGlvbnMpID0+XG5cdFx0Y2hpbGQgPSBAYW5pbXNBY2NvLmJvZHkuZWxlbWVudC5jaGlsZE5vZGVzWzBdXG5cblx0XHRpZiBub3QgY2hpbGRcblx0XHRcdEBzaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAYW5pbXNBY2NvLmJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZClcblx0XHRAY2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXG5cdGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzOiAoZXZlbnRMaXN0ZW5lcnMpID0+XG5cblx0XHRjaGlsZCA9IEBldmVudExpc3RlbmVyc0FjY28uYm9keS5lbGVtZW50LmNoaWxkTm9kZXNbMF1cblxuXHRcdGlmIG5vdCBjaGlsZFxuXHRcdFx0QHNob3dFdmVudExpc3RlbmVycyhldmVudExpc3RlbmVycylcblx0XHRcdHJldHVyblxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG5cdFx0QGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzKGV2ZW50TGlzdGVuZXJzKVxuXG5cdHNob3dFdmVudExpc3RlbmVyczogKGV2ZW50TGlzdGVuZXJzID0gW10pID0+XG5cdFx0XG5cdFx0QGV2ZW50TGlzdGVuZXJzRGl2LnZpc2libGUgPSBldmVudExpc3RlbmVycy5sZW5ndGggPiAwXG5cblx0XHRmb3IgbGlzdGVuZXIsIGkgaW4gZXZlbnRMaXN0ZW5lcnNcblxuXHRcdFx0aWYgbGlzdGVuZXIuZXZlbnRzLmxlbmd0aCBpcyAxIGFuZCBfLmluY2x1ZGVzKFtcblx0XHRcdFx0XCJmdW5jdGlvbiAoKXtyZXR1cm4gZm4uYXBwbHkobWUsYXJndW1lbnRzKX1cIiwgXG5cdFx0XHRcdFwiZnVuY3Rpb24gKCl7cmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpfVwiLCBcblx0XHRcdFx0XCJmdW5jdGlvbiAoZXZlbnQpe3JldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVwiLFxuXHRcdFx0XHRcImZ1bmN0aW9uICgpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH1cIixcblx0XHRcdFx0J2Z1bmN0aW9uIGRlYm91bmNlZCgpe3ZhciB0aW1lPW5vdygpLGlzSW52b2tpbmc9c2hvdWxkSW52b2tlKHRpbWUpO2lmKGxhc3RBcmdzPWFyZ3VtZW50cyxsYXN0VGhpcz10aGlzLGxhc3RDYWxsVGltZT10aW1lLGlzSW52b2tpbmcpe2lmKHRpbWVySWQ9PT11bmRlZmluZWQpcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7aWYobWF4aW5nKXJldHVybiB0aW1lcklkPXNldFRpbWVvdXQodGltZXJFeHBpcmVkLHdhaXQpLGludm9rZUZ1bmMobGFzdENhbGxUaW1lKX1yZXR1cm4gdGltZXJJZD09PXVuZGVmaW5lZCYmKHRpbWVySWQ9c2V0VGltZW91dCh0aW1lckV4cGlyZWQsd2FpdCkpLHJlc3VsdH0nLFxuXHRcdFx0XHQnZnVuY3Rpb24gKHZhbHVlKXtpZihudWxsIT09dmFsdWUpcmV0dXJuXCJmb250U2l6ZVwiIT09cHJvcGVydHkmJlwiZm9udFwiIT09cHJvcGVydHkmJl90aGlzLl9zdHlsZWRUZXh0LnJlc2V0U3R5bGUocHJvcGVydHkpLF90aGlzLnJlbmRlclRleHQoKX0nLFxuXHRcdFx0XHRdLCBsaXN0ZW5lci5ldmVudHNbMF0uZnVuY3Rpb24pXG5cblx0XHRcdFx0QGV2ZW50TGlzdGVuZXJzRGl2LnZpc2libGUgPSBmYWxzZVxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRAZXZlbnRMaXN0ZW5lcnNEaXYudmlzaWJsZSA9IHRydWVcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBsaXN0ZW5lclxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnXCInICsgbGlzdGVuZXIubGlzdGVuZXIgKyAnXCInXG5cdFx0XHRcdGJvbGQ6IHRydWVcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBldmVudHNcblxuXHRcdFx0Zm9yIGV2ZW50LCBlIGluIGxpc3RlbmVyLmV2ZW50c1xuXG5cdFx0XHRcdCMgbmFtZVxuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnTmFtZSdcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQubmFtZSA/ICcnXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBldmVudC5uYW1lIGlzbnQgJ3VuZGVmaW5lZCdcblxuXHRcdFx0XHQjIGZ1bmN0aW9uXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdGdW5jdGlvbidcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQuZnVuY3Rpb25cblx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0IyBPbmNlXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdPbmNlJ1xuXHRcdFx0XHRcblx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdHZhbHVlOiBldmVudC5vbmNlXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBldmVudC5uYW1lIGlzbnQgJ2ZhbHNlJ1xuXG5cdFx0XHRcdHVubGVzcyBlIGlzIGxpc3RlbmVyLmV2ZW50cy5sZW5ndGggLSAxXG5cdFx0XHRcdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXG5cdFx0XHR1bmxlc3MgaSBpcyBldmVudExpc3RlbmVycy5sZW5ndGggLSAxXG5cdFx0XHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cblx0c2hvd0FuaW1hdGlvbnM6IChhbmltYXRpb25zKSA9PlxuXHRcdFxuXHRcdEBhbmltc0Rpdi52aXNpYmxlID0gYW5pbWF0aW9ucy5sZW5ndGggPiAwXG5cdFxuXHRcdGZvciBhbmltLCBpIGluIGFuaW1hdGlvbnNcblxuXHRcdFx0cHJvcGVydGllcyA9IGFuaW0ucHJvcGVydGllc1xuXHRcdFx0b3B0aW9ucyA9IGFuaW0ub3B0aW9uc1xuXHRcdFx0c3RhdGVBID0gYW5pbS5fc3RhdGVBXG5cdFx0XHRzdGF0ZUIgPSBhbmltLl9zdGF0ZUJcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0XHQjIGFuaW1hdGlvblxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnQW5pbWF0aW9uICcgKyAoaSArIDEpXG5cdFx0XHRcdGJvbGQ6IHRydWVcblxuXHRcdFx0ZnJvbVVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRcdHBhcmVudDogcm93IFxuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR0ZXh0OiAnZnJvbSdcblxuXHRcdFx0dG9Vbml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdHRleHQ6ICd0bydcblxuXHRcdFx0Zm9yIGVsZW1lbnQgaW4gW2Zyb21Vbml0LmVsZW1lbnQsIHRvVW5pdC5lbGVtZW50XVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FsaWduTGVmdCcpXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIHByb3BlcnRpZXNcblxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgcHJvcGVydGllc1xuXG5cdFx0XHRcdGlmIENvbG9yLmlzQ29sb3JPYmplY3QodmFsdWUpIG9yIENvbG9yLmlzQ29sb3IodmFsdWUpXG5cblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6IF8uc3RhcnRDYXNlKGtleSlcblxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdGVsc2UgaWYga2V5IGlzICdncmFkaWVudCdcblxuXHRcdFx0XHRcdCMgc3RhcnRcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIFN0YXJ0J1xuXHRcdFx0XHRcblx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldPy5zdGFydFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5zdGFydFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyBlbmRcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIEVuZCdcblx0XHRcdFx0XG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XT8uZW5kXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV0/LmVuZFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyBhbmdsZVxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgQW5nbGUnXG5cdFx0XHRcdFxuXHRcdFx0XHRcdCMgZnJvbSBcblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldPy5hbmdsZVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5hbmdsZVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogXy5zdGFydENhc2Uoa2V5KVxuXG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIG9wdGlvbnNcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJ09wdGlvbnMnXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR1bml0OiAncydcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMudGltZVxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0dW5pdDogJ2QnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmRlbGF5XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJydcblxuXHRcdFx0IyByZXBlYXRcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dW5pdDogJ3InXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLnJlcGVhdFxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0dW5pdDogJ2wnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmxvb3Bpbmdcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHR1bmxlc3MgaSBpcyBhbmltYXRpb25zLmxlbmd0aCAtIDFcblx0XHRcdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblxuXHRcdFxuXHRzaG93UHJvcGVydGllczogKGxheWVyLCBjdXN0b21Qcm9wcykgPT5cblxuXHRcdHByb3BzID0gbGF5ZXIucHJvcHNcblx0XHRfLmFzc2lnbiBwcm9wcywgY3VzdG9tUHJvcHNcblxuXHRcdGRlZmF1bHRzID0gbGF5ZXIuX3Byb3BlcnR5TGlzdCgpXG5cblx0XHRfLmFzc2lnbiBkZWZhdWx0cyxcblx0XHRcdHJvdGF0aW9uOiBkZWZhdWx0cy5yb3RhdGlvblpcblx0XHRcdGJsZW5kaW5nOiB7ZGVmYXVsdDogJ25vcm1hbCd9XG5cblx0XHRAaGlkZURpdnMoKVxuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgXy5tZXJnZShsYXllci5wcm9wcywgY3VzdG9tUHJvcHMpXG5cblx0XHRcdHByb3BMYXllciA9IEBba2V5ICsgJ0JveCddXG5cblx0XHRcdGlmIG5vdCBwcm9wTGF5ZXJcblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0ZGVmID0gZGVmYXVsdHNba2V5XT8uZGVmYXVsdFxuXHRcdFx0XG5cdFx0XHRAc2hvd1Byb3BlcnR5KGtleSwgdmFsdWUsIHByb3BMYXllciwgZGVmKVxuXG5cdHNob3dQcm9wZXJ0eTogKGtleSwgdmFsdWUsIHByb3BMYXllciwgZGVmKSA9PlxuXG5cdFx0cHJvcExheWVyLmlzRGVmYXVsdCA9IGZhbHNlXG5cblx0XHRpZiBub3QgdmFsdWU/IG9yIF8uaXNOYU4odmFsdWUpIG9yIHZhbHVlIGlzIGRlZlxuXHRcdFx0dmFsdWUgPSBkZWYgPyAnJ1xuXHRcdFx0cHJvcExheWVyLmlzRGVmYXVsdCA9IHRydWVcblxuXHRcdCMgY29sb3Jcblx0XHRpZiBDb2xvci5pc0NvbG9yT2JqZWN0KHZhbHVlKVxuXHRcdFx0dmFsdWUgPSB2YWx1ZS50b0hzbFN0cmluZygpXG5cblx0XHQjIGdyYWRpZW50XG5cdFx0aWYgdmFsdWU/LmNvbnN0cnVjdG9yPy5uYW1lIGlzICdHcmFkaWVudCdcblx0XHRcdHByb3BMYXllci52YWx1ZSA9ICcnXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgc3RyaW5nXG5cdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdzdHJpbmcnXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuXG5cblx0XHR2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKClcblxuXHRcdCMgZmxvYXRcblx0XHRpZiB2YWx1ZS5pbmRleE9mKCcuJykgaXNudCAtMVxuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKVxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIG51bWVyXG5cdFx0cHJvcExheWVyLnZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKS50b0ZpeGVkKClcblxuXHRoaWRlRGl2czogPT5cblx0XHRmb3IgZGl2IGluIFtcblx0XHRcdEBncmFkaWVudFByb3BlcnRpZXNEaXYsXG5cdFx0XHRAdGV4dFByb3BlcnRpZXNEaXYsXG5cdFx0XHRAc2hhZG93UHJvcGVydGllc0Rpdixcblx0XHRcdEBpbWFnZVByb3BlcnRpZXNEaXYsXG5cdFx0XHRAZmlsdGVyc0Rpdixcblx0XHRcdEB0cmFuc2Zvcm1zRGl2LFxuXHRcdFx0QGJvcmRlclByb3BlcnRpZXNEaXYsXG5cdFx0XHRAZWZmZWN0c0Rpdixcblx0XHRcdEBzY3JlZW5zaG90RGl2XG5cdFx0XVxuXHRcdFxuXHRcdFx0ZGl2LnZpc2libGUgPSBmYWxzZVxuXG5cdGNsZWFyUHJvcHM6ID0+XG5cdFx0Zm9yIHByb3AgaW4gQHByb3BMYXllcnNcblx0XHRcdHByb3AudmFsdWUgPSB1bmRlZmluZWRcblxuXG5cblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcblx0ZDgnICAgYDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuXHQ4OCAgICAgICAgLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuXG5cdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuXHRZOC4gICAuODggODguICAuODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4XG5cdCBgODg4ODgnICBgODg4ODhQJyAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4ODhcblxuIyMjIFxuXG5cbmNsYXNzIEdvdGNoYVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBzcGVjUGFuZWwgPSBuZXcgU3BlY1BhbmVsXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb2xvcjogJ3JnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWxlY3RlZENvbG9yOiAncmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6ICcjRkZGRkZGJ1xuXHRcdFx0Zm9udEZhbWlseTogJ01lbmxvJ1xuXHRcdFx0Zm9udFNpemU6ICcxMCdcblx0XHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDRcblx0XHRcdHBhZGRpbmc6IHt0b3A6IDEsIGJvdHRvbTogMSwgbGVmdDogMywgcmlnaHQ6IDN9XG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y29sb3I6IG9wdGlvbnMuY29sb3Jcblx0XHRcdHNlbGVjdGVkQ29sb3I6IG9wdGlvbnMuc2VsZWN0ZWRDb2xvclxuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6IG9wdGlvbnMuc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6IG9wdGlvbnMuZm9udEZhbWlseVxuXHRcdFx0Zm9udFNpemU6IG9wdGlvbnMuZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IG9wdGlvbnMuZm9udFdlaWdodFxuXHRcdFx0c2hhcGVzOiBbXVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBvcHRpb25zLmJvcmRlclJhZGl1c1xuXHRcdFx0cGFkZGluZzogb3B0aW9ucy5wYWRkaW5nXG5cdFx0XHRmb2N1c2VkRWxlbWVudDogdW5kZWZpbmVkXG5cdFx0XHRlbmFibGVkOiBmYWxzZVxuXHRcdFx0c2NyZWVuRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XHRsYXllcnM6IFtdXG5cdFx0XHRjb250YWluZXJzOiBbXVxuXHRcdFx0dGltZXI6IHVuZGVmaW5lZFxuXHRcdFx0X29ubHlWaXNpYmxlOiB0cnVlXG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIEB0b2dnbGUpXG5cdFx0RnJhbWVyLkN1cnJlbnRDb250ZXh0LmRvbUV2ZW50TWFuYWdlci53cmFwKHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBAdXBkYXRlKVxuXG5cdFx0QGNvbnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VTY3JlZW4nKVswXVxuXHRcdEBjb250ZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdmVyQ29udGV4dCcpXG5cdFx0QGNvbnRleHQuY2hpbGROb2Rlc1syXS5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcIm9ubHlWaXNpYmxlXCIsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX29ubHlWaXNpYmxlXG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRyZXR1cm4gaWYgdHlwZW9mIGJvb2wgaXNudCAnYm9vbGVhbidcblx0XHRcdFx0QF9vbmx5VmlzaWJsZSA9IGJvb2xcblxuXHRcdEZyYW1lci5EZXZpY2Uub24gXCJjaGFuZ2U6ZGV2aWNlVHlwZVwiLCA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgMCwgQHVwZGF0ZVxuXG5cdHRvZ2dsZTogKGV2ZW50LCBvcGVuKSA9PlxuXHRcdCMgcmV0dXJuIGlmIEZyYW1lci5EZXZpY2UuaGFuZHMuaXNBbmltYXRpbmdcblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcImBcIiBvciBldmVudC5rZXkgaXMgXCI8XCIgb3Igb3BlbiBpcyB0cnVlXG5cdFx0XHRpZiBAb3BlbmVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXHRcdFx0QG9wZW5lZCA9ICFAb3BlbmVkXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIiBvciBldmVudC5rZXkgaXMgXCI+XCJcblx0XHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdFx0aWYgQGhvdmVyZWRMYXllciBpcyBAc2VsZWN0ZWRMYXllclxuXHRcdFx0XHRAdW5zZXRTZWxlY3RlZExheWVyKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNldFNlbGVjdGVkTGF5ZXIoKVxuXG5cdFx0XHRyZXR1cm5cblxuXHQjIG9wZW4gdGhlIHBhbmVsLCBzdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuXHRlbmFibGU6ID0+XG5cdFx0QF9jYW52YXNDb2xvciA9IENhbnZhcy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRzdmdDb250ZXh0LnNldENvbnRleHQoKVxuXG5cdFx0QHRyYW5zaXRpb24odHJ1ZSlcblxuXHRkaXNhYmxlOiA9PlxuXHRcdEB1bmZvY3VzKClcblx0XHRAZW5hYmxlZCA9IGZhbHNlXG5cblx0XHRAdHJhbnNpdGlvbihmYWxzZSlcblxuXHR0cmFuc2l0aW9uOiAob3BlbiA9IHRydWUsIHNlY29uZHMgPSAuNSkgPT5cblx0XHRoYW5kcyA9IEZyYW1lci5EZXZpY2UuaGFuZHNcblxuXHRcdGhhbmRzLm9uIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cblx0XHRoYW5kcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRoYW5kcy5vZmYgXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblx0XHRcdEBlbmFibGVkID0gQG9wZW5lZCA9IG9wZW5cblxuXHRcdFx0aWYgb3BlblxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU91dCwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZC5vbiBFdmVudHMuTW91c2VPdmVyLCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmJhY2tncm91bmQub2ZmIEV2ZW50cy5Nb3VzZU92ZXIsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRAZm9jdXMoKVxuXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cblx0XHRtaWRYID0gaGFuZHMuX2NvbnRleHQuaW5uZXJXaWR0aCAvIDJcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMuYW5pbWF0ZVxuXHRcdFx0bWlkWDogaWYgb3BlbiB0aGVuIG1pZFggLSAxMTIgZWxzZSBtaWRYXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiBzZWNvbmRzXG5cdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMTApXG5cblx0c2hvd1RyYW5zaXRpb246ID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRvcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFggLSA1NiwgbWlkWCAtIDExMl0sIFxuXHRcdFx0WzAsIDFdLCBcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRmYWN0b3IgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdGhhbmRzLm1pZFgsXG5cdFx0XHRbbWlkWCwgbWlkWCAtIDExMl0sXG5cdFx0XHRbMCwgMV0sXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0QHNwZWNQYW5lbC5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IENvbG9yLm1peCBAX2NhbnZhc0NvbG9yLCdyZ2JhKDMwLCAzMCwgMzAsIDEuMDAwKScsIGZhY3RvclxuXG5cdCMgdXBkYXRlIHdoZW4gc2NyZWVuIHNpemUgY2hhbmdlc1xuXHR1cGRhdGU6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAb3BlbmVkXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLm1pZFggLT0gMTIyXG5cblx0XHRzdmdDb250ZXh0LnNldENvbnRleHQoKVxuXHRcdEBmb2N1cygpXG5cblx0IyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudFxuXHRnZXREaW1lbnNpb25zOiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRkID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0ZGltZW5zaW9ucyA9IHtcblx0XHRcdHg6IGQubGVmdFxuXHRcdFx0eTogZC50b3Bcblx0XHRcdHdpZHRoOiBkLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGQuaGVpZ2h0XG5cdFx0XHRtaWRYOiBkLmxlZnQgKyAoZC53aWR0aCAvIDIpXG5cdFx0XHRtaWRZOiBkLnRvcCArIChkLmhlaWdodCAvIDIpXG5cdFx0XHRtYXhYOiBkLmxlZnQgKyBkLndpZHRoXG5cdFx0XHRtYXhZOiBkLnRvcCArIGQuaGVpZ2h0XG5cdFx0XHRmcmFtZTogZFxuXHRcdH1cblxuXHRcdHJldHVybiBkaW1lbnNpb25zXG5cblx0IyBtYWtlIGEgcmVsYXRpdmUgZGlzdGFuY2UgbGluZVxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIHBvaW50QVswXSBpcyBwb2ludEJbMF1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdIC0gNX0gI3twb2ludEFbMV19IEwgI3twb2ludEFbMF0gKyA1fSAje3BvaW50QVsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA1fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDV9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF19ICN7cG9pbnRCWzFdIC0gNX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIHRoZSBsYWJlbCBib3ggZm9yIGRpc3RhbmNlIGxpbmVzXG5cdG1ha2VMYWJlbDogKHgsIHksIHRleHQpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IHhcblx0XHRcdHk6IHlcblx0XHRcdCdmb250LWZhbWlseSc6IEBmb250RmFtaWx5XG5cdFx0XHQnZm9udC1zaXplJzogQGZvbnRTaXplXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBAZm9udFdlaWdodFxuXHRcdFx0ZmlsbDogQHNlY29uZGFyeUNvbG9yXG5cdFx0XHR0ZXh0OiBNYXRoLmZsb29yKHRleHQgLyBAcmF0aW8pXG5cblx0XHRsID0gQGdldERpbWVuc2lvbnMobGFiZWwuZWxlbWVudClcblxuXHRcdGxhYmVsLnggPSB4IC0gbC53aWR0aCAvIDJcblx0XHRsYWJlbC55ID0geSArIGwuaGVpZ2h0IC8gNCAtIDFcblxuXHRcdGJveCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IGxhYmVsLnggLSBAcGFkZGluZy5sZWZ0XG5cdFx0XHR5OiBsYWJlbC55IC0gbC5oZWlnaHQgKyAxXG5cdFx0XHR3aWR0aDogbC53aWR0aCArIEBwYWRkaW5nLmxlZnQgKyBAcGFkZGluZy5yaWdodFxuXHRcdFx0aGVpZ2h0OiBsLmhlaWdodCArIEBwYWRkaW5nLnRvcCArIEBwYWRkaW5nLmJvdHRvbSArIDFcblx0XHRcdHJ4OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRyeTogQGJvcmRlclJhZGl1c1xuXHRcdFx0ZmlsbDogbmV3IENvbG9yKGNvbG9yKS5kYXJrZW4oNDApXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGxhYmVsLnNob3coKVxuXG5cdCMgbWFrZSB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlIGZvciBzZWxlY3RlZCAvIGhvdmVyZWQgZWxlbWVudHNcblx0bWFrZVJlY3RPdmVybGF5czogKHMsIGgpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBzIG9yIG5vdCBoXG5cblx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSgwKVxuXHRcdGVsc2Vcblx0XHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKC4yKVxuXG5cdFx0aG92ZXJlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKDApXG5cdFx0ZWxzZVxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoLjIpXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBzLnhcblx0XHRcdHk6IHMueVxuXHRcdFx0d2lkdGg6IHMud2lkdGhcblx0XHRcdGhlaWdodDogcy5oZWlnaHRcblx0XHRcdHN0cm9rZTogQHNlbGVjdGVkQ29sb3Jcblx0XHRcdGZpbGw6IHNlbGVjdEZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdCMgbWFrZSBkYXNoZWQgbGluZXMgZnJvbSBib3VuZGluZyByZWN0IHRvIHNjcmVlbiBlZGdlXG5cdG1ha2VEYXNoZWRMaW5lczogKGUsIGYsIGNvbG9yLCBvZmZzZXQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlXG5cdFx0cmV0dXJuIGlmIGUgaXMgZlxuXG5cdFx0Y29sb3IgPSBuZXcgQ29sb3IoY29sb3IpLmFscGhhKC44KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS54LCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUueCwgeTogZi5tYXhZfVxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi55fSxcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUueX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLnl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLm1heFl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0c2hvd0Rpc3RhbmNlczogKHNlbGVjdGVkLCBob3ZlcmVkKSA9PlxuXG5cdFx0aWYgQGhvdmVyZWRMYXllciBpcyBAc2VsZWN0ZWRMYXllclxuXHRcdFx0QGhvdmVyZWRMYXllciA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRzID0gQGdldERpbWVuc2lvbnMoQHNlbGVjdGVkTGF5ZXIuX2VsZW1lbnQpXG5cdFx0aCA9IEBnZXREaW1lbnNpb25zKEBob3ZlcmVkTGF5ZXIuX2VsZW1lbnQpXG5cdFx0ZiA9IEBnZXREaW1lbnNpb25zKEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50KVxuXG5cdFx0cmV0dXJuIGlmIG5vdCBzIG9yIG5vdCBoXG5cblx0XHRAcmF0aW8gPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAvIFNjcmVlbi53aWR0aFxuXG5cdFx0QG1ha2VEYXNoZWRMaW5lcyhzLCBmLCBAc2VsZWN0ZWRDb2xvciwgNSlcblxuXHRcdEBtYWtlUmVjdE92ZXJsYXlzKHMsIGgpXG5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGNvbnRhaW5zIGhvdmVyZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54IDwgaC54IGFuZCBzLm1heFggPiBoLm1heFggYW5kIHMueSA8IGgueSBhbmQgcy5tYXhZID4gaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFggLSBoLm1heFgpXG5cdFx0XHRtID0gaC5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWF4WCArIDUsIGgubWlkWV0sIFtzLm1heFggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFkgLSBoLm1heFkpXG5cdFx0XHRtID0gaC5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC54KVxuXHRcdFx0bSA9IHMueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gaG92ZXJlZCBlbGVtZW50IGNvbnRhaW5zIHNlbGVjdGVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA+IGgueCBhbmQgcy5tYXhYIDwgaC5tYXhYIGFuZCBzLnkgPiBoLnkgYW5kIHMubWF4WSA8IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IGgueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBoLnkgKyA1XSwgW3MubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC5tYXhYIC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBzLm1pZFldLCBbaC5tYXhYIC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC5tYXhZIC0gcy5tYXhZKVxuXHRcdFx0bSA9IHMubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIHMubWF4WSArIDVdLCBbcy5taWRYLCBoLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBoLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIHMubWlkWV0sIFtzLnggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gaG92ZXJlZCBlbGVtZW50XG5cdFx0XG5cdFx0IyB0b3BcblxuXHRcdGlmIHMueSA+IGgubWF4WVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC5tYXhZKVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnkgPiBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLnkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdCMgbGVmdFxuXG5cdFx0aWYgaC5tYXhYIDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLm1heFgpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWF4WCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRlbHNlIGlmIGgueCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC54KVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0IyByaWdodFxuXG5cdFx0aWYgcy5tYXhYIDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRlbHNlIGlmIHMueCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IHMueCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0IyBib3R0b21cblxuXHRcdGlmIHMubWF4WSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy5tYXhZKVxuXHRcdFx0bSA9IHMubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMubWF4WSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBzLnkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHQjIHNldCB0aGUgcGFuZWwgd2l0aCBjdXJyZW50IHByb3BlcnRpZXNcblx0c2V0UGFuZWxQcm9wZXJ0aWVzOiAoKSA9PlxuXG5cdFx0IyBkZWNpZGUgd2hpY2ggbGF5ZXIgdG8gdXNlIGZvciBwYW5lbCBwcm9wc1xuXHRcdGlmIEBzZWxlY3RlZExheWVyPyBhbmQgQHNlbGVjdGVkTGF5ZXIgaXNudCBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0bGF5ZXIgPSBAc2VsZWN0ZWRMYXllclxuXHRcdGVsc2UgaWYgQGhvdmVyZWRMYXllcj9cblx0XHRcdGxheWVyID0gQGhvdmVyZWRMYXllclxuXHRcdGVsc2Vcblx0XHRcdEBzcGVjUGFuZWwuY2xlYXJQcm9wcygpXG5cdFx0XHRyZXR1cm5cblxuXHRcdHJldHVybiBpZiBsYXllciBpcyBAbGFzdExheWVyXG5cdFx0QGxhc3RMYXllciA9IGxheWVyXG5cdFx0XG5cdFx0IyBwcm9wZXJ0aWVzIHRvIGFzc2lnbmVkIHRvIGxheWVyLnByb3BzXG5cdFx0Y3VzdG9tUHJvcHMgPVxuXHRcdFx0eDogbGF5ZXIuc2NyZWVuRnJhbWUueFxuXHRcdFx0eTogbGF5ZXIuc2NyZWVuRnJhbWUueVxuXHRcdFx0Y29tcG9uZW50TmFtZTogbGF5ZXIuY29uc3RydWN0b3IubmFtZVxuXHRcdFx0Y29tcG9uZW50TmFtZXM6IEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50KVxuXHRcdFx0cGFyZW50TmFtZTogbGF5ZXIucGFyZW50Py5uYW1lXG5cdFx0XHRyb3RhdGlvbjogbGF5ZXIucm90YXRpb25aXG5cdFx0XHR0ZXh0QWxpZ246IGxheWVyLnByb3BzLnN0eWxlZFRleHRPcHRpb25zPy5hbGlnbm1lbnRcblx0XHRcdGJsZW5kaW5nOiBsYXllci5ibGVuZGluZ1xuXHRcdFx0IyBzY3JlZW5zaG90OiBAZ2V0U2NyZWVuc2hvdChsYXllci5fZWxlbWVudClcblx0XHRcblx0XHRpZiBsYXllci5ncmFkaWVudD9cblx0XHRcdF8uYXNzaWduIGN1c3RvbVByb3BzLFxuXHRcdFx0XHRncmFkaWVudFN0YXJ0OiBsYXllci5ncmFkaWVudC5zdGFydFxuXHRcdFx0XHRncmFkaWVudEVuZDogbGF5ZXIuZ3JhZGllbnQuZW5kXG5cdFx0XHRcdGdyYWRpZW50QW5nbGU6IGxheWVyLmdyYWRpZW50LmFuZ2xlXG5cblx0XHRpZiBsYXllci5zaGFkb3dzP1xuXHRcdFx0Xy5hc3NpZ24gY3VzdG9tUHJvcHMsXG5cdFx0XHRcdHNoYWRvd1g6IGxheWVyLnNoYWRvd3NbMF0/Lnhcblx0XHRcdFx0c2hhZG93WTogbGF5ZXIuc2hhZG93c1swXT8ueVxuXHRcdFx0XHRzaGFkb3dTcHJlYWQ6IGxheWVyLnNoYWRvd3NbMF0/LnNwcmVhZFxuXHRcdFx0XHRzaGFkb3dDb2xvcjogbGF5ZXIuc2hhZG93c1swXT8uY29sb3Jcblx0XHRcdFx0c2hhZG93VHlwZTogbGF5ZXIuc2hhZG93c1swXT8udHlwZVxuXHRcdFx0XHRzaGFkb3dCbHVyOiBsYXllci5zaGFkb3dzWzBdPy5ibHVyXG5cblx0XHRAc3BlY1BhbmVsLnNob3dQcm9wZXJ0aWVzKGxheWVyLCBjdXN0b21Qcm9wcylcblx0XHRcblx0XHRldmVudExpc3RlbmVycyA9IEBnZXRMYXllckV2ZW50TGlzdGVuZXJzKGxheWVyKVxuXHRcdEBzcGVjUGFuZWwuY2xlYXJDaGlsZHJlblRoZW5TaG93RXZlbnRMaXN0ZW5lcnMoZXZlbnRMaXN0ZW5lcnMpXG5cblx0XHRhbmltYXRpb25zID0gbGF5ZXIuYW5pbWF0aW9ucygpXG5cdFx0QHNwZWNQYW5lbC5jbGVhckNoaWxkcmVuVGhlblNob3dBbmltYXRpb25zKGFuaW1hdGlvbnMpXG5cblxuXHRzZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRsYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGV2ZW50Py50YXJnZXQpXG5cdFx0cmV0dXJuIGlmIG5vdCBAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIpXG5cblx0XHRAaG92ZXJlZExheWVyID0gbGF5ZXJcblxuXHRcdEB0cnlGb2N1cyhldmVudClcblx0XHRyZXR1cm4gZmFsc2VcblxuXHR1bnNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdEBob3ZlcmVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRpZiBub3QgQGhvdmVyZWRMYXllciB0aGVuIEBmb2N1cygpXG5cblx0c2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBob3ZlcmVkTGF5ZXJcblxuXHRcdEBzZWxlY3RlZExheWVyID0gQGhvdmVyZWRMYXllclxuXHRcdEBmb2N1cygpXG5cblx0dW5zZXRTZWxlY3RlZExheWVyOiA9PlxuXHRcdEBzZWxlY3RlZExheWVyID0gdW5kZWZpbmVkXG5cblxuXHQjIEZpbmQgYW4gZWxlbWVudCB0aGF0IGJlbG9uZ3MgdG8gYSBGcmFtZXIgTGF5ZXJcblx0ZmluZExheWVyRWxlbWVudDogKGVsZW1lbnQpIC0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50LmNsYXNzTGlzdFxuXG5cdFx0aWYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyYW1lckxheWVyJylcblx0XHRcdHJldHVybiBlbGVtZW50XG5cblx0XHRAZmluZExheWVyRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUpXG5cblx0IyBGaW5kIGEgRnJhbWVyIExheWVyIHRoYXQgbWF0Y2hlcyBhIEZyYW1lciBMYXllciBlbGVtZW50XG5cdGdldExheWVyRnJvbUVsZW1lbnQ6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXG5cdFx0ZWxlbWVudCA9IEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnMsIFsnX2VsZW1lbnQnLCBlbGVtZW50XSlcblxuXHRcdHJldHVybiBsYXllclxuXG5cdGdldExheWVySXNWaXNpYmxlOiAobGF5ZXIpID0+XG5cdFx0aWYgbm90IEBfb25seVZpc2libGVcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBsYXllci5vcGFjaXR5IGlzIDAgb3IgbGF5ZXIudmlzaWJsZSBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIucGFyZW50KVxuXG5cdGdldExheWVyRXZlbnRMaXN0ZW5lcnM6IChsYXllcikgPT5cblxuXHRcdGxpc3RlbmVycyA9IF8ubWFwKGxheWVyLl9ldmVudHMsIChldnMsIGxpc3RlbmVyLCBjKSAtPlxuXHRcdFx0aWYgbm90IF8uaXNBcnJheShldnMpIHRoZW4gZXZzID0gW2V2c11cblx0XHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRsaXN0ZW5lcjogbGlzdGVuZXJcblx0XHRcdFx0ZXZlbnRzOiBfLm1hcCBldnMsIChldikgLT5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiBldi5mbi5uYW1lXG5cdFx0XHRcdFx0XHRmdW5jdGlvbjogZXYuZm4udG9TdHJpbmcoKVxuXHRcdFx0XHRcdFx0Y29udGV4dDogZXYuY29udGV4dCBcblx0XHRcdFx0XHRcdG9uY2U6IGV2Lm9uY2Vcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KVxuXG5cdFx0cmV0dXJuIGxpc3RlbmVyc1xuXG5cdGdldFNjcmVlbnNob3Q6IChlbGVtZW50KSA9PlxuXG5cdFx0Zm9yZWlnbk9iamVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ2ZvcmVpZ25PYmplY3QnXG5cblx0XHQjIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcblx0XHRyZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdGN0eCA9IEBzcGVjUGFuZWwuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRkYXRhID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JyN7cmVjdC53aWR0aH0nIGhlaWdodD0nI3tyZWN0LmhlaWdodH0nPlwiICtcblx0XHRcdCc8Zm9yZWlnbk9iamVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+JyArXG5cdFx0XHQnPGRpdiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj4nICtcblx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MICtcblx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdCc8L2ZvcmVpZ25PYmplY3Q+JyArXG5cdFx0XHQnPC9zdmc+J1xuXG5cdFx0RE9NVVJMID0gd2luZG93LlVSTCBvciB3aW5kb3cud2Via2l0VVJMIG9yIHdpbmRvd1xuXG5cdFx0c3ZnID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogJ2ltYWdlL3N2Zyt4bWwnfSlcblx0XHR1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zylcblx0XHRAc3BlY1BhbmVsLnNjcmVlbnNob3RCb3gudmFsdWUgPSB1cmxcblxuXG5cdCMgRmluZCBhIG5vbi1zdGFuZGFyZCBDb21wb25lbnQgdGhhdCBpbmNsdWRlcyBhIExheWVyXG5cdGdldENvbXBvbmVudEZyb21MYXllcjogKGxheWVyLCBuYW1lcyA9IFtdKSA9PlxuXHRcdGlmIG5vdCBsYXllclxuXHRcdFx0cmV0dXJuIG5hbWVzLmpvaW4oJywgJylcblxuXHRcdGlmIG5vdCBfLmluY2x1ZGVzKFtcIkxheWVyXCIsIFwiVGV4dExheWVyXCIsIFwiU2Nyb2xsQ29tcG9uZW50XCJdLCBsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXHRcdFx0bmFtZXMucHVzaChsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXG5cdFx0QGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQsIG5hbWVzKVxuXG5cblx0IyBEZWxheSBmb2N1cyBieSBhIHNtYWxsIGFtb3VudCB0byBwcmV2ZW50IGZsYXNoaW5nXG5cdHRyeUZvY3VzOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QGZvY3VzRWxlbWVudCA9IGV2ZW50LnRhcmdldFxuXHRcdGRvIChldmVudCkgPT5cblx0XHRcdFV0aWxzLmRlbGF5IC4wNSwgPT5cblx0XHRcdFx0aWYgQGZvY3VzRWxlbWVudCBpc250IGV2ZW50LnRhcmdldFxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcblx0XHRcdFx0QGZvY3VzKClcblxuXHQjIENoYW5nZSBmb2N1cyB0byBhIG5ldyBob3ZlcmVkIG9yIHNlbGVjdGVkIGVsZW1lbnRcblx0Zm9jdXM6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QHVuZm9jdXMoKVxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRAaG92ZXJlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKClcblx0XHRAc2hvd0Rpc3RhbmNlcygpXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdHN2Z0NvbnRleHQucmVtb3ZlQWxsKClcblxuXG4jIGtpY2tvZmZcblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAncENvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbnN2Z0NvbnRleHQgPSBuZXcgU1ZHQ29udGV4dFxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEYUEsSUFBQSw4T0FBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRWpDLElBQUcsa0JBQUg7RUFDQyxNQUFBLEdBQVMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFRLENBQUEsVUFBQTtFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBdkIsR0FBMEMsTUFBTSxDQUFDO0VBRWpELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxHQUEyQjtFQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQXBCLEdBQTZCLE9BTDlCOzs7QUFPQSxNQUFNLENB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Q0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBbkI7WUFDQSxJQUFBLEVBQU0sVUFETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBbkI7WUFDQSxJQUFBLEVBQU0sWUFETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTLEVBMUROO1NBQUEsTUFBQTtVQW1FSixHQUFBLEdBQVUsSUFBQSxJQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFuQjtZQUNBLElB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
