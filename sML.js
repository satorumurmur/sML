/*!
 *                                                                                                                         (℠)
 *  # sML.js | I'm a Simple and Middling Library.
 *
 *  * Copyright (c) Satoru MATSUSHIMA - https://github.com/satorumurmur/sML
 *  * Licensed under the MIT license. - http://www.opensource.org/licenses/mit-license.php
 *
 */




//==============================================================================================================================================

(sML => { if(typeof module != 'undefined' && module.exports) module.exports = sML; else (typeof global != 'undefined' ? global : typeof this != 'undefined' ? this : self).sML = sML; })((() => { 'use strict';

//==============================================================================================================================================




const sML = { version: '1.0.13' };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Polarstar

//----------------------------------------------------------------------------------------------------------------------------------------------


const nUA = navigator.userAgent;

const getVersion = (Prefix, Reference) => parseFloat(nUA.replace(new RegExp('^.*' + Prefix + '[ :\\/]?(\\d+([\\._]\\d+)?).*$'), Reference ? Reference : '$1').replace(/_/g, '.')) || undefined;

sML.OperatingSystem = (OS => {
         if(/ \(iP(hone|ad|od touch);/.test(nUA)) OS.iOS     = getVersion('CPU (iPhone )?OS', '$2');
    else if(      /Mac OS X 10[\._]\d/.test(nUA)) OS.macOS   = getVersion('Mac OS X ');
    else if(        /Windows( NT)? \d/.test(nUA)) OS.Windows = (W => W >= 10 ? W : W >= 6.3 ? 8.1 : W >= 6.2 ? 8 : W >= 6.1 ? 7 : W)(getVersion('Windows NT') || getVersion('Windows'));
    else if(              /Android \d/.test(nUA)) OS.Android = getVersion('Android');
    else if(                    /CrOS/.test(nUA)) OS.Chrome  = true;
    else if(                    /X11;/.test(nUA)) OS.Linux   = true;
    else if(                 /Firefox/.test(nUA)) OS.Firefox = true;
    return OS;
})({});

sML.UserAgent = (UA => {
    if(/Gecko\/\d/.test(nUA)) {
        UA.Gecko = getVersion('rv');
        if(/Firefox\/\d/.test(nUA)) UA.Firefox = getVersion('Firefox');
        //UA.VendorPrefix = 'moz';
    } else if(/Edge\/\d/.test(nUA)) {
        UA.Edge = getVersion('Edge');
        //UA.VendorPrefix = '';
    } else if(/Chrome\/\d/.test(nUA)) {
        UA.Blink = getVersion('Chrome') || true;
             if( /OPR\/\d/.test(nUA)) UA.Opera  = getVersion('OPR');
        else if(/Silk\/\d/.test(nUA)) UA.Silk   = getVersion('Silk');
        else                          UA.Chrome = UA.Blink;
        //UA.VendorPrefix = '';
    } else if(/AppleWebKit\/\d/.test(nUA)) {
        UA.WebKit = getVersion('AppleWebKit');
             if(   /CriOS \d/.test(nUA)) UA.Chrome  = getVersion('CriOS');
        else if(   /FxiOS \d/.test(nUA)) UA.Firefox = getVersion('FxiOS');
        else if(/Version\/\d/.test(nUA)) UA.Safari  = getVersion('Version');
        //UA.VendorPrefix = 'webkit';
    } else if(/Trident\/\d/.test(nUA)) {
        UA.Trident          = getVersion('Trident'); 
        UA.InternetExplorer = getVersion('rv') || getVersion('MSIE');
        //UA.VendorPrefix = 'ms';
    }
    //try { UA.Flash = parseFloat(navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin.description.replace(/^.+?([\d\.]+).*$/, '$1')); } catch(Err) {}
    return UA;
})({});

sML.Environments = ['OperatingSystem', 'UserAgent'].reduce((Env, OS_UA) => { for(const Param in sML[OS_UA]) if(sML[OS_UA][Param]) Env.push(Param); return Env; }, []);

Object.defineProperties(sML, {
    OS:  { get: () => sML.OperatingSystem, set: (V) => sML.OperatingSystem = V },
    UA:  { get: () => sML.UserAgent,       set: (V) => sML.UserAgent       = V },
    Env: { get: () => sML.Environments,    set: (V) => sML.Environments    = V }
});




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Utilities

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.forEach = (Col, fun) => Col.forEach ? Col.forEach(fun) : Array.prototype.forEach.call(Col, fun);

sML.applyRtL = (L, R, ExceptFunctions) => {
    if(ExceptFunctions) { for(const Pro in R) if(typeof L[Pro] != 'function' && typeof R[Pro] != 'function') L[Pro] = R[Pro]; }
    else                { for(const Pro in R)                                                                L[Pro] = R[Pro]; }
    return L;
};

sML.replace = (Str, Reps) => {
    if(!(Reps instanceof Array)) Reps = [Reps];
    for(let l = Reps.length, i = 0; i < l; i++) Str = Str.replace(Reps[i][0], Reps[i][1]);
    return Str;
};

sML.limitMin    = (Num, Min     ) =>                      (Num < Min) ? Min :                     Num;
sML.limitMax    = (Num,      Max) =>                                          (Max < Num) ? Max : Num;
sML.limitMinMax = (Num, Min, Max) => (Max < Min) ? null : (Num < Min) ? Min : (Max < Num) ? Max : Num;

sML.random = (A, B) => {
         if(isNaN(A) && isNaN(B)) A = 0, B = 1;
    else if(isNaN(A)            ) A = 0       ;
    else if(            isNaN(B))        B = 0;
    const Min = Math.min(A, B), Max = Math.max(A, B);
    return Math.floor(Math.random() * (Max - Min + 1)) + Min;
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Object / DOM / Elements

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.edit = (Obj, Pros) => {
    if(Obj.tagName) {
        for(const Pro in Pros) {
            if(Pro == 'on' || Pro == 'style') continue;
            if(/^data-/.test(Pro)) Obj.setAttribute(Pro, Pros[Pro]);
            else                   Obj[Pro] = Pros[Pro];
        }
        if(Pros.on) for(const EN in Pros.on) Obj.addEventListener(EN, Pros.on[EN]);
        if(Pros.style) sML.CSS.setStyle(Obj, Pros.style);
    }
    else for(const Pro in Pros)    Obj[Pro] = Pros[Pro];
    return Obj;
};

sML.create = (Tag, Pros) => sML.edit(document.createElement(Tag), Pros);

sML.hatch = (HTML) => {
    const Egg = sML.create('div', { innerHTML: HTML }), Chick = document.createDocumentFragment();
    Array.prototype.forEach.call(Egg.childNodes, () => Chick.appendChild(Egg.firstChild));
    return Chick;
};

sML.clone = (Obj) => {
    const fun = new Function();
    fun.prototype = Obj;
    return new fun();
};

sML.replaceClass = (Ele, Old, New) => { if(Ele.classList.contains(Old)) Ele.classList.remove(Old); return Ele.classList.add(New); };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- CSS

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.CSS = {
    getSMLStyleSheet: (Doc) => { if(!Doc) Doc = document;
        if(!Doc.sMLStyle) {
            Doc.sMLStyle = Doc.createElement('style');
            Doc.sMLStyle.appendChild(Doc.createTextNode(''));
            Doc.head.appendChild(Doc.sMLStyle);
        }
        return Doc.sMLStyle.sheet;
    },
    appendRule: function(Sel, Sty) { let Doc = document; if(typeof arguments[0] != 'string') Doc = arguments[0], Sel = arguments[1], Sty = arguments[2];
        const SS = this.getSMLStyleSheet(Doc);
        if(!SS) return null;
        if(typeof Sel.join == 'function') Sel = Sel.join(', '); // ['html', 'body']
        if(typeof Sty.join == 'function') Sty = Sty.join(' '); // ['display: block;', 'position: static;']
        return SS.insertRule(Sel + ' { ' + Sty + ' }', SS.cssRules.length);
    },
    deleteRule: function(Ind) { let Doc = document; if(typeof arguments[0] != 'number') Doc = arguments[0], Ind = arguments[1];
        const SS = this.getSMLStyleSheet(Doc);
        if(SS) return SS.deleteRule(Ind);
    },
    getComputedStyle: function(Ele, Pro) { let Doc = document; if(!arguments[0].tagName) Doc = arguments[0], Ele = arguments[1], Pro = arguments[2];
        const Sty = Ele.currentStyle || Doc.defaultView.getComputedStyle(Ele, (Pro ? Pro : '')) 
        return Sty;
    },
    addTransitionEndListener: (Ele, fun) => {
        if(typeof fun != 'function') return;
        Ele.sMLTransitionEndListener = fun;
        Ele.addEventListener('transitionEnd', Ele.sMLTransitionEndListener);
    },
    removeTransitionEndListener: (Ele) => {
        if(typeof Ele.sMLTransitionEndListener != 'function') return;
        Ele.removeEventListener('transitionEnd', Ele.sMLTransitionEndListener);
        delete Ele.sMLTransitionEndListener;
    },
    setStyle: function(Ele, Sty) {
        return new Promise((resolve, reject) => {
            if(!Ele || !Sty) return reject();
            this.removeTransitionEndListener(Ele);
            this.addTransitionEndListener(Ele, resolve);
            if(typeof Sty == 'string') Ele.style = Sty;
            else {
                for(const Pro in Sty) if(/^transition/.test(Pro)) { Ele.style[Pro] = Sty[Pro]; delete(Sty[Pro]); }
                for(const Pro in Sty)                             { Ele.style[Pro] = Sty[Pro]; }
            } 
        });
    }
};

sML.style         = function() { return sML.CSS.setStyle  .apply(sML.CSS, arguments); };
sML.appendCSSRule = function() { return sML.CSS.appendRule.apply(sML.CSS, arguments); };
sML.deleteCSSRule = function() { return sML.CSS.deleteRule.apply(sML.CSS, arguments); };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Coord

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Coords = {
    getXY:          (    X, Y     ) => ({     X: X,          Y: Y      }),
    getWidthHeight: (Width, Height) => ({ Width: Width, Height: Height }),
    getScreenSize: function() {
        return this.getWidthHeight(screen.availWidth, screen.availHeight);
    },
    getScrollSize: function (Obj) {
        if(!Obj || Obj == window || Obj == document) Obj = document.documentElement;
        return this.getWidthHeight(Obj.scrollWidth, Obj.scrollHeight);
    },
    getOffsetSize: function (Obj) {
        if(!Obj || Obj == window) Obj = document.documentElement;
        if(Obj == document) return this.getScrollSize(document.documentElement);
        return this.getWidthHeight(Obj.offsetWidth, Obj.offsetHeight);
    },
    getClientSize: function (Obj) {
        if(!Obj || Obj == window) Obj = document.documentElement;
        if(Obj == document) return this.getScrollSize(document.documentElement);
        return this.getWidthHeight(Obj.clientWidth, Obj.clientHeight);
    },
    getDocumentSize: function() {
        return this.getScrollSize(document.documentElement);
    },
    getWindowSize: function() {
        return this.getOffsetSize(document.documentElement);
    },
    getElementSize: function (Obj) {
        return this.getOffsetSize(Obj);
    },
    getWindowCoord: function(Obj) {
        return this.getXY((window.screenLeft || window.screenX), (window.screenTop  || window.screenY));
    },
    getElementCoord: function (Obj) {
        let X = Obj.offsetLeft, Y = Obj.offsetTop;
        while(Obj.offsetParent) Obj = Obj.offsetParent, X += Obj.offsetLeft, Y += Obj.offsetTop;
        return this.getXY(X, Y);
    },
    getScrollCoord: function(Obj) {
        if(!Obj || Obj == window) return this.getXY(
            (window.scrollX || window.pageXOffset || document.documentElement.scrollLeft),
            (window.scrollY || window.pageYOffset || document.documentElement.scrollTop)
        );
        return this.getXY(Obj.scrollLeft, Obj.scrollTop);
    },
    getScrollLimitCoord: function(Obj) {
        if(!Obj || Obj == window) Obj = document.documentElement;
        const SS = this.getScrollSize(Obj), OS = this.getClientSize(Obj);
        return this.getXY(SS.Width - OS.Width, SS.Height - OS.Height);
    },
    getEventCoord: function(Eve) {
        return (Eve ? this.getXY(Eve.pageX, Eve.pageY) : this.getXY(0, 0));
    },
    getCoord: function(Obj) {
        let XY, WidthHeight;
        /**/ if(Obj.tagName)     XY = this.getElementCoord(Obj), WidthHeight = this.getOffsetSize(Obj);
        else if(Obj == window)   XY = this.getScrollCoord(),     WidthHeight = this.getOffsetSize(document.documentElement);
        else if(Obj == document) XY = { X: 0,    Y: 0 },         WidthHeight = this.getScrollSize(document.documentElement);
        else if(Obj == screen)   XY = { X: 0,    Y: 0 },         WidthHeight = this.getScreenSize();
        return {
                 X: XY.X,
                 Y: XY.Y,
               Top: XY.Y,
             Right: XY.X + WidthHeight.Width,
            Bottom: XY.Y + WidthHeight.Height,
              Left: XY.X,
             Width: WidthHeight.Width,
            Height: WidthHeight.Height
        }
    }
};

sML.getCoord = function() { return sML.Coords.getCoord.apply(sML.Coords, arguments); };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- CustomEvents

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.CustomEvents = function(Prefix) { if(!Prefix) Prefix = 'sml';
    const _EL_   = Prefix + 'EventListener';
    const _BELs_ = Prefix + 'BindedEventListeners';
    const NameRE = new RegExp('^' + Prefix + ':[\\w\\d\\-:]+$');
    this.add = function(Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Nam instanceof Array) return Nam.forEach(N => this.add(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.add(Tar, Nam, f)) || fun;
        if(!(typeof Tar == 'object' && typeof Nam == 'string' && NameRE.test(Nam) && typeof fun == 'function')) return false;
        if(!fun[_EL_]) fun[_EL_] = (Eve) => fun.call(Tar, Eve.detail);
        Tar.addEventListener(Nam, fun[_EL_], false);
        return fun;
    };
    this.remove = function(Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Nam instanceof Array) return Nam.forEach(N => this.remove(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.remove(Tar, Nam, f)) || fun;
        if(!(typeof Tar == 'object' && typeof Nam == 'string' && NameRE.test(Nam) && typeof fun == 'function')) return false;
        Tar.removeEventListener(Nam, fun[_EL_]);
        return fun;
    };
    this.bind = function(Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Nam instanceof Array) return Nam.forEach(N => this.bind(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.bind(Tar, Nam, f)) || fun;
        if(!(typeof Tar == 'object' && typeof Nam == 'string' && NameRE.test(Nam) && typeof fun == 'function')) return false;
        if(!Tar[_BELs_]) Tar[_BELs_] = {};
        if(!(Tar[_BELs_][Nam] instanceof Array)) Tar[_BELs_][Nam] = [];
        Tar[_BELs_][Nam] = Tar[_BELs_][Nam].filter(bEL => (bEL != fun));
        Tar[_BELs_][Nam].push(fun);
        return fun;
    };
    this.unbind = function(Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Nam instanceof Array) return Nam.forEach(N => this.unbind(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.unbind(Tar, Nam, f)) || fun;
        if(!(typeof Tar == 'object' && typeof Nam == 'string' && NameRE.test(Nam) && typeof fun == 'function')) return false;
        if(!(Tar[_BELs_] && Tar[_BELs_][Nam] instanceof Array)) return false;
        Tar[_BELs_][Nam] = Tar[_BELs_][Nam].filter(bEL => (bEL != fun));
        return fun;
    };
    this.dispatch = function(Nam, Det) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], Det = arguments[2];
        if(!(typeof Tar == 'object' && typeof Nam == 'string' && NameRE.test(Nam))) return false;
        if(Tar[_BELs_] && Tar[_BELs_][Nam] instanceof Array) Tar[_BELs_][Nam].forEach(bEL => (typeof bEL == 'function') ? bEL.call(Tar, Det) : false);
        return Tar.dispatchEvent(new CustomEvent(Nam, { detail: Det }));
    };
    return this;
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Scroller

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Scroller = {
    distillSetting: (FXY, Opt) => {
        const Setting = {};
             if(FXY instanceof HTMLElement) Setting.Target = sML.Coord.getElementCoord(FXY);
        else if(typeof FXY == 'number')     Setting.Target = { X: undefined, Y: FXY   };
        else if(FXY)                        Setting.Target = { X: FXY.X,     Y: FXY.Y };
        else                                return false;
        Setting.Frame = (FXY.Frame && FXY.Frame instanceof HTMLElement) ? FXY.Frame : window;
        Setting.scrollTo = (Setting.Frame === window) ? (X, Y) => window.scrollTo(X, Y) : (X, Y) => { Setting.Frame.scrollLeft = X, Setting.Frame.scrollTop = Y; };
        Setting.Start = sML.Coords.getScrollCoord(Setting.Frame);
        Setting.Start.Time = (new Date()).getTime();
        if(typeof Setting.Target.X != 'number') Setting.Target.X = Setting.Start.X;
        if(typeof Setting.Target.Y != 'number') Setting.Target.Y = Setting.Start.Y;
        if(!Opt) Opt = {};
        Setting.Duration = (typeof Opt.Duration == 'number' && Opt.Duration >= 0) ? Opt.Duration : 100;
        Setting.ease = (() => {
            switch(typeof Opt.Easing) {
                case 'function': return Opt.Easing;
                case 'string'  : return sML.Easing[Opt.Easing] ? sML.Easing[Opt.Easing] : sML.Easing.linear;
                case 'number'  : return sML.Easing.getEaser(Opt.Easing);
            }
            return sML.Easing.linear;
        })();
        Setting.before   = typeof Opt.before   == 'function' ? Opt.before   : () => false;
        Setting.among    = typeof Opt.among    == 'function' ? Opt.among    : () => false;
        Setting.after    = typeof Opt.after    == 'function' ? Opt.after    : () => false;
        Setting.callback = typeof Opt.callback == 'function' ? Opt.callback : () => false;
        Setting.canceled = typeof Opt.canceled == 'function' ? Opt.canceled : () => false;
        Setting.ForceScroll = Opt.ForceScroll;
        return Setting;
    },
    scrollTo: function(FXY, Opt) {
        this.Setting = this.distillSetting(FXY, Opt);
        if(!this.Setting) return false;
        this.scrollTo_begin();
    },
    scrollTo_begin: function() {
        clearTimeout(this.Timer);
        this.Setting.ForceScroll ? this.preventUserScrolling() : this.addScrollCancelation();
        this.Setting.before();
        this.scrollTo_among();
    },
    scrollTo_among: function() {
        let Progress = this.Setting.Duration ? ((new Date()).getTime() - this.Setting.Start.Time) / this.Setting.Duration : 1;
        if(Progress >= 1) return this.scrollTo_end();
        Progress = this.Setting.ease(Progress);
        this.Setting.scrollTo(
            Math.round(this.Setting.Start.X + (this.Setting.Target.X - this.Setting.Start.X) * Progress),
            Math.round(this.Setting.Start.Y + (this.Setting.Target.Y - this.Setting.Start.Y) * Progress)
        );
        this.Setting.among();
        this.Timer = setTimeout(function() { sML.Scroller.scrollTo_among(); }, 10);
    },
    scrollTo_end: function() {
        this.Setting.scrollTo(this.Setting.Target.X, this.Setting.Target.Y);
        this.Setting.after();
        this.Setting.callback();
        this.Setting.ForceScroll ? sML.Scroller.allowUserScrolling() : sML.Scroller.removeScrollCancelation();
        delete(this.Setting);
    },
    cancelScrolling: () => {
        clearTimeout(sML.Scroller.Timer);
        sML.Scroller.Setting.canceled();
        delete(sML.Scroller.Setting);
        sML.Scroller.removeScrollCancelation();
    },
       addScrollCancelation: () => ['keydown', 'mousedown', 'wheel'].forEach(EN => document.addEventListener   (EN, sML.Scroller.cancelScrolling)),
    removeScrollCancelation: () => ['keydown', 'mousedown', 'wheel'].forEach(EN => document.removeEventListener(EN, sML.Scroller.cancelScrolling)),
    preventUserScrolling:    () => ['keydown', 'mousedown', 'wheel'].forEach(EN => document.addEventListener   (EN, sML.Scroller.preventDefault )),
      allowUserScrolling:    () => ['keydown', 'mousedown', 'wheel'].forEach(EN => document.removeEventListener(EN, sML.Scroller.preventDefault )),
    preventDefault:       (Eve) => Eve.preventDefault()
};

sML.scrollTo = function() { return sML.Scroller.scrollTo.apply(sML.Scroller, arguments); };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Easing

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Easing = (typeof window.Easing == 'object') ? window.Easing : {};

sML.Easing.linear   =          (Pos) => Pos;
sML.Easing.getEaser = (Eas) => (Pos) => Pos + Eas / 100 * (1 - Pos) * Pos;




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Cookies

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Cookies = {
    read: (CookieName) => {
        if(typeof CookieName != 'string' || !CookieName) return '';
        CookieName = encodeURIComponent(CookieName);
        const CookieParts = document.cookie.split('; ');
        let CookieValue = '';
        for(let l = CookieParts.length, i = 0; i < l; i++) {
            if(CookieParts[i].substr(0, CookieName.length + 1) == (CookieName + '=')) {
                CookieValue = CookieParts[i].substr(CookieName.length + 1, CookieParts[i].length);
                break;
            }
        }
        return decodeURIComponent(CookieValue);
    },
    write: (CookieName, CookieValue, Opt) => { const D = new Date();
        if(!CookieName || typeof CookieName  != 'string' || typeof CookieValue != 'string') return false;
        if(typeof Opt != 'object') Opt = {};
        CookieName  = encodeURIComponent(CookieName);
        CookieValue = encodeURIComponent(CookieValue);
        Opt.Path    = (typeof Opt.Path    == 'string') ? Opt.Path    : location.pathname.replace(/[^\/]+$/, '');
        Opt.Expires = (typeof Opt.Expires == 'number') ? Opt.Expires : 86400000; // a day
        document.cookie = [
            CookieName + '=' + CookieValue,
            'path=' + Opt.Path,
            'expires=' + D.toGMTString(D.setTime(D.getTime() + Opt.Expires))
        ].join('; ');
        return document.cookie;
    }
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Ranges

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Ranges = {
    selectRange: (Ran) => {
        if(!Ran) return null;
        const Sel = window.getSelection();
        Sel.removeAllRanges();
        Sel.addRange(Ran);
        return Ran;
    },
    getRange: function() {
        const Sides = typeof arguments[0] == 'object' ? arguments[0] : this._searchSidesOfText.apply(this, arguments);
        if(!Sides) return null;
        const Ran = Sides.Start.Node.ownerDocument.createRange();
        Ran.setStart(Sides.Start.Node, (typeof Sides.Start.Index == 'number' ? Sides.Start.Index : Sides.Start.Node.textContent.indexOf(Sides.Start.Text)));
        Ran.setEnd(    Sides.End.Node, (typeof   Sides.End.Index == 'number' ?   Sides.End.Index :   Sides.End.Node.textContent.indexOf(  Sides.End.Text) + Sides.End.Text.length));
        return Ran;
    },
    _searchSidesOfText: function(SearchText, TargetNode) {
        // Initialize
        if(!TargetNode) TargetNode = document.body;
        if(typeof SearchText != 'string' || !SearchText || this._flat(TargetNode.textContent).indexOf(SearchText) < 0) return null;
        if(TargetNode.nodeType == 3) return { Start: { Node: TargetNode, Text: SearchText }, End: { Node: TargetNode, Text: SearchText } };
        const TextContents = [], F = {};
        let StartNodeIndex = 0, EndNodeIndex = TargetNode.childNodes.length - 1, DistilledText = '';
        for(let i = 0; i <= EndNodeIndex; i++) {
            if(this._flat(TargetNode.childNodes[i].textContent).indexOf(SearchText) >= 0) return this._searchSidesOfText(SearchText, TargetNode.childNodes[i]);
            TextContents.push(TargetNode.childNodes[i].textContent);
        }
        // Get StartNode
        DistilledText = this._distill(TextContents, StartNodeIndex + 1, EndNodeIndex);
        while(DistilledText && this._flat(DistilledText).indexOf(SearchText) >= 0) {
            StartNodeIndex++;
            DistilledText = this._distill(TextContents, StartNodeIndex + 1, EndNodeIndex);
        }
        let StartNode = TargetNode.childNodes[StartNodeIndex];
        // Get StartText
        let StartTextStart = 0, StartText = ''; const StartTextEnd = StartNode.textContent.length - 1;
        DistilledText = this._distill(StartNode.textContent, StartTextStart, StartTextEnd);
        while(this._flat(DistilledText) && !(new RegExp('^' + this._escape(this._flat(DistilledText)))).test(SearchText)) {
            StartTextStart++;
            DistilledText = this._distill(StartNode.textContent, StartTextStart, StartTextEnd);
        }
        StartText = this._flat(DistilledText);
        // Dive StartNode
        while(StartNode.nodeType != 3) {
            F = this._find(StartText, StartNode);
            StartNode = F.Start.Node;
            StartText = F.Start.Text;
        }
        // Get EndNode
        DistilledText = this._distill(TextContents, StartNodeIndex, EndNodeIndex - 1);
        while(DistilledText && this._flat(DistilledText).indexOf(SearchText) >= 0) {
            EndNodeIndex--;
            DistilledText = this._distill(TextContents, StartNodeIndex, EndNodeIndex - 1);
        }
        let EndNode = TargetNode.childNodes[EndNodeIndex];
        // Get EndText
        const EndTextStart = 0; let EndText = '', EndTextEnd = EndNode.textContent.length - 1;
        DistilledText = this._distill(EndNode.textContent, EndTextStart, EndTextEnd);
        while(this._flat(DistilledText) && !(new RegExp(this._escape(this._flat(DistilledText)) + '$')).test(SearchText)) {
            EndTextEnd--;
            DistilledText = this._distill(EndNode.textContent, EndTextStart, EndTextEnd);
        }
        EndText = this._flat(DistilledText);
        // Dive EndNode
        while(EndNode.nodeType != 3) {
            F = this._searchSidesOfText(EndText, EndNode);
            EndNode = F.End.Node;
            EndText = F.End.Text;
        }
        // Return
        return {
            Start: { Node: StartNode, Text: StartText },
              End: { Node: EndNode, Text: EndText }
        };
    },
    _flat: (Str) => Str.replace(/[\r\n]/g, ''),
    _escape: (Str) => Str.replace(/([\(\)\{\}\[\]\,\.\-\+\*\?\!\:\^\$\/\\])/g, '\\$1'),
    _distill: (Str, Start, End) => { let Distilled = ''; for(let i = Start; i <= End; i++) Distilled += Str[i]; return Distilled; }
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Fullscreen

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Fullscreen = { // Partial Polyfill for Safari and Internet Explorer
    fill: (Win = window) => { const Doc = Win.document;
        if(typeof Doc.fullscreenEnabled != 'undefined') return;
        if(typeof Promise != "function") throw new Error('[sML.js] sML.Fullscreen.fill() requires Promise.');
        const VP = Doc.webkitFullscreenEnabled ? 'webkit' : Doc.msFullscreenEnabled ? 'ms' : '';
        switch(VP) {
            case 'webkit': Doc.addEventListener('webkitfullscreenchange', () => Doc.dispatchEvent(        new Event('fullscreenchange', { bubbles: true, cancelable: false })                                ));  break;
            case 'ms'    : Doc                    .onmsfullscreenchange = () => Doc.dispatchEvent((_ => _.initEvent('fullscreenchange',            true,             false  ) && _)(Doc.createEvent('Event'))) ;  break;
            default      : Doc.fullscreenEnabled = false, Doc.fullscreenElement = null, Doc.exitFullscreen = Win.Element.prototype.requestFullscreen = () => Promise.reject()                                  ; return;
        }
        Object.defineProperties(Doc, {
            fullscreenEnabled: { get: () => Doc[VP + 'FullscreenEnabled'] },
            fullscreenElement: { get: () => Doc[VP + 'FullscreenElement'] }
        });
        Doc.exitFullscreen = function() {
            return new Promise((resolve, reject) => {
                if(!Doc.fullscreenElement) return reject();
                const onFullscreenChange = (Eve) => { resolve(Eve); Doc.removeEventListener('fullscreenchange', onFullscreenChange); }
                Doc.addEventListener('fullscreenchange', onFullscreenChange);
                this[VP + 'ExitFullscreen'].apply(this, arguments);
            });
        };
        Win.Element.prototype.requestFullscreen = function() {
            return new Promise((resolve, reject) => {
                if( Doc.fullscreenElement) return reject();
                const onFullscreenChange = (Eve) => { resolve(Eve); Doc.removeEventListener('fullscreenchange', onFullscreenChange); }
                Doc.addEventListener('fullscreenchange', onFullscreenChange);
                this[VP + 'RequestFullscreen'].apply(this, arguments);
            });
        };
    }
};




//==============================================================================================================================================

return sML; })());

//==============================================================================================================================================