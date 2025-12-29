/*!
 *                                                                                                                         (℠)
 *  # sML.js | I'm a Simple and Middling Library.
 *
 *  * © Satoru Matsushima - https://github.com/satorumurmur/sML
 *  * Open source under the MIT license. - https://github.com/satorumurmur/sML/blob/master/LICENSE
 *
 */




//==============================================================================================================================================

const sML = { version: '2.0.0' }; export default sML;

//==============================================================================================================================================




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Polarstar

//----------------------------------------------------------------------------------------------------------------------------------------------


const NUAD = navigator.userAgentData, NUA = navigator.userAgent;

const _sV = (V) => (typeof V === 'string' || typeof V === 'number') && V ? String(V).replace(/_/g, '.').split('.').map(I => parseInt(I) || 0) : [];
const _dV = (Pre) => {
    if(!Pre) return [];
    const RE = new RegExp('^.*' + Pre + '[ :\\/]?(\\d+([\\._]\\d+)*).*$');
    if(!RE.test(NUA)) return [];
    return _sV(NUA.replace(RE, '$1'));
};

sML.OperatingSystem = (OS => {
    if(             /(macOS|Mac OS X)/.test(NUA)) {
             if(/\(iP(hone|od touch);/.test(NUA)) OS.iOS = _dV('CPU (?:iPhone )?OS ');
             if(             /\(iPad;/.test(NUA)) OS.iOS = OS.iPadOS = _dV('CPU (?:iPhone )?OS ');
        else if( /(macOS|Mac OS X) \d/.test(NUA)) document.ontouchend !== undefined ? OS.iOS = OS.iPadOS = _dV() : OS.macOS = _dV('(?:macOS|Mac OS X) ');
    } else if(      /Windows( NT)? \d/.test(NUA)) OS.Windows = (V => V[0] !== 6 || !V[1] ? V : V[1] === 1 ? [7] : V[1] === 2 ? [8] : [8, 1])(_dV('Windows(?: NT)?'));
      else if(            /Android \d/.test(NUA)) OS.Android = _dV('Android');
      else if(                  /CrOS/.test(NUA)) OS.ChromeOS = _dV();
      else if(                  /X11;/.test(NUA)) OS.Linux = _dV();
    return OS;
})({}); if(NUAD) NUAD.getHighEntropyValues(['architecture', 'model', 'platform', 'platformVersion', 'uaFullVersion']).then(HEUAD => (OS => { const Pf = HEUAD.platform, PfV = HEUAD.platformVersion; if(!Pf || !PfV) return;
         if(         /^i(OS|P(hone|od touch))$/.test(Pf)) OS.iOS = _sV(PfV);
    else if(                      /^iPad(OS)?$/.test(Pf)) OS.iOS = OS.iPadOS = _sV(PfV);
    else if(/^(macOS|(Mac )?OS X|Mac(Intel)?)$/.test(Pf)) document.ontouchend !== undefined ? OS.iOS = OS.iPadOS = _sV() : OS.macOS = _sV(PfV);
    else if(           /^(Microsoft )?Windows$/.test(Pf)) OS.Windows = _sV(PfV);
    else if(              /^(Google )?Android$/.test(Pf)) OS.Android = _sV(PfV);
    else if(     /^((Google )?Chrome OS|CrOS)$/.test(Pf)) OS.ChromeOS = _sV(PfV);
    else if(             /^(Linux|Ubuntu|X11)$/.test(Pf)) OS.Linux = _sV(PfV);
    else return; /**/ Object.keys(sML.OperatingSystem).forEach(Key => delete sML.OperatingSystem[Key]), Object.assign(sML.OperatingSystem, OS);
})({}));

sML.UserAgent = (UA => { let _OK = false;
    if(NUAD && Array.isArray(NUAD.brands)) { const BnV = NUAD.brands.reduce((BnV, _) => { BnV[_.brand] = [_.version * 1]; return BnV; }, {});
             if(BnV['Google Chrome'])  _OK = true, UA.Blink = UA.Chromium = BnV['Chromium'] || [], UA.Chrome = BnV['Google Chrome'];
        else if(BnV['Microsoft Edge']) _OK = true, UA.Blink = UA.Chromium = BnV['Chromium'] || [], UA.Edge = BnV['Microsoft Edge'];
        else if(BnV['Opera'])          _OK = true, UA.Blink = UA.Chromium = BnV['Chromium'] || [], UA.Opera = BnV['Opera'];
    } if(!_OK) {
        if(              / Gecko\/\d/.test(NUA)) { UA.Gecko = _dV('rv');
                 if(  / Waterfox\/\d/.test(NUA))   UA.Waterfox = _dV('Waterfox');
            else if(   / Firefox\/\d/.test(NUA))   UA.Firefox = _dV('Firefox');
        } else if(        / Edge\/\d/.test(NUA)) { UA.EdgeHTML = _dV('Edge');
                                                   UA.Edge = UA.EdgeHTML;
        } else if(/ Chrom(ium|e)\/\d/.test(NUA)) { UA.Blink = UA.Chromium = (V => V[0] ? V : _dV('Chrome'))(_dV('Chromium'));
                 if(     / EdgA?\/\d/.test(NUA))   UA.Edge = (V => V[0] ? V : _dV('Edg'))(_dV('EdgA'));
            else if(       / OPR\/\d/.test(NUA))   UA.Opera = _dV('OPR');
            else if(   / Vivaldi\/\d/.test(NUA))   UA.Vivaldi = _dV('Vivaldi');
            else if(      / Silk\/\d/.test(NUA))   UA.Silk = _dV('Silk');
            else if( / UCBrowser\/\d/.test(NUA))   UA.UCBrowser = _dV('UCBrowser');
            else if(    / Phoebe\/\d/.test(NUA))   UA.Phoebe = _dV('Phoebe');
            else                                   UA.Chrome = (V => V[0] ? V : UA.Chromium)(_dV('Chrome'));
        } else if( / AppleWebKit\/\d/.test(NUA)) { UA.WebKit = _dV('AppleWebKit');
                 if(      / CriOS \d/.test(NUA))   UA.Chrome = _dV('CriOS');
            else if(      / FxiOS \d/.test(NUA))   UA.Firefox = _dV('FxiOS');
            else if(    / EdgiOS\/\d/.test(NUA))   UA.Edge = _dV('EdgiOS');
            else if(   / Version\/\d/.test(NUA))   UA.Safari = _dV('Version');
        } else if(     / Trident\/\d/.test(NUA)) { UA.Trident = _dV('Trident');
                                                   UA.InternetExplorer = (V => V[0] ? V : _dV('MSIE'))(_dV('rv'));
        }
    } /*+*/ if( /[\[; ]FB(AN|_IAB)\//.test(NUA))   UA.Facebook = _dV('FBAV');
      /*+*/ if(           / Line\/\d/.test(NUA))   UA.LINE = _dV('Line');
    return UA;
})({});

Object.defineProperties(sML, {
    OS: { get: () => sML.OperatingSystem },
    UA: { get: () => sML.UserAgent },
    Environments: { get: () => [sML.OperatingSystem, sML.UserAgent].reduce((Env, OS_UA) => { for(const Par in OS_UA) if(OS_UA[Par]) Env.push(Par); return Env; }, []) }
});




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Utilities

//----------------------------------------------------------------------------------------------------------------------------------------------

if(Number.isFinite  === undefined) Number.isFinite  = (N) => typeof N === 'number' && isFinite(N);
if(Number.isInteger === undefined) Number.isInteger = (N) => typeof N === 'number' && isFinite(N) && Math.floor(N) === N;
if(Number.isNaN     === undefined) Number.isNaN     = (N) => typeof N === 'number' && N !== N;

sML.replace = (Str, Reps) => {
    if(!Array.isArray(Reps[0]))                return Str.replace(Reps   [0], Reps   [1]);
    for(let l = Reps.length, i = 0; i < l; i++) Str = Str.replace(Reps[i][0], Reps[i][1]); return Str;
};

sML.capitalise = (Str) => Str.charAt(0).toUpperCase() + Str.slice(1);
sML.capitalize = (Str) => Str.charAt(0).toUpperCase() + Str.slice(1);

sML.clamp = (Min, Num, Max) => (Max < Min) ? NaN : (Num < Min) ? Min : (Max < Num) ? Max : Num;

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
    ProSets.forEach(Obj instanceof HTMLElement ? (ProSet) => {
        const { data, on, style } = ProSet; ['data', 'on', 'style'].forEach(Pro => delete ProSet[Pro]);
        Object.entries(ProSet).forEach(([PN, PV]) => Obj[PN] = PV);
        if(typeof data === 'object') Object.entries(data).forEach(([DN, DV]) => Obj.setAttribute('data-' + DN, DV));
        if(typeof   on === 'object') Object.entries(  on).forEach(([EN, EL]) => Obj.addEventListener(      EN, EL));
        switch(typeof style) {
            case 'object': sML.CSS.setStyle(Obj, style); break;
            case 'string': Obj.style = style;
        }
    } : (ProSet) => {
        Object.entries(ProSet).forEach(([PN, PV]) => Obj[PN] = PV);
    });
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




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- CSS

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.CSS = {
    insertRule: function(Sel, Sty, Ind) { let Doc = document; if(arguments[0].documentElement) Doc = arguments[0], Sel = arguments[1], Sty = arguments[2], Ind = arguments[3];
        const sSs = get_sMLStyle(Doc).sheet; Ind = !Number.isInteger(Ind) || !Ind ? 0 : Ind < 0 ? Math.max(0, sSs.cssRules.length + 1 + Ind) : Math.min(Ind, sSs.cssRules.length);
        sSs.insertRule((Array.isArray(Sel)  ? Sel.join(', ') : Sel) + ' { ' + (Array.isArray(Sty) ? Sty.join(' ') : Sty) + ' }', Ind);
        return sSs.cssRules[Ind];
    },
    appendRule: function(Sel, Sty) { let Doc = document; if(arguments[0].documentElement) Doc = arguments[0], Sel = arguments[1], Sty = arguments[2];
        const sSs = get_sMLStyle(Doc).sheet, Ind = sSs.cssRules.length;
        sSs.insertRule((Array.isArray(Sel)  ? Sel.join(', ') : Sel) + ' { ' + (Array.isArray(Sty) ? Sty.join(' ') : Sty) + ' }', Ind);
        return sSs.cssRules[Ind];
    },
    deleteRule: function(CSR) { let Doc = document; if(arguments[0].documentElement) Doc = arguments[0], CSR = arguments[1];
        const sSs = get_sMLStyle(Doc).sheet;
        for(let i = sSs.cssRules.length - 1; i >= 0; i--) if(sSs.cssRules[i] === CSR) return sSs.deleteRule(i);
    },
    setStyle: function(Ele, ...Stys) {
        if(Array.isArray(Ele)) for(let l = Ele.length, i = 0; i < l; i++) sML.CSS.setStyle(Ele[i], ...Stys);
        else for(let l = Stys.length, i = 0; i < l; i++) for(const Pro in Stys[i]) Ele.style[Pro] = Stys[i][Pro];
        return Promise.resolve();
    },
    setTransition: function(Ele, ...Stys) {
        // If none of the changed properties are included in transition-property of the element,
        // PromiseStatus keeps 'pending' until the next transition.
        if(Array.isArray(Ele)) {
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
            add_sMLTransitionEndListener(Ele, Eve => resolve(Eve));
            Ele.style = _Stys.join(' ');
        });
    }
};

const get_sMLStyle = (Doc = document) => {
    if(!Doc.documentElement) return null;
    if(!Doc.sMLStyle) {
        Doc.sMLStyle = Doc.createElement('style');
        Doc.sMLStyle.appendChild(Doc.createTextNode(''));
        Doc.head.appendChild(Doc.sMLStyle);
    }
    return Doc.sMLStyle;
};

const add_sMLTransitionEndListener = (Ele, fun) => {
    if(Ele._sMLTransitionEndListener) remove_sMLTransitionEndListener(Ele);
    Ele._sMLTransitionEndListener = (Eve) => fun.call(Ele, Eve) && remove_sMLTransitionEndListener(Ele);
    Ele.addEventListener('transitionend', Ele._sMLTransitionEndListener);
};

const remove_sMLTransitionEndListener = (Ele) => {
    if(!Ele._sMLTransitionEndListener) return;
    Ele.removeEventListener('transitionend', Ele._sMLTransitionEndListener);
    delete Ele._sMLTransitionEndListener;
};

sML.insertCSSRule = (...Args) => sML.CSS.insertRule   .apply(sML.CSS, Args);
sML.appendCSSRule = (...Args) => sML.CSS.appendRule   .apply(sML.CSS, Args);
sML.deleteCSSRule = (...Args) => sML.CSS.deleteRule   .apply(sML.CSS, Args);
sML.style         = (...Args) => sML.CSS.setStyle     .apply(sML.CSS, Args);
sML.transition    = (...Args) => sML.CSS.setTransition.apply(sML.CSS, Args);




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
        if(Array.isArray(Tar)) return Tar.forEach(T => this.add(T, Nam, fun)) || fun;
        if(Array.isArray(Nam)) return Nam.forEach(N => this.add(Tar, N, fun)) || fun;
        if(Array.isArray(fun)) return fun.forEach(f => this.add(Tar, Nam, f)) || fun;
        if(typeof Tar !== 'object' || !NameRE.test(Nam) || typeof fun !== 'function') return false;
        if(!fun[_EL_]) fun[_EL_] = (Eve) => fun.call(Tar, Eve.detail);
        Tar.addEventListener(Nam, fun[_EL_], { capture: false, passive: false });
        return fun;
    };
    this.remove = function(/*[Tar,]*/ Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Array.isArray(Tar)) return Tar.forEach(T => this.remove(T, Nam, fun)) || fun;
        if(Array.isArray(Nam)) return Nam.forEach(N => this.remove(Tar, N, fun)) || fun;
        if(Array.isArray(fun)) return fun.forEach(f => this.remove(Tar, Nam, f)) || fun;
        if(typeof Tar !== 'object' || !NameRE.test(Nam) || typeof fun !== 'function') return false;
        Tar.removeEventListener(Nam, fun[_EL_]);
        return fun;
    };
    this.bind = function(/*[Tar,]*/ Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Array.isArray(Tar)) return Tar.forEach(T => this.bind(T, Nam, fun)) || fun;
        if(Array.isArray(Nam)) return Nam.forEach(N => this.bind(Tar, N, fun)) || fun;
        if(Array.isArray(fun)) return fun.forEach(f => this.bind(Tar, Nam, f)) || fun;
        if(typeof Tar !== 'object' || !NameRE.test(Nam) || typeof fun !== 'function') return false;
        if(!Tar[_BELs_]) Tar[_BELs_] = {};
        if(!(Array.isArray(Tar[_BELs_][Nam]))) Tar[_BELs_][Nam] = [];
        Tar[_BELs_][Nam] = Tar[_BELs_][Nam].filter(bEL => (bEL !== fun));
        Tar[_BELs_][Nam].push(fun);
        return fun;
    };
    this.unbind = function(/*[Tar,]*/ Nam, fun) { let Tar = document; if(arguments.length > 2) Tar = arguments[0], Nam = arguments[1], fun = arguments[2];
        if(Array.isArray(Tar)) return Tar.forEach(T => this.unbind(T, Nam, fun)) || fun;
        if(Array.isArray(Nam)) return Nam.forEach(N => this.unbind(Tar, N, fun)) || fun;
        if(Array.isArray(fun)) return fun.forEach(f => this.unbind(Tar, Nam, f)) || fun;
        if(typeof Tar !== 'object' || !NameRE.test(Nam) || typeof fun !== 'function') return false;
        if(!(Tar[_BELs_] && Array.isArray(Tar[_BELs_][Nam]))) return false;
        Tar[_BELs_][Nam] = Tar[_BELs_][Nam].filter(bEL => (bEL !== fun));
        return fun;
    };
    this.dispatch = function(/*[Tar,]*/ Nam, Det) { let Tar = document; const A0 = arguments[0], A1 = arguments[1], A2 = arguments[2];
        /**/                       if(Array.isArray(A0)) return Promise.allSettled(A0.map(x => this.dispatch(x, A1, A2)));
        if(typeof A0 === 'object') if(Array.isArray(A1)) return Promise.allSettled(A1.map(x => this.dispatch(A0, x, A2))); else Tar = A0, Nam = A1, Det = A2;
        if(!NameRE.test(Nam)) return Promise.reject();
        const Ret = Promise.allSettled(Array.isArray(Tar[_BELs_]?.[Nam]) ? Tar[_BELs_][Nam].map(bEL => Promise.resolve(typeof bEL !== 'function' ? bEL : bEL.call(Tar, Det))) : []);
        Tar.dispatchEvent(new CustomEvent(Nam, { detail: Det }));
        return Ret;
    };
    return this;
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Scroller

//----------------------------------------------------------------------------------------------------------------------------------------------


const getScrollCoord = (Frame) => {
    return !Frame || Frame === window ? { X: window.scrollX || window.pageXOffset || document.documentElement.scrollLeft,
                                          Y: window.scrollY || window.pageYOffset || document.documentElement.scrollTop }
                                      : { X: Frame.scrollLeft, Y: Frame.scrollTop };
};

const getElementCoord = function(Ele, Frame, { X, Y } = getScrollCoord(Frame)) {
    const { x, y } = Ele.getBoundingClientRect();
    return { X: x + X, Y: y + Y };
};

sML.scrollTo = (Target, Opt = {}) => {
    const Frame = Target.Frame instanceof HTMLElement ? Target.Frame : window;
    let Setting = sML.scrollTo.Settings.get(Frame);
    !Setting?.cancel() && sML.scrollTo.Settings.set(Frame, Setting = {
                         cancel : () => { Setting.removeScrollCancelation(); Setting.onCanceled?.(); return true; },
           addScrollCancelation : () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Frame.addEventListener   (EN, Setting.cancel,     { capture: true, passive: false })),
        removeScrollCancelation : () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Frame.removeEventListener(EN, Setting.cancel                                       )),
           preventUserScrolling : () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Frame.addEventListener   (EN, sML.preventDefault, { capture: true, passive: false })),
             allowUserScrolling : () => ['keydown', 'mousedown', 'touchstart', 'wheel'].forEach(EN => Frame.removeEventListener(EN, sML.preventDefault                                   ))
    });
    const to = Frame === window ? (X, Y) => window.scrollTo(X, Y) : (X, Y) => Object.assign(Frame, { scrollLeft: X, scrollTop: Y }) && undefined;
    const Start = getScrollCoord(Frame);
    const Goal = (() => { switch(typeof Target) {
        case 'object': return Target instanceof HTMLElement ? getElementCoord(Target, Frame, Start) : ['X', 'Y'].some(XY => Target.hasOwnProperty(XY)) ? { X: Target.X, Y: Target.Y } : undefined;
        case 'number': return { Y: Target };
    } })() || {};
    if(typeof Goal.X !== 'number') Goal.X = Start.X;
    if(typeof Goal.Y !== 'number') Goal.Y = Start.Y;
    const Distance = { X: Goal.X - Start.X, Y: Goal.Y - Start.Y };
    const Duration = (typeof Opt.Duration === 'number' && Opt.Duration >= 0) ? Opt.Duration : 100;
    if(!Duration) return Promise.resolve(to(Goal.X, Goal.Y));
    let recover;
    if(Opt.ForceScroll) Setting.preventUserScrolling(), recover = () => Setting.allowUserScrolling();
    else                Setting.addScrollCancelation(), recover = () => Setting.removeScrollCancelation();
    const onDone = () => delete Setting.onCanceled && recover();
    const ease = typeof Opt.ease === 'function' ? Opt.ease : (_P) => _P;
    return new Promise((resolve, reject) => {
        let StartedOn, Passed = 0, Canceled = false;
        Setting.onCanceled = () => reject(onDone(Canceled = true));
        window.requestAnimationFrame(function scrollInProgress(Time) {
            if(Canceled) return;
            if(!StartedOn) StartedOn = Time;
            else {
                if(Duration <= (Passed = Time - StartedOn)) return resolve();
                const Progress = ease(Passed / Duration);
                to(
                    Math.round(Start.X + Distance.X * Progress),
                    Math.round(Start.Y + Distance.Y * Progress)
                );
            }
            window.requestAnimationFrame(scrollInProgress);
        });
    }).then(() => {
        to(Goal.X, Goal.Y);
        onDone();
    });
};

sML.scrollTo.Settings = new Map();




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Cookies

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Cookies = {
    read: (CookieName) => {
        if(typeof CookieName !== 'string' || !CookieName) return '';
        CookieName = encodeURIComponent(CookieName);
        const CookieParts = document.cookie.split('; ');
        let CookieValue = '';
        for(let l = CookieParts.length, i = 0; i < l; i++) {
            if(CookieParts[i].substr(0, CookieName.length + 1) === (CookieName + '=')) {
                CookieValue = CookieParts[i].substr(CookieName.length + 1, CookieParts[i].length);
                break;
            }
        }
        return decodeURIComponent(CookieValue);
    },
    write: (CookieName, CookieValue, Opt) => { const D = new Date();
        if(!CookieName || typeof CookieName  !== 'string' || typeof CookieValue !== 'string') return false;
        if(typeof Opt !== 'object') Opt = {};
        CookieName  = encodeURIComponent(CookieName);
        CookieValue = encodeURIComponent(CookieValue);
        Opt.Path    = (typeof Opt.Path    === 'string') ? Opt.Path    : location.pathname.replace(/[^\/]+$/, '');
        Opt.Expires = (typeof Opt.Expires === 'number') ? Opt.Expires : 86400000; // a day
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
        const Sides = typeof SidesOrText === 'object' ? SidesOrText : this.searchSidesOfText.apply(this, arguments);
        if(!Sides) return null;
        const Ran = Sides.Start.Node.ownerDocument.createRange();
        Ran.setStart(Sides.Start.Node, (typeof Sides.Start.Index === 'number' ? Sides.Start.Index : Sides.Start.Node.textContent.indexOf(Sides.Start.Text)));
        Ran.setEnd(    Sides.End.Node, (typeof   Sides.End.Index === 'number' ?   Sides.End.Index :   Sides.End.Node.textContent.indexOf(  Sides.End.Text) + Sides.End.Text.length));
        return Ran;
    },
    searchSidesOfText: function(SearchText, TargetNode) {
        // Initialize
        if(!TargetNode) TargetNode = document.body;
        if(typeof SearchText !== 'string' || !SearchText || this._flat(TargetNode.textContent).indexOf(SearchText) < 0) return null;
        if(TargetNode.nodeType === 3) return { Start: { Node: TargetNode, Text: SearchText }, End: { Node: TargetNode, Text: SearchText } };
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
        while(StartNode.nodeType !== 3) {
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
        while(EndNode.nodeType !== 3) {
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
        if(typeof Doc.fullscreenEnabled !== 'undefined') return;
        if(typeof Promise !== 'function') throw new Error('sML.Fullscreen.polyfill requires Promise.');
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
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Polyfill

//----------------------------------------------------------------------------------------------------------------------------------------------


if(!Promise.allSettled) Promise.allSettled = (Pros) => Promise.all(Pros.map(Pro => Promise.resolve(Pro).then(
    Val => ({ status: 'fulfilled', value: Val }),
    Rea => ({ status: 'rejected', reason: Rea })
)));

if(!Promise.any) Promise.any = (Pros) => new Promise((resolve, reject) => {
    const Errs = []; let ErrC = 0;
    Pros.forEach((Pro, i) => Promise.resolve(Pro).then(
        resolve,
        Err => (Errs[i] = Err) && (++ErrC === Pros.length) && reject(
            AggregateError ? new AggregateError(Errs, 'All promises were rejected')
            : Object.assign(new Error('AggregateError: All promises were rejected'), { errors: Errs })
        )
    ));
});

if(!Promise.prototype.finally) Promise.prototype.finally = function(fin) { return typeof fin !== 'function' ? this.then(fin, fin) : this.then(
    Val => Promise.resolve(fin()).then(() =>         Val   ),
    Rea => Promise.resolve(fin()).then(() => { throw Rea; })
); };




//==============================================================================================================================================
