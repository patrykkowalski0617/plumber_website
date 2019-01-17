// Babel copiler
"use strict";

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Collapser = function Collapser(btn) {
  _classCallCheck(this, Collapser);

  var tt = this;

  tt.qA = function(selector) {
    var origin =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : document;
    return origin.querySelectorAll(selector);
  };
  tt.q = function(selector) {
    var origin =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : document;
    return origin.querySelector(selector);
  };
  tt.btn = tt.qA(btn);
  tt.findCollContentFromThis = function(el) {
    var contentClass = ".coll-content-wrapper",
      wrapper = function wrapper() {
        return el.classList.contains("coll-wrapper");
      },
      btn = function btn() {
        var classL = el.classList;
        for (var i = 0; i < classL.length; i++) {
          if (
            classL.item(i).includes("coll-btn") ||
            classL.item(i).includes("acc-btn") ||
            classL.item(i).includes("nav-btn")
          ) {
            return el;
          }
        }
      };

    if (wrapper()) {
      return tt.q(contentClass, el);
    } else if (btn()) {
      return tt.q(contentClass, el.parentElement);
    }
  };
  tt.wrappers = function() {
    var children = tt.btn;
    var wrappers = [];
    for (var i = 0; i < children.length; i++) {
      wrappers.push(children[i].parentElement);
    }
    return wrappers;
  };
  tt.addListener = function(el, eventType, f) {
    for (var i = 0; i < el.length; i++) {
      el[i].addEventListener(eventType, f);
    }
  };
  (tt.getElProperty = {
    height: function height(el) {
      var getAbsoluteH =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : true;

      if (getAbsoluteH) {
        el.classList.add("before-collapsing");
      }
      var elementHeight = el.offsetHeight;
      if (getAbsoluteH) {
        el.classList.remove("before-collapsing");
      }
      return elementHeight;
    },
    transitionTime: function transitionTime(el) {
      var st = window.getComputedStyle(el, null);
      return parseFloat(st.getPropertyValue("transition-duration")) * 1000;
    }
  }),
    (tt.collapsing = {
      timeoutAddHeight: null,
      timeoutRemoveHeight: null,
      removeCollapsing: function removeCollapsing(el, method) {
        var time = tt.getElProperty.transitionTime(el);
        this.timeoutRemoveHeight = setTimeout(function() {
          el.classList.remove("collapsing");
          el.classList[method]("displayed");
          el.style.height = "";
        }, time);
      },
      addCollapsing: function addCollapsing(el, height, method) {
        el.classList.add("collapsing");
        this.timeoutAddHeight = setTimeout(function() {
          el.style.height = height + "px";
        }, 0);

        this.removeCollapsing(el, method);
      }
    });
  tt.elConstHeight = [];
  tt.display = function(t) {
    var content = tt.findCollContentFromThis(t),
      fromHiddenState = function fromHiddenState() {
        tt.elConstHeight = [];
        tt.elConstHeight.push(tt.getElProperty.height(content));
        tt.collapsing.addCollapsing(content, tt.elConstHeight[0], "add");
      },
      fromCollapsingState = function fromCollapsingState() {
        clearTimeout(tt.collapsing.timeoutRemoveHeight);
        tt.collapsing.addCollapsing(content, tt.elConstHeight[0], "add");
      };
    if (!content.classList.contains("displayed")) {
      if (!content.classList.contains("collapsing")) {
        fromHiddenState();
      } else {
        fromCollapsingState();
      }
    } else {
      // dbl check / prevent lags with removing class displayed
      var _t = void 0;
      clearTimeout(_t);
      _t = setTimeout(function() {
        if (!content.classList.contains("displayed")) {
          fromHiddenState();
        }
      }, 400);
    }
  };
  tt.hide = {
    specifiedContent: function specifiedContent(t, onDisplayedOnly, content) {
      var height = tt.getElProperty.height(content, false);
      if (!onDisplayedOnly && !tt.q(".displayed", t)) {
        clearTimeout(tt.collapsing.timeoutRemoveHeight);
      }
      content.style.height = height + "px";
      tt.collapsing.addCollapsing(content, 0, "remove");
    },
    currentContent: function currentContent(t) {
      var onDisplayedOnly =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : false;

      var content = tt.findCollContentFromThis(t);
      this.specifiedContent(t, onDisplayedOnly, content);
    },
    nastedContent: function nastedContent(t) {
      var onDisplayedOnly =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : false;

      var content = tt.q(".coll-nasted .displayed", t.parentElement);
      if (content) {
        this.specifiedContent(t, onDisplayedOnly, content);
      }
    }
  };
  tt.toggle = function(t) {
    var content = tt.findCollContentFromThis(t);

    if (
      !content.classList.contains("displayed") &&
      !content.classList.contains("collapsing")
    ) {
      tt.display(t);
    } else if (!content.classList.contains("collapsing")) {
      tt.hide.nastedContent(t, true);

      setTimeout(function() {
        tt.hide.currentContent(t, true);
      }, 0);
    }
  };
};

var CollapserHover = (function(_Collapser) {
  _inherits(CollapserHover, _Collapser);

  function CollapserHover(btn) {
    _classCallCheck(this, CollapserHover);

    var _this = _possibleConstructorReturn(
      this,
      (CollapserHover.__proto__ || Object.getPrototypeOf(CollapserHover)).call(
        this,
        btn
      )
    );

    var tt = _this;

    tt.addListener(tt.btn, "mouseenter", function() {
      tt.display(this);
    });
    tt.addListener(tt.wrappers(), "mouseleave", function() {
      tt.hide.currentContent(this);
    });
    tt.addListener(tt.btn, "touchend", function() {
      tt.toggle(this);
    });
    return _this;
  }

  return CollapserHover;
})(Collapser);

var CollapserClick = (function(_Collapser2) {
  _inherits(CollapserClick, _Collapser2);

  function CollapserClick(btn) {
    _classCallCheck(this, CollapserClick);

    var _this2 = _possibleConstructorReturn(
      this,
      (CollapserClick.__proto__ || Object.getPrototypeOf(CollapserClick)).call(
        this,
        btn
      )
    );

    var tt = _this2;

    tt.addListener(tt.btn, "click", function() {
      tt.toggle(this);
    });
    return _this2;
  }

  return CollapserClick;
})(Collapser);

var Accordion = (function(_Collapser3) {
  _inherits(Accordion, _Collapser3);

  function Accordion(btn) {
    _classCallCheck(this, Accordion);

    var _this3 = _possibleConstructorReturn(
      this,
      (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, btn)
    );

    var tt = _this3;

    tt.displayOne = function(t) {
      var content = tt.findCollContentFromThis(t);
      if (
        !content.classList.contains("displayed") &&
        !content.classList.contains("collapsing")
      ) {
        var _content = tt.q(".displayed", t.parentElement.parentElement),
          collapsingContent = Array.from(
            tt.qA(".collapsing", t.parentElement.parentElement)
          );

        if (!collapsingContent.length) {
          tt.display(t);
        }

        tt.hide.specifiedContent(t, true, _content);
      }
    };
    return _this3;
  }

  return Accordion;
})(Collapser);

var AccordionHover = (function(_Accordion) {
  _inherits(AccordionHover, _Accordion);

  function AccordionHover(btn) {
    _classCallCheck(this, AccordionHover);

    var _this4 = _possibleConstructorReturn(
      this,
      (AccordionHover.__proto__ || Object.getPrototypeOf(AccordionHover)).call(
        this,
        btn
      )
    );

    var tt = _this4;

    tt.addListener(tt.btn, "mouseenter", function() {
      tt.displayOne(this);
    });

    return _this4;
  }

  return AccordionHover;
})(Accordion);

var AccordionClick = (function(_Accordion2) {
  _inherits(AccordionClick, _Accordion2);

  function AccordionClick(btn) {
    _classCallCheck(this, AccordionClick);

    var _this5 = _possibleConstructorReturn(
      this,
      (AccordionClick.__proto__ || Object.getPrototypeOf(AccordionClick)).call(
        this,
        btn
      )
    );

    var tt = _this5;

    tt.addListener(tt.btn, "click", function() {
      tt.displayOne(this);
    });
    return _this5;
  }

  return AccordionClick;
})(Accordion);

var Navigation = (function(_Collapser4) {
  _inherits(Navigation, _Collapser4);

  function Navigation(btn) {
    _classCallCheck(this, Navigation);

    var _this6 = _possibleConstructorReturn(
      this,
      (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(
        this,
        btn
      )
    );

    var tt = _this6,
      pageWidth = function pageWidth() {
        return window.innerWidth;
      },
      breakPoint = 1024;

    tt.addListener(tt.btn, "mouseenter", function() {
      if (pageWidth() >= breakPoint) {
        tt.display(this);
      }
    });
    tt.addListener(tt.wrappers(), "mouseleave", function() {
      if (pageWidth() >= breakPoint && this.classList.contains('coll-nasted')) {
        tt.hide.currentContent(this);
      }
    });
    tt.addListener(tt.btn, "click", function() {
      if (pageWidth() < breakPoint) {
        tt.toggle(this);
      }
    });
    return _this6;
  }

  return Navigation;
})(Collapser);

var collapserHover = new CollapserHover(".coll-btn-hover"),
  collapserClick = new CollapserClick(".coll-btn-click"),
  accordionHover = new AccordionHover(".acc-btn-hover"),
  accordionClick = new AccordionClick(".acc-btn-click"),
  navigation = new Navigation(".nav-btn");