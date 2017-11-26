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

  SpecPanel.prototype.showAnimations = function(animations) {
    var anim, box, element, fromUnit, i, j, k, key, len, len1, options, properties, ref1, results, row, stateA, stateB, toUnit, value;
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
      ref1 = [fromUnit.element, toUnit.element];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        element = ref1[k];
        element.classList.add('alignLeft');
      }
      for (key in properties) {
        value = properties[key];
        switch (key) {
          case 'gradient':
            row = new pRow({
              parent: this.animsAcco.body,
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
              parent: this.animsAcco.body,
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
              parent: this.animsAcco.body,
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
              parent: this.animsAcco.body,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3N0ZXBoZW5ydWl6L0RvY3VtZW50cy9HaXRIdWIvZ290Y2hhL2V4YW1wbGUuZnJhbWVyL21vZHVsZXMvZ290Y2hhLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBcdCAuODg4ODguICAgICAgICAgICAgIGRQICAgICAgICAgICAgZFBcbiMgXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG4jIFx0ODggICAgICAgIC5kODg4OGIuIGQ4ODg4UCAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLlxuIyBcdDg4ICAgWVA4OCA4OCcgIGA4OCAgIDg4ICAgODgnICBgXCJcIiA4OCcgIGA4OCA4OCcgIGA4OFxuIyBcdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcbiMgXHQgYDg4ODg4JyAgYDg4ODg4UCcgICBkUCAgIGA4ODg4OFAnIGRQICAgIGRQIGA4ODg4OFA4XG4jIFx0XG4jIFx0XG4jIGJ5IEBzdGV2ZXJ1aXpva1xuI1xuIyBBIEZyYW1lciBtb2R1bGUgZm9yIGhhbmRvZmYuIEl0IHdvcmtzIGtpbmQgb2YgbGlrZSB0aGF0IG90aGVyIHRvb2wuXG5cblxuZGV2aWNlVHlwZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZGV2aWNlVHlwZVxuXG5pZiBkZXZpY2VUeXBlPyBcblx0ZGV2aWNlID0gRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzW2RldmljZVR5cGVdXG5cdEZyYW1lci5EZXZpY2UuX2NvbnRleHQuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZS5kZXZpY2VQaXhlbFJhdGlvXG5cblx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gZGV2aWNlVHlwZVxuXHR3aW5kb3cubG9jYWxTdG9yYWdlLmRldmljZSA9IHVuZGVmaW5lZFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5zdmdDb250ZXh0ID0gdW5kZWZpbmVkXG5zdGFydE9wZW4gPSBmYWxzZVxuYWNjb3JkaW9uc09wZW4gPSBmYWxzZVxuXG4jIGRlYnVnZ2luZ1xuXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VQaG9uZScpWzBdPy5jbGFzc0xpc3QuYWRkKCdJZ25vcmVQb2ludGVyRXZlbnRzJylcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIFx0LmQ4ODg4OGIgIGRQICAgICBkUCAgLjg4ODg4LiAgICAgIGE4ODg4OGIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuICBcdDg4LiAgICBcIicgODggICAgIDg4IGQ4JyAgIGA4OCAgICBkOCcgICBgODggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gIFx0YFk4ODg4OGIuIDg4ICAgIC44UCA4OCAgICAgICAgICAgODggICAgICAgIC5kODg4OGIuIDg4ZDhiLmQ4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gODhkODg4Yi4gZDg4ODhQIC5kODg4OGIuXG4gIFx0ICAgICAgYDhiIDg4ICAgIGQ4JyA4OCAgIFlQODggICAgODggICAgICAgIDg4JyAgYDg4IDg4J2A4OCdgODggODgnICBgODggODgnICBgODggODgnICBgODggODhvb29vZDggODgnICBgODggICA4OCAgIFk4b29vb28uXG4gIFx0ZDgnICAgLjhQIDg4ICAuZDhQICBZOC4gICAuODggICAgWTguICAgLjg4IDg4LiAgLjg4IDg4ICA4OCAgODggODguICAuODggODguICAuODggODggICAgODggODguICAuLi4gODggICAgODggICA4OCAgICAgICAgIDg4XG4gIFx0IFk4ODg4OFAgIDg4ODg4OCcgICAgYDg4ODg4JyAgICAgIFk4ODg4OFAnIGA4ODg4OFAnIGRQICBkUCAgZFAgODhZODg4UCcgYDg4ODg4UCcgZFAgICAgZFAgYDg4ODg4UCcgZFAgICAgZFAgICBkUCAgIGA4ODg4OFAnXG4gIFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODhcbiAgXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIyMjXG5cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIENvbnRleHRcblxuY2xhc3MgU1ZHQ29udGV4dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRAX19jb25zdHJ1Y3RvciA9IHRydWVcblx0XHRcblx0XHRAc2hhcGVzID0gW11cblxuXHRcdHN2Z0NvbnRleHQgPSBAXG5cblx0XHQjIG5hbWVzcGFjZVxuXHRcdHN2Z05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG5cdFx0XG5cdFx0IyBzZXQgYXR0cmlidXRlcyBcblx0XHRzZXRBdHRyaWJ1dGVzID0gKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRcdGZvciBrZXksIHZhbHVlIG9mIGF0dHJpYnV0ZXNcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXG5cdFx0IyBDcmVhdGUgU1ZHIGVsZW1lbnRcblxuXHRcdEBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKVxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoQHN2Zylcblx0XHRAc3ZnLnN0eWxlWyd6LWluZGV4J10gPSAnOTk5J1xuXG5cdFx0QGZyYW1lRWxlbWVudCA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuQmFja2dyb3VuZC5fZWxlbWVudFxuXG5cdFx0QHNldENvbnRleHQoKVxuXG5cdFx0IyBkZWZzXG5cdFx0XG5cdFx0QHN2Z0RlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdkZWZzJylcblx0XHRAc3ZnLmFwcGVuZENoaWxkIEBzdmdEZWZzXG5cdFx0XG5cdFx0ZGVsZXRlIEBfX2NvbnN0cnVjdG9yXG5cblx0c2V0QXR0cmlidXRlczogKGVsZW1lbnQsIGF0dHJpYnV0ZXMgPSB7fSkgLT5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBhdHRyaWJ1dGVzXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuXG5cdHNldENvbnRleHQ6ID0+XG5cblx0XHRAbEZyYW1lID0gQGZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHdpZHRoOiBAbEZyYW1lLndpZHRoLnRvRml4ZWQoKVxuXHRcdFx0aGVpZ2h0OiBAbEZyYW1lLmhlaWdodC50b0ZpeGVkKClcblx0XHRcdHg6IEBsRnJhbWUubGVmdC50b0ZpeGVkKClcblx0XHRcdHk6IEBsRnJhbWUudG9wLnRvRml4ZWQoKVxuXG5cdFx0QHNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJDb250ZXh0JylbMF1cblx0XHRzRnJhbWUgPSBAc2NyZWVuRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG5cdFx0QHNldEF0dHJpYnV0ZXMgQHN2Zyxcblx0XHRcdHg6IDBcblx0XHRcdHk6IDBcblx0XHRcdHdpZHRoOiBzRnJhbWUud2lkdGhcblx0XHRcdGhlaWdodDogc0ZyYW1lLmhlaWdodFxuXHRcdFx0dmlld0JveDogXCIwIDAgI3tzRnJhbWUud2lkdGh9ICN7c0ZyYW1lLmhlaWdodH1cIlxuXG5cdFx0Xy5hc3NpZ24gQHN2Zy5zdHlsZSxcblx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0XHRcdGxlZnQ6IDBcblx0XHRcdHRvcDogMFxuXHRcdFx0d2lkdGg6ICcxMDAlJ1xuXHRcdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRcdCdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuXG5cdGFkZFNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QHNoYXBlcy5wdXNoKHNoYXBlKVxuXHRcdEBzaG93U2hhcGUoc2hhcGUpXG5cdFx0XG5cdHJlbW92ZVNoYXBlOiAoc2hhcGUpIC0+XG5cdFx0QGhpZGVTaGFwZShzaGFwZSlcblx0XHRfLnB1bGwoQHNoYXBlcywgc2hhcGUpXG5cdFx0XG5cdGhpZGVTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XG5cdHNob3dTaGFwZTogKHNoYXBlKSAtPlxuXHRcdEBzdmcuYXBwZW5kQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRcblx0YWRkRGVmOiAoZGVmKSAtPlxuXHRcdEBzdmdEZWZzLmFwcGVuZENoaWxkKGRlZilcblxuXHRyZW1vdmVBbGw6ID0+XG5cdFx0Zm9yIHNoYXBlIGluIEBzaGFwZXNcblx0XHRcdEBzdmcucmVtb3ZlQ2hpbGQoc2hhcGUuZWxlbWVudClcblx0XHRAc2hhcGVzID0gW11cblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU1ZHIFNoYXBlXG5cbmNsYXNzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt0eXBlOiAnY2lyY2xlJ30pIC0+XG5cdFx0QF9fY29uc3RydWN0b3IgPSB0cnVlXG5cdFx0XG5cdFx0QHBhcmVudCA9IHN2Z0NvbnRleHRcblx0XHRcblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcblx0XHRcdFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgXG5cdFx0XHRvcHRpb25zLnR5cGVcblx0XHRcdClcblxuXHRcdEBzZXRDdXN0b21Qcm9wZXJ0eSgndGV4dCcsICd0ZXh0Q29udGVudCcsICd0ZXh0Q29udGVudCcsIG9wdGlvbnMudGV4dClcblx0XHRcdFx0XG5cdFx0IyBhc3NpZ24gYXR0cmlidXRlcyBzZXQgYnkgb3B0aW9uc1xuXHRcdGZvciBrZXksIHZhbHVlIG9mIG9wdGlvbnNcblx0XHRcdEBzZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblxuXHRcdEBwYXJlbnQuYWRkU2hhcGUoQClcblx0XHRcblx0XHRAc2hvdygpXG5cdFx0XHRcblx0c2V0QXR0cmlidXRlOiAoa2V5LCB2YWx1ZSkgPT5cblx0XHRyZXR1cm4gaWYga2V5IGlzICd0ZXh0J1xuXHRcdGlmIG5vdCBAW2tleV0/XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRnZXQ6ID0+XG5cdFx0XHRcdFx0cmV0dXJuIEBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXG5cdFx0XHRcdHNldDogKHZhbHVlKSA9PiBcblx0XHRcdFx0XHRAZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcblx0XHRcblx0XHRAW2tleV0gPSB2YWx1ZVxuXHRcblx0c2V0Q3VzdG9tUHJvcGVydHk6ICh2YXJpYWJsZU5hbWUsIHJldHVyblZhbHVlLCBzZXRWYWx1ZSwgc3RhcnRWYWx1ZSkgLT5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdHZhcmlhYmxlTmFtZSxcblx0XHRcdGdldDogLT5cblx0XHRcdFx0cmV0dXJuIHJldHVyblZhbHVlXG5cdFx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdFx0QGVsZW1lbnRbc2V0VmFsdWVdID0gdmFsdWVcblxuXHRcdEBbdmFyaWFibGVOYW1lXSA9IHN0YXJ0VmFsdWVcblxuXHRoaWRlOiAtPiBcblx0XHRAcGFyZW50LmhpZGVTaGFwZShAKVxuXHRcblx0c2hvdzogLT4gXG5cdFx0QHBhcmVudC5zaG93U2hhcGUoQClcblx0XHRcblx0cmVtb3ZlOiAtPlxuXHRcdEBwYXJlbnQucmVtb3ZlU2hhcGUoQClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgRGFzaGVkIExpbmVcblxuY2xhc3MgRGFzaGVkTGluZSBleHRlbmRzIFNWR1NoYXBlXG5cdGNvbnN0cnVjdG9yOiAocG9pbnRBLCBwb2ludEIsIGNvbG9yID0gJyMwMDAnLCBvZmZzZXQgPSAwLCBvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmFzc2lnbiBvcHRpb25zLFxuXHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRkOiBcIk0gI3twb2ludEEueH0gI3twb2ludEEueX0gTCAje3BvaW50Qi54fSAje3BvaW50Qi55fVwiXG5cdFx0XHRzdHJva2U6IGNvbG9yXG5cdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblx0XHRcdCdzdHJva2UtZGFzaGFycmF5JzogXCI1LCA1XCJcblx0XHRcdCdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBQYW5lbCBDb21wb25lbnRzXG5cblV0aWxzLmluc2VydENTUyBcIlwiXCJcblxuXHQubG9nbyB7XG5cdFx0b3BhY2l0eTogLjQ7XG5cdH1cblxuXHQubG9nbzpob3ZlciB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHRcblx0I2xpbmtlZGluX2xvZ28ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRib3R0b206IDhweDtcblx0XHRyaWdodDogNjhweDtcblx0fVxuXG5cdFxuXHQjdHdpdHRlcl9sb2dvIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym90dG9tOiA0cHg7XG5cdFx0cmlnaHQ6IDRweDtcblx0fVxuXG5cdCNnaXRodWJfbG9nbyB7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdGJvdHRvbTogOHB4O1xuXHRcdHJpZ2h0OiAzNnB4O1xuXHR9XG5cblx0LmZyYW1lckxheWVyIHsgXG5cdFx0cG9pbnRlci1ldmVudHM6IGFsbCAhaW1wb3J0YW50OyBcblx0XHR9IFxuXHRcblx0Lklnbm9yZVBvaW50ZXJFdmVudHMge1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7IFxuXHR9XG5cblx0LmRyb3Bkb3duIHtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cblx0I3BDb250YWluZXIge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRyaWdodDogMDtcblx0XHR3aWR0aDogMjI0cHg7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnO1xuXHRcdGZvbnQtc2l6ZTogMTFweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAyMCwgMjAsIDEuMDAwKTtcblx0XHRib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNDUsIDQ1LCA0NSwgMS4wMDApO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBhbGw7XG5cdFx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdFx0b3ZlcmZsb3c6IHNjcm9sbDtcblx0XHRwYWRkaW5nLXRvcDogOHB4O1xuXHR9XG5cblx0LnBEaXYge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0LmhpZGRlbiB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuXG5cdC5wUm93IHtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDMycHg7XG5cdH1cblxuXHQucFNwYW4ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRjb2xvcjogIzg4ODg4ODtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdGxldHRlci1zcGFjaW5nOiAuNXB4O1xuXHRcdHBhZGRpbmctbGVmdDogOHB4O1xuXHRcdG1hcmdpbi10b3A6IDJweDtcblx0fVxuXG5cdC5wTGFiZWwge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcblx0XHRmb250LXNpemU6IDEwcHg7XG5cdFx0d2lkdGg6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogMnB4O1xuXHRcdG1hcmdpbi1yaWdodDogOHB4O1xuXHRcdHotaW5kZXg6IDEwO1xuXHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHR9XG5cblx0LnBJbnB1dCB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzI5MjkyOTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdGNvbG9yOiAjNTU1NTU1O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0bWFyZ2luLXRvcDogNHB4O1xuXHR9XG5cblx0LnBJbnB1dDpob3ZlciB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgIzQ4Y2ZmZjtcblx0XHRjb2xvcjogIzQ4Y2ZmZjtcblx0fVxuXG5cdC5yaWdodCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5sZWZ0IHtcblx0XHRyaWdodDogNzJweDtcblx0XHR3aWR0aDogNDhweDtcblx0fVxuXG5cdC5hbGlnbkxlZnQge1xuXHRcdHRleHQtYWxpZ246IGxlZnQ7XG5cdH1cblxuXHQuZnVsbCB7XG5cdFx0cmlnaHQ6IDhweDtcblx0XHR3aWR0aDogMTEycHg7XG5cdH1cblxuXHQucEltYWdlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRtYXJnaW4tbGVmdDogOHB4O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHR3aWR0aDogMTk2cHg7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdG91dGxpbmU6IDRweCBzb2xpZCAjMjkyOTI5O1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAtNHB4O1xuXHRcdHBhZGRpbmc6IDRweDtcblx0fVxuXG5cdC5wSW1hZ2U6aG92ZXIge1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICM0OGNmZmY7XG5cdFx0Y29sb3I6ICM0OGNmZmY7XG5cdFx0b3V0bGluZTogMnB4IHNvbGlkICMyOTI5Mjk7XG5cdH1cblxuXHQucENvbG9yIHtcblx0XHRvdXRsaW5lOiA0cHggc29saWQgIzI5MjkyOTtcblx0XHRvdXRsaW5lLW9mZnNldDogLTRweDtcblx0fVxuXG5cdC5wQ29sb3I6aG92ZXIge1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCAjMjkyOTI5O1xuXHRcdGNvbG9yOiAjNDhjZmZmO1xuXHR9XG5cblx0LnBTZWxlY3Qge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRyaWdodDogOHB4O1xuXHRcdHdpZHRoOiAxMjJweDtcblx0XHRjb2xvcjogIzU1NTU1NTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTI5O1xuXHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xuXHRcdHBhZGRpbmc6IDRweDtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0fVxuXG5cdC5wRGl2aWRlciB7XG5cdFx0aGVpZ2h0OiAxcHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzAwMDtcblx0XHRtYXJnaW46IDE2cHggOHB4IDE2cHggOHB4O1xuXHR9XG5cblx0LnBBY2NvcmRpYW4ge1xuXHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMTQxNDE0O1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRtaW4taGVpZ2h0OiAzMnB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxRDFEMUQ7XG5cdFx0bWFyZ2luLXRvcDogMTZweDtcblx0fVxuXG5cdC5wQWNjb3JkaWFuQm9keSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0bWFyZ2luLXRvcDogMzJweDtcblx0XHRwYWRkaW5nLXRvcDogNHB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG5cdH1cblxuXHQuYWN0aXZlIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRoZWlnaHQ6IGF1dG87XG5cdH1cblxuXHQuaGFzVmFsdWUge1xuXHRcdGNvbG9yOiAjRkZGO1xuXHR9XG5cblx0LnNvY2lhbExpbmtzIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRib3R0b206IDBweDtcblx0XHRyaWdodDogMHB4O1xuXHRcdHBhZGRpbmctdG9wOiA0cHg7XG5cdFx0ei1pbmRleDogMTAwO1xuXHR9XG5cblwiXCJcIlxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBEaXZcblxuY2xhc3MgcERpdlxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBEaXZcIilcblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFwidmlzaWJsZVwiLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92aXNpYmxlXG5cdFx0XHRzZXQ6IChib29sKSAtPlxuXHRcdFx0XHRyZXR1cm4gaWYgYm9vbCBpcyBAX3Zpc2libGVcblxuXHRcdFx0XHRAX3Zpc2libGUgPSBib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cdFx0XHRcdFx0cmV0dXJuXG5cblx0XHRcdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBSb3dcblxuY2xhc3MgcFJvdyBleHRlbmRzIHBEaXZcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHR0ZXh0OiAnTGFiZWwnXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRAZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwicERpdlwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwUm93XCIpXG5cblx0XHRAbGFiZWwgPSBuZXcgcFNwYW5cblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogb3B0aW9ucy50ZXh0XG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIERpdmlkZXJcblxuY2xhc3MgcERpdmlkZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwRGl2aWRlclwiKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiMgU3BhblxuXG5jbGFzcyBwU3BhblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogdW5kZWZpbmVkXG5cdFx0XHR0ZXh0OiAnaGVsbG8gd29ybGQnXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwU3BhblwiKVxuXHRcdEBlbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9ucy50ZXh0XG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBMYWJlbFxuXG5jbGFzcyBwTGFiZWxcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IHVuZGVmaW5lZFxuXHRcdFx0Y2xhc3NOYW1lOiBudWxsXG5cdFx0XHR0ZXh0OiAneCdcblx0XHRcdGZvcjogdW5kZWZpbmVkXG5cblx0XHRAZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicExhYmVsXCIpXG5cdFx0QGVsZW1lbnQuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSlcblx0XHRcblx0XHRfLmFzc2lnbiBAZWxlbWVudCxcblx0XHRcdHRleHRDb250ZW50OiBvcHRpb25zLnRleHRcblx0XHRcdGZvcjogb3B0aW9ucy5mb3JcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIElucHV0XG5cbmNsYXNzIHBJbnB1dFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdHBhcmVudDogbnVsbFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJ3gnXG5cdFx0XHRkZWZhdWx0OiAnJ1xuXHRcdFx0aXNEZWZhdWx0OiB0cnVlXG5cdFx0XHRzZWN0aW9uOiB1bmRlZmluZWRcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKVxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25zLmNsYXNzTmFtZVxuXHRcdFx0dGV4dDogb3B0aW9ucy51bml0XG5cdFx0XHRmb3I6IEBlbGVtZW50XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRpZiBub3QgdmFsdWU/IG9yIHZhbHVlIGlzIFwiXCJcblx0XHRcdFx0XHR2YWx1ZSA9IFN0cmluZyhAZGVmYXVsdClcblxuXHRcdFx0XHRAZWxlbWVudC52YWx1ZSA9IHZhbHVlXG5cblx0XHRcdFx0VXRpbHMuZGVsYXkgMCwgPT5cblx0XHRcdFx0XHRpZiB2YWx1ZT8gYW5kIG5vdCBAaXNEZWZhdWx0IGFuZCB2YWx1ZSBpc250IFwiXCJcblx0XHRcdFx0XHRcdEBzZWN0aW9uPy52aXNpYmxlID0gdHJ1ZVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J2lzRGVmYXVsdCcsXG5cdFx0XHRnZXQ6IC0+IHJldHVybiBAX2lzRGVmYXVsdFxuXHRcdFx0c2V0OiAoYm9vbCkgLT5cblx0XHRcdFx0QF9pc0RlZmF1bHQgPSBib29sXG5cblx0XHRcdFx0aWYgYm9vbFxuXHRcdFx0XHRcdEBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hhc1ZhbHVlJylcblx0XHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0XHRALmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzVmFsdWUnKVxuXG5cblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsID0+XG5cdFx0XHRpZiBub3Qgc2VjcmV0Qm94XG5cdFx0XHRcdHJldHVyblxuXG5cdFx0XHRzZWNyZXRCb3gudmFsdWUgPSBAdmFsdWVcblx0XHRcdHNlY3JldEJveC5zZWxlY3QoKVxuXHRcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuXHRcdFx0c2VjcmV0Qm94LmJsdXIoKVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHZhbHVlOiBvcHRpb25zLnZhbHVlXG5cdFx0XHRkZWZhdWx0OiBvcHRpb25zLmRlZmF1bHRcblx0XHRcdHNlY3Rpb246IG9wdGlvbnMuc2VjdGlvblxuXHRcdFx0aXNEZWZhdWx0OiBvcHRpb25zLmlzRGVmYXVsdFxuXG4jIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuIyBJbWFnZVxuXG5jbGFzcyBwSW1hZ2Vcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IHVuZGVmaW5lZFxuXG5cdFx0QGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW1hZ2VcIilcblxuXHRcdHBhcmVudCA9IG9wdGlvbnMucGFyZW50Py5lbGVtZW50ID8gcGFuZWxcblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoQGVsZW1lbnQpXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCwgXG5cdFx0XHQndmFsdWUnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF92YWx1ZVxuXHRcdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRcdEBfdmFsdWUgPSB2YWx1ZVxuXHRcdFx0XHRAZWxlbWVudC5zcmMgPSB2YWx1ZVxuXHRcdFx0XHRAc2VjdGlvbj8udmlzaWJsZSA9IHZhbHVlIGlzbnQgJydcblxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIENvbG9yIEJveFxuXG5jbGFzcyBwQ29sb3Jcblx0Y29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHRcdHZhbHVlOiAnIzI5MjkyOSdcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwSW5wdXRcIilcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQ29sb3InKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpXG5cblx0XHRwYXJlbnQgPSBvcHRpb25zLnBhcmVudD8uZWxlbWVudCA/IHBhbmVsXG5cdFx0cGFyZW50LmFwcGVuZENoaWxkKEBlbGVtZW50KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsIFxuXHRcdFx0J3ZhbHVlJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfdmFsdWVcblx0XHRcdHNldDogKHZhbHVlKSAtPlxuXG5cdFx0XHRcdGlmIHZhbHVlPy5jb2xvciBpcyAndHJhbnNwYXJlbnQnXG5cdFx0XHRcdFx0dmFsdWUgPSBudWxsXG5cblx0XHRcdFx0aWYgdmFsdWU/IGFuZCB2YWx1ZSBpc250ICcnXG5cdFx0XHRcdFx0QHNlY3Rpb24/LnZpc2libGUgPSB0cnVlXG5cblx0XHRcdFx0QF92YWx1ZSA9IHZhbHVlXG5cdFx0XHRcdEBlbGVtZW50LnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSB2YWx1ZVxuXG5cdFx0QGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCA9PlxuXHRcdFx0aWYgbm90IHNlY3JldEJveFxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0c2VjcmV0Qm94LnZhbHVlID0gQHZhbHVlXG5cdFx0XHRzZWNyZXRCb3guc2VsZWN0KClcblx0XHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jylcblx0XHRcdHNlY3JldEJveC5ibHVyKClcblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHR2YWx1ZTogb3B0aW9ucy52YWx1ZVxuXHRcdFx0c2VjdGlvbjogb3B0aW9ucy5zZWN0aW9uXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIFNlbGVjdFxuXG5jbGFzcyBwU2VsZWN0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiB1bmRlZmluZWRcblx0XHRcdHNlbGVjdGVkOiAwXG5cdFx0XHRvcHRpb25zOiBbJ3JlZCcsICd3aGl0ZScsICdibHVlJ11cblx0XHRcdGNhbGxiYWNrOiAodmFsdWUpIC0+IG51bGxcblxuXHRcdEBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jylcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicFNlbGVjdFwiKVxuXHRcdEBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhc1ZhbHVlJylcblxuXHRcdEB1bml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0cGFyZW50OiBvcHRpb25zLnBhcmVudFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa+J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0cGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ/LmVsZW1lbnQgPyBwYW5lbFxuXHRcdHBhcmVudC5hcHBlbmRDaGlsZChAZWxlbWVudClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J29wdGlvbnMnLFxuXHRcdFx0Z2V0OiAtPiByZXR1cm4gQF9vcHRpb25zXG5cdFx0XHRzZXQ6IChhcnJheSkgLT5cblx0XHRcdFx0QF9vcHRpb25zID0gYXJyYXlcblx0XHRcdFx0QG1ha2VPcHRpb25zKClcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBALFxuXHRcdFx0J3NlbGVjdGVkJyxcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfc2VsZWN0ZWRcblx0XHRcdHNldDogKG51bSkgLT5cblx0XHRcdFx0QF9zZWxlY3RlZCA9IG51bVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdF9vcHRpb25zOiBbXVxuXHRcdFx0X29wdGlvbkVsZW1lbnRzOiBbXVxuXHRcdFx0b3B0aW9uczogb3B0aW9ucy5vcHRpb25zXG5cdFx0XHRjYWxsYmFjazogb3B0aW9ucy5jYWxsYmFja1xuXHRcdFx0c2VsZWN0ZWQ6IG9wdGlvbnMuc2VsZWN0ZWRcblxuXHRcdEBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSBvcHRpb25zLnNlbGVjdGVkXG5cblx0XHRAZWxlbWVudC5vbmNoYW5nZSA9ID0+IFxuXHRcdFx0QHNlbGVjdGVkID0gQGVsZW1lbnQuc2VsZWN0ZWRJbmRleFxuXHRcdFx0QGNhbGxiYWNrKEBlbGVtZW50LnNlbGVjdGVkSW5kZXgpXG5cdFx0XG5cblx0bWFrZU9wdGlvbnM6ID0+XG5cdFx0Zm9yIG9wdGlvbiwgaSBpbiBAX29wdGlvbkVsZW1lbnRzXG5cdFx0XHRAZWxlbWVudC5yZW1vdmVDaGlsZChvcHRpb24pXG5cblx0XHRAX29wdGlvbkVsZW1lbnRzID0gW11cblxuXHRcdGZvciBvcHRpb24sIGkgaW4gQG9wdGlvbnNcblx0XHRcdG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuXHRcdFx0by52YWx1ZSA9IG9wdGlvblxuXHRcdFx0by5sYWJlbCA9IG9wdGlvblxuXHRcdFx0by5pbm5lckhUTUwgPSBvcHRpb25cblx0XHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKG8pXG5cblx0XHRcdEBfb3B0aW9uRWxlbWVudHMucHVzaChvKVxuXG5cdFx0XHRpZiBpIGlzIEBzZWxlY3RlZFxuXHRcdFx0XHRAdmFsdWUgPSBAZWxlbWVudC5vcHRpb25zW0BlbGVtZW50LnNlbGVjdGVkSW5kZXhdLmxhYmVsXG5cbiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jIEFjY29yZGlhblxuXG5jbGFzcyBwQWNjb3JkaWFuIGV4dGVuZHMgcFJvd1xuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuJylcblx0XHRAZWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgQHRvZ2dsZVxuXG5cdFx0Xy5hc3NpZ24gQCxcblx0XHRcdHRvZ2dsZWQ6IGZhbHNlXG5cblx0XHRAdW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR0ZXh0OiAn4pa/J1xuXHRcdFx0Zm9yOiBAZWxlbWVudFxuXG5cdFx0QGJvZHkgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdEBib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoQGJvZHkubGFiZWwuZWxlbWVudClcblxuXHRcdEBlbGVtZW50LmFwcGVuZENoaWxkKEBib2R5LmVsZW1lbnQpXG5cdFx0QGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwQWNjb3JkaWFuQm9keScpXG5cblx0XHRAYm9keS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2ZW50KSAtPiBcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRpZiBhY2NvcmRpb25zT3BlbiB0aGVuIEB0b2dnbGUoKSAjIHN0YXJ0IG9wZW5cblxuXHR0b2dnbGU6ID0+XG5cdFx0QHRvZ2dsZWQgPSAhQHRvZ2dsZWRcblxuXHRcdGlmIEB0b2dnbGVkXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvidcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgQGJvZHkuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpXG5cdFx0XHRAYm9keS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cdFx0XHRAdW5pdC5lbGVtZW50LnRleHRDb250ZW50ID0gJ+KWvydcblxuXG4jIyMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gXHQuZDg4ODg4YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4ODg4OGJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkUFxuIFx0ODguICAgIFwiJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgODggICAgYDhiICAgICAgICAgICAgICAgICAgICAgICAgICAgIDg4XG4gXHRgWTg4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi4gLmQ4ODg4Yi4gICAgYTg4YWFhYThQJyAuZDg4ODhiLiA4OGQ4ODhiLiAuZDg4ODhiLiA4OFxuIFx0ICAgICAgYDhiIDg4JyAgYDg4IDg4b29vb2Q4IDg4JyAgYFwiXCIgICAgIDg4ICAgICAgICA4OCcgIGA4OCA4OCcgIGA4OCA4OG9vb29kOCA4OFxuIFx0ZDgnICAgLjhQIDg4LiAgLjg4IDg4LiAgLi4uIDg4LiAgLi4uICAgICA4OCAgICAgICAgODguICAuODggODggICAgODggODguICAuLi4gODhcbiBcdCBZODg4ODhQICA4OFk4ODhQJyBgODg4ODhQJyBgODg4ODhQJyAgICAgZFAgICAgICAgIGA4ODg4OFA4IGRQICAgIGRQIGA4ODg4OFAnIGRQXG4gXHQgICAgICAgICAgODhcbiBcdCAgICAgICAgICBkUFxuXG4jIyNcblxuY2xhc3MgU3BlY1BhbmVsXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0QGVsZW1lbnQgPSBwYW5lbFxuXHRcdEBwcm9wTGF5ZXJzID0gW11cblx0XHRAX3Byb3BzID0ge31cblx0XHRAZnJhbWUgPSBAZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdEBkZWZhdWx0cyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9wcm9wZXJ0eUxpc3QoKVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5IEAsXG5cdFx0XHQncHJvcHMnLFxuXHRcdFx0Z2V0OiAtPlxuXHRcdFx0XHRyZXR1cm4gQF9wcm9wc1xuXHRcdFx0c2V0OiAob2JqKSAtPlxuXHRcdFx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmpcblx0XHRcdFx0XHRpZiBfLmhhcyhAcHJvcHMsIGtleSlcblx0XHRcdFx0XHRcdEBwcm9wc1trZXldID0gdmFsdWVcblxuXHRcdEBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpZiBzdGFydE9wZW4gdGhlbiAnMScgZWxzZSAnMCdcblx0XHRAY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGRldmljZVxuXG5cdFx0IyBTZXQgRGV2aWNlIE9wdGlvbnNcblxuXHRcdGRldmljZU9wdGlvbnMgPSBbXVxuXHRcdGN1cnJlbnRTZWxlY3RlZCA9IHVuZGVmaW5lZFxuXG5cdFx0Zm9yIGtleSwgdmFsdWUgb2YgRnJhbWVyLkRldmljZUNvbXBvbmVudC5EZXZpY2VzXG5cdFx0XHRpZiBfLmVuZHNXaXRoKGtleSwgJ2hhbmQnKVxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRpZiBub3QgdmFsdWUubWluU3R1ZGlvVmVyc2lvbj9cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpID4gdmFsdWUubWF4U3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZSBcblxuXHRcdFx0aWYgVXRpbHMuZnJhbWVyU3R1ZGlvVmVyc2lvbigpIDwgdmFsdWUubWluU3R1ZGlvVmVyc2lvblxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZXZpY2VPcHRpb25zLnB1c2ggKGtleSlcblxuXHRcdFx0aWYga2V5IGlzIEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZVxuXHRcdFx0XHRjdXJyZW50U2VsZWN0ZWQgPSBkZXZpY2VPcHRpb25zLmxlbmd0aCAtIDFcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnRGV2aWNlJ1xuXG5cdFx0QGRldmljZUJveCA9IG5ldyBwU2VsZWN0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0dW5pdDogJydcblx0XHRcdG9wdGlvbnM6IGRldmljZU9wdGlvbnNcblx0XHRcdHNlbGVjdGVkOiBjdXJyZW50U2VsZWN0ZWRcblx0XHRcdGNhbGxiYWNrOiAoaW5kZXgpID0+XG5cdFx0XHRcdGRldmljZVR5cGUgPSBkZXZpY2VPcHRpb25zW2luZGV4XVxuXHRcdFx0XHRkZXZpY2UgPSBGcmFtZXIuRGV2aWNlQ29tcG9uZW50LkRldmljZXNbZGV2aWNlVHlwZV1cblx0XHRcdFx0XG5cdFx0XHRcdF8uYXNzaWduIHdpbmRvdy5sb2NhbFN0b3JhZ2UsXG5cdFx0XHRcdFx0ZGV2aWNlVHlwZTogZGV2aWNlVHlwZVxuXHRcdFx0XHRcdGRldmljZTogZGV2aWNlXG5cdFx0XHRcdFx0Ymc6IFNjcmVlbi5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnTmFtZSdcblxuXHRcdEBuYW1lQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdDb21wb25lbnQnXG5cblx0XHRAY29tcG9uZW50TmFtZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdEBjb21wb25lbnROYW1lc1JvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUGFydCBvZidcblxuXHRcdEBjb21wb25lbnROYW1lc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogQGNvbXBvbmVudE5hbWVzUm93XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBkaXZpZGVyXG5cblx0XHRuZXcgcERpdmlkZXJcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwb3NpdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdQb3NpdGlvbidcblxuXHRcdEB4Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3csIFxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHlCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNpemVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnU2l6ZSdcblxuXHRcdEB3aWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93LCBcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAndydcblxuXHRcdEBoZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdoJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJhY2tncm91bmQgY29sb3JcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnQmFja2dyb3VuZCdcblxuXHRcdEBiYWNrZ3JvdW5kQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvdywgXG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBncmFkaWVudFxuXG5cdFx0QGdyYWRpZW50UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnR3JhZGllbnQnXG5cblx0XHRAZ3JhZGllbnRTdGFydEJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0QGdyYWRpZW50RW5kQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYWRpZW50IGFuZ2xlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZ3JhZGllbnRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QGdyYWRpZW50QW5nbGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdhJ1xuXHRcdFx0c2VjdGlvbjogQGdyYWRpZW50UHJvcGVydGllc0RpdlxuXHRcdFx0ZGVmYXVsdDogbnVsbFxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIG9wYWNpdHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnT3BhY2l0eSdcblxuXHRcdEBvcGFjaXR5Qm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRuZXcgcERpdmlkZXJcblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBib3JkZXIgcHJvcGVydGllc1xuXG5cdFx0QGJvcmRlclByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJvcmRlclxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHRleHQ6ICdCb3JkZXInXG5cdFx0XHRwYXJlbnQ6IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHRAYm9yZGVyQ29sb3JCb3ggPSBuZXcgcENvbG9yXG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblxuXHRcdEBib3JkZXJXaWR0aEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd3J1xuXHRcdFx0c2VjdGlvbjogQGJvcmRlclByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByYWRpdXNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnUmFkaXVzJ1xuXHRcdFx0cGFyZW50OiBAYm9yZGVyUHJvcGVydGllc0RpdlxuXG5cdFx0QGJvcmRlclJhZGl1c0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdHNlY3Rpb246IEBib3JkZXJQcm9wZXJ0aWVzRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc2hhZG93XG5cblxuXHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2ID0gbmV3IHBEaXZcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU2hhZG93J1xuXG5cdFx0QHNoYWRvd0NvbG9yQm94ID0gbmV3IHBDb2xvclxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBzaGFkb3dQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QHNoYWRvd1NwcmVhZEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAncydcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHRAc2hhZG93WUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblx0XHRcdGRlZmF1bHQ6ICcwJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHNoYWRvd1Byb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAc2hhZG93Qmx1ckJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAc2hhZG93UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdiJ1xuXHRcdFx0ZGVmYXVsdDogJzAnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgdGV4dCBzdHlsZXNcblxuXHRcdEB0ZXh0UHJvcGVydGllc0RpdiA9IG5ldyBwRGl2XG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgZm9udCBmYW1pbHlcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0ZvbnQnXG5cblx0XHRAZm9udEZhbWlseUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGNvbG9yXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdDb2xvcidcblxuXHRcdEBjb2xvckJveCA9IG5ldyBwQ29sb3Jcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXG5cdFx0QGZvbnRTaXplQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHdlaWdodFxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3R5bGUnXG5cblx0XHRAZm9udFN0eWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRAZm9udFdlaWdodEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0dW5pdDogJ3cnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYWxpZ25cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0dGV4dDogJ0FsaWduJ1xuXG5cdFx0QHRleHRBbGlnbkJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2Z1bGwnXG5cdFx0XHR1bml0OiAnJ1xuXHRcdFx0ZGVmYXVsdDogJ2xlZnQnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgc3BhY2luZ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHR0ZXh0OiAnU3BhY2luZydcblxuXHRcdEBsZXR0ZXJTcGFjaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0ZXh0UHJvcGVydGllc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICdsdCdcblx0XHRcdGRlZmF1bHQ6ICcxJ1xuXG5cdFx0QGxpbmVIZWlnaHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICdsbidcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyB0ZXh0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdGV4dFByb3BlcnRpZXNEaXZcblx0XHRcdHRleHQ6ICdUZXh0J1xuXG5cdFx0QHRleHRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRleHRQcm9wZXJ0aWVzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHRyYW5zZm9ybSBwcm9wZXJ0aWVzXG5cblxuXHRcdEB0cmFuc2Zvcm1zRGl2ID0gbmV3IHBEaXZcblxuXHRcdEB0cmFuc2Zvcm1zQWNjbyA9IG5ldyBwQWNjb3JkaWFuXG5cdFx0XHR0ZXh0OiAnVHJhbnNmb3Jtcydcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNEaXZcblxuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNjYWxlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NjYWxlJ1xuXG5cdFx0QHNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEB0cmFuc2Zvcm1zQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0QHNjYWxlWEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNjYWxlWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyByb3RhdGlvblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdSb3RhdGUnXG5cblx0XHRAcm90YXRpb25Cb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQHRyYW5zZm9ybXNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRyYW5zZm9ybXNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAcm90YXRpb25YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAcm90YXRpb25ZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgb3JpZ2luXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ09yaWdpbidcblxuXHRcdEBvcmlnaW5YQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJ3gnXG5cblx0XHRAb3JpZ2luWUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAncmlnaHQnXG5cdFx0XHR1bml0OiAneSdcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBza2V3XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NrZXcnXG5cblx0XHRAc2tld0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJydcblxuXHRcdEBza2V3WEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAdHJhbnNmb3Jtc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICd4J1xuXG5cdFx0QHNrZXdZQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdHVuaXQ6ICd5J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHBlcnNwZWN0aXZlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAdHJhbnNmb3Jtc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1BlcnNwZWN0aXZlJ1xuXG5cdFx0QHBlcnNwZWN0aXZlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEB0cmFuc2Zvcm1zRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICcnXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBmaWx0ZXJzIHByb3BlcnRpZXNcblxuXG5cdFx0QGZpbHRlcnNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGZpbHRlcnNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHBhcmVudDogQGZpbHRlcnNEaXZcblx0XHRcdHRleHQ6ICdGaWx0ZXJzJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGJsdXJcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQmx1cidcblxuXHRcdEBibHVyQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBicmlnaHRuZXNzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYnJpZ2h0bmVzc0JveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgY29udHJhc3RcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnQ29udHJhc3QnXG5cblx0XHRAY29udHJhc3RCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIGdyYXlzY2FsZVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdHcmF5c2NhbGUnXG5cblx0XHRAZ3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBodWVyb3RhdGVcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBmaWx0ZXJzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGh1ZVJvdGF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgaW52ZXJ0XG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0ludmVydCdcblxuXHRcdEBpbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGZpbHRlcnNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNhdHVyYXRlXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZmlsdGVyc0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QHNhdHVyYXRlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBmaWx0ZXJzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzZXBpYVxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGZpbHRlcnNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBzZXBpYUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZmlsdGVyc0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGVuZCBmaWx0ZXJzXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBlZmZlY3RzIHByb3BlcnRpZXNcblxuXG5cdFx0QGVmZmVjdHNEaXYgPSBuZXcgcERpdlxuXG5cdFx0QGVmZmVjdHNBY2NvID0gbmV3IHBBY2NvcmRpYW5cblx0XHRcdHRleHQ6ICdFZmZlY3RzJ1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0RpdlxuXG5cblx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdCMgYmFja2dyb3VuZCBmaWx0ZXJzXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsZW5kaW5nJ1xuXG5cdFx0QGJsZW5kaW5nQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdmdWxsJ1xuXHRcdFx0dW5pdDogJydcblx0XHRcdGRlZmF1bHQ6ICdub3JtYWwnXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JsdXInXG5cblx0XHRAYmFja2dyb3VuZEJsdXJCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0JyaWdodG5lc3MnXG5cblx0XHRAYmFja2dyb3VuZEJyaWdodG5lc3NCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ1NhdHVyYXRlJ1xuXG5cdFx0QGJhY2tncm91bmRTYXR1cmF0ZUJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnaHVlUm90YXRlJ1xuXG5cdFx0QGJhY2tncm91bmRIdWVSb3RhdGVCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0NvbnRyYXN0J1xuXG5cdFx0QGJhY2tncm91bmRDb250cmFzdEJveCA9IG5ldyBwSW5wdXRcblx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRzZWN0aW9uOiBAZWZmZWN0c0RpdlxuXHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdHVuaXQ6ICcnXG5cblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHRwYXJlbnQ6IEBlZmZlY3RzQWNjby5ib2R5XG5cdFx0XHR0ZXh0OiAnSW52ZXJ0J1xuXG5cdFx0QGJhY2tncm91bmRJbnZlcnRCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0cGFyZW50OiBAZWZmZWN0c0FjY28uYm9keVxuXHRcdFx0dGV4dDogJ0dyYXlzY2FsZSdcblxuXHRcdEBiYWNrZ3JvdW5kR3JheXNjYWxlQm94ID0gbmV3IHBJbnB1dFxuXHRcdFx0cGFyZW50OiByb3dcblx0XHRcdHNlY3Rpb246IEBlZmZlY3RzRGl2XG5cdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0dW5pdDogJydcblxuXG5cdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQGVmZmVjdHNBY2NvLmJvZHlcblx0XHRcdHRleHQ6ICdTZXBpYSdcblxuXHRcdEBiYWNrZ3JvdW5kU2VwaWFCb3ggPSBuZXcgcElucHV0XG5cdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0c2VjdGlvbjogQGVmZmVjdHNEaXZcblx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHR1bml0OiAnJ1xuXG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBhbmltYXRpb24gcHJvcGVydGllc1xuXG5cblx0XHRAYW5pbXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0IyBuZXcgcERpdmlkZXJcblx0XHQjIFx0cGFyZW50OiBAYW5pbXNEaXZcblxuXHRcdEBhbmltc0FjY28gPSBuZXcgcEFjY29yZGlhblxuXHRcdFx0dGV4dDogJ0FuaW1hdGlvbnMnXG5cdFx0XHRwYXJlbnQ6IEBhbmltc0RpdlxuXG5cblxuXHRcdCMgaW1hZ2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBpbWFnZVByb3BlcnRpZXNEaXYgPSBuZXcgcERpdlxuXG5cdFx0bmV3IHBEaXZpZGVyXG5cdFx0XHRwYXJlbnQ6IEBpbWFnZVByb3BlcnRpZXNEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBpbWFnZVxuXG5cdFx0QGltYWdlQm94ID0gbmV3IHBJbWFnZVxuXHRcdFx0cGFyZW50OiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cdFx0XHRzZWN0aW9uOiBAaW1hZ2VQcm9wZXJ0aWVzRGl2XG5cblxuXHRcdCMgc2NyZWVuc2hvdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdEBzY3JlZW5zaG90RGl2ID0gbmV3IHBEaXZcblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBzY3JlZW5zaG90XG5cblx0XHRAc2NyZWVuc2hvdEJveCA9IG5ldyBwSW1hZ2Vcblx0XHRcdHBhcmVudDogQHNjcmVlbnNob3REaXZcblx0XHRcdHNlY3Rpb246IEBzY3JlZW5zaG90RGl2XG5cblxuXHRcdCMgLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0IyBwbGFjZWhvbGRlcnNcblxuXHRcdHJvdyA9IG5ldyBwUm93XG5cdFx0XHR0ZXh0OiAnJ1xuXHRcdHJvdy5lbGVtZW50LnN0eWxlLmhlaWdodCA9ICc2NHB4J1xuXG5cdFx0IyAtLS0tLS0tLS0tLS0tLS0tLS1cblx0XHQjIHNvY2lhbCBtZWRpYSBsaW5rc1xuXG5cdFx0QHNvY2lhbE1lZGlhUm93ID0gbmV3IHBSb3dcblx0XHRcdHBhcmVudDogQHRleHRQcm9wZXJ0aWVzRGl2LmJvZHlcblx0XHRcdHRleHQ6ICcnXG5cblx0XHRAbGlua2VkaW5JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0Xy5hc3NpZ24gQGxpbmtlZGluSWNvbixcblx0XHRcdGhyZWY6IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vaW4vc3RldmVydWl6b2tcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaWQ9XCJsaW5rZWRpbl9sb2dvXCIgY2xhc3M9XCJsb2dvXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgZmlsbD1cInJnYmEoOTEsIDkxLCA5MSwgMS4wMDApXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIGQ9XCJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMTEgMTloLTN2LTExaDN2MTF6bS0xLjUtMTIuMjY4Yy0uOTY2IDAtMS43NS0uNzktMS43NS0xLjc2NHMuNzg0LTEuNzY0IDEuNzUtMS43NjQgMS43NS43OSAxLjc1IDEuNzY0LS43ODMgMS43NjQtMS43NSAxLjc2NHptMTMuNSAxMi4yNjhoLTN2LTUuNjA0YzAtMy4zNjgtNC0zLjExMy00IDB2NS42MDRoLTN2LTExaDN2MS43NjVjMS4zOTYtMi41ODYgNy0yLjc3NyA3IDIuNDc2djYuNzU5elwiLz48L3N2Zz4nXG5cblx0XHRAZ2l0aHViSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuXHRcdF8uYXNzaWduIEBnaXRodWJJY29uLFxuXHRcdFx0aHJlZjogXCJodHRwOi8vZ2l0aHViLmNvbS9zdGV2ZXJ1aXpvay9nb3RjaGFcIlxuXHRcdFx0aW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyMHB4XCIgd2lkdGg9XCIyMHB4XCIgaWQ9XCJnaXRodWJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDEwMjQgMTAyNFwiPjxwYXRoIGZpbGw9XCJyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKVwiIGQ9XCJNNTEyIDBDMjI5LjI1IDAgMCAyMjkuMjUgMCA1MTJjMCAyMjYuMjUgMTQ2LjY4OCA0MTguMTI1IDM1MC4xNTYgNDg1LjgxMiAyNS41OTQgNC42ODggMzQuOTM4LTExLjEyNSAzNC45MzgtMjQuNjI1IDAtMTIuMTg4LTAuNDY5LTUyLjU2Mi0wLjcxOS05NS4zMTJDMjQyIDkwOC44MTIgMjExLjkwNiA4MTcuNSAyMTEuOTA2IDgxNy41Yy0yMy4zMTItNTkuMTI1LTU2Ljg0NC03NC44NzUtNTYuODQ0LTc0Ljg3NS00Ni41MzEtMzEuNzUgMy41My0zMS4xMjUgMy41My0zMS4xMjUgNTEuNDA2IDMuNTYyIDc4LjQ3IDUyLjc1IDc4LjQ3IDUyLjc1IDQ1LjY4OCA3OC4yNSAxMTkuODc1IDU1LjYyNSAxNDkgNDIuNSA0LjY1NC0zMyAxNy45MDQtNTUuNjI1IDMyLjUtNjguMzc1QzMwNC45MDYgNzI1LjQzOCAxODUuMzQ0IDY4MS41IDE4NS4zNDQgNDg1LjMxMmMwLTU1LjkzOCAxOS45NjktMTAxLjU2MiA1Mi42NTYtMTM3LjQwNi01LjIxOS0xMy0yMi44NDQtNjUuMDk0IDUuMDYyLTEzNS41NjIgMCAwIDQyLjkzOC0xMy43NSAxNDAuODEyIDUyLjUgNDAuODEyLTExLjQwNiA4NC41OTQtMTcuMDMxIDEyOC4xMjUtMTcuMjE5IDQzLjUgMC4xODggODcuMzEyIDUuODc1IDEyOC4xODggMTcuMjgxIDk3LjY4OC02Ni4zMTIgMTQwLjY4OC01Mi41IDE0MC42ODgtNTIuNSAyOCA3MC41MzEgMTAuMzc1IDEyMi41NjIgNS4xMjUgMTM1LjUgMzIuODEyIDM1Ljg0NCA1Mi42MjUgODEuNDY5IDUyLjYyNSAxMzcuNDA2IDAgMTk2LjY4OC0xMTkuNzUgMjQwLTIzMy44MTIgMjUyLjY4OCAxOC40MzggMTUuODc1IDM0Ljc1IDQ3IDM0Ljc1IDk0Ljc1IDAgNjguNDM4LTAuNjg4IDEyMy42MjUtMC42ODggMTQwLjUgMCAxMy42MjUgOS4zMTIgMjkuNTYyIDM1LjI1IDI0LjU2MkM4NzcuNDM4IDkzMCAxMDI0IDczOC4xMjUgMTAyNCA1MTIgMTAyNCAyMjkuMjUgNzk0Ljc1IDAgNTEyIDB6XCIgLz48L3N2Zz4nXG5cblx0XHRAdHdpdHRlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRfLmFzc2lnbiBAdHdpdHRlckljb24sXG5cdFx0XHRocmVmOiBcImh0dHA6Ly90d2l0dGVyLmNvbS9zdGV2ZXJ1aXpva1wiXG5cdFx0XHRpbm5lckhUTUw6ICc8c3ZnIGhlaWdodD1cIjI4cHhcIiB3aWR0aD1cIjI4cHhcIiBpZD1cInR3aXR0ZXJfbG9nb1wiIGNsYXNzPVwibG9nb1wiIGRhdGEtbmFtZT1cIkxvZ28g4oCUIEZJWEVEXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO30uY2xzLTJ7ZmlsbDpyZ2JhKDkxLCA5MSwgOTEsIDEuMDAwKTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPlR3aXR0ZXJfTG9nb19CbHVlPC90aXRsZT48cmVjdCBjbGFzcz1cImNscy0xXCIgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCI0MDBcIi8+PHBhdGggY2xhc3M9XCJjbHMtMlwiIGQ9XCJNMTUzLjYyLDMwMS41OWM5NC4zNCwwLDE0NS45NC03OC4xNiwxNDUuOTQtMTQ1Ljk0LDAtMi4yMiwwLTQuNDMtLjE1LTYuNjNBMTA0LjM2LDEwNC4zNiwwLDAsMCwzMjUsMTIyLjQ3YTEwMi4zOCwxMDIuMzgsMCwwLDEtMjkuNDYsOC4wNyw1MS40Nyw1MS40NywwLDAsMCwyMi41NS0yOC4zNywxMDIuNzksMTAyLjc5LDAsMCwxLTMyLjU3LDEyLjQ1LDUxLjM0LDUxLjM0LDAsMCwwLTg3LjQxLDQ2Ljc4QTE0NS42MiwxNDUuNjIsMCwwLDEsOTIuNCwxMDcuODFhNTEuMzMsNTEuMzMsMCwwLDAsMTUuODgsNjguNDdBNTAuOTEsNTAuOTEsMCwwLDEsODUsMTY5Ljg2YzAsLjIxLDAsLjQzLDAsLjY1YTUxLjMxLDUxLjMxLDAsMCwwLDQxLjE1LDUwLjI4LDUxLjIxLDUxLjIxLDAsMCwxLTIzLjE2Ljg4LDUxLjM1LDUxLjM1LDAsMCwwLDQ3LjkyLDM1LjYyLDEwMi45MiwxMDIuOTIsMCwwLDEtNjMuNywyMkExMDQuNDEsMTA0LjQxLDAsMCwxLDc1LDI3OC41NWExNDUuMjEsMTQ1LjIxLDAsMCwwLDc4LjYyLDIzXCIvPjwvc3ZnPidcblxuXHRcdGZvciBlbGVtZW50IGluIFtAbGlua2VkaW5JY29uLCBAZ2l0aHViSWNvbiwgQHR3aXR0ZXJJY29uXVxuXHRcdFx0QHNvY2lhbE1lZGlhUm93LmVsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudClcblx0XHRcdEBzb2NpYWxNZWRpYVJvdy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvY2lhbExpbmtzJylcblxuXHRcdEBoaWRlRGl2cygpXG5cdFx0QGNsZWFyUHJvcHMoKVxuXG5cdGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnM6IChhbmltYXRpb25zKSA9PlxuXHRcdGNoaWxkID0gQGFuaW1zQWNjby5ib2R5LmVsZW1lbnQuY2hpbGROb2Rlc1swXVxuXG5cdFx0aWYgbm90IGNoaWxkXG5cdFx0XHRAc2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblx0XHRcdHJldHVyblxuXG5cdFx0QGFuaW1zQWNjby5ib2R5LmVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGQpXG5cdFx0QGNsZWFyQ2hpbGRyZW5UaGVuU2hvd0FuaW1hdGlvbnMoYW5pbWF0aW9ucylcblxuXHRzaG93QW5pbWF0aW9uczogKGFuaW1hdGlvbnMpID0+XG5cdFx0XG5cdFx0QGFuaW1zRGl2LnZpc2libGUgPSBhbmltYXRpb25zLmxlbmd0aCA+IDBcblx0XG5cdFx0Zm9yIGFuaW0sIGkgaW4gYW5pbWF0aW9uc1xuXG5cdFx0XHRwcm9wZXJ0aWVzID0gYW5pbS5wcm9wZXJ0aWVzXG5cdFx0XHRvcHRpb25zID0gYW5pbS5vcHRpb25zXG5cdFx0XHRzdGF0ZUEgPSBhbmltLl9zdGF0ZUFcblx0XHRcdHN0YXRlQiA9IGFuaW0uX3N0YXRlQlxuXG5cdFx0XHQjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIGFuaW1hdGlvblxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnQW5pbWF0aW9uICcgKyAoaSArIDEpXG5cblx0XHRcdGZyb21Vbml0ID0gbmV3IHBMYWJlbFxuXHRcdFx0XHRwYXJlbnQ6IHJvdyBcblx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0dGV4dDogJ2Zyb20nXG5cblx0XHRcdHRvVW5pdCA9IG5ldyBwTGFiZWxcblx0XHRcdFx0cGFyZW50OiByb3cgXG5cdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHR0ZXh0OiAndG8nXG5cblx0XHRcdGZvciBlbGVtZW50IGluIFtmcm9tVW5pdC5lbGVtZW50LCB0b1VuaXQuZWxlbWVudF1cblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbGlnbkxlZnQnKVxuXG5cblx0XHRcdCMgLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHQjIHByb3BlcnRpZXNcblxuXHRcdFx0Zm9yIGtleSwgdmFsdWUgb2YgcHJvcGVydGllc1xuXG5cdFx0XHRcdHN3aXRjaCBrZXlcblx0XHRcdFx0XHR3aGVuICdncmFkaWVudCdcblxuXHRcdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgU3RhcnQnXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQVtrZXldLnN0YXJ0XG5cdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQltrZXldLnN0YXJ0XG5cdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgRW5kJ1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0IyBmcm9tXG5cdFx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdFx0XHRcdHVuaXQ6ICcnXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBzdGF0ZUFba2V5XS5lbmRcblx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRcdFx0XHQjIHRvXG5cdFx0XHRcdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHRcdFx0XHR1bml0OiAnJ1xuXHRcdFx0XHRcdFx0XHR2YWx1ZTogc3RhdGVCW2tleV0uZW5kXG5cdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdFx0dGV4dDogJ0dyYWQgQW5nbGUnXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQVtrZXldLmFuZ2xlXG5cdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQltrZXldLmFuZ2xlXG5cdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdFx0cm93ID0gbmV3IHBSb3dcblx0XHRcdFx0XHRcdFx0cGFyZW50OiBAYW5pbXNBY2NvLmJvZHlcblx0XHRcdFx0XHRcdFx0dGV4dDogXy5zdGFydENhc2Uoa2V5KVxuXG5cdFx0XHRcdFx0XHQjIGZyb21cblx0XHRcdFx0XHRcdGJveCA9IG5ldyBwSW5wdXRcblx0XHRcdFx0XHRcdFx0cGFyZW50OiByb3dcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnbGVmdCdcblx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQVtrZXldXG5cdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0XHRcdFx0IyB0b1xuXHRcdFx0XHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdyaWdodCdcblx0XHRcdFx0XHRcdFx0dW5pdDogJydcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHN0YXRlQltrZXldXG5cdFx0XHRcdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0IyAtLS0tLS0tLS0tLS0tLS1cblx0XHRcdCMgb3B0aW9uc1xuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnT3B0aW9ucydcblxuXHRcdFx0IyB0aW1lXG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ2xlZnQnXG5cdFx0XHRcdHVuaXQ6ICdzJ1xuXHRcdFx0XHR2YWx1ZTogb3B0aW9ucy50aW1lXG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0IyB0aW1lXG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHR1bml0OiAnZCdcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMuZGVsYXlcblx0XHRcdFx0aXNEZWZhdWx0OiBmYWxzZVxuXG5cdFx0XHRyb3cgPSBuZXcgcFJvd1xuXHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXHRcdFx0XHR0ZXh0OiAnJ1xuXG5cdFx0XHQjIHJlcGVhdFxuXHRcdFx0Ym94ID0gbmV3IHBJbnB1dFxuXHRcdFx0XHRwYXJlbnQ6IHJvd1xuXHRcdFx0XHRjbGFzc05hbWU6ICdsZWZ0J1xuXHRcdFx0XHR1bml0OiAncidcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMucmVwZWF0XG5cdFx0XHRcdGlzRGVmYXVsdDogZmFsc2VcblxuXHRcdFx0IyB0aW1lXG5cdFx0XHRib3ggPSBuZXcgcElucHV0XG5cdFx0XHRcdHBhcmVudDogcm93XG5cdFx0XHRcdGNsYXNzTmFtZTogJ3JpZ2h0J1xuXHRcdFx0XHR1bml0OiAnbCdcblx0XHRcdFx0dmFsdWU6IG9wdGlvbnMubG9vcGluZ1xuXHRcdFx0XHRpc0RlZmF1bHQ6IGZhbHNlXG5cblx0XHRcdHVubGVzcyBpIGlzIGFuaW1hdGlvbnMubGVuZ3RoIC0gMVxuXHRcdFx0XHRuZXcgcERpdmlkZXJcblx0XHRcdFx0XHRwYXJlbnQ6IEBhbmltc0FjY28uYm9keVxuXG5cdFx0XG5cdHNob3dQcm9wZXJ0aWVzOiAobGF5ZXIsIGN1c3RvbVByb3BzKSA9PlxuXG5cdFx0cHJvcHMgPSBsYXllci5wcm9wc1xuXHRcdF8uYXNzaWduIHByb3BzLCBjdXN0b21Qcm9wc1xuXG5cdFx0ZGVmYXVsdHMgPSBsYXllci5fcHJvcGVydHlMaXN0KClcblxuXHRcdF8uYXNzaWduIGRlZmF1bHRzLFxuXHRcdFx0cm90YXRpb246IGRlZmF1bHRzLnJvdGF0aW9uWlxuXHRcdFx0YmxlbmRpbmc6IHtkZWZhdWx0OiAnbm9ybWFsJ31cblxuXHRcdEBoaWRlRGl2cygpXG5cblx0XHRmb3Iga2V5LCB2YWx1ZSBvZiBfLm1lcmdlKGxheWVyLnByb3BzLCBjdXN0b21Qcm9wcylcblxuXHRcdFx0cHJvcExheWVyID0gQFtrZXkgKyAnQm94J11cblxuXHRcdFx0aWYgbm90IHByb3BMYXllclxuXHRcdFx0XHRjb250aW51ZVxuXG5cdFx0XHRkZWYgPSBkZWZhdWx0c1trZXldPy5kZWZhdWx0XG5cdFx0XHRcblx0XHRcdEBzaG93UHJvcGVydHkoa2V5LCB2YWx1ZSwgcHJvcExheWVyLCBkZWYpXG5cblx0c2hvd1Byb3BlcnR5OiAoa2V5LCB2YWx1ZSwgcHJvcExheWVyLCBkZWYpID0+XG5cblx0XHRwcm9wTGF5ZXIuaXNEZWZhdWx0ID0gZmFsc2VcblxuXHRcdGlmIG5vdCB2YWx1ZT8gb3IgXy5pc05hTih2YWx1ZSkgb3IgdmFsdWUgaXMgZGVmXG5cdFx0XHR2YWx1ZSA9IGRlZiA/ICcnXG5cdFx0XHRwcm9wTGF5ZXIuaXNEZWZhdWx0ID0gdHJ1ZVxuXG5cdFx0IyBjb2xvclxuXHRcdGlmIENvbG9yLmlzQ29sb3IodmFsdWUpXG5cdFx0XHR2YWx1ZSA9IHZhbHVlLnRvSHNsU3RyaW5nKClcblxuXHRcdCMgZ3JhZGllbnRcblx0XHRpZiB2YWx1ZT8uY29uc3RydWN0b3I/Lm5hbWUgaXMgJ0dyYWRpZW50J1xuXHRcdFx0cHJvcExheWVyLnZhbHVlID0gJydcblx0XHRcdHJldHVyblxuXG5cdFx0IyBzdHJpbmdcblx0XHRpZiB0eXBlb2YgdmFsdWUgaXMgJ3N0cmluZydcblx0XHRcdHByb3BMYXllci52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm5cblxuXHRcdHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKVxuXG5cdFx0IyBmbG9hdFxuXHRcdGlmIHZhbHVlLmluZGV4T2YoJy4nKSBpc250IC0xXG5cdFx0XHRwcm9wTGF5ZXIudmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKS50b0ZpeGVkKDIpXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgbnVtZXJcblx0XHRwcm9wTGF5ZXIudmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApLnRvRml4ZWQoKVxuXG5cdGhpZGVEaXZzOiA9PlxuXHRcdGZvciBkaXYgaW4gW1xuXHRcdFx0QGdyYWRpZW50UHJvcGVydGllc0Rpdixcblx0XHRcdEB0ZXh0UHJvcGVydGllc0Rpdixcblx0XHRcdEBzaGFkb3dQcm9wZXJ0aWVzRGl2LFxuXHRcdFx0QGltYWdlUHJvcGVydGllc0Rpdixcblx0XHRcdEBmaWx0ZXJzRGl2LFxuXHRcdFx0QHRyYW5zZm9ybXNEaXYsXG5cdFx0XHRAYm9yZGVyUHJvcGVydGllc0Rpdixcblx0XHRcdEBlZmZlY3RzRGl2LFxuXHRcdFx0QHNjcmVlbnNob3REaXZcblx0XHRdXG5cdFx0XG5cdFx0XHRkaXYudmlzaWJsZSA9IGZhbHNlXG5cblx0Y2xlYXJQcm9wczogPT5cblx0XHRmb3IgcHJvcCBpbiBAcHJvcExheWVyc1xuXHRcdFx0cHJvcC52YWx1ZSA9IHVuZGVmaW5lZFxuXG5cblxuXG5cbiMjIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0IC44ODg4OC4gICAgICAgICAgICAgZFAgICAgICAgICAgICBkUFxuXHRkOCcgICBgODggICAgICAgICAgICA4OCAgICAgICAgICAgIDg4XG5cdDg4ICAgICAgICAuZDg4ODhiLiBkODg4OFAgLmQ4ODg4Yi4gODhkODg4Yi4gLmQ4ODg4Yi5cblx0ODggICBZUDg4IDg4JyAgYDg4ICAgODggICA4OCcgIGBcIlwiIDg4JyAgYDg4IDg4JyAgYDg4XG5cdFk4LiAgIC44OCA4OC4gIC44OCAgIDg4ICAgODguICAuLi4gODggICAgODggODguICAuODhcblx0IGA4ODg4OCcgIGA4ODg4OFAnICAgZFAgICBgODg4ODhQJyBkUCAgICBkUCBgODg4ODg4OFxuXG4jIyMgXG5cblxuY2xhc3MgR290Y2hhXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdFx0QHNwZWNQYW5lbCA9IG5ldyBTcGVjUGFuZWxcblxuXHRcdF8uZGVmYXVsdHMgb3B0aW9ucyxcblx0XHRcdGNvbG9yOiAncmdiYSg3MiwgMjA3LCAyNTUsIDEuMDAwKSdcblx0XHRcdHNlbGVjdGVkQ29sb3I6ICdyZ2JhKDI1NSwgMSwgMjU1LCAxLjAwMCknXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogJyNGRkZGRkYnXG5cdFx0XHRmb250RmFtaWx5OiAnTWVubG8nXG5cdFx0XHRmb250U2l6ZTogJzEwJ1xuXHRcdFx0Zm9udFdlaWdodDogJzUwMCdcblx0XHRcdGJvcmRlclJhZGl1czogNFxuXHRcdFx0cGFkZGluZzoge3RvcDogMSwgYm90dG9tOiAxLCBsZWZ0OiAzLCByaWdodDogM31cblxuXHRcdF8uYXNzaWduIEAsXG5cdFx0XHRjb2xvcjogb3B0aW9ucy5jb2xvclxuXHRcdFx0c2VsZWN0ZWRDb2xvcjogb3B0aW9ucy5zZWxlY3RlZENvbG9yXG5cdFx0XHRzZWNvbmRhcnlDb2xvcjogb3B0aW9ucy5zZWNvbmRhcnlDb2xvclxuXHRcdFx0Zm9udEZhbWlseTogb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0XHRmb250U2l6ZTogb3B0aW9ucy5mb250U2l6ZVxuXHRcdFx0Zm9udFdlaWdodDogb3B0aW9ucy5mb250V2VpZ2h0XG5cdFx0XHRzaGFwZXM6IFtdXG5cdFx0XHRib3JkZXJSYWRpdXM6IG9wdGlvbnMuYm9yZGVyUmFkaXVzXG5cdFx0XHRwYWRkaW5nOiBvcHRpb25zLnBhZGRpbmdcblx0XHRcdGZvY3VzZWRFbGVtZW50OiB1bmRlZmluZWRcblx0XHRcdGVuYWJsZWQ6IGZhbHNlXG5cdFx0XHRzY3JlZW5FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcdGxheWVyczogW11cblx0XHRcdGNvbnRhaW5lcnM6IFtdXG5cdFx0XHR0aW1lcjogdW5kZWZpbmVkXG5cdFx0XHRfb25seVZpc2libGU6IHRydWVcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgQHRvZ2dsZSlcblx0XHRGcmFtZXIuQ3VycmVudENvbnRleHQuZG9tRXZlbnRNYW5hZ2VyLndyYXAod2luZG93KS5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIEB1cGRhdGUpXG5cblx0XHRAY29udGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZyYW1lckxheWVyIERldmljZVNjcmVlbicpWzBdXG5cdFx0QGNvbnRleHQuY2xhc3NMaXN0LmFkZCgnaG92ZXJDb250ZXh0Jylcblx0XHRAY29udGV4dC5jaGlsZE5vZGVzWzJdLmNsYXNzTGlzdC5hZGQoJ0lnbm9yZVBvaW50ZXJFdmVudHMnKVxuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkgQCxcblx0XHRcdFwib25seVZpc2libGVcIixcblx0XHRcdGdldDogLT4gcmV0dXJuIEBfb25seVZpc2libGVcblx0XHRcdHNldDogKGJvb2wpIC0+XG5cdFx0XHRcdHJldHVybiBpZiB0eXBlb2YgYm9vbCBpc250ICdib29sZWFuJ1xuXHRcdFx0XHRAX29ubHlWaXNpYmxlID0gYm9vbFxuXG5cdFx0RnJhbWVyLkRldmljZS5vbiBcImNoYW5nZTpkZXZpY2VUeXBlXCIsID0+XG5cdFx0XHRVdGlscy5kZWxheSAwLCBAdXBkYXRlXG5cblx0dG9nZ2xlOiAoZXZlbnQsIG9wZW4pID0+XG5cdFx0IyByZXR1cm4gaWYgRnJhbWVyLkRldmljZS5oYW5kcy5pc0FuaW1hdGluZ1xuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiYFwiIG9yIGV2ZW50LmtleSBpcyBcIjxcIiBvciBvcGVuIGlzIHRydWVcblx0XHRcdGlmIEBvcGVuZWQgdGhlbiBAZGlzYWJsZSgpIGVsc2UgQGVuYWJsZSgpXG5cdFx0XHRAb3BlbmVkID0gIUBvcGVuZWRcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgZXZlbnQua2V5IGlzIFwiL1wiIG9yIGV2ZW50LmtleSBpcyBcIj5cIlxuXHRcdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRcdEB1bnNldFNlbGVjdGVkTGF5ZXIoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2V0U2VsZWN0ZWRMYXllcigpXG5cblx0XHRcdHJldHVyblxuXG5cdCMgb3BlbiB0aGUgcGFuZWwsIHN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG5cdGVuYWJsZTogPT5cblx0XHRAX2NhbnZhc0NvbG9yID0gQ2FudmFzLmJhY2tncm91bmRDb2xvclxuXHRcdHN2Z0NvbnRleHQuc2V0Q29udGV4dCgpXG5cblx0XHRAdHJhbnNpdGlvbih0cnVlKVxuXG5cdGRpc2FibGU6ID0+XG5cdFx0QHVuZm9jdXMoKVxuXHRcdEBlbmFibGVkID0gZmFsc2VcblxuXHRcdEB0cmFuc2l0aW9uKGZhbHNlKVxuXG5cdHRyYW5zaXRpb246IChvcGVuID0gdHJ1ZSwgc2Vjb25kcyA9IC41KSA9PlxuXHRcdGhhbmRzID0gRnJhbWVyLkRldmljZS5oYW5kc1xuXG5cdFx0aGFuZHMub24gXCJjaGFuZ2U6eFwiLCBAc2hvd1RyYW5zaXRpb25cblxuXHRcdGhhbmRzLm9uY2UgRXZlbnRzLkFuaW1hdGlvbkVuZCwgPT5cblx0XHRcdGhhbmRzLm9mZiBcImNoYW5nZTp4XCIsIEBzaG93VHJhbnNpdGlvblxuXHRcdFx0QGVuYWJsZWQgPSBAb3BlbmVkID0gb3BlblxuXG5cdFx0XHRpZiBvcGVuXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9uIEV2ZW50cy5Nb3VzZU92ZXIsIEBzZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub24gRXZlbnRzLk1vdXNlT3V0LCBAdW5zZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5iYWNrZ3JvdW5kLm9uIEV2ZW50cy5Nb3VzZU92ZXIsIEB1bnNldEhvdmVyZWRMYXllclxuXHRcdFx0XHRGcmFtZXIuRGV2aWNlLnNjcmVlbi5vbiBFdmVudHMuQ2xpY2ssIEBzZXRTZWxlY3RlZExheWVyXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5Nb3VzZU92ZXIsIEBzZXRIb3ZlcmVkTGF5ZXJcblx0XHRcdFx0RnJhbWVyLkRldmljZS5zY3JlZW4ub2ZmIEV2ZW50cy5Nb3VzZU91dCwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2UuYmFja2dyb3VuZC5vZmYgRXZlbnRzLk1vdXNlT3ZlciwgQHVuc2V0SG92ZXJlZExheWVyXG5cdFx0XHRcdEZyYW1lci5EZXZpY2Uuc2NyZWVuLm9mZiBFdmVudHMuQ2xpY2ssIEBzZXRTZWxlY3RlZExheWVyXG5cblx0XHRcdEBmb2N1cygpXG5cblx0XHRAX3N0YXJ0UG9zaXRpb24gPSBGcmFtZXIuRGV2aWNlLmhhbmRzLnhcblxuXHRcdG1pZFggPSBoYW5kcy5fY29udGV4dC5pbm5lcldpZHRoIC8gMlxuXG5cdFx0RnJhbWVyLkRldmljZS5oYW5kcy5hbmltYXRlXG5cdFx0XHRtaWRYOiBpZiBvcGVuIHRoZW4gbWlkWCAtIDExMiBlbHNlIG1pZFhcblx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdHRpbWU6IHNlY29uZHNcblx0XHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAxMClcblxuXHRzaG93VHJhbnNpdGlvbjogPT5cblx0XHRoYW5kcyA9IEZyYW1lci5EZXZpY2UuaGFuZHNcblx0XHRtaWRYID0gaGFuZHMuX2NvbnRleHQuaW5uZXJXaWR0aCAvIDJcblxuXHRcdG9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShcblx0XHRcdGhhbmRzLm1pZFgsXG5cdFx0XHRbbWlkWCAtIDU2LCBtaWRYIC0gMTEyXSwgXG5cdFx0XHRbMCwgMV0sIFxuXHRcdFx0dHJ1ZVxuXHRcdClcblxuXHRcdGZhY3RvciA9IFV0aWxzLm1vZHVsYXRlKFxuXHRcdFx0aGFuZHMubWlkWCxcblx0XHRcdFttaWRYLCBtaWRYIC0gMTEyXSxcblx0XHRcdFswLCAxXSxcblx0XHRcdHRydWVcblx0XHQpXG5cblx0XHRAc3BlY1BhbmVsLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHlcblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gQ29sb3IubWl4IEBfY2FudmFzQ29sb3IsJ3JnYmEoMzAsIDMwLCAzMCwgMS4wMDApJywgZmFjdG9yXG5cblx0IyB1cGRhdGUgd2hlbiBzY3JlZW4gc2l6ZSBjaGFuZ2VzXG5cdHVwZGF0ZTogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBvcGVuZWRcblxuXHRcdEZyYW1lci5EZXZpY2UuaGFuZHMubWlkWCAtPSAxMjJcblxuXHRcdHN2Z0NvbnRleHQuc2V0Q29udGV4dCgpXG5cdFx0QGZvY3VzKClcblxuXHQjIGdldCB0aGUgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50XG5cdGdldERpbWVuc2lvbnM6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXHRcdGQgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cblx0XHRkaW1lbnNpb25zID0ge1xuXHRcdFx0eDogZC5sZWZ0XG5cdFx0XHR5OiBkLnRvcFxuXHRcdFx0d2lkdGg6IGQud2lkdGhcblx0XHRcdGhlaWdodDogZC5oZWlnaHRcblx0XHRcdG1pZFg6IGQubGVmdCArIChkLndpZHRoIC8gMilcblx0XHRcdG1pZFk6IGQudG9wICsgKGQuaGVpZ2h0IC8gMilcblx0XHRcdG1heFg6IGQubGVmdCArIGQud2lkdGhcblx0XHRcdG1heFk6IGQudG9wICsgZC5oZWlnaHRcblx0XHRcdGZyYW1lOiBkXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpbWVuc2lvbnNcblxuXHQjIG1ha2UgYSByZWxhdGl2ZSBkaXN0YW5jZSBsaW5lXG5cdG1ha2VMaW5lOiAocG9pbnRBLCBwb2ludEIsIGxhYmVsID0gdHJ1ZSkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxpbmUgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0ZDogXCJNICN7cG9pbnRBWzBdfSAje3BvaW50QVsxXX0gTCAje3BvaW50QlswXX0gI3twb2ludEJbMV19XCJcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0aWYgcG9pbnRBWzBdIGlzIHBvaW50QlswXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF0gLSA1fSAje3BvaW50QVsxXX0gTCAje3BvaW50QVswXSArIDV9ICN7cG9pbnRBWzFdfVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXSAtIDV9ICN7cG9pbnRCWzFdfSBMICN7cG9pbnRCWzBdICsgNX0gI3twb2ludEJbMV19XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHRcdGVsc2UgaWYgcG9pbnRBWzFdIGlzIHBvaW50QlsxXVxuXG5cdFx0XHRjYXBBID0gbmV3IFNWR1NoYXBlXG5cdFx0XHRcdHR5cGU6ICdwYXRoJ1xuXHRcdFx0XHRkOiBcIk0gI3twb2ludEFbMF19ICN7cG9pbnRBWzFdIC0gNX0gTCAje3BvaW50QVswXX0gI3twb2ludEFbMV0gKyA1fVwiXG5cdFx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRcdGNhcEIgPSBuZXcgU1ZHU2hhcGVcblx0XHRcdFx0dHlwZTogJ3BhdGgnXG5cdFx0XHRcdGQ6IFwiTSAje3BvaW50QlswXX0gI3twb2ludEJbMV0gLSA1fSBMICN7cG9pbnRCWzBdfSAje3BvaW50QlsxXSArIDV9XCJcblx0XHRcdFx0c3Ryb2tlOiBjb2xvclxuXHRcdFx0XHQnc3Ryb2tlLXdpZHRoJzogJzFweCdcblxuXHQjIG1ha2UgdGhlIGxhYmVsIGJveCBmb3IgZGlzdGFuY2UgbGluZXNcblx0bWFrZUxhYmVsOiAoeCwgeSwgdGV4dCkgPT5cblxuXHRcdGNvbG9yID0gaWYgQHNlbGVjdGVkTGF5ZXI/IHRoZW4gQHNlbGVjdGVkQ29sb3IgZWxzZSBAY29sb3JcblxuXHRcdGxhYmVsID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAndGV4dCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogeFxuXHRcdFx0eTogeVxuXHRcdFx0J2ZvbnQtZmFtaWx5JzogQGZvbnRGYW1pbHlcblx0XHRcdCdmb250LXNpemUnOiBAZm9udFNpemVcblx0XHRcdCdmb250LXdlaWdodCc6IEBmb250V2VpZ2h0XG5cdFx0XHRmaWxsOiBAc2Vjb25kYXJ5Q29sb3Jcblx0XHRcdHRleHQ6IE1hdGguZmxvb3IodGV4dCAvIEByYXRpbylcblxuXHRcdGwgPSBAZ2V0RGltZW5zaW9ucyhsYWJlbC5lbGVtZW50KVxuXG5cdFx0bGFiZWwueCA9IHggLSBsLndpZHRoIC8gMlxuXHRcdGxhYmVsLnkgPSB5ICsgbC5oZWlnaHQgLyA0IC0gMVxuXG5cdFx0Ym94ID0gbmV3IFNWR1NoYXBlXG5cdFx0XHR0eXBlOiAncmVjdCdcblx0XHRcdHBhcmVudDogc3ZnQ29udGV4dFxuXHRcdFx0eDogbGFiZWwueCAtIEBwYWRkaW5nLmxlZnRcblx0XHRcdHk6IGxhYmVsLnkgLSBsLmhlaWdodCArIDFcblx0XHRcdHdpZHRoOiBsLndpZHRoICsgQHBhZGRpbmcubGVmdCArIEBwYWRkaW5nLnJpZ2h0XG5cdFx0XHRoZWlnaHQ6IGwuaGVpZ2h0ICsgQHBhZGRpbmcudG9wICsgQHBhZGRpbmcuYm90dG9tICsgMVxuXHRcdFx0cng6IEBib3JkZXJSYWRpdXNcblx0XHRcdHJ5OiBAYm9yZGVyUmFkaXVzXG5cdFx0XHRmaWxsOiBuZXcgQ29sb3IoY29sb3IpLmRhcmtlbig0MClcblx0XHRcdHN0cm9rZTogY29sb3Jcblx0XHRcdCdzdHJva2Utd2lkdGgnOiAnMXB4J1xuXG5cdFx0bGFiZWwuc2hvdygpXG5cblx0IyBtYWtlIHRoZSBib3VuZGluZyByZWN0YW5nbGUgZm9yIHNlbGVjdGVkIC8gaG92ZXJlZCBlbGVtZW50c1xuXHRtYWtlUmVjdE92ZXJsYXlzOiAocywgaCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblxuXHRcdGlmIEBob3ZlcmVkTGF5ZXIgaXMgRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRcdGhvdmVyRmlsbCA9IG5ldyBDb2xvcihAY29sb3IpLmFscGhhKDApXG5cdFx0ZWxzZVxuXHRcdFx0aG92ZXJGaWxsID0gbmV3IENvbG9yKEBjb2xvcikuYWxwaGEoLjIpXG5cblx0XHRob3ZlcmVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IGgueFxuXHRcdFx0eTogaC55XG5cdFx0XHR3aWR0aDogaC53aWR0aFxuXHRcdFx0aGVpZ2h0OiBoLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAY29sb3Jcblx0XHRcdGZpbGw6IGhvdmVyRmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0XHRpZiBAc2VsZWN0ZWRMYXllciBpcyBGcmFtZXIuRGV2aWNlLnNjcmVlblxuXHRcdFx0c2VsZWN0RmlsbCA9IG5ldyBDb2xvcihAc2VsZWN0ZWRDb2xvcikuYWxwaGEoMClcblx0XHRlbHNlXG5cdFx0XHRzZWxlY3RGaWxsID0gbmV3IENvbG9yKEBzZWxlY3RlZENvbG9yKS5hbHBoYSguMilcblxuXHRcdHNlbGVjdGVkUmVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ3JlY3QnXG5cdFx0XHRwYXJlbnQ6IHN2Z0NvbnRleHRcblx0XHRcdHg6IHMueFxuXHRcdFx0eTogcy55XG5cdFx0XHR3aWR0aDogcy53aWR0aFxuXHRcdFx0aGVpZ2h0OiBzLmhlaWdodFxuXHRcdFx0c3Ryb2tlOiBAc2VsZWN0ZWRDb2xvclxuXHRcdFx0ZmlsbDogc2VsZWN0RmlsbFxuXHRcdFx0J3N0cm9rZS13aWR0aCc6ICcxcHgnXG5cblx0IyBtYWtlIGRhc2hlZCBsaW5lcyBmcm9tIGJvdW5kaW5nIHJlY3QgdG8gc2NyZWVuIGVkZ2Vcblx0bWFrZURhc2hlZExpbmVzOiAoZSwgZiwgY29sb3IsIG9mZnNldCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IGVcblx0XHRyZXR1cm4gaWYgZSBpcyBmXG5cblx0XHRjb2xvciA9IG5ldyBDb2xvcihjb2xvcikuYWxwaGEoLjgpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBlLngsIHk6IGYueX0sXG5cdFx0XHR7eDogZS54LCB5OiBmLm1heFl9XG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZS5tYXhYLCB5OiBmLnl9LFxuXHRcdFx0e3g6IGUubWF4WCwgeTogZi5tYXhZfSxcblx0XHRcdGNvbG9yLFxuXHRcdFx0b2Zmc2V0XG5cdFx0XHQpXG5cblx0XHRuZXcgRGFzaGVkTGluZShcblx0XHRcdHt4OiBmLngsIFx0eTogZS55fSxcblx0XHRcdHt4OiBmLm1heFgsIHk6IGUueX0sXG5cdFx0XHRjb2xvcixcblx0XHRcdG9mZnNldFxuXHRcdFx0KVxuXG5cdFx0bmV3IERhc2hlZExpbmUoXG5cdFx0XHR7eDogZi54LCBcdHk6IGUubWF4WX0sXG5cdFx0XHR7eDogZi5tYXhYLCB5OiBlLm1heFl9LFxuXHRcdFx0Y29sb3IsXG5cdFx0XHRvZmZzZXRcblx0XHRcdClcblxuXHRzaG93RGlzdGFuY2VzOiAoc2VsZWN0ZWQsIGhvdmVyZWQpID0+XG5cblx0XHRpZiBAaG92ZXJlZExheWVyIGlzIEBzZWxlY3RlZExheWVyXG5cdFx0XHRAaG92ZXJlZExheWVyID0gRnJhbWVyLkRldmljZS5zY3JlZW5cblxuXHRcdHMgPSBAZ2V0RGltZW5zaW9ucyhAc2VsZWN0ZWRMYXllci5fZWxlbWVudClcblx0XHRoID0gQGdldERpbWVuc2lvbnMoQGhvdmVyZWRMYXllci5fZWxlbWVudClcblx0XHRmID0gQGdldERpbWVuc2lvbnMoRnJhbWVyLkRldmljZS5zY3JlZW4uX2VsZW1lbnQpXG5cblx0XHRyZXR1cm4gaWYgbm90IHMgb3Igbm90IGhcblxuXHRcdEByYXRpbyA9IEZyYW1lci5EZXZpY2Uuc2NyZWVuLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC8gU2NyZWVuLndpZHRoXG5cblx0XHRAbWFrZURhc2hlZExpbmVzKHMsIGYsIEBzZWxlY3RlZENvbG9yLCA1KVxuXG5cdFx0QG1ha2VSZWN0T3ZlcmxheXMocywgaClcblxuXG5cdFx0IyBXaGVuIHNlbGVjdGVkIGVsZW1lbnQgY29udGFpbnMgaG92ZXJlZCBlbGVtZW50XG5cblx0XHRpZiBzLnggPCBoLnggYW5kIHMubWF4WCA+IGgubWF4WCBhbmQgcy55IDwgaC55IGFuZCBzLm1heFkgPiBoLm1heFlcblx0XHRcdFxuXHRcdFx0IyB0b3BcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueSAtIGgueSlcblx0XHRcdG0gPSBzLnkgKyBkIC8gMlxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy55ICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgcmlnaHRcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WCAtIGgubWF4WClcblx0XHRcdG0gPSBoLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MubWF4WCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdFx0IyBib3R0b21cblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMubWF4WSAtIGgubWF4WSlcblx0XHRcdG0gPSBoLm1heFkgKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5taWRYLCBoLm1heFkgKyA1XSwgW2gubWlkWCwgcy5tYXhZIC0gNF0pXG5cdFx0XHRAbWFrZUxhYmVsKGgubWlkWCwgbSwgZClcblxuXHRcdFx0IyBsZWZ0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLnggKyA1LCBoLm1pZFldLCBbaC54IC0gNCwgaC5taWRZXSlcblx0XHRcdEBtYWtlTGFiZWwobSwgaC5taWRZLCBkKVxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBob3ZlcmVkIGVsZW1lbnQgY29udGFpbnMgc2VsZWN0ZWQgZWxlbWVudFxuXG5cdFx0aWYgcy54ID4gaC54IGFuZCBzLm1heFggPCBoLm1heFggYW5kIHMueSA+IGgueSBhbmQgcy5tYXhZIDwgaC5tYXhZXG5cdFx0XHRcblx0XHRcdCMgdG9wXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLnkpXG5cdFx0XHRtID0gaC55ICsgZCAvIDJcblxuXHRcdFx0QG1ha2VMaW5lKFtzLm1pZFgsIGgueSArIDVdLCBbcy5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwocy5taWRYLCBtLCBkKVxuXG5cdFx0XHQjIHJpZ2h0XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFggLSBzLm1heFgpXG5cdFx0XHRtID0gcy5tYXhYICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWF4WCArIDUsIHMubWlkWV0sIFtoLm1heFggLSA0LCBzLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBzLm1pZFksIGQpXG5cblx0XHRcdCMgYm90dG9tXG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLm1heFkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MubWlkWCwgcy5tYXhZICsgNV0sIFtzLm1pZFgsIGgubWF4WSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChzLm1pZFgsIG0sIGQpXG5cblx0XHRcdCMgbGVmdFxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC54IC0gcy54KVxuXHRcdFx0bSA9IGgueCArIGQgLyAyXG5cblx0XHRcdEBtYWtlTGluZShbaC54ICsgNSwgcy5taWRZXSwgW3MueCAtIDQsIHMubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIHMubWlkWSwgZClcblxuXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgV2hlbiBzZWxlY3RlZCBlbGVtZW50IGRvZXNuJ3QgY29udGFpbiBob3ZlcmVkIGVsZW1lbnRcblx0XHRcblx0XHQjIHRvcFxuXG5cdFx0aWYgcy55ID4gaC5tYXhZXG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnkgLSBoLm1heFkpXG5cdFx0XHRtID0gcy55IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgaC5tYXhZICsgNV0sIFtoLm1pZFgsIHMueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA+IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMocy55IC0gaC55KVxuXHRcdFx0bSA9IHMueSAtIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIGgueSArIDVdLCBbaC5taWRYLCBzLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdFx0IyBsZWZ0XG5cblx0XHRpZiBoLm1heFggPCBzLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKHMueCAtIGgubWF4WClcblx0XHRcdG0gPSBzLnggLSAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbaC5tYXhYICsgNSwgaC5taWRZXSwgW3MueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgaC54IDwgcy54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhzLnggLSBoLngpXG5cdFx0XHRtID0gcy54IC0gKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gueCArIDUsIGgubWlkWV0sIFtzLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIHJpZ2h0XG5cblx0XHRpZiBzLm1heFggPCBoLnhcblxuXHRcdFx0ZCA9IE1hdGguYWJzKGgueCAtIHMubWF4WClcblx0XHRcdG0gPSBzLm1heFggKyAoZCAvIDIpXG5cblx0XHRcdEBtYWtlTGluZShbcy5tYXhYICsgNSwgaC5taWRZXSwgW2gueCAtIDQsIGgubWlkWV0pXG5cdFx0XHRAbWFrZUxhYmVsKG0sIGgubWlkWSwgZClcblxuXHRcdGVsc2UgaWYgcy54IDwgaC54XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnggLSBzLngpXG5cdFx0XHRtID0gcy54ICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW3MueCArIDUsIGgubWlkWV0sIFtoLnggLSA0LCBoLm1pZFldKVxuXHRcdFx0QG1ha2VMYWJlbChtLCBoLm1pZFksIGQpXG5cblx0XHQjIGJvdHRvbVxuXG5cdFx0aWYgcy5tYXhZIDwgaC55XG5cblx0XHRcdGQgPSBNYXRoLmFicyhoLnkgLSBzLm1heFkpXG5cdFx0XHRtID0gcy5tYXhZICsgKGQgLyAyKVxuXG5cdFx0XHRAbWFrZUxpbmUoW2gubWlkWCwgcy5tYXhZICsgNV0sIFtoLm1pZFgsIGgueSAtIDRdKVxuXHRcdFx0QG1ha2VMYWJlbChoLm1pZFgsIG0sIGQpXG5cblx0XHRlbHNlIGlmIHMueSA8IGgueVxuXG5cdFx0XHRkID0gTWF0aC5hYnMoaC55IC0gcy55KVxuXHRcdFx0bSA9IHMueSArIChkIC8gMilcblxuXHRcdFx0QG1ha2VMaW5lKFtoLm1pZFgsIHMueSArIDVdLCBbaC5taWRYLCBoLnkgLSA0XSlcblx0XHRcdEBtYWtlTGFiZWwoaC5taWRYLCBtLCBkKVxuXG5cdCMgc2V0IHRoZSBwYW5lbCB3aXRoIGN1cnJlbnQgcHJvcGVydGllc1xuXHRzZXRQYW5lbFByb3BlcnRpZXM6ICgpID0+XG5cblx0XHQjIGRlY2lkZSB3aGljaCBsYXllciB0byB1c2UgZm9yIHBhbmVsIHByb3BzXG5cdFx0aWYgQHNlbGVjdGVkTGF5ZXI/IGFuZCBAc2VsZWN0ZWRMYXllciBpc250IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cdFx0XHRsYXllciA9IEBzZWxlY3RlZExheWVyXG5cdFx0ZWxzZSBpZiBAaG92ZXJlZExheWVyP1xuXHRcdFx0bGF5ZXIgPSBAaG92ZXJlZExheWVyXG5cdFx0ZWxzZVxuXHRcdFx0QHNwZWNQYW5lbC5jbGVhclByb3BzKClcblx0XHRcdHJldHVyblxuXG5cdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBsYXN0TGF5ZXJcblx0XHRAbGFzdExheWVyID0gbGF5ZXJcblx0XHRcblx0XHQjIHByb3BlcnRpZXMgdG8gYXNzaWduZWQgdG8gbGF5ZXIucHJvcHNcblx0XHRjdXN0b21Qcm9wcyA9XG5cdFx0XHR4OiBsYXllci5zY3JlZW5GcmFtZS54XG5cdFx0XHR5OiBsYXllci5zY3JlZW5GcmFtZS55XG5cdFx0XHRjb21wb25lbnROYW1lOiBsYXllci5jb25zdHJ1Y3Rvci5uYW1lXG5cdFx0XHRjb21wb25lbnROYW1lczogQGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQpXG5cdFx0XHRwYXJlbnROYW1lOiBsYXllci5wYXJlbnQ/Lm5hbWVcblx0XHRcdHJvdGF0aW9uOiBsYXllci5yb3RhdGlvblpcblx0XHRcdHRleHRBbGlnbjogbGF5ZXIucHJvcHMuc3R5bGVkVGV4dE9wdGlvbnM/LmFsaWdubWVudFxuXHRcdFx0YmxlbmRpbmc6IGxheWVyLmJsZW5kaW5nXG5cdFx0XHQjIHNjcmVlbnNob3Q6IEBnZXRTY3JlZW5zaG90KGxheWVyLl9lbGVtZW50KVxuXHRcdFxuXHRcdGlmIGxheWVyLmdyYWRpZW50P1xuXHRcdFx0Xy5hc3NpZ24gY3VzdG9tUHJvcHMsXG5cdFx0XHRcdGdyYWRpZW50U3RhcnQ6IGxheWVyLmdyYWRpZW50LnN0YXJ0XG5cdFx0XHRcdGdyYWRpZW50RW5kOiBsYXllci5ncmFkaWVudC5lbmRcblx0XHRcdFx0Z3JhZGllbnRBbmdsZTogbGF5ZXIuZ3JhZGllbnQuYW5nbGVcblxuXHRcdGlmIGxheWVyLnNoYWRvd3M/XG5cdFx0XHRfLmFzc2lnbiBjdXN0b21Qcm9wcyxcblx0XHRcdFx0c2hhZG93WDogbGF5ZXIuc2hhZG93c1swXT8ueFxuXHRcdFx0XHRzaGFkb3dZOiBsYXllci5zaGFkb3dzWzBdPy55XG5cdFx0XHRcdHNoYWRvd1NwcmVhZDogbGF5ZXIuc2hhZG93c1swXT8uc3ByZWFkXG5cdFx0XHRcdHNoYWRvd0NvbG9yOiBsYXllci5zaGFkb3dzWzBdPy5jb2xvclxuXHRcdFx0XHRzaGFkb3dUeXBlOiBsYXllci5zaGFkb3dzWzBdPy50eXBlXG5cdFx0XHRcdHNoYWRvd0JsdXI6IGxheWVyLnNoYWRvd3NbMF0/LmJsdXJcblxuXHRcdEBzcGVjUGFuZWwuc2hvd1Byb3BlcnRpZXMobGF5ZXIsIGN1c3RvbVByb3BzKVxuXG5cdFx0YW5pbWF0aW9ucyA9IGxheWVyLmFuaW1hdGlvbnMoKVxuXG5cdFx0QHNwZWNQYW5lbC5jbGVhckNoaWxkcmVuVGhlblNob3dBbmltYXRpb25zKGFuaW1hdGlvbnMpXG5cblxuXHRzZXRIb3ZlcmVkTGF5ZXI6IChldmVudCkgPT5cblx0XHRyZXR1cm4gaWYgbm90IEBlbmFibGVkXG5cblx0XHRsYXllciA9IEBnZXRMYXllckZyb21FbGVtZW50KGV2ZW50Py50YXJnZXQpXG5cdFx0cmV0dXJuIGlmIG5vdCBAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIpXG5cblx0XHRAaG92ZXJlZExheWVyID0gbGF5ZXJcblxuXHRcdEB0cnlGb2N1cyhldmVudClcblx0XHRyZXR1cm4gZmFsc2VcblxuXHR1bnNldEhvdmVyZWRMYXllcjogKGV2ZW50KSA9PlxuXHRcdEBob3ZlcmVkTGF5ZXIgPSB1bmRlZmluZWRcblx0XHRVdGlscy5kZWxheSAuMDUsID0+XG5cdFx0XHRpZiBub3QgQGhvdmVyZWRMYXllciB0aGVuIEBmb2N1cygpXG5cblx0c2V0U2VsZWN0ZWRMYXllcjogPT5cblx0XHRyZXR1cm4gaWYgbm90IEBob3ZlcmVkTGF5ZXJcblxuXHRcdEBzZWxlY3RlZExheWVyID0gQGhvdmVyZWRMYXllclxuXHRcdEBmb2N1cygpXG5cblx0dW5zZXRTZWxlY3RlZExheWVyOiA9PlxuXHRcdEBzZWxlY3RlZExheWVyID0gdW5kZWZpbmVkXG5cblxuXHQjIEZpbmQgYW4gZWxlbWVudCB0aGF0IGJlbG9uZ3MgdG8gYSBGcmFtZXIgTGF5ZXJcblx0ZmluZExheWVyRWxlbWVudDogKGVsZW1lbnQpIC0+XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50XG5cdFx0cmV0dXJuIGlmIG5vdCBlbGVtZW50LmNsYXNzTGlzdFxuXG5cdFx0aWYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyYW1lckxheWVyJylcblx0XHRcdHJldHVybiBlbGVtZW50XG5cblx0XHRAZmluZExheWVyRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUpXG5cblx0IyBGaW5kIGEgRnJhbWVyIExheWVyIHRoYXQgbWF0Y2hlcyBhIEZyYW1lciBMYXllciBlbGVtZW50XG5cdGdldExheWVyRnJvbUVsZW1lbnQ6IChlbGVtZW50KSA9PlxuXHRcdHJldHVybiBpZiBub3QgZWxlbWVudFxuXG5cdFx0ZWxlbWVudCA9IEBmaW5kTGF5ZXJFbGVtZW50KGVsZW1lbnQpXG5cdFx0bGF5ZXIgPSBfLmZpbmQoRnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnMsIFsnX2VsZW1lbnQnLCBlbGVtZW50XSlcblxuXHRcdHJldHVybiBsYXllclxuXG5cdGdldExheWVySXNWaXNpYmxlOiAobGF5ZXIpID0+XG5cdFx0aWYgbm90IEBfb25seVZpc2libGVcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBub3QgbGF5ZXJcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRpZiBsYXllci5vcGFjaXR5IGlzIDAgb3IgbGF5ZXIudmlzaWJsZSBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRAZ2V0TGF5ZXJJc1Zpc2libGUobGF5ZXIucGFyZW50KVxuXG5cdGdldFNjcmVlbnNob3Q6IChlbGVtZW50KSA9PlxuXG5cdFx0Zm9yZWlnbk9iamVjdCA9IG5ldyBTVkdTaGFwZVxuXHRcdFx0dHlwZTogJ2ZvcmVpZ25PYmplY3QnXG5cblx0XHQjIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmcmFtZXJMYXllciBEZXZpY2VDb21wb25lbnRQb3J0JylbMF1cblx0XHRcblx0XHRyZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdGN0eCA9IEBzcGVjUGFuZWwuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0XHRkYXRhID0gXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JyN7cmVjdC53aWR0aH0nIGhlaWdodD0nI3tyZWN0LmhlaWdodH0nPlwiICtcblx0XHRcdCc8Zm9yZWlnbk9iamVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+JyArXG5cdFx0XHQnPGRpdiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj4nICtcblx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MICtcblx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdCc8L2ZvcmVpZ25PYmplY3Q+JyArXG5cdFx0XHQnPC9zdmc+J1xuXG5cdFx0RE9NVVJMID0gd2luZG93LlVSTCBvciB3aW5kb3cud2Via2l0VVJMIG9yIHdpbmRvd1xuXG5cdFx0c3ZnID0gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogJ2ltYWdlL3N2Zyt4bWwnfSlcblx0XHR1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zylcblx0XHRAc3BlY1BhbmVsLnNjcmVlbnNob3RCb3gudmFsdWUgPSB1cmxcblxuXG5cdCMgRmluZCBhIG5vbi1zdGFuZGFyZCBDb21wb25lbnQgdGhhdCBpbmNsdWRlcyBhIExheWVyXG5cdGdldENvbXBvbmVudEZyb21MYXllcjogKGxheWVyLCBuYW1lcyA9IFtdKSA9PlxuXHRcdGlmIG5vdCBsYXllclxuXHRcdFx0cmV0dXJuIG5hbWVzLmpvaW4oJywgJylcblxuXHRcdGlmIG5vdCBfLmluY2x1ZGVzKFtcIkxheWVyXCIsIFwiVGV4dExheWVyXCIsIFwiU2Nyb2xsQ29tcG9uZW50XCJdLCBsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXHRcdFx0bmFtZXMucHVzaChsYXllci5jb25zdHJ1Y3Rvci5uYW1lKVxuXG5cdFx0QGdldENvbXBvbmVudEZyb21MYXllcihsYXllci5wYXJlbnQsIG5hbWVzKVxuXG5cblx0IyBEZWxheSBmb2N1cyBieSBhIHNtYWxsIGFtb3VudCB0byBwcmV2ZW50IGZsYXNoaW5nXG5cdHRyeUZvY3VzOiAoZXZlbnQpID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QGZvY3VzRWxlbWVudCA9IGV2ZW50LnRhcmdldFxuXHRcdGRvIChldmVudCkgPT5cblx0XHRcdFV0aWxzLmRlbGF5IC4wNSwgPT5cblx0XHRcdFx0aWYgQGZvY3VzRWxlbWVudCBpc250IGV2ZW50LnRhcmdldFxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcblx0XHRcdFx0QGZvY3VzKClcblxuXHQjIENoYW5nZSBmb2N1cyB0byBhIG5ldyBob3ZlcmVkIG9yIHNlbGVjdGVkIGVsZW1lbnRcblx0Zm9jdXM6ID0+XG5cdFx0cmV0dXJuIGlmIG5vdCBAZW5hYmxlZFxuXG5cdFx0QHVuZm9jdXMoKVxuXG5cdFx0QHNlbGVjdGVkTGF5ZXIgPz0gRnJhbWVyLkRldmljZS5zY3JlZW5cblx0XHRAaG92ZXJlZExheWVyID89IEZyYW1lci5EZXZpY2Uuc2NyZWVuXG5cblx0XHRAc2V0UGFuZWxQcm9wZXJ0aWVzKClcblx0XHRAc2hvd0Rpc3RhbmNlcygpXG5cblx0dW5mb2N1czogKGV2ZW50KSA9PlxuXHRcdHN2Z0NvbnRleHQucmVtb3ZlQWxsKClcblxuXG4jIGtpY2tvZmZcblxucGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxucGFuZWwuaWQgPSAncENvbnRhaW5lcidcbnZpZXdDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZyYW1lckNvbnRleHRSb290LURlZmF1bHQnKVxuVXRpbHMuZGVsYXkgMCwgPT4gdmlld0MuYXBwZW5kQ2hpbGQocGFuZWwpXG5cbnNlY3JldEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjcmV0Qm94KVxuXG5cbnN2Z0NvbnRleHQgPSBuZXcgU1ZHQ29udGV4dFxuXG5leHBvcnRzLmdvdGNoYSA9IGdvdGNoYSA9IG5ldyBHb3RjaGFcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQ0FBO0FEYUEsSUFBQSxzT0FBQTtFQUFBOzs7O0FBQUEsVUFBQSxHQUFhLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRWpDLElBQUcsa0JBQUg7RUFDQyxNQUFBLEdBQVMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFRLENBQUEsVUFBQTtFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBdkIsR0FBMEMsTUFBTSxDQUFDO0VBRWpELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxHQUEyQjtFQUMzQixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQXBCLEdBQTZCLE9BTDlCOzs7QUFPQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFw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
