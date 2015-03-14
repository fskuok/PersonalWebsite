/**
 * Created by vangos on 3/10/15.
 */


.factory('svgService',function(){

    function getDialogBoxPoints(width, height, side, pointerY, pointerR){
        var x0 = 0, x1 = pointerR, x2 = pointerR + width,
            y0 = -pointerY, y1 = - pointerR, y2 = 0,
            y3 = pointerR, y4 = height - pointerY;

        if(side === "left"){
            x0 = -x0;
            x1 = -x1;
            x2 = -x2;
        }

        return "" + x1 + ',' + y0  + ' ' +
            x2 + ',' + y0  + ' ' +
            x2 + ',' + y4 + ' ' +
            x1 + ',' + y4 + ' ' +
            x1 + ',' + y3 + ' ' +
            x0  + ',' + y2 + ' ' +
            x1 + ',' + y1;


    }

    return {
        getDialogBoxPoints : getDialogBoxPoints
    }
});


