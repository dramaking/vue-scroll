const _ = require('lodash')
const Vue = require('vue')
const dom = require('./domEvent')

const vuescroll = new Object;

vuescroll.install = function (Vue, options) {

  options = options || {};
  const SCROLL = 'scroll';

  Vue.directive(SCROLL, {

    bind: function(el, binding, vnode, oldVnode) {
      let fn, opt = options;

      fn = binding.value;

      if (binding.arg) {
        fn = binding.value.fn;
        let arg = binding.arg;
        if (arg === 'throttle') {
          opt = { throttle:  binding.value.throttle}
        } else if(arg === 'debounce') {
          opt = { debounce:  binding.value.debounce}
        } else {
          fn = fn || binding.value;
        }
      }

      dom.bind(el, SCROLL, fn, opt);
    },

    inserted: function(el, binding) {
        //To do, check whether element is scrollable and give warn message when not
    },

    update: function(el, binding) {
      if (binding.value === binding.oldValue) {
        return;
      }
     
      let fn, fnOld, opt = options;

      fn = binding.value;
      fnOld = binding.oldValue;

      if (binding.arg) {
        fn = binding.value.fn;
        fnOld = binding.oldValue.fn;
        
        let arg = binding.arg;
        if (arg === 'throttle') {
          opt = { throttle:  binding.value.throttle}
        } else if(arg === 'debounce') {
          opt = { debounce:  binding.value.debounce}
        } else {
          fn = fn || binding.value;
          fnOld = fnOld || binding.oldValue;
        }
      }

      dom.bind(el, SCROLL, fn, opt);
      dom.unbind(el, SCROLL, fnOld);
    },

    unbind: function(el, binding) {
      let fn, fnOld, opt = null;
      if (binding.value && binding.value.fn && binding.oldValue && binding.oldValue.fn) {
        fn = _.isFunction(binding.value) ? binding.value : binding.value.fn;
        fnOld = _.isFunction(binding.oldValue) ? binding.oldValue : binding.oldValue.fn;
      }
      dom.unbind(el, SCROLL, fn);
      dom.unbind(el, SCROLL, fnOld);
    }

  })

}

module.exports = module.exports = vuescroll;

