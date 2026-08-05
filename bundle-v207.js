(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.js
  var require_react_production = __commonJS({
    "node_modules/react/cjs/react.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
      var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
      var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
      var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
      var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
      var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      var ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function() {
        },
        enqueueReplaceState: function() {
        },
        enqueueSetState: function() {
        }
      };
      var assign = Object.assign;
      var emptyObject = {};
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent;
      assign(pureComponentPrototype, Component.prototype);
      pureComponentPrototype.isPureReactComponent = true;
      var isArrayImpl = Array.isArray;
      function noop() {
      }
      var ReactSharedInternals = { H: null, A: null, T: null, S: null };
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function ReactElement(type, key, props) {
        var refProp = props.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== refProp ? refProp : null,
          props
        };
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        return ReactElement(oldElement.type, newKey, oldElement.props);
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      var userProvidedKeyEscapeRegex = /\/+/g;
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback)
          return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + invokeCallback
          )), array.push(callback)), 1;
        invokeCallback = 0;
        var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ctor = payload._result;
          ctor = ctor();
          ctor.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status)
                payload._status = 1, payload._result = moduleObject;
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status)
                payload._status = 2, payload._result = error;
            }
          );
          -1 === payload._status && (payload._status = 0, payload._result = ctor);
        }
        if (1 === payload._status) return payload._result.default;
        throw payload._result;
      }
      var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
      var Children = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = Children;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(size) {
          return ReactSharedInternals.H.useMemoCache(size);
        }
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key;
        if (null != config)
          for (propName in void 0 !== config.key && (key = "" + config.key), config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          for (var childArray = Array(propName), i = 0; i < propName; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, props);
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        var propName, props = {}, key = null;
        if (null != config)
          for (propName in void 0 !== config.key && (key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) props.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === props[propName] && (props[propName] = childrenLength[propName]);
        return ReactElement(type, key, props);
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(render) {
        return { $$typeof: REACT_FORWARD_REF_TYPE, render };
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        return {
          $$typeof: REACT_LAZY_TYPE,
          _payload: { _status: -1, _result: ctor },
          _init: lazyInitializer
        };
      };
      exports.memo = function(type, compare) {
        return {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return ReactSharedInternals.H.useCacheRefresh();
      };
      exports.use = function(usable) {
        return ReactSharedInternals.H.use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useActionState(action, initialState, permalink);
      };
      exports.useCallback = function(callback, deps) {
        return ReactSharedInternals.H.useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        return ReactSharedInternals.H.useContext(Context);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(value, initialValue) {
        return ReactSharedInternals.H.useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        return ReactSharedInternals.H.useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return ReactSharedInternals.H.useEffectEvent(callback);
      };
      exports.useId = function() {
        return ReactSharedInternals.H.useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        return ReactSharedInternals.H.useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        return ReactSharedInternals.H.useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return ReactSharedInternals.H.useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return ReactSharedInternals.H.useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return ReactSharedInternals.H.useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return ReactSharedInternals.H.useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return ReactSharedInternals.H.useTransition();
      };
      exports.version = "19.2.7";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.js
  var require_scheduler_production = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.js"(exports) {
      "use strict";
      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for (; 0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else break a;
        }
      }
      function peek(heap) {
        return 0 === heap.length ? null : heap[0];
      }
      function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
          heap[0] = last;
          a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else break a;
          }
        }
        return first;
      }
      function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
      }
      exports.unstable_now = void 0;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        localPerformance = performance;
        exports.unstable_now = function() {
          return localPerformance.now();
        };
      } else {
        localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
          return localDate.now() - initialTime;
        };
      }
      var localPerformance;
      var localDate;
      var initialTime;
      var taskQueue = [];
      var timerQueue = [];
      var taskIdCounter = 1;
      var currentTask = null;
      var currentPriorityLevel = 3;
      var isPerformingWork = false;
      var isHostCallbackScheduled = false;
      var isHostTimeoutScheduled = false;
      var needsPaint = false;
      var localSetTimeout = "function" === typeof setTimeout ? setTimeout : null;
      var localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null;
      var localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
      function advanceTimers(currentTime) {
        for (var timer = peek(timerQueue); null !== timer; ) {
          if (null === timer.callback) pop(timerQueue);
          else if (timer.startTime <= currentTime)
            pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
          else break;
          timer = peek(timerQueue);
        }
      }
      function handleTimeout(currentTime) {
        isHostTimeoutScheduled = false;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled)
          if (null !== peek(taskQueue))
            isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
          else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }
      }
      var isMessageLoopRunning = false;
      var taskTimeoutID = -1;
      var frameInterval = 5;
      var startTime = -1;
      function shouldYieldToHost() {
        return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
      }
      function performWorkUntilDeadline() {
        needsPaint = false;
        if (isMessageLoopRunning) {
          var currentTime = exports.unstable_now();
          startTime = currentTime;
          var hasMoreWork = true;
          try {
            a: {
              isHostCallbackScheduled = false;
              isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
              isPerformingWork = true;
              var previousPriorityLevel = currentPriorityLevel;
              try {
                b: {
                  advanceTimers(currentTime);
                  for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                    var callback = currentTask.callback;
                    if ("function" === typeof callback) {
                      currentTask.callback = null;
                      currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(
                        currentTask.expirationTime <= currentTime
                      );
                      currentTime = exports.unstable_now();
                      if ("function" === typeof continuationCallback) {
                        currentTask.callback = continuationCallback;
                        advanceTimers(currentTime);
                        hasMoreWork = true;
                        break b;
                      }
                      currentTask === peek(taskQueue) && pop(taskQueue);
                      advanceTimers(currentTime);
                    } else pop(taskQueue);
                    currentTask = peek(taskQueue);
                  }
                  if (null !== currentTask) hasMoreWork = true;
                  else {
                    var firstTimer = peek(timerQueue);
                    null !== firstTimer && requestHostTimeout(
                      handleTimeout,
                      firstTimer.startTime - currentTime
                    );
                    hasMoreWork = false;
                  }
                }
                break a;
              } finally {
                currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
              }
              hasMoreWork = void 0;
            }
          } finally {
            hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
          }
        }
      }
      var schedulePerformWorkUntilDeadline;
      if ("function" === typeof localSetImmediate)
        schedulePerformWorkUntilDeadline = function() {
          localSetImmediate(performWorkUntilDeadline);
        };
      else if ("undefined" !== typeof MessageChannel) {
        channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
          port.postMessage(null);
        };
      } else
        schedulePerformWorkUntilDeadline = function() {
          localSetTimeout(performWorkUntilDeadline, 0);
        };
      var channel;
      var port;
      function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
          callback(exports.unstable_now());
        }, ms);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(task) {
        task.callback = null;
      };
      exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
      };
      exports.unstable_next = function(eventHandler) {
        switch (currentPriorityLevel) {
          case 1:
          case 2:
          case 3:
            var priorityLevel = 3;
            break;
          default:
            priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_requestPaint = function() {
        needsPaint = true;
      };
      exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch (priorityLevel) {
          case 1:
            var timeout = -1;
            break;
          case 2:
            timeout = 250;
            break;
          case 5:
            timeout = 1073741823;
            break;
          case 4:
            timeout = 1e4;
            break;
          default:
            timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
          id: taskIdCounter++,
          callback,
          priorityLevel,
          startTime: options,
          expirationTime: timeout,
          sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
      };
      exports.unstable_shouldYield = shouldYieldToHost;
      exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.js
  var require_react_dom_production = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.js"(exports) {
      "use strict";
      var React3 = require_react();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i = 2; i < arguments.length; i++)
            url += "&args[]=" + encodeURIComponent(arguments[i]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function noop() {
      }
      var Internals = {
        d: {
          f: noop,
          r: function() {
            throw Error(formatProdErrorMessage(522));
          },
          D: noop,
          C: noop,
          L: noop,
          m: noop,
          X: noop,
          S: noop,
          M: noop
        },
        p: 0,
        findDOMNode: null
      };
      var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
      function createPortal$1(children, containerInfo, implementation) {
        var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return {
          $$typeof: REACT_PORTAL_TYPE,
          key: null == key ? null : "" + key,
          children,
          containerInfo,
          implementation
        };
      }
      var ReactSharedInternals = React3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      function getCrossOriginStringAs(as, input) {
        if ("font" === as) return "";
        if ("string" === typeof input)
          return "use-credentials" === input ? input : "";
      }
      exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
      exports.createPortal = function(children, container) {
        var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
          throw Error(formatProdErrorMessage(299));
        return createPortal$1(children, container, null, key);
      };
      exports.flushSync = function(fn) {
        var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
        try {
          if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
        } finally {
          ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
        }
      };
      exports.preconnect = function(href, options) {
        "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
      };
      exports.prefetchDNS = function(href) {
        "string" === typeof href && Internals.d.D(href);
      };
      exports.preinit = function(href, options) {
        if ("string" === typeof href && options && "string" === typeof options.as) {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
          "style" === as ? Internals.d.S(
            href,
            "string" === typeof options.precedence ? options.precedence : void 0,
            {
              crossOrigin,
              integrity,
              fetchPriority
            }
          ) : "script" === as && Internals.d.X(href, {
            crossOrigin,
            integrity,
            fetchPriority,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0
          });
        }
      };
      exports.preinitModule = function(href, options) {
        if ("string" === typeof href)
          if ("object" === typeof options && null !== options) {
            if (null == options.as || "script" === options.as) {
              var crossOrigin = getCrossOriginStringAs(
                options.as,
                options.crossOrigin
              );
              Internals.d.M(href, {
                crossOrigin,
                integrity: "string" === typeof options.integrity ? options.integrity : void 0,
                nonce: "string" === typeof options.nonce ? options.nonce : void 0
              });
            }
          } else null == options && Internals.d.M(href);
      };
      exports.preload = function(href, options) {
        if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
          var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
          Internals.d.L(href, as, {
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            type: "string" === typeof options.type ? options.type : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
            referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
            imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
            imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
            media: "string" === typeof options.media ? options.media : void 0
          });
        }
      };
      exports.preloadModule = function(href, options) {
        if ("string" === typeof href)
          if (options) {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.m(href, {
              as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0
            });
          } else Internals.d.m(href);
      };
      exports.requestFormReset = function(form) {
        Internals.d.r(form);
      };
      exports.unstable_batchedUpdates = function(fn, a) {
        return fn(a);
      };
      exports.useFormState = function(action, initialState, permalink) {
        return ReactSharedInternals.H.useFormState(action, initialState, permalink);
      };
      exports.useFormStatus = function() {
        return ReactSharedInternals.H.useHostTransitionStatus();
      };
      exports.version = "19.2.7";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom-client.production.js
  var require_react_dom_client_production = __commonJS({
    "node_modules/react-dom/cjs/react-dom-client.production.js"(exports) {
      "use strict";
      var Scheduler = require_scheduler();
      var React3 = require_react();
      var ReactDOM = require_react_dom();
      function formatProdErrorMessage(code) {
        var url = "https://react.dev/errors/" + code;
        if (1 < arguments.length) {
          url += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var i = 2; i < arguments.length; i++)
            url += "&args[]=" + encodeURIComponent(arguments[i]);
        }
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      function isValidContainer(node) {
        return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
      }
      function getNearestMountedFiber(fiber) {
        var node = fiber, nearestMounted = fiber;
        if (fiber.alternate) for (; node.return; ) node = node.return;
        else {
          fiber = node;
          do
            node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
          while (fiber);
        }
        return 3 === node.tag ? nearestMounted : null;
      }
      function getSuspenseInstanceFromFiber(fiber) {
        if (13 === fiber.tag) {
          var suspenseState = fiber.memoizedState;
          null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
          if (null !== suspenseState) return suspenseState.dehydrated;
        }
        return null;
      }
      function getActivityInstanceFromFiber(fiber) {
        if (31 === fiber.tag) {
          var activityState = fiber.memoizedState;
          null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
          if (null !== activityState) return activityState.dehydrated;
        }
        return null;
      }
      function assertIsMounted(fiber) {
        if (getNearestMountedFiber(fiber) !== fiber)
          throw Error(formatProdErrorMessage(188));
      }
      function findCurrentFiberUsingSlowPath(fiber) {
        var alternate = fiber.alternate;
        if (!alternate) {
          alternate = getNearestMountedFiber(fiber);
          if (null === alternate) throw Error(formatProdErrorMessage(188));
          return alternate !== fiber ? null : fiber;
        }
        for (var a = fiber, b = alternate; ; ) {
          var parentA = a.return;
          if (null === parentA) break;
          var parentB = parentA.alternate;
          if (null === parentB) {
            b = parentA.return;
            if (null !== b) {
              a = b;
              continue;
            }
            break;
          }
          if (parentA.child === parentB.child) {
            for (parentB = parentA.child; parentB; ) {
              if (parentB === a) return assertIsMounted(parentA), fiber;
              if (parentB === b) return assertIsMounted(parentA), alternate;
              parentB = parentB.sibling;
            }
            throw Error(formatProdErrorMessage(188));
          }
          if (a.return !== b.return) a = parentA, b = parentB;
          else {
            for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
              if (child$0 === a) {
                didFindChild = true;
                a = parentA;
                b = parentB;
                break;
              }
              if (child$0 === b) {
                didFindChild = true;
                b = parentA;
                a = parentB;
                break;
              }
              child$0 = child$0.sibling;
            }
            if (!didFindChild) {
              for (child$0 = parentB.child; child$0; ) {
                if (child$0 === a) {
                  didFindChild = true;
                  a = parentB;
                  b = parentA;
                  break;
                }
                if (child$0 === b) {
                  didFindChild = true;
                  b = parentB;
                  a = parentA;
                  break;
                }
                child$0 = child$0.sibling;
              }
              if (!didFindChild) throw Error(formatProdErrorMessage(189));
            }
          }
          if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
        }
        if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
        return a.stateNode.current === a ? fiber : alternate;
      }
      function findCurrentHostFiberImpl(node) {
        var tag = node.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
        for (node = node.child; null !== node; ) {
          tag = findCurrentHostFiberImpl(node);
          if (null !== tag) return tag;
          node = node.sibling;
        }
        return null;
      }
      var assign = Object.assign;
      var REACT_LEGACY_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element");
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
      var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
      var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
      var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
      var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
      var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
      var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch (type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      var isArrayImpl = Array.isArray;
      var ReactSharedInternals = React3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      var sharedNotPendingObject = {
        pending: false,
        data: null,
        method: null,
        action: null
      };
      var valueStack = [];
      var index = -1;
      function createCursor(defaultValue) {
        return { current: defaultValue };
      }
      function pop(cursor) {
        0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
      }
      function push(cursor, value) {
        index++;
        valueStack[index] = cursor.current;
        cursor.current = value;
      }
      var contextStackCursor = createCursor(null);
      var contextFiberStackCursor = createCursor(null);
      var rootInstanceStackCursor = createCursor(null);
      var hostTransitionProviderCursor = createCursor(null);
      function pushHostContainer(fiber, nextRootInstance) {
        push(rootInstanceStackCursor, nextRootInstance);
        push(contextFiberStackCursor, fiber);
        push(contextStackCursor, null);
        switch (nextRootInstance.nodeType) {
          case 9:
          case 11:
            fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
            break;
          default:
            if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
              nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
            else
              switch (fiber) {
                case "svg":
                  fiber = 1;
                  break;
                case "math":
                  fiber = 2;
                  break;
                default:
                  fiber = 0;
              }
        }
        pop(contextStackCursor);
        push(contextStackCursor, fiber);
      }
      function popHostContainer() {
        pop(contextStackCursor);
        pop(contextFiberStackCursor);
        pop(rootInstanceStackCursor);
      }
      function pushHostContext(fiber) {
        null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
        var context = contextStackCursor.current;
        var JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
        context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
      }
      function popHostContext(fiber) {
        contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
        hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
      }
      var prefix;
      var suffix;
      function describeBuiltInComponentFrame(name) {
        if (void 0 === prefix)
          try {
            throw Error();
          } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || "";
            suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return "\n" + prefix + name + suffix;
      }
      var reentry = false;
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) return "";
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          var RunInRootFrame = {
            DetermineComponentFrameRoot: function() {
              try {
                if (construct) {
                  var Fake = function() {
                    throw Error();
                  };
                  Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  });
                  if ("object" === typeof Reflect && Reflect.construct) {
                    try {
                      Reflect.construct(Fake, []);
                    } catch (x) {
                      var control = x;
                    }
                    Reflect.construct(fn, [], Fake);
                  } else {
                    try {
                      Fake.call();
                    } catch (x$1) {
                      control = x$1;
                    }
                    fn.call(Fake.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (x$2) {
                    control = x$2;
                  }
                  (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                  });
                }
              } catch (sample) {
                if (sample && control && "string" === typeof sample.stack)
                  return [sample.stack, control.stack];
              }
              return [null, null];
            }
          };
          RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var namePropDescriptor = Object.getOwnPropertyDescriptor(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name"
          );
          namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
            for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
              RunInRootFrame++;
            for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
              "DetermineComponentFrameRoot"
            ); )
              namePropDescriptor++;
            if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
              for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
                namePropDescriptor--;
            for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
              if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                  do
                    if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                      var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                      fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                      return frame;
                    }
                  while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
                }
                break;
              }
          }
        } finally {
          reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
        }
        return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
      }
      function describeFiber(fiber, childFiber) {
        switch (fiber.tag) {
          case 26:
          case 27:
          case 5:
            return describeBuiltInComponentFrame(fiber.type);
          case 16:
            return describeBuiltInComponentFrame("Lazy");
          case 13:
            return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
          case 19:
            return describeBuiltInComponentFrame("SuspenseList");
          case 0:
          case 15:
            return describeNativeComponentFrame(fiber.type, false);
          case 11:
            return describeNativeComponentFrame(fiber.type.render, false);
          case 1:
            return describeNativeComponentFrame(fiber.type, true);
          case 31:
            return describeBuiltInComponentFrame("Activity");
          default:
            return "";
        }
      }
      function getStackByFiberInDevAndProd(workInProgress2) {
        try {
          var info = "", previous = null;
          do
            info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
          while (workInProgress2);
          return info;
        } catch (x) {
          return "\nError generating stack: " + x.message + "\n" + x.stack;
        }
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var scheduleCallback$3 = Scheduler.unstable_scheduleCallback;
      var cancelCallback$1 = Scheduler.unstable_cancelCallback;
      var shouldYield = Scheduler.unstable_shouldYield;
      var requestPaint = Scheduler.unstable_requestPaint;
      var now = Scheduler.unstable_now;
      var getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
      var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
      var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
      var NormalPriority$1 = Scheduler.unstable_NormalPriority;
      var LowPriority = Scheduler.unstable_LowPriority;
      var IdlePriority = Scheduler.unstable_IdlePriority;
      var log$1 = Scheduler.log;
      var unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
      var rendererID = null;
      var injectedHook = null;
      function setIsStrictModeForDevtools(newIsStrictMode) {
        "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
        if (injectedHook && "function" === typeof injectedHook.setStrictMode)
          try {
            injectedHook.setStrictMode(rendererID, newIsStrictMode);
          } catch (err) {
          }
      }
      var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
      var log = Math.log;
      var LN2 = Math.LN2;
      function clz32Fallback(x) {
        x >>>= 0;
        return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
      }
      var nextTransitionUpdateLane = 256;
      var nextTransitionDeferredLane = 262144;
      var nextRetryLane = 4194304;
      function getHighestPriorityLanes(lanes) {
        var pendingSyncLanes = lanes & 42;
        if (0 !== pendingSyncLanes) return pendingSyncLanes;
        switch (lanes & -lanes) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
            return 64;
          case 128:
            return 128;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
            return lanes & 261888;
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return lanes & 3932160;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return lanes & 62914560;
          case 67108864:
            return 67108864;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 0;
          default:
            return lanes;
        }
      }
      function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
        var pendingLanes = root2.pendingLanes;
        if (0 === pendingLanes) return 0;
        var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
        root2 = root2.warmLanes;
        var nonIdlePendingLanes = pendingLanes & 134217727;
        0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
        return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
      }
      function checkIfRootIsPrerendering(root2, renderLanes2) {
        return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
      }
      function computeExpirationTime(lane, currentTime) {
        switch (lane) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return currentTime + 250;
          case 16:
          case 32:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return currentTime + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return -1;
          case 67108864:
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function claimNextRetryLane() {
        var lane = nextRetryLane;
        nextRetryLane <<= 1;
        0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
        return lane;
      }
      function createLaneMap(initial) {
        for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
        return laneMap;
      }
      function markRootUpdated$1(root2, updateLane) {
        root2.pendingLanes |= updateLane;
        268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
      }
      function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
        var previouslyPendingLanes = root2.pendingLanes;
        root2.pendingLanes = remainingLanes;
        root2.suspendedLanes = 0;
        root2.pingedLanes = 0;
        root2.warmLanes = 0;
        root2.expiredLanes &= remainingLanes;
        root2.entangledLanes &= remainingLanes;
        root2.errorRecoveryDisabledLanes &= remainingLanes;
        root2.shellSuspendCounter = 0;
        var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
        for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
          var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
          entanglements[index$7] = 0;
          expirationTimes[index$7] = -1;
          var hiddenUpdatesForLane = hiddenUpdates[index$7];
          if (null !== hiddenUpdatesForLane)
            for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
              var update = hiddenUpdatesForLane[index$7];
              null !== update && (update.lane &= -536870913);
            }
          remainingLanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
        0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
      }
      function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
        root2.pendingLanes |= spawnedLane;
        root2.suspendedLanes &= ~spawnedLane;
        var spawnedLaneIndex = 31 - clz32(spawnedLane);
        root2.entangledLanes |= spawnedLane;
        root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
      }
      function markRootEntangled(root2, entangledLanes) {
        var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
        for (root2 = root2.entanglements; rootEntangledLanes; ) {
          var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
          lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
          rootEntangledLanes &= ~lane;
        }
      }
      function getBumpedLaneForHydration(root2, renderLanes2) {
        var renderLane = renderLanes2 & -renderLanes2;
        renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
        return 0 !== (renderLane & (root2.suspendedLanes | renderLanes2)) ? 0 : renderLane;
      }
      function getBumpedLaneForHydrationByLane(lane) {
        switch (lane) {
          case 2:
            lane = 1;
            break;
          case 8:
            lane = 4;
            break;
          case 32:
            lane = 16;
            break;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            lane = 128;
            break;
          case 268435456:
            lane = 134217728;
            break;
          default:
            lane = 0;
        }
        return lane;
      }
      function lanesToEventPriority(lanes) {
        lanes &= -lanes;
        return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
      }
      function resolveUpdatePriority() {
        var updatePriority = ReactDOMSharedInternals.p;
        if (0 !== updatePriority) return updatePriority;
        updatePriority = window.event;
        return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
      }
      function runWithPriority(priority, fn) {
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          return ReactDOMSharedInternals.p = priority, fn();
        } finally {
          ReactDOMSharedInternals.p = previousPriority;
        }
      }
      var randomKey = Math.random().toString(36).slice(2);
      var internalInstanceKey = "__reactFiber$" + randomKey;
      var internalPropsKey = "__reactProps$" + randomKey;
      var internalContainerInstanceKey = "__reactContainer$" + randomKey;
      var internalEventHandlersKey = "__reactEvents$" + randomKey;
      var internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
      var internalEventHandlesSetKey = "__reactHandles$" + randomKey;
      var internalRootNodeResourcesKey = "__reactResources$" + randomKey;
      var internalHoistableMarker = "__reactMarker$" + randomKey;
      function detachDeletedInstance(node) {
        delete node[internalInstanceKey];
        delete node[internalPropsKey];
        delete node[internalEventHandlersKey];
        delete node[internalEventHandlerListenersKey];
        delete node[internalEventHandlesSetKey];
      }
      function getClosestInstanceFromNode(targetNode) {
        var targetInst = targetNode[internalInstanceKey];
        if (targetInst) return targetInst;
        for (var parentNode = targetNode.parentNode; parentNode; ) {
          if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
            parentNode = targetInst.alternate;
            if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
              for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
                if (parentNode = targetNode[internalInstanceKey]) return parentNode;
                targetNode = getParentHydrationBoundary(targetNode);
              }
            return targetInst;
          }
          targetNode = parentNode;
          parentNode = targetNode.parentNode;
        }
        return null;
      }
      function getInstanceFromNode(node) {
        if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
          var tag = node.tag;
          if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
            return node;
        }
        return null;
      }
      function getNodeFromInstance(inst) {
        var tag = inst.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
        throw Error(formatProdErrorMessage(33));
      }
      function getResourcesFromRoot(root2) {
        var resources = root2[internalRootNodeResourcesKey];
        resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
        return resources;
      }
      function markNodeAsHoistable(node) {
        node[internalHoistableMarker] = true;
      }
      var allNativeEvents = /* @__PURE__ */ new Set();
      var registrationNameDependencies = {};
      function registerTwoPhaseEvent(registrationName, dependencies) {
        registerDirectEvent(registrationName, dependencies);
        registerDirectEvent(registrationName + "Capture", dependencies);
      }
      function registerDirectEvent(registrationName, dependencies) {
        registrationNameDependencies[registrationName] = dependencies;
        for (registrationName = 0; registrationName < dependencies.length; registrationName++)
          allNativeEvents.add(dependencies[registrationName]);
      }
      var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      );
      var illegalAttributeNameCache = {};
      var validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
          return true;
        if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
        if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
          return validatedAttributeNameCache[attributeName] = true;
        illegalAttributeNameCache[attributeName] = true;
        return false;
      }
      function setValueForAttribute(node, name, value) {
        if (isAttributeNameSafe(name))
          if (null === value) node.removeAttribute(name);
          else {
            switch (typeof value) {
              case "undefined":
              case "function":
              case "symbol":
                node.removeAttribute(name);
                return;
              case "boolean":
                var prefix$10 = name.toLowerCase().slice(0, 5);
                if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
                  node.removeAttribute(name);
                  return;
                }
            }
            node.setAttribute(name, "" + value);
          }
      }
      function setValueForKnownAttribute(node, name, value) {
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttribute(name, "" + value);
        }
      }
      function setValueForNamespacedAttribute(node, namespace, name, value) {
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          node.setAttributeNS(namespace, name, "" + value);
        }
      }
      function getToStringValue(value) {
        switch (typeof value) {
          case "bigint":
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return value;
          case "object":
            return value;
          default:
            return "";
        }
      }
      function isCheckable(elem) {
        var type = elem.type;
        return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
      }
      function trackValueOnNode(node, valueField, currentValue) {
        var descriptor = Object.getOwnPropertyDescriptor(
          node.constructor.prototype,
          valueField
        );
        if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
          var get = descriptor.get, set = descriptor.set;
          Object.defineProperty(node, valueField, {
            configurable: true,
            get: function() {
              return get.call(this);
            },
            set: function(value) {
              currentValue = "" + value;
              set.call(this, value);
            }
          });
          Object.defineProperty(node, valueField, {
            enumerable: descriptor.enumerable
          });
          return {
            getValue: function() {
              return currentValue;
            },
            setValue: function(value) {
              currentValue = "" + value;
            },
            stopTracking: function() {
              node._valueTracker = null;
              delete node[valueField];
            }
          };
        }
      }
      function track(node) {
        if (!node._valueTracker) {
          var valueField = isCheckable(node) ? "checked" : "value";
          node._valueTracker = trackValueOnNode(
            node,
            valueField,
            "" + node[valueField]
          );
        }
      }
      function updateValueIfChanged(node) {
        if (!node) return false;
        var tracker = node._valueTracker;
        if (!tracker) return true;
        var lastValue = tracker.getValue();
        var value = "";
        node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
        node = value;
        return node !== lastValue ? (tracker.setValue(node), true) : false;
      }
      function getActiveElement(doc) {
        doc = doc || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof doc) return null;
        try {
          return doc.activeElement || doc.body;
        } catch (e) {
          return doc.body;
        }
      }
      var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
      function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
        return value.replace(
          escapeSelectorAttributeValueInsideDoubleQuotesRegex,
          function(ch) {
            return "\\" + ch.charCodeAt(0).toString(16) + " ";
          }
        );
      }
      function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
        element.name = "";
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
        if (null != value)
          if ("number" === type) {
            if (0 === value && "" === element.value || element.value != value)
              element.value = "" + getToStringValue(value);
          } else
            element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
        else
          "submit" !== type && "reset" !== type || element.removeAttribute("value");
        null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
        null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
        null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
      }
      function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
        if (null != value || null != defaultValue) {
          if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
            track(element);
            return;
          }
          defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
          value = null != value ? "" + getToStringValue(value) : defaultValue;
          isHydrating2 || value === element.value || (element.value = value);
          element.defaultValue = value;
        }
        checked = null != checked ? checked : defaultChecked;
        checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
        element.checked = isHydrating2 ? element.checked : !!checked;
        element.defaultChecked = !!checked;
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
        track(element);
      }
      function setDefaultValue(node, type, value) {
        "number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
      }
      function updateOptions(node, multiple, propValue, setDefaultSelected) {
        node = node.options;
        if (multiple) {
          multiple = {};
          for (var i = 0; i < propValue.length; i++)
            multiple["$" + propValue[i]] = true;
          for (propValue = 0; propValue < node.length; propValue++)
            i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
        } else {
          propValue = "" + getToStringValue(propValue);
          multiple = null;
          for (i = 0; i < node.length; i++) {
            if (node[i].value === propValue) {
              node[i].selected = true;
              setDefaultSelected && (node[i].defaultSelected = true);
              return;
            }
            null !== multiple || node[i].disabled || (multiple = node[i]);
          }
          null !== multiple && (multiple.selected = true);
        }
      }
      function updateTextarea(element, value, defaultValue) {
        if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
          element.defaultValue !== value && (element.defaultValue = value);
          return;
        }
        element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      }
      function initTextarea(element, value, defaultValue, children) {
        if (null == value) {
          if (null != children) {
            if (null != defaultValue) throw Error(formatProdErrorMessage(92));
            if (isArrayImpl(children)) {
              if (1 < children.length) throw Error(formatProdErrorMessage(93));
              children = children[0];
            }
            defaultValue = children;
          }
          null == defaultValue && (defaultValue = "");
          value = defaultValue;
        }
        defaultValue = getToStringValue(value);
        element.defaultValue = defaultValue;
        children = element.textContent;
        children === defaultValue && "" !== children && null !== children && (element.value = children);
        track(element);
      }
      function setTextContent(node, text) {
        if (text) {
          var firstChild = node.firstChild;
          if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
            firstChild.nodeValue = text;
            return;
          }
        }
        node.textContent = text;
      }
      var unitlessNumbers = new Set(
        "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
          " "
        )
      );
      function setValueForStyle(style2, styleName, value) {
        var isCustomProperty = 0 === styleName.indexOf("--");
        null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
      }
      function setValueForStyles(node, styles, prevStyles) {
        if (null != styles && "object" !== typeof styles)
          throw Error(formatProdErrorMessage(62));
        node = node.style;
        if (null != prevStyles) {
          for (var styleName in prevStyles)
            !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
          for (var styleName$16 in styles)
            styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
        } else
          for (var styleName$17 in styles)
            styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
      }
      function isCustomElement(tagName) {
        if (-1 === tagName.indexOf("-")) return false;
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var aliases = /* @__PURE__ */ new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]);
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
      function sanitizeURL(url) {
        return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
      }
      function noop$1() {
      }
      var currentReplayingEvent = null;
      function getEventTarget(nativeEvent) {
        nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
        nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
        return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
      }
      var restoreTarget = null;
      var restoreQueue = null;
      function restoreStateOfTarget(target) {
        var internalInstance = getInstanceFromNode(target);
        if (internalInstance && (target = internalInstance.stateNode)) {
          var props = target[internalPropsKey] || null;
          a: switch (target = internalInstance.stateNode, internalInstance.type) {
            case "input":
              updateInput(
                target,
                props.value,
                props.defaultValue,
                props.defaultValue,
                props.checked,
                props.defaultChecked,
                props.type,
                props.name
              );
              internalInstance = props.name;
              if ("radio" === props.type && null != internalInstance) {
                for (props = target; props.parentNode; ) props = props.parentNode;
                props = props.querySelectorAll(
                  'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                    "" + internalInstance
                  ) + '"][type="radio"]'
                );
                for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
                  var otherNode = props[internalInstance];
                  if (otherNode !== target && otherNode.form === target.form) {
                    var otherProps = otherNode[internalPropsKey] || null;
                    if (!otherProps) throw Error(formatProdErrorMessage(90));
                    updateInput(
                      otherNode,
                      otherProps.value,
                      otherProps.defaultValue,
                      otherProps.defaultValue,
                      otherProps.checked,
                      otherProps.defaultChecked,
                      otherProps.type,
                      otherProps.name
                    );
                  }
                }
                for (internalInstance = 0; internalInstance < props.length; internalInstance++)
                  otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
              }
              break a;
            case "textarea":
              updateTextarea(target, props.value, props.defaultValue);
              break a;
            case "select":
              internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
          }
        }
      }
      var isInsideEventHandler = false;
      function batchedUpdates$1(fn, a, b) {
        if (isInsideEventHandler) return fn(a, b);
        isInsideEventHandler = true;
        try {
          var JSCompiler_inline_result = fn(a);
          return JSCompiler_inline_result;
        } finally {
          if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
            if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
              for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
          }
        }
      }
      function getListener(inst, registrationName) {
        var stateNode = inst.stateNode;
        if (null === stateNode) return null;
        var props = stateNode[internalPropsKey] || null;
        if (null === props) return null;
        stateNode = props[registrationName];
        a: switch (registrationName) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
            inst = !props;
            break a;
          default:
            inst = false;
        }
        if (inst) return null;
        if (stateNode && "function" !== typeof stateNode)
          throw Error(
            formatProdErrorMessage(231, registrationName, typeof stateNode)
          );
        return stateNode;
      }
      var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var passiveBrowserEventsSupported = false;
      if (canUseDOM)
        try {
          options = {};
          Object.defineProperty(options, "passive", {
            get: function() {
              passiveBrowserEventsSupported = true;
            }
          });
          window.addEventListener("test", options, options);
          window.removeEventListener("test", options, options);
        } catch (e) {
          passiveBrowserEventsSupported = false;
        }
      var options;
      var root = null;
      var startText = null;
      var fallbackText = null;
      function getData() {
        if (fallbackText) return fallbackText;
        var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
        for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
        var minEnd = startLength - start;
        for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
        return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
      }
      function getEventCharCode(nativeEvent) {
        var keyCode = nativeEvent.keyCode;
        "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
        10 === nativeEvent && (nativeEvent = 13);
        return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
      }
      function functionThatReturnsTrue() {
        return true;
      }
      function functionThatReturnsFalse() {
        return false;
      }
      function createSyntheticEvent(Interface) {
        function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
          this._reactName = reactName;
          this._targetInst = targetInst;
          this.type = reactEventType;
          this.nativeEvent = nativeEvent;
          this.target = nativeEventTarget;
          this.currentTarget = null;
          for (var propName in Interface)
            Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
          this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
          this.isPropagationStopped = functionThatReturnsFalse;
          return this;
        }
        assign(SyntheticBaseEvent.prototype, {
          preventDefault: function() {
            this.defaultPrevented = true;
            var event = this.nativeEvent;
            event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
          },
          stopPropagation: function() {
            var event = this.nativeEvent;
            event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
          },
          persist: function() {
          },
          isPersistent: functionThatReturnsTrue
        });
        return SyntheticBaseEvent;
      }
      var EventInterface = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(event) {
          return event.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
      };
      var SyntheticEvent = createSyntheticEvent(EventInterface);
      var UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 });
      var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
      var lastMovementX;
      var lastMovementY;
      var lastMouseEvent;
      var MouseEventInterface = assign({}, UIEventInterface, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: getEventModifierState,
        button: 0,
        buttons: 0,
        relatedTarget: function(event) {
          return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
        },
        movementX: function(event) {
          if ("movementX" in event) return event.movementX;
          event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
          return lastMovementX;
        },
        movementY: function(event) {
          return "movementY" in event ? event.movementY : lastMovementY;
        }
      });
      var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
      var DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 });
      var SyntheticDragEvent = createSyntheticEvent(DragEventInterface);
      var FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 });
      var SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface);
      var AnimationEventInterface = assign({}, EventInterface, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      });
      var SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface);
      var ClipboardEventInterface = assign({}, EventInterface, {
        clipboardData: function(event) {
          return "clipboardData" in event ? event.clipboardData : window.clipboardData;
        }
      });
      var SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface);
      var CompositionEventInterface = assign({}, EventInterface, { data: 0 });
      var SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface);
      var normalizeKey = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var translateToKey = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var modifierKeyToProp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      };
      function modifierStateGetter(keyArg) {
        var nativeEvent = this.nativeEvent;
        return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
      }
      function getEventModifierState() {
        return modifierStateGetter;
      }
      var KeyboardEventInterface = assign({}, UIEventInterface, {
        key: function(nativeEvent) {
          if (nativeEvent.key) {
            var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if ("Unidentified" !== key) return key;
          }
          return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: getEventModifierState,
        charCode: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : 0;
        },
        keyCode: function(event) {
          return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        },
        which: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        }
      });
      var SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface);
      var PointerEventInterface = assign({}, MouseEventInterface, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      });
      var SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface);
      var TouchEventInterface = assign({}, UIEventInterface, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: getEventModifierState
      });
      var SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface);
      var TransitionEventInterface = assign({}, EventInterface, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      });
      var SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface);
      var WheelEventInterface = assign({}, MouseEventInterface, {
        deltaX: function(event) {
          return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
        },
        deltaY: function(event) {
          return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface);
      var ToggleEventInterface = assign({}, EventInterface, {
        newState: 0,
        oldState: 0
      });
      var SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface);
      var END_KEYCODES = [9, 13, 27, 32];
      var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
      var documentMode = null;
      canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
      var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
      var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode);
      var SPACEBAR_CHAR = String.fromCharCode(32);
      var hasSpaceKeypress = false;
      function isFallbackCompositionEnd(domEventName, nativeEvent) {
        switch (domEventName) {
          case "keyup":
            return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
          case "keydown":
            return 229 !== nativeEvent.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function getDataFromCustomEvent(nativeEvent) {
        nativeEvent = nativeEvent.detail;
        return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
      }
      var isComposing = false;
      function getNativeBeforeInputChars(domEventName, nativeEvent) {
        switch (domEventName) {
          case "compositionend":
            return getDataFromCustomEvent(nativeEvent);
          case "keypress":
            if (32 !== nativeEvent.which) return null;
            hasSpaceKeypress = true;
            return SPACEBAR_CHAR;
          case "textInput":
            return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
          default:
            return null;
        }
      }
      function getFallbackBeforeInputChars(domEventName, nativeEvent) {
        if (isComposing)
          return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
        switch (domEventName) {
          case "paste":
            return null;
          case "keypress":
            if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
              if (nativeEvent.char && 1 < nativeEvent.char.length)
                return nativeEvent.char;
              if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
            }
            return null;
          case "compositionend":
            return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
          default:
            return null;
        }
      }
      var supportedInputTypes = {
        color: true,
        date: true,
        datetime: true,
        "datetime-local": true,
        email: true,
        month: true,
        number: true,
        password: true,
        range: true,
        search: true,
        tel: true,
        text: true,
        time: true,
        url: true,
        week: true
      };
      function isTextInputElement(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
      }
      function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
        restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
        inst = accumulateTwoPhaseListeners(inst, "onChange");
        0 < inst.length && (nativeEvent = new SyntheticEvent(
          "onChange",
          "change",
          null,
          nativeEvent,
          target
        ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
      }
      var activeElement$1 = null;
      var activeElementInst$1 = null;
      function runEventInBatch(dispatchQueue) {
        processDispatchQueue(dispatchQueue, 0);
      }
      function getInstIfValueChanged(targetInst) {
        var targetNode = getNodeFromInstance(targetInst);
        if (updateValueIfChanged(targetNode)) return targetInst;
      }
      function getTargetInstForChangeEvent(domEventName, targetInst) {
        if ("change" === domEventName) return targetInst;
      }
      var isInputEventSupported = false;
      if (canUseDOM) {
        if (canUseDOM) {
          isSupported$jscomp$inline_427 = "oninput" in document;
          if (!isSupported$jscomp$inline_427) {
            element$jscomp$inline_428 = document.createElement("div");
            element$jscomp$inline_428.setAttribute("oninput", "return;");
            isSupported$jscomp$inline_427 = "function" === typeof element$jscomp$inline_428.oninput;
          }
          JSCompiler_inline_result$jscomp$286 = isSupported$jscomp$inline_427;
        } else JSCompiler_inline_result$jscomp$286 = false;
        isInputEventSupported = JSCompiler_inline_result$jscomp$286 && (!document.documentMode || 9 < document.documentMode);
      }
      var JSCompiler_inline_result$jscomp$286;
      var isSupported$jscomp$inline_427;
      var element$jscomp$inline_428;
      function stopWatchingForValueChange() {
        activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
      }
      function handlePropertyChange(nativeEvent) {
        if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
          var dispatchQueue = [];
          createAndAccumulateChangeEvent(
            dispatchQueue,
            activeElementInst$1,
            nativeEvent,
            getEventTarget(nativeEvent)
          );
          batchedUpdates$1(runEventInBatch, dispatchQueue);
        }
      }
      function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
        "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
      }
      function getTargetInstForInputEventPolyfill(domEventName) {
        if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
          return getInstIfValueChanged(activeElementInst$1);
      }
      function getTargetInstForClickEvent(domEventName, targetInst) {
        if ("click" === domEventName) return getInstIfValueChanged(targetInst);
      }
      function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
        if ("input" === domEventName || "change" === domEventName)
          return getInstIfValueChanged(targetInst);
      }
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = "function" === typeof Object.is ? Object.is : is;
      function shallowEqual(objA, objB) {
        if (objectIs(objA, objB)) return true;
        if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
          return false;
        var keysA = Object.keys(objA), keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) return false;
        for (keysB = 0; keysB < keysA.length; keysB++) {
          var currentKey = keysA[keysB];
          if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
            return false;
        }
        return true;
      }
      function getLeafNode(node) {
        for (; node && node.firstChild; ) node = node.firstChild;
        return node;
      }
      function getNodeForCharacterOffset(root2, offset) {
        var node = getLeafNode(root2);
        root2 = 0;
        for (var nodeEnd; node; ) {
          if (3 === node.nodeType) {
            nodeEnd = root2 + node.textContent.length;
            if (root2 <= offset && nodeEnd >= offset)
              return { node, offset: offset - root2 };
            root2 = nodeEnd;
          }
          a: {
            for (; node; ) {
              if (node.nextSibling) {
                node = node.nextSibling;
                break a;
              }
              node = node.parentNode;
            }
            node = void 0;
          }
          node = getLeafNode(node);
        }
      }
      function containsNode(outerNode, innerNode) {
        return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
      }
      function getActiveElementDeep(containerInfo) {
        containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
        for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
          try {
            var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
          } catch (err) {
            JSCompiler_inline_result = false;
          }
          if (JSCompiler_inline_result) containerInfo = element.contentWindow;
          else break;
          element = getActiveElement(containerInfo.document);
        }
        return element;
      }
      function hasSelectionCapabilities(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
      }
      var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode;
      var activeElement = null;
      var activeElementInst = null;
      var lastSelection = null;
      var mouseDown = false;
      function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
        var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
        mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
          anchorNode: doc.anchorNode,
          anchorOffset: doc.anchorOffset,
          focusNode: doc.focusNode,
          focusOffset: doc.focusOffset
        }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
          "onSelect",
          "select",
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
      }
      function makePrefixMap(styleProp, eventName) {
        var prefixes = {};
        prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
        prefixes["Webkit" + styleProp] = "webkit" + eventName;
        prefixes["Moz" + styleProp] = "moz" + eventName;
        return prefixes;
      }
      var vendorPrefixes = {
        animationend: makePrefixMap("Animation", "AnimationEnd"),
        animationiteration: makePrefixMap("Animation", "AnimationIteration"),
        animationstart: makePrefixMap("Animation", "AnimationStart"),
        transitionrun: makePrefixMap("Transition", "TransitionRun"),
        transitionstart: makePrefixMap("Transition", "TransitionStart"),
        transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
        transitionend: makePrefixMap("Transition", "TransitionEnd")
      };
      var prefixedEventNames = {};
      var style = {};
      canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
      function getVendorPrefixedEventName(eventName) {
        if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
        if (!vendorPrefixes[eventName]) return eventName;
        var prefixMap = vendorPrefixes[eventName], styleProp;
        for (styleProp in prefixMap)
          if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
            return prefixedEventNames[eventName] = prefixMap[styleProp];
        return eventName;
      }
      var ANIMATION_END = getVendorPrefixedEventName("animationend");
      var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
      var ANIMATION_START = getVendorPrefixedEventName("animationstart");
      var TRANSITION_RUN = getVendorPrefixedEventName("transitionrun");
      var TRANSITION_START = getVendorPrefixedEventName("transitionstart");
      var TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel");
      var TRANSITION_END = getVendorPrefixedEventName("transitionend");
      var topLevelEventsToReactNames = /* @__PURE__ */ new Map();
      var simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
      simpleEventPluginEvents.push("scrollEnd");
      function registerSimpleEvent(domEventName, reactName) {
        topLevelEventsToReactNames.set(domEventName, reactName);
        registerTwoPhaseEvent(reactName, [domEventName]);
      }
      var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      };
      var concurrentQueues = [];
      var concurrentQueuesIndex = 0;
      var concurrentlyUpdatedLanes = 0;
      function finishQueueingConcurrentUpdates() {
        for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
          var fiber = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var queue = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var update = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var lane = concurrentQueues[i];
          concurrentQueues[i++] = null;
          if (null !== queue && null !== update) {
            var pending = queue.pending;
            null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
            queue.pending = update;
          }
          0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
        }
      }
      function enqueueUpdate$1(fiber, queue, update, lane) {
        concurrentQueues[concurrentQueuesIndex++] = fiber;
        concurrentQueues[concurrentQueuesIndex++] = queue;
        concurrentQueues[concurrentQueuesIndex++] = update;
        concurrentQueues[concurrentQueuesIndex++] = lane;
        concurrentlyUpdatedLanes |= lane;
        fiber.lanes |= lane;
        fiber = fiber.alternate;
        null !== fiber && (fiber.lanes |= lane);
      }
      function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
        enqueueUpdate$1(fiber, queue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function enqueueConcurrentRenderForLane(fiber, lane) {
        enqueueUpdate$1(fiber, null, null, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
        sourceFiber.lanes |= lane;
        var alternate = sourceFiber.alternate;
        null !== alternate && (alternate.lanes |= lane);
        for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
          parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
        return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
      }
      function getRootForUpdatedFiber(sourceFiber) {
        if (50 < nestedUpdateCount)
          throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
        for (var parent = sourceFiber.return; null !== parent; )
          sourceFiber = parent, parent = sourceFiber.return;
        return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
      }
      var emptyContextObject = {};
      function FiberNode(tag, pendingProps, key, mode) {
        this.tag = tag;
        this.key = key;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.refCleanup = this.ref = null;
        this.pendingProps = pendingProps;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = mode;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function createFiberImplClass(tag, pendingProps, key, mode) {
        return new FiberNode(tag, pendingProps, key, mode);
      }
      function shouldConstruct(Component) {
        Component = Component.prototype;
        return !(!Component || !Component.isReactComponent);
      }
      function createWorkInProgress(current, pendingProps) {
        var workInProgress2 = current.alternate;
        null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
          current.tag,
          pendingProps,
          current.key,
          current.mode
        ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
        workInProgress2.flags = current.flags & 65011712;
        workInProgress2.childLanes = current.childLanes;
        workInProgress2.lanes = current.lanes;
        workInProgress2.child = current.child;
        workInProgress2.memoizedProps = current.memoizedProps;
        workInProgress2.memoizedState = current.memoizedState;
        workInProgress2.updateQueue = current.updateQueue;
        pendingProps = current.dependencies;
        workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
        workInProgress2.sibling = current.sibling;
        workInProgress2.index = current.index;
        workInProgress2.ref = current.ref;
        workInProgress2.refCleanup = current.refCleanup;
        return workInProgress2;
      }
      function resetWorkInProgress(workInProgress2, renderLanes2) {
        workInProgress2.flags &= 65011714;
        var current = workInProgress2.alternate;
        null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
          lanes: renderLanes2.lanes,
          firstContext: renderLanes2.firstContext
        });
        return workInProgress2;
      }
      function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
        var fiberTag = 0;
        owner = type;
        if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
        else if ("string" === typeof type)
          fiberTag = isHostHoistableType(
            type,
            pendingProps,
            contextStackCursor.current
          ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
        else
          a: switch (type) {
            case REACT_ACTIVITY_TYPE:
              return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
            case REACT_FRAGMENT_TYPE:
              return createFiberFromFragment(pendingProps.children, mode, lanes, key);
            case REACT_STRICT_MODE_TYPE:
              fiberTag = 8;
              mode |= 24;
              break;
            case REACT_PROFILER_TYPE:
              return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_TYPE:
              return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_LIST_TYPE:
              return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
            default:
              if ("object" === typeof type && null !== type)
                switch (type.$$typeof) {
                  case REACT_CONTEXT_TYPE:
                    fiberTag = 10;
                    break a;
                  case REACT_CONSUMER_TYPE:
                    fiberTag = 9;
                    break a;
                  case REACT_FORWARD_REF_TYPE:
                    fiberTag = 11;
                    break a;
                  case REACT_MEMO_TYPE:
                    fiberTag = 14;
                    break a;
                  case REACT_LAZY_TYPE:
                    fiberTag = 16;
                    owner = null;
                    break a;
                }
              fiberTag = 29;
              pendingProps = Error(
                formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
              );
              owner = null;
          }
        key = createFiberImplClass(fiberTag, pendingProps, key, mode);
        key.elementType = type;
        key.type = owner;
        key.lanes = lanes;
        return key;
      }
      function createFiberFromFragment(elements, mode, lanes, key) {
        elements = createFiberImplClass(7, elements, key, mode);
        elements.lanes = lanes;
        return elements;
      }
      function createFiberFromText(content, mode, lanes) {
        content = createFiberImplClass(6, content, null, mode);
        content.lanes = lanes;
        return content;
      }
      function createFiberFromDehydratedFragment(dehydratedNode) {
        var fiber = createFiberImplClass(18, null, null, 0);
        fiber.stateNode = dehydratedNode;
        return fiber;
      }
      function createFiberFromPortal(portal, mode, lanes) {
        mode = createFiberImplClass(
          4,
          null !== portal.children ? portal.children : [],
          portal.key,
          mode
        );
        mode.lanes = lanes;
        mode.stateNode = {
          containerInfo: portal.containerInfo,
          pendingChildren: null,
          implementation: portal.implementation
        };
        return mode;
      }
      var CapturedStacks = /* @__PURE__ */ new WeakMap();
      function createCapturedValueAtFiber(value, source) {
        if ("object" === typeof value && null !== value) {
          var existing = CapturedStacks.get(value);
          if (void 0 !== existing) return existing;
          source = {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          };
          CapturedStacks.set(value, source);
          return source;
        }
        return {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
      }
      var forkStack = [];
      var forkStackIndex = 0;
      var treeForkProvider = null;
      var treeForkCount = 0;
      var idStack = [];
      var idStackIndex = 0;
      var treeContextProvider = null;
      var treeContextId = 1;
      var treeContextOverflow = "";
      function pushTreeFork(workInProgress2, totalChildren) {
        forkStack[forkStackIndex++] = treeForkCount;
        forkStack[forkStackIndex++] = treeForkProvider;
        treeForkProvider = workInProgress2;
        treeForkCount = totalChildren;
      }
      function pushTreeId(workInProgress2, totalChildren, index2) {
        idStack[idStackIndex++] = treeContextId;
        idStack[idStackIndex++] = treeContextOverflow;
        idStack[idStackIndex++] = treeContextProvider;
        treeContextProvider = workInProgress2;
        var baseIdWithLeadingBit = treeContextId;
        workInProgress2 = treeContextOverflow;
        var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
        baseIdWithLeadingBit &= ~(1 << baseLength);
        index2 += 1;
        var length = 32 - clz32(totalChildren) + baseLength;
        if (30 < length) {
          var numberOfOverflowBits = baseLength - baseLength % 5;
          length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
          baseIdWithLeadingBit >>= numberOfOverflowBits;
          baseLength -= numberOfOverflowBits;
          treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
          treeContextOverflow = length + workInProgress2;
        } else
          treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
      }
      function pushMaterializedTreeId(workInProgress2) {
        null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
      }
      function popTreeContext(workInProgress2) {
        for (; workInProgress2 === treeForkProvider; )
          treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
        for (; workInProgress2 === treeContextProvider; )
          treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
      }
      function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
        idStack[idStackIndex++] = treeContextId;
        idStack[idStackIndex++] = treeContextOverflow;
        idStack[idStackIndex++] = treeContextProvider;
        treeContextId = suspendedContext.id;
        treeContextOverflow = suspendedContext.overflow;
        treeContextProvider = workInProgress2;
      }
      var hydrationParentFiber = null;
      var nextHydratableInstance = null;
      var isHydrating = false;
      var hydrationErrors = null;
      var rootOrSingletonContext = false;
      var HydrationMismatchException = Error(formatProdErrorMessage(519));
      function throwOnHydrationMismatch(fiber) {
        var error = Error(
          formatProdErrorMessage(
            418,
            1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
            ""
          )
        );
        queueHydrationError(createCapturedValueAtFiber(error, fiber));
        throw HydrationMismatchException;
      }
      function prepareToHydrateHostInstance(fiber) {
        var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
        instance[internalInstanceKey] = fiber;
        instance[internalPropsKey] = props;
        switch (type) {
          case "dialog":
            listenToNonDelegatedEvent("cancel", instance);
            listenToNonDelegatedEvent("close", instance);
            break;
          case "iframe":
          case "object":
          case "embed":
            listenToNonDelegatedEvent("load", instance);
            break;
          case "video":
          case "audio":
            for (type = 0; type < mediaEventTypes.length; type++)
              listenToNonDelegatedEvent(mediaEventTypes[type], instance);
            break;
          case "source":
            listenToNonDelegatedEvent("error", instance);
            break;
          case "img":
          case "image":
          case "link":
            listenToNonDelegatedEvent("error", instance);
            listenToNonDelegatedEvent("load", instance);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", instance);
            break;
          case "input":
            listenToNonDelegatedEvent("invalid", instance);
            initInput(
              instance,
              props.value,
              props.defaultValue,
              props.checked,
              props.defaultChecked,
              props.type,
              props.name,
              true
            );
            break;
          case "select":
            listenToNonDelegatedEvent("invalid", instance);
            break;
          case "textarea":
            listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
        }
        type = props.children;
        "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
        instance || throwOnHydrationMismatch(fiber, true);
      }
      function popToNextHostParent(fiber) {
        for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
          switch (hydrationParentFiber.tag) {
            case 5:
            case 31:
            case 13:
              rootOrSingletonContext = false;
              return;
            case 27:
            case 3:
              rootOrSingletonContext = true;
              return;
            default:
              hydrationParentFiber = hydrationParentFiber.return;
          }
      }
      function popHydrationState(fiber) {
        if (fiber !== hydrationParentFiber) return false;
        if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
        var tag = fiber.tag, JSCompiler_temp;
        if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
          if (JSCompiler_temp = 5 === tag)
            JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
          JSCompiler_temp = !JSCompiler_temp;
        }
        JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
        popToNextHostParent(fiber);
        if (13 === tag) {
          fiber = fiber.memoizedState;
          fiber = null !== fiber ? fiber.dehydrated : null;
          if (!fiber) throw Error(formatProdErrorMessage(317));
          nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
        } else if (31 === tag) {
          fiber = fiber.memoizedState;
          fiber = null !== fiber ? fiber.dehydrated : null;
          if (!fiber) throw Error(formatProdErrorMessage(317));
          nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
        } else
          27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
        return true;
      }
      function resetHydrationState() {
        nextHydratableInstance = hydrationParentFiber = null;
        isHydrating = false;
      }
      function upgradeHydrationErrorsToRecoverable() {
        var queuedErrors = hydrationErrors;
        null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
          workInProgressRootRecoverableErrors,
          queuedErrors
        ), hydrationErrors = null);
        return queuedErrors;
      }
      function queueHydrationError(error) {
        null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
      }
      var valueCursor = createCursor(null);
      var currentlyRenderingFiber$1 = null;
      var lastContextDependency = null;
      function pushProvider(providerFiber, context, nextValue) {
        push(valueCursor, context._currentValue);
        context._currentValue = nextValue;
      }
      function popProvider(context) {
        context._currentValue = valueCursor.current;
        pop(valueCursor);
      }
      function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
        for (; null !== parent; ) {
          var alternate = parent.alternate;
          (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
          if (parent === propagationRoot) break;
          parent = parent.return;
        }
      }
      function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
        var fiber = workInProgress2.child;
        null !== fiber && (fiber.return = workInProgress2);
        for (; null !== fiber; ) {
          var list = fiber.dependencies;
          if (null !== list) {
            var nextFiber = fiber.child;
            list = list.firstContext;
            a: for (; null !== list; ) {
              var dependency = list;
              list = fiber;
              for (var i = 0; i < contexts.length; i++)
                if (dependency.context === contexts[i]) {
                  list.lanes |= renderLanes2;
                  dependency = list.alternate;
                  null !== dependency && (dependency.lanes |= renderLanes2);
                  scheduleContextWorkOnParentPath(
                    list.return,
                    renderLanes2,
                    workInProgress2
                  );
                  forcePropagateEntireTree || (nextFiber = null);
                  break a;
                }
              list = dependency.next;
            }
          } else if (18 === fiber.tag) {
            nextFiber = fiber.return;
            if (null === nextFiber) throw Error(formatProdErrorMessage(341));
            nextFiber.lanes |= renderLanes2;
            list = nextFiber.alternate;
            null !== list && (list.lanes |= renderLanes2);
            scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
            nextFiber = null;
          } else nextFiber = fiber.child;
          if (null !== nextFiber) nextFiber.return = fiber;
          else
            for (nextFiber = fiber; null !== nextFiber; ) {
              if (nextFiber === workInProgress2) {
                nextFiber = null;
                break;
              }
              fiber = nextFiber.sibling;
              if (null !== fiber) {
                fiber.return = nextFiber.return;
                nextFiber = fiber;
                break;
              }
              nextFiber = nextFiber.return;
            }
          fiber = nextFiber;
        }
      }
      function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
        current = null;
        for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
          if (!isInsidePropagationBailout) {
            if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
            else if (0 !== (parent.flags & 262144)) break;
          }
          if (10 === parent.tag) {
            var currentParent = parent.alternate;
            if (null === currentParent) throw Error(formatProdErrorMessage(387));
            currentParent = currentParent.memoizedProps;
            if (null !== currentParent) {
              var context = parent.type;
              objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
            }
          } else if (parent === hostTransitionProviderCursor.current) {
            currentParent = parent.alternate;
            if (null === currentParent) throw Error(formatProdErrorMessage(387));
            currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
          }
          parent = parent.return;
        }
        null !== current && propagateContextChanges(
          workInProgress2,
          current,
          renderLanes2,
          forcePropagateEntireTree
        );
        workInProgress2.flags |= 262144;
      }
      function checkIfContextChanged(currentDependencies) {
        for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
          if (!objectIs(
            currentDependencies.context._currentValue,
            currentDependencies.memoizedValue
          ))
            return true;
          currentDependencies = currentDependencies.next;
        }
        return false;
      }
      function prepareToReadContext(workInProgress2) {
        currentlyRenderingFiber$1 = workInProgress2;
        lastContextDependency = null;
        workInProgress2 = workInProgress2.dependencies;
        null !== workInProgress2 && (workInProgress2.firstContext = null);
      }
      function readContext(context) {
        return readContextForConsumer(currentlyRenderingFiber$1, context);
      }
      function readContextDuringReconciliation(consumer, context) {
        null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
        return readContextForConsumer(consumer, context);
      }
      function readContextForConsumer(consumer, context) {
        var value = context._currentValue;
        context = { context, memoizedValue: value, next: null };
        if (null === lastContextDependency) {
          if (null === consumer) throw Error(formatProdErrorMessage(308));
          lastContextDependency = context;
          consumer.dependencies = { lanes: 0, firstContext: context };
          consumer.flags |= 524288;
        } else lastContextDependency = lastContextDependency.next = context;
        return value;
      }
      var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
        var listeners = [], signal = this.signal = {
          aborted: false,
          addEventListener: function(type, listener) {
            listeners.push(listener);
          }
        };
        this.abort = function() {
          signal.aborted = true;
          listeners.forEach(function(listener) {
            return listener();
          });
        };
      };
      var scheduleCallback$2 = Scheduler.unstable_scheduleCallback;
      var NormalPriority = Scheduler.unstable_NormalPriority;
      var CacheContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
      };
      function createCache() {
        return {
          controller: new AbortControllerLocal(),
          data: /* @__PURE__ */ new Map(),
          refCount: 0
        };
      }
      function releaseCache(cache) {
        cache.refCount--;
        0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
          cache.controller.abort();
        });
      }
      var currentEntangledListeners = null;
      var currentEntangledPendingCount = 0;
      var currentEntangledLane = 0;
      var currentEntangledActionThenable = null;
      function entangleAsyncAction(transition, thenable) {
        if (null === currentEntangledListeners) {
          var entangledListeners = currentEntangledListeners = [];
          currentEntangledPendingCount = 0;
          currentEntangledLane = requestTransitionLane();
          currentEntangledActionThenable = {
            status: "pending",
            value: void 0,
            then: function(resolve) {
              entangledListeners.push(resolve);
            }
          };
        }
        currentEntangledPendingCount++;
        thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
        return thenable;
      }
      function pingEngtangledActionScope() {
        if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
          null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
          var listeners = currentEntangledListeners;
          currentEntangledListeners = null;
          currentEntangledLane = 0;
          currentEntangledActionThenable = null;
          for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
        }
      }
      function chainThenableValue(thenable, result) {
        var listeners = [], thenableWithOverride = {
          status: "pending",
          value: null,
          reason: null,
          then: function(resolve) {
            listeners.push(resolve);
          }
        };
        thenable.then(
          function() {
            thenableWithOverride.status = "fulfilled";
            thenableWithOverride.value = result;
            for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
          },
          function(error) {
            thenableWithOverride.status = "rejected";
            thenableWithOverride.reason = error;
            for (error = 0; error < listeners.length; error++)
              (0, listeners[error])(void 0);
          }
        );
        return thenableWithOverride;
      }
      var prevOnStartTransitionFinish = ReactSharedInternals.S;
      ReactSharedInternals.S = function(transition, returnValue) {
        globalMostRecentTransitionTime = now();
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
        null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
      };
      var resumedCache = createCursor(null);
      function peekCacheFromPool() {
        var cacheResumedFromPreviousRender = resumedCache.current;
        return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
      }
      function pushTransition(offscreenWorkInProgress, prevCachePool) {
        null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
      }
      function getSuspendedCache() {
        var cacheFromPool = peekCacheFromPool();
        return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
      }
      var SuspenseException = Error(formatProdErrorMessage(460));
      var SuspenseyCommitException = Error(formatProdErrorMessage(474));
      var SuspenseActionException = Error(formatProdErrorMessage(542));
      var noopSuspenseyCommitThenable = { then: function() {
      } };
      function isThenableResolved(thenable) {
        thenable = thenable.status;
        return "fulfilled" === thenable || "rejected" === thenable;
      }
      function trackUsedThenable(thenableState2, thenable, index2) {
        index2 = thenableState2[index2];
        void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
          default:
            if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
            else {
              thenableState2 = workInProgressRoot;
              if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
                throw Error(formatProdErrorMessage(482));
              thenableState2 = thenable;
              thenableState2.status = "pending";
              thenableState2.then(
                function(fulfilledValue) {
                  if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                  }
                },
                function(error) {
                  if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                  }
                }
              );
            }
            switch (thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
            }
            suspendedThenable = thenable;
            throw SuspenseException;
        }
      }
      function resolveLazy(lazyType) {
        try {
          var init = lazyType._init;
          return init(lazyType._payload);
        } catch (x) {
          if (null !== x && "object" === typeof x && "function" === typeof x.then)
            throw suspendedThenable = x, SuspenseException;
          throw x;
        }
      }
      var suspendedThenable = null;
      function getSuspendedThenable() {
        if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
        var thenable = suspendedThenable;
        suspendedThenable = null;
        return thenable;
      }
      function checkIfUseWrappedInAsyncCatch(rejectedReason) {
        if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
          throw Error(formatProdErrorMessage(483));
      }
      var thenableState$1 = null;
      var thenableIndexCounter$1 = 0;
      function unwrapThenable(thenable) {
        var index2 = thenableIndexCounter$1;
        thenableIndexCounter$1 += 1;
        null === thenableState$1 && (thenableState$1 = []);
        return trackUsedThenable(thenableState$1, thenable, index2);
      }
      function coerceRef(workInProgress2, element) {
        element = element.props.ref;
        workInProgress2.ref = void 0 !== element ? element : null;
      }
      function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
        if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
          throw Error(formatProdErrorMessage(525));
        returnFiber = Object.prototype.toString.call(newChild);
        throw Error(
          formatProdErrorMessage(
            31,
            "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
          )
        );
      }
      function createChildReconciler(shouldTrackSideEffects) {
        function deleteChild(returnFiber, childToDelete) {
          if (shouldTrackSideEffects) {
            var deletions = returnFiber.deletions;
            null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
          }
        }
        function deleteRemainingChildren(returnFiber, currentFirstChild) {
          if (!shouldTrackSideEffects) return null;
          for (; null !== currentFirstChild; )
            deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return null;
        }
        function mapRemainingChildren(currentFirstChild) {
          for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
            null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return existingChildren;
        }
        function useFiber(fiber, pendingProps) {
          fiber = createWorkInProgress(fiber, pendingProps);
          fiber.index = 0;
          fiber.sibling = null;
          return fiber;
        }
        function placeChild(newFiber, lastPlacedIndex, newIndex) {
          newFiber.index = newIndex;
          if (!shouldTrackSideEffects)
            return newFiber.flags |= 1048576, lastPlacedIndex;
          newIndex = newFiber.alternate;
          if (null !== newIndex)
            return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
          newFiber.flags |= 67108866;
          return lastPlacedIndex;
        }
        function placeSingleChild(newFiber) {
          shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
          return newFiber;
        }
        function updateTextNode(returnFiber, current, textContent, lanes) {
          if (null === current || 6 !== current.tag)
            return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
          current = useFiber(current, textContent);
          current.return = returnFiber;
          return current;
        }
        function updateElement(returnFiber, current, element, lanes) {
          var elementType = element.type;
          if (elementType === REACT_FRAGMENT_TYPE)
            return updateFragment(
              returnFiber,
              current,
              element.props.children,
              lanes,
              element.key
            );
          if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
            return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
          current = createFiberFromTypeAndProps(
            element.type,
            element.key,
            element.props,
            null,
            returnFiber.mode,
            lanes
          );
          coerceRef(current, element);
          current.return = returnFiber;
          return current;
        }
        function updatePortal(returnFiber, current, portal, lanes) {
          if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
            return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
          current = useFiber(current, portal.children || []);
          current.return = returnFiber;
          return current;
        }
        function updateFragment(returnFiber, current, fragment, lanes, key) {
          if (null === current || 7 !== current.tag)
            return current = createFiberFromFragment(
              fragment,
              returnFiber.mode,
              lanes,
              key
            ), current.return = returnFiber, current;
          current = useFiber(current, fragment);
          current.return = returnFiber;
          return current;
        }
        function createChild(returnFiber, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return newChild = createFiberFromText(
              "" + newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild;
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return lanes = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  lanes
                ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
              case REACT_PORTAL_TYPE:
                return newChild = createFiberFromPortal(
                  newChild,
                  returnFiber.mode,
                  lanes
                ), newChild.return = returnFiber, newChild;
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return newChild = createFiberFromFragment(
                newChild,
                returnFiber.mode,
                lanes,
                null
              ), newChild.return = returnFiber, newChild;
            if ("function" === typeof newChild.then)
              return createChild(returnFiber, unwrapThenable(newChild), lanes);
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return createChild(
                returnFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function updateSlot(returnFiber, oldFiber, newChild, lanes) {
          var key = null !== oldFiber ? oldFiber.key : null;
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_PORTAL_TYPE:
                return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
            if ("function" === typeof newChild.then)
              return updateSlot(
                returnFiber,
                oldFiber,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateSlot(
                returnFiber,
                oldFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return existingChildren = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
              case REACT_PORTAL_TYPE:
                return existingChildren = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), updateFromMap(
                  existingChildren,
                  returnFiber,
                  newIdx,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
            if ("function" === typeof newChild.then)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return null;
        }
        function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(
              returnFiber,
              oldFiber,
              newChildren[newIdx],
              lanes
            );
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (newIdx === newChildren.length)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; newIdx < newChildren.length; newIdx++)
              oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
                oldFiber,
                currentFirstChild,
                newIdx
              ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
            nextOldFiber = updateFromMap(
              oldFiber,
              returnFiber,
              newIdx,
              newChildren[newIdx],
              lanes
            ), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ), currentFirstChild = placeChild(
              nextOldFiber,
              currentFirstChild,
              newIdx
            ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
          if (null == newChildren) throw Error(formatProdErrorMessage(151));
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (step.done)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; !step.done; newIdx++, step = newChildren.next())
              step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
            step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
          "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                a: {
                  for (var key = newChild.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === key) {
                      key = newChild.type;
                      if (key === REACT_FRAGMENT_TYPE) {
                        if (7 === currentFirstChild.tag) {
                          deleteRemainingChildren(
                            returnFiber,
                            currentFirstChild.sibling
                          );
                          lanes = useFiber(
                            currentFirstChild,
                            newChild.props.children
                          );
                          lanes.return = returnFiber;
                          returnFiber = lanes;
                          break a;
                        }
                      } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(currentFirstChild, newChild.props);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      }
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    } else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                    newChild.props.children,
                    returnFiber.mode,
                    lanes,
                    newChild.key
                  ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                    newChild.type,
                    newChild.key,
                    newChild.props,
                    null,
                    returnFiber.mode,
                    lanes
                  ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
                }
                return placeSingleChild(returnFiber);
              case REACT_PORTAL_TYPE:
                a: {
                  for (key = newChild.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === key)
                      if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(currentFirstChild, newChild.children || []);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      } else {
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      }
                    else deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                }
                return placeSingleChild(returnFiber);
              case REACT_LAZY_TYPE:
                return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                );
            }
            if (isArrayImpl(newChild))
              return reconcileChildrenArray(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            if (getIteratorFn(newChild)) {
              key = getIteratorFn(newChild);
              if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
              newChild = key.call(newChild);
              return reconcileChildrenIterator(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
            }
            if ("function" === typeof newChild.then)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                unwrapThenable(newChild),
                lanes
              );
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectTypeImpl(returnFiber, newChild);
          }
          return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
        }
        return function(returnFiber, currentFirstChild, newChild, lanes) {
          try {
            thenableIndexCounter$1 = 0;
            var firstChildFiber = reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
            thenableState$1 = null;
            return firstChildFiber;
          } catch (x) {
            if (x === SuspenseException || x === SuspenseActionException) throw x;
            var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
            fiber.lanes = lanes;
            fiber.return = returnFiber;
            return fiber;
          } finally {
          }
        };
      }
      var reconcileChildFibers = createChildReconciler(true);
      var mountChildFibers = createChildReconciler(false);
      var hasForceUpdate = false;
      function initializeUpdateQueue(fiber) {
        fiber.updateQueue = {
          baseState: fiber.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, lanes: 0, hiddenCallbacks: null },
          callbacks: null
        };
      }
      function cloneUpdateQueue(current, workInProgress2) {
        current = current.updateQueue;
        workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
          baseState: current.baseState,
          firstBaseUpdate: current.firstBaseUpdate,
          lastBaseUpdate: current.lastBaseUpdate,
          shared: current.shared,
          callbacks: null
        });
      }
      function createUpdate(lane) {
        return { lane, tag: 0, payload: null, callback: null, next: null };
      }
      function enqueueUpdate(fiber, update, lane) {
        var updateQueue = fiber.updateQueue;
        if (null === updateQueue) return null;
        updateQueue = updateQueue.shared;
        if (0 !== (executionContext & 2)) {
          var pending = updateQueue.pending;
          null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
          updateQueue.pending = update;
          update = getRootForUpdatedFiber(fiber);
          markUpdateLaneFromFiberToRoot(fiber, null, lane);
          return update;
        }
        enqueueUpdate$1(fiber, updateQueue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function entangleTransitions(root2, fiber, lane) {
        fiber = fiber.updateQueue;
        if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
          var queueLanes = fiber.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          fiber.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
        var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
        if (null !== current && (current = current.updateQueue, queue === current)) {
          var newFirst = null, newLast = null;
          queue = queue.firstBaseUpdate;
          if (null !== queue) {
            do {
              var clone = {
                lane: queue.lane,
                tag: queue.tag,
                payload: queue.payload,
                callback: null,
                next: null
              };
              null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
              queue = queue.next;
            } while (null !== queue);
            null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
          } else newFirst = newLast = capturedUpdate;
          queue = {
            baseState: current.baseState,
            firstBaseUpdate: newFirst,
            lastBaseUpdate: newLast,
            shared: current.shared,
            callbacks: current.callbacks
          };
          workInProgress2.updateQueue = queue;
          return;
        }
        workInProgress2 = queue.lastBaseUpdate;
        null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
        queue.lastBaseUpdate = capturedUpdate;
      }
      var didReadFromEntangledAsyncAction = false;
      function suspendIfUpdateReadFromEntangledAsyncAction() {
        if (didReadFromEntangledAsyncAction) {
          var entangledActionThenable = currentEntangledActionThenable;
          if (null !== entangledActionThenable) throw entangledActionThenable;
        }
      }
      function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
        didReadFromEntangledAsyncAction = false;
        var queue = workInProgress$jscomp$0.updateQueue;
        hasForceUpdate = false;
        var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
        if (null !== pendingQueue) {
          queue.shared.pending = null;
          var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = null;
          null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
          lastBaseUpdate = lastPendingUpdate;
          var current = workInProgress$jscomp$0.alternate;
          null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
        }
        if (null !== firstBaseUpdate) {
          var newState = queue.baseState;
          lastBaseUpdate = 0;
          current = firstPendingUpdate = lastPendingUpdate = null;
          pendingQueue = firstBaseUpdate;
          do {
            var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
            if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
              0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
              null !== current && (current = current.next = {
                lane: 0,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: null,
                next: null
              });
              a: {
                var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
                updateLane = props;
                var instance = instance$jscomp$0;
                switch (update.tag) {
                  case 1:
                    workInProgress2 = update.payload;
                    if ("function" === typeof workInProgress2) {
                      newState = workInProgress2.call(instance, newState, updateLane);
                      break a;
                    }
                    newState = workInProgress2;
                    break a;
                  case 3:
                    workInProgress2.flags = workInProgress2.flags & -65537 | 128;
                  case 0:
                    workInProgress2 = update.payload;
                    updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                    if (null === updateLane || void 0 === updateLane) break a;
                    newState = assign({}, newState, updateLane);
                    break a;
                  case 2:
                    hasForceUpdate = true;
                }
              }
              updateLane = pendingQueue.callback;
              null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
            } else
              isHiddenUpdate = {
                lane: updateLane,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: pendingQueue.callback,
                next: null
              }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
            pendingQueue = pendingQueue.next;
            if (null === pendingQueue)
              if (pendingQueue = queue.shared.pending, null === pendingQueue)
                break;
              else
                isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
          } while (1);
          null === current && (lastPendingUpdate = newState);
          queue.baseState = lastPendingUpdate;
          queue.firstBaseUpdate = firstPendingUpdate;
          queue.lastBaseUpdate = current;
          null === firstBaseUpdate && (queue.shared.lanes = 0);
          workInProgressRootSkippedLanes |= lastBaseUpdate;
          workInProgress$jscomp$0.lanes = lastBaseUpdate;
          workInProgress$jscomp$0.memoizedState = newState;
        }
      }
      function callCallback(callback, context) {
        if ("function" !== typeof callback)
          throw Error(formatProdErrorMessage(191, callback));
        callback.call(context);
      }
      function commitCallbacks(updateQueue, context) {
        var callbacks = updateQueue.callbacks;
        if (null !== callbacks)
          for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
            callCallback(callbacks[updateQueue], context);
      }
      var currentTreeHiddenStackCursor = createCursor(null);
      var prevEntangledRenderLanesCursor = createCursor(0);
      function pushHiddenContext(fiber, context) {
        fiber = entangledRenderLanes;
        push(prevEntangledRenderLanesCursor, fiber);
        push(currentTreeHiddenStackCursor, context);
        entangledRenderLanes = fiber | context.baseLanes;
      }
      function reuseHiddenContextOnStack() {
        push(prevEntangledRenderLanesCursor, entangledRenderLanes);
        push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
      }
      function popHiddenContext() {
        entangledRenderLanes = prevEntangledRenderLanesCursor.current;
        pop(currentTreeHiddenStackCursor);
        pop(prevEntangledRenderLanesCursor);
      }
      var suspenseHandlerStackCursor = createCursor(null);
      var shellBoundary = null;
      function pushPrimaryTreeSuspenseHandler(handler) {
        var current = handler.alternate;
        push(suspenseStackCursor, suspenseStackCursor.current & 1);
        push(suspenseHandlerStackCursor, handler);
        null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
      }
      function pushDehydratedActivitySuspenseHandler(fiber) {
        push(suspenseStackCursor, suspenseStackCursor.current);
        push(suspenseHandlerStackCursor, fiber);
        null === shellBoundary && (shellBoundary = fiber);
      }
      function pushOffscreenSuspenseHandler(fiber) {
        22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack(fiber);
      }
      function reuseSuspenseHandlerOnStack() {
        push(suspenseStackCursor, suspenseStackCursor.current);
        push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
      }
      function popSuspenseHandler(fiber) {
        pop(suspenseHandlerStackCursor);
        shellBoundary === fiber && (shellBoundary = null);
        pop(suspenseStackCursor);
      }
      var suspenseStackCursor = createCursor(0);
      function findFirstSuspended(row) {
        for (var node = row; null !== node; ) {
          if (13 === node.tag) {
            var state = node.memoizedState;
            if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
              return node;
          } else if (19 === node.tag && ("forwards" === node.memoizedProps.revealOrder || "backwards" === node.memoizedProps.revealOrder || "unstable_legacy-backwards" === node.memoizedProps.revealOrder || "together" === node.memoizedProps.revealOrder)) {
            if (0 !== (node.flags & 128)) return node;
          } else if (null !== node.child) {
            node.child.return = node;
            node = node.child;
            continue;
          }
          if (node === row) break;
          for (; null === node.sibling; ) {
            if (null === node.return || node.return === row) return null;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
        return null;
      }
      var renderLanes = 0;
      var currentlyRenderingFiber = null;
      var currentHook = null;
      var workInProgressHook = null;
      var didScheduleRenderPhaseUpdate = false;
      var didScheduleRenderPhaseUpdateDuringThisPass = false;
      var shouldDoubleInvokeUserFnsInHooksDEV = false;
      var localIdCounter = 0;
      var thenableIndexCounter = 0;
      var thenableState = null;
      var globalClientIdCounter = 0;
      function throwInvalidHookError() {
        throw Error(formatProdErrorMessage(321));
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (null === prevDeps) return false;
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i])) return false;
        return true;
      }
      function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
        renderLanes = nextRenderLanes;
        currentlyRenderingFiber = workInProgress2;
        workInProgress2.memoizedState = null;
        workInProgress2.updateQueue = null;
        workInProgress2.lanes = 0;
        ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
        shouldDoubleInvokeUserFnsInHooksDEV = false;
        nextRenderLanes = Component(props, secondArg);
        shouldDoubleInvokeUserFnsInHooksDEV = false;
        didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
          workInProgress2,
          Component,
          props,
          secondArg
        ));
        finishRenderingHooks(current);
        return nextRenderLanes;
      }
      function finishRenderingHooks(current) {
        ReactSharedInternals.H = ContextOnlyDispatcher;
        var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
        renderLanes = 0;
        workInProgressHook = currentHook = currentlyRenderingFiber = null;
        didScheduleRenderPhaseUpdate = false;
        thenableIndexCounter = 0;
        thenableState = null;
        if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
        null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
      }
      function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
        currentlyRenderingFiber = workInProgress2;
        var numberOfReRenders = 0;
        do {
          didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
          thenableIndexCounter = 0;
          didScheduleRenderPhaseUpdateDuringThisPass = false;
          if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
          numberOfReRenders += 1;
          workInProgressHook = currentHook = null;
          if (null != workInProgress2.updateQueue) {
            var children = workInProgress2.updateQueue;
            children.lastEffect = null;
            children.events = null;
            children.stores = null;
            null != children.memoCache && (children.memoCache.index = 0);
          }
          ReactSharedInternals.H = HooksDispatcherOnRerender;
          children = Component(props, secondArg);
        } while (didScheduleRenderPhaseUpdateDuringThisPass);
        return children;
      }
      function TransitionAwareHostComponent() {
        var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
        maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
        dispatcher = dispatcher.useState()[0];
        (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
        return maybeThenable;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = 0 !== localIdCounter;
        localIdCounter = 0;
        return didRenderIdHook;
      }
      function bailoutHooks(current, workInProgress2, lanes) {
        workInProgress2.updateQueue = current.updateQueue;
        workInProgress2.flags &= -2053;
        current.lanes &= ~lanes;
      }
      function resetHooksOnUnwind(workInProgress2) {
        if (didScheduleRenderPhaseUpdate) {
          for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
            var queue = workInProgress2.queue;
            null !== queue && (queue.pending = null);
            workInProgress2 = workInProgress2.next;
          }
          didScheduleRenderPhaseUpdate = false;
        }
        renderLanes = 0;
        workInProgressHook = currentHook = currentlyRenderingFiber = null;
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        thenableIndexCounter = localIdCounter = 0;
        thenableState = null;
      }
      function mountWorkInProgressHook() {
        var hook = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null
        };
        null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
        return workInProgressHook;
      }
      function updateWorkInProgressHook() {
        if (null === currentHook) {
          var nextCurrentHook = currentlyRenderingFiber.alternate;
          nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
        } else nextCurrentHook = currentHook.next;
        var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
        if (null !== nextWorkInProgressHook)
          workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
        else {
          if (null === nextCurrentHook) {
            if (null === currentlyRenderingFiber.alternate)
              throw Error(formatProdErrorMessage(467));
            throw Error(formatProdErrorMessage(310));
          }
          currentHook = nextCurrentHook;
          nextCurrentHook = {
            memoizedState: currentHook.memoizedState,
            baseState: currentHook.baseState,
            baseQueue: currentHook.baseQueue,
            queue: currentHook.queue,
            next: null
          };
          null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
        }
        return workInProgressHook;
      }
      function createFunctionComponentUpdateQueue() {
        return { lastEffect: null, events: null, stores: null, memoCache: null };
      }
      function useThenable(thenable) {
        var index2 = thenableIndexCounter;
        thenableIndexCounter += 1;
        null === thenableState && (thenableState = []);
        thenable = trackUsedThenable(thenableState, thenable, index2);
        index2 = currentlyRenderingFiber;
        null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
        return thenable;
      }
      function use(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then) return useThenable(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
        }
        throw Error(formatProdErrorMessage(438, String(usable)));
      }
      function useMemoCache(size) {
        var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
        null !== updateQueue && (memoCache = updateQueue.memoCache);
        if (null == memoCache) {
          var current = currentlyRenderingFiber.alternate;
          null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
            data: current.data.map(function(array) {
              return array.slice();
            }),
            index: 0
          })));
        }
        null == memoCache && (memoCache = { data: [], index: 0 });
        null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
        updateQueue.memoCache = memoCache;
        updateQueue = memoCache.data[memoCache.index];
        if (void 0 === updateQueue)
          for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
            updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
        memoCache.index++;
        return updateQueue;
      }
      function basicStateReducer(state, action) {
        return "function" === typeof action ? action(state) : action;
      }
      function updateReducer(reducer) {
        var hook = updateWorkInProgressHook();
        return updateReducerImpl(hook, currentHook, reducer);
      }
      function updateReducerImpl(hook, current, reducer) {
        var queue = hook.queue;
        if (null === queue) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
        if (null !== pendingQueue) {
          if (null !== baseQueue) {
            var baseFirst = baseQueue.next;
            baseQueue.next = pendingQueue.next;
            pendingQueue.next = baseFirst;
          }
          current.baseQueue = baseQueue = pendingQueue;
          queue.pending = null;
        }
        pendingQueue = hook.baseState;
        if (null === baseQueue) hook.memoizedState = pendingQueue;
        else {
          current = baseQueue.next;
          var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$60 = false;
          do {
            var updateLane = update.lane & -536870913;
            if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
              var revertLane = update.revertLane;
              if (0 === revertLane)
                null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
              else if ((renderLanes & revertLane) === revertLane) {
                update = update.next;
                revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
                continue;
              } else
                updateLane = {
                  lane: 0,
                  revertLane: update.revertLane,
                  gesture: null,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
              updateLane = update.action;
              shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
              pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
            } else
              revertLane = {
                lane: updateLane,
                revertLane: update.revertLane,
                gesture: update.gesture,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
            update = update.next;
          } while (null !== update && update !== current);
          null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
          if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$60 && (reducer = currentEntangledActionThenable, null !== reducer)))
            throw reducer;
          hook.memoizedState = pendingQueue;
          hook.baseState = baseFirst;
          hook.baseQueue = newBaseQueueLast;
          queue.lastRenderedState = pendingQueue;
        }
        null === baseQueue && (queue.lanes = 0);
        return [hook.memoizedState, queue.dispatch];
      }
      function rerenderReducer(reducer) {
        var hook = updateWorkInProgressHook(), queue = hook.queue;
        if (null === queue) throw Error(formatProdErrorMessage(311));
        queue.lastRenderedReducer = reducer;
        var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
        if (null !== lastRenderPhaseUpdate) {
          queue.pending = null;
          var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
          do
            newState = reducer(newState, update.action), update = update.next;
          while (update !== lastRenderPhaseUpdate);
          objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
          hook.memoizedState = newState;
          null === hook.baseQueue && (hook.baseState = newState);
          queue.lastRenderedState = newState;
        }
        return [newState, dispatch];
      }
      function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
        if (isHydrating$jscomp$0) {
          if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
          getServerSnapshot = getServerSnapshot();
        } else getServerSnapshot = getSnapshot();
        var snapshotChanged = !objectIs(
          (currentHook || hook).memoizedState,
          getServerSnapshot
        );
        snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
        hook = hook.queue;
        updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
          subscribe
        ]);
        if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
          fiber.flags |= 2048;
          pushSimpleEffect(
            9,
            { destroy: void 0 },
            updateStoreInstance.bind(
              null,
              fiber,
              hook,
              getServerSnapshot,
              getSnapshot
            ),
            null
          );
          if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
          isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        return getServerSnapshot;
      }
      function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
        fiber.flags |= 16384;
        fiber = { getSnapshot, value: renderedSnapshot };
        getSnapshot = currentlyRenderingFiber.updateQueue;
        null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
      }
      function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
        inst.value = nextSnapshot;
        inst.getSnapshot = getSnapshot;
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      }
      function subscribeToStore(fiber, inst, subscribe) {
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
        });
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function forceStoreRerender(fiber) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
      }
      function mountStateImpl(initialState) {
        var hook = mountWorkInProgressHook();
        if ("function" === typeof initialState) {
          var initialStateInitializer = initialState;
          initialState = initialStateInitializer();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              initialStateInitializer();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        }
        hook.memoizedState = hook.baseState = initialState;
        hook.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialState
        };
        return hook;
      }
      function updateOptimisticImpl(hook, current, passthrough, reducer) {
        hook.baseState = passthrough;
        return updateReducerImpl(
          hook,
          currentHook,
          "function" === typeof reducer ? reducer : basicStateReducer
        );
      }
      function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
        if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
        fiber = actionQueue.action;
        if (null !== fiber) {
          var actionNode = {
            payload,
            action: fiber,
            next: null,
            isTransition: true,
            status: "pending",
            value: null,
            reason: null,
            listeners: [],
            then: function(listener) {
              actionNode.listeners.push(listener);
            }
          };
          null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
          setState(actionNode);
          setPendingState = actionQueue.pending;
          null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
        }
      }
      function runActionStateAction(actionQueue, node) {
        var action = node.action, payload = node.payload, prevState = actionQueue.state;
        if (node.isTransition) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            handleActionReturnValue(actionQueue, node, returnValue);
          } catch (error) {
            onActionError(actionQueue, node, error);
          } finally {
            null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
          }
        } else
          try {
            prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
          } catch (error$66) {
            onActionError(actionQueue, node, error$66);
          }
      }
      function handleActionReturnValue(actionQueue, node, returnValue) {
        null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
          function(nextState) {
            onActionSuccess(actionQueue, node, nextState);
          },
          function(error) {
            return onActionError(actionQueue, node, error);
          }
        ) : onActionSuccess(actionQueue, node, returnValue);
      }
      function onActionSuccess(actionQueue, actionNode, nextState) {
        actionNode.status = "fulfilled";
        actionNode.value = nextState;
        notifyActionListeners(actionNode);
        actionQueue.state = nextState;
        actionNode = actionQueue.pending;
        null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
      }
      function onActionError(actionQueue, actionNode, error) {
        var last = actionQueue.pending;
        actionQueue.pending = null;
        if (null !== last) {
          last = last.next;
          do
            actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
          while (actionNode !== last);
        }
        actionQueue.action = null;
      }
      function notifyActionListeners(actionNode) {
        actionNode = actionNode.listeners;
        for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
      }
      function actionStateReducer(oldState, newState) {
        return newState;
      }
      function mountActionState(action, initialStateProp) {
        if (isHydrating) {
          var ssrFormState = workInProgressRoot.formState;
          if (null !== ssrFormState) {
            a: {
              var JSCompiler_inline_result = currentlyRenderingFiber;
              if (isHydrating) {
                if (nextHydratableInstance) {
                  b: {
                    var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                    for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                      if (!inRootOrSingleton) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                      JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                        JSCompiler_inline_result$jscomp$0.nextSibling
                      );
                      if (null === JSCompiler_inline_result$jscomp$0) {
                        JSCompiler_inline_result$jscomp$0 = null;
                        break b;
                      }
                    }
                    inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                    JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
                  }
                  if (JSCompiler_inline_result$jscomp$0) {
                    nextHydratableInstance = getNextHydratable(
                      JSCompiler_inline_result$jscomp$0.nextSibling
                    );
                    JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                    break a;
                  }
                }
                throwOnHydrationMismatch(JSCompiler_inline_result);
              }
              JSCompiler_inline_result = false;
            }
            JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
          }
        }
        ssrFormState = mountWorkInProgressHook();
        ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
        JSCompiler_inline_result = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: actionStateReducer,
          lastRenderedState: initialStateProp
        };
        ssrFormState.queue = JSCompiler_inline_result;
        ssrFormState = dispatchSetState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result
        );
        JSCompiler_inline_result.dispatch = ssrFormState;
        JSCompiler_inline_result = mountStateImpl(false);
        inRootOrSingleton = dispatchOptimisticSetState.bind(
          null,
          currentlyRenderingFiber,
          false,
          JSCompiler_inline_result.queue
        );
        JSCompiler_inline_result = mountWorkInProgressHook();
        JSCompiler_inline_result$jscomp$0 = {
          state: initialStateProp,
          dispatch: null,
          action,
          pending: null
        };
        JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
        ssrFormState = dispatchActionState.bind(
          null,
          currentlyRenderingFiber,
          JSCompiler_inline_result$jscomp$0,
          inRootOrSingleton,
          ssrFormState
        );
        JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
        JSCompiler_inline_result.memoizedState = action;
        return [initialStateProp, ssrFormState, false];
      }
      function updateActionState(action) {
        var stateHook = updateWorkInProgressHook();
        return updateActionStateImpl(stateHook, currentHook, action);
      }
      function updateActionStateImpl(stateHook, currentStateHook, action) {
        currentStateHook = updateReducerImpl(
          stateHook,
          currentStateHook,
          actionStateReducer
        )[0];
        stateHook = updateReducer(basicStateReducer)[0];
        if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
          try {
            var state = useThenable(currentStateHook);
          } catch (x) {
            if (x === SuspenseException) throw SuspenseActionException;
            throw x;
          }
        else state = currentStateHook;
        currentStateHook = updateWorkInProgressHook();
        var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
        action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
          9,
          { destroy: void 0 },
          actionStateActionEffect.bind(null, actionQueue, action),
          null
        ));
        return [state, dispatch, stateHook];
      }
      function actionStateActionEffect(actionQueue, action) {
        actionQueue.action = action;
      }
      function rerenderActionState(action) {
        var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
        if (null !== currentStateHook)
          return updateActionStateImpl(stateHook, currentStateHook, action);
        updateWorkInProgressHook();
        stateHook = stateHook.memoizedState;
        currentStateHook = updateWorkInProgressHook();
        var dispatch = currentStateHook.queue.dispatch;
        currentStateHook.memoizedState = action;
        return [stateHook, dispatch, false];
      }
      function pushSimpleEffect(tag, inst, create, deps) {
        tag = { tag, create, deps, inst, next: null };
        inst = currentlyRenderingFiber.updateQueue;
        null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
        create = inst.lastEffect;
        null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
        return tag;
      }
      function updateRef() {
        return updateWorkInProgressHook().memoizedState;
      }
      function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = mountWorkInProgressHook();
        currentlyRenderingFiber.flags |= fiberFlags;
        hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          { destroy: void 0 },
          create,
          void 0 === deps ? null : deps
        );
      }
      function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var inst = hook.memoizedState.inst;
        null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
          1 | hookFlags,
          inst,
          create,
          deps
        ));
      }
      function mountEffect(create, deps) {
        mountEffectImpl(8390656, 8, create, deps);
      }
      function updateEffect(create, deps) {
        updateEffectImpl(2048, 8, create, deps);
      }
      function useEffectEventImpl(payload) {
        currentlyRenderingFiber.flags |= 4;
        var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
        if (null === componentUpdateQueue)
          componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
        else {
          var events = componentUpdateQueue.events;
          null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
        }
      }
      function updateEvent(callback) {
        var ref = updateWorkInProgressHook().memoizedState;
        useEffectEventImpl({ ref, nextImpl: callback });
        return function() {
          if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
          return ref.impl.apply(void 0, arguments);
        };
      }
      function updateInsertionEffect(create, deps) {
        return updateEffectImpl(4, 2, create, deps);
      }
      function updateLayoutEffect(create, deps) {
        return updateEffectImpl(4, 4, create, deps);
      }
      function imperativeHandleEffect(create, ref) {
        if ("function" === typeof ref) {
          create = create();
          var refCleanup = ref(create);
          return function() {
            "function" === typeof refCleanup ? refCleanup() : ref(null);
          };
        }
        if (null !== ref && void 0 !== ref)
          return create = create(), ref.current = create, function() {
            ref.current = null;
          };
      }
      function updateImperativeHandle(ref, create, deps) {
        deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
        updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
      }
      function mountDebugValue() {
      }
      function updateCallback(callback, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        hook.memoizedState = [callback, deps];
        return callback;
      }
      function updateMemo(nextCreate, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        prevState = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [prevState, deps];
        return prevState;
      }
      function mountDeferredValueImpl(hook, value, initialValue) {
        if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
          return hook.memoizedState = value;
        hook.memoizedState = initialValue;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return initialValue;
      }
      function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
        if (objectIs(value, prevValue)) return value;
        if (null !== currentTreeHiddenStackCursor.current)
          return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
        if (0 === (renderLanes & 42) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
          return didReceiveUpdate = true, hook.memoizedState = value;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return prevValue;
      }
      function startTransition(fiber, queue, pendingState, finishedState, callback) {
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        dispatchOptimisticSetState(fiber, false, queue, pendingState);
        try {
          var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
            var thenableForFinishedState = chainThenableValue(
              returnValue,
              finishedState
            );
            dispatchSetStateInternal(
              fiber,
              queue,
              thenableForFinishedState,
              requestUpdateLane(fiber)
            );
          } else
            dispatchSetStateInternal(
              fiber,
              queue,
              finishedState,
              requestUpdateLane(fiber)
            );
        } catch (error) {
          dispatchSetStateInternal(
            fiber,
            queue,
            { then: function() {
            }, status: "rejected", reason: error },
            requestUpdateLane()
          );
        } finally {
          ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      }
      function noop() {
      }
      function startHostTransition(formFiber, pendingState, action, formData) {
        if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
        var queue = ensureFormComponentIsStateful(formFiber).queue;
        startTransition(
          formFiber,
          queue,
          pendingState,
          sharedNotPendingObject,
          null === action ? noop : function() {
            requestFormReset$1(formFiber);
            return action(formData);
          }
        );
      }
      function ensureFormComponentIsStateful(formFiber) {
        var existingStateHook = formFiber.memoizedState;
        if (null !== existingStateHook) return existingStateHook;
        existingStateHook = {
          memoizedState: sharedNotPendingObject,
          baseState: sharedNotPendingObject,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: sharedNotPendingObject
          },
          next: null
        };
        var initialResetState = {};
        existingStateHook.next = {
          memoizedState: initialResetState,
          baseState: initialResetState,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialResetState
          },
          next: null
        };
        formFiber.memoizedState = existingStateHook;
        formFiber = formFiber.alternate;
        null !== formFiber && (formFiber.memoizedState = existingStateHook);
        return existingStateHook;
      }
      function requestFormReset$1(formFiber) {
        var stateHook = ensureFormComponentIsStateful(formFiber);
        null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
        dispatchSetStateInternal(
          formFiber,
          stateHook.next.queue,
          {},
          requestUpdateLane()
        );
      }
      function useHostTransitionStatus() {
        return readContext(HostTransitionContext);
      }
      function updateId() {
        return updateWorkInProgressHook().memoizedState;
      }
      function updateRefresh() {
        return updateWorkInProgressHook().memoizedState;
      }
      function refreshCache(fiber) {
        for (var provider = fiber.return; null !== provider; ) {
          switch (provider.tag) {
            case 24:
            case 3:
              var lane = requestUpdateLane();
              fiber = createUpdate(lane);
              var root$69 = enqueueUpdate(provider, fiber, lane);
              null !== root$69 && (scheduleUpdateOnFiber(root$69, provider, lane), entangleTransitions(root$69, provider, lane));
              provider = { cache: createCache() };
              fiber.payload = provider;
              return;
          }
          provider = provider.return;
        }
      }
      function dispatchReducerAction(fiber, queue, action) {
        var lane = requestUpdateLane();
        action = {
          lane,
          revertLane: 0,
          gesture: null,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
      }
      function dispatchSetState(fiber, queue, action) {
        var lane = requestUpdateLane();
        dispatchSetStateInternal(fiber, queue, action, lane);
      }
      function dispatchSetStateInternal(fiber, queue, action, lane) {
        var update = {
          lane,
          revertLane: 0,
          gesture: null,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
        else {
          var alternate = fiber.alternate;
          if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
            try {
              var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
              update.hasEagerState = true;
              update.eagerState = eagerState;
              if (objectIs(eagerState, currentState))
                return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
            } catch (error) {
            } finally {
            }
          action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
          if (null !== action)
            return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
        }
        return false;
      }
      function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
        action = {
          lane: 2,
          revertLane: requestTransitionLane(),
          gesture: null,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) {
          if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
        } else
          throwIfDuringRender = enqueueConcurrentHookUpdate(
            fiber,
            queue,
            action,
            2
          ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
      }
      function isRenderPhaseUpdate(fiber) {
        var alternate = fiber.alternate;
        return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
      }
      function enqueueRenderPhaseUpdate(queue, update) {
        didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
        var pending = queue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      function entangleTransitionUpdate(root2, queue, lane) {
        if (0 !== (lane & 4194048)) {
          var queueLanes = queue.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          queue.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      var ContextOnlyDispatcher = {
        readContext,
        use,
        useCallback: throwInvalidHookError,
        useContext: throwInvalidHookError,
        useEffect: throwInvalidHookError,
        useImperativeHandle: throwInvalidHookError,
        useLayoutEffect: throwInvalidHookError,
        useInsertionEffect: throwInvalidHookError,
        useMemo: throwInvalidHookError,
        useReducer: throwInvalidHookError,
        useRef: throwInvalidHookError,
        useState: throwInvalidHookError,
        useDebugValue: throwInvalidHookError,
        useDeferredValue: throwInvalidHookError,
        useTransition: throwInvalidHookError,
        useSyncExternalStore: throwInvalidHookError,
        useId: throwInvalidHookError,
        useHostTransitionStatus: throwInvalidHookError,
        useFormState: throwInvalidHookError,
        useActionState: throwInvalidHookError,
        useOptimistic: throwInvalidHookError,
        useMemoCache: throwInvalidHookError,
        useCacheRefresh: throwInvalidHookError
      };
      ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
      var HooksDispatcherOnMount = {
        readContext,
        use,
        useCallback: function(callback, deps) {
          mountWorkInProgressHook().memoizedState = [
            callback,
            void 0 === deps ? null : deps
          ];
          return callback;
        },
        useContext: readContext,
        useEffect: mountEffect,
        useImperativeHandle: function(ref, create, deps) {
          deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
          mountEffectImpl(
            4194308,
            4,
            imperativeHandleEffect.bind(null, create, ref),
            deps
          );
        },
        useLayoutEffect: function(create, deps) {
          return mountEffectImpl(4194308, 4, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          mountEffectImpl(4, 2, create, deps);
        },
        useMemo: function(nextCreate, deps) {
          var hook = mountWorkInProgressHook();
          deps = void 0 === deps ? null : deps;
          var nextValue = nextCreate();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              nextCreate();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
          hook.memoizedState = [nextValue, deps];
          return nextValue;
        },
        useReducer: function(reducer, initialArg, init) {
          var hook = mountWorkInProgressHook();
          if (void 0 !== init) {
            var initialState = init(initialArg);
            if (shouldDoubleInvokeUserFnsInHooksDEV) {
              setIsStrictModeForDevtools(true);
              try {
                init(initialArg);
              } finally {
                setIsStrictModeForDevtools(false);
              }
            }
          } else initialState = initialArg;
          hook.memoizedState = hook.baseState = initialState;
          reducer = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: reducer,
            lastRenderedState: initialState
          };
          hook.queue = reducer;
          reducer = reducer.dispatch = dispatchReducerAction.bind(
            null,
            currentlyRenderingFiber,
            reducer
          );
          return [hook.memoizedState, reducer];
        },
        useRef: function(initialValue) {
          var hook = mountWorkInProgressHook();
          initialValue = { current: initialValue };
          return hook.memoizedState = initialValue;
        },
        useState: function(initialState) {
          initialState = mountStateImpl(initialState);
          var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
          queue.dispatch = dispatch;
          return [initialState.memoizedState, dispatch];
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = mountWorkInProgressHook();
          return mountDeferredValueImpl(hook, value, initialValue);
        },
        useTransition: function() {
          var stateHook = mountStateImpl(false);
          stateHook = startTransition.bind(
            null,
            currentlyRenderingFiber,
            stateHook.queue,
            true,
            false
          );
          mountWorkInProgressHook().memoizedState = stateHook;
          return [false, stateHook];
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
          if (isHydrating) {
            if (void 0 === getServerSnapshot)
              throw Error(formatProdErrorMessage(407));
            getServerSnapshot = getServerSnapshot();
          } else {
            getServerSnapshot = getSnapshot();
            if (null === workInProgressRoot)
              throw Error(formatProdErrorMessage(349));
            0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
          }
          hook.memoizedState = getServerSnapshot;
          var inst = { value: getServerSnapshot, getSnapshot };
          hook.queue = inst;
          mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
            subscribe
          ]);
          fiber.flags |= 2048;
          pushSimpleEffect(
            9,
            { destroy: void 0 },
            updateStoreInstance.bind(
              null,
              fiber,
              inst,
              getServerSnapshot,
              getSnapshot
            ),
            null
          );
          return getServerSnapshot;
        },
        useId: function() {
          var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
          if (isHydrating) {
            var JSCompiler_inline_result = treeContextOverflow;
            var idWithLeadingBit = treeContextId;
            JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
            identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
            JSCompiler_inline_result = localIdCounter++;
            0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
            identifierPrefix += "_";
          } else
            JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
          return hook.memoizedState = identifierPrefix;
        },
        useHostTransitionStatus,
        useFormState: mountActionState,
        useActionState: mountActionState,
        useOptimistic: function(passthrough) {
          var hook = mountWorkInProgressHook();
          hook.memoizedState = hook.baseState = passthrough;
          var queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null
          };
          hook.queue = queue;
          hook = dispatchOptimisticSetState.bind(
            null,
            currentlyRenderingFiber,
            true,
            queue
          );
          queue.dispatch = hook;
          return [passthrough, hook];
        },
        useMemoCache,
        useCacheRefresh: function() {
          return mountWorkInProgressHook().memoizedState = refreshCache.bind(
            null,
            currentlyRenderingFiber
          );
        },
        useEffectEvent: function(callback) {
          var hook = mountWorkInProgressHook(), ref = { impl: callback };
          hook.memoizedState = ref;
          return function() {
            if (0 !== (executionContext & 2))
              throw Error(formatProdErrorMessage(440));
            return ref.impl.apply(void 0, arguments);
          };
        }
      };
      var HooksDispatcherOnUpdate = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: updateReducer,
        useRef: updateRef,
        useState: function() {
          return updateReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: updateActionState,
        useActionState: updateActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        },
        useMemoCache,
        useCacheRefresh: updateRefresh
      };
      HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
      var HooksDispatcherOnRerender = {
        readContext,
        use,
        useCallback: updateCallback,
        useContext: readContext,
        useEffect: updateEffect,
        useImperativeHandle: updateImperativeHandle,
        useInsertionEffect: updateInsertionEffect,
        useLayoutEffect: updateLayoutEffect,
        useMemo: updateMemo,
        useReducer: rerenderReducer,
        useRef: updateRef,
        useState: function() {
          return rerenderReducer(basicStateReducer);
        },
        useDebugValue: mountDebugValue,
        useDeferredValue: function(value, initialValue) {
          var hook = updateWorkInProgressHook();
          return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
            hook,
            currentHook.memoizedState,
            value,
            initialValue
          );
        },
        useTransition: function() {
          var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
          return [
            "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
            start
          ];
        },
        useSyncExternalStore: updateSyncExternalStore,
        useId: updateId,
        useHostTransitionStatus,
        useFormState: rerenderActionState,
        useActionState: rerenderActionState,
        useOptimistic: function(passthrough, reducer) {
          var hook = updateWorkInProgressHook();
          if (null !== currentHook)
            return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
          hook.baseState = passthrough;
          return [passthrough, hook.queue.dispatch];
        },
        useMemoCache,
        useCacheRefresh: updateRefresh
      };
      HooksDispatcherOnRerender.useEffectEvent = updateEvent;
      function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
        ctor = workInProgress2.memoizedState;
        getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
        getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
        workInProgress2.memoizedState = getDerivedStateFromProps;
        0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
      }
      var classComponentUpdater = {
        enqueueSetState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.payload = payload;
          void 0 !== callback && null !== callback && (update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueReplaceState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 1;
          update.payload = payload;
          void 0 !== callback && null !== callback && (update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
        },
        enqueueForceUpdate: function(inst, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(), update = createUpdate(lane);
          update.tag = 2;
          void 0 !== callback && null !== callback && (update.callback = callback);
          callback = enqueueUpdate(inst, update, lane);
          null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
        }
      };
      function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
        workInProgress2 = workInProgress2.stateNode;
        return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
      }
      function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
        workInProgress2 = instance.state;
        "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
        "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
        instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
      function resolveClassComponentProps(Component, baseProps) {
        var newProps = baseProps;
        if ("ref" in baseProps) {
          newProps = {};
          for (var propName in baseProps)
            "ref" !== propName && (newProps[propName] = baseProps[propName]);
        }
        if (Component = Component.defaultProps) {
          newProps === baseProps && (newProps = assign({}, newProps));
          for (var propName$73 in Component)
            void 0 === newProps[propName$73] && (newProps[propName$73] = Component[propName$73]);
        }
        return newProps;
      }
      function defaultOnUncaughtError(error) {
        reportGlobalError(error);
      }
      function defaultOnCaughtError(error) {
        console.error(error);
      }
      function defaultOnRecoverableError(error) {
        reportGlobalError(error);
      }
      function logUncaughtError(root2, errorInfo) {
        try {
          var onUncaughtError = root2.onUncaughtError;
          onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
        } catch (e$74) {
          setTimeout(function() {
            throw e$74;
          });
        }
      }
      function logCaughtError(root2, boundary, errorInfo) {
        try {
          var onCaughtError = root2.onCaughtError;
          onCaughtError(errorInfo.value, {
            componentStack: errorInfo.stack,
            errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
          });
        } catch (e$75) {
          setTimeout(function() {
            throw e$75;
          });
        }
      }
      function createRootErrorUpdate(root2, errorInfo, lane) {
        lane = createUpdate(lane);
        lane.tag = 3;
        lane.payload = { element: null };
        lane.callback = function() {
          logUncaughtError(root2, errorInfo);
        };
        return lane;
      }
      function createClassErrorUpdate(lane) {
        lane = createUpdate(lane);
        lane.tag = 3;
        return lane;
      }
      function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
        var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
        if ("function" === typeof getDerivedStateFromError) {
          var error = errorInfo.value;
          update.payload = function() {
            return getDerivedStateFromError(error);
          };
          update.callback = function() {
            logCaughtError(root2, fiber, errorInfo);
          };
        }
        var inst = fiber.stateNode;
        null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
          logCaughtError(root2, fiber, errorInfo);
          "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
          var stack = errorInfo.stack;
          this.componentDidCatch(errorInfo.value, {
            componentStack: null !== stack ? stack : ""
          });
        });
      }
      function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
        sourceFiber.flags |= 32768;
        if (null !== value && "object" === typeof value && "function" === typeof value.then) {
          returnFiber = sourceFiber.alternate;
          null !== returnFiber && propagateParentContextChanges(
            returnFiber,
            sourceFiber,
            rootRenderLanes,
            true
          );
          sourceFiber = suspenseHandlerStackCursor.current;
          if (null !== sourceFiber) {
            switch (sourceFiber.tag) {
              case 31:
              case 13:
                return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
              case 22:
                return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: /* @__PURE__ */ new Set([value])
                }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
            }
            throw Error(formatProdErrorMessage(435, sourceFiber.tag));
          }
          attachPingListener(root2, value, rootRenderLanes);
          renderDidSuspendDelayIfPossible();
          return false;
        }
        if (isHydrating)
          return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
            cause: value
          }), queueHydrationError(
            createCapturedValueAtFiber(returnFiber, sourceFiber)
          )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
            root2.stateNode,
            value,
            rootRenderLanes
          ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
        var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
        wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
        null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
        4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
        if (null === returnFiber) return true;
        value = createCapturedValueAtFiber(value, sourceFiber);
        sourceFiber = returnFiber;
        do {
          switch (sourceFiber.tag) {
            case 3:
              return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
            case 1:
              if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
                return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
                  rootRenderLanes,
                  root2,
                  sourceFiber,
                  value
                ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
          }
          sourceFiber = sourceFiber.return;
        } while (null !== sourceFiber);
        return false;
      }
      var SelectiveHydrationException = Error(formatProdErrorMessage(461));
      var didReceiveUpdate = false;
      function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
        workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
          workInProgress2,
          current.child,
          nextChildren,
          renderLanes2
        );
      }
      function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
        Component = Component.render;
        var ref = workInProgress2.ref;
        if ("ref" in nextProps) {
          var propsWithoutRef = {};
          for (var key in nextProps)
            "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
        } else propsWithoutRef = nextProps;
        prepareToReadContext(workInProgress2);
        nextProps = renderWithHooks(
          current,
          workInProgress2,
          Component,
          propsWithoutRef,
          ref,
          renderLanes2
        );
        key = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && key && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (null === current) {
          var type = Component.type;
          if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
            return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
              current,
              workInProgress2,
              type,
              nextProps,
              renderLanes2
            );
          current = createFiberFromTypeAndProps(
            Component.type,
            null,
            nextProps,
            workInProgress2,
            workInProgress2.mode,
            renderLanes2
          );
          current.ref = workInProgress2.ref;
          current.return = workInProgress2;
          return workInProgress2.child = current;
        }
        type = current.child;
        if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
          var prevProps = type.memoizedProps;
          Component = Component.compare;
          Component = null !== Component ? Component : shallowEqual;
          if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
            return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        workInProgress2.flags |= 1;
        current = createWorkInProgress(type, nextProps);
        current.ref = workInProgress2.ref;
        current.return = workInProgress2;
        return workInProgress2.child = current;
      }
      function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        if (null !== current) {
          var prevProps = current.memoizedProps;
          if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
            if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
              0 !== (current.flags & 131072) && (didReceiveUpdate = true);
            else
              return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        return updateFunctionComponent(
          current,
          workInProgress2,
          Component,
          nextProps,
          renderLanes2
        );
      }
      function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
        var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
        null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        });
        if ("hidden" === nextProps.mode) {
          if (0 !== (workInProgress2.flags & 128)) {
            prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
            if (null !== current) {
              nextProps = workInProgress2.child = current.child;
              for (nextChildren = 0; null !== nextProps; )
                nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
              nextProps = nextChildren & ~prevState;
            } else nextProps = 0, workInProgress2.child = null;
            return deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              prevState,
              renderLanes2,
              nextProps
            );
          }
          if (0 !== (renderLanes2 & 536870912))
            workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
              workInProgress2,
              null !== prevState ? prevState.cachePool : null
            ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
          else
            return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
              current,
              workInProgress2,
              null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
              renderLanes2,
              nextProps
            );
        } else
          null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack(workInProgress2));
        reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      function bailoutOffscreenComponent(current, workInProgress2) {
        null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        });
        return workInProgress2.sibling;
      }
      function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
        var JSCompiler_inline_result = peekCacheFromPool();
        JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
        workInProgress2.memoizedState = {
          baseLanes: nextBaseLanes,
          cachePool: JSCompiler_inline_result
        };
        null !== current && pushTransition(workInProgress2, null);
        reuseHiddenContextOnStack();
        pushOffscreenSuspenseHandler(workInProgress2);
        null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
        workInProgress2.childLanes = remainingChildLanes;
        return null;
      }
      function mountActivityChildren(workInProgress2, nextProps) {
        nextProps = mountWorkInProgressOffscreenFiber(
          { mode: nextProps.mode, children: nextProps.children },
          workInProgress2.mode
        );
        nextProps.ref = workInProgress2.ref;
        workInProgress2.child = nextProps;
        nextProps.return = workInProgress2;
        return nextProps;
      }
      function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
        reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
        current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
        current.flags |= 2;
        popSuspenseHandler(workInProgress2);
        workInProgress2.memoizedState = null;
        return current;
      }
      function updateActivityComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
        workInProgress2.flags &= -129;
        if (null === current) {
          if (isHydrating) {
            if ("hidden" === nextProps.mode)
              return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, bailoutOffscreenComponent(null, current);
            pushDehydratedActivitySuspenseHandler(workInProgress2);
            (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
              current,
              rootOrSingletonContext
            ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
              dehydrated: current,
              treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
            if (null === current) throw throwOnHydrationMismatch(workInProgress2);
            workInProgress2.lanes = 536870912;
            return null;
          }
          return mountActivityChildren(workInProgress2, nextProps);
        }
        var prevState = current.memoizedState;
        if (null !== prevState) {
          var dehydrated = prevState.dehydrated;
          pushDehydratedActivitySuspenseHandler(workInProgress2);
          if (didSuspend)
            if (workInProgress2.flags & 256)
              workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
                current,
                workInProgress2,
                renderLanes2
              );
            else if (null !== workInProgress2.memoizedState)
              workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
            else throw Error(formatProdErrorMessage(558));
          else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
            nextProps = workInProgressRoot;
            if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
              throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
            renderDidSuspendDelayIfPossible();
            workInProgress2 = retryActivityComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else
            current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 4096;
          return workInProgress2;
        }
        current = createWorkInProgress(current.child, {
          mode: nextProps.mode,
          children: nextProps.children
        });
        current.ref = workInProgress2.ref;
        workInProgress2.child = current;
        current.return = workInProgress2;
        return current;
      }
      function markRef(current, workInProgress2) {
        var ref = workInProgress2.ref;
        if (null === ref)
          null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
        else {
          if ("function" !== typeof ref && "object" !== typeof ref)
            throw Error(formatProdErrorMessage(284));
          if (null === current || current.ref !== ref)
            workInProgress2.flags |= 4194816;
        }
      }
      function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        prepareToReadContext(workInProgress2);
        Component = renderWithHooks(
          current,
          workInProgress2,
          Component,
          nextProps,
          void 0,
          renderLanes2
        );
        nextProps = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, Component, renderLanes2);
        return workInProgress2.child;
      }
      function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
        prepareToReadContext(workInProgress2);
        workInProgress2.updateQueue = null;
        nextProps = renderWithHooksAgain(
          workInProgress2,
          Component,
          nextProps,
          secondArg
        );
        finishRenderingHooks(current);
        Component = checkDidRenderIdHook();
        if (null !== current && !didReceiveUpdate)
          return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        isHydrating && Component && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
        prepareToReadContext(workInProgress2);
        if (null === workInProgress2.stateNode) {
          var context = emptyContextObject, contextType = Component.contextType;
          "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
          context = new Component(nextProps, context);
          workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
          context.updater = classComponentUpdater;
          workInProgress2.stateNode = context;
          context._reactInternals = workInProgress2;
          context = workInProgress2.stateNode;
          context.props = nextProps;
          context.state = workInProgress2.memoizedState;
          context.refs = {};
          initializeUpdateQueue(workInProgress2);
          contextType = Component.contextType;
          context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
          context.state = workInProgress2.memoizedState;
          contextType = Component.getDerivedStateFromProps;
          "function" === typeof contextType && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            contextType,
            nextProps
          ), context.state = workInProgress2.memoizedState);
          "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
          "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
          nextProps = true;
        } else if (null === current) {
          context = workInProgress2.stateNode;
          var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
          context.props = oldProps;
          var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
          contextType = emptyContextObject;
          "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
          var getDerivedStateFromProps = Component.getDerivedStateFromProps;
          contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
          unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
          contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            contextType
          );
          hasForceUpdate = false;
          var oldState = workInProgress2.memoizedState;
          context.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          oldContext = workInProgress2.memoizedState;
          unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            getDerivedStateFromProps,
            nextProps
          ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
        } else {
          context = workInProgress2.stateNode;
          cloneUpdateQueue(current, workInProgress2);
          contextType = workInProgress2.memoizedProps;
          contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
          context.props = contextType$jscomp$0;
          getDerivedStateFromProps = workInProgress2.pendingProps;
          oldState = context.context;
          oldContext = Component.contextType;
          oldProps = emptyContextObject;
          "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
          unresolvedOldProps = Component.getDerivedStateFromProps;
          (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
            workInProgress2,
            context,
            nextProps,
            oldProps
          );
          hasForceUpdate = false;
          oldState = workInProgress2.memoizedState;
          context.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          var newState = workInProgress2.memoizedState;
          contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            unresolvedOldProps,
            nextProps
          ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            contextType$jscomp$0,
            nextProps,
            oldState,
            newState,
            oldProps
          ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
            nextProps,
            newState,
            oldProps
          )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
        }
        context = nextProps;
        markRef(current, workInProgress2);
        nextProps = 0 !== (workInProgress2.flags & 128);
        context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          current.child,
          null,
          renderLanes2
        ), workInProgress2.child = reconcileChildFibers(
          workInProgress2,
          null,
          Component,
          renderLanes2
        )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
          current,
          workInProgress2,
          renderLanes2
        );
        return current;
      }
      function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
        resetHydrationState();
        workInProgress2.flags |= 256;
        reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      var SUSPENDED_MARKER = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
      };
      function mountSuspenseOffscreenState(renderLanes2) {
        return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
      }
      function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
        current = null !== current ? current.childLanes & ~renderLanes2 : 0;
        primaryTreeDidDefer && (current |= workInProgressDeferredLane);
        return current;
      }
      function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
        (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
        JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
        JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
        workInProgress2.flags &= -33;
        if (null === current) {
          if (isHydrating) {
            showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack(workInProgress2);
            (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
              current,
              rootOrSingletonContext
            ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
              dehydrated: current,
              treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
            if (null === current) throw throwOnHydrationMismatch(workInProgress2);
            isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
            return null;
          }
          var nextPrimaryChildren = nextProps.children;
          nextProps = nextProps.fallback;
          if (showFallback)
            return reuseSuspenseHandlerOnStack(workInProgress2), showFallback = workInProgress2.mode, nextPrimaryChildren = mountWorkInProgressOffscreenFiber(
              { mode: "hidden", children: nextPrimaryChildren },
              showFallback
            ), nextProps = createFiberFromFragment(
              nextProps,
              showFallback,
              renderLanes2,
              null
            ), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextPrimaryChildren.sibling = nextProps, workInProgress2.child = nextPrimaryChildren, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_temp,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          return mountSuspensePrimaryChildren(workInProgress2, nextPrimaryChildren);
        }
        var prevState = current.memoizedState;
        if (null !== prevState && (nextPrimaryChildren = prevState.dehydrated, null !== nextPrimaryChildren)) {
          if (didSuspend)
            workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(workInProgress2), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
              { mode: "visible", children: nextProps.children },
              showFallback
            ), nextPrimaryChildren = createFiberFromFragment(
              nextPrimaryChildren,
              showFallback,
              renderLanes2,
              null
            ), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress2, nextPrimaryChildren.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, reconcileChildFibers(
              workInProgress2,
              current.child,
              null,
              renderLanes2
            ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_temp,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = bailoutOffscreenComponent(null, nextProps));
          else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isSuspenseInstanceFallback(nextPrimaryChildren)) {
            JSCompiler_temp = nextPrimaryChildren.nextSibling && nextPrimaryChildren.nextSibling.dataset;
            if (JSCompiler_temp) var digest = JSCompiler_temp.dgst;
            JSCompiler_temp = digest;
            nextProps = Error(formatProdErrorMessage(419));
            nextProps.stack = "";
            nextProps.digest = JSCompiler_temp;
            queueHydrationError({ value: nextProps, source: null, stack: null });
            workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), JSCompiler_temp = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
            JSCompiler_temp = workInProgressRoot;
            if (null !== JSCompiler_temp && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes2), 0 !== nextProps && nextProps !== prevState.retryLane))
              throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
            isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible();
            workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          } else
            isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress2.flags |= 192, workInProgress2.child = current.child, workInProgress2 = null) : (current = prevState.treeContext, nextHydratableInstance = getNextHydratable(
              nextPrimaryChildren.nextSibling
            ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountSuspensePrimaryChildren(
              workInProgress2,
              nextProps.children
            ), workInProgress2.flags |= 4096);
          return workInProgress2;
        }
        if (showFallback)
          return reuseSuspenseHandlerOnStack(workInProgress2), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, prevState = current.child, digest = prevState.sibling, nextProps = createWorkInProgress(prevState, {
            mode: "hidden",
            children: nextProps.children
          }), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, null !== digest ? nextPrimaryChildren = createWorkInProgress(
            digest,
            nextPrimaryChildren
          ) : (nextPrimaryChildren = createFiberFromFragment(
            nextPrimaryChildren,
            showFallback,
            renderLanes2,
            null
          ), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, nextPrimaryChildren = current.child.memoizedState, null === nextPrimaryChildren ? nextPrimaryChildren = mountSuspenseOffscreenState(renderLanes2) : (showFallback = nextPrimaryChildren.cachePool, null !== showFallback ? (prevState = CacheContext._currentValue, showFallback = showFallback.parent !== prevState ? { parent: prevState, pool: prevState } : showFallback) : showFallback = getSuspendedCache(), nextPrimaryChildren = {
            baseLanes: nextPrimaryChildren.baseLanes | renderLanes2,
            cachePool: showFallback
          }), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = getRemainingWorkInPrimaryTree(
            current,
            JSCompiler_temp,
            renderLanes2
          ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        renderLanes2 = current.child;
        current = renderLanes2.sibling;
        renderLanes2 = createWorkInProgress(renderLanes2, {
          mode: "visible",
          children: nextProps.children
        });
        renderLanes2.return = workInProgress2;
        renderLanes2.sibling = null;
        null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
        workInProgress2.child = renderLanes2;
        workInProgress2.memoizedState = null;
        return renderLanes2;
      }
      function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
        primaryChildren = mountWorkInProgressOffscreenFiber(
          { mode: "visible", children: primaryChildren },
          workInProgress2.mode
        );
        primaryChildren.return = workInProgress2;
        return workInProgress2.child = primaryChildren;
      }
      function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
        offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
        offscreenProps.lanes = 0;
        return offscreenProps;
      }
      function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
        reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
        current = mountSuspensePrimaryChildren(
          workInProgress2,
          workInProgress2.pendingProps.children
        );
        current.flags |= 2;
        workInProgress2.memoizedState = null;
        return current;
      }
      function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
        fiber.lanes |= renderLanes2;
        var alternate = fiber.alternate;
        null !== alternate && (alternate.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
      }
      function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
        var renderState = workInProgress2.memoizedState;
        null === renderState ? workInProgress2.memoizedState = {
          isBackwards,
          rendering: null,
          renderingStartTime: 0,
          last: lastContentRow,
          tail,
          tailMode,
          treeForkCount: treeForkCount2
        } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
      }
      function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
        nextProps = nextProps.children;
        var suspenseContext = suspenseStackCursor.current, shouldForceFallback = 0 !== (suspenseContext & 2);
        shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
        push(suspenseStackCursor, suspenseContext);
        reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        nextProps = isHydrating ? treeForkCount : 0;
        if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
          a: for (current = workInProgress2.child; null !== current; ) {
            if (13 === current.tag)
              null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (19 === current.tag)
              scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (null !== current.child) {
              current.child.return = current;
              current = current.child;
              continue;
            }
            if (current === workInProgress2) break a;
            for (; null === current.sibling; ) {
              if (null === current.return || current.return === workInProgress2)
                break a;
              current = current.return;
            }
            current.sibling.return = current.return;
            current = current.sibling;
          }
        switch (revealOrder) {
          case "forwards":
            renderLanes2 = workInProgress2.child;
            for (revealOrder = null; null !== renderLanes2; )
              current = renderLanes2.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
            renderLanes2 = revealOrder;
            null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
            initSuspenseListRenderState(
              workInProgress2,
              false,
              revealOrder,
              renderLanes2,
              tailMode,
              nextProps
            );
            break;
          case "backwards":
          case "unstable_legacy-backwards":
            renderLanes2 = null;
            revealOrder = workInProgress2.child;
            for (workInProgress2.child = null; null !== revealOrder; ) {
              current = revealOrder.alternate;
              if (null !== current && null === findFirstSuspended(current)) {
                workInProgress2.child = revealOrder;
                break;
              }
              current = revealOrder.sibling;
              revealOrder.sibling = renderLanes2;
              renderLanes2 = revealOrder;
              revealOrder = current;
            }
            initSuspenseListRenderState(
              workInProgress2,
              true,
              renderLanes2,
              null,
              tailMode,
              nextProps
            );
            break;
          case "together":
            initSuspenseListRenderState(
              workInProgress2,
              false,
              null,
              null,
              void 0,
              nextProps
            );
            break;
          default:
            workInProgress2.memoizedState = null;
        }
        return workInProgress2.child;
      }
      function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
        null !== current && (workInProgress2.dependencies = current.dependencies);
        workInProgressRootSkippedLanes |= workInProgress2.lanes;
        if (0 === (renderLanes2 & workInProgress2.childLanes))
          if (null !== current) {
            if (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              false
            ), 0 === (renderLanes2 & workInProgress2.childLanes))
              return null;
          } else return null;
        if (null !== current && workInProgress2.child !== current.child)
          throw Error(formatProdErrorMessage(153));
        if (null !== workInProgress2.child) {
          current = workInProgress2.child;
          renderLanes2 = createWorkInProgress(current, current.pendingProps);
          workInProgress2.child = renderLanes2;
          for (renderLanes2.return = workInProgress2; null !== current.sibling; )
            current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
          renderLanes2.sibling = null;
        }
        return workInProgress2.child;
      }
      function checkScheduledUpdateOrContext(current, renderLanes2) {
        if (0 !== (current.lanes & renderLanes2)) return true;
        current = current.dependencies;
        return null !== current && checkIfContextChanged(current) ? true : false;
      }
      function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
        switch (workInProgress2.tag) {
          case 3:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
            resetHydrationState();
            break;
          case 27:
          case 5:
            pushHostContext(workInProgress2);
            break;
          case 4:
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            break;
          case 10:
            pushProvider(
              workInProgress2,
              workInProgress2.type,
              workInProgress2.memoizedProps.value
            );
            break;
          case 31:
            if (null !== workInProgress2.memoizedState)
              return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
            break;
          case 13:
            var state$102 = workInProgress2.memoizedState;
            if (null !== state$102) {
              if (null !== state$102.dehydrated)
                return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
              if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
                return updateSuspenseComponent(current, workInProgress2, renderLanes2);
              pushPrimaryTreeSuspenseHandler(workInProgress2);
              current = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
              return null !== current ? current.sibling : null;
            }
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            break;
          case 19:
            var didSuspendBefore = 0 !== (current.flags & 128);
            state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes);
            state$102 || (propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              false
            ), state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes));
            if (didSuspendBefore) {
              if (state$102)
                return updateSuspenseListComponent(
                  current,
                  workInProgress2,
                  renderLanes2
                );
              workInProgress2.flags |= 128;
            }
            didSuspendBefore = workInProgress2.memoizedState;
            null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
            push(suspenseStackCursor, suspenseStackCursor.current);
            if (state$102) break;
            else return null;
          case 22:
            return workInProgress2.lanes = 0, updateOffscreenComponent(
              current,
              workInProgress2,
              renderLanes2,
              workInProgress2.pendingProps
            );
          case 24:
            pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
        }
        return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      function beginWork(current, workInProgress2, renderLanes2) {
        if (null !== current)
          if (current.memoizedProps !== workInProgress2.pendingProps)
            didReceiveUpdate = true;
          else {
            if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
              return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
                current,
                workInProgress2,
                renderLanes2
              );
            didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
          }
        else
          didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
        workInProgress2.lanes = 0;
        switch (workInProgress2.tag) {
          case 16:
            a: {
              var props = workInProgress2.pendingProps;
              current = resolveLazy(workInProgress2.elementType);
              workInProgress2.type = current;
              if ("function" === typeof current)
                shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
                  null,
                  workInProgress2,
                  current,
                  props,
                  renderLanes2
                ));
              else {
                if (void 0 !== current && null !== current) {
                  var $$typeof = current.$$typeof;
                  if ($$typeof === REACT_FORWARD_REF_TYPE) {
                    workInProgress2.tag = 11;
                    workInProgress2 = updateForwardRef(
                      null,
                      workInProgress2,
                      current,
                      props,
                      renderLanes2
                    );
                    break a;
                  } else if ($$typeof === REACT_MEMO_TYPE) {
                    workInProgress2.tag = 14;
                    workInProgress2 = updateMemoComponent(
                      null,
                      workInProgress2,
                      current,
                      props,
                      renderLanes2
                    );
                    break a;
                  }
                }
                workInProgress2 = getComponentNameFromType(current) || current;
                throw Error(formatProdErrorMessage(306, workInProgress2, ""));
              }
            }
            return workInProgress2;
          case 0:
            return updateFunctionComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 1:
            return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
              props,
              workInProgress2.pendingProps
            ), updateClassComponent(
              current,
              workInProgress2,
              props,
              $$typeof,
              renderLanes2
            );
          case 3:
            a: {
              pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              );
              if (null === current) throw Error(formatProdErrorMessage(387));
              props = workInProgress2.pendingProps;
              var prevState = workInProgress2.memoizedState;
              $$typeof = prevState.element;
              cloneUpdateQueue(current, workInProgress2);
              processUpdateQueue(workInProgress2, props, null, renderLanes2);
              var nextState = workInProgress2.memoizedState;
              props = nextState.cache;
              pushProvider(workInProgress2, CacheContext, props);
              props !== prevState.cache && propagateContextChanges(
                workInProgress2,
                [CacheContext],
                renderLanes2,
                true
              );
              suspendIfUpdateReadFromEntangledAsyncAction();
              props = nextState.element;
              if (prevState.isDehydrated)
                if (prevState = {
                  element: props,
                  isDehydrated: false,
                  cache: nextState.cache
                }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    props,
                    renderLanes2
                  );
                  break a;
                } else if (props !== $$typeof) {
                  $$typeof = createCapturedValueAtFiber(
                    Error(formatProdErrorMessage(424)),
                    workInProgress2
                  );
                  queueHydrationError($$typeof);
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current,
                    workInProgress2,
                    props,
                    renderLanes2
                  );
                  break a;
                } else {
                  current = workInProgress2.stateNode.containerInfo;
                  switch (current.nodeType) {
                    case 9:
                      current = current.body;
                      break;
                    default:
                      current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
                  }
                  nextHydratableInstance = getNextHydratable(current.firstChild);
                  hydrationParentFiber = workInProgress2;
                  isHydrating = true;
                  hydrationErrors = null;
                  rootOrSingletonContext = true;
                  renderLanes2 = mountChildFibers(
                    workInProgress2,
                    null,
                    props,
                    renderLanes2
                  );
                  for (workInProgress2.child = renderLanes2; renderLanes2; )
                    renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
                }
              else {
                resetHydrationState();
                if (props === $$typeof) {
                  workInProgress2 = bailoutOnAlreadyFinishedWork(
                    current,
                    workInProgress2,
                    renderLanes2
                  );
                  break a;
                }
                reconcileChildren(current, workInProgress2, props, renderLanes2);
              }
              workInProgress2 = workInProgress2.child;
            }
            return workInProgress2;
          case 26:
            return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
              workInProgress2.type,
              null,
              workInProgress2.pendingProps,
              null
            )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (renderLanes2 = workInProgress2.type, current = workInProgress2.pendingProps, props = getOwnerDocumentFromRootContainer(
              rootInstanceStackCursor.current
            ).createElement(renderLanes2), props[internalInstanceKey] = workInProgress2, props[internalPropsKey] = current, setInitialProperties(props, renderLanes2, current), markNodeAsHoistable(props), workInProgress2.stateNode = props) : workInProgress2.memoizedState = getResource(
              workInProgress2.type,
              current.memoizedProps,
              workInProgress2.pendingProps,
              current.memoizedState
            ), null;
          case 27:
            return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootInstanceStackCursor.current
            ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
          case 5:
            if (null === current && isHydrating) {
              if ($$typeof = props = nextHydratableInstance)
                props = canHydrateInstance(
                  props,
                  workInProgress2.type,
                  workInProgress2.pendingProps,
                  rootOrSingletonContext
                ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
              $$typeof || throwOnHydrationMismatch(workInProgress2);
            }
            pushHostContext(workInProgress2);
            $$typeof = workInProgress2.type;
            prevState = workInProgress2.pendingProps;
            nextState = null !== current ? current.memoizedProps : null;
            props = prevState.children;
            shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
            null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
              current,
              workInProgress2,
              TransitionAwareHostComponent,
              null,
              null,
              renderLanes2
            ), HostTransitionContext._currentValue = $$typeof);
            markRef(current, workInProgress2);
            reconcileChildren(current, workInProgress2, props, renderLanes2);
            return workInProgress2.child;
          case 6:
            if (null === current && isHydrating) {
              if (current = renderLanes2 = nextHydratableInstance)
                renderLanes2 = canHydrateTextInstance(
                  renderLanes2,
                  workInProgress2.pendingProps,
                  rootOrSingletonContext
                ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
              current || throwOnHydrationMismatch(workInProgress2);
            }
            return null;
          case 13:
            return updateSuspenseComponent(current, workInProgress2, renderLanes2);
          case 4:
            return pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
              workInProgress2,
              null,
              props,
              renderLanes2
            ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 11:
            return updateForwardRef(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 7:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps,
              renderLanes2
            ), workInProgress2.child;
          case 8:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 12:
            return reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 10:
            return props = workInProgress2.pendingProps, pushProvider(workInProgress2, workInProgress2.type, props.value), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
          case 9:
            return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
          case 14:
            return updateMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 15:
            return updateSimpleMemoComponent(
              current,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 19:
            return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
          case 31:
            return updateActivityComponent(current, workInProgress2, renderLanes2);
          case 22:
            return updateOffscreenComponent(
              current,
              workInProgress2,
              renderLanes2,
              workInProgress2.pendingProps
            );
          case 24:
            return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
              workInProgress2,
              [CacheContext],
              renderLanes2,
              true
            ))), reconcileChildren(
              current,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 29:
            throw workInProgress2.pendingProps;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function markUpdate(workInProgress2) {
        workInProgress2.flags |= 4;
      }
      function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
        if (type = 0 !== (workInProgress2.mode & 32)) type = false;
        if (type) {
          if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
            if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
            else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
            else
              throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
        } else workInProgress2.flags &= -16777217;
      }
      function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
        if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
          workInProgress2.flags &= -16777217;
        else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
          if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
          else
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
      }
      function scheduleRetryEffect(workInProgress2, retryQueue) {
        null !== retryQueue && (workInProgress2.flags |= 4);
        workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
      }
      function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
        if (!isHydrating)
          switch (renderState.tailMode) {
            case "hidden":
              hasRenderedATailFallback = renderState.tail;
              for (var lastTailNode = null; null !== hasRenderedATailFallback; )
                null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
              null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
              break;
            case "collapsed":
              lastTailNode = renderState.tail;
              for (var lastTailNode$106 = null; null !== lastTailNode; )
                null !== lastTailNode.alternate && (lastTailNode$106 = lastTailNode), lastTailNode = lastTailNode.sibling;
              null === lastTailNode$106 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$106.sibling = null;
          }
      }
      function bubbleProperties(completedWork) {
        var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
        if (didBailout)
          for (var child$107 = completedWork.child; null !== child$107; )
            newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags & 65011712, subtreeFlags |= child$107.flags & 65011712, child$107.return = completedWork, child$107 = child$107.sibling;
        else
          for (child$107 = completedWork.child; null !== child$107; )
            newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags, subtreeFlags |= child$107.flags, child$107.return = completedWork, child$107 = child$107.sibling;
        completedWork.subtreeFlags |= subtreeFlags;
        completedWork.childLanes = newChildLanes;
        return didBailout;
      }
      function completeWork(current, workInProgress2, renderLanes2) {
        var newProps = workInProgress2.pendingProps;
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return bubbleProperties(workInProgress2), null;
          case 1:
            return bubbleProperties(workInProgress2), null;
          case 3:
            renderLanes2 = workInProgress2.stateNode;
            newProps = null;
            null !== current && (newProps = current.memoizedState.cache);
            workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
            popProvider(CacheContext);
            popHostContainer();
            renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
            if (null === current || null === current.child)
              popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
            bubbleProperties(workInProgress2);
            return null;
          case 26:
            var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
            null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              type,
              null,
              newProps,
              renderLanes2
            ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              type,
              current,
              newProps,
              renderLanes2
            ));
            return null;
          case 27:
            popHostContext(workInProgress2);
            renderLanes2 = rootInstanceStackCursor.current;
            type = workInProgress2.type;
            if (null !== current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(formatProdErrorMessage(166));
                bubbleProperties(workInProgress2);
                return null;
              }
              current = contextStackCursor.current;
              popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
            }
            bubbleProperties(workInProgress2);
            return null;
          case 5:
            popHostContext(workInProgress2);
            type = workInProgress2.type;
            if (null !== current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(formatProdErrorMessage(166));
                bubbleProperties(workInProgress2);
                return null;
              }
              nextResource = contextStackCursor.current;
              if (popHydrationState(workInProgress2))
                prepareToHydrateHostInstance(workInProgress2, nextResource);
              else {
                var ownerDocument = getOwnerDocumentFromRootContainer(
                  rootInstanceStackCursor.current
                );
                switch (nextResource) {
                  case 1:
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/2000/svg",
                      type
                    );
                    break;
                  case 2:
                    nextResource = ownerDocument.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      type
                    );
                    break;
                  default:
                    switch (type) {
                      case "svg":
                        nextResource = ownerDocument.createElementNS(
                          "http://www.w3.org/2000/svg",
                          type
                        );
                        break;
                      case "math":
                        nextResource = ownerDocument.createElementNS(
                          "http://www.w3.org/1998/Math/MathML",
                          type
                        );
                        break;
                      case "script":
                        nextResource = ownerDocument.createElement("div");
                        nextResource.innerHTML = "<script><\/script>";
                        nextResource = nextResource.removeChild(
                          nextResource.firstChild
                        );
                        break;
                      case "select":
                        nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                          is: newProps.is
                        }) : ownerDocument.createElement("select");
                        newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                        break;
                      default:
                        nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                    }
                }
                nextResource[internalInstanceKey] = workInProgress2;
                nextResource[internalPropsKey] = newProps;
                a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
                  if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
                    nextResource.appendChild(ownerDocument.stateNode);
                  else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
                    ownerDocument.child.return = ownerDocument;
                    ownerDocument = ownerDocument.child;
                    continue;
                  }
                  if (ownerDocument === workInProgress2) break a;
                  for (; null === ownerDocument.sibling; ) {
                    if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                      break a;
                    ownerDocument = ownerDocument.return;
                  }
                  ownerDocument.sibling.return = ownerDocument.return;
                  ownerDocument = ownerDocument.sibling;
                }
                workInProgress2.stateNode = nextResource;
                a: switch (setInitialProperties(nextResource, type, newProps), type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    newProps = !!newProps.autoFocus;
                    break a;
                  case "img":
                    newProps = true;
                    break a;
                  default:
                    newProps = false;
                }
                newProps && markUpdate(workInProgress2);
              }
            }
            bubbleProperties(workInProgress2);
            preloadInstanceAndSuspendIfNeeded(
              workInProgress2,
              workInProgress2.type,
              null === current ? null : current.memoizedProps,
              workInProgress2.pendingProps,
              renderLanes2
            );
            return null;
          case 6:
            if (current && null != workInProgress2.stateNode)
              current.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if ("string" !== typeof newProps && null === workInProgress2.stateNode)
                throw Error(formatProdErrorMessage(166));
              current = rootInstanceStackCursor.current;
              if (popHydrationState(workInProgress2)) {
                current = workInProgress2.stateNode;
                renderLanes2 = workInProgress2.memoizedProps;
                newProps = null;
                type = hydrationParentFiber;
                if (null !== type)
                  switch (type.tag) {
                    case 27:
                    case 5:
                      newProps = type.memoizedProps;
                  }
                current[internalInstanceKey] = workInProgress2;
                current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
                current || throwOnHydrationMismatch(workInProgress2, true);
              } else
                current = getOwnerDocumentFromRootContainer(current).createTextNode(
                  newProps
                ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
            }
            bubbleProperties(workInProgress2);
            return null;
          case 31:
            renderLanes2 = workInProgress2.memoizedState;
            if (null === current || null !== current.memoizedState) {
              newProps = popHydrationState(workInProgress2);
              if (null !== renderLanes2) {
                if (null === current) {
                  if (!newProps) throw Error(formatProdErrorMessage(318));
                  current = workInProgress2.memoizedState;
                  current = null !== current ? current.dehydrated : null;
                  if (!current) throw Error(formatProdErrorMessage(557));
                  current[internalInstanceKey] = workInProgress2;
                } else
                  resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                bubbleProperties(workInProgress2);
                current = false;
              } else
                renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
              if (!current) {
                if (workInProgress2.flags & 256)
                  return popSuspenseHandler(workInProgress2), workInProgress2;
                popSuspenseHandler(workInProgress2);
                return null;
              }
              if (0 !== (workInProgress2.flags & 128))
                throw Error(formatProdErrorMessage(558));
            }
            bubbleProperties(workInProgress2);
            return null;
          case 13:
            newProps = workInProgress2.memoizedState;
            if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
              type = popHydrationState(workInProgress2);
              if (null !== newProps && null !== newProps.dehydrated) {
                if (null === current) {
                  if (!type) throw Error(formatProdErrorMessage(318));
                  type = workInProgress2.memoizedState;
                  type = null !== type ? type.dehydrated : null;
                  if (!type) throw Error(formatProdErrorMessage(317));
                  type[internalInstanceKey] = workInProgress2;
                } else
                  resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                bubbleProperties(workInProgress2);
                type = false;
              } else
                type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
              if (!type) {
                if (workInProgress2.flags & 256)
                  return popSuspenseHandler(workInProgress2), workInProgress2;
                popSuspenseHandler(workInProgress2);
                return null;
              }
            }
            popSuspenseHandler(workInProgress2);
            if (0 !== (workInProgress2.flags & 128))
              return workInProgress2.lanes = renderLanes2, workInProgress2;
            renderLanes2 = null !== newProps;
            current = null !== current && null !== current.memoizedState;
            renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
            renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
            scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
            bubbleProperties(workInProgress2);
            return null;
          case 4:
            return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
          case 10:
            return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
          case 19:
            pop(suspenseStackCursor);
            newProps = workInProgress2.memoizedState;
            if (null === newProps) return bubbleProperties(workInProgress2), null;
            type = 0 !== (workInProgress2.flags & 128);
            nextResource = newProps.rendering;
            if (null === nextResource)
              if (type) cutOffTailIfNeeded(newProps, false);
              else {
                if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
                  for (current = workInProgress2.child; null !== current; ) {
                    nextResource = findFirstSuspended(current);
                    if (null !== nextResource) {
                      workInProgress2.flags |= 128;
                      cutOffTailIfNeeded(newProps, false);
                      current = nextResource.updateQueue;
                      workInProgress2.updateQueue = current;
                      scheduleRetryEffect(workInProgress2, current);
                      workInProgress2.subtreeFlags = 0;
                      current = renderLanes2;
                      for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                        resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                      push(
                        suspenseStackCursor,
                        suspenseStackCursor.current & 1 | 2
                      );
                      isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                      return workInProgress2.child;
                    }
                    current = current.sibling;
                  }
                null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
              }
            else {
              if (!type)
                if (current = findFirstSuspended(nextResource), null !== current) {
                  if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !isHydrating)
                    return bubbleProperties(workInProgress2), null;
                } else
                  2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
              newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
            }
            if (null !== newProps.tail)
              return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now(), current.sibling = null, renderLanes2 = suspenseStackCursor.current, push(
                suspenseStackCursor,
                type ? renderLanes2 & 1 | 2 : renderLanes2 & 1
              ), isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount), current;
            bubbleProperties(workInProgress2);
            return null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
          case 24:
            return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
          case 25:
            return null;
          case 30:
            return null;
        }
        throw Error(formatProdErrorMessage(156, workInProgress2.tag));
      }
      function unwindWork(current, workInProgress2) {
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 1:
            return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 3:
            return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 26:
          case 27:
          case 5:
            return popHostContext(workInProgress2), null;
          case 31:
            if (null !== workInProgress2.memoizedState) {
              popSuspenseHandler(workInProgress2);
              if (null === workInProgress2.alternate)
                throw Error(formatProdErrorMessage(340));
              resetHydrationState();
            }
            current = workInProgress2.flags;
            return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 13:
            popSuspenseHandler(workInProgress2);
            current = workInProgress2.memoizedState;
            if (null !== current && null !== current.dehydrated) {
              if (null === workInProgress2.alternate)
                throw Error(formatProdErrorMessage(340));
              resetHydrationState();
            }
            current = workInProgress2.flags;
            return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 19:
            return pop(suspenseStackCursor), null;
          case 4:
            return popHostContainer(), null;
          case 10:
            return popProvider(workInProgress2.type), null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
          case 24:
            return popProvider(CacheContext), null;
          case 25:
            return null;
          default:
            return null;
        }
      }
      function unwindInterruptedWork(current, interruptedWork) {
        popTreeContext(interruptedWork);
        switch (interruptedWork.tag) {
          case 3:
            popProvider(CacheContext);
            popHostContainer();
            break;
          case 26:
          case 27:
          case 5:
            popHostContext(interruptedWork);
            break;
          case 4:
            popHostContainer();
            break;
          case 31:
            null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
            break;
          case 13:
            popSuspenseHandler(interruptedWork);
            break;
          case 19:
            pop(suspenseStackCursor);
            break;
          case 10:
            popProvider(interruptedWork.type);
            break;
          case 22:
          case 23:
            popSuspenseHandler(interruptedWork);
            popHiddenContext();
            null !== current && pop(resumedCache);
            break;
          case 24:
            popProvider(CacheContext);
        }
      }
      function commitHookEffectListMount(flags, finishedWork) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                lastEffect = void 0;
                var create = updateQueue.create, inst = updateQueue.inst;
                lastEffect = create();
                inst.destroy = lastEffect;
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                var inst = updateQueue.inst, destroy = inst.destroy;
                if (void 0 !== destroy) {
                  inst.destroy = void 0;
                  lastEffect = finishedWork;
                  var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                  try {
                    destroy_();
                  } catch (error) {
                    captureCommitPhaseError(
                      lastEffect,
                      nearestMountedAncestor,
                      error
                    );
                  }
                }
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitClassCallbacks(finishedWork) {
        var updateQueue = finishedWork.updateQueue;
        if (null !== updateQueue) {
          var instance = finishedWork.stateNode;
          try {
            commitCallbacks(updateQueue, instance);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
        instance.props = resolveClassComponentProps(
          current.type,
          current.memoizedProps
        );
        instance.state = current.memoizedState;
        try {
          instance.componentWillUnmount();
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyAttachRef(current, nearestMountedAncestor) {
        try {
          var ref = current.ref;
          if (null !== ref) {
            switch (current.tag) {
              case 26:
              case 27:
              case 5:
                var instanceToUse = current.stateNode;
                break;
              case 30:
                instanceToUse = current.stateNode;
                break;
              default:
                instanceToUse = current.stateNode;
            }
            "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
          }
        } catch (error) {
          captureCommitPhaseError(current, nearestMountedAncestor, error);
        }
      }
      function safelyDetachRef(current, nearestMountedAncestor) {
        var ref = current.ref, refCleanup = current.refCleanup;
        if (null !== ref)
          if ("function" === typeof refCleanup)
            try {
              refCleanup();
            } catch (error) {
              captureCommitPhaseError(current, nearestMountedAncestor, error);
            } finally {
              current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
            }
          else if ("function" === typeof ref)
            try {
              ref(null);
            } catch (error$140) {
              captureCommitPhaseError(current, nearestMountedAncestor, error$140);
            }
          else ref.current = null;
      }
      function commitHostMount(finishedWork) {
        var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
        try {
          a: switch (type) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              props.autoFocus && instance.focus();
              break a;
            case "img":
              props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHostUpdate(finishedWork, newProps, oldProps) {
        try {
          var domElement = finishedWork.stateNode;
          updateProperties(domElement, finishedWork.type, oldProps, newProps);
          domElement[internalPropsKey] = newProps;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function isHostParent(fiber) {
        return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
      }
      function getHostSibling(fiber) {
        a: for (; ; ) {
          for (; null === fiber.sibling; ) {
            if (null === fiber.return || isHostParent(fiber.return)) return null;
            fiber = fiber.return;
          }
          fiber.sibling.return = fiber.return;
          for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
            if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
            if (fiber.flags & 2) continue a;
            if (null === fiber.child || 4 === fiber.tag) continue a;
            else fiber.child.return = fiber, fiber = fiber.child;
          }
          if (!(fiber.flags & 2)) return fiber.stateNode;
        }
      }
      function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          node = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
        else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node))
          for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
            insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
      }
      function insertOrAppendPlacementNode(node, before, parent) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
        else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node))
          for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
            insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
      }
      function commitHostSingletonAcquisition(finishedWork) {
        var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
        try {
          for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
            singleton.removeAttributeNode(attributes[0]);
          setInitialProperties(singleton, type, props);
          singleton[internalInstanceKey] = finishedWork;
          singleton[internalPropsKey] = props;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      var offscreenSubtreeIsHidden = false;
      var offscreenSubtreeWasHidden = false;
      var needsFormReset = false;
      var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
      var nextEffect = null;
      function commitBeforeMutationEffects(root2, firstChild) {
        root2 = root2.containerInfo;
        eventsEnabled = _enabled;
        root2 = getActiveElementDeep(root2);
        if (hasSelectionCapabilities(root2)) {
          if ("selectionStart" in root2)
            var JSCompiler_temp = {
              start: root2.selectionStart,
              end: root2.selectionEnd
            };
          else
            a: {
              JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
              var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
              if (selection && 0 !== selection.rangeCount) {
                JSCompiler_temp = selection.anchorNode;
                var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
                selection = selection.focusOffset;
                try {
                  JSCompiler_temp.nodeType, focusNode.nodeType;
                } catch (e$20) {
                  JSCompiler_temp = null;
                  break a;
                }
                var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
                b: for (; ; ) {
                  for (var next; ; ) {
                    node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                    node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                    3 === node.nodeType && (length += node.nodeValue.length);
                    if (null === (next = node.firstChild)) break;
                    parentNode = node;
                    node = next;
                  }
                  for (; ; ) {
                    if (node === root2) break b;
                    parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                    parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                    if (null !== (next = node.nextSibling)) break;
                    node = parentNode;
                    parentNode = node.parentNode;
                  }
                  node = next;
                }
                JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
              } else JSCompiler_temp = null;
            }
          JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
        } else JSCompiler_temp = null;
        selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
        _enabled = false;
        for (nextEffect = firstChild; null !== nextEffect; )
          if (firstChild = nextEffect, root2 = firstChild.child, 0 !== (firstChild.subtreeFlags & 1028) && null !== root2)
            root2.return = firstChild, nextEffect = root2;
          else
            for (; null !== nextEffect; ) {
              firstChild = nextEffect;
              focusNode = firstChild.alternate;
              root2 = firstChild.flags;
              switch (firstChild.tag) {
                case 0:
                  if (0 !== (root2 & 4) && (root2 = firstChild.updateQueue, root2 = null !== root2 ? root2.events : null, null !== root2))
                    for (JSCompiler_temp = 0; JSCompiler_temp < root2.length; JSCompiler_temp++)
                      anchorOffset = root2[JSCompiler_temp], anchorOffset.ref.impl = anchorOffset.nextImpl;
                  break;
                case 11:
                case 15:
                  break;
                case 1:
                  if (0 !== (root2 & 1024) && null !== focusNode) {
                    root2 = void 0;
                    JSCompiler_temp = firstChild;
                    anchorOffset = focusNode.memoizedProps;
                    focusNode = focusNode.memoizedState;
                    selection = JSCompiler_temp.stateNode;
                    try {
                      var resolvedPrevProps = resolveClassComponentProps(
                        JSCompiler_temp.type,
                        anchorOffset
                      );
                      root2 = selection.getSnapshotBeforeUpdate(
                        resolvedPrevProps,
                        focusNode
                      );
                      selection.__reactInternalSnapshotBeforeUpdate = root2;
                    } catch (error) {
                      captureCommitPhaseError(
                        JSCompiler_temp,
                        JSCompiler_temp.return,
                        error
                      );
                    }
                  }
                  break;
                case 3:
                  if (0 !== (root2 & 1024)) {
                    if (root2 = firstChild.stateNode.containerInfo, JSCompiler_temp = root2.nodeType, 9 === JSCompiler_temp)
                      clearContainerSparingly(root2);
                    else if (1 === JSCompiler_temp)
                      switch (root2.nodeName) {
                        case "HEAD":
                        case "HTML":
                        case "BODY":
                          clearContainerSparingly(root2);
                          break;
                        default:
                          root2.textContent = "";
                      }
                  }
                  break;
                case 5:
                case 26:
                case 27:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  if (0 !== (root2 & 1024)) throw Error(formatProdErrorMessage(163));
              }
              root2 = firstChild.sibling;
              if (null !== root2) {
                root2.return = firstChild.return;
                nextEffect = root2;
                break;
              }
              nextEffect = firstChild.return;
            }
      }
      function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitHookEffectListMount(5, finishedWork);
            break;
          case 1:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 4)
              if (finishedRoot = finishedWork.stateNode, null === current)
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              else {
                var prevProps = resolveClassComponentProps(
                  finishedWork.type,
                  current.memoizedProps
                );
                current = current.memoizedState;
                try {
                  finishedRoot.componentDidUpdate(
                    prevProps,
                    current,
                    finishedRoot.__reactInternalSnapshotBeforeUpdate
                  );
                } catch (error$139) {
                  captureCommitPhaseError(
                    finishedWork,
                    finishedWork.return,
                    error$139
                  );
                }
              }
            flags & 64 && commitClassCallbacks(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 3:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
              current = null;
              if (null !== finishedWork.child)
                switch (finishedWork.child.tag) {
                  case 27:
                  case 5:
                    current = finishedWork.child.stateNode;
                    break;
                  case 1:
                    current = finishedWork.child.stateNode;
                }
              try {
                commitCallbacks(finishedRoot, current);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 27:
            null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
          case 26:
          case 5:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            null === current && flags & 4 && commitHostMount(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            break;
          case 31:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
              null,
              finishedWork
            ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
            break;
          case 22:
            flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
            if (!flags) {
              current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
              prevProps = offscreenSubtreeIsHidden;
              var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
              offscreenSubtreeIsHidden = flags;
              (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                0 !== (finishedWork.subtreeFlags & 8772)
              ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              offscreenSubtreeIsHidden = prevProps;
              offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            }
            break;
          case 30:
            break;
          default:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        }
      }
      function detachFiberAfterEffects(fiber) {
        var alternate = fiber.alternate;
        null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
        fiber.child = null;
        fiber.deletions = null;
        fiber.sibling = null;
        5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
        fiber.stateNode = null;
        fiber.return = null;
        fiber.dependencies = null;
        fiber.memoizedProps = null;
        fiber.memoizedState = null;
        fiber.pendingProps = null;
        fiber.stateNode = null;
        fiber.updateQueue = null;
      }
      var hostParent = null;
      var hostParentIsContainer = false;
      function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
        for (parent = parent.child; null !== parent; )
          commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
      }
      function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
        if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
          try {
            injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
          } catch (err) {
          }
        switch (deletedFiber.tag) {
          case 26:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
            break;
          case 27:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
            isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            releaseSingletonInstance(deletedFiber.stateNode);
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 5:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          case 6:
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = null;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            if (null !== hostParent)
              if (hostParentIsContainer)
                try {
                  (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode);
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
              else
                try {
                  hostParent.removeChild(deletedFiber.stateNode);
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
            break;
          case 18:
            null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
              9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
              deletedFiber.stateNode
            ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
            break;
          case 4:
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = deletedFiber.stateNode.containerInfo;
            hostParentIsContainer = true;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
            offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 1:
            offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
              deletedFiber,
              nearestMountedAncestor,
              prevHostParent
            ));
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 21:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 22:
            offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            offscreenSubtreeWasHidden = prevHostParent;
            break;
          default:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
        }
      }
      function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
        if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
          finishedRoot = finishedRoot.dehydrated;
          try {
            retryIfBlockedOn(finishedRoot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
        if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
          try {
            retryIfBlockedOn(finishedRoot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
      }
      function getRetryCache(finishedWork) {
        switch (finishedWork.tag) {
          case 31:
          case 13:
          case 19:
            var retryCache = finishedWork.stateNode;
            null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
            return retryCache;
          case 22:
            return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
          default:
            throw Error(formatProdErrorMessage(435, finishedWork.tag));
        }
      }
      function attachSuspenseRetryListeners(finishedWork, wakeables) {
        var retryCache = getRetryCache(finishedWork);
        wakeables.forEach(function(wakeable) {
          if (!retryCache.has(wakeable)) {
            retryCache.add(wakeable);
            var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
            wakeable.then(retry, retry);
          }
        });
      }
      function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
        var deletions = parentFiber.deletions;
        if (null !== deletions)
          for (var i = 0; i < deletions.length; i++) {
            var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
            a: for (; null !== parent; ) {
              switch (parent.tag) {
                case 27:
                  if (isSingletonScope(parent.type)) {
                    hostParent = parent.stateNode;
                    hostParentIsContainer = false;
                    break a;
                  }
                  break;
                case 5:
                  hostParent = parent.stateNode;
                  hostParentIsContainer = false;
                  break a;
                case 3:
                case 4:
                  hostParent = parent.stateNode.containerInfo;
                  hostParentIsContainer = true;
                  break a;
              }
              parent = parent.return;
            }
            if (null === hostParent) throw Error(formatProdErrorMessage(160));
            commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
            hostParent = null;
            hostParentIsContainer = false;
            root2 = childToDelete.alternate;
            null !== root2 && (root2.return = null);
            childToDelete.return = null;
          }
        if (parentFiber.subtreeFlags & 13886)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
      }
      var currentHoistableRoot = null;
      function commitMutationEffectsOnFiber(finishedWork, root2) {
        var current = finishedWork.alternate, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
            break;
          case 1:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
            break;
          case 26:
            var hoistableRoot = currentHoistableRoot;
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            if (flags & 4) {
              var currentResource = null !== current ? current.memoizedState : null;
              flags = finishedWork.memoizedState;
              if (null === current)
                if (null === flags)
                  if (null === finishedWork.stateNode) {
                    a: {
                      flags = finishedWork.type;
                      current = finishedWork.memoizedProps;
                      hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
                      b: switch (flags) {
                        case "title":
                          currentResource = hoistableRoot.getElementsByTagName("title")[0];
                          if (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || "http://www.w3.org/2000/svg" === currentResource.namespaceURI || currentResource.hasAttribute("itemprop"))
                            currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(
                              currentResource,
                              hoistableRoot.querySelector("head > title")
                            );
                          setInitialProperties(currentResource, flags, current);
                          currentResource[internalInstanceKey] = finishedWork;
                          markNodeAsHoistable(currentResource);
                          flags = currentResource;
                          break a;
                        case "link":
                          var maybeNodes = getHydratableHoistableCache(
                            "link",
                            "href",
                            hoistableRoot
                          ).get(flags + (current.href || ""));
                          if (maybeNodes) {
                            for (var i = 0; i < maybeNodes.length; i++)
                              if (currentResource = maybeNodes[i], currentResource.getAttribute("href") === (null == current.href || "" === current.href ? null : current.href) && currentResource.getAttribute("rel") === (null == current.rel ? null : current.rel) && currentResource.getAttribute("title") === (null == current.title ? null : current.title) && currentResource.getAttribute("crossorigin") === (null == current.crossOrigin ? null : current.crossOrigin)) {
                                maybeNodes.splice(i, 1);
                                break b;
                              }
                          }
                          currentResource = hoistableRoot.createElement(flags);
                          setInitialProperties(currentResource, flags, current);
                          hoistableRoot.head.appendChild(currentResource);
                          break;
                        case "meta":
                          if (maybeNodes = getHydratableHoistableCache(
                            "meta",
                            "content",
                            hoistableRoot
                          ).get(flags + (current.content || ""))) {
                            for (i = 0; i < maybeNodes.length; i++)
                              if (currentResource = maybeNodes[i], currentResource.getAttribute("content") === (null == current.content ? null : "" + current.content) && currentResource.getAttribute("name") === (null == current.name ? null : current.name) && currentResource.getAttribute("property") === (null == current.property ? null : current.property) && currentResource.getAttribute("http-equiv") === (null == current.httpEquiv ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (null == current.charSet ? null : current.charSet)) {
                                maybeNodes.splice(i, 1);
                                break b;
                              }
                          }
                          currentResource = hoistableRoot.createElement(flags);
                          setInitialProperties(currentResource, flags, current);
                          hoistableRoot.head.appendChild(currentResource);
                          break;
                        default:
                          throw Error(formatProdErrorMessage(468, flags));
                      }
                      currentResource[internalInstanceKey] = finishedWork;
                      markNodeAsHoistable(currentResource);
                      flags = currentResource;
                    }
                    finishedWork.stateNode = flags;
                  } else
                    mountHoistable(
                      hoistableRoot,
                      finishedWork.type,
                      finishedWork.stateNode
                    );
                else
                  finishedWork.stateNode = acquireResource(
                    hoistableRoot,
                    flags,
                    finishedWork.memoizedProps
                  );
              else
                currentResource !== flags ? (null === currentResource ? null !== current.stateNode && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, null === flags ? mountHoistable(
                  hoistableRoot,
                  finishedWork.type,
                  finishedWork.stateNode
                ) : acquireResource(
                  hoistableRoot,
                  flags,
                  finishedWork.memoizedProps
                )) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(
                  finishedWork,
                  finishedWork.memoizedProps,
                  current.memoizedProps
                );
            }
            break;
          case 27:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            null !== current && flags & 4 && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current.memoizedProps
            );
            break;
          case 5:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
            if (finishedWork.flags & 32) {
              hoistableRoot = finishedWork.stateNode;
              try {
                setTextContent(hoistableRoot, "");
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
              finishedWork,
              hoistableRoot,
              null !== current ? current.memoizedProps : hoistableRoot
            ));
            flags & 1024 && (needsFormReset = true);
            break;
          case 6:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            if (flags & 4) {
              if (null === finishedWork.stateNode)
                throw Error(formatProdErrorMessage(162));
              flags = finishedWork.memoizedProps;
              current = finishedWork.stateNode;
              try {
                current.nodeValue = flags;
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 3:
            tagCaches = null;
            hoistableRoot = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(root2.containerInfo);
            recursivelyTraverseMutationEffects(root2, finishedWork);
            currentHoistableRoot = hoistableRoot;
            commitReconciliationEffects(finishedWork);
            if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
              try {
                retryIfBlockedOn(root2.containerInfo);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
            break;
          case 4:
            flags = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(
              finishedWork.stateNode.containerInfo
            );
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            currentHoistableRoot = flags;
            break;
          case 12:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            break;
          case 31:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 13:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 22:
            hoistableRoot = null !== finishedWork.memoizedState;
            var wasHidden = null !== current && null !== current.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
            recursivelyTraverseMutationEffects(root2, finishedWork);
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
            commitReconciliationEffects(finishedWork);
            if (flags & 8192)
              a: for (root2 = finishedWork.stateNode, root2._visibility = hoistableRoot ? root2._visibility & -2 : root2._visibility | 1, hoistableRoot && (null === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current = null, root2 = finishedWork; ; ) {
                if (5 === root2.tag || 26 === root2.tag) {
                  if (null === current) {
                    wasHidden = current = root2;
                    try {
                      if (currentResource = wasHidden.stateNode, hoistableRoot)
                        maybeNodes = currentResource.style, "function" === typeof maybeNodes.setProperty ? maybeNodes.setProperty("display", "none", "important") : maybeNodes.display = "none";
                      else {
                        i = wasHidden.stateNode;
                        var styleProp = wasHidden.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
                        i.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
                      }
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if (6 === root2.tag) {
                  if (null === current) {
                    wasHidden = root2;
                    try {
                      wasHidden.stateNode.nodeValue = hoistableRoot ? "" : wasHidden.memoizedProps;
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if (18 === root2.tag) {
                  if (null === current) {
                    wasHidden = root2;
                    try {
                      var instance = wasHidden.stateNode;
                      hoistableRoot ? hideOrUnhideDehydratedBoundary(instance, true) : hideOrUnhideDehydratedBoundary(wasHidden.stateNode, false);
                    } catch (error) {
                      captureCommitPhaseError(wasHidden, wasHidden.return, error);
                    }
                  }
                } else if ((22 !== root2.tag && 23 !== root2.tag || null === root2.memoizedState || root2 === finishedWork) && null !== root2.child) {
                  root2.child.return = root2;
                  root2 = root2.child;
                  continue;
                }
                if (root2 === finishedWork) break a;
                for (; null === root2.sibling; ) {
                  if (null === root2.return || root2.return === finishedWork) break a;
                  current === root2 && (current = null);
                  root2 = root2.return;
                }
                current === root2 && (current = null);
                root2.sibling.return = root2.return;
                root2 = root2.sibling;
              }
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
            break;
          case 19:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 30:
            break;
          case 21:
            break;
          default:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
        }
      }
      function commitReconciliationEffects(finishedWork) {
        var flags = finishedWork.flags;
        if (flags & 2) {
          try {
            for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
              if (isHostParent(parentFiber)) {
                hostParentFiber = parentFiber;
                break;
              }
              parentFiber = parentFiber.return;
            }
            if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
            switch (hostParentFiber.tag) {
              case 27:
                var parent = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before, parent);
                break;
              case 5:
                var parent$141 = hostParentFiber.stateNode;
                hostParentFiber.flags & 32 && (setTextContent(parent$141, ""), hostParentFiber.flags &= -33);
                var before$142 = getHostSibling(finishedWork);
                insertOrAppendPlacementNode(finishedWork, before$142, parent$141);
                break;
              case 3:
              case 4:
                var parent$143 = hostParentFiber.stateNode.containerInfo, before$144 = getHostSibling(finishedWork);
                insertOrAppendPlacementNodeIntoContainer(
                  finishedWork,
                  before$144,
                  parent$143
                );
                break;
              default:
                throw Error(formatProdErrorMessage(161));
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
          finishedWork.flags &= -3;
        }
        flags & 4096 && (finishedWork.flags &= -4097);
      }
      function recursivelyResetForms(parentFiber) {
        if (parentFiber.subtreeFlags & 1024)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var fiber = parentFiber;
            recursivelyResetForms(fiber);
            5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
            parentFiber = parentFiber.sibling;
          }
      }
      function recursivelyTraverseLayoutEffects(root2, parentFiber) {
        if (parentFiber.subtreeFlags & 8772)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
      }
      function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedWork = parentFiber;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 1:
              safelyDetachRef(finishedWork, finishedWork.return);
              var instance = finishedWork.stateNode;
              "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
                finishedWork,
                finishedWork.return,
                instance
              );
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 27:
              releaseSingletonInstance(finishedWork.stateNode);
            case 26:
            case 5:
              safelyDetachRef(finishedWork, finishedWork.return);
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 22:
              null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            case 30:
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
              break;
            default:
              recursivelyTraverseDisappearLayoutEffects(finishedWork);
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
        includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              commitHookEffectListMount(4, finishedWork);
              break;
            case 1:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              current = finishedWork;
              finishedRoot = current.stateNode;
              if ("function" === typeof finishedRoot.componentDidMount)
                try {
                  finishedRoot.componentDidMount();
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              current = finishedWork;
              finishedRoot = current.updateQueue;
              if (null !== finishedRoot) {
                var instance = current.stateNode;
                try {
                  var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                  if (null !== hiddenCallbacks)
                    for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                      callCallback(hiddenCallbacks[finishedRoot], instance);
                } catch (error) {
                  captureCommitPhaseError(current, current.return, error);
                }
              }
              includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 27:
              commitHostSingletonAcquisition(finishedWork);
            case 26:
            case 5:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 12:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              break;
            case 31:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
              break;
            case 13:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
              break;
            case 22:
              null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 30:
              break;
            default:
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitOffscreenPassiveMountEffects(current, finishedWork) {
        var previousCache = null;
        null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
        current = null;
        null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
        current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
      }
      function commitCachePassiveMountEffect(current, finishedWork) {
        current = null;
        null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
        finishedWork = finishedWork.memoizedState.cache;
        finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
      }
      function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveMountOnFiber(
              root2,
              parentFiber,
              committedLanes,
              committedTransitions
            ), parentFiber = parentFiber.sibling;
      }
      function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitHookEffectListMount(9, finishedWork);
            break;
          case 1:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 3:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
            break;
          case 12:
            if (flags & 2048) {
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              finishedRoot = finishedWork.stateNode;
              try {
                var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
                "function" === typeof onPostCommit && onPostCommit(
                  id,
                  null === finishedWork.alternate ? "mount" : "update",
                  finishedRoot.passiveEffectDuration,
                  -0
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            } else
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
            break;
          case 31:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 13:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 23:
            break;
          case 22:
            _finishedWork$memoize2 = finishedWork.stateNode;
            id = finishedWork.alternate;
            null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              0 !== (finishedWork.subtreeFlags & 10256) || false
            ));
            flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
            break;
          case 24:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
        }
      }
      function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
        includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
              commitHookEffectListMount(8, finishedWork);
              break;
            case 23:
              break;
            case 22:
              var instance = finishedWork.stateNode;
              null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ) : recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              ));
              includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
                finishedWork.alternate,
                finishedWork
              );
              break;
            case 24:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                includeWorkInProgressEffects
              );
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case 22:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                flags & 2048 && commitOffscreenPassiveMountEffects(
                  finishedWork.alternate,
                  finishedWork
                );
                break;
              case 24:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
                break;
              default:
                recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
            }
            parentFiber = parentFiber.sibling;
          }
      }
      var suspenseyCommitFlag = 8192;
      function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
        if (parentFiber.subtreeFlags & suspenseyCommitFlag)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            accumulateSuspenseyCommitOnFiber(
              parentFiber,
              committedLanes,
              suspendedState
            ), parentFiber = parentFiber.sibling;
      }
      function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
        switch (fiber.tag) {
          case 26:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(
              suspendedState,
              currentHoistableRoot,
              fiber.memoizedState,
              fiber.memoizedProps
            );
            break;
          case 5:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            break;
          case 3:
          case 4:
            var previousHoistableRoot = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
            currentHoistableRoot = previousHoistableRoot;
            break;
          case 22:
            null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            ));
            break;
          default:
            recursivelyAccumulateSuspenseyCommit(
              fiber,
              committedLanes,
              suspendedState
            );
        }
      }
      function detachAlternateSiblings(parentFiber) {
        var previousFiber = parentFiber.alternate;
        if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
          previousFiber.child = null;
          do
            previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
          while (null !== parentFiber);
        }
      }
      function recursivelyTraversePassiveUnmountEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
      }
      function commitPassiveUnmountOnFiber(finishedWork) {
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
            break;
          case 3:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 12:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          case 22:
            var instance = finishedWork.stateNode;
            null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          default:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
        }
      }
      function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          deletions = parentFiber;
          switch (deletions.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, deletions, deletions.return);
              recursivelyTraverseDisconnectPassiveEffects(deletions);
              break;
            case 22:
              i = deletions.stateNode;
              i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
              break;
            default:
              recursivelyTraverseDisconnectPassiveEffects(deletions);
          }
          parentFiber = parentFiber.sibling;
        }
      }
      function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
        for (; null !== nextEffect; ) {
          var fiber = nextEffect;
          switch (fiber.tag) {
            case 0:
            case 11:
            case 15:
              commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
              break;
            case 23:
            case 22:
              if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
                var cache = fiber.memoizedState.cachePool.pool;
                null != cache && cache.refCount++;
              }
              break;
            case 24:
              releaseCache(fiber.memoizedState.cache);
          }
          cache = fiber.child;
          if (null !== cache) cache.return = fiber, nextEffect = cache;
          else
            a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
              cache = nextEffect;
              var sibling = cache.sibling, returnFiber = cache.return;
              detachFiberAfterEffects(cache);
              if (cache === fiber) {
                nextEffect = null;
                break a;
              }
              if (null !== sibling) {
                sibling.return = returnFiber;
                nextEffect = sibling;
                break a;
              }
              nextEffect = returnFiber;
            }
        }
      }
      var DefaultAsyncDispatcher = {
        getCacheForType: function(resourceType) {
          var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
          void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
          return cacheForType;
        },
        cacheSignal: function() {
          return readContext(CacheContext).controller.signal;
        }
      };
      var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
      var executionContext = 0;
      var workInProgressRoot = null;
      var workInProgress = null;
      var workInProgressRootRenderLanes = 0;
      var workInProgressSuspendedReason = 0;
      var workInProgressThrownValue = null;
      var workInProgressRootDidSkipSuspendedSiblings = false;
      var workInProgressRootIsPrerendering = false;
      var workInProgressRootDidAttachPingListener = false;
      var entangledRenderLanes = 0;
      var workInProgressRootExitStatus = 0;
      var workInProgressRootSkippedLanes = 0;
      var workInProgressRootInterleavedUpdatedLanes = 0;
      var workInProgressRootPingedLanes = 0;
      var workInProgressDeferredLane = 0;
      var workInProgressSuspendedRetryLanes = 0;
      var workInProgressRootConcurrentErrors = null;
      var workInProgressRootRecoverableErrors = null;
      var workInProgressRootDidIncludeRecursiveRenderUpdate = false;
      var globalMostRecentFallbackTime = 0;
      var globalMostRecentTransitionTime = 0;
      var workInProgressRootRenderTargetTime = Infinity;
      var workInProgressTransitions = null;
      var legacyErrorBoundariesThatAlreadyFailed = null;
      var pendingEffectsStatus = 0;
      var pendingEffectsRoot = null;
      var pendingFinishedWork = null;
      var pendingEffectsLanes = 0;
      var pendingEffectsRemainingLanes = 0;
      var pendingPassiveTransitions = null;
      var pendingRecoverableErrors = null;
      var nestedUpdateCount = 0;
      var rootWithNestedUpdates = null;
      function requestUpdateLane() {
        return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
      }
      function requestDeferredLane() {
        if (0 === workInProgressDeferredLane)
          if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
            var lane = nextTransitionDeferredLane;
            nextTransitionDeferredLane <<= 1;
            0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
            workInProgressDeferredLane = lane;
          } else workInProgressDeferredLane = 536870912;
        lane = suspenseHandlerStackCursor.current;
        null !== lane && (lane.flags |= 32);
        return workInProgressDeferredLane;
      }
      function scheduleUpdateOnFiber(root2, fiber, lane) {
        if (root2 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
          prepareFreshStack(root2, 0), markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          );
        markRootUpdated$1(root2, lane);
        if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
          root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          )), ensureRootIsScheduled(root2);
      }
      function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
        if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
        var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
        do {
          if (0 === exitStatus) {
            workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
            break;
          } else {
            forceSync = root$jscomp$0.current.alternate;
            if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
              exitStatus = renderRootSync(root$jscomp$0, lanes, false);
              renderWasConcurrent = false;
              continue;
            }
            if (2 === exitStatus) {
              renderWasConcurrent = lanes;
              if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
                var JSCompiler_inline_result = 0;
              else
                JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
              if (0 !== JSCompiler_inline_result) {
                lanes = JSCompiler_inline_result;
                a: {
                  var root2 = root$jscomp$0;
                  exitStatus = workInProgressRootConcurrentErrors;
                  var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
                  wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
                  JSCompiler_inline_result = renderRootSync(
                    root2,
                    JSCompiler_inline_result,
                    false
                  );
                  if (2 !== JSCompiler_inline_result) {
                    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                      root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                      workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                      exitStatus = 4;
                      break a;
                    }
                    renderWasConcurrent = workInProgressRootRecoverableErrors;
                    workInProgressRootRecoverableErrors = exitStatus;
                    null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                      workInProgressRootRecoverableErrors,
                      renderWasConcurrent
                    ));
                  }
                  exitStatus = JSCompiler_inline_result;
                }
                renderWasConcurrent = false;
                if (2 !== exitStatus) continue;
              }
            }
            if (1 === exitStatus) {
              prepareFreshStack(root$jscomp$0, 0);
              markRootSuspended(root$jscomp$0, lanes, 0, true);
              break;
            }
            a: {
              shouldTimeSlice = root$jscomp$0;
              renderWasConcurrent = exitStatus;
              switch (renderWasConcurrent) {
                case 0:
                case 1:
                  throw Error(formatProdErrorMessage(345));
                case 4:
                  if ((lanes & 4194048) !== lanes) break;
                case 6:
                  markRootSuspended(
                    shouldTimeSlice,
                    lanes,
                    workInProgressDeferredLane,
                    !workInProgressRootDidSkipSuspendedSiblings
                  );
                  break a;
                case 2:
                  workInProgressRootRecoverableErrors = null;
                  break;
                case 3:
                case 5:
                  break;
                default:
                  throw Error(formatProdErrorMessage(329));
              }
              if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
                markRootSuspended(
                  shouldTimeSlice,
                  lanes,
                  workInProgressDeferredLane,
                  !workInProgressRootDidSkipSuspendedSiblings
                );
                if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
                pendingEffectsLanes = lanes;
                shouldTimeSlice.timeoutHandle = scheduleTimeout(
                  commitRootWhenReady.bind(
                    null,
                    shouldTimeSlice,
                    forceSync,
                    workInProgressRootRecoverableErrors,
                    workInProgressTransitions,
                    workInProgressRootDidIncludeRecursiveRenderUpdate,
                    lanes,
                    workInProgressDeferredLane,
                    workInProgressRootInterleavedUpdatedLanes,
                    workInProgressSuspendedRetryLanes,
                    workInProgressRootDidSkipSuspendedSiblings,
                    renderWasConcurrent,
                    "Throttled",
                    -0,
                    0
                  ),
                  exitStatus
                );
                break a;
              }
              commitRootWhenReady(
                shouldTimeSlice,
                forceSync,
                workInProgressRootRecoverableErrors,
                workInProgressTransitions,
                workInProgressRootDidIncludeRecursiveRenderUpdate,
                lanes,
                workInProgressDeferredLane,
                workInProgressRootInterleavedUpdatedLanes,
                workInProgressSuspendedRetryLanes,
                workInProgressRootDidSkipSuspendedSiblings,
                renderWasConcurrent,
                null,
                -0,
                0
              );
            }
          }
          break;
        } while (1);
        ensureRootIsScheduled(root$jscomp$0);
      }
      function commitRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
        root2.timeoutHandle = -1;
        suspendedCommitReason = finishedWork.subtreeFlags;
        if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
          suspendedCommitReason = {
            stylesheets: null,
            count: 0,
            imgCount: 0,
            imgBytes: 0,
            suspenseyImages: [],
            waitingForImages: true,
            waitingForViewTransition: false,
            unsuspend: noop$1
          };
          accumulateSuspenseyCommitOnFiber(
            finishedWork,
            lanes,
            suspendedCommitReason
          );
          var timeoutOffset = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0;
          timeoutOffset = waitForCommitToBeReady(
            suspendedCommitReason,
            timeoutOffset
          );
          if (null !== timeoutOffset) {
            pendingEffectsLanes = lanes;
            root2.cancelPendingCommit = timeoutOffset(
              commitRoot.bind(
                null,
                root2,
                finishedWork,
                lanes,
                recoverableErrors,
                transitions,
                didIncludeRenderPhaseUpdate,
                spawnedLane,
                updatedLanes,
                suspendedRetryLanes,
                exitStatus,
                suspendedCommitReason,
                null,
                completedRenderStartTime,
                completedRenderEndTime
              )
            );
            markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
            return;
          }
        }
        commitRoot(
          root2,
          finishedWork,
          lanes,
          recoverableErrors,
          transitions,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes
        );
      }
      function isRenderConsistentWithExternalStores(finishedWork) {
        for (var node = finishedWork; ; ) {
          var tag = node.tag;
          if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
            for (var i = 0; i < tag.length; i++) {
              var check = tag[i], getSnapshot = check.getSnapshot;
              check = check.value;
              try {
                if (!objectIs(getSnapshot(), check)) return false;
              } catch (error) {
                return false;
              }
            }
          tag = node.child;
          if (node.subtreeFlags & 16384 && null !== tag)
            tag.return = node, node = tag;
          else {
            if (node === finishedWork) break;
            for (; null === node.sibling; ) {
              if (null === node.return || node.return === finishedWork) return true;
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        return true;
      }
      function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
        suspendedLanes &= ~workInProgressRootPingedLanes;
        suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
        root2.suspendedLanes |= suspendedLanes;
        root2.pingedLanes &= ~suspendedLanes;
        didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
        didAttemptEntireTree = root2.expirationTimes;
        for (var lanes = suspendedLanes; 0 < lanes; ) {
          var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
          didAttemptEntireTree[index$6] = -1;
          lanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
      }
      function flushSyncWork$1() {
        return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0, false), false) : true;
      }
      function resetWorkInProgressStack() {
        if (null !== workInProgress) {
          if (0 === workInProgressSuspendedReason)
            var interruptedWork = workInProgress.return;
          else
            interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
          for (; null !== interruptedWork; )
            unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
          workInProgress = null;
        }
      }
      function prepareFreshStack(root2, lanes) {
        var timeoutHandle = root2.timeoutHandle;
        -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
        timeoutHandle = root2.cancelPendingCommit;
        null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
        pendingEffectsLanes = 0;
        resetWorkInProgressStack();
        workInProgressRoot = root2;
        workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
        workInProgressRootRenderLanes = lanes;
        workInProgressSuspendedReason = 0;
        workInProgressThrownValue = null;
        workInProgressRootDidSkipSuspendedSiblings = false;
        workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
        workInProgressRootDidAttachPingListener = false;
        workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
        workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
        workInProgressRootDidIncludeRecursiveRenderUpdate = false;
        0 !== (lanes & 8) && (lanes |= lanes & 32);
        var allEntangledLanes = root2.entangledLanes;
        if (0 !== allEntangledLanes)
          for (root2 = root2.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
            var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
            lanes |= root2[index$4];
            allEntangledLanes &= ~lane;
          }
        entangledRenderLanes = lanes;
        finishQueueingConcurrentUpdates();
        return timeoutHandle;
      }
      function handleThrow(root2, thrownValue) {
        currentlyRenderingFiber = null;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
        workInProgressThrownValue = thrownValue;
        null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
          root2,
          createCapturedValueAtFiber(thrownValue, root2.current)
        ));
      }
      function shouldRemainOnPreviousScreen() {
        var handler = suspenseHandlerStackCursor.current;
        return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
      }
      function pushDispatcher() {
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
      }
      function pushAsyncDispatcher() {
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        return prevAsyncDispatcher;
      }
      function renderDidSuspendDelayIfPossible() {
        workInProgressRootExitStatus = 4;
        workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
        0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
          workInProgressRoot,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          false
        );
      }
      function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
          workInProgressTransitions = null, prepareFreshStack(root2, lanes);
        lanes = false;
        var exitStatus = workInProgressRootExitStatus;
        a: do
          try {
            if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
              var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case 8:
                  resetWorkInProgressStack();
                  exitStatus = 6;
                  break a;
                case 3:
                case 2:
                case 9:
                case 6:
                  null === suspenseHandlerStackCursor.current && (lanes = true);
                  var reason = workInProgressSuspendedReason;
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
                  if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    exitStatus = 0;
                    break a;
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              }
            }
            workLoopSync();
            exitStatus = workInProgressRootExitStatus;
            break;
          } catch (thrownValue$165) {
            handleThrow(root2, thrownValue$165);
          }
        while (1);
        lanes && root2.shellSuspendCounter++;
        lastContextDependency = currentlyRenderingFiber$1 = null;
        executionContext = prevExecutionContext;
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
        return exitStatus;
      }
      function workLoopSync() {
        for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
      }
      function renderRootConcurrent(root2, lanes) {
        var prevExecutionContext = executionContext;
        executionContext |= 2;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
          root2,
          lanes
        );
        a: do
          try {
            if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
              lanes = workInProgress;
              var thrownValue = workInProgressThrownValue;
              b: switch (workInProgressSuspendedReason) {
                case 1:
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
                  break;
                case 2:
                case 9:
                  if (isThenableResolved(thrownValue)) {
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    replaySuspendedUnitOfWork(lanes);
                    break;
                  }
                  lanes = function() {
                    2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                    ensureRootIsScheduled(root2);
                  };
                  thrownValue.then(lanes, lanes);
                  break a;
                case 3:
                  workInProgressSuspendedReason = 7;
                  break a;
                case 4:
                  workInProgressSuspendedReason = 5;
                  break a;
                case 7:
                  isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
                  break;
                case 5:
                  var resource = null;
                  switch (workInProgress.tag) {
                    case 26:
                      resource = workInProgress.memoizedState;
                    case 5:
                    case 27:
                      var hostFiber = workInProgress;
                      if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                        workInProgressSuspendedReason = 0;
                        workInProgressThrownValue = null;
                        var sibling = hostFiber.sibling;
                        if (null !== sibling) workInProgress = sibling;
                        else {
                          var returnFiber = hostFiber.return;
                          null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                        }
                        break b;
                      }
                  }
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
                  break;
                case 6:
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
                  break;
                case 8:
                  resetWorkInProgressStack();
                  workInProgressRootExitStatus = 6;
                  break a;
                default:
                  throw Error(formatProdErrorMessage(462));
              }
            }
            workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue$167) {
            handleThrow(root2, thrownValue$167);
          }
        while (1);
        lastContextDependency = currentlyRenderingFiber$1 = null;
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        executionContext = prevExecutionContext;
        if (null !== workInProgress) return 0;
        workInProgressRoot = null;
        workInProgressRootRenderLanes = 0;
        finishQueueingConcurrentUpdates();
        return workInProgressRootExitStatus;
      }
      function workLoopConcurrentByScheduler() {
        for (; null !== workInProgress && !shouldYield(); )
          performUnitOfWork(workInProgress);
      }
      function performUnitOfWork(unitOfWork) {
        var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function replaySuspendedUnitOfWork(unitOfWork) {
        var next = unitOfWork;
        var current = next.alternate;
        switch (next.tag) {
          case 15:
          case 0:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type,
              void 0,
              workInProgressRootRenderLanes
            );
            break;
          case 11:
            next = replayFunctionComponent(
              current,
              next,
              next.pendingProps,
              next.type.render,
              next.ref,
              workInProgressRootRenderLanes
            );
            break;
          case 5:
            resetHooksOnUnwind(next);
          default:
            unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
        }
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
        lastContextDependency = currentlyRenderingFiber$1 = null;
        resetHooksOnUnwind(unitOfWork);
        thenableState$1 = null;
        thenableIndexCounter$1 = 0;
        var returnFiber = unitOfWork.return;
        try {
          if (throwException(
            root2,
            returnFiber,
            unitOfWork,
            thrownValue,
            workInProgressRootRenderLanes
          )) {
            workInProgressRootExitStatus = 1;
            logUncaughtError(
              root2,
              createCapturedValueAtFiber(thrownValue, root2.current)
            );
            workInProgress = null;
            return;
          }
        } catch (error) {
          if (null !== returnFiber) throw workInProgress = returnFiber, error;
          workInProgressRootExitStatus = 1;
          logUncaughtError(
            root2,
            createCapturedValueAtFiber(thrownValue, root2.current)
          );
          workInProgress = null;
          return;
        }
        if (unitOfWork.flags & 32768) {
          if (isHydrating || 1 === suspendedReason) root2 = true;
          else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
            root2 = false;
          else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
            suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
          unwindUnitOfWork(unitOfWork, root2);
        } else completeUnitOfWork(unitOfWork);
      }
      function completeUnitOfWork(unitOfWork) {
        var completedWork = unitOfWork;
        do {
          if (0 !== (completedWork.flags & 32768)) {
            unwindUnitOfWork(
              completedWork,
              workInProgressRootDidSkipSuspendedSiblings
            );
            return;
          }
          unitOfWork = completedWork.return;
          var next = completeWork(
            completedWork.alternate,
            completedWork,
            entangledRenderLanes
          );
          if (null !== next) {
            workInProgress = next;
            return;
          }
          completedWork = completedWork.sibling;
          if (null !== completedWork) {
            workInProgress = completedWork;
            return;
          }
          workInProgress = completedWork = unitOfWork;
        } while (null !== completedWork);
        0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
      }
      function unwindUnitOfWork(unitOfWork, skipSiblings) {
        do {
          var next = unwindWork(unitOfWork.alternate, unitOfWork);
          if (null !== next) {
            next.flags &= 32767;
            workInProgress = next;
            return;
          }
          next = unitOfWork.return;
          null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
          if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
            workInProgress = unitOfWork;
            return;
          }
          workInProgress = unitOfWork = next;
        } while (null !== unitOfWork);
        workInProgressRootExitStatus = 6;
        workInProgress = null;
      }
      function commitRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
        root2.cancelPendingCommit = null;
        do
          flushPendingEffects();
        while (0 !== pendingEffectsStatus);
        if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
        if (null !== finishedWork) {
          if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
          didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
          didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
          markRootFinished(
            root2,
            lanes,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes
          );
          root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
          pendingFinishedWork = finishedWork;
          pendingEffectsRoot = root2;
          pendingEffectsLanes = lanes;
          pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
          pendingPassiveTransitions = transitions;
          pendingRecoverableErrors = recoverableErrors;
          0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
            flushPassiveEffects();
            return null;
          })) : (root2.callbackNode = null, root2.callbackPriority = 0);
          recoverableErrors = 0 !== (finishedWork.flags & 13878);
          if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
            recoverableErrors = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            transitions = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            spawnedLane = executionContext;
            executionContext |= 4;
            try {
              commitBeforeMutationEffects(root2, finishedWork, lanes);
            } finally {
              executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
            }
          }
          pendingEffectsStatus = 1;
          flushMutationEffects();
          flushLayoutEffects();
          flushSpawnedWork();
        }
      }
      function flushMutationEffects() {
        if (1 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
          if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
            rootMutationHasEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              commitMutationEffectsOnFiber(finishedWork, root2);
              var priorSelectionInformation = selectionInformation, curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
              if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
                priorFocusedElem.ownerDocument.documentElement,
                priorFocusedElem
              )) {
                if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
                  var start = priorSelectionRange.start, end = priorSelectionRange.end;
                  void 0 === end && (end = start);
                  if ("selectionStart" in priorFocusedElem)
                    priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                      end,
                      priorFocusedElem.value.length
                    );
                  else {
                    var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                    if (win.getSelection) {
                      var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                      !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                      var startMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        start$jscomp$0
                      ), endMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        end$jscomp$0
                      );
                      if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                        var range = doc.createRange();
                        range.setStart(startMarker.node, startMarker.offset);
                        selection.removeAllRanges();
                        start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                      }
                    }
                  }
                }
                doc = [];
                for (selection = priorFocusedElem; selection = selection.parentNode; )
                  1 === selection.nodeType && doc.push({
                    element: selection,
                    left: selection.scrollLeft,
                    top: selection.scrollTop
                  });
                "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
                for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
                  var info = doc[priorFocusedElem];
                  info.element.scrollLeft = info.left;
                  info.element.scrollTop = info.top;
                }
              }
              _enabled = !!eventsEnabled;
              selectionInformation = eventsEnabled = null;
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
            }
          }
          root2.current = finishedWork;
          pendingEffectsStatus = 2;
        }
      }
      function flushLayoutEffects() {
        if (2 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
          if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
            rootHasLayoutEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            try {
              commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
            }
          }
          pendingEffectsStatus = 3;
        }
      }
      function flushSpawnedWork() {
        if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
          pendingEffectsStatus = 0;
          requestPaint();
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
          0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
          var remainingLanes = root2.pendingLanes;
          0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
          lanesToEventPriority(lanes);
          finishedWork = finishedWork.stateNode;
          if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
            try {
              injectedHook.onCommitFiberRoot(
                rendererID,
                finishedWork,
                void 0,
                128 === (finishedWork.current.flags & 128)
              );
            } catch (err) {
            }
          if (null !== recoverableErrors) {
            finishedWork = ReactSharedInternals.T;
            remainingLanes = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = 2;
            ReactSharedInternals.T = null;
            try {
              for (var onRecoverableError = root2.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
                var recoverableError = recoverableErrors[i];
                onRecoverableError(recoverableError.value, {
                  componentStack: recoverableError.stack
                });
              }
            } finally {
              ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = remainingLanes;
            }
          }
          0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
          ensureRootIsScheduled(root2);
          remainingLanes = root2.pendingLanes;
          0 !== (lanes & 261930) && 0 !== (remainingLanes & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : nestedUpdateCount = 0;
          flushSyncWorkAcrossRoots_impl(0, false);
        }
      }
      function releaseRootPooledCache(root2, remainingLanes) {
        0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
      }
      function flushPendingEffects() {
        flushMutationEffects();
        flushLayoutEffects();
        flushSpawnedWork();
        return flushPassiveEffects();
      }
      function flushPassiveEffects() {
        if (5 !== pendingEffectsStatus) return false;
        var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
        pendingEffectsRemainingLanes = 0;
        var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
          ReactSharedInternals.T = null;
          renderPriority = pendingPassiveTransitions;
          pendingPassiveTransitions = null;
          var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
          pendingEffectsStatus = 0;
          pendingFinishedWork = pendingEffectsRoot = null;
          pendingEffectsLanes = 0;
          if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          commitPassiveUnmountOnFiber(root$jscomp$0.current);
          commitPassiveMountOnFiber(
            root$jscomp$0,
            root$jscomp$0.current,
            lanes,
            renderPriority
          );
          executionContext = prevExecutionContext;
          flushSyncWorkAcrossRoots_impl(0, false);
          if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
            try {
              injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
            } catch (err) {
            }
          return true;
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
        }
      }
      function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
        sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
        sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
        rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
        null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
      }
      function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
        if (3 === sourceFiber.tag)
          captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
        else
          for (; null !== nearestMountedAncestor; ) {
            if (3 === nearestMountedAncestor.tag) {
              captureCommitPhaseErrorOnRoot(
                nearestMountedAncestor,
                sourceFiber,
                error
              );
              break;
            } else if (1 === nearestMountedAncestor.tag) {
              var instance = nearestMountedAncestor.stateNode;
              if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
                sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
                error = createClassErrorUpdate(2);
                instance = enqueueUpdate(nearestMountedAncestor, error, 2);
                null !== instance && (initializeClassErrorUpdate(
                  error,
                  instance,
                  nearestMountedAncestor,
                  sourceFiber
                ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
                break;
              }
            }
            nearestMountedAncestor = nearestMountedAncestor.return;
          }
      }
      function attachPingListener(root2, wakeable, lanes) {
        var pingCache = root2.pingCache;
        if (null === pingCache) {
          pingCache = root2.pingCache = new PossiblyWeakMap();
          var threadIDs = /* @__PURE__ */ new Set();
          pingCache.set(wakeable, threadIDs);
        } else
          threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
        threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
      }
      function pingSuspendedRoot(root2, wakeable, pingedLanes) {
        var pingCache = root2.pingCache;
        null !== pingCache && pingCache.delete(wakeable);
        root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
        root2.warmLanes &= ~pingedLanes;
        workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
        ensureRootIsScheduled(root2);
      }
      function retryTimedOutBoundary(boundaryFiber, retryLane) {
        0 === retryLane && (retryLane = claimNextRetryLane());
        boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
        null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
      }
      function retryDehydratedSuspenseBoundary(boundaryFiber) {
        var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function resolveRetryWakeable(boundaryFiber, wakeable) {
        var retryLane = 0;
        switch (boundaryFiber.tag) {
          case 31:
          case 13:
            var retryCache = boundaryFiber.stateNode;
            var suspenseState = boundaryFiber.memoizedState;
            null !== suspenseState && (retryLane = suspenseState.retryLane);
            break;
          case 19:
            retryCache = boundaryFiber.stateNode;
            break;
          case 22:
            retryCache = boundaryFiber.stateNode._retryCache;
            break;
          default:
            throw Error(formatProdErrorMessage(314));
        }
        null !== retryCache && retryCache.delete(wakeable);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function scheduleCallback$1(priorityLevel, callback) {
        return scheduleCallback$3(priorityLevel, callback);
      }
      var firstScheduledRoot = null;
      var lastScheduledRoot = null;
      var didScheduleMicrotask = false;
      var mightHavePendingSyncWork = false;
      var isFlushingWork = false;
      var currentEventTransitionLane = 0;
      function ensureRootIsScheduled(root2) {
        root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
        mightHavePendingSyncWork = true;
        didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
      }
      function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
        if (!isFlushingWork && mightHavePendingSyncWork) {
          isFlushingWork = true;
          do {
            var didPerformSomeWork = false;
            for (var root$170 = firstScheduledRoot; null !== root$170; ) {
              if (!onlyLegacy)
                if (0 !== syncTransitionLanes) {
                  var pendingLanes = root$170.pendingLanes;
                  if (0 === pendingLanes) var JSCompiler_inline_result = 0;
                  else {
                    var suspendedLanes = root$170.suspendedLanes, pingedLanes = root$170.pingedLanes;
                    JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                    JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                    JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
                  }
                  0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
                } else
                  JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
                    root$170,
                    root$170 === workInProgressRoot ? JSCompiler_inline_result : 0,
                    null !== root$170.cancelPendingCommit || -1 !== root$170.timeoutHandle
                  ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$170, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
              root$170 = root$170.next;
            }
          } while (didPerformSomeWork);
          isFlushingWork = false;
        }
      }
      function processRootScheduleInImmediateTask() {
        processRootScheduleInMicrotask();
      }
      function processRootScheduleInMicrotask() {
        mightHavePendingSyncWork = didScheduleMicrotask = false;
        var syncTransitionLanes = 0;
        0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
        for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
          var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
          if (0 === nextLanes)
            root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
          else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
            mightHavePendingSyncWork = true;
          root2 = next;
        }
        0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, false);
        0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
      }
      function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
        for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
          var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
          if (-1 === expirationTime) {
            if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
              expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
          } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
          lanes &= ~lane;
        }
        currentTime = workInProgressRoot;
        suspendedLanes = workInProgressRootRenderLanes;
        suspendedLanes = getNextLanes(
          root2,
          root2 === currentTime ? suspendedLanes : 0,
          null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
        );
        pingedLanes = root2.callbackNode;
        if (0 === suspendedLanes || root2 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root2.cancelPendingCommit)
          return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
        if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
          currentTime = suspendedLanes & -suspendedLanes;
          if (currentTime === root2.callbackPriority) return currentTime;
          null !== pingedLanes && cancelCallback$1(pingedLanes);
          switch (lanesToEventPriority(suspendedLanes)) {
            case 2:
            case 8:
              suspendedLanes = UserBlockingPriority;
              break;
            case 32:
              suspendedLanes = NormalPriority$1;
              break;
            case 268435456:
              suspendedLanes = IdlePriority;
              break;
            default:
              suspendedLanes = NormalPriority$1;
          }
          pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
          suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
          root2.callbackPriority = currentTime;
          root2.callbackNode = suspendedLanes;
          return currentTime;
        }
        null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
        root2.callbackPriority = 2;
        root2.callbackNode = null;
        return 2;
      }
      function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
        if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
          return root2.callbackNode = null, root2.callbackPriority = 0, null;
        var originalCallbackNode = root2.callbackNode;
        if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
          return null;
        var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
        workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
          root2,
          root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
          null !== root2.cancelPendingCommit || -1 !== root2.timeoutHandle
        );
        if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
        performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
        scheduleTaskForRootDuringMicrotask(root2, now());
        return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
      }
      function performSyncWorkOnRoot(root2, lanes) {
        if (flushPendingEffects()) return null;
        performWorkOnRoot(root2, lanes, true);
      }
      function scheduleImmediateRootScheduleTask() {
        scheduleMicrotask(function() {
          0 !== (executionContext & 6) ? scheduleCallback$3(
            ImmediatePriority,
            processRootScheduleInImmediateTask
          ) : processRootScheduleInMicrotask();
        });
      }
      function requestTransitionLane() {
        if (0 === currentEventTransitionLane) {
          var actionScopeLane = currentEntangledLane;
          0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
          currentEventTransitionLane = actionScopeLane;
        }
        return currentEventTransitionLane;
      }
      function coerceFormActionProp(actionProp) {
        return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL("" + actionProp);
      }
      function createFormDataWithSubmitter(form, submitter) {
        var temp = submitter.ownerDocument.createElement("input");
        temp.name = submitter.name;
        temp.value = submitter.value;
        form.id && temp.setAttribute("form", form.id);
        submitter.parentNode.insertBefore(temp, submitter);
        form = new FormData(form);
        temp.parentNode.removeChild(temp);
        return form;
      }
      function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
        if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
          var action = coerceFormActionProp(
            (nativeEventTarget[internalPropsKey] || null).action
          ), submitter = nativeEvent.submitter;
          submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
          var event = new SyntheticEvent(
            "action",
            "action",
            null,
            nativeEvent,
            nativeEventTarget
          );
          dispatchQueue.push({
            event,
            listeners: [
              {
                instance: null,
                listener: function() {
                  if (nativeEvent.defaultPrevented) {
                    if (0 !== currentEventTransitionLane) {
                      var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
                      startHostTransition(
                        maybeTargetInst,
                        {
                          pending: true,
                          data: formData,
                          method: nativeEventTarget.method,
                          action
                        },
                        null,
                        formData
                      );
                    }
                  } else
                    "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(
                      maybeTargetInst,
                      {
                        pending: true,
                        data: formData,
                        method: nativeEventTarget.method,
                        action
                      },
                      action,
                      formData
                    ));
                },
                currentTarget: nativeEventTarget
              }
            ]
          });
        }
      }
      for (i$jscomp$inline_1577 = 0; i$jscomp$inline_1577 < simpleEventPluginEvents.length; i$jscomp$inline_1577++) {
        eventName$jscomp$inline_1578 = simpleEventPluginEvents[i$jscomp$inline_1577], domEventName$jscomp$inline_1579 = eventName$jscomp$inline_1578.toLowerCase(), capitalizedEvent$jscomp$inline_1580 = eventName$jscomp$inline_1578[0].toUpperCase() + eventName$jscomp$inline_1578.slice(1);
        registerSimpleEvent(
          domEventName$jscomp$inline_1579,
          "on" + capitalizedEvent$jscomp$inline_1580
        );
      }
      var eventName$jscomp$inline_1578;
      var domEventName$jscomp$inline_1579;
      var capitalizedEvent$jscomp$inline_1580;
      var i$jscomp$inline_1577;
      registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
      registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
      registerSimpleEvent(ANIMATION_START, "onAnimationStart");
      registerSimpleEvent("dblclick", "onDoubleClick");
      registerSimpleEvent("focusin", "onFocus");
      registerSimpleEvent("focusout", "onBlur");
      registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
      registerSimpleEvent(TRANSITION_START, "onTransitionStart");
      registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
      registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
      registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
      registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
      registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
      registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
      registerTwoPhaseEvent(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(" ")
      );
      registerTwoPhaseEvent(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      );
      registerTwoPhaseEvent("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
      ]);
      registerTwoPhaseEvent(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
      var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      );
      var nonDelegatedEvents = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
      );
      function processDispatchQueue(dispatchQueue, eventSystemFlags) {
        eventSystemFlags = 0 !== (eventSystemFlags & 4);
        for (var i = 0; i < dispatchQueue.length; i++) {
          var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
          _dispatchQueue$i = _dispatchQueue$i.listeners;
          a: {
            var previousInstance = void 0;
            if (eventSystemFlags)
              for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
                var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i;
                event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null;
                previousInstance = instance;
              }
            else
              for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
                _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
                instance = _dispatchListeners$i.instance;
                currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                previousInstance = _dispatchListeners$i;
                event.currentTarget = currentTarget;
                try {
                  previousInstance(event);
                } catch (error) {
                  reportGlobalError(error);
                }
                event.currentTarget = null;
                previousInstance = instance;
              }
          }
        }
      }
      function listenToNonDelegatedEvent(domEventName, targetElement) {
        var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
        void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
        var listenerSetKey = domEventName + "__bubble";
        JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
      }
      function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
        var eventSystemFlags = 0;
        isCapturePhaseListener && (eventSystemFlags |= 4);
        addTrappedEventListener(
          target,
          domEventName,
          eventSystemFlags,
          isCapturePhaseListener
        );
      }
      var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
      function listenToAllSupportedEvents(rootContainerElement) {
        if (!rootContainerElement[listeningMarker]) {
          rootContainerElement[listeningMarker] = true;
          allNativeEvents.forEach(function(domEventName) {
            "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
          });
          var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
          null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
        }
      }
      function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
        switch (getEventPriority(domEventName)) {
          case 2:
            var listenerWrapper = dispatchDiscreteEvent;
            break;
          case 8:
            listenerWrapper = dispatchContinuousEvent;
            break;
          default:
            listenerWrapper = dispatchEvent;
        }
        eventSystemFlags = listenerWrapper.bind(
          null,
          domEventName,
          eventSystemFlags,
          targetContainer
        );
        listenerWrapper = void 0;
        !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
        isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          capture: true,
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
      }
      function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
        var ancestorInst = targetInst$jscomp$0;
        if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
          a: for (; ; ) {
            if (null === targetInst$jscomp$0) return;
            var nodeTag = targetInst$jscomp$0.tag;
            if (3 === nodeTag || 4 === nodeTag) {
              var container = targetInst$jscomp$0.stateNode.containerInfo;
              if (container === targetContainer) break;
              if (4 === nodeTag)
                for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
                  var grandTag = nodeTag.tag;
                  if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                    return;
                  nodeTag = nodeTag.return;
                }
              for (; null !== container; ) {
                nodeTag = getClosestInstanceFromNode(container);
                if (null === nodeTag) return;
                grandTag = nodeTag.tag;
                if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
                  targetInst$jscomp$0 = ancestorInst = nodeTag;
                  continue a;
                }
                container = container.parentNode;
              }
            }
            targetInst$jscomp$0 = targetInst$jscomp$0.return;
          }
        batchedUpdates$1(function() {
          var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
          a: {
            var reactName = topLevelEventsToReactNames.get(domEventName);
            if (void 0 !== reactName) {
              var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
              switch (domEventName) {
                case "keypress":
                  if (0 === getEventCharCode(nativeEvent)) break a;
                case "keydown":
                case "keyup":
                  SyntheticEventCtor = SyntheticKeyboardEvent;
                  break;
                case "focusin":
                  reactEventType = "focus";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "focusout":
                  reactEventType = "blur";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "beforeblur":
                case "afterblur":
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "click":
                  if (2 === nativeEvent.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  SyntheticEventCtor = SyntheticMouseEvent;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  SyntheticEventCtor = SyntheticDragEvent;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  SyntheticEventCtor = SyntheticTouchEvent;
                  break;
                case ANIMATION_END:
                case ANIMATION_ITERATION:
                case ANIMATION_START:
                  SyntheticEventCtor = SyntheticAnimationEvent;
                  break;
                case TRANSITION_END:
                  SyntheticEventCtor = SyntheticTransitionEvent;
                  break;
                case "scroll":
                case "scrollend":
                  SyntheticEventCtor = SyntheticUIEvent;
                  break;
                case "wheel":
                  SyntheticEventCtor = SyntheticWheelEvent;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  SyntheticEventCtor = SyntheticClipboardEvent;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  SyntheticEventCtor = SyntheticPointerEvent;
                  break;
                case "toggle":
                case "beforetoggle":
                  SyntheticEventCtor = SyntheticToggleEvent;
              }
              var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
              inCapturePhase = [];
              for (var instance = targetInst, lastHostComponent; null !== instance; ) {
                var _instance = instance;
                lastHostComponent = _instance.stateNode;
                _instance = _instance.tag;
                5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
                  createDispatchListener(instance, _instance, lastHostComponent)
                ));
                if (accumulateTargetOnly) break;
                instance = instance.return;
              }
              0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
                reactName,
                reactEventType,
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
            }
          }
          if (0 === (eventSystemFlags & 7)) {
            a: {
              reactName = "mouseover" === domEventName || "pointerover" === domEventName;
              SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
              if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
                break a;
              if (SyntheticEventCtor || reactName) {
                reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
                if (SyntheticEventCtor) {
                  if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                    reactEventType = null;
                } else SyntheticEventCtor = null, reactEventType = targetInst;
                if (SyntheticEventCtor !== reactEventType) {
                  inCapturePhase = SyntheticMouseEvent;
                  _instance = "onMouseLeave";
                  reactEventName = "onMouseEnter";
                  instance = "mouse";
                  if ("pointerout" === domEventName || "pointerover" === domEventName)
                    inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
                  accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
                  lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
                  reactName = new inCapturePhase(
                    _instance,
                    instance + "leave",
                    SyntheticEventCtor,
                    nativeEvent,
                    nativeEventTarget
                  );
                  reactName.target = accumulateTargetOnly;
                  reactName.relatedTarget = lastHostComponent;
                  _instance = null;
                  getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                    reactEventName,
                    instance + "enter",
                    reactEventType,
                    nativeEvent,
                    nativeEventTarget
                  ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
                  accumulateTargetOnly = _instance;
                  if (SyntheticEventCtor && reactEventType)
                    b: {
                      inCapturePhase = getParent;
                      reactEventName = SyntheticEventCtor;
                      instance = reactEventType;
                      lastHostComponent = 0;
                      for (_instance = reactEventName; _instance; _instance = inCapturePhase(_instance))
                        lastHostComponent++;
                      _instance = 0;
                      for (var tempB = instance; tempB; tempB = inCapturePhase(tempB))
                        _instance++;
                      for (; 0 < lastHostComponent - _instance; )
                        reactEventName = inCapturePhase(reactEventName), lastHostComponent--;
                      for (; 0 < _instance - lastHostComponent; )
                        instance = inCapturePhase(instance), _instance--;
                      for (; lastHostComponent--; ) {
                        if (reactEventName === instance || null !== instance && reactEventName === instance.alternate) {
                          inCapturePhase = reactEventName;
                          break b;
                        }
                        reactEventName = inCapturePhase(reactEventName);
                        instance = inCapturePhase(instance);
                      }
                      inCapturePhase = null;
                    }
                  else inCapturePhase = null;
                  null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    reactName,
                    SyntheticEventCtor,
                    inCapturePhase,
                    false
                  );
                  null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    accumulateTargetOnly,
                    reactEventType,
                    inCapturePhase,
                    true
                  );
                }
              }
            }
            a: {
              reactName = targetInst ? getNodeFromInstance(targetInst) : window;
              SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
              if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
                var getTargetInstFunc = getTargetInstForChangeEvent;
              else if (isTextInputElement(reactName))
                if (isInputEventSupported)
                  getTargetInstFunc = getTargetInstForInputOrChangeEvent;
                else {
                  getTargetInstFunc = getTargetInstForInputEventPolyfill;
                  var handleEventFunc = handleEventsForInputEventPolyfill;
                }
              else
                SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
              if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
                createAndAccumulateChangeEvent(
                  dispatchQueue,
                  getTargetInstFunc,
                  nativeEvent,
                  nativeEventTarget
                );
                break a;
              }
              handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
              "focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
            }
            handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
            switch (domEventName) {
              case "focusin":
                if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
                  activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
                break;
              case "focusout":
                lastSelection = activeElementInst = activeElement = null;
                break;
              case "mousedown":
                mouseDown = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                mouseDown = false;
                constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
                break;
              case "selectionchange":
                if (skipSelectionChangeEvent) break;
              case "keydown":
              case "keyup":
                constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
            }
            var fallbackData;
            if (canUseCompositionEvent)
              b: {
                switch (domEventName) {
                  case "compositionstart":
                    var eventType = "onCompositionStart";
                    break b;
                  case "compositionend":
                    eventType = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    eventType = "onCompositionUpdate";
                    break b;
                }
                eventType = void 0;
              }
            else
              isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
            eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
              eventType,
              domEventName,
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
            if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
              eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
                "onBeforeInput",
                "beforeinput",
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({
                event: handleEventFunc,
                listeners: eventType
              }), handleEventFunc.data = fallbackData);
            extractEvents$1(
              dispatchQueue,
              domEventName,
              targetInst,
              nativeEvent,
              nativeEventTarget
            );
          }
          processDispatchQueue(dispatchQueue, eventSystemFlags);
        });
      }
      function createDispatchListener(instance, listener, currentTarget) {
        return {
          instance,
          listener,
          currentTarget
        };
      }
      function accumulateTwoPhaseListeners(targetFiber, reactName) {
        for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
          var _instance2 = targetFiber, stateNode = _instance2.stateNode;
          _instance2 = _instance2.tag;
          5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
            createDispatchListener(targetFiber, _instance2, stateNode)
          ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
            createDispatchListener(targetFiber, _instance2, stateNode)
          ));
          if (3 === targetFiber.tag) return listeners;
          targetFiber = targetFiber.return;
        }
        return [];
      }
      function getParent(inst) {
        if (null === inst) return null;
        do
          inst = inst.return;
        while (inst && 5 !== inst.tag && 27 !== inst.tag);
        return inst ? inst : null;
      }
      function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
        for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
          var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
          _instance3 = _instance3.tag;
          if (null !== alternate && alternate === common) break;
          5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
            createDispatchListener(target, stateNode, alternate)
          )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
            createDispatchListener(target, stateNode, alternate)
          )));
          target = target.return;
        }
        0 !== listeners.length && dispatchQueue.push({ event, listeners });
      }
      var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
      var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
      function normalizeMarkupForTextOrAttribute(markup) {
        return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
      }
      function checkForUnmatchedText(serverText, clientText) {
        clientText = normalizeMarkupForTextOrAttribute(clientText);
        return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
      }
      function setProp(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "children":
            "string" === typeof value ? "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && "body" !== tag && setTextContent(domElement, "" + value);
            break;
          case "className":
            setValueForKnownAttribute(domElement, "class", value);
            break;
          case "tabIndex":
            setValueForKnownAttribute(domElement, "tabindex", value);
            break;
          case "dir":
          case "role":
          case "viewBox":
          case "width":
          case "height":
            setValueForKnownAttribute(domElement, key, value);
            break;
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "data":
            if ("object" !== tag) {
              setValueForKnownAttribute(domElement, "data", value);
              break;
            }
          case "src":
          case "href":
            if ("" === value && ("a" !== tag || "href" !== key)) {
              domElement.removeAttribute(key);
              break;
            }
            if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL("" + value);
            domElement.setAttribute(key, value);
            break;
          case "action":
          case "formAction":
            if ("function" === typeof value) {
              domElement.setAttribute(
                key,
                "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
              );
              break;
            } else
              "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
                domElement,
                tag,
                "formEncType",
                props.formEncType,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formMethod",
                props.formMethod,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formTarget",
                props.formTarget,
                props,
                null
              )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
            if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            value = sanitizeURL("" + value);
            domElement.setAttribute(key, value);
            break;
          case "onClick":
            null != value && (domElement.onclick = noop$1);
            break;
          case "onScroll":
            null != value && listenToNonDelegatedEvent("scroll", domElement);
            break;
          case "onScrollEnd":
            null != value && listenToNonDelegatedEvent("scrollend", domElement);
            break;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              key = value.__html;
              if (null != key) {
                if (null != props.children) throw Error(formatProdErrorMessage(60));
                domElement.innerHTML = key;
              }
            }
            break;
          case "multiple":
            domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "muted":
            domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "ref":
            break;
          case "autoFocus":
            break;
          case "xlinkHref":
            if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
              domElement.removeAttribute("xlink:href");
              break;
            }
            key = sanitizeURL("" + value);
            domElement.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "xlink:href",
              key
            );
            break;
          case "contentEditable":
          case "spellCheck":
          case "draggable":
          case "value":
          case "autoReverse":
          case "externalResourcesRequired":
          case "focusable":
          case "preserveAlpha":
            null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
            break;
          case "inert":
          case "allowFullScreen":
          case "async":
          case "autoPlay":
          case "controls":
          case "default":
          case "defer":
          case "disabled":
          case "disablePictureInPicture":
          case "disableRemotePlayback":
          case "formNoValidate":
          case "hidden":
          case "loop":
          case "noModule":
          case "noValidate":
          case "open":
          case "playsInline":
          case "readOnly":
          case "required":
          case "reversed":
          case "scoped":
          case "seamless":
          case "itemScope":
            value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
            break;
          case "capture":
          case "download":
            true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "cols":
          case "rows":
          case "size":
          case "span":
            null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
            break;
          case "rowSpan":
          case "start":
            null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
            break;
          case "popover":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            setValueForAttribute(domElement, "popover", value);
            break;
          case "xlinkActuate":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:actuate",
              value
            );
            break;
          case "xlinkArcrole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:arcrole",
              value
            );
            break;
          case "xlinkRole":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:role",
              value
            );
            break;
          case "xlinkShow":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:show",
              value
            );
            break;
          case "xlinkTitle":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:title",
              value
            );
            break;
          case "xlinkType":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/1999/xlink",
              "xlink:type",
              value
            );
            break;
          case "xmlBase":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:base",
              value
            );
            break;
          case "xmlLang":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:lang",
              value
            );
            break;
          case "xmlSpace":
            setValueForNamespacedAttribute(
              domElement,
              "http://www.w3.org/XML/1998/namespace",
              "xml:space",
              value
            );
            break;
          case "is":
            setValueForAttribute(domElement, "is", value);
            break;
          case "innerText":
          case "textContent":
            break;
          default:
            if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
              key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
        }
      }
      function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(formatProdErrorMessage(61));
              key = value.__html;
              if (null != key) {
                if (null != props.children) throw Error(formatProdErrorMessage(60));
                domElement.innerHTML = key;
              }
            }
            break;
          case "children":
            "string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
            break;
          case "onScroll":
            null != value && listenToNonDelegatedEvent("scroll", domElement);
            break;
          case "onScrollEnd":
            null != value && listenToNonDelegatedEvent("scrollend", domElement);
            break;
          case "onClick":
            null != value && (domElement.onclick = noop$1);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "innerHTML":
          case "ref":
            break;
          case "innerText":
          case "textContent":
            break;
          default:
            if (!registrationNameDependencies.hasOwnProperty(key))
              a: {
                if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
                  "function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
                  domElement.addEventListener(tag, value, props);
                  break a;
                }
                key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
              }
        }
      }
      function setInitialProperties(domElement, tag, props) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "img":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            var hasSrc = false, hasSrcSet = false, propKey;
            for (propKey in props)
              if (props.hasOwnProperty(propKey)) {
                var propValue = props[propKey];
                if (null != propValue)
                  switch (propKey) {
                    case "src":
                      hasSrc = true;
                      break;
                    case "srcSet":
                      hasSrcSet = true;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(formatProdErrorMessage(137, tag));
                    default:
                      setProp(domElement, tag, propKey, propValue, props, null);
                  }
              }
            hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
            hasSrc && setProp(domElement, tag, "src", props.src, props, null);
            return;
          case "input":
            listenToNonDelegatedEvent("invalid", domElement);
            var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
            for (hasSrc in props)
              if (props.hasOwnProperty(hasSrc)) {
                var propValue$184 = props[hasSrc];
                if (null != propValue$184)
                  switch (hasSrc) {
                    case "name":
                      hasSrcSet = propValue$184;
                      break;
                    case "type":
                      propValue = propValue$184;
                      break;
                    case "checked":
                      checked = propValue$184;
                      break;
                    case "defaultChecked":
                      defaultChecked = propValue$184;
                      break;
                    case "value":
                      propKey = propValue$184;
                      break;
                    case "defaultValue":
                      defaultValue = propValue$184;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (null != propValue$184)
                        throw Error(formatProdErrorMessage(137, tag));
                      break;
                    default:
                      setProp(domElement, tag, hasSrc, propValue$184, props, null);
                  }
              }
            initInput(
              domElement,
              propKey,
              defaultValue,
              checked,
              defaultChecked,
              propValue,
              hasSrcSet,
              false
            );
            return;
          case "select":
            listenToNonDelegatedEvent("invalid", domElement);
            hasSrc = propValue = propKey = null;
            for (hasSrcSet in props)
              if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
                switch (hasSrcSet) {
                  case "value":
                    propKey = defaultValue;
                    break;
                  case "defaultValue":
                    propValue = defaultValue;
                    break;
                  case "multiple":
                    hasSrc = defaultValue;
                  default:
                    setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
                }
            tag = propKey;
            props = propValue;
            domElement.multiple = !!hasSrc;
            null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
            return;
          case "textarea":
            listenToNonDelegatedEvent("invalid", domElement);
            propKey = hasSrcSet = hasSrc = null;
            for (propValue in props)
              if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
                switch (propValue) {
                  case "value":
                    hasSrc = defaultValue;
                    break;
                  case "defaultValue":
                    hasSrcSet = defaultValue;
                    break;
                  case "children":
                    propKey = defaultValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    setProp(domElement, tag, propValue, defaultValue, props, null);
                }
            initTextarea(domElement, hasSrc, hasSrcSet, propKey);
            return;
          case "option":
            for (checked in props)
              if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
                switch (checked) {
                  case "selected":
                    domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                    break;
                  default:
                    setProp(domElement, tag, checked, hasSrc, props, null);
                }
            return;
          case "dialog":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            listenToNonDelegatedEvent("cancel", domElement);
            listenToNonDelegatedEvent("close", domElement);
            break;
          case "iframe":
          case "object":
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "video":
          case "audio":
            for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
              listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
            break;
          case "image":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", domElement);
            break;
          case "embed":
          case "source":
          case "link":
            listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
          case "area":
          case "base":
          case "br":
          case "col":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "track":
          case "wbr":
          case "menuitem":
            for (defaultChecked in props)
              if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
                switch (defaultChecked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(formatProdErrorMessage(137, tag));
                  default:
                    setProp(domElement, tag, defaultChecked, hasSrc, props, null);
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (propValue$184 in props)
                props.hasOwnProperty(propValue$184) && (hasSrc = props[propValue$184], void 0 !== hasSrc && setPropOnCustomElement(
                  domElement,
                  tag,
                  propValue$184,
                  hasSrc,
                  props,
                  void 0
                ));
              return;
            }
        }
        for (defaultValue in props)
          props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
      }
      function updateProperties(domElement, tag, lastProps, nextProps) {
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "input":
            var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
            for (propKey in lastProps) {
              var lastProp = lastProps[propKey];
              if (lastProps.hasOwnProperty(propKey) && null != lastProp)
                switch (propKey) {
                  case "checked":
                    break;
                  case "value":
                    break;
                  case "defaultValue":
                    lastDefaultValue = lastProp;
                  default:
                    nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
                }
            }
            for (var propKey$201 in nextProps) {
              var propKey = nextProps[propKey$201];
              lastProp = lastProps[propKey$201];
              if (nextProps.hasOwnProperty(propKey$201) && (null != propKey || null != lastProp))
                switch (propKey$201) {
                  case "type":
                    type = propKey;
                    break;
                  case "name":
                    name = propKey;
                    break;
                  case "checked":
                    checked = propKey;
                    break;
                  case "defaultChecked":
                    defaultChecked = propKey;
                    break;
                  case "value":
                    value = propKey;
                    break;
                  case "defaultValue":
                    defaultValue = propKey;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propKey)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    propKey !== lastProp && setProp(
                      domElement,
                      tag,
                      propKey$201,
                      propKey,
                      nextProps,
                      lastProp
                    );
                }
            }
            updateInput(
              domElement,
              value,
              defaultValue,
              lastDefaultValue,
              checked,
              defaultChecked,
              type,
              name
            );
            return;
          case "select":
            propKey = value = defaultValue = propKey$201 = null;
            for (type in lastProps)
              if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
                switch (type) {
                  case "value":
                    break;
                  case "multiple":
                    propKey = lastDefaultValue;
                  default:
                    nextProps.hasOwnProperty(type) || setProp(
                      domElement,
                      tag,
                      type,
                      null,
                      nextProps,
                      lastDefaultValue
                    );
                }
            for (name in nextProps)
              if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
                switch (name) {
                  case "value":
                    propKey$201 = type;
                    break;
                  case "defaultValue":
                    defaultValue = type;
                    break;
                  case "multiple":
                    value = type;
                  default:
                    type !== lastDefaultValue && setProp(
                      domElement,
                      tag,
                      name,
                      type,
                      nextProps,
                      lastDefaultValue
                    );
                }
            tag = defaultValue;
            lastProps = value;
            nextProps = propKey;
            null != propKey$201 ? updateOptions(domElement, !!lastProps, propKey$201, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
            return;
          case "textarea":
            propKey = propKey$201 = null;
            for (defaultValue in lastProps)
              if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
                switch (defaultValue) {
                  case "value":
                    break;
                  case "children":
                    break;
                  default:
                    setProp(domElement, tag, defaultValue, null, nextProps, name);
                }
            for (value in nextProps)
              if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
                switch (value) {
                  case "value":
                    propKey$201 = name;
                    break;
                  case "defaultValue":
                    propKey = name;
                    break;
                  case "children":
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != name) throw Error(formatProdErrorMessage(91));
                    break;
                  default:
                    name !== type && setProp(domElement, tag, value, name, nextProps, type);
                }
            updateTextarea(domElement, propKey$201, propKey);
            return;
          case "option":
            for (var propKey$217 in lastProps)
              if (propKey$201 = lastProps[propKey$217], lastProps.hasOwnProperty(propKey$217) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$217))
                switch (propKey$217) {
                  case "selected":
                    domElement.selected = false;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      propKey$217,
                      null,
                      nextProps,
                      propKey$201
                    );
                }
            for (lastDefaultValue in nextProps)
              if (propKey$201 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
                switch (lastDefaultValue) {
                  case "selected":
                    domElement.selected = propKey$201 && "function" !== typeof propKey$201 && "symbol" !== typeof propKey$201;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      lastDefaultValue,
                      propKey$201,
                      nextProps,
                      propKey
                    );
                }
            return;
          case "img":
          case "link":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
          case "menuitem":
            for (var propKey$222 in lastProps)
              propKey$201 = lastProps[propKey$222], lastProps.hasOwnProperty(propKey$222) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$222) && setProp(domElement, tag, propKey$222, null, nextProps, propKey$201);
            for (checked in nextProps)
              if (propKey$201 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
                switch (checked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propKey$201)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      checked,
                      propKey$201,
                      nextProps,
                      propKey
                    );
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (var propKey$227 in lastProps)
                propKey$201 = lastProps[propKey$227], lastProps.hasOwnProperty(propKey$227) && void 0 !== propKey$201 && !nextProps.hasOwnProperty(propKey$227) && setPropOnCustomElement(
                  domElement,
                  tag,
                  propKey$227,
                  void 0,
                  nextProps,
                  propKey$201
                );
              for (defaultChecked in nextProps)
                propKey$201 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$201 === propKey || void 0 === propKey$201 && void 0 === propKey || setPropOnCustomElement(
                  domElement,
                  tag,
                  defaultChecked,
                  propKey$201,
                  nextProps,
                  propKey
                );
              return;
            }
        }
        for (var propKey$232 in lastProps)
          propKey$201 = lastProps[propKey$232], lastProps.hasOwnProperty(propKey$232) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$232) && setProp(domElement, tag, propKey$232, null, nextProps, propKey$201);
        for (lastProp in nextProps)
          propKey$201 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$201 === propKey || null == propKey$201 && null == propKey || setProp(domElement, tag, lastProp, propKey$201, nextProps, propKey);
      }
      function isLikelyStaticResource(initiatorType) {
        switch (initiatorType) {
          case "css":
          case "script":
          case "font":
          case "img":
          case "image":
          case "input":
          case "link":
            return true;
          default:
            return false;
        }
      }
      function estimateBandwidth() {
        if ("function" === typeof performance.getEntriesByType) {
          for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
            var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
            if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
              initiatorType = 0;
              duration = entry.responseEnd;
              for (i += 1; i < resourceEntries.length; i++) {
                var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
                if (overlapStartTime > duration) break;
                var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
                overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
              }
              --i;
              bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
              count++;
              if (10 < count) break;
            }
          }
          if (0 < count) return bits / count / 1e6;
        }
        return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
      }
      var eventsEnabled = null;
      var selectionInformation = null;
      function getOwnerDocumentFromRootContainer(rootContainerElement) {
        return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      }
      function getOwnHostContext(namespaceURI) {
        switch (namespaceURI) {
          case "http://www.w3.org/2000/svg":
            return 1;
          case "http://www.w3.org/1998/Math/MathML":
            return 2;
          default:
            return 0;
        }
      }
      function getChildHostContextProd(parentNamespace, type) {
        if (0 === parentNamespace)
          switch (type) {
            case "svg":
              return 1;
            case "math":
              return 2;
            default:
              return 0;
          }
        return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
      }
      function shouldSetTextContent(type, props) {
        return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
      }
      var currentPopstateTransitionEvent = null;
      function shouldAttemptEagerTransition() {
        var event = window.event;
        if (event && "popstate" === event.type) {
          if (event === currentPopstateTransitionEvent) return false;
          currentPopstateTransitionEvent = event;
          return true;
        }
        currentPopstateTransitionEvent = null;
        return false;
      }
      var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0;
      var cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var localPromise = "function" === typeof Promise ? Promise : void 0;
      var scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
        return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
      } : scheduleTimeout;
      function handleErrorInNextTick(error) {
        setTimeout(function() {
          throw error;
        });
      }
      function isSingletonScope(type) {
        return "head" === type;
      }
      function clearHydrationBoundary(parentInstance, hydrationInstance) {
        var node = hydrationInstance, depth = 0;
        do {
          var nextNode = node.nextSibling;
          parentInstance.removeChild(node);
          if (nextNode && 8 === nextNode.nodeType)
            if (node = nextNode.data, "/$" === node || "/&" === node) {
              if (0 === depth) {
                parentInstance.removeChild(nextNode);
                retryIfBlockedOn(hydrationInstance);
                return;
              }
              depth--;
            } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
              depth++;
            else if ("html" === node)
              releaseSingletonInstance(parentInstance.ownerDocument.documentElement);
            else if ("head" === node) {
              node = parentInstance.ownerDocument.head;
              releaseSingletonInstance(node);
              for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
                var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
                node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
                node$jscomp$0 = nextNode$jscomp$0;
              }
            } else
              "body" === node && releaseSingletonInstance(parentInstance.ownerDocument.body);
          node = nextNode;
        } while (node);
        retryIfBlockedOn(hydrationInstance);
      }
      function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
        var node = suspenseInstance;
        suspenseInstance = 0;
        do {
          var nextNode = node.nextSibling;
          1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
          if (nextNode && 8 === nextNode.nodeType)
            if (node = nextNode.data, "/$" === node)
              if (0 === suspenseInstance) break;
              else suspenseInstance--;
            else
              "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
          node = nextNode;
        } while (node);
      }
      function clearContainerSparingly(container) {
        var nextNode = container.firstChild;
        nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
        for (; nextNode; ) {
          var node = nextNode;
          nextNode = nextNode.nextSibling;
          switch (node.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
              clearContainerSparingly(node);
              detachDeletedInstance(node);
              continue;
            case "SCRIPT":
            case "STYLE":
              continue;
            case "LINK":
              if ("stylesheet" === node.rel.toLowerCase()) continue;
          }
          container.removeChild(node);
        }
      }
      function canHydrateInstance(instance, type, props, inRootOrSingleton) {
        for (; 1 === instance.nodeType; ) {
          var anyProps = props;
          if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
            if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
              break;
          } else if (!inRootOrSingleton)
            if ("input" === type && "hidden" === instance.type) {
              var name = null == anyProps.name ? null : "" + anyProps.name;
              if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
                return instance;
            } else return instance;
          else if (!instance[internalHoistableMarker])
            switch (type) {
              case "meta":
                if (!instance.hasAttribute("itemprop")) break;
                return instance;
              case "link":
                name = instance.getAttribute("rel");
                if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
                  break;
                else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
                  break;
                return instance;
              case "style":
                if (instance.hasAttribute("data-precedence")) break;
                return instance;
              case "script":
                name = instance.getAttribute("src");
                if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                  break;
                return instance;
              default:
                return instance;
            }
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) break;
        }
        return null;
      }
      function canHydrateTextInstance(instance, text, inRootOrSingleton) {
        if ("" === text) return null;
        for (; 3 !== instance.nodeType; ) {
          if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
            return null;
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) return null;
        }
        return instance;
      }
      function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
        for (; 8 !== instance.nodeType; ) {
          if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
            return null;
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance) return null;
        }
        return instance;
      }
      function isSuspenseInstancePending(instance) {
        return "$?" === instance.data || "$~" === instance.data;
      }
      function isSuspenseInstanceFallback(instance) {
        return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
      }
      function registerSuspenseInstanceRetry(instance, callback) {
        var ownerDocument = instance.ownerDocument;
        if ("$~" === instance.data) instance._reactRetry = callback;
        else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
          callback();
        else {
          var listener = function() {
            callback();
            ownerDocument.removeEventListener("DOMContentLoaded", listener);
          };
          ownerDocument.addEventListener("DOMContentLoaded", listener);
          instance._reactRetry = listener;
        }
      }
      function getNextHydratable(node) {
        for (; null != node; node = node.nextSibling) {
          var nodeType = node.nodeType;
          if (1 === nodeType || 3 === nodeType) break;
          if (8 === nodeType) {
            nodeType = node.data;
            if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
              break;
            if ("/$" === nodeType || "/&" === nodeType) return null;
          }
        }
        return node;
      }
      var previousHydratableOnEnteringScopedSingleton = null;
      function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
        hydrationInstance = hydrationInstance.nextSibling;
        for (var depth = 0; hydrationInstance; ) {
          if (8 === hydrationInstance.nodeType) {
            var data = hydrationInstance.data;
            if ("/$" === data || "/&" === data) {
              if (0 === depth)
                return getNextHydratable(hydrationInstance.nextSibling);
              depth--;
            } else
              "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
          }
          hydrationInstance = hydrationInstance.nextSibling;
        }
        return null;
      }
      function getParentHydrationBoundary(targetInstance) {
        targetInstance = targetInstance.previousSibling;
        for (var depth = 0; targetInstance; ) {
          if (8 === targetInstance.nodeType) {
            var data = targetInstance.data;
            if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
              if (0 === depth) return targetInstance;
              depth--;
            } else "/$" !== data && "/&" !== data || depth++;
          }
          targetInstance = targetInstance.previousSibling;
        }
        return null;
      }
      function resolveSingletonInstance(type, props, rootContainerInstance) {
        props = getOwnerDocumentFromRootContainer(rootContainerInstance);
        switch (type) {
          case "html":
            type = props.documentElement;
            if (!type) throw Error(formatProdErrorMessage(452));
            return type;
          case "head":
            type = props.head;
            if (!type) throw Error(formatProdErrorMessage(453));
            return type;
          case "body":
            type = props.body;
            if (!type) throw Error(formatProdErrorMessage(454));
            return type;
          default:
            throw Error(formatProdErrorMessage(451));
        }
      }
      function releaseSingletonInstance(instance) {
        for (var attributes = instance.attributes; attributes.length; )
          instance.removeAttributeNode(attributes[0]);
        detachDeletedInstance(instance);
      }
      var preloadPropsMap = /* @__PURE__ */ new Map();
      var preconnectsSet = /* @__PURE__ */ new Set();
      function getHoistableRoot(container) {
        return "function" === typeof container.getRootNode ? container.getRootNode() : 9 === container.nodeType ? container : container.ownerDocument;
      }
      var previousDispatcher = ReactDOMSharedInternals.d;
      ReactDOMSharedInternals.d = {
        f: flushSyncWork,
        r: requestFormReset,
        D: prefetchDNS,
        C: preconnect,
        L: preload,
        m: preloadModule,
        X: preinitScript,
        S: preinitStyle,
        M: preinitModuleScript
      };
      function flushSyncWork() {
        var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
        return previousWasRendering || wasRendering;
      }
      function requestFormReset(form) {
        var formInst = getInstanceFromNode(form);
        null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
      }
      var globalDocument = "undefined" === typeof document ? null : document;
      function preconnectAs(rel, href, crossOrigin) {
        var ownerDocument = globalDocument;
        if (ownerDocument && "string" === typeof href && href) {
          var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
          limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
          "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
          preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
        }
      }
      function prefetchDNS(href) {
        previousDispatcher.D(href);
        preconnectAs("dns-prefetch", href, null);
      }
      function preconnect(href, crossOrigin) {
        previousDispatcher.C(href, crossOrigin);
        preconnectAs("preconnect", href, crossOrigin);
      }
      function preload(href, as, options2) {
        previousDispatcher.L(href, as, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href && as) {
          var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
          "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSrcSet
          ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
            options2.imageSizes
          ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
          var key = preloadSelector;
          switch (as) {
            case "style":
              key = getStyleKey(href);
              break;
            case "script":
              key = getScriptKey(href);
          }
          preloadPropsMap.has(key) || (href = assign(
            {
              rel: "preload",
              href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
              as
            },
            options2
          ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
        }
      }
      function preloadModule(href, options2) {
        previousDispatcher.m(href, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              key = getScriptKey(href);
          }
          if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
            switch (as) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                  return;
            }
            as = ownerDocument.createElement("link");
            setInitialProperties(as, "link", href);
            markNodeAsHoistable(as);
            ownerDocument.head.appendChild(as);
          }
        }
      }
      function preinitStyle(href, precedence, options2) {
        previousDispatcher.S(href, precedence, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && href) {
          var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
          precedence = precedence || "default";
          var resource = styles.get(key);
          if (!resource) {
            var state = { loading: 0, preload: null };
            if (resource = ownerDocument.querySelector(
              getStylesheetSelectorFromKey(key)
            ))
              state.loading = 5;
            else {
              href = assign(
                { rel: "stylesheet", href, "data-precedence": precedence },
                options2
              );
              (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
              var link = resource = ownerDocument.createElement("link");
              markNodeAsHoistable(link);
              setInitialProperties(link, "link", href);
              link._p = new Promise(function(resolve, reject) {
                link.onload = resolve;
                link.onerror = reject;
              });
              link.addEventListener("load", function() {
                state.loading |= 1;
              });
              link.addEventListener("error", function() {
                state.loading |= 2;
              });
              state.loading |= 4;
              insertStylesheet(resource, precedence, ownerDocument);
            }
            resource = {
              type: "stylesheet",
              instance: resource,
              count: 1,
              state
            };
            styles.set(key, resource);
          }
        }
      }
      function preinitScript(src, options2) {
        previousDispatcher.X(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function preinitModuleScript(src, options2) {
        previousDispatcher.M(src, options2);
        var ownerDocument = globalDocument;
        if (ownerDocument && src) {
          var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
          resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
            type: "script",
            instance: resource,
            count: 1,
            state: null
          }, scripts.set(key, resource));
        }
      }
      function getResource(type, currentProps, pendingProps, currentResource) {
        var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
        if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
        switch (type) {
          case "meta":
          case "title":
            return null;
          case "style":
            return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          case "link":
            if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
              type = getStyleKey(pendingProps.href);
              var styles$243 = getResourcesFromRoot(
                JSCompiler_inline_result
              ).hoistableStyles, resource$244 = styles$243.get(type);
              resource$244 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$244 = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null }
              }, styles$243.set(type, resource$244), (styles$243 = JSCompiler_inline_result.querySelector(
                getStylesheetSelectorFromKey(type)
              )) && !styles$243._p && (resource$244.instance = styles$243, resource$244.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
                rel: "preload",
                as: "style",
                href: pendingProps.href,
                crossOrigin: pendingProps.crossOrigin,
                integrity: pendingProps.integrity,
                media: pendingProps.media,
                hrefLang: pendingProps.hrefLang,
                referrerPolicy: pendingProps.referrerPolicy
              }, preloadPropsMap.set(type, pendingProps), styles$243 || preloadStylesheet(
                JSCompiler_inline_result,
                type,
                pendingProps,
                resource$244.state
              )));
              if (currentProps && null === currentResource)
                throw Error(formatProdErrorMessage(528, ""));
              return resource$244;
            }
            if (currentProps && null !== currentResource)
              throw Error(formatProdErrorMessage(529, ""));
            return null;
          case "script":
            return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          default:
            throw Error(formatProdErrorMessage(444, type));
        }
      }
      function getStyleKey(href) {
        return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
      }
      function getStylesheetSelectorFromKey(key) {
        return 'link[rel="stylesheet"][' + key + "]";
      }
      function stylesheetPropsFromRawProps(rawProps) {
        return assign({}, rawProps, {
          "data-precedence": rawProps.precedence,
          precedence: null
        });
      }
      function preloadStylesheet(ownerDocument, key, preloadProps, state) {
        ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
          return state.loading |= 1;
        }), key.addEventListener("error", function() {
          return state.loading |= 2;
        }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
      }
      function getScriptKey(src) {
        return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
      }
      function getScriptSelectorFromKey(key) {
        return "script[async]" + key;
      }
      function acquireResource(hoistableRoot, resource, props) {
        resource.count++;
        if (null === resource.instance)
          switch (resource.type) {
            case "style":
              var instance = hoistableRoot.querySelector(
                'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
              );
              if (instance)
                return resource.instance = instance, markNodeAsHoistable(instance), instance;
              var styleProps = assign({}, props, {
                "data-href": props.href,
                "data-precedence": props.precedence,
                href: null,
                precedence: null
              });
              instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
                "style"
              );
              markNodeAsHoistable(instance);
              setInitialProperties(instance, "style", styleProps);
              insertStylesheet(instance, props.precedence, hoistableRoot);
              return resource.instance = instance;
            case "stylesheet":
              styleProps = getStyleKey(props.href);
              var instance$249 = hoistableRoot.querySelector(
                getStylesheetSelectorFromKey(styleProps)
              );
              if (instance$249)
                return resource.state.loading |= 4, resource.instance = instance$249, markNodeAsHoistable(instance$249), instance$249;
              instance = stylesheetPropsFromRawProps(props);
              (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
              instance$249 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
              markNodeAsHoistable(instance$249);
              var linkInstance = instance$249;
              linkInstance._p = new Promise(function(resolve, reject) {
                linkInstance.onload = resolve;
                linkInstance.onerror = reject;
              });
              setInitialProperties(instance$249, "link", instance);
              resource.state.loading |= 4;
              insertStylesheet(instance$249, props.precedence, hoistableRoot);
              return resource.instance = instance$249;
            case "script":
              instance$249 = getScriptKey(props.src);
              if (styleProps = hoistableRoot.querySelector(
                getScriptSelectorFromKey(instance$249)
              ))
                return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
              instance = props;
              if (styleProps = preloadPropsMap.get(instance$249))
                instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
              hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
              styleProps = hoistableRoot.createElement("script");
              markNodeAsHoistable(styleProps);
              setInitialProperties(styleProps, "link", instance);
              hoistableRoot.head.appendChild(styleProps);
              return resource.instance = styleProps;
            case "void":
              return null;
            default:
              throw Error(formatProdErrorMessage(443, resource.type));
          }
        else
          "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
        return resource.instance;
      }
      function insertStylesheet(instance, precedence, root2) {
        for (var nodes = root2.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (node.dataset.precedence === precedence) prior = node;
          else if (prior !== last) break;
        }
        prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
      }
      function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
        null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
        null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
        null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
      }
      function adoptPreloadPropsForScript(scriptProps, preloadProps) {
        null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
        null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
        null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
      }
      var tagCaches = null;
      function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
        if (null === tagCaches) {
          var cache = /* @__PURE__ */ new Map();
          var caches = tagCaches = /* @__PURE__ */ new Map();
          caches.set(ownerDocument, cache);
        } else
          caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
        if (cache.has(type)) return cache;
        cache.set(type, null);
        ownerDocument = ownerDocument.getElementsByTagName(type);
        for (caches = 0; caches < ownerDocument.length; caches++) {
          var node = ownerDocument[caches];
          if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
            var nodeKey = node.getAttribute(keyAttribute) || "";
            nodeKey = type + nodeKey;
            var existing = cache.get(nodeKey);
            existing ? existing.push(node) : cache.set(nodeKey, [node]);
          }
        }
        return cache;
      }
      function mountHoistable(hoistableRoot, type, instance) {
        hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
        hoistableRoot.head.insertBefore(
          instance,
          "title" === type ? hoistableRoot.querySelector("head > title") : null
        );
      }
      function isHostHoistableType(type, props, hostContext) {
        if (1 === hostContext || null != props.itemProp) return false;
        switch (type) {
          case "meta":
          case "title":
            return true;
          case "style":
            if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
              break;
            return true;
          case "link":
            if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
              break;
            switch (props.rel) {
              case "stylesheet":
                return type = props.disabled, "string" === typeof props.precedence && null == type;
              default:
                return true;
            }
          case "script":
            if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
              return true;
        }
        return false;
      }
      function preloadResource(resource) {
        return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
      }
      function suspendResource(state, hoistableRoot, resource, props) {
        if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
          if (null === resource.instance) {
            var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(key)
            );
            if (instance) {
              hoistableRoot = instance._p;
              null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
              resource.state.loading |= 4;
              resource.instance = instance;
              markNodeAsHoistable(instance);
              return;
            }
            instance = hoistableRoot.ownerDocument || hoistableRoot;
            props = stylesheetPropsFromRawProps(props);
            (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
            instance = instance.createElement("link");
            markNodeAsHoistable(instance);
            var linkInstance = instance;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(instance, "link", props);
            resource.instance = instance;
          }
          null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
          state.stylesheets.set(resource, hoistableRoot);
          (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
        }
      }
      var estimatedBytesWithinLimit = 0;
      function waitForCommitToBeReady(state, timeoutOffset) {
        state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
        return 0 < state.count || 0 < state.imgCount ? function(commit) {
          var stylesheetTimer = setTimeout(function() {
            state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
            if (state.unsuspend) {
              var unsuspend = state.unsuspend;
              state.unsuspend = null;
              unsuspend();
            }
          }, 6e4 + timeoutOffset);
          0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
          var imgTimer = setTimeout(
            function() {
              state.waitingForImages = false;
              if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
                var unsuspend = state.unsuspend;
                state.unsuspend = null;
                unsuspend();
              }
            },
            (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
          );
          state.unsuspend = commit;
          return function() {
            state.unsuspend = null;
            clearTimeout(stylesheetTimer);
            clearTimeout(imgTimer);
          };
        } : null;
      }
      function onUnsuspend() {
        this.count--;
        if (0 === this.count && (0 === this.imgCount || !this.waitingForImages)) {
          if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
          else if (this.unsuspend) {
            var unsuspend = this.unsuspend;
            this.unsuspend = null;
            unsuspend();
          }
        }
      }
      var precedencesByRoot = null;
      function insertSuspendedStylesheets(state, resources) {
        state.stylesheets = null;
        null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
      }
      function insertStylesheetIntoRoot(root2, resource) {
        if (!(resource.state.loading & 4)) {
          var precedences = precedencesByRoot.get(root2);
          if (precedences) var last = precedences.get(null);
          else {
            precedences = /* @__PURE__ */ new Map();
            precedencesByRoot.set(root2, precedences);
            for (var nodes = root2.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ), i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
                precedences.set(node.dataset.precedence, node), last = node;
            }
            last && precedences.set(null, last);
          }
          nodes = resource.instance;
          node = nodes.getAttribute("data-precedence");
          i = precedences.get(node) || last;
          i === last && precedences.set(null, nodes);
          precedences.set(node, nodes);
          this.count++;
          last = onUnsuspend.bind(this);
          nodes.addEventListener("load", last);
          nodes.addEventListener("error", last);
          i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
          resource.state.loading |= 4;
        }
      }
      var HostTransitionContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Provider: null,
        Consumer: null,
        _currentValue: sharedNotPendingObject,
        _currentValue2: sharedNotPendingObject,
        _threadCount: 0
      };
      function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
        this.tag = 1;
        this.containerInfo = containerInfo;
        this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
        this.callbackPriority = 0;
        this.expirationTimes = createLaneMap(-1);
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = createLaneMap(0);
        this.hiddenUpdates = createLaneMap(null);
        this.identifierPrefix = identifierPrefix;
        this.onUncaughtError = onUncaughtError;
        this.onCaughtError = onCaughtError;
        this.onRecoverableError = onRecoverableError;
        this.pooledCache = null;
        this.pooledCacheLanes = 0;
        this.formState = formState;
        this.incompleteTransitions = /* @__PURE__ */ new Map();
      }
      function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
        containerInfo = new FiberRootNode(
          containerInfo,
          tag,
          hydrate,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          onDefaultTransitionIndicator,
          formState
        );
        tag = 1;
        true === isStrictMode && (tag |= 24);
        isStrictMode = createFiberImplClass(3, null, null, tag);
        containerInfo.current = isStrictMode;
        isStrictMode.stateNode = containerInfo;
        tag = createCache();
        tag.refCount++;
        containerInfo.pooledCache = tag;
        tag.refCount++;
        isStrictMode.memoizedState = {
          element: initialChildren,
          isDehydrated: hydrate,
          cache: tag
        };
        initializeUpdateQueue(isStrictMode);
        return containerInfo;
      }
      function getContextForSubtree(parentComponent) {
        if (!parentComponent) return emptyContextObject;
        parentComponent = emptyContextObject;
        return parentComponent;
      }
      function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
        parentComponent = getContextForSubtree(parentComponent);
        null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
        container = createUpdate(lane);
        container.payload = { element };
        callback = void 0 === callback ? null : callback;
        null !== callback && (container.callback = callback);
        element = enqueueUpdate(rootFiber, container, lane);
        null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
      }
      function markRetryLaneImpl(fiber, retryLane) {
        fiber = fiber.memoizedState;
        if (null !== fiber && null !== fiber.dehydrated) {
          var a = fiber.retryLane;
          fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
        }
      }
      function markRetryLaneIfNotHydrated(fiber, retryLane) {
        markRetryLaneImpl(fiber, retryLane);
        (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
      }
      function attemptContinuousHydration(fiber) {
        if (13 === fiber.tag || 31 === fiber.tag) {
          var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
          null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
          markRetryLaneIfNotHydrated(fiber, 67108864);
        }
      }
      function attemptHydrationAtCurrentPriority(fiber) {
        if (13 === fiber.tag || 31 === fiber.tag) {
          var lane = requestUpdateLane();
          lane = getBumpedLaneForHydrationByLane(lane);
          var root2 = enqueueConcurrentRenderForLane(fiber, lane);
          null !== root2 && scheduleUpdateOnFiber(root2, fiber, lane);
          markRetryLaneIfNotHydrated(fiber, lane);
        }
      }
      var _enabled = true;
      function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (_enabled) {
          var blockedOn = findInstanceBlockingEvent(nativeEvent);
          if (null === blockedOn)
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              return_targetInst,
              targetContainer
            ), clearIfContinuousEvent(domEventName, nativeEvent);
          else if (queueIfContinuousEvent(
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ))
            nativeEvent.stopPropagation();
          else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
            for (; null !== blockedOn; ) {
              var fiber = getInstanceFromNode(blockedOn);
              if (null !== fiber)
                switch (fiber.tag) {
                  case 3:
                    fiber = fiber.stateNode;
                    if (fiber.current.memoizedState.isDehydrated) {
                      var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                      if (0 !== lanes) {
                        var root2 = fiber;
                        root2.pendingLanes |= 2;
                        for (root2.entangledLanes |= 2; lanes; ) {
                          var lane = 1 << 31 - clz32(lanes);
                          root2.entanglements[1] |= lane;
                          lanes &= ~lane;
                        }
                        ensureRootIsScheduled(fiber);
                        0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, false));
                      }
                    }
                    break;
                  case 31:
                  case 13:
                    root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
                }
              fiber = findInstanceBlockingEvent(nativeEvent);
              null === fiber && dispatchEventForPluginEventSystem(
                domEventName,
                eventSystemFlags,
                nativeEvent,
                return_targetInst,
                targetContainer
              );
              if (fiber === blockedOn) break;
              blockedOn = fiber;
            }
            null !== blockedOn && nativeEvent.stopPropagation();
          } else
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              null,
              targetContainer
            );
        }
      }
      function findInstanceBlockingEvent(nativeEvent) {
        nativeEvent = getEventTarget(nativeEvent);
        return findInstanceBlockingTarget(nativeEvent);
      }
      var return_targetInst = null;
      function findInstanceBlockingTarget(targetNode) {
        return_targetInst = null;
        targetNode = getClosestInstanceFromNode(targetNode);
        if (null !== targetNode) {
          var nearestMounted = getNearestMountedFiber(targetNode);
          if (null === nearestMounted) targetNode = null;
          else {
            var tag = nearestMounted.tag;
            if (13 === tag) {
              targetNode = getSuspenseInstanceFromFiber(nearestMounted);
              if (null !== targetNode) return targetNode;
              targetNode = null;
            } else if (31 === tag) {
              targetNode = getActivityInstanceFromFiber(nearestMounted);
              if (null !== targetNode) return targetNode;
              targetNode = null;
            } else if (3 === tag) {
              if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
                return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              targetNode = null;
            } else nearestMounted !== targetNode && (targetNode = null);
          }
        }
        return_targetInst = targetNode;
        return null;
      }
      function getEventPriority(domEventName) {
        switch (domEventName) {
          case "beforetoggle":
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "toggle":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 2;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 8;
          case "message":
            switch (getCurrentPriorityLevel()) {
              case ImmediatePriority:
                return 2;
              case UserBlockingPriority:
                return 8;
              case NormalPriority$1:
              case LowPriority:
                return 32;
              case IdlePriority:
                return 268435456;
              default:
                return 32;
            }
          default:
            return 32;
        }
      }
      var hasScheduledReplayAttempt = false;
      var queuedFocus = null;
      var queuedDrag = null;
      var queuedMouse = null;
      var queuedPointers = /* @__PURE__ */ new Map();
      var queuedPointerCaptures = /* @__PURE__ */ new Map();
      var queuedExplicitHydrationTargets = [];
      var discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
      function clearIfContinuousEvent(domEventName, nativeEvent) {
        switch (domEventName) {
          case "focusin":
          case "focusout":
            queuedFocus = null;
            break;
          case "dragenter":
          case "dragleave":
            queuedDrag = null;
            break;
          case "mouseover":
          case "mouseout":
            queuedMouse = null;
            break;
          case "pointerover":
          case "pointerout":
            queuedPointers.delete(nativeEvent.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            queuedPointerCaptures.delete(nativeEvent.pointerId);
        }
      }
      function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
          return existingQueuedEvent = {
            blockedOn,
            domEventName,
            eventSystemFlags,
            nativeEvent,
            targetContainers: [targetContainer]
          }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
        existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
        blockedOn = existingQueuedEvent.targetContainers;
        null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
        return existingQueuedEvent;
      }
      function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        switch (domEventName) {
          case "focusin":
            return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedFocus,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "dragenter":
            return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedDrag,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "mouseover":
            return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedMouse,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "pointerover":
            var pointerId = nativeEvent.pointerId;
            queuedPointers.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointers.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            );
            return true;
          case "gotpointercapture":
            return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointerCaptures.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            ), true;
        }
        return false;
      }
      function attemptExplicitHydrationTarget(queuedTarget) {
        var targetInst = getClosestInstanceFromNode(queuedTarget.target);
        if (null !== targetInst) {
          var nearestMounted = getNearestMountedFiber(targetInst);
          if (null !== nearestMounted) {
            if (targetInst = nearestMounted.tag, 13 === targetInst) {
              if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
                queuedTarget.blockedOn = targetInst;
                runWithPriority(queuedTarget.priority, function() {
                  attemptHydrationAtCurrentPriority(nearestMounted);
                });
                return;
              }
            } else if (31 === targetInst) {
              if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
                queuedTarget.blockedOn = targetInst;
                runWithPriority(queuedTarget.priority, function() {
                  attemptHydrationAtCurrentPriority(nearestMounted);
                });
                return;
              }
            } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
              queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              return;
            }
          }
        }
        queuedTarget.blockedOn = null;
      }
      function attemptReplayContinuousQueuedEvent(queuedEvent) {
        if (null !== queuedEvent.blockedOn) return false;
        for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
          var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
          if (null === nextBlockedOn) {
            nextBlockedOn = queuedEvent.nativeEvent;
            var nativeEventClone = new nextBlockedOn.constructor(
              nextBlockedOn.type,
              nextBlockedOn
            );
            currentReplayingEvent = nativeEventClone;
            nextBlockedOn.target.dispatchEvent(nativeEventClone);
            currentReplayingEvent = null;
          } else
            return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
          targetContainers.shift();
        }
        return true;
      }
      function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
        attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
      }
      function replayUnblockedEvents() {
        hasScheduledReplayAttempt = false;
        null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
        null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
        null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
        queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
        queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
      }
      function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
        queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          replayUnblockedEvents
        )));
      }
      var lastScheduledReplayQueue = null;
      function scheduleReplayQueueIfNeeded(formReplayingQueue) {
        lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          function() {
            lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
            for (var i = 0; i < formReplayingQueue.length; i += 3) {
              var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
              if ("function" !== typeof submitterOrAction)
                if (null === findInstanceBlockingTarget(submitterOrAction || form))
                  continue;
                else break;
              var formInst = getInstanceFromNode(form);
              null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
                formInst,
                {
                  pending: true,
                  data: formData,
                  method: form.method,
                  action: submitterOrAction
                },
                submitterOrAction,
                formData
              ));
            }
          }
        ));
      }
      function retryIfBlockedOn(unblocked) {
        function unblock(queuedEvent) {
          return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
        }
        null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
        null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
        null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
        queuedPointers.forEach(unblock);
        queuedPointerCaptures.forEach(unblock);
        for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
          var queuedTarget = queuedExplicitHydrationTargets[i];
          queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
        }
        for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
          attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
        i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
        if (null != i)
          for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
            var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
            if ("function" === typeof submitterOrAction)
              formProps || scheduleReplayQueueIfNeeded(i);
            else if (formProps) {
              var action = null;
              if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
                if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                  action = formProps.formAction;
                else {
                  if (null !== findInstanceBlockingTarget(form)) continue;
                }
              else action = formProps.action;
              "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
              scheduleReplayQueueIfNeeded(i);
            }
          }
      }
      function defaultOnDefaultTransitionIndicator() {
        function handleNavigate(event) {
          event.canIntercept && "react-transition" === event.info && event.intercept({
            handler: function() {
              return new Promise(function(resolve) {
                return pendingResolve = resolve;
              });
            },
            focusReset: "manual",
            scroll: "manual"
          });
        }
        function handleNavigateComplete() {
          null !== pendingResolve && (pendingResolve(), pendingResolve = null);
          isCancelled || setTimeout(startFakeNavigation, 20);
        }
        function startFakeNavigation() {
          if (!isCancelled && !navigation.transition) {
            var currentEntry = navigation.currentEntry;
            currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
              state: currentEntry.getState(),
              info: "react-transition",
              history: "replace"
            });
          }
        }
        if ("object" === typeof navigation) {
          var isCancelled = false, pendingResolve = null;
          navigation.addEventListener("navigate", handleNavigate);
          navigation.addEventListener("navigatesuccess", handleNavigateComplete);
          navigation.addEventListener("navigateerror", handleNavigateComplete);
          setTimeout(startFakeNavigation, 100);
          return function() {
            isCancelled = true;
            navigation.removeEventListener("navigate", handleNavigate);
            navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
            navigation.removeEventListener("navigateerror", handleNavigateComplete);
            null !== pendingResolve && (pendingResolve(), pendingResolve = null);
          };
        }
      }
      function ReactDOMRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
        var root2 = this._internalRoot;
        if (null === root2) throw Error(formatProdErrorMessage(409));
        var current = root2.current, lane = requestUpdateLane();
        updateContainerImpl(current, lane, children, root2, null, null);
      };
      ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
        var root2 = this._internalRoot;
        if (null !== root2) {
          this._internalRoot = null;
          var container = root2.containerInfo;
          updateContainerImpl(root2.current, 2, null, root2, null, null);
          flushSyncWork$1();
          container[internalContainerInstanceKey] = null;
        }
      };
      function ReactDOMHydrationRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
        if (target) {
          var updatePriority = resolveUpdatePriority();
          target = { blockedOn: null, target, priority: updatePriority };
          for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
          queuedExplicitHydrationTargets.splice(i, 0, target);
          0 === i && attemptExplicitHydrationTarget(target);
        }
      };
      var isomorphicReactPackageVersion$jscomp$inline_1840 = React3.version;
      if ("19.2.7" !== isomorphicReactPackageVersion$jscomp$inline_1840)
        throw Error(
          formatProdErrorMessage(
            527,
            isomorphicReactPackageVersion$jscomp$inline_1840,
            "19.2.7"
          )
        );
      ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
        var fiber = componentOrElement._reactInternals;
        if (void 0 === fiber) {
          if ("function" === typeof componentOrElement.render)
            throw Error(formatProdErrorMessage(188));
          componentOrElement = Object.keys(componentOrElement).join(",");
          throw Error(formatProdErrorMessage(268, componentOrElement));
        }
        componentOrElement = findCurrentFiberUsingSlowPath(fiber);
        componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
        componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
        return componentOrElement;
      };
      var internals$jscomp$inline_2347 = {
        bundleType: 0,
        version: "19.2.7",
        rendererPackageName: "react-dom",
        currentDispatcherRef: ReactSharedInternals,
        reconcilerVersion: "19.2.7"
      };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        hook$jscomp$inline_2348 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!hook$jscomp$inline_2348.isDisabled && hook$jscomp$inline_2348.supportsFiber)
          try {
            rendererID = hook$jscomp$inline_2348.inject(
              internals$jscomp$inline_2347
            ), injectedHook = hook$jscomp$inline_2348;
          } catch (err) {
          }
      }
      var hook$jscomp$inline_2348;
      exports.createRoot = function(container, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
        null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError));
        options2 = createFiberRoot(
          container,
          1,
          false,
          null,
          null,
          isStrictMode,
          identifierPrefix,
          null,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          defaultOnDefaultTransitionIndicator
        );
        container[internalContainerInstanceKey] = options2.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMRoot(options2);
      };
      exports.hydrateRoot = function(container, initialChildren, options2) {
        if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
        null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.formState && (formState = options2.formState));
        initialChildren = createFiberRoot(
          container,
          1,
          true,
          initialChildren,
          null != options2 ? options2 : null,
          isStrictMode,
          identifierPrefix,
          formState,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          defaultOnDefaultTransitionIndicator
        );
        initialChildren.context = getContextForSubtree(null);
        options2 = initialChildren.current;
        isStrictMode = requestUpdateLane();
        isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
        identifierPrefix = createUpdate(isStrictMode);
        identifierPrefix.callback = null;
        enqueueUpdate(options2, identifierPrefix, isStrictMode);
        options2 = isStrictMode;
        initialChildren.current.lanes = options2;
        markRootUpdated$1(initialChildren, options2);
        ensureRootIsScheduled(initialChildren);
        container[internalContainerInstanceKey] = initialChildren.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMHydrationRoot(initialChildren);
      };
      exports.version = "19.2.7";
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_client_production();
      } else {
        module.exports = null;
      }
    }
  });

  // main.jsx
  var import_react2 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // khadlaj-perfumes (1).jsx
  var import_react = __toESM(require_react());
  var C = {
    obsidian: "#000000",
    onyx: "#0A0A0A",
    onyxLight: "#111111",
    champagne: "#FFFFFF",
    ivory: "#F7F7F7",
    brass: "#B8922A",
    brassL: "#C9A84C",
    rouge: "#5C0000",
    muted: "#888888",
    mutedL: "#AAAAAA",
    paper: "#FFFFFF",
    surface: "#FFFFFF",
    surface2: "#F5F5F5",
    text: "#000000",
    textSoft: "#555555",
    line: "#E0E0E0",
    shadow: "rgba(0,0,0,.06)"
  };
  var COUNTRIES = [
    { name: "UAE", flagUrl: "/assets/images/flags/ae.png", currency: "AED", rate: 1 },
    { name: "Kuwait", flagUrl: "/assets/images/flags/kw.png", currency: "KWD", rate: 0.08 },
    { name: "India", flagUrl: "/assets/images/flags/in.png", currency: "INR", rate: 22.5 },
    { name: "Egypt", flagUrl: "/assets/images/flags/eg.png", currency: "EGP", rate: 13.2 },
    { name: "Malaysia", flagUrl: "/assets/images/flags/my.png", currency: "MYR", rate: 1.25 },
    { name: "UK", flagUrl: "/assets/images/flags/gb.png", currency: "GBP", rate: 0.21 },
    { name: "USA", flagUrl: "/assets/images/flags/us.png", currency: "USD", rate: 0.27 },
    { name: "Global", flagUrl: "global", currency: "USD", rate: 0.27 }
  ];
  var CountryContext = import_react.default.createContext();
  var SCENT_RIBBON = ["Island", "Icon", "Shiyaaka", "Empire", "Fursan", "Nuha", "Valor", "Velvet"];
  var PRODUCTS = [
    {
      "id": 8199234977991,
      "name": "ISLAND",
      "col": "Extrait De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/products/island-packshot-tight_transparent.png"
    },
    {
      "id": 8561163075783,
      "name": "SAWAAR VANILLE BLANC",
      "col": "Extrait De Parfum",
      "price": 200,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Her",
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/products/sawaar-cutout.png"
    },
    {
      "id": 8409302073543,
      "name": "SHIYAAKA SHADOW",
      "col": "Eau De Parfum",
      "price": 126,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Him",
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/products/shiyaaka-shadow-cutout.png"
    },
    {
      "id": 9100000000003,
      "name": "SHIYAAKA SNOW",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100 ML",
      "badge": "",
      "gender": "Unisex",
      "notes": ["Fresh Citrus", "Sky Breeze", "Cedarwood"],
      "img": "/assets/images/products/shiyaaka-snow-cutout.png"
    },
    {
      "id": 8354691940551,
      "name": "ISLAND VANILLA DUNES",
      "col": "Extrait De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Island_Vanilla-3.jpg?v=1783945707"
    },
    {
      "id": 9200000000003,
      "name": "SHIYAAKA SKY",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100 ml",
      "badge": "New",
      "gender": "Unisex",
      "notes": ["Fresh Citrus", "Sky Breeze", "Cedarwood"],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SPECIAL_EDITION_SHIYAAKA_SKY.png?v=1783938999"
    },
    {
      "id": 9100000000001,
      "name": "KARUS GOLD ABSOLU",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100 ML",
      "badge": "New",
      "gender": "Unisex",
      "notes": ["Gold Oud", "Royal Amber", "Velvet Musk"],
      "img": "/assets/images/products/karus-gold-absolu.png?v=2"
    },
    {
      "id": 7554205647047,
      "name": "SHIYAAKA BLUE",
      "col": "Eau De Parfum",
      "price": 65,
      "size": "100 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.Blue.1.jpg?v=1771043727"
    },
    {
      "id": 7554205614279,
      "name": "SHIYAAKA MEN",
      "col": "Eau De Parfum",
      "price": 65,
      "size": "100 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.1.jpg?v=1771043858"
    },
    {
      "id": 7554205581511,
      "name": "SHIYAAKA WHITE",
      "col": "Eau De Parfum",
      "price": 65,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.White.1.jpg?v=2"
    },
    {
      "id": 7554205548743,
      "name": "SHIYAAKA GOLD",
      "col": "Eau De Parfum",
      "price": 65,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Shiyaaka.Gold.1.jpg?v=2"
    },
    {
      "id": 9100000000002,
      "name": "SARAYA",
      "col": "Extrait De Parfum",
      "price": 105,
      "size": "60 ML",
      "badge": "",
      "gender": "Unisex",
      "notes": ["Precious Oud", "Saffron", "Rose"],
      "img": "/assets/images/products/saraya-cutout.png"
    },
    {
      "id": 9100000000004,
      "name": "ZAYAAN SILVER",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100 ML",
      "badge": "New",
      "gender": "Him",
      "notes": ["Bergamot", "Silver Vetiver", "Ambroxan"],
      "img": "/assets/images/products/zayaan-silver_transparent.png"
    },
    {
      "id": 9100000000005,
      "name": "QARAR",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "60 ML",
      "badge": "New",
      "gender": "Unisex",
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/products/qarar-cutout.png"
    },
    {
      "id": 9100000000006,
      "name": "IHTHIRAAM",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "60 ML",
      "badge": "New",
      "gender": "Unisex",
      "notes": ["Precious Wood", "Saffron", "Amber"],
      "img": "/assets/images/products/ihthiraam-cutout.png"
    },
    {
      "id": 9100000000007,
      "name": "ICON",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100 ML",
      "badge": "New",
      "gender": "Him",
      "notes": ["Bergamot", "Cardamom", "Cedar"],
      "img": "/assets/images/products/icon-cutout.png"
    },
    {
      "id": 9100000000008,
      "name": "PANACHE ANGEL DUST",
      "col": "Extrait De Parfum",
      "price": 200,
      "size": "100 ML",
      "badge": "New",
      "gender": "Her",
      "notes": ["Creamy Vanilla", "White Floral", "Musk"],
      "img": "/assets/images/products/panache-cutout.png"
    },
    {
      "id": 8526052262087,
      "name": "OUD JUMEIRAH",
      "col": "Master Perfumery",
      "price": 200,
      "size": "60ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": ["Oud", "Woody", "Amber"],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Jumeirah-3.jpg?v=1783940923"
    },
    {
      "id": "8711666925767",
      "name": "CREAM VELVET GIFT SET",
      "price": 160,
      "size": "Gift Set",
      "badge": "",
      "col": "Gift Sets",
      "gender": "Unisex",
      "topNotes": [],
      "midNotes": [],
      "baseNotes": [],
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/gifsets/cream_velvet_nobox.png",
      "detailImages": ["/assets/images/gifsets/cream_velvet_nobox.png"]
    },
    {
      "id": "8674591408327",
      "name": "THE GOURMAND COLLECTION BY KHADLAJ DISCOVERY SET FOR WOMEN",
      "price": 125,
      "size": "Gift Set",
      "badge": "Sold Out",
      "col": "Gift Sets",
      "gender": "Unisex",
      "topNotes": [],
      "midNotes": [],
      "baseNotes": [],
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/gifsets/gourmand_nobox.png",
      "detailImages": ["/assets/images/gifsets/gourmand_nobox.png"]
    },
    {
      "id": "8586765697223",
      "name": "CLOUD CANDY GIFT SET",
      "price": 169,
      "size": "Gift Set",
      "badge": "",
      "col": "Gift Sets",
      "gender": "Unisex",
      "topNotes": [],
      "midNotes": [],
      "baseNotes": [],
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/gifsets/cloud_candy_nobox.png",
      "detailImages": ["/assets/images/gifsets/cloud_candy_nobox.png"]
    },
    {
      "id": "8586762813639",
      "name": "ISLAND GIFT SET FOR HIM & HER",
      "price": 179,
      "size": "Gift Set",
      "badge": "",
      "col": "Gift Sets",
      "gender": "Unisex",
      "topNotes": [],
      "midNotes": [],
      "baseNotes": [],
      "notes": ["Oud", "Musk", "Amber"],
      "img": "/assets/images/gifsets/island_nobox.png",
      "detailImages": ["/assets/images/gifsets/island_nobox.png"]
    },
    {
      "id": 8783764291783,
      "name": "OUD MUATTAR MUBAKHAR",
      "col": "Bakhoor",
      "price": 65,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Jumeirah-3.jpg?v=1783940923"
    },
    {
      "id": 8730021134535,
      "name": "LA FEDE AURA VANILLA MILK",
      "col": "Lafede",
      "price": 55,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_AURA_VANILLA_MILK_100_ML.png?v=1783938923"
    },
    {
      "id": 7554136703175,
      "name": "DEHNAL OUDH COMBODI",
      "col": "Dehn Al Oudh",
      "price": 65,
      "size": "3ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUDH_COMBODI_3ML_-_Khadlaj_Perfumes-1964319.jpg"
    },
    {
      "id": 8659572293831,
      "name": "QARAR",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Qarar-3.jpg?v=1783939057"
    },
    {
      "id": 8637240934599,
      "name": "LA FEDE INTOXICATE MYSTIQUE",
      "col": "Lafede",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1783939357"
    },
    {
      "id": 8633008914631,
      "name": "OUD MUATTAR OUD AL RAWDA",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_OUD_AL_RAWDA.jpg?v=1783939385"
    },
    {
      "id": 8604851437767,
      "name": "ONYX SILVER",
      "col": "Eau De Parfum",
      "price": 125,
      "size": "100ml EDP",
      "badge": "New",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OnyxSilver3.jpg?v=1783939577"
    },
    {
      "id": 8597262368967,
      "name": "NUHA BON BON",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHA_BON_BON-03.jpg?v=1783939633"
    },
    {
      "id": 8561538171079,
      "name": "STRAWBERRY SHAKE",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/products/strawberry-shake.png"
    },
    {
      "id": 8540408479943,
      "name": "ONYX GOLD",
      "col": "Eau De Parfum",
      "price": 125,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1783939937"
    },
    {
      "id": 8526040367303,
      "name": "OUD BARAKAT",
      "col": "Master Perfumery",
      "price": 200,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Barakat-3.jpg?v=1783940266"
    },
    {
      "id": 8525988200647,
      "name": "GALAZAID",
      "col": "Master Perfumery",
      "price": 200,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Galazaid-3.jpg?v=1761124822"
    },
    {
      "id": 8516215439559,
      "name": "RIA",
      "col": "Eau De Parfum",
      "price": 125,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ria-3.jpg?v=1783941881"
    },
    {
      "id": 8496480944327,
      "name": "MANSION",
      "col": "Eau De Parfum",
      "price": 110,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/mansion_2.jpg?v=1783942858"
    },
    {
      "id": 8488117600455,
      "name": "PEACH VELVET",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/mansion_2.jpg?v=1783942858"
    },
    {
      "id": 8484193861831,
      "name": "TITAN",
      "col": "Eau De Parfum",
      "price": 110,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/TITAN-3.jpg?v=1783942163"
    },
    {
      "id": 8473765675207,
      "name": "BISCOTTI MELON MISK",
      "col": "Extrait De Parfum",
      "price": 110,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Melon_Misk-3.jpg?v=1783942967"
    },
    {
      "id": 8457608462535,
      "name": "LA FEDE CELEBRITY CRUSH",
      "col": "Lafede",
      "price": 130,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CELEBRITY_CRUSH-3.jpg?v=1784374422"
    },
    {
      "id": 8457604071623,
      "name": "LA FEDE CELEBRITY FAME",
      "col": "Lafede",
      "price": 130,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CELEBRITY_FAME-3.jpg?v=1784374252"
    },
    {
      "id": 8443601223879,
      "name": "ZAYAAN GOLD",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Zayan_Gold-3_RESIZE.jpg?v=1783936479"
    },
    {
      "id": 8416731889863,
      "name": "LA FEDE EDGE INTENSE",
      "col": "Lafede",
      "price": 90,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Edge_Intense-2.jpg?v=1776231578"
    },
    {
      "id": 8416723861703,
      "name": "LA FEDE EDGE ORIGINAL",
      "col": "Lafede",
      "price": 90,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Edge_Original-2.jpg?v=1776231633"
    },
    {
      "id": 8398776959175,
      "name": "BISCOTTI DATE TOFFEE",
      "col": "Extrait De Parfum",
      "price": 110,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Date_Toffee-3.jpg?v=1784370825"
    },
    {
      "id": 8398776860871,
      "name": "BISCOTTI CARAMEL POP",
      "col": "Extrait De Parfum",
      "price": 110,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Biscotti_Caramel_Pop-3_d5613249-6b48-4c8b-8b10-65ab03db07df.jpg?v=1784370936"
    },
    {
      "id": 8386685599943,
      "name": "OUD POUR LEATHER",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_POUR_LEATHER.jpg?v=1783945848"
    },
    {
      "id": 8385197375687,
      "name": "OUD PURE MAGICAL THAI",
      "col": "Perfume Oils",
      "price": 325,
      "size": "3ML",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_Magical_Thai_02.jpg"
    },
    {
      "id": 8385137639623,
      "name": "DEHNAL OUD QAISAR SEUFI",
      "col": "Dehn Al Oudh",
      "price": 325,
      "size": "3ML",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_OAISAR_SEUFI-3.jpg"
    },
    {
      "id": 8385113981127,
      "name": "DEHNAL OUD SHEIKH QADIM",
      "col": "Dehn Al Oudh",
      "price": 325,
      "size": "3ML",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_SHEIKH_OADIM-3.jpg"
    },
    {
      "id": 8361494839495,
      "name": "CLOUD CANDY",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Her",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cloud_Candy-3.jpg?v=1783945979"
    },
    {
      "id": 8342080946375,
      "name": "OUD MUATTAR QISSA",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Oud_Qissa-03.jpg?v=1745839937"
    },
    {
      "id": 8342076129479,
      "name": "OUD MUATTAR RUKAIYA",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_2_6f08c36e-4beb-4b09-bdf6-fb68dd7b8427.jpg"
    },
    {
      "id": 8342075244743,
      "name": "OUD MUATTAR AL BAHAAR",
      "col": "Bakhoor",
      "price": 27,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_2_a39244be-9fb7-4336-8e0c-7a6b8d964e4c.jpg"
    },
    {
      "id": 7734819553479,
      "name": "MAISON L' IMAGINAIRE",
      "col": "Eau De Parfum",
      "price": 158,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_L_IMAGINAIRE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965352.jpg?v=1783947272"
    },
    {
      "id": 8332571082951,
      "name": "LA FEDE CELESTE JOICE",
      "col": "Lafede",
      "price": 75,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Joice01.jpg?v=1742360987"
    },
    {
      "id": 8332579340487,
      "name": "LA FEDE CELESTE FLUER",
      "col": "Lafede",
      "price": 75,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Fleur01.jpg?v=1742360562"
    },
    {
      "id": 8332573081799,
      "name": "LA FEDE CELESTE AQUA",
      "col": "Lafede",
      "price": 75,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Aqua02.jpg?v=1742359156"
    },
    {
      "id": 8332570689735,
      "name": "LA FEDE CELESTE TOFFEE",
      "col": "Lafede",
      "price": 75,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Toffee01.jpg?v=1742357488"
    },
    {
      "id": 8331128668359,
      "name": "LA FEDE SYMBOL OF LOVE",
      "col": "Lafede",
      "price": 110,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Symbol_of_Love-3.jpg?v=1776230343"
    },
    {
      "id": 8331129028807,
      "name": "LA FEDE SYMBOL OF POWER",
      "col": "Lafede",
      "price": 110,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Symbol_of_Power-3.jpg?v=1776230317"
    },
    {
      "id": 8323950018759,
      "name": "LA FEDE CHOCO BROWN",
      "col": "Lafede",
      "price": 100,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BrownChoco2.jpg?v=1776231251"
    },
    {
      "id": 8323929342151,
      "name": "LA FEDE WHITE FOREST STRAWBERRY",
      "col": "Lafede",
      "price": 75,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Whiteforeststrawberry02.jpg?v=1776231284"
    },
    {
      "id": 8316886679751,
      "name": "PRIVATE BLEND TOBAC EXTRA",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Tobac_Extra_03.jpg?v=1783946489"
    },
    {
      "id": 8263133561031,
      "name": "MOCHA LATTE",
      "col": "Extrait De Parfum",
      "price": 100,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Mocha_Latte_03.jpg?v=1784382482"
    },
    {
      "id": 8306104369351,
      "name": "NUHA CHERRY BLUSH",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nuha_cherry_blush_03.jpg?v=1783946612"
    },
    {
      "id": 8306103517383,
      "name": "NUHA VANILLA PEARL",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Nuha_Vanilla_Pearl_03.jpg?v=1783946810"
    },
    {
      "id": 8300976472263,
      "name": "DESERT ROSE",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Desert_Rose_02.jpg?v=1784383039"
    },
    {
      "id": 8300976341191,
      "name": "BLEU GLACE",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1784382935"
    },
    {
      "id": 8300764332231,
      "name": "OPUS REBORN",
      "col": "Eau De Parfum",
      "price": 90,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Opus_Reborn-03.jpg?v=1783947747"
    },
    {
      "id": 8298206986439,
      "name": "AZURE VELVET",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Azure_Velvet_03.jpg?v=1783946944"
    },
    {
      "id": 8297538945223,
      "name": "JOHAYNA PURPLE",
      "col": "Perfume Oils",
      "price": 45,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_c65ff337-7d6f-4807-aba0-e617570abc93.jpg?v=1737811492"
    },
    {
      "id": 8297527967943,
      "name": "ANABIA RED",
      "col": "Perfume Oils",
      "price": 32,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/4_0d518155-87a3-4775-9fb3-92c952c6e4fa.jpg?v=1737806598"
    },
    {
      "id": 8297521414343,
      "name": "AMBER PURE",
      "col": "Perfume Oils",
      "price": 45,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_e11d6c3a-c93a-4ea8-9e37-f7eae4bb3bc7.jpg?v=1784375039"
    },
    {
      "id": 8289952399559,
      "name": "ARABIAN TREASURE",
      "col": "Perfume Oils",
      "price": 45,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_6cff4d8f-5f86-4355-9a5d-abb81a740c00.jpg?v=1736916084"
    },
    {
      "id": 8285560078535,
      "name": "LA FEDE AURA PISTA DESSERT",
      "col": "Lafede",
      "price": 70,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Pistadessert01.jpg?v=1776230643"
    },
    {
      "id": 8285559816391,
      "name": "LA FEDE AURA MANGA SPLASH",
      "col": "Lafede",
      "price": 70,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MangaSplash01.jpg?v=1776230669"
    },
    {
      "id": 8283965522119,
      "name": "CREAM VELVET",
      "col": "Extrait De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cream_Velvet_03.jpg?v=1783947094"
    },
    {
      "id": 8276542390471,
      "name": "RASAYEL VID",
      "col": "Eau De Parfum",
      "price": 90,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_6aa7eaae-bcbe-487e-9be0-0aea3cc91b93.jpg?v=1776230721"
    },
    {
      "id": 8276541243591,
      "name": "RASAYEL SHAGAF",
      "col": "Eau De Parfum",
      "price": 90,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_ab0ed6b5-ec07-4047-93e1-f6fa159c44df.jpg?v=1776230769"
    },
    {
      "id": 8275957448903,
      "name": "SAQR AL BADIYA",
      "col": "Extrait De Parfum",
      "price": 140,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_c731ae61-af1b-42d1-b131-10ec842e6fa2.jpg?v=1783947616"
    },
    {
      "id": 8263132709063,
      "name": "CAFFE LATTE",
      "col": "Extrait De Parfum",
      "price": 100,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Cafe_Latte_03.jpg?v=1783947469"
    },
    {
      "id": 8259368353991,
      "name": "ANABIA BLUE",
      "col": "Perfume Oils",
      "price": 32,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_0fda46e3-b76b-4eeb-86d0-70981ce7cb19.jpg?v=1732252986"
    },
    {
      "id": 8237332136135,
      "name": "MUSK POUR AMBER",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_34.jpg?v=1783947834"
    },
    {
      "id": 8210140102855,
      "name": "OUD & MUSK",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_60f1207b-0529-4e44-903b-5b75f67b8184.jpg?v=1725714648"
    },
    {
      "id": 8225224294599,
      "name": "FURSAN BROWN",
      "col": "Eau De Parfum",
      "price": 95,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_651eba7e-7275-416f-b294-45ea01b0149a.jpg?v=1783947945"
    },
    {
      "id": 8221158047943,
      "name": "FURSAN WHITE",
      "col": "Eau De Parfum",
      "price": 90,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_e7287acf-841a-4e28-a898-549b1e89d2a2.jpg?v=1783948020"
    },
    {
      "id": 8220687958215,
      "name": "MUSK COUTURE",
      "col": "Eau De Parfum",
      "price": 118,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_cbe4f164-57ee-4f48-9832-89e3371dbc54.jpg?v=1784369644"
    },
    {
      "id": 8210117427399,
      "name": "SARA",
      "col": "Extrait De Parfum",
      "price": 90,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_34647ca0-413e-49af-a7d4-042b6d78a207.jpg?v=1783948104"
    },
    {
      "id": 8207565914311,
      "name": "GHADEER GOLD",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_24.jpg?v=1784368680"
    },
    {
      "id": 8207561621703,
      "name": "GHADEER SILVER",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_20.jpg?v=1784368631"
    },
    {
      "id": 8207557296327,
      "name": "MUSK AL SABAH",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/2_19.jpg?v=1784368941"
    },
    {
      "id": 8206430208199,
      "name": "OUD AL SABAH",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_21.jpg?v=1784368894"
    },
    {
      "id": 8203303518407,
      "name": "PURE MUSK",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PURE_MUSK_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965788.jpg?v=1784382776"
    },
    {
      "id": 8203204690119,
      "name": "JOHAYNA GREEN",
      "col": "Perfume Oils",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/3_19.jpg?v=1724745977"
    },
    {
      "id": 8143006892231,
      "name": "PURE MUSK PURE BLEND",
      "col": "Master Perfumery",
      "price": 200,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_PURE_MUSK_BLEND_CREATION_OF_IQBAL_60_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965450.jpg?v=1783948198"
    },
    {
      "id": 8138178920647,
      "name": "KAYAAN SILVER",
      "col": "Perfume Oils",
      "price": 100,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KAYAAN_SILVER_20_ML_-_Khadlaj_Perfumes-1964884.png?v=1722410054"
    },
    {
      "id": 8137730195655,
      "name": "LA FEDE MAGNUM EXTREME BLUE",
      "col": "Lafede",
      "price": 125,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_EXTREME_BLUE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965091.png?v=1722410514"
    },
    {
      "id": 8137648177351,
      "name": "LA FEDE MAGNUM WILD GREEN",
      "col": "Lafede",
      "price": 95,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_WILD_GREEN_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965148.png?v=1722410593"
    },
    {
      "id": 8137641164999,
      "name": "LA FEDE OPERA ROSE L'OR",
      "col": "Lafede",
      "price": 125,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_OPERA_ROSE_L_OR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965196.png?v=1722410696"
    },
    {
      "id": 8137639690439,
      "name": "LA FEDE OPERA NOIR L'OR",
      "col": "Lafede",
      "price": 125,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_OPERA_NOIR_L_OR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965173.png?v=1722410643"
    },
    {
      "id": 8137137815751,
      "name": "LA FEDE LAVISH BLUSH",
      "col": "Lafede",
      "price": 50,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_LAVISH_BLUSH_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965043.png?v=1722410357"
    },
    {
      "id": 8137115205831,
      "name": "LA FEDE LAVISH ROUGE",
      "col": "Lafede",
      "price": 50,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_LAVISH_ROUGE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965067.png?v=1722410410"
    },
    {
      "id": 8137080733895,
      "name": "LA FEDE LAVISH LUNA",
      "col": "Lafede",
      "price": 38,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_LAVISH_LUNA_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965055.png?v=1722410385"
    },
    {
      "id": 8092526411975,
      "name": "FRASH HAREEM AL SULTAN AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_HAREEM_AL_SULTAN_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964518.jpg?v=1722409478"
    },
    {
      "id": 8092502786247,
      "name": "OUD MUATTAR MAAMUL HANEEN",
      "col": "Bakhoor",
      "price": 21,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_HANEEN_48_G_-_Khadlaj_Perfumes-1965670.jpg?v=1722411593"
    },
    {
      "id": 8092416835783,
      "name": "OUD MUATTAR MAAMUL WARDI",
      "col": "Bakhoor",
      "price": 21,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_WARDI_48_G_-_Khadlaj_Perfumes-1965681.jpg?v=1722411615"
    },
    {
      "id": 8092413296839,
      "name": "OUD MUATTAR MAAMUL DAHABI",
      "col": "Bakhoor",
      "price": 21,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAAMUL_DAHABI_48_G_-_Khadlaj_Perfumes-1965659.jpg?v=1722411572"
    },
    {
      "id": 8069288493255,
      "name": "LA FEDE CRYSTALLIA PRIMASO",
      "col": "Lafede",
      "price": 130,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_CRYSTALLIA_PRIMASO_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965006.jpg?v=1776230465"
    },
    {
      "id": 8069037031623,
      "name": "LA FEDE CRYSTALLIA IMPERIO",
      "col": "Lafede",
      "price": 130,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_CRYSTALLIA_IMPERIO_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964995.jpg?v=1776230499"
    },
    {
      "id": 8068803788999,
      "name": "FRASH AFTER ECSTACY AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_ASTER_ECSTACY_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964483.jpg?v=1722409420"
    },
    {
      "id": 8036476453063,
      "name": "FRASH QISSA AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_QISSA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964615.jpg?v=1722409613"
    },
    {
      "id": 8034253078727,
      "name": "KAYAAN GOLD",
      "col": "Perfume Oils",
      "price": 100,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KAYAAN_GOLD_20_ML_-_Khadlaj_Perfumes-1964865.jpg?v=1722410025"
    },
    {
      "id": 7932349415623,
      "name": "LE PRESTIGE BOLD",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_BOLD_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965224.jpg?v=1783948762"
    },
    {
      "id": 7880529510599,
      "name": "LE PRESTIGE EMPRESS",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_EMPRESS_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965241.jpg?v=1783948693"
    },
    {
      "id": 7871133450439,
      "name": "L\xC9 PRESTIGE KING",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_KING_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965257.jpg?v=1783948286"
    },
    {
      "id": 7887419048135,
      "name": "L\xC9 PRESTIGE ROYAL",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LE_PRESTIGE_ROYAL_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965268.jpg?v=1783948597"
    },
    {
      "id": 7923502710983,
      "name": "FRASH AL MAJALIS AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_AL_MAJALIS_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964465.jpg"
    },
    {
      "id": 7923498844359,
      "name": "FRASH SHAMOOKH AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_SHAMOOKH_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964639.jpg"
    },
    {
      "id": 7887478096071,
      "name": "MALIKA GREEN",
      "col": "Perfume Oils",
      "price": 100,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MALIKA_GREEN_20_ML_-_Khadlaj_Perfumes-1965384.jpg?v=1722411061"
    },
    {
      "id": 7880505491655,
      "name": "25 LOYALTY",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_LOYALTY_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964940.jpg?v=1783949037"
    },
    {
      "id": 7880500805831,
      "name": "25 TRUST",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_TRUST_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964947.jpg?v=1783948967"
    },
    {
      "id": 7887475310791,
      "name": "MALIKA RED",
      "col": "Perfume Oils",
      "price": 100,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MALIKA_RED_20_ML_-_Khadlaj_Perfumes-1965402.jpg?v=1722411093"
    },
    {
      "id": 7887470559431,
      "name": "PINK MUSK",
      "col": "Perfume Oils",
      "price": 100,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PINK_MUSK_20_ML_-_Khadlaj_Perfumes-1965776.jpg?v=1722411810"
    },
    {
      "id": 7887473180871,
      "name": "PURPLE MUSK",
      "col": "Perfume Oils",
      "price": 100,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PURPLE_MUSK_20_ML_-_Khadlaj_Perfumes-1965796.jpg?v=1722411845"
    },
    {
      "id": 7887397486791,
      "name": "LA FEDE MAGNUM GOLD EDITION",
      "col": "Lafede",
      "price": 125,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_GOLD_EDITION_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965117.jpg?v=1722410535"
    },
    {
      "id": 7880493433031,
      "name": "25 EXPERIENCE",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_EXPERIENCE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964897.jpg?v=1783948901"
    },
    {
      "id": 7880390279367,
      "name": "25 HERITAGE",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_HERITAGE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964913.jpg?v=1783949209"
    },
    {
      "id": 7880382480583,
      "name": "25 INTEGRITY",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KHADLAJ_25_INTEGRITY_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964925.jpg?v=1783949116"
    },
    {
      "id": 7871045894343,
      "name": "LA FEDE MAGNUM SILVER EDITION",
      "col": "Lafede",
      "price": 125,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MAGNUM_SILVER_EDITION_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965133.jpg?v=1722410566"
    },
    {
      "id": 7880367505607,
      "name": "VALOR ENIGMA",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_ENIGMA_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966082.jpg?v=1783950074"
    },
    {
      "id": 7880365375687,
      "name": "VALOR MYSTIQUE",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_MYSTIQUE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966123.jpg?v=1783949881"
    },
    {
      "id": 7880362098887,
      "name": "VALOR HONOR",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_HONOR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966101.jpg?v=1783949927"
    },
    {
      "id": 7880359706823,
      "name": "VALOR CHIVALRY",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/VALOR_CHIVALRY_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966062.jpg?v=1783949953"
    },
    {
      "id": 7874350219463,
      "name": "EMPIRE REGENT",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_REGENT_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964376.jpg?v=1783950440"
    },
    {
      "id": 7872604143815,
      "name": "EMPIRE CROWN",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_CROWN_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964329.jpg?v=1783950456"
    },
    {
      "id": 7872603291847,
      "name": "EMPIRE EMPRESS",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_EMPRESS_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964353.jpg?v=1783950517"
    },
    {
      "id": 7872601030855,
      "name": "EMPIRE VICTOR",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/EMPIRE_VICTOR_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964409.jpg?v=1783950572"
    },
    {
      "id": 7858357534919,
      "name": "KARUS AMBER GOLD",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_AMBER_GOLD_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964823.jpg?v=1783949629"
    },
    {
      "id": 7554157838535,
      "name": "KARUS GOLD ABSOLU",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/products/karus-gold-absolu.png?v=2"
    },
    {
      "id": 7858340659399,
      "name": "KARUS SECRET MUSK",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_SECRET_MUSK_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964854.jpg?v=1783949701"
    },
    {
      "id": 7858332958919,
      "name": "KARUS BLU SPICE",
      "col": "Eau De Parfum",
      "price": 150,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/KARUS_BLU_SPICE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964834.jpg?v=1783949739"
    },
    {
      "id": 7852696993991,
      "name": "BAKHOOR QUTOOF 55 GM",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_QUTOOF_55_GM_-_Khadlaj_Perfumes-1964149.jpg?v=1722408918"
    },
    {
      "id": 7838835802311,
      "name": "HAREEM AL SULTAN",
      "col": "Eau De Parfum",
      "price": 200,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/HAREEM_AL_SULTAN_Bottle.jpg?v=1783946128"
    },
    {
      "id": 7792441295047,
      "name": "RIMAAL GREEN",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/RIMAAL_GREEN_15_ML_-_Khadlaj_Perfumes-1965844.jpg?v=1776231685"
    },
    {
      "id": 7792438214855,
      "name": "RIMAAL BROWN",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "/assets/images/smart_cropped/smart_RIMAAL_BROWN_15_ML_-_Khadlaj_Perfumes-1965826.jpg"
    },
    {
      "id": 7792432414919,
      "name": "WOW OUD",
      "col": "Eau De Parfum",
      "price": 75,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_WOW_OUD_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966157.jpg"
    },
    {
      "id": 7792427696327,
      "name": "GAITH",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_GAITH_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964668.jpg"
    },
    {
      "id": 7792426582215,
      "name": "NUHA",
      "col": "Eau De Parfum",
      "price": 85,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/NUHA_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965514.jpg?v=1784382712"
    },
    {
      "id": 7752183611591,
      "name": "THE PROPOSAL SPECIAL OCCASION",
      "col": "Eau De Parfum",
      "price": 200,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/THE_PROPOSAL_SPECIAL_OCCASION_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966015.jpg?v=1783948477"
    },
    {
      "id": 7752172765383,
      "name": "THE PROPOSAL DATE NIGHT",
      "col": "Eau De Parfum",
      "price": 200,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/THE_PROPOSAL_DATE_NIGHT_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1966002.jpg?v=1783948404"
    },
    {
      "id": 7734805659847,
      "name": "MAISON EPOQUE ARTISTIQUE",
      "col": "Eau De Parfum",
      "price": 158,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_EPOQUE_ARTISTIQUE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965317.jpg?v=1783950732"
    },
    {
      "id": 7734795632839,
      "name": "MAISON L' OR NOIR",
      "col": "Eau De Parfum",
      "price": 158,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_L_OR_NOIR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965370.jpg?v=1783950815"
    },
    {
      "id": 7734460022983,
      "name": "MAISON FLOR OUD",
      "col": "Eau De Parfum",
      "price": 158,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_FLOR_OUD_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965335.jpg?v=1783950845"
    },
    {
      "id": 7734459498695,
      "name": "MAISON CREATION DE REVE",
      "col": "Eau De Parfum",
      "price": 158,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAISON_CREATION_DE_REVE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965299.jpg?v=1783950976"
    },
    {
      "id": 7726385529031,
      "name": "INFINI ABSOLUTE",
      "col": "Eau De Parfum",
      "price": 137,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/INFINI_ABSOLUTE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1964798.jpg?v=1784011705"
    },
    {
      "id": 7582155407559,
      "name": "HAREEM AL SULTAN SILVER",
      "col": "Perfume Oils",
      "price": 75,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_HAREEM_AL_SULTAN_SILVER_35ML_-_Khadlaj_Perfumes-1964773.jpg"
    },
    {
      "id": 7582151672007,
      "name": "HAREEM AL SULTAN GOLD",
      "col": "Perfume Oils",
      "price": 75,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_HAREEM_AL_SULTAN_GOLD_35ML_-_Khadlaj_Perfumes-1964749.jpg"
    },
    {
      "id": 7721533669575,
      "name": "MUKHALATH MA'A WARD TAIBA",
      "col": "Perfume Oils",
      "price": 280,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Perfume oil"
      ],
      "img": "/assets/images/smart_cropped/smart_MUKHALATH_MA_A_WARD_TAIBA_12_ML_-_Khadlaj_Perfumes-1965432.jpg"
    },
    {
      "id": 7716614078663,
      "name": "MAGNATE NOBLE",
      "col": "Eau De Parfum",
      "price": 60,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAGNATE_NOBLE_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965285.jpg?v=1784369081"
    },
    {
      "id": 7716611293383,
      "name": "MAGNATE PREMIER",
      "col": "Eau De Parfum",
      "price": 60,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAGNATE_PREMIER_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965293.jpg?v=1784369126"
    },
    {
      "id": 7554205352135,
      "name": "ROSE COUTURE",
      "col": "Eau De Parfum",
      "price": 118,
      "size": "100 ml",
      "badge": "",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ROSE_COUTURE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965899.jpg?v=1784369711"
    },
    {
      "id": 7677458972871,
      "name": "OUD MUATTAR OUD AL MAQAAM",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_OUD_AL_MAQAAM_40_G_-_Khadlaj_Perfumes-1965702.jpg"
    },
    {
      "id": 7677438492871,
      "name": "OUD MUATTAR OUD AL SAADA",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_OUD_AL_SAADA_40_G_-_Khadlaj_Perfumes-1965708.jpg"
    },
    {
      "id": 7676794765511,
      "name": "LA FEDE BELLE REVE SEGRATO VIOLA",
      "col": "Lafede",
      "price": 45,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_BELLE_REVE_SEGRATO_VIOLA_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964990.jpg?v=1722410259"
    },
    {
      "id": 7676794339527,
      "name": "LA FEDE BELLA REVE DOLCE FLORE",
      "col": "Lafede",
      "price": 45,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_BELLA_REVE_DOLCE_FLORE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964984.jpg?v=1722410248"
    },
    {
      "id": 7651533717703,
      "name": "MYSTICAL INDIAN OUD PURE",
      "col": "Eau De Parfum",
      "price": 200,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_MYSTICAL_INDIAN-2.jpg"
    },
    {
      "id": 7651506225351,
      "name": "HANEEN ROSE GOLD",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_HANEEN_ROSE_GOLD_20_ML_-_Khadlaj_Perfumes-1964702.jpg"
    },
    {
      "id": 7651482337479,
      "name": "HANEEN GOLD",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_HANEEN_GOLD_20_ML_-_Khadlaj_Perfumes-1964693.jpg"
    },
    {
      "id": 7640196841671,
      "name": "LA FEDE INTOXICATE",
      "col": "Lafede",
      "price": 145,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_INTOXICATE_100_ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965026.jpg?v=1722410324"
    },
    {
      "id": 7640152965319,
      "name": "BUKHOOR AL BAHAAR GOLD",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BUKHOOR_AL_BAHAAR_GOLD_55_G_-_Khadlaj_Perfumes-1964226.jpg?v=1722409036"
    },
    {
      "id": 7639215079623,
      "name": "Mesmerizing Perfume Oil Set of 3 for Him & Her",
      "col": "Perfume Oils",
      "price": 69,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Deals"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Mesmerizing_Perfume_Oil_Set_of_3_for_Him_Her_-_Khadlaj_Perfumes-1965424.jpg?v=1722411133"
    },
    {
      "id": 7638902571207,
      "name": "Amazing Perfume Oil Set of 4 for Him",
      "col": "Perfume Oils",
      "price": 89,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Deals"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Amazing_Perfume_Oil_Set_of_4_for_Him_-_Khadlaj_Perfumes-1963945.jpg?v=1722408612"
    },
    {
      "id": 7638901752007,
      "name": "Enchant all with our Perfume Oil Set of 4 for Her",
      "col": "Perfume Oils",
      "price": 92,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Deals"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Enchant_all_with_our_Perfume_Oil_Set_of_4_for_Her_-_Khadlaj_Perfumes-1964431.jpg?v=1722409351"
    },
    {
      "id": 7638899622087,
      "name": "Exquisite Perfume Oil Set for Him and Her",
      "col": "Perfume Oils",
      "price": 69,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Deals"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Exquisite_Perfume_Oil_Set_for_Him_and_Her_-_Khadlaj_Perfumes-1964439.jpg?v=1722409361"
    },
    {
      "id": 7638896869575,
      "name": "Finest Perfume Oil Set for Him",
      "col": "Perfume Oils",
      "price": 69,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Deals"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Finest_Perfume_Oil_Set_for_Him_-_Khadlaj_Perfumes-1964454.jpg?v=1722409380"
    },
    {
      "id": 7638896181447,
      "name": "Luxurious Perfume Oil Set of 3 for Him",
      "col": "Perfume Oils",
      "price": 61,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Deals"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Luxurious_Perfume_Oil_Set_of_3_for_Him_-_Khadlaj_Perfumes-1965279.jpg?v=1722410854"
    },
    {
      "id": 7627660591303,
      "name": "OUD MUATTAR GHANAATI",
      "col": "Bakhoor",
      "price": 65,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_GHANAATI_100_G_-_Khadlaj_Perfumes-1965632.jpg"
    },
    {
      "id": 7627659509959,
      "name": "OUD MUATTAR KHAWAATER",
      "col": "Bakhoor",
      "price": 35,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_KHAWAATER_35_G_-_Khadlaj_Perfumes-1965650.jpg"
    },
    {
      "id": 7602862031047,
      "name": "STELLAR OUD",
      "col": "Eau De Parfum",
      "price": 80,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_STELLAR_OUD_100_ML_EDP_SPRAY_FOR_MEN_WOMEN_-_Khadlaj_Perfumes-1965984.jpg"
    },
    {
      "id": 7602860949703,
      "name": "STELLAR MUSK",
      "col": "Eau De Parfum",
      "price": 80,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Her",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_STELLAR_MUSK_100_ML_EDP_SPRAY_FOR_WOMEN_-_Khadlaj_Perfumes-1965978.jpg"
    },
    {
      "id": 7598654980295,
      "name": "CASHMERE SUNSHINE MUSK",
      "col": "Eau De Parfum",
      "price": 140,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CASHMERE_SUNSHINE_MUSK_100_ML_EDP_SPRAY_FOR_MEN_WOMEN_-_Khadlaj_Perfumes-1964238.jpg?v=1784011864"
    },
    {
      "id": 7598653505735,
      "name": "CASHMERE WARM OUD",
      "col": "Eau De Parfum",
      "price": 140,
      "size": "100ml EDP",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CASHMERE_WARM_OUD_100_ML_EDP_SPRAY_FOR_MEN_WOMEN_-_Khadlaj_Perfumes-1964248.jpg?v=1784011805"
    },
    {
      "id": 7598644396231,
      "name": "LA FEDE AURA KISS OF ROSE",
      "col": "Lafede",
      "price": 70,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_AURA_KISS_OF_ROSE_100_ML_EDP_SPRAY_FOR_WOMEN_-_Khadlaj_Perfumes-1964975.jpg?v=1722410230"
    },
    {
      "id": 7598637777095,
      "name": "LA FEDE AURA CRISP FLOWER",
      "col": "Lafede",
      "price": 70,
      "size": "100ml EDP",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_AURA_CRISP_FLOWER_100_ML_EDP_SPRAY_FOR_WOMEN_-_Khadlaj_Perfumes-1964964.jpg?v=1722410213"
    },
    {
      "id": 7582427381959,
      "name": "MIBRAAK",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_MIBRAAK_18ML_-_Khadlaj_Perfumes-1965427.jpg"
    },
    {
      "id": 7582424268999,
      "name": "IBHAAR",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_IBHAAR_18ML_-_Khadlaj_Perfumes-1964788.jpg"
    },
    {
      "id": 7582421254343,
      "name": "ASTOORA",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_ASTOORA_18ML_-_Khadlaj_Perfumes-1963955.jpg"
    },
    {
      "id": 7582413947079,
      "name": "FATIMA",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_FATIMA_15ML_-_Khadlaj_Perfumes-1964446.jpg"
    },
    {
      "id": 7582409949383,
      "name": "ANAB",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_ANAB_18ML_-_Khadlaj_Perfumes-1963948.jpg"
    },
    {
      "id": 7582406574279,
      "name": "AZAARI",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_AZAARI_17ML_-_Khadlaj_Perfumes-1963961.jpg"
    },
    {
      "id": 7582193680583,
      "name": "GHAZLAAN",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_GHAZLAAN_20ML_-_Khadlaj_Perfumes-1964689.jpg"
    },
    {
      "id": 7582193057991,
      "name": "RANIYA",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_RANIYA_18ML_-_Khadlaj_Perfumes-1965818.jpg"
    },
    {
      "id": 7582192304327,
      "name": "AALIYA",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_AALIYA_27ML_-_Khadlaj_Perfumes-1963911.jpg"
    },
    {
      "id": 7582186242247,
      "name": "ROOHI WA ROOHAK SILVER",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_ROOHI_WA_ROOHAK_SILVER_20_ML_-_Khadlaj_Perfumes-1965884.jpg"
    },
    {
      "id": 7582185095367,
      "name": "ROOHI WA ROOHAK GOLD",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_ROOHI_WA_ROOHAK_GOLD_20_ML_-_Khadlaj_Perfumes-1965877.jpg"
    },
    {
      "id": 7582182899911,
      "name": "ALF WARDAAT",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_ALF_WARDAAT_30ML_-_Khadlaj_Perfumes-1963933.jpg"
    },
    {
      "id": 7582179262663,
      "name": "AL FURSAN",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_AL_FURSAN_18ML_-_Khadlaj_Perfumes-1963918.jpg"
    },
    {
      "id": 7582167105735,
      "name": "AL RIYAN",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_AL_RIYAN_17ML_-_Khadlaj_Perfumes-1963926.jpg"
    },
    {
      "id": 7582158979271,
      "name": "JAMEEL",
      "col": "Perfume Oils",
      "price": 50,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_JAMEEL_25ML_-_Khadlaj_Perfumes-1964811.jpg"
    },
    {
      "id": 7582143119559,
      "name": "ZAINAB",
      "col": "Perfume Oils",
      "price": 45,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_ZAINAB_18_ML_-_Khadlaj_Perfumes-1966171.jpg"
    },
    {
      "id": 7582139089095,
      "name": "ROOH AL OUD",
      "col": "Dehn Al Oudh",
      "price": 525,
      "size": "100ml EDP",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_ROOH_AL_OUD_12_ML_-_Khadlaj_Perfumes-1965864.jpg"
    },
    {
      "id": 7554129625287,
      "name": "FRASH DALOUAA AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_DALOUAA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964497.jpg"
    },
    {
      "id": 7554137391303,
      "name": "FRASH ZAHOOR AL KHALEEJ AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 38,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_ZAHOOR_AL_KHALEEJ_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964652.jpg"
    },
    {
      "id": 7554137456839,
      "name": "FRASH ROMANCIA AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 38,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_ROMANCIA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964632.jpg"
    },
    {
      "id": 7554137555143,
      "name": "FRASH MAKHMALI AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 38,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_MAKHMALI_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964589.jpg"
    },
    {
      "id": 7554137522375,
      "name": "FRASH MUSKY AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 38,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_MUSKY_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964602.jpg"
    },
    {
      "id": 7554137489607,
      "name": "FRASH NASEEM AL WARD AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 38,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_NASEEM_AL_WARD_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964609.jpg"
    },
    {
      "id": 7554137915591,
      "name": "BARWAAZ SOLID GREY",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BARWAAZ_SOLID_GREY_EDP_SPRAY_100ML_-_Khadlaj_Perfumes-1964221.jpg?v=1784369469"
    },
    {
      "id": 7554137653447,
      "name": "FRASH LA YUQAWAM AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 38,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_LA_YUQAWAM_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964537.jpg"
    },
    {
      "id": 7554138505415,
      "name": "OUD MUATTAR GHALIYA",
      "col": "Bakhoor",
      "price": 35,
      "size": "35 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_GHALIYA_35_G_-_Khadlaj_Perfumes-1965626.jpg"
    },
    {
      "id": 7554138439879,
      "name": "OUD MUATTAR MUNAWWARA",
      "col": "Bakhoor",
      "price": 35,
      "size": "35 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_MUNAWWARA_35_G_-_Khadlaj_Perfumes-1965696.jpg"
    },
    {
      "id": 7554137981127,
      "name": "BARWAAZ SADDLE BROWN",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BARWAAZ_SADDLE_BROWN_EDP_100_ML_-_Khadlaj_Perfumes-1964210.jpg?v=1784369421"
    },
    {
      "id": 7554143355079,
      "name": "SHAMOOKH SILVER",
      "col": "Perfume Oils",
      "price": 50,
      "size": "20 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_SHAMOOKH_SILVER_20ML_-_Khadlaj_Perfumes-1965933.jpg"
    },
    {
      "id": 7554143092935,
      "name": "FRASH MUKHALLAT SHUYOOKHI AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "/assets/images/smart_cropped/smart_FRASH_MUKHALLAT_SHUYOOKHI_AIR_FRESHENER_320_ML_-_Khadlaj_Perfumes-1964596.jpg"
    },
    {
      "id": 7554138865863,
      "name": "BAKHOOR HANEEN 100 GMS",
      "col": "Bakhoor",
      "price": 53,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_BAKHOOR_HANEEN_100_GMS_-_Khadlaj_Perfumes-1964075.jpg"
    },
    {
      "id": 7554138767559,
      "name": "BAKHOOR MAHA 100 GMS",
      "col": "Bakhoor",
      "price": 53,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_BAKHOOR_MAHA_100_GMS_-_Khadlaj_Perfumes-1964119.jpg"
    },
    {
      "id": 7554143748295,
      "name": "MUSK WA OUD",
      "col": "Eau De Parfum",
      "price": 50,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_WA_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965483.jpg?v=1771046715"
    },
    {
      "id": 7554143715527,
      "name": "MUSK WA WARD",
      "col": "Eau De Parfum",
      "price": 50,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_MUSK_WA_WARD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965487.jpg"
    },
    {
      "id": 7554143518919,
      "name": "UNO INTIMO",
      "col": "Eau De Parfum",
      "price": 45,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966033.jpg"
    },
    {
      "id": 7554144043207,
      "name": "OUD MUATTAR RIMAAL 40GM",
      "col": "Bakhoor",
      "price": 37,
      "size": "40 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_RIMAAL_40GM_-_Khadlaj_Perfumes-1965721.jpg"
    },
    {
      "id": 7554144010439,
      "name": "OUD MUATTAR SAMOU AL OUD 40GM",
      "col": "Bakhoor",
      "price": 37,
      "size": "40 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "/assets/images/smart_cropped/smart_OUD_MUATTAR_SAMOU_AL_OUD_40GM_-_Khadlaj_Perfumes-1965730.jpg"
    },
    {
      "id": 7554143813831,
      "name": "MUSK RASAAS",
      "col": "Eau De Parfum",
      "price": 50,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_RASAAS_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965459.jpg?v=1722411198"
    },
    {
      "id": 7554204664007,
      "name": "FRASH MAHASIN KHAWATER AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_KHAWATER_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964565.jpg?v=1722409542"
    },
    {
      "id": 7554204631239,
      "name": "FRASH MAHASIN OUD AL AHBAB AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_OUD_AL_AHBAB_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964571.jpg?v=1722409552"
    },
    {
      "id": 7554204532935,
      "name": "FRASH MAHASIN SILVER AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_SILVER_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964579.jpg?v=1722409561"
    },
    {
      "id": 7554204500167,
      "name": "FRASH ZAHRET AL LAILAK AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_ZAHRET_AL_LAILAK_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964660.jpg?v=1722409681"
    },
    {
      "id": 7554204860615,
      "name": "FRASH MAHASIN ABAYA AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_ABAYA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964545.jpg?v=1722409511"
    },
    {
      "id": 7554204827847,
      "name": "FRASH MAHASIN AL RIYAN AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_AL_RIYAN_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964551.jpg?v=1722409524"
    },
    {
      "id": 7554204729543,
      "name": "FRASH MAHASIN GOLD AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_MAHASIN_GOLD_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964559.jpg?v=1722409533"
    },
    {
      "id": 7554204991687,
      "name": "FRASH AL ABYAD AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_AL_ABYAD_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964458.jpg?v=1722409385"
    },
    {
      "id": 7554204958919,
      "name": "FRASH BINT AKABIR AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_BINT_AKABIR_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964490.jpg?v=1722409430"
    },
    {
      "id": 7554204926151,
      "name": "FRASH FARFASHA AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_FARFASHA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964503.jpg?v=1722409449"
    },
    {
      "id": 7554204893383,
      "name": "FRASH KASAR AL SAADA AIR FRESHENER",
      "col": "Eau De Parfum",
      "price": 37,
      "size": "320 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Air freshner"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/FRASH_KASAR_AL_SAADA_AIR_FRESHENER_320ML_-_Khadlaj_Perfumes-1964530.jpg?v=1722409492"
    },
    {
      "id": 7554205122759,
      "name": "SHAMOOKH GOLD",
      "col": "Perfume Oils",
      "price": 50,
      "size": "20 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAMOOKH_GOLD_20ML_-_Khadlaj_Perfumes-1965928.jpg?v=1722412114"
    },
    {
      "id": 7554205089991,
      "name": "MAZOON GOLD",
      "col": "Perfume Oils",
      "price": 50,
      "size": "18 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAZOON_GOLD_18ML_-_Khadlaj_Perfumes-1965412.jpg?v=1722411115"
    },
    {
      "id": 7554205057223,
      "name": "MAZOON ROSE GOLD",
      "col": "Perfume Oils",
      "price": 50,
      "size": "18 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MAZOON_ROSE_GOLD_18_ML_-_Khadlaj_Perfumes-1965418.jpg?v=1722411124"
    },
    {
      "id": 7554205319367,
      "name": "UNO DURABLE",
      "col": "Eau De Parfum",
      "price": 55,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_DURABLE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966025.jpg?v=1722412307"
    },
    {
      "id": 7554205253831,
      "name": "UNO LUSSO",
      "col": "Eau De Parfum",
      "price": 42,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_LUSSO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966042.jpg?v=1722412344"
    },
    {
      "id": 7554205221063,
      "name": "UNO SENSUALE",
      "col": "Eau De Parfum",
      "price": 55,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_SENSUALE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966051.jpg?v=1722412362"
    },
    {
      "id": 7554205155527,
      "name": "SHAHI OUD",
      "col": "Eau De Parfum",
      "price": 35,
      "size": "100 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1784369275"
    },
    {
      "id": 7554205515975,
      "name": "MUSK SAHRA",
      "col": "Eau De Parfum",
      "price": 50,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/MUSK_SAHRA_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965475.jpg?v=1771046641"
    },
    {
      "id": 7554205384903,
      "name": "ROSE AND ROMANCE",
      "col": "Eau De Parfum",
      "price": 50,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ROSE_AND_ROMANCE_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965893.jpg?v=1784382622"
    },
    {
      "id": 7554206204103,
      "name": "BAKHOOR TAIBA",
      "col": "Bakhoor",
      "price": 32,
      "size": "58 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_TAIBA_58_G_-_Khadlaj_Perfumes-1964187.jpg?v=1722408978"
    },
    {
      "id": 7554206105799,
      "name": "OUD MUATTAR AL AZRAQ 40GM",
      "col": "Bakhoor",
      "price": 35,
      "size": "40 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_AL_AZRAQ_40GM_-_Khadlaj_Perfumes-1965615.jpg?v=1722411495"
    },
    {
      "id": 7554206040263,
      "name": "OUD MUATTAR BADAR",
      "col": "Bakhoor",
      "price": 21,
      "size": "30 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_BADAR_30_G_-_Khadlaj_Perfumes-1965621.jpg?v=1722411506"
    },
    {
      "id": 7554206007495,
      "name": "OUD MUATTAR MAJNOON",
      "col": "Bakhoor",
      "price": 27,
      "size": "50 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_MAJNOON_50_G_-_Khadlaj_Perfumes-1965690.jpg?v=1722411633"
    },
    {
      "id": 7554206367943,
      "name": "BAKHOOR BAIT AL ATHEEQ",
      "col": "Bakhoor",
      "price": 21,
      "size": "65 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BAIT_AL_ATHEEQ_65_G_-_Khadlaj_Perfumes-1964016.jpg?v=1722408721"
    },
    {
      "id": 7554206302407,
      "name": "BAKHOOR BAIT AL ISRA",
      "col": "Bakhoor",
      "price": 21,
      "size": "65 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BAIT_AL_ISRA_65_G_-_Khadlaj_Perfumes-1964025.jpg?v=1722408731"
    },
    {
      "id": 7554206236871,
      "name": "BAKHOOR MARAH",
      "col": "Bakhoor",
      "price": 21,
      "size": "55 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_MARAH_55_G_-_Khadlaj_Perfumes-1964126.jpg?v=1722408886"
    },
    {
      "id": 7554206499015,
      "name": "BAKHOOR TAHIYA",
      "col": "Bakhoor",
      "price": 21,
      "size": "60 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_TAHIYA_60_G_-_Khadlaj_Perfumes-1964178.jpg?v=1722408964"
    },
    {
      "id": 7554206466247,
      "name": "BAKHOOR ASDAAF",
      "col": "Bakhoor",
      "price": 21,
      "size": "70 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_ASDAAF_70_G_-_Khadlaj_Perfumes-1963989.jpg?v=1722408676"
    },
    {
      "id": 7554206400711,
      "name": "BAKHOOR ATEEB",
      "col": "Bakhoor",
      "price": 21,
      "size": "70 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_ATEEB_70_G_-_Khadlaj_Perfumes-1963996.jpg?v=1722408685"
    },
    {
      "id": 7554206630087,
      "name": "BAKHOOR MUDHELA",
      "col": "Bakhoor",
      "price": 21,
      "size": "60 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_MUDHELA_60_G_-_Khadlaj_Perfumes-1964134.jpg?v=1722408897"
    },
    {
      "id": 7554206597319,
      "name": "BAKHOOR NOUF 100 GMS",
      "col": "Bakhoor",
      "price": 53,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_NOUF_100_GMS_-_Khadlaj_Perfumes-1964141.jpg?v=1722408908"
    },
    {
      "id": 7554206564551,
      "name": "BAKHOOR RUKAIYA 55GM",
      "col": "Bakhoor",
      "price": 27,
      "size": "55 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_RUKAIYA_55GM_-_Khadlaj_Perfumes-1964162.jpg?v=1722408938"
    },
    {
      "id": 7554206531783,
      "name": "BAKHOOR SOUGAH",
      "col": "Bakhoor",
      "price": 32,
      "size": "55 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_SOUGAH_55_G_-_Khadlaj_Perfumes-1964170.jpg?v=1722408952"
    },
    {
      "id": 7554206793927,
      "name": "BAKHOOR HOOR AL AIN 72GM",
      "col": "Bakhoor",
      "price": 27,
      "size": "72 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_HOOR_AL_AIN_72GM_-_Khadlaj_Perfumes-1964082.jpg?v=1722408821"
    },
    {
      "id": 7554206695623,
      "name": "BAKHOOR INSHERAH 55GM",
      "col": "Bakhoor",
      "price": 35,
      "size": "55 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_INSHERAH_55GM_-_Khadlaj_Perfumes-1964091.jpg?v=1722408837"
    },
    {
      "id": 7554206662855,
      "name": "BAKHOOR KHULOOD",
      "col": "Bakhoor",
      "price": 27,
      "size": "72 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_KHULOOD_72_G_-_Khadlaj_Perfumes-1964112.jpg?v=1722408867"
    },
    {
      "id": 7554206892231,
      "name": "BAKHOOR BAIT AL AHLAM",
      "col": "Bakhoor",
      "price": 21,
      "size": "45 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BAIT_AL_AHLAM_45_G_-_Khadlaj_Perfumes-1964003.jpg?v=1722408697"
    },
    {
      "id": 7554120188103,
      "name": "BAKHOOR AMAAR 100 GMS",
      "col": "Bakhoor",
      "price": 53,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_AMAAR_100_GMS_-_Khadlaj_Perfumes-1963980.jpg?v=1722408666"
    },
    {
      "id": 7554206957767,
      "name": "BAKHOOR AL BAHAAR",
      "col": "Bakhoor",
      "price": 35,
      "size": "55 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_AL_BAHAAR_55_G_-_Khadlaj_Perfumes-1963970.jpg?v=1722408647"
    },
    {
      "id": 7554206859463,
      "name": "BAKHOOR GANAA 120GM",
      "col": "Bakhoor",
      "price": 90,
      "size": "120 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_GANAA_120GM_-_Khadlaj_Perfumes-1964063.jpg?v=1722408787"
    },
    {
      "id": 7554206826695,
      "name": "BAKHOOR HAKIM 100gm",
      "col": "Bakhoor",
      "price": 74,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_HAKIM_100gm_-_Khadlaj_Perfumes-1964067.jpg?v=1722408798"
    },
    {
      "id": 7554206269639,
      "name": "BAKHOOR BU KHALIFA",
      "col": "Bakhoor",
      "price": 90,
      "size": "120 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BU_KHALIFA_120_G_-_Khadlaj_Perfumes-1964039.jpg?v=1722408751"
    },
    {
      "id": 7554206171335,
      "name": "BAKHOOR KASHMEERI 120GM",
      "col": "Bakhoor",
      "price": 90,
      "size": "120 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_KASHMEERI_120GM_-_Khadlaj_Perfumes-1964106.jpg?v=1722408857"
    },
    {
      "id": 7554206138567,
      "name": "OUD MUATTAR AFZAL 24GM",
      "col": "Bakhoor",
      "price": 63,
      "size": "24 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_AFZAL_24GM_-_Khadlaj_Perfumes-1965609.jpg?v=1722411485"
    },
    {
      "id": 7554205909191,
      "name": "MUSK POUR NARCIS",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100 ml",
      "badge": "",
      "gender": "Her",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_4.jpg?v=1784007371"
    },
    {
      "id": 7554205876423,
      "name": "OUD POUR BLUEBERRY",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_5.jpg?v=1784007569"
    },
    {
      "id": 7554205843655,
      "name": "OUD POUR KLASSIK",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_POUR_KLASSIK_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965756.jpg?v=1722411765"
    },
    {
      "id": 7554205810887,
      "name": "OUD POUR NOBLE",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_6.jpg?v=1784007947"
    },
    {
      "id": 7554205778119,
      "name": "OUD POUR ROUGE",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BOTTLE_7.jpg?v=1784008049"
    },
    {
      "id": 7554205745351,
      "name": "OUD POUR SHAIKH",
      "col": "Eau De Parfum",
      "price": 130,
      "size": "100 ml",
      "badge": "",
      "gender": "Him",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Perfume.jpg?v=1784008336"
    },
    {
      "id": 7554205712583,
      "name": "LA FEDE FIRST LADY",
      "col": "Lafede",
      "price": 210,
      "size": "75 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_FIRST_LADY_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965018.jpg?v=1722410308"
    },
    {
      "id": 7554205679815,
      "name": "LA FEDE MISS PREMIERE",
      "col": "Lafede",
      "price": 210,
      "size": "75 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_MISS_PREMIERE_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965165.jpg?v=1722410627"
    },
    {
      "id": 7554205483207,
      "name": "PURE MUSK",
      "col": "Eau De Parfum",
      "price": 50,
      "size": "100 ml",
      "badge": "Best Seller",
      "gender": "Unisex",
      "notes": [
        "Musk",
        "Floral",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/PURE_MUSK_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965788.jpg?v=1784382776"
    },
    {
      "id": 7554205450439,
      "name": "OMBRE NOTES",
      "col": "Eau De Parfum",
      "price": 118,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OMBRE_NOTES_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965535.jpg?v=1784368548"
    },
    {
      "id": 7554205188295,
      "name": "INFINI",
      "col": "Eau De Parfum",
      "price": 53,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/INFINI_EDP_SPRAY_100ML_-_Khadlaj_Perfumes-1964808.jpg?v=1784369227"
    },
    {
      "id": 7554143617223,
      "name": "SENSUOS NIGHT",
      "col": "Eau De Parfum",
      "price": 118,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SENSUOS_NIGHT_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965914.jpg?v=1784368457"
    },
    {
      "id": 7554138603719,
      "name": "OUD MUATTAR KHALAB 100GM",
      "col": "Bakhoor",
      "price": 60,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_KHALAB_100GM_-_Khadlaj_Perfumes-1965643.jpg?v=1722411545"
    },
    {
      "id": 7554138341575,
      "name": "OUD MUATTAR QAISER 100GM",
      "col": "Bakhoor",
      "price": 60,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_MUATTAR_QAISER_100GM_-_Khadlaj_Perfumes-1965714.jpg?v=1722411690"
    },
    {
      "id": 7554138079431,
      "name": "OUD NOIR",
      "col": "Eau De Parfum",
      "price": 118,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/OUD_NOIR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965741.jpg?v=1784012003"
    },
    {
      "id": 7554130182343,
      "name": "CODE MARRON OUD",
      "col": "Eau De Parfum",
      "price": 210,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_MARRON_OUD_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964255.jpg?v=1722409079"
    },
    {
      "id": 7554130116807,
      "name": "CODE ROUGE AMOUR",
      "col": "Eau De Parfum",
      "price": 210,
      "size": "100 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_ROUGE_AMOUR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964262.jpg?v=1722409089"
    },
    {
      "id": 7554130051271,
      "name": "CODE VERDE SUBLIME",
      "col": "Eau De Parfum",
      "price": 210,
      "size": "100 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_VERDE_SUBLIME_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964272.jpg?v=1722409106"
    },
    {
      "id": 7554130018503,
      "name": "CODE VIOLA NECTAR",
      "col": "Eau De Parfum",
      "price": 210,
      "size": "100 ml",
      "badge": "For Her",
      "gender": "Her",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CODE_VIOLA_NECTAR_100ML_EDP_SPRAY_-_Khadlaj_Perfumes-1964279.jpg?v=1722409115"
    },
    {
      "id": 7554129952967,
      "name": "LA FEDE KINGSMAN",
      "col": "Lafede",
      "price": 210,
      "size": "75 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_KINGSMAN_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965035.jpg?v=1722410340"
    },
    {
      "id": 7554129887431,
      "name": "LA FEDE STATESMAN",
      "col": "Lafede",
      "price": 210,
      "size": "75 ml",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/LA_FEDE_STATESMAN_75ML_EDP_SPRAY_-_Khadlaj_Perfumes-1965207.jpg?v=1722410717"
    },
    {
      "id": 7554120155335,
      "name": "BAKHOOR BELAD ZAYED 120GM",
      "col": "Bakhoor",
      "price": 90,
      "size": "120 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_BELAD_ZAYED_120GM_-_Khadlaj_Perfumes-1964033.jpg?v=1722408741"
    },
    {
      "id": 7554120089799,
      "name": "BAKHOOR DHIYAFA 120GM",
      "col": "Bakhoor",
      "price": 90,
      "size": "120 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_DHIYAFA_120GM_-_Khadlaj_Perfumes-1964046.jpg?v=1722408763"
    },
    {
      "id": 7554120057031,
      "name": "BAKHOOR DUKHOON MAKNOON",
      "col": "Bakhoor",
      "price": 74,
      "size": "100 g",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Musk",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/BAKHOOR_DUKHOON_MAKNOON_100_G_-_Khadlaj_Perfumes-1964057.jpg?v=1722408777"
    },
    {
      "id": 7554119958727,
      "name": "WILD INDONESIAN OUD PURE",
      "col": "Eau De Parfum",
      "price": 200,
      "size": "100ml EDP",
      "badge": "For Him",
      "gender": "Him",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Wild_Indonesian-04.jpg?v=1764136825"
    },
    {
      "id": 7554119925959,
      "name": "DEHNAL OUD AQDAM",
      "col": "Dehn Al Oudh",
      "price": 95,
      "size": "3 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUD_AQDAM_3ML_-_Khadlaj_Perfumes-1964287.jpg?v=1722409125"
    },
    {
      "id": 7554119893191,
      "name": "DEHNAL OUD AZEEM",
      "col": "Dehn Al Oudh",
      "price": 95,
      "size": "3 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUD_AZEEM_3ML_-_Khadlaj_Perfumes-1964293.jpg?v=1722409134"
    },
    {
      "id": 7554119860423,
      "name": "DEHNAL OUD TURAAS",
      "col": "Dehn Al Oudh",
      "price": 95,
      "size": "3 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUD_TURAAS_3ML_-_Khadlaj_Perfumes-1964300.jpg?v=1722409143"
    },
    {
      "id": 7554119794887,
      "name": "DEHNAL OUDH ASAL",
      "col": "Dehn Al Oudh",
      "price": 189,
      "size": "3 ml",
      "badge": "",
      "gender": "Unisex",
      "notes": [
        "Oud",
        "Woody",
        "Amber"
      ],
      "img": "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/DEHNAL_OUDH_ASAL_3_ML_-_Khadlaj_Perfumes-1964308.jpg?v=1722409153"
    }
  ];
  var REVIEWS = [
    { name: "perfumelover99", country: "Fragrantica", stars: 5, text: "I finally gave in to the TikTok hype and bought Hareem Al Sultan Gold. The oil is thick and starts off extremely fruity like peach, then settles into a sweet, slightly powdery musk. You only need a few drops, it projects like crazy.", url: "https://www.fragrantica.com/perfume/Khadlaj/Hareem-Al-Sultan-Gold-86714.html" },
    { name: "scentguy_88", country: "Reddit", stars: 5, text: "To my nose, Shiyaaka Silver is an incredible alternative to Reflection Man. It has that same bright, white floral and woody signature. The performance is solid, easily getting 8 hours.", url: "https://www.reddit.com/r/fragranceclones/comments/16lpx6f/khadlaj_shiyaaka_silver_is_it_really_reflection/" },
    { name: "RosieFragrances", country: "Fragrantica", stars: 5, text: "Fatima Velvet Love is gorgeous. It reminds me a bit of Delina Exclusif with that creamy, sweet rose and vanilla combination. The presentation is 10/10 and longevity is beast mode on clothes.", url: "https://www.parfumo.com/Perfumes/Zimaya/fatima-velvet-love" },
    { name: "OudAndAbout", country: "YouTube", stars: 5, text: "A very well done boozy, spicy vanilla. La Fede Intoxicate opens with a strong cognac note and dries down to a smooth cinnamon-praline vanilla. Definitely smells way more expensive than it is.", url: "https://www.youtube.com/watch?v=d_k8dZ8vVkw" },
    { name: "desert_rose", country: "Reddit", stars: 5, text: "The Blue version of Hareem Al Sultan is much fresher and aquatic compared to the Gold. It has a beautiful citrus opening with a soft woody base. It\u2019s my go-to for hot summer days.", url: "https://www.fragrantica.com/perfume/Khadlaj-Perfumes/Hareem-Al-Sultan-Blue-93777.html" },
    { name: "frag_head23", country: "Fragrantica", stars: 5, text: "If you like authentic, rich oud, this is for you. It's bold, dark, and very Middle Eastern. The rose in the background balances it perfectly. Two sprays max, otherwise it fills a room.", url: "https://www.youtube.com/watch?v=0hM4J5oE6uA" },
    { name: "Aisha M.", country: "TikTok", stars: 5, text: "Everyone asks me what I'm wearing when I use Hareem Al Sultan. It lasts through a 12 hour shift and even after a shower. The hype is 100% real!", url: "https://www.youtube.com/watch?v=kYJc-MhBf_w" },
    { name: "LuxeScents", country: "YouTube", stars: 5, text: "Shiyaaka Red is the ultimate compliment getter. It smells exactly like a certain $300 niche fragrance but performs even better. Khadlaj is dominating right now.", url: "https://www.reddit.com/r/fragranceclones/comments/17jzj3k/shiyaaka_red_khadlaj/" }
  ];
  var REELS = [
    {
      id: "7602275376135408918",
      title: "Hareem Al Sultan Gold Review",
      caption: "The viral sensation on #perfumetok. Does it live up to the hype?",
      tag: "Viral on TikTok",
      price: 195,
      img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CloudCandy1.jpg?v=1767169755"
    },
    {
      id: "7614741288168066334",
      title: "Panache First Impressions",
      caption: "A gorgeous creamy floral gourmand. Completely blind buy safe!",
      tag: "First Impressions",
      price: 200,
      img: "/assets/images/products/panache-cutout.png"
    },
    {
      id: "7639701570875165985",
      title: "Shiyaaka Silver - Affordable Niche?",
      caption: "This smells 10x more expensive than it is. Unbelievable quality.",
      tag: "Hidden Gem",
      price: 126,
      img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/SHAHI_OUD_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1965925.jpg?v=1722412108"
    },
    {
      id: "7608773049986469134",
      title: "Island Extrait Layering Combo",
      caption: "How I layer Khadlaj Island for a 24-hour scent bubble.",
      tag: "Layering Tip",
      price: 355,
      img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/UNO_INTIMO_EDP_SPRAY_100_ML_-_Khadlaj_Perfumes-1966036.jpg?v=1722412332"
    },
    {
      id: "7643796160100191496",
      title: "Zayaan Silver Unboxing",
      caption: "The packaging on this is insane. Luxury on a budget.",
      tag: "Unboxing",
      price: 150,
      img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Bleu_Glace_02.jpg?v=1738325363"
    },
    {
      id: "7602275376135408918",
      title: "Cream Velvet - Compliment Getter",
      caption: "Wore this today and got stopped 3 times. Must have for gourmand lovers.",
      tag: "Review",
      price: 345,
      img: "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/CreamVelvet-3.jpg?v=1779352383"
    }
  ];
  var SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/khadlajperfumes",
    facebook: "https://www.facebook.com/khadlajperfumes",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/@khadlaj.uk"
  };
  var CATEGORIES = ["Best Sellers", "New", "For Him", "For Her", "Unisex", "Perfume Oils", "EAU DE PARFUM", "Master Perfumery"];
  var GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Cinzel:wght@400;500;600;700&display=swap');
  @import url('https://fonts.cdnfonts.com/css/trajan-pro');
  *{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:#fff;color:#000;font-family:'Montserrat',sans-serif;overflow-x:clip;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:#fff;}
  ::-webkit-scrollbar-thumb{background:#000;}
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  h1,h2,h3,h4,.disp{font-family:'Trajan Pro', 'Cinzel', serif; text-transform: uppercase; font-weight: 400 !important;}
  .mono{font-family:'Montserrat',sans-serif;}
  
  .country-dropdown { position: relative; display: inline-block; padding: 6px 0; }
  .country-dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background: #fff; border: 1px solid #E8E4DC; border-radius: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 200; padding: 6px; min-width: 140px; margin-top: 4px; }
  .country-dropdown:hover .country-dropdown-menu { display: flex; flex-direction: column; gap: 2px; }

  /* YSL-style primary button: solid black */
  .btn-gold{
    background:#000;color:#fff;border:1px solid #000;
    padding:14px 32px;
    font-family:'Montserrat',sans-serif;font-weight:500;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:background .22s,color .22s;
  }
  .btn-gold:hover{background:#B8922A;border-color:#B8922A;color:#fff;}

  /* ghost = outlined black */
  .btn-ghost{
    background:transparent;color:#000;border:1px solid #000;
    padding:13px 28px;
    font-family:'Montserrat',sans-serif;font-weight:400;font-size:11px;
    letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;
    transition:all .22s;
  }
  .btn-ghost:hover{background:#000;color:#fff;}

  .gold-line{width:40px;height:1px;background:#B8922A;margin:0 auto;}
  .eyebrow{font-size:10px;letter-spacing:4px;color:#B8922A;text-transform:uppercase;font-family:'Montserrat',sans-serif;}

  /* Product card \u2014 YSL-style: no lift, just a clean image reveal */
  .card-lift{transition:opacity .25s;}
  .card-lift:hover{opacity:.94;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  .fu{animation:fadeUp .65s ease both;}

  @keyframes ribbonScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  .ribbon-inner{display:flex;animation:ribbonScroll 80s linear infinite;width:max-content;}

  .reel-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 14px;-webkit-overflow-scrolling:touch;}
  .reel-track::-webkit-scrollbar{height:3px;}
  .reel-track::-webkit-scrollbar-track{background:#000;}
  .reel-track::-webkit-scrollbar-thumb{background:#B8922A;}
  .reel-card{scroll-snap-align:start;flex:0 0 min(330px,82vw);text-decoration:none;color:inherit;}
  .reel-badge{backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

  /* Hide TikTok iframe scrollbars */
  iframe{scrolling:no;overflow:hidden;}
  .tiktok-card{overflow:hidden;position:relative;}
  .tiktok-card iframe{pointer-events:none;border:none;overflow:hidden;}

  input,textarea{font-family:'Montserrat',sans-serif;}

  /* New arrivals horizontal scroll */
  .new-scroll::-webkit-scrollbar{height:2px;}
  .new-scroll::-webkit-scrollbar-track{background:#F0EDE8;}
  .new-scroll::-webkit-scrollbar-thumb{background:#000;}

  /* Newsletter popup */
  @keyframes popIn{from{opacity:0;transform:translateY(24px) scale(.97);}to{opacity:1;transform:translateY(0) scale(1);}}
  .popup-in{animation:popIn .4s cubic-bezier(.34,1.56,.64,1) both;}

  /* Floating pulse */
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(184,146,42,.4);}50%{box-shadow:0 0 0 10px rgba(184,146,42,0);}}
  .pulse{animation:pulse 2.5s infinite;}

  /* Gold shimmer on hover */
  @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
  .shimmer-text{
    background:linear-gradient(90deg,#B8922A 0%,#F0D080 40%,#B8922A 60%,#D4AF5A 100%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 3s linear infinite;
  }

  /* Navbar Link Hover Effect */
  .nav-link { position: relative; cursor: pointer; padding-bottom: 10px; color: #251737; transition: color 0.4s ease, transform 0.4s ease; display: inline-block; }
  .nav-link::after { 
    content: '\u2726'; 
    position: absolute; 
    bottom: -10px; 
    left: 50%; 
    transform: translateX(-50%) scale(0) rotate(-90deg); 
    opacity: 0; 
    color: #B8922A; 
    font-size: 11px;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); 
  }
  .nav-link:hover { color: #B8922A; transform: translateY(-3px); }
  .nav-link:hover::after { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
  .nav-link.active { color: #B8922A; transform: translateY(-3px); }
  .nav-link.active::after { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
  
  .mob-nav-link { transition: all 0.3s ease; }
  .mob-nav-link:hover { background: #FAF8F4; color: #B8922A !important; padding-left: 8% !important; }

  @keyframes lafedeFloat{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-10px) scale(1.015);}}
  @keyframes lafedeFloatSmall{0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(8px) rotate(1.5deg);}}
  @keyframes lafedeGlow{0%,100%{opacity:.34;transform:scale(.94);}50%{opacity:.72;transform:scale(1.05);}}
  @keyframes lafedeSweep{0%{transform:translateX(-140%) rotate(16deg);opacity:0;}35%{opacity:.18;}100%{transform:translateX(140%) rotate(16deg);opacity:0;}}

  /* Scratch Card Animations */
  @keyframes floatY { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } }
  .bottle-float { animation: floatY 4s ease-in-out infinite; }

  /* 25th Anniversary Section */
  /* 25th Anniversary Section - Single Line Animated Layout */
  .khadlaj25-section { background: #FAF8F4; padding: 120px 0; overflow: hidden; }
  .k25-header { text-align: center; padding: 0 5%; margin-bottom: 80px; }
  
  .k25-slider-container { width: 100%; overflow-x: auto; position: relative; padding: 20px 0; scroll-behavior: smooth; -ms-overflow-style: none; scrollbar-width: none; scroll-snap-type: x mandatory; }
  .k25-slider-container::-webkit-scrollbar { display: none; }
  .k25-slider-track { display: flex; width: max-content; }
  
  
  .k25-card { 
    width: 380px; margin: 0 20px; scroll-snap-align: center;
    background: linear-gradient(145deg, #2A1A40, #180F25); 
    border: 1px solid rgba(184,146,42,0.25);
    border-radius: 200px 200px 20px 20px;
    overflow: hidden; position: relative; 
    transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); 
    display: flex; flex-direction: column; 
    align-items: center; align-self: stretch; justify-content: flex-start;
    box-shadow: inset 0 0 40px rgba(184,146,42,0.03), 0 15px 35px rgba(0,0,0,0.3);
  }
  .k25-card:hover { 
    transform: translateY(-12px) scale(1.02); 
    box-shadow: inset 0 0 60px rgba(184,146,42,0.1), 0 30px 60px rgba(0,0,0,0.5), 0 0 30px rgba(184,146,42,0.2);
    border-color: rgba(184,146,42,0.8);
  }
  
  .k25-card-img-wrapper { 
    height: 420px; width: 100%; position: relative; 
    background: radial-gradient(circle at 50% 50%, rgba(184,146,42,0.12) 0%, transparent 65%); 
    flex-shrink: 0; 
    display: flex; align-items: center; justify-content: center;
    border-radius: 200px 200px 0 0;
    overflow: hidden;
  }
  
  .k25-card-img-wrapper img { 
    height: 100%; width: 100%; object-fit: cover; display: block; 
    transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.8s ease;
  }
  .k25-card:hover .k25-card-img-wrapper img { 
    transform: scale(1.08); 
    filter: brightness(1.15); 
  }
  
  .k25-card-content { 
    padding: 10px 30px 40px; text-align: center; position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
    width: 100%; background: transparent;
    flex-grow: 1; transition: all 0.6s ease;
  }
  
  .k25-card-title { 
    font-family: 'Playfair Display', serif; font-size: 34px; color: #fff; margin-bottom: 6px; letter-spacing: 3px;
    background: linear-gradient(to right, #ffffff, #C8A97E, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-size: 200% auto; animation: shine 5s linear infinite;
  }
  .k25-card-subtitle { font-size: 10px; color: #C8A97E; letter-spacing: 5px; margin-bottom: 20px; text-transform: uppercase; font-weight: 500; }
  .k25-card-desc { font-family: 'Montserrat', sans-serif; font-size: 12px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 30px; padding: 0 10px; }
  
  /* Creative Animated Button */
  .k25-card-btn { 
    margin-top: auto; position: relative; overflow: hidden; z-index: 1;
    padding: 14px 34px; background: transparent; border: 1px solid rgba(200,169,126,0.3); 
    border-radius: 30px;
    color: #C8A97E; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.4s; 
  }
  .k25-card:hover .k25-card-btn { 
    background: #C8A97E; color: #180F25; border-color: #C8A97E; box-shadow: 0 5px 20px rgba(200,169,126,0.4);
  }
  @keyframes shine {
    to { background-position: 200% center; }
  }

  @media(max-width: 1024px) {
    .k25-card { width: 340px; }
  }
  @media(max-width: 768px) {
    .k25-card { width: 300px; }
    .k25-card-img-wrapper { height: 360px; }
    .k25-card-content { padding: 10px 20px 30px; }
    .k25-card-title { font-size: 28px; }
  }

  /* Discovery Grid */
  .discovery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; padding: 0 5%; justify-items: center; }
  .discovery-card { 
    width: 100%; max-width: 350px; aspect-ratio: 3/4; 
    border-radius: 8px; overflow: hidden; position: relative; cursor: pointer;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08); transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .discovery-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); filter: brightness(0.85); }
  .discovery-card-overlay { 
    position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.2) 60%, transparent 100%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 30px 20px;
    transform: translateY(0); opacity: 1; transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .discovery-card:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(0,0,0,0.2); }
  .discovery-card:hover img { transform: scale(1.08); filter: brightness(1.1); }
  
  .discovery-type { font-size: 10px; color: #E8E4DC; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; font-weight: 500; font-family: 'Montserrat', sans-serif; opacity: 0.9; transition: all 0.6s 0.1s; }
  .discovery-name { font-family: 'Playfair Display', serif; font-size: 26px; color: #fff; margin-bottom: 20px; transition: all 0.6s 0.2s; }
  .discovery-btn { 
    display: inline-flex; align-items: center; justify-content: center; padding: 12px 24px; border: 1px solid rgba(255,255,255,0.4); color: #fff;
    font-size: 10px; text-transform: uppercase; letter-spacing: 2px; width: fit-content; transition: all 0.4s; font-family: 'Montserrat', sans-serif;
    transform: translateY(0); opacity: 1;
  }
  .discovery-card:hover .discovery-btn { background: #fff; color: #000; border-color: #fff; }
  
  @media(max-width: 1024px) {
    .discovery-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media(max-width: 768px) {
    .discovery-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 0 3%; }
    .discovery-card { aspect-ratio: 4/5; }
  }
  @media(max-width: 480px) {
    .discovery-grid { grid-template-columns: 1fr; }
    .discovery-card { aspect-ratio: auto; height: 400px; }
  }

  /* Gift Slider */
  .gift-slider-section { padding: 80px 0 100px; background: #fff; overflow: hidden; position: relative; }
  .gift-slider-track { display: flex; width: max-content; animation: slideGifts 35s linear infinite; }
  .gift-slider-track:hover { animation-play-state: paused; }
  @keyframes slideGifts { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  
  .gift-slide-card { width: 680px; height: 380px; margin: 0 20px; background: #F0EBE6; border: 1px solid #EBE4DD; border-radius: 4px; overflow: hidden; cursor: pointer; transition: transform 0.4s ease, box-shadow 0.4s ease; display: flex; flex-direction: row; }
  .gift-slide-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.08); }
  
  .gift-slide-img { flex: 1.3; position: relative; display: flex; justify-content: center; align-items: center; padding: 20px; }
  .gift-slide-img img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1)); position: relative; z-index: 0; }
  .gift-slide-card:hover .gift-slide-img img { transform: scale(1.08); filter: drop-shadow(0 30px 40px rgba(0,0,0,0.15)); }
  
  .gift-slide-content { flex: 1; padding: 10% 8% 10% 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; z-index: 2; }
  .gift-slide-eyebrow { color: #888; font-size: 9px; letter-spacing: 4px; text-transform: uppercase; font-family: 'Montserrat',sans-serif; margin-bottom: 16px; font-weight: 600; }
  .gift-slide-title { font-family: 'Playfair Display', serif; font-size: 42px; line-height: 1.1; color: #251737; margin-bottom: 30px; font-weight: 300; }
  .gift-slide-btn { background: transparent; color: #251737; border: 1px solid #251737; padding: 14px 32px; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; cursor: pointer; transition: all 0.4s ease; width: max-content; }
  .gift-slide-card:hover .gift-slide-btn { background: #B8922A; border-color: #B8922A; color: #fff; }
  
  @media(max-width: 768px) {
    .gift-slide-card { width: 340px; height: auto; flex-direction: column; }
    .gift-slide-img { height: 300px; flex: auto; padding: 20px; }
    .gift-slide-content { padding: 40px 20px; }
    .gift-slide-title { font-size: 32px; }
  }
  
  @keyframes shimmerSweep { 0% { left: -100%; } 100% { left: 150%; } }
  .shimmer-effect {
    position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmerSweep 2.5s infinite;
    pointer-events: none;
    transform: skewX(-20deg);
  }
  
  @keyframes glowUp {
    0% { transform: scale(0.9); opacity: 0; }
    50% { transform: scale(1.05); opacity: 1; text-shadow: 0 0 20px rgba(184,146,42,0.6); }
    100% { transform: scale(1); opacity: 1; text-shadow: 0 0 10px rgba(184,146,42,0.2); }
  }
  .glow-up { animation: glowUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }

  .scratch-hover { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s; width: 100%; max-width: 320px; }
  .scratch-hover:hover { transform: scale(1.04); box-shadow: inset 0 4px 10px rgba(0,0,0,0.4), 0 12px 30px rgba(184,146,42,0.25) !important; }
  .scratch-text { font-size: 30px; letter-spacing: 5px; }

  .popup-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,.7); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }

  .max-container { max-width: 1440px; margin: 0 auto; width: 100%; }

  /* \u2500\u2500 Mobile responsive \u2500\u2500 */
  @media(max-width:900px){
    .hide-mob{display:none!important;}
    .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important;width:100%!important;}
    .product-card{min-width:0!important;overflow:hidden!important;}
    .product-image-stage{height:clamp(190px,42vw,270px)!important;}
    .product-card-info{padding:12px 4px 16px!important;min-width:0!important;}
    .product-card-title{font-size:13px!important;letter-spacing:.6px!important;overflow-wrap:anywhere!important;}
    .product-card-size{font-size:11px!important;margin-bottom:9px!important;}
    .product-notes{gap:3px!important;min-width:0!important;overflow:hidden!important;}
    .product-note{font-size:7.3px!important;letter-spacing:.25px!important;padding:3px 4px!important;gap:2px!important;min-width:0!important;}
    .product-note-dot{width:4px!important;height:4px!important;}
    .auth-visual-panel{display:none!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .hero-split{grid-template-columns:1fr!important;}
    .hero-img-wrap{height:320px!important;min-height:unset!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .hero-section { padding: 28px 5% 24px !important; }
    .hero-layout { grid-template-columns:1fr !important; gap: 28px !important; }
    .hero-copy { padding: 0 !important; }
    .hero-visual { min-height: 420px !important; order:-1; }
    .hero-headline { font-size: 38px !important; }
    .gift-hero-copy{max-width:72%!important;padding-left:6%!important;}
  }
  @media(max-width:600px){
    .collections-layout{grid-template-columns:1fr!important;}
    .collections-sidebar{position:static!important;left:auto!important;top:auto!important;width:100%!important;max-height:none!important;overflow:visible!important;}
    .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;}
    .product-image-stage{height:clamp(170px,48vw,230px)!important;}
    .product-card-title{font-size:12px!important;letter-spacing:.4px!important;}
    .product-note{font-size:6.8px!important;padding:3px 3.5px!important;}
    .cart-line{grid-template-columns:82px 1fr!important;align-items:start!important;}
    .cart-line-actions{grid-column:1 / -1!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .grid-2{grid-template-columns:1fr!important;}
    .new-scroll > div{flex:0 0 78vw!important;}
    .reel-card{flex:0 0 88vw!important;}
    .hero-section { padding: 24px 5% 20px !important; }
    .hero-layout { gap: 22px !important; }
    .hero-visual { min-height: 330px !important; }
    .hero-headline { font-size: 30px !important; line-height: 1.15 !important; margin-bottom: 10px !important; }
    .hero-subtitle { font-size: 13px !important; line-height: 1.6 !important; max-width: 100% !important; margin-bottom: 16px !important; }
    .hero-stats-row { gap: 10px !important; padding-top: 10px !important; flex-wrap: wrap !important; }
    .hero-stat-item { padding-right: 10px !important; margin-right: 10px !important; }
    .popup-overlay { align-items: flex-end !important; padding: 0 !important; }
    .popup-in { box-sizing: border-box !important; border-radius: 24px 24px 0 0 !important; width: 100% !important; max-width: 100% !important; border: none !important; border-top: 1px solid rgba(212,175,55,0.3) !important; animation: slideUp .5s cubic-bezier(0.16, 1, 0.3, 1) both !important; padding: 35px 20px 40px !important; }
    @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .disp.mobile-text { font-size: 19px !important; letter-spacing: 0.5px !important; }
  }
  @media(max-width:480px){
    .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;}
    .product-image-stage{height:clamp(150px,52vw,205px)!important;}
    .product-card-title{font-size:11px!important;line-height:1.25!important;}
    .product-note{font-size:6.2px!important;letter-spacing:0!important;padding:2.5px 3px!important;}
    .scratch-text { font-size: 24px !important; letter-spacing: 3px !important; }
    .scratch-hover { height: 85px !important; }
    .popup-in{grid-template-columns:1fr!important;}
    .hero-layout { gap: 18px !important; }
    .hero-visual { min-height: 280px !important; }
    .k25-row { flex-direction: column !important; min-height: auto; }
    .k25-image-pane { min-height: 500px; width: 100%; }
    .k25-text-pane { padding: 80px 8% !important; align-items: center; text-align: center; }
    .k25-row-title { font-size: 38px; }
    .khadlaj25-section { padding: 80px 0 !important; }
    .k25-header { margin-bottom: 50px; }
    .hero-cta-row { flex-direction: column !important; gap: 8px !important; width: 100% !important; }
    .hero-cta-row button { width: 100% !important; text-align: center !important; justify-content: center !important; }
    .hero-stats-row { border-top: none !important; padding-top: 0 !important; }
    .hero-stat-item { border-right: none !important; flex: 1 1 40% !important; margin-right: 0 !important; padding-right: 0 !important; }
    .gift-hero-copy{max-width:100%!important;text-align:center!important;align-items:center!important;padding:0 6%!important;}
  }
`;
  function StarRating({ n = 5, color = C.brass }) {
    return /* @__PURE__ */ import_react.default.createElement("span", { style: { color, fontSize: 13, letterSpacing: 1 } }, "\u2605".repeat(n), "\u2606".repeat(5 - n));
  }
  function ProductCard({ p, onView, onCart }) {
    const [hov, setHov] = (0, import_react.useState)(false);
    const { activeCountry } = import_react.default.useContext(CountryContext);
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    const notes = p.notes || [];
    const collectionLabel = p.col === "Lafede" ? "La Fede" : p.col;
    const noteColors = ["#C8A96E", "#9C7B50", "#B8866A", "#7A9E8A", "#8B7EAA", "#B06A6A", "#6A8BAA", "#A09060"];
    const imageScale = {
      "Biscotti Date Toffee": 0.82,
      "Biscotti Melon Musk": 0.88,
      "Bleu Glac\xE9": 0.62,
      "Saraya": 0.78,
      "SHIYAAKA SNOW": 1.35,
      "SHIYAAKA SHADOW": 1.05,
      "KARUS GOLD ABSOLU": 1.05,
      "ISLAND": 1.05,
      "SAWAAR VANILLE BLANC": 1.05,
      "PANACHE ANGEL DUST": 1.15,
      "SARAYA": 1.08,
      "QARAR": 1.08,
      "IHTHIRAAM": 1.08,
      "ZAYAAN SILVER": 0.88,
      "ICON": 1.05
    }[p.name] || 0.88;
    const imageShiftY = {
      "Biscotti Date Toffee": 0.02,
      "Biscotti Melon Musk": 0.05,
      "Bleu Glac\xE9": 0.02,
      "Saraya": 0.06,
      "SHIYAAKA SNOW": -0.1,
      "SHIYAAKA SHADOW": 0,
      "KHADLAJ ISLAND": -0.02,
      "SAWAAR VANILLE BLANC": 0.15,
      "ZAYAAN SILVER": 0,
      "KHADLAJ ICON": 0,
      "QARAR": 0,
      "KHADLAJ IHTHIRAAM": 0,
      "PANACHE ANGEL DUST": 0,
      "SARAYA": 0.08
    }[p.name] || 0;
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: "product-card",
        onMouseEnter: () => setHov(true),
        onMouseLeave: () => setHov(false),
        onClick: () => onView(p),
        style: {
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          cursor: "pointer",
          border: "none",
          alignSelf: "stretch",
          isolation: "isolate",
          transition: "transform .4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          transform: hov ? "translateY(-4px)" : "translateY(0)"
        }
      },
      p.badge && /* @__PURE__ */ import_react.default.createElement("span", { style: {
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 3,
        background: p.badge === "Limited" ? "#5C0000" : p.badge === "New" ? "#B8922A" : "#251737",
        color: "#fff",
        fontSize: 9.5,
        letterSpacing: 2.5,
        padding: "5px 11px",
        fontWeight: 600,
        textTransform: "uppercase",
        fontFamily: "'Montserrat',sans-serif"
      } }, p.badge),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "product-image-stage", style: {
        position: "relative",
        width: "100%",
        height: "clamp(250px, 22vw, 330px)",
        overflow: "hidden",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        transition: "box-shadow .35s ease,border-color .35s ease"
      } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "gift-hero-copy", style: {
        position: "absolute",
        inset: "12px",
        background: "transparent",
        display: "none",
        pointerEvents: "none"
      } }), /* @__PURE__ */ import_react.default.createElement("div", { style: {
        position: "absolute",
        left: "24%",
        right: "24%",
        bottom: 22,
        height: 14,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,0,0,.09) 0%, rgba(0,0,0,.025) 48%, rgba(0,0,0,0) 72%)",
        filter: "blur(2px)",
        opacity: hov ? 0.7 : 0.45,
        transition: "opacity .35s ease"
      } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: "42px 0 26px 0", display: "flex", alignItems: "flex-end", justifyContent: "center" } }, /* @__PURE__ */ import_react.default.createElement(
        "img",
        {
          src: p.img,
          alt: p.name,
          loading: "lazy",
          style: {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center center",
            mixBlendMode: "multiply",
            background: "transparent",
            filter: "brightness(1.05) contrast(1.02)",
            transition: "transform .8s cubic-bezier(0.25, 1, 0.25, 1)",
            transform: hov ? `translateY(calc(-2px + ${imageShiftY * 100}%)) scale(${imageScale * 1.05})` : `translateY(${imageShiftY * 100}%) scale(${imageScale})`
          }
        }
      )), /* @__PURE__ */ import_react.default.createElement("div", { style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        transition: "all .4s cubic-bezier(0.25, 1, 0.25, 1)",
        transform: hov ? "translateY(0)" : "translateY(20px)",
        opacity: hov ? 1 : 0,
        zIndex: 10
      } }, /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            if (onCart) onCart(p);
          },
          style: {
            width: "100%",
            background: "#251737",
            color: "#fff",
            border: "none",
            padding: "12px",
            fontSize: 11,
            letterSpacing: 2,
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "uppercase",
            fontFamily: "'Montserrat',sans-serif",
            transition: "background .3s"
          },
          onMouseEnter: (e) => e.target.style.background = "#B8922A",
          onMouseLeave: (e) => e.target.style.background = "#251737"
        },
        "Add to Bag"
      ))),
      /* @__PURE__ */ import_react.default.createElement("div", { className: "product-card-info", style: { padding: "16px 10px 18px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9.5, letterSpacing: 3, color: "#B8922A", textTransform: "uppercase", marginBottom: 7, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, collectionLabel), /* @__PURE__ */ import_react.default.createElement("h3", { className: "product-card-title", style: { fontSize: 15.5, fontWeight: 600, color: "#251737", lineHeight: 1.25, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1.1 } }, p.name), /* @__PURE__ */ import_react.default.createElement("p", { className: "product-card-size", style: { fontSize: 12.5, color: "#888", marginBottom: 12, fontFamily: "'Montserrat',sans-serif", letterSpacing: 0.4, fontWeight: 400 } }, p.size), notes.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "product-notes", style: { display: "flex", flexWrap: "nowrap", gap: 4, marginBottom: 12, justifyContent: "center", alignItems: "center", width: "100%" } }, notes.map((n, i) => /* @__PURE__ */ import_react.default.createElement("span", { className: "product-note", key: n, style: { display: "inline-flex", alignItems: "center", gap: 3, padding: "3px 6px", background: "#f5f5f5", fontSize: 8, letterSpacing: 0.7, color: "#666", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, whiteSpace: "nowrap", borderRadius: 2 } }, /* @__PURE__ */ import_react.default.createElement("span", { className: "product-note-dot", style: { width: 4, height: 4, borderRadius: "50%", background: "#C8A96E", flexShrink: 0, display: "inline-block" } }), n))), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: "auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 12, borderTop: "1px solid #F0F0F0" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, justifyContent: "center" } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { color: "#C8A96E", fontSize: 12, letterSpacing: 1 } }, "\u2605".repeat(5)), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 10, color: "#aaa", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, "(905)")), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 17, fontWeight: 600, color: "#251737", fontFamily: "'Montserrat',sans-serif" } }, formatPrice(p.price))))
    );
  }
  function SectionHeader({ eyebrow, title, sub, light = false }) {
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", marginBottom: 52 } }, eyebrow && /* @__PURE__ */ import_react.default.createElement("p", { className: "eyebrow", style: { marginBottom: 14, color: "#B8922A" } }, eyebrow), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(28px,3.8vw,52px)", fontWeight: 300, color: light ? "#fff" : "#251737", lineHeight: 1.15, letterSpacing: "-0.5px", marginBottom: sub ? 14 : 0 } }, title), sub && /* @__PURE__ */ import_react.default.createElement("p", { style: { color: light ? "rgba(255,255,255,0.7)" : "#777", fontSize: 14, maxWidth: 500, margin: "0 auto", lineHeight: 1.8, fontFamily: "'Montserrat',sans-serif" } }, sub));
  }
  function TikTokCard({ t }) {
    const [hov, setHov] = (0, import_react.useState)(false);
    const { activeCountry } = import_react.default.useContext(CountryContext);
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        onMouseEnter: () => setHov(true),
        onMouseLeave: () => setHov(false),
        style: {
          flex: "0 0 320px",
          height: 520,
          position: "relative",
          background: "#251737",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          scrollSnapAlign: "center",
          transform: hov ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hov ? "0 24px 48px rgba(0,0,0,.15)" : "0 8px 24px rgba(0,0,0,.06)",
          transition: "all .4s cubic-bezier(.25,.8,.25,1)"
        }
      },
      /* @__PURE__ */ import_react.default.createElement(
        "iframe",
        {
          src: `https://www.tiktok.com/embed/v2/${t.id}`,
          scrolling: "no",
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            zIndex: 1,
            pointerEvents: hov ? "auto" : "none",
            transform: hov ? "scale(1.02)" : "scale(1)",
            transition: "transform .6s ease"
          },
          allow: "encrypted-media",
          allowFullScreen: true,
          title: t.title
        }
      ),
      /* @__PURE__ */ import_react.default.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        zIndex: 2,
        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%)",
        pointerEvents: "none"
      } }),
      /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", zIndex: 3, padding: "30px 24px", color: "#fff", pointerEvents: "none" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: 48, height: 48, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 6 } }, /* @__PURE__ */ import_react.default.createElement("img", { src: t.img, alt: "", style: { width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "normal", filter: "contrast(1.02) brightness(0.98)" } })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#C1A46A", fontFamily: "'Montserrat',sans-serif", marginBottom: 4 } }, t.tag || "Trending"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 18, fontWeight: 400, fontFamily: "'Montserrat',sans-serif", lineHeight: 1, color: "#fff" } }, t.title))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 16 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 16, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", color: "#fff" } }, formatPrice(t.price)), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, fontFamily: "'Montserrat',sans-serif", display: "flex", alignItems: "center", gap: 6, color: "#fff" } }, "Shop Now ", /* @__PURE__ */ import_react.default.createElement("span", null, "\u2192"))))
    );
  }
  function TrustBanner() {
    const items = [
      {
        title: "SECURE PAYMENTS",
        desc: "100% encrypted transactions",
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "2", y1: "10", x2: "22", y2: "10" }))
      },
      {
        title: "CRUELTY FREE",
        desc: "Ethically crafted fragrances",
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M13 16a3 3 0 0 1 2.24 5" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M18 12h.01" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M20 8.54V4a2 2 0 1 0-4 0v3" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M7.612 12.524a3 3 0 1 0-1.6 4.3" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M4 15.5v.01" }))
      },
      {
        title: "FREE SAMPLES",
        desc: "With every single order",
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M10 2v7.31" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M14 9.3V1.99" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M8.5 2h7" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M14 9.3a6.5 6.5 0 1 1-4 0" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M5.52 16h12.96" }))
      },
      {
        title: "GLOBAL SHIPPING",
        desc: "Delivered worldwide",
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("rect", { x: "1", y: "3", width: "15", height: "13" }), /* @__PURE__ */ import_react.default.createElement("polygon", { points: "16 8 20 8 23 11 23 16 16 16 16 8" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "5.5", cy: "18.5", r: "2.5" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "18.5", cy: "18.5", r: "2.5" }))
      }
    ];
    return /* @__PURE__ */ import_react.default.createElement("div", { style: {
      background: "linear-gradient(90deg, #F9F7F1 0%, #FFFFFF 50%, #F9F7F1 100%)",
      borderTop: "1px solid #E8E4DC",
      borderBottom: "1px solid #E8E4DC",
      padding: "40px 5%"
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: {
      maxWidth: 1440,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 30,
      alignItems: "center"
    } }, items.map((it, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: i, style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "10px"
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      background: "rgba(184,146,42,0.1)",
      color: "#B8922A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16
    } }, it.icon), /* @__PURE__ */ import_react.default.createElement("h4", { style: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      color: "#251737",
      textTransform: "uppercase",
      marginBottom: 6
    } }, it.title), /* @__PURE__ */ import_react.default.createElement("p", { style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 13,
      fontStyle: "italic",
      color: "#888"
    } }, it.desc)))));
  }
  function HomePage({ setPage, addToCart, setViewProduct }) {
    const [activeCat, setActiveCat] = (0, import_react.useState)("Best Sellers");
    const [hov, setHov] = (0, import_react.useState)(null);
    const [quizStep, setQuizStep] = (0, import_react.useState)(1);
    const [quizMood, setQuizMood] = (0, import_react.useState)("");
    const [quizOccasion, setQuizOccasion] = (0, import_react.useState)("");
    const [quizResult, setQuizResult] = (0, import_react.useState)(null);
    const quizProducts = {
      "Rich & Exotic": {
        "Royal Evenings": PRODUCTS.find((p) => p.id === 204) || PRODUCTS[0],
        "Daily Wear & Office": PRODUCTS.find((p) => p.id === 20) || PRODUCTS[0],
        "Romantic Date Nights": PRODUCTS.find((p) => p.id === 200) || PRODUCTS[0]
      },
      "Fresh & Energizing": {
        "Royal Evenings": PRODUCTS.find((p) => p.id === 301) || PRODUCTS[0],
        "Daily Wear & Office": PRODUCTS.find((p) => p.id === 13) || PRODUCTS[0],
        "Romantic Date Nights": PRODUCTS.find((p) => p.id === 15) || PRODUCTS[0]
      },
      "Clean & Sophisticated": {
        "Royal Evenings": PRODUCTS.find((p) => p.id === 208) || PRODUCTS[0],
        "Daily Wear & Office": PRODUCTS.find((p) => p.id === 14) || PRODUCTS[0],
        "Romantic Date Nights": PRODUCTS.find((p) => p.id === 303) || PRODUCTS[0]
      }
    };
    const filtered = PRODUCTS.filter((p) => {
      const isKhadlajProduct = p.col !== "Lafede";
      if (activeCat === "Khadlaj") return p.col !== "Lafede";
      if (activeCat === "Best Sellers") return isKhadlajProduct && p.badge === "Best Seller";
      if (activeCat === "New") return isKhadlajProduct && p.badge === "New";
      if (activeCat === "For Him") return isKhadlajProduct && p.gender === "Him";
      if (activeCat === "For Her") return isKhadlajProduct && p.gender === "Her";
      if (activeCat === "Unisex") return isKhadlajProduct && p.gender === "Unisex";
      if (activeCat === "Perfume Oils") return isKhadlajProduct && p.col === "Perfume Oils";
      if (activeCat === "EAU DE PARFUM") return isKhadlajProduct && p.col.toLowerCase() === "eau de parfum";
      if (activeCat === "Master Perfumery") return isKhadlajProduct && p.col === "Master Perfumery";
      return isKhadlajProduct && (p.col || "").toLowerCase() === activeCat.toLowerCase();
    }).slice(0, activeCat === "Best Sellers" ? 6 : 16);
    const newLaunches = PRODUCTS.filter((p) => p.badge === "New").slice(0, 8);
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("section", { className: "hero-section", style: { position: "relative", width: "100%", height: "70vh", minHeight: "450px", overflow: "hidden", background: "#0a0a0a" } }, /* @__PURE__ */ import_react.default.createElement(
      "video",
      {
        className: "hero-video",
        src: "./assets/videos/duty-free.mp4",
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        preload: "auto",
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.8 }
      }
    ), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(8,8,8,.04) 0%,rgba(8,8,8,.18) 35%,rgba(8,8,8,.52) 100%)", pointerEvents: "none" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(0,0,0,.28) 0%,rgba(0,0,0,.05) 50%,rgba(0,0,0,.22) 100%)", pointerEvents: "none" } })), /* @__PURE__ */ import_react.default.createElement("div", { style: { overflow: "hidden", background: "#251737", padding: "24px 0", borderTop: "1px solid rgba(193,164,106,0.15)", borderBottom: "1px solid rgba(193,164,106,0.15)" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "ribbon-inner", style: { display: "flex", alignItems: "center" } }, [...SCENT_RIBBON, ...SCENT_RIBBON, ...SCENT_RIBBON].map((n, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: i, style: { display: "flex", alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 12, fontWeight: 400, letterSpacing: 8, color: "#E8E4DC", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "'Montserrat',sans-serif" } }, n), /* @__PURE__ */ import_react.default.createElement("span", { style: { margin: "0 64px", color: "#C1A46A", fontSize: 10 } }, "\u2726"))))), /* @__PURE__ */ import_react.default.createElement("section", { className: "khadlaj25-section" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "k25-header" }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 11, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 } }, "The Masterpiece"), /* @__PURE__ */ import_react.default.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: 46, color: "#251737", margin: 0, fontWeight: 500 } }, "Shiyaaka Collection"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: "#555", maxWidth: 640, margin: "20px auto 0", lineHeight: 1.6 } }, "Experience the essence of modern sophistication. A definitive collection curated for elegance and timeless charm.")), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", padding: "0 2%" } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => document.getElementById("k25-scroll-container").scrollBy({ left: -460, behavior: "smooth" }), style: { position: "absolute", left: "3%", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: 56, height: 56, borderRadius: "50%", background: "#fff", border: "1px solid #E8E4DC", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", cursor: "pointer", color: "#251737", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }, onMouseEnter: (e) => {
      e.currentTarget.style.background = "#251737";
      e.currentTarget.style.color = "#fff";
    }, onMouseLeave: (e) => {
      e.currentTarget.style.background = "#fff";
      e.currentTarget.style.color = "#251737";
    } }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M15 18l-6-6 6-6" }))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => document.getElementById("k25-scroll-container").scrollBy({ left: 460, behavior: "smooth" }), style: { position: "absolute", right: "3%", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: 56, height: 56, borderRadius: "50%", background: "#fff", border: "1px solid #E8E4DC", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", cursor: "pointer", color: "#251737", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }, onMouseEnter: (e) => {
      e.currentTarget.style.background = "#251737";
      e.currentTarget.style.color = "#fff";
    }, onMouseLeave: (e) => {
      e.currentTarget.style.background = "#fff";
      e.currentTarget.style.color = "#251737";
    } }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M9 18l6-6-6-6" }))), /* @__PURE__ */ import_react.default.createElement("div", { id: "k25-scroll-container", className: "k25-slider-container" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "k25-slider-track" }, [
      { name: "SHIYAAKA SKY", subtitle: "Fresh & Uplifting", desc: "A refreshing blend of fresh citrus and sky breeze notes, anchored by a warm cedarwood foundation.", img: "/assets/images/products/shiyaaka_custom_5_cropped.png" },
      { name: "SHIYAAKA SHADOW", subtitle: "Mysterious & Bold", desc: "A captivating fragrance that symbolizes modern masculinity, bottled for the discerning individual.", img: "/assets/images/products/shiyaaka_custom_3.jpg" },
      { name: "SHIYAAKA SNOW", subtitle: "Crisp & Pure", desc: "An aromatic tribute to the frosty freshness, woven into the very fabric of our heritage.", img: "/assets/images/products/shiyaaka_custom_4.png" },
      { name: "SHIYAAKA GOLD", subtitle: "Timeless Elegance", desc: "A majestic blend reflecting strength, honor, and timeless elegance that lasts through the ages.", img: "/assets/images/products/shiyaaka_custom_2.jpg" },
      { name: "SHIYAAKA BLUE", subtitle: "Fresh & Aquatic", desc: "Built on the essence of pure freshness, leaving a trail of sophisticated confidence wherever you go.", img: "/assets/images/products/shiyaaka_custom_1.jpg" },
      { name: "SHIYAAKA SKY", subtitle: "Fresh & Uplifting", desc: "A refreshing blend of fresh citrus and sky breeze notes, anchored by a warm cedarwood foundation.", img: "/assets/images/products/shiyaaka_custom_5_cropped.png" },
      { name: "SHIYAAKA SHADOW", subtitle: "Mysterious & Bold", desc: "A captivating fragrance that symbolizes modern masculinity, bottled for the discerning individual.", img: "/assets/images/products/shiyaaka_custom_3.jpg" },
      { name: "SHIYAAKA SNOW", subtitle: "Crisp & Pure", desc: "An aromatic tribute to the frosty freshness, woven into the very fabric of our heritage.", img: "/assets/images/products/shiyaaka_custom_4.png" },
      { name: "SHIYAAKA GOLD", subtitle: "Timeless Elegance", desc: "A majestic blend reflecting strength, honor, and timeless elegance that lasts through the ages.", img: "/assets/images/products/shiyaaka_custom_2.jpg" },
      { name: "SHIYAAKA BLUE", subtitle: "Fresh & Aquatic", desc: "Built on the essence of pure freshness, leaving a trail of sophisticated confidence wherever you go.", img: "/assets/images/products/shiyaaka_custom_1.jpg" }
    ].map((item, idx) => /* @__PURE__ */ import_react.default.createElement("div", { className: "k25-card", key: idx }, /* @__PURE__ */ import_react.default.createElement("div", { className: "k25-card-img-wrapper" }, /* @__PURE__ */ import_react.default.createElement("img", { src: item.img, alt: item.name })), /* @__PURE__ */ import_react.default.createElement("div", { className: "k25-card-content" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "k25-card-title" }, item.name), /* @__PURE__ */ import_react.default.createElement("p", { className: "k25-card-subtitle" }, item.subtitle), /* @__PURE__ */ import_react.default.createElement("p", { className: "k25-card-desc" }, item.desc), /* @__PURE__ */ import_react.default.createElement("button", { className: "k25-card-btn" }, "Discover")))))))), /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "84px 5% 96px", background: "linear-gradient(180deg, #fff 0%, #fcfaf7 100%)" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-container" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 28, textAlign: "center" } }, /* @__PURE__ */ import_react.default.createElement(SectionHeader, { title: "New Launches", sub: "A balanced spotlight on the latest fragrances, curated to feel clean and contemporary." })), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24, alignItems: "stretch" }, className: "grid-4" }, newLaunches.map((p) => /* @__PURE__ */ import_react.default.createElement(ProductCard, { key: p.id, p, onView: (prod) => {
      setViewProduct(prod);
      setPage("product");
    }, onCart: addToCart }))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginTop: 18, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid #EBE4DD" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 10.5, letterSpacing: 2.5, color: "#888", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" } }, newLaunches.length, " fresh launches")))), /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "120px 0", background: "#FAF8F4", overflow: "hidden" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", marginBottom: 60 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 11, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: 16 } }, "Curated Selections"), /* @__PURE__ */ import_react.default.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: 46, color: "#251737", margin: 0, fontWeight: 500 } }, "Discover Your Next Favorite"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: "#555", maxWidth: 600, margin: "20px auto 0", lineHeight: 1.6 } }, "Explore our most captivating signature fragrances, beautifully crafted to evoke unforgettable emotions.")), /* @__PURE__ */ import_react.default.createElement("div", { className: "discovery-grid" }, [
      { name: "Island", type: "Premium Blend", img: "/assets/images/products/island-gold.jpg" },
      { name: "Shiyaaka Sky", type: "Special Edition", img: "/assets/images/products/shiyaaka_custom_5_cropped.png" },
      { name: "Fursan", type: "Royal Elegance", img: "/assets/images/products/fursan.png" },
      { name: "L'imaginaire", type: "Artisan Creation", img: "/assets/images/products/limaginaire.jpg" },
      { name: "Nuha Cherry Blush", type: "Eau De Parfum", img: "/assets/images/products/nuha-cherry.jpg" },
      { name: "Cream Velvet", type: "Signature Collection", img: "/assets/images/products/cream-velvet-bottle.png" },
      { name: "Mocha Latte", type: "Gourmand Essence", img: "/assets/images/products/mocha-latte.png" },
      { name: "Hareem Al Sultan", type: "Masterpiece", img: "/assets/images/products/hareem-al-sultan.png" }
    ].map((item, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: item.name, className: "discovery-card" }, /* @__PURE__ */ import_react.default.createElement("img", { src: item.img, alt: item.name, loading: "lazy" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "discovery-card-overlay" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "discovery-type" }, item.type), /* @__PURE__ */ import_react.default.createElement("h3", { className: "discovery-name" }, item.name), /* @__PURE__ */ import_react.default.createElement("span", { className: "discovery-btn" }, "Shop Now")))))), /* @__PURE__ */ import_react.default.createElement("section", { style: { display: "flex", flexWrap: "wrap", background: "#251737" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { flex: "1 1 50%", padding: "8vw 6%", minWidth: 300, display: "flex", flexDirection: "column", justifyContent: "center" } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { display: "block", color: "#C8A97E", letterSpacing: 4, fontSize: 12, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 } }, "The New Standard"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: 32, letterSpacing: "-0.5px" } }, "Discover Shiyaaka Sky"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.9, fontFamily: "'Montserrat',sans-serif", marginBottom: 48, maxWidth: 650, fontWeight: 300 } }, "Immerse yourself in the ultimate expression of freshness. Shiyaaka Sky brings together zesty citrus, the airy touch of a sky breeze, and the grounding warmth of cedarwood for a truly liberating olfactory experience."), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 56, maxWidth: 700 } }, [
      "Invigorating Fresh Citrus",
      "Breathable Sky Breeze",
      "Warm Cedarwood Base",
      "Everyday Elegance",
      "Long-Lasting Sillage"
    ].map((point, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: i, style: { display: "flex", alignItems: "flex-start", gap: 16 } }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { marginTop: 2, flexShrink: 0 } }, /* @__PURE__ */ import_react.default.createElement("polyline", { points: "20 6 9 17 4 12" })), /* @__PURE__ */ import_react.default.createElement("span", { style: { color: "#fff", fontFamily: "'Montserrat',sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.4 } }, point)))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          const skyProduct = PRODUCTS.find((p) => p.name === "SHIYAAKA SKY" || p.id === 9200000000003);
          if (skyProduct) {
            setViewProduct(skyProduct);
            setPage("product");
          }
        },
        style: { padding: "18px 48px", borderRadius: 0, fontSize: 13, letterSpacing: 2, background: "transparent", border: "1px solid #C8A97E", color: "#C8A97E", textTransform: "uppercase", transition: "all 0.3s ease", cursor: "pointer" },
        onMouseEnter: (e) => {
          e.target.style.background = "#C8A97E";
          e.target.style.color = "#fff";
        },
        onMouseLeave: (e) => {
          e.target.style.background = "transparent";
          e.target.style.color = "#C8A97E";
        }
      },
      "Shop Now"
    ))), /* @__PURE__ */ import_react.default.createElement("div", { style: { flex: "1 1 50%", minWidth: 300, position: "relative", minHeight: "600px" } }, /* @__PURE__ */ import_react.default.createElement("video", { src: "/assets/videos/shiyaaka-sky-v2.mp4", autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto", style: { position: "absolute", width: "100%", height: "100%", objectFit: "cover" } }))), /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "0 5% 104px", background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { paddingTop: 96, marginBottom: 52, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "left" } }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(32px,4vw,54px)", fontWeight: 300, color: "#251737", lineHeight: 1.15, letterSpacing: "-0.5px" } }, "Where every scent has a story")), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-ghost", style: { flexShrink: 0 }, onClick: () => setPage("collections") }, "View All")), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 48, borderBottom: "1px solid #E8E4DC" } }, CATEGORIES.map((c) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: c,
        onClick: () => setActiveCat(c),
        style: {
          background: "transparent",
          color: activeCat === c ? "#000" : "#777",
          border: "none",
          borderBottom: activeCat === c ? "1px solid #000" : "1px solid transparent",
          padding: "8px 14px 10px",
          fontSize: 10.5,
          letterSpacing: 2,
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontWeight: activeCat === c ? 800 : 700,
          transition: "all .2s",
          textTransform: "uppercase",
          fontFamily: "'Montserrat',sans-serif"
        }
      },
      c
    ))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24, alignItems: "stretch" }, className: "grid-4" }, filtered.map((p) => /* @__PURE__ */ import_react.default.createElement(ProductCard, { key: p.id, p, onView: (prod) => {
      setViewProduct(prod);
      setPage("product");
    }, onCart: addToCart })))), /* @__PURE__ */ import_react.default.createElement("section", { className: "gift-slider-section" }, /* @__PURE__ */ import_react.default.createElement(SectionHeader, { title: "CURATED GIFT COLLECTION" }), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: 60, position: "relative" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "gift-slider-track" }, [
      { name: "Cloud Candy", desc: "A soft peach-pink gift set", price: 169, img: "/assets/images/gifsets/cloudcandy_gift_transparent.png" },
      { name: "Island", desc: "The signature Island scent", price: 179, img: "/assets/images/gifsets/island_gift_transparent.png" },
      { name: "Cream Velvet", desc: "Buttery caramel and vanilla", price: 160, img: "/assets/images/gifsets/creamvelvet_gift_user.png" },
      { name: "Cloud Candy", desc: "A soft peach-pink gift set", price: 169, img: "/assets/images/gifsets/cloudcandy_gift_transparent.png" },
      { name: "Island", desc: "The signature Island scent", price: 179, img: "/assets/images/gifsets/island_gift_transparent.png" },
      { name: "Cream Velvet", desc: "Buttery caramel and vanilla", price: 160, img: "/assets/images/gifsets/creamvelvet_gift_user.png" }
    ].map((gift, idx) => /* @__PURE__ */ import_react.default.createElement("div", { className: "gift-slide-card", key: idx, onClick: () => setPage("gifts") }, /* @__PURE__ */ import_react.default.createElement("div", { className: "gift-slide-img" }, /* @__PURE__ */ import_react.default.createElement("img", { src: gift.img, alt: gift.name })), /* @__PURE__ */ import_react.default.createElement("div", { className: "gift-slide-content" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "gift-slide-eyebrow" }, "Handpicked"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "gift-slide-title" }, gift.name.replace(" Gift Set", "").split(" ").map((word, i) => /* @__PURE__ */ import_react.default.createElement("span", { key: i }, word, /* @__PURE__ */ import_react.default.createElement("br", null))), "Sets"), /* @__PURE__ */ import_react.default.createElement("button", { className: "gift-slide-btn" }, "Shop Now"))))))), /* @__PURE__ */ import_react.default.createElement("section", { style: { background: "#251737", padding: "96px 5%", color: "#fff", borderTop: "1px solid rgba(255,255,255,0.08)", position: "relative", zIndex: 1 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64, alignItems: "center" }, className: "hero-split" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(30px,3.8vw,52px)", fontWeight: 400, color: "#fff", lineHeight: 1.05, letterSpacing: -1, marginBottom: 24 } }, "KHADLAJ ", /* @__PURE__ */ import_react.default.createElement("em", { className: "luxury-gold-text", style: { fontStyle: "normal" } }, "SCENT FINDER")), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: 14, maxWidth: 440, fontFamily: "'Montserrat',sans-serif", marginBottom: 32 } }, "Fragrance is a deeply personal language. Answer a few questions and our custom olfactive profiler will match you with a signature scent from our master perfume lines.")), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "40px 32px", minHeight: 380, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" } }, quizStep === 1 && /* @__PURE__ */ import_react.default.createElement("div", { style: { animation: "fadeUp .4s ease both" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 10, letterSpacing: 2, color: "#B8922A", textTransform: "uppercase", fontWeight: 600, marginBottom: 8, fontFamily: "'Montserrat',sans-serif" } }, "Step 1 of 2"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "disp", style: { fontSize: 20, fontWeight: 400, color: "#fff", marginBottom: 24 } }, "Choose Your Olfactive Vibe"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [
      { v: "Rich & Exotic", desc: "Bold Oud, precious Amber, and warm spices." },
      { v: "Fresh & Energizing", desc: "Vibrant Citrus, crisp Marine, and delicate florals." },
      { v: "Clean & Sophisticated", desc: "Sensual Musk, creamy Sandalwood, and soft iris." }
    ].map((item) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: item.v,
        onClick: () => {
          setQuizMood(item.v);
          setQuizStep(2);
        },
        style: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "14px 20px", borderRadius: 8, textAlign: "left", cursor: "pointer", transition: "all 0.25s ease" },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "rgba(184,146,42,0.1)";
          e.currentTarget.style.borderColor = "#B8922A";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        }
      },
      /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", margin: 0 } }, item.v),
      /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontFamily: "'Montserrat',sans-serif" } }, item.desc)
    )))), quizStep === 2 && /* @__PURE__ */ import_react.default.createElement("div", { style: { animation: "fadeUp .4s ease both" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 10, letterSpacing: 2, color: "#B8922A", textTransform: "uppercase", fontWeight: 600, marginBottom: 8, fontFamily: "'Montserrat',sans-serif" } }, "Step 2 of 2"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "disp", style: { fontSize: 20, fontWeight: 400, color: "#fff", marginBottom: 24 } }, "When will you wear this?"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [
      { k: "Royal Evenings", label: "Royal Evenings", desc: "Special events, formal dinners, and night statements." },
      { k: "Daily Wear & Office", label: "Daily Wear & Office", desc: "Sophisticated signature scent for day-to-day use." },
      { k: "Romantic Date Nights", label: "Romantic Date Nights", desc: "Warm, intimate, and captivating close encounters." }
    ].map((item) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: item.k,
        onClick: () => {
          const finalProduct = quizProducts[quizMood][item.label];
          setQuizOccasion(item.label);
          setQuizResult(finalProduct);
          setQuizStep(3);
        },
        style: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", padding: "14px 20px", borderRadius: 8, textAlign: "left", cursor: "pointer", transition: "all 0.25s ease" },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "rgba(184,146,42,0.1)";
          e.currentTarget.style.borderColor = "#B8922A";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        }
      },
      /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, fontWeight: 600, fontFamily: "'Montserrat',sans-serif", margin: 0 } }, item.label),
      /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontFamily: "'Montserrat',sans-serif" } }, item.desc)
    ))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setQuizStep(1), style: { background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 20, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Montserrat',sans-serif", padding: 0 } }, "\u2190 Back")), quizStep === 3 && quizResult && /* @__PURE__ */ import_react.default.createElement("div", { style: { animation: "fadeUp .4s ease both", textAlign: "center" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 10, letterSpacing: 2, color: "#B8922A", textTransform: "uppercase", fontWeight: 600, marginBottom: 8, fontFamily: "'Montserrat',sans-serif" } }, "Your Scent Match"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "disp", style: { fontSize: 20, fontWeight: 400, color: "#fff", marginBottom: 20 } }, "The Perfect Fit"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: 20, borderRadius: 8, marginBottom: 24, textAlign: "left" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: 80, height: 80, background: "#fff", borderRadius: 6, padding: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, /* @__PURE__ */ import_react.default.createElement("img", { src: quizResult.img, alt: quizResult.name, style: { width: "100%", height: "100%", objectFit: "contain" } })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 8, color: "#B8922A", letterSpacing: 2, textTransform: "uppercase", margin: 0, fontWeight: 600, fontFamily: "'Montserrat',sans-serif" } }, quizResult.col), /* @__PURE__ */ import_react.default.createElement("h4", { style: { fontSize: 15, fontWeight: 600, color: "#fff", textTransform: "uppercase", margin: "4px 0 6px" } }, quizResult.name), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0, fontFamily: "'Montserrat',sans-serif" } }, quizResult.size))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 12 } }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          setViewProduct(quizResult);
          setPage("product");
        },
        style: { flex: 1, background: "#B8922A", border: "1px solid #B8922A", color: "#fff", padding: "14px", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontWeight: 600, borderRadius: 4, transition: "all .25s ease" },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "#000";
          e.currentTarget.style.borderColor = "#fff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "#B8922A";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "#B8922A";
        }
      },
      "Discover Perfume"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setQuizStep(1),
        style: { background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "14px 20px", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", borderRadius: 4, transition: "all .25s ease" },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = "#fff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }
      },
      "Reset"
    )))))), /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "80px 5% 40px", background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 48, textAlign: "center" } }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(24px,3vw,42px)", fontWeight: 400, color: "#251737", letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.2 } }, "SHOP BY REEL"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "#777", fontSize: 12, fontFamily: "'Montserrat',sans-serif", letterSpacing: 0.3 } }, "Browse fragrances through short, stylish reels and discover your next favorite scent.")), /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: "reel-track hide-scrollbar",
        style: {
          display: "flex",
          gap: 20,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "10px 5% 30px",
          margin: "0 -5%",
          scrollBehavior: "smooth"
        }
      },
      REELS.map((t, idx) => /* @__PURE__ */ import_react.default.createElement(TikTokCard, { key: idx, t }))
    ), /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", marginTop: 44 } }, /* @__PURE__ */ import_react.default.createElement(
      "a",
      {
        href: SOCIAL_LINKS.tiktok,
        target: "_blank",
        rel: "noreferrer",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          border: "1px solid #251737",
          color: "#251737",
          padding: "13px 32px",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: "uppercase",
          textDecoration: "none",
          fontFamily: "'Montserrat',sans-serif",
          transition: "all .2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#B8922A";
          e.currentTarget.style.borderColor = "#B8922A";
          e.currentTarget.style.color = "#fff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "#251737";
          e.currentTarget.style.color = "#251737";
        }
      },
      "\u25B6 Follow on TikTok"
    ))), /* @__PURE__ */ import_react.default.createElement("section", { style: { background: "#251737", padding: "64px 5%" } }, /* @__PURE__ */ import_react.default.createElement(SectionHeader, { eyebrow: "Reviews", title: "Loved Across the World", light: true }), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid-4", style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.15)" } }, REVIEWS.map((r, i) => /* @__PURE__ */ import_react.default.createElement("a", { href: r.url || "#", target: "_blank", rel: "noopener noreferrer", key: i, style: { textDecoration: "none", color: "inherit" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#251737", padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transition: "background 0.3s ease", height: "100%" }, onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)", onMouseLeave: (e) => e.currentTarget.style.background = "#251737" }, /* @__PURE__ */ import_react.default.createElement(StarRating, { n: r.stars, color: "#B8922A" }), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "16px 0", fontStyle: "italic", fontWeight: 300, fontFamily: "'Montserrat',sans-serif" } }, '"', r.text, '"'), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: "auto" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, fontWeight: 600, color: "#fff", letterSpacing: 2, fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase" } }, r.name), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 8, letterSpacing: 4, color: "#B8922A", marginTop: 6, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" } }, r.country))))))), /* @__PURE__ */ import_react.default.createElement("section", { style: { background: "#fff", borderBottom: "1px solid #E8E4DC", padding: "40px 5% 80px", position: "relative", zIndex: 1 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }, className: "grid-4" }, [
      {
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "#B8922A", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10", fill: "rgba(184,146,42,0.03)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 22V12" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 12c2-2.5 4-3 5-5-2 .5-4.5 2-5 5z", fill: "rgba(184,146,42,0.1)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 12c-2-2.5-4-3-5-5 2 .5 4.5 2 5 5z", fill: "rgba(184,146,42,0.1)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 15c1.5-1.5 3-1.8 3.8-3-.8.3-2.2 1-3.8 3z" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 15c-1.5-1.5-3-1.8-3.8-3 .8.3 2.2 1 3.8 3z" })),
        title: "Natural Ingredients",
        desc: "Taif roses, Cambodian oud, French iris \u2014 ethically sourced"
      },
      {
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "#B8922A", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10", fill: "rgba(184,146,42,0.03)" }), /* @__PURE__ */ import_react.default.createElement("polygon", { points: "12 6 13.5 9.5 17 9.5 14 11.5 15.5 15 12 13 8.5 15 10 11.5 7 9.5 10.5 9.5 12 6", fill: "rgba(184,146,42,0.15)" })),
        title: "Award-Winning",
        desc: "Recognised fragrance house since 1997 across 30+ countries"
      },
      {
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "#B8922A", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10", fill: "rgba(184,146,42,0.03)" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "6", y: "8", width: "8", height: "6", rx: "1", fill: "rgba(184,146,42,0.1)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M14 9h3l2 2v3h-5V9z" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "8.5", cy: "16.5", r: "1.5", fill: "#B8922A" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "15.5", cy: "16.5", r: "1.5", fill: "#B8922A" })),
        title: "Free UAE Delivery",
        desc: "Complimentary shipping on orders above AED 150"
      },
      {
        icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "#B8922A", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10", fill: "rgba(184,146,42,0.03)" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "6", y: "8", width: "12", height: "8", rx: "1", fill: "rgba(184,146,42,0.1)" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M6 11h12M12 8v8" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 8c-.8-1-2.2-1.5-2.2-.5s1.2 1 2.2.5c.8-1 2.2-1.5 2.2-.5s-1.2 1-2.2.5z" })),
        title: "Luxury Packaging",
        desc: "Every order arrives gift-ready in premium Khadlaj packaging"
      }
    ].map((item, i) => /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        key: item.title,
        style: {
          padding: "40px 28px",
          background: "#FCFBFA",
          border: "1px solid #F0ECE6",
          transition: "all .3s cubic-bezier(0.25, 0.8, 0.25, 1)"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "#B8922A";
          e.currentTarget.style.boxShadow = "0 16px 36px rgba(184,146,42,0.08)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "#F0ECE6";
          e.currentTarget.style.boxShadow = "none";
        }
      },
      /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 22, display: "flex", justifyContent: "center" } }, item.icon),
      /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, fontWeight: 600, color: "#251737", letterSpacing: 2, fontFamily: "'Montserrat',sans-serif", marginBottom: 12, textTransform: "uppercase" } }, item.title),
      /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, color: "#777", lineHeight: 1.7, fontFamily: "'Montserrat',sans-serif", maxWidth: 220, margin: "0 auto" } }, item.desc)
    )))));
  }
  function CollectionsPage({ addToCart, setViewProduct, setPage, collectionCategory }) {
    const { activeCountry } = import_react.default.useContext(CountryContext);
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    const [activeCat, setActiveCat] = (0, import_react.useState)(collectionCategory || "Khadlaj");
    import_react.default.useEffect(() => {
      if (collectionCategory) setActiveCat(collectionCategory);
    }, [collectionCategory]);
    const [sortBy, setSortBy] = (0, import_react.useState)("default");
    const [priceMax, setPriceMax] = (0, import_react.useState)(800);
    let filtered = PRODUCTS.filter((p) => {
      if (p.size === "Gift Set") return false;
      const isKhadlajProduct = p.col !== "Lafede";
      if (activeCat === "Khadlaj") return p.col !== "Lafede";
      if (activeCat === "Best Sellers") return isKhadlajProduct && p.badge === "Best Seller";
      if (activeCat === "New") return isKhadlajProduct && p.badge === "New";
      if (activeCat === "For Him") return isKhadlajProduct && p.gender === "Him";
      if (activeCat === "For Her") return isKhadlajProduct && p.gender === "Her";
      if (activeCat === "Unisex") return isKhadlajProduct && p.gender === "Unisex";
      if (activeCat === "Perfume Oils") return isKhadlajProduct && p.col === "Perfume Oils";
      if (activeCat === "EAU DE PARFUM") return isKhadlajProduct && p.col.toLowerCase() === "eau de parfum";
      if (activeCat === "Master Perfumery") return isKhadlajProduct && p.col === "Master Perfumery";
      return isKhadlajProduct && p.col === activeCat;
    }).filter((p) => p.price <= priceMax);
    if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", height: "clamp(300px,38vw,500px)", overflow: "hidden", background: "#251737" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 2, opacity: 0.5 } }, [
      "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/saraya_3.png?v=1781332291",
      "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/Ihthiraam-3.jpg?v=1775636549",
      "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/IntoxicateMystique.3.png?v=1772518819",
      "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/ONYX-03.jpg?v=1762324228",
      "https://cdn.shopify.com/s/files/1/0626/6119/8023/files/shiyaaka-snow.png?v=1781615422"
    ].map((src, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: i, style: { overflow: "hidden", height: "100%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react.default.createElement("img", { src, alt: "", style: { width: "86%", height: "86%", objectFit: "contain", objectPosition: "center" } })))), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.85) 0%,rgba(0,0,0,.65) 50%,rgba(0,0,0,.80) 100%)" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 5%",
      textAlign: "center"
    } }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: {
      fontSize: "clamp(42px,6vw,88px)",
      fontWeight: 400,
      color: "#fff",
      lineHeight: 0.95,
      letterSpacing: -2,
      marginBottom: 20
    } }, "FRAGRANCE COLLECTIONS"), /* @__PURE__ */ import_react.default.createElement("p", { style: {
      color: "rgba(255,255,255,.6)",
      fontSize: 14,
      fontFamily: "'Montserrat',sans-serif",
      letterSpacing: 0.5,
      marginBottom: 32
    } }, PRODUCTS.length, " unique creations \u2014 from everyday luxury to rare extrait"))), /* @__PURE__ */ import_react.default.createElement("div", { style: {
      background: "#fff",
      borderBottom: "1px solid #E8E4DC",
      padding: "20px 5%",
      display: "flex",
      gap: 12,
      alignItems: "center",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: "0 2px 12px rgba(0,0,0,.05)"
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", flexShrink: 0 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 8.5, color: "#888", letterSpacing: 0.8, fontFamily: "'Montserrat',sans-serif", whiteSpace: "nowrap" } }, "Max ", formatPrice(priceMax)), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "range",
        min: 50,
        max: 800,
        value: priceMax,
        onChange: (e) => setPriceMax(+e.target.value),
        style: { width: 90, accentColor: "#251737" }
      }
    )), /* @__PURE__ */ import_react.default.createElement(
      "select",
      {
        value: sortBy,
        onChange: (e) => setSortBy(e.target.value),
        style: {
          background: "#fff",
          color: "#251737",
          border: "1px solid #E0E0E0",
          padding: "7px 12px",
          fontSize: 9,
          cursor: "pointer",
          letterSpacing: 0.8,
          fontFamily: "'Montserrat',sans-serif",
          outline: "none"
        }
      },
      /* @__PURE__ */ import_react.default.createElement("option", { value: "default" }, "Featured"),
      /* @__PURE__ */ import_react.default.createElement("option", { value: "price-asc" }, "Price \u2191"),
      /* @__PURE__ */ import_react.default.createElement("option", { value: "price-desc" }, "Price \u2193")
    ))), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "32px 3% 80px" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "collections-layout", style: { display: "grid", gridTemplateColumns: "278px minmax(0,1fr)", gap: 34 } }, /* @__PURE__ */ import_react.default.createElement("aside", { className: "collections-sidebar", style: { width: 278 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "sticky", top: 100, border: "1px solid #E8E4DC", background: "linear-gradient(180deg,#fff 0%,#FFFCF7 100%)", padding: 18, boxShadow: "0 18px 42px rgba(0,0,0,.045)" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 3, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginBottom: 6 } }, "Shop By"), /* @__PURE__ */ import_react.default.createElement("p", { className: "disp", style: { fontSize: 22, lineHeight: 1, color: "#251737", fontWeight: 300 } }, "Collections")), /* @__PURE__ */ import_react.default.createElement("span", { style: { width: 34, height: 34, border: "1px solid #E5D6B5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8922A", fontSize: 15 } }, "+")), CATEGORIES.map((c) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: c,
        onClick: () => setActiveCat(c),
        style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textAlign: "left", background: activeCat === c ? "#251737" : "rgba(255,255,255,.72)", color: activeCat === c ? "#fff" : "#444", border: "1px solid", borderColor: activeCat === c ? "#251737" : "#EEE", padding: "12px 12px", marginBottom: 8, fontSize: 10, letterSpacing: 1.35, cursor: "pointer", fontWeight: activeCat === c ? 600 : 600, transition: "all .18s", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", boxShadow: activeCat === c ? "0 10px 24px rgba(60,17,82,.22)" : "none" }
      },
      /* @__PURE__ */ import_react.default.createElement("span", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: activeCat === c ? "#B8922A" : "#D7C59E", display: "inline-block", flexShrink: 0 } }), c),
      /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 9, letterSpacing: 0, color: activeCat === c ? "rgba(255,255,255,.65)" : "#B8922A" } }, PRODUCTS.filter((p) => {
        if (p.size === "Gift Set") return false;
        const isKhadlajProduct = p.col !== "Lafede";
        if (c === "Khadlaj") return isKhadlajProduct;
        if (c === "Best Sellers") return isKhadlajProduct && p.badge === "Best Seller";
        if (c === "New") return isKhadlajProduct && p.badge === "New";
        if (c === "For Him") return isKhadlajProduct && p.gender === "Him";
        if (c === "For Her") return isKhadlajProduct && p.gender === "Her";
        if (c === "Unisex") return isKhadlajProduct && p.gender === "Unisex";
        if (c === "Perfume Oils") return isKhadlajProduct && p.col === "Perfume Oils";
        if (c === "EAU DE PARFUM") return isKhadlajProduct && p.col.toLowerCase() === "eau de parfum";
        if (c === "Master Perfumery") return isKhadlajProduct && p.col === "Master Perfumery";
        return isKhadlajProduct && p.col === c;
      }).length)
    )), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setPage("lafede"),
        style: { width: "100%", textAlign: "left", background: "linear-gradient(135deg,#F8F1DE 0%,#fff 100%)", color: "#8A681F", border: "1px solid #E6D8B6", padding: "14px 12px", marginTop: 12, fontSize: 10, letterSpacing: 1.4, cursor: "pointer", fontWeight: 600, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.55)" }
      },
      "La Fede Landing ",
      /* @__PURE__ */ import_react.default.createElement("span", { style: { float: "right", fontSize: 12 } }, "->")
    ))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 8.5, color: "#999", marginBottom: 32, letterSpacing: 1.6, fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase" } }, filtered.length, " fragrances found"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24, alignItems: "stretch" }, className: "grid-4" }, filtered.map((p) => /* @__PURE__ */ import_react.default.createElement(ProductCard, { key: p.id, p, onView: (prod) => {
      setViewProduct(prod);
      setPage("product");
    }, onCart: addToCart }))), filtered.length === 0 && /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", padding: "96px 0" } }, /* @__PURE__ */ import_react.default.createElement("p", { className: "disp", style: { fontSize: 36, fontWeight: 300, color: "#251737", marginBottom: 12 } }, "No fragrances found"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 13, color: "#888", fontFamily: "'Montserrat',sans-serif" } }, "Try adjusting the filters above."))))), /* @__PURE__ */ import_react.default.createElement(TrustBanner, null));
  }
  function LaFedePage({ addToCart, setViewProduct, setPage }) {
    const laFedeProducts = PRODUCTS.filter((p) => p.col === "Lafede");
    const [laFedeFilter, setLaFedeFilter] = (0, import_react.useState)("featured");
    const visibleLaFedeProducts = applyProductFilter(laFedeProducts, laFedeFilter);
    const filterOptions = [
      { value: "featured", label: "Featured" },
      { value: "new", label: "New" },
      { value: "top", label: "Top Selling" },
      { value: "value", label: "Value Picks" }
    ];
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("section", { style: { position: "relative", minHeight: "clamp(280px,32vw,420px)", display: "grid", gridTemplateColumns: "1fr .9fr", alignItems: "center", gap: 24, padding: "44px 6%", background: "#080808", overflow: "hidden" }, className: "hero-split" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 74% 45%, rgba(184,146,42,.18), transparent 34%), linear-gradient(135deg,#060606 0%,#101010 54%,#050505 100%)" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", top: "-25%", bottom: "-25%", left: "44%", width: 120, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent)", animation: "lafedeSweep 5.8s ease-in-out infinite", pointerEvents: "none" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", zIndex: 2 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 12 } }, "Dedicated Collection"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: { fontSize: "clamp(40px,5.5vw,74px)", fontWeight: 300, color: "#fff", lineHeight: 0.95, marginBottom: 16 } }, "La Fede"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "rgba(255,255,255,.68)", fontSize: 13, maxWidth: 480, lineHeight: 1.8, fontFamily: "'Montserrat',sans-serif", marginBottom: 24 } }, "A separate space for expressive La Fede fragrances, kept apart from the main Khadlaj collection for clearer browsing."), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-gold", onClick: () => setPage("collections") }, "Back to Khadlaj")), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", zIndex: 2, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", width: "70%", height: "72%", borderRadius: "50%", background: "radial-gradient(circle,rgba(184,146,42,.22),rgba(184,146,42,0) 68%)", animation: "lafedeGlow 4.5s ease-in-out infinite" } }), /* @__PURE__ */ import_react.default.createElement("img", { src: "/assets/images/products/intoxicate-mystique-cutout.png", alt: "La Fede Intoxicate Mystique", style: { height: "min(330px,28vw)", maxHeight: 330, width: "auto", objectFit: "contain", filter: "drop-shadow(0 24px 52px rgba(0,0,0,.45))", animation: "lafedeFloat 4.6s ease-in-out infinite" } }), /* @__PURE__ */ import_react.default.createElement("img", { src: "/assets/images/products/uno-intimo-cutout.png", alt: "La Fede Uno Intimo", style: { position: "absolute", right: "8%", bottom: "4%", height: "min(220px,19vw)", maxHeight: 220, width: "auto", objectFit: "contain", filter: "drop-shadow(0 22px 40px rgba(0,0,0,.35))", animation: "lafedeFloatSmall 5.2s ease-in-out infinite" } }))), /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "76px 5% 96px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 40 } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 12 } }, "La Fede"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(34px,4.5vw,64px)", fontWeight: 300, color: "#251737", lineHeight: 1.05, letterSpacing: -1, marginBottom: 12 } }, "La Fede Eau De Parfum"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 13, color: "#777", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.8, maxWidth: 560 } }, "Bold, characterful fragrances presented in their own collection.")), /* @__PURE__ */ import_react.default.createElement(ProductFilterBar, { active: laFedeFilter, setActive: setLaFedeFilter, options: filterOptions })), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24, alignItems: "stretch", marginTop: 40 }, className: "grid-4" }, visibleLaFedeProducts.map((p) => /* @__PURE__ */ import_react.default.createElement(ProductCard, { key: p.id, p, onView: (prod) => {
      setViewProduct(prod);
      setPage("product");
    }, onCart: addToCart })))));
  }
  function Accordion({ title, children, defaultOpen = false }) {
    const [open, setOpen] = (0, import_react.useState)(defaultOpen);
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { borderBottom: "1px solid #E8E4DC" } }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setOpen(!open),
        style: {
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 12,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 600,
          color: "#251737"
        }
      },
      /* @__PURE__ */ import_react.default.createElement("span", null, title),
      /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 18, fontWeight: 300 } }, open ? "\u2212" : "+")
    ), open && /* @__PURE__ */ import_react.default.createElement("div", { style: { paddingBottom: 24, fontSize: 14, color: "#555", lineHeight: 1.8, fontFamily: "'Montserrat',sans-serif" } }, children));
  }
  function ProductFilterBar({ active, setActive, options }) {
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" } }, options.map((opt) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: opt.value,
        onClick: () => setActive(opt.value),
        style: {
          background: active === opt.value ? "#111" : "#fff",
          color: active === opt.value ? "#fff" : "#111",
          border: "1px solid",
          borderColor: active === opt.value ? "#111" : "#E1D7C7",
          padding: "11px 16px",
          fontSize: 9,
          letterSpacing: 1.8,
          textTransform: "uppercase",
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all .2s ease",
          whiteSpace: "nowrap"
        }
      },
      opt.label
    )));
  }
  function applyProductFilter(products, filter) {
    if (filter === "new") {
      const fresh = products.filter((p) => p.badge === "New");
      return fresh.length ? fresh : products.slice(0, 4);
    }
    if (filter === "top") return [...products].sort((a, b) => {
      const badgeScore = (p) => p.badge === "Best Seller" ? 1e3 : 0;
      return badgeScore(b) + b.price - (badgeScore(a) + a.price);
    }).slice(0, 4);
    if (filter === "value") return [...products].sort((a, b) => a.price - b.price).slice(0, 4);
    if (filter === "featured") return products.slice(0, 4);
    return products;
  }
  function ProductPage({ product, addToCart, setPage, setViewProduct }) {
    const { activeCountry } = import_react.default.useContext(CountryContext);
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    const [qty, setQty] = (0, import_react.useState)(1);
    const [added, setAdded] = (0, import_react.useState)(false);
    const related = PRODUCTS.filter((p) => p.col === product.col && p.id !== product.id).slice(0, 3);
    (0, import_react.useEffect)(() => {
      window.scrollTo(0, 0);
    }, [product.id]);
    const handleAdd = () => {
      addToCart(product, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff", minHeight: "100vh" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "32px 5% 0", maxWidth: 1440, margin: "0 auto", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#888", fontFamily: "'Montserrat',sans-serif" } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { cursor: "pointer", color: "#251737" }, onClick: () => setPage("home") }, "Home"), /* @__PURE__ */ import_react.default.createElement("span", { style: { margin: "0 12px" } }, "|"), /* @__PURE__ */ import_react.default.createElement("span", { style: { cursor: "pointer", color: "#251737" }, onClick: () => setPage("collections") }, "Collections"), /* @__PURE__ */ import_react.default.createElement("span", { style: { margin: "0 12px" } }, "|"), /* @__PURE__ */ import_react.default.createElement("span", null, product.name)), /* @__PURE__ */ import_react.default.createElement("div", { style: { maxWidth: 1440, margin: "0 auto", padding: "40px 5% 120px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 8vw, 100px)" }, className: "grid-2" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "100%" } }, product.detailImages ? /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, product.detailImages.map((imgUrl, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: i, style: { width: "100%", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: "4px", overflow: "hidden" } }, /* @__PURE__ */ import_react.default.createElement("img", { src: imgUrl, alt: product.name, style: { width: "92%", height: "92%", objectFit: "contain", mixBlendMode: "normal", filter: "contrast(1.02) brightness(0.98)" } })))) : /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        style: { width: "100%", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: "4px", overflow: "hidden" },
        onMouseEnter: (e) => {
          const img = e.currentTarget.querySelector("img");
          const sc = product.name === "SHIYAAKA SNOW" ? 1.45 : product.name === "PANACHE ANGEL DUST" ? 1.15 : 1;
          if (img) img.style.transform = `scale(${sc * 1.05})`;
        },
        onMouseLeave: (e) => {
          const img = e.currentTarget.querySelector("img");
          const sc = product.name === "SHIYAAKA SNOW" ? 1.45 : product.name === "PANACHE ANGEL DUST" ? 1.15 : 1;
          if (img) img.style.transform = `scale(${sc})`;
        }
      },
      /* @__PURE__ */ import_react.default.createElement(
        "img",
        {
          src: product.img,
          alt: product.name,
          style: {
            width: "92%",
            height: "92%",
            objectFit: "contain",
            mixBlendMode: "normal",
            filter: "contrast(1.02) brightness(0.98)",
            transition: "transform .45s ease",
            transform: `scale(${product.name === "SHIYAAKA SNOW" ? 1.45 : product.name === "PANACHE ANGEL DUST" ? 1.15 : 1})`
          }
        }
      )
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { paddingTop: 8, maxWidth: 540, position: "sticky", top: 120, alignSelf: "start" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 10, letterSpacing: 3, color: "#251737", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 16 } }, "Khadlaj Perfumes"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: { fontSize: "clamp(36px, 4.5vw, 52px)", fontWeight: 300, color: "#251737", lineHeight: 1.05, letterSpacing: "-0.5px", textTransform: "uppercase", marginBottom: 16 } }, product.name), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 24 } }, /* @__PURE__ */ import_react.default.createElement(StarRating, { n: 5, color: "#111" }), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 13, color: "#555", fontFamily: "'Montserrat',sans-serif", borderBottom: "1px solid #ccc", cursor: "pointer", paddingBottom: 2 } }, "4.9 rating (55 reviews)")), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 24, fontWeight: 400, color: "#251737", fontFamily: "'Montserrat',sans-serif", marginBottom: 8 } }, formatPrice(product.price)), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, color: "#777", fontFamily: "'Montserrat',sans-serif", marginBottom: 40 } }, "Tax included. Shipping calculated at checkout."), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 40 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#251737", fontFamily: "'Montserrat',sans-serif", marginBottom: 12, fontWeight: 600 } }, "Size"), /* @__PURE__ */ import_react.default.createElement("button", { style: { border: "1px solid #251737", background: "#fff", color: "#251737", padding: "12px 28px", fontSize: 12, letterSpacing: 1.5, fontFamily: "'Montserrat',sans-serif", cursor: "default" } }, product.size)), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", border: "1px solid #E8E4DC", width: 130, height: 56 } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), style: { flex: 1, height: "100%", border: "none", background: "transparent", fontSize: 20, cursor: "pointer", color: "#555" } }, "\u2212"), /* @__PURE__ */ import_react.default.createElement("span", { style: { flex: 1, textAlign: "center", fontSize: 15, fontFamily: "'Montserrat',sans-serif" } }, qty), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setQty((q) => q + 1), style: { flex: 1, height: "100%", border: "none", background: "transparent", fontSize: 20, cursor: "pointer", color: "#555" } }, "+")), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: handleAdd,
        style: {
          flex: 1,
          minWidth: 200,
          height: 56,
          background: "#251737",
          color: "#fff",
          border: "none",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontFamily: "'Montserrat',sans-serif",
          cursor: "pointer",
          transition: "background .2s"
        },
        onMouseEnter: (e) => e.currentTarget.style.background = "#333",
        onMouseLeave: (e) => e.currentTarget.style.background = "#111"
      },
      added ? "Added to Bag" : "Add to Bag"
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 24, marginBottom: 48, paddingTop: 24, borderTop: "1px solid #E8E4DC" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 10, color: "#555", fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase", letterSpacing: 1.5 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 14 } }, "\u2713"), " Authentic"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 10, color: "#555", fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase", letterSpacing: 1.5 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 14 } }, "\u2713"), " Secure Check"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 10, color: "#555", fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase", letterSpacing: 1.5 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 14 } }, "\u2713"), " Fast Ship")), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(Accordion, { title: "Description", defaultOpen: true }, /* @__PURE__ */ import_react.default.createElement("p", { style: { marginBottom: 12 } }, "Experience the timeless elegance of ", product.name, ". Crafted with precision and the finest ingredients, this fragrance is a true testament to the art of Arabian perfumery."), product.desc && /* @__PURE__ */ import_react.default.createElement("p", null, product.desc)), /* @__PURE__ */ import_react.default.createElement(Accordion, { title: "Fragrance Notes" }, product.notes && product.notes.length > 0 ? /* @__PURE__ */ import_react.default.createElement("ul", { style: { paddingLeft: 16, margin: 0, display: "flex", flexDirection: "column", gap: 8 } }, product.notes.map((n) => /* @__PURE__ */ import_react.default.createElement("li", { key: n }, n))) : /* @__PURE__ */ import_react.default.createElement("p", null, "A harmonious blend of signature Khadlaj notes crafted for a lasting impression.")), /* @__PURE__ */ import_react.default.createElement(Accordion, { title: "Shipping & Returns" }, /* @__PURE__ */ import_react.default.createElement("p", null, "Orders are processed within 1-2 business days. Free shipping on all orders over AED 200 within the UAE. International shipping rates apply and will be calculated at checkout.")))))), related.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "0 5% 104px" } }, /* @__PURE__ */ import_react.default.createElement(SectionHeader, { eyebrow: "\u25C8 \xB7 Handpicked For You", title: "You May Also Like", light: true }), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }, className: "grid-3" }, related.map((p) => /* @__PURE__ */ import_react.default.createElement(ProductCard, { key: p.id, p, onView: (prod) => {
      if (setViewProduct) {
        setViewProduct(prod);
        setPage("product");
      }
    }, onCart: addToCart })))));
  }
  function GiftsPage({ addToCart, setViewProduct, setPage }) {
    const giftProducts = PRODUCTS.filter((p) => p.size === "Gift Set");
    const [giftFilter, setGiftFilter] = (0, import_react.useState)("featured");
    const visibleGiftProducts = applyProductFilter(giftProducts, giftFilter);
    const giftFilterOptions = [
      { value: "featured", label: "Featured" },
      { value: "new", label: "New" },
      { value: "top", label: "Top Selling" },
      { value: "value", label: "Value Sets" }
    ];
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "100%", background: "#251737" } }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "/assets/images/banners/my-paradise-banner.png",
        alt: "Gift Sets",
        style: { width: "100%", height: "auto", display: "block" }
      }
    )), /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "80px 5%", background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-container" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 52 } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 12 } }, "Curated Collections"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(28px,3.5vw,50px)", fontWeight: 300, color: "#251737", letterSpacing: -1, lineHeight: 1.05 } }, "Gift Sets & ", /* @__PURE__ */ import_react.default.createElement("em", { style: { fontStyle: "italic", color: "#B8922A" } }, "Bundles"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, color: "#888", fontFamily: "'Montserrat',sans-serif" } }, visibleGiftProducts.length, " of ", giftProducts.length, " gift sets"), /* @__PURE__ */ import_react.default.createElement(ProductFilterBar, { active: giftFilter, setActive: setGiftFilter, options: giftFilterOptions }))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24, alignItems: "stretch" }, className: "grid-4" }, visibleGiftProducts.map((p) => /* @__PURE__ */ import_react.default.createElement(ProductCard, { key: p.id, p, onView: (prod) => {
      if (setViewProduct) {
        setViewProduct(prod);
        setPage("product");
      }
    }, onCart: addToCart }))))));
  }
  function StoryPage() {
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", height: "clamp(280px, 40vw, 400px)", background: "#251737", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 5%" } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: { fontSize: "clamp(40px,7vw,80px)", fontWeight: 400, color: "#C8A97E", lineHeight: 1.1, letterSpacing: 4, marginBottom: 16, textTransform: "uppercase" } }, "Our Legacy"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 500, fontSize: 10, letterSpacing: 8, color: "#fff", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", opacity: 0.8 } }, "Luxury & Elegance in every fragrance creation"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#FAFAFA", padding: "clamp(60px, 10vw, 120px) 5%" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-container hero-split", style: { display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(40px, 8vw, 100px)", alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px" } }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, color: "#111", lineHeight: 1.1 } }, "Khadlaj Perfumes"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "15px", color: "#555", lineHeight: 2.2, fontFamily: "'Montserrat',sans-serif", textAlign: "justify" } }, "Khadlaj Perfumes, established in January 1997, is a UAE-based perfume house specializing in bespoke Arabic and French fragrances, including renowned home ambiance fragrances. We are dedicated to embodying luxury and elegance in every fragrance creation."), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "15px", color: "#555", lineHeight: 2.2, fontFamily: "'Montserrat',sans-serif", textAlign: "justify" } }, "Our specialties include Dehn Al Oud, rose, and musk, and we also offer high-quality niche fragrances. With a legacy spanning 29 years of creating high-quality fragrances, our brand has a global presence in over 80 countries and 15 showrooms\u20147 in the UAE and 8 in Oman. Additionally, Khadlaj Perfumes holds trademarks across most continents.")), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", borderRadius: "4px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.12)", aspectRatio: "4/5", width: "100%", maxWidth: "540px", margin: "0 auto" } }, /* @__PURE__ */ import_react.default.createElement(
      "video",
      {
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        style: { width: "100%", height: "100%", objectFit: "cover" }
      },
      /* @__PURE__ */ import_react.default.createElement("source", { src: "https://cdn.shopify.com/videos/c/o/v/eedca68692644b0991d51fb3427d1bf4.mp4", type: "video/mp4" })
    )))), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#23152d", position: "relative", padding: "60px 5% 0px", display: "flex", flexDirection: "column", alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", top: "-24px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "flex-start", gap: "4px" } }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "32", height: "32", viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z", fill: "#D3B787" })), /* @__PURE__ */ import_react.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { marginTop: "18px" } }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M20 0C20 11 29 20 40 20C29 20 20 29 20 40C20 29 11 20 0 20C11 20 20 11 20 0Z", fill: "#D3B787" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "max-container hero-split", style: { display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "clamp(40px, 6vw, 80px)", alignItems: "center", width: "100%" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", transform: "translateY(30px)", zIndex: 10 } }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "/assets/images/people/founder-mohamed-iqbal.png",
        alt: "Mohamed Iqbal Abdul Sattar",
        style: { width: "100%", height: "auto", display: "block", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "60px", paddingTop: "20px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { borderLeft: "2px solid #fff", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "13px", color: "#fff", fontFamily: "'Montserrat',sans-serif", margin: 0 } }, "Founder and Master Perfumer"), /* @__PURE__ */ import_react.default.createElement("h2", { style: { fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 400, color: "#fff", fontFamily: "'Montserrat',sans-serif", margin: 0, letterSpacing: "0.5px" } }, "Mohamed Iqbal Abdul Sattar")), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "rgba(255,255,255,0.85)", lineHeight: 1.9, fontSize: 14, fontFamily: "'Montserrat',sans-serif", textAlign: "left" } }, "Mohamed Iqbal Abdul Sattar, with over 45 years of experience in perfumery, is the esteemed founder and master perfumer of Khadlaj Perfumes. He is recognized for his creation of some of our most cherished and opulent fragrances, including the iconic Hareem Al Sultan, Bukhoor Al Bahaar, and the luxurious Oud Pure and Musk Pure ranges. Mohamed\u2019s unparalleled expertise encompasses both exquisite natural essences and meticulously crafted synthetic compounds, with an ardent passion for ingredients such as Musk, Ruh Gulaab, oud, and vetiver. His profound knowledge and unwavering commitment to uncompromising excellence epitomize Khadlaj Perfumes' dedication to crafting extraordinary and enduring fragrances.")))), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "80px 5%" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center", marginBottom: 88 }, className: "hero-split" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { paddingRight: "24px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { borderLeft: "2px solid #251737", paddingLeft: "16px", marginBottom: "24px" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "#251737", fontFamily: "'Montserrat', sans-serif", letterSpacing: 0.5, marginBottom: 8 } }, "Managing Director"), /* @__PURE__ */ import_react.default.createElement("h2", { style: { fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 300, color: "#111", lineHeight: 1.2, margin: 0, fontFamily: "'Montserrat', sans-serif" } }, "Asif Mohamed Iqbal Katchi")), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "#444", lineHeight: 1.8, fontSize: 15, fontFamily: "'Montserrat', sans-serif", textAlign: "justify" } }, "Asif Mohamed Iqbal Katchi, with over 18 years of profound experience, is dedicated to taking forward the illustrious legacy of his father, Mohamed Iqbal, by consistently delivering excellence in all endeavors. Mr. Asif's visionary and creatively-driven leadership aims for Khadlaj to transcend into a luxurious, trusted name synonymous with unparalleled reliability and a celebrated household name in the fragrance industry. Mr. Asif's passionate motto embodies a profound dedication to perfumery craftsmanship and an unwavering commitment to fostering creativity, innovation, and luxury. He has effectively navigated Khadlaj Perfumes through dynamic industry shifts, showcasing his agile and proactive approach in anticipating and mitigating challenges, thereby fortifying the company's formidable position as a leader in the competitive fragrance market.")), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", aspectRatio: "4/3", overflow: "hidden" } }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "/assets/images/people/managing-director-asif.png",
        alt: "Asif Mohamed Iqbal Katchi",
        style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }
      }
    ))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 88 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", maxWidth: 800, marginBottom: 48 } }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 300, color: "#251737", lineHeight: 1.2, margin: 0, fontFamily: "'Montserrat', sans-serif" } }, "Head Office & Manufacturing Unit"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "#555", lineHeight: 1.8, fontSize: 15, fontFamily: "'Montserrat', sans-serif" } }, "At Khadlaj Perfumes, our operations are supported by state-of-the-art facilities and a strategic head office location:")), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, width: "100%" }, className: "hero-split" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#FAFAFA", borderRadius: "8px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", transition: "transform 0.3s ease", cursor: "default" }, onMouseEnter: (e) => e.currentTarget.style.transform = "translateY(-10px)", onMouseLeave: (e) => e.currentTarget.style.transform = "translateY(0)" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { height: 280, overflow: "hidden" } }, /* @__PURE__ */ import_react.default.createElement("img", { src: "https://images.unsplash.com/photo-1580982327559-c1202864eb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Manufacturing Unit", style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "32px 32px", flex: 1, display: "flex", flexDirection: "column", background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("h3", { style: { fontSize: 22, fontWeight: 600, color: "#111", fontFamily: "'Montserrat', sans-serif", marginBottom: 16 } }, "Manufacturing Unit"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "#666", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", margin: 0, textAlign: "justify" } }, "Located in Ras Al Khaimah, our manufacturing facility is certified under ISO 9001: 2015 standards. Here, stringent quality control measures ensure that every product meets our exacting standards. Our production processes prioritize the use of authentic components to create high-quality fragrances, free from microbial or hazardous contaminants."))), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#FAFAFA", borderRadius: "8px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", transition: "transform 0.3s ease", cursor: "default" }, onMouseEnter: (e) => e.currentTarget.style.transform = "translateY(-10px)", onMouseLeave: (e) => e.currentTarget.style.transform = "translateY(0)" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { height: 280, overflow: "hidden" } }, /* @__PURE__ */ import_react.default.createElement("img", { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Head Office", style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "32px 32px", flex: 1, display: "flex", flexDirection: "column", background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("h3", { style: { fontSize: 22, fontWeight: 600, color: "#111", fontFamily: "'Montserrat', sans-serif", marginBottom: 16 } }, "Head Office"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "#666", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", margin: 0, textAlign: "justify" } }, "Situated in Sharjah, our head office serves as the central hub for our global operations. From here, we oversee product development, marketing strategies, and customer relations. Our team is committed to innovation and excellence, ensuring that every aspect of our business reflects the values of Khadlaj Perfumes."))))), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#251737", margin: "0 -5.5% 88px", padding: "80px 5.5%", color: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-container", style: { display: "flex", flexDirection: "column", gap: 80 } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "hero-split", style: { display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 48 } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 300, color: "#fff", lineHeight: 1.2, margin: 0, fontFamily: "'Montserrat', sans-serif" } }, "Values & Ethos"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: 14, fontFamily: "'Montserrat', sans-serif" } }, "At Khadlaj Perfumes, we are guided by fundamental values that define our commitment to excellence:")), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 } }, [
      { title: "Experience", text: "We continuously strive to understand customer needs and exceed expectations.", icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "1.5" }, /* @__PURE__ */ import_react.default.createElement("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })) },
      { title: "Integrity", text: "We adhere to our morals and maintain transparency in all our dealings.", icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "1.5" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })) },
      { title: "Heritage", text: "We honor our origins and uphold the legacy of our home.", icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "1.5" }, /* @__PURE__ */ import_react.default.createElement("rect", { x: "4", y: "10", width: "16", height: "12", rx: "2" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 2v8" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M8 5l4-3 4 3" })) },
      { title: "Trust", text: "We are dedicated to fostering faith and confidence in our customers.", icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "1.5" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })) },
      { title: "Loyalty", text: "We prioritize building lasting, loyal relationships with our customers.", icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "1.5" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })) },
      { title: "Quality", text: "We set high standards and strive for excellence in every fragrance we create.", icon: /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "1.5" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "8", r: "7" }), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88" })) }
    ].map((item) => /* @__PURE__ */ import_react.default.createElement("div", { key: item.title, style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 24, transition: "all 0.3s ease" }, onMouseEnter: (e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      e.currentTarget.style.borderColor = "rgba(200,169,126,0.3)";
    }, onMouseLeave: (e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 16 } }, item.icon), /* @__PURE__ */ import_react.default.createElement("h4", { style: { fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'Montserrat', sans-serif", marginBottom: 8 } }, item.title), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontFamily: "'Montserrat', sans-serif", margin: 0 } }, item.text))))), /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "100%", height: 1, background: "rgba(255,255,255,0.06)" } }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 32 } }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(32px, 4vw, 42px)", fontWeight: 300, color: "#fff", lineHeight: 1.2, margin: 0, fontFamily: "'Montserrat', sans-serif" } }, "Our Motto"), /* @__PURE__ */ import_react.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#C8A97E", strokeWidth: "1.5" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)", padding: "40px 32px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "#C8A97E" } }), /* @__PURE__ */ import_react.default.createElement("h3", { style: { fontSize: 24, fontWeight: 400, color: "#fff", fontFamily: "'Montserrat', sans-serif", marginBottom: 16 } }, "Our vision"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", margin: 0 } }, "Our vision is to be a trusted name in the perfume industry and make our presence known in every household worldwide.")), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.2) 100%)", padding: "40px 32px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "#C8A97E" } }), /* @__PURE__ */ import_react.default.createElement("h3", { style: { fontSize: 24, fontWeight: 400, color: "#fff", fontFamily: "'Montserrat', sans-serif", marginBottom: 16 } }, "Our mission"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", margin: 0 } }, "Our mission is to spread our wings across the globe gradually by opening up outlets across the GCC and worldwide."))))))));
  }
  function ContactPage() {
    const [form, setForm] = (0, import_react.useState)({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = (0, import_react.useState)(false);
    const handle = () => {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", height: "clamp(280px,36vw,440px)", overflow: "hidden", background: "#1A1025" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(circle at 76% 46%, rgba(184,146,42,.18), rgba(184,146,42,0) 30%), linear-gradient(135deg,#130b1b 0%,#251737 58%,#0e0814 100%)" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", right: "7%", top: "7%", bottom: "7%", width: "42%", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" } }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "/assets/images/products/zayaan-silver_transparent.png",
        alt: "Zayaan Silver perfume bottle",
        style: { width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center", opacity: 0.78, filter: "drop-shadow(0 34px 60px rgba(0,0,0,.55))" }
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(37,23,55,.88) 0%,rgba(37,23,55,.64) 42%,rgba(37,23,55,.22) 100%)" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: {
      position: "absolute",
      inset: 0,
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0 6% 52px"
    } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 6, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 14 } }, "Get in Touch"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: {
      fontSize: "clamp(32px, 8vw, 84px)",
      fontWeight: 300,
      color: "#fff",
      lineHeight: 0.92,
      letterSpacing: -2,
      marginBottom: 16
    } }, "Contact Us"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "rgba(255,255,255,.55)", fontSize: 13, maxWidth: 420, lineHeight: 1.8, fontFamily: "'Montserrat',sans-serif" } }, "Our team is ready to assist \u2014 whether you're a customer, retailer, or gifting partner."))), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "clamp(40px, 6vw, 80px) 5% clamp(48px, 8vw, 96px)", display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 40, alignItems: "stretch" }, className: "hero-split" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 14 } }, "Reach Us"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(24px, 6vw, 44px)", fontWeight: 300, marginBottom: 24, lineHeight: 1.1, color: "#251737", letterSpacing: -1 } }, "We'd Love to Hear From You"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "#777", lineHeight: 1.85, fontSize: 14, marginBottom: 36, fontFamily: "'Montserrat',sans-serif" } }, "Whether you're a fragrance enthusiast, a retail partner, or a gifting client \u2014 our team is here to help."), [
      ["\u{1F4CD}", "Address", "Dubai, United Arab Emirates"],
      ["\u{1F4DE}", "Phone", "+971 4 000 0000"],
      ["\u2709\uFE0F", "Email", "hello@khadlaj-perfumes.com"],
      ["\u23F0", "Hours", "Mon\u2013Sat: 9am\u20136pm GST"]
    ].map(([icon, label, val]) => /* @__PURE__ */ import_react.default.createElement("div", { key: label, style: { display: "flex", gap: 16, marginBottom: 14, padding: "14px 0", borderBottom: "1px solid #F0EBE3" } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { width: 38, height: 38, borderRadius: "50%", border: "1px solid #E2D2AD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, marginTop: 0, background: "#fff" } }, icon), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 3, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 4 } }, label), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "#333", fontFamily: "'Montserrat',sans-serif" } }, val)))), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: 32 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 3, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 16 } }, "Follow Us"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [
      ["Instagram", SOCIAL_LINKS.instagram],
      ["TikTok", SOCIAL_LINKS.tiktok],
      ["Facebook", SOCIAL_LINKS.facebook],
      ["YouTube", SOCIAL_LINKS.youtube]
    ].map(([s, href]) => /* @__PURE__ */ import_react.default.createElement(
      "a",
      {
        key: s,
        href,
        target: "_blank",
        rel: "noreferrer",
        style: {
          border: "1px solid #000",
          color: "#251737",
          padding: "9px 16px",
          fontSize: 9,
          letterSpacing: 2,
          cursor: "pointer",
          textDecoration: "none",
          fontFamily: "'Montserrat',sans-serif",
          textTransform: "uppercase",
          transition: "all .2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#251737";
          e.currentTarget.style.color = "#fff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#251737";
        }
      },
      s
    ))))), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#251737 0%,#1A0F2E 100%)", padding: "clamp(24px, 5vw, 44px) clamp(20px, 5vw, 40px)", boxShadow: "0 26px 70px rgba(0,0,0,.18)" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", top: -120, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(184,146,42,.26),rgba(184,146,42,0) 68%)", pointerEvents: "none" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg,#B8922A,#F0D080,#B8922A)" } }), sent ? /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", zIndex: 1, textAlign: "center", padding: "60px 0" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: 48, height: 48, borderRadius: "50%", background: "#B8922A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 22, color: "#fff" } }, "\u2713"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "disp", style: { fontSize: 32, color: "#fff", margin: "0 0 12px", fontWeight: 300 } }, "Message Sent"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "rgba(255,255,255,.5)", fontSize: 13, fontFamily: "'Montserrat',sans-serif" } }, "We'll get back to you within 24 hours."), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-ghost", onClick: () => setSent(false), style: { marginTop: 32, color: "#fff", borderColor: "rgba(255,255,255,.3)" } }, "Send Another")) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "disp", style: { fontSize: 28, fontWeight: 300, color: "#fff", marginBottom: 32, letterSpacing: -0.5 } }, "Send a Message"), [["Name", "name", "text"], ["Email", "email", "email"], ["Subject", "subject", "text"]].map(([label, key, type]) => /* @__PURE__ */ import_react.default.createElement("div", { key, style: { marginBottom: 18 } }, /* @__PURE__ */ import_react.default.createElement("label", { style: { fontSize: 9, letterSpacing: 2.5, color: "rgba(255,255,255,.4)", display: "block", marginBottom: 8, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" } }, label), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type,
        value: form[key],
        onChange: (e) => setForm({ ...form, [key]: e.target.value }),
        style: {
          width: "100%",
          background: "rgba(255,255,255,.075)",
          border: "1px solid rgba(255,255,255,.14)",
          borderBottom: "1px solid rgba(184,146,42,.45)",
          color: "#fff",
          padding: "13px 14px",
          fontSize: 14,
          outline: "none",
          fontFamily: "'Montserrat',sans-serif"
        }
      }
    ))), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ import_react.default.createElement("label", { style: { fontSize: 9, letterSpacing: 2.5, color: "rgba(255,255,255,.4)", display: "block", marginBottom: 8, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" } }, "Message"), /* @__PURE__ */ import_react.default.createElement(
      "textarea",
      {
        value: form.message,
        onChange: (e) => setForm({ ...form, message: e.target.value }),
        rows: 5,
        style: {
          width: "100%",
          background: "rgba(255,255,255,.075)",
          border: "1px solid rgba(255,255,255,.14)",
          borderBottom: "1px solid rgba(184,146,42,.45)",
          color: "#fff",
          padding: "13px 14px",
          fontSize: 14,
          outline: "none",
          resize: "vertical",
          fontFamily: "'Montserrat',sans-serif"
        }
      }
    )), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: handle,
        style: {
          width: "100%",
          background: "#B8922A",
          color: "#fff",
          border: "none",
          padding: "16px",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 600,
          transition: "opacity .2s"
        },
        onMouseEnter: (e) => e.currentTarget.style.opacity = ".85",
        onMouseLeave: (e) => e.currentTarget.style.opacity = "1"
      },
      "Send Message"
    )))));
  }
  function FloatingInput({ label, type, value, onChange }) {
    const [focus, setFocus] = import_react.default.useState(false);
    const active = focus || value.length > 0;
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", marginBottom: 24 } }, /* @__PURE__ */ import_react.default.createElement("label", { style: { position: "absolute", left: 16, top: active ? 8 : 18, fontSize: active ? 9 : 13, color: active ? "#B8922A" : "#999", letterSpacing: active ? 2 : 0, textTransform: active ? "uppercase" : "none", transition: "all 0.25s ease", pointerEvents: "none", fontFamily: "'Montserrat',sans-serif", fontWeight: active ? 700 : 400 } }, label), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type,
        value,
        onChange,
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        style: { width: "100%", background: "#FAF8F4", border: "1px solid", borderColor: active ? "#B8922A" : "#E8E0D2", color: "#251737", padding: "24px 16px 8px", fontSize: 15, outline: "none", fontFamily: "'Montserrat',sans-serif", transition: "border-color 0.3s ease" }
      }
    ));
  }
  function SignupPage() {
    const [mode, setMode] = (0, import_react.useState)("login");
    const [done, setDone] = (0, import_react.useState)("");
    const [signupForm, setSignupForm] = (0, import_react.useState)({ name: "", email: "", phone: "", password: "" });
    const [loginForm, setLoginForm] = (0, import_react.useState)({ email: "", password: "" });
    const [forgotEmail, setForgotEmail] = (0, import_react.useState)("");
    const submit = (type) => {
      setDone(type);
      if (type === "signup") setSignupForm({ name: "", email: "", phone: "", password: "" });
      if (type === "login") setLoginForm({ email: "", password: "" });
      if (type === "forgot") setForgotEmail("");
    };
    const title = mode === "forgot" ? "Reset Password" : mode === "login" ? "Welcome Back" : "Create your account";
    const subtitle = mode === "forgot" ? "Enter your email and we will send password reset instructions." : mode === "login" ? "Login to manage your Khadlaj profile, wishlist, and private offers." : "Join for launch previews, fragrance stories, and private offers.";
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "linear-gradient(180deg,#fff 0%,#FAF8F4 100%)" } }, /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "74px 5% 96px" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { maxWidth: 1420, margin: "0 auto", display: "grid", gridTemplateColumns: ".95fr 1.05fr", alignItems: "stretch", border: "1px solid #E8E0D2", boxShadow: "0 40px 100px rgba(0,0,0,.06)", background: "#fff" }, className: "hero-split" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "auth-visual-panel", style: { position: "relative", overflow: "hidden", minHeight: 680, background: "url('/assets/images/banners/my-paradise-banner.png') center/cover", padding: "58px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(60,17,82,0.85) 0%, rgba(10,10,10,0.95) 100%)" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", top: -110, right: -90, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(184,146,42,.28),rgba(184,146,42,0) 68%)", zIndex: 1 } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", zIndex: 2, maxWidth: 470, marginTop: "auto", marginBottom: "auto" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 6, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 18 } }, "Khadlaj Circle"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: { fontSize: "clamp(48px,6vw,84px)", fontWeight: 300, lineHeight: 0.98, color: "#fff", marginBottom: 24, letterSpacing: "-1px" } }, mode === "login" ? "Login" : mode === "forgot" ? "Reset Password" : "Sign Up"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 15, color: "rgba(255,255,255,.75)", lineHeight: 1.9, maxWidth: 430, fontFamily: "'Montserrat',sans-serif", fontWeight: 300 } }, mode === "login" ? "Welcome back! Login to manage your Khadlaj profile, wishlist, and exclusive offers." : mode === "forgot" ? "Enter your email and we will send you password reset instructions." : "Join Khadlaj Circle for new launch previews, fragrance stories, and private exclusive offers."))), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "52px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" } }, done ? /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", padding: "52px 0", animation: "fadeIn .5s ease" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: 64, height: 64, borderRadius: "50%", background: "#251737", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#fff", fontSize: 13, letterSpacing: 2, fontFamily: "'Montserrat',sans-serif", fontWeight: 600, boxShadow: "0 12px 24px rgba(60,17,82,.2)" } }, "OK"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: 42, color: "#251737", fontWeight: 300, marginBottom: 12 } }, done === "forgot" ? "Check Your Email" : done === "login" ? "Welcome Back" : "You're In"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "#777", fontSize: 14, lineHeight: 1.8, fontFamily: "'Montserrat',sans-serif" } }, done === "forgot" ? "Password reset instructions have been prepared for your email." : done === "login" ? "You are ready to continue your Khadlaj experience." : "Thank you for joining the Khadlaj Circle."), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-ghost", onClick: () => setDone(""), style: { marginTop: 32, padding: "16px 32px", borderColor: "#251737", color: "#251737" } }, "Continue")) : /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", zIndex: 1, animation: "fadeIn .4s ease" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: mode === "forgot" ? "none" : "flex", gap: 32, borderBottom: "1px solid #E8E0D2", marginBottom: 42 } }, ["login", "signup"].map((tab) => /* @__PURE__ */ import_react.default.createElement("button", { key: tab, onClick: () => setMode(tab), style: { border: "none", background: "transparent", color: mode === tab ? "#251737" : "#999", padding: "0 0 16px", fontSize: 11, letterSpacing: 2.4, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, cursor: "pointer", position: "relative", transition: "color .3s ease" } }, tab === "login" ? "Login" : "Sign Up", mode === tab && /* @__PURE__ */ import_react.default.createElement("span", { style: { position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: "#251737", animation: "slideIn .3s ease" } })))), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(32px,3.7vw,54px)", fontWeight: 300, lineHeight: 1.05, color: "#251737", marginBottom: 14 } }, title), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "#777", lineHeight: 1.8, fontFamily: "'Montserrat',sans-serif", marginBottom: 36, maxWidth: 520 } }, subtitle), mode === "signup" && /* @__PURE__ */ import_react.default.createElement("div", { style: { animation: "fadeIn .4s ease" } }, /* @__PURE__ */ import_react.default.createElement(FloatingInput, { label: "Full Name", type: "text", value: signupForm.name, onChange: (e) => setSignupForm({ ...signupForm, name: e.target.value }) }), /* @__PURE__ */ import_react.default.createElement(FloatingInput, { label: "Email Address", type: "email", value: signupForm.email, onChange: (e) => setSignupForm({ ...signupForm, email: e.target.value }) }), /* @__PURE__ */ import_react.default.createElement(FloatingInput, { label: "Phone Number", type: "tel", value: signupForm.phone, onChange: (e) => setSignupForm({ ...signupForm, phone: e.target.value }) }), /* @__PURE__ */ import_react.default.createElement(FloatingInput, { label: "Password", type: "password", value: signupForm.password, onChange: (e) => setSignupForm({ ...signupForm, password: e.target.value }) }), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => submit("signup"), style: { width: "100%", background: "#251737", color: "#fff", border: "none", padding: "20px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginTop: 12, boxShadow: "0 12px 24px rgba(60,17,82,.15)", transition: "all .3s ease" }, onMouseEnter: (e) => e.currentTarget.style.transform = "translateY(-2px)", onMouseLeave: (e) => e.currentTarget.style.transform = "translateY(0)" }, "Create Account")), mode === "login" && /* @__PURE__ */ import_react.default.createElement("div", { style: { animation: "fadeIn .4s ease" } }, /* @__PURE__ */ import_react.default.createElement(FloatingInput, { label: "Email Address", type: "email", value: loginForm.email, onChange: (e) => setLoginForm({ ...loginForm, email: e.target.value }) }), /* @__PURE__ */ import_react.default.createElement(FloatingInput, { label: "Password", type: "password", value: loginForm.password, onChange: (e) => setLoginForm({ ...loginForm, password: e.target.value }) }), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "flex-end", margin: "-12px 0 24px" } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setMode("forgot"), style: { background: "transparent", border: "none", color: "#B8922A", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, cursor: "pointer", transition: "color .3s ease" }, onMouseEnter: (e) => e.currentTarget.style.color = "#251737", onMouseLeave: (e) => e.currentTarget.style.color = "#B8922A" }, "Forgot Password?")), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => submit("login"), style: { width: "100%", background: "#251737", color: "#fff", border: "none", padding: "20px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, boxShadow: "0 12px 24px rgba(60,17,82,.15)", transition: "all .3s ease" }, onMouseEnter: (e) => e.currentTarget.style.transform = "translateY(-2px)", onMouseLeave: (e) => e.currentTarget.style.transform = "translateY(0)" }, "Login")), mode === "forgot" && /* @__PURE__ */ import_react.default.createElement("div", { style: { animation: "fadeIn .4s ease" } }, /* @__PURE__ */ import_react.default.createElement(FloatingInput, { label: "Email Address", type: "email", value: forgotEmail, onChange: (e) => setForgotEmail(e.target.value) }), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => submit("forgot"), style: { width: "100%", background: "#251737", color: "#fff", border: "none", padding: "20px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, boxShadow: "0 12px 24px rgba(60,17,82,.15)", transition: "all .3s ease" }, onMouseEnter: (e) => e.currentTarget.style.transform = "translateY(-2px)", onMouseLeave: (e) => e.currentTarget.style.transform = "translateY(0)" }, "Send Reset Link"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setMode("login"), style: { width: "100%", background: "transparent", color: "#251737", border: "1px solid #251737", padding: "18px", fontSize: 11, letterSpacing: 2.6, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginTop: 16, transition: "all .3s ease" }, onMouseEnter: (e) => e.currentTarget.style.background = "rgba(60,17,82,.04)", onMouseLeave: (e) => e.currentTarget.style.background = "transparent" }, "Back to Login")), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, color: "#999", lineHeight: 1.7, fontFamily: "'Montserrat',sans-serif", marginTop: 32, textAlign: "center" } }, "Your account is used for Khadlaj updates, wishlists, and private fragrance offers."))))));
  }
  function CartPage({ cartItems, updateCartQty, removeFromCart, setPage, setViewProduct }) {
    const { activeCountry } = import_react.default.useContext(CountryContext);
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 20;
    const total = subtotal + shipping;
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff", minHeight: "100vh" } }, /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "70px 5% 96px", maxWidth: 1280, margin: "0 auto" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 44 } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 12 } }, "Shopping Bag"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: { fontSize: "clamp(38px,5vw,68px)", fontWeight: 300, lineHeight: 1, color: "#251737" } }, "Your Cart")), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-ghost", onClick: () => setPage("collections") }, "Continue Shopping")), cartItems.length === 0 ? /* @__PURE__ */ import_react.default.createElement("div", { style: { border: "1px solid #E8E4DC", padding: "56px 24px", textAlign: "center", background: "#FCFBFA" } }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: 34, fontWeight: 300, marginBottom: 12 } }, "Your bag is empty"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 13, color: "#777", fontFamily: "'Montserrat',sans-serif", marginBottom: 28 } }, "Add your favourite Khadlaj fragrances and checkout securely."), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-gold", onClick: () => setPage("collections") }, "Shop Fragrances")) : /* @__PURE__ */ import_react.default.createElement("div", { className: "grid-2", style: { display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(320px,.8fr)", gap: 34, alignItems: "start" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, cartItems.map((item) => /* @__PURE__ */ import_react.default.createElement("div", { key: item.id, className: "cart-line", style: { display: "grid", gridTemplateColumns: "112px 1fr auto", gap: 18, alignItems: "center", border: "1px solid #E8E4DC", padding: 16, background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("div", { onClick: () => {
      setViewProduct(item);
      setPage("product");
    }, style: { height: 118, width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "radial-gradient(circle at 50% 70%, rgba(0,0,0,.06), rgba(255,255,255,0) 58%)", padding: 6 } }, /* @__PURE__ */ import_react.default.createElement("img", { src: item.img, alt: item.name, style: { width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 12px 18px rgba(0,0,0,.08))" } })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 3, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginBottom: 6 } }, item.col === "Lafede" ? "La Fede" : item.col), /* @__PURE__ */ import_react.default.createElement("h3", { style: { fontSize: 16, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600, marginBottom: 6 } }, item.name), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, color: "#888", fontFamily: "'Montserrat',sans-serif", marginBottom: 14 } }, item.size), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => removeFromCart(item.id), style: { background: "none", border: "none", borderBottom: "1px solid #999", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#777", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", paddingBottom: 2 } }, "Remove")), /* @__PURE__ */ import_react.default.createElement("div", { className: "cart-line-actions", style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 15, fontWeight: 600, fontFamily: "'Montserrat',sans-serif" } }, formatPrice(item.price * item.qty)), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", border: "1px solid #E8E4DC", height: 38 } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => updateCartQty(item.id, item.qty - 1), style: { width: 36, height: "100%", border: "none", background: "#fff", cursor: "pointer", fontSize: 18 } }, "-"), /* @__PURE__ */ import_react.default.createElement("span", { style: { width: 34, textAlign: "center", fontSize: 12, fontFamily: "'Montserrat',sans-serif" } }, item.qty), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => updateCartQty(item.id, item.qty + 1), style: { width: 36, height: "100%", border: "none", background: "#fff", cursor: "pointer", fontSize: 16 } }, "+")))))), /* @__PURE__ */ import_react.default.createElement("aside", { style: { border: "1px solid #E8E4DC", padding: 26, position: "sticky", top: 130, background: "#FCFBFA" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 4, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginBottom: 18 } }, "Order Summary"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "'Montserrat',sans-serif", marginBottom: 12 } }, /* @__PURE__ */ import_react.default.createElement("span", null, "Subtotal"), /* @__PURE__ */ import_react.default.createElement("strong", null, formatPrice(subtotal))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "'Montserrat',sans-serif", marginBottom: 16 } }, /* @__PURE__ */ import_react.default.createElement("span", null, "Shipping"), /* @__PURE__ */ import_react.default.createElement("strong", null, shipping === 0 ? "Free" : formatPrice(shipping))), subtotal > 0 && subtotal < 200 && /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, color: "#777", lineHeight: 1.7, marginBottom: 16, fontFamily: "'Montserrat',sans-serif" } }, "Add ", formatPrice(200 - subtotal), " more for free UAE shipping."), /* @__PURE__ */ import_react.default.createElement("div", { style: { height: 1, background: "#E8E4DC", margin: "18px 0" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 13, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, "Total"), /* @__PURE__ */ import_react.default.createElement("strong", { style: { fontSize: 22, fontFamily: "'Montserrat',sans-serif" } }, formatPrice(total))), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-gold", style: { width: "100%" }, onClick: () => setPage("checkout") }, "Checkout"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 10, color: "#888", lineHeight: 1.7, textAlign: "center", marginTop: 14, fontFamily: "'Montserrat',sans-serif" } }, "Secure checkout. Payment and delivery details are validated before order placement.")))));
  }
  function CheckoutPage({ cartItems, setPage, clearCart }) {
    const { activeCountry } = import_react.default.useContext(CountryContext);
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 20;
    const total = subtotal + shipping;
    const [submitted, setSubmitted] = (0, import_react.useState)(false);
    const [errors, setErrors] = (0, import_react.useState)({});
    const [form, setForm] = (0, import_react.useState)({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: activeCountry.name,
      payment: "Card",
      notes: "",
      agree: false
    });
    const setField = (key, value) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    };
    const validate = () => {
      const next = {};
      if (!form.firstName.trim()) next.firstName = "First name is required";
      if (!form.lastName.trim()) next.lastName = "Last name is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email";
      if (!/^[0-9+\-\s()]{7,}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number";
      if (form.address.trim().length < 8) next.address = "Enter full delivery address";
      if (!form.city.trim()) next.city = "City is required";
      if (!form.country.trim()) next.country = "Country is required";
      if (!form.payment) next.payment = "Select payment method";
      if (!form.agree) next.agree = "Please accept the terms";
      setErrors(next);
      return Object.keys(next).length === 0;
    };
    const submitOrder = () => {
      if (cartItems.length === 0) {
        setPage("cart");
        return;
      }
      if (!validate()) return;
      setSubmitted(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const fieldStyle = (key) => ({
      width: "100%",
      border: `1px solid ${errors[key] ? "#B00020" : "#E2DED6"}`,
      background: "#fff",
      padding: "14px 15px",
      fontSize: 12,
      outline: "none",
      fontFamily: "'Montserrat',sans-serif"
    });
    const labelStyle = { display: "block", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", color: "#777", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginBottom: 8 };
    const errorText = (key) => errors[key] ? /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 10, color: "#B00020", marginTop: 6, fontFamily: "'Montserrat',sans-serif" } }, errors[key]) : null;
    if (submitted) {
      return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff", minHeight: "100vh", padding: "90px 5%" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { maxWidth: 760, margin: "0 auto", textAlign: "center", border: "1px solid #E8E4DC", padding: "64px 28px", background: "#FCFBFA" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginBottom: 18 } }, "Order Received"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: { fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, marginBottom: 16 } }, "Thank you, ", form.firstName), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 14, color: "#666", lineHeight: 1.8, fontFamily: "'Montserrat',sans-serif", maxWidth: 520, margin: "0 auto 30px" } }, "Your Khadlaj order request has been submitted. A confirmation will be sent to ", form.email, "."), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-gold", onClick: () => setPage("home") }, "Back to Home")));
    }
    return /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff", minHeight: "100vh" } }, /* @__PURE__ */ import_react.default.createElement("section", { style: { padding: "70px 5% 96px", maxWidth: 1280, margin: "0 auto" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 44 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 5, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 12 } }, "Secure Checkout"), /* @__PURE__ */ import_react.default.createElement("h1", { className: "disp", style: { fontSize: "clamp(38px,5vw,68px)", fontWeight: 300, lineHeight: 1, color: "#251737" } }, "Checkout")), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid-2", style: { display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(320px,.85fr)", gap: 34, alignItems: "start" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { border: "1px solid #E8E4DC", padding: "clamp(22px,4vw,38px)", background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("h2", { style: { fontSize: 14, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 24 } }, "Delivery Details"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }, className: "grid-2" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "First Name"), /* @__PURE__ */ import_react.default.createElement("input", { value: form.firstName, onChange: (e) => setField("firstName", e.target.value), style: fieldStyle("firstName") }), errorText("firstName")), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "Last Name"), /* @__PURE__ */ import_react.default.createElement("input", { value: form.lastName, onChange: (e) => setField("lastName", e.target.value), style: fieldStyle("lastName") }), errorText("lastName"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }, className: "grid-2" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "Email"), /* @__PURE__ */ import_react.default.createElement("input", { type: "email", value: form.email, onChange: (e) => setField("email", e.target.value), style: fieldStyle("email") }), errorText("email")), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "Phone"), /* @__PURE__ */ import_react.default.createElement("input", { value: form.phone, onChange: (e) => setField("phone", e.target.value), style: fieldStyle("phone") }), errorText("phone"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "Address"), /* @__PURE__ */ import_react.default.createElement("input", { value: form.address, onChange: (e) => setField("address", e.target.value), style: fieldStyle("address") }), errorText("address")), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }, className: "grid-2" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "City"), /* @__PURE__ */ import_react.default.createElement("input", { value: form.city, onChange: (e) => setField("city", e.target.value), style: fieldStyle("city") }), errorText("city")), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "Country"), /* @__PURE__ */ import_react.default.createElement("input", { value: form.country, onChange: (e) => setField("country", e.target.value), style: fieldStyle("country") }), errorText("country"))), /* @__PURE__ */ import_react.default.createElement("h2", { style: { fontSize: 14, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 } }, "Payment Method"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 10, marginBottom: 22 }, className: "grid-3" }, ["Card", "Cash on Delivery", "PayPal"].map((method) => /* @__PURE__ */ import_react.default.createElement("button", { key: method, onClick: () => setField("payment", method), style: { border: `1px solid ${form.payment === method ? "#111" : "#E8E4DC"}`, background: form.payment === method ? "#111" : "#fff", color: form.payment === method ? "#fff" : "#111", padding: "13px 10px", fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, cursor: "pointer" } }, method))), errorText("payment"), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginBottom: 22 } }, /* @__PURE__ */ import_react.default.createElement("label", { style: labelStyle }, "Order Notes"), /* @__PURE__ */ import_react.default.createElement("textarea", { value: form.notes, onChange: (e) => setField("notes", e.target.value), rows: 4, style: { ...fieldStyle("notes"), resize: "vertical" }, placeholder: "Delivery notes, gift message, or special request" })), /* @__PURE__ */ import_react.default.createElement("label", { style: { display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginBottom: 8 } }, /* @__PURE__ */ import_react.default.createElement("input", { type: "checkbox", checked: form.agree, onChange: (e) => setField("agree", e.target.checked), style: { marginTop: 3 } }), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 11, color: "#666", lineHeight: 1.7, fontFamily: "'Montserrat',sans-serif" } }, "I confirm my delivery details are correct and agree to Khadlaj order terms.")), errorText("agree")), /* @__PURE__ */ import_react.default.createElement("aside", { style: { border: "1px solid #E8E4DC", padding: 26, position: "sticky", top: 130, background: "#FCFBFA" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 4, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, marginBottom: 18 } }, "Review Order"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 } }, cartItems.map((item) => /* @__PURE__ */ import_react.default.createElement("div", { key: item.id, style: { display: "grid", gridTemplateColumns: "58px 1fr auto", gap: 10, alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { height: 64, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" } }, /* @__PURE__ */ import_react.default.createElement("img", { src: item.img, alt: item.name, style: { maxWidth: "90%", maxHeight: "90%", objectFit: "contain" } })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, fontWeight: 600, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", lineHeight: 1.25 } }, item.name), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 10, color: "#888", fontFamily: "'Montserrat',sans-serif" } }, "Qty ", item.qty)), /* @__PURE__ */ import_react.default.createElement("strong", { style: { fontSize: 12, fontFamily: "'Montserrat',sans-serif" } }, formatPrice(item.price * item.qty))))), /* @__PURE__ */ import_react.default.createElement("div", { style: { height: 1, background: "#E8E4DC", margin: "18px 0" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "'Montserrat',sans-serif", marginBottom: 12 } }, /* @__PURE__ */ import_react.default.createElement("span", null, "Subtotal"), /* @__PURE__ */ import_react.default.createElement("strong", null, formatPrice(subtotal))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "'Montserrat',sans-serif", marginBottom: 16 } }, /* @__PURE__ */ import_react.default.createElement("span", null, "Shipping"), /* @__PURE__ */ import_react.default.createElement("strong", null, shipping === 0 ? "Free" : formatPrice(shipping))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0 24px", paddingTop: 18, borderTop: "1px solid #E8E4DC" } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 13, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, "Total"), /* @__PURE__ */ import_react.default.createElement("strong", { style: { fontSize: 22, fontFamily: "'Montserrat',sans-serif" } }, formatPrice(total))), /* @__PURE__ */ import_react.default.createElement("button", { className: "btn-gold", style: { width: "100%" }, onClick: submitOrder }, "Place Order"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setPage("cart"), style: { width: "100%", marginTop: 12, background: "transparent", border: "1px solid #251737", padding: "13px", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, cursor: "pointer" } }, "Back to Cart")))));
  }
  function Navbar({ page, setPage, cartCount, setCollectionCategory, collectionCategory, activeCountry }) {
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
    const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
    const [searchResults, setSearchResults] = (0, import_react.useState)([]);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
    const handleSearch = (q) => {
      setSearchQuery(q);
      if (!q.trim()) {
        setSearchResults([]);
        return;
      }
      var lower = q.toLowerCase();
      var results = PRODUCTS.filter(function(p) {
        return p.name.toLowerCase().includes(lower) || p.col.toLowerCase().includes(lower) || (p.notes || []).some(function(n) {
          return n.toLowerCase().includes(lower);
        }) || (p.gender || "").toLowerCase().includes(lower);
      }).slice(0, 8);
      setSearchResults(results);
    };
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, searchOpen && /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "fixed", inset: 0, zIndex: 500, background: "rgba(255,255,255,.98)", display: "flex", flexDirection: "column", padding: "0 5%" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, borderBottom: "2px solid #000", padding: "28px 0 18px" } }, /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 20, color: "#888" } }, "\u2315"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        autoFocus: true,
        type: "text",
        value: searchQuery,
        onChange: (e) => handleSearch(e.target.value),
        placeholder: "Search fragrances, collections, notes...",
        style: { flex: 1, border: "none", outline: "none", fontSize: "clamp(16px,2.5vw,26px)", fontFamily: "'Trajan Pro', 'Cinzel', serif", fontWeight: 300, color: "#251737", background: "transparent" }
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          setSearchOpen(false);
          setSearchQuery("");
          setSearchResults([]);
        },
        style: { background: "none", border: "none", fontSize: 28, cursor: "pointer", color: "#251737", fontWeight: 300, lineHeight: 1 }
      },
      "\xD7"
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { flex: 1, overflowY: "auto", paddingTop: 24 } }, searchQuery && searchResults.length === 0 && /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", paddingTop: 64 } }, /* @__PURE__ */ import_react.default.createElement("p", { className: "disp", style: { fontSize: 28, fontWeight: 300, color: "#251737", marginBottom: 8 } }, 'No results for "', searchQuery, '"'), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 13, color: "#888", fontFamily: "'Montserrat',sans-serif" } }, 'Try "oud", "musk", "gift"...')), searchResults.length > 0 && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 4, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 20 } }, searchResults.length, ' results for "', searchQuery, '"'), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }, className: "grid-3" }, searchResults.map((p) => /* @__PURE__ */ import_react.default.createElement("div", { key: p.id, onClick: () => {
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
      setPage("product");
    }, style: { cursor: "pointer" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#fff", border: "1px solid #F1ECE4" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 10, background: "radial-gradient(circle at 50% 42%, rgba(184,146,42,.10), rgba(255,255,255,0) 62%)" } }), /* @__PURE__ */ import_react.default.createElement("img", { src: p.img, alt: p.name, loading: "lazy", style: { position: "relative", width: "100%", height: "100%", objectFit: "contain", padding: "16px", filter: "drop-shadow(0 12px 20px rgba(0,0,0,.08))" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { height: 2, position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(90deg,#B8922A,#D4AF5A,#B8922A)" } }), p.badge && /* @__PURE__ */ import_react.default.createElement("span", { style: { position: "absolute", top: 10, left: 10, background: p.badge === "New" ? "#B8922A" : p.badge === "Limited" ? "#5C0000" : "#251737", color: "#fff", fontSize: 8, letterSpacing: 2, padding: "3px 8px", fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase" } }, p.badge)), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "10px 6px 14px" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, color: "#B8922A", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 3 } }, p.col === "Lafede" ? "La Fede" : p.col), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, fontWeight: 600, color: "#251737", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 4, lineHeight: 1.2 } }, p.name), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 13, fontWeight: 600, color: "#251737", fontFamily: "'Montserrat',sans-serif" } }, formatPrice(p.price))))))), !searchQuery && /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontWeight: 600, fontSize: 9, letterSpacing: 4, color: "#B8922A", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 16 } }, "Popular Searches"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 } }, ["Oud", "Musk", "Gift Set", "New Arrivals", "For Her", "For Him", "Amber", "Island"].map((s) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: s,
        onClick: () => handleSearch(s),
        style: { background: "#F7F5F2", border: "1px solid #E8E4DC", padding: "8px 16px", fontSize: 12, color: "#333", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", transition: "all .2s" },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#251737";
          e.currentTarget.style.color = "#fff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "#F7F5F2";
          e.currentTarget.style.color = "#333";
        }
      },
      s
    )))))), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "sticky", top: 0, zIndex: 100 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#251737", color: "#fff", textAlign: "center", padding: "14px 16px", fontSize: "12px", letterSpacing: "4px", fontFamily: "'DM Sans',sans-serif", textTransform: "uppercase", fontWeight: 500 } }, 'USE "KHADLAJ25" FOR FLAT 25% DISCOUNT'), /* @__PURE__ */ import_react.default.createElement("nav", { style: { background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 4px 30px rgba(0,0,0,0.03)", borderBottom: "1px solid rgba(232,228,220,0.5)", transition: "all 0.3s" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "0 5%" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", minHeight: "auto", padding: "16px 0", gap: 24 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", paddingLeft: "20px" } }, /* @__PURE__ */ import_react.default.createElement("span", { className: "mob-search-left", style: { cursor: "pointer", display: "flex", alignItems: "center" }, onClick: () => setSearchOpen(true) }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "hide-mob country-dropdown" }, /* @__PURE__ */ import_react.default.createElement(CountryContext.Consumer, null, ({ activeCountry: activeCountry2, setActiveCountry }) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", border: "1px solid #E8E4DC", borderRadius: 4, background: "#FAF9F6", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 600, color: "#251737" } }, activeCountry2.flagUrl === "global" ? /* @__PURE__ */ import_react.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })) : /* @__PURE__ */ import_react.default.createElement("img", { src: activeCountry2.flagUrl, alt: activeCountry2.name, style: { width: 24, height: 17, objectFit: "cover", borderRadius: 2, display: "block" } }), activeCountry2.name, /* @__PURE__ */ import_react.default.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { marginLeft: "6px" } }, /* @__PURE__ */ import_react.default.createElement("polyline", { points: "6 9 12 15 18 9" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "country-dropdown-menu" }, COUNTRIES.map((c) => {
      const isActive = activeCountry2.name === c.name;
      return /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          key: c.name,
          onClick: () => setActiveCountry(c),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 12px",
            border: "none",
            borderRadius: 3,
            background: isActive ? "#F4F1EA" : "transparent",
            cursor: "pointer",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: 11,
            fontWeight: isActive ? 600 : 500,
            color: isActive ? "#251737" : "#555",
            textAlign: "left",
            width: "100%",
            transition: "all .2s"
          },
          onMouseEnter: (e) => {
            if (!isActive) {
              e.currentTarget.style.background = "#FBFaf8";
              e.currentTarget.style.color = "#251737";
            }
          },
          onMouseLeave: (e) => {
            if (!isActive) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#555";
            }
          }
        },
        c.flagUrl === "global" ? /* @__PURE__ */ import_react.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })) : /* @__PURE__ */ import_react.default.createElement("img", { src: c.flagUrl, alt: c.name, style: { width: 20, height: 14, objectFit: "cover", borderRadius: 2, display: "block" } }),
        c.name
      );
    })))))), /* @__PURE__ */ import_react.default.createElement("div", { onClick: () => setPage("home"), style: { cursor: "pointer", textAlign: "center", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "/assets/images/purple-logo.png?v=2",
        alt: "Khadlaj Perfumes",
        style: { width: "clamp(85px, 12vw, 120px)", height: "auto", objectFit: "contain", display: "block", transition: "transform 0.3s ease" },
        onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.02)",
        onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 24 } }, /* @__PURE__ */ import_react.default.createElement("span", { className: "hide-mob", style: { fontSize: "11px", letterSpacing: "2px", color: "#251737", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, transition: "color .2s" }, onMouseEnter: (e) => e.target.style.color = "#B8922A", onMouseLeave: (e) => e.target.style.color = "#251737", onClick: () => setPage("signup") }, "Sign Up"), /* @__PURE__ */ import_react.default.createElement("span", { className: "hide-mob", style: { cursor: "pointer", display: "flex", alignItems: "center", transition: "transform .2s" }, onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.1)", onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)", onClick: () => setSearchOpen(true) }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }))), /* @__PURE__ */ import_react.default.createElement("div", { onClick: () => setPage("cart"), style: { position: "relative", cursor: "pointer", transition: "transform .2s ease" }, onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.1)", onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)" }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#111", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M16 10a4 4 0 01-8 0" })), cartCount > 0 && /* @__PURE__ */ import_react.default.createElement("span", { style: { position: "absolute", top: -5, right: -7, background: "#B8922A", color: "#fff", borderRadius: "50%", width: 14, height: 14, fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontFamily: "'Montserrat',sans-serif" } }, cartCount)), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setMobileMenuOpen((o) => !o),
        style: { display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px", flexDirection: "column", gap: 5, justifyContent: "center", alignItems: "center" },
        className: "mob-burger",
        "aria-label": "Menu"
      },
      /* @__PURE__ */ import_react.default.createElement("span", { style: { display: "block", width: 20, height: 1.5, background: "#251737", transition: "all .25s" } }),
      /* @__PURE__ */ import_react.default.createElement("span", { style: { display: "block", width: 20, height: 1.5, background: "#251737", transition: "all .25s" } }),
      /* @__PURE__ */ import_react.default.createElement("span", { style: { display: "block", width: 14, height: 1.5, background: "#251737", transition: "all .25s" } })
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "hide-mob", style: { display: "flex", justifyContent: "center", gap: 40, paddingBottom: 16, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#251737", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, [["Best Sellers", "collections"], ["Perfume Spray", "collections"], ["Perfume Oil", "collections"], ["Home & Ambience", "home"], ["La Fede", "lafede"], ["Gift Sets", "gifts"], ["Our legacy", "story"]].map(([label, pg]) => {
      let isActive = false;
      if (page === pg) {
        if (pg === "collections") {
          if (label === "Best Sellers") isActive = collectionCategory === "Best Sellers";
          else if (label === "Perfume Spray") isActive = collectionCategory === "EAU DE PARFUM";
          else if (label === "Perfume Oil") isActive = collectionCategory === "Perfume Oils";
        } else {
          isActive = true;
        }
      }
      return /* @__PURE__ */ import_react.default.createElement("span", { key: label, onClick: () => {
        if (label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
          setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Perfume Oils" : label);
        } else if (pg === "collections") {
          setCollectionCategory("Khadlaj");
        }
        setPage(pg);
        window.scrollTo(0, 0);
      }, className: `nav-link ${isActive ? "active" : ""}` }, label);
    }))), mobileMenuOpen && /* @__PURE__ */ import_react.default.createElement("div", { style: {
      background: "#fff",
      borderTop: "1px solid #E0E0E0",
      padding: "8px 0 20px",
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      zIndex: 200,
      boxShadow: "0 8px 32px rgba(0,0,0,.12)"
    } }, [["Best Sellers", "collections"], ["Perfume Spray", "collections"], ["Perfume Oil", "collections"], ["Home & Ambience", "home"], ["La Fede", "lafede"], ["Gift Sets", "gifts"], ["Our legacy", "story"], ["Sign Up", "signup"]].map(([label, pg]) => {
      let isActive = false;
      if (page === pg) {
        if (pg === "collections") {
          if (label === "Best Sellers") isActive = collectionCategory === "Best Sellers";
          else if (label === "Perfume Spray") isActive = collectionCategory === "EAU DE PARFUM";
          else if (label === "Perfume Oil") isActive = collectionCategory === "Perfume Oils";
        } else {
          isActive = true;
        }
      }
      return /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          key: label,
          className: "mob-nav-link",
          onClick: () => {
            if (label === "Best Sellers" || label === "Perfume Spray" || label === "Perfume Oil" || label === "Master Perfumery") {
              setCollectionCategory(label === "Perfume Spray" ? "EAU DE PARFUM" : label === "Perfume Oil" ? "Perfume Oils" : label);
            } else if (pg === "collections") {
              setCollectionCategory("Khadlaj");
            }
            setPage(pg);
            setMobileMenuOpen(false);
            window.scrollTo(0, 0);
          },
          style: {
            padding: "14px 6%",
            fontSize: 11,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            color: isActive ? "#B8922A" : "#251737",
            fontWeight: isActive ? 700 : 500,
            cursor: "pointer",
            fontFamily: "'Montserrat',sans-serif",
            borderBottom: "1px solid #F0EBE3",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }
        },
        label,
        /* @__PURE__ */ import_react.default.createElement("span", { style: { color: isActive ? "#B8922A" : "rgba(37,23,55,0.4)", fontSize: 12 } }, "\u2192")
      );
    }), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "14px 6% 0", display: "flex", gap: 12, flexWrap: "wrap" } }, [["Instagram", SOCIAL_LINKS.instagram], ["TikTok", SOCIAL_LINKS.tiktok]].map(([s, href]) => /* @__PURE__ */ import_react.default.createElement(
      "a",
      {
        key: s,
        href,
        target: "_blank",
        rel: "noreferrer",
        style: { fontSize: 9, letterSpacing: 2, color: "#888", border: "1px solid #E0E0E0", padding: "7px 14px", textDecoration: "none", fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase" }
      },
      s
    ))), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "18px 6% 0", borderTop: "1px solid #F0EBE3", marginTop: 18 } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 2, color: "#888", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 8, fontWeight: 600 } }, "Select Country"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, /* @__PURE__ */ import_react.default.createElement(CountryContext.Consumer, null, ({ activeCountry: activeCountry2, setActiveCountry }) => COUNTRIES.map((c) => {
      const isActive = activeCountry2.name === c.name;
      return /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          key: c.name,
          onClick: () => {
            setActiveCountry(c);
            setMobileMenuOpen(false);
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 12px",
            border: isActive ? "1px solid #B8922A" : "1px solid #E0E0E0",
            borderRadius: 4,
            background: isActive ? "#FAF9F6" : "#fff",
            cursor: "pointer",
            fontFamily: "'Montserrat',sans-serif",
            fontSize: 10,
            fontWeight: isActive ? 600 : 400,
            color: isActive ? "#B8922A" : "#555"
          }
        },
        c.flagUrl === "global" ? /* @__PURE__ */ import_react.default.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })) : /* @__PURE__ */ import_react.default.createElement("img", { src: c.flagUrl, alt: c.name, style: { width: 16, height: 11, objectFit: "cover", borderRadius: 1, display: "block" } }),
        c.name
      );
    }))))))), /* @__PURE__ */ import_react.default.createElement("style", null, `.mob-burger{display:none!important;}@media(max-width:900px){.mob-burger{display:flex!important;}.mob-search-left{display:inline-block!important;}}@media(min-width:901px){.mob-search-left{display:none!important;}} @keyframes spin { 100% { transform: rotate(360deg); } }`));
  }
  function Footer({ setPage }) {
    return /* @__PURE__ */ import_react.default.createElement("footer", { style: { background: "#fff", borderTop: "1px solid #E8E4DC" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#251737", padding: "80px 5%", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.05)", borderTop: "1px solid rgba(193,164,106,0.15)" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { maxWidth: 560, margin: "0 auto" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 4, color: "#B8922A", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: 14, fontWeight: 600 } }, "Newsletter"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "disp", style: { fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 300, marginBottom: 14, color: "#fff", letterSpacing: "-0.5px" } }, "Join the Khadlaj Circle"), /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 36, fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7 } }, "Get exclusive access to new launches and special offers"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 0, maxWidth: 440, margin: "0 auto" } }, /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "email",
        placeholder: "Enter your email",
        style: { flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRight: "none", color: "#fff", padding: "16px 22px", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        style: { background: "#B8922A", border: "1px solid #B8922A", color: "#fff", padding: "16px 36px", fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, transition: "all .3s" },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "#251737";
          e.currentTarget.style.borderColor = "#fff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "#B8922A";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "#B8922A";
        }
      },
      "Subscribe"
    )))), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#FAF9F6", padding: "80px 6% 48px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, borderTop: "1px solid #f0f0f0" }, className: "grid-3" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        src: "/assets/images/purple-logo.png?v=2",
        alt: "Khadlaj Perfumes",
        style: { height: 126, width: "auto", objectFit: "contain", display: "block", marginBottom: 24 }
      }
    ), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "8px", letterSpacing: 3.5, color: "#B8922A", fontFamily: "'Montserrat',sans-serif", marginBottom: 16, textTransform: "uppercase", fontWeight: 600 } }, "Perfumes \xB7 UAE \xB7 Est. 1997"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 13, color: "#555", lineHeight: 1.85, maxWidth: 260, marginBottom: 32, fontFamily: "'Montserrat',sans-serif" } }, "Family-owned UAE perfume house. Authentic Arabian & French fragrance artistry since 1997."), /* @__PURE__ */ import_react.default.createElement(CountryContext.Consumer, null, ({ activeCountry, setActiveCountry }) => /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, COUNTRIES.map((c) => /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        key: c.name,
        onClick: () => setActiveCountry(c),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          border: "1px solid",
          borderColor: activeCountry.name === c.name ? "#B8922A" : "#e5e5e5",
          background: activeCountry.name === c.name ? "rgba(184,146,42,0.08)" : "#fff",
          cursor: "pointer",
          transition: "all .2s ease"
        },
        onMouseEnter: (e) => {
          if (activeCountry.name !== c.name) e.currentTarget.style.borderColor = "#000";
        },
        onMouseLeave: (e) => {
          if (activeCountry.name !== c.name) e.currentTarget.style.borderColor = "#e5e5e5";
        }
      },
      c.flagUrl === "global" ? /* @__PURE__ */ import_react.default.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { color: "#222" } }, /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })) : /* @__PURE__ */ import_react.default.createElement("img", { src: c.flagUrl, alt: "", style: { width: 16, height: 11, objectFit: "cover", borderRadius: 1 } }),
      /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 9, color: "#222", fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, c.name)
    ))))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "8.5px", letterSpacing: 2.5, color: "#251737", textTransform: "uppercase", marginBottom: 24, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, "Collections"), [["Perfume Oils", "collections"], ["La Fede", "lafede"], ["Master Perfumery", "collections"], ["Gift Sets", "gifts"], ["New Arrivals", "collections"], ["Best Sellers", "collections"]].map(([l, pg]) => /* @__PURE__ */ import_react.default.createElement(
      "p",
      {
        key: l,
        onClick: () => setPage(pg),
        style: { fontSize: 12, color: "#555", marginBottom: 14, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", letterSpacing: 0.5, transition: "all .25s ease" },
        onMouseEnter: (e) => e.target.style.color = "#B8922A",
        onMouseLeave: (e) => e.target.style.color = "#555"
      },
      l
    ))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "8.5px", letterSpacing: 2.5, color: "#251737", textTransform: "uppercase", marginBottom: 24, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, "Company"), [["Our Story", "story"], ["Contact Us", "contact"], ["Find a Store", "contact"], ["Careers", "contact"], ["Press", "contact"]].map(([l, pg]) => /* @__PURE__ */ import_react.default.createElement(
      "p",
      {
        key: l,
        onClick: () => setPage(pg),
        style: { fontSize: 12, color: "#555", marginBottom: 14, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", letterSpacing: 0.5, transition: "all .25s ease" },
        onMouseEnter: (e) => e.target.style.color = "#B8922A",
        onMouseLeave: (e) => e.target.style.color = "#555"
      },
      l
    ))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "8.5px", letterSpacing: 2.5, color: "#251737", textTransform: "uppercase", marginBottom: 24, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, "Support"), ["Shipping & Returns", "FAQ", "Track My Order", "Fragrance Guide", "Gift Wrapping"].map((l) => /* @__PURE__ */ import_react.default.createElement(
      "p",
      {
        key: l,
        style: { fontSize: 12, color: "#555", marginBottom: 14, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", letterSpacing: 0.5, transition: "all .25s ease" },
        onMouseEnter: (e) => e.target.style.color = "#B8922A",
        onMouseLeave: (e) => e.target.style.color = "#555"
      },
      l
    )), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: 32, paddingTop: 24, borderTop: "1px solid #e5e5e5" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: "8px", letterSpacing: 2.5, color: "#251737", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 } }, "Ships With"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, ["DHL", "Aramex", "EMX"].map((s) => /* @__PURE__ */ import_react.default.createElement("span", { key: s, style: { border: "1px solid #e5e5e5", padding: "4px 12px", fontSize: 9, color: "#444", fontFamily: "'Montserrat',sans-serif", letterSpacing: 1, background: "#fff", borderRadius: 1 } }, s)))))), /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#fff", borderTop: "1px solid #E8E4DC", padding: "30px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, fontSize: 9, color: "#888", letterSpacing: 1.5, fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase" } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { marginBottom: 10, color: "#251737", fontWeight: 600 } }, "\xA9 2025 Khadlaj Perfumes LLC. All rights reserved. UAE."), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 24 } }, ["Privacy Policy", "Terms of Use", "Cookie Settings"].map((l) => /* @__PURE__ */ import_react.default.createElement("span", { key: l, style: { cursor: "pointer", transition: "color .2s" }, onMouseEnter: (e) => e.target.style.color = "#B8922A", onMouseLeave: (e) => e.target.style.color = "#888" }, l)))), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center" } }, [
      { name: "facebook", href: SOCIAL_LINKS.facebook, path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", fill: "none" },
      { name: "tiktok", href: SOCIAL_LINKS.tiktok, path: "M12 2h4a5 5 0 005 5v4a8.8 8.8 0 01-5-1.6V16a6 6 0 11-6-6c.4 0 .7 0 1 .1v4a2 2 0 102 1.9V2z", fill: "currentColor" },
      { name: "instagram", href: SOCIAL_LINKS.instagram, path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11A5 5 0 0122.5 12v0a5 5 0 01-5 5h-11a5 5 0 01-5-5v0a5 5 0 015-5z", fill: "none" },
      { name: "linkedin", href: SOCIAL_LINKS.linkedin, path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 100 4 2 2 0 000-4z", fill: "currentColor" },
      { name: "youtube", href: SOCIAL_LINKS.youtube, path: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z", fill: "currentColor" }
    ].map((social) => /* @__PURE__ */ import_react.default.createElement(
      "a",
      {
        key: social.name,
        href: social.href,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": social.name,
        style: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#251737",
          color: "#fff",
          textDecoration: "none",
          transition: "transform 0.2s, background 0.2s, color 0.2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.background = "#B8922A";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = "#251737";
        }
      },
      social.hasDot && /* @__PURE__ */ import_react.default.createElement("span", { style: {
        position: "absolute",
        top: 0,
        right: "8px",
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "#FF3B30",
        zIndex: 10
      } }),
      /* @__PURE__ */ import_react.default.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: social.fill, stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: social.path }))
    )))));
  }
  function ScratchCard({ code, onReveal }) {
    const canvasRef = import_react.default.useRef(null);
    const [isRevealed, setIsRevealed] = import_react.default.useState(false);
    const [prizeValue, setPrizeValue] = import_react.default.useState(code || "KHADLAJ10");
    import_react.default.useEffect(() => {
      const canvasElement = canvasRef.current;
      if (!canvasElement || isRevealed) return;
      const canvasContext = canvasElement.getContext("2d");
      const width = canvasElement.width;
      const height = canvasElement.height;
      let isDragging = false;
      const initializeCanvas = () => {
        const baseGradient = canvasContext.createLinearGradient(0, 0, width, height);
        baseGradient.addColorStop(0, "#C59B27");
        baseGradient.addColorStop(0.3, "#F3E5AB");
        baseGradient.addColorStop(0.5, "#D4AF37");
        baseGradient.addColorStop(0.7, "#FFF");
        baseGradient.addColorStop(1, "#A67C00");
        canvasContext.fillStyle = baseGradient;
        canvasContext.fillRect(0, 0, width, height);
        const sheen = canvasContext.createLinearGradient(0, height, width, 0);
        sheen.addColorStop(0, "rgba(255,255,255,0)");
        sheen.addColorStop(0.45, "rgba(255,255,255,0)");
        sheen.addColorStop(0.5, "rgba(255,255,255,0.6)");
        sheen.addColorStop(0.55, "rgba(255,255,255,0)");
        sheen.addColorStop(1, "rgba(255,255,255,0)");
        canvasContext.fillStyle = sheen;
        canvasContext.fillRect(0, 0, width, height);
        canvasContext.strokeStyle = "rgba(166, 124, 0, 0.4)";
        canvasContext.lineWidth = 1;
        canvasContext.strokeRect(6, 6, width - 12, height - 12);
        canvasContext.strokeStyle = "rgba(255, 255, 255, 0.4)";
        canvasContext.strokeRect(7, 7, width - 14, height - 14);
        canvasContext.font = "600 16px 'Cinzel', 'Trajan Pro', serif";
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "middle";
        canvasContext.letterSpacing = "2px";
        canvasContext.fillStyle = "#251737";
        canvasContext.fillText("SCRATCH TO REVEAL", width / 2, height / 2);
      };
      const scratch = (x, y) => {
        canvasContext.globalCompositeOperation = "destination-out";
        canvasContext.beginPath();
        canvasContext.arc(x, y, 20, 0, 2 * Math.PI);
        canvasContext.fill();
      };
      const getMouseCoordinates = (event) => {
        const rect = canvasElement.getBoundingClientRect();
        const clientX = event.touches && event.touches.length > 0 ? event.touches[0].pageX : event.pageX;
        const clientY = event.touches && event.touches.length > 0 ? event.touches[0].pageY : event.pageY;
        const x = (clientX || 0) - (rect.left + window.scrollX);
        const y = (clientY || 0) - (rect.top + window.scrollY);
        return {
          x: x * (canvasElement.width / rect.width),
          y: y * (canvasElement.height / rect.height)
        };
      };
      const checkReveal = () => {
        if (isRevealed) return;
        const imageData = canvasContext.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        let transparentCount = 0;
        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] < 128) transparentCount++;
        }
        const percent = transparentCount / (pixels.length / 4);
        if (percent > 0.35) {
          setIsRevealed(true);
          if (onReveal) onReveal();
        }
      };
      const handleMouseDown = (event) => {
        isDragging = true;
        const { x, y } = getMouseCoordinates(event);
        scratch(x, y);
      };
      const handleMouseMove = (event) => {
        if (isDragging) {
          event.preventDefault();
          const { x, y } = getMouseCoordinates(event);
          scratch(x, y);
        }
      };
      const handleMouseUp = () => {
        if (isDragging) {
          isDragging = false;
          checkReveal();
        }
      };
      const handleMouseLeave = () => {
        if (isDragging) {
          isDragging = false;
          checkReveal();
        }
      };
      const isTouchDevice = "ontouchstart" in window;
      canvasElement.addEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown, { passive: !isTouchDevice });
      canvasElement.addEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove, { passive: false });
      canvasElement.addEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
      canvasElement.addEventListener("mouseleave", handleMouseLeave);
      initializeCanvas();
      return () => {
        canvasElement.removeEventListener(isTouchDevice ? "touchstart" : "mousedown", handleMouseDown);
        canvasElement.removeEventListener(isTouchDevice ? "touchmove" : "mousemove", handleMouseMove);
        canvasElement.removeEventListener(isTouchDevice ? "touchend" : "mouseup", handleMouseUp);
        canvasElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [isRevealed]);
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "scratch-hover", style: { position: "relative", width: "100%", maxWidth: 320, height: 100, margin: "0 auto", borderRadius: 8, overflow: "hidden", border: "2px solid #F3E5AB", background: "#111", boxShadow: "0 0 25px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.2)" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle, #251737 0%, #0a0a0a 100%)", zIndex: 1 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, opacity: 0.12, background: `url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="%23D4AF37"/></svg>') repeat` } }), /* @__PURE__ */ import_react.default.createElement("span", { style: { fontSize: 9, letterSpacing: 4, color: "#D4AF37", textTransform: "uppercase", marginBottom: 4, fontWeight: 600, opacity: 0.9, position: "relative", zIndex: 2 } }, "Your Exclusive Gift"), /* @__PURE__ */ import_react.default.createElement("p", { className: "scratch-text", style: {
      fontWeight: 900,
      margin: 0,
      background: "linear-gradient(to right, #D4AF37, #FFF, #F3E5AB, #D4AF37)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "6px",
      fontSize: "28px",
      filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.5))",
      position: "relative",
      zIndex: 2
    } }, prizeValue)), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 8, opacity: isRevealed ? 0 : 1, transition: "opacity 0.6s ease", zIndex: 10 } }, /* @__PURE__ */ import_react.default.createElement("div", { className: "shimmer-effect" })), /* @__PURE__ */ import_react.default.createElement(
      "canvas",
      {
        ref: canvasRef,
        width: 320,
        height: 100,
        style: {
          position: "absolute",
          inset: 0,
          cursor: 'url("https://media.geeksforgeeks.org/wp-content/uploads/20231030101751/bx-eraser-icon.png"), auto',
          width: "100%",
          height: "100%",
          opacity: isRevealed ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: isRevealed ? "none" : "auto",
          zIndex: 10,
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTouchCallout: "none",
          WebkitTapHighlightColor: "transparent"
        }
      }
    ));
  }
  function App() {
    const [activeCountry, setActiveCountry] = import_react.default.useState(COUNTRIES[0]);
    const formatPrice = (price) => `${activeCountry.currency} ${(price * activeCountry.rate).toFixed(2)}`;
    const [page, setPage] = (0, import_react.useState)("home");
    const [collectionCategory, setCollectionCategory] = (0, import_react.useState)("Khadlaj");
    const [cartItems, setCartItems] = (0, import_react.useState)([]);
    const [viewProduct, setViewProduct] = (0, import_react.useState)(null);
    const [showPopup, setShowPopup] = (0, import_react.useState)(false);
    const [popupEmail, setPopupEmail] = (0, import_react.useState)("");
    const [popupState, setPopupState] = (0, import_react.useState)("scratch");
    const [popupDone, setPopupDone] = (0, import_react.useState)(false);
    const [tiltStyle, setTiltStyle] = (0, import_react.useState)({});
    const handleTilt = (e) => {
      if (window.innerWidth <= 600) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out"
      });
    };
    const resetTilt = () => {
      setTiltStyle({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.5s ease-out"
      });
    };
    const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
    const addToCart = (product, qty = 1) => {
      if (!product) return;
      const safeQty = Math.max(1, Number(qty) || 1);
      setCartItems((items) => {
        const exists = items.find((item) => item.id === product.id);
        if (exists) {
          return items.map((item) => item.id === product.id ? { ...item, qty: item.qty + safeQty } : item);
        }
        return [...items, { ...product, qty: safeQty }];
      });
    };
    const updateCartQty = (id, qty) => {
      setCartItems(
        (items) => items.map((item) => item.id === id ? { ...item, qty: Math.max(0, qty) } : item).filter((item) => item.qty > 0)
      );
    };
    const removeFromCart = (id) => setCartItems((items) => items.filter((item) => item.id !== id));
    const clearCart = () => setCartItems([]);
    const [chatOpen, setChatOpen] = (0, import_react.useState)(false);
    const chatMessagesRef = (0, import_react.useRef)(null);
    const [messages, setMessages] = (0, import_react.useState)([
      { role: "assistant", content: "Welcome to Khadlaj Perfumes. I can help with collections, products, shipping, discounts, or any page on the website." }
    ]);
    const [inputVal, setInputVal] = (0, import_react.useState)("");
    const [loading, setLoading] = (0, import_react.useState)(false);
    const handleSendMessage = async () => {
      if (!inputVal.trim() || loading) return;
      const userMsg = { role: "user", content: inputVal };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInputVal("");
      setLoading(true);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messages: nextMessages })
        });
        const data = await response.json();
        if (response.ok && data.reply) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } else {
          setMessages((prev) => [...prev, { role: "assistant", content: data.error || "I am unable to answer right now. Please try again in a moment." }]);
        }
      } catch (err) {
        console.error(err);
        setMessages((prev) => [...prev, { role: "assistant", content: "I am unable to connect right now. Please check your network connection and try again." }]);
      } finally {
        setLoading(false);
      }
    };
    (0, import_react.useEffect)(() => {
      const t = setTimeout(() => setShowPopup(true), 6e3);
      return () => clearTimeout(t);
    }, []);
    (0, import_react.useEffect)(() => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }, [messages, loading]);
    (0, import_react.useEffect)(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);
    const renderPage = () => {
      switch (page) {
        case "home":
          return /* @__PURE__ */ import_react.default.createElement(HomePage, { setPage, addToCart, setViewProduct });
        case "collections":
          return /* @__PURE__ */ import_react.default.createElement(CollectionsPage, { addToCart, setViewProduct, setPage, collectionCategory });
        case "lafede":
          return /* @__PURE__ */ import_react.default.createElement(LaFedePage, { addToCart, setViewProduct, setPage });
        case "product":
          return viewProduct ? /* @__PURE__ */ import_react.default.createElement(ProductPage, { product: viewProduct, addToCart, setPage, setViewProduct }) : /* @__PURE__ */ import_react.default.createElement(CollectionsPage, { addToCart, setViewProduct, setPage, collectionCategory });
        case "gifts":
          return /* @__PURE__ */ import_react.default.createElement(GiftsPage, { addToCart, setViewProduct, setPage });
        case "cart":
          return /* @__PURE__ */ import_react.default.createElement(CartPage, { cartItems, updateCartQty, removeFromCart, setPage, setViewProduct });
        case "checkout":
          return /* @__PURE__ */ import_react.default.createElement(CheckoutPage, { cartItems, setPage, clearCart });
        case "story":
          return /* @__PURE__ */ import_react.default.createElement(StoryPage, null);
        case "signup":
          return /* @__PURE__ */ import_react.default.createElement(SignupPage, null);
        case "contact":
          return /* @__PURE__ */ import_react.default.createElement(ContactPage, null);
        default:
          return /* @__PURE__ */ import_react.default.createElement(HomePage, { setPage, addToCart, setViewProduct });
      }
    };
    return /* @__PURE__ */ import_react.default.createElement(CountryContext.Provider, { value: { activeCountry, setActiveCountry } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { fontFamily: "'Montserrat',sans-serif", background: "#fff", color: "#251737", minHeight: "100vh" } }, /* @__PURE__ */ import_react.default.createElement("style", null, GLOBAL_CSS + `
@keyframes spin { 100% { transform: rotate(360deg); } }`), /* @__PURE__ */ import_react.default.createElement(Navbar, { page, setPage, cartCount, setCollectionCategory, collectionCategory, activeCountry }), /* @__PURE__ */ import_react.default.createElement("main", null, renderPage()), /* @__PURE__ */ import_react.default.createElement(Footer, { setPage }), page === "home" && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "pulse",
        onClick: () => setPage("collections"),
        style: {
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 200,
          background: "#251737",
          color: "#fff",
          width: 46,
          height: 46,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 28px rgba(0,0,0,.25)",
          fontSize: 18,
          transition: "background .2s,transform .2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#B8922A";
          e.currentTarget.style.transform = "scale(1.06)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "#251737";
          e.currentTarget.style.transform = "scale(1)";
        },
        title: "Shop Now"
      },
      "\u{1F6CD}"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setChatOpen(!chatOpen),
        style: {
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 200,
          background: "#251737",
          color: "#fff",
          width: 46,
          height: 46,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 28px rgba(0,0,0,.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background .2s,transform .2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = "#B8922A";
          e.currentTarget.style.transform = "scale(1.06)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "#251737";
          e.currentTarget.style.transform = "scale(1)";
        },
        title: "Chat with Us"
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }))
    ), chatOpen && /* @__PURE__ */ import_react.default.createElement("div", { style: {
      position: "fixed",
      bottom: 84,
      left: 24,
      width: 320,
      height: 420,
      zIndex: 200,
      background: "rgba(255, 255, 255, 0.98)",
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: 12,
      boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      animation: "fadeUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
      fontFamily: "'Montserrat',sans-serif"
    } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { background: "#251737", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: "#2ec4b6" } }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, letterSpacing: 2, color: "#B8922A", textTransform: "uppercase", margin: 0, fontWeight: 600 } }, "Scent Assistant"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, color: "rgba(255,255,255,0.7)", margin: 0 } }, "Khadlaj Perfumes"))), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setChatOpen(false), style: { background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", padding: 0 } }, "\xD7")), /* @__PURE__ */ import_react.default.createElement("div", { ref: chatMessagesRef, style: { flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, background: "#FCFBFA" }, className: "chat-messages" }, messages.map((msg, i) => /* @__PURE__ */ import_react.default.createElement("div", { key: i, style: {
      alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
      maxWidth: "80%",
      background: msg.role === "user" ? "#000" : "#fff",
      color: msg.role === "user" ? "#fff" : "#111",
      padding: "10px 14px",
      borderRadius: msg.role === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      border: msg.role === "user" ? "none" : "1px solid #E8E4DC"
    } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 12, margin: 0, lineHeight: 1.45, whiteSpace: "pre-line" } }, msg.content))), loading && /* @__PURE__ */ import_react.default.createElement("div", { style: { alignSelf: "flex-start", maxWidth: "80%", background: "#fff", padding: "10px 14px", borderRadius: "12px 12px 12px 0", border: "1px solid #E8E4DC", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, color: "#888", margin: 0 } }, "Assistant is writing..."))), /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: "14px 16px", borderTop: "1px solid #E8E4DC", background: "#fff", display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        placeholder: "Ask about our perfumes...",
        value: inputVal,
        onChange: (e) => setInputVal(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") handleSendMessage();
        },
        style: {
          flex: 1,
          border: "1px solid #E8E4DC",
          padding: "10px 14px",
          fontSize: 12,
          outline: "none",
          borderRadius: 6,
          fontFamily: "'Montserrat',sans-serif"
        }
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: handleSendMessage,
        style: {
          background: "#251737",
          border: "none",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase"
        }
      },
      "Send"
    ))), showPopup && !popupDone && /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: "popup-overlay",
        onClick: () => setShowPopup(false)
      },
      /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: "popup-in",
          onClick: (e) => e.stopPropagation(),
          onMouseMove: handleTilt,
          onMouseLeave: resetTilt,
          style: {
            background: "linear-gradient(135deg, #251737 0%, #1A0B22 100%)",
            maxWidth: 440,
            width: "90%",
            overflow: "visible",
            boxShadow: "0 32px 80px rgba(0,0,0,.4)",
            position: "relative",
            borderRadius: 12,
            border: "1px solid rgba(212,175,55,.45)",
            padding: "40px 30px",
            boxSizing: "border-box",
            ...tiltStyle
          }
        },
        /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setShowPopup(false), style: { position: "absolute", top: 12, right: 12, background: "rgba(212,175,55,0.1)", border: "none", width: 30, height: 30, borderRadius: "50%", fontSize: 18, cursor: "pointer", color: "#D4AF37", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }, onMouseEnter: (e) => {
          e.currentTarget.style.background = "rgba(212,175,55,0.2)";
        }, onMouseLeave: (e) => {
          e.currentTarget.style.background = "rgba(212,175,55,0.1)";
        } }, "\xD7"),
        /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", flexDirection: "column", justifyContent: "center" } }, popupState === "scratch" ? /* @__PURE__ */ import_react.default.createElement("div", { style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 15, letterSpacing: 5, color: "#D4AF37", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 14, fontWeight: 700 } }, "Exclusive Privilege"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "disp mobile-text", style: { fontSize: 26, fontWeight: 400, color: "#F9F4EB", marginBottom: 28, lineHeight: 1.15 } }, "Your Private Invitation"), /* @__PURE__ */ import_react.default.createElement(ScratchCard, { code: "KHADLAJ10", onReveal: () => {
          setTimeout(() => setPopupState("revealed"), 800);
        } }), /* @__PURE__ */ import_react.default.createElement(
          "button",
          {
            onClick: () => setShowPopup(false),
            style: { background: "none", border: "none", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", textAlign: "center", marginTop: 24, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", borderBottom: "1px solid transparent", transition: "all 0.3s", paddingBottom: 2 },
            onMouseEnter: (e) => {
              e.currentTarget.style.color = "#D4AF37";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.4)";
            }
          },
          "Decline Offer"
        )) : /* @__PURE__ */ import_react.default.createElement("div", { className: "glow-up", style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 15, letterSpacing: 5, color: "#D4AF37", textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif", marginBottom: 12, fontWeight: 700 } }, "Reward Claimed"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "disp mobile-text", style: { fontSize: 26, fontWeight: 400, color: "#F9F4EB", marginBottom: 12, lineHeight: 1.15 } }, "VIP Privilege Unlocked"), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 11, color: "rgba(249,244,235,0.7)", lineHeight: 1.6, fontFamily: "'Montserrat',sans-serif", marginBottom: 30 } }, "Your exclusive 10% discount is ready. Apply this code at checkout."), /* @__PURE__ */ import_react.default.createElement("div", { style: {
          position: "relative",
          padding: "3px",
          background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #A67C00 100%)",
          borderRadius: 16,
          marginBottom: 30,
          boxShadow: "0 15px 40px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.2)"
        } }, /* @__PURE__ */ import_react.default.createElement("div", { style: {
          background: "linear-gradient(135deg, #1A0B22 0%, #0d0412 100%)",
          borderRadius: 14,
          padding: "20px 36px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.05)"
        } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)", backgroundSize: "12px 12px" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "conic-gradient(from 90deg at 50% 50%, rgba(212,175,55,0) 0%, rgba(212,175,55,0.1) 50%, rgba(212,175,55,0) 100%)", animation: "spin 10s linear infinite" } }), /* @__PURE__ */ import_react.default.createElement("p", { style: { fontSize: 9, letterSpacing: 5, color: "#F3E5AB", textTransform: "uppercase", marginBottom: 6, zIndex: 2, position: "relative", opacity: 0.8 } }, "Discount Code"), /* @__PURE__ */ import_react.default.createElement("p", { style: {
          fontSize: 30,
          fontWeight: 900,
          margin: 0,
          background: "linear-gradient(to bottom, #FFF 0%, #F3E5AB 50%, #D4AF37 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: 8,
          filter: "drop-shadow(0 4px 15px rgba(212,175,55,0.5))",
          position: "relative",
          zIndex: 2,
          fontFamily: "'Cinzel', serif"
        } }, "KHADLAJ10"))), /* @__PURE__ */ import_react.default.createElement(
          "button",
          {
            onClick: () => {
              navigator.clipboard.writeText("KHADLAJ10");
              setPopupDone(true);
              setShowPopup(false);
            },
            style: {
              width: "100%",
              background: "linear-gradient(90deg, #A67C00 0%, #F3E5AB 50%, #A67C00 100%)",
              backgroundSize: "200% auto",
              color: "#1A0B22",
              border: "none",
              padding: "18px",
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Montserrat',sans-serif",
              fontWeight: 800,
              transition: "all 0.5s ease",
              borderRadius: 6,
              boxShadow: "0 10px 30px rgba(212,175,55,0.4)"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundPosition = "right center";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(212,175,55,0.6)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundPosition = "left center";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(212,175,55,0.4)";
            }
          },
          "Copy Code & Shop Now"
        )))
      )
    )));
  }

  // main.jsx
  var rootEl = document.getElementById("root");
  if (!rootEl) {
    throw new Error("Missing #root element");
  }
  (0, import_client.createRoot)(rootEl).render(/* @__PURE__ */ import_react2.default.createElement(App, null));
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("loaded");
      setTimeout(() => preloader.remove(), 1e3);
    }
  }, 1e3);
})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
