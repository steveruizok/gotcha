require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"gotcha":[function(require,module,exports){
var DashedLine, Gotcha, SVGContext, SVGShape, SpecPanel, accordionsOpen, device, deviceType, gotcha, pAccordian, pColor, pDiv, pDivider, pImage, pInput, pLabel, pRange, pRow, pSelect, pSpan, panel, propLayers, ref, secretBox, startOpen, svgContext, viewC,
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
    this.properties = [];
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
    _.assign(this, {
      children: []
    });
    pRow.__super__.constructor.call(this, options);
    this.element.classList.remove("pDiv");
    this.element.classList.add("pRow");
    this.label = new pSpan({
      parent: this,
      text: options.text,
      bold: options.bold
    });
    Object.defineProperty(this, 'color', {
      get: function() {
        return this.label.style.color;
      },
      set: function(value) {
        return this.label.element.style.color = value;
      }
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
    Object.defineProperty(this, 'text', {
      get: function() {
        return this.element.textContent;
      },
      set: function(value) {
        return this.element.textContent = value;
      }
    });
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
    propLayers.push(this);
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
    var parent, ref1, ref2, ref3, ref4;
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
    if ((ref3 = options.section) != null) {
      ref3.properties.push(this);
    }
    this.unit = new pLabel({
      parent: options.parent,
      className: options.className,
      text: options.unit,
      "for": this.element
    });
    propLayers.push(this);
    Object.defineProperty(this, 'default', {
      get: function() {
        return this._default;
      },
      set: function(value) {
        return this._default = value;
      }
    });
    this["default"] = (ref4 = options["default"]) != null ? ref4 : '';
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref5;
        this._value = value;
        if ((value == null) || value === "" || value === "undefined") {
          value = String(this["default"]);
        }
        this.element.value = value != null ? value : "";
        if ((value != null) && !this.isDefault && value !== "") {
          return (ref5 = this.section) != null ? ref5.visible = true : void 0;
        }
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
    var parent, ref1, ref2, ref3;
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
    if ((ref3 = options.section) != null) {
      ref3.properties.push(this);
    }
    propLayers.push(this);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref4;
        if (value == null) {
          value = '';
        }
        this._value = value;
        this.element.src = value;
        return (ref4 = this.section) != null ? ref4.visible = value !== '' : void 0;
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
    var parent, ref1, ref2, ref3;
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
    if ((ref3 = options.section) != null) {
      ref3.properties.push(this);
    }
    propLayers.push(this);
    Object.defineProperty(this, 'value', {
      get: function() {
        return this._value;
      },
      set: function(value) {
        var ref4;
        if ((value != null ? value.color : void 0) === 'transparent') {
          value = null;
        }
        if ((value != null) && value !== '') {
          if ((ref4 = this.section) != null) {
            ref4.visible = true;
          }
        }
        this._value = value != null ? value : '';
        return this.element.style['background-color'] = value != null ? value : 'none';
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
    this.hideDivs = bind(this.hideDivs, this);
    this.showProperty = bind(this.showProperty, this);
    this.showProperties = bind(this.showProperties, this);
    this.showAnimations = bind(this.showAnimations, this);
    this.showEventListeners = bind(this.showEventListeners, this);
    this.clearChildrenThenShowEventListeners = bind(this.clearChildrenThenShowEventListeners, this);
    this.clearChildrenThenShowAnimations = bind(this.clearChildrenThenShowAnimations, this);
    var currentSelected, deviceOptions, element, j, key, len, maxp, maxv, minp, minv, ref1, ref2, row, vScale, value;
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
    deviceOptions = ['fullscreen'];
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
    this.speedRow = new pRow({
      text: 'Speed 100%'
    });
    minp = parseInt(0, 10);
    maxp = parseInt(100, 10);
    minv = Math.log(0.00001);
    maxv = Math.log(0.01666666667);
    vScale = (maxv - minv) / (maxp - minp);
    this.speedBox = new pRange({
      parent: this.speedRow,
      className: 'full',
      unit: '',
      action: (function(_this) {
        return function(value) {
          var delta, rate, spaces;
          delta = Math.exp(minv + vScale * (value - minp));
          rate = (delta / (1 / 60)) * 100;
          spaces = rate < 1 ? 2 : rate < 10 ? 1 : 0;
          _this.speedRow.label.text = 'Speed ' + rate.toFixed(spaces) + '%';
          return Framer.Loop.delta = delta;
        };
      })(this)
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
      unit: '',
      "default": '1'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.scaleXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '1'
    });
    this.scaleYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '1'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Rotate'
    });
    this.rotationBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.rotationXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '0'
    });
    this.rotationYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '0'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Origin'
    });
    this.originXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '0.50'
    });
    this.originYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '0.50'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: 'Skew'
    });
    this.skewBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.transformsAcco.body,
      text: ''
    });
    this.skewXBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'left',
      unit: 'x',
      "default": '0'
    });
    this.skewYBox = new pInput({
      parent: row,
      section: this.transformsDiv,
      className: 'right',
      unit: 'y',
      "default": '0'
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
      "default": '0'
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
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Brightness'
    });
    this.brightnessBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Contrast'
    });
    this.contrastBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Grayscale'
    });
    this.grayscaleBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'hueRotate'
    });
    this.hueRotateBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Invert'
    });
    this.invertBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Saturate'
    });
    this.saturateBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.filtersAcco.body,
      text: 'Sepia'
    });
    this.sepiaBox = new pInput({
      parent: row,
      section: this.filtersDiv,
      className: 'left',
      unit: '',
      "default": '0'
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
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Brightness'
    });
    this.backgroundBrightnessBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Saturate'
    });
    this.backgroundSaturateBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'hueRotate'
    });
    this.backgroundHueRotateBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Contrast'
    });
    this.backgroundContrastBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '100'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Invert'
    });
    this.backgroundInvertBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Grayscale'
    });
    this.backgroundGrayscaleBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
    });
    row = new pRow({
      parent: this.effectsAcco.body,
      text: 'Sepia'
    });
    this.backgroundSepiaBox = new pInput({
      parent: row,
      section: this.effectsDiv,
      className: 'left',
      unit: '',
      "default": '0'
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
  }

  SpecPanel.prototype.clearChildrenThenShowAnimations = function(animations) {
    var child;
    child = this.animsAcco.body.element.childNodes[0];
    if (child == null) {
      this.showAnimations(animations);
      return;
    }
    this.animsAcco.body.element.removeChild(child);
    return this.clearChildrenThenShowAnimations(animations);
  };

  SpecPanel.prototype.clearChildrenThenShowEventListeners = function(eventListeners) {
    var child;
    child = this.eventListenersAcco.body.element.childNodes[0];
    if (child == null) {
      this.showEventListeners(eventListeners);
      return;
    }
    this.eventListenersAcco.body.element.removeChild(child);
    return this.clearChildrenThenShowEventListeners(eventListeners);
  };

  SpecPanel.prototype.showEventListeners = function(eventListeners) {
    var box, defaults, e, event, i, j, k, len, len1, listener, realListeners, ref1, ref2, row;
    if (eventListeners == null) {
      eventListeners = [];
    }
    defaults = ["function (){return fn.apply(me,arguments)}", "function (){return fn.apply(me, arguments)}", "function (event){return event.preventDefault()}", "function (){ return fn.apply(me, arguments); }", 'function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(timerId===undefined)return leadingEdge(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return timerId===undefined&&(timerId=setTimeout(timerExpired,wait)),result}', 'function (value){if(null!==value)return"fontSize"!==property&&"font"!==property&&_this._styledText.resetStyle(property),_this.renderText()}'];
    realListeners = 0;
    for (i = j = 0, len = eventListeners.length; j < len; i = ++j) {
      listener = eventListeners[i];
      if (_.every(listener.events, function(e) {
        return _.includes(defaults, e["function"]);
      })) {
        continue;
      }
      row = new pRow({
        parent: this.eventListenersAcco.body,
        text: '"' + listener.listener + '"',
        bold: true
      });
      ref1 = listener.events;
      for (e = k = 0, len1 = ref1.length; k < len1; e = ++k) {
        event = ref1[e];
        if (_.includes(defaults, event["function"])) {
          continue;
        }
        realListeners++;
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
        new pDivider({
          parent: this.eventListenersAcco.body
        });
      }
    }
    if (realListeners === 0) {
      this.eventListenersAcco.color = '#888888';
      return;
    }
    return this.eventListenersAcco.color = '#FFFFFF';
  };

  SpecPanel.prototype.showAnimations = function(animations) {
    var anim, box, element, fromUnit, i, j, k, key, len, len1, options, properties, ref1, ref2, ref3, ref4, ref5, ref6, ref7, results, row, stateA, stateB, toUnit, value;
    this.animsAcco.color = animations.length > 0 ? '#FFF' : '#888888';
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
    var def, defaults, key, propLayer, props, ref1, ref2, value;
    this.scrollTop = this.element.scrollTop;
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
    for (key in ref1) {
      value = ref1[key];
      propLayer = this[key + 'Box'];
      if (!propLayer) {
        continue;
      }
      def = (ref2 = defaults[key]) != null ? ref2["default"] : void 0;
      this.showProperty(key, value, propLayer, def);
    }
    this.showOverrideInAcco(this.effectsDiv, this.effectsAcco);
    this.showOverrideInAcco(this.filtersDiv, this.filtersAcco);
    this.showOverrideInAcco(this.transformsDiv, this.transformsAcco);
    return this.element.scrollTop = this.scrollTop;
  };

  SpecPanel.prototype.showOverrideInAcco = function(div, acco) {
    var j, len, propLayer, ref1, results;
    acco.color = '#888888';
    ref1 = div.properties;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      propLayer = ref1[j];
      if ((propLayer.value != null) && propLayer.value !== propLayer["default"]) {
        results.push(acco.color = '#FFF');
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SpecPanel.prototype.showProperty = function(key, value, propLayer, def) {
    var ref1;
    if (value === propLayer.value) {
      return;
    }
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
    ref1 = [this.gradientPropertiesDiv, this.textPropertiesDiv, this.shadowPropertiesDiv, this.borderPropertiesDiv, this.imagePropertiesDiv, this.screenshotDiv];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      div = ref1[j];
      results.push(div.visible = false);
    }
    return results;
  };

  return SpecPanel;

})();

propLayers = [];


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
    var ref1, thisSpeed;
    if (event.key === "`" || event.key === "<" || open === true) {
      if (this.opened) {
        this.disable();
      } else {
        this.enable();
      }
      this.opened = !this.opened;
      return;
    }
    if (!this.enabled) {
      return;
    }
    if (event.key === "/" || event.key === ">") {
      this.setSelectedLayer();
      return;
    }
    if (event.key === ".") {
      if ((ref1 = this.hoveredLayer) != null) {
        ref1.emit(Events.Tap);
      }
      return;
    }
    if (event.key === "\\") {
      if (this._lastSpeed == null) {
        this._lastSpeed = 1;
      }
      thisSpeed = this.specPanel.speedBox.element.value;
      if (thisSpeed === "0") {
        this.specPanel.speedBox.element.value = this._lastSpeed;
        return this.specPanel.speedBox.action(this._lastSpeed);
      } else {
        this.specPanel.speedBox.element.value = 0;
        Framer.Loop.delta = .000000000000000000001;
        return this._lastSpeed = thisSpeed;
      }
    }
  };

  Gotcha.prototype.enable = function() {
    this._canvasColor = Canvas.backgroundColor;
    svgContext.setContext();
    this.transition(true);
    if (this.timer != null) {
      clearInterval(this.timer);
    }
    return this.timer = Utils.interval(1 / 15, this.focus);
  };

  Gotcha.prototype.disable = function() {
    this.unfocus();
    this.enabled = false;
    this.transition(false);
    if (this.timer != null) {
      return clearInterval(this.timer);
    }
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
    var box, color, label, w;
    color = this.selectedLayer != null ? this.selectedColor : this.color;
    label = new SVGShape({
      type: 'text',
      parent: svgContext,
      x: x,
      y: y + 4,
      'font-family': this.fontFamily,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      'text-anchor': "middle",
      fill: this.secondaryColor,
      text: Math.floor(text / this.ratio)
    });
    w = label.element.textLength.baseVal.value;
    box = new SVGShape({
      type: 'rect',
      parent: svgContext,
      x: x - (w / 2) - this.padding.left,
      y: y - 7,
      width: w + this.padding.left + this.padding.right,
      height: 15,
      rx: this.borderRadius,
      ry: this.borderRadius,
      fill: new Color(color).darken(40),
      stroke: color,
      'stroke-width': '1px'
    });
    return label.show();
  };

  Gotcha.prototype.makeRectOverlays = function(selectedLayer, s, hoveredLayer, h) {
    var hoverFill, hoveredRect, selectFill, selectedRect;
    if (!s || !h) {
      return;
    }
    if (hoveredLayer === selectedLayer) {
      hoveredLayer = Framer.Device.screen;
    }
    hoverFill = new Color(this.color).alpha(.2);
    if (hoveredLayer === Framer.Device.screen) {
      hoverFill = new Color(this.color).alpha(0);
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
    selectFill = new Color(this.selectedColor).alpha(.2);
    if (selectedLayer === Framer.Device.screen) {
      selectFill = new Color(this.selectedColor).alpha(0);
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

  Gotcha.prototype.showDistances = function(selectedLayer, hoveredLayer) {
    var d, f, h, m, s;
    if (!selectedLayer || !hoveredLayer) {
      return;
    }
    s = this.getDimensions(selectedLayer._element);
    h = this.getDimensions(hoveredLayer._element);
    f = this.getDimensions(Framer.Device.screen._element);
    this.makeDashedLines(s, f, this.selectedColor, 5);
    this.makeRectOverlays(selectedLayer, s, hoveredLayer, h);
    this.ratio = Framer.Device.screen._element.getBoundingClientRect().width / Screen.width;
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
    layer = (ref1 = this.selectedLayer) != null ? ref1 : this.hoveredLayer;
    if (layer === this.lastLayer && layer.isAnimating === false) {
      return;
    }
    this.lastLayer = layer;
    this.lastProps = layer.props;
    customProps = {
      x: layer.screenFrame.x,
      y: layer.screenFrame.y,
      componentName: layer.constructor.name,
      componentNames: this.getComponentFromLayer(layer.parent),
      parentName: (ref2 = layer.parent) != null ? ref2.name : void 0,
      rotation: layer.rotationZ,
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
    if (this.selectedLayer === this.hoveredLayer) {
      this.unsetSelectedLayer();
      return;
    }
    this.selectedLayer = this.hoveredLayer;
    return this.focus();
  };

  Gotcha.prototype.unsetSelectedLayer = function() {
    this.selectedLayer = void 0;
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
    var layer, layers;
    if (!element) {
      return;
    }
    element = this.findLayerElement(element);
    layers = _.filter(Framer.CurrentContext._layers, function(l) {
      if (l.gotchaIgnore) {
        return false;
      }
      return true;
    });
    layer = _.find(layers, function(l) {
      return l._element === element;
    });
    return layer;
  };

  Gotcha.prototype.getLayerIsVisible = function(layer) {
    if (!layer) {
      return true;
    }
    if (this.onlyVisible) {
      if (layer.opacity === 0) {
        return false;
      }
      if (layer.visible === false) {
        return false;
      }
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
    var hoveredLayer, ref1, ref2, selectedLayer;
    if (!this.enabled) {
      return;
    }
    this.unfocus();
    if (this.hoveredLayer == null) {
      this.hoveredLayer = Framer.Device.screen;
    }
    hoveredLayer = (ref1 = this.hoveredLayer) != null ? ref1 : Framer.Device.screen;
    selectedLayer = (ref2 = this.selectedLayer) != null ? ref2 : Framer.Device.screen;
    if (selectedLayer === hoveredLayer) {
      hoveredLayer = Framer.Device.screen;
    }
    if (hoveredLayer === selectedLayer) {
      return;
    }
    this.showDistances(selectedLayer, hoveredLayer);
    return this.setPanelProperties(selectedLayer, hoveredLayer);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0dpdEh1Yi9nb3RjaGEvZXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9nb3RjaGEuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIFx0IC44ODg4OC4gICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuIyBcdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcbiMgXHQ4OCAgICAgICAgLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuXG4jIFx0ODggICBZUDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG4jIFx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuIyBcdCBgODg4ODgnICBgODg4ODhQJyAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UDhcbiMgXHRcbiMgXHRcbiMgYnkgQHN0ZXZlcnVpem9rXG4jXG4jIEEgRnJhbWVyIG1vZHVsZSBmb3IgaGFuZG9mZi4gSXQgd29ya3Mga2luZCBvZiBsaWtlIHRoYXQgb3RoZXIgdG9vbC5cblxuZGV2aWNlVHlwZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZGV2aWNlVHlwZVxuXG5pZiBkZXZpY2VUeXBlPyBcblx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdEZyYW1lci5EZXZpY2UuX2NvbnRleHQuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZS5kZXZpY2VQaXhlbFJhdGlvXG5cblx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gZGV2aWNlVHlwZVxuXHR3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZSA9IHVuZGVmaW5lZFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5zdmdDb250ZXh0ID0gdW5kZWZpbmVkXG5zdGFydE9wZW4gPSBmYWxzZVxuYWNjb3JkaW9uc09wZW4gPSBmYWxzZVxuXG4jIGRlYnVnZ2luZ1xuXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VQaG9uZScpWzBdPy5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBcdC5kODg4ODhiICBkUCAgICAgZFAgIC44ODg4OC4gICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiAgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICBcdGBZODg4ODhiLiA4OCAgICAuOFAgODggICAgICAgICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuICBcdCAgICAgIGA4YiA4OCAgICBkOCcgODggICBZUDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuICBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICBcdCBZODg4ODhQICA4ODg4ODgnICAgIGA4ODg4OCcgICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuICBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMjI1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBDb250ZXh0XG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKEBzdmcpXG5cdFx0QHN2Zy5zdHlsZVsnei1pbmRleCddID0gJzk5OSdcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbkJhY2tncm91bmQuX2VsZW1lbnRcblxuXHRcdEBzZXRDb250ZXh0KClcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdHNldEF0dHJpYnV0ZXM6IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRzZXRDb250ZXh0OiA9PlxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdEBzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRhZGRTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzaGFwZXMucHVzaChzaGFwZSlcblx0XHRAc2hvd1NoYXBlKHNoYXBlKVxuXHRcdFxuXHRyZW1vdmVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBoaWRlU2hhcGUoc2hhcGUpXG5cdFx0Xy5wdWxsKEBzaGFwZXMsIHNoYXBlKVxuXHRcdFxuXHRoaWRlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFxuXHRzaG93U2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLmFwcGVuZENoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0XG5cdGFkZERlZjogKGRlZikgLT5cblx0XHRAc3ZnRGVmcy5hcHBlbmRDaGlsZChkZWYpXG5cblx0cmVtb3ZlQWxsOiA9PlxuXHRcdGZvciBzaGFwZSBpbiBAc2hhcGVzXG5cdFx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0QHNoYXBlcyA9IFtdXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBTaGFwZVxuXG5jbGFzcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7dHlwZTogJ2NpcmNsZSd9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBwYXJlbnQgPSBzdmdDb250ZXh0XG5cdFx0XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFxuXHRcdFx0b3B0aW9ucy50eXBlXG5cdFx0XHQpXG5cblx0XHRAc2V0Q3VzdG9tUHJvcGVydHkoJ3RleHQnLCAndGV4dENvbnRlbnQnLCAndGV4dENvbnRlbnQnLCBvcHRpb25zLnRleHQpXG5cdFx0XHRcdFxuXHRcdCMgYXNzaWduIGF0dHJpYnV0ZXMgc2V0IGJ5IG9wdGlvbnNcblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cdFx0XHRAc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAcGFyZW50LmFkZFNoYXBlKEApXG5cdFx0XG5cdFx0QHNob3coKVxuXHRcdFx0XG5cdHNldEF0dHJpYnV0ZTogKGtleSwgdmFsdWUpID0+XG5cdFx0cmV0dXJuIGlmIGtleSBpcyAndGV4dCdcblx0XHRpZiBub3QgQFtrZXldP1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0Z2V0OiA9PlxuXHRcdFx0XHRcdHJldHVybiBAZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdFx0QGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XG5cdFx0QFtrZXldID0gdmFsdWVcblx0XG5cdHNldEN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCByZXR1cm5WYWx1ZSwgc2V0VmFsdWUsIHN0YXJ0VmFsdWUpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBlbGVtZW50W3NldFZhbHVlXSA9IHZhbHVlXG5cblx0XHRAW3ZhcmlhYmxlTmFtZV0gPSBzdGFydFZhbHVlXG5cblx0aGlkZTogLT4gXG5cdFx0QHBhcmVudC5oaWRlU2hhcGUoQClcblx0XG5cdHNob3c6IC0+IFxuXHRcdEBwYXJlbnQuc2hvd1NoYXBlKEApXG5cdFx0XG5cdHJlbW92ZTogLT5cblx0XHRAcGFyZW50LnJlbW92ZVNoYXBlKEApXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERhc2hlZCBMaW5lXG5cbmNsYXNzIERhc2hlZExpbmUgZXh0ZW5kcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKHBvaW50QSwgcG9pbnRCLCBjb2xvciA9ICcjMDAwJywgb2Zmc2V0ID0gMCwgb3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBLnh9ICN7cG9pbnRBLnl9IEwgI3twb2ludEIueH0gI3twb2ludEIueX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cdFx0XHQnc3Ryb2tlLWRhc2hhcnJheSc6IFwiNSwgNVwiXG5cdFx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQnOiBvZmZzZXRcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFBhbmVsIENvbXBvbmVudHNcblxuVXRpbHMuaW5zZXJ0Q1NTIFwiXCJcIlxuXG5cdC5sb2dvIHtcblx0XHRvcGFjaXR5OiAuNDtcblx0fVxuXG5cdC5sb2dvOmhvdmVyIHtcblx0XHRvcGFjaXR5OiAxO1xuXHR9XG5cdFxuXHQjbGlua2VkaW5fbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiA2OHB4O1xuXHR9XG5cblx0XG5cdCN0d2l0dGVyX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDRweDtcblx0XHRyaWdodDogNHB4O1xuXHR9XG5cblx0I2dpdGh1Yl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDM2cHg7XG5cdH1cblxuXHQuZnJhbWVyTGF5ZXIgeyBcblx0XHRwb2ludGVyLWV2ZW50czogYWxsICFpbXBvcnRhbnQ7IFxuXHRcdH0gXG5cdFxuXHQuSWdub3JlUG9pbnRlckV2ZW50cyB7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDsgXG5cdH1cblxuXHQuZHJvcGRvd24ge1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cblxuXHQjcENvbnRhaW5lciB7XG5cdFx0cG9zaXRpb246IGZpeGVkO1xuXHRcdHJpZ2h0OiAwO1xuXHRcdHdpZHRoOiAyMjRweDtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0Zm9udC1mYW1pbHk6ICdIZWx2ZXRpY2EgTmV1ZSc7XG5cdFx0Zm9udC1zaXplOiAxMXB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjAsIDIwLCAyMCwgMS4wMDApO1xuXHRcdGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSg0NSwgNDUsIDQ1LCAxLjAwMCk7XG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbDtcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHRcdGN1cnNvcjogZGVmYXVsdDtcblx0XHRvdmVyZmxvdzogc2Nyb2xsO1xuXHRcdHBhZGRpbmctdG9wOiA4cHg7XG5cdH1cblxuXHQucERpdiB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdH1cblxuXHQuaGlkZGVuIHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHR9XG5cblx0LnBSb3cge1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdGhlaWdodDogMzJweDtcblx0fVxuXG5cdC5wU3BhbiB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGNvbG9yOiAjODg4ODg4O1xuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdFx0bGV0dGVyLXNwYWNpbmc6IC41cHg7XG5cdFx0cGFkZGluZy1sZWZ0OiA4cHg7XG5cdFx0bWFyZ2luLXRvcDogMnB4O1xuXHR9XG5cblx0LnBMYWJlbCB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHRleHQtYWxpZ246IHJpZ2h0O1xuXHRcdGZvbnQtc2l6ZTogMTBweDtcblx0XHR3aWR0aDogbm9uZTtcblx0XHRtYXJnaW4tdG9wOiAycHg7XG5cdFx0bWFyZ2luLXJpZ2h0OiA4cHg7XG5cdFx0ei1pbmRleDogMTA7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XG5cdH1cblxuXHQucFJhbmdlIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG1hcmdpbi10b3A6IDE1cHg7XG5cdFx0bWFyZ2luLXJpZ2h0OiA0cHg7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7ICAvKiBPdmVycmlkZSBkZWZhdWx0IENTUyBzdHlsZXMgKi9cblx0XHRhcHBlYXJhbmNlOiBub25lO1xuXHRcdHdpZHRoOiAxMDAlOyBcblx0XHRoZWlnaHQ6IDRweDtcblx0XHRiYWNrZ3JvdW5kOiAjMzIzMjMyO1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXG5cblx0LnBSYW5nZTo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuXHRcdGJvcmRlci1yYWRpdXM6IDhweDtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0YXBwZWFyYW5jZTogbm9uZTtcblx0XHR3aWR0aDogMTZweDtcblx0XHRoZWlnaHQ6IDE2cHg7XG5cdFx0YmFja2dyb3VuZDogIzg4ODg4ODtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0fVxuXG5cdC5wUmFuZ2U6Oi1tb3otcmFuZ2UtdGh1bWIge1xuXHRcdGJvcmRlci1yYWRpdXM6IDhweDtcblx0XHR3aWR0aDogMTZweDtcblx0XHRoZWlnaHQ6IDE2cHg7XG5cdFx0YmFja2dyb3VuZDogIzg4ODg4ODtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0fVxuXG5cdC5wSW5wdXQge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRjb2xvcjogIzU1NTU1NTtcblx0XHRwYWRkaW5nOiA0cHg7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRvdXRsaW5lOiBub25lO1xuXHRcdG1hcmdpbi10b3A6IDRweDtcblx0fVxuXG5cdC5wSW5wdXQ6aG92ZXIge1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICM0OGNmZmY7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdH1cblxuXHQucmlnaHQge1xuXHRcdHJpZ2h0OiA4cHg7XG5cdFx0d2lkdGg6IDQ4cHg7XG5cdH1cblxuXHQubGVmdCB7XG5cdFx0cmlnaHQ6IDcycHg7XG5cdFx0d2lkdGg6IDQ4cHg7XG5cdH1cblxuXHQuYWxpZ25MZWZ0IHtcblx0XHR0ZXh0LWFsaWduOiBsZWZ0O1xuXHR9XG5cblx0LmZ1bGwge1xuXHRcdHJpZ2h0OiA4cHg7XG5cdFx0d2lkdGg6IDExMnB4O1xuXHR9XG5cblx0LnBJbWFnZSB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0bWFyZ2luLWxlZnQ6IDhweDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0d2lkdGg6IDE5NnB4O1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRvdXRsaW5lOiA0cHggc29saWQgIzI5MjkyOTtcblx0XHRvdXRsaW5lLW9mZnNldDogLTRweDtcblx0XHRwYWRkaW5nOiA0cHg7XG5cdH1cblxuXHQucEltYWdlOmhvdmVyIHtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjNDhjZmZmO1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCAjMjkyOTI5O1xuXHR9XG5cblx0LnBDb2xvciB7XG5cdFx0b3V0bGluZTogNHB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IC00cHg7XG5cdH1cblxuXHQucENvbG9yOmhvdmVyIHtcblx0XHRvdXRsaW5lOiAycHggc29saWQgIzI5MjkyOTtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5wU2VsZWN0IHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogMTIycHg7XG5cdFx0Y29sb3I6ICM1NTU1NTU7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRwYWRkaW5nOiA0cHg7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdH1cblxuXHQucERpdmlkZXIge1xuXHRcdGhlaWdodDogMXB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5cdFx0bWFyZ2luOiAxNnB4IDhweCAxNnB4IDhweDtcblx0fVxuXG5cdC5wQWNjb3JkaWFuIHtcblx0XHRib3JkZXItdG9wOiAxcHggc29saWQgIzE0MTQxNDtcblx0XHRib3JkZXItYm90dG9tOiAxcHggc29saWQgIzE0MTQxNDtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0bWluLWhlaWdodDogMzJweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMUQxRDFEO1xuXHRcdG1hcmdpbi10b3A6IDE2cHg7XG5cdH1cblxuXHQucEFjY29yZGlhbkJvZHkge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdG1hcmdpbi10b3A6IDMycHg7XG5cdFx0cGFkZGluZy10b3A6IDRweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuXHR9XG5cblx0LmFjdGl2ZSB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHR9XG5cblx0Lmhhc1ZhbHVlIHtcblx0XHRjb2xvcjogI0ZGRjtcblx0fVxuXG5cdC5zb2NpYWxMaW5rcyB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcblx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0Ym90dG9tOiAwcHg7XG5cdFx0cmlnaHQ6IDBweDtcblx0XHRwYWRkaW5nLXRvcDogNHB4O1xuXHRcdHotaW5kZXg6IDEwMDtcblx0fVxuXG5cdC5zdHJvbmcge1xuXHRcdGZvbnQtd2VpZ2h0OiA2MDA7XG5cdH1cblxuXCJcIlwiXG5cblxuXG5cblxuXG5cbiMgQ29tcG9uZW50c1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdlxuXG5jbGFzcyBwRGl2XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblxuXHRcdEBwcm9wZXJ0aWVzID0gW11cblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicERpdlwiKVxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XCJ2aXNpYmxlXCIsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3Zpc2libGVcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdHJldHVybiBpZiBib29sIGlzIEBfdmlzaWJsZVxuXG5cdFx0XHRcdEBfdmlzaWJsZSA9IGJvb2xcblxuXHRcdFx0XHRpZiBib29sXG5cdFx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFJvd1xuXG5jbGFzcyBwUm93IGV4dGVuZHMgcERpdlxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHRleHQ6ICdMYWJlbCdcblx0XHRcdGJvbGQ6IGZhbHNlXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y2hpbGRyZW46IFtdXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwicERpdlwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUm93XCIpXG5cblx0XHRAbGFiZWwgPSBuZXcgcFNwYW5cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0XG5cdFx0XHRib2xkOiBvcHRpb25zLmJvbGRcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCAnY29sb3InLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQGxhYmVsLnN0eWxlLmNvbG9yXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGxhYmVsLmVsZW1lbnQuc3R5bGUuY29sb3IgPSB2YWx1ZVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBEaXZpZGVyXG5cbmNsYXNzIHBEaXZpZGVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicERpdmlkZXJcIilcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNwYW5cblxuY2xhc3MgcFNwYW5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0dGV4dDogJ2hlbGxvIHdvcmxkJ1xuXHRcdFx0Ym9sZDogZmFsc2VcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBTcGFuXCIpXG5cdFx0QGVsZW1lbnQudGV4dENvbnRlbnQgPSBvcHRpb25zLnRleHRcblxuXHRcdGlmIG9wdGlvbnMuYm9sZFxuXHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN0cm9uZ1wiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd0ZXh0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBlbGVtZW50LnRleHRDb250ZW50XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQGVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFJhbmdlXG5cbmNsYXNzIHBSYW5nZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0bWluOiAnMCdcblx0XHRcdG1heDogJzEwMCdcblx0XHRcdHZhbHVlOiAnMTAwJ1xuXHRcdFx0YWN0aW9uOiAodmFsdWUpID0+IG51bGxcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdF8uYXNzaWduIEBlbGVtZW50LFxuXHRcdFx0dHlwZTogJ3JhbmdlJ1xuXHRcdFx0bWluOiBvcHRpb25zLm1pblxuXHRcdFx0bWF4OiBvcHRpb25zLm1heFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdGFjdGlvbjogb3B0aW9ucy5hY3Rpb25cblxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUmFuZ2VcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0QGVsZW1lbnQub25pbnB1dCA9ID0+IEBhY3Rpb24oQHZhbHVlKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdHByb3BMYXllcnMucHVzaChAKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBlbGVtZW50LnZhbHVlXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0YWN0aW9uOiBvcHRpb25zLmFjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBMYWJlbFxuXG5jbGFzcyBwTGFiZWxcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0Y2xhc3NOYW1lOiBudWxsXG5cdFx0XHR0ZXh0OiAneCdcblx0XHRcdGZvcjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicExhYmVsXCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblx0XHRcblx0XHRfLmFzc2lnbiBAZWxlbWVudCxcblx0XHRcdHRleHRDb250ZW50OiBvcHRpb25zLnRleHRcblx0XHRcdGZvcjogb3B0aW9ucy5mb3JcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIElucHV0XG5cbmNsYXNzIHBJbnB1dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnJ1xuXHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRzZWN0aW9uOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdG9wdGlvbnMuc2VjdGlvbj8ucHJvcGVydGllcy5wdXNoKEApXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogb3B0aW9ucy5wYXJlbnRcblx0XHRcdGNsYXNzTmFtZTogb3B0aW9ucy5jbGFzc05hbWVcblx0XHRcdHRleHQ6IG9wdGlvbnMudW5pdFxuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0cHJvcExheWVycy5wdXNoKEApXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQnZGVmYXVsdCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX2RlZmF1bHRcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAX2RlZmF1bHQgPSB2YWx1ZVxuXG5cdFx0QGRlZmF1bHQgPSBvcHRpb25zLmRlZmF1bHQgPyAnJ1xuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0aWYgbm90IHZhbHVlPyBvciB2YWx1ZSBpcyBcIlwiIG9yIHZhbHVlIGlzIFwidW5kZWZpbmVkXCJcblx0XHRcdFx0XHR2YWx1ZSA9IFN0cmluZyhAZGVmYXVsdClcblxuXHRcdFx0XHRAZWxlbWVudC52YWx1ZSA9IHZhbHVlID8gXCJcIlxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgbm90IEBpc0RlZmF1bHQgYW5kIHZhbHVlIGlzbnQgXCJcIlxuXHRcdFx0XHRcdCMgQHNlY3Rpb24/LmNvbG9yID0gJyNGRkYnXG5cdFx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB0cnVlXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQnaXNEZWZhdWx0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfaXNEZWZhdWx0XG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRAX2lzRGVmYXVsdCA9IGJvb2xcblxuXHRcdFx0XHRpZiBib29sXG5cdFx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGFzVmFsdWUnKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdEAuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoYXNWYWx1ZScpXG5cblxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdGlmIG5vdCBzZWNyZXRCb3hcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHNlY3JldEJveC52YWx1ZSA9IEB2YWx1ZVxuXHRcdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdGRlZmF1bHQ6IG9wdGlvbnMuZGVmYXVsdFxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cdFx0XHRpc0RlZmF1bHQ6IG9wdGlvbnMuaXNEZWZhdWx0XG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIEltYWdlXG5cbmNsYXNzIHBJbWFnZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0dmFsdWU6ICcnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0c2VjdGlvbjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBJbWFnZVwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdG9wdGlvbnMuc2VjdGlvbj8ucHJvcGVydGllcy5wdXNoKEApXG5cblx0XHRwcm9wTGF5ZXJzLnB1c2goQClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSA9ICcnKSAtPlxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWVcblx0XHRcdFx0QGVsZW1lbnQuc3JjID0gdmFsdWVcblx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB2YWx1ZSBpc250ICcnXG5cblxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdGlmIG5vdCBzZWNyZXRCb3hcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHNlY3JldEJveC52YWx1ZSA9IEB2YWx1ZVxuXHRcdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBDb2xvciBCb3hcblxuY2xhc3MgcENvbG9yXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHR2YWx1ZTogJyMyOTI5MjknXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicElucHV0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncENvbG9yJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdG9wdGlvbnMuc2VjdGlvbj8ucHJvcGVydGllcy5wdXNoKEApXG5cblx0XHRwcm9wTGF5ZXJzLnB1c2goQClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblxuXHRcdFx0XHRpZiB2YWx1ZT8uY29sb3IgaXMgJ3RyYW5zcGFyZW50J1xuXHRcdFx0XHRcdHZhbHVlID0gbnVsbFxuXG5cdFx0XHRcdGlmIHZhbHVlPyBhbmQgdmFsdWUgaXNudCAnJ1xuXHRcdFx0XHRcdEBzZWN0aW9uPy52aXNpYmxlID0gdHJ1ZVxuXG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZSA/ICcnXG5cdFx0XHRcdEBlbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2YWx1ZSA/ICdub25lJ1xuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNlbGVjdFxuXG5jbGFzcyBwU2VsZWN0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblx0XHRcdHNlbGVjdGVkOiAwXG5cdFx0XHRvcHRpb25zOiBbJ3JlZCcsICd3aGl0ZScsICdibHVlJ11cblx0XHRcdGNhbGxiYWNrOiAodmFsdWUpIC0+IG51bGxcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFNlbGVjdFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhc1ZhbHVlJylcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa+J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J29wdGlvbnMnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9vcHRpb25zXG5cdFx0XHRzZXQ6IChhcnJheSkgLT5cblx0XHRcdFx0QF9vcHRpb25zID0gYXJyYXlcblx0XHRcdFx0QG1ha2VPcHRpb25zKClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3NlbGVjdGVkJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfc2VsZWN0ZWRcblx0XHRcdHNldDogKG51bSkgLT5cblx0XHRcdFx0QF9zZWxlY3RlZCA9IG51bVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdF9vcHRpb25zOiBbXVxuXHRcdFx0X29wdGlvbkVsZW1lbnRzOiBbXVxuXHRcdFx0b3B0aW9uczogb3B0aW9ucy5vcHRpb25zXG5cdFx0XHRjYWxsYmFjazogb3B0aW9ucy5jYWxsYmFja1xuXHRcdFx0c2VsZWN0ZWQ6IG9wdGlvbnMuc2VsZWN0ZWRcblxuXHRcdEBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBvcHRpb25zLnNlbGVjdGVkXG5cblx0XHRAZWxlbWVudC5vbmNoYW5nZSA9ID0+IFxuXHRcdFx0QHNlbGVjdGVkID0gQGVsZW1lbnQuc2VsZWN0ZWRJbmRleFxuXHRcdFx0QGNhbGxiYWNrKEBlbGVtZW50LnNlbGVjdGVkSW5kZXgpXG5cdFx0XG5cblx0bWFrZU9wdGlvbnM6ID0+XG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBAX29wdGlvbkVsZW1lbnRzXG5cdFx0XHRAZWxlbWVudC5yZW1vdmVDaGlsZChvcHRpb24pXG5cblx0XHRAX29wdGlvbkVsZW1lbnRzID0gW11cblxuXHRcdGZvciBvcHRpb24sIGkgaW4gQG9wdGlvbnNcblx0XHRcdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuXHRcdFx0by52YWx1ZSA9IG9wdGlvblxuXHRcdFx0by5sYWJlbCA9IG9wdGlvblxuXHRcdFx0by5pbm5lckhUTUwgPSBvcHRpb25cblx0XHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKG8pXG5cblx0XHRcdEBfb3B0aW9uRWxlbWVudHMucHVzaChvKVxuXG5cdFx0XHRpZiBpIGlzIEBzZWxlY3RlZFxuXHRcdFx0XHRAdmFsdWUgPSBAZWxlbWVudC5vcHRpb25zW0BlbGVtZW50LnNlbGVjdGVkSW5kZXhdLmxhYmVsXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIEFjY29yZGlhblxuXG5jbGFzcyBwQWNjb3JkaWFuIGV4dGVuZHMgcFJvd1xuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuJylcblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgQHRvZ2dsZVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHRvZ2dsZWQ6IGZhbHNlXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa/J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0QGJvZHkgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdEBib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoQGJvZHkubGFiZWwuZWxlbWVudClcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKEBib2R5LmVsZW1lbnQpXG5cdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuQm9keScpXG5cblx0XHRAYm9keS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2ZW50KSAtPiBcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBhY2NvcmRpb25zT3BlbiB0aGVuIEB0b2dnbGUoKSAjIHN0YXJ0IG9wZW5cblxuXHR0b2dnbGU6ID0+XG5cdFx0QHRvZ2dsZWQgPSAhQHRvZ2dsZWRcblxuXHRcdGlmIEB0b2dnbGVkXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvidcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgQGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvydcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIFx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIFx0YFk4ODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuICAgIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhcbiBcdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICAgICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcbiBcdGQ4JyAgIC44UCA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC4uLiAgICAgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG4gXHQgWTg4ODg4UCAgODhZODg4UCcgYDg4ODg4UCcgYDg4ODg4UCcgICAgIGRQICAgICAgICBgODg4ODhQOCBkUCAgICBkUCBgODg4ODhQJyBkUFxuIFx0ICAgICAgICAgIDg4XG4gXHQgICAgICAgICAgZFBcblxuIyMjXG5cbmNsYXNzIFNwZWNQYW5lbFxuXHRjb25zdHJ1Y3RvcjogLT5cblxuXHRcdEBlbGVtZW50ID0gcGFuZWxcblx0XHRAcHJvcExheWVycyA9IFtdXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRAZGVmYXVsdHMgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5fcHJvcGVydHlMaXN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaWYgc3RhcnRPcGVuIHRoZW4gJzEnIGVsc2UgJzAnXG5cdFx0QGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBkZXZpY2VcblxuXHRcdCMgU2V0IERldmljZSBPcHRpb25zXG5cblx0XHRkZXZpY2VPcHRpb25zID0gWydmdWxsc2NyZWVuJ11cblx0XHRjdXJyZW50U2VsZWN0ZWQgPSB1bmRlZmluZWRcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1xuXHRcdFx0aWYgXy5lbmRzV2l0aChrZXksICdoYW5kJylcblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgbm90IHZhbHVlLm1pblN0dWRpb1ZlcnNpb24/XG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGlmIFV0aWxzLmZyYW1lclN0dWRpb1ZlcnNpb24oKSA+IHZhbHVlLm1heFN0dWRpb1ZlcnNpb25cblx0XHRcdFx0Y29udGludWUgXG5cblx0XHRcdGlmIFV0aWxzLmZyYW1lclN0dWRpb1ZlcnNpb24oKSA8IHZhbHVlLm1pblN0dWRpb1ZlcnNpb25cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0ZGV2aWNlT3B0aW9ucy5wdXNoIChrZXkpXG5cblx0XHRcdGlmIGtleSBpcyBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblx0XHRcdFx0Y3VycmVudFNlbGVjdGVkID0gZGV2aWNlT3B0aW9ucy5sZW5ndGggLSAxXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZnJhbWVyIHNldHRpbmdzXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZGV2aWNlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0RldmljZSdcblxuXHRcdEBkZXZpY2VCb3ggPSBuZXcgcFNlbGVjdFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRvcHRpb25zOiBkZXZpY2VPcHRpb25zXG5cdFx0XHRzZWxlY3RlZDogY3VycmVudFNlbGVjdGVkXG5cdFx0XHRjYWxsYmFjazogKGluZGV4KSA9PlxuXHRcdFx0XHRkZXZpY2VUeXBlID0gZGV2aWNlT3B0aW9uc1tpbmRleF1cblx0XHRcdFx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdFx0XHRcdFxuXHRcdFx0XHRfLmFzc2lnbiB3aW5kb3cubG9jYWxTdG9yYWdlLFxuXHRcdFx0XHRcdGRldmljZVR5cGU6IGRldmljZVR5cGVcblx0XHRcdFx0XHRkZXZpY2U6IGRldmljZVxuXHRcdFx0XHRcdGJnOiBTY3JlZW4uYmFja2dyb3VuZENvbG9yXG5cblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYW5pbWF0aW9uIHNwZWVkXG5cblx0XHRAc3BlZWRSb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1NwZWVkIDEwMCUnXG5cblx0XHRtaW5wID0gcGFyc2VJbnQoMCwgMTApXG5cdFx0bWF4cCA9IHBhcnNlSW50KDEwMCwgMTApXG5cdFx0XG5cdFx0bWludiA9IE1hdGgubG9nKDAuMDAwMDEpXG5cdFx0bWF4diA9IE1hdGgubG9nKDAuMDE2NjY2NjY2NjcpXG5cblx0XHR2U2NhbGUgPSAobWF4di1taW52KSAvIChtYXhwLW1pbnApXG5cblx0XHRAc3BlZWRCb3ggPSBuZXcgcFJhbmdlXG5cdFx0XHRwYXJlbnQ6IEBzcGVlZFJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRhY3Rpb246ICh2YWx1ZSkgPT5cblxuXHRcdFx0XHRkZWx0YSA9IE1hdGguZXhwKG1pbnYgKyB2U2NhbGUqKHZhbHVlLW1pbnApKVxuXHRcdFx0XHRyYXRlID0gKGRlbHRhLygxLzYwKSkqMTAwXG5cdFx0XHRcdHNwYWNlcyA9IGlmIHJhdGUgPCAxIHRoZW4gMiBlbHNlIGlmIHJhdGUgPCAxMCB0aGVuIDEgZWxzZSAwXG5cblx0XHRcdFx0QHNwZWVkUm93LmxhYmVsLnRleHQgPSAnU3BlZWQgJyArIHJhdGUudG9GaXhlZChzcGFjZXMpICsgJyUnXG5cblx0XHRcdFx0RnJhbWVyLkxvb3AuZGVsdGEgPSBkZWx0YVxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGxheWVyIGRldGFpbHNcblxuXHRcdG5ldyBwRGl2aWRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdOYW1lJ1xuXG5cdFx0QG5hbWVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0NvbXBvbmVudCdcblxuXHRcdEBjb21wb25lbnROYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0QGNvbXBvbmVudE5hbWVzUm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdQYXJ0IG9mJ1xuXG5cdFx0QGNvbXBvbmVudE5hbWVzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiBAY29tcG9uZW50TmFtZXNSb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBvc2l0aW9uIGRldGFpbHNcblxuXHRcdG5ldyBwRGl2aWRlclxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBvc2l0aW9uXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1Bvc2l0aW9uJ1xuXG5cdFx0QHhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAeUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2l6ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdTaXplJ1xuXG5cdFx0QHdpZHRoQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0QGhlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmFja2dyb3VuZCBjb2xvclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXG5cdFx0QGJhY2tncm91bmRDb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50XG5cblx0XHRAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBncmFkaWVudFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdHcmFkaWVudCdcblxuXHRcdEBncmFkaWVudFN0YXJ0Qm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRzZWN0aW9uOiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRkZWZhdWx0OiBudWxsXG5cblx0XHRAZ3JhZGllbnRFbmRCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRzZWN0aW9uOiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRkZWZhdWx0OiBudWxsXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZ3JhZGllbnQgYW5nbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBncmFkaWVudFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAZ3JhZGllbnRBbmdsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ2EnXG5cdFx0XHRzZWN0aW9uOiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRkZWZhdWx0OiBudWxsXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgb3BhY2l0eVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdPcGFjaXR5J1xuXG5cdFx0QG9wYWNpdHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0RpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlciBwcm9wZXJ0aWVzXG5cblx0XHRAYm9yZGVyUHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYm9yZGVyXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0JvcmRlcidcblx0XHRcdHBhcmVudDogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdEBib3JkZXJDb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGJvcmRlcldpZHRoQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3cnXG5cdFx0XHRzZWN0aW9uOiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHJhZGl1c1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdSYWRpdXMnXG5cdFx0XHRwYXJlbnQ6IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHRAYm9yZGVyUmFkaXVzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0c2VjdGlvbjogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzaGFkb3dcblxuXG5cdFx0QHNoYWRvd1Byb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdTaGFkb3cnXG5cblx0XHRAc2hhZG93Q29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cblx0XHRAc2hhZG93U3ByZWFkQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdzJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBzaGFkb3dYQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdEBzaGFkb3dZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBzaGFkb3dCbHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ2InXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0IHN0eWxlc1xuXG5cdFx0QHRleHRQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmb250IGZhbWlseVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnRm9udCdcblxuXHRcdEBmb250RmFtaWx5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXG5cdFx0QGNvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cblx0XHRAZm9udFNpemVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgd2VpZ2h0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdTdHlsZSdcblxuXHRcdEBmb250U3R5bGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBmb250V2VpZ2h0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBhbGlnblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnQWxpZ24nXG5cblx0XHRAdGV4dEFsaWduQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnbGVmdCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzcGFjaW5nXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdTcGFjaW5nJ1xuXG5cdFx0QGxldHRlclNwYWNpbmdCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ2x0J1xuXHRcdFx0ZGVmYXVsdDogJzEnXG5cblx0XHRAbGluZUhlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ2xuJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRleHRcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1RleHQnXG5cblx0XHRAdGV4dEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdHJhbnNmb3JtIHByb3BlcnRpZXNcblxuXG5cdFx0QHRyYW5zZm9ybXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QHRyYW5zZm9ybXNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdUcmFuc2Zvcm1zJ1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2NhbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2NhbGUnXG5cblx0XHRAc2NhbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBzY2FsZVhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0QHNjYWxlWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHJvdGF0aW9uXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1JvdGF0ZSdcblxuXHRcdEByb3RhdGlvbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHJvdGF0aW9uWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAcm90YXRpb25ZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBvcmlnaW5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnT3JpZ2luJ1xuXG5cdFx0QG9yaWdpblhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcwLjUwJ1xuXG5cdFx0QG9yaWdpbllCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMC41MCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBza2V3XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NrZXcnXG5cblx0XHRAc2tld0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNrZXdYQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdEBza2V3WUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBlcnNwZWN0aXZlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1BlcnNwZWN0aXZlJ1xuXG5cdFx0QHBlcnNwZWN0aXZlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZmlsdGVycyBwcm9wZXJ0aWVzXG5cblx0XHRAZmlsdGVyc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAZmlsdGVyc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0RpdlxuXHRcdFx0dGV4dDogJ0ZpbHRlcnMnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmx1clxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCbHVyJ1xuXG5cdFx0QGJsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYnJpZ2h0bmVzc1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCcmlnaHRuZXNzJ1xuXG5cdFx0QGJyaWdodG5lc3NCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBjb250cmFzdFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdDb250cmFzdCdcblxuXHRcdEBjb250cmFzdEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYXlzY2FsZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdHcmF5c2NhbGUnXG5cblx0XHRAZ3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGh1ZXJvdGF0ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdodWVSb3RhdGUnXG5cblx0XHRAaHVlUm90YXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGludmVydFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdJbnZlcnQnXG5cblx0XHRAaW52ZXJ0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNhdHVyYXRlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QHNhdHVyYXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2VwaWFcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2VwaWEnXG5cblx0XHRAc2VwaWFCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZCBmaWx0ZXJzXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBlZmZlY3RzIHByb3BlcnRpZXNcblxuXG5cdFx0QGVmZmVjdHNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGVmZmVjdHNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdFZmZlY3RzJ1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmFja2dyb3VuZCBmaWx0ZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsZW5kaW5nJ1xuXG5cdFx0QGJsZW5kaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICdub3JtYWwnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsdXInXG5cblx0XHRAYmFja2dyb3VuZEJsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQnJpZ2h0bmVzcydcblxuXHRcdEBiYWNrZ3JvdW5kQnJpZ2h0bmVzc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QGJhY2tncm91bmRTYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ2h1ZVJvdGF0ZSdcblxuXHRcdEBiYWNrZ3JvdW5kSHVlUm90YXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0NvbnRyYXN0J1xuXG5cdFx0QGJhY2tncm91bmRDb250cmFzdEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0ludmVydCdcblxuXHRcdEBiYWNrZ3JvdW5kSW52ZXJ0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0dyYXlzY2FsZSdcblxuXHRcdEBiYWNrZ3JvdW5kR3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NlcGlhJ1xuXG5cdFx0QGJhY2tncm91bmRTZXBpYUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYW5pbWF0aW9uIHByb3BlcnRpZXNcblxuXG5cdFx0QGFuaW1zRGl2ID0gbmV3IHBEaXZcblxuXHRcdEBhbmltc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ0FuaW1hdGlvbnMnXG5cdFx0XHRwYXJlbnQ6IEBhbmltc0RpdlxuXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBldmVudCBsaXN0ZW5lciBwcm9wZXJ0aWVzXG5cblxuXHRcdEBldmVudExpc3RlbmVyc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAZXZlbnRMaXN0ZW5lcnNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdFdmVudCBMaXN0ZW5lcnMnXG5cdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0RpdlxuXG5cblxuXHRcdCMgaW1hZ2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBpbWFnZVByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRwYXJlbnQ6IEBpbWFnZVByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBpbWFnZVxuXG5cdFx0QGltYWdlQm94ID0gbmV3IHBJbWFnZVxuXHRcdFx0cGFyZW50OiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cdFx0XHRzZWN0aW9uOiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cblxuXHRcdCMgc2NyZWVuc2hvdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzY3JlZW5zaG90RGl2ID0gbmV3IHBEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzY3JlZW5zaG90XG5cblx0XHRAc2NyZWVuc2hvdEJveCA9IG5ldyBwSW1hZ2Vcblx0XHRcdHBhcmVudDogQHNjcmVlbnNob3REaXZcblx0XHRcdHNlY3Rpb246IEBzY3JlZW5zaG90RGl2XG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwbGFjZWhvbGRlcnNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdHJvdy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICc2NHB4J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNvY2lhbCBtZWRpYSBsaW5rc1xuXG5cdFx0QHNvY2lhbE1lZGlhUm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2LmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAbGlua2VkaW5JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQGxpbmtlZGluSWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vaW4vc3RldmVydWl6b2tcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaWQ9XCJsaW5rZWRpbl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMTEgMTloLTN2LTExaDN2MTF6bS0xLjUtMTIuMjY4Yy0uOTY2IDAtMS43NS0uNzktMS43NS0xLjc2NHMuNzg0LTEuNzY0IDEuNzUtMS43NjQgMS43NS43OSAxLjc1IDEuNzY0LS43ODMgMS43NjQtMS43NSAxLjc2NHptMTMuNSAxMi4yNjhoLTN2LTUuNjA0YzAtMy4zNjgtNC0zLjExMy00IDB2NS42MDRoLTN2LTExaDN2MS43NjVjMS4zOTYtMi41ODYgNy0yLjc3NyA3IDIuNDc2djYuNzU5elwiLz48L3N2Zz4nXG5cblx0XHRAZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEBnaXRodWJJY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpvay9nb3RjaGFcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAdHdpdHRlckljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblxuXHRcdGZvciBlbGVtZW50IGluIFtAbGlua2VkaW5JY29uLCBAZ2l0aHViSWNvbiwgQHR3aXR0ZXJJY29uXVxuXHRcdFx0QHNvY2lhbE1lZGlhUm93LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudClcblx0XHRcdEBzb2NpYWxNZWRpYVJvdy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvY2lhbExpbmtzJylcblxuXHRcdEBoaWRlRGl2cygpXG5cblx0Y2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9uczogKGFuaW1hdGlvbnMpID0+XG5cdFx0Y2hpbGQgPSBAYW5pbXNBY2NvLmJvZHkuZWxlbWVudC5jaGlsZE5vZGVzWzBdXG5cblx0XHRpZiBub3QgY2hpbGQ/XG5cdFx0XHRAc2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblx0XHRcdHJldHVyblxuXG5cdFx0QGFuaW1zQWNjby5ib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG5cdFx0QGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblxuXHRjbGVhckNoaWxkcmVuVGhlblNob3dFdmVudExpc3RlbmVyczogKGV2ZW50TGlzdGVuZXJzKSA9PlxuXG5cdFx0Y2hpbGQgPSBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHkuZWxlbWVudC5jaGlsZE5vZGVzWzBdXG5cblx0XHRpZiBub3QgY2hpbGQ/XG5cdFx0XHRAc2hvd0V2ZW50TGlzdGVuZXJzKGV2ZW50TGlzdGVuZXJzKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZClcblx0XHRAY2xlYXJDaGlsZHJlblRoZW5TaG93RXZlbnRMaXN0ZW5lcnMoZXZlbnRMaXN0ZW5lcnMpXG5cblx0c2hvd0V2ZW50TGlzdGVuZXJzOiAoZXZlbnRMaXN0ZW5lcnMgPSBbXSkgPT5cblxuXHRcdGRlZmF1bHRzID0gW1xuXHRcdFx0XCJmdW5jdGlvbiAoKXtyZXR1cm4gZm4uYXBwbHkobWUsYXJndW1lbnRzKX1cIiwgXG5cdFx0XHRcImZ1bmN0aW9uICgpe3JldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKX1cIiwgXG5cdFx0XHRcImZ1bmN0aW9uIChldmVudCl7cmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCl9XCIsXG5cdFx0XHRcImZ1bmN0aW9uICgpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH1cIixcblx0XHRcdCdmdW5jdGlvbiBkZWJvdW5jZWQoKXt2YXIgdGltZT1ub3coKSxpc0ludm9raW5nPXNob3VsZEludm9rZSh0aW1lKTtpZihsYXN0QXJncz1hcmd1bWVudHMsbGFzdFRoaXM9dGhpcyxsYXN0Q2FsbFRpbWU9dGltZSxpc0ludm9raW5nKXtpZih0aW1lcklkPT09dW5kZWZpbmVkKXJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO2lmKG1heGluZylyZXR1cm4gdGltZXJJZD1zZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCx3YWl0KSxpbnZva2VGdW5jKGxhc3RDYWxsVGltZSl9cmV0dXJuIHRpbWVySWQ9PT11bmRlZmluZWQmJih0aW1lcklkPXNldFRpbWVvdXQodGltZXJFeHBpcmVkLHdhaXQpKSxyZXN1bHR9Jyxcblx0XHRcdCdmdW5jdGlvbiAodmFsdWUpe2lmKG51bGwhPT12YWx1ZSlyZXR1cm5cImZvbnRTaXplXCIhPT1wcm9wZXJ0eSYmXCJmb250XCIhPT1wcm9wZXJ0eSYmX3RoaXMuX3N0eWxlZFRleHQucmVzZXRTdHlsZShwcm9wZXJ0eSksX3RoaXMucmVuZGVyVGV4dCgpfScsXG5cdFx0XVxuXG5cdFx0cmVhbExpc3RlbmVycyA9IDBcblxuXHRcdGZvciBsaXN0ZW5lciwgaSBpbiBldmVudExpc3RlbmVyc1xuXG5cdFx0XHRjb250aW51ZSBpZiBfLmV2ZXJ5KGxpc3RlbmVyLmV2ZW50cywgKGUpIC0+IF8uaW5jbHVkZXMoZGVmYXVsdHMsIGUuZnVuY3Rpb24pKVxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIGxpc3RlbmVyXG5cblx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cdFx0XHRcdHRleHQ6ICdcIicgKyBsaXN0ZW5lci5saXN0ZW5lciArICdcIidcblx0XHRcdFx0Ym9sZDogdHJ1ZVxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIGV2ZW50c1xuXG5cdFx0XHRmb3IgZXZlbnQsIGUgaW4gbGlzdGVuZXIuZXZlbnRzXG5cblx0XHRcdFx0Y29udGludWUgaWYgXy5pbmNsdWRlcyhkZWZhdWx0cywgZXZlbnQuZnVuY3Rpb24pXG5cblx0XHRcdFx0cmVhbExpc3RlbmVycysrXG5cblx0XHRcdFx0IyBuYW1lXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdOYW1lJ1xuXHRcdFx0XHRcblx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdHZhbHVlOiBldmVudC5uYW1lID8gJydcblx0XHRcdFx0XHRpc0RlZmF1bHQ6IGV2ZW50Lm5hbWUgaXNudCAndW5kZWZpbmVkJ1xuXG5cdFx0XHRcdCMgZnVuY3Rpb25cblxuXHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cdFx0XHRcdFx0dGV4dDogJ0Z1bmN0aW9uJ1xuXHRcdFx0XHRcblx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdHZhbHVlOiBldmVudC5mdW5jdGlvblxuXHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHQjIE9uY2VcblxuXHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cdFx0XHRcdFx0dGV4dDogJ09uY2UnXG5cdFx0XHRcdFxuXHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0dmFsdWU6IGV2ZW50Lm9uY2Vcblx0XHRcdFx0XHRpc0RlZmF1bHQ6IGV2ZW50Lm5hbWUgaXNudCAnZmFsc2UnXG5cblx0XHRcdFx0dW5sZXNzIGUgaXMgbGlzdGVuZXIuZXZlbnRzLmxlbmd0aCAtIDFcblx0XHRcdFx0XHRuZXcgcERpdmlkZXJcblx0XHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cblx0XHRcdHVubGVzcyBpIGlzIGV2ZW50TGlzdGVuZXJzLmxlbmd0aCAtIDFcblx0XHRcdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblxuXG5cdFx0IyBzZXQgY29sb3JcblxuXHRcdGlmIHJlYWxMaXN0ZW5lcnMgaXMgMFxuXHRcdFx0QGV2ZW50TGlzdGVuZXJzQWNjby5jb2xvciA9ICcjODg4ODg4J1xuXHRcdFx0cmV0dXJuXG5cblx0XHRAZXZlbnRMaXN0ZW5lcnNBY2NvLmNvbG9yID0gJyNGRkZGRkYnXG5cblx0c2hvd0FuaW1hdGlvbnM6IChhbmltYXRpb25zKSA9PlxuXHRcdFxuXHRcdEBhbmltc0FjY28uY29sb3IgPSBpZiBhbmltYXRpb25zLmxlbmd0aCA+IDAgdGhlbiAnI0ZGRicgZWxzZSAnIzg4ODg4OCdcblx0XG5cdFx0Zm9yIGFuaW0sIGkgaW4gYW5pbWF0aW9uc1xuXG5cdFx0XHRwcm9wZXJ0aWVzID0gYW5pbS5wcm9wZXJ0aWVzXG5cdFx0XHRvcHRpb25zID0gYW5pbS5vcHRpb25zXG5cdFx0XHRzdGF0ZUEgPSBhbmltLl9zdGF0ZUFcblx0XHRcdHN0YXRlQiA9IGFuaW0uX3N0YXRlQlxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRcdCMgYW5pbWF0aW9uXG5cblx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdHRleHQ6ICdBbmltYXRpb24gJyArIChpICsgMSlcblx0XHRcdFx0Ym9sZDogdHJ1ZVxuXG5cdFx0XHRmcm9tVW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdFx0cGFyZW50OiByb3cgXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdHRleHQ6ICdmcm9tJ1xuXG5cdFx0XHR0b1VuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRcdHBhcmVudDogcm93IFxuXHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0dGV4dDogJ3RvJ1xuXG5cdFx0XHRmb3IgZWxlbWVudCBpbiBbZnJvbVVuaXQuZWxlbWVudCwgdG9Vbml0LmVsZW1lbnRdXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWxpZ25MZWZ0JylcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS1cblx0XHRcdCMgcHJvcGVydGllc1xuXG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBwcm9wZXJ0aWVzXG5cblx0XHRcdFx0aWYgQ29sb3IuaXNDb2xvck9iamVjdCh2YWx1ZSkgb3IgQ29sb3IuaXNDb2xvcih2YWx1ZSlcblxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogXy5zdGFydENhc2Uoa2V5KVxuXG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0ZWxzZSBpZiBrZXkgaXMgJ2dyYWRpZW50J1xuXG5cdFx0XHRcdFx0IyBzdGFydFxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgU3RhcnQnXG5cdFx0XHRcdFxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV0/LnN0YXJ0XG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV0/LnN0YXJ0XG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIGVuZFxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgRW5kJ1xuXHRcdFx0XHRcblx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldPy5lbmRcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XT8uZW5kXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIGFuZ2xlXG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBBbmdsZSdcblx0XHRcdFx0XG5cdFx0XHRcdFx0IyBmcm9tIFxuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV0/LmFuZ2xlXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV0/LmFuZ2xlXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0ZWxzZVxuXG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiBfLnN0YXJ0Q2FzZShrZXkpXG5cblx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS1cblx0XHRcdCMgb3B0aW9uc1xuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnT3B0aW9ucydcblxuXHRcdFx0IyB0aW1lXG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdHVuaXQ6ICdzJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy50aW1lXG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0IyB0aW1lXG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHR1bml0OiAnZCdcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMuZGVsYXlcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0XHQjIHJlcGVhdFxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR1bml0OiAncidcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMucmVwZWF0XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0IyB0aW1lXG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHR1bml0OiAnbCdcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMubG9vcGluZ1xuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdHVubGVzcyBpIGlzIGFuaW1hdGlvbnMubGVuZ3RoIC0gMVxuXHRcdFx0XHRuZXcgcERpdmlkZXJcblx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXG5cdFx0XG5cdHNob3dQcm9wZXJ0aWVzOiAobGF5ZXIsIGN1c3RvbVByb3BzKSA9PlxuXG5cdFx0QHNjcm9sbFRvcCA9IEBlbGVtZW50LnNjcm9sbFRvcFxuXG5cdFx0cHJvcHMgPSBsYXllci5wcm9wc1xuXHRcdF8uYXNzaWduIHByb3BzLCBjdXN0b21Qcm9wc1xuXG5cdFx0ZGVmYXVsdHMgPSBsYXllci5fcHJvcGVydHlMaXN0KClcblxuXHRcdF8uYXNzaWduIGRlZmF1bHRzLFxuXHRcdFx0cm90YXRpb246IGRlZmF1bHRzLnJvdGF0aW9uWlxuXHRcdFx0YmxlbmRpbmc6IHtkZWZhdWx0OiAnbm9ybWFsJ31cblxuXHRcdEBoaWRlRGl2cygpXG5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBfLm1lcmdlKGxheWVyLnByb3BzLCBjdXN0b21Qcm9wcylcblxuXHRcdFx0cHJvcExheWVyID0gQFtrZXkgKyAnQm94J11cblxuXHRcdFx0aWYgbm90IHByb3BMYXllclxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZWYgPSBkZWZhdWx0c1trZXldPy5kZWZhdWx0XG5cdFx0XHRcblx0XHRcdEBzaG93UHJvcGVydHkoa2V5LCB2YWx1ZSwgcHJvcExheWVyLCBkZWYpXG5cblx0XHRAc2hvd092ZXJyaWRlSW5BY2NvKEBlZmZlY3RzRGl2LCBAZWZmZWN0c0FjY28pXG5cdFx0QHNob3dPdmVycmlkZUluQWNjbyhAZmlsdGVyc0RpdiwgQGZpbHRlcnNBY2NvKVxuXHRcdEBzaG93T3ZlcnJpZGVJbkFjY28oQHRyYW5zZm9ybXNEaXYsIEB0cmFuc2Zvcm1zQWNjbylcblx0XHRcdFx0XG5cdFx0QGVsZW1lbnQuc2Nyb2xsVG9wID0gQHNjcm9sbFRvcFxuXG5cdHNob3dPdmVycmlkZUluQWNjbzogKGRpdiwgYWNjbykgLT5cblx0XHRhY2NvLmNvbG9yID0gJyM4ODg4ODgnXG5cdFx0Zm9yIHByb3BMYXllciBpbiBkaXYucHJvcGVydGllc1xuXHRcdFx0aWYgcHJvcExheWVyLnZhbHVlPyBhbmQgcHJvcExheWVyLnZhbHVlIGlzbnQgcHJvcExheWVyLmRlZmF1bHRcblx0XHRcdFx0YWNjby5jb2xvciA9ICcjRkZGJ1xuXG5cdHNob3dQcm9wZXJ0eTogKGtleSwgdmFsdWUsIHByb3BMYXllciwgZGVmKSA9PlxuXG5cdFx0cmV0dXJuIGlmIHZhbHVlIGlzIHByb3BMYXllci52YWx1ZVxuXG5cdFx0cHJvcExheWVyLmlzRGVmYXVsdCA9IGZhbHNlXG5cblx0XHRpZiBub3QgdmFsdWU/IG9yIF8uaXNOYU4odmFsdWUpIG9yIHZhbHVlIGlzIGRlZlxuXHRcdFx0dmFsdWUgPSBkZWYgPyAnJ1xuXHRcdFx0cHJvcExheWVyLmlzRGVmYXVsdCA9IHRydWVcblxuXHRcdCMgY29sb3Jcblx0XHRpZiBDb2xvci5pc0NvbG9yT2JqZWN0KHZhbHVlKVxuXHRcdFx0dmFsdWUgPSB2YWx1ZS50b0hzbFN0cmluZygpXG5cblx0XHQjIGdyYWRpZW50XG5cdFx0aWYgdmFsdWU/LmNvbnN0cnVjdG9yPy5uYW1lIGlzICdHcmFkaWVudCdcblx0XHRcdHByb3BMYXllci52YWx1ZSA9ICcnXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgc3RyaW5nXG5cdFx0aWYgdHlwZW9mIHZhbHVlIGlzICdzdHJpbmcnXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuXG5cblx0XHR2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKClcblxuXHRcdCMgZmxvYXRcblx0XHRpZiB2YWx1ZS5pbmRleE9mKCcuJykgaXNudCAtMVxuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSkudG9GaXhlZCgyKVxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIG51bWVyXG5cdFx0cHJvcExheWVyLnZhbHVlID0gcGFyc2VJbnQodmFsdWUsIDEwKS50b0ZpeGVkKClcblxuXHRoaWRlRGl2czogPT5cblx0XHRmb3IgZGl2IGluIFtcblx0XHRcdEBncmFkaWVudFByb3BlcnRpZXNEaXYsXG5cdFx0XHRAdGV4dFByb3BlcnRpZXNEaXYsXG5cdFx0XHRAc2hhZG93UHJvcGVydGllc0Rpdixcblx0XHRcdEBib3JkZXJQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QGltYWdlUHJvcGVydGllc0Rpdixcblx0XHRcdEBzY3JlZW5zaG90RGl2XG5cdFx0XVxuXHRcdFx0ZGl2LnZpc2libGUgPSBmYWxzZVxuXG5cblxuXG5cblxuXG5cbnByb3BMYXllcnMgPSBbXVxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcblx0ZDgnICAgYDg4ICAgICAgICAgICAgODggICAgICAgICAgICA4OFxuXHQ4OCAgICAgICAgLmQ4ODg4Yi4gZDg4ODhQIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuXG5cdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuXHRZOC4gICAuODggODguICAuODggICA4OCAgIDg4LiAgLi4uIDg4ICAgIDg4IDg4LiAgLjg4XG5cdCBgODg4ODgnICBgODg4ODhQJyAgIGRQICAgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4ODhcblxuIyMjIFxuXG5cbmNsYXNzIEdvdGNoYVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdEBzcGVjUGFuZWwgPSBuZXcgU3BlY1BhbmVsXG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRjb2xvcjogJ3JnYmEoNzIsIDIwNywgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWxlY3RlZENvbG9yOiAncmdiYSgyNTUsIDEsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6ICcjRkZGRkZGJ1xuXHRcdFx0Zm9udEZhbWlseTogJ01lbmxvJ1xuXHRcdFx0Zm9udFNpemU6ICcxMCdcblx0XHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0XHRib3JkZXJSYWRpdXM6IDRcblx0XHRcdHBhZGRpbmc6IHt0b3A6IDEsIGJvdHRvbTogMSwgbGVmdDogMywgcmlnaHQ6IDN9XG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0Y29sb3I6IG9wdGlvbnMuY29sb3Jcblx0XHRcdHNlbGVjdGVkQ29sb3I6IG9wdGlvbnMuc2VsZWN0ZWRDb2xvclxuXHRcdFx0c2Vjb25kYXJ5Q29sb3I6IG9wdGlvbnMuc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdGZvbnRGYW1pbHk6IG9wdGlvbnMuZm9udEZhbWlseVxuXHRcdFx0Zm9udFNpemU6IG9wdGlvbnMuZm9udFNpemVcblx0XHRcdGZvbnRXZWlnaHQ6IG9wdGlvbnMuZm9udFdlaWdodFxuXHRcdFx0c2hhcGVzOiBbXVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBvcHRpb25zLmJvcmRlclJhZGl1c1xuXHRcdFx0cGFkZGluZzogb3B0aW9ucy5wYWRkaW5nXG5cdFx0XHRmb2N1c2VkRWxlbWVudDogdW5kZWZpbmVkXG5cdFx0XHRlbmFibGVkOiBmYWxzZVxuXHRcdFx0c2NyZWVuRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XHRsYXllcnM6IFtdXG5cdFx0XHRjb250YWluZXJzOiBbXVxuXHRcdFx0dGltZXI6IHVuZGVmaW5lZFxuXHRcdFx0X29ubHlWaXNpYmxlOiB0cnVlXG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIEB0b2dnbGUpXG5cdFx0RnJhbWVyLkN1cnJlbnRDb250ZXh0LmRvbUV2ZW50TWFuYWdlci53cmFwKHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBAdXBkYXRlKVxuXG5cdFx0QGNvbnRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VTY3JlZW4nKVswXVxuXHRcdEBjb250ZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdmVyQ29udGV4dCcpXG5cdFx0QGNvbnRleHQuY2hpbGROb2Rlc1syXS5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0XCJvbmx5VmlzaWJsZVwiLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9vbmx5VmlzaWJsZVxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0cmV0dXJuIGlmIHR5cGVvZiBib29sIGlzbnQgJ2Jvb2xlYW4nXG5cdFx0XHRcdEBfb25seVZpc2libGUgPSBib29sXG5cblx0XHRGcmFtZXIuRGV2aWNlLm9uIFwiY2hhbmdlOmRldmljZVR5cGVcIiwgPT5cblx0XHRcdFV0aWxzLmRlbGF5IDAsIEB1cGRhdGVcblxuXHR0b2dnbGU6IChldmVudCwgb3BlbikgPT5cblx0XHQjIHJldHVybiBpZiBGcmFtZXIuRGV2aWNlLmhhbmRzLmlzQW5pbWF0aW5nXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJgXCIgb3IgZXZlbnQua2V5IGlzIFwiPFwiIG9yIG9wZW4gaXMgdHJ1ZVxuXHRcdFx0aWYgQG9wZW5lZCB0aGVuIEBkaXNhYmxlKCkgZWxzZSBAZW5hYmxlKClcblx0XHRcdEBvcGVuZWQgPSAhQG9wZW5lZFxuXHRcdFx0cmV0dXJuXG5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCIvXCIgb3IgZXZlbnQua2V5IGlzIFwiPlwiXG5cdFx0XHRAc2V0U2VsZWN0ZWRMYXllcigpXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi5cIlxuXHRcdFx0QGhvdmVyZWRMYXllcj8uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIlxcXFxcIlxuXHRcdFx0QF9sYXN0U3BlZWQgPz0gMVxuXHRcdFx0dGhpc1NwZWVkID0gQHNwZWNQYW5lbC5zcGVlZEJveC5lbGVtZW50LnZhbHVlXG5cblx0XHRcdGlmIHRoaXNTcGVlZCBpcyBcIjBcIlxuXHRcdFx0XHRAc3BlY1BhbmVsLnNwZWVkQm94LmVsZW1lbnQudmFsdWUgPSBAX2xhc3RTcGVlZFxuXHRcdFx0XHRAc3BlY1BhbmVsLnNwZWVkQm94LmFjdGlvbihAX2xhc3RTcGVlZClcblx0XHRcdGVsc2UgXG5cdFx0XHRcdEBzcGVjUGFuZWwuc3BlZWRCb3guZWxlbWVudC52YWx1ZSA9IDBcblx0XHRcdFx0RnJhbWVyLkxvb3AuZGVsdGEgPSAuMDAwMDAwMDAwMDAwMDAwMDAwMDAxXG5cdFx0XHRcdEBfbGFzdFNwZWVkID0gdGhpc1NwZWVkXG5cblx0IyBvcGVuIHRoZSBwYW5lbCwgc3RhcnQgbGlzdGVuaW5nIGZvciBldmVudHNcblx0ZW5hYmxlOiA9PlxuXHRcdEBfY2FudmFzQ29sb3IgPSBDYW52YXMuYmFja2dyb3VuZENvbG9yXG5cdFx0c3ZnQ29udGV4dC5zZXRDb250ZXh0KClcblxuXHRcdEB0cmFuc2l0aW9uKHRydWUpXG5cblx0XHRpZiBAdGltZXI/IHRoZW4gY2xlYXJJbnRlcnZhbCBAdGltZXJcblx0XHRAdGltZXIgPSBVdGlscy5pbnRlcnZhbCAxLzE1LCBAZm9jdXNcblxuXHRkaXNhYmxlOiA9PlxuXHRcdEB1bmZvY3VzKClcblx0XHRAZW5hYmxlZCA9IGZhbHNlXG5cblx0XHRAdHJhbnNpdGlvbihmYWxzZSlcblxuXHRcdGlmIEB0aW1lcj8gdGhlbiBjbGVhckludGVydmFsIEB0aW1lclxuXG5cdHRyYW5zaXRpb246IChvcGVuID0gdHJ1ZSwgc2Vjb25kcyA9IC41KSA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXG5cdFx0aGFuZHMub24gXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblxuXHRcdGhhbmRzLm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdGhhbmRzLm9mZiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXHRcdFx0QGVuYWJsZWQgPSBAb3BlbmVkID0gb3BlblxuXG5cdFx0XHRpZiBvcGVuXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU92ZXIsIEBzZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5iYWNrZ3JvdW5kLm9uIEV2ZW50cy5Nb3VzZU92ZXIsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuQ2xpY2ssIEBzZXRTZWxlY3RlZExheWVyXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5Nb3VzZU92ZXIsIEBzZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5Nb3VzZU91dCwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZC5vZmYgRXZlbnRzLk1vdXNlT3ZlciwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuQ2xpY2ssIEBzZXRTZWxlY3RlZExheWVyXG5cblx0XHRcdEBmb2N1cygpXG5cblx0XHRAX3N0YXJ0UG9zaXRpb24gPSBGcmFtZXIuRGV2aWNlLmhhbmRzLnhcblxuXHRcdG1pZFggPSBoYW5kcy5fY29udGV4dC5pbm5lcldpZHRoIC8gMlxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5hbmltYXRlXG5cdFx0XHRtaWRYOiBpZiBvcGVuIHRoZW4gbWlkWCAtIDExMiBlbHNlIG1pZFhcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IHNlY29uZHNcblx0XHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAxMClcblxuXHRzaG93VHJhbnNpdGlvbjogPT5cblx0XHRoYW5kcyA9IEZyYW1lci5EZXZpY2UuaGFuZHNcblx0XHRtaWRYID0gaGFuZHMuX2NvbnRleHQuaW5uZXJXaWR0aCAvIDJcblxuXHRcdG9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdGhhbmRzLm1pZFgsXG5cdFx0XHRbbWlkWCAtIDU2LCBtaWRYIC0gMTEyXSwgXG5cdFx0XHRbMCwgMV0sIFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdGZhY3RvciA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0aGFuZHMubWlkWCxcblx0XHRcdFttaWRYLCBtaWRYIC0gMTEyXSxcblx0XHRcdFswLCAxXSxcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRAc3BlY1BhbmVsLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHlcblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gQ29sb3IubWl4IEBfY2FudmFzQ29sb3IsJ3JnYmEoMzAsIDMwLCAzMCwgMS4wMDApJywgZmFjdG9yXG5cblx0IyB1cGRhdGUgd2hlbiBzY3JlZW4gc2l6ZSBjaGFuZ2VzXG5cdHVwZGF0ZTogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBvcGVuZWRcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMubWlkWCAtPSAxMjJcblxuXHRcdHN2Z0NvbnRleHQuc2V0Q29udGV4dCgpXG5cdFx0QGZvY3VzKClcblxuXHQjIGdldCB0aGUgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50XG5cdGdldERpbWVuc2lvbnM6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdGQgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRkaW1lbnNpb25zID0ge1xuXHRcdFx0eDogZC5sZWZ0XG5cdFx0XHR5OiBkLnRvcFxuXHRcdFx0d2lkdGg6IGQud2lkdGhcblx0XHRcdGhlaWdodDogZC5oZWlnaHRcblx0XHRcdG1pZFg6IGQubGVmdCArIChkLndpZHRoIC8gMilcblx0XHRcdG1pZFk6IGQudG9wICsgKGQuaGVpZ2h0IC8gMilcblx0XHRcdG1heFg6IGQubGVmdCArIGQud2lkdGhcblx0XHRcdG1heFk6IGQudG9wICsgZC5oZWlnaHRcblx0XHRcdGZyYW1lOiBkXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpbWVuc2lvbnNcblxuXHQjIG1ha2UgYSByZWxhdGl2ZSBkaXN0YW5jZSBsaW5lXG5cdG1ha2VMaW5lOiAocG9pbnRBLCBwb2ludEIsIGxhYmVsID0gdHJ1ZSkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxpbmUgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV19XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgcG9pbnRBWzBdIGlzIHBvaW50QlswXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF0gLSA1fSAje3BvaW50QVsxXX0gTCAje3BvaW50QVswXSArIDV9ICN7cG9pbnRBWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXSAtIDV9ICN7cG9pbnRCWzFdfSBMICN7cG9pbnRCWzBdICsgNX0gI3twb2ludEJbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGVsc2UgaWYgcG9pbnRBWzFdIGlzIHBvaW50QlsxXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdIC0gNX0gTCAje3BvaW50QVswXX0gI3twb2ludEFbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXX0gI3twb2ludEJbMV0gLSA1fSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHQjIG1ha2UgdGhlIGxhYmVsIGJveCBmb3IgZGlzdGFuY2UgbGluZXNcblx0bWFrZUxhYmVsOiAoeCwgeSwgdGV4dCkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxhYmVsID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAndGV4dCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogeFxuXHRcdFx0eTogeSArIDRcblx0XHRcdCdmb250LWZhbWlseSc6IEBmb250RmFtaWx5XG5cdFx0XHQnZm9udC1zaXplJzogQGZvbnRTaXplXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBAZm9udFdlaWdodFxuXHRcdFx0J3RleHQtYW5jaG9yJzogXCJtaWRkbGVcIlxuXHRcdFx0ZmlsbDogQHNlY29uZGFyeUNvbG9yXG5cdFx0XHR0ZXh0OiBNYXRoLmZsb29yKHRleHQgLyBAcmF0aW8pXG5cblx0XHR3ID0gbGFiZWwuZWxlbWVudC50ZXh0TGVuZ3RoLmJhc2VWYWwudmFsdWVcblxuXHRcdGJveCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IHggLSAodyAvIDIpIC0gQHBhZGRpbmcubGVmdFxuXHRcdFx0eTogeSAtIDdcblx0XHRcdHdpZHRoOiB3ICsgQHBhZGRpbmcubGVmdCArIEBwYWRkaW5nLnJpZ2h0XG5cdFx0XHRoZWlnaHQ6IDE1XG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IG5ldyBDb2xvcihjb2xvcikuZGFya2VuKDQwKVxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHQjIG1ha2UgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBmb3Igc2VsZWN0ZWQgLyBob3ZlcmVkIGVsZW1lbnRzXG5cdG1ha2VSZWN0T3ZlcmxheXM6IChzZWxlY3RlZExheWVyLCBzLCBob3ZlcmVkTGF5ZXIsIGgpID0+XG5cdFx0aWYgbm90IHMgb3Igbm90IGhcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgaG92ZXJlZExheWVyIGlzIHNlbGVjdGVkTGF5ZXJcblx0XHRcdGhvdmVyZWRMYXllciA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGlmIGhvdmVyZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogaC54XG5cdFx0XHR5OiBoLnlcblx0XHRcdHdpZHRoOiBoLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGguaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBjb2xvclxuXHRcdFx0ZmlsbDogaG92ZXJGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKC4yKVxuXHRcdFxuXHRcdGlmIHNlbGVjdGVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKDApXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBzLnhcblx0XHRcdHk6IHMueVxuXHRcdFx0d2lkdGg6IHMud2lkdGhcblx0XHRcdGhlaWdodDogcy5oZWlnaHRcblx0XHRcdHN0cm9rZTogQHNlbGVjdGVkQ29sb3Jcblx0XHRcdGZpbGw6IHNlbGVjdEZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdCMgbWFrZSBkYXNoZWQgbGluZXMgZnJvbSBib3VuZGluZyByZWN0IHRvIHNjcmVlbiBlZGdlXG5cdG1ha2VEYXNoZWRMaW5lczogKGUsIGYsIGNvbG9yLCBvZmZzZXQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlXG5cdFx0cmV0dXJuIGlmIGUgaXMgZlxuXG5cdFx0Y29sb3IgPSBuZXcgQ29sb3IoY29sb3IpLmFscGhhKC44KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS54LCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUueCwgeTogZi5tYXhZfVxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi55fSxcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUueX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLnl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLm1heFl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0c2hvd0Rpc3RhbmNlczogKHNlbGVjdGVkTGF5ZXIsIGhvdmVyZWRMYXllcikgPT5cblxuXHRcdHJldHVybiBpZiBub3Qgc2VsZWN0ZWRMYXllciBvciBub3QgaG92ZXJlZExheWVyXG5cblx0XHRzID0gQGdldERpbWVuc2lvbnMoc2VsZWN0ZWRMYXllci5fZWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoaG92ZXJlZExheWVyLl9lbGVtZW50KVxuXHRcdGYgPSBAZ2V0RGltZW5zaW9ucyhGcmFtZXIuRGV2aWNlLnNjcmVlbi5fZWxlbWVudClcblxuXHRcdEBtYWtlRGFzaGVkTGluZXMocywgZiwgQHNlbGVjdGVkQ29sb3IsIDUpXG5cblx0XHRAbWFrZVJlY3RPdmVybGF5cyhzZWxlY3RlZExheWVyLCBzLCBob3ZlcmVkTGF5ZXIsIGgpXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBjb250YWlucyBob3ZlcmVkIGVsZW1lbnRcblxuXHRcdEByYXRpbyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdCMgc2V0IHRoZSBwYW5lbCB3aXRoIGN1cnJlbnQgcHJvcGVydGllc1xuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cblx0XHRsYXllciA9IEBzZWxlY3RlZExheWVyID8gQGhvdmVyZWRMYXllclxuXG5cdFx0aWYgbGF5ZXIgaXMgQGxhc3RMYXllciBhbmQgbGF5ZXIuaXNBbmltYXRpbmcgaXMgZmFsc2Vcblx0XHRcdHJldHVyblxuXG5cdFx0QGxhc3RMYXllciA9IGxheWVyXG5cdFx0QGxhc3RQcm9wcyA9IGxheWVyLnByb3BzXG5cdFx0XG5cdFx0IyBwcm9wZXJ0aWVzIHRvIGFzc2lnbmVkIHRvIGxheWVyLnByb3BzXG5cdFx0Y3VzdG9tUHJvcHMgPVxuXHRcdFx0eDogbGF5ZXIuc2NyZWVuRnJhbWUueFxuXHRcdFx0eTogbGF5ZXIuc2NyZWVuRnJhbWUueVxuXHRcdFx0Y29tcG9uZW50TmFtZTogbGF5ZXIuY29uc3RydWN0b3IubmFtZVxuXHRcdFx0Y29tcG9uZW50TmFtZXM6IEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50KVxuXHRcdFx0cGFyZW50TmFtZTogbGF5ZXIucGFyZW50Py5uYW1lXG5cdFx0XHRyb3RhdGlvbjogbGF5ZXIucm90YXRpb25aXG5cdFx0XHQjIHRleHRBbGlnbjogbGF5ZXIucHJvcHMuc3R5bGVkVGV4dE9wdGlvbnM/LmFsaWdubWVudFxuXHRcdFx0YmxlbmRpbmc6IGxheWVyLmJsZW5kaW5nXG5cdFx0XHQjIHNjcmVlbnNob3Q6IEBnZXRTY3JlZW5zaG90KGxheWVyLl9lbGVtZW50KVxuXHRcdFxuXHRcdGlmIGxheWVyLmdyYWRpZW50P1xuXHRcdFx0Xy5hc3NpZ24gY3VzdG9tUHJvcHMsXG5cdFx0XHRcdGdyYWRpZW50U3RhcnQ6IGxheWVyLmdyYWRpZW50LnN0YXJ0XG5cdFx0XHRcdGdyYWRpZW50RW5kOiBsYXllci5ncmFkaWVudC5lbmRcblx0XHRcdFx0Z3JhZGllbnRBbmdsZTogbGF5ZXIuZ3JhZGllbnQuYW5nbGVcblxuXHRcdGlmIGxheWVyLnNoYWRvd3M/XG5cdFx0XHRfLmFzc2lnbiBjdXN0b21Qcm9wcyxcblx0XHRcdFx0c2hhZG93WDogbGF5ZXIuc2hhZG93c1swXT8ueFxuXHRcdFx0XHRzaGFkb3dZOiBsYXllci5zaGFkb3dzWzBdPy55XG5cdFx0XHRcdHNoYWRvd1NwcmVhZDogbGF5ZXIuc2hhZG93c1swXT8uc3ByZWFkXG5cdFx0XHRcdHNoYWRvd0NvbG9yOiBsYXllci5zaGFkb3dzWzBdPy5jb2xvclxuXHRcdFx0XHRzaGFkb3dUeXBlOiBsYXllci5zaGFkb3dzWzBdPy50eXBlXG5cdFx0XHRcdHNoYWRvd0JsdXI6IGxheWVyLnNoYWRvd3NbMF0/LmJsdXJcblxuXHRcdEBzcGVjUGFuZWwuc2hvd1Byb3BlcnRpZXMobGF5ZXIsIGN1c3RvbVByb3BzKVxuXHRcdFxuXHRcdGV2ZW50TGlzdGVuZXJzID0gQGdldExheWVyRXZlbnRMaXN0ZW5lcnMobGF5ZXIpXG5cdFx0QHNwZWNQYW5lbC5jbGVhckNoaWxkcmVuVGhlblNob3dFdmVudExpc3RlbmVycyhldmVudExpc3RlbmVycylcblxuXHRcdGFuaW1hdGlvbnMgPSBsYXllci5hbmltYXRpb25zKClcblx0XHRAc3BlY1BhbmVsLmNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblxuXG5cdHNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdGxheWVyID0gQGdldExheWVyRnJvbUVsZW1lbnQoZXZlbnQ/LnRhcmdldClcblx0XHRyZXR1cm4gaWYgbm90IEBnZXRMYXllcklzVmlzaWJsZShsYXllcilcblx0XHRcdFxuXHRcdEBob3ZlcmVkTGF5ZXIgPSBsYXllclxuXG5cdFx0QHRyeUZvY3VzKGV2ZW50KVxuXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0dW5zZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRAaG92ZXJlZExheWVyID0gdW5kZWZpbmVkXG5cdFx0VXRpbHMuZGVsYXkgLjA1LCA9PlxuXHRcdFx0aWYgbm90IEBob3ZlcmVkTGF5ZXIgdGhlbiBAZm9jdXMoKVxuXG5cdHNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAaG92ZXJlZExheWVyXG5cblx0XHRpZiBAc2VsZWN0ZWRMYXllciBpcyBAaG92ZXJlZExheWVyXG5cdFx0XHRAdW5zZXRTZWxlY3RlZExheWVyKClcblx0XHRcdHJldHVyblxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSBAaG92ZXJlZExheWVyXG5cdFx0QGZvY3VzKClcblxuXHR1bnNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRAZm9jdXMoKVxuXG5cblx0IyBGaW5kIGFuIGVsZW1lbnQgdGhhdCBiZWxvbmdzIHRvIGEgRnJhbWVyIExheWVyXG5cdGZpbmRMYXllckVsZW1lbnQ6IChlbGVtZW50KSAtPlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudC5jbGFzc0xpc3RcblxuXHRcdGlmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcmFtZXJMYXllcicpXG5cdFx0XHRyZXR1cm4gZWxlbWVudFxuXG5cdFx0QGZpbmRMYXllckVsZW1lbnQoZWxlbWVudC5wYXJlbnROb2RlKVxuXG5cdCMgRmluZCBhIEZyYW1lciBMYXllciB0aGF0IG1hdGNoZXMgYSBGcmFtZXIgTGF5ZXIgZWxlbWVudFxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGVsZW1lbnQgPSBAZmluZExheWVyRWxlbWVudChlbGVtZW50KVxuXG5cdFx0bGF5ZXJzID0gXy5maWx0ZXIoRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnMsIChsKSAtPiBcblx0XHRcdGlmIGwuZ290Y2hhSWdub3JlXG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0KVxuXG5cdFx0bGF5ZXIgPSBfLmZpbmQobGF5ZXJzLCAobCkgLT4gbC5fZWxlbWVudCBpcyBlbGVtZW50KVxuXG5cdFx0cmV0dXJuIGxheWVyXG5cblxuXHRnZXRMYXllcklzVmlzaWJsZTogKGxheWVyKSA9PlxuXHRcdGlmIG5vdCBsYXllciBcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBAb25seVZpc2libGVcblx0XHRcdGlmIGxheWVyLm9wYWNpdHkgaXMgMFxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdFx0aWYgbGF5ZXIudmlzaWJsZSBpcyBmYWxzZVxuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0XG5cdFx0QGdldExheWVySXNWaXNpYmxlKGxheWVyLnBhcmVudClcblxuXHRnZXRMYXllckV2ZW50TGlzdGVuZXJzOiAobGF5ZXIpID0+XG5cblx0XHRsaXN0ZW5lcnMgPSBfLm1hcChsYXllci5fZXZlbnRzLCAoZXZzLCBsaXN0ZW5lciwgYykgLT5cblx0XHRcdGlmIG5vdCBfLmlzQXJyYXkoZXZzKSB0aGVuIGV2cyA9IFtldnNdXG5cdFx0XHRcblx0XHRcdHtcblx0XHRcdFx0bGlzdGVuZXI6IGxpc3RlbmVyXG5cdFx0XHRcdGV2ZW50czogXy5tYXAgZXZzLCAoZXYpIC0+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogZXYuZm4ubmFtZVxuXHRcdFx0XHRcdFx0ZnVuY3Rpb246IGV2LmZuLnRvU3RyaW5nKClcblx0XHRcdFx0XHRcdGNvbnRleHQ6IGV2LmNvbnRleHQgXG5cdFx0XHRcdFx0XHRvbmNlOiBldi5vbmNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdClcblxuXHRcdHJldHVybiBsaXN0ZW5lcnNcblxuXHRnZXRTY3JlZW5zaG90OiAoZWxlbWVudCkgPT5cblxuXHRcdGZvcmVpZ25PYmplY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdmb3JlaWduT2JqZWN0J1xuXG5cdFx0IyBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XG5cdFx0cmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRjdHggPSBAc3BlY1BhbmVsLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0ZGF0YSA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScje3JlY3Qud2lkdGh9JyBoZWlnaHQ9JyN7cmVjdC5oZWlnaHR9Jz5cIiArXG5cdFx0XHQnPGZvcmVpZ25PYmplY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPicgK1xuXHRcdFx0JzxkaXYgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+JyArXG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCArXG5cdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPC9mb3JlaWduT2JqZWN0PicgK1xuXHRcdFx0Jzwvc3ZnPidcblxuXHRcdERPTVVSTCA9IHdpbmRvdy5VUkwgb3Igd2luZG93LndlYmtpdFVSTCBvciB3aW5kb3dcblxuXHRcdHN2ZyA9IG5ldyBCbG9iKFtkYXRhXSwge3R5cGU6ICdpbWFnZS9zdmcreG1sJ30pXG5cdFx0dXJsID0gRE9NVVJMLmNyZWF0ZU9iamVjdFVSTChzdmcpXG5cdFx0QHNwZWNQYW5lbC5zY3JlZW5zaG90Qm94LnZhbHVlID0gdXJsXG5cblxuXHQjIEZpbmQgYSBub24tc3RhbmRhcmQgQ29tcG9uZW50IHRoYXQgaW5jbHVkZXMgYSBMYXllclxuXHRnZXRDb21wb25lbnRGcm9tTGF5ZXI6IChsYXllciwgbmFtZXMgPSBbXSkgPT5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiBuYW1lcy5qb2luKCcsICcpXG5cblx0XHRpZiBub3QgXy5pbmNsdWRlcyhbXCJMYXllclwiLCBcIlRleHRMYXllclwiLCBcIlNjcm9sbENvbXBvbmVudFwiXSwgbGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblx0XHRcdG5hbWVzLnB1c2gobGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblxuXHRcdEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50LCBuYW1lcylcblxuXG5cdCMgRGVsYXkgZm9jdXMgYnkgYSBzbWFsbCBhbW91bnQgdG8gcHJldmVudCBmbGFzaGluZ1xuXHR0cnlGb2N1czogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEBmb2N1c0VsZW1lbnQgPSBldmVudC50YXJnZXRcblx0XHRkbyAoZXZlbnQpID0+XG5cdFx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRcdGlmIEBmb2N1c0VsZW1lbnQgaXNudCBldmVudC50YXJnZXRcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XG5cdFx0XHRcdEBmb2N1cygpXG5cblx0IyBDaGFuZ2UgZm9jdXMgdG8gYSBuZXcgaG92ZXJlZCBvciBzZWxlY3RlZCBlbGVtZW50XG5cdGZvY3VzOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEB1bmZvY3VzKClcblxuXHRcdCMgQHNlbGVjdGVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRAaG92ZXJlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRob3ZlcmVkTGF5ZXIgPSBAaG92ZXJlZExheWVyID8gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRzZWxlY3RlZExheWVyID0gQHNlbGVjdGVkTGF5ZXIgPyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0aWYgc2VsZWN0ZWRMYXllciBpcyBob3ZlcmVkTGF5ZXJcblx0XHRcdGhvdmVyZWRMYXllciA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRpZiBob3ZlcmVkTGF5ZXIgaXMgc2VsZWN0ZWRMYXllclxuXHRcdFx0cmV0dXJuXG5cblx0XHRAc2hvd0Rpc3RhbmNlcyhzZWxlY3RlZExheWVyLCBob3ZlcmVkTGF5ZXIpXG5cdFx0QHNldFBhbmVsUHJvcGVydGllcyhzZWxlY3RlZExheWVyLCBob3ZlcmVkTGF5ZXIpXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdHN2Z0NvbnRleHQucmVtb3ZlQWxsKClcblxuXG4jIGtpY2tvZmZcblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAncENvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbnN2Z0NvbnRleHQgPSBuZXcgU1ZHQ29udGV4dFxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEWUEsSUFBQSwwUEFBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRWpDLElBQUcsa0JBQUg7RUFDQyxNQUFBLEdBQVMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFRLENBQUEsVUFBQTtFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBdkIsR0FBMEMsTUFBTSxDQUFDO0VBRWpELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxHQUEyQjtFQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQXBCLEdBQTZCLE9BTDlCOzs7QUFPQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUFBOztBQUVBLFVBQUEsR0FBYTs7QUFDYixTQUFBLEdBQVk7O0FBQ1osY0FBQSxHQUFpQjs7O0tBSWdDLENBQUUsU0FBUyxDQUFDLEdBQTdELENBQWlFLHFCQUFqRTs7OztBQW9CQTs7Ozs7Ozs7Ozs7O0FBZ0JNO0VBQ1Esb0JBQUMsT0FBRDtBQUNaLFFBQUE7O01BRGEsVUFBVTs7OztJQUN2QixJQUFDLENBQUEsYUFBRCxHQUFpQjtJQUVqQixJQUFDLENBQUEsTUFBRCxHQUFVO0lBRVYsVUFBQSxHQUFhO0lBR2IsS0FBQSxHQUFRO0lBR1IsYUFBQSxHQUFnQixTQUFD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QVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBbkI7WUFDQSxJQUFBLEVBQU0sVUFETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBbkI7WUFDQSxJQUFBLEVBQU0sWUFETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEs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
