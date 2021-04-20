const LinDat = (allCards, donk) => {
  var m;
  var n;
  var sumObj = {};
  var allDates = [];
  var allPrices = [];
  if (!allCards) {
    return null;
  }
  for (m = 0; m < allCards.length; m++) {
    var cardDeltaObj = allCards[m].priceChangeDeltaValueHistory;
    var j;
    var l;
    var cardTime = Object.keys(cardDeltaObj); // <- the date attribute
    var cardValue = Object.values(cardDeltaObj); // <- the key value

    for (j = 0; j < cardTime.length; j++) {
      var InitroundTime = new Date(cardTime[j] * 1);
      InitroundTime.setUTCHours(1, 0, 0, 0);
      var roundTime = Number(InitroundTime);

      if (!allDates.includes(roundTime)) {
        allDates.push(roundTime);
        allPrices[allDates.indexOf(roundTime)] = cardValue[j];
        allDates.sort();
      } else if (allDates.includes(roundTime)) {
        allPrices[allDates.indexOf(roundTime)] += cardValue[j];
      }
    }
    allDates.sort();
  }

  if (allDates.length > donk) {
    var revAllDates = allDates.reverse();
    var revAllPrices = allPrices.reverse();

    var holdDates = [];
    var holdPrices = [];

    for (l = 0; l <= donk - 1; l++) {
      holdDates.push(revAllDates[l]);
      holdPrices.push(revAllPrices[l]);
    }

    holdDates.reverse();
    holdPrices.reverse();

    for (n = 0; n < holdDates.length; n++) {
      var numDates = Number(holdDates[n]);
      sumObj = Object.assign({ ...sumObj }, { [numDates]: holdPrices[n] });
    }
  } else {
    for (n = 0; n < allDates.length; n++) {
      numDates = Number(allDates[n]);
      sumObj = Object.assign({ ...sumObj }, { [numDates]: allPrices[n] });
    }
  }

  return sumObj;
};
export default LinDat;
