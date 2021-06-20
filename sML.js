/*!
 *                                                                                                                         (℠)
 *  # sML.js | I'm a Simple and Middling Library.
 *
 *  * © Satoru Matsushima - https://github.com/satorumurmur/sML
 *  * Open source under the MIT license. - https://github.com/satorumurmur/sML/blob/master/LICENSE
 *
 *  * sML.Easing is according to:
 *      - Easing Functions (Equations) : © Robert Penner - http://robertpenner.com/easing / Licensed under the MIT License and the 3-Clause BSD License - http://robertpenner.com/easing_terms_of_use.html
 *      - jQuery Easing                : © George McGinley Smith - http://gsgd.co.uk/sandbox/jquery/easing / Licensed under the 3-Clause BSD License - https://raw.github.com/gdsmith/jquery.easing/master/LICENSE
 *
 */




//==============================================================================================================================================

(sML => { if(typeof module != 'undefined' && module.exports) module.exports = sML; else (typeof global != 'undefined' ? global : typeof this != 'undefined' ? this : self).sML = sML; })((() => { 'use strict';

//==============================================================================================================================================




const sML = { version: '1.0.29' };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Polarstar

//----------------------------------------------------------------------------------------------------------------------------------------------


const NUA = navigator.userAgent;

const _dV = (Pre, Ref = '$1') => Pre ? (() => {
    const RE = new RegExp('^.*' + Pre + '[ :\\/]?(\\d+([\\._]\\d+)*).*$');
    return RE.test(NUA) ? NUA.replace(RE, Ref).replace(/_/g, '.').split('.').map(I => parseInt(I) || 0) : [];
})() : []; // detectVersion

sML.OperatingSystem = (OS => {
    if(                        /Mac OS X/.test(NUA)) {
             if(/\(iP(hone|ad|od touch);/.test(NUA)) OS.iOS = _dV('CPU (iPhone )?OS', '$2');
        else if(  document.ontouchend !== undefined) OS.iOS = OS.iPadOS = _dV();
        else if(     /Mac OS X 10[\._]\d/.test(NUA)) OS.macOS = _dV('Mac OS X ');
    }
    else if(           /Windows( NT)? \d/.test(NUA)) OS.Windows = (V => (V[0] != 6) ? V : (V[1] >= 3) ? [8, 1] : (V[1] >= 2) ? [8] : (V[1] >= 1) ? [7] : V)(_dV('Windows( NT)?', '$2'));
    else if(                 /Android \d/.test(NUA)) OS.Android = _dV('Android');
    else if(                       /CrOS/.test(NUA)) OS.Chrome = _dV();
    else if(                       /X11;/.test(NUA)) OS.Linux = _dV();
    else if(                    /Firefox/.test(NUA)) OS.Firefox = _dV();
    return OS;
})({});

sML.UserAgent = (UA => {
    if(                      / Gecko\/\d/.test(NUA)) {
                                                     UA.Gecko = _dV('rv');
             if(          / Waterfox\/\d/.test(NUA)) UA.Waterfox = _dV('Waterfox');
        else if(           / Firefox\/\d/.test(NUA)) UA.Firefox = _dV('Firefox');
    } else if(                / Edge\/\d/.test(NUA)) {
                                                     UA.EdgeHTML = UA.Edge = _dV('Edge');
    } else if(        / Chrom(ium|e)\/\d/.test(NUA)) {
                                                     UA.Blink = UA.Chromium = (V => V[0] ? V : _dV('Chrome'))(_dV('Chromium'));
             if(             / EdgA?\/\d/.test(NUA)) UA.Edge = (V => V[0] ? V : _dV('Edg'))(_dV('EdgA'));
        else if(               / OPR\/\d/.test(NUA)) UA.Opera = _dV('OPR');
        else if(              / Silk\/\d/.test(NUA)) UA.Silk = _dV('Silk');
        else if(           / Vivaldi\/\d/.test(NUA)) UA.Vivaldi = _dV('Vivaldi');
        else if(            / Phoebe\/\d/.test(NUA)) UA.Phoebe = _dV('Phoebe');
        else                                         UA.Chrome = (V => V[0] ? V : UA.Chromium)(_dV('Chrome'));
    } else if(         / AppleWebKit\/\d/.test(NUA)) {
                                                     UA.WebKit = _dV('AppleWebKit');
             if(              / CriOS \d/.test(NUA)) UA.Chrome = _dV('CriOS');
        else if(              / FxiOS \d/.test(NUA)) UA.Firefox = _dV('FxiOS');
        else if(            / EdgiOS\/\d/.test(NUA)) UA.Edge = _dV('EdgiOS');
        else if(           / Version\/\d/.test(NUA)) UA.Safari = _dV('Version');
    } else if(             / Trident\/\d/.test(NUA)) {
                                                     UA.Trident = _dV('Trident'); 
                                                     UA.InternetExplorer = (V => V[0] ? V : _dV('MSIE'))(_dV('rv'));
    }
    if(             /[\[; ]FB(AN|_IAB)\//.test(NUA)) UA.Facebook = _dV('FBAV');
    if(                       / Line\/\d/.test(NUA)) UA.LINE = _dV('Line');
    return UA;
})({});

sML.Environments = [sML.OperatingSystem, sML.UserAgent].reduce((Env, OS_UA) => { for(const Par in OS_UA) if(OS_UA[Par]) Env.push(Par); return Env; }, []);

Object.defineProperties(sML, {
    OS: { get: () => sML.OperatingSystem },
    UA: { get: () => sML.UserAgent       }
});




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Utilities

//----------------------------------------------------------------------------------------------------------------------------------------------


if(Number.isFinite  === undefined) Number.isFinite  = (Val) => typeof Val === 'number' && isFinite(Val);
if(Number.isInteger === undefined) Number.isInteger = (Val) => typeof Val === 'number' && isFinite(Val) && Math.floor(Val) === Val;

//sML.forEach = (Col) => (fun, This) => Col.forEach ? Col.forEach(fun, This) : Array.prototype.forEach.call(Col, fun, This);
sML.forEach = (Col) => (fun, This = window || self) => { const l = Col.length; for(let i = 0; i < l; i++) if(fun.call(This, Col[i], i, Col) == 'break') break; };

sML.replace = (Str, Reps) => {
    if(!(Reps[0] instanceof Array))            return Str.replace(Reps   [0], Reps   [1]);
    for(let l = Reps.length, i = 0; i < l; i++) Str = Str.replace(Reps[i][0], Reps[i][1]); return Str;
};
sML.capitalise = (Str) => Str.charAt(0).toUpperCase() + Str.slice(1);
sML.capitalize = (Str) => Str.charAt(0).toUpperCase() + Str.slice(1);

sML.limitMin    = (Num, Min     ) =>                     (Num < Min) ? Min :                     Num;
sML.limitMax    = (Num,      Max) =>                                         (Max < Num) ? Max : Num;
sML.limitMinMax = (Num, Min, Max) => (Max < Min) ? NaN : (Num < Min) ? Min : (Max < Num) ? Max : Num;

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


sML.edit = (Obj, ...ProSets) => {
    const l = ProSets.length;
    if(Obj.tagName) {
        for(let i = 0; i < l; i++) { const ProSet = ProSets[i];
            for(const Pro in ProSet) if(Pro != 'data' && Pro != 'on' && Pro != 'style') Obj[Pro] = ProSet[Pro];
            if(ProSet.data ) for(const EN in ProSet.data) Obj.setAttribute('data-' + EN, ProSet.data[EN]);
            if(ProSet.on   ) for(const EN in ProSet.on  ) Obj.addEventListener(      EN, ProSet.on[  EN]);
            if(ProSet.style) sML.CSS.setStyle(Obj, ProSet.style);
        }
    } else {
        for(let i = 0; i < l; i++) { const ProSet = ProSets[i];
            for(const Pro in ProSet) Obj[Pro] = ProSet[Pro];
        }
    }
    return Obj;
};

sML.create = (Tag, ...ProSets) => sML.edit(document.createElement(Tag), ...ProSets);

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

sML.apply = (Par = {}, ExceptFunctions) => {
    if(Par.From && Par.To) {
        if(ExceptFunctions) { for(const Pro in Par.From) if(typeof Par.To[Pro] != 'function' && typeof Par.From[Pro] != 'function') Par.To[Pro] = Par.From[Pro]; }
        else                { for(const Pro in Par.From)                                                                            Par.To[Pro] = Par.From[Pro]; }
    }
    return Par.To;
};
sML.applyLtR = (From, To, ExceptFunctions) => sML.apply({ From: From, To: To }, ExceptFunctions);
sML.applyRtL = (To, From, ExceptFunctions) => sML.apply({ From: From, To: To }, ExceptFunctions);

sML.replaceClass = (Ele, Old, New) => {
    if(Ele.classList.contains(Old)) Ele.classList.remove(Old);
    return Ele.classList.add(New);
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- CSS

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.CSS = {
    _get_sMLStyle_sheet: (Doc = document) => {
        if(!Doc.sMLStyle) {
            Doc.sMLStyle = Doc.createElement('style');
            Doc.sMLStyle.appendChild(Doc.createTextNode(''));
            Doc.head.appendChild(Doc.sMLStyle);
        }
        return Doc.sMLStyle.sheet;
    },
    appendRule: function(Sel, Sty) { let Doc = document; if(typeof arguments[0] != 'string') Doc = arguments[0], Sel = arguments[1], Sty = arguments[2];
        const sSs = this._get_sMLStyle_sheet(Doc);
        return sSs.insertRule((Sel instanceof Array ? Sel.join(', ') : Sel) + ' { ' + (Sty instanceof Array ? Sty.join(' ') : Sty) + ' }', sSs.cssRules.length);
    },
    deleteRule: function(Ind) { let Doc = document; if(typeof arguments[0] != 'number') Doc = arguments[0], Ind = arguments[1];
        const sSs = this._get_sMLStyle_sheet(Doc);
        if(sSs) return sSs.deleteRule(Ind);
    },
    setStyle: function(Ele, ...Stys) {
        if(Ele instanceof Array) for(let l = Ele.length, i = 0; i < l; i++) sML.CSS.setStyle(Ele[i], ...Stys);
        else for(let l = Stys.length, i = 0; i < l; i++) for(const Pro in Stys[i]) Ele.style[Pro] = Stys[i][Pro];
        return Promise.resolve();
    },
    _add_sMLTransitionEndListener: function(Ele, fun) {
        if(Ele._sMLTransitionEndListener) this._remove_sMLTransitionEndListener(Ele);
        Ele._sMLTransitionEndListener = (Eve) => fun.call(Ele, Eve) && this._remove_sMLTransitionEndListener(Ele);
        Ele.addEventListener('transitionend', Ele._sMLTransitionEndListener);
    },
    _remove_sMLTransitionEndListener: function(Ele) {
        if(!Ele._sMLTransitionEndListener) return;
        Ele.removeEventListener('transitionend', Ele._sMLTransitionEndListener);
        delete Ele._sMLTransitionEndListener;
    },
    setTransition: function(Ele, ...Stys) {
        // If none of the changed properties are included in transition-property of the element,
        // PromiseStatus keeps 'pending' until the next transition.
        if(Ele instanceof Array) {
            const Promises = [];
            for(let l = Ele.length, i = 0; i < l; i++) Promises.push(sML.CSS.setTransition(Ele[i], ...Stys));
            return Promise.all(Promises);
        }
        return new Promise(resolve => {
            let CSty = Ele.getAttribute('style');
            const _Stys = [CSty ? CSty.trim() : ''];
            for(let l = Stys.length, i = 0; i < l; i++) for(const Pro in Stys[i]) {
                const Val = Stys[i][Pro];
                     if(Val !== '') _Stys.push(Pro + ': ' + Val + ';');
                else if(_Stys[0]) _Stys[0] = _Stys[0].replace(new RegExp(Pro + '[ :\\-].+?(; *|$)', 'g'), '').trim();
            }
            this._add_sMLTransitionEndListener(Ele, Eve => resolve(Eve));
            Ele.style = _Stys.join(' ');
        });
    }
};

sML.appendCSSRule = function() { return sML.CSS.appendRule   .apply(sML.CSS, arguments); };
sML.deleteCSSRule = function() { return sML.CSS.deleteRule   .apply(sML.CSS, arguments); };
sML.style         = function() { return sML.CSS.setStyle     .apply(sML.CSS, arguments); };
sML.transition    = function() { return sML.CSS.setTransition.apply(sML.CSS, arguments); };




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
        let XY, WH;
        /**/ if(Obj.tagName)     XY = this.getElementCoord(Obj), WH = this.getOffsetSize(Obj);
        else if(Obj == window)   XY = this.getScrollCoord(),     WH = this.getOffsetSize(document.documentElement);
        else if(Obj == document) XY = { X: 0, Y: 0 },            WH = this.getScrollSize(document.documentElement);
        else if(Obj == screen)   XY = { X: 0, Y: 0 },            WH = this.getScreenSize();
        return {
                 X: XY.X,
                 Y:       XY.Y,
               Top:       XY.Y,
             Right: XY.X      + WH.Width,
            Bottom:       XY.Y          + WH.Height,
              Left: XY.X,
             Width:             WH.Width,
            Height:                       WH.Height
        };
    }
};

sML.getCoord = function() { return sML.Coords.getCoord.apply(sML.Coords, arguments); };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Events

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.preventDefault  = (Eve) => Eve.preventDefault();
sML.stopPropagation = (Eve) => Eve.stopPropagation();


sML.CustomEvents = function(Pre = 'sml') {
    const _EL_   = Pre + 'EventListener';
    const _BELs_ = Pre + 'BindedEventListeners';
    const NameRE = new RegExp('^' + Pre + ':[\\w\\d\\-:]+$');
    this.add = function(/*[Tar,]*/ Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Tar instanceof Array) return Tar.forEach(T => this.add(T, Nam, fun)) || fun;
        if(Nam instanceof Array) return Nam.forEach(N => this.add(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.add(Tar, Nam, f)) || fun;
        if(typeof Tar != 'object' || !NameRE.test(Nam) || typeof fun != 'function') return false;
        if(!fun[_EL_]) fun[_EL_] = (Eve) => fun.call(Tar, Eve.detail);
        Tar.addEventListener(Nam, fun[_EL_], false);
        return fun;
    };
    this.remove = function(/*[Tar,]*/ Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Tar instanceof Array) return Tar.forEach(T => this.remove(T, Nam, fun)) || fun;
        if(Nam instanceof Array) return Nam.forEach(N => this.remove(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.remove(Tar, Nam, f)) || fun;
        if(typeof Tar != 'object' || !NameRE.test(Nam) || typeof fun != 'function') return false;
        Tar.removeEventListener(Nam, fun[_EL_]);
        return fun;
    };
    this.bind = function(/*[Tar,]*/ Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Tar instanceof Array) return Tar.forEach(T => this.bind(T, Nam, fun)) || fun;
        if(Nam instanceof Array) return Nam.forEach(N => this.bind(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.bind(Tar, Nam, f)) || fun;
        if(typeof Tar != 'object' || !NameRE.test(Nam) || typeof fun != 'function') return false;
        if(!Tar[_BELs_]) Tar[_BELs_] = {};
        if(!(Tar[_BELs_][Nam] instanceof Array)) Tar[_BELs_][Nam] = [];
        Tar[_BELs_][Nam] = Tar[_BELs_][Nam].filter(bEL => (bEL != fun));
        Tar[_BELs_][Nam].push(fun);
        return fun;
    };
    this.unbind = function(/*[Tar,]*/ Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Tar instanceof Array) return Tar.forEach(T => this.unbind(T, Nam, fun)) || fun;
        if(Nam instanceof Array) return Nam.forEach(N => this.unbind(Tar, N, fun)) || fun;
        if(fun instanceof Array) return fun.forEach(f => this.unbind(Tar, Nam, f)) || fun;
        if(typeof Tar != 'object' || !NameRE.test(Nam) || typeof fun != 'function') return false;
        if(!(Tar[_BELs_] && Tar[_BELs_][Nam] instanceof Array)) return false;
        Tar[_BELs_][Nam] = Tar[_BELs_][Nam].filter(bEL => (bEL != fun));
        return fun;
    };
    this.dispatch = function(/*[Tar,]*/ Nam, Det) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], Det = arguments[2];
        if(Tar instanceof Array) return Tar.forEach(T => this.dispatch(T, Nam, Det)) || Det;
        if(Nam instanceof Array) return Nam.forEach(N => this.dispatch(Tar, N, Det)) || Det;
        if(typeof Tar != 'object' || !NameRE.test(Nam)) return false;
        if(Tar[_BELs_] && Tar[_BELs_][Nam] instanceof Array) Tar[_BELs_][Nam].forEach(bEL => (typeof bEL == 'function') ? bEL.call(Tar, Det) : false);
        Tar.dispatchEvent(new CustomEvent(Nam, { detail: Det }));
        return Det;
    };
    return this;
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Scroller

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Scroller = {
    scrollTo: function(FXY, Opt = {}) {
        const Frame = (FXY.Frame && FXY.Frame instanceof HTMLElement) ? FXY.Frame : window;
        let Stg = {};
        if(Frame.sMLScrollerSetting) {
            Stg = Frame.sMLScrollerSetting;
            Stg.cancel();
        } else {
            Stg = Frame.sMLScrollerSetting = { Frame: Frame };
            Stg.scrollTo = (Stg.Frame === window) ? (X, Y) => window.scrollTo(X, Y) : (X, Y) => { Stg.Frame.scrollLeft = X, Stg.Frame.scrollTop = Y; };
            Stg.cancel = () => { Stg.removeScrollCancelation(); if(Stg.oncanceled) Stg.oncanceled(); };
            Stg.   addScrollCancelation = () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Stg.Frame.addEventListener   (EN, Stg.cancel        ));
            Stg.removeScrollCancelation = () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Stg.Frame.removeEventListener(EN, Stg.cancel        ));
            Stg.preventUserScrolling    = () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Stg.Frame.addEventListener   (EN, sML.preventDefault));
            Stg.  allowUserScrolling    = () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Stg.Frame.removeEventListener(EN, sML.preventDefault));
        }
             if(FXY instanceof HTMLElement) Stg.Target = sML.Coord.getElementCoord(FXY);
        else if(typeof FXY == 'number')     Stg.Target = {           Y: FXY   };
        else if(FXY)                        Stg.Target = { X: FXY.X, Y: FXY.Y };
        else                                Stg.Target = {                    };
        Stg.Start = sML.Coords.getScrollCoord(Stg.Frame);
        Stg.StartedOn = new Date().getTime();
        if(typeof Stg.Target.X != 'number') Stg.Target.X = Stg.Start.X;
        if(typeof Stg.Target.Y != 'number') Stg.Target.Y = Stg.Start.Y;
        Stg.Duration = (typeof Opt.Duration == 'number' && Opt.Duration >= 0) ? Opt.Duration : 100;
        if(!Stg.Duration) {
            Stg.scrollTo(Stg.Target.X, Stg.Target.Y);
            return Promise.resolve();
        }
        switch(typeof Opt.ease) {
            case 'function': Stg.ease = Opt.ease;                                                        break;
            case 'string'  : Stg.ease = sML.Easing[Opt.ease] ? sML.Easing[Opt.ease] : sML.Easing.linear; break;
            default        : Stg.ease = sML.Easing.linear;                                               break;
        }
        Stg.ForceScroll = Opt.ForceScroll;
        let recover;
        if(Stg.ForceScroll) Stg.preventUserScrolling(), recover = () => Stg.allowUserScrolling();
        else                Stg.addScrollCancelation(), recover = () => Stg.removeScrollCancelation();
        Stg.after = () => {
            clearTimeout(Stg.Timer);
            delete Stg.oncanceled;
            delete this.Scrolling;
            recover();
        };
        return new Promise((resolve, reject) => {
            Stg.oncanceled = () => { Stg.after(); reject(); };
            Stg.resolve = () => resolve();
            this.Scrolling = Stg;
            this.scrollInProgress();
        }).then(() => {
            Stg.scrollTo(Stg.Target.X, Stg.Target.Y);
            Stg.after();
        });
    },
    scrollInProgress: function() {
        const Stg = this.Scrolling;
        const Passed = new Date().getTime() - Stg.StartedOn;
        if(Stg.Duration <= Passed) return Stg.resolve();
        const Progress = Stg.ease(Passed / Stg.Duration);
        Stg.scrollTo(
            Math.round(Stg.Start.X + (Stg.Target.X - Stg.Start.X) * Progress),
            Math.round(Stg.Start.Y + (Stg.Target.Y - Stg.Start.Y) * Progress)
        );
        Stg.Timer = setTimeout(() => this.scrollInProgress(), sML.limitMax(10, Stg.Duration - Passed));
    }
};

sML.scrollTo = function() { return sML.Scroller.scrollTo.apply(sML.Scroller, arguments); };




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Easing

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Easing /* is according to:
    * Easing Functions (Equations) : © Robert Penner - http://robertpenner.com/easing / Licensed under the MIT License and the 3-Clause BSD License - http://robertpenner.com/easing_terms_of_use.html
    * jQuery Easing                : © George McGinley Smith - http://gsgd.co.uk/sandbox/jquery/easing / Licensed under the 3-Clause BSD License - https://raw.github.com/gdsmith/jquery.easing/master/LICENSE
*/ = (() => {
    const pow = Math.pow, sqr = Math.sqrt, sin = Math.sin, cos = Math.cos, Pi = Math.PI;
    const BounceA = (1/2 + 1/4), BounceB = (1/2 + 1/4 + 1/8 + 1/16), BounceC = (1/2 + 1/4 + 1/8 + 1/16 + 1/32 + 1/64);
    const BackA = 1.70158, BackAp = BackA + 1, BackAm = BackA * 1.525, BackAmp = BackAm + 1;
    const ElasticA = 0.75, ElasticAm = ElasticA * 1.5, ElasticB = Pi * 2 / 3, ElasticBd = ElasticB / 1.5;
    const e = (IO, N) => { switch(IO) {
        case 'i' : return (P) =>                 pow(P, N);
        case  'o': return (P) =>                             1 - pow(1 - P, N);
        case 'io': return (P) => ((P *= 2) < 1 ? pow(P, N) : 1 - pow(1 - P, N)) / 2;
    } },         bounce = (P) => (P *= 2.75) < 1 ? pow(P, 2) : P < 2 ? pow(P - 1.5, 2) + BounceA : P < 2.5 ? pow(P - 2.25, 2) + BounceB : pow(P - 2.625, 2) + BounceC;
    return {
                 linear : (P) => P,
             easeInSine : (P) =>  1 - cos(P * Pi / 2),
            easeOutSine : (P) =>      sin(P * Pi / 2),
          easeInOutSine : (P) => (1 - cos(P * Pi    )) / 2,
            easeInQuad  : e('i', 2),  easeOutQuad  : e('o', 2),  easeInOutQuad  : e('io', 2),
            easeInCubic : e('i', 3),  easeOutCubic : e('o', 3),  easeInOutCubic : e('io', 3),
            easeInQuart : e('i', 4),  easeOutQuart : e('o', 4),  easeInOutQuart : e('io', 4),
            easeInQuint : e('i', 5),  easeOutQuint : e('o', 5),  easeInOutQuint : e('io', 5),
             easeInExpo : (P) => !P ? 0 :                              pow(2, --P * 10),
            easeOutExpo : (P) =>          P == 1 ? 1 :                                    1 - pow(2,   P * -10),
          easeInOutExpo : (P) => !P ? 0 : P == 1 ? 1 : ((P *= 2) < 1 ? pow(2, --P * 10) : 2 - pow(2, --P * -10)) / 2,
             easeInCirc : (P) =>                 1 - sqr(1 - pow(P, 2)),
            easeOutCirc : (P) =>                                              sqr(1 - pow(P - 1, 2)),
          easeInOutCirc : (P) => ((P *= 2) < 1 ? 1 - sqr(1 - pow(P, 2)) : 1 + sqr(1 - pow(P - 2, 2))) / 2,
             easeInBack : (P) =>                 BackAp  * pow(P, 3) - BackA  * pow(P, 2),
            easeOutBack : (P) =>                                                            1 + BackAp  * pow(P - 1, 3) + BackA  * pow(P - 1, 2),
          easeInOutBack : (P) => ((P *= 2) < 1 ? BackAmp * pow(P, 3) - BackAm * pow(P, 2) : 2 + BackAmp * pow(P - 2, 3) + BackAm * pow(P - 2, 2)) / 2,
          easeInElastic : (P) => !P ? 0 : P == 1 ? 1 :                 -1 * pow(2, --P * 10) * sin((P * 10 - ElasticA ) * ElasticB ),
         easeOutElastic : (P) => !P ? 0 : P == 1 ? 1 :                                                                                 1 + pow(2,   P * -10) * sin((P * 10 - ElasticA ) * ElasticB ),
       easeInOutElastic : (P) => !P ? 0 : P == 1 ? 1 : ((P *= 2) < 1 ? -1 * pow(2, --P * 10) * sin((P * 10 - ElasticAm) * ElasticBd) : 2 + pow(2, --P * -10) * sin((P * 10 - ElasticAm) * ElasticBd)) / 2,
           easeInBounce : (P) =>                 1 - bounce(1 - P),
          easeOutBounce : (P) =>                                         bounce(P),
        easeInOutBounce : (P) => ((P *= 2) < 1 ? 1 - bounce(1 - P) : 1 + bounce(P - 1)) / 2,
    };
})();




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
        if(!Ran || !Ran.commonAncestorContainer) return null;
        const Sel = Ran.commonAncestorContainer.ownerDocument.defaultView.getSelection();
        Sel.removeAllRanges();
        Sel.addRange(Ran);
        return Ran;
    },
    getRange: function(SidesOrText/*, TargetNodeToSearchText */) {
        if(SidesOrText === undefined || SidesOrText === null) return null;
        const Sides = typeof SidesOrText == 'object' ? SidesOrText : this.searchSidesOfText.apply(this, arguments);
        if(!Sides) return null;
        const Ran = Sides.Start.Node.ownerDocument.createRange();
        Ran.setStart(Sides.Start.Node, (typeof Sides.Start.Index == 'number' ? Sides.Start.Index : Sides.Start.Node.textContent.indexOf(Sides.Start.Text)));
        Ran.setEnd(    Sides.End.Node, (typeof   Sides.End.Index == 'number' ?   Sides.End.Index :   Sides.End.Node.textContent.indexOf(  Sides.End.Text) + Sides.End.Text.length));
        return Ran;
    },
    searchSidesOfText: function(SearchText, TargetNode) {
        // Initialize
        if(!TargetNode) TargetNode = document.body;
        if(typeof SearchText != 'string' || !SearchText || this._flat(TargetNode.textContent).indexOf(SearchText) < 0) return null;
        if(TargetNode.nodeType == 3) return { Start: { Node: TargetNode, Text: SearchText }, End: { Node: TargetNode, Text: SearchText } };
        const TextContents = [], F = {};
        let StartNodeIndex = 0, EndNodeIndex = TargetNode.childNodes.length - 1, DistilledText = '';
        for(let i = 0; i <= EndNodeIndex; i++) {
            if(this._flat(TargetNode.childNodes[i].textContent).indexOf(SearchText) >= 0) return this.searchSidesOfText(SearchText, TargetNode.childNodes[i]);
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
            F = this.searchSidesOfText(EndText, EndNode);
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
    polyfill: (Win = window || self) => { const Doc = Win.document, EPt = Win.Element.prototype;
        if(typeof Doc.fullscreenEnabled != 'undefined') return;
        if(typeof Promise != 'function') throw new Error('sML.Fullscreen.polyfill requires Promise.');
        const VP = Doc.webkitFullscreenEnabled ? 'webkit' : Doc.msFullscreenEnabled ? 'ms' : '';
        switch(VP) {
            case 'webkit': Doc.addEventListener('webkitfullscreenchange', () => Doc.dispatchEvent(        new Event('fullscreenchange', { bubbles: true, cancelable: false })                                ));  break;
            case 'ms'    : Doc                    .onmsfullscreenchange = () => Doc.dispatchEvent((_ => _.initEvent('fullscreenchange',            true,             false  ) || _)(Doc.createEvent('Event'))) ;  break;
            default      : Doc.fullscreenEnabled = false, Doc.fullscreenElement = null, Doc.exitFullscreen = EPt.requestFullscreen = () => Promise.reject()                                                    ; return;
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
        EPt.requestFullscreen = function() {
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