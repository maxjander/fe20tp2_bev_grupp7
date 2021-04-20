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

    var holdDates = [];
    var holdPrices = [];

    for (l = 0; l <= donk - 1; l++) {
      holdDates.push(allDates[l]);
      holdPrices.push(allPrices[l]);
    }

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
  var compDates = Object.keys(sumObj);
  localStorage.setItem("startDate", new Date(Number(compDates[0])).toLocaleDateString());
  localStorage.setItem("endDate",new Date(Number(compDates[compDates.length -1])).toLocaleDateString());
  localStorage.setItem("totalDays", allDates.length);
  return sumObj;
};
export default LinDat;
