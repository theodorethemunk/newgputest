/**
 * jquery.linky.js v0.1.8
 * https://github.com/AnSavvides/jquery.linky
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 - 2015 Andreas Savvides
 */
! function(a) {
    "use strict";

    function b(b, f) {
        var l, g = {
                twitter: {
                    baseUrl: "https://twitter.com/",
                    hashtagSearchUrl: "hashtag/"
                },
                instagram: {
                    baseUrl: "http://instagram.com/",
                    hashtagSearchUrl: "explore/tags/"
                },
                github: {
                    baseUrl: "https://github.com/",
                    hashtagSearchUrl: null
                }
            },
            h = {
                mentions: !1,
                hashtags: !1,
                urls: !0,
                linkTo: "twitter"
            },
            i = a.extend(h, f),
            j = b.html(),
            k = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
        return i.urls && (l = j.match(k), l && (j = c(l, b))), i.mentions && (j = d(j, g[i.linkTo].baseUrl)), i.hashtags && (j = e(j, g[i.linkTo])), j
    }

    function c(b, c) {
        var d = c.html();
        return a.each(b, function() {
            0 === c.find("a[href='" + this + "']").length && (d = d.replace(this, "<a href='" + this + "' target='_blank'>" + this + "</a>"))
        }), d
    }

    function d(a, b) {
        return a.replace(/(^|\s|\(|>)@(\w+(\.?\w+)?)/g, "$1<a href='" + b + "$2' target='_blank'>@$2</a>")
    }

    function e(a, b) {
        return null === b.hashtagSearchUrl ? a : a.replace(/(^|\s|\(|>)#((\w|[\u00A1-\uFFFF])+)/g, "$1<a href='" + b.baseUrl + b.hashtagSearchUrl + "$2' target='_blank'>#$2</a>")
    }
    a.fn.linky = function(c) {
        return this.each(function() {
            var d = a(this),
                e = b(d, c);
            d.html(e)
        })
    }
}(jQuery);


/**
 * jquery-confirm v3.0.1 (http://craftpip.github.io/jquery-confirm/)
 * Licensed under MIT (https://github.com/craftpip/jquery-confirm/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("jquery-confirm requires jQuery");
var jconfirm, Jconfirm;
! function(a) {
    "use strict";
    a.fn.confirm = function(b, c) {
        return "undefined" == typeof b && (b = {}), "string" == typeof b && (b = {
            content: b,
            title: !!c && c
        }), a(this).each(function() {
            var c = a(this);
            c.on("click", function(d) {
                d.preventDefault();
                var e = a.extend({}, b);
                if (c.attr("data-title") && (e.title = c.attr("data-title")), c.attr("data-content") && (e.content = c.attr("data-content")), "undefined" == typeof e.buttons && (e.buttons = {}), e.$target = c, c.attr("href") && 0 == Object.keys(e.buttons).length) {
                    var f = {};
                    f = jconfirm.defaults && jconfirm.defaults.defaultButtons ? a.extend({}, jconfirm.pluginDefaults.defaultButtons, jconfirm.defaults.defaultButtons || {}) : a.extend({}, jconfirm.pluginDefaults.defaultButtons);
                    var g = Object.keys(f)[0];
                    e.buttons = f, e.buttons[g].action = function() {
                        location.href = c.attr("href")
                    }
                }
                e.closeIcon = !1, a.confirm(e)
            })
        }), a(this)
    }, a.confirm = function(b, c) {
        if ("undefined" == typeof b && (b = {}), "string" == typeof b && (b = {
                content: b,
                title: !!c && c
            }), "object" != typeof b.buttons && (b.buttons = {}), 0 == Object.keys(b.buttons).length) {
            var d = {};
            d = jconfirm.defaults && jconfirm.defaults.defaultButtons ? a.extend({}, jconfirm.pluginDefaults.defaultButtons, jconfirm.defaults.defaultButtons || {}) : a.extend({}, jconfirm.pluginDefaults.defaultButtons), b.buttons = d
        }
        return jconfirm(b)
    }, a.alert = function(b, c) {
        if ("undefined" == typeof b && (b = {}), "string" == typeof b && (b = {
                content: b,
                title: !!c && c
            }), "object" != typeof b.buttons && (b.buttons = {}), 0 == Object.keys(b.buttons).length) {
            var d = {};
            d = jconfirm.defaults && jconfirm.defaults.defaultButtons ? a.extend({}, jconfirm.pluginDefaults.defaultButtons, jconfirm.defaults.defaultButtons || {}) : a.extend({}, jconfirm.pluginDefaults.defaultButtons);
            var e = Object.keys(d)[0];
            b.buttons[e] = d[e]
        }
        return jconfirm(b)
    }, a.dialog = function(a, b) {
        return "undefined" == typeof a && (a = {}), "string" == typeof a && (a = {
            content: a,
            title: !!b && b,
            closeIcon: function() {}
        }), a.buttons = {}, "undefined" == typeof a.closeIcon && (a.closeIcon = function() {}), a.confirmKeys = [13], jconfirm(a)
    }, jconfirm = function(b) {
        "undefined" == typeof b && (b = {}), jconfirm.defaults && a.extend(jconfirm.pluginDefaults, jconfirm.defaults), b = a.extend({}, jconfirm.pluginDefaults, b);
        var c = new Jconfirm(b);
        return jconfirm.instances.push(c), c
    }, Jconfirm = function(b) {
        a.extend(this, b), this._init()
    }, Jconfirm.prototype = {
        _init: function() {
            var b = this;
            this._lastFocused = a("body").find(":focus"), this._id = Math.round(99999 * Math.random()), setTimeout(function() {
                b.open()
            }, 0)
        },
        _buildHTML: function() {
            var b = this;
            this._parseAnimation(this.animation, "o"), this._parseAnimation(this.closeAnimation, "c"), this._parseBgDismissAnimation(this.backgroundDismissAnimation), this._parseColumnClass(this.columnClass), this._parseTheme(this.theme);
            var c = a(this.template),
                d = "";
            switch (this.type) {
                case "default":
                case "blue":
                case "green":
                case "red":
                case "orange":
                case "purple":
                case "dark":
                    d = "jconfirm-" + this.type;
                    break;
                default:
                    console.warn("Invalid dialog type: " + this.type)
            }
            c.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(d), this.typeAnimated && c.find(".jconfirm-box").addClass("jconfirm-type-animated"), this.useBootstrap ? (c.find(".jc-bs3-row").addClass(this.bootstrapClasses.row), c.find(".jconfirm-box-container").addClass(this.columnClassParsed), this.containerFluid ? c.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid) : c.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)) : c.find(".jconfirm-box").css("width", this.boxWidth), this.titleClass && c.find(".jconfirm-title-c").addClass(this.titleClass), c.addClass(this.themeParsed);
            var e = "jconfirm-box" + this._id;
            c.find(".jconfirm-box").attr("aria-labelledby", e).attr("tabindex", -1), c.find(".jconfirm-content").attr("id", e), null != this.bgOpacity && c.find(".jconfirm-bg").css("opacity", this.bgOpacity), this.rtl && c.addClass("jconfirm-rtl"), this.$el = c.appendTo(this.container), this.$jconfirmBoxContainer = this.$el.find(".jconfirm-box-container"), this.$jconfirmBox = this.$body = this.$el.find(".jconfirm-box"), this.$jconfirmBg = this.$el.find(".jconfirm-bg"), this.$title = this.$el.find(".jconfirm-title"), this.$content = this.$el.find("div.jconfirm-content"), this.$contentPane = this.$el.find(".jconfirm-content-pane"), this.$icon = this.$el.find(".jconfirm-icon-c"), this.$closeIcon = this.$el.find(".jconfirm-closeIcon"), this.$btnc = this.$el.find(".jconfirm-buttons"), this.$scrollPane = this.$el.find(".jconfirm-scrollpane"), this._contentReady = a.Deferred(), this._modalReady = a.Deferred(), this.setTitle(), this.setIcon(), this._setButtons(), this._parseContent(), this.isAjax && this.showLoading(!1), a.when(this._contentReady, this._modalReady).then(function() {
                b.isAjaxLoading ? setTimeout(function() {
                    b.isAjaxLoading = !1, b.setContent(), b.setTitle(), b.setIcon(), setTimeout(function() {
                        b.hideLoading(!1)
                    }, 100), "function" == typeof b.onContentReady && b.onContentReady()
                }, 50) : (b.setContent(), b.setTitle(), b.setIcon(), "function" == typeof b.onContentReady && b.onContentReady()), b.autoClose && b._startCountDown()
            }), b._contentHash = this._hash(b.$content.html()), b._contentHeight = this.$content.height(), this._watchContent(), this.setDialogCenter(), "none" == this.animation && (this.animationSpeed = 1, this.animationBounce = 1), this.$body.css(this._getCSS(this.animationSpeed, this.animationBounce)), this.$contentPane.css(this._getCSS(this.animationSpeed, 1)), this.$jconfirmBg.css(this._getCSS(this.animationSpeed, 1))
        },
        themeParsed: "",
        _themePrefix: "jconfirm-",
        setTheme: function(a) {
            var c = this.theme;
            this.theme = a || this.theme, this._parseTheme(this.theme), c && this.$el.removeClass(c), this.$el.addClass(this.themeParsed), this.theme = a
        },
        _parseTheme: function(b) {
            var c = this;
            b = b.split(","), a.each(b, function(d, e) {
                e.indexOf(c._themePrefix) == -1 && (b[d] = c._themePrefix + a.trim(e))
            }), this.themeParsed = b.join(" ").toLowerCase()
        },
        backgroundDismissAnimationParsed: "",
        _bgDismissPrefix: "jconfirm-hilight-",
        _parseBgDismissAnimation: function(b) {
            var c = b.split(","),
                d = this;
            a.each(c, function(b, e) {
                e.indexOf(d._bgDismissPrefix) == -1 && (c[b] = d._bgDismissPrefix + a.trim(e))
            }), this.backgroundDismissAnimationParsed = c.join(" ").toLowerCase()
        },
        animationParsed: "",
        closeAnimationParsed: "",
        _animationPrefix: "jconfirm-animation-",
        setAnimation: function(a) {
            this.animation = a || this.animation, this._parseAnimation(this.animation, "o")
        },
        _parseAnimation: function(b, c) {
            c = c || "o";
            var d = b.split(","),
                e = this;
            a.each(d, function(b, c) {
                c.indexOf(e._animationPrefix) == -1 && (d[b] = e._animationPrefix + a.trim(c))
            });
            var f = d.join(" ").toLowerCase();
            return "o" == c ? this.animationParsed = f : this.closeAnimationParsed = f, f
        },
        setCloseAnimation: function(a) {
            this.closeAnimation = a || this.closeAnimation, this._parseAnimation(this.closeAnimation, "c")
        },
        setAnimationSpeed: function(a) {
            this.animationSpeed = a || this.animationSpeed
        },
        columnClassParsed: "",
        setColumnClass: function(a) {
            this.columnClass = a || this.columnClass, this._parseColumnClass(this.columnClass), this.$jconfirmBoxContainer.addClass(this.columnClassParsed)
        },
        _parseColumnClass: function(a) {
            a = a.toLowerCase();
            var b;
            switch (a) {
                case "xl":
                case "xlarge":
                    b = "col-md-12";
                    break;
                case "l":
                case "large":
                    b = "col-md-8 col-md-offset-2";
                    break;
                case "m":
                case "medium":
                    b = "col-md-6 col-md-offset-3";
                    break;
                case "s":
                case "small":
                    b = "col-md-4 col-md-offset-4";
                    break;
                case "xs":
                case "xsmall":
                    b = "col-md-2 col-md-offset-5";
                    break;
                default:
                    b = a
            }
            this.columnClassParsed = b
        },
        _hash: function(a) {
            return btoa(encodeURIComponent(a))
        },
        _watchContent: function() {
            var a = this;
            this._timer && clearInterval(this._timer), this._timer = setInterval(function() {
                var b = a._hash(a.$content.html()),
                    c = a.$content.height();
                a._contentHash == b && a._contentHeight == c || (a._contentHash = b, a._contentHeight = c, a.setDialogCenter(), a._imagesLoaded())
            }, this.watchInterval)
        },
        _hilightAnimating: !1,
        _hiLightModal: function() {
            var a = this;
            if (!this._hilightAnimating) {
                a.$body.addClass("hilight");
                var b = 2;
                this._hilightAnimating = !0, setTimeout(function() {
                    a._hilightAnimating = !1, a.$body.removeClass("hilight")
                }, 1e3 * b)
            }
        },
        _bindEvents: function() {
            var b = this;
            this.boxClicked = !1, this.$scrollPane.click(function(a) {
                if (!b.boxClicked) {
                    var e, c = !1,
                        d = !1;
                    if (e = "function" == typeof b.backgroundDismiss ? b.backgroundDismiss() : b.backgroundDismiss, "string" == typeof e && "undefined" != typeof b.buttons[e] ? (c = e, d = !1) : d = "undefined" == typeof e || 1 == !!e, c) {
                        var f = b.buttons[c].action.apply(b);
                        d = "undefined" == typeof f || !!f
                    }
                    d ? b.close() : b._hiLightModal()
                }
                b.boxClicked = !1
            }), this.$jconfirmBox.click(function(a) {
                b.boxClicked = !0
            }), setTimeout(function() {
                a(window).on("keyup." + b._id, function(a) {
                    b.reactOnKey(a)
                })
            }, 10), a(window).on("resize." + this._id, function() {
                b.setDialogCenter(!0)
            })
        },
        _cubic_bezier: "0.36, 0.55, 0.19",
        _getCSS: function(a, b) {
            return {
                "-webkit-transition-duration": a / 1e3 + "s",
                "transition-duration": a / 1e3 + "s",
                "-webkit-transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + b + ")",
                "transition-timing-function": "cubic-bezier(" + this._cubic_bezier + ", " + b + ")"
            }
        },
        _imagesLoaded: function() {
            var b = this;
            b.imageLoadInterval && clearInterval(b.imageLoadInterval), a.each(this.$content.find("img:not(.loaded)"), function(c, d) {
                b.imageLoadInterval = setInterval(function() {
                    var c = a(d).css("height");
                    "0px" !== c && (a(d).addClass("loaded"), clearInterval(b.imageLoadInterval), b.setDialogCenter())
                }, 40)
            })
        },
        _setButtons: function() {
            var b = this,
                c = 0;
            if ("object" != typeof this.buttons && (this.buttons = {}), a.each(this.buttons, function(d, e) {
                    c += 1, "function" == typeof e && (b.buttons[d] = e = {
                        action: e
                    }), b.buttons[d].text = e.text || d, b.buttons[d].btnClass = e.btnClass || "btn-default", b.buttons[d].action = e.action || function() {}, b.buttons[d].keys = e.keys || [], a.each(b.buttons[d].keys, function(a, c) {
                        b.buttons[d].keys[a] = c.toLowerCase()
                    });
                    var f = a('<button type="button" class="btn ' + b.buttons[d].btnClass + '">' + b.buttons[d].text + "</button>").click(function(a) {
                        a.preventDefault();
                        var c = b.buttons[d].action.apply(b);
                        b.onAction(d), b._stopCountDown(), ("undefined" == typeof c || c) && b.close()
                    });
                    b.buttons[d].el = f, b.buttons[d].setText = function(a) {
                        f.html(a)
                    }, b.buttons[d].addClass = function(a) {
                        f.addClass(a)
                    }, b.buttons[d].removeClass = function(a) {
                        f.removeClass(a)
                    }, b.buttons[d].disable = function() {
                        f.prop("disabled", !0)
                    }, b.buttons[d].enable = function() {
                        f.prop("disabled", !1)
                    }, b.buttons[d].show = function() {
                        f.css("display", ""), b.setDialogCenter()
                    }, b.buttons[d].hide = function() {
                        f.css("display", "none"), b.setDialogCenter()
                    }, b["$_" + d] = b["$$" + d] = f, b.$btnc.append(f)
                }), 0 === c && this.$btnc.hide(), null === this.closeIcon && 0 === c && (this.closeIcon = !0), this.closeIcon) {
                if (this.closeIconClass) {
                    var d = '<i class="' + this.closeIconClass + '"></i>';
                    this.$closeIcon.html(d)
                }
                this.$closeIcon.click(function(a) {
                    a.preventDefault();
                    var e, c = !1,
                        d = !1;
                    if (e = "function" == typeof b.closeIcon ? b.closeIcon() : b.closeIcon, "string" == typeof e && "undefined" != typeof b.buttons[e] ? (c = e, d = !1) : d = "undefined" == typeof e || 1 == !!e, c) {
                        var f = b.buttons[c].action.apply(b);
                        d = "undefined" == typeof f || !!f
                    }
                    d && b.close()
                }), this.$closeIcon.show()
            } else this.$closeIcon.hide()
        },
        setTitle: function(a, b) {
            if (b = b || !1, "undefined" != typeof a)
                if ("string" == typeof a) this.title = a;
                else if ("function" == typeof a) {
                "function" == typeof a.promise && console.error("Promise was returned from title function, this is not supported.");
                var c = a();
                "string" == typeof c ? this.title = c : this.title = !1
            } else this.title = !1;
            this.isAjax && !b || this.$title.html(this.title || "")
        },
        setIcon: function(a, b) {
            if (b = b || !1, "undefined" != typeof a)
                if ("string" == typeof a) this.icon = a;
                else if ("function" == typeof a) {
                var c = a();
                "string" == typeof c ? this.icon = c : this.icon = !1
            } else this.icon = !1;
            this.isAjax && !b || this.$icon.html(this.icon ? '<i class="' + this.icon + '"></i>' : "")
        },
        setContentPrepend: function(a, b) {
            this.contentParsed = a + this.contentParsed, this.isAjaxLoading && !b || this.$content.prepend(a)
        },
        setContentAppend: function(a, b) {
            this.contentParsed = this.contentParsed + a, this.isAjaxLoading && !b || this.$content.append(a)
        },
        setContent: function(a, b) {
            b = b || !1;
            var c = this;
            this.contentParsed = "undefined" == typeof a ? this.contentParsed : a, this.isAjaxLoading && !b || (this.$content.html(this.contentParsed), this.setDialogCenter(), setTimeout(function() {
                c.$body.find("input[autofocus]:visible:first").focus()
            }, 100))
        },
        loadingSpinner: !1,
        showLoading: function(a) {
            this.loadingSpinner = !0, this.$jconfirmBox.addClass("loading"), a && this.$btnc.find("button").prop("disabled", !0), this.setDialogCenter()
        },
        hideLoading: function(a) {
            this.loadingSpinner = !1, this.$jconfirmBox.removeClass("loading"), a && this.$btnc.find("button").prop("disabled", !1), this.setDialogCenter()
        },
        ajaxResponse: !1,
        contentParsed: "",
        isAjax: !1,
        isAjaxLoading: !1,
        _parseContent: function() {
            var b = this,
                c = "&nbsp;";
            if ("function" == typeof this.content) {
                var d = this.content.apply(this);
                "string" == typeof d ? this.content = d : "object" == typeof d && "function" == typeof d.always ? (this.isAjax = !0, this.isAjaxLoading = !0, d.always(function(a, c, d) {
                    b.ajaxResponse = {
                        data: a,
                        status: c,
                        xhr: d
                    }, b._contentReady.resolve(a, c, d), "function" == typeof b.contentLoaded && b.contentLoaded(a, c, d)
                }), this.content = c) : this.content = c
            }
            if ("string" == typeof this.content && "url:" === this.content.substr(0, 4).toLowerCase()) {
                this.isAjax = !0, this.isAjaxLoading = !0;
                var e = this.content.substring(4, this.content.length);
                a.get(e).done(function(a) {
                    b.contentParsed = a
                }).always(function(a, c, d) {
                    b.ajaxResponse = {
                        data: a,
                        status: c,
                        xhr: d
                    }, b._contentReady.resolve(a, c, d), "function" == typeof b.contentLoaded && b.contentLoaded(a, c, d)
                })
            }
            this.content || (this.content = c), this.isAjax || (this.contentParsed = this.content, this.setContent(this.contentParsed), b._contentReady.resolve())
        },
        _stopCountDown: function() {
            clearInterval(this.autoCloseInterval), this.$cd && this.$cd.remove()
        },
        _startCountDown: function() {
            var b = this,
                c = this.autoClose.split("|");
            if (2 !== c.length) return console.error("Invalid option for autoClose. example 'close|10000'"), !1;
            var d = c[0],
                e = parseInt(c[1]);
            if ("undefined" == typeof this.buttons[d]) return console.error("Invalid button key '" + d + "' for autoClose"), !1;
            var f = e / 1e3;
            this.$cd = a('<span class="countdown"> (' + f + ")</span>").appendTo(this["$_" + d]), this.autoCloseInterval = setInterval(function() {
                b.$cd.html(" (" + (f -= 1) + ") "), 0 === f && (b["$$" + d].trigger("click"), b._stopCountDown())
            }, 1e3)
        },
        _getKey: function(a) {
            switch (a) {
                case 192:
                    return "tilde";
                case 13:
                    return "enter";
                case 16:
                    return "shift";
                case 9:
                    return "tab";
                case 20:
                    return "capslock";
                case 17:
                    return "ctrl";
                case 91:
                    return "win";
                case 18:
                    return "alt";
                case 27:
                    return "esc";
                case 32:
                    return "space"
            }
            var b = String.fromCharCode(a);
            return !!/^[A-z0-9]+$/.test(b) && b.toLowerCase()
        },
        reactOnKey: function(b) {
            var c = this,
                d = a(".jconfirm");
            if (d.eq(d.length - 1)[0] !== this.$el[0]) return !1;
            var e = b.which;
            if (this.$content.find(":input").is(":focus") && /13|32/.test(e)) return !1;
            var f = this._getKey(e);
            if ("esc" === f && this.escapeKey)
                if (this.escapeKey === !0) this.$scrollPane.trigger("click");
                else if ("string" == typeof this.escapeKey || "function" == typeof this.escapeKey) {
                var g;
                g = "function" == typeof this.escapeKey ? this.escapeKey() : this.escapeKey, g && ("undefined" == typeof this.buttons[g] ? console.warn("Invalid escapeKey, no buttons found with key " + g) : this["$_" + g].trigger("click"))
            }
            a.each(this.buttons, function(a, b) {
                b.keys.indexOf(f) != -1 && c["$_" + a].trigger("click")
            })
        },
        setDialogCenter: function() {
            var b, c, d;
            b = 0, c = 0, "none" != this.$contentPane.css("display") && (b = this.$content.outerHeight() || 0, c = this.$contentPane.height() || 0);
            var e = this.$content.children();
            if (0 != e.length) {
                var f = parseInt(e.eq(0).css("margin-top"));
                f && (b += f)
            }
            0 == c && (c = b);
            var h, g = a(window).height();
            h = this.$body.outerHeight() - c + b;
            var i = (g - h) / 2,
                j = 100;
            h > g - j ? (d = {
                "margin-top": j / 2,
                "margin-bottom": j / 2
            }, a("body").addClass("jconfirm-no-scroll-" + this._id)) : (d = {
                "margin-top": i,
                "margin-bottom": j / 2
            }, a("body").removeClass("jconfirm-no-scroll-" + this._id)), this.$contentPane.css({
                height: b
            }).scrollTop(0), this.$body.css(d)
        },
        _unwatchContent: function() {
            clearInterval(this._timer)
        },
        close: function() {
            var b = this;
            "function" == typeof this.onClose && this.onClose(), this._unwatchContent(), clearInterval(this.imageLoadInterval), a(window).unbind("resize." + this._id), a(window).unbind("keyup." + this._id), a("body").removeClass("jconfirm-no-scroll-" + this._id), this.$body.addClass(this.closeAnimationParsed), this.$jconfirmBg.addClass("jconfirm-bg-h");
            var c = "none" == this.closeAnimation ? 1 : this.animationSpeed;
            return setTimeout(function() {
                if (b.$el.remove(), b._lastFocused.length && a.contains(document, b._lastFocused[0])) {
                    var c = a(window).scrollTop(),
                        d = b._lastFocused.offset().top,
                        e = a(window).height();
                    d > c && d < c + e ? b._lastFocused.focus() : a("html, body").animate({
                        scrollTop: d - Math.round(e / 3)
                    }, b.animationSpeed, "swing", function() {
                        b._lastFocused.focus()
                    })
                }
                "function" == typeof b.onDestroy && b.onDestroy()
            }, .4 * c), !0
        },
        open: function() {
            return this._buildHTML(), this._bindEvents(), this._open(), !0
        },
        _open: function() {
            var a = this;
            "function" == typeof a.onOpenBefore && a.onOpenBefore(), this.$body.removeClass(this.animationParsed), this.$jconfirmBg.removeClass("jconfirm-bg-h"), this.$body.focus(), setTimeout(function() {
                a.$body.css(a._getCSS(a.animationSpeed, 1)), a.$body.css({
                    "transition-property": a.$body.css("transition-property") + ", margin"
                }), a._modalReady.resolve(), "function" == typeof a.onOpen && a.onOpen()
            }, this.animationSpeed)
        },
        isClosed: function() {
            return "" === this.$el.css("display")
        },
        isOpen: function() {
            return !this.isClosed()
        },
        toggle: function() {
            this.isOpen() ? this.close() : this.open()
        }
    }, jconfirm.instances = [], jconfirm.pluginDefaults = {
        template: '<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div>',
        title: "Hello",
        titleClass: "",
        type: "default",
        typeAnimated: !0,
        content: "Are you sure to continue?",
        buttons: {},
        defaultButtons: {
            ok: {
                action: function() {}
            },
            close: {
                action: function() {}
            }
        },
        contentLoaded: function() {},
        icon: "",
        bgOpacity: null,
        theme: "light",
        animation: "zoom",
        closeAnimation: "scale",
        animationSpeed: 400,
        animationBounce: 1.2,
        escapeKey: !0,
        rtl: !1,
        container: "body",
        containerFluid: !1,
        backgroundDismiss: !1,
        backgroundDismissAnimation: "shake",
        autoClose: !1,
        closeIcon: null,
        closeIconClass: !1,
        watchInterval: 100,
        columnClass: "col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",
        boxWidth: "50%",
        useBootstrap: !0,
        bootstrapClasses: {
            container: "container",
            containerFluid: "container-fluid",
            row: "row"
        },
        onContentReady: function() {},
        onOpenBefore: function() {},
        onOpen: function() {},
        onClose: function() {},
        onDestroy: function() {},
        onAction: function() {}
    }
}(jQuery);


/**
 * MomentJS v 2.17.1
 * https://github.com/moment/moment/
 */
! function(a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b()
}(this, function() {
    "use strict";

    function b() {
        return a.apply(null, arguments)
    }

    function c(b) {
        a = b
    }

    function d(a) {
        return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a)
    }

    function e(a) {
        return null != a && "[object Object]" === Object.prototype.toString.call(a)
    }

    function f(a) {
        var b;
        for (b in a) return !1;
        return !0
    }

    function g(a) {
        return "number" == typeof a || "[object Number]" === Object.prototype.toString.call(a)
    }

    function h(a) {
        return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
    }

    function i(a, b) {
        var d, c = [];
        for (d = 0; d < a.length; ++d) c.push(b(a[d], d));
        return c
    }

    function j(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function k(a, b) {
        for (var c in b) j(b, c) && (a[c] = b[c]);
        return j(b, "toString") && (a.toString = b.toString), j(b, "valueOf") && (a.valueOf = b.valueOf), a
    }

    function l(a, b, c, d) {
        return Mc(a, b, c, d, !0).utc()
    }

    function m() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null
        }
    }

    function n(a) {
        return null == a._pf && (a._pf = m()), a._pf
    }

    function q(a) {
        if (null == a._isValid) {
            var b = n(a),
                c = p.call(b.parsedDateParts, function(a) {
                    return null != a
                }),
                d = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c);
            if (a._strict && (d = d && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour), null != Object.isFrozen && Object.isFrozen(a)) return d;
            a._isValid = d
        }
        return a._isValid
    }

    function r(a) {
        var b = l(NaN);
        return null != a ? k(n(b), a) : n(b).userInvalidated = !0, b
    }

    function s(a) {
        return void 0 === a
    }

    function u(a, b) {
        var c, d, e;
        if (s(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), s(b._i) || (a._i = b._i), s(b._f) || (a._f = b._f), s(b._l) || (a._l = b._l), s(b._strict) || (a._strict = b._strict), s(b._tzm) || (a._tzm = b._tzm), s(b._isUTC) || (a._isUTC = b._isUTC), s(b._offset) || (a._offset = b._offset), s(b._pf) || (a._pf = n(b)), s(b._locale) || (a._locale = b._locale), t.length > 0)
            for (c in t) d = t[c], e = b[d], s(e) || (a[d] = e);
        return a
    }

    function w(a) {
        u(this, a), this._d = new Date(null != a._d ? a._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), v === !1 && (v = !0, b.updateOffset(this), v = !1)
    }

    function x(a) {
        return a instanceof w || null != a && null != a._isAMomentObject
    }

    function y(a) {
        return a < 0 ? Math.ceil(a) || 0 : Math.floor(a)
    }

    function z(a) {
        var b = +a,
            c = 0;
        return 0 !== b && isFinite(b) && (c = y(b)), c
    }

    function A(a, b, c) {
        var g, d = Math.min(a.length, b.length),
            e = Math.abs(a.length - b.length),
            f = 0;
        for (g = 0; g < d; g++)(c && a[g] !== b[g] || !c && z(a[g]) !== z(b[g])) && f++;
        return f + e
    }

    function B(a) {
        b.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
    }

    function C(a, c) {
        var d = !0;
        return k(function() {
            if (null != b.deprecationHandler && b.deprecationHandler(null, a), d) {
                for (var f, e = [], g = 0; g < arguments.length; g++) {
                    if (f = "", "object" == typeof arguments[g]) {
                        f += "\n[" + g + "] ";
                        for (var h in arguments[0]) f += h + ": " + arguments[0][h] + ", ";
                        f = f.slice(0, -2)
                    } else f = arguments[g];
                    e.push(f)
                }
                B(a + "\nArguments: " + Array.prototype.slice.call(e).join("") + "\n" + (new Error).stack), d = !1
            }
            return c.apply(this, arguments)
        }, c)
    }

    function E(a, c) {
        null != b.deprecationHandler && b.deprecationHandler(a, c), D[a] || (B(c), D[a] = !0)
    }

    function F(a) {
        return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a)
    }

    function G(a) {
        var b, c;
        for (c in a) b = a[c], F(b) ? this[c] = b : this["_" + c] = b;
        this._config = a, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function H(a, b) {
        var d, c = k({}, a);
        for (d in b) j(b, d) && (e(a[d]) && e(b[d]) ? (c[d] = {}, k(c[d], a[d]), k(c[d], b[d])) : null != b[d] ? c[d] = b[d] : delete c[d]);
        for (d in a) j(a, d) && !j(b, d) && e(a[d]) && (c[d] = k({}, c[d]));
        return c
    }

    function I(a) {
        null != a && this.set(a)
    }

    function M(a, b, c) {
        var d = this._calendar[a] || this._calendar.sameElse;
        return F(d) ? d.call(b, c) : d
    }

    function O(a) {
        var b = this._longDateFormat[a],
            c = this._longDateFormat[a.toUpperCase()];
        return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function(a) {
            return a.slice(1)
        }), this._longDateFormat[a])
    }

    function Q() {
        return this._invalidDate
    }

    function T(a) {
        return this._ordinal.replace("%d", a)
    }

    function V(a, b, c, d) {
        var e = this._relativeTime[c];
        return F(e) ? e(a, b, c, d) : e.replace(/%d/i, a)
    }

    function W(a, b) {
        var c = this._relativeTime[a > 0 ? "future" : "past"];
        return F(c) ? c(b) : c.replace(/%s/i, b)
    }

    function Y(a, b) {
        var c = a.toLowerCase();
        X[c] = X[c + "s"] = X[b] = a
    }

    function Z(a) {
        return "string" == typeof a ? X[a] || X[a.toLowerCase()] : void 0
    }

    function $(a) {
        var c, d, b = {};
        for (d in a) j(a, d) && (c = Z(d), c && (b[c] = a[d]));
        return b
    }

    function aa(a, b) {
        _[a] = b
    }

    function ba(a) {
        var b = [];
        for (var c in a) b.push({
            unit: c,
            priority: _[c]
        });
        return b.sort(function(a, b) {
            return a.priority - b.priority
        }), b
    }

    function ca(a, c) {
        return function(d) {
            return null != d ? (ea(this, a, d), b.updateOffset(this, c), this) : da(this, a)
        }
    }

    function da(a, b) {
        return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN
    }

    function ea(a, b, c) {
        a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
    }

    function fa(a) {
        return a = Z(a), F(this[a]) ? this[a]() : this
    }

    function ga(a, b) {
        if ("object" == typeof a) {
            a = $(a);
            for (var c = ba(a), d = 0; d < c.length; d++) this[c[d].unit](a[c[d].unit])
        } else if (a = Z(a), F(this[a])) return this[a](b);
        return this
    }

    function ha(a, b, c) {
        var d = "" + Math.abs(a),
            e = b - d.length,
            f = a >= 0;
        return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
    }

    function ma(a, b, c, d) {
        var e = d;
        "string" == typeof d && (e = function() {
            return this[d]()
        }), a && (la[a] = e), b && (la[b[0]] = function() {
            return ha(e.apply(this, arguments), b[1], b[2])
        }), c && (la[c] = function() {
            return this.localeData().ordinal(e.apply(this, arguments), a)
        })
    }

    function na(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }

    function oa(a) {
        var c, d, b = a.match(ia);
        for (c = 0, d = b.length; c < d; c++) la[b[c]] ? b[c] = la[b[c]] : b[c] = na(b[c]);
        return function(c) {
            var f, e = "";
            for (f = 0; f < d; f++) e += b[f] instanceof Function ? b[f].call(c, a) : b[f];
            return e
        }
    }

    function pa(a, b) {
        return a.isValid() ? (b = qa(b, a.localeData()), ka[b] = ka[b] || oa(b), ka[b](a)) : a.localeData().invalidDate()
    }

    function qa(a, b) {
        function d(a) {
            return b.longDateFormat(a) || a
        }
        var c = 5;
        for (ja.lastIndex = 0; c >= 0 && ja.test(a);) a = a.replace(ja, d), ja.lastIndex = 0, c -= 1;
        return a
    }

    function Ja(a, b, c) {
        Ia[a] = F(b) ? b : function(a, d) {
            return a && c ? c : b
        }
    }

    function Ka(a, b) {
        return j(Ia, a) ? Ia[a](b._strict, b._locale) : new RegExp(La(a))
    }

    function La(a) {
        return Ma(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
            return b || c || d || e
        }))
    }

    function Ma(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function Oa(a, b) {
        var c, d = b;
        for ("string" == typeof a && (a = [a]), g(b) && (d = function(a, c) {
                c[b] = z(a)
            }), c = 0; c < a.length; c++) Na[a[c]] = d
    }

    function Pa(a, b) {
        Oa(a, function(a, c, d, e) {
            d._w = d._w || {}, b(a, d._w, d, e)
        })
    }

    function Qa(a, b, c) {
        null != b && j(Na, a) && Na[a](b, c._a, c, a)
    }

    function ab(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
    }

    function db(a, b) {
        return a ? d(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || bb).test(b) ? "format" : "standalone"][a.month()] : this._months
    }

    function fb(a, b) {
        return a ? d(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[bb.test(b) ? "format" : "standalone"][a.month()] : this._monthsShort
    }

    function gb(a, b, c) {
        var d, e, f, g = a.toLocaleLowerCase();
        if (!this._monthsParse)
            for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; d < 12; ++d) f = l([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
        return c ? "MMM" === b ? (e = _a.call(this._shortMonthsParse, g), e !== -1 ? e : null) : (e = _a.call(this._longMonthsParse, g), e !== -1 ? e : null) : "MMM" === b ? (e = _a.call(this._shortMonthsParse, g), e !== -1 ? e : (e = _a.call(this._longMonthsParse, g), e !== -1 ? e : null)) : (e = _a.call(this._longMonthsParse, g), e !== -1 ? e : (e = _a.call(this._shortMonthsParse, g), e !== -1 ? e : null))
    }

    function hb(a, b, c) {
        var d, e, f;
        if (this._monthsParseExact) return gb.call(this, a, b, c);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; d < 12; d++) {
            if (e = l([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
            if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
            if (!c && this._monthsParse[d].test(a)) return d
        }
    }

    function ib(a, b) {
        var c;
        if (!a.isValid()) return a;
        if ("string" == typeof b)
            if (/^\d+$/.test(b)) b = z(b);
            else if (b = a.localeData().monthsParse(b), !g(b)) return a;
        return c = Math.min(a.date(), ab(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a
    }

    function jb(a) {
        return null != a ? (ib(this, a), b.updateOffset(this, !0), this) : da(this, "Month")
    }

    function kb() {
        return ab(this.year(), this.month())
    }

    function mb(a) {
        return this._monthsParseExact ? (j(this, "_monthsRegex") || pb.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (j(this, "_monthsShortRegex") || (this._monthsShortRegex = lb), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }

    function ob(a) {
        return this._monthsParseExact ? (j(this, "_monthsRegex") || pb.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (j(this, "_monthsRegex") || (this._monthsRegex = nb), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex)
    }

    function pb() {
        function a(a, b) {
            return b.length - a.length
        }
        var e, f, b = [],
            c = [],
            d = [];
        for (e = 0; e < 12; e++) f = l([2e3, e]), b.push(this.monthsShort(f, "")), c.push(this.months(f, "")), d.push(this.months(f, "")), d.push(this.monthsShort(f, ""));
        for (b.sort(a), c.sort(a), d.sort(a), e = 0; e < 12; e++) b[e] = Ma(b[e]), c[e] = Ma(c[e]);
        for (e = 0; e < 24; e++) d[e] = Ma(d[e]);
        this._monthsRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + b.join("|") + ")", "i")
    }

    function qb(a) {
        return rb(a) ? 366 : 365
    }

    function rb(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }

    function tb() {
        return rb(this.year())
    }

    function ub(a, b, c, d, e, f, g) {
        var h = new Date(a, b, c, d, e, f, g);
        return a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h
    }

    function vb(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b
    }

    function wb(a, b, c) {
        var d = 7 + b - c,
            e = (7 + vb(a, 0, d).getUTCDay() - b) % 7;
        return -e + d - 1
    }

    function xb(a, b, c, d, e) {
        var i, j, f = (7 + c - d) % 7,
            g = wb(a, d, e),
            h = 1 + 7 * (b - 1) + f + g;
        return h <= 0 ? (i = a - 1, j = qb(i) + h) : h > qb(a) ? (i = a + 1, j = h - qb(a)) : (i = a, j = h), {
            year: i,
            dayOfYear: j
        }
    }

    function yb(a, b, c) {
        var f, g, d = wb(a.year(), b, c),
            e = Math.floor((a.dayOfYear() - d - 1) / 7) + 1;
        return e < 1 ? (g = a.year() - 1, f = e + zb(g, b, c)) : e > zb(a.year(), b, c) ? (f = e - zb(a.year(), b, c), g = a.year() + 1) : (g = a.year(), f = e), {
            week: f,
            year: g
        }
    }

    function zb(a, b, c) {
        var d = wb(a, b, c),
            e = wb(a + 1, b, c);
        return (qb(a) - d + e) / 7
    }

    function Ab(a) {
        return yb(a, this._week.dow, this._week.doy).week
    }

    function Cb() {
        return this._week.dow
    }

    function Db() {
        return this._week.doy
    }

    function Eb(a) {
        var b = this.localeData().week(this);
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Fb(a) {
        var b = yb(this, 1, 4).week;
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Gb(a, b) {
        return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10)
    }

    function Hb(a, b) {
        return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a
    }

    function Jb(a, b) {
        return a ? d(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] : this._weekdays
    }

    function Lb(a) {
        return a ? this._weekdaysShort[a.day()] : this._weekdaysShort
    }

    function Nb(a) {
        return a ? this._weekdaysMin[a.day()] : this._weekdaysMin
    }

    function Ob(a, b, c) {
        var d, e, f, g = a.toLocaleLowerCase();
        if (!this._weekdaysParse)
            for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; d < 7; ++d) f = l([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
        return c ? "dddd" === b ? (e = _a.call(this._weekdaysParse, g), e !== -1 ? e : null) : "ddd" === b ? (e = _a.call(this._shortWeekdaysParse, g), e !== -1 ? e : null) : (e = _a.call(this._minWeekdaysParse, g), e !== -1 ? e : null) : "dddd" === b ? (e = _a.call(this._weekdaysParse, g), e !== -1 ? e : (e = _a.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = _a.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : "ddd" === b ? (e = _a.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = _a.call(this._weekdaysParse, g), e !== -1 ? e : (e = _a.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : (e = _a.call(this._minWeekdaysParse, g), e !== -1 ? e : (e = _a.call(this._weekdaysParse, g), e !== -1 ? e : (e = _a.call(this._shortWeekdaysParse, g), e !== -1 ? e : null)))
    }

    function Pb(a, b, c) {
        var d, e, f;
        if (this._weekdaysParseExact) return Ob.call(this, a, b, c);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; d < 7; d++) {
            if (e = l([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
            if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
            if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
            if (!c && this._weekdaysParse[d].test(a)) return d
        }
    }

    function Qb(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != a ? (a = Gb(a, this.localeData()), this.add(a - b, "d")) : b
    }

    function Rb(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == a ? b : this.add(a - b, "d")
    }

    function Sb(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        if (null != a) {
            var b = Hb(a, this.localeData());
            return this.day(this.day() % 7 ? b : b - 7)
        }
        return this.day() || 7
    }

    function Ub(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Zb.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (j(this, "_weekdaysRegex") || (this._weekdaysRegex = Tb), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }

    function Wb(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Zb.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (j(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Vb), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }

    function Yb(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Zb.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (j(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Xb), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }

    function Zb() {
        function a(a, b) {
            return b.length - a.length
        }
        var f, g, h, i, j, b = [],
            c = [],
            d = [],
            e = [];
        for (f = 0; f < 7; f++) g = l([2e3, 1]).day(f), h = this.weekdaysMin(g, ""), i = this.weekdaysShort(g, ""), j = this.weekdays(g, ""), b.push(h), c.push(i), d.push(j), e.push(h), e.push(i), e.push(j);
        for (b.sort(a), c.sort(a), d.sort(a), e.sort(a), f = 0; f < 7; f++) c[f] = Ma(c[f]), d[f] = Ma(d[f]), e[f] = Ma(e[f]);
        this._weekdaysRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + b.join("|") + ")", "i")
    }

    function $b() {
        return this.hours() % 12 || 12
    }

    function _b() {
        return this.hours() || 24
    }

    function ac(a, b) {
        ma(a, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), b)
        })
    }

    function bc(a, b) {
        return b._meridiemParse
    }

    function cc(a) {
        return "p" === (a + "").toLowerCase().charAt(0)
    }

    function ec(a, b, c) {
        return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
    }

    function kc(a) {
        return a ? a.toLowerCase().replace("_", "-") : a
    }

    function lc(a) {
        for (var c, d, e, f, b = 0; b < a.length;) {
            for (f = kc(a[b]).split("-"), c = f.length, d = kc(a[b + 1]), d = d ? d.split("-") : null; c > 0;) {
                if (e = mc(f.slice(0, c).join("-"))) return e;
                if (d && d.length >= c && A(f, d, !0) >= c - 1) break;
                c--
            }
            b++
        }
        return null
    }

    function mc(a) {
        var b = null;
        if (!hc[a] && "undefined" != typeof module && module && module.exports) try {
            b = jc._abbr, require("./locale/" + a), nc(b)
        } catch (a) {}
        return hc[a]
    }

    function nc(a, b) {
        var c;
        return a && (c = s(b) ? qc(a) : oc(a, b), c && (jc = c)), jc._abbr
    }

    function oc(a, b) {
        if (null !== b) {
            var c = gc;
            if (b.abbr = a, null != hc[a]) E("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = hc[a]._config;
            else if (null != b.parentLocale) {
                if (null == hc[b.parentLocale]) return ic[b.parentLocale] || (ic[b.parentLocale] = []), ic[b.parentLocale].push({
                    name: a,
                    config: b
                }), null;
                c = hc[b.parentLocale]._config
            }
            return hc[a] = new I(H(c, b)), ic[a] && ic[a].forEach(function(a) {
                oc(a.name, a.config)
            }), nc(a), hc[a]
        }
        return delete hc[a], null
    }

    function pc(a, b) {
        if (null != b) {
            var c, d = gc;
            null != hc[a] && (d = hc[a]._config), b = H(d, b), c = new I(b), c.parentLocale = hc[a], hc[a] = c, nc(a)
        } else null != hc[a] && (null != hc[a].parentLocale ? hc[a] = hc[a].parentLocale : null != hc[a] && delete hc[a]);
        return hc[a]
    }

    function qc(a) {
        var b;
        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return jc;
        if (!d(a)) {
            if (b = mc(a)) return b;
            a = [a]
        }
        return lc(a)
    }

    function rc() {
        return K(hc)
    }

    function sc(a) {
        var b, c = a._a;
        return c && n(a).overflow === -2 && (b = c[Sa] < 0 || c[Sa] > 11 ? Sa : c[Ta] < 1 || c[Ta] > ab(c[Ra], c[Sa]) ? Ta : c[Ua] < 0 || c[Ua] > 24 || 24 === c[Ua] && (0 !== c[Va] || 0 !== c[Wa] || 0 !== c[Xa]) ? Ua : c[Va] < 0 || c[Va] > 59 ? Va : c[Wa] < 0 || c[Wa] > 59 ? Wa : c[Xa] < 0 || c[Xa] > 999 ? Xa : -1, n(a)._overflowDayOfYear && (b < Ra || b > Ta) && (b = Ta), n(a)._overflowWeeks && b === -1 && (b = Ya), n(a)._overflowWeekday && b === -1 && (b = Za), n(a).overflow = b), a
    }

    function zc(a) {
        var b, c, f, g, h, i, d = a._i,
            e = tc.exec(d) || uc.exec(d);
        if (e) {
            for (n(a).iso = !0, b = 0, c = wc.length; b < c; b++)
                if (wc[b][1].exec(e[1])) {
                    g = wc[b][0], f = wc[b][2] !== !1;
                    break
                }
            if (null == g) return void(a._isValid = !1);
            if (e[3]) {
                for (b = 0, c = xc.length; b < c; b++)
                    if (xc[b][1].exec(e[3])) {
                        h = (e[2] || " ") + xc[b][0];
                        break
                    }
                if (null == h) return void(a._isValid = !1)
            }
            if (!f && null != h) return void(a._isValid = !1);
            if (e[4]) {
                if (!vc.exec(e[4])) return void(a._isValid = !1);
                i = "Z"
            }
            a._f = g + (h || "") + (i || ""), Fc(a)
        } else a._isValid = !1
    }

    function Ac(a) {
        var c = yc.exec(a._i);
        return null !== c ? void(a._d = new Date(+c[1])) : (zc(a), void(a._isValid === !1 && (delete a._isValid, b.createFromInputFallback(a))))
    }

    function Bc(a, b, c) {
        return null != a ? a : null != b ? b : c
    }

    function Cc(a) {
        var c = new Date(b.now());
        return a._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
    }

    function Dc(a) {
        var b, c, e, f, d = [];
        if (!a._d) {
            for (e = Cc(a), a._w && null == a._a[Ta] && null == a._a[Sa] && Ec(a), a._dayOfYear && (f = Bc(a._a[Ra], e[Ra]), a._dayOfYear > qb(f) && (n(a)._overflowDayOfYear = !0), c = vb(f, 0, a._dayOfYear), a._a[Sa] = c.getUTCMonth(), a._a[Ta] = c.getUTCDate()), b = 0; b < 3 && null == a._a[b]; ++b) a._a[b] = d[b] = e[b];
            for (; b < 7; b++) a._a[b] = d[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            24 === a._a[Ua] && 0 === a._a[Va] && 0 === a._a[Wa] && 0 === a._a[Xa] && (a._nextDay = !0, a._a[Ua] = 0), a._d = (a._useUTC ? vb : ub).apply(null, d), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[Ua] = 24)
        }
    }

    function Ec(a) {
        var b, c, d, e, f, g, h, i;
        if (b = a._w, null != b.GG || null != b.W || null != b.E) f = 1, g = 4, c = Bc(b.GG, a._a[Ra], yb(Nc(), 1, 4).year), d = Bc(b.W, 1), e = Bc(b.E, 1), (e < 1 || e > 7) && (i = !0);
        else {
            f = a._locale._week.dow, g = a._locale._week.doy;
            var j = yb(Nc(), f, g);
            c = Bc(b.gg, a._a[Ra], j.year), d = Bc(b.w, j.week), null != b.d ? (e = b.d, (e < 0 || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f
        }
        d < 1 || d > zb(c, f, g) ? n(a)._overflowWeeks = !0 : null != i ? n(a)._overflowWeekday = !0 : (h = xb(c, d, e, f, g), a._a[Ra] = h.year, a._dayOfYear = h.dayOfYear)
    }

    function Fc(a) {
        if (a._f === b.ISO_8601) return void zc(a);
        a._a = [], n(a).empty = !0;
        var d, e, f, g, h, c = "" + a._i,
            i = c.length,
            j = 0;
        for (f = qa(a._f, a._locale).match(ia) || [], d = 0; d < f.length; d++) g = f[d], e = (c.match(Ka(g, a)) || [])[0], e && (h = c.substr(0, c.indexOf(e)), h.length > 0 && n(a).unusedInput.push(h), c = c.slice(c.indexOf(e) + e.length), j += e.length), la[g] ? (e ? n(a).empty = !1 : n(a).unusedTokens.push(g), Qa(g, e, a)) : a._strict && !e && n(a).unusedTokens.push(g);
        n(a).charsLeftOver = i - j, c.length > 0 && n(a).unusedInput.push(c), a._a[Ua] <= 12 && n(a).bigHour === !0 && a._a[Ua] > 0 && (n(a).bigHour = void 0), n(a).parsedDateParts = a._a.slice(0), n(a).meridiem = a._meridiem, a._a[Ua] = Gc(a._locale, a._a[Ua], a._meridiem), Dc(a), sc(a)
    }

    function Gc(a, b, c) {
        var d;
        return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && b < 12 && (b += 12), d || 12 !== b || (b = 0), b) : b
    }

    function Hc(a) {
        var b, c, d, e, f;
        if (0 === a._f.length) return n(a).invalidFormat = !0, void(a._d = new Date(NaN));
        for (e = 0; e < a._f.length; e++) f = 0, b = u({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], Fc(b), q(b) && (f += n(b).charsLeftOver, f += 10 * n(b).unusedTokens.length, n(b).score = f, (null == d || f < d) && (d = f, c = b));
        k(a, c || b)
    }

    function Ic(a) {
        if (!a._d) {
            var b = $(a._i);
            a._a = i([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function(a) {
                return a && parseInt(a, 10)
            }), Dc(a)
        }
    }

    function Jc(a) {
        var b = new w(sc(Kc(a)));
        return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b
    }

    function Kc(a) {
        var b = a._i,
            c = a._f;
        return a._locale = a._locale || qc(a._l), null === b || void 0 === c && "" === b ? r({
            nullInput: !0
        }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), x(b) ? new w(sc(b)) : (h(b) ? a._d = b : d(c) ? Hc(a) : c ? Fc(a) : Lc(a), q(a) || (a._d = null), a))
    }

    function Lc(a) {
        var c = a._i;
        void 0 === c ? a._d = new Date(b.now()) : h(c) ? a._d = new Date(c.valueOf()) : "string" == typeof c ? Ac(a) : d(c) ? (a._a = i(c.slice(0), function(a) {
            return parseInt(a, 10)
        }), Dc(a)) : "object" == typeof c ? Ic(a) : g(c) ? a._d = new Date(c) : b.createFromInputFallback(a)
    }

    function Mc(a, b, c, g, h) {
        var i = {};
        return c !== !0 && c !== !1 || (g = c, c = void 0), (e(a) && f(a) || d(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = c, i._i = a, i._f = b, i._strict = g, Jc(i)
    }

    function Nc(a, b, c, d) {
        return Mc(a, b, c, d, !1)
    }

    function Qc(a, b) {
        var c, e;
        if (1 === b.length && d(b[0]) && (b = b[0]), !b.length) return Nc();
        for (c = b[0], e = 1; e < b.length; ++e) b[e].isValid() && !b[e][a](c) || (c = b[e]);
        return c
    }

    function Rc() {
        var a = [].slice.call(arguments, 0);
        return Qc("isBefore", a)
    }

    function Sc() {
        var a = [].slice.call(arguments, 0);
        return Qc("isAfter", a)
    }

    function Uc(a) {
        var b = $(a),
            c = b.year || 0,
            d = b.quarter || 0,
            e = b.month || 0,
            f = b.week || 0,
            g = b.day || 0,
            h = b.hour || 0,
            i = b.minute || 0,
            j = b.second || 0,
            k = b.millisecond || 0;
        this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = qc(), this._bubble()
    }

    function Vc(a) {
        return a instanceof Uc
    }

    function Wc(a) {
        return a < 0 ? Math.round(-1 * a) * -1 : Math.round(a)
    }

    function Xc(a, b) {
        ma(a, 0, 0, function() {
            var a = this.utcOffset(),
                c = "+";
            return a < 0 && (a = -a, c = "-"), c + ha(~~(a / 60), 2) + b + ha(~~a % 60, 2)
        })
    }

    function Zc(a, b) {
        var c = (b || "").match(a);
        if (null === c) return null;
        var d = c[c.length - 1] || [],
            e = (d + "").match(Yc) || ["-", 0, 0],
            f = +(60 * e[1]) + z(e[2]);
        return 0 === f ? 0 : "+" === e[0] ? f : -f
    }

    function $c(a, c) {
        var d, e;
        return c._isUTC ? (d = c.clone(), e = (x(a) || h(a) ? a.valueOf() : Nc(a).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), b.updateOffset(d, !1), d) : Nc(a).local()
    }

    function _c(a) {
        return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
    }

    function ad(a, c) {
        var e, d = this._offset || 0;
        if (!this.isValid()) return null != a ? this : NaN;
        if (null != a) {
            if ("string" == typeof a) {
                if (a = Zc(Fa, a), null === a) return this
            } else Math.abs(a) < 16 && (a *= 60);
            return !this._isUTC && c && (e = _c(this)), this._offset = a, this._isUTC = !0, null != e && this.add(e, "m"), d !== a && (!c || this._changeInProgress ? sd(this, nd(a - d, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, b.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? d : _c(this)
    }

    function bd(a, b) {
        return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
    }

    function cd(a) {
        return this.utcOffset(0, a)
    }

    function dd(a) {
        return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(_c(this), "m")), this
    }

    function ed() {
        if (null != this._tzm) this.utcOffset(this._tzm);
        else if ("string" == typeof this._i) {
            var a = Zc(Ea, this._i);
            null != a ? this.utcOffset(a) : this.utcOffset(0, !0)
        }
        return this
    }

    function fd(a) {
        return !!this.isValid() && (a = a ? Nc(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0)
    }

    function gd() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function hd() {
        if (!s(this._isDSTShifted)) return this._isDSTShifted;
        var a = {};
        if (u(a, this), a = Kc(a), a._a) {
            var b = a._isUTC ? l(a._a) : Nc(a._a);
            this._isDSTShifted = this.isValid() && A(a._a, b.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    }

    function id() {
        return !!this.isValid() && !this._isUTC
    }

    function jd() {
        return !!this.isValid() && this._isUTC
    }

    function kd() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset)
    }

    function nd(a, b) {
        var e, f, h, c = a,
            d = null;
        return Vc(a) ? c = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : g(a) ? (c = {}, b ? c[b] = a : c.milliseconds = a) : (d = ld.exec(a)) ? (e = "-" === d[1] ? -1 : 1, c = {
            y: 0,
            d: z(d[Ta]) * e,
            h: z(d[Ua]) * e,
            m: z(d[Va]) * e,
            s: z(d[Wa]) * e,
            ms: z(Wc(1e3 * d[Xa])) * e
        }) : (d = md.exec(a)) ? (e = "-" === d[1] ? -1 : 1, c = {
            y: od(d[2], e),
            M: od(d[3], e),
            w: od(d[4], e),
            d: od(d[5], e),
            h: od(d[6], e),
            m: od(d[7], e),
            s: od(d[8], e)
        }) : null == c ? c = {} : "object" == typeof c && ("from" in c || "to" in c) && (h = qd(Nc(c.from), Nc(c.to)), c = {}, c.ms = h.milliseconds, c.M = h.months), f = new Uc(c), Vc(a) && j(a, "_locale") && (f._locale = a._locale), f
    }

    function od(a, b) {
        var c = a && parseFloat(a.replace(",", "."));
        return (isNaN(c) ? 0 : c) * b
    }

    function pd(a, b) {
        var c = {
            milliseconds: 0,
            months: 0
        };
        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
    }

    function qd(a, b) {
        var c;
        return a.isValid() && b.isValid() ? (b = $c(b, a), a.isBefore(b) ? c = pd(a, b) : (c = pd(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
            milliseconds: 0,
            months: 0
        }
    }

    function rd(a, b) {
        return function(c, d) {
            var e, f;
            return null === d || isNaN(+d) || (E(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = nd(c, d), sd(this, e, a), this
        }
    }

    function sd(a, c, d, e) {
        var f = c._milliseconds,
            g = Wc(c._days),
            h = Wc(c._months);
        a.isValid() && (e = null == e || e, f && a._d.setTime(a._d.valueOf() + f * d), g && ea(a, "Date", da(a, "Date") + g * d), h && ib(a, da(a, "Month") + h * d), e && b.updateOffset(a, g || h))
    }

    function vd(a, b) {
        var c = a.diff(b, "days", !0);
        return c < -6 ? "sameElse" : c < -1 ? "lastWeek" : c < 0 ? "lastDay" : c < 1 ? "sameDay" : c < 2 ? "nextDay" : c < 7 ? "nextWeek" : "sameElse"
    }

    function wd(a, c) {
        var d = a || Nc(),
            e = $c(d, this).startOf("day"),
            f = b.calendarFormat(this, e) || "sameElse",
            g = c && (F(c[f]) ? c[f].call(this, d) : c[f]);
        return this.format(g || this.localeData().calendar(f, this, Nc(d)))
    }

    function xd() {
        return new w(this)
    }

    function yd(a, b) {
        var c = x(a) ? a : Nc(a);
        return !(!this.isValid() || !c.isValid()) && (b = Z(s(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf())
    }

    function zd(a, b) {
        var c = x(a) ? a : Nc(a);
        return !(!this.isValid() || !c.isValid()) && (b = Z(s(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf())
    }

    function Ad(a, b, c, d) {
        return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c))
    }

    function Bd(a, b) {
        var d, c = x(a) ? a : Nc(a);
        return !(!this.isValid() || !c.isValid()) && (b = Z(b || "millisecond"), "millisecond" === b ? this.valueOf() === c.valueOf() : (d = c.valueOf(), this.clone().startOf(b).valueOf() <= d && d <= this.clone().endOf(b).valueOf()))
    }

    function Cd(a, b) {
        return this.isSame(a, b) || this.isAfter(a, b)
    }

    function Dd(a, b) {
        return this.isSame(a, b) || this.isBefore(a, b)
    }

    function Ed(a, b, c) {
        var d, e, f, g;
        return this.isValid() ? (d = $c(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = Z(b), "year" === b || "month" === b || "quarter" === b ? (g = Fd(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : y(g)) : NaN) : NaN
    }

    function Fd(a, b) {
        var e, f, c = 12 * (b.year() - a.year()) + (b.month() - a.month()),
            d = a.clone().add(c, "months");
        return b - d < 0 ? (e = a.clone().add(c - 1, "months"), f = (b - d) / (d - e)) : (e = a.clone().add(c + 1, "months"), f = (b - d) / (e - d)), -(c + f) || 0
    }

    function Gd() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function Hd() {
        var a = this.clone().utc();
        return 0 < a.year() && a.year() <= 9999 ? F(Date.prototype.toISOString) ? this.toDate().toISOString() : pa(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : pa(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function Id() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var a = "moment",
            b = "";
        this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", b = "Z");
        var c = "[" + a + '("]',
            d = 0 < this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            e = "-MM-DD[T]HH:mm:ss.SSS",
            f = b + '[")]';
        return this.format(c + d + e + f)
    }

    function Jd(a) {
        a || (a = this.isUtc() ? b.defaultFormatUtc : b.defaultFormat);
        var c = pa(this, a);
        return this.localeData().postformat(c)
    }

    function Kd(a, b) {
        return this.isValid() && (x(a) && a.isValid() || Nc(a).isValid()) ? nd({
            to: this,
            from: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function Ld(a) {
        return this.from(Nc(), a)
    }

    function Md(a, b) {
        return this.isValid() && (x(a) && a.isValid() || Nc(a).isValid()) ? nd({
            from: this,
            to: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function Nd(a) {
        return this.to(Nc(), a)
    }

    function Od(a) {
        var b;
        return void 0 === a ? this._locale._abbr : (b = qc(a), null != b && (this._locale = b), this)
    }

    function Qd() {
        return this._locale
    }

    function Rd(a) {
        switch (a = Z(a)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function Sd(a) {
        return a = Z(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"))
    }

    function Td() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }

    function Ud() {
        return Math.floor(this.valueOf() / 1e3)
    }

    function Vd() {
        return new Date(this.valueOf())
    }

    function Wd() {
        var a = this;
        return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
    }

    function Xd() {
        var a = this;
        return {
            years: a.year(),
            months: a.month(),
            date: a.date(),
            hours: a.hours(),
            minutes: a.minutes(),
            seconds: a.seconds(),
            milliseconds: a.milliseconds()
        }
    }

    function Yd() {
        return this.isValid() ? this.toISOString() : null
    }

    function Zd() {
        return q(this)
    }

    function $d() {
        return k({}, n(this))
    }

    function _d() {
        return n(this).overflow
    }

    function ae() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }

    function be(a, b) {
        ma(0, [a, a.length], 0, b)
    }

    function ce(a) {
        return ge.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function de(a) {
        return ge.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function ee() {
        return zb(this.year(), 1, 4)
    }

    function fe() {
        var a = this.localeData()._week;
        return zb(this.year(), a.dow, a.doy)
    }

    function ge(a, b, c, d, e) {
        var f;
        return null == a ? yb(this, d, e).year : (f = zb(a, d, e), b > f && (b = f), he.call(this, a, b, c, d, e))
    }

    function he(a, b, c, d, e) {
        var f = xb(a, b, c, d, e),
            g = vb(f.year, 0, f.dayOfYear);
        return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this
    }

    function ie(a) {
        return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
    }

    function ke(a) {
        var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == a ? b : this.add(a - b, "d")
    }

    function oe(a, b) {
        b[Xa] = z(1e3 * ("0." + a))
    }

    function qe() {
        return this._isUTC ? "UTC" : ""
    }

    function re() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function te(a) {
        return Nc(1e3 * a)
    }

    function ue() {
        return Nc.apply(null, arguments).parseZone()
    }

    function ve(a) {
        return a
    }

    function xe(a, b, c, d) {
        var e = qc(),
            f = l().set(d, b);
        return e[c](f, a)
    }

    function ye(a, b, c) {
        if (g(a) && (b = a, a = void 0), a = a || "", null != b) return xe(a, b, c, "month");
        var d, e = [];
        for (d = 0; d < 12; d++) e[d] = xe(a, d, c, "month");
        return e
    }

    function ze(a, b, c, d) {
        "boolean" == typeof a ? (g(b) && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, g(b) && (c = b, b = void 0), b = b || "");
        var e = qc(),
            f = a ? e._week.dow : 0;
        if (null != c) return xe(b, (c + f) % 7, d, "day");
        var h, i = [];
        for (h = 0; h < 7; h++) i[h] = xe(b, (h + f) % 7, d, "day");
        return i
    }

    function Ae(a, b) {
        return ye(a, b, "months")
    }

    function Be(a, b) {
        return ye(a, b, "monthsShort")
    }

    function Ce(a, b, c) {
        return ze(a, b, c, "weekdays")
    }

    function De(a, b, c) {
        return ze(a, b, c, "weekdaysShort")
    }

    function Ee(a, b, c) {
        return ze(a, b, c, "weekdaysMin")
    }

    function Ge() {
        var a = this._data;
        return this._milliseconds = Fe(this._milliseconds), this._days = Fe(this._days), this._months = Fe(this._months), a.milliseconds = Fe(a.milliseconds), a.seconds = Fe(a.seconds), a.minutes = Fe(a.minutes), a.hours = Fe(a.hours), a.months = Fe(a.months), a.years = Fe(a.years), this
    }

    function He(a, b, c, d) {
        var e = nd(b, c);
        return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble()
    }

    function Ie(a, b) {
        return He(this, a, b, 1)
    }

    function Je(a, b) {
        return He(this, a, b, -1)
    }

    function Ke(a) {
        return a < 0 ? Math.floor(a) : Math.ceil(a)
    }

    function Le() {
        var e, f, g, h, i, a = this._milliseconds,
            b = this._days,
            c = this._months,
            d = this._data;
        return a >= 0 && b >= 0 && c >= 0 || a <= 0 && b <= 0 && c <= 0 || (a += 864e5 * Ke(Ne(c) + b), b = 0, c = 0), d.milliseconds = a % 1e3, e = y(a / 1e3), d.seconds = e % 60, f = y(e / 60), d.minutes = f % 60, g = y(f / 60), d.hours = g % 24, b += y(g / 24), i = y(Me(b)), c += i, b -= Ke(Ne(i)), h = y(c / 12), c %= 12, d.days = b, d.months = c, d.years = h, this
    }

    function Me(a) {
        return 4800 * a / 146097
    }

    function Ne(a) {
        return 146097 * a / 4800
    }

    function Oe(a) {
        var b, c, d = this._milliseconds;
        if (a = Z(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + Me(b), "month" === a ? c : c / 12;
        switch (b = this._days + Math.round(Ne(this._months)), a) {
            case "week":
                return b / 7 + d / 6048e5;
            case "day":
                return b + d / 864e5;
            case "hour":
                return 24 * b + d / 36e5;
            case "minute":
                return 1440 * b + d / 6e4;
            case "second":
                return 86400 * b + d / 1e3;
            case "millisecond":
                return Math.floor(864e5 * b) + d;
            default:
                throw new Error("Unknown unit " + a)
        }
    }

    function Pe() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * z(this._months / 12)
    }

    function Qe(a) {
        return function() {
            return this.as(a)
        }
    }

    function Ze(a) {
        return a = Z(a), this[a + "s"]()
    }

    function $e(a) {
        return function() {
            return this._data[a]
        }
    }

    function gf() {
        return y(this.days() / 7)
    }

    function kf(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }

    function lf(a, b, c) {
        var d = nd(a).abs(),
            e = hf(d.as("s")),
            f = hf(d.as("m")),
            g = hf(d.as("h")),
            h = hf(d.as("d")),
            i = hf(d.as("M")),
            j = hf(d.as("y")),
            k = e < jf.s && ["s", e] || f <= 1 && ["m"] || f < jf.m && ["mm", f] || g <= 1 && ["h"] || g < jf.h && ["hh", g] || h <= 1 && ["d"] || h < jf.d && ["dd", h] || i <= 1 && ["M"] || i < jf.M && ["MM", i] || j <= 1 && ["y"] || ["yy", j];
        return k[2] = b, k[3] = +a > 0, k[4] = c, kf.apply(null, k)
    }

    function mf(a) {
        return void 0 === a ? hf : "function" == typeof a && (hf = a, !0)
    }

    function nf(a, b) {
        return void 0 !== jf[a] && (void 0 === b ? jf[a] : (jf[a] = b, !0))
    }

    function of (a) {
        var b = this.localeData(),
            c = lf(this, !a, b);
        return a && (c = b.pastFuture(+this, c)), b.postformat(c)
    }

    function qf() {
        var d, e, f, a = pf(this._milliseconds) / 1e3,
            b = pf(this._days),
            c = pf(this._months);
        d = y(a / 60), e = y(d / 60), a %= 60, d %= 60, f = y(c / 12), c %= 12;
        var g = f,
            h = c,
            i = b,
            j = e,
            k = d,
            l = a,
            m = this.asSeconds();
        return m ? (m < 0 ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"
    }

    function Gf(a, b) {
        var c = a.split("_");
        return b % 10 === 1 && b % 100 !== 11 ? c[0] : b % 10 >= 2 && b % 10 <= 4 && (b % 100 < 10 || b % 100 >= 20) ? c[1] : c[2]
    }

    function Hf(a, b, c) {
        var d = {
            mm: b ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін",
            hh: b ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін",
            dd: "дзень_дні_дзён",
            MM: "месяц_месяцы_месяцаў",
            yy: "год_гады_гадоў"
        };
        return "m" === c ? b ? "хвіліна" : "хвіліну" : "h" === c ? b ? "гадзіна" : "гадзіну" : a + " " + Gf(d[c], +a)
    }

    function Mf(a, b, c) {
        var d = {
            mm: "munutenn",
            MM: "miz",
            dd: "devezh"
        };
        return a + " " + Pf(d[c], a)
    }

    function Nf(a) {
        switch (Of(a)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
                return a + " bloaz";
            default:
                return a + " vloaz"
        }
    }

    function Of(a) {
        return a > 9 ? Of(a % 10) : a
    }

    function Pf(a, b) {
        return 2 === b ? Qf(a) : a
    }

    function Qf(a) {
        var b = {
            m: "v",
            b: "v",
            d: "z"
        };
        return void 0 === b[a.charAt(0)] ? a : b[a.charAt(0)] + a.substring(1)
    }

    function Rf(a, b, c) {
        var d = a + " ";
        switch (c) {
            case "m":
                return b ? "jedna minuta" : "jedne minute";
            case "mm":
                return d += 1 === a ? "minuta" : 2 === a || 3 === a || 4 === a ? "minute" : "minuta";
            case "h":
                return b ? "jedan sat" : "jednog sata";
            case "hh":
                return d += 1 === a ? "sat" : 2 === a || 3 === a || 4 === a ? "sata" : "sati";
            case "dd":
                return d += 1 === a ? "dan" : "dana";
            case "MM":
                return d += 1 === a ? "mjesec" : 2 === a || 3 === a || 4 === a ? "mjeseca" : "mjeseci";
            case "yy":
                return d += 1 === a ? "godina" : 2 === a || 3 === a || 4 === a ? "godine" : "godina"
        }
    }

    function Uf(a) {
        return a > 1 && a < 5 && 1 !== ~~(a / 10)
    }

    function Vf(a, b, c, d) {
        var e = a + " ";
        switch (c) {
            case "s":
                return b || d ? "pár sekund" : "pár sekundami";
            case "m":
                return b ? "minuta" : d ? "minutu" : "minutou";
            case "mm":
                return b || d ? e + (Uf(a) ? "minuty" : "minut") : e + "minutami";
            case "h":
                return b ? "hodina" : d ? "hodinu" : "hodinou";
            case "hh":
                return b || d ? e + (Uf(a) ? "hodiny" : "hodin") : e + "hodinami";
            case "d":
                return b || d ? "den" : "dnem";
            case "dd":
                return b || d ? e + (Uf(a) ? "dny" : "dní") : e + "dny";
            case "M":
                return b || d ? "měsíc" : "měsícem";
            case "MM":
                return b || d ? e + (Uf(a) ? "měsíce" : "měsíců") : e + "měsíci";
            case "y":
                return b || d ? "rok" : "rokem";
            case "yy":
                return b || d ? e + (Uf(a) ? "roky" : "let") : e + "lety"
        }
    }

    function Wf(a, b, c, d) {
        var e = {
            m: ["eine Minute", "einer Minute"],
            h: ["eine Stunde", "einer Stunde"],
            d: ["ein Tag", "einem Tag"],
            dd: [a + " Tage", a + " Tagen"],
            M: ["ein Monat", "einem Monat"],
            MM: [a + " Monate", a + " Monaten"],
            y: ["ein Jahr", "einem Jahr"],
            yy: [a + " Jahre", a + " Jahren"]
        };
        return b ? e[c][0] : e[c][1]
    }

    function Xf(a, b, c, d) {
        var e = {
            m: ["eine Minute", "einer Minute"],
            h: ["eine Stunde", "einer Stunde"],
            d: ["ein Tag", "einem Tag"],
            dd: [a + " Tage", a + " Tagen"],
            M: ["ein Monat", "einem Monat"],
            MM: [a + " Monate", a + " Monaten"],
            y: ["ein Jahr", "einem Jahr"],
            yy: [a + " Jahre", a + " Jahren"]
        };
        return b ? e[c][0] : e[c][1]
    }

    function cg(a, b, c, d) {
        var e = {
            s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
            m: ["ühe minuti", "üks minut"],
            mm: [a + " minuti", a + " minutit"],
            h: ["ühe tunni", "tund aega", "üks tund"],
            hh: [a + " tunni", a + " tundi"],
            d: ["ühe päeva", "üks päev"],
            M: ["kuu aja", "kuu aega", "üks kuu"],
            MM: [a + " kuu", a + " kuud"],
            y: ["ühe aasta", "aasta", "üks aasta"],
            yy: [a + " aasta", a + " aastat"]
        };
        return b ? e[c][2] ? e[c][2] : e[c][1] : d ? e[c][0] : e[c][1]
    }

    function hg(a, b, c, d) {
        var e = "";
        switch (c) {
            case "s":
                return d ? "muutaman sekunnin" : "muutama sekunti";
            case "m":
                return d ? "minuutin" : "minuutti";
            case "mm":
                e = d ? "minuutin" : "minuuttia";
                break;
            case "h":
                return d ? "tunnin" : "tunti";
            case "hh":
                e = d ? "tunnin" : "tuntia";
                break;
            case "d":
                return d ? "päivän" : "päivä";
            case "dd":
                e = d ? "päivän" : "päivää";
                break;
            case "M":
                return d ? "kuukauden" : "kuukausi";
            case "MM":
                e = d ? "kuukauden" : "kuukautta";
                break;
            case "y":
                return d ? "vuoden" : "vuosi";
            case "yy":
                e = d ? "vuoden" : "vuotta"
        }
        return e = ig(a, d) + " " + e
    }

    function ig(a, b) {
        return a < 10 ? b ? gg[a] : fg[a] : a
    }

    function sg(a, b, c) {
        var d = a + " ";
        switch (c) {
            case "m":
                return b ? "jedna minuta" : "jedne minute";
            case "mm":
                return d += 1 === a ? "minuta" : 2 === a || 3 === a || 4 === a ? "minute" : "minuta";
            case "h":
                return b ? "jedan sat" : "jednog sata";
            case "hh":
                return d += 1 === a ? "sat" : 2 === a || 3 === a || 4 === a ? "sata" : "sati";
            case "dd":
                return d += 1 === a ? "dan" : "dana";
            case "MM":
                return d += 1 === a ? "mjesec" : 2 === a || 3 === a || 4 === a ? "mjeseca" : "mjeseci";
            case "yy":
                return d += 1 === a ? "godina" : 2 === a || 3 === a || 4 === a ? "godine" : "godina"
        }
    }

    function ug(a, b, c, d) {
        var e = a;
        switch (c) {
            case "s":
                return d || b ? "néhány másodperc" : "néhány másodperce";
            case "m":
                return "egy" + (d || b ? " perc" : " perce");
            case "mm":
                return e + (d || b ? " perc" : " perce");
            case "h":
                return "egy" + (d || b ? " óra" : " órája");
            case "hh":
                return e + (d || b ? " óra" : " órája");
            case "d":
                return "egy" + (d || b ? " nap" : " napja");
            case "dd":
                return e + (d || b ? " nap" : " napja");
            case "M":
                return "egy" + (d || b ? " hónap" : " hónapja");
            case "MM":
                return e + (d || b ? " hónap" : " hónapja");
            case "y":
                return "egy" + (d || b ? " év" : " éve");
            case "yy":
                return e + (d || b ? " év" : " éve")
        }
        return ""
    }

    function vg(a) {
        return (a ? "" : "[múlt] ") + "[" + tg[this.day()] + "] LT[-kor]"
    }

    function wg(a) {
        return a % 100 === 11 || a % 10 !== 1
    }

    function xg(a, b, c, d) {
        var e = a + " ";
        switch (c) {
            case "s":
                return b || d ? "nokkrar sekúndur" : "nokkrum sekúndum";
            case "m":
                return b ? "mínúta" : "mínútu";
            case "mm":
                return wg(a) ? e + (b || d ? "mínútur" : "mínútum") : b ? e + "mínúta" : e + "mínútu";
            case "hh":
                return wg(a) ? e + (b || d ? "klukkustundir" : "klukkustundum") : e + "klukkustund";
            case "d":
                return b ? "dagur" : d ? "dag" : "degi";
            case "dd":
                return wg(a) ? b ? e + "dagar" : e + (d ? "daga" : "dögum") : b ? e + "dagur" : e + (d ? "dag" : "degi");
            case "M":
                return b ? "mánuður" : d ? "mánuð" : "mánuði";
            case "MM":
                return wg(a) ? b ? e + "mánuðir" : e + (d ? "mánuði" : "mánuðum") : b ? e + "mánuður" : e + (d ? "mánuð" : "mánuði");
            case "y":
                return b || d ? "ár" : "ári";
            case "yy":
                return wg(a) ? e + (b || d ? "ár" : "árum") : e + (b || d ? "ár" : "ári")
        }
    }

    function Ag(a, b, c, d) {
        var e = {
            m: ["eng Minutt", "enger Minutt"],
            h: ["eng Stonn", "enger Stonn"],
            d: ["een Dag", "engem Dag"],
            M: ["ee Mount", "engem Mount"],
            y: ["ee Joer", "engem Joer"]
        };
        return b ? e[c][0] : e[c][1]
    }

    function Bg(a) {
        var b = a.substr(0, a.indexOf(" "));
        return Dg(b) ? "a " + a : "an " + a
    }

    function Cg(a) {
        var b = a.substr(0, a.indexOf(" "));
        return Dg(b) ? "viru " + a : "virun " + a
    }

    function Dg(a) {
        if (a = parseInt(a, 10), isNaN(a)) return !1;
        if (a < 0) return !0;
        if (a < 10) return 4 <= a && a <= 7;
        if (a < 100) {
            var b = a % 10,
                c = a / 10;
            return Dg(0 === b ? c : b)
        }
        if (a < 1e4) {
            for (; a >= 10;) a /= 10;
            return Dg(a)
        }
        return a /= 1e3, Dg(a)
    }

    function Fg(a, b, c, d) {
        return b ? "kelios sekundės" : d ? "kelių sekundžių" : "kelias sekundes"
    }

    function Gg(a, b, c, d) {
        return b ? Ig(c)[0] : d ? Ig(c)[1] : Ig(c)[2]
    }

    function Hg(a) {
        return a % 10 === 0 || a > 10 && a < 20
    }

    function Ig(a) {
        return Eg[a].split("_")
    }

    function Jg(a, b, c, d) {
        var e = a + " ";
        return 1 === a ? e + Gg(a, b, c[0], d) : b ? e + (Hg(a) ? Ig(c)[1] : Ig(c)[0]) : d ? e + Ig(c)[1] : e + (Hg(a) ? Ig(c)[1] : Ig(c)[2])
    }

    function Lg(a, b, c) {
        return c ? b % 10 === 1 && b % 100 !== 11 ? a[2] : a[3] : b % 10 === 1 && b % 100 !== 11 ? a[0] : a[1]
    }

    function Mg(a, b, c) {
        return a + " " + Lg(Kg[c], a, b)
    }

    function Ng(a, b, c) {
        return Lg(Kg[c], a, b)
    }

    function Og(a, b) {
        return b ? "dažas sekundes" : "dažām sekundēm"
    }

    function Sg(a, b, c, d) {
        var e = "";
        if (b) switch (c) {
            case "s":
                e = "काही सेकंद";
                break;
            case "m":
                e = "एक मिनिट";
                break;
            case "mm":
                e = "%d मिनिटे";
                break;
            case "h":
                e = "एक तास";
                break;
            case "hh":
                e = "%d तास";
                break;
            case "d":
                e = "एक दिवस";
                break;
            case "dd":
                e = "%d दिवस";
                break;
            case "M":
                e = "एक महिना";
                break;
            case "MM":
                e = "%d महिने";
                break;
            case "y":
                e = "एक वर्ष";
                break;
            case "yy":
                e = "%d वर्षे"
        } else switch (c) {
            case "s":
                e = "काही सेकंदां";
                break;
            case "m":
                e = "एका मिनिटा";
                break;
            case "mm":
                e = "%d मिनिटां";
                break;
            case "h":
                e = "एका तासा";
                break;
            case "hh":
                e = "%d तासां";
                break;
            case "d":
                e = "एका दिवसा";
                break;
            case "dd":
                e = "%d दिवसां";
                break;
            case "M":
                e = "एका महिन्या";
                break;
            case "MM":
                e = "%d महिन्यां";
                break;
            case "y":
                e = "एका वर्षा";
                break;
            case "yy":
                e = "%d वर्षां"
        }
        return e.replace(/%d/i, a)
    }

    function hh(a) {
        return a % 10 < 5 && a % 10 > 1 && ~~(a / 10) % 10 !== 1
    }

    function ih(a, b, c) {
        var d = a + " ";
        switch (c) {
            case "m":
                return b ? "minuta" : "minutę";
            case "mm":
                return d + (hh(a) ? "minuty" : "minut");
            case "h":
                return b ? "godzina" : "godzinę";
            case "hh":
                return d + (hh(a) ? "godziny" : "godzin");
            case "MM":
                return d + (hh(a) ? "miesiące" : "miesięcy");
            case "yy":
                return d + (hh(a) ? "lata" : "lat")
        }
    }

    function jh(a, b, c) {
        var d = {
                mm: "minute",
                hh: "ore",
                dd: "zile",
                MM: "luni",
                yy: "ani"
            },
            e = " ";
        return (a % 100 >= 20 || a >= 100 && a % 100 === 0) && (e = " de "), a + e + d[c]
    }

    function kh(a, b) {
        var c = a.split("_");
        return b % 10 === 1 && b % 100 !== 11 ? c[0] : b % 10 >= 2 && b % 10 <= 4 && (b % 100 < 10 || b % 100 >= 20) ? c[1] : c[2]
    }

    function lh(a, b, c) {
        var d = {
            mm: b ? "минута_минуты_минут" : "минуту_минуты_минут",
            hh: "час_часа_часов",
            dd: "день_дня_дней",
            MM: "месяц_месяца_месяцев",
            yy: "год_года_лет"
        };
        return "m" === c ? b ? "минута" : "минуту" : a + " " + kh(d[c], +a)
    }

    function ph(a) {
        return a > 1 && a < 5
    }

    function qh(a, b, c, d) {
        var e = a + " ";
        switch (c) {
            case "s":
                return b || d ? "pár sekúnd" : "pár sekundami";
            case "m":
                return b ? "minúta" : d ? "minútu" : "minútou";
            case "mm":
                return b || d ? e + (ph(a) ? "minúty" : "minút") : e + "minútami";
            case "h":
                return b ? "hodina" : d ? "hodinu" : "hodinou";
            case "hh":
                return b || d ? e + (ph(a) ? "hodiny" : "hodín") : e + "hodinami";
            case "d":
                return b || d ? "deň" : "dňom";
            case "dd":
                return b || d ? e + (ph(a) ? "dni" : "dní") : e + "dňami";
            case "M":
                return b || d ? "mesiac" : "mesiacom";
            case "MM":
                return b || d ? e + (ph(a) ? "mesiace" : "mesiacov") : e + "mesiacmi";
            case "y":
                return b || d ? "rok" : "rokom";
            case "yy":
                return b || d ? e + (ph(a) ? "roky" : "rokov") : e + "rokmi"
        }
    }

    function rh(a, b, c, d) {
        var e = a + " ";
        switch (c) {
            case "s":
                return b || d ? "nekaj sekund" : "nekaj sekundami";
            case "m":
                return b ? "ena minuta" : "eno minuto";
            case "mm":
                return e += 1 === a ? b ? "minuta" : "minuto" : 2 === a ? b || d ? "minuti" : "minutama" : a < 5 ? b || d ? "minute" : "minutami" : b || d ? "minut" : "minutami";
            case "h":
                return b ? "ena ura" : "eno uro";
            case "hh":
                return e += 1 === a ? b ? "ura" : "uro" : 2 === a ? b || d ? "uri" : "urama" : a < 5 ? b || d ? "ure" : "urami" : b || d ? "ur" : "urami";
            case "d":
                return b || d ? "en dan" : "enim dnem";
            case "dd":
                return e += 1 === a ? b || d ? "dan" : "dnem" : 2 === a ? b || d ? "dni" : "dnevoma" : b || d ? "dni" : "dnevi";
            case "M":
                return b || d ? "en mesec" : "enim mesecem";
            case "MM":
                return e += 1 === a ? b || d ? "mesec" : "mesecem" : 2 === a ? b || d ? "meseca" : "mesecema" : a < 5 ? b || d ? "mesece" : "meseci" : b || d ? "mesecev" : "meseci";
            case "y":
                return b || d ? "eno leto" : "enim letom";
            case "yy":
                return e += 1 === a ? b || d ? "leto" : "letom" : 2 === a ? b || d ? "leti" : "letoma" : a < 5 ? b || d ? "leta" : "leti" : b || d ? "let" : "leti"
        }
    }

    function xh(a) {
        var b = a;
        return b = a.indexOf("jaj") !== -1 ? b.slice(0, -3) + "leS" : a.indexOf("jar") !== -1 ? b.slice(0, -3) + "waQ" : a.indexOf("DIS") !== -1 ? b.slice(0, -3) + "nem" : b + " pIq"
    }

    function yh(a) {
        var b = a;
        return b = a.indexOf("jaj") !== -1 ? b.slice(0, -3) + "Hu’" : a.indexOf("jar") !== -1 ? b.slice(0, -3) + "wen" : a.indexOf("DIS") !== -1 ? b.slice(0, -3) + "ben" : b + " ret"
    }

    function zh(a, b, c, d) {
        var e = Ah(a);
        switch (c) {
            case "mm":
                return e + " tup";
            case "hh":
                return e + " rep";
            case "dd":
                return e + " jaj";
            case "MM":
                return e + " jar";
            case "yy":
                return e + " DIS"
        }
    }

    function Ah(a) {
        var b = Math.floor(a % 1e3 / 100),
            c = Math.floor(a % 100 / 10),
            d = a % 10,
            e = "";
        return b > 0 && (e += wh[b] + "vatlh"), c > 0 && (e += ("" !== e ? " " : "") + wh[c] + "maH"), d > 0 && (e += ("" !== e ? " " : "") + wh[d]), "" === e ? "pagh" : e
    }

    function Ch(a, b, c, d) {
        var e = {
            s: ["viensas secunds", "'iensas secunds"],
            m: ["'n míut", "'iens míut"],
            mm: [a + " míuts", "" + a + " míuts"],
            h: ["'n þora", "'iensa þora"],
            hh: [a + " þoras", "" + a + " þoras"],
            d: ["'n ziua", "'iensa ziua"],
            dd: [a + " ziuas", "" + a + " ziuas"],
            M: ["'n mes", "'iens mes"],
            MM: [a + " mesen", "" + a + " mesen"],
            y: ["'n ar", "'iens ar"],
            yy: [a + " ars", "" + a + " ars"]
        };
        return d ? e[c][0] : b ? e[c][0] : e[c][1]
    }

    function Dh(a, b) {
        var c = a.split("_");
        return b % 10 === 1 && b % 100 !== 11 ? c[0] : b % 10 >= 2 && b % 10 <= 4 && (b % 100 < 10 || b % 100 >= 20) ? c[1] : c[2]
    }

    function Eh(a, b, c) {
        var d = {
            mm: b ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
            hh: b ? "година_години_годин" : "годину_години_годин",
            dd: "день_дні_днів",
            MM: "місяць_місяці_місяців",
            yy: "рік_роки_років"
        };
        return "m" === c ? b ? "хвилина" : "хвилину" : "h" === c ? b ? "година" : "годину" : a + " " + Dh(d[c], +a)
    }

    function Fh(a, b) {
        var c = {
                nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
                accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
                genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")
            },
            d = /(\[[ВвУу]\]) ?dddd/.test(b) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(b) ? "genitive" : "nominative";
        return c[d][a.day()]
    }

    function Gh(a) {
        return function() {
            return a + "о" + (11 === this.hours() ? "б" : "") + "] LT"
        }
    }
    var a, o;
    o = Array.prototype.some ? Array.prototype.some : function(a) {
        for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++)
            if (d in b && a.call(this, b[d], d, b)) return !0;
        return !1
    };
    var p = o,
        t = b.momentProperties = [],
        v = !1,
        D = {};
    b.suppressDeprecationWarnings = !1, b.deprecationHandler = null;
    var J;
    J = Object.keys ? Object.keys : function(a) {
        var b, c = [];
        for (b in a) j(a, b) && c.push(b);
        return c
    };
    var $a, K = J,
        L = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        N = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        },
        P = "Invalid date",
        R = "%d",
        S = /\d{1,2}/,
        U = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        X = {},
        _ = {},
        ia = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        ja = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        ka = {},
        la = {},
        ra = /\d/,
        sa = /\d\d/,
        ta = /\d{3}/,
        ua = /\d{4}/,
        va = /[+-]?\d{6}/,
        wa = /\d\d?/,
        xa = /\d\d\d\d?/,
        ya = /\d\d\d\d\d\d?/,
        za = /\d{1,3}/,
        Aa = /\d{1,4}/,
        Ba = /[+-]?\d{1,6}/,
        Ca = /\d+/,
        Da = /[+-]?\d+/,
        Ea = /Z|[+-]\d\d:?\d\d/gi,
        Fa = /Z|[+-]\d\d(?::?\d\d)?/gi,
        Ga = /[+-]?\d+(\.\d{1,3})?/,
        Ha = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        Ia = {},
        Na = {},
        Ra = 0,
        Sa = 1,
        Ta = 2,
        Ua = 3,
        Va = 4,
        Wa = 5,
        Xa = 6,
        Ya = 7,
        Za = 8;
    $a = Array.prototype.indexOf ? Array.prototype.indexOf : function(a) {
        var b;
        for (b = 0; b < this.length; ++b)
            if (this[b] === a) return b;
        return -1
    };
    var _a = $a;
    ma("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), ma("MMM", 0, 0, function(a) {
        return this.localeData().monthsShort(this, a)
    }), ma("MMMM", 0, 0, function(a) {
        return this.localeData().months(this, a)
    }), Y("month", "M"), aa("month", 8), Ja("M", wa), Ja("MM", wa, sa), Ja("MMM", function(a, b) {
        return b.monthsShortRegex(a)
    }), Ja("MMMM", function(a, b) {
        return b.monthsRegex(a)
    }), Oa(["M", "MM"], function(a, b) {
        b[Sa] = z(a) - 1
    }), Oa(["MMM", "MMMM"], function(a, b, c, d) {
        var e = c._locale.monthsParse(a, d, c._strict);
        null != e ? b[Sa] = e : n(c).invalidMonth = a
    });
    var bb = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        cb = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        eb = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        lb = Ha,
        nb = Ha;
    ma("Y", 0, 0, function() {
        var a = this.year();
        return a <= 9999 ? "" + a : "+" + a
    }), ma(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), ma(0, ["YYYY", 4], 0, "year"), ma(0, ["YYYYY", 5], 0, "year"), ma(0, ["YYYYYY", 6, !0], 0, "year"), Y("year", "y"), aa("year", 1), Ja("Y", Da), Ja("YY", wa, sa), Ja("YYYY", Aa, ua), Ja("YYYYY", Ba, va), Ja("YYYYYY", Ba, va), Oa(["YYYYY", "YYYYYY"], Ra), Oa("YYYY", function(a, c) {
        c[Ra] = 2 === a.length ? b.parseTwoDigitYear(a) : z(a)
    }), Oa("YY", function(a, c) {
        c[Ra] = b.parseTwoDigitYear(a)
    }), Oa("Y", function(a, b) {
        b[Ra] = parseInt(a, 10)
    }), b.parseTwoDigitYear = function(a) {
        return z(a) + (z(a) > 68 ? 1900 : 2e3)
    };
    var sb = ca("FullYear", !0);
    ma("w", ["ww", 2], "wo", "week"), ma("W", ["WW", 2], "Wo", "isoWeek"), Y("week", "w"), Y("isoWeek", "W"), aa("week", 5), aa("isoWeek", 5), Ja("w", wa), Ja("ww", wa, sa), Ja("W", wa), Ja("WW", wa, sa), Pa(["w", "ww", "W", "WW"], function(a, b, c, d) {
        b[d.substr(0, 1)] = z(a)
    });
    var Bb = {
        dow: 0,
        doy: 6
    };
    ma("d", 0, "do", "day"), ma("dd", 0, 0, function(a) {
        return this.localeData().weekdaysMin(this, a)
    }), ma("ddd", 0, 0, function(a) {
        return this.localeData().weekdaysShort(this, a)
    }), ma("dddd", 0, 0, function(a) {
        return this.localeData().weekdays(this, a)
    }), ma("e", 0, 0, "weekday"), ma("E", 0, 0, "isoWeekday"), Y("day", "d"), Y("weekday", "e"), Y("isoWeekday", "E"), aa("day", 11), aa("weekday", 11), aa("isoWeekday", 11), Ja("d", wa), Ja("e", wa), Ja("E", wa), Ja("dd", function(a, b) {
        return b.weekdaysMinRegex(a)
    }), Ja("ddd", function(a, b) {
        return b.weekdaysShortRegex(a)
    }), Ja("dddd", function(a, b) {
        return b.weekdaysRegex(a)
    }), Pa(["dd", "ddd", "dddd"], function(a, b, c, d) {
        var e = c._locale.weekdaysParse(a, d, c._strict);
        null != e ? b.d = e : n(c).invalidWeekday = a
    }), Pa(["d", "e", "E"], function(a, b, c, d) {
        b[d] = z(a)
    });
    var Ib = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        Kb = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        Mb = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        Tb = Ha,
        Vb = Ha,
        Xb = Ha;
    ma("H", ["HH", 2], 0, "hour"), ma("h", ["hh", 2], 0, $b), ma("k", ["kk", 2], 0, _b), ma("hmm", 0, 0, function() {
        return "" + $b.apply(this) + ha(this.minutes(), 2)
    }), ma("hmmss", 0, 0, function() {
        return "" + $b.apply(this) + ha(this.minutes(), 2) + ha(this.seconds(), 2)
    }), ma("Hmm", 0, 0, function() {
        return "" + this.hours() + ha(this.minutes(), 2)
    }), ma("Hmmss", 0, 0, function() {
        return "" + this.hours() + ha(this.minutes(), 2) + ha(this.seconds(), 2)
    }), ac("a", !0), ac("A", !1), Y("hour", "h"), aa("hour", 13), Ja("a", bc), Ja("A", bc), Ja("H", wa), Ja("h", wa), Ja("HH", wa, sa), Ja("hh", wa, sa), Ja("hmm", xa), Ja("hmmss", ya), Ja("Hmm", xa), Ja("Hmmss", ya), Oa(["H", "HH"], Ua), Oa(["a", "A"], function(a, b, c) {
        c._isPm = c._locale.isPM(a), c._meridiem = a
    }), Oa(["h", "hh"], function(a, b, c) {
        b[Ua] = z(a), n(c).bigHour = !0
    }), Oa("hmm", function(a, b, c) {
        var d = a.length - 2;
        b[Ua] = z(a.substr(0, d)), b[Va] = z(a.substr(d)), n(c).bigHour = !0
    }), Oa("hmmss", function(a, b, c) {
        var d = a.length - 4,
            e = a.length - 2;
        b[Ua] = z(a.substr(0, d)), b[Va] = z(a.substr(d, 2)), b[Wa] = z(a.substr(e)), n(c).bigHour = !0
    }), Oa("Hmm", function(a, b, c) {
        var d = a.length - 2;
        b[Ua] = z(a.substr(0, d)), b[Va] = z(a.substr(d))
    }), Oa("Hmmss", function(a, b, c) {
        var d = a.length - 4,
            e = a.length - 2;
        b[Ua] = z(a.substr(0, d)), b[Va] = z(a.substr(d, 2)), b[Wa] = z(a.substr(e))
    });
    var jc, dc = /[ap]\.?m?\.?/i,
        fc = ca("Hours", !0),
        gc = {
            calendar: L,
            longDateFormat: N,
            invalidDate: P,
            ordinal: R,
            ordinalParse: S,
            relativeTime: U,
            months: cb,
            monthsShort: eb,
            week: Bb,
            weekdays: Ib,
            weekdaysMin: Mb,
            weekdaysShort: Kb,
            meridiemParse: dc
        },
        hc = {},
        ic = {},
        tc = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        uc = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        vc = /Z|[+-]\d\d(?::?\d\d)?/,
        wc = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/]
        ],
        xc = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        yc = /^\/?Date\((\-?\d+)/i;
    b.createFromInputFallback = C("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(a) {
        a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
    }), b.ISO_8601 = function() {};
    var Oc = C("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var a = Nc.apply(null, arguments);
            return this.isValid() && a.isValid() ? a < this ? this : a : r()
        }),
        Pc = C("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var a = Nc.apply(null, arguments);
            return this.isValid() && a.isValid() ? a > this ? this : a : r()
        }),
        Tc = function() {
            return Date.now ? Date.now() : +new Date
        };
    Xc("Z", ":"), Xc("ZZ", ""), Ja("Z", Fa), Ja("ZZ", Fa), Oa(["Z", "ZZ"], function(a, b, c) {
        c._useUTC = !0, c._tzm = Zc(Fa, a)
    });
    var Yc = /([\+\-]|\d\d)/gi;
    b.updateOffset = function() {};
    var ld = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        md = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
    nd.fn = Uc.prototype;
    var td = rd(1, "add"),
        ud = rd(-1, "subtract");
    b.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", b.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var Pd = C("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(a) {
        return void 0 === a ? this.localeData() : this.locale(a)
    });
    ma(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), ma(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), be("gggg", "weekYear"), be("ggggg", "weekYear"), be("GGGG", "isoWeekYear"), be("GGGGG", "isoWeekYear"), Y("weekYear", "gg"), Y("isoWeekYear", "GG"), aa("weekYear", 1), aa("isoWeekYear", 1), Ja("G", Da), Ja("g", Da), Ja("GG", wa, sa), Ja("gg", wa, sa), Ja("GGGG", Aa, ua), Ja("gggg", Aa, ua), Ja("GGGGG", Ba, va), Ja("ggggg", Ba, va), Pa(["gggg", "ggggg", "GGGG", "GGGGG"], function(a, b, c, d) {
        b[d.substr(0, 2)] = z(a)
    }), Pa(["gg", "GG"], function(a, c, d, e) {
        c[e] = b.parseTwoDigitYear(a)
    }), ma("Q", 0, "Qo", "quarter"), Y("quarter", "Q"), aa("quarter", 7), Ja("Q", ra), Oa("Q", function(a, b) {
        b[Sa] = 3 * (z(a) - 1)
    }), ma("D", ["DD", 2], "Do", "date"), Y("date", "D"), aa("date", 9), Ja("D", wa), Ja("DD", wa, sa), Ja("Do", function(a, b) {
        return a ? b._ordinalParse : b._ordinalParseLenient
    }), Oa(["D", "DD"], Ta), Oa("Do", function(a, b) {
        b[Ta] = z(a.match(wa)[0], 10)
    });
    var je = ca("Date", !0);
    ma("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), Y("dayOfYear", "DDD"), aa("dayOfYear", 4), Ja("DDD", za), Ja("DDDD", ta), Oa(["DDD", "DDDD"], function(a, b, c) {
        c._dayOfYear = z(a)
    }), ma("m", ["mm", 2], 0, "minute"), Y("minute", "m"), aa("minute", 14), Ja("m", wa), Ja("mm", wa, sa), Oa(["m", "mm"], Va);
    var le = ca("Minutes", !1);
    ma("s", ["ss", 2], 0, "second"), Y("second", "s"), aa("second", 15), Ja("s", wa), Ja("ss", wa, sa), Oa(["s", "ss"], Wa);
    var me = ca("Seconds", !1);
    ma("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }), ma(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }), ma(0, ["SSS", 3], 0, "millisecond"), ma(0, ["SSSS", 4], 0, function() {
        return 10 * this.millisecond()
    }), ma(0, ["SSSSS", 5], 0, function() {
        return 100 * this.millisecond()
    }), ma(0, ["SSSSSS", 6], 0, function() {
        return 1e3 * this.millisecond()
    }), ma(0, ["SSSSSSS", 7], 0, function() {
        return 1e4 * this.millisecond()
    }), ma(0, ["SSSSSSSS", 8], 0, function() {
        return 1e5 * this.millisecond()
    }), ma(0, ["SSSSSSSSS", 9], 0, function() {
        return 1e6 * this.millisecond()
    }), Y("millisecond", "ms"), aa("millisecond", 16), Ja("S", za, ra), Ja("SS", za, sa), Ja("SSS", za, ta);
    var ne;
    for (ne = "SSSS"; ne.length <= 9; ne += "S") Ja(ne, Ca);
    for (ne = "S"; ne.length <= 9; ne += "S") Oa(ne, oe);
    var pe = ca("Milliseconds", !1);
    ma("z", 0, 0, "zoneAbbr"), ma("zz", 0, 0, "zoneName");
    var se = w.prototype;
    se.add = td, se.calendar = wd, se.clone = xd, se.diff = Ed, se.endOf = Sd, se.format = Jd, se.from = Kd, se.fromNow = Ld, se.to = Md, se.toNow = Nd, se.get = fa, se.invalidAt = _d, se.isAfter = yd, se.isBefore = zd, se.isBetween = Ad, se.isSame = Bd, se.isSameOrAfter = Cd, se.isSameOrBefore = Dd, se.isValid = Zd, se.lang = Pd, se.locale = Od, se.localeData = Qd, se.max = Pc, se.min = Oc, se.parsingFlags = $d, se.set = ga, se.startOf = Rd, se.subtract = ud, se.toArray = Wd, se.toObject = Xd, se.toDate = Vd, se.toISOString = Hd, se.inspect = Id, se.toJSON = Yd, se.toString = Gd, se.unix = Ud, se.valueOf = Td, se.creationData = ae, se.year = sb, se.isLeapYear = tb, se.weekYear = ce, se.isoWeekYear = de, se.quarter = se.quarters = ie, se.month = jb, se.daysInMonth = kb, se.week = se.weeks = Eb, se.isoWeek = se.isoWeeks = Fb, se.weeksInYear = fe, se.isoWeeksInYear = ee, se.date = je, se.day = se.days = Qb, se.weekday = Rb, se.isoWeekday = Sb, se.dayOfYear = ke, se.hour = se.hours = fc, se.minute = se.minutes = le, se.second = se.seconds = me, se.millisecond = se.milliseconds = pe, se.utcOffset = ad, se.utc = cd, se.local = dd, se.parseZone = ed, se.hasAlignedHourOffset = fd, se.isDST = gd, se.isLocal = id, se.isUtcOffset = jd, se.isUtc = kd, se.isUTC = kd, se.zoneAbbr = qe, se.zoneName = re, se.dates = C("dates accessor is deprecated. Use date instead.", je), se.months = C("months accessor is deprecated. Use month instead", jb), se.years = C("years accessor is deprecated. Use year instead", sb), se.zone = C("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", bd), se.isDSTShifted = C("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", hd);
    var we = I.prototype;
    we.calendar = M, we.longDateFormat = O, we.invalidDate = Q, we.ordinal = T, we.preparse = ve, we.postformat = ve, we.relativeTime = V, we.pastFuture = W, we.set = G, we.months = db, we.monthsShort = fb, we.monthsParse = hb, we.monthsRegex = ob, we.monthsShortRegex = mb, we.week = Ab, we.firstDayOfYear = Db, we.firstDayOfWeek = Cb, we.weekdays = Jb, we.weekdaysMin = Nb, we.weekdaysShort = Lb, we.weekdaysParse = Pb, we.weekdaysRegex = Ub, we.weekdaysShortRegex = Wb, we.weekdaysMinRegex = Yb, we.isPM = cc, we.meridiem = ec, nc("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === z(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }), b.lang = C("moment.lang is deprecated. Use moment.locale instead.", nc), b.langData = C("moment.langData is deprecated. Use moment.localeData instead.", qc);
    var Fe = Math.abs,
        Re = Qe("ms"),
        Se = Qe("s"),
        Te = Qe("m"),
        Ue = Qe("h"),
        Ve = Qe("d"),
        We = Qe("w"),
        Xe = Qe("M"),
        Ye = Qe("y"),
        _e = $e("milliseconds"),
        af = $e("seconds"),
        bf = $e("minutes"),
        cf = $e("hours"),
        df = $e("days"),
        ef = $e("months"),
        ff = $e("years"),
        hf = Math.round,
        jf = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        pf = Math.abs,
        rf = Uc.prototype;
    rf.abs = Ge, rf.add = Ie, rf.subtract = Je, rf.as = Oe, rf.asMilliseconds = Re, rf.asSeconds = Se, rf.asMinutes = Te, rf.asHours = Ue, rf.asDays = Ve, rf.asWeeks = We, rf.asMonths = Xe, rf.asYears = Ye, rf.valueOf = Pe, rf._bubble = Le, rf.get = Ze, rf.milliseconds = _e, rf.seconds = af, rf.minutes = bf, rf.hours = cf, rf.days = df, rf.weeks = gf, rf.months = ef, rf.years = ff, rf.humanize = of , rf.toISOString = qf, rf.toString = qf, rf.toJSON = qf, rf.locale = Od, rf.localeData = Qd, rf.toIsoString = C("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", qf), rf.lang = Pd, ma("X", 0, 0, "unix"), ma("x", 0, 0, "valueOf"), Ja("x", Da), Ja("X", Ga), Oa("X", function(a, b, c) {
        c._d = new Date(1e3 * parseFloat(a, 10))
    }), Oa("x", function(a, b, c) {
        c._d = new Date(z(a))
    }), b.version = "2.17.1", c(Nc), b.fn = se, b.min = Rc, b.max = Sc, b.now = Tc, b.utc = l, b.unix = te, b.months = Ae, b.isDate = h, b.locale = nc, b.invalid = r, b.duration = nd, b.isMoment = x, b.weekdays = Ce, b.parseZone = ue, b.localeData = qc, b.isDuration = Vc, b.monthsShort = Be, b.weekdaysMin = Ee, b.defineLocale = oc, b.updateLocale = pc, b.locales = rc, b.weekdaysShort = De, b.normalizeUnits = Z, b.relativeTimeRounding = mf, b.relativeTimeThreshold = nf, b.calendarFormat = vd, b.prototype = se, b.defineLocale("af", {
        months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
        weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
        weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
        meridiemParse: /vm|nm/i,
        isPM: function(a) {
            return /^nm$/i.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 12 ? c ? "vm" : "VM" : c ? "nm" : "NM"
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Vandag om] LT",
            nextDay: "[Môre om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[Gister om] LT",
            lastWeek: "[Laas] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "oor %s",
            past: "%s gelede",
            s: "'n paar sekondes",
            m: "'n minuut",
            mm: "%d minute",
            h: "'n uur",
            hh: "%d ure",
            d: "'n dag",
            dd: "%d dae",
            M: "'n maand",
            MM: "%d maande",
            y: "'n jaar",
            yy: "%d jaar"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(a) {
            return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("ar-dz", {
        months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "أح_إث_ثلا_أر_خم_جم_سب".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: "[غدا على الساعة] LT",
            nextWeek: "dddd [على الساعة] LT",
            lastDay: "[أمس على الساعة] LT",
            lastWeek: "dddd [على الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "في %s",
            past: "منذ %s",
            s: "ثوان",
            m: "دقيقة",
            mm: "%d دقائق",
            h: "ساعة",
            hh: "%d ساعات",
            d: "يوم",
            dd: "%d أيام",
            M: "شهر",
            MM: "%d أشهر",
            y: "سنة",
            yy: "%d سنوات"
        },
        week: {
            dow: 0,
            doy: 4
        }
    });
    var sf = {
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            0: "0"
        },
        tf = function(a) {
            return 0 === a ? 0 : 1 === a ? 1 : 2 === a ? 2 : a % 100 >= 3 && a % 100 <= 10 ? 3 : a % 100 >= 11 ? 4 : 5
        },
        uf = {
            s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"],
            m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"],
            h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"],
            d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"],
            M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"],
            y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"]
        },
        vf = function(a) {
            return function(b, c, d, e) {
                var f = tf(b),
                    g = uf[a][tf(b)];
                return 2 === f && (g = g[c ? 0 : 1]), g.replace(/%d/i, b)
            }
        },
        wf = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    b.defineLocale("ar-ly", {
        months: wf,
        monthsShort: wf,
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/‏M/‏YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ص|م/,
        isPM: function(a) {
            return "م" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "ص" : "م"
        },
        calendar: {
            sameDay: "[اليوم عند الساعة] LT",
            nextDay: "[غدًا عند الساعة] LT",
            nextWeek: "dddd [عند الساعة] LT",
            lastDay: "[أمس عند الساعة] LT",
            lastWeek: "dddd [عند الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "بعد %s",
            past: "منذ %s",
            s: vf("s"),
            m: vf("m"),
            mm: vf("m"),
            h: vf("h"),
            hh: vf("h"),
            d: vf("d"),
            dd: vf("d"),
            M: vf("M"),
            MM: vf("M"),
            y: vf("y"),
            yy: vf("y")
        },
        preparse: function(a) {
            return a.replace(/\u200f/g, "").replace(/،/g, ",")
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return sf[a]
            }).replace(/,/g, "،")
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), b.defineLocale("ar-ma", {
        months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        weekdays: "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: "[غدا على الساعة] LT",
            nextWeek: "dddd [على الساعة] LT",
            lastDay: "[أمس على الساعة] LT",
            lastWeek: "dddd [على الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "في %s",
            past: "منذ %s",
            s: "ثوان",
            m: "دقيقة",
            mm: "%d دقائق",
            h: "ساعة",
            hh: "%d ساعات",
            d: "يوم",
            dd: "%d أيام",
            M: "شهر",
            MM: "%d أشهر",
            y: "سنة",
            yy: "%d سنوات"
        },
        week: {
            dow: 6,
            doy: 12
        }
    });
    var xf = {
            1: "١",
            2: "٢",
            3: "٣",
            4: "٤",
            5: "٥",
            6: "٦",
            7: "٧",
            8: "٨",
            9: "٩",
            0: "٠"
        },
        yf = {
            "١": "1",
            "٢": "2",
            "٣": "3",
            "٤": "4",
            "٥": "5",
            "٦": "6",
            "٧": "7",
            "٨": "8",
            "٩": "9",
            "٠": "0"
        };
    b.defineLocale("ar-sa", {
        months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ص|م/,
        isPM: function(a) {
            return "م" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "ص" : "م"
        },
        calendar: {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: "[غدا على الساعة] LT",
            nextWeek: "dddd [على الساعة] LT",
            lastDay: "[أمس على الساعة] LT",
            lastWeek: "dddd [على الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "في %s",
            past: "منذ %s",
            s: "ثوان",
            m: "دقيقة",
            mm: "%d دقائق",
            h: "ساعة",
            hh: "%d ساعات",
            d: "يوم",
            dd: "%d أيام",
            M: "شهر",
            MM: "%d أشهر",
            y: "سنة",
            yy: "%d سنوات"
        },
        preparse: function(a) {
            return a.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(a) {
                return yf[a]
            }).replace(/،/g, ",")
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return xf[a]
            }).replace(/,/g, "،")
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), b.defineLocale("ar-tn", {
        months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[اليوم على الساعة] LT",
            nextDay: "[غدا على الساعة] LT",
            nextWeek: "dddd [على الساعة] LT",
            lastDay: "[أمس على الساعة] LT",
            lastWeek: "dddd [على الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "في %s",
            past: "منذ %s",
            s: "ثوان",
            m: "دقيقة",
            mm: "%d دقائق",
            h: "ساعة",
            hh: "%d ساعات",
            d: "يوم",
            dd: "%d أيام",
            M: "شهر",
            MM: "%d أشهر",
            y: "سنة",
            yy: "%d سنوات"
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var zf = {
            1: "١",
            2: "٢",
            3: "٣",
            4: "٤",
            5: "٥",
            6: "٦",
            7: "٧",
            8: "٨",
            9: "٩",
            0: "٠"
        },
        Af = {
            "١": "1",
            "٢": "2",
            "٣": "3",
            "٤": "4",
            "٥": "5",
            "٦": "6",
            "٧": "7",
            "٨": "8",
            "٩": "9",
            "٠": "0"
        },
        Bf = function(a) {
            return 0 === a ? 0 : 1 === a ? 1 : 2 === a ? 2 : a % 100 >= 3 && a % 100 <= 10 ? 3 : a % 100 >= 11 ? 4 : 5
        },
        Cf = {
            s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"],
            m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"],
            h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"],
            d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"],
            M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"],
            y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"]
        },
        Df = function(a) {
            return function(b, c, d, e) {
                var f = Bf(b),
                    g = Cf[a][Bf(b)];
                return 2 === f && (g = g[c ? 0 : 1]), g.replace(/%d/i, b)
            }
        },
        Ef = ["كانون الثاني يناير", "شباط فبراير", "آذار مارس", "نيسان أبريل", "أيار مايو", "حزيران يونيو", "تموز يوليو", "آب أغسطس", "أيلول سبتمبر", "تشرين الأول أكتوبر", "تشرين الثاني نوفمبر", "كانون الأول ديسمبر"];
    b.defineLocale("ar", {
        months: Ef,
        monthsShort: Ef,
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/‏M/‏YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ص|م/,
        isPM: function(a) {
            return "م" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "ص" : "م"
        },
        calendar: {
            sameDay: "[اليوم عند الساعة] LT",
            nextDay: "[غدًا عند الساعة] LT",
            nextWeek: "dddd [عند الساعة] LT",
            lastDay: "[أمس عند الساعة] LT",
            lastWeek: "dddd [عند الساعة] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "بعد %s",
            past: "منذ %s",
            s: Df("s"),
            m: Df("m"),
            mm: Df("m"),
            h: Df("h"),
            hh: Df("h"),
            d: Df("d"),
            dd: Df("d"),
            M: Df("M"),
            MM: Df("M"),
            y: Df("y"),
            yy: Df("y")
        },
        preparse: function(a) {
            return a.replace(/\u200f/g, "").replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(a) {
                return Af[a]
            }).replace(/،/g, ",")
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return zf[a]
            }).replace(/,/g, "،")
        },
        week: {
            dow: 6,
            doy: 12
        }
    });
    var Ff = {
        1: "-inci",
        5: "-inci",
        8: "-inci",
        70: "-inci",
        80: "-inci",
        2: "-nci",
        7: "-nci",
        20: "-nci",
        50: "-nci",
        3: "-üncü",
        4: "-üncü",
        100: "-üncü",
        6: "-ncı",
        9: "-uncu",
        10: "-uncu",
        30: "-uncu",
        60: "-ıncı",
        90: "-ıncı"
    };
    b.defineLocale("az", {
        months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
        monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
        weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
        weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
        weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[bugün saat] LT",
            nextDay: "[sabah saat] LT",
            nextWeek: "[gələn həftə] dddd [saat] LT",
            lastDay: "[dünən] LT",
            lastWeek: "[keçən həftə] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s əvvəl",
            s: "birneçə saniyyə",
            m: "bir dəqiqə",
            mm: "%d dəqiqə",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gün",
            dd: "%d gün",
            M: "bir ay",
            MM: "%d ay",
            y: "bir il",
            yy: "%d il"
        },
        meridiemParse: /gecə|səhər|gündüz|axşam/,
        isPM: function(a) {
            return /^(gündüz|axşam)$/.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "gecə" : a < 12 ? "səhər" : a < 17 ? "gündüz" : "axşam"
        },
        ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
        ordinal: function(a) {
            if (0 === a) return a + "-ıncı";
            var b = a % 10,
                c = a % 100 - b,
                d = a >= 100 ? 100 : null;
            return a + (Ff[b] || Ff[c] || Ff[d])
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("be", {
        months: {
            format: "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),
            standalone: "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")
        },
        monthsShort: "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),
        weekdays: {
            format: "нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),
            standalone: "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),
            isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
        },
        weekdaysShort: "нд_пн_ат_ср_чц_пт_сб".split("_"),
        weekdaysMin: "нд_пн_ат_ср_чц_пт_сб".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY г.",
            LLL: "D MMMM YYYY г., HH:mm",
            LLLL: "dddd, D MMMM YYYY г., HH:mm"
        },
        calendar: {
            sameDay: "[Сёння ў] LT",
            nextDay: "[Заўтра ў] LT",
            lastDay: "[Учора ў] LT",
            nextWeek: function() {
                return "[У] dddd [ў] LT"
            },
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return "[У мінулую] dddd [ў] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[У мінулы] dddd [ў] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "праз %s",
            past: "%s таму",
            s: "некалькі секунд",
            m: Hf,
            mm: Hf,
            h: Hf,
            hh: Hf,
            d: "дзень",
            dd: Hf,
            M: "месяц",
            MM: Hf,
            y: "год",
            yy: Hf
        },
        meridiemParse: /ночы|раніцы|дня|вечара/,
        isPM: function(a) {
            return /^(дня|вечара)$/.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "ночы" : a < 12 ? "раніцы" : a < 17 ? "дня" : "вечара"
        },
        ordinalParse: /\d{1,2}-(і|ы|га)/,
        ordinal: function(a, b) {
            switch (b) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return a % 10 !== 2 && a % 10 !== 3 || a % 100 === 12 || a % 100 === 13 ? a + "-ы" : a + "-і";
                case "D":
                    return a + "-га";
                default:
                    return a
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("bg", {
        months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
        monthsShort: "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
        weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
        weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Днес в] LT",
            nextDay: "[Утре в] LT",
            nextWeek: "dddd [в] LT",
            lastDay: "[Вчера в] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return "[В изминалата] dddd [в] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[В изминалия] dddd [в] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "след %s",
            past: "преди %s",
            s: "няколко секунди",
            m: "минута",
            mm: "%d минути",
            h: "час",
            hh: "%d часа",
            d: "ден",
            dd: "%d дни",
            M: "месец",
            MM: "%d месеца",
            y: "година",
            yy: "%d години"
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function(a) {
            var b = a % 10,
                c = a % 100;
            return 0 === a ? a + "-ев" : 0 === c ? a + "-ен" : c > 10 && c < 20 ? a + "-ти" : 1 === b ? a + "-ви" : 2 === b ? a + "-ри" : 7 === b || 8 === b ? a + "-ми" : a + "-ти"
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var If = {
            1: "১",
            2: "২",
            3: "৩",
            4: "৪",
            5: "৫",
            6: "৬",
            7: "৭",
            8: "৮",
            9: "৯",
            0: "০"
        },
        Jf = {
            "১": "1",
            "২": "2",
            "৩": "3",
            "৪": "4",
            "৫": "5",
            "৬": "6",
            "৭": "7",
            "৮": "8",
            "৯": "9",
            "০": "0"
        };
    b.defineLocale("bn", {
        months: "জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),
        monthsShort: "জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে".split("_"),
        weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"),
        weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),
        weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),
        longDateFormat: {
            LT: "A h:mm সময়",
            LTS: "A h:mm:ss সময়",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm সময়",
            LLLL: "dddd, D MMMM YYYY, A h:mm সময়"
        },
        calendar: {
            sameDay: "[আজ] LT",
            nextDay: "[আগামীকাল] LT",
            nextWeek: "dddd, LT",
            lastDay: "[গতকাল] LT",
            lastWeek: "[গত] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s পরে",
            past: "%s আগে",
            s: "কয়েক সেকেন্ড",
            m: "এক মিনিট",
            mm: "%d মিনিট",
            h: "এক ঘন্টা",
            hh: "%d ঘন্টা",
            d: "এক দিন",
            dd: "%d দিন",
            M: "এক মাস",
            MM: "%d মাস",
            y: "এক বছর",
            yy: "%d বছর"
        },
        preparse: function(a) {
            return a.replace(/[১২৩৪৫৬৭৮৯০]/g, function(a) {
                return Jf[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return If[a]
            })
        },
        meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "রাত" === b && a >= 4 || "দুপুর" === b && a < 5 || "বিকাল" === b ? a + 12 : a
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "রাত" : a < 10 ? "সকাল" : a < 17 ? "দুপুর" : a < 20 ? "বিকাল" : "রাত"
        },
        week: {
            dow: 0,
            doy: 6
        }
    });
    var Kf = {
            1: "༡",
            2: "༢",
            3: "༣",
            4: "༤",
            5: "༥",
            6: "༦",
            7: "༧",
            8: "༨",
            9: "༩",
            0: "༠"
        },
        Lf = {
            "༡": "1",
            "༢": "2",
            "༣": "3",
            "༤": "4",
            "༥": "5",
            "༦": "6",
            "༧": "7",
            "༨": "8",
            "༩": "9",
            "༠": "0"
        };
    b.defineLocale("bo", {
        months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
        monthsShort: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
        weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),
        weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
        weekdaysMin: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
        longDateFormat: {
            LT: "A h:mm",
            LTS: "A h:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm",
            LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        calendar: {
            sameDay: "[དི་རིང] LT",
            nextDay: "[སང་ཉིན] LT",
            nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT",
            lastDay: "[ཁ་སང] LT",
            lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s ལ་",
            past: "%s སྔན་ལ",
            s: "ལམ་སང",
            m: "སྐར་མ་གཅིག",
            mm: "%d སྐར་མ",
            h: "ཆུ་ཚོད་གཅིག",
            hh: "%d ཆུ་ཚོད",
            d: "ཉིན་གཅིག",
            dd: "%d ཉིན་",
            M: "ཟླ་བ་གཅིག",
            MM: "%d ཟླ་བ",
            y: "ལོ་གཅིག",
            yy: "%d ལོ"
        },
        preparse: function(a) {
            return a.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function(a) {
                return Lf[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return Kf[a]
            })
        },
        meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "མཚན་མོ" === b && a >= 4 || "ཉིན་གུང" === b && a < 5 || "དགོང་དག" === b ? a + 12 : a
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "མཚན་མོ" : a < 10 ? "ཞོགས་ཀས" : a < 17 ? "ཉིན་གུང" : a < 20 ? "དགོང་དག" : "མཚན་མོ"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), b.defineLocale("br", {
        months: "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
        monthsShort: "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
        weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
        weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h[e]mm A",
            LTS: "h[e]mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D [a viz] MMMM YYYY",
            LLL: "D [a viz] MMMM YYYY h[e]mm A",
            LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A"
        },
        calendar: {
            sameDay: "[Hiziv da] LT",
            nextDay: "[Warc'hoazh da] LT",
            nextWeek: "dddd [da] LT",
            lastDay: "[Dec'h da] LT",
            lastWeek: "dddd [paset da] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "a-benn %s",
            past: "%s 'zo",
            s: "un nebeud segondennoù",
            m: "ur vunutenn",
            mm: Mf,
            h: "un eur",
            hh: "%d eur",
            d: "un devezh",
            dd: Mf,
            M: "ur miz",
            MM: Mf,
            y: "ur bloaz",
            yy: Nf
        },
        ordinalParse: /\d{1,2}(añ|vet)/,
        ordinal: function(a) {
            var b = 1 === a ? "añ" : "vet";
            return a + b
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("bs", {
        months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[jučer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return "[prošlu] dddd [u] LT";
                    case 6:
                        return "[prošle] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prošli] dddd [u] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "par sekundi",
            m: Rf,
            mm: Rf,
            h: Rf,
            hh: Rf,
            d: "dan",
            dd: Rf,
            M: "mjesec",
            MM: Rf,
            y: "godinu",
            yy: Rf
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("ca", {
        months: "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"),
        monthsShort: "gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"),
        monthsParseExact: !0,
        weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"),
        weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
        weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            nextDay: function() {
                return "[demà a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            lastDay: function() {
                return "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [passat a " + (1 !== this.hours() ? "les" : "la") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "d'aquí %s",
            past: "fa %s",
            s: "uns segons",
            m: "un minut",
            mm: "%d minuts",
            h: "una hora",
            hh: "%d hores",
            d: "un dia",
            dd: "%d dies",
            M: "un mes",
            MM: "%d mesos",
            y: "un any",
            yy: "%d anys"
        },
        ordinalParse: /\d{1,2}(r|n|t|è|a)/,
        ordinal: function(a, b) {
            var c = 1 === a ? "r" : 2 === a ? "n" : 3 === a ? "r" : 4 === a ? "t" : "è";
            return "w" !== b && "W" !== b || (c = "a"), a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Sf = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
        Tf = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");
    b.defineLocale("cs", {
        months: Sf,
        monthsShort: Tf,
        monthsParse: function(a, b) {
            var c, d = [];
            for (c = 0; c < 12; c++) d[c] = new RegExp("^" + a[c] + "$|^" + b[c] + "$", "i");
            return d
        }(Sf, Tf),
        shortMonthsParse: function(a) {
            var b, c = [];
            for (b = 0; b < 12; b++) c[b] = new RegExp("^" + a[b] + "$", "i");
            return c
        }(Tf),
        longMonthsParse: function(a) {
            var b, c = [];
            for (b = 0; b < 12; b++) c[b] = new RegExp("^" + a[b] + "$", "i");
            return c
        }(Sf),
        weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
        weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
        weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd D. MMMM YYYY H:mm",
            l: "D. M. YYYY"
        },
        calendar: {
            sameDay: "[dnes v] LT",
            nextDay: "[zítra v] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v neděli v] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [v] LT";
                    case 3:
                        return "[ve středu v] LT";
                    case 4:
                        return "[ve čtvrtek v] LT";
                    case 5:
                        return "[v pátek v] LT";
                    case 6:
                        return "[v sobotu v] LT"
                }
            },
            lastDay: "[včera v] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[minulou neděli v] LT";
                    case 1:
                    case 2:
                        return "[minulé] dddd [v] LT";
                    case 3:
                        return "[minulou středu v] LT";
                    case 4:
                    case 5:
                        return "[minulý] dddd [v] LT";
                    case 6:
                        return "[minulou sobotu v] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "před %s",
            s: Vf,
            m: Vf,
            mm: Vf,
            h: Vf,
            hh: Vf,
            d: Vf,
            dd: Vf,
            M: Vf,
            MM: Vf,
            y: Vf,
            yy: Vf
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("cv", {
        months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),
        monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
        weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),
        weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
        weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
            LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
            LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"
        },
        calendar: {
            sameDay: "[Паян] LT [сехетре]",
            nextDay: "[Ыран] LT [сехетре]",
            lastDay: "[Ӗнер] LT [сехетре]",
            nextWeek: "[Ҫитес] dddd LT [сехетре]",
            lastWeek: "[Иртнӗ] dddd LT [сехетре]",
            sameElse: "L"
        },
        relativeTime: {
            future: function(a) {
                var b = /сехет$/i.exec(a) ? "рен" : /ҫул$/i.exec(a) ? "тан" : "ран";
                return a + b
            },
            past: "%s каялла",
            s: "пӗр-ик ҫеккунт",
            m: "пӗр минут",
            mm: "%d минут",
            h: "пӗр сехет",
            hh: "%d сехет",
            d: "пӗр кун",
            dd: "%d кун",
            M: "пӗр уйӑх",
            MM: "%d уйӑх",
            y: "пӗр ҫул",
            yy: "%d ҫул"
        },
        ordinalParse: /\d{1,2}-мӗш/,
        ordinal: "%d-мӗш",
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("cy", {
        months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
        weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Heddiw am] LT",
            nextDay: "[Yfory am] LT",
            nextWeek: "dddd [am] LT",
            lastDay: "[Ddoe am] LT",
            lastWeek: "dddd [diwethaf am] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "mewn %s",
            past: "%s yn ôl",
            s: "ychydig eiliadau",
            m: "munud",
            mm: "%d munud",
            h: "awr",
            hh: "%d awr",
            d: "diwrnod",
            dd: "%d diwrnod",
            M: "mis",
            MM: "%d mis",
            y: "blwyddyn",
            yy: "%d flynedd"
        },
        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        ordinal: function(a) {
            var b = a,
                c = "",
                d = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"];
            return b > 20 ? c = 40 === b || 50 === b || 60 === b || 80 === b || 100 === b ? "fed" : "ain" : b > 0 && (c = d[b]), a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("da", {
        months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
        weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd [d.] D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[I dag kl.] LT",
            nextDay: "[I morgen kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[I går kl.] LT",
            lastWeek: "[sidste] dddd [kl] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s siden",
            s: "få sekunder",
            m: "et minut",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dage",
            M: "en måned",
            MM: "%d måneder",
            y: "et år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("de-at", {
        months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            m: Wf,
            mm: "%d Minuten",
            h: Wf,
            hh: "%d Stunden",
            d: Wf,
            dd: Wf,
            M: Wf,
            MM: Wf,
            y: Wf,
            yy: Wf
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("de", {
        months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
        weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY HH:mm",
            LLLL: "dddd, D. MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[heute um] LT [Uhr]",
            sameElse: "L",
            nextDay: "[morgen um] LT [Uhr]",
            nextWeek: "dddd [um] LT [Uhr]",
            lastDay: "[gestern um] LT [Uhr]",
            lastWeek: "[letzten] dddd [um] LT [Uhr]"
        },
        relativeTime: {
            future: "in %s",
            past: "vor %s",
            s: "ein paar Sekunden",
            m: Xf,
            mm: "%d Minuten",
            h: Xf,
            hh: "%d Stunden",
            d: Xf,
            dd: Xf,
            M: Xf,
            MM: Xf,
            y: Xf,
            yy: Xf
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Yf = ["ޖެނުއަރީ", "ފެބްރުއަރީ", "މާރިޗު", "އޭޕްރީލު", "މޭ", "ޖޫން", "ޖުލައި", "އޯގަސްޓު", "ސެޕްޓެމްބަރު", "އޮކްޓޯބަރު", "ނޮވެމްބަރު", "ޑިސެމްބަރު"],
        Zf = ["އާދިއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"];
    b.defineLocale("dv", {
        months: Yf,
        monthsShort: Yf,
        weekdays: Zf,
        weekdaysShort: Zf,
        weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "D/M/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /މކ|މފ/,
        isPM: function(a) {
            return "މފ" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "މކ" : "މފ"
        },
        calendar: {
            sameDay: "[މިއަދު] LT",
            nextDay: "[މާދަމާ] LT",
            nextWeek: "dddd LT",
            lastDay: "[އިއްޔެ] LT",
            lastWeek: "[ފާއިތުވި] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ތެރޭގައި %s",
            past: "ކުރިން %s",
            s: "ސިކުންތުކޮޅެއް",
            m: "މިނިޓެއް",
            mm: "މިނިޓު %d",
            h: "ގަޑިއިރެއް",
            hh: "ގަޑިއިރު %d",
            d: "ދުވަހެއް",
            dd: "ދުވަސް %d",
            M: "މަހެއް",
            MM: "މަސް %d",
            y: "އަހަރެއް",
            yy: "އަހަރު %d"
        },
        preparse: function(a) {
            return a.replace(/،/g, ",")
        },
        postformat: function(a) {
            return a.replace(/,/g, "،")
        },
        week: {
            dow: 7,
            doy: 12
        }
    }), b.defineLocale("el", {
        monthsNominativeEl: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
        monthsGenitiveEl: "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
        months: function(a, b) {
            return /D/.test(b.substring(0, b.indexOf("MMMM"))) ? this._monthsGenitiveEl[a.month()] : this._monthsNominativeEl[a.month()]
        },
        monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
        weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
        weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
        weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "μμ" : "ΜΜ" : c ? "πμ" : "ΠΜ"
        },
        isPM: function(a) {
            return "μ" === (a + "").toLowerCase()[0]
        },
        meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendarEl: {
            sameDay: "[Σήμερα {}] LT",
            nextDay: "[Αύριο {}] LT",
            nextWeek: "dddd [{}] LT",
            lastDay: "[Χθες {}] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 6:
                        return "[το προηγούμενο] dddd [{}] LT";
                    default:
                        return "[την προηγούμενη] dddd [{}] LT"
                }
            },
            sameElse: "L"
        },
        calendar: function(a, b) {
            var c = this._calendarEl[a],
                d = b && b.hours();
            return F(c) && (c = c.apply(b)), c.replace("{}", d % 12 === 1 ? "στη" : "στις")
        },
        relativeTime: {
            future: "σε %s",
            past: "%s πριν",
            s: "λίγα δευτερόλεπτα",
            m: "ένα λεπτό",
            mm: "%d λεπτά",
            h: "μία ώρα",
            hh: "%d ώρες",
            d: "μία μέρα",
            dd: "%d μέρες",
            M: "ένας μήνας",
            MM: "%d μήνες",
            y: "ένας χρόνος",
            yy: "%d χρόνια"
        },
        ordinalParse: /\d{1,2}η/,
        ordinal: "%dη",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("en-au", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("en-ca", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "YYYY-MM-DD",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }), b.defineLocale("en-gb", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("en-ie", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("en-nz", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("eo", {
        months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
        weekdays: "Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
        weekdaysShort: "Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D[-an de] MMMM, YYYY",
            LLL: "D[-an de] MMMM, YYYY HH:mm",
            LLLL: "dddd, [la] D[-an de] MMMM, YYYY HH:mm"
        },
        meridiemParse: /[ap]\.t\.m/i,
        isPM: function(a) {
            return "p" === a.charAt(0).toLowerCase()
        },
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "p.t.m." : "P.T.M." : c ? "a.t.m." : "A.T.M."
        },
        calendar: {
            sameDay: "[Hodiaŭ je] LT",
            nextDay: "[Morgaŭ je] LT",
            nextWeek: "dddd [je] LT",
            lastDay: "[Hieraŭ je] LT",
            lastWeek: "[pasinta] dddd [je] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "je %s",
            past: "antaŭ %s",
            s: "sekundoj",
            m: "minuto",
            mm: "%d minutoj",
            h: "horo",
            hh: "%d horoj",
            d: "tago",
            dd: "%d tagoj",
            M: "monato",
            MM: "%d monatoj",
            y: "jaro",
            yy: "%d jaroj"
        },
        ordinalParse: /\d{1,2}a/,
        ordinal: "%da",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var $f = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        _f = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
    b.defineLocale("es-do", {
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: function(a, b) {
            return /-MMM-/.test(b) ? _f[a.month()] : $f[a.month()]
        },
        monthsParseExact: !0,
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY h:mm A",
            LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextDay: function() {
                return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var ag = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        bg = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");
    b.defineLocale("es", {
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: function(a, b) {
            return /-MMM-/.test(b) ? bg[a.month()] : ag[a.month()]
        },
        monthsParseExact: !0,
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextDay: function() {
                return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("et", {
        months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
        monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
        weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
        weekdaysShort: "P_E_T_K_N_R_L".split("_"),
        weekdaysMin: "P_E_T_K_N_R_L".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Täna,] LT",
            nextDay: "[Homme,] LT",
            nextWeek: "[Järgmine] dddd LT",
            lastDay: "[Eile,] LT",
            lastWeek: "[Eelmine] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s pärast",
            past: "%s tagasi",
            s: cg,
            m: cg,
            mm: cg,
            h: cg,
            hh: cg,
            d: cg,
            dd: "%d päeva",
            M: cg,
            MM: cg,
            y: cg,
            yy: cg
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("eu", {
        months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
        monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
        monthsParseExact: !0,
        weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
        weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
        weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY[ko] MMMM[ren] D[a]",
            LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
            LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
            l: "YYYY-M-D",
            ll: "YYYY[ko] MMM D[a]",
            lll: "YYYY[ko] MMM D[a] HH:mm",
            llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
        },
        calendar: {
            sameDay: "[gaur] LT[etan]",
            nextDay: "[bihar] LT[etan]",
            nextWeek: "dddd LT[etan]",
            lastDay: "[atzo] LT[etan]",
            lastWeek: "[aurreko] dddd LT[etan]",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s barru",
            past: "duela %s",
            s: "segundo batzuk",
            m: "minutu bat",
            mm: "%d minutu",
            h: "ordu bat",
            hh: "%d ordu",
            d: "egun bat",
            dd: "%d egun",
            M: "hilabete bat",
            MM: "%d hilabete",
            y: "urte bat",
            yy: "%d urte"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var dg = {
            1: "۱",
            2: "۲",
            3: "۳",
            4: "۴",
            5: "۵",
            6: "۶",
            7: "۷",
            8: "۸",
            9: "۹",
            0: "۰"
        },
        eg = {
            "۱": "1",
            "۲": "2",
            "۳": "3",
            "۴": "4",
            "۵": "5",
            "۶": "6",
            "۷": "7",
            "۸": "8",
            "۹": "9",
            "۰": "0"
        };
    b.defineLocale("fa", {
        months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
        monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
        weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
        weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
        weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        meridiemParse: /قبل از ظهر|بعد از ظهر/,
        isPM: function(a) {
            return /بعد از ظهر/.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "قبل از ظهر" : "بعد از ظهر"
        },
        calendar: {
            sameDay: "[امروز ساعت] LT",
            nextDay: "[فردا ساعت] LT",
            nextWeek: "dddd [ساعت] LT",
            lastDay: "[دیروز ساعت] LT",
            lastWeek: "dddd [پیش] [ساعت] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "در %s",
            past: "%s پیش",
            s: "چندین ثانیه",
            m: "یک دقیقه",
            mm: "%d دقیقه",
            h: "یک ساعت",
            hh: "%d ساعت",
            d: "یک روز",
            dd: "%d روز",
            M: "یک ماه",
            MM: "%d ماه",
            y: "یک سال",
            yy: "%d سال"
        },
        preparse: function(a) {
            return a.replace(/[۰-۹]/g, function(a) {
                return eg[a]
            }).replace(/،/g, ",")
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return dg[a]
            }).replace(/,/g, "،")
        },
        ordinalParse: /\d{1,2}م/,
        ordinal: "%dم",
        week: {
            dow: 6,
            doy: 12
        }
    });
    var fg = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),
        gg = ["nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", fg[7], fg[8], fg[9]];
    b.defineLocale("fi", {
        months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
        monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
        weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
        weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
        weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD.MM.YYYY",
            LL: "Do MMMM[ta] YYYY",
            LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
            LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
            l: "D.M.YYYY",
            ll: "Do MMM YYYY",
            lll: "Do MMM YYYY, [klo] HH.mm",
            llll: "ddd, Do MMM YYYY, [klo] HH.mm"
        },
        calendar: {
            sameDay: "[tänään] [klo] LT",
            nextDay: "[huomenna] [klo] LT",
            nextWeek: "dddd [klo] LT",
            lastDay: "[eilen] [klo] LT",
            lastWeek: "[viime] dddd[na] [klo] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s päästä",
            past: "%s sitten",
            s: hg,
            m: hg,
            mm: hg,
            h: hg,
            hh: hg,
            d: hg,
            dd: hg,
            M: hg,
            MM: hg,
            y: hg,
            yy: hg
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("fo", {
        months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
        weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
        weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D. MMMM, YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Í dag kl.] LT",
            nextDay: "[Í morgin kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[Í gjár kl.] LT",
            lastWeek: "[síðstu] dddd [kl] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "um %s",
            past: "%s síðani",
            s: "fá sekund",
            m: "ein minutt",
            mm: "%d minuttir",
            h: "ein tími",
            hh: "%d tímar",
            d: "ein dagur",
            dd: "%d dagar",
            M: "ein mánaði",
            MM: "%d mánaðir",
            y: "eitt ár",
            yy: "%d ár"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("fr-ca", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        monthsParseExact: !0,
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|e)/,
        ordinal: function(a) {
            return a + (1 === a ? "er" : "e")
        }
    }), b.defineLocale("fr-ch", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        monthsParseExact: !0,
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|e)/,
        ordinal: function(a) {
            return a + (1 === a ? "er" : "e")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("fr", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        monthsParseExact: !0,
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        ordinalParse: /\d{1,2}(er|)/,
        ordinal: function(a) {
            return a + (1 === a ? "er" : "")
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var jg = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),
        kg = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");
    b.defineLocale("fy", {
        months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
        monthsShort: function(a, b) {
            return /-MMM-/.test(b) ? kg[a.month()] : jg[a.month()]
        },
        monthsParseExact: !0,
        weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
        weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
        weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[hjoed om] LT",
            nextDay: "[moarn om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[juster om] LT",
            lastWeek: "[ôfrûne] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "oer %s",
            past: "%s lyn",
            s: "in pear sekonden",
            m: "ien minút",
            mm: "%d minuten",
            h: "ien oere",
            hh: "%d oeren",
            d: "ien dei",
            dd: "%d dagen",
            M: "ien moanne",
            MM: "%d moannen",
            y: "ien jier",
            yy: "%d jierren"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(a) {
            return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var lg = ["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd"],
        mg = ["Faoi", "Gear", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùn", "Sult", "Dàmh", "Samh", "Dùbh"],
        ng = ["Didòmhnaich", "Diluain", "Dimàirt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"],
        og = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
        pg = ["Dò", "Lu", "Mà", "Ci", "Ar", "Ha", "Sa"];
    b.defineLocale("gd", {
        months: lg,
        monthsShort: mg,
        monthsParseExact: !0,
        weekdays: ng,
        weekdaysShort: og,
        weekdaysMin: pg,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[An-diugh aig] LT",
            nextDay: "[A-màireach aig] LT",
            nextWeek: "dddd [aig] LT",
            lastDay: "[An-dè aig] LT",
            lastWeek: "dddd [seo chaidh] [aig] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ann an %s",
            past: "bho chionn %s",
            s: "beagan diogan",
            m: "mionaid",
            mm: "%d mionaidean",
            h: "uair",
            hh: "%d uairean",
            d: "latha",
            dd: "%d latha",
            M: "mìos",
            MM: "%d mìosan",
            y: "bliadhna",
            yy: "%d bliadhna"
        },
        ordinalParse: /\d{1,2}(d|na|mh)/,
        ordinal: function(a) {
            var b = 1 === a ? "d" : a % 10 === 2 ? "na" : "mh";
            return a + b
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("gl", {
        months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
        monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoxe " + (1 !== this.hours() ? "ás" : "á") + "] LT"
            },
            nextDay: function() {
                return "[mañá " + (1 !== this.hours() ? "ás" : "á") + "] LT"
            },
            nextWeek: function() {
                return "dddd [" + (1 !== this.hours() ? "ás" : "a") + "] LT"
            },
            lastDay: function() {
                return "[onte " + (1 !== this.hours() ? "á" : "a") + "] LT"
            },
            lastWeek: function() {
                return "[o] dddd [pasado " + (1 !== this.hours() ? "ás" : "a") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: function(a) {
                return 0 === a.indexOf("un") ? "n" + a : "en " + a
            },
            past: "hai %s",
            s: "uns segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "unha hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            M: "un mes",
            MM: "%d meses",
            y: "un ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("he", {
        months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
        monthsShort: "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
        weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
        weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
        weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [ב]MMMM YYYY",
            LLL: "D [ב]MMMM YYYY HH:mm",
            LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
            l: "D/M/YYYY",
            ll: "D MMM YYYY",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd, D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[היום ב־]LT",
            nextDay: "[מחר ב־]LT",
            nextWeek: "dddd [בשעה] LT",
            lastDay: "[אתמול ב־]LT",
            lastWeek: "[ביום] dddd [האחרון בשעה] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "בעוד %s",
            past: "לפני %s",
            s: "מספר שניות",
            m: "דקה",
            mm: "%d דקות",
            h: "שעה",
            hh: function(a) {
                return 2 === a ? "שעתיים" : a + " שעות"
            },
            d: "יום",
            dd: function(a) {
                return 2 === a ? "יומיים" : a + " ימים"
            },
            M: "חודש",
            MM: function(a) {
                return 2 === a ? "חודשיים" : a + " חודשים"
            },
            y: "שנה",
            yy: function(a) {
                return 2 === a ? "שנתיים" : a % 10 === 0 && 10 !== a ? a + " שנה" : a + " שנים"
            }
        },
        meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
        isPM: function(a) {
            return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 5 ? "לפנות בוקר" : a < 10 ? "בבוקר" : a < 12 ? c ? 'לפנה"צ' : "לפני הצהריים" : a < 18 ? c ? 'אחה"צ' : "אחרי הצהריים" : "בערב"
        }
    });
    var qg = {
            1: "१",
            2: "२",
            3: "३",
            4: "४",
            5: "५",
            6: "६",
            7: "७",
            8: "८",
            9: "९",
            0: "०"
        },
        rg = {
            "१": "1",
            "२": "2",
            "३": "3",
            "४": "4",
            "५": "5",
            "६": "6",
            "७": "7",
            "८": "8",
            "९": "9",
            "०": "0"
        };
    b.defineLocale("hi", {
        months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
        monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
        monthsParseExact: !0,
        weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
        weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
        weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
        longDateFormat: {
            LT: "A h:mm बजे",
            LTS: "A h:mm:ss बजे",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm बजे",
            LLLL: "dddd, D MMMM YYYY, A h:mm बजे"
        },
        calendar: {
            sameDay: "[आज] LT",
            nextDay: "[कल] LT",
            nextWeek: "dddd, LT",
            lastDay: "[कल] LT",
            lastWeek: "[पिछले] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s में",
            past: "%s पहले",
            s: "कुछ ही क्षण",
            m: "एक मिनट",
            mm: "%d मिनट",
            h: "एक घंटा",
            hh: "%d घंटे",
            d: "एक दिन",
            dd: "%d दिन",
            M: "एक महीने",
            MM: "%d महीने",
            y: "एक वर्ष",
            yy: "%d वर्ष"
        },
        preparse: function(a) {
            return a.replace(/[१२३४५६७८९०]/g, function(a) {
                return rg[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return qg[a]
            })
        },
        meridiemParse: /रात|सुबह|दोपहर|शाम/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "रात" === b ? a < 4 ? a : a + 12 : "सुबह" === b ? a : "दोपहर" === b ? a >= 10 ? a : a + 12 : "शाम" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "रात" : a < 10 ? "सुबह" : a < 17 ? "दोपहर" : a < 20 ? "शाम" : "रात"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), b.defineLocale("hr", {
        months: {
            format: "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),
            standalone: "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_")
        },
        monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[jučer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return "[prošlu] dddd [u] LT";
                    case 6:
                        return "[prošle] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prošli] dddd [u] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "par sekundi",
            m: sg,
            mm: sg,
            h: sg,
            hh: sg,
            d: "dan",
            dd: sg,
            M: "mjesec",
            MM: sg,
            y: "godinu",
            yy: sg
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var tg = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
    b.defineLocale("hu", {
        months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
        monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
        weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
        weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
        weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "YYYY.MM.DD.",
            LL: "YYYY. MMMM D.",
            LLL: "YYYY. MMMM D. H:mm",
            LLLL: "YYYY. MMMM D., dddd H:mm"
        },
        meridiemParse: /de|du/i,
        isPM: function(a) {
            return "u" === a.charAt(1).toLowerCase()
        },
        meridiem: function(a, b, c) {
            return a < 12 ? c === !0 ? "de" : "DE" : c === !0 ? "du" : "DU"
        },
        calendar: {
            sameDay: "[ma] LT[-kor]",
            nextDay: "[holnap] LT[-kor]",
            nextWeek: function() {
                return vg.call(this, !0)
            },
            lastDay: "[tegnap] LT[-kor]",
            lastWeek: function() {
                return vg.call(this, !1)
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "%s múlva",
            past: "%s",
            s: ug,
            m: ug,
            mm: ug,
            h: ug,
            hh: ug,
            d: ug,
            dd: ug,
            M: ug,
            MM: ug,
            y: ug,
            yy: ug
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("hy-am", {
        months: {
            format: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),
            standalone: "հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")
        },
        monthsShort: "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),
        weekdays: "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),
        weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY թ.",
            LLL: "D MMMM YYYY թ., HH:mm",
            LLLL: "dddd, D MMMM YYYY թ., HH:mm"
        },
        calendar: {
            sameDay: "[այսօր] LT",
            nextDay: "[վաղը] LT",
            lastDay: "[երեկ] LT",
            nextWeek: function() {
                return "dddd [օրը ժամը] LT"
            },
            lastWeek: function() {
                return "[անցած] dddd [օրը ժամը] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "%s հետո",
            past: "%s առաջ",
            s: "մի քանի վայրկյան",
            m: "րոպե",
            mm: "%d րոպե",
            h: "ժամ",
            hh: "%d ժամ",
            d: "օր",
            dd: "%d օր",
            M: "ամիս",
            MM: "%d ամիս",
            y: "տարի",
            yy: "%d տարի"
        },
        meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
        isPM: function(a) {
            return /^(ցերեկվա|երեկոյան)$/.test(a)
        },
        meridiem: function(a) {
            return a < 4 ? "գիշերվա" : a < 12 ? "առավոտվա" : a < 17 ? "ցերեկվա" : "երեկոյան"
        },
        ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
        ordinal: function(a, b) {
            switch (b) {
                case "DDD":
                case "w":
                case "W":
                case "DDDo":
                    return 1 === a ? a + "-ին" : a + "-րդ";
                default:
                    return a
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("id", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|siang|sore|malam/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "pagi" === b ? a : "siang" === b ? a >= 11 ? a : a + 12 : "sore" === b || "malam" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 11 ? "pagi" : a < 15 ? "siang" : a < 19 ? "sore" : "malam"
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Besok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kemarin pukul] LT",
            lastWeek: "dddd [lalu pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lalu",
            s: "beberapa detik",
            m: "semenit",
            mm: "%d menit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("is", {
        months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
        weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
        weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"),
        weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] H:mm",
            LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
        },
        calendar: {
            sameDay: "[í dag kl.] LT",
            nextDay: "[á morgun kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[í gær kl.] LT",
            lastWeek: "[síðasta] dddd [kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "eftir %s",
            past: "fyrir %s síðan",
            s: xg,
            m: xg,
            mm: xg,
            h: "klukkustund",
            hh: xg,
            d: xg,
            dd: xg,
            M: xg,
            MM: xg,
            y: xg,
            yy: xg
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("it", {
        months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        weekdays: "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
        weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
        weekdaysMin: "Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Oggi alle] LT",
            nextDay: "[Domani alle] LT",
            nextWeek: "dddd [alle] LT",
            lastDay: "[Ieri alle] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[la scorsa] dddd [alle] LT";
                    default:
                        return "[lo scorso] dddd [alle] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: function(a) {
                return (/^[0-9].+$/.test(a) ? "tra" : "in") + " " + a
            },
            past: "%s fa",
            s: "alcuni secondi",
            m: "un minuto",
            mm: "%d minuti",
            h: "un'ora",
            hh: "%d ore",
            d: "un giorno",
            dd: "%d giorni",
            M: "un mese",
            MM: "%d mesi",
            y: "un anno",
            yy: "%d anni"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("ja", {
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
        weekdaysShort: "日_月_火_水_木_金_土".split("_"),
        weekdaysMin: "日_月_火_水_木_金_土".split("_"),
        longDateFormat: {
            LT: "Ah時m分",
            LTS: "Ah時m分s秒",
            L: "YYYY/MM/DD",
            LL: "YYYY年M月D日",
            LLL: "YYYY年M月D日Ah時m分",
            LLLL: "YYYY年M月D日Ah時m分 dddd"
        },
        meridiemParse: /午前|午後/i,
        isPM: function(a) {
            return "午後" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "午前" : "午後"
        },
        calendar: {
            sameDay: "[今日] LT",
            nextDay: "[明日] LT",
            nextWeek: "[来週]dddd LT",
            lastDay: "[昨日] LT",
            lastWeek: "[前週]dddd LT",
            sameElse: "L"
        },
        ordinalParse: /\d{1,2}日/,
        ordinal: function(a, b) {
            switch (b) {
                case "d":
                case "D":
                case "DDD":
                    return a + "日";
                default:
                    return a
            }
        },
        relativeTime: {
            future: "%s後",
            past: "%s前",
            s: "数秒",
            m: "1分",
            mm: "%d分",
            h: "1時間",
            hh: "%d時間",
            d: "1日",
            dd: "%d日",
            M: "1ヶ月",
            MM: "%dヶ月",
            y: "1年",
            yy: "%d年"
        }
    }), b.defineLocale("jv", {
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
        weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
        weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /enjing|siyang|sonten|ndalu/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "enjing" === b ? a : "siyang" === b ? a >= 11 ? a : a + 12 : "sonten" === b || "ndalu" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 11 ? "enjing" : a < 15 ? "siyang" : a < 19 ? "sonten" : "ndalu"
        },
        calendar: {
            sameDay: "[Dinten puniko pukul] LT",
            nextDay: "[Mbenjang pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kala wingi pukul] LT",
            lastWeek: "dddd [kepengker pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "wonten ing %s",
            past: "%s ingkang kepengker",
            s: "sawetawis detik",
            m: "setunggal menit",
            mm: "%d menit",
            h: "setunggal jam",
            hh: "%d jam",
            d: "sedinten",
            dd: "%d dinten",
            M: "sewulan",
            MM: "%d wulan",
            y: "setaun",
            yy: "%d taun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("ka", {
        months: {
            standalone: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
            format: "იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split("_")
        },
        monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
        weekdays: {
            standalone: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
            format: "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),
            isFormat: /(წინა|შემდეგ)/
        },
        weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
        weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[დღეს] LT[-ზე]",
            nextDay: "[ხვალ] LT[-ზე]",
            lastDay: "[გუშინ] LT[-ზე]",
            nextWeek: "[შემდეგ] dddd LT[-ზე]",
            lastWeek: "[წინა] dddd LT-ზე",
            sameElse: "L"
        },
        relativeTime: {
            future: function(a) {
                return /(წამი|წუთი|საათი|წელი)/.test(a) ? a.replace(/ი$/, "ში") : a + "ში"
            },
            past: function(a) {
                return /(წამი|წუთი|საათი|დღე|თვე)/.test(a) ? a.replace(/(ი|ე)$/, "ის წინ") : /წელი/.test(a) ? a.replace(/წელი$/, "წლის წინ") : void 0
            },
            s: "რამდენიმე წამი",
            m: "წუთი",
            mm: "%d წუთი",
            h: "საათი",
            hh: "%d საათი",
            d: "დღე",
            dd: "%d დღე",
            M: "თვე",
            MM: "%d თვე",
            y: "წელი",
            yy: "%d წელი"
        },
        ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
        ordinal: function(a) {
            return 0 === a ? a : 1 === a ? a + "-ლი" : a < 20 || a <= 100 && a % 20 === 0 || a % 100 === 0 ? "მე-" + a : a + "-ე"
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var yg = {
        0: "-ші",
        1: "-ші",
        2: "-ші",
        3: "-ші",
        4: "-ші",
        5: "-ші",
        6: "-шы",
        7: "-ші",
        8: "-ші",
        9: "-шы",
        10: "-шы",
        20: "-шы",
        30: "-шы",
        40: "-шы",
        50: "-ші",
        60: "-шы",
        70: "-ші",
        80: "-ші",
        90: "-шы",
        100: "-ші"
    };
    b.defineLocale("kk", {
        months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),
        monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),
        weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),
        weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"),
        weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Бүгін сағат] LT",
            nextDay: "[Ертең сағат] LT",
            nextWeek: "dddd [сағат] LT",
            lastDay: "[Кеше сағат] LT",
            lastWeek: "[Өткен аптаның] dddd [сағат] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s ішінде",
            past: "%s бұрын",
            s: "бірнеше секунд",
            m: "бір минут",
            mm: "%d минут",
            h: "бір сағат",
            hh: "%d сағат",
            d: "бір күн",
            dd: "%d күн",
            M: "бір ай",
            MM: "%d ай",
            y: "бір жыл",
            yy: "%d жыл"
        },
        ordinalParse: /\d{1,2}-(ші|шы)/,
        ordinal: function(a) {
            var b = a % 10,
                c = a >= 100 ? 100 : null;
            return a + (yg[a] || yg[b] || yg[c])
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("km", {
        months: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
        monthsShort: "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"),
        weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        weekdaysShort: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        weekdaysMin: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[ថ្ងៃនេះ ម៉ោង] LT",
            nextDay: "[ស្អែក ម៉ោង] LT",
            nextWeek: "dddd [ម៉ោង] LT",
            lastDay: "[ម្សិលមិញ ម៉ោង] LT",
            lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sទៀត",
            past: "%sមុន",
            s: "ប៉ុន្មានវិនាទី",
            m: "មួយនាទី",
            mm: "%d នាទី",
            h: "មួយម៉ោង",
            hh: "%d ម៉ោង",
            d: "មួយថ្ងៃ",
            dd: "%d ថ្ងៃ",
            M: "មួយខែ",
            MM: "%d ខែ",
            y: "មួយឆ្នាំ",
            yy: "%d ឆ្នាំ"
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("ko", {
        months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
        weekdaysShort: "일_월_화_수_목_금_토".split("_"),
        weekdaysMin: "일_월_화_수_목_금_토".split("_"),
        longDateFormat: {
            LT: "A h시 m분",
            LTS: "A h시 m분 s초",
            L: "YYYY.MM.DD",
            LL: "YYYY년 MMMM D일",
            LLL: "YYYY년 MMMM D일 A h시 m분",
            LLLL: "YYYY년 MMMM D일 dddd A h시 m분"
        },
        calendar: {
            sameDay: "오늘 LT",
            nextDay: "내일 LT",
            nextWeek: "dddd LT",
            lastDay: "어제 LT",
            lastWeek: "지난주 dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s 후",
            past: "%s 전",
            s: "몇 초",
            ss: "%d초",
            m: "일분",
            mm: "%d분",
            h: "한 시간",
            hh: "%d시간",
            d: "하루",
            dd: "%d일",
            M: "한 달",
            MM: "%d달",
            y: "일 년",
            yy: "%d년"
        },
        ordinalParse: /\d{1,2}일/,
        ordinal: "%d일",
        meridiemParse: /오전|오후/,
        isPM: function(a) {
            return "오후" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "오전" : "오후"
        }
    });
    var zg = {
        0: "-чү",
        1: "-чи",
        2: "-чи",
        3: "-чү",
        4: "-чү",
        5: "-чи",
        6: "-чы",
        7: "-чи",
        8: "-чи",
        9: "-чу",
        10: "-чу",
        20: "-чы",
        30: "-чу",
        40: "-чы",
        50: "-чү",
        60: "-чы",
        70: "-чи",
        80: "-чи",
        90: "-чу",
        100: "-чү"
    };
    b.defineLocale("ky", {
        months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
        monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
        weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"),
        weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),
        weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Бүгүн саат] LT",
            nextDay: "[Эртең саат] LT",
            nextWeek: "dddd [саат] LT",
            lastDay: "[Кече саат] LT",
            lastWeek: "[Өткен аптанын] dddd [күнү] [саат] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s ичинде",
            past: "%s мурун",
            s: "бирнече секунд",
            m: "бир мүнөт",
            mm: "%d мүнөт",
            h: "бир саат",
            hh: "%d саат",
            d: "бир күн",
            dd: "%d күн",
            M: "бир ай",
            MM: "%d ай",
            y: "бир жыл",
            yy: "%d жыл"
        },
        ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
        ordinal: function(a) {
            var b = a % 10,
                c = a >= 100 ? 100 : null;
            return a + (zg[a] || zg[b] || zg[c])
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("lb", {
        months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        monthsParseExact: !0,
        weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
        weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm [Auer]",
            LTS: "H:mm:ss [Auer]",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm [Auer]",
            LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
        },
        calendar: {
            sameDay: "[Haut um] LT",
            sameElse: "L",
            nextDay: "[Muer um] LT",
            nextWeek: "dddd [um] LT",
            lastDay: "[Gëschter um] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 2:
                    case 4:
                        return "[Leschten] dddd [um] LT";
                    default:
                        return "[Leschte] dddd [um] LT"
                }
            }
        },
        relativeTime: {
            future: Bg,
            past: Cg,
            s: "e puer Sekonnen",
            m: Ag,
            mm: "%d Minutten",
            h: Ag,
            hh: "%d Stonnen",
            d: Ag,
            dd: "%d Deeg",
            M: Ag,
            MM: "%d Méint",
            y: Ag,
            yy: "%d Joer"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("lo", {
        months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
        monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
        weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
        weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
        weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "ວັນdddd D MMMM YYYY HH:mm"
        },
        meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
        isPM: function(a) {
            return "ຕອນແລງ" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ"
        },
        calendar: {
            sameDay: "[ມື້ນີ້ເວລາ] LT",
            nextDay: "[ມື້ອື່ນເວລາ] LT",
            nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT",
            lastDay: "[ມື້ວານນີ້ເວລາ] LT",
            lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ອີກ %s",
            past: "%sຜ່ານມາ",
            s: "ບໍ່ເທົ່າໃດວິນາທີ",
            m: "1 ນາທີ",
            mm: "%d ນາທີ",
            h: "1 ຊົ່ວໂມງ",
            hh: "%d ຊົ່ວໂມງ",
            d: "1 ມື້",
            dd: "%d ມື້",
            M: "1 ເດືອນ",
            MM: "%d ເດືອນ",
            y: "1 ປີ",
            yy: "%d ປີ"
        },
        ordinalParse: /(ທີ່)\d{1,2}/,
        ordinal: function(a) {
            return "ທີ່" + a
        }
    });
    var Eg = {
        m: "minutė_minutės_minutę",
        mm: "minutės_minučių_minutes",
        h: "valanda_valandos_valandą",
        hh: "valandos_valandų_valandas",
        d: "diena_dienos_dieną",
        dd: "dienos_dienų_dienas",
        M: "mėnuo_mėnesio_mėnesį",
        MM: "mėnesiai_mėnesių_mėnesius",
        y: "metai_metų_metus",
        yy: "metai_metų_metus"
    };
    b.defineLocale("lt", {
        months: {
            format: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
            standalone: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
            isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
        },
        monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
        weekdays: {
            format: "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),
            standalone: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),
            isFormat: /dddd HH:mm/
        },
        weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
        weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "YYYY [m.] MMMM D [d.]",
            LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
            l: "YYYY-MM-DD",
            ll: "YYYY [m.] MMMM D [d.]",
            lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
            llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
        },
        calendar: {
            sameDay: "[Šiandien] LT",
            nextDay: "[Rytoj] LT",
            nextWeek: "dddd LT",
            lastDay: "[Vakar] LT",
            lastWeek: "[Praėjusį] dddd LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "po %s",
            past: "prieš %s",
            s: Fg,
            m: Gg,
            mm: Jg,
            h: Gg,
            hh: Jg,
            d: Gg,
            dd: Jg,
            M: Gg,
            MM: Jg,
            y: Gg,
            yy: Jg
        },
        ordinalParse: /\d{1,2}-oji/,
        ordinal: function(a) {
            return a + "-oji"
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Kg = {
        m: "minūtes_minūtēm_minūte_minūtes".split("_"),
        mm: "minūtes_minūtēm_minūte_minūtes".split("_"),
        h: "stundas_stundām_stunda_stundas".split("_"),
        hh: "stundas_stundām_stunda_stundas".split("_"),
        d: "dienas_dienām_diena_dienas".split("_"),
        dd: "dienas_dienām_diena_dienas".split("_"),
        M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
        MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
        y: "gada_gadiem_gads_gadi".split("_"),
        yy: "gada_gadiem_gads_gadi".split("_")
    };
    b.defineLocale("lv", {
        months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
        weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
        weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
        weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY.",
            LL: "YYYY. [gada] D. MMMM",
            LLL: "YYYY. [gada] D. MMMM, HH:mm",
            LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
        },
        calendar: {
            sameDay: "[Šodien pulksten] LT",
            nextDay: "[Rīt pulksten] LT",
            nextWeek: "dddd [pulksten] LT",
            lastDay: "[Vakar pulksten] LT",
            lastWeek: "[Pagājušā] dddd [pulksten] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "pēc %s",
            past: "pirms %s",
            s: Og,
            m: Ng,
            mm: Mg,
            h: Ng,
            hh: Mg,
            d: Ng,
            dd: Mg,
            M: Ng,
            MM: Mg,
            y: Ng,
            yy: Mg
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Pg = {
        words: {
            m: ["jedan minut", "jednog minuta"],
            mm: ["minut", "minuta", "minuta"],
            h: ["jedan sat", "jednog sata"],
            hh: ["sat", "sata", "sati"],
            dd: ["dan", "dana", "dana"],
            MM: ["mjesec", "mjeseca", "mjeseci"],
            yy: ["godina", "godine", "godina"]
        },
        correctGrammaticalCase: function(a, b) {
            return 1 === a ? b[0] : a >= 2 && a <= 4 ? b[1] : b[2]
        },
        translate: function(a, b, c) {
            var d = Pg.words[c];
            return 1 === c.length ? b ? d[0] : d[1] : a + " " + Pg.correctGrammaticalCase(a, d)
        }
    };
    b.defineLocale("me", {
        months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sjutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juče u] LT",
            lastWeek: function() {
                var a = ["[prošle] [nedjelje] [u] LT", "[prošlog] [ponedjeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srijede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT"];
                return a[this.day()]
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "prije %s",
            s: "nekoliko sekundi",
            m: Pg.translate,
            mm: Pg.translate,
            h: Pg.translate,
            hh: Pg.translate,
            d: "dan",
            dd: Pg.translate,
            M: "mjesec",
            MM: Pg.translate,
            y: "godinu",
            yy: Pg.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("mi", {
        months: "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"),
        monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),
        monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
        monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
        weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"),
        weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
        weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [i] HH:mm",
            LLLL: "dddd, D MMMM YYYY [i] HH:mm"
        },
        calendar: {
            sameDay: "[i teie mahana, i] LT",
            nextDay: "[apopo i] LT",
            nextWeek: "dddd [i] LT",
            lastDay: "[inanahi i] LT",
            lastWeek: "dddd [whakamutunga i] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "i roto i %s",
            past: "%s i mua",
            s: "te hēkona ruarua",
            m: "he meneti",
            mm: "%d meneti",
            h: "te haora",
            hh: "%d haora",
            d: "he ra",
            dd: "%d ra",
            M: "he marama",
            MM: "%d marama",
            y: "he tau",
            yy: "%d tau"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("mk", {
        months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
        monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
        weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
        weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"),
        weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "D.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[Денес во] LT",
            nextDay: "[Утре во] LT",
            nextWeek: "[Во] dddd [во] LT",
            lastDay: "[Вчера во] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return "[Изминатата] dddd [во] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Изминатиот] dddd [во] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "после %s",
            past: "пред %s",
            s: "неколку секунди",
            m: "минута",
            mm: "%d минути",
            h: "час",
            hh: "%d часа",
            d: "ден",
            dd: "%d дена",
            M: "месец",
            MM: "%d месеци",
            y: "година",
            yy: "%d години"
        },
        ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
        ordinal: function(a) {
            var b = a % 10,
                c = a % 100;
            return 0 === a ? a + "-ев" : 0 === c ? a + "-ен" : c > 10 && c < 20 ? a + "-ти" : 1 === b ? a + "-ви" : 2 === b ? a + "-ри" : 7 === b || 8 === b ? a + "-ми" : a + "-ти"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("ml", {
        months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
        monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
        monthsParseExact: !0,
        weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
        weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
        weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
        longDateFormat: {
            LT: "A h:mm -നു",
            LTS: "A h:mm:ss -നു",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm -നു",
            LLLL: "dddd, D MMMM YYYY, A h:mm -നു"
        },
        calendar: {
            sameDay: "[ഇന്ന്] LT",
            nextDay: "[നാളെ] LT",
            nextWeek: "dddd, LT",
            lastDay: "[ഇന്നലെ] LT",
            lastWeek: "[കഴിഞ്ഞ] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s കഴിഞ്ഞ്",
            past: "%s മുൻപ്",
            s: "അൽപ നിമിഷങ്ങൾ",
            m: "ഒരു മിനിറ്റ്",
            mm: "%d മിനിറ്റ്",
            h: "ഒരു മണിക്കൂർ",
            hh: "%d മണിക്കൂർ",
            d: "ഒരു ദിവസം",
            dd: "%d ദിവസം",
            M: "ഒരു മാസം",
            MM: "%d മാസം",
            y: "ഒരു വർഷം",
            yy: "%d വർഷം"
        },
        meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "രാത്രി" === b && a >= 4 || "ഉച്ച കഴിഞ്ഞ്" === b || "വൈകുന്നേരം" === b ? a + 12 : a
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "രാത്രി" : a < 12 ? "രാവിലെ" : a < 17 ? "ഉച്ച കഴിഞ്ഞ്" : a < 20 ? "വൈകുന്നേരം" : "രാത്രി"
        }
    });
    var Qg = {
            1: "१",
            2: "२",
            3: "३",
            4: "४",
            5: "५",
            6: "६",
            7: "७",
            8: "८",
            9: "९",
            0: "०"
        },
        Rg = {
            "१": "1",
            "२": "2",
            "३": "3",
            "४": "4",
            "५": "5",
            "६": "6",
            "७": "7",
            "८": "8",
            "९": "9",
            "०": "0"
        };
    b.defineLocale("mr", {
        months: "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
        monthsShort: "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
        monthsParseExact: !0,
        weekdays: "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
        weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
        weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
        longDateFormat: {
            LT: "A h:mm वाजता",
            LTS: "A h:mm:ss वाजता",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm वाजता",
            LLLL: "dddd, D MMMM YYYY, A h:mm वाजता"
        },
        calendar: {
            sameDay: "[आज] LT",
            nextDay: "[उद्या] LT",
            nextWeek: "dddd, LT",
            lastDay: "[काल] LT",
            lastWeek: "[मागील] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sमध्ये",
            past: "%sपूर्वी",
            s: Sg,
            m: Sg,
            mm: Sg,
            h: Sg,
            hh: Sg,
            d: Sg,
            dd: Sg,
            M: Sg,
            MM: Sg,
            y: Sg,
            yy: Sg
        },
        preparse: function(a) {
            return a.replace(/[१२३४५६७८९०]/g, function(a) {
                return Rg[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return Qg[a]
            })
        },
        meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "रात्री" === b ? a < 4 ? a : a + 12 : "सकाळी" === b ? a : "दुपारी" === b ? a >= 10 ? a : a + 12 : "सायंकाळी" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "रात्री" : a < 10 ? "सकाळी" : a < 17 ? "दुपारी" : a < 20 ? "सायंकाळी" : "रात्री"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), b.defineLocale("ms-my", {
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "pagi" === b ? a : "tengahari" === b ? a >= 11 ? a : a + 12 : "petang" === b || "malam" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 11 ? "pagi" : a < 15 ? "tengahari" : a < 19 ? "petang" : "malam"
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Esok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kelmarin pukul] LT",
            lastWeek: "dddd [lepas pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lepas",
            s: "beberapa saat",
            m: "seminit",
            mm: "%d minit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("ms", {
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [pukul] HH.mm",
            LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        meridiemParse: /pagi|tengahari|petang|malam/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "pagi" === b ? a : "tengahari" === b ? a >= 11 ? a : a + 12 : "petang" === b || "malam" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 11 ? "pagi" : a < 15 ? "tengahari" : a < 19 ? "petang" : "malam"
        },
        calendar: {
            sameDay: "[Hari ini pukul] LT",
            nextDay: "[Esok pukul] LT",
            nextWeek: "dddd [pukul] LT",
            lastDay: "[Kelmarin pukul] LT",
            lastWeek: "dddd [lepas pukul] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dalam %s",
            past: "%s yang lepas",
            s: "beberapa saat",
            m: "seminit",
            mm: "%d minit",
            h: "sejam",
            hh: "%d jam",
            d: "sehari",
            dd: "%d hari",
            M: "sebulan",
            MM: "%d bulan",
            y: "setahun",
            yy: "%d tahun"
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var Tg = {
            1: "၁",
            2: "၂",
            3: "၃",
            4: "၄",
            5: "၅",
            6: "၆",
            7: "၇",
            8: "၈",
            9: "၉",
            0: "၀"
        },
        Ug = {
            "၁": "1",
            "၂": "2",
            "၃": "3",
            "၄": "4",
            "၅": "5",
            "၆": "6",
            "၇": "7",
            "၈": "8",
            "၉": "9",
            "၀": "0"
        };
    b.defineLocale("my", {
        months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),
        monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),
        weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),
        weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
        weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[ယနေ.] LT [မှာ]",
            nextDay: "[မနက်ဖြန်] LT [မှာ]",
            nextWeek: "dddd LT [မှာ]",
            lastDay: "[မနေ.က] LT [မှာ]",
            lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]",
            sameElse: "L"
        },
        relativeTime: {
            future: "လာမည့် %s မှာ",
            past: "လွန်ခဲ့သော %s က",
            s: "စက္ကန်.အနည်းငယ်",
            m: "တစ်မိနစ်",
            mm: "%d မိနစ်",
            h: "တစ်နာရီ",
            hh: "%d နာရီ",
            d: "တစ်ရက်",
            dd: "%d ရက်",
            M: "တစ်လ",
            MM: "%d လ",
            y: "တစ်နှစ်",
            yy: "%d နှစ်"
        },
        preparse: function(a) {
            return a.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function(a) {
                return Ug[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return Tg[a]
            })
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("nb", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
        monthsParseExact: !0,
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
        weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] HH:mm",
            LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
        },
        calendar: {
            sameDay: "[i dag kl.] LT",
            nextDay: "[i morgen kl.] LT",
            nextWeek: "dddd [kl.] LT",
            lastDay: "[i går kl.] LT",
            lastWeek: "[forrige] dddd [kl.] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s siden",
            s: "noen sekunder",
            m: "ett minutt",
            mm: "%d minutter",
            h: "en time",
            hh: "%d timer",
            d: "en dag",
            dd: "%d dager",
            M: "en måned",
            MM: "%d måneder",
            y: "ett år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Vg = {
            1: "१",
            2: "२",
            3: "३",
            4: "४",
            5: "५",
            6: "६",
            7: "७",
            8: "८",
            9: "९",
            0: "०"
        },
        Wg = {
            "१": "1",
            "२": "2",
            "३": "3",
            "४": "4",
            "५": "5",
            "६": "6",
            "७": "7",
            "८": "8",
            "९": "9",
            "०": "0"
        };
    b.defineLocale("ne", {
        months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
        monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
        monthsParseExact: !0,
        weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
        weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
        weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "Aको h:mm बजे",
            LTS: "Aको h:mm:ss बजे",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, Aको h:mm बजे",
            LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे"
        },
        preparse: function(a) {
            return a.replace(/[१२३४५६७८९०]/g, function(a) {
                return Wg[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return Vg[a]
            })
        },
        meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "राति" === b ? a < 4 ? a : a + 12 : "बिहान" === b ? a : "दिउँसो" === b ? a >= 10 ? a : a + 12 : "साँझ" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 3 ? "राति" : a < 12 ? "बिहान" : a < 16 ? "दिउँसो" : a < 20 ? "साँझ" : "राति"
        },
        calendar: {
            sameDay: "[आज] LT",
            nextDay: "[भोलि] LT",
            nextWeek: "[आउँदो] dddd[,] LT",
            lastDay: "[हिजो] LT",
            lastWeek: "[गएको] dddd[,] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sमा",
            past: "%s अगाडि",
            s: "केही क्षण",
            m: "एक मिनेट",
            mm: "%d मिनेट",
            h: "एक घण्टा",
            hh: "%d घण्टा",
            d: "एक दिन",
            dd: "%d दिन",
            M: "एक महिना",
            MM: "%d महिना",
            y: "एक बर्ष",
            yy: "%d बर्ष"
        },
        week: {
            dow: 0,
            doy: 6
        }
    });
    var Xg = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        Yg = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
        Zg = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
        $g = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
    b.defineLocale("nl-be", {
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: function(a, b) {
            return /-MMM-/.test(b) ? Yg[a.month()] : Xg[a.month()]
        },
        monthsRegex: $g,
        monthsShortRegex: $g,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
        monthsParse: Zg,
        longMonthsParse: Zg,
        shortMonthsParse: Zg,
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            m: "één minuut",
            mm: "%d minuten",
            h: "één uur",
            hh: "%d uur",
            d: "één dag",
            dd: "%d dagen",
            M: "één maand",
            MM: "%d maanden",
            y: "één jaar",
            yy: "%d jaar"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(a) {
            return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var _g = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        ah = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
        bh = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i],
        ch = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
    b.defineLocale("nl", {
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: function(a, b) {
            return /-MMM-/.test(b) ? ah[a.month()] : _g[a.month()]
        },
        monthsRegex: ch,
        monthsShortRegex: ch,
        monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
        monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
        monthsParse: bh,
        longMonthsParse: bh,
        shortMonthsParse: bh,
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD-MM-YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[vandaag om] LT",
            nextDay: "[morgen om] LT",
            nextWeek: "dddd [om] LT",
            lastDay: "[gisteren om] LT",
            lastWeek: "[afgelopen] dddd [om] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "over %s",
            past: "%s geleden",
            s: "een paar seconden",
            m: "één minuut",
            mm: "%d minuten",
            h: "één uur",
            hh: "%d uur",
            d: "één dag",
            dd: "%d dagen",
            M: "één maand",
            MM: "%d maanden",
            y: "één jaar",
            yy: "%d jaar"
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal: function(a) {
            return a + (1 === a || 8 === a || a >= 20 ? "ste" : "de")
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("nn", {
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
        weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"),
        weekdaysMin: "su_må_ty_on_to_fr_lø".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY [kl.] H:mm",
            LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
        },
        calendar: {
            sameDay: "[I dag klokka] LT",
            nextDay: "[I morgon klokka] LT",
            nextWeek: "dddd [klokka] LT",
            lastDay: "[I går klokka] LT",
            lastWeek: "[Føregåande] dddd [klokka] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "%s sidan",
            s: "nokre sekund",
            m: "eit minutt",
            mm: "%d minutt",
            h: "ein time",
            hh: "%d timar",
            d: "ein dag",
            dd: "%d dagar",
            M: "ein månad",
            MM: "%d månader",
            y: "eit år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var dh = {
            1: "੧",
            2: "੨",
            3: "੩",
            4: "੪",
            5: "੫",
            6: "੬",
            7: "੭",
            8: "੮",
            9: "੯",
            0: "੦"
        },
        eh = {
            "੧": "1",
            "੨": "2",
            "੩": "3",
            "੪": "4",
            "੫": "5",
            "੬": "6",
            "੭": "7",
            "੮": "8",
            "੯": "9",
            "੦": "0"
        };
    b.defineLocale("pa-in", {
        months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
        monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
        weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"),
        weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
        weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
        longDateFormat: {
            LT: "A h:mm ਵਜੇ",
            LTS: "A h:mm:ss ਵਜੇ",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm ਵਜੇ",
            LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ"
        },
        calendar: {
            sameDay: "[ਅਜ] LT",
            nextDay: "[ਕਲ] LT",
            nextWeek: "dddd, LT",
            lastDay: "[ਕਲ] LT",
            lastWeek: "[ਪਿਛਲੇ] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s ਵਿੱਚ",
            past: "%s ਪਿਛਲੇ",
            s: "ਕੁਝ ਸਕਿੰਟ",
            m: "ਇਕ ਮਿੰਟ",
            mm: "%d ਮਿੰਟ",
            h: "ਇੱਕ ਘੰਟਾ",
            hh: "%d ਘੰਟੇ",
            d: "ਇੱਕ ਦਿਨ",
            dd: "%d ਦਿਨ",
            M: "ਇੱਕ ਮਹੀਨਾ",
            MM: "%d ਮਹੀਨੇ",
            y: "ਇੱਕ ਸਾਲ",
            yy: "%d ਸਾਲ"
        },
        preparse: function(a) {
            return a.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function(a) {
                return eh[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return dh[a]
            })
        },
        meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "ਰਾਤ" === b ? a < 4 ? a : a + 12 : "ਸਵੇਰ" === b ? a : "ਦੁਪਹਿਰ" === b ? a >= 10 ? a : a + 12 : "ਸ਼ਾਮ" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "ਰਾਤ" : a < 10 ? "ਸਵੇਰ" : a < 17 ? "ਦੁਪਹਿਰ" : a < 20 ? "ਸ਼ਾਮ" : "ਰਾਤ"
        },
        week: {
            dow: 0,
            doy: 6
        }
    });
    var fh = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
        gh = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");
    b.defineLocale("pl", {
        months: function(a, b) {
            return "" === b ? "(" + gh[a.month()] + "|" + fh[a.month()] + ")" : /D MMMM/.test(b) ? gh[a.month()] : fh[a.month()]
        },
        monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
        weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
        weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
        weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Dziś o] LT",
            nextDay: "[Jutro o] LT",
            nextWeek: "[W] dddd [o] LT",
            lastDay: "[Wczoraj o] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[W zeszłą niedzielę o] LT";
                    case 3:
                        return "[W zeszłą środę o] LT";
                    case 6:
                        return "[W zeszłą sobotę o] LT";
                    default:
                        return "[W zeszły] dddd [o] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "%s temu",
            s: "kilka sekund",
            m: ih,
            mm: ih,
            h: ih,
            hh: ih,
            d: "1 dzień",
            dd: "%d dni",
            M: "miesiąc",
            MM: ih,
            y: "rok",
            yy: ih
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("pt-br", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
        },
        calendar: {
            sameDay: "[Hoje às] LT",
            nextDay: "[Amanhã às] LT",
            nextWeek: "dddd [às] LT",
            lastDay: "[Ontem às] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "%s atrás",
            s: "poucos segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mês",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº"
    }), b.defineLocale("pt", {
        months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado".split("_"),
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        weekdaysMin: "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY HH:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Hoje às] LT",
            nextDay: "[Amanhã às] LT",
            nextWeek: "dddd [às] LT",
            lastDay: "[Ontem às] LT",
            lastWeek: function() {
                return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "em %s",
            past: "há %s",
            s: "segundos",
            m: "um minuto",
            mm: "%d minutos",
            h: "uma hora",
            hh: "%d horas",
            d: "um dia",
            dd: "%d dias",
            M: "um mês",
            MM: "%d meses",
            y: "um ano",
            yy: "%d anos"
        },
        ordinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("ro", {
        months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
        monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
        weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
        weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY H:mm",
            LLLL: "dddd, D MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[azi la] LT",
            nextDay: "[mâine la] LT",
            nextWeek: "dddd [la] LT",
            lastDay: "[ieri la] LT",
            lastWeek: "[fosta] dddd [la] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "peste %s",
            past: "%s în urmă",
            s: "câteva secunde",
            m: "un minut",
            mm: jh,
            h: "o oră",
            hh: jh,
            d: "o zi",
            dd: jh,
            M: "o lună",
            MM: jh,
            y: "un an",
            yy: jh
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var mh = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];
    b.defineLocale("ru", {
        months: {
            format: "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
            standalone: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_")
        },
        monthsShort: {
            format: "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
            standalone: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_")
        },
        weekdays: {
            standalone: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
            format: "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split("_"),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
        },
        weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
        monthsParse: mh,
        longMonthsParse: mh,
        shortMonthsParse: mh,
        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY г.",
            LLL: "D MMMM YYYY г., HH:mm",
            LLLL: "dddd, D MMMM YYYY г., HH:mm"
        },
        calendar: {
            sameDay: "[Сегодня в] LT",
            nextDay: "[Завтра в] LT",
            lastDay: "[Вчера в] LT",
            nextWeek: function(a) {
                if (a.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
                switch (this.day()) {
                    case 0:
                        return "[В следующее] dddd [в] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[В следующий] dddd [в] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[В следующую] dddd [в] LT"
                }
            },
            lastWeek: function(a) {
                if (a.week() === this.week()) return 2 === this.day() ? "[Во] dddd [в] LT" : "[В] dddd [в] LT";
                switch (this.day()) {
                    case 0:
                        return "[В прошлое] dddd [в] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[В прошлый] dddd [в] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[В прошлую] dddd [в] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "через %s",
            past: "%s назад",
            s: "несколько секунд",
            m: lh,
            mm: lh,
            h: "час",
            hh: lh,
            d: "день",
            dd: lh,
            M: "месяц",
            MM: lh,
            y: "год",
            yy: lh
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM: function(a) {
            return /^(дня|вечера)$/.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "ночи" : a < 12 ? "утра" : a < 17 ? "дня" : "вечера"
        },
        ordinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function(a, b) {
            switch (b) {
                case "M":
                case "d":
                case "DDD":
                    return a + "-й";
                case "D":
                    return a + "-го";
                case "w":
                case "W":
                    return a + "-я";
                default:
                    return a
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("se", {
        months: "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),
        monthsShort: "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),
        weekdays: "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),
        weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),
        weekdaysMin: "s_v_m_g_d_b_L".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "MMMM D. [b.] YYYY",
            LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
            LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
        },
        calendar: {
            sameDay: "[otne ti] LT",
            nextDay: "[ihttin ti] LT",
            nextWeek: "dddd [ti] LT",
            lastDay: "[ikte ti] LT",
            lastWeek: "[ovddit] dddd [ti] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s geažes",
            past: "maŋit %s",
            s: "moadde sekunddat",
            m: "okta minuhta",
            mm: "%d minuhtat",
            h: "okta diimmu",
            hh: "%d diimmut",
            d: "okta beaivi",
            dd: "%d beaivvit",
            M: "okta mánnu",
            MM: "%d mánut",
            y: "okta jahki",
            yy: "%d jagit"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("si", {
        months: "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),
        monthsShort: "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),
        weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),
        weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
        weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "a h:mm",
            LTS: "a h:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYY MMMM D",
            LLL: "YYYY MMMM D, a h:mm",
            LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss"
        },
        calendar: {
            sameDay: "[අද] LT[ට]",
            nextDay: "[හෙට] LT[ට]",
            nextWeek: "dddd LT[ට]",
            lastDay: "[ඊයේ] LT[ට]",
            lastWeek: "[පසුගිය] dddd LT[ට]",
            sameElse: "L"
        },
        relativeTime: {
            future: "%sකින්",
            past: "%sකට පෙර",
            s: "තත්පර කිහිපය",
            m: "මිනිත්තුව",
            mm: "මිනිත්තු %d",
            h: "පැය",
            hh: "පැය %d",
            d: "දිනය",
            dd: "දින %d",
            M: "මාසය",
            MM: "මාස %d",
            y: "වසර",
            yy: "වසර %d"
        },
        ordinalParse: /\d{1,2} වැනි/,
        ordinal: function(a) {
            return a + " වැනි"
        },
        meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
        isPM: function(a) {
            return "ප.ව." === a || "පස් වරු" === a
        },
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "ප.ව." : "පස් වරු" : c ? "පෙ.ව." : "පෙර වරු"
        }
    });
    var nh = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
        oh = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
    b.defineLocale("sk", {
        months: nh,
        monthsShort: oh,
        weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
        weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
        weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[dnes o] LT",
            nextDay: "[zajtra o] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v nedeľu o] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [o] LT";
                    case 3:
                        return "[v stredu o] LT";
                    case 4:
                        return "[vo štvrtok o] LT";
                    case 5:
                        return "[v piatok o] LT";
                    case 6:
                        return "[v sobotu o] LT"
                }
            },
            lastDay: "[včera o] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[minulú nedeľu o] LT";
                    case 1:
                    case 2:
                        return "[minulý] dddd [o] LT";
                    case 3:
                        return "[minulú stredu o] LT";
                    case 4:
                    case 5:
                        return "[minulý] dddd [o] LT";
                    case 6:
                        return "[minulú sobotu o] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "pred %s",
            s: qh,
            m: qh,
            mm: qh,
            h: qh,
            hh: qh,
            d: qh,
            dd: qh,
            M: qh,
            MM: qh,
            y: qh,
            yy: qh
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("sl", {
        months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
        weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
        weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danes ob] LT",
            nextDay: "[jutri ob] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v] [nedeljo] [ob] LT";
                    case 3:
                        return "[v] [sredo] [ob] LT";
                    case 6:
                        return "[v] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[v] dddd [ob] LT"
                }
            },
            lastDay: "[včeraj ob] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[prejšnjo] [nedeljo] [ob] LT";
                    case 3:
                        return "[prejšnjo] [sredo] [ob] LT";
                    case 6:
                        return "[prejšnjo] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prejšnji] dddd [ob] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "čez %s",
            past: "pred %s",
            s: rh,
            m: rh,
            mm: rh,
            h: rh,
            hh: rh,
            d: rh,
            dd: rh,
            M: rh,
            MM: rh,
            y: rh,
            yy: rh
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("sq", {
        months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
        monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
        weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
        weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
        weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
        weekdaysParseExact: !0,
        meridiemParse: /PD|MD/,
        isPM: function(a) {
            return "M" === a.charAt(0)
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "PD" : "MD"
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Sot në] LT",
            nextDay: "[Nesër në] LT",
            nextWeek: "dddd [në] LT",
            lastDay: "[Dje në] LT",
            lastWeek: "dddd [e kaluar në] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "në %s",
            past: "%s më parë",
            s: "disa sekonda",
            m: "një minutë",
            mm: "%d minuta",
            h: "një orë",
            hh: "%d orë",
            d: "një ditë",
            dd: "%d ditë",
            M: "një muaj",
            MM: "%d muaj",
            y: "një vit",
            yy: "%d vite"
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var sh = {
        words: {
            m: ["један минут", "једне минуте"],
            mm: ["минут", "минуте", "минута"],
            h: ["један сат", "једног сата"],
            hh: ["сат", "сата", "сати"],
            dd: ["дан", "дана", "дана"],
            MM: ["месец", "месеца", "месеци"],
            yy: ["година", "године", "година"]
        },
        correctGrammaticalCase: function(a, b) {
            return 1 === a ? b[0] : a >= 2 && a <= 4 ? b[1] : b[2]
        },
        translate: function(a, b, c) {
            var d = sh.words[c];
            return 1 === c.length ? b ? d[0] : d[1] : a + " " + sh.correctGrammaticalCase(a, d)
        }
    };
    b.defineLocale("sr-cyrl", {
        months: "јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split("_"),
        monthsShort: "јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split("_"),
        monthsParseExact: !0,
        weekdays: "недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"),
        weekdaysShort: "нед._пон._уто._сре._чет._пет._суб.".split("_"),
        weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[данас у] LT",
            nextDay: "[сутра у] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[у] [недељу] [у] LT";
                    case 3:
                        return "[у] [среду] [у] LT";
                    case 6:
                        return "[у] [суботу] [у] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[у] dddd [у] LT"
                }
            },
            lastDay: "[јуче у] LT",
            lastWeek: function() {
                var a = ["[прошле] [недеље] [у] LT", "[прошлог] [понедељка] [у] LT", "[прошлог] [уторка] [у] LT", "[прошле] [среде] [у] LT", "[прошлог] [четвртка] [у] LT", "[прошлог] [петка] [у] LT", "[прошле] [суботе] [у] LT"];
                return a[this.day()]
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "за %s",
            past: "пре %s",
            s: "неколико секунди",
            m: sh.translate,
            mm: sh.translate,
            h: sh.translate,
            hh: sh.translate,
            d: "дан",
            dd: sh.translate,
            M: "месец",
            MM: sh.translate,
            y: "годину",
            yy: sh.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    });
    var th = {
        words: {
            m: ["jedan minut", "jedne minute"],
            mm: ["minut", "minute", "minuta"],
            h: ["jedan sat", "jednog sata"],
            hh: ["sat", "sata", "sati"],
            dd: ["dan", "dana", "dana"],
            MM: ["mesec", "meseca", "meseci"],
            yy: ["godina", "godine", "godina"]
        },
        correctGrammaticalCase: function(a, b) {
            return 1 === a ? b[0] : a >= 2 && a <= 4 ? b[1] : b[2]
        },
        translate: function(a, b, c) {
            var d = th.words[c];
            return 1 === c.length ? b ? d[0] : d[1] : a + " " + th.correctGrammaticalCase(a, d)
        }
    };
    b.defineLocale("sr", {
        months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sre._čet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedelju] [u] LT";
                    case 3:
                        return "[u] [sredu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juče u] LT",
            lastWeek: function() {
                var a = ["[prošle] [nedelje] [u] LT", "[prošlog] [ponedeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT"];
                return a[this.day()]
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "za %s",
            past: "pre %s",
            s: "nekoliko sekundi",
            m: th.translate,
            mm: th.translate,
            h: th.translate,
            hh: th.translate,
            d: "dan",
            dd: th.translate,
            M: "mesec",
            MM: th.translate,
            y: "godinu",
            yy: th.translate
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("ss", {
        months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
        monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
        weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
        weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
        weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Namuhla nga] LT",
            nextDay: "[Kusasa nga] LT",
            nextWeek: "dddd [nga] LT",
            lastDay: "[Itolo nga] LT",
            lastWeek: "dddd [leliphelile] [nga] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "nga %s",
            past: "wenteka nga %s",
            s: "emizuzwana lomcane",
            m: "umzuzu",
            mm: "%d emizuzu",
            h: "lihora",
            hh: "%d emahora",
            d: "lilanga",
            dd: "%d emalanga",
            M: "inyanga",
            MM: "%d tinyanga",
            y: "umnyaka",
            yy: "%d iminyaka"
        },
        meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
        meridiem: function(a, b, c) {
            return a < 11 ? "ekuseni" : a < 15 ? "emini" : a < 19 ? "entsambama" : "ebusuku"
        },
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "ekuseni" === b ? a : "emini" === b ? a >= 11 ? a : a + 12 : "entsambama" === b || "ebusuku" === b ? 0 === a ? 0 : a + 12 : void 0
        },
        ordinalParse: /\d{1,2}/,
        ordinal: "%d",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("sv", {
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
        weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
        weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY-MM-DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY [kl.] HH:mm",
            LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Idag] LT",
            nextDay: "[Imorgon] LT",
            lastDay: "[Igår] LT",
            nextWeek: "[På] dddd LT",
            lastWeek: "[I] dddd[s] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "om %s",
            past: "för %s sedan",
            s: "några sekunder",
            m: "en minut",
            mm: "%d minuter",
            h: "en timme",
            hh: "%d timmar",
            d: "en dag",
            dd: "%d dagar",
            M: "en månad",
            MM: "%d månader",
            y: "ett år",
            yy: "%d år"
        },
        ordinalParse: /\d{1,2}(e|a)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "e" : 1 === b ? "a" : 2 === b ? "a" : "e";
            return a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("sw", {
        months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
        weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
        weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
        weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[leo saa] LT",
            nextDay: "[kesho saa] LT",
            nextWeek: "[wiki ijayo] dddd [saat] LT",
            lastDay: "[jana] LT",
            lastWeek: "[wiki iliyopita] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s baadaye",
            past: "tokea %s",
            s: "hivi punde",
            m: "dakika moja",
            mm: "dakika %d",
            h: "saa limoja",
            hh: "masaa %d",
            d: "siku moja",
            dd: "masiku %d",
            M: "mwezi mmoja",
            MM: "miezi %d",
            y: "mwaka mmoja",
            yy: "miaka %d"
        },
        week: {
            dow: 1,
            doy: 7
        }
    });
    var uh = {
            1: "௧",
            2: "௨",
            3: "௩",
            4: "௪",
            5: "௫",
            6: "௬",
            7: "௭",
            8: "௮",
            9: "௯",
            0: "௦"
        },
        vh = {
            "௧": "1",
            "௨": "2",
            "௩": "3",
            "௪": "4",
            "௫": "5",
            "௬": "6",
            "௭": "7",
            "௮": "8",
            "௯": "9",
            "௦": "0"
        };
    b.defineLocale("ta", {
        months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
        monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
        weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),
        weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
        weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, HH:mm",
            LLLL: "dddd, D MMMM YYYY, HH:mm"
        },
        calendar: {
            sameDay: "[இன்று] LT",
            nextDay: "[நாளை] LT",
            nextWeek: "dddd, LT",
            lastDay: "[நேற்று] LT",
            lastWeek: "[கடந்த வாரம்] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s இல்",
            past: "%s முன்",
            s: "ஒரு சில விநாடிகள்",
            m: "ஒரு நிமிடம்",
            mm: "%d நிமிடங்கள்",
            h: "ஒரு மணி நேரம்",
            hh: "%d மணி நேரம்",
            d: "ஒரு நாள்",
            dd: "%d நாட்கள்",
            M: "ஒரு மாதம்",
            MM: "%d மாதங்கள்",
            y: "ஒரு வருடம்",
            yy: "%d ஆண்டுகள்"
        },
        ordinalParse: /\d{1,2}வது/,
        ordinal: function(a) {
            return a + "வது"
        },
        preparse: function(a) {
            return a.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function(a) {
                return vh[a]
            })
        },
        postformat: function(a) {
            return a.replace(/\d/g, function(a) {
                return uh[a]
            })
        },
        meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
        meridiem: function(a, b, c) {
            return a < 2 ? " யாமம்" : a < 6 ? " வைகறை" : a < 10 ? " காலை" : a < 14 ? " நண்பகல்" : a < 18 ? " எற்பாடு" : a < 22 ? " மாலை" : " யாமம்"
        },
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "யாமம்" === b ? a < 2 ? a : a + 12 : "வைகறை" === b || "காலை" === b ? a : "நண்பகல்" === b && a >= 10 ? a : a + 12
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), b.defineLocale("te", {
        months: "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),
        monthsShort: "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),
        monthsParseExact: !0,
        weekdays: "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),
        weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),
        weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"),
        longDateFormat: {
            LT: "A h:mm",
            LTS: "A h:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY, A h:mm",
            LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        calendar: {
            sameDay: "[నేడు] LT",
            nextDay: "[రేపు] LT",
            nextWeek: "dddd, LT",
            lastDay: "[నిన్న] LT",
            lastWeek: "[గత] dddd, LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s లో",
            past: "%s క్రితం",
            s: "కొన్ని క్షణాలు",
            m: "ఒక నిమిషం",
            mm: "%d నిమిషాలు",
            h: "ఒక గంట",
            hh: "%d గంటలు",
            d: "ఒక రోజు",
            dd: "%d రోజులు",
            M: "ఒక నెల",
            MM: "%d నెలలు",
            y: "ఒక సంవత్సరం",
            yy: "%d సంవత్సరాలు"
        },
        ordinalParse: /\d{1,2}వ/,
        ordinal: "%dవ",
        meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "రాత్రి" === b ? a < 4 ? a : a + 12 : "ఉదయం" === b ? a : "మధ్యాహ్నం" === b ? a >= 10 ? a : a + 12 : "సాయంత్రం" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "రాత్రి" : a < 10 ? "ఉదయం" : a < 17 ? "మధ్యాహ్నం" : a < 20 ? "సాయంత్రం" : "రాత్రి"
        },
        week: {
            dow: 0,
            doy: 6
        }
    }), b.defineLocale("tet", {
        months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru".split("_"),
        monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez".split("_"),
        weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu".split("_"),
        weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sext_Sab".split("_"),
        weekdaysMin: "Do_Seg_Te_Ku_Ki_Sex_Sa".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Ohin iha] LT",
            nextDay: "[Aban iha] LT",
            nextWeek: "dddd [iha] LT",
            lastDay: "[Horiseik iha] LT",
            lastWeek: "dddd [semana kotuk] [iha] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "iha %s",
            past: "%s liuba",
            s: "minutu balun",
            m: "minutu ida",
            mm: "minutus %d",
            h: "horas ida",
            hh: "horas %d",
            d: "loron ida",
            dd: "loron %d",
            M: "fulan ida",
            MM: "fulan %d",
            y: "tinan ida",
            yy: "tinan %d"
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("th", {
        months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
        monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),
        monthsParseExact: !0,
        weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
        weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),
        weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "YYYY/MM/DD",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY เวลา H:mm",
            LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm"
        },
        meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
        isPM: function(a) {
            return "หลังเที่ยง" === a
        },
        meridiem: function(a, b, c) {
            return a < 12 ? "ก่อนเที่ยง" : "หลังเที่ยง"
        },
        calendar: {
            sameDay: "[วันนี้ เวลา] LT",
            nextDay: "[พรุ่งนี้ เวลา] LT",
            nextWeek: "dddd[หน้า เวลา] LT",
            lastDay: "[เมื่อวานนี้ เวลา] LT",
            lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "อีก %s",
            past: "%sที่แล้ว",
            s: "ไม่กี่วินาที",
            m: "1 นาที",
            mm: "%d นาที",
            h: "1 ชั่วโมง",
            hh: "%d ชั่วโมง",
            d: "1 วัน",
            dd: "%d วัน",
            M: "1 เดือน",
            MM: "%d เดือน",
            y: "1 ปี",
            yy: "%d ปี"
        }
    }), b.defineLocale("tl-ph", {
        months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
        monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
        weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
        weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
        weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "MM/D/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY HH:mm",
            LLLL: "dddd, MMMM DD, YYYY HH:mm"
        },
        calendar: {
            sameDay: "LT [ngayong araw]",
            nextDay: "[Bukas ng] LT",
            nextWeek: "LT [sa susunod na] dddd",
            lastDay: "LT [kahapon]",
            lastWeek: "LT [noong nakaraang] dddd",
            sameElse: "L"
        },
        relativeTime: {
            future: "sa loob ng %s",
            past: "%s ang nakalipas",
            s: "ilang segundo",
            m: "isang minuto",
            mm: "%d minuto",
            h: "isang oras",
            hh: "%d oras",
            d: "isang araw",
            dd: "%d araw",
            M: "isang buwan",
            MM: "%d buwan",
            y: "isang taon",
            yy: "%d taon"
        },
        ordinalParse: /\d{1,2}/,
        ordinal: function(a) {
            return a
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    var wh = "pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
    b.defineLocale("tlh", {
        months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),
        monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),
        monthsParseExact: !0,
        weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[DaHjaj] LT",
            nextDay: "[wa’leS] LT",
            nextWeek: "LLL",
            lastDay: "[wa’Hu’] LT",
            lastWeek: "LLL",
            sameElse: "L"
        },
        relativeTime: {
            future: xh,
            past: yh,
            s: "puS lup",
            m: "wa’ tup",
            mm: zh,
            h: "wa’ rep",
            hh: zh,
            d: "wa’ jaj",
            dd: zh,
            M: "wa’ jar",
            MM: zh,
            y: "wa’ DIS",
            yy: zh
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    });
    var Bh = {
        1: "'inci",
        5: "'inci",
        8: "'inci",
        70: "'inci",
        80: "'inci",
        2: "'nci",
        7: "'nci",
        20: "'nci",
        50: "'nci",
        3: "'üncü",
        4: "'üncü",
        100: "'üncü",
        6: "'ncı",
        9: "'uncu",
        10: "'uncu",
        30: "'uncu",
        60: "'ıncı",
        90: "'ıncı"
    };
    return b.defineLocale("tr", {
        months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
        monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
        weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
        weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[bugün saat] LT",
            nextDay: "[yarın saat] LT",
            nextWeek: "[haftaya] dddd [saat] LT",
            lastDay: "[dün] LT",
            lastWeek: "[geçen hafta] dddd [saat] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s sonra",
            past: "%s önce",
            s: "birkaç saniye",
            m: "bir dakika",
            mm: "%d dakika",
            h: "bir saat",
            hh: "%d saat",
            d: "bir gün",
            dd: "%d gün",
            M: "bir ay",
            MM: "%d ay",
            y: "bir yıl",
            yy: "%d yıl"
        },
        ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
        ordinal: function(a) {
            if (0 === a) return a + "'ıncı";
            var b = a % 10,
                c = a % 100 - b,
                d = a >= 100 ? 100 : null;
            return a + (Bh[b] || Bh[c] || Bh[d])
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("tzl", {
        months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),
        monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
        weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
        weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
        weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
        longDateFormat: {
            LT: "HH.mm",
            LTS: "HH.mm.ss",
            L: "DD.MM.YYYY",
            LL: "D. MMMM [dallas] YYYY",
            LLL: "D. MMMM [dallas] YYYY HH.mm",
            LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
        },
        meridiemParse: /d\'o|d\'a/i,
        isPM: function(a) {
            return "d'o" === a.toLowerCase()
        },
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "d'o" : "D'O" : c ? "d'a" : "D'A"
        },
        calendar: {
            sameDay: "[oxhi à] LT",
            nextDay: "[demà à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[ieiri à] LT",
            lastWeek: "[sür el] dddd [lasteu à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "osprei %s",
            past: "ja%s",
            s: Ch,
            m: Ch,
            mm: Ch,
            h: Ch,
            hh: Ch,
            d: Ch,
            dd: Ch,
            M: Ch,
            MM: Ch,
            y: Ch,
            yy: Ch
        },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("tzm-latn", {
        months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[asdkh g] LT",
            nextDay: "[aska g] LT",
            nextWeek: "dddd [g] LT",
            lastDay: "[assant g] LT",
            lastWeek: "dddd [g] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dadkh s yan %s",
            past: "yan %s",
            s: "imik",
            m: "minuḍ",
            mm: "%d minuḍ",
            h: "saɛa",
            hh: "%d tassaɛin",
            d: "ass",
            dd: "%d ossan",
            M: "ayowr",
            MM: "%d iyyirn",
            y: "asgas",
            yy: "%d isgasn"
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), b.defineLocale("tzm", {
        months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[ⴰⵙⴷⵅ ⴴ] LT",
            nextDay: "[ⴰⵙⴽⴰ ⴴ] LT",
            nextWeek: "dddd [ⴴ] LT",
            lastDay: "[ⴰⵚⴰⵏⵜ ⴴ] LT",
            lastWeek: "dddd [ⴴ] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
            past: "ⵢⴰⵏ %s",
            s: "ⵉⵎⵉⴽ",
            m: "ⵎⵉⵏⵓⴺ",
            mm: "%d ⵎⵉⵏⵓⴺ",
            h: "ⵙⴰⵄⴰ",
            hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
            d: "ⴰⵙⵙ",
            dd: "%d oⵙⵙⴰⵏ",
            M: "ⴰⵢoⵓⵔ",
            MM: "%d ⵉⵢⵢⵉⵔⵏ",
            y: "ⴰⵙⴳⴰⵙ",
            yy: "%d ⵉⵙⴳⴰⵙⵏ"
        },
        week: {
            dow: 6,
            doy: 12
        }
    }), b.defineLocale("uk", {
        months: {
            format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
            standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_")
        },
        monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
        weekdays: Fh,
        weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD.MM.YYYY",
            LL: "D MMMM YYYY р.",
            LLL: "D MMMM YYYY р., HH:mm",
            LLLL: "dddd, D MMMM YYYY р., HH:mm"
        },
        calendar: {
            sameDay: Gh("[Сьогодні "),
            nextDay: Gh("[Завтра "),
            lastDay: Gh("[Вчора "),
            nextWeek: Gh("[У] dddd ["),
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return Gh("[Минулої] dddd [").call(this);
                    case 1:
                    case 2:
                    case 4:
                        return Gh("[Минулого] dddd [").call(this)
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "за %s",
            past: "%s тому",
            s: "декілька секунд",
            m: Eh,
            mm: Eh,
            h: "годину",
            hh: Eh,
            d: "день",
            dd: Eh,
            M: "місяць",
            MM: Eh,
            y: "рік",
            yy: Eh
        },
        meridiemParse: /ночі|ранку|дня|вечора/,
        isPM: function(a) {
            return /^(дня|вечора)$/.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 4 ? "ночі" : a < 12 ? "ранку" : a < 17 ? "дня" : "вечора"
        },
        ordinalParse: /\d{1,2}-(й|го)/,
        ordinal: function(a, b) {
            switch (b) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return a + "-й";
                case "D":
                    return a + "-го";
                default:
                    return a
            }
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("uz", {
        months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),
        monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
        weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
        weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
        weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "D MMMM YYYY, dddd HH:mm"
        },
        calendar: {
            sameDay: "[Бугун соат] LT [да]",
            nextDay: "[Эртага] LT [да]",
            nextWeek: "dddd [куни соат] LT [да]",
            lastDay: "[Кеча соат] LT [да]",
            lastWeek: "[Утган] dddd [куни соат] LT [да]",
            sameElse: "L"
        },
        relativeTime: {
            future: "Якин %s ичида",
            past: "Бир неча %s олдин",
            s: "фурсат",
            m: "бир дакика",
            mm: "%d дакика",
            h: "бир соат",
            hh: "%d соат",
            d: "бир кун",
            dd: "%d кун",
            M: "бир ой",
            MM: "%d ой",
            y: "бир йил",
            yy: "%d йил"
        },
        week: {
            dow: 1,
            doy: 7
        }
    }), b.defineLocale("vi", {
        months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
        monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
        monthsParseExact: !0,
        weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
        weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysParseExact: !0,
        meridiemParse: /sa|ch/i,
        isPM: function(a) {
            return /^ch$/i.test(a)
        },
        meridiem: function(a, b, c) {
            return a < 12 ? c ? "sa" : "SA" : c ? "ch" : "CH"
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM [năm] YYYY",
            LLL: "D MMMM [năm] YYYY HH:mm",
            LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
            l: "DD/M/YYYY",
            ll: "D MMM YYYY",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd, D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Hôm nay lúc] LT",
            nextDay: "[Ngày mai lúc] LT",
            nextWeek: "dddd [tuần tới lúc] LT",
            lastDay: "[Hôm qua lúc] LT",
            lastWeek: "dddd [tuần rồi lúc] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s tới",
            past: "%s trước",
            s: "vài giây",
            m: "một phút",
            mm: "%d phút",
            h: "một giờ",
            hh: "%d giờ",
            d: "một ngày",
            dd: "%d ngày",
            M: "một tháng",
            MM: "%d tháng",
            y: "một năm",
            yy: "%d năm"
        },
        ordinalParse: /\d{1,2}/,
        ordinal: function(a) {
            return a
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("x-pseudo", {
        months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),
        monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),
        monthsParseExact: !0,
        weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),
        weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),
        weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[T~ódá~ý át] LT",
            nextDay: "[T~ómó~rró~w át] LT",
            nextWeek: "dddd [át] LT",
            lastDay: "[Ý~ést~érdá~ý át] LT",
            lastWeek: "[L~ást] dddd [át] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "í~ñ %s",
            past: "%s á~gó",
            s: "á ~féw ~sécó~ñds",
            m: "á ~míñ~úté",
            mm: "%d m~íñú~tés",
            h: "á~ñ hó~úr",
            hh: "%d h~óúrs",
            d: "á ~dáý",
            dd: "%d d~áýs",
            M: "á ~móñ~th",
            MM: "%d m~óñt~hs",
            y: "á ~ýéár",
            yy: "%d ý~éárs"
        },
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(a) {
            var b = a % 10,
                c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("yo", {
        months: "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"),
        monthsShort: "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"),
        weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"),
        weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"),
        weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"),
        longDateFormat: {
            LT: "h:mm A",
            LTS: "h:mm:ss A",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY h:mm A",
            LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        calendar: {
            sameDay: "[Ònì ni] LT",
            nextDay: "[Ọ̀la ni] LT",
            nextWeek: "dddd [Ọsẹ̀ tón'bọ] [ni] LT",
            lastDay: "[Àna ni] LT",
            lastWeek: "dddd [Ọsẹ̀ tólọ́] [ni] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "ní %s",
            past: "%s kọjá",
            s: "ìsẹjú aayá die",
            m: "ìsẹjú kan",
            mm: "ìsẹjú %d",
            h: "wákati kan",
            hh: "wákati %d",
            d: "ọjọ́ kan",
            dd: "ọjọ́ %d",
            M: "osù kan",
            MM: "osù %d",
            y: "ọdún kan",
            yy: "ọdún %d"
        },
        ordinalParse: /ọjọ́\s\d{1,2}/,
        ordinal: "ọjọ́ %d",
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("zh-cn", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "Ah点mm分",
            LTS: "Ah点m分s秒",
            L: "YYYY-MM-DD",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日Ah点mm分",
            LLLL: "YYYY年MMMD日ddddAh点mm分",
            l: "YYYY-MM-DD",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日Ah点mm分",
            llll: "YYYY年MMMD日ddddAh点mm分"
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "凌晨" === b || "早上" === b || "上午" === b ? a : "下午" === b || "晚上" === b ? a + 12 : a >= 11 ? a : a + 12
        },
        meridiem: function(a, b, c) {
            var d = 100 * a + b;
            return d < 600 ? "凌晨" : d < 900 ? "早上" : d < 1130 ? "上午" : d < 1230 ? "中午" : d < 1800 ? "下午" : "晚上"
        },
        calendar: {
            sameDay: function() {
                return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT"
            },
            nextDay: function() {
                return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT"
            },
            lastDay: function() {
                return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT"
            },
            nextWeek: function() {
                var a, c;
                return a = b().startOf("week"), c = this.diff(a, "days") >= 7 ? "[下]" : "[本]", 0 === this.minutes() ? c + "dddAh点整" : c + "dddAh点mm"
            },
            lastWeek: function() {
                var a, c;
                return a = b().startOf("week"), c = this.unix() < a.unix() ? "[上]" : "[本]", 0 === this.minutes() ? c + "dddAh点整" : c + "dddAh点mm"
            },
            sameElse: "LL"
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function(a, b) {
            switch (b) {
                case "d":
                case "D":
                case "DDD":
                    return a + "日";
                case "M":
                    return a + "月";
                case "w":
                case "W":
                    return a + "周";
                default:
                    return a
            }
        },
        relativeTime: {
            future: "%s内",
            past: "%s前",
            s: "几秒",
            m: "1 分钟",
            mm: "%d 分钟",
            h: "1 小时",
            hh: "%d 小时",
            d: "1 天",
            dd: "%d 天",
            M: "1 个月",
            MM: "%d 个月",
            y: "1 年",
            yy: "%d 年"
        },
        week: {
            dow: 1,
            doy: 4
        }
    }), b.defineLocale("zh-hk", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "Ah點mm分",
            LTS: "Ah點m分s秒",
            L: "YYYY年MMMD日",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日Ah點mm分",
            LLLL: "YYYY年MMMD日ddddAh點mm分",
            l: "YYYY年MMMD日",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日Ah點mm分",
            llll: "YYYY年MMMD日ddddAh點mm分"
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "凌晨" === b || "早上" === b || "上午" === b ? a : "中午" === b ? a >= 11 ? a : a + 12 : "下午" === b || "晚上" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            var d = 100 * a + b;
            return d < 600 ? "凌晨" : d < 900 ? "早上" : d < 1130 ? "上午" : d < 1230 ? "中午" : d < 1800 ? "下午" : "晚上"
        },
        calendar: {
            sameDay: "[今天]LT",
            nextDay: "[明天]LT",
            nextWeek: "[下]ddddLT",
            lastDay: "[昨天]LT",
            lastWeek: "[上]ddddLT",
            sameElse: "L"
        },
        ordinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function(a, b) {
            switch (b) {
                case "d":
                case "D":
                case "DDD":
                    return a + "日";
                case "M":
                    return a + "月";
                case "w":
                case "W":
                    return a + "週";
                default:
                    return a
            }
        },
        relativeTime: {
            future: "%s內",
            past: "%s前",
            s: "幾秒",
            m: "1 分鐘",
            mm: "%d 分鐘",
            h: "1 小時",
            hh: "%d 小時",
            d: "1 天",
            dd: "%d 天",
            M: "1 個月",
            MM: "%d 個月",
            y: "1 年",
            yy: "%d 年"
        }
    }), b.defineLocale("zh-tw", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "Ah點mm分",
            LTS: "Ah點m分s秒",
            L: "YYYY年MMMD日",
            LL: "YYYY年MMMD日",
            LLL: "YYYY年MMMD日Ah點mm分",
            LLLL: "YYYY年MMMD日ddddAh點mm分",
            l: "YYYY年MMMD日",
            ll: "YYYY年MMMD日",
            lll: "YYYY年MMMD日Ah點mm分",
            llll: "YYYY年MMMD日ddddAh點mm分"
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function(a, b) {
            return 12 === a && (a = 0), "凌晨" === b || "早上" === b || "上午" === b ? a : "中午" === b ? a >= 11 ? a : a + 12 : "下午" === b || "晚上" === b ? a + 12 : void 0
        },
        meridiem: function(a, b, c) {
            var d = 100 * a + b;
            return d < 600 ? "凌晨" : d < 900 ? "早上" : d < 1130 ? "上午" : d < 1230 ? "中午" : d < 1800 ? "下午" : "晚上"
        },
        calendar: {
            sameDay: "[今天]LT",
            nextDay: "[明天]LT",
            nextWeek: "[下]ddddLT",
            lastDay: "[昨天]LT",
            lastWeek: "[上]ddddLT",
            sameElse: "L"
        },
        ordinalParse: /\d{1,2}(日|月|週)/,
        ordinal: function(a, b) {
            switch (b) {
                case "d":
                case "D":
                case "DDD":
                    return a + "日";
                case "M":
                    return a + "月";
                case "w":
                case "W":
                    return a + "週";
                default:
                    return a
            }
        },
        relativeTime: {
            future: "%s內",
            past: "%s前",
            s: "幾秒",
            m: "1 分鐘",
            mm: "%d 分鐘",
            h: "1 小時",
            hh: "%d 小時",
            d: "1 天",
            dd: "%d 天",
            M: "1 個月",
            MM: "%d 個月",
            y: "1 年",
            yy: "%d 年"
        }
    }), b.locale("en"), b
});


/**
 *  Ajax Autocomplete for jQuery, version 1.4.1
 *  (c) 2017 Tomas Kirda
 *
 *  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
 *  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
 */
! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports && "function" == typeof require ? require("jquery") : jQuery)
}(function(a) {
    "use strict";

    function b(c, d) {
        var e = this;
        e.element = c, e.el = a(c), e.suggestions = [], e.badQueries = [], e.selectedIndex = -1, e.currentValue = e.element.value, e.timeoutId = null, e.cachedResponse = {}, e.onChangeTimeout = null, e.onChange = null, e.isLocal = !1, e.suggestionsContainer = null, e.noSuggestionsContainer = null, e.options = a.extend({}, b.defaults, d), e.classes = {
            selected: "autocomplete-selected",
            suggestion: "autocomplete-suggestion"
        }, e.hint = null, e.hintValue = "", e.selection = null, e.initialize(), e.setOptions(d)
    }

    function c(a, b, c) {
        return -1 !== a.value.toLowerCase().indexOf(c)
    }

    function d(b) {
        return "string" == typeof b ? a.parseJSON(b) : b
    }

    function e(a, b) {
        if (!b) return a.value;
        var c = "(" + g.escapeRegExChars(b) + ")";
        return a.value.replace(new RegExp(c, "gi"), "<strong>$1</strong>").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;(\/?strong)&gt;/g, "<$1>")
    }

    function f(a, b) {
        return '<div class="autocomplete-group">' + b + "</div>"
    }
    var g = function() {
            return {
                escapeRegExChars: function(a) {
                    return a.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                },
                createNode: function(a) {
                    var b = document.createElement("div");
                    return b.className = a, b.style.position = "absolute", b.style.display = "none", b
                }
            }
        }(),
        h = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        },
        i = a.noop;
    b.utils = g, a.Autocomplete = b, b.defaults = {
        ajaxSettings: {},
        autoSelectFirst: !1,
        appendTo: "body",
        serviceUrl: null,
        lookup: null,
        onSelect: null,
        width: "auto",
        minChars: 1,
        maxHeight: 300,
        deferRequestBy: 0,
        params: {},
        formatResult: e,
        formatGroup: f,
        delimiter: null,
        zIndex: 9999,
        type: "GET",
        noCache: !1,
        onSearchStart: i,
        onSearchComplete: i,
        onSearchError: i,
        preserveInput: !1,
        containerClass: "autocomplete-suggestions",
        tabDisabled: !1,
        dataType: "text",
        currentRequest: null,
        triggerSelectOnValidInput: !0,
        preventBadQueries: !0,
        lookupFilter: c,
        paramName: "query",
        transformResult: d,
        showNoSuggestionNotice: !1,
        noSuggestionNotice: "No results",
        orientation: "bottom",
        forceFixPosition: !1
    }, b.prototype = {
        initialize: function() {
            var c, d = this,
                e = "." + d.classes.suggestion,
                f = d.classes.selected,
                g = d.options;
            d.element.setAttribute("autocomplete", "off"), d.noSuggestionsContainer = a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0), d.suggestionsContainer = b.utils.createNode(g.containerClass), c = a(d.suggestionsContainer), c.appendTo(g.appendTo || "body"), "auto" !== g.width && c.css("width", g.width), c.on("mouseover.autocomplete", e, function() {
                d.activate(a(this).data("index"))
            }), c.on("mouseout.autocomplete", function() {
                d.selectedIndex = -1, c.children("." + f).removeClass(f)
            }), c.on("click.autocomplete", e, function() {
                d.select(a(this).data("index"))
            }), c.on("click.autocomplete", function() {
                clearTimeout(d.blurTimeoutId)
            }), d.fixPositionCapture = function() {
                d.visible && d.fixPosition()
            }, a(window).on("resize.autocomplete", d.fixPositionCapture), d.el.on("keydown.autocomplete", function(a) {
                d.onKeyPress(a)
            }), d.el.on("keyup.autocomplete", function(a) {
                d.onKeyUp(a)
            }), d.el.on("blur.autocomplete", function() {
                d.onBlur()
            }), d.el.on("focus.autocomplete", function() {
                d.onFocus()
            }), d.el.on("change.autocomplete", function(a) {
                d.onKeyUp(a)
            }), d.el.on("input.autocomplete", function(a) {
                d.onKeyUp(a)
            })
        },
        onFocus: function() {
            var a = this;
            a.fixPosition(), a.el.val().length >= a.options.minChars && a.onValueChange()
        },
        onBlur: function() {
            var a = this;
            a.blurTimeoutId = setTimeout(function() {
                a.hide()
            }, 200)
        },
        abortAjax: function() {
            var a = this;
            a.currentRequest && (a.currentRequest.abort(), a.currentRequest = null)
        },
        setOptions: function(b) {
            var c = this,
                d = c.options;
            this.options = a.extend({}, d, b), c.isLocal = a.isArray(d.lookup), c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)), d.orientation = c.validateOrientation(d.orientation, "bottom"), a(c.suggestionsContainer).css({
                "max-height": d.maxHeight + "px",
                width: d.width + "px",
                "z-index": d.zIndex
            })
        },
        clearCache: function() {
            this.cachedResponse = {}, this.badQueries = []
        },
        clear: function() {
            this.clearCache(), this.currentValue = "", this.suggestions = []
        },
        disable: function() {
            var a = this;
            a.disabled = !0, clearTimeout(a.onChangeTimeout), a.abortAjax()
        },
        enable: function() {
            this.disabled = !1
        },
        fixPosition: function() {
            var b = this,
                c = a(b.suggestionsContainer),
                d = c.parent().get(0);
            if (d === document.body || b.options.forceFixPosition) {
                var e = b.options.orientation,
                    f = c.outerHeight(),
                    g = b.el.outerHeight(),
                    h = b.el.offset(),
                    i = {
                        top: h.top,
                        left: h.left
                    };
                if ("auto" === e) {
                    var j = a(window).height(),
                        k = a(window).scrollTop(),
                        l = -k + h.top - f,
                        m = k + j - (h.top + g + f);
                    e = Math.max(l, m) === l ? "top" : "bottom"
                }
                if ("top" === e ? i.top += -f : i.top += g, d !== document.body) {
                    var n, o = c.css("opacity");
                    b.visible || c.css("opacity", 0).show(), n = c.offsetParent().offset(), i.top -= n.top, i.left -= n.left, b.visible || c.css("opacity", o).hide()
                }
                "auto" === b.options.width && (i.width = b.el.outerWidth() + "px"), c.css(i)
            }
        },
        isCursorAtEnd: function() {
            var a, b = this,
                c = b.el.val().length,
                d = b.element.selectionStart;
            return "number" == typeof d ? d === c : document.selection ? (a = document.selection.createRange(), a.moveStart("character", -c), c === a.text.length) : !0
        },
        onKeyPress: function(a) {
            var b = this;
            if (!b.disabled && !b.visible && a.which === h.DOWN && b.currentValue) return void b.suggest();
            if (!b.disabled && b.visible) {
                switch (a.which) {
                    case h.ESC:
                        b.el.val(b.currentValue), b.hide();
                        break;
                    case h.RIGHT:
                        if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
                            b.selectHint();
                            break
                        }
                        return;
                    case h.TAB:
                        if (b.hint && b.options.onHint) return void b.selectHint();
                        if (-1 === b.selectedIndex) return void b.hide();
                        if (b.select(b.selectedIndex), b.options.tabDisabled === !1) return;
                        break;
                    case h.RETURN:
                        if (-1 === b.selectedIndex) return void b.hide();
                        b.select(b.selectedIndex);
                        break;
                    case h.UP:
                        b.moveUp();
                        break;
                    case h.DOWN:
                        b.moveDown();
                        break;
                    default:
                        return
                }
                a.stopImmediatePropagation(), a.preventDefault()
            }
        },
        onKeyUp: function(a) {
            var b = this;
            if (!b.disabled) {
                switch (a.which) {
                    case h.UP:
                    case h.DOWN:
                        return
                }
                clearTimeout(b.onChangeTimeout), b.currentValue !== b.el.val() && (b.findBestHint(), b.options.deferRequestBy > 0 ? b.onChangeTimeout = setTimeout(function() {
                    b.onValueChange()
                }, b.options.deferRequestBy) : b.onValueChange())
            }
        },
        onValueChange: function() {
            var b = this,
                c = b.options,
                d = b.el.val(),
                e = b.getQuery(d);
            return b.selection && b.currentValue !== e && (b.selection = null, (c.onInvalidateSelection || a.noop).call(b.element)), clearTimeout(b.onChangeTimeout), b.currentValue = d, b.selectedIndex = -1, c.triggerSelectOnValidInput && b.isExactMatch(e) ? void b.select(0) : void(e.length < c.minChars ? b.hide() : b.getSuggestions(e))
        },
        isExactMatch: function(a) {
            var b = this.suggestions;
            return 1 === b.length && b[0].value.toLowerCase() === a.toLowerCase()
        },
        getQuery: function(b) {
            var c, d = this.options.delimiter;
            return d ? (c = b.split(d), a.trim(c[c.length - 1])) : b
        },
        getSuggestionsLocal: function(b) {
            var c, d = this,
                e = d.options,
                f = b.toLowerCase(),
                g = e.lookupFilter,
                h = parseInt(e.lookupLimit, 10);
            return c = {
                suggestions: a.grep(e.lookup, function(a) {
                    return g(a, b, f)
                })
            }, h && c.suggestions.length > h && (c.suggestions = c.suggestions.slice(0, h)), c
        },
        getSuggestions: function(b) {
            var c, d, e, f, g = this,
                h = g.options,
                i = h.serviceUrl;
            if (h.params[h.paramName] = b, h.onSearchStart.call(g.element, h.params) !== !1) {
                if (d = h.ignoreParams ? null : h.params, a.isFunction(h.lookup)) return void h.lookup(b, function(a) {
                    g.suggestions = a.suggestions, g.suggest(), h.onSearchComplete.call(g.element, b, a.suggestions)
                });
                g.isLocal ? c = g.getSuggestionsLocal(b) : (a.isFunction(i) && (i = i.call(g.element, b)), e = i + "?" + a.param(d || {}), c = g.cachedResponse[e]), c && a.isArray(c.suggestions) ? (g.suggestions = c.suggestions, g.suggest(), h.onSearchComplete.call(g.element, b, c.suggestions)) : g.isBadQuery(b) ? h.onSearchComplete.call(g.element, b, []) : (g.abortAjax(), f = {
                    url: i,
                    data: d,
                    type: h.type,
                    dataType: h.dataType
                }, a.extend(f, h.ajaxSettings), g.currentRequest = a.ajax(f).done(function(a) {
                    var c;
                    g.currentRequest = null, c = h.transformResult(a, b), g.processResponse(c, b, e), h.onSearchComplete.call(g.element, b, c.suggestions)
                }).fail(function(a, c, d) {
                    h.onSearchError.call(g.element, b, a, c, d)
                }))
            }
        },
        isBadQuery: function(a) {
            if (!this.options.preventBadQueries) return !1;
            for (var b = this.badQueries, c = b.length; c--;)
                if (0 === a.indexOf(b[c])) return !0;
            return !1
        },
        hide: function() {
            var b = this,
                c = a(b.suggestionsContainer);
            a.isFunction(b.options.onHide) && b.visible && b.options.onHide.call(b.element, c), b.visible = !1, b.selectedIndex = -1, clearTimeout(b.onChangeTimeout), a(b.suggestionsContainer).hide(), b.signalHint(null)
        },
        suggest: function() {
            if (!this.suggestions.length) return void(this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide());
            var b, c = this,
                d = c.options,
                e = d.groupBy,
                f = d.formatResult,
                g = c.getQuery(c.currentValue),
                h = c.classes.suggestion,
                i = c.classes.selected,
                j = a(c.suggestionsContainer),
                k = a(c.noSuggestionsContainer),
                l = d.beforeRender,
                m = "",
                n = function(a, c) {
                    var f = a.data[e];
                    return b === f ? "" : (b = f, d.formatGroup(a, b))
                };
            return d.triggerSelectOnValidInput && c.isExactMatch(g) ? void c.select(0) : (a.each(c.suggestions, function(a, b) {
                e && (m += n(b, g, a)), m += '<div class="' + h + '" data-index="' + a + '">' + f(b, g, a) + "</div>"
            }), this.adjustContainerWidth(), k.detach(), j.html(m), a.isFunction(l) && l.call(c.element, j, c.suggestions), c.fixPosition(), j.show(), d.autoSelectFirst && (c.selectedIndex = 0, j.scrollTop(0), j.children("." + h).first().addClass(i)), c.visible = !0, void c.findBestHint())
        },
        noSuggestions: function() {
            var b = this,
                c = b.options.beforeRender,
                d = a(b.suggestionsContainer),
                e = a(b.noSuggestionsContainer);
            this.adjustContainerWidth(), e.detach(), d.empty(), d.append(e), a.isFunction(c) && c.call(b.element, d, b.suggestions), b.fixPosition(), d.show(), b.visible = !0
        },
        adjustContainerWidth: function() {
            var b, c = this,
                d = c.options,
                e = a(c.suggestionsContainer);
            "auto" === d.width ? (b = c.el.outerWidth(), e.css("width", b > 0 ? b : 300)) : "flex" === d.width && e.css("width", "")
        },
        findBestHint: function() {
            var b = this,
                c = b.el.val().toLowerCase(),
                d = null;
            c && (a.each(b.suggestions, function(a, b) {
                var e = 0 === b.value.toLowerCase().indexOf(c);
                return e && (d = b), !e
            }), b.signalHint(d))
        },
        signalHint: function(b) {
            var c = "",
                d = this;
            b && (c = d.currentValue + b.value.substr(d.currentValue.length)), d.hintValue !== c && (d.hintValue = c, d.hint = b, (this.options.onHint || a.noop)(c))
        },
        verifySuggestionsFormat: function(b) {
            return b.length && "string" == typeof b[0] ? a.map(b, function(a) {
                return {
                    value: a,
                    data: null
                }
            }) : b
        },
        validateOrientation: function(b, c) {
            return b = a.trim(b || "").toLowerCase(), -1 === a.inArray(b, ["auto", "bottom", "top"]) && (b = c), b
        },
        processResponse: function(a, b, c) {
            var d = this,
                e = d.options;
            a.suggestions = d.verifySuggestionsFormat(a.suggestions), e.noCache || (d.cachedResponse[c] = a, e.preventBadQueries && !a.suggestions.length && d.badQueries.push(b)), b === d.getQuery(d.currentValue) && (d.suggestions = a.suggestions, d.suggest())
        },
        activate: function(b) {
            var c, d = this,
                e = d.classes.selected,
                f = a(d.suggestionsContainer),
                g = f.find("." + d.classes.suggestion);
            return f.find("." + e).removeClass(e), d.selectedIndex = b, -1 !== d.selectedIndex && g.length > d.selectedIndex ? (c = g.get(d.selectedIndex), a(c).addClass(e), c) : null
        },
        selectHint: function() {
            var b = this,
                c = a.inArray(b.hint, b.suggestions);
            b.select(c)
        },
        select: function(a) {
            var b = this;
            b.hide(), b.onSelect(a)
        },
        moveUp: function() {
            var b = this;
            if (-1 !== b.selectedIndex) return 0 === b.selectedIndex ? (a(b.suggestionsContainer).children().first().removeClass(b.classes.selected), b.selectedIndex = -1, b.el.val(b.currentValue), void b.findBestHint()) : void b.adjustScroll(b.selectedIndex - 1)
        },
        moveDown: function() {
            var a = this;
            a.selectedIndex !== a.suggestions.length - 1 && a.adjustScroll(a.selectedIndex + 1)
        },
        adjustScroll: function(b) {
            var c = this,
                d = c.activate(b);
            if (d) {
                var e, f, g, h = a(d).outerHeight();
                e = d.offsetTop, f = a(c.suggestionsContainer).scrollTop(), g = f + c.options.maxHeight - h, f > e ? a(c.suggestionsContainer).scrollTop(e) : e > g && a(c.suggestionsContainer).scrollTop(e - c.options.maxHeight + h), c.options.preserveInput || c.el.val(c.getValue(c.suggestions[b].value)), c.signalHint(null)
            }
        },
        onSelect: function(b) {
            var c = this,
                d = c.options.onSelect,
                e = c.suggestions[b];
            c.currentValue = c.getValue(e.value), c.currentValue === c.el.val() || c.options.preserveInput || c.el.val(c.currentValue), c.signalHint(null), c.suggestions = [], c.selection = e, a.isFunction(d) && d.call(c.element, e)
        },
        getValue: function(a) {
            var b, c, d = this,
                e = d.options.delimiter;
            return e ? (b = d.currentValue, c = b.split(e), 1 === c.length ? a : b.substr(0, b.length - c[c.length - 1].length) + a) : a
        },
        dispose: function() {
            var b = this;
            b.el.off(".autocomplete").removeData("autocomplete"), a(window).off("resize.autocomplete", b.fixPositionCapture), a(b.suggestionsContainer).remove()
        }
    }, a.fn.devbridgeAutocomplete = function(c, d) {
        var e = "autocomplete";
        return arguments.length ? this.each(function() {
            var f = a(this),
                g = f.data(e);
            "string" == typeof c ? g && "function" == typeof g[c] && g[c](d) : (g && g.dispose && g.dispose(), g = new b(this, c), f.data(e, g))
        }) : this.first().data(e)
    }, a.fn.autocomplete || (a.fn.autocomplete = a.fn.devbridgeAutocomplete)
});