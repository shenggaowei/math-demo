/** CortexJS Compute Engine 0.12.3 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/complex.js/complex.js
var require_complex = __commonJS({
  "node_modules/complex.js/complex.js"(exports, module) {
    (function(root) {
      "use strict";
      var cosh2 = Math.cosh || function(x) {
        return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
      };
      var sinh2 = Math.sinh || function(x) {
        return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
      };
      var cosm1 = function(x) {
        var b = Math.PI / 4;
        if (-b > x || x > b) {
          return Math.cos(x) - 1;
        }
        var xx = x * x;
        return xx * (xx * (xx * (xx * (xx * (xx * (xx * (xx / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
      };
      var hypot2 = function(x, y) {
        var a = Math.abs(x);
        var b = Math.abs(y);
        if (a < 3e3 && b < 3e3) {
          return Math.sqrt(a * a + b * b);
        }
        if (a < b) {
          a = b;
          b = x / y;
        } else {
          b = y / x;
        }
        return a * Math.sqrt(1 + b * b);
      };
      var parser_exit = function() {
        throw SyntaxError("Invalid Param");
      };
      function logHypot(a, b) {
        var _a = Math.abs(a);
        var _b = Math.abs(b);
        if (a === 0) {
          return Math.log(_b);
        }
        if (b === 0) {
          return Math.log(_a);
        }
        if (_a < 3e3 && _b < 3e3) {
          return Math.log(a * a + b * b) * 0.5;
        }
        a = a / 2;
        b = b / 2;
        return 0.5 * Math.log(a * a + b * b) + Math.LN2;
      }
      var parse = function(a, b) {
        var z = { "re": 0, "im": 0 };
        if (a === void 0 || a === null) {
          z["re"] = z["im"] = 0;
        } else if (b !== void 0) {
          z["re"] = a;
          z["im"] = b;
        } else
          switch (typeof a) {
            case "object":
              if ("im" in a && "re" in a) {
                z["re"] = a["re"];
                z["im"] = a["im"];
              } else if ("abs" in a && "arg" in a) {
                if (!Number.isFinite(a["abs"]) && Number.isFinite(a["arg"])) {
                  return Complex20["INFINITY"];
                }
                z["re"] = a["abs"] * Math.cos(a["arg"]);
                z["im"] = a["abs"] * Math.sin(a["arg"]);
              } else if ("r" in a && "phi" in a) {
                if (!Number.isFinite(a["r"]) && Number.isFinite(a["phi"])) {
                  return Complex20["INFINITY"];
                }
                z["re"] = a["r"] * Math.cos(a["phi"]);
                z["im"] = a["r"] * Math.sin(a["phi"]);
              } else if (a.length === 2) {
                z["re"] = a[0];
                z["im"] = a[1];
              } else {
                parser_exit();
              }
              break;
            case "string":
              z["im"] = /* void */
              z["re"] = 0;
              var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
              var plus = 1;
              var minus = 0;
              if (tokens === null) {
                parser_exit();
              }
              for (var i = 0; i < tokens.length; i++) {
                var c = tokens[i];
                if (c === " " || c === "	" || c === "\n") {
                } else if (c === "+") {
                  plus++;
                } else if (c === "-") {
                  minus++;
                } else if (c === "i" || c === "I") {
                  if (plus + minus === 0) {
                    parser_exit();
                  }
                  if (tokens[i + 1] !== " " && !isNaN(tokens[i + 1])) {
                    z["im"] += parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
                    i++;
                  } else {
                    z["im"] += parseFloat((minus % 2 ? "-" : "") + "1");
                  }
                  plus = minus = 0;
                } else {
                  if (plus + minus === 0 || isNaN(c)) {
                    parser_exit();
                  }
                  if (tokens[i + 1] === "i" || tokens[i + 1] === "I") {
                    z["im"] += parseFloat((minus % 2 ? "-" : "") + c);
                    i++;
                  } else {
                    z["re"] += parseFloat((minus % 2 ? "-" : "") + c);
                  }
                  plus = minus = 0;
                }
              }
              if (plus + minus > 0) {
                parser_exit();
              }
              break;
            case "number":
              z["im"] = 0;
              z["re"] = a;
              break;
            default:
              parser_exit();
          }
        if (isNaN(z["re"]) || isNaN(z["im"])) {
        }
        return z;
      };
      function Complex20(a, b) {
        if (!(this instanceof Complex20)) {
          return new Complex20(a, b);
        }
        var z = parse(a, b);
        this["re"] = z["re"];
        this["im"] = z["im"];
      }
      Complex20.prototype = {
        "re": 0,
        "im": 0,
        /**
         * Calculates the sign of a complex number, which is a normalized complex
         *
         * @returns {Complex}
         */
        "sign": function() {
          var abs2 = this["abs"]();
          return new Complex20(
            this["re"] / abs2,
            this["im"] / abs2
          );
        },
        /**
         * Adds two complex numbers
         *
         * @returns {Complex}
         */
        "add": function(a, b) {
          var z = new Complex20(a, b);
          if (this["isInfinite"]() && z["isInfinite"]()) {
            return Complex20["NAN"];
          }
          if (this["isInfinite"]() || z["isInfinite"]()) {
            return Complex20["INFINITY"];
          }
          return new Complex20(
            this["re"] + z["re"],
            this["im"] + z["im"]
          );
        },
        /**
         * Subtracts two complex numbers
         *
         * @returns {Complex}
         */
        "sub": function(a, b) {
          var z = new Complex20(a, b);
          if (this["isInfinite"]() && z["isInfinite"]()) {
            return Complex20["NAN"];
          }
          if (this["isInfinite"]() || z["isInfinite"]()) {
            return Complex20["INFINITY"];
          }
          return new Complex20(
            this["re"] - z["re"],
            this["im"] - z["im"]
          );
        },
        /**
         * Multiplies two complex numbers
         *
         * @returns {Complex}
         */
        "mul": function(a, b) {
          var z = new Complex20(a, b);
          if (this["isInfinite"]() && z["isZero"]() || this["isZero"]() && z["isInfinite"]()) {
            return Complex20["NAN"];
          }
          if (this["isInfinite"]() || z["isInfinite"]()) {
            return Complex20["INFINITY"];
          }
          if (z["im"] === 0 && this["im"] === 0) {
            return new Complex20(this["re"] * z["re"], 0);
          }
          return new Complex20(
            this["re"] * z["re"] - this["im"] * z["im"],
            this["re"] * z["im"] + this["im"] * z["re"]
          );
        },
        /**
         * Divides two complex numbers
         *
         * @returns {Complex}
         */
        "div": function(a, b) {
          var z = new Complex20(a, b);
          if (this["isZero"]() && z["isZero"]() || this["isInfinite"]() && z["isInfinite"]()) {
            return Complex20["NAN"];
          }
          if (this["isInfinite"]() || z["isZero"]()) {
            return Complex20["INFINITY"];
          }
          if (this["isZero"]() || z["isInfinite"]()) {
            return Complex20["ZERO"];
          }
          a = this["re"];
          b = this["im"];
          var c = z["re"];
          var d = z["im"];
          var t, x;
          if (0 === d) {
            return new Complex20(a / c, b / c);
          }
          if (Math.abs(c) < Math.abs(d)) {
            x = c / d;
            t = c * x + d;
            return new Complex20(
              (a * x + b) / t,
              (b * x - a) / t
            );
          } else {
            x = d / c;
            t = d * x + c;
            return new Complex20(
              (a + b * x) / t,
              (b - a * x) / t
            );
          }
        },
        /**
         * Calculate the power of two complex numbers
         *
         * @returns {Complex}
         */
        "pow": function(a, b) {
          var z = new Complex20(a, b);
          a = this["re"];
          b = this["im"];
          if (z["isZero"]()) {
            return Complex20["ONE"];
          }
          if (z["im"] === 0) {
            if (b === 0 && a > 0) {
              return new Complex20(Math.pow(a, z["re"]), 0);
            } else if (a === 0) {
              switch ((z["re"] % 4 + 4) % 4) {
                case 0:
                  return new Complex20(Math.pow(b, z["re"]), 0);
                case 1:
                  return new Complex20(0, Math.pow(b, z["re"]));
                case 2:
                  return new Complex20(-Math.pow(b, z["re"]), 0);
                case 3:
                  return new Complex20(0, -Math.pow(b, z["re"]));
              }
            }
          }
          if (a === 0 && b === 0 && z["re"] > 0 && z["im"] >= 0) {
            return Complex20["ZERO"];
          }
          var arg = Math.atan2(b, a);
          var loh = logHypot(a, b);
          a = Math.exp(z["re"] * loh - z["im"] * arg);
          b = z["im"] * loh + z["re"] * arg;
          return new Complex20(
            a * Math.cos(b),
            a * Math.sin(b)
          );
        },
        /**
         * Calculate the complex square root
         *
         * @returns {Complex}
         */
        "sqrt": function() {
          var a = this["re"];
          var b = this["im"];
          var r = this["abs"]();
          var re, im;
          if (a >= 0) {
            if (b === 0) {
              return new Complex20(Math.sqrt(a), 0);
            }
            re = 0.5 * Math.sqrt(2 * (r + a));
          } else {
            re = Math.abs(b) / Math.sqrt(2 * (r - a));
          }
          if (a <= 0) {
            im = 0.5 * Math.sqrt(2 * (r - a));
          } else {
            im = Math.abs(b) / Math.sqrt(2 * (r + a));
          }
          return new Complex20(re, b < 0 ? -im : im);
        },
        /**
         * Calculate the complex exponent
         *
         * @returns {Complex}
         */
        "exp": function() {
          var tmp = Math.exp(this["re"]);
          if (this["im"] === 0) {
          }
          return new Complex20(
            tmp * Math.cos(this["im"]),
            tmp * Math.sin(this["im"])
          );
        },
        /**
         * Calculate the complex exponent and subtracts one.
         *
         * This may be more accurate than `Complex(x).exp().sub(1)` if
         * `x` is small.
         *
         * @returns {Complex}
         */
        "expm1": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex20(
            Math.expm1(a) * Math.cos(b) + cosm1(b),
            Math.exp(a) * Math.sin(b)
          );
        },
        /**
         * Calculate the natural log
         *
         * @returns {Complex}
         */
        "log": function() {
          var a = this["re"];
          var b = this["im"];
          if (b === 0 && a > 0) {
          }
          return new Complex20(
            logHypot(a, b),
            Math.atan2(b, a)
          );
        },
        /**
         * Calculate the magnitude of the complex number
         *
         * @returns {number}
         */
        "abs": function() {
          return hypot2(this["re"], this["im"]);
        },
        /**
         * Calculate the angle of the complex number
         *
         * @returns {number}
         */
        "arg": function() {
          return Math.atan2(this["im"], this["re"]);
        },
        /**
         * Calculate the sine of the complex number
         *
         * @returns {Complex}
         */
        "sin": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex20(
            Math.sin(a) * cosh2(b),
            Math.cos(a) * sinh2(b)
          );
        },
        /**
         * Calculate the cosine
         *
         * @returns {Complex}
         */
        "cos": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex20(
            Math.cos(a) * cosh2(b),
            -Math.sin(a) * sinh2(b)
          );
        },
        /**
         * Calculate the tangent
         *
         * @returns {Complex}
         */
        "tan": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = Math.cos(a) + cosh2(b);
          return new Complex20(
            Math.sin(a) / d,
            sinh2(b) / d
          );
        },
        /**
         * Calculate the cotangent
         *
         * @returns {Complex}
         */
        "cot": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = Math.cos(a) - cosh2(b);
          return new Complex20(
            -Math.sin(a) / d,
            sinh2(b) / d
          );
        },
        /**
         * Calculate the secant
         *
         * @returns {Complex}
         */
        "sec": function() {
          var a = this["re"];
          var b = this["im"];
          var d = 0.5 * cosh2(2 * b) + 0.5 * Math.cos(2 * a);
          return new Complex20(
            Math.cos(a) * cosh2(b) / d,
            Math.sin(a) * sinh2(b) / d
          );
        },
        /**
         * Calculate the cosecans
         *
         * @returns {Complex}
         */
        "csc": function() {
          var a = this["re"];
          var b = this["im"];
          var d = 0.5 * cosh2(2 * b) - 0.5 * Math.cos(2 * a);
          return new Complex20(
            Math.sin(a) * cosh2(b) / d,
            -Math.cos(a) * sinh2(b) / d
          );
        },
        /**
         * Calculate the complex arcus sinus
         *
         * @returns {Complex}
         */
        "asin": function() {
          var a = this["re"];
          var b = this["im"];
          var t1 = new Complex20(
            b * b - a * a + 1,
            -2 * a * b
          )["sqrt"]();
          var t2 = new Complex20(
            t1["re"] - b,
            t1["im"] + a
          )["log"]();
          return new Complex20(t2["im"], -t2["re"]);
        },
        /**
         * Calculate the complex arcus cosinus
         *
         * @returns {Complex}
         */
        "acos": function() {
          var a = this["re"];
          var b = this["im"];
          var t1 = new Complex20(
            b * b - a * a + 1,
            -2 * a * b
          )["sqrt"]();
          var t2 = new Complex20(
            t1["re"] - b,
            t1["im"] + a
          )["log"]();
          return new Complex20(Math.PI / 2 - t2["im"], t2["re"]);
        },
        /**
         * Calculate the complex arcus tangent
         *
         * @returns {Complex}
         */
        "atan": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0) {
            if (b === 1) {
              return new Complex20(0, Infinity);
            }
            if (b === -1) {
              return new Complex20(0, -Infinity);
            }
          }
          var d = a * a + (1 - b) * (1 - b);
          var t1 = new Complex20(
            (1 - b * b - a * a) / d,
            -2 * a / d
          ).log();
          return new Complex20(-0.5 * t1["im"], 0.5 * t1["re"]);
        },
        /**
         * Calculate the complex arcus cotangent
         *
         * @returns {Complex}
         */
        "acot": function() {
          var a = this["re"];
          var b = this["im"];
          if (b === 0) {
            return new Complex20(Math.atan2(1, a), 0);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex20(
            a / d,
            -b / d
          ).atan() : new Complex20(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).atan();
        },
        /**
         * Calculate the complex arcus secant
         *
         * @returns {Complex}
         */
        "asec": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0 && b === 0) {
            return new Complex20(0, Infinity);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex20(
            a / d,
            -b / d
          ).acos() : new Complex20(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).acos();
        },
        /**
         * Calculate the complex arcus cosecans
         *
         * @returns {Complex}
         */
        "acsc": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0 && b === 0) {
            return new Complex20(Math.PI / 2, Infinity);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex20(
            a / d,
            -b / d
          ).asin() : new Complex20(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).asin();
        },
        /**
         * Calculate the complex sinh
         *
         * @returns {Complex}
         */
        "sinh": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex20(
            sinh2(a) * Math.cos(b),
            cosh2(a) * Math.sin(b)
          );
        },
        /**
         * Calculate the complex cosh
         *
         * @returns {Complex}
         */
        "cosh": function() {
          var a = this["re"];
          var b = this["im"];
          return new Complex20(
            cosh2(a) * Math.cos(b),
            sinh2(a) * Math.sin(b)
          );
        },
        /**
         * Calculate the complex tanh
         *
         * @returns {Complex}
         */
        "tanh": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = cosh2(a) + Math.cos(b);
          return new Complex20(
            sinh2(a) / d,
            Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex coth
         *
         * @returns {Complex}
         */
        "coth": function() {
          var a = 2 * this["re"];
          var b = 2 * this["im"];
          var d = cosh2(a) - Math.cos(b);
          return new Complex20(
            sinh2(a) / d,
            -Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex coth
         *
         * @returns {Complex}
         */
        "csch": function() {
          var a = this["re"];
          var b = this["im"];
          var d = Math.cos(2 * b) - cosh2(2 * a);
          return new Complex20(
            -2 * sinh2(a) * Math.cos(b) / d,
            2 * cosh2(a) * Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex sech
         *
         * @returns {Complex}
         */
        "sech": function() {
          var a = this["re"];
          var b = this["im"];
          var d = Math.cos(2 * b) + cosh2(2 * a);
          return new Complex20(
            2 * cosh2(a) * Math.cos(b) / d,
            -2 * sinh2(a) * Math.sin(b) / d
          );
        },
        /**
         * Calculate the complex asinh
         *
         * @returns {Complex}
         */
        "asinh": function() {
          var tmp = this["im"];
          this["im"] = -this["re"];
          this["re"] = tmp;
          var res = this["asin"]();
          this["re"] = -this["im"];
          this["im"] = tmp;
          tmp = res["re"];
          res["re"] = -res["im"];
          res["im"] = tmp;
          return res;
        },
        /**
         * Calculate the complex acosh
         *
         * @returns {Complex}
         */
        "acosh": function() {
          var res = this["acos"]();
          if (res["im"] <= 0) {
            var tmp = res["re"];
            res["re"] = -res["im"];
            res["im"] = tmp;
          } else {
            var tmp = res["im"];
            res["im"] = -res["re"];
            res["re"] = tmp;
          }
          return res;
        },
        /**
         * Calculate the complex atanh
         *
         * @returns {Complex}
         */
        "atanh": function() {
          var a = this["re"];
          var b = this["im"];
          var noIM = a > 1 && b === 0;
          var oneMinus = 1 - a;
          var onePlus = 1 + a;
          var d = oneMinus * oneMinus + b * b;
          var x = d !== 0 ? new Complex20(
            (onePlus * oneMinus - b * b) / d,
            (b * oneMinus + onePlus * b) / d
          ) : new Complex20(
            a !== -1 ? a / 0 : 0,
            b !== 0 ? b / 0 : 0
          );
          var temp = x["re"];
          x["re"] = logHypot(x["re"], x["im"]) / 2;
          x["im"] = Math.atan2(x["im"], temp) / 2;
          if (noIM) {
            x["im"] = -x["im"];
          }
          return x;
        },
        /**
         * Calculate the complex acoth
         *
         * @returns {Complex}
         */
        "acoth": function() {
          var a = this["re"];
          var b = this["im"];
          if (a === 0 && b === 0) {
            return new Complex20(0, Math.PI / 2);
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex20(
            a / d,
            -b / d
          ).atanh() : new Complex20(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).atanh();
        },
        /**
         * Calculate the complex acsch
         *
         * @returns {Complex}
         */
        "acsch": function() {
          var a = this["re"];
          var b = this["im"];
          if (b === 0) {
            return new Complex20(
              a !== 0 ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity,
              0
            );
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex20(
            a / d,
            -b / d
          ).asinh() : new Complex20(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).asinh();
        },
        /**
         * Calculate the complex asech
         *
         * @returns {Complex}
         */
        "asech": function() {
          var a = this["re"];
          var b = this["im"];
          if (this["isZero"]()) {
            return Complex20["INFINITY"];
          }
          var d = a * a + b * b;
          return d !== 0 ? new Complex20(
            a / d,
            -b / d
          ).acosh() : new Complex20(
            a !== 0 ? a / 0 : 0,
            b !== 0 ? -b / 0 : 0
          ).acosh();
        },
        /**
         * Calculate the complex inverse 1/z
         *
         * @returns {Complex}
         */
        "inverse": function() {
          if (this["isZero"]()) {
            return Complex20["INFINITY"];
          }
          if (this["isInfinite"]()) {
            return Complex20["ZERO"];
          }
          var a = this["re"];
          var b = this["im"];
          var d = a * a + b * b;
          return new Complex20(a / d, -b / d);
        },
        /**
         * Returns the complex conjugate
         *
         * @returns {Complex}
         */
        "conjugate": function() {
          return new Complex20(this["re"], -this["im"]);
        },
        /**
         * Gets the negated complex number
         *
         * @returns {Complex}
         */
        "neg": function() {
          return new Complex20(-this["re"], -this["im"]);
        },
        /**
         * Ceils the actual complex number
         *
         * @returns {Complex}
         */
        "ceil": function(places) {
          places = Math.pow(10, places || 0);
          return new Complex20(
            Math.ceil(this["re"] * places) / places,
            Math.ceil(this["im"] * places) / places
          );
        },
        /**
         * Floors the actual complex number
         *
         * @returns {Complex}
         */
        "floor": function(places) {
          places = Math.pow(10, places || 0);
          return new Complex20(
            Math.floor(this["re"] * places) / places,
            Math.floor(this["im"] * places) / places
          );
        },
        /**
         * Ceils the actual complex number
         *
         * @returns {Complex}
         */
        "round": function(places) {
          places = Math.pow(10, places || 0);
          return new Complex20(
            Math.round(this["re"] * places) / places,
            Math.round(this["im"] * places) / places
          );
        },
        /**
         * Compares two complex numbers
         *
         * **Note:** new Complex(Infinity).equals(Infinity) === false
         *
         * @returns {boolean}
         */
        "equals": function(a, b) {
          var z = new Complex20(a, b);
          return Math.abs(z["re"] - this["re"]) <= Complex20["EPSILON"] && Math.abs(z["im"] - this["im"]) <= Complex20["EPSILON"];
        },
        /**
         * Clones the actual object
         *
         * @returns {Complex}
         */
        "clone": function() {
          return new Complex20(this["re"], this["im"]);
        },
        /**
         * Gets a string of the actual complex number
         *
         * @returns {string}
         */
        "toString": function() {
          var a = this["re"];
          var b = this["im"];
          var ret = "";
          if (this["isNaN"]()) {
            return "NaN";
          }
          if (this["isInfinite"]()) {
            return "Infinity";
          }
          if (Math.abs(a) < Complex20["EPSILON"]) {
            a = 0;
          }
          if (Math.abs(b) < Complex20["EPSILON"]) {
            b = 0;
          }
          if (b === 0) {
            return ret + a;
          }
          if (a !== 0) {
            ret += a;
            ret += " ";
            if (b < 0) {
              b = -b;
              ret += "-";
            } else {
              ret += "+";
            }
            ret += " ";
          } else if (b < 0) {
            b = -b;
            ret += "-";
          }
          if (1 !== b) {
            ret += b;
          }
          return ret + "i";
        },
        /**
         * Returns the actual number as a vector
         *
         * @returns {Array}
         */
        "toVector": function() {
          return [this["re"], this["im"]];
        },
        /**
         * Returns the actual real value of the current object
         *
         * @returns {number|null}
         */
        "valueOf": function() {
          if (this["im"] === 0) {
            return this["re"];
          }
          return null;
        },
        /**
         * Determines whether a complex number is not on the Riemann sphere.
         *
         * @returns {boolean}
         */
        "isNaN": function() {
          return isNaN(this["re"]) || isNaN(this["im"]);
        },
        /**
         * Determines whether or not a complex number is at the zero pole of the
         * Riemann sphere.
         *
         * @returns {boolean}
         */
        "isZero": function() {
          return this["im"] === 0 && this["re"] === 0;
        },
        /**
         * Determines whether a complex number is not at the infinity pole of the
         * Riemann sphere.
         *
         * @returns {boolean}
         */
        "isFinite": function() {
          return isFinite(this["re"]) && isFinite(this["im"]);
        },
        /**
         * Determines whether or not a complex number is at the infinity pole of the
         * Riemann sphere.
         *
         * @returns {boolean}
         */
        "isInfinite": function() {
          return !(this["isNaN"]() || this["isFinite"]());
        }
      };
      Complex20["ZERO"] = new Complex20(0, 0);
      Complex20["ONE"] = new Complex20(1, 0);
      Complex20["I"] = new Complex20(0, 1);
      Complex20["PI"] = new Complex20(Math.PI, 0);
      Complex20["E"] = new Complex20(Math.E, 0);
      Complex20["INFINITY"] = new Complex20(Infinity, Infinity);
      Complex20["NAN"] = new Complex20(NaN, NaN);
      Complex20["EPSILON"] = 1e-15;
      if (typeof define === "function" && define["amd"]) {
        define([], function() {
          return Complex20;
        });
      } else if (typeof exports === "object") {
        Object.defineProperty(Complex20, "__esModule", { "value": true });
        Complex20["default"] = Complex20;
        Complex20["Complex"] = Complex20;
        module["exports"] = Complex20;
      } else {
        root["Complex"] = Complex20;
      }
    })(exports);
  }
});

// src/compute-engine/latex-syntax/public.ts
function isSymbolEntry(entry) {
  return !("kind" in entry) || entry.kind === "symbol";
}
function isFunctionEntry(entry) {
  return !("kind" in entry) || entry.kind === "function";
}
function isMatchfixEntry(entry) {
  return "kind" in entry && entry.kind === "matchfix";
}
function isInfixEntry(entry) {
  return "kind" in entry && entry.kind === "infix";
}
function isPrefixEntry(entry) {
  return "kind" in entry && entry.kind === "prefix";
}
function isPostfixEntry(entry) {
  return "kind" in entry && entry.kind === "postfix";
}
function isEnvironmentEntry(entry) {
  return "kind" in entry && entry.kind === "environment";
}

// node_modules/decimal.js/decimal.mjs
var EXP_LIMIT = 9e15;
var MAX_DIGITS = 1e9;
var NUMERALS = "0123456789abcdef";
var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var DEFAULTS = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -EXP_LIMIT,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: EXP_LIMIT,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: false
  // true/false
};
var inexact;
var quadrant;
var external = true;
var decimalError = "[DecimalError] ";
var invalidArgument = decimalError + "Invalid argument: ";
var precisionLimitExceeded = decimalError + "Precision limit exceeded";
var cryptoUnavailable = decimalError + "crypto unavailable";
var tag = "[object Decimal]";
var mathfloor = Math.floor;
var mathpow = Math.pow;
var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var BASE = 1e7;
var LOG_BASE = 7;
var MAX_SAFE_INTEGER = 9007199254740991;
var LN10_PRECISION = LN10.length - 1;
var PI_PRECISION = PI.length - 1;
var P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0)
    x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
  var k, x = this, Ctor = x.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s)
    return new Ctor(NaN);
  if (min2.gt(max2))
    throw Error(invalidArgument + max2);
  k = x.cmp(min2);
  return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0])
    return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys)
    return xs;
  if (x.e !== y.e)
    return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i])
      return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d)
    return new Ctor(NaN);
  if (!x.d[0])
    return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;
    if (s = (e - n.length + 1) % 3)
      n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
  var w, d = this.d, n = NaN;
  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w)
      for (; w % 10 == 0; w /= 10)
        n--;
    if (n < 0)
      n = 0;
  }
  return n;
};
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
  if (!x.isFinite())
    return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero())
    return one;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(x.s);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
  var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero())
    return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.asin();
  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return halfPi.minus(x);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1))
    return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.e >= 0)
    return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1)
    return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero())
    return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s)
      return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k; i; --i)
    x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0)
      for (i = j; r.d[i] === t.d[i] && i--; )
        ;
  }
  if (k)
    r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1))
      return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; )
        k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (x.d)
      y.s = -y.s;
    else
      y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0])
      y.s = -y.s;
    else if (xd[0])
      y = new Ctor(x);
    else
      return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; )
      d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy)
      len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i)
    xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; )
        xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; )
    xd.pop();
  for (; xd[0] === 0; xd.shift())
    --e;
  if (!xd[0])
    return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0])
    return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (!x.d)
      y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0])
      y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; )
      d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; )
    xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
    throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k)
      k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e) % 2 == 0)
      n += "0";
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; )
    r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; )
    r.pop();
  if (carry)
    ++e;
  else
    r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0)
    return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0)
    rm = Ctor.rounding;
  else
    checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd)
    return new Ctor(x);
  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1))
      throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e > 0 ? d : n1 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1)
      break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d)
      return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d)
      return y.s ? x : y;
    if (!y.d) {
      if (y.s)
        y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0])
    return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1))
    return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1))
    return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1)
      return new Ctor(NaN);
    if ((y.d[e] & 1) == 0)
      s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
    return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k)
      str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; )
    w /= 10;
  return str + w;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10)
    --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0)
        rd = rd / 100 | 0;
      else if (i == 1)
        rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0)
        rd = rd / 1e3 | 0;
      else if (i == 1)
        rd = rd / 100 | 0;
      else if (i == 2)
        rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; )
      arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0)
          arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero())
    return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry)
      x.unshift(carry);
    return x;
  }
  function compare(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract2(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        // Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
        )
      );
    }
    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++)
      ;
    if (yd[i] > (xd[i] || 0))
      e--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; )
          rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2)
          ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL)
              rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base)
                k = base - 1;
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract2(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0)
                cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL)
              prod.unshift(0);
            subtract2(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract2(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0])
        qd.shift();
    }
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10)
        i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out:
    if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits = 1, k = xd[0]; k >= 10; k /= 10)
        digits++;
      i = sd - digits;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits = 1; k >= 10; k /= 10)
            digits++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits;
          rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10)
              i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i != k) {
              x.e++;
              if (xd[0] == BASE)
                xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE)
              break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i = xd.length; xd[--i] === 0; )
        xd.pop();
    }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite())
    return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0)
      str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0)
      str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len)
      str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len)
        str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits, e) {
  var w = digits[0];
  for (e *= LOG_BASE; w >= 10; w /= 10)
    e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr)
      Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION)
    throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
  var w = digits.length - 1, len = w * LOG_BASE + 1;
  w = digits[w];
  if (w) {
    for (; w % 10 == 0; w /= 10)
      len--;
    for (w = digits[0]; w >= 10; w /= 10)
      len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; )
    zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k))
        isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0)
        ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, ltgt) {
  var y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    } else if (x[ltgt](y)) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow3, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow3 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow3 = finalise(pow3.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow3, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--)
        sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow3 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0)
        sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1)
    str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0)
      e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++)
    ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
    ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0)
      i += LOG_BASE;
    if (i < len) {
      if (i)
        x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; )
        x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; )
      str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str))
      return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str)
      x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i)
    xd.pop();
  if (i < 0)
    return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat)
    x = divide(x, divisor, len * 4);
  if (p)
    x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; )
        ;
      if (j == -1)
        break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
    i++;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n = b;
  while (--e)
    n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg2 = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg2 ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg2 ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg2 ? 2 : 3 : isNeg2 ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg2 ? 1 : 4 : isNeg2 ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; )
      xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len)
        ;
      for (i = 0, str = ""; i < len; i++)
        str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++)
              str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len)
              ;
            for (i = 1, str = "1."; i < len; i++)
              str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; )
          str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len)
          for (e -= len; e--; )
            str += "0";
        else if (e < len)
          str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config(obj) {
  if (!obj || typeof obj !== "object")
    throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults)
      this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
        this[p] = v;
      else
        throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults)
    this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2))
      return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10)
          e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      } else if (v * 0 !== 0) {
        if (!v)
          x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    } else if (t !== "string") {
      throw Error(invalidArgument + v);
    }
    if ((i2 = v.charCodeAt(0)) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      if (i2 === 43)
        v = v.slice(1);
      x.s = 1;
    }
    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config;
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0)
    obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i++]))
          obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max() {
  return maxOrMin(this, arguments, "lt");
}
function min() {
  return maxOrMin(this, arguments, "gt");
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0)
    sd = this.precision;
  else
    checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; )
      rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--)
    rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE)
      rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10)
      k++;
    if (k < LOG_BASE)
      e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; )
    x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
var decimal_default = Decimal;

// src/compute-engine/compute-engine.ts
var import_complex19 = __toESM(require_complex());

// src/common/grapheme-splitter.ts
function stringToCodepoints(string) {
  const result = [];
  for (let i = 0; i < string.length; i++) {
    let code = string.charCodeAt(i);
    if (code >= 55296 && code <= 56319) {
      const nextCode = string.charCodeAt(i + 1);
      if (nextCode >= 56320 && nextCode <= 57343) {
        const lead = code - 55296;
        const trail = nextCode - 56320;
        code = 2 ** 16 + lead * 2 ** 10 + trail;
        i++;
      }
    }
    result.push(code);
  }
  return result;
}
var ZWJ = 8205;
var REGIONAL_INDICATOR = [127462, 127487];
function isEmojiCombinator(code) {
  if (code === ZWJ)
    return true;
  if (code === 65038 || code === 65039)
    return true;
  if (code >= 127995 && code <= 127995 + 5)
    return true;
  if (code >= 129456 && code <= 129456 + 4)
    return true;
  if (code >= 917536 && code <= 917536 + 96)
    return true;
  return false;
}
function isRegionalIndicator(code) {
  return code >= REGIONAL_INDICATOR[0] && code <= REGIONAL_INDICATOR[1];
}
function splitGraphemes(string) {
  if (/^[\u0020-\u00FF]*$/.test(string))
    return string;
  const result = [];
  const codePoints = stringToCodepoints(string);
  let index = 0;
  while (index < codePoints.length) {
    const code = codePoints[index++];
    const next = codePoints[index];
    if (next === ZWJ) {
      const baseIndex = index - 1;
      index += 2;
      while (codePoints[index] === ZWJ) {
        index += 2;
      }
      result.push(
        String.fromCodePoint(
          ...codePoints.slice(baseIndex, 2 * index - baseIndex + 1)
        )
      );
    } else if (isEmojiCombinator(next)) {
      const baseIndex = index - 1;
      while (isEmojiCombinator(codePoints[index])) {
        index += codePoints[index] === ZWJ ? 2 : 1;
      }
      result.push(
        String.fromCodePoint(
          ...codePoints.slice(baseIndex, 2 * index - baseIndex - 1)
        )
      );
    } else if (isRegionalIndicator(code)) {
      index += 1;
      result.push(String.fromCodePoint(...codePoints.slice(index - 2, 2)));
    } else {
      result.push(String.fromCodePoint(code));
    }
  }
  return result;
}

// src/compute-engine/latex-syntax/tokenizer.ts
var COMMON_IDENTIFIER_NAME = [
  "alpha",
  "beta",
  "gamma",
  "Gamma",
  "delta",
  "Delta",
  "epsilon",
  "zeta",
  "eta",
  "theta",
  "Theta",
  "iota",
  "kappa",
  "lambda",
  "Lambda",
  "mu",
  "nu",
  "xi",
  "Xi",
  "pi",
  "Pi",
  "rho",
  "sigma",
  "Sigma",
  "tau",
  "upsilon",
  "phi",
  "Phi",
  "varphi",
  "chi",
  "psi",
  "Psi",
  "omega",
  "Omega",
  "aleph",
  "ast",
  "blacksquare",
  "bot",
  "bullet",
  "circ",
  "diamond",
  "times",
  "top",
  "square",
  "star"
];
var Tokenizer = class {
  constructor(s) {
    this.obeyspaces = false;
    this.s = splitGraphemes(s);
    this.pos = 0;
  }
  /**
   * @return True if we reached the end of the stream
   */
  end() {
    return this.pos >= this.s.length;
  }
  /**
   * Return the next char and advance
   */
  get() {
    return this.pos < this.s.length ? this.s[this.pos++] : "";
  }
  /**
   * Return the next char, but do not advance
   */
  peek() {
    return this.s[this.pos];
  }
  /**
   * Return the next substring matching regEx and advance.
   */
  match(regEx) {
    let execResult;
    if (typeof this.s === "string") {
      execResult = regEx.exec(this.s.slice(this.pos));
    } else {
      execResult = regEx.exec(this.s.slice(this.pos).join(""));
    }
    if (execResult?.[0]) {
      this.pos += execResult[0].length;
      return execResult[0];
    }
    return null;
  }
  /**
   * Return the next token, or null.
   */
  next() {
    if (this.end())
      return null;
    if (!this.obeyspaces && this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]+/)) {
      return "<space>";
    } else if (this.obeyspaces && this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]/)) {
      return "<space>";
    }
    const next = this.get();
    if (next === "\\") {
      if (!this.end()) {
        let command = this.match(/^[a-zA-Z*]+/);
        if (command) {
          this.match(/^[ \f\n\r\t\v\xA0\u2028\u2029]*/);
        } else {
          command = this.get();
          if (command === " ") {
            return "<space>";
          }
        }
        return "\\" + command;
      }
    } else if (next === "{") {
      return "<{>";
    } else if (next === "}") {
      return "<}>";
    } else if (next === "^") {
      if (this.peek() === "^") {
        this.get();
        const hex = this.match(
          /^(\^(\^(\^(\^[0-9a-f])?[0-9a-f])?[0-9a-f])?[0-9a-f])?[0-9a-f][0-9a-f]/
        );
        if (hex) {
          return String.fromCodePoint(
            parseInt(hex.slice(hex.lastIndexOf("^") + 1), 16)
          );
        }
      }
      return next;
    } else if (next === "#") {
      if (!this.end()) {
        let isParam = false;
        if (/[0-9?]/.test(this.peek())) {
          isParam = true;
          if (this.pos + 1 < this.s.length) {
            const after = this.s[this.pos + 1];
            isParam = /[^0-9A-Za-z]/.test(after);
          }
        }
        if (isParam) {
          return "#" + this.get();
        }
        return "#";
      }
    } else if (next === "$") {
      if (this.peek() === "$") {
        this.get();
        return "<$$>";
      }
      return "<$>";
    }
    return next;
  }
};
function expand(lex2, args) {
  let result = [];
  let token = lex2.next();
  if (token) {
    if (token === "\\relax") {
    } else if (token === "\\noexpand") {
      token = lex2.next();
      if (token) {
        result.push(token);
      }
    } else if (token === "\\obeyspaces") {
      lex2.obeyspaces = true;
    } else if (token === "\\space" || token === "~") {
      result.push("<space>");
    } else if (token === "\\bgroup") {
      result.push("<{>");
    } else if (token === "\\egroup") {
      result.push("<}>");
    } else if (token === "\\string") {
      token = lex2.next();
      if (token) {
        if (token[0] === "\\") {
          Array.from(token).forEach(
            (x) => result.push(x === "\\" ? "\\backslash" : x)
          );
        } else if (token === "<{>") {
          result.push("\\{");
        } else if (token === "<space>") {
          result.push("~");
        } else if (token === "<}>") {
          result.push("\\}");
        }
      }
    } else if (token === "\\csname") {
      while (lex2.peek() === "<space>") {
        lex2.next();
      }
      let command = "";
      let done = false;
      let tokens = [];
      do {
        if (tokens.length === 0) {
          if (/^#[0-9?]$/.test(lex2.peek())) {
            const param = lex2.get().slice(1);
            tokens = tokenize(
              args?.[param] ?? args?.["?"] ?? "\\placeholder{}",
              args
            );
            token = tokens[0];
          } else {
            token = lex2.next();
            tokens = token ? [token] : [];
          }
        }
        done = tokens.length === 0;
        if (!done && token === "\\endcsname") {
          done = true;
          tokens.shift();
        }
        if (!done) {
          done = token === "<$>" || token === "<$$>" || token === "<{>" || token === "<}>" || !!token && token.length > 1 && token[0] === "\\";
        }
        if (!done) {
          command += tokens.shift();
        }
      } while (!done);
      if (command) {
        result.push("\\" + command);
      }
      result = result.concat(tokens);
    } else if (token === "\\endcsname") {
    } else if (token.length > 1 && token[0] === "#") {
      const param = token.slice(1);
      result = result.concat(
        tokenize(args?.[param] ?? args?.["?"] ?? "\\placeholder{}", args)
      );
    } else {
      result.push(token);
    }
  }
  return result;
}
function tokenize(s, args) {
  const lines = s.toString().split(/\r?\n/);
  let stream = "";
  let sep = "";
  for (const line of lines) {
    stream += sep;
    sep = " ";
    const m = line.match(/((?:\\%)|[^%])*/);
    if (m !== null)
      stream += m[0];
  }
  const tokenizer = new Tokenizer(stream);
  const result = [];
  do
    result.push(...expand(tokenizer, args));
  while (!tokenizer.end());
  return result;
}
function joinLatex(segments) {
  let sep = "";
  let result = "";
  for (const segment of segments) {
    if (segment) {
      if (/[a-zA-Z*]/.test(segment[0])) {
        result += sep;
      }
      if (/\\[a-zA-Z]+\*?$/.test(segment)) {
        sep = " ";
      } else {
        sep = "";
      }
      result += segment;
    }
  }
  return result;
}
function tokensToString(tokens) {
  let flat = [];
  if (Array.isArray(tokens)) {
    for (const item of tokens) {
      if (Array.isArray(item)) {
        flat = [...flat, ...item];
      } else {
        flat.push(item);
      }
    }
  } else {
    flat = [tokens];
  }
  const result = joinLatex(
    flat.map((token) => {
      return {
        "<space>": " ",
        "<$$>": "$$",
        "<$>": "$",
        "<{>": "{",
        "<}>": "}"
      }[token] ?? token;
    })
  );
  return result;
}

// src/compute-engine/latex-syntax/dictionary/definitions-algebra.ts
var DEFINITIONS_ALGEBRA = [
  {
    name: "To",
    trigger: ["\\to"],
    kind: "infix",
    precedence: 270
    // MathML rightwards arrow
  }
];

// src/math-json/utils.ts
function isNumberExpression(expr) {
  if (expr === null)
    return false;
  if (typeof expr === "number")
    return true;
  if (isNumberObject(expr))
    return true;
  if (typeof expr === "string" && /^[+-]?[0-9]/.test(expr))
    return true;
  return false;
}
function isNumberObject(expr) {
  return expr !== null && typeof expr === "object" && "num" in expr;
}
function isSymbolObject(expr) {
  return expr !== null && typeof expr === "object" && "sym" in expr;
}
function isStringObject(expr) {
  return expr !== null && typeof expr === "object" && "str" in expr;
}
function isFunctionObject(expr) {
  return expr !== null && typeof expr === "object" && "fn" in expr;
}
function isValidIdentifier(s) {
  if (/[\u0000-\u0020\u0022\u0060\ufffe\uffff]/.test(s))
    return false;
  return !/^[\u0021\u0022\u0024-\u0029\u002e\u003a\u003f\u0040\u005b\u005d\u005e\u007b\u007d\u007e\+\-[0-9]]/.test(
    s
  );
}
function stringValue(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "object" && "str" in expr)
    return expr.str;
  if (typeof expr !== "string")
    return null;
  if (expr.length < 2)
    return null;
  if (expr[0] !== "'" || expr[expr.length - 1] !== "'")
    return null;
  return expr.substring(1, expr.length - 1);
}
function stripText(expr) {
  if (expr === null || expr === void 0 || stringValue(expr) !== null)
    return null;
  const h = head(expr);
  if (h !== null) {
    return [
      h,
      ...(ops(expr) ?? []).map((x) => stripText(x)).filter((x) => x !== null)
    ];
  }
  return expr;
}
function head(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (Array.isArray(expr)) {
    /* @__PURE__ */ console.assert(
      expr.length > 0 && (typeof expr[0] !== "string" || isValidIdentifier(expr[0]))
    );
    return expr[0];
  }
  if (isFunctionObject(expr))
    return expr.fn[0];
  return null;
}
function headName(expr) {
  const h = head(expr);
  return typeof h === "string" ? h : "";
}
function ops(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (Array.isArray(expr))
    return expr.slice(1);
  if (isFunctionObject(expr))
    return expr.fn.slice(1);
  return null;
}
function op(expr, n) {
  if (expr === null || expr === void 0)
    return null;
  if (Array.isArray(expr))
    return expr[n] ?? null;
  if (isFunctionObject(expr))
    return expr.fn[n] ?? null;
  return null;
}
function op1(expr) {
  return op(expr, 1);
}
function op2(expr) {
  return op(expr, 2);
}
function nops(expr) {
  if (expr === null || expr === void 0)
    return 0;
  if (Array.isArray(expr))
    return Math.max(0, expr.length - 1);
  if (isFunctionObject(expr))
    return Math.max(0, expr.fn.length - 1);
  return 0;
}
function symbol(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "string") {
    if (/^[+\-\.0-9]/.test(expr))
      return null;
    if (expr.length >= 2 && expr[0] === "'" && expr[expr.length - 1] === "'")
      return null;
  }
  const s = isSymbolObject(expr) ? expr.sym : expr;
  if (typeof s !== "string")
    return null;
  return s;
}
function keyValuePair(expr) {
  const h = head(expr);
  if (h === "KeyValuePair" || h === "Tuple" || h === "Pair") {
    const key = stringValue(op1(expr));
    if (!key)
      return null;
    return [key, op2(expr) ?? "Nothing"];
  }
  return null;
}
function dictionary(expr) {
  if (expr === null)
    return null;
  if (typeof expr === "object" && "dict" in expr)
    return expr.dict;
  const kv = keyValuePair(expr);
  if (kv)
    return { [kv[0]]: kv[1] };
  const h = head(expr);
  if (h === "Dictionary") {
    const result = {};
    for (let i = 1; i < nops(expr); i++) {
      const kv2 = keyValuePair(op(expr, i));
      if (kv2)
        result[kv2[0]] = kv2[1];
    }
    return result;
  }
  return null;
}
function machineValueOfString(s) {
  s = s.toLowerCase().replace(/[nd]$/g, "").replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
  if (s === "nan")
    return NaN;
  if (s === "+infinity")
    return Infinity;
  if (s === "-infinity")
    return -Infinity;
  if (/\([0-9]+\)/.test(s)) {
    const [_, body, repeat, trail] = s.match(/(.+)\(([0-9]+)\)(.*)$/) ?? [];
    s = body + repeat.repeat(Math.ceil(16 / repeat.length)) + (trail ?? "");
  }
  return parseFloat(s);
}
function machineValue(expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "number")
    return expr;
  if (isNumberObject(expr))
    return machineValueOfString(expr.num);
  if (typeof expr === "string")
    return machineValueOfString(expr);
  return null;
}
function rationalValue(expr) {
  if (expr === void 0 || expr === null)
    return null;
  if (symbol(expr) === "Half")
    return [1, 2];
  const h = head(expr);
  if (!h)
    return null;
  let numer = null;
  let denom = null;
  if (h === "Negate") {
    const r = rationalValue(op1(expr));
    if (r)
      return [-r[0], r[1]];
  }
  if (h === "Rational" || h === "Divide") {
    numer = machineValue(op1(expr)) ?? NaN;
    denom = machineValue(op2(expr)) ?? NaN;
  }
  if (h === "Power") {
    const exponent = machineValue(op2(expr));
    if (exponent === 1) {
      numer = machineValue(op1(expr));
      denom = 1;
    } else if (exponent === -1) {
      numer = 1;
      denom = machineValue(op1(expr));
    }
  }
  if (h === "Multiply" && head(op2(expr)) === "Power" && machineValue(op2(op2(expr))) === -1) {
    numer = machineValue(op1(expr));
    denom = machineValue(op1(op2(expr)));
  }
  if (numer === null || denom === null)
    return null;
  if (Number.isInteger(numer) && Number.isInteger(denom))
    return [numer, denom];
  return null;
}
function subs(expr, s) {
  const h = head(expr);
  if (h !== null)
    return [subs(h, s), ...(ops(expr) ?? []).map((x) => subs(x, s))];
  const dict = dictionary(expr);
  if (dict !== null) {
    const keys = Object.keys(dict);
    const result = {};
    for (const key of keys)
      result[key] = subs(dict[key], s);
    return { dict: result };
  }
  const sym = symbol(expr);
  if (sym && s[sym])
    return s[sym];
  return expr;
}
function mapArgs(expr, fn) {
  let args = null;
  if (Array.isArray(expr))
    args = expr;
  if (isFunctionObject(expr))
    args = expr.fn;
  if (args === null)
    return [];
  let i = 1;
  const result = [];
  while (i < args.length) {
    result.push(fn(args[i]));
    i += 1;
  }
  return result;
}
function applyAssociativeOperator(op3, lhs, rhs, associativity = "both") {
  if (associativity === "non")
    return [op3, lhs, rhs];
  const lhsName = head(lhs);
  const rhsName = head(rhs);
  if (associativity === "left") {
    if (lhsName === op3)
      return [op3, ...ops(lhs) ?? [], rhs];
    return [op3, lhs, rhs];
  }
  if (associativity === "right") {
    if (rhsName === op3)
      return [op3, lhs, ...ops(rhs) ?? []];
    return [op3, lhs, rhs];
  }
  if (lhsName === op3 && rhsName === op3) {
    return [op3, ...ops(lhs) ?? [], ...ops(rhs) ?? []];
  }
  if (lhsName === op3)
    return [op3, ...ops(lhs) ?? [], rhs];
  if (rhsName === op3)
    return [op3, lhs, ...ops(rhs) ?? []];
  return [op3, lhs, rhs];
}
function getSequence(expr) {
  let h = head(expr);
  if (expr === null)
    return null;
  if (h === "Delimiter") {
    expr = op(expr, 1);
    if (expr === null)
      return [];
    if (head(expr) !== "Sequence")
      return [expr];
  }
  h = head(expr);
  if (h === "Sequence")
    return ops(expr) ?? [];
  return null;
}
function isEmptySequence(expr) {
  if (expr === null)
    return false;
  if (head(expr) !== "Sequence")
    return false;
  if (nops(expr) !== 0)
    return false;
  return true;
}
function missingIfEmpty(expr) {
  if (expr === null || isEmptySequence(expr))
    return ["Error", "'missing'"];
  return expr;
}
function countFunctionLeaves(xs) {
  if (xs[0] === "Square") {
    return countFunctionLeaves(xs.slice(1)) + 2;
  }
  return xs.reduce((acc, x) => acc + countLeaves(x), 0);
}
function countLeaves(expr) {
  if (expr === null)
    return 0;
  if (typeof expr === "number" || typeof expr === "string")
    return 1;
  if (isNumberExpression(expr) || isSymbolObject(expr) || isStringObject(expr))
    return 1;
  if (Array.isArray(expr))
    return countFunctionLeaves(expr);
  if ("fn" in expr)
    return countFunctionLeaves(expr.fn);
  const dict = dictionary(expr);
  if (dict) {
    const keys = Object.keys(dict);
    return 1 + keys.length + keys.reduce((acc, x) => acc + countLeaves(dict[x]), 0);
  }
  return 0;
}

// src/compute-engine/latex-syntax/serializer-style.ts
function getApplyFunctionStyle(_expr, _level) {
  return "paren";
}
function getGroupStyle(_expr, _level) {
  return "paren";
}
function getRootStyle(_expr, level) {
  return level > 2 ? "solidus" : "radical";
}
function getFractionStyle(expr, level) {
  if (level > 3)
    return "inline-solidus";
  if (head(expr) === "Divide") {
    const [n, d] = [countLeaves(op1(expr)), countLeaves(op2(expr))];
    if (d <= 2 && n > 3)
      return "factor";
    if (n <= 2 && d > 3)
      return "reciprocal";
  }
  return "quotient";
}
function getLogicStyle(_expr, _level) {
  return "boolean";
}
function getPowerStyle(_expr, _level) {
  return "solidus";
}
function getNumericSetStyle(_expr, _level) {
  return "compact";
}

// src/compute-engine/latex-syntax/dictionary/definitions-arithmetic.ts
function numeratorDenominator(expr) {
  if (head(expr) !== "Multiply")
    return [[], []];
  const numerator = [];
  const denominator = [];
  const args = ops(expr) ?? [];
  for (const arg of args) {
    if (head(arg) === "Power") {
      const op12 = op(arg, 1);
      const op22 = op(arg, 2);
      if (head(op22) === "Negate") {
        const b = op(op22, 1);
        if (op12 && b)
          denominator.push(["Power", op12, b]);
      } else {
        const exponentVal = machineValue(op22) ?? NaN;
        if (exponentVal === -1) {
          if (op12)
            denominator.push(op12);
        } else if (exponentVal < 0) {
          if (op12)
            denominator.push(["Power", op12, -exponentVal]);
        } else {
          numerator.push(arg);
        }
      }
    } else if (head(arg) === "Rational" && nops(arg) === 2) {
      const op12 = op(arg, 1);
      const op22 = op(arg, 2);
      if (machineValue(op12) !== 1)
        numerator.push(op12);
      if (machineValue(op22) !== 1)
        denominator.push(op22);
    } else {
      const r = rationalValue(arg);
      if (r !== null) {
        if (r[0] !== 1)
          numerator.push(r[0]);
        denominator.push(r[1]);
      } else
        numerator.push(arg);
    }
  }
  return [numerator, denominator];
}
function parseRoot(parser) {
  const degree = parser.matchOptionalLatexArgument();
  const base = parser.matchRequiredLatexArgument();
  if (base === null || isEmptySequence(base)) {
    if (degree !== null)
      return ["Root", ["Error", "'missing'"], missingIfEmpty(degree)];
    return ["Sqrt", ["Error", "'missing'"]];
  }
  if (degree !== null)
    return ["Root", base, degree];
  return ["Sqrt", base];
}
function serializeRoot(serializer, style, base, degree) {
  if (base === null)
    return "\\sqrt{}";
  degree = degree ?? 2;
  if (style === "solidus") {
    return serializer.wrapShort(base) + "^{1\\/" + serializer.serialize(degree) + "}";
  } else if (style === "quotient") {
    return serializer.wrapShort(base) + "^{\\frac{1}{" + serializer.serialize(degree) + "}}";
  }
  const degreeValue = machineValue(degree);
  if (degreeValue === 2)
    return "\\sqrt{" + serializer.serialize(base) + "}";
  return "\\sqrt[" + serializer.serialize(degree) + "]{" + serializer.serialize(base) + "}";
}
function serializeAdd(serializer, expr) {
  serializer.level -= 1;
  const name = head(expr);
  let result = "";
  let arg = op(expr, 1);
  if (name === "Negate") {
    result = "-" + serializer.wrap(arg, 276);
  } else if (name === "Add") {
    if (nops(expr) === 2) {
      let op12;
      let op22;
      if (machineValue(op(expr, 1)) && rationalValue(op(expr, 2))) {
        op12 = op(expr, 1);
        op22 = op(expr, 2);
      } else if (machineValue(op(expr, 2)) && rationalValue(op(expr, 1))) {
        op12 = op(expr, 2);
        op22 = op(expr, 1);
      }
      if (op12 && op22) {
        const lhs = machineValue(op12) ?? NaN;
        const rhs = rationalValue(op22) ?? [NaN, NaN];
        if (isFinite(lhs) && Number.isInteger(lhs) && lhs >= 0 && lhs <= 1e3 && isFinite(rhs[0]) && isFinite(rhs[1]) && rhs[0] > 0 && rhs[0] <= 100 && rhs[1] <= 100) {
          result = joinLatex([
            serializer.serialize(op12),
            serializer.options.invisiblePlus,
            serializer.serialize(op22)
          ]);
          serializer.level += 1;
          return result;
        }
      }
    }
    let val = machineValue(arg) ?? NaN;
    result = serializer.serialize(arg);
    const last = nops(expr) + 1;
    for (let i = 2; i < last; i++) {
      arg = op(expr, i);
      val = machineValue(arg) ?? NaN;
      if (val < 0) {
        result += serializer.serialize(arg);
      } else if (head(arg) === "Negate") {
        result += serializer.wrap(arg, 275);
      } else {
        const term = serializer.wrap(arg, 275);
        if (term[0] === "-" || term[0] === "+")
          result += term;
        else
          result += "+" + term;
      }
    }
  } else if (name === "Subtract") {
    result = serializer.wrap(arg, 275);
    const arg2 = op(expr, 2);
    if (arg2 !== null) {
      const term = serializer.wrap(arg2, 275);
      if (term[0] === "-")
        result += "+" + term.slice(1);
      else if (term[0] === "+")
        result += "-" + term.slice(1);
      else
        result = result + "-" + term;
    }
  }
  serializer.level += 1;
  return result;
}
function serializeMultiply(serializer, expr) {
  if (expr === null)
    return "";
  serializer.level -= 1;
  let result = "";
  const [numer, denom] = numeratorDenominator(expr);
  if (denom.length > 0) {
    if (denom.length === 1 && denom[0] === 1) {
      if (numer.length === 0)
        result = "1";
      else if (numer.length === 1)
        result = serializer.serialize(numer[0]);
      else
        result = serializeMultiply(serializer, ["Multiply", ...numer]);
    } else {
      result = serializer.serialize([
        "Divide",
        numer.length === 1 ? numer[0] : ["Multiply", ...numer],
        denom.length === 1 ? denom[0] : ["Multiply", ...denom]
      ]);
    }
  }
  if (result) {
    serializer.level += 1;
    return result;
  }
  let isNegative = false;
  let arg = null;
  const count = nops(expr) + 1;
  let prevWasNumber = false;
  for (let i = 1; i < count; i++) {
    arg = op(expr, i);
    if (arg === null)
      continue;
    let term;
    if (isNumberExpression(arg)) {
      term = serializer.serialize(arg);
      if (term === "-1" && !result) {
        result = "";
        isNegative = !isNegative;
      } else {
        if (term[0] === "-") {
          term = term.slice(1);
          isNegative = !isNegative;
        }
        result = !result ? term : joinLatex([result, serializer.options.multiply, term]);
      }
      prevWasNumber = true;
      continue;
    }
    if (head(arg) === "Power") {
      const r = rationalValue(op(arg, 2));
      if (r) {
        const [n, d] = r;
        if (n === 1 && d !== null) {
          result += serializeRoot(
            serializer,
            getRootStyle(arg, serializer.level),
            op(arg, 1),
            d
          );
          prevWasNumber = false;
          continue;
        }
      }
    }
    if (head(arg) === "Power" && !isNaN(machineValue(op(arg, 1)) ?? NaN)) {
      term = serializer.serialize(arg);
      result = !result ? term : joinLatex([result, serializer.options.multiply, term]);
      prevWasNumber = true;
      continue;
    }
    if (head(arg) === "Negate") {
      arg = op(arg, 1);
      isNegative = !isNegative;
    }
    term = serializer.wrap(arg, 390);
    if (!result) {
      result = term;
    } else {
      const h = head(arg);
      if (prevWasNumber && (h === "Divide" || h === "Rational")) {
        result = joinLatex([result, serializer.options.multiply, term]);
      } else if (!serializer.options.invisibleMultiply) {
        result = joinLatex([result, term]);
      } else {
        result = joinLatex([
          result,
          serializer.options.invisibleMultiply,
          term
        ]);
      }
    }
    prevWasNumber = false;
  }
  serializer.level += 1;
  return isNegative ? "-" + result : result;
}
function parseFraction(parser) {
  const numer = missingIfEmpty(parser.matchRequiredLatexArgument());
  const denom = missingIfEmpty(parser.matchRequiredLatexArgument());
  if (head(numer) === "PartialDerivative" && (head(denom) === "PartialDerivative" || head(denom) === "Multiply" && head(op(denom, 1)) === "PartialDerivative")) {
    const degree = op(numer, 3) ?? null;
    let fn = op(numer, 1);
    if (fn === null)
      fn = missingIfEmpty(parser.matchExpression());
    let vars = [];
    if (head(denom) === "Multiply") {
      for (const arg of ops(denom) ?? []) {
        if (head(arg) === "PartialDerivative") {
          const v = op(arg, 2);
          if (v)
            vars.push(v);
        }
      }
    } else {
      const v = op(denom, 2);
      if (v)
        vars.push(v);
    }
    if (vars.length > 1) {
      vars = ["List", ...vars];
    }
    return ["PartialDerivative", fn, ...vars, degree === null ? 1 : degree];
  }
  return ["Divide", numer, denom];
}
function serializeFraction(serializer, expr) {
  if (expr === null)
    return "";
  const numer = missingIfEmpty(op(expr, 1));
  const denom = missingIfEmpty(op(expr, 2));
  const style = getFractionStyle(expr, serializer.level);
  if (style === "inline-solidus" || style === "nice-solidus") {
    const numerStr = serializer.wrapShort(numer);
    const denomStr = serializer.wrapShort(denom);
    if (style === "inline-solidus")
      return `${numerStr}\\/${denomStr}`;
    return `^{${numerStr}}\\!\\!/\\!_{${denomStr}}`;
  } else if (style === "reciprocal") {
    if (machineValue(numer) === 1)
      return serializer.wrap(denom) + "^{-1}";
    return serializer.wrap(numer) + serializer.wrap(denom) + "^{-1}";
  } else if (style === "factor") {
    if (machineValue(denom) === 1)
      return serializer.wrap(numer);
    return "\\frac{1}{" + serializer.serialize(denom) + "}" + serializer.wrap(numer);
  }
  const numerLatex = serializer.serialize(numer);
  const denomLatex = serializer.serialize(denom);
  return `\\frac{${numerLatex}}{${denomLatex}}`;
}
function serializePower(serializer, expr) {
  const name = head(expr);
  const base = missingIfEmpty(op(expr, 1));
  if (name === "Sqrt") {
    return serializeRoot(
      serializer,
      getRootStyle(expr, serializer.level - 1),
      base,
      2
    );
  }
  const exp2 = missingIfEmpty(op(expr, 2));
  if (name === "Root")
    return serializeRoot(
      serializer,
      getRootStyle(expr, serializer.level - 1),
      base,
      exp2
    );
  const val2 = machineValue(exp2) ?? 1;
  if (val2 === -1) {
    return serializer.serialize(["Divide", "1", base]);
  } else if (val2 < 0) {
    return serializer.serialize(["Divide", "1", ["Power", base, -val2]]);
  } else if (head(exp2) === "Divide" || head(exp2) === "Rational") {
    if (machineValue(op(exp2, 1)) === 1) {
      const style = getRootStyle(expr, serializer.level);
      return serializeRoot(serializer, style, base, op(exp2, 2));
    }
    if (machineValue(op(exp2, 2)) === 2) {
      return `${serializer.serialize(["Sqrt", base])}^{${serializer.serialize(
        op(exp2, 1)
      )}}`;
    }
  } else if (head(exp2) === "Power") {
    if (machineValue(op(exp2, 2)) === -1) {
      const style = getRootStyle(expr, serializer.level);
      return serializeRoot(serializer, style, base, op(exp2, 1));
    }
  }
  return serializer.wrapShort(base) + "^{" + serializer.serialize(exp2) + "}";
}
var DEFINITIONS_ARITHMETIC = [
  // Constants
  { name: "CatalanConstant", serialize: "G" },
  { name: "GoldenRatio", serialize: "\\varphi" },
  { name: "EulerGamma", serialize: "\\gamma" },
  {
    name: "Degrees",
    trigger: ["\\degree"],
    kind: "postfix",
    precedence: 880,
    parse: (_parser, lhs) => ["Degrees", lhs],
    serialize: (serializer, expr) => {
      return joinLatex([serializer.serialize(op(expr, 1)), "\\degree"]);
    }
  },
  {
    trigger: ["\\degree"],
    kind: "postfix",
    precedence: 880,
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    trigger: ["^", "<{>", "\\circ", "<}>"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    trigger: ["^", "\\circ"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    trigger: ["\xB0"],
    kind: "postfix",
    precedence: 880,
    parse: (_parser, lhs) => ["Degrees", lhs]
  },
  {
    trigger: ["\\ang"],
    parse: (parser) => {
      const arg = parser.matchRequiredLatexArgument();
      return arg === null ? ["Degrees"] : ["Degrees", arg];
    }
  },
  {
    trigger: ["\\infty"],
    parse: { num: "+Infinity" }
  },
  {
    name: "ComplexInfinity",
    trigger: ["\\tilde", "\\infty"],
    serialize: "\\tilde\\infty"
  },
  {
    trigger: ["\\tilde", "<{>", "\\infty", "<}>"],
    parse: "ComplexInfinity"
  },
  { name: "Pi", trigger: ["\\pi"] },
  { trigger: ["\u03C0"], parse: "Pi" },
  {
    name: "ExponentialE",
    trigger: ["\\exponentialE"],
    parse: "ExponentialE",
    serialize: "\\exponentialE"
  },
  {
    name: "ImaginaryUnit",
    trigger: ["\\imaginaryI"]
  },
  // Operations
  {
    /** Could be the determinant if the argument is a matrix */
    /** @todo: domain check */
    /** If a literal matrix, the `serialize` should be custom, the parens are
     * replaced with bars */
    name: "Abs",
    kind: "matchfix",
    openDelimiter: "|",
    closeDelimiter: "|",
    parse: (_parser, expr) => isEmptySequence(expr) ? null : ["Abs", expr]
  },
  {
    trigger: "abs",
    kind: "function",
    parse: (parser) => {
      const arg = parser.matchArguments("enclosure");
      return arg === null ? "Abs" : ["Abs", ...arg];
    }
  },
  {
    name: "Add",
    trigger: ["+"],
    kind: "infix",
    associativity: "both",
    precedence: 275,
    parse: (parser, until, lhs) => {
      if (275 < until.minPrec)
        return null;
      const rhs = parser.matchExpression({ ...until, minPrec: 275 });
      if (rhs === null)
        return null;
      return applyAssociativeOperator("Add", lhs, rhs);
    },
    serialize: serializeAdd
  },
  {
    kind: "prefix",
    trigger: ["+"],
    precedence: 275,
    parse: (parser, until) => {
      if (275 < until.minPrec)
        return null;
      return parser.matchExpression({ ...until, minPrec: 400 });
    }
  },
  {
    name: "Ceil",
    kind: "matchfix",
    openDelimiter: "\\lceil",
    closeDelimiter: "\\rceil"
  },
  {
    trigger: "ceil",
    kind: "function",
    parse: (parser) => {
      const arg = parser.matchArguments("enclosure");
      return arg === null ? "Ceil" : ["Ceil", ...arg];
    }
  },
  {
    name: "Complex",
    precedence: 274,
    // One less than precedence of `Add`: used for correct wrapping
    serialize: (serializer, expr) => {
      const re = machineValue(op(expr, 1));
      const im = machineValue(op(expr, 2));
      if (im === 0)
        return serializer.serialize(op(expr, 1));
      const imPart = im === 1 ? "\\imaginaryI" : im === -1 ? "-\\imaginaryI" : joinLatex([serializer.serialize(op(expr, 2)), "\\imaginaryI"]);
      if (re === 0)
        return imPart;
      if (im !== null && im < 0)
        return joinLatex([serializer.serialize(op(expr, 1)), imPart]);
      return joinLatex([serializer.serialize(op(expr, 1)), "+", imPart]);
    }
  },
  {
    name: "Divide",
    trigger: "\\frac",
    precedence: 660,
    // For \frac specifically, not for \div, etc..
    // handles Leibnitz notation for partial derivatives
    parse: parseFraction,
    serialize: serializeFraction
  },
  {
    kind: "infix",
    trigger: "\\over",
    precedence: 660,
    parse: "Divide"
  },
  {
    trigger: ["\\/"],
    kind: "infix",
    associativity: "non",
    precedence: 660,
    // ??? MathML has 265, but it's wrong.
    // It has to be at least higher than multiply
    // e.g. `1/2+3*x` -> `1/2 + 3*x` , not `1/(2+3*x)`
    parse: "Divide"
  },
  {
    trigger: ["/"],
    kind: "infix",
    associativity: "non",
    precedence: 660,
    parse: "Divide"
  },
  {
    trigger: ["\\div"],
    kind: "infix",
    associativity: "non",
    precedence: 660,
    // ??? according to MathML
    parse: "Divide"
  },
  {
    name: "Exp",
    serialize: (serializer, expr) => joinLatex([
      "\\exponentialE^{",
      serializer.serialize(missingIfEmpty(op(expr, 1))),
      "}"
    ])
  },
  {
    name: "Factorial",
    trigger: ["!"],
    kind: "postfix",
    precedence: 810
  },
  {
    name: "Factorial2",
    trigger: ["!", "!"],
    kind: "postfix",
    precedence: 810
  },
  {
    name: "Floor",
    kind: "matchfix",
    openDelimiter: "\\lfloor",
    closeDelimiter: "\\rfloor"
  },
  {
    trigger: "floor",
    kind: "function",
    parse: (parser) => {
      const arg = parser.matchArguments("enclosure");
      return arg === null ? "Floor" : ["Floor", ...arg];
    }
  },
  {
    name: "Gcd",
    trigger: "gcd",
    kind: "function"
  },
  {
    name: "Half",
    serialize: "\\frac12"
  },
  {
    name: "Lg",
    trigger: ["\\lg"],
    serialize: (serializer, expr) => "\\log_{10}" + serializer.wrapArguments(expr),
    parse: (parser) => {
      const arg = parser.matchArguments("implicit");
      if (arg === null)
        return ["Lg"];
      return ["Log", ...arg, 10];
    }
  },
  {
    name: "Lb",
    trigger: "\\lb",
    parse: (parser) => {
      const arg = parser.matchArguments("implicit");
      if (arg === null)
        return ["Log"];
      return ["Log", ...arg, 2];
    }
  },
  {
    name: "Ln",
    trigger: ["\\ln"],
    serialize: (serializer, expr) => "\\ln" + serializer.wrapArguments(expr),
    parse: (parser) => parseLog("Ln", parser)
  },
  {
    name: "Log",
    trigger: ["\\log"],
    parse: (parser) => parseLog("Log", parser),
    serialize: (serializer, expr) => {
      const base = op2(expr);
      if (base)
        return joinLatex([
          "\\log_{",
          base.toString(),
          "}",
          serializer.wrap(op1(expr))
        ]);
      return "\\log" + serializer.wrapArguments(expr);
    }
  },
  {
    name: "Lcm",
    trigger: "lcm",
    kind: "function"
  },
  {
    name: "MinusPlus",
    trigger: ["\\mp"],
    kind: "infix",
    associativity: "both",
    precedence: 270
  },
  {
    name: "Multiply",
    trigger: ["\\times"],
    kind: "infix",
    associativity: "both",
    precedence: 390,
    serialize: serializeMultiply
  },
  {
    trigger: ["\\cdot"],
    kind: "infix",
    associativity: "both",
    precedence: 390,
    parse: (parser, terminator, lhs) => {
      if (391 < terminator.minPrec)
        return null;
      const rhs = parser.matchExpression({ ...terminator, minPrec: 392 });
      if (rhs === null)
        return ["Multiply", lhs, ["Error", "'missing'"]];
      return applyAssociativeOperator("Multiply", lhs, rhs);
    }
  },
  {
    trigger: ["*"],
    kind: "infix",
    associativity: "both",
    precedence: 390,
    parse: (parser, terminator, lhs) => {
      if (391 < terminator.minPrec)
        return null;
      const rhs = parser.matchExpression({ ...terminator, minPrec: 392 });
      if (rhs === null)
        return ["Multiply", lhs, ["Error", "'missing'"]];
      return applyAssociativeOperator("Multiply", lhs, rhs);
    }
  },
  {
    name: "Negate",
    trigger: ["-"],
    kind: "prefix",
    parse: (parser, terminator) => {
      if (276 < terminator.minPrec)
        return null;
      const rhs = parser.matchExpression({ ...terminator, minPrec: 400 });
      return ["Negate", missingIfEmpty(rhs)];
    },
    precedence: 275
  },
  // {
  //   /** If the argument is a vector */
  //   /** @todo: domain check */
  //   name: 'Norm',
  //   kind: 'matchfix',
  //   openDelimiter: '|',
  //   closeDelimiter: '|',
  // },
  // {
  //   /** If the argument is a set */
  //   /** @todo: domain check */
  //   name: 'Cardinality',
  //   kind: 'matchfix',
  //   openDelimiter: '|',
  //   closeDelimiter: '|',
  // },
  {
    //   /** If the argument is a vector */
    /** @todo: domain check */
    kind: "matchfix",
    openDelimiter: "||",
    closeDelimiter: "||",
    parse: (_parser, expr) => isEmptySequence(expr) ? null : ["Norm", expr]
  },
  {
    //   /** If the argument is a vector */
    /** @todo: domain check */
    name: "Norm",
    kind: "matchfix",
    openDelimiter: ["\\left", "\\Vert"],
    closeDelimiter: ["\\right", "\\Vert"]
  },
  {
    name: "PlusMinus",
    trigger: ["\\pm"],
    kind: "infix",
    associativity: "both",
    precedence: 270
  },
  {
    name: "Power",
    trigger: ["^"],
    kind: "infix",
    serialize: serializePower
  },
  {
    trigger: "\\prod",
    precedence: 390,
    name: "Product",
    parse: parseBigOp("Product", 390),
    serialize: serializeBigOp("\\prod")
  },
  // {
  //   trigger: ['*', '*'],
  //   kind: 'infix',
  //   associativity: 'non',
  //   precedence: 720,
  // },
  {
    name: "Rational",
    precedence: 660,
    serialize: (serializer, expr) => {
      if (expr && nops(expr) === 1)
        return "\\mathrm{Rational}" + serializer.wrapArguments(expr);
      return serializeFraction(serializer, expr);
    }
  },
  {
    name: "Root",
    serialize: serializePower
  },
  {
    name: "Round",
    trigger: "round",
    kind: "function"
  },
  {
    name: "Square",
    precedence: 720,
    serialize: (serializer, expr) => serializer.wrapShort(op(expr, 1)) + "^2"
  },
  {
    trigger: "\\sum",
    precedence: 275,
    name: "Sum",
    parse: parseBigOp("Sum", 275),
    serialize: serializeBigOp("\\sum")
  },
  {
    name: "Sign",
    // As per ISO 80000-2, "signum" is 'sgn'
    trigger: "sgn",
    kind: "function"
  },
  {
    name: "Sqrt",
    trigger: ["\\sqrt"],
    parse: parseRoot,
    serialize: serializePower
  },
  {
    name: "Subtract",
    trigger: ["-"],
    kind: "infix",
    associativity: "both",
    precedence: 275,
    parse: (parser, terminator, lhs) => {
      if (276 < terminator.minPrec)
        return null;
      const rhs = parser.matchExpression({ ...terminator, minPrec: 277 });
      return ["Subtract", lhs, missingIfEmpty(rhs)];
    }
  }
];
function parseBigOp(name, prec) {
  return (parser) => {
    parser.skipSpace();
    let sup = null;
    let sub2 = null;
    while (!(sub2 && sup) && (parser.peek === "_" || parser.peek === "^")) {
      if (parser.match("_"))
        sub2 = parser.matchRequiredLatexArgument();
      else if (parser.match("^"))
        sup = parser.matchRequiredLatexArgument();
      parser.skipSpace();
    }
    if (sub2 === "Nothing" || isEmptySequence(sub2))
      sub2 = null;
    if (sup === "Nothing" || isEmptySequence(sup))
      sup = null;
    let index = null;
    let lower = null;
    if (head(sub2) === "Equal") {
      index = op(sub2, 1);
      lower = op(sub2, 2);
    } else {
      index = sub2;
    }
    const sym = symbol(index);
    if (sym)
      parser.computeEngine?.pushScope({ [sym]: { domain: "Integer" } });
    const fn = parser.matchExpression({ minPrec: prec + 1 });
    if (sym)
      parser.computeEngine?.popScope();
    if (!fn)
      return [name];
    if (sup)
      return [
        name,
        fn,
        ["Tuple", index ? ["Hold", index] : "Nothing", lower ?? 1, sup]
      ];
    if (lower)
      return [name, fn, ["Tuple", index ? ["Hold", index] : "Nothing", lower]];
    if (index)
      return [name, fn, ["Tuple", ["Hold", index]]];
    return [name, fn];
  };
}
function serializeBigOp(command) {
  return (serializer, expr) => {
    if (!op(expr, 1))
      return command;
    let arg = op(expr, 2);
    const h = head(arg);
    if (h !== "Tuple" && h !== "Triple" && h !== "Pair" && h !== "Single")
      arg = null;
    let index = op(arg, 1);
    if (index && head(index) === "Hold")
      index = op(index, 1);
    const fn = op(expr, 1);
    if (!arg) {
      if (!op(expr, 2))
        return joinLatex([command, "_n", serializer.serialize(fn)]);
      return joinLatex([
        command,
        "_{",
        serializer.serialize(op(expr, 2)),
        "}",
        serializer.serialize(fn)
      ]);
    }
    const lower = op(arg, 2);
    let sub2 = [];
    if (index && symbol(index) !== "Nothing" && lower)
      sub2 = [serializer.serialize(index), "=", serializer.serialize(lower)];
    else if (index && symbol(index) !== "Nothing")
      sub2 = [serializer.serialize(index)];
    else if (lower)
      sub2 = [serializer.serialize(lower)];
    if (sub2.length > 0)
      sub2 = ["_{", ...sub2, "}"];
    let sup = [];
    if (op(arg, 3))
      sup = ["^{", serializer.serialize(op(arg, 3)), "}"];
    return joinLatex([command, ...sup, ...sub2, serializer.serialize(fn)]);
  };
}
function parseLog(command, parser) {
  let sub2 = null;
  let base = null;
  if (parser.match("_")) {
    sub2 = parser.matchStringArgument() ?? parser.next();
    base = Number.parseFloat(sub2 ?? "10");
  }
  const arg = parser.matchArguments("implicit");
  if (arg === null)
    return [command];
  if (base === 10)
    return ["Log", arg[0]];
  if (base === 2)
    return ["Lb", ...arg];
  if (sub2 === null)
    return [command, ...arg];
  return ["Log", ...arg, sub2];
}

// src/compute-engine/latex-syntax/dictionary/definitions-core.ts
function parseSequence(parser, terminator, lhs, prec, sep) {
  /* @__PURE__ */ console.assert(lhs !== null);
  if (terminator.minPrec >= prec)
    return null;
  const result = [lhs];
  let done = false;
  while (!done) {
    done = true;
    parser.skipSpace();
    while (parser.match(sep)) {
      result.push("Nothing");
      parser.skipSpace();
    }
    if (parser.atTerminator(terminator)) {
      result.push("Nothing");
    } else {
      const rhs = parser.matchExpression({ ...terminator, minPrec: prec });
      result.push(rhs ?? "Nothing");
      done = rhs === null;
    }
    if (!done) {
      parser.skipSpace();
      done = !parser.match(sep);
    }
  }
  return result;
}
function serializeSequence(sep = "") {
  return (serializer, expr) => (ops(expr) ?? []).map((x) => serializer.serialize(x)).join(sep);
}
var DEFINITIONS_CORE = [
  //
  // Constants
  //
  {
    trigger: ["\\placeholder"],
    parse: (parser) => {
      parser.skipSpaceTokens();
      if (parser.match("["))
        while (!parser.match("]") && !parser.atBoundary)
          parser.next();
      parser.skipSpaceTokens();
      if (parser.match("<{>"))
        while (!parser.match("<}>") && !parser.atBoundary)
          parser.next();
      return "Nothing";
    }
  },
  //
  // Functions
  //
  {
    name: "BaseForm",
    kind: "function",
    serialize: (serializer, expr) => {
      const radix = machineValue(op(expr, 2)) ?? NaN;
      if (isFinite(radix) && radix >= 2 && radix <= 36) {
        const num = machineValue(op(expr, 1)) ?? NaN;
        if (isFinite(num) && Number.isInteger(num)) {
          let digits = Number(num).toString(radix);
          let groupLength = 0;
          if (radix === 2) {
            groupLength = 4;
          } else if (radix === 10) {
            groupLength = 4;
          } else if (radix === 16) {
            groupLength = 2;
          } else if (radix > 16) {
            groupLength = 4;
          }
          if (groupLength > 0) {
            const oldDigits = digits;
            digits = "";
            for (let i = 0; i < oldDigits.length; i++) {
              if (i > 0 && i % groupLength === 0)
                digits = "\\, " + digits;
              digits = oldDigits[oldDigits.length - i - 1] + digits;
            }
          }
          return `(\\text{${digits}}_{${radix}}`;
        }
      }
      return "\\operatorname{BaseForm}(" + serializer.serialize(op(expr, 1)) + ", " + serializer.serialize(op(expr, 2)) + ")";
    }
  },
  {
    name: "Delimiter",
    serialize: (serializer, expr) => {
      const argCount = nops(expr);
      if (argCount === 0)
        return "";
      const style = serializer.options.groupStyle(expr, serializer.level + 1);
      const arg1 = op(expr, 1);
      if (argCount === 1)
        return serializer.wrapString(serializer.serialize(arg1), style);
      let sep = "";
      let open = "";
      let close = "";
      if (argCount > 1) {
        const op22 = stringValue(op(expr, 2)) ?? "";
        open = op22[0] ?? "";
        close = op22[1] ?? "";
        sep = op22[2] ?? "";
      }
      const body = head(arg1) === "List" ? serializeSequence(sep)(serializer, arg1) : serializer.serialize(arg1);
      serializer.wrapString(body, style, stringValue(op(expr, 2)) ?? void 0);
      if (!open || !close)
        return serializer.wrapString(body, style);
      return `${open} ${body} ${close}`;
    }
  },
  {
    name: "Domain",
    serialize: (serializer, expr) => {
      if (head(expr) === "Error")
        return serializer.serialize(expr);
      return `\\mathbf{${serializer.serialize(op(expr, 1))}}`;
    }
  },
  {
    trigger: ["\\mathtip"],
    parse: (parser) => {
      const op12 = parser.matchRequiredLatexArgument();
      const op22 = parser.matchRequiredLatexArgument();
      return op12;
    }
  },
  {
    trigger: ["\\texttip"],
    parse: (parser) => {
      const op12 = parser.matchRequiredLatexArgument();
      const op22 = parser.matchRequiredLatexArgument();
      return op12;
    }
  },
  {
    trigger: ["\\error"],
    parse: (parser) => parser.matchRequiredLatexArgument()
  },
  {
    name: "Error",
    serialize: (serializer, expr) => {
      if (stringValue(op(expr, 1)) === "missing")
        return `\\error{${serializer.options.missingSymbol ?? "\\placeholder{}"}}`;
      const where = errorContextAsLatex(serializer, expr) || "\\blacksquare";
      const op12 = op(expr, 1);
      const code = head(op12) === "ErrorCode" ? stringValue(op(op12, 1)) : stringValue(op12);
      if (code === "incompatible-domain") {
        return `\\mathtip{\\error{${where}}}{\\in ${serializer.serialize(
          op(op12, 3)
        )}\\notin ${serializer.serialize(op(op12, 2))}}`;
      }
      if (code === "missing") {
        return `\\mathtip{\\error{${where}}}{${serializer.serialize(
          op(op12, 2)
        )}\\text{ missing}}`;
      }
      if (typeof code === "string")
        return `\\error{${where}}`;
      return `\\error{${where}}`;
    }
  },
  {
    name: "ErrorCode",
    serialize: (serializer, expr) => {
      const code = stringValue(op(expr, 1));
      if (code === "missing")
        return serializer.options.missingSymbol ?? "\\placeholder{}";
      if (code === "unexpected-command" || code === "unexpected-operator" || code === "unexpected-token" || code === "invalid-symbol-name" || code === "unknown-environment" || code === "unexpected-base" || code === "incompatible-domain" || code === "invalid-domain-expression") {
        return "";
      }
      return `\\texttip{\\error{\\blacksquare}}{\\mathtt{${code}}}`;
    }
  },
  {
    name: "FromLatex",
    serialize: (_serializer, expr) => {
      return `\\texttt{${sanitizeLatex(stringValue(op(expr, 1)))}}`;
    }
  },
  {
    name: "Latex",
    serialize: (serializer, expr) => {
      if (expr === null)
        return "";
      return joinLatex(
        mapArgs(expr, (x) => stringValue(x) ?? serializer.serialize(x))
      );
    }
  },
  {
    name: "LatexString",
    serialize: (serializer, expr) => {
      if (expr === null)
        return "";
      return joinLatex(mapArgs(expr, (x) => serializer.serialize(x)));
    }
  },
  { name: "LatexTokens", serialize: serializeLatexTokens },
  {
    name: "List",
    kind: "matchfix",
    openDelimiter: "[",
    closeDelimiter: "]",
    parse: (_parser, lhs) => {
      if (lhs === null)
        return ["List"];
      if (head(lhs) !== "Sequence" && head(lhs) !== "List")
        return ["List", lhs];
      return ["List", ...ops(lhs) ?? []];
    },
    serialize: (serializer, expr) => {
      return joinLatex([
        "\\lbrack",
        serializeSequence(", ")(serializer, expr),
        "\\rbrack"
      ]);
    }
  },
  {
    kind: "matchfix",
    openDelimiter: "(",
    closeDelimiter: ")",
    parse: (_parser, body) => {
      if (body === null)
        return null;
      if (head(body) === "Sequence" || head(body) === "List") {
        if (nops(body) === 0)
          return ["Delimiter"];
        return ["Delimiter", ["Sequence", ...ops(body) ?? []]];
      }
      return ["Delimiter", body];
    }
  },
  {
    trigger: [","],
    kind: "infix",
    precedence: 20,
    // Unlike the matchfix version of List,
    // when the comma operator is used, the lhs and rhs are flattened,
    // i.e. `1,2,3` -> `["Delimiter", ["List", 1, 2, 3],  ","]`,
    // and `1, (2, 3)` -> `["Delimiter",
    // ["Sequence", 1, ["Delimiter", ["List", 2, 3],  "(", ",", ")"]],  ","],
    parse: (parser, terminator, lhs) => {
      const seq = parseSequence(parser, terminator, lhs, 20, ",");
      if (seq === null)
        return null;
      return ["Sequence", ...seq];
    }
  },
  {
    name: "Sequence",
    serialize: serializeSequence("")
  },
  {
    trigger: [";"],
    kind: "infix",
    precedence: 19,
    parse: (parser, terminator, lhs) => {
      const seq = parseSequence(parser, terminator, lhs, 19, ";");
      if (seq === null)
        return null;
      return [
        "Sequence",
        ...seq.map(
          (x) => head(x) === "Sequence" ? ["List", ...ops(x) ?? []] : x
        )
      ];
    }
  },
  {
    name: "String",
    trigger: ["\\text"],
    parse: (scanner) => parseTextRun(scanner),
    serialize: (serializer, expr) => {
      const args = ops(expr);
      if (args === null || args.length === 0)
        return "\\text{}";
      return joinLatex([
        "\\text{",
        args.map((x) => serializer.serialize(x)).join(""),
        "}"
      ]);
    }
  },
  {
    name: "Subscript",
    trigger: ["_"],
    kind: "infix",
    serialize: (serializer, expr) => {
      if (nops(expr) === 2) {
        return serializer.serialize(op(expr, 1)) + "_{" + serializer.serialize(op(expr, 2)) + "}";
      }
      return "_{" + serializer.serialize(op(expr, 1)) + "}";
    }
  },
  { name: "Superplus", trigger: ["^", "+"], kind: "postfix" },
  { name: "Subplus", trigger: ["_", "+"], kind: "postfix" },
  { name: "Superminus", trigger: ["^", "-"], kind: "postfix" },
  { name: "Subminus", trigger: ["_", "-"], kind: "postfix" },
  {
    trigger: ["^", "*"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Superstar", lhs]
  },
  // @todo: when lhs is a complex number, 'Conjugate'
  // { name: 'Conjugate', trigger: ['\\star'], kind: 'infix' },
  { name: "Superstar", trigger: ["^", "\\star"], kind: "postfix" },
  {
    trigger: ["_", "*"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Substar", lhs]
  },
  { name: "Substar", trigger: ["_", "\\star"], kind: "postfix" },
  { name: "Superdagger", trigger: ["^", "\\dagger"], kind: "postfix" },
  {
    trigger: ["^", "\\dag"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Superdagger", lhs]
  },
  {
    name: "Prime",
    trigger: ["^", "\\prime"],
    kind: "postfix"
  },
  {
    trigger: ["^", "\\doubleprime"],
    kind: "postfix",
    parse: (_parser, lhs) => ["Prime", missingIfEmpty(lhs), 2]
  },
  {
    name: "InverseFunction",
    // trigger: '^{-1}',
    // kind: 'postfix',
    serialize: (serializer, expr) => serializer.serialize(op(expr, 1)) + "^{-1}"
  },
  {
    name: "Derivative",
    serialize: (serializer, expr) => {
      const degree = machineValue(op(expr, 1)) ?? NaN;
      if (!isFinite(degree))
        return "";
      const base = serializer.serialize(op(expr, 2));
      if (degree === 1) {
        return base + "^{\\prime}";
      } else if (degree === 2) {
        return base + "^{\\doubleprime}";
      }
      return base + "^{(" + Number(degree).toString() + ")}";
    }
  },
  {
    name: "Which",
    trigger: "cases",
    kind: "environment",
    parse: (parser) => {
      const tabular = parser.matchTabular("cases");
      if (!tabular)
        return ["Which"];
      const result = ["Which"];
      for (const row of tabular) {
        if (row.length === 1) {
          result.push("True");
          result.push(row[0]);
        } else if (row.length === 2) {
          const s = stringValue(row[1]);
          result.push(s ? "True" : stripText(row[1]) ?? "True");
          result.push(row[0]);
        }
      }
      return result;
    },
    serialize: (serialize2, expr) => {
      if (head(op(expr, 1)) !== "List")
        return "";
      const rows = ops(op(expr, 1)) ?? [];
      const body = [];
      let rowSep = "";
      for (const row of rows) {
        if (head(row) === "Tuple" || head(row) === "Pair") {
          body.push(rowSep);
          if (op(row, 2)) {
            body.push(serialize2.serialize(op(row, 2)));
            const condition = op(row, 1);
            if (condition !== null)
              body.push("&", serialize2.serialize(condition));
          }
        }
        rowSep = "\\\\";
      }
      return joinLatex(["\\begin{cases}", ...body, "\\end{cases}"]);
    }
  }
];
function parseTextRun(parser, style) {
  if (!parser.match("<{>"))
    return "''";
  const runs = [];
  let text = "";
  let runinStyle = null;
  while (!parser.atEnd && !parser.match("<}>")) {
    if (parser.peek === "<{>") {
      runs.push(parseTextRun(parser));
    } else if (parser.match("\\textbf") && parser.match("<{>")) {
      runs.push(parseTextRun(parser, { "font-weight": "bold" }));
    } else if (parser.match("\\color") && parser.match("<{>")) {
      const color = parser.matchColor();
      if (color && parser.match("<}>")) {
        if (runinStyle !== null && text) {
          runs.push(["Style", text, { dict: runinStyle }]);
        } else if (text) {
          runs.push(["String", text]);
        }
        text = "";
        runinStyle = { color };
      }
    } else if (parser.match("<space>")) {
      text += " ";
    } else if (parser.match("<$>")) {
      const index = parser.index;
      const expr = parser.matchExpression() ?? ["Sequence"];
      parser.skipSpace();
      if (parser.match("<$>")) {
        runs.push(expr);
      } else {
        text += "$";
        parser.index = index;
      }
    } else if (parser.match("<$$>")) {
      const index = parser.index;
      const expr = parser.matchExpression() ?? ["Sequence"];
      parser.skipSpace();
      if (parser.match("<$$>")) {
        runs.push(expr);
      } else {
        text += "$$";
        parser.index = index;
      }
    } else
      text += parser.matchChar() ?? "";
  }
  if (runinStyle !== null && text) {
    runs.push(["Style", `'${text}'`, { dict: runinStyle }]);
  } else if (text) {
    runs.push(`'${text}'`);
  }
  let body;
  if (runs.length === 1)
    body = runs[0];
  else {
    if (runs.every((x) => stringValue(x) !== null))
      body = "'" + runs.map((x) => stringValue(x)).join() + "'";
    else
      body = ["String", ...runs];
  }
  return style ? ["Style", body, { dict: style }] : body;
}
function serializeLatexTokens(serializer, expr) {
  if (expr === null)
    return "";
  return joinLatex(
    mapArgs(expr, (x) => {
      const s = stringValue(x);
      if (s === null)
        return serializer.serialize(x);
      if (s === "<{>")
        return "{";
      if (s === "<}>")
        return "}";
      if (s === "<$>")
        return "$";
      if (s === "<$$>")
        return "$$";
      if (s === "<space>")
        return " ";
      return s;
    })
  );
}
function sanitizeLatex(s) {
  if (s === null)
    return "";
  return s.replace(
    /[{}\[\]\\:\-\$%]/g,
    (c) => ({
      "{": "\\lbrace ",
      "}": "\\rbrace ",
      "[": "\\lbrack ",
      "]": "\\rbrack ",
      ":": "\\colon ",
      "\\": "\\backslash "
    })[c] ?? "\\" + c
  );
}
function errorContextAsLatex(serializer, error) {
  const arg = op(error, 2);
  if (!arg)
    return "";
  if (head(arg) === "Latex")
    return `\\texttt{${sanitizeLatex(stringValue(op(arg, 1)) ?? "")}}`;
  if (head(arg) === "Hold")
    return serializer.serialize(op(arg, 1));
  return serializer.serialize(arg);
}

// src/compute-engine/latex-syntax/dictionary/definitions-inequalities.ts
var DEFINITIONS_INEQUALITIES = [
  {
    trigger: ["!", "<"],
    kind: "infix",
    associativity: "right",
    precedence: 246,
    parse: "NotLess"
  },
  {
    name: "NotLess",
    trigger: ["\\nless"],
    kind: "infix",
    associativity: "right",
    precedence: 246
  },
  {
    trigger: ["<"],
    kind: "infix",
    associativity: "right",
    precedence: 245,
    parse: "Less"
  },
  {
    name: "Less",
    trigger: ["\\lt"],
    kind: "infix",
    associativity: "right",
    precedence: 245
  },
  {
    trigger: ["<", "="],
    kind: "infix",
    associativity: "right",
    precedence: 241,
    parse: "LessEqual"
  },
  {
    name: "LessEqual",
    trigger: ["\\le"],
    kind: "infix",
    associativity: "right",
    precedence: 241
  },
  {
    trigger: ["\\leq"],
    kind: "infix",
    associativity: "right",
    precedence: 241,
    parse: "Equal"
  },
  {
    trigger: ["\\leqslant"],
    kind: "infix",
    associativity: "right",
    precedence: 265,
    // Note different precedence than `<=` as per MathML
    parse: "LessEqual"
  },
  {
    name: "LessNotEqual",
    trigger: ["\\lneqq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "NotLessNotEqual",
    trigger: ["\\nleqq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "LessOverEqual",
    trigger: ["\\leqq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "GreaterOverEqual",
    trigger: ["\\geqq"],
    kind: "infix",
    associativity: "right",
    precedence: 265,
    parse: "GreaterEqual"
  },
  {
    name: "Equal",
    trigger: ["="],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    trigger: ["*", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260,
    parse: "StarEqual"
  },
  {
    name: "StarEqual",
    trigger: ["\\star", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "PlusEqual",
    trigger: ["+", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "MinusEqual",
    trigger: ["-", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "SlashEqual",
    trigger: ["/", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "EqualEqual",
    trigger: ["=", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "EqualEqualEqual",
    trigger: ["=", "=", "="],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "TildeFullEqual",
    // MathML: approximately equal to
    trigger: ["\\cong"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "NotTildeFullEqual",
    // MathML: approximately but not actually equal to
    trigger: ["\\ncong"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    trigger: [":", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260,
    parse: "Assign"
  },
  {
    name: "Assign",
    trigger: ["\\coloneq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "Approx",
    // Note: Mathematica TildeTilde
    trigger: ["\\approx"],
    kind: "infix",
    associativity: "right",
    precedence: 247
  },
  {
    name: "NotApprox",
    // Note: Mathematica TildeTilde
    trigger: ["\\approx"],
    kind: "infix",
    associativity: "right",
    precedence: 247
  },
  {
    name: "ApproxEqual",
    // Note: Mathematica TildeEqual, MathML: `asymptotically equal to`
    trigger: ["\\approxeq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "NotApproxEqual",
    // Note: Mathematica NotTildeEqual
    trigger: ["!", "\\approxeq"],
    kind: "infix",
    // Note: no LaTeX symbol for char U+2249
    associativity: "right",
    precedence: 250
  },
  {
    name: "NotEqual",
    trigger: ["\\ne"],
    kind: "infix",
    associativity: "right",
    precedence: 255
  },
  {
    name: "Unequal",
    trigger: ["!", "="],
    kind: "infix",
    associativity: "right",
    precedence: 260
    // Note different precendence than \\ne per MathML
  },
  {
    name: "GreaterEqual",
    trigger: ["\\ge"],
    kind: "infix",
    associativity: "right",
    precedence: 242
    // Note: different precendence than `>=` as per MathML
  },
  {
    trigger: ["\\geq"],
    kind: "infix",
    associativity: "right",
    precedence: 242,
    // Note: different precendence than `>=` as per MathML
    parse: "GreaterEqual"
  },
  {
    trigger: [">", "="],
    kind: "infix",
    associativity: "right",
    precedence: 243,
    parse: "GreaterEqual"
  },
  {
    trigger: ["\\geqslant"],
    kind: "infix",
    associativity: "right",
    precedence: 265,
    // Note: different precendence than `>=` as per MathML
    parse: "GreaterEqual"
  },
  {
    name: "GreaterNotEqual",
    trigger: ["\\gneqq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "NotGreaterNotEqual",
    trigger: ["\\ngeqq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    trigger: [">"],
    kind: "infix",
    associativity: "right",
    precedence: 245,
    parse: "Greater"
  },
  {
    name: "Greater",
    trigger: ["\\gt"],
    kind: "infix",
    associativity: "right",
    precedence: 245
  },
  {
    name: "NotGreater",
    trigger: ["\\ngtr"],
    kind: "infix",
    associativity: "right",
    precedence: 244
  },
  {
    trigger: ["!", ">"],
    kind: "infix",
    associativity: "right",
    precedence: 244,
    parse: "NotGreater"
  },
  {
    name: "RingEqual",
    trigger: ["\\circeq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "TriangleEqual",
    // MathML: delta equal to
    trigger: ["\\triangleq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "DotEqual",
    // MathML: approaches the limit
    trigger: ["\\doteq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "DotEqualDot",
    // MathML: Geometrically equal
    trigger: ["\\doteqdot"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "FallingDotEqual",
    // MathML: approximately equal to or the image of
    trigger: ["\\fallingdotseq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "RisingDotEqual",
    // MathML: image of or approximately equal to
    trigger: ["\\fallingdotseq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "QuestionEqual",
    trigger: ["\\questeq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "Equivalent",
    // MathML: identical to, Mathematica: Congruent
    trigger: ["\\equiv"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    trigger: ["\\iff"],
    kind: "infix",
    parse: "Equivalent",
    associativity: "right",
    precedence: 260
  },
  {
    name: "MuchLess",
    trigger: ["\\ll"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "MuchGreater",
    trigger: ["\\gg"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "Precedes",
    trigger: ["\\prec"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "Succeeds",
    trigger: ["\\succ"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "PrecedesEqual",
    trigger: ["\\preccurlyeq"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "SucceedsEqual",
    trigger: ["\\curlyeqprec"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "NotPrecedes",
    trigger: ["\\nprec"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "NotSucceeds",
    trigger: ["\\nsucc"],
    kind: "infix",
    associativity: "right",
    precedence: 260
  },
  {
    name: "Between",
    trigger: ["\\between"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-logic.ts
var DEFINITIONS_LOGIC = [
  // Constants
  {
    name: "True",
    trigger: ["\\mathrm", "<{>", "T", "r", "u", "e", "<}>"],
    serialize: "\\mathrm{True}"
  },
  {
    name: "False",
    trigger: ["\\mathrm", "<{>", "F", "a", "l", "s", "e", "<}>"],
    serialize: "\\mathrm{False}"
  },
  {
    name: "Maybe",
    trigger: ["\\mathrm", "<{>", "M", "a", "y", "b", "e", "<}>"],
    serialize: "\\mathrm{Maybe}"
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-other.ts
function parseSingleArg(cmd) {
  return (parser) => {
    const arg = parser.matchRequiredLatexArgument();
    if (arg === null)
      return [cmd];
    return [cmd, arg];
  };
}
var DEFINITIONS_OTHERS = [
  {
    name: "Overscript",
    trigger: ["\\overset"],
    kind: "infix",
    precedence: 700
    // @todo: not in MathML
  },
  {
    name: "Underscript",
    trigger: ["\\underset"],
    kind: "infix",
    precedence: 700
    // @todo: not in MathML
  },
  {
    name: "Increment",
    trigger: ["+", "+"],
    kind: "postfix",
    precedence: 880
  },
  {
    name: "Decrement",
    trigger: ["-", "-"],
    kind: "postfix",
    precedence: 880
  },
  {
    name: "PreIncrement",
    trigger: ["+", "+"],
    kind: "prefix",
    precedence: 880
  },
  {
    name: "PreDecrement",
    trigger: ["-", "-"],
    kind: "prefix",
    precedence: 880
  },
  {
    name: "Ring",
    // Aka 'Composition', i.e. function composition
    trigger: ["\\circ"],
    kind: "infix",
    precedence: 265
    // @todo: check lhs and rhs are functions
  },
  {
    name: "Transpose",
    trigger: ["^", "T"],
    kind: "infix"
    // @todo: if lhs is a list/tensor
  },
  {
    // @todo: if lhs is a list/tensor
    name: "ConjugateTranspose",
    trigger: ["^", "H"],
    kind: "infix"
  },
  {
    name: "StringJoin",
    // @todo From Mathematica...?
    trigger: ["\\lt", "\\gt"],
    kind: "infix",
    precedence: 780
  },
  {
    name: "Starstar",
    trigger: ["\\star", "\\star"],
    kind: "infix",
    precedence: 780
  },
  {
    // Partial derivative using a variation of the Euler notation: `∂_xf(x)`
    // (the Euler notation uses `D_1f(x)` where "1" is for the first variable
    // For the Leibniz notation see 'Divide' that handles `∂f/∂x`
    name: "PartialDerivative",
    // PartialDerivative(expr, {lists of vars}, degree)
    trigger: ["\\partial"],
    kind: "prefix",
    parse: (parser) => {
      let done = false;
      let sup = "Nothing";
      let sub2 = "Nothing";
      while (!done) {
        parser.skipSpace();
        if (parser.match("_")) {
          sub2 = parser.matchRequiredLatexArgument();
        } else if (parser.match("^")) {
          sup = parser.matchRequiredLatexArgument();
        } else {
          done = true;
        }
      }
      const seq = getSequence(sub2);
      if (seq)
        sub2 = ["List", ...seq];
      if (sub2 === null || sup === null)
        return null;
      let rhs = parser.matchRequiredLatexArgument() ?? "Nothing";
      if (rhs !== "Nothing" && !isEmptySequence(rhs)) {
        const arg = parser.matchArguments("enclosure") ?? ["Nothing"];
        rhs = [rhs, ...arg];
      }
      return ["PartialDerivative", rhs, sub2, sup];
    },
    serialize: (serializer, expr) => {
      let result = "\\partial";
      const fn = op(expr, 1);
      const vars = op(expr, 2);
      const degree = op(expr, 3);
      if (vars !== null && vars !== "Nothing") {
        if (head(vars) === "List") {
          result += "_{" + serializer.serialize(["Sequence", ...ops(vars) ?? []]) + "}";
        } else {
          result += "_{" + serializer.serialize(vars) + "}";
        }
      }
      if (degree !== null && degree !== "Nothing")
        result += "^{" + serializer.serialize(degree) + "}";
      if (fn !== null && fn !== "Nothing")
        result += serializer.serialize(fn);
      return result;
    },
    precedence: 740
  },
  {
    name: "OverBar",
    trigger: ["\\overline"],
    parse: parseSingleArg("OverBar")
  },
  {
    name: "UnderBar",
    trigger: ["\\underline"],
    parse: parseSingleArg("UnderBar")
  },
  {
    name: "OverVector",
    trigger: ["\\vec"],
    parse: parseSingleArg("OverVector")
  },
  {
    name: "OverTilde",
    trigger: ["\\tilde"],
    parse: parseSingleArg("OverTilde")
  },
  {
    name: "OverHat",
    trigger: ["\\hat"],
    parse: parseSingleArg("OverHat")
  },
  {
    name: "OverRightArrow",
    trigger: ["\\overrightarrow"],
    parse: parseSingleArg("OverRightArrow")
  },
  {
    name: "OverLeftArrow",
    trigger: ["\\overleftarrow"],
    parse: parseSingleArg("OverLeftArrow")
  },
  {
    name: "OverRightDoubleArrow",
    trigger: ["\\Overrightarrow"],
    parse: parseSingleArg("OverRightDoubleArrow")
  },
  {
    name: "OverLeftHarpoon",
    trigger: ["\\overleftharpoon"],
    parse: parseSingleArg("OverLeftHarpoon")
  },
  {
    name: "OverRightHarpoon",
    trigger: ["\\overrightharpoon"],
    parse: parseSingleArg("OverRightHarpoon")
  },
  {
    name: "OverLeftRightArrow",
    trigger: ["\\overleftrightarrow"],
    parse: parseSingleArg("OverLeftRightArrow")
  },
  {
    name: "OverBrace",
    trigger: ["\\overbrace"],
    parse: parseSingleArg("OverBrace")
  },
  {
    name: "OverLineSegment",
    trigger: ["\\overlinesegment"],
    parse: parseSingleArg("OverLineSegment")
  },
  {
    name: "OverGroup",
    trigger: ["\\overgroup"],
    parse: parseSingleArg("OverGroup")
  },
  {
    trigger: ["\\displaystyle"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\textstyle"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\scriptstyle"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\scriptscriptstyle"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\tiny"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\scriptsize"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\footnotesize"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\small"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\normalsize"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\large"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\Large"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\LARGE"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\huge"],
    parse: () => ["Sequence"]
  },
  {
    trigger: ["\\Huge"],
    parse: () => ["Sequence"]
  },
  {
    name: "Style",
    serialize: (serializer, expr) => {
      let result = serializer.serialize(op(expr, 1));
      const dict = dictionary(op(expr, 2));
      if (dict === null)
        return result;
      if (stringValue(dict.display) === "block")
        result = joinLatex(["{\\displaystyle", result, "}"]);
      else if (stringValue(dict.display) === "inline")
        result = joinLatex(["{\\textstyle", result, "}"]);
      else if (stringValue(dict.display) === "script")
        result = joinLatex(["{\\scriptstyle", result, "}"]);
      else if (stringValue(dict.display) === "scriptscript")
        result = joinLatex(["{\\scriptscriptstyle", result, "}"]);
      const v = machineValue(dict.size);
      if (v !== null && v >= 1 && v <= 10) {
        result = joinLatex([
          "{",
          {
            1: "\\tiny",
            2: "\\scriptsize",
            3: "\\footnotesize",
            4: "\\small",
            5: "\\normalsize",
            6: "\\large",
            7: "\\Large",
            8: "\\LARGE",
            9: "\\huge",
            10: "\\Huge"
          }[v],
          result,
          "}"
        ]);
      }
      return result;
    }
  },
  {
    trigger: ["\\!"],
    parse: () => ["HorizontalSpacing", -3]
  },
  {
    trigger: ["\\ "],
    parse: () => ["HorizontalSpacing", 6]
  },
  {
    trigger: ["\\:"],
    parse: () => ["HorizontalSpacing", 4]
  },
  {
    trigger: ["\\enskip"],
    parse: () => ["HorizontalSpacing", 9]
  },
  {
    trigger: ["\\quad"],
    parse: () => ["HorizontalSpacing", 18]
  },
  {
    trigger: ["\\qquad"],
    parse: () => ["HorizontalSpacing", 36]
  },
  {
    trigger: ["\\,"],
    parse: () => ["HorizontalSpacing", 3]
  },
  {
    trigger: ["\\;"],
    parse: () => ["HorizontalSpacing", 5]
  },
  {
    trigger: ["\\enspace"],
    parse: () => ["HorizontalSpacing", 9]
  },
  {
    name: "HorizontalSpacing",
    // The `HorizontalSpacing` function has two forms
    // `["HorizontalSpacing", number]` -> indicate a space of mu units
    // `["HorizontalSpacing", expr, 'op'|'bin'|rel]` -> indicate a spacing around and expression, i.e. `\mathbin{x}`, etc...
    serialize: (serializer, expr) => {
      if (op(expr, 2)) {
        return serializer.serialize(op(expr, 1));
      }
      const v = machineValue(op(expr, 1));
      if (v === null)
        return "";
      return {
        "-3": "\\!",
        6: "\\ ",
        3: "\\,",
        4: "\\:",
        5: "\\;",
        9: "\\enspace",
        18: "\\quad",
        36: "\\qquad"
      }[v] ?? "";
    }
  }
  // if (
  //   [
  //     '\\!',
  //     '\\:',
  //     '\\enskip',
  //     '\\quad',
  //     '\\,',
  //     '\\;',
  //     '\\enspace',
  //     '\\qquad',
  //     '\\selectfont',
  //   ].includes(token)
  // ) {
  //   return 'skip';
  // }
  // {
  //     name: '',
  //     trigger: '\\mathring',
  // },
  // {
  //     name: '',
  //     trigger: '\\check',
  // },
];

// src/compute-engine/latex-syntax/dictionary/definitions-trigonometry.ts
function parseTrig(op3) {
  return (parser) => {
    let isInverse = false;
    let primeLevel = 0;
    let sup = null;
    parser.skipSpace();
    if (parser.match("^")) {
      parser.skipSpace();
      const start = parser.index;
      if (parser.match("<{>")) {
        parser.skipSpace();
        if (parser.match("-") && parser.match("1")) {
          parser.skipSpace();
          if (parser.match("<}>"))
            isInverse = true;
        }
        if (!isInverse) {
          let done = false;
          while (!done) {
            parser.skipSpace();
            if (parser.match("\\doubleprime"))
              primeLevel += 2;
            else if (parser.match("\\prime"))
              primeLevel += 1;
            else if (parser.match("'"))
              primeLevel += 1;
            else
              done = true;
          }
          if (!parser.match("<}>"))
            primeLevel = 0;
        }
        if (primeLevel === 0 && !isInverse) {
          parser.index = start;
          sup = parser.matchRequiredLatexArgument();
        }
        if (primeLevel === 0) {
          let done = false;
          while (!done) {
            parser.skipSpace();
            if (parser.match("\\doubleprime"))
              primeLevel += 2;
            else if (parser.match("\\prime"))
              primeLevel += 1;
            else if (parser.match("'"))
              primeLevel += 1;
            else
              done = true;
          }
        }
      }
    }
    let head2 = {
      "\\arcsin": "Arcsin",
      "\\arccos": "Arccos",
      "\\arctan": "Arctan",
      "\\arctg": "Arctan",
      "\\arcctg": "Arctan",
      "\\arcsec": "Arcsec",
      "\\arccsc": " Arccsc",
      "\\arsinh": "Arsinh",
      "\\arcosh": "Arcosh",
      "\\artanh": "Artanh",
      "\\arcsech": "Arcsech",
      "\\arccsch": "Arcsch",
      // '\\arg',
      "\\ch": "Cosh",
      "\\cos": "Cos",
      "\\cosec": "Csc",
      "\\cosh": "Csch",
      "\\cot": "Cot",
      "\\cotg": "Cot",
      "\\coth": "Coth",
      "\\csc": "Csc",
      "\\ctg": "Cot",
      "\\cth": "Coth",
      "\\sec": "Sec",
      "\\sin": "Sin",
      "\\sinh": "Sinh",
      "\\sh": "Sinh",
      "\\tan": "Tan",
      "\\tanh": "Tanh",
      "\\tg": "Tan",
      "\\th": "Tanh"
    }[op3 ?? ""] ?? op3 ?? "";
    if (isInverse)
      head2 = ["InverseFunction", head2];
    if (primeLevel >= 1)
      head2 = ["Derivative", primeLevel, head2];
    const args = parser.matchArguments("implicit");
    if (args === null)
      return sup ? [["Power", [head2, "_"], sup]] : head2;
    return sup ? ["Power", [head2, ...args], sup] : [head2, ...args];
  };
}
var DEFINITIONS_TRIGONOMETRY = [
  {
    name: "Arcsin",
    trigger: ["\\arcsin"],
    parse: parseTrig("Arcsin")
  },
  {
    name: "Arccos",
    trigger: ["\\arccos"],
    parse: parseTrig("Arccos")
  },
  {
    name: "Arctan",
    trigger: ["\\arctan"],
    parse: parseTrig("Arctan")
  },
  {
    trigger: ["\\arctg"],
    parse: parseTrig("Arctan")
  },
  {
    name: "Arccot",
    trigger: ["\\arcctg"],
    parse: parseTrig("Arccot")
  },
  {
    name: "Arcsec",
    trigger: "arcsec",
    parse: parseTrig("Arcsec")
  },
  {
    name: "Arccsc",
    trigger: ["\\arccsc"],
    parse: parseTrig("Arccsc")
  },
  {
    name: "Arsinh",
    trigger: ["\\arsinh"],
    parse: parseTrig("Arsinh")
  },
  {
    name: "Arcosh",
    trigger: ["\\arcosh"],
    parse: parseTrig("Arcosh")
  },
  {
    name: "Artanh",
    trigger: ["\\artanh"],
    parse: parseTrig("Artanh")
  },
  {
    name: "Arsech",
    trigger: ["\\arsech"],
    parse: parseTrig("Arsech")
  },
  {
    name: "Arcsch",
    trigger: ["\\arcsch"],
    parse: parseTrig("Arcsch")
  },
  {
    // Rusian hyperbolic cosine
    trigger: ["\\ch"],
    parse: parseTrig("Cosh")
  },
  {
    name: "Cosec",
    trigger: ["\\cosec"],
    parse: parseTrig("Cosec")
  },
  {
    name: "Cosh",
    trigger: ["\\cosh"],
    parse: parseTrig("Cosh")
  },
  {
    name: "Cot",
    trigger: ["\\cot"],
    parse: parseTrig("Cot")
  },
  {
    trigger: ["\\cotg"],
    parse: parseTrig("Cot")
  },
  {
    name: "Coth",
    trigger: ["\\coth"],
    parse: parseTrig("Coth")
  },
  {
    name: "Csc",
    trigger: ["\\csc"],
    parse: parseTrig("Csc")
  },
  {
    // Rusian cotangent
    trigger: ["\\ctg"],
    parse: parseTrig("Cot")
  },
  {
    trigger: ["\\cth"],
    parse: parseTrig("Cotanh")
  },
  {
    name: "Sec",
    trigger: ["\\sec"],
    parse: parseTrig("Sec")
  },
  {
    name: "Sinh",
    trigger: ["\\sinh"],
    parse: parseTrig("Sinh")
  },
  {
    trigger: ["\\sh"],
    parse: parseTrig("Sinh")
  },
  {
    name: "Tan",
    trigger: ["\\tan"],
    parse: parseTrig("Tan")
  },
  {
    trigger: ["\\tg"],
    parse: parseTrig("Tan")
  },
  {
    name: "Tanh",
    trigger: ["\\tanh"],
    parse: parseTrig("Tanh")
  },
  {
    trigger: ["\\th"],
    parse: parseTrig("Tanh")
  },
  {
    name: "Cos",
    trigger: ["\\cos"],
    parse: parseTrig("Cos")
  },
  {
    name: "Sin",
    trigger: ["\\sin"],
    parse: parseTrig("Sin")
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-sets.ts
var DEFINITIONS_SETS = [
  // Constants
  { name: "AlgebraicNumber", trigger: "\\bar\\Q" },
  { name: "ComplexNumber", trigger: ["\\C"] },
  { trigger: "\\mathbb{C}", parse: "ComplexNumber" },
  { name: "ImaginaryNumber", trigger: ["\\imaginaryI\\R"] },
  { name: "ExtendedComplexNumber", trigger: ["\\bar\\C"] },
  { name: "EmptySet", trigger: ["\\emptyset"] },
  { trigger: ["\\varnothing"], parse: "EmptySet" },
  // Parsing only
  { name: "Integer", trigger: ["\\Z"] },
  { trigger: "\\mathbb{Z}", parse: "Integer" },
  { name: "RationalNumber", trigger: ["\\Q"] },
  { name: "RealNumber", trigger: ["\\R"] },
  { trigger: "\\mathbb{R}", parse: "RealNumber" },
  { name: "ExtendedRealNumber", trigger: ["\\bar\\R"] },
  { name: "TranscendentalNumber", trigger: "\\R-\\bar\\Q" },
  { trigger: "\\R\\backslash\\bar\\Q", parse: "TranscendentalNumber" },
  // Real numbers < 0
  { name: "NegativeNumber", trigger: "\\R^-" },
  { trigger: "\\R^{-}", parse: "NegativeNumber" },
  { trigger: "\\R_-", parse: "NegativeNumber" },
  { trigger: "\\R_{-}", parse: "NegativeNumber" },
  { trigger: "\\R^{\\lt}", parse: "NegativeNumber" },
  // Real numbers > 0
  { name: "PositiveNumber", trigger: "\\R^+" },
  { trigger: "\\R^{+}", parse: "PositiveNumber" },
  { trigger: "\\R_+", parse: "PositiveNumber" },
  { trigger: "\\R_{+}", parse: "PositiveNumber" },
  { trigger: "\\R^{\\gt}", parse: "PositiveNumber" },
  // Real numbers <= 0
  { name: "NonPositiveNumber", trigger: "\\R^{0-}" },
  { trigger: "\\R^{-0}", parse: "NonPositiveNumber" },
  { trigger: "\\R^{\\leq}", parse: "NonPositiveNumber" },
  // Integers < 0
  { name: "NegativeInteger", trigger: "\\Z^-" },
  { trigger: "\\Z^-", parse: "NegativeInteger" },
  { trigger: "\\Z^{-}", parse: "NegativeInteger" },
  { trigger: "\\Z_-", parse: "NegativeInteger" },
  { trigger: "\\Z_{-}", parse: "NegativeInteger" },
  { trigger: "\\Z^{\\lt}", parse: "NegativeInteger" },
  // Integers >  0
  { name: "PositiveInteger", trigger: "\\Z^+" },
  { trigger: "\\Z^{+}", parse: "PositiveInteger" },
  { trigger: "\\Z_+", parse: "PositiveInteger" },
  { trigger: "\\Z_{+}", parse: "PositiveInteger" },
  { trigger: "\\Z^{\\gt}", parse: "PositiveInteger" },
  { trigger: "\\Z^{\\gt0}", parse: "PositiveInteger" },
  { trigger: "\\N^+", parse: "PositiveInteger" },
  { trigger: "\\N^{+}", parse: "PositiveInteger" },
  { trigger: "\\N^*", parse: "PositiveInteger" },
  { trigger: "\\N^{*}", parse: "PositiveInteger" },
  { trigger: "\\N^\\star", parse: "PositiveInteger" },
  { trigger: "\\N^{\\star}", parse: "PositiveInteger" },
  { trigger: "\\N_1", parse: "PositiveInteger" },
  { trigger: "\\N_{1}", parse: "PositiveInteger" },
  // https://mathvault.ca/hub/higher-math/math-symbols/algebra-symbols/
  // Integers >=  0
  { name: "NonNegativeInteger", trigger: ["\\N"] },
  { trigger: "\\Z^{+0}", parse: "NonNegativeInteger" },
  { trigger: "\\Z^{\\geq}", parse: "NonNegativeInteger" },
  { trigger: "\\Z^{\\geq0}", parse: "NonNegativeInteger" },
  { trigger: "\\Z^{0+}", parse: "NonNegativeInteger" },
  { trigger: "\\mathbb{N}", parse: "NonNegativeInteger" },
  { trigger: "\\N_0", parse: "NonNegativeInteger" },
  { trigger: "\\N_{0}", parse: "NonNegativeInteger" },
  //
  // Set Expressions
  //
  // @todo: could also have a `CartesianPower` function with a number `rhs`
  {
    name: "CartesianProduct",
    trigger: ["\\times"],
    kind: "infix",
    associativity: "right",
    // Caution: cartesian product is not associative
    precedence: 390,
    // Same as Multiply?
    parse: (parser, until, lhs) => {
      if (390 < until.minPrec)
        return null;
      const ce = parser.computeEngine;
      if (!ce || !ce.box(lhs).domain.isCompatible("Set"))
        return null;
      const index = parser.index;
      const rhs = parser.matchExpression({ ...until, minPrec: 390 });
      if (rhs === null || ce.box(lhs).domain.isCompatible("Set") !== true) {
        parser.index = index;
        return null;
      }
      return ["CartesianProduct", lhs, rhs];
    }
  },
  {
    name: "Complement",
    trigger: ["^", "\\complement"],
    kind: "infix"
    // precedence: 240,
    // @todo: serialize for the multiple argument case
  },
  {
    name: "Intersection",
    trigger: ["\\cap"],
    kind: "infix",
    precedence: 350
  },
  {
    name: "Interval",
    // @todo: parse opening '[' or ']' or '('
    serialize: serializeSet
  },
  {
    name: "Multiple",
    // @todo: parse
    serialize: serializeSet
  },
  {
    name: "Union",
    trigger: ["\\cup"],
    kind: "infix",
    precedence: 350
  },
  {
    name: "Range",
    // @todo: parse opening '[' or ']' or '('
    serialize: serializeSet
  },
  // {
  //   name: 'Set',
  //   kind: 'matchfix',
  //   openDelimiter: '{',
  //   closeDelimiter: '}',
  //   precedence: 20,
  //   // @todo: the set syntax can also include conditions...
  // },
  {
    name: "SetMinus",
    trigger: ["\\setminus"],
    kind: "infix",
    precedence: 650
  },
  {
    name: "SymmetricDifference",
    trigger: ["\\triangle"],
    // or \\ominus
    kind: "infix",
    // @todo: parser could check that lhs and rhs are sets
    precedence: 260
  },
  // Predicates/Relations
  {
    trigger: ["\\ni"],
    kind: "infix",
    associativity: "right",
    precedence: 160,
    // As per MathML, lower precedence
    parse: (parser, terminator, lhs) => {
      const rhs = parser.matchExpression(terminator);
      return rhs === null ? null : ["Element", rhs, lhs];
    }
  },
  {
    name: "Element",
    trigger: ["\\in"],
    kind: "infix",
    precedence: 240
  },
  {
    name: "NotElement",
    trigger: ["\\notin"],
    kind: "infix",
    precedence: 240
  },
  {
    name: "NotSubset",
    trigger: ["\\nsubset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "NotSuperset",
    trigger: ["\\nsupset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "NotSubsetNotEqual",
    trigger: ["\\nsubseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "NotSupersetNotEqual",
    trigger: ["\\nsupseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    name: "SquareSubset",
    // MathML: square image of
    trigger: ["\\sqsubset"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "SquareSubsetEqual",
    // MathML: square image of or equal to
    trigger: ["\\sqsubseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "SquareSuperset",
    // MathML: square original of
    trigger: ["\\sqsupset"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "SquareSupersetEqual",
    // MathML: square original of or equal
    trigger: ["\\sqsupseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 265
  },
  {
    name: "Subset",
    trigger: ["\\subset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    trigger: ["\\subsetneq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Subset"
  },
  {
    trigger: ["\\varsubsetneqq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Subset"
  },
  {
    name: "SubsetEqual",
    trigger: ["\\subseteq"],
    kind: "infix",
    precedence: 240
  },
  {
    name: "Superset",
    trigger: ["\\supset"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  },
  {
    trigger: ["\\supsetneq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Superset"
  },
  {
    trigger: ["\\varsupsetneq"],
    kind: "infix",
    associativity: "right",
    precedence: 240,
    parse: "Superset"
  },
  {
    name: "SupersetEqual",
    trigger: ["\\supseteq"],
    kind: "infix",
    associativity: "right",
    precedence: 240
  }
];
function serializeSet(serializer, expr) {
  if (expr === null)
    return "";
  const h = head(expr);
  if (h === null)
    return "";
  if (h === "Set") {
    if (nops(expr) === 0)
      return "\\emptyset";
    if (nops(expr) === 2 && head(op(expr, 2)) === "Condition") {
      return joinLatex([
        "\\left\\lbrace",
        serializer.serialize(op(expr, 1)),
        "\\middle\\mid",
        serializer.serialize(op(expr, 2)),
        "\\right\\rbrace"
      ]);
    }
    return joinLatex([
      "\\left\\lbrace",
      ...(ops(expr) ?? []).map((x) => serializer.serialize(x) + " ,"),
      "\\right\\rbrace"
    ]);
  }
  if (h === "Multiple") {
  }
  if (h === "Range") {
    return joinLatex([
      "\\mathopen\\lbrack",
      serializer.serialize(op(expr, 1)),
      ", ",
      serializer.serialize(op(expr, 2)),
      "\\mathclose\\rbrack"
    ]);
  }
  if (h === "Interval") {
    let op12 = op(expr, 1);
    let op22 = op(expr, 2);
    let openLeft = false;
    let openRight = false;
    if (head(op12) === "Open") {
      op12 = op(op12, 1);
      openLeft = true;
    }
    if (head(op22) === "Open") {
      op22 = op(op22, 1);
      openRight = true;
    }
    return joinLatex([
      `\\mathopen${openLeft ? "\\rbrack" : "\\lbrack"}`,
      serializer.serialize(op12),
      ", ",
      serializer.serialize(op22),
      `\\mathclose${openRight ? "\\lbrack" : "\\rbrack"}`
    ]);
  }
  const style = serializer.numericSetStyle(expr, serializer.level);
  if (style === "compact") {
  } else if (style === "interval") {
  } else if (style === "regular") {
  } else if (style === "set-builder") {
  }
  return "";
}

// src/compute-engine/latex-syntax/dictionary/definitions-calculus.ts
function parseIntegral(command) {
  return (parser) => {
    parser.skipSpace();
    let sup = null;
    let sub2 = null;
    while (!(sub2 !== null && sup !== null) && (parser.peek === "_" || parser.peek === "^")) {
      if (parser.match("_"))
        sub2 = parser.matchRequiredLatexArgument();
      else if (parser.match("^"))
        sup = parser.matchRequiredLatexArgument();
      parser.skipSpace();
    }
    if (sub2 === "Nothing" || isEmptySequence(sub2))
      sub2 = null;
    if (sup === "Nothing" || isEmptySequence(sup))
      sup = null;
    let [fn, index] = parseIntegralBody(parser);
    if (fn && !index && (head(fn) === "Add" || head(fn) === "Subtract")) {
      const newOp = [];
      const rest = [];
      for (const op3 of ops(fn) ?? []) {
        if (index)
          rest.push(op3);
        else {
          let op22;
          [op22, index] = parseIntegralBodyExpression(op3);
          newOp.push(op22 ?? op3);
        }
      }
      if (index !== null && rest.length > 0) {
        return [
          "Add",
          makeIntegral(parser, command, ["Add", ...newOp], index, sub2, sup),
          ...rest
        ];
      }
    }
    return makeIntegral(parser, command, fn, index, sub2, sup);
  };
}
function makeIntegral(parser, command, fn, index, sub2, sup) {
  if (fn && sup === null && sub2 === null && !index)
    return [command, fn];
  fn ?? (fn = "Nothing");
  if (parser.computeEngine) {
    const ce = parser.computeEngine;
    if (index)
      ce.pushScope({ [index]: { domain: "ExtendedRealNumber" } });
    fn = ce.box(fn).json;
    if (index)
      ce.popScope();
  }
  const heldIndex = index ? ["Hold", index] : null;
  if (sup !== null)
    return [
      command,
      fn,
      ["Tuple", heldIndex ?? "Nothing", sub2 ?? "Nothing", sup]
    ];
  if (sub2 !== null)
    return [command, fn, ["Tuple", heldIndex ?? "Nothing", sub2]];
  if (heldIndex)
    return [command, fn, heldIndex];
  return [command, fn];
}
function parseIntegralBody(parser) {
  const start = parser.index;
  let found = false;
  let fn = parser.matchExpression({
    minPrec: 266,
    condition: () => {
      if (parser.matchAll(["\\mathrm", "<{>", "d", "<}>"]))
        found = true;
      return found;
    }
  });
  if (!found) {
    parser.index = start;
    fn = parser.matchExpression({
      minPrec: 266,
      condition: () => {
        if (parser.match("d"))
          found = true;
        return found;
      }
    });
  }
  if (fn && !found)
    return parseIntegralBodyExpression(fn);
  return [fn, found ? symbol(parser.matchSymbol()) : null];
}
function parseIntegralBodyExpression(expr) {
  const h = head(expr);
  const op12 = op(expr, 1);
  if (!op12)
    return [expr, null];
  if (h === "Multiply") {
    const args = ops(expr);
    if (args && args.length > 1) {
      if (symbol(args[args.length - 2]) === "d") {
        if (args.length === 2)
          return [null, symbol(args[1])];
        if (args.length === 3)
          return [args[0], symbol(args[2])];
        return [
          ["Multiply", ...args.slice(0, -2)],
          symbol(args[args.length - 1])
        ];
      }
      const [fn2, index] = parseIntegralBodyExpression(args[args.length - 1]);
      if (fn2)
        return [["Multiply", ...args.slice(0, -1), fn2], index];
    }
  } else if (h === "Delimiter") {
    const [fn2, index] = parseIntegralBodyExpression(op12);
    if (index) {
      if (!fn2)
        return [null, index];
      return [["Delimiter", fn2, ...ops(expr).slice(1)], index];
    }
  } else if (h === "Add") {
    const args = ops(expr);
    if (args && args.length > 0) {
      const [fn2, index] = parseIntegralBodyExpression(args[args.length - 1]);
      if (index) {
        if (fn2)
          return [["Add", ...args.slice(0, -1), fn2], index];
        if (args.length > 2)
          return [["Add", ...args.slice(0, -1)], index];
        if (args.length > 2)
          return [args[0], index];
      }
    }
  } else if (h === "Negate") {
    const [fn2, index] = parseIntegralBodyExpression(op12);
    if (index)
      return [fn2 ? ["Negate", fn2] : null, index];
  } else if (h === "Divide") {
    const [fn2, index] = parseIntegralBodyExpression(op12);
    if (index)
      return [["Divide", fn2 ?? 1, op(expr, 2)], index];
  } else {
    const args = ops(expr);
    if (args?.length === 1) {
      const [arg2, index] = parseIntegralBodyExpression(args[0]);
      if (index)
        return [[head(expr), arg2], index];
    }
  }
  return [expr, null];
}
function serializeIntegral(command) {
  return (serializer, expr) => {
    if (!op(expr, 1))
      return command;
    let arg = op(expr, 2);
    const h = head(arg);
    let index = null;
    if (h !== "Tuple" && h !== "Triple" && h !== "Pair" && h !== "Single") {
      index = symbol(arg);
      arg = null;
    } else
      index = symbol(op(arg, 1)) ?? "x";
    let fn = op(expr, 1);
    if (head(fn) === "Lambda" && op(fn, 1))
      fn = subs(op(fn, 1), { _: index ?? "x", _1: index ?? "x" });
    if (!arg) {
      if (!index)
        return joinLatex([command, serializer.serialize(fn)]);
      return joinLatex([
        command,
        serializer.serialize(fn),
        "\\mathrm{d}",
        index
      ]);
    }
    let sub2 = arg ? [serializer.serialize(op(arg, 2))] : [];
    if (sub2.length > 0)
      sub2 = ["_{", ...sub2, "}"];
    let sup = [];
    if (op(arg, 3))
      sup = ["^{", serializer.serialize(op(arg, 3)), "}"];
    return joinLatex([
      command,
      ...sup,
      ...sub2,
      serializer.serialize(fn),
      ...index && symbol(index) !== "Nothing" ? ["\\,\\mathrm{d}", serializer.serialize(index)] : []
    ]);
  };
}
var DEFINITIONS_CALCULUS = [
  {
    name: "Integrate",
    trigger: ["\\int"],
    parse: parseIntegral("Integrate"),
    serialize: serializeIntegral("\\int")
  },
  {
    trigger: ["\\iint"],
    parse: parseIntegral("Integrate")
  },
  {
    name: "CircularIntegrate",
    trigger: ["\\oint"],
    parse: parseIntegral("CircularIntegrate"),
    serialize: serializeIntegral("\\oint")
  }
];

// src/compute-engine/latex-syntax/dictionary/definitions-symbols.ts
var SYMBOLS = [
  // Greek
  ["Alpha", "\\alpha", 945],
  ["Beta", "\\beta", 946],
  ["Gamma", "\\gamma", 947],
  ["Delta", "\\delta", 948],
  ["Epsilon", "\\epsilon", 949],
  ["EpsilonSymbol", "\\varepsilon", 1013],
  // GREEK LUNATE EPSILON SYMBOL
  ["Zeta", "\\zeta", 950],
  ["Eta", "\\eta", 951],
  ["Theta", "\\theta", 952],
  ["ThetaSymbol", "\\vartheta", 977],
  // Unicode GREEK THETA SYMBOL
  ["Iota", "\\iota", 953],
  ["Kappa", "\\kappa", 954],
  ["KappaSymbol", "\\varkappa", 1008],
  // GREEK KAPPA SYMBOL
  ["Lambda", "\\lambda", 955],
  ["Mu", "\\mu", 956],
  ["Nu", "\\nu", 957],
  ["Xi", "\\xi", 958],
  ["Omicron", "\\omicron", 959],
  // ['', '\\pi', 0x03c0],
  ["PiSymbol", "\\varpi", 982],
  // GREEK PI SYMBOL
  ["Rho", "\\rho", 961],
  ["RhoSymbol", "\\varrho", 1009],
  // GREEK RHO SYMBOL
  ["Sigma", "\\sigma", 963],
  ["FinalSigma", "\\varsigma", 962],
  //GREEK SMALL LETTER FINAL SIGMA
  ["Tau", "\\tau", 964],
  ["Phi", "\\phi", 981],
  // Note GREEK PHI SYMBOL, but common usage in math
  ["PhiLetter", "\\varphi", 966],
  ["Upsilon", "\\upsilon", 965],
  ["Chi", "\\chi", 967],
  ["Psi", "\\psi", 968],
  ["Omega", "\\omega", 969],
  ["CapitalAlpha", "\\Alpha", 913],
  ["CapitalBeta", "\\Beta", 914],
  ["CapitalGamma", "\\Gamma", 915],
  ["CapitalDelta", "\\Delta", 916],
  ["CapitalEpsilon", "\\Epsilon", 917],
  ["CapitalZeta", "\\Zeta", 918],
  ["CapitalEta", "\\Eta", 919],
  ["CapitalTheta", "\\Theta", 920],
  ["CapitaIota", "\\Iota", 921],
  ["CapitalKappa", "\\Kappa", 922],
  ["CapitalLambda", "\\Lambda", 923],
  ["CapitalMu", "\\Mu", 924],
  ["CapitalNu", "\\Nu", 925],
  ["CapitalXi", "\\Xi", 926],
  ["CapitalOmicron", "\\Omicron", 927],
  ["CapitalPi", "\\Pi", 928],
  ["CapitalRho", "\\Rho", 929],
  ["CapitalSigma", "\\Sigma", 931],
  ["CapitalTau", "\\Tau", 932],
  ["CapitalPhi", "\\Phi", 934],
  ["CapitalUpsilon", "\\Upsilon", 933],
  ["CapitalChi", "\\Chi", 935],
  ["CapitalPsi", "\\Psi", 936],
  ["CapitalOmega", "\\Omega", 937],
  ["Digamma", "\\digamma", 989],
  // Hebrew
  ["Alef", "\\aleph", 8501],
  // Unicode ALEF SYMBOL
  ["Bet", "\\beth", 8502],
  ["Gimel", "\\gimel", 8503],
  ["Dalet", "\\daleth", 8504],
  // Letter-like
  ["TurnedCapitalF", "\\Finv", 8498],
  // Unicode TURNED CAPITAL F'
  ["TurnedCapitalG", "\\Game", 8513],
  // TURNED SANS-SERIF CAPITAL G
  ["Weierstrass", "\\wp", 8472],
  // Unicode SCRIPT CAPITAL P
  ["Eth", "\\eth", 240],
  ["InvertedOhm", "\\mho", 8487],
  // Unicode INVERTED OHM SIGN
  // Symbols
  ["BlackClubSuit", "\\clubsuit", 9827],
  ["WhiteHeartSuit", "\\heartsuit", 9825],
  ["BlackSpadeSuit", "\\spadesuit", 9824],
  ["WhiteDiamondSuit", "\\diamondsuit", 9826],
  ["Sharp", "\\sharp", 9839],
  ["Flat", "\\flat", 9837],
  ["Natural", "\\natural", 9838]
];
var DEFINITIONS_SYMBOLS = [
  ...SYMBOLS.map(([symbol2, latex, _codepoint]) => {
    return {
      name: symbol2,
      trigger: [latex],
      parse: symbol2
    };
  }),
  ...SYMBOLS.map(([symbol2, _latex, codepoint]) => {
    return {
      trigger: [String.fromCodePoint(codepoint)],
      parse: symbol2
    };
  })
];

// src/compute-engine/latex-syntax/dictionary/definitions.ts
var DEFAULT_DELIMITER = {
  "(": "(",
  ")": ")",
  "[": "\\lbrack",
  "]": "\\rbrack",
  "{": "\\lbrace",
  "}": "\\rbrace",
  "<": "\\langle",
  ">": "\\rangle",
  "|": "\\vert",
  "||": "\\Vert",
  "\\lceil": "\\lceil",
  "\\lfloor": "\\lfloor",
  "\\rceil": "\\rceil",
  "\\rfloor": "\\rfloor"
};
function triggerLength(trigger) {
  if (Array.isArray(trigger))
    return trigger.length;
  return 1;
}
function indexLatexDictionary(dic, onError) {
  const result = {
    lookahead: 1,
    name: /* @__PURE__ */ new Map(),
    function: /* @__PURE__ */ new Map(),
    symbol: [],
    infix: [],
    prefix: [],
    postfix: [],
    environment: /* @__PURE__ */ new Map(),
    matchfix: []
  };
  for (const entry of dic) {
    const [trigger, indexedEntry] = makeIndexedEntry(entry, onError);
    if (indexedEntry === null)
      continue;
    if (indexedEntry.name !== void 0) {
      if (result.name.has(indexedEntry.name)) {
        onError({
          severity: "warning",
          message: [
            "invalid-dictionary-entry",
            indexedEntry.name,
            "Duplicate definition"
          ]
        });
      }
      result.name.set(indexedEntry.name, indexedEntry);
    }
    if (indexedEntry.kind === "matchfix") {
      result.matchfix.push(indexedEntry);
    } else if (indexedEntry.kind === "environment") {
      const triggerString = tokensToString(entry.trigger ?? "");
      if (result.environment.has(triggerString)) {
        onError({
          severity: "warning",
          message: [
            "invalid-dictionary-entry",
            triggerString,
            "Duplicate environment definition"
          ]
        });
      }
      result.environment.set(triggerString, indexedEntry);
    } else if (trigger) {
      /* @__PURE__ */ console.assert(entry.trigger);
      const triggerString = tokensToString(entry.trigger ?? "");
      const n = triggerLength(trigger);
      result.lookahead = Math.max(result.lookahead, n);
      if (indexedEntry.kind === "function") {
        if (!result.function.has(triggerString))
          result.function.set(triggerString, [indexedEntry]);
        else
          result.function.set(triggerString, [
            ...result.function.get(triggerString),
            indexedEntry
          ]);
      } else if (indexedEntry.kind === "symbol") {
        if (result.symbol[n] === void 0)
          result.symbol[n] = /* @__PURE__ */ new Map();
        const list = result.symbol[n];
        if (list.has(triggerString))
          list.get(triggerString).push(indexedEntry);
        else
          list.set(triggerString, [indexedEntry]);
      } else if (indexedEntry.kind === "prefix") {
        if (result.prefix[n] === void 0)
          result.prefix[n] = /* @__PURE__ */ new Map();
        const list = result.prefix[n];
        if (list.has(triggerString))
          list.get(triggerString).push(indexedEntry);
        else
          list.set(triggerString, [indexedEntry]);
      } else if (indexedEntry.kind === "infix") {
        if (result.infix[n] === void 0)
          result.infix[n] = /* @__PURE__ */ new Map();
        const list = result.infix[n];
        if (list.has(triggerString))
          list.get(triggerString).push(indexedEntry);
        else
          list.set(triggerString, [indexedEntry]);
      } else if (indexedEntry.kind === "postfix") {
        if (result.postfix[n] === void 0)
          result.postfix[n] = /* @__PURE__ */ new Map();
        const list = result.postfix[n];
        if (list.has(triggerString))
          list.get(triggerString).push(indexedEntry);
        else
          list.set(triggerString, [indexedEntry]);
      }
    }
  }
  return result;
}
function makeIndexedEntry(entry, onError) {
  if (!entryIsValid(entry, onError))
    return [null, null];
  const result = {
    name: entry.name,
    kind: "kind" in entry ? entry.kind : "symbol"
  };
  if (result.kind === "matchfix" && isMatchfixEntry(entry)) {
    result.openDelimiter = entry.openDelimiter;
    result.closeDelimiter = entry.closeDelimiter;
    if (typeof entry.serialize === "function")
      result.serialize = entry.serialize;
    else {
      const openDelim = typeof result.openDelimiter === "string" ? DEFAULT_DELIMITER[result.openDelimiter] : tokensToString(result.openDelimiter);
      const closeDelim = typeof result.closeDelimiter === "string" ? DEFAULT_DELIMITER[result.closeDelimiter] : tokensToString(result.closeDelimiter);
      result.serialize = (serializer, expr) => joinLatex([openDelim, serializer.serialize(op(expr, 1)), closeDelim]);
    }
    if (typeof entry.parse === "function")
      result.parse = entry.parse;
    else {
      /* @__PURE__ */ console.assert(entry.parse || entry.name);
      const head2 = entry.parse ?? entry.name;
      result.parse = (_parser, expr) => [head2, expr];
    }
    return [null, result];
  }
  if (result.kind === "environment" && isEnvironmentEntry(entry)) {
    const envName = entry.trigger;
    result.serialize = entry.serialize ?? ((serializer, expr) => `\\begin{${envName}}${serializer.serialize(
      op(expr, 1)
    )}\\end{${envName}}`);
    result.parse = entry.parse ?? (() => null);
    return [envName, result];
  }
  const trigger = typeof entry.trigger === "string" ? tokenize(entry.trigger, []) : entry.trigger;
  const triggerString = trigger ? tokensToString(trigger) : "";
  if (result.kind === "function" && isFunctionEntry(entry)) {
    result.serialize = entry.serialize;
    if (triggerString && !entry.serialize)
      result.serialize = (serializer, expr) => `\\mathrm{${triggerString}}${serializer.wrapArguments(expr)}`;
    result.parse = entry.parse;
    if (!result.parse && entry.name)
      result.parse = (parser) => {
        const arg = parser.matchArguments("enclosure");
        return arg === null ? entry.name : [entry.name, ...arg];
      };
    return [triggerString, result];
  }
  if (typeof entry.trigger === "string") {
    /* @__PURE__ */ console.assert(
      entry.parse || trigger.length > 1,
      `Trigger shortcut should produce more than one token. Otherwise, not worth using the shortcut. (${triggerString})`
    );
  }
  if (result.kind === "symbol" && isSymbolEntry(entry)) {
    result.precedence = entry.precedence ?? 1e4;
  }
  if ((result.kind === "infix" || result.kind === "prefix" || result.kind === "postfix") && (isInfixEntry(entry) || isPrefixEntry(entry) || isPostfixEntry(entry))) {
    if (trigger && (trigger[0] === "^" || trigger[0] === "_"))
      result.precedence = 720;
    else
      result.precedence = entry.precedence ?? 1e4;
  }
  if (result.kind === "infix" && isInfixEntry(entry)) {
    /* @__PURE__ */ console.assert(
      !trigger || trigger[0] !== "^" && trigger[0] !== "_" || !entry.associativity || entry.associativity === "non"
    );
    result.associativity = entry.associativity ?? "non";
    if (typeof entry.parse === "function") {
      result.parse = entry.parse;
    } else if (trigger && (trigger[0] === "^" || trigger[0] === "_")) {
      /* @__PURE__ */ console.assert(!entry.parse);
      const name = entry.parse ?? entry.name;
      result.parse = (_scanner, _terminator, arg) => [
        name,
        missingIfEmpty(op(arg, 1)),
        missingIfEmpty(op(arg, 2))
      ];
    } else {
      const head2 = entry.parse ?? entry.name;
      const prec = result.precedence;
      const associativity = result.associativity;
      result.parse = (scanner, terminator, lhs) => {
        if (prec < terminator.minPrec)
          return null;
        const rhs = missingIfEmpty(
          scanner.matchExpression({
            ...terminator,
            minPrec: prec
          })
        );
        return typeof head2 === "string" ? applyAssociativeOperator(head2, lhs, rhs, associativity) : [head2, lhs, rhs];
      };
    }
  } else {
    if (typeof entry.parse === "function") {
      result.parse = entry.parse;
    } else if (entry.parse !== void 0) {
      /* @__PURE__ */ console.assert(result.kind === "symbol");
      result.parse = () => entry.parse;
    } else if (entry.parse === void 0 && entry.name !== void 0) {
      if (result.kind === "postfix") {
        result.parse = (_parser, lhs) => lhs ? [entry.name, lhs] : null;
      } else if (result.kind === "prefix") {
        const prec = result.precedence;
        /* @__PURE__ */ console.assert(entry.name);
        const head2 = entry.name;
        result.parse = (parser, terminator) => {
          if (prec < terminator.minPrec)
            return null;
          const rhs = parser.matchExpression({ ...terminator, minPrec: prec });
          return rhs === null ? null : [head2, rhs];
        };
      }
    }
  }
  if (typeof entry.serialize === "function" || typeof entry.serialize === "string") {
    result.serialize = entry.serialize;
  } else if (trigger) {
    if (result.kind === "postfix") {
      result.serialize = "#1" + triggerString;
    } else if (result.kind === "prefix") {
      result.serialize = triggerString + "#1";
    } else if (result.kind === "infix") {
      result.serialize = "#1" + triggerString + "#2";
    } else if (result.kind === "symbol") {
      result.serialize = triggerString;
    } else {
      result.serialize = "";
    }
  }
  return [trigger ?? null, result];
}
function entryIsValid(entry, onError) {
  const subject = entry.name ?? entry.trigger ?? entry["openDelimiter"];
  if (entry.serialize !== void 0 && !entry.name) {
    onError({
      severity: "warning",
      message: [
        "invalid-dictionary-entry",
        subject,
        `Unexpected serialize property without a name property`
      ]
    });
    return false;
  }
  if (isMatchfixEntry(entry)) {
    if (entry.trigger) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          `Unexpected 'trigger' "${entry.trigger}". 'matchfix' operators use a 'openDelimiter' and 'closeDelimiter' instead of a trigger. `
        ]
      });
      return false;
    }
    if (!entry.openDelimiter || !entry.closeDelimiter) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          "Expected `openDelimiter` and a `closeDelimiter` for matchfix operator"
        ]
      });
      return false;
    }
    if (typeof entry.openDelimiter !== typeof entry.closeDelimiter) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          "Expected `openDelimiter` and `closeDelimiter` to both be strings or array of LatexToken"
        ]
      });
      return false;
    }
  }
  if (isInfixEntry(entry) || isPostfixEntry(entry) || isPrefixEntry(entry)) {
    if (Array.isArray(entry.trigger) && (entry.trigger[0] === "_" || entry.trigger[0] === "^") || typeof entry.trigger === "string" && (entry.trigger.startsWith("^") || entry.trigger.startsWith("_"))) {
      if (entry.precedence !== void 0 || entry["associativity"] !== void 0) {
        onError({
          severity: "warning",
          message: [
            "invalid-dictionary-entry",
            subject,
            `Unexpected "precedence" or "associativity" for superscript/subscript operator`
          ]
        });
        return false;
      }
    } else if (entry.precedence === void 0) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          `Expected a "precedence" for ${entry.kind} operator`
        ]
      });
      return false;
    }
  } else {
    if (entry["associativity"] !== void 0) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          'Unexpected "associativity" operator'
        ]
      });
      return false;
    }
  }
  if (!isMatchfixEntry(entry)) {
    if (!entry.trigger && !entry.name) {
      onError({
        severity: "warning",
        message: [
          "invalid-dictionary-entry",
          subject,
          `Expected at least a 'trigger' or a 'name'`
        ]
      });
      return false;
    }
  }
  if (entry["parse"] === void 0 && entry.name === void 0) {
    onError({
      severity: "warning",
      message: [
        "invalid-dictionary-entry",
        subject,
        `Expected a 'parse' or 'name'`
      ]
    });
    return false;
  }
  return true;
}
var DEFAULT_LATEX_DICTIONARY = {
  algebra: DEFINITIONS_ALGEBRA,
  arithmetic: DEFINITIONS_ARITHMETIC,
  calculus: DEFINITIONS_CALCULUS,
  core: DEFINITIONS_CORE,
  logic: DEFINITIONS_LOGIC,
  relop: DEFINITIONS_INEQUALITIES,
  other: DEFINITIONS_OTHERS,
  physics: [
    {
      name: "mu-0",
      trigger: "\\mu_0"
    }
  ],
  sets: DEFINITIONS_SETS,
  symbols: DEFINITIONS_SYMBOLS,
  trigonometry: DEFINITIONS_TRIGONOMETRY
};

// src/compute-engine/latex-syntax/parse.ts
var DELIMITER_SHORTHAND = {
  "(": ["\\lparen", "("],
  ")": ["\\rparen", ")"],
  "[": ["\\lbrack"],
  "]": ["\\rbrack"],
  "<": ["<", "\\langle"],
  ">": [">", "\\rangle"],
  "{": ["\\{", "\\lbrace"],
  "}": ["\\}", "\\rbrace"],
  ":": [":", "\\colon"],
  "|": ["|", "\\|", "\\lvert", "\\rvert"],
  //special: '\lvert` when open, `\rvert` when close
  "||": ["||", "\\Vert", "\\lVert", "\\rVert"],
  // special: `\lVert` when open, `\rVert` when close
  "\\lfloor": ["\\lfloor"],
  "\\rfloor": ["\\rfloor"],
  "\\lceil": ["\\lceil"],
  "\\rceil": ["\\rceil"],
  "\\ulcorner": ["\\ulcorner"],
  "\\urcorner": ["\\urcorner"],
  "\\llcorner": ["\\llcorner"],
  "\\lrcorner": ["\\lrcorner"],
  "\\lgroup": ["\\lgroup"],
  "\\rgroup": ["\\rgroup"],
  "\\lmoustache": ["\\lmoustache"],
  "\\rmoustache": ["\\rmoustache"]
};
var MIDDLE_DELIMITER = {
  ":": [":", "\\colon"],
  "|": ["|", "\\|", "\\mid", "\\mvert"]
};
var OPEN_DELIMITER_PREFIX = {
  "\\left": "\\right",
  "\\bigl": "\\bigr",
  "\\Bigl": "\\Bigr",
  "\\biggl": "\\biggr",
  "\\Biggl": "\\Biggr",
  "\\big": "\\big",
  "\\Big": "\\Big",
  "\\bigg": "\\bigg",
  "\\Bigg": "\\Bigg"
};
var MIDDLE_DELIMITER_PREFIX = [
  "\\middle",
  "\\bigm",
  "\\Bigm",
  "\\biggm",
  "\\Biggm",
  "\\big",
  "\\Big",
  "\\bigg",
  "\\Bigg"
];
var CLOSE_DELIMITER = {
  "(": ")",
  "[": "]",
  "\\{": "\\}",
  "\\lbrace": "\\rbrace",
  "\\lparen": "\\rparen",
  "\\langle": "\\rangle",
  "\\lfloor": "\\rfloor",
  "\\lceil": "\\rceil",
  "\\vert": "\\vert",
  "\\lvert": "\\rvert",
  "\\Vert": "\\Vert",
  "\\lVert": "\\rVert",
  "\\lbrack": "\\rbrack",
  "\\ulcorner": "\\urcorner",
  "\\llcorner": "\\lrcorner",
  "\\lgroup": "\\rgroup",
  "\\lmoustache": "\\rmoustache"
};
var DEFAULT_LATEX_NUMBER_OPTIONS = {
  precision: 6,
  // with machine numbers, up to 15 assuming 2^53 bits floating points
  positiveInfinity: "\\infty",
  negativeInfinity: "-\\infty",
  notANumber: "\\operatorname{NaN}",
  decimalMarker: ".",
  // Use `{,}` for comma as a decimal marker
  groupSeparator: "\\,",
  // for thousands, etc...
  exponentProduct: "\\cdot",
  beginExponentMarker: "10^{",
  // could be 'e'
  endExponentMarker: "}",
  notation: "auto",
  truncationMarker: "\\ldots",
  beginRepeatingDigits: "\\overline{",
  endRepeatingDigits: "}",
  imaginaryUnit: "\\imaginaryI",
  avoidExponentsInRange: [-7, 20]
};
var DEFAULT_PARSE_LATEX_OPTIONS = {
  applyInvisibleOperator: "auto",
  skipSpace: true,
  parseArgumentsOfUnknownLatexCommands: true,
  parseNumbers: true,
  parseUnknownIdentifier: (s, parser) => {
    if (parser.computeEngine?.lookupFunction(s) !== void 0)
      return "function";
    if (/^\p{L}/u.test(s))
      return "symbol";
    return "unknown";
  },
  preserveLatex: false
};
var _Parser = class {
  constructor(tokens, options, dictionary2, computeEngine) {
    this.index = 0;
    // A parsing boundary is a sequence of tokens that indicate that a
    // recursive parsing operation should stop.
    // In a traditional parser, keeping track of parsing boundaries would
    // not be necessary. However, because we attempt to deliver the best
    // interpretation of a partial expression, boundaries allow us to fail
    // parsing more locally.
    // For example, in `\begin{cases} | \end{cases}`, without boundary
    // detection, the parsing of `|` would attempt to goble up `\end{cases}`
    // which would be interpreted as an unexpected command, and the whole `\begin`
    // would be rejected as an unbalanced environment. With `\end{cases}` as a
    // boundary, the parsing of the `|` argument stops as soon as it encounters
    // the `\end{cases}` and can properly report an unexpected toke on the `|`
    // only while correctly interpreting the `\begin{cases}...\end{cases}`
    this._boundaries = [];
    // Those two properties are used to detect infinite loops while parsing
    this._lastPeek = "";
    this._peekCounter = 0;
    this._tokens = tokens;
    this.options = {
      ...DEFAULT_LATEX_NUMBER_OPTIONS,
      ...DEFAULT_PARSE_LATEX_OPTIONS,
      ...options
    };
    this._dictionary = dictionary2;
    this.computeEngine = computeEngine;
    this._positiveInfinityTokens = tokenize(this.options.positiveInfinity, []);
    this._negativeInfinityTokens = tokenize(this.options.negativeInfinity, []);
    this._notANumberTokens = tokenize(this.options.notANumber, []);
    this._decimalMarkerTokens = tokenize(this.options.decimalMarker, []);
    this._groupSeparatorTokens = tokenize(this.options.groupSeparator, []);
    this._exponentProductTokens = tokenize(this.options.exponentProduct, []);
    this._beginExponentMarkerTokens = tokenize(
      this.options.beginExponentMarker,
      []
    );
    this._endExponentMarkerTokens = tokenize(
      this.options.endExponentMarker,
      []
    );
    this._truncationMarkerTokens = tokenize(this.options.truncationMarker, []);
    this._beginRepeatingDigitsTokens = tokenize(
      this.options.beginRepeatingDigits,
      []
    );
    this._endRepeatingDigitsTokens = tokenize(
      this.options.endRepeatingDigits,
      []
    );
    this._imaginaryNumberTokens = tokenize(this.options.imaginaryUnit, []);
  }
  updateOptions(opt) {
    for (const [k, v] of Object.entries(opt))
      if (k in this.options) {
        this.options[k] = v;
        if (typeof v === "string") {
          if (k === "positiveInfinity")
            this._positiveInfinityTokens = tokenize(v, []);
          if (k === "negativeInfinity")
            this._negativeInfinityTokens = tokenize(v, []);
          if (k === "notANumber")
            this._notANumberTokens = tokenize(v, []);
          if (k === "decimalMarker")
            this._decimalMarkerTokens = tokenize(v, []);
          if (k === "groupSeparator")
            this._groupSeparatorTokens = tokenize(v, []);
          if (k === "exponentProduct")
            this._exponentProductTokens = tokenize(v, []);
          if (k === "beginExponentMarker")
            this._beginExponentMarkerTokens = tokenize(v, []);
          if (k === "endExponentMarker")
            this._endExponentMarkerTokens = tokenize(v, []);
          if (k === "truncationMarker")
            this._truncationMarkerTokens = tokenize(v, []);
          if (k === "beginRepeatingDigits")
            this._beginRepeatingDigitsTokens = tokenize(v, []);
          if (k === "endRepeatingDigits")
            this._endRepeatingDigitsTokens = tokenize(v, []);
          if (k === "imaginaryNumber")
            this._imaginaryNumberTokens = tokenize(v, []);
        }
      } else
        throw Error(`Unexpected option "${k}"`);
  }
  get atEnd() {
    return this.index >= this._tokens.length;
  }
  get peek() {
    const peek = this._tokens[this.index];
    if (peek === this._lastPeek)
      this._peekCounter += 1;
    else
      this._peekCounter = 0;
    if (this._peekCounter >= 1024) {
      console.error(
        `Infinite loop detected while parsing "${this.latex(0)}" at "${this._lastPeek}" (index ${this.index})`
      );
      throw new Error(
        `Infinite loop detected while parsing "${this.latex(0)}" at ${this._lastPeek} (index ${this.index})`
      );
    }
    this._lastPeek = peek;
    return peek;
  }
  next() {
    return this._tokens[this.index++];
  }
  /**
   * Return true if
   * - at end of the token stream
   * - the upcoming tokens match `t.tokens`
   * - the `t.condition` function returns true
   * Note: the `minPrec` condition is not checked. It should be checked separately.
   */
  atTerminator(t) {
    if (this.atBoundary)
      return true;
    if (t?.condition && t.condition(this))
      return true;
    return false;
  }
  /** True if the current token matches any of the boundaries we are waiting for */
  get atBoundary() {
    if (this.atEnd)
      return true;
    const start = this.index;
    for (const boundary of this._boundaries) {
      if (this.matchAll(boundary.tokens)) {
        this.index = start;
        return true;
      }
    }
    return false;
  }
  addBoundary(boundary) {
    this._boundaries.push({ index: this.index, tokens: boundary });
  }
  removeBoundary() {
    this._boundaries.pop();
  }
  matchBoundary() {
    const currentBoundary = this._boundaries[this._boundaries.length - 1];
    const match2 = currentBoundary && this.matchAll(currentBoundary.tokens);
    if (match2)
      this._boundaries.pop();
    return match2;
  }
  boundaryError(msg) {
    const currentBoundary = this._boundaries[this._boundaries.length - 1];
    this._boundaries.pop();
    return this.error(msg, currentBoundary.index);
  }
  latex(start, end) {
    return tokensToString(this._tokens.slice(start, end));
  }
  latexAhead(n) {
    return this.latex(this.index, this.index + n);
  }
  latexBefore() {
    return this.latex(0, this.index);
  }
  latexAfter() {
    return this.latex(this.index);
  }
  /**
   * Return at most `this._dictionary.lookahead` strings made from the tokens
   * ahead.
   *
   * The index in the returned array correspond to the number of tokens.
   * Note that since a token can be longer than one char ('\\pi', but also
   * some astral plane unicode characters), the length of the string
   * does not match that index. However, knowing the index is important
   * to know by how many tokens to advance.
   *
   */
  lookAhead() {
    let n = Math.min(
      this._dictionary.lookahead,
      this._tokens.length - this.index
    );
    if (n < 0)
      return [];
    const result = Array(n + 1);
    while (n > 0)
      result[n] = this.latexAhead(n--);
    return result;
  }
  peekDefinitions(kind) {
    let defs;
    if (kind === "function") {
      const start = this.index;
      if (this.match("\\operatorname") || this.match("\\mathrm") || this.match("\\mathit")) {
        const fn = this.matchStringArgument();
        const n = this.index - start;
        this.index = start;
        if (fn !== null && this._dictionary.function.has(fn))
          return this._dictionary.function.get(fn).map((x) => [x, n]);
        return null;
      }
      return null;
    } else if (kind === "operator") {
      defs = this.lookAhead().map(
        (x, n) => this._dictionary.infix[n]?.get(x) ?? this._dictionary.postfix[n]?.get(x) ?? this._dictionary.prefix[n]?.get(x)
      );
    } else {
      defs = this.lookAhead().map((x, n) => this._dictionary[kind][n]?.get(x));
    }
    const result = [];
    for (let i = defs.length; i > 0; i--) {
      if (defs[i] !== void 0) {
        /* @__PURE__ */ console.assert(Array.isArray(defs[i]));
        for (const def of defs[i])
          result.push([def, i]);
      }
    }
    return result.length === 0 ? null : result;
  }
  /** Skip strictly `<space>` tokens.
   * To also skip `{}` see `skipSpace()`.
   * To skip visual space (e.g. `\,`) see `skipVisualSpace()`.
   */
  skipSpaceTokens() {
    while (this.match("<space>")) {
    }
  }
  /** While parsing in math mode, skip applicable spaces, which includes `{}`.
   * Do not use to skip spaces while parsing a string. See  `skipSpaceTokens()`
   * instead.
   */
  skipSpace() {
    if (!this.options.skipSpace)
      return false;
    if (!this.atEnd && this.peek === "<{>") {
      const index = this.index;
      this.next();
      while (this.match("<space>")) {
      }
      if (this.next() === "<}>") {
        this.skipSpace();
        return true;
      }
      this.index = index;
    }
    let result = false;
    while (this.match("<space>"))
      result = true;
    if (result)
      this.skipSpace();
    return result;
  }
  skipVisualSpace() {
    if (!this.options.skipSpace)
      return;
    this.skipSpace();
    if ([
      "\\!",
      "\\,",
      "\\:",
      "\\;",
      "\\enskip",
      "\\enspace",
      "\\space",
      "\\quad",
      "\\qquad"
    ].includes(this.peek)) {
      this.next();
      this.skipVisualSpace();
    }
    this.skipSpace();
  }
  matchChar() {
    const index = this.index;
    let caretCount = 0;
    while (this.match("^"))
      caretCount += 1;
    if (caretCount >= 2) {
      let digits = "";
      let n = 0;
      while (n != caretCount) {
        const digit = this.matchAny([
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ]);
        if (!digit)
          break;
        digits += digit;
        n += 1;
      }
      if (digits.length === caretCount) {
        return String.fromCodePoint(Number.parseInt(digits, 16));
      }
    } else if (this.match("\\char")) {
      let codepoint = Math.floor(this.matchLatexNumber() ?? Number.NaN);
      if (!Number.isFinite(codepoint) || codepoint < 0 || codepoint > 1114111) {
        codepoint = 10067;
      }
      return String.fromCodePoint(codepoint);
    } else if (this.match("\\unicode")) {
      this.skipSpaceTokens();
      if (this.peek === "<{>") {
        this.next();
        const codepoint = this.matchLatexNumber();
        if (this.match("<}>") && codepoint !== null && codepoint >= 0 && codepoint <= 1114111) {
          return String.fromCodePoint(codepoint);
        }
      } else {
        const codepoint = this.matchLatexNumber();
        if (codepoint !== null && codepoint >= 0 && codepoint <= 1114111) {
          return String.fromCodePoint(codepoint);
        }
      }
    }
    this.index = index;
    const nextToken = this.next();
    return nextToken;
  }
  matchColor(_background = false) {
    let s = "";
    while (!this.atEnd && this.peek !== "}")
      s += this.next();
    return s;
  }
  matchLatexDimension() {
    return null;
  }
  match(token) {
    if (this._tokens[this.index] === token) {
      this.index++;
      return true;
    }
    return false;
  }
  matchAll(tokens) {
    if (typeof tokens === "string")
      tokens = [tokens];
    if (tokens.length === 0)
      return false;
    let matched = true;
    let i = 0;
    do {
      matched = this._tokens[this.index + i] === tokens[i++];
    } while (matched && i < tokens.length);
    if (matched)
      this.index += i;
    return matched;
  }
  matchAny(tokens) {
    if (tokens.includes(this._tokens[this.index]))
      return this._tokens[this.index++];
    return "";
  }
  matchSequence(tokens) {
    const result = [];
    while (tokens.includes(this._tokens[this.index]))
      result.push(this._tokens[this.index++]);
    return result;
  }
  matchOptionalSign() {
    let isNegative = !!this.matchAny(["-", "\u2212"]);
    while (this.matchAny(["+", "\uFE62"]) || this.skipSpace())
      if (this.matchAny(["-", "\u2212"]))
        isNegative = !isNegative;
    return isNegative ? "-" : "+";
  }
  matchDecimalDigits(options) {
    options ?? (options = {});
    options.withGrouping ?? (options.withGrouping = false);
    const result = [];
    let done = false;
    while (!done) {
      while (/^[0-9]$/.test(this.peek)) {
        result.push(this.next());
        this.skipVisualSpace();
      }
      done = true;
      if (options.withGrouping && this.options.groupSeparator) {
        const savedIndex = this.index;
        this.skipVisualSpace();
        if (this.matchAll(this._groupSeparatorTokens)) {
          this.skipVisualSpace();
          if (/^[0-9]$/.test(this.peek))
            done = false;
          else
            this.index = savedIndex;
        }
      }
    }
    return result.join("");
  }
  matchSignedInteger(options) {
    options ?? (options = {});
    options.withGrouping ?? (options.withGrouping = false);
    const start = this.index;
    const sign2 = this.matchOptionalSign();
    const result = this.matchDecimalDigits(options);
    if (result)
      return sign2 === "-" ? "-" + result : result;
    this.index = start;
    return "";
  }
  matchExponent() {
    const start = this.index;
    if (this.matchAny(["e", "E"])) {
      const exponent = this.matchSignedInteger({ withGrouping: false });
      if (exponent)
        return "e" + exponent;
    }
    this.index = start;
    if (this.match("\\times")) {
      this.skipSpaceTokens();
      if (this.match("1") && this.match("0") && this.match("^")) {
        if (/^[0-9]$/.test(this.peek))
          return "e" + this.next();
        if (this.match("<{>")) {
          this.skipSpaceTokens();
          const exponent = this.matchSignedInteger();
          this.skipSpaceTokens();
          if (this.match("<}>") && exponent)
            return "e" + exponent;
        }
      }
    }
    this.index = start;
    this.skipSpaceTokens();
    if (this.match("\\%"))
      return `e-2`;
    this.index = start;
    if (this.matchAll(this._exponentProductTokens)) {
      this.skipSpaceTokens();
      if (this.matchAll(this._beginExponentMarkerTokens)) {
        this.skipSpaceTokens();
        const exponent = this.matchSignedInteger();
        this.skipSpaceTokens();
        if (this.matchAll(this._endExponentMarkerTokens) && exponent)
          return "e" + exponent;
      }
    }
    this.index = start;
    return "";
  }
  matchRepeatingDecimal() {
    const start = this.index;
    let repeatingDecimals2 = "";
    if (this.match("(")) {
      repeatingDecimals2 = this.matchDecimalDigits();
      if (repeatingDecimals2 && this.match(")"))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    if (this.matchAll([`\\left`, "("])) {
      repeatingDecimals2 = this.matchDecimalDigits();
      if (repeatingDecimals2 && this.matchAll([`\\right`, ")"]))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    if (this.matchAll([`\\overline`, "<{>"])) {
      repeatingDecimals2 = this.matchDecimalDigits();
      if (repeatingDecimals2 && this.match("<}>"))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    if (this.matchAll(this._beginRepeatingDigitsTokens)) {
      repeatingDecimals2 = this.matchDecimalDigits();
      if (repeatingDecimals2 && this.matchAll(this._endRepeatingDigitsTokens))
        return "(" + repeatingDecimals2 + ")";
      this.index = start;
      return "";
    }
    this.index = start;
    return "";
  }
  matchNumber() {
    if (!this.options.parseNumbers)
      return "";
    const start = this.index;
    this.skipVisualSpace();
    this.match("+");
    let result = "";
    let dotPrefix = false;
    if (this.match(".") || this.matchAll(this._decimalMarkerTokens)) {
      const peek = this.peek;
      if (peek !== "\\overline" && peek !== this._beginRepeatingDigitsTokens[0] && !/[0-9\(]/.test(peek)) {
        this.index = start;
        return "";
      }
      dotPrefix = true;
    } else {
      result = this.matchDecimalDigits({ withGrouping: true });
      if (!result) {
        this.index = start;
        return "";
      }
    }
    let hasDecimal = true;
    if (!dotPrefix && (this.match(".") || this.matchAll(this._decimalMarkerTokens)))
      result += "." + this.matchDecimalDigits({ withGrouping: true });
    else if (dotPrefix)
      result = "0." + this.matchDecimalDigits({ withGrouping: true });
    else
      hasDecimal = false;
    if (hasDecimal) {
      const repeat = this.matchRepeatingDecimal();
      if (repeat)
        result += repeat;
      else if (this.match("\\ldots") || this.matchAll(this._truncationMarkerTokens)) {
      }
    }
    this.skipVisualSpace();
    return result + this.matchExponent();
  }
  /**
   * A Latex number can be a decimal, hex or octal number.
   * It is used in some Latex commands, such as `\char`
   *
   * From TeX:8695 (scan_int):
   * > An integer number can be preceded by any number of spaces and `+' or
   * > `-' signs. Then comes either a decimal constant (i.e., radix 10), an
   * > octal constant (i.e., radix 8, preceded by '), a hexadecimal constant
   * > (radix 16, preceded by "), an alphabetic constant (preceded by `), or
   * > an internal variable.
   */
  matchLatexNumber(isInteger = true) {
    let negative = false;
    let token = this.peek;
    while (token === "<space>" || token === "+" || token === "-") {
      if (token === "-")
        negative = !negative;
      this.next();
      token = this.peek;
    }
    let radix = 10;
    let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (this.match("'")) {
      radix = 8;
      digits = ["0", "1", "2", "3", "4", "5", "6", "7"];
      isInteger = true;
    } else if (this.match('"') || this.match("x")) {
      radix = 16;
      digits = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
      ];
      isInteger = true;
    } else if (this.match("`")) {
      token = this.next();
      if (token) {
        if (token.startsWith("\\") && token.length === 2) {
          return (negative ? -1 : 1) * (token.codePointAt(1) ?? 0);
        }
        return (negative ? -1 : 1) * (token.codePointAt(0) ?? 0);
      }
      return null;
    }
    let value = "";
    while (digits.includes(this.peek)) {
      value += this.next();
    }
    if (!isInteger && this.match(".")) {
      value += ".";
      while (digits.includes(this.peek)) {
        value += this.next();
      }
    }
    const result = isInteger ? Number.parseInt(value, radix) : Number.parseFloat(value);
    if (Number.isNaN(result))
      return null;
    return negative ? -result : result;
  }
  matchPrefixOperator(until) {
    if (!until)
      until = { minPrec: 0 };
    if (!until.minPrec)
      until = { ...until, minPrec: 0 };
    const defs = this.peekDefinitions("prefix");
    if (defs === null)
      return null;
    const start = this.index;
    for (const [def, n] of defs) {
      this.index = start + n;
      const rhs = def.parse(this, until);
      if (rhs)
        return rhs;
    }
    this.index = start;
    return null;
  }
  matchInfixOperator(lhs, until) {
    if (!until)
      until = { minPrec: 0 };
    if (!until.minPrec)
      until = { ...until, minPrec: 0 };
    const defs = this.peekDefinitions("infix");
    if (defs === null)
      return null;
    const start = this.index;
    for (const [def, n] of defs) {
      if (def.precedence >= until.minPrec) {
        this.index = start + n;
        const rhs = def.parse(this, until, lhs);
        if (rhs)
          return rhs;
      }
    }
    this.index = start;
    return null;
  }
  /**
   * - 'enclosure' : will look for an argument inside an enclosure (open/close fence)
   * - 'implicit': either an expression inside a pair of `()`, or just a product
   *  (i.e. we interpret `\cos 2x + 1` as `\cos(2x) + 1`)
   */
  matchArguments(kind) {
    if (!kind)
      return null;
    const savedIndex = this.index;
    const group = this.matchEnclosure();
    if (kind === "enclosure" && head(group) === "Delimiter") {
      if (op(group, 1) === "Sequence")
        return ops(op(group, 1)) ?? [];
      return [op(group, 1) ?? ["Sequence"]];
    }
    if (kind === "implicit") {
      if (head(group) === "Delimiter") {
        if (head(op(group, 1)) === "Sequence")
          return getSequence(group) ?? [];
        return [op(group, 1) ?? ["Sequence"]];
      }
      if (group !== null)
        return [group];
      const primary = this.matchExpression({ minPrec: 390 });
      if (primary !== null)
        return [primary];
      return null;
    }
    this.index = savedIndex;
    return null;
  }
  /**
   * A function can be followed by the following suffixes:
   * - a `\prime`, `\doubleprime`, `'`, `(n)` to indicate a derivative
   * - a subscript to indicate an argument
   * - an argument, optionally inside an enclosure
   */
  matchFunctionSuffix() {
    return null;
  }
  /** If matches the normalized open delimiter, return the
   * expected closing delimiter.
   *
   * For example, if `delimiter` is `(`, it would match `\left\lparen` and
   * return `['\right', '\rparen']`, which can be matched with `matchAll()`
   *
   * If you need to match several tokens, use `matchAll()`
   */
  matchOpenDelimiter(openDelim, closeDelim) {
    const index = this.index;
    const closePrefix = OPEN_DELIMITER_PREFIX[this.peek];
    if (closePrefix)
      this.next();
    const alternatives = DELIMITER_SHORTHAND[openDelim] ?? [openDelim];
    const result = closePrefix ? [closePrefix] : [];
    if (alternatives.includes("||") && this.matchAll(["|", "|"])) {
      result.push("|");
      result.push("|");
      return result;
    }
    if (!alternatives.includes(this.peek)) {
      this.index = index;
      return null;
    }
    if (CLOSE_DELIMITER[openDelim] === closeDelim) {
      result.push(CLOSE_DELIMITER[this.peek]);
    } else {
      result.push(closeDelim);
    }
    this.next();
    return result;
  }
  matchMiddleDelimiter(delimiter) {
    const delimiters = MIDDLE_DELIMITER[delimiter] ?? [delimiter];
    if (MIDDLE_DELIMITER_PREFIX.includes(this.peek)) {
      const index = this.index;
      this.next();
      if (delimiters.includes(this.peek)) {
        this.next();
        return true;
      }
      this.index = index;
      return false;
    } else if (delimiters.include(this.peek)) {
      this.next();
      return true;
    }
    return false;
  }
  /** For error handling, when there is potentially a mismatched delimiter.
   * Return a LaTeX fragment of the expected closing delimiter
   */
  matchEnclosureOpen() {
    const defs = this._dictionary.matchfix;
    if (defs.length === 0)
      return null;
    const start = this.index;
    for (const def of defs) {
      this.index = start;
      if (Array.isArray(def.openDelimiter)) {
        if (this.matchAll(def.openDelimiter))
          return tokensToString(def.closeDelimiter);
        continue;
      }
      const closeDelimiter = this.matchOpenDelimiter(
        def.openDelimiter,
        def.closeDelimiter
      );
      if (closeDelimiter !== null)
        return tokensToString(closeDelimiter);
    }
    this.index = start;
    return null;
  }
  matchEnclosureClose() {
    const defs = this._dictionary.matchfix;
    if (defs.length === 0)
      return null;
    const start = this.index;
    for (const def of defs) {
      this.index = start;
      if (Array.isArray(def.closeDelimiter)) {
        if (this.matchAll(def.closeDelimiter))
          return tokensToString(def.openDelimiter);
        continue;
      }
      this.index = start;
      let peek = this.peek;
      const prefix = Object.keys(OPEN_DELIMITER_PREFIX).find(
        (x) => OPEN_DELIMITER_PREFIX[x] === peek
      );
      if (prefix)
        this.next();
      let openDelimiter = [];
      peek = this.peek;
      const matchingDelim = Object.keys(CLOSE_DELIMITER).find(
        (x) => CLOSE_DELIMITER[x] === peek
      );
      if (matchingDelim)
        openDelimiter = [matchingDelim];
      if (prefix)
        openDelimiter = [prefix, ...openDelimiter];
      if (openDelimiter.length > 0) {
        this.next();
        return tokensToString(openDelimiter);
      }
    }
    this.index = start;
    return null;
  }
  /**
   * An enclosure is an opening matchfix operator, an optional expression,
   * optionally followed multiple times by a separator and another expression,
   * and finally a closing matching operator.
   */
  matchEnclosure() {
    const defs = this._dictionary.matchfix;
    if (defs.length === 0)
      return null;
    const start = this.index;
    for (const def of defs) {
      this.index = start;
      if (Array.isArray(def.openDelimiter)) {
        if (!this.matchAll(def.openDelimiter))
          continue;
        this.addBoundary(def.closeDelimiter);
        const body2 = this.matchExpression();
        this.skipSpace();
        if (!this.matchBoundary()) {
          this.removeBoundary();
          continue;
        }
        const rhs = def.parse(this, body2 ?? ["Sequence"]);
        if (rhs === null)
          continue;
        return rhs;
      }
      const closeDelimiter = this.matchOpenDelimiter(
        def.openDelimiter,
        def.closeDelimiter
      );
      if (closeDelimiter === null)
        continue;
      if (this.matchAll(closeDelimiter)) {
        const result2 = def.parse(this, ["Sequence"]);
        if (result2 === null)
          continue;
        return result2;
      }
      this.addBoundary(closeDelimiter);
      const bodyStart = this.index;
      let body = this.matchExpression();
      this.skipSpace();
      if (!this.matchBoundary()) {
        this.removeBoundary();
        this.index = bodyStart;
        body = this.matchExpression();
        if (!this.matchAll(closeDelimiter)) {
          if (!this.atEnd)
            continue;
          this.index = start;
          return null;
        }
      }
      const result = def.parse(this, body ?? ["Sequence"]);
      if (result !== null)
        return result;
    }
    this.index = start;
    return null;
  }
  /**
   * Match an identifier. It can be:
   * - a symbol
   * - a simple multi-letter identifier: `\mathrm{speed}`
   * - a complex multi-letter identifier: `\mathrm{\alpha_{12}}` or `\mathit{speed\unicode{"2012}of\unicode{"2012}sound}`
   * - a command: `\alpha`  @todo
   */
  matchIdentifier() {
    const modifier = {
      "\\operatorname": "",
      "\\mathrm": "",
      "\\mathit": "italic.",
      "\\mathbf": "bold.",
      // bold-italic is not supported
      "\\mathscr": "script.",
      "\\mathcal": "calligraphic.",
      // bold-script is not supported
      // bold-calligraphic is not supported
      "\\mathfrak": "gothic.",
      // bold-gothic is not supported
      // bold-fraktur is not supported
      "\\mathsf": "sans-serif.",
      // italic-sans-serif is not supported
      "\\mathtt": "monospace.",
      "\\mathbb": "double-struck."
    }[this.peek] ?? null;
    if (modifier !== null) {
      this.next();
      if (!this.match("<{>")) {
        this.index -= 1;
        return null;
      }
      const start = this.index;
      let id = this.matchIdentifierSegment();
      if (id === null)
        return this.error("expected-string-argument", start);
      id = `${modifier}${id}`;
      let done = false;
      while (!done) {
        if (this.match("<}>")) {
          done = true;
        } else if (this.match("_")) {
          const sub2 = this.matchIdentifierSegment();
          id = `${id}_${sub2}`;
        } else if (this.match("^")) {
          const sup = this.matchIdentifierSegment();
          id = `${id}__${sup}`;
        } else {
          const sub2 = this.matchIdentifierSegment();
          if (sub2 === null)
            done = true;
          else
            id = `${id}${sub2}`;
        }
      }
      if (isValidIdentifier(id))
        return id;
      return this.error("invalid-symbol-name", start);
    }
    if (/^\p{L}$/u.test(this.peek))
      return this.next();
    return null;
  }
  // A portion of an identifier, e.g. `\alpha \beta` or `speed`
  // Stops on "_" (subscript), "^" (superscript) or non-letter
  matchIdentifierSegment() {
    let result = "";
    while (true) {
      if (this.atEnd || /\d/.test(this.peek) || this.peek === '"' || this.peek === "_" || this.peek === "^" || this.peek === "<}>")
        return result ? result : null;
      let id = this.peek;
      if (id.startsWith("\\")) {
        id = id.substring(1);
        if (!COMMON_IDENTIFIER_NAME.includes(id))
          return null;
        this.next();
        result += id;
      } else
        result += this.next();
    }
  }
  /**
   * A function is a function identifier followed by arguments
   * - a function with explicit arguments `f(x)`
   * - a function with explicit arguments `\mathrm{floor}(x)`
   * - a function name: `\mathrm{floor}`
   * - a function with implicit arguments: `\cos x` (via a  custom parser)
   *
   */
  matchFunction() {
    const start = this.index;
    const fnDefs = this.peekDefinitions("function");
    if (fnDefs) {
      for (const [def, tokenCount] of fnDefs) {
        this.index = start + tokenCount;
        if (typeof def.parse === "function") {
          const result = def.parse(this);
          if (result)
            return result;
        } else {
          const seq = this.matchArguments("enclosure");
          return seq ? [def.name, ...seq] : def.name;
        }
      }
    }
    this.index = start;
    const fn = this.matchIdentifier();
    if (fn === null) {
      this.index = start;
      return null;
    }
    if (typeof fn !== "string")
      return fn;
    if (this.options.parseUnknownIdentifier?.(fn, this) === "function") {
      const seq = this.matchArguments("enclosure");
      return seq ? [fn, ...seq] : fn;
    }
    this.index = start;
    return null;
  }
  /**
   * A symbol can be:
   * - a single-letter variable: `x`
   * - a single LaTeX command: `\pi`
   */
  matchSymbol() {
    const start = this.index;
    const defs = this.peekDefinitions("symbol");
    if (defs) {
      for (const [def, tokenCount] of defs) {
        this.index = start + tokenCount;
        if (typeof def.parse === "function") {
          const result = def.parse(this);
          if (result)
            return result;
        } else
          return def.name;
      }
    }
    this.index = start;
    const id = this.matchIdentifier();
    if (id === null) {
      this.index = start;
      return null;
    }
    if (typeof id !== "string")
      return id;
    if (id && this.options.parseUnknownIdentifier?.(id, this) === "symbol")
      return id;
    this.index = start;
    return null;
  }
  matchOptionalLatexArgument() {
    const index = this.index;
    this.skipSpaceTokens();
    if (this.match("[")) {
      this.addBoundary(["]"]);
      const expr = this.matchExpression();
      this.skipSpace();
      if (this.matchBoundary())
        return expr;
      return this.boundaryError("expected-closing-delimiter");
    }
    this.index = index;
    return null;
  }
  matchRequiredLatexArgument(excluding) {
    if (!excluding)
      excluding = [...'!"#$%&(),/;:?@[]`|~'.split(""), "\\left", "\\bigl"];
    const start = this.index;
    this.skipSpaceTokens();
    if (this.match("<{>")) {
      this.addBoundary(["<}>"]);
      const expr2 = this.matchExpression();
      this.skipSpace();
      if (this.matchBoundary())
        return expr2 ?? ["Sequence"];
      return this.boundaryError("expected-closing-delimiter");
    }
    if (excluding.includes(this.peek)) {
      this.index = start;
      return null;
    }
    if (/^[0-9]$/.test(this.peek))
      return parseInt(this.next());
    if (/^[^\\#]$/.test(this.peek))
      return this.next();
    const expr = this.matchSymbol();
    if (expr)
      return expr;
    this.index = start;
    return null;
  }
  matchSupsub(lhs) {
    /* @__PURE__ */ console.assert(lhs !== null);
    if (lhs === null)
      return null;
    const index = this.index;
    this.skipSpace();
    const superscripts = [];
    const subscripts = [];
    let subIndex = index;
    while (this.peek === "_" || this.peek === "^") {
      if (this.match("_")) {
        subIndex = this.index;
        if (this.match("_") || this.match("^"))
          subscripts.push(this.error("syntax-error", subIndex));
        else {
          const sub2 = this.matchRequiredLatexArgument() ?? this.matchStringArgument();
          if (sub2 === null)
            return this.error("missing", index);
          subscripts.push(sub2);
        }
      } else if (this.match("^")) {
        subIndex = this.index;
        if (this.match("_") || this.match("^"))
          superscripts.push(this.error("syntax-error", subIndex));
        else {
          const sup = this.matchRequiredLatexArgument();
          if (sup === null)
            return this.error("missing", index);
          superscripts.push(sup);
        }
      }
      subIndex = this.index;
      this.skipSpace();
    }
    if (superscripts.length === 0 && subscripts.length === 0) {
      this.index = index;
      return lhs;
    }
    let result = lhs;
    if (subscripts.length > 0) {
      const defs = this._dictionary.infix[1]?.get("_");
      if (defs) {
        const arg = [
          "Subscript",
          result,
          subscripts.length === 1 ? subscripts[0] : ["List", ...subscripts]
        ];
        for (const def of defs) {
          if (typeof def.parse === "function")
            result = def.parse(this, { minPrec: 0 }, arg);
          else
            result = arg;
          if (result)
            break;
        }
      }
    }
    if (superscripts.length > 0) {
      const defs = this._dictionary.infix[1]?.get("^");
      if (defs) {
        const arg = [
          "Superscript",
          result,
          superscripts.length === 1 ? superscripts[0] : ["List", ...superscripts]
        ];
        for (const def of defs) {
          if (typeof def.parse === "function")
            result = def.parse(this, { minPrec: 0 }, arg);
          else
            result = arg;
          if (result)
            break;
        }
      }
    }
    if (result === null)
      this.index = index;
    return result;
  }
  matchPostfix(lhs) {
    /* @__PURE__ */ console.assert(lhs !== null);
    if (lhs === null)
      return null;
    const defs = this.peekDefinitions("postfix");
    if (defs === null)
      return null;
    const start = this.index;
    for (const [def, n] of defs) {
      this.index = start + n;
      const result = def.parse(this, lhs);
      if (result !== null)
        return result;
    }
    this.index = start;
    return null;
  }
  /** Match a string used as a LaTeX identifier, for example an environment
   * name.
   * Not suitable for general purpose text, e.g. argument of a `\text{}
   * command. See `matchChar()` instead.
   */
  matchString() {
    let result = "";
    while (!this.atBoundary) {
      const token = this.peek;
      if (token === "<$>" || token === "<$$>") {
        return "";
      } else if (token === "<space>") {
        this.next();
        result += " ";
      } else if (token[0] === "\\") {
        result += this.next();
      } else {
        result += this.next();
      }
    }
    return result;
  }
  /** Match a string as an argument (in a `{}` pair) */
  matchStringArgument() {
    const start = this.index;
    this.skipSpaceTokens();
    if (this.match("<{>")) {
      this.addBoundary(["<}>"]);
      while (this.match("<space>")) {
      }
      const arg = this.matchString();
      if (this.matchBoundary())
        return arg.trimEnd();
      this.removeBoundary();
    }
    this.index = start;
    return null;
  }
  /**
   * Match an expression in a tabular format, where rows are separated by `\\`
   * and columns by `&`.
   *
   * Return rows of sparse columns: empty rows are indicated with `Nothing`,
   * and empty cells are also indicated with `Nothing`.
   */
  matchTabular() {
    const result = [];
    let row = [];
    let expr = null;
    while (!this.atBoundary) {
      this.skipSpace();
      if (this.match("&")) {
        row.push(expr ?? "Nothing");
        expr = null;
      } else if (this.match("\\\\") || this.match("\\cr")) {
        this.skipSpace();
        this.matchOptionalLatexArgument();
        if (expr !== null)
          row.push(expr);
        result.push(row);
        row = [];
        expr = null;
      } else {
        const cell = [];
        let peek = this.peek;
        while (peek !== "&" && peek !== "\\\\" && peek !== "\\cr" && !this.atBoundary) {
          expr = this.matchExpression({
            condition: (p) => {
              const peek2 = p.peek;
              return peek2 === "&" || peek2 === "\\\\" || peek2 === "\\cr";
            }
          });
          if (expr)
            cell.push(expr);
          else {
            cell.push(["Error", ["'unexpected-token'", peek]]);
            this.next();
          }
          this.skipSpace();
          peek = this.peek;
        }
        if (cell.length > 1)
          expr = ["Sequence", ...cell];
        else
          expr = cell[0] ?? "Nothing";
      }
    }
    if (expr !== null)
      row.push(expr);
    if (row.length > 0)
      result.push(row);
    return result;
  }
  matchEnvironment() {
    const index = this.index;
    if (!this.match("\\begin"))
      return null;
    const name = this.matchStringArgument();
    if (name === null)
      return this.error("expected-environment-name", index);
    this.addBoundary(["\\end", "<{>", ...name.split(""), "<}>"]);
    const def = this._dictionary.environment.get(name);
    if (!def) {
      this.matchTabular();
      this.skipSpace();
      if (!this.matchBoundary())
        return this.boundaryError("unbalanced-environment");
      return this.error(["unknown-environment", { str: name }], index);
    }
    const expr = def.parse(this, [], []);
    this.skipSpace();
    if (!this.matchBoundary())
      return this.boundaryError("unbalanced-environment");
    if (expr !== null)
      return this.decorate(expr, index);
    this.index = index;
    return null;
  }
  /**
   * Apply an invisible operator between two expressions.
   *
   * If the `lhs` is an literal integer and the `rhs` is a literal rational
   * -> 'invisible plus'
   *
   * That is '2 3/4' -> ['Add', 2, ['Rational', 3, 4]]
   *
   * If `lhs` is a number and `rhs` is a number but not a literal -> 'invisible multiply'.
   * - 2x
   * - 2(x+1)
   * - x(x+1)
   * - f(x)g(y)
   * - 2 sin(x)
   * - 2 f(x)
   * - x f(x)
   * - (x-1)(x+1)
   * - (x+1)2 -> no
   * - x2 -> no
   * => lhs is a number, rhs is a number, but not a literal
   */
  applyInvisibleOperator(terminator, lhs) {
    if (lhs === null || head(lhs) === "Error" || symbol(lhs) === "Nothing" || isEmptySequence(lhs) || this.atTerminator(terminator) || this.options.applyInvisibleOperator === null)
      return null;
    if (this.peekDefinitions("operator") !== null)
      return null;
    const start = this.index;
    const rhs = this.matchExpression({ ...terminator, minPrec: 390 });
    if (rhs === null || symbol(rhs) === "Nothing" || isEmptySequence(rhs)) {
      this.index = start;
      return null;
    }
    if (head(rhs) === "Error") {
      return applyAssociativeOperator("Sequence", lhs, rhs);
    }
    if (typeof this.options.applyInvisibleOperator === "function")
      return this.options.applyInvisibleOperator(this, lhs, rhs);
    const lhsSymbol = symbol(lhs);
    if (lhsSymbol) {
      const isFunction = this.options.parseUnknownIdentifier(lhsSymbol, this) === "function";
      if (isFunction) {
        const seq = getSequence(rhs);
        return seq ? [lhs, ...seq] : lhsSymbol;
      }
    }
    const lhsNumber = machineValue(lhs);
    if (lhsNumber !== null && Number.isInteger(lhsNumber)) {
      const rhsHead = head(rhs);
      if (rhsHead === "Divide" || rhsHead === "Rational") {
        const [n, d] = [machineValue(op(rhs, 1)), machineValue(op(rhs, 2))];
        if (n !== null && d !== null && n > 0 && n <= 1e3 && d > 1 && d <= 1e3 && Number.isInteger(n) && Number.isInteger(d))
          return ["Add", lhs, rhs];
      }
    }
    if (head(rhs) === "Delimiter") {
      if (head(op(rhs, 1)) === "Sequence")
        return [lhsSymbol ?? lhs, ...ops(op(rhs, 1)) ?? []];
      if (!op(rhs, 1) || symbol(op(rhs, 1)) === "Nothing")
        return applyAssociativeOperator(
          "Sequence",
          lhs,
          this.error("expected-expression", start)
        );
    }
    if (head(rhs) === "Sequence" || head(lhs) === "Sequence" || stringValue(lhs) !== null || stringValue(rhs) !== null || dictionary(lhs) !== null || dictionary(rhs) !== null)
      return applyAssociativeOperator("Sequence", lhs, rhs);
    return applyAssociativeOperator("Multiply", lhs, rhs);
  }
  matchUnexpectedLatexCommand() {
    const start = this.index;
    let opDefs = this.peekDefinitions("operator");
    if (opDefs) {
      opDefs = this.peekDefinitions("postfix");
      if (opDefs) {
        const [def, n] = opDefs[0];
        this.index += n;
        if (typeof def.parse === "function") {
          const result = def.parse(this, this.error("missing", start));
          if (result)
            return result;
        }
        if (def.name)
          return [def.name, this.error("missing", start)];
        return this.error("unexpected-operator", start);
      }
      opDefs = this.peekDefinitions("prefix");
      if (opDefs) {
        const [def, n] = opDefs[0];
        this.index += n;
        if (typeof def.parse === "function") {
          const result = def.parse(this, { minPrec: 0 });
          if (result)
            return result;
        }
        if (def.name)
          return [
            def.name,
            this.matchExpression() ?? this.error("missing", start)
          ];
        return this.error("unexpected-operator", start);
      }
      opDefs = this.peekDefinitions("infix");
      if (opDefs) {
        const [def, n] = opDefs[0];
        this.index += n;
        if (typeof def.parse === "function") {
          const result = def.parse(
            this,
            { minPrec: 0 },
            this.error("missing", start)
          );
          if (result)
            return result;
        }
        if (def.name)
          return [
            def.name,
            this.error("missing", start),
            this.matchExpression() ?? this.error("missing", start)
          ];
        return this.error("unexpected-operator", start);
      }
    }
    const command = this.peek;
    if (!command || command[0] !== "\\")
      return null;
    this.next();
    this.skipSpaceTokens();
    if (command === "\\end") {
      const name = this.matchStringArgument();
      if (name === null)
        return this.error("expected-environment-name", start);
      return this.error(["unbalanced-environment", { str: name }], start);
    }
    while (this.match("[")) {
      let level = 0;
      while (!this.atEnd && level === 0 && this.peek !== "]") {
        if (this.peek === "[")
          level += 1;
        if (this.peek === "]")
          level -= 1;
        this.next();
      }
      this.match("]");
    }
    const index = this.index;
    this.index = start;
    const closeDelimiter = this.matchEnclosureOpen();
    if (closeDelimiter)
      return this.error(["expected-close-delimiter", closeDelimiter], index);
    const openDelimiter = this.matchEnclosureClose();
    if (openDelimiter)
      return this.error(["expected-open-delimiter", openDelimiter], start);
    this.index = index;
    while (this.match("<{>")) {
      let level = 0;
      while (!this.atEnd && level === 0 && this.peek !== "<}>") {
        if (this.peek === "<{>")
          level += 1;
        if (this.peek === "<}>")
          level -= 1;
        this.next();
      }
      this.match("<}>");
    }
    return this.error(["unexpected-command", { str: command }], start);
  }
  /**
   * <primary> :=
   * (<number> | <symbol> | <environment> | <matchfix-expr>) <subsup>* <postfix-operator>*
   *
   * <symbol> ::= (<symbol-id> | (<latex-command><latex-arguments>)) <arguments>
   *
   * <matchfix-expr> :=
   *  <matchfix-op-open> <expression> [<matchfix-op-separator> <expression>] <matchfix-op-close>
   *
   */
  matchPrimary() {
    if (this.atBoundary)
      return null;
    let result = null;
    const start = this.index;
    if (this.match("<}>"))
      return this.error("unexpected-closing-delimiter", start);
    if (this.match("<{>")) {
      this.addBoundary(["<}>"]);
      result = this.matchExpression();
      if (result === null)
        return this.boundaryError("expected-expression");
      if (!this.matchBoundary()) {
        return this.decorate(
          [
            "Sequence",
            result,
            this.boundaryError("expected-closing-delimiter")
          ],
          start
        );
      }
    }
    if (result === null) {
      const num = this.matchNumber();
      if (num)
        result = { num };
    }
    if (result === null)
      result = this.matchEnclosure();
    if (result === null)
      result = this.matchEnvironment();
    if (result === null && this.matchAll(this._positiveInfinityTokens))
      result = { num: "+Infinity" };
    if (result === null && this.matchAll(this._negativeInfinityTokens))
      result = { num: "-Infinity" };
    if (result === null && this.matchAll(this._notANumberTokens))
      result = { num: "NaN" };
    if (result === null)
      result = this.matchFunction() ?? this.matchSymbol();
    if (result !== null) {
      result = this.decorate(result, start);
      let postfix = null;
      let index = this.index;
      do {
        postfix = this.matchPostfix(result);
        result = postfix ?? result;
        if (this.index === index && postfix !== null) {
          /* @__PURE__ */ console.assert(this.index !== index, "No token consumed");
          break;
        }
        index = this.index;
      } while (postfix !== null);
    }
    if (result === null)
      result = this.matchUnexpectedLatexCommand();
    if (result !== null)
      result = this.matchSupsub(result);
    return this.decorate(result, start);
  }
  /**
   *  Parse an expression:
   *
   * <expression> ::=
   *  | <primary>
   *  | <prefix-op> <primary>
   *  | <primary> <infix-op> <expression>
   *
   * Stop when an operator of precedence less than `until.minPrec` is encountered
   */
  matchExpression(until) {
    const start = this.index;
    this.skipSpace();
    if (this.atBoundary) {
      this.index = start;
      return null;
    }
    if (!until)
      until = { minPrec: 0 };
    if (until.minPrec === void 0)
      until.minPrec = 0;
    let lhs = this.matchPrefixOperator({ ...until, minPrec: 0 });
    if (lhs === null) {
      lhs = this.matchPrimary();
      if (head(lhs) === "Sequence" && nops(lhs) === 0)
        lhs = null;
    }
    if (lhs) {
      let done = false;
      while (!done && !this.atTerminator(until)) {
        this.skipSpace();
        let result = this.matchInfixOperator(lhs, until);
        if (result === null) {
          result = this.applyInvisibleOperator(until, lhs);
        }
        if (result !== null) {
          lhs = result;
        } else {
          done = true;
        }
      }
    }
    return this.decorate(lhs, start);
  }
  /**
   * Add LaTeX or other requested metadata to the expression
   */
  decorate(expr, start) {
    if (expr === null)
      return null;
    if (!this.options.preserveLatex)
      return expr;
    const latex = this.latex(start, this.index);
    if (Array.isArray(expr)) {
      expr = { latex, fn: expr };
    } else if (typeof expr === "number") {
      expr = { latex, num: Number(expr).toString() };
    } else if (typeof expr === "string") {
      expr = { latex, sym: expr };
    } else if (typeof expr === "object" && expr !== null) {
      expr.latex = latex;
    }
    return expr;
  }
  error(code, fromToken) {
    if (typeof code === "string")
      return [
        "Error",
        { str: code },
        [
          "Latex",
          {
            str: this.latex(fromToken, this.index)
          }
        ]
      ];
    return [
      "Error",
      ["ErrorCode", { str: code[0] }, ...code.slice(1)],
      [
        "Latex",
        {
          str: this.latex(fromToken, this.index)
        }
      ]
    ];
  }
};

// src/compute-engine/latex-syntax/serialize-number.ts
function formatFractionalPart(m, options) {
  const originalLength = m.length;
  const originalM = m;
  if (options.beginRepeatingDigits && options.endRepeatingDigits) {
    m = m.slice(0, -1);
    for (let i = 0; i < m.length - 16; i++) {
      const offset = m.substring(0, i);
      for (let j = 0; j < 17; j++) {
        const cycle = m.substring(i, i + j + 1);
        const times = Math.floor((m.length - offset.length) / cycle.length);
        if (times <= 3)
          break;
        if ((offset + cycle.repeat(times + 1)).startsWith(m)) {
          if (cycle === "0") {
            return offset.replace(/(\d{3})/g, "$1" + options.groupSeparator);
          }
          return offset.replace(/(\d{3})/g, "$1" + options.groupSeparator) + options.beginRepeatingDigits + cycle + options.endRepeatingDigits;
        }
      }
    }
  }
  const extraDigits = originalLength > options.precision - 1;
  m = originalM;
  if (extraDigits)
    m = m.substring(0, options.precision - 1);
  if (options.groupSeparator) {
    m = m.replace(/(\d{3})/g, "$1" + options.groupSeparator);
    if (m.endsWith(options.groupSeparator)) {
      m = m.slice(0, -options.groupSeparator.length);
    }
  }
  if (extraDigits)
    return m + options.truncationMarker;
  return m;
}
function formatExponent(exp2, options) {
  if (!exp2)
    return "";
  if (options.beginExponentMarker) {
    return options.beginExponentMarker + exp2 + (options.endExponentMarker ?? "");
  }
  return "10^{" + exp2 + "}";
}
function serializeNumber(expr, options) {
  if (expr === null)
    return "";
  let num;
  if (typeof expr === "number" || typeof expr === "string") {
    num = expr;
  } else if (typeof expr === "object" && "num" in expr) {
    num = expr.num;
  } else
    return "";
  if (typeof num === "number") {
    if (num === Infinity)
      return options.positiveInfinity;
    else if (num === -Infinity)
      return options.negativeInfinity;
    else if (Number.isNaN(num))
      return options.notANumber;
    let result2 = void 0;
    if (options.notation === "engineering")
      result2 = serializeScientificNotationNumber(
        num.toExponential(),
        options,
        3
      );
    else if (options.notation === "scientific")
      result2 = serializeScientificNotationNumber(num.toExponential(), options);
    return result2 ?? serializeAutoNotationNumber(num.toString(), options);
  }
  num = num.toLowerCase().replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
  if (num === "infinity" || num === "+infinity")
    return options.positiveInfinity;
  else if (num === "-infinity")
    return options.negativeInfinity;
  else if (num === "nan")
    return options.notANumber;
  if (!/^[-+\.]?[0-9]/.test(num))
    return "";
  num = num.replace(/[nd]$/, "");
  if (/\([0-9]+\)/.test(num)) {
    const [_, body, repeat, trail] = num.match(/(.+)\(([0-9]+)\)(.*)$/) ?? [];
    num = body + repeat.repeat(Math.ceil(options.precision / repeat.length)) + trail;
  }
  let sign2 = "";
  if (num[0] === "-") {
    sign2 = "-";
    num = num.substring(1);
  } else if (num[0] === "+") {
    num = num.substring(1);
  }
  while (num[0] === "0")
    num = num.substring(1);
  if (num.length === 0)
    num = sign2 + "0";
  else if (num[0] === ".")
    num = sign2 + "0" + num;
  let result = void 0;
  if (options.notation === "engineering")
    result = serializeScientificNotationNumber(num, options, 3);
  else if (options.notation === "scientific")
    result = serializeScientificNotationNumber(num, options);
  return sign2 + (result ?? serializeAutoNotationNumber(num, options));
}
function serializeScientificNotationNumber(valString, options, expMultiple = 1) {
  let m = valString.match(/^(.*)[e|E]([-+]?[0-9]+)$/);
  if (!m) {
    let sign2 = "";
    if (valString[0] === "-") {
      sign2 = "-";
      valString = valString.substring(1);
    } else if (valString[0] === "+") {
      valString = valString.substring(1);
    }
    if (valString.indexOf(".") < 0) {
      if (valString.length === 1) {
        valString = sign2 + valString + "e+0";
      } else {
        valString = sign2 + valString[0] + "." + valString.slice(1) + "e+" + (valString.length - 1).toString();
      }
    } else {
      let [_, whole, fraction] = valString.match(/^(.*)\.(.*)$/);
      if (!fraction)
        fraction = "";
      while (whole.startsWith("0"))
        whole = whole.substring(1);
      if (!whole) {
        valString = sign2 + "0." + fraction + "e+0";
      } else {
        valString = sign2 + whole[0] + "." + whole.slice(1) + fraction + "e+" + (whole.length - 1).toString();
      }
    }
    m = valString.match(/^(.*)[e|E]([-+]?[0-9]+)$/);
  }
  /* @__PURE__ */ console.assert(m);
  if (!m)
    return serializeAutoNotationNumber(valString, options);
  let exponent = parseInt(m[2]);
  let mantissa = m[1];
  if (Math.abs(exponent) % expMultiple !== 0) {
    const adjust = exponent > 0 ? exponent % expMultiple : -((expMultiple + exponent) % expMultiple);
    exponent = exponent >= 0 ? exponent - adjust : exponent + adjust;
    let [_, whole, fraction] = mantissa.match(/^(.*)\.(.*)$/) ?? [
      "",
      mantissa,
      ""
    ];
    mantissa = whole + (fraction + "00000000000000000").slice(0, Math.abs(adjust)) + "." + fraction.slice(Math.abs(adjust));
  }
  const avoid = options.avoidExponentsInRange;
  if (avoid && exponent >= avoid[0] && exponent <= avoid[1])
    return void 0;
  let fractionalPart = "";
  let wholePart = mantissa;
  m = wholePart.match(/^(.*)\.(.*)$/);
  if (m) {
    wholePart = m[1];
    fractionalPart = m[2];
  }
  const expString = exponent !== 0 ? formatExponent(Number(exponent).toString(), options) : "";
  if (options.groupSeparator) {
    wholePart = wholePart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.groupSeparator
    );
    fractionalPart = formatFractionalPart(fractionalPart, options);
  }
  if (fractionalPart)
    fractionalPart = options.decimalMarker + fractionalPart;
  if (!expString)
    return wholePart + fractionalPart;
  if (wholePart === "1" && !fractionalPart)
    return expString;
  return wholePart + fractionalPart + options.exponentProduct + expString;
}
function serializeAutoNotationNumber(valString, options) {
  let m = valString.match(/^(.*)[e|E]([-+]?[0-9]+)$/i);
  let exponent = void 0;
  if (m?.[1] && m[2]) {
    exponent = formatExponent(m[2], options);
  }
  let wholePart = m?.[1] ?? valString;
  let fractionalPart = "";
  m = (exponent ? m[1] : valString).match(/^(.*)\.(.*)$/);
  if (m?.[1] && m[2]) {
    wholePart = m[1];
    fractionalPart = m[2];
  }
  if (options.groupSeparator) {
    wholePart = wholePart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.groupSeparator
    );
    fractionalPart = formatFractionalPart(fractionalPart, options);
  }
  if (fractionalPart)
    fractionalPart = options.decimalMarker + fractionalPart;
  if (!exponent)
    return wholePart + fractionalPart;
  if (wholePart === "1" && !fractionalPart)
    return exponent;
  return wholePart + fractionalPart + options.exponentProduct + exponent;
}

// src/compute-engine/latex-syntax/serializer.ts
function serializeOperator(serializer, expr, def) {
  let result = "";
  const count = nops(expr);
  const name = headName(expr);
  if (def.kind === "postfix") {
    if (count !== 1) {
      serializer.onError([
        {
          severity: "warning",
          message: [
            "postfix-operator-requires-one-operand",
            serializer.serializeSymbol(name)
          ]
        }
      ]);
    }
    return replaceLatex(def.serialize, [
      serializer.wrap(op(expr, 1), def.precedence)
    ]);
  }
  if (def.kind === "prefix") {
    if (count !== 1) {
      serializer.onError([
        {
          severity: "warning",
          message: [
            "prefix-operator-requires-one-operand",
            serializer.serializeSymbol(name)
          ]
        }
      ]);
    }
    return replaceLatex(def.serialize, [
      serializer.wrap(op(expr, 1), def.precedence + 1)
    ]);
  }
  if (def.kind === "infix") {
    result = serializer.wrap(op(expr, 1), def.precedence);
    for (let i = 2; i < count + 1; i++) {
      const arg = op(expr, i);
      if (arg !== null) {
        result = replaceLatex(def.serialize, [
          result,
          serializer.wrap(arg, def.precedence)
        ]);
      }
    }
  }
  return result;
}
var Serializer = class {
  constructor(options, dictionary2, onError) {
    this.level = -1;
    this.options = options;
    if (options.invisibleMultiply) {
      if (!/#1/.test(options.invisibleMultiply) || !/#2/.test(options.invisibleMultiply)) {
        onError([
          {
            severity: "warning",
            message: ["expected-argument", "invisibleMultiply"]
          }
        ]);
      }
    }
    this.onError = onError;
    this.dictionary = dictionary2;
  }
  updateOptions(opt) {
    for (const k of Object.keys(this.options))
      if (k in opt)
        this.options[k] = opt[k];
  }
  /**
   * Serialize the expression, and if the expression is an operator
   * of precedence less than or equal to prec, wrap it in some paren.
   * @todo: don't wrap Abs, Floor, Ceil, Delimiter
   */
  wrap(expr, prec) {
    if (expr === null)
      return "";
    if (prec === void 0) {
      return this.wrapString(
        this.serialize(expr),
        this.options.groupStyle(expr, this.level + 1)
      );
    }
    if (typeof expr === "number" || isNumberObject(expr) || typeof expr === "string" || isSymbolObject(expr)) {
      return this.serialize(expr);
    }
    const name = head(expr);
    if (typeof name === "string" && name !== "Delimiter" && name !== "Subscript") {
      const def = this.dictionary.name.get(name);
      if (def && (def.kind === "symbol" || def.kind === "prefix" || def.kind === "infix" || def.kind === "postfix") && def.precedence < prec)
        return this.wrapString(
          this.serialize(expr),
          this.options.applyFunctionStyle(expr, this.level)
        );
    }
    return this.serialize(expr);
  }
  /** If this is a "short" expression (atomic), wrap it.
   *
   */
  wrapShort(expr) {
    if (expr === null)
      return "";
    const exprStr = this.serialize(expr);
    if (head(expr) === "Delimiter" && nops(expr) === 1)
      return exprStr;
    if (!isNumberExpression(expr) && !/(^(.|\\[a-zA-Z*]+))$/.test(exprStr)) {
      return this.wrapString(
        exprStr,
        this.options.groupStyle(expr, this.level + 1)
      );
    }
    return exprStr;
  }
  wrapString(s, style, fence) {
    if (style === "none")
      return s;
    const openFence = fence?.[0] ?? "(";
    const closeFence = fence?.[1] ?? ")";
    if ((openFence === "." || closeFence === ".") && style === "paren")
      style = "leftright";
    if (style === "leftright")
      return `${openFence === "." ? "" : `\\left(${openFence}`}${s}${closeFence === "." ? "" : `\\right(${closeFence}`})`;
    if (style === "big")
      return `${openFence === "." ? "" : `\\Bigl(${openFence}`}${s}${closeFence === "." ? "" : `\\Bigr(${closeFence}`})`;
    return openFence + s + closeFence;
  }
  wrapArguments(expr) {
    return this.wrapString(
      (ops(expr) ?? []).map((x) => this.serialize(x)).join(", "),
      this.options.applyFunctionStyle(expr, this.level)
    );
  }
  serializeSymbol(expr, def) {
    const h = head(expr);
    if (h)
      return this.serializeFunction(expr, def);
    /* @__PURE__ */ console.assert(typeof expr === "string" || isSymbolObject(expr));
    if (typeof def?.serialize === "string")
      return def.serialize;
    else if (typeof def?.serialize === "function")
      return def.serialize(this, expr);
    return sanitizeName(symbol(expr), "upright.") ?? "";
  }
  serializeFunction(expr, def) {
    const h = head(expr);
    if (!h)
      return this.serializeSymbol(expr, def);
    const args = ops(expr) ?? [];
    if (def) {
      if (typeof def.serialize === "function")
        return def.serialize(this, expr);
      return joinLatex([
        def.serialize ?? h,
        this.wrapArguments(expr)
      ]);
    }
    if (typeof h === "string" && h.length > 0 && h[0] === "\\") {
      return joinLatex([h, ...args.map((x) => `{${this.serialize(x)}}`)]);
    }
    if (typeof h === "string")
      return sanitizeName(h, "upright.") + this.wrapArguments(expr);
    const style = this.options.applyFunctionStyle(expr, this.level);
    return "\\mathrm{Apply}" + this.wrapString(
      this.serialize(h) + ", " + this.serialize(["List", ...args]),
      style
    );
  }
  serializeDictionary(dict) {
    return `\\left\\lbrack\\begin{array}{lll}${Object.keys(dict).map((x) => {
      return `\\textbf{${x}} & \\rightarrow & ${this.serialize(dict[x])}`;
    }).join("\\\\")}\\end{array}\\right\\rbrack`;
  }
  serialize(expr) {
    if (expr === null || expr === void 0)
      return "";
    this.level += 1;
    try {
      const result = (() => {
        const numericValue = serializeNumber(expr, this.options);
        if (numericValue)
          return numericValue;
        const s = stringValue(expr);
        if (s !== null)
          return `\\text{${s}}`;
        const symbolName = symbol(expr);
        if (symbolName !== null) {
          const def = this.dictionary.name.get(symbolName);
          if (def?.kind === "symbol")
            return this.serializeSymbol(expr, def);
          if (def?.kind === "function")
            return this.serializeFunction(expr, def);
        }
        const dict = dictionary(expr);
        if (dict !== null)
          return this.serializeDictionary(dict);
        const fnName = headName(expr);
        if (fnName) {
          if (fnName[0] === "\\") {
            const args = ops(expr) ?? [];
            if (args.length === 0)
              return fnName;
            return fnName + "{" + args.map((x) => this.serialize(x)).filter((x) => Boolean(x)).join("}{") + "}";
          }
          const def = this.dictionary.name.get(fnName);
          if (def) {
            if (typeof def.serialize === "function")
              return def.serialize(this, expr);
            if (def.kind === "infix" || def.kind === "postfix" || def.kind === "prefix")
              return serializeOperator(this, expr, def);
            if (def.kind === "symbol")
              return this.serializeSymbol(expr, def);
            if (def.kind === "function")
              return this.serializeFunction(expr, def);
            return "";
          }
        }
        if (Array.isArray(expr) || isFunctionObject(expr) || symbol(expr) !== null) {
          return this.serializeSymbol(expr);
        }
        this.onError([
          {
            severity: "warning",
            message: [
              "syntax-error",
              expr ? JSON.stringify(expr) : "undefined"
            ]
          }
        ]);
      })();
      this.level -= 1;
      return result ?? "";
    } catch (e) {
    }
    this.level -= 1;
    return "";
  }
  applyFunctionStyle(expr, level) {
    return this.options.applyFunctionStyle(expr, level);
  }
  groupStyle(expr, level) {
    return this.options.groupStyle(expr, level);
  }
  rootStyle(expr, level) {
    return this.options.rootStyle(expr, level);
  }
  fractionStyle(expr, level) {
    return this.options.fractionStyle(expr, level);
  }
  logicStyle(expr, level) {
    return this.options.logicStyle(expr, level);
  }
  powerStyle(expr, level) {
    return this.options.powerStyle(expr, level);
  }
  numericSetStyle(expr, level) {
    return this.options.numericSetStyle(expr, level);
  }
};
function replaceLatex(template, replacement) {
  /* @__PURE__ */ console.assert(typeof template === "string");
  /* @__PURE__ */ console.assert(template.length > 0);
  let result = template;
  for (let i = 0; i < replacement.length; i++) {
    let s = replacement[i] ?? "";
    if (/[a-zA-Z*]/.test(s[0])) {
      const m = result.match(new RegExp("(.*)#" + Number(i + 1).toString()));
      if (m && /\\[a-zA-Z*]+/.test(m[1])) {
        s = " " + s;
      }
    }
    result = result.replace("#" + Number(i + 1).toString(), s);
  }
  return result;
}
function sanitizeName(s, defaultMulticharStyle = "italic.") {
  if (s === null)
    return null;
  const m = s.match(/^(_+)(.*)/);
  if (m) {
    return `\\text{${"\\_".repeat(m[1].length) + sanitizeNameFragment(m[2])}}`;
  }
  let modifier;
  [modifier, s] = extractSymbolStyleModifier(s);
  const name = sanitizeNameFragment(s);
  if (name.length === 1 && !modifier)
    return name;
  if (!modifier)
    modifier = defaultMulticharStyle;
  const SYMBOL_MODIFIER_PATTERN = {
    "upright.": "\\mathrm{_}",
    "italic.": "\\mathit{_}",
    "bold.": "\\mathbf{_}",
    "bold-italic.": "\\mathbf{\\mathit{_}}",
    "script.": "\\mathscr{_}",
    "calligraphic.": "\\mathcal{_}",
    "bold-script.": "\\mathbf{\\mathscr{_}}",
    "bold-calligraphic.": "\\mathbf{\\mathcal{_}}",
    "fraktur.": "\\mathfrak{_}",
    "gothic.": "\\mathfrak{_}",
    "bold-gothic.": "\\mathbf{\\mathfrak{_}}",
    "bold-fraktur.": "\\mathbf{\\mathfrak{_}}",
    "sans-serif.": "\\mathsf{_}",
    "bold-sans-serif.": "\\mathbf{\\mathsf{_}}",
    "italic-sans-serif.": "\\mathit{\\mathsf{_}}",
    "monospace.": "\\mathtt{_}",
    "blackboard.": "\\mathbb{_}",
    "double-struck.": "\\mathbb{_}"
  };
  return (SYMBOL_MODIFIER_PATTERN[modifier] ?? "\\mathrm{_}").replace(
    "_",
    name
  );
}
function extractSymbolStyleModifier(s) {
  const m = s.match(/^([a-zA-Z-]+\.)(.*)/);
  if (m)
    return [m[1], m[2]];
  return ["", s];
}
function sanitizeNameFragment(s) {
  const index = s.indexOf("_");
  if (index > 0) {
    const prefix = s.substring(0, index);
    const suffix = s.substring(index + 1);
    if (!suffix)
      return `${sanitizeName(prefix)}\\_`;
    if (suffix.startsWith('"') && suffix.endsWith('"')) {
      return `${sanitizeNameFragment(prefix)}_\\mathrm{${sanitizeNameFragment(
        suffix.substring(1, -1)
      )}}`;
    }
    return `${sanitizeNameFragment(prefix)}_{${sanitizeNameFragment(suffix)}}`;
  }
  const m = s.match(/(.*?)(-?[0-9]+)$/);
  if (m) {
    if (m[1].length === 0)
      return s;
    return `${sanitizeNameFragment(m[1])}_{${m[2]}}`;
  }
  if (COMMON_IDENTIFIER_NAME.includes(s))
    return "\\" + s;
  s = s.replace(
    /[{}\[\]\\:\-\$%]/g,
    (c) => ({
      "{": "\\lbrace ",
      "}": "\\rbrace ",
      "[": "\\lbrack ",
      "]": "\\rbrack ",
      ":": "\\colon ",
      "\\": "\\backslash ",
      "-": '\\unicode{"2013}'
    })[c] ?? "\\" + c
  );
  return s;
}

// src/compute-engine/latex-syntax/latex-syntax.ts
var DEFAULT_SERIALIZE_LATEX_OPTIONS = {
  invisibleMultiply: "",
  // '\\cdot',
  invisiblePlus: "",
  // '+',
  // invisibleApply: '',
  multiply: "\\times",
  missingSymbol: "\\blacksquare",
  // openGroup: '(',
  // closeGroup: ')',
  // divide: '\\frac{#1}{#2}',
  // subtract: '#1-#2',
  // add: '#1+#2',
  // negate: '-#1',
  // squareRoot: '\\sqrt{#1}',
  // nthRoot: '\\sqrt[#2]{#1}',
  applyFunctionStyle: getApplyFunctionStyle,
  groupStyle: getGroupStyle,
  rootStyle: getRootStyle,
  fractionStyle: getFractionStyle,
  logicStyle: getLogicStyle,
  powerStyle: getPowerStyle,
  numericSetStyle: getNumericSetStyle
};
var LatexSyntax = class _LatexSyntax {
  constructor(options) {
    const onError = (warnings) => {
      if (typeof window !== "undefined") {
        for (const warning of warnings)
          console.warn(warning.message);
      }
      return;
    };
    this.onError = options.onError ?? onError;
    this.computeEngine = options.computeEngine;
    const opts = { ...options };
    delete opts.dictionary;
    delete opts.onError;
    this.options = {
      ...DEFAULT_LATEX_NUMBER_OPTIONS,
      ...DEFAULT_PARSE_LATEX_OPTIONS,
      ...DEFAULT_SERIALIZE_LATEX_OPTIONS,
      ...opts
    };
    this.dictionary = indexLatexDictionary(
      options.dictionary ?? _LatexSyntax.getDictionary(),
      (sig) => this.onError([sig])
    );
  }
  updateOptions(opt) {
    for (const k of Object.keys(this.options))
      if (k in opt)
        this.options[k] = opt[k];
    this.serializer.updateOptions(opt);
  }
  static getDictionary(category = "all") {
    if (category === "all") {
      const result = [];
      for (const domain of Object.keys(DEFAULT_LATEX_DICTIONARY))
        if (DEFAULT_LATEX_DICTIONARY[domain])
          result.push(...DEFAULT_LATEX_DICTIONARY[domain]);
      return result;
    }
    if (!DEFAULT_LATEX_DICTIONARY[category])
      return [];
    return [...DEFAULT_LATEX_DICTIONARY[category]];
  }
  parse(latex) {
    const parser = new _Parser(
      tokenize(latex, []),
      this.options,
      this.dictionary,
      this.computeEngine
    );
    let expr = parser.matchExpression();
    if (!parser.atEnd) {
      const opDefs = parser.peekDefinitions("infix");
      if (opDefs) {
        const start = parser.index;
        const [def, n] = opDefs[0];
        parser.index += n;
        const result = def.parse(
          parser,
          { minPrec: 0 },
          expr ?? parser.error("missing", start)
        );
        if (result)
          return result;
        if (def.name) {
          return [
            def.name,
            expr ?? parser.error("missing", start),
            parser.error("missing", start)
          ];
        }
        parser.index = start;
      }
      const index = parser.index;
      const closeDelimiter = parser.matchEnclosureOpen();
      if (closeDelimiter) {
        const enclosureError = parser.error(
          ["expected-close-delimiter", closeDelimiter],
          index
        );
        return expr ? ["Sequence", expr, enclosureError] : enclosureError;
      }
      const openDelimiter = parser.matchEnclosureClose();
      if (openDelimiter) {
        const enclosureError = parser.error(
          ["expected-open-delimiter", openDelimiter],
          index
        );
        return expr ? ["Sequence", expr, enclosureError] : enclosureError;
      }
      const rest = parser.index;
      const token = parser.next();
      while (!parser.atEnd)
        parser.next();
      const error = parser.error(
        [
          token.length > 1 && token.startsWith("\\") ? "unexpected-command" : "unexpected-token",
          { str: tokensToString([token]) }
        ],
        rest
      );
      expr = expr ? ["Sequence", expr, error] : error;
    }
    expr ?? (expr = ["Sequence"]);
    if (this.options.preserveLatex) {
      if (Array.isArray(expr))
        expr = { latex, fn: expr };
      else if (typeof expr === "number")
        expr = { latex, num: Number(expr).toString() };
      else if (typeof expr === "string")
        expr = { latex, sym: expr };
      else if (typeof expr === "object" && expr !== null)
        expr.latex = latex;
    }
    return expr ?? ["Sequence"];
  }
  serialize(expr) {
    return this.serializer.serialize(expr);
  }
  get serializer() {
    if (this._serializer)
      return this._serializer;
    this._serializer = new Serializer(
      this.options,
      this.dictionary,
      this.onError
    );
    return this._serializer;
  }
};

// src/compute-engine/boxed-expression/utils.ts
var import_complex2 = __toESM(require_complex());

// src/compute-engine/numerics/numeric.ts
var import_complex = __toESM(require_complex());
var MACHINE_PRECISION_BITS = 53;
var MACHINE_PRECISION = Math.log10(
  Math.pow(2, MACHINE_PRECISION_BITS)
);
var MACHINE_TOLERANCE_BITS = 7;
var MACHINE_TOLERANCE = Math.pow(
  2,
  -(MACHINE_PRECISION_BITS - MACHINE_TOLERANCE_BITS)
);
var NUMERIC_TOLERANCE = Math.pow(10, -10);
var SMALL_INTEGER = 1e6;
var MAX_ITERATION = 1e6;
var MAX_SYMBOLIC_TERMS = 200;
var SMALL_PRIMES = /* @__PURE__ */ new Set([
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113,
  127,
  131,
  137,
  139,
  149,
  151,
  157,
  163,
  167,
  173,
  179,
  181,
  191,
  193,
  197,
  199,
  211,
  223,
  227,
  229,
  233,
  239,
  241,
  251,
  257,
  263,
  269,
  271,
  277,
  281,
  283,
  293,
  307,
  311,
  313,
  317,
  331,
  337,
  347,
  349,
  353,
  359,
  367,
  373,
  379,
  383,
  389,
  397,
  401,
  409,
  419,
  421,
  431,
  433,
  439,
  443,
  449,
  457,
  461,
  463,
  467,
  479,
  487,
  491,
  499,
  503,
  509,
  521,
  523,
  541,
  547,
  557,
  563,
  569,
  571,
  577,
  587,
  593,
  599,
  601,
  607,
  613,
  617,
  619,
  631,
  641,
  643,
  647,
  653,
  659,
  661,
  673,
  677,
  683,
  691,
  701,
  709,
  719,
  727,
  733,
  739,
  743,
  751,
  757,
  761,
  769,
  773,
  787,
  797,
  809,
  811,
  821,
  823,
  827,
  829,
  839,
  853,
  857,
  859,
  863,
  877,
  881,
  883,
  887,
  907,
  911,
  919,
  929,
  937,
  941,
  947,
  953,
  967,
  971,
  977,
  983,
  991,
  997,
  1009,
  1013,
  1019,
  1021,
  1031,
  1033,
  1039,
  1049,
  1051,
  1061,
  1063,
  1069,
  1087,
  1091,
  1093,
  1097,
  1103,
  1109,
  1117,
  1123,
  1129,
  1151,
  1153,
  1163,
  1171,
  1181,
  1187,
  1193,
  1201,
  1213,
  1217,
  1223,
  1229,
  1231,
  1237,
  1249,
  1259,
  1277,
  1279,
  1283,
  1289,
  1291,
  1297,
  1301,
  1303,
  1307,
  1319,
  1321,
  1327,
  1361,
  1367,
  1373,
  1381,
  1399,
  1409,
  1423,
  1427,
  1429,
  1433,
  1439,
  1447,
  1451,
  1453,
  1459,
  1471,
  1481,
  1483,
  1487,
  1489,
  1493,
  1499,
  1511,
  1523,
  1531,
  1543,
  1549,
  1553,
  1559,
  1567,
  1571,
  1579,
  1583,
  1597,
  1601,
  1607,
  1609,
  1613,
  1619,
  1621,
  1627,
  1637,
  1657,
  1663,
  1667,
  1669,
  1693,
  1697,
  1699,
  1709,
  1721,
  1723,
  1733,
  1741,
  1747,
  1753,
  1759,
  1777,
  1783,
  1787,
  1789,
  1801,
  1811,
  1823,
  1831,
  1847,
  1861,
  1867,
  1871,
  1873,
  1877,
  1879,
  1889,
  1901,
  1907,
  1913,
  1931,
  1933,
  1949,
  1951,
  1973,
  1979,
  1987,
  1993,
  1997,
  1999,
  2003,
  2011,
  2017,
  2027,
  2029,
  2039,
  2053,
  2063,
  2069,
  2081,
  2083,
  2087,
  2089,
  2099,
  2111,
  2113,
  2129,
  2131,
  2137,
  2141,
  2143,
  2153,
  2161,
  2179,
  2203,
  2207,
  2213,
  2221,
  2237,
  2239,
  2243,
  2251,
  2267,
  2269,
  2273,
  2281,
  2287,
  2293,
  2297,
  2309,
  2311,
  2333,
  2339,
  2341,
  2347,
  2351,
  2357,
  2371,
  2377,
  2381,
  2383,
  2389,
  2393,
  2399,
  2411,
  2417,
  2423,
  2437,
  2441,
  2447,
  2459,
  2467,
  2473,
  2477,
  2503,
  2521,
  2531,
  2539,
  2543,
  2549,
  2551,
  2557,
  2579,
  2591,
  2593,
  2609,
  2617,
  2621,
  2633,
  2647,
  2657,
  2659,
  2663,
  2671,
  2677,
  2683,
  2687,
  2689,
  2693,
  2699,
  2707,
  2711,
  2713,
  2719,
  2729,
  2731,
  2741,
  2749,
  2753,
  2767,
  2777,
  2789,
  2791,
  2797,
  2801,
  2803,
  2819,
  2833,
  2837,
  2843,
  2851,
  2857,
  2861,
  2879,
  2887,
  2897,
  2903,
  2909,
  2917,
  2927,
  2939,
  2953,
  2957,
  2963,
  2969,
  2971,
  2999,
  3001,
  3011,
  3019,
  3023,
  3037,
  3041,
  3049,
  3061,
  3067,
  3079,
  3083,
  3089,
  3109,
  3119,
  3121,
  3137,
  3163,
  3167,
  3169,
  3181,
  3187,
  3191,
  3203,
  3209,
  3217,
  3221,
  3229,
  3251,
  3253,
  3257,
  3259,
  3271,
  3299,
  3301,
  3307,
  3313,
  3319,
  3323,
  3329,
  3331,
  3343,
  3347,
  3359,
  3361,
  3371,
  3373,
  3389,
  3391,
  3407,
  3413,
  3433,
  3449,
  3457,
  3461,
  3463,
  3467,
  3469,
  3491,
  3499,
  3511,
  3517,
  3527,
  3529,
  3533,
  3539,
  3541,
  3547,
  3557,
  3559,
  3571,
  3581,
  3583,
  3593,
  3607,
  3613,
  3617,
  3623,
  3631,
  3637,
  3643,
  3659,
  3671,
  3673,
  3677,
  3691,
  3697,
  3701,
  3709,
  3719,
  3727,
  3733,
  3739,
  3761,
  3767,
  3769,
  3779,
  3793,
  3797,
  3803,
  3821,
  3823,
  3833,
  3847,
  3851,
  3853,
  3863,
  3877,
  3881,
  3889,
  3907,
  3911,
  3917,
  3919,
  3923,
  3929,
  3931,
  3943,
  3947,
  3967,
  3989,
  4001,
  4003,
  4007,
  4013,
  4019,
  4021,
  4027,
  4049,
  4051,
  4057,
  4073,
  4079,
  4091,
  4093,
  4099,
  4111,
  4127,
  4129,
  4133,
  4139,
  4153,
  4157,
  4159,
  4177,
  4201,
  4211,
  4217,
  4219,
  4229,
  4231,
  4241,
  4243,
  4253,
  4259,
  4261,
  4271,
  4273,
  4283,
  4289,
  4297,
  4327,
  4337,
  4339,
  4349,
  4357,
  4363,
  4373,
  4391,
  4397,
  4409,
  4421,
  4423,
  4441,
  4447,
  4451,
  4457,
  4463,
  4481,
  4483,
  4493,
  4507,
  4513,
  4517,
  4519,
  4523,
  4547,
  4549,
  4561,
  4567,
  4583,
  4591,
  4597,
  4603,
  4621,
  4637,
  4639,
  4643,
  4649,
  4651,
  4657,
  4663,
  4673,
  4679,
  4691,
  4703,
  4721,
  4723,
  4729,
  4733,
  4751,
  4759,
  4783,
  4787,
  4789,
  4793,
  4799,
  4801,
  4813,
  4817,
  4831,
  4861,
  4871,
  4877,
  4889,
  4903,
  4909,
  4919,
  4931,
  4933,
  4937,
  4943,
  4951,
  4957,
  4967,
  4969,
  4973,
  4987,
  4993,
  4999,
  5003,
  5009,
  5011,
  5021,
  5023,
  5039,
  5051,
  5059,
  5077,
  5081,
  5087,
  5099,
  5101,
  5107,
  5113,
  5119,
  5147,
  5153,
  5167,
  5171,
  5179,
  5189,
  5197,
  5209,
  5227,
  5231,
  5233,
  5237,
  5261,
  5273,
  5279,
  5281,
  5297,
  5303,
  5309,
  5323,
  5333,
  5347,
  5351,
  5381,
  5387,
  5393,
  5399,
  5407,
  5413,
  5417,
  5419,
  5431,
  5437,
  5441,
  5443,
  5449,
  5471,
  5477,
  5479,
  5483,
  5501,
  5503,
  5507,
  5519,
  5521,
  5527,
  5531,
  5557,
  5563,
  5569,
  5573,
  5581,
  5591,
  5623,
  5639,
  5641,
  5647,
  5651,
  5653,
  5657,
  5659,
  5669,
  5683,
  5689,
  5693,
  5701,
  5711,
  5717,
  5737,
  5741,
  5743,
  5749,
  5779,
  5783,
  5791,
  5801,
  5807,
  5813,
  5821,
  5827,
  5839,
  5843,
  5849,
  5851,
  5857,
  5861,
  5867,
  5869,
  5879,
  5881,
  5897,
  5903,
  5923,
  5927,
  5939,
  5953,
  5981,
  5987,
  6007,
  6011,
  6029,
  6037,
  6043,
  6047,
  6053,
  6067,
  6073,
  6079,
  6089,
  6091,
  6101,
  6113,
  6121,
  6131,
  6133,
  6143,
  6151,
  6163,
  6173,
  6197,
  6199,
  6203,
  6211,
  6217,
  6221,
  6229,
  6247,
  6257,
  6263,
  6269,
  6271,
  6277,
  6287,
  6299,
  6301,
  6311,
  6317,
  6323,
  6329,
  6337,
  6343,
  6353,
  6359,
  6361,
  6367,
  6373,
  6379,
  6389,
  6397,
  6421,
  6427,
  6449,
  6451,
  6469,
  6473,
  6481,
  6491,
  6521,
  6529,
  6547,
  6551,
  6553,
  6563,
  6569,
  6571,
  6577,
  6581,
  6599,
  6607,
  6619,
  6637,
  6653,
  6659,
  6661,
  6673,
  6679,
  6689,
  6691,
  6701,
  6703,
  6709,
  6719,
  6733,
  6737,
  6761,
  6763,
  6779,
  6781,
  6791,
  6793,
  6803,
  6823,
  6827,
  6829,
  6833,
  6841,
  6857,
  6863,
  6869,
  6871,
  6883,
  6899,
  6907,
  6911,
  6917,
  6947,
  6949,
  6959,
  6961,
  6967,
  6971,
  6977,
  6983,
  6991,
  6997,
  7001,
  7013,
  7019,
  7027,
  7039,
  7043,
  7057,
  7069,
  7079,
  7103,
  7109,
  7121,
  7127,
  7129,
  7151,
  7159,
  7177,
  7187,
  7193,
  7207,
  7211,
  7213,
  7219,
  7229,
  7237,
  7243,
  7247,
  7253,
  7283,
  7297,
  7307,
  7309,
  7321,
  7331,
  7333,
  7349,
  7351,
  7369,
  7393,
  7411,
  7417,
  7433,
  7451,
  7457,
  7459,
  7477,
  7481,
  7487,
  7489,
  7499,
  7507,
  7517,
  7523,
  7529,
  7537,
  7541,
  7547,
  7549,
  7559,
  7561,
  7573,
  7577,
  7583,
  7589,
  7591,
  7603,
  7607,
  7621,
  7639,
  7643,
  7649,
  7669,
  7673,
  7681,
  7687,
  7691,
  7699,
  7703,
  7717,
  7723,
  7727,
  7741,
  7753,
  7757,
  7759,
  7789,
  7793,
  7817,
  7823,
  7829,
  7841,
  7853,
  7867,
  7873,
  7877,
  7879,
  7883,
  7901,
  7907,
  7919
]);
var LARGEST_SMALL_PRIME = 7919;
function primeFactors(n) {
  /* @__PURE__ */ console.assert(
    Number.isInteger(n) && n >= 0 && n < Number.MAX_SAFE_INTEGER,
    n
  );
  if (n <= 3)
    return { [n]: 1 };
  const result = {};
  let count = 0;
  while (n % 2 === 0) {
    count += 1;
    n /= 2;
  }
  if (count > 0)
    result[2] = count;
  count = 0;
  while (n % 3 === 0) {
    count += 1;
    n /= 3;
  }
  if (count > 0)
    result[3] = count;
  let done = false;
  while (!done) {
    if (n === 1)
      return result;
    const sr = Math.sqrt(n);
    done = true;
    for (let i = 6; i <= sr + 6; i += 6) {
      if (n % (i - 1) === 0) {
        result[i - 1] = (result[i - 1] ?? 0) + 1;
        n /= i - 1;
        done = false;
        break;
      }
      if (n % (i + 1) === 0) {
        result[i + 1] = (result[i + 1] ?? 0) + 1;
        n /= i + 1;
        done = false;
        break;
      }
    }
  }
  if (result[n] !== void 0)
    result[n] += 1;
  else
    result[n] = 1;
  return result;
}
function factorPower(n, exponent) {
  if (n >= Number.MAX_SAFE_INTEGER)
    return [1, n];
  /* @__PURE__ */ console.assert(Number.isInteger(n) && n > 0 && n < Number.MAX_SAFE_INTEGER);
  const factors = primeFactors(n);
  let f = 1;
  let r = 1;
  for (const k of Object.keys(factors)) {
    const v = parseInt(k);
    f = f * Math.pow(v, Math.floor(factors[k] / exponent));
    r = r * Math.pow(v, factors[k] % exponent);
  }
  return [f, r];
}
function gcd(a, b) {
  if (a === 0)
    return b;
  if (b === 0)
    return a;
  if (a === b)
    return a;
  if (!Number.isInteger(a) || !Number.isInteger(b))
    return NaN;
  while (b !== 0)
    [a, b] = [b, a % b];
  return a < 0 ? -a : a;
}
function factorial(n) {
  if (!Number.isInteger(n) || n < 0)
    return NaN;
  let val = 1;
  for (let i = 2; i <= n; i++)
    val = val * i;
  return val;
}
var gammaG = 7;
var lanczos_7_c = [
  0.9999999999998099,
  676.5203681218851,
  -1259.1392167224028,
  771.3234287776531,
  -176.6150291621406,
  12.507343278686905,
  -0.13857109526572012,
  9984369578019572e-21,
  15056327351493116e-23
];
var gammaGLn = 607 / 128;
var gammaPLn = [
  0.999999999999997,
  57.15623566586292,
  -59.59796035547549,
  14.13609797474174,
  -0.4919138160976202,
  3399464998481188e-20,
  4652362892704857e-20,
  -9837447530487956e-20,
  1580887032249125e-19,
  -21026444172410488e-20,
  2174396181152126e-19,
  -1643181065367639e-19,
  8441822398385274e-20,
  -261908384015814e-19,
  3689918265953162e-21
];
function lngamma(z) {
  if (z < 0)
    return NaN;
  let x = gammaPLn[0];
  for (let i = gammaPLn.length - 1; i > 0; --i)
    x += gammaPLn[i] / (z + i);
  const t = z + gammaGLn + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x) - Math.log(z);
}
function gamma(z) {
  if (z < 0.5)
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  if (z > 100)
    return Math.exp(lngamma(z));
  z -= 1;
  let x = lanczos_7_c[0];
  for (let i = 1; i < gammaG + 2; i++)
    x += lanczos_7_c[i] / (z + i);
  const t = z + gammaG + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}
function fromDigits(s, base = 10) {
  let value = 0;
  for (let i = 0; i < s.length; i++) {
    const k = {
      " ": -1,
      "\xA0": -1,
      // NBS
      "\u2000": -1,
      // EN QUAD
      "\u2001": -1,
      // EM QUAD
      "\u2002": -1,
      // EN SPACE
      "\u2003": -1,
      // EM SPACE
      "\u2004": -1,
      // THREE-PER-EM SPACE
      "\u2005": -1,
      // FOUR-PER-EM SPACE
      "\u2006": -1,
      // SIX-PER-EM SPACE
      "\u2007": -1,
      // FIGURE SPACE
      "\u2008": -1,
      // PUNCTUATION SPACE
      "\u2009": -1,
      // THIN SPACE
      "\u200A": -1,
      // HAIR SPACE
      "\u200B": -1,
      // ZWS
      "\u202F": -1,
      // NARROW NBS
      "\u205F": -1,
      // MEDIUM MATHEMATICAL SPACE
      "_": -1,
      ",": -1,
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "a": 10,
      "b": 11,
      "c": 12,
      "d": 13,
      "e": 14,
      "f": 15,
      "g": 16,
      "h": 17,
      "i": 18,
      "j": 19,
      "k": 20,
      "l": 21,
      "m": 22,
      "n": 23,
      "o": 24,
      "p": 25,
      "q": 26,
      "r": 27,
      "s": 28,
      "t": 29,
      "u": 30,
      "v": 31,
      "w": 32,
      "x": 33,
      "y": 34,
      "z": 35
    }[s[i]];
    if (k !== -1) {
      if (k === void 0)
        return [value, s.substring(i)];
      if (k >= base)
        return [value, s.substring(i)];
      value = value * base + k;
    }
  }
  return [value, ""];
}
function asFloat(expr) {
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (typeof num === "number")
    return num;
  if (num instanceof decimal_default)
    return num.toNumber();
  if (Array.isArray(num)) {
    const [n, d] = num;
    if (typeof n === "number" && typeof d === "number")
      return n / d;
    return Number(n) / Number(d);
  }
  /* @__PURE__ */ console.assert(!(num instanceof import_complex.default) || num.im !== 0);
  return null;
}
function asBignum(expr) {
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (num instanceof decimal_default)
    return num;
  if (typeof num === "number")
    return expr.engine.bignum(num);
  if (Array.isArray(num)) {
    const [n, d] = num;
    if (typeof n === "number" && typeof d === "number")
      return expr.engine.bignum(n / d);
    return expr.engine.bignum(n).div(d.toString());
  }
  /* @__PURE__ */ console.assert(!(num instanceof import_complex.default) || num.im !== 0);
  return null;
}
function asSmallInteger(expr) {
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (typeof num === "number") {
    if (Number.isInteger(num) && num >= -SMALL_INTEGER && num <= SMALL_INTEGER)
      return num;
    return null;
  }
  if (num instanceof decimal_default) {
    if (num.isInteger()) {
      const n = num.toNumber();
      if (n >= -SMALL_INTEGER && n <= SMALL_INTEGER)
        return n;
    }
    return null;
  }
  if (expr.isCanonical)
    return null;
  const r = num;
  if (Array.isArray(r)) {
    const [n, d] = r;
    let v;
    if (typeof n === "number" && typeof d === "number")
      v = n / d;
    else
      v = Number(n) / Number(d);
    if (Number.isInteger(v) && v >= -SMALL_INTEGER && v <= SMALL_INTEGER)
      return v;
    return null;
  }
  return null;
}
function chop(n, tolerance) {
  if (typeof n === "number" && Math.abs(n) <= tolerance)
    return 0;
  if (n instanceof decimal_default && n.abs().lte(tolerance))
    return 0;
  if (n instanceof import_complex.default && Math.abs(n.re) <= tolerance && Math.abs(n.im) <= tolerance)
    return 0;
  return n;
}

// src/compute-engine/numerics/numeric-bigint.ts
function bigint(a) {
  if (typeof a === "bigint")
    return a;
  if (a instanceof decimal_default)
    return bigint(a.toString());
  let s = a.toString();
  const m = s.match(/([^\.]+)(?:\.([0-9]+))?e(.+)$/);
  if (m) {
    s = m[1] + (m[2] ?? "") + "0".repeat(parseInt(m[3]) - (m[2] ? m[2].length : 0));
  }
  return BigInt(s);
}
function gcd2(a, b) {
  while (b !== BigInt(0))
    [a, b] = [b, a % b];
  return a < 0 ? -a : a;
}
var PRIME_WHEEL_INC = [
  BigInt(4),
  BigInt(2),
  BigInt(4),
  BigInt(2),
  BigInt(4),
  BigInt(6),
  BigInt(2),
  BigInt(6)
];
function primeFactors2(d) {
  if (d < Number.MAX_SAFE_INTEGER) {
    const factors = primeFactors(Number(d));
    const result2 = /* @__PURE__ */ new Map();
    for (const f of Object.keys(factors))
      result2.set(bigint(f), factors[f]);
    return result2;
  }
  let n = d;
  const result = /* @__PURE__ */ new Map();
  let count2 = 0;
  let count3 = 0;
  let count5 = 0;
  let k = BigInt(10);
  while (n % k === BigInt(0)) {
    count2 += 1;
    count5 += 1;
    n = n / k;
  }
  k = BigInt(5);
  while (n % k === BigInt(0)) {
    count5 += 1;
    n = n / k;
  }
  k = BigInt(3);
  while (n % k === BigInt(0)) {
    count3 += 1;
    n = n / k;
  }
  k = BigInt(2);
  while (n % k === BigInt(0)) {
    count2 += 1;
    n = n / k;
  }
  if (count2 > 0)
    result.set("2", count2);
  if (count3 > 0)
    result.set("3", count3);
  if (count5 > 0)
    result.set("5", count5);
  k = BigInt(7);
  let kIndex = "";
  let i = 0;
  while (k * k < n) {
    if (n % k === BigInt(0)) {
      if (!kIndex)
        kIndex = k.toString();
      result.set(kIndex, (result.get(kIndex) ?? 0) + 1);
      n = n / k;
    } else {
      k = k + PRIME_WHEEL_INC[i];
      kIndex = "";
      i = i < 7 ? i + 1 : 0;
    }
  }
  if (n !== BigInt(1))
    result.set(n.toString(), (result.get(n.toString()) ?? 0) + 1);
  const r = /* @__PURE__ */ new Map();
  for (const [k2, v] of result)
    r.set(bigint(k2), v);
  return r;
}
function factorPower2(n, exponent) {
  const factors = primeFactors2(n);
  let f = BigInt(1);
  let r = BigInt(1);
  const exp2 = bigint(exponent);
  for (const [k, v] of factors) {
    const v2 = bigint(v);
    f = f * k ** (v2 / exp2);
    r = r * k ** (v2 % exp2);
  }
  return [f, r];
}

// src/compute-engine/boxed-expression/utils.ts
function isLatexString(s) {
  if (typeof s === "string")
    return s.startsWith("$") && s.endsWith("$");
  return false;
}
function latexString(s) {
  if (typeof s === "string" && s.startsWith("$") && s.endsWith("$"))
    return s.slice(1, -1);
  return null;
}
function getImaginaryCoef(expr) {
  if (expr.symbol === "ImaginaryUnit")
    return 1;
  const z = expr.numericValue;
  if (z !== null && z instanceof import_complex2.default && z.re === 0)
    return z.im;
  if (expr.head === "Negate") {
    const v = getImaginaryCoef(expr.op1);
    if (v === null)
      return null;
    return -v;
  }
  if (expr.head === "Multiply" && expr.nops === 2) {
    if (expr.op1.symbol === "ImaginaryUnit")
      return asFloat(expr.op2);
    if (expr.op2.symbol === "ImaginaryUnit")
      return asFloat(expr.op1);
  }
  return 0;
}
function getFreeVars(expr, set) {
  if (expr.symbol) {
    const def = expr.engine.lookupSymbol(expr.symbol);
    if (def?.value === void 0)
      set.add(expr.symbol);
    return;
  }
  if (!expr.ops && !expr.keys)
    return;
  if (expr.ops)
    for (const op3 of expr.ops)
      getFreeVars(op3, set);
  if (expr.keys)
    for (const key of expr.keys)
      getFreeVars(expr.getKey(key), set);
  return;
}
function getSymbols(expr, set) {
  if (expr.symbol) {
    set.add(expr.symbol);
    return;
  }
  if (!expr.ops && !expr.keys)
    return;
  if (expr.ops)
    for (const op3 of expr.ops)
      getSymbols(op3, set);
  if (expr.keys)
    for (const key of expr.keys)
      getSymbols(expr.getKey(key), set);
  return;
}
function getSubexpressions(expr, head2) {
  const result = !head2 || expr.head === head2 ? [expr] : [];
  if (expr.ops) {
    for (const op3 of expr.ops)
      result.push(...getSubexpressions(op3, head2));
  } else if (expr.keys) {
    for (const op3 of expr.keys)
      result.push(...getSubexpressions(expr.getKey(op3), head2));
  }
  return result;
}
function bignumPreferred(ce) {
  return ce.numericMode === "bignum" || ce.numericMode === "auto";
}
function complexAllowed(ce) {
  return ce.numericMode === "auto" || ce.numericMode === "complex";
}
function hashCode(s) {
  let hash2 = 0;
  for (let i = 0; i < s.length; i++)
    hash2 = Math.imul(31, hash2) + s.charCodeAt(i) | 0;
  return Math.abs(hash2);
}
function bigintValue(ce, expr) {
  if (expr === null || expr === void 0)
    return null;
  if (typeof expr === "number")
    return Number.isInteger(expr) ? bigint(expr) : null;
  if (isNumberExpression(expr)) {
    const num = isNumberObject(expr) ? expr.num.toString() : expr;
    let s = num.toLowerCase().replace(/[nd]$/g, "").replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
    if (/\([0-9]+\)/.test(s)) {
      const [_, body, repeat, trail] = s.match(/(.+)\(([0-9]+)\)(.*)$/) ?? [];
      s = body + repeat.repeat(Math.ceil(ce.precision / repeat.length)) + (trail ?? "");
    }
    if (s === "nan")
      return null;
    if (s === "infinity" || s === "+infinity")
      return null;
    if (s === "-infinity")
      return null;
    if (s.includes("."))
      return null;
    return bigint(s);
  }
  return null;
}
function asBigint(expr) {
  const num = expr.numericValue;
  if (num === null)
    return null;
  if (typeof num === "number" && Number.isInteger(num))
    return bigint(num);
  if (num instanceof decimal_default && num.isInteger())
    return bigint(num);
  return null;
}

// src/compute-engine/rules.ts
function matchRules(expr, rules, sub2) {
  const result = [];
  for (const rule of rules) {
    const r = applyRule(rule, expr, sub2);
    if (r !== null)
      result.push(r);
  }
  return result;
}
function boxRules(ce, rs) {
  const result = /* @__PURE__ */ new Set();
  for (const [rawLhs, rawRhs, options] of rs) {
    let cond;
    const latex = latexString(options?.condition);
    if (latex) {
      const condPattern = ce.pattern(latex);
      cond = (x) => condPattern.subs(x).value?.symbol === "True";
    } else
      cond = options?.condition;
    result.add([
      ce.pattern(rawLhs),
      ce.pattern(rawRhs),
      options?.priority ?? 0,
      cond
    ]);
  }
  return result;
}
function applyRule([lhs, rhs, _priority, condition], expr, substitution, options) {
  const sub2 = lhs.match(expr, { substitution, ...options });
  if (sub2 === null)
    return null;
  if (typeof condition === "function" && !condition(sub2))
    return null;
  return rhs.subs(sub2, { canonical: true });
}
function replace(expr, ruleSet, options) {
  const iterationLimit = options?.iterationLimit ?? 1;
  let iterationCount = 0;
  const once = options?.once ?? false;
  let done = false;
  let atLeastOneRule = false;
  try {
    while (!done && iterationCount < iterationLimit) {
      done = true;
      for (const rule of ruleSet) {
        const result = applyRule(rule, expr, {}, options);
        if (result !== null && result !== expr) {
          if (once)
            return result;
          done = false;
          atLeastOneRule = true;
          expr = result;
        }
      }
      iterationCount += 1;
    }
  } catch (e) {
    console.error(e);
  }
  return atLeastOneRule ? expr : null;
}
function getWildcardName(s) {
  const m = s.match(/^(__?_?[a-zA-Z0-9]+)/);
  if (m === null)
    return "";
  return m[1];
}

// src/compute-engine/symbolic/negate.ts
var import_complex4 = __toESM(require_complex());

// src/compute-engine/numerics/rationals.ts
var import_complex3 = __toESM(require_complex());
function isRational(x) {
  return x !== null && Array.isArray(x);
}
function isMachineRational(x) {
  return x !== null && Array.isArray(x) && typeof x[0] === "number";
}
function isBigRational(x) {
  return x !== null && Array.isArray(x) && typeof x[0] === "bigint";
}
function isRationalZero(x) {
  return x[0] == 0;
}
function isRationalOne(x) {
  return x[0] === x[1];
}
function isRationalNegativeOne(x) {
  return x[0] === -x[1];
}
function machineNumerator(x) {
  return Number(x[0]);
}
function machineDenominator(x) {
  return Number(x[1]);
}
function isNeg(x) {
  return x[0] < 0;
}
function neg(x) {
  return [-x[0], x[1]];
}
function inverse(x) {
  return x[0] < 0 ? [-x[1], -x[0]] : [x[1], x[0]];
}
function asRational(expr) {
  const num = expr.numericValue;
  if (num === null)
    return void 0;
  if (Array.isArray(num))
    return num;
  if (typeof num === "number" && Number.isInteger(num))
    return [num, 1];
  if (num instanceof decimal_default && num.isInteger())
    return [bigint(num), BigInt(1)];
  return void 0;
}
function asMachineRational(r) {
  return [Number(r[0]), Number(r[1])];
}
function add2(lhs, rhs) {
  /* @__PURE__ */ console.assert(
    Array.isArray(rhs) || rhs.numericValue !== null && !(rhs instanceof import_complex3.default)
  );
  if (Array.isArray(rhs)) {
    if (isBigRational(rhs)) {
      lhs = [bigint(lhs[0]), bigint(lhs[1])];
      return [rhs[1] * lhs[0] + rhs[0] * lhs[1], rhs[1] * lhs[1]];
    }
    if (isBigRational(lhs)) {
      rhs = [bigint(rhs[0]), bigint(rhs[1])];
      return [rhs[1] * lhs[0] + rhs[0] * lhs[1], rhs[1] * lhs[1]];
    }
    return [rhs[1] * lhs[0] + rhs[0] * lhs[1], rhs[1] * lhs[1]];
  }
  let rhsNum = rhs.numericValue;
  /* @__PURE__ */ console.assert(rhs.isInteger);
  if (rhsNum !== null && typeof rhsNum === "number") {
    if (isMachineRational(lhs))
      return [lhs[0] + lhs[1] * rhsNum, lhs[1]];
    return [lhs[0] + lhs[1] * bigint(rhsNum), lhs[1]];
  }
  if (rhsNum instanceof decimal_default) {
    if (isMachineRational(lhs))
      lhs = [bigint(lhs[0]), bigint(lhs[1])];
    return [lhs[0] + lhs[1] * bigint(rhsNum.toString()), lhs[1]];
  }
  if (Array.isArray(rhsNum)) {
    if (isMachineRational(rhsNum))
      rhsNum = [bigint(rhsNum[0]), bigint(rhsNum[1])];
    if (isMachineRational(lhs))
      lhs = [bigint(lhs[0]), bigint(lhs[1])];
    return [rhsNum[1] * lhs[0] + rhsNum[0] * lhs[1], rhsNum[1] * lhs[1]];
  }
  return lhs;
}
function mul2(lhs, rhs) {
  /* @__PURE__ */ console.assert(
    Array.isArray(rhs) || rhs.numericValue !== null && !(rhs instanceof import_complex3.default)
  );
  if (Array.isArray(rhs)) {
    if (isMachineRational(lhs) && isMachineRational(rhs))
      return [lhs[0] * rhs[0], lhs[1] * rhs[1]];
    if (isMachineRational(lhs))
      lhs = [bigint(lhs[0]), bigint(lhs[1])];
    if (isMachineRational(rhs))
      rhs = [bigint(rhs[0]), bigint(rhs[1])];
    return [lhs[0] * rhs[0], lhs[1] * rhs[1]];
  }
  const rhsNum = rhs.numericValue;
  if (rhsNum !== null && typeof rhsNum === "number") {
    /* @__PURE__ */ console.assert(Number.isInteger(rhsNum));
    if (isMachineRational(lhs))
      return [lhs[0] * rhsNum, lhs[1]];
    return [lhs[0] * bigint(rhsNum), lhs[1]];
  }
  if (rhsNum instanceof decimal_default) {
    /* @__PURE__ */ console.assert(rhsNum.isInteger());
    if (isMachineRational(lhs))
      return [bigint(rhsNum.toString()) * bigint(lhs[0]), bigint(lhs[1])];
    return [bigint(rhsNum.toString()) * lhs[0], lhs[1]];
  }
  if (Array.isArray(rhsNum)) {
    if (isBigRational(rhsNum))
      return [rhsNum[0] * bigint(lhs[0]), rhsNum[1] * bigint(lhs[1])];
    else if (isMachineRational(lhs))
      return [lhs[0] * rhsNum[0], lhs[1] * rhsNum[1]];
    return [lhs[0] * bigint(rhsNum[0]), lhs[1] * bigint(rhsNum[1])];
  }
  return lhs;
}
function pow2(r, exp2) {
  /* @__PURE__ */ console.assert(Number.isInteger(exp2));
  if (exp2 === 0)
    return [1, 1];
  if (exp2 < 0) {
    r = inverse(r);
    exp2 = -exp2;
  }
  if (exp2 === 1)
    return r;
  if (isMachineRational(r))
    return [Math.pow(r[0], exp2), Math.pow(r[1], exp2)];
  const bigexp = bigint(exp2);
  return [r[0] ** bigexp, r[1] ** bigexp];
}
function reducedRational(r) {
  if (isMachineRational(r)) {
    if (r[0] === 1 || r[1] === 1)
      return r;
    if (r[1] < 0)
      r = [-r[0], -r[1]];
    if (!Number.isFinite(r[1]))
      return [0, 1];
    const g2 = gcd(r[0], r[1]);
    return g2 <= 1 ? r : [r[0] / g2, r[1] / g2];
  }
  if (r[0] === BigInt(1) || r[1] === BigInt(1))
    return r;
  if (r[1] < 0)
    r = [-r[0], -r[1]];
  const g = gcd2(r[0], r[1]);
  if (g <= 1)
    return r;
  return [r[0] / g, r[1] / g];
}
function rationalize(x) {
  if (!Number.isFinite(x))
    return x;
  const fractional = x % 1;
  if (fractional === 0)
    return x;
  const eps = 1e-15;
  let a = Math.floor(x);
  let h1 = 1;
  let k1 = 0;
  let h = a;
  let k = 1;
  while (x - a > eps * k * k) {
    x = 1 / (x - a);
    a = Math.floor(x);
    const h2 = h1;
    h1 = h;
    const k2 = k1;
    k1 = k;
    h = h2 + a * h1;
    k = k2 + a * k1;
  }
  return [h, k];
}
function asCoefficient(expr) {
  /* @__PURE__ */ console.assert(expr.isCanonical);
  const ce = expr.engine;
  if (expr.head === "Multiply") {
    const rest = [];
    let coef = [1, 1];
    for (const arg of expr.ops) {
      const n2 = arg.numericValue;
      if (n2 !== null && (typeof n2 === "number" && Number.isInteger(n2) || n2 instanceof decimal_default && n2.isInteger() || isRational(n2)))
        coef = mul2(coef, arg);
      else
        rest.push(arg);
    }
    coef = reducedRational(coef);
    if (isRationalOne(coef))
      return [[1, 1], expr];
    if (rest.length === 0)
      return [coef, ce._ONE];
    if (rest.length === 1)
      return [coef, rest[0]];
    return [coef, ce.mul(rest)];
  }
  if (expr.head === "Divide") {
    let [coef1, numer] = asCoefficient(expr.op1);
    const [coef2, denom] = asCoefficient(expr.op2);
    const coef = reducedRational(mul2(coef1, inverse(coef2)));
    if (denom.isOne)
      return [coef, numer];
    return [coef, ce.div(numer, denom)];
  }
  if (expr.head === "Power") {
    if (expr.op2.numericValue === null)
      return [[1, 1], expr];
    let [coef, base] = asCoefficient(expr.op1);
    if (isRationalOne(coef))
      return [[1, 1], expr];
    const exponent = expr.op2;
    const e = asSmallInteger(exponent);
    if (e === -1)
      return [inverse(coef), ce.inv(base)];
    if (e !== null)
      return [pow2(coef, e), ce.pow(base, exponent)];
    if (exponent.numericValue !== null && Array.isArray(exponent.numericValue)) {
      const [en, ed] = asMachineRational(exponent.numericValue);
      const [numer, denom] = asMachineRational(coef);
      if (numer > 0 && Math.abs(en) === 1) {
        const [nCoef, nRest] = factorPower(numer, ed);
        const [dCoef, dRest] = factorPower(denom, ed);
        if (nCoef === 1 && dCoef === 1)
          return [[1, 1], expr];
        return [
          en === 1 ? [nCoef, dCoef] : [dCoef, nCoef],
          ce.pow(ce.mul([ce.number([nRest, dRest]), base]), exponent)
        ];
      }
    }
    return [[1, 1], expr];
  }
  if (expr.head === "Add") {
  }
  if (expr.head === "Negate") {
    const [coef, rest] = asCoefficient(expr.op1);
    return [neg(coef), rest];
  }
  const n = expr.numericValue;
  if (n !== null) {
    if (n instanceof decimal_default) {
      if (n.isInteger())
        return [[bigint(n.toString()), BigInt(1)], ce._ONE];
      if (n.isNegative())
        return [[-1, 1], ce.number(n.neg())];
    }
    if (typeof n === "number") {
      if (Number.isInteger(n))
        return [[n, 1], ce._ONE];
      if (n < 0)
        return [[-1, 1], ce.number(-n)];
    }
    if (isRational(n))
      return [n, ce._ONE];
    if (n instanceof import_complex3.default && n.re < 0)
      return [[-1, 1], ce.number(ce.complex(-n.re, -n.im))];
  }
  return [[1, 1], expr];
}
function signDiff(lhs, rhs, tolerance) {
  if (lhs === rhs)
    return 0;
  const lhsN = lhs.N();
  const rhsN = rhs.N();
  const lhsNum = lhsN.numericValue;
  const rhsNum = rhsN.numericValue;
  if (lhsNum === null || rhsNum === null) {
    const lhsS = lhs.sgn;
    const rhsS = rhs.sgn;
    if (typeof lhsS !== "number" || typeof rhsS !== "number")
      return void 0;
    if (lhsS === 0 && rhsS === 0)
      return 0;
    if (lhsS < 0 && rhsS > 0)
      return -1;
    if (lhsS > 0 && rhsS < 0)
      return 1;
    return void 0;
  }
  tolerance ?? (tolerance = lhs.engine.tolerance);
  if (lhsNum instanceof import_complex3.default && rhsNum instanceof import_complex3.default)
    return chop(lhsNum.re - rhsNum.re, tolerance) === 0 && chop(lhsNum.im - rhsNum.im, tolerance) === 0 ? 0 : void 0;
  if (lhsNum instanceof import_complex3.default || rhsNum instanceof import_complex3.default)
    return void 0;
  if (isRational(lhsNum) || isRational(rhsNum))
    return void 0;
  if (typeof lhsNum === "number" && typeof rhsNum === "number") {
    if (chop(rhsNum - lhsNum, tolerance) === 0)
      return 0;
    return lhsNum < rhsNum ? -1 : 1;
  }
  const ce = lhs.engine;
  const delta = ce.bignum(rhsNum).sub(ce.bignum(lhsNum));
  if (chop(delta, tolerance) === 0)
    return 0;
  return delta.isPos() ? 1 : -1;
}

// src/compute-engine/symbolic/flatten.ts
function flattenOps(ops2, head2) {
  if (!head2)
    return ops2;
  if (ops2.every((x) => !x.ops || x.head !== head2))
    return ops2;
  const result = [];
  for (const arg of ops2) {
    if (!arg.ops || arg.head !== head2)
      result.push(arg);
    else {
      result.push(...flattenOps(arg.ops, head2));
    }
  }
  /* @__PURE__ */ console.assert(result.length !== ops2.length);
  if (result.length === ops2.length)
    return ops2;
  return result;
}
function flattenSequence(xs) {
  if (xs.every((x) => x.head !== "Sequence"))
    return xs;
  const ys = [];
  for (const x of xs) {
    if (x.isValid && x.head === "Sequence") {
      if (x.ops)
        ys.push(...x.ops);
    } else
      ys.push(x);
  }
  return ys;
}
function canonical(xs) {
  return xs.every((x) => x.isCanonical) ? xs : xs.map((x) => x.canonical);
}

// src/compute-engine/symbolic/negate.ts
function negateLiteral(expr, metadata) {
  let n = expr.numericValue;
  if (n === null)
    return null;
  if (typeof n === "number")
    n = -n;
  else if (n instanceof decimal_default)
    n = n.neg();
  else if (n instanceof import_complex4.Complex)
    n = n.neg();
  else if (Array.isArray(n))
    n = neg(n);
  return expr.engine.number(n, { metadata });
}
function canonicalNegate(expr, metadata) {
  if (expr.head === "Negate")
    return expr.op1;
  if (expr.numericValue !== null)
    return negateLiteral(expr, metadata);
  if (expr.head === "Add") {
    let ops2 = expr.ops.map((x) => canonicalNegate(x));
    ops2 = flattenOps(ops2, "Add");
    return expr.engine.add(ops2, metadata);
  }
  if (expr.head === "Multiply") {
    return negateProduct(expr.engine, expr.ops);
  }
  if (expr.head === "Divide")
    return expr.engine._fn("Divide", [canonicalNegate(expr.op1), expr.op2]);
  /* @__PURE__ */ console.assert(expr.head !== "Subtract");
  return expr.engine._fn("Negate", [expr], metadata);
}
function negateProduct(ce, args) {
  let result = [];
  let done = false;
  for (const arg of args) {
    if (!done && arg.head === "Negate") {
      done = true;
      result.push(arg.op1);
    } else
      result.push(arg);
  }
  if (done)
    return ce.mul(result);
  result = [];
  for (const arg of args) {
    if (done || arg.numericValue === null || !arg.isInteger)
      result.push(arg);
    else {
      done = true;
      result.push(canonicalNegate(arg));
    }
  }
  if (done)
    return ce.mul(result);
  result = [];
  for (const arg of args) {
    if (done || arg.numericValue === null || !arg.isNumber)
      result.push(arg);
    else {
      done = true;
      result.push(canonicalNegate(arg));
    }
  }
  if (done)
    return ce.mul(result);
  return ce._fn("Negate", [ce._fn("Multiply", args)]);
}
function processNegate(_ce, x, _mode = "simplify") {
  return canonicalNegate(x);
}

// src/compute-engine/symbolic/expand.ts
function expand2(lhs, rhs) {
  const ce = lhs.engine;
  if (lhs.head === "Negate" && rhs.head === "Negate")
    return expand2(lhs.op1, rhs.op1);
  if (lhs.head === "Negate")
    return canonicalNegate(expand2(lhs.op1, rhs));
  if (rhs.head === "Negate")
    return canonicalNegate(expand2(lhs, rhs.op1));
  lhs = expand3(lhs);
  rhs = expand3(rhs);
  if (lhs.head === "Add")
    return ce.add(lhs.ops.map((x) => expand2(x, rhs)));
  if (rhs.head === "Add")
    return ce.add(rhs.ops.map((x) => expand2(lhs, x)));
  return ce.mul([lhs, rhs]);
}
function expandN(expr, n) {
  if (n === 1)
    return expr;
  const x2 = expand2(expr, expr);
  if (n === 2)
    return x2;
  if (n % 2 === 0)
    return expandN(x2, n / 2);
  const x = expandN(x2, Math.round(n / 2) - 1);
  return expand2(x, expr);
}
function expand3(expr) {
  expr = expr.simplify();
  const ce = expr.engine;
  if (expr.head === "Add")
    return ce.add(expr.ops.map((x) => expand3(x))).simplify();
  if (expr.head === "Negate")
    return expand2(ce._NEGATIVE_ONE, expr.op1).simplify();
  if (expr.head === "Subtract")
    return ce.add([expand3(expr.op1), expand2(ce._NEGATIVE_ONE, expr.op1)]).simplify();
  if (expr.head === "Divide")
    return ce.div(expand3(expr.op1), expand3(expr.op2)).simplify();
  if (expr.head === "Multiply") {
    if (expr.nops === 2)
      return expand2(expr.op1, expr.op2);
    return expr.ops.reduce((acc, v) => expand2(acc, v), ce._ONE).simplify();
  }
  if (expr.head === "Power") {
    const op1head = expr.op1.head;
    if (op1head === "Multiply")
      return ce.mul(expr.op1.ops.map((x) => ce.pow(x, expr.op2))).simplify();
    if (op1head === "Negate") {
      const n = asSmallInteger(expr.op2);
      if (n !== null && n > 0) {
        if (n % 2 === 0)
          return ce.pow(expr.op1.op1, expr.op2).simplify();
        return ce.neg(ce.pow(expr.op1.op1, expr.op2)).simplify();
      }
    }
    if (op1head === "Add") {
      const n = asSmallInteger(expr.op2);
      if (n !== null) {
        if (n > 0)
          return expandN(expr.op1, n).simplify();
        return ce.inv(expandN(expr.op1, -n)).simplify();
      }
    }
  }
  return expr.simplify();
}

// src/compute-engine/solve.ts
var UNIVARIATE_ROOTS = [
  // ax = 0
  [["Multiply", "_x", "_a"], ["0"]],
  // x + a = 0
  [
    ["Add", "_a", "_x"],
    ["Negate", "_a"]
  ],
  [["Add", ["Negate", "_x"], "_a"], "_a"],
  // ax + b = 0
  [
    ["Add", ["Multiply", "_x", "_a"], "_b"],
    ["Divide", ["Negate", "_b"], "_a"]
  ],
  // Quadratic formula (real)
  // ax^2 + bx + c = 0
  [
    [
      "Add",
      ["Multiply", ["Power", "_x", 2], "_a"],
      ["Multiply", "_x", "_b"],
      "_c"
    ],
    [
      "Divide",
      [
        "Add",
        ["Negate", "_b"],
        ["Sqrt", ["Subtract", ["Square", "_b"], ["Multiply", 4, "_a", "_c"]]]
      ],
      ["Multiply", 2, "_a"]
    ]
    // (_ce, vars): boolean => vars.x.isReal === true,
  ],
  [
    [
      "Add",
      ["Multiply", ["Power", "_x", 2], "_a"],
      ["Multiply", "_x", "_b"],
      "_c"
    ],
    [
      "Divide",
      [
        "Subtract",
        ["Negate", "_b"],
        ["Sqrt", ["Subtract", ["Square", "_b"], ["Multiply", 4, "_a", "_c"]]]
      ],
      ["Multiply", 2, "_a"]
    ]
    // (_ce, vars): boolean => vars.x.isReal === true,
  ],
  // ax^2 + bx = 0
  [
    ["Add", ["Multiply", ["Power", "_x", 2], "_a"], ["Multiply", "_x", "_b"]],
    0
    // (_ce, vars): boolean => vars.x.isReal === true,
  ],
  [
    ["Add", ["Multiply", ["Power", "_x", 2], "_a"], ["Multiply", "_x", "_b"]],
    ["Divide", ["Negate", "_b"], "_a"]
    // (_ce, vars): boolean => vars.x.isReal === true,
  ],
  // ax^2 + b = 0
  [
    ["Add", ["Multiply", ["Power", "_x", 2], "_a"], "_b"],
    ["Sqrt", ["Divide", ["Negate", "_b"], "_a"]]
    // (_ce, vars): boolean => vars.x.isReal === true,
  ],
  [
    ["Add", ["Multiply", ["Power", "_x", 2], "_a"], "_b"],
    ["Negate", ["Sqrt", ["Divide", ["Negate", "_b"], "_a"]]]
    // (_ce, vars): boolean => vars.x.isReal === true,
  ]
  // Quadratic formula (complex)
  // [
  //   '$ax^2 + bx + c$',
  //   [
  //     '$-\\frac{b}{2a} - \\imaginaryI \\frac{\\sqrt{4ac - b^2}}{2a}$',
  //     '$-\\frac{b}{2a} + \\imaginaryI \\frac{\\sqrt{4ac - b^2}}{2a}$',
  //   ],
  //   (_ce, vars): boolean => vars.x.isImaginary === true,
  // ],
];
function findUnivariateRoots(expr, x) {
  const ce = expr.engine;
  if (expr.head === "Equal") {
    expr = ce.add([expr.op1.canonical, ce.neg(expr.op2.canonical)]).simplify();
  }
  const rules = ce.cache(
    "univariate-roots-rules",
    () => boxRules(ce, UNIVARIATE_ROOTS)
  );
  const result = matchRules(
    expand3(expr).subs({ [x]: "_x" }, { canonical: false }),
    rules,
    { _x: ce.symbol("_x") }
  );
  return result.map((x2) => x2.canonical.evaluate());
}

// src/compute-engine/assume.ts
function assume(proposition) {
  if (proposition.head === "Element")
    return assumeElement(proposition);
  if (proposition.head === "Equal")
    return assumeEquality(proposition);
  if (isInequality(proposition))
    return assumeInequality(proposition);
  return "not-a-predicate";
}
function assumeEquality(proposition) {
  /* @__PURE__ */ console.assert(proposition.head === "Equal");
  const freeVars = proposition.freeVars;
  if (freeVars.length === 0) {
    const val = proposition.evaluate();
    if (val.symbol === "True")
      return "tautology";
    if (val.symbol === "False")
      return "contradiction";
    /* @__PURE__ */ console.log(proposition.canonical.evaluate());
    return "not-a-predicate";
  }
  const ce = proposition.engine;
  const lhs = proposition.op1.symbol;
  if (lhs && !hasValue(ce, lhs) && !proposition.op2.has(lhs)) {
    const val = proposition.op2.evaluate();
    if (!val.isValid)
      return "not-a-predicate";
    const def = ce.lookupSymbol(lhs);
    if (!def) {
      ce.defineSymbol(lhs, { value: val });
      return "ok";
    }
    if (def.domain && !val.domain.isCompatible(def.domain))
      return "contradiction";
    def.value = val;
    return "ok";
  }
  if (freeVars.length === 1) {
    const lhs2 = freeVars[0];
    const sols = findUnivariateRoots(proposition, lhs2);
    if (sols.length === 0) {
      ce.assumptions.set(
        ce.box([
          "Equal",
          ce.add([proposition.op1.canonical, ce.neg(proposition.op2.canonical)]).simplify(),
          0
        ]),
        true
      );
    }
    const val = sols.length === 1 ? sols[0] : ce.box(["List", ...sols]);
    const def = ce.lookupSymbol(lhs2);
    if (!def) {
      ce.defineSymbol(lhs2, { value: val });
      return "ok";
    }
    if (def.domain && !sols.every((sol) => val.domain.isCompatible(sol.domain)))
      return "contradiction";
    def.value = val;
    return "ok";
  }
  ce.assumptions.set(proposition, true);
  return "ok";
}
function assumeInequality(proposition) {
  const ce = proposition.engine;
  if (proposition.op1.symbol && !hasDef(ce, proposition.op1.symbol)) {
    if (proposition.op2.evaluate().isZero) {
      if (proposition.head === "Less") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("NegativeNumber")
        });
      } else if (proposition.head === "LessEqual") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("NonPositiveNumber")
        });
      } else if (proposition.head === "Greater") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("PositiveNumber")
        });
      } else if (proposition.head === "GreaterEqual") {
        ce.defineSymbol(proposition.op1.symbol, {
          domain: ce.domain("NonNegativeNumber")
        });
      }
    } else {
      ce.defineSymbol(proposition.op1.symbol, {
        domain: ce.domain("ExtendedRealNumber")
      });
      ce.assumptions.set(proposition, true);
    }
    return "ok";
  }
  let op3 = "";
  let lhs;
  let rhs;
  if (proposition.head === "Less") {
    lhs = proposition.op1;
    rhs = proposition.op2;
    op3 = "<";
  } else if (proposition.head === "LessEqual") {
    lhs = proposition.op1;
    rhs = proposition.op2;
    op3 = "<=";
  } else if (proposition.head === "Greater") {
    lhs = proposition.op2;
    rhs = proposition.op1;
    op3 = "<";
  } else if (proposition.head === "GreaterEqual") {
    lhs = proposition.op2;
    rhs = proposition.op1;
    op3 = "<=";
  }
  if (!op3)
    return "internal-error";
  const p = ce.add([lhs.canonical, ce.neg(rhs.canonical)]).simplify();
  const result = ce.box([op3 === "<" ? "Less" : "LessEqual", p, 0]).evaluate();
  if (result.symbol === "True")
    return "tautology";
  if (result.symbol === "False")
    return "contradiction";
  const freeVars = result.freeVars;
  if (freeVars.length === 0)
    return "not-a-predicate";
  if (freeVars.length === 1) {
    if (!ce.lookupSymbol(freeVars[0]))
      ce.defineSymbol(freeVars[0], { domain: "ExtendedRealNumber" });
  }
  /* @__PURE__ */ console.assert(result.head === "Less" || result.head === "LessEqual");
  ce.assumptions.set(result, true);
  return "ok";
}
function assumeElement(proposition) {
  /* @__PURE__ */ console.assert(proposition.head === "Element");
  const ce = proposition.engine;
  const undefs = undefinedIdentifiers(proposition.op1);
  if (undefs.length === 1) {
    const dom = ce.domain(proposition.op2.evaluate().json);
    if (!dom.isValid)
      return "not-a-predicate";
    if (dom.isCompatible("Function"))
      ce.defineFunction(undefs[0], { signature: { domain: "Function" } });
    else
      ce.defineSymbol(undefs[0], { domain: dom });
    return "ok";
  }
  if (proposition.op1.symbol && hasDef(ce, proposition.op1.symbol)) {
    const dom = ce.domain(proposition.op2.evaluate().json);
    if (!dom.isValid)
      return "not-a-predicate";
    const def = ce.lookupSymbol(proposition.op1.symbol);
    if (def) {
      if (def.domain && !dom.isCompatible(def.domain))
        return "contradiction";
      def.domain = dom;
      return "ok";
    }
    const fdef = ce.lookupFunction(proposition.op1.symbol);
    if (fdef?.signature?.domain) {
      if (!dom.isCompatible(fdef.signature.domain))
        return "contradiction";
      if (dom.isCompatible(fdef.signature.domain, "bivariant"))
        return "tautology";
      return "not-a-predicate";
    }
    return "ok";
  }
  if (undefs.length > 0) {
    ce.assumptions.set(proposition, true);
    return "ok";
  }
  const val = proposition.evaluate();
  if (val.symbol === "True")
    return "tautology";
  if (val.symbol === "False")
    return "contradiction";
  return "not-a-predicate";
}
function hasDef(ce, s) {
  return (ce.lookupSymbol(s) ?? ce.lookupFunction(s)) !== void 0;
}
function undefinedIdentifiers(expr) {
  return expr.symbols.filter((x) => !hasDef(expr.engine, x));
}
function hasValue(ce, s) {
  if (ce.lookupFunction(s))
    return false;
  return ce.lookupSymbol(s)?.value !== void 0;
}
function isInequality(expr) {
  const h = expr.head;
  if (typeof h !== "string")
    return false;
  return ["Less", "Greater", "LessEqual", "GreaterEqual"].includes(h);
}

// src/compute-engine/boxed-expression/box.ts
var import_complex12 = __toESM(require_complex());

// src/compute-engine/boxed-expression/abstract-boxed-expression.ts
var import_complex5 = __toESM(require_complex());
var AbstractBoxedExpression = class {
  constructor(ce, metadata) {
    this.engine = ce;
    if (metadata?.latex !== void 0)
      this._latex = metadata.latex;
    if (metadata?.wikidata !== void 0)
      this._wikidata = metadata.wikidata;
  }
  /** `Object.valueOf()`: return a primitive value for the object
   *
   */
  valueOf() {
    if (this.symbol === "True")
      return true;
    if (this.symbol === "False")
      return false;
    return asFloat(this) ?? this.string ?? this.symbol ?? JSON.stringify(this.json);
  }
  /** Object.toString() */
  toString() {
    if (this.symbol)
      return this.symbol;
    if (this.string)
      return this.string;
    const num = this.numericValue;
    if (num !== null) {
      if (typeof num === "number")
        return num.toString();
      if (isMachineRational(num))
        return `${num[0].toString()}/${num[1].toString()}`;
      if (isBigRational(num))
        return `${num[0].toString()}/${num[1].toString()}`;
      if (num instanceof import_complex5.Complex) {
        const im = num.im === 1 ? "" : num.im === -1 ? "-" : num.im.toString();
        if (num.re === 0)
          return im + "i";
        if (num.im < 0)
          return `${num.re.toString()}${im}i`;
        return `${num.re.toString()}+${im}i`;
      }
    }
    return JSON.stringify(this.json);
  }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      const v = this.valueOf();
      return typeof v === "number" ? v : null;
    }
    return this.toString();
  }
  /** Called by `JSON.stringify()` when serializing to json */
  toJSON() {
    return this.json;
  }
  get scope() {
    return null;
  }
  /** Object.is() */
  is(rhs) {
    if (rhs === null || rhs === void 0)
      return false;
    return this.isSame(this.engine.box(rhs));
  }
  get latex() {
    return this._latex ?? this.engine.serialize(this);
  }
  set latex(val) {
    this._latex = val;
  }
  get symbol() {
    return null;
  }
  get isNothing() {
    return false;
  }
  get string() {
    return null;
  }
  getSubexpressions(head2) {
    return getSubexpressions(this, head2);
  }
  get subexpressions() {
    return this.getSubexpressions("");
  }
  get symbols() {
    const set = /* @__PURE__ */ new Set();
    getSymbols(this, set);
    return Array.from(set);
  }
  get freeVars() {
    const set = /* @__PURE__ */ new Set();
    getFreeVars(this, set);
    return Array.from(set);
  }
  get errors() {
    return this.getSubexpressions("Error");
  }
  // Only return non-null for functions
  get ops() {
    return null;
  }
  get nops() {
    return 0;
  }
  get op1() {
    return this.engine.symbol("Nothing");
  }
  get op2() {
    return this.engine.symbol("Nothing");
  }
  get op3() {
    return this.engine.symbol("Nothing");
  }
  get isValid() {
    return true;
  }
  get isPure() {
    return false;
  }
  get isExact() {
    return true;
  }
  /** For a symbol, true if the symbol is a free variable (no value) */
  get isFree() {
    return false;
  }
  /** For a symbol, true if the symbol is a constant (unchangeable value) */
  get isConstant() {
    return false;
  }
  get canonical() {
    return this;
  }
  apply(_fn, _head) {
    return this;
  }
  subs(_sub, options) {
    if (options?.canonical)
      return this.canonical;
    return this;
  }
  solve(_vars) {
    return null;
  }
  replace(_rules) {
    return null;
  }
  has(_v) {
    return false;
  }
  get isNaN() {
    return void 0;
  }
  get isZero() {
    return void 0;
  }
  get isNotZero() {
    return void 0;
  }
  get isOne() {
    return void 0;
  }
  get isNegativeOne() {
    return void 0;
  }
  get isInfinity() {
    return void 0;
  }
  // Not +- Infinity, not NaN
  get isFinite() {
    return void 0;
  }
  get isEven() {
    return void 0;
  }
  get isOdd() {
    return void 0;
  }
  get isPrime() {
    return void 0;
  }
  get isComposite() {
    return void 0;
  }
  get numericValue() {
    return null;
  }
  get sgn() {
    return null;
  }
  isLess(_rhs) {
    return void 0;
  }
  isLessEqual(_rhs) {
    return void 0;
  }
  isGreater(_rhs) {
    return void 0;
  }
  isGreaterEqual(_rhs) {
    return void 0;
  }
  // x > 0
  get isPositive() {
    return void 0;
  }
  // x >= 0
  get isNonNegative() {
    return void 0;
  }
  // x < 0
  get isNegative() {
    return void 0;
  }
  // x <= 0
  get isNonPositive() {
    return void 0;
  }
  //
  //
  //
  //
  //
  isCompatible(_dom, _kind) {
    return false;
  }
  get description() {
    return void 0;
  }
  get url() {
    return void 0;
  }
  get wikidata() {
    return this._wikidata;
  }
  set wikidata(val) {
    this._wikidata = val;
  }
  get complexity() {
    return void 0;
  }
  get basedDefinition() {
    return void 0;
  }
  get symbolDefinition() {
    return void 0;
  }
  get functionDefinition() {
    return void 0;
  }
  bind(_scope) {
    return;
  }
  unbind() {
    return;
  }
  get keys() {
    return null;
  }
  get keysCount() {
    return 0;
  }
  getKey(_key) {
    return void 0;
  }
  hasKey(_key) {
    return false;
  }
  get value() {
    return void 0;
  }
  set value(_value) {
    throw new Error(`Can't change the value of \\(${this.latex}\\)`);
  }
  get domain() {
    return this.engine.domain("Void");
  }
  set domain(_domain) {
    throw new Error(`Can't change the domain of \\(${this.latex}\\)`);
  }
  get explicitDomain() {
    return this.domain;
  }
  get isNumber() {
    return void 0;
  }
  get isInteger() {
    return void 0;
  }
  get isRational() {
    return void 0;
  }
  get isAlgebraic() {
    return false;
  }
  get isReal() {
    return void 0;
  }
  // Real or +-Infinity
  get isExtendedReal() {
    return void 0;
  }
  get isComplex() {
    return void 0;
  }
  get isImaginary() {
    return void 0;
  }
  get isExtendedComplex() {
    return void 0;
  }
  simplify(_options) {
    return this;
  }
  evaluate(options) {
    return this.simplify(options);
  }
  N(_options) {
    return this.evaluate();
  }
};

// src/compute-engine/boxed-expression/serialize.ts
var import_complex8 = __toESM(require_complex());

// src/compute-engine/numerics/numeric-bignum.ts
function factorial2(ce, n) {
  if (!n.isInteger() || n.isNegative())
    return ce._BIGNUM_NAN;
  if (n.lessThan(10))
    return ce.bignum(
      [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800][n.toNumber()]
    );
  if (n.gt(Number.MAX_SAFE_INTEGER)) {
    let val2 = ce._BIGNUM_ONE;
    let i = ce._BIGNUM_TWO;
    while (i.lessThan(n)) {
      val2 = val2.mul(i);
      i = i.add(1);
    }
    return val2;
  }
  if (n.modulo(2).eq(1)) {
    return n.times(factorial2(ce, n.minus(1)));
  }
  let loop = n.toNumber();
  let sum2 = n;
  let val = n;
  while (loop > 2) {
    loop -= 2;
    sum2 = sum2.add(loop);
    val = val.mul(sum2);
  }
  return val;
}
var gammaG2 = 7;
function lngamma2(ce, z) {
  if (z.isNegative())
    return ce._BIGNUM_NAN;
  const GAMMA_P_LN = ce.cache("gamma-p-ln", () => {
    return [
      "0.99999999999999709182",
      "57.156235665862923517",
      "-59.597960355475491248",
      "14.136097974741747174",
      "-0.49191381609762019978",
      "0.33994649984811888699e-4",
      "0.46523628927048575665e-4",
      "-0.98374475304879564677e-4",
      "0.15808870322491248884e-3",
      "-0.21026444172410488319e-3",
      "0.2174396181152126432e-3",
      "-0.16431810653676389022e-3",
      "0.84418223983852743293e-4",
      "-0.2619083840158140867e-4",
      "0.36899182659531622704e-5"
    ].map((x2) => ce.bignum(x2));
  });
  let x = GAMMA_P_LN[0];
  for (let i = GAMMA_P_LN.length - 1; i > 0; --i) {
    x = x.add(GAMMA_P_LN[i].div(z.add(i)));
  }
  const GAMMA_G_LN = ce.cache("gamma-g-ln", () => ce.bignum(607).div(128));
  const t = z.add(GAMMA_G_LN).add(ce._BIGNUM_HALF);
  return ce._BIGNUM_NEGATIVE_ONE.acos().mul(ce._BIGNUM_TWO).log().mul(ce._BIGNUM_HALF).add(
    t.log().mul(z.add(ce._BIGNUM_HALF)).minus(t).add(x.log()).minus(z.log())
  );
}
function gamma2(ce, z) {
  if (z.lessThan(ce._BIGNUM_HALF)) {
    const pi = ce._BIGNUM_NEGATIVE_ONE.acos();
    return pi.div(
      pi.mul(z).sin().mul(gamma2(ce, ce._BIGNUM_ONE.sub(z)))
    );
  }
  if (z.greaterThan(100))
    return lngamma2(ce, z).exp();
  z = z.sub(1);
  const LANCZOS_7_C = ce.cache("lanczos-7-c", () => {
    return [
      "0.99999999999980993227684700473478",
      "676.520368121885098567009190444019",
      "-1259.13921672240287047156078755283",
      "771.3234287776530788486528258894",
      "-176.61502916214059906584551354",
      "12.507343278686904814458936853",
      "-0.13857109526572011689554707",
      "9.984369578019570859563e-6",
      "1.50563273514931155834e-7"
    ].map((x2) => ce.bignum(x2));
  });
  let x = LANCZOS_7_C[0];
  for (let i = 1; i < gammaG2 + 2; i++)
    x = x.add(LANCZOS_7_C[i].div(z.add(i)));
  const t = z.add(gammaG2).add(ce._BIGNUM_HALF);
  return ce._BIGNUM_NEGATIVE_ONE.acos().times(ce._BIGNUM_TWO).sqrt().mul(x.mul(t.neg().exp()).mul(t.pow(z.add(ce._BIGNUM_HALF))));
}
function isInMachineRange(d) {
  if (!d.isFinite())
    return true;
  if (d.d.length > 3 || d.d.length === 3 && d.d[0] >= 90)
    return false;
  /* @__PURE__ */ console.assert(d.precision() <= 16);
  return d.e < 308 && d.e > -306;
}

// src/compute-engine/boxed-expression/order.ts
var import_complex6 = __toESM(require_complex());

// src/compute-engine/symbolic/polynomials.ts
function totalDegree(expr) {
  if (expr.head === "Power" && expr.op2.numericValue !== null) {
    const deg = asSmallInteger(expr.op2);
    if (deg !== null && deg > 0)
      return deg;
    return 1;
  }
  if (expr.head === "Multiply") {
    let deg = 1;
    for (const arg of expr.ops) {
      const t = totalDegree(arg);
      if (t > 1)
        deg = deg + t;
    }
    return deg;
  }
  return 1;
}
function maxDegree(expr) {
  if (expr.head === "Power" && expr.op2.numericValue !== null) {
    const deg = asSmallInteger(expr.op2);
    if (deg !== null && deg > 0)
      return deg;
    return 1;
  }
  if (expr.head === "Multiply") {
    let deg = 1;
    for (const arg of expr.ops)
      deg = Math.max(deg, totalDegree(arg));
    return deg;
  }
  return 1;
}
function lex(expr) {
  if (expr.symbol)
    return expr.symbol;
  if (expr.ops) {
    const h = typeof expr.head === "string" ? expr.head : lex(expr.head);
    return h + '"' + expr.ops.map((x) => lex(x)).filter((x) => x.length > 0).join('"');
  }
  return "";
}

// src/compute-engine/boxed-expression/order.ts
var DEFAULT_COMPLEXITY = 1e5;
function sortAdd(ce, ops2) {
  return ops2.sort((a, b) => {
    const aLex = lex(a);
    const bLex = lex(b);
    if (!aLex && !bLex)
      return order(a, b);
    if (!aLex)
      return 1;
    if (!bLex)
      return -1;
    if (aLex < bLex)
      return -1;
    if (aLex > bLex)
      return 1;
    const aTotalDeg = totalDegree(a);
    const bTotalDeg = totalDegree(b);
    if (aTotalDeg !== bTotalDeg)
      return bTotalDeg - aTotalDeg;
    const aMaxDeg = maxDegree(a);
    const bMaxDeg = maxDegree(b);
    if (aMaxDeg !== bMaxDeg)
      return aMaxDeg - bMaxDeg;
    return order(a, b);
  });
}
function order(a, b) {
  if (a === b)
    return 0;
  if (a.numericValue !== null && a.numericValue === b.numericValue)
    return 0;
  const af = asFloat(a);
  if (af !== null) {
    const bf = asFloat(b);
    if (bf !== null)
      return af - bf;
    return -1;
  }
  if (a.numericValue instanceof import_complex6.default) {
    if (b.numericValue instanceof import_complex6.default) {
      if (a.numericValue.re === b.numericValue.re) {
        if (Math.abs(a.numericValue.im) === Math.abs(b.numericValue.im)) {
          return a.numericValue.im - b.numericValue.im;
        }
        return Math.abs(a.numericValue.im) - Math.abs(b.numericValue.im);
      }
      return a.numericValue.re - b.numericValue.re;
    }
    if (b.numericValue !== null)
      return 1;
    return -1;
  }
  if (a.numericValue) {
    if (b.numericValue) {
      return 1;
    }
    return -1;
  }
  if (a.head === "Sqrt" && a.op1.numericValue) {
    if (b.head === "Sqrt" && b.op1.numericValue)
      return order(a.op1, b.op1);
    return -1;
  }
  if (a.symbol) {
    if (b.symbol) {
      if (a.symbol === b.symbol)
        return 0;
      return a.symbol > b.symbol ? 1 : -1;
    }
    if (b.numericValue !== null)
      return 1;
    return -1;
  }
  if (a.ops) {
    if (b.ops) {
      const aComplexity = a.functionDefinition?.complexity ?? DEFAULT_COMPLEXITY;
      const bComplexity = b.functionDefinition?.complexity ?? DEFAULT_COMPLEXITY;
      if (aComplexity === bComplexity) {
        if (typeof a.head === "string" && typeof b.head === "string") {
          if (a.head === b.head) {
            return getLeafCount(a) - getLeafCount(b);
          }
          if (a.head < b.head)
            return 1;
          return -1;
        }
        return getLeafCount(a) - getLeafCount(b);
      }
      return aComplexity - bComplexity;
    }
    if (b.numericValue !== null || b.symbol)
      return 1;
    return -1;
  }
  if (a.string) {
    if (b.string) {
      if (a.string.length !== b.string.length)
        return b.string.length - a.string.length;
      if (b.string < a.string)
        return -1;
      if (a.string > b.string)
        return 1;
      return 0;
    }
    if (b.keys)
      return -1;
    return 1;
  }
  if (a.keys && b.keys) {
    if (a.keysCount !== b.keysCount)
      return b.keysCount - a.keysCount;
    let bComplexity = 0;
    let aComplexity = 0;
    for (const key of b.keys)
      bComplexity += b.getKey(key).complexity ?? DEFAULT_COMPLEXITY;
    for (const key of a.keys)
      aComplexity += a.getKey(key).complexity ?? DEFAULT_COMPLEXITY;
    return aComplexity - bComplexity;
  }
  return (a.complexity ?? DEFAULT_COMPLEXITY) - (b.complexity ?? DEFAULT_COMPLEXITY);
}
function getLeafCount(expr) {
  if (expr.keys !== null)
    return 1 + expr.keysCount;
  if (!expr.ops)
    return 1;
  return (typeof expr.head === "string" ? 1 : getLeafCount(expr.head)) + [...expr.ops].reduce((acc, x) => acc + getLeafCount(x), 0);
}

// src/compute-engine/symbolic/product.ts
var import_complex7 = __toESM(require_complex());
var Product = class {
  constructor(ce, xs, options) {
    // Other terms of the product, `term` is the key
    this._terms = [];
    this._hasInfinity = false;
    this._hasZero = false;
    // If `false`, the running products are not calculated
    this._isCanonical = true;
    options ?? (options = {});
    if (!("canonical" in options))
      options.canonical = true;
    this._isCanonical = options.canonical;
    this.engine = ce;
    this._sign = 1;
    this._rational = bignumPreferred(ce) ? [BigInt(1), BigInt(1)] : [1, 1];
    this._complex = import_complex7.default.ONE;
    this._bignum = ce._BIGNUM_ONE;
    this._number = 1;
    if (xs)
      for (const x of xs)
        this.addTerm(x);
  }
  get isEmpty() {
    if (!this._isCanonical)
      return this._terms.length === 0;
    return this._terms.length === 0 && this._hasInfinity === false && this._hasZero === false && this._sign === 1 && isRationalOne(this._rational) && // isRationalOne(this._squareRootRational) &&
    this._complex.re === 1 && this._complex.im === 0 && this._bignum.eq(this.engine._BIGNUM_ONE) && this._number === 1;
  }
  /**
   * Add a term to the product.
   *
   * If `this._isCanonical` a running product of exact terms is kept.
   * Otherwise, terms and their exponent are tallied.
   */
  addTerm(term) {
    /* @__PURE__ */ console.assert(term.isCanonical);
    if (term.head === "Multiply") {
      for (const t of term.ops)
        this.addTerm(t);
      return;
    }
    if (this._isCanonical) {
      if (term.isNothing)
        return;
      if (term.numericValue !== null) {
        if (term.isOne)
          return;
        if (term.isZero) {
          this._hasZero = true;
          return;
        }
        if (term.isNegativeOne) {
          this._sign *= -1;
          return;
        }
        if (term.isInfinity) {
          this._hasInfinity = true;
          if (term.isNegative)
            this._sign *= -1;
          return;
        }
        let num = term.numericValue;
        if (typeof num === "number") {
          if (num < 0) {
            this._sign *= -1;
            num = -num;
          }
          if (Number.isInteger(num))
            this._rational = mul2(this._rational, [num, 1]);
          else if (bignumPreferred(this.engine))
            this._bignum = this._bignum.mul(num);
          else
            this._number *= num;
          return;
        }
        if (num instanceof decimal_default) {
          if (num.isNegative()) {
            this._sign *= -1;
            num = num.neg();
          }
          if (num.isInteger())
            this._rational = mul2(this._rational, [bigint(num), BigInt(1)]);
          else if (bignumPreferred(this.engine))
            this._bignum = this._bignum.mul(num);
          else
            this._number *= num.toNumber();
          return;
        }
        if (num instanceof import_complex7.default) {
          this._complex = this._complex.mul(num);
          return;
        }
        if (isRational(num)) {
          this._rational = mul2(this._rational, num);
          if (isNeg(this._rational)) {
            this._sign *= -1;
            this._rational = neg(this._rational);
          }
          return;
        }
      }
    }
    let rest = term;
    if (this._isCanonical) {
      let coef;
      [coef, rest] = asCoefficient(term);
      this._rational = mul2(this._rational, coef);
      if (isNeg(this._rational)) {
        this._sign *= -1;
        this._rational = neg(this._rational);
      }
    }
    if (rest.numericValue !== null && rest.isOne)
      return;
    let exponent = [1, 1];
    if (rest.head === "Power") {
      const r = asRational(rest.op2);
      if (r) {
        exponent = r;
        rest = rest.op1;
      }
    } else if (rest.head === "Divide") {
      this.addTerm(rest.op1);
      exponent = [-1, 1];
      rest = rest.op2;
    }
    let found = false;
    for (const x of this._terms) {
      if (x.term.isSame(rest)) {
        x.exponent = add2(x.exponent, exponent);
        found = true;
        break;
      }
    }
    if (!found)
      this._terms.push({ term: rest, exponent });
  }
  unitTerms(mode) {
    const ce = this.engine;
    if (mode === "numeric") {
      if (!complexAllowed(ce) && this._complex.im !== 0)
        return null;
      if (bignumPreferred(ce)) {
        let b2 = ce._BIGNUM_ONE;
        if (!isRationalOne(this._rational)) {
          if (isBigRational(this._rational))
            b2 = ce.bignum(this._rational[0].toString()).div(ce.bignum(this._rational[1].toString()));
          else
            b2 = ce.bignum(this._rational[0]).div(this._rational[1]);
        }
        b2 = b2.mul(this._bignum).mul(this._sign * this._number);
        if (this._complex.im !== 0) {
          const z = this._complex.mul(b2.toNumber());
          if (z.equals(1))
            return [];
          return [{ exponent: [1, 1], terms: [ce.number(z)] }];
        }
        b2 = b2.mul(this._complex.re);
        if (b2.equals(1))
          return [];
        return [{ exponent: [1, 1], terms: [ce.number(b2)] }];
      }
      let n2 = 1;
      if (!isRationalOne(this._rational)) {
        if (isBigRational(this._rational))
          n2 = Number(this._rational[0]) / Number(this._rational[1]);
        else
          n2 = this._rational[0] / this._rational[1];
      }
      n2 *= this._sign * this._number * this._bignum.toNumber();
      if (this._complex.im !== 0) {
        const z = this._complex.mul(n2);
        if (z.equals(1))
          return [];
        return [{ exponent: [1, 1], terms: [ce.number(z)] }];
      }
      n2 *= this._complex.re;
      if (n2 === 1)
        return [];
      return [{ exponent: [1, 1], terms: [ce.number(n2)] }];
    }
    const xs = [];
    const unitTerms = [];
    if (this._hasInfinity)
      unitTerms.push(ce._POSITIVE_INFINITY);
    this._rational = reducedRational(this._rational);
    if (this._complex.re !== 1 || this._complex.im !== 0) {
      if (this._complex.im === 0)
        this._number *= Math.abs(this._complex.re);
      if (this._complex.re < 0)
        this._rational = neg(this._rational);
      else {
        unitTerms.push(ce.number(this._complex));
      }
    }
    let n = this._sign * this._number;
    let b = this._bignum;
    if (!isRationalOne(this._rational)) {
      if (mode === "rational") {
        if (machineNumerator(this._rational) !== 1) {
          if (isBigRational(this._rational))
            b = b.mul(ce.bignum(this._rational[0]));
          else
            n *= this._rational[0];
        }
        if (machineDenominator(this._rational) !== 1)
          xs.push({
            exponent: [-1, 1],
            terms: [ce.number(this._rational[1])]
          });
      } else {
        if (n === -1) {
          unitTerms.push(ce.number(neg(this._rational)));
          n = 1;
        } else
          unitTerms.push(ce.number(this._rational));
      }
    }
    if (!b.equals(ce._BIGNUM_ONE))
      unitTerms.push(ce.number(b.mul(n)));
    else if (n !== 1)
      unitTerms.push(ce.number(n));
    if (unitTerms.length > 0)
      xs.push({ exponent: [1, 1], terms: unitTerms });
    return xs;
  }
  /** The terms of the product, grouped by degrees.
   *
   * If `mode` is `rational`, rationals are split into separate numerator and
   * denominator, so that a rational expression can be created later
   * If `mode` is `expression`, a regular expression is returned, without
   * splitting rationals
   * If `mode` is `numeric`, the literals are combined into one expression
   *
   */
  groupedByDegrees(options) {
    options ?? (options = {});
    if (!("mode" in options))
      options.mode = "expression";
    const ce = this.engine;
    if (options.mode === "numeric") {
      if (this._complex.im !== 0 && !complexAllowed(ce))
        return null;
      if (this._hasInfinity)
        return [{ exponent: [1, 1], terms: [ce._POSITIVE_INFINITY] }];
    }
    const xs = this.unitTerms(options.mode ?? "expression");
    if (xs === null)
      return null;
    for (const t of this._terms) {
      const exponent = reducedRational(t.exponent);
      if (exponent[0] === 0)
        continue;
      let found = false;
      for (const x of xs) {
        if (exponent[0] === x.exponent[0] && exponent[1] === x.exponent[1]) {
          x.terms.push(t.term);
          found = true;
          break;
        }
      }
      if (!found)
        xs.push({ exponent, terms: [t.term] });
    }
    return xs;
  }
  asExpression(mode = "evaluate") {
    const ce = this.engine;
    if (this._hasInfinity) {
      if (this._hasZero)
        return ce._NAN;
      if (this._terms.length === 0) {
        if (machineNumerator(this._rational) > 0)
          return ce._POSITIVE_INFINITY;
        return ce._NEGATIVE_INFINITY;
      }
    }
    if (this._hasZero)
      return ce._ZERO;
    const groupedTerms = this.groupedByDegrees({
      mode: mode === "N" ? "numeric" : "expression"
    });
    if (groupedTerms === null)
      return ce._NAN;
    const terms = termsAsExpressions(ce, groupedTerms);
    if (terms.length === 0)
      return ce._ONE;
    if (terms.length === 1)
      return terms[0];
    return this.engine._fn("Multiply", terms);
  }
  /** The product, expressed as a numerator and denominator */
  asNumeratorDenominator() {
    const xs = this.groupedByDegrees({ mode: "rational" });
    if (xs === null)
      return [this.engine._NAN, this.engine._NAN];
    const xsNumerator = [];
    const xsDenominator = [];
    for (const x of xs)
      if (x.exponent[0] >= 0)
        xsNumerator.push(x);
      else
        xsDenominator.push({
          exponent: neg(x.exponent),
          terms: x.terms
        });
    const ce = this.engine;
    const numeratorTerms = termsAsExpressions(ce, xsNumerator);
    let numerator = ce._ONE;
    if (numeratorTerms.length === 1)
      numerator = numeratorTerms[0];
    else if (numeratorTerms.length > 0)
      numerator = ce._fn("Multiply", numeratorTerms);
    const denominatorTerms = termsAsExpressions(ce, xsDenominator);
    let denominator = ce._ONE;
    if (denominatorTerms.length === 1)
      denominator = denominatorTerms[0];
    else if (denominatorTerms.length > 0)
      denominator = ce._fn("Multiply", denominatorTerms);
    return [numerator, denominator];
  }
  asRationalExpression() {
    const [numerator, denominator] = this.asNumeratorDenominator();
    if (denominator.numericValue !== null) {
      if (denominator.isOne)
        return numerator;
      if (denominator.isNegativeOne)
        return this.engine.neg(numerator);
    }
    return this.engine._fn("Divide", [numerator, denominator]);
  }
};
function degreeKey(exponent) {
  if (isRationalOne(exponent))
    return 0;
  const [n, d] = [machineNumerator(exponent), machineDenominator(exponent)];
  if (n > 0 && Number.isInteger(n / d))
    return 1;
  if (n > 0)
    return 2;
  if (Number.isInteger(n / d))
    return 3;
  return 4;
}
function degreeOrder(a, b) {
  const keyA = degreeKey(a.exponent);
  const keyB = degreeKey(b.exponent);
  if (keyA !== keyB)
    return keyA - keyB;
  const [a_n, a_d] = [
    machineNumerator(a.exponent),
    machineDenominator(a.exponent)
  ];
  const [b_n, b_d] = [
    machineNumerator(b.exponent),
    machineDenominator(b.exponent)
  ];
  return a_n / a_d - b_n / b_d;
}
function termsAsExpressions(ce, terms) {
  const result = terms.sort(degreeOrder).map((x) => {
    const t = flattenOps(x.terms, "Multiply");
    const base = t.length <= 1 ? t[0] : ce._fn("Multiply", t.sort(order));
    if (isRationalOne(x.exponent))
      return base;
    return ce.pow(base, x.exponent);
  });
  return flattenOps(result, "Multiply") ?? result;
}

// src/compute-engine/boxed-expression/serialize.ts
function subtract(ce, a, b, metadata) {
  if (a.numericValue !== null) {
    if (isRational(a.numericValue)) {
      if (machineNumerator(a.numericValue) < 0) {
        return serializeJsonFunction(
          ce,
          "Subtract",
          [b, ce.number(neg(a.numericValue))],
          metadata
        );
      }
      return null;
    }
    const t0 = asSmallInteger(a);
    if (t0 !== null && t0 < 0)
      return serializeJsonFunction(
        ce,
        "Subtract",
        [b, ce.number(-t0)],
        metadata
      );
  }
  if (a.head === "Negate")
    return serializeJsonFunction(ce, "Subtract", [b, a.op1], metadata);
  return null;
}
function serializeJsonCanonicalFunction(ce, head2, args, metadata) {
  const exclusions = ce.jsonSerializationOptions.exclude;
  if (head2 === "Add" && args.length === 2 && !exclusions.includes("Subtract")) {
    const sub2 = subtract(ce, args[0], args[1], metadata) ?? subtract(ce, args[1], args[0], metadata);
    if (sub2)
      return sub2;
  }
  if (head2 === "Divide" && args.length === 2 && exclusions.includes("Divide")) {
    return serializeJsonFunction(
      ce,
      "Multiply",
      [args[0], ce._fn("Power", [args[1], ce._NEGATIVE_ONE])],
      metadata
    );
  }
  if (head2 === "Multiply" && !exclusions.includes("Negate")) {
    if (asFloat(args[0]) === -1)
      return serializeJsonFunction(
        ce,
        "Negate",
        [ce._fn("Multiply", args.slice(1))],
        metadata
      );
  }
  if (head2 === "Multiply" && !exclusions.includes("Divide")) {
    const result = new Product(ce, args, {
      canonical: false
    }).asRationalExpression();
    if (result.head === "Divide")
      return serializeJsonFunction(ce, result.head, result.ops, metadata);
  }
  if (head2 === "Power") {
    if (!exclusions.includes("Exp") && args[0]?.symbol === "ExponentialE")
      return serializeJsonFunction(ce, "Exp", [args[1]], metadata);
    if (args[1]?.numericValue !== null) {
      const exp2 = asSmallInteger(args[1]);
      if (exp2 === 2 && !exclusions.includes("Square"))
        return serializeJsonFunction(ce, "Square", [args[0]], metadata);
      if (exp2 !== null && exp2 < 0 && !exclusions.includes("Divide")) {
        return serializeJsonFunction(
          ce,
          "Divide",
          [ce._ONE, exp2 === -1 ? args[0] : ce.pow(args[0], -exp2)],
          metadata
        );
      }
      const r = args[1].numericValue;
      if (!exclusions.includes("Sqrt") && r === 0.5)
        return serializeJsonFunction(ce, "Sqrt", [args[0]], metadata);
      if (!exclusions.includes("Sqrt") && r === -0.5)
        return serializeJsonFunction(
          ce,
          "Divide",
          [ce._ONE, ce._fn("Sqrt", [args[0]])],
          metadata
        );
      if (isRational(r)) {
        const n = machineNumerator(r);
        const d = machineDenominator(r);
        if (n === 1) {
          if (!exclusions.includes("Sqrt") && d === 2)
            return serializeJsonFunction(ce, "Sqrt", [args[0]], metadata);
          if (!exclusions.includes("Root"))
            return serializeJsonFunction(
              ce,
              "Root",
              [args[0], ce.number(r[1])],
              metadata
            );
        }
        if (n === -1) {
          if (!exclusions.includes("Sqrt") && d === 2)
            return serializeJsonFunction(
              ce,
              "Divide",
              [ce._ONE, ce._fn("Sqrt", [args[0]])],
              metadata
            );
          if (!exclusions.includes("Root"))
            return serializeJsonFunction(
              ce,
              "Divide",
              [ce._ONE, ce._fn("Root", [args[0], ce.number(r[1])])],
              metadata
            );
        }
      }
    }
  }
  return serializeJsonFunction(ce, head2, args, metadata);
}
function serializeJsonFunction(ce, head2, args, metadata) {
  const exclusions = ce.jsonSerializationOptions.exclude;
  if ((head2 === "Rational" || head2 === "Divide") && args.length === 2 && asSmallInteger(args[0]) === 1 && asSmallInteger(args[1]) === 2 && !exclusions.includes("Half")) {
    return serializeJsonSymbol(ce, "Half", {
      ...metadata,
      wikidata: "Q39373172"
    });
  }
  if (args.length === 1) {
    const num0 = args[0].numericValue;
    if (head2 === "Negate" && num0 !== null) {
      if (typeof num0 === "number")
        return serializeJsonNumber(ce, -num0);
      if (num0 instanceof decimal_default)
        return serializeJsonNumber(ce, num0.neg());
      if (num0 instanceof import_complex8.Complex)
        return serializeJsonNumber(ce, num0.neg());
      if (isRational(num0))
        return serializeJsonNumber(ce, neg(num0));
    }
  }
  if (typeof head2 === "string" && exclusions.includes(head2)) {
    if (head2 === "Rational" && args.length === 2)
      return serializeJsonFunction(ce, "Divide", args, metadata);
    if (head2 === "Complex" && args.length === 2)
      return serializeJsonFunction(
        ce,
        "Add",
        [args[0], ce._fn("Multiply", [args[1], ce.symbol("ImaginaryUnit")])],
        metadata
      );
    if (head2 === "Sqrt" && args.length === 1)
      return serializeJsonFunction(
        ce,
        "Power",
        [args[0], exclusions.includes("Half") ? ce.number([1, 2]) : ce._HALF],
        metadata
      );
    if (head2 === "Root" && args.length === 2 && args[1].numericValue !== null) {
      const n = asSmallInteger(args[1]);
      if (n === 2)
        return serializeJsonFunction(ce, "Sqrt", [args[0]]);
      if (n !== null) {
        if (n < 0)
          return serializeJsonFunction(
            ce,
            "Divide",
            [ce._ONE, ce._fn("Power", [args[0], ce.number([1, -n])])],
            metadata
          );
        return serializeJsonFunction(
          ce,
          "Power",
          [args[0], ce.number([1, -n])],
          metadata
        );
      }
    }
    if (head2 === "Square" && args.length === 1)
      return serializeJsonFunction(
        ce,
        "Power",
        [args[0], ce.number(2)],
        metadata
      );
    if (head2 === "Exp" && args.length === 1)
      return serializeJsonFunction(
        ce,
        "Power",
        [ce.symbol("ExponentialE"), args[0]],
        metadata
      );
    if (head2 === "Subtract" && args.length === 2)
      return serializeJsonFunction(
        ce,
        "Add",
        [args[0], ce._fn("Negate", [args[1]])],
        metadata
      );
    if (head2 === "Subtract" && args.length === 1)
      return serializeJsonFunction(ce, "Negate", args, metadata);
  }
  if (head2 === "Add" && args.length === 2 && !exclusions.includes("Subtract")) {
    if (args[1].numericValue !== null) {
      const t1 = asSmallInteger(args[1]);
      if (t1 !== null && t1 < 0)
        return serializeJsonFunction(
          ce,
          "Subtract",
          [args[0], ce.number(-t1)],
          metadata
        );
    }
    if (args[1].head === "Negate") {
      return serializeJsonFunction(
        ce,
        "Subtract",
        [args[0], args[1].op1],
        metadata
      );
    }
  }
  if (head2 === "Tuple") {
    if (args.length === 1 && !exclusions.includes("Single"))
      return serializeJsonFunction(ce, "Single", args, metadata);
    if (args.length === 2 && !exclusions.includes("Pair"))
      return serializeJsonFunction(ce, "Pair", args, metadata);
    if (args.length === 3 && !exclusions.includes("Triple"))
      return serializeJsonFunction(ce, "Triple", args, metadata);
  }
  const jsonHead = typeof head2 === "string" ? _escapeJsonString(head2) : head2.json;
  const fn = [jsonHead, ...args.map((x) => x.json)];
  const md = { ...metadata ?? {} };
  if (ce.jsonSerializationOptions.metadata.includes("latex")) {
    md.latex = _escapeJsonString(md.latex ?? ce.serialize({ fn }));
  } else
    md.latex = "";
  if (!ce.jsonSerializationOptions.metadata.includes("wikidata"))
    md.wikidata = "";
  if (!md.latex && !md.wikidata && ce.jsonSerializationOptions.shorthands.includes("function"))
    return fn;
  if (md.latex && md.wikidata)
    return { fn, latex: md.latex, wikidata: md.wikidata };
  if (md.latex)
    return { fn, latex: md.latex };
  if (md.wikidata)
    return { fn, wikidata: md.wikidata };
  return { fn };
}
function serializeJsonString(ce, s) {
  s = _escapeJsonString(s);
  if (ce.jsonSerializationOptions.shorthands.includes("string"))
    return `'${s}'`;
  return { str: s };
}
function serializeJsonSymbol(ce, sym, metadata) {
  if (sym === "Half" && ce.jsonSerializationOptions.exclude.includes("Half")) {
    return serializeJsonNumber(ce, [1, 2], metadata);
  }
  metadata = { ...metadata };
  if (ce.jsonSerializationOptions.metadata.includes("latex")) {
    metadata.latex = metadata.latex ?? ce.serialize({ sym });
    if (metadata.latex !== void 0)
      metadata.latex = _escapeJsonString(metadata.latex);
  } else
    metadata.latex = void 0;
  if (ce.jsonSerializationOptions.metadata.includes("wikidata")) {
    if (metadata.wikidata === void 0) {
      const wikidata = ce.lookupSymbol(sym)?.wikidata;
      if (wikidata !== void 0)
        metadata.wikidata = _escapeJsonString(wikidata);
    }
  } else
    metadata.wikidata = void 0;
  sym = _escapeJsonString(sym);
  if (metadata.latex === void 0 && metadata.wikidata === void 0 && ce.jsonSerializationOptions.shorthands.includes("symbol"))
    return sym;
  if (metadata.latex !== void 0 && metadata.wikidata !== void 0)
    return { sym, latex: metadata.latex, wikidata: metadata.wikidata };
  if (metadata.latex !== void 0)
    return { sym, latex: metadata.latex };
  if (metadata.wikidata !== void 0)
    return { sym, wikidata: metadata.wikidata };
  return { sym };
}
function serializeJsonNumber(ce, value, metadata) {
  metadata = { ...metadata };
  if (!ce.jsonSerializationOptions.metadata.includes("latex"))
    metadata.latex = void 0;
  const shorthandAllowed = metadata.latex === void 0 && metadata.wikidata === void 0 && !ce.jsonSerializationOptions.metadata.includes("latex") && ce.jsonSerializationOptions.shorthands.includes("number");
  let num = "";
  if (value instanceof decimal_default) {
    if (value.isNaN())
      num = "NaN";
    else if (!value.isFinite())
      num = value.isPositive() ? "+Infinity" : "-Infinity";
    else {
      if (shorthandAllowed && isInMachineRange(value))
        return value.toNumber();
      if (value.isInteger() && value.e < value.precision() + 4)
        num = value.toFixed(0);
      else {
        const precision = ce.jsonSerializationOptions.precision;
        const s = precision === "max" ? value.toString() : value.toPrecision(
          precision === "auto" ? ce.precision : precision
        );
        num = repeatingDecimals(ce, s);
        if (shorthandAllowed) {
          const val = value.toNumber();
          if (val.toString() === num)
            return val;
        }
      }
    }
    if (ce.jsonSerializationOptions.metadata.includes("latex"))
      metadata.latex = metadata.latex ?? ce.serialize({ num });
    return metadata.latex !== void 0 ? { num, latex: metadata.latex } : shorthandAllowed ? num : { num };
  }
  if (value instanceof import_complex8.Complex) {
    if (value.isInfinite())
      return serializeJsonSymbol(ce, "ComplexInfinity", metadata);
    if (value.isNaN()) {
      num = "NaN";
      if (ce.jsonSerializationOptions.metadata.includes("latex"))
        metadata.latex = metadata.latex ?? ce.serialize({ num });
      return metadata.latex !== void 0 ? { num, latex: metadata.latex } : { num };
    }
    return serializeJsonFunction(
      ce,
      "Complex",
      [ce.number(value.re), ce.number(value.im)],
      {
        ...metadata,
        wikidata: "Q11567"
      }
    );
  }
  if (isRational(value)) {
    if (shorthandAllowed && ce.jsonSerializationOptions.shorthands.includes("function") && isMachineRational(value)) {
      return ["Rational", value[0], value[1]];
    }
    return serializeJsonFunction(
      ce,
      "Rational",
      [ce.number(value[0]), ce.number(value[1])],
      { ...metadata }
    );
  }
  if (Number.isNaN(value))
    num = "NaN";
  else if (!Number.isFinite(value))
    num = value > 0 ? "+Infinity" : "-Infinity";
  else {
    if (shorthandAllowed)
      return value;
    num = repeatingDecimals(ce, value.toString());
  }
  if (ce.jsonSerializationOptions.metadata.includes("latex"))
    metadata.latex = metadata.latex ?? ce.serialize({ num });
  return metadata.latex !== void 0 ? { num, latex: metadata.latex } : { num };
}
function _escapeJsonString(s) {
  return s;
}
function repeatingDecimals(ce, s) {
  if (!ce.jsonSerializationOptions.repeatingDecimals)
    return s;
  let [_, wholepart, fractionalPart, exponent] = s.match(/^(.*)\.([0-9]+)([e|E][-+]?[0-9]+)?$/) ?? [];
  if (!fractionalPart)
    return s.toLowerCase();
  const lastDigit = fractionalPart[fractionalPart.length - 1];
  fractionalPart = fractionalPart.slice(0, -1);
  const MAX_REPEATING_PATTERN_LENGTH = 16;
  let prefix = "";
  for (let i = 0; i < fractionalPart.length - MAX_REPEATING_PATTERN_LENGTH; i++) {
    prefix = fractionalPart.substring(0, i);
    for (let j = 0; j <= MAX_REPEATING_PATTERN_LENGTH; j++) {
      const repetend = fractionalPart.substring(i, i + j + 1);
      const times = Math.floor(
        (fractionalPart.length - prefix.length) / repetend.length
      );
      if (times < 3)
        break;
      if ((prefix + repetend.repeat(times + 1)).startsWith(fractionalPart)) {
        if (repetend === "0") {
          if (lastDigit === "0")
            return wholepart + "." + prefix + (exponent ?? "");
          return s;
        }
        return wholepart + "." + prefix + "(" + repetend + ")" + (exponent ?? "");
      }
    }
  }
  fractionalPart += lastDigit;
  while (fractionalPart.endsWith("0"))
    fractionalPart = fractionalPart.slice(0, -1);
  if (exponent)
    return `${wholepart}.${fractionalPart}${exponent.toLowerCase()}`;
  return `${wholepart}.${fractionalPart}`;
}

// src/compute-engine/boxed-expression/boxed-dictionary.ts
var BoxedDictionary = class _BoxedDictionary extends AbstractBoxedExpression {
  constructor(ce, dict, options) {
    options ?? (options = {});
    super(ce, options.metadata);
    this._value = /* @__PURE__ */ new Map();
    const canonical2 = options.canonical ?? true;
    for (const key of Object.keys(dict))
      this._value.set(key, ce.box(dict[key], { canonical: canonical2 }));
    ce._register(this);
  }
  unbind() {
    for (const [_k, v] of this._value)
      v.unbind();
    return void 0;
  }
  get hash() {
    let h = hashCode("Dictionary");
    for (const [k, v] of this._value)
      h ^= hashCode(k) ^ v.hash;
    return h;
  }
  get complexity() {
    return 97;
  }
  get head() {
    return "Dictionary";
  }
  get isPure() {
    return false;
  }
  getKey(key) {
    return this._value.get(key);
  }
  hasKey(key) {
    return this._value.has(key);
  }
  get keys() {
    return this._value.keys();
  }
  get keysCount() {
    return this._value.size;
  }
  has(x) {
    for (const [_k, v] of this._value)
      if (v.has(x))
        return true;
    return false;
  }
  get domain() {
    const result = ["Dictionary"];
    for (const [k, v] of this._value)
      result.push(["Tuple", k, v.domain]);
    return this.engine.domain(result);
  }
  get json() {
    if (this.engine.jsonSerializationOptions.shorthands.includes("dictionary")) {
      const dict = {};
      for (const key of this._value.keys())
        dict[key] = this._value.get(key).json;
      return { dict };
    }
    const kvs = [];
    for (const key of this._value.keys())
      kvs.push(
        this.engine._fn("KeyValuePair", [
          this.engine.string(key),
          this._value.get(key)
        ])
      );
    return serializeJsonFunction(this.engine, "Dictionary", kvs, {
      latex: this._latex
    });
  }
  /** Structural equality */
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedDictionary))
      return false;
    if (this._value.size !== rhs._value.size)
      return false;
    for (const [k, v] of this._value) {
      const rhsV = rhs.getKey(k);
      if (!rhsV || !v.isSame(rhsV))
        return false;
    }
    return true;
  }
  match(rhs, _options) {
    if (!(rhs instanceof _BoxedDictionary))
      return null;
    if (this._value.size !== rhs._value.size)
      return null;
    let result = {};
    for (const [k, v] of this._value) {
      const rhsV = rhs.getKey(k);
      if (!rhsV)
        return null;
      const m = v.match(rhsV);
      if (m === null)
        return null;
      result = { ...result, ...m };
    }
    return result;
  }
  /** Mathematical equality */
  isEqual(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedDictionary))
      return false;
    if (!rhs.keys || this._value.size !== rhs._value.size)
      return false;
    for (const [k, v] of this._value) {
      const rhsV = rhs.getKey(k);
      if (!rhsV || !v.isEqual(rhsV))
        return false;
    }
    return true;
  }
  apply(fn, head2) {
    const result = {};
    for (const key of this.keys)
      result[key] = this.engine.box(fn(this.getKey(key)));
    if (head2)
      return this.engine.fn(head2, [{ dict: result }]);
    return new _BoxedDictionary(this.engine, result);
  }
  evaluate(options) {
    return this.apply((x) => x.evaluate(options) ?? x);
  }
  get isCanonical() {
    return this._isCanonical;
  }
  set isCanonical(val) {
    this._isCanonical = val;
  }
  get canonical() {
    if (this.isCanonical)
      return this;
    const result = this.apply((x) => x.canonical);
    result.isCanonical = true;
    return result;
  }
  simplify(options) {
    if (!(options?.recursive ?? true))
      return this;
    return this.apply((x) => x.simplify(options) ?? x);
  }
  N(options) {
    return this.apply((x) => x.N(options));
  }
  replace(rules, options) {
    let changeCount = 0;
    const result = {};
    for (const key of this.keys) {
      const val = this.getKey(key);
      const newVal = val.replace(rules, options);
      if (newVal !== null)
        changeCount += 1;
      result[key] = newVal ?? val;
    }
    return changeCount === 0 ? null : new _BoxedDictionary(this.engine, result);
  }
  subs(sub2, options) {
    const result = {};
    for (const key of this.keys)
      result[key] = this.getKey(key).subs(sub2, options);
    return new _BoxedDictionary(this.engine, result, options);
  }
};

// src/compute-engine/boxed-expression/boxed-function.ts
var import_complex9 = __toESM(require_complex());

// src/compute-engine/simplify-rules.ts
var SIMPLIFY_RULES = [];

// src/compute-engine/boxed-expression/validate.ts
function validateArgumentCount(ce, ops2, count) {
  if (ops2.length === count)
    return ops2;
  const xs = [...ops2.slice(0, count)];
  let i = Math.min(count, ops2.length);
  while (i < count) {
    xs.push(ce.error("missing"));
    i += 1;
  }
  while (i < ops2.length) {
    xs.push(ce.error("unexpected-argument", ops2[i]));
    i += 1;
  }
  return xs;
}
function validateNumericArgs(ce, ops2, count) {
  if (!ce.strict)
    return ops2;
  let xs;
  if (count === void 0)
    xs = ops2;
  else {
    xs = [];
    for (let i = 0; i <= Math.max(count - 1, ops2.length - 1); i++) {
      if (i > count - 1)
        xs.push(ce.error("unexpected-argument", ops2[i]));
      else
        xs.push(
          ops2[i] !== void 0 ? ce.box(ops2[i]) : ce.error(["missing", "Number"])
        );
    }
  }
  return xs.map(
    (op3) => !op3.isValid || op3.isNumber ? op3 : ce.error(["incompatible-domain", "Number", op3.domain], op3)
  );
}
function validateSignature(sig, ops2, codomain) {
  const ce = sig.engine;
  if (!ce.strict)
    return ops2;
  const opsDomain = ops2.map((x) => x.domain);
  const targetSig = ce.domain([
    "Function",
    ...opsDomain,
    codomain ?? "Anything"
  ]);
  if (sig.isCompatible(targetSig))
    return null;
  const expectedArgs = sig.domainArgs.slice(0, -1);
  const count = Math.max(expectedArgs.length, opsDomain.length);
  let newOps = [];
  let rest = [...ops2];
  for (let i = 0; i <= count - 1; i++)
    [newOps, rest] = validateNextArgument(
      ce,
      expectedArgs[i],
      newOps,
      rest
    );
  while (newOps.length > 0 && newOps[newOps.length - 1].symbol === "Nothing")
    newOps.pop();
  return newOps;
}
function validateArgument(ce, arg, dom) {
  if (dom === void 0)
    return ce.error("unexpected-argument", arg);
  if (arg === void 0)
    return ce.error(["missing", dom]);
  if (!arg.isValid)
    return arg;
  if (arg?.domain.isCompatible(dom))
    return arg;
  return ce.error(["incompatible-domain", dom, arg.domain], arg);
}
function validateNextArgument(ce, dom, matched, ops2) {
  let next = ops2.shift();
  if (dom === void 0)
    return [[...matched, ce.error("unexpected-argument", next)], ops2];
  if (!Array.isArray(dom)) {
    if (!next)
      return [[...matched, ce.error(["missing", dom])], ops2];
    if (!next.domain.isCompatible(dom)) {
      return [
        [...matched, ce.error(["incompatible-domain", dom, next.domain], next)],
        ops2
      ];
    }
    return [[...matched, next], ops2];
  }
  const ctor = dom[0];
  if (next === void 0) {
    let valid = false;
    if (ctor === "Union") {
      for (let k = 1; k <= dom.length - 1; k++) {
        if (dom[k] === "Nothing") {
          valid = true;
          break;
        }
      }
    } else if (ctor === "Maybe")
      valid = true;
    if (valid)
      return [[...matched, ce.symbol("Nothing")], ops2];
    return [[...matched, ce.error(["missing", dom])], ops2];
  }
  if (ctor === "Union") {
    let found = false;
    for (let k = 1; k <= dom.length - 1; k++) {
      if (next.domain.isCompatible(dom[k])) {
        found = true;
        break;
      }
    }
    if (found)
      return [[...matched, next], ops2];
    return [
      [...matched, ce.error(["incompatible-domain", dom, next.domain], next)],
      ops2
    ];
  }
  if (ctor === "Sequence") {
    const seq = dom[1];
    if (!next || !next.domain.isCompatible(seq)) {
      return [
        [...matched, ce.error(["incompatible-domain", seq, next.domain], next)],
        ops2
      ];
    }
    let done = false;
    const result = [...matched, next];
    while (!done) {
      next = ops2.shift();
      if (!next)
        done = false;
      else if (!next.domain.isCompatible(seq)) {
        ops2.unshift(next);
        done = false;
      } else
        result.push(next);
    }
    return [result, ops2];
  }
  if (ctor === "Maybe") {
    if (next === void 0 || next.symbol === "Nothing")
      return [[...matched, ce.symbol("Nothing")], ops2];
    return validateNextArgument(ce, dom[1], matched, [next, ...ops2]);
  }
  console.error("Unhandled ctor", ctor);
  return [[...matched, next], ops2];
}
function validateArguments(ce, args, doms) {
  if (args.length === doms.length && args.every((x, i) => x.domain.isCompatible(doms[i])))
    return args;
  const xs = [];
  for (let i = 0; i <= doms.length - 1; i++)
    xs.push(validateArgument(ce, args[i], doms[i]));
  for (let i = doms.length; i <= args.length - 1; i++)
    xs.push(ce.error("unexpected-argument", args[i]));
  return xs;
}

// src/compute-engine/boxed-expression/boxed-function.ts
function cheapest(oldExpr, newExpr) {
  if (newExpr === null || newExpr === void 0)
    return oldExpr;
  if (oldExpr === newExpr)
    return oldExpr;
  const ce = oldExpr.engine;
  const boxedNewExpr = ce.box(newExpr);
  if (ce.costFunction(boxedNewExpr) <= 1.7 * ce.costFunction(oldExpr)) {
    return boxedNewExpr;
  }
  return oldExpr;
}
var BoxedFunction = class _BoxedFunction extends AbstractBoxedExpression {
  constructor(ce, head2, ops2, options) {
    options ?? (options = {});
    options.canonical ?? (options.canonical = false);
    super(ce, options.metadata);
    this._scope = ce.context;
    this._head = head2;
    this._ops = ops2;
    this._def = options.def ?? null;
    if (options.canonical) {
      if (!this._def)
        this._def = ce.lookupFunction(head2, ce.context);
      this._canonical = this;
    }
    this._codomain = null;
    if (!options.canonical) {
      this._codomain = ce.domain("Anything");
    } else {
      if (typeof this._head !== "string")
        this._codomain = this._head.domain.codomain;
      else if (this._def) {
        const sig = this._def.signature;
        if (typeof sig.codomain === "function") {
          this._codomain = sig.codomain(ce, this._ops) ?? null;
        } else {
          this._codomain = sig.codomain ?? null;
        }
      }
      if (!this._codomain)
        this._codomain = ce.defaultDomain ?? ce.domain("Void");
    }
    ce._register(this);
  }
  //
  // NON-CANONICAL OR CANONICAL OPERATIONS
  //
  // Those operations/properties can be applied to a canonical or
  // non-canonical expression
  //
  get hash() {
    if (this._hash !== void 0)
      return this._hash;
    let h = 0;
    for (const op3 of this._ops)
      h = h << 1 ^ op3.hash | 0;
    if (typeof this._head === "string")
      h = h ^ hashCode(this._head) | 0;
    else
      h = h ^ this._head.hash | 0;
    this._hash = h;
    return h;
  }
  get isCanonical() {
    return this._canonical === this;
  }
  set isCanonical(val) {
    this._canonical = val ? this : void 0;
  }
  get isPure() {
    if (this._isPure !== void 0)
      return this._isPure;
    if (!this.isCanonical) {
      this._isPure = false;
      return false;
    }
    let result = void 0;
    if (this.functionDefinition?.pure !== void 0)
      result = this.functionDefinition.pure;
    if (result !== false)
      result = this._ops.every((x) => x.isPure);
    this._isPure = result;
    return result;
  }
  get json() {
    if (this.isValid && this._canonical === this)
      return serializeJsonCanonicalFunction(
        this.engine,
        this._head,
        this._ops,
        { latex: this._latex, wikidata: this._wikidata }
      );
    return serializeJsonFunction(this.engine, this._head, this._ops, {
      latex: this._latex,
      wikidata: this._wikidata
    });
  }
  get scope() {
    return this._scope;
  }
  get head() {
    return this._head;
  }
  get ops() {
    return this._ops;
  }
  get nops() {
    return this._ops.length;
  }
  get op1() {
    return this._ops[0] ?? this.engine.symbol("Nothing");
  }
  get op2() {
    return this._ops[1] ?? this.engine.symbol("Nothing");
  }
  get op3() {
    return this._ops[2] ?? this.engine.symbol("Nothing");
  }
  get isValid() {
    if (this._head === "Error")
      return false;
    if (typeof this._head !== "string" && !this._head.isValid)
      return false;
    return this._ops.every((x) => x.isValid);
  }
  get canonical() {
    if (this._canonical)
      return this._canonical;
    this._canonical = this.isValid ? makeCanonicalFunction(this.engine, this._head, this._ops) : this;
    return this._canonical;
  }
  *map(fn) {
    let i = 0;
    while (i < this._ops.length)
      yield fn(this._ops[i++]);
  }
  subs(sub2, options) {
    options ?? (options = {});
    if (!("canonical" in options))
      options.canonical = true;
    const ops2 = this._ops.map((x) => x.subs(sub2, options));
    if (options.canonical && ops2.every((x) => x.isValid))
      return makeCanonicalFunction(this.engine, this._head, ops2);
    return new _BoxedFunction(this.engine, this._head, ops2, {
      canonical: false
    });
  }
  replace(rules, options) {
    return replace(this, rules, options);
  }
  has(x) {
    if (typeof this._head === "string") {
      if (typeof x === "string") {
        if (this._head === x)
          return true;
      } else if (x.includes(this._head))
        return true;
    }
    for (const arg of this._ops)
      if (arg.has(x))
        return true;
    return false;
  }
  /** `isSame` is structural/symbolic equality */
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedFunction))
      return false;
    if (this.nops !== rhs.nops)
      return false;
    if (typeof this.head === "string") {
      if (this.head !== rhs.head)
        return false;
    } else {
      if (typeof rhs.head === "string")
        return false;
      else if (!rhs.head || !this.head.isSame(rhs.head))
        return false;
    }
    const lhsTail = this._ops;
    const rhsTail = rhs._ops;
    for (let i = 0; i < lhsTail.length; i++)
      if (!lhsTail[i].isSame(rhsTail[i]))
        return false;
    return true;
  }
  match(rhs, options) {
    if (!(rhs instanceof _BoxedFunction))
      return null;
    let result = {};
    if (typeof this.head === "string") {
      if (this.head !== rhs.head)
        return null;
    } else {
      if (typeof rhs.head === "string")
        return null;
      else {
        if (!rhs.head)
          return null;
        const m = this.head.match(rhs.head, options);
        if (m === null)
          return null;
        result = { ...result, ...m };
      }
    }
    const lhsTail = this._ops;
    const rhsTail = rhs._ops;
    for (let i = 0; i < lhsTail.length; i++) {
      const m = lhsTail[i].match(rhsTail[i], options);
      if (m === null)
        return null;
      result = { ...result, ...m };
    }
    return result;
  }
  //
  // CANONICAL OPERATIONS
  //
  // These operations apply only to canonical expressions
  //
  unbind() {
    this._value = void 0;
    this._numericValue = void 0;
  }
  get wikidata() {
    if (!this.isCanonical)
      return void 0;
    return this._wikidata ?? this.functionDefinition?.wikidata ?? void 0;
  }
  get description() {
    if (!this.isCanonical)
      return void 0;
    const def = this.functionDefinition;
    if (!def)
      return [];
    if (!def.description)
      return void 0;
    if (typeof def.description === "string")
      return [def.description];
    return def.description;
  }
  get url() {
    if (!this.isCanonical)
      return "";
    return this.functionDefinition?.url ?? void 0;
  }
  get complexity() {
    if (!this.isCanonical)
      return void 0;
    return this.functionDefinition?.complexity ?? DEFAULT_COMPLEXITY;
  }
  get functionDefinition() {
    if (!this.isCanonical)
      return void 0;
    if (this._def !== null)
      return this._def;
    return void 0;
  }
  bind(_scope) {
  }
  get value() {
    if (!this.isCanonical || !this.isPure)
      return void 0;
    if (!this._value)
      this._value = this.evaluate();
    return this._value;
  }
  /** `isEqual` is mathematical equality */
  isEqual(rhs) {
    const s = signDiff(this, rhs);
    if (s === 0)
      return true;
    if (s !== void 0)
      return false;
    return this.isSame(rhs);
  }
  isLess(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s < 0;
  }
  isLessEqual(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s <= 0;
  }
  isGreater(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s > 0;
  }
  isGreaterEqual(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s >= 0;
  }
  get isZero() {
    const s = this.sgn;
    if (s === null)
      return false;
    if (typeof s === "number")
      return s === 0;
    return void 0;
  }
  get isNotZero() {
    const s = this.sgn;
    if (s === null)
      return false;
    if (typeof s === "number")
      return s !== 0;
    return void 0;
  }
  get isOne() {
    return this.isEqual(this.engine._ONE);
  }
  get isNegativeOne() {
    return this.isEqual(this.engine._NEGATIVE_ONE);
  }
  // x > 0
  get isPositive() {
    const s = this.sgn;
    if (s === null)
      return false;
    if (typeof s === "number")
      return s > 0;
    return void 0;
  }
  // x <= 0
  get isNonPositive() {
    const s = this.sgn;
    if (s === null)
      return false;
    if (typeof s === "number")
      return s <= 0;
    return void 0;
  }
  // x < 0
  get isNegative() {
    const s = this.sgn;
    if (s === null)
      return false;
    if (typeof s === "number")
      return s < 0;
    return void 0;
  }
  // x >= 0
  get isNonNegative() {
    const s = this.sgn;
    if (s === null)
      return false;
    if (typeof s === "number")
      return s >= 0;
    return void 0;
  }
  get isNumber() {
    return this.domain.isCompatible("Number");
  }
  get isInteger() {
    return this.domain.isCompatible("Integer");
  }
  get isRational() {
    return this.domain.isCompatible("RationalNumber");
  }
  get isAlgebraic() {
    return this.domain.isCompatible("AlgebraicNumber");
  }
  get isReal() {
    return this.domain.isCompatible("RealNumber");
  }
  get isExtendedReal() {
    return this.domain.isCompatible("ExtendedRealNumber");
  }
  get isComplex() {
    return this.domain.isCompatible("ComplexNumber");
  }
  get isImaginary() {
    return this.domain.isCompatible("ImaginaryNumber");
  }
  get sgn() {
    if (!this.isCanonical)
      return void 0;
    const head2 = this.head;
    if (head2 === "Negate") {
      const s = this._ops[0]?.sgn;
      if (s === void 0)
        return void 0;
      if (s === null)
        return null;
      return s === 0 ? 0 : s > 0 ? -1 : 1;
    }
    if (head2 === "Multiply") {
      const total = this._ops.reduce((acc, x) => acc * (x.sgn ?? NaN), 1);
      if (isNaN(total))
        return null;
      if (total > 0)
        return 1;
      if (total < 0)
        return -1;
      return 0;
    }
    if (head2 === "Add") {
      let posCount = 0;
      let negCount = 0;
      let zeroCount = 0;
      const count = this._ops.length;
      for (const op3 of this._ops) {
        const s = op3.sgn;
        if (s === null || s === void 0)
          break;
        if (s === 0)
          zeroCount += 1;
        if (s > 0)
          posCount += 1;
        if (s < 0)
          negCount += 1;
      }
      if (zeroCount === count)
        return 0;
      if (posCount === count)
        return 1;
      if (negCount === count)
        return -1;
      return null;
    }
    if (head2 === "Divide") {
      const n = this._ops[0]?.sgn;
      const d = this._ops[1]?.sgn;
      if (n === null || d === null || n === void 0 || d === void 0)
        return null;
      if (n === 0)
        return 0;
      if (n > 0 && d > 0 || n < 0 && d < 0)
        return 1;
      return -1;
    }
    if (head2 === "Square") {
      if (this._ops[0]?.isImaginary)
        return -1;
      if (this._ops[0]?.isZero)
        return 0;
      return 1;
    }
    if (head2 === "Abs") {
      if (this._ops[0]?.isZero)
        return 0;
      return 1;
    }
    if (head2 === "Sqrt") {
      if (this._ops[0]?.isZero)
        return 0;
      if (this._ops[0]?.isImaginary)
        return null;
      return 1;
    }
    if (head2 === "Power") {
    }
    if (head2 === "Root") {
    }
    if (head2 === "Ln") {
    }
    if (head2 === "Floor") {
    }
    if (head2 === "Ceil") {
    }
    if (head2 === "Round") {
    }
    const v = asFloat(this.N());
    if (v === null)
      return void 0;
    if (v === 0)
      return 0;
    if (v < 0)
      return -1;
    return 1;
  }
  //
  // AUTO-CANONICAL OPERATIONS
  //
  // The operations are automatically done on the canonical form of the
  // expression
  //
  get domain() {
    return this._codomain;
  }
  simplify(options) {
    if (!this.isValid)
      return this;
    if (!this.isCanonical) {
      const canonical2 = this.canonical;
      if (!canonical2.isCanonical || !canonical2.isValid)
        return this;
      return canonical2.simplify(options);
    }
    const def = this.functionDefinition;
    const tail = holdMap(
      this._ops,
      def?.hold ?? "none",
      def?.associative ? def.name : "",
      (x) => x.simplify(options)
    );
    if (typeof this._head !== "string") {
      const expr2 = apply(this._head, tail);
      if (typeof expr2.head !== "string")
        return expr2;
      return expr2.simplify(options);
    }
    let expr;
    if (def) {
      if (def.inert)
        expr = tail[0]?.canonical ?? this;
      else {
        const sig = def.signature;
        if (sig?.simplify)
          expr = sig.simplify(this.engine, tail);
      }
    }
    if (!expr)
      expr = this.engine.fn(this._head, tail);
    else
      expr = cheapest(this.engine.fn(this._head, tail), expr);
    expr = cheapest(this, expr);
    const rules = options?.rules ?? this.engine.cache(
      "standard-simplification-rules",
      () => boxRules(this.engine, SIMPLIFY_RULES),
      (rules2) => {
        for (const [lhs, rhs, _priority, _condition] of rules2) {
          lhs.unbind();
          rhs.unbind();
        }
        return rules2;
      }
    );
    let iterationCount = 0;
    let done = false;
    do {
      const newExpr = expr.replace(rules);
      if (newExpr !== null) {
        expr = cheapest(newExpr, expr);
        if (expr === newExpr)
          done = true;
      } else
        done = true;
      iterationCount += 1;
    } while (!done && iterationCount < this.engine.iterationLimit);
    return cheapest(this, expr);
  }
  evaluate(options) {
    if (!this.isValid)
      return this;
    if (!this.isCanonical) {
      const canonical2 = this.canonical;
      if (!canonical2.isCanonical || !canonical2.isValid)
        return this;
      return canonical2.evaluate(options);
    }
    const def = this.functionDefinition;
    const tail = holdMap(
      this._ops,
      def?.hold ?? "none",
      def?.associative ? def.name : "",
      (x) => x.evaluate(options)
    );
    if (typeof this._head !== "string") {
      const expr = apply(this._head, tail);
      if (typeof expr.head !== "string")
        return expr;
      return expr.evaluate(options);
    }
    if (!def)
      return this.engine.fn(this._head, tail);
    if (def.inert)
      return tail[0] ?? this;
    const sig = def.signature;
    if (!sig || !sig.evaluate)
      return this.engine.fn(this._head, tail);
    if (typeof sig.evaluate !== "function")
      return apply(sig.evaluate, tail);
    return sig.evaluate(this.engine, tail) ?? this.engine.fn(this._head, tail);
  }
  N(options) {
    if (this._numericValue)
      return this._numericValue;
    if (this.engine.strict && !this.isValid)
      return this;
    if (!this.isCanonical) {
      const canonical2 = this.canonical;
      if (!canonical2.isCanonical || !canonical2.isValid)
        return this;
      return canonical2.N(options);
    }
    const def = this.functionDefinition;
    const tail = holdMap(
      this._ops,
      def?.hold ?? "none",
      def?.associative ? def.name : "",
      (x) => x.N(options)
    );
    if (typeof this._head !== "string") {
      const expr = apply(this._head, tail);
      if (typeof expr.head !== "string")
        return expr;
      return expr.N(options);
    }
    if (!def)
      return this.engine.fn(this._head, tail);
    if (def.inert)
      return tail[0] ?? this;
    const sig = def.signature;
    let result = sig?.N?.(this.engine, tail) ?? this.engine.fn(this._head, tail).evaluate();
    const num = result.numericValue;
    if (num !== null) {
      if (!complexAllowed(this.engine) && num instanceof import_complex9.default)
        result = this.engine._NAN;
      else if (!bignumPreferred(this.engine) && num instanceof decimal_default)
        result = this.engine.number(num.toNumber());
    }
    if (this.isPure)
      this._numericValue = result;
    return result;
  }
  solve(vars) {
    if (vars.length !== 1)
      return null;
    const roots = findUnivariateRoots(this.simplify(), vars[0]);
    return roots;
  }
};
function makeNumericFunction(ce, head2, semiOps, metadata) {
  let ops2 = [];
  if (head2 === "Add" || head2 === "Multiply")
    ops2 = validateNumericArgs(
      ce,
      flattenOps(flattenSequence(ce.canonical(semiOps)), head2)
    );
  else if (head2 === "Negate" || head2 === "Square" || head2 === "Sqrt")
    ops2 = validateNumericArgs(ce, flattenSequence(ce.canonical(semiOps)), 1);
  else if (head2 === "Divide" || head2 === "Power")
    ops2 = validateNumericArgs(ce, flattenSequence(ce.canonical(semiOps)), 2);
  else
    return null;
  if (!ops2.every((x) => x.isValid))
    return new BoxedFunction(ce, head2, ops2, { metadata, canonical: false });
  if (head2 === "Add")
    return ce.add(ops2, metadata);
  if (head2 === "Negate")
    return ce.neg(ops2[0] ?? ce.error("missing"), metadata);
  if (head2 === "Multiply")
    return ce.mul(ops2, metadata);
  if (head2 === "Divide")
    return ce.div(ops2[0], ops2[1], metadata);
  if (head2 === "Power")
    return ce.pow(ops2[0], ops2[1], metadata);
  if (head2 === "Square")
    return ce.pow(ops2[0], ce.number(2), metadata);
  if (head2 === "Sqrt") {
    const op3 = ops2[0].canonical;
    if (isRational(op3.numericValue))
      return new BoxedFunction(ce, "Sqrt", [op3], { metadata, canonical: true });
    return ce.pow(op3, ce._HALF, metadata);
  }
  return null;
}
function makeCanonicalFunction(ce, head2, ops2, metadata) {
  if (typeof head2 !== "string")
    head2 = head2.evaluate().symbol ?? head2;
  if (typeof head2 === "string") {
    const result = makeNumericFunction(ce, head2, ops2, metadata);
    if (result)
      return result;
  } else {
    if (!head2.isValid)
      return new BoxedFunction(
        ce,
        head2,
        ops2.map((x) => ce.box(x, { canonical: false })),
        { metadata, canonical: false }
      );
  }
  const def = ce.lookupFunction(head2, ce.context);
  if (typeof head2 !== "string" || !def) {
    return new BoxedFunction(
      ce,
      head2,
      flattenSequence(ops2.map((x) => ce.box(x))),
      { metadata, canonical: true }
    );
  }
  let xs = [];
  for (let i = 0; i < ops2.length; i++) {
    if (applicable(def.hold, ops2.length - 1, i)) {
      xs.push(ce.box(ops2[i]));
    } else {
      const y = ce.box(ops2[i], { canonical: false });
      if (y.head === "ReleaseHold")
        xs.push(y.op1.canonical);
      else
        xs.push(y);
    }
  }
  const sig = def.signature;
  if (sig.canonical) {
    try {
      const result = sig.canonical(ce, xs);
      if (result)
        return result;
    } catch (e) {
      console.error(e);
    }
    return new BoxedFunction(ce, head2, xs, { metadata, canonical: false });
  }
  xs = flattenSequence(xs);
  if (def.associative)
    xs = flattenOps(xs, head2);
  if (!xs.every((x) => x.isValid))
    return new BoxedFunction(ce, head2, xs, { metadata, canonical: false });
  xs = validateSignature(sig.domain, xs) ?? xs;
  if (!xs.every((x) => x.isValid))
    return new BoxedFunction(ce, head2, xs, { metadata, canonical: false });
  if (xs.length === 1 && xs[0].head === head2) {
    if (def.involution)
      return xs[0].op1;
    if (def.idempotent)
      xs = xs[0].ops;
  }
  if (xs.length > 1 && def.commutative === true)
    xs = xs.sort(order);
  return new BoxedFunction(ce, head2, xs, { metadata, def, canonical: true });
}
function apply(fn, args) {
  if (fn.head !== "Lambda")
    return fn.engine._fn(fn.evaluate(), args);
  const subs2 = {
    "__": fn.engine.tuple(args),
    "_#": fn.engine.number(args.length)
  };
  let n = 1;
  for (const op3 of args)
    subs2[`_${n++}`] = op3;
  subs2["_"] = subs2["_1"];
  const savedContext = this.context;
  this.context = fn.scope ?? null;
  const result = fn.subs(subs2).evaluate();
  this.context = savedContext;
  return result;
}
function holdMap(xs, skip, associativeHead, f) {
  if (xs.length === 0)
    return [];
  xs = flattenOps(xs, associativeHead);
  if (skip === "all")
    return xs;
  if (skip === "none") {
    const result2 = [];
    for (const x of xs) {
      const h = x.head;
      if (h === "Hold")
        result2.push(x);
      else {
        const op3 = h === "ReleaseHold" ? x.op1 : x;
        if (op3) {
          const y = f(op3);
          if (y !== null)
            result2.push(y);
        }
      }
    }
    return flattenOps(result2, associativeHead);
  }
  const result = [];
  for (let i = 0; i < xs.length; i++) {
    if (xs[i].head === "Hold") {
      result.push(xs[i]);
    } else {
      let y = void 0;
      if (xs[i].head === "ReleaseHold")
        y = xs[i].op1;
      else if (applicable(skip, xs.length - 1, i))
        y = xs[i];
      else
        result.push(xs[i]);
      if (y) {
        const x = f(y);
        if (x !== null)
          result.push(x);
      }
    }
  }
  return flattenOps(result, associativeHead);
}
function applicable(skip, count, index) {
  if (skip === "all")
    return false;
  if (skip === "none")
    return true;
  if (skip === "first")
    return index !== 0;
  if (skip === "rest")
    return index === 0;
  if (skip === "last")
    return index !== count;
  if (skip === "most")
    return index === count;
  return false;
}

// src/compute-engine/boxed-expression/boxed-number.ts
var import_complex11 = __toESM(require_complex());

// src/compute-engine/domain-utils.ts
var import_complex10 = __toESM(require_complex());
function inferNumericDomain(value) {
  if (typeof value === "number" && !isNaN(value)) {
    if (!isFinite(value))
      return "ExtendedRealNumber";
    if (Number.isInteger(value)) {
      if (value > 0)
        return "PositiveInteger";
      if (value < 0)
        return "NegativeInteger";
      return "Integer";
    }
    if (value > 0)
      return "PositiveNumber";
    if (value < 0)
      return "NegativeNumber";
    return "RealNumber";
  }
  if (value instanceof Decimal) {
    if (value.isNaN())
      return "Number";
    if (!value.isFinite())
      return "ExtendedRealNumber";
    if (value.isInteger()) {
      if (value.isPositive())
        return "PositiveInteger";
      if (value.isNegative())
        return "NegativeInteger";
      return "Integer";
    }
    if (value.isPositive())
      return "PositiveNumber";
    if (value.isNegative())
      return "NegativeNumber";
    return "RealNumber";
  }
  if (value instanceof import_complex10.Complex) {
    const c = value;
    /* @__PURE__ */ console.assert(c.im !== 0);
    if (c.re === 0)
      return "ImaginaryNumber";
    return "ComplexNumber";
  }
  if (isRational(value)) {
    const [numer, denom] = value;
    /* @__PURE__ */ console.assert(
      typeof numer !== "number" || !Number.isNaN(numer) && !Number.isNaN(denom)
    );
    return "RationalNumber";
  }
  return "Number";
}

// src/compute-engine/numerics/primes.ts
var LARGE_PRIME = 1125899906842597;
function isPrime(n) {
  if (!Number.isInteger(n) || !Number.isFinite(n) || Number.isNaN(n) || n <= 1) {
    return false;
  }
  if (n <= LARGEST_SMALL_PRIME)
    return SMALL_PRIMES.has(n);
  for (const smallPrime of SMALL_PRIMES) {
    if (n % smallPrime === 0)
      return false;
  }
  if (n >= LARGE_PRIME) {
    return probablyPrime(n, 30) ? void 0 : false;
  }
  return n === leastFactor(n);
}
function leastFactor(n) {
  if (n === 1)
    return 1;
  if (n % 2 === 0)
    return 2;
  if (n % 3 === 0)
    return 3;
  if (n % 5 === 0)
    return 5;
  const m = Math.floor(Math.sqrt(n));
  let i = 7;
  while (i <= m) {
    if (n % i === 0)
      return i;
    if (n % (i + 4) === 0)
      return i + 4;
    if (n % (i + 6) === 0)
      return i + 6;
    if (n % (i + 10) === 0)
      return i + 10;
    if (n % (i + 12) === 0)
      return i + 12;
    if (n % (i + 16) === 0)
      return i + 16;
    if (n % (i + 22) === 0)
      return i + 22;
    if (n % (i + 24) === 0)
      return i + 24;
    i += 30;
  }
  return n;
}
function probablyPrime(n, k) {
  let s = 0, d = n - 1;
  while (d % 2 === 0) {
    d /= 2;
    ++s;
  }
  WitnessLoop:
    do {
      let x = Math.pow(2 + Math.floor(Math.random() * (n - 3)), d) % n;
      if (x === 1 || x === n - 1)
        continue;
      for (let i = s - 1; i--; ) {
        x = x * x % n;
        if (x === 1)
          return false;
        if (x === n - 1)
          continue WitnessLoop;
      }
      return false;
    } while (--k);
  return true;
}

// src/compute-engine/boxed-expression/boxed-number.ts
var BoxedNumber = class _BoxedNumber extends AbstractBoxedExpression {
  /**
   * By the time the constructor is called, the `value` should have been
   * screened for cases where it's a well-known value (0, NaN, +Infinity,
   * etc...) or non-normal (complex number with im = 0, rational with
   * denom = 1, etc...).
   *
   * This is done in `ce.number()`. In general, use `ce.number()` rather
   * than calling this constructor directly.
   *
   * We may store as a machine number if a Decimal is passed that is in machine
   * range
   */
  constructor(ce, value, options) {
    super(ce, options?.metadata);
    if (typeof value === "number") {
      this._value = value;
      this._isCanonical = true;
      return;
    }
    if (isRational(value)) {
      const [n, d] = value;
      /* @__PURE__ */ console.assert(
        typeof n !== "number" || Number.isInteger(n) && Number.isInteger(d) && d !== n && d !== 1
      );
      /* @__PURE__ */ console.assert(
        !(typeof n === "bigint" && typeof d == "bigint") || d !== n && d !== BigInt(1)
      );
      if (options?.canonical ?? true) {
        this._value = canonicalNumber(ce, value);
        this._isCanonical = true;
      } else {
        this._value = value;
        this._isCanonical = false;
      }
    } else {
      /* @__PURE__ */ console.assert(
        !(value instanceof import_complex11.Complex) || !Number.isNaN(value.re) && !Number.isNaN(value.im) && ce.chop(value.im) !== 0
      );
      this._value = canonicalNumber(ce, value);
      this._isCanonical = true;
    }
  }
  get hash() {
    if (this._hash !== void 0)
      return this._hash;
    let h = 0;
    if (typeof this._value === "number")
      h = hashCode(this._value.toString());
    else if (this._value instanceof import_complex11.Complex)
      h = hashCode(
        this._value.re.toString() + " +i " + this._value.im.toString()
      );
    else if (this._value instanceof Decimal)
      h = hashCode(this._value.toString());
    else
      h = hashCode(
        this._value[0].toString() + " / " + this._value[1].toString()
      );
    this._hash = h;
    return h;
  }
  get head() {
    return "Number";
  }
  get isPure() {
    return true;
  }
  get isExact() {
    if (typeof this._value === "number")
      return Number.isInteger(this._value);
    if (this._value instanceof Decimal)
      return this._value.isInteger();
    if (this._value instanceof import_complex11.Complex)
      return Number.isInteger(this._value.re) && Number.isInteger(this._value.im);
    return isRational(this._value);
  }
  get isCanonical() {
    return this._isCanonical;
  }
  set isCanonical(val) {
    this._isCanonical = val;
  }
  get complexity() {
    return 1;
  }
  get value() {
    return this;
  }
  get numericValue() {
    return this._value;
  }
  get domain() {
    if (this._domain === void 0)
      this._domain = this.engine.domain(inferNumericDomain(this._value));
    return this._domain;
  }
  get json() {
    return serializeJsonNumber(this.engine, this._value, {
      latex: this._latex
    });
  }
  get sgn() {
    if (this.isZero)
      return 0;
    if (this._value instanceof import_complex11.Complex)
      return null;
    if (typeof this._value === "number") {
      if (this._value < 0)
        return -1;
      if (this._value > 0)
        return 1;
      return null;
    }
    if (this._value instanceof Decimal) {
      if (this._value.isNegative())
        return -1;
      if (this._value.isPositive())
        return 1;
      return null;
    }
    if (Array.isArray(this._value)) {
      const [numer, denom] = this._value;
      if (numer === 0 && denom !== 0)
        return 0;
      if (numer < 0)
        return -1;
      if (numer > 0)
        return 1;
      return null;
    }
    return null;
  }
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedNumber))
      return false;
    if (Array.isArray(this._value)) {
      if (!Array.isArray(rhs._value))
        return false;
      const [rhsN, rhsD] = rhs._value;
      return this._value[0] === rhsN && this._value[1] === rhsD;
    }
    if (this._value instanceof Decimal) {
      if (!(rhs._value instanceof Decimal))
        return false;
      return this._value.eq(rhs._value);
    }
    if (this._value instanceof import_complex11.Complex) {
      if (!(rhs._value instanceof import_complex11.Complex))
        return false;
      return this._value.equals(rhs._value);
    }
    if (typeof this._value === "number") {
      if (typeof rhs._value !== "number")
        return false;
      return this._value === rhs._value;
    }
    return false;
  }
  isEqual(rhs) {
    if (this === rhs)
      return true;
    const n = rhs.N();
    if (!(n instanceof _BoxedNumber))
      return false;
    return signDiff(this.N(), n) === 0;
  }
  match(rhs, options) {
    if (this.isEqualWithTolerance(rhs, options?.numericTolerance ?? 0))
      return {};
    return null;
  }
  /** Compare this with another BoxedNumber.
   * `rhs` must be a BoxedNumber. Use `isEqualWithTolerance(rhs.N())`
   * if necessary.
   */
  isEqualWithTolerance(rhs, tolerance) {
    return rhs instanceof _BoxedNumber && signDiff(this, rhs, tolerance) === 0;
  }
  isLess(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s < 0;
  }
  isLessEqual(rhs) {
    const s = signDiff(this, rhs);
    if (s === void 0)
      return void 0;
    return s <= 0;
  }
  isGreater(rhs) {
    return rhs.isLessEqual(this);
  }
  isGreaterEqual(rhs) {
    return rhs.isLess(this);
  }
  /** x > 0, same as `isGreater(0)` */
  get isPositive() {
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s > 0;
  }
  /** x >= 0, same as `isGreaterEqual(0)` */
  get isNonNegative() {
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s >= 0;
  }
  /** x < 0, same as `isLess(0)` */
  get isNegative() {
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s < 0;
  }
  /** x <= 0, same as `isLessEqual(0)` */
  get isNonPositive() {
    const s = this.sgn;
    if (s === void 0 || s === null)
      return void 0;
    return s <= 0;
  }
  get isZero() {
    if (this._value === 0)
      return true;
    if (this._value instanceof Decimal)
      return this._value.isZero();
    if (this._value instanceof import_complex11.Complex)
      return this._value.isZero();
    return false;
  }
  get isNotZero() {
    if (typeof this._value === "number" && this._value !== 0)
      return true;
    if (this._value instanceof Decimal)
      return !this._value.isZero();
    if (this._value instanceof import_complex11.Complex)
      return !this._value.isZero();
    return true;
  }
  get isOne() {
    if (typeof this._value === "number")
      return this._value === 1;
    if (this._value instanceof Decimal)
      return this._value.equals(this.engine._BIGNUM_ONE);
    if (this._value instanceof import_complex11.Complex)
      return this._value.im === 0 && this._value.re === 1;
    return isRationalOne(this._value);
  }
  get isNegativeOne() {
    if (typeof this._value === "number")
      return this._value === -1;
    if (this._value instanceof Decimal)
      return this._value.equals(this.engine._BIGNUM_NEGATIVE_ONE);
    if (Array.isArray(this._value))
      return isRationalNegativeOne(this._value);
    return this._value.equals(-1);
  }
  get isOdd() {
    if (this.isOne || this.isNegativeOne)
      return true;
    if (this.isZero)
      return false;
    if (!this.isInteger)
      return false;
    if (typeof this._value === "number")
      return this._value % 2 !== 0;
    if (this._value instanceof Decimal)
      return !this._value.mod(2).isZero();
    return void 0;
  }
  get isEven() {
    if (this.isOne || this.isNegativeOne)
      return false;
    if (this.isZero)
      return true;
    if (!this.isInteger)
      return false;
    if (typeof this._value === "number")
      return this._value % 2 === 0;
    if (this._value instanceof Decimal)
      return this._value.mod(2).isZero();
    return void 0;
  }
  get isPrime() {
    if (!this.isInteger || !this.isFinite || this.isNonPositive || this.isOne || this.isZero)
      return false;
    if (typeof this._value === "number")
      return isPrime(this._value);
    if (this._value instanceof Decimal)
      return isPrime(this._value.toNumber());
    return void 0;
  }
  get isComposite() {
    if (!this.isInteger || !this.isFinite || this.isNonPositive || this.isOne || this.isZero)
      return false;
    if (typeof this._value === "number")
      return !isPrime(this._value);
    if (this._value instanceof Decimal)
      return !isPrime(this._value.toNumber());
    return void 0;
  }
  get isInfinity() {
    if (typeof this._value === "number")
      return !Number.isFinite(this._value) && !Number.isNaN(this._value);
    if (this._value instanceof Decimal)
      return !this._value.isFinite() && !this._value.isNaN();
    if (this._value instanceof import_complex11.Complex)
      return !this._value.isFinite() && !this._value.isNaN();
    return false;
  }
  get isNaN() {
    if (typeof this._value === "number")
      return Number.isNaN(this._value);
    if (this._value instanceof Decimal)
      this._value.isNaN();
    if (this._value instanceof import_complex11.Complex)
      this._value.isNaN();
    return false;
  }
  get isFinite() {
    return !this.isInfinity && !this.isNaN;
  }
  get isNumber() {
    return true;
  }
  get isInteger() {
    if (typeof this._value === "number")
      return Number.isInteger(this._value);
    if (this._value instanceof Decimal)
      return this._value.isInteger();
    return false;
  }
  get isRational() {
    if (Array.isArray(this._value))
      return true;
    return this.isInteger;
  }
  get isAlgebraic() {
    if (this.isRational)
      return true;
    return void 0;
  }
  get isReal() {
    if (!this.isFinite)
      return false;
    if (this._value instanceof import_complex11.Complex)
      return this.engine.chop(this._value.im) === 0;
    return true;
  }
  // Real or +-Infinity
  get isExtendedReal() {
    return this.isInfinity || this.isReal;
  }
  get isComplex() {
    return !this.isNaN;
  }
  get isImaginary() {
    if (this._value instanceof import_complex11.Complex) {
      /* @__PURE__ */ console.assert(this._value.im !== 0);
      return true;
    }
    return false;
  }
  get isExtendedComplex() {
    return this.isInfinity || !this.isNaN;
  }
  get canonical() {
    if (this._isCanonical)
      return this;
    return this.engine.number(canonicalNumber(this.engine, this._value));
  }
  simplify(_options) {
    return this.canonical;
  }
  N(_options) {
    if (!Array.isArray(this._value))
      return this;
    const ce = this.engine;
    const [numer, denom] = this._value;
    if (typeof numer === "number" && typeof denom === "number" && !bignumPreferred(ce))
      return ce.number(numer / denom);
    return ce.number(ce.bignum(numer).div(ce.bignum(denom)));
  }
};
function canonicalNumber(ce, value) {
  if (value instanceof Decimal && isInMachineRange(value))
    return value.toNumber();
  if (!isRational(value))
    return value;
  value = reducedRational(value);
  if (isBigRational(value)) {
    let [n2, d2] = value;
    if (n2 > Number.MIN_SAFE_INTEGER && n2 < Number.MAX_SAFE_INTEGER && d2 > Number.MIN_SAFE_INTEGER && d2 < Number.MAX_SAFE_INTEGER)
      value = [Number(n2), Number(d2)];
    else {
      if (d2 < 0)
        [n2, d2] = [-n2, -d2];
      if (d2 === BigInt(1))
        return ce.bignum(n2);
      if (d2 === BigInt(0)) {
        if (n2 === d2)
          return NaN;
        return n2 < 0 ? -Infinity : Infinity;
      }
      return [n2, d2];
    }
  }
  let [n, d] = value;
  if (Number.isNaN(n) || Number.isNaN(d))
    return NaN;
  if (d < 0)
    [n, d] = [-n, -d];
  if (d === 1)
    return n;
  if (d === 0) {
    if (n === 0 || !Number.isFinite(n))
      return NaN;
    if (n < 0)
      return -Infinity;
    return Infinity;
  }
  if (n === 0)
    return n;
  return [n, d];
}

// src/compute-engine/boxed-expression/boxed-string.ts
var BoxedString = class _BoxedString extends AbstractBoxedExpression {
  constructor(ce, expr, metadata) {
    super(ce, metadata);
    this._string = expr.normalize();
    ce._register(this);
  }
  get hash() {
    return hashCode("String" + this._string);
  }
  get json() {
    return serializeJsonString(this.engine, this._string);
  }
  get head() {
    return "String";
  }
  get isPure() {
    return true;
  }
  get isCanonical() {
    return true;
  }
  set isCanonical(_va) {
    return;
  }
  get domain() {
    return this.engine.domain("String");
  }
  get complexity() {
    return 19;
  }
  get string() {
    return this._string;
  }
  isEqual(rhs) {
    return rhs.string === this._string;
  }
  isSame(rhs) {
    return rhs.string === this._string;
  }
  match(rhs, _options) {
    if (!(rhs instanceof _BoxedString))
      return null;
    if (this._string === rhs._string)
      return {};
    return null;
  }
};

// src/compute-engine/boxed-expression/box.ts
function boxNumber(ce, num, options) {
  if (typeof num === "number" || num instanceof Decimal)
    return new BoxedNumber(ce, num, options);
  options ?? (options = {});
  if (!("canonical" in options))
    options.canonical = true;
  if (Array.isArray(num) && num.length === 2 && num[0] instanceof Decimal && num[1] instanceof Decimal) {
    if (!num[0].isInteger() || !num[1].isInteger())
      throw new Error("Array argument to `boxNumber()` should be two integers");
    num = [bigint(num[0].toString()), bigint(num[1].toString())];
  }
  if (isRational(num)) {
    if (num.length !== 2)
      throw new Error(
        "Array argument to `boxNumber()` should be two integers or two bignums"
      );
    const [n, d] = num;
    if (typeof n === "bigint" && typeof d === "bigint") {
      if (n === d)
        return d === BigInt(0) ? ce._NAN : ce._ONE;
      if (d === BigInt(1))
        return ce.number(n, options);
      if (d === BigInt(-1))
        return ce.number(-n, options);
      if (n === BigInt(1) && d === BigInt(2))
        return ce._HALF;
      return new BoxedNumber(ce, [n, d], options);
    }
    if (typeof n !== "number" || typeof d !== "number")
      throw new Error(
        "Array argument to `boxNumber()` should be two integers or two bignums"
      );
    if (!Number.isInteger(n) || !Number.isInteger(d))
      throw new Error("Array argument to `boxNumber()` should be two integers");
    if (d === n)
      return d === 0 ? ce._NAN : ce._ONE;
    if (d === 1)
      return ce.number(n, options);
    if (d === -1)
      return ce.number(-n, options);
    if (n === 1 && d === 2)
      return ce._HALF;
    return new BoxedNumber(ce, [n, d], options);
  }
  if (num instanceof import_complex12.Complex) {
    if (num.isNaN())
      return ce._NAN;
    if (num.isZero())
      return ce._ZERO;
    if (num.isInfinite())
      return ce._COMPLEX_INFINITY;
    if (ce.chop(num.im) === 0)
      return ce.number(num.re, options);
    return new BoxedNumber(ce, num, options);
  }
  let strNum = "";
  if (typeof num === "string")
    strNum = num;
  else if (typeof num === "object" && "num" in num) {
    if (typeof num.num === "number")
      return ce.number(num.num, options);
    if (typeof num.num !== "string")
      throw new Error("MathJSON `num` property should be a string of digits");
    strNum = num.num;
  }
  if (strNum) {
    strNum = strNum.toLowerCase();
    if (/[0-9][nd]$/.test(strNum))
      strNum = strNum.slice(0, -1);
    strNum = strNum.replace(/[\u0009-\u000d\u0020\u00a0]/g, "");
    if (strNum === "nan")
      return ce._NAN;
    if (strNum === "infinity" || strNum === "+infinity")
      return ce._POSITIVE_INFINITY;
    if (strNum === "-infinity")
      return ce._NEGATIVE_INFINITY;
    if (strNum === "0")
      return ce._ZERO;
    if (strNum === "1")
      return ce._ONE;
    if (strNum === "-1")
      return ce._NEGATIVE_ONE;
    if (/\([0-9]+\)/.test(strNum)) {
      const [_, body, repeat, trail] = strNum.match(/(.+)\(([0-9]+)\)(.+)?$/) ?? [];
      strNum = body + repeat.repeat(Math.ceil(ce.precision / repeat.length)) + (trail ?? "");
    }
    return boxNumber(ce, ce.bignum(strNum), options);
  }
  return null;
}
function boxHold(ce, expr, options) {
  if (expr === null)
    return ce.error("missing");
  if (typeof expr === "object" && expr instanceof AbstractBoxedExpression)
    return expr;
  expr = missingIfEmpty(expr);
  if (typeof expr === "string")
    return box(ce, expr, options);
  if (Array.isArray(expr)) {
    const boxed = expr.map((x) => boxHold(ce, x, options));
    return new BoxedFunction(ce, boxed[0], boxed.slice(1));
  }
  if (typeof expr === "object") {
    if ("dict" in expr)
      return new BoxedDictionary(ce, expr.dict);
    if ("fn" in expr)
      return boxHold(ce, expr.fn, options);
    if ("str" in expr)
      return new BoxedString(ce, expr.str);
    if ("sym" in expr)
      return box(ce, expr.sym, options);
    if ("num" in expr)
      return box(ce, expr.num, options);
  }
  return box(ce, expr, options);
}
function boxFunction(ce, head2, ops2, options) {
  if (head2 === "Hold") {
    return new BoxedFunction(ce, "Hold", [boxHold(ce, ops2[0], options)], {
      ...options,
      canonical: true
    });
  }
  if (head2 === "Error" || head2 === "ErrorCode") {
    return ce._fn(
      head2,
      ops2.map((x) => ce.box(x, { canonical: false })),
      options.metadata
    );
  }
  if (head2 === "Domain")
    return ce.domain(ops2[0], options.metadata);
  if (head2 === "Number" && ops2.length === 1)
    return box(ce, ops2[0], options);
  if (head2 === "String") {
    if (ops2.length === 0)
      return new BoxedString(ce, "", options.metadata);
    return new BoxedString(
      ce,
      ops2.map((x) => asString(x) ?? "").join(""),
      options.metadata
    );
  }
  if (head2 === "Symbol" && ops2.length > 0) {
    return ce.symbol(ops2.map((x) => asString(x) ?? "").join(""), options);
  }
  if ((head2 === "Divide" || head2 === "Rational") && ops2.length === 2) {
    if (ops2[0] instanceof AbstractBoxedExpression && ops2[1] instanceof AbstractBoxedExpression) {
      const [n, d] = [asBigint(ops2[0]), asBigint(ops2[1])];
      if (n && d)
        return ce.number([n, d], options);
    } else {
      const [n, d] = [
        bigintValue(ce, ops2[0]),
        bigintValue(ce, ops2[1])
      ];
      if (n && d)
        return ce.number([n, d], options);
    }
    head2 = "Divide";
  }
  if (head2 === "Complex") {
    if (ops2.length === 1) {
      const op12 = box(ce, ops2[0], options);
      const im = asFloat(op12);
      if (im !== null && im !== 0)
        return ce.number(ce.complex(0, im), options);
      return ce.mul([op12, ce._I]);
    }
    if (ops2.length === 2) {
      const op12 = box(ce, ops2[0], options);
      const op22 = box(ce, ops2[1], options);
      const re = asFloat(op12);
      const im = asFloat(op22);
      if (im !== null && re !== null) {
        if (im === 0 && re === 0)
          return ce._ZERO;
        if (im !== null && im !== 0)
          return ce.number(ce.complex(re, im), options);
        return op12;
      }
      return ce.add([op12, ce.mul([op22, ce._I])], options.metadata);
    }
  }
  if (head2 === "Negate" && ops2.length === 1) {
    const op12 = ops2[0];
    if (typeof op12 === "number")
      return ce.number(-op12, options);
    if (op12 instanceof Decimal)
      return ce.number(op12.neg(), options);
    const num = ce.box(op12, options).numericValue;
    if (num !== null) {
      if (typeof num === "number")
        return ce.number(-num, options);
      if (num instanceof Decimal)
        return ce.number(num.neg(), options);
      if (num instanceof import_complex12.Complex)
        return ce.number(num.neg());
      if (isRational(num))
        return ce.number(neg(num));
    }
  }
  if (head2 === "Dictionary") {
    const dict = {};
    for (const op3 of ops2) {
      const arg = ce.box(op3);
      const head3 = arg.head;
      if (head3 === "KeyValuePair" || head3 === "Pair" || head3 === "Tuple" && arg.nops === 2) {
        const key = arg.op1;
        if (key.isValid && !key.isNothing) {
          const value = arg.op2;
          let k = key.symbol ?? key.string;
          if (!k && (key.numericValue !== null || key.string)) {
            const n = typeof key.numericValue === "number" ? key.numericValue : asSmallInteger(key);
            if (n && Number.isFinite(n) && Number.isInteger(n))
              k = n.toString();
          }
          if (k)
            dict[k] = value;
        }
      }
    }
    return new BoxedDictionary(ce, dict, options);
  }
  if (options.canonical)
    return makeCanonicalFunction(ce, head2, ops2, options.metadata);
  return new BoxedFunction(
    ce,
    head2,
    ops2.map((x) => box(ce, x, { canonical: false })),
    options
  );
}
function box(ce, expr, options) {
  if (expr === null || expr === void 0)
    return ce._fn("Sequence", []);
  options ?? (options = {});
  if (!("canonical" in options))
    options.canonical = true;
  if (expr instanceof AbstractBoxedExpression)
    return options.canonical ? expr.canonical : expr;
  if (Array.isArray(expr)) {
    if (isMachineRational(expr)) {
      if (Number.isInteger(expr[0]) && Number.isInteger(expr[1]))
        return ce.number(expr);
      return boxFunction(ce, "Divide", expr, options);
    }
    if (isBigRational(expr))
      return ce.number(expr);
    if (typeof expr[0] === "string")
      return boxFunction(ce, expr[0], expr.slice(1), options);
    const ops2 = expr.slice(1).map((x) => box(ce, x, options));
    const head2 = box(ce, expr[0], options);
    if (head2.symbol)
      return new BoxedFunction(ce, head2.symbol, ops2);
    return apply(head2, ops2);
  }
  if (typeof expr === "number" || expr instanceof import_complex12.Complex || expr instanceof Decimal)
    return ce.number(expr);
  if (typeof expr === "string") {
    if (expr.startsWith("'") && expr.endsWith("'"))
      return new BoxedString(ce, expr.slice(1, -1));
    if (/^[+-]?[0-9]/.test(expr))
      return ce.number(expr);
    return ce.symbol(expr, options);
  }
  if (typeof expr === "object") {
    const metadata = {
      latex: expr.latex,
      wikidata: expr.wikidata
    };
    if ("dict" in expr)
      return new BoxedDictionary(ce, expr.dict, { canonical: true, metadata });
    if ("fn" in expr) {
      if (typeof expr.fn[0] === "string")
        return boxFunction(ce, expr.fn[0], expr.fn.slice(1), options);
      return new BoxedFunction(
        ce,
        box(ce, expr.fn[0], options),
        expr.fn.slice(1).map((x) => box(ce, x, options)),
        { metadata }
      );
    }
    if ("str" in expr)
      return new BoxedString(ce, expr.str, metadata);
    if ("sym" in expr)
      return ce.symbol(expr.sym, options);
    if ("num" in expr)
      return ce.number(expr, options);
  }
  return ce.symbol("Undefined");
}
function asString(expr) {
  if (typeof expr === "string")
    return expr;
  if (expr instanceof AbstractBoxedExpression) {
    return expr.string ?? expr.symbol ?? expr.toString();
  }
  if (typeof expr === "object") {
    if ("str" in expr)
      return expr.str;
    if ("fn" in expr && expr.fn[0] === "String" && typeof expr.fn[1] === "string")
      return expr.fn[1];
  }
  if (Array.isArray(expr)) {
    if (expr[0] === "String" && typeof expr[1] === "string")
      return expr[1];
  }
  return null;
}

// src/compute-engine/numerics/numeric-complex.ts
function gamma3(c) {
  return c;
}
function lngamma3(c) {
  return c;
}

// src/compute-engine/symbolic/sum.ts
var import_complex13 = __toESM(require_complex());
var Sum = class {
  constructor(ce, xs, options) {
    // If `false`, the running sums are not calculated
    this._isCanonical = true;
    this._imaginary = 0;
    this._posInfinityCount = 0;
    this._negInfinityCount = 0;
    this._naNCount = 0;
    // Each term is factored as the product of a rational and an expression
    // For now, only rationals are factored, so `1.2x + 2.5x` are not combined.
    this._terms = [];
    options ?? (options = {});
    if (!("canonical" in options))
      options.canonical = true;
    this._isCanonical = options.canonical;
    this.engine = ce;
    this._rational = bignumPreferred(ce) ? [BigInt(0), BigInt(1)] : [0, 1];
    this._bignum = ce._BIGNUM_ZERO;
    this._number = 0;
    if (xs)
      for (const x of xs)
        this.addTerm(x);
  }
  get isEmpty() {
    if (!this._isCanonical)
      return this._terms.length === 0;
    return this._terms.length === 0 && isRationalZero(this._rational) && this._imaginary === 0 && this._number === 0 && this._bignum.isZero() && this._negInfinityCount === 0 && this._posInfinityCount === 0 && this._naNCount === 0;
  }
  /**
   * Add a term to the sum.
   *
   * A term is a rational coefficient and an expression.
   * Optionally, the term is multiplied by the constant `c` before being added.
   *
   * If the sum already has this term, the coefficient is added
   * to the previous one. Otherwise, a new entry is added.
   *
   * E.g. "2x + x + 1/5 y"
   *  -> [['x', [3, 1]], ['y', [1, 5]]]
   */
  addTerm(term, c) {
    if (term.isNothing)
      return;
    if (term.isNaN || term.isImaginary && !complexAllowed(this.engine)) {
      this._naNCount += 1;
      return;
    }
    if (this._isCanonical) {
      if (term.numericValue !== null) {
        if (term.isInfinity) {
          if (term.isPositive)
            this._posInfinityCount += 1;
          else
            this._negInfinityCount += 1;
          return;
        }
        const r = asRational(term);
        if (r) {
          this._rational = add2(this._rational, c === void 0 ? r : mul2(r, c));
          return;
        }
        const num = term.numericValue;
        if (num !== null && typeof num === "number") {
          /* @__PURE__ */ console.assert(!Number.isInteger(num));
          if (bignumPreferred(this.engine))
            this._bignum = this._bignum.add(num);
          else
            this._number += num;
          return;
        }
        if (num !== null && num instanceof decimal_default) {
          /* @__PURE__ */ console.assert(!num.isInteger());
          this._bignum = this._bignum.add(num);
          return;
        }
        if (num !== null && num instanceof import_complex13.default) {
          let re = num.re;
          let im = num.im;
          if (Number.isInteger(re)) {
            this._rational = add2(this._rational, mul2([re, 1], c ?? [1, 1]));
            re = 0;
          } else {
            if (bignumPreferred(this.engine))
              this._bignum = this._bignum.add(re);
            else
              this._number += re;
            re = 0;
          }
          if (Number.isInteger(im)) {
            if (c === void 0)
              this._imaginary += im;
            else if (isMachineRational(c))
              this._imaginary += im * c[0] / c[1];
            else
              this._imaginary += this.engine.bignum(c[0]).mul(im).div(this.engine.bignum(c[1])).toNumber();
            im = 0;
          }
          if (re === 0 && im === 0)
            return;
          term = this.engine.number(this.engine.complex(re, im));
        }
      }
    }
    let coef;
    [coef, term] = asCoefficient(term);
    if (isRationalZero(coef))
      return;
    if (c !== void 0)
      coef = mul2(coef, c);
    if (term.head === "Negate") {
      this.addTerm(term.op1, neg(coef));
      return;
    }
    if (term.head === "Add") {
      for (const x of term.ops)
        this.addTerm(x, coef);
      return;
    }
    let hasTerm = false;
    if (term.numericValue === null) {
      if (this._terms.length > 500) {
        const h = term.hash;
        for (let i = 0; i < this._terms.length; i++) {
          if (this._terms[i].term.numericValue === null && h === this._terms[i].term.hash && term.isSame(this._terms[i].term)) {
            this._terms[i].coef = add2(this._terms[i].coef, coef);
            hasTerm = true;
            break;
          }
        }
      } else {
        for (let i = 0; i < this._terms.length; i++) {
          if (this._terms[i].term.numericValue === null && term.isSame(this._terms[i].term)) {
            this._terms[i].coef = add2(this._terms[i].coef, coef);
            hasTerm = true;
            break;
          }
        }
      }
    }
    if (!hasTerm)
      this._terms.push({ term, coef });
  }
  terms(mode) {
    const ce = this.engine;
    if (this._naNCount > 0)
      return [ce._NAN];
    if (this._imaginary !== 0 && !complexAllowed(ce))
      return [ce._NAN];
    if (this._posInfinityCount > 0 && this._negInfinityCount > 0)
      return [ce._NAN];
    if (this._posInfinityCount > 0)
      return [ce._POSITIVE_INFINITY];
    if (this._negInfinityCount > 0)
      return [ce._NEGATIVE_INFINITY];
    const xs = [];
    for (const { coef, term } of this._terms) {
      if (!isRationalZero(coef)) {
        if (isRationalOne(coef))
          xs.push(term);
        else if (isRationalNegativeOne(coef))
          xs.push(ce.neg(term));
        else if (machineDenominator(coef) === 1)
          xs.push(ce.mul([ce.number(coef[0]), term]));
        else if (machineNumerator(coef) === 1)
          xs.push(ce.div(term, ce.number(coef[1])));
        else
          xs.push(ce.mul([ce.number(coef), term]));
      }
    }
    if (mode === "numeric") {
      if (bignumPreferred(this.engine)) {
        let sum2 = this._bignum.add(this._number);
        if (!isRationalZero(this._rational))
          sum2 = sum2.add(
            ce.bignum(this._rational[0]).div(ce.bignum(this._rational[1]))
          );
        if (this._imaginary !== 0)
          xs.push(ce.number(ce.complex(sum2.toNumber(), this._imaginary)));
        else if (ce.chop(sum2) !== 0)
          xs.push(ce.number(sum2));
      } else {
        let sum2 = this._bignum.toNumber() + this._number;
        if (!isRationalZero(this._rational))
          sum2 += machineNumerator(this._rational) / machineDenominator(this._rational);
        if (this._imaginary !== 0)
          xs.push(ce.number(ce.complex(sum2, this._imaginary)));
        else if (ce.chop(sum2) !== 0)
          xs.push(ce.number(sum2));
      }
    } else {
      if (!isRationalZero(this._rational))
        xs.push(ce.number(this._rational));
      if (this._imaginary !== 0) {
        if (!complexAllowed(ce))
          return [ce._NAN];
        xs.push(ce.number(ce.complex(0, this._imaginary)));
      }
      if (bignumPreferred(this.engine)) {
        const sum2 = this._bignum.add(this._number);
        if (ce.chop(sum2) !== 0)
          xs.push(ce.number(sum2));
      } else {
        if (ce.chop(this._bignum) !== 0)
          xs.push(ce.number(this._bignum));
        if (ce.chop(this._number) !== 0)
          xs.push(ce.number(this._number));
      }
    }
    return flattenOps(xs, "Add");
  }
  asExpression(mode) {
    const ce = this.engine;
    const xs = this.terms(mode);
    if (xs.length === 0)
      return ce._ZERO;
    if (xs.length === 1)
      return xs[0];
    return ce._fn("Add", sortAdd(ce, xs));
  }
};

// src/compute-engine/library/domains.ts
var DOMAIN_CONSTRUCTORS = [
  "Error",
  "Dictionary",
  "Function",
  "List",
  "Tuple",
  "Intersection",
  "Union",
  "Maybe",
  "Sequence",
  "Interval",
  "Range",
  "Head",
  "Symbol",
  "Value"
];
var DOMAIN_ALIAS = {
  // Function: ['Function', ['Sequence', 'Anything'], 'Anything'],
  NumericFunction: ["Function", ["Sequence", "Number"], "Number"],
  RealFunction: [
    "Function",
    ["Sequence", "ExtendedRealNumber"],
    "ExtendedRealNumber"
  ],
  TrigonometricFunction: ["Function", "Number", "Number"],
  // HyperbolicFunction: ['Function', 'Number', 'Number'],
  LogicOperator: [
    "Function",
    "MaybeBoolean",
    ["Maybe", "MaybeBoolean"],
    "MaybeBoolean"
  ],
  Predicate: ["Function", ["Sequence", "Anything"], "MaybeBoolean"],
  RelationalOperator: ["Function", "Anything", "Anything", "MaybeBoolean"]
  // PositiveInteger: ['Range', 1, +Infinity],
  // NonNegativeInteger: ['Range', 0, +Infinity],
  // NegativeInteger: ['Range', -Infinity, -1],
  // NonPositiveInteger: ['Range', -Infinity, 0],
  // PositiveNumber: ['Interval', ['Open', 0], +Infinity],
  // NonNegativeNumber: ['Interval', 0, +Infinity],
  // NegativeNumber: ['Interval', -Infinity, ['Open', 0]],
  // NonPositiveNumber: ['Interval', -Infinity, 0],
};
var DOMAIN_LITERAL = {
  Anything: [],
  Value: "Anything",
  Domain: "Anything",
  DomainExpression: "Domain",
  Void: "Nothing",
  Nothing: [
    "DomainExpression",
    "Boolean",
    "String",
    "Symbol",
    "Tuple",
    "List",
    "Dictionary",
    "InfiniteSet",
    "FiniteSet",
    "ImaginaryNumber",
    "TranscendentalNumber",
    "PositiveInteger",
    "NegativeInteger",
    "NonPositiveInteger",
    "NonNegativeInteger",
    "PositiveNumber",
    "NegativeNumber",
    "NonPositiveNumber",
    "NonNegativeNumber",
    "Scalar",
    "TrigonometricFunction",
    "LogicOperator",
    "RelationalOperator"
  ],
  MaybeBoolean: "Value",
  Boolean: "MaybeBoolean",
  String: "Boolean",
  Symbol: "Boolean",
  Collection: "Value",
  List: "Collection",
  Dictionary: "Collection",
  Sequence: "Collection",
  Tuple: "Sequence",
  Set: "Collection",
  InfiniteSet: "Set",
  FiniteSet: "Set",
  //
  // Functional Domains
  //
  Function: "Anything",
  Predicate: "Function",
  LogicOperator: "Predicate",
  RelationalOperator: "Predicate",
  // https://en.wikipedia.org/wiki/List_of_mathematical_functions
  NumericFunction: "Function",
  RealFunction: "NumericFunction",
  TrigonometricFunction: "RealFunction",
  //
  // Numeric Domains
  //
  // https://en.wikipedia.org/wiki/Category_of_sets
  Number: "Value",
  ExtendedComplexNumber: "Number",
  ComplexNumber: "ExtendedComplexNumber",
  ImaginaryNumber: "ComplexNumber",
  ExtendedRealNumber: "ExtendedComplexNumber",
  RealNumber: ["ComplexNumber", "ExtendedRealNumber"],
  PositiveNumber: "NonNegativeNumber",
  NonNegativeNumber: "RealNumber",
  NonPositiveNumber: "NegativeNumber",
  NegativeNumber: "RealNumber",
  TranscendentalNumber: "RealNumber",
  AlgebraicNumber: "RealNumber",
  RationalNumber: "AlgebraicNumber",
  // NaturalNumber: 'Integer',
  Integer: "RationalNumber",
  PositiveInteger: "NonNegativeInteger",
  NonNegativeInteger: "Integer",
  NonPositiveInteger: "NegativeInteger",
  NegativeInteger: "Integer",
  //
  // Tensorial Domains
  //
  Tensor: "Value",
  Matrix: "Tensor",
  Scalar: ["Row", "Column"],
  Row: "Vector",
  Column: "Vector",
  Vector: "Matrix"
  // https://en.wikipedia.org/wiki/List_of_named_matrices
  // ComplexTensor: 'Tensor',
  // RealTensor: 'ComplexTensor',
  // IntegerTensor: 'RealTensor',
  // LogicalTensor: 'IntegerTensor',
  // SquareMatrix: 'Matrix',
  // MonomialMatrix: 'SquareMatrix',
  // TriangularMatrix: 'SquareMatrix',
  // UpperTriangularMatrix: 'TriangularMatrix',
  // LowerTriangularMatrix: 'TriangularMatrix',
  // PermutationMatrix: ['MonomialMatrix', 'LogicalTensor', 'OrthogonalMatrix'],
  // OrthogonalMatrix: ['SquareMatrix', 'RealTensor'],
  // DiagonalMatrix: ['UpperTriangularMatrix', 'LowerTriangularMatrix'],
  // IdentityMatrix: ['DiagonalMatrix', 'SymmetricMatrix', 'PermutationMatrix'],
  // ZeroMatrix: ['DiagonalMatrix', 'SymmetricMatrix', 'PermutationMatrix'],
  // SymmetricMatrix: ['HermitianMatrix', 'SquareMatrix', 'RealTensor'],
  // HermitianMatrix: 'ComplexTensor',
  // Quaternion: ['SquareMatrix', 'ComplexTensor'],
};
var gDomainLiterals;
function isDomainLiteral(s) {
  if (!s)
    return false;
  return DOMAIN_LITERAL[s] !== void 0;
}
function ancestors(dom) {
  if (!gDomainLiterals) {
    gDomainLiterals = {};
    ancestors("Void");
  }
  if (gDomainLiterals[dom])
    return Array.from(gDomainLiterals[dom]);
  let result = [];
  if (typeof dom !== "string" || !DOMAIN_LITERAL[dom]) {
    if (!Array.isArray(dom))
      throw Error(`Unknown domain literal ${dom}`);
    if (!DOMAIN_CONSTRUCTORS.includes(dom[0]))
      throw Error(`Unknown domain constructor ${dom[0]}`);
    if (dom[0] === "Function" || dom[0] === "Head")
      return ancestors("Function");
    if (dom[0] === "Symbol")
      return ancestors("Symbol");
    if (dom[0] === "Tuple")
      return ancestors("Tuple");
    if (dom[0] === "List")
      return ancestors("List");
    if (dom[0] === "Dictionary")
      return ancestors("Dictionary");
    if (dom[0] === "Range")
      return ancestors("Integer");
    if (dom[0] === "Interval")
      return ancestors("RealNumberExtended");
    if (dom[0] === "Maybe" || dom[0] === "Sequence")
      return ancestors(dom[1]);
    if (dom[0] === "Literal")
      return ["Anything"];
    if (dom[0] === "Union")
      return ["Anything"];
    if (dom[0] === "Intersection")
      return ["Anything"];
    return ["Anything"];
  }
  if (typeof DOMAIN_LITERAL[dom] === "string")
    result = [DOMAIN_LITERAL[dom], ...ancestors(DOMAIN_LITERAL[dom])];
  else if (Array.isArray(DOMAIN_LITERAL[dom]))
    for (const parent of DOMAIN_LITERAL[dom]) {
      result.push(parent);
      result.push(...ancestors(parent));
    }
  gDomainLiterals[dom] = new Set(result);
  return result;
}

// src/compute-engine/boxed-expression/boxed-domain.ts
var _BoxedDomain = class __BoxedDomain extends AbstractBoxedExpression {
  constructor(ce, dom, metadata) {
    super(ce, metadata);
    this._value = makeCanonical(ce, dom);
  }
  get isCanonical() {
    return true;
  }
  /** Boxed domains are always canonical. */
  get canonical() {
    return this;
  }
  get isValid() {
    return this.ctor !== "Error";
  }
  get json() {
    const s = serialize(this.engine, this._value);
    if (head(s) === "Error")
      return s;
    return ["Domain", s];
  }
  get literal() {
    if (typeof this._value === "string")
      return this._value;
    return null;
  }
  get ctor() {
    if (typeof this._value === "string")
      return null;
    return this._value[0];
  }
  get domainArgs() {
    if (typeof this._value === "string")
      return null;
    return this._value.slice(1);
  }
  get domainArg1() {
    if (typeof this._value === "string")
      return null;
    return this._value[1];
  }
  get codomain() {
    if (typeof this._value === "string")
      return null;
    return this.engine.domain(this._value[this._value.length - 1]);
  }
  get hash() {
    if (this._hash === void 0)
      this._hash = hashCode(hash(this._value));
    return this._hash;
  }
  isEqual(rhs) {
    return isEqual(this._value, rhs);
  }
  isSame(rhs) {
    return isEqual(this._value, rhs);
  }
  is(rhs) {
    return isEqual(this._value, rhs);
  }
  isCompatible(dom, compatibility = "covariant") {
    const lhs = this._value;
    const rhs = dom instanceof __BoxedDomain ? dom._value : dom;
    const rhsCtor = Array.isArray(rhs) ? rhs[0] : null;
    if (rhsCtor) {
      const rhsParam = rhs[1];
      if (rhsCtor === "Covariant")
        return isSubdomainOf1(lhs, rhsParam);
      if (rhsCtor === "Contravariant")
        return isSubdomainOf1(rhsParam, lhs);
      if (rhsCtor === "Invariant")
        return !isSubdomainOf1(rhsParam, lhs) && !isSubdomainOf1(lhs, rhsParam);
      if (rhsCtor === "Bivariant")
        return isSubdomainOf1(lhs, rhsParam) && isSubdomainOf1(rhsParam, lhs);
    }
    if (compatibility === "covariant")
      return isSubdomainOf1(lhs, rhs);
    if (compatibility === "contravariant")
      return isSubdomainOf1(rhs, lhs);
    if (compatibility === "bivariant")
      return isSubdomainOf1(rhs, lhs) && isSubdomainOf1(lhs, rhs);
    return !isSubdomainOf1(rhs, lhs) && !isSubdomainOf1(lhs, rhs);
  }
  match(rhs, _options) {
    if (!(rhs instanceof __BoxedDomain))
      return null;
    if (this.isSame(rhs))
      return {};
    return null;
  }
  get head() {
    return "Domain";
  }
  get domain() {
    return this.engine.domain("Domain");
  }
  get isNothing() {
    return this._value === "Nothing";
  }
  get isFunction() {
    return this.ctor === "Function" || this._value === "Function";
  }
  // get isPredicate(): boolean {
  //   if (this.domainLiteral === 'Predicate') return true;
  //   if (this.domainConstructor !== 'Function') return false;
  //   const resultDomain = this._value[this._value.length];
  //   if (!(resultDomain instanceof _Domain)) return false;
  //   return resultDomain.isBoolean;
  // }
  // get isNumericFunction(): boolean {
  //   if (this.domainLiteral === 'NumericFunction') return true;
  //   if (this.domainConstructor !== 'Function') return false;
  //   for (const arg of this.domainParams!)
  //     if (!isNumericSubdomain(arg, 'Number')) return false;
  //   return true;
  // }
  // get isBoolean(): boolean {
  //   const dom = this.domainLiteral;
  //   return dom === 'Boolean' || dom === 'MaybeBoolean';
  // }
  // get isRealFunction(): boolean {
  //   if (this.domainLiteral === 'RealFunction') return true;
  //   if (this.domainConstructor !== 'Function') return false;
  //   for (const arg of this.domainParams!)
  //     if (!isNumericSubdomain(arg, 'ExtendedRealNumber')) return false;
  //   return true;
  // }
  get isNumeric() {
    return this.isCompatible(this.engine.domain("Number"));
  }
  // get isLogicOperator(): boolean {
  //   if (this.domainLiteral === 'LogicOperator') return true;
  //   if (!this.codomain?.isBoolean) return false;
  //   const params = this.domainParams!;
  //   if (params.length < 1 || params.length > 2) return false;
  //   if (!params[0].isBoolean) return false;
  //   if (params.length === 1) return true;
  //   if (!params[1].isBoolean) return false;
  //   return true;
  // }
  get isRelationalOperator() {
    if (this._value === "RelationalOperator")
      return true;
    if (this.ctor !== "Function")
      return false;
    if (this.domainArgs.length !== 2)
      return false;
    if (!this.codomain.isCompatible("MaybeBoolean"))
      return false;
    return true;
  }
};
function boxDomain(ce, dom, metadata) {
  if (dom instanceof _BoxedDomain)
    return dom;
  if (dom instanceof AbstractBoxedExpression)
    dom = dom.json;
  if (typeof dom === "string") {
    const expr = DOMAIN_ALIAS[dom];
    if (expr)
      return boxDomain(ce, expr);
    if (!isDomainLiteral(dom))
      throw Error("Expected a domain literal, got " + dom);
    return new _BoxedDomain(ce, dom, metadata);
  }
  if (!Array.isArray(dom) || dom.length === 0)
    throw Error("Expected a valid domain");
  const constructor = dom[0];
  if (!DOMAIN_CONSTRUCTORS.includes(constructor))
    throw Error("Expected domain constructor, got " + constructor);
  return new _BoxedDomain(ce, dom, metadata);
}
function makeCanonical(ce, dom) {
  if (typeof dom === "string") {
    if (!isDomainLiteral(dom))
      throw Error("Unknown domain literal");
    return dom;
  }
  if (dom instanceof _BoxedDomain)
    return dom._value;
  const ctor = dom[0];
  if (!ctor)
    ;
  if (ctor === "Range") {
    if (dom.length === 1)
      return "Integer";
    let first = 1;
    let last = Infinity;
    if (dom.length === 2) {
      last = dom[1];
    } else if (dom.length === 3) {
      first = dom[1];
      last = dom[2];
    }
    const firstNum = asRangeBound(ce, first);
    const lastNum = asRangeBound(ce, last);
    if (firstNum === null || lastNum === null)
      throw Error(`Invalid range [${firstNum}, ${lastNum}] `);
    if (lastNum < firstNum)
      [first, last] = [last, first];
    if (firstNum === -Infinity && lastNum === Infinity)
      return "Integer";
    if (firstNum === 1 && lastNum === Infinity)
      return "PositiveInteger";
    if (firstNum === 0 && lastNum === Infinity)
      return "NonNegativeInteger";
    if (firstNum === -Infinity && lastNum === -1)
      return "NegativeInteger";
    if (firstNum === -Infinity && lastNum === 0)
      return "NonPositiveInteger";
    return ["Range", ce.number(firstNum), ce.number(lastNum)];
  }
  if (ctor === "Interval") {
    if (dom.length !== 3)
      throw Error("Invalid range " + dom);
    let [isLeftOpen, first] = maybeOpen(ce, dom[1]);
    let [isRightOpen, last] = maybeOpen(ce, dom[2]);
    if (first === null || last === null)
      throw Error("Invalid range " + dom);
    if (last < first) {
      [first, last] = [last, first];
      [isLeftOpen, isRightOpen] = [isRightOpen, isLeftOpen];
    }
    if (first === 0 && last === Infinity)
      return isLeftOpen ? "PositiveNumber" : "NonNegativeNumber";
    if (first === -Infinity && last === 0)
      return isRightOpen ? "NegativeNumber" : "NonPositiveNumber";
    return [
      "Interval",
      isLeftOpen ? ["Open", ce.number(first)] : ce.number(first),
      isRightOpen ? ["Open", ce.number(last)] : ce.number(last)
    ];
  }
  if (ctor === "Function") {
    return [
      "Function",
      ...dom.slice(1).map((x) => makeCanonical(ce, x))
    ];
  }
  if (ctor === "Dictionary") {
    return ["Dictionary", makeCanonical(ce, dom[1])];
  }
  if (ctor === "List") {
    return ["List", makeCanonical(ce, dom[1])];
  }
  if (ctor === "Tuple") {
    return [
      "Tuple",
      ...dom.slice(1).map((x) => makeCanonical(ce, x))
    ];
  }
  if (ctor === "Union") {
    return [
      "Union",
      ...dom.slice(1).map((x) => makeCanonical(ce, x))
    ];
  }
  if (ctor === "Intersection") {
    return [
      "Intersection",
      ...dom.slice(1).map((x) => makeCanonical(ce, x))
    ];
  }
  if (ctor === "Covariant" || ctor === "Contravariant" || ctor === "Invariant") {
    return [ctor, makeCanonical(ce, dom[1])];
  }
  if (ctor === "Maybe") {
    return ["Maybe", makeCanonical(ce, dom[1])];
  }
  if (ctor === "Sequence") {
    return ["Sequence", makeCanonical(ce, dom[1])];
  }
  if (ctor === "Head") {
    return ["Head", dom[1]];
  }
  if (ctor === "Symbol") {
    return ["Symbol", dom[1]];
  }
  if (ctor === "Value") {
    return ["Value", ce.box(dom[1])];
  }
  if (ctor === "Error") {
    return ["Error", ...dom.slice(1).map((x) => ce.box(x))];
  }
  throw Error("Unexpected domain constructor " + ctor);
}
function asRangeBound(ce, expr) {
  if (typeof expr === "number")
    return expr;
  const x = ce.box(expr).evaluate();
  return x.isInfinity ? x.isPositive ? Infinity : -Infinity : asSmallInteger(x);
}
function maybeOpen(ce, expr) {
  if (Array.isArray(expr) && expr[0] === "Open")
    return [true, asRangeBound(ce, expr[1])];
  return [false, asRangeBound(ce, expr)];
}
function isDomain(expr) {
  if (expr instanceof _BoxedDomain)
    return true;
  if (expr instanceof AbstractBoxedExpression)
    expr = expr.json;
  if (typeof expr === "string")
    return isDomainLiteral(expr);
  if (Array.isArray(expr)) {
    if (expr.length <= 1)
      return false;
    const ctor = expr[0];
    if (typeof ctor !== "string" || !DOMAIN_CONSTRUCTORS.includes(ctor))
      return false;
    if (ctor === "List")
      return expr.length === 2 && isDomain(expr[1]);
    if (ctor === "Tuple" || ctor === "Function" || ctor === "Maybe" || ctor === "Sequence" || ctor === "Intersection" || ctor === "Union")
      return expr.slice(1, -1).every((x) => isDomain(x));
    return expr.every((x) => x !== null);
  }
  return false;
}
function isSubdomainOf1(lhs, rhs) {
  const [result, rest] = isSubdomainOf([lhs], rhs);
  if (result && rest.length === 0)
    return true;
  return false;
}
function isSubdomainOf(xlhs, rhs) {
  let lhs = xlhs.shift();
  const rhsLiteral = typeof rhs === "string" ? rhs : null;
  if (rhsLiteral === "Anything")
    return [true, xlhs];
  const lhsLiteral = typeof lhs === "string" ? lhs : null;
  if (lhsLiteral && rhsLiteral) {
    if (lhsLiteral === rhsLiteral)
      return [true, xlhs];
    return [ancestors(lhsLiteral).includes(rhsLiteral), xlhs];
  }
  if (rhsLiteral) {
    if (!lhs)
      ;
    const lhsConstructor = lhs[0];
    if (lhsConstructor === "Function")
      return [rhsLiteral === "Function", xlhs];
    if (lhsConstructor === "Dictionary")
      return [rhsLiteral === "Dictionary", xlhs];
    if (lhsConstructor === "List")
      return [rhsLiteral === "List", xlhs];
    if (lhsConstructor === "Tuple")
      return [rhsLiteral === "Tuple", xlhs];
    if (lhsConstructor === "Intersection") {
    }
    if (lhsConstructor === "Interval")
      return [isSubdomainOf1("ExtendedRealNumber", rhsLiteral), xlhs];
    if (lhsConstructor === "Range")
      return [isSubdomainOf1("Integer", rhsLiteral), xlhs];
    return [true, xlhs];
  }
  const rhsConstructor = rhs[0];
  if (rhsConstructor === "Function") {
    if (lhsLiteral === "Function")
      return [true, xlhs];
    if (lhsLiteral)
      return [false, xlhs];
    if (lhs[0] !== "Function")
      return [false, xlhs];
    if (lhs.length === 1 && rhs.length === 1)
      return [true, xlhs];
    if (!isSubdomainOf1(
      lhs[lhs.length - 1],
      rhs[rhs.length - 1]
    ))
      return [false, xlhs];
    const lhsParams = lhs.slice(1, -1);
    let rhsParams = rhs.slice(1, -1);
    for (let i = 0; i <= lhsParams.length - 1; i++) {
      if (rhsParams.length === 0) {
        const lhsCtor = Array.isArray(lhsParams[i]) ? lhsParams[i][0] : null;
        if (lhsCtor !== "Maybe")
          return [false, xlhs];
        return [true, xlhs];
      } else {
        let match2 = false;
        [match2, rhsParams] = isSubdomainOf(rhsParams, lhsParams[i]);
        if (!match2)
          return [false, xlhs];
      }
    }
    return [rhsParams.length === 0, xlhs];
  }
  if (rhsConstructor === "Intersection") {
    return [
      rhs.slice(1, -1).every(
        (x) => isSubdomainOf1(lhs, x)
      ),
      xlhs
    ];
  }
  if (rhsConstructor === "Union") {
    return [
      rhs.slice(1, -1).some((x) => isSubdomainOf1(lhs, x)),
      xlhs
    ];
  }
  if (rhsConstructor === "Maybe") {
    if (lhsLiteral === "Nothing")
      return [true, xlhs];
    return isSubdomainOf(
      [lhs, ...xlhs],
      rhs[1]
    );
  }
  if (rhsConstructor === "Sequence") {
    const seq = rhs[1];
    if (!isSubdomainOf1(lhs, seq))
      return [false, xlhs];
    lhs = xlhs.shift();
    let match2 = true;
    while (xlhs.length > 0 && match2) {
      [match2, xlhs] = isSubdomainOf(xlhs, seq);
      lhs = xlhs.shift();
    }
    return [true, xlhs];
  }
  if (rhsConstructor === "Tuple") {
    if (!Array.isArray(lhs) || lhs[0] !== "Tuple")
      return [false, xlhs];
    if (lhs.length > rhs.length)
      return [false, xlhs];
    for (let i = 1; i <= rhs.length - 1; i++) {
      if (!lhs[i] || !isSubdomainOf1(
        lhs[i],
        rhs[i]
      ))
        return [false, xlhs];
    }
    return [true, xlhs];
  }
  if (rhsConstructor === "Range") {
    if (!Array.isArray(lhs) || lhs[0] !== "Range")
      return [false, xlhs];
    const lhsMin = asFloat(lhs[1]);
    const lhsMax = asFloat(lhs[2]);
    const rhsMin = asFloat(rhs[1]);
    const rhsMax = asFloat(rhs[2]);
    return [
      lhsMin !== null && lhsMax !== null && rhsMin !== null && rhsMax !== null && lhsMin >= rhsMin && lhsMax <= rhsMax,
      xlhs
    ];
  }
  if (rhsConstructor === "Interval") {
    if (!Array.isArray(lhs) || lhs[0] !== "Interval")
      return [false, xlhs];
    const lhsMin = asFloat(lhs[1]);
    const lhsMax = asFloat(lhs[2]);
    const rhsMin = asFloat(rhs[1]);
    const rhsMax = asFloat(rhs[2]);
    return [
      lhsMin !== null && lhsMax !== null && rhsMin !== null && rhsMax !== null && lhsMin >= rhsMin && lhsMax <= rhsMax,
      xlhs
    ];
  }
  console.error("Unexpected domain constructor " + rhsConstructor);
  return [false, xlhs];
}
function sharedAncestorDomain(a, b) {
  const aLiteral = domainLiteralAncestor(a);
  const bLiteral = domainLiteralAncestor(b);
  const aAncestors = [aLiteral, ...ancestors(aLiteral)];
  const bAncestors = [bLiteral, ...ancestors(bLiteral)];
  while (!bAncestors.includes(aAncestors[0]))
    aAncestors.shift();
  return a.engine.domain(aAncestors[0]);
}
function domainLiteralAncestor(dom) {
  let result = dom.literal;
  if (result)
    return result;
  result = dom.ctor;
  if (result === "Maybe")
    return "Anything";
  if (result === "Interval")
    return "RealNumber";
  if (result === "Range")
    return "Integer";
  if (result === "Head")
    return "Function";
  if (result === "Union")
    return "Anything";
  if (result === "Intersection")
    return "Anything";
  return result;
}
function serialize(ce, dom) {
  if (dom instanceof AbstractBoxedExpression)
    return dom.json;
  if (typeof dom === "string")
    return dom;
  if (dom[0] === "Error") {
    if (dom[2])
      return [
        "Error",
        serialize(ce, dom[1]),
        serialize(ce, dom[2])
      ];
    return [
      "Error",
      serialize(ce, dom[1])
    ];
  }
  const result = [serializeJsonSymbol(ce, dom[0])];
  if (dom.length > 1)
    for (let i = 1; i <= dom.length - 1; i++)
      result.push(serialize(ce, dom[i]));
  return result;
}
function hash(dom) {
  if (typeof dom === "string")
    return "domain:" + dom;
  let s = "domain:" + this.ctor;
  for (const arg of this.domainArgs)
    s += ":" + hash(arg);
  return s;
}
function isEqual(lhs, rhs) {
  if (typeof rhs === "string")
    return this._value === rhs;
  if (rhs instanceof _BoxedDomain)
    return isEqual(lhs, rhs._value);
  if (typeof lhs === "string")
    return lhs === rhs;
  /* @__PURE__ */ console.assert(Array.isArray(lhs));
  if (!Array.isArray(rhs))
    return false;
  if (lhs[0] !== rhs[0])
    return false;
  if (rhs.length !== lhs.length)
    return false;
  for (let i = 1; i <= lhs.length - 1; i++) {
    if (lhs[i] instanceof AbstractBoxedExpression) {
      if (!(rhs[i] instanceof AbstractBoxedExpression))
        return false;
      if (!rhs[i].isEqual(rhs[i]))
        return false;
    } else if (typeof lhs[i] === "string") {
      if (typeof rhs[i] !== "string")
        return false;
      if (lhs[i] !== rhs[i])
        return false;
    } else if (!isEqual(lhs[i], rhs[i]))
      return false;
  }
  return true;
}

// src/compute-engine/library/arithmetic-add.ts
function canonicalAdd(ce, ops2) {
  /* @__PURE__ */ console.assert(ops2.every((x) => x.isCanonical));
  ops2 = ops2.filter((x) => x.numericValue === null || !x.isZero);
  if (ops2.length === 0)
    return ce.number(0);
  if (ops2.length === 1)
    return ops2[0];
  if (ops2.length === 2) {
    let im = 0;
    let re = 0;
    re = asFloat(ops2[0]);
    if (re !== null && re !== 0)
      im = getImaginaryCoef(ops2[1]);
    else {
      im = getImaginaryCoef(ops2[0]);
      if (im !== 0 && ops2[1].numericValue !== null)
        re = asFloat(ops2[1]);
    }
    if (re !== null && im !== null && im !== 0)
      return ce.number(ce.complex(re, im));
  }
  if (ops2.length > 1)
    ops2 = sortAdd(ce, ops2);
  return ce._fn("Add", ops2);
}
function domainAdd(_ce, args) {
  let dom = null;
  for (const arg of args) {
    if (!arg.isNumeric)
      return null;
    if (!dom)
      dom = arg;
    else
      dom = sharedAncestorDomain(dom, arg);
  }
  return dom;
}
function simplifyAdd(ce, args) {
  /* @__PURE__ */ console.assert(args.length > 1, `simplifyAdd: not enough args`);
  const sum2 = new Sum(ce);
  for (let arg of args) {
    arg = arg.simplify();
    if (arg.isImaginary && arg.isInfinity)
      return ce.symbol("ComplexInfinity");
    if (arg.isNaN || arg.symbol === "Undefined")
      return ce._NAN;
    if (!arg.isZero)
      sum2.addTerm(arg);
  }
  return sum2.asExpression("expression");
}
function evalAddNum(ops2) {
  let sum2 = 0;
  for (const op3 of ops2) {
    const v = op3.numericValue;
    if (typeof v === "number")
      sum2 += v;
    else
      return null;
  }
  return sum2;
}
function evalAdd(ce, ops2, mode = "evaluate") {
  if (mode === "N" && ce.numericMode === "machine") {
    ops2 = ops2.map((x) => x.N());
    const sum2 = evalAddNum(ops2);
    if (sum2 !== null)
      return ce.number(sum2);
  }
  for (const arg of ops2) {
    if (arg.isImaginary && arg.isInfinity)
      return ce.symbol("ComplexInfinity");
    if (arg.isNaN || arg.symbol === "Undefined")
      return ce._NAN;
    if (!arg.isExact)
      mode = "N";
  }
  if (mode === "N")
    ops2 = ops2.map((x) => x.N());
  else
    ops2 = ops2.map((x) => x.evaluate());
  return new Sum(ce, ops2).asExpression(mode === "N" ? "numeric" : "expression");
}
function canonicalSummation(ce, body, range) {
  body ?? (body = ce.error(["missing", "Function"]));
  let index = null;
  let lower = null;
  let upper = null;
  if (range && range.head !== "Tuple" && range.head !== "Triple" && range.head !== "Pair" && range.head !== "Single") {
    index = range;
  } else if (range) {
    index = range.ops?.[0] ?? null;
    lower = range.ops?.[1]?.canonical ?? null;
    upper = range.ops?.[2]?.canonical ?? null;
  }
  if (index?.head === "Hold")
    index = index.op1;
  if (index?.head === "ReleaseHold")
    index = index.op1?.evaluate();
  index ?? (index = ce.symbol("Nothing"));
  if (!index.symbol)
    index = ce.error(["incompatible-domain", "Symbol", index.domain]);
  if (index.symbol)
    ce.pushScope({ [index.symbol]: { domain: "Integer" } });
  const fn = body.canonical;
  if (index.symbol) {
    ce.popScope();
    index = index = ce.hold(index);
  }
  if (lower && upper)
    range = ce.tuple([index, lower, upper]);
  else if (upper)
    range = ce.tuple([index, lower ?? ce._NEGATIVE_INFINITY, upper]);
  else if (lower)
    range = ce.tuple([index, lower]);
  else
    range = index;
  return ce._fn("Sum", [fn, range]);
}
function evalSummation(ce, expr, range, mode) {
  const fn = expr;
  let lower = 1;
  let upper = MAX_ITERATION;
  let index = "Nothing";
  if (range.head === "Tuple" || range.head === "Triple" || range.head === "Pair" || range.head === "Single") {
    index = (range.op1.head === "Hold" ? range.op1.op1.symbol : range.op1.symbol) ?? "Nothing";
    lower = asSmallInteger(range.op2) ?? 1;
    upper = asSmallInteger(range.op3) ?? MAX_ITERATION;
  }
  if (mode !== "N" && (lower >= upper || upper - lower >= MAX_SYMBOLIC_TERMS))
    return void 0;
  const savedContext = ce.context;
  ce.context = fn.scope ?? ce.context;
  if (mode === "simplify") {
    const terms = [];
    if (!fn.scope)
      for (let i = lower; i <= upper; i++)
        terms.push(fn.simplify());
    else
      for (let i = lower; i <= upper; i++) {
        ce.set({ [index]: i });
        terms.push(fn.simplify());
      }
    ce.context = savedContext;
    return ce.add(terms).simplify();
  }
  if (mode === "evaluate") {
    const terms = [];
    if (!fn.scope)
      for (let i = lower; i <= upper; i++)
        terms.push(fn.evaluate());
    else
      for (let i = lower; i <= upper; i++) {
        ce.set({ [index]: i });
        terms.push(fn.evaluate());
      }
    ce.context = savedContext;
    return ce.add(terms).evaluate();
  }
  let sum2 = bignumPreferred(ce) ? [BigInt(1), BigInt(1)] : [0, 1];
  if (!fn.scope)
    for (let i = lower; i <= upper; i++) {
      const term = fn.N();
      if (term.numericValue === null)
        return void 0;
      sum2 = add2(sum2, term);
    }
  else
    for (let i = lower; i <= upper; i++) {
      ce.set({ [index]: i });
      const term = fn.N();
      if (term.numericValue === null) {
        ce.context = savedContext;
        return void 0;
      }
      sum2 = add2(sum2, term);
    }
  ce.context = savedContext;
  if (isMachineRational(sum2))
    return ce.number(sum2[0] / sum2[1]);
  return ce.number(ce.bignum(sum2[0]).div(ce.bignum(sum2[1])));
}

// src/compute-engine/library/arithmetic-power.ts
var import_complex15 = __toESM(require_complex());

// src/compute-engine/symbolic/utils.ts
var import_complex14 = __toESM(require_complex());
function makePositive(expr) {
  if (expr.head === "Negate")
    return [-1, expr.op1];
  const n = expr.numericValue;
  if (n === null)
    return [1, expr];
  const ce = expr.engine;
  if (typeof n === "number" && n < 0)
    return [-1, ce.number(-n)];
  if (n instanceof decimal_default && n.isNegative())
    return [-1, ce.number(n.neg())];
  if (n instanceof import_complex14.default && n.re < 0)
    return [-1, ce.number(ce.complex(-n.re, -n.im))];
  if (isMachineRational(n) && n[0] < 0)
    return [-1, ce.number([-n[0], n[1]])];
  if (isBigRational(n) && n[0] < 0)
    return [-1, ce.number([-n[0], n[1]])];
  return [1, expr];
}
function apply2(expr, fn, bigFn, complexFn) {
  const n = expr.numericValue;
  const ce = expr.engine;
  /* @__PURE__ */ console.assert(n !== null);
  if (typeof n === "number") {
    if (bignumPreferred(ce) && bigFn)
      return ce.chop(bigFn(ce.bignum(n)));
    return ce.chop(fn(n));
  }
  if (n instanceof decimal_default)
    return ce.chop(bigFn?.(n) ?? fn(n.toNumber()));
  if (isMachineRational(n)) {
    if (!bignumPreferred(ce) || !bigFn)
      return ce.chop(fn(n[0] / n[1]));
    return ce.chop(bigFn(ce.bignum(n[0]).div(n[1])));
  }
  if (isBigRational(n)) {
    if (bigFn)
      return ce.chop(bigFn(ce.bignum(n[0]).div(ce.bignum(n[1]))));
    return ce.chop(fn(Number(n[0]) / Number(n[1])));
  }
  if (n instanceof import_complex14.default) {
    if (!complexFn || !complexAllowed(ce))
      return NaN;
    return ce.chop(complexFn(n));
  }
  return NaN;
}
function applyN(expr, fn, bigFn, complexFn) {
  if (expr.numericValue === null)
    return void 0;
  return expr.engine.number(apply2(expr, fn, bigFn, complexFn));
}
function apply22(expr1, expr2, fn, bigFn, complexFn) {
  /* @__PURE__ */ console.assert(expr1.numericValue !== null && expr2.numericValue !== null);
  const ce = expr1.engine;
  let m1 = expr1.numericValue;
  if (isMachineRational(m1))
    m1 = m1[0] / m1[1];
  let m2 = expr2.numericValue;
  if (isMachineRational(m2))
    m2 = m2[0] / m2[1];
  if (!bignumPreferred(ce) && typeof m1 === "number" && typeof m2 === "number")
    return fn(m1, m2);
  let b1 = void 0;
  if (m1 instanceof decimal_default)
    b1 = m1;
  else if (isBigRational(m1))
    b1 = ce.bignum(m1[0]).div(ce.bignum(m1[1]));
  else if (m1 !== null && typeof m1 === "number")
    b1 = ce.bignum(m1);
  let b2 = void 0;
  if (m2 instanceof decimal_default)
    b2 = m2;
  else if (isBigRational(m2))
    b1 = ce.bignum(m2[0]).div(ce.bignum(m2[1]));
  else if (m2 !== null && typeof m2 === "number")
    b2 = ce.bignum(m2);
  if (b1 && b2)
    return bigFn?.(b1, b2) ?? fn(b1.toNumber(), b2.toNumber());
  if (m1 instanceof import_complex14.default || m2 instanceof import_complex14.default) {
    if (!complexFn || !complexAllowed(ce))
      return NaN;
    return complexFn(
      ce.complex(m1 ?? b1?.toNumber() ?? NaN),
      ce.complex(m2 ?? b2?.toNumber() ?? NaN)
    );
  }
  return NaN;
}
function apply2N(expr1, expr2, fn, bigFn, complexFn) {
  if (expr1.numericValue === null || expr2.numericValue === null)
    return void 0;
  return expr1.engine.number(apply22(expr1, expr2, fn, bigFn, complexFn));
}

// src/compute-engine/library/arithmetic-power.ts
function canonicalPower(ce, base, exponent, metadata) {
  if (exponent.symbol === "ComplexInfinity")
    return ce._NAN;
  if (exponent.isZero)
    return ce._ONE;
  if (exponent.isOne)
    return base;
  if (exponent.isNegativeOne)
    return ce.inv(base);
  if (exponent.numericValue !== null) {
    if (base.numericValue !== null) {
      const numBase = asFloat(base);
      if (numBase === 1)
        return ce._ONE;
      if (numBase === 0) {
        if (exponent.isPositive)
          return ce._ZERO;
        if (exponent.isNegative)
          return ce._COMPLEX_INFINITY;
      }
      if (exponent.isNegativeOne)
        return ce.inv(base);
      const e = asFloat(exponent);
      if (e === 0.5 || e === -0.5) {
        const b = asSmallInteger(base);
        if (b !== null && b > 0) {
          const [coef, radicand] = factorPower(b, 2);
          if (radicand === 1 && coef === 1)
            return ce._ONE;
          if (coef !== 1) {
            if (radicand === 1)
              return ce.number(e >= 0 ? coef : [1, coef]);
            return ce.mul([
              ce.number(coef),
              ce._fn("Sqrt", [ce.number(radicand)])
            ]);
          }
          if (e > 0)
            return ce._fn("Sqrt", [base], metadata);
          return ce.inv(ce._fn("Sqrt", [base]), metadata);
        }
        if (e > 0)
          return ce._fn("Power", [base, ce._HALF], metadata);
        return ce._fn("Power", [base, ce.number([-1, 2])], metadata);
      }
      if (base.isInfinity) {
        if (exponent.numericValue instanceof import_complex15.default) {
          const re = exponent.numericValue.re;
          if (re === 0)
            return ce._NAN;
          if (re < 0)
            return ce._ZERO;
          if (re > 0)
            return ce._COMPLEX_INFINITY;
        }
        if (base.isNegative) {
          if (exponent.isInfinity)
            return ce._NAN;
        } else if (base.isPositive) {
          if (exponent.isNegativeOne)
            return ce._ZERO;
          if (exponent.isInfinity)
            return exponent.isNegative ? ce._ZERO : ce._POSITIVE_INFINITY;
        }
      }
      if (exponent.isInfinity && (base.isOne || base.isNegativeOne))
        return ce._NAN;
    }
  }
  if (base.head === "Power" && base.op1.isReal) {
    const a = asSmallInteger(exponent);
    if (a !== null) {
      const b = asSmallInteger(base.op2);
      if (b !== null) {
        return ce.pow(base.op1, ce.number(a * b));
      }
    }
    if (base.op1.isNonNegative) {
      const ar = asRational(exponent);
      if (ar) {
        const br = asRational(base.op2);
        if (br)
          return ce.pow(base.op1, ce.number(mul2(ar, br)));
      }
    }
  }
  if (base.head === "Multiply") {
    const e = asSmallInteger(exponent);
    if (e !== null)
      return ce._fn(
        "Multiply",
        base.ops.map((x) => ce.pow(x, exponent))
      );
  }
  return ce._fn("Power", [base, exponent], metadata);
}
function square(ce, base) {
  const num = base.numericValue;
  if (typeof num === "number")
    return ce.number(num * num);
  if (num instanceof decimal_default)
    return ce.number(num.pow(2));
  if (num instanceof import_complex15.default)
    return ce.number(num.pow(2));
  if (isMachineRational(num))
    return ce.number([num[1] * num[1], num[0] * num[0]]);
  if (isBigRational(num))
    return ce.number([num[1] * num[1], num[0] * num[0]]);
  if (base.head === "Multiply")
    return ce._fn(
      "Multiply",
      base.ops.map((x) => square(ce, x))
    );
  if (base.head === "Power") {
    const exp2 = asSmallInteger(base.op2);
    if (exp2 !== null)
      return ce.pow(base.op1, ce.number(exp2 * 2));
    return ce.pow(base.op1, ce.mul([ce.number(2), base.op2]));
  }
  return ce.pow(base, ce.number(2));
}
function numEvalPower(ce, base, exponent) {
  if (base.numericValue === null || exponent.numericValue === null)
    return void 0;
  if (base.numericValue instanceof import_complex15.default) {
    if (exponent.numericValue instanceof import_complex15.default)
      return ce.number(base.numericValue.pow(exponent.numericValue));
    return ce.number(base.numericValue.pow(asFloat(exponent) ?? NaN));
  }
  if (exponent.numericValue instanceof import_complex15.default) {
    const b = asFloat(base) ?? null;
    if (b !== null)
      return ce.number(ce.complex(b).pow(exponent.numericValue));
    return void 0;
  }
  const invExp = rootExp(exponent);
  if (bignumPreferred(ce) || base.numericValue instanceof decimal_default || exponent.numericValue instanceof decimal_default) {
    const bigBase = asBignum(base);
    const bigExp = asBignum(exponent);
    if (!bigBase || !bigExp)
      return void 0;
    if (invExp === 2) {
      if (bigBase.isNeg())
        return complexAllowed(ce) ? ce.number(ce.complex(0, bigBase.neg().sqrt().toNumber())) : ce._NAN;
      return ce.number(bigBase.sqrt());
    }
    if (!bigExp.isInteger() && bigBase.isNeg()) {
      if (!complexAllowed(ce))
        return ce._NAN;
      const zBase = ce.complex(bigBase.toNumber());
      const zExp = ce.complex(bigExp.toNumber());
      return ce.number(zBase.pow(zExp));
    }
    return ce.number(bigBase.pow(bigExp));
  }
  const floatExp = asFloat(exponent) ?? NaN;
  const floatBase = asFloat(base) ?? NaN;
  if (invExp === 2) {
    if (floatBase < 0) {
      return complexAllowed(ce) ? ce.mul([ce._I, ce.number(Math.sqrt(-floatBase))]) : ce._NAN;
    }
    return ce.number(Math.sqrt(floatBase));
  }
  if (!Number.isInteger(floatExp) && floatBase < 0) {
    if (!complexAllowed(ce))
      return ce._NAN;
    const zBase = ce.complex(floatBase);
    const zExp = ce.complex(floatExp);
    return ce.number(zBase.pow(zExp));
  }
  return ce.number(Math.pow(floatBase, floatExp));
}
function processPower(ce, base, exponent, mode) {
  if (base.head === "Multiply") {
    let c = bignumPreferred(ce) ? [BigInt(1), BigInt(1)] : [1, 1];
    const xs = [];
    for (const op3 of base.ops) {
      const r = asRational(op3);
      if (r)
        c = mul2(c, r);
      else
        xs.push(op3);
    }
    if (!isRationalOne(c))
      return ce.mul([
        processSqrt(ce, ce.number(c), mode) ?? ce._ONE,
        ce.pow(
          processPower(ce, ce.mul(xs), exponent, mode) ?? ce.mul(xs),
          exponent
        )
      ]);
  }
  if (base.head === "Power") {
    if (asSmallInteger(base.op2) === -1 && asSmallInteger(exponent) === -1)
      return base.op1;
    const e1 = asRational(base.op2);
    const e2 = asRational(exponent);
    if (e1 && e2) {
      const e = mul2(e1, e2);
      if (isRationalZero(e))
        return ce._ONE;
      if (isRationalOne(e))
        return base.op1;
      return ce.pow(base.op1, e);
    }
    if (mode === "N") {
      const ef1 = asFloat(base.op2);
      const ef2 = asFloat(exponent);
      if (ef1 !== null && ef2 !== null) {
        const ef = ef1 * ef2;
        if (ef === 0)
          return ce._ONE;
        if (ef === 1)
          return base.op1;
        return ce.pow(base.op1, ef);
      }
    }
  }
  if (mode !== "N" && base.numericValue !== null && base.isInteger) {
    const smallExpr = asSmallInteger(exponent);
    if (smallExpr)
      return numEvalPower(ce, base, exponent);
    const r = asRational(exponent);
    if (r) {
      const [n, d] = [machineNumerator(r), machineDenominator(r)];
      if ((n === 1 || n === -1) && (d === 2 || d === 3)) {
        if (bignumPreferred(ce) || base.numericValue instanceof decimal_default) {
          const bigBase = asBigint(base);
          if (d % 2 === 0 && bigBase < 0 && !complexAllowed(ce))
            return ce._NAN;
          const sign2 = bigBase < 0 ? d % 2 === 0 ? ce._I : ce._NEGATIVE_ONE : ce._ONE;
          const [factor, root] = factorPower2(
            bigBase > 0 ? bigBase : -bigBase,
            d
          );
          if (root === BigInt(1) && factor === BigInt(1))
            return sign2;
          if (factor !== BigInt(1)) {
            if (root === BigInt(1))
              return ce.mul([
                sign2,
                ce.number(n >= 0 ? factor : [BigInt(1), factor])
              ]);
            return ce.mul([
              sign2,
              ce.number(factor),
              ce.pow(ce.number(root), exponent)
            ]);
          }
        } else if (typeof base.numericValue === "number") {
          if (base.numericValue < 0 && d % 2 === 0 && !complexAllowed(ce))
            return ce._NAN;
          const [factor, root] = factorPower(Math.abs(base.numericValue), d);
          const sign2 = base.numericValue < 0 ? d % 2 === 0 ? ce._I : ce._NEGATIVE_ONE : ce._ONE;
          if (root === 1 && factor === 1)
            return sign2;
          if (factor !== 1) {
            if (root === 1)
              return ce.mul([sign2, ce.number(n >= 0 ? factor : [1, factor])]);
            return ce.mul([
              sign2,
              ce.number(factor),
              ce.pow(ce.number(root), exponent)
            ]);
          }
        } else {
        }
      }
      if (base.isNegative) {
        if (!complexAllowed)
          return ce._NAN;
        return ce.mul([ce._I, ce.fn("Sqrt", [ce.neg(base)])]);
      }
      return void 0;
    }
  }
  if (mode !== "simplify" && base.numericValue !== null && exponent.numericValue !== null)
    return numEvalPower(ce, base, exponent);
  return void 0;
}
function processSqrt(ce, base, mode) {
  if (base.isOne)
    return ce._ONE;
  if (base.isZero)
    return ce._ZERO;
  if (base.isNegativeOne)
    return complexAllowed(ce) ? ce._I : ce._NAN;
  if (base.isNegative && !complexAllowed(ce))
    return ce._NAN;
  const r = asRational(base);
  if (mode === "N" || mode === "evaluate" && !r)
    return applyN(
      base,
      (x) => x < 0 ? ce.complex(x).sqrt() : Math.sqrt(x),
      (x) => x.isNeg() ? ce.complex(x.toNumber()).sqrt() : x.sqrt(),
      (x) => x.sqrt()
    );
  const n = asSmallInteger(base);
  if (n !== null) {
    const [factor, root] = factorPower(Math.abs(n), 2);
    if (n < 0) {
      if (root === 1)
        ce.mul([ce.number(ce.complex(0, factor))]);
      return ce.mul([
        ce.number(ce.complex(0, factor)),
        ce.sqrt(ce.number(root))
      ]);
    }
    if (root === 1)
      return ce.number(factor);
    return ce.mul([ce.number(factor), ce.sqrt(ce.number(root))]);
  }
  if (r) {
    if (isMachineRational(r) && !bignumPreferred(ce)) {
      const [n2, d] = r;
      if (Math.abs(n2) < Number.MAX_SAFE_INTEGER && d < Number.MAX_SAFE_INTEGER) {
        const [nFactor, nRoot] = factorPower(Math.abs(n2), 2);
        const [dFactor, dRoot] = factorPower(d, 2);
        if (n2 < 0)
          return ce.mul([
            ce.number([nFactor, dFactor]),
            ce.sqrt(ce.number([nRoot, dRoot])),
            ce._I
          ]);
        return ce.mul([
          ce.number([nFactor, dFactor]),
          ce.sqrt(ce.number([nRoot, dRoot]))
        ]);
      }
    }
    if (isBigRational(r) || bignumPreferred(ce)) {
      const n2 = bigint(r[0]);
      const [nFactor, nRoot] = factorPower2(n2 > 0 ? n2 : -n2, 2);
      const [dFactor, dRoot] = factorPower2(bigint(r[1]), 2);
      if (n2 < 0)
        return ce.mul([
          ce.number([nFactor, dFactor]),
          ce.sqrt(ce.number([nRoot, dRoot])),
          ce._I
        ]);
      return ce.mul([
        ce.number([nFactor, dFactor]),
        ce.sqrt(ce.number([nRoot, dRoot]))
      ]);
    }
  }
  return void 0;
}
function rootExp(exponent) {
  if (typeof exponent.numericValue === "number") {
    const inv = 1 / exponent.numericValue;
    if (Number.isInteger(inv))
      return inv;
    return null;
  }
  if (exponent.numericValue instanceof decimal_default) {
    const inv = exponent.engine._BIGNUM_ONE.div(exponent.numericValue);
    if (inv.isInt())
      return inv.toNumber();
    return null;
  }
  if (!isRational(exponent.numericValue))
    return null;
  const [n, d] = [
    machineNumerator(exponent.numericValue),
    machineDenominator(exponent.numericValue)
  ];
  if (n !== 1 && n !== -1)
    return null;
  return n * d;
}

// src/compute-engine/library/arithmetic-multiply.ts
function canonicalMultiply(ce, ops2) {
  /* @__PURE__ */ console.assert(ops2.every((x) => x.isCanonical));
  if (ops2.length === 0)
    return ce.number(1);
  if (ops2.length === 1)
    return ops2[0];
  if (ops2.length === 2)
    return multiply2(ops2[0], ops2[1]);
  const product = new Product(ce);
  for (const op3 of ops2) {
    if (op3.isNaN || op3.symbol === "Undefined")
      return ce._NAN;
    product.addTerm(op3);
  }
  return product.asExpression();
}
function simplifyMultiply(ce, ops2) {
  /* @__PURE__ */ console.assert(ops2.every((x) => x.head !== "Multiply"));
  const product = new Product(ce);
  for (let op3 of ops2) {
    op3 = op3.simplify();
    if (op3.isNaN || op3.symbol === "Undefined")
      return ce._NAN;
    product.addTerm(op3);
  }
  return product.asExpression();
}
function evalMultiply(ce, ops2, mode = "evaluate") {
  /* @__PURE__ */ console.assert(ops2.length > 1, "evalMultiply(): no arguments");
  if (mode === "N") {
    ops2 = ops2.map((x) => x.N());
    if (ce.numericMode === "machine" && ops2.every((x) => typeof x.numericValue === "number")) {
      let prod = 1;
      for (const op3 of ops2)
        prod *= op3.numericValue;
      return ce.number(prod);
    }
  }
  for (const op3 of ops2) {
    if (op3.isNaN || op3.symbol === "Undefined")
      return ce._NAN;
    if (!op3.isExact)
      mode = "N";
  }
  /* @__PURE__ */ console.assert(ops2.every((x) => x.head !== "Multiply"));
  if (mode === "N")
    ops2 = ops2.map((x) => x.N());
  else
    ops2 = ops2.map((x) => x.evaluate());
  return new Product(ce, ops2).asExpression(mode);
}
function multiply2(op12, op22, metadata) {
  /* @__PURE__ */ console.assert(op12.isCanonical);
  /* @__PURE__ */ console.assert(op22.isCanonical);
  const ce = op12.engine;
  if (op12.numericValue !== null && op22.numericValue !== null && op12.isInteger && op22.isInteger) {
    return apply2N(
      op12,
      op22,
      (a, b) => a * b,
      (a, b) => a.mul(b)
    ) ?? ce._NAN;
  }
  if (op12.isNaN || op22.isNaN || op12.symbol === "Undefined" || op22.symbol === "Undefined")
    return ce._NAN;
  if (op12.isNothing)
    return op22;
  if (op22.isNothing)
    return op12;
  if (op12.numericValue !== null) {
    if (op12.isOne)
      return op22;
    if (op12.isNegativeOne)
      return canonicalNegate(op22);
  }
  if (op22.numericValue !== null) {
    if (op22.isOne)
      return op12;
    if (op22.isNegativeOne)
      return canonicalNegate(op12);
  }
  let sign2 = 1;
  let [t, c] = op12.numericValue !== null ? [op12, op22] : [op22, op12];
  /* @__PURE__ */ console.assert(t.head !== "Subtract");
  if (t.head === "Negate") {
    t = t.op1;
    sign2 = -sign2;
  }
  if (c.numericValue !== null) {
    const r = asRational(c);
    if (r) {
      if (isRationalOne(r))
        return t;
      if (isRationalZero(r))
        return ce._ZERO;
      if (t.head === "Add") {
        if (sign2 < 0)
          c = canonicalNegate(c);
        return ce.add(
          t.ops.map((x) => multiply2(c, x)),
          metadata
        );
      }
      const tr = asRational(t);
      if (tr) {
        const p = mul2(r, tr);
        return ce.number(sign2 < 0 ? neg(p) : p, { metadata });
      }
      if (sign2 < 0)
        return ce._fn("Multiply", [canonicalNegate(c), t], metadata);
      return ce._fn("Multiply", [c, t], metadata);
    }
  }
  if (c.hash === t.hash && c.isSame(t))
    return square(ce, c);
  const product = new Product(ce, [c, t]);
  if (sign2 > 0)
    return product.asExpression();
  return canonicalNegate(product.asExpression(), metadata);
}
function canonicalMultiplication(ce, body, range) {
  body ?? (body = ce.error(["missing", "Function"]));
  let index = null;
  let lower = null;
  let upper = null;
  if (range && range.head !== "Tuple" && range.head !== "Triple" && range.head !== "Pair" && range.head !== "Single") {
    index = range;
  } else if (range) {
    index = range.ops?.[0] ?? null;
    lower = range.ops?.[1]?.canonical ?? null;
    upper = range.ops?.[2]?.canonical ?? null;
  }
  if (index && index.head === "Hold")
    index = index.op1;
  if (index && index.head === "ReleaseHold")
    index = index.op1.evaluate();
  index ?? (index = ce.symbol("Nothing"));
  if (!index.symbol)
    index = ce.error(["incompatible-domain", "Symbol", index.domain]);
  else
    index = ce.hold(index);
  if (lower)
    lower = validateArgument(ce, lower, "ExtendedRealNumber");
  if (upper)
    lower = validateArgument(ce, upper, "ExtendedRealNumber");
  if (lower && upper)
    range = ce.tuple([index, lower, upper]);
  else if (upper)
    range = ce.tuple([index, lower ?? ce._NEGATIVE_INFINITY, upper]);
  else if (lower)
    range = ce.tuple([index, lower]);
  else
    range = index;
  return ce._fn("Product", [body, range]);
}
function evalMultiplication(ce, expr, range, mode) {
  if (expr.head !== "Lambda")
    return void 0;
  const fn = expr.op1;
  let lower = 1;
  let upper = MAX_ITERATION;
  if (range.head === "Tuple" || range.head === "Triple" || range.head === "Pair" || range.head === "Single") {
    lower = asSmallInteger(range.op2) ?? 1;
    upper = asSmallInteger(range.op3) ?? MAX_ITERATION;
  }
  if (lower >= upper || upper - lower >= MAX_SYMBOLIC_TERMS)
    return void 0;
  if (mode === "evaluate" || mode === "simplify") {
    const terms = [];
    for (let i = lower; i <= upper; i++) {
      const n = ce.number(i);
      terms.push(fn.subs({ _1: n, _: n }));
    }
    const product2 = ce.mul(terms);
    return mode === "simplify" ? product2.simplify() : product2.evaluate();
  }
  let product = bignumPreferred(ce) ? [BigInt(1), BigInt(1)] : [1, 1];
  for (let i = lower; i <= upper; i++) {
    const n = ce.number(i);
    const r = fn.subs({ _1: n, _: n });
    const term = r.N();
    if (term.numericValue === null)
      return void 0;
    product = mul2(product, term);
  }
  if (isMachineRational(product))
    return ce.number(product[0] / product[1]);
  return ce.number(ce.bignum(product[0]).div(ce.bignum(product[1])));
}

// src/compute-engine/library/arithmetic-divide.ts
function canonicalDivide(ce, op12, op22) {
  if (!op12.isValid || !op22.isValid)
    return ce._fn("Divide", [op12, op22]);
  if (op12.head === "Negate" && op22.head === "Negate") {
    op12 = op12.op1;
    op22 = op22.op1;
  }
  if (op12.numericValue !== null && op22.numericValue !== null) {
    if (op22.isOne)
      return op12;
    if (op22.isNegativeOne)
      return ce.neg(op12);
    if (op12.isOne)
      return ce.inv(op22);
    if (op12.isNegativeOne)
      return ce.neg(ce.inv(op22));
    const r1 = asRational(op12);
    const r2 = asRational(op22);
    if (r1 && r2 && !isRationalZero(r2))
      return ce.number(mul2(r1, inverse(r2)));
  }
  if ((op12.head === "Divide" || op12.head === "Rational") && (op22.head === "Divide" || op22.head === "Rational")) {
    return canonicalDivide(
      ce,
      ce.mul([op12.op1, op22.op2]),
      ce.mul([op12.op2, op22.op1])
    );
  }
  const num1 = op12.numericValue;
  if (num1 !== null) {
    if (isMachineRational(num1)) {
      const [a, b] = num1;
      return canonicalDivide(ce, ce.mul([ce.number(a), op22]), ce.number(b));
    }
    if (isBigRational(num1)) {
      const [a, b] = num1;
      return canonicalDivide(ce, ce.mul([ce.number(a), op22]), ce.number(b));
    }
  }
  const num2 = op22.numericValue;
  if (num2 !== null) {
    if (isMachineRational(num2)) {
      const [a, b] = num2;
      return canonicalDivide(ce, ce.mul([op12, ce.number(b)]), ce.number(a));
    }
    if (isBigRational(num2)) {
      const [a, b] = num2;
      return canonicalDivide(ce, ce.mul([op12, ce.number(b)]), ce.number(a));
    }
  }
  if (op12.head === "Divide" || op12.head === "Rational")
    return canonicalDivide(ce, ce.mul([op12.op1, op22]), op12.op2);
  if (op22.head === "Divide" || op22.head === "Rational")
    return canonicalDivide(ce, ce.mul([op12, op22.op2]), op22.op1);
  const [c1, t1] = asCoefficient(op12);
  const [c2, t2] = asCoefficient(op22);
  if (!isRationalOne(c1) || !isRationalOne(c2))
    return ce.mul([ce.number(mul2(c1, inverse(c2))), ce.div(t1, t2)]);
  let [nSign, n] = makePositive(op12);
  let [dSign, d] = makePositive(op22);
  n = n.canonical;
  d = d.canonical;
  if (d.numericValue !== null && d.isOne)
    return nSign * dSign < 0 ? canonicalNegate(n) : n;
  if (nSign * dSign > 0)
    return ce._fn("Divide", [n, d]);
  if (n.numericValue)
    return ce._fn("Divide", [canonicalNegate(n), d]);
  return canonicalNegate(ce._fn("Divide", [n, d]));
}
function simplifyDivide(ce, op12, op22) {
  if (op12.numericValue !== null && op22.numericValue !== null) {
    const r1 = asRational(op12);
    const r2 = asRational(op22);
    if (r1 && r2 && !isRationalZero(r2))
      return ce.number(mul2(r1, inverse(r2)));
  }
  const [c1, t1] = asCoefficient(op12);
  const [c2, t2] = asCoefficient(op22);
  if (!isRationalOne(c1) || !isRationalOne(c2))
    return ce.mul([ce.number(mul2(c1, inverse(c2))), ce.div(t1, t2)]);
  return new Product(ce, [op12, ce.inv(op22)]).asExpression();
}

// src/compute-engine/library/arithmetic.ts
var import_complex16 = __toESM(require_complex());
var ARITHMETIC_LIBRARY = [
  {
    //
    // Functions
    //
    Abs: {
      wikidata: "Q3317982",
      // magnitude 'Q120812 (for reals)
      threadable: true,
      idempotent: true,
      complexity: 1200,
      signature: {
        domain: ["Function", "Number", "NonNegativeNumber"],
        simplify: (ce, ops2) => processAbs(ce, ops2[0], "simplify"),
        evaluate: (ce, ops2) => processAbs(ce, ops2[0], "evaluate"),
        N: (ce, ops2) => processAbs(ce, ops2[0], "N")
      }
    },
    Add: {
      wikidata: "Q32043",
      associative: true,
      commutative: true,
      threadable: true,
      idempotent: true,
      complexity: 1300,
      hold: "all",
      signature: {
        domain: "NumericFunction",
        codomain: (ce, args) => domainAdd(
          ce,
          args.map((x) => x.domain)
        ),
        // canonical: (ce, args) => canonicalAdd(ce, args), // never called: shortpath
        simplify: (ce, ops2) => simplifyAdd(ce, ops2),
        evaluate: (ce, ops2) => evalAdd(ce, ops2),
        N: (ce, ops2) => evalAdd(ce, ops2, "N")
      }
    },
    Ceil: {
      description: "Rounds a number up to the next largest integer",
      complexity: 1250,
      signature: {
        domain: ["Function", "Number", "Integer"],
        evaluate: (_ce, ops2) => applyN(
          ops2[0],
          Math.ceil,
          (x) => x.ceil(),
          (z) => z.ceil(0)
        )
      }
    },
    Chop: {
      associative: true,
      threadable: true,
      idempotent: true,
      complexity: 1200,
      signature: {
        domain: ["Function", "Number", "Number"],
        evaluate: (ce, ops2) => applyN(
          ops2[0],
          (x) => ce.chop(x),
          (x) => ce.chop(x),
          (x) => ce.chop(x)
        )
      }
    },
    Complex: {
      // This function is converted during boxing, so unlikely to encounter
      wikidata: "Q11567",
      complexity: 500
    },
    Divide: {
      wikidata: "Q1226939",
      complexity: 2500,
      // - if numer product of numbers, or denom product of numbers,
      // i.e. √2x/2 -> 0.707x, 2/√2x -> 1.4142x
      signature: {
        domain: ["Function", "Number", "Number", "Number"],
        canonical: (ce, args) => {
          args = validateArguments(ce, canonical(flattenSequence(args)), [
            "Number",
            "Number"
          ]);
          if (args.length !== 2)
            return ce._fn("Divide", args);
          return ce.div(args[0], args[1]);
        },
        simplify: (ce, args) => simplifyDivide(ce, args[0], args[1]),
        evaluate: (ce, ops2) => apply2N(
          ops2[0],
          ops2[1],
          (n, d) => n / d,
          (n, d) => n.div(d),
          (n, d) => n.div(d)
        )
      }
    },
    Exp: {
      wikidata: "Q168698",
      threadable: true,
      complexity: 3500,
      // Exp(x) -> e^x
      signature: {
        domain: ["Function", "Number", "Number"],
        canonical: (ce, args) => {
          args = validateArguments(ce, canonical(flattenSequence(args)), [
            "Number"
          ]);
          if (args.length !== 1)
            return ce._fn("Power", args);
          return ce.pow(ce.symbol("ExponentialE"), args[0]);
        }
      }
    },
    Erf: {
      description: "Complementary Error Function",
      complexity: 7500
    },
    Erfc: {
      description: "Complementary Error Function",
      complexity: 7500
    },
    Factorial: {
      description: "The factorial function",
      wikidata: "Q120976",
      complexity: 9e3,
      signature: {
        domain: ["Function", "Number", "Number"],
        evaluate: (ce, ops2) => {
          const n = asSmallInteger(ops2[0]);
          if (n !== null && n >= 0) {
            if (!bignumPreferred(ce))
              return ce.number(factorial(n));
            return ce.number(factorial2(ce, ce.bignum(n)));
          }
          const num = ops2[0].numericValue;
          if (num !== null && num instanceof import_complex16.default)
            return ce.number(gamma3(num.add(1)));
          const f = asFloat(ops2[0]);
          if (f !== null)
            return ce.number(gamma(1 + f));
          return void 0;
        }
      }
    },
    Floor: {
      wikidata: "Q56860783",
      complexity: 1250,
      signature: {
        domain: ["Function", "Number", "ExtendedRealNumber"],
        evaluate: (ce, ops2) => applyN(
          ops2[0],
          Math.floor,
          (x) => x.floor(),
          (z) => z.floor(0)
        )
      }
    },
    Gamma: {
      wikidata: "Q190573",
      complexity: 8e3,
      signature: {
        domain: ["Function", "Number", "Number", "Number"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => gamma(x),
          (x) => gamma2(ce, x),
          (x) => gamma3(x)
        )
      }
    },
    LogGamma: {
      complexity: 8e3,
      signature: {
        domain: ["Function", "Number", "Number", "Number"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => lngamma(x),
          (x) => lngamma2(ce, x),
          (x) => lngamma3(x)
        )
      }
    },
    Ln: {
      description: "Natural Logarithm",
      wikidata: "Q204037",
      complexity: 4e3,
      signature: {
        domain: ["Function", "Number", "Number"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => x >= 0 ? Math.log(x) : ce.complex(x).log(),
          (x) => !x.isNeg() ? x.ln() : ce.complex(x.toNumber()).log(),
          (z) => z.log()
        )
      }
    },
    Log: {
      description: "Log(z, b = 10) = Logarithm of base b",
      wikidata: "Q11197",
      complexity: 4100,
      signature: {
        domain: ["Function", "Number", ["Maybe", "Number"], "Number"],
        canonical: (ce, ops2) => {
          ops2 = canonical(flattenSequence(ops2));
          if (ops2.length === 1)
            return ce._fn("Log", [validateArgument(ce, ops2[0], "Number")]);
          if (ops2.length === 2) {
            const arg = validateArgument(ce, ops2[0], "Number");
            const base = validateArgument(ce, ops2[1], "Number");
            if (base.numericValue === 10)
              return ce._fn("Log", [arg]);
            return ce._fn("Log", [arg, base]);
          }
          return ce._fn("Log", validateArgumentCount(ce, ops2, 2));
        },
        N: (ce, ops2) => {
          if (ops2[1] === void 0)
            return applyN(
              ops2[0],
              (x) => x >= 0 ? Math.log10(x) : ce.complex(x).log().div(Math.LN10),
              (x) => !x.isNeg() ? decimal_default.log10(x) : ce.complex(x.toNumber()).log().div(Math.LN10),
              (z) => z.log().div(Math.LN10)
            );
          return apply2N(
            ops2[0],
            ops2[1],
            (a, b) => Math.log(a) / Math.log(b),
            (a, b) => a.log(b),
            (a, b) => a.log().div(typeof b === "number" ? Math.log(b) : b.log())
          );
        }
      }
    },
    Lb: {
      description: "Base-2 Logarithm",
      wikidata: "Q581168",
      complexity: 4100,
      signature: {
        domain: ["Function", "Number", "Number"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => x >= 0 ? Math.log2(x) : ce.complex(x).log().div(Math.LN2),
          (x) => x.isNeg() ? decimal_default.log10(x) : ce.complex(x.toNumber()).log().div(Math.LN2),
          (z) => z.log().div(Math.LN2)
        )
      }
    },
    Lg: {
      description: "Base-10 Logarithm",
      wikidata: "Q966582",
      complexity: 4100,
      signature: {
        domain: ["Function", "Number", "Number"],
        N: (ce, ops2) => applyN(
          ops2[0],
          (x) => x >= 0 ? Math.log10(x) : ce.complex(x).log().div(Math.LN10),
          (x) => !x.isNeg() ? decimal_default.log10(x) : ce.complex(x.toNumber()).log().div(Math.LN10),
          (z) => z.log().div(Math.LN10)
        )
      }
    },
    Max: {
      description: "Maximum of two or more numbers",
      complexity: 1200,
      signature: {
        domain: ["Function", ["Sequence", "Number"], "Number"],
        simplify: (ce, ops2) => {
          if (ops2.length === 0)
            return ce._NEGATIVE_INFINITY;
          if (ops2.length === 1)
            return ops2[0];
          return ce.box(["Max", ...ops2]);
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce._NEGATIVE_INFINITY;
          let result = void 0;
          const rest = [];
          for (const op3 of ops2) {
            if (!op3.isNumber || op3.numericValue === void 0)
              rest.push(op3);
            else if (!result || op3.isGreater(result))
              result = op3;
          }
          if (rest.length > 0)
            return ce.box(result ? ["Max", result, ...rest] : ["Max", ...rest]);
          return result ?? ce._NAN;
        }
      }
    },
    Min: {
      description: "Minimum of two or more numbers",
      complexity: 1200,
      signature: {
        domain: ["Function", ["Sequence", "Number"], "Number"],
        simplify: (ce, ops2) => {
          if (ops2.length === 0)
            return ce._NEGATIVE_INFINITY;
          if (ops2.length === 1)
            return ops2[0];
          return ce.box(["Min", ...ops2]);
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce._NEGATIVE_INFINITY;
          let result = void 0;
          const rest = [];
          for (const op3 of ops2) {
            if (!op3.isNumber || op3.numericValue === void 0)
              rest.push(op3);
            else if (!result || op3.isLess(result))
              result = op3;
          }
          if (rest.length > 0)
            return ce.box(result ? ["Min", result, ...rest] : ["Min", ...rest]);
          return result ?? ce._NAN;
        }
      }
    },
    Multiply: {
      wikidata: "Q40276",
      associative: true,
      commutative: true,
      idempotent: true,
      complexity: 2100,
      hold: "all",
      signature: {
        domain: "NumericFunction",
        // Never called: fastpath
        // canonical: (ce, args) => {
        //   return canonicalMultiply(ce, args);
        // },
        simplify: (ce, ops2) => simplifyMultiply(ce, ops2),
        evaluate: (ce, ops2) => evalMultiply(ce, ops2),
        N: (ce, ops2) => evalMultiply(ce, ops2, "N")
      }
    },
    Negate: {
      description: "Additive Inverse",
      wikidata: "Q715358",
      complexity: 2e3,
      signature: {
        domain: ["Function", "Number", "Number"],
        codomain: (ce, args) => {
          const arg = args[0].domain;
          if (!arg.literal)
            return arg;
          const negDomain = {
            PositiveNumber: "NegativeNumber",
            NonNegativeNumber: "NonPositiveNumber",
            NonPositiveNumber: "NonNegativeNumber",
            NegativeNumber: "PositiveNumber",
            PositiveInteger: "NegativeInteger",
            NonNegativeInteger: "NonPositiveInteger",
            NonPositiveInteger: "NonNegativeInteger",
            NegativeInteger: "PositiveInteger"
          }[arg.literal];
          if (negDomain)
            return ce.domain(negDomain);
          return arg;
        },
        canonical: (ce, args) => {
          args = validateArguments(ce, canonical(flattenSequence(args)), [
            "Number"
          ]);
          if (args.length !== 1)
            return ce._fn("Negate", args);
          return canonicalNegate(args[0]);
        },
        simplify: (ce, ops2) => processNegate(ce, ops2[0], "simplify"),
        evaluate: (ce, ops2) => processNegate(ce, ops2[0], "evaluate"),
        N: (ce, ops2) => processNegate(ce, ops2[0], "N"),
        sgn: (_ce, args) => {
          const s = args[0].sgn;
          if (s === void 0 || s === null)
            return void 0;
          if (s === 0)
            return 0;
          if (s > 0)
            return -1;
          if (s < 0)
            return 1;
          return void 0;
        }
      }
    },
    Power: {
      wikidata: "Q33456",
      commutative: false,
      complexity: 3500,
      signature: {
        domain: ["Function", "Number", "Number", "Number"],
        canonical: (ce, args) => {
          args = validateArguments(ce, canonical(flattenSequence(args)), [
            "Number",
            "Number"
          ]);
          if (args.length !== 2)
            return ce._fn("Power", args);
          return ce.pow(args[0], args[1]);
        },
        simplify: (ce, ops2) => processPower(ce, ops2[0], ops2[1], "simplify"),
        evaluate: (ce, ops2) => processPower(ce, ops2[0], ops2[1], "evaluate"),
        N: (ce, ops2) => {
          if (ce.numericMode === "machine" && typeof ops2[0].numericValue === "number" && typeof ops2[1].numericValue === "number")
            return ce.number(
              Math.pow(ops2[0].numericValue, ops2[1].numericValue)
            );
          return processPower(ce, ops2[0], ops2[1], "N");
        }
        // Defined as RealNumber for all power in RealNumber when base > 0;
        // when x < 0, only defined if n is an integer
        // if x is a non-zero complex, defined as ComplexNumber
        // Square root of a prime is irrational (AlgebraicNumber)
        // https://proofwiki.org/wiki/Square_Root_of_Prime_is_Irrational
        // evalDomain: (ce, base: BoxedExpression, power: BoxedExpression) ;
      }
    },
    Product: {
      wikidata: "Q901718",
      complexity: 1e3,
      hold: "first",
      signature: {
        domain: [
          "Function",
          "Anything",
          // [
          //   'Maybe',
          "Tuple",
          // ['Tuple', 'Symbol', ['Maybe', 'Integer'], ['Maybe', 'Integer']],
          // ],
          "Number"
        ],
        // codomain: (ce, args) => domainAdd(ce, args),
        // The 'body' and 'range' need to be interpreted by canonicalMultiplication(). Don't canonicalize them yet.
        canonical: (ce, ops2) => canonicalMultiplication(ce, ops2[0], ops2[1]),
        simplify: (ce, ops2) => evalMultiplication(ce, ops2[0], ops2[1], "simplify"),
        evaluate: (ce, ops2) => evalMultiplication(ce, ops2[0], ops2[1], "evaluate"),
        N: (ce, ops2) => evalMultiplication(ce, ops2[0], ops2[1], "N")
      }
    },
    Rational: {
      complexity: 2400,
      signature: {
        domain: ["Function", "Number", ["Maybe", "Number"], "RationalNumber"],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length === 0)
            return ce._fn("Rational", [ce.error(["missing", "Number"])]);
          if (args.length === 1)
            return ce._fn("Rational", [
              validateArgument(ce, args[0], "ExtendedRealNumber")
            ]);
          args = validateArguments(ce, args, ["Integer", "Integer"]);
          if (args.length !== 2)
            return ce._fn("Rational", args);
          return ce.div(args[0], args[1]);
        },
        simplify: (ce, ops2) => {
          if (ops2.length !== 2)
            return void 0;
          return simplifyDivide(ce, ops2[0], ops2[1]);
        },
        evaluate: (ce, ops2) => {
          if (ops2.length === 2) {
            const [n, d] = [asSmallInteger(ops2[0]), asSmallInteger(ops2[1])];
            if (n !== null && d !== null)
              return ce.number([n, d]);
            return void 0;
          }
          const f = asFloat(ops2[0].N());
          if (f === null)
            return void 0;
          return ce.number(rationalize(f));
        },
        N: (ce, ops2) => {
          if (ops2.length === 1)
            return ops2[0];
          return apply2N(
            ops2[0],
            ops2[1],
            (a, b) => a / b,
            (a, b) => a.div(b),
            (a, b) => a.div(b)
          );
        }
      }
    },
    Root: {
      complexity: 3200,
      signature: {
        domain: ["Function", "Number", "Number", "Number"],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length > 2)
            return ce._fn("Root", validateArgumentCount(ce, args, 2));
          const [base, exp2] = [
            validateArgument(ce, args[0], "Number"),
            validateArgument(ce, args[1], "Number")
          ];
          if (!exp2.isValid || !base.isValid)
            return ce._fn("Root", [base, exp2]);
          return ce.pow(base, ce.inv(exp2));
        }
      }
    },
    Round: {
      complexity: 1250,
      signature: {
        domain: ["Function", "Number", "Number"],
        evaluate: (ce, ops2) => applyN(
          ops2[0],
          Math.round,
          (x) => x.round(),
          (x) => x.round(0)
        )
      }
    },
    Sign: {
      complexity: 1200,
      signature: {
        domain: ["Function", "Number", ["Range", -1, 1]],
        simplify: (ce, ops2) => {
          const s = ops2[0].sgn;
          if (s === 0)
            return ce._ZERO;
          if (s === 1)
            return ce._ONE;
          if (s === -1)
            return ce._NEGATIVE_ONE;
          return void 0;
        },
        evaluate: (ce, ops2) => {
          const s = ops2[0].sgn;
          if (s === 0)
            return ce._ZERO;
          if (s === 1)
            return ce._ONE;
          if (s === -1)
            return ce._NEGATIVE_ONE;
          return void 0;
        },
        N: (ce, ops2) => {
          const s = ops2[0].sgn;
          if (s === 0)
            return ce._ZERO;
          if (s === 1)
            return ce._ONE;
          if (s === -1)
            return ce._NEGATIVE_ONE;
          return void 0;
        }
      }
    },
    SignGamma: {
      description: "The sign of the gamma function: -1 or +1",
      complexity: 7900
      // @todo
    },
    Sqrt: {
      description: "Square Root",
      wikidata: "Q134237",
      complexity: 3e3,
      signature: {
        domain: ["Function", "Number", "Number"],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length !== 1)
            return ce._fn("Sqrt", args);
          return ce.pow(args[0], ce._HALF);
        },
        simplify: (ce, ops2) => processSqrt(ce, ops2[0], "simplify"),
        evaluate: (ce, ops2) => processSqrt(ce, ops2[0], "evaluate"),
        N: (ce, ops2) => processSqrt(ce, ops2[0], "N")
        // evalDomain: Square root of a prime is irrational
        // https://proofwiki.org/wiki/Square_Root_of_Prime_is_Irrational
      }
    },
    Square: {
      wikidata: "Q3075175",
      complexity: 3100,
      signature: {
        domain: ["Function", "Number", "Number"],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length !== 1)
            return ce._fn("Square", args);
          return ce.pow(args[0], ce.number(2));
        }
      }
    },
    Subtract: {
      wikidata: "Q40754",
      complexity: 1350,
      signature: {
        domain: ["Function", "Number", ["Maybe", "Number"], "Number"],
        canonical: (ce, args) => {
          args = canonical(flattenSequence(args));
          if (args.length === 1)
            return canonicalNegate(args[0]);
          args = validateArgumentCount(ce, args, 2);
          if (args.length !== 2)
            return ce._fn("Subtract", args);
          if (!args.every((x) => x.isValid))
            return ce._fn("Subtract", args);
          return ce.add([args[0], canonicalNegate(args[1])]);
        }
      }
    },
    Sum: {
      wikidata: "Q218005",
      complexity: 1e3,
      hold: "all",
      signature: {
        domain: [
          "Function",
          "Anything",
          // [
          //   'Maybe',
          "Tuple",
          // ['Tuple', 'Symbol', ['Maybe', 'Integer'], ['Maybe', 'Integer']],
          // ],
          "Number"
        ],
        canonical: (ce, ops2) => canonicalSummation(ce, ops2[0], ops2[1]),
        simplify: (ce, ops2) => evalSummation(ce, ops2[0], ops2[1], "simplify"),
        evaluate: (ce, ops2) => evalSummation(ce, ops2[0], ops2[1], "evaluate"),
        N: (ce, ops2) => evalSummation(ce, ops2[0], ops2[1], "N")
      }
    }
  },
  {
    //
    // Constants
    // Note: constants are put in a separate, subsequent, dictionary because
    // some of the values (CatalanConstant) reference some function names (Add...)
    // that are defined above. This avoid circular references.
    //
    e: {
      domain: "TranscendentalNumber",
      constant: true,
      holdUntil: "never",
      value: "ExponentialE"
    },
    i: {
      domain: "ImaginaryNumber",
      constant: true,
      holdUntil: "never",
      flags: { imaginary: true },
      value: "ImaginaryUnit"
    },
    MachineEpsilon: {
      /**
       * The difference between 1 and the next larger floating point number
       *
       *    2^{−52}
       *
       * See https://en.wikipedia.org/wiki/Machine_epsilon
       */
      domain: "RealNumber",
      holdUntil: "N",
      constant: true,
      flags: { real: true },
      value: { num: Number.EPSILON.toString() }
    },
    Half: {
      constant: true,
      holdUntil: "never",
      value: ["Rational", 1, 2]
    },
    ImaginaryUnit: {
      domain: "ImaginaryNumber",
      constant: true,
      holdUntil: "evaluate",
      // @todo maybe?
      wikidata: "Q193796",
      flags: { imaginary: true },
      value: ["Complex", 0, 1]
    },
    ExponentialE: {
      domain: "TranscendentalNumber",
      flags: { algebraic: false, real: true },
      wikidata: "Q82435",
      constant: true,
      holdUntil: "N",
      value: (engine) => bignumPreferred(engine) ? engine._BIGNUM_ONE.exp() : Math.exp(1)
    },
    GoldenRatio: {
      domain: "AlgebraicNumber",
      wikidata: "Q41690",
      constant: true,
      flags: { algebraic: true },
      holdUntil: "simplify",
      value: ["Divide", ["Add", 1, ["Sqrt", 5]], 2]
    },
    CatalanConstant: {
      domain: "RealNumber",
      flags: { algebraic: void 0 },
      // Not proven irrational or transcendental
      wikidata: "Q855282",
      constant: true,
      holdUntil: "N",
      value: {
        // From http://www.fullbooks.com/Miscellaneous-Mathematical-Constants1.html
        num: `0.91596559417721901505460351493238411077414937428167
                  21342664981196217630197762547694793565129261151062
                  48574422619196199579035898803325859059431594737481
                  15840699533202877331946051903872747816408786590902
                  47064841521630002287276409423882599577415088163974
                  70252482011560707644883807873370489900864775113225
                  99713434074854075532307685653357680958352602193823
                  23950800720680355761048235733942319149829836189977
                  06903640418086217941101917532743149978233976105512
                  24779530324875371878665828082360570225594194818097
                  53509711315712615804242723636439850017382875977976
                  53068370092980873887495610893659771940968726844441
                  66804621624339864838916280448281506273022742073884
                  31172218272190472255870531908685735423498539498309
                  91911596738846450861515249962423704374517773723517
                  75440708538464401321748392999947572446199754961975
                  87064007474870701490937678873045869979860644874974
                  64387206238513712392736304998503539223928787979063
                  36440323547845358519277777872709060830319943013323
                  16712476158709792455479119092126201854803963934243
                  `
      }
    },
    EulerGamma: {
      // From http://www.fullbooks.com/Miscellaneous-Mathematical-Constants2.html
      domain: "RealNumber",
      flags: { algebraic: void 0 },
      // Not proven irrational or transcendental
      wikidata: "Q273023",
      holdUntil: "N",
      constant: true,
      value: {
        num: `0.57721566490153286060651209008240243104215933593992359880576723488486772677766
          467093694706329174674951463144724980708248096050401448654283622417399764492353
          625350033374293733773767394279259525824709491600873520394816567085323315177661
          152862119950150798479374508570574002992135478614669402960432542151905877553526
          733139925401296742051375413954911168510280798423487758720503843109399736137255
          306088933126760017247953783675927135157722610273492913940798430103417771778088
          154957066107501016191663340152278935867965497252036212879226555953669628176388
          792726801324310104765059637039473949576389065729679296010090151251959509222435
          014093498712282479497471956469763185066761290638110518241974448678363808617494
          551698927923018773910729457815543160050021828440960537724342032854783670151773
          943987003023703395183286900015581939880427074115422278197165230110735658339673`
      }
    }
  },
  {
    PreIncrement: {
      signature: { domain: ["Function", "Number", "Number"] }
    },
    PreDecrement: {
      signature: { domain: ["Function", "Number", "Number"] }
    }
  }
];
function processAbs(ce, arg, mode) {
  if (mode !== "simplify") {
    const num = arg.numericValue;
    if (num !== null) {
      if (typeof num === "number")
        return ce.number(Math.abs(num));
      if (num instanceof decimal_default)
        return ce.number(num.abs());
      if (num instanceof import_complex16.default)
        return ce.number(num.abs());
      if (isMachineRational(num))
        return ce.number(
          mode === "N" ? Math.abs(num[0] / num[1]) : [Math.abs(num[0]), num[1]]
        );
      if (isBigRational(num)) {
        const [n, d] = num;
        return ce.number(
          mode === "N" ? ce.bignum(n).div(ce.bignum(d)).abs() : [n > 0 ? n : -n, d]
        );
      }
    }
  }
  if (arg.isNonNegative)
    return arg;
  if (arg.isNegative)
    return ce.neg(arg);
  return void 0;
}

// src/compute-engine/library/calculus.ts
var CALCULUS_LIBRARY = [
  {
    //
    // Functions
    //
    Integrate: {
      wikidata: "Q80091",
      hold: "all",
      signature: {
        domain: [
          "Function",
          "Anything",
          ["Union", "Nothing", "Tuple", "Symbol"],
          // ['Tuple', 'Symbol', ['Maybe', 'Integer'], ['Maybe', 'Integer']],
          "Number"
        ],
        canonical: (ce, ops2) => {
          const body = ops2[0] ?? ce.error(["missing", "Function"]);
          let range = ops2[1];
          let index = null;
          let lower = null;
          let upper = null;
          if (range && range.head !== "Tuple" && range.head !== "Triple" && range.head !== "Pair" && range.head !== "Single") {
            index = range;
          } else if (range) {
            index = range.ops?.[0] ?? null;
            lower = range.ops?.[1]?.canonical ?? null;
            upper = range.ops?.[2]?.canonical ?? null;
          }
          if (index && index.head === "Hold")
            index = index.op1;
          if (index && index.head === "ReleaseHold")
            index = index.op1.evaluate();
          index ?? (index = ce.symbol("Nothing"));
          if (!index.symbol)
            index = ce.error(["incompatible-domain", "Symbol", index.domain]);
          if (lower)
            lower = validateArgument(ce, lower, "Number");
          if (upper)
            upper = validateArgument(ce, upper, "Number");
          if (lower && upper)
            range = ce.tuple([index, lower, upper]);
          else if (upper)
            range = ce.tuple([index, ce._NEGATIVE_INFINITY, upper]);
          else if (lower)
            range = ce.tuple([index, lower]);
          else
            range = index;
          return ce._fn("Integrate", [body, range]);
        }
      }
    }
  }
];

// src/compute-engine/library/collections.ts
var COLLECTIONS_LIBRARY = {
  Sequence: {
    signature: {
      domain: "Function"
    }
  }
};

// src/compute-engine/library/random-expression.ts
function oneOf(xs) {
  return xs[Math.floor(Math.random() * xs.length)];
}
function randomExpressionWithHead(head2, level) {
  if (head2 === "Add" || head2 === "Multiply") {
    const ops2 = [];
    let count = 1 + Math.floor(Math.random() * 12);
    while (count > 0) {
      ops2.push(randomExpression(level + 1));
      count -= 1;
    }
    return [head2, ...ops2];
  }
  if (head2 === "Divide" || head2 === "Power") {
    return [head2, randomExpression(level + 1), randomExpression(level + 1)];
  }
  if (head2 === "Root") {
    return [head2, randomExpression(level + 1), randomExpression(10)];
  }
  if (head2 === "trig")
    return randomTrig();
  return [head2, randomExpression(level + 1)];
}
function randomTrig() {
  return [
    oneOf([
      "Cos",
      "Sin",
      "Tan",
      "Sinh",
      "Arccos",
      "Arsinh",
      ["InverseFunction", "Cos"]
    ]),
    oneOf([
      "Pi",
      "-1",
      "0",
      "1",
      ["Divide", "Pi", -5],
      ["Multiply", -2, ["Divide", "Pi", 11]],
      ["Multiply", "Half", "Pi"],
      ["Multiply", 5, "Pi"],
      ["Multiply", 12, "Pi"],
      ["Divide", "Pi", 5],
      ["Divide", "Pi", 9],
      ["Multiply", 5, ["Divide", "Pi", 9]],
      ["Multiply", 2, ["Divide", "Pi", 11]],
      ["Multiply", 2, ["Divide", "Pi", 3]]
    ])
  ];
}
function randomExpression(level) {
  level ?? (level = 1);
  if (level === 1) {
    const h = oneOf([
      "Add",
      "Add",
      "Add",
      "Add",
      "Add",
      "Multiply",
      "Multiply",
      "Multiply",
      "Multiply",
      "Divide",
      "Divide",
      "Divide",
      "Root",
      "Sqrt",
      "Subtract",
      "Negate",
      "trig"
    ]);
    return randomExpressionWithHead(h, 1);
  }
  if (level === 2) {
    if (Math.random() > 0.5)
      return randomExpression(3);
    if (Math.random() > 0.75)
      return randomExpression(1);
    const h = oneOf([
      "Multiply",
      "Multiply",
      "Add",
      "Power",
      "trig",
      "Ln",
      "Exp"
    ]);
    return randomExpressionWithHead(h, 2);
  }
  return oneOf([
    -12345e-9,
    -2,
    -2,
    -2,
    -3,
    -5,
    -6,
    -12,
    -1654e-60,
    0,
    0,
    12345e-8,
    1654e-60,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    5,
    5,
    6,
    6,
    1234.5678,
    5678.1234,
    10,
    15,
    18,
    30,
    60,
    1234e54,
    "123456789.12345678912345e200",
    "987654321.12345678912345",
    ["Rational", -6, 10],
    ["Rational", -12, 15],
    ["Rational", -15, 12],
    ["Rational", 3, 5],
    ["Rational", 12, 15],
    ["Rational", 15, 12],
    "ExponentialE",
    "ImaginaryUnit",
    ["Sqrt", 3],
    ["Sqrt", 5],
    ["Sqrt", 15],
    ["Sqrt", 25],
    ["Complex", -1.1, 1.1],
    ["Complex", 4, 5],
    "x",
    "x",
    "x",
    "x",
    ["Add", "x", 1],
    ["Divide", "x", 3],
    ["Square", "x"],
    ["Power", "x", 3],
    ["Power", "x", 4],
    ["Subtract", "x", 1],
    ["Add", "x", 1],
    "a",
    "b",
    "Pi"
  ]);
}

// src/compute-engine/library/core.ts
var CORE_LIBRARY = [
  {
    Nothing: { domain: "Nothing" }
  },
  //
  // Data Structures
  //
  {
    List: {
      complexity: 8200,
      signature: {
        domain: ["Function", ["Maybe", ["Sequence", "Anything"]], "List"]
      }
    },
    KeyValuePair: {
      description: "A key/value pair",
      complexity: 8200,
      signature: {
        domain: [
          "Function",
          "String",
          "Anything",
          ["Tuple", "String", "Anything"]
        ],
        codomain: (ce, args) => ce.domain(["Tuple", "String", args[1].domain]),
        canonical: (ce, args) => {
          const key = validateArgument(ce, args[0]?.canonical, "String");
          const value = validateArgument(ce, args[1]?.canonical, "Value");
          return ce.tuple([key, value]);
        }
      }
    },
    Single: {
      description: "A tuple with a single element",
      complexity: 8200,
      signature: {
        domain: ["Function", "Anything", ["Tuple", "Anything"]],
        codomain: (ce, args) => ce.domain(["Tuple", args[0].domain]),
        canonical: (ce, ops2) => ce.tuple(validateArgumentCount(ce, canonical(ops2), 1))
      }
    },
    Pair: {
      description: "A tuple of two elements",
      complexity: 8200,
      signature: {
        domain: [
          "Function",
          "Anything",
          "Anything",
          ["Tuple", "Anything", "Anything"]
        ],
        codomain: (ce, args) => ce.domain(["Tuple", args[0].domain, args[1].domain]),
        canonical: (ce, ops2) => ce.tuple(validateArgumentCount(ce, canonical(ops2), 2))
      }
    },
    Triple: {
      description: "A tuple of three elements",
      complexity: 8200,
      signature: {
        domain: [
          "Function",
          "Anything",
          "Anything",
          "Anything",
          ["Tuple", "Anything", "Anything", "Anything"]
        ],
        codomain: (ce, args) => ce.domain(["Tuple", args[0].domain, args[1].domain, args[2].domain]),
        canonical: (ce, ops2) => ce.tuple(validateArgumentCount(ce, canonical(ops2), 3))
      }
    },
    Tuple: {
      description: "A fixed number of heterogeneous elements",
      complexity: 8200,
      signature: {
        domain: [
          "Function",
          ["Sequence", "Anything"],
          ["Tuple", ["Sequence", "Anything"]]
        ],
        canonical: (ce, ops2) => ce.tuple(canonical(ops2)),
        codomain: (ce, args) => ce.domain(["Tuple", ...args.map((x) => x.domain)])
      }
    }
  },
  //
  // Inert functions
  //
  {
    BaseForm: {
      description: "`BaseForm(expr, base=10)`",
      complexity: 9e3,
      inert: true,
      signature: {
        domain: ["Function", "Value", ["Maybe", "Integer"], "Value"],
        codomain: (_ce, args) => args[0].domain
      }
    },
    Delimiter: {
      // Use to represent groups of expressions. Named after https://en.wikipedia.org/wiki/Delimiter
      complexity: 9e3,
      hold: "first",
      signature: {
        domain: [
          "Function",
          "Anything",
          ["Maybe", "String"],
          ["Maybe", "String"],
          "Anything"
        ],
        codomain: (_ce, args) => args[0].domain,
        canonical: (ce, args) => args[0]?.canonical ?? ce.box(["Sequence"])
      }
    },
    Error: {
      /**
       * - The first argument is either a string or an `["ErrorCode"]`
       * expression indicating the nature of the error.
       * - The second argument, if present, indicates the context/location
       * of the error. If the error occur while parsing a LaTeX string,
       * for example, the argument will be a `Latex` expression.
       */
      complexity: 500,
      signature: {
        domain: ["Function", "Anything", ["Maybe", "Anything"], "Void"],
        // To make a canonical expression, don't canonicalize the args
        canonical: (ce, args) => ce._fn("Error", args)
      }
    },
    ErrorCode: {
      complexity: 500,
      hold: "all",
      signature: {
        domain: [
          "Function",
          "String",
          ["Maybe", ["Sequence", "Anything"]],
          "Anything"
        ],
        canonical: (ce, args) => {
          const code = validateArgument(ce, args[0], "String").string;
          if (code === "incompatible-domain") {
            return ce._fn("ErrorCode", [
              ce.string(code),
              ce.domain(args[1] ?? "Anything"),
              ce.domain(args[2] ?? "Anything")
            ]);
          }
          return ce._fn("ErrorCode", args);
        }
      }
    },
    Hold: {
      hold: "all",
      signature: {
        domain: "Function",
        codomain: (ce, args) => args[0].symbol ? ce.domain("Symbol") : ce.domain("Anything"),
        // To make a canonical expression, don't canonicalize the args
        canonical: (ce, args) => args.length !== 1 ? ce._fn("Hold", validateArgumentCount(ce, args, 1)) : ce._fn("Hold", [validateArgument(ce, args[0], "Anything")])
      }
    },
    HorizontalSpacing: {
      signature: {
        domain: "Function",
        canonical: (ce, args) => {
          if (args.length === 2)
            return args[0].canonical;
          return ce.box(["Sequence"]);
        }
      }
    },
    Style: {
      complexity: 9e3,
      inert: true,
      signature: {
        domain: [
          "Function",
          "Anything",
          ["Maybe", "Dictionary"],
          // @todo
          "Anything"
        ]
      }
      // @todo: simplify: merge Style(Style(x, s1), s2),  Style(x) -> x
    }
  },
  {
    Apply: {
      signature: {
        domain: "Function",
        evaluate: (ce, ops2) => apply(ops2[0], ops2.slice(1))
      }
    },
    About: { signature: { domain: "Function" } },
    Block: {
      /** Create a local scope. First argument is a dictionary of local variables.
       * They are evaluated in the context of the parent scope. The second argument
       * is an expression to be evaluated in the context of the new scope.
       * ["Block", ["List", ["Equal", "x", 1]], [...]]
       */
      signature: { domain: "Function" }
    },
    Domain: {
      /** Return the domain of an expression */
      signature: {
        domain: ["Function", "Anything", "Domain"],
        canonical: (ce, ops2) => ce.domain(validateArgumentCount(ce, canonical(ops2), 1)[0])
      }
    },
    Evaluate: {
      hold: "all",
      signature: {
        domain: ["Function", "Anything", "Anything"],
        codomain: (_ce, args) => args[0].domain,
        canonical: (ce, ops2) => ce._fn("Evaluate", validateArgumentCount(ce, canonical(ops2), 1)),
        evaluate: (_ce, ops2) => ops2[0].evaluate()
      }
    },
    Head: {
      signature: {
        domain: "Function",
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (typeof op12?.head === "string")
            return ce.symbol(op12.head);
          return op12?.head ?? ce.symbol("Nothing");
        }
      }
    },
    Html: {
      signature: {
        domain: ["Function", "Value", "String"],
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.string("");
          return ce.string("");
        }
      }
    },
    Lambda: {
      wikidata: "Q567612",
      hold: "all",
      signature: {
        domain: ["Function", "Anything", "Function"],
        codomain: (_ce, ops2) => ops2[0].domain,
        canonical: (ce, ops2) => ce._fn("Lambda", validateArgumentCount(ce, ops2, 1))
      }
    },
    Signatures: {
      signature: {
        domain: ["Function", "Symbol", ["Maybe", ["List", "Domain"]]],
        canonical: (ce, ops2) => {
          ops2 = validateArgumentCount(ce, ops2, 1);
          if (!ops2[0].symbol)
            return ce._fn("Signatures", [
              ce.error(
                ["incompatible-domain", "Symbol", ops2[0].domain],
                ops2[0]
              )
            ]);
          return ce._fn("Signatures", ops2);
        },
        evaluate: (ce, ops2) => {
          const name = ops2[0].symbol;
          if (!name)
            return ce.symbol("Nothing");
          const result = ce.lookupFunction(name);
          if (!result)
            return ce.symbol("Nothing");
          return ce.fn("List", [result.signature.domain]);
        }
      }
    },
    Subscript: {
      /**
       * The `Subscript` function can take several forms:
       *
       * If `op1` is a string, the string is interpreted as a number in
       * base `op2` (2 to 36).
       *
       * If `op1` is an indexable collection, `x`:
       * - `x_*` -> `At(x, *)`
       *
       * Otherwise:
       * - `x_0` -> Symbol "x_0"
       * - `x_n` -> Symbol "x_n"
       * - `x_{\text{max}}` -> Symbol `x_max`
       * - `x_{(n+1)}` -> `At(x, n+1)`
       * - `x_{n+1}` ->  `Subscript(x, n+1)`
       */
      // The last (subscript) argument can include a delimiter that
      // needs to be interpreted. Without the hold, it would get
      // removed during canonicalization.
      hold: "last",
      signature: {
        domain: ["Function", "Anything", "Anything", "Anything"],
        codomain: (_ce, args) => {
          if (args[0].isFunction)
            return args[0].domain;
          return args[0].domain;
        },
        canonical: (ce, args) => {
          const op12 = args[0];
          const op22 = args[1];
          if (op12.string) {
            const base = asSmallInteger(op22);
            if (base !== null) {
              if (base > 1 && base <= 36) {
                const [value, rest] = fromDigits(op12.string, base);
                if (rest) {
                  return ce.error(
                    ["unexpected-digit", rest[0]],
                    ["Latex", ce.string(op12.string)]
                  );
                }
                return ce.number(value);
              }
            }
          }
          if (op12.symbol) {
            if (op12.symbolDefinition?.at)
              return ce._fn("At", [op12, op22.canonical]);
            const sub2 = op22.string ?? op22.symbol ?? asSmallInteger(op22)?.toString();
            if (sub2)
              return ce.symbol(op12.symbol + "_" + sub2);
          }
          if (op22.head === "Sequence")
            ce._fn("Subscript", [op12, ce._fn("List", op22.ops)]);
          return ce._fn("Subscript", args);
        }
      }
    },
    Symbol: {
      complexity: 500,
      description: "Construct a new symbol with a name formed by concatenating the arguments",
      threadable: true,
      hold: "all",
      signature: {
        domain: ["Function", ["Sequence", "Anything"], "Anything"],
        canonical: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.symbol("Nothing");
          const arg = ops2.map(
            (x) => x.symbol ?? x.string ?? asSmallInteger(x)?.toString() ?? ""
          ).join("");
          if (arg.length > 0)
            return ce.symbol(arg);
          return ce.symbol("Nothing");
        }
        // Note: a `["Symbol"]` expression is never evaluated, it gets
        // transformed into something else (a symbol) during canonicalization
      }
    },
    Tail: {
      signature: {
        domain: ["Function", "Value", ["List", "Value"]],
        evaluate: (ce, ops2) => ops2[0] ? ce._fn("List", ops2[0].ops ?? []) : ce._fn("List", [])
      }
    },
    Timing: {
      description: "`Timing(expr)` evaluates `expr` and return a `Pair` of the number of second elapsed for the evaluation, and the value of the evaluation",
      signature: {
        domain: [
          "Function",
          "Value",
          ["Maybe", "Integer"],
          ["Tuple", "Value", "Number"]
        ],
        evaluate: (ce, ops2) => {
          if (ops2[1].symbol === "Nothing") {
            const start = globalThis.performance.now();
            const result2 = ops2[0].evaluate();
            const timing = 1e3 * (globalThis.performance.now() - start);
            return ce.pair(ce.number(timing), result2);
          }
          let n = Math.max(3, Math.round(asSmallInteger(ops2[1]) ?? 3));
          let timings = [];
          let result;
          while (n > 0) {
            const start = globalThis.performance.now();
            result = ops2[0].evaluate();
            timings.push(1e3 * (globalThis.performance.now() - start));
            n -= 1;
          }
          const max2 = Math.max(...timings);
          const min2 = Math.min(...timings);
          timings = timings.filter((x) => x > min2 && x < max2);
          const sum2 = timings.reduce((acc, v) => acc + v, 0);
          if (sum2 === 0)
            return ce.pair(ce.number(max2), result);
          return ce.pair(ce.number(sum2 / timings.length), result);
        }
      }
    }
    // {name: 'Pattern',},
  },
  //
  // String-related
  //
  {
    FromDigits: {
      description: `\`FromDigits(s, base=10)\`       return an integer representation of the string \`s\` in base \`base\`.`,
      // @todo could accept `0xcafe`, `0b01010` or `(deadbeef)_16` as string formats
      // @todo could accept "roman"... as base
      // @todo could accept optional third parameter as the (padded) length of the output
      signature: {
        domain: ["Function", "String", ["Maybe", ["Range", 1, 36]], "Integer"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          if (!op12.string)
            return ce.error(["incompatible-domain", "String", op12.domain], op12);
          const op22 = ops2[1];
          if (op22.isNothing)
            return ce.number(Number.parseInt(op12.string, 10));
          if (op22.numericValue === null) {
            return ce.error(["unexpected-base", op22.latex], op22);
          }
          const base = asFloat(op22);
          if (!Number.isInteger(base) || base < 2 || base > 36)
            return ce.error(["unexpected-base", base], op22);
          const [value, rest] = fromDigits(op12.string, base);
          if (rest)
            return ce.error(["unexpected-digit", rest[0]], { str: rest });
          return ce.number(value);
        }
      }
    },
    IntegerString: {
      description: `\`IntegerString(n, base=10)\`       return a string representation of the integer \`n\` in base \`base\`.`,
      // @todo could accept `0xcafe`, `0b01010` or `(deadbeef)_16` as string formats
      // @todo could accept "roman"... as base
      // @todo could accept optional third parameter as the (padded) length of the output
      signature: {
        domain: ["Function", "Integer", ["Maybe", "Integer"], "String"],
        evaluate: (ce, ops2) => {
          const op12 = ops2[0];
          const val = asFloat(op12) ?? NaN;
          if (Number.isNaN(val) || !Number.isInteger(val)) {
            return ce.error(
              ["incompatible-domain", "Integer", op12.domain],
              op12
            );
          }
          const op22 = ops2[1];
          if (op22.isNothing) {
            const op1Num = op12.numericValue;
            if (typeof op1Num === "number")
              return ce.string(Math.abs(op1Num).toString());
            if (op1Num instanceof decimal_default)
              return ce.string(op1Num.abs().toString());
            return ce.string(
              Math.abs(Math.round(asFloat(op12) ?? NaN)).toString()
            );
          }
          if (asSmallInteger(op22) === null) {
            return ce.error(
              ["incompatible-domain", "Integer", op22.domain],
              op22
            );
          }
          const base = asSmallInteger(op22);
          if (base < 2 || base > 36)
            return ce.error(["out-of-range", 2, 36, base], op22);
          return ce.string(Math.abs(val).toString(base));
        }
      }
    },
    String: {
      threadable: true,
      signature: {
        domain: ["Function", ["Maybe", "Anything"], "String"],
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.string("");
          return ce.string(ops2.map((x) => x.string ?? x.toString()).join(""));
        }
      }
    }
  },
  //
  // LaTeX-related
  //
  {
    // Join or more LatexTokens into a LaTeX string
    JoinLatexTokens: {
      signature: {
        domain: ["Function", ["Maybe", ["Sequence", "Anything"]], "String"],
        evaluate: (ce, ops2) => {
          return ce.box([
            "Latex",
            ce.string(tokensToString(ops2.map((x) => x.string ?? x.latex)))
          ]);
        }
      }
    },
    // Value preserving type conversion/tag indicating the string
    // is a LaTeX string
    Latex: {
      signature: {
        domain: ["Function", ["Maybe", ["Sequence", "Anything"]], "String"],
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce.string("");
          return ce.string(joinLatex(ops2.map((x) => x.string ?? x.toString())));
        }
      }
    },
    // Serialize one or more expressions to LaTeX
    SerializeLatex: {
      hold: "all",
      signature: {
        domain: ["Function", ["Maybe", ["Sequence", "Anything"]], "String"],
        evaluate: (ce, ops2) => ce.box(["Latex", ce.string(joinLatex(ops2.map((x) => x.latex)))])
      }
    },
    SplitAsLatexTokens: {
      description: "Split a LaTeX string into a list of LaTeX tokens",
      hold: "all",
      signature: {
        domain: ["Function", ["Maybe", "Anything"], ["List", "String"]],
        evaluate: (ce, ops2) => {
          if (ops2.length === 0)
            return ce._fn("List", []);
          let latex = "";
          if (ops2[0].head === "Latex")
            latex = ops2[0].op1.string ?? "";
          else if (ops2[0].head === "LatexString")
            latex = joinLatex(ops2[0].ops.map((op3) => op3.latex));
          else
            latex = ops2[0].latex;
          return ce._fn(
            "List",
            tokenize(latex, []).map((x) => ce.string(x))
          );
        }
      }
    },
    ParseLatex: {
      description: "Parse a LaTeX string and evaluate to a corresponding expression",
      signature: {
        domain: ["Function", ["Maybe", "String"], "Anything"],
        evaluate: (ce, ops2) => {
          if (ops2.length === 0 || !ops2[0].string)
            return ce.box(["Sequence"]);
          return ce.parse(ops2[0].string) ?? ce.box(["Sequence"]);
        }
      }
    }
  },
  {
    RandomExpression: {
      signature: {
        domain: "Function",
        evaluate: (ce, _ops) => ce.box(randomExpression())
      }
    }
  }
];

// src/compute-engine/library/logic.ts
var LOGIC_LIBRARY = {
  True: { wikidata: "Q16751793", domain: "Boolean", constant: true },
  False: {
    wikidata: "Q5432619",
    domain: "Boolean",
    constant: true
  },
  Maybe: {
    wikidata: "Q781546",
    domain: "MaybeBoolean",
    constant: true
  },
  // @todo: specify a `canonical` function that converts boolean
  // expressions into CNF (Conjunctive Normal Form)
  // https://en.wikipedia.org/wiki/Conjunctive_normal_form
  // using rules (with a rule set that's kinda the inverse of the
  // logic rules for simplify
  And: {
    wikidata: "Q191081",
    threadable: true,
    associative: true,
    commutative: true,
    idempotent: true,
    complexity: 1e4,
    signature: {
      domain: "LogicOperator",
      simplify: processAnd,
      evaluate: processAnd
    }
  },
  Or: {
    wikidata: "Q1651704",
    threadable: true,
    associative: true,
    commutative: true,
    idempotent: true,
    complexity: 1e4,
    signature: {
      domain: "LogicOperator",
      simplify: processOr,
      evaluate: processOr
    }
  },
  Not: {
    wikidata: "Q190558",
    involution: true,
    complexity: 10100,
    // @todo: this may not be needed, since we also have rules.
    signature: {
      domain: "LogicOperator",
      simplify: processNot,
      evaluate: processNot
    }
  },
  Equivalent: {
    wikidata: "Q220433",
    complexity: 10200,
    signature: {
      domain: "LogicOperator",
      simplify: processEquivalent,
      evaluate: processEquivalent
    }
  },
  Implies: {
    wikidata: "Q7881229",
    complexity: 10200,
    signature: {
      domain: "LogicOperator",
      simplify: processImplies,
      evaluate: processImplies
    }
  },
  Exists: { signature: { domain: "MaybeBoolean" } },
  If: {
    hold: "rest",
    signature: {
      domain: "Function",
      codomain: (ce, ops2) => ce.domain(["Union", ops2[0], ops2[1]]),
      simplify: (ce, ops2) => {
        const cond = ops2[0];
        if (cond && cond.symbol === "True")
          return ops2[1] ? ops2[1].simplify() : ce.box("Nothing");
        return ops2[2] ? ops2[2].simplify() : ce.box("Nothing");
      },
      evaluate: (ce, ops2) => {
        const cond = ops2[0];
        if (cond && cond.symbol === "True")
          return ops2[1] ? ops2[1].evaluate() : ce.box("Nothing");
        return ops2[2] ? ops2[2].evaluate() : ce.box("Nothing");
      },
      N: (ce, ops2) => {
        const cond = ops2[0];
        if (cond && cond.symbol === "True")
          return ops2[1] ? ops2[1].N() : ce.box("Nothing");
        return ops2[2] ? ops2[2].N() : ce.box("Nothing");
      }
    }
  },
  Loop: {
    hold: "all",
    signature: {
      domain: "Function",
      simplify: (ce, ops2) => ops2[0]?.simplify() ?? ce.box("Nothing"),
      evaluate: (ce, ops2) => {
        const body = ops2[0] ?? ce.box("Nothing");
        if (body.isNothing)
          return body;
        let result;
        let i = 0;
        do {
          result = body.evaluate();
          i += 1;
        } while (result.head !== "Return" && i < ce.iterationLimit);
        if (result.head === "Return")
          return result.op1;
        return ce.error("iteration-limit-exceeded");
      },
      N: (ce, ops2) => {
        const cond = ops2[0];
        if (cond && cond.symbol === "True")
          return ops2[1] ? ops2[1].N() : ce.box("Nothing");
        return ops2[2] ? ops2[2].N() : ce.box("Nothing");
      }
    }
  },
  Which: {
    hold: "all",
    signature: {
      domain: "Function",
      codomain: (ce, ops2) => domainWhich(ce, ops2),
      evaluate: (ce, ops2) => whichEvaluate(ce, ops2, "evaluate"),
      N: (ce, ops2) => whichEvaluate(ce, ops2, "N")
    }
  }
};
function processAnd(ce, args) {
  if (args.length === 0)
    return ce.symbol("True");
  const ops2 = [];
  for (const arg of args) {
    if (arg.symbol === "False")
      return ce.symbol("False");
    if (arg.symbol !== "True") {
      let duplicate = false;
      for (const x of ops2) {
        if (x.isSame(arg)) {
          duplicate = true;
        } else if (arg.head === "Not" && arg.op1.isSame(x) || x.head === "Not" && x.op1.isSame(arg)) {
          return ce.symbol("False");
        }
      }
      if (!duplicate)
        ops2.push(arg);
    }
  }
  if (ops2.length === 0)
    return ce.symbol("True");
  if (ops2.length === 1)
    return ops2[0];
  return ce._fn("And", ops2);
}
function processOr(ce, args) {
  if (args.length === 0)
    return ce.symbol("True");
  const ops2 = [];
  for (const arg of args) {
    if (arg.symbol === "True")
      return ce.symbol("True");
    if (arg.symbol !== "False") {
      let duplicate = false;
      for (const x of ops2) {
        if (x.isSame(arg)) {
          duplicate = true;
        } else if (arg.head === "Not" && arg.op1.isSame(x) || x.head === "Not" && x.op1.isSame(arg)) {
          return ce.symbol("True");
        }
      }
      if (!duplicate)
        ops2.push(arg);
    }
  }
  if (ops2.length === 0)
    return ce.symbol("True");
  if (ops2.length === 1)
    return ops2[0];
  return ce._fn("Or", ops2);
}
function processNot(ce, args) {
  const op12 = args[0].symbol;
  if (op12 === "True")
    return ce.symbol("False");
  if (op12 === "False")
    return ce.symbol("True");
  if (op12 === "Maybe")
    return ce.symbol("Maybe");
  return void 0;
}
function processEquivalent(ce, args) {
  const lhs = args[0].symbol;
  const rhs = args[1].symbol;
  if (lhs === "True" && rhs === "True" || lhs === "False" && rhs === "False")
    return ce.symbol("True");
  if (lhs === "True" && rhs === "False" || lhs === "False" && rhs === "True")
    return ce.symbol("False");
  if (lhs === "Maybe" || rhs === "Maybe")
    return ce.symbol("Maybe");
  return void 0;
}
function processImplies(ce, args) {
  const lhs = args[0].symbol;
  const rhs = args[1].symbol;
  if (lhs === "True" && rhs === "True" || lhs === "False" && rhs === "False" || lhs === "False" && rhs === "True")
    return ce.symbol("True");
  if (lhs === "True" && rhs === "False")
    return ce.symbol("False");
  if (lhs === "Maybe" || rhs === "Maybe")
    return ce.symbol("Maybe");
  return void 0;
}
function domainWhich(ce, args) {
  let dom = null;
  for (let i = 1; i <= args.length - 1; i += 2) {
    if (!dom)
      dom = args[i].domain;
    else
      dom = sharedAncestorDomain(dom, args[i].domain);
  }
  return dom ?? ce.domain("Nothing");
}
function whichEvaluate(ce, args, mode) {
  let i = 0;
  while (i < args.length - 1) {
    if (args[i].evaluate().symbol === "True") {
      if (!args[i + 1])
        return ce.symbol("Undefined");
      return mode === "N" ? args[i + 1].N() : args[i + 1].evaluate();
    }
    i += 2;
  }
  return ce.symbol("Undefined");
}

// src/compute-engine/library/polynomials.ts
var POLYNOMIALS_LIBRARY = [
  {
    Expand: {
      description: "Expand out products and positive integer powers",
      signature: {
        domain: ["Function", "Value", "Value"],
        evaluate: (_ce, ops2) => expand3(ops2[0])
      }
    }
  }
];

// src/compute-engine/library/relational-operator.ts
var RELOP_LIBRARY = {
  Equal: {
    commutative: true,
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, ops2) => {
        return ce._fn(
          "Equal",
          flattenOps(canonical(flattenSequence(ops2)), "Equal")
        );
      },
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.symbol("True");
        let lhs = void 0;
        for (const arg of ops2) {
          if (!lhs)
            lhs = arg;
          else {
            const test = lhs.isEqual(arg);
            if (test !== true)
              return ce.symbol("False");
          }
        }
        return ce.symbol("True");
      }
    }
  },
  NotEqual: {
    wikidata: "Q28113351",
    commutative: true,
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.symbol("False");
        let lhs = void 0;
        for (const arg of ops2) {
          if (!lhs)
            lhs = arg;
          else {
            const test = lhs.isEqual(arg);
            if (test === true)
              return ce.symbol("False");
          }
        }
        return ce.symbol("True");
      }
    }
  },
  Less: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, ops2) => ce._fn("Less", flattenOps(canonical(flattenSequence(ops2)), "Less")),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.symbol("True");
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test <= 0)
              return ce.symbol("False");
            lhs = arg;
          }
        }
        return ce.symbol("True");
      }
    }
  },
  NotLess: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("Less", args)])
    }
  },
  Greater: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Less", args.reverse()),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.symbol("True");
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test >= 0)
              return ce.symbol("False");
            lhs = arg;
          }
        }
        return ce.symbol("True");
      }
    }
  },
  NotGreater: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("Greater", args)])
    }
  },
  LessEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.symbol("True");
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test < 0)
              return ce.symbol("False");
            lhs = arg;
          }
        }
        return ce.symbol("True");
      }
    }
  },
  NotLessNotEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("LessEqual", args)])
    }
  },
  GreaterEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("LessEqual", args.reverse()),
      evaluate: (ce, ops2) => {
        if (ops2.length < 2)
          return ce.symbol("True");
        let lhs = void 0;
        for (const arg of ops2) {
          if (!arg.isNumber)
            return void 0;
          if (!lhs)
            lhs = arg;
          else {
            const test = ce.fn("Subtract", [arg, lhs]).N().sgn;
            if (test === null || test === void 0)
              return void 0;
            if (test > 0)
              return ce.symbol("False");
            lhs = arg;
          }
        }
        return ce.symbol("True");
      }
    }
  },
  NotGreaterNotEqual: {
    complexity: 11e3,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("GreaterEqual", args)])
    }
  },
  TildeFullEqual: {
    description: "Indicate isomorphism, congruence and homotopic equivalence",
    signature: { domain: "RelationalOperator" }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotTildeFullEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("TildeFullEqual", args)])
    }
  },
  TildeEqual: {
    description: "Approximately or asymptotically equal",
    complexity: 11e3,
    signature: { domain: "RelationalOperator" }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotTildeEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("TildeEqual", args)])
    }
  },
  Approx: {
    complexity: 11100,
    signature: { domain: "RelationalOperator" }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotApprox: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("Approx", args)])
    }
  },
  ApproxEqual: {
    complexity: 11100,
    signature: { domain: "RelationalOperator" }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotApproxEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("ApproxEqual", args)])
    }
  },
  ApproxNotEqual: {
    complexity: 11100,
    signature: { domain: "RelationalOperator" }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotApproxNotEqual: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("ApproxNotEqual", args)])
    }
  },
  Precedes: {
    complexity: 11100,
    signature: { domain: "RelationalOperator" }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotPrecedes: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("Precedes", args)])
    }
  },
  Succeeds: {
    signature: { domain: "RelationalOperator" }
    // @todo evaluate: (ce, ...args: BoxedExpression[]) => SemiBoxedExpression {}
  },
  NotSucceeds: {
    complexity: 11100,
    signature: {
      domain: "RelationalOperator",
      canonical: (ce, args) => ce._fn("Not", [ce._fn("Succeeds", args)])
    }
  }
};

// src/compute-engine/library/sets.ts
var SETS_LIBRARY = {
  //
  // Constants
  //
  EmptySet: {
    domain: "Set",
    constant: true,
    wikidata: "Q226183"
    // contains: () => false, // @todo not quite true...
    // includes: () => true, // The empty set is a subset of every set
  },
  //
  // Predicates
  //
  Element: {
    complexity: 11200,
    hold: "all",
    signature: {
      domain: "Predicate",
      canonical: (ce, args) => {
        args = validateArgumentCount(ce, flattenSequence(canonical(args)), 2);
        if (args.length === 2 && isDomain(args[1]))
          return ce._fn("Element", [args[0], ce.domain(args[1])]);
        return ce._fn("Element", args);
      },
      evaluate: (ce, args) => evaluateElement(ce, args)
    }
  },
  NotElement: {
    complexity: 11200,
    hold: "all",
    signature: {
      domain: "Predicate",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("Element", args)])
    }
  },
  Subset: {
    complexity: 11200,
    signature: { domain: "Predicate" }
  },
  NotSubset: {
    complexity: 11200,
    signature: {
      domain: "Predicate",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("Subset", args)])
    }
  },
  Superset: {
    complexity: 11200,
    signature: { domain: "Predicate" }
  },
  SupersetEqual: {
    complexity: 11200,
    signature: { domain: "Predicate" }
  },
  NotSuperset: {
    complexity: 11200,
    signature: {
      domain: "Predicate",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("Superset", args)])
    }
  },
  NotSupersetEqual: {
    complexity: 11200,
    signature: {
      domain: "Predicate",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("SupersetEqual", args)])
    }
  },
  SubsetEqual: {
    complexity: 11200,
    signature: { domain: "Predicate" }
    // evaluate: subsetEqual,
  },
  NotSubsetNotEqual: {
    complexity: 11200,
    signature: {
      domain: "Predicate",
      canonical: (ce, args) => ce.fn("Not", [ce.fn("SubsetEqual", args)])
    }
  },
  //
  // Functions
  //
  CartesianProduct: {
    // Aka the product set, the set direct product or cross product
    // Notation: \times
    wikidata: "Q173740",
    signature: { domain: ["Function", "Set", ["Sequence", "Set"], "Set"] }
    // evaluate: cartesianProduct,
  },
  Complement: {
    // Return the elements of the first argument that are not in any of
    // the subsequent lists
    wikidata: "Q242767",
    signature: { domain: ["Function", "Set", "Set"] }
  },
  Intersection: {
    // notation: \cap
    wikidata: "Q185837",
    threadable: true,
    associative: true,
    commutative: true,
    involution: true,
    signature: {
      domain: ["Function", "Set", ["Sequence", "Set"], "Set"],
      evaluate: intersection
    }
  },
  Union: {
    // Works on set, but can also work on lists
    wikidata: "Q185359",
    threadable: true,
    associative: true,
    commutative: true,
    involution: true,
    signature: {
      domain: ["Function", "Set", ["Sequence", "Set"], "Set"],
      evaluate: union
    }
  },
  // {
  //   name: 'Set',
  //   domain: ['Function', ['Sequence', 'Anything'], 'Set'],
  //   // @todo! set has multiple forms
  //   // Set(Sequence)
  //   // Set(Sequence, Condition)
  //   // Set(Set, Condition)
  // }, // disjoint union Q842620 ⊔
  SetMinus: {
    wikidata: "Q18192442",
    signature: {
      domain: ["Function", "Set", "Value", "Set"],
      evaluate: setMinus
    }
  },
  SymmetricDifference: {
    // symmetric difference = disjunctive union  (circled minus)
    /* = Union(Complement(a, b), Complement(b, a) */
    /* Corresponds to XOR in boolean logic */
    wikidata: "Q1147242",
    signature: { domain: ["Function", "Set", ["Sequence", "Set"], "Set"] }
  }
};
function union(ce, _ops) {
  return ce.symbol("False");
}
function intersection(ce, _ops) {
  return ce.symbol("EmptySet");
}
function setMinus(ce, _ops) {
  return ce.symbol("EmptySet");
}
function evaluateElement(ce, ops2) {
  /* @__PURE__ */ console.assert(ops2.length === 2);
  const [lhs, rhs] = ops2;
  if (rhs.string) {
    if (lhs.string && rhs.string.includes(lhs.string))
      return ce.symbol("True");
    return ce.symbol("False");
  }
  if (rhs.keys) {
    if (lhs.string) {
      for (const key of rhs.keys)
        if (key === lhs.string)
          return ce.symbol("True");
    }
    return ce.symbol("False");
  }
  if (rhs.head === "List") {
    if (lhs.head === "List") {
      let found = false;
      for (let i = 0; i < 1 + (rhs.nops - lhs.nops); ++i) {
        found = true;
        for (let j = 0; j < lhs.nops; ++j) {
          if (!rhs.ops[i + j].isEqual(lhs.ops[j])) {
            found = false;
            break;
          }
        }
        if (found)
          return ce.symbol("True");
      }
      return ce.symbol("False");
    }
    const val = lhs.head === "Hold" ? lhs.op1 : lhs;
    for (const elem of rhs.ops)
      if (val.isEqual(elem))
        return ce.symbol("True");
    return ce.symbol("False");
  }
  if (isDomain(rhs)) {
    if (lhs.domain.isCompatible(ce.domain(rhs)))
      return ce.symbol("True");
    return ce.symbol("False");
  }
  return ce._fn("Element", [lhs, rhs]);
}

// src/compute-engine/library/trigonometry.ts
var domainNumberToRealNumber = (_head) => {
  return ["Function", "Number", "ExtendedRealNumber"];
};
var trigFunction = (_head) => {
  return ["Function", "Number", "Number"];
};
var hyperbolicFunction = (_head) => {
  return ["Function", "Number", "Number"];
};
var TRIGONOMETRY_LIBRARY = [
  {
    //
    // Constants
    //
    Pi: {
      domain: "TranscendentalNumber",
      flags: { algebraic: false },
      constant: true,
      holdUntil: "N",
      wikidata: "Q167",
      value: (engine) => bignumPreferred(engine) ? engine._BIGNUM_PI : Math.PI
    }
  },
  {
    // sqrt(x*x + y*y)
    Degrees: {
      /* = Pi / 180 */
      signature: {
        domain: ["Function", "Number", "Number"],
        canonical: (ce, ops2) => {
          ops2 = validateArguments(ce, flattenSequence(canonical(ops2)), [
            "Number"
          ]);
          if (ops2.length !== 1)
            return ce.box(["Degrees", ops2]);
          const arg = ops2[0];
          if (arg.numericValue === null || !arg.isValid)
            return ce.box(["Degrees", arg]);
          return ce.div(ce.mul([arg, ce.symbol("Pi")]), ce.number(180));
        },
        evaluate: (ce, ops2) => ce.mul([ops2[0], ce.box(["Divide", "Pi", 180])])
      }
    },
    Hypot: {
      signature: {
        domain: ["Function", "Number", "Number", "NonNegativeNumber"],
        simplify: (ce, ops2) => ce.box(["Sqrt", ["Add", ["Square", ops2[0]], ["Square", ops2[1]]]]).simplify(),
        evaluate: [
          "Lambda",
          ["Sqrt", ["Add", ["Square", "_1"], ["Square", "_2"]]]
        ]
      }
    },
    Sin: {
      complexity: 5e3,
      signature: {
        domain: ["Function", "Number", ["Interval", -1, 1]],
        simplify: (ce, ops2) => constructibleValues(ce, "Sin", ops2[0])?.simplify() ?? (complexAllowed(ce) ? ce.box([
          "Divide",
          [
            "Subtract",
            ["Exp", ["Multiply", "ImaginaryUnit", ops2[0]]],
            ["Exp", ["Multiply", "ImaginaryUnit", ["Negate", ops2[0]]]]
          ],
          ["Complex", 0, 2]
        ]).simplify() : void 0),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sin", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sin", ops2[0])
      }
    }
  },
  {
    //
    // Basic trigonometric function
    // (may be used in the definition of other functions below)
    //
    Arctan: {
      wikidata: "Q2257242",
      complexity: 5200,
      signature: {
        domain: domainNumberToRealNumber("Arctan"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arctan", ops2[0])?.simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arctan", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arctan", ops2[0])
      }
    },
    Arctan2: {
      wikidata: "Q776598",
      complexity: 5200,
      signature: {
        domain: ["Function", "Number", "Number", "Number"],
        N: (_ce, ops2) => apply2N(ops2[0], ops2[1], Math.atan2, (a, b) => Decimal.atan2(a, b))
      }
    },
    Cos: {
      complexity: 5050,
      signature: {
        domain: ["Function", "Number", ["Interval", -1, 1]],
        simplify: (ce, ops2) => constructibleValues(ce, "Cos", ops2[0])?.simplify() ?? ce.box(["Sin", ["Add", ops2[0], ["Multiply", "Half", "Pi"]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Cos", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Cos", ops2[0])
      }
    },
    Tan: {
      // Range: 'RealNumber',
      complexity: 5100,
      signature: {
        domain: trigFunction("Tan"),
        simplify: (ce, ops2) => constructibleValues(ce, "Tan", ops2[0])?.simplify() ?? ce.box(["Divide", ["Sin", ops2[0]], ["Cos", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Tan", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Tan", ops2[0])
      }
    }
    /* converts (x, y) -> (radius, angle) */
    // ToPolarCoordinates: {
    //   domain: 'Function',
    //   outputDomain: ['TupleOf', 'RealNumber', 'RealNumber'],
    // }
  },
  //
  // Functions defined using arithmetic functions or basic
  // trigonometric functions above
  //
  {
    Arcosh: {
      complexity: 6200,
      signature: {
        domain: hyperbolicFunction("Arcosh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arcosh", ops2[0])?.simplify() ?? ce.box([
          "Ln",
          ["Add", ops2[0], ["Sqrt", ["Subtract", ["Square", ops2[0]], 1]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcosh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcosh", ops2[0])
      }
    },
    Arcsin: {
      complexity: 5500,
      signature: {
        domain: hyperbolicFunction("Arcsin"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arcsin", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          2,
          [
            "Arctan2",
            ops2[0],
            ["Add", 1, ["Sqrt", ["Subtract", 1, ["Square", ops2[0]]]]]
          ]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcsin", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcsin", ops2[0])
      }
    },
    //Note: Arsinh, not ArCsinh
    Arsinh: {
      complexity: 6100,
      signature: {
        domain: hyperbolicFunction("Arsinh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arsinh", ops2[0])?.simplify() ?? ce.box([
          "Ln",
          ["Add", ops2[0], ["Sqrt", ["Add", ["Square", ops2[0]], 1]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arsinh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arsinh", ops2[0])
      }
    },
    Artanh: {
      complexity: 6300,
      signature: {
        domain: hyperbolicFunction("Artanh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Artanh", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          "Half",
          ["Ln", ["Divide", ["Add", 1, ops2[0]], ["Subtract", 1, ops2[0]]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Artanh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Artanh", ops2[0])
      }
    },
    Cosh: {
      complexity: 6050,
      signature: {
        domain: hyperbolicFunction("Cosh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Cosh", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          "Half",
          ["Add", ["Exp", ops2[0]], ["Exp", ["Negate", ops2[0]]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Cosh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Cosh", ops2[0])
      }
    },
    Cot: {
      complexity: 5600,
      signature: {
        domain: trigFunction("Cot"),
        simplify: (ce, ops2) => constructibleValues(ce, "Cot", ops2[0])?.simplify() ?? ce.box(["Divide", ["Cos", ops2[0]], ["Sin", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Cot", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Cot", ops2[0])
      }
    },
    Csc: {
      description: "Cosecant",
      complexity: 5600,
      signature: {
        domain: trigFunction("Csc"),
        simplify: (ce, ops2) => constructibleValues(ce, "Csc", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Sin", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Csc", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Csc", ops2[0])
      }
    },
    /** = sin(z/2)^2 = (1 - cos z) / 2*/
    Haversine: {
      wikidata: "Q2528380",
      signature: {
        domain: ["Function", "ExtendedRealNumber", ["Interval", 0, 1]],
        evaluate: ["Lambda", ["Divide", ["Subtract", 1, ["Cos", "_1"]], 2]]
      }
    },
    /** = 2 * Arcsin(Sqrt(z)) */
    InverseHaversine: {
      //  Range ['Interval', [['Negate', 'Pi'], 'Pi'],
      signature: {
        domain: ["Function", "ExtendedRealNumber", "RealNumber"],
        evaluate: ["Lambda", ["Multiply", 2, ["Arcsin", ["Sqrt", "_1"]]]]
      }
    },
    Sec: {
      description: "Secant, inverse of cosine",
      complexity: 5500,
      signature: {
        domain: trigFunction("Sec"),
        simplify: (ce, ops2) => constructibleValues(ce, "Sec", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Cos", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sec", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sec", ops2[0])
      }
    },
    Sinh: {
      // Range: ['Interval', -Infinity, Infinity],
      complexity: 6e3,
      signature: {
        domain: hyperbolicFunction("Sinh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Sinh", ops2[0])?.simplify() ?? ce.box([
          "Multiply",
          "Half",
          ["Subtract", ["Exp", ops2[0]], ["Exp", ["Negate", ops2[0]]]]
        ]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sinh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sinh", ops2[0])
      }
    }
  },
  {
    Csch: {
      complexity: 6200,
      signature: {
        domain: domainNumberToRealNumber("Csch"),
        simplify: (ce, ops2) => constructibleValues(ce, "Csch", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Sinh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Csch", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Csch", ops2[0])
      }
    },
    Sech: {
      complexity: 6200,
      signature: {
        domain: ["Function", "Number", ["Interval", -1, 1]],
        simplify: (ce, ops2) => constructibleValues(ce, "Sech", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Cosh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Sech", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Sech", ops2[0])
      }
    },
    Tanh: {
      // Range: ['Interval', -Infinity, Infinity],
      complexity: 6200,
      signature: {
        domain: hyperbolicFunction("Tanh"),
        simplify: (ce, ops2) => constructibleValues(ce, "Tanh", ops2[0])?.simplify() ?? ce.box(["Divide", ["Sinh", ops2[0]], ["Cosh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Tanh", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Tanh", ops2[0])
      }
    }
  },
  {
    Arccos: {
      complexity: 5550,
      signature: {
        domain: domainNumberToRealNumber("Arccos"),
        simplify: (ce, ops2) => constructibleValues(ce, "Arccos", ops2[0])?.simplify() ?? ce.box(["Subtract", ["Divide", "Pi", 2], ["Arcsin", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arccos", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arccos", ops2[0])
      }
    },
    Arccot: {
      numeric: true,
      signature: {
        domain: domainNumberToRealNumber("Arccot"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arccot", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arccot", ops2[0])
      }
    },
    Arcoth: {
      numeric: true,
      signature: {
        domain: domainNumberToRealNumber("Arcoth"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcoth", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcoth", ops2[0])
      }
    },
    Arcsch: {
      numeric: true,
      signature: {
        domain: domainNumberToRealNumber("Arcsch"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcsch", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcsch", ops2[0])
      }
    },
    Arcsec: {
      numeric: true,
      signature: {
        domain: domainNumberToRealNumber("Arcsec"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arcsec", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arcsec", ops2[0])
      }
    },
    Arsech: {
      numeric: true,
      signature: {
        domain: domainNumberToRealNumber("Arsech"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arsech", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arsech", ops2[0])
      }
    },
    Arccsc: {
      numeric: true,
      signature: {
        domain: domainNumberToRealNumber("Arccsc"),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Arccsc", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Arccsc", ops2[0])
      }
    },
    Coth: {
      complexity: 6300,
      signature: {
        domain: hyperbolicFunction("Coth"),
        simplify: (ce, ops2) => constructibleValues(ce, "Coth", ops2[0])?.simplify() ?? ce.box(["Divide", 1, ["Tanh", ops2[0]]]).simplify(),
        evaluate: (ce, ops2) => evalTrig(ce, "evaluate", "Coth", ops2[0]),
        N: (ce, ops2) => evalTrig(ce, "N", "Coth", ops2[0])
      }
    },
    /* converts (radius, angle) -> (x, y) */
    // FromPolarCoordinates: {
    //   domain: 'Function',
    //   outputDomain: ['TupleOf', 'RealNumber', 'RealNumber'],
    // },
    InverseFunction: {
      signature: {
        domain: ["Function", "Function", "Function"],
        canonical: (ce, ops2) => {
          ops2 = validateArgumentCount(ce, flattenSequence(canonical(ops2)), 1);
          return processInverseFunction(ce, ops2) ?? ce._fn("InverseFunction", ops2);
        },
        simplify: (ce, ops2) => processInverseFunction(ce, ops2),
        evaluate: (ce, ops2) => processInverseFunction(ce, ops2)
      }
    }
  }
];
var S2 = ["Sqrt", 2];
var S3 = ["Sqrt", 3];
var S5 = ["Sqrt", 5];
var S6 = ["Sqrt", 6];
var CONSTRUCTIBLE_VALUES = [
  [
    [0, 1],
    {
      Sin: 0,
      Cos: 1,
      Tan: 0,
      Cot: NaN,
      Sec: 1,
      Csc: NaN
    }
  ],
  [
    [1, 12],
    {
      Sin: ["Divide", ["Subtract", S6, S2], 4],
      Cos: ["Divide", ["Add", S6, S2], 4],
      Tan: ["Subtract", 2, S3],
      Cot: ["Add", 2, S3],
      Sec: ["Subtract", S6, S2],
      Csc: ["Add", S6, S2]
    }
  ],
  [
    [1, 10],
    {
      Sin: ["Divide", ["Subtract", S5, 1], 4],
      Cos: ["Divide", ["Sqrt", ["Add", 10, ["Multiply", 2, S5]]], 4],
      Tan: ["Divide", ["Sqrt", ["Subtract", 25, ["Multiply", 10, S5]]], 4],
      Cot: ["Sqrt", ["Add", 5, ["Multiply", 2, S5]]],
      Sec: ["Divide", ["Sqrt", ["Subtract", 50, ["Multiply", 10, S5]]], 5],
      Csc: ["Add", 1, S5]
    }
  ],
  [
    [1, 8],
    {
      Sin: "$\\frac\\sqrt{2-\\sqrt2}{2}$",
      Cos: "$\\frac {\\sqrt {2+{\\sqrt {2}}}}{2}$",
      Tan: "$\\sqrt{2} - 1$",
      Cot: "$\\sqrt{2} + 1$",
      Sec: "$\\sqrt{ 4 - 2\\sqrt{2}}$",
      Csc: "$\\sqrt{ 4 + 2\\sqrt{2}}$"
    }
  ],
  [
    [1, 6],
    {
      Sin: "$\\frac{1}{2}$",
      Cos: "$\\frac{\\sqrt{3}}{2}$",
      Tan: "$\\frac{\\sqrt{3}}{3}$",
      Cot: "$\\frac{2\\sqrt{3}}{3}$",
      Sec: "$\\sqrt{3}$",
      Csc: 2
    }
  ],
  [
    [1, 5],
    {
      Sin: "$\\frac{\\sqrt{10- 2\\sqrt{5}}} {4}$",
      Cos: "$\\frac{1+ \\sqrt{5}} {4}$",
      Tan: "$\\sqrt{5-2\\sqrt5}$",
      Cot: "$\\frac{\\sqrt{25+10\\sqrt5}} {5}$",
      Sec: "$\\sqrt{5} - 1$",
      Csc: "$\\frac{\\sqrt{50+10\\sqrt{5}}} {5}$"
    }
  ],
  [
    [1, 4],
    {
      Sin: ["Divide", S2, 2],
      Cos: ["Divide", S2, 2],
      Tan: 1,
      Cot: 1,
      Sec: S2,
      Csc: S2
    }
  ],
  [
    [3, 10],
    {
      Sin: "$\\frac{1+ \\sqrt{5}} {4}$",
      Cos: "$\\frac{\\sqrt{10- 2\\sqrt{5}}} {4}$",
      Tan: "$\\frac{\\sqrt{25+10\\sqrt5}} {5}$",
      Cot: "$\\sqrt{5-2\\sqrt5}$",
      Sec: "$$",
      Csc: "$\\frac{\\sqrt{50+10\\sqrt{5}}} {5}$"
    }
  ],
  [
    [1, 3],
    {
      Sin: ["Divide", S3, 2],
      // '$\\frac{\\sqrt{3}}{2}$'
      Cos: "Half",
      // '$\\frac{1}{2}$'
      Tan: S3,
      // '$\\sqrt{3}$'
      Cot: ["Divide", S3, 3],
      // '$\\frac{\\sqrt{3}}{3}$'
      Sec: 2,
      Csc: ["Divide", ["Multiply", 2, S3], 3]
      // '$\\frac{2\\sqrt{3}}{3}$'
    }
  ],
  [
    [3, 8],
    {
      Sin: "$\\frac{ \\sqrt{2 + \\sqrt{2}} } {2}$",
      Cos: "$\\frac{ \\sqrt{2 - \\sqrt{2}} } {2}$",
      Tan: "$\\sqrt{2} + 1$",
      Cot: "$\\sqrt{2} - 1$",
      Sec: "$\\sqrt{ 4 + 2 \\sqrt{2} }$",
      Csc: "$\\sqrt{ 4 - 2 \\sqrt{2} }$"
    }
  ],
  [
    [2, 5],
    {
      Sin: "$\\frac{\\sqrt{10+ 2\\sqrt{5}}} {4}$",
      Cos: "$\\frac{\\sqrt{5}-1} {4}$",
      Tan: "$\\sqrt{5+2\\sqrt{5}}$",
      Cot: "$\\frac{\\sqrt{25-10\\sqrt{5}}} {5}$",
      Sec: "$1 + \\sqrt{5}$",
      Csc: "$\\frac{\\sqrt{50-10\\sqrt{5}}} {5}$"
    }
  ],
  [
    [5, 12],
    {
      Sin: "$\\frac{\\sqrt{6} + \\sqrt{2}} {4}$",
      Cos: "$\\frac{ \\sqrt{6} - \\sqrt{2}} {4}$",
      Tan: "$2+\\sqrt{3}$",
      Cot: "$2-\\sqrt{3}$",
      Sec: "$\\sqrt{6}+\\sqrt{2}$",
      Csc: "$\\sqrt{6} - \\sqrt{2}$"
    }
  ],
  [
    [1, 2],
    {
      Sin: 1,
      Cos: 0,
      Tan: NaN,
      Cot: 0,
      Sec: NaN,
      Csc: 1
    }
  ]
];
var TRIG_IDENTITIES = {
  Sin: [
    [1, "Sin"],
    [1, "Cos"],
    [-1, "Sin"],
    [-1, "Cos"]
  ],
  Cos: [
    [1, "Cos"],
    [-1, "Sin"],
    [-1, "Cos"],
    [1, "Sin"]
  ],
  Sec: [
    [1, "Sec"],
    [-1, "Csc"],
    [-1, "Sec"],
    [1, "Csc"]
  ],
  Csc: [
    [1, "Csc"],
    [1, "Sec"],
    [-1, "Csc"],
    [-1, "Sec"]
  ],
  Tan: [
    [1, "Tan"],
    [-1, "Cot"],
    [1, "Tan"],
    [-1, "Cot"]
  ],
  Cot: [
    [1, "Cot"],
    [-1, "Tan"],
    [1, "Cot"],
    [-1, "Tan"]
  ]
};
function constructibleValues(ce, head2, x) {
  const specialValues = ce.cache(
    "constructible-trigonometric-values",
    () => {
      const values = [];
      for (const [val, results] of CONSTRUCTIBLE_VALUES) {
        const boxedResults = {};
        for (const head3 of Object.keys(results))
          boxedResults[head3] = ce.parse(latexString(results[head3])) ?? ce.box(results[head3]);
        values.push([val, boxedResults]);
      }
      return values;
    },
    (cache) => {
      for (const [_k, v] of cache) {
        for (const v2 of Object.values(v))
          v2.unbind();
      }
      return cache;
    }
  );
  x = x.N();
  if (x.numericValue === null)
    return void 0;
  let theta = asFloat(x) ?? null;
  if (theta === null)
    return void 0;
  theta = theta % (2 * Math.PI);
  const identitySign = head2 !== "Cos" && head2 !== "Sec" ? Math.sign(theta) : 1;
  theta = Math.abs(theta);
  const quadrant2 = Math.floor(theta * 2 / Math.PI);
  theta = theta % (Math.PI / 2);
  let sign2;
  [sign2, head2] = TRIG_IDENTITIES[head2]?.[quadrant2] ?? [1, head2];
  sign2 = sign2 * identitySign;
  for (const [[n, d], result] of specialValues) {
    if (result[head2] && ce.chop(theta - Math.PI * n / d) === 0) {
      return sign2 < 0 ? canonicalNegate(result[head2]) : result[head2];
    }
  }
  return void 0;
}
function processInverseFunction(ce, xs) {
  if (xs.length !== 1)
    return void 0;
  const expr = xs[0];
  const head2 = expr.symbol;
  if (typeof head2 !== "string")
    return void 0;
  if (head2 === "InverseFunction")
    return expr.op1;
  const newHead = {
    Sin: "Arcsin",
    Cos: "Arccos",
    Tan: "Arctan",
    Sec: "Arcsec",
    Csc: " Arccsc",
    Sinh: "Arsinh",
    Cosh: "Arcosh",
    Tanh: "Artanh",
    Sech: "Arcsech",
    Csch: "Arcsch",
    Arcosh: "Cosh",
    Arccos: "Cos",
    Arccsc: "Csc",
    Arcsch: "Csch",
    // '??': 'Cot',
    // '??': 'Coth',
    Arcsec: "Sec",
    Arcsin: "Sin",
    Arsinh: "Sinh",
    Arctan: "Tan",
    Artanh: "Tanh"
  }[head2];
  return newHead ? ce.symbol(newHead) : void 0;
}
function evalTrig(ce, mode, head2, op3) {
  if (mode === "evaluate") {
    const result = constructibleValues(ce, head2, op3)?.evaluate();
    if (result)
      return result;
    if (op3.isExact)
      return void 0;
  }
  switch (head2) {
    case "Arccos":
      return applyN(
        op3,
        Math.acos,
        (x) => x.acos(),
        (x) => x.acos()
      );
    case "Arccot":
      return applyN(
        op3,
        (x) => Math.atan2(1, x),
        (x) => Decimal.atan2(ce._BIGNUM_ONE, x),
        (x) => x.inverse().atan()
      );
    case "Arccsc":
      return applyN(
        op3,
        (x) => Math.asin(1 / x),
        (x) => ce._BIGNUM_ONE.div(x).asin(),
        (x) => x.inverse().asin()
      );
    case "Arcosh":
      return applyN(
        op3,
        Math.acosh,
        (x) => x.acosh(),
        (x) => x.acosh()
      );
    case "Arcoth":
      return applyN(
        op3,
        (x) => x,
        (x) => x.acosh(),
        (x) => x.acosh()
      );
    case "Arcsch":
      return applyN(
        op3,
        (x) => Math.log(1 / x + Math.sqrt(1 / (x * x) + 1)),
        (x) => ce._BIGNUM_ONE.div(x.mul(x)).add(ce._BIGNUM_ONE).sqrt().add(ce._BIGNUM_ONE.div(x)).log(),
        (x) => x.mul(x).inverse().add(1).sqrt().add(x.inverse()).log()
      );
    case "Arcsec":
      return applyN(
        op3,
        (x) => Math.acos(1 / x),
        (x) => ce._BIGNUM_ONE.div(x).acos(),
        (x) => x.inverse().acos()
      );
    case "Arcsin":
      return applyN(
        op3,
        Math.asin,
        (x) => x.asin(),
        (x) => x.asin()
      );
    case "Arsech":
      return applyN(
        op3,
        (x) => Math.log((1 + Math.sqrt(1 - x * x)) / x),
        (x) => ce._BIGNUM_ONE.sub(x.mul(x).add(ce._BIGNUM_ONE).div(x)).log(),
        (x) => ce.complex(1).sub(x.mul(x)).add(1).div(x).log()
      );
    case "Arsinh":
      return applyN(
        op3,
        Math.asinh,
        (x) => x.asinh(),
        (x) => x.asinh()
      );
    case "Arctan":
      return applyN(
        op3,
        Math.atan,
        (x) => x.atan(),
        (x) => x.atan()
      );
    case "Artanh":
      return applyN(
        op3,
        Math.atanh,
        (x) => x.atanh(),
        (x) => x.atanh()
      );
    case "Cos":
      return applyN(
        op3,
        Math.cos,
        (x) => x.toSignificantDigits(ce.precision + 4).cos().toSignificantDigits(ce.precision),
        (x) => x.cos()
      );
    case "Cosh":
      return applyN(
        op3,
        Math.cosh,
        (x) => x.cosh(),
        (x) => x.cosh()
      );
    case "Cot":
      return applyN(
        op3,
        (x) => 1 / Math.tan(x),
        (x) => ce._BIGNUM_ONE.div(x.tan()),
        (x) => x.tan().inverse()
      );
    case "Coth":
      return applyN(
        op3,
        (x) => 1 / Math.tanh(x),
        (x) => ce._BIGNUM_ONE.div(x.tanh()),
        (x) => x.tanh().inverse()
      );
    case "Csc":
      return applyN(
        op3,
        (x) => 1 / Math.sin(x),
        (x) => ce._BIGNUM_ONE.div(x.sin()),
        (x) => x.sin().inverse()
      );
    case "Csch":
      return applyN(
        op3,
        (x) => 1 / Math.sinh(x),
        (x) => ce._BIGNUM_ONE.div(x.sinh()),
        (x) => x.sinh().inverse()
      );
    case "Sec":
      return applyN(
        op3,
        (x) => 1 / Math.cos(x),
        (x) => ce._BIGNUM_ONE.div(x.cos()),
        (x) => x.cos().inverse()
      );
    case "Sech":
      return applyN(
        op3,
        (x) => 1 / Math.cosh(x),
        (x) => ce._BIGNUM_ONE.div(x.cosh()),
        (x) => x.cosh().inverse()
      );
    case "Sin":
      return applyN(
        op3,
        Math.sin,
        (x) => x.toSignificantDigits(ce.precision + 4).sin().toSignificantDigits(ce.precision),
        (x) => x.sin()
      );
    case "Sinh":
      return applyN(
        op3,
        Math.sinh,
        (x) => x.sinh(),
        (x) => x.sinh()
      );
    case "Tan":
      return applyN(
        op3,
        Math.tan,
        (x) => x.toSignificantDigits(ce.precision + 4).tan().toSignificantDigits(ce.precision),
        (x) => x.tan()
      );
    case "Tanh":
      return applyN(
        op3,
        Math.tanh,
        (x) => x.tanh(),
        (x) => x.tanh()
      );
  }
  return void 0;
}

// src/compute-engine/boxed-expression/boxed-symbol-definition.ts
var import_complex17 = __toESM(require_complex());
var BoxedSymbolDefinitionImpl = class {
  // @todo
  constructor(ce, name, def) {
    if (!ce.context)
      throw Error("No context available");
    this.name = name;
    this.wikidata = def.wikidata;
    this.description = def.description;
    this.url = def.url;
    this._engine = ce;
    this.scope = ce.context;
    this.name = name;
    this._flags = def.flags ? normalizeFlags(def.flags) : void 0;
    this._domain = def.domain ? ce.domain(def.domain) : void 0;
    this.constant = def.constant ?? false;
    this.holdUntil = def.holdUntil ?? "simplify";
    if (this.constant) {
      this._defValue = def.value;
      this._value = null;
    } else {
      if (def.value) {
        if (isLatexString(def.value))
          this._value = ce.parse(def.value) ?? ce.symbol("Undefined");
        else if (typeof def.value === "function")
          this._value = ce.box(def.value(ce) ?? "Undefined");
        else if (def.value instanceof AbstractBoxedExpression)
          this._value = def.value;
        else
          this._value = ce.box(def.value);
      } else
        this._value = void 0;
      if (!this._value && this._domain && !def.flags)
        this._flags = domainToFlags(this._domain);
    }
  }
  reset() {
    if (this.constant)
      this._value = null;
  }
  // unbind() {
  //   this._value = null;
  //   this._domain = null;
  // }
  get value() {
    if (this._value === null) {
      const ce = this._engine;
      if (isLatexString(this._defValue))
        this._value = ce.parse(this._defValue) ?? ce.symbol("Undefined");
      else if (typeof this._defValue === "function")
        this._value = ce.box(this._defValue(ce) ?? "Undefined");
      else if (this._defValue)
        this._value = ce.box(this._defValue);
      else
        this._value = void 0;
      if (this._value?.numericValue) {
        const val = this._value.numericValue;
        if (!bignumPreferred(ce) && val instanceof decimal_default)
          this._value = ce.number(val.toNumber());
        else if (!complexAllowed(ce) && val instanceof import_complex17.default)
          this._value = ce._NAN;
      }
    }
    return this._value ?? void 0;
  }
  set value(val) {
    if (this.constant)
      throw new Error(
        `The value of the constant "${this.name}" cannot be changed`
      );
    /* @__PURE__ */ console.assert(this._defValue === void 0);
    if (typeof val === "number") {
      if (typeof this._value?.numericValue === "number")
        this._value["_value"] = val;
      else
        this._value = this._engine.number(val);
    } else if (val) {
      const newVal = this._engine.box(val);
      if (!this._domain || newVal.domain.isCompatible(this._domain))
        this._value = newVal;
      else
        this._value = void 0;
    } else
      this._value = void 0;
    if (this._value !== void 0)
      this._flags = void 0;
    else
      this._flags = domainToFlags(this.domain);
  }
  get domain() {
    return this._domain ?? this._value?.domain ?? void 0;
  }
  set domain(domain) {
    if (this.constant)
      throw new Error(
        `The domain of the constant "${this.name}" cannot be changed`
      );
    if (!domain) {
      this._defValue = void 0;
      this._value = void 0;
      this._flags = void 0;
      this._domain = void 0;
      return;
    }
    domain = this._engine.domain(domain);
    if (this._domain?.isNumeric) {
      if (!domain.isNumeric)
        throw Error("Can't change from a numeric domain to a non-numeric one");
      this._domain = domain;
      if (!this._value)
        this._flags = { ...this._flags ?? {}, ...domainToFlags(domain) };
      return;
    }
    if (this._domain)
      throw Error("Can't change a non-numeric domain");
    this._flags = void 0;
    this._domain = domain;
    if (!this._value && domain.isNumeric)
      this._flags = { ...this._flags ?? {}, ...domainToFlags(domain) };
  }
  //
  // Flags
  //
  get number() {
    return this.value?.isNumber ?? this._flags?.number;
  }
  set number(val) {
    this.updateFlags({ number: val });
  }
  get integer() {
    return this.value?.isInteger ?? this._flags?.integer;
  }
  set integer(val) {
    this.updateFlags({ integer: val });
  }
  get rational() {
    return this.value?.isRational ?? this._flags?.rational;
  }
  set rational(val) {
    this.updateFlags({ rational: val });
  }
  get algebraic() {
    return this.value?.isAlgebraic ?? this._flags?.algebraic;
  }
  set algebraic(val) {
    this.updateFlags({ algebraic: val });
  }
  get real() {
    return this.value?.isReal ?? this._flags?.real;
  }
  set real(val) {
    this.updateFlags({ real: val });
  }
  get extendedReal() {
    return this.value?.isExtendedReal ?? this._flags?.extendedReal;
  }
  set extendedReal(val) {
    this.updateFlags({ extendedReal: val });
  }
  get complex() {
    return this.value?.isComplex ?? this._flags?.complex;
  }
  set complex(val) {
    this.updateFlags({ complex: val });
  }
  get extendedComplex() {
    return this.value?.isExtendedComplex ?? this._flags?.extendedComplex;
  }
  set extendedComplex(val) {
    this.updateFlags({ extendedComplex: val });
  }
  get imaginary() {
    return this.value?.isImaginary ?? this._flags?.imaginary;
  }
  set imaginary(val) {
    this.updateFlags({ imaginary: val });
  }
  get positive() {
    return this.value?.isPositive ?? this._flags?.positive;
  }
  set positive(val) {
    this.updateFlags({ positive: val });
  }
  get nonPositive() {
    return this.value?.isNonPositive ?? this._flags?.nonPositive;
  }
  set nonPositive(val) {
    this.updateFlags({ nonPositive: val });
  }
  get negative() {
    return this.value?.isNegative ?? this._flags?.negative;
  }
  set negative(val) {
    this.updateFlags({ negative: val });
  }
  get nonNegative() {
    return this.value?.isNonNegative ?? this._flags?.nonNegative;
  }
  set nonNegative(val) {
    this.updateFlags({ nonNegative: val });
  }
  get zero() {
    return this.value?.isZero ?? this._flags?.zero;
  }
  set zero(val) {
    this.updateFlags({ zero: val });
  }
  get notZero() {
    return this.value?.isNotZero ?? this._flags?.notZero;
  }
  set notZero(val) {
    this.updateFlags({ notZero: val });
  }
  get one() {
    return this.value?.isOne ?? this._flags?.one;
  }
  set one(val) {
    this.updateFlags({ one: val });
  }
  get negativeOne() {
    return this.value?.isNegativeOne ?? this._flags?.negativeOne;
  }
  set negativeOne(val) {
    this.updateFlags({ negativeOne: val });
  }
  get infinity() {
    return this.value?.isInfinity ?? this._flags?.infinity;
  }
  set infinity(val) {
    this.updateFlags({ infinity: val });
  }
  get finite() {
    return this.value?.isFinite ?? this._flags?.finite;
  }
  set finite(val) {
    this.updateFlags({ finite: val });
  }
  get NaN() {
    return this.value?.isNaN ?? this._flags?.NaN;
  }
  set NaN(val) {
    this.updateFlags({ NaN: val });
  }
  get even() {
    return this.value?.isEven ?? this._flags?.even;
  }
  set even(val) {
    this.updateFlags({ even: val });
  }
  get odd() {
    return this.value?.isOdd ?? this._flags?.odd;
  }
  set odd(val) {
    this.updateFlags({ odd: val });
  }
  get prime() {
    const val = this._value;
    if (val) {
      if (!val.isInteger || val.isNonPositive)
        return false;
      return isPrime(asFloat(val) ?? NaN);
    }
    return this._flags?.prime;
  }
  set prime(val) {
    this.updateFlags({ prime: val });
  }
  get composite() {
    const val = this._value;
    if (val) {
      if (!val.isInteger || val.isNonPositive)
        return false;
      return !isPrime(asFloat(val) ?? NaN);
    }
    return this._flags?.composite;
  }
  set composite(val) {
    this.updateFlags({ composite: val });
  }
  updateFlags(flags) {
    if (this.constant)
      throw Error("The flags of constant cannot be changed");
    if (this.domain?.isNumeric === false)
      throw Error("Flags only apply to numeric domains");
    let flagCount = 0;
    let consistent = true;
    for (const flag in Object.keys(flags)) {
      flagCount += 1;
      if (this._value && flags[flag] !== void 0) {
        switch (flag) {
          case "number":
            consistent = this._value.isNumber === flags.number;
            break;
          case "integer":
            consistent = this._value.isInteger === flags.integer;
            break;
          case "rational":
            consistent = this._value.isRational === flags.rational;
            break;
          case "algebraic":
            consistent = this._value.isAlgebraic === flags.algebraic;
            break;
          case "real":
            consistent = this._value.isReal === flags.real;
            break;
          case "extendedReal":
            consistent = this._value.isExtendedReal === flags.extendedReal;
            break;
          case "complex":
            consistent = this._value.isComplex === flags.complex;
            break;
          case "extendedComplex":
            consistent = this._value.isExtendedComplex === flags.extendedComplex;
            break;
          case "imaginary":
            consistent = this._value.isImaginary === flags.imaginary;
            break;
          case "positive":
            consistent = this._value.isPositive === flags.positive;
            break;
          case "nonPositive":
            consistent = this._value.isNonPositive === flags.nonPositive;
            break;
          case "negative":
            consistent = this._value.isNegative === flags.negative;
            break;
          case "nonNegative":
            consistent = this._value.isNonNegative === flags.nonNegative;
            break;
          case "zero":
            consistent = this._value.isZero === flags.zero;
            break;
          case "notZero":
            consistent = this._value.isNotZero === flags.notZero;
            break;
          case "one":
            consistent = this._value.isOne === flags.one;
            break;
          case "negativeOne":
            consistent = this._value.isNegativeOne === flags.negativeOne;
            break;
          case "infinity":
            consistent = this._value.isInfinity === flags.infinity;
            break;
          case "NaN":
            consistent = this._value.isNaN === flags.NaN;
            break;
          case "finite":
            consistent = this._value.isFinite === flags.finite;
            break;
          case "even":
            consistent = this._value.isEven === flags.even;
            break;
          case "odd":
            consistent = this._value.isOdd === flags.odd;
            break;
          case "prime":
            consistent = this._value.isPrime === flags.prime;
            break;
          case "composite":
            consistent = this._value.isComposite === flags.composite;
            break;
        }
      }
    }
    if (flagCount > 0) {
      if (!consistent) {
        this._defValue = void 0;
        this._value = void 0;
      }
      this._domain = this._engine.domain("Number");
      if (!this._flags)
        this._flags = normalizeFlags(flags);
      else
        this._flags = { ...this._flags, ...normalizeFlags(flags) };
    }
  }
};
function definedKeys(xs) {
  return Object.fromEntries(
    Object.entries(xs).filter(([_k, v]) => v !== void 0)
  );
}
function normalizeFlags(flags) {
  const result = { ...flags };
  if (flags.zero || flags.one || flags.negativeOne) {
    result.zero = flags.zero && !flags.one && !flags.negativeOne;
    result.notZero = !flags.zero || flags.one || flags.negativeOne;
    result.one = flags.one && !flags.zero && !flags.negativeOne;
    result.negativeOne = flags.negativeOne && !flags.zero && !flags.one;
    result.infinity = false;
    result.NaN = false;
    result.finite = true;
    result.integer = true;
    result.finite = true;
    result.infinity = false;
    result.NaN = false;
    result.even = flags.one;
    result.odd = !flags.one;
    result.prime = false;
    result.composite = false;
  }
  if (result.zero) {
    result.positive = false;
    result.negative = false;
    result.nonPositive = true;
    result.nonNegative = true;
  }
  if (result.notZero === true) {
    if (!result.imaginary)
      result.real = true;
    result.zero = false;
  }
  if (result.one) {
    result.positive = true;
  }
  if (result.negativeOne) {
    result.nonPositive = true;
  }
  if (result.positive || result.nonNegative) {
    result.negativeOne = false;
  }
  if (result.positive) {
    result.nonPositive = false;
    result.negative = false;
    result.nonNegative = true;
  } else if (result.nonPositive) {
    result.positive = false;
    result.negative = result.notZero;
    result.nonNegative = !result.zero;
  } else if (result.negative) {
    result.positive = false;
    result.nonPositive = result.notZero;
    result.nonNegative = false;
  } else if (result.nonNegative) {
    result.positive = result.notZero;
    result.nonPositive = !result.zero;
    result.negative = false;
  }
  if (result.positive || result.negative || result.nonPositive || result.nonNegative) {
    result.number = true;
    if (result.finite)
      result.real = true;
    else if (!result.finite)
      result.complex = true;
    result.imaginary = false;
  }
  if (result.finite) {
    result.number = true;
    result.complex = true;
    result.infinity = false;
    result.NaN = false;
  }
  if (result.infinity) {
    result.finite = false;
    result.NaN = false;
  }
  if (result.infinity === false) {
    result.extendedComplex = false;
    result.extendedReal = false;
  }
  if (flags.even)
    result.odd = false;
  if (flags.odd)
    result.even = false;
  if (result.integer)
    result.rational = true;
  if (result.rational)
    result.algebraic = true;
  if (result.algebraic)
    result.real = true;
  if (result.real)
    result.complex = true;
  if (result.imaginary)
    result.complex = true;
  if (result.complex)
    result.number = true;
  if (result.real && result.infinity !== false)
    result.extendedReal = true;
  if (result.complex && result.infinity !== false)
    result.extendedComplex = true;
  if (result.even || result.infinity || result.NaN || result.negative || result.imaginary || result.integer === false)
    result.prime = false;
  if (result.number && result.prime)
    result.composite = false;
  return result;
}
function domainToFlags(dom) {
  if (!dom)
    return {};
  const result = {};
  if (dom.isNumeric) {
    const domain = dom.literal;
    result.number = true;
    if (domain === "Integer")
      result.integer = true;
    if (domain === "RationalNumber")
      result.rational = true;
    if (domain === "AlgebraicNumber")
      result.algebraic = true;
    if (domain === "TranscendentalNumber") {
      result.algebraic = false;
      result.real = true;
    }
    if (domain === "ExtendedRealNumber")
      result.extendedReal = true;
    if (domain === "RealNumber")
      result.real = true;
    if (domain === "ImaginaryNumber")
      result.imaginary = true;
    if (domain === "ExtendedComplexNumber")
      result.extendedComplex = true;
    if (domain === "ComplexNumber")
      result.complex = true;
    if (domain === "PositiveNumber") {
      result.notZero = true;
      result.real = true;
      result.positive = true;
    }
    if (domain === "NegativeNumber") {
      result.notZero = true;
      result.real = true;
      result.negative = true;
    }
    if (domain === "NonNegativeNumber") {
      result.real = true;
      result.positive = true;
    }
    if (domain === "NonPositiveNumber") {
      result.real = true;
      result.negative = true;
    }
    if (domain === "PositiveInteger") {
      result.notZero = true;
      result.integer = true;
      result.positive = true;
    }
    if (domain === "NegativeNumber") {
      result.notZero = true;
      result.integer = true;
      result.negative = true;
    }
    if (domain === "NonNegativeNumber") {
      result.integer = true;
      result.positive = true;
    }
    if (domain === "NonPositiveNumber") {
      result.integer = true;
      result.negative = true;
    }
  } else {
    result.number = false;
    result.integer = false;
    result.rational = false;
    result.algebraic = false;
    result.real = false;
    result.extendedReal = false;
    result.complex = false;
    result.extendedComplex = false;
    result.imaginary = false;
    result.positive = false;
    result.nonPositive = false;
    result.negative = false;
    result.nonNegative = false;
    result.zero = false;
    result.notZero = false;
    result.one = false;
    result.negativeOne = false;
    result.infinity = false;
    result.NaN = false;
    result.odd = false;
    result.even = false;
    result.prime = false;
    result.composite = false;
  }
  return definedKeys(normalizeFlags(result));
}

// src/compute-engine/boxed-expression/boxed-function-definition.ts
var BoxedFunctionDefinitionImpl = class {
  constructor(ce, name, def) {
    if (!ce.context)
      throw Error("No context available");
    this.engine = ce;
    this.scope = ce.context;
    const idempotent = def.idempotent ?? false;
    const involution = def.involution ?? false;
    if (idempotent && involution)
      throw new Error(
        `Function Definition "${name}": the 'idempotent' and 'involution' flags are mutually exclusive`
      );
    this.name = name;
    this.description = def.description;
    this.wikidata = def.wikidata;
    this.threadable = def.threadable ?? false;
    this.associative = def.associative ?? false;
    this.commutative = def.commutative ?? false;
    this.idempotent = idempotent;
    this.involution = involution;
    this.inert = def.inert ?? false;
    this.numeric = def.numeric ?? false;
    this.pure = def.pure ?? true;
    this.complexity = def.complexity ?? DEFAULT_COMPLEXITY;
    this.hold = def.hold ?? "none";
    if (this.inert) {
      if (def.hold)
        throw Error(
          `Function Definition "${name}": an inert function should not have a hold`
        );
      this.hold = "rest";
      if (def.signature) {
        const sig = def.signature;
        if ("simplify" in sig || "evaluate" in sig || "N" in sig || "evalDimension" in sig || "sgn" in sig || "compile" in sig)
          throw Error(
            `Function Definition "${name}": an inert function should only have 'canonical' or 'codomain' handlers`
          );
      }
      if (this.threadable)
        throw Error(
          `Function Definition "${name}": an inert function should not be threadable`
        );
      if (this.associative)
        throw Error(
          `Function Definition "${name}": an inert function should not be associative`
        );
      if (this.commutative)
        throw Error(
          `Function Definition "${name}": an inert function should not be commutative`
        );
      if (this.idempotent)
        throw Error(
          `Function Definition "${name}": an inert function should not be idempotent`
        );
      if (this.involution)
        throw Error(
          `Function Definition "${name}": an inert function should not be involution`
        );
      if (!this.pure)
        throw Error(
          `Function Definition "${name}": an inert function should be pure`
        );
    }
    if (def.signature) {
      const sig = def.signature;
      const domain = sig.domain ? ce.domain(sig.domain) : def.numeric ? ce.domain("NumericFunction") : ce.domain("Function");
      if (!domain.isValid)
        throw Error(
          `Function Definition "${name}": invalid domain ${JSON.stringify(
            sig.domain
          )}`
        );
      const codomain = sig.codomain ?? domain.codomain ?? (def.numeric ? ce.domain("Number") : ce.domain("Anything"));
      this.signature = {
        domain,
        codomain,
        canonical: sig.canonical,
        simplify: sig.simplify,
        evaluate: !sig.evaluate ? void 0 : typeof sig.evaluate === "function" ? sig.evaluate : ce.box(sig.evaluate, { canonical: false }),
        N: sig.N,
        evalDimension: sig.evalDimension,
        sgn: sig.sgn,
        compile: sig.compile
      };
    } else if (def.numeric) {
      this.signature = {
        domain: ce.domain("NumericFunction"),
        codomain: ce.domain("Number")
      };
    } else {
      this.signature = {
        domain: ce.domain("Function"),
        codomain: ce.domain("Anything")
      };
    }
  }
  reset() {
    return;
  }
};
function makeFunctionDefinition(engine, name, def) {
  if (def instanceof BoxedFunctionDefinitionImpl)
    return def;
  return new BoxedFunctionDefinitionImpl(
    engine,
    name,
    def
  );
}

// src/compute-engine/library/utils.ts
function isSymbolDefinition(def) {
  return !!def && typeof def === "object" && ("domain" in def || "value" in def || "constant" in def);
}
function isFunctionDefinition(def) {
  return !!def && typeof def === "object" && ("complexity" in def || "numeric" in def || "signature" in def);
}

// src/compute-engine/library/library.ts
function getStandardLibrary(categories) {
  if (categories === "all") {
    return getStandardLibrary([
      "domains",
      "core",
      "control-structures",
      // If, Block, Loop
      "logic",
      "collections",
      // Dictionary, List, Sets
      "relop",
      "numeric",
      "arithmetic",
      "algebra",
      "calculus",
      "combinatorics",
      "linear-algebra",
      "other",
      "physics",
      "polynomials",
      "statistics",
      "trigonometry",
      "dimensions",
      "units"
    ]);
  } else if (typeof categories === "string")
    categories = [categories];
  const result = [];
  for (const category of categories) {
    const dict = LIBRARIES[category];
    if (!dict)
      throw Error(`Unknown library category ${category}`);
    if (Array.isArray(dict))
      result.push(...dict);
    else
      result.push(dict);
  }
  return result;
}
var LIBRARIES = {
  "algebra": [],
  // 'algebra': [
  //   // polynomial([0, 2, 0, 4]:list, x:symbol) -> 2x + 4x^3
  //   // polynomial(2x + 4x^3, x) -> {0, 2, 0, 4}
  //   // rational(2x + 4x^3, {3, 1}, x) -> (2x + 4x^3)/(3+x)
  //   // https://reference.wolfram.com/language/tutorial/AlgebraicCalculations.html
  //   // simplify-trig (macsyma)
  //   //  - trigReduce, trigExpand, trigFactor, trigToExp (mathematica)
  //   // Mathematica:
  //   // - distribute -> (a+b)(c+d) -> ac+ ad+ bc+ bd (doesn't have to be multiply,
  //   // f(a+b, c+d) -> f(a, c) + f(a, d) + f(b, c) + f(b, d)
  //   // -- distribute(expr, over=add, with=multiply)
  //   // https://reference.wolfram.com/language/ref/Distribute.html
  //   // - expand, expand-all
  //   // - factor
  //   // - simplify
  // ],
  "arithmetic": ARITHMETIC_LIBRARY,
  "calculus": CALCULUS_LIBRARY,
  "combinatorics": [],
  // @todo fibonacci, binomial, etc...
  "control-structures": [],
  //   // D
  //   // Derivative (mathematica)
  //   // diff (macsyma)
  //   // nth-diff
  //   // int
  //   // - integrate(expression, symbol)  -- indefinite integral
  //   // - integrate(expression, range) <range> = {symbol, min, max} -- definite integral
  //   // - integrate(expression, range1, range2) -- multiple integral
  //   // def-int
  // ],
  "dimensions": [],
  // @todo // volume, speed, area
  "domains": [],
  "core": CORE_LIBRARY,
  "collections": [SETS_LIBRARY, COLLECTIONS_LIBRARY],
  // 'domains': getDomainsDictionary(),
  "linear-algebra": [],
  //@todo   // 'linear-algebra': [
  //   // matrix
  //   // transpose
  //   // cross-product
  //   // outer-product
  //   // determinant
  //   // vector
  //   // matrix
  //   // rank
  //   // scalar-matrix
  //   // constant-matrix
  //   // identity-matrix
  // ],
  "logic": LOGIC_LIBRARY,
  "numeric": [],
  // @todo   // 'numeric': [
  //   // Gamma function
  //   // Zeta function
  //   // erf function
  //   // numerator(fraction)
  //   // denominator(fraction)
  //   // exactFloatToRational
  //   // N -> eval as a number
  //   // random
  //   // hash
  // ],
  "other": [],
  "relop": RELOP_LIBRARY,
  "polynomials": POLYNOMIALS_LIBRARY,
  "physics": {
    "Mu-0": {
      description: "Vaccum permeability",
      constant: true,
      wikidata: "Q1515261",
      domain: "RealNumber",
      value: 125663706212e-17
      // unit: ['Divide', 'N', ['Square', 'A']],
    }
  },
  "statistics": [],
  // @todo statistics: [
  //   // average
  //   // mean
  //   // variance = size(l) * stddev(l)^2 / (size(l) - 1)
  //   // stddev
  //   // median
  //   // quantile
  // ],
  "trigonometry": TRIGONOMETRY_LIBRARY,
  "units": []
};
function validateDefinitionName(name) {
  name = name.normalize();
  if (!isValidIdentifier(name))
    throw Error(`Invalid definition name ${name}`);
  return name;
}
function setCurrentContextSymbolTable(engine, table) {
  var _a;
  if (!engine.context)
    throw Error("No context available");
  (_a = engine.context).idTable ?? (_a.idTable = /* @__PURE__ */ new Map());
  const idTable = engine.context.idTable;
  for (let name of Object.keys(table)) {
    const entry = table[name];
    name = validateDefinitionName(name);
    if (isFunctionDefinition(entry)) {
      const def = makeFunctionDefinition(engine, name, entry);
      if (idTable.has(name))
        throw new Error(
          `Duplicate function definition ${name}:
${JSON.stringify(
            idTable.get(name)
          )}
${JSON.stringify(entry)}`
        );
      idTable.set(name, def);
    } else if (isSymbolDefinition(entry)) {
      const def = new BoxedSymbolDefinitionImpl(engine, name, entry);
      if (engine.strict && entry.wikidata) {
        for (const [_, d] of idTable) {
          if (d.wikidata === entry.wikidata)
            throw new Error(
              `Duplicate entries with wikidata "${entry.wikidata}": "${name}" and "${d.name}"`
            );
        }
      }
      if (idTable.has(name))
        throw new Error(`Duplicate symbol definition "${name}"`);
      idTable.set(name, def);
    } else {
      const def = new BoxedSymbolDefinitionImpl(engine, name, {
        value: engine.box(entry)
      });
      /* @__PURE__ */ console.assert(def);
      idTable.set(name, def);
    }
  }
}

// src/compute-engine/cost-function.ts
var import_complex18 = __toESM(require_complex());
function numericCostFunction(n) {
  if (Number.isInteger(n) && n !== 0) {
    return Math.floor(Math.log2(Math.abs(n)) / Math.log2(10)) + (n > 0 ? 1 : 2);
  }
  return 2;
}
function costFunction(expr) {
  if (expr.symbol)
    return 1;
  const num = expr.numericValue;
  if (num !== null) {
    if (expr.isZero)
      return 1;
    if (expr.isInteger)
      return numericCostFunction(asFloat(expr));
    if (isRational(num)) {
      if (isMachineRational(num))
        return numericCostFunction(num[0]) + numericCostFunction(num[1]) + 1;
      else
        return numericCostFunction(Number(num[0])) + numericCostFunction(Number(num[1])) + 1;
    }
    if (num instanceof import_complex18.default)
      return numericCostFunction(num.re) + numericCostFunction(num.im) + 1;
    if (expr.isNumber)
      return 2;
  }
  const head2 = expr.head;
  let headCost = 2;
  if (typeof head2 === "string") {
    if (["Add", "Divide"].includes(head2))
      headCost = 3;
    else if (["Subtract", "Negate"].includes(head2))
      headCost = 4;
    else if (["Square", "Sqrt", "Multiply", "Root"].includes(head2))
      headCost = 5;
    else if (["Power"].includes(head2))
      headCost = 6;
    else if (["Ln", "Exp", "Log"].includes(head2))
      headCost = 7;
    else
      headCost = 8;
  } else
    headCost = costFunction(head2);
  return headCost + (expr.ops?.reduce((acc, x) => acc + costFunction(x), 0) ?? 0);
}
var DEFAULT_COST_FUNCTION = costFunction;

// src/compute-engine/boxed-expression/expression-map.ts
var ExpressionMap = class _ExpressionMap {
  constructor(source) {
    if (!source) {
      this._items = /* @__PURE__ */ new Map();
    } else if (source instanceof _ExpressionMap) {
      this._items = new Map(source._items);
    } else {
      this._items = new Map(
        source
      );
    }
  }
  has(expr) {
    for (const x of this._items.keys())
      if (x.isSame(expr))
        return true;
    return false;
  }
  get(expr) {
    for (const [x, v] of this._items)
      if (x.isSame(expr))
        return v;
    return void 0;
  }
  clear() {
    this._items.clear();
  }
  set(expr, value) {
    for (const x of this._items.keys()) {
      if (x.isSame(expr)) {
        this._items.set(x, value);
        return;
      }
    }
    this._items.set(expr, value);
  }
  delete(expr) {
    this._items.delete(expr);
  }
  [Symbol.iterator]() {
    return this._items.entries();
  }
  entries() {
    return this._items.entries();
  }
};

// src/common/utils.ts
function permutations(xs) {
  const result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(xs);
  return result;
}

// src/compute-engine/boxed-expression/boxed-patterns.ts
var BoxedPattern = class _BoxedPattern extends AbstractBoxedExpression {
  constructor(ce, pattern, metadata) {
    super(ce, metadata);
    this._pattern = isLatexString(pattern) ? ce.parse(pattern, { canonical: false }) : ce.box(pattern, { canonical: false });
  }
  get hash() {
    return hashCode("Pattern") ^ this._pattern.hash;
  }
  unbind() {
    this._pattern.unbind();
  }
  get json() {
    return serializeJsonFunction(this.engine, "Pattern", [this._pattern]);
  }
  get head() {
    return "Pattern";
  }
  get domain() {
    return this.engine.domain("Pattern");
  }
  get isCanonical() {
    return true;
  }
  set isCanonical(_val) {
    return;
  }
  isSame(rhs) {
    if (this === rhs)
      return true;
    return rhs instanceof _BoxedPattern && this._pattern.isSame(rhs._pattern);
  }
  isEqual(rhs) {
    return rhs instanceof _BoxedPattern && this._pattern.isEqual(rhs._pattern);
  }
  match(expr, options) {
    return match(expr, this._pattern, {
      recursive: options?.recursive ?? false,
      numericTolerance: options?.numericTolerance ?? 0,
      substitution: options?.substitution ?? {}
    });
  }
  test(expr, options) {
    return this.match(expr, options) !== null;
  }
  count(exprs, options) {
    let result = 0;
    for (const expr of exprs) {
      if (this.match(expr, options) !== null)
        result += 1;
    }
    return result;
  }
  subs(sub2, options) {
    return this._pattern.subs(sub2, options);
  }
};
function hasWildcards(expr) {
  if (typeof expr === "string")
    return expr.startsWith("_");
  if (expr.symbol?.startsWith("_"))
    return true;
  if (expr.ops)
    return hasWildcards(expr.head) || expr.ops.some(hasWildcards);
  if (expr.keys) {
    for (const key of expr.keys)
      if (hasWildcards(expr.getKey(key)))
        return true;
  }
  return false;
}
function captureWildcard(wildcard, expr, substitution) {
  const name = getWildcardName(wildcard);
  if (name === "")
    return substitution;
  if (substitution[name] !== void 0) {
    if (!expr.isSame(substitution[name]))
      return null;
    return substitution;
  }
  if (hasWildcards(expr))
    return null;
  return { ...substitution, [name]: expr };
}
function matchOnce(expr, pattern, substitution, options) {
  const ce = expr.engine;
  if (pattern.head === "Pattern")
    return pattern.match(expr, { substitution, ...options });
  if (pattern instanceof BoxedNumber) {
    if (!(expr instanceof BoxedNumber))
      return null;
    if (options.numericTolerance === 0)
      return pattern.isSame(expr) ? substitution : null;
    return pattern.isEqualWithTolerance(expr, options.numericTolerance) ? substitution : null;
  }
  const str = pattern.string;
  if (str !== null)
    return expr.string === str ? substitution : null;
  const symbol2 = pattern.symbol;
  if (symbol2 !== null) {
    if (symbol2.startsWith("_"))
      return captureWildcard(symbol2, expr, substitution);
    return symbol2 === expr.symbol ? substitution : null;
  }
  if (pattern.nops !== expr.nops)
    return null;
  const keys = pattern.keys;
  if (keys !== null) {
    const exprKeys = expr.keys;
    if (exprKeys === null)
      return null;
    for (const key of keys) {
      const r = matchOnce(exprKeys[key], keys[key], substitution, options);
      if (r === null)
        return null;
      substitution = r;
    }
    return substitution;
  }
  if (pattern.ops) {
    const head2 = pattern.head;
    if (typeof head2 === "string" && head2.startsWith("_"))
      return captureWildcard(head2, ce.box(expr.head), substitution);
    let def = void 0;
    if (typeof head2 === "string" && typeof expr.head === "string") {
      if (head2 !== expr.head)
        return null;
      def = ce.lookupFunction(head2);
    } else {
      const r = matchOnce(
        ce.box(expr.head, { canonical: false }),
        ce.box(head2, { canonical: false }),
        substitution,
        options
      );
      if (r === null)
        return null;
      substitution = r;
    }
    return def?.commutative ? matchCommutativeArguments(expr, pattern, substitution, options) : matchNonCommutativeArguments(expr, pattern, substitution, options);
  }
  return null;
}
function matchPermutation(ce, ops2, patterns, substitution, options) {
  let result = { ...substitution };
  ops2 = [...ops2];
  let hasRest = false;
  for (const arg of patterns) {
    if (arg.symbol === "__")
      hasRest = true;
    else {
      let r = null;
      if (arg.symbol?.startsWith("_")) {
        for (let i = 0; i <= ops2.length - 1; i++) {
          r = captureWildcard(arg.symbol, ops2[i], result);
          if (r !== null) {
            ops2.splice(i, 1);
            break;
          }
        }
      } else {
        for (let i = 0; i <= ops2.length - 1; i++) {
          r = matchOnce(ops2[i], arg, result, options);
          if (r !== null) {
            ops2.splice(i, 1);
            break;
          }
        }
      }
      if (r === null)
        return null;
      result = r;
    }
  }
  if (!hasRest && ops2.length > 0)
    return null;
  if (result !== null && hasRest)
    result["__"] = ce._fn("Sequence", ops2);
  return result;
}
function matchCommutativeArguments(expr, pattern, substitution, options) {
  const patterns = permutations(pattern.ops);
  for (const pat of patterns) {
    const result = matchPermutation(
      expr.engine,
      expr.ops,
      pat,
      substitution,
      options
    );
    if (result !== null)
      return result;
  }
  return null;
}
function matchNonCommutativeArguments(expr, pattern, substitution, options) {
  const ce = expr.engine;
  const ops2 = [...expr.ops];
  let result = { ...substitution };
  let i = 0;
  const patterns = pattern.ops;
  while (i < pattern.nops) {
    const pat = patterns[i];
    const argName = pat.symbol;
    if (argName !== null) {
      if (argName.startsWith("__")) {
        let j = 0;
        if (patterns[i + 1] === void 0) {
          j = ops2.length + 1;
        } else {
          let found = false;
          while (!found && j < ops2.length) {
            found = matchOnce(ops2[j], patterns[i + 1], result, options) !== null;
            j += 1;
          }
          if (!found)
            return null;
        }
        if (!argName.startsWith("___") && j <= 1)
          return null;
        result = captureWildcard(
          argName,
          ce.fn("Sequence", ops2.splice(0, j - 1)),
          result
        );
      } else if (argName.startsWith("_")) {
        result = captureWildcard(argName, ops2.shift(), result);
      } else {
        const sub2 = matchOnce(ops2.shift(), pat, result, options);
        if (sub2 === null)
          return null;
        result = sub2;
      }
    } else {
      const sub2 = matchOnce(ops2.shift(), pat, result, options);
      if (sub2 === null)
        return null;
      result = sub2;
    }
    if (result === null)
      return null;
    i += 1;
  }
  return result;
}
function match(subject, pattern, options) {
  const substitution = matchOnce(subject, pattern, options.substitution ?? {}, {
    numericTolerance: options?.numericTolerance ?? NUMERIC_TOLERANCE
  });
  if (substitution)
    return substitution;
  if (!options.recursive)
    return null;
  return null;
}

// src/compute-engine/boxed-expression/boxed-symbol.ts
function isSymbolDefinition2(def) {
  if (def === null || def === void 0)
    return false;
  if ("constant" in def)
    return true;
  return false;
}
function isFunctionDefinition2(def) {
  if (def === null || def === void 0)
    return false;
  if ("signature" in def)
    return true;
  return false;
}
var BoxedSymbol = class _BoxedSymbol extends AbstractBoxedExpression {
  constructor(ce, name, options) {
    super(ce, options?.metadata);
    /* @__PURE__ */ console.assert(name === name.normalize());
    this._name = name;
    /* @__PURE__ */ console.assert(isValidIdentifier(this._name));
    this._scope = options?.canonical ? ce.context : null;
    this._def = options?.def ?? null;
  }
  get hash() {
    if (this._hash === void 0)
      this._hash = hashCode(this._name);
    return this._hash;
  }
  unbind() {
    this._def?.reset();
    this._def = null;
  }
  get isPure() {
    return (this.symbolDefinition?.constant && this.symbolDefinition.value?.isPure) ?? this.functionDefinition?.pure ?? false;
  }
  get json() {
    return serializeJsonSymbol(this.engine, this._name, {
      latex: this._latex,
      wikidata: this._wikidata
    });
  }
  get scope() {
    return this._scope;
  }
  /** A free variable either has no definition, or it has a definition, but no value */
  get isFree() {
    const def = this._def ?? this.engine.lookupSymbol(this._name, this._wikidata);
    return !isSymbolDefinition2(def) || def.value === void 0;
  }
  get isConstant() {
    const def = this._def ?? this.engine.lookupSymbol(this._name, this._wikidata);
    return !isSymbolDefinition2(def) || def.constant;
  }
  get isCanonical() {
    return this._scope !== null;
  }
  set isCanonical(val) {
    this._scope = val ? this.engine.context : null;
    this._def = null;
  }
  get canonical() {
    if (this._scope)
      return this;
    return this.engine.box(this._name);
  }
  get wikidata() {
    return this._wikidata ?? this.baseDefinition?.wikidata ?? void 0;
  }
  get description() {
    if (!this.baseDefinition)
      return void 0;
    if (!this.baseDefinition.description)
      return void 0;
    if (typeof this.baseDefinition.description === "string")
      return [this.baseDefinition.description];
    return this.baseDefinition.description;
  }
  get url() {
    return this.baseDefinition?.url ?? void 0;
  }
  get complexity() {
    return 7;
  }
  get head() {
    return "Symbol";
  }
  get symbol() {
    return this._name;
  }
  get isNothing() {
    return this._name === "Nothing";
  }
  //  A base definition is the base class of both symbol and function definition
  get baseDefinition() {
    if (this._def === null)
      this.bind(this._scope);
    return this._def ?? void 0;
  }
  get symbolDefinition() {
    if (this._def === null)
      this.bind(this._scope);
    return isSymbolDefinition2(this._def) ? this._def : void 0;
  }
  get functionDefinition() {
    if (this._def === null)
      this.bind(this._scope);
    return isFunctionDefinition2(this._def) ? this._def : void 0;
  }
  bind(scope) {
    if (scope === null) {
      this._def = void 0;
      return;
    }
    let def;
    def = this.engine.lookupSymbol(this._name, this._wikidata, scope);
    if (def?.wikidata && this._wikidata && def.wikidata !== this._wikidata)
      def = void 0;
    if (def) {
      this._name = def.name;
      this._def = def;
      return;
    }
    def = this.engine.lookupFunction(this._name, scope);
    if (def) {
      this._def = def;
      return;
    }
    if (this.engine.defaultDomain !== null) {
      this._def = this.engine.defineSymbol(this._name, {
        wikidata: this._wikidata,
        domain: this.engine.defaultDomain
      });
      this._name = this._def.name;
    }
  }
  get value() {
    return this.symbolDefinition?.value;
  }
  set value(value) {
    if (this._name[0] === "_")
      throw new Error(
        `The value of the wildcard "${this._name}" cannot be changed`
      );
    this.engine.forget(this._name);
    let v;
    if (value !== void 0) {
      const boxedValue = this.engine.box(value);
      v = boxedValue.value ?? boxedValue.evaluate();
    }
    if (v?.domain.isCompatible("Function")) {
      this._def = this.engine.defineFunction(this._name, {
        signature: {
          domain: v.domain,
          evaluate: v
          // Evaluate as a lambda
        }
      });
    } else if (this._def && isSymbolDefinition2(this._def)) {
      this._def.value = v;
    } else {
      let dom = v?.domain;
      if (dom?.isNumeric)
        dom = this.engine.domain("Number");
      this._def = this.engine.defineSymbol(this._name, {
        value: v,
        domain: dom ?? void 0
      });
    }
  }
  get domain() {
    if (this.functionDefinition)
      return this.engine.domain("Function");
    return this.symbolDefinition?.domain ?? this.engine.defaultDomain ?? this.engine.domain("Value");
  }
  set domain(inDomain) {
    if (this._name[0] === "_")
      throw new Error(
        `The domain of the wildcard "${this._name}" cannot be changed`
      );
    const d = this.engine.domain(inDomain);
    if (d.isCompatible("Function")) {
      this.engine.forget(this._name);
      this._def = this.engine.defineFunction(this._name, {
        signature: { domain: d }
      });
    } else if (isSymbolDefinition2(this._def)) {
      this._def.domain = d;
    } else {
      this.engine.forget(this._name);
      this._def = this.engine.defineSymbol(this._name, { domain: d });
    }
  }
  get explicitDomain() {
    if (this.functionDefinition)
      return this.engine.domain("Function");
    return this.symbolDefinition?.domain ?? void 0;
  }
  get sgn() {
    const v = this.value;
    if (v && v !== this) {
      const s = v.sgn;
      if (s !== void 0)
        return s;
    }
    const def = this.symbolDefinition;
    if (def) {
      if (def.zero === true)
        return 0;
      if (def.positive === true)
        return 1;
      if (def.negative === true)
        return -1;
    } else
      return null;
    return void 0;
  }
  has(x) {
    if (typeof x === "string")
      return this._name === x;
    return x.includes(this._name);
  }
  isSame(rhs) {
    if (this === rhs)
      return true;
    if (!(rhs instanceof _BoxedSymbol))
      return false;
    return this._name === rhs._name;
  }
  match(rhs, _options) {
    if (!(rhs instanceof _BoxedSymbol))
      return null;
    if (this._name === rhs._name)
      return {};
    return null;
  }
  isEqual(rhs) {
    if (!this.isCanonical)
      return this.canonical.isEqual(rhs);
    rhs = rhs.canonical;
    if (this === rhs)
      return true;
    if (rhs.symbol !== null)
      return rhs.symbol === this._name;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isEqual(rhs.N());
    if (rhs.isZero) {
      if (this.isZero)
        return true;
      if (this.isNotZero)
        return false;
    }
    if (this.isZero && rhs.isNotZero)
      return false;
    if (this.engine.ask(["Equal", this, rhs]).length > 0)
      return true;
    if (this.engine.ask(["NotEqual", this, rhs]).length > 0)
      return false;
    return false;
  }
  isLess(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._name)
      return false;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isLess(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s < 0;
    }
    return void 0;
  }
  isLessEqual(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._name)
      return true;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isLessEqual(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s <= 0;
    }
    return this.isLess(rhs) || this.isEqual(rhs);
  }
  isGreater(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._name)
      return false;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isGreater(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s > 0;
    }
    return void 0;
  }
  isGreaterEqual(rhs) {
    if (rhs.symbol !== null && rhs.symbol === this._name)
      return true;
    const lhsVal = this.symbolDefinition?.value?.N();
    if (lhsVal)
      return lhsVal.isGreaterEqual(rhs.N());
    if (rhs.isZero) {
      const s = this.sgn;
      if (s === null)
        return false;
      if (s !== void 0)
        return s >= 0;
    }
    return this.isGreater(rhs) || this.isEqual(rhs);
  }
  get isFunction() {
    return !!this.functionDefinition;
  }
  get isZero() {
    return this.symbolDefinition?.zero;
  }
  get isNotZero() {
    return this.symbolDefinition?.notZero;
  }
  get isOne() {
    return this.symbolDefinition?.one;
  }
  get isNegativeOne() {
    return this.symbolDefinition?.negativeOne;
  }
  get isOdd() {
    return this.symbolDefinition?.odd;
  }
  get isEven() {
    return this.symbolDefinition?.even;
  }
  get isPrime() {
    return this.symbolDefinition?.prime;
  }
  get isComposite() {
    return this.symbolDefinition?.composite;
  }
  get isInfinity() {
    return this.symbolDefinition?.infinity;
  }
  get isNaN() {
    return this.symbolDefinition?.NaN;
  }
  // x > 0
  get isPositive() {
    return this.symbolDefinition?.positive;
  }
  get isNonPositive() {
    return this.symbolDefinition?.nonPositive;
  }
  get isNegative() {
    return this.symbolDefinition?.negative;
  }
  get isNonNegative() {
    return this.symbolDefinition?.nonNegative;
  }
  get isNumber() {
    return this.symbolDefinition?.number;
  }
  get isInteger() {
    return this.symbolDefinition?.integer;
  }
  get isRational() {
    return this.symbolDefinition?.rational;
  }
  get isAlgebraic() {
    return this.symbolDefinition?.rational;
  }
  get isReal() {
    return this.symbolDefinition?.real;
  }
  get isExtendedReal() {
    return this.symbolDefinition?.extendedReal;
  }
  get isComplex() {
    return this.symbolDefinition?.complex;
  }
  get isImaginary() {
    return this.symbolDefinition?.imaginary;
  }
  simplify(options) {
    const def = this.symbolDefinition;
    if ((def?.holdUntil === "never" || def?.holdUntil === "simplify") && def.value)
      return def.value.simplify(options);
    return options?.rules ? this.replace(options.rules) ?? this : this;
  }
  evaluate(options) {
    const def = this.symbolDefinition;
    if (def?.holdUntil !== "N")
      return def?.value?.evaluate(options) ?? this;
    return this;
  }
  N(options) {
    return this.symbolDefinition?.value?.N(options) ?? this;
  }
  replace(rules, options) {
    return replace(this, rules, options);
  }
  subs(sub2, options) {
    if (sub2[this._name] === void 0)
      return options?.canonical ? this.canonical : this;
    return this.engine.box(sub2[this._name], options);
  }
};
function makeCanonicalSymbol(ce, name) {
  const def = ce.lookupSymbol(name, void 0, ce.context);
  if (def?.holdUntil === "never" && def.value)
    return def.value;
  return new BoxedSymbol(ce, name, { canonical: true, def });
}

// src/compute-engine/compute-engine.ts
var ComputeEngine = class _ComputeEngine {
  /**
   * Construct a new `ComputeEngine` instance.
   *
   * Identifier tables define functions and symbols (in `options.ids`).
   * If no table is provided the standard library is used (`ComputeEngine.getStandardLibrary()`)
   *
   * The LaTeX syntax dictionary is defined in `options.latexDictionary`.
   *
   * The order of the dictionaries matter: the definitions from the later ones
   * override the definitions from earlier ones. The first dictionary should
   * be the `'core'` dictionary which include some basic definitions such
   * as domains (`Boolean`, `Number`, etc...) that are used by later dictionaries.
   *
   * @param options.numericMode The default mode is `"auto"`. Use `"machine"`
   * to perform numeric calculations using 64-bit floats. Use `"bignum"` to
   * perform calculations using arbitrary precision floating point numbers.
   * Use `"auto"` or `"complex"` to allow calculations on complex numbers.
   *
   * @param options.numericPrecision Specific how many digits of precision for the
   * numeric calculations. Default is 100.
   *
   * @param options.tolerance If the absolute value of the difference of two numbers
   * is less than `tolerance`, they are considered equal. Used by `chop()` as well.
   *
   * @param options.defaultDomain If an unknown symbol is encountered, assume it should
   * be a variable in this domain. **Default** `ExtendedRealNumber`
   */
  constructor(options) {
    /** @internal */
    this._cache = {};
    /** @internal */
    this._commonSymbols = {
      True: null,
      False: null,
      Maybe: null,
      All: null,
      Nothing: null,
      None: null,
      Undefined: null,
      Function: null,
      Pi: null,
      ImaginaryUnit: null
    };
    /** @internal */
    this._commonNumbers = {
      "-5": null,
      "-4": null,
      "-3": null,
      "-2": null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      36: null
    };
    /** @internal */
    this._commonDomains = {
      Anything: null,
      Nothing: null,
      Boolean: null,
      MaybeBoolean: null,
      String: null,
      Domain: null,
      Symbol: null,
      Integer: null,
      RationalNumber: null,
      AlgebraicNumber: null,
      RealNumber: null,
      ExtendedRealNumber: null,
      ImaginaryNumber: null,
      ComplexNumber: null,
      ExtendedComplexNumber: null,
      Number: null,
      PositiveInteger: null,
      TranscendentalNumber: null,
      PositiveNumber: null,
      Function: null,
      // (Anything^n) -> Anything
      NumericFunction: null,
      // (Number^n) -> Number
      RealFunction: null,
      // (ExtendedRealNumber^n) -> ExtendRealNumber
      TrigonometricFunction: null,
      // (ComplexNumber) -> ComplexNumber
      LogicOperator: null,
      // (Boolean, Boolean) -> Boolean
      Predicate: null,
      // (Anything^n) -> MaybeBoolean
      RelationalOperator: null
      // (Anything, Anything) -> MaybeBoolean
    };
    if (options !== void 0 && typeof options !== "object")
      throw Error("Unexpected argument");
    this.strict = true;
    this._latexDictionary = options?.latexDictionary;
    this._jsonSerializationOptions = {
      exclude: [],
      shorthands: ["function", "symbol", "string", "dictionary", "number"],
      metadata: [],
      precision: "max",
      repeatingDecimals: true
    };
    this._useRawJsonSerializationOptions = false;
    this._rawJsonSerializationOptions = {
      exclude: [],
      shorthands: ["function", "symbol", "string", "dictionary", "number"],
      metadata: [],
      precision: "max",
      repeatingDecimals: false
    };
    this._stats = {
      highwaterMark: 0,
      symbols: /* @__PURE__ */ new Set(),
      expressions: /* @__PURE__ */ new Set()
    };
    this._defaultDomain = null;
    this._numericMode = options?.numericMode ?? "auto";
    this._precision = Math.max(
      options?.numericPrecision ?? 100,
      Math.floor(MACHINE_PRECISION)
    );
    this._bignum = Decimal.clone({ precision: this._precision });
    this.tolerance = options?.tolerance ?? NUMERIC_TOLERANCE;
    this._ZERO = new BoxedNumber(this, 0);
    this._ONE = new BoxedNumber(this, 1);
    this._HALF = new BoxedNumber(this, [1, 2]);
    this._NEGATIVE_ONE = new BoxedNumber(this, -1);
    this._I = new BoxedNumber(this, import_complex19.Complex.I);
    this._NAN = new BoxedNumber(this, Number.NaN);
    this._POSITIVE_INFINITY = new BoxedNumber(this, Number.POSITIVE_INFINITY);
    this._NEGATIVE_INFINITY = new BoxedNumber(this, Number.NEGATIVE_INFINITY);
    this._COMPLEX_INFINITY = new BoxedNumber(this, import_complex19.Complex.INFINITY);
    this.reset();
    this.context = {
      assumptions: new ExpressionMap(),
      timeLimit: 2,
      // execution time limit: 2.0 seconds
      memoryLimit: 1,
      // memory limit: 1.0 megabyte
      recursionLimit: 1024,
      iterationLimit: Number.POSITIVE_INFINITY
    };
    const tables = options?.ids ?? _ComputeEngine.getStandardLibrary();
    for (const table of tables)
      setCurrentContextSymbolTable(this, table);
    for (const d of Object.keys(this._commonDomains)) {
      if (this._commonDomains[d] && !this._commonDomains[d].symbolDefinition)
        this._commonDomains[d].bind(this.context);
      else
        this._commonDomains[d] = boxDomain(this, d);
    }
    for (const sym of Object.keys(this._commonSymbols)) {
      this._commonSymbols[sym] = new BoxedSymbol(this, sym, {
        canonical: true
      });
      this._commonSymbols[sym].bind(this.context);
    }
    if (options?.defaultDomain) {
      const defaultDomain = this.domain(options.defaultDomain);
      if (defaultDomain.isValid)
        this._defaultDomain = defaultDomain;
      else
        this._defaultDomain = this.domain("ExtendedRealNumber");
    } else
      this._defaultDomain = this.domain("ExtendedRealNumber");
    this.pushScope();
  }
  /**
   * Return identifier tables suitable for the specified categories, or `"all"`
   * for all categories (`"arithmetic"`, `"algebra"`, etc...).
   *
   * An identifier table defines how the symbols and function names in a
   * MathJSON expression should be interpreted, i.e. how to evaluate and
   * manipulate them.
   *
   */
  static getStandardLibrary(categories = "all") {
    return getStandardLibrary(categories);
  }
  /** After the configuration of the engine has changed, clear the caches
   * so that new values can be recalculated.
   *
   * This needs to happen for example when the numeric precision changes.
   *
   * @internal
   */
  reset() {
    /* @__PURE__ */ console.assert(this._bignum);
    this._BIGNUM_NEGATIVE_ONE = this.bignum(-1);
    this._BIGNUM_NAN = this.bignum(NaN);
    this._BIGNUM_ZERO = this.bignum(0);
    this._BIGNUM_ONE = this.bignum(1);
    this._BIGNUM_TWO = this.bignum(2);
    this._BIGNUM_HALF = this._BIGNUM_ONE.div(this._BIGNUM_TWO);
    this._BIGNUM_PI = this._BIGNUM_NEGATIVE_ONE.acos();
    const symbols = this._stats.symbols.values();
    const expressions = this._stats.expressions.values();
    this._stats.symbols = /* @__PURE__ */ new Set();
    this._stats.expressions = /* @__PURE__ */ new Set();
    for (const s of symbols)
      s.unbind();
    for (const s of expressions)
      s.unbind();
    for (const d of Object.values(this._commonDomains))
      d?.unbind();
    for (const d of Object.values(this._commonSymbols))
      d?.unbind();
    let scope = this.context;
    while (scope) {
      if (scope.idTable)
        for (const [_k, v] of scope.idTable)
          v.reset();
      scope = scope.parentScope ?? null;
    }
    for (const k of Object.keys(this._cache))
      if (this._cache[k].value) {
        if (!this._cache[k].purge)
          delete this._cache[k];
        else
          this._cache[k].value = this._cache[k].purge(this._cache[k].value);
      }
  }
  /** @internal */
  _register(_expr) {
    this._stats.highwaterMark += 1;
  }
  /** @internal */
  _unregister(_expr) {
  }
  get stats() {
    const expressions = this._stats.expressions;
    this._stats.expressions = null;
    this._stats.expressions = expressions;
    return {
      ...this._stats
      // _dupeSymbols: topDupes,
      // _popularExpressions: top10,
    };
  }
  /** The precision, or number of significant digits, of numeric
   * calculations when the numeric mode is `"auto"` or `"bignum"`.
   *
   * To make calculations using more digits, at the cost of expanded memory
   * usage and slower computations, set the `precision` higher.
   *
   * If the numeric mode is not `"auto"` or `"bignum"`, it is set to `"auto"`.
   *
   * Trigonometric operations are accurate for precision up to 1,000.
   *
   */
  get precision() {
    if (this._numericMode === "machine" || this._numericMode === "complex")
      return Math.floor(MACHINE_PRECISION);
    return this._precision;
  }
  set precision(p) {
    if (p === "machine")
      p = Math.floor(MACHINE_PRECISION);
    const currentPrecision = this._precision;
    if (p === currentPrecision)
      return;
    if (typeof p !== "number" || p <= 0)
      throw Error('Expected "machine" or a positive number');
    this._latexSyntax?.updateOptions({
      precision: p,
      avoidExponentsInRange: [-6, p]
    });
    this._precision = Math.max(p, Math.floor(MACHINE_PRECISION));
    if (this.jsonSerializationOptions.precision > this._precision)
      this.jsonSerializationOptions = { precision: this._precision };
    if (this._numericMode !== "auto" && this._numericMode !== "bignum" && this._precision > Math.floor(MACHINE_PRECISION))
      this._numericMode = "auto";
    this._bignum = this._bignum.config({ precision: this._precision });
    this.reset();
  }
  get numericMode() {
    return this._numericMode;
  }
  set numericMode(f) {
    if (f === this._numericMode)
      return;
    if (typeof f !== "string")
      throw Error("Expected a string");
    this._numericMode = f;
    if (f === "complex" || f === "machine")
      this._precision = Math.floor(MACHINE_PRECISION);
    if (this._latexSyntax && this.latexSyntax.options.precision > this._precision)
      this.latexSyntax.updateOptions({ precision: this._precision });
    if (this.jsonSerializationOptions.precision > this._precision)
      this.jsonSerializationOptions = { precision: this._precision };
    this.reset();
  }
  /** @experimental */
  get timeLimit() {
    let scope = this.context;
    while (scope) {
      if (scope.timeLimit !== void 0)
        return scope.timeLimit;
      scope = scope.parentScope ?? null;
    }
    return 2;
  }
  /** @experimental */
  get iterationLimit() {
    let scope = this.context;
    while (scope) {
      if (scope.iterationLimit !== void 0)
        return scope.iterationLimit;
      scope = scope.parentScope ?? null;
    }
    return 1024;
  }
  /** @experimental */
  get recursionLimit() {
    let scope = this.context;
    while (scope) {
      if (scope.recursionLimit !== void 0)
        return scope.recursionLimit;
      scope = scope.parentScope ?? null;
    }
    return 1024;
  }
  /**
   * If an unknown symbol is encountered, assume it should
   * be a variable in this domain.
   *
   * If set to `null`, unknown symbols will trigger an error.
   *
   * **Default:** `"ExtendedRealNumber"`
   */
  get defaultDomain() {
    return this._defaultDomain;
  }
  set defaultDomain(domain) {
    if (domain === null)
      this._defaultDomain = null;
    else {
      const defaultDomain = this.domain(domain);
      if (!defaultDomain.isValid)
        throw Error(`Invalid domain ${domain}`);
      this._defaultDomain = defaultDomain;
    }
  }
  /**
   * Values smaller than the tolerance are considered to be zero for the
   * purpose of comparison, i.e. if `|b - a| <= tolerance`, `b` is considered
   * equal to `a`.
   */
  get tolerance() {
    return this._tolerance;
  }
  set tolerance(val) {
    if (typeof val === "number" && Number.isFinite(val))
      this._tolerance = Math.max(val, 0);
    else
      this._tolerance = NUMERIC_TOLERANCE;
    this._bignumTolerance = this.bignum(this._tolerance);
  }
  /** @internal */
  bignum(a) {
    if (typeof a === "bigint")
      return new this._bignum(a.toString());
    return new this._bignum(a);
  }
  /** @internal */
  complex(a, b) {
    return new import_complex19.Complex(a, b);
  }
  chop(n) {
    if (typeof n === "number" && Math.abs(n) <= this._tolerance)
      return 0;
    if (n instanceof Decimal && n.abs().lte(this._bignumTolerance))
      return 0;
    if (n instanceof import_complex19.Complex && Math.abs(n.re) <= this._tolerance && Math.abs(n.im) <= this._tolerance)
      return 0;
    return n;
  }
  get latexSyntax() {
    if (!this._latexSyntax)
      this._latexSyntax = new LatexSyntax({
        computeEngine: this,
        dictionary: this._latexDictionary,
        precision: this.precision,
        avoidExponentsInRange: [-6, this.precision],
        onError: (err) => {
          throw new Error(err[0].message.toString());
        }
      });
    return this._latexSyntax;
  }
  static getLatexDictionary(domain = "all") {
    return LatexSyntax.getDictionary(domain);
  }
  set costFunction(fn) {
    if (typeof fn !== "function")
      this._cost = DEFAULT_COST_FUNCTION;
    this._cost = fn;
  }
  get costFunction() {
    return this._cost ?? DEFAULT_COST_FUNCTION;
  }
  /**
   * Return a matching symbol definition, starting with the current
   * scope and going up the scope chain. Prioritize finding a match by
   * wikidata, if provided.
   */
  lookupSymbol(symbol2, wikidata, scope) {
    if (!this.strict) {
      scope ?? (scope = this.context ?? void 0);
      while (scope) {
        const def = scope.idTable?.get(symbol2);
        if (isSymbolDefinition(def))
          return def;
        scope = scope.parentScope;
      }
      return void 0;
    }
    if (typeof symbol2 !== "string")
      throw Error("Expected a string");
    if (symbol2.length === 0 || !this.context)
      return void 0;
    const rootScope = scope ?? this.context;
    if (wikidata) {
      scope = rootScope;
      while (scope) {
        if (scope.idTable)
          for (const [_, d] of scope.idTable) {
            if (isSymbolDefinition(d) && d.wikidata === wikidata)
              return d;
          }
        scope = scope.parentScope;
      }
    }
    scope = rootScope;
    while (scope) {
      const def = scope.idTable?.get(symbol2);
      if (isSymbolDefinition(def))
        return def;
      scope = scope.parentScope;
    }
    return void 0;
  }
  /**
   * Return the definition for a function matching this head.
   *
   * Start looking in the current context, than up the scope chain.
   *
   * This is a very rough lookup, since it doesn't account for the domain
   * of the argument or the codomain. However, it is useful during parsing
   * to differentiate between symbols that might represent a function application, e.g. `f` vs `x`.
   */
  lookupFunction(head2, scope) {
    if (typeof head2 !== "string")
      return void 0;
    if (!this.context)
      return void 0;
    scope ?? (scope = this.context);
    while (scope) {
      const def = scope.idTable?.get(head2);
      if (isFunctionDefinition(def))
        return def;
      scope = scope.parentScope;
    }
    return void 0;
  }
  /**
   * Add (or replace) a definition for a symbol in the current scope.
   */
  defineSymbol(name, def) {
    if (!this.context)
      throw Error("Symbol cannot be defined: no scope available");
    if (name.length === 0 || !isValidIdentifier(name))
      throw Error("Invalid identifier " + name);
    if (!this.context.idTable)
      this.context.idTable = /* @__PURE__ */ new Map();
    const boxedDef = new BoxedSymbolDefinitionImpl(this, name, def);
    if (boxedDef.name)
      this.context.idTable.set(boxedDef.name, boxedDef);
    return boxedDef;
  }
  defineFunction(name, def) {
    if (!this.context)
      throw Error("Function cannot be defined: no scope available");
    if (name.length === 0 || !isValidIdentifier(name))
      throw Error("Invalid identifier " + name);
    if (!this.context.idTable)
      this.context.idTable = /* @__PURE__ */ new Map();
    const boxedDef = makeFunctionDefinition(this, name, def);
    if (boxedDef.name)
      this.context.idTable.set(name, boxedDef);
    return boxedDef;
  }
  /**
   *
   * Create a new scope and add it to the top of the scope stack
   *
   * The `options.scope` property can be used to specify custom precision,
   * etc... for this scope
   *
   */
  pushScope(ids, scope) {
    if (this.context === null)
      throw Error("No parent scope available");
    this.context = {
      timeLimit: this.context.timeLimit,
      memoryLimit: this.context.memoryLimit,
      recursionLimit: this.context.recursionLimit,
      iterationLimit: this.context.iterationLimit,
      ...scope ?? {},
      parentScope: this.context,
      // We always copy the current assumptions in the new scope.
      // This make is much easier to deal with 'inherited' assumptions
      // (and potentially modifying them later) without having to walk back
      // into parent contexts. In other words, calling `ce.forget()` will
      // forget everything **in the current scope**. When exiting the scope,
      // the previous assumptions are restored.
      assumptions: new ExpressionMap(this.context.assumptions)
    };
    if (ids) {
      if (Array.isArray(ids))
        for (const table of ids)
          setCurrentContextSymbolTable(this, table);
      else
        setCurrentContextSymbolTable(this, ids);
    }
  }
  /** Remove the topmost scope from the scope stack.
   */
  popScope() {
    if (!this.context)
      throw Error("No scope available");
    const parentScope = this.context?.parentScope;
    this.context = parentScope ?? null;
    /* @__PURE__ */ console.assert(this.context !== null);
  }
  set(identifiers) {
    if (!this.strict) {
      for (const k of Object.keys(identifiers)) {
        if (k !== "Nothing") {
          const def = this.lookupSymbol(k);
          const idk = identifiers[k];
          if (def)
            def.value = idk ?? void 0;
          else if (idk !== void 0 && idk !== null) {
            const val = this.box(idk);
            if (val.domain.isNumeric)
              this.defineSymbol(k, { value: val, domain: "Number" });
            else
              this.defineSymbol(k, { value: val });
          }
        }
      }
      return;
    }
    for (const k of Object.keys(identifiers)) {
      if (k !== "Nothing") {
        const def = this.lookupSymbol(k);
        const idk = identifiers[k];
        if (idk === void 0 || idk === null) {
          if (def)
            def.value = void 0;
        } else {
          const val = this.box(idk);
          if (def) {
            if (def.domain && !val.domain.isCompatible(def.domain))
              throw Error(
                `Expected value with domain ${def.domain.toString()} for "${k}"`
              );
            def.value = val;
          } else {
            if (val.domain.isNumeric)
              this.defineSymbol(k, { value: val, domain: "Number" });
            else
              this.defineSymbol(k, { value: val });
          }
        }
      }
    }
  }
  let(identifiers) {
    for (const k of Object.keys(identifiers)) {
      if (k !== "Nothing") {
        const def = identifiers[k];
        if (isSymbolDefinition(def))
          this.defineSymbol(k, def);
        else if (isFunctionDefinition(def))
          this.defineFunction(k, def);
        else
          this.set({ [k]: identifiers[k] });
      }
    }
  }
  get assumptions() {
    if (!this.context)
      throw Error("No scope available");
    if (this.context.assumptions)
      return this.context.assumptions;
    this.context.assumptions = new ExpressionMap();
    return this.context.assumptions;
  }
  /**
   * Return false if the execution should stop.
   *
   * This can occur if:
   * - an error has been signaled
   * - the time limit or memory limit has been exceeded
   *
   * @internal
   */
  shouldContinueExecution() {
    return this.deadline === void 0 || this.deadline >= Date.now();
  }
  /** @internal */
  checkContinueExecution() {
    if (!this.shouldContinueExecution()) {
      throw new Error("timeout");
    }
  }
  // assert(
  //   condition: boolean,
  //   expr: BoxedExpression,
  //   msg: string,
  //   code?: SignalMessage
  // ) {
  //   if (!condition) this.signal(expr, msg, code);
  // }
  /** @internal */
  cache(cacheName, build, purge) {
    if (this._cache[cacheName] === void 0) {
      try {
        this._cache[cacheName] = { build, purge, value: build() };
      } catch (e) {
        console.error(
          `Fatal error building cache "${cacheName}":
	 ${e.toString()}`
        );
      }
    }
    return this._cache[cacheName]?.value;
  }
  box(expr, options) {
    return box(this, expr, options);
  }
  canonical(xs) {
    if (!xs.every((x) => x instanceof AbstractBoxedExpression))
      return xs.map((x) => this.box(x));
    const bxs = xs;
    return bxs.every((x) => x.isCanonical) ? bxs : bxs.map((x) => x.canonical);
  }
  fn(head2, ops2, metadata) {
    return boxFunction(this, head2, ops2, { metadata, canonical: true });
  }
  /** @internal */
  _fn(head2, ops2, metadata) {
    return new BoxedFunction(this, head2, ops2, {
      metadata,
      canonical: true,
      def: this.lookupFunction(head2, this.context)
    });
  }
  error(message, where) {
    if (where instanceof AbstractBoxedExpression) {
      where = this.rawJson(where);
    } else if (where && Array.isArray(where) && where[0] === "Latex") {
      if (where[1] === void 0 || !where[1])
        where = "";
      if (typeof where[1] === "object" && "str" in where[1] && !where[1].str)
        where = "";
    }
    if (Array.isArray(message) && message[0] === "invalid-domain") {
      return boxDomain(this, [
        "Error",
        ["ErrorCode", "'invalid-domain'", message[1]]
      ]);
    }
    const msg = typeof message === "string" ? this.string(message) : new BoxedFunction(this, "ErrorCode", [
      this.string(message[0]),
      ...message.slice(1).map((x) => this.box(x, { canonical: false }))
    ]);
    if (!where)
      return new BoxedFunction(this, "Error", [msg], { canonical: false });
    return new BoxedFunction(
      this,
      "Error",
      [msg, this.box(where, { canonical: false })],
      { canonical: false }
    );
  }
  hold(expr) {
    return this._fn("Hold", [this.box(expr, { canonical: false })]);
  }
  add(ops2, metadata) {
    const result = canonicalAdd(this, flattenOps(flattenSequence(ops2), "Add"));
    if (metadata?.latex !== void 0)
      result.latex = metadata.latex;
    if (metadata?.wikidata !== void 0)
      result.wikidata = metadata.wikidata;
    return result;
  }
  neg(expr, metadata) {
    return canonicalNegate(expr, metadata);
  }
  mul(ops2, metadata) {
    const result = canonicalMultiply(
      this,
      flattenOps(flattenSequence(ops2), " Multiply")
    );
    if (metadata?.latex !== void 0)
      result.latex = metadata.latex;
    if (metadata?.wikidata !== void 0)
      result.wikidata = metadata.wikidata;
    return result;
  }
  div(num, denom, metadata) {
    const result = canonicalDivide(this, num, denom);
    if (metadata?.latex !== void 0)
      result.latex = metadata.latex;
    if (metadata?.wikidata !== void 0)
      result.wikidata = metadata.wikidata;
    return result;
  }
  sqrt(base, metadata) {
    return canonicalPower(this, base, this._HALF, metadata);
  }
  pow(base, exponent, metadata) {
    if (exponent instanceof AbstractBoxedExpression) {
      const num = exponent.numericValue;
      if (num !== null) {
        if (typeof num === "number")
          exponent = num;
        if (isRational(num))
          exponent = num;
      }
    }
    let e = null;
    if (typeof exponent === "number")
      e = exponent;
    else if (isRational(exponent)) {
      if (isMachineRational(exponent) && exponent[1] === 1)
        e = exponent[0];
      else if (isBigRational(exponent) && exponent[1] === BigInt(1))
        e = Number(exponent[0]);
    }
    if (e === 1)
      return base;
    const r = base.numericValue;
    if (e === -1 && r !== null) {
      if (typeof r === "number" && Number.isInteger(r))
        return this.number([1, r]);
      else if (r instanceof Decimal && r.isInteger())
        return this.number([BigInt(1), bigint(r)]);
      else if (isRational(r))
        return this.number([r[1], r[0]]);
    }
    if (typeof exponent === "number" || isRational(exponent))
      exponent = this.number(exponent);
    return canonicalPower(this, base, exponent, metadata);
  }
  inv(expr, metadata) {
    if (expr.isOne)
      return this._ONE;
    if (expr.isNegativeOne)
      return this._NEGATIVE_ONE;
    if (expr.isInfinity)
      return this._ZERO;
    const n = expr.numericValue;
    if (n !== null) {
      if (isRational(n))
        return this.number(inverse(n), { metadata });
      if (typeof n === "number" && Number.isInteger(n))
        return this.number([1, n], { metadata });
      if (n instanceof Decimal && n.isInteger())
        return this.number([BigInt(1), bigint(n)], { metadata });
      return this._fn("Divide", [this._ONE, expr], metadata);
    }
    if (expr.head === "Sqrt")
      return this._fn("Sqrt", [this.inv(expr.op1)], metadata);
    if (expr.head === "Divide")
      return this._fn("Divide", [expr[1], expr[0]], metadata);
    if (expr.head === "Rational")
      return this.number([expr[1], expr[0]], { metadata });
    let e = this._NEGATIVE_ONE;
    if (expr.head === "Power") {
      if (expr.op2.isNegativeOne)
        return expr.op1;
      e = canonicalNegate(expr.op2);
      expr = expr.op1;
    }
    if (e.isNegativeOne)
      return this._fn("Divide", [this._ONE, expr], metadata);
    return this._fn("Power", [expr, e], metadata);
  }
  pair(first, second, metadata) {
    return new BoxedFunction(this, "Tuple", [first, second], {
      metadata,
      canonical: true
    });
  }
  tuple(elements, metadata) {
    return new BoxedFunction(this, "Tuple", canonical(elements), {
      metadata,
      canonical: true
    });
  }
  string(s, metadata) {
    return new BoxedString(this, s, metadata);
  }
  symbol(name, options) {
    options ?? (options = {});
    if (!("canonical" in options))
      options.canonical = true;
    name = name.normalize();
    if (name === "NaN")
      return this._NAN;
    if (name === "Infinity")
      return this._POSITIVE_INFINITY;
    if (name === "+Infinity")
      return this._POSITIVE_INFINITY;
    if (name === "-Infinity")
      return this._NEGATIVE_INFINITY;
    if (name === "Half")
      return this._HALF;
    if (this.strict && !isValidIdentifier(name)) {
      const where = options?.metadata?.latex;
      const nameStr = `'${name}'`;
      if (where)
        return this.error(
          ["invalid-symbol-name", nameStr],
          where ? ["Latex", `'${where}'`] : nameStr
        );
    }
    if (options?.metadata?.latex !== void 0 && !options.canonical)
      return new BoxedSymbol(this, name, options);
    const result = this._commonSymbols[name];
    if (result) {
      if (!options?.metadata?.wikidata || !result.wikidata || result.wikidata === options.metadata.wikidata)
        return result;
      if (options.canonical)
        return makeCanonicalSymbol(this, name);
      return new BoxedSymbol(this, name, options);
    }
    if (options.canonical)
      return makeCanonicalSymbol(this, name);
    return new BoxedSymbol(this, name, options);
  }
  domain(domain, metadata) {
    if (domain instanceof _BoxedDomain)
      return domain;
    if (domain instanceof AbstractBoxedExpression && domain.symbol)
      domain = domain.symbol;
    if (typeof domain === "string") {
      if (this._commonDomains[domain])
        return this._commonDomains[domain];
    }
    if (!isDomain(domain)) {
      return this.error(
        ["invalid-domain", { str: JSON.stringify(domain) }],
        ["Latex", { str: metadata?.latex ?? "" }]
      );
    }
    return boxDomain(this, domain, metadata);
  }
  /*
   * This function tries to avoid creating a boxed number if `num` corresponds
   * to a common value for which we have a shared instance (-1, 0, NaN, etc...)
   */
  number(value, options) {
    options ?? (options = {});
    if (!("canonical" in options))
      options.canonical = true;
    if (options.metadata === void 0) {
      if (typeof value === "bigint") {
        if (value === BigInt(1))
          return this._ONE;
        if (value === BigInt(0))
          return this._ZERO;
        if (value === BigInt(-1))
          return this._NEGATIVE_ONE;
      }
      if (typeof value === "number") {
        const n = value;
        if (n === 1)
          return this._ONE;
        if (n === 0)
          return this._ZERO;
        if (n === -1)
          return this._NEGATIVE_ONE;
        if (Number.isInteger(n) && this._commonNumbers[n] !== void 0) {
          if (this._commonNumbers[n] === null)
            this._commonNumbers[n] = boxNumber(this, value) ?? this._NAN;
          return this._commonNumbers[n];
        }
        if (Number.isNaN(n))
          return this._NAN;
        if (!Number.isFinite(n))
          return n < 0 ? this._NEGATIVE_INFINITY : this._POSITIVE_INFINITY;
      }
    }
    if (typeof value === "bigint")
      value = this.bignum(value);
    return boxNumber(this, value, options) ?? this._NAN;
  }
  rules(rules) {
    return boxRules(this, rules);
  }
  pattern(expr) {
    return new BoxedPattern(this, expr);
  }
  parse(latex, options) {
    if (typeof latex !== "string")
      return null;
    return this.box(
      this.latexSyntax.parse(latexString(latex) ?? latex),
      options
    );
  }
  serialize(x) {
    if (typeof x === "object" && "json" in x) {
      const ce = "engine" in x ? x.engine : this;
      return this.latexSyntax.serialize(
        this.rawJson(ce.box(x, { canonical: false }))
      );
    }
    return this.latexSyntax.serialize(x);
  }
  get latexOptions() {
    const latexSyntax = this.latexSyntax;
    return new Proxy(
      {
        ...this.latexSyntax.options,
        ...this.latexSyntax.serializer.options
      },
      {
        set(options, prop, value) {
          if (!(prop in options))
            return false;
          latexSyntax.updateOptions({ [prop]: value });
          return true;
        }
      }
    );
  }
  set latexOptions(opts) {
    this.latexSyntax.updateOptions(opts);
  }
  get jsonSerializationOptions() {
    if (this._useRawJsonSerializationOptions)
      return this._rawJsonSerializationOptions;
    return this._jsonSerializationOptions;
  }
  set jsonSerializationOptions(val) {
    if (val.exclude)
      this._jsonSerializationOptions.exclude = [...val.exclude];
    if (val.shorthands) {
      if (val.shorthands === "all" || val.shorthands.includes("all")) {
        this._jsonSerializationOptions.shorthands = [
          "function",
          "symbol",
          "string",
          "dictionary",
          "number"
        ];
      } else
        this._jsonSerializationOptions.shorthands = [...val.shorthands];
    }
    if (val.metadata) {
      if (val.metadata === "all" || val.metadata.includes("all")) {
        this._jsonSerializationOptions.metadata = ["latex", "wikidata"];
      } else
        this._jsonSerializationOptions.metadata = [...val.metadata];
    }
    if (typeof val.precision === "number" && val.precision > 0) {
      this._jsonSerializationOptions.precision = val.precision;
    }
    if (typeof val.repeatingDecimals === "boolean") {
      this._jsonSerializationOptions.repeatingDecimals = val.repeatingDecimals;
    }
  }
  rawJson(expr) {
    const save = this._useRawJsonSerializationOptions;
    this._useRawJsonSerializationOptions = true;
    const result = expr.json;
    this._useRawJsonSerializationOptions = save;
    return result;
  }
  /**
   * Return a list of all the assumptions that match a pattern.
   *
   * ```js
   *  ce.assume(x, 'PositiveInteger');
   *  ce.ask(['Greater', 'x', '_val'])
   *  //  -> [{'val': 0}]
   * ```
   */
  ask(pattern) {
    const pat = this.pattern(pattern);
    const result = [];
    for (const [assumption, val] of this.assumptions) {
      const m = pat.match(assumption, {
        numericTolerance: this._tolerance
      });
      if (m !== null && val === true)
        result.push(m);
    }
    return result;
  }
  // Based on contextual usage, infer domain of a symbol
  infer(symbol2, _domain) {
    if (typeof symbol2 !== "string") {
      if (!symbol2.symbol)
        return "internal-error";
      symbol2 = symbol2.symbol;
    }
    return "ok";
  }
  assume(arg1, arg2) {
    try {
      const latex = latexString(arg1);
      const predicate = latex ? this.parse(latex, { canonical: false }) : this.box(arg1, { canonical: false });
      if (!arg2)
        return assume(predicate);
      if (isDomain(arg2))
        return assume(this.box(["Element", predicate, this.domain(arg2)]));
      return assume(this.box(["Equal", predicate, arg2]));
    } catch (e) {
      console.error(e);
      return "internal-error";
    }
  }
  forget(symbol2) {
    if (!this.context)
      throw Error("No scope available");
    if (symbol2 === void 0) {
      if (this.context.idTable)
        for (const k of this.context.idTable.keys())
          this.forget(k);
      this.assumptions.clear();
      return;
    }
    if (Array.isArray(symbol2)) {
      for (const x of symbol2)
        this.forget(x);
      return;
    }
    if (typeof symbol2 === "string") {
      if (this.context.idTable) {
        const def = this.context.idTable.get(symbol2);
        if (isSymbolDefinition(def)) {
          def.value = void 0;
          if (def.domain?.isNumeric) {
            def.domain = this.defaultDomain ?? this.domain("Number");
          } else
            def.domain = void 0;
        }
      }
      for (const [assumption, _val] of this.assumptions) {
        if (assumption.symbols.includes(symbol2))
          this.assumptions.delete(assumption);
      }
    }
  }
};

// src/compute-engine.ts
var version = "0.12.3";
globalThis[Symbol.for("io.cortexjs.compute-engine")] = {
  ComputeEngine: ComputeEngine.prototype.constructor,
  version: "0.12.3"
};
export {
  ComputeEngine,
  isEnvironmentEntry,
  isFunctionEntry,
  isInfixEntry,
  isMatchfixEntry,
  isPostfixEntry,
  isPrefixEntry,
  isSymbolEntry,
  version
};
/*! Bundled license information:

complex.js/complex.js:
  (**
   * @license Complex.js v2.1.1 12/05/2020
   *
   * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **)

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
