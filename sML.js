/*!
 *                                                                                                                         (℠)
 *  # sML.js | I'm a Simple and Middling Library.
 *
 *  * © Satoru Matsushima - https://github.com/satorumurmur/sML.js
 *  * Open source under the MIT license. - https://github.com/satorumurmur/sML.js/blob/main/LICENSE
 *
 */




//==============================================================================================================================================

const sML = { version: '3.0.0' }; export default sML;

//==============================================================================================================================================




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Polarstar

//----------------------------------------------------------------------------------------------------------------------------------------------


const NUAD = navigator.userAgentData, NUA = navigator.userAgent;

const _dV = (Pre, VRE) => Pre && (VRE = new RegExp('^.*' + Pre + '[ :\\/]?(\\d+([\\._]\\d+)*).*$')).test(NUA) ? _sV(NUA.replace(VRE, '$1')) : [];
const _sV = (V) => (typeof V === 'string' || typeof V === 'number') && V ? String(V).replace(/_/g, '.').split('.').map(I => parseInt(I) || 0) : [];

sML.OperatingSystem = (OS => {
    if(             /(macOS|Mac OS X)/.test(NUA)) {
             if(/\(iP(hone|od touch);/.test(NUA)) OS.iOS      = _dV('CPU (?:iPhone )?OS ');
             if(             /\(iPad;/.test(NUA)) OS.iOS      =
                                                  OS.iPadOS   = _dV('CPU (?:iPhone )?OS ');
        else if( /(macOS|Mac OS X) \d/.test(NUA)) document.ontouchend !== undefined ?
                                                  OS.iOS      =
                                                  OS.iPadOS   = _dV() :
                                                  OS.macOS    = _dV('(?:macOS|Mac OS X) ');
    } else if(      /Windows( NT)? \d/.test(NUA)) OS.Windows  = (V => V[0] !== 6 || !V[1] ? V : V[1] === 1 ? [7] : V[1] === 2 ? [8] : [8, 1])(_dV('Windows(?: NT)?'));
      else if(            /Android \d/.test(NUA)) OS.Android  = _dV('Android');
      else if(                  /CrOS/.test(NUA)) OS.ChromeOS = _dV();
      else if(                  /X11;/.test(NUA)) OS.Linux    = _dV();
    return OS;
})({});
NUAD?.getHighEntropyValues(['architecture', 'model', 'platform', 'platformVersion', 'uaFullVersion']).then(HEUAD => (OS => {
    const Pf = HEUAD.platform, PfV = HEUAD.platformVersion; if(!Pf || !PfV) return;
         if(         /^i(OS|P(hone|od touch))$/.test(Pf)) OS.iOS      = _sV(PfV);
    else if(                      /^iPad(OS)?$/.test(Pf)) OS.iOS      =
                                                          OS.iPadOS   = _sV(PfV);
    else if(/^(macOS|(Mac )?OS X|Mac(Intel)?)$/.test(Pf)) document.ontouchend !== undefined ?
                                                          OS.iOS      =
                                                          OS.iPadOS   = _sV() :
                                                          OS.macOS    = _sV(PfV);
    else if(           /^(Microsoft )?Windows$/.test(Pf)) OS.Windows  = _sV(PfV);
    else if(              /^(Google )?Android$/.test(Pf)) OS.Android  = _sV(PfV);
    else if(     /^((Google )?Chrome OS|CrOS)$/.test(Pf)) OS.ChromeOS = _sV(PfV);
    else if(             /^(Linux|Ubuntu|X11)$/.test(Pf)) OS.Linux    = _sV(PfV);
    else return;
    sML.OperatingSystem = OS;
})({}));

sML.UserAgent = (UA => {
    let _OK = false;
    if(NUAD && Array.isArray(NUAD.brands)) {
        const BnV = NUAD.brands.reduce((BnV, _) => BnV[_.brand] = [_.version * 1] && BnV, {});
             if(BnV['Google Chrome'])  _OK = true, UA.Blink = UA.Chromium = BnV['Chromium'] || [], UA.Chrome = BnV['Google Chrome'];
        else if(BnV['Microsoft Edge']) _OK = true, UA.Blink = UA.Chromium = BnV['Chromium'] || [], UA.Edge   = BnV['Microsoft Edge'];
        else if(BnV['Opera'])          _OK = true, UA.Blink = UA.Chromium = BnV['Chromium'] || [], UA.Opera  = BnV['Opera'];
    }
    if(!_OK) {
        if(              / Gecko\/\d/.test(NUA)) { UA.Gecko            = _dV('rv');
                 if(  / Waterfox\/\d/.test(NUA))   UA.Waterfox         = _dV('Waterfox');
            else if(   / Firefox\/\d/.test(NUA))   UA.Firefox          = _dV('Firefox');
        } else if(        / Edge\/\d/.test(NUA)) { UA.EdgeHTML         =
                                                   UA.Edge             = _dV('Edge');
        } else if(/ Chrom(ium|e)\/\d/.test(NUA)) { UA.Blink            =
                                                   UA.Chromium         = (V => V[0] ? V : _dV('Chrome'))(_dV('Chromium'));
                 if(     / EdgA?\/\d/.test(NUA))   UA.Edge             = (V => V[0] ? V : _dV('Edg'))(_dV('EdgA'));
            else if(       / OPR\/\d/.test(NUA))   UA.Opera            = _dV('OPR');
            else if(   / Vivaldi\/\d/.test(NUA))   UA.Vivaldi          = _dV('Vivaldi');
            else if(      / Silk\/\d/.test(NUA))   UA.Silk             = _dV('Silk');
            else if( / UCBrowser\/\d/.test(NUA))   UA.UCBrowser        = _dV('UCBrowser');
            else if(    / Phoebe\/\d/.test(NUA))   UA.Phoebe           = _dV('Phoebe');
            else                                   UA.Chrome           = (V => V[0] ? V : UA.Chromium)(_dV('Chrome'));
        } else if( / AppleWebKit\/\d/.test(NUA)) { UA.WebKit           = _dV('AppleWebKit');
                 if(      / CriOS \d/.test(NUA))   UA.Chrome           = _dV('CriOS');
            else if(      / FxiOS \d/.test(NUA))   UA.Firefox          = _dV('FxiOS');
            else if(    / EdgiOS\/\d/.test(NUA))   UA.Edge             = _dV('EdgiOS');
            else if(   / Version\/\d/.test(NUA))   UA.Safari           = _dV('Version');
        } else if(     / Trident\/\d/.test(NUA)) { UA.Trident          = _dV('Trident');
                                                   UA.InternetExplorer = (V => V[0] ? V : _dV('MSIE'))(_dV('rv'));
        }
    } /*+*/ if( /[\[; ]FB(AN|_IAB)\//.test(NUA))   UA.Facebook         = _dV('FBAV');
      /*+*/ if(           / Line\/\d/.test(NUA))   UA.LINE             = _dV('Line');
    return UA;
})({});

Object.defineProperties(sML, {
              OS: { get: () => sML.OperatingSystem },
              UA: { get: () => sML.UserAgent },
    Environments: { get: () => [sML.OperatingSystem, sML.UserAgent].reduce((Env, OS_UA) => Object.entries(OS_UA).reduce((Env, [N, V]) => V ? Env.concat(N) : Env, Env), []) }
});




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Utilities

//----------------------------------------------------------------------------------------------------------------------------------------------

sML.replace = (Str, ...Args) => {
    if(!Array.isArray(Args[0])) Str = Str.replace(Args[0], Args[1]);
    else for(const Arg of Args) {
        if(!Array.isArray(Arg[0])) Str = Str.replace(Arg[0], Arg[1]);
        else for(const [Pat, Rep] of Arg) Str = Str.replace(Pat, Rep);
    }
    return Str;
};

sML.capitalise = sML.capitalize = (Str) => Str.charAt(0).toUpperCase() + Str.slice(1);

sML.clamp = (Min, Num, Max) => (Max < Min) ? NaN : (Num < Min) ? Min : (Max < Num) ? Max : Num;

sML.random = (A, B) => {
         if(isNaN(A) && isNaN(B)) A = 0, B = 1;
    else if(isNaN(A)            ) A = 0       ;
    else if(            isNaN(B))        B = 0;
    const Min = Math.min(A, B), Max = Math.max(A, B);
    return Math.floor(Math.random() * (Max - Min + 1)) + Min;
};

sML.forEach = (Ite,      fun, This = window || self) => { const l = Ite.length; for(let i = 0; i < l; i++) if(fun.call(This, Ite[i], i, Ite) === 'break') break; };
sML.reduce  = (Ite, Red, fun, This = window || self) => { for(const I of Ite) fun.call(This, I, Red); return Red; };



//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Object / DOM

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.edit = (Obj, ...ProSets) => {
    ProSets.forEach(Obj instanceof HTMLElement ? (ProSet) => {
        const { data, on, style } = ProSet; ['data', 'on', 'style'].forEach(Pro => delete ProSet[Pro]);
        Object.entries(ProSet).forEach(([PN, PV]) => Obj[PN] = PV);
        if(data && typeof data === 'object') Object.entries(data).forEach(([DN, DV]) => Obj.setAttribute('data-' + DN, DV));
        if(  on && typeof   on === 'object') Object.entries(  on).forEach(([EN, EL]) => Obj.addEventListener(      EN, EL));
        if(style) sML.style(Obj, style);
    } : (ProSet) => {
        Object.entries(ProSet).forEach(([PN, PV]) => Obj[PN] = PV);
    });
    return Obj;
};

sML.create = (TagName, ...ProSets) => sML.edit(document.createElement(TagName), ...ProSets);

sML.hatch = (HTML) => {
    const Egg = document.createElement('sml-egg'), Chick = document.createDocumentFragment();
    Egg.innerHTML = HTML;
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


sML.style = (Ele, ...Stys) => {
    if(Array.isArray(Ele)) return Promise.allSettled(Ele.map(E => sML.CSS.setStyle(E, ...Stys)));
    Stys.forEach(Sty => { if(Sty) switch(typeof Sty) {
        case 'object': Object.assign(Ele.style, Sty); break;
        case 'string': Ele.style = [Ele.getAttribute('style') || '', Sty].join(' ').trim(); break;
    } });
    return new Promise(resolve => setTimeout(resolve));
};

sML.transition = (Ele, ...Stys) => {
    // If none of the changed properties are included in transition-property of the element,
    // PromiseStatus keeps 'pending' until the next transition.
    if(Array.isArray(Ele)) return Promise.allSettled(Ele.map(E => sML.CSS.setTransition(E, ...Stys)));
    const _Stys = [Ele.getAttribute('style') || ''];
    Stys.forEach(Sty => { if(Sty) switch(typeof Sty) {
        case 'object': Object.entries(Sty).forEach(([Pro, Val]) => _Stys.push(Pro.trim() + ': ' + (Val.trim() || 'unset') + ';')); break;
        case 'string': _Stys.push(Sty.trim()); break;
    } });
    const Sty = _Stys.filter(Boolean).join(' ').trim();
    return !Sty ? Promise.resolve() : new Promise(resolve => Ele.addEventListener('transitionend', resolve, { once: true }) || (Ele.style = Sty));
};

sML.insertCSSRule = (...Args) => { // [Doc,] Rule, i
    const sSS = get_sML_StyleSheet(Args[0]?.nodeType === 9 ? Args.shift() : document);
    const [Rule, i] = Args;
    sSS.insertRule(Rule, !Number.isInteger(i) ? 0 : 0 <= i ? Math.min(i, sSS.cssRules.length) : Math.max(0, sSS.cssRules.length + 1 + i));
    return sSS.cssRules[i];
};

sML.appendCSSRule = (...Args) => { // [Doc,] Rule
    return sML.insertCSSRule(Args[0]?.nodeType === 9 ? Args.shift() : document, Args[0], -1);
};

sML.deleteCSSRule = (...Args) => { // [Doc,] i_or_CSR
    const sSS = get_sML_StyleSheet(Args[0]?.nodeType === 9 ? Args.shift() : document);
    const [i_or_CSR] = Args;
    if(Number.isInteger(i_or_CSR)) return sSS.deleteRule(i_or_CSR);
    for(let i = sSS.cssRules.length - 1; i >= 0; i--) if(sSS.cssRules[i] === i_or_CSR) return sSS.deleteRule(i);
};

let sML_StyleSheets = undefined;
const get_sML_StyleSheet = (Doc = document) => {
    if(Doc.nodeType !== 9) return null;
    let sSS = (sML_StyleSheets || (sML_StyleSheets = new Map())).get(Doc);
    if(!sSS) {
        const sSE = Doc.createElement('style');
        Doc.head.appendChild(sSE).append(Doc.createTextNode(''));
        sML_StyleSheets.set(Doc, sSS = sSE.sheet);
    }
    return sSS;
};




//==============================================================================================================================================
//----------------------------------------------------------------------------------------------------------------------------------------------

//-- Polyfill

//----------------------------------------------------------------------------------------------------------------------------------------------


sML.Fullscreen = { polyfill: (Win = window || self) => { // Partial Polyfill for Safari and Internet Explorer
    if(!Win) return;
    const Doc = Win.document;
    if(!Doc || Doc.fullscreenEnabled !== undefined) return;
    const EPt = Win.Element.prototype;
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
    Doc.exitFullscreen    = function() { return new Promise((resolve, reject) => !Doc.fullscreenElement ? reject() : Doc.addEventListener('fullscreenchange', resolve, { once: true }), this[VP +    'ExitFullscreen'](...arguments)); };
    EPt.requestFullscreen = function() { return new Promise((resolve, reject) =>  Doc.fullscreenElement ? reject() : Doc.addEventListener('fullscreenchange', resolve, { once: true }), this[VP + 'RequestFullscreen'](...arguments)); };
} };




//==============================================================================================================================================
