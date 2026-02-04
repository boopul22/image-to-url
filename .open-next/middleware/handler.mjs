
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.14";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/@opennextjs/aws/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = { exports: {} }, a = true;
        try {
          e[o](i, i.exports, t), a = false;
        } finally {
          a && delete r[o];
        }
        return i.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, i) => {
          if (o) {
            i = i || 0;
            for (var a = e2.length; a > 0 && e2[a - 1][2] > i; a--) e2[a] = e2[a - 1];
            e2[a] = [o, n, i];
            return;
          }
          for (var l = 1 / 0, a = 0; a < e2.length; a++) {
            for (var [o, n, i] = e2[a], u = true, f = 0; f < o.length; f++) (false & i || l >= i) && Object.keys(t.O).every((e3) => t.O[e3](o[f])) ? o.splice(f--, 1) : (u = false, i < l && (l = i));
            if (u) {
              e2.splice(a--, 1);
              var s = n();
              void 0 !== s && (r2 = s);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, t.d = (e2, r2) => {
        for (var o in r2) t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window) return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, i, [a, l, u] = o2, f = 0;
          if (a.some((r4) => 0 !== e2[r4])) {
            for (n in l) t.o(l, n) && (t.m[n] = l[n]);
            if (u) var s = u(t);
          }
          for (r3 && r3(o2); f < a.length; f++) i = a[f], t.o(e2, i) && e2[i] && e2[i][0](), e2[i] = 0;
          return t.O(s);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[751], { 521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 896: (e, t) => {
      "use strict";
      t.q = function(e2, t2) {
        if ("string" != typeof e2) throw TypeError("argument str must be a string");
        var r2 = {}, i2 = e2.length;
        if (i2 < 2) return r2;
        var n2 = t2 && t2.decode || c, a2 = 0, o2 = 0, h = 0;
        do {
          if (-1 === (o2 = e2.indexOf("=", a2))) break;
          if (-1 === (h = e2.indexOf(";", a2))) h = i2;
          else if (o2 > h) {
            a2 = e2.lastIndexOf(";", o2 - 1) + 1;
            continue;
          }
          var d = l(e2, a2, o2), p = u(e2, o2, d), f = e2.slice(d, p);
          if (!s.call(r2, f)) {
            var g = l(e2, o2 + 1, h), m = u(e2, h, g);
            34 === e2.charCodeAt(g) && 34 === e2.charCodeAt(m - 1) && (g++, m--);
            var w = e2.slice(g, m);
            r2[f] = function(e3, t3) {
              try {
                return t3(e3);
              } catch (t4) {
                return e3;
              }
            }(w, n2);
          }
          a2 = h + 1;
        } while (a2 < i2);
        return r2;
      }, t.l = function(e2, t2, s2) {
        var l2 = s2 && s2.encode || encodeURIComponent;
        if ("function" != typeof l2) throw TypeError("option encode is invalid");
        if (!i.test(e2)) throw TypeError("argument name is invalid");
        var u2 = l2(t2);
        if (!n.test(u2)) throw TypeError("argument val is invalid");
        var c2 = e2 + "=" + u2;
        if (!s2) return c2;
        if (null != s2.maxAge) {
          var h = Math.floor(s2.maxAge);
          if (!isFinite(h)) throw TypeError("option maxAge is invalid");
          c2 += "; Max-Age=" + h;
        }
        if (s2.domain) {
          if (!a.test(s2.domain)) throw TypeError("option domain is invalid");
          c2 += "; Domain=" + s2.domain;
        }
        if (s2.path) {
          if (!o.test(s2.path)) throw TypeError("option path is invalid");
          c2 += "; Path=" + s2.path;
        }
        if (s2.expires) {
          var d = s2.expires;
          if ("[object Date]" !== r.call(d) || isNaN(d.valueOf())) throw TypeError("option expires is invalid");
          c2 += "; Expires=" + d.toUTCString();
        }
        if (s2.httpOnly && (c2 += "; HttpOnly"), s2.secure && (c2 += "; Secure"), s2.partitioned && (c2 += "; Partitioned"), s2.priority) switch ("string" == typeof s2.priority ? s2.priority.toLowerCase() : s2.priority) {
          case "low":
            c2 += "; Priority=Low";
            break;
          case "medium":
            c2 += "; Priority=Medium";
            break;
          case "high":
            c2 += "; Priority=High";
            break;
          default:
            throw TypeError("option priority is invalid");
        }
        if (s2.sameSite) switch ("string" == typeof s2.sameSite ? s2.sameSite.toLowerCase() : s2.sameSite) {
          case true:
          case "strict":
            c2 += "; SameSite=Strict";
            break;
          case "lax":
            c2 += "; SameSite=Lax";
            break;
          case "none":
            c2 += "; SameSite=None";
            break;
          default:
            throw TypeError("option sameSite is invalid");
        }
        return c2;
      };
      var r = Object.prototype.toString, s = Object.prototype.hasOwnProperty, i = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, n = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, a = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/;
      function l(e2, t2, r2) {
        do {
          var s2 = e2.charCodeAt(t2);
          if (32 !== s2 && 9 !== s2) return t2;
        } while (++t2 < r2);
        return r2;
      }
      function u(e2, t2, r2) {
        for (; t2 > r2; ) {
          var s2 = e2.charCodeAt(--t2);
          if (32 !== s2 && 9 !== s2) return t2 + 1;
        }
        return r2;
      }
      function c(e2) {
        return -1 !== e2.indexOf("%") ? decodeURIComponent(e2) : e2;
      }
    }, 555: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, n = {};
      function a(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), s2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? s2 : `${s2}; ${r2.join("; ")}`;
      }
      function o(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [s2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(s2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2) return;
        let [[s2, i2], ...n2] = o(e2), { domain: a2, expires: l2, httponly: h2, maxage: d2, path: p, samesite: f, secure: g, partitioned: m, priority: w } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3) e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: s2, value: decodeURIComponent(i2), domain: a2, ...l2 && { expires: new Date(l2) }, ...h2 && { httpOnly: true }, ..."string" == typeof d2 && { maxAge: Number(d2) }, path: p, ...f && { sameSite: u.includes(t2 = (t2 = f).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...w && { priority: c.includes(r2 = (r2 = w).toLowerCase()) ? r2 : void 0 }, ...m && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var s2 in r2) t(e2, s2, { get: r2[s2], enumerable: true });
      })(n, { RequestCookies: () => h, ResponseCookies: () => d, parseCookie: () => o, parseSetCookie: () => l, stringifyCookie: () => a }), e.exports = ((e2, n2, a2, o2) => {
        if (n2 && "object" == typeof n2 || "function" == typeof n2) for (let l2 of s(n2)) i.call(e2, l2) || l2 === a2 || t(e2, l2, { get: () => n2[l2], enumerable: !(o2 = r(n2, l2)) || o2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), n);
      var u = ["strict", "lax", "none"], c = ["low", "medium", "high"], h = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of o(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === s2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, s2 = this._parsed;
          return s2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(s2).map(([e3, t3]) => a(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => a(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, d = class {
        constructor(e2) {
          var t2, r2, s2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (s2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? s2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4) return [];
            var t3, r3, s3, i3, n2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, n2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (s3 = o2, o2 += 1, l2(), i3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (n2 = true, o2 = i3, a2.push(e4.substring(t3, s3)), t3 = o2) : o2 = s3 + 1;
              } else o2 += 1;
              (!n2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === s2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, s2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...s2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = a(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(a).join("; ");
        }
      };
    }, 777: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let s2 = r2(223), i2 = r2(172), n2 = r2(930), a = "context", o = new s2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(a, e3, n2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...s3) {
              return this._getContextManager().with(e3, t4, r3, ...s3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(a) || o;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(a, n2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let s2 = r2(56), i2 = r2(912), n2 = r2(957), a = r2(172);
          class o {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, a.getGlobal)("diag");
                  if (r3) return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: n2.DiagLogLevel.INFO }) => {
                var s3, o2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (s3 = e5.stack) && void 0 !== s3 ? s3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let u = (0, a.getGlobal)("diag"), c = (0, i2.createLogLevelDiagLogger)(null !== (o2 = r3.logLevel) && void 0 !== o2 ? o2 : n2.DiagLogLevel.INFO, e4);
                if (u && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  u.warn(`Current logger will be overwritten from ${e5}`), c.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a.registerGlobal)("diag", c, t4, true);
              }, t4.disable = () => {
                (0, a.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new s2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
          }
          t3.DiagAPI = o;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let s2 = r2(660), i2 = r2(172), n2 = r2(930), a = "metrics";
          class o {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new o()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(a, e3, n2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(a) || s2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(a, n2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = o;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let s2 = r2(172), i2 = r2(874), n2 = r2(194), a = r2(277), o = r2(369), l = r2(930), u = "propagation", c = new i2.NoopTextMapPropagator();
          class h {
            constructor() {
              this.createBaggage = o.createBaggage, this.getBaggage = a.getBaggage, this.getActiveBaggage = a.getActiveBaggage, this.setBaggage = a.setBaggage, this.deleteBaggage = a.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, s2.registerGlobal)(u, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = n2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = n2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, s2.unregisterGlobal)(u, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, s2.getGlobal)(u) || c;
            }
          }
          t3.PropagationAPI = h;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let s2 = r2(172), i2 = r2(846), n2 = r2(139), a = r2(607), o = r2(930), l = "trace";
          class u {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = n2.wrapSpanContext, this.isSpanContextValid = n2.isSpanContextValid, this.deleteSpan = a.deleteSpan, this.getSpan = a.getSpan, this.getActiveSpan = a.getActiveSpan, this.getSpanContext = a.getSpanContext, this.setSpan = a.setSpan, this.setSpanContext = a.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, s2.registerGlobal)(l, this._proxyTracerProvider, o.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, s2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, s2.unregisterGlobal)(l, o.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = u;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let s2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function n2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = n2, t3.getActiveBaggage = function() {
            return n2(s2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4) return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let s2 = new r2(this._entries);
              return s2._entries.set(e3, t4), s2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3) t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let s2 = r2(930), i2 = r2(993), n2 = r2(830), a = s2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: n2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let s2 = r2(491);
          t3.context = s2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let s2 = r2(780);
          class i2 {
            active() {
              return s2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...s3) {
              return t4.call(r3, ...s3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, s2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, s2), i2;
              }, t4.deleteValue = (e4) => {
                let s2 = new r2(t4._currentContext);
                return s2._currentContext.delete(e4), s2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let s2 = r2(930);
          t3.diag = s2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let s2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          }
          function n2(e3, t4, r3) {
            let i3 = (0, s2.getGlobal)("diag");
            if (i3) return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class s2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++) this[r2[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t4) {
                  if (console) {
                    let r3 = console[e4];
                    if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3) return r3.apply(console, t4);
                  }
                };
              }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = s2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let s2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, s3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= s3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < s2.DiagLogLevel.NONE ? e3 = s2.DiagLogLevel.NONE : e3 > s2.DiagLogLevel.ALL && (e3 = s2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", s2.DiagLogLevel.ERROR), warn: r3("warn", s2.DiagLogLevel.WARN), info: r3("info", s2.DiagLogLevel.INFO), debug: r3("debug", s2.DiagLogLevel.DEBUG), verbose: r3("verbose", s2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let s2 = r2(200), i2 = r2(521), n2 = r2(130), a = i2.VERSION.split(".")[0], o = Symbol.for(`opentelemetry.js.api.${a}`), l = s2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, s3 = false) {
            var n3;
            let a2 = l[o] = null !== (n3 = l[o]) && void 0 !== n3 ? n3 : { version: i2.VERSION };
            if (!s3 && a2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (a2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${a2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return a2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let s3 = null === (t4 = l[o]) || void 0 === t4 ? void 0 : t4.version;
            if (s3 && (0, n2.isCompatible)(s3)) return null === (r3 = l[o]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = l[o];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let s2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function n2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), s3 = e3.match(i2);
            if (!s3) return () => false;
            let n3 = { major: +s3[1], minor: +s3[2], patch: +s3[3], prerelease: s3[4] };
            if (null != n3.prerelease) return function(t5) {
              return t5 === e3;
            };
            function a(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4)) return true;
              if (r3.has(e4)) return false;
              let s4 = e4.match(i2);
              if (!s4) return a(e4);
              let o = { major: +s4[1], minor: +s4[2], patch: +s4[3], prerelease: s4[4] };
              return null != o.prerelease || n3.major !== o.major ? a(e4) : 0 === n3.major ? n3.minor === o.minor && n3.patch <= o.patch ? (t4.add(e4), true) : a(e4) : n3.minor <= o.minor ? (t4.add(e4), true) : a(e4);
            };
          }
          t3._makeCompatibilityCheck = n2, t3.isCompatible = n2(s2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let s2 = r2(653);
          t3.metrics = s2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class s2 {
          }
          t3.NoopMetric = s2;
          class i2 extends s2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class n2 extends s2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = n2;
          class a extends s2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = a;
          class o {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = o;
          class l extends o {
          }
          t3.NoopObservableCounterMetric = l;
          class u extends o {
          }
          t3.NoopObservableGaugeMetric = u;
          class c extends o {
          }
          t3.NoopObservableUpDownCounterMetric = c, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new a(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new n2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new u(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let s2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return s2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), e3[s3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || s2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, s3) {
            void 0 === s3 && (s3 = r3), e3[s3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3) "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || s2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let s2 = r2(181);
          t3.propagation = s2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3) return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let s2 = r2(997);
          t3.trace = s2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let s2 = r2(476);
          class i2 {
            constructor(e3 = s2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let s2 = r2(491), i2 = r2(607), n2 = r2(403), a = r2(139), o = s2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = o.active()) {
              if (null == t4 ? void 0 : t4.root) return new n2.NonRecordingSpan();
              let s3 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof s3 && "string" == typeof s3.spanId && "string" == typeof s3.traceId && "number" == typeof s3.traceFlags && (0, a.isSpanContextValid)(s3) ? new n2.NonRecordingSpan(s3) : new n2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, s3) {
              let n3, a2, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (n3 = t4, l2 = r3) : (n3 = t4, a2 = r3, l2 = s3);
              let u = null != a2 ? a2 : o.active(), c = this.startSpan(e3, n3, u), h = (0, i2.setSpan)(u, c);
              return o.with(h, l2, void 0, c);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let s2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new s2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let s2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, s3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = s3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, s3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : s2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let s2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class n2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null !== (i3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== i3 ? i3 : new s2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var s3;
              return null === (s3 = this._delegate) || void 0 === s3 ? void 0 : s3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = n2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let s2 = r2(780), i2 = r2(403), n2 = r2(491), a = (0, s2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o(e3) {
            return e3.getValue(a) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(a, t4);
          }
          t3.getSpan = o, t3.getActiveSpan = function() {
            return o(n2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(a);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = o(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let s2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let n2 = r3.slice(0, i3), a = r3.slice(i3 + 1, t4.length);
                  (0, s2.validateKey)(n2) && (0, s2.validateValue)(a) && e4.set(n2, a);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", s2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, n2 = RegExp(`^(?:${s2}|${i2})$`), a = /^[ -~]{0,255}[!-~]$/, o = /,|=/;
          t3.validateKey = function(e3) {
            return n2.test(e3);
          }, t3.validateValue = function(e3) {
            return a.test(e3) && !o.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let s2 = r2(325);
          t3.createTraceState = function(e3) {
            return new s2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let s2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: s2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let s2 = r2(476), i2 = r2(403), n2 = /^([0-9a-f]{32})$/i, a = /^[0-9a-f]{16}$/i;
          function o(e3) {
            return n2.test(e3) && e3 !== s2.INVALID_TRACEID;
          }
          function l(e3) {
            return a.test(e3) && e3 !== s2.INVALID_SPANID;
          }
          t3.isValidTraceId = o, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return o(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, s = {};
        function i(e2) {
          var r2 = s[e2];
          if (void 0 !== r2) return r2.exports;
          var n2 = s[e2] = { exports: {} }, a = true;
          try {
            t2[e2].call(n2.exports, n2, n2.exports, i), a = false;
          } finally {
            a && delete s[e2];
          }
          return n2.exports;
        }
        i.ab = "//";
        var n = {};
        (() => {
          Object.defineProperty(n, "__esModule", { value: true }), n.trace = n.propagation = n.metrics = n.diag = n.context = n.INVALID_SPAN_CONTEXT = n.INVALID_TRACEID = n.INVALID_SPANID = n.isValidSpanId = n.isValidTraceId = n.isSpanContextValid = n.createTraceState = n.TraceFlags = n.SpanStatusCode = n.SpanKind = n.SamplingDecision = n.ProxyTracerProvider = n.ProxyTracer = n.defaultTextMapSetter = n.defaultTextMapGetter = n.ValueType = n.createNoopMeter = n.DiagLogLevel = n.DiagConsoleLogger = n.ROOT_CONTEXT = n.createContextKey = n.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(n, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(n, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(n, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(n, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var s2 = i(957);
          Object.defineProperty(n, "DiagLogLevel", { enumerable: true, get: function() {
            return s2.DiagLogLevel;
          } });
          var a = i(102);
          Object.defineProperty(n, "createNoopMeter", { enumerable: true, get: function() {
            return a.createNoopMeter;
          } });
          var o = i(901);
          Object.defineProperty(n, "ValueType", { enumerable: true, get: function() {
            return o.ValueType;
          } });
          var l = i(194);
          Object.defineProperty(n, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(n, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var u = i(125);
          Object.defineProperty(n, "ProxyTracer", { enumerable: true, get: function() {
            return u.ProxyTracer;
          } });
          var c = i(846);
          Object.defineProperty(n, "ProxyTracerProvider", { enumerable: true, get: function() {
            return c.ProxyTracerProvider;
          } });
          var h = i(996);
          Object.defineProperty(n, "SamplingDecision", { enumerable: true, get: function() {
            return h.SamplingDecision;
          } });
          var d = i(357);
          Object.defineProperty(n, "SpanKind", { enumerable: true, get: function() {
            return d.SpanKind;
          } });
          var p = i(847);
          Object.defineProperty(n, "SpanStatusCode", { enumerable: true, get: function() {
            return p.SpanStatusCode;
          } });
          var f = i(475);
          Object.defineProperty(n, "TraceFlags", { enumerable: true, get: function() {
            return f.TraceFlags;
          } });
          var g = i(98);
          Object.defineProperty(n, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(n, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(n, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(n, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var w = i(476);
          Object.defineProperty(n, "INVALID_SPANID", { enumerable: true, get: function() {
            return w.INVALID_SPANID;
          } }), Object.defineProperty(n, "INVALID_TRACEID", { enumerable: true, get: function() {
            return w.INVALID_TRACEID;
          } }), Object.defineProperty(n, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return w.INVALID_SPAN_CONTEXT;
          } });
          let v = i(67);
          Object.defineProperty(n, "context", { enumerable: true, get: function() {
            return v.context;
          } });
          let b = i(506);
          Object.defineProperty(n, "diag", { enumerable: true, get: function() {
            return b.diag;
          } });
          let y = i(886);
          Object.defineProperty(n, "metrics", { enumerable: true, get: function() {
            return y.metrics;
          } });
          let _ = i(939);
          Object.defineProperty(n, "propagation", { enumerable: true, get: function() {
            return _.propagation;
          } });
          let S = i(845);
          Object.defineProperty(n, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), n.default = { context: v.context, diag: b.diag, metrics: y.metrics, propagation: _.propagation, trace: S.trace };
        })(), e.exports = n;
      })();
    }, 503: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2) throw TypeError("argument str must be a string");
            for (var i2 = {}, n = t2.split(s), a = (r2 || {}).decode || e2, o = 0; o < n.length; o++) {
              var l = n[o], u = l.indexOf("=");
              if (!(u < 0)) {
                var c = l.substr(0, u).trim(), h = l.substr(++u, l.length).trim();
                '"' == h[0] && (h = h.slice(1, -1)), void 0 == i2[c] && (i2[c] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(h, a));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, s2) {
            var n = s2 || {}, a = n.encode || r;
            if ("function" != typeof a) throw TypeError("option encode is invalid");
            if (!i.test(e3)) throw TypeError("argument name is invalid");
            var o = a(t2);
            if (o && !i.test(o)) throw TypeError("argument val is invalid");
            var l = e3 + "=" + o;
            if (null != n.maxAge) {
              var u = n.maxAge - 0;
              if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(u);
            }
            if (n.domain) {
              if (!i.test(n.domain)) throw TypeError("option domain is invalid");
              l += "; Domain=" + n.domain;
            }
            if (n.path) {
              if (!i.test(n.path)) throw TypeError("option path is invalid");
              l += "; Path=" + n.path;
            }
            if (n.expires) {
              if ("function" != typeof n.expires.toUTCString) throw TypeError("option expires is invalid");
              l += "; Expires=" + n.expires.toUTCString();
            }
            if (n.httpOnly && (l += "; HttpOnly"), n.secure && (l += "; Secure"), n.sameSite) switch ("string" == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite) {
              case true:
              case "strict":
                l += "; SameSite=Strict";
                break;
              case "lax":
                l += "; SameSite=Lax";
                break;
              case "none":
                l += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, s = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 541: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function s2() {
          }
          function i2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function n(e3, t3, s3, n2, a2) {
            if ("function" != typeof s3) throw TypeError("The listener must be a function");
            var o2 = new i2(s3, n2 || e3, a2), l = r2 ? r2 + t3 : t3;
            return e3._events[l] ? e3._events[l].fn ? e3._events[l] = [e3._events[l], o2] : e3._events[l].push(o2) : (e3._events[l] = o2, e3._eventsCount++), e3;
          }
          function a(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new s2() : delete e3._events[t3];
          }
          function o() {
            this._events = new s2(), this._eventsCount = 0;
          }
          Object.create && (s2.prototype = /* @__PURE__ */ Object.create(null), new s2().__proto__ || (r2 = false)), o.prototype.eventNames = function() {
            var e3, s3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (s3 in e3 = this._events) t2.call(e3, s3) && i3.push(r2 ? s3.slice(1) : s3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e3)) : i3;
          }, o.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, s3 = this._events[t3];
            if (!s3) return [];
            if (s3.fn) return [s3.fn];
            for (var i3 = 0, n2 = s3.length, a2 = Array(n2); i3 < n2; i3++) a2[i3] = s3[i3].fn;
            return a2;
          }, o.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, s3 = this._events[t3];
            return s3 ? s3.fn ? 1 : s3.length : 0;
          }, o.prototype.emit = function(e3, t3, s3, i3, n2, a2) {
            var o2 = r2 ? r2 + e3 : e3;
            if (!this._events[o2]) return false;
            var l, u, c = this._events[o2], h = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e3, c.fn, void 0, true), h) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, s3), true;
                case 4:
                  return c.fn.call(c.context, t3, s3, i3), true;
                case 5:
                  return c.fn.call(c.context, t3, s3, i3, n2), true;
                case 6:
                  return c.fn.call(c.context, t3, s3, i3, n2, a2), true;
              }
              for (u = 1, l = Array(h - 1); u < h; u++) l[u - 1] = arguments[u];
              c.fn.apply(c.context, l);
            } else {
              var d, p = c.length;
              for (u = 0; u < p; u++) switch (c[u].once && this.removeListener(e3, c[u].fn, void 0, true), h) {
                case 1:
                  c[u].fn.call(c[u].context);
                  break;
                case 2:
                  c[u].fn.call(c[u].context, t3);
                  break;
                case 3:
                  c[u].fn.call(c[u].context, t3, s3);
                  break;
                case 4:
                  c[u].fn.call(c[u].context, t3, s3, i3);
                  break;
                default:
                  if (!l) for (d = 1, l = Array(h - 1); d < h; d++) l[d - 1] = arguments[d];
                  c[u].fn.apply(c[u].context, l);
              }
            }
            return true;
          }, o.prototype.on = function(e3, t3, r3) {
            return n(this, e3, t3, r3, false);
          }, o.prototype.once = function(e3, t3, r3) {
            return n(this, e3, t3, r3, true);
          }, o.prototype.removeListener = function(e3, t3, s3, i3) {
            var n2 = r2 ? r2 + e3 : e3;
            if (!this._events[n2]) return this;
            if (!t3) return a(this, n2), this;
            var o2 = this._events[n2];
            if (o2.fn) o2.fn !== t3 || i3 && !o2.once || s3 && o2.context !== s3 || a(this, n2);
            else {
              for (var l = 0, u = [], c = o2.length; l < c; l++) (o2[l].fn !== t3 || i3 && !o2[l].once || s3 && o2[l].context !== s3) && u.push(o2[l]);
              u.length ? this._events[n2] = 1 === u.length ? u[0] : u : a(this, n2);
            }
            return this;
          }, o.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && a(this, t3)) : (this._events = new s2(), this._eventsCount = 0), this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = r2, o.EventEmitter = o, e2.exports = o;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let s2 = 0, i2 = e3.length;
            for (; i2 > 0; ) {
              let n = i2 / 2 | 0, a = s2 + n;
              0 >= r2(e3[a], t3) ? (s2 = ++a, i2 -= n + 1) : i2 = n;
            }
            return s2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let s2 = r2(574);
          class i2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) {
                this._queue.push(r3);
                return;
              }
              let i3 = s2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(i3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = i2;
        }, 816: (e2, t2, r2) => {
          let s2 = r2(213);
          class i2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let n = (e3, t3, r3) => new Promise((n2, a) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) {
              n2(e3);
              return;
            }
            let o = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  n2(r3());
                } catch (e4) {
                  a(e4);
                }
                return;
              }
              let s3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, o2 = r3 instanceof Error ? r3 : new i2(s3);
              "function" == typeof e3.cancel && e3.cancel(), a(o2);
            }, t3);
            s2(e3.then(n2, a), () => {
              clearTimeout(o);
            });
          });
          e2.exports = n, e2.exports.default = n, e2.exports.TimeoutError = i2;
        } }, r = {};
        function s(e2) {
          var i2 = r[e2];
          if (void 0 !== i2) return i2.exports;
          var n = r[e2] = { exports: {} }, a = true;
          try {
            t[e2](n, n.exports, s), a = false;
          } finally {
            a && delete r[e2];
          }
          return n.exports;
        }
        s.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true });
          let e2 = s(993), t2 = s(816), r2 = s(821), n = () => {
          }, a = new t2.TimeoutError();
          class o extends e2 {
            constructor(e3) {
              var t3, s2, i2, a2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null !== (s2 = null === (t3 = e3.intervalCap) || void 0 === t3 ? void 0 : t3.toString()) && void 0 !== s2 ? s2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null !== (a2 = null === (i2 = e3.interval) || void 0 === i2 ? void 0 : i2.toString()) && void 0 !== a2 ? a2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((s2, i2) => {
                let n2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let n3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && i2(a);
                    });
                    s2(await n3);
                  } catch (e4) {
                    i2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(n2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  t3(), e3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
                let t3 = this._resolveIdle;
                this._resolveIdle = () => {
                  t3(), e3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          i.default = o;
        })(), e.exports = i;
      })();
    }, 544: (e, t) => {
      "use strict";
      Symbol.for("react.transitional.element"), Symbol.for("react.portal"), Symbol.for("react.fragment"), Symbol.for("react.strict_mode"), Symbol.for("react.profiler"), Symbol.for("react.forward_ref"), Symbol.for("react.suspense"), Symbol.for("react.memo"), Symbol.for("react.lazy"), Symbol.iterator, Object.prototype.hasOwnProperty, Object.assign;
    }, 886: (e, t, r) => {
      "use strict";
      e.exports = r(544);
    }, 113: (e, t, r) => {
      var s;
      (() => {
        var i = { 226: function(i2, n2) {
          !function(a2, o2) {
            "use strict";
            var l = "function", u = "undefined", c = "object", h = "string", d = "major", p = "model", f = "name", g = "type", m = "vendor", w = "version", v = "architecture", b = "console", y = "mobile", _ = "tablet", S = "smarttv", E = "wearable", k = "embedded", T = "Amazon", O = "Apple", R = "ASUS", x = "BlackBerry", C = "Browser", P = "Chrome", A = "Firefox", I = "Google", j = "Huawei", N = "Microsoft", $ = "Motorola", L = "Opera", U = "Samsung", D = "Sharp", M = "Sony", q = "Xiaomi", B = "Zebra", V = "Facebook", W = "Chromium OS", G = "Mac OS", K = function(e2, t2) {
              var r2 = {};
              for (var s2 in e2) t2[s2] && t2[s2].length % 2 == 0 ? r2[s2] = t2[s2].concat(e2[s2]) : r2[s2] = e2[s2];
              return r2;
            }, H = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, z = function(e2, t2) {
              return typeof e2 === h && -1 !== F(t2).indexOf(F(e2));
            }, F = function(e2) {
              return e2.toLowerCase();
            }, J = function(e2, t2) {
              if (typeof e2 === h) return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === u ? e2 : e2.substring(0, 350);
            }, X = function(e2, t2) {
              for (var r2, s2, i3, n3, a3, u2, h2 = 0; h2 < t2.length && !a3; ) {
                var d2 = t2[h2], p2 = t2[h2 + 1];
                for (r2 = s2 = 0; r2 < d2.length && !a3 && d2[r2]; ) if (a3 = d2[r2++].exec(e2)) for (i3 = 0; i3 < p2.length; i3++) u2 = a3[++s2], typeof (n3 = p2[i3]) === c && n3.length > 0 ? 2 === n3.length ? typeof n3[1] == l ? this[n3[0]] = n3[1].call(this, u2) : this[n3[0]] = n3[1] : 3 === n3.length ? typeof n3[1] !== l || n3[1].exec && n3[1].test ? this[n3[0]] = u2 ? u2.replace(n3[1], n3[2]) : void 0 : this[n3[0]] = u2 ? n3[1].call(this, u2, n3[2]) : void 0 : 4 === n3.length && (this[n3[0]] = u2 ? n3[3].call(this, u2.replace(n3[1], n3[2])) : void 0) : this[n3] = u2 || o2;
                h2 += 2;
              }
            }, Y = function(e2, t2) {
              for (var r2 in t2) if (typeof t2[r2] === c && t2[r2].length > 0) {
                for (var s2 = 0; s2 < t2[r2].length; s2++) if (z(t2[r2][s2], e2)) return "?" === r2 ? o2 : r2;
              } else if (z(t2[r2], e2)) return "?" === r2 ? o2 : r2;
              return e2;
            }, Q = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Z = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [w, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [w, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, w], [/opios[\/ ]+([\w\.]+)/i], [w, [f, L + " Mini"]], [/\bopr\/([\w\.]+)/i], [w, [f, L]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, w], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [w, [f, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [w, [f, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [w, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [w, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [w, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [w, [f, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + C], w], [/\bfocus\/([\w\.]+)/i], [w, [f, A + " Focus"]], [/\bopt\/([\w\.]+)/i], [w, [f, L + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [w, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [w, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [w, [f, L + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [w, [f, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [w, [f, A]], [/\bqihu|(qi?ho?o?|360)browser/i], [[f, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1 " + C], w], [/(comodo_dragon)\/([\w\.]+)/i], [[f, /_/g, " "], w], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [f, w], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, V], w], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [f, w], [/\bgsa\/([\w\.]+) .*safari\//i], [w, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [w, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [w, [f, P + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, P + " WebView"], w], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [w, [f, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, w], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [w, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [w, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [w, Y, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, w], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], w], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [w, [f, A + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [f, w], [/(cobalt)\/([\w\.]+)/i], [f, [w, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[v, "amd64"]], [/(ia32(?=;))/i], [[v, F]], [/((?:i[346]|x)86)[;\)]/i], [[v, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[v, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[v, "armhf"]], [/windows (ce|mobile); ppc;/i], [[v, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[v, /ower/, "", F]], [/(sun4\w)[;\)]/i], [[v, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[v, F]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [p, [m, U], [g, _]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [p, [m, U], [g, y]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [p, [m, O], [g, y]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [p, [m, O], [g, _]], [/(macintosh);/i], [p, [m, O]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [p, [m, D], [g, y]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [p, [m, j], [g, _]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [p, [m, j], [g, y]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[p, /_/g, " "], [m, q], [g, y]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[p, /_/g, " "], [m, q], [g, _]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [p, [m, "OPPO"], [g, y]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [p, [m, "Vivo"], [g, y]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [p, [m, "Realme"], [g, y]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [p, [m, $], [g, y]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [p, [m, $], [g, _]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [p, [m, "LG"], [g, _]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [p, [m, "LG"], [g, y]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [p, [m, "Lenovo"], [g, _]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[p, /_/g, " "], [m, "Nokia"], [g, y]], [/(pixel c)\b/i], [p, [m, I], [g, _]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [p, [m, I], [g, y]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [p, [m, M], [g, y]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[p, "Xperia Tablet"], [m, M], [g, _]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [p, [m, "OnePlus"], [g, y]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [p, [m, T], [g, _]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[p, /(.+)/g, "Fire Phone $1"], [m, T], [g, y]], [/(playbook);[-\w\),; ]+(rim)/i], [p, m, [g, _]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [p, [m, x], [g, y]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [p, [m, R], [g, _]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [p, [m, R], [g, y]], [/(nexus 9)/i], [p, [m, "HTC"], [g, _]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [p, /_/g, " "], [g, y]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [p, [m, "Acer"], [g, _]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [p, [m, "Meizu"], [g, y]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, p, [g, y]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, p, [g, _]], [/(surface duo)/i], [p, [m, N], [g, _]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [p, [m, "Fairphone"], [g, y]], [/(u304aa)/i], [p, [m, "AT&T"], [g, y]], [/\bsie-(\w*)/i], [p, [m, "Siemens"], [g, y]], [/\b(rct\w+) b/i], [p, [m, "RCA"], [g, _]], [/\b(venue[\d ]{2,7}) b/i], [p, [m, "Dell"], [g, _]], [/\b(q(?:mv|ta)\w+) b/i], [p, [m, "Verizon"], [g, _]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [p, [m, "Barnes & Noble"], [g, _]], [/\b(tm\d{3}\w+) b/i], [p, [m, "NuVision"], [g, _]], [/\b(k88) b/i], [p, [m, "ZTE"], [g, _]], [/\b(nx\d{3}j) b/i], [p, [m, "ZTE"], [g, y]], [/\b(gen\d{3}) b.+49h/i], [p, [m, "Swiss"], [g, y]], [/\b(zur\d{3}) b/i], [p, [m, "Swiss"], [g, _]], [/\b((zeki)?tb.*\b) b/i], [p, [m, "Zeki"], [g, _]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], p, [g, _]], [/\b(ns-?\w{0,9}) b/i], [p, [m, "Insignia"], [g, _]], [/\b((nxa|next)-?\w{0,9}) b/i], [p, [m, "NextBook"], [g, _]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], p, [g, y]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], p, [g, y]], [/\b(ph-1) /i], [p, [m, "Essential"], [g, y]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [p, [m, "Envizen"], [g, _]], [/\b(trio[-\w\. ]+) b/i], [p, [m, "MachSpeed"], [g, _]], [/\btu_(1491) b/i], [p, [m, "Rotor"], [g, _]], [/(shield[\w ]+) b/i], [p, [m, "Nvidia"], [g, _]], [/(sprint) (\w+)/i], [m, p, [g, y]], [/(kin\.[onetw]{3})/i], [[p, /\./g, " "], [m, N], [g, y]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [p, [m, B], [g, _]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [p, [m, B], [g, y]], [/smart-tv.+(samsung)/i], [m, [g, S]], [/hbbtv.+maple;(\d+)/i], [[p, /^/, "SmartTV"], [m, U], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, S]], [/(apple) ?tv/i], [m, [p, O + " TV"], [g, S]], [/crkey/i], [[p, P + "cast"], [m, I], [g, S]], [/droid.+aft(\w)( bui|\))/i], [p, [m, T], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [p, [m, D], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [p, [m, M], [g, S]], [/(mitv-\w{5}) bui/i], [p, [m, q], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [m, p, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, J], [p, J], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, p, [g, b]], [/droid.+; (shield) bui/i], [p, [m, "Nvidia"], [g, b]], [/(playstation [345portablevi]+)/i], [p, [m, M], [g, b]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [p, [m, N], [g, b]], [/((pebble))app/i], [m, p, [g, E]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [p, [m, O], [g, E]], [/droid.+; (glass) \d/i], [p, [m, I], [g, E]], [/droid.+; (wt63?0{2,3})\)/i], [p, [m, B], [g, E]], [/(quest( 2| pro)?)/i], [p, [m, V], [g, E]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, k]], [/(aeobc)\b/i], [p, [m, T], [g, k]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [p, [g, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [p, [g, _]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, _]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, y]], [/(android[-\w\. ]{0,9});.+buil/i], [p, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [w, [f, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [w, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, w], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [w, f]], os: [[/microsoft (windows) (vista|xp)/i], [f, w], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [f, [w, Y, Q]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[f, "Windows"], [w, Y, Q]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[w, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, G], [w, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [w, f], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [f, w], [/\(bb(10);/i], [w, [f, x]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [w, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [w, [f, A + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [w, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [w, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [w, [f, P + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, W], w], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, w], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], w], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, w]] }, ee = function(e2, t2) {
              if (typeof e2 === c && (t2 = e2, e2 = o2), !(this instanceof ee)) return new ee(e2, t2).getResult();
              var r2 = typeof a2 !== u && a2.navigator ? a2.navigator : o2, s2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : o2, n3 = t2 ? K(Z, t2) : Z, b2 = r2 && r2.userAgent == s2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[f] = o2, t3[w] = o2, X.call(t3, s2, n3.browser), t3[d] = typeof (e3 = t3[w]) === h ? e3.replace(/[^\d\.]/g, "").split(".")[0] : o2, b2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[f] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[v] = o2, X.call(e3, s2, n3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = o2, e3[p] = o2, e3[g] = o2, X.call(e3, s2, n3.device), b2 && !e3[g] && i3 && i3.mobile && (e3[g] = y), b2 && "Macintosh" == e3[p] && r2 && typeof r2.standalone !== u && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[p] = "iPad", e3[g] = _), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[f] = o2, e3[w] = o2, X.call(e3, s2, n3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[f] = o2, e3[w] = o2, X.call(e3, s2, n3.os), b2 && !e3[f] && i3 && "Unknown" != i3.platform && (e3[f] = i3.platform.replace(/chrome os/i, W).replace(/macos/i, G)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return s2;
              }, this.setUA = function(e3) {
                return s2 = typeof e3 === h && e3.length > 350 ? J(e3, 350) : e3, this;
              }, this.setUA(s2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = H([f, w, d]), ee.CPU = H([v]), ee.DEVICE = H([p, m, g, b, y, S, _, E, k]), ee.ENGINE = ee.OS = H([f, w]), typeof n2 !== u ? (i2.exports && (n2 = i2.exports = ee), n2.UAParser = ee) : r.amdO ? void 0 !== (s = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = s) : typeof a2 !== u && (a2.UAParser = ee);
            var et = typeof a2 !== u && (a2.jQuery || a2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2) et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, n = {};
        function a(e2) {
          var t2 = n[e2];
          if (void 0 !== t2) return t2.exports;
          var r2 = n[e2] = { exports: {} }, s2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, a), s2 = false;
          } finally {
            s2 && delete n[e2];
          }
          return r2.exports;
        }
        a.ab = "//";
        var o = a(226);
        e.exports = o;
      })();
    }, 152: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return a;
      }, withRequest: function() {
        return n;
      } });
      let s = new (r(521)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2) return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function n(e2, t2, r2) {
        let n2 = i(e2, t2);
        return n2 ? s.run(n2, r2) : r2();
      }
      function a(e2, t2) {
        return s.getStore() || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 53: (e, t, r) => {
      "use strict";
      var s = r(356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return o;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return n;
      } });
      let i = r(152), n = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function a(e2, t2) {
        let { url: r2, method: i2, headers: n2, body: a2, cache: o2, credentials: l2, integrity: u, mode: c, redirect: h, referrer: d, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(n2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? s.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: u, mode: c, redirect: h, referrer: d, referrerPolicy: p } };
      }
      async function o(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, n);
        if (!r2) return e2(t2);
        let { testData: o2, proxyPort: l2 } = r2, u = await a(o2, t2), c = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(u), next: { internal: true } });
        if (!c.ok) throw Error(`Proxy request failed: ${c.status}`);
        let h = await c.json(), { api: d } = h;
        switch (d) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: i2 } = e3.response;
          return new Response(i2 ? s.from(i2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(h);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var s2;
          return (null == r2 ? void 0 : null == (s2 = r2.next) ? void 0 : s2.internal) ? e2(t2, r2) : o(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 384: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2) Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return n;
      }, wrapRequestHandler: function() {
        return a;
      } });
      let s = r(152), i = r(53);
      function n() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function a(e2) {
        return (t2, r2) => (0, s.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 478: (e, t, r) => {
      "use strict";
      let s, i;
      r.r(t), r.d(t, { default: () => iP });
      var n, a, o, l, u, c, h, d, p, f, g, m = {};
      async function w() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(m), r.d(m, { config: () => iO, middleware: () => iT });
      let v = null;
      async function b() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        v || (v = w());
        let e10 = await v;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function y(...e10) {
        let t10 = await w();
        try {
          var r10;
          await (null == t10 ? void 0 : null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let _ = null;
      function S() {
        return _ || (_ = b()), _;
      }
      function E(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t10 = new Proxy(function() {
        }, { get(t11, r10) {
          if ("then" === r10) return {};
          throw Error(E(e10));
        }, construct() {
          throw Error(E(e10));
        }, apply(r10, s10, i2) {
          if ("function" == typeof i2[0]) return i2[0](t10);
          throw Error(E(e10));
        } });
        return new Proxy({}, { get: () => t10 });
      }, enumerable: false, configurable: false }), S();
      class k extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class T extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class O extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let R = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser" };
      function x(e10) {
        var t10, r10, s10, i2, n2, a2 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, n2 = false; l2(); ) if ("," === (r10 = e10.charAt(o2))) {
            for (s10 = o2, o2 += 1, l2(), i2 = o2; o2 < e10.length && "=" !== (r10 = e10.charAt(o2)) && ";" !== r10 && "," !== r10; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (n2 = true, o2 = i2, a2.push(e10.substring(t10, s10)), t10 = o2) : o2 = s10 + 1;
          } else o2 += 1;
          (!n2 || o2 >= e10.length) && a2.push(e10.substring(t10, e10.length));
        }
        return a2;
      }
      function C(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [s10, i2] of e10.entries()) "set-cookie" === s10.toLowerCase() ? (r10.push(...x(i2)), t10[s10] = 1 === r10.length ? r10[0] : r10) : t10[s10] = i2;
        return t10;
      }
      function P(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ...R, GROUP: { builtinReact: [R.reactServerComponents, R.actionBrowser], serverOnly: [R.reactServerComponents, R.actionBrowser, R.instrument, R.middleware], neutralTarget: [R.api], clientOnly: [R.serverSideRendering, R.appPagesBrowser], bundled: [R.reactServerComponents, R.actionBrowser, R.serverSideRendering, R.appPagesBrowser, R.shared, R.instrument], appPages: [R.reactServerComponents, R.serverSideRendering, R.appPagesBrowser, R.actionBrowser] } });
      let A = Symbol("response"), I = Symbol("passThrough"), j = Symbol("waitUntil");
      class N {
        constructor(e10, t10) {
          this[I] = false, this[j] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[A] || (this[A] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[I] = true;
        }
        waitUntil(e10) {
          if ("external" === this[j].kind) return (0, this[j].function)(e10);
          this[j].promises.push(e10);
        }
      }
      class $ extends N {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new k({ page: this.sourcePage });
        }
        respondWith() {
          throw new k({ page: this.sourcePage });
        }
      }
      function L(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function U(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), s10 = r10 > -1 && (t10 < 0 || r10 < t10);
        return s10 || t10 > -1 ? { pathname: e10.substring(0, s10 ? r10 : t10), query: s10 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function D(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: s10, hash: i2 } = U(e10);
        return "" + t10 + r10 + s10 + i2;
      }
      function M(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: s10, hash: i2 } = U(e10);
        return "" + r10 + t10 + s10 + i2;
      }
      function q(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = U(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      function B(e10, t10) {
        let r10;
        let s10 = e10.split("/");
        return (t10 || []).some((t11) => !!s10[1] && s10[1].toLowerCase() === t11.toLowerCase() && (r10 = t11, s10.splice(1, 1), e10 = s10.join("/") || "/", true)), { pathname: e10, detectedLocale: r10 };
      }
      let V = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function W(e10, t10) {
        return new URL(String(e10).replace(V, "localhost"), t10 && String(t10).replace(V, "localhost"));
      }
      let G = Symbol("NextURLInternal");
      class K {
        constructor(e10, t10, r10) {
          let s10, i2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (s10 = t10, i2 = r10 || {}) : i2 = r10 || t10 || {}, this[G] = { url: W(e10, s10 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, s10, i2;
          let n2 = function(e11, t11) {
            var r11, s11;
            let { basePath: i3, i18n: n3, trailingSlash: a3 } = null != (r11 = t11.nextConfig) ? r11 : {}, o3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a3 };
            i3 && q(o3.pathname, i3) && (o3.pathname = function(e12, t12) {
              if (!q(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : "/" + r12;
            }(o3.pathname, i3), o3.basePath = i3);
            let l2 = o3.pathname;
            if (o3.pathname.startsWith("/_next/data/") && o3.pathname.endsWith(".json")) {
              let e12 = o3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r12 = e12[0];
              o3.buildId = r12, l2 = "index" !== e12[1] ? "/" + e12.slice(1).join("/") : "/", true === t11.parseData && (o3.pathname = l2);
            }
            if (n3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3.pathname) : B(o3.pathname, n3.locales);
              o3.locale = e12.detectedLocale, o3.pathname = null != (s11 = e12.pathname) ? s11 : o3.pathname, !e12.detectedLocale && o3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(l2) : B(l2, n3.locales)).detectedLocale && (o3.locale = e12.detectedLocale);
            }
            return o3;
          }(this[G].url.pathname, { nextConfig: this[G].options.nextConfig, parseData: true, i18nProvider: this[G].options.i18nProvider }), a2 = function(e11, t11) {
            let r11;
            if ((null == t11 ? void 0 : t11.host) && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[G].url, this[G].options.headers);
          this[G].domainLocale = this[G].options.i18nProvider ? this[G].options.i18nProvider.detectDomainLocale(a2) : function(e11, t11, r11) {
            if (e11) for (let n3 of (r11 && (r11 = r11.toLowerCase()), e11)) {
              var s11, i3;
              if (t11 === (null == (s11 = n3.domain) ? void 0 : s11.split(":", 1)[0].toLowerCase()) || r11 === n3.defaultLocale.toLowerCase() || (null == (i3 = n3.locales) ? void 0 : i3.some((e12) => e12.toLowerCase() === r11))) return n3;
            }
          }(null == (t10 = this[G].options.nextConfig) ? void 0 : null == (e10 = t10.i18n) ? void 0 : e10.domains, a2);
          let o2 = (null == (r10 = this[G].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i2 = this[G].options.nextConfig) ? void 0 : null == (s10 = i2.i18n) ? void 0 : s10.defaultLocale);
          this[G].url.pathname = n2.pathname, this[G].defaultLocale = o2, this[G].basePath = n2.basePath ?? "", this[G].buildId = n2.buildId, this[G].locale = n2.locale ?? o2, this[G].trailingSlash = n2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, s10) {
            if (!t11 || t11 === r10) return e11;
            let i2 = e11.toLowerCase();
            return !s10 && (q(i2, "/api") || q(i2, "/" + t11.toLowerCase())) ? e11 : D(e11, "/" + t11);
          }((e10 = { basePath: this[G].basePath, buildId: this[G].buildId, defaultLocale: this[G].options.forceLocale ? void 0 : this[G].defaultLocale, locale: this[G].locale, pathname: this[G].url.pathname, trailingSlash: this[G].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = L(t10)), e10.buildId && (t10 = M(D(t10, "/_next/data/" + e10.buildId), "/" === e10.pathname ? "index.json" : ".json")), t10 = D(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : M(t10, "/") : L(t10);
        }
        formatSearch() {
          return this[G].url.search;
        }
        get buildId() {
          return this[G].buildId;
        }
        set buildId(e10) {
          this[G].buildId = e10;
        }
        get locale() {
          return this[G].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[G].locale || !(null == (r10 = this[G].options.nextConfig) ? void 0 : null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[G].locale = e10;
        }
        get defaultLocale() {
          return this[G].defaultLocale;
        }
        get domainLocale() {
          return this[G].domainLocale;
        }
        get searchParams() {
          return this[G].url.searchParams;
        }
        get host() {
          return this[G].url.host;
        }
        set host(e10) {
          this[G].url.host = e10;
        }
        get hostname() {
          return this[G].url.hostname;
        }
        set hostname(e10) {
          this[G].url.hostname = e10;
        }
        get port() {
          return this[G].url.port;
        }
        set port(e10) {
          this[G].url.port = e10;
        }
        get protocol() {
          return this[G].url.protocol;
        }
        set protocol(e10) {
          this[G].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[G].url = W(e10), this.analyze();
        }
        get origin() {
          return this[G].url.origin;
        }
        get pathname() {
          return this[G].url.pathname;
        }
        set pathname(e10) {
          this[G].url.pathname = e10;
        }
        get hash() {
          return this[G].url.hash;
        }
        set hash(e10) {
          this[G].url.hash = e10;
        }
        get search() {
          return this[G].url.search;
        }
        set search(e10) {
          this[G].url.search = e10;
        }
        get password() {
          return this[G].url.password;
        }
        set password(e10) {
          this[G].url.password = e10;
        }
        get username() {
          return this[G].url.username;
        }
        set username(e10) {
          this[G].url.username = e10;
        }
        get basePath() {
          return this[G].basePath;
        }
        set basePath(e10) {
          this[G].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new K(String(this), this[G].options);
        }
      }
      var H = r(555);
      let z = Symbol("internal request");
      class F extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          P(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let s10 = new K(r10, { headers: C(this.headers), nextConfig: t10.nextConfig });
          this[z] = { cookies: new H.RequestCookies(this.headers), nextUrl: s10, url: s10.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[z].cookies;
        }
        get nextUrl() {
          return this[z].nextUrl;
        }
        get page() {
          throw new T();
        }
        get ua() {
          throw new O();
        }
        get url() {
          return this[z].url;
        }
      }
      class J {
        static get(e10, t10, r10) {
          let s10 = Reflect.get(e10, t10, r10);
          return "function" == typeof s10 ? s10.bind(e10) : s10;
        }
        static set(e10, t10, r10, s10) {
          return Reflect.set(e10, t10, r10, s10);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let X = Symbol("internal response"), Y = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function Q(e10, t10) {
        var r10;
        if (null == e10 ? void 0 : null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [s10, i2] of e10.request.headers) t10.set("x-middleware-request-" + s10, i2), r11.push(s10);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class Z extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, s10 = new Proxy(new H.ResponseCookies(r10), { get(e11, s11, i2) {
            switch (s11) {
              case "delete":
              case "set":
                return (...i3) => {
                  let n2 = Reflect.apply(e11[s11], e11, i3), a2 = new Headers(r10);
                  return n2 instanceof H.ResponseCookies && r10.set("x-middleware-set-cookie", n2.getAll().map((e12) => (0, H.stringifyCookie)(e12)).join(",")), Q(t10, a2), n2;
                };
              default:
                return J.get(e11, s11, i2);
            }
          } });
          this[X] = { cookies: s10, url: t10.url ? new K(t10.url, { headers: C(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[X].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new Z(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!Y.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let s10 = "object" == typeof t10 ? t10 : {}, i2 = new Headers(null == s10 ? void 0 : s10.headers);
          return i2.set("Location", P(e10)), new Z(null, { ...s10, headers: i2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", P(e10)), Q(t10, r10), new Z(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), Q(e10, t10), new Z(null, { ...e10, headers: t10 });
        }
      }
      function ee(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, s10 = new URL(e10, t10), i2 = r10.protocol + "//" + r10.host;
        return s10.protocol + "//" + s10.host === i2 ? s10.toString().replace(i2, "") : s10.toString();
      }
      let et = "Next-Router-Prefetch", er = ["RSC", "Next-Router-State-Tree", et, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], es = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], ei = ["__nextDataReq"];
      class en extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new en();
        }
      }
      class ea extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, s10) {
            if ("symbol" == typeof r10) return J.get(t10, r10, s10);
            let i2 = r10.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            if (void 0 !== n2) return J.get(t10, n2, s10);
          }, set(t10, r10, s10, i2) {
            if ("symbol" == typeof r10) return J.set(t10, r10, s10, i2);
            let n2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return J.set(t10, a2 ?? r10, s10, i2);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return J.has(t10, r10);
            let s10 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === s10);
            return void 0 !== i2 && J.has(t10, i2);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return J.deleteProperty(t10, r10);
            let s10 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === s10);
            return void 0 === i2 || J.deleteProperty(t10, i2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return en.callable;
              default:
                return J.get(e11, t10, r10);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new ea(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, s10] of this.entries()) e10.call(t10, s10, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let eo = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class el {
        disable() {
          throw eo;
        }
        getStore() {
        }
        run() {
          throw eo;
        }
        exit() {
          throw eo;
        }
        enterWith() {
          throw eo;
        }
        static bind(e10) {
          return e10;
        }
      }
      let eu = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function ec() {
        return eu ? new eu() : new el();
      }
      let eh = ec(), ed = ec();
      class ep extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new ep();
        }
      }
      class ef {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return ep.callable;
              default:
                return J.get(e11, t10, r10);
            }
          } });
        }
      }
      let eg = Symbol.for("next.mutated.cookies");
      class em {
        static wrap(e10, t10) {
          let r10 = new H.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let s10 = [], i2 = /* @__PURE__ */ new Set(), n2 = () => {
            let e11 = eh.getStore();
            if (e11 && (e11.pathWasRevalidated = true), s10 = r10.getAll().filter((e12) => i2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of s10) {
                let r11 = new H.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, a2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eg:
                return s10;
              case "delete":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), a2;
                  } finally {
                    n2();
                  }
                };
              case "set":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), a2;
                  } finally {
                    n2();
                  }
                };
              default:
                return J.get(e11, t11, r11);
            }
          } });
          return a2;
        }
      }
      function ew(e10) {
        if ("action" !== function(e11) {
          let t10 = ed.getStore();
          if (t10) {
            if ("request" === t10.type) return t10;
            if ("prerender" === t10.type || "prerender-ppr" === t10.type || "prerender-legacy" === t10.type) throw Error(`\`${e11}\` cannot be called inside a prerender. This is a bug in Next.js.`);
            if ("cache" === t10.type) throw Error(`\`${e11}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === t10.type) throw Error(`\`${e11}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
          }
          throw Error(`\`${e11}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`);
        }(e10).phase) throw new ep();
      }
      var ev = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(ev || {}), eb = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(eb || {}), ey = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(ey || {}), e_ = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(e_ || {}), eS = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }(eS || {}), eE = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(eE || {}), ek = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(ek || {}), eT = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(eT || {}), eO = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(eO || {}), eR = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(eR || {}), ex = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(ex || {}), eC = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(eC || {});
      let eP = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], eA = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function eI(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: ej, propagation: eN, trace: e$, SpanStatusCode: eL, SpanKind: eU, ROOT_CONTEXT: eD } = s = r(777);
      class eM extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eq = (e10, t10) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof eM;
        })(t10) && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && e10.recordException(t10), e10.setStatus({ code: eL.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eB = /* @__PURE__ */ new Map(), eV = s.createContextKey("next.rootSpanId"), eW = 0, eG = () => eW++, eK = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } };
      class eH {
        getTracerInstance() {
          return e$.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ej;
        }
        getTracePropagationData() {
          let e10 = ej.active(), t10 = [];
          return eN.inject(e10, t10, eK), t10;
        }
        getActiveScopeSpan() {
          return e$.getSpan(null == ej ? void 0 : ej.active());
        }
        withPropagatedContext(e10, t10, r10) {
          let s10 = ej.active();
          if (e$.getSpanContext(s10)) return t10();
          let i2 = eN.extract(s10, e10, r10);
          return ej.with(i2, t10);
        }
        trace(...e10) {
          var t10;
          let [r10, s10, i2] = e10, { fn: n2, options: a2 } = "function" == typeof s10 ? { fn: s10, options: {} } : { fn: i2, options: { ...s10 } }, o2 = a2.spanName ?? r10;
          if (!eP.includes(r10) && "1" !== process.env.NEXT_OTEL_VERBOSE || a2.hideSpan) return n2();
          let l2 = this.getSpanContext((null == a2 ? void 0 : a2.parentSpan) ?? this.getActiveScopeSpan()), u2 = false;
          l2 ? (null == (t10 = e$.getSpanContext(l2)) ? void 0 : t10.isRemote) && (u2 = true) : (l2 = (null == ej ? void 0 : ej.active()) ?? eD, u2 = true);
          let c2 = eG();
          return a2.attributes = { "next.span_name": o2, "next.span_type": r10, ...a2.attributes }, ej.with(l2.setValue(eV, c2), () => this.getTracerInstance().startActiveSpan(o2, a2, (e11) => {
            let t11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, s11 = () => {
              eB.delete(c2), t11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && eA.includes(r10 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t11, end: performance.now() });
            };
            u2 && eB.set(c2, new Map(Object.entries(a2.attributes ?? {})));
            try {
              if (n2.length > 1) return n2(e11, (t13) => eq(e11, t13));
              let t12 = n2(e11);
              if (eI(t12)) return t12.then((t13) => (e11.end(), t13)).catch((t13) => {
                throw eq(e11, t13), t13;
              }).finally(s11);
              return e11.end(), s11(), t12;
            } catch (t12) {
              throw eq(e11, t12), s11(), t12;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r10, s10, i2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eP.includes(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = s10;
            "function" == typeof e11 && "function" == typeof i2 && (e11 = e11.apply(this, arguments));
            let n2 = arguments.length - 1, a2 = arguments[n2];
            if ("function" != typeof a2) return t10.trace(r10, e11, () => i2.apply(this, arguments));
            {
              let s11 = t10.getContext().bind(ej.active(), a2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[n2] = function(e13) {
                return null == t11 || t11(e13), s11.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, s10 = this.getSpanContext((null == r10 ? void 0 : r10.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r10, s10);
        }
        getSpanContext(e10) {
          return e10 ? e$.setSpan(ej.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ej.active().getValue(eV);
          return eB.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = ej.active().getValue(eV), s10 = eB.get(r10);
          s10 && s10.set(e10, t10);
        }
      }
      let ez = (() => {
        let e10 = new eH();
        return () => e10;
      })(), eF = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eF);
      class eJ {
        constructor(e10, t10, r10, s10) {
          var i2;
          let n2 = e10 && function(e11, t11) {
            let r11 = ea.from(e11.headers);
            return { isOnDemandRevalidate: r11.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r11.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a2 = null == (i2 = r10.get(eF)) ? void 0 : i2.value;
          this.isEnabled = !!(!n2 && a2 && e10 && a2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = s10;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: eF, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: eF, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function eX(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r10 = e10.headers["x-middleware-set-cookie"], s10 = new Headers();
          for (let e11 of x(r10)) s10.append("set-cookie", e11);
          for (let e11 of new H.ResponseCookies(s10).getAll()) t10.set(e11);
        }
      }
      var eY = r(541), eQ = r.n(eY);
      class eZ extends Error {
        constructor(e10, t10) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t10), this.name = "InvariantError";
        }
      }
      async function e0(e10, t10) {
        if (!e10) return t10();
        let r10 = e1(e10);
        try {
          return await t10();
        } finally {
          let t11 = function(e11, t12) {
            let r11 = new Set(e11.revalidatedTags), s10 = new Set(e11.pendingRevalidateWrites);
            return { revalidatedTags: t12.revalidatedTags.filter((e12) => !r11.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t12.pendingRevalidates).filter(([t13]) => !(t13 in e11.pendingRevalidates))), pendingRevalidateWrites: t12.pendingRevalidateWrites.filter((e12) => !s10.has(e12)) };
          }(r10, e1(e10));
          await e2(e10, t11);
        }
      }
      function e1(e10) {
        return { revalidatedTags: e10.revalidatedTags ? [...e10.revalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e2(e10, { revalidatedTags: t10, pendingRevalidates: r10, pendingRevalidateWrites: s10 }) {
        var i2;
        return Promise.all([null == (i2 = e10.incrementalCache) ? void 0 : i2.revalidateTag(t10), ...Object.values(r10), ...s10]);
      }
      let e3 = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class e4 {
        disable() {
          throw e3;
        }
        getStore() {
        }
        run() {
          throw e3;
        }
        exit() {
          throw e3;
        }
        enterWith() {
          throw e3;
        }
        static bind(e10) {
          return e10;
        }
      }
      let e6 = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage, e5 = e6 ? new e6() : new e4();
      class e8 {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new (eQ())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eI(e10)) this.waitUntil || e9(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Error("`after()`: Argument must be a promise or a function");
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || e9();
          let r10 = ed.getStore();
          r10 && this.workUnitStores.add(r10);
          let s10 = e5.getStore(), i2 = s10 ? s10.rootTaskSpawnPhase : null == r10 ? void 0 : r10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let n2 = (t10 = async () => {
            try {
              await e5.run({ rootTaskSpawnPhase: i2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, e6 ? e6.bind(t10) : e4.bind(t10));
          this.callbackQueue.add(n2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = eh.getStore();
          if (!e10) throw new eZ("Missing workStore in AfterContext.runCallbacks");
          return e0(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(new eZ("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
          }
        }
      }
      function e9() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      class e7 {
        onClose(e10) {
          if (this.isClosed) throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function te() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tt = Symbol.for("@next/request-context");
      class tr extends F {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new k({ page: this.sourcePage });
        }
        respondWith() {
          throw new k({ page: this.sourcePage });
        }
        waitUntil() {
          throw new k({ page: this.sourcePage });
        }
      }
      let ts = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, ti = (e10, t10) => ez().withPropagatedContext(e10.headers, t10, ts), tn = false;
      async function ta(e10) {
        var t10;
        let s10, i2;
        !function() {
          if (!tn && (tn = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t11 } = r(384);
            e11(), ti = t11(ti);
          }
        }(), await S();
        let n2 = void 0 !== self.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let a2 = new K(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...a2.searchParams.keys()]) {
          let t11 = a2.searchParams.getAll(e11);
          !function(e12, t12) {
            for (let r10 of ["nxtP", "nxtI"]) e12 !== r10 && e12.startsWith(r10) && t12(e12.substring(r10.length));
          }(e11, (r10) => {
            for (let e12 of (a2.searchParams.delete(r10), t11)) a2.searchParams.append(r10, e12);
            a2.searchParams.delete(e11);
          });
        }
        let o2 = a2.buildId;
        a2.buildId = "";
        let l2 = e10.request.headers["x-nextjs-data"];
        l2 && "/index" === a2.pathname && (a2.pathname = "/");
        let u2 = function(e11) {
          let t11 = new Headers();
          for (let [r10, s11] of Object.entries(e11)) for (let e12 of Array.isArray(s11) ? s11 : [s11]) void 0 !== e12 && ("number" == typeof e12 && (e12 = e12.toString()), t11.append(r10, e12));
          return t11;
        }(e10.request.headers), c2 = /* @__PURE__ */ new Map();
        if (!n2) for (let e11 of er) {
          let t11 = e11.toLowerCase(), r10 = u2.get(t11);
          r10 && (c2.set(t11, r10), u2.delete(t11));
        }
        let h2 = new tr({ page: e10.page, input: function(e11, t11) {
          let r10 = "string" == typeof e11, s11 = r10 ? new URL(e11) : e11;
          for (let e12 of es) s11.searchParams.delete(e12);
          if (t11) for (let e12 of ei) s11.searchParams.delete(e12);
          return r10 ? s11.toString() : s11;
        }(a2, true).toString(), init: { body: e10.request.body, headers: u2, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        l2 && Object.defineProperty(h2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: te() }) }));
        let d2 = e10.request.waitUntil ?? (null == (t10 = function() {
          let e11 = globalThis[tt];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t10.waitUntil), p2 = new $({ request: h2, page: e10.page, context: d2 ? { waitUntil: d2 } : void 0 });
        if ((s10 = await ti(h2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t11 = p2.waitUntil.bind(p2), r10 = new e7();
            return ez().trace(eC.execute, { spanName: `middleware ${h2.method} ${h2.nextUrl.pathname}`, attributes: { "http.target": h2.nextUrl.pathname, "http.method": h2.method } }, async () => {
              try {
                var s11, n3, a3, l3, u3, c3, d3;
                let f3 = te(), g3 = (u3 = h2.nextUrl, c3 = void 0, d3 = (e11) => {
                  i2 = e11;
                }, function(e11, t12, r11, s12, i3, n4, a4, o3, l4, u4) {
                  function c4(e12) {
                    r11 && r11.setHeader("Set-Cookie", e12);
                  }
                  let h3 = {};
                  return { type: "request", phase: e11, implicitTags: i3 ?? [], url: { pathname: s12.pathname, search: s12.search ?? "" }, get headers() {
                    return h3.headers || (h3.headers = function(e12) {
                      let t13 = ea.from(e12);
                      for (let e13 of er) t13.delete(e13.toLowerCase());
                      return ea.seal(t13);
                    }(t12.headers)), h3.headers;
                  }, get cookies() {
                    if (!h3.cookies) {
                      let e12 = new H.RequestCookies(ea.from(t12.headers));
                      eX(t12, e12), h3.cookies = ef.seal(e12);
                    }
                    return h3.cookies;
                  }, set cookies(value) {
                    h3.cookies = value;
                  }, get mutableCookies() {
                    if (!h3.mutableCookies) {
                      let e12 = function(e13, t13) {
                        let r12 = new H.RequestCookies(ea.from(e13));
                        return em.wrap(r12, t13);
                      }(t12.headers, n4 || (r11 ? c4 : void 0));
                      eX(t12, e12), h3.mutableCookies = e12;
                    }
                    return h3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!h3.userspaceMutableCookies) {
                      let e12 = function(e13) {
                        let t13 = new Proxy(e13, { get(e14, r12, s13) {
                          switch (r12) {
                            case "delete":
                              return function(...r13) {
                                return ew("cookies().delete"), e14.delete(...r13), t13;
                              };
                            case "set":
                              return function(...r13) {
                                return ew("cookies().set"), e14.set(...r13), t13;
                              };
                            default:
                              return J.get(e14, r12, s13);
                          }
                        } });
                        return t13;
                      }(this.mutableCookies);
                      h3.userspaceMutableCookies = e12;
                    }
                    return h3.userspaceMutableCookies;
                  }, get draftMode() {
                    return h3.draftMode || (h3.draftMode = new eJ(o3, t12, this.cookies, this.mutableCookies)), h3.draftMode;
                  }, renderResumeDataCache: a4 ?? null, isHmrRefresh: l4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache };
                }("action", h2, void 0, u3, c3, d3, void 0, f3, false, void 0)), m3 = function({ page: e11, fallbackRouteParams: t12, renderOpts: r11, requestEndedState: s12, isPrefetchRequest: i3 }) {
                  var n4;
                  let a4 = { isStaticGeneration: !r11.supportsDynamicResponse && !r11.isDraftMode && !r11.isServerAction, page: e11, fallbackRouteParams: t12, route: (n4 = e11.split("/").reduce((e12, t13, r12, s13) => t13 ? "(" === t13[0] && t13.endsWith(")") || "@" === t13[0] || ("page" === t13 || "route" === t13) && r12 === s13.length - 1 ? e12 : e12 + "/" + t13 : e12, "")).startsWith("/") ? n4 : "/" + n4, incrementalCache: r11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r11.cacheLifeProfiles, isRevalidate: r11.isRevalidate, isPrerendering: r11.nextExport, fetchCache: r11.fetchCache, isOnDemandRevalidate: r11.isOnDemandRevalidate, isDraftMode: r11.isDraftMode, requestEndedState: s12, isPrefetchRequest: i3, buildId: r11.buildId, reactLoadableManifest: (null == r11 ? void 0 : r11.reactLoadableManifest) || {}, assetPrefix: (null == r11 ? void 0 : r11.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t13, onClose: r12, onAfterTaskError: s13 } = e12;
                    return new e8({ waitUntil: t13, onClose: r12, onTaskError: s13 });
                  }(r11) };
                  return r11.store = a4, a4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (n3 = e10.request.nextConfig) ? void 0 : null == (s11 = n3.experimental) ? void 0 : s11.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (l3 = e10.request.nextConfig) ? void 0 : null == (a3 = l3.experimental) ? void 0 : a3.authInterrupts) }, buildId: o2 ?? "", supportsDynamicResponse: true, waitUntil: t11, onClose: r10.onClose.bind(r10), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: h2.headers.has(et) });
                return await eh.run(m3, () => ed.run(g3, e10.handler, h2, p2));
              } finally {
                setTimeout(() => {
                  r10.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(h2, p2);
        })) && !(s10 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        s10 && i2 && s10.headers.set("set-cookie", i2);
        let f2 = null == s10 ? void 0 : s10.headers.get("x-middleware-rewrite");
        if (s10 && f2 && !n2) {
          let t11 = new K(f2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t11.host === h2.nextUrl.host && (t11.buildId = o2 || t11.buildId, s10.headers.set("x-middleware-rewrite", String(t11)));
          let r10 = ee(String(t11), String(a2));
          l2 && s10.headers.set("x-nextjs-rewrite", r10);
        }
        let g2 = null == s10 ? void 0 : s10.headers.get("Location");
        if (s10 && g2 && !n2) {
          let t11 = new K(g2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          s10 = new Response(s10.body, s10), t11.host === h2.nextUrl.host && (t11.buildId = o2 || t11.buildId, s10.headers.set("Location", String(t11))), l2 && (s10.headers.delete("Location"), s10.headers.set("x-nextjs-redirect", ee(String(t11), String(a2))));
        }
        let m2 = s10 || Z.next(), w2 = m2.headers.get("x-middleware-override-headers"), v2 = [];
        if (w2) {
          for (let [e11, t11] of c2) m2.headers.set(`x-middleware-request-${e11}`, t11), v2.push(e11);
          v2.length > 0 && m2.headers.set("x-middleware-override-headers", w2 + "," + v2.join(","));
        }
        return { response: m2, waitUntil: ("internal" === p2[j].kind ? Promise.all(p2[j].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: h2.fetchMetrics };
      }
      r(113), "undefined" == typeof URLPattern || URLPattern, r(886).unstable_postpone;
      if (false === function(e10) {
        return e10.includes("needs to bail out of prerendering at this point because it used") && e10.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error")) throw Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js");
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
      let to = ["en", "zh", "hi", "es", "ar", "fr", "bn", "pt", "ru", "ur", "id", "de", "ja", "sw", "mr", "te", "tr", "ta", "vi", "ko", "it", "th", "gu", "pl", "uk", "fa", "ml", "kn", "or", "my"];
      var tl = r(896);
      function tu() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      let tc = { path: "/", sameSite: "lax", httpOnly: false, maxAge: 3456e4 }, th = /^(.*)[.](0|[1-9][0-9]*)$/;
      function td(e10, t10) {
        if (e10 === t10) return true;
        let r10 = e10.match(th);
        return !!r10 && r10[1] === t10;
      }
      function tp(e10, t10, r10) {
        let s10 = r10 ?? 3180, i2 = encodeURIComponent(t10);
        if (i2.length <= s10) return [{ name: e10, value: t10 }];
        let n2 = [];
        for (; i2.length > 0; ) {
          let e11 = i2.slice(0, s10), t11 = e11.lastIndexOf("%");
          t11 > s10 - 3 && (e11 = e11.slice(0, t11));
          let r11 = "";
          for (; e11.length > 0; ) try {
            r11 = decodeURIComponent(e11);
            break;
          } catch (t12) {
            if (t12 instanceof URIError && "%" === e11.at(-3) && e11.length > 3) e11 = e11.slice(0, e11.length - 3);
            else throw t12;
          }
          n2.push(r11), i2 = i2.slice(e11.length);
        }
        return n2.map((t11, r11) => ({ name: `${e10}.${r11}`, value: t11 }));
      }
      async function tf(e10, t10) {
        let r10 = await t10(e10);
        if (r10) return r10;
        let s10 = [];
        for (let r11 = 0; ; r11++) {
          let i2 = `${e10}.${r11}`, n2 = await t10(i2);
          if (!n2) break;
          s10.push(n2);
        }
        return s10.length > 0 ? s10.join("") : null;
      }
      let tg = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), tm = " 	\n\r=".split(""), tw = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < tm.length; t10 += 1) e10[tm[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < tg.length; t10 += 1) e10[tg[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function tv(e10) {
        let t10 = [], r10 = 0, s10 = 0;
        if (function(e11, t11) {
          for (let r11 = 0; r11 < e11.length; r11 += 1) {
            let s11 = e11.charCodeAt(r11);
            if (s11 > 55295 && s11 <= 56319) {
              let t12 = (s11 - 55296) * 1024 & 65535;
              s11 = (e11.charCodeAt(r11 + 1) - 56320 & 65535 | t12) + 65536, r11 += 1;
            }
            !function(e12, t12) {
              if (e12 <= 127) {
                t12(e12);
                return;
              }
              if (e12 <= 2047) {
                t12(192 | e12 >> 6), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 65535) {
                t12(224 | e12 >> 12), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 1114111) {
                t12(240 | e12 >> 18), t12(128 | e12 >> 12 & 63), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              throw Error(`Unrecognized Unicode codepoint: ${e12.toString(16)}`);
            }(s11, t11);
          }
        }(e10, (e11) => {
          for (r10 = r10 << 8 | e11, s10 += 8; s10 >= 6; ) {
            let e12 = r10 >> s10 - 6 & 63;
            t10.push(tg[e12]), s10 -= 6;
          }
        }), s10 > 0) for (r10 <<= 6 - s10, s10 = 6; s10 >= 6; ) {
          let e11 = r10 >> s10 - 6 & 63;
          t10.push(tg[e11]), s10 -= 6;
        }
        return t10.join("");
      }
      function tb(e10) {
        let t10 = [], r10 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, s10 = { utf8seq: 0, codepoint: 0 }, i2 = 0, n2 = 0;
        for (let t11 = 0; t11 < e10.length; t11 += 1) {
          let a2 = tw[e10.charCodeAt(t11)];
          if (a2 > -1) for (i2 = i2 << 6 | a2, n2 += 6; n2 >= 8; ) (function(e11, t12, r11) {
            if (0 === t12.utf8seq) {
              if (e11 <= 127) {
                r11(e11);
                return;
              }
              for (let r12 = 1; r12 < 6; r12 += 1) if ((e11 >> 7 - r12 & 1) == 0) {
                t12.utf8seq = r12;
                break;
              }
              if (2 === t12.utf8seq) t12.codepoint = 31 & e11;
              else if (3 === t12.utf8seq) t12.codepoint = 15 & e11;
              else if (4 === t12.utf8seq) t12.codepoint = 7 & e11;
              else throw Error("Invalid UTF-8 sequence");
              t12.utf8seq -= 1;
            } else if (t12.utf8seq > 0) {
              if (e11 <= 127) throw Error("Invalid UTF-8 sequence");
              t12.codepoint = t12.codepoint << 6 | 63 & e11, t12.utf8seq -= 1, 0 === t12.utf8seq && r11(t12.codepoint);
            }
          })(i2 >> n2 - 8 & 255, s10, r10), n2 -= 8;
          else if (-2 === a2) continue;
          else throw Error(`Invalid Base64-URL character "${e10.at(t11)}" at position ${t11}`);
        }
        return t10.join("");
      }
      let ty = "base64-";
      async function t_({ getAll: e10, setAll: t10, setItems: r10, removedItems: s10 }, i2) {
        let n2 = i2.cookieEncoding, a2 = i2.cookieOptions ?? null, o2 = await e10([...r10 ? Object.keys(r10) : [], ...s10 ? Object.keys(s10) : []]), l2 = o2?.map(({ name: e11 }) => e11) || [], u2 = Object.keys(s10).flatMap((e11) => l2.filter((t11) => td(t11, e11))), c2 = Object.keys(r10).flatMap((e11) => {
          let t11 = new Set(l2.filter((t12) => td(t12, e11))), s11 = r10[e11];
          "base64url" === n2 && (s11 = ty + tv(s11));
          let i3 = tp(e11, s11);
          return i3.forEach((e12) => {
            t11.delete(e12.name);
          }), u2.push(...t11), i3;
        }), h2 = { ...tc, ...a2, maxAge: 0 }, d2 = { ...tc, ...a2, maxAge: tc.maxAge };
        delete h2.name, delete d2.name, await t10([...u2.map((e11) => ({ name: e11, value: "", options: h2 })), ...c2.map(({ name: e11, value: t11 }) => ({ name: e11, value: t11, options: d2 }))]);
      }
      function tS(e10, t10) {
        var r10 = {};
        for (var s10 in e10) Object.prototype.hasOwnProperty.call(e10, s10) && 0 > t10.indexOf(s10) && (r10[s10] = e10[s10]);
        if (null != e10 && "function" == typeof Object.getOwnPropertySymbols) for (var i2 = 0, s10 = Object.getOwnPropertySymbols(e10); i2 < s10.length; i2++) 0 > t10.indexOf(s10[i2]) && Object.prototype.propertyIsEnumerable.call(e10, s10[i2]) && (r10[s10[i2]] = e10[s10[i2]]);
        return r10;
      }
      Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
      let tE = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11);
      class tk extends Error {
        constructor(e10, t10 = "FunctionsError", r10) {
          super(e10), this.name = t10, this.context = r10;
        }
      }
      class tT extends tk {
        constructor(e10) {
          super("Failed to send a request to the Edge Function", "FunctionsFetchError", e10);
        }
      }
      class tO extends tk {
        constructor(e10) {
          super("Relay Error invoking the Edge Function", "FunctionsRelayError", e10);
        }
      }
      class tR extends tk {
        constructor(e10) {
          super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e10);
        }
      }
      !function(e10) {
        e10.Any = "any", e10.ApNortheast1 = "ap-northeast-1", e10.ApNortheast2 = "ap-northeast-2", e10.ApSouth1 = "ap-south-1", e10.ApSoutheast1 = "ap-southeast-1", e10.ApSoutheast2 = "ap-southeast-2", e10.CaCentral1 = "ca-central-1", e10.EuCentral1 = "eu-central-1", e10.EuWest1 = "eu-west-1", e10.EuWest2 = "eu-west-2", e10.EuWest3 = "eu-west-3", e10.SaEast1 = "sa-east-1", e10.UsEast1 = "us-east-1", e10.UsWest1 = "us-west-1", e10.UsWest2 = "us-west-2";
      }(n || (n = {}));
      class tx {
        constructor(e10, { headers: t10 = {}, customFetch: r10, region: s10 = n.Any } = {}) {
          this.url = e10, this.headers = t10, this.region = s10, this.fetch = tE(r10);
        }
        setAuth(e10) {
          this.headers.Authorization = `Bearer ${e10}`;
        }
        invoke(e10) {
          var t10, r10, s10, i2;
          return t10 = this, r10 = arguments, s10 = void 0, i2 = function* (e11, t11 = {}) {
            var r11;
            let s11, i3;
            try {
              let n2;
              let { headers: a2, method: o2, body: l2, signal: u2, timeout: c2 } = t11, h2 = {}, { region: d2 } = t11;
              d2 || (d2 = this.region);
              let p2 = new URL(`${this.url}/${e11}`);
              d2 && "any" !== d2 && (h2["x-region"] = d2, p2.searchParams.set("forceFunctionRegion", d2)), l2 && (a2 && !Object.prototype.hasOwnProperty.call(a2, "Content-Type") || !a2) ? "undefined" != typeof Blob && l2 instanceof Blob || l2 instanceof ArrayBuffer ? (h2["Content-Type"] = "application/octet-stream", n2 = l2) : "string" == typeof l2 ? (h2["Content-Type"] = "text/plain", n2 = l2) : "undefined" != typeof FormData && l2 instanceof FormData ? n2 = l2 : (h2["Content-Type"] = "application/json", n2 = JSON.stringify(l2)) : n2 = l2;
              let f2 = u2;
              c2 && (i3 = new AbortController(), s11 = setTimeout(() => i3.abort(), c2), u2 ? (f2 = i3.signal, u2.addEventListener("abort", () => i3.abort())) : f2 = i3.signal);
              let g2 = yield this.fetch(p2.toString(), { method: o2 || "POST", headers: Object.assign(Object.assign(Object.assign({}, h2), this.headers), a2), body: n2, signal: f2 }).catch((e12) => {
                throw new tT(e12);
              }), m2 = g2.headers.get("x-relay-error");
              if (m2 && "true" === m2) throw new tO(g2);
              if (!g2.ok) throw new tR(g2);
              let w2 = (null !== (r11 = g2.headers.get("Content-Type")) && void 0 !== r11 ? r11 : "text/plain").split(";")[0].trim();
              return { data: "application/json" === w2 ? yield g2.json() : "application/octet-stream" === w2 || "application/pdf" === w2 ? yield g2.blob() : "text/event-stream" === w2 ? g2 : "multipart/form-data" === w2 ? yield g2.formData() : yield g2.text(), error: null, response: g2 };
            } catch (e12) {
              return { data: null, error: e12, response: e12 instanceof tR || e12 instanceof tO ? e12.context : void 0 };
            } finally {
              s11 && clearTimeout(s11);
            }
          }, new (s10 || (s10 = Promise))(function(e11, n2) {
            function a2(e12) {
              try {
                l2(i2.next(e12));
              } catch (e13) {
                n2(e13);
              }
            }
            function o2(e12) {
              try {
                l2(i2.throw(e12));
              } catch (e13) {
                n2(e13);
              }
            }
            function l2(t11) {
              var r11;
              t11.done ? e11(t11.value) : ((r11 = t11.value) instanceof s10 ? r11 : new s10(function(e12) {
                e12(r11);
              })).then(a2, o2);
            }
            l2((i2 = i2.apply(t10, r10 || [])).next());
          });
        }
      }
      var tC = class extends Error {
        constructor(e10) {
          super(e10.message), this.name = "PostgrestError", this.details = e10.details, this.hint = e10.hint, this.code = e10.code;
        }
      }, tP = class {
        constructor(e10) {
          var t10, r10;
          this.shouldThrowOnError = false, this.method = e10.method, this.url = e10.url, this.headers = new Headers(e10.headers), this.schema = e10.schema, this.body = e10.body, this.shouldThrowOnError = null !== (t10 = e10.shouldThrowOnError) && void 0 !== t10 && t10, this.signal = e10.signal, this.isMaybeSingle = null !== (r10 = e10.isMaybeSingle) && void 0 !== r10 && r10, e10.fetch ? this.fetch = e10.fetch : this.fetch = fetch;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        setHeader(e10, t10) {
          return this.headers = new Headers(this.headers), this.headers.set(e10, t10), this;
        }
        then(e10, t10) {
          var r10 = this;
          void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), "GET" !== this.method && "HEAD" !== this.method && this.headers.set("Content-Type", "application/json");
          let s10 = (0, this.fetch)(this.url.toString(), { method: this.method, headers: this.headers, body: JSON.stringify(this.body), signal: this.signal }).then(async (e11) => {
            var t11, s11, i2, n2;
            let a2 = null, o2 = null, l2 = null, u2 = e11.status, c2 = e11.statusText;
            if (e11.ok) {
              if ("HEAD" !== r10.method) {
                let t12 = await e11.text();
                "" === t12 || (o2 = "text/csv" === r10.headers.get("Accept") ? t12 : r10.headers.get("Accept") && (null === (i2 = r10.headers.get("Accept")) || void 0 === i2 ? void 0 : i2.includes("application/vnd.pgrst.plan+text")) ? t12 : JSON.parse(t12));
              }
              let n3 = null === (t11 = r10.headers.get("Prefer")) || void 0 === t11 ? void 0 : t11.match(/count=(exact|planned|estimated)/), h2 = null === (s11 = e11.headers.get("content-range")) || void 0 === s11 ? void 0 : s11.split("/");
              n3 && h2 && h2.length > 1 && (l2 = parseInt(h2[1])), r10.isMaybeSingle && "GET" === r10.method && Array.isArray(o2) && (o2.length > 1 ? (a2 = { code: "PGRST116", details: `Results contain ${o2.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, o2 = null, l2 = null, u2 = 406, c2 = "Not Acceptable") : o2 = 1 === o2.length ? o2[0] : null);
            } else {
              let t12 = await e11.text();
              try {
                a2 = JSON.parse(t12), Array.isArray(a2) && 404 === e11.status && (o2 = [], a2 = null, u2 = 200, c2 = "OK");
              } catch (r11) {
                404 === e11.status && "" === t12 ? (u2 = 204, c2 = "No Content") : a2 = { message: t12 };
              }
              if (a2 && r10.isMaybeSingle && (null == a2 || null === (n2 = a2.details) || void 0 === n2 ? void 0 : n2.includes("0 rows")) && (a2 = null, u2 = 200, c2 = "OK"), a2 && r10.shouldThrowOnError) throw new tC(a2);
            }
            return { error: a2, data: o2, count: l2, status: u2, statusText: c2 };
          });
          return this.shouldThrowOnError || (s10 = s10.catch((e11) => {
            var t11, r11, s11, i2, n2, a2;
            let o2 = "", l2 = null == e11 ? void 0 : e11.cause;
            if (l2) {
              let t12 = null !== (r11 = null == l2 ? void 0 : l2.message) && void 0 !== r11 ? r11 : "", a3 = null !== (s11 = null == l2 ? void 0 : l2.code) && void 0 !== s11 ? s11 : "";
              o2 = `${null !== (i2 = null == e11 ? void 0 : e11.name) && void 0 !== i2 ? i2 : "FetchError"}: ${null == e11 ? void 0 : e11.message}

Caused by: ${null !== (n2 = null == l2 ? void 0 : l2.name) && void 0 !== n2 ? n2 : "Error"}: ${t12}`, a3 && (o2 += ` (${a3})`), (null == l2 ? void 0 : l2.stack) && (o2 += `
${l2.stack}`);
            } else o2 = null !== (a2 = null == e11 ? void 0 : e11.stack) && void 0 !== a2 ? a2 : "";
            return { error: { message: `${null !== (t11 = null == e11 ? void 0 : e11.name) && void 0 !== t11 ? t11 : "FetchError"}: ${null == e11 ? void 0 : e11.message}`, details: o2, hint: "", code: "" }, data: null, count: null, status: 0, statusText: "" };
          })), s10.then(e10, t10);
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      }, tA = class extends tP {
        select(e10) {
          let t10 = false, r10 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !t10 ? "" : ('"' === e11 && (t10 = !t10), e11)).join("");
          return this.url.searchParams.set("select", r10), this.headers.append("Prefer", "return=representation"), this;
        }
        order(e10, { ascending: t10 = true, nullsFirst: r10, foreignTable: s10, referencedTable: i2 = s10 } = {}) {
          let n2 = i2 ? `${i2}.order` : "order", a2 = this.url.searchParams.get(n2);
          return this.url.searchParams.set(n2, `${a2 ? `${a2},` : ""}${e10}.${t10 ? "asc" : "desc"}${void 0 === r10 ? "" : r10 ? ".nullsfirst" : ".nullslast"}`), this;
        }
        limit(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let s10 = void 0 === r10 ? "limit" : `${r10}.limit`;
          return this.url.searchParams.set(s10, `${e10}`), this;
        }
        range(e10, t10, { foreignTable: r10, referencedTable: s10 = r10 } = {}) {
          let i2 = void 0 === s10 ? "offset" : `${s10}.offset`, n2 = void 0 === s10 ? "limit" : `${s10}.limit`;
          return this.url.searchParams.set(i2, `${e10}`), this.url.searchParams.set(n2, `${t10 - e10 + 1}`), this;
        }
        abortSignal(e10) {
          return this.signal = e10, this;
        }
        single() {
          return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
        }
        maybeSingle() {
          return "GET" === this.method ? this.headers.set("Accept", "application/json") : this.headers.set("Accept", "application/vnd.pgrst.object+json"), this.isMaybeSingle = true, this;
        }
        csv() {
          return this.headers.set("Accept", "text/csv"), this;
        }
        geojson() {
          return this.headers.set("Accept", "application/geo+json"), this;
        }
        explain({ analyze: e10 = false, verbose: t10 = false, settings: r10 = false, buffers: s10 = false, wal: i2 = false, format: n2 = "text" } = {}) {
          var a2;
          let o2 = [e10 ? "analyze" : null, t10 ? "verbose" : null, r10 ? "settings" : null, s10 ? "buffers" : null, i2 ? "wal" : null].filter(Boolean).join("|"), l2 = null !== (a2 = this.headers.get("Accept")) && void 0 !== a2 ? a2 : "application/json";
          return this.headers.set("Accept", `application/vnd.pgrst.plan+${n2}; for="${l2}"; options=${o2};`), this;
        }
        rollback() {
          return this.headers.append("Prefer", "tx=rollback"), this;
        }
        returns() {
          return this;
        }
        maxAffected(e10) {
          return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e10}`), this;
        }
      };
      let tI = RegExp("[,()]");
      var tj = class extends tA {
        eq(e10, t10) {
          return this.url.searchParams.append(e10, `eq.${t10}`), this;
        }
        neq(e10, t10) {
          return this.url.searchParams.append(e10, `neq.${t10}`), this;
        }
        gt(e10, t10) {
          return this.url.searchParams.append(e10, `gt.${t10}`), this;
        }
        gte(e10, t10) {
          return this.url.searchParams.append(e10, `gte.${t10}`), this;
        }
        lt(e10, t10) {
          return this.url.searchParams.append(e10, `lt.${t10}`), this;
        }
        lte(e10, t10) {
          return this.url.searchParams.append(e10, `lte.${t10}`), this;
        }
        like(e10, t10) {
          return this.url.searchParams.append(e10, `like.${t10}`), this;
        }
        likeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(all).{${t10.join(",")}}`), this;
        }
        likeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `like(any).{${t10.join(",")}}`), this;
        }
        ilike(e10, t10) {
          return this.url.searchParams.append(e10, `ilike.${t10}`), this;
        }
        ilikeAllOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(all).{${t10.join(",")}}`), this;
        }
        ilikeAnyOf(e10, t10) {
          return this.url.searchParams.append(e10, `ilike(any).{${t10.join(",")}}`), this;
        }
        regexMatch(e10, t10) {
          return this.url.searchParams.append(e10, `match.${t10}`), this;
        }
        regexIMatch(e10, t10) {
          return this.url.searchParams.append(e10, `imatch.${t10}`), this;
        }
        is(e10, t10) {
          return this.url.searchParams.append(e10, `is.${t10}`), this;
        }
        isDistinct(e10, t10) {
          return this.url.searchParams.append(e10, `isdistinct.${t10}`), this;
        }
        in(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && tI.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `in.(${r10})`), this;
        }
        notIn(e10, t10) {
          let r10 = Array.from(new Set(t10)).map((e11) => "string" == typeof e11 && tI.test(e11) ? `"${e11}"` : `${e11}`).join(",");
          return this.url.searchParams.append(e10, `not.in.(${r10})`), this;
        }
        contains(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cs.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cs.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cs.${JSON.stringify(t10)}`), this;
        }
        containedBy(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `cd.${t10}`) : Array.isArray(t10) ? this.url.searchParams.append(e10, `cd.{${t10.join(",")}}`) : this.url.searchParams.append(e10, `cd.${JSON.stringify(t10)}`), this;
        }
        rangeGt(e10, t10) {
          return this.url.searchParams.append(e10, `sr.${t10}`), this;
        }
        rangeGte(e10, t10) {
          return this.url.searchParams.append(e10, `nxl.${t10}`), this;
        }
        rangeLt(e10, t10) {
          return this.url.searchParams.append(e10, `sl.${t10}`), this;
        }
        rangeLte(e10, t10) {
          return this.url.searchParams.append(e10, `nxr.${t10}`), this;
        }
        rangeAdjacent(e10, t10) {
          return this.url.searchParams.append(e10, `adj.${t10}`), this;
        }
        overlaps(e10, t10) {
          return "string" == typeof t10 ? this.url.searchParams.append(e10, `ov.${t10}`) : this.url.searchParams.append(e10, `ov.{${t10.join(",")}}`), this;
        }
        textSearch(e10, t10, { config: r10, type: s10 } = {}) {
          let i2 = "";
          "plain" === s10 ? i2 = "pl" : "phrase" === s10 ? i2 = "ph" : "websearch" === s10 && (i2 = "w");
          let n2 = void 0 === r10 ? "" : `(${r10})`;
          return this.url.searchParams.append(e10, `${i2}fts${n2}.${t10}`), this;
        }
        match(e10) {
          return Object.entries(e10).forEach(([e11, t10]) => {
            this.url.searchParams.append(e11, `eq.${t10}`);
          }), this;
        }
        not(e10, t10, r10) {
          return this.url.searchParams.append(e10, `not.${t10}.${r10}`), this;
        }
        or(e10, { foreignTable: t10, referencedTable: r10 = t10 } = {}) {
          let s10 = r10 ? `${r10}.or` : "or";
          return this.url.searchParams.append(s10, `(${e10})`), this;
        }
        filter(e10, t10, r10) {
          return this.url.searchParams.append(e10, `${t10}.${r10}`), this;
        }
      }, tN = class {
        constructor(e10, { headers: t10 = {}, schema: r10, fetch: s10 }) {
          this.url = e10, this.headers = new Headers(t10), this.schema = r10, this.fetch = s10;
        }
        select(e10, t10) {
          let { head: r10 = false, count: s10 } = null != t10 ? t10 : {}, i2 = false, n2 = (null != e10 ? e10 : "*").split("").map((e11) => /\s/.test(e11) && !i2 ? "" : ('"' === e11 && (i2 = !i2), e11)).join("");
          return this.url.searchParams.set("select", n2), s10 && this.headers.append("Prefer", `count=${s10}`), new tj({ method: r10 ? "HEAD" : "GET", url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch });
        }
        insert(e10, { count: t10, defaultToNull: r10 = true } = {}) {
          var s10;
          if (t10 && this.headers.append("Prefer", `count=${t10}`), r10 || this.headers.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              this.url.searchParams.set("columns", e11.join(","));
            }
          }
          return new tj({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e10, fetch: null !== (s10 = this.fetch) && void 0 !== s10 ? s10 : fetch });
        }
        upsert(e10, { onConflict: t10, ignoreDuplicates: r10 = false, count: s10, defaultToNull: i2 = true } = {}) {
          var n2;
          if (this.headers.append("Prefer", `resolution=${r10 ? "ignore" : "merge"}-duplicates`), void 0 !== t10 && this.url.searchParams.set("on_conflict", t10), s10 && this.headers.append("Prefer", `count=${s10}`), i2 || this.headers.append("Prefer", "missing=default"), Array.isArray(e10)) {
            let t11 = e10.reduce((e11, t12) => e11.concat(Object.keys(t12)), []);
            if (t11.length > 0) {
              let e11 = [...new Set(t11)].map((e12) => `"${e12}"`);
              this.url.searchParams.set("columns", e11.join(","));
            }
          }
          return new tj({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e10, fetch: null !== (n2 = this.fetch) && void 0 !== n2 ? n2 : fetch });
        }
        update(e10, { count: t10 } = {}) {
          var r10;
          return t10 && this.headers.append("Prefer", `count=${t10}`), new tj({ method: "PATCH", url: this.url, headers: this.headers, schema: this.schema, body: e10, fetch: null !== (r10 = this.fetch) && void 0 !== r10 ? r10 : fetch });
        }
        delete({ count: e10 } = {}) {
          var t10;
          return e10 && this.headers.append("Prefer", `count=${e10}`), new tj({ method: "DELETE", url: this.url, headers: this.headers, schema: this.schema, fetch: null !== (t10 = this.fetch) && void 0 !== t10 ? t10 : fetch });
        }
      }, t$ = class e10 {
        constructor(e11, { headers: t10 = {}, schema: r10, fetch: s10 } = {}) {
          this.url = e11, this.headers = new Headers(t10), this.schemaName = r10, this.fetch = s10;
        }
        from(e11) {
          if (!e11 || "string" != typeof e11 || "" === e11.trim()) throw Error("Invalid relation name: relation must be a non-empty string.");
          return new tN(new URL(`${this.url}/${e11}`), { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch });
        }
        schema(t10) {
          return new e10(this.url, { headers: this.headers, schema: t10, fetch: this.fetch });
        }
        rpc(e11, t10 = {}, { head: r10 = false, get: s10 = false, count: i2 } = {}) {
          var n2;
          let a2, o2;
          let l2 = new URL(`${this.url}/rpc/${e11}`);
          r10 || s10 ? (a2 = r10 ? "HEAD" : "GET", Object.entries(t10).filter(([e12, t11]) => void 0 !== t11).map(([e12, t11]) => [e12, Array.isArray(t11) ? `{${t11.join(",")}}` : `${t11}`]).forEach(([e12, t11]) => {
            l2.searchParams.append(e12, t11);
          })) : (a2 = "POST", o2 = t10);
          let u2 = new Headers(this.headers);
          return i2 && u2.set("Prefer", `count=${i2}`), new tj({ method: a2, url: l2, headers: u2, schema: this.schemaName, body: o2, fetch: null !== (n2 = this.fetch) && void 0 !== n2 ? n2 : fetch });
        }
      };
      class tL {
        constructor() {
        }
        static detectEnvironment() {
          var e10;
          if ("undefined" != typeof WebSocket) return { type: "native", constructor: WebSocket };
          if ("undefined" != typeof globalThis && void 0 !== globalThis.WebSocket) return { type: "native", constructor: globalThis.WebSocket };
          if (void 0 !== r.g && void 0 !== r.g.WebSocket) return { type: "native", constructor: r.g.WebSocket };
          if ("undefined" != typeof globalThis && void 0 !== globalThis.WebSocketPair && void 0 === globalThis.WebSocket) return { type: "cloudflare", error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.", workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime." };
          if ("undefined" != typeof globalThis && globalThis.EdgeRuntime || "undefined" != typeof navigator && (null === (e10 = navigator.userAgent) || void 0 === e10 ? void 0 : e10.includes("Vercel-Edge"))) return { type: "unsupported", error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.", workaround: "Use serverless functions or a different deployment target for WebSocket functionality." };
          if ("undefined" != typeof process) {
            let e11 = process.versions;
            if (e11 && e11.node) {
              let t10 = parseInt(e11.node.replace(/^v/, "").split(".")[0]);
              return t10 >= 22 ? void 0 !== globalThis.WebSocket ? { type: "native", constructor: globalThis.WebSocket } : { type: "unsupported", error: `Node.js ${t10} detected but native WebSocket not found.`, workaround: "Provide a WebSocket implementation via the transport option." } : { type: "unsupported", error: `Node.js ${t10} detected without native WebSocket support.`, workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })' };
            }
          }
          return { type: "unsupported", error: "Unknown JavaScript runtime without WebSocket support.", workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation." };
        }
        static getWebSocketConstructor() {
          let e10 = this.detectEnvironment();
          if (e10.constructor) return e10.constructor;
          let t10 = e10.error || "WebSocket not supported in this environment.";
          throw e10.workaround && (t10 += `

Suggested solution: ${e10.workaround}`), Error(t10);
        }
        static createWebSocket(e10, t10) {
          return new (this.getWebSocketConstructor())(e10, t10);
        }
        static isWebSocketSupported() {
          try {
            let e10 = this.detectEnvironment();
            return "native" === e10.type || "ws" === e10.type;
          } catch (e10) {
            return false;
          }
        }
      }
      let tU = "1.0.0";
      !function(e10) {
        e10[e10.connecting = 0] = "connecting", e10[e10.open = 1] = "open", e10[e10.closing = 2] = "closing", e10[e10.closed = 3] = "closed";
      }(a || (a = {})), function(e10) {
        e10.closed = "closed", e10.errored = "errored", e10.joined = "joined", e10.joining = "joining", e10.leaving = "leaving";
      }(o || (o = {})), function(e10) {
        e10.close = "phx_close", e10.error = "phx_error", e10.join = "phx_join", e10.reply = "phx_reply", e10.leave = "phx_leave", e10.access_token = "access_token";
      }(l || (l = {})), (u || (u = {})).websocket = "websocket", function(e10) {
        e10.Connecting = "connecting", e10.Open = "open", e10.Closing = "closing", e10.Closed = "closed";
      }(c || (c = {}));
      class tD {
        constructor(e10) {
          this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = null != e10 ? e10 : [];
        }
        encode(e10, t10) {
          return e10.event !== this.BROADCAST_EVENT || e10.payload instanceof ArrayBuffer || "string" != typeof e10.payload.event ? t10(JSON.stringify([e10.join_ref, e10.ref, e10.topic, e10.event, e10.payload])) : t10(this._binaryEncodeUserBroadcastPush(e10));
        }
        _binaryEncodeUserBroadcastPush(e10) {
          var t10;
          return this._isArrayBuffer(null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) ? this._encodeBinaryUserBroadcastPush(e10) : this._encodeJsonUserBroadcastPush(e10);
        }
        _encodeBinaryUserBroadcastPush(e10) {
          var t10, r10;
          let s10 = null !== (r10 = null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) && void 0 !== r10 ? r10 : new ArrayBuffer(0);
          return this._encodeUserBroadcastPush(e10, this.BINARY_ENCODING, s10);
        }
        _encodeJsonUserBroadcastPush(e10) {
          var t10, r10;
          let s10 = null !== (r10 = null === (t10 = e10.payload) || void 0 === t10 ? void 0 : t10.payload) && void 0 !== r10 ? r10 : {}, i2 = new TextEncoder().encode(JSON.stringify(s10)).buffer;
          return this._encodeUserBroadcastPush(e10, this.JSON_ENCODING, i2);
        }
        _encodeUserBroadcastPush(e10, t10, r10) {
          let s10 = e10.topic, i2 = null !== (p2 = e10.ref) && void 0 !== p2 ? p2 : "", n2 = null !== (f2 = e10.join_ref) && void 0 !== f2 ? f2 : "", a2 = e10.payload.event, o2 = this.allowedMetadataKeys ? this._pick(e10.payload, this.allowedMetadataKeys) : {}, l2 = 0 === Object.keys(o2).length ? "" : JSON.stringify(o2);
          if (n2.length > 255) throw Error(`joinRef length ${n2.length} exceeds maximum of 255`);
          if (i2.length > 255) throw Error(`ref length ${i2.length} exceeds maximum of 255`);
          if (s10.length > 255) throw Error(`topic length ${s10.length} exceeds maximum of 255`);
          if (a2.length > 255) throw Error(`userEvent length ${a2.length} exceeds maximum of 255`);
          if (l2.length > 255) throw Error(`metadata length ${l2.length} exceeds maximum of 255`);
          let u2 = this.USER_BROADCAST_PUSH_META_LENGTH + n2.length + i2.length + s10.length + a2.length + l2.length, c2 = new ArrayBuffer(this.HEADER_LENGTH + u2), h2 = new DataView(c2), d2 = 0;
          h2.setUint8(d2++, this.KINDS.userBroadcastPush), h2.setUint8(d2++, n2.length), h2.setUint8(d2++, i2.length), h2.setUint8(d2++, s10.length), h2.setUint8(d2++, a2.length), h2.setUint8(d2++, l2.length), h2.setUint8(d2++, t10), Array.from(n2, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(i2, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(s10, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(a2, (e11) => h2.setUint8(d2++, e11.charCodeAt(0))), Array.from(l2, (e11) => h2.setUint8(d2++, e11.charCodeAt(0)));
          var p2, f2, g2 = new Uint8Array(c2.byteLength + r10.byteLength);
          return g2.set(new Uint8Array(c2), 0), g2.set(new Uint8Array(r10), c2.byteLength), g2.buffer;
        }
        decode(e10, t10) {
          if (this._isArrayBuffer(e10)) return t10(this._binaryDecode(e10));
          if ("string" == typeof e10) {
            let [r10, s10, i2, n2, a2] = JSON.parse(e10);
            return t10({ join_ref: r10, ref: s10, topic: i2, event: n2, payload: a2 });
          }
          return t10({});
        }
        _binaryDecode(e10) {
          let t10 = new DataView(e10), r10 = t10.getUint8(0), s10 = new TextDecoder();
          if (r10 === this.KINDS.userBroadcast) return this._decodeUserBroadcast(e10, t10, s10);
        }
        _decodeUserBroadcast(e10, t10, r10) {
          let s10 = t10.getUint8(1), i2 = t10.getUint8(2), n2 = t10.getUint8(3), a2 = t10.getUint8(4), o2 = this.HEADER_LENGTH + 4, l2 = r10.decode(e10.slice(o2, o2 + s10));
          o2 += s10;
          let u2 = r10.decode(e10.slice(o2, o2 + i2));
          o2 += i2;
          let c2 = r10.decode(e10.slice(o2, o2 + n2));
          o2 += n2;
          let h2 = e10.slice(o2, e10.byteLength), d2 = a2 === this.JSON_ENCODING ? JSON.parse(r10.decode(h2)) : h2, p2 = { type: this.BROADCAST_EVENT, event: u2, payload: d2 };
          return n2 > 0 && (p2.meta = JSON.parse(c2)), { join_ref: null, ref: null, topic: l2, event: this.BROADCAST_EVENT, payload: p2 };
        }
        _isArrayBuffer(e10) {
          var t10;
          return e10 instanceof ArrayBuffer || (null === (t10 = null == e10 ? void 0 : e10.constructor) || void 0 === t10 ? void 0 : t10.name) === "ArrayBuffer";
        }
        _pick(e10, t10) {
          return e10 && "object" == typeof e10 ? Object.fromEntries(Object.entries(e10).filter(([e11]) => t10.includes(e11))) : {};
        }
      }
      class tM {
        constructor(e10, t10) {
          this.callback = e10, this.timerCalc = t10, this.timer = void 0, this.tries = 0, this.callback = e10, this.timerCalc = t10;
        }
        reset() {
          this.tries = 0, clearTimeout(this.timer), this.timer = void 0;
        }
        scheduleTimeout() {
          clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      }
      !function(e10) {
        e10.abstime = "abstime", e10.bool = "bool", e10.date = "date", e10.daterange = "daterange", e10.float4 = "float4", e10.float8 = "float8", e10.int2 = "int2", e10.int4 = "int4", e10.int4range = "int4range", e10.int8 = "int8", e10.int8range = "int8range", e10.json = "json", e10.jsonb = "jsonb", e10.money = "money", e10.numeric = "numeric", e10.oid = "oid", e10.reltime = "reltime", e10.text = "text", e10.time = "time", e10.timestamp = "timestamp", e10.timestamptz = "timestamptz", e10.timetz = "timetz", e10.tsrange = "tsrange", e10.tstzrange = "tstzrange";
      }(h || (h = {}));
      let tq = (e10, t10, r10 = {}) => {
        var s10;
        let i2 = null !== (s10 = r10.skipTypes) && void 0 !== s10 ? s10 : [];
        return t10 ? Object.keys(t10).reduce((r11, s11) => (r11[s11] = tB(s11, e10, t10, i2), r11), {}) : {};
      }, tB = (e10, t10, r10, s10) => {
        let i2 = t10.find((t11) => t11.name === e10), n2 = null == i2 ? void 0 : i2.type, a2 = r10[e10];
        return n2 && !s10.includes(n2) ? tV(n2, a2) : tW(a2);
      }, tV = (e10, t10) => {
        if ("_" === e10.charAt(0)) return tz(t10, e10.slice(1, e10.length));
        switch (e10) {
          case h.bool:
            return tG(t10);
          case h.float4:
          case h.float8:
          case h.int2:
          case h.int4:
          case h.int8:
          case h.numeric:
          case h.oid:
            return tK(t10);
          case h.json:
          case h.jsonb:
            return tH(t10);
          case h.timestamp:
            return tF(t10);
          case h.abstime:
          case h.date:
          case h.daterange:
          case h.int4range:
          case h.int8range:
          case h.money:
          case h.reltime:
          case h.text:
          case h.time:
          case h.timestamptz:
          case h.timetz:
          case h.tsrange:
          case h.tstzrange:
          default:
            return tW(t10);
        }
      }, tW = (e10) => e10, tG = (e10) => {
        switch (e10) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return e10;
        }
      }, tK = (e10) => {
        if ("string" == typeof e10) {
          let t10 = parseFloat(e10);
          if (!Number.isNaN(t10)) return t10;
        }
        return e10;
      }, tH = (e10) => {
        if ("string" == typeof e10) try {
          return JSON.parse(e10);
        } catch (e11) {
        }
        return e10;
      }, tz = (e10, t10) => {
        if ("string" != typeof e10) return e10;
        let r10 = e10.length - 1, s10 = e10[r10];
        if ("{" === e10[0] && "}" === s10) {
          let s11;
          let i2 = e10.slice(1, r10);
          try {
            s11 = JSON.parse("[" + i2 + "]");
          } catch (e11) {
            s11 = i2 ? i2.split(",") : [];
          }
          return s11.map((e11) => tV(t10, e11));
        }
        return e10;
      }, tF = (e10) => "string" == typeof e10 ? e10.replace(" ", "T") : e10, tJ = (e10) => {
        let t10 = new URL(e10);
        return t10.protocol = t10.protocol.replace(/^ws/i, "http"), t10.pathname = t10.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), "" === t10.pathname || "/" === t10.pathname ? t10.pathname = "/api/broadcast" : t10.pathname = t10.pathname + "/api/broadcast", t10.href;
      };
      class tX {
        constructor(e10, t10, r10 = {}, s10 = 1e4) {
          this.channel = e10, this.event = t10, this.payload = r10, this.timeout = s10, this.sent = false, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
        }
        resend(e10) {
          this.timeout = e10, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = false, this.send();
        }
        send() {
          this._hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload, ref: this.ref, join_ref: this.channel._joinRef() }));
        }
        updatePayload(e10) {
          this.payload = Object.assign(Object.assign({}, this.payload), e10);
        }
        receive(e10, t10) {
          var r10;
          return this._hasReceived(e10) && t10(null === (r10 = this.receivedResp) || void 0 === r10 ? void 0 : r10.response), this.recHooks.push({ status: e10, callback: t10 }), this;
        }
        startTimeout() {
          this.timeoutTimer || (this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref), this.channel._on(this.refEvent, {}, (e10) => {
            this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = e10, this._matchReceive(e10);
          }), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout));
        }
        trigger(e10, t10) {
          this.refEvent && this.channel._trigger(this.refEvent, { status: e10, response: t10 });
        }
        destroy() {
          this._cancelRefEvent(), this._cancelTimeout();
        }
        _cancelRefEvent() {
          this.refEvent && this.channel._off(this.refEvent, {});
        }
        _cancelTimeout() {
          clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
        }
        _matchReceive({ status: e10, response: t10 }) {
          this.recHooks.filter((t11) => t11.status === e10).forEach((e11) => e11.callback(t10));
        }
        _hasReceived(e10) {
          return this.receivedResp && this.receivedResp.status === e10;
        }
      }
      !function(e10) {
        e10.SYNC = "sync", e10.JOIN = "join", e10.LEAVE = "leave";
      }(d || (d = {}));
      class tY {
        constructor(e10, t10) {
          this.channel = e10, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.enabled = false, this.caller = { onJoin: () => {
          }, onLeave: () => {
          }, onSync: () => {
          } };
          let r10 = (null == t10 ? void 0 : t10.events) || { state: "presence_state", diff: "presence_diff" };
          this.channel._on(r10.state, {}, (e11) => {
            let { onJoin: t11, onLeave: r11, onSync: s10 } = this.caller;
            this.joinRef = this.channel._joinRef(), this.state = tY.syncState(this.state, e11, t11, r11), this.pendingDiffs.forEach((e12) => {
              this.state = tY.syncDiff(this.state, e12, t11, r11);
            }), this.pendingDiffs = [], s10();
          }), this.channel._on(r10.diff, {}, (e11) => {
            let { onJoin: t11, onLeave: r11, onSync: s10 } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(e11) : (this.state = tY.syncDiff(this.state, e11, t11, r11), s10());
          }), this.onJoin((e11, t11, r11) => {
            this.channel._trigger("presence", { event: "join", key: e11, currentPresences: t11, newPresences: r11 });
          }), this.onLeave((e11, t11, r11) => {
            this.channel._trigger("presence", { event: "leave", key: e11, currentPresences: t11, leftPresences: r11 });
          }), this.onSync(() => {
            this.channel._trigger("presence", { event: "sync" });
          });
        }
        static syncState(e10, t10, r10, s10) {
          let i2 = this.cloneDeep(e10), n2 = this.transformState(t10), a2 = {}, o2 = {};
          return this.map(i2, (e11, t11) => {
            n2[e11] || (o2[e11] = t11);
          }), this.map(n2, (e11, t11) => {
            let r11 = i2[e11];
            if (r11) {
              let s11 = t11.map((e12) => e12.presence_ref), i3 = r11.map((e12) => e12.presence_ref), n3 = t11.filter((e12) => 0 > i3.indexOf(e12.presence_ref)), l2 = r11.filter((e12) => 0 > s11.indexOf(e12.presence_ref));
              n3.length > 0 && (a2[e11] = n3), l2.length > 0 && (o2[e11] = l2);
            } else a2[e11] = t11;
          }), this.syncDiff(i2, { joins: a2, leaves: o2 }, r10, s10);
        }
        static syncDiff(e10, t10, r10, s10) {
          let { joins: i2, leaves: n2 } = { joins: this.transformState(t10.joins), leaves: this.transformState(t10.leaves) };
          return r10 || (r10 = () => {
          }), s10 || (s10 = () => {
          }), this.map(i2, (t11, s11) => {
            var i3;
            let n3 = null !== (i3 = e10[t11]) && void 0 !== i3 ? i3 : [];
            if (e10[t11] = this.cloneDeep(s11), n3.length > 0) {
              let r11 = e10[t11].map((e11) => e11.presence_ref), s12 = n3.filter((e11) => 0 > r11.indexOf(e11.presence_ref));
              e10[t11].unshift(...s12);
            }
            r10(t11, n3, s11);
          }), this.map(n2, (t11, r11) => {
            let i3 = e10[t11];
            if (!i3) return;
            let n3 = r11.map((e11) => e11.presence_ref);
            i3 = i3.filter((e11) => 0 > n3.indexOf(e11.presence_ref)), e10[t11] = i3, s10(t11, i3, r11), 0 === i3.length && delete e10[t11];
          }), e10;
        }
        static map(e10, t10) {
          return Object.getOwnPropertyNames(e10).map((r10) => t10(r10, e10[r10]));
        }
        static transformState(e10) {
          return Object.getOwnPropertyNames(e10 = this.cloneDeep(e10)).reduce((t10, r10) => {
            let s10 = e10[r10];
            return "metas" in s10 ? t10[r10] = s10.metas.map((e11) => (e11.presence_ref = e11.phx_ref, delete e11.phx_ref, delete e11.phx_ref_prev, e11)) : t10[r10] = s10, t10;
          }, {});
        }
        static cloneDeep(e10) {
          return JSON.parse(JSON.stringify(e10));
        }
        onJoin(e10) {
          this.caller.onJoin = e10;
        }
        onLeave(e10) {
          this.caller.onLeave = e10;
        }
        onSync(e10) {
          this.caller.onSync = e10;
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel._joinRef();
        }
      }
      !function(e10) {
        e10.ALL = "*", e10.INSERT = "INSERT", e10.UPDATE = "UPDATE", e10.DELETE = "DELETE";
      }(p || (p = {})), function(e10) {
        e10.BROADCAST = "broadcast", e10.PRESENCE = "presence", e10.POSTGRES_CHANGES = "postgres_changes", e10.SYSTEM = "system";
      }(f || (f = {})), function(e10) {
        e10.SUBSCRIBED = "SUBSCRIBED", e10.TIMED_OUT = "TIMED_OUT", e10.CLOSED = "CLOSED", e10.CHANNEL_ERROR = "CHANNEL_ERROR";
      }(g || (g = {}));
      class tQ {
        constructor(e10, t10 = { config: {} }, r10) {
          var s10, i2;
          if (this.topic = e10, this.params = t10, this.socket = r10, this.bindings = {}, this.state = o.closed, this.joinedOnce = false, this.pushBuffer = [], this.subTopic = e10.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, t10.config), this.timeout = this.socket.timeout, this.joinPush = new tX(this, l.join, this.params, this.timeout), this.rejoinTimer = new tM(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
            this.state = o.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e11) => e11.send()), this.pushBuffer = [];
          }), this._onClose(() => {
            this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = o.closed, this.socket._remove(this);
          }), this._onError((e11) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, e11), this.state = o.errored, this.rejoinTimer.scheduleTimeout());
          }), this.joinPush.receive("timeout", () => {
            this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = o.errored, this.rejoinTimer.scheduleTimeout());
          }), this.joinPush.receive("error", (e11) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, e11), this.state = o.errored, this.rejoinTimer.scheduleTimeout());
          }), this._on(l.reply, {}, (e11, t11) => {
            this._trigger(this._replyEventName(t11), e11);
          }), this.presence = new tY(this), this.broadcastEndpointURL = tJ(this.socket.endPoint), this.private = this.params.config.private || false, !this.private && (null === (i2 = null === (s10 = this.params.config) || void 0 === s10 ? void 0 : s10.broadcast) || void 0 === i2 ? void 0 : i2.replay)) throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
        }
        subscribe(e10, t10 = this.timeout) {
          var r10, s10, i2;
          if (this.socket.isConnected() || this.socket.connect(), this.state == o.closed) {
            let { config: { broadcast: n2, presence: a2, private: l2 } } = this.params, u2 = null !== (s10 = null === (r10 = this.bindings.postgres_changes) || void 0 === r10 ? void 0 : r10.map((e11) => e11.filter)) && void 0 !== s10 ? s10 : [], c2 = !!this.bindings[f.PRESENCE] && this.bindings[f.PRESENCE].length > 0 || (null === (i2 = this.params.config.presence) || void 0 === i2 ? void 0 : i2.enabled) === true, h2 = {}, d2 = { broadcast: n2, presence: Object.assign(Object.assign({}, a2), { enabled: c2 }), postgres_changes: u2, private: l2 };
            this.socket.accessTokenValue && (h2.access_token = this.socket.accessTokenValue), this._onError((t11) => null == e10 ? void 0 : e10(g.CHANNEL_ERROR, t11)), this._onClose(() => null == e10 ? void 0 : e10(g.CLOSED)), this.updateJoinPayload(Object.assign({ config: d2 }, h2)), this.joinedOnce = true, this._rejoin(t10), this.joinPush.receive("ok", async ({ postgres_changes: t11 }) => {
              var r11;
              if (this.socket._isManualToken() || this.socket.setAuth(), void 0 === t11) {
                null == e10 || e10(g.SUBSCRIBED);
                return;
              }
              {
                let s11 = this.bindings.postgres_changes, i3 = null !== (r11 = null == s11 ? void 0 : s11.length) && void 0 !== r11 ? r11 : 0, n3 = [];
                for (let r12 = 0; r12 < i3; r12++) {
                  let i4 = s11[r12], { filter: { event: a3, schema: l3, table: u3, filter: c3 } } = i4, h3 = t11 && t11[r12];
                  if (h3 && h3.event === a3 && tQ.isFilterValueEqual(h3.schema, l3) && tQ.isFilterValueEqual(h3.table, u3) && tQ.isFilterValueEqual(h3.filter, c3)) n3.push(Object.assign(Object.assign({}, i4), { id: h3.id }));
                  else {
                    this.unsubscribe(), this.state = o.errored, null == e10 || e10(g.CHANNEL_ERROR, Error("mismatch between server and client bindings for postgres changes"));
                    return;
                  }
                }
                this.bindings.postgres_changes = n3, e10 && e10(g.SUBSCRIBED);
                return;
              }
            }).receive("error", (t11) => {
              this.state = o.errored, null == e10 || e10(g.CHANNEL_ERROR, Error(JSON.stringify(Object.values(t11).join(", ") || "error")));
            }).receive("timeout", () => {
              null == e10 || e10(g.TIMED_OUT);
            });
          }
          return this;
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e10, t10 = {}) {
          return await this.send({ type: "presence", event: "track", payload: e10 }, t10.timeout || this.timeout);
        }
        async untrack(e10 = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e10);
        }
        on(e10, t10, r10) {
          return this.state === o.joined && e10 === f.PRESENCE && (this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`), this.unsubscribe().then(async () => await this.subscribe())), this._on(e10, t10, r10);
        }
        async httpSend(e10, t10, r10 = {}) {
          var s10;
          if (null == t10) return Promise.reject("Payload is required for httpSend()");
          let i2 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
          this.socket.accessTokenValue && (i2.Authorization = `Bearer ${this.socket.accessTokenValue}`);
          let n2 = { method: "POST", headers: i2, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: e10, payload: t10, private: this.private }] }) }, a2 = await this._fetchWithTimeout(this.broadcastEndpointURL, n2, null !== (s10 = r10.timeout) && void 0 !== s10 ? s10 : this.timeout);
          if (202 === a2.status) return { success: true };
          let o2 = a2.statusText;
          try {
            let e11 = await a2.json();
            o2 = e11.error || e11.message || o2;
          } catch (e11) {
          }
          return Promise.reject(Error(o2));
        }
        async send(e10, t10 = {}) {
          var r10, s10;
          if (this._canPush() || "broadcast" !== e10.type) return new Promise((r11) => {
            var s11, i2, n2;
            let a2 = this._push(e10.type, e10, t10.timeout || this.timeout);
            "broadcast" !== e10.type || (null === (n2 = null === (i2 = null === (s11 = this.params) || void 0 === s11 ? void 0 : s11.config) || void 0 === i2 ? void 0 : i2.broadcast) || void 0 === n2 ? void 0 : n2.ack) || r11("ok"), a2.receive("ok", () => r11("ok")), a2.receive("error", () => r11("error")), a2.receive("timeout", () => r11("timed out"));
          });
          {
            console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
            let { event: i2, payload: n2 } = e10, a2 = { apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" };
            this.socket.accessTokenValue && (a2.Authorization = `Bearer ${this.socket.accessTokenValue}`);
            let o2 = { method: "POST", headers: a2, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: i2, payload: n2, private: this.private }] }) };
            try {
              let e11 = await this._fetchWithTimeout(this.broadcastEndpointURL, o2, null !== (r10 = t10.timeout) && void 0 !== r10 ? r10 : this.timeout);
              return await (null === (s10 = e11.body) || void 0 === s10 ? void 0 : s10.cancel()), e11.ok ? "ok" : "error";
            } catch (e11) {
              if ("AbortError" === e11.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e10) {
          this.joinPush.updatePayload(e10);
        }
        unsubscribe(e10 = this.timeout) {
          this.state = o.leaving;
          let t10 = () => {
            this.socket.log("channel", `leave ${this.topic}`), this._trigger(l.close, "leave", this._joinRef());
          };
          this.joinPush.destroy();
          let r10 = null;
          return new Promise((s10) => {
            (r10 = new tX(this, l.leave, {}, e10)).receive("ok", () => {
              t10(), s10("ok");
            }).receive("timeout", () => {
              t10(), s10("timed out");
            }).receive("error", () => {
              s10("error");
            }), r10.send(), this._canPush() || r10.trigger("ok", {});
          }).finally(() => {
            null == r10 || r10.destroy();
          });
        }
        teardown() {
          this.pushBuffer.forEach((e10) => e10.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = o.closed, this.bindings = {};
        }
        async _fetchWithTimeout(e10, t10, r10) {
          let s10 = new AbortController(), i2 = setTimeout(() => s10.abort(), r10), n2 = await this.socket.fetch(e10, Object.assign(Object.assign({}, t10), { signal: s10.signal }));
          return clearTimeout(i2), n2;
        }
        _push(e10, t10, r10 = this.timeout) {
          if (!this.joinedOnce) throw `tried to push '${e10}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
          let s10 = new tX(this, e10, t10, r10);
          return this._canPush() ? s10.send() : this._addToPushBuffer(s10), s10;
        }
        _addToPushBuffer(e10) {
          if (e10.startTimeout(), this.pushBuffer.push(e10), this.pushBuffer.length > 100) {
            let e11 = this.pushBuffer.shift();
            e11 && (e11.destroy(), this.socket.log("channel", `discarded push due to buffer overflow: ${e11.event}`, e11.payload));
          }
        }
        _onMessage(e10, t10, r10) {
          return t10;
        }
        _isMember(e10) {
          return this.topic === e10;
        }
        _joinRef() {
          return this.joinPush.ref;
        }
        _trigger(e10, t10, r10) {
          var s10, i2;
          let n2 = e10.toLocaleLowerCase(), { close: a2, error: o2, leave: u2, join: c2 } = l;
          if (r10 && [a2, o2, u2, c2].indexOf(n2) >= 0 && r10 !== this._joinRef()) return;
          let h2 = this._onMessage(n2, t10, r10);
          if (t10 && !h2) throw "channel onMessage callbacks must return the payload, modified or unmodified";
          ["insert", "update", "delete"].includes(n2) ? null === (s10 = this.bindings.postgres_changes) || void 0 === s10 || s10.filter((e11) => {
            var t11, r11, s11;
            return (null === (t11 = e11.filter) || void 0 === t11 ? void 0 : t11.event) === "*" || (null === (s11 = null === (r11 = e11.filter) || void 0 === r11 ? void 0 : r11.event) || void 0 === s11 ? void 0 : s11.toLocaleLowerCase()) === n2;
          }).map((e11) => e11.callback(h2, r10)) : null === (i2 = this.bindings[n2]) || void 0 === i2 || i2.filter((e11) => {
            var r11, s11, i3, a3, o3, l2;
            if (!["broadcast", "presence", "postgres_changes"].includes(n2)) return e11.type.toLocaleLowerCase() === n2;
            if ("id" in e11) {
              let n3 = e11.id, a4 = null === (r11 = e11.filter) || void 0 === r11 ? void 0 : r11.event;
              return n3 && (null === (s11 = t10.ids) || void 0 === s11 ? void 0 : s11.includes(n3)) && ("*" === a4 || (null == a4 ? void 0 : a4.toLocaleLowerCase()) === (null === (i3 = t10.data) || void 0 === i3 ? void 0 : i3.type.toLocaleLowerCase()));
            }
            {
              let r12 = null === (o3 = null === (a3 = null == e11 ? void 0 : e11.filter) || void 0 === a3 ? void 0 : a3.event) || void 0 === o3 ? void 0 : o3.toLocaleLowerCase();
              return "*" === r12 || r12 === (null === (l2 = null == t10 ? void 0 : t10.event) || void 0 === l2 ? void 0 : l2.toLocaleLowerCase());
            }
          }).map((e11) => {
            if ("object" == typeof h2 && "ids" in h2) {
              let e12 = h2.data, { schema: t11, table: r11, commit_timestamp: s11, type: i3, errors: n3 } = e12;
              h2 = Object.assign(Object.assign({}, { schema: t11, table: r11, commit_timestamp: s11, eventType: i3, new: {}, old: {}, errors: n3 }), this._getPayloadRecords(e12));
            }
            e11.callback(h2, r10);
          });
        }
        _isClosed() {
          return this.state === o.closed;
        }
        _isJoined() {
          return this.state === o.joined;
        }
        _isJoining() {
          return this.state === o.joining;
        }
        _isLeaving() {
          return this.state === o.leaving;
        }
        _replyEventName(e10) {
          return `chan_reply_${e10}`;
        }
        _on(e10, t10, r10) {
          let s10 = e10.toLocaleLowerCase(), i2 = { type: s10, filter: t10, callback: r10 };
          return this.bindings[s10] ? this.bindings[s10].push(i2) : this.bindings[s10] = [i2], this;
        }
        _off(e10, t10) {
          let r10 = e10.toLocaleLowerCase();
          return this.bindings[r10] && (this.bindings[r10] = this.bindings[r10].filter((e11) => {
            var s10;
            return !((null === (s10 = e11.type) || void 0 === s10 ? void 0 : s10.toLocaleLowerCase()) === r10 && tQ.isEqual(e11.filter, t10));
          })), this;
        }
        static isEqual(e10, t10) {
          if (Object.keys(e10).length !== Object.keys(t10).length) return false;
          for (let r10 in e10) if (e10[r10] !== t10[r10]) return false;
          return true;
        }
        static isFilterValueEqual(e10, t10) {
          return (null != e10 ? e10 : void 0) === (null != t10 ? t10 : void 0);
        }
        _rejoinUntilConnected() {
          this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
        }
        _onClose(e10) {
          this._on(l.close, {}, e10);
        }
        _onError(e10) {
          this._on(l.error, {}, (t10) => e10(t10));
        }
        _canPush() {
          return this.socket.isConnected() && this._isJoined();
        }
        _rejoin(e10 = this.timeout) {
          this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = o.joining, this.joinPush.resend(e10));
        }
        _getPayloadRecords(e10) {
          let t10 = { new: {}, old: {} };
          return ("INSERT" === e10.type || "UPDATE" === e10.type) && (t10.new = tq(e10.columns, e10.record)), ("UPDATE" === e10.type || "DELETE" === e10.type) && (t10.old = tq(e10.columns, e10.old_record)), t10;
        }
      }
      let tZ = () => {
      }, t0 = { HEARTBEAT_INTERVAL: 25e3, RECONNECT_DELAY: 10, HEARTBEAT_TIMEOUT_FALLBACK: 100 }, t1 = [1e3, 2e3, 5e3, 1e4], t2 = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class t3 {
        constructor(e10, t10) {
          var r10;
          if (this.accessTokenValue = null, this.apiKey = null, this._manuallySetToken = false, this.channels = [], this.endPoint = "", this.httpEndpoint = "", this.headers = {}, this.params = {}, this.timeout = 1e4, this.transport = null, this.heartbeatIntervalMs = t0.HEARTBEAT_INTERVAL, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.heartbeatCallback = tZ, this.ref = 0, this.reconnectTimer = null, this.vsn = tU, this.logger = tZ, this.conn = null, this.sendBuffer = [], this.serializer = new tD(), this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = false, this._authPromise = null, this._resolveFetch = (e11) => e11 ? (...t11) => e11(...t11) : (...e12) => fetch(...e12), !(null === (r10 = null == t10 ? void 0 : t10.params) || void 0 === r10 ? void 0 : r10.apikey)) throw Error("API key is required to connect to Realtime");
          this.apiKey = t10.params.apikey, this.endPoint = `${e10}/${u.websocket}`, this.httpEndpoint = tJ(e10), this._initializeOptions(t10), this._setupReconnectionTimer(), this.fetch = this._resolveFetch(null == t10 ? void 0 : t10.fetch);
        }
        connect() {
          if (!(this.isConnecting() || this.isDisconnecting() || null !== this.conn && this.isConnected())) {
            if (this._setConnectionState("connecting"), this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this.transport) this.conn = new this.transport(this.endpointURL());
            else try {
              this.conn = tL.createWebSocket(this.endpointURL());
            } catch (t10) {
              this._setConnectionState("disconnected");
              let e10 = t10.message;
              if (e10.includes("Node.js")) throw Error(`${e10}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
              throw Error(`WebSocket not available: ${e10}`);
            }
            this._setupConnectionHandlers();
          }
        }
        endpointURL() {
          return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: this.vsn }));
        }
        disconnect(e10, t10) {
          if (!this.isDisconnecting()) {
            if (this._setConnectionState("disconnecting", true), this.conn) {
              let r10 = setTimeout(() => {
                this._setConnectionState("disconnected");
              }, 100);
              this.conn.onclose = () => {
                clearTimeout(r10), this._setConnectionState("disconnected");
              }, "function" == typeof this.conn.close && (e10 ? this.conn.close(e10, null != t10 ? t10 : "") : this.conn.close()), this._teardownConnection();
            } else this._setConnectionState("disconnected");
          }
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e10) {
          let t10 = await e10.unsubscribe();
          return 0 === this.channels.length && this.disconnect(), t10;
        }
        async removeAllChannels() {
          let e10 = await Promise.all(this.channels.map((e11) => e11.unsubscribe()));
          return this.channels = [], this.disconnect(), e10;
        }
        log(e10, t10, r10) {
          this.logger(e10, t10, r10);
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case a.connecting:
              return c.Connecting;
            case a.open:
              return c.Open;
            case a.closing:
              return c.Closing;
            default:
              return c.Closed;
          }
        }
        isConnected() {
          return this.connectionState() === c.Open;
        }
        isConnecting() {
          return "connecting" === this._connectionState;
        }
        isDisconnecting() {
          return "disconnecting" === this._connectionState;
        }
        channel(e10, t10 = { config: {} }) {
          let r10 = `realtime:${e10}`, s10 = this.getChannels().find((e11) => e11.topic === r10);
          if (s10) return s10;
          {
            let r11 = new tQ(`realtime:${e10}`, t10, this);
            return this.channels.push(r11), r11;
          }
        }
        push(e10) {
          let { topic: t10, event: r10, payload: s10, ref: i2 } = e10, n2 = () => {
            this.encode(e10, (e11) => {
              var t11;
              null === (t11 = this.conn) || void 0 === t11 || t11.send(e11);
            });
          };
          this.log("push", `${t10} ${r10} (${i2})`, s10), this.isConnected() ? n2() : this.sendBuffer.push(n2);
        }
        async setAuth(e10 = null) {
          this._authPromise = this._performAuth(e10);
          try {
            await this._authPromise;
          } finally {
            this._authPromise = null;
          }
        }
        _isManualToken() {
          return this._manuallySetToken;
        }
        async sendHeartbeat() {
          var e10;
          if (!this.isConnected()) {
            try {
              this.heartbeatCallback("disconnected");
            } catch (e11) {
              this.log("error", "error in heartbeat callback", e11);
            }
            return;
          }
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            try {
              this.heartbeatCallback("timeout");
            } catch (e11) {
              this.log("error", "error in heartbeat callback", e11);
            }
            this._wasManualDisconnect = false, null === (e10 = this.conn) || void 0 === e10 || e10.close(1e3, "heartbeat timeout"), setTimeout(() => {
              var e11;
              this.isConnected() || null === (e11 = this.reconnectTimer) || void 0 === e11 || e11.scheduleTimeout();
            }, t0.HEARTBEAT_TIMEOUT_FALLBACK);
            return;
          }
          this.pendingHeartbeatRef = this._makeRef(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          try {
            this.heartbeatCallback("sent");
          } catch (e11) {
            this.log("error", "error in heartbeat callback", e11);
          }
          this._setAuthSafely("heartbeat");
        }
        onHeartbeat(e10) {
          this.heartbeatCallback = e10;
        }
        flushSendBuffer() {
          this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e10) => e10()), this.sendBuffer = []);
        }
        _makeRef() {
          let e10 = this.ref + 1;
          return e10 === this.ref ? this.ref = 0 : this.ref = e10, this.ref.toString();
        }
        _leaveOpenTopic(e10) {
          let t10 = this.channels.find((t11) => t11.topic === e10 && (t11._isJoined() || t11._isJoining()));
          t10 && (this.log("transport", `leaving duplicate topic "${e10}"`), t10.unsubscribe());
        }
        _remove(e10) {
          this.channels = this.channels.filter((t10) => t10.topic !== e10.topic);
        }
        _onConnMessage(e10) {
          this.decode(e10.data, (e11) => {
            if ("phoenix" === e11.topic && "phx_reply" === e11.event) try {
              this.heartbeatCallback("ok" === e11.payload.status ? "ok" : "error");
            } catch (e12) {
              this.log("error", "error in heartbeat callback", e12);
            }
            e11.ref && e11.ref === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null);
            let { topic: t10, event: r10, payload: s10, ref: i2 } = e11, n2 = i2 ? `(${i2})` : "", a2 = s10.status || "";
            this.log("receive", `${a2} ${t10} ${r10} ${n2}`.trim(), s10), this.channels.filter((e12) => e12._isMember(t10)).forEach((e12) => e12._trigger(r10, s10, i2)), this._triggerStateCallbacks("message", e11);
          });
        }
        _clearTimer(e10) {
          var t10;
          "heartbeat" === e10 && this.heartbeatTimer ? (clearInterval(this.heartbeatTimer), this.heartbeatTimer = void 0) : "reconnect" === e10 && (null === (t10 = this.reconnectTimer) || void 0 === t10 || t10.reset());
        }
        _clearAllTimers() {
          this._clearTimer("heartbeat"), this._clearTimer("reconnect");
        }
        _setupConnectionHandlers() {
          this.conn && ("binaryType" in this.conn && (this.conn.binaryType = "arraybuffer"), this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e10) => this._onConnError(e10), this.conn.onmessage = (e10) => this._onConnMessage(e10), this.conn.onclose = (e10) => this._onConnClose(e10), this.conn.readyState === a.open && this._onConnOpen());
        }
        _teardownConnection() {
          if (this.conn) {
            if (this.conn.readyState === a.open || this.conn.readyState === a.connecting) try {
              this.conn.close();
            } catch (e10) {
              this.log("error", "Error closing connection", e10);
            }
            this.conn.onopen = null, this.conn.onerror = null, this.conn.onmessage = null, this.conn.onclose = null, this.conn = null;
          }
          this._clearAllTimers(), this._terminateWorker(), this.channels.forEach((e10) => e10.teardown());
        }
        _onConnOpen() {
          this._setConnectionState("connected"), this.log("transport", `connected to ${this.endpointURL()}`), (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).then(() => {
            this.flushSendBuffer();
          }).catch((e10) => {
            this.log("error", "error waiting for auth on connect", e10), this.flushSendBuffer();
          }), this._clearTimer("reconnect"), this.worker ? this.workerRef || this._startWorkerHeartbeat() : this._startHeartbeat(), this._triggerStateCallbacks("open");
        }
        _startHeartbeat() {
          this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        _startWorkerHeartbeat() {
          this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
          let e10 = this._workerObjectUrl(this.workerUrl);
          this.workerRef = new Worker(e10), this.workerRef.onerror = (e11) => {
            this.log("worker", "worker error", e11.message), this._terminateWorker();
          }, this.workerRef.onmessage = (e11) => {
            "keepAlive" === e11.data.event && this.sendHeartbeat();
          }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
        }
        _terminateWorker() {
          this.workerRef && (this.log("worker", "terminating worker"), this.workerRef.terminate(), this.workerRef = void 0);
        }
        _onConnClose(e10) {
          var t10;
          this._setConnectionState("disconnected"), this.log("transport", "close", e10), this._triggerChanError(), this._clearTimer("heartbeat"), this._wasManualDisconnect || null === (t10 = this.reconnectTimer) || void 0 === t10 || t10.scheduleTimeout(), this._triggerStateCallbacks("close", e10);
        }
        _onConnError(e10) {
          this._setConnectionState("disconnected"), this.log("transport", `${e10}`), this._triggerChanError(), this._triggerStateCallbacks("error", e10);
        }
        _triggerChanError() {
          this.channels.forEach((e10) => e10._trigger(l.error));
        }
        _appendParams(e10, t10) {
          if (0 === Object.keys(t10).length) return e10;
          let r10 = e10.match(/\?/) ? "&" : "?", s10 = new URLSearchParams(t10);
          return `${e10}${r10}${s10}`;
        }
        _workerObjectUrl(e10) {
          let t10;
          if (e10) t10 = e10;
          else {
            let e11 = new Blob([t2], { type: "application/javascript" });
            t10 = URL.createObjectURL(e11);
          }
          return t10;
        }
        _setConnectionState(e10, t10 = false) {
          this._connectionState = e10, "connecting" === e10 ? this._wasManualDisconnect = false : "disconnecting" === e10 && (this._wasManualDisconnect = t10);
        }
        async _performAuth(e10 = null) {
          let t10;
          let r10 = false;
          if (e10) t10 = e10, r10 = true;
          else if (this.accessToken) try {
            t10 = await this.accessToken();
          } catch (e11) {
            this.log("error", "Error fetching access token from callback", e11), t10 = this.accessTokenValue;
          }
          else t10 = this.accessTokenValue;
          r10 ? this._manuallySetToken = true : this.accessToken && (this._manuallySetToken = false), this.accessTokenValue != t10 && (this.accessTokenValue = t10, this.channels.forEach((e11) => {
            let r11 = { access_token: t10, version: "realtime-js/2.89.0" };
            t10 && e11.updateJoinPayload(r11), e11.joinedOnce && e11._isJoined() && e11._push(l.access_token, { access_token: t10 });
          }));
        }
        async _waitForAuthIfNeeded() {
          this._authPromise && await this._authPromise;
        }
        _setAuthSafely(e10 = "general") {
          this._isManualToken() || this.setAuth().catch((t10) => {
            this.log("error", `Error setting auth in ${e10}`, t10);
          });
        }
        _triggerStateCallbacks(e10, t10) {
          try {
            this.stateChangeCallbacks[e10].forEach((r10) => {
              try {
                r10(t10);
              } catch (t11) {
                this.log("error", `error in ${e10} callback`, t11);
              }
            });
          } catch (t11) {
            this.log("error", `error triggering ${e10} callbacks`, t11);
          }
        }
        _setupReconnectionTimer() {
          this.reconnectTimer = new tM(async () => {
            setTimeout(async () => {
              await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
            }, t0.RECONNECT_DELAY);
          }, this.reconnectAfterMs);
        }
        _initializeOptions(e10) {
          var t10, r10, s10, i2, n2, a2, o2, l2, u2, c2, h2, d2;
          switch (this.transport = null !== (t10 = null == e10 ? void 0 : e10.transport) && void 0 !== t10 ? t10 : null, this.timeout = null !== (r10 = null == e10 ? void 0 : e10.timeout) && void 0 !== r10 ? r10 : 1e4, this.heartbeatIntervalMs = null !== (s10 = null == e10 ? void 0 : e10.heartbeatIntervalMs) && void 0 !== s10 ? s10 : t0.HEARTBEAT_INTERVAL, this.worker = null !== (i2 = null == e10 ? void 0 : e10.worker) && void 0 !== i2 && i2, this.accessToken = null !== (n2 = null == e10 ? void 0 : e10.accessToken) && void 0 !== n2 ? n2 : null, this.heartbeatCallback = null !== (a2 = null == e10 ? void 0 : e10.heartbeatCallback) && void 0 !== a2 ? a2 : tZ, this.vsn = null !== (o2 = null == e10 ? void 0 : e10.vsn) && void 0 !== o2 ? o2 : tU, (null == e10 ? void 0 : e10.params) && (this.params = e10.params), (null == e10 ? void 0 : e10.logger) && (this.logger = e10.logger), ((null == e10 ? void 0 : e10.logLevel) || (null == e10 ? void 0 : e10.log_level)) && (this.logLevel = e10.logLevel || e10.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = null !== (l2 = null == e10 ? void 0 : e10.reconnectAfterMs) && void 0 !== l2 ? l2 : (e11) => t1[e11 - 1] || 1e4, this.vsn) {
            case tU:
              this.encode = null !== (u2 = null == e10 ? void 0 : e10.encode) && void 0 !== u2 ? u2 : (e11, t11) => t11(JSON.stringify(e11)), this.decode = null !== (c2 = null == e10 ? void 0 : e10.decode) && void 0 !== c2 ? c2 : (e11, t11) => t11(JSON.parse(e11));
              break;
            case "2.0.0":
              this.encode = null !== (h2 = null == e10 ? void 0 : e10.encode) && void 0 !== h2 ? h2 : this.serializer.encode.bind(this.serializer), this.decode = null !== (d2 = null == e10 ? void 0 : e10.decode) && void 0 !== d2 ? d2 : this.serializer.decode.bind(this.serializer);
              break;
            default:
              throw Error(`Unsupported serializer version: ${this.vsn}`);
          }
          if (this.worker) {
            if ("undefined" != typeof window && !window.Worker) throw Error("Web Worker is not supported");
            this.workerUrl = null == e10 ? void 0 : e10.workerUrl;
          }
        }
      }
      var t4 = class extends Error {
        constructor(e10, t10) {
          super(e10), this.name = "IcebergError", this.status = t10.status, this.icebergType = t10.icebergType, this.icebergCode = t10.icebergCode, this.details = t10.details, this.isCommitStateUnknown = "CommitStateUnknownException" === t10.icebergType || [500, 502, 504].includes(t10.status) && t10.icebergType?.includes("CommitState") === true;
        }
        isNotFound() {
          return 404 === this.status;
        }
        isConflict() {
          return 409 === this.status;
        }
        isAuthenticationTimeout() {
          return 419 === this.status;
        }
      };
      async function t6(e10) {
        return e10 && "none" !== e10.type ? "bearer" === e10.type ? { Authorization: `Bearer ${e10.token}` } : "header" === e10.type ? { [e10.name]: e10.value } : "custom" === e10.type ? await e10.getHeaders() : {} : {};
      }
      function t5(e10) {
        return e10.join("");
      }
      var t8 = class {
        constructor(e10, t10 = "") {
          this.client = e10, this.prefix = t10;
        }
        async listNamespaces(e10) {
          let t10 = e10 ? { parent: t5(e10.namespace) } : void 0;
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces`, query: t10 })).data.namespaces.map((e11) => ({ namespace: e11 }));
        }
        async createNamespace(e10, t10) {
          let r10 = { namespace: e10.namespace, properties: t10?.properties };
          return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces`, body: r10 })).data;
        }
        async dropNamespace(e10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${t5(e10.namespace)}` });
        }
        async loadNamespaceMetadata(e10) {
          return { properties: (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${t5(e10.namespace)}` })).data.properties };
        }
        async namespaceExists(e10) {
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${t5(e10.namespace)}` }), true;
          } catch (e11) {
            if (e11 instanceof t4 && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createNamespaceIfNotExists(e10, t10) {
          try {
            return await this.createNamespace(e10, t10);
          } catch (e11) {
            if (e11 instanceof t4 && 409 === e11.status) return;
            throw e11;
          }
        }
      };
      function t9(e10) {
        return e10.join("");
      }
      var t7 = class {
        constructor(e10, t10 = "", r10) {
          this.client = e10, this.prefix = t10, this.accessDelegation = r10;
        }
        async listTables(e10) {
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${t9(e10.namespace)}/tables` })).data.identifiers;
        }
        async createTable(e10, t10) {
          let r10 = {};
          return this.accessDelegation && (r10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${t9(e10.namespace)}/tables`, body: t10, headers: r10 })).data.metadata;
        }
        async updateTable(e10, t10) {
          let r10 = await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${t9(e10.namespace)}/tables/${e10.name}`, body: t10 });
          return { "metadata-location": r10.data["metadata-location"], metadata: r10.data.metadata };
        }
        async dropTable(e10, t10) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${t9(e10.namespace)}/tables/${e10.name}`, query: { purgeRequested: String(t10?.purge ?? false) } });
        }
        async loadTable(e10) {
          let t10 = {};
          return this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${t9(e10.namespace)}/tables/${e10.name}`, headers: t10 })).data.metadata;
        }
        async tableExists(e10) {
          let t10 = {};
          this.accessDelegation && (t10["X-Iceberg-Access-Delegation"] = this.accessDelegation);
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${t9(e10.namespace)}/tables/${e10.name}`, headers: t10 }), true;
          } catch (e11) {
            if (e11 instanceof t4 && 404 === e11.status) return false;
            throw e11;
          }
        }
        async createTableIfNotExists(e10, t10) {
          try {
            return await this.createTable(e10, t10);
          } catch (r10) {
            if (r10 instanceof t4 && 409 === r10.status) return await this.loadTable({ namespace: e10.namespace, name: t10.name });
            throw r10;
          }
        }
      }, re = class {
        constructor(e10) {
          let t10 = "v1";
          e10.catalogName && (t10 += `/${e10.catalogName}`);
          let r10 = e10.baseUrl.endsWith("/") ? e10.baseUrl : `${e10.baseUrl}/`;
          this.client = function(e11) {
            let t11 = e11.fetchImpl ?? globalThis.fetch;
            return { async request({ method: r11, path: s10, query: i2, body: n2, headers: a2 }) {
              let o2 = function(e12, t12, r12) {
                let s11 = new URL(t12, e12);
                if (r12) for (let [e13, t13] of Object.entries(r12)) void 0 !== t13 && s11.searchParams.set(e13, t13);
                return s11.toString();
              }(e11.baseUrl, s10, i2), l2 = await t6(e11.auth), u2 = await t11(o2, { method: r11, headers: { ...n2 ? { "Content-Type": "application/json" } : {}, ...l2, ...a2 }, body: n2 ? JSON.stringify(n2) : void 0 }), c2 = await u2.text(), h2 = (u2.headers.get("content-type") || "").includes("application/json"), d2 = h2 && c2 ? JSON.parse(c2) : c2;
              if (!u2.ok) {
                let e12 = h2 ? d2 : void 0, t12 = e12?.error;
                throw new t4(t12?.message ?? `Request failed with status ${u2.status}`, { status: u2.status, icebergType: t12?.type, icebergCode: t12?.code, details: e12 });
              }
              return { status: u2.status, headers: u2.headers, data: d2 };
            } };
          }({ baseUrl: r10, auth: e10.auth, fetchImpl: e10.fetch }), this.accessDelegation = e10.accessDelegation?.join(","), this.namespaceOps = new t8(this.client, t10), this.tableOps = new t7(this.client, t10, this.accessDelegation);
        }
        async listNamespaces(e10) {
          return this.namespaceOps.listNamespaces(e10);
        }
        async createNamespace(e10, t10) {
          return this.namespaceOps.createNamespace(e10, t10);
        }
        async dropNamespace(e10) {
          await this.namespaceOps.dropNamespace(e10);
        }
        async loadNamespaceMetadata(e10) {
          return this.namespaceOps.loadNamespaceMetadata(e10);
        }
        async listTables(e10) {
          return this.tableOps.listTables(e10);
        }
        async createTable(e10, t10) {
          return this.tableOps.createTable(e10, t10);
        }
        async updateTable(e10, t10) {
          return this.tableOps.updateTable(e10, t10);
        }
        async dropTable(e10, t10) {
          await this.tableOps.dropTable(e10, t10);
        }
        async loadTable(e10) {
          return this.tableOps.loadTable(e10);
        }
        async namespaceExists(e10) {
          return this.namespaceOps.namespaceExists(e10);
        }
        async tableExists(e10) {
          return this.tableOps.tableExists(e10);
        }
        async createNamespaceIfNotExists(e10, t10) {
          return this.namespaceOps.createNamespaceIfNotExists(e10, t10);
        }
        async createTableIfNotExists(e10, t10) {
          return this.tableOps.createTableIfNotExists(e10, t10);
        }
      }, rt = r(356).Buffer, rr = class extends Error {
        constructor(e10) {
          super(e10), this.__isStorageError = true, this.name = "StorageError";
        }
      };
      function rs(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageError" in e10;
      }
      var ri = class extends rr {
        constructor(e10, t10, r10) {
          super(e10), this.name = "StorageApiError", this.status = t10, this.statusCode = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      }, rn = class extends rr {
        constructor(e10, t10) {
          super(e10), this.name = "StorageUnknownError", this.originalError = t10;
        }
      };
      let ra = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), ro = () => Response, rl = (e10) => {
        if (Array.isArray(e10)) return e10.map((e11) => rl(e11));
        if ("function" == typeof e10 || e10 !== Object(e10)) return e10;
        let t10 = {};
        return Object.entries(e10).forEach(([e11, r10]) => {
          t10[e11.replace(/([-_][a-z])/gi, (e12) => e12.toUpperCase().replace(/[-_]/g, ""))] = rl(r10);
        }), t10;
      }, ru = (e10) => {
        if ("object" != typeof e10 || null === e10) return false;
        let t10 = Object.getPrototypeOf(e10);
        return (null === t10 || t10 === Object.prototype || null === Object.getPrototypeOf(t10)) && !(Symbol.toStringTag in e10) && !(Symbol.iterator in e10);
      }, rc = (e10) => !(!e10 || "string" != typeof e10 || 0 === e10.length || e10.length > 100 || e10.trim() !== e10 || e10.includes("/") || e10.includes("\\")) && /^[\w!.\*'() &$@=;:+,?-]+$/.test(e10);
      function rh(e10) {
        return (rh = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function rd(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s10 = Object.getOwnPropertySymbols(e10);
          t10 && (s10 = s10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s10);
        }
        return r10;
      }
      function rp(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? rd(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var s10;
              (s10 = function(e12, t13) {
                if ("object" != rh(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s11 = r12.call(e12, t13 || "default");
                  if ("object" != rh(s11)) return s11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == rh(s10) ? s10 : s10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : rd(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      let rf = (e10) => {
        var t10;
        return e10.msg || e10.message || e10.error_description || ("string" == typeof e10.error ? e10.error : null === (t10 = e10.error) || void 0 === t10 ? void 0 : t10.message) || JSON.stringify(e10);
      }, rg = async (e10, t10, r10) => {
        e10 instanceof await ro() && !(null == r10 ? void 0 : r10.noResolveJson) ? e10.json().then((r11) => {
          let s10 = e10.status || 500, i2 = (null == r11 ? void 0 : r11.statusCode) || s10 + "";
          t10(new ri(rf(r11), s10, i2));
        }).catch((e11) => {
          t10(new rn(rf(e11), e11));
        }) : t10(new rn(rf(e10), e10));
      }, rm = (e10, t10, r10, s10) => {
        let i2 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" !== e10 && s10 ? (ru(s10) ? (i2.headers = rp({ "Content-Type": "application/json" }, null == t10 ? void 0 : t10.headers), i2.body = JSON.stringify(s10)) : i2.body = s10, (null == t10 ? void 0 : t10.duplex) && (i2.duplex = t10.duplex), rp(rp({}, i2), r10)) : i2;
      };
      async function rw(e10, t10, r10, s10, i2, n2) {
        return new Promise((a2, o2) => {
          e10(r10, rm(t10, s10, i2, n2)).then((e11) => {
            if (!e11.ok) throw e11;
            return (null == s10 ? void 0 : s10.noResolveJson) ? e11 : e11.json();
          }).then((e11) => a2(e11)).catch((e11) => rg(e11, o2, s10));
        });
      }
      async function rv(e10, t10, r10, s10) {
        return rw(e10, "GET", t10, r10, s10);
      }
      async function rb(e10, t10, r10, s10, i2) {
        return rw(e10, "POST", t10, s10, i2, r10);
      }
      async function ry(e10, t10, r10, s10, i2) {
        return rw(e10, "PUT", t10, s10, i2, r10);
      }
      async function r_(e10, t10, r10, s10) {
        return rw(e10, "HEAD", t10, rp(rp({}, r10), {}, { noResolveJson: true }), s10);
      }
      async function rS(e10, t10, r10, s10, i2) {
        return rw(e10, "DELETE", t10, s10, i2, r10);
      }
      var rE = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10;
        }
        then(e10, t10) {
          return this.execute().then(e10, t10);
        }
        async execute() {
          try {
            return { data: (await this.downloadFn()).body, error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (rs(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      i = Symbol.toStringTag;
      var rk = class {
        constructor(e10, t10) {
          this.downloadFn = e10, this.shouldThrowOnError = t10, this[i] = "BlobDownloadBuilder", this.promise = null;
        }
        asStream() {
          return new rE(this.downloadFn, this.shouldThrowOnError);
        }
        then(e10, t10) {
          return this.getPromise().then(e10, t10);
        }
        catch(e10) {
          return this.getPromise().catch(e10);
        }
        finally(e10) {
          return this.getPromise().finally(e10);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        async execute() {
          try {
            return { data: await (await this.downloadFn()).blob(), error: null };
          } catch (e10) {
            if (this.shouldThrowOnError) throw e10;
            if (rs(e10)) return { data: null, error: e10 };
            throw e10;
          }
        }
      };
      let rT = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, rO = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
      var rR = class {
        constructor(e10, t10 = {}, r10, s10) {
          this.shouldThrowOnError = false, this.url = e10, this.headers = t10, this.bucketId = r10, this.fetch = ra(s10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async uploadOrUpdate(e10, t10, r10, s10) {
          try {
            let i2;
            let n2 = rp(rp({}, rO), s10), a2 = rp(rp({}, this.headers), "POST" === e10 && { "x-upsert": String(n2.upsert) }), o2 = n2.metadata;
            "undefined" != typeof Blob && r10 instanceof Blob ? ((i2 = new FormData()).append("cacheControl", n2.cacheControl), o2 && i2.append("metadata", this.encodeMetadata(o2)), i2.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? ((i2 = r10).has("cacheControl") || i2.append("cacheControl", n2.cacheControl), o2 && !i2.has("metadata") && i2.append("metadata", this.encodeMetadata(o2))) : (i2 = r10, a2["cache-control"] = `max-age=${n2.cacheControl}`, a2["content-type"] = n2.contentType, o2 && (a2["x-metadata"] = this.toBase64(this.encodeMetadata(o2))), ("undefined" != typeof ReadableStream && i2 instanceof ReadableStream || i2 && "object" == typeof i2 && "pipe" in i2 && "function" == typeof i2.pipe) && !n2.duplex && (n2.duplex = "half")), (null == s10 ? void 0 : s10.headers) && (a2 = rp(rp({}, a2), s10.headers));
            let l2 = this._removeEmptyFolders(t10), u2 = this._getFinalPath(l2), c2 = await ("PUT" == e10 ? ry : rb)(this.fetch, `${this.url}/object/${u2}`, i2, rp({ headers: a2 }, (null == n2 ? void 0 : n2.duplex) ? { duplex: n2.duplex } : {}));
            return { data: { path: l2, id: c2.Id, fullPath: c2.Key }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async upload(e10, t10, r10) {
          return this.uploadOrUpdate("POST", e10, t10, r10);
        }
        async uploadToSignedUrl(e10, t10, r10, s10) {
          let i2 = this._removeEmptyFolders(e10), n2 = this._getFinalPath(i2), a2 = new URL(this.url + `/object/upload/sign/${n2}`);
          a2.searchParams.set("token", t10);
          try {
            let e11;
            let t11 = rp({ upsert: rO.upsert }, s10), n3 = rp(rp({}, this.headers), { "x-upsert": String(t11.upsert) });
            return "undefined" != typeof Blob && r10 instanceof Blob ? ((e11 = new FormData()).append("cacheControl", t11.cacheControl), e11.append("", r10)) : "undefined" != typeof FormData && r10 instanceof FormData ? (e11 = r10).append("cacheControl", t11.cacheControl) : (e11 = r10, n3["cache-control"] = `max-age=${t11.cacheControl}`, n3["content-type"] = t11.contentType), { data: { path: i2, fullPath: (await ry(this.fetch, a2.toString(), e11, { headers: n3 })).Key }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createSignedUploadUrl(e10, t10) {
          try {
            let r10 = this._getFinalPath(e10), s10 = rp({}, this.headers);
            (null == t10 ? void 0 : t10.upsert) && (s10["x-upsert"] = "true");
            let i2 = await rb(this.fetch, `${this.url}/object/upload/sign/${r10}`, {}, { headers: s10 }), n2 = new URL(this.url + i2.url), a2 = n2.searchParams.get("token");
            if (!a2) throw new rr("No token returned by API");
            return { data: { signedUrl: n2.toString(), path: e10, token: a2 }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async update(e10, t10, r10) {
          return this.uploadOrUpdate("PUT", e10, t10, r10);
        }
        async move(e10, t10, r10) {
          try {
            return { data: await rb(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async copy(e10, t10, r10) {
          try {
            return { data: { path: (await rb(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: e10, destinationKey: t10, destinationBucket: null == r10 ? void 0 : r10.destinationBucket }, { headers: this.headers })).Key }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createSignedUrl(e10, t10, r10) {
          try {
            let s10 = this._getFinalPath(e10), i2 = await rb(this.fetch, `${this.url}/object/sign/${s10}`, rp({ expiresIn: t10 }, (null == r10 ? void 0 : r10.transform) ? { transform: r10.transform } : {}), { headers: this.headers }), n2 = (null == r10 ? void 0 : r10.download) ? `&download=${true === r10.download ? "" : r10.download}` : "";
            return { data: i2 = { signedUrl: encodeURI(`${this.url}${i2.signedURL}${n2}`) }, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createSignedUrls(e10, t10, r10) {
          var s10 = this;
          try {
            let i2 = await rb(s10.fetch, `${s10.url}/object/sign/${s10.bucketId}`, { expiresIn: t10, paths: e10 }, { headers: s10.headers }), n2 = (null == r10 ? void 0 : r10.download) ? `&download=${true === r10.download ? "" : r10.download}` : "";
            return { data: i2.map((e11) => rp(rp({}, e11), {}, { signedUrl: e11.signedURL ? encodeURI(`${s10.url}${e11.signedURL}${n2}`) : null })), error: null };
          } catch (e11) {
            if (s10.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        download(e10, t10) {
          let r10 = void 0 !== (null == t10 ? void 0 : t10.transform) ? "render/image/authenticated" : "object", s10 = this.transformOptsToQueryString((null == t10 ? void 0 : t10.transform) || {}), i2 = s10 ? `?${s10}` : "", n2 = this._getFinalPath(e10);
          return new rk(() => rv(this.fetch, `${this.url}/${r10}/${n2}${i2}`, { headers: this.headers, noResolveJson: true }), this.shouldThrowOnError);
        }
        async info(e10) {
          let t10 = this._getFinalPath(e10);
          try {
            return { data: rl(await rv(this.fetch, `${this.url}/object/info/${t10}`, { headers: this.headers })), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async exists(e10) {
          let t10 = this._getFinalPath(e10);
          try {
            return await r_(this.fetch, `${this.url}/object/${t10}`, { headers: this.headers }), { data: true, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11) && e11 instanceof rn) {
              let t11 = e11.originalError;
              if ([400, 404].includes(null == t11 ? void 0 : t11.status)) return { data: false, error: e11 };
            }
            throw e11;
          }
        }
        getPublicUrl(e10, t10) {
          let r10 = this._getFinalPath(e10), s10 = [], i2 = (null == t10 ? void 0 : t10.download) ? `download=${true === t10.download ? "" : t10.download}` : "";
          "" !== i2 && s10.push(i2);
          let n2 = void 0 !== (null == t10 ? void 0 : t10.transform) ? "render/image" : "object", a2 = this.transformOptsToQueryString((null == t10 ? void 0 : t10.transform) || {});
          "" !== a2 && s10.push(a2);
          let o2 = s10.join("&");
          return "" !== o2 && (o2 = `?${o2}`), { data: { publicUrl: encodeURI(`${this.url}/${n2}/public/${r10}${o2}`) } };
        }
        async remove(e10) {
          try {
            return { data: await rS(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async list(e10, t10, r10) {
          try {
            let s10 = rp(rp(rp({}, rT), t10), {}, { prefix: e10 || "" });
            return { data: await rb(this.fetch, `${this.url}/object/list/${this.bucketId}`, s10, { headers: this.headers }, r10), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listV2(e10, t10) {
          try {
            let r10 = rp({}, e10);
            return { data: await rb(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, r10, { headers: this.headers }, t10), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        encodeMetadata(e10) {
          return JSON.stringify(e10);
        }
        toBase64(e10) {
          return void 0 !== rt ? rt.from(e10).toString("base64") : btoa(e10);
        }
        _getFinalPath(e10) {
          return `${this.bucketId}/${e10.replace(/^\/+/, "")}`;
        }
        _removeEmptyFolders(e10) {
          return e10.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        transformOptsToQueryString(e10) {
          let t10 = [];
          return e10.width && t10.push(`width=${e10.width}`), e10.height && t10.push(`height=${e10.height}`), e10.resize && t10.push(`resize=${e10.resize}`), e10.format && t10.push(`format=${e10.format}`), e10.quality && t10.push(`quality=${e10.quality}`), t10.join("&");
        }
      };
      let rx = "2.89.0", rC = { "X-Client-Info": `storage-js/${rx}` };
      var rP = class {
        constructor(e10, t10 = {}, r10, s10) {
          this.shouldThrowOnError = false;
          let i2 = new URL(e10);
          (null == s10 ? void 0 : s10.useNewHostname) && /supabase\.(co|in|red)$/.test(i2.hostname) && !i2.hostname.includes("storage.supabase.") && (i2.hostname = i2.hostname.replace("supabase.", "storage.supabase.")), this.url = i2.href.replace(/\/$/, ""), this.headers = rp(rp({}, rC), t10), this.fetch = ra(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async listBuckets(e10) {
          try {
            let t10 = this.listBucketOptionsToQueryString(e10);
            return { data: await rv(this.fetch, `${this.url}/bucket${t10}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getBucket(e10) {
          try {
            return { data: await rv(this.fetch, `${this.url}/bucket/${e10}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async createBucket(e10, t10 = { public: false }) {
          try {
            return { data: await rb(this.fetch, `${this.url}/bucket`, { id: e10, name: e10, type: t10.type, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async updateBucket(e10, t10) {
          try {
            return { data: await ry(this.fetch, `${this.url}/bucket/${e10}`, { id: e10, name: e10, public: t10.public, file_size_limit: t10.fileSizeLimit, allowed_mime_types: t10.allowedMimeTypes }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async emptyBucket(e10) {
          try {
            return { data: await rb(this.fetch, `${this.url}/bucket/${e10}/empty`, {}, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteBucket(e10) {
          try {
            return { data: await rS(this.fetch, `${this.url}/bucket/${e10}`, {}, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        listBucketOptionsToQueryString(e10) {
          let t10 = {};
          return e10 && ("limit" in e10 && (t10.limit = String(e10.limit)), "offset" in e10 && (t10.offset = String(e10.offset)), e10.search && (t10.search = e10.search), e10.sortColumn && (t10.sortColumn = e10.sortColumn), e10.sortOrder && (t10.sortOrder = e10.sortOrder)), Object.keys(t10).length > 0 ? "?" + new URLSearchParams(t10).toString() : "";
        }
      }, rA = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = rp(rp({}, rC), t10), this.fetch = ra(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async createBucket(e10) {
          try {
            return { data: await rb(this.fetch, `${this.url}/bucket`, { name: e10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listBuckets(e10) {
          try {
            let t10 = new URLSearchParams();
            (null == e10 ? void 0 : e10.limit) !== void 0 && t10.set("limit", e10.limit.toString()), (null == e10 ? void 0 : e10.offset) !== void 0 && t10.set("offset", e10.offset.toString()), (null == e10 ? void 0 : e10.sortColumn) && t10.set("sortColumn", e10.sortColumn), (null == e10 ? void 0 : e10.sortOrder) && t10.set("sortOrder", e10.sortOrder), (null == e10 ? void 0 : e10.search) && t10.set("search", e10.search);
            let r10 = t10.toString(), s10 = r10 ? `${this.url}/bucket?${r10}` : `${this.url}/bucket`;
            return { data: await rv(this.fetch, s10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteBucket(e10) {
          try {
            return { data: await rS(this.fetch, `${this.url}/bucket/${e10}`, {}, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rs(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        from(e10) {
          var t10 = this;
          if (!rc(e10)) throw new rr("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
          let r10 = new re({ baseUrl: this.url, catalogName: e10, auth: { type: "custom", getHeaders: async () => t10.headers }, fetch: this.fetch }), s10 = this.shouldThrowOnError;
          return new Proxy(r10, { get(e11, t11) {
            let r11 = e11[t11];
            return "function" != typeof r11 ? r11 : async (...t12) => {
              try {
                return { data: await r11.apply(e11, t12), error: null };
              } catch (e12) {
                if (s10) throw e12;
                return { data: null, error: e12 };
              }
            };
          } });
        }
      };
      let rI = { "X-Client-Info": `storage-js/${rx}`, "Content-Type": "application/json" };
      var rj = class extends Error {
        constructor(e10) {
          super(e10), this.__isStorageVectorsError = true, this.name = "StorageVectorsError";
        }
      };
      function rN(e10) {
        return "object" == typeof e10 && null !== e10 && "__isStorageVectorsError" in e10;
      }
      var r$ = class extends rj {
        constructor(e10, t10, r10) {
          super(e10), this.name = "StorageVectorsApiError", this.status = t10, this.statusCode = r10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      }, rL = class extends rj {
        constructor(e10, t10) {
          super(e10), this.name = "StorageVectorsUnknownError", this.originalError = t10;
        }
      };
      let rU = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), rD = (e10) => {
        if ("object" != typeof e10 || null === e10) return false;
        let t10 = Object.getPrototypeOf(e10);
        return (null === t10 || t10 === Object.prototype || null === Object.getPrototypeOf(t10)) && !(Symbol.toStringTag in e10) && !(Symbol.iterator in e10);
      }, rM = (e10) => e10.msg || e10.message || e10.error_description || e10.error || JSON.stringify(e10), rq = async (e10, t10, r10) => {
        if (e10 && "object" == typeof e10 && "status" in e10 && "ok" in e10 && "number" == typeof e10.status && !(null == r10 ? void 0 : r10.noResolveJson)) {
          let r11 = e10.status || 500;
          "function" == typeof e10.json ? e10.json().then((e11) => {
            let s10 = (null == e11 ? void 0 : e11.statusCode) || (null == e11 ? void 0 : e11.code) || r11 + "";
            t10(new r$(rM(e11), r11, s10));
          }).catch(() => {
            t10(new r$(e10.statusText || `HTTP ${r11} error`, r11, r11 + ""));
          }) : t10(new r$(e10.statusText || `HTTP ${r11} error`, r11, r11 + ""));
        } else t10(new rL(rM(e10), e10));
      }, rB = (e10, t10, r10, s10) => {
        let i2 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" !== e10 && s10 ? (rD(s10) ? (i2.headers = rp({ "Content-Type": "application/json" }, null == t10 ? void 0 : t10.headers), i2.body = JSON.stringify(s10)) : i2.body = s10, rp(rp({}, i2), r10)) : i2;
      };
      async function rV(e10, t10, r10, s10, i2, n2) {
        return new Promise((a2, o2) => {
          e10(r10, rB(t10, s10, i2, n2)).then((e11) => {
            if (!e11.ok) throw e11;
            if (null == s10 ? void 0 : s10.noResolveJson) return e11;
            let t11 = e11.headers.get("content-type");
            return t11 && t11.includes("application/json") ? e11.json() : {};
          }).then((e11) => a2(e11)).catch((e11) => rq(e11, o2, s10));
        });
      }
      async function rW(e10, t10, r10, s10, i2) {
        return rV(e10, "POST", t10, s10, i2, r10);
      }
      var rG = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = rp(rp({}, rI), t10), this.fetch = rU(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async createIndex(e10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/CreateIndex`, e10, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getIndex(e10, t10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/GetIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listIndexes(e10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/ListIndexes`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteIndex(e10, t10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/DeleteIndex`, { vectorBucketName: e10, indexName: t10 }, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }, rK = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = rp(rp({}, rI), t10), this.fetch = rU(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async putVectors(e10) {
          try {
            if (e10.vectors.length < 1 || e10.vectors.length > 500) throw Error("Vector batch size must be between 1 and 500 items");
            return { data: await rW(this.fetch, `${this.url}/PutVectors`, e10, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getVectors(e10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/GetVectors`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listVectors(e10) {
          try {
            if (void 0 !== e10.segmentCount) {
              if (e10.segmentCount < 1 || e10.segmentCount > 16) throw Error("segmentCount must be between 1 and 16");
              if (void 0 !== e10.segmentIndex && (e10.segmentIndex < 0 || e10.segmentIndex >= e10.segmentCount)) throw Error(`segmentIndex must be between 0 and ${e10.segmentCount - 1}`);
            }
            return { data: await rW(this.fetch, `${this.url}/ListVectors`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async queryVectors(e10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/QueryVectors`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteVectors(e10) {
          try {
            if (e10.keys.length < 1 || e10.keys.length > 500) throw Error("Keys batch size must be between 1 and 500 items");
            return { data: await rW(this.fetch, `${this.url}/DeleteVectors`, e10, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }, rH = class {
        constructor(e10, t10 = {}, r10) {
          this.shouldThrowOnError = false, this.url = e10.replace(/\/$/, ""), this.headers = rp(rp({}, rI), t10), this.fetch = rU(r10);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        async createBucket(e10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/CreateVectorBucket`, { vectorBucketName: e10 }, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async getBucket(e10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/GetVectorBucket`, { vectorBucketName: e10 }, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async listBuckets(e10 = {}) {
          try {
            return { data: await rW(this.fetch, `${this.url}/ListVectorBuckets`, e10, { headers: this.headers }), error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async deleteBucket(e10) {
          try {
            return { data: await rW(this.fetch, `${this.url}/DeleteVectorBucket`, { vectorBucketName: e10 }, { headers: this.headers }) || {}, error: null };
          } catch (e11) {
            if (this.shouldThrowOnError) throw e11;
            if (rN(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }, rz = class extends rH {
        constructor(e10, t10 = {}) {
          super(e10, t10.headers || {}, t10.fetch);
        }
        from(e10) {
          return new rF(this.url, this.headers, e10, this.fetch);
        }
        async createBucket(e10) {
          return super.createBucket.call(this, e10);
        }
        async getBucket(e10) {
          return super.getBucket.call(this, e10);
        }
        async listBuckets(e10 = {}) {
          return super.listBuckets.call(this, e10);
        }
        async deleteBucket(e10) {
          return super.deleteBucket.call(this, e10);
        }
      }, rF = class extends rG {
        constructor(e10, t10, r10, s10) {
          super(e10, t10, s10), this.vectorBucketName = r10;
        }
        async createIndex(e10) {
          return super.createIndex.call(this, rp(rp({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async listIndexes(e10 = {}) {
          return super.listIndexes.call(this, rp(rp({}, e10), {}, { vectorBucketName: this.vectorBucketName }));
        }
        async getIndex(e10) {
          return super.getIndex.call(this, this.vectorBucketName, e10);
        }
        async deleteIndex(e10) {
          return super.deleteIndex.call(this, this.vectorBucketName, e10);
        }
        index(e10) {
          return new rJ(this.url, this.headers, this.vectorBucketName, e10, this.fetch);
        }
      }, rJ = class extends rK {
        constructor(e10, t10, r10, s10, i2) {
          super(e10, t10, i2), this.vectorBucketName = r10, this.indexName = s10;
        }
        async putVectors(e10) {
          return super.putVectors.call(this, rp(rp({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async getVectors(e10) {
          return super.getVectors.call(this, rp(rp({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async listVectors(e10 = {}) {
          return super.listVectors.call(this, rp(rp({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async queryVectors(e10) {
          return super.queryVectors.call(this, rp(rp({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
        async deleteVectors(e10) {
          return super.deleteVectors.call(this, rp(rp({}, e10), {}, { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
        }
      }, rX = class extends rP {
        constructor(e10, t10 = {}, r10, s10) {
          super(e10, t10, r10, s10);
        }
        from(e10) {
          return new rR(this.url, this.headers, e10, this.fetch);
        }
        get vectors() {
          return new rz(this.url + "/vector", { headers: this.headers, fetch: this.fetch });
        }
        get analytics() {
          return new rA(this.url + "/iceberg", this.headers, this.fetch);
        }
      };
      let rY = "2.89.0", rQ = { "X-Client-Info": `gotrue-js/${rY}` }, rZ = "X-Supabase-Api-Version", r0 = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, r1 = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
      class r2 extends Error {
        constructor(e10, t10, r10) {
          super(e10), this.__isAuthError = true, this.name = "AuthError", this.status = t10, this.code = r10;
        }
      }
      function r3(e10) {
        return "object" == typeof e10 && null !== e10 && "__isAuthError" in e10;
      }
      class r4 extends r2 {
        constructor(e10, t10, r10) {
          super(e10, t10, r10), this.name = "AuthApiError", this.status = t10, this.code = r10;
        }
      }
      class r6 extends r2 {
        constructor(e10, t10) {
          super(e10), this.name = "AuthUnknownError", this.originalError = t10;
        }
      }
      class r5 extends r2 {
        constructor(e10, t10, r10, s10) {
          super(e10, r10, s10), this.name = t10, this.status = r10;
        }
      }
      class r8 extends r5 {
        constructor() {
          super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
        }
      }
      class r9 extends r5 {
        constructor() {
          super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
        }
      }
      class r7 extends r5 {
        constructor(e10) {
          super(e10, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class se extends r5 {
        constructor(e10, t10 = null) {
          super(e10, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      class st extends r5 {
        constructor(e10, t10 = null) {
          super(e10, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t10;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      class sr extends r5 {
        constructor() {
          super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.", "AuthPKCECodeVerifierMissingError", 400, "pkce_code_verifier_not_found");
        }
      }
      class ss extends r5 {
        constructor(e10, t10) {
          super(e10, "AuthRetryableFetchError", t10, void 0);
        }
      }
      function si(e10) {
        return r3(e10) && "AuthRetryableFetchError" === e10.name;
      }
      class sn extends r5 {
        constructor(e10, t10, r10) {
          super(e10, "AuthWeakPasswordError", t10, "weak_password"), this.reasons = r10;
        }
      }
      class sa extends r5 {
        constructor(e10) {
          super(e10, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      let so = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), sl = " 	\n\r=".split(""), su = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < sl.length; t10 += 1) e10[sl[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < so.length; t10 += 1) e10[so[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function sc(e10, t10, r10) {
        if (null !== e10) for (t10.queue = t10.queue << 8 | e10, t10.queuedBits += 8; t10.queuedBits >= 6; ) r10(so[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
        else if (t10.queuedBits > 0) for (t10.queue = t10.queue << 6 - t10.queuedBits, t10.queuedBits = 6; t10.queuedBits >= 6; ) r10(so[t10.queue >> t10.queuedBits - 6 & 63]), t10.queuedBits -= 6;
      }
      function sh(e10, t10, r10) {
        let s10 = su[e10];
        if (s10 > -1) for (t10.queue = t10.queue << 6 | s10, t10.queuedBits += 6; t10.queuedBits >= 8; ) r10(t10.queue >> t10.queuedBits - 8 & 255), t10.queuedBits -= 8;
        else if (-2 === s10) return;
        else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e10)}"`);
      }
      function sd(e10) {
        let t10 = [], r10 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, s10 = { utf8seq: 0, codepoint: 0 }, i2 = { queue: 0, queuedBits: 0 }, n2 = (e11) => {
          !function(e12, t11, r11) {
            if (0 === t11.utf8seq) {
              if (e12 <= 127) {
                r11(e12);
                return;
              }
              for (let r12 = 1; r12 < 6; r12 += 1) if ((e12 >> 7 - r12 & 1) == 0) {
                t11.utf8seq = r12;
                break;
              }
              if (2 === t11.utf8seq) t11.codepoint = 31 & e12;
              else if (3 === t11.utf8seq) t11.codepoint = 15 & e12;
              else if (4 === t11.utf8seq) t11.codepoint = 7 & e12;
              else throw Error("Invalid UTF-8 sequence");
              t11.utf8seq -= 1;
            } else if (t11.utf8seq > 0) {
              if (e12 <= 127) throw Error("Invalid UTF-8 sequence");
              t11.codepoint = t11.codepoint << 6 | 63 & e12, t11.utf8seq -= 1, 0 === t11.utf8seq && r11(t11.codepoint);
            }
          }(e11, s10, r10);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) sh(e10.charCodeAt(t11), i2, n2);
        return t10.join("");
      }
      function sp(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, s10 = (e11) => {
          t10.push(e11);
        };
        for (let t11 = 0; t11 < e10.length; t11 += 1) sh(e10.charCodeAt(t11), r10, s10);
        return new Uint8Array(t10);
      }
      function sf(e10) {
        let t10 = [], r10 = { queue: 0, queuedBits: 0 }, s10 = (e11) => {
          t10.push(e11);
        };
        return e10.forEach((e11) => sc(e11, r10, s10)), sc(null, r10, s10), t10.join("");
      }
      let sg = () => "undefined" != typeof window && "undefined" != typeof document, sm = { tested: false, writable: false }, sw = () => {
        if (!sg()) return false;
        try {
          if ("object" != typeof globalThis.localStorage) return false;
        } catch (e11) {
          return false;
        }
        if (sm.tested) return sm.writable;
        let e10 = `lswt-${Math.random()}${Math.random()}`;
        try {
          globalThis.localStorage.setItem(e10, e10), globalThis.localStorage.removeItem(e10), sm.tested = true, sm.writable = true;
        } catch (e11) {
          sm.tested = true, sm.writable = false;
        }
        return sm.writable;
      }, sv = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), sb = (e10) => "object" == typeof e10 && null !== e10 && "status" in e10 && "ok" in e10 && "json" in e10 && "function" == typeof e10.json, sy = async (e10, t10, r10) => {
        await e10.setItem(t10, JSON.stringify(r10));
      }, s_ = async (e10, t10) => {
        let r10 = await e10.getItem(t10);
        if (!r10) return null;
        try {
          return JSON.parse(r10);
        } catch (e11) {
          return r10;
        }
      }, sS = async (e10, t10) => {
        await e10.removeItem(t10);
      };
      class sE {
        constructor() {
          this.promise = new sE.promiseConstructor((e10, t10) => {
            this.resolve = e10, this.reject = t10;
          });
        }
      }
      function sk(e10) {
        let t10 = e10.split(".");
        if (3 !== t10.length) throw new sa("Invalid JWT structure");
        for (let e11 = 0; e11 < t10.length; e11++) if (!r1.test(t10[e11])) throw new sa("JWT not in base64url format");
        return { header: JSON.parse(sd(t10[0])), payload: JSON.parse(sd(t10[1])), signature: sp(t10[2]), raw: { header: t10[0], payload: t10[1] } };
      }
      async function sT(e10) {
        return await new Promise((t10) => {
          setTimeout(() => t10(null), e10);
        });
      }
      function sO(e10) {
        return ("0" + e10.toString(16)).substr(-2);
      }
      async function sR(e10) {
        let t10 = new TextEncoder().encode(e10);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t10))).map((e11) => String.fromCharCode(e11)).join("");
      }
      async function sx(e10) {
        return "undefined" != typeof crypto && void 0 !== crypto.subtle && "undefined" != typeof TextEncoder ? btoa(await sR(e10)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : (console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e10);
      }
      async function sC(e10, t10, r10 = false) {
        let s10 = function() {
          let e11 = new Uint32Array(56);
          if ("undefined" == typeof crypto) {
            let e12 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t11 = e12.length, r11 = "";
            for (let s11 = 0; s11 < 56; s11++) r11 += e12.charAt(Math.floor(Math.random() * t11));
            return r11;
          }
          return crypto.getRandomValues(e11), Array.from(e11, sO).join("");
        }(), i2 = s10;
        r10 && (i2 += "/PASSWORD_RECOVERY"), await sy(e10, `${t10}-code-verifier`, i2);
        let n2 = await sx(s10), a2 = s10 === n2 ? "plain" : "s256";
        return [n2, a2];
      }
      sE.promiseConstructor = Promise;
      let sP = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i, sA = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      function sI(e10) {
        if (!sA.test(e10)) throw Error("@supabase/auth-js: Expected parameter to be UUID but is not");
      }
      function sj() {
        return new Proxy({}, { get: (e10, t10) => {
          if ("__isUserNotAvailableProxy" === t10) return true;
          if ("symbol" == typeof t10) {
            let e11 = t10.toString();
            if ("Symbol(Symbol.toPrimitive)" === e11 || "Symbol(Symbol.toStringTag)" === e11 || "Symbol(util.inspect.custom)" === e11) return;
          }
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t10}" property of the session object is not supported. Please use getUser() instead.`);
        }, set: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        }, deleteProperty: (e10, t10) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t10}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        } });
      }
      function sN(e10) {
        return JSON.parse(JSON.stringify(e10));
      }
      let s$ = (e10) => e10.msg || e10.message || e10.error_description || e10.error || JSON.stringify(e10), sL = [502, 503, 504];
      async function sU(e10) {
        var t10;
        let r10, s10;
        if (!sb(e10)) throw new ss(s$(e10), 0);
        if (sL.includes(e10.status)) throw new ss(s$(e10), e10.status);
        try {
          r10 = await e10.json();
        } catch (e11) {
          throw new r6(s$(e11), e11);
        }
        let i2 = function(e11) {
          let t11 = e11.headers.get(rZ);
          if (!t11 || !t11.match(sP)) return null;
          try {
            return /* @__PURE__ */ new Date(`${t11}T00:00:00.0Z`);
          } catch (e12) {
            return null;
          }
        }(e10);
        if (i2 && i2.getTime() >= r0["2024-01-01"].timestamp && "object" == typeof r10 && r10 && "string" == typeof r10.code ? s10 = r10.code : "object" == typeof r10 && r10 && "string" == typeof r10.error_code && (s10 = r10.error_code), s10) {
          if ("weak_password" === s10) throw new sn(s$(r10), e10.status, (null === (t10 = r10.weak_password) || void 0 === t10 ? void 0 : t10.reasons) || []);
          if ("session_not_found" === s10) throw new r8();
        } else if ("object" == typeof r10 && r10 && "object" == typeof r10.weak_password && r10.weak_password && Array.isArray(r10.weak_password.reasons) && r10.weak_password.reasons.length && r10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true)) throw new sn(s$(r10), e10.status, r10.weak_password.reasons);
        throw new r4(s$(r10), e10.status || 500, s10);
      }
      let sD = (e10, t10, r10, s10) => {
        let i2 = { method: e10, headers: (null == t10 ? void 0 : t10.headers) || {} };
        return "GET" === e10 ? i2 : (i2.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == t10 ? void 0 : t10.headers), i2.body = JSON.stringify(s10), Object.assign(Object.assign({}, i2), r10));
      };
      async function sM(e10, t10, r10, s10) {
        var i2;
        let n2 = Object.assign({}, null == s10 ? void 0 : s10.headers);
        n2[rZ] || (n2[rZ] = r0["2024-01-01"].name), (null == s10 ? void 0 : s10.jwt) && (n2.Authorization = `Bearer ${s10.jwt}`);
        let a2 = null !== (i2 = null == s10 ? void 0 : s10.query) && void 0 !== i2 ? i2 : {};
        (null == s10 ? void 0 : s10.redirectTo) && (a2.redirect_to = s10.redirectTo);
        let o2 = Object.keys(a2).length ? "?" + new URLSearchParams(a2).toString() : "", l2 = await sq(e10, t10, r10 + o2, { headers: n2, noResolveJson: null == s10 ? void 0 : s10.noResolveJson }, {}, null == s10 ? void 0 : s10.body);
        return (null == s10 ? void 0 : s10.xform) ? null == s10 ? void 0 : s10.xform(l2) : { data: Object.assign({}, l2), error: null };
      }
      async function sq(e10, t10, r10, s10, i2, n2) {
        let a2;
        let o2 = sD(t10, s10, i2, n2);
        try {
          a2 = await e10(r10, Object.assign({}, o2));
        } catch (e11) {
          throw console.error(e11), new ss(s$(e11), 0);
        }
        if (a2.ok || await sU(a2), null == s10 ? void 0 : s10.noResolveJson) return a2;
        try {
          return await a2.json();
        } catch (e11) {
          await sU(e11);
        }
      }
      function sB(e10) {
        var t10, r10;
        let s10 = null;
        return e10.access_token && e10.refresh_token && e10.expires_in && (s10 = Object.assign({}, e10), !e10.expires_at) && (s10.expires_at = (r10 = e10.expires_in, Math.round(Date.now() / 1e3) + r10)), { data: { session: s10, user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : e10 }, error: null };
      }
      function sV(e10) {
        let t10 = sB(e10);
        return !t10.error && e10.weak_password && "object" == typeof e10.weak_password && Array.isArray(e10.weak_password.reasons) && e10.weak_password.reasons.length && e10.weak_password.message && "string" == typeof e10.weak_password.message && e10.weak_password.reasons.reduce((e11, t11) => e11 && "string" == typeof t11, true) && (t10.data.weak_password = e10.weak_password), t10;
      }
      function sW(e10) {
        var t10;
        return { data: { user: null !== (t10 = e10.user) && void 0 !== t10 ? t10 : e10 }, error: null };
      }
      function sG(e10) {
        return { data: e10, error: null };
      }
      function sK(e10) {
        let { action_link: t10, email_otp: r10, hashed_token: s10, redirect_to: i2, verification_type: n2 } = e10;
        return { data: { properties: { action_link: t10, email_otp: r10, hashed_token: s10, redirect_to: i2, verification_type: n2 }, user: Object.assign({}, tS(e10, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])) }, error: null };
      }
      function sH(e10) {
        return e10;
      }
      let sz = ["global", "local", "others"];
      class sF {
        constructor({ url: e10 = "", headers: t10 = {}, fetch: r10 }) {
          this.url = e10, this.headers = t10, this.fetch = sv(r10), this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) };
        }
        async signOut(e10, t10 = sz[0]) {
          if (0 > sz.indexOf(t10)) throw Error(`@supabase/auth-js: Parameter scope must be one of ${sz.join(", ")}`);
          try {
            return await sM(this.fetch, "POST", `${this.url}/logout?scope=${t10}`, { headers: this.headers, jwt: e10, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async inviteUserByEmail(e10, t10 = {}) {
          try {
            return await sM(this.fetch, "POST", `${this.url}/invite`, { body: { email: e10, data: t10.data }, headers: this.headers, redirectTo: t10.redirectTo, xform: sW });
          } catch (e11) {
            if (r3(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async generateLink(e10) {
          try {
            let { options: t10 } = e10, r10 = tS(e10, ["options"]), s10 = Object.assign(Object.assign({}, r10), t10);
            return "newEmail" in r10 && (s10.new_email = null == r10 ? void 0 : r10.newEmail, delete s10.newEmail), await sM(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: s10, headers: this.headers, xform: sK, redirectTo: null == t10 ? void 0 : t10.redirectTo });
          } catch (e11) {
            if (r3(e11)) return { data: { properties: null, user: null }, error: e11 };
            throw e11;
          }
        }
        async createUser(e10) {
          try {
            return await sM(this.fetch, "POST", `${this.url}/admin/users`, { body: e10, headers: this.headers, xform: sW });
          } catch (e11) {
            if (r3(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async listUsers(e10) {
          var t10, r10, s10, i2, n2, a2, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await sM(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.page) || void 0 === t10 ? void 0 : t10.toString()) && void 0 !== r10 ? r10 : "", per_page: null !== (i2 = null === (s10 = null == e10 ? void 0 : e10.perPage) || void 0 === s10 ? void 0 : s10.toString()) && void 0 !== i2 ? i2 : "" }, xform: sH });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null !== (n2 = u2.headers.get("x-total-count")) && void 0 !== n2 ? n2 : 0, d2 = null !== (o2 = null === (a2 = u2.headers.get("link")) || void 0 === a2 ? void 0 : a2.split(",")) && void 0 !== o2 ? o2 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (r3(e11)) return { data: { users: [] }, error: e11 };
            throw e11;
          }
        }
        async getUserById(e10) {
          sI(e10);
          try {
            return await sM(this.fetch, "GET", `${this.url}/admin/users/${e10}`, { headers: this.headers, xform: sW });
          } catch (e11) {
            if (r3(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async updateUserById(e10, t10) {
          sI(e10);
          try {
            return await sM(this.fetch, "PUT", `${this.url}/admin/users/${e10}`, { body: t10, headers: this.headers, xform: sW });
          } catch (e11) {
            if (r3(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async deleteUser(e10, t10 = false) {
          sI(e10);
          try {
            return await sM(this.fetch, "DELETE", `${this.url}/admin/users/${e10}`, { headers: this.headers, body: { should_soft_delete: t10 }, xform: sW });
          } catch (e11) {
            if (r3(e11)) return { data: { user: null }, error: e11 };
            throw e11;
          }
        }
        async _listFactors(e10) {
          sI(e10.userId);
          try {
            let { data: t10, error: r10 } = await sM(this.fetch, "GET", `${this.url}/admin/users/${e10.userId}/factors`, { headers: this.headers, xform: (e11) => ({ data: { factors: e11 }, error: null }) });
            return { data: t10, error: r10 };
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteFactor(e10) {
          sI(e10.userId), sI(e10.id);
          try {
            return { data: await sM(this.fetch, "DELETE", `${this.url}/admin/users/${e10.userId}/factors/${e10.id}`, { headers: this.headers }), error: null };
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _listOAuthClients(e10) {
          var t10, r10, s10, i2, n2, a2, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await sM(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.page) || void 0 === t10 ? void 0 : t10.toString()) && void 0 !== r10 ? r10 : "", per_page: null !== (i2 = null === (s10 = null == e10 ? void 0 : e10.perPage) || void 0 === s10 ? void 0 : s10.toString()) && void 0 !== i2 ? i2 : "" }, xform: sH });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null !== (n2 = u2.headers.get("x-total-count")) && void 0 !== n2 ? n2 : 0, d2 = null !== (o2 = null === (a2 = u2.headers.get("link")) || void 0 === a2 ? void 0 : a2.split(",")) && void 0 !== o2 ? o2 : [];
            return d2.length > 0 && (d2.forEach((e11) => {
              let t11 = parseInt(e11.split(";")[0].split("=")[1].substring(0, 1)), r11 = JSON.parse(e11.split(";")[1].split("=")[1]);
              l2[`${r11}Page`] = t11;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e11) {
            if (r3(e11)) return { data: { clients: [] }, error: e11 };
            throw e11;
          }
        }
        async _createOAuthClient(e10) {
          try {
            return await sM(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _getOAuthClient(e10) {
          try {
            return await sM(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _updateOAuthClient(e10, t10) {
          try {
            return await sM(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e10}`, { body: t10, headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _deleteOAuthClient(e10) {
          try {
            return await sM(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e10}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
        async _regenerateOAuthClientSecret(e10) {
          try {
            return await sM(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e10}/regenerate_secret`, { headers: this.headers, xform: (e11) => ({ data: e11, error: null }) });
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            throw e11;
          }
        }
      }
      function sJ(e10 = {}) {
        return { getItem: (t10) => e10[t10] || null, setItem: (t10, r10) => {
          e10[t10] = r10;
        }, removeItem: (t10) => {
          delete e10[t10];
        } };
      }
      let sX = { debug: !!(globalThis && sw() && globalThis.localStorage && "true" === globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")) };
      class sY extends Error {
        constructor(e10) {
          super(e10), this.isAcquireTimeout = true;
        }
      }
      class sQ extends sY {
      }
      async function sZ(e10, t10, r10) {
        sX.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e10, t10);
        let s10 = new globalThis.AbortController();
        return t10 > 0 && setTimeout(() => {
          s10.abort(), sX.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", e10);
        }, t10), await Promise.resolve().then(() => globalThis.navigator.locks.request(e10, 0 === t10 ? { mode: "exclusive", ifAvailable: true } : { mode: "exclusive", signal: s10.signal }, async (s11) => {
          if (s11) {
            sX.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", e10, s11.name);
            try {
              return await r10();
            } finally {
              sX.debug && console.log("@supabase/gotrue-js: navigatorLock: released", e10, s11.name);
            }
          } else {
            if (0 === t10) throw sX.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", e10), new sQ(`Acquiring an exclusive Navigator LockManager lock "${e10}" immediately failed`);
            if (sX.debug) try {
              let e11 = await globalThis.navigator.locks.query();
              console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(e11, null, "  "));
            } catch (e11) {
              console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e11);
            }
            return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await r10();
          }
        }));
      }
      function s0(e10) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(e10)) throw Error(`@supabase/auth-js: Address "${e10}" is invalid.`);
        return e10.toLowerCase();
      }
      class s1 extends Error {
        constructor({ message: e10, code: t10, cause: r10, name: s10 }) {
          var i2;
          super(e10, { cause: r10 }), this.__isWebAuthnError = true, this.name = null !== (i2 = null != s10 ? s10 : r10 instanceof Error ? r10.name : void 0) && void 0 !== i2 ? i2 : "Unknown Error", this.code = t10;
        }
      }
      class s2 extends s1 {
        constructor(e10, t10) {
          super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t10, message: e10 }), this.name = "WebAuthnUnknownError", this.originalError = t10;
        }
      }
      class s3 {
        createNewAbortSignal() {
          if (this.controller) {
            let e11 = Error("Cancelling existing WebAuthn API call for new one");
            e11.name = "AbortError", this.controller.abort(e11);
          }
          let e10 = new AbortController();
          return this.controller = e10, e10.signal;
        }
        cancelCeremony() {
          if (this.controller) {
            let e10 = Error("Manually cancelling existing WebAuthn API call");
            e10.name = "AbortError", this.controller.abort(e10), this.controller = void 0;
          }
        }
      }
      let s4 = new s3();
      function s6(e10) {
        return "localhost" === e10 || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e10);
      }
      function s5() {
        var e10, t10;
        return !!(sg() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && "function" == typeof (null === (e10 = null == navigator ? void 0 : navigator.credentials) || void 0 === e10 ? void 0 : e10.create) && "function" == typeof (null === (t10 = null == navigator ? void 0 : navigator.credentials) || void 0 === t10 ? void 0 : t10.get));
      }
      async function s8(e10) {
        try {
          let t10 = await navigator.credentials.create(e10);
          if (!t10) return { data: null, error: new s2("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new s2("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            var r10, s10, i2;
            let { publicKey: n2 } = t11;
            if (!n2) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new s1({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("ConstraintError" === e11.name) {
              if ((null === (r10 = n2.authenticatorSelection) || void 0 === r10 ? void 0 : r10.requireResidentKey) === true) return new s1({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: e11 });
              if ("conditional" === t11.mediation && (null === (s10 = n2.authenticatorSelection) || void 0 === s10 ? void 0 : s10.userVerification) === "required") return new s1({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: e11 });
              if ((null === (i2 = n2.authenticatorSelection) || void 0 === i2 ? void 0 : i2.userVerification) === "required") return new s1({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: e11 });
            } else if ("InvalidStateError" === e11.name) return new s1({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: e11 });
            else if ("NotAllowedError" === e11.name) return new s1({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("NotSupportedError" === e11.name) return new s1(0 === n2.pubKeyCredParams.filter((e12) => "public-key" === e12.type).length ? { message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: e11 } : { message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!s6(t12)) return new s1({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (n2.rp.id !== t12) return new s1({ message: `The RP ID "${n2.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("TypeError" === e11.name) {
              if (n2.user.id.byteLength < 1 || n2.user.id.byteLength > 64) return new s1({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: e11 });
            } else if ("UnknownError" === e11.name) return new s1({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new s1({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      async function s9(e10) {
        try {
          let t10 = await navigator.credentials.get(e10);
          if (!t10) return { data: null, error: new s2("Empty credential response", t10) };
          if (!(t10 instanceof PublicKeyCredential)) return { data: null, error: new s2("Browser returned unexpected credential type", t10) };
          return { data: t10, error: null };
        } catch (t10) {
          return { data: null, error: function({ error: e11, options: t11 }) {
            let { publicKey: r10 } = t11;
            if (!r10) throw Error("options was missing required publicKey property");
            if ("AbortError" === e11.name) {
              if (t11.signal instanceof AbortSignal) return new s1({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e11 });
            } else if ("NotAllowedError" === e11.name) return new s1({ message: e11.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
            else if ("SecurityError" === e11.name) {
              let t12 = window.location.hostname;
              if (!s6(t12)) return new s1({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e11 });
              if (r10.rpId !== t12) return new s1({ message: `The RP ID "${r10.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e11 });
            } else if ("UnknownError" === e11.name) return new s1({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e11 });
            return new s1({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e11 });
          }({ error: t10, options: e10 }) };
        }
      }
      let s7 = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "direct" }, ie = { userVerification: "preferred", hints: ["security-key"], attestation: "direct" };
      function it(...e10) {
        let t10 = (e11) => null !== e11 && "object" == typeof e11 && !Array.isArray(e11), r10 = (e11) => e11 instanceof ArrayBuffer || ArrayBuffer.isView(e11), s10 = {};
        for (let i2 of e10) if (i2) for (let e11 in i2) {
          let n2 = i2[e11];
          if (void 0 !== n2) {
            if (Array.isArray(n2)) s10[e11] = n2;
            else if (r10(n2)) s10[e11] = n2;
            else if (t10(n2)) {
              let r11 = s10[e11];
              t10(r11) ? s10[e11] = it(r11, n2) : s10[e11] = it(n2);
            } else s10[e11] = n2;
          }
        }
        return s10;
      }
      class ir {
        constructor(e10) {
          this.client = e10, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
        }
        async _enroll(e10) {
          return this.client.mfa.enroll(Object.assign(Object.assign({}, e10), { factorType: "webauthn" }));
        }
        async _challenge({ factorId: e10, webauthn: t10, friendlyName: r10, signal: s10 }, i2) {
          try {
            var n2, a2, o2, l2;
            let { data: u2, error: c2 } = await this.client.mfa.challenge({ factorId: e10, webauthn: t10 });
            if (!u2) return { data: null, error: c2 };
            let h2 = null != s10 ? s10 : s4.createNewAbortSignal();
            if ("create" === u2.webauthn.type) {
              let { user: e11 } = u2.webauthn.credential_options.publicKey;
              e11.name || (e11.name = `${e11.id}:${r10}`), e11.displayName || (e11.displayName = e11.name);
            }
            switch (u2.webauthn.type) {
              case "create": {
                let t11 = (n2 = u2.webauthn.credential_options.publicKey, a2 = null == i2 ? void 0 : i2.create, it(s7, n2, a2 || {})), { data: r11, error: s11 } = await s8({ publicKey: t11, signal: h2 });
                if (r11) return { data: { factorId: e10, challengeId: u2.id, webauthn: { type: u2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: s11 };
              }
              case "request": {
                let t11 = (o2 = u2.webauthn.credential_options.publicKey, l2 = null == i2 ? void 0 : i2.request, it(ie, o2, l2 || {})), { data: r11, error: s11 } = await s9(Object.assign(Object.assign({}, u2.webauthn.credential_options), { publicKey: t11, signal: h2 }));
                if (r11) return { data: { factorId: e10, challengeId: u2.id, webauthn: { type: u2.webauthn.type, credential_response: r11 } }, error: null };
                return { data: null, error: s11 };
              }
            }
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            return { data: null, error: new r6("Unexpected error in challenge", e11) };
          }
        }
        async _verify({ challengeId: e10, factorId: t10, webauthn: r10 }) {
          return this.client.mfa.verify({ factorId: t10, challengeId: e10, webauthn: r10 });
        }
        async _authenticate({ factorId: e10, webauthn: { rpId: t10 = "undefined" != typeof window ? window.location.hostname : void 0, rpOrigins: r10 = "undefined" != typeof window ? [window.location.origin] : void 0, signal: s10 } = {} }, i2) {
          if (!t10) return { data: null, error: new r2("rpId is required for WebAuthn authentication") };
          try {
            if (!s5()) return { data: null, error: new r6("Browser does not support WebAuthn", null) };
            let { data: n2, error: a2 } = await this.challenge({ factorId: e10, webauthn: { rpId: t10, rpOrigins: r10 }, signal: s10 }, { request: i2 });
            if (!n2) return { data: null, error: a2 };
            let { webauthn: o2 } = n2;
            return this._verify({ factorId: e10, challengeId: n2.challengeId, webauthn: { type: o2.type, rpId: t10, rpOrigins: r10, credential_response: o2.credential_response } });
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            return { data: null, error: new r6("Unexpected error in authenticate", e11) };
          }
        }
        async _register({ friendlyName: e10, webauthn: { rpId: t10 = "undefined" != typeof window ? window.location.hostname : void 0, rpOrigins: r10 = "undefined" != typeof window ? [window.location.origin] : void 0, signal: s10 } = {} }, i2) {
          if (!t10) return { data: null, error: new r2("rpId is required for WebAuthn registration") };
          try {
            if (!s5()) return { data: null, error: new r6("Browser does not support WebAuthn", null) };
            let { data: n2, error: a2 } = await this._enroll({ friendlyName: e10 });
            if (!n2) return await this.client.mfa.listFactors().then((t11) => {
              var r11;
              return null === (r11 = t11.data) || void 0 === r11 ? void 0 : r11.all.find((t12) => "webauthn" === t12.factor_type && t12.friendly_name === e10 && "unverified" !== t12.status);
            }).then((e11) => e11 ? this.client.mfa.unenroll({ factorId: null == e11 ? void 0 : e11.id }) : void 0), { data: null, error: a2 };
            let { data: o2, error: l2 } = await this._challenge({ factorId: n2.id, friendlyName: n2.friendly_name, webauthn: { rpId: t10, rpOrigins: r10 }, signal: s10 }, { create: i2 });
            if (!o2) return { data: null, error: l2 };
            return this._verify({ factorId: n2.id, challengeId: o2.challengeId, webauthn: { rpId: t10, rpOrigins: r10, type: o2.webauthn.type, credential_response: o2.webauthn.credential_response } });
          } catch (e11) {
            if (r3(e11)) return { data: null, error: e11 };
            return { data: null, error: new r6("Unexpected error in register", e11) };
          }
        }
      }
      !function() {
        if ("object" != typeof globalThis) try {
          Object.defineProperty(Object.prototype, "__magic__", { get: function() {
            return this;
          }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
        } catch (e10) {
          "undefined" != typeof self && (self.globalThis = self);
        }
      }();
      let is = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: rQ, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false };
      async function ii(e10, t10, r10) {
        return await r10();
      }
      let ia = {};
      class io {
        get jwks() {
          var e10, t10;
          return null !== (t10 = null === (e10 = ia[this.storageKey]) || void 0 === e10 ? void 0 : e10.jwks) && void 0 !== t10 ? t10 : { keys: [] };
        }
        set jwks(e10) {
          ia[this.storageKey] = Object.assign(Object.assign({}, ia[this.storageKey]), { jwks: e10 });
        }
        get jwks_cached_at() {
          var e10, t10;
          return null !== (t10 = null === (e10 = ia[this.storageKey]) || void 0 === e10 ? void 0 : e10.cachedAt) && void 0 !== t10 ? t10 : Number.MIN_SAFE_INTEGER;
        }
        set jwks_cached_at(e10) {
          ia[this.storageKey] = Object.assign(Object.assign({}, ia[this.storageKey]), { cachedAt: e10 });
        }
        constructor(e10) {
          var t10, r10, s10;
          this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
          let i2 = Object.assign(Object.assign({}, is), e10);
          if (this.storageKey = i2.storageKey, this.instanceID = null !== (t10 = io.nextInstanceID[this.storageKey]) && void 0 !== t10 ? t10 : 0, io.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!i2.debug, "function" == typeof i2.debug && (this.logger = i2.debug), this.instanceID > 0 && sg()) {
            let e11 = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
            console.warn(e11), this.logDebugMessages && console.trace(e11);
          }
          if (this.persistSession = i2.persistSession, this.autoRefreshToken = i2.autoRefreshToken, this.admin = new sF({ url: i2.url, headers: i2.headers, fetch: i2.fetch }), this.url = i2.url, this.headers = i2.headers, this.fetch = sv(i2.fetch), this.lock = i2.lock || ii, this.detectSessionInUrl = i2.detectSessionInUrl, this.flowType = i2.flowType, this.hasCustomAuthorizationHeader = i2.hasCustomAuthorizationHeader, this.throwOnError = i2.throwOnError, i2.lock ? this.lock = i2.lock : this.persistSession && sg() && (null === (r10 = null == globalThis ? void 0 : globalThis.navigator) || void 0 === r10 ? void 0 : r10.locks) ? this.lock = sZ : this.lock = ii, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new ir(this) }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this), listGrants: this._listOAuthGrants.bind(this), revokeGrant: this._revokeOAuthGrant.bind(this) }, this.persistSession ? (i2.storage ? this.storage = i2.storage : sw() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = sJ(this.memoryStorage)), i2.userStorage && (this.userStorage = i2.userStorage)) : (this.memoryStorage = {}, this.storage = sJ(this.memoryStorage)), sg() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
              this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            } catch (e11) {
              console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e11);
            }
            null === (s10 = this.broadcastChannel) || void 0 === s10 || s10.addEventListener("message", async (e11) => {
              this._debug("received broadcast notification from other tab or client", e11), await this._notifyAllSubscribers(e11.data.event, e11.data.session, false);
            });
          }
          this.initialize();
        }
        isThrowOnErrorEnabled() {
          return this.throwOnError;
        }
        _returnResult(e10) {
          if (this.throwOnError && e10 && e10.error) throw e10.error;
          return e10;
        }
        _logPrefix() {
          return `GoTrueClient@${this.storageKey}:${this.instanceID} (${rY}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
        }
        _debug(...e10) {
          return this.logDebugMessages && this.logger(this._logPrefix(), ...e10), this;
        }
        async initialize() {
          return this.initializePromise || (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))()), await this.initializePromise;
        }
        async _initialize() {
          var e10;
          try {
            let t10 = {}, r10 = "none";
            if (sg() && (t10 = function(e11) {
              let t11 = {}, r11 = new URL(e11);
              if (r11.hash && "#" === r11.hash[0]) try {
                new URLSearchParams(r11.hash.substring(1)).forEach((e12, r12) => {
                  t11[r12] = e12;
                });
              } catch (e12) {
              }
              return r11.searchParams.forEach((e12, r12) => {
                t11[r12] = e12;
              }), t11;
            }(window.location.href), this._isImplicitGrantCallback(t10) ? r10 = "implicit" : await this._isPKCECallback(t10) && (r10 = "pkce")), sg() && this.detectSessionInUrl && "none" !== r10) {
              let { data: s10, error: i2 } = await this._getSessionFromURL(t10, r10);
              if (i2) {
                if (this._debug("#_initialize()", "error detecting session from URL", i2), r3(i2) && "AuthImplicitGrantRedirectError" === i2.name) {
                  let t11 = null === (e10 = i2.details) || void 0 === e10 ? void 0 : e10.code;
                  if ("identity_already_exists" === t11 || "identity_not_found" === t11 || "single_identity_not_deletable" === t11) return { error: i2 };
                }
                return await this._removeSession(), { error: i2 };
              }
              let { session: n2, redirectType: a2 } = s10;
              return this._debug("#_initialize()", "detected session in URL", n2, "redirect type", a2), await this._saveSession(n2), setTimeout(async () => {
                "recovery" === a2 ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", n2) : await this._notifyAllSubscribers("SIGNED_IN", n2);
              }, 0), { error: null };
            }
            return await this._recoverAndRefresh(), { error: null };
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ error: e11 });
            return this._returnResult({ error: new r6("Unexpected error during initialization", e11) });
          } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e10) {
          var t10, r10, s10;
          try {
            let { data: i2, error: n2 } = await sM(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null !== (r10 = null === (t10 = null == e10 ? void 0 : e10.options) || void 0 === t10 ? void 0 : t10.data) && void 0 !== r10 ? r10 : {}, gotrue_meta_security: { captcha_token: null === (s10 = null == e10 ? void 0 : e10.options) || void 0 === s10 ? void 0 : s10.captchaToken } }, xform: sB });
            if (n2 || !i2) return this._returnResult({ data: { user: null, session: null }, error: n2 });
            let a2 = i2.session, o2 = i2.user;
            return i2.session && (await this._saveSession(i2.session), await this._notifyAllSubscribers("SIGNED_IN", a2)), this._returnResult({ data: { user: o2, session: a2 }, error: null });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signUp(e10) {
          var t10, r10, s10;
          try {
            let i2;
            if ("email" in e10) {
              let { email: r11, password: s11, options: n3 } = e10, a3 = null, o3 = null;
              "pkce" === this.flowType && ([a3, o3] = await sC(this.storage, this.storageKey)), i2 = await sM(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: null == n3 ? void 0 : n3.emailRedirectTo, body: { email: r11, password: s11, data: null !== (t10 = null == n3 ? void 0 : n3.data) && void 0 !== t10 ? t10 : {}, gotrue_meta_security: { captcha_token: null == n3 ? void 0 : n3.captchaToken }, code_challenge: a3, code_challenge_method: o3 }, xform: sB });
            } else if ("phone" in e10) {
              let { phone: t11, password: n3, options: a3 } = e10;
              i2 = await sM(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t11, password: n3, data: null !== (r10 = null == a3 ? void 0 : a3.data) && void 0 !== r10 ? r10 : {}, channel: null !== (s10 = null == a3 ? void 0 : a3.channel) && void 0 !== s10 ? s10 : "sms", gotrue_meta_security: { captcha_token: null == a3 ? void 0 : a3.captchaToken } }, xform: sB });
            } else throw new r7("You must provide either an email or phone number and a password");
            let { data: n2, error: a2 } = i2;
            if (a2 || !n2) return await sS(this.storage, `${this.storageKey}-code-verifier`), this._returnResult({ data: { user: null, session: null }, error: a2 });
            let o2 = n2.session, l2 = n2.user;
            return n2.session && (await this._saveSession(n2.session), await this._notifyAllSubscribers("SIGNED_IN", o2)), this._returnResult({ data: { user: l2, session: o2 }, error: null });
          } catch (e11) {
            if (await sS(this.storage, `${this.storageKey}-code-verifier`), r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithPassword(e10) {
          try {
            let t10;
            if ("email" in e10) {
              let { email: r11, password: s11, options: i2 } = e10;
              t10 = await sM(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r11, password: s11, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } }, xform: sV });
            } else if ("phone" in e10) {
              let { phone: r11, password: s11, options: i2 } = e10;
              t10 = await sM(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r11, password: s11, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } }, xform: sV });
            } else throw new r7("You must provide either an email or phone number and a password");
            let { data: r10, error: s10 } = t10;
            if (s10) return this._returnResult({ data: { user: null, session: null }, error: s10 });
            if (!r10 || !r10.session || !r10.user) {
              let e11 = new r9();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return r10.session && (await this._saveSession(r10.session), await this._notifyAllSubscribers("SIGNED_IN", r10.session)), this._returnResult({ data: Object.assign({ user: r10.user, session: r10.session }, r10.weak_password ? { weakPassword: r10.weak_password } : null), error: s10 });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOAuth(e10) {
          var t10, r10, s10, i2;
          return await this._handleProviderSignIn(e10.provider, { redirectTo: null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, scopes: null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.scopes, queryParams: null === (s10 = e10.options) || void 0 === s10 ? void 0 : s10.queryParams, skipBrowserRedirect: null === (i2 = e10.options) || void 0 === i2 ? void 0 : i2.skipBrowserRedirect });
        }
        async exchangeCodeForSession(e10) {
          return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e10));
        }
        async signInWithWeb3(e10) {
          let { chain: t10 } = e10;
          switch (t10) {
            case "ethereum":
              return await this.signInWithEthereum(e10);
            case "solana":
              return await this.signInWithSolana(e10);
            default:
              throw Error(`@supabase/auth-js: Unsupported chain "${t10}"`);
          }
        }
        async signInWithEthereum(e10) {
          var t10, r10, s10, i2, n2, a2, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let c3;
            let { chain: h3, wallet: g2, statement: m2, options: w2 } = e10;
            if (sg()) {
              if ("object" == typeof g2) c3 = g2;
              else {
                let e11 = window;
                if ("ethereum" in e11 && "object" == typeof e11.ethereum && "request" in e11.ethereum && "function" == typeof e11.ethereum.request) c3 = e11.ethereum;
                else throw Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
              }
            } else {
              if ("object" != typeof g2 || !(null == w2 ? void 0 : w2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
              c3 = g2;
            }
            let v2 = new URL(null !== (t10 = null == w2 ? void 0 : w2.url) && void 0 !== t10 ? t10 : window.location.href), b2 = await c3.request({ method: "eth_requestAccounts" }).then((e11) => e11).catch(() => {
              throw Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
            });
            if (!b2 || 0 === b2.length) throw Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
            let y2 = s0(b2[0]), _2 = null === (r10 = null == w2 ? void 0 : w2.signInWithEthereum) || void 0 === r10 ? void 0 : r10.chainId;
            _2 || (_2 = parseInt(await c3.request({ method: "eth_chainId" }), 16)), p2 = function(e11) {
              var t11;
              let { chainId: r11, domain: s11, expirationTime: i3, issuedAt: n3 = /* @__PURE__ */ new Date(), nonce: a3, notBefore: o3, requestId: l3, resources: u3, scheme: c4, uri: h4, version: d3 } = e11;
              if (!Number.isInteger(r11)) throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r11}`);
              if (!s11) throw Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
              if (a3 && a3.length < 8) throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a3}`);
              if (!h4) throw Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
              if ("1" !== d3) throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d3}`);
              if (null === (t11 = e11.statement) || void 0 === t11 ? void 0 : t11.includes("\n")) throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e11.statement}`);
              let p3 = s0(e11.address), f3 = c4 ? `${c4}://${s11}` : s11, g3 = e11.statement ? `${e11.statement}
` : "", m3 = `${f3} wants you to sign in with your Ethereum account:
${p3}

${g3}`, w3 = `URI: ${h4}
Version: ${d3}
Chain ID: ${r11}${a3 ? `
Nonce: ${a3}` : ""}
Issued At: ${n3.toISOString()}`;
              if (i3 && (w3 += `
Expiration Time: ${i3.toISOString()}`), o3 && (w3 += `
Not Before: ${o3.toISOString()}`), l3 && (w3 += `
Request ID: ${l3}`), u3) {
                let e12 = "\nResources:";
                for (let t12 of u3) {
                  if (!t12 || "string" != typeof t12) throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t12}`);
                  e12 += `
- ${t12}`;
                }
                w3 += e12;
              }
              return `${m3}
${w3}`;
            }({ domain: v2.host, address: y2, statement: m2, uri: v2.href, version: "1", chainId: _2, nonce: null === (s10 = null == w2 ? void 0 : w2.signInWithEthereum) || void 0 === s10 ? void 0 : s10.nonce, issuedAt: null !== (n2 = null === (i2 = null == w2 ? void 0 : w2.signInWithEthereum) || void 0 === i2 ? void 0 : i2.issuedAt) && void 0 !== n2 ? n2 : /* @__PURE__ */ new Date(), expirationTime: null === (a2 = null == w2 ? void 0 : w2.signInWithEthereum) || void 0 === a2 ? void 0 : a2.expirationTime, notBefore: null === (o2 = null == w2 ? void 0 : w2.signInWithEthereum) || void 0 === o2 ? void 0 : o2.notBefore, requestId: null === (l2 = null == w2 ? void 0 : w2.signInWithEthereum) || void 0 === l2 ? void 0 : l2.requestId, resources: null === (u2 = null == w2 ? void 0 : w2.signInWithEthereum) || void 0 === u2 ? void 0 : u2.resources }), f2 = await c3.request({ method: "personal_sign", params: [(d2 = p2, "0x" + Array.from(new TextEncoder().encode(d2), (e11) => e11.toString(16).padStart(2, "0")).join("")), y2] });
          }
          try {
            let { data: t11, error: r11 } = await sM(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: p2, signature: f2 }, (null === (c2 = e10.options) || void 0 === c2 ? void 0 : c2.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (h2 = e10.options) || void 0 === h2 ? void 0 : h2.captchaToken } } : null), xform: sB });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new r9();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSolana(e10) {
          var t10, r10, s10, i2, n2, a2, o2, l2, u2, c2, h2, d2;
          let p2, f2;
          if ("message" in e10) p2 = e10.message, f2 = e10.signature;
          else {
            let h3;
            let { chain: d3, wallet: g2, statement: m2, options: w2 } = e10;
            if (sg()) {
              if ("object" == typeof g2) h3 = g2;
              else {
                let e11 = window;
                if ("solana" in e11 && "object" == typeof e11.solana && ("signIn" in e11.solana && "function" == typeof e11.solana.signIn || "signMessage" in e11.solana && "function" == typeof e11.solana.signMessage)) h3 = e11.solana;
                else throw Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
              }
            } else {
              if ("object" != typeof g2 || !(null == w2 ? void 0 : w2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
              h3 = g2;
            }
            let v2 = new URL(null !== (t10 = null == w2 ? void 0 : w2.url) && void 0 !== t10 ? t10 : window.location.href);
            if ("signIn" in h3 && h3.signIn) {
              let e11;
              let t11 = await h3.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, null == w2 ? void 0 : w2.signInWithSolana), { version: "1", domain: v2.host, uri: v2.href }), m2 ? { statement: m2 } : null));
              if (Array.isArray(t11) && t11[0] && "object" == typeof t11[0]) e11 = t11[0];
              else if (t11 && "object" == typeof t11 && "signedMessage" in t11 && "signature" in t11) e11 = t11;
              else throw Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
              if ("signedMessage" in e11 && "signature" in e11 && ("string" == typeof e11.signedMessage || e11.signedMessage instanceof Uint8Array) && e11.signature instanceof Uint8Array) p2 = "string" == typeof e11.signedMessage ? e11.signedMessage : new TextDecoder().decode(e11.signedMessage), f2 = e11.signature;
              else throw Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
            } else {
              if (!("signMessage" in h3) || "function" != typeof h3.signMessage || !("publicKey" in h3) || "object" != typeof h3 || !h3.publicKey || !("toBase58" in h3.publicKey) || "function" != typeof h3.publicKey.toBase58) throw Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
              p2 = [`${v2.host} wants you to sign in with your Solana account:`, h3.publicKey.toBase58(), ...m2 ? ["", m2, ""] : [""], "Version: 1", `URI: ${v2.href}`, `Issued At: ${null !== (s10 = null === (r10 = null == w2 ? void 0 : w2.signInWithSolana) || void 0 === r10 ? void 0 : r10.issuedAt) && void 0 !== s10 ? s10 : (/* @__PURE__ */ new Date()).toISOString()}`, ...(null === (i2 = null == w2 ? void 0 : w2.signInWithSolana) || void 0 === i2 ? void 0 : i2.notBefore) ? [`Not Before: ${w2.signInWithSolana.notBefore}`] : [], ...(null === (n2 = null == w2 ? void 0 : w2.signInWithSolana) || void 0 === n2 ? void 0 : n2.expirationTime) ? [`Expiration Time: ${w2.signInWithSolana.expirationTime}`] : [], ...(null === (a2 = null == w2 ? void 0 : w2.signInWithSolana) || void 0 === a2 ? void 0 : a2.chainId) ? [`Chain ID: ${w2.signInWithSolana.chainId}`] : [], ...(null === (o2 = null == w2 ? void 0 : w2.signInWithSolana) || void 0 === o2 ? void 0 : o2.nonce) ? [`Nonce: ${w2.signInWithSolana.nonce}`] : [], ...(null === (l2 = null == w2 ? void 0 : w2.signInWithSolana) || void 0 === l2 ? void 0 : l2.requestId) ? [`Request ID: ${w2.signInWithSolana.requestId}`] : [], ...(null === (c2 = null === (u2 = null == w2 ? void 0 : w2.signInWithSolana) || void 0 === u2 ? void 0 : u2.resources) || void 0 === c2 ? void 0 : c2.length) ? ["Resources", ...w2.signInWithSolana.resources.map((e12) => `- ${e12}`)] : []].join("\n");
              let e11 = await h3.signMessage(new TextEncoder().encode(p2), "utf8");
              if (!e11 || !(e11 instanceof Uint8Array)) throw Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
              f2 = e11;
            }
          }
          try {
            let { data: t11, error: r11 } = await sM(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: p2, signature: sf(f2) }, (null === (h2 = e10.options) || void 0 === h2 ? void 0 : h2.captchaToken) ? { gotrue_meta_security: { captcha_token: null === (d2 = e10.options) || void 0 === d2 ? void 0 : d2.captchaToken } } : null), xform: sB });
            if (r11) throw r11;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new r9();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign({}, t11), error: r11 });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _exchangeCodeForSession(e10) {
          let t10 = await s_(this.storage, `${this.storageKey}-code-verifier`), [r10, s10] = (null != t10 ? t10 : "").split("/");
          try {
            if (!r10 && "pkce" === this.flowType) throw new sr();
            let { data: t11, error: i2 } = await sM(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e10, code_verifier: r10 }, xform: sB });
            if (await sS(this.storage, `${this.storageKey}-code-verifier`), i2) throw i2;
            if (!t11 || !t11.session || !t11.user) {
              let e11 = new r9();
              return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            }
            return t11.session && (await this._saveSession(t11.session), await this._notifyAllSubscribers("SIGNED_IN", t11.session)), this._returnResult({ data: Object.assign(Object.assign({}, t11), { redirectType: null != s10 ? s10 : null }), error: i2 });
          } catch (e11) {
            if (await sS(this.storage, `${this.storageKey}-code-verifier`), r3(e11)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithIdToken(e10) {
          try {
            let { options: t10, provider: r10, token: s10, access_token: i2, nonce: n2 } = e10, { data: a2, error: o2 } = await sM(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r10, id_token: s10, access_token: i2, nonce: n2, gotrue_meta_security: { captcha_token: null == t10 ? void 0 : t10.captchaToken } }, xform: sB });
            if (o2) return this._returnResult({ data: { user: null, session: null }, error: o2 });
            if (!a2 || !a2.session || !a2.user) {
              let e11 = new r9();
              return this._returnResult({ data: { user: null, session: null }, error: e11 });
            }
            return a2.session && (await this._saveSession(a2.session), await this._notifyAllSubscribers("SIGNED_IN", a2.session)), this._returnResult({ data: a2, error: o2 });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithOtp(e10) {
          var t10, r10, s10, i2, n2;
          try {
            if ("email" in e10) {
              let { email: s11, options: i3 } = e10, n3 = null, a2 = null;
              "pkce" === this.flowType && ([n3, a2] = await sC(this.storage, this.storageKey));
              let { error: o2 } = await sM(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: s11, data: null !== (t10 = null == i3 ? void 0 : i3.data) && void 0 !== t10 ? t10 : {}, create_user: null === (r10 = null == i3 ? void 0 : i3.shouldCreateUser) || void 0 === r10 || r10, gotrue_meta_security: { captcha_token: null == i3 ? void 0 : i3.captchaToken }, code_challenge: n3, code_challenge_method: a2 }, redirectTo: null == i3 ? void 0 : i3.emailRedirectTo });
              return this._returnResult({ data: { user: null, session: null }, error: o2 });
            }
            if ("phone" in e10) {
              let { phone: t11, options: r11 } = e10, { data: a2, error: o2 } = await sM(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t11, data: null !== (s10 = null == r11 ? void 0 : r11.data) && void 0 !== s10 ? s10 : {}, create_user: null === (i2 = null == r11 ? void 0 : r11.shouldCreateUser) || void 0 === i2 || i2, gotrue_meta_security: { captcha_token: null == r11 ? void 0 : r11.captchaToken }, channel: null !== (n2 = null == r11 ? void 0 : r11.channel) && void 0 !== n2 ? n2 : "sms" } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == a2 ? void 0 : a2.message_id }, error: o2 });
            }
            throw new r7("You must provide either an email or phone number.");
          } catch (e11) {
            if (await sS(this.storage, `${this.storageKey}-code-verifier`), r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async verifyOtp(e10) {
          var t10, r10;
          try {
            let s10, i2;
            "options" in e10 && (s10 = null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo, i2 = null === (r10 = e10.options) || void 0 === r10 ? void 0 : r10.captchaToken);
            let { data: n2, error: a2 } = await sM(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e10), { gotrue_meta_security: { captcha_token: i2 } }), redirectTo: s10, xform: sB });
            if (a2) throw a2;
            if (!n2) throw Error("An error occurred on token verification.");
            let o2 = n2.session, l2 = n2.user;
            return (null == o2 ? void 0 : o2.access_token) && (await this._saveSession(o2), await this._notifyAllSubscribers("recovery" == e10.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o2)), this._returnResult({ data: { user: l2, session: o2 }, error: null });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async signInWithSSO(e10) {
          var t10, r10, s10, i2, n2;
          try {
            let a2 = null, o2 = null;
            "pkce" === this.flowType && ([a2, o2] = await sC(this.storage, this.storageKey));
            let l2 = await sM(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e10 ? { provider_id: e10.providerId } : null), "domain" in e10 ? { domain: e10.domain } : null), { redirect_to: null !== (r10 = null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.redirectTo) && void 0 !== r10 ? r10 : void 0 }), (null === (s10 = null == e10 ? void 0 : e10.options) || void 0 === s10 ? void 0 : s10.captchaToken) ? { gotrue_meta_security: { captcha_token: e10.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: a2, code_challenge_method: o2 }), headers: this.headers, xform: sG });
            return (null === (i2 = l2.data) || void 0 === i2 ? void 0 : i2.url) && sg() && !(null === (n2 = e10.options) || void 0 === n2 ? void 0 : n2.skipBrowserRedirect) && window.location.assign(l2.data.url), this._returnResult(l2);
          } catch (e11) {
            if (await sS(this.storage, `${this.storageKey}-code-verifier`), r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async reauthenticate() {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              if (r10) throw r10;
              if (!t10) throw new r8();
              let { error: s10 } = await sM(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t10.access_token });
              return this._returnResult({ data: { user: null, session: null }, error: s10 });
            });
          } catch (e10) {
            if (r3(e10)) return this._returnResult({ data: { user: null, session: null }, error: e10 });
            throw e10;
          }
        }
        async resend(e10) {
          try {
            let t10 = `${this.url}/resend`;
            if ("email" in e10) {
              let { email: r10, type: s10, options: i2 } = e10, { error: n2 } = await sM(this.fetch, "POST", t10, { headers: this.headers, body: { email: r10, type: s10, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } }, redirectTo: null == i2 ? void 0 : i2.emailRedirectTo });
              return this._returnResult({ data: { user: null, session: null }, error: n2 });
            }
            if ("phone" in e10) {
              let { phone: r10, type: s10, options: i2 } = e10, { data: n2, error: a2 } = await sM(this.fetch, "POST", t10, { headers: this.headers, body: { phone: r10, type: s10, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == n2 ? void 0 : n2.message_id }, error: a2 });
            }
            throw new r7("You must provide either an email or phone number and a type");
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async getSession() {
          return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (e10) => e10));
        }
        async _acquireLock(e10, t10) {
          this._debug("#_acquireLock", "begin", e10);
          try {
            if (this.lockAcquired) {
              let e11 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r10 = (async () => (await e11, await t10()))();
              return this.pendingInLock.push((async () => {
                try {
                  await r10;
                } catch (e12) {
                }
              })()), r10;
            }
            return await this.lock(`lock:${this.storageKey}`, e10, async () => {
              this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
              try {
                this.lockAcquired = true;
                let e11 = t10();
                for (this.pendingInLock.push((async () => {
                  try {
                    await e11;
                  } catch (e12) {
                  }
                })()), await e11; this.pendingInLock.length; ) {
                  let e12 = [...this.pendingInLock];
                  await Promise.all(e12), this.pendingInLock.splice(0, e12.length);
                }
                return await e11;
              } finally {
                this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e10) {
          this._debug("#_useSession", "begin");
          try {
            let t10 = await this.__loadSession();
            return await e10(t10);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
          try {
            let t10 = null, r10 = await s_(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", r10), null !== r10 && (this._isValidSession(r10) ? t10 = r10 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !t10) return { data: { session: null }, error: null };
            let s10 = !!t10.expires_at && 1e3 * t10.expires_at - Date.now() < 9e4;
            if (this._debug("#__loadSession()", `session has${s10 ? "" : " not"} expired`, "expires_at", t10.expires_at), !s10) {
              if (this.userStorage) {
                let e11 = await s_(this.userStorage, this.storageKey + "-user");
                (null == e11 ? void 0 : e11.user) ? t10.user = e11.user : t10.user = sj();
              }
              if (this.storage.isServer && t10.user && !t10.user.__isUserNotAvailableProxy) {
                var e10;
                let r11 = { value: this.suppressGetSessionWarning };
                t10.user = (e10 = t10.user, new Proxy(e10, { get: (e11, t11, s11) => {
                  if ("__isInsecureUserWarningProxy" === t11) return true;
                  if ("symbol" == typeof t11) {
                    let r12 = t11.toString();
                    if ("Symbol(Symbol.toPrimitive)" === r12 || "Symbol(Symbol.toStringTag)" === r12 || "Symbol(util.inspect.custom)" === r12 || "Symbol(nodejs.util.inspect.custom)" === r12) return Reflect.get(e11, t11, s11);
                  }
                  return r11.value || "string" != typeof t11 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), r11.value = true), Reflect.get(e11, t11, s11);
                } })), r11.value && (this.suppressGetSessionWarning = true);
              }
              return { data: { session: t10 }, error: null };
            }
            let { data: i2, error: n2 } = await this._callRefreshToken(t10.refresh_token);
            if (n2) return this._returnResult({ data: { session: null }, error: n2 });
            return this._returnResult({ data: { session: i2 }, error: null });
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e10) {
          if (e10) return await this._getUser(e10);
          await this.initializePromise;
          let t10 = await this._acquireLock(-1, async () => await this._getUser());
          return t10.data.user && (this.suppressGetSessionWarning = true), t10;
        }
        async _getUser(e10) {
          try {
            if (e10) return await sM(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e10, xform: sW });
            return await this._useSession(async (e11) => {
              var t10, r10, s10;
              let { data: i2, error: n2 } = e11;
              if (n2) throw n2;
              return (null === (t10 = i2.session) || void 0 === t10 ? void 0 : t10.access_token) || this.hasCustomAuthorizationHeader ? await sM(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null !== (s10 = null === (r10 = i2.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== s10 ? s10 : void 0, xform: sW }) : { data: { user: null }, error: new r8() };
            });
          } catch (e11) {
            if (r3(e11)) return r3(e11) && "AuthSessionMissingError" === e11.name && (await this._removeSession(), await sS(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async updateUser(e10, t10 = {}) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e10, t10));
        }
        async _updateUser(e10, t10 = {}) {
          try {
            return await this._useSession(async (r10) => {
              let { data: s10, error: i2 } = r10;
              if (i2) throw i2;
              if (!s10.session) throw new r8();
              let n2 = s10.session, a2 = null, o2 = null;
              "pkce" === this.flowType && null != e10.email && ([a2, o2] = await sC(this.storage, this.storageKey));
              let { data: l2, error: u2 } = await sM(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: null == t10 ? void 0 : t10.emailRedirectTo, body: Object.assign(Object.assign({}, e10), { code_challenge: a2, code_challenge_method: o2 }), jwt: n2.access_token, xform: sW });
              if (u2) throw u2;
              return n2.user = l2.user, await this._saveSession(n2), await this._notifyAllSubscribers("USER_UPDATED", n2), this._returnResult({ data: { user: n2.user }, error: null });
            });
          } catch (e11) {
            if (await sS(this.storage, `${this.storageKey}-code-verifier`), r3(e11)) return this._returnResult({ data: { user: null }, error: e11 });
            throw e11;
          }
        }
        async setSession(e10) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e10));
        }
        async _setSession(e10) {
          try {
            if (!e10.access_token || !e10.refresh_token) throw new r8();
            let t10 = Date.now() / 1e3, r10 = t10, s10 = true, i2 = null, { payload: n2 } = sk(e10.access_token);
            if (n2.exp && (s10 = (r10 = n2.exp) <= t10), s10) {
              let { data: t11, error: r11 } = await this._callRefreshToken(e10.refresh_token);
              if (r11) return this._returnResult({ data: { user: null, session: null }, error: r11 });
              if (!t11) return { data: { user: null, session: null }, error: null };
              i2 = t11;
            } else {
              let { data: s11, error: n3 } = await this._getUser(e10.access_token);
              if (n3) throw n3;
              i2 = { access_token: e10.access_token, refresh_token: e10.refresh_token, user: s11.user, token_type: "bearer", expires_in: r10 - t10, expires_at: r10 }, await this._saveSession(i2), await this._notifyAllSubscribers("SIGNED_IN", i2);
            }
            return this._returnResult({ data: { user: i2.user, session: i2 }, error: null });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          }
        }
        async refreshSession(e10) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e10));
        }
        async _refreshSession(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              if (!e10) {
                let { data: s11, error: i3 } = t10;
                if (i3) throw i3;
                e10 = null !== (r10 = s11.session) && void 0 !== r10 ? r10 : void 0;
              }
              if (!(null == e10 ? void 0 : e10.refresh_token)) throw new r8();
              let { data: s10, error: i2 } = await this._callRefreshToken(e10.refresh_token);
              return i2 ? this._returnResult({ data: { user: null, session: null }, error: i2 }) : s10 ? this._returnResult({ data: { user: s10.user, session: s10 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
            throw e11;
          }
        }
        async _getSessionFromURL(e10, t10) {
          try {
            if (!sg()) throw new se("No browser detected.");
            if (e10.error || e10.error_description || e10.error_code) throw new se(e10.error_description || "Error in URL with unspecified error_description", { error: e10.error || "unspecified_error", code: e10.error_code || "unspecified_code" });
            switch (t10) {
              case "implicit":
                if ("pkce" === this.flowType) throw new st("Not a valid PKCE flow url.");
                break;
              case "pkce":
                if ("implicit" === this.flowType) throw new se("Not a valid implicit grant flow url.");
            }
            if ("pkce" === t10) {
              if (this._debug("#_initialize()", "begin", "is PKCE flow", true), !e10.code) throw new st("No code detected.");
              let { data: t11, error: r11 } = await this._exchangeCodeForSession(e10.code);
              if (r11) throw r11;
              let s11 = new URL(window.location.href);
              return s11.searchParams.delete("code"), window.history.replaceState(window.history.state, "", s11.toString()), { data: { session: t11.session, redirectType: null }, error: null };
            }
            let { provider_token: r10, provider_refresh_token: s10, access_token: i2, refresh_token: n2, expires_in: a2, expires_at: o2, token_type: l2 } = e10;
            if (!i2 || !a2 || !n2 || !l2) throw new se("No session defined in URL");
            let u2 = Math.round(Date.now() / 1e3), c2 = parseInt(a2), h2 = u2 + c2;
            o2 && (h2 = parseInt(o2));
            let d2 = h2 - u2;
            1e3 * d2 <= 3e4 && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${d2}s, should have been closer to ${c2}s`);
            let p2 = h2 - c2;
            u2 - p2 >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", p2, h2, u2) : u2 - p2 < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", p2, h2, u2);
            let { data: f2, error: g2 } = await this._getUser(i2);
            if (g2) throw g2;
            let m2 = { provider_token: r10, provider_refresh_token: s10, access_token: i2, expires_in: c2, expires_at: h2, refresh_token: n2, token_type: l2, user: f2.user };
            return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), this._returnResult({ data: { session: m2, redirectType: e10.type }, error: null });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: { session: null, redirectType: null }, error: e11 });
            throw e11;
          }
        }
        _isImplicitGrantCallback(e10) {
          return "function" == typeof this.detectSessionInUrl ? this.detectSessionInUrl(new URL(window.location.href), e10) : !!(e10.access_token || e10.error_description);
        }
        async _isPKCECallback(e10) {
          let t10 = await s_(this.storage, `${this.storageKey}-code-verifier`);
          return !!(e10.code && t10);
        }
        async signOut(e10 = { scope: "global" }) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e10));
        }
        async _signOut({ scope: e10 } = { scope: "global" }) {
          return await this._useSession(async (t10) => {
            var r10;
            let { data: s10, error: i2 } = t10;
            if (i2) return this._returnResult({ error: i2 });
            let n2 = null === (r10 = s10.session) || void 0 === r10 ? void 0 : r10.access_token;
            if (n2) {
              let { error: t11 } = await this.admin.signOut(n2, e10);
              if (t11 && !(r3(t11) && "AuthApiError" === t11.name && (404 === t11.status || 401 === t11.status || 403 === t11.status))) return this._returnResult({ error: t11 });
            }
            return "others" !== e10 && (await this._removeSession(), await sS(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ error: null });
          });
        }
        onAuthStateChange(e10) {
          let t10 = Symbol("auth-callback"), r10 = { id: t10, callback: e10, unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", t10), this.stateChangeEmitters.delete(t10);
          } };
          return this._debug("#onAuthStateChange()", "registered callback with id", t10), this.stateChangeEmitters.set(t10, r10), (async () => {
            await this.initializePromise, await this._acquireLock(-1, async () => {
              this._emitInitialSession(t10);
            });
          })(), { data: { subscription: r10 } };
        }
        async _emitInitialSession(e10) {
          return await this._useSession(async (t10) => {
            var r10, s10;
            try {
              let { data: { session: s11 }, error: i2 } = t10;
              if (i2) throw i2;
              await (null === (r10 = this.stateChangeEmitters.get(e10)) || void 0 === r10 ? void 0 : r10.callback("INITIAL_SESSION", s11)), this._debug("INITIAL_SESSION", "callback id", e10, "session", s11);
            } catch (t11) {
              await (null === (s10 = this.stateChangeEmitters.get(e10)) || void 0 === s10 ? void 0 : s10.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e10, "error", t11), console.error(t11);
            }
          });
        }
        async resetPasswordForEmail(e10, t10 = {}) {
          let r10 = null, s10 = null;
          "pkce" === this.flowType && ([r10, s10] = await sC(this.storage, this.storageKey, true));
          try {
            return await sM(this.fetch, "POST", `${this.url}/recover`, { body: { email: e10, code_challenge: r10, code_challenge_method: s10, gotrue_meta_security: { captcha_token: t10.captchaToken } }, headers: this.headers, redirectTo: t10.redirectTo });
          } catch (e11) {
            if (await sS(this.storage, `${this.storageKey}-code-verifier`), r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async getUserIdentities() {
          var e10;
          try {
            let { data: t10, error: r10 } = await this.getUser();
            if (r10) throw r10;
            return this._returnResult({ data: { identities: null !== (e10 = t10.user.identities) && void 0 !== e10 ? e10 : [] }, error: null });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async linkIdentity(e10) {
          return "token" in e10 ? this.linkIdentityIdToken(e10) : this.linkIdentityOAuth(e10);
        }
        async linkIdentityOAuth(e10) {
          var t10;
          try {
            let { data: r10, error: s10 } = await this._useSession(async (t11) => {
              var r11, s11, i2, n2, a2;
              let { data: o2, error: l2 } = t11;
              if (l2) throw l2;
              let u2 = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e10.provider, { redirectTo: null === (r11 = e10.options) || void 0 === r11 ? void 0 : r11.redirectTo, scopes: null === (s11 = e10.options) || void 0 === s11 ? void 0 : s11.scopes, queryParams: null === (i2 = e10.options) || void 0 === i2 ? void 0 : i2.queryParams, skipBrowserRedirect: true });
              return await sM(this.fetch, "GET", u2, { headers: this.headers, jwt: null !== (a2 = null === (n2 = o2.session) || void 0 === n2 ? void 0 : n2.access_token) && void 0 !== a2 ? a2 : void 0 });
            });
            if (s10) throw s10;
            return !sg() || (null === (t10 = e10.options) || void 0 === t10 ? void 0 : t10.skipBrowserRedirect) || window.location.assign(null == r10 ? void 0 : r10.url), this._returnResult({ data: { provider: e10.provider, url: null == r10 ? void 0 : r10.url }, error: null });
          } catch (t11) {
            if (r3(t11)) return this._returnResult({ data: { provider: e10.provider, url: null }, error: t11 });
            throw t11;
          }
        }
        async linkIdentityIdToken(e10) {
          return await this._useSession(async (t10) => {
            var r10;
            try {
              let { error: s10, data: { session: i2 } } = t10;
              if (s10) throw s10;
              let { options: n2, provider: a2, token: o2, access_token: l2, nonce: u2 } = e10, { data: c2, error: h2 } = await sM(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: null !== (r10 = null == i2 ? void 0 : i2.access_token) && void 0 !== r10 ? r10 : void 0, body: { provider: a2, id_token: o2, access_token: l2, nonce: u2, link_identity: true, gotrue_meta_security: { captcha_token: null == n2 ? void 0 : n2.captchaToken } }, xform: sB });
              if (h2) return this._returnResult({ data: { user: null, session: null }, error: h2 });
              if (!c2 || !c2.session || !c2.user) return this._returnResult({ data: { user: null, session: null }, error: new r9() });
              return c2.session && (await this._saveSession(c2.session), await this._notifyAllSubscribers("USER_UPDATED", c2.session)), this._returnResult({ data: c2, error: h2 });
            } catch (e11) {
              if (await sS(this.storage, `${this.storageKey}-code-verifier`), r3(e11)) return this._returnResult({ data: { user: null, session: null }, error: e11 });
              throw e11;
            }
          });
        }
        async unlinkIdentity(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, s10;
              let { data: i2, error: n2 } = t10;
              if (n2) throw n2;
              return await sM(this.fetch, "DELETE", `${this.url}/user/identities/${e10.identity_id}`, { headers: this.headers, jwt: null !== (s10 = null === (r10 = i2.session) || void 0 === r10 ? void 0 : r10.access_token) && void 0 !== s10 ? s10 : void 0 });
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _refreshAccessToken(e10) {
          let t10 = `#_refreshAccessToken(${e10.substring(0, 5)}...)`;
          this._debug(t10, "begin");
          try {
            var r10, s10;
            let i2 = Date.now();
            return await (r10 = async (r11) => (r11 > 0 && await sT(200 * Math.pow(2, r11 - 1)), this._debug(t10, "refreshing attempt", r11), await sM(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e10 }, headers: this.headers, xform: sB })), s10 = (e11, t11) => {
              let r11 = 200 * Math.pow(2, e11);
              return t11 && si(t11) && Date.now() + r11 - i2 < 3e4;
            }, new Promise((e11, t11) => {
              (async () => {
                for (let i3 = 0; i3 < 1 / 0; i3++) try {
                  let t12 = await r10(i3);
                  if (!s10(i3, null, t12)) {
                    e11(t12);
                    return;
                  }
                } catch (e12) {
                  if (!s10(i3, e12)) {
                    t11(e12);
                    return;
                  }
                }
              })();
            }));
          } catch (e11) {
            if (this._debug(t10, "error", e11), r3(e11)) return this._returnResult({ data: { session: null, user: null }, error: e11 });
            throw e11;
          } finally {
            this._debug(t10, "end");
          }
        }
        _isValidSession(e10) {
          return "object" == typeof e10 && null !== e10 && "access_token" in e10 && "refresh_token" in e10 && "expires_at" in e10;
        }
        async _handleProviderSignIn(e10, t10) {
          let r10 = await this._getUrlForProvider(`${this.url}/authorize`, e10, { redirectTo: t10.redirectTo, scopes: t10.scopes, queryParams: t10.queryParams });
          return this._debug("#_handleProviderSignIn()", "provider", e10, "options", t10, "url", r10), sg() && !t10.skipBrowserRedirect && window.location.assign(r10), { data: { provider: e10, url: r10 }, error: null };
        }
        async _recoverAndRefresh() {
          var e10, t10;
          let r10 = "#_recoverAndRefresh()";
          this._debug(r10, "begin");
          try {
            let s10 = await s_(this.storage, this.storageKey);
            if (s10 && this.userStorage) {
              let t11 = await s_(this.userStorage, this.storageKey + "-user");
              !this.storage.isServer && Object.is(this.storage, this.userStorage) && !t11 && (t11 = { user: s10.user }, await sy(this.userStorage, this.storageKey + "-user", t11)), s10.user = null !== (e10 = null == t11 ? void 0 : t11.user) && void 0 !== e10 ? e10 : sj();
            } else if (s10 && !s10.user && !s10.user) {
              let e11 = await s_(this.storage, this.storageKey + "-user");
              e11 && (null == e11 ? void 0 : e11.user) ? (s10.user = e11.user, await sS(this.storage, this.storageKey + "-user"), await sy(this.storage, this.storageKey, s10)) : s10.user = sj();
            }
            if (this._debug(r10, "session from storage", s10), !this._isValidSession(s10)) {
              this._debug(r10, "session is not valid"), null !== s10 && await this._removeSession();
              return;
            }
            let i2 = (null !== (t10 = s10.expires_at) && void 0 !== t10 ? t10 : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (this._debug(r10, `session has${i2 ? "" : " not"} expired with margin of 90000s`), i2) {
              if (this.autoRefreshToken && s10.refresh_token) {
                let { error: e11 } = await this._callRefreshToken(s10.refresh_token);
                e11 && (console.error(e11), si(e11) || (this._debug(r10, "refresh failed with a non-retryable error, removing the session", e11), await this._removeSession()));
              }
            } else if (s10.user && true === s10.user.__isUserNotAvailableProxy) try {
              let { data: e11, error: t11 } = await this._getUser(s10.access_token);
              !t11 && (null == e11 ? void 0 : e11.user) ? (s10.user = e11.user, await this._saveSession(s10), await this._notifyAllSubscribers("SIGNED_IN", s10)) : this._debug(r10, "could not get user data, skipping SIGNED_IN notification");
            } catch (e11) {
              console.error("Error getting user data:", e11), this._debug(r10, "error getting user data, skipping SIGNED_IN notification", e11);
            }
            else await this._notifyAllSubscribers("SIGNED_IN", s10);
          } catch (e11) {
            this._debug(r10, "error", e11), console.error(e11);
            return;
          } finally {
            this._debug(r10, "end");
          }
        }
        async _callRefreshToken(e10) {
          var t10, r10;
          if (!e10) throw new r8();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          let s10 = `#_callRefreshToken(${e10.substring(0, 5)}...)`;
          this._debug(s10, "begin");
          try {
            this.refreshingDeferred = new sE();
            let { data: t11, error: r11 } = await this._refreshAccessToken(e10);
            if (r11) throw r11;
            if (!t11.session) throw new r8();
            await this._saveSession(t11.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", t11.session);
            let s11 = { data: t11.session, error: null };
            return this.refreshingDeferred.resolve(s11), s11;
          } catch (e11) {
            if (this._debug(s10, "error", e11), r3(e11)) {
              let r11 = { data: null, error: e11 };
              return si(e11) || await this._removeSession(), null === (t10 = this.refreshingDeferred) || void 0 === t10 || t10.resolve(r11), r11;
            }
            throw null === (r10 = this.refreshingDeferred) || void 0 === r10 || r10.reject(e11), e11;
          } finally {
            this.refreshingDeferred = null, this._debug(s10, "end");
          }
        }
        async _notifyAllSubscribers(e10, t10, r10 = true) {
          let s10 = `#_notifyAllSubscribers(${e10})`;
          this._debug(s10, "begin", t10, `broadcast = ${r10}`);
          try {
            this.broadcastChannel && r10 && this.broadcastChannel.postMessage({ event: e10, session: t10 });
            let s11 = [], i2 = Array.from(this.stateChangeEmitters.values()).map(async (r11) => {
              try {
                await r11.callback(e10, t10);
              } catch (e11) {
                s11.push(e11);
              }
            });
            if (await Promise.all(i2), s11.length > 0) {
              for (let e11 = 0; e11 < s11.length; e11 += 1) console.error(s11[e11]);
              throw s11[0];
            }
          } finally {
            this._debug(s10, "end");
          }
        }
        async _saveSession(e10) {
          this._debug("#_saveSession()", e10), this.suppressGetSessionWarning = true, await sS(this.storage, `${this.storageKey}-code-verifier`);
          let t10 = Object.assign({}, e10), r10 = t10.user && true === t10.user.__isUserNotAvailableProxy;
          if (this.userStorage) {
            !r10 && t10.user && await sy(this.userStorage, this.storageKey + "-user", { user: t10.user });
            let e11 = Object.assign({}, t10);
            delete e11.user;
            let s10 = sN(e11);
            await sy(this.storage, this.storageKey, s10);
          } else {
            let e11 = sN(t10);
            await sy(this.storage, this.storageKey, e11);
          }
        }
        async _removeSession() {
          this._debug("#_removeSession()"), this.suppressGetSessionWarning = false, await sS(this.storage, this.storageKey), await sS(this.storage, this.storageKey + "-code-verifier"), await sS(this.storage, this.storageKey + "-user"), this.userStorage && await sS(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()");
          let e10 = this.visibilityChangedCallback;
          this.visibilityChangedCallback = null;
          try {
            e10 && sg() && (null == window ? void 0 : window.removeEventListener) && window.removeEventListener("visibilitychange", e10);
          } catch (e11) {
            console.error("removing visibilitychange callback failed", e11);
          }
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e10 = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          this.autoRefreshTicker = e10, e10 && "object" == typeof e10 && "function" == typeof e10.unref ? e10.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e10), setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e10 = this.autoRefreshTicker;
          this.autoRefreshTicker = null, e10 && clearInterval(e10);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
        }
        async _autoRefreshTokenTick() {
          this._debug("#_autoRefreshTokenTick()", "begin");
          try {
            await this._acquireLock(0, async () => {
              try {
                let e10 = Date.now();
                try {
                  return await this._useSession(async (t10) => {
                    let { data: { session: r10 } } = t10;
                    if (!r10 || !r10.refresh_token || !r10.expires_at) {
                      this._debug("#_autoRefreshTokenTick()", "no session");
                      return;
                    }
                    let s10 = Math.floor((1e3 * r10.expires_at - e10) / 3e4);
                    this._debug("#_autoRefreshTokenTick()", `access token expires in ${s10} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), s10 <= 3 && await this._callRefreshToken(r10.refresh_token);
                  });
                } catch (e11) {
                  console.error("Auto refresh tick failed with error. This is likely a transient error.", e11);
                }
              } finally {
                this._debug("#_autoRefreshTokenTick()", "end");
              }
            });
          } catch (e10) {
            if (e10.isAcquireTimeout || e10 instanceof sY) this._debug("auto refresh token tick lock not available");
            else throw e10;
          }
        }
        async _handleVisibilityChange() {
          if (this._debug("#_handleVisibilityChange()"), !sg() || !(null == window ? void 0 : window.addEventListener)) return this.autoRefreshToken && this.startAutoRefresh(), false;
          try {
            this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false), null == window || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(true);
          } catch (e10) {
            console.error("_handleVisibilityChange", e10);
          }
        }
        async _onVisibilityChanged(e10) {
          let t10 = `#_onVisibilityChanged(${e10})`;
          this._debug(t10, "visibilityState", document.visibilityState), "visible" === document.visibilityState ? (this.autoRefreshToken && this._startAutoRefresh(), e10 || (await this.initializePromise, await this._acquireLock(-1, async () => {
            if ("visible" !== document.visibilityState) {
              this._debug(t10, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
              return;
            }
            await this._recoverAndRefresh();
          }))) : "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
        }
        async _getUrlForProvider(e10, t10, r10) {
          let s10 = [`provider=${encodeURIComponent(t10)}`];
          if ((null == r10 ? void 0 : r10.redirectTo) && s10.push(`redirect_to=${encodeURIComponent(r10.redirectTo)}`), (null == r10 ? void 0 : r10.scopes) && s10.push(`scopes=${encodeURIComponent(r10.scopes)}`), "pkce" === this.flowType) {
            let [e11, t11] = await sC(this.storage, this.storageKey), r11 = new URLSearchParams({ code_challenge: `${encodeURIComponent(e11)}`, code_challenge_method: `${encodeURIComponent(t11)}` });
            s10.push(r11.toString());
          }
          if (null == r10 ? void 0 : r10.queryParams) {
            let e11 = new URLSearchParams(r10.queryParams);
            s10.push(e11.toString());
          }
          return (null == r10 ? void 0 : r10.skipBrowserRedirect) && s10.push(`skip_http_redirect=${r10.skipBrowserRedirect}`), `${e10}?${s10.join("&")}`;
        }
        async _unenroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10;
              let { data: s10, error: i2 } = t10;
              return i2 ? this._returnResult({ data: null, error: i2 }) : await sM(this.fetch, "DELETE", `${this.url}/factors/${e10.factorId}`, { headers: this.headers, jwt: null === (r10 = null == s10 ? void 0 : s10.session) || void 0 === r10 ? void 0 : r10.access_token });
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _enroll(e10) {
          try {
            return await this._useSession(async (t10) => {
              var r10, s10;
              let { data: i2, error: n2 } = t10;
              if (n2) return this._returnResult({ data: null, error: n2 });
              let a2 = Object.assign({ friendly_name: e10.friendlyName, factor_type: e10.factorType }, "phone" === e10.factorType ? { phone: e10.phone } : "totp" === e10.factorType ? { issuer: e10.issuer } : {}), { data: o2, error: l2 } = await sM(this.fetch, "POST", `${this.url}/factors`, { body: a2, headers: this.headers, jwt: null === (r10 = null == i2 ? void 0 : i2.session) || void 0 === r10 ? void 0 : r10.access_token });
              return l2 ? this._returnResult({ data: null, error: l2 }) : ("totp" === e10.factorType && "totp" === o2.type && (null === (s10 = null == o2 ? void 0 : o2.totp) || void 0 === s10 ? void 0 : s10.qr_code) && (o2.totp.qr_code = `data:image/svg+xml;utf-8,${o2.totp.qr_code}`), this._returnResult({ data: o2, error: null }));
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _verify(e10) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t10) => {
                var r10, s10, i2;
                let { data: n2, error: a2 } = t10;
                if (a2) return this._returnResult({ data: null, error: a2 });
                let o2 = Object.assign({ challenge_id: e10.challengeId }, "webauthn" in e10 ? { webauthn: Object.assign(Object.assign({}, e10.webauthn), { credential_response: "create" === e10.webauthn.type ? (s10 = e10.webauthn.credential_response, "toJSON" in s10 && "function" == typeof s10.toJSON ? s10.toJSON() : { id: s10.id, rawId: s10.id, response: { attestationObject: sf(new Uint8Array(s10.response.attestationObject)), clientDataJSON: sf(new Uint8Array(s10.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: s10.getClientExtensionResults(), authenticatorAttachment: null !== (i2 = s10.authenticatorAttachment) && void 0 !== i2 ? i2 : void 0 }) : function(e11) {
                  var t11;
                  if ("toJSON" in e11 && "function" == typeof e11.toJSON) return e11.toJSON();
                  let r11 = e11.getClientExtensionResults(), s11 = e11.response;
                  return { id: e11.id, rawId: e11.id, response: { authenticatorData: sf(new Uint8Array(s11.authenticatorData)), clientDataJSON: sf(new Uint8Array(s11.clientDataJSON)), signature: sf(new Uint8Array(s11.signature)), userHandle: s11.userHandle ? sf(new Uint8Array(s11.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: r11, authenticatorAttachment: null !== (t11 = e11.authenticatorAttachment) && void 0 !== t11 ? t11 : void 0 };
                }(e10.webauthn.credential_response) }) } : { code: e10.code }), { data: l2, error: u2 } = await sM(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/verify`, { body: o2, headers: this.headers, jwt: null === (r10 = null == n2 ? void 0 : n2.session) || void 0 === r10 ? void 0 : r10.access_token });
                return u2 ? this._returnResult({ data: null, error: u2 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + l2.expires_in }, l2)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", l2), this._returnResult({ data: l2, error: u2 }));
              });
            } catch (e11) {
              if (r3(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          });
        }
        async _challenge(e10) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t10) => {
                var r10;
                let { data: s10, error: i2 } = t10;
                if (i2) return this._returnResult({ data: null, error: i2 });
                let n2 = await sM(this.fetch, "POST", `${this.url}/factors/${e10.factorId}/challenge`, { body: e10, headers: this.headers, jwt: null === (r10 = null == s10 ? void 0 : s10.session) || void 0 === r10 ? void 0 : r10.access_token });
                if (n2.error) return n2;
                let { data: a2 } = n2;
                if ("webauthn" !== a2.type) return { data: a2, error: null };
                switch (a2.webauthn.type) {
                  case "create":
                    return { data: Object.assign(Object.assign({}, a2), { webauthn: Object.assign(Object.assign({}, a2.webauthn), { credential_options: Object.assign(Object.assign({}, a2.webauthn.credential_options), { publicKey: function(e11) {
                      if (!e11) throw Error("Credential creation options are required");
                      if ("undefined" != typeof PublicKeyCredential && "parseCreationOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseCreationOptionsFromJSON) return PublicKeyCredential.parseCreationOptionsFromJSON(e11);
                      let { challenge: t11, user: r11, excludeCredentials: s11 } = e11, i3 = tS(e11, ["challenge", "user", "excludeCredentials"]), n3 = sp(t11).buffer, a3 = Object.assign(Object.assign({}, r11), { id: sp(r11.id).buffer }), o2 = Object.assign(Object.assign({}, i3), { challenge: n3, user: a3 });
                      if (s11 && s11.length > 0) {
                        o2.excludeCredentials = Array(s11.length);
                        for (let e12 = 0; e12 < s11.length; e12++) {
                          let t12 = s11[e12];
                          o2.excludeCredentials[e12] = Object.assign(Object.assign({}, t12), { id: sp(t12.id).buffer, type: t12.type || "public-key", transports: t12.transports });
                        }
                      }
                      return o2;
                    }(a2.webauthn.credential_options.publicKey) }) }) }), error: null };
                  case "request":
                    return { data: Object.assign(Object.assign({}, a2), { webauthn: Object.assign(Object.assign({}, a2.webauthn), { credential_options: Object.assign(Object.assign({}, a2.webauthn.credential_options), { publicKey: function(e11) {
                      if (!e11) throw Error("Credential request options are required");
                      if ("undefined" != typeof PublicKeyCredential && "parseRequestOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseRequestOptionsFromJSON) return PublicKeyCredential.parseRequestOptionsFromJSON(e11);
                      let { challenge: t11, allowCredentials: r11 } = e11, s11 = tS(e11, ["challenge", "allowCredentials"]), i3 = sp(t11).buffer, n3 = Object.assign(Object.assign({}, s11), { challenge: i3 });
                      if (r11 && r11.length > 0) {
                        n3.allowCredentials = Array(r11.length);
                        for (let e12 = 0; e12 < r11.length; e12++) {
                          let t12 = r11[e12];
                          n3.allowCredentials[e12] = Object.assign(Object.assign({}, t12), { id: sp(t12.id).buffer, type: t12.type || "public-key", transports: t12.transports });
                        }
                      }
                      return n3;
                    }(a2.webauthn.credential_options.publicKey) }) }) }), error: null };
                }
              });
            } catch (e11) {
              if (r3(e11)) return this._returnResult({ data: null, error: e11 });
              throw e11;
            }
          });
        }
        async _challengeAndVerify(e10) {
          let { data: t10, error: r10 } = await this._challenge({ factorId: e10.factorId });
          return r10 ? this._returnResult({ data: null, error: r10 }) : await this._verify({ factorId: e10.factorId, challengeId: t10.id, code: e10.code });
        }
        async _listFactors() {
          var e10;
          let { data: { user: t10 }, error: r10 } = await this.getUser();
          if (r10) return { data: null, error: r10 };
          let s10 = { all: [], phone: [], totp: [], webauthn: [] };
          for (let r11 of null !== (e10 = null == t10 ? void 0 : t10.factors) && void 0 !== e10 ? e10 : []) s10.all.push(r11), "verified" === r11.status && s10[r11.factor_type].push(r11);
          return { data: s10, error: null };
        }
        async _getAuthenticatorAssuranceLevel() {
          var e10, t10;
          let { data: { session: r10 }, error: s10 } = await this.getSession();
          if (s10) return this._returnResult({ data: null, error: s10 });
          if (!r10) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
          let { payload: i2 } = sk(r10.access_token), n2 = null;
          i2.aal && (n2 = i2.aal);
          let a2 = n2;
          return (null !== (t10 = null === (e10 = r10.user.factors) || void 0 === e10 ? void 0 : e10.filter((e11) => "verified" === e11.status)) && void 0 !== t10 ? t10 : []).length > 0 && (a2 = "aal2"), { data: { currentLevel: n2, nextLevel: a2, currentAuthenticationMethods: i2.amr || [] }, error: null };
        }
        async _getAuthorizationDetails(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s10 } = t10;
              return s10 ? this._returnResult({ data: null, error: s10 }) : r10 ? await sM(this.fetch, "GET", `${this.url}/oauth/authorizations/${e10}`, { headers: this.headers, jwt: r10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new r8() });
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _approveAuthorization(e10, t10) {
          try {
            return await this._useSession(async (r10) => {
              let { data: { session: s10 }, error: i2 } = r10;
              if (i2) return this._returnResult({ data: null, error: i2 });
              if (!s10) return this._returnResult({ data: null, error: new r8() });
              let n2 = await sM(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: s10.access_token, body: { action: "approve" }, xform: (e11) => ({ data: e11, error: null }) });
              return n2.data && n2.data.redirect_url && sg() && !(null == t10 ? void 0 : t10.skipBrowserRedirect) && window.location.assign(n2.data.redirect_url), n2;
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _denyAuthorization(e10, t10) {
          try {
            return await this._useSession(async (r10) => {
              let { data: { session: s10 }, error: i2 } = r10;
              if (i2) return this._returnResult({ data: null, error: i2 });
              if (!s10) return this._returnResult({ data: null, error: new r8() });
              let n2 = await sM(this.fetch, "POST", `${this.url}/oauth/authorizations/${e10}/consent`, { headers: this.headers, jwt: s10.access_token, body: { action: "deny" }, xform: (e11) => ({ data: e11, error: null }) });
              return n2.data && n2.data.redirect_url && sg() && !(null == t10 ? void 0 : t10.skipBrowserRedirect) && window.location.assign(n2.data.redirect_url), n2;
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async _listOAuthGrants() {
          try {
            return await this._useSession(async (e10) => {
              let { data: { session: t10 }, error: r10 } = e10;
              return r10 ? this._returnResult({ data: null, error: r10 }) : t10 ? await sM(this.fetch, "GET", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: t10.access_token, xform: (e11) => ({ data: e11, error: null }) }) : this._returnResult({ data: null, error: new r8() });
            });
          } catch (e10) {
            if (r3(e10)) return this._returnResult({ data: null, error: e10 });
            throw e10;
          }
        }
        async _revokeOAuthGrant(e10) {
          try {
            return await this._useSession(async (t10) => {
              let { data: { session: r10 }, error: s10 } = t10;
              return s10 ? this._returnResult({ data: null, error: s10 }) : r10 ? (await sM(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: r10.access_token, query: { client_id: e10.clientId }, noResolveJson: true }), { data: {}, error: null }) : this._returnResult({ data: null, error: new r8() });
            });
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
        async fetchJwk(e10, t10 = { keys: [] }) {
          let r10 = t10.keys.find((t11) => t11.kid === e10);
          if (r10) return r10;
          let s10 = Date.now();
          if ((r10 = this.jwks.keys.find((t11) => t11.kid === e10)) && this.jwks_cached_at + 6e5 > s10) return r10;
          let { data: i2, error: n2 } = await sM(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
          if (n2) throw n2;
          return i2.keys && 0 !== i2.keys.length && (this.jwks = i2, this.jwks_cached_at = s10, r10 = i2.keys.find((t11) => t11.kid === e10)) ? r10 : null;
        }
        async getClaims(e10, t10 = {}) {
          try {
            let r10 = e10;
            if (!r10) {
              let { data: e11, error: t11 } = await this.getSession();
              if (t11 || !e11.session) return this._returnResult({ data: null, error: t11 });
              r10 = e11.session.access_token;
            }
            let { header: s10, payload: i2, signature: n2, raw: { header: a2, payload: o2 } } = sk(r10);
            (null == t10 ? void 0 : t10.allowExpired) || function(e11) {
              if (!e11) throw Error("Missing exp claim");
              if (e11 <= Math.floor(Date.now() / 1e3)) throw Error("JWT has expired");
            }(i2.exp);
            let l2 = !s10.alg || s10.alg.startsWith("HS") || !s10.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(s10.kid, (null == t10 ? void 0 : t10.keys) ? { keys: t10.keys } : null == t10 ? void 0 : t10.jwks);
            if (!l2) {
              let { error: e11 } = await this.getUser(r10);
              if (e11) throw e11;
              return { data: { claims: i2, header: s10, signature: n2 }, error: null };
            }
            let u2 = function(e11) {
              switch (e11) {
                case "RS256":
                  return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                case "ES256":
                  return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
                default:
                  throw Error("Invalid alg claim");
              }
            }(s10.alg), c2 = await crypto.subtle.importKey("jwk", l2, u2, true, ["verify"]);
            if (!await crypto.subtle.verify(u2, c2, n2, function(e11) {
              let t11 = [];
              return function(e12, t12) {
                for (let r11 = 0; r11 < e12.length; r11 += 1) {
                  let s11 = e12.charCodeAt(r11);
                  if (s11 > 55295 && s11 <= 56319) {
                    let t13 = (s11 - 55296) * 1024 & 65535;
                    s11 = (e12.charCodeAt(r11 + 1) - 56320 & 65535 | t13) + 65536, r11 += 1;
                  }
                  !function(e13, t13) {
                    if (e13 <= 127) {
                      t13(e13);
                      return;
                    }
                    if (e13 <= 2047) {
                      t13(192 | e13 >> 6), t13(128 | 63 & e13);
                      return;
                    }
                    if (e13 <= 65535) {
                      t13(224 | e13 >> 12), t13(128 | e13 >> 6 & 63), t13(128 | 63 & e13);
                      return;
                    }
                    if (e13 <= 1114111) {
                      t13(240 | e13 >> 18), t13(128 | e13 >> 12 & 63), t13(128 | e13 >> 6 & 63), t13(128 | 63 & e13);
                      return;
                    }
                    throw Error(`Unrecognized Unicode codepoint: ${e13.toString(16)}`);
                  }(s11, t12);
                }
              }(e11, (e12) => t11.push(e12)), new Uint8Array(t11);
            }(`${a2}.${o2}`))) throw new sa("Invalid JWT signature");
            return { data: { claims: i2, header: s10, signature: n2 }, error: null };
          } catch (e11) {
            if (r3(e11)) return this._returnResult({ data: null, error: e11 });
            throw e11;
          }
        }
      }
      io.nextInstanceID = {};
      let il = io, iu = "";
      "undefined" != typeof Deno ? iu = "deno" : "undefined" != typeof document ? iu = "web" : "undefined" != typeof navigator && "ReactNative" === navigator.product ? iu = "react-native" : iu = "node";
      let ic = { headers: { "X-Client-Info": `supabase-js-${iu}/2.89.0` } }, ih = { schema: "public" }, id = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" }, ip = {};
      function ig(e10) {
        return (ig = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e11) {
          return typeof e11;
        } : function(e11) {
          return e11 && "function" == typeof Symbol && e11.constructor === Symbol && e11 !== Symbol.prototype ? "symbol" : typeof e11;
        })(e10);
      }
      function im(e10, t10) {
        var r10 = Object.keys(e10);
        if (Object.getOwnPropertySymbols) {
          var s10 = Object.getOwnPropertySymbols(e10);
          t10 && (s10 = s10.filter(function(t11) {
            return Object.getOwnPropertyDescriptor(e10, t11).enumerable;
          })), r10.push.apply(r10, s10);
        }
        return r10;
      }
      function iw(e10) {
        for (var t10 = 1; t10 < arguments.length; t10++) {
          var r10 = null != arguments[t10] ? arguments[t10] : {};
          t10 % 2 ? im(Object(r10), true).forEach(function(t11) {
            !function(e11, t12, r11) {
              var s10;
              (s10 = function(e12, t13) {
                if ("object" != ig(e12) || !e12) return e12;
                var r12 = e12[Symbol.toPrimitive];
                if (void 0 !== r12) {
                  var s11 = r12.call(e12, t13 || "default");
                  if ("object" != ig(s11)) return s11;
                  throw TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === t13 ? String : Number)(e12);
              }(t12, "string"), (t12 = "symbol" == ig(s10) ? s10 : s10 + "") in e11) ? Object.defineProperty(e11, t12, { value: r11, enumerable: true, configurable: true, writable: true }) : e11[t12] = r11;
            }(e10, t11, r10[t11]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e10, Object.getOwnPropertyDescriptors(r10)) : im(Object(r10)).forEach(function(t11) {
            Object.defineProperty(e10, t11, Object.getOwnPropertyDescriptor(r10, t11));
          });
        }
        return e10;
      }
      let iv = (e10) => e10 ? (...t10) => e10(...t10) : (...e11) => fetch(...e11), ib = () => Headers, iy = (e10, t10, r10) => {
        let s10 = iv(r10), i2 = ib();
        return async (r11, n2) => {
          var a2;
          let o2 = null !== (a2 = await t10()) && void 0 !== a2 ? a2 : e10, l2 = new i2(null == n2 ? void 0 : n2.headers);
          return l2.has("apikey") || l2.set("apikey", e10), l2.has("Authorization") || l2.set("Authorization", `Bearer ${o2}`), s10(r11, iw(iw({}, n2), {}, { headers: l2 }));
        };
      };
      var i_ = class extends il {
        constructor(e10) {
          super(e10);
        }
      }, iS = class {
        constructor(e10, t10, r10) {
          var s10, i2, n2;
          this.supabaseUrl = e10, this.supabaseKey = t10;
          let a2 = function(e11) {
            let t11 = null == e11 ? void 0 : e11.trim();
            if (!t11) throw Error("supabaseUrl is required.");
            if (!t11.match(/^https?:\/\//i)) throw Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
            try {
              return new URL(t11.endsWith("/") ? t11 : t11 + "/");
            } catch (e12) {
              throw Error("Invalid supabaseUrl: Provided URL is malformed.");
            }
          }(e10);
          if (!t10) throw Error("supabaseKey is required.");
          this.realtimeUrl = new URL("realtime/v1", a2), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", a2), this.storageUrl = new URL("storage/v1", a2), this.functionsUrl = new URL("functions/v1", a2);
          let o2 = `sb-${a2.hostname.split(".")[0]}-auth-token`, l2 = function(e11, t11) {
            var r11, s11;
            let { db: i3, auth: n3, realtime: a3, global: o3 } = e11, { db: l3, auth: u2, realtime: c2, global: h2 } = t11, d2 = { db: iw(iw({}, l3), i3), auth: iw(iw({}, u2), n3), realtime: iw(iw({}, c2), a3), storage: {}, global: iw(iw(iw({}, h2), o3), {}, { headers: iw(iw({}, null !== (r11 = null == h2 ? void 0 : h2.headers) && void 0 !== r11 ? r11 : {}), null !== (s11 = null == o3 ? void 0 : o3.headers) && void 0 !== s11 ? s11 : {}) }), accessToken: async () => "" };
            return e11.accessToken ? d2.accessToken = e11.accessToken : delete d2.accessToken, d2;
          }(null != r10 ? r10 : {}, { db: ih, realtime: ip, auth: iw(iw({}, id), {}, { storageKey: o2 }), global: ic });
          this.storageKey = null !== (s10 = l2.auth.storageKey) && void 0 !== s10 ? s10 : "", this.headers = null !== (i2 = l2.global.headers) && void 0 !== i2 ? i2 : {}, l2.accessToken ? (this.accessToken = l2.accessToken, this.auth = new Proxy({}, { get: (e11, t11) => {
            throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t11)} is not possible`);
          } })) : this.auth = this._initSupabaseAuthClient(null !== (n2 = l2.auth) && void 0 !== n2 ? n2 : {}, this.headers, l2.global.fetch), this.fetch = iy(t10, this._getAccessToken.bind(this), l2.global.fetch), this.realtime = this._initRealtimeClient(iw({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, l2.realtime)), this.accessToken && this.accessToken().then((e11) => this.realtime.setAuth(e11)).catch((e11) => console.warn("Failed to set initial Realtime auth token:", e11)), this.rest = new t$(new URL("rest/v1", a2).href, { headers: this.headers, schema: l2.db.schema, fetch: this.fetch }), this.storage = new rX(this.storageUrl.href, this.headers, this.fetch, null == r10 ? void 0 : r10.storage), l2.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new tx(this.functionsUrl.href, { headers: this.headers, customFetch: this.fetch });
        }
        from(e10) {
          return this.rest.from(e10);
        }
        schema(e10) {
          return this.rest.schema(e10);
        }
        rpc(e10, t10 = {}, r10 = { head: false, get: false, count: void 0 }) {
          return this.rest.rpc(e10, t10, r10);
        }
        channel(e10, t10 = { config: {} }) {
          return this.realtime.channel(e10, t10);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e10) {
          return this.realtime.removeChannel(e10);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        async _getAccessToken() {
          var e10, t10;
          if (this.accessToken) return await this.accessToken();
          let { data: r10 } = await this.auth.getSession();
          return null !== (e10 = null === (t10 = r10.session) || void 0 === t10 ? void 0 : t10.access_token) && void 0 !== e10 ? e10 : this.supabaseKey;
        }
        _initSupabaseAuthClient({ autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: s10, userStorage: i2, storageKey: n2, flowType: a2, lock: o2, debug: l2, throwOnError: u2 }, c2, h2) {
          let d2 = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
          return new i_({ url: this.authUrl.href, headers: iw(iw({}, d2), c2), storageKey: n2, autoRefreshToken: e10, persistSession: t10, detectSessionInUrl: r10, storage: s10, userStorage: i2, flowType: a2, lock: o2, debug: l2, throwOnError: u2, fetch: h2, hasCustomAuthorizationHeader: Object.keys(this.headers).some((e11) => "authorization" === e11.toLowerCase()) });
        }
        _initRealtimeClient(e10) {
          return new t3(this.realtimeUrl.href, iw(iw({}, e10), {}, { params: iw(iw({}, { apikey: this.supabaseKey }), null == e10 ? void 0 : e10.params) }));
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e10, t10) => {
            this._handleTokenChanged(e10, "CLIENT", null == t10 ? void 0 : t10.access_token);
          });
        }
        _handleTokenChanged(e10, t10, r10) {
          ("TOKEN_REFRESHED" === e10 || "SIGNED_IN" === e10) && this.changedAccessToken !== r10 ? (this.changedAccessToken = r10, this.realtime.setAuth(r10)) : "SIGNED_OUT" === e10 && (this.realtime.setAuth(), "STORAGE" == t10 && this.auth.signOut(), this.changedAccessToken = void 0);
        }
      };
      let iE = (e10, t10, r10) => new iS(e10, t10, r10);
      async function ik(e10) {
        let t10 = Z.next({ request: e10 }), r10 = "https://liqrqoictkoooapagmhp.supabase.co", s10 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcXJxb2ljdGtvb29hcGFnbWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MDgxMjIsImV4cCI6MjA4MTM4NDEyMn0.z8U5WsbdcHlzn5_4lsvmdLCKagRaBL6yE63lyt_m9Pw";
        if (!r10 || !s10) return { supabaseResponse: t10, user: null };
        let i2 = function(e11, t11, r11) {
          if (!e11 || !t11) throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
          let { storage: s11, getAll: i3, setAll: n3, setItems: a2, removedItems: o2 } = function(e12, t12) {
            let r12, s12;
            let i4 = e12.cookies ?? null, n4 = e12.cookieEncoding, a3 = {}, o3 = {};
            if (i4) {
              if ("get" in i4) {
                let e13 = async (e14) => {
                  let t13 = e14.flatMap((e15) => [e15, ...Array.from({ length: 5 }).map((t14, r14) => `${e15}.${r14}`)]), r13 = [];
                  for (let e15 = 0; e15 < t13.length; e15 += 1) {
                    let s13 = await i4.get(t13[e15]);
                    (s13 || "string" == typeof s13) && r13.push({ name: t13[e15], value: s13 });
                  }
                  return r13;
                };
                if (r12 = async (t13) => await e13(t13), "set" in i4 && "remove" in i4) s12 = async (e14) => {
                  for (let t13 = 0; t13 < e14.length; t13 += 1) {
                    let { name: r13, value: s13, options: n5 } = e14[t13];
                    s13 ? await i4.set(r13, s13, n5) : await i4.remove(r13, n5);
                  }
                };
                else if (t12) s12 = async () => {
                  console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
                };
                else throw Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
              } else if ("getAll" in i4) {
                if (r12 = async () => await i4.getAll(), "setAll" in i4) s12 = i4.setAll;
                else if (t12) s12 = async () => {
                  console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
                };
                else throw Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
              } else throw Error(`@supabase/ssr: ${t12 ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).${tu() ? " As this is called in a browser runtime, consider removing the cookies option object to use the document.cookie API automatically." : ""}`);
            } else if (!t12 && tu()) {
              let e13 = () => {
                let e14 = (0, tl.q)(document.cookie);
                return Object.keys(e14).map((t13) => ({ name: t13, value: e14[t13] }));
              };
              r12 = () => e13(), s12 = (e14) => {
                e14.forEach(({ name: e15, value: t13, options: r13 }) => {
                  document.cookie = (0, tl.l)(e15, t13, r13);
                });
              };
            } else if (t12) throw Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
            else r12 = () => [], s12 = () => {
              throw Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
            };
            return t12 ? { getAll: r12, setAll: s12, setItems: a3, removedItems: o3, storage: { isServer: true, getItem: async (e13) => {
              if ("string" == typeof a3[e13]) return a3[e13];
              if (o3[e13]) return null;
              let t13 = await r12([e13]), s13 = await tf(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              if (!s13) return null;
              let i5 = s13;
              return "string" == typeof s13 && s13.startsWith(ty) && (i5 = tb(s13.substring(ty.length))), i5;
            }, setItem: async (t13, i5) => {
              t13.endsWith("-code-verifier") && await t_({ getAll: r12, setAll: s12, setItems: { [t13]: i5 }, removedItems: {} }, { cookieOptions: e12?.cookieOptions ?? null, cookieEncoding: n4 }), a3[t13] = i5, delete o3[t13];
            }, removeItem: async (e13) => {
              delete a3[e13], o3[e13] = true;
            } } } : { getAll: r12, setAll: s12, setItems: a3, removedItems: o3, storage: { isServer: false, getItem: async (e13) => {
              let t13 = await r12([e13]), s13 = await tf(e13, async (e14) => {
                let r13 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r13 ? r13.value : null;
              });
              if (!s13) return null;
              let i5 = s13;
              return s13.startsWith(ty) && (i5 = tb(s13.substring(ty.length))), i5;
            }, setItem: async (t13, i5) => {
              let a4 = await r12([t13]), o4 = new Set((a4?.map(({ name: e13 }) => e13) || []).filter((e13) => td(e13, t13))), l3 = i5;
              "base64url" === n4 && (l3 = ty + tv(i5));
              let u2 = tp(t13, l3);
              u2.forEach(({ name: e13 }) => {
                o4.delete(e13);
              });
              let c2 = { ...tc, ...e12?.cookieOptions, maxAge: 0 }, h2 = { ...tc, ...e12?.cookieOptions, maxAge: tc.maxAge };
              delete c2.name, delete h2.name;
              let d2 = [...[...o4].map((e13) => ({ name: e13, value: "", options: c2 })), ...u2.map(({ name: e13, value: t14 }) => ({ name: e13, value: t14, options: h2 }))];
              d2.length > 0 && await s12(d2);
            }, removeItem: async (t13) => {
              let i5 = await r12([t13]), n5 = (i5?.map(({ name: e13 }) => e13) || []).filter((e13) => td(e13, t13)), a4 = { ...tc, ...e12?.cookieOptions, maxAge: 0 };
              delete a4.name, n5.length > 0 && await s12(n5.map((e13) => ({ name: e13, value: "", options: a4 })));
            } } };
          }({ ...r11, cookieEncoding: r11?.cookieEncoding ?? "base64url" }, true), l2 = iE(e11, t11, { ...r11, global: { ...r11?.global, headers: { ...r11?.global?.headers, "X-Client-Info": "supabase-ssr/0.5.2" } }, auth: { ...r11?.cookieOptions?.name ? { storageKey: r11.cookieOptions.name } : null, ...r11?.auth, flowType: "pkce", autoRefreshToken: false, detectSessionInUrl: false, persistSession: true, storage: s11 } });
          return l2.auth.onAuthStateChange(async (e12) => {
            (Object.keys(a2).length > 0 || Object.keys(o2).length > 0) && ("SIGNED_IN" === e12 || "TOKEN_REFRESHED" === e12 || "USER_UPDATED" === e12 || "PASSWORD_RECOVERY" === e12 || "SIGNED_OUT" === e12 || "MFA_CHALLENGE_VERIFIED" === e12) && await t_({ getAll: i3, setAll: n3, setItems: a2, removedItems: o2 }, { cookieOptions: r11?.cookieOptions ?? null, cookieEncoding: r11?.cookieEncoding ?? "base64url" });
          }), l2;
        }(r10, s10, { cookies: { getAll: () => e10.cookies.getAll(), setAll(r11) {
          r11.forEach(({ name: t11, value: r12 }) => e10.cookies.set(t11, r12)), t10 = Z.next({ request: e10 }), r11.forEach(({ name: e11, value: r12, options: s11 }) => t10.cookies.set(e11, r12, s11));
        } } }), { data: { user: n2 } } = await i2.auth.getUser();
        return { supabaseResponse: t10, user: n2 };
      }
      async function iT(e10) {
        let t10 = e10.nextUrl.pathname;
        if (!to.some((e11) => t10.startsWith(`/${e11}/`) || t10 === `/${e11}`)) {
          let r11 = function(e11) {
            let t11 = e11.nextUrl.pathname, r12 = to.find((e12) => t11.startsWith(`/${e12}/`) || t11 === `/${e12}`);
            if (r12) return r12;
            let s11 = e11.headers.get("accept-language");
            if (s11) {
              let e12 = s11.split(",")[0].split("-")[0].toLowerCase();
              if (to.includes(e12)) return e12;
            }
            return "en";
          }(e10);
          return e10.nextUrl.pathname = `/${r11}${t10}`, Z.redirect(e10.nextUrl, { status: 301 });
        }
        let { supabaseResponse: r10, user: s10 } = await ik(e10);
        if (t10.includes("/dashboard") && !s10) {
          let r11 = t10.split("/")[1] || "en", s11 = new URL(`/${r11}/auth/login`, e10.url);
          return s11.searchParams.set("redirect", t10), Z.redirect(s11);
        }
        return r10;
      }
      (function() {
        if ("undefined" != typeof window || "undefined" == typeof process) return false;
        let e10 = process.version;
        if (null == e10) return false;
        let t10 = e10.match(/^v(\d+)\./);
        return !!t10 && 18 >= parseInt(t10[1], 10);
      })() && console.warn("\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
      let iO = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)"] };
      Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let iR = { ...m }, ix = iR.middleware || iR.default, iC = "/middleware";
      if ("function" != typeof ix) throw Error(`The Middleware "${iC}" must export a \`middleware\` or a \`default\` function`);
      function iP(e10) {
        return ta({ ...e10, page: iC, handler: async (...e11) => {
          try {
            return await ix(...e11);
          } catch (i2) {
            let t10 = e11[0], r10 = new URL(t10.url), s10 = r10.pathname + r10.search;
            throw await y(i2, { path: s10, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), i2;
          }
        } });
      }
    } }, (e) => {
      var t = e(e.s = 478);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*))(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": true, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.mjs", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/avif", "image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "protocol": "https", "hostname": "imagetourl.cloud", "pathname": "/**" }, { "protocol": "https", "hostname": "pub-141831e61e69445289222976a15b6fb3.r2.dev", "pathname": "/**" }, { "protocol": "https", "hostname": "*.r2.dev", "pathname": "/**" }, { "protocol": "https", "hostname": "*.r2.cloudflarestorage.com", "pathname": "/**" }], "unoptimized": true }, "devIndicators": { "appIsrStatus": true, "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/bipulkumar/Documents/Image_to_url", "experimental": { "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 9, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "turbo": { "root": "/Users/bipulkumar/Documents/Image_to_url" }, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "reactOwnerStack": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "bundlePagesRouterDependencies": false, "configFileName": "next.config.mjs", "serverExternalPackages": ["@supabase/ssr", "@supabase/supabase-js"], "_originalRedirects": [{ "source": "/:locale/ptog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/ptog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/ptog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ptols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ptools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/guog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/guog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/guog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/guols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/guools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/thog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/thog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/thog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/thols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/thools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/deog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/deog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/deog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/deols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/deools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/hiog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/hiog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/hiog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/hiols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/hiools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/urog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/urog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/urog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/urols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/urools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/faog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/faog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/faog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/faols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/faools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/idog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/idog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/idog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/idols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/idools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/bnog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/bnog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/bnog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/bnols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/bnools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/myog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/myog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/myog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/myols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/myools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/trog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/trog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/trog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/trols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/trools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/taog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/taog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/taog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/taols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/taools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/teog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/teog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/teog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/teols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/teools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/orog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/orog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/orog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/orols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/orools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/enog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/enog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/enog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/enols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/enools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/swog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/swog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/swog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/swols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/swools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/jaog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/jaog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/jaog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/jaols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/jaools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/viog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/viog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/viog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/viols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/viools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/plog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/plog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/plog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/plols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/plools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/esog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/esog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/esog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/esols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/esools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/zhog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/zhog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/zhog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/zhols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/zhools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/arog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/arog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/arog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/arols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/arools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ruog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/ruog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/ruog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ruols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ruools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/mrog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/mrog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/mrog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/mrols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/mrools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ukog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/ukog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/ukog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ukols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/ukools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/mlog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/mlog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/mlog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/mlols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/mlools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/koog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/koog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/koog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/kools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/koools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/itog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/itog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/itog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/itols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/itools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/frog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/frog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/frog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/frols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/frools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/knog", "destination": "/:locale", "permanent": true }, { "source": "/:locale/knog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "permanent": true }, { "source": "/:locale/knog/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/knols/:path*", "destination": "/:locale/tools/:path*", "permanent": true }, { "source": "/:locale/knools/:path*", "destination": "/:locale/tools/:path*", "permanent": true }] };
var BuildId = "kJIDqQcqPAXbvw-Fqi6nY";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }, { "source": "/:locale/ptog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ptog(?:/)?$" }, { "source": "/:locale/ptog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ptog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/ptog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ptog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ptols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ptols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ptools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ptools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/guog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/guog(?:/)?$" }, { "source": "/:locale/guog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/guog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/guog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/guog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/guols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/guols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/guools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/guools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/thog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/thog(?:/)?$" }, { "source": "/:locale/thog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/thog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/thog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/thog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/thols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/thols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/thools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/thools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/deog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/deog(?:/)?$" }, { "source": "/:locale/deog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/deog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/deog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/deog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/deols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/deols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/deools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/deools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/hiog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/hiog(?:/)?$" }, { "source": "/:locale/hiog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/hiog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/hiog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/hiog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/hiols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/hiols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/hiools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/hiools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/urog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/urog(?:/)?$" }, { "source": "/:locale/urog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/urog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/urog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/urog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/urols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/urols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/urools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/urools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/faog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/faog(?:/)?$" }, { "source": "/:locale/faog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/faog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/faog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/faog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/faols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/faols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/faools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/faools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/idog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/idog(?:/)?$" }, { "source": "/:locale/idog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/idog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/idog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/idog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/idols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/idols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/idools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/idools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/bnog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/bnog(?:/)?$" }, { "source": "/:locale/bnog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/bnog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/bnog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/bnog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/bnols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/bnols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/bnools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/bnools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/myog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/myog(?:/)?$" }, { "source": "/:locale/myog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/myog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/myog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/myog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/myols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/myols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/myools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/myools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/trog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/trog(?:/)?$" }, { "source": "/:locale/trog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/trog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/trog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/trog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/trols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/trols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/trools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/trools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/taog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/taog(?:/)?$" }, { "source": "/:locale/taog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/taog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/taog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/taog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/taols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/taols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/taools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/taools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/teog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/teog(?:/)?$" }, { "source": "/:locale/teog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/teog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/teog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/teog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/teols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/teols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/teools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/teools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/orog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/orog(?:/)?$" }, { "source": "/:locale/orog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/orog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/orog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/orog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/orols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/orols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/orools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/orools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/enog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/enog(?:/)?$" }, { "source": "/:locale/enog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/enog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/enog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/enog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/enols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/enols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/enools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/enools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/swog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/swog(?:/)?$" }, { "source": "/:locale/swog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/swog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/swog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/swog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/swols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/swols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/swools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/swools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/jaog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/jaog(?:/)?$" }, { "source": "/:locale/jaog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/jaog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/jaog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/jaog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/jaols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/jaols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/jaools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/jaools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/viog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/viog(?:/)?$" }, { "source": "/:locale/viog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/viog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/viog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/viog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/viols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/viols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/viools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/viools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/plog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/plog(?:/)?$" }, { "source": "/:locale/plog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/plog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/plog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/plog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/plols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/plols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/plools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/plools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/esog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/esog(?:/)?$" }, { "source": "/:locale/esog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/esog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/esog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/esog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/esols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/esols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/esools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/esools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/zhog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/zhog(?:/)?$" }, { "source": "/:locale/zhog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/zhog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/zhog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/zhog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/zhols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/zhols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/zhools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/zhools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/arog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/arog(?:/)?$" }, { "source": "/:locale/arog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/arog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/arog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/arog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/arols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/arols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/arools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/arools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ruog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ruog(?:/)?$" }, { "source": "/:locale/ruog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ruog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/ruog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ruog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ruols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ruols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ruools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ruools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/mrog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mrog(?:/)?$" }, { "source": "/:locale/mrog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mrog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/mrog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mrog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/mrols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mrols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/mrools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mrools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ukog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ukog(?:/)?$" }, { "source": "/:locale/ukog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ukog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/ukog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ukog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ukols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ukols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/ukools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/ukools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/mlog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mlog(?:/)?$" }, { "source": "/:locale/mlog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mlog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/mlog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mlog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/mlols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mlols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/mlools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/mlools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/koog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/koog(?:/)?$" }, { "source": "/:locale/koog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/koog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/koog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/koog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/kools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/kools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/koools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/koools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/itog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/itog(?:/)?$" }, { "source": "/:locale/itog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/itog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/itog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/itog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/itols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/itols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/itools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/itools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/frog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/frog(?:/)?$" }, { "source": "/:locale/frog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/frog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/frog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/frog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/frols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/frols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/frools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/frools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/knog", "destination": "/:locale", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/knog(?:/)?$" }, { "source": "/:locale/knog/bulk-upload-images-guide", "destination": "/:locale/tools/bulk-upload", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/knog/bulk-upload-images-guide(?:/)?$" }, { "source": "/:locale/knog/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/knog(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/knols/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/knols(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }, { "source": "/:locale/knools/:path*", "destination": "/:locale/tools/:path*", "statusCode": 308, "regex": "^(?!/_next)(?:/([^/]+?))/knools(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }], "routes": { "static": [{ "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/feed.xml", "regex": "^/feed\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/feed\\.xml(?:/)?$" }, { "page": "/robots.txt", "regex": "^/robots\\.txt(?:/)?$", "routeKeys": {}, "namedRegex": "^/robots\\.txt(?:/)?$" }, { "page": "/sitemap.xml", "regex": "^/sitemap\\.xml(?:/)?$", "routeKeys": {}, "namedRegex": "^/sitemap\\.xml(?:/)?$" }], "dynamic": [{ "page": "/api/uploads/[id]", "regex": "^/api/uploads/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/uploads/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/uploads/[id]/expiry", "regex": "^/api/uploads/([^/]+?)/expiry(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/uploads/(?<nxtPid>[^/]+?)/expiry(?:/)?$" }, { "page": "/[locale]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)(?:/)?$" }, { "page": "/[locale]/about", "regex": "^/([^/]+?)/about(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/about(?:/)?$" }, { "page": "/[locale]/admin", "regex": "^/([^/]+?)/admin(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/admin(?:/)?$" }, { "page": "/[locale]/admin/uploads", "regex": "^/([^/]+?)/admin/uploads(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/admin/uploads(?:/)?$" }, { "page": "/[locale]/auth/auth-code-error", "regex": "^/([^/]+?)/auth/auth\\-code\\-error(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/auth/auth\\-code\\-error(?:/)?$" }, { "page": "/[locale]/auth/callback", "regex": "^/([^/]+?)/auth/callback(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/auth/callback(?:/)?$" }, { "page": "/[locale]/auth/login", "regex": "^/([^/]+?)/auth/login(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/auth/login(?:/)?$" }, { "page": "/[locale]/auth/signout", "regex": "^/([^/]+?)/auth/signout(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/auth/signout(?:/)?$" }, { "page": "/[locale]/blog", "regex": "^/([^/]+?)/blog(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog(?:/)?$" }, { "page": "/[locale]/blog/category/[category]", "regex": "^/([^/]+?)/blog/category/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPcategory": "nxtPcategory" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/category/(?<nxtPcategory>[^/]+?)(?:/)?$" }, { "page": "/[locale]/blog/page/[page]", "regex": "^/([^/]+?)/blog/page/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPpage": "nxtPpage" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/page/(?<nxtPpage>[^/]+?)(?:/)?$" }, { "page": "/[locale]/blog/tag/[tag]", "regex": "^/([^/]+?)/blog/tag/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPtag": "nxtPtag" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/tag/(?<nxtPtag>[^/]+?)(?:/)?$" }, { "page": "/[locale]/blog/[slug]", "regex": "^/([^/]+?)/blog/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale", "nxtPslug": "nxtPslug" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/blog/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/[locale]/cookies", "regex": "^/([^/]+?)/cookies(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/cookies(?:/)?$" }, { "page": "/[locale]/dashboard", "regex": "^/([^/]+?)/dashboard(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/dashboard(?:/)?$" }, { "page": "/[locale]/pricing", "regex": "^/([^/]+?)/pricing(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/pricing(?:/)?$" }, { "page": "/[locale]/privacy", "regex": "^/([^/]+?)/privacy(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/privacy(?:/)?$" }, { "page": "/[locale]/terms", "regex": "^/([^/]+?)/terms(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/terms(?:/)?$" }, { "page": "/[locale]/tools/base64-to-url", "regex": "^/([^/]+?)/tools/base64\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/base64\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/bulk-upload", "regex": "^/([^/]+?)/tools/bulk\\-upload(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/bulk\\-upload(?:/)?$" }, { "page": "/[locale]/tools/convert-image-to-link", "regex": "^/([^/]+?)/tools/convert\\-image\\-to\\-link(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/convert\\-image\\-to\\-link(?:/)?$" }, { "page": "/[locale]/tools/convert-picture-to-url", "regex": "^/([^/]+?)/tools/convert\\-picture\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/convert\\-picture\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/create-image-url", "regex": "^/([^/]+?)/tools/create\\-image\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/create\\-image\\-url(?:/)?$" }, { "page": "/[locale]/tools/free-image-hosting", "regex": "^/([^/]+?)/tools/free\\-image\\-hosting(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/free\\-image\\-hosting(?:/)?$" }, { "page": "/[locale]/tools/gif-to-url", "regex": "^/([^/]+?)/tools/gif\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/gif\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/image-embed-code", "regex": "^/([^/]+?)/tools/image\\-embed\\-code(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/image\\-embed\\-code(?:/)?$" }, { "page": "/[locale]/tools/image-link-generator", "regex": "^/([^/]+?)/tools/image\\-link\\-generator(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/image\\-link\\-generator(?:/)?$" }, { "page": "/[locale]/tools/image-to-data-url", "regex": "^/([^/]+?)/tools/image\\-to\\-data\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/image\\-to\\-data\\-url(?:/)?$" }, { "page": "/[locale]/tools/image-to-short-url", "regex": "^/([^/]+?)/tools/image\\-to\\-short\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/image\\-to\\-short\\-url(?:/)?$" }, { "page": "/[locale]/tools/jpeg-to-url", "regex": "^/([^/]+?)/tools/jpeg\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/jpeg\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/jpg-to-url", "regex": "^/([^/]+?)/tools/jpg\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/jpg\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/pdf-to-url", "regex": "^/([^/]+?)/tools/pdf\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/pdf\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/photo-link-creator", "regex": "^/([^/]+?)/tools/photo\\-link\\-creator(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/photo\\-link\\-creator(?:/)?$" }, { "page": "/[locale]/tools/photo-to-url", "regex": "^/([^/]+?)/tools/photo\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/photo\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/picture-to-link", "regex": "^/([^/]+?)/tools/picture\\-to\\-link(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/picture\\-to\\-link(?:/)?$" }, { "page": "/[locale]/tools/picture-url-maker", "regex": "^/([^/]+?)/tools/picture\\-url\\-maker(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/picture\\-url\\-maker(?:/)?$" }, { "page": "/[locale]/tools/png-to-url", "regex": "^/([^/]+?)/tools/png\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/png\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/qr-to-url", "regex": "^/([^/]+?)/tools/qr\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/qr\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/svg-to-url", "regex": "^/([^/]+?)/tools/svg\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/svg\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/upload-image-to-url", "regex": "^/([^/]+?)/tools/upload\\-image\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/upload\\-image\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/url-generator-for-image", "regex": "^/([^/]+?)/tools/url\\-generator\\-for\\-image(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/url\\-generator\\-for\\-image(?:/)?$" }, { "page": "/[locale]/tools/url-to-qr-code", "regex": "^/([^/]+?)/tools/url\\-to\\-qr\\-code(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/url\\-to\\-qr\\-code(?:/)?$" }, { "page": "/[locale]/tools/video-to-url", "regex": "^/([^/]+?)/tools/video\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/video\\-to\\-url(?:/)?$" }, { "page": "/[locale]/tools/webp-to-url", "regex": "^/([^/]+?)/tools/webp\\-to\\-url(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/tools/webp\\-to\\-url(?:/)?$" }, { "page": "/[locale]/use-cases/discord", "regex": "^/([^/]+?)/use\\-cases/discord(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/discord(?:/)?$" }, { "page": "/[locale]/use-cases/espn-fantasy", "regex": "^/([^/]+?)/use\\-cases/espn\\-fantasy(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/espn\\-fantasy(?:/)?$" }, { "page": "/[locale]/use-cases/fantasy-sports", "regex": "^/([^/]+?)/use\\-cases/fantasy\\-sports(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/fantasy\\-sports(?:/)?$" }, { "page": "/[locale]/use-cases/html", "regex": "^/([^/]+?)/use\\-cases/html(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/html(?:/)?$" }, { "page": "/[locale]/use-cases/javascript", "regex": "^/([^/]+?)/use\\-cases/javascript(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/javascript(?:/)?$" }, { "page": "/[locale]/use-cases/minecraft", "regex": "^/([^/]+?)/use\\-cases/minecraft(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/minecraft(?:/)?$" }, { "page": "/[locale]/use-cases/nodejs", "regex": "^/([^/]+?)/use\\-cases/nodejs(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/nodejs(?:/)?$" }, { "page": "/[locale]/use-cases/python", "regex": "^/([^/]+?)/use\\-cases/python(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/python(?:/)?$" }, { "page": "/[locale]/use-cases/react", "regex": "^/([^/]+?)/use\\-cases/react(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/react(?:/)?$" }, { "page": "/[locale]/use-cases/roblox", "regex": "^/([^/]+?)/use\\-cases/roblox(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/roblox(?:/)?$" }, { "page": "/[locale]/use-cases/telegram", "regex": "^/([^/]+?)/use\\-cases/telegram(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/telegram(?:/)?$" }, { "page": "/[locale]/use-cases/vrchat", "regex": "^/([^/]+?)/use\\-cases/vrchat(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/use\\-cases/vrchat(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [{ "source": "/:path*", "headers": [{ "key": "X-DNS-Prefetch-Control", "value": "on" }, { "key": "X-Frame-Options", "value": "SAMEORIGIN" }], "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }];
var PrerenderManifest = { "version": 4, "routes": { "/sitemap.xml": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/sitemap.xml", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/robots.txt": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "text/plain", "x-next-cache-tags": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/robots.txt", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ar/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/ar/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/bn/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/bn/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/de/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/de/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/en/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/en/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/es/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/es/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/fa/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/fa/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/fr/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/fr/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/gu/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/gu/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/hi/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/hi/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/id/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/id/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/it/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/it/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ja/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/ja/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/kn/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/kn/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ko/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/ko/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ml/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/ml/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/mr/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/mr/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/my/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/my/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/or/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/or/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/pl/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/pl/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/pt/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/pt/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ru/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/ru/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/sw/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/sw/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ta/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/ta/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/te/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/te/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/th/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/th/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/tr/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/tr/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/uk/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/uk/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/ur/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/ur/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/vi/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/vi/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/zh/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]/auth/auth-code-error", "dataRoute": "/zh/auth/auth-code-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": { "/[locale]/auth/auth-code-error": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/([^/]+?)/auth/auth\\-code\\-error(?:/)?$", "dataRoute": "/[locale]/auth/auth-code-error.rsc", "fallback": null, "dataRouteRegex": "^/([^/]+?)/auth/auth\\-code\\-error\\.rsc$", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "notFoundRoutes": [], "preview": { "previewModeId": "af2667a00610da849aadc2a8440ebd4f", "previewModeSigningKey": "fc0cf5c1c126f2096886b0aaab3f50402ef56becb6e7fb012e43e1f4c79cfe2e", "previewModeEncryptionKey": "1a4558a652f20d5827154a1324c33afc823174fd9ae1cf53d2f7c1c71e6c28bc" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next\\/static|_next\\/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!api|_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "kJIDqQcqPAXbvw-Fqi6nY", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "RZGUk6o6Xf8fZ17fqMFqGy6fvdacTn02B3prGaTN4vY=", "__NEXT_PREVIEW_MODE_ID": "af2667a00610da849aadc2a8440ebd4f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "1a4558a652f20d5827154a1324c33afc823174fd9ae1cf53d2f7c1c71e6c28bc", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "fc0cf5c1c126f2096886b0aaab3f50402ef56becb6e7fb012e43e1f4c79cfe2e" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/[locale]/auth/callback/route": "/[locale]/auth/callback", "/[locale]/auth/signout/route": "/[locale]/auth/signout", "/api/proxy-image/route": "/api/proxy-image", "/api/push/subscribe/route": "/api/push/subscribe", "/feed.xml/route": "/feed.xml", "/sitemap.xml/route": "/sitemap.xml", "/api/push/unsubscribe/route": "/api/push/unsubscribe", "/robots.txt/route": "/robots.txt", "/api/uploads/[id]/expiry/route": "/api/uploads/[id]/expiry", "/api/admin/users/route": "/api/admin/users", "/api/check-limit/route": "/api/check-limit", "/api/admin/stats/route": "/api/admin/stats", "/api/cron/retry-failed-deletions/route": "/api/cron/retry-failed-deletions", "/api/admin/uploads/route": "/api/admin/uploads", "/api/cron/delete-expired/route": "/api/cron/delete-expired", "/api/uploads/[id]/route": "/api/uploads/[id]", "/api/upload/route": "/api/upload", "/_not-found/page": "/_not-found", "/[locale]/about/page": "/[locale]/about", "/[locale]/blog/page": "/[locale]/blog", "/[locale]/blog/category/[category]/page": "/[locale]/blog/category/[category]", "/[locale]/blog/tag/[tag]/page": "/[locale]/blog/tag/[tag]", "/[locale]/blog/page/[page]/page": "/[locale]/blog/page/[page]", "/[locale]/auth/login/page": "/[locale]/auth/login", "/[locale]/page": "/[locale]", "/[locale]/privacy/page": "/[locale]/privacy", "/[locale]/pricing/page": "/[locale]/pricing", "/[locale]/terms/page": "/[locale]/terms", "/[locale]/cookies/page": "/[locale]/cookies", "/[locale]/blog/[slug]/page": "/[locale]/blog/[slug]", "/[locale]/auth/auth-code-error/page": "/[locale]/auth/auth-code-error", "/[locale]/admin/page": "/[locale]/admin", "/[locale]/tools/bulk-upload/page": "/[locale]/tools/bulk-upload", "/[locale]/admin/uploads/page": "/[locale]/admin/uploads", "/[locale]/tools/convert-image-to-link/page": "/[locale]/tools/convert-image-to-link", "/[locale]/tools/convert-picture-to-url/page": "/[locale]/tools/convert-picture-to-url", "/[locale]/tools/base64-to-url/page": "/[locale]/tools/base64-to-url", "/[locale]/tools/jpg-to-url/page": "/[locale]/tools/jpg-to-url", "/[locale]/tools/image-embed-code/page": "/[locale]/tools/image-embed-code", "/[locale]/tools/image-link-generator/page": "/[locale]/tools/image-link-generator", "/[locale]/tools/jpeg-to-url/page": "/[locale]/tools/jpeg-to-url", "/[locale]/tools/create-image-url/page": "/[locale]/tools/create-image-url", "/[locale]/tools/gif-to-url/page": "/[locale]/tools/gif-to-url", "/[locale]/tools/image-to-data-url/page": "/[locale]/tools/image-to-data-url", "/[locale]/tools/photo-link-creator/page": "/[locale]/tools/photo-link-creator", "/[locale]/tools/pdf-to-url/page": "/[locale]/tools/pdf-to-url", "/[locale]/tools/picture-to-link/page": "/[locale]/tools/picture-to-link", "/[locale]/tools/free-image-hosting/page": "/[locale]/tools/free-image-hosting", "/[locale]/tools/picture-url-maker/page": "/[locale]/tools/picture-url-maker", "/[locale]/tools/png-to-url/page": "/[locale]/tools/png-to-url", "/[locale]/tools/url-to-qr-code/page": "/[locale]/tools/url-to-qr-code", "/[locale]/tools/photo-to-url/page": "/[locale]/tools/photo-to-url", "/[locale]/tools/svg-to-url/page": "/[locale]/tools/svg-to-url", "/[locale]/tools/image-to-short-url/page": "/[locale]/tools/image-to-short-url", "/[locale]/tools/upload-image-to-url/page": "/[locale]/tools/upload-image-to-url", "/[locale]/tools/url-generator-for-image/page": "/[locale]/tools/url-generator-for-image", "/[locale]/tools/webp-to-url/page": "/[locale]/tools/webp-to-url", "/[locale]/use-cases/fantasy-sports/page": "/[locale]/use-cases/fantasy-sports", "/[locale]/use-cases/discord/page": "/[locale]/use-cases/discord", "/[locale]/tools/video-to-url/page": "/[locale]/tools/video-to-url", "/[locale]/use-cases/telegram/page": "/[locale]/use-cases/telegram", "/[locale]/use-cases/react/page": "/[locale]/use-cases/react", "/[locale]/use-cases/nodejs/page": "/[locale]/use-cases/nodejs", "/[locale]/tools/qr-to-url/page": "/[locale]/tools/qr-to-url", "/[locale]/use-cases/minecraft/page": "/[locale]/use-cases/minecraft", "/[locale]/use-cases/vrchat/page": "/[locale]/use-cases/vrchat", "/[locale]/use-cases/python/page": "/[locale]/use-cases/python", "/[locale]/use-cases/javascript/page": "/[locale]/use-cases/javascript", "/[locale]/use-cases/html/page": "/[locale]/use-cases/html", "/[locale]/dashboard/page": "/[locale]/dashboard", "/[locale]/use-cases/espn-fantasy/page": "/[locale]/use-cases/espn-fantasy", "/[locale]/use-cases/roblox/page": "/[locale]/use-cases/roblox" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/admin/uploads": {}, "/api/cron/delete-expired": { "maxDuration": 60 }, "/api/uploads/[id]": {}, "/api/cron/retry-failed-deletions": { "maxDuration": 60 }, "/api/upload": {} } };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/@opennextjs/aws/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
