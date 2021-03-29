const mockDat = [1, 2, 3, 25, 46, 16, 2, 4];

const revDat = mockDat.reverse();

var plotDat = [];

for (var i = 0; i <= 6; i++) {
  plotDat.push(revDat[i]);
}

const finDat = plotDat.reverse();

export default finDat;
