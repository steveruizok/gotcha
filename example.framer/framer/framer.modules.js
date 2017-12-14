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
    return this.timer = Utils.interval(1 / 30, this.focus);
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
    s = this.getDimensions(selectedLayer._element);
    h = this.getDimensions(hoveredLayer._element);
    f = this.getDimensions(Framer.Device.screen._element);
    if (!s || !h) {
      return;
    }
    this.ratio = Framer.Device.screen._element.getBoundingClientRect().width / Screen.width;
    this.makeDashedLines(s, f, this.selectedColor, 5);
    this.makeRectOverlays(selectedLayer, s, hoveredLayer, h);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuZGV2aWNlVHlwZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZGV2aWNlVHlwZVxuXG5pZiBkZXZpY2VUeXBlPyBcblx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdEZyYW1lci5EZXZpY2UuX2NvbnRleHQuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZS5kZXZpY2VQaXhlbFJhdGlvXG5cblx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gZGV2aWNlVHlwZVxuXHR3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZSA9IHVuZGVmaW5lZFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5zdmdDb250ZXh0ID0gdW5kZWZpbmVkXG5zdGFydE9wZW4gPSBmYWxzZVxuYWNjb3JkaW9uc09wZW4gPSBmYWxzZVxuXG4jIGRlYnVnZ2luZ1xuXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VQaG9uZScpWzBdPy5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICBcdDg4LiAgICBcIicgODggICAgIDg4IGQ4JyAgIGA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0YFk4ODg4OGIuIDg4ICAgIC44UCA4OCAgICAgICAgICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4gIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIFx0ZDgnICAgLjhQIDg4ICAuZDhQICBZOC4gICAuODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4gIFx0IFk4ODg4OFAgIDg4ODg4OCcgICAgYDg4ODg4JyAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyMjXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIENvbnRleHRcblxuY2xhc3MgU1ZHQ29udGV4dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAc2hhcGVzID0gW11cblxuXHRcdHN2Z0NvbnRleHQgPSBAXG5cblx0XHQjIG5hbWVzcGFjZVxuXHRcdHN2Z05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG5cdFx0XG5cdFx0IyBzZXQgYXR0cmlidXRlcyBcblx0XHRzZXRBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRcdGZvciBrZXksIHZhbHVlIG9mIGF0dHJpYnV0ZXNcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXG5cdFx0IyBDcmVhdGUgU1ZHIGVsZW1lbnRcblxuXHRcdEBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKVxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoQHN2Zylcblx0XHRAc3ZnLnN0eWxlWyd6LWluZGV4J10gPSAnOTk5J1xuXG5cdFx0QGZyYW1lRWxlbWVudCA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuQmFja2dyb3VuZC5fZWxlbWVudFxuXG5cdFx0QHNldENvbnRleHQoKVxuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0c2V0QXR0cmlidXRlczogKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdHNldENvbnRleHQ6ID0+XG5cblx0XHRAbEZyYW1lID0gQGZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0QHNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJDb250ZXh0JylbMF1cblx0XHRzRnJhbWUgPSBAc2NyZWVuRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0QHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdGFkZFNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHNoYXBlcy5wdXNoKHNoYXBlKVxuXHRcdEBzaG93U2hhcGUoc2hhcGUpXG5cdFx0XG5cdHJlbW92ZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QGhpZGVTaGFwZShzaGFwZSlcblx0XHRfLnB1bGwoQHNoYXBlcywgc2hhcGUpXG5cdFx0XG5cdGhpZGVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XG5cdHNob3dTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRcblx0YWRkRGVmOiAoZGVmKSAtPlxuXHRcdEBzdmdEZWZzLmFwcGVuZENoaWxkKGRlZilcblxuXHRyZW1vdmVBbGw6ID0+XG5cdFx0Zm9yIHNoYXBlIGluIEBzaGFwZXNcblx0XHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRAc2hhcGVzID0gW11cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIFNoYXBlXG5cbmNsYXNzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt0eXBlOiAnY2lyY2xlJ30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHBhcmVudCA9IHN2Z0NvbnRleHRcblx0XHRcblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXG5cdFx0XHRvcHRpb25zLnR5cGVcblx0XHRcdClcblxuXHRcdEBzZXRDdXN0b21Qcm9wZXJ0eSgndGV4dCcsICd0ZXh0Q29udGVudCcsICd0ZXh0Q29udGVudCcsIG9wdGlvbnMudGV4dClcblx0XHRcdFx0XG5cdFx0IyBhc3NpZ24gYXR0cmlidXRlcyBzZXQgYnkgb3B0aW9uc1xuXHRcdGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdEBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBwYXJlbnQuYWRkU2hhcGUoQClcblx0XHRcblx0XHRAc2hvdygpXG5cdFx0XHRcblx0c2V0QXR0cmlidXRlOiAoa2V5LCB2YWx1ZSkgPT5cblx0XHRyZXR1cm4gaWYga2V5IGlzICd0ZXh0J1xuXHRcdGlmIG5vdCBAW2tleV0/XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRnZXQ6ID0+XG5cdFx0XHRcdFx0cmV0dXJuIEBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXG5cdFx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0XHRAZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcblx0XHRAW2tleV0gPSB2YWx1ZVxuXHRcblx0c2V0Q3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIHJldHVyblZhbHVlLCBzZXRWYWx1ZSwgc3RhcnRWYWx1ZSkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIHJldHVyblZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGVsZW1lbnRbc2V0VmFsdWVdID0gdmFsdWVcblxuXHRcdEBbdmFyaWFibGVOYW1lXSA9IHN0YXJ0VmFsdWVcblxuXHRoaWRlOiAtPiBcblx0XHRAcGFyZW50LmhpZGVTaGFwZShAKVxuXHRcblx0c2hvdzogLT4gXG5cdFx0QHBhcmVudC5zaG93U2hhcGUoQClcblx0XHRcblx0cmVtb3ZlOiAtPlxuXHRcdEBwYXJlbnQucmVtb3ZlU2hhcGUoQClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGFzaGVkIExpbmVcblxuY2xhc3MgRGFzaGVkTGluZSBleHRlbmRzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAocG9pbnRBLCBwb2ludEIsIGNvbG9yID0gJyMwMDAnLCBvZmZzZXQgPSAwLCBvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmFzc2lnbiBvcHRpb25zLFxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEEueH0gI3twb2ludEEueX0gTCAje3BvaW50Qi54fSAje3BvaW50Qi55fVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblx0XHRcdCdzdHJva2UtZGFzaGFycmF5JzogXCI1LCA1XCJcblx0XHRcdCdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBQYW5lbCBDb21wb25lbnRzXG5cblV0aWxzLmluc2VydENTUyBcIlwiXCJcblxuXHQubG9nbyB7XG5cdFx0b3BhY2l0eTogLjQ7XG5cdH1cblxuXHQubG9nbzpob3ZlciB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHRcblx0I2xpbmtlZGluX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogNjhweDtcblx0fVxuXG5cdFxuXHQjdHdpdHRlcl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA0cHg7XG5cdFx0cmlnaHQ6IDRweDtcblx0fVxuXG5cdCNnaXRodWJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiAzNnB4O1xuXHR9XG5cblx0LmZyYW1lckxheWVyIHsgXG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHR9IFxuXHRcblx0Lklnbm9yZVBvaW50ZXJFdmVudHMge1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHR9XG5cblx0LmRyb3Bkb3duIHtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cblx0I3BDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRyaWdodDogMDtcblx0XHR3aWR0aDogMjI0cHg7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnO1xuXHRcdGZvbnQtc2l6ZTogMTFweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdFx0b3ZlcmZsb3c6IHNjcm9sbDtcblx0XHRwYWRkaW5nLXRvcDogOHB4O1xuXHR9XG5cblx0LnBEaXYge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0LmhpZGRlbiB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuXG5cdC5wUm93IHtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDMycHg7XG5cdH1cblxuXHQucFNwYW4ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRjb2xvcjogIzg4ODg4ODtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdGxldHRlci1zcGFjaW5nOiAuNXB4O1xuXHRcdHBhZGRpbmctbGVmdDogOHB4O1xuXHRcdG1hcmdpbi10b3A6IDJweDtcblx0fVxuXG5cdC5wTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcblx0XHRmb250LXNpemU6IDEwcHg7XG5cdFx0d2lkdGg6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogMnB4O1xuXHRcdG1hcmdpbi1yaWdodDogOHB4O1xuXHRcdHotaW5kZXg6IDEwO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHR9XG5cblx0LnBSYW5nZSB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRtYXJnaW4tdG9wOiAxNXB4O1xuXHRcdG1hcmdpbi1yaWdodDogNHB4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lOyAgLyogT3ZlcnJpZGUgZGVmYXVsdCBDU1Mgc3R5bGVzICovXG5cdFx0YXBwZWFyYW5jZTogbm9uZTtcblx0XHR3aWR0aDogMTAwJTsgXG5cdFx0aGVpZ2h0OiA0cHg7XG5cdFx0YmFja2dyb3VuZDogIzMyMzIzMjtcblx0XHRvdXRsaW5lOiBub25lO1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblxuXG5cdC5wUmFuZ2U6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcblx0XHRib3JkZXItcmFkaXVzOiA4cHg7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuXHRcdGFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0d2lkdGg6IDE2cHg7XG5cdFx0aGVpZ2h0OiAxNnB4O1xuXHRcdGJhY2tncm91bmQ6ICM4ODg4ODg7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdH1cblxuXHQucFJhbmdlOjotbW96LXJhbmdlLXRodW1iIHtcblx0XHRib3JkZXItcmFkaXVzOiA4cHg7XG5cdFx0d2lkdGg6IDE2cHg7XG5cdFx0aGVpZ2h0OiAxNnB4O1xuXHRcdGJhY2tncm91bmQ6ICM4ODg4ODg7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdH1cblxuXHQucElucHV0IHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Y29sb3I6ICM1NTU1NTU7XG5cdFx0cGFkZGluZzogNHB4O1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0XHRtYXJnaW4tdG9wOiA0cHg7XG5cdH1cblxuXHQucElucHV0OmhvdmVyIHtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjNDhjZmZmO1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHR9XG5cblx0LnJpZ2h0IHtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiA0OHB4O1xuXHR9XG5cblx0LmxlZnQge1xuXHRcdHJpZ2h0OiA3MnB4O1xuXHRcdHdpZHRoOiA0OHB4O1xuXHR9XG5cblx0LmFsaWduTGVmdCB7XG5cdFx0dGV4dC1hbGlnbjogbGVmdDtcblx0fVxuXG5cdC5mdWxsIHtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiAxMTJweDtcblx0fVxuXG5cdC5wSW1hZ2Uge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdG1hcmdpbi1sZWZ0OiA4cHg7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdHdpZHRoOiAxOTZweDtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzAwMDtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogNHB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IC00cHg7XG5cdFx0cGFkZGluZzogNHB4O1xuXHR9XG5cblx0LnBJbWFnZTpob3ZlciB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzQ4Y2ZmZjtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0XHRvdXRsaW5lOiAycHggc29saWQgIzI5MjkyOTtcblx0fVxuXG5cdC5wQ29sb3Ige1xuXHRcdG91dGxpbmU6IDRweCBzb2xpZCAjMjkyOTI5O1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAtNHB4O1xuXHR9XG5cblx0LnBDb2xvcjpob3ZlciB7XG5cdFx0b3V0bGluZTogMnB4IHNvbGlkICMyOTI5Mjk7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdH1cblxuXHQucFNlbGVjdCB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHJpZ2h0OiA4cHg7XG5cdFx0d2lkdGg6IDEyMnB4O1xuXHRcdGNvbG9yOiAjNTU1NTU1O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyOTI5Mjk7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0cGFkZGluZzogNHB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRvdXRsaW5lOiBub25lO1xuXHR9XG5cblx0LnBEaXZpZGVyIHtcblx0XHRoZWlnaHQ6IDFweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuXHRcdG1hcmdpbjogMTZweCA4cHggMTZweCA4cHg7XG5cdH1cblxuXHQucEFjY29yZGlhbiB7XG5cdFx0Ym9yZGVyLXRvcDogMXB4IHNvbGlkICMxNDE0MTQ7XG5cdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxNDE0MTQ7XG5cdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdG1pbi1oZWlnaHQ6IDMycHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzFEMUQxRDtcblx0XHRtYXJnaW4tdG9wOiAxNnB4O1xuXHR9XG5cblx0LnBBY2NvcmRpYW5Cb2R5IHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRtYXJnaW4tdG9wOiAzMnB4O1xuXHRcdHBhZGRpbmctdG9wOiA0cHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcblx0fVxuXG5cdC5hY3RpdmUge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdGhlaWdodDogYXV0bztcblx0fVxuXG5cdC5oYXNWYWx1ZSB7XG5cdFx0Y29sb3I6ICNGRkY7XG5cdH1cblxuXHQuc29jaWFsTGlua3Mge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG5cdFx0cG9zaXRpb246IGZpeGVkO1xuXHRcdGJvdHRvbTogMHB4O1xuXHRcdHJpZ2h0OiAwcHg7XG5cdFx0cGFkZGluZy10b3A6IDRweDtcblx0XHR6LWluZGV4OiAxMDA7XG5cdH1cblxuXHQuc3Ryb25nIHtcblx0XHRmb250LXdlaWdodDogNjAwO1xuXHR9XG5cblwiXCJcIlxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBEaXZcblxuY2xhc3MgcERpdlxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cblx0XHRAcHJvcGVydGllcyA9IFtdXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBEaXZcIilcblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFwidmlzaWJsZVwiLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92aXNpYmxlXG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX3Zpc2libGVcblxuXHRcdFx0XHRAX3Zpc2libGUgPSBib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBSb3dcblxuY2xhc3MgcFJvdyBleHRlbmRzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0ZXh0OiAnTGFiZWwnXG5cdFx0XHRib2xkOiBmYWxzZVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGNoaWxkcmVuOiBbXVxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInBEaXZcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFJvd1wiKVxuXG5cdFx0QGxhYmVsID0gbmV3IHBTcGFuXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6IG9wdGlvbnMudGV4dFxuXHRcdFx0Ym9sZDogb3B0aW9ucy5ib2xkXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgJ2NvbG9yJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBsYWJlbC5zdHlsZS5jb2xvclxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBsYWJlbC5lbGVtZW50LnN0eWxlLmNvbG9yID0gdmFsdWVcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGl2aWRlclxuXG5jbGFzcyBwRGl2aWRlclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBEaXZpZGVyXCIpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBTcGFuXG5cbmNsYXNzIHBTcGFuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblx0XHRcdHRleHQ6ICdoZWxsbyB3b3JsZCdcblx0XHRcdGJvbGQ6IGZhbHNlXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwU3BhblwiKVxuXHRcdEBlbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9ucy50ZXh0XG5cblx0XHRpZiBvcHRpb25zLmJvbGRcblx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdHJvbmdcIilcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndGV4dCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+IEBlbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBSYW5nZVxuXG5jbGFzcyBwUmFuZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR2YWx1ZTogJydcblx0XHRcdG1pbjogJzAnXG5cdFx0XHRtYXg6ICcxMDAnXG5cdFx0XHR2YWx1ZTogJzEwMCdcblx0XHRcdGFjdGlvbjogKHZhbHVlKSA9PiBudWxsXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcblx0XHRfLmFzc2lnbiBAZWxlbWVudCxcblx0XHRcdHR5cGU6ICdyYW5nZSdcblx0XHRcdG1pbjogb3B0aW9ucy5taW5cblx0XHRcdG1heDogb3B0aW9ucy5tYXhcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRhY3Rpb246IG9wdGlvbnMuYWN0aW9uXG5cblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFJhbmdlXCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblxuXHRcdEBlbGVtZW50Lm9uaW5wdXQgPSA9PiBAYWN0aW9uKEB2YWx1ZSlcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRwcm9wTGF5ZXJzLnB1c2goQClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAZWxlbWVudC52YWx1ZVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGFjdGlvbjogb3B0aW9ucy5hY3Rpb25cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgTGFiZWxcblxuY2xhc3MgcExhYmVsXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblx0XHRcdGNsYXNzTmFtZTogbnVsbFxuXHRcdFx0dGV4dDogJ3gnXG5cdFx0XHRmb3I6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBMYWJlbFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cdFx0XG5cdFx0Xy5hc3NpZ24gQGVsZW1lbnQsXG5cdFx0XHR0ZXh0Q29udGVudDogb3B0aW9ucy50ZXh0XG5cdFx0XHRmb3I6IG9wdGlvbnMuZm9yXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBJbnB1dFxuXG5jbGFzcyBwSW5wdXRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR2YWx1ZTogJydcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJydcblx0XHRcdGlzRGVmYXVsdDogdHJ1ZVxuXHRcdFx0c2VjdGlvbjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicElucHV0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRvcHRpb25zLnNlY3Rpb24/LnByb3BlcnRpZXMucHVzaChAKVxuXG5cdFx0QHVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRwYXJlbnQ6IG9wdGlvbnMucGFyZW50XG5cdFx0XHRjbGFzc05hbWU6IG9wdGlvbnMuY2xhc3NOYW1lXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnVuaXRcblx0XHRcdGZvcjogQGVsZW1lbnRcblxuXHRcdHByb3BMYXllcnMucHVzaChAKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J2RlZmF1bHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9kZWZhdWx0XG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QF9kZWZhdWx0ID0gdmFsdWVcblxuXHRcdEBkZWZhdWx0ID0gb3B0aW9ucy5kZWZhdWx0ID8gJydcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCd2YWx1ZScsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3ZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdGlmIG5vdCB2YWx1ZT8gb3IgdmFsdWUgaXMgXCJcIiBvciB2YWx1ZSBpcyBcInVuZGVmaW5lZFwiXG5cdFx0XHRcdFx0dmFsdWUgPSBTdHJpbmcoQGRlZmF1bHQpXG5cblx0XHRcdFx0QGVsZW1lbnQudmFsdWUgPSB2YWx1ZSA/IFwiXCJcblxuXHRcdFx0XHRpZiB2YWx1ZT8gYW5kIG5vdCBAaXNEZWZhdWx0IGFuZCB2YWx1ZSBpc250IFwiXCJcblx0XHRcdFx0XHQjIEBzZWN0aW9uPy5jb2xvciA9ICcjRkZGJ1xuXHRcdFx0XHRcdEBzZWN0aW9uPy52aXNpYmxlID0gdHJ1ZVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J2lzRGVmYXVsdCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX2lzRGVmYXVsdFxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0QF9pc0RlZmF1bHQgPSBib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hhc1ZhbHVlJylcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRALmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzVmFsdWUnKVxuXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRkZWZhdWx0OiBvcHRpb25zLmRlZmF1bHRcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXHRcdFx0aXNEZWZhdWx0OiBvcHRpb25zLmlzRGVmYXVsdFxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBJbWFnZVxuXG5jbGFzcyBwSW1hZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW1hZ2VcIilcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRvcHRpb25zLnNlY3Rpb24/LnByb3BlcnRpZXMucHVzaChAKVxuXG5cdFx0cHJvcExheWVycy5wdXNoKEApXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUgPSAnJykgLT5cblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEBlbGVtZW50LnNyYyA9IHZhbHVlXG5cdFx0XHRcdEBzZWN0aW9uPy52aXNpYmxlID0gdmFsdWUgaXNudCAnJ1xuXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRzZWN0aW9uOiBvcHRpb25zLnNlY3Rpb25cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgQ29sb3IgQm94XG5cbmNsYXNzIHBDb2xvclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0dmFsdWU6ICcjMjkyOTI5J1xuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBJbnB1dFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BDb2xvcicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRvcHRpb25zLnNlY3Rpb24/LnByb3BlcnRpZXMucHVzaChAKVxuXG5cdFx0cHJvcExheWVycy5wdXNoKEApXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cblx0XHRcdFx0aWYgdmFsdWU/LmNvbG9yIGlzICd0cmFuc3BhcmVudCdcblx0XHRcdFx0XHR2YWx1ZSA9IG51bGxcblxuXHRcdFx0XHRpZiB2YWx1ZT8gYW5kIHZhbHVlIGlzbnQgJydcblx0XHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHRydWVcblxuXHRcdFx0XHRAX3ZhbHVlID0gdmFsdWUgPyAnJ1xuXHRcdFx0XHRAZWxlbWVudC5zdHlsZVsnYmFja2dyb3VuZC1jb2xvciddID0gdmFsdWUgPyAnbm9uZSdcblxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgPT5cblx0XHRcdGlmIG5vdCBzZWNyZXRCb3hcblx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdHNlY3JldEJveC52YWx1ZSA9IEB2YWx1ZVxuXHRcdFx0c2VjcmV0Qm94LnNlbGVjdCgpXG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpXG5cdFx0XHRzZWNyZXRCb3guYmx1cigpXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dmFsdWU6IG9wdGlvbnMudmFsdWVcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBTZWxlY3RcblxuY2xhc3MgcFNlbGVjdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHRzZWxlY3RlZDogMFxuXHRcdFx0b3B0aW9uczogWydyZWQnLCAnd2hpdGUnLCAnYmx1ZSddXG5cdFx0XHRjYWxsYmFjazogKHZhbHVlKSAtPiBudWxsXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBTZWxlY3RcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoYXNWYWx1ZScpXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogb3B0aW9ucy5wYXJlbnRcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dGV4dDogJ+KWvidcblx0XHRcdGZvcjogQGVsZW1lbnRcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdvcHRpb25zJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfb3B0aW9uc1xuXHRcdFx0c2V0OiAoYXJyYXkpIC0+XG5cdFx0XHRcdEBfb3B0aW9ucyA9IGFycmF5XG5cdFx0XHRcdEBtYWtlT3B0aW9ucygpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdzZWxlY3RlZCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX3NlbGVjdGVkXG5cdFx0XHRzZXQ6IChudW0pIC0+XG5cdFx0XHRcdEBfc2VsZWN0ZWQgPSBudW1cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRfb3B0aW9uczogW11cblx0XHRcdF9vcHRpb25FbGVtZW50czogW11cblx0XHRcdG9wdGlvbnM6IG9wdGlvbnMub3B0aW9uc1xuXHRcdFx0Y2FsbGJhY2s6IG9wdGlvbnMuY2FsbGJhY2tcblx0XHRcdHNlbGVjdGVkOiBvcHRpb25zLnNlbGVjdGVkXG5cblx0XHRAZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gb3B0aW9ucy5zZWxlY3RlZFxuXG5cdFx0QGVsZW1lbnQub25jaGFuZ2UgPSA9PiBcblx0XHRcdEBzZWxlY3RlZCA9IEBlbGVtZW50LnNlbGVjdGVkSW5kZXhcblx0XHRcdEBjYWxsYmFjayhAZWxlbWVudC5zZWxlY3RlZEluZGV4KVxuXHRcdFxuXG5cdG1ha2VPcHRpb25zOiA9PlxuXHRcdGZvciBvcHRpb24sIGkgaW4gQF9vcHRpb25FbGVtZW50c1xuXHRcdFx0QGVsZW1lbnQucmVtb3ZlQ2hpbGQob3B0aW9uKVxuXG5cdFx0QF9vcHRpb25FbGVtZW50cyA9IFtdXG5cblx0XHRmb3Igb3B0aW9uLCBpIGluIEBvcHRpb25zXG5cdFx0XHRvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcblx0XHRcdG8udmFsdWUgPSBvcHRpb25cblx0XHRcdG8ubGFiZWwgPSBvcHRpb25cblx0XHRcdG8uaW5uZXJIVE1MID0gb3B0aW9uXG5cdFx0XHRAZWxlbWVudC5hcHBlbmRDaGlsZChvKVxuXG5cdFx0XHRAX29wdGlvbkVsZW1lbnRzLnB1c2gobylcblxuXHRcdFx0aWYgaSBpcyBAc2VsZWN0ZWRcblx0XHRcdFx0QHZhbHVlID0gQGVsZW1lbnQub3B0aW9uc1tAZWxlbWVudC5zZWxlY3RlZEluZGV4XS5sYWJlbFxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBBY2NvcmRpYW5cblxuY2xhc3MgcEFjY29yZGlhbiBleHRlbmRzIHBSb3dcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncEFjY29yZGlhbicpXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIEB0b2dnbGVcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR0b2dnbGVkOiBmYWxzZVxuXG5cdFx0QHVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dGV4dDogJ+KWvydcblx0XHRcdGZvcjogQGVsZW1lbnRcblxuXHRcdEBib2R5ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogJydcblx0XHRAYm9keS5lbGVtZW50LnJlbW92ZUNoaWxkKEBib2R5LmxhYmVsLmVsZW1lbnQpXG5cblx0XHRAZWxlbWVudC5hcHBlbmRDaGlsZChAYm9keS5lbGVtZW50KVxuXHRcdEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncEFjY29yZGlhbkJvZHknKVxuXG5cdFx0QGJvZHkuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldmVudCkgLT4gXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0aWYgYWNjb3JkaW9uc09wZW4gdGhlbiBAdG9nZ2xlKCkgIyBzdGFydCBvcGVuXG5cblx0dG9nZ2xlOiA9PlxuXHRcdEB0b2dnbGVkID0gIUB0b2dnbGVkXG5cblx0XHRpZiBAdG9nZ2xlZFxuXHRcdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuXHRcdFx0QHVuaXQuZWxlbWVudC50ZXh0Q29udGVudCA9ICfilr4nXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKVxuXHRcdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuXHRcdFx0QHVuaXQuZWxlbWVudC50ZXh0Q29udGVudCA9ICfilr8nXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuIFx0LmQ4ODg4OGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4ODg4ODhiYSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiBcdDg4LiAgICBcIicgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ICAgIGA4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuIFx0YFk4ODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIC5kODg4OGIuICAgIGE4OGFhYWE4UCcgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhcbiBcdCAgICAgIGA4YiA4OCcgIGA4OCA4OG9vb29kOCA4OCcgIGBcIlwiICAgICA4OCAgICAgICAgODgnICBgODggODgnICBgODggODhvb29vZDggODhcbiBcdGQ4JyAgIC44UCA4OC4gIC44OCA4OC4gIC4uLiA4OC4gIC4uLiAgICAgODggICAgICAgIDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4XG4gXHQgWTg4ODg4UCAgODhZODg4UCcgYDg4ODg4UCcgYDg4ODg4UCcgICAgIGRQICAgICAgICBgODg4ODhQOCBkUCAgICBkUCBgODg4ODhQJyBkUFxuIFx0ICAgICAgICAgIDg4XG4gXHQgICAgICAgICAgZFBcblxuIyMjXG5cbmNsYXNzIFNwZWNQYW5lbFxuXHRjb25zdHJ1Y3RvcjogLT5cblxuXHRcdEBlbGVtZW50ID0gcGFuZWxcblx0XHRAcHJvcExheWVycyA9IFtdXG5cdFx0QF9wcm9wcyA9IHt9XG5cdFx0QGZyYW1lID0gQGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRAZGVmYXVsdHMgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5fcHJvcGVydHlMaXN0KClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3Byb3BzJyxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIEBfcHJvcHNcblx0XHRcdHNldDogKG9iaikgLT5cblx0XHRcdFx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqXG5cdFx0XHRcdFx0aWYgXy5oYXMoQHByb3BzLCBrZXkpXG5cdFx0XHRcdFx0XHRAcHJvcHNba2V5XSA9IHZhbHVlXG5cblx0XHRAZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaWYgc3RhcnRPcGVuIHRoZW4gJzEnIGVsc2UgJzAnXG5cdFx0QGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBkZXZpY2VcblxuXHRcdCMgU2V0IERldmljZSBPcHRpb25zXG5cblx0XHRkZXZpY2VPcHRpb25zID0gW11cblx0XHRjdXJyZW50U2VsZWN0ZWQgPSB1bmRlZmluZWRcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1xuXHRcdFx0aWYgXy5lbmRzV2l0aChrZXksICdoYW5kJylcblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgbm90IHZhbHVlLm1pblN0dWRpb1ZlcnNpb24/XG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGlmIFV0aWxzLmZyYW1lclN0dWRpb1ZlcnNpb24oKSA+IHZhbHVlLm1heFN0dWRpb1ZlcnNpb25cblx0XHRcdFx0Y29udGludWUgXG5cblx0XHRcdGlmIFV0aWxzLmZyYW1lclN0dWRpb1ZlcnNpb24oKSA8IHZhbHVlLm1pblN0dWRpb1ZlcnNpb25cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0ZGV2aWNlT3B0aW9ucy5wdXNoIChrZXkpXG5cblx0XHRcdGlmIGtleSBpcyBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblx0XHRcdFx0Y3VycmVudFNlbGVjdGVkID0gZGV2aWNlT3B0aW9ucy5sZW5ndGggLSAxXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZnJhbWVyIHNldHRpbmdzXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZGV2aWNlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0RldmljZSdcblxuXHRcdEBkZXZpY2VCb3ggPSBuZXcgcFNlbGVjdFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRvcHRpb25zOiBkZXZpY2VPcHRpb25zXG5cdFx0XHRzZWxlY3RlZDogY3VycmVudFNlbGVjdGVkXG5cdFx0XHRjYWxsYmFjazogKGluZGV4KSA9PlxuXHRcdFx0XHRkZXZpY2VUeXBlID0gZGV2aWNlT3B0aW9uc1tpbmRleF1cblx0XHRcdFx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdFx0XHRcdFxuXHRcdFx0XHRfLmFzc2lnbiB3aW5kb3cubG9jYWxTdG9yYWdlLFxuXHRcdFx0XHRcdGRldmljZVR5cGU6IGRldmljZVR5cGVcblx0XHRcdFx0XHRkZXZpY2U6IGRldmljZVxuXHRcdFx0XHRcdGJnOiBTY3JlZW4uYmFja2dyb3VuZENvbG9yXG5cblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYW5pbWF0aW9uIHNwZWVkXG5cblx0XHRAc3BlZWRSb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1NwZWVkIDEwMCUnXG5cblx0XHRtaW5wID0gcGFyc2VJbnQoMCwgMTApXG5cdFx0bWF4cCA9IHBhcnNlSW50KDEwMCwgMTApXG5cdFx0XG5cdFx0bWludiA9IE1hdGgubG9nKDAuMDAwMDEpXG5cdFx0bWF4diA9IE1hdGgubG9nKDAuMDE2NjY2NjY2NjcpXG5cblx0XHR2U2NhbGUgPSAobWF4di1taW52KSAvIChtYXhwLW1pbnApXG5cblx0XHRAc3BlZWRCb3ggPSBuZXcgcFJhbmdlXG5cdFx0XHRwYXJlbnQ6IEBzcGVlZFJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRhY3Rpb246ICh2YWx1ZSkgPT5cblxuXHRcdFx0XHRkZWx0YSA9IE1hdGguZXhwKG1pbnYgKyB2U2NhbGUqKHZhbHVlLW1pbnApKVxuXHRcdFx0XHRyYXRlID0gKGRlbHRhLygxLzYwKSkqMTAwXG5cdFx0XHRcdHNwYWNlcyA9IGlmIHJhdGUgPCAxIHRoZW4gMiBlbHNlIGlmIHJhdGUgPCAxMCB0aGVuIDEgZWxzZSAwXG5cblx0XHRcdFx0QHNwZWVkUm93LmxhYmVsLnRleHQgPSAnU3BlZWQgJyArIHJhdGUudG9GaXhlZChzcGFjZXMpICsgJyUnXG5cblx0XHRcdFx0RnJhbWVyLkxvb3AuZGVsdGEgPSBkZWx0YVxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGxheWVyIGRldGFpbHNcblxuXHRcdG5ldyBwRGl2aWRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdOYW1lJ1xuXG5cdFx0QG5hbWVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0NvbXBvbmVudCdcblxuXHRcdEBjb21wb25lbnROYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0QGNvbXBvbmVudE5hbWVzUm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdQYXJ0IG9mJ1xuXG5cdFx0QGNvbXBvbmVudE5hbWVzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiBAY29tcG9uZW50TmFtZXNSb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBvc2l0aW9uIGRldGFpbHNcblxuXHRcdG5ldyBwRGl2aWRlclxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBvc2l0aW9uXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ1Bvc2l0aW9uJ1xuXG5cdFx0QHhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAeUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2l6ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdTaXplJ1xuXG5cdFx0QHdpZHRoQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd3J1xuXG5cdFx0QGhlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ2gnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmFja2dyb3VuZCBjb2xvclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCYWNrZ3JvdW5kJ1xuXG5cdFx0QGJhY2tncm91bmRDb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50XG5cblx0XHRAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBncmFkaWVudFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdHcmFkaWVudCdcblxuXHRcdEBncmFkaWVudFN0YXJ0Qm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRzZWN0aW9uOiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRkZWZhdWx0OiBudWxsXG5cblx0XHRAZ3JhZGllbnRFbmRCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRzZWN0aW9uOiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRkZWZhdWx0OiBudWxsXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZ3JhZGllbnQgYW5nbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBncmFkaWVudFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAZ3JhZGllbnRBbmdsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ2EnXG5cdFx0XHRzZWN0aW9uOiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRkZWZhdWx0OiBudWxsXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgb3BhY2l0eVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdPcGFjaXR5J1xuXG5cdFx0QG9wYWNpdHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0RpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlciBwcm9wZXJ0aWVzXG5cblx0XHRAYm9yZGVyUHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYm9yZGVyXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJ0JvcmRlcidcblx0XHRcdHBhcmVudDogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdEBib3JkZXJDb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGJvcmRlcldpZHRoQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3cnXG5cdFx0XHRzZWN0aW9uOiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHJhZGl1c1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdSYWRpdXMnXG5cdFx0XHRwYXJlbnQ6IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHRAYm9yZGVyUmFkaXVzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0c2VjdGlvbjogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzaGFkb3dcblxuXG5cdFx0QHNoYWRvd1Byb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdTaGFkb3cnXG5cblx0XHRAc2hhZG93Q29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cblx0XHRAc2hhZG93U3ByZWFkQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdzJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBzaGFkb3dYQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdEBzaGFkb3dZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBzaGFkb3dCbHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ2InXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0IHN0eWxlc1xuXG5cdFx0QHRleHRQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmb250IGZhbWlseVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnRm9udCdcblxuXHRcdEBmb250RmFtaWx5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0NvbG9yJ1xuXG5cdFx0QGNvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cblx0XHRAZm9udFNpemVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgd2VpZ2h0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdTdHlsZSdcblxuXHRcdEBmb250U3R5bGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBmb250V2VpZ2h0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBhbGlnblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnQWxpZ24nXG5cblx0XHRAdGV4dEFsaWduQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnbGVmdCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzcGFjaW5nXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdTcGFjaW5nJ1xuXG5cdFx0QGxldHRlclNwYWNpbmdCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ2x0J1xuXHRcdFx0ZGVmYXVsdDogJzEnXG5cblx0XHRAbGluZUhlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ2xuJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRleHRcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ1RleHQnXG5cblx0XHRAdGV4dEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdHJhbnNmb3JtIHByb3BlcnRpZXNcblxuXG5cdFx0QHRyYW5zZm9ybXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QHRyYW5zZm9ybXNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdUcmFuc2Zvcm1zJ1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2NhbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2NhbGUnXG5cblx0XHRAc2NhbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBzY2FsZVhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0QHNjYWxlWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHJvdGF0aW9uXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1JvdGF0ZSdcblxuXHRcdEByb3RhdGlvbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHJvdGF0aW9uWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAcm90YXRpb25ZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBvcmlnaW5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnT3JpZ2luJ1xuXG5cdFx0QG9yaWdpblhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcwLjUwJ1xuXG5cdFx0QG9yaWdpbllCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMC41MCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBza2V3XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NrZXcnXG5cblx0XHRAc2tld0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNrZXdYQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdEBza2V3WUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBlcnNwZWN0aXZlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1BlcnNwZWN0aXZlJ1xuXG5cdFx0QHBlcnNwZWN0aXZlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZmlsdGVycyBwcm9wZXJ0aWVzXG5cblx0XHRAZmlsdGVyc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAZmlsdGVyc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0RpdlxuXHRcdFx0dGV4dDogJ0ZpbHRlcnMnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmx1clxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCbHVyJ1xuXG5cdFx0QGJsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYnJpZ2h0bmVzc1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCcmlnaHRuZXNzJ1xuXG5cdFx0QGJyaWdodG5lc3NCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBjb250cmFzdFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdDb250cmFzdCdcblxuXHRcdEBjb250cmFzdEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYXlzY2FsZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdHcmF5c2NhbGUnXG5cblx0XHRAZ3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGh1ZXJvdGF0ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdodWVSb3RhdGUnXG5cblx0XHRAaHVlUm90YXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGludmVydFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdJbnZlcnQnXG5cblx0XHRAaW52ZXJ0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNhdHVyYXRlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QHNhdHVyYXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2VwaWFcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnU2VwaWEnXG5cblx0XHRAc2VwaWFCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZCBmaWx0ZXJzXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBlZmZlY3RzIHByb3BlcnRpZXNcblxuXG5cdFx0QGVmZmVjdHNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGVmZmVjdHNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdFZmZlY3RzJ1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmFja2dyb3VuZCBmaWx0ZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsZW5kaW5nJ1xuXG5cdFx0QGJsZW5kaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICdub3JtYWwnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsdXInXG5cblx0XHRAYmFja2dyb3VuZEJsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQnJpZ2h0bmVzcydcblxuXHRcdEBiYWNrZ3JvdW5kQnJpZ2h0bmVzc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QGJhY2tncm91bmRTYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ2h1ZVJvdGF0ZSdcblxuXHRcdEBiYWNrZ3JvdW5kSHVlUm90YXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0NvbnRyYXN0J1xuXG5cdFx0QGJhY2tncm91bmRDb250cmFzdEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0ludmVydCdcblxuXHRcdEBiYWNrZ3JvdW5kSW52ZXJ0Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0dyYXlzY2FsZSdcblxuXHRcdEBiYWNrZ3JvdW5kR3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NlcGlhJ1xuXG5cdFx0QGJhY2tncm91bmRTZXBpYUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYW5pbWF0aW9uIHByb3BlcnRpZXNcblxuXG5cdFx0QGFuaW1zRGl2ID0gbmV3IHBEaXZcblxuXHRcdEBhbmltc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ0FuaW1hdGlvbnMnXG5cdFx0XHRwYXJlbnQ6IEBhbmltc0RpdlxuXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBldmVudCBsaXN0ZW5lciBwcm9wZXJ0aWVzXG5cblxuXHRcdEBldmVudExpc3RlbmVyc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAZXZlbnRMaXN0ZW5lcnNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdFdmVudCBMaXN0ZW5lcnMnXG5cdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0RpdlxuXG5cblxuXHRcdCMgaW1hZ2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBpbWFnZVByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRwYXJlbnQ6IEBpbWFnZVByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBpbWFnZVxuXG5cdFx0QGltYWdlQm94ID0gbmV3IHBJbWFnZVxuXHRcdFx0cGFyZW50OiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cdFx0XHRzZWN0aW9uOiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cblxuXHRcdCMgc2NyZWVuc2hvdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzY3JlZW5zaG90RGl2ID0gbmV3IHBEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzY3JlZW5zaG90XG5cblx0XHRAc2NyZWVuc2hvdEJveCA9IG5ldyBwSW1hZ2Vcblx0XHRcdHBhcmVudDogQHNjcmVlbnNob3REaXZcblx0XHRcdHNlY3Rpb246IEBzY3JlZW5zaG90RGl2XG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwbGFjZWhvbGRlcnNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdHJvdy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICc2NHB4J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNvY2lhbCBtZWRpYSBsaW5rc1xuXG5cdFx0QHNvY2lhbE1lZGlhUm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2LmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAbGlua2VkaW5JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQGxpbmtlZGluSWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vaW4vc3RldmVydWl6b2tcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaWQ9XCJsaW5rZWRpbl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMTEgMTloLTN2LTExaDN2MTF6bS0xLjUtMTIuMjY4Yy0uOTY2IDAtMS43NS0uNzktMS43NS0xLjc2NHMuNzg0LTEuNzY0IDEuNzUtMS43NjQgMS43NS43OSAxLjc1IDEuNzY0LS43ODMgMS43NjQtMS43NSAxLjc2NHptMTMuNSAxMi4yNjhoLTN2LTUuNjA0YzAtMy4zNjgtNC0zLjExMy00IDB2NS42MDRoLTN2LTExaDN2MS43NjVjMS4zOTYtMi41ODYgNy0yLjc3NyA3IDIuNDc2djYuNzU5elwiLz48L3N2Zz4nXG5cblx0XHRAZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEBnaXRodWJJY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpvay9nb3RjaGFcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAdHdpdHRlckljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblxuXHRcdGZvciBlbGVtZW50IGluIFtAbGlua2VkaW5JY29uLCBAZ2l0aHViSWNvbiwgQHR3aXR0ZXJJY29uXVxuXHRcdFx0QHNvY2lhbE1lZGlhUm93LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudClcblx0XHRcdEBzb2NpYWxNZWRpYVJvdy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvY2lhbExpbmtzJylcblxuXHRcdEBoaWRlRGl2cygpXG5cblx0Y2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9uczogKGFuaW1hdGlvbnMpID0+XG5cdFx0Y2hpbGQgPSBAYW5pbXNBY2NvLmJvZHkuZWxlbWVudC5jaGlsZE5vZGVzWzBdXG5cblx0XHRpZiBub3QgY2hpbGRcblx0XHRcdEBzaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAYW5pbXNBY2NvLmJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZClcblx0XHRAY2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXG5cdGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzOiAoZXZlbnRMaXN0ZW5lcnMpID0+XG5cblx0XHRjaGlsZCA9IEBldmVudExpc3RlbmVyc0FjY28uYm9keS5lbGVtZW50LmNoaWxkTm9kZXNbMF1cblxuXHRcdGlmIG5vdCBjaGlsZFxuXHRcdFx0QHNob3dFdmVudExpc3RlbmVycyhldmVudExpc3RlbmVycylcblx0XHRcdHJldHVyblxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG5cdFx0QGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzKGV2ZW50TGlzdGVuZXJzKVxuXG5cdHNob3dFdmVudExpc3RlbmVyczogKGV2ZW50TGlzdGVuZXJzID0gW10pID0+XG5cblx0XHRkZWZhdWx0cyA9IFtcblx0XHRcdFwiZnVuY3Rpb24gKCl7cmV0dXJuIGZuLmFwcGx5KG1lLGFyZ3VtZW50cyl9XCIsIFxuXHRcdFx0XCJmdW5jdGlvbiAoKXtyZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyl9XCIsIFxuXHRcdFx0XCJmdW5jdGlvbiAoZXZlbnQpe3JldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVwiLFxuXHRcdFx0XCJmdW5jdGlvbiAoKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9XCIsXG5cdFx0XHQnZnVuY3Rpb24gZGVib3VuY2VkKCl7dmFyIHRpbWU9bm93KCksaXNJbnZva2luZz1zaG91bGRJbnZva2UodGltZSk7aWYobGFzdEFyZ3M9YXJndW1lbnRzLGxhc3RUaGlzPXRoaXMsbGFzdENhbGxUaW1lPXRpbWUsaXNJbnZva2luZyl7aWYodGltZXJJZD09PXVuZGVmaW5lZClyZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtpZihtYXhpbmcpcmV0dXJuIHRpbWVySWQ9c2V0VGltZW91dCh0aW1lckV4cGlyZWQsd2FpdCksaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpfXJldHVybiB0aW1lcklkPT09dW5kZWZpbmVkJiYodGltZXJJZD1zZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCx3YWl0KSkscmVzdWx0fScsXG5cdFx0XHQnZnVuY3Rpb24gKHZhbHVlKXtpZihudWxsIT09dmFsdWUpcmV0dXJuXCJmb250U2l6ZVwiIT09cHJvcGVydHkmJlwiZm9udFwiIT09cHJvcGVydHkmJl90aGlzLl9zdHlsZWRUZXh0LnJlc2V0U3R5bGUocHJvcGVydHkpLF90aGlzLnJlbmRlclRleHQoKX0nLFxuXHRcdF1cblxuXHRcdHJlYWxMaXN0ZW5lcnMgPSAwXG5cblx0XHRmb3IgbGlzdGVuZXIsIGkgaW4gZXZlbnRMaXN0ZW5lcnNcblxuXHRcdFx0Y29udGludWUgaWYgXy5ldmVyeShsaXN0ZW5lci5ldmVudHMsIChlKSAtPiBfLmluY2x1ZGVzKGRlZmF1bHRzLCBlLmZ1bmN0aW9uKSlcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBsaXN0ZW5lclxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnXCInICsgbGlzdGVuZXIubGlzdGVuZXIgKyAnXCInXG5cdFx0XHRcdGJvbGQ6IHRydWVcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBldmVudHNcblxuXHRcdFx0Zm9yIGV2ZW50LCBlIGluIGxpc3RlbmVyLmV2ZW50c1xuXG5cdFx0XHRcdGNvbnRpbnVlIGlmIF8uaW5jbHVkZXMoZGVmYXVsdHMsIGV2ZW50LmZ1bmN0aW9uKVxuXG5cdFx0XHRcdHJlYWxMaXN0ZW5lcnMrK1xuXG5cdFx0XHRcdCMgbmFtZVxuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnTmFtZSdcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQubmFtZSA/ICcnXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBldmVudC5uYW1lIGlzbnQgJ3VuZGVmaW5lZCdcblxuXHRcdFx0XHQjIGZ1bmN0aW9uXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdGdW5jdGlvbidcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQuZnVuY3Rpb25cblx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0IyBPbmNlXG5cblx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXHRcdFx0XHRcdHRleHQ6ICdPbmNlJ1xuXHRcdFx0XHRcblx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdHZhbHVlOiBldmVudC5vbmNlXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBldmVudC5uYW1lIGlzbnQgJ2ZhbHNlJ1xuXG5cdFx0XHRcdHVubGVzcyBlIGlzIGxpc3RlbmVyLmV2ZW50cy5sZW5ndGggLSAxXG5cdFx0XHRcdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXG5cdFx0XHR1bmxlc3MgaSBpcyBldmVudExpc3RlbmVycy5sZW5ndGggLSAxXG5cdFx0XHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cblxuXHRcdCMgc2V0IGNvbG9yXG5cblx0XHRpZiByZWFsTGlzdGVuZXJzIGlzIDBcblx0XHRcdEBldmVudExpc3RlbmVyc0FjY28uY29sb3IgPSAnIzg4ODg4OCdcblx0XHRcdHJldHVyblxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzQWNjby5jb2xvciA9ICcjRkZGRkZGJ1xuXG5cdHNob3dBbmltYXRpb25zOiAoYW5pbWF0aW9ucykgPT5cblx0XHRcblx0XHRAYW5pbXNBY2NvLmNvbG9yID0gaWYgYW5pbWF0aW9ucy5sZW5ndGggPiAwIHRoZW4gJyNGRkYnIGVsc2UgJyM4ODg4ODgnXG5cdFxuXHRcdGZvciBhbmltLCBpIGluIGFuaW1hdGlvbnNcblxuXHRcdFx0cHJvcGVydGllcyA9IGFuaW0ucHJvcGVydGllc1xuXHRcdFx0b3B0aW9ucyA9IGFuaW0ub3B0aW9uc1xuXHRcdFx0c3RhdGVBID0gYW5pbS5fc3RhdGVBXG5cdFx0XHRzdGF0ZUIgPSBhbmltLl9zdGF0ZUJcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0XHQjIGFuaW1hdGlvblxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnQW5pbWF0aW9uICcgKyAoaSArIDEpXG5cdFx0XHRcdGJvbGQ6IHRydWVcblxuXHRcdFx0ZnJvbVVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRcdHBhcmVudDogcm93IFxuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR0ZXh0OiAnZnJvbSdcblxuXHRcdFx0dG9Vbml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdHRleHQ6ICd0bydcblxuXHRcdFx0Zm9yIGVsZW1lbnQgaW4gW2Zyb21Vbml0LmVsZW1lbnQsIHRvVW5pdC5lbGVtZW50XVxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FsaWduTGVmdCcpXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIHByb3BlcnRpZXNcblxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgcHJvcGVydGllc1xuXG5cdFx0XHRcdGlmIENvbG9yLmlzQ29sb3JPYmplY3QodmFsdWUpIG9yIENvbG9yLmlzQ29sb3IodmFsdWUpXG5cblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6IF8uc3RhcnRDYXNlKGtleSlcblxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdGVsc2UgaWYga2V5IGlzICdncmFkaWVudCdcblxuXHRcdFx0XHRcdCMgc3RhcnRcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIFN0YXJ0J1xuXHRcdFx0XHRcblx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldPy5zdGFydFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5zdGFydFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyBlbmRcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIEVuZCdcblx0XHRcdFx0XG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XT8uZW5kXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV0/LmVuZFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyBhbmdsZVxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgQW5nbGUnXG5cdFx0XHRcdFxuXHRcdFx0XHRcdCMgZnJvbSBcblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldPy5hbmdsZVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5hbmdsZVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHRcdFx0dGV4dDogXy5zdGFydENhc2Uoa2V5KVxuXG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIG9wdGlvbnNcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJ09wdGlvbnMnXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR1bml0OiAncydcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMudGltZVxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0dW5pdDogJ2QnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmRlbGF5XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJydcblxuXHRcdFx0IyByZXBlYXRcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dW5pdDogJ3InXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLnJlcGVhdFxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdCMgdGltZVxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0dW5pdDogJ2wnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLmxvb3Bpbmdcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHR1bmxlc3MgaSBpcyBhbmltYXRpb25zLmxlbmd0aCAtIDFcblx0XHRcdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblxuXHRcdFxuXHRzaG93UHJvcGVydGllczogKGxheWVyLCBjdXN0b21Qcm9wcykgPT5cblxuXHRcdEBzY3JvbGxUb3AgPSBAZWxlbWVudC5zY3JvbGxUb3BcblxuXHRcdHByb3BzID0gbGF5ZXIucHJvcHNcblx0XHRfLmFzc2lnbiBwcm9wcywgY3VzdG9tUHJvcHNcblxuXHRcdGRlZmF1bHRzID0gbGF5ZXIuX3Byb3BlcnR5TGlzdCgpXG5cblx0XHRfLmFzc2lnbiBkZWZhdWx0cyxcblx0XHRcdHJvdGF0aW9uOiBkZWZhdWx0cy5yb3RhdGlvblpcblx0XHRcdGJsZW5kaW5nOiB7ZGVmYXVsdDogJ25vcm1hbCd9XG5cblx0XHRAaGlkZURpdnMoKVxuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgXy5tZXJnZShsYXllci5wcm9wcywgY3VzdG9tUHJvcHMpXG5cblx0XHRcdHByb3BMYXllciA9IEBba2V5ICsgJ0JveCddXG5cblx0XHRcdGlmIG5vdCBwcm9wTGF5ZXJcblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0ZGVmID0gZGVmYXVsdHNba2V5XT8uZGVmYXVsdFxuXHRcdFx0XG5cdFx0XHRAc2hvd1Byb3BlcnR5KGtleSwgdmFsdWUsIHByb3BMYXllciwgZGVmKVxuXG5cdFx0QHNob3dPdmVycmlkZUluQWNjbyhAZWZmZWN0c0RpdiwgQGVmZmVjdHNBY2NvKVxuXHRcdEBzaG93T3ZlcnJpZGVJbkFjY28oQGZpbHRlcnNEaXYsIEBmaWx0ZXJzQWNjbylcblx0XHRAc2hvd092ZXJyaWRlSW5BY2NvKEB0cmFuc2Zvcm1zRGl2LCBAdHJhbnNmb3Jtc0FjY28pXG5cdFx0XHRcdFxuXHRcdEBlbGVtZW50LnNjcm9sbFRvcCA9IEBzY3JvbGxUb3BcblxuXHRzaG93T3ZlcnJpZGVJbkFjY286IChkaXYsIGFjY28pIC0+XG5cdFx0YWNjby5jb2xvciA9ICcjODg4ODg4J1xuXHRcdGZvciBwcm9wTGF5ZXIgaW4gZGl2LnByb3BlcnRpZXNcblx0XHRcdGlmIHByb3BMYXllci52YWx1ZT8gYW5kIHByb3BMYXllci52YWx1ZSBpc250IHByb3BMYXllci5kZWZhdWx0XG5cdFx0XHRcdGFjY28uY29sb3IgPSAnI0ZGRidcblxuXHRzaG93UHJvcGVydHk6IChrZXksIHZhbHVlLCBwcm9wTGF5ZXIsIGRlZikgPT5cblxuXHRcdHJldHVybiBpZiB2YWx1ZSBpcyBwcm9wTGF5ZXIudmFsdWVcblxuXHRcdHByb3BMYXllci5pc0RlZmF1bHQgPSBmYWxzZVxuXG5cdFx0aWYgbm90IHZhbHVlPyBvciBfLmlzTmFOKHZhbHVlKSBvciB2YWx1ZSBpcyBkZWZcblx0XHRcdHZhbHVlID0gZGVmID8gJydcblx0XHRcdHByb3BMYXllci5pc0RlZmF1bHQgPSB0cnVlXG5cblx0XHQjIGNvbG9yXG5cdFx0aWYgQ29sb3IuaXNDb2xvck9iamVjdCh2YWx1ZSlcblx0XHRcdHZhbHVlID0gdmFsdWUudG9Ic2xTdHJpbmcoKVxuXG5cdFx0IyBncmFkaWVudFxuXHRcdGlmIHZhbHVlPy5jb25zdHJ1Y3Rvcj8ubmFtZSBpcyAnR3JhZGllbnQnXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSAnJ1xuXHRcdFx0cmV0dXJuXG5cblx0XHQjIHN0cmluZ1xuXHRcdGlmIHR5cGVvZiB2YWx1ZSBpcyAnc3RyaW5nJ1xuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVyblxuXG5cdFx0dmFsdWUgPSB2YWx1ZS50b1N0cmluZygpXG5cblx0XHQjIGZsb2F0XG5cdFx0aWYgdmFsdWUuaW5kZXhPZignLicpIGlzbnQgLTFcblx0XHRcdHByb3BMYXllci52YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpLnRvRml4ZWQoMilcblx0XHRcdHJldHVyblxuXG5cdFx0IyBudW1lclxuXHRcdHByb3BMYXllci52YWx1ZSA9IHBhcnNlSW50KHZhbHVlLCAxMCkudG9GaXhlZCgpXG5cblx0aGlkZURpdnM6ID0+XG5cdFx0Zm9yIGRpdiBpbiBbXG5cdFx0XHRAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHRleHRQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHNoYWRvd1Byb3BlcnRpZXNEaXYsXG5cdFx0XHRAYm9yZGVyUHJvcGVydGllc0Rpdixcblx0XHRcdEBpbWFnZVByb3BlcnRpZXNEaXYsXG5cdFx0XHRAc2NyZWVuc2hvdERpdlxuXHRcdF1cblx0XHRcdGRpdi52aXNpYmxlID0gZmFsc2VcblxuXG5cblxuXG5cblxuXG5wcm9wTGF5ZXJzID0gW11cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQgLjg4ODg4LiAgICAgICAgICAgICBkUCAgICAgICAgICAgIGRQXG5cdGQ4JyAgIGA4OCAgICAgICAgICAgIDg4ICAgICAgICAgICAgODhcblx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuXHQ4OCAgIFlQODggODgnICBgODggICA4OCAgIDg4JyAgYFwiXCIgODgnICBgODggODgnICBgODhcblx0WTguICAgLjg4IDg4LiAgLjg4ICAgODggICA4OC4gIC4uLiA4OCAgICA4OCA4OC4gIC44OFxuXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4ODg4XG5cbiMjIyBcblxuXG5jbGFzcyBHb3RjaGFcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRAc3BlY1BhbmVsID0gbmV3IFNwZWNQYW5lbFxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0Y29sb3I6ICdyZ2JhKDcyLCAyMDcsIDI1NSwgMS4wMDApJ1xuXHRcdFx0c2VsZWN0ZWRDb2xvcjogJ3JnYmEoMjU1LCAxLCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlY29uZGFyeUNvbG9yOiAnI0ZGRkZGRidcblx0XHRcdGZvbnRGYW1pbHk6ICdNZW5sbydcblx0XHRcdGZvbnRTaXplOiAnMTAnXG5cdFx0XHRmb250V2VpZ2h0OiAnNTAwJ1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0XG5cdFx0XHRwYWRkaW5nOiB7dG9wOiAxLCBib3R0b206IDEsIGxlZnQ6IDMsIHJpZ2h0OiAzfVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdGNvbG9yOiBvcHRpb25zLmNvbG9yXG5cdFx0XHRzZWxlY3RlZENvbG9yOiBvcHRpb25zLnNlbGVjdGVkQ29sb3Jcblx0XHRcdHNlY29uZGFyeUNvbG9yOiBvcHRpb25zLnNlY29uZGFyeUNvbG9yXG5cdFx0XHRmb250RmFtaWx5OiBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRcdGZvbnRTaXplOiBvcHRpb25zLmZvbnRTaXplXG5cdFx0XHRmb250V2VpZ2h0OiBvcHRpb25zLmZvbnRXZWlnaHRcblx0XHRcdHNoYXBlczogW11cblx0XHRcdGJvcmRlclJhZGl1czogb3B0aW9ucy5ib3JkZXJSYWRpdXNcblx0XHRcdHBhZGRpbmc6IG9wdGlvbnMucGFkZGluZ1xuXHRcdFx0Zm9jdXNlZEVsZW1lbnQ6IHVuZGVmaW5lZFxuXHRcdFx0ZW5hYmxlZDogZmFsc2Vcblx0XHRcdHNjcmVlbkVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0RldmljZUNvbXBvbmVudFBvcnQnKVswXVxuXHRcdFx0bGF5ZXJzOiBbXVxuXHRcdFx0Y29udGFpbmVyczogW11cblx0XHRcdHRpbWVyOiB1bmRlZmluZWRcblx0XHRcdF9vbmx5VmlzaWJsZTogdHJ1ZVxuXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBAdG9nZ2xlKVxuXHRcdEZyYW1lci5DdXJyZW50Q29udGV4dC5kb21FdmVudE1hbmFnZXIud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgQHVwZGF0ZSlcblxuXHRcdEBjb250ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlU2NyZWVuJylbMF1cblx0XHRAY29udGV4dC5jbGFzc0xpc3QuYWRkKCdob3ZlckNvbnRleHQnKVxuXHRcdEBjb250ZXh0LmNoaWxkTm9kZXNbMl0uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFwib25seVZpc2libGVcIixcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfb25seVZpc2libGVcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdHJldHVybiBpZiB0eXBlb2YgYm9vbCBpc250ICdib29sZWFuJ1xuXHRcdFx0XHRAX29ubHlWaXNpYmxlID0gYm9vbFxuXG5cdFx0RnJhbWVyLkRldmljZS5vbiBcImNoYW5nZTpkZXZpY2VUeXBlXCIsID0+XG5cdFx0XHRVdGlscy5kZWxheSAwLCBAdXBkYXRlXG5cblx0dG9nZ2xlOiAoZXZlbnQsIG9wZW4pID0+XG5cdFx0IyByZXR1cm4gaWYgRnJhbWVyLkRldmljZS5oYW5kcy5pc0FuaW1hdGluZ1xuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiYFwiIG9yIGV2ZW50LmtleSBpcyBcIjxcIiBvciBvcGVuIGlzIHRydWVcblx0XHRcdGlmIEBvcGVuZWQgdGhlbiBAZGlzYWJsZSgpIGVsc2UgQGVuYWJsZSgpXG5cdFx0XHRAb3BlbmVkID0gIUBvcGVuZWRcblx0XHRcdHJldHVyblxuXG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiL1wiIG9yIGV2ZW50LmtleSBpcyBcIj5cIlxuXHRcdFx0QHNldFNlbGVjdGVkTGF5ZXIoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCIuXCJcblx0XHRcdEBob3ZlcmVkTGF5ZXI/LmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBldmVudC5rZXkgaXMgXCJcXFxcXCJcblx0XHRcdEBfbGFzdFNwZWVkID89IDFcblx0XHRcdHRoaXNTcGVlZCA9IEBzcGVjUGFuZWwuc3BlZWRCb3guZWxlbWVudC52YWx1ZVxuXG5cdFx0XHRpZiB0aGlzU3BlZWQgaXMgXCIwXCJcblx0XHRcdFx0QHNwZWNQYW5lbC5zcGVlZEJveC5lbGVtZW50LnZhbHVlID0gQF9sYXN0U3BlZWRcblx0XHRcdFx0QHNwZWNQYW5lbC5zcGVlZEJveC5hY3Rpb24oQF9sYXN0U3BlZWQpXG5cdFx0XHRlbHNlIFxuXHRcdFx0XHRAc3BlY1BhbmVsLnNwZWVkQm94LmVsZW1lbnQudmFsdWUgPSAwXG5cdFx0XHRcdEZyYW1lci5Mb29wLmRlbHRhID0gLjAwMDAwMDAwMDAwMDAwMDAwMDAwMVxuXHRcdFx0XHRAX2xhc3RTcGVlZCA9IHRoaXNTcGVlZFxuXG5cdCMgb3BlbiB0aGUgcGFuZWwsIHN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG5cdGVuYWJsZTogPT5cblx0XHRAX2NhbnZhc0NvbG9yID0gQ2FudmFzLmJhY2tncm91bmRDb2xvclxuXHRcdHN2Z0NvbnRleHQuc2V0Q29udGV4dCgpXG5cblx0XHRAdHJhbnNpdGlvbih0cnVlKVxuXG5cdFx0aWYgQHRpbWVyPyB0aGVuIGNsZWFySW50ZXJ2YWwgQHRpbWVyXG5cdFx0QHRpbWVyID0gVXRpbHMuaW50ZXJ2YWwgMS8zMCwgQGZvY3VzXG5cblx0ZGlzYWJsZTogPT5cblx0XHRAdW5mb2N1cygpXG5cdFx0QGVuYWJsZWQgPSBmYWxzZVxuXG5cdFx0QHRyYW5zaXRpb24oZmFsc2UpXG5cblx0XHRpZiBAdGltZXI/IHRoZW4gY2xlYXJJbnRlcnZhbCBAdGltZXJcblxuXHR0cmFuc2l0aW9uOiAob3BlbiA9IHRydWUsIHNlY29uZHMgPSAuNSkgPT5cblx0XHRoYW5kcyA9IEZyYW1lci5EZXZpY2UuaGFuZHNcblxuXHRcdGhhbmRzLm9uIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cblx0XHRoYW5kcy5vbmNlIEV2ZW50cy5BbmltYXRpb25FbmQsID0+XG5cdFx0XHRoYW5kcy5vZmYgXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblx0XHRcdEBlbmFibGVkID0gQG9wZW5lZCA9IG9wZW5cblxuXHRcdFx0aWYgb3BlblxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU91dCwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZC5vbiBFdmVudHMuTW91c2VPdmVyLCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmJhY2tncm91bmQub2ZmIEV2ZW50cy5Nb3VzZU92ZXIsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLkNsaWNrLCBAc2V0U2VsZWN0ZWRMYXllclxuXG5cdFx0XHRAZm9jdXMoKVxuXG5cdFx0QF9zdGFydFBvc2l0aW9uID0gRnJhbWVyLkRldmljZS5oYW5kcy54XG5cblx0XHRtaWRYID0gaGFuZHMuX2NvbnRleHQuaW5uZXJXaWR0aCAvIDJcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMuYW5pbWF0ZVxuXHRcdFx0bWlkWDogaWYgb3BlbiB0aGVuIG1pZFggLSAxMTIgZWxzZSBtaWRYXG5cdFx0XHRvcHRpb25zOlxuXHRcdFx0XHR0aW1lOiBzZWNvbmRzXG5cdFx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMTApXG5cblx0c2hvd1RyYW5zaXRpb246ID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRvcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFggLSA1NiwgbWlkWCAtIDExMl0sIFxuXHRcdFx0WzAsIDFdLCBcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRmYWN0b3IgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdGhhbmRzLm1pZFgsXG5cdFx0XHRbbWlkWCwgbWlkWCAtIDExMl0sXG5cdFx0XHRbMCwgMV0sXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0QHNwZWNQYW5lbC5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IENvbG9yLm1peCBAX2NhbnZhc0NvbG9yLCdyZ2JhKDMwLCAzMCwgMzAsIDEuMDAwKScsIGZhY3RvclxuXG5cdCMgdXBkYXRlIHdoZW4gc2NyZWVuIHNpemUgY2hhbmdlc1xuXHR1cGRhdGU6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAb3BlbmVkXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLm1pZFggLT0gMTIyXG5cblx0XHRzdmdDb250ZXh0LnNldENvbnRleHQoKVxuXHRcdEBmb2N1cygpXG5cblx0IyBnZXQgdGhlIGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudFxuXHRnZXREaW1lbnNpb25zOiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblx0XHRkID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0ZGltZW5zaW9ucyA9IHtcblx0XHRcdHg6IGQubGVmdFxuXHRcdFx0eTogZC50b3Bcblx0XHRcdHdpZHRoOiBkLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGQuaGVpZ2h0XG5cdFx0XHRtaWRYOiBkLmxlZnQgKyAoZC53aWR0aCAvIDIpXG5cdFx0XHRtaWRZOiBkLnRvcCArIChkLmhlaWdodCAvIDIpXG5cdFx0XHRtYXhYOiBkLmxlZnQgKyBkLndpZHRoXG5cdFx0XHRtYXhZOiBkLnRvcCArIGQuaGVpZ2h0XG5cdFx0XHRmcmFtZTogZFxuXHRcdH1cblxuXHRcdHJldHVybiBkaW1lbnNpb25zXG5cblx0IyBtYWtlIGEgcmVsYXRpdmUgZGlzdGFuY2UgbGluZVxuXHRtYWtlTGluZTogKHBvaW50QSwgcG9pbnRCLCBsYWJlbCA9IHRydWUpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsaW5lID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV19IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGlmIHBvaW50QVswXSBpcyBwb2ludEJbMF1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdIC0gNX0gI3twb2ludEFbMV19IEwgI3twb2ludEFbMF0gKyA1fSAje3BvaW50QVsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF0gLSA1fSAje3BvaW50QlsxXX0gTCAje3BvaW50QlswXSArIDV9ICN7cG9pbnRCWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRlbHNlIGlmIHBvaW50QVsxXSBpcyBwb2ludEJbMV1cblxuXHRcdFx0Y2FwQSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSAtIDV9IEwgI3twb2ludEFbMF19ICN7cG9pbnRBWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0XHRjYXBCID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEJbMF19ICN7cG9pbnRCWzFdIC0gNX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIHRoZSBsYWJlbCBib3ggZm9yIGRpc3RhbmNlIGxpbmVzXG5cdG1ha2VMYWJlbDogKHgsIHksIHRleHQpID0+XG5cblx0XHRjb2xvciA9IGlmIEBzZWxlY3RlZExheWVyPyB0aGVuIEBzZWxlY3RlZENvbG9yIGVsc2UgQGNvbG9yXG5cblx0XHRsYWJlbCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3RleHQnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IHhcblx0XHRcdHk6IHlcblx0XHRcdCdmb250LWZhbWlseSc6IEBmb250RmFtaWx5XG5cdFx0XHQnZm9udC1zaXplJzogQGZvbnRTaXplXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBAZm9udFdlaWdodFxuXHRcdFx0ZmlsbDogQHNlY29uZGFyeUNvbG9yXG5cdFx0XHR0ZXh0OiBNYXRoLmZsb29yKHRleHQgLyBAcmF0aW8pXG5cblx0XHRsID0gQGdldERpbWVuc2lvbnMobGFiZWwuZWxlbWVudClcblxuXHRcdGxhYmVsLnggPSB4IC0gbC53aWR0aCAvIDJcblx0XHRsYWJlbC55ID0geSArIGwuaGVpZ2h0IC8gNCAtIDFcblxuXHRcdGJveCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IGxhYmVsLnggLSBAcGFkZGluZy5sZWZ0XG5cdFx0XHR5OiBsYWJlbC55IC0gbC5oZWlnaHQgKyAxXG5cdFx0XHR3aWR0aDogbC53aWR0aCArIEBwYWRkaW5nLmxlZnQgKyBAcGFkZGluZy5yaWdodFxuXHRcdFx0aGVpZ2h0OiBsLmhlaWdodCArIEBwYWRkaW5nLnRvcCArIEBwYWRkaW5nLmJvdHRvbSArIDFcblx0XHRcdHJ4OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRyeTogQGJvcmRlclJhZGl1c1xuXHRcdFx0ZmlsbDogbmV3IENvbG9yKGNvbG9yKS5kYXJrZW4oNDApXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGxhYmVsLnNob3coKVxuXG5cdCMgbWFrZSB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlIGZvciBzZWxlY3RlZCAvIGhvdmVyZWQgZWxlbWVudHNcblx0bWFrZVJlY3RPdmVybGF5czogKHNlbGVjdGVkTGF5ZXIsIHMsIGhvdmVyZWRMYXllciwgaCkgPT5cblx0XHRpZiBub3QgcyBvciBub3QgaFxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBob3ZlcmVkTGF5ZXIgaXMgc2VsZWN0ZWRMYXllclxuXHRcdFx0aG92ZXJlZExheWVyID0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKC4yKVxuXG5cdFx0aWYgaG92ZXJlZExheWVyIGlzIEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSgwKVxuXG5cdFx0aG92ZXJlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBoLnhcblx0XHRcdHk6IGgueVxuXHRcdFx0d2lkdGg6IGgud2lkdGhcblx0XHRcdGhlaWdodDogaC5oZWlnaHRcblx0XHRcdHN0cm9rZTogQGNvbG9yXG5cdFx0XHRmaWxsOiBob3ZlckZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoLjIpXG5cdFx0XG5cdFx0aWYgc2VsZWN0ZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoMClcblxuXHRcdHNlbGVjdGVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIGRhc2hlZCBsaW5lcyBmcm9tIGJvdW5kaW5nIHJlY3QgdG8gc2NyZWVuIGVkZ2Vcblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWRMYXllciwgaG92ZXJlZExheWVyKSA9PlxuXG5cdFx0cyA9IEBnZXREaW1lbnNpb25zKHNlbGVjdGVkTGF5ZXIuX2VsZW1lbnQpXG5cdFx0aCA9IEBnZXREaW1lbnNpb25zKGhvdmVyZWRMYXllci5fZWxlbWVudClcblx0XHRmID0gQGdldERpbWVuc2lvbnMoRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQpXG5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblxuXHRcdEByYXRpbyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRAbWFrZURhc2hlZExpbmVzKHMsIGYsIEBzZWxlY3RlZENvbG9yLCA1KVxuXG5cdFx0QG1ha2VSZWN0T3ZlcmxheXMoc2VsZWN0ZWRMYXllciwgcywgaG92ZXJlZExheWVyLCBoKVxuXG5cblx0XHQjIFdoZW4gc2VsZWN0ZWQgZWxlbWVudCBjb250YWlucyBob3ZlcmVkIGVsZW1lbnRcblxuXHRcdGlmIHMueCA8IGgueCBhbmQgcy5tYXhYID4gaC5tYXhYIGFuZCBzLnkgPCBoLnkgYW5kIHMubWF4WSA+IGgubWF4WVxuXHRcdFx0XG5cdFx0XHQjIHRvcFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLnkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyByaWdodFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhYIC0gaC5tYXhYKVxuXHRcdFx0bSA9IGgubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy5tYXhYIC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHQjIGJvdHRvbVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy5tYXhZIC0gaC5tYXhZKVxuXHRcdFx0bSA9IGgubWF4WSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgubWF4WSArIDVdLCBbaC5taWRYLCBzLm1heFkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIGxlZnRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIGhvdmVyZWQgZWxlbWVudCBjb250YWlucyBzZWxlY3RlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPiBoLnggYW5kIHMubWF4WCA8IGgubWF4WCBhbmQgcy55ID4gaC55IGFuZCBzLm1heFkgPCBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMueSlcblx0XHRcdG0gPSBoLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgaC55ICsgNV0sIFtzLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgcy5taWRZXSwgW2gubWF4WCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgubWF4WSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5taWRYLCBzLm1heFkgKyA1XSwgW3MubWlkWCwgaC5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKHMubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gaC54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtoLnggKyA1LCBzLm1pZFldLCBbcy54IC0gNCwgcy5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgcy5taWRZLCBkKVxuXG5cblx0XHRcdHJldHVyblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGhvdmVyZWQgZWxlbWVudFxuXHRcdFxuXHRcdCMgdG9wXG5cblx0XHRpZiBzLnkgPiBoLm1heFlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgubWF4WSlcblx0XHRcdG0gPSBzLnkgLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55ID4gaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLnkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC55ICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHQjIGxlZnRcblxuXHRcdGlmIGgubWF4WCA8IHMueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy54IC0gaC5tYXhYKVxuXHRcdFx0bSA9IHMueCAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1heFggKyA1LCBoLm1pZFldLCBbcy54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBoLnggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgueClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgcmlnaHRcblxuXHRcdGlmIHMubWF4WCA8IGgueFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy5tYXhYKVxuXHRcdFx0bSA9IHMubWF4WCArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1heFggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0ZWxzZSBpZiBzLnggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMueClcblx0XHRcdG0gPSBzLnggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy54ICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdCMgYm90dG9tXG5cblx0XHRpZiBzLm1heFkgPCBoLnlcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueSAtIHMubWF4WSlcblx0XHRcdG0gPSBzLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBzLm1heFkgKyA1XSwgW2gubWlkWCwgaC55IC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdGVsc2UgaWYgcy55IDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gcy55ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0IyBzZXQgdGhlIHBhbmVsIHdpdGggY3VycmVudCBwcm9wZXJ0aWVzXG5cdHNldFBhbmVsUHJvcGVydGllczogKCkgPT5cblxuXHRcdGxheWVyID0gQHNlbGVjdGVkTGF5ZXIgPyBAaG92ZXJlZExheWVyXG5cblx0XHRpZiBsYXllciBpcyBAbGFzdExheWVyIGFuZCBsYXllci5pc0FuaW1hdGluZyBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAbGFzdExheWVyID0gbGF5ZXJcblx0XHRAbGFzdFByb3BzID0gbGF5ZXIucHJvcHNcblx0XHRcblx0XHQjIHByb3BlcnRpZXMgdG8gYXNzaWduZWQgdG8gbGF5ZXIucHJvcHNcblx0XHRjdXN0b21Qcm9wcyA9XG5cdFx0XHR4OiBsYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHR5OiBsYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHRjb21wb25lbnROYW1lOiBsYXllci5jb25zdHJ1Y3Rvci5uYW1lXG5cdFx0XHRjb21wb25lbnROYW1lczogQGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQpXG5cdFx0XHRwYXJlbnROYW1lOiBsYXllci5wYXJlbnQ/Lm5hbWVcblx0XHRcdHJvdGF0aW9uOiBsYXllci5yb3RhdGlvblpcblx0XHRcdCMgdGV4dEFsaWduOiBsYXllci5wcm9wcy5zdHlsZWRUZXh0T3B0aW9ucz8uYWxpZ25tZW50XG5cdFx0XHRibGVuZGluZzogbGF5ZXIuYmxlbmRpbmdcblx0XHRcdCMgc2NyZWVuc2hvdDogQGdldFNjcmVlbnNob3QobGF5ZXIuX2VsZW1lbnQpXG5cdFx0XG5cdFx0aWYgbGF5ZXIuZ3JhZGllbnQ/XG5cdFx0XHRfLmFzc2lnbiBjdXN0b21Qcm9wcyxcblx0XHRcdFx0Z3JhZGllbnRTdGFydDogbGF5ZXIuZ3JhZGllbnQuc3RhcnRcblx0XHRcdFx0Z3JhZGllbnRFbmQ6IGxheWVyLmdyYWRpZW50LmVuZFxuXHRcdFx0XHRncmFkaWVudEFuZ2xlOiBsYXllci5ncmFkaWVudC5hbmdsZVxuXG5cdFx0aWYgbGF5ZXIuc2hhZG93cz9cblx0XHRcdF8uYXNzaWduIGN1c3RvbVByb3BzLFxuXHRcdFx0XHRzaGFkb3dYOiBsYXllci5zaGFkb3dzWzBdPy54XG5cdFx0XHRcdHNoYWRvd1k6IGxheWVyLnNoYWRvd3NbMF0/Lnlcblx0XHRcdFx0c2hhZG93U3ByZWFkOiBsYXllci5zaGFkb3dzWzBdPy5zcHJlYWRcblx0XHRcdFx0c2hhZG93Q29sb3I6IGxheWVyLnNoYWRvd3NbMF0/LmNvbG9yXG5cdFx0XHRcdHNoYWRvd1R5cGU6IGxheWVyLnNoYWRvd3NbMF0/LnR5cGVcblx0XHRcdFx0c2hhZG93Qmx1cjogbGF5ZXIuc2hhZG93c1swXT8uYmx1clxuXG5cdFx0QHNwZWNQYW5lbC5zaG93UHJvcGVydGllcyhsYXllciwgY3VzdG9tUHJvcHMpXG5cdFx0XG5cdFx0ZXZlbnRMaXN0ZW5lcnMgPSBAZ2V0TGF5ZXJFdmVudExpc3RlbmVycyhsYXllcilcblx0XHRAc3BlY1BhbmVsLmNsZWFyQ2hpbGRyZW5UaGVuU2hvd0V2ZW50TGlzdGVuZXJzKGV2ZW50TGlzdGVuZXJzKVxuXG5cdFx0YW5pbWF0aW9ucyA9IGxheWVyLmFuaW1hdGlvbnMoKVxuXHRcdEBzcGVjUGFuZWwuY2xlYXJDaGlsZHJlblRoZW5TaG93QW5pbWF0aW9ucyhhbmltYXRpb25zKVxuXG5cblx0c2V0SG92ZXJlZExheWVyOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0bGF5ZXIgPSBAZ2V0TGF5ZXJGcm9tRWxlbWVudChldmVudD8udGFyZ2V0KVxuXHRcdHJldHVybiBpZiBub3QgQGdldExheWVySXNWaXNpYmxlKGxheWVyKVxuXG5cdFx0QGhvdmVyZWRMYXllciA9IGxheWVyXG5cblx0XHRAdHJ5Rm9jdXMoZXZlbnQpXG5cblx0XHRyZXR1cm4gZmFsc2VcblxuXHR1bnNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdEBob3ZlcmVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRpZiBub3QgQGhvdmVyZWRMYXllciB0aGVuIEBmb2N1cygpXG5cblx0c2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBob3ZlcmVkTGF5ZXJcblxuXHRcdGlmIEBzZWxlY3RlZExheWVyIGlzIEBob3ZlcmVkTGF5ZXJcblx0XHRcdEB1bnNldFNlbGVjdGVkTGF5ZXIoKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAc2VsZWN0ZWRMYXllciA9IEBob3ZlcmVkTGF5ZXJcblx0XHRAZm9jdXMoKVxuXG5cdHVuc2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRAc2VsZWN0ZWRMYXllciA9IHVuZGVmaW5lZFxuXHRcdEBmb2N1cygpXG5cblxuXHQjIEZpbmQgYW4gZWxlbWVudCB0aGF0IGJlbG9uZ3MgdG8gYSBGcmFtZXIgTGF5ZXJcblx0ZmluZExheWVyRWxlbWVudDogKGVsZW1lbnQpIC0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50LmNsYXNzTGlzdFxuXG5cdFx0aWYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyYW1lckxheWVyJylcblx0XHRcdHJldHVybiBlbGVtZW50XG5cblx0XHRAZmluZExheWVyRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUpXG5cblx0IyBGaW5kIGEgRnJhbWVyIExheWVyIHRoYXQgbWF0Y2hlcyBhIEZyYW1lciBMYXllciBlbGVtZW50XG5cdGdldExheWVyRnJvbUVsZW1lbnQ6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXG5cdFx0ZWxlbWVudCA9IEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnMsIFsnX2VsZW1lbnQnLCBlbGVtZW50XSlcblxuXHRcdHJldHVybiBsYXllclxuXG5cdGdldExheWVySXNWaXNpYmxlOiAobGF5ZXIpID0+XG5cdFx0aWYgbm90IEBfb25seVZpc2libGVcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBsYXllci5vcGFjaXR5IGlzIDAgb3IgbGF5ZXIudmlzaWJsZSBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIucGFyZW50KVxuXG5cdGdldExheWVyRXZlbnRMaXN0ZW5lcnM6IChsYXllcikgPT5cblxuXHRcdGxpc3RlbmVycyA9IF8ubWFwKGxheWVyLl9ldmVudHMsIChldnMsIGxpc3RlbmVyLCBjKSAtPlxuXHRcdFx0aWYgbm90IF8uaXNBcnJheShldnMpIHRoZW4gZXZzID0gW2V2c11cblx0XHRcdFxuXHRcdFx0e1xuXHRcdFx0XHRsaXN0ZW5lcjogbGlzdGVuZXJcblx0XHRcdFx0ZXZlbnRzOiBfLm1hcCBldnMsIChldikgLT5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRuYW1lOiBldi5mbi5uYW1lXG5cdFx0XHRcdFx0XHRmdW5jdGlvbjogZXYuZm4udG9TdHJpbmcoKVxuXHRcdFx0XHRcdFx0Y29udGV4dDogZXYuY29udGV4dCBcblx0XHRcdFx0XHRcdG9uY2U6IGV2Lm9uY2Vcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KVxuXG5cdFx0cmV0dXJuIGxpc3RlbmVyc1xuXG5cdGdldFNjcmVlbnNob3Q6IChlbGVtZW50KSA9PlxuXG5cdFx0Zm9yZWlnbk9iamVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ2ZvcmVpZ25PYmplY3QnXG5cblx0XHQjIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcblx0XHRyZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdGN0eCA9IEBzcGVjUGFuZWwuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRkYXRhID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JyN7cmVjdC53aWR0aH0nIGhlaWdodD0nI3tyZWN0LmhlaWdodH0nPlwiICtcblx0XHRcdCc8Zm9yZWlnbk9iamVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+JyArXG5cdFx0XHQnPGRpdiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj4nICtcblx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MICtcblx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdCc8L2ZvcmVpZ25PYmplY3Q+JyArXG5cdFx0XHQnPC9zdmc+J1xuXG5cdFx0RE9NVVJMID0gd2luZG93LlVSTCBvciB3aW5kb3cud2Via2l0VVJMIG9yIHdpbmRvd1xuXG5cdFx0c3ZnID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogJ2ltYWdlL3N2Zyt4bWwnfSlcblx0XHR1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zylcblx0XHRAc3BlY1BhbmVsLnNjcmVlbnNob3RCb3gudmFsdWUgPSB1cmxcblxuXG5cdCMgRmluZCBhIG5vbi1zdGFuZGFyZCBDb21wb25lbnQgdGhhdCBpbmNsdWRlcyBhIExheWVyXG5cdGdldENvbXBvbmVudEZyb21MYXllcjogKGxheWVyLCBuYW1lcyA9IFtdKSA9PlxuXHRcdGlmIG5vdCBsYXllclxuXHRcdFx0cmV0dXJuIG5hbWVzLmpvaW4oJywgJylcblxuXHRcdGlmIG5vdCBfLmluY2x1ZGVzKFtcIkxheWVyXCIsIFwiVGV4dExheWVyXCIsIFwiU2Nyb2xsQ29tcG9uZW50XCJdLCBsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXHRcdFx0bmFtZXMucHVzaChsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXG5cdFx0QGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQsIG5hbWVzKVxuXG5cblx0IyBEZWxheSBmb2N1cyBieSBhIHNtYWxsIGFtb3VudCB0byBwcmV2ZW50IGZsYXNoaW5nXG5cdHRyeUZvY3VzOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QGZvY3VzRWxlbWVudCA9IGV2ZW50LnRhcmdldFxuXHRcdGRvIChldmVudCkgPT5cblx0XHRcdFV0aWxzLmRlbGF5IC4wNSwgPT5cblx0XHRcdFx0aWYgQGZvY3VzRWxlbWVudCBpc250IGV2ZW50LnRhcmdldFxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcblx0XHRcdFx0QGZvY3VzKClcblxuXHQjIENoYW5nZSBmb2N1cyB0byBhIG5ldyBob3ZlcmVkIG9yIHNlbGVjdGVkIGVsZW1lbnRcblx0Zm9jdXM6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QHVuZm9jdXMoKVxuXG5cdFx0IyBAc2VsZWN0ZWRMYXllciA/PSBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdEBob3ZlcmVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdGhvdmVyZWRMYXllciA9IEBob3ZlcmVkTGF5ZXIgPyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdHNlbGVjdGVkTGF5ZXIgPSBAc2VsZWN0ZWRMYXllciA/IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRpZiBzZWxlY3RlZExheWVyIGlzIGhvdmVyZWRMYXllclxuXHRcdFx0aG92ZXJlZExheWVyID0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdGlmIGhvdmVyZWRMYXllciBpcyBzZWxlY3RlZExheWVyXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBzaG93RGlzdGFuY2VzKHNlbGVjdGVkTGF5ZXIsIGhvdmVyZWRMYXllcilcblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKHNlbGVjdGVkTGF5ZXIsIGhvdmVyZWRMYXllcilcblxuXHR1bmZvY3VzOiAoZXZlbnQpID0+XG5cdFx0c3ZnQ29udGV4dC5yZW1vdmVBbGwoKVxuXG5cbiMga2lja29mZlxuXG5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5wYW5lbC5pZCA9ICdwQ29udGFpbmVyJ1xudmlld0MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRnJhbWVyQ29udGV4dFJvb3QtRGVmYXVsdCcpXG5VdGlscy5kZWxheSAwLCA9PiB2aWV3Qy5hcHBlbmRDaGlsZChwYW5lbClcblxuc2VjcmV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWNyZXRCb3gpXG5cblxuc3ZnQ29udGV4dCA9IG5ldyBTVkdDb250ZXh0XG5cbmV4cG9ydHMuZ290Y2hhID0gZ290Y2hhID0gbmV3IEdvdGNoYVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3Ro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
