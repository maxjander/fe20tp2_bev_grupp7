import {useContext} from 'react'
import {CardContext} from "../CardContext"


const LinDat = () => {

const cardContext = useContext(CardContext)
const allCards = cardContext.cards;

var m;
var n;
var sumObj = {};
var allDates = [];
var allPrices = [];

for(var m = 0; m < allCards.length; m++)
{
    var cardDeltaObj = allCards[m].priceChangeDeltaValueHistory;
    var j;
    var l;
    var cardTime = Object.keys(cardDeltaObj); // <- the date attribute
    var cardValue = Object.values(cardDeltaObj); // <- the key value

    for(j =0; j < cardTime.length; j++)
    {
        if(!allDates.includes(cardTime[j]))
        {
            allDates.push(cardTime[j]);
            allPrices[allDates.indexOf(cardTime[j])] = cardValue[j]
            allDates.sort();
            
        }
        else if(allDates.includes(cardTime[j]))
        {
            allPrices[allDates.indexOf(cardTime[j])] += cardValue[j]
        }
    }
    allDates.sort();

}

for(n = 0; n < allDates.length; n++)
{
    var numDates = Number(allDates[n]);

    sumObj = Object.assign({...sumObj}, {[numDates] : allPrices[n]});
}
return sumObj;
}
export default LinDat 