module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	/* globals __VUE_SSR_CONTEXT__ */

	// this module is a runtime utility for cleaner component module output and will
	// be included in the final webpack user bundle

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  injectStyles,
	  scopeId,
	  moduleIdentifier /* server only */
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  var hook
	  if (moduleIdentifier) { // server build
	    hook = function (context) {
	      // 2.3 injection
	      context = context || (this.$vnode && this.$vnode.ssrContext)
	      // 2.2 with runInNewContext: true
	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__
	      }
	      // inject component styles
	      if (injectStyles) {
	        injectStyles.call(this, context)
	      }
	      // register component module identifier for async chunk inferrence
	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier)
	      }
	    }
	    // used by ssr in case component is cached and beforeCreate
	    // never gets called
	    options._ssrRegister = hook
	  } else if (injectStyles) {
	    hook = injectStyles
	  }

	  if (hook) {
	    // inject component registration as beforeCreate hook
	    var existing = options.beforeCreate
	    options.beforeCreate = existing
	      ? [].concat(existing, hook)
	      : [hook]
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _autocomplete = __webpack_require__(7);

	var _autocomplete2 = _interopRequireDefault(_autocomplete);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_autocomplete2.default.install = function (Vue) {
	  Vue.component(_autocomplete2.default.name, _autocomplete2.default);
	};

	exports.default = _autocomplete2.default;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(8),
	  /* template */
	  __webpack_require__(16),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _input = __webpack_require__(9);

	var _input2 = _interopRequireDefault(_input);

	var _autocompleteSuggestions = __webpack_require__(10);

	var _autocompleteSuggestions2 = _interopRequireDefault(_autocompleteSuggestions);

	var _emitter = __webpack_require__(13);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'ElAutocomplete',

	  mixins: [_emitter2.default],

	  componentName: 'ElAutocomplete',

	  components: {
	    ElInput: _input2.default,
	    ElAutocompleteSuggestions: _autocompleteSuggestions2.default
	  },

	  props: {
	    props: {
	      type: Object,
	      default: function _default() {
	        return {
	          label: 'value',
	          value: 'value'
	        };
	      }
	    },
	    popperClass: String,
	    placeholder: String,
	    disabled: Boolean,
	    name: String,
	    size: String,
	    value: String,
	    autofocus: Boolean,
	    fetchSuggestions: Function,
	    triggerOnFocus: {
	      type: Boolean,
	      default: true
	    },
	    customItem: String,
	    icon: String,
	    onIconClick: Function
	  },
	  data: function data() {
	    return {
	      isFocus: false,
	      isOnComposition: false,
	      suggestions: [],
	      loading: false,
	      highlightedIndex: -1
	    };
	  },

	  computed: {
	    suggestionVisible: function suggestionVisible() {
	      var suggestions = this.suggestions;
	      var isValidData = Array.isArray(suggestions) && suggestions.length > 0;
	      return (isValidData || this.loading) && this.isFocus;
	    }
	  },
	  watch: {
	    suggestionVisible: function suggestionVisible(val) {
	      this.broadcast('ElAutocompleteSuggestions', 'visible', [val, this.$refs.input.$refs.input.offsetWidth]);
	    }
	  },
	  methods: {
	    getData: function getData(queryString) {
	      var _this = this;

	      this.loading = true;
	      this.fetchSuggestions(queryString, function (suggestions) {
	        _this.loading = false;
	        if (Array.isArray(suggestions)) {
	          _this.suggestions = suggestions;
	        } else {
	          console.error('autocomplete suggestions must be an array');
	        }
	      });
	    },
	    handleComposition: function handleComposition(event) {
	      if (event.type === 'compositionend') {
	        this.isOnComposition = false;
	        this.handleChange(this.value);
	      } else {
	        this.isOnComposition = true;
	      }
	    },
	    handleChange: function handleChange(value) {
	      this.$emit('input', value);
	      if (this.isOnComposition || !this.triggerOnFocus && !value) {
	        this.suggestions = [];
	        return;
	      }
	      this.getData(value);
	    },
	    handleFocus: function handleFocus() {
	      this.isFocus = true;
	      if (this.triggerOnFocus) {
	        this.getData(this.value);
	      }
	    },
	    handleBlur: function handleBlur() {
	      var _this2 = this;

	      // ?????? blur ????????????????????? select ????????????
	      setTimeout(function (_) {
	        _this2.isFocus = false;
	      }, 100);
	    },
	    handleKeyEnter: function handleKeyEnter() {
	      if (this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length) {
	        this.select(this.suggestions[this.highlightedIndex]);
	      }
	    },
	    select: function select(item) {
	      var _this3 = this;

	      this.$emit('input', item[this.props.value]);
	      this.$emit('select', item);
	      this.$nextTick(function (_) {
	        _this3.suggestions = [];
	      });
	    },
	    highlight: function highlight(index) {
	      if (!this.suggestionVisible || this.loading) {
	        return;
	      }
	      if (index < 0) index = 0;
	      if (index >= this.suggestions.length) {
	        index = this.suggestions.length - 1;
	      }
	      var suggestion = this.$refs.suggestions.$el.querySelector('.el-autocomplete-suggestion__wrap');
	      var suggestionList = suggestion.querySelectorAll('.el-autocomplete-suggestion__list li');

	      var highlightItem = suggestionList[index];
	      var scrollTop = suggestion.scrollTop;
	      var offsetTop = highlightItem.offsetTop;

	      if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
	        suggestion.scrollTop += highlightItem.scrollHeight;
	      }
	      if (offsetTop < scrollTop) {
	        suggestion.scrollTop -= highlightItem.scrollHeight;
	      }

	      this.highlightedIndex = index;
	    }
	  },
	  mounted: function mounted() {
	    var _this4 = this;

	    this.$on('item-click', function (item) {
	      _this4.select(item);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.$refs.suggestions.$destroy();
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/input");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(11),
	  /* template */
	  __webpack_require__(15),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vuePopper = __webpack_require__(12);

	var _vuePopper2 = _interopRequireDefault(_vuePopper);

	var _emitter = __webpack_require__(13);

	var _emitter2 = _interopRequireDefault(_emitter);

	var _scrollbar = __webpack_require__(14);

	var _scrollbar2 = _interopRequireDefault(_scrollbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: { ElScrollbar: _scrollbar2.default },
	  mixins: [_vuePopper2.default, _emitter2.default],

	  componentName: 'ElAutocompleteSuggestions',

	  data: function data() {
	    return {
	      parent: this.$parent,
	      dropdownWidth: ''
	    };
	  },


	  props: {
	    props: Object,
	    suggestions: Array,
	    options: {
	      default: function _default() {
	        return {
	          forceAbsolute: true,
	          gpuAcceleration: false
	        };
	      }
	    }
	  },

	  methods: {
	    select: function select(item) {
	      this.dispatch('ElAutocomplete', 'item-click', item);
	    }
	  },

	  updated: function updated() {
	    var _this = this;

	    this.$nextTick(function (_) {
	      _this.updatePopper();
	    });
	  },
	  mounted: function mounted() {
	    this.popperElm = this.$el;
	    this.referenceElm = this.$parent.$refs.input.$refs.input;
	  },
	  created: function created() {
	    var _this2 = this;

	    this.$on('visible', function (val, inputWidth) {
	      _this2.dropdownWidth = inputWidth + 'px';
	      _this2.showPopper = val;
	    });
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/utils/vue-popper");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/mixins/emitter");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/scrollbar");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "el-zoom-in-top"
	    },
	    on: {
	      "after-leave": _vm.doDestroy
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.showPopper),
	      expression: "showPopper"
	    }],
	    staticClass: "el-autocomplete-suggestion",
	    class: {
	      'is-loading': _vm.parent.loading
	    },
	    style: ({
	      width: _vm.dropdownWidth
	    })
	  }, [_c('el-scrollbar', {
	    attrs: {
	      "tag": "ul",
	      "wrap-class": "el-autocomplete-suggestion__wrap",
	      "view-class": "el-autocomplete-suggestion__list"
	    }
	  }, [(_vm.parent.loading) ? _c('li', [_c('i', {
	    staticClass: "el-icon-loading"
	  })]) : _vm._l((_vm.suggestions), function(item, index) {
	    return [(!_vm.parent.customItem) ? _c('li', {
	      class: {
	        'highlighted': _vm.parent.highlightedIndex === index
	      },
	      on: {
	        "click": function($event) {
	          _vm.select(item)
	        }
	      }
	    }, [_vm._v("\n          " + _vm._s(item[_vm.props.label]) + "\n        ")]) : _c(_vm.parent.customItem, {
	      tag: "component",
	      class: {
	        'highlighted': _vm.parent.highlightedIndex === index
	      },
	      attrs: {
	        "item": item,
	        "index": index
	      },
	      on: {
	        "click": function($event) {
	          _vm.select(item)
	        }
	      }
	    })]
	  })], 2)], 1)])
	},staticRenderFns: []}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "el-autocomplete"
	  }, [_c('el-input', {
	    ref: "input",
	    attrs: {
	      "value": _vm.value,
	      "disabled": _vm.disabled,
	      "placeholder": _vm.placeholder,
	      "name": _vm.name,
	      "size": _vm.size,
	      "icon": _vm.icon,
	      "on-icon-click": _vm.onIconClick
	    },
	    on: {
	      "change": _vm.handleChange,
	      "focus": _vm.handleFocus,
	      "blur": _vm.handleBlur
	    },
	    nativeOn: {
	      "compositionstart": function($event) {
	        _vm.handleComposition($event)
	      },
	      "compositionupdate": function($event) {
	        _vm.handleComposition($event)
	      },
	      "compositionend": function($event) {
	        _vm.handleComposition($event)
	      },
	      "keydown": [function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
	        $event.preventDefault();
	        _vm.highlight(_vm.highlightedIndex - 1)
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
	        $event.preventDefault();
	        _vm.highlight(_vm.highlightedIndex + 1)
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        $event.preventDefault();
	        _vm.handleKeyEnter($event)
	      }]
	    }
	  }, [(_vm.$slots.prepend) ? _c('template', {
	    slot: "prepend"
	  }, [_vm._t("prepend")], 2) : _vm._e(), (_vm.$slots.append) ? _c('template', {
	    slot: "append"
	  }, [_vm._t("append")], 2) : _vm._e()], 2), _c('el-autocomplete-suggestions', {
	    ref: "suggestions",
	    class: [_vm.popperClass ? _vm.popperClass : ''],
	    attrs: {
	      "props": _vm.props,
	      "suggestions": _vm.suggestions
	    }
	  })], 1)
	},staticRenderFns: []}

/***/ }
/******/ ]);