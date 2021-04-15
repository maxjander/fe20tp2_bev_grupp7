import * as mock from "./mock.json";

var propertyNames = Object.keys(mock.delta);
var propertyValues = Object.values(mock.delta);

var k;
var lineChartDat = [];
let lineChartObj = {}
for(k =0; k < propertyNames.length; k++)
{  
    var d = Number(propertyNames[k]); // was 0
    //d.setUTCMilliseconds(propertyNames[k]);
    //lineChartDat.push({x: d.toLocaleDateString(), y: propertyValues[k]}) // {x: propertyNames[k], y: propertyValues[k]}
    lineChartObj = Object.assign({...lineChartObj}, {[d]: propertyValues[k]});
}

export default lineChartObj;