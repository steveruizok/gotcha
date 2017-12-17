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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cbmRldmljZVR5cGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZVR5cGVcblxuaWYgZGV2aWNlVHlwZT8gXG5cdGRldmljZSA9IEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1tkZXZpY2VUeXBlXVxuXHRGcmFtZXIuRGV2aWNlLl9jb250ZXh0LmRldmljZVBpeGVsUmF0aW8gPSBkZXZpY2UuZGV2aWNlUGl4ZWxSYXRpb1xuXG5cdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IGRldmljZVR5cGVcblx0d2luZG93LmxvY2FsU3RvcmFnZS5kZXZpY2UgPSB1bmRlZmluZWRcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuc3RhcnRPcGVuID0gZmFsc2VcbmFjY29yZGlvbnNPcGVuID0gZmFsc2VcblxuIyBkZWJ1Z2dpbmdcblxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlUGhvbmUnKVswXT8uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBcdC5kODg4ODhiICBkUCAgICAgZFAgIC44ODg4OC4gICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiAgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICBcdGBZODg4ODhiLiA4OCAgICAuOFAgODggICAgICAgICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuICBcdCAgICAgIGA4YiA4OCAgICBkOCcgODggICBZUDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuICBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICBcdCBZODg4ODhQICA4ODg4ODgnICAgIGA4ODg4OCcgICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuICBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMjI1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBDb250ZXh0XG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKEBzdmcpXG5cdFx0QHN2Zy5zdHlsZVsnei1pbmRleCddID0gJzk5OSdcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbkJhY2tncm91bmQuX2VsZW1lbnRcblxuXHRcdEBzZXRDb250ZXh0KClcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdHNldEF0dHJpYnV0ZXM6IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRzZXRDb250ZXh0OiA9PlxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdEBzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRhZGRTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzaGFwZXMucHVzaChzaGFwZSlcblx0XHRAc2hvd1NoYXBlKHNoYXBlKVxuXHRcdFxuXHRyZW1vdmVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBoaWRlU2hhcGUoc2hhcGUpXG5cdFx0Xy5wdWxsKEBzaGFwZXMsIHNoYXBlKVxuXHRcdFxuXHRoaWRlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFxuXHRzaG93U2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLmFwcGVuZENoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0XG5cdGFkZERlZjogKGRlZikgLT5cblx0XHRAc3ZnRGVmcy5hcHBlbmRDaGlsZChkZWYpXG5cblx0cmVtb3ZlQWxsOiA9PlxuXHRcdGZvciBzaGFwZSBpbiBAc2hhcGVzXG5cdFx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0QHNoYXBlcyA9IFtdXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBTaGFwZVxuXG5jbGFzcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7dHlwZTogJ2NpcmNsZSd9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBwYXJlbnQgPSBzdmdDb250ZXh0XG5cdFx0XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFxuXHRcdFx0b3B0aW9ucy50eXBlXG5cdFx0XHQpXG5cblx0XHRAc2V0Q3VzdG9tUHJvcGVydHkoJ3RleHQnLCAndGV4dENvbnRlbnQnLCAndGV4dENvbnRlbnQnLCBvcHRpb25zLnRleHQpXG5cdFx0XHRcdFxuXHRcdCMgYXNzaWduIGF0dHJpYnV0ZXMgc2V0IGJ5IG9wdGlvbnNcblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cdFx0XHRAc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAcGFyZW50LmFkZFNoYXBlKEApXG5cdFx0XG5cdFx0QHNob3coKVxuXHRcdFx0XG5cdHNldEF0dHJpYnV0ZTogKGtleSwgdmFsdWUpID0+XG5cdFx0cmV0dXJuIGlmIGtleSBpcyAndGV4dCdcblx0XHRpZiBub3QgQFtrZXldP1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0Z2V0OiA9PlxuXHRcdFx0XHRcdHJldHVybiBAZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdFx0QGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XG5cdFx0QFtrZXldID0gdmFsdWVcblx0XG5cdHNldEN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCByZXR1cm5WYWx1ZSwgc2V0VmFsdWUsIHN0YXJ0VmFsdWUpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBlbGVtZW50W3NldFZhbHVlXSA9IHZhbHVlXG5cblx0XHRAW3ZhcmlhYmxlTmFtZV0gPSBzdGFydFZhbHVlXG5cblx0aGlkZTogLT4gXG5cdFx0QHBhcmVudC5oaWRlU2hhcGUoQClcblx0XG5cdHNob3c6IC0+IFxuXHRcdEBwYXJlbnQuc2hvd1NoYXBlKEApXG5cdFx0XG5cdHJlbW92ZTogLT5cblx0XHRAcGFyZW50LnJlbW92ZVNoYXBlKEApXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERhc2hlZCBMaW5lXG5cbmNsYXNzIERhc2hlZExpbmUgZXh0ZW5kcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKHBvaW50QSwgcG9pbnRCLCBjb2xvciA9ICcjMDAwJywgb2Zmc2V0ID0gMCwgb3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBLnh9ICN7cG9pbnRBLnl9IEwgI3twb2ludEIueH0gI3twb2ludEIueX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cdFx0XHQnc3Ryb2tlLWRhc2hhcnJheSc6IFwiNSwgNVwiXG5cdFx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQnOiBvZmZzZXRcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUGFuZWwgQ29tcG9uZW50c1xuXG5VdGlscy5pbnNlcnRDU1MgXCJcIlwiXG5cblx0LmxvZ28ge1xuXHRcdG9wYWNpdHk6IC40O1xuXHR9XG5cblx0LmxvZ286aG92ZXIge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0XG5cdCNsaW5rZWRpbl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDY4cHg7XG5cdH1cblxuXHRcblx0I3R3aXR0ZXJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogNHB4O1xuXHRcdHJpZ2h0OiA0cHg7XG5cdH1cblxuXHQjZ2l0aHViX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogMzZweDtcblx0fVxuXG5cdC5mcmFtZXJMYXllciB7IFxuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGwgIWltcG9ydGFudDsgXG5cdFx0fSBcblx0XG5cdC5JZ25vcmVQb2ludGVyRXZlbnRzIHtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0fVxuXG5cdC5kcm9wZG93biB7XG5cdFx0b3BhY2l0eTogMDtcblx0fVxuXG5cdCNwQ29udGFpbmVyIHtcblx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0cmlnaHQ6IDA7XG5cdFx0d2lkdGg6IDIyNHB4O1xuXHRcdGhlaWdodDogMTAwJTtcblx0XHRmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJztcblx0XHRmb250LXNpemU6IDExcHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMCwgMjAsIDIwLCAxLjAwMCk7XG5cdFx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCByZ2JhKDQ1LCA0NSwgNDUsIDEuMDAwKTtcblx0XHRwb2ludGVyLWV2ZW50czogYWxsO1xuXHRcdHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cdFx0Y3Vyc29yOiBkZWZhdWx0O1xuXHRcdG92ZXJmbG93OiBzY3JvbGw7XG5cdFx0cGFkZGluZy10b3A6IDhweDtcblx0fVxuXG5cdC5wRGl2IHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHR3aWR0aDogMTAwJTtcblx0fVxuXG5cdC5oaWRkZW4ge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdH1cblxuXHQucFJvdyB7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0aGVpZ2h0OiAzMnB4O1xuXHR9XG5cblx0LnBTcGFuIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Y29sb3I6ICM4ODg4ODg7XG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcblx0XHRsZXR0ZXItc3BhY2luZzogLjVweDtcblx0XHRwYWRkaW5nLWxlZnQ6IDhweDtcblx0XHRtYXJnaW4tdG9wOiAycHg7XG5cdH1cblxuXHQucExhYmVsIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dGV4dC1hbGlnbjogcmlnaHQ7XG5cdFx0Zm9udC1zaXplOiAxMHB4O1xuXHRcdHdpZHRoOiBub25lO1xuXHRcdG1hcmdpbi10b3A6IDJweDtcblx0XHRtYXJnaW4tcmlnaHQ6IDhweDtcblx0XHR6LWluZGV4OiAxMDtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcblx0fVxuXG5cdC5wUmFuZ2Uge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0bWFyZ2luLXRvcDogMTVweDtcblx0XHRtYXJnaW4tcmlnaHQ6IDRweDtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsgIC8qIE92ZXJyaWRlIGRlZmF1bHQgQ1NTIHN0eWxlcyAqL1xuXHRcdGFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0d2lkdGg6IDEwMCU7IFxuXHRcdGhlaWdodDogNHB4O1xuXHRcdGJhY2tncm91bmQ6ICMzMjMyMzI7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0XHRvcGFjaXR5OiAxO1xuXHR9XG5cblxuXHQucFJhbmdlOjotd2Via2l0LXNsaWRlci10aHVtYiB7XG5cdFx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcblx0XHRhcHBlYXJhbmNlOiBub25lO1xuXHRcdHdpZHRoOiAxNnB4O1xuXHRcdGhlaWdodDogMTZweDtcblx0XHRiYWNrZ3JvdW5kOiAjODg4ODg4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHR9XG5cblx0LnBSYW5nZTo6LW1vei1yYW5nZS10aHVtYiB7XG5cdFx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRcdHdpZHRoOiAxNnB4O1xuXHRcdGhlaWdodDogMTZweDtcblx0XHRiYWNrZ3JvdW5kOiAjODg4ODg4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHR9XG5cblx0LnBJbnB1dCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGNvbG9yOiAjNTU1NTU1O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogNHB4O1xuXHR9XG5cblx0LnBJbnB1dDpob3ZlciB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzQ4Y2ZmZjtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5yaWdodCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5sZWZ0IHtcblx0XHRyaWdodDogNzJweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5hbGlnbkxlZnQge1xuXHRcdHRleHQtYWxpZ246IGxlZnQ7XG5cdH1cblxuXHQuZnVsbCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogMTEycHg7XG5cdH1cblxuXHQucEltYWdlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRtYXJnaW4tbGVmdDogOHB4O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHR3aWR0aDogMTk2cHg7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IDRweCBzb2xpZCAjMjkyOTI5O1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAtNHB4O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0fVxuXG5cdC5wSW1hZ2U6aG92ZXIge1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICM0OGNmZmY7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdFx0b3V0bGluZTogMnB4IHNvbGlkICMyOTI5Mjk7XG5cdH1cblxuXHQucENvbG9yIHtcblx0XHRvdXRsaW5lOiA0cHggc29saWQgIzI5MjkyOTtcblx0XHRvdXRsaW5lLW9mZnNldDogLTRweDtcblx0fVxuXG5cdC5wQ29sb3I6aG92ZXIge1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCAjMjkyOTI5O1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHR9XG5cblx0LnBTZWxlY3Qge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiAxMjJweDtcblx0XHRjb2xvcjogIzU1NTU1NTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0fVxuXG5cdC5wRGl2aWRlciB7XG5cdFx0aGVpZ2h0OiAxcHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzAwMDtcblx0XHRtYXJnaW46IDE2cHggOHB4IDE2cHggOHB4O1xuXHR9XG5cblx0LnBBY2NvcmRpYW4ge1xuXHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRtaW4taGVpZ2h0OiAzMnB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxRDFEMUQ7XG5cdFx0bWFyZ2luLXRvcDogMTZweDtcblx0fVxuXG5cdC5wQWNjb3JkaWFuQm9keSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0bWFyZ2luLXRvcDogMzJweDtcblx0XHRwYWRkaW5nLXRvcDogNHB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG5cdH1cblxuXHQuYWN0aXZlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblxuXHQuaGFzVmFsdWUge1xuXHRcdGNvbG9yOiAjRkZGO1xuXHR9XG5cblx0LnNvY2lhbExpbmtzIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRib3R0b206IDBweDtcblx0XHRyaWdodDogMHB4O1xuXHRcdHBhZGRpbmctdG9wOiA0cHg7XG5cdFx0ei1pbmRleDogMTAwO1xuXHR9XG5cblx0LnN0cm9uZyB7XG5cdFx0Zm9udC13ZWlnaHQ6IDYwMDtcblx0fVxuXG5cIlwiXCJcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGl2XG5cbmNsYXNzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QHByb3BlcnRpZXMgPSBbXVxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2XCIpXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcInZpc2libGVcIixcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmlzaWJsZVxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF92aXNpYmxlXG5cblx0XHRcdFx0QF92aXNpYmxlID0gYm9vbFxuXG5cdFx0XHRcdGlmIGJvb2xcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUm93XG5cbmNsYXNzIHBSb3cgZXh0ZW5kcyBwRGl2XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGV4dDogJ0xhYmVsJ1xuXHRcdFx0Ym9sZDogZmFsc2VcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjaGlsZHJlbjogW11cblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJwRGl2XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBSb3dcIilcblxuXHRcdEBsYWJlbCA9IG5ldyBwU3BhblxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHRcblx0XHRcdGJvbGQ6IG9wdGlvbnMuYm9sZFxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsICdjb2xvcicsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAbGFiZWwuc3R5bGUuY29sb3Jcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAbGFiZWwuZWxlbWVudC5zdHlsZS5jb2xvciA9IHZhbHVlXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdmlkZXJcblxuY2xhc3MgcERpdmlkZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2aWRlclwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU3BhblxuXG5jbGFzcyBwU3BhblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHR0ZXh0OiAnaGVsbG8gd29ybGQnXG5cdFx0XHRib2xkOiBmYWxzZVxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFNwYW5cIilcblx0XHRAZWxlbWVudC50ZXh0Q29udGVudCA9IG9wdGlvbnMudGV4dFxuXG5cdFx0aWYgb3B0aW9ucy5ib2xkXG5cdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Ryb25nXCIpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3RleHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQGVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPiBAZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUmFuZ2VcblxuY2xhc3MgcFJhbmdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dmFsdWU6ICcnXG5cdFx0XHRtaW46ICcwJ1xuXHRcdFx0bWF4OiAnMTAwJ1xuXHRcdFx0dmFsdWU6ICcxMDAnXG5cdFx0XHRhY3Rpb246ICh2YWx1ZSkgPT4gbnVsbFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5cdFx0Xy5hc3NpZ24gQGVsZW1lbnQsXG5cdFx0XHR0eXBlOiAncmFuZ2UnXG5cdFx0XHRtaW46IG9wdGlvbnMubWluXG5cdFx0XHRtYXg6IG9wdGlvbnMubWF4XG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0YWN0aW9uOiBvcHRpb25zLmFjdGlvblxuXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBSYW5nZVwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRAZWxlbWVudC5vbmlucHV0ID0gPT4gQGFjdGlvbihAdmFsdWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0cHJvcExheWVycy5wdXNoKEApXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQGVsZW1lbnQudmFsdWVcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRhY3Rpb246IG9wdGlvbnMuYWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIExhYmVsXG5cbmNsYXNzIHBMYWJlbFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHRjbGFzc05hbWU6IG51bGxcblx0XHRcdHRleHQ6ICd4J1xuXHRcdFx0Zm9yOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwTGFiZWxcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXHRcdFxuXHRcdF8uYXNzaWduIEBlbGVtZW50LFxuXHRcdFx0dGV4dENvbnRlbnQ6IG9wdGlvbnMudGV4dFxuXHRcdFx0Zm9yOiBvcHRpb25zLmZvclxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgSW5wdXRcblxuY2xhc3MgcElucHV0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dmFsdWU6ICcnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcnXG5cdFx0XHRpc0RlZmF1bHQ6IHRydWVcblx0XHRcdHNlY3Rpb246IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBJbnB1dFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0b3B0aW9ucy5zZWN0aW9uPy5wcm9wZXJ0aWVzLnB1c2goQClcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25zLmNsYXNzTmFtZVxuXHRcdFx0dGV4dDogb3B0aW9ucy51bml0XG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRwcm9wTGF5ZXJzLnB1c2goQClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCdkZWZhdWx0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfZGVmYXVsdFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfZGVmYXVsdCA9IHZhbHVlXG5cblx0XHRAZGVmYXVsdCA9IG9wdGlvbnMuZGVmYXVsdCA/ICcnXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRpZiBub3QgdmFsdWU/IG9yIHZhbHVlIGlzIFwiXCIgb3IgdmFsdWUgaXMgXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdHZhbHVlID0gU3RyaW5nKEBkZWZhdWx0KVxuXG5cdFx0XHRcdEBlbGVtZW50LnZhbHVlID0gdmFsdWUgPyBcIlwiXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCBub3QgQGlzRGVmYXVsdCBhbmQgdmFsdWUgaXNudCBcIlwiXG5cdFx0XHRcdFx0IyBAc2VjdGlvbj8uY29sb3IgPSAnI0ZGRidcblx0XHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHRydWVcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCdpc0RlZmF1bHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9pc0RlZmF1bHRcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdEBfaXNEZWZhdWx0ID0gYm9vbFxuXG5cdFx0XHRcdGlmIGJvb2xcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoYXNWYWx1ZScpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0QC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhc1ZhbHVlJylcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0ZGVmYXVsdDogb3B0aW9ucy5kZWZhdWx0XG5cdFx0XHRzZWN0aW9uOiBvcHRpb25zLnNlY3Rpb25cblx0XHRcdGlzRGVmYXVsdDogb3B0aW9ucy5pc0RlZmF1bHRcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgSW1hZ2VcblxuY2xhc3MgcEltYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHR2YWx1ZTogJydcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRzZWN0aW9uOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicEltYWdlXCIpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0b3B0aW9ucy5zZWN0aW9uPy5wcm9wZXJ0aWVzLnB1c2goQClcblxuXHRcdHByb3BMYXllcnMucHVzaChAKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlID0gJycpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zcmMgPSB2YWx1ZVxuXHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHZhbHVlIGlzbnQgJydcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIENvbG9yIEJveFxuXG5jbGFzcyBwQ29sb3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnIzI5MjkyOSdcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQ29sb3InKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0b3B0aW9ucy5zZWN0aW9uPy5wcm9wZXJ0aWVzLnB1c2goQClcblxuXHRcdHByb3BMYXllcnMucHVzaChAKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXG5cdFx0XHRcdGlmIHZhbHVlPy5jb2xvciBpcyAndHJhbnNwYXJlbnQnXG5cdFx0XHRcdFx0dmFsdWUgPSBudWxsXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB0cnVlXG5cblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlID8gJydcblx0XHRcdFx0QGVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHZhbHVlID8gJ25vbmUnXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRzZWN0aW9uOiBvcHRpb25zLnNlY3Rpb25cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU2VsZWN0XG5cbmNsYXNzIHBTZWxlY3Rcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0c2VsZWN0ZWQ6IDBcblx0XHRcdG9wdGlvbnM6IFsncmVkJywgJ3doaXRlJywgJ2JsdWUnXVxuXHRcdFx0Y2FsbGJhY2s6ICh2YWx1ZSkgLT4gbnVsbFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwU2VsZWN0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzVmFsdWUnKVxuXG5cdFx0QHVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRwYXJlbnQ6IG9wdGlvbnMucGFyZW50XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHRleHQ6ICfilr4nXG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQnb3B0aW9ucycsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX29wdGlvbnNcblx0XHRcdHNldDogKGFycmF5KSAtPlxuXHRcdFx0XHRAX29wdGlvbnMgPSBhcnJheVxuXHRcdFx0XHRAbWFrZU9wdGlvbnMoKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQnc2VsZWN0ZWQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9zZWxlY3RlZFxuXHRcdFx0c2V0OiAobnVtKSAtPlxuXHRcdFx0XHRAX3NlbGVjdGVkID0gbnVtXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0X29wdGlvbnM6IFtdXG5cdFx0XHRfb3B0aW9uRWxlbWVudHM6IFtdXG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLm9wdGlvbnNcblx0XHRcdGNhbGxiYWNrOiBvcHRpb25zLmNhbGxiYWNrXG5cdFx0XHRzZWxlY3RlZDogb3B0aW9ucy5zZWxlY3RlZFxuXG5cdFx0QGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IG9wdGlvbnMuc2VsZWN0ZWRcblxuXHRcdEBlbGVtZW50Lm9uY2hhbmdlID0gPT4gXG5cdFx0XHRAc2VsZWN0ZWQgPSBAZWxlbWVudC5zZWxlY3RlZEluZGV4XG5cdFx0XHRAY2FsbGJhY2soQGVsZW1lbnQuc2VsZWN0ZWRJbmRleClcblx0XHRcblxuXHRtYWtlT3B0aW9uczogPT5cblx0XHRmb3Igb3B0aW9uLCBpIGluIEBfb3B0aW9uRWxlbWVudHNcblx0XHRcdEBlbGVtZW50LnJlbW92ZUNoaWxkKG9wdGlvbilcblxuXHRcdEBfb3B0aW9uRWxlbWVudHMgPSBbXVxuXG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBAb3B0aW9uc1xuXHRcdFx0byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG5cdFx0XHRvLnZhbHVlID0gb3B0aW9uXG5cdFx0XHRvLmxhYmVsID0gb3B0aW9uXG5cdFx0XHRvLmlubmVySFRNTCA9IG9wdGlvblxuXHRcdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQobylcblxuXHRcdFx0QF9vcHRpb25FbGVtZW50cy5wdXNoKG8pXG5cblx0XHRcdGlmIGkgaXMgQHNlbGVjdGVkXG5cdFx0XHRcdEB2YWx1ZSA9IEBlbGVtZW50Lm9wdGlvbnNbQGVsZW1lbnQuc2VsZWN0ZWRJbmRleF0ubGFiZWxcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgQWNjb3JkaWFuXG5cbmNsYXNzIHBBY2NvcmRpYW4gZXh0ZW5kcyBwUm93XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BBY2NvcmRpYW4nKVxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBAdG9nZ2xlXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dG9nZ2xlZDogZmFsc2VcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHRleHQ6ICfilr8nXG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRAYm9keSA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6ICcnXG5cdFx0QGJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChAYm9keS5sYWJlbC5lbGVtZW50KVxuXG5cdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQoQGJvZHkuZWxlbWVudClcblx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BBY2NvcmRpYW5Cb2R5JylcblxuXHRcdEBib2R5LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXZlbnQpIC0+IFxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdGlmIGFjY29yZGlvbnNPcGVuIHRoZW4gQHRvZ2dsZSgpICMgc3RhcnQgb3BlblxuXG5cdHRvZ2dsZTogPT5cblx0XHRAdG9nZ2xlZCA9ICFAdG9nZ2xlZFxuXG5cdFx0aWYgQHRvZ2dsZWRcblx0XHRcdEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcblx0XHRcdEB1bml0LmVsZW1lbnQudGV4dENvbnRlbnQgPSAn4pa+J1xuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJylcblx0XHRcdEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcblx0XHRcdEB1bml0LmVsZW1lbnQudGV4dENvbnRlbnQgPSAn4pa/J1xuXG5cbiMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiBcdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4gXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiBcdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiAgICBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG4gXHQgICAgICBgOGIgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiAgICAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG4gXHRkOCcgICAuOFAgODguICAuODggODguICAuLi4gODguICAuLi4gICAgIDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OFxuIFx0IFk4ODg4OFAgIDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4OFAnICAgICBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcbiBcdCAgICAgICAgICA4OFxuIFx0ICAgICAgICAgIGRQXG5cbiMjI1xuXG5jbGFzcyBTcGVjUGFuZWxcblx0Y29uc3RydWN0b3I6IC0+XG5cblx0XHRAZWxlbWVudCA9IHBhbmVsXG5cdFx0QHByb3BMYXllcnMgPSBbXVxuXHRcdEBfcHJvcHMgPSB7fVxuXHRcdEBmcmFtZSA9IEBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0QGRlZmF1bHRzID0gRnJhbWVyLkRldmljZS5zY3JlZW4uX3Byb3BlcnR5TGlzdCgpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdwcm9wcycsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiBAX3Byb3BzXG5cdFx0XHRzZXQ6IChvYmopIC0+XG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdFx0XHRcdGlmIF8uaGFzKEBwcm9wcywga2V5KVxuXHRcdFx0XHRcdFx0QHByb3BzW2tleV0gPSB2YWx1ZVxuXG5cdFx0QGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGlmIHN0YXJ0T3BlbiB0aGVuICcxJyBlbHNlICcwJ1xuXHRcdEBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZGV2aWNlXG5cblx0XHQjIFNldCBEZXZpY2UgT3B0aW9uc1xuXG5cdFx0ZGV2aWNlT3B0aW9ucyA9IFsnZnVsbHNjcmVlbiddXG5cdFx0Y3VycmVudFNlbGVjdGVkID0gdW5kZWZpbmVkXG5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBGcmFtZXIuRGV2aWNlQ29tcG9uZW50LkRldmljZXNcblx0XHRcdGlmIF8uZW5kc1dpdGgoa2V5LCAnaGFuZCcpXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGlmIG5vdCB2YWx1ZS5taW5TdHVkaW9WZXJzaW9uP1xuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRpZiBVdGlscy5mcmFtZXJTdHVkaW9WZXJzaW9uKCkgPiB2YWx1ZS5tYXhTdHVkaW9WZXJzaW9uXG5cdFx0XHRcdGNvbnRpbnVlIFxuXG5cdFx0XHRpZiBVdGlscy5mcmFtZXJTdHVkaW9WZXJzaW9uKCkgPCB2YWx1ZS5taW5TdHVkaW9WZXJzaW9uXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGRldmljZU9wdGlvbnMucHVzaCAoa2V5KVxuXG5cdFx0XHRpZiBrZXkgaXMgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHRcdGN1cnJlbnRTZWxlY3RlZCA9IGRldmljZU9wdGlvbnMubGVuZ3RoIC0gMVxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGZyYW1lciBzZXR0aW5nc1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGRldmljZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdEZXZpY2UnXG5cblx0XHRAZGV2aWNlQm94ID0gbmV3IHBTZWxlY3Rcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0b3B0aW9uczogZGV2aWNlT3B0aW9uc1xuXHRcdFx0c2VsZWN0ZWQ6IGN1cnJlbnRTZWxlY3RlZFxuXHRcdFx0Y2FsbGJhY2s6IChpbmRleCkgPT5cblx0XHRcdFx0ZGV2aWNlVHlwZSA9IGRldmljZU9wdGlvbnNbaW5kZXhdXG5cdFx0XHRcdGRldmljZSA9IEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1tkZXZpY2VUeXBlXVxuXHRcdFx0XHRcblx0XHRcdFx0Xy5hc3NpZ24gd2luZG93LmxvY2FsU3RvcmFnZSxcblx0XHRcdFx0XHRkZXZpY2VUeXBlOiBkZXZpY2VUeXBlXG5cdFx0XHRcdFx0ZGV2aWNlOiBkZXZpY2Vcblx0XHRcdFx0XHRiZzogU2NyZWVuLmJhY2tncm91bmRDb2xvclxuXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGFuaW1hdGlvbiBzcGVlZFxuXG5cdFx0QHNwZWVkUm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdTcGVlZCAxMDAlJ1xuXG5cdFx0bWlucCA9IHBhcnNlSW50KDAsIDEwKVxuXHRcdG1heHAgPSBwYXJzZUludCgxMDAsIDEwKVxuXHRcdFxuXHRcdG1pbnYgPSBNYXRoLmxvZygwLjAwMDAxKVxuXHRcdG1heHYgPSBNYXRoLmxvZygwLjAxNjY2NjY2NjY3KVxuXG5cdFx0dlNjYWxlID0gKG1heHYtbWludikgLyAobWF4cC1taW5wKVxuXG5cdFx0QHNwZWVkQm94ID0gbmV3IHBSYW5nZVxuXHRcdFx0cGFyZW50OiBAc3BlZWRSb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0YWN0aW9uOiAodmFsdWUpID0+XG5cblx0XHRcdFx0ZGVsdGEgPSBNYXRoLmV4cChtaW52ICsgdlNjYWxlKih2YWx1ZS1taW5wKSlcblx0XHRcdFx0cmF0ZSA9IChkZWx0YS8oMS82MCkpKjEwMFxuXHRcdFx0XHRzcGFjZXMgPSBpZiByYXRlIDwgMSB0aGVuIDIgZWxzZSBpZiByYXRlIDwgMTAgdGhlbiAxIGVsc2UgMFxuXG5cdFx0XHRcdEBzcGVlZFJvdy5sYWJlbC50ZXh0ID0gJ1NwZWVkICcgKyByYXRlLnRvRml4ZWQoc3BhY2VzKSArICclJ1xuXG5cdFx0XHRcdEZyYW1lci5Mb29wLmRlbHRhID0gZGVsdGFcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBsYXllciBkZXRhaWxzXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblxuXHRcdEBuYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cblx0XHRAY29tcG9uZW50TmFtZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBjb21wb25lbnROYW1lc1JvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUGFydCBvZidcblxuXHRcdEBjb21wb25lbnROYW1lc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogQGNvbXBvbmVudE5hbWVzUm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvbiBkZXRhaWxzXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdQb3NpdGlvbidcblxuXHRcdEB4Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNpemVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblxuXHRcdEB3aWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdEBoZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdoJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJhY2tncm91bmQgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnQmFja2dyb3VuZCdcblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmFkaWVudFxuXG5cdFx0QGdyYWRpZW50UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnR3JhZGllbnQnXG5cblx0XHRAZ3JhZGllbnRTdGFydEJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0QGdyYWRpZW50RW5kQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50IGFuZ2xlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGdyYWRpZW50QW5nbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdhJ1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIG9wYWNpdHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblxuXHRcdEBvcGFjaXR5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRuZXcgcERpdmlkZXJcblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBib3JkZXIgcHJvcGVydGllc1xuXG5cdFx0QGJvcmRlclByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHRwYXJlbnQ6IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHRAYm9yZGVyQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBib3JkZXJXaWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXHRcdFx0c2VjdGlvbjogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByYWRpdXNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0cGFyZW50OiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0QGJvcmRlclJhZGl1c0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2hhZG93XG5cblxuXHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXG5cdFx0QHNoYWRvd0NvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QHNoYWRvd1NwcmVhZEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAncydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAc2hhZG93WUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93Qmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdiJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdGV4dCBzdHlsZXNcblxuXHRcdEB0ZXh0UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZm9udCBmYW1pbHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cblx0XHRAZm9udEZhbWlseUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGNvbG9yXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdDb2xvcidcblxuXHRcdEBjb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGZvbnRTaXplQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHdlaWdodFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3R5bGUnXG5cblx0XHRAZm9udFN0eWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRAZm9udFdlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYWxpZ25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0FsaWduJ1xuXG5cdFx0QHRleHRBbGlnbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJ2xlZnQnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc3BhY2luZ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3BhY2luZydcblxuXHRcdEBsZXR0ZXJTcGFjaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdsdCdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0QGxpbmVIZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdsbidcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdUZXh0J1xuXG5cdFx0QHRleHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRyYW5zZm9ybSBwcm9wZXJ0aWVzXG5cblxuXHRcdEB0cmFuc2Zvcm1zRGl2ID0gbmV3IHBEaXZcblxuXHRcdEB0cmFuc2Zvcm1zQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnVHJhbnNmb3Jtcydcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNEaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNjYWxlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NjYWxlJ1xuXG5cdFx0QHNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2NhbGVYQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMSdcblxuXHRcdEBzY2FsZVlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByb3RhdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdSb3RhdGUnXG5cblx0XHRAcm90YXRpb25Cb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEByb3RhdGlvblhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0QHJvdGF0aW9uWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgb3JpZ2luXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ09yaWdpbidcblxuXHRcdEBvcmlnaW5YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMC41MCdcblxuXHRcdEBvcmlnaW5ZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzAuNTAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2tld1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTa2V3J1xuXG5cdFx0QHNrZXdCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBza2V3WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAc2tld1lCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwZXJzcGVjdGl2ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdQZXJzcGVjdGl2ZSdcblxuXHRcdEBwZXJzcGVjdGl2ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGZpbHRlcnMgcHJvcGVydGllc1xuXG5cdFx0QGZpbHRlcnNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGZpbHRlcnNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblx0XHRcdHRleHQ6ICdGaWx0ZXJzJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJsdXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQmx1cidcblxuXHRcdEBibHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJyaWdodG5lc3NcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQnJpZ2h0bmVzcydcblxuXHRcdEBicmlnaHRuZXNzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29udHJhc3RcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQ29udHJhc3QnXG5cblx0XHRAY29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmF5c2NhbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnR3JheXNjYWxlJ1xuXG5cdFx0QGdyYXlzY2FsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBodWVyb3RhdGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGh1ZVJvdGF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBpbnZlcnRcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnSW52ZXJ0J1xuXG5cdFx0QGludmVydEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzYXR1cmF0ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTYXR1cmF0ZSdcblxuXHRcdEBzYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNlcGlhXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NlcGlhJ1xuXG5cdFx0QHNlcGlhQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBlbmQgZmlsdGVyc1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZWZmZWN0cyBwcm9wZXJ0aWVzXG5cblxuXHRcdEBlZmZlY3RzRGl2ID0gbmV3IHBEaXZcblxuXHRcdEBlZmZlY3RzQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnRWZmZWN0cydcblx0XHRcdHBhcmVudDogQGVmZmVjdHNEaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJhY2tncm91bmQgZmlsdGVyc1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCbGVuZGluZydcblxuXHRcdEBibGVuZGluZ0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnbm9ybWFsJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCbHVyJ1xuXG5cdFx0QGJhY2tncm91bmRCbHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYmFja2dyb3VuZEJyaWdodG5lc3NCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTYXR1cmF0ZSdcblxuXHRcdEBiYWNrZ3JvdW5kU2F0dXJhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdodWVSb3RhdGUnXG5cblx0XHRAYmFja2dyb3VuZEh1ZVJvdGF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdDb250cmFzdCdcblxuXHRcdEBiYWNrZ3JvdW5kQ29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdJbnZlcnQnXG5cblx0XHRAYmFja2dyb3VuZEludmVydEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdHcmF5c2NhbGUnXG5cblx0XHRAYmFja2dyb3VuZEdyYXlzY2FsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBiYWNrZ3JvdW5kU2VwaWFCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGFuaW1hdGlvbiBwcm9wZXJ0aWVzXG5cblxuXHRcdEBhbmltc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAYW5pbXNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdBbmltYXRpb25zJ1xuXHRcdFx0cGFyZW50OiBAYW5pbXNEaXZcblxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZXZlbnQgbGlzdGVuZXIgcHJvcGVydGllc1xuXG5cblx0XHRAZXZlbnRMaXN0ZW5lcnNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnRXZlbnQgTGlzdGVuZXJzJ1xuXHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNEaXZcblxuXG5cblx0XHQjIGltYWdlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAaW1hZ2VQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0cGFyZW50OiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW1hZ2VcblxuXHRcdEBpbWFnZUJveCA9IG5ldyBwSW1hZ2Vcblx0XHRcdHBhcmVudDogQGltYWdlUHJvcGVydGllc0RpdlxuXHRcdFx0c2VjdGlvbjogQGltYWdlUHJvcGVydGllc0RpdlxuXG5cblx0XHQjIHNjcmVlbnNob3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAc2NyZWVuc2hvdERpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2NyZWVuc2hvdFxuXG5cdFx0QHNjcmVlbnNob3RCb3ggPSBuZXcgcEltYWdlXG5cdFx0XHRwYXJlbnQ6IEBzY3JlZW5zaG90RGl2XG5cdFx0XHRzZWN0aW9uOiBAc2NyZWVuc2hvdERpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcGxhY2Vob2xkZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJydcblx0XHRyb3cuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnNjRweCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzb2NpYWwgbWVkaWEgbGlua3NcblxuXHRcdEBzb2NpYWxNZWRpYVJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0Rpdi5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGxpbmtlZGluSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEBsaW5rZWRpbkljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly93d3cubGlua2VkaW4uY29tL2luL3N0ZXZlcnVpem9rXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGlkPVwibGlua2VkaW5fbG9nb1wiIGNsYXNzPVwibG9nb1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5IDBoLTE0Yy0yLjc2MSAwLTUgMi4yMzktNSA1djE0YzAgMi43NjEgMi4yMzkgNSA1IDVoMTRjMi43NjIgMCA1LTIuMjM5IDUtNXYtMTRjMC0yLjc2MS0yLjIzOC01LTUtNXptLTExIDE5aC0zdi0xMWgzdjExem0tMS41LTEyLjI2OGMtLjk2NiAwLTEuNzUtLjc5LTEuNzUtMS43NjRzLjc4NC0xLjc2NCAxLjc1LTEuNzY0IDEuNzUuNzkgMS43NSAxLjc2NC0uNzgzIDEuNzY0LTEuNzUgMS43NjR6bTEzLjUgMTIuMjY4aC0zdi01LjYwNGMwLTMuMzY4LTQtMy4xMTMtNCAwdjUuNjA0aC0zdi0xMWgzdjEuNzY1YzEuMzk2LTIuNTg2IDctMi43NzcgNyAyLjQ3NnY2Ljc1OXpcIi8+PC9zdmc+J1xuXG5cdFx0QGdpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAZ2l0aHViSWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL2dpdGh1Yi5jb20vc3RldmVydWl6b2svZ290Y2hhXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgaGVpZ2h0PVwiMjBweFwiIHdpZHRoPVwiMjBweFwiIGlkPVwiZ2l0aHViX2xvZ29cIiBjbGFzcz1cImxvZ29cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIj48cGF0aCBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiBkPVwiTTUxMiAwQzIyOS4yNSAwIDAgMjI5LjI1IDAgNTEyYzAgMjI2LjI1IDE0Ni42ODggNDE4LjEyNSAzNTAuMTU2IDQ4NS44MTIgMjUuNTk0IDQuNjg4IDM0LjkzOC0xMS4xMjUgMzQuOTM4LTI0LjYyNSAwLTEyLjE4OC0wLjQ2OS01Mi41NjItMC43MTktOTUuMzEyQzI0MiA5MDguODEyIDIxMS45MDYgODE3LjUgMjExLjkwNiA4MTcuNWMtMjMuMzEyLTU5LjEyNS01Ni44NDQtNzQuODc1LTU2Ljg0NC03NC44NzUtNDYuNTMxLTMxLjc1IDMuNTMtMzEuMTI1IDMuNTMtMzEuMTI1IDUxLjQwNiAzLjU2MiA3OC40NyA1Mi43NSA3OC40NyA1Mi43NSA0NS42ODggNzguMjUgMTE5Ljg3NSA1NS42MjUgMTQ5IDQyLjUgNC42NTQtMzMgMTcuOTA0LTU1LjYyNSAzMi41LTY4LjM3NUMzMDQuOTA2IDcyNS40MzggMTg1LjM0NCA2ODEuNSAxODUuMzQ0IDQ4NS4zMTJjMC01NS45MzggMTkuOTY5LTEwMS41NjIgNTIuNjU2LTEzNy40MDYtNS4yMTktMTMtMjIuODQ0LTY1LjA5NCA1LjA2Mi0xMzUuNTYyIDAgMCA0Mi45MzgtMTMuNzUgMTQwLjgxMiA1Mi41IDQwLjgxMi0xMS40MDYgODQuNTk0LTE3LjAzMSAxMjguMTI1LTE3LjIxOSA0My41IDAuMTg4IDg3LjMxMiA1Ljg3NSAxMjguMTg4IDE3LjI4MSA5Ny42ODgtNjYuMzEyIDE0MC42ODgtNTIuNSAxNDAuNjg4LTUyLjUgMjggNzAuNTMxIDEwLjM3NSAxMjIuNTYyIDUuMTI1IDEzNS41IDMyLjgxMiAzNS44NDQgNTIuNjI1IDgxLjQ2OSA1Mi42MjUgMTM3LjQwNiAwIDE5Ni42ODgtMTE5Ljc1IDI0MC0yMzMuODEyIDI1Mi42ODggMTguNDM4IDE1Ljg3NSAzNC43NSA0NyAzNC43NSA5NC43NSAwIDY4LjQzOC0wLjY4OCAxMjMuNjI1LTAuNjg4IDE0MC41IDAgMTMuNjI1IDkuMzEyIDI5LjU2MiAzNS4yNSAyNC41NjJDODc3LjQzOCA5MzAgMTAyNCA3MzguMTI1IDEwMjQgNTEyIDEwMjQgMjI5LjI1IDc5NC43NSAwIDUxMiAwelwiIC8+PC9zdmc+J1xuXG5cdFx0QHR3aXR0ZXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQHR3aXR0ZXJJY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vdHdpdHRlci5jb20vc3RldmVydWl6b2tcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyOHB4XCIgd2lkdGg9XCIyOHB4XCIgaWQ9XCJ0d2l0dGVyX2xvZ29cIiBjbGFzcz1cImxvZ29cIiBkYXRhLW5hbWU9XCJMb2dvIOKAlCBGSVhFRFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9LmNscy0ye2ZpbGw6cmdiYSg5MSwgOTEsIDkxLCAxLjAwMCk7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Ud2l0dGVyX0xvZ29fQmx1ZTwvdGl0bGU+PHJlY3QgY2xhc3M9XCJjbHMtMVwiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiNDAwXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTJcIiBkPVwiTTE1My42MiwzMDEuNTljOTQuMzQsMCwxNDUuOTQtNzguMTYsMTQ1Ljk0LTE0NS45NCwwLTIuMjIsMC00LjQzLS4xNS02LjYzQTEwNC4zNiwxMDQuMzYsMCwwLDAsMzI1LDEyMi40N2ExMDIuMzgsMTAyLjM4LDAsMCwxLTI5LjQ2LDguMDcsNTEuNDcsNTEuNDcsMCwwLDAsMjIuNTUtMjguMzcsMTAyLjc5LDEwMi43OSwwLDAsMS0zMi41NywxMi40NSw1MS4zNCw1MS4zNCwwLDAsMC04Ny40MSw0Ni43OEExNDUuNjIsMTQ1LjYyLDAsMCwxLDkyLjQsMTA3LjgxYTUxLjMzLDUxLjMzLDAsMCwwLDE1Ljg4LDY4LjQ3QTUwLjkxLDUwLjkxLDAsMCwxLDg1LDE2OS44NmMwLC4yMSwwLC40MywwLC42NWE1MS4zMSw1MS4zMSwwLDAsMCw0MS4xNSw1MC4yOCw1MS4yMSw1MS4yMSwwLDAsMS0yMy4xNi44OCw1MS4zNSw1MS4zNSwwLDAsMCw0Ny45MiwzNS42MiwxMDIuOTIsMTAyLjkyLDAsMCwxLTYzLjcsMjJBMTA0LjQxLDEwNC40MSwwLDAsMSw3NSwyNzguNTVhMTQ1LjIxLDE0NS4yMSwwLDAsMCw3OC42MiwyM1wiLz48L3N2Zz4nXG5cblx0XHRmb3IgZWxlbWVudCBpbiBbQGxpbmtlZGluSWNvbiwgQGdpdGh1Ykljb24sIEB0d2l0dGVySWNvbl1cblx0XHRcdEBzb2NpYWxNZWRpYVJvdy5lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpXG5cdFx0XHRAc29jaWFsTWVkaWFSb3cuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzb2NpYWxMaW5rcycpXG5cblx0XHRAaGlkZURpdnMoKVxuXG5cdGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnM6IChhbmltYXRpb25zKSA9PlxuXHRcdGNoaWxkID0gQGFuaW1zQWNjby5ib2R5LmVsZW1lbnQuY2hpbGROb2Rlc1swXVxuXG5cdFx0aWYgbm90IGNoaWxkP1xuXHRcdFx0QHNob3dBbmltYXRpb25zKGFuaW1hdGlvbnMpXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBhbmltc0FjY28uYm9keS5lbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkKVxuXHRcdEBjbGVhckNoaWxkcmVuVGhlblNob3dBbmltYXRpb25zKGFuaW1hdGlvbnMpXG5cblx0Y2xlYXJDaGlsZHJlblRoZW5TaG93RXZlbnRMaXN0ZW5lcnM6IChldmVudExpc3RlbmVycykgPT5cblxuXHRcdGNoaWxkID0gQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5LmVsZW1lbnQuY2hpbGROb2Rlc1swXVxuXG5cdFx0aWYgbm90IGNoaWxkP1xuXHRcdFx0QHNob3dFdmVudExpc3RlbmVycyhldmVudExpc3RlbmVycylcblx0XHRcdHJldHVyblxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG5cdFx0QGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzKGV2ZW50TGlzdGVuZXJzKVxuXG5cdHNob3dFdmVudExpc3RlbmVyczogKGV2ZW50TGlzdGVuZXJzID0gW10pID0+XG5cblx0XHRkZWZhdWx0cyA9IFtcblx0XHRcdFwiZnVuY3Rpb24gKCl7cmV0dXJuIGZuLmFwcGx5KG1lLGFyZ3VtZW50cyl9XCIsIFxuXHRcdFx0XCJmdW5jdGlvbiAoKXtyZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyl9XCIsIFxuXHRcdFx0XCJmdW5jdGlvbiAoZXZlbnQpe3JldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVwiLFxuXHRcdFx0XCJmdW5jdGlvbiAoKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9XCIsXG5cdFx0XHQnZnVuY3Rpb24gZGVib3VuY2VkKCl7dmFyIHRpbWU9bm93KCksaXNJbnZva2luZz1zaG91bGRJbnZva2UodGltZSk7aWYobGFzdEFyZ3M9YXJndW1lbnRzLGxhc3RUaGlzPXRoaXMsbGFzdENhbGxUaW1lPXRpbWUsaXNJbnZva2luZyl7aWYodGltZXJJZD09PXVuZGVmaW5lZClyZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtpZihtYXhpbmcpcmV0dXJuIHRpbWVySWQ9c2V0VGltZW91dCh0aW1lckV4cGlyZWQsd2FpdCksaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpfXJldHVybiB0aW1lcklkPT09dW5kZWZpbmVkJiYodGltZXJJZD1zZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCx3YWl0KSkscmVzdWx0fScsXG5cdFx0XHQnZnVuY3Rpb24gKHZhbHVlKXtpZihudWxsIT09dmFsdWUpcmV0dXJuXCJmb250U2l6ZVwiIT09cHJvcGVydHkmJlwiZm9udFwiIT09cHJvcGVydHkmJl90aGlzLl9zdHlsZWRUZXh0LnJlc2V0U3R5bGUocHJvcGVydHkpLF90aGlzLnJlbmRlclRleHQoKX0nLFxuXHRcdF1cblxuXHRcdHJlYWxMaXN0ZW5lcnMgPSAwXG5cblx0XHRmb3IgbGlzdGVuZXIsIGkgaW4gZXZlbnRMaXN0ZW5lcnNcblxuXHRcdFx0Y29udGludWUgaWYgXy5ldmVyeShsaXN0ZW5lci5ldmVudHMsIChlKSAtPiBfLmluY2x1ZGVzKGRlZmF1bHRzLCBlLmZ1bmN0aW9uKSlcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBsaXN0ZW5lclxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnXCInICsgbGlzdGVuZXIubGlzdGVuZXIgKyAnXCInXG5cdFx0XHRcdGJvbGQ6IHRydWVcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBldmVudHNcblxuXHRcdFx0Zm9yIGV2ZW50LCBlIGluIGxpc3RlbmVyLmV2ZW50c1xuXG5cdFx0XHRcdGNvbnRpbnVlIGlmIF8uaW5jbHVkZXMoZGVmYXVsdHMsIGV2ZW50LmZ1bmN0aW9uKVxuXG5cdFx0XHRcdHJlYWxMaXN0ZW5lcnMrK1xuXG5cdFx0XHRcdCMgbmFtZVxuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnTmFtZSdcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQubmFtZSA/ICcnXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBldmVudC5uYW1lIGlzbnQgJ3VuZGVmaW5lZCdcblxuXHRcdFx0XHQjIGZ1bmN0aW9uXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdGdW5jdGlvbidcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQuZnVuY3Rpb25cblx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0IyBPbmNlXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdPbmNlJ1xuXHRcdFx0XHRcblx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdHZhbHVlOiBldmVudC5vbmNlXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBldmVudC5uYW1lIGlzbnQgJ2ZhbHNlJ1xuXG5cdFx0XHRcdHVubGVzcyBlIGlzIGxpc3RlbmVyLmV2ZW50cy5sZW5ndGggLSAxXG5cdFx0XHRcdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXG5cdFx0XHR1bmxlc3MgaSBpcyBldmVudExpc3RlbmVycy5sZW5ndGggLSAxXG5cdFx0XHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cblxuXHRcdCMgc2V0IGNvbG9yXG5cblx0XHRpZiByZWFsTGlzdGVuZXJzIGlzIDBcblx0XHRcdEBldmVudExpc3RlbmVyc0FjY28uY29sb3IgPSAnIzg4ODg4OCdcblx0XHRcdHJldHVyblxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzQWNjby5jb2xvciA9ICcjRkZGRkZGJ1xuXG5cdHNob3dBbmltYXRpb25zOiAoYW5pbWF0aW9ucykgPT5cblx0XHRcblx0XHRAYW5pbXNBY2NvLmNvbG9yID0gaWYgYW5pbWF0aW9ucy5sZW5ndGggPiAwIHRoZW4gJyNGRkYnIGVsc2UgJyM4ODg4ODgnXG5cdFxuXHRcdGZvciBhbmltLCBpIGluIGFuaW1hdGlvbnNcblxuXHRcdFx0cHJvcGVydGllcyA9IGFuaW0ucHJvcGVydGllc1xuXHRcdFx0b3B0aW9ucyA9IGFuaW0ub3B0aW9uc1xuXHRcdFx0c3RhdGVBID0gYW5pbS5fc3RhdGVBXG5cdFx0XHRzdGF0ZUIgPSBhbmltLl9zdGF0ZUJcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0XHQjIGFuaW1hdGlvblxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnQW5pbWF0aW9uICcgKyAoaSArIDEpXG5cdFx0XHRcdGJvbGQ6IHRydWVcblxuXHRcdFx0ZnJvbVVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRcdHBhcmVudDogcm93IFxuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR0ZXh0OiAnZnJvbSdcblxuXHRcdFx0dG9Vbml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdHRleHQ6ICd0bydcblxuXHRcdFx0Zm9yIGVsZW1lbnQgaW4gW2Zyb21Vbml0LmVsZW1lbnQsIHRvVW5pdC5lbGVtZW50XVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FsaWduTGVmdCcpXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIHByb3BlcnRpZXNcblxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgcHJvcGVydGllc1xuXG5cdFx0XHRcdGlmIENvbG9yLmlzQ29sb3JPYmplY3QodmFsdWUpIG9yIENvbG9yLmlzQ29sb3IodmFsdWUpXG5cblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6IF8uc3RhcnRDYXNlKGtleSlcblxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdGVsc2UgaWYga2V5IGlzICdncmFkaWVudCdcblxuXHRcdFx0XHRcdCMgc3RhcnRcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIFN0YXJ0J1xuXHRcdFx0XHRcblx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldPy5zdGFydFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5zdGFydFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyBlbmRcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIEVuZCdcblx0XHRcdFx0XG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XT8uZW5kXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV0/LmVuZFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyBhbmdsZVxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgQW5nbGUnXG5cdFx0XHRcdFxuXHRcdFx0XHRcdCMgZnJvbSBcblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldPy5hbmdsZVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5hbmdsZVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogXy5zdGFydENhc2Uoa2V5KVxuXG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIG9wdGlvbnNcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJ09wdGlvbnMnXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR1bml0OiAncydcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMudGltZVxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0dW5pdDogJ2QnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmRlbGF5XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJydcblxuXHRcdFx0IyByZXBlYXRcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dW5pdDogJ3InXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLnJlcGVhdFxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0dW5pdDogJ2wnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmxvb3Bpbmdcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHR1bmxlc3MgaSBpcyBhbmltYXRpb25zLmxlbmd0aCAtIDFcblx0XHRcdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblxuXHRcdFxuXHRzaG93UHJvcGVydGllczogKGxheWVyLCBjdXN0b21Qcm9wcykgPT5cblxuXHRcdEBzY3JvbGxUb3AgPSBAZWxlbWVudC5zY3JvbGxUb3BcblxuXHRcdHByb3BzID0gbGF5ZXIucHJvcHNcblx0XHRfLmFzc2lnbiBwcm9wcywgY3VzdG9tUHJvcHNcblxuXHRcdGRlZmF1bHRzID0gbGF5ZXIuX3Byb3BlcnR5TGlzdCgpXG5cblx0XHRfLmFzc2lnbiBkZWZhdWx0cyxcblx0XHRcdHJvdGF0aW9uOiBkZWZhdWx0cy5yb3RhdGlvblpcblx0XHRcdGJsZW5kaW5nOiB7ZGVmYXVsdDogJ25vcm1hbCd9XG5cblx0XHRAaGlkZURpdnMoKVxuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgXy5tZXJnZShsYXllci5wcm9wcywgY3VzdG9tUHJvcHMpXG5cblx0XHRcdHByb3BMYXllciA9IEBba2V5ICsgJ0JveCddXG5cblx0XHRcdGlmIG5vdCBwcm9wTGF5ZXJcblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0ZGVmID0gZGVmYXVsdHNba2V5XT8uZGVmYXVsdFxuXHRcdFx0XG5cdFx0XHRAc2hvd1Byb3BlcnR5KGtleSwgdmFsdWUsIHByb3BMYXllciwgZGVmKVxuXG5cdFx0QHNob3dPdmVycmlkZUluQWNjbyhAZWZmZWN0c0RpdiwgQGVmZmVjdHNBY2NvKVxuXHRcdEBzaG93T3ZlcnJpZGVJbkFjY28oQGZpbHRlcnNEaXYsIEBmaWx0ZXJzQWNjbylcblx0XHRAc2hvd092ZXJyaWRlSW5BY2NvKEB0cmFuc2Zvcm1zRGl2LCBAdHJhbnNmb3Jtc0FjY28pXG5cdFx0XHRcdFxuXHRcdEBlbGVtZW50LnNjcm9sbFRvcCA9IEBzY3JvbGxUb3BcblxuXHRzaG93T3ZlcnJpZGVJbkFjY286IChkaXYsIGFjY28pIC0+XG5cdFx0YWNjby5jb2xvciA9ICcjODg4ODg4J1xuXHRcdGZvciBwcm9wTGF5ZXIgaW4gZGl2LnByb3BlcnRpZXNcblx0XHRcdGlmIHByb3BMYXllci52YWx1ZT8gYW5kIHByb3BMYXllci52YWx1ZSBpc250IHByb3BMYXllci5kZWZhdWx0XG5cdFx0XHRcdGFjY28uY29sb3IgPSAnI0ZGRidcblxuXHRzaG93UHJvcGVydHk6IChrZXksIHZhbHVlLCBwcm9wTGF5ZXIsIGRlZikgPT5cblxuXHRcdHJldHVybiBpZiB2YWx1ZSBpcyBwcm9wTGF5ZXIudmFsdWVcblxuXHRcdHByb3BMYXllci5pc0RlZmF1bHQgPSBmYWxzZVxuXG5cdFx0aWYgbm90IHZhbHVlPyBvciBfLmlzTmFOKHZhbHVlKSBvciB2YWx1ZSBpcyBkZWZcblx0XHRcdHZhbHVlID0gZGVmID8gJydcblx0XHRcdHByb3BMYXllci5pc0RlZmF1bHQgPSB0cnVlXG5cblx0XHQjIGNvbG9yXG5cdFx0aWYgQ29sb3IuaXNDb2xvck9iamVjdCh2YWx1ZSlcblx0XHRcdHZhbHVlID0gdmFsdWUudG9Ic2xTdHJpbmcoKVxuXG5cdFx0IyBncmFkaWVudFxuXHRcdGlmIHZhbHVlPy5jb25zdHJ1Y3Rvcj8ubmFtZSBpcyAnR3JhZGllbnQnXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0cmV0dXJuXG5cblx0XHQjIHN0cmluZ1xuXHRcdGlmIHR5cGVvZiB2YWx1ZSBpcyAnc3RyaW5nJ1xuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVyblxuXG5cdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpXG5cblx0XHQjIGZsb2F0XG5cdFx0aWYgdmFsdWUuaW5kZXhPZignLicpIGlzbnQgLTFcblx0XHRcdHByb3BMYXllci52YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMilcblx0XHRcdHJldHVyblxuXG5cdFx0IyBudW1lclxuXHRcdHByb3BMYXllci52YWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCkudG9GaXhlZCgpXG5cblx0aGlkZURpdnM6ID0+XG5cdFx0Zm9yIGRpdiBpbiBbXG5cdFx0XHRAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHRleHRQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHNoYWRvd1Byb3BlcnRpZXNEaXYsXG5cdFx0XHRAYm9yZGVyUHJvcGVydGllc0Rpdixcblx0XHRcdEBpbWFnZVByb3BlcnRpZXNEaXYsXG5cdFx0XHRAc2NyZWVuc2hvdERpdlxuXHRcdF1cblx0XHRcdGRpdi52aXNpYmxlID0gZmFsc2VcblxuXG5cblxuXG5cblxuXG5wcm9wTGF5ZXJzID0gW11cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG5cdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcblx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcblx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4ODg4XG5cbiMjIyBcblxuXG5jbGFzcyBHb3RjaGFcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAc3BlY1BhbmVsID0gbmV3IFNwZWNQYW5lbFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2VsZWN0ZWRDb2xvcjogJ3JnYmEoMjU1LCAxLCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlY29uZGFyeUNvbG9yOiAnI0ZGRkZGRidcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblx0XHRcdGZvbnRTaXplOiAnMTAnXG5cdFx0XHRmb250V2VpZ2h0OiAnNTAwJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0XG5cdFx0XHRwYWRkaW5nOiB7dG9wOiAxLCBib3R0b206IDEsIGxlZnQ6IDMsIHJpZ2h0OiAzfVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGNvbG9yOiBvcHRpb25zLmNvbG9yXG5cdFx0XHRzZWxlY3RlZENvbG9yOiBvcHRpb25zLnNlbGVjdGVkQ29sb3Jcblx0XHRcdHNlY29uZGFyeUNvbG9yOiBvcHRpb25zLnNlY29uZGFyeUNvbG9yXG5cdFx0XHRmb250RmFtaWx5OiBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGZvbnRTaXplOiBvcHRpb25zLmZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBvcHRpb25zLmZvbnRXZWlnaHRcblx0XHRcdHNoYXBlczogW11cblx0XHRcdGJvcmRlclJhZGl1czogb3B0aW9ucy5ib3JkZXJSYWRpdXNcblx0XHRcdHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZ1xuXHRcdFx0Zm9jdXNlZEVsZW1lbnQ6IHVuZGVmaW5lZFxuXHRcdFx0ZW5hYmxlZDogZmFsc2Vcblx0XHRcdHNjcmVlbkVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0bGF5ZXJzOiBbXVxuXHRcdFx0Y29udGFpbmVyczogW11cblx0XHRcdHRpbWVyOiB1bmRlZmluZWRcblx0XHRcdF9vbmx5VmlzaWJsZTogdHJ1ZVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdEZyYW1lci5DdXJyZW50Q29udGV4dC5kb21FdmVudE1hbmFnZXIud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgQHVwZGF0ZSlcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXHRcdEBjb250ZXh0LmNoaWxkTm9kZXNbMl0uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFwib25seVZpc2libGVcIixcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfb25seVZpc2libGVcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdHJldHVybiBpZiB0eXBlb2YgYm9vbCBpc250ICdib29sZWFuJ1xuXHRcdFx0XHRAX29ubHlWaXNpYmxlID0gYm9vbFxuXG5cdFx0RnJhbWVyLkRldmljZS5vbiBcImNoYW5nZTpkZXZpY2VUeXBlXCIsID0+XG5cdFx0XHRVdGlscy5kZWxheSAwLCBAdXBkYXRlXG5cblx0dG9nZ2xlOiAoZXZlbnQsIG9wZW4pID0+XG5cdFx0IyByZXR1cm4gaWYgRnJhbWVyLkRldmljZS5oYW5kcy5pc0FuaW1hdGluZ1xuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiYFwiIG9yIGV2ZW50LmtleSBpcyBcIjxcIiBvciBvcGVuIGlzIHRydWVcblx0XHRcdGlmIEBvcGVuZWQgdGhlbiBAZGlzYWJsZSgpIGVsc2UgQGVuYWJsZSgpXG5cdFx0XHRAb3BlbmVkID0gIUBvcGVuZWRcblx0XHRcdHJldHVyblxuXG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiL1wiIG9yIGV2ZW50LmtleSBpcyBcIj5cIlxuXHRcdFx0QHNldFNlbGVjdGVkTGF5ZXIoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCIuXCJcblx0XHRcdEBob3ZlcmVkTGF5ZXI/LmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJcXFxcXCJcblx0XHRcdEBfbGFzdFNwZWVkID89IDFcblx0XHRcdHRoaXNTcGVlZCA9IEBzcGVjUGFuZWwuc3BlZWRCb3guZWxlbWVudC52YWx1ZVxuXG5cdFx0XHRpZiB0aGlzU3BlZWQgaXMgXCIwXCJcblx0XHRcdFx0QHNwZWNQYW5lbC5zcGVlZEJveC5lbGVtZW50LnZhbHVlID0gQF9sYXN0U3BlZWRcblx0XHRcdFx0QHNwZWNQYW5lbC5zcGVlZEJveC5hY3Rpb24oQF9sYXN0U3BlZWQpXG5cdFx0XHRlbHNlIFxuXHRcdFx0XHRAc3BlY1BhbmVsLnNwZWVkQm94LmVsZW1lbnQudmFsdWUgPSAwXG5cdFx0XHRcdEZyYW1lci5Mb29wLmRlbHRhID0gLjAwMDAwMDAwMDAwMDAwMDAwMDAwMVxuXHRcdFx0XHRAX2xhc3RTcGVlZCA9IHRoaXNTcGVlZFxuXG5cdCMgb3BlbiB0aGUgcGFuZWwsIHN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG5cdGVuYWJsZTogPT5cblx0XHRAX2NhbnZhc0NvbG9yID0gQ2FudmFzLmJhY2tncm91bmRDb2xvclxuXHRcdHN2Z0NvbnRleHQuc2V0Q29udGV4dCgpXG5cblx0XHRAdHJhbnNpdGlvbih0cnVlKVxuXG5cdFx0aWYgQHRpbWVyPyB0aGVuIGNsZWFySW50ZXJ2YWwgQHRpbWVyXG5cdFx0QHRpbWVyID0gVXRpbHMuaW50ZXJ2YWwgMS8xNSwgQGZvY3VzXG5cblx0ZGlzYWJsZTogPT5cblx0XHRAdW5mb2N1cygpXG5cdFx0QGVuYWJsZWQgPSBmYWxzZVxuXG5cdFx0QHRyYW5zaXRpb24oZmFsc2UpXG5cblx0XHRpZiBAdGltZXI/IHRoZW4gY2xlYXJJbnRlcnZhbCBAdGltZXJcblxuXHR0cmFuc2l0aW9uOiAob3BlbiA9IHRydWUsIHNlY29uZHMgPSAuNSkgPT5cblx0XHRoYW5kcyA9IEZyYW1lci5EZXZpY2UuaGFuZHNcblxuXHRcdGhhbmRzLm9uIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cblx0XHRoYW5kcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRoYW5kcy5vZmYgXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblx0XHRcdEBlbmFibGVkID0gQG9wZW5lZCA9IG9wZW5cblxuXHRcdFx0aWYgb3BlblxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU91dCwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZC5vbiBFdmVudHMuTW91c2VPdmVyLCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmJhY2tncm91bmQub2ZmIEV2ZW50cy5Nb3VzZU92ZXIsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRAZm9jdXMoKVxuXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cblx0XHRtaWRYID0gaGFuZHMuX2NvbnRleHQuaW5uZXJXaWR0aCAvIDJcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMuYW5pbWF0ZVxuXHRcdFx0bWlkWDogaWYgb3BlbiB0aGVuIG1pZFggLSAxMTIgZWxzZSBtaWRYXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiBzZWNvbmRzXG5cdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMTApXG5cblx0c2hvd1RyYW5zaXRpb246ID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRvcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFggLSA1NiwgbWlkWCAtIDExMl0sIFxuXHRcdFx0WzAsIDFdLCBcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRmYWN0b3IgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdGhhbmRzLm1pZFgsXG5cdFx0XHRbbWlkWCwgbWlkWCAtIDExMl0sXG5cdFx0XHRbMCwgMV0sXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0QHNwZWNQYW5lbC5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IENvbG9yLm1peCBAX2NhbnZhc0NvbG9yLCdyZ2JhKDMwLCAzMCwgMzAsIDEuMDAwKScsIGZhY3RvclxuXG5cdCMgdXBkYXRlIHdoZW4gc2NyZWVuIHNpemUgY2hhbmdlc1xuXHR1cGRhdGU6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAb3BlbmVkXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLm1pZFggLT0gMTIyXG5cblx0XHRzdmdDb250ZXh0LnNldENvbnRleHQoKVxuXHRcdEBmb2N1cygpXG5cblx0IyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudFxuXHRnZXREaW1lbnNpb25zOiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRkID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0ZGltZW5zaW9ucyA9IHtcblx0XHRcdHg6IGQubGVmdFxuXHRcdFx0eTogZC50b3Bcblx0XHRcdHdpZHRoOiBkLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGQuaGVpZ2h0XG5cdFx0XHRtaWRYOiBkLmxlZnQgKyAoZC53aWR0aCAvIDIpXG5cdFx0XHRtaWRZOiBkLnRvcCArIChkLmhlaWdodCAvIDIpXG5cdFx0XHRtYXhYOiBkLmxlZnQgKyBkLndpZHRoXG5cdFx0XHRtYXhZOiBkLnRvcCArIGQuaGVpZ2h0XG5cdFx0XHRmcmFtZTogZFxuXHRcdH1cblxuXHRcdHJldHVybiBkaW1lbnNpb25zXG5cblx0IyBtYWtlIGEgcmVsYXRpdmUgZGlzdGFuY2UgbGluZVxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIHBvaW50QVswXSBpcyBwb2ludEJbMF1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdIC0gNX0gI3twb2ludEFbMV19IEwgI3twb2ludEFbMF0gKyA1fSAje3BvaW50QVsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA1fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDV9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF19ICN7cG9pbnRCWzFdIC0gNX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIHRoZSBsYWJlbCBib3ggZm9yIGRpc3RhbmNlIGxpbmVzXG5cdG1ha2VMYWJlbDogKHgsIHksIHRleHQpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IHhcblx0XHRcdHk6IHkgKyA0XG5cdFx0XHQnZm9udC1mYW1pbHknOiBAZm9udEZhbWlseVxuXHRcdFx0J2ZvbnQtc2l6ZSc6IEBmb250U2l6ZVxuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogQGZvbnRXZWlnaHRcblx0XHRcdCd0ZXh0LWFuY2hvcic6IFwibWlkZGxlXCJcblx0XHRcdGZpbGw6IEBzZWNvbmRhcnlDb2xvclxuXHRcdFx0dGV4dDogTWF0aC5mbG9vcih0ZXh0IC8gQHJhdGlvKVxuXG5cdFx0dyA9IGxhYmVsLmVsZW1lbnQudGV4dExlbmd0aC5iYXNlVmFsLnZhbHVlXG5cblx0XHRib3ggPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiB4IC0gKHcgLyAyKSAtIEBwYWRkaW5nLmxlZnRcblx0XHRcdHk6IHkgLSA3XG5cdFx0XHR3aWR0aDogdyArIEBwYWRkaW5nLmxlZnQgKyBAcGFkZGluZy5yaWdodFxuXHRcdFx0aGVpZ2h0OiAxNVxuXHRcdFx0cng6IEBib3JkZXJSYWRpdXNcblx0XHRcdHJ5OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRmaWxsOiBuZXcgQ29sb3IoY29sb3IpLmRhcmtlbig0MClcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0bGFiZWwuc2hvdygpXG5cblx0IyBtYWtlIHRoZSBib3VuZGluZyByZWN0YW5nbGUgZm9yIHNlbGVjdGVkIC8gaG92ZXJlZCBlbGVtZW50c1xuXHRtYWtlUmVjdE92ZXJsYXlzOiAoc2VsZWN0ZWRMYXllciwgcywgaG92ZXJlZExheWVyLCBoKSA9PlxuXHRcdGlmIG5vdCBzIG9yIG5vdCBoXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIGhvdmVyZWRMYXllciBpcyBzZWxlY3RlZExheWVyXG5cdFx0XHRob3ZlcmVkTGF5ZXIgPSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoLjIpXG5cblx0XHRpZiBob3ZlcmVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKDApXG5cblx0XHRob3ZlcmVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IGgueFxuXHRcdFx0eTogaC55XG5cdFx0XHR3aWR0aDogaC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBoLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdGZpbGw6IGhvdmVyRmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRzZWxlY3RGaWxsID0gbmV3IENvbG9yKEBzZWxlY3RlZENvbG9yKS5hbHBoYSguMilcblx0XHRcblx0XHRpZiBzZWxlY3RlZExheWVyIGlzIEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRzZWxlY3RGaWxsID0gbmV3IENvbG9yKEBzZWxlY3RlZENvbG9yKS5hbHBoYSgwKVxuXG5cdFx0c2VsZWN0ZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogcy54XG5cdFx0XHR5OiBzLnlcblx0XHRcdHdpZHRoOiBzLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHMuaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBzZWxlY3RlZENvbG9yXG5cdFx0XHRmaWxsOiBzZWxlY3RGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHQjIG1ha2UgZGFzaGVkIGxpbmVzIGZyb20gYm91bmRpbmcgcmVjdCB0byBzY3JlZW4gZWRnZVxuXHRtYWtlRGFzaGVkTGluZXM6IChlLCBmLCBjb2xvciwgb2Zmc2V0KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZVxuXHRcdHJldHVybiBpZiBlIGlzIGZcblxuXHRcdGNvbG9yID0gbmV3IENvbG9yKGNvbG9yKS5hbHBoYSguOClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUueCwgeTogZi55fSxcblx0XHRcdHt4OiBlLngsIHk6IGYubWF4WX1cblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYueX0sXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLnl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS55fSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS5tYXhZfSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdHNob3dEaXN0YW5jZXM6IChzZWxlY3RlZExheWVyLCBob3ZlcmVkTGF5ZXIpID0+XG5cblx0XHRyZXR1cm4gaWYgbm90IHNlbGVjdGVkTGF5ZXIgb3Igbm90IGhvdmVyZWRMYXllclxuXG5cdFx0cyA9IEBnZXREaW1lbnNpb25zKHNlbGVjdGVkTGF5ZXIuX2VsZW1lbnQpXG5cdFx0aCA9IEBnZXREaW1lbnNpb25zKGhvdmVyZWRMYXllci5fZWxlbWVudClcblx0XHRmID0gQGdldERpbWVuc2lvbnMoRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQpXG5cblx0XHRAbWFrZURhc2hlZExpbmVzKHMsIGYsIEBzZWxlY3RlZENvbG9yLCA1KVxuXG5cdFx0QG1ha2VSZWN0T3ZlcmxheXMoc2VsZWN0ZWRMYXllciwgcywgaG92ZXJlZExheWVyLCBoKVxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRAcmF0aW8gPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAvIFNjcmVlbi53aWR0aFxuXG5cdFx0aWYgcy54IDwgaC54IGFuZCBzLm1heFggPiBoLm1heFggYW5kIHMueSA8IGgueSBhbmQgcy5tYXhZID4gaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFggLSBoLm1heFgpXG5cdFx0XHRtID0gaC5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWF4WCArIDUsIGgubWlkWV0sIFtzLm1heFggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLm1heFkgLSBoLm1heFkpXG5cdFx0XHRtID0gaC5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC54KVxuXHRcdFx0bSA9IHMueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gaG92ZXJlZCBlbGVtZW50IGNvbnRhaW5zIHNlbGVjdGVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA+IGgueCBhbmQgcy5tYXhYIDwgaC5tYXhYIGFuZCBzLnkgPiBoLnkgYW5kIHMubWF4WSA8IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IGgueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBoLnkgKyA1XSwgW3MubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC5tYXhYIC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBzLm1pZFldLCBbaC5tYXhYIC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC5tYXhZIC0gcy5tYXhZKVxuXHRcdFx0bSA9IHMubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIHMubWF4WSArIDVdLCBbcy5taWRYLCBoLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBoLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIHMubWlkWV0sIFtzLnggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblxuXHRcdFx0cmV0dXJuXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gaG92ZXJlZCBlbGVtZW50XG5cdFx0XG5cdFx0IyB0b3BcblxuXHRcdGlmIHMueSA+IGgubWF4WVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC5tYXhZKVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnkgPiBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLnkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdCMgbGVmdFxuXG5cdFx0aWYgaC5tYXhYIDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLm1heFgpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWF4WCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRlbHNlIGlmIGgueCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC54KVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0IyByaWdodFxuXG5cdFx0aWYgcy5tYXhYIDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRlbHNlIGlmIHMueCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IHMueCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0IyBib3R0b21cblxuXHRcdGlmIHMubWF4WSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy5tYXhZKVxuXHRcdFx0bSA9IHMubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMubWF4WSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBzLnkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHQjIHNldCB0aGUgcGFuZWwgd2l0aCBjdXJyZW50IHByb3BlcnRpZXNcblx0c2V0UGFuZWxQcm9wZXJ0aWVzOiAoKSA9PlxuXG5cdFx0bGF5ZXIgPSBAc2VsZWN0ZWRMYXllciA/IEBob3ZlcmVkTGF5ZXJcblxuXHRcdGlmIGxheWVyIGlzIEBsYXN0TGF5ZXIgYW5kIGxheWVyLmlzQW5pbWF0aW5nIGlzIGZhbHNlXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBsYXN0TGF5ZXIgPSBsYXllclxuXHRcdEBsYXN0UHJvcHMgPSBsYXllci5wcm9wc1xuXHRcdFxuXHRcdCMgcHJvcGVydGllcyB0byBhc3NpZ25lZCB0byBsYXllci5wcm9wc1xuXHRcdGN1c3RvbVByb3BzID1cblx0XHRcdHg6IGxheWVyLnNjcmVlbkZyYW1lLnhcblx0XHRcdHk6IGxheWVyLnNjcmVlbkZyYW1lLnlcblx0XHRcdGNvbXBvbmVudE5hbWU6IGxheWVyLmNvbnN0cnVjdG9yLm5hbWVcblx0XHRcdGNvbXBvbmVudE5hbWVzOiBAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudClcblx0XHRcdHBhcmVudE5hbWU6IGxheWVyLnBhcmVudD8ubmFtZVxuXHRcdFx0cm90YXRpb246IGxheWVyLnJvdGF0aW9uWlxuXHRcdFx0IyB0ZXh0QWxpZ246IGxheWVyLnByb3BzLnN0eWxlZFRleHRPcHRpb25zPy5hbGlnbm1lbnRcblx0XHRcdGJsZW5kaW5nOiBsYXllci5ibGVuZGluZ1xuXHRcdFx0IyBzY3JlZW5zaG90OiBAZ2V0U2NyZWVuc2hvdChsYXllci5fZWxlbWVudClcblx0XHRcblx0XHRpZiBsYXllci5ncmFkaWVudD9cblx0XHRcdF8uYXNzaWduIGN1c3RvbVByb3BzLFxuXHRcdFx0XHRncmFkaWVudFN0YXJ0OiBsYXllci5ncmFkaWVudC5zdGFydFxuXHRcdFx0XHRncmFkaWVudEVuZDogbGF5ZXIuZ3JhZGllbnQuZW5kXG5cdFx0XHRcdGdyYWRpZW50QW5nbGU6IGxheWVyLmdyYWRpZW50LmFuZ2xlXG5cblx0XHRpZiBsYXllci5zaGFkb3dzP1xuXHRcdFx0Xy5hc3NpZ24gY3VzdG9tUHJvcHMsXG5cdFx0XHRcdHNoYWRvd1g6IGxheWVyLnNoYWRvd3NbMF0/Lnhcblx0XHRcdFx0c2hhZG93WTogbGF5ZXIuc2hhZG93c1swXT8ueVxuXHRcdFx0XHRzaGFkb3dTcHJlYWQ6IGxheWVyLnNoYWRvd3NbMF0/LnNwcmVhZFxuXHRcdFx0XHRzaGFkb3dDb2xvcjogbGF5ZXIuc2hhZG93c1swXT8uY29sb3Jcblx0XHRcdFx0c2hhZG93VHlwZTogbGF5ZXIuc2hhZG93c1swXT8udHlwZVxuXHRcdFx0XHRzaGFkb3dCbHVyOiBsYXllci5zaGFkb3dzWzBdPy5ibHVyXG5cblx0XHRAc3BlY1BhbmVsLnNob3dQcm9wZXJ0aWVzKGxheWVyLCBjdXN0b21Qcm9wcylcblx0XHRcblx0XHRldmVudExpc3RlbmVycyA9IEBnZXRMYXllckV2ZW50TGlzdGVuZXJzKGxheWVyKVxuXHRcdEBzcGVjUGFuZWwuY2xlYXJDaGlsZHJlblRoZW5TaG93RXZlbnRMaXN0ZW5lcnMoZXZlbnRMaXN0ZW5lcnMpXG5cblx0XHRhbmltYXRpb25zID0gbGF5ZXIuYW5pbWF0aW9ucygpXG5cdFx0QHNwZWNQYW5lbC5jbGVhckNoaWxkcmVuVGhlblNob3dBbmltYXRpb25zKGFuaW1hdGlvbnMpXG5cblxuXHRzZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRsYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGV2ZW50Py50YXJnZXQpXG5cdFx0cmV0dXJuIGlmIG5vdCBAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIpXG5cblx0XHRAaG92ZXJlZExheWVyID0gbGF5ZXJcblxuXHRcdEB0cnlGb2N1cyhldmVudClcblxuXHRcdHJldHVybiBmYWxzZVxuXG5cdHVuc2V0SG92ZXJlZExheWVyOiAoZXZlbnQpID0+XG5cdFx0QGhvdmVyZWRMYXllciA9IHVuZGVmaW5lZFxuXHRcdFV0aWxzLmRlbGF5IC4wNSwgPT5cblx0XHRcdGlmIG5vdCBAaG92ZXJlZExheWVyIHRoZW4gQGZvY3VzKClcblxuXHRzZXRTZWxlY3RlZExheWVyOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQGhvdmVyZWRMYXllclxuXG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXIgaXMgQGhvdmVyZWRMYXllclxuXHRcdFx0QHVuc2V0U2VsZWN0ZWRMYXllcigpXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBzZWxlY3RlZExheWVyID0gQGhvdmVyZWRMYXllclxuXHRcdEBmb2N1cygpXG5cblx0dW5zZXRTZWxlY3RlZExheWVyOiA9PlxuXHRcdEBzZWxlY3RlZExheWVyID0gdW5kZWZpbmVkXG5cdFx0QGZvY3VzKClcblxuXG5cdCMgRmluZCBhbiBlbGVtZW50IHRoYXQgYmVsb25ncyB0byBhIEZyYW1lciBMYXllclxuXHRmaW5kTGF5ZXJFbGVtZW50OiAoZWxlbWVudCkgLT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnQuY2xhc3NMaXN0XG5cblx0XHRpZiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZnJhbWVyTGF5ZXInKVxuXHRcdFx0cmV0dXJuIGVsZW1lbnRcblxuXHRcdEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQucGFyZW50Tm9kZSlcblxuXHQjIEZpbmQgYSBGcmFtZXIgTGF5ZXIgdGhhdCBtYXRjaGVzIGEgRnJhbWVyIExheWVyIGVsZW1lbnRcblx0Z2V0TGF5ZXJGcm9tRWxlbWVudDogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cblx0XHRlbGVtZW50ID0gQGZpbmRMYXllckVsZW1lbnQoZWxlbWVudClcblx0XHRsYXllciA9IF8uZmluZChGcmFtZXIuQ3VycmVudENvbnRleHQuX2xheWVycywgWydfZWxlbWVudCcsIGVsZW1lbnRdKVxuXG5cdFx0cmV0dXJuIGxheWVyXG5cblx0Z2V0TGF5ZXJJc1Zpc2libGU6IChsYXllcikgPT5cblx0XHRpZiBub3QgQF9vbmx5VmlzaWJsZVxuXHRcdFx0cmV0dXJuIHRydWVcblxuXHRcdGlmIG5vdCBsYXllclxuXHRcdFx0cmV0dXJuIHRydWVcblxuXHRcdGlmIGxheWVyLm9wYWNpdHkgaXMgMCBvciBsYXllci52aXNpYmxlIGlzIGZhbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdEBnZXRMYXllcklzVmlzaWJsZShsYXllci5wYXJlbnQpXG5cblx0Z2V0TGF5ZXJFdmVudExpc3RlbmVyczogKGxheWVyKSA9PlxuXG5cdFx0bGlzdGVuZXJzID0gXy5tYXAobGF5ZXIuX2V2ZW50cywgKGV2cywgbGlzdGVuZXIsIGMpIC0+XG5cdFx0XHRpZiBub3QgXy5pc0FycmF5KGV2cykgdGhlbiBldnMgPSBbZXZzXVxuXHRcdFx0XG5cdFx0XHR7XG5cdFx0XHRcdGxpc3RlbmVyOiBsaXN0ZW5lclxuXHRcdFx0XHRldmVudHM6IF8ubWFwIGV2cywgKGV2KSAtPlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6IGV2LmZuLm5hbWVcblx0XHRcdFx0XHRcdGZ1bmN0aW9uOiBldi5mbi50b1N0cmluZygpXG5cdFx0XHRcdFx0XHRjb250ZXh0OiBldi5jb250ZXh0IFxuXHRcdFx0XHRcdFx0b25jZTogZXYub25jZVxuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpXG5cblx0XHRyZXR1cm4gbGlzdGVuZXJzXG5cblx0Z2V0U2NyZWVuc2hvdDogKGVsZW1lbnQpID0+XG5cblx0XHRmb3JlaWduT2JqZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAnZm9yZWlnbk9iamVjdCdcblxuXHRcdCMgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckxheWVyIERldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFxuXHRcdHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0Y3R4ID0gQHNwZWNQYW5lbC5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuXHRcdGRhdGEgPSBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nI3tyZWN0LndpZHRofScgaGVpZ2h0PScje3JlY3QuaGVpZ2h0fSc+XCIgK1xuXHRcdFx0Jzxmb3JlaWduT2JqZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj4nICtcblx0XHRcdCc8ZGl2IHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPicgK1xuXHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgK1xuXHRcdFx0JzwvZGl2PicgK1xuXHRcdFx0JzwvZm9yZWlnbk9iamVjdD4nICtcblx0XHRcdCc8L3N2Zz4nXG5cblx0XHRET01VUkwgPSB3aW5kb3cuVVJMIG9yIHdpbmRvdy53ZWJraXRVUkwgb3Igd2luZG93XG5cblx0XHRzdmcgPSBuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiAnaW1hZ2Uvc3ZnK3htbCd9KVxuXHRcdHVybCA9IERPTVVSTC5jcmVhdGVPYmplY3RVUkwoc3ZnKVxuXHRcdEBzcGVjUGFuZWwuc2NyZWVuc2hvdEJveC52YWx1ZSA9IHVybFxuXG5cblx0IyBGaW5kIGEgbm9uLXN0YW5kYXJkIENvbXBvbmVudCB0aGF0IGluY2x1ZGVzIGEgTGF5ZXJcblx0Z2V0Q29tcG9uZW50RnJvbUxheWVyOiAobGF5ZXIsIG5hbWVzID0gW10pID0+XG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gbmFtZXMuam9pbignLCAnKVxuXG5cdFx0aWYgbm90IF8uaW5jbHVkZXMoW1wiTGF5ZXJcIiwgXCJUZXh0TGF5ZXJcIiwgXCJTY3JvbGxDb21wb25lbnRcIl0sIGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cdFx0XHRuYW1lcy5wdXNoKGxheWVyLmNvbnN0cnVjdG9yLm5hbWUpXG5cblx0XHRAZ2V0Q29tcG9uZW50RnJvbUxheWVyKGxheWVyLnBhcmVudCwgbmFtZXMpXG5cblxuXHQjIERlbGF5IGZvY3VzIGJ5IGEgc21hbGwgYW1vdW50IHRvIHByZXZlbnQgZmxhc2hpbmdcblx0dHJ5Rm9jdXM6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRAZm9jdXNFbGVtZW50ID0gZXZlbnQudGFyZ2V0XG5cdFx0ZG8gKGV2ZW50KSA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgLjA1LCA9PlxuXHRcdFx0XHRpZiBAZm9jdXNFbGVtZW50IGlzbnQgZXZlbnQudGFyZ2V0XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFxuXHRcdFx0XHRAZm9jdXMoKVxuXG5cdCMgQ2hhbmdlIGZvY3VzIHRvIGEgbmV3IGhvdmVyZWQgb3Igc2VsZWN0ZWQgZWxlbWVudFxuXHRmb2N1czogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRAdW5mb2N1cygpXG5cblx0XHQjIEBzZWxlY3RlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0QGhvdmVyZWRMYXllciA/PSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0aG92ZXJlZExheWVyID0gQGhvdmVyZWRMYXllciA/IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0c2VsZWN0ZWRMYXllciA9IEBzZWxlY3RlZExheWVyID8gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdGlmIHNlbGVjdGVkTGF5ZXIgaXMgaG92ZXJlZExheWVyXG5cdFx0XHRob3ZlcmVkTGF5ZXIgPSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0aWYgaG92ZXJlZExheWVyIGlzIHNlbGVjdGVkTGF5ZXJcblx0XHRcdHJldHVyblxuXG5cdFx0QHNob3dEaXN0YW5jZXMoc2VsZWN0ZWRMYXllciwgaG92ZXJlZExheWVyKVxuXHRcdEBzZXRQYW5lbFByb3BlcnRpZXMoc2VsZWN0ZWRMYXllciwgaG92ZXJlZExheWVyKVxuXG5cdHVuZm9jdXM6IChldmVudCkgPT5cblx0XHRzdmdDb250ZXh0LnJlbW92ZUFsbCgpXG5cblxuIyBraWNrb2ZmXG5cbnBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbnBhbmVsLmlkID0gJ3BDb250YWluZXInXG52aWV3QyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGcmFtZXJDb250ZXh0Um9vdC1EZWZhdWx0JylcblV0aWxzLmRlbGF5IDAsID0+IHZpZXdDLmFwcGVuZENoaWxkKHBhbmVsKVxuXG5zZWNyZXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3JldEJveClcblxuXG5zdmdDb250ZXh0ID0gbmV3IFNWR0NvbnRleHRcblxuZXhwb3J0cy5nb3RjaGEgPSBnb3RjaGEgPSBuZXcgR290Y2hhXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBRFlBLElBQUEs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O1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBbkI7WUFDQSxJQUFBLEVBQU0sWUFETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTLEVBMUROO1NBQUEsTUFBQTtVQW1FSixHQUFBLEdBQVUsSUFBQSxJQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFuQjtZQUNBLElBQUEsRUFBTSxDQUFDLENBQUMsU0FBRixDQUFZLEdBQVosQ0FETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZO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
