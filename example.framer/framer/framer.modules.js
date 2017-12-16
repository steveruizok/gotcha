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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXZlcnVpei9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cbmRldmljZVR5cGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZVR5cGVcblxuaWYgZGV2aWNlVHlwZT8gXG5cdGRldmljZSA9IEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1tkZXZpY2VUeXBlXVxuXHRGcmFtZXIuRGV2aWNlLl9jb250ZXh0LmRldmljZVBpeGVsUmF0aW8gPSBkZXZpY2UuZGV2aWNlUGl4ZWxSYXRpb1xuXG5cdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IGRldmljZVR5cGVcblx0d2luZG93LmxvY2FsU3RvcmFnZS5kZXZpY2UgPSB1bmRlZmluZWRcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuc3ZnQ29udGV4dCA9IHVuZGVmaW5lZFxuc3RhcnRPcGVuID0gZmFsc2VcbmFjY29yZGlvbnNPcGVuID0gZmFsc2VcblxuIyBkZWJ1Z2dpbmdcblxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnRGV2aWNlUGhvbmUnKVswXT8uY2xhc3NMaXN0LmFkZCgnSWdub3JlUG9pbnRlckV2ZW50cycpXG5cblxuIyMjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICBcdC5kODg4ODhiICBkUCAgICAgZFAgIC44ODg4OC4gICAgICBhODg4ODhiLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiAgXHQ4OC4gICAgXCInIDg4ICAgICA4OCBkOCcgICBgODggICAgZDgnICAgYDg4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OFxuICBcdGBZODg4ODhiLiA4OCAgICAuOFAgODggICAgICAgICAgIDg4ICAgICAgICAuZDg4ODhiLiA4OGQ4Yi5kOGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4ZDg4OGIuIGQ4ODg4UCAuZDg4ODhiLlxuICBcdCAgICAgIGA4YiA4OCAgICBkOCcgODggICBZUDg4ICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCdgODgnYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYDg4ICAgODggICBZOG9vb29vLlxuICBcdGQ4JyAgIC44UCA4OCAgLmQ4UCAgWTguICAgLjg4ICAgIFk4LiAgIC44OCA4OC4gIC44OCA4OCAgODggIDg4IDg4LiAgLjg4IDg4LiAgLjg4IDg4ICAgIDg4IDg4LiAgLi4uIDg4ICAgIDg4ICAgODggICAgICAgICA4OFxuICBcdCBZODg4ODhQICA4ODg4ODgnICAgIGA4ODg4OCcgICAgICBZODg4ODhQJyBgODg4ODhQJyBkUCAgZFAgIGRQIDg4WTg4OFAnIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFAnIGRQICAgIGRQICAgZFAgICBgODg4ODhQJ1xuICBcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFBcbiMjI1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBDb250ZXh0XG5cbmNsYXNzIFNWR0NvbnRleHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHNoYXBlcyA9IFtdXG5cblx0XHRzdmdDb250ZXh0ID0gQFxuXG5cdFx0IyBuYW1lc3BhY2Vcblx0XHRzdmdOUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuXHRcdFxuXHRcdCMgc2V0IGF0dHJpYnV0ZXMgXG5cdFx0c2V0QXR0cmlidXRlcyA9IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblxuXHRcdCMgQ3JlYXRlIFNWRyBlbGVtZW50XG5cblx0XHRAc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnc3ZnJylcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKEBzdmcpXG5cdFx0QHN2Zy5zdHlsZVsnei1pbmRleCddID0gJzk5OSdcblxuXHRcdEBmcmFtZUVsZW1lbnQgPSBGcmFtZXIuRGV2aWNlLnNjcmVlbkJhY2tncm91bmQuX2VsZW1lbnRcblxuXHRcdEBzZXRDb250ZXh0KClcblxuXHRcdCMgZGVmc1xuXHRcdFxuXHRcdEBzdmdEZWZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z05TLCAnZGVmcycpXG5cdFx0QHN2Zy5hcHBlbmRDaGlsZCBAc3ZnRGVmc1xuXHRcdFxuXHRcdGRlbGV0ZSBAX19jb25zdHJ1Y3RvclxuXG5cdHNldEF0dHJpYnV0ZXM6IChlbGVtZW50LCBhdHRyaWJ1dGVzID0ge30pIC0+XG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgYXR0cmlidXRlc1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRzZXRDb250ZXh0OiA9PlxuXG5cdFx0QGxGcmFtZSA9IEBmcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR3aWR0aDogQGxGcmFtZS53aWR0aC50b0ZpeGVkKClcblx0XHRcdGhlaWdodDogQGxGcmFtZS5oZWlnaHQudG9GaXhlZCgpXG5cdFx0XHR4OiBAbEZyYW1lLmxlZnQudG9GaXhlZCgpXG5cdFx0XHR5OiBAbEZyYW1lLnRvcC50b0ZpeGVkKClcblxuXHRcdEBzY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyQ29udGV4dCcpWzBdXG5cdFx0c0ZyYW1lID0gQHNjcmVlbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdEBzZXRBdHRyaWJ1dGVzIEBzdmcsXG5cdFx0XHR4OiAwXG5cdFx0XHR5OiAwXG5cdFx0XHR3aWR0aDogc0ZyYW1lLndpZHRoXG5cdFx0XHRoZWlnaHQ6IHNGcmFtZS5oZWlnaHRcblx0XHRcdHZpZXdCb3g6IFwiMCAwICN7c0ZyYW1lLndpZHRofSAje3NGcmFtZS5oZWlnaHR9XCJcblxuXHRcdF8uYXNzaWduIEBzdmcuc3R5bGUsXG5cdFx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdFx0XHRsZWZ0OiAwXG5cdFx0XHR0b3A6IDBcblx0XHRcdHdpZHRoOiAnMTAwJSdcblx0XHRcdGhlaWdodDogJzEwMCUnXG5cdFx0XHQncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcblxuXHRhZGRTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzaGFwZXMucHVzaChzaGFwZSlcblx0XHRAc2hvd1NoYXBlKHNoYXBlKVxuXHRcdFxuXHRyZW1vdmVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBoaWRlU2hhcGUoc2hhcGUpXG5cdFx0Xy5wdWxsKEBzaGFwZXMsIHNoYXBlKVxuXHRcdFxuXHRoaWRlU2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFxuXHRzaG93U2hhcGU6IChzaGFwZSkgLT5cblx0XHRAc3ZnLmFwcGVuZENoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0XG5cdGFkZERlZjogKGRlZikgLT5cblx0XHRAc3ZnRGVmcy5hcHBlbmRDaGlsZChkZWYpXG5cblx0cmVtb3ZlQWxsOiA9PlxuXHRcdGZvciBzaGFwZSBpbiBAc2hhcGVzXG5cdFx0XHRAc3ZnLnJlbW92ZUNoaWxkKHNoYXBlLmVsZW1lbnQpXG5cdFx0QHNoYXBlcyA9IFtdXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNWRyBTaGFwZVxuXG5jbGFzcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7dHlwZTogJ2NpcmNsZSd9KSAtPlxuXHRcdEBfX2NvbnN0cnVjdG9yID0gdHJ1ZVxuXHRcdFxuXHRcdEBwYXJlbnQgPSBzdmdDb250ZXh0XG5cdFx0XG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG5cdFx0XHRcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFxuXHRcdFx0b3B0aW9ucy50eXBlXG5cdFx0XHQpXG5cblx0XHRAc2V0Q3VzdG9tUHJvcGVydHkoJ3RleHQnLCAndGV4dENvbnRlbnQnLCAndGV4dENvbnRlbnQnLCBvcHRpb25zLnRleHQpXG5cdFx0XHRcdFxuXHRcdCMgYXNzaWduIGF0dHJpYnV0ZXMgc2V0IGJ5IG9wdGlvbnNcblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvcHRpb25zXG5cdFx0XHRAc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cblx0XHRAcGFyZW50LmFkZFNoYXBlKEApXG5cdFx0XG5cdFx0QHNob3coKVxuXHRcdFx0XG5cdHNldEF0dHJpYnV0ZTogKGtleSwgdmFsdWUpID0+XG5cdFx0cmV0dXJuIGlmIGtleSBpcyAndGV4dCdcblx0XHRpZiBub3QgQFtrZXldP1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcdGtleSxcblx0XHRcdFx0Z2V0OiA9PlxuXHRcdFx0XHRcdHJldHVybiBAZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0XHRzZXQ6ICh2YWx1ZSkgPT4gXG5cdFx0XHRcdFx0QGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG5cdFx0XG5cdFx0QFtrZXldID0gdmFsdWVcblx0XG5cdHNldEN1c3RvbVByb3BlcnR5OiAodmFyaWFibGVOYW1lLCByZXR1cm5WYWx1ZSwgc2V0VmFsdWUsIHN0YXJ0VmFsdWUpIC0+XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHR2YXJpYWJsZU5hbWUsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiByZXR1cm5WYWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBlbGVtZW50W3NldFZhbHVlXSA9IHZhbHVlXG5cblx0XHRAW3ZhcmlhYmxlTmFtZV0gPSBzdGFydFZhbHVlXG5cblx0aGlkZTogLT4gXG5cdFx0QHBhcmVudC5oaWRlU2hhcGUoQClcblx0XG5cdHNob3c6IC0+IFxuXHRcdEBwYXJlbnQuc2hvd1NoYXBlKEApXG5cdFx0XG5cdHJlbW92ZTogLT5cblx0XHRAcGFyZW50LnJlbW92ZVNoYXBlKEApXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERhc2hlZCBMaW5lXG5cbmNsYXNzIERhc2hlZExpbmUgZXh0ZW5kcyBTVkdTaGFwZVxuXHRjb25zdHJ1Y3RvcjogKHBvaW50QSwgcG9pbnRCLCBjb2xvciA9ICcjMDAwJywgb2Zmc2V0ID0gMCwgb3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5hc3NpZ24gb3B0aW9ucyxcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBLnh9ICN7cG9pbnRBLnl9IEwgI3twb2ludEIueH0gI3twb2ludEIueX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cdFx0XHQnc3Ryb2tlLWRhc2hhcnJheSc6IFwiNSwgNVwiXG5cdFx0XHQnc3Ryb2tlLWRhc2hvZmZzZXQnOiBvZmZzZXRcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUGFuZWwgQ29tcG9uZW50c1xuXG5VdGlscy5pbnNlcnRDU1MgXCJcIlwiXG5cblx0LmxvZ28ge1xuXHRcdG9wYWNpdHk6IC40O1xuXHR9XG5cblx0LmxvZ286aG92ZXIge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0XG5cdCNsaW5rZWRpbl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA4cHg7XG5cdFx0cmlnaHQ6IDY4cHg7XG5cdH1cblxuXHRcblx0I3R3aXR0ZXJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogNHB4O1xuXHRcdHJpZ2h0OiA0cHg7XG5cdH1cblxuXHQjZ2l0aHViX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogMzZweDtcblx0fVxuXG5cdC5mcmFtZXJMYXllciB7IFxuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGwgIWltcG9ydGFudDsgXG5cdFx0fSBcblx0XG5cdC5JZ25vcmVQb2ludGVyRXZlbnRzIHtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50OyBcblx0fVxuXG5cdC5kcm9wZG93biB7XG5cdFx0b3BhY2l0eTogMDtcblx0fVxuXG5cdCNwQ29udGFpbmVyIHtcblx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0cmlnaHQ6IDA7XG5cdFx0d2lkdGg6IDIyNHB4O1xuXHRcdGhlaWdodDogMTAwJTtcblx0XHRmb250LWZhbWlseTogJ0hlbHZldGljYSBOZXVlJztcblx0XHRmb250LXNpemU6IDExcHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMCwgMjAsIDIwLCAxLjAwMCk7XG5cdFx0Ym9yZGVyLWxlZnQ6IDFweCBzb2xpZCByZ2JhKDQ1LCA0NSwgNDUsIDEuMDAwKTtcblx0XHRwb2ludGVyLWV2ZW50czogYWxsO1xuXHRcdHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cdFx0Y3Vyc29yOiBkZWZhdWx0O1xuXHRcdG92ZXJmbG93OiBzY3JvbGw7XG5cdFx0cGFkZGluZy10b3A6IDhweDtcblx0fVxuXG5cdC5wRGl2IHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHR3aWR0aDogMTAwJTtcblx0fVxuXG5cdC5oaWRkZW4ge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdH1cblxuXHQucFJvdyB7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0aGVpZ2h0OiAzMnB4O1xuXHR9XG5cblx0LnBTcGFuIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Y29sb3I6ICM4ODg4ODg7XG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcblx0XHRsZXR0ZXItc3BhY2luZzogLjVweDtcblx0XHRwYWRkaW5nLWxlZnQ6IDhweDtcblx0XHRtYXJnaW4tdG9wOiAycHg7XG5cdH1cblxuXHQucExhYmVsIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dGV4dC1hbGlnbjogcmlnaHQ7XG5cdFx0Zm9udC1zaXplOiAxMHB4O1xuXHRcdHdpZHRoOiBub25lO1xuXHRcdG1hcmdpbi10b3A6IDJweDtcblx0XHRtYXJnaW4tcmlnaHQ6IDhweDtcblx0XHR6LWluZGV4OiAxMDtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcblx0fVxuXG5cdC5wUmFuZ2Uge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0bWFyZ2luLXRvcDogMTVweDtcblx0XHRtYXJnaW4tcmlnaHQ6IDRweDtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsgIC8qIE92ZXJyaWRlIGRlZmF1bHQgQ1NTIHN0eWxlcyAqL1xuXHRcdGFwcGVhcmFuY2U6IG5vbmU7XG5cdFx0d2lkdGg6IDEwMCU7IFxuXHRcdGhlaWdodDogNHB4O1xuXHRcdGJhY2tncm91bmQ6ICMzMjMyMzI7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0XHRvcGFjaXR5OiAxO1xuXHR9XG5cblxuXHQucFJhbmdlOjotd2Via2l0LXNsaWRlci10aHVtYiB7XG5cdFx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcblx0XHRhcHBlYXJhbmNlOiBub25lO1xuXHRcdHdpZHRoOiAxNnB4O1xuXHRcdGhlaWdodDogMTZweDtcblx0XHRiYWNrZ3JvdW5kOiAjODg4ODg4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHR9XG5cblx0LnBSYW5nZTo6LW1vei1yYW5nZS10aHVtYiB7XG5cdFx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRcdHdpZHRoOiAxNnB4O1xuXHRcdGhlaWdodDogMTZweDtcblx0XHRiYWNrZ3JvdW5kOiAjODg4ODg4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHR9XG5cblx0LnBJbnB1dCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGNvbG9yOiAjNTU1NTU1O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogNHB4O1xuXHR9XG5cblx0LnBJbnB1dDpob3ZlciB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzQ4Y2ZmZjtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5yaWdodCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5sZWZ0IHtcblx0XHRyaWdodDogNzJweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5hbGlnbkxlZnQge1xuXHRcdHRleHQtYWxpZ246IGxlZnQ7XG5cdH1cblxuXHQuZnVsbCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogMTEycHg7XG5cdH1cblxuXHQucEltYWdlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRtYXJnaW4tbGVmdDogOHB4O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHR3aWR0aDogMTk2cHg7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IDRweCBzb2xpZCAjMjkyOTI5O1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAtNHB4O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0fVxuXG5cdC5wSW1hZ2U6aG92ZXIge1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICM0OGNmZmY7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdFx0b3V0bGluZTogMnB4IHNvbGlkICMyOTI5Mjk7XG5cdH1cblxuXHQucENvbG9yIHtcblx0XHRvdXRsaW5lOiA0cHggc29saWQgIzI5MjkyOTtcblx0XHRvdXRsaW5lLW9mZnNldDogLTRweDtcblx0fVxuXG5cdC5wQ29sb3I6aG92ZXIge1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCAjMjkyOTI5O1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHR9XG5cblx0LnBTZWxlY3Qge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiAxMjJweDtcblx0XHRjb2xvcjogIzU1NTU1NTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0fVxuXG5cdC5wRGl2aWRlciB7XG5cdFx0aGVpZ2h0OiAxcHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzAwMDtcblx0XHRtYXJnaW46IDE2cHggOHB4IDE2cHggOHB4O1xuXHR9XG5cblx0LnBBY2NvcmRpYW4ge1xuXHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRtaW4taGVpZ2h0OiAzMnB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxRDFEMUQ7XG5cdFx0bWFyZ2luLXRvcDogMTZweDtcblx0fVxuXG5cdC5wQWNjb3JkaWFuQm9keSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0bWFyZ2luLXRvcDogMzJweDtcblx0XHRwYWRkaW5nLXRvcDogNHB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG5cdH1cblxuXHQuYWN0aXZlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblxuXHQuaGFzVmFsdWUge1xuXHRcdGNvbG9yOiAjRkZGO1xuXHR9XG5cblx0LnNvY2lhbExpbmtzIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRib3R0b206IDBweDtcblx0XHRyaWdodDogMHB4O1xuXHRcdHBhZGRpbmctdG9wOiA0cHg7XG5cdFx0ei1pbmRleDogMTAwO1xuXHR9XG5cblx0LnN0cm9uZyB7XG5cdFx0Zm9udC13ZWlnaHQ6IDYwMDtcblx0fVxuXG5cIlwiXCJcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGl2XG5cbmNsYXNzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QHByb3BlcnRpZXMgPSBbXVxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2XCIpXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcInZpc2libGVcIixcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmlzaWJsZVxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0cmV0dXJuIGlmIGJvb2wgaXMgQF92aXNpYmxlXG5cblx0XHRcdFx0QF92aXNpYmxlID0gYm9vbFxuXG5cdFx0XHRcdGlmIGJvb2xcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuXHRcdFx0XHRcdHJldHVyblxuXG5cdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUm93XG5cbmNsYXNzIHBSb3cgZXh0ZW5kcyBwRGl2XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0dGV4dDogJ0xhYmVsJ1xuXHRcdFx0Ym9sZDogZmFsc2VcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjaGlsZHJlbjogW11cblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJwRGl2XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBSb3dcIilcblxuXHRcdEBsYWJlbCA9IG5ldyBwU3BhblxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBvcHRpb25zLnRleHRcblx0XHRcdGJvbGQ6IG9wdGlvbnMuYm9sZFxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsICdjb2xvcicsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAbGFiZWwuc3R5bGUuY29sb3Jcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0XHRAbGFiZWwuZWxlbWVudC5zdHlsZS5jb2xvciA9IHZhbHVlXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdmlkZXJcblxuY2xhc3MgcERpdmlkZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2aWRlclwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU3BhblxuXG5jbGFzcyBwU3BhblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHR0ZXh0OiAnaGVsbG8gd29ybGQnXG5cdFx0XHRib2xkOiBmYWxzZVxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFNwYW5cIilcblx0XHRAZWxlbWVudC50ZXh0Q29udGVudCA9IG9wdGlvbnMudGV4dFxuXG5cdFx0aWYgb3B0aW9ucy5ib2xkXG5cdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3Ryb25nXCIpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3RleHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQGVsZW1lbnQudGV4dENvbnRlbnRcblx0XHRcdHNldDogKHZhbHVlKSAtPiBAZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgUmFuZ2VcblxuY2xhc3MgcFJhbmdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dmFsdWU6ICcnXG5cdFx0XHRtaW46ICcwJ1xuXHRcdFx0bWF4OiAnMTAwJ1xuXHRcdFx0dmFsdWU6ICcxMDAnXG5cdFx0XHRhY3Rpb246ICh2YWx1ZSkgPT4gbnVsbFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5cdFx0Xy5hc3NpZ24gQGVsZW1lbnQsXG5cdFx0XHR0eXBlOiAncmFuZ2UnXG5cdFx0XHRtaW46IG9wdGlvbnMubWluXG5cdFx0XHRtYXg6IG9wdGlvbnMubWF4XG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0YWN0aW9uOiBvcHRpb25zLmFjdGlvblxuXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBSYW5nZVwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRAZWxlbWVudC5vbmlucHV0ID0gPT4gQGFjdGlvbihAdmFsdWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0cHJvcExheWVycy5wdXNoKEApXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQGVsZW1lbnQudmFsdWVcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRhY3Rpb246IG9wdGlvbnMuYWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIExhYmVsXG5cbmNsYXNzIHBMYWJlbFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHRjbGFzc05hbWU6IG51bGxcblx0XHRcdHRleHQ6ICd4J1xuXHRcdFx0Zm9yOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwTGFiZWxcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXHRcdFxuXHRcdF8uYXNzaWduIEBlbGVtZW50LFxuXHRcdFx0dGV4dENvbnRlbnQ6IG9wdGlvbnMudGV4dFxuXHRcdFx0Zm9yOiBvcHRpb25zLmZvclxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgSW5wdXRcblxuY2xhc3MgcElucHV0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dmFsdWU6ICcnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcnXG5cdFx0XHRpc0RlZmF1bHQ6IHRydWVcblx0XHRcdHNlY3Rpb246IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBJbnB1dFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0b3B0aW9ucy5zZWN0aW9uPy5wcm9wZXJ0aWVzLnB1c2goQClcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25zLmNsYXNzTmFtZVxuXHRcdFx0dGV4dDogb3B0aW9ucy51bml0XG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRwcm9wTGF5ZXJzLnB1c2goQClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCdkZWZhdWx0Jyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfZGVmYXVsdFxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfZGVmYXVsdCA9IHZhbHVlXG5cblx0XHRAZGVmYXVsdCA9IG9wdGlvbnMuZGVmYXVsdCA/ICcnXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRpZiBub3QgdmFsdWU/IG9yIHZhbHVlIGlzIFwiXCIgb3IgdmFsdWUgaXMgXCJ1bmRlZmluZWRcIlxuXHRcdFx0XHRcdHZhbHVlID0gU3RyaW5nKEBkZWZhdWx0KVxuXG5cdFx0XHRcdEBlbGVtZW50LnZhbHVlID0gdmFsdWUgPyBcIlwiXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCBub3QgQGlzRGVmYXVsdCBhbmQgdmFsdWUgaXNudCBcIlwiXG5cdFx0XHRcdFx0IyBAc2VjdGlvbj8uY29sb3IgPSAnI0ZGRidcblx0XHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHRydWVcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALCBcblx0XHRcdCdpc0RlZmF1bHQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9pc0RlZmF1bHRcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdEBfaXNEZWZhdWx0ID0gYm9vbFxuXG5cdFx0XHRcdGlmIGJvb2xcblx0XHRcdFx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoYXNWYWx1ZScpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0QC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhc1ZhbHVlJylcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0ZGVmYXVsdDogb3B0aW9ucy5kZWZhdWx0XG5cdFx0XHRzZWN0aW9uOiBvcHRpb25zLnNlY3Rpb25cblx0XHRcdGlzRGVmYXVsdDogb3B0aW9ucy5pc0RlZmF1bHRcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgSW1hZ2VcblxuY2xhc3MgcEltYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0XHR2YWx1ZTogJydcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRzZWN0aW9uOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicEltYWdlXCIpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0b3B0aW9ucy5zZWN0aW9uPy5wcm9wZXJ0aWVzLnB1c2goQClcblxuXHRcdHByb3BMYXllcnMucHVzaChAKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlID0gJycpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zcmMgPSB2YWx1ZVxuXHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHZhbHVlIGlzbnQgJydcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIENvbG9yIEJveFxuXG5jbGFzcyBwQ29sb3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnIzI5MjkyOSdcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQ29sb3InKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0b3B0aW9ucy5zZWN0aW9uPy5wcm9wZXJ0aWVzLnB1c2goQClcblxuXHRcdHByb3BMYXllcnMucHVzaChAKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXG5cdFx0XHRcdGlmIHZhbHVlPy5jb2xvciBpcyAndHJhbnNwYXJlbnQnXG5cdFx0XHRcdFx0dmFsdWUgPSBudWxsXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB0cnVlXG5cblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlID8gJydcblx0XHRcdFx0QGVsZW1lbnQuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9IHZhbHVlID8gJ25vbmUnXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRzZWN0aW9uOiBvcHRpb25zLnNlY3Rpb25cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU2VsZWN0XG5cbmNsYXNzIHBTZWxlY3Rcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0c2VsZWN0ZWQ6IDBcblx0XHRcdG9wdGlvbnM6IFsncmVkJywgJ3doaXRlJywgJ2JsdWUnXVxuXHRcdFx0Y2FsbGJhY2s6ICh2YWx1ZSkgLT4gbnVsbFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwU2VsZWN0XCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzVmFsdWUnKVxuXG5cdFx0QHVuaXQgPSBuZXcgcExhYmVsXG5cdFx0XHRwYXJlbnQ6IG9wdGlvbnMucGFyZW50XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHRleHQ6ICfilr4nXG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQnb3B0aW9ucycsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX29wdGlvbnNcblx0XHRcdHNldDogKGFycmF5KSAtPlxuXHRcdFx0XHRAX29wdGlvbnMgPSBhcnJheVxuXHRcdFx0XHRAbWFrZU9wdGlvbnMoKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQnc2VsZWN0ZWQnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9zZWxlY3RlZFxuXHRcdFx0c2V0OiAobnVtKSAtPlxuXHRcdFx0XHRAX3NlbGVjdGVkID0gbnVtXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0X29wdGlvbnM6IFtdXG5cdFx0XHRfb3B0aW9uRWxlbWVudHM6IFtdXG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLm9wdGlvbnNcblx0XHRcdGNhbGxiYWNrOiBvcHRpb25zLmNhbGxiYWNrXG5cdFx0XHRzZWxlY3RlZDogb3B0aW9ucy5zZWxlY3RlZFxuXG5cdFx0QGVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IG9wdGlvbnMuc2VsZWN0ZWRcblxuXHRcdEBlbGVtZW50Lm9uY2hhbmdlID0gPT4gXG5cdFx0XHRAc2VsZWN0ZWQgPSBAZWxlbWVudC5zZWxlY3RlZEluZGV4XG5cdFx0XHRAY2FsbGJhY2soQGVsZW1lbnQuc2VsZWN0ZWRJbmRleClcblx0XHRcblxuXHRtYWtlT3B0aW9uczogPT5cblx0XHRmb3Igb3B0aW9uLCBpIGluIEBfb3B0aW9uRWxlbWVudHNcblx0XHRcdEBlbGVtZW50LnJlbW92ZUNoaWxkKG9wdGlvbilcblxuXHRcdEBfb3B0aW9uRWxlbWVudHMgPSBbXVxuXG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBAb3B0aW9uc1xuXHRcdFx0byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG5cdFx0XHRvLnZhbHVlID0gb3B0aW9uXG5cdFx0XHRvLmxhYmVsID0gb3B0aW9uXG5cdFx0XHRvLmlubmVySFRNTCA9IG9wdGlvblxuXHRcdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQobylcblxuXHRcdFx0QF9vcHRpb25FbGVtZW50cy5wdXNoKG8pXG5cblx0XHRcdGlmIGkgaXMgQHNlbGVjdGVkXG5cdFx0XHRcdEB2YWx1ZSA9IEBlbGVtZW50Lm9wdGlvbnNbQGVsZW1lbnQuc2VsZWN0ZWRJbmRleF0ubGFiZWxcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgQWNjb3JkaWFuXG5cbmNsYXNzIHBBY2NvcmRpYW4gZXh0ZW5kcyBwUm93XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BBY2NvcmRpYW4nKVxuXHRcdEBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBAdG9nZ2xlXG5cblx0XHRfLmFzc2lnbiBALFxuXHRcdFx0dG9nZ2xlZDogZmFsc2VcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHRleHQ6ICfilr8nXG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRAYm9keSA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHRleHQ6ICcnXG5cdFx0QGJvZHkuZWxlbWVudC5yZW1vdmVDaGlsZChAYm9keS5sYWJlbC5lbGVtZW50KVxuXG5cdFx0QGVsZW1lbnQuYXBwZW5kQ2hpbGQoQGJvZHkuZWxlbWVudClcblx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BBY2NvcmRpYW5Cb2R5JylcblxuXHRcdEBib2R5LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXZlbnQpIC0+IFxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdGlmIGFjY29yZGlvbnNPcGVuIHRoZW4gQHRvZ2dsZSgpICMgc3RhcnQgb3BlblxuXG5cdHRvZ2dsZTogPT5cblx0XHRAdG9nZ2xlZCA9ICFAdG9nZ2xlZFxuXG5cdFx0aWYgQHRvZ2dsZWRcblx0XHRcdEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcblx0XHRcdEB1bml0LmVsZW1lbnQudGV4dENvbnRlbnQgPSAn4pa+J1xuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJylcblx0XHRcdEBib2R5LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcblx0XHRcdEB1bml0LmVsZW1lbnQudGV4dENvbnRlbnQgPSAn4pa/J1xuXG5cbiMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiBcdC5kODg4ODhiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODg4ODg4YmEgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRQXG4gXHQ4OC4gICAgXCInICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA4OCAgICBgOGIgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiBcdGBZODg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiAuZDg4ODhiLiAgICBhODhhYWFhOFAnIC5kODg4OGIuIDg4ZDg4OGIuIC5kODg4OGIuIDg4XG4gXHQgICAgICBgOGIgODgnICBgODggODhvb29vZDggODgnICBgXCJcIiAgICAgODggICAgICAgIDg4JyAgYDg4IDg4JyAgYDg4IDg4b29vb2Q4IDg4XG4gXHRkOCcgICAuOFAgODguICAuODggODguICAuLi4gODguICAuLi4gICAgIDg4ICAgICAgICA4OC4gIC44OCA4OCAgICA4OCA4OC4gIC4uLiA4OFxuIFx0IFk4ODg4OFAgIDg4WTg4OFAnIGA4ODg4OFAnIGA4ODg4OFAnICAgICBkUCAgICAgICAgYDg4ODg4UDggZFAgICAgZFAgYDg4ODg4UCcgZFBcbiBcdCAgICAgICAgICA4OFxuIFx0ICAgICAgICAgIGRQXG5cbiMjI1xuXG5jbGFzcyBTcGVjUGFuZWxcblx0Y29uc3RydWN0b3I6IC0+XG5cblx0XHRAZWxlbWVudCA9IHBhbmVsXG5cdFx0QHByb3BMYXllcnMgPSBbXVxuXHRcdEBfcHJvcHMgPSB7fVxuXHRcdEBmcmFtZSA9IEBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0QGRlZmF1bHRzID0gRnJhbWVyLkRldmljZS5zY3JlZW4uX3Byb3BlcnR5TGlzdCgpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdCdwcm9wcycsXG5cdFx0XHRnZXQ6IC0+XG5cdFx0XHRcdHJldHVybiBAX3Byb3BzXG5cdFx0XHRzZXQ6IChvYmopIC0+XG5cdFx0XHRcdGZvciBrZXksIHZhbHVlIG9mIG9ialxuXHRcdFx0XHRcdGlmIF8uaGFzKEBwcm9wcywga2V5KVxuXHRcdFx0XHRcdFx0QHByb3BzW2tleV0gPSB2YWx1ZVxuXG5cdFx0QGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IGlmIHN0YXJ0T3BlbiB0aGVuICcxJyBlbHNlICcwJ1xuXHRcdEBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZGV2aWNlXG5cblx0XHQjIFNldCBEZXZpY2UgT3B0aW9uc1xuXG5cdFx0ZGV2aWNlT3B0aW9ucyA9IFsnZnVsbHNjcmVlbiddXG5cdFx0Y3VycmVudFNlbGVjdGVkID0gdW5kZWZpbmVkXG5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBGcmFtZXIuRGV2aWNlQ29tcG9uZW50LkRldmljZXNcblx0XHRcdGlmIF8uZW5kc1dpdGgoa2V5LCAnaGFuZCcpXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGlmIG5vdCB2YWx1ZS5taW5TdHVkaW9WZXJzaW9uP1xuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRpZiBVdGlscy5mcmFtZXJTdHVkaW9WZXJzaW9uKCkgPiB2YWx1ZS5tYXhTdHVkaW9WZXJzaW9uXG5cdFx0XHRcdGNvbnRpbnVlIFxuXG5cdFx0XHRpZiBVdGlscy5mcmFtZXJTdHVkaW9WZXJzaW9uKCkgPCB2YWx1ZS5taW5TdHVkaW9WZXJzaW9uXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGRldmljZU9wdGlvbnMucHVzaCAoa2V5KVxuXG5cdFx0XHRpZiBrZXkgaXMgRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHRcdGN1cnJlbnRTZWxlY3RlZCA9IGRldmljZU9wdGlvbnMubGVuZ3RoIC0gMVxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGZyYW1lciBzZXR0aW5nc1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGRldmljZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdEZXZpY2UnXG5cblx0XHRAZGV2aWNlQm94ID0gbmV3IHBTZWxlY3Rcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0b3B0aW9uczogZGV2aWNlT3B0aW9uc1xuXHRcdFx0c2VsZWN0ZWQ6IGN1cnJlbnRTZWxlY3RlZFxuXHRcdFx0Y2FsbGJhY2s6IChpbmRleCkgPT5cblx0XHRcdFx0ZGV2aWNlVHlwZSA9IGRldmljZU9wdGlvbnNbaW5kZXhdXG5cdFx0XHRcdGRldmljZSA9IEZyYW1lci5EZXZpY2VDb21wb25lbnQuRGV2aWNlc1tkZXZpY2VUeXBlXVxuXHRcdFx0XHRcblx0XHRcdFx0Xy5hc3NpZ24gd2luZG93LmxvY2FsU3RvcmFnZSxcblx0XHRcdFx0XHRkZXZpY2VUeXBlOiBkZXZpY2VUeXBlXG5cdFx0XHRcdFx0ZGV2aWNlOiBkZXZpY2Vcblx0XHRcdFx0XHRiZzogU2NyZWVuLmJhY2tncm91bmRDb2xvclxuXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGFuaW1hdGlvbiBzcGVlZFxuXG5cdFx0QHNwZWVkUm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdTcGVlZCAxMDAlJ1xuXG5cdFx0bWlucCA9IHBhcnNlSW50KDAsIDEwKVxuXHRcdG1heHAgPSBwYXJzZUludCgxMDAsIDEwKVxuXHRcdFxuXHRcdG1pbnYgPSBNYXRoLmxvZygwLjAwMDAxKVxuXHRcdG1heHYgPSBNYXRoLmxvZygwLjAxNjY2NjY2NjY3KVxuXG5cdFx0dlNjYWxlID0gKG1heHYtbWludikgLyAobWF4cC1taW5wKVxuXG5cdFx0QHNwZWVkQm94ID0gbmV3IHBSYW5nZVxuXHRcdFx0cGFyZW50OiBAc3BlZWRSb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0YWN0aW9uOiAodmFsdWUpID0+XG5cblx0XHRcdFx0ZGVsdGEgPSBNYXRoLmV4cChtaW52ICsgdlNjYWxlKih2YWx1ZS1taW5wKSlcblx0XHRcdFx0cmF0ZSA9IChkZWx0YS8oMS82MCkpKjEwMFxuXHRcdFx0XHRzcGFjZXMgPSBpZiByYXRlIDwgMSB0aGVuIDIgZWxzZSBpZiByYXRlIDwgMTAgdGhlbiAxIGVsc2UgMFxuXG5cdFx0XHRcdEBzcGVlZFJvdy5sYWJlbC50ZXh0ID0gJ1NwZWVkICcgKyByYXRlLnRvRml4ZWQoc3BhY2VzKSArICclJ1xuXG5cdFx0XHRcdEZyYW1lci5Mb29wLmRlbHRhID0gZGVsdGFcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBsYXllciBkZXRhaWxzXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblxuXHRcdEBuYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cblx0XHRAY29tcG9uZW50TmFtZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBjb21wb25lbnROYW1lc1JvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUGFydCBvZidcblxuXHRcdEBjb21wb25lbnROYW1lc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogQGNvbXBvbmVudE5hbWVzUm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvbiBkZXRhaWxzXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdQb3NpdGlvbidcblxuXHRcdEB4Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNpemVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblxuXHRcdEB3aWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdEBoZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdoJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJhY2tncm91bmQgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnQmFja2dyb3VuZCdcblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmFkaWVudFxuXG5cdFx0QGdyYWRpZW50UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnR3JhZGllbnQnXG5cblx0XHRAZ3JhZGllbnRTdGFydEJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0QGdyYWRpZW50RW5kQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50IGFuZ2xlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGdyYWRpZW50QW5nbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdhJ1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIG9wYWNpdHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblxuXHRcdEBvcGFjaXR5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRuZXcgcERpdmlkZXJcblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBib3JkZXIgcHJvcGVydGllc1xuXG5cdFx0QGJvcmRlclByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHRwYXJlbnQ6IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHRAYm9yZGVyQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBib3JkZXJXaWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXHRcdFx0c2VjdGlvbjogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByYWRpdXNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0cGFyZW50OiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0QGJvcmRlclJhZGl1c0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2hhZG93XG5cblxuXHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXG5cdFx0QHNoYWRvd0NvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QHNoYWRvd1NwcmVhZEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAncydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAc2hhZG93WUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93Qmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdiJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdGV4dCBzdHlsZXNcblxuXHRcdEB0ZXh0UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZm9udCBmYW1pbHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cblx0XHRAZm9udEZhbWlseUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGNvbG9yXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdDb2xvcidcblxuXHRcdEBjb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGZvbnRTaXplQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHdlaWdodFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3R5bGUnXG5cblx0XHRAZm9udFN0eWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRAZm9udFdlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYWxpZ25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0FsaWduJ1xuXG5cdFx0QHRleHRBbGlnbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJ2xlZnQnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc3BhY2luZ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3BhY2luZydcblxuXHRcdEBsZXR0ZXJTcGFjaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdsdCdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0QGxpbmVIZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdsbidcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdUZXh0J1xuXG5cdFx0QHRleHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRyYW5zZm9ybSBwcm9wZXJ0aWVzXG5cblxuXHRcdEB0cmFuc2Zvcm1zRGl2ID0gbmV3IHBEaXZcblxuXHRcdEB0cmFuc2Zvcm1zQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnVHJhbnNmb3Jtcydcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNEaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNjYWxlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NjYWxlJ1xuXG5cdFx0QHNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2NhbGVYQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMSdcblxuXHRcdEBzY2FsZVlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByb3RhdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdSb3RhdGUnXG5cblx0XHRAcm90YXRpb25Cb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEByb3RhdGlvblhCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAneCdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0QHJvdGF0aW9uWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgb3JpZ2luXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ09yaWdpbidcblxuXHRcdEBvcmlnaW5YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnMC41MCdcblxuXHRcdEBvcmlnaW5ZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXHRcdFx0ZGVmYXVsdDogJzAuNTAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2tld1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTa2V3J1xuXG5cdFx0QHNrZXdCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBza2V3WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAc2tld1lCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3knXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwZXJzcGVjdGl2ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdQZXJzcGVjdGl2ZSdcblxuXHRcdEBwZXJzcGVjdGl2ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGZpbHRlcnMgcHJvcGVydGllc1xuXG5cdFx0QGZpbHRlcnNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGZpbHRlcnNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblx0XHRcdHRleHQ6ICdGaWx0ZXJzJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJsdXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQmx1cidcblxuXHRcdEBibHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJyaWdodG5lc3NcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQnJpZ2h0bmVzcydcblxuXHRcdEBicmlnaHRuZXNzQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcxMDAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29udHJhc3RcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQ29udHJhc3QnXG5cblx0XHRAY29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmF5c2NhbGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnR3JheXNjYWxlJ1xuXG5cdFx0QGdyYXlzY2FsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBodWVyb3RhdGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGh1ZVJvdGF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBpbnZlcnRcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnSW52ZXJ0J1xuXG5cdFx0QGludmVydEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzYXR1cmF0ZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTYXR1cmF0ZSdcblxuXHRcdEBzYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMTAwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNlcGlhXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NlcGlhJ1xuXG5cdFx0QHNlcGlhQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBlbmQgZmlsdGVyc1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZWZmZWN0cyBwcm9wZXJ0aWVzXG5cblxuXHRcdEBlZmZlY3RzRGl2ID0gbmV3IHBEaXZcblxuXHRcdEBlZmZlY3RzQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnRWZmZWN0cydcblx0XHRcdHBhcmVudDogQGVmZmVjdHNEaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJhY2tncm91bmQgZmlsdGVyc1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCbGVuZGluZydcblxuXHRcdEBibGVuZGluZ0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnZnVsbCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnbm9ybWFsJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdCbHVyJ1xuXG5cdFx0QGJhY2tncm91bmRCbHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYmFja2dyb3VuZEJyaWdodG5lc3NCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTYXR1cmF0ZSdcblxuXHRcdEBiYWNrZ3JvdW5kU2F0dXJhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdodWVSb3RhdGUnXG5cblx0XHRAYmFja2dyb3VuZEh1ZVJvdGF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdDb250cmFzdCdcblxuXHRcdEBiYWNrZ3JvdW5kQ29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzEwMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdJbnZlcnQnXG5cblx0XHRAYmFja2dyb3VuZEludmVydEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdHcmF5c2NhbGUnXG5cblx0XHRAYmFja2dyb3VuZEdyYXlzY2FsZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRkZWZhdWx0OiAnMCdcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBiYWNrZ3JvdW5kU2VwaWFCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGFuaW1hdGlvbiBwcm9wZXJ0aWVzXG5cblxuXHRcdEBhbmltc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRAYW5pbXNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdBbmltYXRpb25zJ1xuXHRcdFx0cGFyZW50OiBAYW5pbXNEaXZcblxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZXZlbnQgbGlzdGVuZXIgcHJvcGVydGllc1xuXG5cblx0XHRAZXZlbnRMaXN0ZW5lcnNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGV2ZW50TGlzdGVuZXJzQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnRXZlbnQgTGlzdGVuZXJzJ1xuXHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNEaXZcblxuXG5cblx0XHQjIGltYWdlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAaW1hZ2VQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0cGFyZW50OiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW1hZ2VcblxuXHRcdEBpbWFnZUJveCA9IG5ldyBwSW1hZ2Vcblx0XHRcdHBhcmVudDogQGltYWdlUHJvcGVydGllc0RpdlxuXHRcdFx0c2VjdGlvbjogQGltYWdlUHJvcGVydGllc0RpdlxuXG5cblx0XHQjIHNjcmVlbnNob3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRAc2NyZWVuc2hvdERpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2NyZWVuc2hvdFxuXG5cdFx0QHNjcmVlbnNob3RCb3ggPSBuZXcgcEltYWdlXG5cdFx0XHRwYXJlbnQ6IEBzY3JlZW5zaG90RGl2XG5cdFx0XHRzZWN0aW9uOiBAc2NyZWVuc2hvdERpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgcGxhY2Vob2xkZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0dGV4dDogJydcblx0XHRyb3cuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnNjRweCdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzb2NpYWwgbWVkaWEgbGlua3NcblxuXHRcdEBzb2NpYWxNZWRpYVJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0Rpdi5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGxpbmtlZGluSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEBsaW5rZWRpbkljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly93d3cubGlua2VkaW4uY29tL2luL3N0ZXZlcnVpem9rXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGlkPVwibGlua2VkaW5fbG9nb1wiIGNsYXNzPVwibG9nb1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48cGF0aCBkPVwiTTE5IDBoLTE0Yy0yLjc2MSAwLTUgMi4yMzktNSA1djE0YzAgMi43NjEgMi4yMzkgNSA1IDVoMTRjMi43NjIgMCA1LTIuMjM5IDUtNXYtMTRjMC0yLjc2MS0yLjIzOC01LTUtNXptLTExIDE5aC0zdi0xMWgzdjExem0tMS41LTEyLjI2OGMtLjk2NiAwLTEuNzUtLjc5LTEuNzUtMS43NjRzLjc4NC0xLjc2NCAxLjc1LTEuNzY0IDEuNzUuNzkgMS43NSAxLjc2NC0uNzgzIDEuNzY0LTEuNzUgMS43NjR6bTEzLjUgMTIuMjY4aC0zdi01LjYwNGMwLTMuMzY4LTQtMy4xMTMtNCAwdjUuNjA0aC0zdi0xMWgzdjEuNzY1YzEuMzk2LTIuNTg2IDctMi43NzcgNyAyLjQ3NnY2Ljc1OXpcIi8+PC9zdmc+J1xuXG5cdFx0QGdpdGh1Ykljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAZ2l0aHViSWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL2dpdGh1Yi5jb20vc3RldmVydWl6b2svZ290Y2hhXCJcblx0XHRcdGlubmVySFRNTDogJzxzdmcgaGVpZ2h0PVwiMjBweFwiIHdpZHRoPVwiMjBweFwiIGlkPVwiZ2l0aHViX2xvZ29cIiBjbGFzcz1cImxvZ29cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAxMDI0IDEwMjRcIj48cGF0aCBmaWxsPVwicmdiYSg5MSwgOTEsIDkxLCAxLjAwMClcIiBkPVwiTTUxMiAwQzIyOS4yNSAwIDAgMjI5LjI1IDAgNTEyYzAgMjI2LjI1IDE0Ni42ODggNDE4LjEyNSAzNTAuMTU2IDQ4NS44MTIgMjUuNTk0IDQuNjg4IDM0LjkzOC0xMS4xMjUgMzQuOTM4LTI0LjYyNSAwLTEyLjE4OC0wLjQ2OS01Mi41NjItMC43MTktOTUuMzEyQzI0MiA5MDguODEyIDIxMS45MDYgODE3LjUgMjExLjkwNiA4MTcuNWMtMjMuMzEyLTU5LjEyNS01Ni44NDQtNzQuODc1LTU2Ljg0NC03NC44NzUtNDYuNTMxLTMxLjc1IDMuNTMtMzEuMTI1IDMuNTMtMzEuMTI1IDUxLjQwNiAzLjU2MiA3OC40NyA1Mi43NSA3OC40NyA1Mi43NSA0NS42ODggNzguMjUgMTE5Ljg3NSA1NS42MjUgMTQ5IDQyLjUgNC42NTQtMzMgMTcuOTA0LTU1LjYyNSAzMi41LTY4LjM3NUMzMDQuOTA2IDcyNS40MzggMTg1LjM0NCA2ODEuNSAxODUuMzQ0IDQ4NS4zMTJjMC01NS45MzggMTkuOTY5LTEwMS41NjIgNTIuNjU2LTEzNy40MDYtNS4yMTktMTMtMjIuODQ0LTY1LjA5NCA1LjA2Mi0xMzUuNTYyIDAgMCA0Mi45MzgtMTMuNzUgMTQwLjgxMiA1Mi41IDQwLjgxMi0xMS40MDYgODQuNTk0LTE3LjAzMSAxMjguMTI1LTE3LjIxOSA0My41IDAuMTg4IDg3LjMxMiA1Ljg3NSAxMjguMTg4IDE3LjI4MSA5Ny42ODgtNjYuMzEyIDE0MC42ODgtNTIuNSAxNDAuNjg4LTUyLjUgMjggNzAuNTMxIDEwLjM3NSAxMjIuNTYyIDUuMTI1IDEzNS41IDMyLjgxMiAzNS44NDQgNTIuNjI1IDgxLjQ2OSA1Mi42MjUgMTM3LjQwNiAwIDE5Ni42ODgtMTE5Ljc1IDI0MC0yMzMuODEyIDI1Mi42ODggMTguNDM4IDE1Ljg3NSAzNC43NSA0NyAzNC43NSA5NC43NSAwIDY4LjQzOC0wLjY4OCAxMjMuNjI1LTAuNjg4IDE0MC41IDAgMTMuNjI1IDkuMzEyIDI5LjU2MiAzNS4yNSAyNC41NjJDODc3LjQzOCA5MzAgMTAyNCA3MzguMTI1IDEwMjQgNTEyIDEwMjQgMjI5LjI1IDc5NC43NSAwIDUxMiAwelwiIC8+PC9zdmc+J1xuXG5cdFx0QHR3aXR0ZXJJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQHR3aXR0ZXJJY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vdHdpdHRlci5jb20vc3RldmVydWl6b2tcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyOHB4XCIgd2lkdGg9XCIyOHB4XCIgaWQ9XCJ0d2l0dGVyX2xvZ29cIiBjbGFzcz1cImxvZ29cIiBkYXRhLW5hbWU9XCJMb2dvIOKAlCBGSVhFRFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDQwMCA0MDBcIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9LmNscy0ye2ZpbGw6cmdiYSg5MSwgOTEsIDkxLCAxLjAwMCk7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5Ud2l0dGVyX0xvZ29fQmx1ZTwvdGl0bGU+PHJlY3QgY2xhc3M9XCJjbHMtMVwiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiNDAwXCIvPjxwYXRoIGNsYXNzPVwiY2xzLTJcIiBkPVwiTTE1My42MiwzMDEuNTljOTQuMzQsMCwxNDUuOTQtNzguMTYsMTQ1Ljk0LTE0NS45NCwwLTIuMjIsMC00LjQzLS4xNS02LjYzQTEwNC4zNiwxMDQuMzYsMCwwLDAsMzI1LDEyMi40N2ExMDIuMzgsMTAyLjM4LDAsMCwxLTI5LjQ2LDguMDcsNTEuNDcsNTEuNDcsMCwwLDAsMjIuNTUtMjguMzcsMTAyLjc5LDEwMi43OSwwLDAsMS0zMi41NywxMi40NSw1MS4zNCw1MS4zNCwwLDAsMC04Ny40MSw0Ni43OEExNDUuNjIsMTQ1LjYyLDAsMCwxLDkyLjQsMTA3LjgxYTUxLjMzLDUxLjMzLDAsMCwwLDE1Ljg4LDY4LjQ3QTUwLjkxLDUwLjkxLDAsMCwxLDg1LDE2OS44NmMwLC4yMSwwLC40MywwLC42NWE1MS4zMSw1MS4zMSwwLDAsMCw0MS4xNSw1MC4yOCw1MS4yMSw1MS4yMSwwLDAsMS0yMy4xNi44OCw1MS4zNSw1MS4zNSwwLDAsMCw0Ny45MiwzNS42MiwxMDIuOTIsMTAyLjkyLDAsMCwxLTYzLjcsMjJBMTA0LjQxLDEwNC40MSwwLDAsMSw3NSwyNzguNTVhMTQ1LjIxLDE0NS4yMSwwLDAsMCw3OC42MiwyM1wiLz48L3N2Zz4nXG5cblx0XHRmb3IgZWxlbWVudCBpbiBbQGxpbmtlZGluSWNvbiwgQGdpdGh1Ykljb24sIEB0d2l0dGVySWNvbl1cblx0XHRcdEBzb2NpYWxNZWRpYVJvdy5lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpXG5cdFx0XHRAc29jaWFsTWVkaWFSb3cuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzb2NpYWxMaW5rcycpXG5cblx0XHRAaGlkZURpdnMoKVxuXG5cdGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnM6IChhbmltYXRpb25zKSA9PlxuXHRcdGNoaWxkID0gQGFuaW1zQWNjby5ib2R5LmVsZW1lbnQuY2hpbGROb2Rlc1swXVxuXG5cdFx0aWYgbm90IGNoaWxkXG5cdFx0XHRAc2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblx0XHRcdHJldHVyblxuXG5cdFx0QGFuaW1zQWNjby5ib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG5cdFx0QGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblxuXHRjbGVhckNoaWxkcmVuVGhlblNob3dFdmVudExpc3RlbmVyczogKGV2ZW50TGlzdGVuZXJzKSA9PlxuXG5cdFx0Y2hpbGQgPSBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHkuZWxlbWVudC5jaGlsZE5vZGVzWzBdXG5cblx0XHRpZiBub3QgY2hpbGRcblx0XHRcdEBzaG93RXZlbnRMaXN0ZW5lcnMoZXZlbnRMaXN0ZW5lcnMpXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBldmVudExpc3RlbmVyc0FjY28uYm9keS5lbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkKVxuXHRcdEBjbGVhckNoaWxkcmVuVGhlblNob3dFdmVudExpc3RlbmVycyhldmVudExpc3RlbmVycylcblxuXHRzaG93RXZlbnRMaXN0ZW5lcnM6IChldmVudExpc3RlbmVycyA9IFtdKSA9PlxuXG5cdFx0ZGVmYXVsdHMgPSBbXG5cdFx0XHRcImZ1bmN0aW9uICgpe3JldHVybiBmbi5hcHBseShtZSxhcmd1bWVudHMpfVwiLCBcblx0XHRcdFwiZnVuY3Rpb24gKCl7cmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpfVwiLCBcblx0XHRcdFwiZnVuY3Rpb24gKGV2ZW50KXtyZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cIixcblx0XHRcdFwiZnVuY3Rpb24gKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfVwiLFxuXHRcdFx0J2Z1bmN0aW9uIGRlYm91bmNlZCgpe3ZhciB0aW1lPW5vdygpLGlzSW52b2tpbmc9c2hvdWxkSW52b2tlKHRpbWUpO2lmKGxhc3RBcmdzPWFyZ3VtZW50cyxsYXN0VGhpcz10aGlzLGxhc3RDYWxsVGltZT10aW1lLGlzSW52b2tpbmcpe2lmKHRpbWVySWQ9PT11bmRlZmluZWQpcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7aWYobWF4aW5nKXJldHVybiB0aW1lcklkPXNldFRpbWVvdXQodGltZXJFeHBpcmVkLHdhaXQpLGludm9rZUZ1bmMobGFzdENhbGxUaW1lKX1yZXR1cm4gdGltZXJJZD09PXVuZGVmaW5lZCYmKHRpbWVySWQ9c2V0VGltZW91dCh0aW1lckV4cGlyZWQsd2FpdCkpLHJlc3VsdH0nLFxuXHRcdFx0J2Z1bmN0aW9uICh2YWx1ZSl7aWYobnVsbCE9PXZhbHVlKXJldHVyblwiZm9udFNpemVcIiE9PXByb3BlcnR5JiZcImZvbnRcIiE9PXByb3BlcnR5JiZfdGhpcy5fc3R5bGVkVGV4dC5yZXNldFN0eWxlKHByb3BlcnR5KSxfdGhpcy5yZW5kZXJUZXh0KCl9Jyxcblx0XHRdXG5cblx0XHRyZWFsTGlzdGVuZXJzID0gMFxuXG5cdFx0Zm9yIGxpc3RlbmVyLCBpIGluIGV2ZW50TGlzdGVuZXJzXG5cblx0XHRcdGNvbnRpbnVlIGlmIF8uZXZlcnkobGlzdGVuZXIuZXZlbnRzLCAoZSkgLT4gXy5pbmNsdWRlcyhkZWZhdWx0cywgZS5mdW5jdGlvbikpXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdCMgbGlzdGVuZXJcblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJ1wiJyArIGxpc3RlbmVyLmxpc3RlbmVyICsgJ1wiJ1xuXHRcdFx0XHRib2xkOiB0cnVlXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdCMgZXZlbnRzXG5cblx0XHRcdGZvciBldmVudCwgZSBpbiBsaXN0ZW5lci5ldmVudHNcblxuXHRcdFx0XHRjb250aW51ZSBpZiBfLmluY2x1ZGVzKGRlZmF1bHRzLCBldmVudC5mdW5jdGlvbilcblxuXHRcdFx0XHRyZWFsTGlzdGVuZXJzKytcblxuXHRcdFx0XHQjIG5hbWVcblxuXHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdHBhcmVudDogQGV2ZW50TGlzdGVuZXJzQWNjby5ib2R5XG5cdFx0XHRcdFx0dGV4dDogJ05hbWUnXG5cdFx0XHRcdFxuXHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0dmFsdWU6IGV2ZW50Lm5hbWUgPyAnJ1xuXHRcdFx0XHRcdGlzRGVmYXVsdDogZXZlbnQubmFtZSBpc250ICd1bmRlZmluZWQnXG5cblx0XHRcdFx0IyBmdW5jdGlvblxuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnRnVuY3Rpb24nXG5cdFx0XHRcdFxuXHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0dmFsdWU6IGV2ZW50LmZ1bmN0aW9uXG5cdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdCMgT25jZVxuXG5cdFx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblx0XHRcdFx0XHR0ZXh0OiAnT25jZSdcblx0XHRcdFx0XG5cdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHR2YWx1ZTogZXZlbnQub25jZVxuXHRcdFx0XHRcdGlzRGVmYXVsdDogZXZlbnQubmFtZSBpc250ICdmYWxzZSdcblxuXHRcdFx0XHR1bmxlc3MgZSBpcyBsaXN0ZW5lci5ldmVudHMubGVuZ3RoIC0gMVxuXHRcdFx0XHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0XHRcdFx0cGFyZW50OiBAZXZlbnRMaXN0ZW5lcnNBY2NvLmJvZHlcblxuXHRcdFx0dW5sZXNzIGkgaXMgZXZlbnRMaXN0ZW5lcnMubGVuZ3RoIC0gMVxuXHRcdFx0XHRuZXcgcERpdmlkZXJcblx0XHRcdFx0XHRwYXJlbnQ6IEBldmVudExpc3RlbmVyc0FjY28uYm9keVxuXG5cblx0XHQjIHNldCBjb2xvclxuXG5cdFx0aWYgcmVhbExpc3RlbmVycyBpcyAwXG5cdFx0XHRAZXZlbnRMaXN0ZW5lcnNBY2NvLmNvbG9yID0gJyM4ODg4ODgnXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBldmVudExpc3RlbmVyc0FjY28uY29sb3IgPSAnI0ZGRkZGRidcblxuXHRzaG93QW5pbWF0aW9uczogKGFuaW1hdGlvbnMpID0+XG5cdFx0XG5cdFx0QGFuaW1zQWNjby5jb2xvciA9IGlmIGFuaW1hdGlvbnMubGVuZ3RoID4gMCB0aGVuICcjRkZGJyBlbHNlICcjODg4ODg4J1xuXHRcblx0XHRmb3IgYW5pbSwgaSBpbiBhbmltYXRpb25zXG5cblx0XHRcdHByb3BlcnRpZXMgPSBhbmltLnByb3BlcnRpZXNcblx0XHRcdG9wdGlvbnMgPSBhbmltLm9wdGlvbnNcblx0XHRcdHN0YXRlQSA9IGFuaW0uX3N0YXRlQVxuXHRcdFx0c3RhdGVCID0gYW5pbS5fc3RhdGVCXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0IyBhbmltYXRpb25cblxuXHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0dGV4dDogJ0FuaW1hdGlvbiAnICsgKGkgKyAxKVxuXHRcdFx0XHRib2xkOiB0cnVlXG5cblx0XHRcdGZyb21Vbml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dGV4dDogJ2Zyb20nXG5cblx0XHRcdHRvVW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdFx0cGFyZW50OiByb3cgXG5cdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHR0ZXh0OiAndG8nXG5cblx0XHRcdGZvciBlbGVtZW50IGluIFtmcm9tVW5pdC5lbGVtZW50LCB0b1VuaXQuZWxlbWVudF1cblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbGlnbkxlZnQnKVxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBwcm9wZXJ0aWVzXG5cblx0XHRcdGZvciBrZXksIHZhbHVlIG9mIHByb3BlcnRpZXNcblxuXHRcdFx0XHRpZiBDb2xvci5pc0NvbG9yT2JqZWN0KHZhbHVlKSBvciBDb2xvci5pc0NvbG9yKHZhbHVlKVxuXG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiBfLnN0YXJ0Q2FzZShrZXkpXG5cblx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVBP1trZXldXG5cdFx0XHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUI/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRlbHNlIGlmIGtleSBpcyAnZ3JhZGllbnQnXG5cblx0XHRcdFx0XHQjIHN0YXJ0XG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBTdGFydCdcblx0XHRcdFx0XG5cdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBDb2xvclxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XT8uc3RhcnRcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcENvbG9yXG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XT8uc3RhcnRcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgZW5kXG5cdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdFx0XHR0ZXh0OiAnR3JhZCBFbmQnXG5cdFx0XHRcdFxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV0/LmVuZFxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdGJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCP1trZXldPy5lbmRcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgYW5nbGVcblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6ICdHcmFkIEFuZ2xlJ1xuXHRcdFx0XHRcblx0XHRcdFx0XHQjIGZyb20gXG5cdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQT9ba2V5XT8uYW5nbGVcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XT8uYW5nbGVcblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdHRleHQ6IF8uc3RhcnRDYXNlKGtleSlcblxuXHRcdFx0XHRcdCMgZnJvbVxuXHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUE/W2tleV1cblx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdCMgdG9cblx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQj9ba2V5XVxuXHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0IyBvcHRpb25zXG5cblx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdHRleHQ6ICdPcHRpb25zJ1xuXG5cdFx0XHQjIHRpbWVcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dW5pdDogJ3MnXG5cdFx0XHRcdHZhbHVlOiBvcHRpb25zLnRpbWVcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHQjIHRpbWVcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdHVuaXQ6ICdkJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5kZWxheVxuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cdFx0XHRcdHRleHQ6ICcnXG5cblx0XHRcdCMgcmVwZWF0XG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdHVuaXQ6ICdyJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5yZXBlYXRcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHQjIHRpbWVcblx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHRcdHVuaXQ6ICdsJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy5sb29waW5nXG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0dW5sZXNzIGkgaXMgYW5pbWF0aW9ucy5sZW5ndGggLSAxXG5cdFx0XHRcdG5ldyBwRGl2aWRlclxuXHRcdFx0XHRcdHBhcmVudDogQGFuaW1zQWNjby5ib2R5XG5cblx0XHRcblx0c2hvd1Byb3BlcnRpZXM6IChsYXllciwgY3VzdG9tUHJvcHMpID0+XG5cblx0XHRAc2Nyb2xsVG9wID0gQGVsZW1lbnQuc2Nyb2xsVG9wXG5cblx0XHRwcm9wcyA9IGxheWVyLnByb3BzXG5cdFx0Xy5hc3NpZ24gcHJvcHMsIGN1c3RvbVByb3BzXG5cblx0XHRkZWZhdWx0cyA9IGxheWVyLl9wcm9wZXJ0eUxpc3QoKVxuXG5cdFx0Xy5hc3NpZ24gZGVmYXVsdHMsXG5cdFx0XHRyb3RhdGlvbjogZGVmYXVsdHMucm90YXRpb25aXG5cdFx0XHRibGVuZGluZzoge2RlZmF1bHQ6ICdub3JtYWwnfVxuXG5cdFx0QGhpZGVEaXZzKClcblxuXHRcdGZvciBrZXksIHZhbHVlIG9mIF8ubWVyZ2UobGF5ZXIucHJvcHMsIGN1c3RvbVByb3BzKVxuXG5cdFx0XHRwcm9wTGF5ZXIgPSBAW2tleSArICdCb3gnXVxuXG5cdFx0XHRpZiBub3QgcHJvcExheWVyXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGRlZiA9IGRlZmF1bHRzW2tleV0/LmRlZmF1bHRcblx0XHRcdFxuXHRcdFx0QHNob3dQcm9wZXJ0eShrZXksIHZhbHVlLCBwcm9wTGF5ZXIsIGRlZilcblxuXHRcdEBzaG93T3ZlcnJpZGVJbkFjY28oQGVmZmVjdHNEaXYsIEBlZmZlY3RzQWNjbylcblx0XHRAc2hvd092ZXJyaWRlSW5BY2NvKEBmaWx0ZXJzRGl2LCBAZmlsdGVyc0FjY28pXG5cdFx0QHNob3dPdmVycmlkZUluQWNjbyhAdHJhbnNmb3Jtc0RpdiwgQHRyYW5zZm9ybXNBY2NvKVxuXHRcdFx0XHRcblx0XHRAZWxlbWVudC5zY3JvbGxUb3AgPSBAc2Nyb2xsVG9wXG5cblx0c2hvd092ZXJyaWRlSW5BY2NvOiAoZGl2LCBhY2NvKSAtPlxuXHRcdGFjY28uY29sb3IgPSAnIzg4ODg4OCdcblx0XHRmb3IgcHJvcExheWVyIGluIGRpdi5wcm9wZXJ0aWVzXG5cdFx0XHRpZiBwcm9wTGF5ZXIudmFsdWU/IGFuZCBwcm9wTGF5ZXIudmFsdWUgaXNudCBwcm9wTGF5ZXIuZGVmYXVsdFxuXHRcdFx0XHRhY2NvLmNvbG9yID0gJyNGRkYnXG5cblx0c2hvd1Byb3BlcnR5OiAoa2V5LCB2YWx1ZSwgcHJvcExheWVyLCBkZWYpID0+XG5cblx0XHRyZXR1cm4gaWYgdmFsdWUgaXMgcHJvcExheWVyLnZhbHVlXG5cblx0XHRwcm9wTGF5ZXIuaXNEZWZhdWx0ID0gZmFsc2VcblxuXHRcdGlmIG5vdCB2YWx1ZT8gb3IgXy5pc05hTih2YWx1ZSkgb3IgdmFsdWUgaXMgZGVmXG5cdFx0XHR2YWx1ZSA9IGRlZiA/ICcnXG5cdFx0XHRwcm9wTGF5ZXIuaXNEZWZhdWx0ID0gdHJ1ZVxuXG5cdFx0IyBjb2xvclxuXHRcdGlmIENvbG9yLmlzQ29sb3JPYmplY3QodmFsdWUpXG5cdFx0XHR2YWx1ZSA9IHZhbHVlLnRvSHNsU3RyaW5nKClcblxuXHRcdCMgZ3JhZGllbnRcblx0XHRpZiB2YWx1ZT8uY29uc3RydWN0b3I/Lm5hbWUgaXMgJ0dyYWRpZW50J1xuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gJydcblx0XHRcdHJldHVyblxuXG5cdFx0IyBzdHJpbmdcblx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ3N0cmluZydcblx0XHRcdHByb3BMYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm5cblxuXHRcdHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKVxuXG5cdFx0IyBmbG9hdFxuXHRcdGlmIHZhbHVlLmluZGV4T2YoJy4nKSBpc250IC0xXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKS50b0ZpeGVkKDIpXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgbnVtZXJcblx0XHRwcm9wTGF5ZXIudmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApLnRvRml4ZWQoKVxuXG5cdGhpZGVEaXZzOiA9PlxuXHRcdGZvciBkaXYgaW4gW1xuXHRcdFx0QGdyYWRpZW50UHJvcGVydGllc0Rpdixcblx0XHRcdEB0ZXh0UHJvcGVydGllc0Rpdixcblx0XHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QGJvcmRlclByb3BlcnRpZXNEaXYsXG5cdFx0XHRAaW1hZ2VQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QHNjcmVlbnNob3REaXZcblx0XHRdXG5cdFx0XHRkaXYudmlzaWJsZSA9IGZhbHNlXG5cblxuXG5cblxuXG5cblxucHJvcExheWVycyA9IFtdXG5cbiMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0IC44ODg4OC4gICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG5cdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cblx0ODggICBZUDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG5cdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcblx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODg4OFxuXG4jIyMgXG5cblxuY2xhc3MgR290Y2hhXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QHNwZWNQYW5lbCA9IG5ldyBTcGVjUGFuZWxcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGNvbG9yOiAncmdiYSg3MiwgMjA3LCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlbGVjdGVkQ29sb3I6ICdyZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogJyNGRkZGRkYnXG5cdFx0XHRmb250RmFtaWx5OiAnTWVubG8nXG5cdFx0XHRmb250U2l6ZTogJzEwJ1xuXHRcdFx0Zm9udFdlaWdodDogJzUwMCdcblx0XHRcdGJvcmRlclJhZGl1czogNFxuXHRcdFx0cGFkZGluZzoge3RvcDogMSwgYm90dG9tOiAxLCBsZWZ0OiAzLCByaWdodDogM31cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5jb2xvclxuXHRcdFx0c2VsZWN0ZWRDb2xvcjogb3B0aW9ucy5zZWxlY3RlZENvbG9yXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogb3B0aW9ucy5zZWNvbmRhcnlDb2xvclxuXHRcdFx0Zm9udEZhbWlseTogb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0XHRmb250U2l6ZTogb3B0aW9ucy5mb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogb3B0aW9ucy5mb250V2VpZ2h0XG5cdFx0XHRzaGFwZXM6IFtdXG5cdFx0XHRib3JkZXJSYWRpdXM6IG9wdGlvbnMuYm9yZGVyUmFkaXVzXG5cdFx0XHRwYWRkaW5nOiBvcHRpb25zLnBhZGRpbmdcblx0XHRcdGZvY3VzZWRFbGVtZW50OiB1bmRlZmluZWRcblx0XHRcdGVuYWJsZWQ6IGZhbHNlXG5cdFx0XHRzY3JlZW5FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcdGxheWVyczogW11cblx0XHRcdGNvbnRhaW5lcnM6IFtdXG5cdFx0XHR0aW1lcjogdW5kZWZpbmVkXG5cdFx0XHRfb25seVZpc2libGU6IHRydWVcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgQHRvZ2dsZSlcblx0XHRGcmFtZXIuQ3VycmVudENvbnRleHQuZG9tRXZlbnRNYW5hZ2VyLndyYXAod2luZG93KS5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIEB1cGRhdGUpXG5cblx0XHRAY29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckxheWVyIERldmljZVNjcmVlbicpWzBdXG5cdFx0QGNvbnRleHQuY2xhc3NMaXN0LmFkZCgnaG92ZXJDb250ZXh0Jylcblx0XHRAY29udGV4dC5jaGlsZE5vZGVzWzJdLmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHRcIm9ubHlWaXNpYmxlXCIsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX29ubHlWaXNpYmxlXG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRyZXR1cm4gaWYgdHlwZW9mIGJvb2wgaXNudCAnYm9vbGVhbidcblx0XHRcdFx0QF9vbmx5VmlzaWJsZSA9IGJvb2xcblxuXHRcdEZyYW1lci5EZXZpY2Uub24gXCJjaGFuZ2U6ZGV2aWNlVHlwZVwiLCA9PlxuXHRcdFx0VXRpbHMuZGVsYXkgMCwgQHVwZGF0ZVxuXG5cdHRvZ2dsZTogKGV2ZW50LCBvcGVuKSA9PlxuXHRcdCMgcmV0dXJuIGlmIEZyYW1lci5EZXZpY2UuaGFuZHMuaXNBbmltYXRpbmdcblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcImBcIiBvciBldmVudC5rZXkgaXMgXCI8XCIgb3Igb3BlbiBpcyB0cnVlXG5cdFx0XHRpZiBAb3BlbmVkIHRoZW4gQGRpc2FibGUoKSBlbHNlIEBlbmFibGUoKVxuXHRcdFx0QG9wZW5lZCA9ICFAb3BlbmVkXG5cdFx0XHRyZXR1cm5cblxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdGlmIGV2ZW50LmtleSBpcyBcIi9cIiBvciBldmVudC5rZXkgaXMgXCI+XCJcblx0XHRcdEBzZXRTZWxlY3RlZExheWVyKClcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiLlwiXG5cdFx0XHRAaG92ZXJlZExheWVyPy5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiXFxcXFwiXG5cdFx0XHRAX2xhc3RTcGVlZCA/PSAxXG5cdFx0XHR0aGlzU3BlZWQgPSBAc3BlY1BhbmVsLnNwZWVkQm94LmVsZW1lbnQudmFsdWVcblxuXHRcdFx0aWYgdGhpc1NwZWVkIGlzIFwiMFwiXG5cdFx0XHRcdEBzcGVjUGFuZWwuc3BlZWRCb3guZWxlbWVudC52YWx1ZSA9IEBfbGFzdFNwZWVkXG5cdFx0XHRcdEBzcGVjUGFuZWwuc3BlZWRCb3guYWN0aW9uKEBfbGFzdFNwZWVkKVxuXHRcdFx0ZWxzZSBcblx0XHRcdFx0QHNwZWNQYW5lbC5zcGVlZEJveC5lbGVtZW50LnZhbHVlID0gMFxuXHRcdFx0XHRGcmFtZXIuTG9vcC5kZWx0YSA9IC4wMDAwMDAwMDAwMDAwMDAwMDAwMDFcblx0XHRcdFx0QF9sYXN0U3BlZWQgPSB0aGlzU3BlZWRcblxuXHQjIG9wZW4gdGhlIHBhbmVsLCBzdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuXHRlbmFibGU6ID0+XG5cdFx0QF9jYW52YXNDb2xvciA9IENhbnZhcy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRzdmdDb250ZXh0LnNldENvbnRleHQoKVxuXG5cdFx0QHRyYW5zaXRpb24odHJ1ZSlcblxuXHRcdGlmIEB0aW1lcj8gdGhlbiBjbGVhckludGVydmFsIEB0aW1lclxuXHRcdEB0aW1lciA9IFV0aWxzLmludGVydmFsIDEvMzAsIEBmb2N1c1xuXG5cdGRpc2FibGU6ID0+XG5cdFx0QHVuZm9jdXMoKVxuXHRcdEBlbmFibGVkID0gZmFsc2VcblxuXHRcdEB0cmFuc2l0aW9uKGZhbHNlKVxuXG5cdFx0aWYgQHRpbWVyPyB0aGVuIGNsZWFySW50ZXJ2YWwgQHRpbWVyXG5cblx0dHJhbnNpdGlvbjogKG9wZW4gPSB0cnVlLCBzZWNvbmRzID0gLjUpID0+XG5cdFx0aGFuZHMgPSBGcmFtZXIuRGV2aWNlLmhhbmRzXG5cblx0XHRoYW5kcy5vbiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXG5cdFx0aGFuZHMub25jZSBFdmVudHMuQW5pbWF0aW9uRW5kLCA9PlxuXHRcdFx0aGFuZHMub2ZmIFwiY2hhbmdlOnhcIiwgQHNob3dUcmFuc2l0aW9uXG5cdFx0XHRAZW5hYmxlZCA9IEBvcGVuZWQgPSBvcGVuXG5cblx0XHRcdGlmIG9wZW5cblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuTW91c2VPdXQsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLmJhY2tncm91bmQub24gRXZlbnRzLk1vdXNlT3ZlciwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3ZlciwgQHNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vZmYgRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5iYWNrZ3JvdW5kLm9mZiBFdmVudHMuTW91c2VPdmVyLCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5DbGljaywgQHNldFNlbGVjdGVkTGF5ZXJcblxuXHRcdFx0QGZvY3VzKClcblxuXHRcdEBfc3RhcnRQb3NpdGlvbiA9IEZyYW1lci5EZXZpY2UuaGFuZHMueFxuXG5cdFx0bWlkWCA9IGhhbmRzLl9jb250ZXh0LmlubmVyV2lkdGggLyAyXG5cblx0XHRGcmFtZXIuRGV2aWNlLmhhbmRzLmFuaW1hdGVcblx0XHRcdG1pZFg6IGlmIG9wZW4gdGhlbiBtaWRYIC0gMTEyIGVsc2UgbWlkWFxuXHRcdFx0b3B0aW9uczpcblx0XHRcdFx0dGltZTogc2Vjb25kc1xuXHRcdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEwKVxuXG5cdHNob3dUcmFuc2l0aW9uOiA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXHRcdG1pZFggPSBoYW5kcy5fY29udGV4dC5pbm5lcldpZHRoIC8gMlxuXG5cdFx0b3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0aGFuZHMubWlkWCxcblx0XHRcdFttaWRYIC0gNTYsIG1pZFggLSAxMTJdLCBcblx0XHRcdFswLCAxXSwgXG5cdFx0XHR0cnVlXG5cdFx0KVxuXG5cdFx0ZmFjdG9yID0gVXRpbHMubW9kdWxhdGUoXG5cdFx0XHRoYW5kcy5taWRYLFxuXHRcdFx0W21pZFgsIG1pZFggLSAxMTJdLFxuXHRcdFx0WzAsIDFdLFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdEBzcGVjUGFuZWwuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eVxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBDb2xvci5taXggQF9jYW52YXNDb2xvciwncmdiYSgzMCwgMzAsIDMwLCAxLjAwMCknLCBmYWN0b3JcblxuXHQjIHVwZGF0ZSB3aGVuIHNjcmVlbiBzaXplIGNoYW5nZXNcblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQG9wZW5lZFxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5taWRYIC09IDEyMlxuXG5cdFx0c3ZnQ29udGV4dC5zZXRDb250ZXh0KClcblx0XHRAZm9jdXMoKVxuXG5cdCMgZ2V0IHRoZSBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnRcblx0Z2V0RGltZW5zaW9uczogKGVsZW1lbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0ZCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuXHRcdGRpbWVuc2lvbnMgPSB7XG5cdFx0XHR4OiBkLmxlZnRcblx0XHRcdHk6IGQudG9wXG5cdFx0XHR3aWR0aDogZC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBkLmhlaWdodFxuXHRcdFx0bWlkWDogZC5sZWZ0ICsgKGQud2lkdGggLyAyKVxuXHRcdFx0bWlkWTogZC50b3AgKyAoZC5oZWlnaHQgLyAyKVxuXHRcdFx0bWF4WDogZC5sZWZ0ICsgZC53aWR0aFxuXHRcdFx0bWF4WTogZC50b3AgKyBkLmhlaWdodFxuXHRcdFx0ZnJhbWU6IGRcblx0XHR9XG5cblx0XHRyZXR1cm4gZGltZW5zaW9uc1xuXG5cdCMgbWFrZSBhIHJlbGF0aXZlIGRpc3RhbmNlIGxpbmVcblx0bWFrZUxpbmU6IChwb2ludEEsIHBvaW50QiwgbGFiZWwgPSB0cnVlKSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGluZSA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXX1cIlxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRpZiBwb2ludEFbMF0gaXMgcG9pbnRCWzBdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXSAtIDV9ICN7cG9pbnRBWzFdfSBMICN7cG9pbnRBWzBdICsgNX0gI3twb2ludEFbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdIC0gNX0gI3twb2ludEJbMV19IEwgI3twb2ludEJbMF0gKyA1fSAje3BvaW50QlsxXX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0ZWxzZSBpZiBwb2ludEFbMV0gaXMgcG9pbnRCWzFdXG5cblx0XHRcdGNhcEEgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QVswXX0gI3twb2ludEFbMV0gLSA1fSBMICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdFx0Y2FwQiA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0XHR0eXBlOiAncGF0aCdcblx0XHRcdFx0ZDogXCJNICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSAtIDV9IEwgI3twb2ludEJbMF19ICN7cG9pbnRCWzFdICsgNX1cIlxuXHRcdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdCMgbWFrZSB0aGUgbGFiZWwgYm94IGZvciBkaXN0YW5jZSBsaW5lc1xuXHRtYWtlTGFiZWw6ICh4LCB5LCB0ZXh0KSA9PlxuXG5cdFx0Y29sb3IgPSBpZiBAc2VsZWN0ZWRMYXllcj8gdGhlbiBAc2VsZWN0ZWRDb2xvciBlbHNlIEBjb2xvclxuXG5cdFx0bGFiZWwgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICd0ZXh0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiB4XG5cdFx0XHR5OiB5XG5cdFx0XHQnZm9udC1mYW1pbHknOiBAZm9udEZhbWlseVxuXHRcdFx0J2ZvbnQtc2l6ZSc6IEBmb250U2l6ZVxuXHRcdFx0J2ZvbnQtd2VpZ2h0JzogQGZvbnRXZWlnaHRcblx0XHRcdGZpbGw6IEBzZWNvbmRhcnlDb2xvclxuXHRcdFx0dGV4dDogTWF0aC5mbG9vcih0ZXh0IC8gQHJhdGlvKVxuXG5cdFx0bCA9IEBnZXREaW1lbnNpb25zKGxhYmVsLmVsZW1lbnQpXG5cblx0XHRsYWJlbC54ID0geCAtIGwud2lkdGggLyAyXG5cdFx0bGFiZWwueSA9IHkgKyBsLmhlaWdodCAvIDQgLSAxXG5cblx0XHRib3ggPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBsYWJlbC54IC0gQHBhZGRpbmcubGVmdFxuXHRcdFx0eTogbGFiZWwueSAtIGwuaGVpZ2h0ICsgMVxuXHRcdFx0d2lkdGg6IGwud2lkdGggKyBAcGFkZGluZy5sZWZ0ICsgQHBhZGRpbmcucmlnaHRcblx0XHRcdGhlaWdodDogbC5oZWlnaHQgKyBAcGFkZGluZy50b3AgKyBAcGFkZGluZy5ib3R0b20gKyAxXG5cdFx0XHRyeDogQGJvcmRlclJhZGl1c1xuXHRcdFx0cnk6IEBib3JkZXJSYWRpdXNcblx0XHRcdGZpbGw6IG5ldyBDb2xvcihjb2xvcikuZGFya2VuKDQwKVxuXHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRsYWJlbC5zaG93KClcblxuXHQjIG1ha2UgdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBmb3Igc2VsZWN0ZWQgLyBob3ZlcmVkIGVsZW1lbnRzXG5cdG1ha2VSZWN0T3ZlcmxheXM6IChzZWxlY3RlZExheWVyLCBzLCBob3ZlcmVkTGF5ZXIsIGgpID0+XG5cdFx0aWYgbm90IHMgb3Igbm90IGhcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgaG92ZXJlZExheWVyIGlzIHNlbGVjdGVkTGF5ZXJcblx0XHRcdGhvdmVyZWRMYXllciA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRob3ZlckZpbGwgPSBuZXcgQ29sb3IoQGNvbG9yKS5hbHBoYSguMilcblxuXHRcdGlmIGhvdmVyZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoMClcblxuXHRcdGhvdmVyZWRSZWN0ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogaC54XG5cdFx0XHR5OiBoLnlcblx0XHRcdHdpZHRoOiBoLndpZHRoXG5cdFx0XHRoZWlnaHQ6IGguaGVpZ2h0XG5cdFx0XHRzdHJva2U6IEBjb2xvclxuXHRcdFx0ZmlsbDogaG92ZXJGaWxsXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKC4yKVxuXHRcdFxuXHRcdGlmIHNlbGVjdGVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdHNlbGVjdEZpbGwgPSBuZXcgQ29sb3IoQHNlbGVjdGVkQ29sb3IpLmFscGhhKDApXG5cblx0XHRzZWxlY3RlZFJlY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdyZWN0J1xuXHRcdFx0cGFyZW50OiBzdmdDb250ZXh0XG5cdFx0XHR4OiBzLnhcblx0XHRcdHk6IHMueVxuXHRcdFx0d2lkdGg6IHMud2lkdGhcblx0XHRcdGhlaWdodDogcy5oZWlnaHRcblx0XHRcdHN0cm9rZTogQHNlbGVjdGVkQ29sb3Jcblx0XHRcdGZpbGw6IHNlbGVjdEZpbGxcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdCMgbWFrZSBkYXNoZWQgbGluZXMgZnJvbSBib3VuZGluZyByZWN0IHRvIHNjcmVlbiBlZGdlXG5cdG1ha2VEYXNoZWRMaW5lczogKGUsIGYsIGNvbG9yLCBvZmZzZXQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlXG5cdFx0cmV0dXJuIGlmIGUgaXMgZlxuXG5cdFx0Y29sb3IgPSBuZXcgQ29sb3IoY29sb3IpLmFscGhhKC44KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS54LCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUueCwgeTogZi5tYXhZfVxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi55fSxcblx0XHRcdHt4OiBlLm1heFgsIHk6IGYubWF4WX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUueX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLnl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRcdG5ldyBEYXNoZWRMaW5lKFxuXHRcdFx0e3g6IGYueCwgXHR5OiBlLm1heFl9LFxuXHRcdFx0e3g6IGYubWF4WCwgeTogZS5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0c2hvd0Rpc3RhbmNlczogKHNlbGVjdGVkTGF5ZXIsIGhvdmVyZWRMYXllcikgPT5cblxuXHRcdHMgPSBAZ2V0RGltZW5zaW9ucyhzZWxlY3RlZExheWVyLl9lbGVtZW50KVxuXHRcdGggPSBAZ2V0RGltZW5zaW9ucyhob3ZlcmVkTGF5ZXIuX2VsZW1lbnQpXG5cdFx0ZiA9IEBnZXREaW1lbnNpb25zKEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50KVxuXG5cdFx0cmV0dXJuIGlmIG5vdCBzIG9yIG5vdCBoXG5cblx0XHRAcmF0aW8gPSBGcmFtZXIuRGV2aWNlLnNjcmVlbi5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAvIFNjcmVlbi53aWR0aFxuXG5cdFx0QG1ha2VEYXNoZWRMaW5lcyhzLCBmLCBAc2VsZWN0ZWRDb2xvciwgNSlcblxuXHRcdEBtYWtlUmVjdE92ZXJsYXlzKHNlbGVjdGVkTGF5ZXIsIHMsIGhvdmVyZWRMYXllciwgaClcblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdCMgc2V0IHRoZSBwYW5lbCB3aXRoIGN1cnJlbnQgcHJvcGVydGllc1xuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cblx0XHRsYXllciA9IEBzZWxlY3RlZExheWVyID8gQGhvdmVyZWRMYXllclxuXG5cdFx0aWYgbGF5ZXIgaXMgQGxhc3RMYXllciBhbmQgbGF5ZXIuaXNBbmltYXRpbmcgaXMgZmFsc2Vcblx0XHRcdHJldHVyblxuXG5cdFx0QGxhc3RMYXllciA9IGxheWVyXG5cdFx0QGxhc3RQcm9wcyA9IGxheWVyLnByb3BzXG5cdFx0XG5cdFx0IyBwcm9wZXJ0aWVzIHRvIGFzc2lnbmVkIHRvIGxheWVyLnByb3BzXG5cdFx0Y3VzdG9tUHJvcHMgPVxuXHRcdFx0eDogbGF5ZXIuc2NyZWVuRnJhbWUueFxuXHRcdFx0eTogbGF5ZXIuc2NyZWVuRnJhbWUueVxuXHRcdFx0Y29tcG9uZW50TmFtZTogbGF5ZXIuY29uc3RydWN0b3IubmFtZVxuXHRcdFx0Y29tcG9uZW50TmFtZXM6IEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50KVxuXHRcdFx0cGFyZW50TmFtZTogbGF5ZXIucGFyZW50Py5uYW1lXG5cdFx0XHRyb3RhdGlvbjogbGF5ZXIucm90YXRpb25aXG5cdFx0XHQjIHRleHRBbGlnbjogbGF5ZXIucHJvcHMuc3R5bGVkVGV4dE9wdGlvbnM/LmFsaWdubWVudFxuXHRcdFx0YmxlbmRpbmc6IGxheWVyLmJsZW5kaW5nXG5cdFx0XHQjIHNjcmVlbnNob3Q6IEBnZXRTY3JlZW5zaG90KGxheWVyLl9lbGVtZW50KVxuXHRcdFxuXHRcdGlmIGxheWVyLmdyYWRpZW50P1xuXHRcdFx0Xy5hc3NpZ24gY3VzdG9tUHJvcHMsXG5cdFx0XHRcdGdyYWRpZW50U3RhcnQ6IGxheWVyLmdyYWRpZW50LnN0YXJ0XG5cdFx0XHRcdGdyYWRpZW50RW5kOiBsYXllci5ncmFkaWVudC5lbmRcblx0XHRcdFx0Z3JhZGllbnRBbmdsZTogbGF5ZXIuZ3JhZGllbnQuYW5nbGVcblxuXHRcdGlmIGxheWVyLnNoYWRvd3M/XG5cdFx0XHRfLmFzc2lnbiBjdXN0b21Qcm9wcyxcblx0XHRcdFx0c2hhZG93WDogbGF5ZXIuc2hhZG93c1swXT8ueFxuXHRcdFx0XHRzaGFkb3dZOiBsYXllci5zaGFkb3dzWzBdPy55XG5cdFx0XHRcdHNoYWRvd1NwcmVhZDogbGF5ZXIuc2hhZG93c1swXT8uc3ByZWFkXG5cdFx0XHRcdHNoYWRvd0NvbG9yOiBsYXllci5zaGFkb3dzWzBdPy5jb2xvclxuXHRcdFx0XHRzaGFkb3dUeXBlOiBsYXllci5zaGFkb3dzWzBdPy50eXBlXG5cdFx0XHRcdHNoYWRvd0JsdXI6IGxheWVyLnNoYWRvd3NbMF0/LmJsdXJcblxuXHRcdEBzcGVjUGFuZWwuc2hvd1Byb3BlcnRpZXMobGF5ZXIsIGN1c3RvbVByb3BzKVxuXHRcdFxuXHRcdGV2ZW50TGlzdGVuZXJzID0gQGdldExheWVyRXZlbnRMaXN0ZW5lcnMobGF5ZXIpXG5cdFx0QHNwZWNQYW5lbC5jbGVhckNoaWxkcmVuVGhlblNob3dFdmVudExpc3RlbmVycyhldmVudExpc3RlbmVycylcblxuXHRcdGFuaW1hdGlvbnMgPSBsYXllci5hbmltYXRpb25zKClcblx0XHRAc3BlY1BhbmVsLmNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblxuXG5cdHNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdGxheWVyID0gQGdldExheWVyRnJvbUVsZW1lbnQoZXZlbnQ/LnRhcmdldClcblx0XHRyZXR1cm4gaWYgbm90IEBnZXRMYXllcklzVmlzaWJsZShsYXllcilcblxuXHRcdEBob3ZlcmVkTGF5ZXIgPSBsYXllclxuXG5cdFx0QHRyeUZvY3VzKGV2ZW50KVxuXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0dW5zZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRAaG92ZXJlZExheWVyID0gdW5kZWZpbmVkXG5cdFx0VXRpbHMuZGVsYXkgLjA1LCA9PlxuXHRcdFx0aWYgbm90IEBob3ZlcmVkTGF5ZXIgdGhlbiBAZm9jdXMoKVxuXG5cdHNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAaG92ZXJlZExheWVyXG5cblx0XHRpZiBAc2VsZWN0ZWRMYXllciBpcyBAaG92ZXJlZExheWVyXG5cdFx0XHRAdW5zZXRTZWxlY3RlZExheWVyKClcblx0XHRcdHJldHVyblxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSBAaG92ZXJlZExheWVyXG5cdFx0QGZvY3VzKClcblxuXHR1bnNldFNlbGVjdGVkTGF5ZXI6ID0+XG5cdFx0QHNlbGVjdGVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRAZm9jdXMoKVxuXG5cblx0IyBGaW5kIGFuIGVsZW1lbnQgdGhhdCBiZWxvbmdzIHRvIGEgRnJhbWVyIExheWVyXG5cdGZpbmRMYXllckVsZW1lbnQ6IChlbGVtZW50KSAtPlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudC5jbGFzc0xpc3RcblxuXHRcdGlmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcmFtZXJMYXllcicpXG5cdFx0XHRyZXR1cm4gZWxlbWVudFxuXG5cdFx0QGZpbmRMYXllckVsZW1lbnQoZWxlbWVudC5wYXJlbnROb2RlKVxuXG5cdCMgRmluZCBhIEZyYW1lciBMYXllciB0aGF0IG1hdGNoZXMgYSBGcmFtZXIgTGF5ZXIgZWxlbWVudFxuXHRnZXRMYXllckZyb21FbGVtZW50OiAoZWxlbWVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVsZW1lbnRcblxuXHRcdGVsZW1lbnQgPSBAZmluZExheWVyRWxlbWVudChlbGVtZW50KVxuXHRcdGxheWVyID0gXy5maW5kKEZyYW1lci5DdXJyZW50Q29udGV4dC5fbGF5ZXJzLCBbJ19lbGVtZW50JywgZWxlbWVudF0pXG5cblx0XHRyZXR1cm4gbGF5ZXJcblxuXHRnZXRMYXllcklzVmlzaWJsZTogKGxheWVyKSA9PlxuXHRcdGlmIG5vdCBAX29ubHlWaXNpYmxlXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdFx0aWYgbm90IGxheWVyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdFx0aWYgbGF5ZXIub3BhY2l0eSBpcyAwIG9yIGxheWVyLnZpc2libGUgaXMgZmFsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdFx0QGdldExheWVySXNWaXNpYmxlKGxheWVyLnBhcmVudClcblxuXHRnZXRMYXllckV2ZW50TGlzdGVuZXJzOiAobGF5ZXIpID0+XG5cblx0XHRsaXN0ZW5lcnMgPSBfLm1hcChsYXllci5fZXZlbnRzLCAoZXZzLCBsaXN0ZW5lciwgYykgLT5cblx0XHRcdGlmIG5vdCBfLmlzQXJyYXkoZXZzKSB0aGVuIGV2cyA9IFtldnNdXG5cdFx0XHRcblx0XHRcdHtcblx0XHRcdFx0bGlzdGVuZXI6IGxpc3RlbmVyXG5cdFx0XHRcdGV2ZW50czogXy5tYXAgZXZzLCAoZXYpIC0+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bmFtZTogZXYuZm4ubmFtZVxuXHRcdFx0XHRcdFx0ZnVuY3Rpb246IGV2LmZuLnRvU3RyaW5nKClcblx0XHRcdFx0XHRcdGNvbnRleHQ6IGV2LmNvbnRleHQgXG5cdFx0XHRcdFx0XHRvbmNlOiBldi5vbmNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdClcblxuXHRcdHJldHVybiBsaXN0ZW5lcnNcblxuXHRnZXRTY3JlZW5zaG90OiAoZWxlbWVudCkgPT5cblxuXHRcdGZvcmVpZ25PYmplY3QgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdmb3JlaWduT2JqZWN0J1xuXG5cdFx0IyBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZnJhbWVyTGF5ZXIgRGV2aWNlQ29tcG9uZW50UG9ydCcpWzBdXG5cdFx0XG5cdFx0cmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRjdHggPSBAc3BlY1BhbmVsLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0ZGF0YSA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScje3JlY3Qud2lkdGh9JyBoZWlnaHQ9JyN7cmVjdC5oZWlnaHR9Jz5cIiArXG5cdFx0XHQnPGZvcmVpZ25PYmplY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPicgK1xuXHRcdFx0JzxkaXYgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+JyArXG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCArXG5cdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPC9mb3JlaWduT2JqZWN0PicgK1xuXHRcdFx0Jzwvc3ZnPidcblxuXHRcdERPTVVSTCA9IHdpbmRvdy5VUkwgb3Igd2luZG93LndlYmtpdFVSTCBvciB3aW5kb3dcblxuXHRcdHN2ZyA9IG5ldyBCbG9iKFtkYXRhXSwge3R5cGU6ICdpbWFnZS9zdmcreG1sJ30pXG5cdFx0dXJsID0gRE9NVVJMLmNyZWF0ZU9iamVjdFVSTChzdmcpXG5cdFx0QHNwZWNQYW5lbC5zY3JlZW5zaG90Qm94LnZhbHVlID0gdXJsXG5cblxuXHQjIEZpbmQgYSBub24tc3RhbmRhcmQgQ29tcG9uZW50IHRoYXQgaW5jbHVkZXMgYSBMYXllclxuXHRnZXRDb21wb25lbnRGcm9tTGF5ZXI6IChsYXllciwgbmFtZXMgPSBbXSkgPT5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiBuYW1lcy5qb2luKCcsICcpXG5cblx0XHRpZiBub3QgXy5pbmNsdWRlcyhbXCJMYXllclwiLCBcIlRleHRMYXllclwiLCBcIlNjcm9sbENvbXBvbmVudFwiXSwgbGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblx0XHRcdG5hbWVzLnB1c2gobGF5ZXIuY29uc3RydWN0b3IubmFtZSlcblxuXHRcdEBnZXRDb21wb25lbnRGcm9tTGF5ZXIobGF5ZXIucGFyZW50LCBuYW1lcylcblxuXG5cdCMgRGVsYXkgZm9jdXMgYnkgYSBzbWFsbCBhbW91bnQgdG8gcHJldmVudCBmbGFzaGluZ1xuXHR0cnlGb2N1czogKGV2ZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEBmb2N1c0VsZW1lbnQgPSBldmVudC50YXJnZXRcblx0XHRkbyAoZXZlbnQpID0+XG5cdFx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRcdGlmIEBmb2N1c0VsZW1lbnQgaXNudCBldmVudC50YXJnZXRcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XG5cdFx0XHRcdEBmb2N1cygpXG5cblx0IyBDaGFuZ2UgZm9jdXMgdG8gYSBuZXcgaG92ZXJlZCBvciBzZWxlY3RlZCBlbGVtZW50XG5cdGZvY3VzOiA9PlxuXHRcdHJldHVybiBpZiBub3QgQGVuYWJsZWRcblxuXHRcdEB1bmZvY3VzKClcblxuXHRcdCMgQHNlbGVjdGVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRAaG92ZXJlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRob3ZlcmVkTGF5ZXIgPSBAaG92ZXJlZExheWVyID8gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRzZWxlY3RlZExheWVyID0gQHNlbGVjdGVkTGF5ZXIgPyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXG5cdFx0aWYgc2VsZWN0ZWRMYXllciBpcyBob3ZlcmVkTGF5ZXJcblx0XHRcdGhvdmVyZWRMYXllciA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRpZiBob3ZlcmVkTGF5ZXIgaXMgc2VsZWN0ZWRMYXllclxuXHRcdFx0cmV0dXJuXG5cblx0XHRAc2hvd0Rpc3RhbmNlcyhzZWxlY3RlZExheWVyLCBob3ZlcmVkTGF5ZXIpXG5cdFx0QHNldFBhbmVsUHJvcGVydGllcyhzZWxlY3RlZExheWVyLCBob3ZlcmVkTGF5ZXIpXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdHN2Z0NvbnRleHQucmVtb3ZlQWxsKClcblxuXG4jIGtpY2tvZmZcblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAncENvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbnN2Z0NvbnRleHQgPSBuZXcgU1ZHQ29udGV4dFxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEWUEsSUFBQSwwUEFBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRWpDLElBQUcsa0JBQUg7RUFDQyxNQUFBLEdBQVMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFRLENBQUEsVUFBQTtFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBdkIsR0FBMEMsTUFBTSxDQUFDO0VBRWpELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxHQUEyQjtFQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQXBCLEdBQTZCLE9BTDlCOzs7QUFPQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUFBOztBQUVBLFVBQUEsR0FBYTs7QUFDYixTQUFBLEdBQVk7O0FBQ1osY0FBQSxHQUFpQjs7O0tBSWdDLENBQUUsU0FBUyxDQUFDLEdBQTdELENBQWlFLHFCQUFqRTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFnQk07RUFDUSxvQkFBQyxPQUFEO0FBQ1osUUFBQTs7TUFEYSxVQUFVOzs7O0lBQ3ZCLElBQUMsQ0FBQSxhQUFELEdBQWlCO0lBRWpCLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFFVixVQUFBLEdBQWE7SUFHYixLQUFBLEdBQVE7SUFHUixhQUFBLEdBQWdCLFNBQUMsT0FBRCxFQUFVLFVBQVY7QUFDZixVQUFBOztRQUR5QixhQUFhOztBQUN0QztXQUFBLGlCQUFBOztxQkFDQyxPQUFPLENBQUMsWUFBUixDQUFxQixHQUFyQixFQUEwQixLQUExQjtBQUREOztJQURlO0lBT2hCLElBQUMsQ0FBQSxHQUFELEdBQU8sUUFBUSxDQUFDLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0MsS0FBaEM7SUFDUCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsSUFBQyxDQUFBLEdBQTNC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QSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBbkI7WUFDQSxJQUFBLEVBQU0sVUFETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSxxQkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBbkI7WUFDQSxJQUFBLEVBQU0sWUFETjtXQURTO1VBS1YsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsTUFEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTO1VBUVYsR0FBQSxHQUFVLElBQUEsTUFBQSxDQUNUO1lBQUEsTUFBQSxFQUFRLEdBQVI7WUFDQSxTQUFBLEVBQVcsT0FEWDtZQUVBLElBQUEsRUFBTSxFQUZOO1lBR0EsS0FBQSxzREFBbUIsQ0FBRSx1QkFIckI7WUFJQSxTQUFBLEVBQVcsS0FKWDtXQURTLEVBMUROO1NBQUEsTUFBQTtVQW1FSixHQUFBLEdBQVUsSUFBQSxJQUFBLENBQ1Q7WUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFuQjtZQUNBLElBQUEsRUFBTSxDQUFDLENB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
