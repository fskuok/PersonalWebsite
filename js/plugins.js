// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



(function(){
    'use strict'
    var scriptName = 'FS',
        version = '0.0.0';


    //shortcuts
    var _isArr = Array.isArray,
        _win = window || undefined,
        _style = window ? window.getComputedStyle : undefined;


    //regExps
    var regNum = /\d+\.?\d*/;


    //useful functions
    var _toNum = FS.toNum =function(s) {
            return typeof s === "string" ? + s.match(regNum) : + s;
        };

    var components = {
        'time' : 't',
        'math' : 'm',
        'dom' : 'd'
    };

    function FS() {
        return FS;
    };

    FS.math = FS[components.math] = {};

    // create a domain symmetric with 0, and contains the input domain
    FS.math.symmetrizeDomain = function(d){
        var a = Math.abs( d[0] ), 
            b = Math.abs( d[d.length-1] );
        return b > a ? [-b, b] : [-a, a];
    };


    FS.dom = FS[components.dom] = {};
    
    //AJAX load a xml file and append selected node, 
    //then excute callback with the appended node as parameter

    FS.dom.loadNAppend = loadNAppend;
    function loadNAppend(node, url, selectNodeFunc, callback){

        var arg = arguments.length <= 1 ? node : {
                node: node,
                url: url,
                selectNodeFunc: selectNodeFunc,
                callback: callback, 
            },
            req = new XMLHttpRequest();

        req.open('GET', arg.url);
        req.onreadystatechange = function(){
            if (req.readyState === 4 && req.status === 200){
                var newNode = arg.selectNodeFunc(req.responseXML);
                arg.node.appendChild(newNode);
                if(arg.callback) arg.callback(newNode);
            }
        }
        req.send();
    }

    FS.dom.fitSize = Element.prototype.fitSize = fitSize;

    function fitSize(parent, child, mode){
        var pW, pH, cW0, cH0, cW1, cH1;

        parent = parent || _win;

        if(typeof parent === "object" && !_isArr(parent)){
            //for parent == 'window'
            if( parent === _win){
                pW = parent.innerWidth;
                pH = parent.innerHeight;
            //for parent == ''
            }else if(parent.nodeType && parent.nodeType === 1){
                pW = _toNum(_style(parent).width);
                pH = _toNum(_style(parent).height);
            }
        //for parent == [W, H]
        }else if(parent.length === 2){
            pW = parent[0]; 
            pH = parent[1]; 
        }

        //if used as a method, assign 'this' to 'child'
        if(typeof this === "object" && this.nodeType === 1){
            mode = child;
            child = this;
        }
        if(typeof child === "object" && child.nodeType === 1){
            console.log(child);
            cW0 = _toNum(_style(child).width);
            cH0 = _toNum(_style(child).height);
        }else if(_isArr(child) && parent.length === 2){
            cW0 = child[0];
            cH0 = child[1];
        }

        //function core
        switch (mode){
            case 'stretch':
                cW1 = pW;
                cH1 = pH;
                break;
            case 'fill':
                cW1 = pW/pH > cW0/cH0 ? pW : cW0/cH0*pH;
                cH1 = pW/pH > cW0/cH0 ? cH0/cW0*pW : pH;
                break;
            case 'fit':
                //use 'fit' as default, no break here
            default:
                cW1 = pW/pH < cW0/cH0 ? pW : cW0/cH0*pH;
                cH1 = pW/pH < cW0/cH0 ? cH0/cW0*pW : pH;
        }

        //if used as a method
        if(typeof this === "object" && this.nodeType === 1) {
            this.style.height = cW1 + "px";
            this.style.height = cH1 + "px";
            return this;
        //if used as a function
        }else{
            return {
                width: cW1,
                height: cH1
            }
        } 
    }

    FS.time = FS[components.time] = {};

    FS.time.getAnimationTime = getAnimationTime;

    function getAnimationTime(input){
        switch ( typeof input ){
            case "number":
                return input;
            case "string":
                if(/^[0-9]+\.?[0-9]*s$/i.exec(input)){
                    return (+ (regNum.exec(input)[0])*1000);
                }else if(/^[0-9]+\.?[0-9]*mins$/i.exec(input) || /^[0-9]+\.?[0-9]*min$/i.exec(input)){
                    return (+ (regNum.exec(input)[0])*1000*60);
                }else if(/^[0-9]+\.?[0-9]*ms$/i.exec(input)){
                    return (+ (regNum.exec(input)[0]));
                }
        }
    }

    if (typeof define === "function" && define.amd) define(function() { return FS; });
    else if (typeof module === "object" && module.exports) module.exports = FS;
    else _win.FS = FS;
    
})();



(function(d3){
    try{
        if(!d3) throw new Error('d3 not found, please include d3 first')
    }catch(err){
        console.error(err.message);
        return;
    }

    d3.selection.prototype.newNodeMix = 
    function newNodeMix(selector, attr, style, mode) {
        var selection = this[mode](selector);
        if(attr) selection = selection.attr(attr);
        if(style) selection = selection.style(style);
        return selection;
    }
    d3.selection.prototype.appendMix = 
    function(selector, attr, style){
        return this.newNodeMix(selector, attr, style, 'append')
    };

    d3.selection.prototype.insertMix = 
    function(selector, attr, style){
        return this.newNodeMix(selector, attr, style, 'insert')
    };
    

    d3.sortByValue = 
    function sortByValue(data, valueFn){
        return data.sort(function(a, b){
            return valueFn(b) - valueFn(a);
        });
    }

    
    d3.nestByRank = 
    function nestByRank(data, valueFn, num){
        var data = data.slice(0);
        d3.sortByValue(data, valueFn);

        var totalLen = restLen = data.length,
            top, target = data;

        while(restLen > 0){
            restLen -= num;
            target.push({
                    rank: (totalLen - restLen + 1) + '-' + totalLen, 
                    children: target.splice(num)
                });
            target = target[target.length-1].children;
        }
        return data;
    }
})(window.d3);


(function(Snap){
    try{
        if(!Snap) throw new Error('Snap.svg not found, please include Snap.svg first')
    }catch(err){
        console.error(err.message);
        return;
    }

    //Snap.svg Plugins
    Snap.plugin(function(Snap, Element, Paper, global, Fragment) {
        'use strict';

        Element.prototype.drawPath = function (totalTime, fps, strokeColor) {

            totalTime = totalTime || 2000;
            fps = fps || 80;
            strokeColor = strokeColor || "black";

            var interval = 1000/fps,
                animateTimes = totalTime / 1000 * fps;

            function drawPathForEach(path) {
                var pathTotalLength = path.getTotalLength(),
                    increment, newPath, i = 0;
                increment = pathTotalLength/animateTimes;
                newPath = path.paper.path();

                drawSubpath(i);

                function drawSubpath(i) {
                    newPath
                        .attr({
                            "stroke": strokeColor,
                            "fill": "none",
                            "d": path.getSubpath(0,
                                //in case of length overflow
                                (i*increment > pathTotalLength) ? pathTotalLength : i*increment)
                        });

                    i++;

                    if(i<animateTimes+1){
                        setTimeout(drawSubpath, interval, i);
                    }
                }

                return newPath;
            }

            //return the new path
            return drawPathForEach(this);
        }

    });
})(window.Snap);
