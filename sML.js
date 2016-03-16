


C.setToggleAction = function(Ele, Funs) {
    return sML.edit(Ele, {
        Locked: false,
        State: "default",
        open: function(Opt) {
            var This = this;
            if(!Opt) Opt = {};
            if(This.State == "active") {
                This.callback(Opt.callback, 0);
                return This.State;
            }
            This.Locked = true;
            This.State = "active";
            Funs.open.apply(This, arguments);
            This.callback(Opt.callback);
            setTimeout(function() { This.Locked = false; }, 1);
            return This.State;
        },
        close: function(Opt) {
            var This = this;
            if(!Opt) Opt = {};
            if(This.State == "default") {
                This.callback(Opt.callback, 0);
                return This.State;
            }
            This.Locked = true;
            This.State = "default";
            Funs.close.apply(This, arguments);
            This.callback(Opt.callback);
            setTimeout(function() { This.Locked = false; }, 1);
            return This.State;
        },
        toggle: function(Opt) {
            return (this.State == "default" ? this.open(Opt) : this.close(Opt));
        },
        callback: function(callback, Time) {
            if(typeof callback == "function") setTimeout(callback, (typeof Time == "number" ? Time : 250));
        }
    });
};